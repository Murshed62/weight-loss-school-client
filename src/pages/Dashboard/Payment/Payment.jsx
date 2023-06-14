import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckOut from "../CheckOut/CheckOut";
import { Elements } from "@stripe/react-stripe-js";

const Payment = () => {
  const { id } = useParams();
  const [paymentData, setPaymentData] = useState({})

  useEffect(() => {
    if (id) {
      fetch(`https://weight-loss-school-server.vercel.app/selectedClass/${id}`)
        .then(res => res.json())
        .then(data => {
          setPaymentData(data);

        })
        .catch(error => {


        });
    }
  }, []);

  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_API_KEY);
  console.log(import.meta.env.VITE_PAYMENT_API_KEY);
  return (
    <div>
      <h1 className="text-center text-3xl text-orange-500 font-bold">Payment </h1>
      <Elements stripe={stripePromise}>
        <CheckOut paymentData={paymentData} ></CheckOut>
      </Elements>
    </div>
  );
};

export default Payment;