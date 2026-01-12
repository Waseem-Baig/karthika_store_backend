const mongoose = require("mongoose");

const cableSchema = new mongoose.Schema(
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
    category: {
      type: String,
      enum: [
        "coaxial",
        "ethernet",
        "power",
        "connectors",
        "tools",
        "accessories",
      ],
      required: true,
    },
    specifications: {
      length: String,
      conductor: String,
      gauge: String,
      resistance: String,
      quantity: String,
    },
    inStock: {
      type: Boolean,
      default: true,
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
    discount: {
      type: Number,
      default: 0,
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
cableSchema.pre("save", function (next) {
  if (this.price && this.mrp) {
    this.discount = Math.round(((this.mrp - this.price) / this.mrp) * 100);
  }
  next();
});

module.exports = mongoose.model("Cable", cableSchema);
