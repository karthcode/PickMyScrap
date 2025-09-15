import mongoose from "mongoose";
const SellerSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  condition: String,
  price: Number,
  pickupDate: Date,
  imageUrl: String,
  sellerEmail: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Seller", SellerSchema);
