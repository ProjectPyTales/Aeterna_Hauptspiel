from pathlib import Path
import json, re, hashlib, shutil, subprocess, csv, math, sys
from PIL import Image, ImageDraw, ImageFilter
import numpy as np
from scipy import ndimage
from concurrent.futures import ThreadPoolExecutor
import xml.etree.ElementTree as ET

ROOT=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else Path(__file__).resolve().parents[1]
P1=ROOT/'input/Chronicle_of_Heroes_Assets_Teil_01/Chronicle_of_Heroes_Assets_Teil_01'
P2=ROOT/'input/Chronicle_of_Heroes_Assets_Teil_02/Chronicle_of_Heroes_Assets_Teil_02'
OUT=ROOT/'output/Chronicle_of_Heroes_Assets_Teil_03'
assets=[]
def write(path,text):
    p=OUT/path;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text,encoding='utf-8');return p
def js(path,obj):return write(path,json.dumps(obj,ensure_ascii=False,indent=2)+'\n')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def add(id,category,file,source=None,**kw):
    a=dict(id=id,category=category,file=file,target='quellcode/assets/game/'+file,creation='deterministic_native_ui',source=source,**kw);assets.append(a);return a
def svg(w,h,body):return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">{body}</svg>'
def raster(p):
    q=p.with_suffix('.png')
    r=subprocess.run(['node','-e',"require('sharp')(process.argv[1]).png().toFile(process.argv[2]).catch(e=>{console.error(e);process.exit(1)})",str(p),str(q)],capture_output=True,text=True)
    if r.returncode:raise RuntimeError(r.stderr)
    return q

# Complete six filter families. Existing art is reused, never counted as a new card motif.
ui=P1/'assets/ui'
basic=(ui/'filterknopf-common-normal.svg').read_text()
start=basic.index('<g transform="translate(24 24)')
end=basic.index('</g>',start)+4
basic=basic[:start]+'''<g transform="translate(24 24) scale(0.52)"><path d="M26 24 L74 24 L74 76 L26 76 Z" fill="url(#paper)" stroke="#604421" stroke-width="3"/><path d="M36 37 H64 M36 49 H64 M36 61 H56" fill="none" stroke="#875d3e" stroke-width="4" stroke-linecap="round"/></g>'''+basic[end:]
for family in ['mana','basic','common','rare','epic','legendary']:
    base=basic if family=='basic' else (ui/f'filterknopf-{family}-normal.svg').read_text()
    states=['normal','aktiv','hover','pressed','disabled','fokus'] if family=='basic' else ['hover','pressed','disabled','fokus']
    split=base.index('</defs>')+7
    defs,body=base[:split],base[split:-6]
    for state in states:
        content=body
        if state=='hover':content+='<circle cx="96" cy="96" r="82" fill="#fff0c5" opacity=".15"/><circle cx="96" cy="96" r="88" fill="none" stroke="#fff0b8" stroke-width="4"/>'
        if state=='pressed':content='<g transform="translate(2 4)">'+content+'</g><circle cx="98" cy="100" r="83" fill="#302419" opacity=".19"/>'
        if state=='disabled':content='<g opacity=".46">'+content+'</g><circle cx="96" cy="96" r="77" fill="#8a8173" opacity=".24"/>'
        if state=='fokus':content+='<circle cx="96" cy="96" r="92" fill="none" stroke="#152b46" stroke-width="6"/><circle cx="96" cy="96" r="92" fill="none" stroke="#fff0be" stroke-width="2" stroke-dasharray="10 5"/>'
        if state=='aktiv':content+='<circle cx="96" cy="96" r="84.48" fill="none" stroke="#e7c164" stroke-width="5.76"/>'
        id=f'filterknopf-{family}-{state}';file=f'assets/ui/{id}.svg'
        write(file,defs+content+'</svg>')
        add(id,'filter',file,source='Teil 01: assets/ui/filterknopf-'+('common' if family=='basic' else family)+'-normal.svg',family=family,state=state,png=file[:-4]+'.png',size=[192,192])
