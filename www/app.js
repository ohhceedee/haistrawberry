/* HaiStrawberry site script. Content lives in data.js; you shouldn't need to edit this file. */
(function () {
  var DATA = window.SITE_DATA || { profile: {}, tracks: [], playlists: [], decks: [] };
  var P = DATA.profile || {};
  P.likes = P.likes || [];
  var TRACKS = DATA.tracks || [];
  var PLAYLISTS = DATA.playlists || [];

  // Give every deck and card a stable id so study progress survives edits.
  function slug(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'deck'; }
  function hash(s) { var h = 5381; s = String(s); for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); }
  var DECKS = (DATA.decks || []).map(function (d, i) {
    return {
      id: slug(d.code || d.title) + '-' + i,
      code: d.code || '', title: d.title || 'Untitled deck', cap: d.cap || 'lavender', group: d.group || '', html: !!d.html,
      cards: (d.cards || []).filter(function (c) { return c && c.q && c.a; })
        .map(function (c) { return { id: hash(c.q), q: c.q, a: c.a, wrong: Array.isArray(c.wrong) ? c.wrong.filter(Boolean) : [], why: c.why || '', img: c.img || '', html: !!(c.html || d.html) }; })
    };
  });

  var CAPS = { lavender: ['Lavender · EDTA', '#8E7CC3'], pink: ['Pink · EDTA (blood bank)', '#E48DB0'], gold: ['Gold · SST', '#D6A21E'], lightblue: ['Light blue · citrate', '#7EB8DA'], green: ['Green · heparin', '#4C9A6A'], gray: ['Gray · fluoride', '#8C939C'], red: ['Red · clot', '#C8412F'] };
  var view = location.hash === '#study' ? 'study' : 'about';
  var deckId = null, idx = 0, flipped = false, order = [];
  var mode = 'flip', quiz = null;
  var app = document.getElementById('app');

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function cap(k) { return (CAPS[k] || CAPS.lavender)[1]; }
  var OKTAG = /&lt;(\/?)(i|b|em|strong|sub|sup|u|br)\s*\/?&gt;/g;
  function rich(c, str) { var t = esc(str); return c && c.html ? t.replace(OKTAG, '<$1$2>') : t; }
  function imgSrc(v) { if (!v) return ''; if (/^data:|^https?:/.test(v)) return v; var m = window.CARD_IMAGES || {}; return m[v] || ''; }
  function cardImg(c, cls) { var src = imgSrc(c.img); return src ? '<img class="' + cls + '" src="' + esc(src) + '" alt="Study image" loading="lazy">' : ''; }
  function capName(k) { return (CAPS[k] || CAPS.lavender)[0]; }
  function isSpotify(u) { return /^https:\/\/open\.spotify\.com\//.test(String(u || '').trim()); }
  function getKnown(id) { try { return new Set(JSON.parse(localStorage.getItem('known:' + id) || '[]')); } catch (e) { return new Set(); } }
  function setKnown(id, set) { try { localStorage.setItem('known:' + id, JSON.stringify(Array.from(set))); } catch (e) {} }
  function deck() { for (var i = 0; i < DECKS.length; i++) if (DECKS[i].id === deckId) return DECKS[i]; return null; }
  var toastT;
  function toast(msg) { var t = document.getElementById('toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(function () { t.hidden = true; }, 2500); }

  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function choicesFor(d, c) {
    var seen = {}; seen[c.a] = 1;
    var pool = c.wrong.slice();
    shuffle(d.cards).forEach(function (o) { if (o.id !== c.id) pool.push(o.a); });
    DECKS.forEach(function (dd) { if (dd.id !== d.id) shuffle(dd.cards).forEach(function (o) { pool.push(o.a); }); });
    var wrong = [];
    pool.forEach(function (a) { if (wrong.length < 3 && !seen[a]) { seen[a] = 1; wrong.push(a); } });
    return shuffle([c.a].concat(wrong));
  }
  function startQuiz(d) {
    var ord = shuffle(d.cards.map(function (_, i) { return i; }));
    quiz = { order: ord, i: 0, picked: null, score: 0, done: false, missed: [] };
    quiz.choices = choicesFor(d, d.cards[ord[0]]);
  }
  function quizView(d) {
    var n = d.cards.length;
    if (quiz.done) {
      var pct = Math.round(quiz.score / n * 100);
      return '<div class="viewer"><div class="face qdone"><span class="side">Results</span><p class="score">' + quiz.score + ' <span>of</span> ' + n + '</p>' +
        '<p class="qmsg">' + (pct === 100 ? 'Perfect run. Every answer right.' : pct >= 80 ? 'Strong work. Just a few to review.' : pct >= 50 ? 'Getting there. Review the ones below and go again.' : 'Good practice. Flip through the cards, then try again.') + '</p></div>' +
        '<div class="ctrl"><button class="got" data-act="quiz-restart">Try again</button><button class="ghost" data-act="mode-flip">Back to flip cards</button></div></div>' +
        (quiz.missed.length ? '<h2>Review these</h2><ol class="list">' + quiz.missed.map(function (c) { return '<li class="row"><div class="rq">' + cardImg(c, 'row-img') + rich(c, c.q) + '</div><div class="ra">' + rich(c, c.a) + '</div><div class="acts"></div></li>'; }).join('') + '</ol>' : '');
    }
    var c = d.cards[quiz.order[quiz.i]], answered = quiz.picked !== null;
    var h = '<div class="viewer"><div class="face qcard"><div class="qtop"><span class="side">Question ' + (quiz.i + 1) + ' of ' + n + '</span><span class="count">Score ' + quiz.score + '</span></div>' +
      '<div class="qbar"><span style="width:' + Math.round(quiz.i / n * 100) + '%"></span></div>' + cardImg(c, 'card-img') + '<p>' + rich(c, c.q) + '</p></div>' +
      '<div class="choices" role="group" aria-label="Answer choices">' + quiz.choices.map(function (a, i) {
        var cls = 'choice';
        if (answered) { if (a === c.a) cls += ' right'; else if (i === quiz.picked) cls += ' wrong'; else cls += ' dim'; }
        return '<button class="' + cls + '" data-pick="' + i + '"' + (answered ? ' disabled' : '') + '><span class="key">' + 'ABCD'[i] + '</span><span>' + rich(c, a) + '</span></button>';
      }).join('') + '</div>';
    if (answered) {
      var ok = quiz.choices[quiz.picked] === c.a;
      h += '<div class="verdict ' + (ok ? 'ok' : 'no') + '" role="status"><b>' + (ok ? 'Correct!' : 'Not quite.') + '</b>' +
        (c.why ? '<p>' + rich(c, c.why) + '</p>' : (ok ? '' : '<p>The answer: ' + rich(c, c.a) + '</p>')) + '</div>' +
        '<div class="ctrl"><button class="got" data-act="quiz-next">' + (quiz.i + 1 < n ? 'Next question →' : 'See results') + '</button></div>';
    }
    return h + '<p class="hint">Press 1–4 or A–D to answer, Enter for the next question.</p></div>';
  }

  function header() {
    return '<header class="top"><div class="wrap top-in"><a class="brand" href="#about">Hai<i>Strawberry</i></a>' +
      '<nav aria-label="Pages"><a class="navlink" href="#about"' + (view === 'about' ? ' aria-current="page"' : '') + '>About</a>' +
      '<a class="navlink" href="#study"' + (view === 'study' ? ' aria-current="page"' : '') + '>Study Lab</a></nav></div></header>';
  }

  var BALLOON = '<svg class="balloon" viewBox="0 0 24 28" aria-hidden="true"><path d="M12 2C6.8 2 4 6.2 4 11.2c0 3.8 2.4 7 5 9.3h6c2.6-2.3 5-5.5 5-9.3C20 6.2 17.2 2 12 2Z" fill="var(--accent)"/><path d="M12 2c-2.4 0-4.3 1.6-5.5 4.2-1 4 .1 8.6 2.7 14.3h5.6c2.6-5.7 3.7-10.3 2.7-14.3C16.3 3.6 14.4 2 12 2Z" fill="var(--violet)" opacity=".55"/><path d="M12 2c-1.1 0-2 .6-2.7 1.7C7.9 6.7 8.4 12 10 20.5h4C15.6 12 16.1 6.7 14.7 3.7 14 2.6 13.1 2 12 2Z" fill="var(--teal)"/><path d="M10 20.4l1 3.2h2l1-3.2z" fill="none" stroke="var(--muted)" stroke-width=".5"/><rect x="10.4" y="23.2" width="3.2" height="2.4" rx=".5" fill="#9a6b45"/></svg>';
  var LEAVES = '<svg class="leaves" viewBox="0 0 400 400" fill="none"><g stroke="var(--teal)" stroke-width="3" stroke-linecap="round"><path d="M40 360C110 300 150 250 170 170"/><path d="M360 60C310 90 270 130 250 200"/></g><g fill="var(--teal)" opacity=".8"><ellipse cx="70" cy="320" rx="26" ry="11" transform="rotate(-40 70 320)"/><ellipse cx="118" cy="286" rx="26" ry="11" transform="rotate(-70 118 286)"/><ellipse cx="96" cy="262" rx="22" ry="9" transform="rotate(-10 96 262)"/><ellipse cx="150" cy="220" rx="24" ry="10" transform="rotate(-60 150 220)"/></g><g fill="var(--violet)" opacity=".75"><ellipse cx="330" cy="86" rx="24" ry="10" transform="rotate(-30 330 86)"/><ellipse cx="290" cy="120" rx="24" ry="10" transform="rotate(-80 290 120)"/><ellipse cx="300" cy="150" rx="20" ry="8" transform="rotate(10 300 150)"/></g><g fill="var(--accent)"><circle cx="176" cy="160" r="9"/><circle cx="244" cy="206" r="8"/><circle cx="58" cy="350" r="6"/></g><path d="M300 330c10-14 30-14 40 0-10 6-30 6-40 0Zm20-6l6-8m-6 8l-6-8" stroke="var(--violet)" stroke-width="2" fill="var(--violet-soft)"/></svg>';

  function aboutView() {
    var initials = (P.name || '').trim().split(/\s+/).filter(Boolean).map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase() || 'CLS';
    var h = '<section class="hero wrap"><div class="hero-txt"><p class="eyebrow">🍓 welcome to my corner</p>' +
      '<h1>' + esc(P.name || 'Future lab scientist') + '</h1>' +
      (P.tagline ? '<p class="tag">' + esc(P.tagline) + BALLOON + '</p>' : '') +
      (P.about ? '<p class="about' + (P.about.indexOf('\n') > -1 ? ' haiku' : '') + '">' + esc(P.about).replace(/\n/g, '<br>') + '</p>' : '') +
      (Array.isArray(P.links) && P.links.length ? '<div class="chips">' + P.links.map(function (l) { var ext = /^https?:/.test(l.href || ''); return '<a class="chip chip-link" href="' + esc(l.href || '#') + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + esc(l.label || '') + '</a>'; }).join('') + '</div>' : '') +
      '<a class="btn" href="#study">Open the Study Lab →</a></div>' +
      '<div class="record-wrap" aria-hidden="true">' + LEAVES + '<div class="record"><div class="label"><span>SIDE A</span><b>🍓</b><span>haistrawberry</span></div></div></div></section>';

    if (TRACKS.length) {
      h += '<section class="wrap section"><h2>On repeat</h2><ol class="tracks">' + TRACKS.map(function (t, i) {
        return '<li><span class="n">' + String(i + 1).padStart(2, '0') + '</span><span><span class="t">' + esc(t.title || 'Untitled') + '</span>' + (t.artist ? ' <span class="a">· ' + esc(t.artist) + '</span>' : '') + '</span></li>';
      }).join('') + '</ol></section>';
    }

    var spOk = isSpotify(P.spotify), handle = (String(P.spotify || '').match(/\/user\/([^\/?#]+)/) || [])[1] || '';
    var embeds = PLAYLISTS.map(function (u) {
      var m = String(u || '').match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?(playlist|album)\/([A-Za-z0-9]+)/);
      return m ? '<iframe src="https://open.spotify.com/embed/' + m[1] + '/' + m[2] + '?utm_source=generator" loading="lazy" title="Spotify ' + m[1] + '" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>' : '';
    }).filter(Boolean);
    if (spOk || embeds.length) {
      h += '<section class="wrap section"><h2>My playlists</h2>' +
        (spOk ? '<a class="sp-profile" href="' + esc(P.spotify) + '" target="_blank" rel="noopener noreferrer"><span class="sp-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M5 9.5c4.5-1.6 9.5-1.2 14 1.2"/><path d="M6 13c3.8-1.2 7.8-.9 11.4 1"/><path d="M7 16.4c3-.9 6-.7 8.8.8"/></svg></span>' +
          '<span class="sp-text"><span class="eyebrow">On Spotify</span><b>' + esc(handle ? '@' + decodeURIComponent(handle) : 'My Spotify') + '</b><span>All my public playlists, always up to date</span></span><span class="sp-go">See playlists ↗</span></a>' : '') +
        (embeds.length ? '<div class="embeds">' + embeds.join('') + '</div>' : '') + '</section>';
    }
    return h;
  }

  function gridView() {
    return '<section class="wrap study-head"><p class="eyebrow">Study Lab</p><h1>Flashcards for CLS</h1>' +
      '<p>Pick a deck, flip the cards, and mark what you know. Your progress is saved on your own device only.</p></section>' +
      groupedDecks();
  }
  function deckCard(d) {
    var k = getKnown(d.id), n = d.cards.filter(function (c) { return k.has(c.id); }).length;
    return '<button class="deck" data-open="' + esc(d.id) + '"><span class="tube" style="--cap:' + cap(d.cap) + '"></span><span class="code">' + esc(d.code) + '</span><span class="dt">' + esc(d.title) + '</span><span class="meta">' + d.cards.length + ' cards · ' + n + ' known</span></button>';
  }
  function groupedDecks() {
    if (!DECKS.length) return '<section class="wrap"><p class="empty">No decks yet.</p></section>';
    var groups = [], byName = {};
    DECKS.forEach(function (d) {
      var g = d.group || '';
      if (!byName[g]) { byName[g] = { name: g, decks: [] }; groups.push(byName[g]); }
      byName[g].decks.push(d);
    });
    return groups.map(function (g) {
      var cards = g.decks.reduce(function (t, d) { return t + d.cards.length; }, 0);
      return '<section class="wrap deck-group">' +
        (g.name ? '<div class="group-head"><h2>' + esc(g.name) + '</h2><span class="group-meta">' + g.decks.length + ' decks · ' + cards + ' cards</span></div>' : '') +
        '<div class="decks">' + g.decks.map(deckCard).join('') + '</div></section>';
    }).join('');
  }

  function deckView(d) {
    var k = getKnown(d.id), n = d.cards.length;
    if (order.length !== n) order = d.cards.map(function (_, i) { return i; });
    if (idx >= n) idx = 0;
    var c = n ? d.cards[order[idx]] : null;
    var h = '<section class="wrap deck-view"><button class="back" data-act="back">← All decks</button>' +
      '<div class="dv-head"><span class="tube" style="--cap:' + cap(d.cap) + '"></span><div class="grow">' + (d.group ? '<p class="group-line">' + esc(d.group) + '</p>' : '') + '<p class="code">' + esc(d.code) + ' · ' + esc(capName(d.cap)) + '</p><h1>' + esc(d.title) + '</h1></div></div>';
    if (n) h += '<div class="modes" role="tablist" aria-label="Study mode"><button role="tab" data-act="mode-flip" aria-selected="' + (mode === 'flip') + '">Flip cards</button><button role="tab" data-act="mode-quiz" aria-selected="' + (mode === 'quiz') + '"' + (n < 2 ? ' disabled title="Add at least 2 cards"' : '') + '>Multiple choice</button></div>';
    if (c && mode === 'quiz' && quiz) return h + quizView(d) + '</section>';
    if (c) {
      h += '<div class="viewer"><button class="fc' + (flipped ? ' is-flipped' : '') + '" data-act="flip" aria-label="Flip card"><div class="fc-in">' +
        '<div class="face front"><span class="side">Question</span>' + cardImg(c, 'card-img') + '<p>' + rich(c, c.q) + '</p><div class="foot"><span class="count">' + (idx + 1) + ' / ' + n + '</span>' + (k.has(c.id) ? '<span class="known-tag">Known</span>' : '') + '</div></div>' +
        '<div class="face back"><span class="side">Answer</span><p>' + rich(c, c.a) + '</p><div class="foot"><span class="count">' + (idx + 1) + ' / ' + n + '</span></div></div>' +
        '</div></button>' +
        '<div class="ctrl"><button class="ghost" data-act="prev">← Prev</button><span class="count">' + k.size + ' of ' + n + ' known</span><button class="ghost" data-act="next">Next →</button></div>' +
        '<div class="ctrl"><button class="ghost" data-act="again">Study again</button><button class="got" data-act="got">Got it</button><button class="ghost" data-act="shuffle">Shuffle</button></div>' +
        '<p class="hint">Tap the card or press Space to flip. Arrow keys move between cards.</p></div>';
      h += '<h2>All cards</h2><ol class="list">' + d.cards.map(function (c) {
        return '<li class="row' + (k.has(c.id) ? ' known' : '') + '"><div class="rq">' + cardImg(c, 'row-img') + rich(c, c.q) + '</div><div class="ra">' + rich(c, c.a) + '</div><div class="acts"></div></li>';
      }).join('') + '</ol>';
    } else h += '<p class="empty">No cards in this deck yet.</p>';
    return h + '</section>';
  }

  function render() {
    var body;
    if (view === 'study') { var d = deckId && deck(); if (deckId && !d) deckId = null; body = d ? deckView(d) : gridView(); }
    else body = aboutView();
    app.innerHTML = header() + '<main>' + body + '</main><footer class="wrap">© ' + new Date().getFullYear() + ' HaiStrawberry<span class="egg"> I Love Ocavil</span></footer>';
  }

  window.addEventListener('hashchange', function () {
    var v = location.hash === '#study' ? 'study' : 'about';
    if (v !== view) { view = v; deckId = null; window.scrollTo(0, 0); render(); }
  });

  app.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act],[data-open],[data-pick]'); if (!t) return;
    if (t.dataset.pick !== undefined) { pick(+t.dataset.pick); return; }
    if (t.dataset.open) { deckId = t.dataset.open; idx = 0; flipped = false; order = []; mode = 'flip'; quiz = null; render(); window.scrollTo(0, 0); return; }
    var d = deck(), n = d ? d.cards.length : 0, k;
    switch (t.dataset.act) {
      case 'back': deckId = null; mode = 'flip'; quiz = null; render(); break;
      case 'mode-flip': mode = 'flip'; quiz = null; render(); break;
      case 'mode-quiz': if (n > 1) { mode = 'quiz'; startQuiz(d); render(); } break;
      case 'quiz-next': quizNext(); break;
      case 'quiz-restart': startQuiz(d); render(); break;
      case 'flip': flipped = !flipped; var fc = app.querySelector('.fc'); if (fc) fc.classList.toggle('is-flipped', flipped); break;
      case 'next': if (n) { idx = (idx + 1) % n; flipped = false; render(); } break;
      case 'prev': if (n) { idx = (idx - 1 + n) % n; flipped = false; render(); } break;
      case 'got': case 'again':
        k = getKnown(d.id); var cid = d.cards[order[idx]].id;
        if (t.dataset.act === 'got') k.add(cid); else k.delete(cid);
        setKnown(d.id, k); idx = (idx + 1) % n; flipped = false; render(); break;
      case 'shuffle':
        for (var i = order.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = order[i]; order[i] = order[j]; order[j] = x; }
        idx = 0; flipped = false; render(); toast('Shuffled'); break;
    }
  });

  function pick(i) {
    var d = deck(); if (!quiz || quiz.done || quiz.picked !== null || i >= quiz.choices.length) return;
    var c = d.cards[quiz.order[quiz.i]];
    quiz.picked = i;
    var k = getKnown(d.id);
    if (quiz.choices[i] === c.a) { quiz.score++; k.add(c.id); } else { quiz.missed.push(c); k.delete(c.id); }
    setKnown(d.id, k); render();
    var nx = app.querySelector('[data-act="quiz-next"]'); if (nx) nx.focus({ preventScroll: true });
  }
  function quizNext() {
    var d = deck(); if (!quiz || quiz.picked === null) return;
    quiz.i++; quiz.picked = null;
    if (quiz.i >= d.cards.length) quiz.done = true; else quiz.choices = choicesFor(d, d.cards[quiz.order[quiz.i]]);
    render();
  }

  document.addEventListener('keydown', function (e) {
    if (view !== 'study' || !deckId) return;
    var d = deck(); if (!d || !d.cards.length) return;
    if (mode === 'quiz' && quiz) {
      var m = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, b: 1, c: 2, d: 3 }[e.key.toLowerCase()];
      if (m !== undefined && quiz.picked === null) { e.preventDefault(); pick(m); }
      else if (e.key === 'Enter' && quiz.picked !== null && !quiz.done && document.activeElement && !document.activeElement.dataset.act) { e.preventDefault(); quizNext(); }
      return;
    }
    if (e.key === ' ') { e.preventDefault(); flipped = !flipped; var fc = app.querySelector('.fc'); if (fc) fc.classList.toggle('is-flipped', flipped); }
    else if (e.key === 'ArrowRight') { idx = (idx + 1) % d.cards.length; flipped = false; render(); }
    else if (e.key === 'ArrowLeft') { idx = (idx - 1 + d.cards.length) % d.cards.length; flipped = false; render(); }
  });

  render();
})();
