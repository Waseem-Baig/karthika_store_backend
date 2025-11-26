const mongoose = require("mongoose");
require("dotenv").config();
const Cable = require("./models/Cable");

const cables = [
  {
    name: "RG59 Coaxial Cable (100m)",
    description:
      "Professional grade coaxial cable for analog CCTV cameras. 75 Ohm impedance, copper conductor with aluminum foil shield.",
    price: 2499,
    mrp: 3499,
    images: [],
    features: [
      "100 meter roll",
      "Pure copper conductor",
      "UV resistant outer jacket",
      "75 Ohm impedance",
      "Fire retardant PVC",
    ],
    badge: "bestseller",
    category: "coaxial",
    specifications: {
      length: "100m",
      conductor: "Copper",
      gauge: "20 AWG",
      resistance: "75 Ohm",
      quantity: "1 Roll",
    },
    inStock: true,
    rating: 4.7,
    reviews: 85,
  },
  {
    name: "Cat6 Ethernet Cable (305m)",
    description:
      "High-speed network cable for IP cameras and PoE systems. 550MHz bandwidth, unshielded twisted pair.",
    price: 4999,
    mrp: 6999,
    images: [],
    features: [
      "305 meter box",
      "23 AWG solid copper",
      "550MHz bandwidth",
      "Supports PoE/PoE+",
      "Weather resistant",
    ],
    badge: "bestseller",
    category: "ethernet",
    specifications: {
      length: "305m",
      conductor: "Solid Copper",
      gauge: "23 AWG",
      resistance: "100 Ohm",
      quantity: "1 Box",
    },
    inStock: true,
    rating: 4.8,
    reviews: 120,
  },
  {
    name: "DC Power Cable 2-Core (100m)",
    description:
      "Power supply cable for CCTV cameras. 2-core stranded copper wire for 12V DC power distribution.",
    price: 1899,
    mrp: 2499,
    images: [],
    features: [
      "100 meter roll",
      "2-core stranded copper",
      "Fire retardant jacket",
      "Flexible design",
      "Indoor/outdoor use",
    ],
    badge: "",
    category: "power",
    specifications: {
      length: "100m",
      conductor: "Stranded Copper",
      gauge: "18 AWG",
      resistance: "N/A",
      quantity: "1 Roll",
    },
    inStock: true,
    rating: 4.6,
    reviews: 64,
  },
  {
    name: "BNC Connectors Pack (50pcs)",
    description:
      "Professional BNC connectors for coaxial cables. Brass construction with nickel plating, easy crimp design.",
    price: 599,
    mrp: 899,
    images: [],
    features: [
      "50 pieces per pack",
      "Brass construction",
      "Nickel plated",
      "Easy crimp installation",
      "Male connectors",
    ],
    badge: "new",
    category: "connectors",
    specifications: {
      length: "N/A",
      conductor: "Brass",
      gauge: "RG59/RG6",
      resistance: "75 Ohm",
      quantity: "50 pieces",
    },
    inStock: true,
    rating: 4.5,
    reviews: 45,
  },
  {
    name: "RJ45 Connectors Pack (100pcs)",
    description:
      "Cat6 RJ45 connectors with strain relief boots. Gold plated contacts for better signal transmission.",
    price: 499,
    mrp: 799,
    images: [],
    features: [
      "100 pieces per pack",
      "Gold plated contacts",
      "Includes boots",
      "8P8C configuration",
      "Clear body design",
    ],
    badge: "",
    category: "connectors",
    specifications: {
      length: "N/A",
      conductor: "Gold Plated",
      gauge: "Cat6",
      resistance: "N/A",
      quantity: "100 pieces",
    },
    inStock: true,
    rating: 4.7,
    reviews: 92,
  },
  {
    name: "Cable Tester Multifunctional",
    description:
      "Professional cable tester for network and coaxial cables. Tests RJ45, RJ11, and BNC connections with LED indicators.",
    price: 1299,
    mrp: 1999,
    images: [],
    features: [
      "Tests RJ45/RJ11/BNC",
      "LED indicators",
      "Battery included",
      "Compact design",
      "Continuity testing",
    ],
    badge: "",
    category: "tools",
    specifications: {
      length: "N/A",
      conductor: "N/A",
      gauge: "N/A",
      resistance: "N/A",
      quantity: "1 Unit",
    },
    inStock: true,
    rating: 4.4,
    reviews: 38,
  },
  {
    name: "Cat5e Ethernet Cable (305m)",
    description:
      "Cost-effective network cable for IP cameras. 350MHz bandwidth, suitable for most CCTV applications.",
    price: 3999,
    mrp: 5499,
    images: [],
    features: [
      "305 meter box",
      "24 AWG copper",
      "350MHz bandwidth",
      "PoE compatible",
      "Indoor/outdoor rated",
    ],
    badge: "",
    category: "ethernet",
    specifications: {
      length: "305m",
      conductor: "Solid Copper",
      gauge: "24 AWG",
      resistance: "100 Ohm",
      quantity: "1 Box",
    },
    inStock: true,
    rating: 4.5,
    reviews: 75,
  },
  {
    name: "Crimping Tool Professional",
    description:
      "Heavy-duty crimping tool for RJ45, RJ11, and coaxial connectors. Ratcheting mechanism for perfect crimps.",
    price: 899,
    mrp: 1499,
    images: [],
    features: [
      "Multi-function tool",
      "Ratcheting mechanism",
      "Ergonomic grip",
      "Hardened steel jaws",
      "Cable cutter included",
    ],
    badge: "",
    category: "tools",
    specifications: {
      length: "N/A",
      conductor: "N/A",
      gauge: "N/A",
      resistance: "N/A",
      quantity: "1 Tool",
    },
    inStock: true,
    rating: 4.6,
    reviews: 52,
  },
  {
    name: "Cable Management Box",
    description:
      "Cable organizer box for hiding excess cables and power strips. Ventilated design with multiple entry points.",
    price: 699,
    mrp: 999,
    images: [],
    features: [
      "Large capacity",
      "Ventilated design",
      "Multiple cable entries",
      "Flame retardant material",
      "Wall mountable",
    ],
    badge: "new",
    category: "accessories",
    specifications: {
      length: "40cm x 15cm x 13cm",
      conductor: "N/A",
      gauge: "N/A",
      resistance: "N/A",
      quantity: "1 Box",
    },
    inStock: true,
    rating: 4.3,
    reviews: 28,
  },
  {
    name: "F-Type Connectors Pack (50pcs)",
    description:
      "F-type screw-on connectors for RG6 coaxial cable. Zinc alloy construction for outdoor durability.",
    price: 449,
    mrp: 699,
    images: [],
    features: [
      "50 pieces per pack",
      "Zinc alloy body",
      "Screw-on design",
      "Weather resistant",
      "RG6 compatible",
    ],
    badge: "",
    category: "connectors",
    specifications: {
      length: "N/A",
      conductor: "Zinc Alloy",
      gauge: "RG6",
      resistance: "75 Ohm",
      quantity: "50 pieces",
    },
    inStock: true,
    rating: 4.5,
    reviews: 41,
  },
];

async function seedCables() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing cables
    await Cable.deleteMany({});
    console.log("🗑️  Cleared existing cables");

    // Insert new cables
    const result = await Cable.insertMany(cables);
    console.log(`✅ Successfully seeded ${result.length} cables`);

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding cables:", error);
    process.exit(1);
  }
}

seedCables();
