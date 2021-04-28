import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Instance } from "../../axios";
import { paymentRequests, orderRequests } from "../../request";
import { isAuthenticated } from "../auth/AuthHelpers";
import { Slide, toast } from "react-toastify";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addProduct } from "../../redux/actions";
const CheckoutForm = ({amount}) => {

    const user = isAuthenticated();
    const history = useHistory();
    const dispatch = useDispatch();

    //REDUX states
    const cartProducts = useSelector(state => state.cart.cartProducts);

    //REACT states
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        getPaymentIntent();
    }, []);

    const getPaymentIntent = async () => {
        let reqBody = {amount};
        let result = await Instance.post(paymentRequests.createPayment, reqBody, {
            headers: {
                'Authorization': user.token,
            }
        }).catch(error => {
            if(error.response){
                console.log("--->Error",error)
            }
        });

        if(result && result.data){
            setClientSecret(result.data.data.clientSecret);
        }
    }

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        if(event.error){
            setError(event.error.message);
            toast.error(event.error.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        let selectedSizes = cartProducts.map((product)=>{
            let size = product.sizes.filter((size)=>size.size === product.selectedSize);
            return ({ product: product._id, size: size[0]._id, qty: product.qty, price: product.sellingPrice })
        });

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: elements.getElement(CardElement)
            }
        });

        if(payload.error){
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            let reqBody = {
                products: selectedSizes,
                totalAmount: amount,
                transactionId: payload.paymentIntent.id,
            }

            let result = await Instance.post(orderRequests.Order, reqBody, {
                headers: {
                    'Authorization': user.token,
                }
            }).catch(error => {
                if(error.response){
                    console.log("--->Error",error)
                }
            });

            if(result && result.data) {
                setError(null);
                setProcessing(false);
                setSucceeded(true);
                toast(<h3>Order Placed</h3>, {
                    position: 'top-center',
                    transition: Slide
                });
                setTimeout(() => {
                    dispatch(addProduct([]));
                    history.push(`/account/orders`)
                }, 2000);

            }
        }
    }

    return (
        <>
            <Grid container justify="space-between">
                <h4>Credit/Debit Card</h4>
            </Grid>
            <form id="payment-form" onSubmit={handleSubmit} style={{marginTop:"10px"}}>
                <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                <button
                    disabled={processing || disabled || succeeded}
                    id="submit"
                >
                    <span id="button-text">
                    {processing ? (
                        <div className="spinner" id="spinner"></div>
                    ) : (
                        "PLACE ORDER"
                    )}
                    </span>
                </button>
            </form>
        </>
    )
}

export default CheckoutForm
