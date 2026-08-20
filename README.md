# News Article Summarizer

Paste a news article link, get back a quick AI-generated summary. No more doomscrolling through 2,000-word think pieces.

Built with React 18 and Tailwind CSS.

## Running locally

```
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Configuration

The app calls the [Article Extractor and Summarizer](https://rapidapi.com/restyler/api/article-extractor-and-summarizer) API on RapidAPI (free tier: ~50 requests/month). Subscribe to it with your RapidAPI account, then create a `.env` file in the project root (already gitignored) with:

```
REACT_APP_API_KEY='your-rapidapi-key'
REACT_APP_API_HOST='article-extractor-and-summarizer.p.rapidapi.com'
```

## Deploying to GitHub Pages

```
npm run deploy
```

This builds the app and publishes the `build` folder to the `gh-pages` branch via the [`gh-pages`](https://www.npmjs.com/package/gh-pages) package.

© Advait Gogte
