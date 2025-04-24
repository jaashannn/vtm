const Stripe = require("stripe");
const dotenv = require("dotenv");
const UserModel = require("../Models/userModel");
const path = require("path");
const fs = require("fs");
const ClientModel = require("../Models/clientModel");
const { sendOTP } = require("../Middlewares/emailMailer");
dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Replace with your actual secret key

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, customerId, packageId, email } = req.body;

    // Validate request data
    if (!amount || !currency || !customerId || !packageId || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required parameters" });
    }
    
    // Check for existing incomplete subscription
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "incomplete",
      limit: 1,
    });

    if (subscriptions.data.length > 0) {
      return res
        .status(400)
        .json({ error: "An incomplete subscription already exists." });
    }

    // Create a payment intent with 'incomplete' subscription mode
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount,
        currency,
        customer: customerId,
        description: `Payment for package ID: ${packageId}`,
        setup_future_usage: "off_session", // To save the card for future use
        automatic_payment_methods: { enabled: true },
        metadata: { packageId, email },
      },
      {
        idempotencyKey: `${customerId}_${packageId}`, // Prevents duplicate charges
      }
    );

    res.status(200).json({
      success: true,
      message: "Client Secret Created",
      result: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server Down, try again later" });
  }
};

const createSubscription = async (req, res) => {
  const { email, priceId } = req.body;
  try {
    const client = await ClientModel.findOne({ "email.email": email });
    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }
    // Fetch price details to validate if it's recurring
    const price = await stripe.prices.retrieve(priceId);
    if (price.type !== "recurring") {
      return res.status(400).json({
        success: false,
        message: "Invalid price type. Use a recurring price for subscriptions.",
      });
    }
    const stripeCustomerId = client.stripeCustomerId;
    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [
        {
          price: priceId,
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent", "pending_setup_intent"],
    });
    if (subscription.pending_setup_intent !== null) {
      res.send({
        type: "setup",
        clientSecret: subscription.pending_setup_intent.client_secret,
      });
    } else {
      res.send({
        type: "payment",
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server Down, try again later" });
  }
};

module.exports = {
  createPaymentIntent,
  createSubscription,
};
