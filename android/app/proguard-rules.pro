# Die Brücke wird nur aus JavaScript aufgerufen: Methoden mit @JavascriptInterface nicht entfernen oder umbenennen.
-keepclassmembers class de.chroniken.helden.Bridge {
    @android.webkit.JavascriptInterface public *;
}
