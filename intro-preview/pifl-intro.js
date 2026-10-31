/* PIFL warp intro (preview). Self-contained: canvas + CSS, no libraries, no files except the shield PNG.
   Modeled on the ICON | Kelso concept intro (starfield warp -> flash -> logo resolve -> fade), re-themed for trucking.
   ?nointro skips it. Skip button / Esc skip it. prefers-reduced-motion gets a short, still fade. */
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
@media (max-width:640px){.pi-lockup{margin-bottom:10px}.pi-sub{letter-spacing:.18em}.pi-name{letter-spacing:.08em;font-size:clamp(17px,5.6vw,28px)}.pi-name span.sp{width:.35em}}
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
<button type="button" class="pi-skip">Skip ›</button>`;

/* ---------- canvas: starfield + highway warp + light trails ---------- */
let W=0,H=0,cx=null,raf=0,t0=0,last=0,dist=0;
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
  const t=(now-t0)/1000, dt=Math.min(0.05,(now-last)/1000||0.016); last=now;
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
    const alpha=Math.min(1,(t<0.3?t/0.3:1))*(p.kind==="g"?Math.min(1,v/60):1);
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
let timers=[], done=false;
const at=(ms,fn)=>timers.push(setTimeout(fn,ms));
function finish(skipped){
  if (done) return; done=true; timers.forEach(clearTimeout);
  el.classList.add("out"); document.removeEventListener("keydown",onKey);
  setTimeout(()=>{ cancelAnimationFrame(raf); el.remove(); document.body.classList.remove("pi-on"); window.dispatchEvent(new Event("pifl-intro-done")); }, skipped?300:800);
}
function onKey(e){ if (e.key==="Escape"){ e.preventDefault(); finish(true); } }
function start(){
  document.body.appendChild(el); document.body.classList.add("pi-on");
  el.querySelector(".pi-skip").addEventListener("click",()=>finish(true)); document.addEventListener("keydown",onKey);
  el.querySelector(".pi-skip").focus({preventScroll:true});
  size(); window.addEventListener("resize",size);
  if (!reduce){ t0=last=performance.now(); raf=requestAnimationFrame(frame);
    at(T.flash,()=>el.classList.add("flash","dim")); }
  at(T.logo,()=>el.classList.add("logo"));
  if (T.lock) at(T.lock,()=>el.classList.add("lock"));
  at(T.name,()=>el.classList.add("name"));
  at(T.tag,()=>el.classList.add("tag"));
  at(T.sub,()=>el.classList.add("sub"));
  at(T.out,()=>finish(false));
}
window.PIFLIntro = { replay(){ location.search = ""; location.reload(); } };
if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
})();
