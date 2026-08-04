import "../../../assets/css/orderStatus.css";

function OrderStatus({ status, onChange, availableStatuses = [], loading = false }) {

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

    const statusOptions = availableStatuses.length > 0

        ? [status, ...availableStatuses.filter((option) => option !== status)]

        : ["Placed", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"];

    const statusLabels = {

        Placed: "📝 Placed",

        Confirmed: "✔ Confirmed",

        Packed: "📦 Packed",

        Shipped: "🚚 Shipped",

        Delivered: "✅ Delivered",

        Cancelled: "❌ Cancelled"

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

                disabled={loading}

            >

                {statusOptions.map((option) => (

                    <option key={option} value={option}>

                        {statusLabels[option] || option}

                    </option>

                ))}

            </select>

        </div>

    );

}

export default OrderStatus;