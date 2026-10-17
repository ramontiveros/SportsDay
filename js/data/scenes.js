/* The 8 places (units). Each actor = one person/group doing a table verb; items = vocabulary shown in the scene. */
const SCENES=[
{id:'field',name:'The Field',sports:['soccer'],items:['goal','ball','megaphone','team','whistle'],
 bg(){return skyBand(78)+grassFill(78)+`<path d="M0 112H480M480 140H372V266H480" stroke="#fff" stroke-width="2.5" fill="none" opacity=".85"/>`+goalSVG(434,238,82,56)+bleacherSVG(10,24,210,3,6,true,1)},
 actors:[
  {id:'kick',role:'soccer player',aux:'is',verb:'kicking',obj:'ball',prep:'into',target:'goal',where:'on the field',
   figs:[{x:282,y:252,s:1.15,pose:'kick',shirt:C.blue,num:9,skin:SK[1],hair:HR[1]}]},
  {id:'gk',role:'goalkeeper',aux:'is',verb:'jumping',alt:['catching'],where:'on the field',
   figs:[{x:432,y:258,s:.95,pose:'jump',facing:-1,shirt:C.green,gloves:'#F2B92E',skin:SK[0],hair:HR[0]}]},
  {id:'coach',role:'coach',aux:'is',verb:'walking',prep:'on',target:'field',where:'on the field',
   figs:[{x:66,y:274,s:1.1,pose:'walk',shirt:C.navy,cap:'#F26A1B',whistle:true,skin:SK[2]}]},
  {id:'team',role:'team',aux:'is',verb:'running',prep:'across',target:'field',where:'on the field',
   figs:[{x:150,y:252,s:.82,pose:'run',shirt:C.blue,num:4,skin:SK[0],hair:HR[2]},{x:198,y:266,s:.85,pose:'run',shirt:C.blue,num:7,skin:SK[3],hair:HR[0],long:true}]},
  {id:'fans',role:'fans',plural:true,aux:'are',verb:'cheering',prep:'on',target:'bleacher',where:'on the bleacher',ring:{cx:115,cy:58,rx:112,ry:44}}],
 extras(){return ball('soccer',336,234,9,true)},
 labels:[['goal',398,174],['ball',336,220],['bleacher',115,112],['field',300,140]]},

{id:'court',name:'The Basketball Court',sports:['basketball'],items:['hoop','ball','megaphone','whistle','team'],
 bg(){let s=`<rect width="480" height="104" fill="#2C4A80"/><rect y="96" width="480" height="8" fill="#1E3866"/><rect y="104" width="480" height="196" fill="#E9B776"/>`;
  for(let y=118;y<300;y+=16)s+=`<path d="M0 ${y}H480" stroke="#D29E5F" stroke-width="1"/>`;
  s+=`<path d="M318 150H480V292H292Z" fill="#E4572E" fill-opacity=".35" stroke="#fff" stroke-width="2.5"/><ellipse cx="0" cy="220" rx="70" ry="42" fill="none" stroke="#fff" stroke-width="2.5"/>`;
  return s+bleacherSVG(10,14,220,3,6,true,4)+hoopSVG(452,262,145,-1)},
 actors:[
  {id:'bounce',role:'basketball player',aux:'is',verb:'bouncing',obj:'basketball',prep:'on',target:'court',where:'on the court',
   figs:[{x:188,y:264,s:1.15,pose:'bounce',shirt:C.red,num:6,skin:SK[2],hair:HR[2]}]},
  {id:'throw',role:'player',aux:'is',verb:'throwing',alt:['scoring'],obj:'ball',prep:'into',target:'hoop',where:'on the court',
   figs:[{x:332,y:258,s:1.1,pose:'throw',shirt:C.blue,num:10,skin:SK[0],hair:HR[3],long:true}]},
  {id:'coach',role:'coach',aux:'is',verb:'teaching',obj:'team',where:'on the court',
   figs:[{x:58,y:276,s:1.05,pose:'teach',shirt:C.navy,cap:'#F26A1B',whistle:true,skin:SK[1]}],
   extra:[{x:110,y:272,s:.8,pose:'stand',facing:-1,shirt:C.green,skin:SK[3],hair:HR[2]},{x:138,y:278,s:.8,pose:'stand',facing:-1,shirt:C.purple,skin:SK[0],hair:HR[1],long:true}]},
  {id:'fans',role:'fans',plural:true,aux:'are',verb:'cheering',prep:'on',target:'bleacher',where:'on the bleacher',ring:{cx:120,cy:50,rx:115,ry:42}}],
 extras(){return ball('basketball',222,250,9.5)+`<path d="M336 176Q384 84 424 132" stroke="#fff" stroke-width="2" stroke-dasharray="4 5" fill="none"/>`+ball('basketball',378,112,9)},
 labels:[['hoop',426,96],['ball',254,234],['court',270,140],['team',124,296]]},

{id:'sand',name:'Volleyball on the Sand',sports:['volleyball'],items:['net','ball','whistle'],
 bg(){let s=`<rect width="480" height="130" fill="#BFE2F6"/><ellipse cx="380" cy="40" rx="22" ry="22" fill="#FFD54A"/><rect y="112" width="480" height="40" fill="#4FB3D9"/><path d="M0 124q20 -6 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/><rect y="148" width="480" height="152" fill="#EFD9A2"/>`;
  for(let i=0;i<70;i++)s+=`<circle cx="${(i*67)%480}" cy="${155+(i*37)%140}" r="1.3" fill="#D3B877"/>`;
  return s+netSide(236,256,118,44)},
 actors:[
  {id:'hit',role:'volleyball player',aux:'is',verb:'hitting',obj:'volleyball',prep:'over',target:'net',where:'on the sand',lbl:[150,292],
   figs:[{x:204,y:240,s:1.1,pose:'spike',shirt:C.yellow,num:3,skin:SK[1],hair:HR[1],long:true}]},
  {id:'jump',role:'volleyball player',aux:'is',verb:'jumping',prep:'on',target:'sand',where:'on the sand',lbl:[360,292],
   figs:[{x:310,y:244,s:1.05,pose:'jump',facing:-1,shirt:C.teal,num:8,skin:SK[3],hair:HR[2]}]},
  {id:'teacher',role:'teacher',aux:'is',verb:'walking',prep:'across',target:'sand',where:'on the sand',
   figs:[{x:80,y:276,s:1.05,pose:'walk',shirt:C.purple,whistle:true,skin:SK[0],hair:HR[3],long:true}]}],
 extras(){return ball('volleyball',236,104,9)},
 labels:[['net',246,184],['ball',236,88],['sand',400,200]]},

{id:'track',name:'The Track',sports:[],items:['hurdles','megaphone','whistle'],
 bg(){return skyBand(56)+grassFill(56)+`<ellipse cx="240" cy="50" rx="360" ry="232" fill="#D9653B"/><ellipse cx="240" cy="50" rx="312" ry="186" fill="none" stroke="#fff" stroke-width="1.6"/><ellipse cx="240" cy="50" rx="336" ry="209" fill="none" stroke="#fff" stroke-width="1.6"/><ellipse cx="240" cy="50" rx="288" ry="164" fill="#5FBF4F" stroke="#fff" stroke-width="2"/>`+hurdleSVG(320,270,46,28)},
 actors:[
  {id:'runners',role:'runner',plural:true,aux:'are',verb:'running',prep:'around',target:'track',where:'on the track',
   figs:[{x:110,y:250,s:.95,pose:'run',shirt:C.orange,num:2,skin:SK[2],hair:HR[0]},{x:168,y:264,s:.95,pose:'run',shirt:C.purple,num:5,skin:SK[0],hair:HR[3],long:true}]},
  {id:'hurdle',role:'athlete',aux:'is',verb:'jumping',prep:'over',target:'hurdles',where:'on the track',
   figs:[{x:314,y:272,s:1,pose:'leap',shirt:C.blue,num:11,skin:SK[1],hair:HR[2]}]},
  {id:'coach',role:'coach',aux:'is',verb:'cheering',where:'on the track',
   figs:[{x:420,y:240,s:1,pose:'cheer',facing:-1,shirt:C.navy,cap:'#F26A1B',whistle:true,holds:'megaphone',skin:SK[3]}]}],
 labels:[['hurdles',378,262],['track',240,292],['megaphone',395,150]]},

{id:'diamond',name:'The Baseball Diamond',sports:['baseball'],items:['bat','ball','megaphone'],
 bg(){return skyBand(70)+grassFill(70)+`<path d="M150 284L372 238L300 150L74 178Z" fill="#C98B55"/><circle cx="226" cy="208" r="13" fill="#B47640"/>`+
   [[150,276],[358,236],[298,158],[86,180]].map(([x,y])=>`<rect x="${x-6}" y="${y-6}" width="12" height="12" transform="rotate(45 ${x} ${y})" fill="#fff"/>`).join('')+bleacherSVG(300,8,172,3,5,true,6)},
 actors:[
  {id:'hit',role:'player',aux:'is',verb:'hitting',obj:'ball',where:'on the diamond',
   figs:[{x:136,y:270,s:1.1,pose:'hit',shirt:C.blue,cap:'#14306E',holds:'bat',skin:SK[1]}]},
  {id:'catch',role:'player',aux:'is',verb:'catching',obj:'ball',where:'on the diamond',
   figs:[{x:340,y:218,s:.95,pose:'catch',facing:-1,shirt:C.red,cap:'#E2453C',gloves:'#8B5A2B',skin:SK[3]}]},
  {id:'run',role:'player',aux:'is',verb:'running',prep:'across',target:'diamond',where:'on the diamond',
   figs:[{x:246,y:262,s:.95,pose:'run',shirt:C.blue,num:3,cap:'#14306E',skin:SK[0]}]},
  {id:'fans',role:'fans',plural:true,aux:'are',verb:'cheering',prep:'on',target:'bleacher',where:'on the bleacher',ring:{cx:386,cy:44,rx:94,ry:40}}],
 extras(){return ball('baseball',204,226,6,true)},
 labels:[['bat',200,246],['ball',212,206],['diamond',226,186]]},

{id:'circuit',name:'The Circuit',sports:[],items:['hoop','rope','cones','chair','stick','whistle'],
 bg(){return skyBand(70)+grassFill(70)+`<path d="M424 172V106" stroke="#5E6676" stroke-width="4"/><rect x="380" y="84" width="88" height="28" rx="5" fill="#14306E"/><text x="424" y="104" text-anchor="middle" font-family="Lilita One,Arial Rounded MT Bold,sans-serif" font-size="17" fill="#fff">CIRCUIT</text>`+
   chairSVG(218,176,1)+chairSVG(312,176,1,'#2F6FE0')+stickSVG(212,318,154)+ringSVG(178,272,26,'#E85A9A')+ropeSVG(232,312,256)+coneSVG(352,276)+coneSVG(420,280)+coneSVG(456,272)},
 actors:[
  {id:'crawl',role:'athlete',aux:'is',verb:'crawling',prep:'through',target:'hoop',where:'on the circuit',
   figs:[{x:112,y:272,s:1.1,pose:'crawl',shirt:C.green,num:1,skin:SK[2],hair:HR[0]}]},
  {id:'rope',role:'player',aux:'is',verb:'jumping',prep:'over',target:'rope',where:'on the circuit',
   figs:[{x:272,y:240,s:1,pose:'jump',shirt:C.red,skin:SK[0],hair:HR[1],long:true}]},
  {id:'teacher',role:'teacher',aux:'is',verb:'walking',prep:'around',target:'cones',where:'on the circuit',
   figs:[{x:392,y:276,s:1.05,pose:'walk',facing:-1,shirt:C.orange,whistle:true,skin:SK[1],hair:HR[2],long:true}]}],
 labels:[['hoop',178,212],['rope',300,282],['cones',440,250],['chair',218,192],['stick',266,144],['circuit',424,76]]},

{id:'tennis',name:'The Tennis Court',sports:['tennis'],items:['racquet','net','ball','megaphone'],
 bg(){return `<rect width="480" height="300" fill="#3C8C5B"/>`+bleacherSVG(10,6,190,3,5,true,2)+`<path d="M20 292H460L428 120H52Z" fill="#4CAF6A" stroke="#fff" stroke-width="2.5"/><path d="M118 292L132 120M362 292L348 120M240 292V120" stroke="#fff" stroke-width="2"/>`+netSide(232,268,218,32)},
 actors:[
  {id:'hit',role:'player',aux:'is',verb:'hitting',obj:'ball',prep:'over',target:'net',where:'on the court',
   figs:[{x:150,y:264,s:1.1,pose:'swing',shirt:C.yellow,holds:'racquet',skin:SK[1],hair:HR[1],long:true}]},
  {id:'run',role:'athlete',aux:'is',verb:'running',prep:'across',target:'court',where:'on the court',
   figs:[{x:364,y:270,s:1.05,pose:'run',facing:-1,shirt:C.blue,holds:'racquet',holdAng:60,skin:SK[3],hair:HR[2]}]},
  {id:'fans',role:'fans',plural:true,aux:'are',verb:'cheering',prep:'on',target:'bleacher',where:'on the bleacher',ring:{cx:105,cy:48,rx:100,ry:42}}],
 extras(){return ball('tennis',214,196,6,true)},
 labels:[['net',242,288],['racquet',196,236],['ball',214,182],['court',300,150]]},

{id:'sportsday',name:'Sports Day',sports:['soccer','basketball','baseball'],items:['goal','hoop','bat','ball','megaphone'],
 bg(){let s=`<rect width="480" height="84" fill="#BFE2F6"/><rect x="8" y="16" width="122" height="34" rx="6" fill="#fff" stroke="#14306E" stroke-width="2"/><text x="69" y="40" text-anchor="middle" font-family="Lilita One,Arial Rounded MT Bold,sans-serif" font-size="18" fill="#14306E">GO TEAM!</text>`;
  s+=`<rect y="80" width="240" height="128" fill="#5FBF4F"/><path d="M0 92H240" stroke="#fff" stroke-width="2"/>`+goalSVG(40,200,52,38);
  s+=`<rect x="240" y="80" width="240" height="128" fill="#E9B776"/>`;for(let y=96;y<208;y+=16)s+=`<path d="M240 ${y}H480" stroke="#D29E5F"/>`;s+=hoopSVG(462,200,100,-1);
  s+=`<rect y="208" width="150" height="92" fill="#5FBF4F"/><path d="M70 296L130 268L96 230L26 250Z" fill="#C98B55"/>`;
  s+=`<rect x="150" y="208" width="330" height="92" fill="#D9653B"/><path d="M150 238H480M150 268H480" stroke="#fff" stroke-width="1.6"/>`;
  return s+bleacherSVG(146,4,190,3,6,true,3)},
 actors:[
  {id:'kick',role:'soccer player',aux:'is',verb:'kicking',obj:'ball',prep:'into',target:'goal',where:'on the field',
   figs:[{x:122,y:200,s:.8,pose:'kick',facing:-1,shirt:C.green,num:7,skin:SK[1],hair:HR[0]}]},
  {id:'bounce',role:'basketball player',aux:'is',verb:'bouncing',obj:'basketball',where:'on the court',
   figs:[{x:356,y:200,s:.8,pose:'bounce',shirt:C.red,num:8,skin:SK[3],hair:HR[2],long:true}]},
  {id:'bat',role:'player',aux:'is',verb:'hitting',obj:'ball',where:'on the diamond',
   figs:[{x:60,y:288,s:.74,pose:'hit',shirt:C.blue,cap:'#14306E',holds:'bat',skin:SK[0]}]},
  {id:'run',role:'runner',aux:'is',verb:'running',prep:'on',target:'track',where:'on the track',
   figs:[{x:300,y:288,s:.82,pose:'run',shirt:C.orange,num:4,skin:SK[2],hair:HR[1]}]},
  {id:'fans',role:'fans',plural:true,aux:'are',verb:'cheering',prep:'on',target:'bleacher',where:'on the bleacher',ring:{cx:241,cy:42,rx:100,ry:40}}],
 extras(){return ball('soccer',90,190,6,true)+ball('basketball',372,192,6.5)+ball('baseball',104,262,4.5,true)},
 labels:[['field',190,104],['court',300,104],['diamond',128,246],['track',436,250],['goal',40,152],['hoop',438,94]]}
];

