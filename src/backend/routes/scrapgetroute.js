// routes/scrap.js
import express from 'express';
import Scrap from '../models/seller.js';

const router = express.Router();

// Example Express route
router.get("/get-by-seller/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const listings = await Scrap.find({ sellerEmail: email }); // Adjust model and query
    res.json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


export default router;
