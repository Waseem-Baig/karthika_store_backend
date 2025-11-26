require("dotenv").config();
const mongoose = require("mongoose");
const Solution = require("../models/Solution");

const solutions = [
  {
    name: "Home Security Package",
    description:
      "Protect your family with smart cameras, doorbell cameras, and 24/7 monitoring. Easy DIY installation or professional setup available.",
    features: [
      "4-8 Camera Systems",
      "Night Vision Technology",
      "Mobile Alerts & Notifications",
      "Cloud Storage Options",
    ],
    category: "home",
    targetAudience: "Homeowners and residential properties",
    recommendedCameras: "4-8 Cameras",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200",
    price: 45000,
    originalPrice: 55000,
    rating: 4.7,
    reviews: 324,
    inStock: true,
  },
  {
    name: "Small Business Security",
    description:
      "Affordable multi-camera systems for retail shops, offices, and restaurants. Monitor all areas with remote access from anywhere.",
    features: [
      "8-16 Camera Coverage",
      "PoE Network Systems",
      "Remote Viewing Access",
      "Local Recording Storage",
    ],
    category: "business",
    targetAudience: "Small business owners, retail shops, offices",
    recommendedCameras: "8-16 Cameras",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
    price: 89000,
    originalPrice: 110000,
    rating: 4.6,
    reviews: 198,
    inStock: true,
  },
  {
    name: "Warehouse & Factory Solution",
    description:
      "Large-scale surveillance for warehouses and manufacturing facilities. Wide-angle coverage, low-light performance, and AI analytics.",
    features: [
      "32+ Camera Systems",
      "PTZ Control Capabilities",
      "AI Motion Detection",
      "Perimeter Protection",
    ],
    category: "warehouse",
    targetAudience: "Warehouse managers, factory owners, logistics companies",
    recommendedCameras: "32+ Cameras",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200",
    price: 250000,
    originalPrice: 320000,
    rating: 4.8,
    reviews: 87,
    inStock: true,
  },
  {
    name: "Retail Store Surveillance",
    description:
      "Prevent theft and monitor customer flow with strategically placed cameras. POS integration and facial recognition available.",
    features: [
      "HD Camera Quality",
      "Analytics Dashboard",
      "People Counting System",
      "Heat Mapping Technology",
    ],
    category: "retail",
    targetAudience: "Retail store owners, shopping centers, malls",
    recommendedCameras: "12-24 Cameras",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200",
    price: 125000,
    originalPrice: 155000,
    rating: 4.5,
    reviews: 156,
    inStock: true,
  },
  {
    name: "Educational Institution Security",
    description:
      "Ensure student safety with comprehensive campus surveillance. Monitor entry/exit points, classrooms, hallways, and outdoor areas.",
    features: [
      "Multi-Building Coverage",
      "Access Control Integration",
      "Emergency Alert System",
      "Long-term Archive Storage",
    ],
    category: "education",
    targetAudience: "Schools, colleges, universities, educational campuses",
    recommendedCameras: "50+ Cameras",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200",
    price: 450000,
    originalPrice: 550000,
    rating: 4.9,
    reviews: 42,
    inStock: true,
  },
  {
    name: "Industrial Security System",
    description:
      "Ruggedized cameras for harsh industrial environments. Monitor production lines, ensure safety compliance, and protect valuable assets.",
    features: [
      "Explosion Proof Cameras",
      "Thermal Imaging Capability",
      "24/7 Continuous Recording",
      "System Integration Support",
    ],
    category: "industrial",
    targetAudience: "Industrial facilities, manufacturing plants, oil & gas",
    recommendedCameras: "40+ Cameras",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200",
    price: 380000,
    originalPrice: 475000,
    rating: 4.7,
    reviews: 61,
    inStock: true,
  },
];

const seedSolutions = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");

    // Clear existing solutions
    await Solution.deleteMany({});
    console.log("🗑️  Cleared existing solutions");

    // Insert sample solutions
    await Solution.insertMany(solutions);
    console.log("✅ Sample solutions inserted successfully");
    console.log(`📦 Inserted ${solutions.length} solutions`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding solutions:", error);
    process.exit(1);
  }
};

seedSolutions();
