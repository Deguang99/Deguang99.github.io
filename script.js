const pages=[...document.querySelectorAll('.page')],links=[...document.querySelectorAll('[data-nav]')],menu=document.querySelector('.menu'),nav=document.querySelector('nav');function navigate(){let id=location.hash.slice(1)||'home';if(!document.getElementById(id)||!pages.some(p=>p.id===id))id='home';pages.forEach(p=>p.classList.toggle('active',p.id===id));links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));nav.classList.remove('open');menu.setAttribute('aria-expanded','false');window.scrollTo({top:0,behavior:'instant'});}addEventListener('hashchange',navigate);navigate();menu.onclick=()=>{let open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))};document.getElementById('year').textContent=new Date().getFullYear();
const cities={london:{title:'London, 1811–1812',img:'london',sites:[{x:21.4,y:37.8,color:'white',title:'Paddington · Field preacher',body:'A reported field preacher in Paddington linked the appearance of the comet to apocalyptic interpretation; the location is tied to a specific contemporary newspaper account.'},{x:466/1140*100,y:(371-43)/810*100,color:'pink',title:'Luke Hansard & Son · Printing',body:'A London printing house associated with the production and circulation of printed astronomical and popular knowledge.'},{x:48.4,y:50.5,color:'green',title:'Pseudonymous correspondents · A. and Charles',body:'Newspaper contributors discussed cometary observation and optics, making the domestic and epistolary geography of astronomy visible.'}]},paris:{title:'Paris, 1811–1812',img:'paris',sites:[{x:37.8,y:42.5,color:'white',title:'Quai Voltaire · Cometary song',body:'A reported gathering to sing a cometary sonnet on 17 September 1811 illustrates public performance as a site of knowledge-making.'},{x:47.1,y:48.9,color:'orange',title:'Madame Veuve Courcier · Bookseller',body:'A bookshop on the Quai des Augustins retailing scientific periodicals and treatises about the comet.'},{x:41.2,y:44.7,color:'red',title:'Le Breton · Scientific demonstration',body:'Le Breton advertised a private demonstration of cometary motion using an apparatus on the Rue Bonaparte.'}]}};let activeCity='london',activeSite=0;const markerLayer=document.getElementById('map-markers'),notes=document.getElementById('site-notes');function renderCity(){let c=cities[activeCity];document.getElementById('city-map').src=`assets/${c.img}-original.jpg`;document.getElementById('city-map').alt=`Historical and modern map layers showing comet-related sites in ${activeCity}`;document.getElementById('city-heading').textContent=c.title;document.getElementById('map-attribution').innerHTML=activeCity==='london'?'Base map: Richard Horwood, <i>Plan of the Cities of London and Westminster, the Borough of Southwark, and Parts Adjoining: Shewing Every House</i> (1799), composite sheets A1–H4; scale 1:2,437; Darlington and Howgego 200.':'Base map: Nicolas M. Maire, <i>Paris dressé au cabinet topographique</i> (1808), composite sheets 1–20; engraved by Perrier l’oncle, Alphonse Pelicier, Benizy, and J.-B.-M. Chamouin.';markerLayer.innerHTML='';notes.innerHTML='';c.sites.forEach((s,i)=>{let b=document.createElement('button');b.className='map-marker'+(i===activeSite?' selected':'');b.dataset.color=s.color;b.style.left=s.x+'%';b.style.top=s.y+'%';b.title=s.title;b.setAttribute('aria-label',s.title);b.onclick=()=>selectSite(i);markerLayer.append(b);let n=document.createElement('div');n.className='site-note'+(i===activeSite?' selected':'');n.innerHTML=`<b>0${i+1} / ${s.title}</b><p>${s.body}</p>`;n.onclick=()=>selectSite(i);notes.append(n)});}function selectSite(i){activeSite=i;renderCity()}document.querySelectorAll('[data-city]').forEach(b=>b.onclick=()=>{activeCity=b.dataset.city;activeSite=0;document.querySelectorAll('[data-city]').forEach(x=>x.classList.toggle('active',x===b));renderCity()});renderCity();
const press={london:[['l1','Philosophical Magazine & Philosophical Transactions'],['l3','Morning Chronicle'],['l4','The Globe']],paris:[['p1','Journal de physique, de chimie et d’histoire naturelle'],['p2',"Journal de l’Empire"],['p4','Journal de Paris']]};let pressCity='london',pressIndex=0;function renderPress(){const list=document.getElementById('press-list');list.innerHTML='';press[pressCity].forEach(([img,title],i)=>{let b=document.createElement('button');b.className='press-option'+(i===pressIndex?' active':'');b.innerHTML=`<span>0${i+1}</span> <i>${title.replaceAll('&','&amp;')}</i>`;b.onclick=()=>{pressIndex=i;renderPress()};list.append(b)});let [img,title]=press[pressCity][pressIndex],el=document.getElementById('press-image');el.style.opacity='.25';setTimeout(()=>{el.src=`assets/${img}-hires.jpeg`;el.alt=`Spatial frequency heatmap: ${title}`;document.getElementById('press-caption').innerHTML=`<i>${title.replaceAll('&','&amp;')}</i> · ${pressCity==='london'?'London':'Paris'}`;el.style.opacity='1'},130)}document.querySelectorAll('[data-press-city]').forEach(b=>b.onclick=()=>{pressCity=b.dataset.pressCity;pressIndex=0;document.querySelectorAll('[data-press-city]').forEach(x=>x.classList.toggle('active',x===b));renderPress()});renderPress();const box=document.getElementById('lightbox');document.getElementById('expand-map').onclick=()=>{document.getElementById('lightbox-image').src=document.getElementById('city-map').src;box.hidden=false};function closeBox(){box.hidden=true}document.getElementById('close-lightbox').onclick=closeBox;box.addEventListener('click',e=>{if(e.target===box)closeBox()});addEventListener('keydown',e=>{if(e.key==='Escape')closeBox()});

