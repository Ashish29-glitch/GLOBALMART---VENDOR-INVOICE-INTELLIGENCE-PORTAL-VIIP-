export interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  exchangeRate: number; // to USD
  region: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'electronics' | 'luxury' | 'essentials' | 'deals';
  subcategory: string;
  price: number; // in local currency
  originalPrice?: number;
  currency: string;
  currencySymbol: string;
  countryCode: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  description: string;
  features: string[];
  colors?: string[];
  sizes?: string[];
  badge?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  discount?: number;
  weight?: string;
  dimensions?: string;
  brand_origin?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', currencySymbol: '$', exchangeRate: 1, region: 'Americas' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', currencySymbol: '£', exchangeRate: 0.79, region: 'Europe' },
  { code: 'EU', name: 'European Union', flag: '🇪🇺', currency: 'EUR', currencySymbol: '€', exchangeRate: 0.92, region: 'Europe' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', currencySymbol: '¥', exchangeRate: 0.0067, region: 'Asia' },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', currencySymbol: '₹', exchangeRate: 0.012, region: 'Asia' },
  { code: 'CN', name: 'China', flag: '🇨🇳', currency: 'CNY', currencySymbol: '¥', exchangeRate: 0.138, region: 'Asia' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', currencySymbol: 'A$', exchangeRate: 0.65, region: 'Oceania' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', currencySymbol: 'C$', exchangeRate: 0.74, region: 'Americas' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', currency: 'KRW', currencySymbol: '₩', exchangeRate: 0.00075, region: 'Asia' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', currencySymbol: 'S$', exchangeRate: 0.74, region: 'Asia' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪', currency: 'AED', currencySymbol: 'د.إ', exchangeRate: 0.272, region: 'Middle East' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', currency: 'CHF', currencySymbol: 'Fr', exchangeRate: 1.13, region: 'Europe' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', currency: 'BRL', currencySymbol: 'R$', exchangeRate: 0.20, region: 'Americas' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', currency: 'MXN', currencySymbol: 'MX$', exchangeRate: 0.058, region: 'Americas' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', currency: 'ZAR', currencySymbol: 'R', exchangeRate: 0.054, region: 'Africa' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', currency: 'SAR', currencySymbol: '﷼', exchangeRate: 0.267, region: 'Middle East' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', currency: 'HKD', currencySymbol: 'HK$', exchangeRate: 0.128, region: 'Asia' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', currency: 'SEK', currencySymbol: 'kr', exchangeRate: 0.096, region: 'Europe' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', currency: 'NZD', currencySymbol: 'NZ$', exchangeRate: 0.61, region: 'Oceania' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currency: 'NGN', currencySymbol: '₦', exchangeRate: 0.00065, region: 'Africa' },
];

const electronicsImages = [
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
  'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=600&q=80',
  'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80',
  'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80',
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80',
  'https://images.unsplash.com/photo-1625773470682-8d5b6e0b8d33?w=600&q=80',
  'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80',
];

const luxuryImages = [
  'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
  'https://images.unsplash.com/photo-1594938298603-c8148c4b4c3a?w=600&q=80',
  'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=80',
  'https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?w=600&q=80',
  'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80',
  'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80',
  'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80',
];

const essentialsImages = [
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80',
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
  'https://images.unsplash.com/photo-1586495777744-4e6232bf2e9e?w=600&q=80',
];

const dealsImages = [
  'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80',
  'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600&q=80',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
  'https://images.unsplash.com/photo-1583394293214-0d9e2b0b5b0a?w=600&q=80',
  'https://images.unsplash.com/photo-1619461168491-7b7fb9e5b7e4?w=600&q=80',
  'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80',
];

