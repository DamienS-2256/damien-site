console.log("JavaScript is working!");

const THEME_KEY="damien-theme-v2";
function getSavedTheme(){return localStorage.getItem(THEME_KEY)==="light"?"light":"dark"}
function applyTheme(theme){
  const light=theme==="light";document.body.classList.toggle("light-mode",light);
  const b=document.getElementById("theme-toggle");
  if(b){b.textContent=light?"🌙 Dark Mode":"☀️ Light Mode";b.setAttribute("aria-pressed",String(light));b.setAttribute("aria-label",light?"Switch to dark mode":"Switch to light mode")}
}
function initializeTheme(){
  applyTheme(getSavedTheme());const b=document.getElementById("theme-toggle");if(!b)return;
  b.addEventListener("click",e=>{e.preventDefault();const n=document.body.classList.contains("light-mode")?"dark":"light";localStorage.setItem(THEME_KEY,n);applyTheme(n);flash()})
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initializeTheme);else initializeTheme();

function color(v){return getComputedStyle(document.body).getPropertyValue(v).trim()||"#00ffff"}
function reduced(){return matchMedia("(prefers-reduced-motion: reduce)").matches}
function flash(){if(reduced())return;const f=document.createElement("div");Object.assign(f.style,{position:"fixed",inset:0,pointerEvents:"none",zIndex:99997,background:color("--accent")});document.body.appendChild(f);f.animate([{opacity:0},{opacity:.08},{opacity:0}],{duration:260}).finished.then(()=>f.remove()).catch(()=>f.remove())}

const glow=document.querySelector(".glow");let tx=innerWidth/2,ty=innerHeight/2,gx=tx,gy=ty;
addEventListener("mousemove",e=>{tx=e.clientX;ty=e.clientY},{passive:true});
function glowLoop(){gx+=(tx-gx)*.09;gy+=(ty-gy)*.09;if(glow){glow.style.left=gx+"px";glow.style.top=gy+"px"}requestAnimationFrame(glowLoop)}
if(!reduced())requestAnimationFrame(glowLoop);

