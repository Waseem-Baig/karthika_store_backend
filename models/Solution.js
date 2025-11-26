const mongoose = require("mongoose");

const SolutionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a solution name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    features: {
      type: [String],
      required: [true, "Please add at least one feature"],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "Please add at least one feature",
      },
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      enum: {
        values: [
          "home",
          "business",
          "warehouse",
          "retail",
          "education",
          "industrial",
          "other",
        ],
        message: "Please select a valid category",
      },
    },
    targetAudience: {
      type: String,
      required: [true, "Please add target audience"],
      maxlength: [200, "Target audience cannot be more than 200 characters"],
    },
    recommendedCameras: {
      type: String,
      trim: true,
      maxlength: [50, "Recommended cameras cannot be more than 50 characters"],
    },
    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200",
    },
    price: {
      type: Number,
      default: 0,
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating cannot be more than 5"],
    },
    reviews: {
      type: Number,
      default: 0,
      min: [0, "Reviews cannot be negative"],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field for discount percentage
SolutionSchema.virtual("discount").get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  }
  return 0;
});

module.exports = mongoose.model("Solution", SolutionSchema);
