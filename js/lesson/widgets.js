/* One component per exercise type. mount(box, ex, api) draws it and returns a controller:
     ready()  -> true when CHECK can be pressed
     check()  -> true if the answer is right
     lock()   -> disable input after checking
   api.change() tells the lesson that ready() may have changed; api.result(ok) finishes the exercise directly (speak). */

const WIDGETS={};

/* word or letter tiles: tap a tile in the bank to move it to the answer line, tap it there to send it back */
WIDGETS.tiles=WIDGETS.letters=(box,ex,api)=>{
  const letters=ex.type==='letters',picked=[];
  box.innerHTML=`<div class="answer${letters?' letters':''}" id="ansLine"></div>
    <div class="bank${letters?' letters':''}">${ex.bank.map((t,i)=>`<span class="slot"><button class="tile" data-i="${i}">${esc(t)}</button></span>`).join('')}</div>`;
  const line=box.querySelector('#ansLine'),bankBtns=[...box.querySelectorAll('.bank .tile')];
  const draw=()=>{
    line.innerHTML=picked.map(i=>`<button class="tile" data-i="${i}">${esc(ex.bank[i])}</button>`).join('');
    bankBtns.forEach(b=>b.classList.toggle('used',picked.includes(+b.dataset.i)));
    line.querySelectorAll('.tile').forEach(b=>b.onclick=()=>{SFX.tap();picked.splice(picked.indexOf(+b.dataset.i),1);draw()});
    api.change();
  };
  bankBtns.forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(picked.includes(i))return;SFX.tap();picked.push(i);if(!letters&&L.level<3)say(ex.bank[i]);draw()});
  draw();
  const value=()=>picked.map(i=>ex.bank[i]);
  return {
    ready:()=>picked.length>0,
    check:()=>letters?formsOf(ex.word).includes(value().join('').toLowerCase()):ex.answers.some(a=>norm(a)===norm(value().join(' '))),
    lock:()=>box.querySelectorAll('button').forEach(b=>b.disabled=true)
  };
};

/* select the correct image */
WIDGETS.pick=(box,ex,api)=>{
  let sel=null;
  box.innerHTML=`<div class="cards">${ex.choices.map(w=>`<button class="pcard" data-w="${w}" aria-pressed="false">${icon(w,ex.labels?w:'picture choice')}${ex.labels?`<span>${w}</span>`:''}</button>`).join('')}</div>`;
  box.querySelectorAll('.pcard').forEach(b=>b.onclick=()=>{
    sel=b.dataset.w;SFX.tap();if(ex.labels)say(sel);
    box.querySelectorAll('.pcard').forEach(x=>x.setAttribute('aria-pressed',x===b));api.change()});
  return {
    ready:()=>!!sel,
    check:()=>{const ok=sel===ex.word;box.querySelector(`.pcard[data-w="${ex.word}"]`).classList.add('right');if(!ok)box.querySelector(`.pcard[data-w="${sel}"]`).classList.add('wrong');return ok},
    lock:()=>box.querySelectorAll('button').forEach(b=>b.disabled=true)
  };
};

/* fill the blanks: tapping a bank word fills the first empty blank */
WIDGETS.blank=(box,ex,api)=>{
  const fill={};// blank index -> bank index
  const sentence=()=>ex.tpl.map(t=>{
    if(typeof t!=='number')return t==='.'?'<span class="dot">.</span>':`<span>${esc(t)}</span>`;
    if(!ex.blanks.includes(t))return `<span>${esc(ex.words[t])}</span>`;
    const f=fill[t];return f==null?`<button class="gap" data-b="${t}" aria-label="Blank"></button>`:`<button class="tile in-gap" data-b="${t}">${esc(ex.bank[f])}</button>`;
  }).join(' ');
  box.innerHTML=`<p class="fill-line" id="fillLine"></p><div class="bank">${ex.bank.map((t,i)=>`<span class="slot"><button class="tile" data-i="${i}">${esc(t)}</button></span>`).join('')}</div>`;
  const line=box.querySelector('#fillLine'),bankBtns=[...box.querySelectorAll('.bank .tile')];
  const draw=()=>{
    line.innerHTML=sentence();
    const used=Object.values(fill);
    bankBtns.forEach(b=>b.classList.toggle('used',used.includes(+b.dataset.i)));
    line.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{if(fill[b.dataset.b]==null)return;SFX.tap();delete fill[b.dataset.b];draw()});
    api.change();
  };
  bankBtns.forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(Object.values(fill).includes(i))return;const gap=ex.blanks.find(k=>fill[k]==null);if(gap==null)return;
    SFX.tap();if(L.level<3)say(ex.bank[i]);fill[gap]=i;draw()});
  draw();
  return {
    ready:()=>ex.blanks.every(k=>fill[k]!=null),
    check:()=>{let ok=true;ex.blanks.forEach(k=>{const good=norm(ex.bank[fill[k]])===norm(ex.words[k]);ok=ok&&good;line.querySelector(`[data-b="${k}"]`)?.classList.add(good?'good':'bad')});return ok},
    lock:()=>box.querySelectorAll('button').forEach(b=>b.disabled=true)
  };
};

