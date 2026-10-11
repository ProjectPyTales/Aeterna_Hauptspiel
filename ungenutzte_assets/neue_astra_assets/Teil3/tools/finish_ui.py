from pathlib import Path
import json, hashlib, shutil, html, io, base64, subprocess, re, zipfile, sys
import xml.etree.ElementTree as ET
from PIL import Image, ImageDraw, ImageChops
import numpy as np

ROOT=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else Path(__file__).resolve().parents[1];O=ROOT/'output/Chronicle_of_Heroes_Assets_Teil_03'
P1=ROOT/'input/Chronicle_of_Heroes_Assets_Teil_01/Chronicle_of_Heroes_Assets_Teil_01'
P2=ROOT/'input/Chronicle_of_Heroes_Assets_Teil_02/Chronicle_of_Heroes_Assets_Teil_02'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def js(p,o):(O/p).write_text(json.dumps(o,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
M=json.loads((O/'ASSET_MANIFEST.json').read_text());assets=M['assets'];atlas=json.loads((O/'ATLAS_MANIFEST.json').read_text())['atlases']
(O/'previews').mkdir(exist_ok=True);(O/'tools').mkdir(exist_ok=True)
for name in ['build_ui.py','finish_ui.py']:
    src=Path(__file__).with_name(name);dst=O/'tools'/name
    if src.resolve()!=dst.resolve():shutil.copyfile(src,dst)

# Native-vector preview generated from the actual XML paths (not claimed a device screenshot).
A='{http://schemas.android.com/apk/res/android}'
def vecsvg(path):
    root=ET.parse(path).getroot();gradid=[0];defs=[]
    def visit(el):
        if el.tag=='group':
            tx=el.get(A+'translateX','0');ty=el.get(A+'translateY','0');sx=el.get(A+'scaleX','1');sy=el.get(A+'scaleY','1')
            return f'<g transform="translate({tx} {ty}) scale({sx} {sy})">'+''.join(visit(c) for c in el)+'</g>'
        if el.tag!='path':return ''.join(visit(c) for c in el)
        attrs={'d':el.get(A+'pathData'),'fill':el.get(A+'fillColor','none')}
        if attrs['fill']=='#00000000':attrs['fill']='none'
        for key,val in [('strokeColor','stroke'),('strokeWidth','stroke-width')]:
            if el.get(A+key):attrs[val]=el.get(A+key)
        for gr in el.iter('gradient'):
            gid='g'+str(gradid[0]);gradid[0]+=1
            stops=''.join(f'<stop offset="{c.get(A+"offset")}" stop-color="{c.get(A+"color")}"/>' for c in gr)
            defs.append(f'<linearGradient id="{gid}" gradientUnits="userSpaceOnUse" x1="{gr.get(A+"startX")}" y1="{gr.get(A+"startY")}" x2="{gr.get(A+"endX")}" y2="{gr.get(A+"endY")}">{stops}</linearGradient>');attrs['fill']=f'url(#{gid})'
        return '<path '+' '.join(f'{k}="{v}"' for k,v in attrs.items())+'/>'
    body=visit(root);return '<svg xmlns="http://www.w3.org/2000/svg" width="432" height="432" viewBox="0 0 108 108"><defs>'+''.join(defs)+'</defs>'+body+'</svg>'
for id in ['ic_launcher_foreground','ic_launcher_monochrome','splash_icon','ic_launcher_background']:
    s=ROOT/'work'/f'{id}-preview.svg';s.write_text(vecsvg(O/f'android-res/drawable/{id}.xml'))
    q=O/'previews'/f'{id}.png'
    subprocess.run(['node','-e',"require('sharp')(process.argv[1]).png().toFile(process.argv[2]).catch(e=>{console.error(e);process.exit(1)})",str(s),str(q)],check=True,capture_output=True)
native=Image.new('RGB',(1200,400),'#302e2c');d=ImageDraw.Draw(native)
for i,id in enumerate(['ic_launcher_foreground','ic_launcher_monochrome','splash_icon','ic_launcher_background']):
    im=Image.open(O/'previews'/f'{id}.png').convert('RGBA');im.thumbnail((280,280));native.paste(im,(i*300+10,50),im);d.text((i*300+10,20),id,fill='white')
native.save(O/'previews/android-uebersicht.jpg')

# Derived previews explicitly excluded from production asset counts.
hall=Image.open(P1/'game-assets/art/hall-aeterna.webp').convert('RGBA')
overlay=Image.open(O/'assets/geometry/hauptmenue-trefferflaechen.png');hall.alpha_composite(overlay);hall.thumbnail((1301,542));hall.convert('RGB').save(O/'previews/hauptmenue-geometrie.jpg',quality=90)
canvas=Image.new('RGB',(1200,350),'#282d34');draw=ImageDraw.Draw(canvas)
for i,a in enumerate(x for x in assets if x['category']=='card_aperture_mask'):
    mask=Image.open(O/a['file']);frame=Image.open(P1/'assets/ui-art'/Path(a['file']).name.replace('-clip','')).convert('RGBA')
    fill=Image.new('RGBA',mask.size,'#28779e');fill.putalpha(mask.getchannel('A'));fill.alpha_composite(frame);fill.thumbnail((200,300));canvas.paste(fill,(i*200,30),fill);draw.text((i*200,5),a['id'].replace('kartenrahmen-','').replace('-clip',''),fill='white')
canvas.save(O/'previews/masken.jpg')
scroll=Image.new('RGBA',(140,1100));top=Image.open(O/'assets/ui-art/chronikleiste-oben.png');mid=Image.open(O/'assets/ui-art/chronikleiste-mitte.png');bot=Image.open(O/'assets/ui-art/chronikleiste-unten.png')
th=round(top.height*140/top.width);bh=round(bot.height*140/bot.width)
scroll.paste(top.resize((140,th)),(0,0));scroll.paste(mid.resize((140,1100-th-bh)),(0,th));scroll.paste(bot.resize((140,bh)),(0,1100-bh));scroll.save(O/'previews/chronikleiste-140x1100.png')

def data_image(im):
    b=io.BytesIO();im.save(b,format='PNG');return 'data:image/png;base64,'+base64.b64encode(b.getvalue()).decode()
cards=[]
for a in assets:
    f=a.get('png',a['file'])
    if a['category']=='android_drawable':f='previews/'+a['id']+'.png'
    src=f
    if a.get('required_existing_emblem'):
        im=Image.open(O/f).convert('RGBA');em=Image.open(P1/a['required_existing_emblem']).convert('RGBA').resize((100,100),Image.Resampling.LANCZOS)
        if a['state']=='disabled':em.putalpha(em.getchannel('A').point(lambda a:round(a*.46)))
        off=(2,4) if a['state']=='pressed' else (0,0);im.alpha_composite(em,(46+off[0],46+off[1]));src=data_image(im)
    cards.append(f'<article data-key="{a["id"]} {a["category"]}"><div class="image"><img src="{src}" alt="{a["id"]}" loading="lazy"></div><small>{a["category"]}</small><h3>{a["id"]}</h3><a href="{a["file"]}">Datei öffnen</a></article>')
catalog='''<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Aeterna — Teil 03</title><style>
*{box-sizing:border-box}body{margin:0;background:#f3ecdf;color:#352c24;font:16px system-ui,sans-serif}header{background:#302b25;color:#fff3d4;padding:42px max(24px,calc((100vw - 1280px)/2))}header p{max-width:800px;line-height:1.6}h1{font:42px Georgia,serif;margin:8px 0}small{color:#876646;font-size:12px}.tag{color:#d9b06b;letter-spacing:3px}main{max-width:1328px;margin:auto;padding:24px}nav{display:flex;gap:24px;flex-wrap:wrap;margin-bottom:24px}a{color:#795023}input{width:100%;padding:16px;border:1px solid #c2ad89;border-radius:8px;font:inherit;background:#fffaf2;margin-bottom:24px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:16px}article{background:#fffaf2;border:1px solid #dbc9a9;padding:14px;border-radius:10px;overflow:hidden}.image{height:184px;display:grid;place-items:center;background:repeating-conic-gradient(#e3ded4 0% 25%,#f2eee6 0% 50%) 50%/18px 18px;border-radius:6px;margin-bottom:12px}.image img{max-height:174px;max-width:100%}h3{font-size:14px;overflow-wrap:anywhere;min-height:36px;margin:8px 0}section{margin-top:32px}section img{max-width:100%;height:auto;border-radius:8px}.notice{border-left:4px solid #b79150;padding:10px 18px;background:#ece0c9;line-height:1.6}footer{padding:32px;color:#715b43}article[hidden]{display:none}</style>
<header><div class="tag">CHRONICLE OF HEROES / AETERNA</div><h1>Teil 03 · UI vervollständigen</h1><p>41 Bausteine · 3 UI-Atlanten · 0 neue Kartenmotive. Ergänzung der vorhandenen Benutzeroberfläche, Masken und nativen Android-Ressourcen.</p></header><main><nav><a href="START_HIER.md">Start</a><a href="EINBAUANLEITUNG.md">Einbauanleitung</a><a href="ASSET_MANIFEST.json">Manifest</a><a href="PRUEFBERICHT.json">Technischer Prüfbericht</a><a href="LIEFERSTATUS.md">Restbestand</a></nav><p class="notice">Die Seltenheitsvorschauen kombinieren neue Zustände mit den bereits gelieferten Archiv-Siegeln aus Teil 01. Masken, Ausschnitte, Android-Vorschauen und Atlanten zählen nicht als neue Kartenillustrationen. Die Integration ins Spiel ist noch nicht erfolgt.</p><input id="search" aria-label="Assets filtern" placeholder="Nach ID oder Kategorie filtern …"><div class="grid">'''+''.join(cards)+'''</div><section><h2>Trefferflächen auf dem gelieferten Menü</h2><p>Technische Überlagerung auf Teil 01; neun Bedienelemente.</p><img src="previews/hauptmenue-geometrie.jpg" alt="Hauptmenü mit markierten Trefferflächen"></section><section><h2>Sechs passende Bildfenster</h2><p>Blau zeigt die nutzbare Motivfläche unter den vorhandenen Rahmen.</p><img src="previews/masken.jpg" alt="Masken in sechs Rahmen"></section><section><h2>Native Android-Ableitungen</h2><p>Lokale Darstellung der XML-Pfade; kein Gerätescreenshot.</p><img src="previews/android-uebersicht.jpg" alt="Android Ressourcen"></section><section><h2>Chronikleiste</h2><p>Vorschau der 3-Slice-Anpassung auf 140 × 1100.</p><img src="previews/chronikleiste-140x1100.png" alt="Schmale Chronikleiste"></section></main><footer>Stand 9. Oktober 2026. Alle alten Lieferungen und gerettet.zip bleiben erforderlich.</footer><script>document.querySelector('#search').addEventListener('input',e=>{const q=e.target.value.toLowerCase();document.querySelectorAll('article').forEach(x=>x.hidden=!x.dataset.key.includes(q))})</script></html>'''
(O/'ASSET_KATALOG.html').write_text(catalog,encoding='utf-8')

# Short technical verification, no gameplay or broad historical audit.
checks={};checks['asset_count']=len(assets);assert len(assets)==41
ids=[a['id'] for a in assets];assert len(ids)==len(set(ids));checks['unique_ids']=True
for a in assets:assert sha(O/a['file'])==a['sha256']
checks['manifest_paths_and_hashes']=True
images=list(O.rglob('*.png'))+list(O.rglob('*.jpg'))
for p in images:
    with Image.open(p) as im:im.load()
checks['decoded_raster_files']=len(images)
xmls=list(O.rglob('*.svg'))+list(O.rglob('*.xml'))
for p in xmls:ET.parse(p)
checks['parsed_svg_and_android_xml']=len(xmls)
for at in atlas:
    im=Image.open(O/at['file']).convert('RGBA')
    for e in at['entries']:
        x,y,w,h=e['rect'];src=Image.open(O/e['source']).convert('RGBA');assert im.crop((x,y,x+w,y+h)).tobytes()==src.tobytes()
checks['atlas_pixel_exact_entries']=sum(len(a['entries']) for a in atlas)
for a in assets:
    if a['category']=='card_aperture_mask':
        im=Image.open(O/a['file']);assert list(im.size)==a['size'];alpha=np.array(im.getchannel('A'));assert set(np.unique(alpha))=={0,255};assert not alpha[0].any() and not alpha[-1].any()
checks['six_masks_enclosed_and_nonempty']=True
src=Image.open(P1/'assets/ui-art/chronikleiste.png').convert('RGBA');rebuild=Image.new('RGBA',src.size)
for a in assets:
    if a['category']=='chronicle_slice':x,y,w,h=a['source_rect'];rebuild.paste(Image.open(O/a['file']),(x,y))
assert src.tobytes()==rebuild.tobytes();checks['chronicle_lossless_reassembly']=True
preserved=['GERETTETE_ASSETS_ZUORDNUNG.json','GERETTETE_ASSETS_ZUORDNUNG.csv','GESPERRTE_ZUORDNUNGSPRUEFUNG.json','OFFENE_GENERIERUNGSAUFTRAEGE.json','OFFENE_ASSETS.csv','RESTBESTAND.json']
for name in preserved:assert sha(O/name)==sha(P2/name)
checks['unchanged_carried_forward_files']=preserved
jobs=json.loads((O/'OFFENE_GENERIERUNGSAUFTRAEGE.json').read_text());assert jobs['count']==len(jobs['jobs'])==295
locks=json.loads((O/'GESPERRTE_ZUORDNUNGSPRUEFUNG.json').read_text());assert {a['id'] for a in locks['jobs']}=={'hypatia_0','hypatia_2'}
rescue=json.loads((O/'GERETTETE_ASSETS_ZUORDNUNG.json').read_text());assert len(rescue)==41
checks['open_jobs']=295;checks['rescued_motifs_locked']=41;checks['alexandria_ids_locked']=['hypatia_0','hypatia_2']
checks['new_card_token_motifs']=0
refs=set()
for p in (O/'android-res').rglob('*.xml'):
    refs.update(re.findall(r'@(drawable|color)/(\w+)',p.read_text()))
for typ,name in refs:
    assert (O/f'android-res/{typ}/{name}.xml').exists() or (typ,name)==('color','hall')
checks['android_resource_references_resolved']=True
checks['android_foreground_geometric_safe_circle_radius']=33
checks['android_actual_compile_or_device_test']=False
checks['known_filter_background_reuse']='Vier Seltenheiten teilen Grundgrafik; unterschiedliche Archiv-Siegel aus Teil 01 sind verbindliche Overlay-Abhängigkeiten.'
js('PRUEFBERICHT.json',dict(release='Teil 03',result='passed_limited_technical_checks',checks=checks,limits=['Keine Integration ins eigentliche Spiel','Kein APK-Build, kein Gerätetest','Keine umfassende visuelle oder historische Abnahme','Menü-Geometrie muss später mit realen Touch-/Zoomtransformationen getestet werden'],input_archives={p.name:sha(p) for p in (ROOT/'upload').glob('*.zip')}))
js('STATUS_TEIL_03.json',dict(release='Teil 03',date='2026-10-09',priority='UI first, <=50 exception',delivered_ui_components=41,new_card_token_motifs=0,regular_open_card_token_jobs=295,blocked_card_jobs=2,total_remaining_card_token_jobs=297,rescued_motifs_locked=41,known_pending_ui_asset_groups=[],pending_integration=['Einbau im Spiel','Android-Ressourcen kompilieren und auf Gerät prüfen','Menü-Trefferflächen im Laufzeitlayout prüfen'],prior_releases_required=['Teil 01','gerettet.zip','Teil 02'],original_game_modified=False,github_modified=False))
js('UI_ABDECKUNG.json',dict(source='Teil 01 LIEFERSTATUS + Teil 02 LIEFERSTATUS + Originalprojekt view/collection.js',groups=[dict(group=k,status='delivered_not_integrated',asset_ids=[a['id'] for a in assets if a['category'] in cats]) for k,cats in [('Filterzustände',['filter','filter_overlay']),('Kartenrahmen-Clipmasken',['card_aperture_mask']),('Chronikleiste',['chronicle_slice']),('Hauptmenü-Trefferflächen',['hit_geometry']),('Android-Icon/Splash',['android_drawable'])]],missing_non_card_asset_groups=[],excluded_token='pyramid bleibt Karten-/Tokenauftrag'))
files=sorted(p for p in O.rglob('*') if p.is_file() and p.name!='SHA256SUMS.txt')
(O/'SHA256SUMS.txt').write_text(''.join(f'{sha(p)}  {p.relative_to(O).as_posix()}\n' for p in files),encoding='utf-8')
zpath=O.parent/(O.name+'.zip')
with zipfile.ZipFile(zpath,'w',zipfile.ZIP_DEFLATED,compresslevel=7) as z:
    for p in sorted(O.rglob('*')):
        if p.is_file():z.write(p,p.relative_to(O.parent))
with zipfile.ZipFile(zpath) as z:assert z.testzip() is None
print(json.dumps(dict(zip=str(zpath),bytes=zpath.stat().st_size,files=len(files)+1,assets=len(assets),checks='passed'),ensure_ascii=False))
