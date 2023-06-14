import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useState } from "react";
import { useEffect } from "react";

import './CheckOut.css';

import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckOut = ({ paymentData }) => {
  const stripe = useStripe();
  const price = parseFloat(paymentData?.price).toFixed(2);
  const elements = useElements();
  const user = paymentData?.email;
  const userName=paymentData?.displayName

  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (price > 0) {
  
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
    } else {
      setCardError("");
      
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user || "unknown",
            name: userName || "anonymous",
          },
        },
      });

    if (confirmError) {
     
    }

   
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const payment = {
        payment: { ...paymentData },
        email: user,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        status: "successfully",
       
      };
      axiosSecure.post("/payments", payment).then((res) => {
    
        // if (res.data.result.insertedId) {
        //   // display confirm
          
        // }
      });
    }
  };
  return (
    <>
      <form className="w-8/12 mx-auto m-8" onSubmit={handleSubmit}>
        <CardElement />
        <button
          className="btn btn-primary btn-sm mt-4"
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
      {transactionId && (
        <p className="text-green-500">
          Transaction complete with transactionId: {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckOut;