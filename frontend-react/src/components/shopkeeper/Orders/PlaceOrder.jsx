import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getCart,
    placeOrder
} from "../../../services/cartService";

import { getWarehouseById } from "../../../services/warehouseService";
import { getProfile } from "../../../services/shopkeeperService";

import "../../../assets/css/placeOrder.css";

const availableCoupons = {
    SAVE10: {
        type: "percent",
        value: 10,
        label: "10% off"
    },
    FLAT100: {
        type: "flat",
        value: 100,
        minAmount: 1000,
        label: "₹100 off"
    }
};

const formatAddress = (address) => {
    if (!address) return "";

    return [
        address.fullName,
        address.addressLine1,
        address.addressLine2,
        address.city,
        address.state,
        address.pincode
    ]
        .filter(Boolean)
        .join(", ");
};

function PlaceOrder() {
    const navigate = useNavigate();

    const [warehouse, setWarehouse] = useState(null);
    const [cart, setCart] = useState({ items: [], cartTotal: 0 });
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState("");
    const [showAddressList, setShowAddressList] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponMessage, setCouponMessage] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    const [originalTotal, setOriginalTotal] = useState(0);
    const [gstAmount, setGstAmount] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);

    useEffect(() => {
        const subtotal = cart.cartTotal || 0;
        setOriginalTotal(subtotal);

        // Calculate taxable amount after discount
        const taxableAmount = Math.max(subtotal - discountAmount, 0);

        // Calculate 18% GST
        const calculatedGst = Math.round(taxableAmount * 0.18);
        setGstAmount(calculatedGst);

        // Calculate Final Total: Subtotal - Discount + 18% GST
        setFinalAmount(taxableAmount + calculatedGst);
    }, [cart.cartTotal, discountAmount]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const warehouseId = localStorage.getItem("selectedWarehouse");

            if (!warehouseId) {
                navigate("/shopkeeper/cart");
                return;
            }

            const [warehouseResp, cartResp] = await Promise.all([
                getWarehouseById(warehouseId),
                getCart(warehouseId)
            ]);

            setWarehouse(warehouseResp.warehouse || warehouseResp);
            setCart(cartResp.cart || { items: [], cartTotal: 0 });

            const user = JSON.parse(localStorage.getItem("user") || "{}") || {};
            if (!user.id) return;

            const profileResp = await getProfile(user.id);
            const shopProfile = profileResp.data.profile;
            const savedAddresses = shopProfile.addresses || [];
            setAddresses(savedAddresses);

            if (savedAddresses.length > 0) {
                const defaultAddress = savedAddresses.find((item) => item.isDefault) || savedAddresses[0];
                setSelectedAddressId(defaultAddress._id);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const currentAddress = addresses.find((address) => address._id === selectedAddressId) || addresses[0] || null;

    const validateCoupon = (code, amount) => {
        const normalized = (code || "").trim().toUpperCase();

        if (!normalized) {
            return {
                valid: false,
                message: "Enter a coupon code"
            };
        }

        const coupon = availableCoupons[normalized];

        if (!coupon) {
            return {
                valid: false,
                message: "Invalid coupon code"
            };
        }

        if (coupon.type === "percent") {
            return {
                valid: true,
                amount: Math.round((amount * coupon.value) / 100),
                code: normalized,
                label: coupon.label,
                message: `${coupon.label} applied successfully`
            };
        }

        if (coupon.type === "flat") {
            if (amount < coupon.minAmount) {
                return {
                    valid: false,
                    message: `Minimum order value ₹${coupon.minAmount} required for this coupon`
                };
            }

            return {
                valid: true,
                amount: coupon.value,
                code: normalized,
                label: coupon.label,
                message: `${coupon.label} applied successfully`
            };
        }

        return {
            valid: false,
            message: "Invalid coupon code"
        };
    };

    const handleApplyCoupon = () => {
        const result = validateCoupon(couponCode, cart.cartTotal);

        if (!result.valid) {
            setAppliedCoupon(null);
            setDiscountAmount(0);
            setCouponMessage(result.message);
            return;
        }

        setAppliedCoupon(result);
        setDiscountAmount(result.amount);
        setCouponMessage(result.message);
    };

    const handlePlaceOrder = async () => {
        if (!cart.items.length) {
            alert("Your cart is empty.");
            return;
        }

        if (!currentAddress) {
            alert("Please select a saved delivery address or add one from Addresses.");
            return;
        }

        try {
            setPlacingOrder(true);
            const response = await placeOrder({
                warehouseId: localStorage.getItem("selectedWarehouse"),
                paymentMethod,
                couponCode: appliedCoupon?.code || "",
                discountAmount,
                subtotal: cart.cartTotal,
                taxAmount: gstAmount,
                finalAmount,
                addressId: currentAddress._id
            });

            alert(response.message || "Order placed successfully");
            localStorage.removeItem("selectedWarehouse");
            navigate("/shopkeeper/order-history");
        } catch (error) {
            alert(error.response?.data?.message || error.message || "Unable to place order.");
        } finally {
            setPlacingOrder(false);
        }
    };

    if (loading) {
        return <div className="catalog-container"><h2>Loading checkout...</h2></div>;
    }

    if (!cart.items.length) {
        return (
            <div className="catalog-container">
                <h2 className="page-title">Checkout</h2>
                <div className="empty-cart">
                    <h2>Your cart is empty</h2>
                    <p>Add items from the catalog to complete your order.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="catalog-container order-page">
            <div className="order-header">
                <div>
                    <p className="eyebrow">Checkout</p>
                    <h1>Review order and payment</h1>
                    <p className="subtext">Use saved address, select payment method, apply coupon and confirm your order.</p>
                </div>
            </div>

            <div className="order-grid">
                <section className="order-content">
                    <div className="card delivery-card">
                        <div className="card-title">
                            <div>
                                <h2>Delivery Address</h2>
                                <p>Selected shopkeeper address for delivery</p>
                            </div>
                            <button className="link-button" type="button" onClick={() => setShowAddressList((prev) => !prev)}>
                                {showAddressList ? "Hide Addresses" : "Change Address"}
                            </button>
                        </div>
                        {currentAddress ? (
                            <div className="address-preview">
                                <p><strong>{currentAddress.fullName}</strong></p>
                                <p>{currentAddress.phone}</p>
                                <p>{currentAddress.addressLine1}</p>
                                {currentAddress.addressLine2 && <p>{currentAddress.addressLine2}</p>}
                                <p>{currentAddress.city}, {currentAddress.state} {currentAddress.pincode}</p>
                            </div>
                        ) : (
                            <div className="alert-box">
                                No saved address found. Add an address from the Addresses page.
                            </div>
                        )}
                        {showAddressList && addresses.length > 0 && (
                            <div className="address-list">
                                {addresses.map((address) => (
                                    <label key={address._id} className={`address-option ${selectedAddressId === address._id ? "selected" : ""}`}>
                                        <input
                                            type="radio"
                                            name="deliveryAddress"
                                            value={address._id}
                                            checked={selectedAddressId === address._id}
                                            onChange={() => setSelectedAddressId(address._id)}
                                        />
                                        <div>
                                            <p><strong>{address.fullName}</strong> • {address.addressType}</p>
                                            <p>{formatAddress(address)}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="card payment-card">
                        <div className="card-title">
                            <div>
                                <h2>Payment Method</h2>
                                <p>Select how you'd like to pay for this order.</p>
                            </div>
                        </div>
                        <div className="payment-options">
                            {[
                                "Cash On Delivery",
                                "UPI",
                                "Credit Card",
                                "Debit Card",
                                "Net Banking"
                            ].map((method) => (
                                <label key={method} className={`payment-option ${paymentMethod === method ? "active" : ""}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value={method}
                                        checked={paymentMethod === method}
                                        onChange={() => setPaymentMethod(method)}
                                    />
                                    <span>{method}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="card coupon-card">
                        <div className="card-title">
                            <div>
                                <h2>Coupon Code</h2>
                                <p>Apply a discount coupon to reduce order cost.</p>
                            </div>
                        </div>
                        <div className="coupon-input-row">
                            <input
                                type="text"
                                placeholder="Enter coupon code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                            />
                            <button type="button" onClick={handleApplyCoupon}>
                                Apply
                            </button>
                        </div>
                        {couponMessage && (
                            <p className={`coupon-message ${appliedCoupon ? "success" : "error"}`}>
                                {couponMessage}
                            </p>
                        )}
                    </div>
                </section>

                <aside className="order-sidebar">
                    <div className="card summary-card">
                        <div className="card-title">
                            <div>
                                <h2>Order Summary</h2>
                                <p>{cart.items.length} items from {warehouse?.name || "warehouse"}</p>
                            </div>
                        </div>
                        <div className="summary-list">
                            {cart.items.map((item) => (
                                <div key={item._id} className="summary-item">
                                    <div>
                                        <strong>{item.productName}</strong>
                                        <p>{item.quantity} × ₹{item.price}</p>
                                    </div>
                                    <span>₹{item.subtotal}</span>
                                </div>
                            ))}
                        </div>
                        <div className="summary-total">
                            <div>
                                <span>Original Amount</span>
                                <strong>₹{originalTotal}</strong>
                            </div>
                            <div>
                                <span>Discount</span>
                                <strong>-₹{discountAmount}</strong>
                            </div>
                            <div>
                                <span>GST (18%)</span>
                                <strong>+₹{gstAmount}</strong>
                            </div>
                            <div className="final-row">
                                <span>Final Amount</span>
                                <strong>₹{finalAmount}</strong>
                            </div>
                        </div>
                        <button
                            className="checkout-btn"
                            onClick={handlePlaceOrder}
                            disabled={!currentAddress || placingOrder}
                        >
                            {placingOrder ? "Placing order..." : `Place Order ₹${finalAmount}`}
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default PlaceOrder;