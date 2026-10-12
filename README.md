# Marie Glam — storefront starter

A responsive editorial e-commerce storefront inspired by the visual language of the user's GOATESQUE project: monochrome palette, oversized typography, cinematic imagery, restrained motion, strong whitespace, and alternating dark/light sections. The structure is adapted for a generalist home-and-lifestyle boutique.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Before launch

1. Update the catalogue in `src/data/store.js` with verified products, prices, descriptions, stock and actual photos.
2. Set `STORE.whatsappNumber` in `src/data/store.js` using the international format without `+` or spaces.
3. Replace remote Unsplash sample images with real product photos. Product IDs are stable so image URLs can be changed without changing the catalogue structure.
4. Confirm the store address, opening hours, delivery fees, payment process, privacy policy and return policy.
5. The sample prices and product names are illustrative only. The current images are mood/mockup references, not verified photos of the client's inventory.

## Current interactions

- Responsive navigation and mobile menu
- Category filters and live search
- Product detail modal
- Add-to-cart, quantity changes, remove item and subtotal
- WhatsApp order message generation once the store number is configured
- WhatsApp buttons show a setup notice until the number is configured

This is a front-end starter. It does not yet provide a database, stock synchronization, payment processing, customer accounts or a real AI agent.
