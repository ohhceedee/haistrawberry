/* =====================================================================
   Vinyl scratch easter egg
   ---------------------------------------------------------------------
   Drag the spinning record on the front page back and forth: it follows
   your finger and makes a scratch sound. Let go after a real scratch and
   one of the clips listed in data.js (vinyl: { clips: [...] }) plays.
   With no clips listed, it's just the scratch. Quick taps still count
   toward the 5-tap Jetty Strawbz secret.
   ===================================================================== */
(function () {
  var cfg = (window.SITE_DATA && window.SITE_DATA.vinyl) || {};
  var CLIPS = (cfg.clips || []).filter(Boolean);
  var SPIN_SECONDS = 9;               // matches the .record spin animation in styles.css
  var MOVE_TO_DRAG = 6;               // px before a touch counts as a drag, not a tap
  var SCRATCH_DEG = 90;               // how much back-and-forth counts as a "real" scratch

  var ctx = null, noise = null, filter = null, gain = null;
  function audio() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return ctx; }
    var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    ctx = new AC();
    // a loop of noise through a sweeping filter = vinyl scratch
    var len = ctx.sampleRate * 2, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (0.6 + 0.4 * Math.sin(i / 90));
    noise = ctx.createBufferSource(); noise.buffer = buf; noise.loop = true;
    filter = ctx.createBiquadFilter(); filter.type = 'bandpass'; filter.Q.value = 2.2; filter.frequency.value = 900;
    gain = ctx.createGain(); gain.gain.value = 0;
    noise.connect(filter); filter.connect(gain); gain.connect(ctx.destination); noise.start();
    return ctx;
  }
  function scratch(speed) {          // speed: degrees per millisecond, signed
    if (!ctx || !gain) return;
    var s = Math.min(Math.abs(speed), 3), t = ctx.currentTime;
    gain.gain.setTargetAtTime(Math.min(0.55, s * 0.32), t, 0.015);
    filter.frequency.setTargetAtTime(500 + s * 1500 + (speed < 0 ? -200 : 200), t, 0.02);
  }
  function hush() { if (gain) gain.gain.setTargetAtTime(0, ctx.currentTime, 0.04); }

  var clip = null, lastClip = -1;
  function playClip() {
    if (!CLIPS.length) return;
    if (clip) { clip.pause(); clip = null; }
    // first scratch of the visit: any clip at random; every scratch after that: the next one in the list, looping
    var i = lastClip < 0 ? Math.floor(Math.random() * CLIPS.length) : (lastClip + 1) % CLIPS.length;
    lastClip = i; clip = new Audio(CLIPS[i]); clip.play().catch(function () {});
  }

  function angleOf(el) {             // the record's current rotation, read from its live transform
    var m = getComputedStyle(el).transform; if (!m || m === 'none') return 0;
    var v = m.match(/matrix\(([^)]+)\)/); if (!v) return 0;
    var p = v[1].split(',').map(parseFloat); return Math.atan2(p[1], p[0]) * 180 / Math.PI;
  }
  function pointerAngle(el, e) { var r = el.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; }

  var drag = null, swallowClick = false;
  document.addEventListener('pointerdown', function (e) {
    var rec = e.target.closest && e.target.closest('.record'); if (!rec || e.button > 0) return;
    drag = { el: rec, id: e.pointerId, x: e.clientX, y: e.clientY, moved: false, base: angleOf(rec), start: pointerAngle(rec, e), last: pointerAngle(rec, e), t: performance.now(), travel: 0, angle: 0 };
    audio();
  });
  document.addEventListener('pointermove', function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    if (!drag.moved) {
      if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < MOVE_TO_DRAG) return;
      drag.moved = true;
      try { drag.el.setPointerCapture(drag.id); } catch (_) {}
      drag.el.style.animation = 'none'; drag.el.classList.add('scratching');
      if (clip) { clip.pause(); clip = null; }
    }
    e.preventDefault();
    var a = pointerAngle(drag.el, e), step = a - drag.last; if (step > 180) step -= 360; if (step < -180) step += 360;
    var now = performance.now(), dt = Math.max(8, now - drag.t);
    drag.angle += step; drag.travel += Math.abs(step); drag.last = a; drag.t = now;
    drag.el.style.transform = 'rotate(' + (drag.base + drag.angle) + 'deg)';
    scratch(step / dt);
  }, { passive: false });
  function release(e) {
    if (!drag || (e && e.pointerId !== drag.id)) return;
    var d = drag; drag = null; hush();
    if (!d.moved) return;                         // a tap: leave it to the secret-tap counter
    swallowClick = true; setTimeout(function () { swallowClick = false; }, 400);
    // carry on spinning from wherever she left it
    var ang = ((d.base + d.angle) % 360 + 360) % 360;
    d.el.style.transform = ''; d.el.classList.remove('scratching');
    d.el.style.animation = ''; d.el.style.animationDelay = (-ang / 360 * SPIN_SECONDS) + 's';
    if (d.travel >= SCRATCH_DEG) playClip();
  }
  document.addEventListener('pointerup', release);
  document.addEventListener('pointercancel', release);
  // a drag isn't a tap: keep it from counting toward the 5-tap secret
  window.addEventListener('click', function (e) {
    if (swallowClick && e.target.closest && e.target.closest('.record')) { e.stopPropagation(); e.preventDefault(); swallowClick = false; }
  }, true);
})();
