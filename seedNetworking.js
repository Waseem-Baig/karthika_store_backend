const mongoose = require("mongoose");
const Networking = require("./models/Networking");
require("dotenv").config();

const networkingProducts = [
  {
    name: "8-Port PoE Switch (120W)",
    description:
      "Unmanaged PoE+ switch for small installations with 8 ports delivering up to 120W total power budget",
    price: 5999,
    mrp: 7999,
    rating: 4.7,
    reviews: 89,
    images: [],
    features: [
      "8× PoE+ ports (802.3af/at)",
      "120W total power budget",
      "Plug & play operation",
      "Metal housing for durability",
      "Desktop or wall-mountable",
      "LED indicators per port",
    ],
    badge: "bestseller",
    specifications: {
      ports: "8× 10/100/1000Mbps",
      powerBudget: "120W",
      poeStandard: "IEEE 802.3af/at",
      management: "Unmanaged",
      speed: "Gigabit",
      mounting: "Desktop/Wall",
    },
    inStock: true,
    brand: "Ubiquiti",
    category: "PoE Switch",
  },
  {
    name: "16-Port PoE Switch (250W)",
    description:
      "High-power PoE switch for medium installations with advanced power management",
    price: 12999,
    mrp: 16999,
    rating: 4.8,
    reviews: 67,
    images: [],
    features: [
      "16× PoE+ ports",
      "250W total power budget",
      "Gigabit Ethernet speed",
      "Fanless design for silent operation",
      "Port priority for power allocation",
      "Extend mode for 250m distance",
    ],
    badge: "",
    specifications: {
      ports: "16× 10/100/1000Mbps",
      powerBudget: "250W",
      poeStandard: "IEEE 802.3af/at",
      management: "Unmanaged",
      speed: "Gigabit",
      mounting: "Desktop/Rack",
    },
    inStock: true,
    brand: "Cisco",
    category: "PoE Switch",
  },
  {
    name: "24-Port PoE Switch (400W)",
    description:
      "Enterprise-grade managed PoE switch with VLAN support and advanced features",
    price: 24999,
    mrp: 32999,
    rating: 4.9,
    reviews: 45,
    images: [],
    features: [
      "24× PoE++ ports (802.3bt)",
      "400W total power budget",
      "Web-based management",
      "VLAN support for network segmentation",
      "QoS for traffic prioritization",
      "Rack mountable with ears included",
    ],
    badge: "featured",
    specifications: {
      ports: "24× 10/100/1000Mbps + 2× SFP",
      powerBudget: "400W",
      poeStandard: "IEEE 802.3af/at/bt",
      management: "Smart Managed",
      speed: "Gigabit",
      mounting: "19-inch Rack",
    },
    inStock: true,
    brand: "Netgear",
    category: "PoE Switch",
  },
  {
    name: "5-Port Desktop PoE Switch (60W)",
    description:
      "Compact PoE switch perfect for home or small office with plug & play setup",
    price: 3499,
    mrp: 4499,
    rating: 4.6,
    reviews: 123,
    images: [],
    features: [
      "5× PoE+ ports",
      "60W total power budget",
      "Compact desktop design",
      "Plug & play - no configuration",
      "Energy efficient",
      "Lifetime warranty",
    ],
    badge: "new",
    specifications: {
      ports: "5× 10/100/1000Mbps",
      powerBudget: "60W",
      poeStandard: "IEEE 802.3af/at",
      management: "Unmanaged",
      speed: "Gigabit",
      mounting: "Desktop",
    },
    inStock: true,
    brand: "Tenda",
    category: "PoE Switch",
  },
  {
    name: "PoE Injector Single Port (30W)",
    description:
      "Add PoE capability to non-PoE switches with this single port injector",
    price: 899,
    mrp: 1299,
    rating: 4.5,
    reviews: 156,
    images: [],
    features: [
      "30W PoE+ output",
      "Gigabit pass-through",
      "Compact design",
      "LED indicators",
      "Auto-detection of PoE devices",
      "Overcurrent protection",
    ],
    badge: "",
    specifications: {
      ports: "1× Data In, 1× PoE Out",
      powerBudget: "30W per port",
      poeStandard: "IEEE 802.3af/at",
      management: "N/A",
      speed: "Gigabit",
      mounting: "Desktop",
    },
    inStock: true,
    brand: "Ubiquiti",
    category: "Accessories",
  },
  {
    name: "PoE Extender (100m range)",
    description:
      "Extend PoE distance beyond standard 100m limit up to 200m total",
    price: 1599,
    mrp: 2199,
    rating: 4.7,
    reviews: 78,
    images: [],
    features: [
      "Extends range to 200m total",
      "PoE power pass-through",
      "No external power needed",
      "Weather-resistant housing",
      "Works with any PoE device",
      "Daisy-chainable for longer distances",
    ],
    badge: "",
    specifications: {
      ports: "1× Input, 1× Output",
      powerBudget: "25W pass-through",
      poeStandard: "IEEE 802.3af/at",
      management: "N/A",
      speed: "100Mbps",
      mounting: "Pole/Wall",
    },
    inStock: true,
    brand: "D-Link",
    category: "Accessories",
  },
  {
    name: "4-Port PoE Injector Hub (120W)",
    description:
      "Multi-port PoE injector hub to add PoE to existing non-PoE switches",
    price: 4299,
    mrp: 5999,
    rating: 4.6,
    reviews: 52,
    images: [],
    features: [
      "4× PoE+ outputs",
      "120W total power budget",
      "Supports 802.3af/at",
      "Compact rack-mountable design",
      "Individual port protection",
      "LED status per port",
    ],
    badge: "",
    specifications: {
      ports: "4× PoE Output",
      powerBudget: "120W total",
      poeStandard: "IEEE 802.3af/at",
      management: "N/A",
      speed: "Gigabit",
      mounting: "Rack/Desktop",
    },
    inStock: true,
    brand: "TRENDnet",
    category: "Accessories",
  },
  {
    name: "PoE Splitter (5V/12V)",
    description: "Convert PoE to separate power and data for non-PoE devices",
    price: 699,
    mrp: 999,
    rating: 4.4,
    reviews: 91,
    images: [],
    features: [
      "Converts PoE to DC power",
      "Multiple voltage outputs (5V/12V)",
      "Gigabit Ethernet",
      "Compact design",
      "Perfect for Raspberry Pi, IP phones",
      "IEEE 802.3af compatible",
    ],
    badge: "",
    specifications: {
      ports: "1× PoE In, 1× LAN Out + DC",
      powerBudget: "15W max output",
      poeStandard: "IEEE 802.3af",
      management: "N/A",
      speed: "Gigabit",
      mounting: "N/A",
    },
    inStock: true,
    brand: "TP-Link",
    category: "Accessories",
  },
  {
    name: "Outdoor PoE Switch 8-Port (150W)",
    description: "Industrial weatherproof PoE switch for outdoor installations",
    price: 14999,
    mrp: 19999,
    rating: 4.8,
    reviews: 34,
    images: [],
    features: [
      "8× PoE+ ports",
      "150W power budget",
      "IP67 weatherproof rating",
      "Extended temperature range (-40°C to 75°C)",
      "Surge protection",
      "DIN rail or pole mountable",
    ],
    badge: "new",
    specifications: {
      ports: "8× 10/100/1000Mbps",
      powerBudget: "150W",
      poeStandard: "IEEE 802.3af/at",
      management: "Unmanaged",
      speed: "Gigabit",
      mounting: "DIN Rail/Pole",
    },
    inStock: true,
    brand: "Hikvision",
    category: "PoE Switch",
  },
  {
    name: "PoE Tester & Detector",
    description:
      "Essential tool for testing and troubleshooting PoE connections",
    price: 1299,
    mrp: 1799,
    rating: 4.5,
    reviews: 67,
    images: [],
    features: [
      "Tests PoE voltage and power",
      "Detects 802.3af/at/bt",
      "Displays power wattage",
      "Cable continuity test",
      "Compact pocket size",
      "Essential for installers",
    ],
    badge: "",
    specifications: {
      ports: "RJ45 test port",
      powerBudget: "N/A (Testing only)",
      poeStandard: "802.3af/at/bt detection",
      management: "N/A",
      speed: "N/A",
      mounting: "N/A",
    },
    inStock: true,
    brand: "Klein Tools",
    category: "Accessories",
  },
];

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB Connected for seeding networking products...");

    // Clear existing networking products
    await Networking.deleteMany({});
    console.log("Cleared existing networking products");

    // Insert new networking products
    const result = await Networking.insertMany(networkingProducts);
    console.log(`Seeded ${result.length} networking products successfully`);

    process.exit(0);
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
