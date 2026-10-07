// Aeterna – native Hülle (AP 2.1). Paket-ID und Signaturschlüssel bleiben, sonst gibt es kein Update.
// Version: versionName muss VERSION in quellcode/assets/game/app.js entsprechen (Test aeterna.test.js),
// versionCode steigt mit jeder Version (1.11.0 war 14).
import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "de.chroniken.helden"
    compileSdk = 36

    defaultConfig {
        applicationId = "de.chroniken.helden.layout"
        minSdk = 28
        targetSdk = 36
        versionCode = 18
        versionName = "1.15.0"
    }

    signingConfigs {
        create("test") {
            storeFile = rootProject.file("../werkzeuge/signatur/chroniken-test.p12")
            storeType = "pkcs12"
            storePassword = "chroniken-test"
            keyAlias = "chroniken"
            keyPassword = "chroniken-test"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
            signingConfig = signingConfigs.getByName("test")
        }
        debug {
            signingConfig = signingConfigs.getByName("test")
        }
    }

    // Das Web-Spiel kommt unverändert aus quellcode/assets (Ordner game/ → https://chroniken.local/).
    sourceSets["main"].assets.srcDirs(rootProject.file("../quellcode/assets"))

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    packaging {
        resources.excludes += setOf("META-INF/*.version", "kotlin/**", "DebugProbesKt.bin")
    }

    lint {
        abortOnError = false
        checkReleaseBuilds = false
    }
}

kotlin {
    compilerOptions {
        jvmTarget.set(JvmTarget.JVM_17)
    }
}
