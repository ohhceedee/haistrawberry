/* HaiStrawberry test mode. Builds a multiple-choice test from the decks in data.js.
   Answers are not revealed until the end. You shouldn't need to edit this file. */
(function () {
  var DATA = window.SITE_DATA || { decks: [] };
  var root = document.getElementById('test');

  // same deck/card ids as the Study Lab (app.js)
  function slug(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'deck'; }
  function hash(s) { var h = 5381; s = String(s); for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); }
  var DECKS = (DATA.decks || []).map(function (d, i) {
    return {
      id: slug(d.code || d.title) + '-' + i, code: d.code || '', title: d.title || 'Untitled deck', group: d.group || '', date: d.date || '', html: !!d.html,
      cards: (d.cards || []).filter(function (c) { return c && c.q && c.a; }).map(function (c) {
        return { id: hash(c.q), q: c.q, a: c.a, wrong: Array.isArray(c.wrong) ? c.wrong.filter(Boolean) : [], why: c.why || '', img: c.img || '', aimg: c.aimg || '', html: !!(c.html || d.html) };
      })
    };
  }).filter(function (d) { return d.cards.length; });
  var byId = {}; DECKS.forEach(function (d) { byId[d.id] = d; });

  // groups in Study Lab order: newest date first, ungrouped last
  var GROUPS = (function () {
    var gs = [], by = {};
    DECKS.forEach(function (d) { var g = d.group || 'Other decks'; if (!by[g]) { by[g] = { name: g, decks: [], named: !!d.group }; gs.push(by[g]); } by[g].decks.push(d); });
    var named = gs.filter(function (g) { return g.named; });
    named.forEach(function (g, i) { g.pos = i; g.date = g.decks.reduce(function (m, d) { return d.date > m ? d.date : m; }, ''); });
    named.sort(function (a, b) { return a.date !== b.date ? (a.date < b.date ? 1 : -1) : b.pos - a.pos; });
    return named.concat(gs.filter(function (g) { return !g.named; }));
  })();

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var OKTAG = /&lt;(\/?)(i|b|em|strong|sub|sup|u|br)\s*\/?&gt;/g;
  function rich(c, s) { var t = esc(s); return c && c.html ? t.replace(OKTAG, '<$1$2>') : t; }
  function imgSrc(v) { if (!v) return ''; if (/^data:|^https?:|\//.test(v)) return v; var m = window.CARD_IMAGES || {}; return m[v] || ''; }
  function img(v, alt) { var s = imgSrc(v); return s ? '<img src="' + esc(s) + '" alt="' + alt + '" loading="lazy">' : ''; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function answerKey(a) { return String(a).split(/<br\s*\/?>/i)[0].replace(/<[^>]*>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }
  function load(k, def) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? def : v; } catch (e) { return def; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function sload(k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch (e) { return null; } }
  function ssave(k, v) { try { if (v == null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  // decoys: the card's own look-alikes first, then its deck, then the other chosen decks, then everything
  function choicesFor(deck, c, chosen) {
    var seen = {}, keys = {}; seen[c.a] = 1; keys[answerKey(c.a)] = 1;
    var pool = c.wrong.slice();
    shuffle(deck.cards).forEach(function (o) { if (o.id !== c.id) pool.push(o.a); });
    shuffle(chosen).forEach(function (id) { if (id !== deck.id) shuffle(byId[id].cards).forEach(function (o) { pool.push(o.a); }); });
    shuffle(DECKS).forEach(function (d) { if (chosen.indexOf(d.id) < 0) d.cards.forEach(function (o) { pool.push(o.a); }); });
    var wrong = [];
    pool.forEach(function (a) { var k = answerKey(a); if (wrong.length < 3 && !seen[a] && !keys[k]) { seen[a] = 1; keys[k] = 1; wrong.push(a); } });
    return shuffle([c.a].concat(wrong));
  }

  // ---------- state ----------
  var picked = load('testDecks', []).filter(function (id) { return byId[id]; });
  var length = load('testLength', 25);
  var T = sload('testRun');           // a test in progress survives a refresh
  if (T && !T.qs.every(function (q) { return byId[q.d]; })) T = null;
  var screen = T ? (T.done ? 'results' : 'question') : 'setup';

  function card(q) { var d = byId[q.d]; for (var i = 0; i < d.cards.length; i++) if (d.cards[i].id === q.c) return d.cards[i]; return null; }
  function poolSize() { return picked.reduce(function (t, id) { return t + byId[id].cards.length; }, 0); }

  function build(list) {
    // list: [{d, c}] or null to draw from the picked decks
    var all = list || [];
    if (!list) picked.forEach(function (id) { byId[id].cards.forEach(function (c) { all.push({ d: id, c: c.id }); }); });
    all = shuffle(all);
    if (!list && length !== 'all') all = all.slice(0, length);
    var chosen = list ? Array.from(new Set(list.map(function (q) { return q.d; }))) : picked.slice();
    T = { qs: all.map(function (q) { var c = card(q); return { d: q.d, c: q.c, ch: choicesFor(byId[q.d], c, chosen), pick: null }; }), i: 0, done: false };
    ssave('testRun', T); screen = 'question'; render(); window.scrollTo(0, 0);
  }

  // ---------- screens ----------
  function lengthPicker(n) {
    var q = length === 'all' ? n : Math.min(length, n);
    return '<p class="t-lbl" style="margin-top:0">How many questions</p><div class="t-len" role="group" aria-label="Number of questions" style="margin-top:10px">' +
      [10, 25, 50, 'all'].map(function (v) { return '<button data-len="' + v + '" aria-pressed="' + (length === v) + '">' + (v === 'all' ? 'All' : v) + '</button>'; }).join('') + '</div>' +
      '<p class="t-lbl" style="margin-top:26px">Decks to include</p>';
  }
  function setupView() {
    var n = poolSize(), q = length === 'all' ? n : Math.min(length, n);
    var h = '<div class="t-top"><a class="t-link" href="./#study">← Study Lab</a></div>' +
      '<div class="t-head"><p class="eyebrow">Study Lab</p><h1>Create a Test</h1><p>Choose how long, then pick the decks to pull from. Answers stay hidden until the end, then you get your score and the ones to review.</p></div>' +
      lengthPicker(n) +
      '<div class="t-bulk" style="margin:10px 0 14px"><button class="t-link" data-act="all">Select all</button><button class="t-link" data-act="none">Clear</button></div>';
    GROUPS.forEach(function (g, gi) {
      var ids = g.decks.map(function (d) { return d.id; }), on = ids.filter(function (id) { return picked.indexOf(id) > -1; }).length;
      var cards = g.decks.reduce(function (t, d) { return t + d.cards.length; }, 0);
      h += '<section class="t-group"><div class="t-ghead"><label><input type="checkbox" data-group="' + gi + '"' + (on === ids.length ? ' checked' : '') + (on && on < ids.length ? ' data-mixed="1"' : '') + '>' + esc(g.name) + '</label><span class="t-gmeta">' + cards + ' cards</span></div><ul class="t-decks">' +
        g.decks.map(function (d) {
          return '<li class="t-deck"><label><input type="checkbox" data-deck="' + esc(d.id) + '"' + (picked.indexOf(d.id) > -1 ? ' checked' : '') + '><span class="nm"><span class="cd">' + esc(d.code) + '</span>' + esc(d.title) + '</span><span class="ct">' + d.cards.length + '</span></label></li>';
        }).join('') + '</ul></section>';
    });
    h += '<div class="t-bar"><div class="t-bar-in"><span>' + (n ? n + ' cards picked · ' + q + ' question' + (q === 1 ? '' : 's') : 'Pick at least one deck') + '</span>' +
      '<button class="btn" data-act="start"' + (n < 2 ? ' disabled' : '') + '>Start test →</button></div></div>';
    return h;
  }

  // the question screen is a fixed frame: sticky top bar, a stage that fades, a pinned bottom bar
  function questionShell() {
    return '<div class="t-qtop"><button class="t-exit" data-act="exit" aria-label="Exit test">×</button>' +
      '<div class="t-prog"><b id="t-count"></b><span class="t-track"><span id="t-fill"></span></span></div></div>' +
      '<div class="t-stage" id="t-stage" aria-live="polite"></div>' +
      '<div class="t-bar t-qbar"><div class="t-bar-in"><button class="btn alt" data-act="prev">← Back</button><button class="btn" data-act="next">Next →</button></div></div>' +
      '<div class="t-modal" id="t-modal" hidden><div class="t-dialog" role="alertdialog" aria-modal="true" aria-labelledby="t-mh" aria-describedby="t-mp">' +
      '<h2 id="t-mh">Exit this test?</h2><p id="t-mp"></p><div class="t-dacts">' +
      '<button class="btn" data-act="exit-no">Keep going</button>' +
      '<button class="btn alt" data-act="exit-score">Finish now and see my score</button>' +
      '<button class="t-link" data-act="exit-yes">Exit without a score</button></div></div></div>';
  }
  function stageHTML() {
    var q = T.qs[T.i], c = card(q), src = imgSrc(c.img);
    return (src ? '<div class="t-pic"><img src="' + esc(src) + '" alt="Question image"></div>' : '') +
      '<p class="t-qtext">' + rich(c, c.q) + '</p>' +
      '<div class="choices" role="radiogroup" aria-label="Answer choices">' + q.ch.map(function (a, i) {
        return '<button class="choice' + (q.pick === i ? ' sel' : '') + '" role="radio" aria-checked="' + (q.pick === i) + '" data-pick="' + i + '"><span class="key">' + 'ABCD'[i] + '</span><span>' + rich(c, a) + '</span></button>';
      }).join('') + '</div>' +
      '<p class="t-hint">1–4 or A–D to choose · Enter for next · Esc to exit</p>';
  }
  function updateChrome() {
    var n = T.qs.length, q = T.qs[T.i], answered = T.qs.filter(function (x) { return x.pick !== null; }).length;
    root.querySelector('#t-count').textContent = (T.i + 1) + ' / ' + n;
    root.querySelector('#t-fill').style.width = Math.round(answered / n * 100) + '%';
    var prev = root.querySelector('[data-act="prev"]'), next = root.querySelector('[data-act="next"]');
    prev.disabled = T.i === 0; next.disabled = q.pick === null;
    next.textContent = T.i + 1 < n ? 'Next →' : 'Finish test';
  }
  function preload() {
    for (var k = 1; k <= 2; k++) { var q = T.qs[T.i + k]; if (!q) break; var s = imgSrc(card(q).img); if (s) { var im = new Image(); im.src = s; } }
  }
  function showQuestion(animate) {
    var stage = root.querySelector('#t-stage');
    function swap() {
      stage.innerHTML = stageHTML(); updateChrome(); preload();
      window.scrollTo(0, 0);
      if (animate) requestAnimationFrame(function () { requestAnimationFrame(function () { stage.classList.remove('out'); }); });
    }
    if (!animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { stage.classList.remove('out'); swap(); return; }
    stage.classList.add('out');
    setTimeout(swap, 160);
  }

  function results() {
    var right = 0, per = {}, missed = [];
    T.qs.forEach(function (q) {
      var c = card(q), ok = q.pick !== null && q.ch[q.pick] === c.a;
      per[q.d] = per[q.d] || { r: 0, n: 0 }; per[q.d].n++;
      if (ok) { right++; per[q.d].r++; } else missed.push(q);
    });
    return { right: right, per: per, missed: missed };
  }

  function resultsView() {
    var r = results(), n = T.qs.length, pct = Math.round(r.right / n * 100);
    var msg = pct === 100 ? 'Perfect score. Every single one!' : pct >= 90 ? 'Amazing. You really know this.' : pct >= 80 ? 'Strong work. Just a few to review.' : pct >= 70 ? 'Solid. Review the misses and go again.' : pct >= 50 ? 'Getting there. The review below is where the points are.' : 'Good practice run. Review, then try the missed ones again.';
    var h = '<div class="t-top"><a class="t-link" href="./#study">← Study Lab</a></div>' +
      '<div class="t-head"><p class="eyebrow">Create a Test</p><h1>Your results</h1></div>' +
      '<div class="t-score"><div class="big">' + r.right + ' <small>/ ' + n + '</small></div><div class="pct">' + pct + '%</div><p class="msg">' + msg + '</p></div>' +
      '<div class="t-acts">' + (r.missed.length ? '<button class="btn" data-act="review">Review missed (' + r.missed.length + ')</button><button class="btn alt" data-act="retry-missed">Retest the missed ones</button>' : '') +
      '<button class="btn alt" data-act="new">New test</button></div>';
    var ids = Object.keys(r.per);
    if (ids.length > 1) {
      h += '<h2 class="t-h2">By deck</h2><table class="t-break">' + ids.map(function (id) {
        var d = byId[id], p = r.per[id];
        return '<tr><td><span class="cd">' + esc(d.code) + '</span>' + esc(d.title) + '</td><td>' + p.r + ' / ' + p.n + '</td></tr>';
      }).join('') + '</table>';
    }
    if (r.missed.length) {
      h += '<h2 class="t-h2" id="review">Review missed</h2><ol class="t-miss">' + r.missed.map(function (q) {
        var c = card(q), d = byId[q.d];
        return '<li><div class="t-from">' + esc(d.code) + ' · ' + esc(d.title) + '</div>' + img(c.img, 'Question image') + '<div class="q">' + rich(c, c.q) + '</div>' +
          '<div class="yours"><span class="tag">Your answer</span>' + (q.pick === null ? '<i>Skipped</i>' : rich(c, q.ch[q.pick])) + '</div>' +
          '<div class="right"><span class="tag">Correct answer</span>' + rich(c, c.a) + (c.why ? '<p style="margin-top:6px">' + rich(c, c.why) + '</p>' : '') + img(c.aimg, 'Answer image') + '</div></li>';
      }).join('') + '</ol>';
    }
    return h;
  }

  function render() {
    document.body.classList.toggle('t-taking', screen === 'question');
    if (screen === 'question') { root.innerHTML = questionShell(); showQuestion(false); return; }
    root.innerHTML = screen === 'setup' ? setupView() : resultsView();
    var mixed = root.querySelectorAll('[data-mixed]'); for (var i = 0; i < mixed.length; i++) mixed[i].indeterminate = true;
  }

  function finish() { T.done = true; ssave('testRun', T); screen = 'results'; closeModal(); render(); window.scrollTo(0, 0); }
  var busy = false;
  function go(delta) {
    if (busy || modalOpen()) return;
    var q = T.qs[T.i];
    if (delta > 0 && q.pick === null) return;
    if (delta > 0 && T.i + 1 >= T.qs.length) { finish(); return; }
    var to = Math.max(0, Math.min(T.qs.length - 1, T.i + delta)); if (to === T.i) return;
    T.i = to; ssave('testRun', T);
    busy = true; showQuestion(true); setTimeout(function () { busy = false; }, 200);
  }
  // picking an answer only changes classes: nothing redraws, so nothing jumps
  function choose(i) {
    if (modalOpen()) return;
    var q = T.qs[T.i]; if (i >= q.ch.length) return;
    q.pick = i; ssave('testRun', T);
    var bs = root.querySelectorAll('#t-stage [data-pick]');
    for (var k = 0; k < bs.length; k++) { var on = +bs[k].dataset.pick === i; bs[k].classList.toggle('sel', on); bs[k].setAttribute('aria-checked', on); }
    updateChrome();
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  }

  function modalOpen() { var m = root.querySelector('#t-modal'); return m && !m.hidden; }
  function openModal() {
    var m = root.querySelector('#t-modal'); if (!m) return;
    var answered = T.qs.filter(function (x) { return x.pick !== null; }).length, n = T.qs.length;
    root.querySelector('#t-mp').textContent = 'You’ve answered ' + answered + ' of ' + n + '. You can finish now and get a score (unanswered ones count as missed), or leave without one.';
    m.hidden = false; root.querySelector('[data-act="exit-no"]').focus();
  }
  function closeModal() { var m = root.querySelector('#t-modal'); if (m) m.hidden = true; }
  function exitTest() { T = null; ssave('testRun', null); screen = 'setup'; render(); window.scrollTo(0, 0); }

  root.addEventListener('change', function (e) {
    var t = e.target;
    if (t.dataset.deck) { var id = t.dataset.deck; picked = picked.filter(function (x) { return x !== id; }); if (t.checked) picked.push(id); }
    else if (t.dataset.group !== undefined) {
      var ids = GROUPS[+t.dataset.group].decks.map(function (d) { return d.id; });
      picked = picked.filter(function (x) { return ids.indexOf(x) < 0; }); if (t.checked) picked = picked.concat(ids);
    } else return;
    save('testDecks', picked); var y = window.scrollY; render(); window.scrollTo(0, y);
  });

  root.addEventListener('click', function (e) {
    if (e.target.id === 't-modal') { closeModal(); return; }   // tap outside the box = keep going
    var t = e.target.closest('[data-act],[data-len],[data-pick]'); if (!t) return;
    if (t.dataset.pick !== undefined) { choose(+t.dataset.pick); return; }
    if (t.dataset.len) { length = t.dataset.len === 'all' ? 'all' : +t.dataset.len; save('testLength', length); var y = window.scrollY; render(); window.scrollTo(0, y); return; }
    switch (t.dataset.act) {
      case 'all': picked = DECKS.map(function (d) { return d.id; }); save('testDecks', picked); render(); break;
      case 'none': picked = []; save('testDecks', picked); render(); break;
      case 'start': if (poolSize() > 1) build(null); break;
      case 'next': go(1); break;
      case 'prev': go(-1); break;
      case 'exit': openModal(); break;
      case 'exit-no': closeModal(); break;
      case 'exit-score': finish(); break;
      case 'exit-yes': exitTest(); break;
      case 'review': var el = document.getElementById('review'); if (el) el.scrollIntoView({ behavior: 'smooth' }); break;
      case 'retry-missed': build(results().missed.map(function (q) { return { d: q.d, c: q.c }; })); break;
      case 'new': T = null; ssave('testRun', null); screen = 'setup'; render(); window.scrollTo(0, 0); break;
    }
  });

  document.addEventListener('keydown', function (e) {
    if (screen !== 'question' || e.metaKey || e.ctrlKey || e.altKey) return;
    if (modalOpen()) { if (e.key === 'Escape') { e.preventDefault(); closeModal(); } return; }
    if (e.key === 'Escape') { e.preventDefault(); openModal(); return; }
    var m = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, b: 1, c: 2, d: 3 }[e.key.toLowerCase()];
    if (m !== undefined) { e.preventDefault(); choose(m); }
    else if (e.key === 'Enter') { var a = document.activeElement; if (a && a.dataset && a.dataset.act && a.dataset.act !== 'next') return; e.preventDefault(); go(1); }
    else if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'ArrowRight') go(1);
  });

  render();
})();
