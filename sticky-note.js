/* =====================================================================
   Sticky note pop-up
   ---------------------------------------------------------------------
   Each visit shows one random post-it from NOTES (never the same one
   twice in a row on the same device), once per visit, until SHOW_UNTIL passes. After
   that it does nothing, so it can stay in the site harmlessly.

   Add a note:   { text: "Your message" },
   Optional:     kicker: "small line on top",  kisses: true  (emoji flood)
   ===================================================================== */
(function () {
  var SHOW_UNTIL = "2026-10-23T00:00:00-06:00"; // end of Thu Oct 22, Mountain time (micro Wed, blood bank Thu)

  var NOTES = [
    { kicker: "Remember:", text: "You’re a bad ass bitch!" },
    { text: "Good luck on your test!" },
    { text: "I know you got this!" },
    { text: "I’m so proud of you!" },
    { text: "You deserve a thousand kisses for all your hard work", kisses: true },
    { text: "You know a blood banana when you see one 🍌" },
    { text: "Every bug on that slide is already in that brain." },
    { only: "2026-10-21", kicker: "Micro day!", text: "Go show those microbes who’s boss 🦠" },
    { only: "2026-10-22", kicker: "Blood bank day!", text: "Type, screen & crossmatch your way to an A+ 🩸" },
    { kicker: "Deep breath.", text: "You already did the hard part." },
    { text: "Water, snack, then go crush it." },
    { text: "Strawbz believes in you! 🍓" }
  ];

  // her colors: pink, purple, teal (paper, fold, ink)
  var PAPERS = [
    ['#ffd6ea', '#ffc2e0', '#f3a9cc', '#5a1440'],
    ['#e9dcff', '#d9c6ff', '#c2a8f2', '#3a1a66'],
    ['#d3f5ef', '#b9ece3', '#95dacd', '#11433d']
  ];

  if (Date.now() >= new Date(SHOW_UNTIL).getTime()) return;

  // once per visit: coming back from a test, the Test Lab, or a refresh won't pop it up again.
  // (A "visit" lasts until the browser tab is closed.)
  try { if (sessionStorage.getItem('snShown')) return; sessionStorage.setItem('snShown', '1'); } catch (_) {}

  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap';
  document.head.appendChild(font);

  var css = document.createElement('style');
  css.textContent =
    '.sn-veil{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:24px;' +
      'background:rgba(29,11,46,.35);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);animation:sn-fade .3s ease both}' +
    '.sn-note{position:relative;width:min(300px,82vw);aspect-ratio:1/1;padding:42px 26px 26px;box-sizing:border-box;' +
      'background:linear-gradient(170deg,var(--sn-a) 0%,var(--sn-b) 100%);color:var(--sn-ink);' +
      'font-family:Caveat,"Bradley Hand","Segoe Print","Comic Sans MS",cursive;' +
      'box-shadow:0 18px 30px -12px rgba(60,10,40,.45),0 2px 4px rgba(60,10,40,.15);' +
      'transform:rotate(var(--sn-tilt));animation:sn-drop .55s cubic-bezier(.2,1.4,.4,1) both;cursor:pointer;' +
      'display:flex;flex-direction:column;justify-content:center;text-align:center}' +
    '.sn-note::before{content:"";position:absolute;top:-12px;left:50%;width:96px;height:28px;margin-left:-48px;' +
      'background:rgba(255,255,255,.55);transform:rotate(2deg);box-shadow:0 1px 2px rgba(0,0,0,.08)}' +
    '.sn-note::after{content:"";position:absolute;right:0;bottom:0;width:34px;height:34px;' +
      'background:linear-gradient(135deg,var(--sn-fold) 50%,rgba(0,0,0,0) 50%);box-shadow:-2px -2px 4px rgba(60,10,40,.12)}' +
    '.sn-kicker{font-size:26px;font-weight:600;margin:0 0 6px;opacity:.85}' +
    '.sn-msg{font-size:36px;font-weight:700;line-height:1.05;margin:0;overflow-wrap:break-word}' +
    '.sn-msg.sn-long{font-size:31px}' +
    '.sn-heart{font-size:26px;margin-top:12px;color:#C93F80}' +
    '.sn-x{position:absolute;top:8px;right:10px;width:32px;height:32px;border:0;border-radius:50%;' +
      'background:transparent;color:inherit;font:700 22px/1 system-ui,sans-serif;cursor:pointer;opacity:.6}' +
    '.sn-x:hover,.sn-x:focus-visible{opacity:1;background:rgba(255,255,255,.4);outline:none}' +
    '.sn-hint{position:absolute;bottom:-34px;left:0;right:0;text-align:center;color:#fff;' +
      'font:500 13px/1.2 system-ui,sans-serif;text-shadow:0 1px 3px rgba(0,0,0,.4)}' +
    '.sn-out{animation:sn-fade .25s ease reverse both}' +
    '.sn-kiss{position:fixed;z-index:10000;bottom:-60px;pointer-events:none;line-height:1;' +
      'animation:sn-float var(--d) cubic-bezier(.3,.6,.5,1) var(--w) both}' +
    '@keyframes sn-fade{from{opacity:0}to{opacity:1}}' +
    '@keyframes sn-drop{from{opacity:0;transform:translateY(-60px) rotate(-12deg) scale(.9)}to{opacity:1;transform:rotate(var(--sn-tilt))}}' +
    '@keyframes sn-float{0%{transform:translate(0,0) rotate(0) scale(.6);opacity:0}' +
      '10%{opacity:1}50%{transform:translate(var(--x1),-55vh) rotate(var(--r)) scale(1)}' +
      '85%{opacity:1}100%{transform:translate(var(--x2),-115vh) rotate(calc(var(--r) * -1)) scale(1.1);opacity:0}}' +
    '@media (prefers-reduced-motion:reduce){.sn-veil,.sn-note,.sn-out{animation:none}.sn-kiss{display:none}}';
  document.head.appendChild(css);

  function pick() {
    // notes with only: "YYYY-MM-DD" show just on that day (Mountain time)
    var today = new Date(Date.now() - 6 * 3600 * 1000).toISOString().slice(0, 10);
    var pool = [];
    for (var j = 0; j < NOTES.length; j++) if (!NOTES[j].only || NOTES[j].only === today) pool.push(j);
    var last = -1;
    try { last = parseInt(localStorage.getItem('snLast'), 10); } catch (_) {}
    var i;
    do { i = pool[Math.floor(Math.random() * pool.length)]; } while (pool.length > 1 && i === last);
    try { localStorage.setItem('snLast', String(i)); } catch (_) {}
    return NOTES[i];
  }

  function kissFlood() {
    var faces = ['😘', '😘', '😘', '😘', '💋', '😘', '😚', '😘'];
    var n = window.innerWidth < 600 ? 60 : 100;
    for (var i = 0; i < n; i++) {
      var k = document.createElement('span');
      k.className = 'sn-kiss';
      k.textContent = faces[i % faces.length];
      k.setAttribute('aria-hidden', 'true');
      var drift = (Math.random() * 80 - 40);
      k.style.left = (Math.random() * 100) + 'vw';
      k.style.fontSize = (22 + Math.random() * 30) + 'px';
      k.style.setProperty('--d', (2.6 + Math.random() * 2.2) + 's');
      k.style.setProperty('--w', (Math.random() * 2.4) + 's');
      k.style.setProperty('--x1', drift + 'px');
      k.style.setProperty('--x2', (drift * 2 + Math.random() * 40 - 20) + 'px');
      k.style.setProperty('--r', (Math.random() * 50 - 25) + 'deg');
      document.body.appendChild(k);
      k.addEventListener('animationend', function () { if (this.parentNode) this.parentNode.removeChild(this); });
    }
  }

  function show() {
    var data = pick();
    var paper = PAPERS[Math.floor(Math.random() * PAPERS.length)];

    var veil = document.createElement('div');
    veil.className = 'sn-veil';
    veil.setAttribute('role', 'dialog');
    veil.setAttribute('aria-modal', 'true');
    veil.setAttribute('aria-label', (data.kicker ? data.kicker + ' ' : '') + data.text);

    var note = document.createElement('div');
    note.className = 'sn-note';
    note.style.setProperty('--sn-a', paper[0]);
    note.style.setProperty('--sn-b', paper[1]);
    note.style.setProperty('--sn-fold', paper[2]);
    note.style.setProperty('--sn-ink', paper[3]);
    note.style.setProperty('--sn-tilt', (Math.random() * 6 - 4).toFixed(1) + 'deg');

    if (data.kicker) {
      var k = document.createElement('p'); k.className = 'sn-kicker'; k.textContent = data.kicker; note.appendChild(k);
    }
    var p = document.createElement('p');
    p.className = 'sn-msg' + (data.text.length > 40 ? ' sn-long' : '');
    p.textContent = data.text;
    note.appendChild(p);
    var h = document.createElement('div'); h.className = 'sn-heart'; h.textContent = data.kisses ? '😘' : '♥'; h.setAttribute('aria-hidden', 'true'); note.appendChild(h);

    var x = document.createElement('button');
    x.className = 'sn-x'; x.type = 'button'; x.setAttribute('aria-label', 'Close'); x.textContent = '×';
    note.appendChild(x);

    var hint = document.createElement('div'); hint.className = 'sn-hint'; hint.textContent = 'tap anywhere to close';
    note.appendChild(hint);

    veil.appendChild(note);
    document.body.appendChild(veil);
    x.focus({ preventScroll: true });
    if (data.kisses) setTimeout(kissFlood, 350);

    function close() {
      document.removeEventListener('keydown', onKey);
      veil.classList.add('sn-out');
      setTimeout(function () { if (veil.parentNode) veil.parentNode.removeChild(veil); }, 260);
    }
    function onKey(e) { if (e.key === 'Escape' || e.key === 'Enter') close(); }
    veil.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show);
  else show();
})();
