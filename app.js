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
      code: d.code || '', title: d.title || 'Untitled deck', cap: d.cap || 'lavender', group: d.group || '', date: d.date || '', html: !!d.html,
      cards: (d.cards || []).filter(function (c) { return c && c.q && c.a; })
        .map(function (c) { return { id: hash(c.q), q: c.q, a: c.a, wrong: Array.isArray(c.wrong) ? c.wrong.filter(Boolean) : [], why: c.why || '', img: c.img || '', aimg: c.aimg || '', html: !!(c.html || d.html) }; })
    };
  });

  var CAPS = { lavender: ['Lavender · EDTA', '#8E7CC3'], pink: ['Pink · EDTA (blood bank)', '#E48DB0'], gold: ['Gold · SST', '#D6A21E'], lightblue: ['Light blue · citrate', '#7EB8DA'], green: ['Green · heparin', '#4C9A6A'], gray: ['Gray · fluoride', '#8C939C'], red: ['Red · clot', '#C8412F'] };
  var view = location.hash === '#study' ? 'study' : location.hash === '#tests' ? 'tests' : 'about';
  var deckId = null, idx = 0, flipped = false, order = [];
  var mode = 'choose', quiz = null, flipDone = false;
  var app = document.getElementById('app');

  // Brain breaks: let brain-break.js know when a deck has been finished.
  // In flip mode that means stepping forward through as many cards as the deck holds;
  // in multiple choice it means reaching the results screen.
  var lap = 0;
  function deckDone(d) { lap = 0; if (d && window.BrainBreak && window.BrainBreak.deckDone) { try { window.BrainBreak.deckDone({ title: d.title }); } catch (e) {} } }
  function stepped(d) { lap++; if (d && lap >= d.cards.length) deckDone(d); }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function cap(k) { return (CAPS[k] || CAPS.lavender)[1]; }
  var OKTAG = /&lt;(\/?)(i|b|em|strong|sub|sup|u|br)\s*\/?&gt;/g;
  function rich(c, str) { var t = esc(str); return c && c.html ? t.replace(OKTAG, '<$1$2>') : t; }
  // a path with a slash (e.g. cards/p1/x.jpg) is a real image file next to the site
  function imgSrc(v) { if (!v) return ''; if (/^data:|^https?:|\//.test(v)) return v; var m = window.CARD_IMAGES || {}; return m[v] || ''; }
  function cardImg(c, cls) { var src = imgSrc(c.img); return src ? '<img class="' + cls + '" src="' + esc(src) + '" alt="Study image" loading="lazy">' : ''; }
  // a picture that belongs to the answer side (a chart or table), shown only once the answer is revealed
  function ansImg(c, cls) { var src = imgSrc(c.aimg); return src ? '<img class="' + cls + '" src="' + esc(src) + '" alt="Answer image" loading="lazy">' : ''; }
  // a fixed-size frame for a card picture: the space is held even before the photo arrives
  function picBox(v) { var src = imgSrc(v); return src ? '<div class="ci-box"><img class="card-img" src="' + esc(src) + '" alt="Study image" decoding="async"></div>' : ''; }
  // load the next couple of pictures ahead of time
  function preloadCards(cards) { cards.forEach(function (c) { [c && c.img, c && c.aimg].forEach(function (v) { var s = imgSrc(v); if (s) { var im = new Image(); im.src = s; } }); }); }
  function capName(k) { return (CAPS[k] || CAPS.lavender)[0]; }
  function isSpotify(u) { return /^https:\/\/open\.spotify\.com\//.test(String(u || '').trim()); }
  function getKnown(id) { try { return new Set(JSON.parse(localStorage.getItem('known:' + id) || '[]')); } catch (e) { return new Set(); } }
  function setKnown(id, set) { try { localStorage.setItem('known:' + id, JSON.stringify(Array.from(set))); } catch (e) {} }
  DECKS.forEach(function (d) { d.cards.forEach(function (c) { c.did = d.id; }); });
  function isKnown(c) { return getKnown(c.did).has(c.id); }
  function markKnown(c, on) { var k = getKnown(c.did); if (on) k.add(c.id); else k.delete(c.id); setKnown(c.did, k); }
  var mixDeck = null;   // "Study several decks": a session built from the decks she picked
  function deck() { if (deckId === 'mix') return mixDeck; for (var i = 0; i < DECKS.length; i++) if (DECKS[i].id === deckId) return DECKS[i]; return null; }
  var chooser = null, selecting = false, selected = [], selMode = null, selCue = false;
  var toastT;
  function toast(msg) { var t = document.getElementById('toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(function () { t.hidden = true; }, 2500); }

  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  // the first line of an answer, without formatting: "Loa loa<br>Sheathed…" -> "loa loa"
  function answerKey(a) { return String(a).split(/<br\s*\/?>/i)[0].replace(/<[^>]*>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }
  function choicesFor(d, c) {
    var seen = {}, keys = {}; seen[c.a] = 1; keys[answerKey(c.a)] = 1;
    var pool = c.wrong.slice();
    shuffle(d.cards).forEach(function (o) { if (o.id !== c.id) pool.push(o.a); });
    DECKS.forEach(function (dd) { if (dd.id !== d.id) shuffle(dd.cards).forEach(function (o) { pool.push(o.a); }); });
    var wrong = [];
    // skip decoys that are really the same answer worded differently (two "Loa loa" cards, say)
    pool.forEach(function (a) { var k = answerKey(a); if (wrong.length < 3 && !seen[a] && !keys[k]) { seen[a] = 1; keys[k] = 1; wrong.push(a); } });
    return shuffle([c.a].concat(wrong));
  }
  function header() {
    return '<header class="top"><div class="wrap top-in"><a class="brand" href="#about">Hai<i>Strawberry</i></a>' +
      '<nav aria-label="Pages"><a class="navlink" href="#about"' + (view === 'about' ? ' aria-current="page"' : '') + '>About</a>' +
      '<a class="navlink" href="#study"' + (view === 'study' ? ' aria-current="page"' : '') + '>Study Lab</a>' +
      '<a class="navlink" href="#tests"' + (view === 'tests' ? ' aria-current="page"' : '') + '>Test Lab</a></nav></div></header>';
  }

  var BALLOON = '<svg class="balloon" viewBox="0 0 24 28" aria-hidden="true"><path d="M12 2C6.8 2 4 6.2 4 11.2c0 3.8 2.4 7 5 9.3h6c2.6-2.3 5-5.5 5-9.3C20 6.2 17.2 2 12 2Z" fill="var(--accent)"/><path d="M12 2c-2.4 0-4.3 1.6-5.5 4.2-1 4 .1 8.6 2.7 14.3h5.6c2.6-5.7 3.7-10.3 2.7-14.3C16.3 3.6 14.4 2 12 2Z" fill="var(--violet)" opacity=".55"/><path d="M12 2c-1.1 0-2 .6-2.7 1.7C7.9 6.7 8.4 12 10 20.5h4C15.6 12 16.1 6.7 14.7 3.7 14 2.6 13.1 2 12 2Z" fill="var(--teal)"/><path d="M10 20.4l1 3.2h2l1-3.2z" fill="none" stroke="var(--muted)" stroke-width=".5"/><rect x="10.4" y="23.2" width="3.2" height="2.4" rx=".5" fill="#9a6b45"/></svg>';
  var LEAVES = '<svg class="leaves" viewBox="0 0 400 400" fill="none"><g stroke="var(--teal)" stroke-width="3" stroke-linecap="round"><path d="M40 360C110 300 150 250 170 170"/><path d="M360 60C310 90 270 130 250 200"/></g><g fill="var(--teal)" opacity=".8"><ellipse cx="70" cy="320" rx="26" ry="11" transform="rotate(-40 70 320)"/><ellipse cx="118" cy="286" rx="26" ry="11" transform="rotate(-70 118 286)"/><ellipse cx="96" cy="262" rx="22" ry="9" transform="rotate(-10 96 262)"/><ellipse cx="150" cy="220" rx="24" ry="10" transform="rotate(-60 150 220)"/></g><g fill="var(--violet)" opacity=".75"><ellipse cx="330" cy="86" rx="24" ry="10" transform="rotate(-30 330 86)"/><ellipse cx="290" cy="120" rx="24" ry="10" transform="rotate(-80 290 120)"/><ellipse cx="300" cy="150" rx="20" ry="8" transform="rotate(10 300 150)"/></g><g fill="var(--accent)"><circle cx="176" cy="160" r="9"/><circle cx="244" cy="206" r="8"/><circle cx="58" cy="350" r="6"/></g><path d="M300 330c10-14 30-14 40 0-10 6-30 6-40 0Zm20-6l6-8m-6 8l-6-8" stroke="var(--violet)" stroke-width="2" fill="var(--violet-soft)"/></svg>';

  /* ---------- front page: a rotating poem / funny line / picture (data.js "frontPage") ---------- */
  var FRONT = (DATA.frontPage || []).filter(function (x) { return x && (x.poem || x.text || x.img); });
  if (!FRONT.length && P.about) FRONT = [{ poem: P.about }];
  // a fresh random pick on every visit or refresh (never the same one twice in a row); no button to cycle
  var frontIdx = (function () {
    if (!FRONT.length) return -1;
    var last = -1; try { last = +localStorage.getItem('fpLast'); } catch (e) {}
    var i = Math.floor(Math.random() * FRONT.length); if (FRONT.length > 1 && i === last) i = (i + 1) % FRONT.length;
    try { localStorage.setItem('fpLast', i); } catch (e) {}
    return i;
  })();
  function frontPiece() {
    if (frontIdx < 0) return '';
    // poems and lines share one note card; a picture can have a line above it ({ text, img }) and a caption under it
    var f = FRONT[frontIdx], h = '';
    var kind = f.img ? 'pic' : f.poem ? 'poem' : 'line';
    var deco = f.emoji || (kind === 'poem' ? '🌻' : kind === 'pic' ? '📸' : '✨');
    if (f.poem) h += '<p class="about haiku">' + esc(f.poem).replace(/\n/g, '<br>') + '</p>';
    if (f.text) h += '<p class="about fp-text">' + esc(f.text).replace(/\n/g, '<br>') + '</p>';
    if (f.img) h += '<figure class="fp-img"><img src="' + esc(f.img) + '" alt="' + esc(f.alt || f.caption || f.text || '') + '">' + (f.caption ? '<figcaption>' + esc(f.caption) + '</figcaption>' : '') + '</figure>';
    return '<div class="fp fp-' + kind + '"><span class="fp-deco" aria-hidden="true">' + esc(deco) + '</span>' + h + '</div>';
  }
  function aboutView() {
    var initials = (P.name || '').trim().split(/\s+/).filter(Boolean).map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase() || 'CLS';
    var h = '<section class="hero wrap"><div class="hero-txt"><p class="eyebrow">🍓 welcome to my corner</p>' +
      '<h1>' + esc(P.name || 'Future lab scientist') + '</h1>' +
      (P.tagline ? '<p class="tag">' + esc(P.tagline) + BALLOON + '</p>' : '') +
      frontPiece() +
      (Array.isArray(P.links) && P.links.length ? '<div class="chips">' + P.links.map(function (l) { var ext = /^https?:/.test(l.href || ''); return '<a class="chip chip-link" href="' + esc(l.href || '#') + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + esc(l.label || '') + '</a>'; }).join('') + '</div>' : '') +
      '<a class="btn" href="#study">Open the Study Lab →</a></div>' +
      '<div class="record-wrap" aria-hidden="true">' + LEAVES + '<div class="record"><div class="label"><span class="label-top">SIDE A</span><b>🍓</b><svg class="label-curve" viewBox="0 0 100 100" aria-hidden="true"><defs><path id="labelArc" d="M 10 50 A 40 40 0 0 1 90 50" fill="none"/></defs><text><textPath href="#labelArc" startOffset="50%" text-anchor="middle">haistrawberry</textPath></text></svg></div></div></div></section>';

    if (TRACKS.length) {
      h += '<section class="wrap section"><h2>On repeat</h2><ol class="tracks">' + TRACKS.map(function (t, i) {
        return '<li><span class="n">' + String(i + 1).padStart(2, '0') + '</span><span><span class="t">' + esc(t.title || 'Untitled') + '</span>' + (t.artist ? ' <span class="a">· ' + esc(t.artist) + '</span>' : '') + '</span></li>';
      }).join('') + '</ol></section>';
    }

    /* ===== BACKUP — previous "My playlists" section (simple Spotify profile card).
       This is what the live site used before the cover-tile grid. If the tile
       grid ever misbehaves, delete the tile block below (from `var spOk` down to
       the end of the `if (tiles.length || spOk)` block) and paste this back in:

    var spOk = isSpotify(P.spotify), handle = (String(P.spotify || '').match(/\/user\/([^\/?#]+)/) || [])[1] || '';
    var embeds = PLAYLISTS.map(function (u) {
      var url = u && u.url ? u.url : u;
      var m = String(url || '').match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?(playlist|album)\/([A-Za-z0-9]+)/);
      return m ? '<iframe src="https://open.spotify.com/embed/' + m[1] + '/' + m[2] + '?utm_source=generator" loading="lazy" title="Spotify ' + m[1] + '" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>' : '';
    }).filter(Boolean);
    if (spOk || embeds.length) {
      h += '<section class="wrap section"><h2>My playlists</h2>' +
        (spOk ? '<a class="sp-profile" href="' + esc(P.spotify) + '" target="_blank" rel="noopener noreferrer"><span class="sp-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M5 9.5c4.5-1.6 9.5-1.2 14 1.2"/><path d="M6 13c3.8-1.2 7.8-.9 11.4 1"/><path d="M7 16.4c3-.9 6-.7 8.8.8"/></svg></span><span class="sp-text"><span class="eyebrow">On Spotify</span><b>' + esc(handle ? '@' + decodeURIComponent(handle) : 'My Spotify') + '</b><span>All my public playlists, always up to date</span></span><span class="sp-go">See playlists ↗</span></a>' : '') +
        (embeds.length ? '<div class="embeds">' + embeds.join('') + '</div>' : '') + '</section>';
    }
    ===== end backup ===== */

    var spOk = isSpotify(P.spotify), handle = (String(P.spotify || '').match(/\/user\/([^\/?#]+)/) || [])[1] || '';
    var glyph = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M5 9.5c4.5-1.6 9.5-1.2 14 1.2"/><path d="M6 13c3.8-1.2 7.8-.9 11.4 1"/><path d="M7 16.4c3-.9 6-.7 8.8.8"/></svg>';
    var tiles = PLAYLISTS.map(function (pl) {
      var url = pl && pl.url, m = String(url || '').match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(playlist|album)\/([A-Za-z0-9]+)/);
      if (!m) return '';
      return '<a class="pl-tile" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer" data-embed="' + esc(url) + '">' +
        '<span class="pl-art"><img class="pl-img" alt="" loading="lazy"' + (pl.cover ? ' src="' + esc(pl.cover) + '"' : '') + '>' +
        '<span class="pl-play" aria-hidden="true">' + glyph + '</span></span>' +
        '<span class="pl-name">' + esc(pl.name || 'Playlist') + '</span></a>';
    }).filter(Boolean);
    if (tiles.length || spOk) {
      h += '<section class="wrap section"><div class="pl-head"><h2>My playlists</h2>' +
        (handle ? '<span class="pl-handle">@' + esc(decodeURIComponent(handle)) + ' on Spotify</span>' : '') + '</div>' +
        '<div class="pl-grid">' + tiles.join('') +
        (spOk ? '<a class="pl-tile pl-all" href="' + esc(P.spotify) + '" target="_blank" rel="noopener noreferrer"><span class="pl-art pl-all-art">' + glyph + '</span><span class="pl-name">All playlists ↗</span></a>' : '') +
        '</div></section>';
    }
    return h;
  }

  var coverCache = {}, coverBusy = {};
  function refreshCovers() {
    if (view !== 'about' || !window.fetch) return;
    var nodes = app.querySelectorAll('.pl-tile[data-embed]');
    Array.prototype.forEach.call(nodes, function (a) {
      var url = a.getAttribute('data-embed'); if (!url) return;
      var img = a.querySelector('.pl-img');
      if (coverCache[url]) { if (img && coverCache[url]) img.src = coverCache[url]; return; }
      if (coverBusy[url]) return; coverBusy[url] = 1;
      fetch('https://open.spotify.com/oembed?url=' + encodeURIComponent(url))
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) {
          coverBusy[url] = 0;
          if (!d || !d.thumbnail_url) return;
          coverCache[url] = d.thumbnail_url;
          var live = app.querySelector('.pl-tile[data-embed="' + url + '"] .pl-img');
          if (live) live.src = d.thumbnail_url;
        })
        .catch(function () { coverBusy[url] = 0; });
    });
  }

  function gridView() {
    return '<section class="wrap study-head"><p class="eyebrow">Study Lab</p><h1>Flashcards for CLS</h1>' +
      '<p>' + (selecting ? 'Tap the decks you want to mix together, then pick how to study them.' : 'Tap a deck to start. Your progress is saved on your own device only. Ready to check yourself? Head to the <a href="#tests">Test Lab</a>.') + '</p>' +
      (selecting ? '' : '<button class="sel-toggle sel-start" data-act="sel-toggle">📚 Study several decks</button>') + '</section>' +
      (selecting ? selBar() : '') + groupedDecks();
  }
  function selBar() {
    var n = selected.reduce(function (t, id) { var d = DECKS.filter(function (x) { return x.id === id; })[0]; return t + (d ? d.cards.length : 0); }, 0);
    return '<div class="sel-bar"><div class="sel-bar-in">' +
      '<div class="sel-left"><button class="sel-cancel" data-act="sel-cancel">Cancel</button><span class="sel-count">' + (selected.length ? '<b>' + selected.length + '</b> deck' + (selected.length === 1 ? '' : 's') + ' · ' + n + ' cards' : 'Tap decks to add them') + '</span></div>' +
      '<div class="sel-right"><div class="sel-modes' + (selCue ? ' cue' : '') + '" role="radiogroup" aria-label="How to study">' +
        '<button role="radio" data-act="sel-mode" data-m="flip" aria-checked="' + (selMode === 'flip') + '"><span class="em" aria-hidden="true">🃏 </span>Flip</button>' +
        '<button role="radio" data-act="sel-mode" data-m="quiz" aria-checked="' + (selMode === 'quiz') + '"><span class="em" aria-hidden="true">✅ </span>Multiple choice</button></div>' +
      '<button class="sel-toggle on" data-act="sel-done">Done<span class="sel-long"> selecting</span></button></div></div>' +
      (selCue ? '<p class="sel-cue-msg" role="alert">' + (selCue === 'quiz2' ? 'Multiple choice needs at least 2 cards. Add a deck or pick Flip.' : 'Pick <b>Flip</b> or <b>Multiple choice</b> first') + '</p>' : '') + '</div>';
  }
  function deckCard(d) {
    var k = getKnown(d.id), n = d.cards.filter(function (c) { return k.has(c.id); }).length;
    var on = selecting && selected.indexOf(d.id) > -1, open = !selecting && chooser === d.id;
    var tile = '<button class="deck' + (on ? ' picked' : '') + (open ? ' open' : '') + '" data-tile="' + esc(d.id) + '" aria-' + (selecting ? 'pressed="' + on + '"' : 'expanded="' + open + '"') + '>' +
      (selecting ? '<span class="pick-dot" aria-hidden="true">' + (on ? '✓' : '') + '</span>' : '') +
      '<span class="tube" style="--cap:' + cap(d.cap) + '"></span><span class="code">' + esc(d.code) + '</span><span class="dt">' + esc(d.title) + '</span><span class="meta">' + d.cards.length + ' cards · ' + n + ' known</span></button>';
    if (!open) return '<div class="deck-wrap">' + tile + '</div>';
    return '<div class="deck-wrap is-open">' + tile + '<div class="deck-choose">' +
      '<button class="dc-btn" data-act="go-flip" data-id="' + esc(d.id) + '"><span aria-hidden="true">🃏</span> Flip cards</button>' +
      '<button class="dc-btn" data-act="go-quiz" data-id="' + esc(d.id) + '"' + (d.cards.length < 2 ? ' disabled' : '') + '><span aria-hidden="true">✅</span> Multiple choice</button>' +
      '<button class="dc-link" data-act="go-cards" data-id="' + esc(d.id) + '">See all cards</button></div></div>';
  }
  function groupedDecks() {
    if (!DECKS.length) return '<section class="wrap"><p class="empty">No decks yet.</p></section>';
    var groups = [], byName = {};
    DECKS.forEach(function (d) {
      var g = d.group || '';
      if (!byName[g]) { byName[g] = { name: g, decks: [] }; groups.push(byName[g]); }
      byName[g].decks.push(d);
    });
    // newest study material first: groups sort by their newest deck `date` (YYYY-MM-DD in data.js);
    // groups without a date fall back to "added last shows first"; ungrouped decks go to the bottom
    var named = groups.filter(function (g) { return g.name; });
    named.forEach(function (g, i) { g.pos = i; g.date = g.decks.reduce(function (m, d) { return d.date > m ? d.date : m; }, ''); });
    named.sort(function (a, b) { return a.date !== b.date ? (a.date < b.date ? 1 : -1) : b.pos - a.pos; });
    groups = named.concat(groups.filter(function (g) { return !g.name; }));
    return groups.map(function (g) {
      var cards = g.decks.reduce(function (t, d) { return t + d.cards.length; }, 0);
      return '<section class="wrap deck-group">' +
        (g.name || selecting ? '<div class="group-head"><h2>' + esc(g.name || 'Other decks') + '</h2><span class="group-meta">' + g.decks.length + ' decks · ' + cards + ' cards</span>' +
          (selecting ? (function () { var all = g.decks.every(function (d) { return selected.indexOf(d.id) > -1; });
            return '<button class="sel-group" data-act="sel-group" data-ids="' + esc(g.decks.map(function (d) { return d.id; }).join(',')) + '" data-all="' + all + '">' + (all ? 'Clear group' : 'Select group') + '</button>'; })() : '') + '</div>' : '') +
        '<div class="decks">' + g.decks.map(deckCard).join('') + '</div></section>';
    }).join('');
  }

  function startQuiz(d, onlyIdx) {
    var ord = shuffle(onlyIdx || d.cards.map(function (_, i) { return i; }));
    quiz = { order: ord, i: 0, picked: null, score: 0, done: false, missed: [] };
    quiz.choices = choicesFor(d, d.cards[ord[0]]);
  }
  /* ---------- a deck: start screen (pick a mode), then a focused session ---------- */
  // slim bar shown during a session instead of the site header and deck title
  function deckBar(d, label, count, extra) {
    return '<div class="dk-bar"><button class="dk-back" data-act="back" aria-label="Back to all decks">←</button>' +
      '<span class="dk-mid"><span class="dk-code">' + esc(d.id === 'mix' ? d.title : d.code) + '</span> · ' + label + '</span>' +
      '<span class="dk-count">' + count + '</span>' + (extra || '') + '</div>';
  }
  function startView(d) {
    var k = getKnown(d.id), n = d.cards.length, known = d.cards.filter(function (c) { return k.has(c.id); }).length;
    var h = '<section class="wrap deck-start"><button class="back" data-act="back">← All decks</button>' +
      '<div class="dv-head"><span class="tube" style="--cap:' + cap(d.cap) + '"></span><div class="grow">' + (d.group ? '<p class="group-line">' + esc(d.group) + '</p>' : '') +
      '<p class="code">' + esc(d.code) + ' · ' + n + ' cards · ' + known + ' known</p><h1>' + esc(d.title) + '</h1></div></div>';
    if (!n) return h + '<p class="empty">No cards in this deck yet.</p></section>';
    h += '<p class="eyebrow">How do you want to study?</p><div class="mode-pick">' +
      '<button class="mode-card" data-act="mode-flip"><span class="mc-ico" aria-hidden="true">🃏</span><b>Flip cards</b><span>Tap to reveal the answer, mark what you know.</span></button>' +
      '<button class="mode-card" data-act="mode-quiz"' + (n < 2 ? ' disabled' : '') + '><span class="mc-ico" aria-hidden="true">✅</span><b>Multiple choice</b><span>Pick from four answers, score at the end.</span></button></div>' +
      '<details class="all-cards"><summary>See all ' + n + ' cards</summary><ol class="list">' + d.cards.map(function (c) {
        return '<li class="row' + (k.has(c.id) ? ' known' : '') + '"><div class="rq">' + cardImg(c, 'row-img') + rich(c, c.q) + '</div><div class="ra">' + rich(c, c.a) + ansImg(c, 'row-img') + '</div><div class="acts"></div></li>';
      }).join('') + '</ol></details>';
    return h + '</section>';
  }
  function flipView(d) {
    var n = order.length;
    if (flipDone) {
      var known = d.cards.filter(isKnown).length, left = n ? d.cards.length - known : 0;
      return deckBar(d, 'Flip cards', 'Done') + '<section class="wrap dk-session"><div class="dk-done"><p class="eyebrow">Deck complete</p><h2>🎉 Nice work!</h2>' +
        '<p>You know <b>' + known + '</b> of ' + d.cards.length + ' cards.</p><div class="dk-done-acts">' +
        (left ? '<button class="btn" data-act="flip-unknown">Study the ' + left + ' I don’t know yet</button>' : '') +
        '<button class="btn ' + (left ? 'alt' : '') + '" data-act="flip-again">Go through all again</button>' +
        (d.cards.length > 1 ? '<button class="btn alt" data-act="mode-quiz">Try multiple choice</button>' : '') +
        '<button class="t-plain" data-act="back">Back to all decks</button></div></div></section>';
    }
    var c = d.cards[order[idx]];
    return deckBar(d, 'Flip cards', (idx + 1) + ' / ' + n, '<button class="dk-icon" data-act="shuffle" aria-label="Shuffle">⤮</button>') +
      '<section class="wrap dk-session"><div class="viewer"><button class="fc' + (flipped ? ' is-flipped' : '') + '" data-act="flip" aria-label="Flip card"><div class="fc-in">' +
      '<div class="face front"><span class="side">Question</span>' + picBox(c.img) + '<p>' + rich(c, c.q) + '</p><div class="foot">' + (isKnown(c) ? '<span class="known-tag">Known</span>' : '<span></span>') + '<span class="count">Tap to flip</span></div></div>' +
      '<div class="face back"><span class="side">Answer</span><p>' + rich(c, c.a) + '</p>' + picBox(c.aimg) + '<div class="foot"><span></span><span class="count">' + (idx + 1) + ' / ' + n + '</span></div></div>' +
      '</div></button>' +
      '<p class="hint">Space flips · arrow keys move</p></div></section>' +
      '<div class="dk-ctrlbar"><div class="dk-ctrl"><button class="dk-arrow" data-act="prev" aria-label="Previous card"' + (idx === 0 ? ' disabled' : '') + '>←</button>' +
      '<button class="ghost" data-act="again">Not yet</button><button class="got" data-act="got">Got it ✓</button>' +
      '<button class="dk-arrow" data-act="next" aria-label="Next card">→</button></div></div>';
  }
  function quizView(d) {
    var n = quiz.order.length;
    if (quiz.done) {
      var pct = Math.round(quiz.score / n * 100);
      return deckBar(d, 'Multiple choice', 'Done') + '<section class="wrap dk-session"><div class="dk-done"><p class="eyebrow">Results</p><h2>' + quiz.score + ' <small>of</small> ' + n + '</h2>' +
        '<p>' + (pct === 100 ? 'Perfect run. Every answer right.' : pct >= 80 ? 'Strong work. Just a few to review.' : pct >= 50 ? 'Getting there. Review the ones below and go again.' : 'Good practice. Review below, then try again.') + '</p>' +
        '<div class="dk-done-acts">' + (quiz.missed.length ? '<button class="btn" data-act="quiz-missed">Retry the ' + quiz.missed.length + ' I missed</button>' : '') +
        '<button class="btn ' + (quiz.missed.length ? 'alt' : '') + '" data-act="quiz-restart">Try the whole deck again</button>' +
        '<button class="btn alt" data-act="mode-flip">Switch to flip cards</button><button class="t-plain" data-act="back">Back to all decks</button></div></div>' +
        (quiz.missed.length ? '<h2 class="dk-h2">Review these</h2><ol class="list">' + quiz.missed.map(function (c) { return '<li class="row"><div class="rq">' + cardImg(c, 'row-img') + rich(c, c.q) + '</div><div class="ra">' + rich(c, c.a) + ansImg(c, 'row-img') + '</div><div class="acts"></div></li>'; }).join('') + '</ol>' : '') +
        '</section>';
    }
    var c = d.cards[quiz.order[quiz.i]], answered = quiz.picked !== null, ok = answered && quiz.choices[quiz.picked] === c.a;
    var h = deckBar(d, 'Multiple choice', (quiz.i + 1) + ' / ' + n, '<span class="dk-score">✓ ' + quiz.score + '</span>') +
      '<section class="wrap dk-session"><div class="viewer"><div class="face qcard"><div class="qbar"><span style="width:' + Math.round(quiz.i / n * 100) + '%"></span></div>' + picBox(c.img) + '<p>' + rich(c, c.q) + '</p></div>' +
      '<div class="choices" role="group" aria-label="Answer choices">' + quiz.choices.map(function (a, i) {
        var cls = 'choice';
        if (answered) { if (a === c.a) cls += ' right'; else if (i === quiz.picked) cls += ' wrong'; else cls += ' dim'; }
        return '<button class="' + cls + '" data-pick="' + i + '"' + (answered ? ' disabled' : '') + '><span class="key">' + 'ABCD'[i] + '</span><span>' + rich(c, a) + '</span></button>';
      }).join('') + '</div><p class="hint">1–4 or A–D to answer · Enter for next</p></div></section>';
    if (answered) {
      // the feedback pops up over the page; Next lives inside it
      h += '<div class="mc-pop-veil"></div><div class="mc-pop ' + (ok ? 'ok' : 'no') + '" role="dialog" aria-modal="false" aria-labelledby="mc-pop-h">' +
        '<p class="mc-pop-h" id="mc-pop-h">' + (ok ? '✓ Correct!' : '✗ Not quite') + '</p>' +
        (ok ? '' : '<p class="mc-pop-lbl">The answer</p><div class="mc-pop-ans">' + rich(c, c.a) + '</div>') +
        (c.why ? '<p class="mc-pop-why">' + rich(c, c.why) + '</p>' : '') + ansImg(c, 'mc-pop-img') +
        '<button class="btn mc-next" data-act="quiz-next">' + (quiz.i + 1 < n ? 'Next question →' : 'See results') + '</button></div>';
    }
    return h;
  }
  function deckView(d) {
    if (mode === 'flip') return flipView(d);
    if (mode === 'quiz' && quiz) return quizView(d);
    return startView(d);
  }

  function render() {
    var body;
    if (view === 'study') { var d = deckId && deck(); if (deckId && !d) deckId = null; body = d ? deckView(d) : gridView(); }
    else if (view === 'tests') body = testsView();
    else body = aboutView();
    var inSession = view === 'study' && !!deckId && mode !== 'choose';
    document.body.classList.toggle('in-deck', inSession);
    app.innerHTML = header() + '<main>' + body + '</main><footer class="wrap">© ' + new Date().getFullYear() + ' HaiStrawberry<span class="egg"> I Love Ocavil</span></footer>';
    if (view === 'about') refreshCovers();
  }

  window.addEventListener('hashchange', function () {
    var v = hashView();
    if (v !== view) { view = v; deckId = null; removing = null; editingNote = null; chooser = null; selecting = false; selected = []; selMode = null; selCue = false; window.scrollTo(0, 0); render(); }
  });

  /* ---------- Test Lab: create a test, recent tests, notes ----------
     Test history is written by test.js to this device's storage ("testHistory"). */
  function hashView() { return location.hash === '#study' ? 'study' : location.hash === '#tests' ? 'tests' : 'about'; }
  function getHistory() { try { var h = JSON.parse(localStorage.getItem('testHistory') || '[]'); return Array.isArray(h) ? h : []; } catch (e) { return []; } }
  function setHistory(h) { try { localStorage.setItem('testHistory', JSON.stringify(h)); return true; } catch (e) { return false; } }
  function runInProgress() { try { var t = JSON.parse(sessionStorage.getItem('testRun')); return t && !t.done && t.qs && t.qs.length ? t : null; } catch (e) { return null; } }
  var deckById = {}; DECKS.forEach(function (d) { deckById[d.id] = d; });
  var showAllTests = false, removing = null, editingNote = null;
  function when(ms) {
    var d = new Date(ms), now = new Date(), y = new Date(now); y.setDate(now.getDate() - 1);
    var t = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    if (d.toDateString() === now.toDateString()) return 'Today · ' + t;
    if (d.toDateString() === y.toDateString()) return 'Yesterday · ' + t;
    return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }) + ' · ' + t;
  }
  function deckList(ids) {
    var names = ids.map(function (id) { var d = deckById[id]; return d ? d.title : null; }).filter(Boolean);
    if (!names.length) return 'Decks that have since changed';
    return names.slice(0, 2).join(' · ') + (names.length > 2 ? ' · +' + (names.length - 2) + ' more' : '');
  }
  function testsView() {
    var hist = getHistory().slice().sort(function (a, b) { return b.at - a.at; }), run = runInProgress();
    var shown = showAllTests ? hist : hist.slice(0, 8);
    var h = '<section class="wrap study-head"><p class="eyebrow">Test Lab</p><h1>Test yourself</h1>' +
      '<p>Build a practice test from any decks, then come back here to see how you did and jot down what to remember. Your tests and notes stay on this device only.</p></section>' +
      '<section class="wrap tl-actions">' +
      '<a class="tl-card tl-create" href="test.html"><span class="tl-ico" aria-hidden="true">📝</span><span><b>Create a Test</b><span>Pick decks and a length. Score and review at the end.</span></span><span class="tl-go" aria-hidden="true">→</span></a>' +
      (run ? '<a class="tl-card" href="test.html"><span class="tl-ico" aria-hidden="true">⏸️</span><span><b>Resume your test</b><span>' + run.qs.filter(function (q) { return q.pick !== null; }).length + ' of ' + run.qs.length + ' answered</span></span><span class="tl-go" aria-hidden="true">→</span></a>' : '') +
      '</section><section class="wrap tl-recent"><div class="group-head"><h2>Recent tests</h2>' + (hist.length ? '<span class="group-meta">' + hist.length + ' saved</span>' : '') + '</div>';
    if (!hist.length) h += '<p class="tl-empty">No tests yet. When you finish one, it shows up here with your score, the ones you missed, and room for notes.</p>';
    h += shown.map(function (t) {
      var pct = Math.round(t.right / t.n * 100), miss = t.n - t.right;
      return '<article class="tl-test" data-id="' + esc(t.id) + '">' +
        '<div class="tl-row"><div class="tl-score' + (pct >= 80 ? ' good' : pct < 60 ? ' low' : '') + '"><b>' + pct + '%</b><span>' + t.right + ' / ' + t.n + '</span></div>' +
        '<div class="tl-meta"><span class="tl-when">' + esc(when(t.at)) + '</span><span class="tl-decks">' + esc(deckList(t.decks || [])) + '</span></div></div>' +
        '<div class="tl-btns"><a class="tl-btn" href="test.html#r=' + encodeURIComponent(t.id) + '">' + (miss ? 'Review ' + miss + ' missed' : 'See results') + '</a>' +
        (miss ? '<a class="tl-btn" href="test.html#retry=' + encodeURIComponent(t.id) + '">Retest missed</a>' : '') +
        (removing === t.id ? '<span class="tl-confirm">Remove this test? <button data-act="tl-rm-yes" data-id="' + esc(t.id) + '">Remove</button><button data-act="tl-rm-no">Cancel</button></span>'
          : '<button class="tl-btn tl-rm" data-act="tl-rm" data-id="' + esc(t.id) + '">Remove</button>') + '</div>' +
        (editingNote === t.id
          ? '<div class="tl-note"><span>Note</span><textarea rows="3" data-note="' + esc(t.id) + '" placeholder="What tripped you up? What to remember next time…">' + esc(t.note || '') + '</textarea><div class="tl-nrow"><em class="tl-saved" aria-live="polite"></em><button class="tl-done" data-act="tl-note-done">Done</button></div></div>'
          : t.note ? '<button class="tl-notecard" data-act="tl-note" data-id="' + esc(t.id) + '"><span class="tl-notetext">' + esc(t.note) + '</span><span class="tl-edit">Edit</span></button>'
          : '<button class="tl-addnote" data-act="tl-note" data-id="' + esc(t.id) + '">+ Add a note</button>') +
        '</article>';
    }).join('');
    if (hist.length > shown.length) h += '<button class="tl-more" data-act="tl-more">Show all ' + hist.length + ' tests</button>';
    return h + '</section>';
  }
  var noteTimer = {};
  app.addEventListener('input', function (e) {
    var id = e.target.dataset && e.target.dataset.note; if (!id) return;
    var ta = e.target, tag = ta.parentNode.querySelector('.tl-saved'); clearTimeout(noteTimer[id]);
    noteTimer[id] = setTimeout(function () {
      var h = getHistory(); for (var i = 0; i < h.length; i++) if (h[i].id === id) h[i].note = ta.value;
      if (tag) { tag.textContent = setHistory(h) ? 'Saved' : 'Couldn’t save on this device'; setTimeout(function () { tag.textContent = ''; }, 1500); }
    }, 400);
  });

  app.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act],[data-tile],[data-pick]'); if (!t) return;
    if (view === 'tests') {
      var a = t.dataset.act;
      if (a === 'tl-more') { showAllTests = true; render(); }
      else if (a === 'tl-note') { editingNote = t.dataset.id; render(); var ta = app.querySelector('[data-note]'); if (ta) { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); } }
      else if (a === 'tl-note-done') { editingNote = null; render(); }
      else if (a === 'tl-rm') { removing = t.dataset.id; render(); }
      else if (a === 'tl-rm-no') { removing = null; render(); }
      else if (a === 'tl-rm-yes') { setHistory(getHistory().filter(function (x) { return x.id !== t.dataset.id; })); removing = null; render(); }
      return;
    }
    if (t.dataset.pick !== undefined) { pick(+t.dataset.pick); return; }
    if (t.dataset.tile) {
      var tid = t.dataset.tile, y = window.scrollY;
      if (selecting) { var at = selected.indexOf(tid); if (at > -1) selected.splice(at, 1); else selected.push(tid); }
      else chooser = chooser === tid ? null : tid;
      render(); window.scrollTo(0, y); return;
    }
    if (t.dataset.act === 'go-flip' || t.dataset.act === 'go-quiz' || t.dataset.act === 'go-cards') {
      deckId = t.dataset.id; chooser = null; quiz = null; flipDone = false; mode = 'choose';
      if (t.dataset.act === 'go-cards') { render(); window.scrollTo(0, 0); return; }
      t = { dataset: { act: t.dataset.act === 'go-flip' ? 'mode-flip' : 'mode-quiz' } };
    }
    if (t.dataset.act === 'sel-toggle' || t.dataset.act === 'sel-cancel') { selecting = t.dataset.act === 'sel-toggle'; chooser = null; selected = []; selMode = null; selCue = false; var y2 = window.scrollY; render(); window.scrollTo(0, y2); return; }
    if (t.dataset.act === 'sel-mode') { selMode = t.dataset.m; selCue = false; var y4 = window.scrollY; render(); window.scrollTo(0, y4); return; }
    if (t.dataset.act === 'sel-done') {
      var cnt = DECKS.filter(function (x) { return selected.indexOf(x.id) > -1; }).reduce(function (a, x) { return a + x.cards.length; }, 0), y5 = window.scrollY;
      if (!selected.length) { selecting = false; selMode = null; selCue = false; render(); window.scrollTo(0, y5); return; }
      if (!selMode || (selMode === 'quiz' && cnt < 2)) { selCue = selMode ? 'quiz2' : true; render(); window.scrollTo(0, y5); return; }
      t = { dataset: { act: selMode === 'flip' ? 'sel-flip' : 'sel-quiz' } };
    }
    if (t.dataset.act === 'sel-group') {
      var ids = t.dataset.ids.split(','), y3 = window.scrollY;
      selected = selected.filter(function (x) { return ids.indexOf(x) < 0; }); if (t.dataset.all !== 'true') selected = selected.concat(ids);
      render(); window.scrollTo(0, y3); return;
    }
    if (t.dataset.act === 'sel-flip' || t.dataset.act === 'sel-quiz') {
      var ds = DECKS.filter(function (x) { return selected.indexOf(x.id) > -1; });
      mixDeck = { id: 'mix', code: 'MIX', title: ds.length + ' decks', cap: 'lavender', group: '', cards: [].concat.apply([], ds.map(function (x) { return x.cards; })) };
      deckId = 'mix'; selecting = false; selected = []; selMode = null; selCue = false; quiz = null; flipDone = false; mode = 'choose';
      t = { dataset: { act: t.dataset.act === 'sel-flip' ? 'mode-flip' : 'mode-quiz' } };
    }
    var d = deck(), n = d ? d.cards.length : 0, k;
    function startFlip(idxs) { mode = 'flip'; quiz = null; order = idxs || d.cards.map(function (_, i) { return i; }); if (d.id === 'mix') order = shuffle(order); idx = 0; flipped = false; flipDone = false; render(); window.scrollTo(0, 0); preloadCards(order.slice(1, 3).map(function (i) { return d.cards[i]; })); }
    switch (t.dataset.act) {
      case 'back': deckId = null; mixDeck = null; chooser = null; mode = 'choose'; quiz = null; flipDone = false; render(); window.scrollTo(0, 0); break;
      case 'mode-flip': startFlip(); break;
      case 'mode-quiz': if (n > 1) { mode = 'quiz'; flipDone = false; startQuiz(d); render(); window.scrollTo(0, 0); } break;
      case 'quiz-next': quizNext(); break;
      case 'quiz-restart': startQuiz(d); render(); window.scrollTo(0, 0); break;
      case 'quiz-missed': var miss = quiz.missed.map(function (c) { return d.cards.indexOf(c); }).filter(function (i) { return i > -1; });
        if (miss.length > 1) { startQuiz(d, miss); render(); window.scrollTo(0, 0); } else { startQuiz(d); render(); } break;
      case 'flip': flipped = !flipped; var fc = app.querySelector('.fc'); if (fc) fc.classList.toggle('is-flipped', flipped); break;
      case 'next': flipStep(d, 1); break;
      case 'prev': flipStep(d, -1); break;
      case 'got': case 'again':
        markKnown(d.cards[order[idx]], t.dataset.act === 'got'); flipStep(d, 1); break;
      case 'flip-again': startFlip(); break;
      case 'flip-unknown': startFlip(d.cards.map(function (c, i) { return isKnown(c) ? -1 : i; }).filter(function (i) { return i > -1; })); break;
      case 'shuffle': order = shuffle(order); idx = 0; flipped = false; render(); toast('Shuffled'); break;
    }
  });

  // move through a flip session; stepping past the last card finishes the deck
  function flipStep(d, delta) {
    if (flipDone) return;
    if (delta > 0 && idx + 1 >= order.length) { flipDone = true; flipped = false; render(); window.scrollTo(0, 0); deckDone(d); return; }
    idx = Math.max(0, idx + delta); flipped = false; render();
    preloadCards(order.slice(idx + 1, idx + 3).map(function (i) { return d.cards[i]; }));
  }
  function pick(i) {
    var d = deck(); if (!quiz || quiz.done || quiz.picked !== null || i >= quiz.choices.length) return;
    var c = d.cards[quiz.order[quiz.i]];
    quiz.picked = i;
    if (quiz.choices[i] === c.a) { quiz.score++; markKnown(c, true); } else { quiz.missed.push(c); markKnown(c, false); }
    render();
    var nx = app.querySelector('.mc-next'); if (nx) nx.focus({ preventScroll: true });
  }
  function quizNext() {
    var d = deck(); if (!quiz || quiz.picked === null) return;
    quiz.i++; quiz.picked = null;
    if (quiz.i >= quiz.order.length) { quiz.done = true; deckDone(d); } else quiz.choices = choicesFor(d, d.cards[quiz.order[quiz.i]]);
    render(); window.scrollTo(0, 0);
    if (quiz && !quiz.done) preloadCards(quiz.order.slice(quiz.i + 1, quiz.i + 3).map(function (i) { return d.cards[i]; }));
  }

  document.addEventListener('keydown', function (e) {
    if (view === 'study' && !deckId && chooser && e.key === 'Escape') { chooser = null; var yy = window.scrollY; render(); window.scrollTo(0, yy); return; }
    if (view !== 'study' || !deckId || e.metaKey || e.ctrlKey || e.altKey) return;
    var d = deck(); if (!d || !d.cards.length) return;
    if (mode === 'quiz' && quiz && !quiz.done) {
      var m = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, b: 1, c: 2, d: 3 }[e.key.toLowerCase()];
      if (m !== undefined && quiz.picked === null) { e.preventDefault(); pick(m); }
      else if (e.key === 'Enter' && quiz.picked !== null) { e.preventDefault(); quizNext(); }
      return;
    }
    if (mode !== 'flip' || flipDone) return;
    if (e.key === ' ') { e.preventDefault(); flipped = !flipped; var fc = app.querySelector('.fc'); if (fc) fc.classList.toggle('is-flipped', flipped); }
    else if (e.key === 'ArrowRight') flipStep(d, 1);
    else if (e.key === 'ArrowLeft') flipStep(d, -1);
  });

  // coming back from a test with the browser's Back button: show the newest history
  window.addEventListener('pageshow', function (e) { if (e.persisted && view === 'tests') render(); });

  render();
})();
