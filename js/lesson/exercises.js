/* Builds the exercises of one lesson (a unit = scene, at level 1, 2 or 3).
   Exercise types:
     pick    – select the correct image (exam Part 2)
     tiles   – build the answer by tapping word tiles (Part 1 questions, Part 3 sentence)
     letters – spell a word by tapping letter tiles (Part 2 spelling)
     blank   – fill the blanks of a sentence with word tiles
     speak   – read/listen to a sentence, then say it (speaking)
   Level rules:
     1 short answers, few extra tiles; speak = listen first, then repeat
     2 full sentences, more extra tiles; speak = listen first, then repeat
     3 full sentences, tricky extra tiles (misspellings, base verbs); speak = text only, no audio */

const roleTxt=a=>a.plural?(a.role==='fans'?'fans':PLURAL[a.role]||a.role):a.role;
function detFor(sc,a){const dup=sc.actors.filter(x=>x.role===a.role).length>1;return dup?(a.plural?'these':'this'):'the'}
const objTxt=a=>a.obj?' the '+a.obj:'';
// "The coach is walking on the field." (uses the preposition target when there is one, otherwise the place)
const fullSentence=a=>a.prep?`The ${roleTxt(a)} ${a.aux} ${a.verb}${objTxt(a)} ${a.prep} the ${a.target}.`:`The ${roleTxt(a)} ${a.aux} ${a.verb}${objTxt(a)} ${a.where}.`;
const shortSentence=a=>`The ${roleTxt(a)} ${a.aux} ${a.verb}.`;
const whereSentence=a=>`The ${roleTxt(a)} ${a.aux} ${a.where}.`;
const vocabSentence=w=>['team','hurdles','cones'].includes(w)?`They are the ${w}.`:`It is a ${w}.`;
const toTokens=s=>s.replace(/\.$/,'').split(' ');
const withAlts=(a,s)=>[s,...(a.alt||[]).map(v=>s.replace(a.verb,v))];

// believable spelling mistakes, never a real word from the table
function misspell(w,n=2){
  const out=new Set(),V='aeiou',mid=()=>1+Math.floor(Math.random()*Math.max(1,w.length-2));
  const tries=[
    ()=>w.replace(/(.)\1/,'$1'),
    ()=>{const i=mid();return w.slice(0,i)+w[i]+w.slice(i)},
    ()=>{const i=mid();return w.slice(0,i)+w.slice(i+1)},
    ()=>{const i=Math.min(mid(),w.length-2);return w.slice(0,i)+w[i+1]+w[i]+w.slice(i+2)},
    ()=>{const idx=[...w].map((c,i)=>i>0&&V.includes(c)?i:-1).filter(i=>i>0);if(!idx.length)return w;const i=rnd(idx);return w.slice(0,i)+rnd([...V.replace(w[i],'')])+w.slice(i+1)},
    ()=>w.endsWith('ing')?w.slice(0,-3)+'in':w+'e',
    ()=>w.replace('ck','k').replace('tch','ch').replace('wh','w')
  ];
  for(let g=0;out.size<n&&g<80;g++){const v=rnd(tries)();if(v&&v!==w&&v.length>1&&!ALL_WORDS.has(v))out.add(v)}
  return [...out];
}
function verbDistractors(a,level){
  const others=pickN(VERBS,2,[a.verb,...(a.alt||[])]);
  if(level===1)return others;
  if(level===2)return [...others,BASE[a.verb]];
  return [...others,BASE[a.verb],...misspell(a.verb,1)];
}
function sentenceDistractors(a,answer,level){
  const pool=[a.aux==='is'?'are':'is',BASE[a.verb],rnd(VERBS.filter(v=>v!==a.verb&&!(a.alt||[]).includes(v))),rnd(PREPS),rnd(PLACES),rnd(ROLES)];
  const extra=pickN(pool,level===2?3:4,answer);
  return level===3?[...extra,...misspell(a.verb,1)]:extra;
}
const tilesOf=(answers,distractors)=>shuffle([...toTokens(answers[0]),...distractors]);

