(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();document.documentElement.style.cssText="margin:0;padding:0;width:100%;height:100%;";document.body.style.cssText="margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:#0c0810;";const h=document.getElementById("root")??document.body;let m=0;const b=6e3,o=document.createElement("div");o.id="scrollContainer";o.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;overflow-y:scroll;z-index:1;";const u=document.createElement("div");u.style.height=b+"px";o.appendChild(u);h.appendChild(o);o.addEventListener("scroll",()=>{m=Math.min(o.scrollTop/(b-window.innerHeight),1),A(m)});const d=document.createElement("div");d.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;z-index:2;pointer-events:none;";d.innerHTML=`
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
    background: rgba(12, 8, 16, 0.82);
    border: 1px solid rgba(245, 240, 232, 0.07);
    border-radius: 4px;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    padding: clamp(32px, 4vw, 56px) clamp(28px, 4vw, 52px);
    width: min(680px, 90vw);
    pointer-events: none; /* enabled by JS when visible */
    box-shadow: 0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(245,240,232,0.04);
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
    color: rgba(245,240,232,0.62);
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
    color: rgba(245,240,232,0.32);
    letter-spacing: 0.1em; text-transform: uppercase;
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
    color: rgba(245,240,232,0.42); line-height: 1.55; margin: 0 0 10px;
  }
  .tags { display: flex; flex-wrap: wrap; gap: 4px; }
  .tag {
    font-family: 'Inter', sans-serif; font-size: 8px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: rgba(240,168,50,0.75); background: rgba(240,168,50,0.08);
    border: 1px solid rgba(240,168,50,0.15); border-radius: 2px; padding: 2px 6px;
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
    color: rgba(245,240,232,0.65);
    border: 1px solid rgba(245,240,232,0.1);
    border-radius: 3px; padding: 4px 11px;
    background: rgba(245,240,232,0.025);
    transition: border-color 0.2s, color 0.2s;
  }
  .sbadge:hover { border-color: rgba(240,168,50,0.25); color: #f5f0e8; }

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
    color: rgba(245,240,232,0.38); line-height: 1.6;
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
    <span class="hero-sub on" id="s0">AI Builder</span>
    <span class="hero-sub dn"  id="s1">GenAI Apps</span>
    <span class="hero-sub dn"  id="s2">Cloud × Automation</span>
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
    <h2 class="stitle">Builder by nature,<br><em>AI engineer by direction.</em></h2>
    <hr class="divider"/>
    <p class="about-body">My background spans <strong>product strategy, UI/UX, and growth</strong> across India and Dubai. Now I'm going deep on GenAI — building LLM apps, RAG pipelines, and agentic systems that go beyond notebooks and proofs of concept.<br><br>I bring something most AI engineers don't: I can build the intelligence <strong>and</strong> the experience around it.</p>
    <div class="stats-row">
      <div class="stat"><div class="stat-n">5+</div><div class="stat-l">AI Projects Shipped</div></div>
      <div class="stat"><div class="stat-n">2</div><div class="stat-l">Countries</div></div>
      <div class="stat"><div class="stat-n">MBA</div><div class="stat-l">Product Dev & Design Thinking</div></div>
    </div>
  </div>
</div>

<!-- PROJECTS -->
<div class="sec" id="secProjects">
  <div class="card" style="width:min(820px,92vw);">
    <p class="slabel">Selected Work</p>
    <h2 class="stitle">Projects</h2>
    <div class="pgrid">
      <a class="pcard" href="https://v0-critique-genius.vercel.app/" target="_blank">
        <p class="pcard-t">Critique Genius</p>
        <p class="pcard-d">AI feedback tool with prompt engineering and retrieval flow.</p>
        <div class="tags"><span class="tag">LLM</span><span class="tag">v0.dev</span><span class="tag">Vercel</span></div>
      </a>
      <a class="pcard" href="https://nextgen-two-eta.vercel.app/" target="_blank">
        <p class="pcard-t">NextGen</p>
        <p class="pcard-d">Text-to-speech, podcast generation and voice transcription.</p>
        <div class="tags"><span class="tag">Voice AI</span><span class="tag">Vercel</span></div>
      </a>
      <a class="pcard" href="https://gym-pilot.vercel.app/" target="_blank">
        <p class="pcard-t">Gym Pilot</p>
        <p class="pcard-d">AI fitness planner generating personalised workouts from goals.</p>
        <div class="tags"><span class="tag">GenAI</span><span class="tag">Vercel</span></div>
      </a>
      <a class="pcard" href="https://rk-glass.vercel.app/" target="_blank">
        <p class="pcard-t">RK Glass & Hardware</p>
        <p class="pcard-d">Premium B2B brand site for architects & contractors in Kerala.</p>
        <div class="tags"><span class="tag">Next.js</span><span class="tag">Vercel</span></div>
      </a>
      <div class="pcard" style="cursor:default;">
        <p class="pcard-t">WhatsApp GST Invoicer</p>
        <p class="pcard-d">Zero-cost invoice automation for Indian micro-businesses.</p>
        <div class="tags"><span class="tag">Meta Cloud API</span><span class="tag">Make.com</span></div>
        <p class="wip">◆ In Progress</p>
      </div>
      <a class="pcard" href="https://ishtyaqk.github.io/portfolio/" target="_blank">
        <p class="pcard-t">AI Learning Platform</p>
        <p class="pcard-d">Personalised learning platform concept built on Vertex AI.</p>
        <div class="tags"><span class="tag">Vertex AI</span><span class="tag">GCP</span></div>
      </a>
    </div>
  </div>
</div>

<!-- SKILLS -->
<div class="sec" id="secSkills">
  <div class="card">
    <p class="slabel">Capabilities</p>
    <h2 class="stitle">Tech Stack</h2>
    <hr class="divider"/>
    <div class="skill-groups">
      <div>
        <p class="sgt">AI / LLM</p>
        <div class="sbadges">
          <span class="sbadge">LangChain</span><span class="sbadge">LangGraph</span>
          <span class="sbadge">OpenAI API</span><span class="sbadge">Vertex AI</span>
          <span class="sbadge">RAG Pipelines</span><span class="sbadge">Prompt Engineering</span>
        </div>
      </div>
      <div>
        <p class="sgt">Cloud & Infra</p>
        <div class="sbadges">
          <span class="sbadge">AWS</span><span class="sbadge">Azure</span>
          <span class="sbadge">GCP</span><span class="sbadge">Vercel</span><span class="sbadge">Docker</span>
        </div>
      </div>
      <div>
        <p class="sgt">Automation & Build</p>
        <div class="sbadges">
          <span class="sbadge">Make.com</span><span class="sbadge">n8n</span>
          <span class="sbadge">Meta Cloud API</span><span class="sbadge">Bolt.new</span>
        </div>
      </div>
      <div>
        <p class="sgt">Product & Design</p>
        <div class="sbadges">
          <span class="sbadge">Figma</span><span class="sbadge">PRDs</span>
          <span class="sbadge">GTM Strategy</span><span class="sbadge">UI/UX Design</span>
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
`;h.appendChild(d);const y=document.getElementById("fairyWrap"),w=[[38,8],[42,6],[46,7],[50,5],[54,7],[58,6],[62,8],[36,14],[44,12],[52,11],[60,13],[66,15],[34,10],[48,9],[56,10],[40,16],[53,15],[63,12]];w.forEach(([t,a],n)=>{const r=document.createElement("div");r.className="fairy";const e=4+Math.random()*6;r.style.cssText=`
    width:${e}px;height:${e}px;
    left:${t+(Math.random()-.5)*3}%;
    top:${a+(Math.random()-.5)*2}%;
    --dur:${1.8+Math.random()*2}s;
    --delay:${Math.random()*2}s;
  `,y.appendChild(r)});const I=["AI Builder","GenAI Apps","Cloud × Automation"];let p=0;setInterval(()=>{const t=p;p=(p+1)%I.length;const a=document.getElementById("s"+t),n=document.getElementById("s"+p);!a||!n||(a.className="hero-sub up",n.className="hero-sub dn",requestAnimationFrame(()=>requestAnimationFrame(()=>{n.className="hero-sub on"})))},2800);const k=[{id:"secAbout",s:.13,e:.3},{id:"secProjects",s:.3,e:.5},{id:"secSkills",s:.5,e:.66},{id:"secExp",s:.66,e:.83},{id:"secContact",s:.83,e:1.01}];function A(t){const a=document.getElementById("heroContent"),n=document.getElementById("scrollInd"),r=document.getElementById("roomImg");if(a){const e=Math.max(0,1-t*9);a.style.opacity=e,a.style.transform=`translateY(${t*-30}px)`}if(n&&(n.style.opacity=String(Math.max(0,.4-t*7))),r){const e=t*60;r.style.transform=`translate(-50%, calc(-50% - ${e}px))`}k.forEach(({id:e,s,e:i})=>{const l=document.getElementById(e);if(!l)return;let c=0;if(t>=s&&t<i){const x=Math.min(1,(t-s)/.05),v=Math.min(1,(i-t)/.05);c=Math.min(x,v)}l.style.opacity=String(c);const g=c>.05,f=l.classList.contains("on");g&&!f?l.classList.add("on"):!g&&f&&l.classList.remove("on")})}