// Academic journey: schematic map, not a geographic GIS layer.
const journeyPlaces=[['Beijing',116.4,39.9,'education','Tsinghua University · BA and MPhil'],['Paris',2.35,48.86,'education','Sciences Po · exchange studies'],['Cambridge',.12,52.2,'education','University of Cambridge · PhD in History'],['Cambridge',.12,52.2,'archives','Cambridge University Library; Fitzwilliam Museum; Wren Library'],['London',-.13,51.5,'archives','Archives and research libraries'],['Chatsworth',-1.62,53.23,'archives','Archival research'],['Chippenham',-2.12,51.46,'archives','Archival research'],['Plymouth',-4.14,50.37,'archives','Archival research'],['Redruth',-5.23,50.23,'archives','Archival research'],['Wigston',-1.1,52.58,'archives','Archival research'],['Bath',-2.36,51.38,'archives','Archival research'],['Aylesbury',-.81,51.82,'archives','Waddesdon Archive'],['Glasgow',-4.25,55.86,'archives','Archival research'],['Edinburgh',-3.19,55.95,'conferences','ESHS/HSS joint conference · 2026'],['Edinburgh',-3.19,55.95,'archives','National Library of Scotland'],['Paris',2.35,48.86,'archives','Observatoire de Paris and other collections'],['Reims',4.03,49.26,'archives','Archival research'],['Marseille',5.37,43.3,'archives','Archival research'],['Avignon',4.81,43.95,'archives','Archival research'],['Nice',7.26,43.71,'archives','Archival research'],['Bayeux',-.7,49.28,'archives','Archival research'],['Besançon',6.03,47.24,'archives','Archival research'],['Rouen',1.1,49.44,'archives','Archival research'],['Ollioules',5.85,43.14,'archives','Archival research'],['Cambridge',.12,52.2,'conferences','Six research talks and conferences'],['London',-.13,51.5,'conferences','IHR seminar · 2025'],['Istanbul',28.98,41.01,'conferences','ISIH conference · 2026'],['Austin, TX',-97.74,30.27,'archives','Harry Ransom Center'],['Oxford',-1.25,51.75,'archives','Weston Library, Bodleian Libraries'],['Cambridge, MA',-71.116,42.375,'archives','Houghton Library, Harvard University'],['Washington, DC',-77.004,38.888,'archives','Library of Congress'],['Providence, RI',-71.403,41.826,'archives','Brown University Library']];let journeyFilter='all';let journeyMap=null;let journeyLayers=[];const jDetail=document.getElementById('journey-detail');
const talksByCity={Cambridge:[['2026','Cities Symposium'],['2025','Newnham History Forum'],['2025','Newnham Graduate Conference'],['2025','French Graduate Conference'],['2025','PhD Presentation Day'],['2024','Material Culture Forum']],London:[['2025','IHR British History in the Long Eighteenth Century Seminar']],Edinburgh:[['2026','ESHS/HSS Joint Conference']],Istanbul:[['2026','International Society for Intellectual History Conference']]};
function showJourney(p){let body=p[3]==='archives'&&archiveDetails[p[0]]?archiveDetails[p[0]].map(x=>'• '+x).join('<br>'):p[3]==='conferences'&&talksByCity[p[0]]?talksByCity[p[0]].map(x=>'• '+x[0]+' · '+x[1]).join('<br>'):p[4];jDetail.innerHTML='<strong>'+p[0]+'</strong><br><small>'+p[3].toUpperCase()+'</small><br>'+body}
// Restored v2 schematic map. All positions are intentionally illustrative, not GIS coordinates.
const journeySvg=document.getElementById('journey-svg');
const svgPins=document.getElementById('journey-svg-pins');
let journeyView={x:325,y:67.67,w:330,h:168.67};
const schematicPlaces={
'Beijing':[737,147],'Paris':[487,163],'Cambridge':[439,118],'London':[440,137],
'Chatsworth':[428,110],'Chippenham':[423,143],'Plymouth':[414,155],
'Redruth':[405,162],'Wigston':[439,125],'Bath':[422,146],
'Aylesbury':[430,133],'Glasgow':[425,99],'Edinburgh':[435,96],
'Reims':[505,156],'Marseille':[509,189],'Avignon':[500,181],
'Nice':[522,188],'Bayeux':[466,158],
'Besançon':[513,167],'Rouen':[476,151],'Ollioules':[515,193],
'Istanbul':[540,181],'Austin, TX':[171,151],'Cambridge, MA':[260,94],'Washington, DC':[277,122],'Providence, RI':[287,100],
'Oxford':[427,136]};
const journeyCountry={Beijing:'china',Istanbul:'turkey','Austin, TX':'usa','Cambridge, MA':'usa','Washington, DC':'usa','Providence, RI':'usa',Paris:'france',Reims:'france',Marseille:'france',Avignon:'france',Nice:'france',Bayeux:'france',Besançon:'france',Rouen:'france',Ollioules:'france'};
// One marker per city. Where a city has multiple activities, combine them in one detail card.
function showJourneyCity(city, entries){
const headings={education:'Education',archives:'Archives',conferences:'Conferences'};
let sections=entries.map(p=>{
const type=p[3];
const lines=type==='archives'&&archiveDetails[city]?archiveDetails[city]:type==='conferences'&&talksByCity[city]?talksByCity[city].map(t=>t[0]+' · '+t[1]):[p[4]];
return '<div class="journey-detail-section"><small>'+headings[type]+'</small><div>'+lines.map(x=>'• '+x).join('<br>')+'</div></div>';
});
jDetail.innerHTML='<strong>'+city+'</strong>'+sections.join('');
}
function journeyRender(){svgPins.innerHTML='';
const grouped=new Map();
journeyPlaces.filter(p=>journeyFilter==='all'||p[3]===journeyFilter).forEach(p=>{
if(!grouped.has(p[0]))grouped.set(p[0],[]);
grouped.get(p[0]).push(p);
});
for(const [city,entries] of grouped){
const xy=schematicPlaces[city];if(!xy)continue;
const ns='http://www.w3.org/2000/svg';const c=document.createElementNS(ns,'circle');
c.setAttribute('cx',xy[0]);c.setAttribute('cy',xy[1]);c.setAttribute('r','3.3');
c.setAttribute('class','schematic-pin country-'+(journeyCountry[city]||'uk'));
c.setAttribute('tabindex','0');c.setAttribute('role','button');
c.setAttribute('aria-label',city+' — '+entries.map(p=>p[3]).join(', '));
const label=document.createElementNS(ns,'title');label.textContent=city+' — '+entries.map(p=>p[3]).join(', ');c.append(label);
const select=()=>{svgPins.querySelectorAll('.active').forEach(e=>e.classList.remove('active'));c.classList.add('active');showJourneyCity(city,entries)};
c.addEventListener('click',select);c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select()}});
svgPins.append(c);
}}
function applyJourneyView(){journeySvg.setAttribute('viewBox',[journeyView.x,journeyView.y,journeyView.w,journeyView.h].join(' '));journeySvg.querySelectorAll('.schematic-pin').forEach(c=>c.setAttribute('r',Math.max(2.5,3.3*journeyView.w/330)))}
function journeyZoomAt(factor){let w=Math.max(110,Math.min(900,journeyView.w*factor));let h=w*460/900;let cx=journeyView.x+journeyView.w/2,cy=journeyView.y+journeyView.h/2;journeyView={x:cx-w/2,y:cy-h/2,w,h};applyJourneyView()}
let drag=null;const journeyViewport=document.getElementById('journey-leaflet');
journeyViewport.addEventListener('pointerdown',e=>{if(e.target.closest('circle'))return;drag={x:e.clientX,y:e.clientY,view:{...journeyView}};journeyViewport.setPointerCapture(e.pointerId)});
journeyViewport.addEventListener('pointermove',e=>{if(!drag)return;const r=journeyViewport.getBoundingClientRect();journeyView.x=drag.view.x-(e.clientX-drag.x)*drag.view.w/r.width;journeyView.y=drag.view.y-(e.clientY-drag.y)*drag.view.h/r.height;applyJourneyView()});
journeyViewport.addEventListener('pointerup',()=>drag=null);journeyViewport.addEventListener('pointercancel',()=>drag=null);
journeyViewport.addEventListener('wheel',e=>{e.preventDefault();journeyZoomAt(e.deltaY<0?.87:1.15)},{passive:false});
document.querySelectorAll('[data-journey]').forEach(b=>b.onclick=()=>{journeyFilter=b.dataset.journey;document.querySelectorAll('[data-journey]').forEach(x=>x.classList.toggle('active',x===b));jDetail.textContent='Select a point on the map to see the academic activity associated with it.';journeyRender();applyJourneyView()});
journeyRender();applyJourneyView();
const originalRenderPress=renderPress;renderPress=function(){originalRenderPress();const story=document.getElementById('press-story');story.innerHTML='<p>Markers identify selected places mentioned in the selected publication; they are not additional heatmap observations. Hover, focus, or tap to identify each site.</p>'};renderPress();
// Actual smooth scroll for the home-page introduction link.


