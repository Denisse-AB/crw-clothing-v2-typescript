import PaymentStatus from "../../components/payment-form/payment-status";
import { PaymentStatusContainer } from "./thankyou-style";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('YOUR_PUBLIC_KEY');

const ThankyouPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentStatusContainer>
        <PaymentStatus />
      </PaymentStatusContainer>
    </Elements>
  )
};

export default ThankyouPage;