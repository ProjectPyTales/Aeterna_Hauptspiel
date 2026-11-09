package de.chroniken.helden

import android.content.ActivityNotFoundException
import android.content.Intent
import android.net.Uri
import android.provider.Settings
import org.json.JSONObject
import java.io.File
import java.io.IOException
import java.io.InputStream
import java.net.HttpURLConnection
import java.net.URL
import java.security.MessageDigest
import java.util.concurrent.Executors

/**
 * Automatische Updates (seit 1.36.0, nach dem Vorbild von ADEU-Harness).
 *
 * Die Hülle liest `version.json` aus dem Release „Test-APK“ dieses öffentlichen Repositorys – ein einfacher Download ohne
 * GitHub-Konto und ohne API (geschrieben von `werkzeuge/update_info.js` in der CI). Hat die Datei einen höheren
 * `versionCode` als die installierte App, fragt das Spiel; „Jetzt aktualisieren“ lädt die APK in den Cache, prüft Größe und
 * SHA-256 und gibt sie über [UpdateFiles] dem Installer von Android, der noch einmal fragt („Aktualisieren“). Spielstand und
 * Einstellungen bleiben, weil jede APK mit demselben Schlüssel signiert ist.
 *
 * Das Spiel selbst bleibt offline: nur diese Klasse spricht mit dem Netz, die WebView lädt weiter nur https://chroniken.local/
 * ([AssetClient]). Den Zustand bekommt das Spiel als JSON über `App.onUpdate(…)` (service/platform.js, viewmodel/update.js):
 * `state` ist idle, checking, current, available, downloading, ready oder failed.
 */
class Updater(private val activity: MainActivity) {
    private val worker = Executors.newSingleThreadExecutor()

    /** Was version.json über die neue Version sagt. */
    private data class Info(
        val version: String, val code: Long, val notes: String,
        val file: String, val url: String, val sha256: String, val size: Long,
    )

    private class Problem(message: String) : Exception(message)
    private class Cancelled : Exception()

    @Volatile private var state: JSONObject = base("idle")
    @Volatile private var info: Info? = null
    @Volatile private var apk: File? = null
    /** Eine Suche läuft / ein Download läuft. Beide laufen nacheinander auf [worker]; ein Download wartet hinter einer Suche. */
    @Volatile private var checking = false
    @Volatile private var downloading = false
    @Volatile private var stop = false

    private val pkg get() = activity.packageManager.getPackageInfo(activity.packageName, 0)
    private val installedName: String get() = pkg.versionName ?: ""
    private val installedCode: Long get() = pkg.longVersionCode
    private val dir get() = File(activity.cacheDir, DIR)

    fun state(): String = state.toString()

    /** Sucht eine neuere Version. Ohne Netz bleibt es beim Start still ([manual] = Einstellungen zeigt den Fehler). */
    fun check(manual: Boolean) {
        synchronized(this) {
            if (checking || downloading) return
            checking = true
        }
        val before = state
        if (manual || before.optString("state") != "ready") publish(base("checking"))
        worker.execute {
            val result = try {
                cleanup()
                val i = parse(read(SOURCE))
                info = i
                when {
                    i.code <= installedCode -> base("current")
                    else -> prepared(i)?.let { apk = it; ready(i) } ?: available(i)
                }
            } catch (e: Exception) {
                when {
                    manual -> base("failed").put("message", explain(e))
                    before.optString("state") == "ready" -> before
                    else -> base("idle").put("error", explain(e))
                }
            }
            checking = false
            publish(result)
        }
    }

