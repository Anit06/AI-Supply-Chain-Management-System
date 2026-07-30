function CartSummary({ items, onContinueShopping, onPlaceOrder, loading }) {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const grandTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-summary">
            <h3>Cart Summary</h3>
            {items.length === 0 ? <p>No items in cart.</p> : (
                <>
                    {items.map((item) => (
                        <div key={item._id || item.productId} className="cart-row">
                            <span>{item.productName || item.productId?.name}</span>
                            <span>₹{item.price * item.quantity}</span>
                        </div>
                    ))}
                    <hr />
                    <div className="cart-row"><strong>Total Items</strong><strong>{totalItems}</strong></div>
                    <div className="cart-row total"><strong>Grand Total</strong><strong>₹{grandTotal}</strong></div>
                    <button type="button" className="checkout-btn" onClick={onContinueShopping}>Continue Shopping</button>
                    <button type="button" className="checkout-btn" onClick={onPlaceOrder} disabled={loading}>
                        {loading ? "Placing Order..." : "Place Order"}
                    </button>
                </>
            )}
        </div>
    );
}

export default CartSummary;
