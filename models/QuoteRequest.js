const mongoose = require("mongoose");

const QuoteRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "Please add a city"],
      trim: true,
    },
    propertyType: {
      type: String,
      required: [true, "Please add property type"],
      enum: {
        values: [
          "home",
          "office",
          "retail",
          "warehouse",
          "factory",
          "school",
          "other",
        ],
        message: "Please select a valid property type",
      },
    },
    numCameras: {
      type: String,
      required: [true, "Please add number of cameras"],
    },
    requirements: {
      type: String,
      maxlength: [1000, "Requirements cannot be more than 1000 characters"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "contacted", "quoted", "completed", "cancelled"],
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

module.exports = mongoose.model("QuoteRequest", QuoteRequestSchema);
