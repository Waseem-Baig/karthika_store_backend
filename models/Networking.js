const mongoose = require("mongoose");

const networkingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
      },
    ],
    features: [
      {
        type: String,
      },
    ],
    model: {
      type: String,
      trim: true,
    },
    specifications: {
      ports: String,
      powerBudget: String,
      poeStandard: String,
      management: String,
      speed: String,
      mounting: String,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    brand: {
      type: String,
      required: [true, "Please add a brand name"],
      trim: true,
    },
    pdfUrl: {
      type: String,
      default: "",
    },
    pdfFileName: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Calculate discount percentage before saving
networkingSchema.pre("save", function (next) {
  if (this.mrp && this.price) {
    this.discount = Math.round(((this.mrp - this.price) / this.mrp) * 100);
  }
  next();
});

module.exports = mongoose.model("Networking", networkingSchema);
