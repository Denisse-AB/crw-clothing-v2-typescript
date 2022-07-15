import { loadStripe } from "@stripe/stripe-js";

// use type assertion
const nodeEnv: string = (process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string);

export const stripePromise = loadStripe(
  nodeEnv
);