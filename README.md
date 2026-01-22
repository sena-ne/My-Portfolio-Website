# My Portfolio Website

A lightweight, static single-page personal portfolio website built with plain HTML, modern CSS, and vanilla JavaScript.

## 🌟 Features

- Responsive layout using CSS Grid and Flexbox
- Light / Dark theme toggle (persisted with `localStorage`)
- Circular avatar with responsive background
- Project slideshow with modal viewer, keyboard support, and lazy-loaded images
- Contact form integrated with Formspree (client-side `fetch` + `FormData`)
- Accessible attributes and keyboard interactions for the modal

## 🛠️ Tech Stack & Libraries

- HTML5
- CSS3 (custom properties, media queries, Grid, Flexbox, `backdrop-filter`)
- JavaScript (ES6+; `const`/`let`, arrow functions, `async/await`)
- CDN libraries included:
  - Font Awesome 6.4.0 (icons)
  - Devicon (`devicon@latest`) (technology icons)
  - Google Fonts: `Inter`

## 📁 Files

- `index.html` — single-page markup and content
- `style.css` — all styling, variables and responsive rules
- `script.js` — theme toggle, slideshow/modal, contact form handling

## 💻 Local preview

Open `index.html` directly in a browser, or run a simple HTTP server (recommended when testing `fetch` form submission):

```powershell
cd path\to\your\portfolio
python -m http.server 8000
Start-Process "http://localhost:8000"
```

## 🚀 Live Demo

<!--👉 [View live portfolio]--> https://sena-ne.github.io/My-Portfolio-Website/

### ✅ Next Steps:
- Replace `your-username/your-repo` with your actual GitHub info.
- Add a real screenshot or remove the placeholder image line if you prefer.
- If you use **GitHub Pages**, make sure your site is published (Settings → Pages).

Let me know if you'd like a **theme toggle script** or help **optimizing CDN links** for Font Awesome & Devicon! 😊
