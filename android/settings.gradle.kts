// Native Android-Hülle von Aeterna (AP 2.1). Das Web-Spiel liegt unverändert unter quellcode/assets/game.
pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
rootProject.name = "Aeterna"
include(":app")
