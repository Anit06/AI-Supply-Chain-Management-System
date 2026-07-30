import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
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

  const totalAmount = cart.cartTotal;

  const handlePayment = async () => {
    try {
      setLoading(true);

      if (paymentMethod === "cod") {
        await axios.post("http://localhost:5000/api/payment/cod", {
          amount: totalAmount,
          cart
        });

        navigate("/payment-success", {
          state: {
            amount: totalAmount,
            method: "Cash On Delivery"
          }
        });

        return;
      }

      if (paymentMethod === "upi") {
        const res = await axios.post(
          "http://localhost:5000/api/payment/create-order",
          {
            amount: totalAmount
          }
        );

        openRazorpay(res.data.order);
        return;
      }

      if (paymentMethod === "razorpay") {
        const res = await axios.post(
          "http://localhost:5000/api/payment/create-order",
          {
            amount: totalAmount
          }
        );

        openRazorpay(res.data.order);
      }
    } catch (err) {
      console.log(err);

      navigate("/payment-failed");
    } finally {
      setLoading(false);
    }
  };

  const openRazorpay = (order) => {
    const options = {
      key: "YOUR_RAZORPAY_KEY",

      amount: order.amount,

      currency: order.currency,

      name: "Supply Chain Management",

      description: "Product Purchase",

      order_id: order.id,

      handler: async function (response) {

        await axios.post(
          "http://localhost:5000/api/payment/verify",
          {
            ...response,

            amount: totalAmount
          }
        );

        navigate("/payment-success", {
          state: {
            amount: totalAmount,

            transactionId:
              response.razorpay_payment_id,

            method: paymentMethod
          }
        });
      },

      theme: {
        color: "#1976d2"
      }
    };

    const razor = new window.Razorpay(options);

    razor.open();
  };

  return (
    <div className="payment-container">

      <div className="payment-card">

        <h2>Secure Checkout</h2>

        <div className="order-summary">

          <h3>Order Summary</h3>

          {
            cart.items.map((item) => (

              <div
                key={item._id}
                className="summary-item"
              >

                <div>

                  <strong>
                    {item.productName}
                  </strong>

                  <p>

                    ₹{item.price} × {item.quantity}

                  </p>

                </div>

                <div>

                  ₹{item.subtotal}

                </div>

              </div>

            ))
          }

          <hr />

          <div className="grand-total">

            <h2>

              Total :

            </h2>

            <h2>

              ₹{totalAmount}

            </h2>

          </div>

        </div>

        <div className="payment-method">

          <h3>

            Select Payment Method

          </h3>

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
          onClick={handlePayment}
          disabled={loading}
        >

          {
            loading
              ? "Processing..."
              : `Pay ₹${totalAmount}`
          }

        </button>

      </div>

    </div>
  );
};

export default Payment;