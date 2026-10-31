/* PIFL warp intro (preview). Self-contained: canvas + CSS, no libraries, no files except the shield PNG.
   Modeled on the ICON | Kelso concept intro (starfield warp -> flash -> logo resolve -> fade), re-themed for trucking.
   ?nointro skips it. Skip button / Esc skip it. prefers-reduced-motion gets a short, still fade.
   Sound: 100% synthesized with Web Audio (no audio files). Browsers only allow audio after a user gesture,
   so the intro opens on a "Tap to start your engine" gate; the 🔊 button mutes (remembered in localStorage). */
(function(){
const qs = new URLSearchParams(location.search);
if (qs.has("nointro")) return;
const SHIELD = (window.PIFL_INTRO_SHIELD || "assets/pifl-shield-512.png");
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
.pi-shield{width:100%;height:100%;object-fit:contain;opacity:0;transform:translateY(-6vh) scale(.04) rotate(-28deg);filter:blur(14px) drop-shadow(0 0 0 rgba(66,123,47,0))}
#pi-intro.logo .pi-shield{animation:piFly 1.05s cubic-bezier(.16,.84,.24,1) forwards}
@keyframes piFly{0%{opacity:0;transform:translateY(-6vh) scale(.04) rotate(-28deg);filter:blur(14px)}
 35%{opacity:1}
 72%{transform:translateY(0) scale(1.14) rotate(4deg);filter:blur(0) drop-shadow(0 0 30px rgba(110,190,80,.75))}
 86%{transform:scale(.95) rotate(-1deg)}
 100%{opacity:1;transform:none;filter:blur(0) drop-shadow(0 0 22px rgba(90,170,60,.55)) drop-shadow(0 10px 24px rgba(0,0,0,.6))}}
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
.pi-gate img{width:clamp(84px,14vh,130px);filter:drop-shadow(0 0 22px rgba(90,170,60,.55));opacity:.92}
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

/* ---------- sound: every sound is synthesized with Web Audio ----------
   score(ctx, out, s, o) schedules the whole soundtrack at ctx time s. It is pure scheduling,
   so the same function drives live playback and an OfflineAudioContext render (used for the preview video). */
function noiseBuf(ctx){ const n=ctx.sampleRate*2, b=ctx.createBuffer(1,n,ctx.sampleRate), d=b.getChannelData(0); for(let i=0;i<n;i++) d[i]=Math.random()*2-1; return b; }
function shaper(ctx,k){ const n=2048,c=new Float32Array(n); for(let i=0;i<n;i++){const x=i/(n-1)*2-1; c[i]=Math.tanh(k*x)/Math.tanh(k);} const w=ctx.createWaveShaper(); w.curve=c; w.oversample="2x"; return w; }
function noise(ctx,nb,s,e){ const n=ctx.createBufferSource(); n.buffer=nb; n.loop=true; n.start(s,Math.random()*1.5); n.stop(e); return n; }
function pts(param,list){ list.forEach(([t,v,kind],i)=>{ if(i===0) param.setValueAtTime(v,t); else if(kind==="e") param.exponentialRampToValueAtTime(Math.max(v,1e-4),t); else if(kind==="s") param.setValueAtTime(v,t); else param.linearRampToValueAtTime(v,t); }); }
function horn(ctx,out,t){ /* deep two-blast air horn: low A-major chord (A2 C#3 E3 + A1 body), each note 2 detuned saws */
  const bus=ctx.createGain(); const lp=ctx.createBiquadFilter(); lp.type="lowpass"; lp.frequency.value=1500; lp.Q.value=0.8;
  const pk=ctx.createBiquadFilter(); pk.type="peaking"; pk.frequency.value=420; pk.gain.value=5; pk.Q.value=1;
  const sh=shaper(ctx,1.8); bus.connect(sh); sh.connect(lp); lp.connect(pk); pk.connect(out);
  [[t,0.42],[t+0.58,0.95]].forEach(([b,dur])=>{
    const g=ctx.createGain(); g.connect(bus); pts(g.gain,[[b,0],[b+0.035,0.19],[b+dur-0.09,0.175],[b+dur,0,"l"]]);
    [55,110,138.59,164.81].forEach((f,j)=>[-5,5].forEach(cents=>{ const o=ctx.createOscillator(); o.type=j===0?"square":"sawtooth"; o.detune.value=cents;
      pts(o.frequency,[[b,f*0.93],[b+0.07,f,"l"],[b+dur,f*0.99,"l"]]); const og=ctx.createGain(); og.gain.value=j===0?0.35:0.5; o.connect(og); og.connect(g); o.start(b); o.stop(b+dur+0.05); }));
    /* air rush on each blast */
    const n=noise(ctx,ctx._nb||(ctx._nb=noiseBuf(ctx)),b,b+dur); const bp=ctx.createBiquadFilter(); bp.type="bandpass"; bp.frequency.value=1800; bp.Q.value=0.7;
    const ng=ctx.createGain(); pts(ng.gain,[[b,0],[b+0.03,0.05],[b+dur,0,"l"]]); n.connect(bp); bp.connect(ng); ng.connect(out);
  });
}
function thunk(ctx,out,t,amt){ /* deep metallic lock-in */
  const o=ctx.createOscillator(); o.type="sine"; pts(o.frequency,[[t,130],[t+0.22,40,"e"]]); const g=ctx.createGain(); pts(g.gain,[[t,0],[t+0.006,0.75*amt],[t+0.7,0.001,"e"]]); o.connect(g); g.connect(out); o.start(t); o.stop(t+0.75);
  [[173,.7],[412,.45],[689,.35],[1031,.3],[1587,.18],[2390,.12]].forEach(([f,d],i)=>{ const p=ctx.createOscillator(); p.type="sine"; p.frequency.value=f; const pg=ctx.createGain(); pts(pg.gain,[[t,0],[t+0.004,(0.16-i*0.018)*amt],[t+d,0.0005,"e"]]); p.connect(pg); pg.connect(out); p.start(t); p.stop(t+d+0.05); });
  const n=noise(ctx,ctx._nb,t,t+0.06), bp=ctx.createBiquadFilter(); bp.type="bandpass"; bp.frequency.value=2600; bp.Q.value=1.2; const ng=ctx.createGain(); pts(ng.gain,[[t,0.5*amt],[t+0.05,0.001,"e"]]); n.connect(bp); bp.connect(ng); ng.connect(out);
}
function score(ctx,out,s,o){
  const nb=ctx._nb||(ctx._nb=noiseBuf(ctx));
  if (!o.reduce){
    /* key-start: starter motor cranks, then the diesel catches */
    for (let i=0;i<4;i++){ const b=s+i*0.1, n=noise(ctx,nb,b,b+0.08), bp=ctx.createBiquadFilter(); bp.type="bandpass"; bp.frequency.value=520; bp.Q.value=2; const g=ctx.createGain(); pts(g.gain,[[b,0],[b+0.01,0.22],[b+0.075,0.001,"e"]]); n.connect(bp); bp.connect(g); g.connect(out); }
    /* diesel engine: saw + square sub, distorted, low-passed; rpm curve revs, shifts, revs */
    const eng=ctx.createGain(), sh=shaper(ctx,3), lp=ctx.createBiquadFilter(); lp.type="lowpass"; lp.Q.value=2.5;
    const rpm=[[s+0.34,22],[s+0.5,34,"l"],[s+0.75,27,"l"],[s+1.55,74,"l"],[s+1.68,50,"l"],[s+2.85,98,"l"],[s+3.05,82,"l"],[s+3.25,44,"l"],[s+4.1,24,"l"],[s+7.2,23,"l"],[s+7.3,30,"l"]];
    [["sawtooth",1,0.6],["square",0.5,0.45],["sawtooth",2.01,0.18]].forEach(([type,mul,lev])=>{ const v=ctx.createOscillator(); v.type=type; pts(v.frequency,rpm.map(([t,f,k])=>[t,f*mul,k])); const vg=ctx.createGain(); vg.gain.value=lev; v.connect(vg); vg.connect(sh); v.start(s+0.3); v.stop(s+7.5); });
    /* firing-pulse throb: amplitude wobble at half the firing rate */
    const am=ctx.createGain(); am.gain.value=0.75; const lfo=ctx.createOscillator(); lfo.type="triangle"; pts(lfo.frequency,rpm.map(([t,f,k])=>[t,f/2,k])); const lfoG=ctx.createGain(); lfoG.gain.value=0.25; lfo.connect(lfoG); lfoG.connect(am.gain); lfo.start(s+0.3); lfo.stop(s+7.5);
    pts(lp.frequency,[[s+0.3,320],[s+0.75,360,"l"],[s+1.55,1100,"l"],[s+1.68,600,"l"],[s+2.85,1600,"l"],[s+3.25,700,"l"],[s+4.1,260,"l"]]);
    sh.connect(lp); lp.connect(am); am.connect(eng); eng.connect(out);
    pts(eng.gain,[[s+0.3,0],[s+0.36,0.42],[s+0.7,0.3,"l"],[s+1.55,0.46,"l"],[s+2.85,0.52,"l"],[s+3.1,0.22,"l"],[s+4.0,0.14,"l"],[s+4.6,0.1,"l"],[s+7.1,0.08,"l"],[s+7.4,0,"l"]]  /* low idle under the name reveal */);
    /* jake brake: harsh staccato "brap" as the lanes streak by and the rig sheds speed */
    const jo=ctx.createOscillator(); jo.type="sawtooth"; pts(jo.frequency,[[s+2.55,58],[s+3.0,52,"l"],[s+3.95,30,"l"]]);
    const jsh=shaper(ctx,9), jbp=ctx.createBiquadFilter(); jbp.type="bandpass"; jbp.frequency.value=420; jbp.Q.value=0.9;
    const jam=ctx.createGain(); jam.gain.value=0.5; const jl=ctx.createOscillator(); jl.type="square"; pts(jl.frequency,[[s+2.55,24],[s+3.95,12,"l"]]); const jlg=ctx.createGain(); jlg.gain.value=0.5; jl.connect(jlg); jlg.connect(jam.gain);
    const jg=ctx.createGain(); pts(jg.gain,[[s+2.55,0],[s+2.75,0.16,"l"],[s+3.1,0.34,"l"],[s+3.7,0.26,"l"],[s+3.98,0,"l"]]);
    jo.connect(jsh); jsh.connect(jbp); jbp.connect(jam); jam.connect(jg); jg.connect(out); jo.start(s+2.55); jo.stop(s+4); jl.start(s+2.55); jl.stop(s+4);
    /* warp whoosh: band-passed noise sweeping up with speed, panning, plus a sub rumble; boom at the flash */
    const wn=noise(ctx,nb,s,s+4.6), wbp=ctx.createBiquadFilter(); wbp.type="bandpass"; wbp.Q.value=0.9; pts(wbp.frequency,[[s,220],[s+1.2,420,"e"],[s+3.0,3200,"e"],[s+3.9,600,"e"]]);
    const wg=ctx.createGain(); pts(wg.gain,[[s,0],[s+0.6,0.02,"l"],[s+2.2,0.12,"l"],[s+3.02,0.55,"l"],[s+3.9,0.004,"e"]]);
    const pan=ctx.createStereoPanner?ctx.createStereoPanner():null; wn.connect(wbp); wbp.connect(wg);
    if (pan){ const pl=ctx.createOscillator(); pl.frequency.value=0.7; const plg=ctx.createGain(); plg.gain.value=0.35; pl.connect(plg); plg.connect(pan.pan); pl.start(s); pl.stop(s+4.6); wg.connect(pan); pan.connect(out); } else wg.connect(out);
    const rn=noise(ctx,nb,s,s+4.4), rlp=ctx.createBiquadFilter(); rlp.type="lowpass"; rlp.frequency.value=110; const rg=ctx.createGain(); pts(rg.gain,[[s,0],[s+1,0.25,"l"],[s+3.0,0.9,"l"],[s+4.3,0.001,"e"]]); rn.connect(rlp); rlp.connect(rg); rg.connect(out);
    const bo=ctx.createOscillator(); bo.type="sine"; pts(bo.frequency,[[s+3.03,95],[s+3.8,28,"e"]]); const bg=ctx.createGain(); pts(bg.gain,[[s+3.03,0],[s+3.05,0.75],[s+3.85,0.001,"e"]]); bo.connect(bg); bg.connect(out); bo.start(s+3.03); bo.stop(s+3.9);
    /* air-brake hiss "pssshht" as the rig settles, just before the name reveal */
    const hb=s+3.62, hn=noise(ctx,nb,hb,hb+0.9), hp=ctx.createBiquadFilter(); hp.type="highpass"; hp.frequency.value=2600; const hpk=ctx.createBiquadFilter(); hpk.type="peaking"; hpk.frequency.value=6000; hpk.gain.value=6;
    const hg=ctx.createGain(); pts(hg.gain,[[hb,0],[hb+0.02,0.34],[hb+0.18,0.24,"l"],[hb+0.85,0.001,"e"]]); hn.connect(hp); hp.connect(hpk); hpk.connect(hg); hg.connect(out);
    const cn=noise(ctx,nb,hb,hb+0.12), cbp=ctx.createBiquadFilter(); cbp.type="bandpass"; cbp.frequency.value=900; cbp.Q.value=1; const cg=ctx.createGain(); pts(cg.gain,[[hb,0.3],[hb+0.11,0.001,"e"]]); cn.connect(cbp); cbp.connect(cg); cg.connect(out);
  }
  thunk(ctx,out,s+o.lock,o.reduce?0.6:1);
  if (o.horn!=null) horn(ctx,out,s+o.horn);
}
const MUTE_KEY="pifl-intro-muted";
let actx=null, master=null, scoreBus=null, muted=false;
try{ muted=localStorage.getItem(MUTE_KEY)==="1"; }catch(e){}
const VOL=0.72;
function audioStart(){
  const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
  try{
    actx=new AC(); actx.resume&&actx.resume();
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
  score(oc,m,0.03,{reduce,lock:(T.lock||T.logo)/1000,horn:T.out/1000});
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