/* speaking: the sentence is on screen; levels 1-2 play it first, then the child taps the mic and repeats it */
function speechScore(target,heard){
  const tw=norm(target).split(' '),hw=norm(heard).split(' ');
  const hit=tw.map(w=>hw.some(h=>h===w||(w.length>=5&&lev(h,w)<=1)));
  return {hit,ratio:hit.filter(Boolean).length/tw.length};
}
WIDGETS.speak=(box,ex,api)=>{
  const words=ex.text.split(' ');let tries=0;
  const canListen=micState!=='none'&&micState!=='blocked';
  box.innerHTML=`<div class="speak">
    <div class="bubble">${ex.listenFirst?`<div class="bubble-btns"><button class="spk" id="spk" aria-label="Listen">${E('🔊')}</button><button class="spk slow" id="slow" aria-label="Listen slowly">${E('🐢')}</button></div>`:''}
      <p class="say-text" id="sayText">${words.map((w,i)=>`<span data-k="${i}">${esc(w)}</span>`).join(' ')}</p></div>
    ${canListen?`<button class="mic" id="mic">${E('🎤')}<span id="micLbl">TAP TO SPEAK</span></button><p class="heard" id="heard"></p>`
      :`<div class="adult"><p>👂 Un adulto escucha. ¿Lo dijo bien?</p><div class="row"><button class="btn ghost" id="adNo">✘ Not yet</button><button class="btn green" id="adYes">✔ Yes</button></div></div>`}
  </div>`;
  const mark=hit=>box.querySelectorAll('#sayText span').forEach((s,i)=>s.classList.toggle('hit',!!hit[i]));
  if(ex.listenFirst){
    box.querySelector('#spk').onclick=()=>say(ex.text);
    box.querySelector('#slow').onclick=()=>say(ex.text,{rate:.5});
    setTimeout(()=>{if(L&&L.queue[0]===ex)say(ex.text)},350);
  }
  const mic=box.querySelector('#mic');
  if(mic) mic.onclick=()=>{
    if(REC){stopListening();return}
    hush();mic.classList.add('on');box.querySelector('#micLbl').textContent='LISTENING…';
    const heard=box.querySelector('#heard');heard.textContent='';
    startListening({
      onText:t=>{mark(speechScore(ex.text,t).hit)},
      onDone:alts=>{mic.classList.remove('on');box.querySelector('#micLbl').textContent='TAP TO SPEAK';
        const best=alts.map(t=>speechScore(ex.text,t)).sort((a,b)=>b.ratio-a.ratio)[0];mark(best.hit);
        if(best.ratio>=.7)return api.result(true);
        if(++tries<2){SFX.bad();heard.textContent='🔁 Try again!';return}
        api.result(false)},
      onFail:why=>{mic.classList.remove('on');box.querySelector('#micLbl').textContent='TAP TO SPEAK';
        if(why==='blocked'){WIDGETS.speak(box,ex,api);return}
        heard.textContent='🙉 Tap and try again!'}
    });
  };
  const yes=box.querySelector('#adYes'),no=box.querySelector('#adNo');
  if(yes){yes.onclick=()=>{mark(words.map(()=>true));api.result(true)};no.onclick=()=>api.result(false)}
  return {ready:()=>false,check:()=>false,lock:()=>{stopListening();box.querySelectorAll('button').forEach(b=>b.disabled=true)}};
};
