const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../../models/user.models.js");
const sendEmail = require("../../helpers/sendEmail");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUserEmail = await User.findOne({ email });
    if (checkUserEmail)
      return res.json({
        success: false,
        message:
          "The email is already registered in our system! Please try again.",
      });

    const checkUserName = await User.findOne({ userName });
    if (checkUserName)
      return res.json({
        success: false,
        message: "The username is already taken! Please choose a different one.",
      });

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({ success: true, message: "New User Created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "An Error Occurred" });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "The user does not exist! Please register.",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );

    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "The password entered is incorrect! Please try again.",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None' }).json({
      success: true,
      message: "Login Successful",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName : checkUser.userName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "An Error Occurred" });
  }
};

//logout

const logOutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Session Logged Out Successfully",
  });
};

//auth middelware

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized User!!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized User!!",
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "There is no user with that email address." });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    const resetUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/auth/reset-password?token=${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please visit the following link to complete the process: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password reset token",
        message,
      });

      res.status(200).json({ success: true, message: "Email sent" });
    } catch (err) {
      console.log("Nodemailer error: ", err); // Log the error for debugging!
      
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return res.json({ success: false, message: "Email could not be sent" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "An Error Occurred" });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.json({ success: false, message: "Invalid token or token has expired" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "An Error Occurred" });
  }
};

module.exports = { registerUser, loginUser, logOutUser, authMiddleware, forgotPassword, resetPassword };
