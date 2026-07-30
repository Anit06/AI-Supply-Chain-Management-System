import { useEffect, useState } from "react";
import { getPrediction } from "../../../services/aiService";
import { getWarehouses } from "../../../services/warehouseService";
import { getProducts } from "../../../services/productService";
import "../../../assets/css/demandPrediction.css";

function DemandPrediction() {
    const [warehouses, setWarehouses] = useState([]);
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const [formData, setFormData] = useState({
        warehouseName: "",
        productName: "",
        category: "",
        targetMonth: "",
        previousMonthDemand: "",
        sameMonthLastYearDemand: ""
    });

    useEffect(() => {
        loadWarehouses();
        loadProducts();
    }, []);

    const loadWarehouses = async () => {
        try {
            const res = await getWarehouses();
            setWarehouses(res.warehouses || []);
        } catch (err) {
            console.log(err);
        }
    };

    const loadProducts = async () => {
        try {
            const res = await getProducts();

            setProducts(res.products || []);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "productName") {

            const selected = products.find(
                (p) => p.name === value
            );

            setFormData({
                ...formData,
                productName: value,
                category: selected ? selected.category : ""
            });

        } else {

            setFormData({
                ...formData,
                [name]: value
            });

        }

    };

    const handlePredict = async (e) => {

        e.preventDefault();

        setLoading(true);

        setResult(null);

        try {

            const response = await getPrediction({
                warehouseName: formData.warehouseName,
                productName: formData.productName,
                category: formData.category,
                targetMonth: Number(formData.targetMonth),
                previousMonthDemand: Number(formData.previousMonthDemand),
                sameMonthLastYearDemand: Number(
                    formData.sameMonthLastYearDemand
                ),
            });

            setResult(response);

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Prediction Failed"
            );

        }

        setLoading(false);

    };

    return (

        <div className="prediction-container">

            <div className="prediction-card">

                <h2>AI Demand Prediction</h2>

                <form onSubmit={handlePredict}>

                    <div className="form-group">

                        <label>Warehouse</label>

                        <select
                            name="warehouseName"
                            value={formData.warehouseName}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Warehouse
                            </option>

                            {warehouses.map((warehouse) => (

                                <option
                                    key={warehouse._id}
                                    value={warehouse.name}
                                >
                                    {warehouse.name}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="form-group">

                        <label>Product</label>

                        <select
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Product
                            </option>

                            {products.map((product) => (

                                <option
                                    key={product._id}
                                    value={product.name}
                                >
                                    {product.name}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="form-group">

                        <label>Category</label>

                        <input
                            type="text"
                            value={formData.category}
                            readOnly
                        />

                    </div>

                    <div className="form-group">

                        <label>Target Month</label>

                        <select
                            name="targetMonth"
                            value={formData.targetMonth}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Month
                            </option>

                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>Previous Month Demand</label>

                        <input
                            type="number"
                            name="previousMonthDemand"
                            value={formData.previousMonthDemand}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Same Month Last Year Demand</label>

                        <input
                            type="number"
                            name="sameMonthLastYearDemand"
                            value={formData.sameMonthLastYearDemand}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button
                        className="predict-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Predicting..."
                            : "Predict Demand"}

                    </button>

                </form>

                {result && (

                    <div className="prediction-result">

                        <h3>Prediction Result</h3>

                        <table>

                            <tbody>

                                <tr>

                                    <td>Warehouse</td>

                                    <td>{result.warehouse}</td>

                                </tr>

                                <tr>

                                    <td>Product</td>

                                    <td>{result.product}</td>

                                </tr>

                                <tr>

                                    <td>Category</td>

                                    <td>{result.category}</td>

                                </tr>

                                <tr>

                                    <td>Predicted Demand</td>

                                    <td>

                                        <strong>

                                            {Number(
                                                result.predictedDemand
                                            ).toFixed(2)}{" "}
                                            {result.unit}

                                        </strong>

                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>

    );
}

export default DemandPrediction;