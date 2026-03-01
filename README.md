# Cyberwin Solutions — Corporate Website

A professional, enterprise-grade corporate website built with React + Vite.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

---

## 📦 Deploy to Vercel (Recommended — Free)

### Option 1: Via GitHub (Easiest)

1. **Push this folder to a GitHub repo:**
   ```bash
   cd cyberwin-site
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/cyberwin-site.git
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub

3. **Click "Add New Project"** → Select your `cyberwin-site` repo

4. **Vercel auto-detects Vite** — just click **Deploy**

5. Your site is live at `https://cyberwin-site.vercel.app` (or custom domain)

### Option 2: Via Vercel CLI

```bash
npm i -g vercel
cd cyberwin-site
vercel
```

Follow the prompts — done in 30 seconds.

---

## 📦 Deploy to Netlify (Alternative — Also Free)

1. **Push to GitHub** (same steps as above)

2. **Go to [app.netlify.com](https://app.netlify.com)**

3. **Click "Add new site" → "Import an existing project"**

4. **Connect your GitHub repo**, set:
   - Build command: `npm run build`
   - Publish directory: `dist`

5. **Click Deploy** — live in ~60 seconds

---

## 🌐 Custom Domain

Both Vercel and Netlify support free custom domains:

1. In your dashboard, go to **Settings → Domains**
2. Add your domain (e.g., `cyberwinsolutions.com`)
3. Update your DNS records as instructed:
   - **Vercel**: Add an A record or CNAME
   - **Netlify**: Add a CNAME pointing to your Netlify URL
4. Free SSL is automatic on both platforms

---

## 🛠 Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder — ready for any static host.

---

## Tech Stack

- **React 18** — UI framework
- **Vite 6** — Build tool
- **Outfit + DM Sans** — Typography (Google Fonts)
- **No external UI libraries** — fully custom CSS-in-JS
