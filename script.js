/* ===== غيّري من هنا بس ===== */
var CONFIG = {
  name: "بطاية",
  intro: ["انتي أجمل حاجة حصلت لي في الدنيا", "ربنا يخليكي ليا ويديمنا لبعض يا روح قلبي"],
  captions: [
    "كل سنة وانتي طيبة يا روح قلبي، ربنا يخليكي ليا",
    "انتي أجمل حاجة حصلت لي، وربنا يديمنا مع بعض",
    "ضحكتك بتنوّر أيامي كلها، ربنا ما يحرمني منها",
    "وجودك جنبي أمان الدنيا كلها، ربنا يحفظك ليا"
  ],
  closing: "ربنا يخليكي ليا ويديمنا لبعض.\nبحبك أكتر مما الكلام يقدر يقول."
};
/* =========================== */

document.documentElement.classList.add("js");
document.title = "عيد ميلاد سعيد يا " + CONFIG.name;
document.querySelectorAll(".her-name").forEach(function(e){e.textContent = CONFIG.name});
CONFIG.captions.forEach(function(t,i){document.getElementById("cap"+(i+1)).textContent = t});
document.getElementById("closing").textContent = CONFIG.closing;

// صورة ملونة مؤقتة لو الصورة لسه مش موجودة
var ph = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7a1a"/><stop offset="1" stop-color="#12a150"/></linearGradient></defs><rect width="400" height="500" fill="url(#g)"/><text x="200" y="285" font-size="120" text-anchor="middle">💖</text></svg>');
document.querySelectorAll("img").forEach(function(img){
  function fix(){ if(img.src !== ph) img.src = ph; }
  img.addEventListener("error", fix);
  if(img.complete && img.naturalWidth === 0) fix();
});

// ظهور تدريجي مع السكرول
var io = "IntersectionObserver" in window ? new IntersectionObserver(function(es){
  es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("on"); io.unobserve(e.target); } });
},{threshold:.15}) : null;
document.querySelectorAll(".rv").forEach(function(el){ io ? io.observe(el) : el.classList.add("on"); });

// كتابة تلقائية
(function(){
  var el = document.getElementById("typed"), s = 0, c = 0, del = false;
  (function tick(){
    var t = CONFIG.intro[s];
    el.textContent = t.slice(0, c);
    if(!del && c === t.length){ del = true; return setTimeout(tick, 2000); }
    if(del && c === 0){ del = false; s = (s+1) % CONFIG.intro.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 20 : 55);
  })();
})();

// كونفيتي
var cv = document.getElementById("fx"), cx = cv.getContext("2d"), bits = [];
function size(){ cv.width = innerWidth; cv.height = innerHeight; }
size(); addEventListener("resize", size);
var cols = ["#ff7a1a","#12a150","#ffb36b","#ffffff","#ffd24a"];
function burst(){
  for(var i=0;i<150;i++) bits.push({x:innerWidth/2,y:innerHeight*.45,vx:(Math.random()-.5)*16,vy:-Math.random()*14-3,r:4+Math.random()*6,c:cols[i%5],a:1});
}
(function loop(){
  cx.clearRect(0,0,cv.width,cv.height);
  bits = bits.filter(function(b){ return b.a > 0; });
  bits.forEach(function(b){ b.x+=b.vx; b.y+=b.vy; b.vy+=.35; b.a-=.008; cx.globalAlpha=Math.max(b.a,0); cx.fillStyle=b.c; cx.fillRect(b.x,b.y,b.r,b.r*1.6); });
  requestAnimationFrame(loop);
})();
document.getElementById("party").addEventListener("click", burst);
setTimeout(burst, 700);
