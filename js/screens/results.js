/* End of lesson: "Lesson complete!" stats, then streak and new sticker screens, or "out of hearts" */
const xpFor=(level,perfect)=>10+(level-1)*5+(perfect?5:0);

function lessonComplete(){
  const {sc,level}=L,perfect=L.firstTry>=L.total;
  const acc=Math.round(100*L.firstTry/Math.max(1,L.total)),secs=Math.round((Date.now()-L.start)/1000);
  const xp=xpFor(level,perfect),before=stickersOwned();
  completeLevel(sc,level);PR.xp+=xp;const newDay=bumpStreak();save();
  const fresh=STICKERS.slice(before,stickersOwned());
  L=null;
  const steps=[next=>finishScreen(xp,acc,secs,perfect,next)];
  if(newDay)steps.push(streakScreen);
  fresh.forEach(s=>steps.push(next=>stickerScreen(s,next)));
  const run=()=>{const f=steps.shift();if(!f)return renderHome();f(run)};
  run();
}

function bigScreen(html,btn,onNext){
  screen.innerHTML=`<div class="big">${html}</div><footer class="lfoot"><div class="lfoot-in"><span></span><button class="btn ${btn[1]}" id="nextBtn">${btn[0]}</button></div></footer>`;
  $('#nextBtn').onclick=()=>{hush();SFX.tap();onNext()};$('#nextBtn').focus({preventScroll:true});window.scrollTo(0,0);
}

function finishScreen(xp,acc,secs,perfect,next){
  const time=`${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')}`;
  const card=(cls,label,val)=>`<div class="scard ${cls}"><small>${label}</small><b>${val}</b></div>`;
  bigScreen(`<div class="big-emo bounce">${E(perfect?'🏆':'⭐')}</div><h1 class="t-gold">${perfect?'Perfect lesson!':'Lesson complete!'}</h1>
    <div class="scards">${card('xp','TOTAL XP','⚡ '+xp)}${card('acc',acc>=90?'AMAZING':'GOOD','🎯 '+acc+'%')}${card('time','TIME','⏱ '+time)}</div>`,['CONTINUE','green'],next);
  SFX.win();say(perfect?'Perfect lesson!':'Lesson complete!');burst(perfect?160:90);
}

function streakScreen(next){
  const n=PR.streak.n;
  bigScreen(`<div class="big-emo fire bounce">${E('🔥')}</div><h1 class="streak-n">${n}</h1><h2 class="t-orange">day streak!</h2><p class="hint">Practice every day to keep it going!</p>`,['CONTINUE','orange'],next);
  SFX.combo();say(`${n} day streak!`);
}

function stickerScreen([k,w],next){
  bigScreen(`<h2>New sticker!</h2><div class="sticker got flip" style="--r:-3deg;width:180px;margin:0 auto">${icon(k,w)}<b>${w}</b></div><button class="btn ghost" id="sayW">${E('🔊')} ${w}</button>`,['CONTINUE','green'],next);
  $('#sayW').onclick=()=>say(w);
  SFX.sticker();setTimeout(()=>say('New sticker! '+w),600);burst(60);
}

function renderOutOfHearts(){
  const {si,level}=L;L=null;
  screen.innerHTML=`<div class="big"><div class="big-emo">${E('💔')}</div><h1>No more hearts!</h1><p class="hint">Let's try again. You can do it!</p></div>
    <footer class="lfoot"><div class="lfoot-in"><button class="btn ghost" id="quitB">QUIT</button><button class="btn green" id="retryB">TRY AGAIN</button></div></footer>`;
  $('#retryB').onclick=()=>startLesson(si,level);$('#quitB').onclick=renderHome;
  say('No more hearts! Try again.');
}
