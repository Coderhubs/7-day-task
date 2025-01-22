export interface BillingInfo {
    name: string;
    phone: string;
    address: string;
    city: string;
  }
  
  export interface Reservation {
    pickupLocation: string;
    pickupDate: string;
    dropLocation: string;
    dropDate: string;
  }
  
  export interface CreditCardDetails {
    cardNumber: string;
    expirationDate: string;
    cvc: string;
  }
  
  export interface FormData {
    billingInfo: BillingInfo;
    reservation: Reservation;
    paymentMethod: 'Credit Card' | 'PayPal' | 'Bitcoin';
    creditCardDetails: CreditCardDetails;
    agreement: boolean;
  }
  
  