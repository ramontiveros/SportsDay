/* Home: the learning path (one unit per place, 3 levels + trophy), stats bar, sticker album and parents panel */
const ZIG=[0,48,72,48,0,-48,-72,-48];

function topbar(){
  return `<header class="topbar"><div class="tb-in">
    <span class="stat fire" title="Day streak">${E('🔥')}<b>${streakNow()}</b></span>
    <span class="stat xp" title="XP">${E('⚡')}<b>${PR.xp}</b></span>
    <button class="stat" id="albumBtn" title="Stickers">${E('📒')}<b>${stickersOwned()}</b></button>
    <button class="stat" id="parentsBtn" title="Papás" aria-label="Papás">${E('👪')}</button>
  </div></header>`;
}

function renderHome(){
  stopListening();hush();hideSheet();L=null;
  let k=0;
  const units=SCENES.map((sc,si)=>{
    const [c,d]=UNIT_COLORS[si%UNIT_COLORS.length],done=doneIn(sc);
    const nodes=[1,2,3].map(level=>{
      const st=nodeState(si,level),x=ZIG[k++%ZIG.length];
      const ic=st==='done'?'✔':st==='locked'?'🔒':LEVEL_INFO[level].icon;
      return `<div class="node-wrap" style="--x:${x}px">${st==='current'?'<span class="start">START</span>':''}
        <button class="node ${st}" data-si="${si}" data-level="${level}" aria-label="${esc(sc.name)} level ${level} (${st})">${E(ic)}</button></div>`;
    }).join('');
    const trophy=`<div class="node-wrap" style="--x:${ZIG[k++%ZIG.length]}px"><div class="trophy-node ${done>=LEVELS?'won':''}" aria-label="Unit trophy">${E('🏆')}</div></div>`;
    return `<section class="unit" style="--u:${c};--ud:${d}">
      <div class="ubanner"><div><small>UNIT ${si+1}</small><h2>${esc(sc.name)}</h2></div><div class="uthumb">${sceneSVG(sc)}</div></div>
      <div class="nodes">${nodes}${trophy}</div></section>`;
  }).join('');
  screen.innerHTML=topbar()+`<div class="path">${units}</div>`;
  $('#albumBtn').onclick=renderAlbum;$('#parentsBtn').onclick=showParents;
  $$('.node').forEach(b=>b.onclick=()=>nodePopover(+b.dataset.si,+b.dataset.level,b));
  const cur=$('.node.current');
  if(cur)setTimeout(()=>cur.scrollIntoView({block:'center',behavior:'instant'}),0);else window.scrollTo(0,0);
}

function nodePopover(si,level,btn){
  const sc=SCENES[si],st=nodeState(si,level),info=LEVEL_INFO[level],[c,d]=UNIT_COLORS[si%UNIT_COLORS.length];
  if(st==='locked'){
    SFX.bad();btn.classList.remove('nope');void btn.offsetWidth;btn.classList.add('nope');
    return showSheet(`<h3>${esc(sc.name)} · Level ${level}</h3><p>🔒 Complete the levels before this one to unlock it!</p><button class="btn plain wide" id="okBtn">OK</button>`,
      {cls:'pop locked',onMount:()=>$('#okBtn').onclick=hideSheet});
  }
  SFX.tap();
  showSheet(`<h3>${esc(sc.name)}</h3><p>Level ${level} of ${LEVELS} · <b>${info.name}</b></p><p class="desc">${info.desc}</p>
    <button class="btn white wide" id="goBtn">${st==='done'?'PRACTICE':'START'} +${xpFor(level,false)} XP</button>`,
    {cls:'pop',onMount:el=>{el.style.setProperty('--u',c);el.style.setProperty('--ud',d);$('#goBtn').onclick=()=>startLesson(si,level)}});
}

function renderAlbum(){
  hideSheet();const own=stickersOwned();
  screen.innerHTML=topbar()+`<div class="page"><div class="page-head"><button class="x" id="backB" aria-label="Back">←</button><h2>Stickers ${own}/${STICKERS.length}</h2></div>
    <p class="hint">Every level you finish gives you a sticker. Tap one to hear it!</p>
    <div class="album">${STICKERS.map(([k,w],i)=>i<own?`<button class="sticker got" style="--r:${(i%3-1)*3}deg" data-say="${w}" aria-label="Listen to ${w}">${icon(k,w)}<b>${w}</b></button>`
      :`<div class="sticker locked">${icon(k,'locked sticker')}<b>🔒</b></div>`).join('')}</div></div>`;
  $('#backB').onclick=renderHome;$('#albumBtn').onclick=renderAlbum;$('#parentsBtn').onclick=showParents;
  $$('[data-say]').forEach(b=>b.onclick=()=>{SFX.tap();say(b.dataset.say)});
  window.scrollTo(0,0);
}

function showParents(){
  const tg=(id,on,label)=>`<label class="toggle"><input type="checkbox" id="${id}" ${on?'checked':''}> ${label}</label>`;
  showSheet(`<h3>Para papás</h3>
    <p>Cada <b>unidad</b> es un lugar del examen y tiene 3 niveles. Cada lección mezcla las partes del examen: vocabulario (elegir imagen y deletrear), preguntas (“What is … doing?”, “Where is …?”), completar oraciones y escribir una oración, usando solo las palabras de la tabla.</p>
    <ul>
      <li><b>Nivel 1 ⭐</b>: respuestas cortas con pocas fichas. Speaking: primero escucha y luego repite.</li>
      <li><b>Nivel 2 ⚽</b>: oraciones completas. Speaking: escucha y repite.</li>
      <li><b>Nivel 3 🏆</b>: fichas con errores de ortografía y verbos sin -ing. Speaking: solo texto, sin audio.</li>
    </ul>
    <p>❤️ Cada error cuesta una vida y la pregunta se repite al final. El speaking no quita vidas. 🎤 funciona en Chrome o Edge; si no, un adulto califica.</p>
    <div class="legend"><span><span class="k-pc">is kicking</span> present continuous</span><span><span class="k-mem">soccer player</span> sport member</span><span><span class="k-place">field</span> place</span><span><span class="k-prep">into</span> preposition</span><span><span class="k-vocab">goal</span> vocabulary</span></div>
    ${tg('tgMute',!PR.mute,'Sonidos')}${tg('tgMic',PR.noMic,'Sin micrófono (sin ejercicios de speaking)')}${tg('tgAll',PR.unlockAll,'Desbloquear todos los niveles')}
    <div class="row"><button class="btn plain" id="resetBtn">Borrar progreso</button><button class="btn blue" id="closeP">LISTO</button></div>`,
    {cls:'parents',onMount:()=>{
      $('#tgMute').onchange=e=>{PR.mute=!e.target.checked;save()};
      $('#tgMic').onchange=e=>{PR.noMic=e.target.checked;save()};
      $('#tgAll').onchange=e=>{PR.unlockAll=e.target.checked;save()};
      $('#closeP').onclick=renderHome;
      const rb=$('#resetBtn');rb.onclick=()=>{if(rb.dataset.armed){PR={...freshProgress(),mute:PR.mute};save();renderHome()}else{rb.dataset.armed='1';rb.textContent='Toca otra vez para borrar todo';rb.classList.replace('plain','red')}};
    }});
}
