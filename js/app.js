/* ---------- helpers ---------- */
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const byId=Object.fromEntries(D.map(d=>[d.id,d]));
const HUBS={jaipur:byId.jaipur,delhi:{n:"Delhi",lat:28.613,lng:77.209},udaipur:byId.udaipur,jodhpur:byId.jodhpur};
function hav(a,b){const R=6371,t=Math.PI/180,dl=(b.lat-a.lat)*t,dg=(b.lng-a.lng)*t;const x=Math.sin(dl/2)**2+Math.cos(a.lat*t)*Math.cos(b.lat*t)*Math.sin(dg/2)**2;return 2*R*Math.asin(Math.sqrt(x))}
const road=(a,b)=>Math.round(hav(a,b)*1.22/5)*5;
function dur(km){const m=Math.round(km/50*60/15)*15;const h=Math.floor(m/60),mm=m%60;return h?`${h} h${mm?" "+mm+" m":""}`:`${mm} m`}
const TYPE={fort:"Fort",palace:"Palace",lake:"Lake",temple:"Temple",jain:"Jain temple",dunes:"Desert",wild:"Wildlife",haveli:"Haveli & bazaar",stepwell:"Stepwell",falls:"Waterfall",mosque:"Dargah & mosque",garden:"Garden & cenotaph",hill:"Hill & viewpoint",ruins:"Heritage site",border:"Memorial"};
const FOODK={thali:"Meal",sweet:"Sweet",fried:"Snack",curry:"Curry",drink:"Drink",bread:"Bread",snack:"Snack"};
const gimg=q=>"https://www.google.com/search?tbm=isch&q="+encodeURIComponent(q);

