const Stripe = require("stripe");
const dotenv = require("dotenv");
dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Replace with your actual secret key

const fetchPackages = async (req, res) => {
  try {
    const packages = await stripe.prices.list({
      expand: ["data.product"],
    });
    res.status(201).json({ success: true, result: packages.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server down",
    });
  }
};

const sendOtpOnEmail = async (req, res) => {
  const { email, name } = req.body;
  if (!email) {
    return res.status(403).json({
      success: "Email required",
    });
  }
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);

    const checkSent = await sendOTP(email, name, otp);
    if (checkSent) {
      res.status(201).json({
        success: true,
        message: `Otp sent`,
      });
    } else {
      res.status(401).json({
        success: false,
        message: `Otp did not sent`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server down",
    });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(403).json({
      success: "Email and Otp required",
    });
  }
  try {
    const user =
      (await UserModel.findOne({ "email.email": email })) ||
      (await ClientModel.findOne({ "email.email": email }));
    if (user.otp !== otp) {
      return res.status(404).json({
        success: false,
        message: "OTP does not match",
      });
    }

    user.otp = null;
    user.save();

    res.status(201).json({
      success: true,
      message: "Email verified",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server down",
    });
  }
};
module.exports = {
  fetchPackages,
  sendOtpOnEmail,
  verifyOtp,
};
