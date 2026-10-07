package de.chroniken.helden

import android.app.Activity
import android.content.Intent
import android.content.SharedPreferences
import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.ViewTreeObserver
import android.view.WindowInsets
import android.view.WindowInsetsController
import android.view.WindowManager
import android.webkit.WebSettings
import android.webkit.WebView
import android.widget.Toast
import android.window.OnBackInvokedCallback
import android.window.OnBackInvokedDispatcher
import org.json.JSONObject
import java.io.ByteArrayOutputStream

/**
 * Aeterna – native Hülle (AP 2.1, ersetzt die nur kompiliert vorliegende Hülle bis 1.11.0).
 *
 * Eine WebView zeigt das Web-Spiel aus den Assets unter https://chroniken.local/ (siehe [AssetClient]).
 * Die JS-Brücke `window.Android` ([Bridge]) ist zur alten Hülle identisch und um `keepAwake`, `info` und
 * Vibrationsmuster erweitert; die Hülle ruft wie bisher `App.back()`, `App.importText()`, `App.onPause()`,
 * `App.onResume()` und `App.resize()` auf. Spielstand: SharedPreferences `chroniken_v1`/`profile` wie bisher,
 * dazu localStorage des Ursprungs https://chroniken.local – beides bleibt beim Update erhalten.
 */
class MainActivity : Activity() {
    internal lateinit var prefs: SharedPreferences
    internal lateinit var haptics: Haptics
    private var web: WebView? = null
    private var exportPending: String? = null
    private var pageReady = false
    private var backCallback: OnBackInvokedCallback? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        prefs = getSharedPreferences(PREFS, MODE_PRIVATE)
        haptics = Haptics(this)
        window.attributes = window.attributes.apply {
            layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES
        }
        preferHighRefreshRate()

