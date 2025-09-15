// backend/controllers/buyercontroller.js

import Seller from "../models/seller.js"; // Make sure this points to your correct Seller model

// Get all seller listings by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Seller.find({ category });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products by category" });
  }
};

// Get a single listing by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Seller.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Get all seller listings
export const getAllProducts = async (req, res) => {
  try {
    const products = await Seller.aggregate([
      {
        $lookup: {
          from: "users",             // collection name of users
          localField: "sellerEmail", // field in seller collection
          foreignField: "email",     // matching field in users collection
          as: "sellerInfo"
        }
      },
      {
        $unwind: "$sellerInfo"
      },
      {
        $project: {
          _id: 1,
          title: 1,
          category: 1,
          condition: 1,
          description: 1,
          price: 1,     // assuming "price" field exists
          pickupDate: 1,
          imageUrl: { $concat: ["http://localhost:5000", "$imageUrl"] },
          sellerEmail: 1,
          buyerEmail: 1,
          status: 1,
          // fetched from joined users
          sellername: "$sellerInfo.name",
          sellerPhone: "$sellerInfo.phone",
          sellerAddress: "$sellerInfo.address"
        }
      }
    ]);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products with seller info:", error);
    res.status(500).json({ message: "Server error" });
  }


};

