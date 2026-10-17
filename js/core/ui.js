/* Shared UI pieces: bottom sheet, confetti, emoji span */
const screen=$('#screen');
const E=(c,lbl)=>`<span class="emo"${lbl?` role="img" aria-label="${lbl}"`:' aria-hidden="true"'}>${c}</span>`;

function showSheet(html,{cls='',onMount}={}){
  const s=$('#sheet');s.hidden=false;
  s.innerHTML=`<div class="sheet-card ${cls}" role="dialog" aria-modal="true">${html}</div>`;
  s.onclick=e=>{if(e.target===s)hideSheet()};
  onMount&&onMount(s.firstElementChild);
}
function hideSheet(){const s=$('#sheet');s.hidden=true;s.innerHTML=''}

function burst(n){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const cv=$('#confetti'),ctx=cv.getContext('2d');cv.hidden=false;cv.width=innerWidth;cv.height=innerHeight;
  const cols=['#58CC02','#FFC800','#1CB0F6','#FF4B4B','#CE82FF','#FF9600'];
  const ps=Array.from({length:n},()=>({x:innerWidth/2+(Math.random()-.5)*200,y:innerHeight*.35,vx:(Math.random()-.5)*14,vy:-Math.random()*13-4,r:Math.random()*360,c:rnd(cols),s:6+Math.random()*6}));
  let t=0;(function f(){ctx.clearRect(0,0,cv.width,cv.height);ps.forEach(p=>{p.vy+=.45;p.x+=p.vx;p.y+=p.vy;p.r+=8;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r*Math.PI/180);ctx.fillStyle=p.c;ctx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);ctx.restore()});
    if(++t<110)requestAnimationFrame(f);else{ctx.clearRect(0,0,cv.width,cv.height);cv.hidden=true}})();
}