/* ---------- illustrations ---------- */
function hash(s){let h=7;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h}
function rng(seed){let s=seed%233280;return()=>(s=(s*9301+49297)%233280)/233280}
const TONES={pink:["#E8988A","#A9564F"],blue:["#7896CB","#3C5A92"],gold:["#E3B15C","#A8732A"],white:["#F1EBE0","#AFA391"],sand:["#D8A26E","#9C663B"],red:["#C66B4F","#86402D"]};
const SKIES=[["#FFD3A5","#FD8C8C"],["#A6E3F5","#FFF1D6"],["#FBD786","#F7997D"],["#C9D6FF","#FFE3C2"],["#8CC8F2","#EAF5FF"],["#3A3D84","#F08A6E"]];
const arch=(x,y,w,h,f)=>`<path d="M${x} ${y+h}V${y+w/2}A${w/2} ${w/2} 0 0 1 ${x+w} ${y+w/2}V${y+h}Z" fill="${f}"/>`;
const dome=(cx,by,r,f)=>`<path d="M${cx-r} ${by}A${r} ${r*1.15} 0 0 1 ${cx+r} ${by}Z" fill="${f}"/><rect x="${cx-1}" y="${by-r*1.15-7}" width="2" height="8" fill="${f}"/>`;
const chhatri=(cx,by,w,f,d)=>`<rect x="${cx-w/2}" y="${by-w*.6}" width="${w*.14}" height="${w*.6}" fill="${f}"/><rect x="${cx+w/2-w*.14}" y="${by-w*.6}" width="${w*.14}" height="${w*.6}" fill="${f}"/><rect x="${cx-w/2-2}" y="${by-w*.6-4}" width="${w+4}" height="4" fill="${d}"/>`+dome(cx,by-w*.6-4,w/2,f);
const crenel=(x1,x2,y,f)=>{let o="";for(let x=x1;x<x2-4;x+=12)o+=`<rect x="${x}" y="${y-6}" width="7" height="6.5" fill="${f}"/>`;return o};
const hills=(y,c,a)=>`<path d="M0 ${y}C90 ${y-a} 240 ${y-a*.25} 400 ${y-a*.55}V250H0Z" fill="${c}"/>`;
const tree=(x,y,s,c)=>`<rect x="${x-1.5*s}" y="${y-14*s}" width="${3*s}" height="${14*s}" fill="#5A4632"/><ellipse cx="${x}" cy="${y-16*s}" rx="${16*s}" ry="${6*s}" fill="${c}"/>`;
function shikhara(cx,base,w,h,f,d,id){
  const l=cx-w/2,rr=cx+w/2,top=base-h;
  const p=`M${l} ${base}L${l} ${base-h*.35}C${l+w*.05} ${base-h*.75} ${cx-w*.18} ${top+h*.1} ${cx} ${top}C${cx+w*.18} ${top+h*.1} ${rr-w*.05} ${base-h*.75} ${rr} ${base-h*.35}L${rr} ${base}Z`;
  let lines="";for(let y=base-10;y>top;y-=11)lines+=`<rect x="${l}" y="${y}" width="${w}" height="2" fill="${d}" opacity=".35"/>`;
  return `<clipPath id="${id}"><path d="${p}"/></clipPath><path d="${p}" fill="${f}"/><g clip-path="url(#${id})">${lines}<rect x="${cx-1}" y="${top}" width="2" height="${h}" fill="${d}" opacity=".4"/></g><ellipse cx="${cx}" cy="${top-2}" rx="${w*.12}" ry="3" fill="${d}"/>`;
}
const camel=(x,y,s,c)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><ellipse cx="0" cy="0" rx="20" ry="9"/><ellipse cx="-2" cy="-8" rx="9" ry="7"/><rect x="-15" y="4" width="3" height="20"/><rect x="-7" y="4" width="3" height="20"/><rect x="6" y="4" width="3" height="20"/><rect x="13" y="4" width="3" height="20"/><path d="M16 -4L26 -20L30 -22L34 -20L33 -17L28 -17L22 -2Z"/></g>`;
function art(type,key,tone){
  const h=hash(key),r=rng(h),sky=SKIES[h%SKIES.length],[m,d]=TONES[tone]||TONES.sand,id="a"+h.toString(36)+type.slice(0,2);
  let s=`<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs><rect width="400" height="250" fill="url(#${id})"/>`;
  const sx=50+r()*300;
  s+=`<circle cx="${sx}" cy="${38+r()*26}" r="${16+r()*12}" fill="#FFF3D1" opacity=".9"/>`;
  const ground=c=>`<rect y="200" width="400" height="50" fill="${c}"/>`;
  switch(type){
    case "fort":{
      s+=hills(175,"#8C8A5A",45)+hills(190,"#6F7448",25);
      s+=`<path d="M20 175L60 125H350L385 175Z" fill="${d}" opacity=".55"/>`;
      s+=`<rect x="40" y="110" width="320" height="58" fill="${m}"/>`+crenel(40,360,110,m);
      [40,130,240,345].forEach(x=>{s+=`<rect x="${x-14}" y="92" width="34" height="76" rx="5" fill="${m}"/>`+crenel(x-14,x+20,92,m)+arch(x-2,128,10,16,d)});
      s+=`<rect x="140" y="70" width="120" height="40" fill="${m}"/>`;for(let x=150;x<250;x+=16)s+=arch(x,80,9,18,d);
      s+=chhatri(158,70,24,m,d)+chhatri(242,70,24,m,d)+dome(200,70,16,m);
      s+=`<rect x="40" y="150" width="320" height="18" fill="${d}" opacity=".3"/>`+ground("#C49A62");
      s+=`<path d="M190 250L205 200H215L250 250Z" fill="#D9B27A"/>`;break}
    case "palace":{
      const water=r()>.45;
      s+=hills(170,"#9A9468",30);
      s+=`<rect x="50" y="105" width="300" height="95" fill="${m}"/><rect x="80" y="80" width="240" height="25" fill="${m}"/><rect x="135" y="60" width="130" height="20" fill="${m}"/>`;
      s+=`<rect x="46" y="103" width="308" height="4" fill="${d}"/><rect x="76" y="78" width="248" height="4" fill="${d}"/>`;
      [120,155].forEach(y=>{for(let x=62;x<340;x+=24)s+=arch(x,y,12,22,d)});
      for(let x=94;x<310;x+=20)s+=arch(x,86,8,14,d);
      s+=chhatri(95,80,22,m,d)+chhatri(305,80,22,m,d)+chhatri(150,60,20,m,d)+chhatri(250,60,20,m,d)+dome(200,60,22,m);
      if(water){s+=`<rect y="200" width="400" height="50" fill="#4F86A8"/><rect x="50" y="200" width="300" height="30" fill="${m}" opacity=".3"/>`;for(let i=0;i<6;i++)s+=`<rect x="${30+r()*320}" y="${208+r()*36}" width="${30+r()*40}" height="2" fill="#fff" opacity=".45"/>`}
      else s+=ground("#7E9A57")+tree(25,205,1,"#4E6B3A")+tree(378,205,1.1,"#4E6B3A");
      break}
    case "lake":{
      s+=hills(160,"#7F8A5C",40)+hills(165,"#6A7550",18);
      s+=`<rect y="160" width="400" height="90" fill="#4C83A6"/>`;
      const cx=110+r()*180;
      s+=`<rect x="${cx-50}" y="122" width="100" height="40" fill="${m}"/>`;for(let x=cx-42;x<cx+44;x+=17)s+=arch(x,132,9,18,d);
      s+=chhatri(cx-30,122,20,m,d)+chhatri(cx+30,122,20,m,d)+dome(cx,122,14,m);
      s+=`<rect x="${cx-50}" y="162" width="100" height="30" fill="${m}" opacity=".35"/>`;
      for(let i=0;i<9;i++)s+=`<rect x="${r()*360}" y="${172+r()*70}" width="${20+r()*50}" height="2" fill="#fff" opacity=".45"/>`;
      s+=`<path d="M${300-cx/3} 215h46l-8 9h-30z" fill="#5B3A22"/><rect x="${318-cx/3}" y="196" width="2" height="19" fill="#5B3A22"/>`;break}
    case "temple": case "jain":{
      const f=type==="jain"?"#F3EEE6":m,dd=type==="jain"?"#B8AE9E":d;
      s+=ground("#CBA877");
      s+=`<rect x="70" y="185" width="260" height="16" fill="${dd}"/>`;
      s+=`<rect x="92" y="140" width="92" height="46" fill="${f}"/>`;for(let x=98;x<180;x+=18)s+=arch(x,152,10,34,dd);
      s+=dome(138,140,26,f);
      if(type==="jain"){s+=shikhara(300,186,44,70,f,dd,id+"b")+shikhara(105,140,26,34,f,dd,id+"c")}
      s+=shikhara(230,186,96,148,f,dd,id+"s");
      s+=`<rect x="229" y="16" width="2" height="26" fill="#5B3A22"/><path d="M231 16l22 6-22 6z" fill="#F28C28"/>`;break}
    case "dunes":{
      s+=`<path d="M0 170Q90 130 190 165T400 150V250H0Z" fill="#E7B66E"/><path d="M0 200Q120 160 230 195T400 185V250H0Z" fill="#D69A4E"/><path d="M0 230Q140 205 260 228T400 222V250H0Z" fill="#BF7F39"/>`;
      const cx=120+r()*120;s+=camel(cx,178,1,"#3B2A1E")+camel(cx+62,182,.85,"#3B2A1E")+camel(cx+112,185,.7,"#3B2A1E");
      s+=`<path d="M0 0h400v250H0z" fill="#FF8A3D" opacity=".07"/>`;break}
    case "wild":{
      s+=`<rect y="170" width="400" height="80" fill="#B9A55E"/><ellipse cx="${120+r()*160}" cy="215" rx="90" ry="16" fill="#5C8DA3"/>`;
      for(let i=0;i<5;i++)s+=tree(30+i*85+r()*30,175+r()*10,.9+r()*.6,"#4F6A39");
      for(let i=0;i<5;i++){const x=80+r()*240,y=40+r()*60;s+=`<path d="M${x} ${y}q6 -6 12 0q6 -6 12 0" stroke="#2C2C3A" stroke-width="2" fill="none"/>`}
      s+=`<g fill="#7A4A23" transform="translate(${260-r()*80} 186)"><ellipse cx="0" cy="0" rx="14" ry="7"/><rect x="-10" y="3" width="2.5" height="12"/><rect x="8" y="3" width="2.5" height="12"/><path d="M12 -4l8 -10 3 2-6 11z"/><path d="M18 -14l-3 -8M21 -13l3 -8" stroke="#7A4A23" stroke-width="1.6"/></g>`;break}
    case "haveli":{
      s+=`<rect x="0" y="70" width="95" height="180" fill="${d}" opacity=".55"/><rect x="305" y="60" width="95" height="190" fill="${d}" opacity=".55"/>`;
      s+=`<rect x="92" y="40" width="216" height="175" fill="${m}"/>`;
      const P=["#2E6E8E","#B3261E","#E1A73B","#3E7B4F"];
      [46,118].forEach(y=>{s+=`<rect x="92" y="${y}" width="216" height="10" fill="${d}"/>`;for(let x=98;x<304;x+=12)s+=`<circle cx="${x}" cy="${y+5}" r="3" fill="${P[(x/12|0)%4]}"/>`});
      [62,132].forEach(y=>{for(let x=104;x<300;x+=40){s+=`<rect x="${x}" y="${y}" width="28" height="44" fill="${d}" opacity=".25"/>`+arch(x+5,y+8,18,32,d)+`<rect x="${x-3}" y="${y-3}" width="34" height="4" fill="${d}"/>`}});
      s+=arch(182,168,36,47,"#3B2618")+`<rect y="215" width="400" height="35" fill="#B48A5C"/>`;break}
    case "stepwell":{
      s+=`<rect y="44" width="400" height="206" fill="${m}"/><rect y="44" width="400" height="6" fill="${d}"/>`;
      for(let i=0;i<9;i++){const y=60+i*18,inset=i*14;let p=`M${inset} ${y+14}`;for(let x=inset;x<400-inset;x+=22)p+=`L${x+11} ${y}L${x+22} ${y+14}`;s+=`<path d="${p}" fill="none" stroke="${d}" stroke-width="2.4"/><rect x="${inset}" y="${y+14}" width="${400-2*inset}" height="2" fill="${d}" opacity=".5"/>`}
      s+=`<rect x="140" y="222" width="120" height="28" fill="#3C6B78"/>`;break}
    case "falls":{
      s+=`<path d="M0 40H170L180 215H0Z" fill="#6B5A47"/><path d="M400 30H218L210 215H400Z" fill="#5D4E3E"/>`;
      s+=`<rect x="172" y="44" width="44" height="170" fill="#E7F3F6"/>`;for(let i=0;i<8;i++)s+=`<rect x="${176+r()*34}" y="${50+r()*120}" width="2" height="${30+r()*40}" fill="#9CC4D3"/>`;
      s+=`<ellipse cx="195" cy="222" rx="140" ry="26" fill="#4C83A6"/><ellipse cx="195" cy="214" rx="40" ry="8" fill="#fff" opacity=".7"/>`;
      for(let i=0;i<6;i++)s+=`<circle cx="${r()*400}" cy="${40+r()*30}" r="${14+r()*10}" fill="#4F6A39"/>`;break}
    case "mosque":{
      s+=ground("#D8C3A0");
      s+=`<rect x="95" y="120" width="210" height="82" fill="${tone==="white"?"#F3EEE6":m}"/>`;for(let x=108;x<296;x+=30)s+=arch(x,140,20,62,d);
      s+=dome(200,120,40,"#F3EEE6")+dome(135,120,16,"#F3EEE6")+dome(265,120,16,"#F3EEE6");
      [80,308].forEach(x=>{s+=`<rect x="${x}" y="58" width="12" height="144" fill="${m}"/>`+dome(x+6,58,9,"#F3EEE6")+`<rect x="${x-3}" y="100" width="18" height="4" fill="${d}"/>`});break}
    case "garden":{
      s+=ground("#7E9A57")+`<rect x="70" y="182" width="260" height="20" fill="${d}"/>`;
      s+=chhatri(200,182,74,m,d)+chhatri(110,182,40,m,d)+chhatri(290,182,40,m,d);
      s+=tree(28,205,1.2,"#3F5F31")+tree(372,205,1.3,"#3F5F31");break}
    case "hill":{
      s+=`<path d="M0 150L80 95L150 135L230 60L320 120L400 90V250H0Z" fill="#8E8C6A"/><path d="M0 190L100 140L190 180L290 130L400 175V250H0Z" fill="#6D7350"/><path d="M0 230L120 200L260 225L400 205V250H0Z" fill="#545B3D"/>`;
      s+=`<rect x="220" y="42" width="20" height="18" fill="${m}"/>`+dome(230,42,10,m)+`<rect x="229" y="14" width="1.6" height="18" fill="#5B3A22"/><path d="M230.6 14l14 4-14 4z" fill="#F28C28"/>`;break}
    case "ruins":{
      s+=ground("#C9A672");
      s+=`<path d="M60 200V120L80 110L95 125L120 100L140 130L160 115V200Z" fill="${m}"/>`+arch(85,150,26,50,d);
      s+=`<path d="M200 200V90L230 80L250 110L270 95L300 130V200Z" fill="${m}"/>`+arch(222,130,30,70,d);
      for(let i=0;i<5;i++)s+=`<rect x="${40+r()*320}" y="${200+r()*30}" width="${14+r()*14}" height="${8+r()*6}" fill="${d}"/>`;
      s+=`<path d="M350 200V150M350 165l-14 -14M350 160l12 -16" stroke="#4A3A2A" stroke-width="3" fill="none"/>`;break}
    case "border":{
      s+=ground("#D9B57C")+`<path d="M0 200Q100 185 200 198T400 192V250H0Z" fill="#CFA76A"/>`;
      s+=`<path d="M185 200L192 80L200 66L208 80L215 200Z" fill="${m}"/><rect x="170" y="196" width="60" height="10" fill="${d}"/>`;
      s+=`<rect x="276" y="70" width="3" height="134" fill="#4A3A2A"/><rect x="279" y="72" width="44" height="10" fill="#FF9933"/><rect x="279" y="82" width="44" height="10" fill="#FFFFFF"/><rect x="279" y="92" width="44" height="10" fill="#138808"/><circle cx="301" cy="87" r="3" fill="none" stroke="#000080" stroke-width="1"/>`;break}
    default:s+=ground("#C9A672");
  }
  return s+`</svg>`;
}
function foodArt(kind,key){
  const h=hash(key),r=rng(h),T=["#7A3B2E","#2F4B6E","#55642B","#6E2F4B","#8A5A1C"][h%5];
  let s=`<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="400" height="250" fill="${T}"/>`;
  for(let x=-10;x<410;x+=26)s+=`<circle cx="${x}" cy="${(x/26|0)%2?12:238}" r="5" fill="#fff" opacity=".18"/>`;
  s+=`<rect y="0" width="400" height="6" fill="#E1A73B" opacity=".7"/><rect y="244" width="400" height="6" fill="#E1A73B" opacity=".7"/>`;
  const plate=(cx,cy,rr)=>`<circle cx="${cx}" cy="${cy}" r="${rr}" fill="#D8DCE3"/><circle cx="${cx}" cy="${cy}" r="${rr-10}" fill="#C6CBD3"/>`;
  const katori=(cx,cy,rr,f)=>`<circle cx="${cx}" cy="${cy}" r="${rr}" fill="#B9BFC9"/><circle cx="${cx}" cy="${cy}" r="${rr-4}" fill="${f}"/><circle cx="${cx-rr*.3}" cy="${cy-rr*.3}" r="${rr*.18}" fill="#fff" opacity=".35"/>`;
  const ball=(cx,cy,rr,f)=>`<circle cx="${cx}" cy="${cy}" r="${rr}" fill="${f}"/><circle cx="${cx-rr*.35}" cy="${cy-rr*.35}" r="${rr*.3}" fill="#fff" opacity=".3"/>`;
  switch(kind){
    case "thali":{s+=plate(200,125,108);const C=["#E0A526","#F2D16B","#D9822B","#B3261E","#6E9A3A"];C.forEach((c,i)=>{const a=-2.6+i*.65;s+=katori(200+Math.cos(a)*72,125+Math.sin(a)*72,22,c)});
      s+=ball(175,150,16,"#C98B3A")+ball(205,160,16,"#C98B3A")+ball(232,145,16,"#C98B3A")+`<ellipse cx="205" cy="118" rx="30" ry="16" fill="#E2B060"/>`;for(let i=0;i<14;i++)s+=`<circle cx="${183+r()*44}" cy="${108+r()*20}" r="2" fill="#B9853F"/>`;break}
    case "sweet":{s+=plate(200,125,100);const c=["#F2A33A","#EFDCB6","#C9822F","#F5C26B"][h%4];
      if(/ghevar|ghewar/i.test(key)){s+=`<circle cx="200" cy="125" r="66" fill="#E9B866"/>`;for(let i=0;i<70;i++){const a=r()*6.28,d=r()*58;s+=`<circle cx="${200+Math.cos(a)*d}" cy="${125+Math.sin(a)*d}" r="${3+r()*3}" fill="#C88A35" opacity=".7"/>`}s+=`<circle cx="200" cy="125" r="34" fill="#F6E7C8" opacity=".85"/>`}
      else{[[200,95],[165,120],[235,120],[180,158],[222,158],[200,128]].forEach(([x,y])=>s+=ball(x,y,22,c));for(let i=0;i<12;i++)s+=`<circle cx="${165+r()*70}" cy="${92+r()*70}" r="1.8" fill="#6E9A3A"/>`}break}
    case "fried":{s+=plate(200,125,100);[[170,105],[232,112],[195,160]].forEach(([x,y])=>{s+=`<circle cx="${x}" cy="${y}" r="34" fill="#C98538"/><circle cx="${x}" cy="${y}" r="26" fill="#DDA04D"/><circle cx="${x-6}" cy="${y-6}" r="8" fill="#F0C27A" opacity=".7"/>`});
      s+=katori(320,70,24,"#3F7A2E")+katori(326,182,24,"#7A3B1C");break}
    case "curry":{s+=`<circle cx="200" cy="125" r="96" fill="#B9BFC9"/><circle cx="200" cy="125" r="84" fill="${["#A8321C","#D58A1E","#E3C15A"][h%3]}"/>`;for(let i=0;i<9;i++)s+=`<circle cx="${150+r()*100}" cy="${80+r()*90}" r="${7+r()*7}" fill="#7A3B1C" opacity=".65"/>`;for(let i=0;i<16;i++)s+=`<circle cx="${140+r()*120}" cy="${75+r()*100}" r="2" fill="#5E9A3A"/>`;s+=`<path d="M300 40Q330 120 290 200" stroke="#D8DCE3" stroke-width="10" fill="none" stroke-linecap="round"/>`;break}
    case "drink":{[[150,1],[255,.85]].forEach(([x,k])=>{s+=`<path d="M${x-40*k} ${70}L${x+40*k} 70L${x+30*k} ${200}L${x-30*k} 200Z" fill="#A9583A"/><ellipse cx="${x}" cy="70" rx="${40*k}" ry="10" fill="#F6EFE2"/><path d="M${x-30*k} 110H${x+33*k}" stroke="#8A4128" stroke-width="3"/>`;});for(let i=0;i<6;i++)s+=`<circle cx="${140+r()*20}" cy="68" r="2" fill="#E1A73B"/>`;break}
    case "bread":{s+=plate(200,125,100);for(let i=0;i<4;i++)s+=`<ellipse cx="${190+i*4}" cy="${135-i*9}" rx="62" ry="26" fill="${i%2?"#D9A866":"#C99550"}"/>`;for(let i=0;i<14;i++)s+=`<circle cx="${150+r()*90}" cy="${96+r()*30}" r="${2+r()*3}" fill="#8A5A2B" opacity=".7"/>`;s+=`<ellipse cx="225" cy="100" rx="14" ry="8" fill="#FFF6D8"/>`+katori(310,186,26,"#B3261E");break}
    default:{s+=plate(200,125,100);for(let i=0;i<260;i++){const a=r()*6.28,d=Math.sqrt(r())*70,x=200+Math.cos(a)*d,y=125+Math.sin(a)*d*.8,b=r()*6.28;s+=`<path d="M${x} ${y}l${Math.cos(b)*9} ${Math.sin(b)*9}" stroke="${["#E3A93B","#C98A28","#F0C45E"][i%3]}" stroke-width="2.4" stroke-linecap="round"/>`}}
  }
  return s+`</svg>`;
}

