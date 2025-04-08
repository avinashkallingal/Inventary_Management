import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import { toast } from "sonner";


const PdfExport = ({data,action}:any) => {

    console.log(data, action, "Data and action in pdf utility component");

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(`Exported Report: ${action?.toUpperCase()}`, 14, 20);
        
        if (!data || data.length === 0) {
            toast.error("No data available to export!");
            return;
        }

        if (action === "sales") {
            generateSalesReport(doc, data);
        } else if (action === "items") {
            generateItemsReport(doc, data);
        } else if (action === "ledger") {
            generateLedgerReport(doc, data);
        }

        doc.save(`${action}-report.pdf`);
        toast.success(`${action?.toUpperCase()} Report exported as PDF!`);
    };

    const generateSalesReport = (doc: jsPDF, data: any) => {
        const tableColumn = ["Total Sales", "Total Orders"];
        const tableRows = [[data.totalSales, data.totalOrders]];

        autoTable(doc, { 
            startY: 30,
            head: [tableColumn],
            body: tableRows,
        });
    };

    const generateItemsReport = (doc: jsPDF, data: any[]) => {
        const tableColumn = ["Item Name", "Total Quantity Sold"];
        const tableRows = data.map((item) => [item.itemName, item.totalQuantity]);

        autoTable(doc, {
            startY: 30,
            head: [tableColumn],
            body: tableRows,
        });
    };

    const generateLedgerReport = (doc: jsPDF, data: any[]) => {
        const tableColumn = ["Order ID", "Total Price", "Date"];
        const tableRows = data.map((order) => [
            order.orderId,
            order.totalPrice,
            new Date(order.createdAt).toLocaleDateString(),
        ]);

        autoTable(doc, { 
            startY: 30,
            head: [tableColumn],
            body: tableRows,
        });
    };

    return (
        <button onClick={exportPDF} style={{ margin: "10px", padding: "8px 15px", background: "#007bff", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px" }}>
            Export as PDF
        </button>
    );
};

export default PdfExport;
