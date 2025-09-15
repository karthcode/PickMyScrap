
// controllers/sellerController.js
import Seller from '../models/seller.js';
import path from 'path';
import fs from 'fs';

export const postScrap = async (req, res) => {
  try {


    console.log("Received body:", req.body); // This will log the form data
    console.log("Received file:", req.file); // This will log the file data

    const { title, category, description, condition, price, pickupDate, sellerEmail } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const newSellerPost = new Seller({
      title,
      category,
      description,
      condition,
      price,
      pickupDate,
      sellerEmail,
      imageUrl: `/uploads/${imageFile.filename}`,
    });

    await newSellerPost.save();
    res.status(201).json({ message: 'Scrap posted successfully', data: newSellerPost });
  } catch (err) {
    console.error('Error posting scrap:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
export const deleteScrap = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedListing = await Seller.findByIdAndDelete(id);

    if (!deletedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Optionally, delete the associated image file
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
};

