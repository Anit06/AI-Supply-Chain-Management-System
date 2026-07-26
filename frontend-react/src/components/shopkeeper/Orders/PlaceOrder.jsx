// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getCart, placeOrder, removeCartItem, updateCart } from "../../../services/cartService";
// import { getWarehouseById } from "../../../services/warehouseService";

// function PlaceOrder() {
//   const navigate = useNavigate();
//   const [warehouse, setWarehouse] = useState(null);
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const storedWarehouse = localStorage.getItem("selectedWarehouse");
//     if (!storedWarehouse) {
//       navigate("/shopkeeper/product-catalog");
//       return;
//     }

//     const loadData = async () => {
//       try {
//         const warehouseResponse = await getWarehouseById(storedWarehouse);
//         setWarehouse(warehouseResponse.warehouse || warehouseResponse);
//         const cartResponse = await getCart(storedWarehouse);
//         setCart(cartResponse.data.cart || { items: [] });
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     loadData();
//   }, [navigate]);

//   const loadCart = async () => {
//     const storedWarehouse = localStorage.getItem("selectedWarehouse");
//     if (!storedWarehouse) {
//       navigate("/shopkeeper/product-catalog");
//       return;
//     }

//     try {
//       const cartResponse = await getCart(storedWarehouse);
//       setCart(cartResponse.data.cart || { items: [] });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleIncrease = async (item) => {
//     try {
//       await updateCart({ warehouseId: item.warehouseId || localStorage.getItem("selectedWarehouse"), productId: item.productId._id || item.productId, quantity: item.quantity + 1 });
//       await loadCart();
//     } catch (error) {
//       alert(error.response?.data?.message || error.message);
//     }
//   };

//   const handleDecrease = async (item) => {
//     if (item.quantity <= 1) {
//       return;
//     }

//     try {
//       await updateCart({ warehouseId: item.warehouseId || localStorage.getItem("selectedWarehouse"), productId: item.productId._id || item.productId, quantity: item.quantity - 1 });
//       await loadCart();
//     } catch (error) {
//       alert(error.response?.data?.message || error.message);
//     }
//   };

//   const handleRemove = async (item) => {
//     try {
//       await removeCartItem(item.productId._id || item.productId, localStorage.getItem("selectedWarehouse"));
//       await loadCart();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handlePlaceOrder = async () => {
//     if (!cart?.items?.length) {
//       alert("Cart is empty");
//       return;
//     }

//     setLoading(true);
//     try {
//       await placeOrder(localStorage.getItem("selectedWarehouse"));
//       alert("Order placed successfully");
//       navigate("/shopkeeper/order-history");
//     } catch (error) {
//       alert(error.response?.data?.message || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="catalog-container">
//       <h2></h2>
//       {warehouse && <p><strong>Selected Warehouse:</strong> {warehouse.name}</p>}
//       {cart?.items?.length ? (
//         <div className="cart-summary">
//           {cart.items.map((item) => (
//             <div key={item._id || item.productId} className="cart-row">
//               <div>
//                 <strong>{item.productName || item.productId?.name}</strong>
//                 <p>₹{item.price} × {item.quantity}</p>
//               </div>
//               <div className="quantity-box">
//                 <button type="button" onClick={() => handleDecrease(item)}>-</button>
//                 <span>{item.quantity}</span>
//                 <button type="button" onClick={() => handleIncrease(item)}>+</button>
//               </div>
//               <button type="button" className="remove-btn" onClick={() => handleRemove(item)}>Remove</button>
//             </div>
//           ))}
//           <hr />
//           <div className="cart-row"><strong>Total Items</strong><strong>{cart.items.reduce((sum, item) => sum + item.quantity, 0)}</strong></div>
//           <div className="cart-row total"><strong>Grand Total</strong><strong>₹{cart.cartTotal || 0}</strong></div>
//           <button type="button" className="checkout-btn" onClick={handlePlaceOrder} disabled={loading}>
//             {loading ? "Placing Order..." : ""}
//           </button>
//         </div>
//       ) : (
//         <p>No items to .</p>
//       )}
//     </div>
//   );
// }

// export default PlaceOrder;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { placeOrder } from "../../../services/orderService";
import "./PlaceOrder.css";

