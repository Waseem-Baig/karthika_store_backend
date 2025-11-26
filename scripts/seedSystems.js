require("dotenv").config();
const mongoose = require("mongoose");
const System = require("../models/System");

const sampleSystems = [
  {
    name: "4 Camera 4K Complete Security System",
    price: 42999,
    mrp: 64999,
    rating: 4.7,
    reviews: 156,
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200",
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1200",
    ],
    features: [
      "4x 8MP 4K Bullet Cameras",
      "4 Channel PoE NVR",
      "2TB HDD Pre-installed",
      "4x 20m CAT6 Cables Included",
      "Night Vision up to 30m",
      "Mobile App Remote Access",
    ],
    specifications: {
      Cameras: "4x 8MP 4K IP Cameras",
      Recorder: "4CH PoE NVR",
      Storage: "2TB HDD",
      Resolution: "3840x2160 (4K)",
      "Night Vision": "30 meters",
      "Mobile App": "iOS & Android",
    },
    category: "complete-kit",
    cameras: 4,
    recorder: "4CH PoE NVR with 2TB HDD",
    badge: "Bestseller",
    inStock: true,
  },
  {
    name: "8 Camera HD Home Security Package",
    price: 34999,
    mrp: 52999,
    rating: 4.5,
    reviews: 203,
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1200",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200",
    ],
    features: [
      "8x 5MP HD Cameras",
      "8 Channel DVR",
      "1TB HDD Included",
      "8x 20m Coax Cables",
      "Weatherproof Cameras",
      "Email & Push Alerts",
    ],
    specifications: {
      Cameras: "8x 5MP HD-TVI Cameras",
      Recorder: "8CH DVR",
      Storage: "1TB HDD",
      Resolution: "2560x1920 (5MP)",
      "Cable Type": "RG59 Coax",
      Warranty: "2 Years",
    },
    category: "home",
    cameras: 8,
    recorder: "8CH DVR with 1TB HDD",
    badge: "Value",
    inStock: true,
  },
  {
    name: "16 Camera AI Business Security System",
    price: 89999,
    mrp: 129999,
    rating: 4.8,
    reviews: 98,
    images: [
      "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?q=80&w=1200",
      "https://images.unsplash.com/photo-1600267185393-e158a98703de?q=80&w=1200",
    ],
    features: [
      "16x AI Smart Cameras",
      "16 Channel AI NVR with 8 PoE",
      "4TB HDD Pre-installed",
      "Human & Vehicle Detection",
      "Smart Search & Playback",
      "16x 30m Network Cables",
    ],
    specifications: {
      Cameras: "16x 4MP AI IP Cameras",
      Recorder: "16CH AI NVR (8 PoE)",
      Storage: "4TB HDD",
      "AI Features": "Human/Vehicle Detection",
      "PoE Ports": "8 Built-in",
      "Extra Cameras": "8 via external PoE switch",
    },
    category: "business",
    cameras: 16,
    recorder: "16CH AI NVR with 4TB HDD",
    badge: "Professional",
    inStock: true,
  },
  {
    name: "6 Camera Wireless Home Kit",
    price: 38999,
    mrp: 54999,
    rating: 4.4,
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200",
    ],
    features: [
      "6x WiFi Cameras",
      "8 Channel NVR",
      "1TB HDD Included",
      "No Cable Installation Needed",
      "Two-Way Audio",
      "Cloud Storage Compatible",
    ],
    specifications: {
      Cameras: "6x 3MP WiFi Cameras",
      Recorder: "8CH WiFi NVR",
      Storage: "1TB HDD",
      Connection: "WiFi 2.4GHz",
      Audio: "Two-Way",
      Power: "Individual Adapters",
    },
    category: "home",
    cameras: 6,
    recorder: "8CH WiFi NVR with 1TB HDD",
    badge: "New",
    inStock: true,
  },
  {
    name: "32 Camera Enterprise System",
    price: 145999,
    mrp: 209999,
    rating: 4.9,
    reviews: 67,
    images: [
      "https://images.unsplash.com/photo-1600267185393-e158a98703de?q=80&w=1200",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200",
    ],
    features: [
      "32x 4K Professional Cameras",
      "32 Channel Enterprise NVR",
      "8TB RAID Storage",
      "16 PoE+ Ports Built-in",
      "Dual Gigabit NICs",
      "24/7 Recording",
    ],
    specifications: {
      Cameras: "32x 8MP 4K IP Cameras",
      Recorder: "32CH Enterprise NVR",
      Storage: "8TB RAID 5",
      "PoE Ports": "16 PoE+",
      RAID: "0/1/5/6/10",
      Network: "Dual Gigabit",
    },
    category: "enterprise",
    cameras: 32,
    recorder: "32CH NVR with 8TB RAID",
    badge: "Bestseller",
    inStock: true,
  },
  {
    name: "12 Camera Hybrid Security System",
    price: 56999,
    mrp: 82999,
    rating: 4.6,
    reviews: 142,
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1200",
    ],
    features: [
      "8x HD-CVI Cameras",
      "4x IP Cameras",
      "16 Channel Hybrid NVR/DVR",
      "2TB HDD Included",
      "Mix Analog & IP Cameras",
      "Flexible Expansion",
    ],
    specifications: {
      Cameras: "8x 5MP CVI + 4x 4MP IP",
      Recorder: "16CH Hybrid NVR/DVR",
      Storage: "2TB HDD",
      Compatibility: "Analog/AHD/CVI/TVI/IP",
      "Max Resolution": "5MP",
      Channels: "16 Total",
    },
    category: "camera-recorder-combo",
    cameras: 12,
    recorder: "16CH Hybrid with 2TB HDD",
    badge: "",
    inStock: true,
  },
];

const seedSystems = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");

    // Clear existing systems
    await System.deleteMany({});
    console.log("🗑️  Cleared existing systems");

    // Insert sample systems
    await System.insertMany(sampleSystems);
    console.log("✅ Sample systems inserted successfully");

    console.log(`📦 Inserted ${sampleSystems.length} systems`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding systems:", error);
    process.exit(1);
  }
};

seedSystems();
