#!/usr/bin/env node
// Automatische Updates (seit 1.36.0): schreibt version.json für das Release „Test-APK“. Die App liest
//   https://github.com/ProjectPyTales/Aeterna_Hauptspiel/releases/download/test-apk/version.json
// (ein einfacher Download, ohne GitHub-Konto), vergleicht versionCode, lädt die APK und prüft Größe und SHA-256
// (android/…/Updater.kt). Version und versionCode kommen aus android/app/build.gradle.kts, „Was ist neu“ aus
// quellcode/assets/game/model/neu.js.
//
// Aufruf (CI, Job „apk“ auf main): node werkzeuge/update_info.js Aeterna-<Version>-Test.apk version.json
// Ohne Ausgabedatei: JSON auf die Standardausgabe. GITHUB_REPOSITORY ändert das Repository der Adresse.
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.join(__dirname,'..');
const TAG='test-apk',REPOSITORY='ProjectPyTales/Aeterna_Hauptspiel';
const FILE=/^Aeterna-\d+\.\d+\.\d+-Test\.apk$/; // wie UpdateFiles.NAME in der Hülle

function gradle(text=fs.readFileSync(path.join(root,'android/app/build.gradle.kts'),'utf8')){
 const name=text.match(/versionName = "([\d.]+)"/)?.[1],code=Number(text.match(/versionCode = (\d+)/)?.[1]);
 if(!name||!Number.isInteger(code)||code<1)throw Error('versionName/versionCode nicht gefunden');
 return {name,code};}

function info(apk,{repository=process.env.GITHUB_REPOSITORY||REPOSITORY,today=new Date(),version=gradle(),neu=require('../quellcode/assets/game/model/neu.js')}={}){
 const file=path.basename(apk);
 if(!FILE.test(file))throw Error('Dateiname passt nicht zur Hülle (Aeterna-<Version>-Test.apk): '+file);
 if(!file.includes('-'+version.name+'-'))throw Error('Datei '+file+' gehört nicht zu Version '+version.name);
 const bytes=fs.readFileSync(apk);
 // Steht in neu.js noch die alte Version, sagt der Hinweis nur Allgemeines (der Test aeterna/updates verhindert das).
 const notes=neu.version===version.name&&neu.notes?neu.notes:'Fehlerbehebungen und Verbesserungen.';
 return {version:version.name,versionCode:version.code,published:today.toISOString().slice(0,10),notes,
  android:{file,url:`https://github.com/${repository}/releases/download/${TAG}/${file}`,
   sha256:crypto.createHash('sha256').update(bytes).digest('hex'),size:bytes.length}};}

if(require.main===module){
 const [apk,out]=process.argv.slice(2);
 if(!apk){console.error('Aufruf: node werkzeuge/update_info.js <APK> [version.json]');process.exit(2);}
 const json=JSON.stringify(info(apk),null,2)+'\n';
 if(out){fs.writeFileSync(out,json);console.log('geschrieben: '+out);}
 process.stdout.write(json);}

module.exports={info,gradle,TAG,REPOSITORY,FILE};
