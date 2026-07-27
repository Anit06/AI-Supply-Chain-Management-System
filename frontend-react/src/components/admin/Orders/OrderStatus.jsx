import "../../../assets/css/orderStatus.css";

function OrderStatus({ status, onChange }) {

    const handleChange = (e) => {

        const newStatus = e.target.value;

        if (newStatus === status) {

            return;

        }

        const confirmUpdate = window.confirm(
            `Are you sure you want to change the order status to "${newStatus}"?`
        );

        if (confirmUpdate) {

            onChange(newStatus);

        }

    };

    return (

        <div className="status-wrapper">

            <label className="status-label">

                Order Status

            </label>

            <select

                className={`status-select ${status.toLowerCase()}`}

                value={status}

                onChange={handleChange}

            >

                <option value="Placed">

                    📝 Placed

                </option>

                <option value="Confirmed">

                    ✔ Confirmed

                </option>

                <option value="Packed">

                    📦 Packed

                </option>

                <option value="Shipped">

                    🚚 Shipped

                </option>

                <option value="Delivered">

                    ✅ Delivered

                </option>

                <option value="Cancelled">

                    ❌ Cancelled

                </option>

            </select>

        </div>

    );

}

export default OrderStatus;