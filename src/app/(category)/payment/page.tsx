"use client";
import Image from "next/image";
import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FormData, BillingInfo, Reservation, CreditCardDetails } from "../../components/format";
import { client } from "@/sanity/lib/client";
// import CheckoutPage from "@/app/components/checkout";
// import { Elements } from "@stripe/react-stripe-js";
// import convertToSubcurrency from "@/app/lib/convertToSubcurrency";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";

const RentalForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    billingInfo: {
      name: '',
      phone: '',
      address: '',
      city: '',
    },
    reservation: {
      pickupLocation: '',
      pickupDate: '',
      dropLocation: '',
      dropDate: '',
    },
    paymentMethod: 'Credit Card',
    creditCardDetails: {
      cardNumber: '',
      expirationDate: '',
      cvc: '',
    },
    agreement: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = <T extends keyof FormData>(section: T, field: keyof FormData[T], value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...(prevData[section] as object),
        [field]: value,
      },
    }));
  };

  const handlePaymentMethodChange = (method: FormData["paymentMethod"]) => {
    setFormData((prevData) => ({
      ...prevData,
      paymentMethod: method,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const result = await client.create({
        _type: 'form',
        billingInfo: formData.billingInfo,
        reservation: formData.reservation,
        paymentMethod: formData.paymentMethod,
        creditCardDetails: formData.paymentMethod === 'Credit Card' ? formData.creditCardDetails : undefined,
        agreement: formData.agreement,
      });

      console.log('Form submitted successfully:', result);
      setSubmitSuccess(true);

      // Reset form data after successful submission
      setFormData({
        billingInfo: {
          name: '',
          phone: '',
          address: '',
          city: '',
        },
        reservation: {
          pickupLocation: '',
          pickupDate: '',
          dropLocation: '',
          dropDate: '',
        },
        paymentMethod: 'Credit Card',
        creditCardDetails: {
          cardNumber: '',
          expirationDate: '',
          cvc: '',
        },
        agreement: false,
      });

      // Redirect to a success page or display a success message
      // Example: router.push('/thank-you'); // Uncomment if you want to redirect
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');

  const [amount, setAmount] = useState<number | null>(null);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? null : value);
  };

  
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-8">
            <form onSubmit={handleSubmit}>
              {/* Billing Info */}
              <section className="p-4 sm:p-6 lg:p-10 border rounded-lg bg-white">
                <h2 className="text-xl font-bold">Billing Info</h2>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">Please enter your billing info</p>
                  <p className="text-gray-500">Step 1 of 4</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {(Object.keys(formData.billingInfo) as Array<keyof BillingInfo>).map((field) => (
                    <div key={field}>
                      <label htmlFor={field} className="block text-base font-semibold mb-2">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type="text"
                        id={field}
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        className="w-full p-3 rounded-md bg-gray-100"
                        value={formData.billingInfo[field]}
                        onChange={(e) => handleInputChange("billingInfo", field, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Rental Info */}
              <section className="p-4 sm:p-6 lg:p-8 border rounded-lg bg-white">
                <h2 className="text-xl font-bold">Rental Info</h2>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">Please select your rental info</p>
                  <p className="text-gray-500">Step 2 of 4</p>
                </div>
                <div className="space-y-6">
                  {[
                    { type: "pickup", label: "Pick-Up" },
                    { type: "drop", label: "Drop-Off" },
                  ].map((item) => (
                    <div key={item.type} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <input type="radio" name="rentalType" id={item.type} defaultChecked={item.type === "pickup"} />
                        <label htmlFor={item.type}>{item.label}</label>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                        {[
                          { name: `${item.type}Location` as keyof Reservation, label: "Location" },
                          { name: `${item.type}Date` as keyof Reservation, label: "Date" },
                        ].map((field) => (
                          <div key={field.name}>
                            <label htmlFor={field.name} className="block text-base font-semibold mb-2">
                              {field.label}
                            </label>
                            <input
                              type={field.label === "Date" ? "datetime-local" : "text"}
                              id={field.name}
                              name={field.name}
                              placeholder={field.label}
                              className="w-full p-3 rounded-md bg-gray-100"
                              value={formData.reservation[field.name]}
                              onChange={(e) => handleInputChange("reservation", field.name, e.target.value)}
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Payment Method */}
              <section className="p-4 sm:p-6 lg:p-8 border rounded-lg bg-white">
                <h2 className="text-xl font-bold tracking-tight mt-4">Payment Method</h2>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 mb-4">Please enter your payment method</p>
                  <p className="text-gray-500 mb-4">Step 3 of 4</p>
                </div>
                <div className="space-y-4 border rounded-lg bg-[#F6F7F9] p-4">
                  {/* Credit Card Section */}
                  <div className="my-4 flex justify-between items-center">
                    <div>
                      <input
                        type="radio"
                        name="paymentType"
                        id="credit-card"
                        checked={formData.paymentMethod === "Credit Card"}
                        onChange={() => handlePaymentMethodChange("Credit Card")}
                      />
                      <label htmlFor="credit-card" className="ml-2 font-semibold">
                        Credit Card
                      </label>
                    </div>
                    <Image
                      src="/images/Visa.jpg"
                      alt="Visa Card"
                      width={92}
                      height={20}
                      className="w-[92px] h-[20px]"
                    />
                  </div>
                  {formData.paymentMethod === "Credit Card" && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {(Object.keys(formData.creditCardDetails) as Array<keyof CreditCardDetails>).map((field) => (
                        <div key={field}>
                          <label htmlFor={field} className="block text-base font-semibold mb-2">
                            {field.charAt(0).toUpperCase() +
                              field
                                .slice(1)
                                .replace(/([A-Z])/g, " $1")
                                .trim()}
                          </label>
                          <input
                            type="text"
                            id={field}
                            name={field}
                            placeholder={
                              field.charAt(0).toUpperCase() +
                              field
                                .slice(1)
                                .replace(/([A-Z])/g, " $1")
                                .trim()
                            }
                            className="p-3 rounded-lg bg-white w-full h-[56px]"
                            value={formData.creditCardDetails[field]}
                            onChange={(e) => handleInputChange("creditCardDetails", field, e.target.value)}
                            required={formData.paymentMethod === "Credit Card"}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {/* PayPal Option */}
                  <div className="my-4 flex justify-between items-center border rounded-lg p-3 bg-[#F6F7F9]">
                    <div>
                      <input
                        type="radio"
                        name="paymentType"
                        id="paypal"
                        checked={formData.paymentMethod === "PayPal"}
                        onChange={() => handlePaymentMethodChange("PayPal")}
                      />
                      <label htmlFor="paypal" className="ml-2 font-semibold">
                        PayPal
                      </label>
                    </div>
                    <Image src="/images/PayPal.jpg" alt="PayPal" width={92} height={20} className="w-[92px] h-[20px]" />
                  </div>
                  {/* Bitcoin Option */}
                  <div className="my-4 flex justify-between items-center border rounded-lg p-3 bg-[#F6F7F9]">
                    <div>
                      <input
                        type="radio"
                        name="paymentType"
                        id="bitcoin"
                        checked={formData.paymentMethod === "Bitcoin"}
                        onChange={() => handlePaymentMethodChange("Bitcoin")}
                      />
                      <label htmlFor="bitcoin" className="ml-2 font-semibold">
                        Bitcoin
                      </label>
                    </div>
                    <Image
                      src="/images/Bitcoin.jpg"
                      alt="Bitcoin"
                      width={92}
                      height={20}
                      className="w-[92px] h-[20px]"
                    />
                  </div>

                </div>
              

              </section>

              {/* Confirmation */}
              <section className="p-4 sm:p-6 lg:p-8 border rounded-lg bg-white">
                <h2 className="text-xl font-bold">Confirmation</h2>

                <p className="text-gray-500">We are getting to the end. Just a few clicks and your rental is ready!</p>
                <div className="space-y-4">
                  <label className="flex items-center gap-2 p-3 border rounded-md bg-gray-100">
                    <input
                      type="checkbox"
                      checked={formData.agreement}
                      onChange={(e) => setFormData((prev) => ({ ...prev, agreement: e.target.checked }))}
                    />
                    I agree with terms and conditions.
                  </label>
                </div>
                <div>
                  <Image
                    src="/images/Layer.jpg"
                    width={32}
                    height={32}
                    className="py-8 pr-[2.67] pl-1.97"
                    alt="security"
                  />
                  <h1 className="text-black font-bold">All your Data are Safe</h1>
                  <p className="py-3 text-slate-500">
                    We are using the most advanced security to provide you the best experience ever.
                  </p>
                </div>

                {/* Submission status */}
                {submitError && <div className="text-red-500 mb-4">{submitError}</div>}
                {submitSuccess && <div className="text-green-500 mb-4">Form submitted successfully!</div>}
                <button
                  type="submit"
                  className="w-[140px] p-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  disabled={
                    isSubmitting ||
                    !formData.agreement ||
                    Object.values(formData.billingInfo).some((value) => !value) ||
                    Object.values(formData.reservation).some((value) => !value)
                  }
                >
                  {isSubmitting ? "Submitting..." : "Rent Now"}
                  
                </button>
                <div className="mt-6">
                <Link href="/stripe-testing">
       <button className="bg-[#3563E9] w-[120px] md:w-[140px] h-[48px] md:h-[56px] text-white rounded-md font-medium hover:bg-blue-600">
           Pay Now
         </button>
         
        </Link>
        </div>
        
              </section>
              <div>
      
              {/* <div className="mt-8 p-6 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-semibold mb-4">Payment Section</h2>
          <label className="block text-gray-600 mb-2">Enter Amount</label>
          <input
            type="number"
            placeholder="Enter amount to pay"
            value={amount ?? ""}
            onChange={handleAmountChange}
            className="input w-full p-2 border rounded-md mb-4"
          />
          {amount !== null && (
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: convertToSubcurrency(amount),
                currency: "usd",
              }}
            >
              <CheckoutPage amount={amount} />
            </Elements>
          )}
        </div> */}
              </div>
            </form>
          </div>
        

          {/* Right Section (Summary) */}
          <div className="order-1 lg:order-2 space-y-8">
          
            <section className="p-4 sm:p-6 lg:p-8 border rounded-lg  bg-white">
              <h2 className="text-xl font-bold mb-4">Rental Summary</h2>
              <p className="text-gray-500 mb-8">
                Prices may change depending on the length of the rental and the price of your rental car.
              </p>
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/a.png"
                  alt="Car"
                  width={100}
                  height={100}
                  className="w-[132px] h-[108px] rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-3xl font-bold">Nissan GT - R</h3>
                  <div className="flex items-center gap-[4px]">
                    <p className="text-yellow-500 flex items-center gap-[2px]">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <CiStar />
                    </p>
                    <p className="text-gray-500"> 440+ Reviews</p>
                  </div>
                </div>
              </div>
              <hr className="text-gray-500 mt-10" />
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium text-base text-[#90A3BF]">Subtotal</span>
                  <span className="font-semibold text-base ">$80.00</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium text-base text-[#90A3BF]">Tax</span>
                  <span className="font-semibold text-base ">$0</span>
                </div>
              </div>
              <div className="my-5 flex justify-between items-center p-3 border rounded-lg w-full h-[56px]">
                <span className="font-medium text-base text-[#90A3BF]">Apply promo code </span>
                <span className="font-medium mx-4 text-base">Apply code</span>
              </div>
              <div className="mt-4 flex justify-between items-center font-bold text-lg gap-1">
                <div className="flex flex-col">
                  <span>Total Rental Price</span>
                  <span className="font-medium text-sm text-[#90A3BF] px-1">
                    Overall price and includes rental discount
                  </span>
                </div>
                <span className="text-3xl font-bold">$80.00</span>
              </div> 


            </section>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default RentalForm;