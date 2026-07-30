function WarehouseSelector({ warehouses, selectedWarehouse, onChange }) {
    return (
        <select value={selectedWarehouse} onChange={onChange}>
            <option value="">Select Warehouse</option>
            {warehouses.map((warehouse) => (
                <option key={warehouse._id} value={warehouse._id}>
                    {warehouse.name}
                </option>
            ))}
        </select>
    );
}

export default WarehouseSelector;