id='filter-auswahl-overlay'
file=f'assets/ui/{id}.svg'
write(file,svg(192,192,'<circle cx="96" cy="96" r="84.48" fill="none" stroke="#e7c164" stroke-width="5.76"/><path d="M125 140 L135 150 L153 128" fill="none" stroke="#52381f" stroke-width="9" stroke-linejoin="round"/><path d="M125 140 L135 150 L153 128" fill="none" stroke="#fff0b8" stroke-width="4" stroke-linejoin="round"/>'))
add(id,'filter_overlay',file,source='Teil 01: Auswahlring; ergänzte Haken-Geometrie',png=file[:-4]+'.png',size=[192,192])

# Extract only the enclosed transparent picture aperture, not the transparent exterior.
masks=[]
for p in sorted((P1/'assets/ui-art').glob('kartenrahmen-*.png')):
    im=Image.open(p).convert('RGBA');w,h=im.size;alpha=np.array(im.getchannel('A'))
    labels,n=ndimage.label(alpha<128);seed=(int(h*.35),int(w*.5));label=int(labels[seed]);assert label
    inner=labels==label
    assert not any([inner[0].any(),inner[-1].any(),inner[:,0].any(),inner[:,-1].any()])
    assert .08<inner.mean()<.45
    # Three source pixels tuck beneath the painted frame; no reconstruction of artwork.
    mask=ndimage.binary_dilation(inner,iterations=3)
    rgba=Image.new('RGBA',(w,h),'white');rgba.putalpha(Image.fromarray(mask.astype('uint8')*255))
    id=p.stem+'-clip';file=f'assets/masks/{id}.png';q=OUT/file;q.parent.mkdir(parents=True,exist_ok=True);rgba.save(q)
    # Lossless binary SVG paths encoded as coalesced horizontal runs.
    runs=[];last=None
    for y,row in enumerate(mask):
        xs=np.flatnonzero(row)
        pair=(int(xs[0]),int(xs[-1])+1) if len(xs) else None
        if pair!=last:
            if last:runs.append((last[0],y0,last[1]-last[0],y-y0))
            last=pair;y0=y
    if last:runs.append((last[0],y0,last[1]-last[0],h-y0))
    d=' '.join(f'M{x} {y}h{ww}v{hh}h{-ww}Z' for x,y,ww,hh in runs)
    write(file[:-4]+'.svg',svg(w,h,f'<path fill="white" d="{d}"/>'))
    a=add(id,'card_aperture_mask',file,source='Teil 01: assets/ui-art/'+p.name,svg=file[:-4]+'.svg',size=[w,h],source_sha256=sha(p),aperture_bbox=list(rgba.getbbox()),underlap_px=3,card_type=p.stem.split('-')[1],finish=p.stem.split('-')[2]);masks.append(a)

# Lossless three-slice extraction of the existing painted scroll.
p=P1/'assets/ui-art/chronikleiste.png';im=Image.open(p).convert('RGBA');w,h=im.size
chron=[]
for name,y0,y1 in [('oben',0,270),('mitte',270,1650),('unten',1650,h)]:
    id='chronikleiste-'+name;file=f'assets/ui-art/{id}.png';q=OUT/file;q.parent.mkdir(parents=True,exist_ok=True);im.crop((0,y0,w,y1)).save(q)
    chron.append(add(id,'chronicle_slice',file,source='Teil 01: assets/ui-art/chronikleiste.png',size=[w,y1-y0],source_rect=[0,y0,w,y1-y0],source_sha256=sha(p),slice_role=name))
js('CHRONIK_MAPPING.json',dict(source_size=[w,h],logical_size=[140,1100],method='3-slice, caps proportional, stretch middle only',cap_heights_at_140=[270*140/w,(h-1650)*140/w],assets=chron))

