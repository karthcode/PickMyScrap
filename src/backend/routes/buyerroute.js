import express from "express"; 
import { getProductsByCategory, getProductById, getAllProducts } from "../controllers/buyercontroller.js"; // Correct import syntax for ES modules
import Seller from "../models/seller.js";

const router = express.Router();

// Routes
router.get("/products", getAllProducts); // Get all products
router.get("/products/:category", getProductsByCategory); // Filter by category
router.get("/product/:id", getProductById); // View details of a single product



// PUT: Accept & Negotiate
router.put("/accept/:id", async (req, res) => {
  const { proposedAmount, note, proposedPickupDate, buyerEmail } = req.body;
  try {
    const updated = await Seller.findByIdAndUpdate(
      req.params.id,
      {
        negotiation: { buyerEmail, proposedAmount, note, proposedPickupDate },
        status: "Pending",
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update negotiation" });
  }
});


router.put('/accept/:sellerItemId', async (req, res) => {
  const { sellerItemId } = req.params;
  const { buyerId, buyerEmail } = req.body;

  if (!mongoose.Types.ObjectId.isValid(sellerItemId)) {
    return res.status(400).json({ error: 'Invalid Seller Item ID' });
  }

  try {
    const updatedItem = await Seller.findByIdAndUpdate(
      sellerItemId,
      {
        buyerId,
        buyerEmail,
        status: 'Accepted',
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to accept order', details: err });
  }
});

router.put('/api/seller/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { buyerId } = req.body;

    // Find the product by productId and update the buyerId field
    const product = await Seller.findByIdAndUpdate(
      productId,
      { buyerId: buyerId, status: 'Accepted' }, // Update the status to "Accepted" as well
      { new: true } // Return the updated document
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product accepted successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
  


// routes/buyer.js
router.get('/my-orders', async (req, res) => {
  const buyerEmail = req.query.email;
  try {
    const acceptedOrders = await SellerModel.find({
      buyerEmail: buyerEmail,
      status: 'accepted'
    });
    res.json(acceptedOrders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err });
  }
});



export default router;  // Use export default for ES module
