const express = require("express");
const {
  createPaymentIntent,
  createSubscription,
} = require("../Controllers/paymentController");
const router = express.Router();

// create payment intent
router.post("/create-payment-intent", createPaymentIntent);
// subscribe client after recieving payment
router.post("/create-subscription", createSubscription);
module.exports = router;
