/* PIFL warp intro (preview). Self-contained: canvas + CSS, no libraries, no files except the shield PNG.
   Modeled on the ICON | Kelso concept intro (starfield warp -> flash -> logo resolve -> fade), re-themed for trucking.
   ?nointro skips it. Skip button / Esc skip it. prefers-reduced-motion gets a short, still fade.
   Sound: real recorded clips in assets/ (gear revs, jake brake, air brake, double air horn; Pixabay Content License,
   see README) mixed with Web Audio synth (starter crank, warp whoosh, sub boom, lock thunk). Browsers only allow audio
   after a user gesture, so the intro opens on a "Tap to start your engine" gate that also unlocks iOS audio;
   the 🔊 button mutes (remembered in localStorage). */
(function(){
const qs = new URLSearchParams(location.search);
if (qs.has("nointro")) return;
// Shield inlined as a transparent PNG data URI (no network fetch; iOS Safari showed a white square for the external PNG + CSS filter).
const SHIELD = "data:image/png;base64,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";
const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
const NAME = "PAY IT FORWARD LOGISTICS";
const TAG = ["Family-owned.", "Driver-led.", "Arizona."];
const SUB = "Freight brokerage run by former CDL drivers";
/* timeline (ms) */
const T = reduce ? {logo:150, name:500, tag:1100, sub:1500, out:3000, gone:3600}
                 : {flash:3050, logo:3150, lock:4050, name:4350, tag:5400, sub:5950, out:7300, gone:8100};

const css = `
body.pi-on{overflow:hidden}
#pi-intro{position:fixed;inset:0;z-index:10000;background:radial-gradient(1100px 650px at 50% 42%,#13240f,#050806 70%);color:#fff;overflow:hidden;transition:opacity .8s ease;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
#pi-intro.out{opacity:0;pointer-events:none}
#pi-intro canvas{position:absolute;inset:0;width:100%;height:100%;transition:opacity 1.2s ease}
#pi-intro.dim canvas{opacity:.38}
.pi-flash{position:absolute;inset:0;pointer-events:none;opacity:0;background:radial-gradient(circle at 50% 46%,#fff 0,#f4fff0 30%,rgba(200,240,190,0) 75%)}
#pi-intro.flash .pi-flash{animation:piflash .7s ease-out forwards}
@keyframes piflash{0%{opacity:0}14%{opacity:1}100%{opacity:0}}
.pi-stage{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(10px,2.2vh,22px);padding:0 16px;text-align:center}
.pi-lockup{position:relative;width:clamp(120px,22vh,210px);height:clamp(120px,22vh,210px);display:grid;place-items:center}
.pi-shield{display:block;width:100%;height:100%;object-fit:contain;background:transparent;border:0;opacity:0;transform:translateY(-6vh) scale(.04) rotate(-28deg);-webkit-backface-visibility:hidden;backface-visibility:hidden}
#pi-intro.logo .pi-shield{animation:piFly 1.05s cubic-bezier(.16,.84,.24,1) forwards}
@keyframes piFly{0%{opacity:0;transform:translateY(-6vh) scale(.04) rotate(-28deg)}
 35%{opacity:1}
 72%{transform:translateY(0) scale(1.14) rotate(4deg)}
 86%{transform:scale(.95) rotate(-1deg)}
 100%{opacity:1;transform:none}}
.pi-plate{position:absolute;inset:-25%;border-radius:50%;background:radial-gradient(circle,rgba(120,200,90,.45) 0,rgba(66,123,47,.28) 45%,rgba(66,123,47,0) 70%);opacity:0;transform:scale(.3)}
#pi-intro.logo .pi-plate{animation:piPlate .9s .25s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes piPlate{to{opacity:1;transform:none}}
.pi-shield{position:relative;z-index:1}
.pi-ring{position:absolute;inset:0;border-radius:50%;border:3px solid #6fbf4f;opacity:0;pointer-events:none}
#pi-intro.lock .pi-ring{animation:piRing .9s ease-out forwards}
#pi-intro.lock .pi-ring.r2{animation-delay:.12s;border-color:#aaabae}
@keyframes piRing{0%{opacity:.95;transform:scale(.7)}100%{opacity:0;transform:scale(1.9)}}
.pi-c{position:absolute;width:22%;height:22%;border:0 solid #aaabae;opacity:0;transition:transform .32s cubic-bezier(.3,1.6,.5,1),opacity .2s;z-index:2}
.pi-c.tl{top:-5%;left:-5%;border-top-width:4px;border-left-width:4px;transform:translate(-60%,-60%)}
.pi-c.tr{top:-5%;right:-5%;border-top-width:4px;border-right-width:4px;transform:translate(60%,-60%)}
.pi-c.bl{bottom:-5%;left:-5%;border-bottom-width:4px;border-left-width:4px;transform:translate(-60%,60%)}
.pi-c.br{bottom:-5%;right:-5%;border-bottom-width:4px;border-right-width:4px;transform:translate(60%,60%)}
#pi-intro.lock .pi-c{opacity:1;transform:none;border-color:#cfd0d2;box-shadow:0 0 12px rgba(111,191,79,.0)}
.pi-name{font-weight:800;font-size:clamp(18px,4.1vw,46px);letter-spacing:.14em;line-height:1.15;white-space:nowrap;display:flex;flex-wrap:wrap;justify-content:center;max-width:100%}
.pi-name span{display:inline-block;opacity:0;transform:translateY(.55em) scale(1.25);filter:blur(8px);background:linear-gradient(180deg,#ffffff 0,#e3e4e6 45%,#9c9da0 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.pi-name span.sp{width:.45em}
#pi-intro.name .pi-name span{animation:piLet .55s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes piLet{to{opacity:1;transform:none;filter:blur(0)}}
.pi-bar{height:3px;width:min(560px,80vw);background:linear-gradient(90deg,transparent,#5aa83c 18%,#8fd16e 50%,#5aa83c 82%,transparent);transform:scaleX(0);opacity:.95;margin-top:-4px}
#pi-intro.name .pi-bar{transition:transform 1s .35s cubic-bezier(.2,.8,.2,1);transform:scaleX(1)}
.pi-tag{display:flex;gap:.7em;flex-wrap:wrap;justify-content:center;font-size:clamp(17px,2.6vw,28px);font-weight:600;color:#a9dc8e;letter-spacing:.03em}
.pi-tag span{opacity:0;transform:translateY(12px)}
#pi-intro.tag .pi-tag span{animation:piWord .6s ease-out forwards}
@keyframes piWord{to{opacity:1;transform:none}}
.pi-sub{font-size:clamp(11px,1.5vw,14px);letter-spacing:.32em;text-transform:uppercase;color:rgba(214,218,212,.75);opacity:0;transition:opacity .8s}
#pi-intro.sub .pi-sub{opacity:1}
.pi-skip{position:absolute;top:max(14px,env(safe-area-inset-top));right:14px;z-index:5;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.08);color:#eef2ec;border-radius:99px;padding:8px 16px;font:600 13px system-ui,sans-serif;cursor:pointer}
.pi-skip:hover{background:rgba(255,255,255,.18)}
.pi-skip:focus-visible{outline:2px solid #8fd16e;outline-offset:3px}
#pi-intro.reduce .pi-shield,#pi-intro.reduce .pi-plate{animation:none!important;transform:none;filter:none;transition:opacity .6s}
#pi-intro.reduce.logo .pi-shield,#pi-intro.reduce.logo .pi-plate{opacity:1}
#pi-intro.reduce .pi-name span,#pi-intro.reduce .pi-tag span{animation:none!important;transform:none;filter:none;transition:opacity .6s}
#pi-intro.reduce.name .pi-name span,#pi-intro.reduce.tag .pi-tag span{opacity:1}
#pi-intro.reduce .pi-c{display:none}
#pi-intro.reduce .pi-bar{transition:none!important}
.pi-gate{position:absolute;inset:0;z-index:4;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;padding:0 20px;text-align:center;background:radial-gradient(600px 400px at 50% 48%,rgba(5,9,6,.35),rgba(5,9,6,.78));transition:opacity .45s ease}
.pi-gate.go{opacity:0;pointer-events:none}
.pi-gate img{display:block;width:clamp(84px,14vh,130px);background:transparent;opacity:.92}
.pi-start{display:inline-flex;align-items:center;gap:12px;border:2px solid #6fbf4f;background:linear-gradient(180deg,#4f8f37,#356b24);color:#fff;border-radius:99px;padding:16px 30px;font:800 clamp(16px,2.4vw,21px) system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;box-shadow:0 0 0 0 rgba(111,191,79,.6),0 10px 30px rgba(0,0,0,.5);animation:piPulse 1.8s ease-out infinite}
.pi-start:hover{background:linear-gradient(180deg,#5aa040,#3c7a29)}
.pi-start:focus-visible{outline:3px solid #cfe9c2;outline-offset:4px}
.pi-start{white-space:nowrap}.pi-start .k{display:grid;place-items:center;flex:none;width:40px;height:40px;border-radius:50%;background:#b3261e;border:2px solid #f0d0cc;font-size:8.5px;font-weight:800;letter-spacing:.04em;line-height:1;box-shadow:inset 0 -3px 0 rgba(0,0,0,.25)}
@keyframes piPulse{0%{box-shadow:0 0 0 0 rgba(111,191,79,.55),0 10px 30px rgba(0,0,0,.5)}100%{box-shadow:0 0 0 22px rgba(111,191,79,0),0 10px 30px rgba(0,0,0,.5)}}
.pi-gnote{font:500 12.5px system-ui,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:rgba(214,218,212,.7)}
.pi-mute{position:absolute;top:max(14px,env(safe-area-inset-top));right:104px;z-index:5;width:38px;height:36px;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.08);color:#eef2ec;border-radius:99px;font:16px system-ui,sans-serif;cursor:pointer;display:grid;place-items:center}
.pi-mute:hover{background:rgba(255,255,255,.18)}
.pi-mute:focus-visible{outline:2px solid #8fd16e;outline-offset:3px}
#pi-intro.reduce .pi-start{animation:none}
@media (max-width:640px){.pi-start{font-size:14px;letter-spacing:.02em;padding:12px 18px 12px 12px;gap:10px}.pi-mute{right:96px}.pi-lockup{margin-bottom:10px}.pi-sub{letter-spacing:.18em}.pi-name{letter-spacing:.08em;font-size:clamp(17px,5.6vw,28px)}.pi-name span.sp{width:.35em}}
`;
const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

const el = document.createElement("div");
el.id = "pi-intro"; el.className = reduce ? "reduce" : ""; el.setAttribute("role","dialog"); el.setAttribute("aria-label","Pay It Forward Logistics intro");
let i = 0;
const letters = NAME.split("").map(ch => ch === " " ? '<span class="sp"> </span>' : `<span style="animation-delay:${(i++)*34}ms">${ch}</span>`).join("");
el.innerHTML = `<canvas aria-hidden="true"></canvas><div class="pi-flash"></div>
<div class="pi-stage">
  <div class="pi-lockup"><div class="pi-plate"></div><img class="pi-shield" src="${SHIELD}" alt="Pay It Forward Logistics shield"><i class="pi-ring"></i><i class="pi-ring r2"></i><i class="pi-c tl"></i><i class="pi-c tr"></i><i class="pi-c bl"></i><i class="pi-c br"></i></div>
  <div class="pi-name" aria-label="${NAME}">${letters}</div>
  <div class="pi-bar"></div>
  <div class="pi-tag">${TAG.map((w,k)=>`<span style="animation-delay:${k*220}ms">${w}</span>`).join("")}</div>
  <div class="pi-sub">${SUB}</div>
</div>
<div class="pi-gate"><img src="${SHIELD}" alt=""><button type="button" class="pi-start"><span class="k">START</span>Tap to start your engine</button><div class="pi-gnote">Sound on · 8 seconds</div></div>
<button type="button" class="pi-mute" aria-label="Mute intro sound" aria-pressed="false">🔊</button>
<button type="button" class="pi-skip">Skip ›</button>`;

/* ---------- canvas: starfield + highway warp + light trails ---------- */
let W=0,H=0,cx=null,raf=0,t0=0,last=0,dist=0,gated=true;
const cv = () => el.querySelector("canvas");
function size(){ const c=cv(), dpr=Math.min(2,window.devicePixelRatio||1); W=c.clientWidth; H=c.clientHeight; c.width=W*dpr; c.height=H*dpr; cx=c.getContext("2d"); cx.setTransform(dpr,0,0,dpr,0,0); }
const stars = Array.from({length:380},()=>({x:Math.random()*2-1,y:-Math.random()*0.95-0.03,z:Math.random()*0.95+0.05}));
stars.forEach(s=>s.pz=s.z);
/* light trails: lane offsets (road units), white headlights oncoming on the left, red taillights on the right, green brand streaks on the shoulders */
const trails = Array.from({length:46},(_,k)=>{ const side=k%4; return {lane: side===0?-1.5+(Math.random()-.5)*.5 : side===1? 1.5+(Math.random()-.5)*.5 : side===2? -3.45 : 3.45, kind: side===0?"w":side===1?"r":"g", z: Math.random()*60+2, len: Math.random()*3+2}; });
function speed(t){ /* road units per second */
  if (t<0.4) return 6;
  if (t<3.0) return 6 + 150*Math.pow((t-0.4)/2.6,3);
  return Math.max(4, 156*Math.exp(-(t-3.0)*3.2));
}
function frame(now){
  if (!cx) return;
  const t=gated?0:(now-t0)/1000, dt=Math.min(0.05,(now-last)/1000||0.016); last=now;
  const v=speed(t); dist+=v*dt;
  const vx=W/2, vy=H*0.47, camH=1.6, f=Math.min(W,H)*0.95;
  const P=(lx,z)=>[vx+lx*f/z, vy+camH*f/z];
  /* sky trails fade (motion blur stronger with speed) */
  const blur=Math.min(0.82, v/190);
  cx.fillStyle=`rgba(5,9,6,${1-blur})`; cx.fillRect(0,0,W,H);
  /* stars, only above the horizon */
  cx.lineCap="round";
  const sv=v/2400;
  for (const s of stars){
    s.pz=s.z; s.z-=sv; if (s.z<=0.03){ s.x=Math.random()*2-1; s.y=-Math.random()*0.95-0.03; s.z=1; s.pz=1; }
    const k=Math.max(W,H)*0.5, x=vx+s.x/s.z*k, y=vy+s.y/s.z*k*0.9, px=vx+s.x/s.pz*k, py=vy+s.y/s.pz*k*0.9;
    if (y>vy) continue;
    const b=Math.min(1,(1-s.z)*1.5);
    cx.strokeStyle=`rgba(${215+Math.round(40*(1-s.z))},${235},${225},${b})`; cx.lineWidth=Math.max(.6,(1-s.z)*2.2);
    cx.beginPath(); cx.moveTo(px,py); cx.lineTo(x,y); cx.stroke();
  }
  /* horizon glow */
  const hg=cx.createRadialGradient(vx,vy,0,vx,vy,W*0.6); hg.addColorStop(0,`rgba(140,210,110,${0.25+Math.min(.35,v/400)})`); hg.addColorStop(1,"rgba(140,210,110,0)");
  cx.fillStyle=hg; cx.fillRect(0,0,W,H);
  /* road surface */
  const zn=0.9, zf=400, [l1,b1]=P(-4.2,zn), [r1]=P(4.2,zn), [l2,b2]=P(-4.2,zf), [r2]=P(4.2,zf);
  const rg=cx.createLinearGradient(0,vy,0,H); rg.addColorStop(0,"rgba(18,24,18,.0)"); rg.addColorStop(.15,"rgba(20,26,20,.9)"); rg.addColorStop(1,"rgba(28,32,28,1)");
  cx.fillStyle=rg; cx.beginPath(); cx.moveTo(l2,b2); cx.lineTo(r2,b2); cx.lineTo(r1,b1); cx.lineTo(l1,b1); cx.closePath(); cx.fill();
  /* solid edge lines */
  const edge=(lx,col)=>{ const [a,ay]=P(lx,zn),[b,by]=P(lx,zf); cx.strokeStyle=col; cx.lineWidth=1; cx.beginPath(); cx.moveTo(b,by); cx.lineTo(a,ay); cx.stroke(); };
  /* draw edges as thick quads so they widen toward viewer */
  const strip=(lx,w,z1,z2,col)=>{ const [a1,y1]=P(lx-w,z1),[a2]=P(lx+w,z1),[c1,y2]=P(lx-w,z2),[c2]=P(lx+w,z2); cx.fillStyle=col; cx.beginPath(); cx.moveTo(a1,y1); cx.lineTo(a2,y1); cx.lineTo(c2,y2); cx.lineTo(c1,y2); cx.closePath(); cx.fill(); };
  strip(-3.9,.07,zn,zf,"rgba(232,196,66,.9)"); strip(3.9,.07,zn,zf,"rgba(235,238,235,.9)");
  /* dashed lane lines streaming toward the viewer (stretch with speed) */
  const period=12, dash=3+Math.min(9,v/16), off=dist%period;
  for (const lx of [-1.3,1.3]){
    for (let z=period-off; z<zf; z+=period){ if (z+dash<zn) continue; const z1=Math.max(zn,z), z2=Math.min(zf,z+dash); const a=Math.min(1,40/z2); strip(lx,.06,z1,z2,`rgba(245,247,240,${0.25+0.75*a})`); }
  }
  /* light trails (long exposure) */
  for (const p of trails){
    const mul = p.kind==="w" ? 1.9 : p.kind==="r" ? 0.4 : 1.2; /* oncoming headlights fastest, taillights we overtake slowest */
    p.z -= v*dt*mul;
    if (p.z<zn){ p.z=40+Math.random()*80; }
    if (p.z>200){ p.z=3+Math.random()*10; }
    const len=Math.min(60, p.len + v*0.22), z1=Math.max(zn,p.z), z2=p.z+len;
    const [a,ay]=P(p.lane,z1),[b,by]=P(p.lane,z2);
    const g=cx.createLinearGradient(a,ay,b,by);
    const col=p.kind==="w"?"255,250,230":p.kind==="r"?"255,60,50":"120,215,90";
    const alpha=(p.kind==="g"?Math.min(1,v/60):1);
    g.addColorStop(0,`rgba(${col},${alpha})`); g.addColorStop(1,`rgba(${col},0)`);
    cx.strokeStyle=g; cx.lineWidth=Math.max(1, 3.2*f/z1/90); cx.beginPath(); cx.moveTo(a,ay); cx.lineTo(b,by); cx.stroke();
  }
  /* oncoming truck headlights: pair of lights rushing up from the horizon just before the flash */
  if (t>2.2 && t<3.2){
    const k=(t-2.2)/1.0, z=Math.max(1.0, 90*Math.pow(1-k,2.2)+1.0), [hx,hy]=P(0,z), sep=0.95*f/z, r=Math.max(4, 260/z);
    for (const sx of [-sep/2, sep/2]){ const gg=cx.createRadialGradient(hx+sx,hy-r*0.6,0,hx+sx,hy-r*0.6,r*3); gg.addColorStop(0,"rgba(255,255,245,1)"); gg.addColorStop(.25,"rgba(255,250,220,.75)"); gg.addColorStop(1,"rgba(255,250,220,0)"); cx.fillStyle=gg; cx.beginPath(); cx.arc(hx+sx,hy-r*0.6,r*3,0,7); cx.fill(); }
  }
  raf=requestAnimationFrame(frame);
}

/* ---------- sound: recorded clips + Web Audio synth ----------
   score(ctx, out, s, o) schedules the whole soundtrack at ctx time s. It is pure scheduling,
   so the same function drives live playback and an OfflineAudioContext render (used for the preview video). */
function noiseBuf(ctx){ const n=ctx.sampleRate*2, b=ctx.createBuffer(1,n,ctx.sampleRate), d=b.getChannelData(0); for(let i=0;i<n;i++) d[i]=Math.random()*2-1; return b; }
function shaper(ctx,k){ const n=2048,c=new Float32Array(n); for(let i=0;i<n;i++){const x=i/(n-1)*2-1; c[i]=Math.tanh(k*x)/Math.tanh(k);} const w=ctx.createWaveShaper(); w.curve=c; w.oversample="2x"; return w; }
function noise(ctx,nb,s,e){ const n=ctx.createBufferSource(); n.buffer=nb; n.loop=true; n.start(s,Math.random()*1.5); n.stop(e); return n; }
function pts(param,list){ list.forEach(([t,v,kind],i)=>{ if(i===0) param.setValueAtTime(v,t); else if(kind==="e") param.exponentialRampToValueAtTime(Math.max(v,1e-4),t); else if(kind==="s") param.setValueAtTime(v,t); else param.linearRampToValueAtTime(v,t); }); }
/* recorded clips: prefetched on load, decoded per AudioContext (live or offline) */
const SND_BASE=(document.currentScript&&document.currentScript.src)||location.href;
const SND={rev:"assets/semi-gears-rev.mp3", jake:"assets/jake-brake.mp3", air:"assets/air-brake-hiss.mp3", horn:"assets/truck-horn-2.mp3"};
const RAW={}; Object.keys(SND).forEach(k=>{ try{ RAW[k]=fetch(new URL(SND[k],SND_BASE)).then(r=>r.ok?r.arrayBuffer():null).catch(()=>null); }catch(e){ RAW[k]=Promise.resolve(null); } });
function getBuf(ctx,k){ ctx._bufs=ctx._bufs||{}; return ctx._bufs[k]||(ctx._bufs[k]=RAW[k].then(ab=>ab&&new Promise(res=>{ try{ const p=ctx.decodeAudioData(ab.slice(0),res,()=>res(null)); if(p&&p.catch) p.catch(()=>res(null)); }catch(e){ res(null); } }))); }
function clip(ctx,out,k,t,gain){ /* play clip k at ctx time t; if it decoded late, join it mid-clip */
  return getBuf(ctx,k).then(b=>{ if(!b) return; const src=ctx.createBufferSource(); src.buffer=b; const g=ctx.createGain(); g.gain.value=gain==null?1:gain; src.connect(g); g.connect(out);
    const now=ctx.currentTime||0; if(t>=now) src.start(t); else { const off=now-t; if(off<b.duration-0.05) src.start(now,off); } });
}
function horn(ctx,out,t){ return clip(ctx,out,"horn",t,1); } /* "Truck Horn #2" is already a double blast: honk honk */
function thunk(ctx,out,t,amt){ /* deep metallic lock-in */
  const o=ctx.createOscillator(); o.type="sine"; pts(o.frequency,[[t,130],[t+0.22,40,"e"]]); const g=ctx.createGain(); pts(g.gain,[[t,0],[t+0.006,0.75*amt],[t+0.7,0.001,"e"]]); o.connect(g); g.connect(out); o.start(t); o.stop(t+0.75);
  [[173,.7],[412,.45],[689,.35],[1031,.3],[1587,.18],[2390,.12]].forEach(([f,d],i)=>{ const p=ctx.createOscillator(); p.type="sine"; p.frequency.value=f; const pg=ctx.createGain(); pts(pg.gain,[[t,0],[t+0.004,(0.16-i*0.018)*amt],[t+d,0.0005,"e"]]); p.connect(pg); pg.connect(out); p.start(t); p.stop(t+d+0.05); });
  const n=noise(ctx,ctx._nb,t,t+0.06), bp=ctx.createBiquadFilter(); bp.type="bandpass"; bp.frequency.value=2600; bp.Q.value=1.2; const ng=ctx.createGain(); pts(ng.gain,[[t,0.5*amt],[t+0.05,0.001,"e"]]); n.connect(bp); bp.connect(ng); ng.connect(out);
}
function score(ctx,out,s,o){ /* returns a promise that resolves once every clip is scheduled */
  const nb=ctx._nb||(ctx._nb=noiseBuf(ctx)), clips=[];
  if (!o.reduce){
    /* key-start: starter motor cranks, then the diesel catches */
    for (let i=0;i<4;i++){ const b=s+i*0.1, n=noise(ctx,nb,b,b+0.08), bp=ctx.createBiquadFilter(); bp.type="bandpass"; bp.frequency.value=520; bp.Q.value=2; const g=ctx.createGain(); pts(g.gain,[[b,0],[b+0.01,0.22],[b+0.075,0.001,"e"]]); n.connect(bp); bp.connect(g); g.connect(out); }
    /* recorded semi pulling through the gears (rev, shift, rev) during the warp */
    clips.push(clip(ctx,out,"rev",s+0.3,1.6));
    /* recorded jake brake as the rig sheds speed */
    clips.push(clip(ctx,out,"jake",s+2.3,1));
    /* warp whoosh: band-passed noise sweeping up with speed, panning, plus a sub rumble; boom at the flash */
    const wn=noise(ctx,nb,s,s+4.6), wbp=ctx.createBiquadFilter(); wbp.type="bandpass"; wbp.Q.value=0.9; pts(wbp.frequency,[[s,220],[s+1.2,420,"e"],[s+3.0,3200,"e"],[s+3.9,600,"e"]]);
    const wg=ctx.createGain(); pts(wg.gain,[[s,0],[s+0.6,0.02,"l"],[s+2.2,0.12,"l"],[s+3.02,0.55,"l"],[s+3.9,0.004,"e"]]);
    const pan=ctx.createStereoPanner?ctx.createStereoPanner():null; wn.connect(wbp); wbp.connect(wg);
    if (pan){ const pl=ctx.createOscillator(); pl.frequency.value=0.7; const plg=ctx.createGain(); plg.gain.value=0.35; pl.connect(plg); plg.connect(pan.pan); pl.start(s); pl.stop(s+4.6); wg.connect(pan); pan.connect(out); } else wg.connect(out);
    const rn=noise(ctx,nb,s,s+4.4), rlp=ctx.createBiquadFilter(); rlp.type="lowpass"; rlp.frequency.value=110; const rg=ctx.createGain(); pts(rg.gain,[[s,0],[s+1,0.25,"l"],[s+3.0,0.9,"l"],[s+4.3,0.001,"e"]]); rn.connect(rlp); rlp.connect(rg); rg.connect(out);
    const bo=ctx.createOscillator(); bo.type="sine"; pts(bo.frequency,[[s+3.03,95],[s+3.8,28,"e"]]); const bg=ctx.createGain(); pts(bg.gain,[[s+3.03,0],[s+3.05,0.75],[s+3.85,0.001,"e"]]); bo.connect(bg); bg.connect(out); bo.start(s+3.03); bo.stop(s+3.9);
    /* recorded air-brake "pssht" as the truck stops, right before the logo locks; its hiss tail settles under the name */
    clips.push(clip(ctx,out,"air",s+3.55,1.5));
  }
  thunk(ctx,out,s+o.lock,o.reduce?0.6:1);
  if (o.horn!=null) clips.push(horn(ctx,out,s+o.horn));
  return Promise.all(clips);
}
const MUTE_KEY="pifl-intro-muted";
let actx=null, master=null, scoreBus=null, muted=false;
try{ muted=localStorage.getItem(MUTE_KEY)==="1"; }catch(e){}
const VOL=0.72;
function audioStart(){
  const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
  try{
    /* iOS 17+: play through the ringer/silent switch once the user has tapped "start your engine" */
    try{ if(navigator.audioSession) navigator.audioSession.type="playback"; }catch(e){}
    actx=new AC(); actx.resume&&actx.resume();
    /* iOS unlock: start a silent buffer inside the tap gesture */
    try{ const ub=actx.createBufferSource(); ub.buffer=actx.createBuffer(1,1,22050); ub.connect(actx.destination); ub.start(0); }catch(e){}
    Object.keys(SND).forEach(k=>getBuf(actx,k));
    const comp=actx.createDynamicsCompressor(); comp.threshold.value=-12; comp.ratio.value=8; comp.attack.value=0.003; comp.connect(actx.destination);
    master=actx.createGain(); master.gain.value=muted?0:VOL; master.connect(comp);
    scoreBus=actx.createGain(); scoreBus.connect(master);
    score(actx,scoreBus,actx.currentTime+0.03,{reduce,lock:(T.lock||T.logo)/1000,horn:T.out/1000});
  }catch(e){ actx=null; }
}
function audioSkip(){ /* cut the soundtrack, still give the honk-honk into the dashboard */
  if(!actx) return; const n=actx.currentTime; scoreBus.gain.setTargetAtTime(0,n,0.04);
  horn(actx,master,n+0.05);
}
function audioEnd(){ if(actx){ const c=actx; setTimeout(()=>{ try{c.close()}catch(e){} },2600); } }
function setMute(m){ muted=m; try{localStorage.setItem(MUTE_KEY,m?"1":"0")}catch(e){}
  const b=el.querySelector(".pi-mute"); b.textContent=m?"🔇":"🔊"; b.setAttribute("aria-pressed",m?"true":"false"); b.setAttribute("aria-label",m?"Unmute intro sound":"Mute intro sound");
  el.querySelector(".pi-gnote").textContent=(m?"Sound off":"Sound on")+" · 8 seconds";
  if(master) master.gain.setTargetAtTime(m?0:VOL,actx.currentTime,0.03); }
/* Offline render of the exact live soundtrack (for recording the preview video with audio). Returns a 16-bit stereo WAV as base64. */
async function renderWav(seconds){
  const sr=44100, oc=new OfflineAudioContext(2,Math.ceil(sr*seconds),sr);
  const comp=oc.createDynamicsCompressor(); comp.threshold.value=-12; comp.ratio.value=8; comp.attack.value=0.003; comp.connect(oc.destination);
  const m=oc.createGain(); m.gain.value=VOL; m.connect(comp);
  await score(oc,m,0.03,{reduce,lock:(T.lock||T.logo)/1000,horn:T.out/1000});
  const buf=await oc.startRendering(), L=buf.getChannelData(0), R=buf.getChannelData(1), n=L.length;
  const ab=new ArrayBuffer(44+n*4), dv=new DataView(ab); const w=(o,s)=>{for(let i=0;i<s.length;i++)dv.setUint8(o+i,s.charCodeAt(i))};
  w(0,"RIFF"); dv.setUint32(4,36+n*4,true); w(8,"WAVE"); w(12,"fmt "); dv.setUint32(16,16,true); dv.setUint16(20,1,true); dv.setUint16(22,2,true); dv.setUint32(24,sr,true); dv.setUint32(28,sr*4,true); dv.setUint16(32,4,true); dv.setUint16(34,16,true); w(36,"data"); dv.setUint32(40,n*4,true);
  for(let i=0;i<n;i++){ dv.setInt16(44+i*4,Math.max(-1,Math.min(1,L[i]))*32767,true); dv.setInt16(46+i*4,Math.max(-1,Math.min(1,R[i]))*32767,true); }
  let bin=""; const u=new Uint8Array(ab); for(let i=0;i<u.length;i+=32768) bin+=String.fromCharCode.apply(null,u.subarray(i,i+32768)); return btoa(bin);
}
let timers=[], done=false, started=false;
const at=(ms,fn)=>timers.push(setTimeout(fn,ms));
function finish(skipped){
  if (done) return; done=true; timers.forEach(clearTimeout);
  if (skipped && started) audioSkip(); audioEnd();
  el.classList.add("out"); document.removeEventListener("keydown",onKey);
  setTimeout(()=>{ cancelAnimationFrame(raf); el.remove(); document.body.classList.remove("pi-on"); window.dispatchEvent(new Event("pifl-intro-done")); }, skipped?300:800);
}
function onKey(e){ if (e.key==="Escape"){ e.preventDefault(); finish(true); } }
function start(){
  document.body.appendChild(el); document.body.classList.add("pi-on");
  el.querySelector(".pi-skip").addEventListener("click",()=>finish(true)); document.addEventListener("keydown",onKey);
  el.querySelector(".pi-mute").addEventListener("click",()=>setMute(!muted)); setMute(muted);
  const go=el.querySelector(".pi-start"); go.addEventListener("click",ignite,{once:true}); go.focus({preventScroll:true});
  size(); window.addEventListener("resize",size);
  if (!reduce){ last=performance.now(); raf=requestAnimationFrame(frame); }  /* road idles behind the gate */
}
function ignite(){ /* the user gesture: unlock audio and run the timeline */
  if (started||done) return; started=true; audioStart();
  el.querySelector(".pi-gate").classList.add("go"); el.querySelector(".pi-skip").focus({preventScroll:true});
  if (!reduce){ t0=last=performance.now(); gated=false;
    at(T.flash,()=>el.classList.add("flash","dim")); }
  at(T.logo,()=>el.classList.add("logo"));
  if (T.lock) at(T.lock,()=>el.classList.add("lock"));
  at(T.name,()=>el.classList.add("name"));
  at(T.tag,()=>el.classList.add("tag"));
  at(T.sub,()=>el.classList.add("sub"));
  at(T.out,()=>finish(false));
}
window.PIFLIntro = { replay(){ location.search = ""; location.reload(); }, start: ignite, renderWav, timeline: T };
if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
})();
