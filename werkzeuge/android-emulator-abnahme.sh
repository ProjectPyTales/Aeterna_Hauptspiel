#!/usr/bin/env bash
# APK-Update und WSS-Duell auf einem eigens dafür erzeugten Android-13-AVD mit -writable-system.
set -euo pipefail
[[ ${1:-} == --leeres-test-avd ]] || { echo "Aufruf: $0 --leeres-test-avd alt.apk kandidat.apk test.apk html5.zip"; exit 2; }
old=$2
candidate=$3
instrument=$4
zip=$5
package=de.chroniken.helden.layout
runner=$package.test/de.chroniken.abnahme.SpielstandAbnahme
[[ $(adb shell getprop ro.kernel.qemu | tr -d '\r') == 1 ]]
[[ $(adb shell getprop ro.build.version.sdk | tr -d '\r') == 33 ]]
[[ -z $(adb shell pm list packages "$package") ]]
temp=$(mktemp -d)
cleanup(){
  result=$?
  if [[ $result != 0 ]]; then
    free -h
    df -h /tmp
    timeout 8 adb shell logcat -b crash -d -t 30 || true
    if [[ -n ${GITHUB_ACTIONS:-} ]]; then sudo dmesg | tail -25 || true; fi
  fi
  rm -rf "$temp"
}
trap cleanup EXIT

# Die APK vertraut ausschließlich Android-Systemzertifikaten. Dem wegwerfbaren AVD für diesen
# Lauf eine lokale CA geben. Beide privaten Schlüssel verlassen den Testrechner nie.
openssl req -x509 -newkey rsa:2048 -nodes -days 2 -subj '/CN=Aeterna lokale Abnahme-CA' \
  -addext 'basicConstraints=critical,CA:TRUE' -keyout "$temp/ca.key" -out "$temp/ca.crt" 2>/dev/null
openssl req -new -newkey rsa:2048 -nodes -subj '/CN=127.0.0.1' -keyout "$temp/server.key" -out "$temp/server.csr" 2>/dev/null
printf '%s\n' 'basicConstraints=CA:FALSE' 'subjectAltName=IP:127.0.0.1' 'extendedKeyUsage=serverAuth' > "$temp/server.ext"
openssl x509 -req -in "$temp/server.csr" -CA "$temp/ca.crt" -CAkey "$temp/ca.key" -CAcreateserial \
  -days 2 -extfile "$temp/server.ext" -out "$temp/server.crt"
openssl verify -CAfile "$temp/ca.crt" -verify_ip 127.0.0.1 "$temp/server.crt"
export AETERNA_TEST_CERT="$temp/server.crt" AETERNA_TEST_KEY="$temp/server.key"
cert_path=/system/etc/security/cacerts/$(openssl x509 -in "$temp/ca.crt" -subject_hash_old -noout).0
boot(){
  adb wait-for-device
  until [[ $(adb shell getprop sys.boot_completed | tr -d '\r') == 1 ]]; do sleep 2; done
}
adb root
adb wait-for-device
adb disable-verity
adb reboot
boot
adb root
adb wait-for-device
adb remount
adb shell "test ! -e '$cert_path'"
adb push "$temp/ca.crt" "$cert_path"
adb shell chmod 644 "$cert_path"
adb shell restorecon "$cert_path"
adb reboot
boot
adb shell ls "$cert_path"
adb shell wm size 960x540
adb shell wm density 160
adb shell dumpsys webviewupdate | head -12
free -h
df -h /tmp

step(){
  echo "Android-Prüfschritt $1"
  adb shell am force-stop "$package"
  adb shell am instrument -w -e isoliert ja -e schritt "$1" "$runner" | tee "$temp/$1.log"
  grep -q 'abnahme=OK' "$temp/$1.log"
  grep -q 'INSTRUMENTATION_CODE: -1' "$temp/$1.log"
}
adb install "$old"
adb install "$instrument"
step anlegen
step basis
adb install -r "$candidate"
step update
adb shell dumpsys package "$package" | sed -n '/versionCode=/p;/versionName=/p'
# Dieses Profil ist zu Beginn nachweislich leer gewesen.
adb uninstall "$package"
adb install "$candidate"
step neu
step duell &
instrument_pid=$!
node werkzeuge/freundesduell-test.js "$zip" --android
wait "$instrument_pid"
