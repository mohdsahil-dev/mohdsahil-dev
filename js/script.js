
// === LOADER ===
window.addEventListener('load',()=>{
  setTimeout(()=>{
    document.getElementById('loader').classList.add('hidden');
  },2000);
});

// === CURSOR ===
const cur=document.getElementById('cursor');
const ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  cur.style.left=mx+'px';cur.style.top=my+'px';
});
function animRing(){
  rx+=(mx-rx)*0.12;
  ry+=(my-ry)*0.12;
  ring.style.left=rx+'px';ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,.skill-tab,.project-card,.ach-card,.contact-link').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cur.style.width='18px';cur.style.height='18px';
    ring.style.width='52px';ring.style.height='52px';
  });
  el.addEventListener('mouseleave',()=>{
    cur.style.width='10px';cur.style.height='10px';
    ring.style.width='36px';ring.style.height='36px';
  });
});

// === PARTICLES ===
const canvas=document.getElementById('bg-canvas');
const ctx=canvas.getContext('2d');
let W,H,particles=[];
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
resize();
window.addEventListener('resize',resize);
class Particle{
  constructor(){this.reset()}
  reset(){
    this.x=Math.random()*W;
    this.y=Math.random()*H;
    this.vx=(Math.random()-0.5)*0.3;
    this.vy=(Math.random()-0.5)*0.3;
    this.alpha=Math.random()*0.4+0.05;
    this.r=Math.random()*1.5+0.5;
  }
  update(){
    this.x+=this.vx;this.y+=this.vy;
    if(this.x<0||this.x>W||this.y<0||this.y>H)this.reset();
  }
  draw(){
    ctx.save();
    ctx.globalAlpha=this.alpha;
    ctx.fillStyle='#6366F1';
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
}
for(let i=0;i<80;i++)particles.push(new Particle());

// Connection lines
function drawConnections(){
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const dx=particles[i].x-particles[j].x;
      const dy=particles[i].y-particles[j].y;
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<140){
        ctx.save();
        ctx.globalAlpha=(1-dist/140)*0.06;
        ctx.strokeStyle='#6366F1';
        ctx.lineWidth=0.8;
        ctx.beginPath();
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

function animCanvas(){
  ctx.clearRect(0,0,W,H);
  particles.forEach(p=>{p.update();p.draw()});
  drawConnections();
  requestAnimationFrame(animCanvas);
}
animCanvas();

// === NAV SCROLL ===
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  if(window.scrollY>50)navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  // Active link
  const secs=['about','education','skills','projects','achievements','experience','contact'];
  let cur2='';
  secs.forEach(id=>{
    const el=document.getElementById(id);
    if(el&&window.scrollY>=el.offsetTop-200)cur2=id;
  });
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.classList.toggle('active',a.getAttribute('href')==='#'+cur2);
  });
});

// === HAMBURGER ===
function toggleMenu(){
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobile-menu').classList.toggle('open');
}
function closeMenu(){
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobile-menu').classList.remove('open');
}

// === TYPING ===
const phrases=['AI & ML Enthusiast','Full Stack Developer','CSE Student @ Mumbai','Problem Solver','Hackathon Enthusiast'];
let pi=0,ci=0,deleting=false;
const typingEl=document.getElementById('typing-text');
function type(){
  const phrase=phrases[pi];
  if(!deleting){
    typingEl.textContent=phrase.slice(0,ci+1);
    ci++;
    if(ci===phrase.length){setTimeout(()=>{deleting=true;setTimeout(type,400)},1800);return}
  }else{
    typingEl.textContent=phrase.slice(0,ci-1);
    ci--;
    if(ci===0){deleting=false;pi=(pi+1)%phrases.length}
  }
  setTimeout(type,deleting?50:90);
}
setTimeout(type,1200);

// === REVEAL ===
const revealEls=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      // Skill bars
      entry.target.querySelectorAll('.skill-fill').forEach(bar=>{
        setTimeout(()=>{bar.style.width=bar.dataset.pct+'%'},200);
      });
    }
  });
},{threshold:0.12});
revealEls.forEach(el=>observer.observe(el));
// Also observe skill cards themselves
document.querySelectorAll('.skill-card').forEach(card=>{
  const observer2=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const bar=e.target.querySelector('.skill-fill');
        if(bar)setTimeout(()=>{bar.style.width=bar.dataset.pct+'%'},300);
      }
    });
  },{threshold:0.3});
  observer2.observe(card);
});

// === COUNTER ===
const countEls=document.querySelectorAll('[data-count]');
const countObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const target=+e.target.dataset.count;
      let cur3=0;
      const timer=setInterval(()=>{
        cur3++;e.target.textContent=cur3+'+';
        if(cur3>=target)clearInterval(timer);
      },300);
      countObs.unobserve(e.target);
    }
  });
},{threshold:0.5});
countEls.forEach(el=>countObs.observe(el));

// === SKILLS FILTER ===
function filterSkills(cat,btn){
  document.querySelectorAll('.skill-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.skill-card').forEach(card=>{
    const show=cat==='all'||card.dataset.cat===cat;
    card.style.display=show?'block':'none';
  });
}

// === FORM ===
function handleFormSubmit(){
  const name=document.getElementById('form-name').value.trim();
  const email=document.getElementById('form-email').value.trim();
  const msg=document.getElementById('form-msg').value.trim();
  if(!name||!email||!msg){alert('Please fill in all fields.');return}
  const btn=document.querySelector('.form-submit');
  btn.textContent='Message Sent! ✓';
  btn.style.background='linear-gradient(135deg,#059669,#10b981)';
  setTimeout(()=>{
    btn.textContent='Send Message →';
    btn.style.background='';
    document.getElementById('form-name').value='';
    document.getElementById('form-email').value='';
    document.getElementById('form-msg').value='';
  },3000);
}

// === 3D TILT on project cards ===
document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const rect=card.getBoundingClientRect();
    const x=(e.clientX-rect.left)/rect.width-0.5;
    const y=(e.clientY-rect.top)/rect.height-0.5;
    card.style.transform=`translateY(-6px) rotateX(${-y*6}deg) rotateY(${x*6}deg)`;
    card.style.transition='transform 0.05s';
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='';
    card.style.transition='all 0.4s';
  });
});
