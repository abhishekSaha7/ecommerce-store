import { Product, ProductCategory, ProductFilterParams, PaginatedProductsResponse } from "@/types/product";

export const PRODUCTS_DATA: Product[] = [
  {
    id: "nova-01",
    name: "Kiyomi Sculpted Lounge Chair",
    slug: "kiyomi-sculpted-lounge-chair",
    tagline: "Ergonomic lounge chair crafted from solid black walnut & bouclé wool.",
    description: "The Kiyomi Lounge Chair pairs an architectural, floating wooden frame with plush Scandinavian bouclé upholstery. Designed for deep relaxation and spatial clarity, every joint is hand-finished by master woodworkers in Kyoto.",
    price: 1850,
    originalPrice: 2100,
    discountPercentage: 12,
    category: "furniture",
    tags: ["living", "seating", "wood", "boucle", "bestseller"],
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1580481072645-022f9a6d1270?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    stockCount: 14,
    isFeatured: true,
    isBestSeller: true,
    colors: [
      { name: "Cream Bouclé", hex: "#F3EFE0" },
      { name: "Charcoal Wool", hex: "#2C2C2C" },
      { name: "Raw Walnut", hex: "#5C4033" },
    ],
    specifications: [
      { label: "Dimensions", value: 'W 32" x D 35" x H 30"' },
      { label: "Seat Height", value: '16.5"' },
      { label: "Frame Material", value: "FSC-Certified Solid Black Walnut" },
      { label: "Upholstery", value: "90% Wool, 10% Cotton Bouclé" },
      { label: "Weight", value: "42 lbs" },
    ],
    shippingInfo: "Ships via white-glove freight service within 3-5 business days. Assembly included.",
    returnsInfo: "Complimentary 30-day trial return period with original packaging.",
    reviews: [
      {
        id: "rev-1",
        reviewerName: "Marcus Vance",
        rating: 5,
        date: "2026-07-14",
        comment: "Exceptional craftsmanship. The walnut joinery is precise, and the bouclé fabric feels incredibly luxurious.",
        verifiedPurchase: true,
      },
      {
        id: "rev-2",
        reviewerName: "Elena Rostova",
        rating: 5,
        date: "2026-06-29",
        comment: "Sublime addition to our living room. It's the focal point of the space now.",
        verifiedPurchase: true,
      },
    ],
  },
  {
    id: "nova-02",
    name: "Aura Spatial Wireless Speaker",
    slug: "aura-spatial-wireless-speaker",
    tagline: "Anodized aluminum wireless speaker with 360 acoustic dispersion.",
    description: "Engineered with dual neodymium drivers and custom DSP acoustic algorithms, Aura delivers immersive room-filling audio encased within a seamless brushed aluminum cylinder. Touch-sensitive glass top ring allows precise volumetric control.",
    price: 690,
    originalPrice: 750,
    discountPercentage: 8,
    category: "audio",
    tags: ["audio", "bluetooth", "aluminum", "wireless", "featured"],
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.8,
    reviewCount: 64,
    inStock: true,
    stockCount: 22,
    isFeatured: true,
    isNewArrival: true,
    colors: [
      { name: "Matte Silver", hex: "#E5E5E5" },
      { name: "Midnight Anodized", hex: "#1A1A1A" },
      { name: "Champagne Gold", hex: "#D4AF37" },
    ],
    specifications: [
      { label: "Frequency Range", value: "32 Hz - 24,000 Hz" },
      { label: "Connectivity", value: "AirPlay 2, Bluetooth 5.3, Spotify Connect, USB-C" },
      { label: "Battery Life", value: "Up to 18 hours wireless playback" },
      { label: "Enclosure", value: "Precision CNC Monoblock Aluminum" },
    ],
    shippingInfo: "Complimentary standard shipping (2-3 business days). Express options available.",
    returnsInfo: "30-day money-back guarantee with prepaid return shipping.",
  },
  {
    id: "nova-03",
    name: "Solstice Brass Pendant Light",
    slug: "solstice-brass-pendant-light",
    tagline: "Hand-blown frosted glass sphere suspended by solid brushed brass.",
    description: "Inspired by planetary motion, Solstice casts a warm diffused ambient glow across dining tables and entryways. Each glass dome is individually mouth-blown in Sweden.",
    price: 480,
    category: "lighting",
    tags: ["lighting", "brass", "pendant", "nordic", "glass"],
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.7,
    reviewCount: 19,
    inStock: true,
    stockCount: 9,
    isFeatured: true,
    colors: [
      { name: "Brushed Brass", hex: "#C5A059" },
      { name: "Bronzed Steel", hex: "#3D3A37" },
    ],
    sizes: ['12" Diameter', '16" Diameter', '20" Diameter'],
    specifications: [
      { label: "Illumination", value: "Dimmable Warm LED (2700K)" },
      { label: "Cable Length", value: "9 ft adjustable braided fabric cord" },
      { label: "Voltage", value: "110V - 240V Universal" },
    ],
    shippingInfo: "Ships within 24 hours. Packed in eco-friendly custom foam safety casing.",
    returnsInfo: "30-day hassle-free return policy.",
  },
  {
    id: "nova-04",
    name: "Kuro Studio Ceramic Carafe & Tumblers",
    slug: "kuro-studio-ceramic-carafe-tumblers",
    tagline: "Handmade ceramic water set with matte charcoal reactive glaze.",
    description: "Crafted in small artisanal batches, the Kuro set brings quiet elegance to morning rituals and dinner hosting. Includes one 1L pitch-perfect carafe and four matching 250ml tumblers.",
    price: 165,
    category: "homeware",
    tags: ["ceramic", "dining", "tableware", "kitchen"],
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.9,
    reviewCount: 41,
    inStock: true,
    stockCount: 30,
    isBestSeller: true,
    colors: [
      { name: "Matte Slate", hex: "#3A3D40" },
      { name: "Chalk White", hex: "#EAEAEA" },
      { name: "Sand Terracotta", hex: "#C87D55" },
    ],
    specifications: [
      { label: "Carafe Capacity", value: "1,000 ml (33.8 oz)" },
      { label: "Tumbler Capacity", value: "250 ml (8.4 oz)" },
      { label: "Dishwasher Safe", value: "Yes (Top Rack)" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    shippingInfo: "Standard shipping 2-4 business days.",
    returnsInfo: "30-day standard return.",
  },
  {
    id: "nova-05",
    name: "Archival Wool Trench Coat",
    slug: "archival-wool-trench-coat",
    tagline: "Double-breasted trench in 100% heavyweight Melton virgin wool.",
    description: "A timeless outerwear pillar. Designed with crisp architectural lapels, horn buttons, a removable waist belt, and deep storm flaps for superior elemental protection.",
    price: 890,
    originalPrice: 980,
    discountPercentage: 9,
    category: "apparel",
    tags: ["outerwear", "wool", "coat", "apparel", "luxury"],
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.9,
    reviewCount: 27,
    inStock: true,
    stockCount: 12,
    isNewArrival: true,
    colors: [
      { name: "Camel", hex: "#C19A6B" },
      { name: "Obsidian Black", hex: "#111111" },
      { name: "Navy Charcoal", hex: "#1B263B" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    specifications: [
      { label: "Material", value: "100% Virgin Melton Wool (520 gsm)" },
      { label: "Lining", value: "100% Cupro Silk Blend" },
      { label: "Care", value: "Dry Clean Only" },
    ],
    shippingInfo: "Ships in custom garment bag with premium wooden coat hanger.",
    returnsInfo: "Complimentary returns and size exchanges within 30 days.",
  },
  {
    id: "nova-06",
    name: "Minimalist Automatic Chronograph",
    slug: "minimalist-automatic-chronograph",
    tagline: "39mm Swiss movement timepiece with sapphire crystal glass & Italian calfskin.",
    description: "Reduced to pure functional essentialism. Features an exposed caseback revealing the 26-jewel Swiss automatic caliber, matte ivory dial, and quick-release vegetable-tanned leather band.",
    price: 1150,
    category: "accessories",
    tags: ["watch", "swiss", "leather", "timepiece", "bestseller"],
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 5.0,
    reviewCount: 52,
    inStock: true,
    stockCount: 8,
    isFeatured: true,
    isBestSeller: true,
    colors: [
      { name: "Cognac Leather", hex: "#9E4714" },
      { name: "Black Onyx", hex: "#1A1A1A" },
    ],
    specifications: [
      { label: "Case Diameter", value: "39 mm" },
      { label: "Case Thickness", value: "9.8 mm" },
      { label: "Movement", value: "Sellita SW200-1 Swiss Automatic" },
      { label: "Water Resistance", value: "5 ATM (50 Meters)" },
      { label: "Glass", value: "Double-domed Anti-reflective Sapphire" },
    ],
    shippingInfo: "Ships signature-required express freight.",
    returnsInfo: "30-day return policy. Includes 5-year international warranty.",
  },
  {
    id: "nova-07",
    name: "Forma Travertine Coffee Table",
    slug: "forma-travertine-coffee-table",
    tagline: "Solid monolithic Roman travertine table with honed satin finish.",
    description: "Celebrated for its natural warm beige veining and porous tactile texture, the Forma coffee table is cut from solid blocks of Italian travertine. A centerpiece of quiet architectural grandeur.",
    price: 2400,
    category: "furniture",
    tags: ["stone", "table", "travertine", "living"],
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.9,
    reviewCount: 15,
    inStock: true,
    stockCount: 5,
    isFeatured: true,
    specifications: [
      { label: "Dimensions", value: 'W 48" x D 28" x H 14"' },
      { label: "Material", value: "100% Natural Italian Travertine" },
      { label: "Finish", value: "Honed Stain-Resistant Sealant" },
      { label: "Weight", value: "185 lbs" },
    ],
    shippingInfo: "Delivered via white-glove specialized furniture transport.",
    returnsInfo: "Custom freight return policy within 14 days.",
  },
  {
    id: "nova-08",
    name: "Pulse Noise-Cancelling Headphones",
    slug: "pulse-noise-cancelling-headphones",
    tagline: "Over-ear headphones with active noise cancellation & lambskin ear cushions.",
    description: "Experience acoustic purity. Ultra-light titanium driver diaphragms deliver astonishing dynamic range, while hybrid ANC cancels external noise up to -38dB.",
    price: 450,
    originalPrice: 499,
    discountPercentage: 10,
    category: "audio",
    tags: ["audio", "headphones", "anc", "wireless", "bestseller"],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.8,
    reviewCount: 88,
    inStock: true,
    stockCount: 35,
    isBestSeller: true,
    colors: [
      { name: "Nordic Silver", hex: "#D8D8D8" },
      { name: "Matte Black", hex: "#1F1F1F" },
    ],
    specifications: [
      { label: "Driver Size", value: "40mm Beryllium-Coated Neodymium" },
      { label: "Battery", value: "35 Hours (ANC On)" },
      { label: "Bluetooth", value: "v5.3 with aptX Lossless & LDAC" },
    ],
    shippingInfo: "Free 2-day express shipping.",
    returnsInfo: "30-day money-back guarantee.",
  },
  {
    id: "nova-09",
    name: "Verde Marble Desk Lamp",
    slug: "verde-marble-desk-lamp",
    tagline: "Solid Guatemala green marble base with adjustable brass arm.",
    description: "Combining deep forest green marble with hand-finished brass, this desk lamp features a smooth rotary touch dimmer knob built into the heavy stone base.",
    price: 320,
    category: "lighting",
    tags: ["lighting", "marble", "brass", "desk"],
    images: [
      "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.6,
    reviewCount: 14,
    inStock: true,
    stockCount: 11,
    colors: [
      { name: "Verde Guatemala", hex: "#1C352D" },
      { name: "Nero Marquina", hex: "#121212" },
    ],
    specifications: [
      { label: "Base Dimension", value: '6" x 6" x 2"' },
      { label: "Height", value: '18" Adjustable' },
      { label: "Bulb", value: "G9 LED 4W Included" },
    ],
    shippingInfo: "Standard shipping 2-3 business days.",
    returnsInfo: "30-day standard return.",
  },
  {
    id: "nova-10",
    name: "Linen Duvet & Sheet Set",
    slug: "linen-duvet-sheet-set",
    tagline: "100% stonewashed French flax bedding set.",
    description: "Breathable in summer, cozy in winter. Our French flax linen is garment-washed for effortless drape and relaxed softness from night one.",
    price: 340,
    category: "homeware",
    tags: ["bedding", "linen", "bedroom", "textiles"],
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.9,
    reviewCount: 73,
    inStock: true,
    stockCount: 20,
    sizes: ["Full/Queen", "King/Cal King"],
    colors: [
      { name: "Oatmeal", hex: "#E3DAC9" },
      { name: "Sage", hex: "#9CAF88" },
      { name: "Terracotta", hex: "#D9822B" },
    ],
    specifications: [
      { label: "Material", value: "100% Certified French Flax Linen" },
      { label: "Set Includes", value: "1 Duvet Cover, 1 Fitted Sheet, 2 Pillowcases" },
    ],
    shippingInfo: "Ships within 24 hours.",
    returnsInfo: "30-day return policy.",
  },
  {
    id: "nova-11",
    name: "Heavyweight Cashmere Crewneck",
    slug: "heavyweight-cashmere-crewneck",
    tagline: "Grade-A Mongolian cashmere sweater in relaxed tailored fit.",
    description: "Spun from 2-ply 100% pure Mongolian cashmere yarn (12-gauge). Features seamless raglan sleeves and rib-knit cuffs designed to hold shape for decades.",
    price: 380,
    category: "apparel",
    tags: ["cashmere", "apparel", "sweater", "knitwear"],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.8,
    reviewCount: 33,
    inStock: true,
    stockCount: 16,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Heather Grey", hex: "#B0B0B0" },
      { name: "Navy Blue", hex: "#000080" },
      { name: "Ivory", hex: "#FFFFF0" },
    ],
    specifications: [
      { label: "Yarn", value: "100% Grade-A Mongolian Cashmere" },
      { label: "Gauge", value: "12 Gauge 2-Ply" },
    ],
    shippingInfo: "Standard shipping 2-3 business days.",
    returnsInfo: "30-day return policy.",
  },
  {
    id: "nova-12",
    name: "Architectural Leather Tote",
    slug: "architectural-leather-tote",
    tagline: "Structured weekender tote in full-grain Italian bridle leather.",
    description: "Designed for seamless transition between studio, flight, and boardroom. Fits a 16-inch MacBook Pro, featuring suede lining, YKK Excella brass zippers, and reinforced base pegs.",
    price: 620,
    category: "accessories",
    tags: ["leather", "bag", "tote", "travel", "accessories"],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.9,
    reviewCount: 45,
    inStock: true,
    stockCount: 7,
    colors: [
      { name: "Espresso Brown", hex: "#3B2F2F" },
      { name: "Jet Black", hex: "#0A0A0A" },
    ],
    specifications: [
      { label: "Dimensions", value: '16.5" W x 13" H x 6" D' },
      { label: "Material", value: "Full-Grain Vegetable Tanned Italian Cowhide" },
      { label: "Laptop Compartment", value: 'Padded sleeve fits up to 16" laptop' },
    ],
    shippingInfo: "Ships express in luxury dust bag.",
    returnsInfo: "30-day return policy.",
  },
];

// Isolated API service functions with simulated network latency
export async function getProducts(params: ProductFilterParams = {}): Promise<PaginatedProductsResponse> {
  // Simulate 150ms network roundtrip delay for realistic UX state transitions
  await new Promise((resolve) => setTimeout(resolve, 150));

  let filtered = [...PRODUCTS_DATA];

  // Category filter
  if (params.category && params.category !== "all") {
    filtered = filtered.filter((p) => p.category === params.category);
  }

  // Search query filter
  if (params.search && params.search.trim() !== "") {
    const query = params.search.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query) ||
        p.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // Price range filter
  if (params.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= params.minPrice!);
  }
  if (params.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= params.maxPrice!);
  }

  // Rating filter
  if (params.minRating !== undefined && params.minRating > 0) {
    filtered = filtered.filter((p) => p.rating >= params.minRating!);
  }

  // In Stock filter
  if (params.inStockOnly) {
    filtered = filtered.filter((p) => p.inStock && p.stockCount > 0);
  }

  // Sorting logic
  if (params.sortBy) {
    switch (params.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }
  }

  const page = params.page || 1;
  const limit = params.limit || 12;
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const startIdx = (page - 1) * limit;
  const paginatedProducts = filtered.slice(startIdx, startIdx + limit);

  return {
    products: paginatedProducts,
    total,
    page,
    totalPages,
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const product = PRODUCTS_DATA.find((p) => p.id === id || p.slug === id);
  return product || null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return PRODUCTS_DATA.filter((p) => p.isFeatured);
}

export async function getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const current = PRODUCTS_DATA.find((p) => p.id === productId);
  if (!current) return PRODUCTS_DATA.slice(0, limit);

  return PRODUCTS_DATA.filter(
    (p) => p.id !== productId && (p.category === current.category || p.tags.some((t) => current.tags.includes(t)))
  ).slice(0, limit);
}
