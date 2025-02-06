"use client";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { FormData, BillingInfo, Reservation, CreditCardDetails } from "../../components/format";
import { client } from "@/sanity/lib/client";

import { useSearchParams, useRouter } from 'next/navigation';
import Rating from "@/app/components/rating";
import { IoInformationCircleOutline } from "react-icons/io5";

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

  const [carDetails, setCarDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Add duration state
  const [rentalDuration, setRentalDuration] = useState<number>(1);

  const router = useRouter();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const carId = searchParams.get('id');
        
        if (!carId) {
          setIsLoading(false);
          return;
        }

        const query = `*[_type == "cars" && _id == "${carId}"][0]{
          id,
          name,
          type,
          "image": image.asset->url,
          "image_1": image_1.asset->url,
          "image_2": image_2.asset->url,
          "image_3": image_3.asset->url,
          "fuelCapacity": fuel_capacity,
          "transmission": transmission,
          "capacity": seating_capacity,
          "price": price_per_day,
          "discountedPrice": original_price,
          description,
          _id
        }`;

        const car = await client.fetch(query);
        console.log('Fetched car:', car); // Debug log
        setCarDetails(car);
      } catch (error) {
        console.error('Error fetching car details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarDetails();
  }, [searchParams]);

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
  
  const calculatePrices = useCallback(() => {
    if (!carDetails?.price) return { subtotal: 0, tax: 0, total: 0, discount: 0, numberOfDays: rentalDuration, pricePerDay: 0 };
    
    const pricePerDay = Number(carDetails.price);
    const subtotal = pricePerDay * rentalDuration;
    const taxRate = 0.10;
    const tax = subtotal * taxRate;
    let discount = 0;
    
    if (appliedPromo) {
      discount = subtotal * 0.15;
    }
    
    const total = subtotal + tax - discount;
    
    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      numberOfDays: rentalDuration,
      pricePerDay: parseFloat(pricePerDay.toFixed(2))
    };
  }, [carDetails?.price, rentalDuration, appliedPromo]);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'MORENT15') {
      setAppliedPromo(true);
      const prices = calculatePrices();
      setTotalPrice(prices.total);
    } else {
      setAppliedPromo(false);
      // Show error message
      const errorMessage = document.getElementById('promoError');
      if (errorMessage) {
        errorMessage.classList.remove('hidden');
        setTimeout(() => {
          errorMessage.classList.add('hidden');
        }, 3000);
      }
    }
  };

  useEffect(() => {
    if (carDetails?.price) {
      const prices = calculatePrices();
      setTotalPrice(prices.total);
    }
  }, [carDetails, appliedPromo, formData.reservation.pickupDate, formData.reservation.dropDate, calculatePrices]);

  const handleDateChange = (type: 'pickupDate' | 'dropDate', value: string) => {
    handleInputChange("reservation", type, value);
    
    // Recalculate prices when dates change
    const prices = calculatePrices();
    setTotalPrice(prices.total);
  };

  // Add duration change handler
  const handleDurationChange = (value: number) => {
    setRentalDuration(value);
    const prices = calculatePrices();
    setTotalPrice(prices.total);
  };

  const handlePayment = () => {
    const prices = calculatePrices();
    
    // Debug log to see the form structure
    console.log('Billing Info:', formData.billingInfo);
    
    const paymentDetails = {
      amount: prices.total,
      carName: carDetails?.name || '',
      name: formData.billingInfo.name || '', // Make sure this matches your form field
      rentalDuration: rentalDuration,
      pickupDate: formData.reservation.pickupDate,
      dropDate: formData.reservation.dropDate,
      carImage: carDetails?.image || '',
      subtotal: prices.subtotal,
      tax: prices.tax,
      discount: prices.discount
    };

    console.log('Payment Details being sent:', paymentDetails); // Debug log

    const queryString = Object.entries(paymentDetails)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    const url = `/stripe-testing?${queryString}`;
    router.push(url);
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
                  <p className="text-gray-500">Please select your rental date</p>
                  <p className="text-gray-500">Step 2 of 4</p>
                </div>
                <div className="space-y-6">
                  {[
                    { type: "pickup", label: "Pick-Up" },
                    { type: "drop", label: "Drop-Off" },
                  ].map((item) => (
                    <div key={item.type} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          name="rentalType" 
                          id={item.type} 
                          defaultChecked={item.type === "pickup"} 
                        />
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
                              onChange={(e) => 
                                field.label === "Date" 
                                  ? handleDateChange(field.name as 'pickupDate' | 'dropDate', e.target.value)
                                  : handleInputChange("reservation", field.name, e.target.value)
                              }
                              min={field.label === "Date" && item.type === "drop" ? formData.reservation.pickupDate : undefined}
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
                  <button 
                    onClick={handlePayment}
                    className="bg-[#3563E9] w-[120px] md:w-[140px] h-[48px] md:h-[56px] text-white rounded-md font-medium hover:bg-blue-600"
                  >
                    Pay Now
                  </button>
                </div>
              </section>
            </form>
           
          </div>

         
{/* 
          {/* Right Section (Summary) */}
          <div className="order-1 lg:order-2 space-y-8">
          
          
            
      
                <section className="p-4 sm:p-6 lg:p-8 border rounded-lg  bg-white">
                  <h2 className="text-xl font-bold mb-4">Rental Summary</h2>
                  <p className="text-gray-500 mb-8">
                    Prices may change depending on the length of the rental and the price of your rental car.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="relative w-[132px] h-[108px] bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
                      <Image
                        src={carDetails?.image}
                        alt={carDetails?.name || "Car"}
                        width={132}
                        height={108}
                        className="w-full h-full object-contain p-2"
                        priority
                      />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold">{carDetails?.name}</h3>
                      <div className="flex items-center gap-[4px]">
                        <p className="text-yellow-500 flex items-center gap-[2px]">
                         
                           <Rating />
                        </p>
                       
                      </div>
                    </div>
                  </div>
                  <hr className="text-gray-500 mt-10" />
                  <div className="space-y-6">
                    {/* Rental Duration Selector */}
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[#90A3BF] font-medium">Rental Duration</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => handleDurationChange(Math.max(1, rentalDuration - 1))}
                          className="w-8 h-8 rounded-full bg-[#F6F7F9] flex items-center justify-center text-[#90A3BF] hover:bg-[#3563E9] hover:text-white transition-colors"
                        >
                          -
                        </button>
                        <span className="font-semibold min-w-[40px] text-center">
                          {rentalDuration} day{rentalDuration > 1 ? 's' : ''}
                        </span>
                        <button 
                          onClick={() => handleDurationChange(rentalDuration + 1)}
                          className="w-8 h-8 rounded-full bg-[#F6F7F9] flex items-center justify-center text-[#90A3BF] hover:bg-[#3563E9] hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price per Day */}
                    <div className="flex justify-between items-center">
                      <span className="text-[#90A3BF] font-medium">Price per Day</span>
                      <span className="font-semibold">${calculatePrices().pricePerDay}</span>
                    </div>

                    {/* Subtotal with duration calculation */}
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[#90A3BF] font-medium">Subtotal</span>
                        <span className="text-xs text-[#90A3BF]">
                          (${calculatePrices().pricePerDay} × {rentalDuration} days)
                        </span>
                      </div>
                      <span className="font-semibold">${calculatePrices().subtotal}</span>
                    </div>

                    {/* Tax */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-[#90A3BF] font-medium">Tax</span>
                        <span className="text-xs text-[#90A3BF]">(10%)</span>
                      </div>
                      <span className="font-semibold">${calculatePrices().tax}</span>
                    </div>

                    {/* Promo Code Section */}
                    <div className="space-y-2">
                      <div className="relative group">
                        <button className="flex items-center gap-1 text-sm text-[#90A3BF] hover:text-[#3563E9]">
                          <IoInformationCircleOutline className="w-5 h-5" />
                          <span>Available discounts</span>
                        </button>
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
                          <div className="bg-white shadow-lg rounded-lg p-4 w-64 border border-gray-100">
                            <h4 className="font-semibold text-sm text-gray-800 mb-2">Available Offers:</h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#3563E9] rounded-full"></span>
                                <span>15% off on your first booking</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#3563E9] rounded-full"></span>
                                <span>Special weekend discounts</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center p-3 border rounded-lg w-full h-[56px] bg-[#F6F7F9]">
                        <input
                          type="text"
                          placeholder="Got a promo code? Enter here"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1 bg-transparent outline-none font-medium text-base text-[#90A3BF] placeholder:text-[#90A3BF]"
                        />
                        <button
                          onClick={handleApplyPromo}
                          className={`w-[120px] px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            appliedPromo 
                              ? 'bg-green-500 text-white' 
                              : 'bg-[#3563E9] text-white hover:bg-[#2651CD] hover:shadow-md'
                          }`}
                        >
                          {appliedPromo ? (
                            <div className="flex items-center gap-2">
                              <span>Applied</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          ) : (
                            'Apply'
                          )}
                        </button>
                      </div>

                      {/* Discount (if applied) */}
                      {appliedPromo && (
                        <div className="flex justify-between items-center text-green-500">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Discount</span>
                            <span className="text-xs">(15%)</span>
                          </div>
                          <span className="font-semibold">-${calculatePrices().discount}</span>
                        </div>
                      )}
                    </div>

                    {/* Total Price */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <h4 className="font-bold text-lg">Total Rental Price</h4>
                          <p className="text-sm text-[#90A3BF]">
                            Overall price for {rentalDuration} day{rentalDuration > 1 ? 's' : ''} rental
                          </p>
                        </div>
                        <span className="text-3xl font-bold">${calculatePrices().total}</span>
                      </div>
                    </div>
                  </div>
                </section> 
          </div>
        </div>
      </div>
      </div>
  
  );
}

export default RentalForm;