    /** Lädt die APK der gefundenen Version, prüft sie und meldet „ready“; das Spiel ruft dann [install]. */
    fun download() {
        synchronized(this) {
            if (downloading) return
            downloading = true
        }
        stop = false
        worker.execute {
            // Erst hier lesen: eine Suche, die noch vor diesem Auftrag lief, kann [info] eben erneuert haben.
            val i = info ?: run { downloading = false; return@execute }
            try {
                val done = prepared(i)
                if (done != null) {
                    apk = done
                } else {
                    dir.mkdirs()
                    val free = dir.usableSpace
                    if (free in 1 until i.size * 2) throw Problem("Zu wenig freier Speicher für das Update (nötig etwa ${(i.size * 2) shr 20} MB).")
                    val tmp = File(dir, i.file + ".part")
                    publish(loading(i, 0f, "Wird geladen …"))
                    var shown = -1
                    fetch(i.url, tmp) { got ->
                        val p = if (i.size > 0) (got.toFloat() / i.size).coerceIn(0f, 1f) else 0f
                        val percent = (p * 100).toInt()
                        if (percent != shown) {
                            shown = percent
                            publish(loading(i, p, "Wird geladen …"))
                        }
                    }
                    publish(loading(i, 1f, "Wird geprüft …"))
                    if (tmp.length() != i.size || sha256(tmp) != i.sha256) {
                        tmp.delete()
                        throw Problem("Die geladene Datei ist unvollständig oder verändert (Prüfsumme stimmt nicht). Bitte noch einmal versuchen.")
                    }
                    val target = File(dir, i.file)
                    target.delete()
                    if (!tmp.renameTo(target)) throw IOException("Datei konnte nicht umbenannt werden: ${tmp.name}")
                    apk = target
                }
                publish(ready(i))
            } catch (e: Cancelled) {
                File(dir, i.file + ".part").delete()
                publish(available(i))
            } catch (e: Exception) {
                publish(failed(i, explain(e)))
            } finally {
                downloading = false
            }
        }
    }

    fun cancel() {
        stop = true
    }

