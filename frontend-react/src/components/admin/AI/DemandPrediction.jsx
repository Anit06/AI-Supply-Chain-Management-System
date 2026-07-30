<<<<<<< HEAD
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
=======
import { useEffect, useMemo, useState } from "react";
import { getAllPredictions } from "../../../services/aiService";
import "../../../assets/css/demandPrediction.css";

const monthNames = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

function DemandPrediction() {

    const [predictions, setPredictions] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [warehouse, setWarehouse] = useState("All");

    useEffect(() => {
        loadPredictions();
    }, []);

    useEffect(() => {

        let data = [...predictions];

        if (warehouse !== "All") {
            data = data.filter(
                item => item.warehouseName === warehouse
            );
        }

        if (search !== "") {

            data = data.filter(item =>

                item.productName
                    .toLowerCase()
                    .includes(search.toLowerCase())

>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
            );

        }

<<<<<<< HEAD
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
=======
        setFiltered(data);

    }, [search, warehouse, predictions]);

    const loadPredictions = async () => {

        try {

            const response = await getAllPredictions();

            setPredictions(response.predictions || []);

            setFiltered(response.predictions || []);

        } catch (err) {

            console.log(err);

            alert("Unable to load predictions");

        } finally {

            setLoading(false);

        }

    };

    const warehouses = useMemo(() => {

        return [

            "All",

            ...new Set(
                predictions.map(item => item.warehouseName)
            )

        ];

    }, [predictions]);

    if (loading)
        return <h2>Loading AI Prediction...</h2>;

    return (

        <div className="prediction-page">

            <div className="prediction-header">

                <h2>

                    AI Demand Prediction

                </h2>

                <div className="prediction-count">

                    {filtered.length} Products

                </div>

            </div>

            <div className="prediction-filter">

                <input

                    placeholder="Search Product..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                />

                <select

                    value={warehouse}

                    onChange={(e) =>
                        setWarehouse(e.target.value)
                    }

                >

                    {

                        warehouses.map(item => (

                            <option
                                key={item}
                                value={item}
                            >

                                {item}

                            </option>

                        ))

                    }

                </select>

            </div>

            <div className="prediction-table-wrapper">

                <table className="prediction-table">

                    <thead>

                        <tr>

                            <th>#</th>
                            <th>Warehouse</th>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Current</th>
                            <th>Last Year</th>
                            <th>Prediction</th>
                            <th>Month</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filtered.map((item, index) => (

                                <tr key={index}>

                                    <td>{index + 1}</td>

                                    <td>{item.warehouseName}</td>

                                    <td>{item.productName}</td>

                                    <td>{item.category}</td>

                                    <td>{item.currentMonthDemand}</td>

                                    <td>{item.sameMonthLastYearDemand}</td>

                                    <td>

                                        <span className="badge">

                                            {item.predictedDemand} Units

                                        </span>

                                    </td>

                                    <td>

                                        {

                                            monthNames[item.targetMonth]

                                        }

                                        {" "}

                                        {item.targetYear}
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78

                                    </td>

                                </tr>

<<<<<<< HEAD
                            </tbody>

                        </table>

                    </div>

                )}
=======
                            ))

                        }

                    </tbody>

                </table>
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78

            </div>

        </div>

    );
<<<<<<< HEAD
}

export default DemandPrediction;
=======

}

export default DemandPrediction;
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
