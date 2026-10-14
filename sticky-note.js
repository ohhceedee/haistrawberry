/* =====================================================================
   Sticky note pop-up
   ---------------------------------------------------------------------
   Shows a post-it note when the site loads, until SHOW_UNTIL passes.
   After that it does nothing, so it can stay in the site harmlessly.
   To reuse it: change NOTE_TEXT and SHOW_UNTIL, then re-upload this file.
   ===================================================================== */
(function () {
  var NOTE_TEXT = "Remember: You’re a bad ass bitch!";
  var SHOW_UNTIL = "2026-10-16T00:00:00-06:00"; // end of Thu Oct 15, Mountain time

  if (Date.now() >= new Date(SHOW_UNTIL).getTime()) return;

  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap';
  document.head.appendChild(font);

  var css = document.createElement('style');
  css.textContent =
    '.sn-veil{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:24px;' +
      'background:rgba(29,11,46,.35);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);animation:sn-fade .3s ease both}' +
    '.sn-note{position:relative;width:min(300px,82vw);aspect-ratio:1/1;padding:42px 26px 26px;box-sizing:border-box;' +
      'background:linear-gradient(170deg,#ffd6ea 0%,#ffc2e0 100%);color:#5a1440;' +
      'font-family:Caveat,"Bradley Hand","Segoe Print","Comic Sans MS",cursive;' +
      'box-shadow:0 18px 30px -12px rgba(60,10,40,.45),0 2px 4px rgba(60,10,40,.15);' +
      'transform:rotate(-3deg);animation:sn-drop .55s cubic-bezier(.2,1.4,.4,1) both;cursor:pointer;' +
      'display:flex;flex-direction:column;justify-content:center;text-align:center}' +
    '.sn-note::before{content:"";position:absolute;top:-12px;left:50%;width:96px;height:28px;margin-left:-48px;' +
      'background:rgba(120,210,200,.55);transform:rotate(2deg);box-shadow:0 1px 2px rgba(0,0,0,.08)}' +
    '.sn-note::after{content:"";position:absolute;right:0;bottom:0;width:34px;height:34px;' +
      'background:linear-gradient(135deg,#f3a9cc 50%,rgba(0,0,0,0) 50%);box-shadow:-2px -2px 4px rgba(60,10,40,.12)}' +
    '.sn-kicker{font-size:26px;font-weight:600;margin:0 0 6px;opacity:.85}' +
    '.sn-msg{font-size:38px;font-weight:700;line-height:1.05;margin:0}' +
    '.sn-heart{font-size:26px;margin-top:12px;color:#C93F80}' +
    '.sn-x{position:absolute;top:8px;right:10px;width:32px;height:32px;border:0;border-radius:50%;' +
      'background:transparent;color:#5a1440;font:700 22px/1 system-ui,sans-serif;cursor:pointer;opacity:.6}' +
    '.sn-x:hover,.sn-x:focus-visible{opacity:1;background:rgba(255,255,255,.4);outline:none}' +
    '.sn-hint{position:absolute;bottom:-34px;left:0;right:0;text-align:center;color:#fff;' +
      'font:500 13px/1.2 system-ui,sans-serif;text-shadow:0 1px 3px rgba(0,0,0,.4)}' +
    '.sn-out{animation:sn-fade .25s ease reverse both}' +
    '@keyframes sn-fade{from{opacity:0}to{opacity:1}}' +
    '@keyframes sn-drop{from{opacity:0;transform:translateY(-60px) rotate(-12deg) scale(.9)}to{opacity:1;transform:rotate(-3deg)}}' +
    '@media (prefers-reduced-motion:reduce){.sn-veil,.sn-note,.sn-out{animation:none}}';
  document.head.appendChild(css);

  function show() {
    // split "Remember:" onto its own line when the text starts with it
    var m = NOTE_TEXT.match(/^(Remember:)\s*(.*)$/i);
    var veil = document.createElement('div');
    veil.className = 'sn-veil';
    veil.setAttribute('role', 'dialog');
    veil.setAttribute('aria-modal', 'true');
    veil.setAttribute('aria-label', NOTE_TEXT);

    var note = document.createElement('div');
    note.className = 'sn-note';
    if (m) {
      var k = document.createElement('p'); k.className = 'sn-kicker'; k.textContent = m[1]; note.appendChild(k);
    }
    var p = document.createElement('p'); p.className = 'sn-msg'; p.textContent = m ? m[2] : NOTE_TEXT; note.appendChild(p);
    var h = document.createElement('div'); h.className = 'sn-heart'; h.textContent = '♥'; h.setAttribute('aria-hidden', 'true'); note.appendChild(h);

    var x = document.createElement('button');
    x.className = 'sn-x'; x.type = 'button'; x.setAttribute('aria-label', 'Close'); x.textContent = '×';
    note.appendChild(x);

    var hint = document.createElement('div'); hint.className = 'sn-hint'; hint.textContent = 'tap anywhere to close';
    note.appendChild(hint);

    veil.appendChild(note);
    document.body.appendChild(veil);
    x.focus({ preventScroll: true });

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
