// Gotham Immersive Script - météo, bruitages, bulles comics, night vision, easter eggs
(function gothamImmersion(){
  // --- STATE ---
  let mute = localStorage.getItem('gothamMute') === '1';
  let nightVision = false;
  let keyBuffer = '';
  // --- AUDIO ---
  const sounds = {
    batarang: new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae4e0.mp3'), // bruitage libre
    batmobile: new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_115b5c7d7e.mp3'),
    batsignal: new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_115b5c7d7e.mp3'),
    thunder: new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_115b5c7d7e.mp3')
  };
  Object.values(sounds).forEach(a=>{a.volume=0.45;});
  function playSound(name){
    if(mute) return;
    if(sounds[name]) { sounds[name].currentTime=0; sounds[name].play(); }
  }
  // --- MUTE BUTTON ---
  const muteBtn = document.createElement('button');
  muteBtn.innerHTML = mute ? '🔇 Mute Gotham' : '🔊 Mute Gotham';
  muteBtn.setAttribute('aria-label','Désactiver ou activer les bruitages Gotham');
  muteBtn.style.position = 'fixed';
  muteBtn.style.bottom = '2.2em';
  muteBtn.style.left = '2.2em';
  muteBtn.style.zIndex = '120';
  muteBtn.style.background = '#181818cc';
  muteBtn.style.color = '#ffe600';
  muteBtn.style.border = '2px solid #ffe600';
  muteBtn.style.borderRadius = '26px';
  muteBtn.style.fontWeight = '700';
  muteBtn.style.padding = '0.6em 1.2em';
  muteBtn.style.cursor = 'pointer';
  muteBtn.onfocus = function(){this.style.outline='2px solid #ffe600';};
  muteBtn.onblur = function(){this.style.outline='none';};
  muteBtn.onclick = function(){
    mute = !mute;
    localStorage.setItem('gothamMute', mute?'1':'0');
    muteBtn.innerHTML = mute ? '🔇 Mute Gotham' : '🔊 Mute Gotham';
  };
  document.body.appendChild(muteBtn);

  // --- NIGHT VISION BUTTON ---
  const nvBtn = document.createElement('button');
  nvBtn.innerHTML = '🟢 Night Vision';
  nvBtn.setAttribute('aria-label','Activer/Désactiver la vision nocturne façon Batcomputer');
  nvBtn.style.position = 'fixed';
  nvBtn.style.bottom = '6em';
  nvBtn.style.left = '2.2em';
  nvBtn.style.zIndex = '120';
  nvBtn.style.background = '#181818cc';
  nvBtn.style.color = '#6cff65';
  nvBtn.style.border = '2px solid #6cff65';
  nvBtn.style.borderRadius = '26px';
  nvBtn.style.fontWeight = '700';
  nvBtn.style.padding = '0.6em 1.2em';
  nvBtn.style.cursor = 'pointer';
  nvBtn.onfocus = function(){this.style.outline='2px solid #6cff65';};
  nvBtn.onblur = function(){this.style.outline='none';};
  nvBtn.onclick = function(){
    nightVision = !nightVision;
    document.body.classList.toggle('night-vision', nightVision);
    nvBtn.innerHTML = nightVision ? '🟢 Night Vision ON' : '🟢 Night Vision';
  };
  document.body.appendChild(nvBtn);

  // --- EFFET PLUIE + ÉCLAIRS ---
  const rainCanvas = document.createElement('canvas');
  rainCanvas.id = 'gotham-rain';
  rainCanvas.style.position = 'fixed';
  rainCanvas.style.top = '0';
  rainCanvas.style.left = '0';
  rainCanvas.style.width = '100vw';
  rainCanvas.style.height = '100vh';
  rainCanvas.style.pointerEvents = 'none';
  rainCanvas.style.zIndex = '99';
  document.body.appendChild(rainCanvas);
  let ctx, drops = [], W, H, rainActive = true;
  function resize(){
    W = window.innerWidth; H = window.innerHeight;
    rainCanvas.width = W; rainCanvas.height = H;
  }
  function createDrop(){
    return {
      x: Math.random()*W,
      y: Math.random()*H,
      l: Math.random()*18+12,
      xs: Math.random()*2-1,
      ys: Math.random()*12+12
    };
  }
  function draw(){
    if(!rainActive) return;
    ctx.clearRect(0,0,W,H);
    ctx.strokeStyle = '#ffe60055';
    ctx.lineWidth = 1.2;
    ctx.lineCap = 'round';
    for(let i=0;i<drops.length;i++){
      let d = drops[i];
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x+d.xs, d.y+d.l);
      ctx.stroke();
      d.x += d.xs; d.y += d.ys;
      if(d.y > H) drops[i] = createDrop();
    }
    requestAnimationFrame(draw);
  }
  function startRain(){ rainActive = true; draw(); }
  function stopRain(){ rainActive = false; ctx.clearRect(0,0,W,H); }
  function toggleRain(){
    if(rainActive){ stopRain(); rainCanvas.style.display = 'none'; } 
    else { rainCanvas.style.display = 'block'; startRain(); }
  }
  window.addEventListener('resize', resize);
  ctx = rainCanvas.getContext('2d');
  resize();
  drops = Array.from({length: Math.floor(W/16)}, createDrop);
  startRain();
  // Toggle bouton
  const rainBtn = document.createElement('button');
  rainBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 22 22"><ellipse cx="11" cy="13" rx="8" ry="6" fill="#232323"/><rect x="6" y="5" width="10" height="4" rx="2" fill="#ffe600"/></svg> Pluie Gotham';
  rainBtn.setAttribute('aria-label','Activer/Désactiver la pluie Gotham');
  rainBtn.style.position = 'fixed';
  rainBtn.style.bottom = '2.2em';
  rainBtn.style.right = '2.2em';
  rainBtn.style.zIndex = '120';
  rainBtn.style.background = '#181818cc';
  rainBtn.style.color = '#ffe600';
  rainBtn.style.border = '2px solid #ffe600';
  rainBtn.style.borderRadius = '26px';
  rainBtn.style.fontWeight = '700';
  rainBtn.style.padding = '0.6em 1.2em';
  rainBtn.style.cursor = 'pointer';
  rainBtn.onfocus = function(){this.style.outline='2px solid #ffe600';};
  rainBtn.onblur = function(){this.style.outline='none';};
  rainBtn.onclick = toggleRain;
  document.body.appendChild(rainBtn);
  // Eclair automatique
  setInterval(()=>{
    if(!rainActive) return;
    if(Math.random()<0.18){
      flashThunder();
      playSound('thunder');
    }
  }, 4200);
  function flashThunder(){
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100vw';
    flash.style.height = '100vh';
    flash.style.background = '#fff';
    flash.style.opacity = '0.82';
    flash.style.zIndex = '130';
    flash.style.pointerEvents = 'none';
    document.body.appendChild(flash);
    setTimeout(()=>{flash.style.opacity='0';}, 120);
    setTimeout(()=>{flash.remove();}, 400);
  }

  // --- BATMOBILE ANIMÉE ---
  const batmobile = document.createElement('div');
  batmobile.innerHTML = '<svg width="120" height="32" viewBox="0 0 120 32"><rect x="10" y="16" width="70" height="10" rx="5" fill="#232323"/><ellipse cx="25" cy="28" rx="7" ry="4" fill="#ffe600"/><ellipse cx="65" cy="28" rx="7" ry="4" fill="#ffe600"/><rect x="80" y="18" width="30" height="6" rx="3" fill="#ffe600"/><rect x="100" y="10" width="16" height="6" rx="3" fill="#232323"/></svg>';
  batmobile.style.position = 'fixed';
  batmobile.style.left = '-140px';
  batmobile.style.bottom = '1.2em';
  batmobile.style.zIndex = '120';
  batmobile.style.transition = 'left 1.8s cubic-bezier(.68,-0.55,.27,1.55)';
  batmobile.setAttribute('aria-label','Animation Batmobile');
  document.body.appendChild(batmobile);
  let triggered = false;
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 80 && !triggered){
      triggered = true;
      batmobile.style.left = 'calc(100vw - 140px)';
      playSound('batmobile');
      showBubble('BAM!');
      setTimeout(()=>{
        batmobile.style.left = '-140px';
        triggered = false;
      }, 2200);
    }
  });

  // --- BAT-SIGNAL INTERACTIF ---
  setTimeout(()=>{
    const batsignal = document.querySelector('div[style*="bat-signal"] svg');
    if(!batsignal) return;
    batsignal.style.cursor = 'pointer';
    batsignal.setAttribute('aria-label','Allumer le Bat-Signal');
    batsignal.onclick = function(){
      batsignal.style.filter = 'drop-shadow(0 0 24px #ffe600cc)';
      batsignal.style.opacity = '1';
      playSound('batsignal');
      showBubble('POW!');
      setTimeout(()=>{
        batsignal.style.filter = '';
        batsignal.style.opacity = '0.5';
      }, 1400);
    };
  }, 1200);

  // --- BULLES COMICS DYNAMIQUES ---
  function showBubble(txt){
    const bubble = document.createElement('div');
    bubble.className = 'comic-bubble-dyn';
    bubble.innerHTML = `<svg width="120" height="60" viewBox="0 0 120 60"><polygon points="10,30 20,10 40,15 50,2 65,18 85,5 90,25 110,30 90,35 100,55 80,50 70,58 55,42 35,55 30,35 10,30" fill="#ffe600" stroke="#232323" stroke-width="3"/><text x="50%" y="60%" text-anchor="middle" fill="#232323" font-size="20" font-family="Impact, Arial Black, Montserrat Black, Arial, sans-serif" dy=".3em">${txt}</text></svg>`;
    bubble.style.position = 'fixed';
    bubble.style.left = (window.innerWidth/2-60+Math.random()*40-20)+'px';
    bubble.style.top = (window.innerHeight/2-30+Math.random()*40-20)+'px';
    bubble.style.zIndex = '200';
    bubble.style.pointerEvents = 'none';
    document.body.appendChild(bubble);
    setTimeout(()=>{bubble.style.opacity='0';}, 700);
    setTimeout(()=>{bubble.remove();}, 1200);
  }
  // Actions clés
  document.addEventListener('click', (e)=>{
    if(e.target.closest('button, a, .bat-icon')){
      playSound('batarang');
      showBubble(['POW!','BAM!','WOW!'][Math.floor(Math.random()*3)]);
    }
  });
  // Formulaire Bat-Signal
  const form = document.querySelector('.batsignal-form form');
  if(form){
    form.addEventListener('submit', ()=>{
      playSound('batsignal');
      showBubble('WOW!');
    });
  }

  // --- NIGHT VISION (Batcomputer) ---
  const style = document.createElement('style');
  style.innerHTML = `
  body.night-vision {
    background: #0c1e0c !important;
    color: #6cff65 !important;
    filter: contrast(1.2) brightness(0.8) hue-rotate(70deg) saturate(1.2);
    font-family: 'Fira Mono', 'Fira Code', 'Consolas', monospace !important;
  }
  body.night-vision .bat-icon svg, body.night-vision .badge, body.night-vision .cta-main {
    filter: drop-shadow(0 0 10px #6cff65cc) !important;
    color: #6cff65 !important;
    background: #0c1e0c !important;
    border-color: #6cff65 !important;
  }
  body.night-vision .navbar, body.night-vision .glass-nav {
    background: #0c1e0c !important;
    border-bottom: 3px solid #6cff65 !important;
    box-shadow: 0 8px 32px #6cff6544, 0 2px 0 #6cff65;
  }
  body.night-vision a, body.night-vision h1, body.night-vision h2, body.night-vision h3 {
    color: #6cff65 !important;
    text-shadow: 0 2px 8px #6cff6544;
  }
  body.night-vision input, body.night-vision textarea {
    background: #0c1e0c !important;
    color: #6cff65 !important;
    border: 1.5px solid #6cff65 !important;
  }
  `;
  document.head.appendChild(style);

  // --- MINI-JEU CLAVIER ---
  document.addEventListener('keydown', (e)=>{
    if(!e.key) return;
    keyBuffer += e.key.toLowerCase();
    if(keyBuffer.length > 8) keyBuffer = keyBuffer.slice(-8);
    if(keyBuffer.endsWith('batman')){
      showBatmanSecret();
      keyBuffer = '';
    }
  });
  function showBatmanSecret(){
    const logo = document.createElement('div');
    logo.innerHTML = '<svg width="220" height="90" viewBox="0 0 220 90"><ellipse cx="110" cy="45" rx="100" ry="40" fill="#181818"/><path d="M20 65 Q110 10 200 65 Q170 40 110 50 Q50 40 20 65 Z" fill="#ffe600" stroke="#232323" stroke-width="3"/><ellipse cx="110" cy="55" rx="18" ry="7" fill="#232323"/></svg>';
    logo.style.position = 'fixed';
    logo.style.left = '50%';
    logo.style.top = '45%';
    logo.style.transform = 'translate(-50%,-50%) scale(1.1)';
    logo.style.zIndex = '300';
    logo.style.transition = 'opacity 1.2s';
    document.body.appendChild(logo);
    playSound('batsignal');
    setTimeout(()=>{logo.style.opacity='0';}, 1800);
    setTimeout(()=>{logo.remove();}, 2800);
    // Cape sweep transition
    const cape = document.createElement('div');
    cape.style.position = 'fixed';
    cape.style.top = '0';
    cape.style.left = '0';
    cape.style.width = '100vw';
    cape.style.height = '100vh';
    cape.style.background = 'linear-gradient(100deg,#181818 60%,#232323 100%)';
    cape.style.zIndex = '299';
    cape.style.opacity = '0.94';
    cape.style.pointerEvents = 'none';
    document.body.appendChild(cape);
    setTimeout(()=>{cape.style.opacity='0';}, 900);
    setTimeout(()=>{cape.remove();}, 1800);
  }

  // --- ACCESSIBILITÉ ---
  // Focus visible sur tous les boutons
  document.addEventListener('focusin', (e)=>{
    if(e.target.tagName==='BUTTON'||e.target.tagName==='A'){
      e.target.style.outline = '2px solid #ffe600';
    }
  });
  document.addEventListener('focusout', (e)=>{
    if(e.target.tagName==='BUTTON'||e.target.tagName==='A'){
      e.target.style.outline = 'none';
    }
  });
  // ARIA sur icônes dynamiques
  setTimeout(()=>{
    document.querySelectorAll('.bat-icon svg').forEach(svg=>{
      svg.setAttribute('aria-label','Icône Batman décorative');
      svg.setAttribute('role','img');
    });
  }, 800);

})();
