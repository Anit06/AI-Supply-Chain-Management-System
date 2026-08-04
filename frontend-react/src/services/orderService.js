import api from "./api";

/*
==================================
GET ORDERS
==================================
*/

export const getOrders = async () => {

    const response = await api.get("/orders");

    return response.data;
};

/*
==================================
GET ORDER DETAILS
==================================
*/

export const getOrder = async (id) => {

    const response = await api.get(`/orders/${id}`);

    return response.data;
};

/*
===========================
ADMIN GET ORDERS
===========================
*/

export const getAllOrders = async()=>{

    const response = await api.get("/orders/admin");

    return response.data;

};

/*
===========================
UPDATE STATUS
===========================
*/

export const updateOrderStatus = async(

    id,

    status,

    supplierId = null

)=>{

    const response = await api.put( 

        `/orders/${id}/status`,

        {

            status,

            supplierId

        }

    );

    return response.data;

};

/*
===========================
ADMIN ORDER DETAILS
===========================
*/

export const getAdminOrder = async (id) => {

    const response = await api.get(

        `/orders/admin/${id}`

    );

    return response.data;

};

/*
=========================
ORDER ANALYTICS
=========================
*/

export const getOrderAnalytics = async () => {

    const response = await api.get(

        "/orders/admin/analytics"

    );

    return response.data;

};