import axios from "axios";

// Change this if your backend URL is different
const API = "http://localhost:5000/api/payment";

/*
==================================
Create Razorpay Order
==================================
*/

export const createOrder = async (amount) => {

    const response = await axios.post(

        `${API}/create-order`,

        {
            amount
        }

    );

    return response.data;

};

/*
==================================
Verify Razorpay Payment
==================================
*/

export const verifyPayment = async (paymentData) => {

    const response = await axios.post(

        `${API}/verify`,

        paymentData

    );

    return response.data;

};

/*
==================================
Cash On Delivery
==================================
*/

export const cashOnDelivery = async (orderData) => {

    const response = await axios.post(

        `${API}/cod`,

        orderData

    );

    return response.data;

};

/*
==================================
Save Payment
==================================
*/

export const savePayment = async (paymentData) => {

    const response = await axios.post(

        `${API}/save-payment`,

        paymentData

    );

    return response.data;

};

/*
==================================
Get Payment History
==================================
*/

export const getPaymentHistory = async () => {

    const response = await axios.get(

        `${API}/history`

    );

    return response.data;

};