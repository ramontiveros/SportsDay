/* Small helpers shared by every file */
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const rnd=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const norm=s=>String(s).toLowerCase().replace(/[^a-z' ]+/g,' ').replace(/'/g,'').replace(/\s+/g,' ').trim();
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
function lev(a,b){const m=a.length,n=b.length;const d=Array.from({length:m+1},(_,i)=>[i]);for(let j=1;j<=n;j++)d[0][j]=j;
  for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n]}
function matchForms(text,forms){
  const n=norm(text),toks=n.split(' ').filter(Boolean);
  for(const f of forms) if((' '+n+' ').includes(' '+f+' ')) return {res:'ok',form:f};
  let best=null;
  for(const f of forms){const fw=f.split(' ').length;
    for(let i=0;i+fw<=toks.length;i++){const c=toks.slice(i,i+fw).join(' ');const d=lev(c,f);const tol=f.length>=7?2:1;
      if(d<=tol&&c[0]===f[0]&&(!best||d<best.d))best={d,form:f,cand:c}}}
  return best?{res:'almost',...best}:{res:'no'};
}
const formsOf=w=>FORMS[w]||[w];
const $$=s=>[...document.querySelectorAll(s)];
const pickN=(pool,n,exclude=[])=>{const ex=new Set(exclude.map(x=>String(x).toLowerCase()));return shuffle([...new Set(pool)].filter(x=>x&&!ex.has(String(x).toLowerCase()))).slice(0,n)};
