
import User from "../models/user.js";

// SIGNUP CONTROLLER
export const signup = async (req, res) => {
  const { name, email, password,phone, address, role } = req.body;
  // Check if the user already exists
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = new User({ name, email, password, role, phone, address });
    await user.save();

    res.status(201).json({ message: "Signup successful", role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};



// SIGNIN CONTROLLER
export const signin = async (req, res) => {
  const { email, password, role } = req.body;
  console.log('Received data:', req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    if (existingUser.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (existingUser.role !== role) {
      return res.status(403).json({ message: "Role mismatch" });
    }

    res.status(200).json({
      message: "Signin successful",
      user: {
        id: existingUser._id, 
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
