import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ClientPaymentPage from "../Pages/ClientPaymentPage";
import { StoreFunction } from "../../Store/store";

const stripePromise = loadStripe(
  "pk_test_51OyaTISEYHxd3PYrdMFKgz5nbQMcKawMQZEeTnqbv7oYitmSWdP6bZ2TlJcz8MHZEaIU77xaB8O3XKfs9yfwqwGm006kxTkgRh"
);

const PaymentParentComponent = () => {
  const {option} = StoreFunction();
  return (
    <Elements stripe={stripePromise} options={option}>
      <ClientPaymentPage />
    </Elements>
  );
};

export default PaymentParentComponent;
