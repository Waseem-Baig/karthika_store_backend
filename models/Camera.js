const mongoose = require("mongoose");

const cameraSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a camera name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: [0, "Price cannot be negative"],
    },
    mrp: {
      type: Number,
      required: [true, "Please add an MRP"],
      min: [0, "MRP cannot be negative"],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be more than 5"],
    },
    reviews: {
      type: Number,
      default: 0,
      min: [0, "Reviews cannot be negative"],
    },
    images: {
      type: [String],
      required: [true, "Please add at least one image"],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "At least one image is required",
      },
    },
    features: {
      type: [String],
      default: [],
    },
    badge: {
      type: String,
      enum: ["Bestseller", "AI", "Premium", "Budget", "New", "Popular", ""],
      default: "",
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    warranty: {
      type: String,
      default: "1 Year",
    },
    category: {
      type: String,
      enum: ["bullet", "dome", "ptz", "fisheye", "other"],
      default: "other",
    },
  },
  {
    timestamps: true,
  }
);

// Calculate discount percentage virtual field
cameraSchema.virtual("discount").get(function () {
  return Math.round(((this.mrp - this.price) / this.mrp) * 100);
});

// Include virtuals in JSON
cameraSchema.set("toJSON", { virtuals: true });
cameraSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Camera", cameraSchema);
