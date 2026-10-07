package de.chroniken.helden

import android.content.Context
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.view.HapticFeedbackConstants

/**
 * Vibrationsmuster für die Haptik-Sprache (AP 4.5): leicht, mittel, schwer, doppelt.
 * Ab Android 10 die vordefinierten Effekte des Geräts (auf dem OnePlus 15 der lineare Motor), davor kurze Impulse.
 */
class Haptics(private val activity: MainActivity) {
    private val vibrator: Vibrator? =
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            (activity.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as? VibratorManager)?.defaultVibrator
        } else {
            @Suppress("DEPRECATION")
            activity.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
        }

    val available: Boolean get() = vibrator?.hasVibrator() == true

    fun play(kind: Int) {
        val v = vibrator
        if (v == null || !v.hasVibrator()) {
            activity.window.decorView.performHapticFeedback(
                if (kind == 0) HapticFeedbackConstants.KEYBOARD_TAP else HapticFeedbackConstants.LONG_PRESS
            )
            return
        }
        v.vibrate(effect(kind))
    }

    private fun effect(kind: Int): VibrationEffect =
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            VibrationEffect.createPredefined(
                when (kind) {
                    0 -> VibrationEffect.EFFECT_TICK
                    1 -> VibrationEffect.EFFECT_CLICK
                    2 -> VibrationEffect.EFFECT_HEAVY_CLICK
                    else -> VibrationEffect.EFFECT_DOUBLE_CLICK
                }
            )
        } else {
            when (kind) {
                0 -> VibrationEffect.createOneShot(12, 90)
                1 -> VibrationEffect.createOneShot(25, 160)
                2 -> VibrationEffect.createOneShot(45, 255)
                else -> VibrationEffect.createWaveform(longArrayOf(0, 25, 80, 25), intArrayOf(0, 200, 0, 200), -1)
            }
        }
}
