import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user (Admin only, in practice)
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "A user with that email already exists" });
    }

    const user = await User.create({ name, email, password, role });

    res.status(201).json({
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "This account has been deactivated" });
    }

    res.json({
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// @desc    Get current logged-in user's profile
// @route   GET /api/auth/me
export const getProfile = async (req, res) => {
  res.json(req.user);
};
