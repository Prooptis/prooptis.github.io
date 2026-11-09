# Prooptis website (draft)

Static site: plain HTML/CSS + ~3 KB JS. No framework, no build needed to host.

- `index.html`: Greek homepage (primary) · `en/index.html`: English · `privacy/`, `en/privacy/`: privacy notices · `404.html`
- `assets/img/logo.png` (navy) and `assets/img/logo-light.png` (white on dark): official Prooptis wordmark. Favicon: `assets/favicon.png` (stripe mark).
- `assets/img/og-image.png`: social share image (1200×630).
- Fonts (Inter, Manrope; Greek + Latin) are self-hosted in `assets/fonts/` (no Google requests, better for GDPR).
- `robots.txt`, `sitemap.xml`, `llms.txt`: search engines and AI crawlers.
- Source of all page text: `../src/build.py`. Edit text there, run `python3 ../src/build.py`, and the HTML is regenerated.

## Contact form (Web3Forms)

Configured at the top of `assets/js/main.js`. Free plan: 250 submissions/month, honeypot spam check. The receiving email address is never in the site code; Web3Forms maps the access key to the inbox.

One-time step: request a free access key at https://web3forms.com for the receiving inbox (see `/workspace/prooptis/FORM-SETUP.md`, kept outside the site folder), copy the key from the email Web3Forms sends, and paste it into `WEB3FORMS_ACCESS_KEY = "..."`. Until then the form shows a friendly "not available yet" message.

Each email has the visitor's address as Reply-To, so replies can go from any mailbox.

Test locally: `python3 -m http.server 8765` in this folder, open http://localhost:8765/