/* ---------- your edits (saved in this browser) ---------- */
const STORE="rajasthan-yatra-edits-v1";
let EDITS={places:{},food:{},photos:{}};
try{const raw=localStorage.getItem(STORE);if(raw)EDITS=Object.assign(EDITS,JSON.parse(raw))}catch(e){}
function saveEdits(){
  try{localStorage.setItem(STORE,JSON.stringify(EDITS));return true}
  catch(e){toast("Could not save. Browser storage is full or blocked; try a smaller photo or a photo link.");return false}
}
const BASE=D.map(d=>({places:d.places.slice(),food:d.food.slice()}));
function applyEdits(){
  D.forEach((d,i)=>{
    d.places=BASE[i].places.concat((EDITS.places[d.id]||[]).map(u=>[u.name,u.type,+u.km||0,u.hrs||"1 hr",u.desc||"",{u:u.id,img:u.img||""}]));
    d.food=BASE[i].food.concat((EDITS.food[d.id]||[]).map(u=>[u.name,u.kind,u.desc||"",{u:u.id,img:u.img||""}]));
  });
}
applyEdits();
const extraOf=(arr,idx)=>(arr[idx]&&typeof arr[idx]==="object")?arr[idx]:{};
const photoKey=(d,name)=>d.id+"|"+name;
function customImg(d,item,isFood){const x=extraOf(item,isFood?3:5);return EDITS.photos[photoKey(d,item[0])]||x.img||""}
let toastT;
function toast(msg){const t=$("#toast");t.textContent=msg;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>t.hidden=true,3200)}