# Geometry measured on the delivered Teil-01 image. Coordinates are source pixels.
k=2602/2048
def pt(x,y):return [round(x*k,2),round(y*k,2)]
plates=[[[830,241],[1208,241],[1236,282],[1208,324],[830,324],[803,282]],[[769,351],[1273,351],[1298,392],[1273,435],[769,435],[743,392]],[[767,461],[1274,461],[1298,501],[1274,540],[767,540],[743,501]],[[827,569],[1211,569],[1239,610],[1211,650],[827,650],[800,610]]]
controls=[]
for i,p in enumerate(plates):controls.append(dict(id=f'plate-{i}',binding=f'view.plates[{i}].go',shape='polygon',points=[pt(*xy) for xy in p]))
for id,c,rail,label in [('quests',(660,547),(0,521,574,575),(285,548)),('bazaar',(748,721),(0,692,660,745),(328,719)),('collection',(1384,547),(1460,521,2048,575),(1727,548)),('packs',(1298,721),(1381,692,2048,745),(1701,719))]:
    controls.append(dict(id=id,shape='circle_and_rect',center=pt(*c),radius=round(64*k,2),rect=[*pt(rail[0],rail[1]),*pt(rail[2]-rail[0],rail[3]-rail[1])],label=pt(*label)))
controls.append(dict(id='settings',shape='circle',center=pt(1744,53),radius=round(57*k,2)))
hall=dict(id='hauptmenue-trefferflaechen',source='Teil 01: game-assets/art/hall-aeterna.webp',source_sha256=sha(P1/'game-assets/art/hall-aeterna.webp'),source_size=[2602,1084],stage_size=[1600,800],scale=800/1084,source_crop_left=217,controls=controls,star=pt(1026,70),ring=pt(1026,490),gold_line=dict(center=pt(1026,488),rx=370*k,ry=382*k),title_rect=[*pt(322,55),*pt(327,118)],gold_rect=[*pt(1536,25),*pt(145,48)],note='Konservative innere Trefferflächen am gelieferten Bild; nicht die alten Konzeptkoordinaten. Keine Änderung am Spiel.')
js('HAUPTMENUE_MAPPING.json',hall)
shapes=[]
for c in controls:
    attr='fill="#36c4da" fill-opacity=".20" stroke="#155b79" stroke-width="3"'
    if c['shape']=='polygon':shapes.append('<polygon '+attr+' points="'+' '.join(f'{x},{y}' for x,y in c['points'])+'"/>')
    else:
        x,y=c['center'];shapes.append(f'<circle {attr} cx="{x}" cy="{y}" r="{c["radius"]}"/>')
        if 'rect'in c:
            x,y,w,h=c['rect'];shapes.append(f'<rect {attr} x="{x}" y="{y}" width="{w}" height="{h}"/>')
file='assets/geometry/hauptmenue-trefferflaechen.svg';write(file,svg(2602,1084,''.join(shapes)))
add('hauptmenue-trefferflaechen','hit_geometry',file,source=hall['source'],png=file[:-4]+'.png',size=[2602,1084],runtime_display=False)

# Native Android vectors, using the same Teil-01 medallion geometry and gradients.
def circlepath(x,y,r):return f'M{x-r},{y}a{r},{r} 0 1,0 {2*r},0a{r},{r} 0 1,0 {-2*r},0Z'
gradients={'bronze':[(0,'#4e321f'),(.3,'#94643d'),(.56,'#c29a62'),(.8,'#f1d79e'),(1,'#a67a47')],'gold':[(0,'#6d451e'),(.35,'#b8822b'),(.72,'#eac465'),(1,'#fff3c3')]}
star='M50 21 Q53 47 79 50 Q53 53 50 79 Q47 53 21 50 Q47 47 50 21 Z'
def pathxml(d,fill,stroke=None,sw=1):
    attrs=f'android:pathData="{d}"'
    if stroke:attrs+=f' android:strokeColor="{stroke}" android:strokeWidth="{sw}"'
    if fill in gradients:
        stops=''.join(f'<item android:offset="{o}" android:color="{col}"/>' for o,col in gradients[fill])
        return f'<path {attrs}><aapt:attr name="android:fillColor"><gradient android:startX="5" android:startY="95" android:endX="95" android:endY="5" android:type="linear">{stops}</gradient></aapt:attr></path>'
    return f'<path {attrs} android:fillColor="{fill}"/>'
