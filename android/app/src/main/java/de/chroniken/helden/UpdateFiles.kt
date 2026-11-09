package de.chroniken.helden

import android.content.ContentProvider
import android.content.ContentValues
import android.database.Cursor
import android.database.MatrixCursor
import android.net.Uri
import android.os.ParcelFileDescriptor
import android.provider.OpenableColumns
import java.io.File
import java.io.FileNotFoundException

/**
 * Gibt die geladene Update-APK dem Installer von Android (seit 1.36.0, [Updater]): nur Dateien aus `cache/updates/`, nur
 * lesend und nur mit der Freigabe des einen Aufrufs (`FLAG_GRANT_READ_URI_PERMISSION`, der Provider ist nicht exportiert).
 * Ein kleiner Ersatz für den FileProvider aus androidx – die Hülle kommt weiter ohne Bibliotheken aus.
 */
class UpdateFiles : ContentProvider() {
    override fun onCreate() = true

    private fun file(uri: Uri): File {
        val name = uri.lastPathSegment ?: throw FileNotFoundException("ohne Namen")
        if (uri.pathSegments.size != 1 || !NAME.matches(name)) throw FileNotFoundException(name)
        val f = File(File(context?.cacheDir ?: throw FileNotFoundException(name), Updater.DIR), name)
        if (!f.isFile) throw FileNotFoundException(name)
        return f
    }

    override fun openFile(uri: Uri, mode: String): ParcelFileDescriptor {
        if (mode != "r") throw SecurityException("Update-Dateien sind nur lesbar")
        return ParcelFileDescriptor.open(file(uri), ParcelFileDescriptor.MODE_READ_ONLY)
    }

    override fun getType(uri: Uri): String = TYPE

    /** Name und Größe, wie sie der Installer anzeigt. */
    override fun query(uri: Uri, projection: Array<out String>?, selection: String?, selectionArgs: Array<out String>?, sortOrder: String?): Cursor {
        val f = file(uri)
        val columns = projection?.filter { it == OpenableColumns.DISPLAY_NAME || it == OpenableColumns.SIZE }?.toTypedArray()
            ?: arrayOf(OpenableColumns.DISPLAY_NAME, OpenableColumns.SIZE)
        val row = columns.map<String, Any> { if (it == OpenableColumns.SIZE) f.length() else f.name }.toTypedArray()
        return MatrixCursor(columns, 1).apply { addRow(row) }
    }

    override fun insert(uri: Uri, values: ContentValues?): Uri? = null
    override fun delete(uri: Uri, selection: String?, selectionArgs: Array<out String>?) = 0
    override fun update(uri: Uri, values: ContentValues?, selection: String?, selectionArgs: Array<out String>?) = 0

    companion object {
        /** Authority = Paket-ID + SUFFIX (AndroidManifest.xml: `${applicationId}.updates`). */
        const val SUFFIX = ".updates"
        const val TYPE = "application/vnd.android.package-archive"
        /** Dateiname einer Update-APK wie im Release, z. B. Aeterna-1.36.0-Test.apk – ohne Pfad. */
        val NAME = Regex("Aeterna-\\d+\\.\\d+\\.\\d+-Test\\.apk")
    }
}
