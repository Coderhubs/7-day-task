 const form = {
    name: 'form',
    type: 'document',
    title: 'Form',
    fields: [
      {
        name: 'billingInfo',
        type: 'object',
        title: 'Billing Information',
        fields: [
          { name: 'name', type: 'string', title: 'Name' },
          { name: 'phone', type: 'string', title: 'Phone Number' },
          { name: 'address', type: 'string', title: 'Address' },
          { name: 'city', type: 'string', title: 'City' },
        ],
      },
      {
        name: 'reservation',
        type: 'object',
        title: 'Reservation',
        fields: [
          { name: 'pickupLocation', type: 'string', title: 'Pick-Up Location' },
          { name: 'pickupDate', type: 'datetime', title: 'Pick-Up Date' },
          { name: 'dropLocation', type: 'string', title: 'Drop-Off Location' },
          { name: 'dropDate', type: 'datetime', title: 'Drop-Off Date' },
        ],
      },
      {
        name: 'paymentMethod',
        type: 'string',
        title: 'Payment Method',
        options: {
          list: ['Credit Card', 'PayPal', 'Bitcoin'],
        },
      },
      {
        name: 'creditCardDetails',
        type: 'object',
        title: 'Credit Card Details',
        hidden: ({ parent }: { parent: { paymentMethod: string } }) => parent?.paymentMethod !== 'Credit Card', // Corrected parent usage

        fields: [
          { name: 'cardNumber', type: 'string', title: 'Card Number' },
          { name: 'expirationDate', type: 'string', title: 'Expiration Date' },
          { name: 'cvc', type: 'string', title: 'CVC' },
        ],
      },
      {
        name: 'agreement',
        type: 'boolean',
        title: 'Terms & Conditions Agreement',
      },
    ],
  };
  export default  form;