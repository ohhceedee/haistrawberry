/* HaiStrawberry brain breaks.

   What this file does:
   1. When a deck is finished, confetti falls, a kind message appears, and
      Strawbz parachutes down holding a "YAY!" sign, then runs off screen.
   2. Tapping Strawbz catches him. A small badge in the corner counts 1/3, 2/3.
   3. On the third catch a popup offers "Take a brain break" or "Keep going".
   4. A brain break is one of six mini games, each at most a minute long,
      with an X in the top corner to leave at any time.

   app.js tells this file when a deck is finished. Nothing here changes
   study progress.

   Testing shortcuts (type the whole address, for example
   haistrawberry.com/?break=party):
     ?break=party    show the deck celebration
     ?break=popup    show the popup
     ?break=1 to 6   open that mini game
*/
(function () {
  'use strict';

  /* ===============================================================
     SETTINGS  (safe to edit)
  ================================================================ */
  var CATCHES_NEEDED = 3;  // catches before the popup appears
  var GAME_SECONDS = 60;   // longest a mini game can last
  var AFFIRMATIONS = [
    'Deck complete! You are crushing it.',
    'Look at you go. That brain is growing.',
    'Another deck down. Nicely done.',
    'You showed up and did the work.',
    'That is how it is done!',
    'One deck closer to acing that exam.',
    'Smart, stubborn, and unstoppable.',
    'Your future patients are lucky.',
    'Deck done. You make this look easy.',
    'Keep it up. You have got this.'
  ];

  /* ===============================================================
     SMALL HELPERS
  ================================================================ */
  function sget(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } }
  function sset(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function el(tag, cls, txt) { var n = document.createElement(tag); if (cls) n.className = cls; if (txt) n.textContent = txt; return n; }
  function gone(n) { if (n && n.parentNode) n.parentNode.removeChild(n); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function lerp(a, b, u) { return a + (b - a) * u; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function getCount() { return clamp(parseInt(sget('bb:catches', '0'), 10) || 0, 0, CATCHES_NEEDED); }
  function setCount(n) { sset('bb:catches', String(n)); paintBadge(); }

  /* ===============================================================
     STYLES  (added to the page automatically)
  ================================================================ */
  var css = document.createElement('style');
  css.textContent = [
    '.bb-badge{position:fixed;left:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:15;display:flex;align-items:center;gap:6px;padding:5px 11px 5px 6px;border-radius:999px;background:var(--surface,#fff);color:var(--ink,#1F2433);border:1px solid var(--line,#D6E0DD);font:600 .8rem var(--mono,monospace);box-shadow:0 2px 8px rgba(0,0,0,.12)}',
    '.bb-badge canvas{width:24px;height:24px;image-rendering:pixelated}',
    '.bb-badge.bump{animation:bb-bump .5s}',
    '@keyframes bb-bump{30%{transform:scale(1.3)}}',
    '.bb-party{position:fixed;inset:0;z-index:9000;pointer-events:none;overflow:hidden}',
    '.bb-confetti{position:absolute;inset:0;width:100%;height:100%}',
    '.bb-cheer{position:absolute;left:50%;top:16%;transform:translateX(-50%);width:max-content;max-width:min(88vw,520px);padding:14px 20px;border-radius:16px;background:var(--surface,#fff);color:var(--ink,#1F2433);border:2px solid var(--accent,#C93F80);font:400 1.35rem/1.25 var(--display,Georgia,serif);text-align:center;box-shadow:0 8px 30px rgba(0,0,0,.2);animation:bb-pop .45s cubic-bezier(.2,1.4,.4,1);transition:opacity .5s}',
    '@keyframes bb-pop{from{transform:translateX(-50%) scale(.6);opacity:0}}',
    '.bb-guy{position:absolute;left:0;top:0;pointer-events:auto;cursor:pointer;image-rendering:pixelated;touch-action:manipulation;-webkit-tap-highlight-color:transparent;outline:none}',
    '.bb-back{position:fixed;inset:0;z-index:9500;background:rgba(20,10,30,.55);display:grid;place-items:center;padding:20px}',
    '.bb-card{width:min(100%,380px);padding:26px 22px 22px;border-radius:20px;background:var(--surface,#fff);color:var(--ink,#1F2433);text-align:center;box-shadow:0 16px 50px rgba(0,0,0,.35);animation:bb-rise .35s cubic-bezier(.2,1.3,.4,1)}',
    '@keyframes bb-rise{from{transform:translateY(16px) scale(.94);opacity:0}}',
    '.bb-card canvas{width:64px;height:64px;image-rendering:pixelated;margin:0 auto 6px;display:block}',
    '.bb-card h2{font:400 1.7rem/1.15 var(--display,Georgia,serif);margin:0 0 8px}',
    '.bb-card p{margin:0 0 18px;color:var(--muted,#5C6675);font:400 1rem/1.4 var(--body,system-ui,sans-serif)}',
    '.bb-btn{display:block;width:100%;padding:13px 16px;border-radius:12px;border:0;background:var(--accent,#C93F80);color:var(--accent-ink,#fff);font:600 1rem var(--body,system-ui,sans-serif);cursor:pointer}',
    '.bb-btn+.bb-btn{margin-top:10px}',
    '.bb-btn.alt{background:transparent;color:var(--ink,#1F2433);border:1px solid var(--line,#D6E0DD)}',
    '.bb-btn:focus-visible,.bb-x:focus-visible,.bb-snd:focus-visible{outline:3px solid var(--teal,#1C8580);outline-offset:2px}',
    '.bb-shell{position:fixed;inset:0;z-index:9600;background:#1d0b2e;touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent}',
    '.bb-shell>canvas{position:absolute;inset:0;width:100%;height:100%;display:block;image-rendering:pixelated;outline:none}',
    '.bb-time{position:absolute;left:0;right:0;top:0;height:6px;background:rgba(255,255,255,.2)}',
    '.bb-time i{display:block;height:100%;width:100%;background:#22d3c5}',
    '.bb-top{position:absolute;left:0;right:0;top:0;display:flex;align-items:center;gap:8px;padding:calc(12px + env(safe-area-inset-top,0px)) 10px 6px 12px;color:#fff3d6;font:600 .82rem var(--mono,monospace);text-transform:uppercase;letter-spacing:.06em;text-shadow:0 1px 0 #1d0b2e,0 0 6px #1d0b2e;pointer-events:none}',
    '.bb-top>*{pointer-events:auto}',
    '.bb-name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.bb-score{margin-left:auto;white-space:nowrap}',
    '.bb-x,.bb-snd{flex:none;width:44px;height:44px;border-radius:12px;border:2px solid #fff3d6;background:#ff2e63;color:#fff;font:700 1.35rem/1 system-ui,sans-serif;cursor:pointer;text-shadow:none}',
    '.bb-snd{background:#1d0b2e;font-size:.7rem;font-family:var(--mono,monospace)}',
    '.bb-hint{position:absolute;left:0;right:0;bottom:calc(10px + env(safe-area-inset-bottom,0px));padding:0 14px;text-align:center;color:#fff3d6;font:600 .9rem var(--mono,monospace);text-shadow:0 1px 0 #1d0b2e,0 0 8px #1d0b2e;pointer-events:none;transition:opacity .6s}',
    '.bb-end{position:absolute;inset:0;display:grid;place-items:center;padding:20px;background:rgba(20,10,30,.6)}'
  ].join('\n');
  document.head.appendChild(css);

  /* ===============================================================
     SOUND  (shares the on/off choice with Jetty Strawbz)
  ================================================================ */
  var actx = null;
  var muted = sget('jettyStrawbz.muted', '0') === '1';
  function beep(freq, dur, type, vol, slideTo, delay) {
    if (muted) return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!actx) actx = new AC();
      if (actx.state === 'suspended') actx.resume();
      var t0 = actx.currentTime + (delay || 0);
      var o = actx.createOscillator(), g = actx.createGain();
      o.type = type || 'square';
      o.frequency.setValueAtTime(freq, t0);
      if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
      g.gain.setValueAtTime(vol || 0.04, t0);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(actx.destination);
      o.start(t0); o.stop(t0 + dur + 0.02);
    } catch (e) {}
  }
  function fanfare() { beep(659, 0.09, 'square', 0.045); beep(880, 0.09, 'square', 0.045, 0, 0.09); beep(1319, 0.22, 'square', 0.045, 0, 0.18); }
  function blip() { beep(880, 0.06, 'square', 0.04); beep(1320, 0.09, 'square', 0.04, 0, 0.06); }

  /* ===============================================================
     PIXEL DRAWING TOOLKIT
     c, W and H always point at whichever canvas is being drawn.
  ================================================================ */
  var c = null, W = 0, H = 0;
  var PAL = { k: '#1d0b2e', g: '#2fd67b', r: '#ff2e63', R: '#b3124a', p: '#ff9bb8', s: '#ffe9a8', w: '#ffffff', b: '#9a7bff', B: '#5a35d6', m: '#c9cfd6', M: '#7d8691', t: '#22d3c5' };
  function sprite(rows) {
    var cv = document.createElement('canvas');
    cv.width = rows[0].length; cv.height = rows.length;
    var x = cv.getContext('2d');
    rows.forEach(function (row, y) {
      for (var i = 0; i < row.length; i++) { var col = PAL[row[i]]; if (col) { x.fillStyle = col; x.fillRect(i, y, 1, 1); } }
    });
    return cv;
  }
  var STRAWBZ = sprite([
    '.....g..g..g....',
    '......gggggg....',
    '....kgggggggk...',
    '...krrgggggrrk..',
    '..krprrrgrrrrrk.',
    '..krrsrrrrsrrrk.',
    '..krrrrwkrrwkrk.',
    '..krsrrwkrrwkrk.',
    '..kRrrrrrrrrrrk.',
    '...kRrsrrrrsrk..',
    '...kRRrrrrrrrk..',
    '....kRRrrrrrk...',
    '.....kRRrrrk....',
    '....bbbk.kbbb...',
    '....bBBb.bBBb...',
    '....BBBB.BBBB...'
  ]);
  var MINI = sprite([
    '..g.gg..',
    '..gggg..',
    '.kggggk.',
    'krrggrrk',
    'krsrrsrk',
    'krrrrrrk',
    '.krsrrk.',
    '..krrk..',
    '...kk...'
  ]);
  var SCOPE = sprite([
    '......mm....',
    '.....mmmm...',
    '....mmmm....',
    '...mmmm.....',
    '..mmmm..M...',
    '..mmm..MM...',
    '...m...MM...',
    '..ttt..MM...',
    '.......MM...',
    '.MMMMMMMM...',
    '....MM......',
    '..mmmmmmmm..',
    '.mmmmmmmmmm.'
  ]);

  function rect(x, y, w, h, col) { c.fillStyle = col; c.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); }
  function oval(cx, cy, rx, ry, col) {
    c.fillStyle = col; cx = Math.round(cx); cy = Math.round(cy); ry = Math.max(1, Math.round(ry));
    for (var dy = -ry; dy <= ry; dy++) {
      var w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (dy * dy) / (ry * ry + 0.01))));
      c.fillRect(cx - w, cy + dy, 2 * w + 1, 1);
    }
  }
  function disc(cx, cy, r, col) { oval(cx, cy, r, r, col); }
  function ring(cx, cy, r, col) {
    c.fillStyle = col;
    var n = Math.max(12, Math.round(r * 6.5));
    for (var i = 0; i < n; i++) { var a = i / n * Math.PI * 2; c.fillRect(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), 1, 1); }
  }
  function line(x0, y0, x1, y1, col, th) {
    c.fillStyle = col; th = th || 1;
    var n = Math.max(1, Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0))));
    for (var i = 0; i <= n; i++) c.fillRect(Math.round(lerp(x0, x1, i / n)), Math.round(lerp(y0, y1, i / n)), th, th);
  }
  function bands(cols, y0, y1) {
    var h = (y1 - y0) / cols.length;
    for (var i = 0; i < cols.length; i++) rect(0, y0 + i * h, W, h + 1, cols[i]);
  }
  function img(s, x, y, flip) {
    x = Math.round(x); y = Math.round(y);
    if (!flip) { c.drawImage(s, x, y); return; }
    c.save(); c.translate(x + s.width, y); c.scale(-1, 1); c.drawImage(s, 0, 0); c.restore();
  }
  // tiny 3x5 pixel letters for words drawn inside the games
  var FONT = {
    A: '010101111101101', B: '110101110101110', C: '011100100100011', D: '110101101101110', E: '111100110100111',
    F: '111100110100100', G: '011100101101011', H: '101101111101101', I: '111010010010111', J: '001001001101010',
    K: '101101110101101', L: '100100100100111', M: '101111111101101', N: '110101101101101', O: '010101101101010',
    P: '110101110100100', Q: '010101101110011', R: '110101110101101', S: '011100010001110', T: '111010010010010',
    U: '101101101101111', V: '101101101101010', W: '101101111111101', X: '101101010101101', Y: '101101010010010',
    Z: '111001010100111', '0': '111101101101111', '1': '010110010010111', '2': '110001010100111', '3': '110001010001110',
    '4': '101101111001001', '5': '111100110001110', '6': '011100111101111', '7': '111001010010010', '8': '111101111101111',
    '9': '111101111001110', '!': '010010010000010', '+': '000010111010000'
  };
  function text(str, x, y, col, sc) {
    sc = sc || 1; c.fillStyle = col; x = Math.round(x); y = Math.round(y);
    for (var i = 0; i < str.length; i++) {
      var g = FONT[str[i]];
      if (g) for (var j = 0; j < 15; j++) if (g[j] === '1') c.fillRect(x + (j % 3) * sc, y + Math.floor(j / 3) * sc, sc, sc);
      x += 4 * sc;
    }
  }
  function textW(str, sc) { return (str.length * 4 - 1) * (sc || 1); }

  function Parts() { this.a = []; }
  Parts.prototype.add = function (x, y, vx, vy, life, col, g, s) { this.a.push({ x: x, y: y, vx: vx, vy: vy, life: life, col: col, g: g || 0, s: s || 1 }); };
  Parts.prototype.burst = function (x, y, n, spd, cols, g) {
    for (var i = 0; i < n; i++) { var a = Math.random() * Math.PI * 2, v = spd * (0.4 + Math.random() * 0.6); this.add(x, y, Math.cos(a) * v, Math.sin(a) * v, 0.35 + Math.random() * 0.4, cols[i % cols.length], g || 0, 2); }
  };
  Parts.prototype.step = function (dt) {
    for (var i = this.a.length - 1; i >= 0; i--) { var p = this.a[i]; p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt; if (p.life <= 0) this.a.splice(i, 1); }
  };
  Parts.prototype.draw = function () { for (var i = 0; i < this.a.length; i++) { var p = this.a[i]; rect(p.x, p.y, p.s, p.s, p.col); } };
  var PARTY = ['#ff2e63', '#22d3c5', '#ffe66d', '#9a7bff', '#ff9bb8', '#ffffff'];
  var DUSK = ['#231046', '#2e1458', '#3d1a6e', '#532182', '#6f2a93', '#8f349f', '#b443a6', '#d655a8', '#f06fae', '#ff8fb8'];

  /* ===============================================================
     CATCH BADGE  (the 1/3 counter in the corner of the Study Lab)
  ================================================================ */
  var badge = el('div', 'bb-badge');
  badge.title = 'Catch Strawbz ' + CATCHES_NEEDED + ' times to unlock a brain break';
  var badgeIcon = el('canvas'); badgeIcon.width = 16; badgeIcon.height = 16;
  badgeIcon.getContext('2d').drawImage(STRAWBZ, 0, 0);
  var badgeText = el('span');
  badge.appendChild(badgeIcon); badge.appendChild(badgeText);
  function paintBadge() {
    badgeText.textContent = getCount() + '/' + CATCHES_NEEDED;
    badge.setAttribute('aria-label', 'Strawbz caught: ' + getCount() + ' of ' + CATCHES_NEEDED);
    badge.hidden = location.hash !== '#study';
  }
  function bumpBadge() { badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump'); }
  document.body.appendChild(badge);
  window.addEventListener('hashchange', paintBadge);
  paintBadge();

  /* ===============================================================
     DECK CELEBRATION
  ================================================================ */
  var party = null;
  var GW = 52, GH = 62; // size of the little canvas Strawbz is drawn on

  function drawGuy(g, phase, t, dir, sparkle) {
    var keepC = c, keepW = W, keepH = H;
    c = g; W = GW; H = GH;
    c.clearRect(0, 0, GW, GH);
    var bob = phase === 'run' ? Math.floor(t * 12) % 2 : 0;
    var by = 44 - bob;
    if (phase === 'fall') {
      // parachute
      for (var dy = 0; dy <= 14; dy++) {
        var hw = Math.round(19 * Math.sqrt(1 - Math.pow((14 - dy) / 14, 2)));
        var x0 = 20 - hw, wd = 2 * hw + 1, seg = wd / 5;
        var cols = ['#ff5c8a', '#7b4dff', '#22d3c5', '#7b4dff', '#ff5c8a'];
        for (var s = 0; s < 5; s++) rect(x0 + Math.round(s * seg), 2 + dy, Math.ceil(seg), 1, cols[s]);
        rect(x0 - 1, 2 + dy, 1, 1, '#1d0b2e'); rect(x0 + wd, 2 + dy, 1, 1, '#1d0b2e');
      }
      rect(1, 17, 39, 1, '#1d0b2e');
      line(2, 18, 15, 45, '#5C6675'); line(13, 18, 18, 45, '#5C6675');
      line(27, 18, 22, 45, '#5C6675'); line(38, 18, 25, 45, '#5C6675');
    }
    if (phase === 'run') {
      rect(dir > 0 ? 6 : 34, 58, 3, 2, 'rgba(120,120,130,.6)');
      rect(dir > 0 ? 1 : 40, 56 + bob, 2, 2, 'rgba(120,120,130,.4)');
    }
    if (phase !== 'caught' || sparkle < 0.35) {
      // sign and its stick
      line(32, 39 - bob, 28, 51 - bob, '#8a5326');
      rect(29, 27 - bob, 23, 12, '#1d0b2e');
      rect(30, 28 - bob, 21, 10, '#fff3d6');
      text('YAY!', 33, 31 - bob, '#C93F80');
    }
    img(STRAWBZ, 12, by - (phase === 'caught' ? Math.round(Math.sin(Math.min(1, sparkle * 2.2) * Math.PI) * 10) : 0), dir < 0);
    if (phase === 'caught') {
      var r = 6 + sparkle * 26;
      for (var i = 0; i < 10; i++) { var a = i / 10 * Math.PI * 2; rect(20 + Math.cos(a) * r, 44 + Math.sin(a) * r * 0.8, 2, 2, PARTY[i % PARTY.length]); }
      text('+1', 16, 30 - sparkle * 12, '#C93F80', 2);
    }
    c = keepC; W = keepW; H = keepH;
  }

  function endParty() {
    if (!party) return;
    cancelAnimationFrame(party.raf);
    gone(party.layer);
    party = null;
  }

  function celebrate() {
    if (shell || popup) return;
    endParty();
    var vw = window.innerWidth, vh = window.innerHeight;
    var layer = el('div', 'bb-party');
    var conf = el('canvas', 'bb-confetti'); conf.width = vw; conf.height = vh;
    var cc = conf.getContext('2d');
    var cheer = el('div', 'bb-cheer', pick(AFFIRMATIONS)); cheer.setAttribute('role', 'status');
    var k = clamp(Math.round(Math.min(vw, vh) / 170), 2, 4);
    var guy = el('canvas', 'bb-guy'); guy.width = GW; guy.height = GH;
    guy.style.width = GW * k + 'px'; guy.style.height = GH * k + 'px';
    guy.setAttribute('role', 'button'); guy.setAttribute('aria-label', 'Catch Strawbz'); guy.tabIndex = 0;
    var gctx = guy.getContext('2d');
    layer.appendChild(conf); layer.appendChild(cheer); layer.appendChild(guy);
    document.body.appendChild(layer);

    var colors = ['#C93F80', '#6A4FA6', '#1C8580', '#F07AB2', '#FFD166', '#7EB8DA'];
    var pieces = [], n = calm ? 40 : 160;
    for (var i = 0; i < n; i++) {
      pieces.push({ x: Math.random() * vw, y: -20 - Math.random() * vh * 0.9, vx: (Math.random() - 0.5) * 70, vy: 110 + Math.random() * 170, w: 6 + Math.random() * 7, h: 4 + Math.random() * 5, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 9, col: colors[i % colors.length] });
    }
    var gw = GW * k, gh = GH * k;
    var st = { phase: 'fall', x: (0.12 + Math.random() * 0.55) * (vw - gw), y: -gh, dir: 1, t: 0, sparkle: 0, last: performance.now() };
    var fallSpeed = clamp(vh * 0.22, 120, 230), runSpeed = Math.max(240, vw * 0.42);

    function caught(e) {
      if (e) e.preventDefault();
      if (!party || st.phase === 'caught' || st.phase === 'gone') return;
      st.phase = 'caught'; st.sparkle = 0;
      var count = Math.min(CATCHES_NEEDED, getCount() + 1);
      setCount(count); bumpBadge(); blip();
      cheer.textContent = 'Gotcha! ' + count + '/' + CATCHES_NEEDED;
      cheer.style.opacity = '1';
      if (count >= CATCHES_NEEDED) {
        setTimeout(function () { endParty(); setCount(0); showPopup(); }, 950);
      }
    }
    guy.addEventListener('pointerdown', caught);
    guy.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') caught(e); });

    function frame(now) {
      if (!party) return;
      var dt = Math.min(0.05, (now - st.last) / 1000); st.last = now; st.t += dt;
      cc.clearRect(0, 0, vw, vh);
      for (var i = pieces.length - 1; i >= 0; i--) {
        var p = pieces[i];
        p.x += p.vx * dt + Math.sin(st.t * 3 + i) * 0.6; p.y += p.vy * dt; p.rot += p.vr * dt;
        if (p.y > vh + 20) { pieces.splice(i, 1); continue; }
        cc.save(); cc.translate(p.x, p.y); cc.rotate(p.rot);
        cc.fillStyle = p.col; cc.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.rot * 1.3)) + 1);
        cc.restore();
      }
      if (st.phase === 'fall') {
        st.y += fallSpeed * dt;
        st.x = clamp(st.x + Math.sin(st.t * 1.8) * 26 * dt, 0, vw - gw);
        if (st.y + gh >= vh - 2) { st.y = vh - gh - 2; st.phase = 'run'; st.dir = (st.x + gw / 2 < vw / 2) ? 1 : -1; }
      } else if (st.phase === 'run') {
        st.x += st.dir * runSpeed * dt;
        if (st.x > vw + 10 || st.x < -gw - 10) st.phase = 'gone';
      } else if (st.phase === 'caught') {
        st.sparkle += dt;
        if (st.sparkle > 0.8) st.phase = 'gone';
      }
      if (st.phase === 'gone') guy.style.display = 'none';
      else { drawGuy(gctx, st.phase, st.t, st.dir, st.sparkle); guy.style.transform = 'translate(' + Math.round(st.x) + 'px,' + Math.round(st.y) + 'px)'; }
      if (st.t > 4.5 && st.phase !== 'caught') cheer.style.opacity = '0';
      if (st.phase === 'gone' && !pieces.length && st.t > 5) { endParty(); return; }
      party.raf = requestAnimationFrame(frame);
    }
    party = { layer: layer, raf: 0 };
    blip();
    party.raf = requestAnimationFrame(frame);
  }

  /* ===============================================================
     THE POPUP
  ================================================================ */
  var popup = null;
  function closePopup() { if (popup) { gone(popup); popup = null; } }
  function showPopup() {
    if (shell) return;
    closePopup();
    var back = el('div', 'bb-back');
    var card = el('div', 'bb-card');
    card.setAttribute('role', 'dialog'); card.setAttribute('aria-modal', 'true'); card.setAttribute('aria-label', "You're doing great!");
    var icon = el('canvas'); icon.width = 16; icon.height = 16; icon.getContext('2d').drawImage(STRAWBZ, 0, 0);
    var yes = el('button', 'bb-btn', 'Take a brain break');
    var no = el('button', 'bb-btn alt', 'Keep going');
    card.appendChild(icon);
    card.appendChild(el('h2', '', "You're doing great!"));
    card.appendChild(el('p', '', 'You caught Strawbz ' + CATCHES_NEEDED + ' times. Want a one-minute breather?'));
    card.appendChild(yes); card.appendChild(no);
    back.appendChild(card);
    document.body.appendChild(back);
    popup = back;
    yes.addEventListener('click', function () {
      closePopup();
      var last = parseInt(sget('bb:lastGame', '-1'), 10), i;
      do { i = Math.floor(Math.random() * GAMES.length); } while (GAMES.length > 1 && i === last);
      openGame(i);
    });
    no.addEventListener('click', closePopup);
    try { yes.focus(); } catch (e) {}
    fanfare();
  }

  /* ===============================================================
     GAME SHELL  (the full-screen frame every mini game runs inside)
  ================================================================ */
  var shell = null;

  function closeGame() {
    if (!shell) return;
    cancelAnimationFrame(shell.raf);
    window.removeEventListener('resize', shell.size);
    document.documentElement.style.overflow = shell.overflow;
    gone(shell.root);
    shell = null;
  }

  function openGame(i) {
    closeGame(); endParty(); closePopup();
    i = clamp(i | 0, 0, GAMES.length - 1);
    sset('bb:lastGame', String(i));
    var def = GAMES[i];

    var root = el('div', 'bb-shell');
    root.setAttribute('role', 'dialog'); root.setAttribute('aria-label', 'Brain break: ' + def.name);
    var cv = el('canvas'); cv.tabIndex = -1;
    var time = el('div', 'bb-time'), bar = el('i'); time.appendChild(bar);
    var top = el('div', 'bb-top');
    var nameEl = el('span', 'bb-name', def.name), scoreEl = el('span', 'bb-score');
    var snd = el('button', 'bb-snd', muted ? 'OFF' : 'SFX'); snd.setAttribute('aria-label', 'Sound on or off');
    var x = el('button', 'bb-x', '\u2715'); x.setAttribute('aria-label', 'Exit game');
    top.appendChild(nameEl); top.appendChild(scoreEl); top.appendChild(snd); top.appendChild(x);
    var hint = el('div', 'bb-hint', def.hint);
    root.appendChild(cv); root.appendChild(time); root.appendChild(top); root.appendChild(hint);
    document.body.appendChild(root);

    var ctx = cv.getContext('2d');
    var G = {
      left: GAME_SECONDS, over: false, top: 20, hintT: 5,
      score: function (s) { scoreEl.textContent = s; },
      say: function (s) { hint.textContent = s; hint.style.opacity = '1'; G.hintT = 4; },
      finish: function (msg) {
        if (G.over) return;
        G.over = true;
        setTimeout(function () {
          if (!shell || shell.G !== G) return;
          hint.textContent = '';
          var end = el('div', 'bb-end'), card = el('div', 'bb-card');
          var b = el('button', 'bb-btn', 'Back to studying');
          card.appendChild(el('h2', '', 'Break over!'));
          card.appendChild(el('p', '', msg));
          card.appendChild(b);
          end.appendChild(card); root.appendChild(end);
          b.addEventListener('click', closeGame);
          try { b.focus(); } catch (e) {}
        }, 500);
      }
    };
    var game = null;
    function size() {
      var vw = root.clientWidth || window.innerWidth, vh = root.clientHeight || window.innerHeight;
      var sc = Math.max(1, Math.min(vw, vh) / 180);
      cv.width = Math.max(120, Math.round(vw / sc));
      cv.height = Math.max(120, Math.round(vh / sc));
      ctx.imageSmoothingEnabled = false;
      c = ctx; W = cv.width; H = cv.height;
      G.top = Math.ceil(66 / sc);
      if (game && game.resize) game.resize();
    }
    size();
    game = def.make(G);

    function at(e) { var r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * W / (r.width || 1), y: (e.clientY - r.top) * H / (r.height || 1) }; }
    cv.addEventListener('pointerdown', function (e) { e.preventDefault(); if (G.over) return; var p = at(e); if (game.down) game.down(p.x, p.y); });
    cv.addEventListener('pointermove', function (e) { if (G.over) return; var p = at(e); if (game.move) game.move(p.x, p.y); });
    root.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    x.addEventListener('click', closeGame);
    snd.addEventListener('click', function () { muted = !muted; sset('jettyStrawbz.muted', muted ? '1' : '0'); snd.textContent = muted ? 'OFF' : 'SFX'; });
    window.addEventListener('resize', size);

    var last = performance.now();
    function frame(now) {
      if (!shell || shell.G !== G) return;
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      c = ctx; W = cv.width; H = cv.height;
      if (G.hintT > 0) { G.hintT -= dt; if (G.hintT <= 0) hint.style.opacity = '0'; }
      if (!G.over) {
        G.left -= dt;
        bar.style.width = clamp(G.left / GAME_SECONDS * 100, 0, 100) + '%';
        if (G.left <= 0) G.finish(game.timeUp ? game.timeUp() : "Time's up! Hope that was a good breather.");
      }
      game.update(dt);
      game.draw();
      shell.raf = requestAnimationFrame(frame);
    }
    shell = { root: root, G: G, game: game, raf: 0, size: size, overflow: document.documentElement.style.overflow };
    document.documentElement.style.overflow = 'hidden';
    try { cv.focus(); } catch (e) {}
    shell.raf = requestAnimationFrame(frame);
  }

  // While a popup or game is open, keys belong to it and not to the flashcards underneath.
  function onKey(e, isDown) {
    if (!shell && !popup) return;
    e.stopPropagation();
    if (popup) { if (isDown && e.key === 'Escape') closePopup(); return; }
    if (isDown && e.key === 'Escape') { closeGame(); return; }
    var onButton = e.target && e.target.tagName === 'BUTTON' && shell.root.contains(e.target);
    if (onButton && (e.key === 'Enter' || e.key === ' ')) return;
    if ([' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].indexOf(e.key) >= 0) e.preventDefault();
    if (shell.G.over || !shell.game.key) return;
    if (isDown && e.repeat) return;
    shell.game.key(e.key, isDown);
  }
  window.addEventListener('keydown', function (e) { onKey(e, true); }, true);
  window.addEventListener('keyup', function (e) { onKey(e, false); }, true);

  /* ===============================================================
     GAME 1: SPEED RUN!
     Jump the lab gear and reach the finish line. A bump sends you
     back to the start.
  ================================================================ */
  function makeRun(G) {
    var SPEED = 72, LEN = SPEED * 30;
    var ground, px, y = 0, vy = 0, air = false, pos = 0, stun = 0, won = 0, t = 0;
    var obs = [], parts = new Parts();
    var xx = 170;
    while (xx < LEN - 90) {
      var kind = Math.floor(Math.random() * 3);
      obs.push({ x: xx, k: kind, w: [6, 14, 10][kind], h: [13, 6, 11][kind] });
      xx += 82 + Math.random() * 70;
    }
    function layout() { ground = Math.round(Math.min(H - 26, H * 0.72)); px = Math.round(W * 0.2); }
    layout();
    G.score('0%');
    function jump() { if (!air && stun <= 0 && !won) { vy = 158; air = true; beep(420, 0.1, 'square', 0.035, 760); } }
    function drawOb(o, x) {
      if (o.k === 0) { // collection tube
        rect(x, ground - 13, 6, 13, '#1d0b2e'); rect(x + 1, ground - 10, 4, 9, '#dff1f7'); rect(x + 1, ground - 6, 4, 5, '#c2183f'); rect(x, ground - 13, 6, 3, '#8E7CC3');
      } else if (o.k === 1) { // petri dish
        rect(x, ground - 6, 14, 6, '#1d0b2e'); rect(x + 1, ground - 5, 12, 4, '#dff1f7'); rect(x + 2, ground - 4, 10, 2, '#f6c3d8'); rect(x + 4, ground - 4, 1, 1, '#4C9A6A'); rect(x + 8, ground - 3, 2, 1, '#D6A21E');
      } else { // flask
        rect(x + 3, ground - 11, 4, 4, '#1d0b2e'); rect(x + 4, ground - 10, 2, 4, '#dff1f7'); rect(x, ground - 7, 10, 7, '#1d0b2e'); rect(x + 1, ground - 6, 8, 5, '#dff1f7'); rect(x + 1, ground - 4, 8, 3, '#22d3c5');
      }
    }
    return {
      resize: layout,
      down: jump,
      key: function (k, d) { if (d && (k === ' ' || k === 'ArrowUp')) jump(); },
      timeUp: function () { return "Time's up! You made it " + Math.floor(pos / LEN * 100) + '% of the way.'; },
      update: function (dt) {
        t += dt; parts.step(dt);
        if (won) {
          won += dt;
          if (Math.random() < 0.5) parts.add(Math.random() * W, G.top, (Math.random() - 0.5) * 30, 40 + Math.random() * 60, 1.6, pick(PARTY), 20, 2);
          if (won > 3) G.finish('You reached the finish line! Sprint complete.');
          return;
        }
        if (G.over) return;
        if (stun > 0) { stun -= dt; return; }
        pos += SPEED * dt;
        if (air) { vy -= 540 * dt; y += vy * dt; if (y <= 0) { y = 0; vy = 0; air = false; } }
        for (var i = 0; i < obs.length; i++) {
          var ox = px + obs[i].x - pos;
          if (px + 13 > ox && px + 3 < ox + obs[i].w && y < obs[i].h - 1) {
            parts.burst(px + 8, ground - 8, 12, 70, ['#ff2e63', '#ffe66d', '#ffffff'], 200);
            pos = 0; y = 0; vy = 0; air = false; stun = 0.8;
            beep(220, 0.25, 'sawtooth', 0.05, 60);
            G.say('Bonk! Back to the start.');
            break;
          }
        }
        G.score(Math.min(100, Math.floor(pos / LEN * 100)) + '%');
        if (pos >= LEN) { won = 0.01; G.left = Math.max(G.left, 5); fanfare(); G.say('Finish line!'); }
      },
      draw: function () {
        bands(DUSK, 0, ground);
        for (var i = 0; i < 4; i++) {
          var cx = ((i * 97 - pos * 0.2) % (W + 60) + W + 60) % (W + 60) - 30, cy = G.top + 10 + (i * 23) % 40;
          rect(cx, cy, 22, 4, '#ffc2dd'); rect(cx + 3, cy - 3, 13, 3, '#ffc2dd');
        }
        c.fillStyle = '#5a2390';
        for (var hx = 0; hx < W; hx++) { var hh = Math.floor(22 + Math.sin((hx + pos * 0.3) * 0.045) * 8 + Math.sin((hx + pos * 0.3) * 0.017 + 1.7) * 10); c.fillRect(hx, ground - hh, 1, hh); }
        rect(0, ground, W, H - ground, '#3a1766'); rect(0, ground, W, 4, '#22d3c5'); rect(0, ground, W, 1, '#8ff5ea');
        var off = Math.floor(pos) % 12;
        for (var gx = -12; gx < W + 12; gx += 12) rect(gx - off + 12, ground + 8, 3, 2, '#5b2a86');
        // start line and finish flag
        var sx = px - pos - 6;
        if (sx > -10) rect(sx, ground - 20, 1, 20, '#fff3d6');
        var fx = px + LEN - pos + 14;
        if (fx < W + 20) {
          rect(fx, ground - 34, 2, 34, '#fff3d6');
          for (var q = 0; q < 12; q++) rect(fx + 2 + (q % 4) * 3, ground - 34 + Math.floor(q / 4) * 3, 3, 3, (q + Math.floor(q / 4)) % 2 ? '#1d0b2e' : '#ffffff');
          for (var gq = 0; gq < 8; gq++) rect(fx - 6 + gq * 2, ground + (gq % 2), 2, 2, '#ffffff');
        }
        for (var j = 0; j < obs.length; j++) { var ox = px + obs[j].x - pos; if (ox > -20 && ox < W + 10) drawOb(obs[j], Math.round(ox)); }
        if (!(stun > 0 && Math.floor(t * 14) % 2)) {
          var hop = won ? Math.abs(Math.sin(won * 8)) * 9 : y;
          img(STRAWBZ, px, ground - 16 - hop - (!air && !won && stun <= 0 ? Math.floor(t * 10) % 2 : 0));
        }
        parts.draw();
        rect(8, G.top, W - 16, 3, '#1d0b2e'); rect(8, G.top, (W - 16) * clamp(pos / LEN, 0, 1), 3, '#22d3c5');
        if (won) { var msg = 'FINISH!'; text(msg, (W - textW(msg, 3)) / 2, G.top + 22, '#1d0b2e', 3); text(msg, (W - textW(msg, 3)) / 2 - 1, G.top + 21, '#ffe66d', 3); }
      }
    };
  }

  /* ===============================================================
     GAME 2: STRAWBERRY CATCH
     Strawberries are 1 point. Lab gear is worth more.
  ================================================================ */
  function makeCatch(G) {
    var VAL = { berry: 1, vial: 3, dish: 5, scope: 10 };
    var ground, bx = W / 2, tx = W / 2, items = [], pops = [], parts = new Parts();
    var spawn = 0.6, t = 0, score = 0, keys = {};
    function layout() { ground = H - 22; }
    layout();
    G.score('0 pts');
    function drawItem(it) {
      var x = Math.round(it.x), y = Math.round(it.y);
      if (it.k === 'berry') img(MINI, x - 4, y);
      else if (it.k === 'vial') { rect(x - 3, y + 2, 6, 10, '#1d0b2e'); rect(x - 2, y + 2, 4, 9, '#dff1f7'); rect(x - 2, y + 6, 4, 5, '#c2183f'); rect(x - 4, y, 8, 3, '#8E7CC3'); }
      else if (it.k === 'dish') { oval(x, y + 4, 8, 4, '#1d0b2e'); oval(x, y + 4, 7, 3, '#dff1f7'); oval(x, y + 4, 5, 2, '#f6c3d8'); rect(x - 3, y + 3, 2, 1, '#4C9A6A'); rect(x + 1, y + 4, 2, 1, '#D6A21E'); rect(x - 1, y + 5, 1, 1, '#6A4FA6'); }
      else img(SCOPE, x - 6, y - 2);
    }
    return {
      resize: layout,
      down: function (x) { tx = x; },
      move: function (x) { tx = x; },
      key: function (k, d) { keys[k] = d; },
      timeUp: function () { return 'You caught ' + score + ' points of goodies!'; },
      update: function (dt) {
        t += dt; parts.step(dt);
        if (keys.ArrowLeft) tx -= 150 * dt;
        if (keys.ArrowRight) tx += 150 * dt;
        tx = clamp(tx, 12, W - 12);
        bx += (tx - bx) * Math.min(1, dt * 14);
        for (var p = pops.length - 1; p >= 0; p--) { pops[p].y -= 22 * dt; pops[p].life -= dt; if (pops[p].life <= 0) pops.splice(p, 1); }
        if (G.over) return;
        spawn -= dt;
        if (spawn <= 0) {
          var r = Math.random(), k = r < 0.05 ? 'scope' : r < 0.13 ? 'dish' : r < 0.25 ? 'vial' : 'berry';
          items.push({ k: k, x: 10 + Math.random() * (W - 20), y: G.top - 14, vy: 46 + Math.random() * 30 + t * 0.5 });
          spawn = Math.max(0.3, 0.7 - t * 0.006);
        }
        var top = ground - 25;
        for (var i = items.length - 1; i >= 0; i--) {
          var it = items[i];
          it.y += it.vy * dt;
          if (it.y + 8 >= top && it.y <= top + 8 && Math.abs(it.x - bx) < 14) {
            score += VAL[it.k]; G.score(score + ' pts');
            pops.push({ x: it.x, y: top - 8, s: '+' + VAL[it.k], life: 0.8 });
            parts.burst(it.x, top, it.k === 'berry' ? 5 : 12, 50, it.k === 'berry' ? ['#ff2e63', '#2fd67b'] : PARTY, 120);
            if (it.k === 'berry') beep(880, 0.05, 'square', 0.035); else blip();
            items.splice(i, 1);
          } else if (it.y > ground - 4) {
            parts.burst(it.x, ground - 2, 4, 30, ['#b3124a', '#ff9bb8'], 150);
            items.splice(i, 1);
          }
        }
      },
      draw: function () {
        bands(DUSK, 0, ground);
        c.fillStyle = '#5a2390';
        for (var hx = 0; hx < W; hx++) { var hh = Math.floor(26 + Math.sin(hx * 0.045) * 8 + Math.sin(hx * 0.017 + 1.7) * 10); c.fillRect(hx, ground - hh, 1, hh); }
        rect(0, ground, W, H - ground, '#3a1766'); rect(0, ground, W, 3, '#22d3c5'); rect(0, ground, W, 1, '#8ff5ea');
        items.forEach(drawItem);
        var x = Math.round(bx);
        img(STRAWBZ, x - 8, ground - 16);
        rect(x - 13, ground - 25, 26, 9, '#1d0b2e'); rect(x - 12, ground - 24, 24, 7, '#b0703a'); rect(x - 12, ground - 24, 24, 2, '#8a5326');
        for (var w = 0; w < 5; w++) rect(x - 10 + w * 5, ground - 22, 1, 5, '#8a5326');
        parts.draw();
        pops.forEach(function (p) { text(p.s, p.x - textW(p.s, 1) / 2, p.y, '#ffe66d'); });
      }
    };
  }

  /* ===============================================================
     GAME 3: MICROBE MATCH
     Find the pairs of wiggling viruses, bacteria and parasites.
  ================================================================ */
  var MICROBES = ['Virus', 'Bacteriophage', 'Staphylococcus', 'Bacillus', 'Spirochete', 'Giardia'];
  function microbe(k, cx, cy, r, t) {
    var i, a;
    if (k === 0) { // virus: spiky ball, slowly turning
      for (i = 0; i < 10; i++) { a = i / 10 * Math.PI * 2 + t * 0.8; line(cx + Math.cos(a) * r * 0.5, cy + Math.sin(a) * r * 0.5, cx + Math.cos(a) * r * 0.85, cy + Math.sin(a) * r * 0.85, '#6A4FA6'); rect(cx + Math.cos(a) * r * 0.9 - 1, cy + Math.sin(a) * r * 0.9 - 1, 2, 2, '#ff5c8a'); }
      disc(cx, cy, r * 0.55, '#8E7CC3'); disc(cx - r * 0.15, cy - r * 0.15, r * 0.14, '#C2B6E6'); rect(cx + r * 0.15, cy + r * 0.1, 2, 2, '#5F4E94');
    } else if (k === 1) { // bacteriophage: head, tail, wiggling legs
      var hy = cy - r * 0.4, by = cy + r * 0.35;
      for (i = -1; i <= 1; i += 2) { var w = Math.sin(t * 5 + i) * r * 0.12; line(cx, by, cx + i * r * 0.45, by + r * 0.15 + w, '#1C8580'); line(cx + i * r * 0.45, by + r * 0.15 + w, cx + i * r * 0.6, by + r * 0.5, '#1C8580'); line(cx, by, cx + i * r * 0.2, by + r * 0.5, '#1C8580'); }
      rect(cx - 1, hy, 3, by - hy, '#22d3c5');
      disc(cx, hy, r * 0.36, '#1C8580'); disc(cx, hy, r * 0.25, '#4FC7BE'); rect(cx - 2, hy + r * 0.34, 5, 2, '#1C8580');
    } else if (k === 2) { // staph: a jiggling grape cluster
      var pts = [[0, 0], [1, 0], [-1, 0], [0.5, 0.87], [-0.5, 0.87], [0.5, -0.87], [-0.5, -0.87]];
      for (i = 0; i < pts.length; i++) { var jx = Math.sin(t * 4 + i * 1.7) * 1, jy = Math.cos(t * 3.3 + i) * 1; disc(cx + pts[i][0] * r * 0.42 + jx, cy + pts[i][1] * r * 0.42 + jy, r * 0.22, '#D6A21E'); rect(cx + pts[i][0] * r * 0.42 + jx - 1, cy + pts[i][1] * r * 0.42 + jy - 1, 1, 1, '#F2D27A'); }
    } else if (k === 3) { // bacillus: rods with whipping tails
      for (i = 0; i < 2; i++) {
        var ry = cy + (i ? r * 0.35 : -r * 0.3), rx = cx + (i ? -r * 0.1 : r * 0.1) + Math.sin(t * 2 + i * 2) * 2;
        for (var f = 0; f < r * 0.5; f++) rect(rx - r * 0.5 - f, ry + Math.sin(f * 0.9 - t * 9 + i) * 2, 1, 1, '#B45A80');
        oval(rx, ry, r * 0.5, r * 0.17, '#E48DB0'); rect(rx - r * 0.25, ry - 1, r * 0.3, 1, '#F6C3D8');
      }
    } else if (k === 4) { // spirochete: a travelling corkscrew
      for (i = -r * 0.85; i <= r * 0.85; i++) rect(cx + i, cy + Math.sin(i * 0.55 + t * 7) * r * 0.3, 2, 2, '#4C9A6A');
      rect(cx + r * 0.85, cy + Math.sin(r * 0.85 * 0.55 + t * 7) * r * 0.3 - 1, 3, 3, '#8FCBA6');
    } else { // giardia: the one with the face
      for (i = -1; i <= 1; i++) for (var g = 0; g < r * 0.45; g++) rect(cx + i * r * 0.2 + Math.sin(g * 0.8 - t * 8 + i) * 1.5, cy + r * 0.5 + g, 1, 1, '#4C86A8');
      oval(cx, cy - r * 0.1, r * 0.5, r * 0.68, '#7EB8DA'); oval(cx, cy + r * 0.25, r * 0.3, r * 0.35, '#7EB8DA');
      disc(cx - r * 0.2, cy - r * 0.25, r * 0.16, '#ffffff'); disc(cx + r * 0.2, cy - r * 0.25, r * 0.16, '#ffffff');
      var look = Math.round(Math.sin(t * 1.5));
      rect(cx - r * 0.2 + look, cy - r * 0.25, 2, 2, '#1d0b2e'); rect(cx + r * 0.2 + look, cy - r * 0.25, 2, 2, '#1d0b2e');
      rect(cx - 2, cy + r * 0.1, 5, 1, '#4C86A8');
    }
  }
  function makeMemory(G) {
    var cards = shuffle([0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]).map(function (k) { return { k: k, f: 0, up: false, done: false }; });
    var open = [], lock = 0, moves = 0, found = 0, t = 0, won = 0, parts = new Parts();
    var cols, rows, cell, size, ox, oy;
    function layout() {
      cols = W > H ? 4 : 3; rows = 12 / cols;
      var availH = H - G.top - 24;
      cell = Math.floor(Math.min((W - 8) / cols, availH / rows));
      size = cell - 4;
      ox = Math.round((W - cols * cell) / 2) + 2;
      oy = G.top + Math.round((availH - rows * cell) / 2) + 2;
    }
    layout();
    G.score('0 moves');
    return {
      resize: layout,
      timeUp: function () { return 'You found ' + found + ' of 6 pairs. Those microbes are sneaky!'; },
      down: function (x, y) {
        if (lock > 0 || won) return;
        var cx = Math.floor((x - ox + 2) / cell), cy = Math.floor((y - oy + 2) / cell);
        if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return;
        var i = cy * cols + cx, cd = cards[i];
        if (!cd || cd.up || cd.done) return;
        cd.up = true; open.push(i); beep(520, 0.05, 'square', 0.03);
        if (open.length < 2) return;
        moves++; G.score(moves + ' moves');
        var a = cards[open[0]], b = cards[open[1]];
        if (a.k === b.k) {
          a.done = b.done = true; found++; blip();
          G.say(MICROBES[a.k] + '!');
          open.forEach(function (j) { parts.burst(ox + (j % cols) * cell + size / 2, oy + Math.floor(j / cols) * cell + size / 2, 10, 60, PARTY, 0); });
          open = [];
          if (found === 6) { won = 0.01; G.left = Math.max(G.left, 4); fanfare(); }
        } else lock = 0.85;
      },
      update: function (dt) {
        t += dt; parts.step(dt);
        cards.forEach(function (cd) { var want = (cd.up || cd.done) ? 1 : 0; cd.f = clamp(cd.f + (want > cd.f ? 1 : -1) * dt * 7, 0, 1); });
        if (lock > 0) { lock -= dt; if (lock <= 0) { open.forEach(function (j) { cards[j].up = false; }); open = []; } }
        if (won) { won += dt; if (won > 2.2) G.finish('All six pairs matched in ' + moves + ' moves!'); }
      },
      draw: function () {
        rect(0, 0, W, H, '#231046');
        for (var d = 0; d < 40; d++) rect((d * 53) % W, (d * 97 + Math.floor(t * 6)) % H, 1, 1, '#532182');
        for (var i = 0; i < 12; i++) {
          var cd = cards[i], x = ox + (i % cols) * cell, y = oy + Math.floor(i / cols) * cell;
          var wd = Math.max(1, Math.round(size * Math.abs(1 - 2 * cd.f))), x0 = x + Math.round((size - wd) / 2);
          rect(x0, y, wd, size, '#1d0b2e');
          if (cd.f > 0.5) {
            rect(x0 + 1, y + 1, wd - 2, size - 2, cd.done ? '#fff3d6' : '#ffffff');
            if (wd > size * 0.6) microbe(cd.k, x + size / 2, y + size / 2, size * 0.36, t + i);
          } else {
            rect(x0 + 1, y + 1, wd - 2, size - 2, '#C93F80');
            if (wd > size * 0.6) { rect(x + 3, y + 3, size - 6, size - 6, '#E48DB0'); img(MINI, x + size / 2 - 4, y + size / 2 - 4); }
          }
        }
        parts.draw();
      }
    };
  }

  /* ===============================================================
     GAME 4: BUBBLE POP
     Big bubbles hold a trapped Strawbz and take 10 taps to pop.
  ================================================================ */
  function makeBubbles(G) {
    var bubs = [], freed = [], parts = new Parts();
    var t = 0, spawn = 0.3, popped = 0, when = [2, 13, 25, 38], next = 0, floorY;
    function layout() { floorY = H - 10; }
    layout();
    G.score('0 popped');
    function pop(b) {
      parts.burst(b.x, b.y, b.sp ? 22 : 8, b.sp ? 90 : 50, ['#bfe9ff', '#ffffff', '#8ff5ea'], 40);
      bubs.splice(bubs.indexOf(b), 1);
      if (b.sp) { freed.push({ x: b.x, y: b.y - 8, land: false, ph: Math.random() * 6 }); fanfare(); G.say('Strawbz is free!'); }
      else { popped++; G.score(popped + ' popped'); beep(700 + Math.random() * 500, 0.05, 'square', 0.035); }
    }
    return {
      resize: layout,
      timeUp: function () { return 'You popped ' + popped + ' bubbles and freed ' + freed.length + ' of ' + when.length + ' Strawbz!'; },
      down: function (x, y) {
        var best = null, bd = 1e9;
        bubs.forEach(function (b) { var d = Math.hypot(b.x - x, b.y - y); if (d <= b.r + 5 && d < bd) { bd = d; best = b; } });
        if (!best) return;
        if (best.sp) { best.hp--; best.wob = 0.25; beep(300 + (10 - best.hp) * 60, 0.05, 'square', 0.04); if (best.hp <= 0) pop(best); }
        else pop(best);
      },
      update: function (dt) {
        t += dt; parts.step(dt);
        if (!G.over) {
          spawn -= dt;
          if (spawn <= 0) { bubs.push({ x: 10 + Math.random() * (W - 20), y: H + 12, r: 5 + Math.floor(Math.random() * 6), vx: 0, vy: -(20 + Math.random() * 24), ph: Math.random() * 6, sp: false }); spawn = 0.42; }
          if (next < when.length && t >= when[next]) { next++; bubs.push({ x: 24 + Math.random() * (W - 48), y: H + 20, r: 15, vx: (Math.random() < 0.5 ? -1 : 1) * (8 + Math.random() * 6), vy: -18, ph: Math.random() * 6, sp: true, hp: 10, wob: 0, inside: false }); }
        }
        for (var i = bubs.length - 1; i >= 0; i--) {
          var b = bubs[i];
          b.y += b.vy * dt;
          if (b.sp) {
            b.x += b.vx * dt; if (b.wob > 0) b.wob -= dt;
            if (b.x < b.r + 2) { b.x = b.r + 2; b.vx = Math.abs(b.vx); } if (b.x > W - b.r - 2) { b.x = W - b.r - 2; b.vx = -Math.abs(b.vx); }
            var lo = G.top + b.r + 12, hi = floorY - b.r - 22;
            if (b.y < hi) b.inside = true;
            if (b.inside) { if (b.y < lo) { b.y = lo; b.vy = Math.abs(b.vy); } if (b.y > hi) { b.y = hi; b.vy = -Math.abs(b.vy); } }
          } else {
            b.x += Math.sin(t * 2 + b.ph) * 8 * dt;
            if (b.y < -b.r - 4) bubs.splice(i, 1);
          }
        }
        freed.forEach(function (f, n) {
          if (!f.land) { f.y += 80 * dt; f.x += ((W / (when.length + 1)) * (n + 1) - f.x) * Math.min(1, dt * 2); if (f.y >= floorY - 16) { f.y = floorY - 16; f.land = true; blip(); } else if (Math.random() < 0.5) parts.add(f.x + (Math.random() - 0.5) * 8, f.y + 16, 0, 30, 0.25, '#ffe66d', 0, 2); }
        });
      },
      draw: function () {
        bands(['#1b2a6b', '#22398a', '#27509f', '#2c69b0', '#3183bd', '#3a9cc6', '#4fb5cc'], 0, floorY);
        rect(0, floorY, W, H - floorY, '#e8d39a'); rect(0, floorY, W, 1, '#fff3d6');
        freed.forEach(function (f) {
          var hop = f.land ? Math.abs(Math.sin(t * 7 + f.ph)) * 6 : 0;
          if (!f.land) { rect(f.x - 4, f.y + 16, 3, 4 + Math.floor(t * 30) % 2 * 2, '#ff9a3c'); rect(f.x + 2, f.y + 16, 3, 4 + Math.floor(t * 30) % 2 * 2, '#ff9a3c'); }
          img(STRAWBZ, f.x - 8, f.y - hop);
          if (f.land) text('YAY!', f.x - 7, f.y - 10 - hop, '#fff3d6');
        });
        bubs.forEach(function (b) {
          var r = b.r + (b.sp && b.wob > 0 ? Math.sin(b.wob * 50) * 1.5 : 0);
          c.globalAlpha = 0.22; disc(b.x, b.y, r, '#ffffff'); c.globalAlpha = 1;
          if (b.sp) img(STRAWBZ, b.x - 8, b.y - 8);
          ring(b.x, b.y, r, '#dff6ff');
          rect(b.x - r * 0.45, b.y - r * 0.55, Math.max(1, r * 0.25), 1, '#ffffff'); rect(b.x - r * 0.6, b.y - r * 0.4, 1, Math.max(1, r * 0.25), '#ffffff');
          if (b.sp) { var s = String(b.hp); text(s, b.x - textW(s, 2) / 2, b.y - r - 13, '#1d0b2e', 2); text(s, b.x - textW(s, 2) / 2 - 1, b.y - r - 14, '#ffe66d', 2); }
        });
        parts.draw();
      }
    };
  }

  /* ===============================================================
     GAME 5: FEED THE COWS
     Toss strawberries to the hungry cows until they are full and happy.
  ================================================================ */
  function makeCows(G) {
    var N = 5, NEED = 4;
    var cows = [], shots = [], splats = [], parts = new Parts(), t = 0, happy = 0, done = 0, horizon;
    for (var i = 0; i < N; i++) cows.push({ u: 0.12 + Math.random() * 0.76, x: 0, y: 0, dir: Math.random() < 0.5 ? -1 : 1, sp: 5 + Math.random() * 6, fed: 0, chew: 0, joy: 0 });
    function layout() {
      horizon = Math.round(G.top + (H - G.top) * 0.2);
      var y0 = horizon + 30, y1 = H - 48;
      cows.forEach(function (cw, n) { cw.y = Math.round(lerp(y0, y1, N > 1 ? n / (N - 1) : 0.5)); cw.x = cw.u * W; });
    }
    layout();
    G.score('0/' + N + ' happy');
    function dims(cw) { var f = cw.fed / NEED; return { bw: Math.round(20 + f * 12), bh: Math.round(11 + f * 8) }; }
    function drawCow(cw) {
      var d = dims(cw), bw = d.bw, bh = d.bh, dir = cw.dir, full = cw.fed >= NEED;
      var x = Math.round(cw.x), gy = Math.round(cw.y) - (cw.joy > 0 ? Math.round(Math.abs(Math.sin(t * 9)) * 3) : 0);
      var cy = gy - 4 - bh / 2, leg = Math.max(2, 5 - Math.round(cw.fed * 0.7));
      c.globalAlpha = 0.25; oval(x, cw.y, bw / 2, 2, '#1d0b2e'); c.globalAlpha = 1;
      [-bw / 2 + 3, -bw / 2 + 7, bw / 2 - 5, bw / 2 - 9].forEach(function (lx) { rect(x + lx, gy - leg, 2, leg, '#f1ece0'); rect(x + lx, gy - 1, 2, 1, '#2a2233'); });
      line(x - dir * bw / 2, cy - 2, x - dir * (bw / 2 + 4), cy + 4 + Math.sin(t * 5 + cw.sp) * 1.5, '#2a2233');
      oval(x, cy, bw / 2 + 1, bh / 2 + 1, '#2a2233'); oval(x, cy, bw / 2, bh / 2, '#fffdf5');
      disc(x - dir * bw * 0.16, cy - 1, Math.max(2, bh * 0.24), '#2a2233'); disc(x + dir * bw * 0.22, cy + bh * 0.15, 2, '#2a2233');
      rect(x - dir * 3 - 2, cy + bh / 2 - 1, 4, 3, '#ff9bb8');
      var hx = x + dir * (bw / 2 + 3), hy = Math.round(cy - 1 + (cw.chew > 0 ? Math.sin(cw.chew * 30) * 1 : 0));
      rect(hx - 6, hy - 6, 2, 3, '#2a2233'); rect(hx + 4, hy - 6, 2, 3, '#2a2233');
      rect(hx - 5, hy - 6, 10, 9, '#2a2233'); rect(hx - 4, hy - 5, 8, 7, '#fffdf5'); rect(hx - 4, hy, 8, 3, '#ff9bb8');
      rect(hx - 2, hy + 1, 1, 1, '#b3124a'); rect(hx + 1, hy + 1, 1, 1, '#b3124a');
      if (full) { rect(hx - 3, hy - 3, 1, 1, '#2a2233'); rect(hx - 2, hy - 4, 1, 1, '#2a2233'); rect(hx - 1, hy - 3, 1, 1, '#2a2233'); rect(hx + 1, hy - 3, 1, 1, '#2a2233'); rect(hx + 2, hy - 4, 1, 1, '#2a2233'); rect(hx + 3, hy - 3, 1, 1, '#2a2233'); }
      else { rect(hx - 3, hy - 4, 2, 2, '#2a2233'); rect(hx + 1, hy - 4, 2, 2, '#2a2233'); }
      if (cw.chew > 0 && Math.floor(cw.chew * 10) % 2) rect(hx - 1, hy + 2, 2, 1, '#ff2e63');
      if (!full) { // still hungry: thought bubble with a strawberry, and how many more
        disc(hx, hy - 17, 7, '#ffffff'); rect(hx - 1, hy - 9, 2, 2, '#ffffff');
        img(MINI, hx - 4, hy - 22);
        var left = String(NEED - cw.fed); text(left, hx + 9, hy - 20, '#fffdf5');
      } else if (cw.joy > 0) text('MOO!', hx - 7, hy - 16, '#fff3d6');
    }
    function feed(cw) {
      cw.fed++; cw.chew = 0.7; beep(180, 0.08, 'square', 0.04, 120);
      parts.burst(cw.x + cw.dir * 12, cw.y - 14, 5, 40, ['#ff2e63', '#2fd67b'], 120);
      if (cw.fed >= NEED) {
        cw.joy = 2.5; happy++; G.score(happy + '/' + N + ' happy');
        beep(150, 0.35, 'sawtooth', 0.05, 110); beep(110, 0.3, 'sawtooth', 0.04, 95, 0.3);
        if (happy === N) { done = 0.01; G.left = Math.max(G.left, 4); G.say('Every cow is full and happy!'); }
      }
    }
    return {
      resize: layout,
      timeUp: function () { return 'You fed ' + happy + ' of ' + N + ' cows until they were full and happy.'; },
      down: function (x, y) {
        if (done || y < horizon - 6) return;
        shots.push({ x0: W / 2, y0: H - 30, x1: x, y1: y, u: 0 });
        beep(500, 0.07, 'square', 0.03, 800);
      },
      update: function (dt) {
        t += dt; parts.step(dt);
        cows.forEach(function (cw) {
          if (cw.chew > 0) cw.chew -= dt;
          if (cw.joy > 0) { cw.joy -= dt; if (Math.random() < 0.15) parts.add(cw.x + (Math.random() - 0.5) * 16, cw.y - 22, 0, -22, 0.9, '#ff5c8a', 0, 2); }
          if (cw.fed < NEED && cw.chew <= 0) {
            cw.x += cw.dir * cw.sp * dt;
            if (cw.x < 26) { cw.x = 26; cw.dir = 1; } if (cw.x > W - 26) { cw.x = W - 26; cw.dir = -1; }
            cw.u = cw.x / W;
          }
        });
        for (var i = shots.length - 1; i >= 0; i--) {
          var s = shots[i]; s.u += dt / 0.45;
          if (s.u < 1) continue;
          shots.splice(i, 1);
          var hit = null;
          cows.forEach(function (cw) { var d = dims(cw); if (!hit && cw.fed < NEED && Math.abs(s.x1 - cw.x) < d.bw / 2 + 9 && s.y1 > cw.y - d.bh - 22 && s.y1 < cw.y + 5) hit = cw; });
          if (hit) feed(hit); else { splats.push({ x: s.x1, y: s.y1, life: 3 }); parts.burst(s.x1, s.y1, 4, 30, ['#b3124a', '#ff9bb8'], 120); }
        }
        for (var j = splats.length - 1; j >= 0; j--) { splats[j].life -= dt; if (splats[j].life <= 0) splats.splice(j, 1); }
        if (done) { done += dt; if (done > 2.6) G.finish('Every cow is full and happy. Moo!'); }
      },
      draw: function () {
        bands(['#7ec8f0', '#96d4f3', '#b0e0f5', '#cdeef8', '#e6f7fb'], 0, horizon);
        disc(W * 0.82, G.top + 14, 9, '#fff1a8');
        c.fillStyle = '#6cba6a';
        for (var hx = 0; hx < W; hx++) { var hh = Math.floor(8 + Math.sin(hx * 0.04) * 5 + Math.sin(hx * 0.011 + 2) * 6); c.fillRect(hx, horizon - hh, 1, hh); }
        rect(0, horizon, W, H - horizon, '#4fae54');
        for (var sy = horizon + 6, n = 0; sy < H; sy += 14, n++) rect(0, sy, W, 5, n % 2 ? '#48a44d' : '#56b65b');
        for (var f = 0; f < 22; f++) { var fx = (f * 71) % W, fy = horizon + 8 + (f * 53) % Math.max(10, H - horizon - 14); rect(fx, fy, 2, 2, f % 3 ? '#fff3d6' : '#ff9bb8'); rect(fx, fy + 2, 1, 2, '#2f6b46'); }
        for (var px = 4; px < W; px += 18) { rect(px, horizon - 7, 2, 9, '#8a5326'); }
        rect(0, horizon - 5, W, 1, '#b0703a'); rect(0, horizon - 2, W, 1, '#b0703a');
        splats.forEach(function (s) { c.globalAlpha = Math.min(1, s.life); rect(s.x - 2, s.y - 1, 5, 2, '#b3124a'); c.globalAlpha = 1; });
        cows.slice().sort(function (a, b) { return a.y - b.y; }).forEach(drawCow);
        shots.forEach(function (s) { img(MINI, lerp(s.x0, s.x1, s.u) - 4, lerp(s.y0, s.y1, s.u) - Math.sin(s.u * Math.PI) * 30 - 4); });
        rect(W / 2 + 8, H - 26, 14, 9, '#b0703a'); rect(W / 2 + 8, H - 26, 14, 2, '#8a5326'); img(MINI, W / 2 + 9, H - 32); img(MINI, W / 2 + 14, H - 31);
        img(STRAWBZ, W / 2 - 10, H - 34);
        parts.draw();
      }
    };
  }

  /* ===============================================================
     GAME 6: UP, UP AND AWAY
     Tap fast to fill the balloon, then watch Strawbz sail off.
  ================================================================ */
  function makeBalloon(G) {
    var TAPS = 45;
    var fill = 0, phase = 'pump', pt = 0, t = 0, pump = 0, parts = new Parts(), gy, bx, horizon;
    function layout() { gy = Math.round(H - Math.max(24, H * 0.14)); bx = Math.round(W * 0.3); horizon = Math.round(G.top + (gy - G.top) * 0.62); }
    layout();
    G.score('0% full');
    function tap() {
      if (phase !== 'pump') return;
      fill = Math.min(1, fill + 1 / TAPS); pump = 0.12;
      beep(200 + fill * 500, 0.05, 'square', 0.035);
      if (fill >= 1) { phase = 'hop'; pt = 0; fanfare(); G.score('100% full'); G.say('All aboard!'); G.left = Math.max(G.left, 9); }
    }
    function mountain(xc, h, w, col, snow) {
      for (var x = Math.floor(xc - w / 2); x <= xc + w / 2; x++) {
        var hh = Math.round(h * (1 - Math.abs(x - xc) / (w / 2)));
        if (hh <= 0) continue;
        rect(x, horizon - hh, 1, hh, col);
        if (hh > h * 0.72) rect(x, horizon - hh, 1, Math.min(hh - Math.round(h * 0.72), 5), snow);
      }
    }
    function balloon(x, base, s, f, rider) {
      var bw = 12 * s, bh = 8 * s, rx = (6 + f * 15) * s, ry = (5 + f * 21) * s, cy = base - bh - 5 * s - ry;
      line(x - bw / 2, base - bh, x - rx * 0.5, cy + ry * 0.85, '#1d0b2e'); line(x + bw / 2 - 1, base - bh, x + rx * 0.5, cy + ry * 0.85, '#1d0b2e');
      oval(x, cy, rx + 1, ry + 1, '#1d0b2e');
      oval(x, cy, rx, ry, '#ff5c8a'); oval(x, cy, rx * 0.62, ry, '#fff3d6'); oval(x, cy, rx * 0.26, ry, '#22d3c5');
      rect(x - 2 * s, cy + ry - 1, 4 * s, 2 * s, '#b3124a');
      if (rider) c.drawImage(STRAWBZ, Math.round(x - 8 * s), Math.round(base - bh - 10 * s), Math.round(16 * s), Math.round(16 * s));
      rect(x - bw / 2, base - bh, bw, bh, '#b0703a'); rect(x - bw / 2, base - bh, bw, Math.max(1, s), '#8a5326');
      for (var w = 1; w < 4; w++) rect(x - bw / 2 + w * bw / 4, base - bh, Math.max(1, Math.round(s * 0.6)), bh, '#8a5326');
    }
    return {
      resize: layout,
      down: tap,
      key: function (k, d) { if (d && (k === ' ' || k === 'ArrowUp')) tap(); },
      timeUp: function () { return 'So close! The balloon got ' + Math.round(fill * 100) + '% full.'; },
      update: function (dt) {
        t += dt; pt += dt; parts.step(dt);
        if (pump > 0) pump -= dt;
        if (phase === 'pump') { if (!G.over) fill = Math.max(0, fill - 0.012 * dt); G.score(Math.round(fill * 100) + '% full'); }
        else if (phase === 'hop' && pt > 0.7) { phase = 'fly'; pt = 0; G.say('Off into the sunset...'); }
        else if (phase === 'fly' && pt > 6.5) G.finish('Strawbz floats over the river, past the mountain, into the sunset. Bon voyage!');
      },
      draw: function () {
        bands(['#3b1c6e', '#6a2c8f', '#a83f97', '#e0589a', '#ff7e7e', '#ffa45c', '#ffc857'], 0, horizon);
        var sunX = Math.round(W * 0.42);
        disc(sunX, horizon - 3, 13, '#fff1a8'); disc(sunX, horizon - 3, 10, '#ffffff');
        mountain(W * 0.1, 26, 76, '#7a3a8a', '#f6c3d8'); mountain(W * 0.98, 64, 130, '#3f1d63', '#e9d6f5'); mountain(W * 0.78, 44, 96, '#5a2a7a', '#f1dff0');
        // the river
        bands(['#ff9e6e', '#e0789a', '#a85a9f', '#74489a', '#4f3a8c'], horizon, gy);
        for (var r = 0; r < 9; r++) { var ry = horizon + 3 + r * Math.max(2, (gy - horizon) / 9), rw = 6 + r * 3 + Math.sin(t * 2 + r) * 3; rect(sunX - rw / 2, ry, rw, 1, '#fff1a8'); }
        for (var s = 0; s < 12; s++) rect((s * 61 + Math.floor(t * 8)) % W, horizon + 6 + (s * 29) % Math.max(4, gy - horizon - 8), 4, 1, 'rgba(255,255,255,.35)');
        // near bank
        rect(0, gy, W, H - gy, '#2f6b46'); rect(0, gy, W, 2, '#4C9A6A');
        for (var g = 0; g < 16; g++) rect((g * 43) % W, gy + 5 + (g * 17) % Math.max(4, H - gy - 8), 1, 3, '#4C9A6A');
        parts.draw();
        if (phase === 'pump' || phase === 'hop') {
          balloon(bx, gy, 1, fill, false);
          if (pump > 0) { rect(bx - 1, gy - 15, 3, 3, '#ffe66d'); rect(bx - 2, gy - 13, 5, 2, '#ff9a3c'); }
          var sx = bx + 22, sy = gy - 16;
          if (phase === 'pump') {
            rect(sx - 8, gy - 6, 4, 6, '#7d8691'); rect(sx - 9, gy - 8 + (pump > 0 ? 2 : 0), 6, 2, '#c9cfd6'); line(sx - 6, gy - 1, bx + 6, gy - 2, '#1d0b2e');
            img(STRAWBZ, sx, sy + (pump > 0 ? 2 : 0), true);
          } else {
            var u = clamp(pt / 0.7, 0, 1);
            img(STRAWBZ, lerp(sx, bx - 8, u), lerp(sy, gy - 18, u) - Math.sin(u * Math.PI) * 22, true);
          }
          // air gauge
          rect(bx - 22, gy + 6, 44, 5, '#1d0b2e'); rect(bx - 21, gy + 7, 42 * fill, 3, '#22d3c5');
        } else {
          var k = clamp(pt / 6.5, 0, 1), e = k * k * (3 - 2 * k);
          var x = lerp(bx, W * 0.54, e), base = lerp(gy, horizon - 8, e) - Math.sin(k * Math.PI) * (gy - G.top) * 0.28, sc = lerp(1, 0.3, e);
          balloon(x, base + Math.sin(t * 2) * 1.5, sc, 1, true);
        }
      }
    };
  }

  var GAMES = [
    { name: 'Speed Run!', hint: 'Tap or press Space to jump the lab gear.', make: makeRun },
    { name: 'Strawberry Catch', hint: 'Slide to move the basket. Lab gear is worth more!', make: makeCatch },
    { name: 'Microbe Match', hint: 'Tap two cards to find a matching pair.', make: makeMemory },
    { name: 'Bubble Pop', hint: 'Pop the bubbles. Big ones take 10 taps!', make: makeBubbles },
    { name: 'Feed the Cows', hint: 'Tap a hungry cow to toss it a strawberry.', make: makeCows },
    { name: 'Up, Up and Away', hint: 'Tap fast to fill the balloon!', make: makeBalloon }
  ];

  /* ===============================================================
     HOOKS
  ================================================================ */
  window.BrainBreak = {
    deckDone: function () { celebrate(); },   // app.js calls this when a deck is finished
    party: celebrate,
    popup: showPopup,
    play: function (n) { openGame((n | 0) - 1); }
  };

  // Testing shortcuts. Works whether "break=..." is typed before or after
  // the #study part of the address, and without needing a page reload.
  var lastShortcut = '';
  function shortcut() {
    var m = /[?&#]break=([a-z0-9]+)/i.exec(String(location.href));
    var q = m ? m[1].toLowerCase() : '';
    if (!q || q === lastShortcut) { if (!q) lastShortcut = ''; return; }
    lastShortcut = q;
    setTimeout(function () {
      if (q === 'party') celebrate();
      else if (q === 'popup') showPopup();
      else if (+q >= 1 && +q <= GAMES.length) openGame(+q - 1);
    }, 400);
  }
  window.addEventListener('hashchange', shortcut);
  shortcut();
})();
