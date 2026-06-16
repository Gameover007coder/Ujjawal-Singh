// ─── PARTICLE CANVAS ───────────────────────────────────
(function(){
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles=[], mouse={x:null,y:null};

  function resize(){ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY;});

  const N=80;
  for(let i=0;i<N;i++) particles.push({
    x: Math.random()*W, y: Math.random()*H,
    vx: (Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
    r: Math.random()*2+.5,
    alpha: Math.random()*.6+.2
  });

  function draw(){
    ctx.clearRect(0,0,W,H);
    const C1='rgba(79,142,247,', C2='rgba(0,212,255,';

    particles.forEach((p,i)=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>W) p.vx*=-1;
      if(p.y<0||p.y>H) p.vy*=-1;

      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=C1+p.alpha+')';
      ctx.fill();

      for(let j=i+1;j<N;j++){
        const q=particles[j];
        const dx=p.x-q.x, dy=p.y-q.y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<140){
          ctx.beginPath();
          ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
          ctx.strokeStyle=C2+(1-d/140)*.15+')';
          ctx.lineWidth=.6;
          ctx.stroke();
        }
      }
      if(mouse.x){
        const dx=p.x-mouse.x, dy=p.y-mouse.y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<150){
          ctx.beginPath();
          ctx.moveTo(p.x,p.y); ctx.lineTo(mouse.x,mouse.y);
          ctx.strokeStyle=C1+(1-d/150)*.25+')';
          ctx.lineWidth=.8;
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ─── TYPEWRITER ────────────────────────────────────────
(function(){
  const el = document.getElementById('typewriter');
  const phrases = [
    'Computer Science Student',
    'Software Developer',
    'Problem Solver',
    'Full-Stack Enthusiast',
  ];
  let pi=0, ci=0, deleting=false;
  function tick(){
    const phrase=phrases[pi];
    if(!deleting){ ci++; } else { ci--; }
    el.innerHTML=phrase.slice(0,ci)+'<span class="cursor"></span>';
    if(!deleting && ci===phrase.length){ setTimeout(()=>{ deleting=true; tick(); },1800); return; }
    if(deleting && ci===0){ deleting=false; pi=(pi+1)%phrases.length; setTimeout(tick,400); return; }
    setTimeout(tick, deleting?50:80);
  }
  tick();
})();

// ─── HEADER SCROLL ─────────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll',()=>{
  header.classList.toggle('scrolled', window.scrollY>50);
  document.getElementById('scrollTop').classList.toggle('show', window.scrollY>400);
});

// ─── HAMBURGER ─────────────────────────────────────────
document.getElementById('hamburger').addEventListener('click',function(){
  document.getElementById('navLinks').classList.toggle('open');
  this.querySelector('i').className = document.getElementById('navLinks').classList.contains('open')
    ? 'fas fa-times' : 'fas fa-bars';
});

// ─── NAV SMOOTH + ACTIVE ───────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    const t=document.querySelector(a.getAttribute('href'));
    if(t) window.scrollTo({top:t.offsetTop-72,behavior:'smooth'});
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('hamburger').querySelector('i').className='fas fa-bars';
  });
});
const sections=document.querySelectorAll('section[id]');
window.addEventListener('scroll',()=>{
  let cur='';
  sections.forEach(s=>{ if(window.scrollY>=s.offsetTop-100) cur=s.id; });
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.classList.toggle('active', a.getAttribute('href')==='#'+cur);
  });
});

// ─── SCROLL-TOP ────────────────────────────────────────
document.getElementById('scrollTop').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// ─── REVEAL ON SCROLL ──────────────────────────────────
const ro=new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('visible'), i*80);
      e.target.querySelectorAll('.skill-bar-fill').forEach(b=>{
        b.style.width=b.dataset.w+'%';
      });
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

// ─── SKILL TABS ────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click',function(){
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
    const id=this.dataset.tab;
    document.getElementById('tab-tech').style.display=id==='tech'?'grid':'none';
    document.getElementById('tab-soft').style.display=id==='soft'?'grid':'none';
    setTimeout(()=>{
      document.querySelectorAll('#tab-'+id+' .skill-bar-fill').forEach(b=>{
        b.style.width=b.dataset.w+'%';
      });
    },50);
  });
});

// ─── EMAILJS CONFIGURATION ─────────────────────────────
// IMPORTANT: Replace these keys with your own from EmailJS
const EMAILJS_PUBLIC_KEY  = 'ZkusTjuMM-TjTuvP6';
const EMAILJS_SERVICE_ID  = 'service_vg7pcu3';
const EMAILJS_TEMPLATE_ID = 'template_i5ml5oj';

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

// ─── TOAST SYSTEM ──────────────────────────────────────
function showToast(type, title, message, duration=5000){
  const icons = {
    success:'<i class="fas fa-check"></i>',
    error:'<i class="fas fa-exclamation-triangle"></i>',
    loading:'<div class="spinner"></div>'
  };
  const toast=document.createElement('div');
  toast.className=`toast toast-${type}`;
  toast.innerHTML=`
    <div class="toast-icon">${icons[type]}</div>
    <div class="toast-body"><h4>${title}</h4><p>${message}</p></div>
    ${type!=='loading'?'<button class="toast-close" onclick="removeToast(this.closest(\'.toast\'))"><i class="fas fa-times"></i></button>':''}
  `;
  document.getElementById('toastContainer').appendChild(toast);
  requestAnimationFrame(()=>{ requestAnimationFrame(()=>toast.classList.add('show')); });
  if(duration && type!=='loading') setTimeout(()=>removeToast(toast), duration);
  return toast;
}
window.removeToast = function(toast){
  if(!toast) return;
  toast.classList.replace('show','hide');
  setTimeout(()=>toast.remove(), 450);
};

// ─── CONTACT FORM SUBMIT ───────────────────────────────
document.getElementById('contactForm').addEventListener('submit', async function(e){
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const form = this;

  document.getElementById('reply_to_field').value = document.getElementById('email').value;

  // Check if EmailJS keys are still placeholders
  if(EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || EMAILJS_SERVICE_ID === 'service_abc123'){
    showToast('error','Setup Required',
      'Please add your EmailJS keys to script.js. See the setup guide below.',6000);
    document.getElementById('setup-banner').style.display='flex';
    return;
  }

  btn.classList.add('btn-sending');
  btn.innerHTML='<div class="spinner" style="width:16px;height:16px;border-width:2px;margin-right:6px;display:inline-block;"></div> Sending…';
  const loadingToast = showToast('loading','Sending your message…','Please wait a moment.');

  try {
    await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
    window.removeToast(loadingToast);
    showToast('success','Message Sent! 🎉',
      `Thanks for reaching out! Ujjawal will reply to ${document.getElementById('email').value} soon.`,7000);
    btn.innerHTML='<i class="fas fa-check"></i> Message Sent!';
    btn.style.background='linear-gradient(135deg,#22c55e,#16a34a)';
    form.reset();
    setTimeout(()=>{
      btn.innerHTML='<i class="fas fa-paper-plane"></i> Send Message';
      btn.style.background='';
      btn.classList.remove('btn-sending');
    },4000);
  } catch(err){
    window.removeToast(loadingToast);
    showToast('error','Failed to Send',
      'Something went wrong. Please email directly at ujjusingh099@gmail.com',8000);
    btn.innerHTML='<i class="fas fa-paper-plane"></i> Send Message';
    btn.classList.remove('btn-sending');
    console.error('EmailJS error:',err);
  }
});