/* ---------- photos ----------
   Order: your own photo (data.js img / "Change photo") → lead photo of the exact Wikipedia
   article (photos.js) → Wikipedia search → drawn illustration. */
const IMG={state:"unknown",cache:{},queue:[]};
const WAPI="https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=pageimages%7Cinfo&inprop=url&piprop=thumbnail&pithumbsize=900";
async function getJSON(u){const c=new AbortController(),t=setTimeout(()=>c.abort(),7000);try{const r=await fetch(u,{signal:c.signal});if(!r.ok)throw new Error(r.status);return await r.json()}finally{clearTimeout(t)}}
function firstPage(j){const ps=j&&j.query&&j.query.pages;if(!ps)return null;const pg=Object.values(ps).find(p=>p.thumbnail);return pg?{src:pg.thumbnail.source,href:pg.fullurl||"https://en.wikipedia.org/wiki/"+encodeURIComponent(pg.title),title:pg.title}:null}
function wikiPhoto(title,q){
  const key=title+"||"+q;if(key in IMG.cache)return IMG.cache[key];
  return IMG.cache[key]=(async()=>{
    let res=null;
    if(title)res=firstPage(await getJSON(WAPI+"&titles="+encodeURIComponent(title)));
    if(!res&&q){res=firstPage(await getJSON(WAPI+"&generator=search&gsrlimit=1&gsrsearch="+encodeURIComponent(q)));if(res)res.approx=true}
    return res;
  })();
}
async function probe(){try{await getJSON(WAPI+"&titles=Hawa%20Mahal");IMG.state="ok"}catch(e){IMG.state="off"}IMG.queue.splice(0).forEach(loadPhoto)}
function showImg(el,src,label,href){
  el.querySelectorAll("img,.credit").forEach(n=>n.remove());
  const im=new Image();im.alt=el.dataset.alt||"";im.decoding="async";
  im.onload=()=>{im.classList.add("on");if(label){const inBtn=!!el.closest("button");const c=document.createElement(inBtn||!href?"span":"a");c.className="credit";c.textContent=label;if(!inBtn&&href){c.href=href;c.target="_blank";c.rel="noopener"}el.appendChild(c)}};
  im.onerror=()=>im.remove();
  im.src=src;el.insertBefore(im,el.querySelector(".badge"));
}
function loadPhoto(el){
  if(el.dataset.img){showImg(el,el.dataset.img,"Your photo");return}
  if(IMG.state==="unknown"){IMG.queue.push(el);return}
  if(IMG.state!=="ok"||el.dataset.done)return;el.dataset.done=1;
  wikiPhoto(el.dataset.t,el.dataset.q).then(r=>{if(r)showImg(el,r.src,r.approx?"Wikipedia (closest match)":"Photo: Wikipedia",r.href)}).catch(()=>{});
}
const io="IntersectionObserver" in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);loadPhoto(e.target)}}),{rootMargin:"300px"}):null;
function watchPhotos(root){root.querySelectorAll(".ph").forEach(el=>io?io.observe(el):loadPhoto(el))}
const ph=(svg,o)=>`<div class="ph" data-t="${esc(o.t||"")}" data-q="${esc(o.q||"")}" data-img="${esc(o.img||"")}" data-alt="${esc(o.alt||"")}">${svg}${o.badge?`<span class="badge">${esc(o.badge)}</span>`:""}</div>`;
function placePh(d,p,badge){
  const t=WIKI[p[0]+"|"+d.id]||WIKI[p[0]]||(extraOf(p,5).u?"":p[0]);
  return ph(art(p[1],d.id+p[0],p[1]==="jain"?"white":d.tone),{t,q:p[0]+" "+d.n+" Rajasthan",img:customImg(d,p,false),alt:p[0],badge});
}
function foodPh(d,f,badge){
  return ph(foodArt(f[1],f[0]),{t:FOODWIKI[f[0]]||(extraOf(f,3).u?"":f[0]),q:f[0]+" Rajasthani food",img:customImg(d,f,true),alt:f[0],badge});
}


/* ---------- home ---------- */
function updateStats(){const totalPlaces=D.reduce((a,d)=>a+d.places.length,0),totalFood=D.reduce((a,d)=>a+d.food.length,0);
$("#stats").innerHTML=[[D.length,"districts"],[totalPlaces,"places to see"],[totalFood,"local dishes"],[Object.keys(DIVS).length,"divisions"]].map(([n,l])=>`<div><b class="num">${n}</b><span>${l}</span></div>`).join("");}
updateStats();

// map
(function(){
  const k=37.5,x=g=>(g-69.4)*.9*k+8,y=a=>(30.4-a)*k+6;
  let s="";
  for(let a=24;a<=30;a+=2)s+=`<line x1="0" x2="340" y1="${y(a)}" y2="${y(a)}" stroke="#fff" stroke-opacity=".12"/><text x="2" y="${y(a)-3}" font-size="8" fill="#fff" fill-opacity=".5">${a}°N</text>`;
  for(let g=70;g<=78;g+=2)s+=`<line y1="0" y2="300" x1="${x(g)}" x2="${x(g)}" stroke="#fff" stroke-opacity=".12"/><text x="${x(g)+2}" y="296" font-size="8" fill="#fff" fill-opacity=".5">${g}°E</text>`;
  const major=new Set(["jaipur","jodhpur","udaipur","jaisalmer","bikaner","kota","ajmer","bharatpur","sri-ganganagar","barmer","banswara","sirohi"]);
  D.forEach(d=>{const cx=x(d.lng),cy=y(d.lat);
    s+=`<circle class="dot" tabindex="0" role="button" aria-label="${esc(d.n)}" data-id="${d.id}" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="5.5" fill="${DIVS[d.div].c}" stroke="#fff" stroke-width="1.4"><title>${esc(d.n)}</title></circle>`;
});
  const LP={jaipur:"l",barmer:"l",jodhpur:"l",kota:"b",sirohi:"l"};
  D.forEach(d=>{if(!major.has(d.id))return;const cx=x(d.lng),cy=y(d.lat),p=LP[d.id];
    const [tx,ty,an]=p==="l"?[cx-8,cy+3,"end"]:p==="b"?[cx,cy+16,"middle"]:[cx+8,cy+3,"start"];
    s+=`<text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="${an}" font-size="10" fill="#fff" stroke="#232A6B" stroke-width="2.5" paint-order="stroke" font-family="Mukta,sans-serif" pointer-events="none">${esc(d.n)}</text>`});
  const m=$("#map");m.innerHTML=s;
  m.addEventListener("click",e=>{const t=e.target.closest(".dot");if(t)openDistrict(t.dataset.id)});
  m.addEventListener("keydown",e=>{const t=e.target.closest(".dot");if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();openDistrict(t.dataset.id)}});
  m.addEventListener("mouseover",e=>{const t=e.target.closest(".dot");$("#maphover").textContent=t?byId[t.dataset.id].n:""});
  $("#legend").innerHTML=Object.values(DIVS).map(v=>`<span><i style="background:${v.c}"></i>${v.n}</span>`).join("");
})();

