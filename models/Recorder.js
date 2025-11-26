const mongoose = require("mongoose");

const recorderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a recorder name"],
      trim: true,
      maxlength: [200, "Name cannot be more than 200 characters"],
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
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      enum: {
        values: ["nvr", "dvr", "hybrid", "tribrid", "other"],
        message: "{VALUE} is not a valid category",
      },
    },
    channels: {
      type: Number,
      required: [true, "Please add number of channels"],
      min: [1, "Channels must be at least 1"],
    },
    storageCapacity: {
      type: String,
      default: "",
    },
    badge: {
      type: String,
      default: "",
      trim: true,
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

// Virtual for discount percentage
recorderSchema.virtual("discount").get(function () {
  if (this.mrp > this.price) {
    return Math.round(((this.mrp - this.price) / this.mrp) * 100);
  }
  return 0;
});

module.exports = mongoose.model("Recorder", recorderSchema);
