import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../assets/css/payment.css";

const Payment = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const cart = location.state?.cart;

    const [paymentMethod, setPaymentMethod] = useState("razorpay");
    const [loading, setLoading] = useState(false);

    if (!cart) {
        return (
            <div className="payment-container">
                <h2>No Cart Found</h2>
            </div>
        );
    }

    const total = cart.cartTotal;

    const payNow = () => {

        setLoading(true);

        if (paymentMethod === "cod") {

            setTimeout(() => {

                navigate("/payment-success", {

                    state: {

                        amount: total,

                        paymentMethod: "Cash On Delivery",

                        transactionId: "COD-" + Date.now()

                    }

                });

            }, 1500);

            return;
        }

        // Razorpay integration will come later

        setTimeout(() => {

            navigate("/payment-success", {

                state: {

                    amount: total,

                    paymentMethod: paymentMethod,

                    transactionId: "TXN" + Date.now()

                }

            });

        }, 1500);

    };

    return (

        <div className="payment-container">

            <div className="payment-card">

                <h1>Secure Payment</h1>

                <div className="summary-box">

                    <h2>Order Summary</h2>

                    {

                        cart.items.map(item => (

                            <div
                                className="summary-item"
                                key={item._id}
                            >

                                <div>

                                    <strong>

                                        {item.productName}

                                    </strong>

                                    <p>

                                        ₹{item.price} × {item.quantity}

                                    </p>

                                </div>

                                <h4>

                                    ₹{item.subtotal}

                                </h4>

                            </div>

                        ))

                    }

                    <hr />

                    <div className="grand-total">

                        <h2>Total</h2>

                        <h2>

                            ₹{total}

                        </h2>

                    </div>

                </div>

                <div className="payment-method">

                    <h2>

                        Select Payment Method

                    </h2>

                    <label>

                        <input

                            type="radio"

                            checked={paymentMethod === "razorpay"}

                            onChange={() =>

                                setPaymentMethod("razorpay")

                            }

                        />

                        Razorpay

                    </label>

                    <label>

                        <input

                            type="radio"

                            checked={paymentMethod === "upi"}

                            onChange={() =>

                                setPaymentMethod("upi")

                            }

                        />

                        UPI

                    </label>

                    <label>

                        <input

                            type="radio"

                            checked={paymentMethod === "cod"}

                            onChange={() =>

                                setPaymentMethod("cod")

                            }

                        />

                        Cash On Delivery

                    </label>

                </div>

                <button

                    className="pay-btn"

                    onClick={payNow}

                    disabled={loading}

                >

                    {

                        loading

                            ?

                            "Processing..."

                            :

                            `Pay ₹${total}`

                    }

                </button>

            </div>

        </div>

    );

};

export default Payment;