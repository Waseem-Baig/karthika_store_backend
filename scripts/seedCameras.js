require("dotenv").config();
const mongoose = require("mongoose");
const Camera = require("../models/Camera");

const cameras = [
  {
    name: "4K Ultra HD IP Bullet Camera",
    price: 12999,
    mrp: 18999,
    rating: 4.8,
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?q=80&w=1200",
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1200",
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200",
    ],
    features: [
      "8MP Resolution",
      "30m IR Night Vision",
      "PoE Powered",
      "IP67 Weather Proof",
    ],
    badge: "Bestseller",
    description:
      "Professional grade 4K Ultra HD IP bullet camera with advanced night vision and weather protection. Perfect for outdoor surveillance with crystal clear 8MP resolution.",
    specifications: {
      "Image Sensor": '1/2.8" 8MP CMOS',
      Resolution: "3840 × 2160",
      Lens: "2.8mm-12mm Motorized Varifocal",
      "IR Distance": "Up to 30 meters",
      Power: "PoE (802.3af), DC 12V",
      "Operating Temperature": "-30°C to 60°C",
      Protection: "IP67",
      "Video Compression": "H.265+/H.265/H.264+/H.264",
    },
    inStock: true,
    warranty: "2 Years",
    category: "bullet",
  },
  {
    name: "4MP AI Dome Camera",
    price: 8999,
    mrp: 12999,
    rating: 4.6,
    reviews: 89,
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1200",
      "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?q=80&w=1200",
    ],
    features: [
      "4MP Resolution",
      "AI Human Detection",
      "Smart IR",
      "Vandal Proof",
    ],
    badge: "AI",
    description:
      "AI-powered dome camera with intelligent human detection and smart tracking capabilities. Ideal for indoor and outdoor surveillance with vandal-proof design.",
    specifications: {
      "Image Sensor": '1/3" 4MP CMOS',
      Resolution: "2560 × 1440",
      Lens: "2.8mm Fixed",
      "IR Distance": "Up to 20 meters",
      Power: "PoE (802.3af), DC 12V",
      "Operating Temperature": "-20°C to 50°C",
      Protection: "IP66, IK10",
      "Video Compression": "H.265/H.264",
    },
    inStock: true,
    warranty: "2 Years",
    category: "dome",
  },
  {
    name: "5MP PTZ IP Camera",
    price: 24999,
    mrp: 32999,
    rating: 4.9,
    reviews: 67,
    images: [
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=1200",
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1200",
    ],
    features: [
      "5MP Resolution",
      "20x Optical Zoom",
      "360° Pan/Tilt",
      "100m IR Range",
    ],
    badge: "Premium",
    description:
      "Premium PTZ camera with powerful 20x optical zoom and 360-degree coverage. Perfect for large area monitoring with exceptional zoom capabilities.",
    specifications: {
      "Image Sensor": '1/2.8" 5MP CMOS',
      Resolution: "2592 × 1944",
      Lens: "5.3mm-106mm, 20x Optical Zoom",
      "IR Distance": "Up to 100 meters",
      Power: "PoE+ (802.3at), DC 24V",
      "Operating Temperature": "-30°C to 65°C",
      Protection: "IP66",
      "Pan/Tilt Range": "Pan: 360°, Tilt: -15° to 90°",
    },
    inStock: true,
    warranty: "3 Years",
    category: "ptz",
  },
  {
    name: "2MP HD Bullet Camera",
    price: 4999,
    mrp: 7999,
    rating: 4.5,
    reviews: 203,
    images: [
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1200",
      "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?q=80&w=1200",
    ],
    features: [
      "1080p Full HD",
      "20m Night Vision",
      "Weather Resistant",
      "Easy Install",
    ],
    badge: "Budget",
    description:
      "Affordable 1080p Full HD bullet camera perfect for home and small business security. Easy to install with reliable performance.",
    specifications: {
      "Image Sensor": '1/2.9" 2MP CMOS',
      Resolution: "1920 × 1080",
      Lens: "3.6mm Fixed",
      "IR Distance": "Up to 20 meters",
      Power: "DC 12V",
      "Operating Temperature": "-10°C to 50°C",
      Protection: "IP66",
      "Video Compression": "H.264",
    },
    inStock: true,
    warranty: "1 Year",
    category: "bullet",
  },
  {
    name: "4K Fisheye 360° Camera",
    price: 18999,
    mrp: 24999,
    rating: 4.7,
    reviews: 45,
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200",
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1200",
    ],
    features: ["8MP 360° View", "Dewarping Support", "PoE", "Audio In/Out"],
    badge: "New",
    description:
      "Revolutionary 360-degree fisheye camera providing complete panoramic surveillance. Eliminate blind spots with intelligent dewarping technology.",
    specifications: {
      "Image Sensor": '1/2.3" 8MP CMOS',
      Resolution: "3840 × 2160",
      Lens: "1.05mm Fisheye",
      "IR Distance": "Up to 15 meters",
      Power: "PoE (802.3af)",
      "Operating Temperature": "-20°C to 50°C",
      Protection: "IP67",
      Audio: "Built-in mic, Audio in/out",
    },
    inStock: true,
    warranty: "2 Years",
    category: "fisheye",
  },
  {
    name: "4MP Outdoor Dome Camera",
    price: 7999,
    mrp: 11999,
    rating: 4.6,
    reviews: 156,
    images: [
      "https://images.unsplash.com/photo-1567443024551-f3e3cc2be870?q=80&w=1200",
      "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?q=80&w=1200",
    ],
    features: ["4MP HD", "Smart Motion", "WDR", "Metal Housing"],
    badge: "Popular",
    description:
      "Popular outdoor dome camera with smart motion detection and wide dynamic range. Built with durable metal housing for long-lasting performance.",
    specifications: {
      "Image Sensor": '1/3" 4MP CMOS',
      Resolution: "2560 × 1440",
      Lens: "2.8mm Fixed",
      "IR Distance": "Up to 25 meters",
      Power: "PoE (802.3af), DC 12V",
      "Operating Temperature": "-30°C to 60°C",
      Protection: "IP67",
      WDR: "120dB",
    },
    inStock: true,
    warranty: "2 Years",
    category: "dome",
  },
];

const seedCameras = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected successfully");

    // Clear existing cameras
    await Camera.deleteMany({});
    console.log("🗑️  Cleared existing cameras");

    // Insert cameras
    const createdCameras = await Camera.insertMany(cameras);
    console.log(`✅ ${createdCameras.length} cameras created successfully`);

    console.log("\n📦 Camera IDs:");
    createdCameras.forEach((camera, index) => {
      console.log(`${index + 1}. ${camera.name} - ID: ${camera._id}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding cameras:", error);
    process.exit(1);
  }
};

seedCameras();
