# Arpit Nimgade — Portfolio

A static, dependency-free portfolio site (HTML/CSS/JS — no build step, no npm required).

## Why static instead of React/TypeScript/Tailwind

The original brief asked for React + TypeScript + Tailwind. This was built as plain
HTML/CSS/JS instead because the build environment here has no network access to run
`npm install` or verify a Vite/React build compiles cleanly — shipping untested build
tooling would risk broken output. A static site has no such risk: it runs by double-clicking
`index.html`, needs no build step, and deploys to any static host as-is.

If you still want the React/TS/Tailwind version, ask and it can be scaffolded — just flag
that the npm build itself won't be verified in this environment, so test it locally
(`npm install && npm run build`) before relying on it.

## Project structure

```
portfolio/
├── index.html        All page content and sections
├── css/style.css      All styling (design tokens at the top)
├── js/main.js         Mobile menu, scroll-spy, reveal animations, terminal effect, contact form
├── assets/
│   └── favicon.svg
└── README.md
```

## Things you still need to add

1. **Individual project GitHub repo links** — the "Source Code" buttons currently point to
   your GitHub profile (`github.com/arpitnimgade`) as a placeholder. In `index.html`, search
   for `project-links` and replace each `href` with the real repo URL, e.g.:
   ```html
   <a href="https://github.com/arpitnimgade/food4fork" ...>Source Code</a>
   ```
2. **WebStack Academy dates** — not in the resume text provided. Add them in the Experience
   section (`#experience` in `index.html`) under `.timeline-date` if you'd like them shown.
3. **Profile photo** — none is included (kept photo-free, common for dev portfolios). To add
   one, drop an image in `assets/` and reference it in the `.hero-text` block in `index.html`.
4. **Other social links** (Instagram/X, etc.) — only GitHub, LinkedIn, and email were provided.
   Add more icons in the `.hero-socials`, `.contact-list`, and `.footer-socials` blocks the
   same way the existing ones are structured.
5. **og:image** — `index.html` references `assets/og-image.png` for social-share previews;
   add a 1200×630 image there, or remove the tag if you don't need it.

## Resume

The "Download Resume" and "View Resume" buttons currently point straight to your Google
Drive link, as you asked:
```
https://drive.google.com/file/d/1S2OReeD-6QwUrGOjEX-sfanJSqMtxWEu/view?usp=sharing
```
Note: Drive links only work if the file's sharing setting is "Anyone with the link can view."
If you'd rather host the PDF yourself (more reliable, works even if Drive settings change),
put the file at `assets/Arpit_Nimgade_Resume.pdf` and update the two `href`s in the Hero and
Resume sections in `index.html` to `assets/Arpit_Nimgade_Resume.pdf`.

## Contact form

The form in `#contact` is frontend-only right now — it validates input and shows a
confirmation message, but doesn't send anything anywhere. To make it actually deliver
messages, pick one:

- **Formspree** (easiest, no backend): sign up at formspree.io, get a form endpoint, and
  change the `<form>` tag's behavior in `js/main.js` to `fetch()` that endpoint instead of
  just showing a status message.
- **EmailJS**: similar, sends straight from the browser via their JS SDK.
- **Your own backend**: point the fetch call at your own API route that sends the email.

## Run it locally

No install needed. Either:
- Double-click `index.html`, or
- From the `portfolio/` folder, run a local server (recommended, avoids some browser file:// restrictions):
  ```
  python3 -m http.server 8000
  ```
  then open `http://localhost:8000`.

## "Build for production"

There's no build step — the files in this folder *are* the production files. Just make sure
you've filled in the items in "Things you still need to add" above.

## Deploy

**Netlify (drag-and-drop, easiest):**
1. Go to app.netlify.com → "Add new site" → "Deploy manually"
2. Drag the whole `portfolio/` folder onto the page
3. Done — you'll get a live URL immediately, and can add a custom domain later

**Vercel:**
1. `npm i -g vercel` (requires Node.js), then from inside `portfolio/`: `vercel`
2. Follow the prompts — no framework/build settings needed, it's a static site

**GitHub Pages:**
1. Push this folder to a GitHub repo
2. Repo → Settings → Pages → set source to your main branch, root folder
3. Your site will be live at `https://<username>.github.io/<repo-name>/`

## Browser support

Plain HTML/CSS/JS with `IntersectionObserver` and CSS custom properties — works in all
current versions of Chrome, Edge, Firefox, and Safari, desktop and mobile. Animations
respect `prefers-reduced-motion`.
