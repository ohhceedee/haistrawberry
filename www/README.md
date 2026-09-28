# HaiStrawberry website

A plain static site: no build step, no server code, no accounts. Upload the files and it works.

## Files

| File | What it is | Edit it? |
|---|---|---|
| `index.html` | The page shell | Rarely |
| `data.js` | **All the content**: about text, songs, playlists, flashcards | Yes, this is the one |
| `app.js` | How the site behaves (flip cards, navigation) | No |
| `styles.css` | Colors, fonts, layout | Only to restyle |
| `favicon.svg` | The strawberry browser-tab icon | Optional |
| `card-images.js` | Picture-card images (auto-generated) | No |

## Putting it online

Upload all six files together, in the same folder, to your host's site root (often called `public_html`, `www`, or just the site folder). Any static host works: Netlify, Cloudflare Pages, GitHub Pages, or the file manager that came with your domain. On Netlify or Cloudflare Pages you can drag the whole `haistrawberry` folder onto the upload box.

Then point `haistrawberry.com` at the host by following that host's "custom domain" steps.

## Changing content

Open `data.js` in any text editor (Notepad, TextEdit in plain-text mode, or VS Code), edit, save, and re-upload just that file.

**Add a flashcard** inside a deck's `cards: [ ... ]` list:

```js
{ q: "Your question?", a: "The answer." },
```

Every card ends with a comma except the last one in the list.

**Add a deck** by copying an existing `{ code: ..., title: ..., cap: ..., cards: [...] }` block. `cap` is the tube color: `lavender`, `pink`, `gold`, `lightblue`, `green`, `gray`, or `red`.

**Show a Spotify playlist** by pasting its link into `playlists: [ ]`:

```js
playlists: [
  "https://open.spotify.com/playlist/XXXXXXXXXXXX",
  "https://open.spotify.com/playlist/YYYYYYYYYYYY"
],
```

In Spotify: open the playlist, then Share, then Copy link. The playlist must be public.

**Add a song on repeat**: `{ title: "Song", artist: "Artist" },` inside `tracks: [ ]`.

## Good to know

- "Got it" progress on flashcards is saved in each visitor's own browser, not on the site.
- If the page goes blank after an edit, `data.js` usually has a missing comma or quote. Undo the last change and try again.

## Multiple choice & explanations

Each deck has a **Flip cards / Multiple choice** switch. In a card you can add:

```js
{ q: "Question?", a: "Answer.",
  why: "A sentence shown after answering in multiple choice.",
  wrong: ["decoy 1", "decoy 2", "decoy 3"] }
```

`why` and `wrong` are both optional. Without `wrong`, the quiz borrows wrong answers from the deck's other cards.

## Deck groups

Give decks a `group: "Group name"` and the Study Lab lists them under that heading. The Intestinal Protozoa decks use this. Cards in those decks allow simple formatting (`<i>`, `<b>`) and an `img:` image.
