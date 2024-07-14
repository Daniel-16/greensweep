import UserModel from "../models/User.js";

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Bad request: Missing required fields",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Bad request: Password too short. Must be at least 6 characters",
      });
    }
    const user = await UserModel.create({
      username,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
