# Sun Raksmean — IT Portfolio

A professional portfolio built with **React + Vite + TypeScript**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.tsx        # Sticky nav + dark mode + edit toggle
│   │   ├── Hero.tsx          # Landing hero section
│   │   ├── About.tsx         # About me + stats
│   │   ├── Skills.tsx        # Categorized skill bars
│   │   ├── Experience.tsx    # Work timeline
│   │   ├── Projects.tsx      # Project grid + detail modal
│   │   ├── Certifications.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx       # Contact form
│   │   └── Footer.tsx
│   ├── data/
│   │   └── seed.ts           # Pre-seeded resume data
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ✏️ Edit Mode

Click the **"Edit Mode"** button in the header to enable inline editing:

- **Skills** — Add / Edit (inline slider) / Delete skills per category
- **Experience** — Add / Edit / Delete work entries
- **Projects** — Add / Edit (modal form) / Delete projects
- **Certifications** — Add / Edit / Delete certifications
- **Logo** — Click the logo text to rename it

All changes are **automatically saved to localStorage** — they persist on refresh.

---

## 🎨 Design Features

- **Font**: Kantumruy Pro (Google Fonts) — all weights
- **Colors**: Professional blue (#3b82f6) + cyan (#06b6d4) accents
- **Dark Mode**: Deep navy dark / cool light blue-white — smooth CSS variable transitions
- **Responsive**: Mobile-first, breakpoints at 768px
- **Animations**: Scroll-triggered reveals, hover lift effects, gradient progress bars

---

## 🔧 Customization

Edit `src/data/seed.ts` to update default content.  
All data keys in localStorage use the `portfolio-*` prefix.

To **reset to defaults**, clear localStorage:
```js
Object.keys(localStorage).filter(k => k.startsWith('portfolio-')).forEach(k => localStorage.removeItem(k));
```
