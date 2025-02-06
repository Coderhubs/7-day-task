"use client";

import CheckoutPage from "../components/checkout";
import convertToSubcurrency from "../lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from 'next/navigation';
import { motion } from "framer-motion";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const searchParams = useSearchParams();
  const amount = Number(searchParams.get('amount')) || 0;
  const name = searchParams.get('name') || '';
  const carName = searchParams.get('carName') || '';

  return (
    <main className="max-w-6xl mx-auto p-10 text-center m-10 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
      <motion.div 
        className="mb-10 p-8 rounded-lg bg-white/10 backdrop-blur-sm shadow-xl border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Secure Payment Portal
        </motion.h1>
        
        <motion.div 
          className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
        
        <motion.h2 
          className="text-2xl mb-2 bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Welcome back, <span className="font-bold hover:text-yellow-300 transition-colors duration-300">{name}</span>
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="space-y-4">
            <h3 className="text-lg text-blue-400">Rental Details</h3>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="text-sm text-gray-300">Selected Vehicle</p>
              <p className="font-semibold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text text-lg">{carName}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg text-blue-400">Payment Summary</h3>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-300">Total Amount</span>
                <span className="font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text text-lg">
                  ${amount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-white/20">
        <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Enter Payment Details
        </h3>
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(amount),
            currency: "usd",
            appearance: {
              theme: 'night',
              variables: {
                colorPrimary: '#4F46E5',
                colorBackground: '#ffffff10',
                colorText: '#71717a',
                colorDanger: '#df1b41',
                fontFamily: 'system-ui, sans-serif',
                spacingUnit: '6px',
                borderRadius: '8px',
              },
              rules: {
                '.Input': {
                  backgroundColor: '#ffffff90',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#27272a',
                },
                '.Input:hover': {
                  backgroundColor: '#ffffffa0',
                },
                '.Input:focus': {
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(79, 70, 229, 0.4)',
                  color: '#18181b',
                },
                '.Label': {
                  color: '#71717a',
                },
                '.Tab': {
                  color: '#71717a',
                  backgroundColor: '#ffffff80',
                },
                '.Tab--selected': {
                  color: '#4F46E5',
                  backgroundColor: '#ffffff',
                },
                '.TabIcon': {
                  color: '#71717a',
                },
                '.TabIcon--selected': {
                  color: '#4F46E5',
                },
                '.Input::placeholder': {
                  color: '#a1a1aa',
                }
              }
            }
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      </div>
    </main>
  );
}