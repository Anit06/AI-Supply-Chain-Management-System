import { useEffect, useState } from "react";

import "../../../assets/css/ProductCatalog.css";

import { getWarehouses } from "../../../services/warehouseService";
import { getWarehouseCatalog } from "../../../services/catalogService";

function ProductCatalog() {
  const [warehouses, setWarehouses] = useState([]);

  const [selectedWarehouse, setSelectedWarehouse] = useState("");

  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState({});

  useEffect(() => {
    loadWarehouses();
  }, []);

  const loadWarehouses = async () => {
    try {
      const res = await getWarehouses();

      setWarehouses(res.warehouses);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProducts = async (warehouseId) => {
    try {
      const res = await getWarehouseCatalog(warehouseId);

      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  const increaseQuantity = (product) => {

    const currentQty = cart[product.productId] || 0;

    if (currentQty >= product.stock) {

        alert(`Only ${product.stock} items available`);

        return;
    }

    setCart({
        ...cart,
        [product.productId]: currentQty + 1
    });

};

const decreaseQuantity = (productId) => {

    const currentQty = cart[productId] || 0;

    if (currentQty === 0) return;

    setCart({
        ...cart,
        [productId]: currentQty - 1
    });

};

const cartProducts = products.filter(
    product => (cart[product.productId] || 0) > 0
);

const totalItems = cartProducts.reduce(
    (sum, product) =>
        sum + (cart[product.productId] || 0),
    0
);

const grandTotal = cartProducts.reduce(
    (sum, product) =>
        sum +
        (cart[product.productId] || 0) * product.price,
    0
);


  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h2>Product Catalog</h2>

        <select
          value={selectedWarehouse}
          onChange={(e) => {
            setSelectedWarehouse(e.target.value);

            loadProducts(e.target.value);
          }}
        >
          <option value="">Select Warehouse</option>

          {warehouses.map((warehouse) => (
            <option key={warehouse._id} value={warehouse._id}>
              {warehouse.name}
            </option>
          ))}
        </select>
      </div>

      <div className="catalog-grid">
        {products.map((product) => (
         <div
    key={product.productId}
    className="product-card"
>

    <img
        src={`http://localhost:5000/${product.image.replace(/\\/g, "/")}`}
        alt={product.name}
        className="product-image"
    />

    <h3>{product.name}</h3>

    <p>{product.description}</p>

    <h4>₹ {product.price}</h4>

    <div className="quantity-box">

        <button
            onClick={() =>
                decreaseQuantity(product.productId)
            }
        >
            -
        </button>

        <span>

            {cart[product.productId] || 0}

        </span>

        <button
            onClick={() =>
                increaseQuantity(product)
            }
        >
            +

        </button>

    </div>

</div>
        ))}
      </div>
      <div className="cart-summary">

    <h2>Cart</h2>

    {
        cartProducts.length === 0 ? (

            <p>No products selected</p>

        ) : (

            <>

                {

                    cartProducts.map(product => (

                        <div
                            key={product.productId}
                            className="cart-row"
                        >

                            <span>

                                {product.name}
                                ×
                                {cart[product.productId]}

                            </span>

                            <span>

                                ₹
                                {
                                    cart[product.productId] *
                                    product.price
                                }

                            </span>

                        </div>

                    ))

                }

                <hr />

                <div className="cart-row">

                    <strong>Total Items</strong>

                    <strong>{totalItems}</strong>

                </div>

                <div className="cart-row total">

                    <strong>Grand Total</strong>

                    <strong>₹ {grandTotal}</strong>

                </div>

                <button className="checkout-btn">

                    Place Order

                </button>

            </>

        )

    }

</div>
    </div>
  );
}

export default ProductCatalog;
