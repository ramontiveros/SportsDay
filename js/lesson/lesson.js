/* Lesson runner: progress bar, hearts, CHECK / CONTINUE footer, wrong answers come back at the end */
const HEARTS=5;
let L=null,CTRL=null;

function startLesson(si,level){
  hideSheet();
  const sc=SCENES[si];
  let queue=buildLesson(sc,level);
  if(speakingOff())queue=queue.filter(e=>e.type!=='speak');
  L={si,sc,level,queue,total:queue.length,good:0,hearts:HEARTS,combo:0,firstTry:0,start:Date.now(),state:'answer'};
  SFX.tap();renderEx();
}

function lessonPic(ex){
  if(ex.icon)return `<div class="exicon">${icon(ex.icon,ex.type==='speak'?ex.icon:'what is this')}</div>`;
  if(ex.pic)return `<div class="lpic">${sceneSVG(L.sc,{hl:ex.actor})}</div>`;
  return '';
}

function renderEx(){
  const ex=L.queue[0];L.state='answer';
  const speakEx=ex.type==='speak';
  screen.innerHTML=`<div class="lesson">
    <header class="ltop">
      <button class="x" id="quitBtn" aria-label="Quit lesson">✕</button>
      <div class="lbar" role="progressbar" aria-valuemin="0" aria-valuemax="${L.total}" aria-valuenow="${L.good}"><i style="width:${Math.max(4,L.good/L.total*100)}%"></i></div>
      <div class="hearts" aria-label="${L.hearts} hearts">${E('❤️')}<b>${L.hearts}</b></div>
    </header>
    <section class="lbody">
      ${ex.mistake?'<p class="mistake">↺ PREVIOUS MISTAKE</p>':''}
      <div class="ltitle"><h1>${esc(ex.title)}</h1>${!speakEx?`<button class="spk-sm" id="sayTitle" aria-label="Listen">${E('🔊')}</button>`:''}</div>
      ${lessonPic(ex)}
      <div id="exBox"></div>
    </section>
    <footer class="lfoot" id="foot"><div class="lfoot-in" id="footIn"></div></footer>
  </div>`;
  $('#quitBtn').onclick=confirmQuit;
  const st=$('#sayTitle');if(st)st.onclick=()=>say(ex.title);
  CTRL=WIDGETS[ex.type]($('#exBox'),ex,{change:updateCheck,result:ok=>showResult(ok)});
  footAnswer(ex);
  if(!speakEx&&L.level<3)setTimeout(()=>{if(L&&L.queue[0]===ex&&L.state==='answer')say(ex.title)},300);
  window.scrollTo(0,0);
}

function footAnswer(ex){
  $('#foot').className='lfoot';
  $('#footIn').innerHTML=ex.type==='speak'
    ?`<button class="btn ghost" id="cantSpeak">Can't speak now</button><span></span>`
    :`<span></span><button class="btn green" id="checkBtn" disabled>CHECK</button>`;
  const cs=$('#cantSpeak');if(cs)cs.onclick=cantSpeak;
  const cb=$('#checkBtn');if(cb)cb.onclick=()=>{if(CTRL.ready())showResult(CTRL.check())};
}
function updateCheck(){const cb=$('#checkBtn');if(cb)cb.disabled=!CTRL.ready()}

function showResult(ok){
  if(L.state!=='answer')return;L.state='result';
  const ex=L.queue[0];CTRL.lock();
  if(ok){L.good++;L.combo++;if(!ex.mistake)L.firstTry++;(L.combo>=3?SFX.combo:SFX.good)();if(L.combo>=3)burst(40)}
  else{L.combo=0;SFX.bad();
    if(ex.type==='speak')L.good++; // speaking never costs hearts: recognition of kids' voices is not perfect
    else{L.hearts--;L.queue.push({...ex,mistake:true,bank:ex.bank&&shuffle(ex.bank),choices:ex.choices&&shuffle(ex.choices)})}}
  const bar=$('.lbar i');if(bar)bar.style.width=Math.max(4,L.good/L.total*100)+'%';
  const h=$('.hearts b');if(h)h.textContent=L.hearts;
  const head=ok?rnd(['Excellent!','Great job!','Awesome!','Nice!','Correct!']):ex.type==='speak'?'Good try!':'Correct solution:';
  $('#foot').className='lfoot '+(ok?'ok':'bad');
  $('#footIn').innerHTML=`<div class="fbmsg"><span class="fbicon">${ok?'✔':'✘'}</span><div>
      <h3>${head}${ok&&L.combo>=3?` <span class="combo">🔥 ${L.combo} in a row!</span>`:''}</h3>
      <p class="sol">${analyze(ex.solution).html}</p></div></div>
    <button class="btn ${ok?'green':'red'}" id="contBtn">CONTINUE</button>`;
  if(L.level<3||!ok)setTimeout(()=>{if(L&&L.state==='result')say(ex.solution)},500);
  $('#contBtn').onclick=next;$('#contBtn').focus({preventScroll:true});
}

function next(){
  hush();L.queue.shift();
  if(L.hearts<=0)return renderOutOfHearts();
  if(!L.queue.length)return lessonComplete();
  renderEx();
}

// like "can't listen/speak now": skip speaking for 15 minutes, without losing anything
function cantSpeak(){
  PR.speakOffUntil=Date.now()+15*60*1000;save();
  const removed=L.queue.filter(e=>e.type==='speak').length;
  L.queue=L.queue.filter(e=>e.type!=='speak');L.total=Math.max(1,L.total-removed);
  if(!L.queue.length)return lessonComplete();
  renderEx();
}

function confirmQuit(){
  showSheet(`<div class="quit"><div class="big-emo">${E('😢')}</div><h2>Wait, don't go!</h2><p>You will lose this lesson if you quit now.</p>
    <button class="btn blue wide" id="keepBtn">KEEP LEARNING</button><button class="btn plain wide" id="endBtn">END LESSON</button></div>`,
    {onMount:()=>{$('#keepBtn').onclick=hideSheet;$('#endBtn').onclick=()=>{hideSheet();stopListening();hush();L=null;renderHome()}}});
}

document.addEventListener('keydown',e=>{
  if(e.key!=='Enter'||!L||!$('.lesson')||!$('#sheet').hidden)return;
  const b=$('#contBtn')||$('#checkBtn');if(b&&!b.disabled){e.preventDefault();b.click()}
});