let divFilter="all";
$("#divchips").innerHTML=`<button class="chip" type="button" data-div="all" aria-pressed="true">All divisions</button>`+Object.entries(DIVS).map(([k,v])=>`<button class="chip" type="button" data-div="${k}" aria-pressed="false"><i style="background:${v.c}"></i>${v.n}</button>`).join("");
$("#divchips").addEventListener("click",e=>{const b=e.target.closest(".chip");if(!b)return;divFilter=b.dataset.div;document.querySelectorAll("#divchips .chip").forEach(c=>c.setAttribute("aria-pressed",c===b));renderGrid()});
$("#q").addEventListener("input",renderGrid);
function cardHTML(d){
  const p=d.places[0],km=d.id==="jaipur"?0:road(byId.jaipur,d);
  return `<button class="card" type="button" data-id="${d.id}">${placePh(d,p,p[0])}
  <div class="body"><div class="divtag" style="color:${DIVS[d.div].c}"><i style="background:${DIVS[d.div].c}"></i>${DIVS[d.div].n} division</div>
  <h3>${esc(d.n)}</h3><div class="tag">${esc(d.tag)}</div>
  <div class="meta num"><span><b>${esc(d.days)}</b></span><span>${km?`<b>~${km} km</b> from Jaipur`:"<b>State capital</b>"}</span><span><b>${d.places.length}</b> places</span></div></div></button>`;
}
function renderGrid(){
  const q=$("#q").value.trim().toLowerCase();
  const list=D.filter(d=>(divFilter==="all"||d.div===divFilter)&&(!q||JSON.stringify(d).toLowerCase().includes(q)));
  const g=$("#grid");
  g.innerHTML=list.length?list.map(cardHTML).join(""):`<div class="empty" style="grid-column:1/-1">No district matches “${esc(q)}”. Try a dish like “kachori” or a place type like “fort”.</div>`;
  watchPhotos(g);
}
$("#grid").addEventListener("click",e=>{const c=e.target.closest(".card");if(c)openDistrict(c.dataset.id)});

/* ---------- distance tool ---------- */
const opts=D.slice().sort((a,b)=>a.n.localeCompare(b.n)).map(d=>`<option value="${d.id}">${esc(d.n)}</option>`).join("");
$("#from").innerHTML=opts;$("#to").innerHTML=opts;$("#from").value="jaipur";$("#to").value="jaisalmer";
function renderDist(){
  const a=byId[$("#from").value],b=byId[$("#to").value];
  const st=Math.round(hav(a,b)),rd=road(a,b);
  $("#dres").innerHTML=a===b?`<div style="grid-column:1/-1">Pick two different districts.</div>`:
   `<div><b class="num">~${rd} km</b><span>by road (approx.)</span></div><div><b class="num">${dur(rd)}</b><span>driving time</span></div><div><b class="num">${st} km</b><span>straight line</span></div>`;
  $("#nearname").textContent=a.n;
  const near=D.filter(d=>d!==a).map(d=>[d,road(a,d)]).sort((x,y)=>x[1]-y[1]).slice(0,8);
  $("#neartable").innerHTML=`<thead><tr><th>District</th><th class="num">Road km</th><th class="num">Drive</th><th>Railway station</th></tr></thead><tbody>`+near.map(([d,k])=>`<tr><td><button class="linkish" type="button" data-id="${d.id}">${esc(d.n)}</button></td><td class="num">~${k}</td><td class="num">${dur(k)}</td><td>${esc(d.rail.split(/[;,]/)[0])}</td></tr>`).join("")+`</tbody>`;
}
["from","to"].forEach(i=>$("#"+i).addEventListener("change",renderDist));
$("#swap").addEventListener("click",()=>{const f=$("#from").value;$("#from").value=$("#to").value;$("#to").value=f;renderDist()});
$("#neartable").addEventListener("click",e=>{const b=e.target.closest("[data-id]");if(b)openDistrict(b.dataset.id)});
renderDist();

/* ---------- itineraries ---------- */
const TRIPS=[
 {n:"Classic Rajasthan",d:"The first-timer's loop: the Pink City, holy Pushkar, the Blue City and a night on the dunes.",s:[["jaipur",2],["ajmer",1],["jodhpur",2],["jaisalmer",2]]},
 {n:"Mewar Lakes & Forts",d:"Palaces on lakes, Chittor's epic fort, Kumbhalgarh's great wall and the cool air of Mount Abu.",s:[["udaipur",2],["chittorgarh",1],["rajsamand",1],["sirohi",2]]},
 {n:"Thar Desert Trail",d:"Camels and Junagarh, the demoiselle cranes of Khichan, the golden fort and Barmer's crafts.",s:[["bikaner",2],["phalodi",1],["jaisalmer",3],["barmer",1]]},
 {n:"Shekhawati Painted Towns",d:"Slow travel through frescoed havelis, Khatu Shyam ji and the blackbuck of Tal Chhapar.",s:[["jaipur",1],["sikar",1],["jhunjhunu",2],["churu",1]]},
 {n:"Hadoti & Tigers",d:"Tiger safaris at Ranthambore, Bundi's stepwells, Kota's riverfront and Gagron water fort.",s:[["sawai-madhopur",2],["bundi",1],["kota",1],["jhalawar",1]]},
 {n:"Birds, Braj & Bhangarh",d:"Keoladeo's birds, Deeg's fountains, Sariska and haunted Bhangarh, ending at Chand Baori.",s:[["bharatpur",1],["deeg",1],["alwar",2],["dausa",1]]},
 {n:"Southern Tribal Belt",d:"Lakes and islands, Bhil culture and the Baneshwar fair country, far from the crowds.",s:[["udaipur",1],["salumbar",1],["banswara",2],["dungarpur",1]]},
 {n:"Grand Rajasthan",d:"Two weeks across the whole state, from Shekhawati to the Thar to Mewar.",s:[["jaipur",2],["jhunjhunu",1],["bikaner",2],["jaisalmer",2],["jodhpur",2],["pali",1],["udaipur",2],["chittorgarh",1],["ajmer",1]]}
];
$("#tripgrid").innerHTML=TRIPS.map(t=>{
  let km=0,route="";
  t.s.forEach(([id,days],i)=>{if(i){const k=road(byId[t.s[i-1][0]],byId[id]);km+=k;route+=`<span class="leg num">${k} km →</span>`}route+=`<button type="button" data-id="${id}">${esc(byId[id].n)} · ${days}d</button>`});
  const days=t.s.reduce((a,x)=>a+x[1],0);
  return `<article class="trip"><h3>${esc(t.n)}</h3><p class="muted" style="margin:0">${esc(t.d)}</p><div class="route">${route}</div><div class="tot num"><span><b>${days}</b> days</span><span><b>~${km}</b> km on the road</span><span><b>${t.s.length}</b> districts</span></div></article>`}).join("");
$("#tripgrid").addEventListener("click",e=>{const b=e.target.closest("[data-id]");if(b)openDistrict(b.dataset.id)});

