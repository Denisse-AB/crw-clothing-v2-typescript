import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';

import { selectCartTotal } from '../../store/cart/cart-selector';
import { selectCurrentUser } from '../../store/user/user-selector';

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from '@stripe/stripe-js';

import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form-style";

import { BUTTON_TYPE_CLASSES } from '../button/button';

const ifValidCardElement = (
  card: StripeCardElement | null
): card is StripeCardElement => card !== null;

const PaymentForm = () => {
  /*
    Payment form using netlify functions
  */
  const elements = useElements();
  const stripe = useStripe();
  const amount = useSelector(selectCartTotal);
  const user = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment ] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'Post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ amount: amount*100 }) // example amount
    }).then((res => res.json()));

     const {
      paymentIntent: { client_secret },
    } = response;

    const cardDetails = elements.getElement(CardElement);
    // ts guard
    if (!ifValidCardElement((cardDetails))) return;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: user ? user.displayName : 'Guest'
        }
      }
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error)
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('payment succeeded!')
      }
    }
  }

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Pay with credit card</h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={
            BUTTON_TYPE_CLASSES.inverted
          }
          >Pay with Stipe
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
};

export default PaymentForm;