const electronicsProducts = [
  { name: 'iPhone 15 Pro Max', brand: 'Apple', subcategory: 'Smartphones', basePrice: 1199, features: ['A17 Pro chip', '48MP camera', 'Titanium design', 'USB-C'], colors: ['Natural Titanium', 'Black Titanium', 'White Titanium', 'Blue Titanium'] },
  { name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', subcategory: 'Smartphones', basePrice: 1099, features: ['Snapdragon 8 Gen 3', 'S Pen', '200MP camera', '5000mAh'], colors: ['Titanium Gray', 'Titanium Black', 'Titanium Violet', 'Titanium Yellow'] },
  { name: 'Google Pixel 8 Pro', brand: 'Google', subcategory: 'Smartphones', basePrice: 999, features: ['Google Tensor G3', 'AI features', '50MP camera', '7 years updates'], colors: ['Obsidian', 'Porcelain', 'Bay'] },
  { name: 'Sony Xperia 1 V', brand: 'Sony', subcategory: 'Smartphones', basePrice: 1299, features: ['4K OLED display', 'Cinema camera', 'Hi-Res Audio', 'Zeiss optics'], colors: ['Platinum Silver', 'Black', 'Khaki Green'] },
  { name: 'OnePlus 12', brand: 'OnePlus', subcategory: 'Smartphones', basePrice: 799, features: ['Snapdragon 8 Gen 3', 'Hasselblad camera', '100W charging', '5400mAh'], colors: ['Flowy Emerald', 'Silky Black'] },
  { name: 'MacBook Pro 16" M3 Max', brand: 'Apple', subcategory: 'Laptops', basePrice: 3499, features: ['M3 Max chip', '48GB RAM', '1TB SSD', 'Liquid Retina XDR'], colors: ['Space Black', 'Silver'] },
  { name: 'Dell XPS 15', brand: 'Dell', subcategory: 'Laptops', basePrice: 1799, features: ['Intel Core i9', 'RTX 4070', '32GB RAM', 'OLED display'], colors: ['Platinum Silver', 'Graphite'] },
  { name: 'ASUS ROG Zephyrus G16', brand: 'ASUS', subcategory: 'Laptops', basePrice: 2199, features: ['RTX 4090', '240Hz OLED', 'AMD Ryzen 9', '32GB DDR5'], colors: ['Eclipse Gray', 'Platinum White'] },
  { name: 'Microsoft Surface Pro 10', brand: 'Microsoft', subcategory: 'Laptops', basePrice: 1599, features: ['Intel Core Ultra 7', 'Snapdragon X Elite', '2K touchscreen', 'Detachable keyboard'], colors: ['Platinum', 'Graphite', 'Sapphire'] },
  { name: 'Lenovo ThinkPad X1 Carbon', brand: 'Lenovo', subcategory: 'Laptops', basePrice: 1899, features: ['Intel Core i7', '32GB RAM', '1TB SSD', 'Carbon fiber'], colors: ['Black'] },
  { name: 'Sony WH-1000XM5', brand: 'Sony', subcategory: 'Headphones', basePrice: 399, features: ['Industry-best ANC', '30hr battery', 'LDAC codec', 'Multipoint connect'], colors: ['Black', 'Silver', 'Midnight Blue'] },
  { name: 'Apple AirPods Pro 2', brand: 'Apple', subcategory: 'Headphones', basePrice: 249, features: ['H2 chip', 'Adaptive transparency', 'Personalized Spatial Audio', 'USB-C case'], colors: ['White'] },
  { name: 'Bose QuietComfort Ultra', brand: 'Bose', subcategory: 'Headphones', basePrice: 429, features: ['CustomTune ANC', 'Immersive audio', '24hr battery', 'Bluetooth 5.3'], colors: ['Black', 'White Smoke', 'Sandstone'] },
  { name: 'DJI Air 3', brand: 'DJI', subcategory: 'Drones', basePrice: 1099, features: ['Dual main cameras', '46min flight time', 'Tri-directional obstacle sensing', '4K/60fps'], colors: ['Gray'] },
  { name: 'DJI Mini 4 Pro', brand: 'DJI', subcategory: 'Drones', basePrice: 759, features: ['249g ultralight', '4K/60fps HDR', 'Omnidirectional obstacle sensing', '34min flight'], colors: ['Gray'] },
  { name: 'Sony Alpha A7R V', brand: 'Sony', subcategory: 'Cameras', basePrice: 3899, features: ['61MP full-frame', '8K video', 'AI-based autofocus', 'In-body stabilization'], colors: ['Black'] },
  { name: 'Canon EOS R5 Mark II', brand: 'Canon', subcategory: 'Cameras', basePrice: 4299, features: ['45MP sensor', '8K RAW video', 'Dual Pixel CMOS AF', 'IP53 weather seal'], colors: ['Black'] },
  { name: 'Nikon Z8', brand: 'Nikon', subcategory: 'Cameras', basePrice: 3999, features: ['45.7MP BSI sensor', '8K video', 'Subject detection AF', '20fps'], colors: ['Black'] },
  { name: 'GoPro Hero 12 Black', brand: 'GoPro', subcategory: 'Cameras', basePrice: 399, features: ['5.3K video', 'HyperSmooth 6.0', 'TimeWarp 3.0', 'Waterproof 10m'], colors: ['Black'] },
  { name: 'Samsung 65" QLED 4K', brand: 'Samsung', subcategory: 'TVs', basePrice: 1299, features: ['Quantum Dot', '120Hz', 'HDR10+', 'Object Tracking Sound'], colors: ['Black'] },
  { name: 'LG C3 OLED 55"', brand: 'LG', subcategory: 'TVs', basePrice: 1499, features: ['OLED evo panel', '120Hz', 'Dolby Vision IQ', 'G-Sync Compatible'], colors: ['Black'] },
  { name: 'Sony Bravia XR A80L', brand: 'Sony', subcategory: 'TVs', basePrice: 1799, features: ['XR OLED panel', 'Cognitive Processor XR', 'Bravia Acoustic Surface', '4K 120Hz'], colors: ['Black'] },
  { name: 'Apple Watch Ultra 2', brand: 'Apple', subcategory: 'Smartwatches', basePrice: 799, features: ['Titanium case', 'Action button', '60hr battery', 'Precision dual-frequency GPS'], colors: ['Natural Titanium', 'Black Titanium'] },
  { name: 'Samsung Galaxy Watch 6 Classic', brand: 'Samsung', subcategory: 'Smartwatches', basePrice: 399, features: ['Rotating bezel', 'Body composition analysis', 'Sleep coaching', 'ECG'], colors: ['Black', 'Silver'] },
  { name: 'Garmin Fenix 7X Solar', brand: 'Garmin', subcategory: 'Smartwatches', basePrice: 899, features: ['Solar charging', '37-day battery', 'Multi-band GPS', 'Topographic maps'], colors: ['Carbon Gray', 'Silver', 'Slate Gray'] },
  { name: 'iPad Pro 13" M4', brand: 'Apple', subcategory: 'Tablets', basePrice: 1299, features: ['M4 chip', 'Ultra Retina XDR', 'Apple Pencil Pro', 'Nano-texture glass'], colors: ['Silver', 'Space Black'] },
  { name: 'Samsung Galaxy Tab S9 Ultra', brand: 'Samsung', subcategory: 'Tablets', basePrice: 1199, features: ['14.6" AMOLED', 'Snapdragon 8 Gen 2', 'S Pen included', 'DeX mode'], colors: ['Graphite', 'Beige'] },
  { name: 'Xbox Series X', brand: 'Microsoft', subcategory: 'Gaming', basePrice: 499, features: ['12 teraflops GPU', '4K 120fps', '1TB SSD', 'Quick Resume'], colors: ['Black'] },
  { name: 'PlayStation 5 Pro', brand: 'Sony', subcategory: 'Gaming', basePrice: 699, features: ['PS5 Pro GPU', '30 TFLOPS', '8K gaming', 'Advanced ray tracing'], colors: ['White'] },
  { name: 'Nintendo Switch OLED', brand: 'Nintendo', subcategory: 'Gaming', basePrice: 349, features: ['7" OLED screen', '64GB storage', 'Wide adjustable stand', 'Enhanced audio'], colors: ['White', 'Neon'] },
  { name: 'NVIDIA GeForce RTX 4090', brand: 'NVIDIA', subcategory: 'Components', basePrice: 1599, features: ['24GB GDDR6X', 'DLSS 3', 'ADA Lovelace', '450W TDP'], colors: ['Black'] },
  { name: 'AMD Ryzen 9 7950X', brand: 'AMD', subcategory: 'Components', basePrice: 699, features: ['16 cores/32 threads', '5.7GHz boost', 'Zen 4 architecture', '170W TDP'], colors: ['N/A'] },
  { name: 'Samsung 990 Pro 2TB NVMe', brand: 'Samsung', subcategory: 'Storage', basePrice: 199, features: ['7,450 MB/s read', 'PCIe 4.0', '2TB capacity', '10-year warranty'], colors: ['Black'] },
  { name: 'WD Black 4TB HDD', brand: 'Western Digital', subcategory: 'Storage', basePrice: 99, features: ['7200 RPM', '256MB cache', 'Gaming optimized', 'SATA 6Gb/s'], colors: ['Black'] },
  { name: 'Corsair Vengeance DDR5 32GB', brand: 'Corsair', subcategory: 'Components', basePrice: 149, features: ['6000MHz', 'DDR5', 'Intel XMP 3.0', 'AMD EXPO'], colors: ['Black', 'White'] },
  { name: 'Logitech MX Master 3S', brand: 'Logitech', subcategory: 'Accessories', basePrice: 99, features: ['8K DPI sensor', 'MagSpeed scroll', 'Multi-device', 'Quiet clicks'], colors: ['Graphite', 'Pale Gray', 'Midnight'] },
  { name: 'Apple Magic Keyboard', brand: 'Apple', subcategory: 'Accessories', basePrice: 129, features: ['Touch ID', 'Scissor mechanism', 'USB-C', 'Rechargeable'], colors: ['Silver', 'Space Gray', 'Midnight', 'Starlight'] },
  { name: 'Keychron Q1 Pro', brand: 'Keychron', subcategory: 'Accessories', basePrice: 199, features: ['QMK/VIA', 'Gasket mount', 'Wireless', 'Hot-swappable'], colors: ['Carbon Black', 'Shell White'] },
  { name: 'LG UltraFine 27" 4K', brand: 'LG', subcategory: 'Monitors', basePrice: 799, features: ['4K IPS', 'USB-C 96W', 'Thunderbolt 3', 'HDR600'], colors: ['Silver'] },
  { name: 'ASUS ProArt PA32UCX', brand: 'ASUS', subcategory: 'Monitors', basePrice: 1999, features: ['4K Mini LED', '1200 nits', 'Calman certified', 'Thunderbolt 3'], colors: ['Black'] },
  { name: 'Samsung Odyssey G9 49"', brand: 'Samsung', subcategory: 'Monitors', basePrice: 1299, features: ['49" ultrawide', '240Hz', 'QLED', 'G-Sync'], colors: ['White'] },
  { name: 'Anker 737 Power Bank', brand: 'Anker', subcategory: 'Accessories', basePrice: 149, features: ['24,000mAh', '140W output', 'USB-C fast charge', 'Digital display'], colors: ['Black', 'Blue'] },
  { name: 'Belkin MagSafe 3-in-1', brand: 'Belkin', subcategory: 'Accessories', basePrice: 149, features: ['MagSafe 15W', 'Apple Watch charge', 'AirPods charge', 'Foldable'], colors: ['White', 'Black'] },
  { name: 'Sonos Era 300', brand: 'Sonos', subcategory: 'Audio', basePrice: 449, features: ['Spatial Audio', 'Dolby Atmos', 'Wi-Fi & Bluetooth', 'Voice control'], colors: ['Black', 'White'] },
  { name: 'Bang & Olufsen Beosound A5', brand: 'B&O', subcategory: 'Audio', basePrice: 799, features: ['360° sound', 'Adaptive acoustics', 'Multiroom', 'Premium design'], colors: ['Anthracite', 'Nordic Weave'] },
  { name: 'Dyson V15 Detect', brand: 'Dyson', subcategory: 'Home', basePrice: 749, features: ['Laser dust detection', 'HEPA filtration', '60min runtime', '240AW suction'], colors: ['Gold', 'Nickel', 'Yellow'] },
  { name: 'Roomba j9+', brand: 'iRobot', subcategory: 'Home', basePrice: 899, features: ['Auto-empty base', 'Smart mapping', 'Pet hair specialist', 'Clean Base'], colors: ['Black'] },
  { name: 'Ecovacs Deebot T20 Omni', brand: 'Ecovacs', subcategory: 'Home', basePrice: 799, features: ['Hot water mop washing', 'Auto-lift mopping', 'AIVI 3D', '6000Pa suction'], colors: ['Black'] },
  { name: 'Philips Hue Starter Kit', brand: 'Philips', subcategory: 'Smart Home', basePrice: 199, features: ['16M colors', 'Zigbee bridge', 'Voice control', '4 bulbs'], colors: ['White'] },
  { name: 'Amazon Echo Show 15', brand: 'Amazon', subcategory: 'Smart Home', basePrice: 249, features: ['15.6" display', 'Alexa', 'Fire TV', 'Visual ID'], colors: ['Black'] },
];

const luxuryProducts = [
  { name: 'Rolex Submariner Date', brand: 'Rolex', subcategory: 'Watches', basePrice: 14500, features: ['Oystersteel case', 'Cerachrom bezel', '300m waterproof', 'Calibre 3235'] },
  { name: 'Patek Philippe Calatrava', brand: 'Patek Philippe', subcategory: 'Watches', basePrice: 29000, features: ['18k rose gold', 'Calibre 240', 'Sapphire crystal', 'Crocodile strap'] },
  { name: 'Omega Seamaster 300M', brand: 'Omega', subcategory: 'Watches', basePrice: 6500, features: ['Co-Axial Master', '300m water resistance', 'Ceramic bezel', 'Helium escape valve'] },
  { name: 'Tag Heuer Carrera Chronograph', brand: 'Tag Heuer', subcategory: 'Watches', basePrice: 4800, features: ['COSC chronometer', 'Heuer 02 movement', 'Sapphire crystal', 'Titanium case'] },
  { name: 'Audemars Piguet Royal Oak', brand: 'AP', subcategory: 'Watches', basePrice: 35000, features: ['Stainless steel', 'Calibre 4302', 'Tapisserie dial', 'Integrated bracelet'] },
  { name: 'Louis Vuitton Neverfull MM', brand: 'Louis Vuitton', subcategory: 'Handbags', basePrice: 1950, features: ['Monogram canvas', 'Leather trim', 'Interior zip pocket', 'Jacquard lining'] },
  { name: 'Chanel Classic Flap Medium', brand: 'Chanel', subcategory: 'Handbags', basePrice: 9800, features: ['Lambskin leather', 'Gold hardware', 'CC turn-lock', 'Quilted pattern'] },
  { name: 'Hermès Birkin 30', brand: 'Hermès', subcategory: 'Handbags', basePrice: 22000, features: ['Togo leather', 'Palladium hardware', 'Handcrafted', 'Certificate of authenticity'] },
  { name: 'Gucci Ophidia GG Tote', brand: 'Gucci', subcategory: 'Handbags', basePrice: 1450, features: ['GG Supreme canvas', 'Leather trim', 'Double handles', 'Gold-toned hardware'] },
  { name: 'Prada Galleria Saffiano', brand: 'Prada', subcategory: 'Handbags', basePrice: 3200, features: ['Saffiano leather', 'Triangle logo', 'Double zip', 'Detachable strap'] },
  { name: 'Christian Louboutin So Kate 120', brand: 'Louboutin', subcategory: 'Shoes', basePrice: 795, features: ['Patent leather', '120mm heel', 'Red sole', 'Pointed toe'] },
  { name: 'Gucci Horsebit Loafer', brand: 'Gucci', subcategory: 'Shoes', basePrice: 890, features: ['Leather upper', 'Horsebit hardware', 'Leather sole', 'Made in Italy'] },
  { name: 'Bottega Veneta Lido Sandal', brand: 'Bottega Veneta', subcategory: 'Shoes', basePrice: 1100, features: ['Intrecciato weave', 'Leather sole', 'Block heel', 'Adjustable strap'] },
  { name: 'Tom Ford Tobacco Oud', brand: 'Tom Ford', subcategory: 'Fragrances', basePrice: 380, features: ['50ml EDP', 'Oud wood', 'Tobacco essence', 'Oriental fragrance'] },
  { name: 'Creed Aventus', brand: 'Creed', subcategory: 'Fragrances', basePrice: 495, features: ['100ml EDP', 'Blackcurrant top note', 'Birch base', 'Iconic masculine scent'] },
  { name: 'Amouage Interlude Man', brand: 'Amouage', subcategory: 'Fragrances', basePrice: 420, features: ['100ml EDP', 'Oud & amber', 'Incense accord', 'Middle Eastern luxury'] },
  { name: 'La Mer Moisturizing Cream', brand: 'La Mer', subcategory: 'Skincare', basePrice: 345, features: ['60ml jar', 'Miracle Broth', 'Regenerating formula', 'Clinically proven'] },
  { name: 'Sisley Paris Black Rose Cream', brand: 'Sisley', subcategory: 'Skincare', basePrice: 375, features: ['50ml', 'Black rose extract', 'Anti-aging', 'Plumping effect'] },
  { name: 'Tiffany & Co. Diamond Pendant', brand: 'Tiffany', subcategory: 'Jewelry', basePrice: 2800, features: ['18k white gold', '0.25ct diamond', 'GIA certified', 'Tiffany box'] },
  { name: 'Cartier Love Bracelet', brand: 'Cartier', subcategory: 'Jewelry', basePrice: 6900, features: ['18k yellow gold', 'Screw motif', 'Signature design', 'Certificate'] },
  { name: 'Bulgari Serpenti Necklace', brand: 'Bulgari', subcategory: 'Jewelry', basePrice: 4500, features: ['18k rose gold', 'Diamond pavé', 'Serpenti motif', 'Certificate'] },
  { name: 'Bottega Veneta Cassette Bag', brand: 'Bottega Veneta', subcategory: 'Handbags', basePrice: 3100, features: ['Intrecciato leather', 'Padded weave', 'Removable strap', 'Magnetic closure'] },
  { name: 'Balenciaga Triple S Sneaker', brand: 'Balenciaga', subcategory: 'Shoes', basePrice: 1050, features: ['Chunky sole', 'Mesh upper', 'Triple branding', 'Size 35-47'] },
  { name: 'Alexander McQueen Oversized', brand: 'McQueen', subcategory: 'Shoes', basePrice: 590, features: ['Leather upper', 'Platform sole', 'Embossed logo', 'Made in Italy'] },
  { name: 'Versace Medusa Sunglasses', brand: 'Versace', subcategory: 'Accessories', basePrice: 330, features: ['Acetate frame', 'Medusa logo', 'UV400 protection', 'Case included'] },
  { name: 'Dior B27 High Sneaker', brand: 'Dior', subcategory: 'Shoes', basePrice: 1150, features: ['Calfskin & canvas', 'CD signature', 'Rubber sole', 'Padded ankle'] },
  { name: 'Fendi Baguette', brand: 'Fendi', subcategory: 'Handbags', basePrice: 3800, features: ['FF logo jacquard', 'Satin finish', 'Magnetic closure', 'Chain strap'] },
  { name: 'Moncler Maya Jacket', brand: 'Moncler', subcategory: 'Clothing', basePrice: 1200, features: ['Down fill', 'Nylon shell', 'Logo patch', 'Packable'] },
  { name: 'Canada Goose Expedition Parka', brand: 'Canada Goose', subcategory: 'Clothing', basePrice: 1095, features: ['Arctic-tech shell', 'Coyote fur trim', '625 fill power', 'Recco reflector'] },
  { name: 'Stone Island Crewneck', brand: 'Stone Island', subcategory: 'Clothing', basePrice: 425, features: ['Garment dyed', 'Compass badge', 'Cotton fleece', 'Relaxed fit'] },
];

const essentialsProducts = [
  { name: 'Instant Pot Duo 7-in-1', brand: 'Instant Pot', subcategory: 'Kitchen', basePrice: 99, features: ['7 functions', '6-quart capacity', 'Smart programs', '1000W'] },
  { name: 'Nespresso Vertuo Next', brand: 'Nespresso', subcategory: 'Kitchen', basePrice: 179, features: ['Centrifusion tech', '5 cup sizes', 'Wi-Fi connected', 'Recycling program'] },
  { name: 'KitchenAid Stand Mixer', brand: 'KitchenAid', subcategory: 'Kitchen', basePrice: 449, features: ['5-quart bowl', '10 speeds', '59 attachments', 'Tilt-head design'] },
  { name: 'Vitamix E310 Blender', brand: 'Vitamix', subcategory: 'Kitchen', basePrice: 349, features: ['48oz container', 'Variable speed', 'Self-cleaning', '5-year warranty'] },
  { name: 'Tefal Air Fryer XXL', brand: 'Tefal', subcategory: 'Kitchen', basePrice: 199, features: ['6.2L capacity', 'Digital display', '8 programs', '1700W'] },
  { name: 'Patagonia Better Sweater', brand: 'Patagonia', subcategory: 'Clothing', basePrice: 149, features: ['Recycled fleece', 'Fair Trade certified', 'Zip neck', 'Slim fit'] },
  { name: 'Levi\'s 501 Original Jeans', brand: 'Levi\'s', subcategory: 'Clothing', basePrice: 98, features: ['100% cotton', 'Button fly', 'Straight fit', 'Iconic cut'] },
  { name: 'Nike Air Max 270', brand: 'Nike', subcategory: 'Shoes', basePrice: 160, features: ['Max Air heel unit', 'Mesh upper', 'Foam midsole', 'Rubber outsole'] },
  { name: 'Adidas Ultraboost 23', brand: 'Adidas', subcategory: 'Shoes', basePrice: 190, features: ['Boost midsole', 'Primeknit+ upper', 'Continental rubber', 'Linear Energy Push'] },
  { name: 'The North Face Backpack 30L', brand: 'The North Face', subcategory: 'Bags', basePrice: 129, features: ['30L capacity', 'Laptop compartment', 'Hydration sleeve', 'FlexVent suspension'] },
  { name: 'Hydro Flask 32oz Wide Mouth', brand: 'Hydro Flask', subcategory: 'Accessories', basePrice: 49, features: ['TempShield insulation', 'Stainless steel', '24hr cold / 12hr hot', 'Flex Cap'] },
  { name: 'Moleskine Classic Notebook', brand: 'Moleskine', subcategory: 'Stationery', basePrice: 29, features: ['240 pages', 'Acid-free paper', 'Ribbon bookmark', 'Elastic closure'] },
  { name: 'Oral-B iO Series 9', brand: 'Oral-B', subcategory: 'Personal Care', basePrice: 249, features: ['AI motion control', '7 cleaning modes', 'Color display', 'Pressure sensor'] },
  { name: 'Philips Sonicare DiamondClean', brand: 'Philips', subcategory: 'Personal Care', basePrice: 199, features: ['Sonic technology', '5 modes', 'Smart timer', 'Premium glass charger'] },
  { name: 'Gillette Fusion ProGlide', brand: 'Gillette', subcategory: 'Personal Care', basePrice: 49, features: ['5-blade system', 'Precision trimmer', 'FlexBall technology', 'Lubrastrip'] },
  { name: 'Dove Body Wash Set', brand: 'Dove', subcategory: 'Personal Care', basePrice: 24, features: ['3-pack', 'Moisturizing formula', 'Sulfate-free', 'Dermatologist recommended'] },
  { name: 'L\'Oreal Revitalift Serum', brand: 'L\'Oreal', subcategory: 'Skincare', basePrice: 39, features: ['1.5% pure hyaluronic acid', 'Plumping effect', 'Dermatologist tested', '30ml'] },
  { name: 'Neutrogena Hydro Boost', brand: 'Neutrogena', subcategory: 'Skincare', basePrice: 22, features: ['Hyaluronic acid', 'Water gel formula', 'Non-comedogenic', 'Dermatologist recommended'] },
  { name: 'IKEA KALLAX Shelf Unit', brand: 'IKEA', subcategory: 'Furniture', basePrice: 149, features: ['77x147cm', 'Can be horizontal/vertical', 'Fits standard boxes', 'Easy assembly'] },
  { name: 'Tempur-Pedic TEMPUR-Cloud', brand: 'Tempur-Pedic', subcategory: 'Bedding', basePrice: 199, features: ['TEMPUR material', 'Removable cover', 'Washable', 'Pressure relief'] },
  { name: 'Casper Original Pillow', brand: 'Casper', subcategory: 'Bedding', basePrice: 89, features: ['Pillow-in-pillow', 'Adjustable firmness', 'Washable', 'CertiPUR-US'] },
  { name: 'Yankee Candle Large Jar', brand: 'Yankee Candle', subcategory: 'Home Decor', basePrice: 32, features: ['Large 22oz jar', '110-150hr burn time', 'Double wick', 'Fragrance oils'] },
  { name: 'Method All-Purpose Cleaner', brand: 'Method', subcategory: 'Cleaning', basePrice: 8, features: ['Plant-based formula', 'Biodegradable', 'Recyclable bottle', 'Fresh scents'] },
  { name: 'Tide PODS Laundry Detergent', brand: 'Tide', subcategory: 'Cleaning', basePrice: 28, features: ['81 count', 'HE compatible', '3-in-1 action', 'Pre-measured pods'] },
  { name: 'Bounty Paper Towels 12-pack', brand: 'Bounty', subcategory: 'Cleaning', basePrice: 22, features: ['2-ply', 'Quick-size sheets', 'Select-a-size', 'Strong & absorbent'] },
  { name: 'Purell Hand Sanitizer 12-pack', brand: 'Purell', subcategory: 'Health', basePrice: 36, features: ['8oz bottles', '70% ethyl alcohol', 'Kills 99.9% germs', 'Moisturizing formula'] },
  { name: 'Advil Dual Action 72ct', brand: 'Advil', subcategory: 'Health', basePrice: 19, features: ['Ibuprofen + acetaminophen', 'Dual action', 'Fast relief', 'Coated tablets'] },
  { name: 'Optimum Nutrition Gold Standard', brand: 'ON', subcategory: 'Nutrition', basePrice: 69, features: ['5lb container', '24g protein/serving', 'Whey isolate primary', 'Low sugar'] },
  { name: 'Clif Bar Variety Pack 16ct', brand: 'Clif', subcategory: 'Nutrition', basePrice: 29, features: ['16 bars', 'Organic oats', 'Plant-based protein', 'Non-GMO'] },
  { name: 'Tupperware 32-piece Set', brand: 'Tupperware', subcategory: 'Kitchen', basePrice: 89, features: ['BPA-free', 'Microwave safe', 'Dishwasher safe', 'Leak-proof lids'] },
];

const dealsProducts = [
  { name: 'Samsung Galaxy A54 5G', brand: 'Samsung', subcategory: 'Smartphones', basePrice: 349, originalPrice: 499, discount: 30, features: ['50MP camera', '5000mAh', 'IP67', '6.4" AMOLED'] },
  { name: 'Lenovo IdeaPad 5 15"', brand: 'Lenovo', subcategory: 'Laptops', basePrice: 699, originalPrice: 999, discount: 30, features: ['AMD Ryzen 7', '16GB RAM', '512GB SSD', 'Full HD IPS'] },
  { name: 'JBL Flip 6 Speaker', brand: 'JBL', subcategory: 'Audio', basePrice: 89, originalPrice: 129, discount: 31, features: ['IP67 waterproof', '12hr battery', 'PartyBoost', 'USB-C'] },
  { name: 'Kindle Paperwhite 11th Gen', brand: 'Amazon', subcategory: 'Tablets', basePrice: 99, originalPrice: 139, discount: 29, features: ['6.8" display', 'Adjustable light', '10wk battery', 'IPX8'] },
  { name: 'Fitbit Charge 6', brand: 'Fitbit', subcategory: 'Smartwatches', basePrice: 99, originalPrice: 159, discount: 38, features: ['Built-in GPS', 'Google Maps', 'Heart rate', '7-day battery'] },
  { name: 'Anker Soundcore Life Q30', brand: 'Anker', subcategory: 'Headphones', basePrice: 59, originalPrice: 79, discount: 25, features: ['Hybrid ANC', '40hr battery', 'Hi-Res audio', 'Fast charge'] },
  { name: 'Xiaomi Mi Robot Vacuum', brand: 'Xiaomi', subcategory: 'Home', basePrice: 249, originalPrice: 349, discount: 29, features: ['2500Pa suction', 'LiDAR navigation', 'App control', 'Auto-empty'] },
  { name: 'TP-Link Deco AX3000', brand: 'TP-Link', subcategory: 'Networking', basePrice: 179, originalPrice: 249, discount: 28, features: ['Wi-Fi 6', 'Mesh system', '3-pack', 'Parental controls'] },
  { name: 'Razer BlackShark V2', brand: 'Razer', subcategory: 'Gaming', basePrice: 79, originalPrice: 99, discount: 20, features: ['THX 7.1 Spatial', '50mm drivers', 'Detachable mic', 'USB sound card'] },
  { name: 'Sony WF-1000XM4', brand: 'Sony', subcategory: 'Headphones', basePrice: 179, originalPrice: 279, discount: 36, features: ['Industry-best ANC', 'LDAC', '8hr battery', 'IPX4'] },
  { name: 'LG 27" IPS Monitor', brand: 'LG', subcategory: 'Monitors', basePrice: 229, originalPrice: 329, discount: 30, features: ['4K UHD', 'IPS panel', 'USB-C 60W', 'HDR400'] },
  { name: 'Instant Vortex Air Fryer 6QT', brand: 'Instant Pot', subcategory: 'Kitchen', basePrice: 69, originalPrice: 99, discount: 30, features: ['6QT capacity', '4-in-1', 'EvenCrisp tech', 'Digital display'] },
  { name: 'Bose SoundLink Flex', brand: 'Bose', subcategory: 'Audio', basePrice: 119, originalPrice: 149, discount: 20, features: ['IP67', '12hr battery', 'PositionIQ', 'Waterproof'] },
  { name: 'Microsoft Surface Go 3', brand: 'Microsoft', subcategory: 'Tablets', basePrice: 399, originalPrice: 549, discount: 27, features: ['Intel Core i3', '8GB RAM', '10.5" display', 'LTE option'] },
  { name: 'Garmin Venu 2 Plus', brand: 'Garmin', subcategory: 'Smartwatches', basePrice: 249, originalPrice: 349, discount: 29, features: ['AMOLED display', 'Voice calls', 'Health snapshot', 'GPS'] },
  { name: 'Dyson V8 Absolute', brand: 'Dyson', subcategory: 'Home', basePrice: 349, originalPrice: 499, discount: 30, features: ['40min runtime', 'HEPA filter', '115AW suction', 'Wall dock'] },
  { name: 'Philips Hue White Starter', brand: 'Philips', subcategory: 'Smart Home', basePrice: 79, originalPrice: 109, discount: 27, features: ['4 bulbs', 'Hue Bridge', 'Voice control', 'Scheduling'] },
  { name: 'iRobot Roomba 694', brand: 'iRobot', subcategory: 'Home', basePrice: 179, originalPrice: 274, discount: 35, features: ['Wi-Fi connected', 'Alexa compatible', 'Dirt detect', 'Edge-sweeping'] },
  { name: 'Canon PIXMA TR8620a', brand: 'Canon', subcategory: 'Office', basePrice: 149, originalPrice: 199, discount: 25, features: ['All-in-one', 'Wireless', 'Duplex printing', 'ADF'] },
  { name: 'SteelSeries Arctis Nova 7', brand: 'SteelSeries', subcategory: 'Gaming', basePrice: 149, originalPrice: 179, discount: 17, features: ['Wireless', '38hr battery', 'ClearCast Gen2 mic', 'Multi-system'] },
];

function generateProducts(
  items: Array<{name: string; brand: string; subcategory: string; basePrice: number; features: string[]; colors?: string[]; sizes?: string[]; originalPrice?: number; discount?: number}>,
  category: 'electronics' | 'luxury' | 'essentials' | 'deals',
  imageArray: string[],
  countryList: Country[]
): Product[] {
  const products: Product[] = [];
  const totalPerCountry = Math.ceil(1000 / countryList.length);

  countryList.forEach((country) => {
    const multiplier = 1 / country.exchangeRate;
    let itemIndex = 0;

    for (let i = 0; i < totalPerCountry && products.length < 1000; i++) {
      const item = items[itemIndex % items.length];
      const priceVariance = 0.9 + Math.random() * 0.3;
      const localPrice = Math.round(item.basePrice * multiplier * priceVariance);
      const imgIndex = Math.floor(Math.random() * imageArray.length);

      products.push({
        id: `${category}-${country.code}-${i}-${itemIndex}`,
        name: item.name,
        brand: item.brand,
        category,
        subcategory: item.subcategory,
        price: localPrice,
        originalPrice: item.originalPrice ? Math.round(item.originalPrice * multiplier) : undefined,
        currency: country.currency,
        currencySymbol: country.currencySymbol,
        countryCode: country.code,
        images: [
          imageArray[imgIndex],
          imageArray[(imgIndex + 1) % imageArray.length],
          imageArray[(imgIndex + 2) % imageArray.length],
        ],
        rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
        reviewCount: Math.floor(50 + Math.random() * 5000),
        inStock: Math.random() > 0.1,
        stockCount: Math.floor(5 + Math.random() * 200),
        description: `Premium ${item.name} by ${item.brand}. ${item.features[0]}. Available exclusively on GlobalMart with free worldwide shipping.`,
        features: item.features,
        colors: item.colors || ['Default'],
        sizes: category === 'luxury' || category === 'essentials' ? ['XS', 'S', 'M', 'L', 'XL'] : undefined,
        badge: item.discount ? `${item.discount}% OFF` : i < 3 ? 'New' : undefined,
        isFeatured: i < 5,
        isNew: i < 3,
        discount: item.discount,
        weight: '0.5kg',
        brand_origin: country.name,
      });
      itemIndex++;
    }
  });

  return products;
}

export const ALL_PRODUCTS: {
  electronics: Product[];
  luxury: Product[];
  essentials: Product[];
  deals: Product[];
} = {
  electronics: generateProducts(electronicsProducts, 'electronics', electronicsImages, COUNTRIES),
  luxury: generateProducts(luxuryProducts, 'luxury', luxuryImages, COUNTRIES),
  essentials: generateProducts(essentialsProducts, 'essentials', essentialsImages, COUNTRIES),
  deals: generateProducts(dealsProducts, 'deals', dealsImages, COUNTRIES),
};

export function getProductsByCountry(countryCode: string, category: 'electronics' | 'luxury' | 'essentials' | 'deals'): Product[] {
  return ALL_PRODUCTS[category].filter(p => p.countryCode === countryCode).slice(0, 200);
}

export function getFeaturedProducts(countryCode: string): Product[] {
  const allCats: Array<'electronics' | 'luxury' | 'essentials' | 'deals'> = ['electronics', 'luxury', 'essentials', 'deals'];
  return allCats.flatMap(cat =>
    ALL_PRODUCTS[cat].filter(p => p.countryCode === countryCode && p.isFeatured).slice(0, 5)
  );
}

export function convertToUSD(price: number, exchangeRate: number): number {
  return parseFloat((price * exchangeRate).toFixed(2));
}

export function formatCurrency(amount: number, symbol: string): string {
  return `${symbol}${amount.toLocaleString()}`;
}