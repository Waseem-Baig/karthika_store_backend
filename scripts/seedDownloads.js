const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Download = require("../models/Download");

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected for seeding downloads"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

const downloads = [
  {
    name: "Mobile App (Android)",
    description:
      "Official mobile app for Android devices to monitor your security system remotely",
    category: "mobile-app",
    fileUrl: "/uploads/karthika-security-android.apk",
    fileName: "karthika-security-android.apk",
    fileSize: "45 MB",
    fileType: "apk",
    isActive: true,
  },
  {
    name: "Mobile App (iOS)",
    description:
      "Official mobile app for iOS devices to monitor your security system remotely",
    category: "mobile-app",
    fileUrl: "/uploads/karthika-security-ios.ipa",
    fileName: "karthika-security-ios.ipa",
    fileSize: "38 MB",
    fileType: "ipa",
    isActive: true,
  },
  {
    name: "PC Client Software",
    description:
      "Desktop application for Windows and Mac to manage your security cameras",
    category: "pc-software",
    fileUrl: "/uploads/karthika-pc-client.exe",
    fileName: "karthika-pc-client.exe",
    fileSize: "120 MB",
    fileType: "exe",
    isActive: true,
  },
  {
    name: "Quick Start Guide",
    description:
      "Essential setup instructions to get your security system up and running quickly",
    category: "guide",
    fileUrl: "/uploads/quick-start-guide.pdf",
    fileName: "quick-start-guide.pdf",
    fileSize: "2 MB",
    fileType: "pdf",
    isActive: true,
  },
  {
    name: "IP Camera Manual",
    description:
      "Comprehensive manual for IP camera installation, configuration, and troubleshooting",
    category: "manual",
    fileUrl: "/uploads/ip-camera-manual.pdf",
    fileName: "ip-camera-manual.pdf",
    fileSize: "5 MB",
    fileType: "pdf",
    isActive: true,
  },
  {
    name: "NVR User Manual",
    description:
      "Complete guide for NVR setup, operation, and advanced features",
    category: "manual",
    fileUrl: "/uploads/nvr-user-manual.pdf",
    fileName: "nvr-user-manual.pdf",
    fileSize: "8 MB",
    fileType: "pdf",
    isActive: true,
  },
];

const seedDownloads = async () => {
  try {
    // Delete existing downloads
    await Download.deleteMany();
    console.log("Existing downloads deleted");

    // Insert new downloads
    await Download.insertMany(downloads);
    console.log("Downloads seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Error seeding downloads:", error);
    process.exit(1);
  }
};

seedDownloads();
