/* Drawing: balls, goals, hoops, nets, cones, bleachers and other scenery (SVG) */
function ball(k,x,y,r,trail){
  let s='';
  if(trail) s+=`<path d="M${x-r-5} ${y-3}h-12M${x-r-3} ${y+3}h-17" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".85"/>`;
  if(k==='soccer'){let p='';for(let i=0;i<5;i++){const a=(-90+72*i)*Math.PI/180;p+=`${(x+Math.cos(a)*r*.42).toFixed(1)},${(y+Math.sin(a)*r*.42).toFixed(1)} `}
    s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#222" stroke-width="1.2"/><polygon points="${p}" fill="#222"/>`}
  if(k==='basketball') s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#E7782F" stroke="#7A3A12" stroke-width="1"/><path d="M${x-r} ${y}H${x+r}M${x} ${y-r}V${y+r}M${x-r*.72} ${y-r*.7}Q${x-r*.15} ${y} ${x-r*.72} ${y+r*.7}M${x+r*.72} ${y-r*.7}Q${x+r*.15} ${y} ${x+r*.72} ${y+r*.7}" stroke="#6B3010" stroke-width="${Math.max(.8,r/10)}" fill="none"/>`;
  if(k==='volleyball') s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#2C3E70" stroke-width="1.1"/><path d="M${x-r} ${y}Q${x} ${y-r*.35} ${x+r*.6} ${y-r*.8}" stroke="#2F6FE0" stroke-width="${r/5}" fill="none"/><path d="M${x-r*.4} ${y+r*.92}Q${x-r*.1} ${y} ${x+r*.96} ${y+r*.2}" stroke="#F2B92E" stroke-width="${r/5}" fill="none"/>`;
  if(k==='baseball') s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#8A8A8A" stroke-width="1"/><path d="M${x-r*.5} ${y-r*.82}Q${x-r*.12} ${y} ${x-r*.5} ${y+r*.82}M${x+r*.5} ${y-r*.82}Q${x+r*.12} ${y} ${x+r*.5} ${y+r*.82}" stroke="#D2362E" stroke-width="${Math.max(.9,r/7)}" stroke-dasharray="${r/4} ${r/6}" fill="none"/>`;
  if(k==='tennis') s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#D8EA3C" stroke="#93A21B" stroke-width="1"/><path d="M${x-r*.92} ${y-r*.35}Q${x} ${y+r*.1} ${x+r*.3} ${y+r*.95}" stroke="#fff" stroke-width="${Math.max(1,r/5)}" fill="none"/>`;
  return s;
}
function goalSVG(x,y,w,h){let s=`<rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" fill="#fff" fill-opacity=".15"/>`;
  for(let i=x-w/2+7;i<x+w/2-1;i+=7)s+=`<line x1="${i}" y1="${y-h}" x2="${i}" y2="${y}" stroke="#fff" stroke-opacity=".6" stroke-width=".9"/>`;
  for(let j=y-h+7;j<y-1;j+=7)s+=`<line x1="${x-w/2}" y1="${j}" x2="${x+w/2}" y2="${j}" stroke="#fff" stroke-opacity=".6" stroke-width=".9"/>`;
  return s+`<path d="M${x-w/2} ${y}V${y-h}H${x+w/2}V${y}" stroke="#fff" stroke-width="4.5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`}
function hoopSVG(x,y,h,f){const bx=x+f*12,rx=bx+f*14,ry=y-h+22;let s=`<rect x="${x-2.5}" y="${y-h}" width="5" height="${h}" fill="#7B8494"/><path d="M${x} ${y-h+12}H${bx}" stroke="#7B8494" stroke-width="4"/><rect x="${bx-3}" y="${y-h-12}" width="6" height="44" rx="1.5" fill="#fff" stroke="#3F4757" stroke-width="1.2"/>`;
  for(let k=-10;k<=10;k+=5)s+=`<path d="M${rx+k} ${ry}L${rx+k*.55} ${ry+17}" stroke="#fff" stroke-width="1.1"/>`;
  return s+`<path d="M${rx-7} ${ry+17}H${rx+7}M${rx-9} ${ry+8}H${rx+9}" stroke="#fff" stroke-width=".9"/><ellipse cx="${rx}" cy="${ry}" rx="12" ry="3.3" fill="none" stroke="#E8562A" stroke-width="2.8"/>`}
function netSide(x,y,top,h){let s=`<path d="M${x} ${top}V${y}M${x+18} ${top+8}V${y+6}" stroke="#5E6676" stroke-width="3"/><path d="M${x} ${top}L${x+18} ${top+8}L${x+18} ${top+8+h}L${x} ${top+h}Z" fill="#fff" fill-opacity=".25"/>`;
  for(let i=3;i<18;i+=3)s+=`<path d="M${x+i} ${top+i*.44}V${top+h+i*.44}" stroke="#2B2B2B" stroke-width=".6" opacity=".7"/>`;
  for(let j=4;j<h;j+=4)s+=`<path d="M${x} ${top+j}L${x+18} ${top+8+j}" stroke="#2B2B2B" stroke-width=".6" opacity=".7"/>`;
  return s+`<path d="M${x} ${top}L${x+18} ${top+8}" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>`}
function hurdleSVG(x,y,w,h){let s=`<path d="M${x-w/2} ${y}V${y-h}M${x+w/2} ${y}V${y-h}M${x-w/2-6} ${y}H${x-w/2+6}M${x+w/2-6} ${y}H${x+w/2+6}" stroke="#4A5160" stroke-width="2.5" stroke-linecap="round"/>`;
  const n=5,sw=(w+6)/n;for(let i=0;i<n;i++)s+=`<rect x="${x-w/2-3+i*sw}" y="${y-h-6}" width="${sw}" height="7" fill="${i%2?'#fff':'#E2453C'}"/>`;
  return s+`<rect x="${x-w/2-3}" y="${y-h-6}" width="${w+6}" height="7" fill="none" stroke="#4A5160" stroke-width="1"/>`}
function coneSVG(x,y,s=1){return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-9 0L0 -22L9 0Z" fill="#F47B20"/><path d="M-5.5 -8.5H5.5L3.9 -12.6H-3.9Z" fill="#fff"/><rect x="-11" y="-2.5" width="22" height="3.5" rx="1" fill="#D9601A"/></g>`}
function chairSVG(x,y,s=1,col='#2F6FE0'){return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-10 0V-14M10 0V-14M-10 -14V-36" stroke="${col}" stroke-width="3.2" stroke-linecap="round"/><rect x="-12.5" y="-17" width="25" height="4.5" rx="1.8" fill="${col}"/><rect x="-13" y="-38" width="6" height="14" rx="2" fill="${col}"/></g>`}
function stickSVG(x1,x2,y){return `<path d="M${x1} ${y}L${x2} ${y}" stroke="#D9A441" stroke-width="4.5" stroke-linecap="round"/><path d="M${x1+12} ${y}h8M${x1+36} ${y}h8M${x1+60} ${y}h8" stroke="#2F6FE0" stroke-width="4.5"/>`}
function ropeSVG(x1,x2,y){let d=`M${x1} ${y}`,n=6,w=(x2-x1)/n;for(let i=0;i<n;i++)d+=` q${w/2} ${i%2?5:-5} ${w} 0`;
  return `<path d="${d}" stroke="#C98B3A" stroke-width="3.2" fill="none" stroke-linecap="round"/><rect x="${x1-9}" y="${y-2.5}" width="9" height="5" rx="2" fill="#E2453C"/><rect x="${x2}" y="${y-2.5}" width="9" height="5" rx="2" fill="#E2453C"/>`}
function ringSVG(x,y,r,col){return `<ellipse cx="${x}" cy="${y-r}" rx="${r*.5}" ry="${r}" fill="none" stroke="${col}" stroke-width="5"/><rect x="${x-8}" y="${y-2}" width="16" height="4" rx="2" fill="#5E6676"/>`}
function barSVG(x,y,w,h){return `<path d="M${x-w/2} ${y}V${y-h-8}M${x+w/2} ${y}V${y-h-8}M${x-w/2-6} ${y}H${x-w/2+6}M${x+w/2-6} ${y}H${x+w/2+6}" stroke="#4A5160" stroke-width="2.6" stroke-linecap="round"/><path d="M${x-w/2} ${y-h}H${x+w/2}" stroke="#F2B92E" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="10 6"/>`}
function skyBand(h,col='#BFE2F6'){let s=`<rect width="480" height="${h}" fill="${col}"/><g fill="#fff" opacity=".9"><ellipse cx="80" cy="${h*.35}" rx="26" ry="8"/><ellipse cx="98" cy="${h*.3}" rx="16" ry="9"/><ellipse cx="350" cy="${h*.28}" rx="30" ry="8"/><ellipse cx="372" cy="${h*.22}" rx="15" ry="8"/></g>`;
  for(let x=-10;x<500;x+=34)s+=`<circle cx="${x}" cy="${h}" r="${14+(x*7)%9}" fill="#3F8F4A"/>`;return s}
function grassFill(y,a='#5FBF4F',b='#6BCB5A'){let s=`<rect y="${y}" width="480" height="${300-y}" fill="${a}"/>`;for(let x=0;x<480;x+=60)s+=`<rect x="${x}" y="${y}" width="30" height="${300-y}" fill="${b}"/>`;return s}
function fanList(n,seed){const shirts=[C.red,C.yellow,C.blue,C.purple,C.green,C.orange,C.teal,C.pink];return Array.from({length:n},(_,i)=>({shirt:shirts[(i+seed)%8],skin:SK[(i*3+seed)%4],hair:HR[(i+seed*2)%4],long:(i+seed)%3===0}))}
function bleacherSVG(x,y,w,rows,perRow,mega,seed=0){
  const rh=24;let s=`<path d="M${x+6} ${y+rows*rh}V${y+rows*rh+10}M${x+w-6} ${y+rows*rh}V${y+rows*rh+10}" stroke="#6B7586" stroke-width="3"/>`;
  for(let i=0;i<rows;i++){const by=y+i*rh;s+=`<rect x="${x}" y="${by}" width="${w}" height="${rh}" fill="${i%2?'#8E9BB2':'#9AA7BD'}"/>`;
    const fans=fanList(perRow,seed+i*3),gap=w/(perRow+.4);
    fans.forEach((f,j)=>{const isMega=mega&&i===rows-1&&j===1;s+=person({x:x+gap*(j+.7)+(i%2?gap*.35:0),y:by+rh-1,s:.5,pose:'cheer',...f,facing:j%2?-1:1,holds:isMega?'megaphone':null,holdAng:isMega?150:undefined}).svg});
    s+=`<rect x="${x}" y="${by+rh-7}" width="${w}" height="7" fill="#D5DCE7" stroke="#8792A6" stroke-width=".8"/>`}
  return s}
