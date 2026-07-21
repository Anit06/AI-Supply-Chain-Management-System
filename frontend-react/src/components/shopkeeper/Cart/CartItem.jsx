function CartItem({ item, onIncrease, onDecrease, onRemove }) {
    return (
        <div className="cart-row">
            <div>
                <strong>{item.productName || item.productId?.name}</strong>
                <p>₹{item.price} × {item.quantity}</p>
            </div>
            <div className="quantity-box">
                <button type="button" onClick={() => onDecrease(item)}>-</button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => onIncrease(item)}>+</button>
            </div>
            <button type="button" onClick={() => onRemove(item)} className="checkout-btn">Remove</button>
        </div>
    );
}

export default CartItem;