    /**
     * Öffnet den Installer von Android (auf dem UI-Thread). Darf die App noch keine Apps installieren, führt sie einmalig zur
     * Freigabe „Apps aus dieser Quelle zulassen“ und sagt im Zustand (`note`), was zu tun ist.
     */
    fun install() {
        val i = info ?: return
        val file = apk?.takeIf { it.isFile } ?: return publish(available(i))
        try {
            if (!activity.packageManager.canRequestPackageInstalls()) {
                publish(ready(i).put("note", "Einmalig nötig: „Apps aus dieser Quelle zulassen“ einschalten, zurückkehren und noch einmal auf „Installieren“ tippen."))
                activity.startActivity(Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse("package:" + activity.packageName)))
                return
            }
            val uri = Uri.parse("content://" + activity.packageName + UpdateFiles.SUFFIX + "/" + file.name)
            activity.startActivity(
                Intent(Intent.ACTION_VIEW)
                    .setDataAndType(uri, UpdateFiles.TYPE)
                    .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION),
            )
            publish(ready(i).put("installing", true))
        } catch (e: ActivityNotFoundException) {
            publish(failed(i, "Auf diesem Gerät ließ sich der Installer nicht öffnen. Die APK steht im Release „Test-APK“."))
        }
    }

    /** Die Seite des Releases im Browser (Download von Hand). */
    fun page() {
        try {
            activity.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(PAGE)))
        } catch (e: ActivityNotFoundException) {
            // Kein Browser: nichts zu tun.
        }
    }

    fun close() {
        stop = true
        worker.shutdown()
    }

    // ---------- Zustand ----------
    private fun base(name: String) = JSONObject().put("state", name).put("installed", installedName).put("page", PAGE)

    private fun about(name: String, i: Info) =
        base(name).put("version", i.version).put("notes", i.notes).put("size", i.size)

    private fun available(i: Info) = about("available", i)
    private fun ready(i: Info) = about("ready", i)
    private fun loading(i: Info, progress: Float, step: String) =
        about("downloading", i).put("progress", progress.toDouble()).put("step", step)

    private fun failed(i: Info, message: String) = about("failed", i).put("message", message)

    private fun publish(next: JSONObject) {
        state = next
        val code = "if(window.App&&App.onUpdate)App.onUpdate(" + JSONObject.quote(next.toString()) + ");"
        activity.runOnUiThread { activity.js(code) }
    }

    // ---------- version.json, Download, Prüfsumme ----------
    private fun parse(text: String): Info {
        val o = JSONObject(text)
        val version = o.optString("version").trim()
        val code = o.optLong("versionCode", 0)
        val a = o.optJSONObject("android") ?: throw Problem("version.json enthält keine Datei für Android.")
        val file = a.optString("file").trim()
        val sha = a.optString("sha256").trim().lowercase()
        if (version.isEmpty() || code <= 0 || !UpdateFiles.NAME.matches(file) || !Regex("[0-9a-f]{64}").matches(sha)) {
            throw Problem("version.json ist unvollständig.")
        }
        val url = a.optString("url").trim().ifEmpty { SOURCE.substringBeforeLast('/') + "/" + file }
        if (!url.startsWith("https://")) throw Problem("version.json nennt keine sichere Adresse.")
        return Info(version, code, o.optString("notes").trim(), file, url, sha, a.optLong("size", 0))
    }

    /** Eine schon geladene APK dieser Version, wenn sie vollständig ist. */
    private fun prepared(i: Info): File? =
        File(dir, i.file).takeIf { it.isFile && it.length() == i.size && sha256(it) == i.sha256 }

    /** Entfernt halbe Downloads und APKs von Versionen, die inzwischen installiert sind (läuft nie neben einem Download). */
    private fun cleanup() {
        dir.listFiles().orEmpty().forEach { f ->
            val v = Regex("\\d+\\.\\d+\\.\\d+").find(f.name)?.value
            if (v == null || f.name.endsWith(".part") || !newer(v, installedName)) f.delete()
        }
    }

    private fun read(url: String): String {
        val out = java.io.ByteArrayOutputStream()
        open(url, 15_000) { input -> input.copyTo(out) }
        return out.toString("UTF-8")
    }

    private fun fetch(url: String, dest: File, progress: (Long) -> Unit) {
        open(url, 30_000) { input ->
            dest.outputStream().use { out ->
                val buf = ByteArray(1 shl 16)
                var got = 0L
                while (true) {
                    if (stop) throw Cancelled()
                    val n = input.read(buf)
                    if (n <= 0) break
                    out.write(buf, 0, n)
                    got += n
                    progress(got)
                }
            }
        }
    }

    /** GET mit Weiterleitungen (github.com → Download-Server von GitHub), nur über https. */
    private fun open(url: String, timeout: Int, read: (InputStream) -> Unit) {
        var u = url
        var hops = 0
        while (true) {
            val con = URL(u).openConnection() as HttpURLConnection
            con.instanceFollowRedirects = false
            con.connectTimeout = timeout
            con.readTimeout = 60_000
            con.setRequestProperty("User-Agent", "Aeterna/$installedName (Android)")
            con.setRequestProperty("Cache-Control", "no-cache")
            try {
                val code = con.responseCode
                if (code in 300..399 && hops++ < 10) {
                    val next = URL(URL(u), con.getHeaderField("Location") ?: throw IOException("Weiterleitung ohne Ziel")).toString()
                    if (!next.startsWith("https://")) throw Problem("Der Update-Server leitet auf eine unsichere Adresse um.")
                    u = next
                    continue
                }
                if (code == 404) throw Problem("Im Release „Test-APK“ liegt gerade keine Version (vielleicht wird sie eben neu gebaut). Später noch einmal versuchen.")
                if (code != 200) throw IOException("Der Update-Server antwortet mit HTTP $code.")
                con.inputStream.use(read)
                return
            } finally {
                con.disconnect()
            }
        }
    }

    private fun explain(e: Throwable): String = when (e) {
        is Problem -> e.message.orEmpty()
        is java.net.UnknownHostException, is java.net.ConnectException, is java.net.SocketTimeoutException ->
            "Keine Verbindung zu github.com. Ist das Internet erreichbar? Das Spiel selbst läuft auch ohne."
        is javax.net.ssl.SSLException -> "Keine sichere Verbindung zu github.com möglich."
        else -> e.message ?: e.javaClass.simpleName
    }

    companion object {
        const val REPOSITORY = "ProjectPyTales/Aeterna_Hauptspiel"
        const val TAG = "test-apk"
        const val SOURCE = "https://github.com/$REPOSITORY/releases/download/$TAG/version.json"
        const val PAGE = "https://github.com/$REPOSITORY/releases/tag/$TAG"
        const val DIR = "updates"

        fun sha256(f: File): String {
            val md = MessageDigest.getInstance("SHA-256")
            f.inputStream().use { input ->
                val b = ByteArray(1 shl 20)
                while (true) {
                    val n = input.read(b)
                    if (n <= 0) break
                    md.update(b, 0, n)
                }
            }
            return md.digest().joinToString("") { "%02x".format(it) }
        }

        /** "1.36.0" → [1, 36, 0]; positiv, wenn [a] neuer ist als [b]. */
        fun newer(a: String, b: String): Boolean {
            fun parts(v: String) = v.trim().removePrefix("v").substringBefore('-').split('.').map { it.toIntOrNull() ?: 0 }
            val x = parts(a)
            val y = parts(b)
            for (k in 0 until maxOf(x.size, y.size)) {
                val d = x.getOrElse(k) { 0 } - y.getOrElse(k) { 0 }
                if (d != 0) return d > 0
            }
            return false
        }
    }
}
