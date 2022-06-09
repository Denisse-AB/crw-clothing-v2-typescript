import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectCartItems, selectCartTotal, selectIsClientSecret } from '../../store/cart/cart-selector';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

import CheckoutItem from '../../components/checkout-item/checkout-item';
import PaymentForm from '../../components/payment-form/payment-form';

import './checkout.scss';

const stripePromise = loadStripe('YOUR_PUBLIC_KEY');

export type StripeTypes = {
  readonly clientSecret: any | string;
  appearance: {
    theme: any | "stripe";
  }
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const secret = useSelector(selectIsClientSecret);

  useEffect(() => {
    if (!stripePromise || !secret) {
      navigate('/')
    }
  }, [stripePromise, secret])

  const options: StripeTypes = {
    // passing the client secret
    clientSecret: secret,
    // Fully customizable with appearance API.
    appearance: {
      theme: 'stripe'
    },
  };

  return (
    <div className='checkout-page'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className='total'>
        <span>Total: ${cartTotal}</span>
      </div>
      {secret &&
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm />
        </Elements>
      }
    </div>
  );
}

export default CheckoutPage;