(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();document.documentElement.style.cssText="margin:0;padding:0;width:100%;height:100%;";document.body.style.cssText="margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:#0c0810;";const h=document.getElementById("root")??document.body;let m=0;const b=6e3,i=document.createElement("div");i.id="scrollContainer";i.style.cssText=["position:fixed;top:0;left:0;width:100%;height:100%;","overflow-y:scroll;z-index:1;","-webkit-overflow-scrolling:touch;","overscroll-behavior:none;"].join("");const u=document.createElement("div");u.style.height=b+"px";i.appendChild(u);h.appendChild(i);i.addEventListener("scroll",()=>{m=Math.min(i.scrollTop/(b-window.innerHeight),1),A(m)});const d=document.createElement("div");d.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;z-index:2;pointer-events:none;";d.innerHTML=`
<style>
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  /* ── SCENE BACKGROUND ── */
  #scene {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: 0;
    overflow: hidden;
  }
  #roomImg {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    /* Tall portrait image — fill height, center horizontally */
    height: 100%;
    width: auto;
    min-width: 100%;
    object-fit: cover;
    object-position: center center;
    transition: transform 8s ease-out;
    will-change: transform;
  }
  /* Dark gradient wings — option B: blend sides to bg color */
  #scene::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(to right,  #0c0810 0%, transparent 22%, transparent 78%, #0c0810 100%),
      linear-gradient(to bottom, #0c0810 0%, transparent 8%,  transparent 88%, #0c0810 100%);
    z-index: 1;
    pointer-events: none;
  }
  /* Subtle dark scrim over the whole thing — keeps text legible */
  #scene::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(10, 7, 14, 0.42);
    z-index: 2;
    pointer-events: none;
    transition: opacity 0.8s;
  }

  /* ── FAIRY LIGHT TWINKLE ── */
  .fairy-wrap {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    z-index: 3;
    pointer-events: none;
    overflow: hidden;
  }
  .fairy {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, #ffe8a0 0%, #f0a832 40%, transparent 70%);
    animation: twinkle var(--dur, 2.4s) ease-in-out infinite var(--delay, 0s);
    opacity: 0;
  }
  @keyframes twinkle {
    0%, 100% { opacity: 0.15; transform: scale(0.8); }
    50%       { opacity: 0.9;  transform: scale(1.3); }
  }

  /* ── HERO TEXT ── */
  #heroContent {
    position: absolute;
    bottom: clamp(48px, 8vh, 90px);
    left: clamp(36px, 5vw, 80px);
    pointer-events: none;
    transition: opacity 0.5s, transform 0.5s;
    will-change: opacity, transform;
  }
  .hero-eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: clamp(10px, 1.1vw, 13px);
    font-weight: 400;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(240, 168, 50, 0.8);
    margin: 0 0 14px;
    opacity: 0;
    transform: translateY(12px);
    animation: slideUp 0.7s ease forwards 0.3s;
  }
  .hero-name {
    font-family: 'Lora', serif;
    font-size: clamp(48px, 6.5vw, 96px);
    font-weight: 700;
    color: #f5f0e8;
    line-height: 1.05;
    letter-spacing: -0.01em;
    margin: 0 0 18px;
    opacity: 0;
    transform: translateY(16px);
    animation: slideUp 0.7s ease forwards 0.5s;
  }
  .hero-sub-wrap {
    height: 28px;
    overflow: hidden;
    position: relative;
    opacity: 0;
    animation: fadeIn 0.5s ease forwards 0.9s;
  }
  .hero-sub {
    font-family: 'Inter', sans-serif;
    font-size: clamp(12px, 1.3vw, 16px);
    font-weight: 300;
    color: rgba(245, 240, 232, 0.55);
    letter-spacing: 0.06em;
    position: absolute;
    white-space: nowrap;
    transition: transform 0.65s cubic-bezier(0.65,0,0.35,1), opacity 0.65s;
  }
  .hero-sub.on  { transform: translateY(0);     opacity: 1; }
  .hero-sub.up  { transform: translateY(-100%); opacity: 0; }
  .hero-sub.dn  { transform: translateY(100%);  opacity: 0; }
  .hero-ctas {
    display: flex;
    gap: 12px;
    margin-top: 26px;
    opacity: 0;
    animation: slideUp 0.7s ease forwards 1.1s;
    pointer-events: all;
  }
  .btn-p {
    font-family: 'Inter', sans-serif;
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;
    padding: 10px 24px; border-radius: 2px;
    background: rgba(240,168,50,0.9); color: #0c0810;
    border: none; cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }
  .btn-p:hover { background: #f0a832; transform: translateY(-1px); }
  .btn-s {
    font-family: 'Inter', sans-serif;
    font-size: 11px; font-weight: 400;
    letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;
    padding: 10px 24px; border-radius: 2px;
    background: transparent; color: rgba(245,240,232,0.65);
    border: 1px solid rgba(245,240,232,0.18); cursor: pointer;
    transition: border-color 0.2s, color 0.2s, transform 0.2s;
  }
  .btn-s:hover { border-color: rgba(245,240,232,0.45); color: #f5f0e8; transform: translateY(-1px); }

  /* Scroll indicator */
  #scrollInd {
    position: absolute;
    bottom: clamp(28px,4vh,48px);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    opacity: 0;
    animation: fadeIn 1s ease forwards 1.5s;
    pointer-events: none;
    transition: opacity 0.4s;
  }
  #scrollInd span {
    font-family: 'Inter', sans-serif;
    font-size: 9px; letter-spacing: 0.18em;
    text-transform: uppercase; color: rgba(245,240,232,0.3);
  }
  .sline {
    width: 1px; height: 36px;
    background: linear-gradient(to bottom, rgba(240,168,50,0.5), transparent);
    animation: scrollPulse 2.2s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%,100% { opacity: 0.2; transform: scaleY(0.5); transform-origin: top; }
    50%      { opacity: 1;   transform: scaleY(1);   transform-origin: top; }
  }

  /* ── SHARED SECTION CARD ── */
  /*
    CRITICAL: .sec wrapper ALWAYS pointer-events:none.
    Only .card inside gets events when section is .on
  */
  .sec {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    opacity: 0;
    pointer-events: none; /* never changes */
  }
  .card {
    background: rgba(10, 6, 14, 0.93);
    border: 1px solid rgba(245, 240, 232, 0.12);
    border-radius: 4px;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    padding: clamp(32px, 4vw, 56px) clamp(28px, 4vw, 52px);
    width: min(680px, 90vw);
    pointer-events: none;
    touch-action: pan-y; /* mobile: allow vertical scroll to pass through */
    box-shadow: 0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(245,240,232,0.06);
  }
  .sec.on .card { pointer-events: all; }

  /* Staggered child reveal — children get class .revealed when section becomes .on */
  .card > * {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .sec.on .card > *:nth-child(1) { transition-delay: 0.05s; }
  .sec.on .card > *:nth-child(2) { transition-delay: 0.13s; }
  .sec.on .card > *:nth-child(3) { transition-delay: 0.21s; }
  .sec.on .card > *:nth-child(4) { transition-delay: 0.29s; }
  .sec.on .card > *:nth-child(5) { transition-delay: 0.37s; }
  .sec.on .card > * {
    opacity: 1;
    transform: translateY(0);
  }

  .slabel {
    font-family: 'Inter', sans-serif;
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(240,168,50,0.75);
    margin: 0 0 16px;
  }
  .stitle {
    font-family: 'Lora', serif;
    font-size: clamp(26px, 3.2vw, 44px);
    font-weight: 600; color: #f5f0e8;
    line-height: 1.15; margin: 0 0 24px;
  }
  .stitle em {
    font-style: italic;
    color: rgba(245,240,232,0.6);
  }
  .divider {
    width: 32px; height: 1px;
    background: rgba(240,168,50,0.4);
    margin: 0 0 24px;
    border: none;
  }

  /* ABOUT */
  .about-body {
    font-family: 'Inter', sans-serif;
    font-size: clamp(13px, 1.15vw, 15px);
    font-weight: 300;
    color: rgba(245,240,232,0.82);
    line-height: 1.85;
    margin: 0 0 28px;
  }
  .about-body strong { color: #f5f0e8; font-weight: 500; }
  .stats-row { display: flex; gap: 32px; flex-wrap: wrap; }
  .stat { display: flex; flex-direction: column; gap: 3px; }
  .stat-n {
    font-family: 'Lora', serif;
    font-size: clamp(22px, 2.5vw, 32px);
    font-weight: 700; color: #f5f0e8; line-height: 1;
  }
  .stat-l {
    font-family: 'Inter', sans-serif;
    font-size: 10px; font-weight: 400;
    color: rgba(245,240,232,0.48);
    letter-spacing: 0.1em; text-transform: uppercase;
  }
  .social-links {
    display: flex; gap: 8px; flex-wrap: wrap;
    margin-top: 24px;
  }
  .social-link {
    font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none;
    padding: 7px 16px; border-radius: 2px;
    color: rgba(245,240,232,0.65);
    border: 1px solid rgba(245,240,232,0.1);
    background: rgba(245,240,232,0.03);
    transition: all 0.2s;
  }
  .social-link:hover {
    border-color: rgba(240,168,50,0.4);
    color: #f5f0e8;
    background: rgba(240,168,50,0.06);
    transform: translateY(-1px);
  }

  /* PROJECTS */
  .pgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .pcard {
    border: 1px solid rgba(245,240,232,0.06);
    border-radius: 3px;
    padding: 16px 16px 14px;
    background: rgba(245,240,232,0.025);
    text-decoration: none; display: block;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
    position: relative; overflow: hidden;
  }
  .pcard::after {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(240,168,50,0.35), transparent);
    opacity: 0; transition: opacity 0.2s;
  }
  .pcard:hover { border-color: rgba(240,168,50,0.2); background: rgba(240,168,50,0.04); transform: translateY(-2px); }
  .pcard:hover::after { opacity: 1; }
  .pcard-t {
    font-family: 'Lora', serif;
    font-size: 14px; font-weight: 600; color: #f5f0e8; margin: 0 0 5px;
  }
  .pcard-d {
    font-family: 'Inter', sans-serif;
    font-size: 11px; font-weight: 300;
    color: rgba(245,240,232,0.62); line-height: 1.55; margin: 0 0 10px;
  }
  .tags { display: flex; flex-wrap: wrap; gap: 4px; }
  .tag {
    font-family: 'Inter', sans-serif; font-size: 8px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: rgba(240,168,50,0.9); background: rgba(240,168,50,0.1);
    border: 1px solid rgba(240,168,50,0.2); border-radius: 2px; padding: 2px 6px;
  }
  .wip {
    font-family: 'Inter', sans-serif; font-size: 9px;
    color: rgba(126,184,212,0.7); letter-spacing: 0.08em;
    text-transform: uppercase; margin-top: 8px;
  }

  /* SKILLS */
  .skill-groups { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 32px; }
  .sgt {
    font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(245,240,232,0.28); margin: 0 0 10px;
  }
  .sbadges { display: flex; flex-wrap: wrap; gap: 6px; }
  .sbadge {
    font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 400;
    color: rgba(245,240,232,0.85);
    border: 1px solid rgba(245,240,232,0.15);
    border-radius: 3px; padding: 4px 11px;
    background: rgba(245,240,232,0.05);
    transition: border-color 0.2s, color 0.2s;
  }
  .sbadge:hover { border-color: rgba(240,168,50,0.35); color: #f5f0e8; }

  /* EXPERIENCE */
  .tl { display: flex; flex-direction: column; gap: 24px; }
  .tli { display: grid; grid-template-columns: 110px 1fr; gap: 16px; }
  .tly {
    font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 400;
    color: rgba(245,240,232,0.22); letter-spacing: 0.06em;
    text-transform: uppercase; padding-top: 2px; line-height: 1.6;
  }
  .tlc { border-left: 1px solid rgba(245,240,232,0.07); padding-left: 18px; }
  .tlr {
    font-family: 'Lora', serif; font-size: 14px; font-weight: 600;
    color: #f5f0e8; margin: 0 0 3px;
  }
  .tlco {
    font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 400;
    color: rgba(240,168,50,0.7); margin: 0 0 6px;
  }
  .tld {
    font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 300;
    color: rgba(245,240,232,0.6); line-height: 1.6;
  }

  /* CONTACT */
  .contact-c { text-align: center; }
  .contact-c .stitle { margin-bottom: 8px; }
  .ctag {
    font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 300;
    color: rgba(245,240,232,0.38); margin: 0 0 30px; line-height: 1.6;
  }
  .clinks { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
  .clink {
    font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;
    padding: 10px 26px; border-radius: 2px;
    color: rgba(245,240,232,0.6);
    border: 1px solid rgba(245,240,232,0.1);
    transition: all 0.2s;
  }
  .clink:hover { border-color: rgba(240,168,50,0.35); color: #f5f0e8; transform: translateY(-1px); }
  .clink.prime { background: rgba(240,168,50,0.88); border-color: transparent; color: #0c0810; }
  .clink.prime:hover { background: #f0a832; }
  .otw {
    font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 400;
    color: rgba(245,240,232,0.2); letter-spacing: 0.1em;
    text-transform: uppercase; margin-top: 22px;
  }
  .dot {
    display: inline-block; width: 5px; height: 5px; border-radius: 50%;
    background: #22c55e; margin-right: 7px;
    animation: blink 2.2s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.2;} }

  /* ── KEYFRAMES ── */
  @keyframes slideUp {
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    to { opacity: 0.4; }
  }

  /* ── MOBILE ── */
  @media (max-width: 600px) {
    .pgrid { grid-template-columns: 1fr; }
    .skill-groups { grid-template-columns: 1fr; gap: 16px; }
    .tli { grid-template-columns: 80px 1fr; }
    .card { padding: 24px 20px; }
  }
</style>

<!-- BACKGROUND SCENE -->
<div id="scene">
  <img id="roomImg" src="./img.webp" alt="Ishtyaq's Lab" draggable="false" />
  <div class="fairy-wrap" id="fairyWrap"></div>
</div>

<!-- HERO -->
<div id="heroContent">
  <p class="hero-eyebrow">Portfolio · 2025</p>
  <h1 class="hero-name">Ishtyaq<br>Khan</h1>
  <div class="hero-sub-wrap">
    <span class="hero-sub on" id="s0">UI/UX Designer</span>
    <span class="hero-sub dn"  id="s1">Product Design</span>
    <span class="hero-sub dn"  id="s2">AI-Native Builder</span>
  </div>
  <div class="hero-ctas">
    <a class="btn-p" href="#" onclick="document.getElementById('scrollContainer').scrollTo({top:1200,behavior:'smooth'});return false;">Explore</a>
    <a class="btn-s" href="https://drive.google.com/file/d/16vrGIhaj0aPlaGR0w-Ez8NPdMpyFQ6te/view?usp=sharing" target="_blank">Download CV</a>
  </div>
</div>

<!-- SCROLL INDICATOR -->
<div id="scrollInd">
  <span>Scroll</span>
  <div class="sline"></div>
</div>

<!-- ABOUT -->
<div class="sec" id="secAbout">
  <div class="card">
    <p class="slabel">About</p>
    <h2 class="stitle">Designing with intent,<br><em>building with AI.</em></h2>
    <hr class="divider"/>
    <p class="about-body">I'm a <strong>UI/UX and Product Designer</strong> based in Bangalore with experience across India and Dubai. I craft interfaces that are thoughtful, purposeful, and grounded in real user needs — from brand identities and app redesigns to full product workflows.<br><br>What sets me apart: I also <strong>build</strong>. I ship AI-powered tools, automate workflows, and understand the technical side well enough to design for it — not just hand off to it.</p>
    <div class="stats-row">
      <div class="stat"><div class="stat-n">8+</div><div class="stat-l">Design Projects</div></div>
      <div class="stat"><div class="stat-n">2</div><div class="stat-l">Countries</div></div>
      <div class="stat"><div class="stat-n">MBA</div><div class="stat-l">Product Dev & Design Thinking</div></div>
    </div>
    <div class="social-links">
      <a class="social-link" href="https://www.behance.net/ishtyaqkhan1" target="_blank">Behance</a>
      <a class="social-link" href="https://www.linkedin.com/in/ishtyaqk/" target="_blank">LinkedIn</a>
      <a class="social-link" href="https://github.com/Ishtyaqk" target="_blank">GitHub</a>
      <a class="social-link" href="mailto:ishtyaq15@gmail.com">Email</a>
    </div>
  </div>
</div>

<!-- PROJECTS -->
<div class="sec" id="secProjects">
  <div class="card" style="width:min(860px,92vw);">
    <p class="slabel">Selected Work</p>
    <h2 class="stitle">Projects</h2>
    <div class="pgrid">
      <a class="pcard" href="https://www.behance.net/gallery/227526373/Rang-Kaarwan-Redesign" target="_blank">
        <p class="pcard-t">Rang Kaarwan Redesign</p>
        <p class="pcard-d">Full UX redesign of a creative arts platform — improved navigation, hierarchy, and visual language.</p>
        <div class="tags"><span class="tag">UI/UX</span><span class="tag">Figma</span><span class="tag">Redesign</span></div>
      </a>
      <a class="pcard" href="https://www.behance.net/gallery/227082789/Wrinkle-Rescue" target="_blank">
        <p class="pcard-t">Wrinkle Rescue</p>
        <p class="pcard-d">Brand and product design for a skincare concept — visual identity, packaging direction, and UI.</p>
        <div class="tags"><span class="tag">Branding</span><span class="tag">Product Design</span></div>
      </a>
      <a class="pcard" href="https://www.behance.net/gallery/207820071/Redefined-tool-for-Invoicing" target="_blank">
        <p class="pcard-t">Invoicing Tool Redesign</p>
        <p class="pcard-d">Reimagined invoicing UX for small businesses — simplified flows and a cleaner dashboard.</p>
        <div class="tags"><span class="tag">UI/UX</span><span class="tag">Dashboard</span><span class="tag">Figma</span></div>
      </a>
      <a class="pcard" href="https://rk-glass.vercel.app/" target="_blank">
        <p class="pcard-t">RK Glass & Hardware</p>
        <p class="pcard-d">Premium B2B brand site for architects & contractors in Kerala — dark luxury aesthetic.</p>
        <div class="tags"><span class="tag">Web Design</span><span class="tag">Next.js</span><span class="tag">Vercel</span></div>
      </a>
      <a class="pcard" href="https://v0-critique-genius.vercel.app/" target="_blank">
        <p class="pcard-t">Critique Genius</p>
        <p class="pcard-d">AI feedback tool — designed the UX flow and built it with prompt engineering.</p>
        <div class="tags"><span class="tag">AI Product</span><span class="tag">UX</span><span class="tag">LLM</span></div>
      </a>
      <a class="pcard" href="https://careerai-one.vercel.app/" target="_blank">
        <p class="pcard-t">AI Learning Platform</p>
        <p class="pcard-d">Personalised learning platform concept — product design and frontend built on Vertex AI.</p>
        <div class="tags"><span class="tag">Product Design</span><span class="tag">Vertex AI</span></div>
      </a>
      <a class="pcard" href="https://nextgen-two-eta.vercel.app/" target="_blank">
        <p class="pcard-t">NextGen</p>
        <p class="pcard-d">Text-to-speech, podcast generation and voice transcription app.</p>
        <div class="tags"><span class="tag">Voice AI</span><span class="tag">Vercel</span></div>
      </a>
      <a class="pcard" href="https://automated-invoice-bot.vercel.app/" target="_blank">
        <p class="pcard-t">Telegram Invoicer</p>
        <p class="pcard-d">Zero-cost invoice automation for Indian micro-businesses via Telegram.</p>
        <div class="tags"><span class="tag">Telegram API</span><span class="tag">Make.com</span></div>
        <p class="wip">◆ In Progress</p>
      </a>
    </div>
  </div>
</div>

<!-- SKILLS -->
<div class="sec" id="secSkills">
  <div class="card">
    <p class="slabel">Capabilities</p>
    <h2 class="stitle">Skills & Tools</h2>
    <hr class="divider"/>
    <div class="skill-groups">
      <div>
        <p class="sgt">Design</p>
        <div class="sbadges">
          <span class="sbadge">Figma</span><span class="sbadge">UI/UX Design</span>
          <span class="sbadge">Visual Design</span><span class="sbadge">Prototyping</span>
          <span class="sbadge">Design Systems</span><span class="sbadge">User Research</span>
        </div>
      </div>
      <div>
        <p class="sgt">Product</p>
        <div class="sbadges">
          <span class="sbadge">PRDs</span><span class="sbadge">GTM Strategy</span>
          <span class="sbadge">Product Roadmaps</span><span class="sbadge">Growth</span>
        </div>
      </div>
      <div>
        <p class="sgt">AI & Build</p>
        <div class="sbadges">
          <span class="sbadge">LangChain</span><span class="sbadge">OpenAI API</span>
          <span class="sbadge">Vertex AI</span><span class="sbadge">RAG Pipelines</span>
          <span class="sbadge">Prompt Engineering</span>
        </div>
      </div>
      <div>
        <p class="sgt">Cloud & Automation</p>
        <div class="sbadges">
          <span class="sbadge">AWS</span><span class="sbadge">Vercel</span>
          <span class="sbadge">Make.com</span><span class="sbadge">n8n</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- EXPERIENCE -->
<div class="sec" id="secExp">
  <div class="card">
    <p class="slabel">Experience</p>
    <h2 class="stitle">Where I've<br>worked</h2>
    <hr class="divider"/>
    <div class="tl">
      <div class="tli">
        <div class="tly">Dec 2025 —<br>Present</div>
        <div class="tlc">
          <p class="tlr">Business Development Intern</p>
          <p class="tlco">Mirai Labs · Bangalore</p>
          <p class="tld">Supporting GTM for Cloud, AI, and App Modernization.</p>
        </div>
      </div>
      <div class="tli">
        <div class="tly">Aug–Nov<br>2024</div>
        <div class="tlc">
          <p class="tlr">Product Strategy & Experience Consultant</p>
          <p class="tlco">Noor Arabian · Dubai, UAE</p>
          <p class="tld">Led product strategy and UX redesign — 15% engagement lift.</p>
        </div>
      </div>
      <div class="tli">
        <div class="tly">Apr 2023 —<br>Apr 2024</div>
        <div class="tlc">
          <p class="tlr">Product Design & Growth Lead</p>
          <p class="tlco">Topbeat · Mumbai</p>
          <p class="tld">Drove design and growth across digital touchpoints — 5% conversion lift.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- CONTACT -->
<div class="sec" id="secContact">
  <div class="card contact-c">
    <p class="slabel">Get In Touch</p>
    <h2 class="stitle">Let's build<br>something.</h2>
    <hr class="divider" style="margin:0 auto 20px;"/>
    <p class="ctag">Open to AI/GenAI internship opportunities<br>and interesting collaborations.</p>
    <div class="clinks">
      <a class="clink prime" href="https://www.linkedin.com/in/ishtyaqk/" target="_blank">LinkedIn</a>
      <a class="clink" href="mailto:ishtyaq15@gmail.com">Email</a>
      <a class="clink" href="https://github.com/Ishtyaqk" target="_blank">GitHub</a>
    </div>
    <p class="otw"><span class="dot"></span>Open to opportunities · Bangalore</p>
  </div>
</div>
`;h.appendChild(d);const w=document.getElementById("fairyWrap"),I=[[38,8],[42,6],[46,7],[50,5],[54,7],[58,6],[62,8],[36,14],[44,12],[52,11],[60,13],[66,15],[34,10],[48,9],[56,10],[40,16],[53,15],[63,12]];I.forEach(([e,t],n)=>{const r=document.createElement("div");r.className="fairy";const a=4+Math.random()*6;r.style.cssText=`
    width:${a}px;height:${a}px;
    left:${e+(Math.random()-.5)*3}%;
    top:${t+(Math.random()-.5)*2}%;
    --dur:${1.8+Math.random()*2}s;
    --delay:${Math.random()*2}s;
  `,w.appendChild(r)});const k=["UI/UX Designer","Product Design","AI-Native Builder"];let c=0;setInterval(()=>{const e=c;c=(c+1)%k.length;const t=document.getElementById("s"+e),n=document.getElementById("s"+c);!t||!n||(t.className="hero-sub up",n.className="hero-sub dn",requestAnimationFrame(()=>requestAnimationFrame(()=>{n.className="hero-sub on"})))},2800);const E=[{id:"secAbout",s:.13,e:.3,noFadeOut:!1},{id:"secProjects",s:.3,e:.5,noFadeOut:!1},{id:"secSkills",s:.5,e:.66,noFadeOut:!1},{id:"secExp",s:.66,e:.83,noFadeOut:!1},{id:"secContact",s:.83,e:1.01,noFadeOut:!0}];function A(e){const t=document.getElementById("heroContent"),n=document.getElementById("scrollInd"),r=document.getElementById("roomImg");if(t){const a=Math.max(0,1-e*9);t.style.opacity=a,t.style.transform=`translateY(${e*-30}px)`}if(n&&(n.style.opacity=String(Math.max(0,.4-e*7))),r){const a=e*60;r.style.transform=`translate(-50%, calc(-50% - ${a}px))`}E.forEach(({id:a,s,e:o,noFadeOut:x})=>{const l=document.getElementById(a);if(!l)return;let p=0;if(e>=s){const v=Math.min(1,(e-s)/.05),y=x?1:Math.min(1,(o-e)/.05);p=Math.min(v,y)}l.style.opacity=String(p);const g=p>.05,f=l.classList.contains("on");g&&!f?l.classList.add("on"):!g&&f&&l.classList.remove("on")})}
