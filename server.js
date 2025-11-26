require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
); // Security headers
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:8080",
      "http://localhost:3000",
      process.env.CLIENT_URL,
    ].filter(Boolean),
    credentials: true, // Allow cookies to be sent
  })
); // Enable CORS
app.use(morgan("dev")); // Logging
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Parse cookies

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Basic Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Karthika Secure Shop API",
    status: "running",
    version: "1.0.0",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Import routes here
const authRoutes = require("./routes/auth");
const cameraRoutes = require("./routes/cameras");
const recorderRoutes = require("./routes/recorders");
const systemRoutes = require("./routes/systems");
const solutionRoutes = require("./routes/solutions");
const cableRoutes = require("./routes/cableRoutes");
const networkingRoutes = require("./routes/networkingRoutes");
const storageRoutes = require("./routes/storageRoutes");
const cartRoutes = require("./routes/cartRoutes");
const installationRequestRoutes = require("./routes/installationRequests");
const quoteRequestRoutes = require("./routes/quoteRequests");
const uploadRoutes = require("./routes/upload");

// Use routes here
app.use("/api/auth", authRoutes);
app.use("/api/cameras", cameraRoutes);
app.use("/api/recorders", recorderRoutes);
app.use("/api/systems", systemRoutes);
app.use("/api/solutions", solutionRoutes);
app.use("/api/cables", cableRoutes);
app.use("/api/networking", networkingRoutes);
app.use("/api/storage", storageRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/installation-requests", installationRequestRoutes);
app.use("/api/quote-requests", quoteRequestRoutes);
app.use("/api/upload", uploadRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;
