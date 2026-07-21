import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/ProductCatalog.css";
import { getWarehouses } from "../../../services/warehouseService";
import { getWarehouseCatalog } from "../../../services/catalogService";
import { addToCart, getCart, updateCart, removeCartItem } from "../../../services/cartService";
import WarehouseSelector from "./WarehouseSelector";
import ProductCard from "./ProductCard";

function ProductCatalog() {
    const navigate = useNavigate();
    const [warehouses, setWarehouses] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        loadWarehouses();
    }, []);

    const loadWarehouses = async () => {
        try {
            const res = await getWarehouses();
            setWarehouses(res.warehouses || []);
        } catch (err) {
            console.log(err);
        }
    };

    const loadProducts = async (warehouseId) => {
        try {
            const res = await getWarehouseCatalog(warehouseId);
            setProducts(res.data?.products || []);
            localStorage.setItem("selectedWarehouse", warehouseId);
        } catch (err) {
            console.log(err);
        }
    };

    const loadCart = async (warehouseId) => {
        try {
            const response = await getCart(warehouseId);
            setCartItems(response.data?.cart?.items || []);
        } catch (error) {
            console.error(error);
        }
    };

    const clearSelection = () => {
        setSelectedQuantities({});
    };

    const increaseQuantity = (product) => {
        const currentQty = selectedQuantities[product.productId] || 0;
        if (currentQty >= product.stock) {
            alert(`Only ${product.stock} items available`);
            return;
        }
        setSelectedQuantities({ ...selectedQuantities, [product.productId]: currentQty + 1 });
    };

    const decreaseQuantity = (productId) => {
        const currentQty = selectedQuantities[productId] || 0;
        if (currentQty <= 1) {
            setSelectedQuantities({ ...selectedQuantities, [productId]: 0 });
            return;
        }
        setSelectedQuantities({ ...selectedQuantities, [productId]: currentQty - 1 });
    };

    const handleAddToCart = async (product) => {
        const quantity = selectedQuantities[product.productId] || 1;
        if (quantity <= 0) {
            alert("Quantity must be at least 1");
            return;
        }
        if (quantity > product.stock) {
            alert(`Only ${product.stock} items available`);
            return;
        }

        try {
            await addToCart({
                warehouseId: selectedWarehouse,
                productId: product.productId,
                productName: product.name,
                price: product.price,
                quantity,
                unit: product.unit || "KG"
            });
            setSelectedQuantities({ ...selectedQuantities, [product.productId]: 1 });
            await loadCart(selectedWarehouse);
            alert("Added to Cart");
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    const handleIncreaseCartItem = async (item) => {
        try {
            await updateCart({ warehouseId: selectedWarehouse, productId: item.productId._id || item.productId, quantity: item.quantity + 1 });
            await loadCart(selectedWarehouse);
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    const handleDecreaseCartItem = async (item) => {
        if (item.quantity <= 1) {
            return;
        }
        try {
            await updateCart({ warehouseId: selectedWarehouse, productId: item.productId._id || item.productId, quantity: item.quantity - 1 });
            await loadCart(selectedWarehouse);
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    const handleRemoveCartItem = async (item) => {
        try {
            await removeCartItem(item.productId._id || item.productId, selectedWarehouse);
            await loadCart(selectedWarehouse);
        } catch (error) {
            console.error(error);
        }
    };

    const handleWarehouseChange = (event) => {
        const warehouseId = event.target.value;
        setSelectedWarehouse(warehouseId);
        setProducts([]);
        clearSelection();
        if (warehouseId) {
            loadProducts(warehouseId);
            loadCart(warehouseId);
        }
    };

    return (
        <div className="catalog-container">
            <div className="catalog-header">
                <h2>Product Catalog</h2>
                <WarehouseSelector warehouses={warehouses} selectedWarehouse={selectedWarehouse} onChange={handleWarehouseChange} />
            </div>

            <div className="catalog-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.productId}
                        product={product}
                        quantity={selectedQuantities[product.productId] || 1}
                        onIncrease={() => increaseQuantity(product)}
                        onDecrease={() => decreaseQuantity(product.productId)}
                        onAddToCart={() => handleAddToCart(product)}
                    />
                ))}
            </div>

            {selectedWarehouse && (
                <div className="cart-summary">
                    <h2>Cart</h2>
                    {cartItems.length === 0 ? <p>No products selected</p> : (
                        <>
                            {cartItems.map((item) => (
                                <div key={item._id || item.productId._id || item.productId} className="cart-row">
                                    <div>
                                        <strong>{item.productName || item.productId?.name}</strong>
                                        <p>₹{item.price} × {item.quantity}</p>
                                    </div>
                                    <div className="quantity-box">
                                        <button type="button" onClick={() => handleDecreaseCartItem(item)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button type="button" onClick={() => handleIncreaseCartItem(item)}>+</button>
                                    </div>
                                    <button type="button" className="remove-btn" onClick={() => handleRemoveCartItem(item)}>Remove</button>
                                </div>
                            ))}
                            <hr />
                            <div className="cart-row">
                                <strong>Total Items</strong>
                                <strong>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</strong>
                            </div>
                            <div className="cart-row total">
                                <strong>Total Amount</strong>
                                <strong>₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</strong>
                            </div>
                            <button type="button" className="checkout-btn" onClick={() => navigate("/shopkeeper/place-order")}>Continue to Checkout</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProductCatalog;
