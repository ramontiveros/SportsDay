/* Progress saved in this browser: levels done per unit, XP, daily streak, settings */
const KEY='sportsDayEnglish.v2';
const LEVELS=3;
const LEVEL_INFO={
  1:{name:'Rookie',desc:'Words · listen and repeat',icon:'⭐'},
  2:{name:'Player',desc:'Sentences · listen and repeat',icon:'⚽'},
  3:{name:'Champion',desc:'Sentences · read and say (no audio)',icon:'🏆'}
};
const UNIT_COLORS=[['#58CC02','#58A700'],['#CE82FF','#A568CC'],['#1CB0F6','#1899D6'],['#FF9600','#CC7800'],['#FF4B4B','#D33131'],['#00CD9C','#00A47D'],['#FF86D0','#CC6BA6'],['#2B70C9','#1F5AA8']];

function freshProgress(){return {lv:{},xp:0,streak:{n:0,last:''},mute:false,unlockAll:false,noMic:false,speakOffUntil:0}}
function loadProgress(){try{const p=JSON.parse(localStorage.getItem(KEY));if(p&&p.lv)return {...freshProgress(),...p}}catch(e){}return freshProgress()}
let PR=loadProgress();
function save(){try{localStorage.setItem(KEY,JSON.stringify(PR))}catch(e){}}

const doneIn=sc=>PR.lv[sc.id]||0;
const levelsDone=()=>SCENES.reduce((n,s)=>n+doneIn(s),0);
const stickersOwned=()=>Math.min(STICKERS.length,levelsDone());
// first level not finished yet, walking the path in order
function currentNode(){for(let i=0;i<SCENES.length;i++){const d=doneIn(SCENES[i]);if(d<LEVELS)return {si:i,level:d+1}}return null}
function nodeState(si,level){
  if(level<=doneIn(SCENES[si]))return 'done';
  const c=currentNode();
  if(c&&c.si===si&&c.level===level)return 'current';
  return PR.unlockAll?'open':'locked';
}
function completeLevel(sc,level){PR.lv[sc.id]=Math.max(doneIn(sc),level)}

/* daily streak */
const dayStr=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const today=()=>dayStr(new Date());
const yesterday=()=>{const d=new Date();d.setDate(d.getDate()-1);return dayStr(d)};
const streakNow=()=>PR.streak.last===today()||PR.streak.last===yesterday()?PR.streak.n:0;
// returns true the first time a lesson is finished today
function bumpStreak(){
  if(PR.streak.last===today())return false;
  PR.streak.n=PR.streak.last===yesterday()?PR.streak.n+1:1;PR.streak.last=today();return true;
}
const speakingOff=()=>PR.noMic||Date.now()<PR.speakOffUntil;
