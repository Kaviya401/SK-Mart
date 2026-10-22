# SK Mart

A frontend-only village market storefront built with JavaScript and JSX using Next.js App Router, React, Ant Design 5, Redux Toolkit, and Framer Motion. Product details start in `data/products.json`; cart, customer details, orders, product edits, and demo admin session are saved in browser localStorage.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo admin login

- Username: `admin`
- Password: `skmart123`

Visit `/admin/login` to sign in. This demo login is client-side only and is not suitable for production.

## Market routes

- `/` — Home and category tiles
- `/category/vegetables` (also `girls-accessories`, `boys-accessories`, `home-items`, `kitchen-items`)
- `/checkout` — Basket review, saved delivery details, and order confirmation
- `/admin/login` and `/admin` — Demo owner dashboard

All product illustrations are local SVG files under `public/images/`.
