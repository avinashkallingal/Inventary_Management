import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "sonner";

const ExcelExport = ({ data, action }) => {
    console.log(data, action, "Data and action in excel utility component");

    const exportExcel = () => {
        if (!data || data.length === 0) {
            toast.error("No data available to export!");
            return;
        }

        let worksheet;
        let sheetName = action?.toUpperCase();

        if (action === "sales") {
            worksheet = generateSalesSheet(data);
        } else if (action === "items") {
            worksheet = generateItemsSheet(data);
        } else if (action === "ledger") {
            worksheet = generateLedgerSheet(data);
        } else {
            toast.error("Invalid action type!");
            return;
        }

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
        saveAs(blob, `${action}-report.xlsx`);
        toast.success(`${action?.toUpperCase()} Report exported as Excel!`);
    };

    const generateSalesSheet = (data) => {
        const salesData = [["Total Sales", "Total Orders"], [data.totalSales, data.totalOrders]];
        return XLSX.utils.aoa_to_sheet(salesData);
    };

    const generateItemsSheet = (data) => {
        const itemData = [["Item Name", "Total Quantity Sold"], ...data.map((item) => [item.itemName, item.totalQuantity])];
        return XLSX.utils.aoa_to_sheet(itemData);
    };

    const generateLedgerSheet = (data) => {
        const ledgerData = [["Order ID", "Total Price", "Date"], ...data.map((order) => [order.orderId, order.totalPrice, new Date(order.createdAt).toLocaleDateString()])];
        return XLSX.utils.aoa_to_sheet(ledgerData);
    };

    return (
        <button onClick={exportExcel} style={{ margin: "10px", padding: "8px 15px", background: "#28a745", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px" }}>
            Export as Excel
        </button>
    );
};

export default ExcelExport;
