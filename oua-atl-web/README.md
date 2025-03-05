Next.js 14 introduced the **App Router** with support for server components, layouts, and streaming. However, if you want to deploy a **static build** (fully pre-rendered HTML files), you need to ensure that you're using **only static rendering features**. Here's how:

---

## ✅ Steps to Deploy a Static Build of Next.js 14 with App Router

### 1️⃣ Ensure Static Export Compatibility
Next.js can **only generate static exports** if you avoid **server-side features** like:
- **Server Components** (`use client` must be added to all components)
- **API Routes** (`app/api`)
- **Server Actions**
- **Dynamic rendering (e.g., fetching data at runtime)**

👉 Use **`export const dynamic = 'force-static'`** in page components to ensure static pre-rendering.

---

### 2️⃣ Update `next.config.js`
Modify your `next.config.js` file to ensure it's set up for static export:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static HTML export
  images: { unoptimized: true }, // Disables Next.js Image Optimization (not supported in static export)
  trailingSlash: true, // Ensures all pages have a trailing slash (optional)
};

module.exports = nextConfig;
```

---

### 3️⃣ Run Static Export
1. **Build the project**:
   ```sh
   npm run build
   ```
2. **Export static files**:
   ```sh
   npm run export
   ```

Next.js will generate a `out/` directory with static HTML files.

---

### 4️⃣ Deploy to Static Hosting
Now, upload the `out/` folder to any static hosting service:

| Platform  | Deployment Steps |
|-----------|----------------|
| **Vercel** | **Not recommended** for static export (Vercel is optimized for SSR/ISR). Use their default deployment instead. |
| **Netlify** | Upload the `out/` folder manually or use `netlify-cli`. |
| **GitHub Pages** | Push `out/` to the `gh-pages` branch. |
| **Cloudflare Pages** | Deploy the `out/` folder via Cloudflare dashboard. |
| **S3 + CloudFront** | Upload `out/` to an S3 bucket and configure CloudFront. |

---

### 🔥 Example: Deploy to Netlify
1. Install Netlify CLI:
   ```sh
   npm install -g netlify-cli
   ```
2. Deploy:
   ```sh
   netlify deploy --dir=out --prod
   ```

---

## ✅ Summary
- **Ensure no server-side features** (`use client`, `dynamic = 'force-static'`)
- **Modify `next.config.js`** (`output: 'export'`)
- **Run `npm run build && npm run export`**
- **Upload `out/` folder** to a static hosting service

This will create a **fully static Next.js 14 site** 🚀. Let me know if you need help!