const mongoose = require("mongoose");

const InstallationRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    pincode: {
      type: String,
      required: [true, "Please add a PIN code"],
      trim: true,
    },
    cameras: {
      type: Number,
      min: [1, "Number of cameras must be at least 1"],
    },
    message: {
      type: String,
      maxlength: [1000, "Message cannot be more than 1000 characters"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "contacted", "scheduled", "completed", "cancelled"],
        message: "Please select a valid status",
      },
      default: "pending",
    },
    notes: {
      type: String,
      maxlength: [2000, "Notes cannot be more than 2000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "InstallationRequest",
  InstallationRequestSchema
);
