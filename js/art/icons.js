/* 100x100 icons for vocabulary cards and stickers */
const ICONS={
  goal:()=>goalSVG(50,80,76,48),
  bat:()=>`<g transform="rotate(-40 50 50)"><rect x="46" y="14" width="9" height="56" rx="4.5" fill="#C98A4C"/><rect x="47.5" y="62" width="6" height="22" rx="3" fill="#8E5A2C"/><circle cx="50.5" cy="86" r="5" fill="#8E5A2C"/></g>`,
  bar:()=>barSVG(50,84,66,44),
  whistle:()=>`<path d="M30 40Q20 20 50 18" stroke="#E2453C" stroke-width="3" fill="none"/><circle cx="44" cy="58" r="20" fill="#D5DAE3" stroke="#5B6474" stroke-width="3"/><rect x="52" y="38" width="34" height="16" rx="4" fill="#D5DAE3" stroke="#5B6474" stroke-width="3"/><circle cx="44" cy="58" r="6" fill="#5B6474"/>`,
  megaphone:()=>`<path d="M22 42L76 20V80L22 58Z" fill="#F2B92E" stroke="#B37F10" stroke-width="3" stroke-linejoin="round"/><rect x="12" y="40" width="12" height="20" rx="3" fill="#555"/><path d="M40 62L44 80" stroke="#555" stroke-width="6" stroke-linecap="round"/><path d="M84 38q8 12 0 24" stroke="#14306E" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  hoop:()=>`<rect x="18" y="12" width="64" height="44" rx="4" fill="#fff" stroke="#3F4757" stroke-width="3"/><rect x="38" y="28" width="24" height="18" fill="none" stroke="#E8562A" stroke-width="2.5"/><path d="M36 58L41 84M44 58L46 84M56 58L54 84M64 58L59 84M38 70H62" stroke="#888" stroke-width="2"/><ellipse cx="50" cy="56" rx="16" ry="4" fill="none" stroke="#E8562A" stroke-width="4"/>`,
  ball:()=>ball('soccer',50,52,30),
  basketball:()=>ball('basketball',50,52,30),
  volleyball:()=>ball('volleyball',50,52,30),
  baseball:()=>ball('baseball',50,52,28),
  tennis:()=>ball('tennis',50,52,26),
  hurdles:()=>hurdleSVG(50,84,62,40),
  team:()=>person({x:28,y:92,s:.95,shirt:C.blue,num:2,skin:SK[1],hair:HR[2]}).svg+person({x:72,y:92,s:.95,shirt:C.blue,num:5,skin:SK[3],hair:HR[0],long:true}).svg+person({x:50,y:96,s:1.05,shirt:C.blue,num:9,skin:SK[0],hair:HR[1]}).svg,
  net:()=>{let s=`<path d="M10 90V22M90 90V22" stroke="#5E6676" stroke-width="4"/><rect x="10" y="26" width="80" height="34" fill="#fff" fill-opacity=".4"/>`;for(let x=16;x<90;x+=6)s+=`<path d="M${x} 26V60" stroke="#2B2B2B" stroke-width="1"/>`;for(let y=32;y<60;y+=6)s+=`<path d="M10 ${y}H90" stroke="#2B2B2B" stroke-width="1"/>`;return s+`<path d="M10 26H90" stroke="#fff" stroke-width="5"/><path d="M10 26H90" stroke="#C6CFDD" stroke-width="1"/>`},
  racquet:()=>`<g transform="rotate(30 50 50)"><rect x="46" y="58" width="8" height="34" rx="4" fill="#2B2B2B"/><ellipse cx="50" cy="34" rx="22" ry="27" fill="#fff" fill-opacity=".5" stroke="#D2362E" stroke-width="5"/><path d="M38 12V56M46 8V60M54 8V60M62 12V56M30 22H70M28 30H72M28 38H72M30 46H70" stroke="#999" stroke-width="1.2"/></g>`,
  cones:()=>coneSVG(32,84,1.7)+coneSVG(70,84,1.4),
  chair:()=>chairSVG(54,90,1.95,'#2F6FE0'),
  rope:()=>`<path d="M16 26Q8 70 34 78Q50 84 50 64Q50 44 66 50Q92 60 84 26" stroke="#C98B3A" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="10" y="10" width="12" height="20" rx="4" fill="#E2453C"/><rect x="78" y="10" width="12" height="20" rx="4" fill="#E2453C"/>`,
  stick:()=>`<g transform="rotate(-35 50 50)">${stickSVG(10,90,50)}</g>`,
  trophy:()=>`<path d="M30 16H70V40Q70 62 50 64Q30 62 30 40Z" fill="#F2B92E" stroke="#B37F10" stroke-width="3"/><path d="M30 24H16Q16 46 32 46M70 24H84Q84 46 68 46" stroke="#B37F10" stroke-width="4" fill="none"/><rect x="45" y="62" width="10" height="14" fill="#B37F10"/><rect x="30" y="76" width="40" height="12" rx="3" fill="#14306E"/>`
};
const icon=(k,lbl)=>`<svg viewBox="0 0 100 100" role="img" aria-label="${esc(lbl||'picture')}" fill="none">${ICONS[k]()}</svg>`;
const STICKERS=[['ball','ball'],['basketball','basketball'],['whistle','whistle'],['hoop','hoop'],['volleyball','volleyball'],['megaphone','megaphone'],['goal','goal'],['baseball','baseball'],['bat','bat'],['tennis','tennis'],['racquet','racquet'],['net','net'],['hurdles','hurdles'],['cones','cones'],['rope','rope'],['trophy','champion']];
