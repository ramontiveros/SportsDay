/* Study-guide color code: tags present continuous, sport member, place, preposition and vocabulary words */
function analyze(text){
  const parts=String(text).match(/[A-Za-z']+|[^A-Za-z']+/g)||[];
  const tags=parts.map(()=>null), wi=[];
  parts.forEach((p,i)=>{if(/^[A-Za-z']+$/.test(p))wi.push(i)});
  const W=wi.map(i=>parts[i].toLowerCase());
  const found={pc:0,mem:0,place:0,prep:0,vocab:0};let loose=false;
  for(let k=0;k<W.length;k++){
    const w=W[k],nx=W[k+1];
    if(['soccer','basketball','volleyball'].includes(w)&&(nx==='player'||nx==='players')){tags[wi[k]]=tags[wi[k+1]]='mem';found.mem++;k++;continue}
    if(['is','are','am'].includes(w)&&nx&&VERB_SET.has(nx)){tags[wi[k]]=tags[wi[k+1]]='pc';found.pc++;k++;continue}
    if(VERB_SET.has(w)){tags[wi[k]]='pc';loose=true;continue}
    if(MEMBER_WORDS.has(w)){tags[wi[k]]='mem';found.mem++;continue}
    if(PLACE_WORDS.has(w)){tags[wi[k]]='place';found.place++;continue}
    if(PREP_SET.has(w)){tags[wi[k]]='prep';found.prep++;continue}
    if(VOCAB_WORDS.has(w)){tags[wi[k]]='vocab';found.vocab++;continue}
  }
  let html='';
  for(let i=0;i<parts.length;i++){
    const t=tags[i];
    if(!t){html+=esc(parts[i]);continue}
    let chunk=esc(parts[i]);
    while(i+2<parts.length&&/^ +$/.test(parts[i+1])&&tags[i+2]===t&&t!=='vocab'&&t!=='prep'){chunk+=' '+esc(parts[i+2]);i+=2}
    html+=`<span class="k-${t}">${chunk}</span>`;
  }
  const count=Object.values(found).filter(v=>v>0).length;
  return {html,found,loose,count,words:W};
}
