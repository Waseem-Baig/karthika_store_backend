require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@karthika.com" });

    if (existingAdmin) {
      console.log("⚠️  Admin user already exists");
      console.log("Email:", existingAdmin.email);
      console.log("Role:", existingAdmin.role);
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      fullName: "Admin",
      email: "admin@karthika.com",
      phone: "+91 9999999999",
      password: "admin@123",
      role: "admin",
    });

    console.log("✅ Admin user created successfully!");
    console.log("Email:", admin.email);
    console.log("Password: admin@123");
    console.log("Role:", admin.role);
    console.log("\n🔐 You can now login with these credentials");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
    process.exit(1);
  }
};

createAdmin();
