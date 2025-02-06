"use client";
import React, { useEffect, useState, useContext } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import convertToSubcurrency from "../lib/convertToSubcurrency";
import { CarContext } from "./context/CarContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedCar = () => {
  const carContext = useContext(CarContext);

  if (!carContext) {
    throw new Error("CarContext must be used within a CarProvider");
  }

  const { car } = carContext;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-40 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-1"
        initial={{ x: -1000, rotate: 0 }}
        animate={{ 
          x: 1000,
          rotate: [0, -5, 5, -5, 0], // Slight rocking motion
        }}
        transition={{ 
          duration: 2, 
          ease: "easeInOut",
          rotate: { repeat: Infinity, duration: 0.5 }
        }}
      >
        <div className="relative w-full h-full bg-white/10 backdrop-blur-sm rounded-md overflow-hidden">
          <Image
            src={car?.image || '/default-car.png'}
            alt="Moving car"
            fill
            className="object-contain drop-shadow-lg transform -scale-x-100"
            priority
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const carContext = useContext(CarContext);
  const [showCar, setShowCar] = useState(false);

  if (!carContext) {
    throw new Error("CarContext must be used within a CarProvider");
  }

  const { car } = carContext;

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setShowCar(true);

    setTimeout(() => {
      setShowCar(false);
    }, 3000);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const returnUrl = process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_RETURN_URL_VERCEL
      : process.env.NEXT_PUBLIC_RETURN_URL_LOCAL;

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${returnUrl}?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your return_url.
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-blue-400">Loading payment details...</div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      <AnimatePresence>
        {showCar && <AnimatedCar />}
      </AnimatePresence>

      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6">
          {errorMessage}
        </div>
      )}

      {car && (
        <div className="bg-white/5 rounded-lg p-6 border border-white/10 mb-8">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Car Summary
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-48 h-32 overflow-hidden rounded-lg">
              <Image 
                src={car.image} 
                alt={car.name} 
                fill
                className="object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 space-y-4 text-left">
              <div>
                <p className="text-sm text-gray-400">Vehicle Name</p>
                <p className="text-lg font-semibold bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
                  {car.name}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Base Price</p>
                  <p className="font-medium text-white">${car.price}</p>
                </div>
                {car.discountedPrice && (
                  <div>
                    <p className="text-sm text-gray-400">Special Offer</p>
                    <p className="font-medium bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                      ${car.discountedPrice}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            Payment Details
          </h3>
          <PaymentElement />
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-4">
            <span className="text-black text-bold">Total Amount</span>
            <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
              ${amount}
            </span>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full py-4 px-6 rounded-lg font-semibold text-black
              transition-all duration-300
              ${loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-lg'
              }
            `}
          >
            <span className="flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="text-white">Processing Payment...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-white">Complete Secure Payment</span>
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;