/* ---- builders ---- */
function exPick(word,level){
  const plural=['cones','hurdles'].includes(word);
  return {type:'pick',title:`Which ${plural?'are':'is'} the ${word}?`,word,choices:shuffle([word,...pickN(VOCAB,3,[word])]),labels:level===1,
    solution:plural?`These are the ${word}.`:`This is the ${word}.`};
}
function exSpell(word,level){
  if(level===1)return {type:'tiles',title:'What is this?',icon:word,bank:shuffle([word,...misspell(word,2)]),answers:[word],solution:vocabSentence(word)};
  const extra=level===3?pickN([...'abcdeghiklmnoprstuw'],2):[];
  return {type:'letters',title:'What is this? Spell the word.',icon:word,word,bank:shuffle([...word,...extra]),solution:vocabSentence(word)};
}
function exAsk(sc,a,kind,level){
  const d=detFor(sc,a);
  if(kind==='verb'){
    const title=`What ${a.aux} ${d} ${roleTxt(a)} doing?`;
    if(level===1)return {type:'tiles',title,pic:true,actor:a.id,bank:shuffle([a.verb,...verbDistractors(a,1)]),answers:[a.verb,...(a.alt||[])],solution:fullSentence(a)};
    const answers=withAlts(a,fullSentence(a));
    return {type:'tiles',title,pic:true,actor:a.id,bank:tilesOf(answers,sentenceDistractors(a,toTokens(answers[0]),level)),answers,solution:answers[0]};
  }
  const title=`Where ${a.aux} ${d} ${roleTxt(a)}?`;
  if(level===1){const ans=a.where.split(' ');
    return {type:'tiles',title,pic:true,actor:a.id,bank:shuffle([...ans,...pickN(PREPS,1,ans),...pickN(PLACES,1,ans)]),answers:[a.where],solution:whereSentence(a)}}
  const answers=[whereSentence(a)];
  return {type:'tiles',title,pic:true,actor:a.id,bank:tilesOf(answers,sentenceDistractors(a,toTokens(answers[0]),level)),answers,solution:answers[0]};
}
function exBlank(sc,a,level){
  const place=a.where.split(' ').pop();
  const words=[roleTxt(a),a.verb,a.prep||place];
  const tpl=a.prep?['The',0,a.aux,1,...toTokens(objTxt(a).trim()||'_').filter(t=>t!=='_'),2,'the',a.target+'.']
                  :['The',0,a.aux,1,...toTokens(objTxt(a).trim()||'_').filter(t=>t!=='_'),a.where.split(' ')[0],'the',2,'.'];
  const blanks=level===1?[1]:level===2?[1,2]:[0,1,2];
  const distract=[...verbDistractors(a,level).slice(0,level===3?3:2),...(blanks.includes(2)?pickN(a.prep?PREPS:PLACES,1,[words[2]]):[]),...(blanks.includes(0)?pickN(ROLES,1,[words[0],a.role]):[])];
  return {type:'blank',title:'Complete the sentence.',pic:true,actor:a.id,tpl,words,blanks,bank:shuffle([...blanks.map(i=>words[i]),...distract]),solution:fullSentence(a)};
}
function exBuild(sc,a,level){
  const answers=level===1?withAlts(a,shortSentence(a)):withAlts(a,fullSentence(a));
  const distract=level===1?pickN([a.aux==='is'?'are':'is',...pickN(VERBS,2,[a.verb,...(a.alt||[])])],2,toTokens(answers[0])):sentenceDistractors(a,toTokens(answers[0]),level);
  return {type:'tiles',title:'Write a sentence about the picture.',pic:true,bank:tilesOf(answers,distract),answers,solution:answers[0]};
}
function exSpeak(text,level,{actor,icon}={}){
  return {type:'speak',title:'Speak this sentence',text,actor,icon,pic:!!actor,listenFirst:level<3,solution:text};
}

// one lesson, in exam order: Part 2 vocabulary, Part 1 questions, Part 3 sentence, with speaking mixed in
function buildLesson(sc,level){
  const A=shuffle(sc.actors),P=i=>A[i%A.length],items=shuffle(sc.items),it=i=>items[i%items.length];
  const n=sc.sports.length;
  const lastSay=n>1?`I can see ${sc.sports.slice(0,-1).join(', ')} and ${sc.sports[n-1]}.`:fullSentence(P(5));
  return [
    exPick(it(0),level),
    exAsk(sc,P(0),'verb',level),
    exSpeak(level===1?shortSentence(P(1)):fullSentence(P(1)),level,{actor:P(1).id}),
    exSpell(it(1),level),
    exAsk(sc,P(2),'where',level),
    exSpeak(vocabSentence(it(2)),level,{icon:it(2)}),
    exBlank(sc,P(3),level),
    exBuild(sc,P(4),level),
    exSpeak(lastSay,level,{actor:n>1?undefined:P(5).id})
  ];
}
