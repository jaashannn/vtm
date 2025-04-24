import React from "react";
import { motion } from "framer-motion";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StoreFunction } from "../../Store/store";
import { useNavigate } from "react-router-dom";

const ClientPaymentPage = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const {
    selectedPackage,
    clientFormData,
    setClientFormData,
    clientPaymentData,
    setClientPaymentData,
    apiUrl,
    subscribeClient,
  } = StoreFunction();

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const { error: submitError } = await elements.submit();
    if (submitError) {
      return;
    }
    await createSubscription();
  };

  const createSubscription = async () => {
    try {
      const response = await fetch(`${apiUrl}payment/create-subscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: clientFormData.email,
          priceId: selectedPackage?.id,
        }),
      });
      const { type, clientSecret } = await response.json();
      if (!clientSecret) {
        return;
      }

      const confirmIntent =
        type === "setup" ? stripe.confirmSetup : stripe.confirmPayment;
      const { setupIntent, paymentIntent, error } = await confirmIntent({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "https://localhost:3000",
        },
      });

      if (error) {
        console.log(error);
      } else {
        const intent = paymentIntent || setupIntent;
        if (intent) {
          const updatedPaymentData = {
            ...clientPaymentData,
            paymentMode: intent.payment_method_types.join(", "),
            paymentStatus: intent.status,
            amountReceived: intent.amount_received
              ? intent.amount_received / 100
              : 0,
            paymentId: intent.id,
            clientSecret: intent.client_secret,
          };
          setClientPaymentData(updatedPaymentData);
          console.log("Subscription Successful:", updatedPaymentData);
          alert("Subscription Successful!");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  
  const handleCancelBtn = () => {
    navigate("/signup");
  };

  return (
    <motion.div 
      className="max-w-[450px] w-full p-5 bg-white shadow-md rounded-xl animate-[fadeIn_0.5s_ease-in-out] my-12 mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <form className="flex flex-col">
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Card Holder Name</label>
          <input
            type="text"
            name="cardHolderName"
            placeholder="Card Holder Name"
            className="w-full p-2.5 mb-4 border border-gray-300 rounded-md bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors placeholder-gray-400"
            value={clientPaymentData.cardHolderName}
            onChange={(e) =>
              setClientPaymentData({
                ...clientPaymentData,
                cardHolderName: e.target.value,
              })
            }
            required
          />
        </div>
        
        <PaymentElement className="mb-4" />

        <button 
          type="submit" 
          className="px-4 py-3 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={!stripe}
        >
          Pay
        </button>
        
        <button
          type="button"
          className="px-4 py-3 mt-2.5 font-bold text-white bg-red-700 rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={handleCancelBtn}
          disabled={!stripe}
        >
          Cancel
        </button>
      </form>
    </motion.div>
  );
};

export default ClientPaymentPage;