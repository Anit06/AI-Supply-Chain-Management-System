import api from "./api";

/*
====================================
REPORT APIs
====================================
*/

export const getInventoryReport = () =>
  api.get("/reports/inventory");

export const getSummaryReport = () =>
  api.get("/reports/summary");

export const getLowStockReport = () =>
  api.get("/reports/low-stock");

/*
====================================
DOWNLOAD PDF
====================================
*/

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

/*
====================================
DOWNLOAD EXCEL
====================================
*/

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