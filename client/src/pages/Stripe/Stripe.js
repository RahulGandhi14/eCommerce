import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
import './Stripe.scss';

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Stripe = ({amount}) => {
    return (
        <Elements stripe={promise}>
            <CheckoutForm amount={amount}/>
        </Elements>
    )
}

export default Stripe
