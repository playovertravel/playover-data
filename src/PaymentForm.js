import React from 'react';
import { CardPayment } from '@duffel/components'
//import Box from '@mui/material/Box';
import '@duffel/components/dist/CardPayment.min.css'

// https://duffel.com/docs/guides/collecting-customer-card-payments
export default function PaymentForm({ paymentClientToken }) {
  const successfulPaymentHandlerFn = () => {
    console.log("yay");
  }

  const errorPaymentHandlerFn = () => {
  // Show error page
    console.log("shit the bed");
  }

  return (
    <CardPayment
      duffelPaymentIntentClientToken={paymentClientToken} // this comes from the response to the create-intent endpoint in your API gateway
      successfulPaymentHandler={successfulPaymentHandlerFn} 
      errorPaymentHandler={errorPaymentHandlerFn}
    />
  );
}

/*


      <Box
        sx={{
          flex: 1,
          width: 700,
          padding: 5,
          margin: 5,
          color: 'black',
          borderRadius: 5,
          backgroundColor: 'white'
        }}
      >
      
    </Box>

    */
