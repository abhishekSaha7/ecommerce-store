import { ProductCategory } from "@/types/product";

export const SITE_CONFIG = {
  name: "NOVA",
  tagline: "Thoughtfully designed essentials for modern living.",
  description: "Industry-standard luxury storefront featuring architectural furniture, high-fidelity audio, minimal apparel, and refined home essentials.",
  url: "https://nova-commerce.vercel.app",
};

export const SHIPPING_CONFIG = {
  FREE_SHIPPING_THRESHOLD: 250,
  STANDARD_SHIPPING_FEE: 15,
  EXPRESS_SHIPPING_FEE: 35,
  OVERNIGHT_SHIPPING_FEE: 55,
  TAX_RATE: 0.08, // 8% sales tax
};

export const PROMO_CODES: Record<string, number> = {
  NOVA10: 10,
  WELCOME20: 20,
  LUXURY15: 15,
};

export const CATEGORIES: { id: ProductCategory; label: string; description: string; image: string }[] = [
  {
    id: "furniture",
    label: "Furniture",
    description: "Architectural silhouettes & sculpted solid wood pieces.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "audio",
    label: "Acoustics & Audio",
    description: "Precision engineered acoustic systems & tactile controllers.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "lighting",
    label: "Lighting",
    description: "Ambient sculpture, mouth-blown glass & dimmable brass fixtures.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "homeware",
    label: "Object & Homeware",
    description: "Ceramic vessels, linen textiles & minimalist desktop accoutrements.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "apparel",
    label: "Apparel & Knitwear",
    description: "Heavyweight organic cottons, virgin wools & tailored outerwear.",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "accessories",
    label: "Leather Goods & Time",
    description: "Full-grain vegetable-tanned leather & Swiss minimalist chronographs.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85",
  },
];
