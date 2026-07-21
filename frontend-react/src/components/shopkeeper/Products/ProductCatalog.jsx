import { useEffect, useState } from "react";
import "../../../assets/css/ProductCatalog.css";
import { getWarehouses } from "../../../services/warehouseService";
import { getWarehouseCatalog } from "../../../services/catalogService";
import { addToCart } from "../../../services/cartService";
import WarehouseSelector from "./WarehouseSelector";
import ProductCard from "./ProductCard";

function ProductCatalog() {
    const [warehouses, setWarehouses] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedQuantities, setSelectedQuantities] = useState({});

    useEffect(() => {
        loadWarehouses();
    }, []);

    const loadWarehouses = async () => {
        try {
            const res = await getWarehouses();
            setWarehouses(res.warehouses || []);
        } catch (error) {
            console.log(error);
        }
    };

    const loadProducts = async (warehouseId) => {
        try {
            const res = await getWarehouseCatalog(warehouseId);
            setProducts(res.data.products || []);
            localStorage.setItem("selectedWarehouse", warehouseId);
        } catch (error) {
            console.log(error);
        }
    };

    const increaseQuantity = (product) => {
        const qty = selectedQuantities[product.productId] || 1;

        if (qty >= product.stock) {
            alert(`Only ${product.stock} items available`);
            return;
        }

        setSelectedQuantities({
            ...selectedQuantities,
            [product.productId]: qty + 1
        });
    };

    const decreaseQuantity = (productId) => {
        const qty = selectedQuantities[productId] || 1;

        if (qty <= 1) return;

        setSelectedQuantities({
            ...selectedQuantities,
            [productId]: qty - 1
        });
    };

    const handleAddToCart = async (product) => {
        const quantity = selectedQuantities[product.productId] || 1;

        try {
            await addToCart({
                warehouseId: selectedWarehouse,
                productId: product.productId,
                productName: product.name,
                price: product.price,
                quantity,
                unit: product.unit || "KG"
            });

            alert("Product Added To Cart");
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    const handleWarehouseChange = (e) => {
        const warehouseId = e.target.value;

        setSelectedWarehouse(warehouseId);
        setProducts([]);
        setSelectedQuantities({});

        if (warehouseId) {
            loadProducts(warehouseId);
        }
    };

    return (
        <div className="catalog-container">

            <div className="catalog-header">
                <h2>Product Catalog</h2>

                <WarehouseSelector
                    warehouses={warehouses}
                    selectedWarehouse={selectedWarehouse}
                    onChange={handleWarehouseChange}
                />
            </div>

            {selectedWarehouse === "" ? (
                <h3 style={{ textAlign: "center", marginTop: "60px" }}>
                    Please Select Warehouse
                </h3>
            ) : products.length === 0 ? (
                <h3 style={{ textAlign: "center", marginTop: "60px" }}>
                    No Products Available
                </h3>
            ) : (
                <div className="catalog-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product.productId}
                            product={product}
                            quantity={
                                selectedQuantities[product.productId] || 1
                            }
                            onIncrease={() =>
                                increaseQuantity(product)
                            }
                            onDecrease={() =>
                                decreaseQuantity(product.productId)
                            }
                            onAddToCart={() =>
                                handleAddToCart(product)
                            }
                        />
                    ))}
                </div>
            )}

        </div>
    );
}

export default ProductCatalog;