const archiveDetails={"Paris": ["Archives nationales", "Archives de l’Observatoire de Paris", "Bibliothèque centrale du Conservatoire national des arts et métiers", "Bibliothèque de l’Institut de France", "Bibliothèque de l’INHA", "Bibliothèque nationale de France", "Bibliothèque historique de la Ville de Paris"], "Bayeux": ["Les 7 lieux, Médiathèque intercommunale"], "Besançon": ["Bibliothèque municipale de Besançon"], "Reims": ["Bibliothèque Carnegie"], "Nice": ["Archives départementales des Alpes-Maritimes"], "Marseille": ["Archives départementales des Bouches-du-Rhône"], "Rouen": ["Archives départementales de la Seine-Maritime"], "Avignon": ["Maison Jean Vilar", "Archives municipales d’Avignon"], "Ollioules": ["Archives municipales d’Ollioules"], "Cambridge": ["Cambridge University Library — Royal Greenwich Observatory Archives", "Fitzwilliam Museum", "Wren Library, Trinity College"], "London": ["Royal Institution of Great Britain", "Royal Astronomical Society Archives and Manuscripts", "Victoria and Albert Museum", "Victoria and Albert Museum Archives", "Science Museum", "British Museum", "Royal Society", "National Portrait Gallery", "The London Archives", "British Library", "Berry Bros. & Rudd — Company Archives"], "Chatsworth": ["Devonshire Collection Archives, Chatsworth"], "Chippenham": ["Wiltshire and Swindon Archives"], "Plymouth": ["Plymouth Archives, The Box"], "Redruth": ["Kresen Kernow"], "Wigston": ["Record Office for Leicestershire, Leicester and Rutland"], "Bath": ["Herschel Museum of Astronomy"], "Aylesbury": ["Waddesdon Archive, Waddesdon Manor"], "Oxford": ["Weston Library, Bodleian Libraries"], "Glasgow": ["University of Glasgow", "University of Strathclyde", "Royal Faculty of Procurators in Glasgow", "Glasgow Museums Resource Centre"], "Edinburgh": ["National Library of Scotland"], "Austin, TX": ["Harry Ransom Center"], "Cambridge, MA": ["Houghton Library, Harvard University"], "Washington, DC": ["Library of Congress"], "Providence, RI": ["Brown University Library"]};

