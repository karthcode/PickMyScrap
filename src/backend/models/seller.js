import mongoose from 'mongoose';

const SellerSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  condition: String,
  price: Number,
  pickupDate: Date,
  imageUrl: String,
  sellerEmail: String,
  buyerEmail: { type: String, default: null },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming your user schema is named 'User'
    default: null,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Seller = mongoose.model('Seller', SellerSchema);
export default Seller;
