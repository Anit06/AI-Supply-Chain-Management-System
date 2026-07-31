import api from "./api";
//REPORT APIs
export const getInventoryReport = () =>
  api.get("/reports/inventory");

export const getSummaryReport = () =>
  api.get("/reports/summary");

export const getLowStockReport = () =>
  api.get("/reports/low-stock");


// DOWNLOAD PDF

export const downloadInventoryPDF = async () => {

  const response = await api.get(
    "/reports/inventory/pdf",
    {
      responseType: "blob"
    }
  );

  const url = window.URL.createObjectURL(
    new Blob([response.data])
  );

  const link = document.createElement("a");

  link.href = url;

  link.download = "WarehouseInventoryReport.pdf";

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);

};

//DOWNLOAD EXCEL

export const downloadInventoryExcel = async () => {

  const response = await api.get(
    "/reports/inventory/excel",
    {
      responseType: "blob"
    }
  );

  const url = window.URL.createObjectURL(
    new Blob([response.data])
  );

  const link = document.createElement("a");

  link.href = url;

  link.download = "WarehouseInventoryReport.xlsx";

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);

};

// ================================
// MONTHLY SALES
// ================================

export const getMonthlySalesReport = (warehouseId, month, year) =>
    api.get("/reports/sales/monthly", {
        params: {
            warehouseId,
            month,
            year
        }
    });

export const downloadMonthlySalesPDF = async (warehouseId, month, year) => {

  const response = await api.get(
    "/reports/sales/monthly/pdf",
    {
      params: {
        warehouseId,
        month,
        year
      },
      responseType: "blob"
    }
  );

  const url = window.URL.createObjectURL(
    new Blob([response.data])
  );

  const link = document.createElement("a");

  link.href = url;

  link.download = "MonthlySalesReport.pdf";

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);

};
export const downloadMonthlySalesExcel = async (warehouseId, month, year) => {

  const response = await api.get(
    "/reports/sales/monthly/excel",
    {
      params: {
        warehouseId,
        month,
        year
      },
      responseType: "blob"
    }
  );

  const url = window.URL.createObjectURL(
    new Blob([response.data])
  );

  const link = document.createElement("a");

  link.href = url;

  link.download = "MonthlySalesReport.xlsx";

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);

};
// ================================
// YEARLY SALES
// ================================

export const getYearlySalesReport = (warehouseId, year) =>
    api.get("/reports/sales/yearly", {
        params: {
            warehouseId,
            year
        }
    });

export const downloadYearlySalesPDF = async (warehouseId, year) => {

  const response = await api.get(
    "/reports/sales/yearly/pdf",
    {
      params: {
        warehouseId,
        year
      },
      responseType: "blob"
    }
  );

  const url = window.URL.createObjectURL(
    new Blob([response.data])
  );

  const link = document.createElement("a");

  link.href = url;

  link.download = "YearlySalesReport.pdf";

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);

};
export const downloadYearlySalesExcel = async (warehouseId, year) => {

  const response = await api.get(
    "/reports/sales/yearly/excel",
    {
      params: {
        warehouseId,
        year
      },
      responseType: "blob"
    }
  );

  const url = window.URL.createObjectURL(
    new Blob([response.data])
  );

  const link = document.createElement("a");

  link.href = url;

  link.download = "YearlySalesReport.xlsx";

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);

};