/* ---------- tips ---------- */
const M=["J","F","M","A","M","J","J","A","S","O","N","D"],SC=["#2E8B57","#2E8B57","#7FB24A","#E1A73B","#C8442B","#C8442B","#4C83A6","#4C83A6","#4C83A6","#2E8B57","#2E8B57","#2E8B57"];
$("#tipgrid").innerHTML=[
 `<div class="panel"><h3>When to go</h3><div class="season">${SC.map(c=>`<i style="background:${c}"></i>`).join("")}</div><div class="season-l">${M.map(m=>`<span>${m}</span>`).join("")}</div>
  <ul><li><b>Oct – Mar</b> is peak season: 10–28°C days, cold desert nights.</li><li><b>Apr – Jun</b> is very hot (40–50°C); go to Mount Abu or travel early morning.</li><li><b>Jul – Sep</b> monsoon fills Udaipur's lakes and Hadoti's waterfalls; tiger parks close their core zones.</li></ul></div>`,
 `<div class="panel"><h3>Getting around</h3><ul><li><b>Trains</b> link almost every district; book on IRCTC. Vande Bharat runs on Jaipur–Udaipur and Jaipur–Jodhpur routes.</li><li><b>RSRTC buses</b> (Rajasthan Roadways) reach every town; AC Volvo 'Gold Line' runs between big cities. Book on the RSRTC website.</li><li><b>Hired car with driver</b> is the easiest way to cover several districts; rates are per km.</li><li><b>Luxury trains</b>: Palace on Wheels and Maharajas' Express.</li></ul></div>`,
 `<div class="panel"><h3>Temple & village etiquette</h3><ul><li>Remove shoes at temples, dargahs and Jain shrines.</li><li>No leather inside Jain temples; cover your head at the Ajmer Dargah and gurdwaras.</li><li>Pushkar is strictly vegetarian with no alcohol or eggs.</li><li>Ask before photographing people; many forts charge a camera fee.</li></ul></div>`,
 `<div class="panel"><h3>Eating like a local</h3><ul><li>Order a <b>Rajasthani thali</b> once: dal baati churma, gatte, ker sangri, kadhi, bajra roti.</li><li>Breakfast is kachori or mirchi bada with chai.</li><li>Seasonal sweets: ghevar in monsoon, til patti and gajak in winter.</li><li>Drink bottled or filtered water; carry ORS in summer.</li></ul></div>`,
 `<div class="panel"><h3>Money & tickets</h3><ul><li>UPI payments work almost everywhere, even at small stalls.</li><li>Jaipur's composite ticket covers Amer, Hawa Mahal, Jantar Mantar, Albert Hall, Nahargarh and more for two days.</li><li>Book Ranthambore and Sariska safaris online well ahead in winter.</li></ul></div>`,
 `<div class="panel"><h3>Big fairs to plan around</h3><ul><li><b>Jan:</b> Kite Festival (Jaipur, Jodhpur), Bikaner Camel Festival, Nagaur fair</li><li><b>Feb:</b> Jaisalmer Desert Festival, Baneshwar fair</li><li><b>Mar–Apr:</b> Gangaur, Holi, Khatu Shyam mela</li><li><b>Jul–Aug:</b> Teej</li><li><b>Oct–Nov:</b> Marwar Festival, Kota Dussehra, Pushkar Camel Fair</li></ul></div>`
].join("");

