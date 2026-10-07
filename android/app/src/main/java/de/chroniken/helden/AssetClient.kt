package de.chroniken.helden

import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import java.io.ByteArrayInputStream
import java.io.IOException

/**
 * Liefert das Web-Spiel aus den APK-Assets (`assets/game/…`) unter https://chroniken.local/ aus – wie die alte
 * Hülle, aber mit echten MIME-Typen (WebP, JPEG, WOFF2, SVG …). Andere Adressen und Pfade mit `..` sind gesperrt.
 */
class AssetClient(private val activity: MainActivity) : WebViewClient() {
    override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse {
        val url = request.url
        if (url.scheme != "https" || url.host != MainActivity.HOST) return empty(403, "Forbidden")
        var path = url.path ?: "/"
        if (path == "/") path = "/index.html"
        if (path.contains("..")) return empty(403, "Forbidden")
        return try {
            val stream = activity.assets.open("game$path")
            val type = mime(path)
            val text = type.startsWith("text/") || type == "application/json" || type == "image/svg+xml"
            WebResourceResponse(type, if (text) "UTF-8" else null, 200, "OK", HEADERS, stream)
        } catch (e: IOException) {
            empty(404, "Not Found")
        }
    }

    override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean =
        !request.url.toString().startsWith(MainActivity.ORIGIN)

    override fun onPageFinished(view: WebView, url: String) {
        activity.onPageReady()
    }

    private fun empty(status: Int, reason: String) =
        WebResourceResponse("text/plain", "UTF-8", status, reason, HEADERS, ByteArrayInputStream(ByteArray(0)))

    companion object {
        private val HEADERS = mapOf(
            "Cache-Control" to "no-store",
            "Access-Control-Allow-Origin" to MainActivity.ORIGIN.dropLast(1),
        )
        private val TYPES = mapOf(
            "html" to "text/html", "js" to "text/javascript", "css" to "text/css", "json" to "application/json",
            "txt" to "text/plain", "md" to "text/plain", "svg" to "image/svg+xml",
            "png" to "image/png", "jpg" to "image/jpeg", "jpeg" to "image/jpeg", "webp" to "image/webp",
            "ogg" to "audio/ogg", "mp3" to "audio/mpeg", "wav" to "audio/wav",
            "ttf" to "font/ttf", "otf" to "font/otf", "woff" to "font/woff", "woff2" to "font/woff2",
        )

        fun mime(path: String): String =
            TYPES[path.substringAfterLast('.', "").lowercase()] ?: "application/octet-stream"
    }
}