        val view = WebView(this)
        view.setBackgroundColor(Color.rgb(20, 33, 42))
        setContentView(view)
        with(view.settings) {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = false
            allowContentAccess = false
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            mediaPlaybackRequiresUserGesture = false
            builtInZoomControls = false
            displayZoomControls = false
            setSupportZoom(false)
            textZoom = 100
            cacheMode = WebSettings.LOAD_NO_CACHE
        }
        view.addJavascriptInterface(Bridge(this), "Android")
        view.webViewClient = AssetClient(this)
        view.setOnApplyWindowInsetsListener { v, insets ->
            v.post { sendInsets() }
            insets
        }
        web = view
        holdSplashUntilPageReady(view)
        immersive()
        registerBack()
        view.loadUrl(ORIGIN + "index.html")
    }

    /** Android 12+: Der System-Splash mit dem Aeterna-Zeichen bleibt, bis der Ladebildschirm der Seite steht (höchstens 1,5 s). */
    private fun holdSplashUntilPageReady(view: View) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) return
        val started = System.currentTimeMillis()
        view.viewTreeObserver.addOnPreDrawListener(object : ViewTreeObserver.OnPreDrawListener {
            override fun onPreDraw(): Boolean {
                if (!pageReady && System.currentTimeMillis() - started < 1500) return false
                view.viewTreeObserver.removeOnPreDrawListener(this)
                return true
            }
        })
    }

    internal fun onPageReady() {
        pageReady = true
        sendInsets()
    }

    /** Vollbild: Status- und Navigationsleiste verborgen, Wischen vom Rand zeigt sie kurz. */
    @Suppress("DEPRECATION")
    private fun immersive() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.setDecorFitsSystemWindows(false)
            window.insetsController?.let {
                it.hide(WindowInsets.Type.systemBars())
                it.systemBarsBehavior = WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
            }
        } else {
            window.decorView.systemUiVisibility = (View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY or View.SYSTEM_UI_FLAG_FULLSCREEN
                or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION or View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN)
        }
    }

    /** Höchste Bildwiederholrate des Displays bei gleicher Auflösung (90/120 Hz statt 60 Hz). */
    @Suppress("DEPRECATION")
    private fun preferHighRefreshRate() {
        val display = (if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) display else windowManager.defaultDisplay) ?: return
        val current = display.mode
        val best = display.supportedModes
            .filter { it.physicalWidth == current.physicalWidth && it.physicalHeight == current.physicalHeight }
            .maxByOrNull { it.refreshRate } ?: return
        if (best.modeId != current.modeId) {
            window.attributes = window.attributes.apply { preferredDisplayModeId = best.modeId }
        }
    }

    /**
     * Sichere Ränder (Kamera-Aussparung) in CSS-Pixeln an das Spiel: Inhalte bleiben im sicheren Bereich,
     * Hintergründe und Untermenüs reichen bis an den Rand (`App.resize()`).
     */
    internal fun sendInsets() {
        val cutout = web?.rootWindowInsets?.displayCutout
        val density = resources.displayMetrics.density
        fun css(px: Int?) = (px ?: 0) / density
        js(
            "window.safeInsets={left:${css(cutout?.safeInsetLeft)},right:${css(cutout?.safeInsetRight)}," +
                "top:${css(cutout?.safeInsetTop)},bottom:${css(cutout?.safeInsetBottom)}};if(window.App)App.resize();"
        )
    }

    internal fun js(code: String) {
        web?.evaluateJavascript(code, null)
    }

    internal fun keepAwake(on: Boolean) {
        if (on) window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        else window.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
    }

    // ---------- Zurück-Taste und -Geste: entscheidet das Spiel (Dialog schließen, Menü, Beenden) ----------
    private fun registerBack() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            val callback = OnBackInvokedCallback { back() }
            onBackInvokedDispatcher.registerOnBackInvokedCallback(OnBackInvokedDispatcher.PRIORITY_DEFAULT, callback)
            backCallback = callback
        }
    }

    private fun back() = js("if(window.App)App.back();")

    @Deprecated("Bis Android 12; ab Android 13 über OnBackInvokedCallback")
    @Suppress("DEPRECATION")
    override fun onBackPressed() = back()

    // ---------- Spielstand exportieren und importieren (Speicherzugriffs-Framework) ----------
    internal fun startExport(raw: String) {
        exportPending = raw
        val intent = Intent(Intent.ACTION_CREATE_DOCUMENT)
            .addCategory(Intent.CATEGORY_OPENABLE)
            .setType("application/json")
            .putExtra(Intent.EXTRA_TITLE, EXPORT_NAME)
        startActivityForResult(intent, REQUEST_EXPORT)
    }

    internal fun startImport() {
        val intent = Intent(Intent.ACTION_OPEN_DOCUMENT)
            .addCategory(Intent.CATEGORY_OPENABLE)
            .setType("*/*")
        startActivityForResult(intent, REQUEST_IMPORT)
    }

    @Suppress("DEPRECATION")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        val uri = data?.data
        if (resultCode != RESULT_OK || uri == null) {
            if (requestCode == REQUEST_EXPORT) exportPending = null
            return
        }
        try {
            if (requestCode == REQUEST_EXPORT) {
                val raw = exportPending ?: return
                contentResolver.openOutputStream(uri)?.use { it.write(raw.toByteArray(Charsets.UTF_8)) }
                exportPending = null
                Toast.makeText(this, "Spielstand exportiert", Toast.LENGTH_SHORT).show()
            } else if (requestCode == REQUEST_IMPORT) {
                val out = ByteArrayOutputStream()
                contentResolver.openInputStream(uri)?.use { input ->
                    val buffer = ByteArray(8192)
                    while (true) {
                        val n = input.read(buffer)
                        if (n <= 0) break
                        out.write(buffer, 0, n)
                        if (out.size() > MAX_SAVE) throw IllegalStateException("Datei zu groß")
                    }
                }
                js("if(window.App)App.importText(" + JSONObject.quote(out.toString("UTF-8")) + ");")
            }
        } catch (e: Exception) {
            Toast.makeText(this, "Datei konnte nicht gelesen oder geschrieben werden", Toast.LENGTH_LONG).show()
        }
    }

    // ---------- Lebenszyklus ----------
    override fun onPause() {
        js("if(window.App)App.onPause();")
        web?.onPause()
        super.onPause()
    }

    override fun onResume() {
        super.onResume()
        web?.let {
            it.onResume()
            js("if(window.App)App.onResume();")
            immersive()
        }
    }

    override fun onWindowFocusChanged(hasFocus: Boolean) {
        super.onWindowFocusChanged(hasFocus)
        if (hasFocus) {
            immersive()
            sendInsets()
        }
    }

    override fun onDestroy() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            backCallback?.let { onBackInvokedDispatcher.unregisterOnBackInvokedCallback(it) }
        }
        web?.let {
            it.removeJavascriptInterface("Android")
            it.destroy()
        }
        web = null
        super.onDestroy()
    }

    companion object {
        const val HOST = "chroniken.local"
        const val ORIGIN = "https://$HOST/"
        const val PREFS = "chroniken_v1"
        const val EXPORT_NAME = "Aeterna-Spielstand.json"
        const val MAX_SAVE = 2_000_000
        private const val REQUEST_EXPORT = 51
        private const val REQUEST_IMPORT = 52
    }
}