/* ---------- district page ---------- */
function hrsOf(s){s=String(s);if(/half/.test(s))return 4;if(/safari/.test(s))return 7;if(/evening/.test(s))return 5;let m=s.match(/([\d.]+)\s*hr/);if(m)return +m[1];m=s.match(/(\d+)\s*min/);if(m)return m[1]/60;return 2}
function dayPlan(d){
  const ps=d.places.slice().sort((a,b)=>a[2]-b[2]);const days=[];let cur=[],h=0;
  ps.forEach(p=>{const cost=hrsOf(p[3])+(p[2]>15?p[2]*2/45:.4);if(cur.length&&h+cost>8.5){days.push(cur);cur=[];h=0}cur.push(p);h+=cost});
  if(cur.length)days.push(cur);return days;
}
let CURRENT=null;
function itemTools(d,item,isFood){
  const x=extraOf(item,isFood?3:5),kind=isFood?"food":"place";
  if(x.u)return `<div class="edit-row"><span class="pill mine">Added by you</span><button type="button" class="mini" data-edit="${kind}" data-uid="${x.u}">Edit</button><button type="button" class="mini danger" data-del="${kind}" data-uid="${x.u}">Delete</button></div>`;
  return `<div class="edit-row"><button type="button" class="mini" data-photo="${esc(item[0])}" data-isfood="${isFood?1:0}">Change photo</button></div>`;
}
function openDistrict(id,noScroll){
  const d=byId[id];if(!d)return;CURRENT=id;
  const i=D.indexOf(d),prev=D[(i-1+D.length)%D.length],next=D[(i+1)%D.length],dv=DIVS[d.div];
  const hero=d.places[0];
  const hubs=Object.entries(HUBS).filter(([k,v])=>v!==d).map(([k,v])=>[v.n,road(d,v)]);
  const near=D.filter(x=>x!==d).map(x=>[x,road(d,x)]).sort((a,b)=>a[1]-b[1]).slice(0,4);
  const plan=dayPlan(d);
  const el=$("#detail");
  el.innerHTML=`<div class="wrap">
   <button class="back" type="button" data-back>← All districts</button>
   <div class="dhero">
     ${placePh(d,hero,hero[0])}
     <div>
       <div class="divtag" style="color:${dv.c}"><i style="background:${dv.c}"></i>${dv.n} division</div>
       <h1>${esc(d.n)}</h1>
       <p style="font-size:1.12rem;margin:0" class="muted">${esc(d.tag)}</p>
       <dl class="facts">
         <div><dt>Days needed</dt><dd>${esc(d.days)}</dd></div>
         <div><dt>Best time</dt><dd>${esc(d.best)}</dd></div>
         <div><dt>From Jaipur</dt><dd class="num">${d.id==="jaipur"?"State capital":`~${road(byId.jaipur,d)} km · ${dur(road(byId.jaipur,d))}`}</dd></div>
         <div><dt>Main railway station</dt><dd>${esc(d.rail.split(";")[0])}</dd></div>
       </dl>
     </div>
   </div>
  </div>
  <nav class="subnav" aria-label="District sections"><div class="wrap in">
   ${[["places","Places"],["food","Food"],["dress","Clothes & crafts"],["history","History"],["transport","Getting there"],["plan","Day plan"]].map(([a,l])=>`<a href="#d-${a}" data-jump="d-${a}">${l}</a>`).join("")}
  </div></nav>
  <div class="wrap">
   <section class="dsec" id="d-places"><div class="sechead"><div><h2>Famous places to visit</h2><p class="sub">Distances are from ${esc(d.n)} town; time is what to set aside on site.</p></div><button type="button" class="addbtn" data-add="place">+ Add a place</button></div>
    <div class="pgrid">${d.places.map(p=>`<article class="pcard">${placePh(d,p,TYPE[p[1]])}
      <div class="body"><h3>${esc(p[0])}</h3><div class="pills num"><span class="pill hot">${p[2]?`${p[2]} km away`:"In town"}</span><span class="pill">${esc(p[3])}</span></div><p>${esc(p[4])}</p><a class="ext" href="${gimg(p[0]+" "+d.n+" Rajasthan")}" target="_blank" rel="noopener">More photos ↗</a>${itemTools(d,p,false)}</div></article>`).join("")}</div>
   </section>
   <section class="dsec" id="d-food"><div class="sechead"><div><h2>Famous food</h2><p class="sub">What to eat in ${esc(d.n)}.</p></div><button type="button" class="addbtn" data-add="food">+ Add a dish</button></div>
    <div class="pgrid">${d.food.map(f=>`<article class="pcard">${foodPh(d,f,FOODK[f[1]])}
      <div class="body"><h3>${esc(f[0])}</h3><p>${esc(f[2])}</p><a class="ext" href="${gimg(f[0]+" Rajasthani food")}" target="_blank" rel="noopener">More photos ↗</a>${itemTools(d,f,true)}</div></article>`).join("")}</div>
   </section>
   <section class="dsec" id="d-dress"><h2>Clothes, crafts & traditions</h2><p class="sub">What people wear, what to buy, and when the place comes alive.</p>
    <div class="three">
      <div class="panel"><h3>Clothes & dress</h3><p>${esc(d.wear)}</p></div>
      <div class="panel"><h3>Famous for & shopping</h3><p>${esc(d.shop||"Local handicrafts at the town bazaar.")}</p></div>
      <div class="panel"><h3>Traditions & festivals</h3><p>${esc(d.trad)}</p></div>
    </div>
   </section>
   <section class="dsec" id="d-history"><h2>History</h2><p class="history">${esc(d.hist)}</p></section>
   <section class="dsec" id="d-transport"><h2>Getting there & around</h2><p class="sub">Nearest stations, bus stands and airports.</p>
    <div class="tablewrap"><table><tbody>
      <tr><th>Railway</th><td>${esc(d.rail)}</td></tr>
      <tr><th>Bus</th><td>${esc(d.bus)}</td></tr>
      <tr><th>Airport</th><td>${esc(d.air)}</td></tr>
      <tr><th>Local transport</th><td>${esc(d.local)}</td></tr>
    </tbody></table></div>
    <div class="two" style="margin-top:16px">
      <div><h3 style="font-size:1.2rem;margin-bottom:8px">Distance from major cities</h3><div class="tablewrap"><table><tbody>${hubs.map(([n,k])=>`<tr><td>${esc(n)}</td><td class="num">~${k} km</td><td class="num">${dur(k)}</td></tr>`).join("")}</tbody></table></div></div>
      <div><h3 style="font-size:1.2rem;margin-bottom:8px">Nearest districts</h3><div class="tablewrap"><table><tbody>${near.map(([x,k])=>`<tr><td><button class="linkish" type="button" data-id="${x.id}">${esc(x.n)}</button></td><td class="num">~${k} km</td><td class="num">${dur(k)}</td></tr>`).join("")}</tbody></table></div></div>
    </div>
   </section>
   <section class="dsec" id="d-plan"><h2>Suggested day plan</h2><p class="sub">Places grouped by distance from town, about 8 hours of sightseeing and driving a day. Recommended stay: ${esc(d.days)}.</p>
    <div class="plan">${plan.map((ps,n)=>`<div class="day"><b>Day ${n+1}</b><div>${ps.map(p=>`${esc(p[0])} <span class="muted num">(${p[2]?p[2]+" km":"in town"}, ${esc(p[3])})</span>`).join(" → ")}</div></div>`).join("")}</div>
   </section>
   <div class="pn">
     <button type="button" data-id="${prev.id}"><small>← Previous</small>${esc(prev.n)}</button>
     <button type="button" data-id="${next.id}" style="text-align:right"><small>Next →</small>${esc(next.n)}</button>
   </div>
  </div>`;
  $("#home").hidden=true;el.hidden=false;
  try{history.replaceState(null,"","#"+id)}catch(e){}
  if(!noScroll)window.scrollTo(0,0);
  watchPhotos(el);
}
function goHome(target){
  CURRENT=null;
  $("#detail").hidden=true;$("#home").hidden=false;
  try{history.replaceState(null,"",target?"#"+target:location.pathname+location.search)}catch(e){}
  if(target){const t=document.getElementById(target);if(t)t.scrollIntoView()}else window.scrollTo(0,0);
}
$("#detail").addEventListener("click",e=>{
  if(e.target.closest("[data-back]")){goHome("districts");return}
  const j=e.target.closest("[data-jump]");if(j){e.preventDefault();document.getElementById(j.dataset.jump).scrollIntoView({behavior:"smooth"});return}
  const add=e.target.closest("[data-add]");if(add){openEditor(add.dataset.add,CURRENT);return}
  const ed=e.target.closest("[data-edit]");if(ed){openEditor(ed.dataset.edit,CURRENT,ed.dataset.uid);return}
  const del=e.target.closest("[data-del]");if(del){
    if(del.dataset.armed){removeItem(del.dataset.del,CURRENT,del.dataset.uid);return}
    del.dataset.armed=1;del.textContent="Tap again to delete";setTimeout(()=>{if(del.isConnected){delete del.dataset.armed;del.textContent="Delete"}},3500);return}
  const pb=e.target.closest("[data-photo]");if(pb){openPhotoEditor(CURRENT,pb.dataset.photo,pb.dataset.isfood==="1");return}
  const b=e.target.closest("button[data-id]");if(b)openDistrict(b.dataset.id);
});
$("#home-btn").addEventListener("click",()=>goHome());
document.querySelectorAll("[data-go]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();goHome(a.dataset.go)}));

/* ---------- editor: add / edit places and dishes, change photos ---------- */
const modal=$("#modal"),mform=$("#mform");
let MODE=null;
function closeModal(){modal.hidden=true;MODE=null;mform.innerHTML=""}
modal.addEventListener("click",e=>{if(e.target===modal||e.target.closest("[data-close]"))closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!modal.hidden)closeModal()});
const field=(id,label,html,hint)=>`<label class="fld" for="${id}"><span>${label}</span>${html}${hint?`<small>${hint}</small>`:""}</label>`;
function photoFields(cur){
  return `<fieldset class="photo-f"><legend>Photo (optional)</legend>
    ${field("f-imgurl","Photo link",`<input id="f-imgurl" type="url" placeholder="https://… or images/amer-fort.jpg" value="${esc(cur&&!cur.startsWith("data:")?cur:"")}">`,"Paste an image address, or a file path inside your project's images folder.")}
    ${field("f-imgfile","Or upload a photo",`<input id="f-imgfile" type="file" accept="image/*">`,"Resized to 900px and saved in this browser.")}
    <div class="preview" id="f-prev">${cur?`<img src="${esc(cur)}" alt="Current photo">`:""}</div>
    <input type="hidden" id="f-imgdata" value="${esc(cur&&cur.startsWith("data:")?cur:"")}">
  </fieldset>`;
}
function wirePhoto(){
  const file=$("#f-imgfile"),url=$("#f-imgurl"),prev=$("#f-prev"),hid=$("#f-imgdata");
  file.addEventListener("change",()=>{const f=file.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{const im=new Image();im.onload=()=>{const sc=Math.min(1,900/Math.max(im.width,im.height));const c=document.createElement("canvas");c.width=Math.round(im.width*sc);c.height=Math.round(im.height*sc);c.getContext("2d").drawImage(im,0,0,c.width,c.height);hid.value=c.toDataURL("image/jpeg",.8);url.value="";prev.innerHTML=`<img src="${hid.value}" alt="Preview">`};im.src=rd.result};rd.readAsDataURL(f)});
  url.addEventListener("change",()=>{hid.value="";prev.innerHTML=url.value?`<img src="${esc(url.value)}" alt="Preview">`:""});
}
const chosenImg=()=>$("#f-imgdata").value||$("#f-imgurl").value.trim();
function districtSelect(sel){return field("f-dist","District",`<select id="f-dist">${D.slice().sort((a,b)=>a.n.localeCompare(b.n)).map(d=>`<option value="${d.id}"${d.id===sel?" selected":""}>${esc(d.n)}</option>`).join("")}</select>`)}
function openEditor(kind,did,uid){
  const list=(kind==="food"?EDITS.food:EDITS.places)[did]||[];
  const cur=uid?list.find(x=>x.id===uid):null;
  MODE={kind,did,uid};
  const isF=kind==="food";
  mform.innerHTML=`<h2 id="m-title">${cur?"Edit":"Add"} ${isF?"a dish":"a place"}</h2>
   ${did&&!cur?`<p class="muted" style="margin:0">Adding to <b>${esc(byId[did].n)}</b></p>`:""}
   ${did?"":districtSelect("jaipur")}
   ${field("f-name","Name",`<input id="f-name" required maxlength="80" value="${esc(cur?cur.name:"")}" placeholder="${isF?"e.g. Mohan Thal":"e.g. Panna Meena ka Kund"}">`)}
   ${isF?field("f-kind","Kind",`<select id="f-kind">${Object.entries({thali:"Meal",sweet:"Sweet",fried:"Fried snack",curry:"Curry",drink:"Drink",bread:"Bread",snack:"Other snack"}).map(([k,v])=>`<option value="${k}"${cur&&cur.kind===k?" selected":""}>${v}</option>`).join("")}</select>`)
     :`<div class="fgrid">${field("f-type","Type",`<select id="f-type">${Object.entries(TYPE).map(([k,v])=>`<option value="${k}"${cur&&cur.type===k?" selected":""}>${v}</option>`).join("")}</select>`)}
       ${field("f-km","Km from town",`<input id="f-km" type="number" min="0" max="500" step="1" value="${cur?cur.km:0}">`)}
       ${field("f-hrs","Time to spend",`<input id="f-hrs" value="${esc(cur?cur.hrs:"1 hr")}" placeholder="2 hrs, 45 min, half day">`)}</div>`}
   ${field("f-desc","Description",`<textarea id="f-desc" rows="3" maxlength="600" placeholder="What is it and why visit?">${esc(cur?cur.desc:"")}</textarea>`)}
   ${photoFields(cur&&cur.img)}
   <div class="mactions"><button type="button" class="ghost" data-close>Cancel</button><button type="submit" class="primary">${cur?"Save changes":isF?"Add dish":"Add place"}</button></div>`;
  modal.hidden=false;wirePhoto();$("#f-name").focus();
}
function openPhotoEditor(did,name,isFood){
  const d=byId[did],cur=EDITS.photos[photoKey(d,name)]||"";
  MODE={kind:"photo",did,name};
  mform.innerHTML=`<h2 id="m-title">Change photo</h2><p class="muted" style="margin:0">${esc(name)}, ${esc(d.n)}</p>
   ${photoFields(cur)}
   <div class="mactions">${cur?`<button type="button" class="ghost danger" id="f-reset">Use automatic photo</button>`:""}<button type="button" class="ghost" data-close>Cancel</button><button type="submit" class="primary">Save photo</button></div>`;
  modal.hidden=false;wirePhoto();
  const rs=$("#f-reset");if(rs)rs.addEventListener("click",()=>{delete EDITS.photos[photoKey(d,name)];saveEdits();closeModal();refresh();toast("Back to the automatic photo.")});
}
mform.addEventListener("submit",e=>{
  e.preventDefault();if(!MODE)return;
  if(MODE.kind==="photo"){const img=chosenImg();if(!img){toast("Add a photo link or upload a photo first.");return}
    EDITS.photos[photoKey(byId[MODE.did],MODE.name)]=img;if(saveEdits()){closeModal();refresh();toast("Photo saved.")}return}
  const did=MODE.did||$("#f-dist").value,isF=MODE.kind==="food",bag=isF?EDITS.food:EDITS.places;
  const name=$("#f-name").value.trim();if(!name){toast("Give it a name.");return}
  const rec=isF?{name,kind:$("#f-kind").value,desc:$("#f-desc").value.trim(),img:chosenImg()}
               :{name,type:$("#f-type").value,km:Math.max(0,Math.round(+$("#f-km").value||0)),hrs:$("#f-hrs").value.trim()||"1 hr",desc:$("#f-desc").value.trim(),img:chosenImg()};
  bag[did]=bag[did]||[];
  if(MODE.uid){const i=bag[did].findIndex(x=>x.id===MODE.uid);if(i>-1)bag[did][i]=Object.assign(bag[did][i],rec)}
  else bag[did].push(Object.assign({id:"u"+Date.now().toString(36)},rec));
  const wasNew=!MODE.uid;
  if(saveEdits()){closeModal();refresh(did);toast(wasNew?`${name} added to ${byId[did].n}.`:"Changes saved.")}
});
function removeItem(kind,did,uid){
  const bag=kind==="food"?EDITS.food:EDITS.places;bag[did]=(bag[did]||[]).filter(x=>x.id!==uid);if(!bag[did].length)delete bag[did];
  saveEdits();refresh();toast("Deleted.");
}
function refresh(openId){
  applyEdits();updateStats();renderGrid();renderManage();
  const y=window.scrollY;
  if(openId&&openId!==CURRENT)openDistrict(openId);else if(CURRENT){openDistrict(CURRENT,true);window.scrollTo(0,y)}
}

