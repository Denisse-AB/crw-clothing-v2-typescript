import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { setCartItems, stripeSecretAction } from '../../store/cart/cart-actions';

const PaymentStatus = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const [message, setMessage] = useState<any | null>(null);

    useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret: string | any = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    // Retrieve the PaymentIntent
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({paymentIntent}: any | undefined) => {
        switch (paymentIntent.status) {
          case 'succeeded':
            // Clear the whole cart
            setMessage('Success! Payment received.');
            dispatch(setCartItems([]));
            dispatch(stripeSecretAction(null));
            break;

          case 'processing':
            setMessage("Payment processing. We'll update you when payment is received.");
            break;

          case 'requires_payment_method':
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage('Payment failed. Please try another payment method.');
            navigate(-1);
            break;

          default:
            setMessage('Something went wrong.');
            navigate(-1);
            break;
        }
      });
  }, [stripe]);

  return message;
};

export default PaymentStatus;