let trail=0;
addEventListener("mousemove",e=>{
  if(reduced()||performance.now()-trail<34)return;trail=performance.now();
  const p=document.createElement("div"),c=color("--particle");Object.assign(p.style,{position:"fixed",left:e.clientX+"px",top:e.clientY+"px",width:"5px",height:"5px",background:c,borderRadius:"50%",pointerEvents:"none",zIndex:99999,boxShadow:`0 0 5px ${c},0 0 14px ${c}`,transform:"translate(-50%,-50%)"});document.body.appendChild(p);
  const dx=(Math.random()-.5)*32,dy=(Math.random()-.5)*32;
  p.animate([{transform:"translate(-50%,-50%) scale(1)",opacity:1},{transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(0)`,opacity:0}],{duration:360}).finished.then(()=>p.remove()).catch(()=>p.remove())
},{passive:true});

addEventListener("click",e=>{
  if(reduced())return;const c=color("--click"),r=document.createElement("div");
  Object.assign(r.style,{position:"fixed",left:e.clientX+"px",top:e.clientY+"px",width:"10px",height:"10px",border:`2px solid ${c}`,borderRadius:"50%",pointerEvents:"none",zIndex:100000,transform:"translate(-50%,-50%)",boxShadow:`0 0 12px ${c}`});document.body.appendChild(r);
  r.animate([{width:10,height:10,opacity:1},{width:82,height:82,opacity:0}],{duration:300}).finished.then(()=>r.remove()).catch(()=>r.remove());
  for(let i=0;i<10;i++){const p=document.createElement("div"),a=Math.random()*Math.PI*2,d=25+Math.random()*45;Object.assign(p.style,{position:"fixed",left:e.clientX+"px",top:e.clientY+"px",width:"5px",height:"5px",background:c,borderRadius:"50%",pointerEvents:"none",zIndex:100001,boxShadow:`0 0 8px ${c}`,transform:"translate(-50%,-50%)"});document.body.appendChild(p);p.animate([{transform:"translate(-50%,-50%) scale(1)",opacity:1},{transform:`translate(calc(-50% + ${Math.cos(a)*d}px),calc(-50% + ${Math.sin(a)*d}px)) scale(0)`,opacity:0}],{duration:320+Math.random()*160}).finished.then(()=>p.remove()).catch(()=>p.remove())}
});

function startBootFlicker(){
  const els=document.querySelectorAll("h1,h2,p,li,nav a,.theme-toggle"),chars="01XZΛΔΣΩΦΞ#%*+=<>/|_",letters=[];
  els.forEach(el=>{if(el.dataset.bootDone==="true")return;el.dataset.bootDone="true";const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),nodes=[];while(w.nextNode())nodes.push(w.currentNode);
    nodes.forEach(n=>{const t=n.textContent;if(!t.trim())return;const f=document.createDocumentFragment();for(const ch of t){if(/\s/.test(ch)){f.appendChild(document.createTextNode(ch));continue}const s=document.createElement("span");s.className="boot-letter";s.textContent=ch;f.appendChild(s);letters.push({element:s,original:ch,delay:Math.random()*180,duration:150+Math.random()*210})}n.parentNode.replaceChild(f,n)})
  });
  if(reduced())return;const start=performance.now();function loop(t){let done=true;for(const l of letters){const e=t-start-l.delay;if(e<0){done=false;continue}if(e<l.duration){done=false;l.element.classList.add("boot-flicker");l.element.textContent=chars[Math.floor(Math.random()*chars.length)]}else{l.element.textContent=l.original;l.element.classList.remove("boot-flicker")}}if(!done)requestAnimationFrame(loop)}requestAnimationFrame(loop)
}

function bootOverlay(){
  if(reduced()||sessionStorage.getItem("damien-boot-seen")==="1")return;
  const o=document.createElement("div");o.id="system-boot-overlay";o.innerHTML='<div class="boot-panel"><div class="boot-title">DAMIEN // PERSONAL SYSTEM</div><div class="boot-line">[ OK ] Visual interface initialized</div><div class="boot-line">[ OK ] Navigation matrix loaded</div><div class="boot-line">[ OK ] Interactive modules online</div><div class="boot-line">[ OK ] Welcome, operator_</div></div>';document.body.appendChild(o);sessionStorage.setItem("damien-boot-seen","1");setTimeout(()=>o.remove(),1900)
}
function glitch(){
  if(reduced())return;const g=document.createElement("div");g.className="system-glitch";document.body.appendChild(g);const c=color("--accent");
  for(let i=0;i<9;i++){const b=document.createElement("div");b.className="system-glitch__bar";b.style.left=Math.random()*75+"%";b.style.top=Math.random()*100+"%";b.style.width=20+Math.random()*55+"%";b.style.background=c;g.appendChild(b)}
  for(let i=0;i<5;i++){const b=document.createElement("div");b.className="system-glitch__block";b.style.left=Math.random()*92+"%";b.style.top=Math.random()*96+"%";b.style.width=18+Math.random()*70+"px";b.style.height=2+Math.random()*7+"px";b.style.background=c;g.appendChild(b)}
  const s=performance.now();function loop(t){for(const p of g.children){p.style.opacity=Math.random()>.35?Math.random()*.75:0;p.style.transform=`translateX(${(Math.random()-.5)*18}px)`}if(t-s<260)requestAnimationFrame(loop);else g.remove()}requestAnimationFrame(loop)
}
function scrollBar(){const b=document.createElement("div");b.id="scroll-progress";document.body.appendChild(b);function u(){const m=document.documentElement.scrollHeight-innerHeight;b.style.width=m>0?scrollY/m*100+"%":"0%"}addEventListener("scroll",u,{passive:true});addEventListener("resize",u);u()}
function reveals(){
  const s=document.querySelectorAll("main section");if(reduced()||!("IntersectionObserver"in window)){s.forEach(x=>x.classList.add("is-visible"));return}
  s.forEach((x,i)=>{x.classList.add("js-reveal");x.style.transitionDelay=Math.min(i*60,240)+"ms"});const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");o.unobserve(e.target)}}),{threshold:.12});s.forEach(x=>o.observe(x))
}
function activeNav(){const cur=location.pathname.split("/").pop()||"index.html";document.querySelectorAll("nav a").forEach(a=>{if(a.getAttribute("href")===cur){a.setAttribute("aria-current","page");a.style.borderColor="var(--accent)";a.style.boxShadow="0 0 12px var(--accent-soft)"}})}
function hud(){if(document.getElementById("site-status"))return;const s=document.createElement("div");s.id="site-status";s.textContent="● SYSTEM ONLINE";document.body.appendChild(s)}
function tilt(){if(reduced()||matchMedia("(pointer:coarse)").matches)return;document.querySelectorAll("section,.tetris-board-container,.tetris-info,.secret-box").forEach(c=>{c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(900px) rotateX(${-y*2}deg) rotateY(${x*2}deg) translateY(-6px)`});c.addEventListener("pointerleave",()=>c.style.transform="")})}

function init(){bootOverlay();scrollBar();hud();reveals();activeNav();tilt();startBootFlicker();setTimeout(glitch,850)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
