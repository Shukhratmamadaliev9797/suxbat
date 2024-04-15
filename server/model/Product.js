const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    images: { type: Array },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    condition: { type: String, required: true },
    availability: { type: String, required: true },
    location: { type: String, required: true },
    user: { type: ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
