# LuxeDrive — Premium Car Marketplace Landing

Luxury bilingual (فارسی / English) landing page for a car buying & selling marketplace.

## Design System

- **Palette**: White / Zinc gray / Deep black — Apple-inspired luxury
- **Buttons**: iPhone-style pill buttons with soft gradients, inset highlights and refined shadows
- **Typography**: Geist (Latin) + Vazirmatn (Persian)
- **Style**: Clean 2027 modern — glass cards, subtle grain, smooth fade-up animations

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Default language is Persian. Use the FA / EN toggle in the navbar.

## Structure

```
src/app/
  layout.tsx    # Root layout + fonts
  page.tsx      # Full landing page (client component with i18n)
  globals.css   # Theme tokens + button / glass / animation styles
```

## Color Tokens

| Token        | Value     |
|--------------|-----------|
| Background   | `#fafafa` |
| Foreground   | `#0a0a0a` |
| Muted        | `#71717a` |
| Border       | `#e4e4e7` |
| Accent       | `#18181b` |
| Surface      | `#f4f4f5` |
