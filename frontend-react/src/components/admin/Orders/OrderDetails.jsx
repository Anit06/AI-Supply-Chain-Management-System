import { useEffect,useState } from "react";

import { useNavigate,useParams } from "react-router-dom";

import {

    getAdminOrder,

    updateOrderStatus

} from "../../../services/orderService";

import OrderStatus from "./OrderStatus";

import "../../../assets/css/orderDetails.css";

function OrderDetails(){

    const {id}=useParams();

    const navigate=useNavigate();

    const [order,setOrder]=useState(null);

    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        loadOrder();

    },[]);

    const loadOrder=async()=>{

        const response=await getAdminOrder(id);

        setOrder(response.order);

        setLoading(false);

    };

    const changeStatus=async(status)=>{

        await updateOrderStatus(

            order._id,

            status

        );

        loadOrder();

        alert("Status Updated");

    };

    if(loading){

        return <h2>Loading...</h2>;

    }

    return(

        <div className="order-details-container">

            <button

                className="back-btn"

                onClick={()=>navigate(-1)}

            >

                Back

            </button>

            <h2>

                Admin Order Details

            </h2>

            <div className="order-info">

                <p>

                    <b>Customer :</b>

                    {order.userId?.name}

                </p>

                <p>

                    <b>Email :</b>

                    {order.userId?.email}

                </p>

                <p>

                    <b>Warehouse :</b>

                    {order.warehouseId?.name}

                </p>

                <p>

                    <b>Total :</b>

                    ₹{order.totalAmount}

                </p>

                <OrderStatus

                    status={order.status}

                    onChange={changeStatus}

                />

            </div>

            <hr/>

            {

                order.items.map(item=>(

                    <div

                        key={item._id}

                        className="detail-item"

                    >

                        <img

                            src={`http://localhost:5000/${item.image}`}

                            alt={item.productName}

                        />

                        <div className="detail-content">

                            <h3>

                                {item.productName}

                            </h3>

                            <p>

                                Qty :

                                {item.quantity}

                            </p>

                            <p>

                                Price :

                                ₹{item.price}

                            </p>

                            <p>

                                Subtotal :

                                ₹{item.subtotal}

                            </p>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default OrderDetails;