require("dotenv").config();
const mongoose = require("mongoose");
const Recorder = require("../models/Recorder");

const sampleRecorders = [
  {
    name: "8 Channel 4K NVR with PoE",
    price: 15999,
    mrp: 22999,
    rating: 4.6,
    reviews: 89,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200",
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1200",
    ],
    features: [
      "H.265+ Video Compression",
      "8 PoE Ports (802.3af)",
      "4K HDMI Output",
      "Mobile App Remote View",
      "Up to 8TB HDD Support",
    ],
    specifications: {
      "Video Input": "8 Channels",
      Resolution: "8MP (4K)",
      "Video Output": "HDMI & VGA",
      Network: "10/100/1000 Mbps",
      "PoE Ports": "8",
      "Max HDD": "1 x 8TB",
      Power: "48V 2A",
    },
    brand: "Hikvision",
    channels: 8,
    storageCapacity: "8TB",
    badge: "Bestseller",
    inStock: true,
  },
  {
    name: "16 Channel AI NVR with 2TB HDD",
    price: 32999,
    mrp: 45999,
    rating: 4.7,
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1200",
      "https://images.unsplash.com/photo-1600267185393-e158a98703de?q=80&w=1200",
    ],
    features: [
      "AI Human & Vehicle Detection",
      "16 PoE Ports",
      "Smart Search & Playback",
      "Face Detection",
      "2TB Pre-installed HDD",
    ],
    specifications: {
      "Video Input": "16 Channels",
      Resolution: "8MP (4K)",
      "AI Features": "Human/Vehicle/Face Detection",
      "PoE Ports": "16",
      Storage: "2TB Pre-installed",
      "Max HDD": "2 x 10TB",
      Network: "Gigabit Ethernet",
    },
    brand: "Dahua",
    channels: 16,
    storageCapacity: "2TB (up to 20TB)",
    badge: "New",
    inStock: true,
  },
  {
    name: "4 Channel HD DVR 1080p",
    price: 5999,
    mrp: 8999,
    rating: 4.3,
    reviews: 67,
    images: [
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1200",
    ],
    features: [
      "1080P HD Recording",
      "H.265 Compression",
      "Supports Analog & HD Cameras",
      "Mobile Surveillance",
      "Easy Installation",
    ],
    specifications: {
      "Video Input": "4 Channels",
      Resolution: "1080P",
      "Video Compression": "H.265",
      "Video Output": "HDMI & VGA",
      "Max HDD": "1 x 6TB",
      "Remote Access": "Mobile & Web",
    },
    brand: "CP Plus",
    channels: 4,
    storageCapacity: "6TB",
    badge: "",
    inStock: true,
  },
  {
    name: "32 Channel Enterprise NVR",
    price: 65999,
    mrp: 89999,
    rating: 4.8,
    reviews: 156,
    images: [
      "https://images.unsplash.com/photo-1600267185393-e158a98703de?q=80&w=1200",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200",
    ],
    features: [
      "32 Channel 4K Recording",
      "16 PoE+ Ports",
      "RAID 0/1/5/6 Support",
      "Dual Gigabit NICs",
      "Hot-Swappable HDD Bays",
    ],
    specifications: {
      "Video Input": "32 Channels",
      Resolution: "12MP",
      "PoE Ports": "16 (PoE+)",
      RAID: "0/1/5/6/10",
      "Max Storage": "4 x 10TB (40TB)",
      Network: "Dual Gigabit",
      "Video Output": "2x HDMI, 2x VGA",
    },
    brand: "Hikvision",
    channels: 32,
    storageCapacity: "40TB",
    badge: "Bestseller",
    inStock: true,
  },
  {
    name: "8 Channel Hybrid DVR/NVR",
    price: 12999,
    mrp: 17999,
    rating: 4.5,
    reviews: 92,
    images: [
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1200",
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1200",
    ],
    features: [
      "Supports Analog + IP Cameras",
      "5MP Recording",
      "H.265+ Compression",
      "Cloud Storage Compatible",
      "P2P Remote Access",
    ],
    specifications: {
      "Video Input": "8 Channels (Hybrid)",
      Resolution: "5MP",
      "Camera Support": "Analog/AHD/TVI/CVI/IP",
      "Max HDD": "1 x 8TB",
      "Video Output": "HDMI 4K",
      "Mobile App": "iOS & Android",
    },
    brand: "Dahua",
    channels: 8,
    storageCapacity: "8TB",
    badge: "",
    inStock: true,
  },
  {
    name: "64 Channel Enterprise NVR with RAID",
    price: 125999,
    mrp: 175999,
    rating: 4.9,
    reviews: 78,
    images: [
      "https://images.unsplash.com/photo-1600267185393-e158a98703de?q=80&w=1200",
    ],
    features: [
      "64 Channel 4K Recording",
      "Supports up to 12MP Cameras",
      "RAID 5/6 for Data Security",
      "8 Hot-Swappable HDD Bays",
      "Redundant Power Supply",
    ],
    specifications: {
      "Video Input": "64 Channels",
      Resolution: "12MP",
      "Max Storage": "8 x 10TB (80TB)",
      RAID: "0/1/5/6/10",
      Network: "Dual 10GbE",
      "Video Output": "4K x 2 HDMI",
      Power: "Redundant PSU",
    },
    brand: "Hikvision",
    channels: 64,
    storageCapacity: "80TB",
    badge: "New",
    inStock: true,
  },
  {
    name: "16 Channel Tribrid DVR",
    price: 18999,
    mrp: 26999,
    rating: 4.4,
    reviews: 54,
    images: [
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1200",
    ],
    features: [
      "Supports 3 Camera Types",
      "5MP Max Resolution",
      "Smart Motion Detection",
      "USB Backup",
      "Email Alerts",
    ],
    specifications: {
      "Video Input": "16 Channels",
      "Camera Support": "Analog/HD-CVI/IP",
      Resolution: "5MP",
      "Max HDD": "2 x 8TB",
      "Recording Mode": "Manual/Schedule/Motion",
      Playback: "16 Channel Sync",
    },
    brand: "CP Plus",
    channels: 16,
    storageCapacity: "16TB",
    badge: "",
    inStock: true,
  },
];

const seedRecorders = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");

    // Clear existing recorders
    await Recorder.deleteMany({});
    console.log("🗑️  Cleared existing recorders");

    // Insert sample recorders
    await Recorder.insertMany(sampleRecorders);
    console.log("✅ Sample recorders inserted successfully");

    console.log(`📦 Inserted ${sampleRecorders.length} recorders`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding recorders:", error);
    process.exit(1);
  }
};

seedRecorders();