// All user-supplied points use the SAME original 1140 × 810 map canvas:
// top-left (0, 43), bottom-right (1140, 853).
// Both the map image and overlay fill exactly the same rendered image box.
const MAP_CANVAS={left:0,top:43,right:1140,bottom:853};
function canvasToPercent(x,y){
  if(x<MAP_CANVAS.left||x>MAP_CANVAS.right||y<MAP_CANVAS.top||y>MAP_CANVAS.bottom)
    console.warn('Point outside source map canvas:',x,y);
  return {x:(x-MAP_CANVAS.left)/(MAP_CANVAS.right-MAP_CANVAS.left)*100,
          y:(y-MAP_CANVAS.top)/(MAP_CANVAS.bottom-MAP_CANVAS.top)*100};
}
function heatPoint(x,y,name,type){return {...canvasToPercent(x,y),name,type,sourceX:x,sourceY:y};}
// Each London newspaper has its own set of historically identified sites.
// Coordinates are supplied on the original (0,43)–(1140,853) map canvas.
const londonHeatSites={
 l1:[
  heatPoint(291,474,"Cleveland Row, St James's, London · Printer: W. Bulmer and Co.",'printer'),
  heatPoint(314,464,'Pall Mall, London · Print seller: G. and W. Nicol','seller'),
  heatPoint(404,434,'Royal Society · Scientific institution','science'),
  heatPoint(470,410,'Shoe Lane, London · Printer: Richard Taylor and Co.','printer'),
  heatPoint(332,323,'Somers Town · Article contributor','contributor'),
  heatPoint(752,176,'Clapton, Hackney, London · Article contributor','contributor'),
  heatPoint(1052,622,'Royal Greenwich Observatory · Scientific institution','science')
 ],
 l3:[
  heatPoint(264,452,'Bond Street, London · Article contributor','contributor'),
  heatPoint(328,450,'Theatre Royal, Haymarket · Theatre','theatre'),
  heatPoint(491,481,'Nelson Square, London · Article contributor','contributor'),
  heatPoint(483,503,'Surrey Theatre · Theatre','theatre'),
  heatPoint(496,422,'39 Ludgate Street · Print seller: J. Mawman','seller'),
  heatPoint(330,416,'Soho Square · Print seller: Dulau and Co.','seller'),
  heatPoint(580,419,'Old Broad Street · Print seller: Bobsey','seller'),
  heatPoint(1052,622,'Royal Greenwich Observatory · Scientific institution','science'),
  heatPoint(404,434,'Royal Society · Scientific institution','science'),
  heatPoint(581,422,'Exchange, London · Article contributor','contributor'),
  heatPoint(331,459,'Piccadilly, London · Print seller: Hatchard','seller')
 ],
 l4:[
  heatPoint(496,422,'39 Ludgate Street · Print seller: J. Mawman','seller'),
  heatPoint(330,416,'Soho Square · Print seller: Dulau and Co.','seller'),
  heatPoint(580,419,'Old Broad Street · Print seller: Bobsey','seller'),
  heatPoint(1052,622,'Royal Greenwich Observatory · Scientific institution','science'),
  heatPoint(752,176,'Clapton, Hackney, London · Article contributor','contributor'),
  heatPoint(286,379,'55 London Street, Fitzroy Square, London · Article contributor','contributor'),
  heatPoint(272,280,'Camden Town, London · Site of comet anecdote','mentioned'),
  heatPoint(288,464,"St James's Street, London · site of observation",'mentioned'),
  heatPoint(386,435,'Southampton Street, Strand, London · Printer: John Bell','printer')
 ]
};
// Publication-specific sites; every position is on the original 1140 × 810 canvas.
// Labels use the pattern "Place · role: person / activity" across both cities.
const parisHeatSites={
 p1:[
  heatPoint(553,455,'57 Quai des Augustins, Paris · Print seller: Mme veuve Courcier','seller'),
  heatPoint(503,666,'Observatoire de Paris · Scientific institution','science')
 ],
 p2:[
  heatPoint(503,666,'Observatoire de Paris · Scientific institution','science'),
  heatPoint(568,296,'Théâtre des Variétés · Theatre','theatre'),
  heatPoint(804,353,'Cirque Olympique · Theatre','theatre'),
  heatPoint(556,426,'17 Rue des Prêtres-Saint-Germain-l’Auxerrois · Printer: Le Normant','printer'),
  heatPoint(499,446,'Institut de France · Scientific institution','science'),
  heatPoint(450,228,'34 Rue de Clichy · Theatre: Nouveau Tivoli (Jardin de Richelieu)','theatre'),
  heatPoint(492,448,'5 Rue Bonaparte · Astronomical demonstration: Lebreton','theatre')
 ],
 p4:[
  heatPoint(568,296,'Théâtre des Variétés · Theatre','theatre'),
  heatPoint(804,353,'Cirque Olympique · Theatre','theatre'),
  heatPoint(503,666,'Observatoire de Paris · Scientific institution','science')
 ]
};
const heatSites={...londonHeatSites,...parisHeatSites};
function renderHeatSites(){const wrap=document.getElementById('press-hotspots');if(!wrap)return;wrap.innerHTML='';const key=press[pressCity][pressIndex][0];(heatSites[key]||[]).forEach(s=>{let b=document.createElement('button');b.className='heat-pin '+(s.type||'');b.style.left=s.x+'%';b.style.top=s.y+'%';b.title=s.name;b.setAttribute('aria-label',s.name);b.innerHTML='<span>'+s.name+'</span>';b.onclick=()=>{document.querySelectorAll('.heat-pin').forEach(n=>n.classList.remove('active'));b.classList.add('active')};wrap.append(b)})}
const priorPress=renderPress;renderPress=function(){priorPress();renderHeatSites()};renderPress();
