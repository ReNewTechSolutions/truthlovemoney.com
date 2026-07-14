# TruthLoveMoney.com

TruthLoveMoney.com is the public home for The Lyon Den: a warm literary publication for stories, wisdom, life lessons, poetry, books, and video chapters.

## Latest Chapters

The homepage `Latest Chapters` carousel is designed to work in two layers:

1. **Automatic YouTube feed, when configured**
2. **Local curated fallback data, always available**

The official channel is:

```txt
https://www.youtube.com/@TheLyonDen-Marguerite
```

## Social Links

The official social links are maintained in `src/data/socialPlatforms.js` so the public site works without backend or deployment environment variables.

To enable automatic chapter loading, add either of these Vite environment variables:

```bash
VITE_YOUTUBE_CHANNEL_ID=your-youtube-channel-id
```

or:

```bash
VITE_YOUTUBE_FEED_URL=https://www.youtube.com/feeds/videos.xml?channel_id=your-youtube-channel-id
```

The app fetches the RSS feed in the browser, parses the newest videos, and displays title, publish date, thumbnail, description, and YouTube link. If the feed is unavailable or blocked by CORS, the homepage automatically keeps using the polished local chapter cards.

### Finding the YouTube Channel ID

YouTube RSS requires the channel ID, not the handle. To find it:

1. Open the channel page in a browser.
2. View page source.
3. Search for `channelId`.
4. Use the value that starts with `UC...`.

If RSS fetches are blocked in production, use a lightweight server or edge proxy and set `VITE_YOUTUBE_FEED_URL` to that proxy URL.

## Custom Editorial Covers

Each local chapter/article supports a `customCover` field in `src/App.jsx`.

Rendering priority is:

1. `customCover`
2. YouTube thumbnail
3. CSS editorial cover

Recommended workflow:

1. Upload a new chapter to YouTube.
2. The video appears automatically using the YouTube thumbnail when the feed is configured.
3. ReNewTech creates editorial cover artwork later.
4. Add the cover file to:

```txt
public/assets/covers/
```

5. Update the matching chapter or blog article in `src/App.jsx`:

```js
customCover: '/assets/covers/example-cover.png'
```

6. The site switches from YouTube thumbnail or CSS cover to the custom editorial cover.

The automatic feed also tries to match YouTube titles to local curated chapter titles. If titles match, the YouTube item can inherit the local `customCover`.

## Manual Episode Fallbacks

If a chapter needs to appear before the YouTube feed is configured, add it to `curatedChapters` in `src/App.jsx`:

```js
{
  title: 'Episode Title',
  publishedAt: 'Month Year',
  description: 'Short editorial description.',
  customCover: '/assets/covers/episode-title.png',
  coverId: 'every-story-video',
  url: 'https://www.youtube.com/@TheLyonDen-Marguerite',
}
```

Use `customCover` when final artwork exists. Use `coverId` for the CSS editorial cover fallback.

## Blog Covers

Blog article cards use the same editorial card system. Add `customCover` to a blog post object in `src/App.jsx` when final cover artwork is ready.

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```
