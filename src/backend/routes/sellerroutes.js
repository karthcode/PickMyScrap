
import express from 'express';
import multer from 'multer';
import { postScrap,deleteScrap } from '../controllers/sellercontroller.js';
import path from 'path';
import Seller from '../models/seller.js'; 
import mongoose from 'mongoose';
const router = express.Router();

// Storage config for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST: Seller creates a new scrap listing
router.post('/post-scrap', upload.single('image'), postScrap);
router.delete('/delete/:id', deleteScrap);



router.put('/update-buyer/:sellerId', async (req, res) => {
  const { sellerId } = req.params; // the sellerId of the item to update
  const { buyerId } = req.body; // the buyerId that the user wants to assign
  console.log(req.body);
  console.log(buyerId + " : " + sellerId)

  // Validate buyerId format (optional)
 // if (!mongoose.Types.ObjectId.isValid(buyerId)) {
 //   return res.status(400).json({ message: 'Invalid buyerId format.' });
 // }

  try {
    const updatedSeller = await Seller.findOneAndUpdate(
      { _id: sellerId },
      { $set: { buyerId, buyerEmail: req.body.buyeremail, status: "Accepted" } }, // assuming buyerEmail is also passed in the request body
      { new: true } // to return the updated document
    );

    if (!updatedSeller) {
      return res.status(404).json({ message: 'Seller item not found.' });
    }

    res.status(200).json(updatedSeller);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// DELETE: Delete a scrap listing by ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedListing = await Seller.findByIdAndDelete(id);

    if (!deletedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Optionally, delete the associated image file from the server
    if (deletedListing.imageUrl) {
      const imagePath = path.join(process.cwd(), 'Uploads', path.basename(deletedListing.imageUrl));
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting image:', err);
      });
    }

    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (err) {
    console.error('Error deleting listing:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
