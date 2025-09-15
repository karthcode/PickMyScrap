
import User from '../models/user.js';
import Seller from '../models/seller.js'; 
// USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};



export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// LISTINGS
export const getAllListings = async (req, res) => {
  try {
    const listings = await Seller.find();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch listings" });
  }
};

export const deleteListing = async (req, res) => {
  try {
    await Seller.findByIdAndDelete(req.params.id);
    res.json({ message: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete listing" });
  }
};

export const updateListing = async (req, res) => {
  try {
    const updatedListing = await Seller.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedListing);
  } catch (err) {
    res.status(500).json({ error: "Failed to update listing" });
  }
};

