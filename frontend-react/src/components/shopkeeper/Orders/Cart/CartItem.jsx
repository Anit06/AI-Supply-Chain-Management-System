import React from "react";
import { Trash2 } from "lucide-react";

function CartItem({
    item,
    increaseQty,
    decreaseQty,
    removeItem
}) {

    return (

        <div className="cart-item">

            <img
                src={item.image}
                alt={item.name}
                className="cart-image"
            />

            <div className="cart-info">

                <h3>{item.name}</h3>

                <p>{item.category}</p>

                <h4>
                    ₹{item.price.toLocaleString()}
                </h4>

            </div>

            <div className="cart-actions">

                <div className="qty-box">

                    <button
                        onClick={() => decreaseQty(item.id)}
                    >
                        −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                        onClick={() => increaseQty(item.id)}
                    >
                        +
                    </button>

                </div>

                <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                >

                    <Trash2 size={18} />

                    Remove

                </button>

            </div>

        </div>

    );

}

export default CartItem;