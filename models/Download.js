const mongoose = require("mongoose");

const downloadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a download name"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: ["mobile-app", "pc-software", "manual", "firmware", "guide", "other"],
    default: "other",
  },
  fileUrl: {
    type: String,
    required: [true, "Please provide a file URL"],
  },
  fileName: {
    type: String,
    required: true,
  },
  fileSize: {
    type: String,
    required: [true, "Please provide file size"],
  },
  fileType: {
    type: String, // pdf, apk, exe, zip, etc.
  },
  downloadCount: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp on save
downloadSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Download", downloadSchema);