function ringFor(a){
  if(a.ring) return a.ring;
  const boxes=a.figs.map(f=>person(f).box);
  const x0=Math.min(...boxes.map(b=>b.x0)),x1=Math.max(...boxes.map(b=>b.x1)),y0=Math.min(...boxes.map(b=>b.y0)),y1=Math.max(...boxes.map(b=>b.y1));
  return {cx:(x0+x1)/2,cy:(y0+y1)/2,rx:(x1-x0)/2+14,ry:(y1-y0)/2+12};
}
function labelPill(t,x,y){const w=t.length*7.6+14;x=Math.max(w/2+2,Math.min(478-w/2,x));y=Math.max(12,Math.min(290,y));
  return `<g><rect x="${x-w/2}" y="${y-10}" width="${w}" height="19" rx="9.5" fill="#fff" stroke="#14306E" stroke-width="1.4"/><text x="${x}" y="${y+4}" text-anchor="middle" font-family="Lexend,sans-serif" font-size="12" font-weight="700" fill="#14306E">${t}</text></g>`}
function sceneSVG(sc,opt={}){
  let figs='';
  sc.actors.forEach(a=>{(a.figs||[]).forEach(f=>figs+=person(f).svg);(a.extra||[]).forEach(f=>figs+=person(f).svg)});
  let over='';
  if(opt.hl){const a=sc.actors.find(x=>x.id===opt.hl);if(a){const r=ringFor(a);over+=`<ellipse class="ring" cx="${r.cx}" cy="${r.cy}" rx="${r.rx}" ry="${r.ry}"/>`}}
  if(opt.labels){
    sc.actors.forEach(a=>{const r=ringFor(a);const L=a.lbl||[r.cx,r.cy+r.ry+4];over+=labelPill(a.plural?(a.role==='fans'?'fans':PLURAL[a.role]||a.role):a.role,L[0],L[1])});
    (sc.labels||[]).forEach(([t,x,y])=>over+=labelPill(t,x,y));
  }
  return `<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(sc.name)} picture" fill="none">${sc.bg()}${figs}${sc.extras?sc.extras():''}${over}</svg>`;
}