paths=''.join([pathxml(circlepath(50,53,45),'#4d321f'),pathxml(circlepath(50,50,45),'bronze','#3b291c',2),pathxml(circlepath(50,50,40),'bronze','#e4c389'),pathxml(circlepath(50,50,36),'#00000000','#614724'),pathxml(star,'gold','#604421')])
def vector(content,size=108):return f'<?xml version="1.0" encoding="utf-8"?>\n<vector xmlns:android="http://schemas.android.com/apk/res/android" xmlns:aapt="http://schemas.android.com/aapt" android:width="{size}dp" android:height="{size}dp" android:viewportWidth="108" android:viewportHeight="108">{content}</vector>\n'
native={'ic_launcher_foreground':vector('<group android:translateX="21" android:translateY="21" android:scaleX="0.66" android:scaleY="0.66">'+paths+'</group>'),
        'ic_launcher_monochrome':vector('<group android:translateX="21" android:translateY="21" android:scaleX="0.66" android:scaleY="0.66">'+pathxml(star,'#ffffff')+pathxml(circlepath(50,50,43),'#00000000','#ffffff',3)+'</group>'),
        'splash_icon':vector('<group android:translateX="21" android:translateY="21" android:scaleX="0.66" android:scaleY="0.66">'+paths+'</group>',288),
        'ic_launcher_background':vector(pathxml('M0 0H108V108H0Z','#e5ceb1'))}
for id,s in native.items():
    f=f'android-res/drawable/{id}.xml';write(f,s)
    assets.append(dict(id=id,category='android_drawable',file=f,target='android/app/src/main/res/drawable/'+id+'.xml',creation='native_derivative_of_part01',source='Teil 01: assets/ui/app-icon-foreground.svg',size=[108,108]))
write('android-res/mipmap-anydpi-v26/ic_launcher.xml','''<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android"><background android:drawable="@drawable/ic_launcher_background"/><foreground android:drawable="@drawable/ic_launcher_foreground"/></adaptive-icon>''')
write('android-res/mipmap-anydpi-v33/ic_launcher.xml','''<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android"><background android:drawable="@drawable/ic_launcher_background"/><foreground android:drawable="@drawable/ic_launcher_foreground"/><monochrome android:drawable="@drawable/ic_launcher_monochrome"/></adaptive-icon>''')
write('android-res/drawable/splash_window.xml','''<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android"><item android:drawable="@color/hall"/><item android:drawable="@drawable/splash_icon" android:gravity="center" android:width="288dp" android:height="288dp"/></layer-list>''')

with ThreadPoolExecutor(max_workers=4) as pool:list(pool.map(raster,[OUT/a['file'] for a in assets if a['file'].endswith('.svg')]))

