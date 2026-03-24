const User = require("../models/user.model");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password, role });

    res.json({
      user,
      token: user.generateToken(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      user,
      token: user.generateToken(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPLOAD PROFILE
exports.uploadProfile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(req.user.id);

    user.profileImage = req.file.path;
    await user.save();

    res.json({
      message: "Profile uploaded successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};