/* Sound: text-to-speech (say), speech recognition (listen) and generated sound effects (SFX) */
let VOICE=null;
function pickVoice(){try{const v=speechSynthesis.getVoices();VOICE=v.find(x=>/en-US/i.test(x.lang)&&/Google|Samantha|Aria|Jenny/i.test(x.name))||v.find(x=>/en-US/i.test(x.lang))||v.find(x=>/^en/i.test(x.lang))||null}catch(e){}}
try{pickVoice();speechSynthesis.onvoiceschanged=pickVoice}catch(e){}
function say(t,{rate=.85,onend}={}){
  try{speechSynthesis.cancel();if(!t){onend&&onend();return}
    const u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=rate;if(VOICE)u.voice=VOICE;if(onend)u.onend=onend;speechSynthesis.speak(u)}
  catch(e){onend&&onend()}
}
const hush=()=>{try{speechSynthesis.cancel()}catch(e){}};

const SRC=window.SpeechRecognition||window.webkitSpeechRecognition;
let micState=SRC?'unknown':'none'; // unknown | ok | blocked | none
let REC=null;
function startListening({onText,onDone,onFail}){
  let rec;try{rec=new SRC()}catch(e){micState='blocked';onFail('blocked');return null}
  rec.lang='en-US';rec.interimResults=true;rec.maxAlternatives=4;rec.continuous=false;
  let finals=[],alts=[],ended=false,failed=false;
  rec.onresult=e=>{micState='ok';let interim='';finals=[];alts=[];
    for(let i=0;i<e.results.length;i++){const r=e.results[i];if(r.isFinal){finals.push(r[0].transcript);for(let k=0;k<r.length;k++)alts.push(r[k].transcript)}else interim+=r[0].transcript}
    onText((finals.join(' ')+' '+interim).trim())};
  rec.onerror=e=>{if(['not-allowed','service-not-allowed','audio-capture','network'].includes(e.error)){micState='blocked';failed=true;onFail('blocked')}else if(e.error==='no-speech'){failed=true;onFail('nospeech')}};
  rec.onend=()=>{if(ended)return;ended=true;REC=null;if(failed)return;const full=finals.join(' ').trim();if(!full){onFail('nospeech');return}onDone([full,...alts])};
  try{rec.start()}catch(e){micState='blocked';onFail('blocked');return null}
  REC=rec;return rec;
}
function stopListening(){try{REC&&REC.stop()}catch(e){}}

let AC=null;
function tone(seq){if(PR.mute)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t0=AC.currentTime+.01;
  seq.forEach(([f,d,st,type='triangle',vol=.16])=>{const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=f;
    g.gain.setValueAtTime(0,t0+st);g.gain.linearRampToValueAtTime(vol,t0+st+.02);g.gain.exponentialRampToValueAtTime(.001,t0+st+d);
    o.connect(g).connect(AC.destination);o.start(t0+st);o.stop(t0+st+d+.05)})}catch(e){}}
const SFX={
  tap:()=>tone([[600,.06,0,'sine',.07]]),
  good:()=>tone([[659,.14,0],[880,.28,.1]]),
  combo:()=>tone([[659,.12,0],[880,.12,.09],[1175,.3,.18]]),
  bad:()=>tone([[247,.18,0,'sine'],[196,.28,.14,'sine']]),
  win:()=>tone([[523,.14,0],[659,.14,.13],[784,.14,.26],[1047,.45,.39],[784,.12,.39,'sine',.08]]),
  sticker:()=>tone([[784,.1,0,'sine'],[988,.1,.08,'sine'],[1319,.1,.16,'sine'],[1568,.4,.24,'sine']])
};
