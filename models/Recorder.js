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
    brand: {
      type: String,
      required: [true, "Please add a brand name"],
      enum: [
        "Hikvision",
        "Dahua",
        "CP Plus",
        "Uniview",
        "Axis Communications",
        "Bosch",
        "Honeywell",
        "Samsung",
        "Sony",
        "Panasonic",
        "Vivotek",
        "Hanwha",
        "Avigilon",
        "Pelco",
        "FLIR",
      ],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      enum: ["Network Video Recorders", "Digital Video Recorders"],
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
    model: {
      type: String,
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
