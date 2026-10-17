/* Drawing: stick-figure people (SVG) with poses */
const SK=['#F4C9A8','#DDA77C','#B5794F','#7E5034'];
const HR=['#3A2416','#8A5326','#1C1714','#D19A3E'];
const C={blue:'#2F6FE0',red:'#E2453C',green:'#2FA35B',yellow:'#F2B92E',teal:'#16A39C',purple:'#8A55D6',orange:'#F2862E',navy:'#1F3566',pink:'#E85A9A'};
function shade(hex,amt){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const f=v=>Math.max(0,Math.min(255,Math.round(v*(1+amt))));return '#'+[f(r),f(g),f(b)].map(v=>v.toString(16).padStart(2,'0')).join('')}
const POSES={
  stand:{aF:[12,6],aB:[-12,-6],lF:[4,0],lB:[-4,0]},
  walk:{aF:[28,40],aB:[-28,-20],lF:[22,8],lB:[-20,-10],hip:25},
  run:{aF:[55,135],aB:[-55,5],lF:[55,0],lB:[-35,-95],lean:12,hip:21},
  kick:{aF:[80,100],aB:[-75,-95],lF:[80,95],lB:[-4,0],lean:-10},
  jump:{aF:[165,175],aB:[155,170],lF:[55,-25],lB:[35,-40],lift:22,hip:22},
  spike:{aF:[168,172],aB:[-40,-20],lF:[40,-20],lB:[20,-40],lift:26,hip:22},
  leap:{aF:[150,165],aB:[-60,-40],lF:[85,85],lB:[-60,-115],lift:24,hip:22,lean:8},
  cheer:{aF:[150,165],aB:[-150,-165],lF:[4,0],lB:[-4,0]},
  catch:{aF:[115,135],aB:[105,125],lF:[12,0],lB:[-12,0],lean:4},
  throw:{aF:[172,176],aB:[-30,-10],lF:[18,6],lB:[-15,-8],lean:-5},
  bounce:{aF:[45,15],aB:[-25,-15],lF:[18,5],lB:[-18,-8],lean:12,hip:25},
  hit:{aF:[80,95],aB:[92,100],lF:[18,0],lB:[-18,0],lean:5},
  swing:{aF:[95,110],aB:[-40,-30],lF:[22,5],lB:[-18,-6],lean:8},
  teach:{aF:[100,105],aB:[-10,-5],lF:[4,0],lB:[-4,0]},
  crawl:{aF:[3,0],aB:[-5,0],lF:[0,-75],lB:[-6,-80],lean:80,hip:22}
};
const HOLD={bat:92,racquet:120,megaphone:150};
function person(o){
  const f=o.facing||1,s=o.s||1,P=POSES[o.pose||'stand'];
  const rad=d=>d*Math.PI/180, r1=v=>Math.round(v*10)/10;
  const seg=(p,a,L)=>({x:r1(p.x+Math.sin(rad(a))*L*f),y:r1(p.y+Math.cos(rad(a))*L)});
  const lift=P.lift||0,lean=P.lean||0;
  const hip={x:0,y:-(P.hip||26)-lift};
  const along=L=>({x:r1(hip.x+Math.sin(rad(lean))*L*f),y:r1(hip.y-Math.cos(rad(lean))*L)});
  const sh=along(20),hd=along(32),mid=along(10);
  const skin=o.skin||SK[0],shirt=o.shirt||C.blue,pants=o.pants||'#26314F',hair=o.hair||HR[0];
  const pts=[hip,sh,{x:hd.x-10,y:hd.y-11},{x:hd.x+10,y:hd.y+10}];
  const limb=(p,a,c1,c2,w,end,er)=>{const k=seg(p,a[0],13),e=seg(k,a[1],13);pts.push(k,e);
    return {svg:`<path d="M${p.x} ${p.y}L${k.x} ${k.y}" stroke="${c1}" stroke-width="${w}" stroke-linecap="round"/><path d="M${k.x} ${k.y}L${e.x} ${e.y}" stroke="${c2}" stroke-width="${w-1.2}" stroke-linecap="round"/><circle cx="${e.x}" cy="${e.y}" r="${er}" fill="${end}"/>`,e}};
  const sa={x:sh.x,y:sh.y+2};
  const glove=o.gloves||skin;
  const lB=limb(hip,P.lB,shade(pants,-.2),shade(skin,-.12),6.5,'#1E1E1E',3.6);
  const aB=limb(sa,P.aB,shade(shirt,-.2),shade(skin,-.12),5.2,shade(glove,-.12),3);
  const lF=limb(hip,P.lF,pants,skin,6.5,'#2A2A2A',3.6);
  const aF=limb(sa,P.aF,shirt,skin,5.2,glove,3);
  let g='';
  if(o.long&&!o.cap) g+=`<circle cx="${r1(hd.x-f*9)}" cy="${hd.y+1}" r="4.8" fill="${hair}"/>`;
  g+=lB.svg+aB.svg;
  g+=`<path d="M${hip.x} ${hip.y}L${sh.x} ${sh.y}" stroke="${shirt}" stroke-width="15" stroke-linecap="round"/><circle cx="${hip.x}" cy="${hip.y+1}" r="7.6" fill="${pants}"/>`;
  if(o.num!=null) g+=`<text x="${mid.x}" y="${mid.y+3}" font-size="8" text-anchor="middle" fill="#fff" font-weight="700" font-family="Lexend,sans-serif">${o.num}</text>`;
  if(o.whistle) g+=`<path d="M${sh.x-4} ${sh.y+1}Q${sh.x} ${sh.y+11} ${sh.x+4} ${sh.y+1}" stroke="#F4F4F4" stroke-width="1" fill="none"/><rect x="${sh.x-2.5}" y="${sh.y+8}" width="6" height="3.6" rx="1.6" fill="#D5DAE3" stroke="#5B6474" stroke-width=".7"/>`;
  g+=lF.svg;
  g+=`<circle cx="${hd.x}" cy="${hd.y}" r="9.5" fill="${skin}"/>`;
  if(o.cap) g+=`<path d="M${hd.x-10} ${hd.y-1.5}A10 10 0 0 1 ${hd.x+10} ${hd.y-1.5}Z" fill="${o.cap}"/><path d="M${r1(hd.x+f*4)} ${hd.y-2}L${r1(hd.x+f*15)} ${hd.y-1}" stroke="${o.cap}" stroke-width="3" stroke-linecap="round"/>`;
  else g+=`<path d="M${hd.x-9.7} ${hd.y-.5}A9.7 9.7 0 0 1 ${hd.x+9.7} ${hd.y-.5}Q${r1(hd.x+f*3)} ${hd.y-5.5} ${hd.x-9.7} ${hd.y-.5}Z" fill="${hair}"/>`;
  const ex=r1(hd.x+f*2.2);
  g+=`<circle cx="${r1(ex-2.6)}" cy="${hd.y+1.2}" r="1.3" fill="#1d1d1d"/><circle cx="${r1(ex+2.6)}" cy="${hd.y+1.2}" r="1.3" fill="#1d1d1d"/><circle cx="${r1(ex+f*5)}" cy="${hd.y+4.2}" r="1.8" fill="#F28C8C" opacity=".55"/><path d="M${r1(ex-2)} ${hd.y+4.6}Q${ex} ${hd.y+6.8} ${r1(ex+2)} ${hd.y+4.6}" stroke="#1d1d1d" stroke-width="1" fill="none" stroke-linecap="round"/>`;
  g+=aF.svg;
  if(o.holds){
    const a=rad(o.holdAng??HOLD[o.holds]),e=aF.e,dx=Math.sin(a)*f,dy=Math.cos(a),deg=Math.atan2(dy,dx)*180/Math.PI;
    const at=L=>({x:r1(e.x+dx*L),y:r1(e.y+dy*L)});
    if(o.holds==='bat'){const p1=at(12),p2=at(38);pts.push(p2);g+=`<path d="M${e.x} ${e.y}L${p2.x} ${p2.y}" stroke="#B9783C" stroke-width="3" stroke-linecap="round"/><path d="M${p1.x} ${p1.y}L${p2.x} ${p2.y}" stroke="#C98A4C" stroke-width="6" stroke-linecap="round"/>`}
    if(o.holds==='racquet'){const p1=at(11),hc=at(21);pts.push(at(31));g+=`<path d="M${e.x} ${e.y}L${p1.x} ${p1.y}" stroke="#2B2B2B" stroke-width="3" stroke-linecap="round"/><g transform="translate(${hc.x} ${hc.y}) rotate(${r1(deg)})"><ellipse rx="10" ry="7" fill="rgba(255,255,255,.35)" stroke="#D2362E" stroke-width="2.4"/><path d="M-6 -4.5V4.5M-2 -6.5V6.5M2 -6.5V6.5M6 -4.5V4.5M-9 -2H9M-9 2H9" stroke="#fff" stroke-width=".7"/></g>`}
    if(o.holds==='megaphone'){pts.push(at(18));g+=`<g transform="translate(${e.x} ${e.y}) rotate(${r1(deg)})"><path d="M0 -3L17 -8L17 8L0 3Z" fill="#F2B92E" stroke="#B37F10" stroke-width="1"/><rect x="-3" y="-3" width="4" height="6" rx="1" fill="#555"/></g>`}
  }
  const xs=pts.map(p=>p.x),ys=pts.map(p=>p.y);
  return {svg:`<g transform="translate(${o.x} ${o.y}) scale(${s})">${g}</g>`,
    box:{x0:o.x+Math.min(...xs)*s,x1:o.x+Math.max(...xs)*s,y0:o.y+Math.min(...ys)*s,y1:o.y+Math.max(...ys,0)*s}};
}