# Distinct UI atlases use rectangles, not the game's 4x3 card atlas convention.
atlases=[]
def atlas(name,items,cols,cellw,cellh):
    rows=math.ceil(len(items)/cols);im=Image.new('RGBA',(cols*cellw,rows*cellh));entries=[]
    for i,a in enumerate(items):
        f=a.get('png',a['file']);src=Image.open(OUT/f).convert('RGBA');x=(i%cols)*cellw+4;y=(i//cols)*cellh+4
        assert src.width<=cellw-8 and src.height<=cellh-8
        im.paste(src,(x,y));rect=[x,y,src.width,src.height]
        a['atlas']=dict(file=f'game-assets/ui/{name}.png',rect=rect,rotation=False)
        entries.append(dict(id=a['id'],rect=rect,source=f))
    file=f'game-assets/ui/{name}.png';p=OUT/file;p.parent.mkdir(parents=True,exist_ok=True);im.save(p)
    atlases.append(dict(id=name,file=file,target='quellcode/assets/game/assets/ui/'+name+'.png',size=list(im.size),gutter=4,format='RGBA lossless',entries=entries))
atlas('r03-filter', [a for a in assets if a['category'].startswith('filter')],6,200,200)
atlas('r03-masken',masks,3,1064,1498)
atlas('r03-chronik',chron,3,830,1388)
js('ATLAS_MANIFEST.json',dict(release='Teil 03',type='UI rectangular sprites, NOT R.tile card atlases',atlases=atlases))

# Continue blockers byte-for-byte; no cards/tokens are completed by UI derivations.
for name in ['GERETTETE_ASSETS_ZUORDNUNG.json','GERETTETE_ASSETS_ZUORDNUNG.csv','GESPERRTE_ZUORDNUNGSPRUEFUNG.json','OFFENE_GENERIERUNGSAUFTRAEGE.json','OFFENE_ASSETS.csv','RESTBESTAND.json']:
    shutil.copyfile(P2/name,OUT/name)
shutil.copyfile(P1/'HISTORIK_UND_STIL.md',OUT/'HISTORIK_UND_STIL.md')
shutil.copyfile(P2/'AUFFAELLIGKEITEN.md',OUT/'AUFFAELLIGKEITEN_TEIL_02_UNVERAENDERT.md')
locked=[]
for pp,label in [(P1,'Teil 01'),(P2,'Teil 02')]:
    m=json.loads((pp/'ASSET_MANIFEST.json').read_text());items=m['assets'] if isinstance(m,dict) else m
    for a in items:
        if a.get('category') in ['cards','tokens']:locked.append(dict(id=a['id'],source=label,reason='already_delivered'))
for a in json.loads((P2/'GERETTETE_ASSETS_ZUORDNUNG.json').read_text()):locked.append(dict(id=a['id'],source='gerettet.zip',source_file=a['source_file'],reason='rescued_motif_locked_assignment_provisional'))
for a in json.loads((P2/'GESPERRTE_ZUORDNUNGSPRUEFUNG.json').read_text())['jobs']:locked.append(dict(id=a['id'],source='Teil 02 Sperrliste',reason='possible_duplicate_do_not_generate'))
js('DUBLETTENSPERREN.json',dict(release='Teil 03',policy='Auch semantische Motivüberschneidungen unter anderen IDs sind gesperrt.',entries=locked))
js('KARTEN_TOKEN_MAPPING.json',dict(release='Teil 03',count=0,assets=[],reason='Neue UI-Priorität; keine Karten- oder Tokenillustrationen erzeugt.'))
for a in assets:
    a['sha256']=sha(OUT/a['file'])
    if a.get('family') in ['common','rare','epic','legendary']:
        a['required_existing_emblem']='assets/ui/archivsiegel-'+a['family']+'.png';a['emblem_rect']=[46,46,100,100]
js('ASSET_MANIFEST.json',dict(release='Teil 03',scope='UI-Abschlusslieferung',count=len(assets),new_card_token_motifs=0,new_filter_states=26,technical_and_platform_assets=len(assets)-26,assets=assets))
with (OUT/'ASSET_ZUORDNUNG.csv').open('w',newline='',encoding='utf-8-sig') as f:
    fields=['id','category','file','target','source'];c=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore');c.writeheader();c.writerows(assets)
js('PROMPTS.json',dict(image_generation_calls=0,reason='Alle offenen UI-Arbeiten betreffen das bestehende Vektorsystem, technische Masken, Geometrie und native Ressourcen. Keine gemalten Motive neu erzeugt.',recipe='tools/build_ui.py',style='HISTORIK_UND_STIL.md'))
print(json.dumps(dict(assets=len(assets),by_category={k:sum(a['category']==k for a in assets) for k in sorted(set(a['category'] for a in assets))},atlases=len(atlases)),ensure_ascii=False))
