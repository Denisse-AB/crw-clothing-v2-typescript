import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user-selector';
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentFormContainer, FormContainer, PaymentButton, StripeError } from "./payment-form-style";
import { BUTTON_TYPE_CLASSES } from '../button/button';

const PaymentForm = () => {
  const elements = useElements();
  const stripe = useStripe();
  const user = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment ] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any | null>(null);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/thankyou/',
        payment_method_data: {
          billing_details: {
            name: user ? user.displayName : 'Guest',
            email: 'example@gmail.com',
            phone: '7873679090',
            address: {
              line1: 'Example Building #129',
              city: 'Carolina',
              state: 'PR',
              postal_code: '00987',
              country: 'US'
            }
          }
        }
      },
    });

    setIsProcessingPayment(false);

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        {!isProcessingPayment && <h4>Loading Stripe...</h4>}
        <PaymentElement />
        {errorMessage && <StripeError>{errorMessage}</StripeError>}
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