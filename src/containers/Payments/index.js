import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addPaymentId } from "../../utils/api";
import { Grid } from "@material-ui/core";

const stripPromise = loadStripe(
  "pk_test_51HjQRyGP0tr1kCVFaY0oL6GnPhCIFwaBqO8zOsUwvOG6jTMjMgsPIn2AM8ZQ8EQxurRL2SoQFc6DsBa1pKQDp2JJ00ZQ9HZcRb"
);

const publickey =
  "pk_test_51Hh8pjDSutYf25MR45EQ9BEJjh2pj4qyL273jadjGfll9ENvf9bgHHS55bUynE50azFbxheQDunUT1XYBkY15VKg002HWTP304";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (ev) => {
    debugger;
    const card_details = elements.getElement(CardElement);
    ev.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      console.log(paymentMethod);
      const { id } = paymentMethod;
      const res = await addPaymentId({ id, amount: 200 });
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <CardElement />
      <Grid container alignContent="center" alignItems="center">
        <Grid item xs={8}>
          <TextField id="tip-amount" label="Amount" required type="number" />
        </Grid>
        <Grid item xs={2}>
          <Button
            size="small"
            color="primary"
            type="submit"
            variant="contained"
          >
            Pay
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default function Payments() {
  return (
    <Elements stripe={stripPromise}>
      <CheckoutForm />
    </Elements>
  );
}
