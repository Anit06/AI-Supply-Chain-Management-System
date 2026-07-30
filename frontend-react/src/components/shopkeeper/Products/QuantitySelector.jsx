function QuantitySelector({ quantity, onIncrease, onDecrease, max }) {
    return (
        <div className="quantity-box">
            <button type="button" onClick={onDecrease} disabled={quantity <= 1}>
                -
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={onIncrease} disabled={quantity >= max}>
                +
            </button>
        </div>
    );
}

export default QuantitySelector;