/* ---------- "My edits" panel: export, import, make permanent ---------- */
function editCount(){let p=0,f=0;Object.values(EDITS.places).forEach(a=>p+=a.length);Object.values(EDITS.food).forEach(a=>f+=a.length);return{p,f,ph:Object.keys(EDITS.photos).length}}
function renderManage(){
  const c=editCount(),rows=[];
  D.forEach(d=>{const p=(EDITS.places[d.id]||[]).length,f=(EDITS.food[d.id]||[]).length,ph=Object.keys(EDITS.photos).filter(k=>k.startsWith(d.id+"|")).length;if(p||f||ph)rows.push(`<tr><td><button class="linkish" type="button" data-id="${d.id}">${esc(d.n)}</button></td><td class="num">${p}</td><td class="num">${f}</td><td class="num">${ph}</td></tr>`)});
  $("#mcount").textContent=`${c.p} places · ${c.f} dishes · ${c.ph} photos`;
  $("#mtable").innerHTML=rows.length?`<table><thead><tr><th>District</th><th class="num">Places</th><th class="num">Dishes</th><th class="num">Photos</th></tr></thead><tbody>${rows.join("")}</tbody></table>`:`<p class="empty" style="margin:0">Nothing added yet. Open any district and press “+ Add a place”, or use the button above.</p>`;
}
function download(name,text,type){
  try{const b=new Blob([text],{type});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1000);toast(`Downloading ${name}…`)}
  catch(e){toast("Download is blocked here. Use Copy instead.")}
}
function buildDataJs(){
  const clean=D.map(d=>{const o=Object.assign({},d);
    o.places=d.places.map(p=>{const x=p.slice(0,5),img=customImg(d,p,false);if(img)x.push({img});return x});
    o.food=d.food.map(f=>{const x=f.slice(0,3),img=customImg(d,f,true);if(img)x.push({img});return x});return o});
  return `/* Rajasthan Yatra: district data (exported ${new Date().toISOString().slice(0,10)}).\n   Place:  [name, type, km from district town, time to spend, description, {img} optional]\n   Food:   [name, kind, description, {img} optional] */\nconst DIVS = ${JSON.stringify(DIVS,null,2)};\nconst D = [\n${clean.map(o=>JSON.stringify(o)).join(",\n")}\n];\n`;
}
$("#m-add").addEventListener("click",()=>openEditor("place",null));
$("#m-adddish").addEventListener("click",()=>openEditor("food",null));
$("#m-datajs").addEventListener("click",()=>download("data.js",buildDataJs(),"text/javascript"));
$("#m-json").addEventListener("click",()=>download("rajasthan-yatra-edits.json",JSON.stringify(EDITS,null,2),"application/json"));
$("#m-copy").addEventListener("click",()=>{const t=JSON.stringify(EDITS);navigator.clipboard&&navigator.clipboard.writeText(t).then(()=>toast("Edits copied as JSON."),()=>{$("#m-paste").value=t;$("#m-paste").select();toast("Copy blocked; the JSON is selected in the box below.")})});
$("#m-importfile").addEventListener("change",e=>{const f=e.target.files[0];if(!f)return;f.text().then(importEdits)});
$("#m-importbtn").addEventListener("click",()=>importEdits($("#m-paste").value));
function importEdits(text){
  try{const j=JSON.parse(text);if(typeof j!=="object"||!j)throw 0;
    ["places","food"].forEach(k=>Object.entries(j[k]||{}).forEach(([did,arr])=>{if(!byId[did]||!Array.isArray(arr))return;EDITS[k][did]=(EDITS[k][did]||[]).filter(x=>!arr.some(y=>y.id===x.id)).concat(arr)}));
    Object.assign(EDITS.photos,j.photos||{});saveEdits();refresh();toast("Edits imported.")}
  catch(e){toast("That isn't a valid edits file. Paste the JSON exported from this site.")}
}
$("#m-clear").addEventListener("click",e=>{const b=e.currentTarget;
  if(!b.dataset.armed){b.dataset.armed=1;b.textContent="Tap again to delete all edits";setTimeout(()=>{delete b.dataset.armed;b.textContent="Clear all edits"},3500);return}
  EDITS={places:{},food:{},photos:{}};saveEdits();delete b.dataset.armed;b.textContent="Clear all edits";refresh();toast("All edits cleared.")});
$("#manage").addEventListener("click",e=>{const b=e.target.closest("button[data-id]");if(b)openDistrict(b.dataset.id)});
renderManage();

function setBar(){document.documentElement.style.setProperty('--barh',document.querySelector('.bar').offsetHeight+'px')}
setBar();addEventListener('resize',setBar);
renderGrid();
probe();
const h0=(location.hash||"").slice(1);
if(byId[h0])openDistrict(h0);else if(h0&&document.getElementById(h0))document.getElementById(h0).scrollIntoView();