function PlaceOrder() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [cart, setCart] = useState([]);

    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [notes, setNotes] = useState("");
    const [supplier, setSupplier] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/products",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProducts(res.data.products || []);
        } catch (error) {
            console.log(error);
            alert("Unable to load products.");
        }
    }

    function addToCart() {
        if (!selectedProduct) {
            alert("Please select a product.");
            return;
        }

        const product = products.find(
            (p) => p._id === selectedProduct
        );

        if (!product) return;

        const existingItem = cart.find(
            (item) => item.product === selectedProduct
        );

        if (existingItem) {
            const updatedCart = cart.map((item) => {
                if (item.product === selectedProduct) {
                    return {
                        ...item,
                        quantity: item.quantity + quantity,
                    };
                }

                return item;
            });

            setCart(updatedCart);
        } else {
            setCart([
                ...cart,
                {
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    quantity,
                    image:
                        product.image ||
                        "https://placehold.co/120x120?text=Product",
                    category:
                        product.category?.name ||
                        product.category ||
                        "General",
                },
            ]);
        }

        setSelectedProduct("");
        setQuantity(1);
    }

    function removeItem(id) {
        setCart(
            cart.filter((item) => item.product !== id)
        );
    }

    function increaseQuantity(id) {
        setCart(
            cart.map((item) => {
                if (item.product === id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }

                return item;
            })
        );
    }

    function decreaseQuantity(id) {
        setCart(
            cart.map((item) => {
                if (
                    item.product === id &&
                    item.quantity > 1
                ) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                }

                return item;
            })
        );
    }

    const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const gst = Math.round(totalAmount * 0.18);
    const handlingFee = 25;

    const grandTotal =
        totalAmount +
        gst +
        handlingFee;

    async function submitOrder() {
        if (cart.length === 0) {
            alert("Cart is empty.");
            return;
        }

        try {
            setLoading(true);

            const order = {
                supplier,
                deliveryAddress,
                notes,
                items: cart.map((item) => ({
                    product: item.product,
                    quantity: item.quantity,
                })),
            };

            const response = await placeOrder(order);

            alert(response.message);

            setCart([]);
            setSupplier("");
            setDeliveryAddress("");
            setNotes("");
        } catch (error) {
            console.log(error);
            alert("Failed to .");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="place-order">
            <h2>Place Order</h2>

            <div className="order-form">

                <label>Select Product</label>

                <select
                    value={selectedProduct}
                    onChange={(e) =>
                        setSelectedProduct(e.target.value)
                    }
                >
                    <option value="">
                        Select Product
                    </option>

                    {products.map((product) => (
                        <option
                            key={product._id}
                            value={product._id}
                        >
                            {product.name} - ₹{product.price}
                        </option>
                    ))}
                </select>

                <label>Quantity</label>

                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                        setQuantity(Number(e.target.value))
                    }
                />

                <button onClick={addToCart}>
                    Add To Cart
                </button>

            </div>

            <h3 className="cart-heading">
                Cart Items
            </h3>
                        {
                cart.length === 0 ? (

                    <div className="empty-cart">

                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                            alt="Empty Cart"
                        />

                        <h3>Your Cart is Empty</h3>

                        <p>
                            Add products to continue.
                        </p>

                    </div>

                ) : (

                    <div className="cart-container">

                        {
                            cart.map((item) => (

                                <div
                                    key={item.product}
                                    className="cart-card"
                                >

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />

                                    <div className="cart-details">

                                        <h3>{item.name}</h3>

                                        <p>{item.category}</p>

                                        <h2>
                                            ₹{item.price.toLocaleString()}
                                        </h2>

                                        <h4>
                                            Subtotal :
                                            ₹
                                            {(
                                                item.price *
                                                item.quantity
                                            ).toLocaleString()}
                                        </h4>

                                    </div>

                                    <div className="cart-actions">

                                        <div className="qty-box">

                                            <button
                                                onClick={() =>
                                                    decreaseQuantity(
                                                        item.product
                                                    )
                                                }
                                            >
                                                −
                                            </button>

                                            <span>
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    increaseQuantity(
                                                        item.product
                                                    )
                                                }
                                            >
                                                +
                                            </button>

                                        </div>

                                        <button
                                            className="remove-btn"
                                            onClick={() =>
                                                removeItem(
                                                    item.product
                                                )
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                )
            }

            <div className="bill-card">

                <h2>Bill Details</h2>

                <div className="bill-row">
                    <span>Item Total</span>
                    <span>
                        ₹{totalAmount.toLocaleString()}
                    </span>
                </div>

                <div className="bill-row">
                    <span>GST (18%)</span>
                    <span>
                        ₹{gst.toLocaleString()}
                    </span>
                </div>

                <div className="bill-row">
                    <span>Handling Fee</span>
                    <span>
                        ₹{handlingFee}
                    </span>
                </div>

                <div className="bill-row">
                    <span>Delivery Fee</span>
                    <span>FREE</span>
                </div>

                <hr />

                <div className="bill-total">

                    <strong>Total</strong>

                    <strong>
                        ₹{grandTotal.toLocaleString()}
                    </strong>

                </div>

            </div>

            <div className="delivery-form">

                <textarea
                    placeholder="Delivery Address"
                    value={deliveryAddress}
                    onChange={(e) =>
                        setDeliveryAddress(
                            e.target.value
                        )
                    }
                />

                <textarea
                    placeholder="Additional Notes"
                    value={notes}
                    onChange={(e) =>
                        setNotes(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Supplier ID"
                    value={supplier}
                    onChange={(e) =>
                        setSupplier(e.target.value)
                    }
                />

                <button
                    className="place-btn"
                    onClick={submitOrder}
                    disabled={loading}
                >
                    {
                        loading
                            ? "Placing Order..."
                            : "Place Order"
                    }
                </button>

            </div>

        </div>
    );
}

export default PlaceOrder;