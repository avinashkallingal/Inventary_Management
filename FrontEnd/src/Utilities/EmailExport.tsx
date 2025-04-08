import React, { useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import axios from "axios";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { TextField, Button } from "@mui/material";
import { ReportData } from "../Interfaces/IReport";

interface EmailExportProps {
    data: ReportData[] | { totalSales: number; totalOrders: number|undefined }|undefined;
    action: string|"sales" | "items" | "ledger";
}

const EmailExport: React.FC<EmailExportProps> = ({ data, action }) => {
    const [recipientEmail, setRecipientEmail] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const validateEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSendEmail = () => {
        if (!validateEmail(recipientEmail)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        setIsModalOpen(false);
        sendEmailWithExcel();
    };

    const sendEmailWithExcel = async () => {
        if (!data || (Array.isArray(data) && data.length === 0)) {
            toast.error("No data available to export!");
            return;
        }

        let worksheet: XLSX.WorkSheet;
        let sheetName: string = action.toUpperCase();

        if (action === "sales") {
            worksheet = generateSalesSheet(data as { totalSales: number; totalOrders: number });
        } else if (action === "items") {
            worksheet = generateItemsSheet(data as any[]);
        } else if (action === "ledger") {
            worksheet = generateLedgerSheet(data as any[]);
        } else {
            toast.error("Invalid action type!");
            return;
        }

        const workbook: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        const excelBuffer: any = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

        const fileBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        reader.onloadend = async () => {
            const base64File = reader.result?.toString().split(",")[1];

            if (!base64File) {
                toast.error("Failed to generate Excel file.");
                return;
            }

            try {
                const response = await axios.post("http://localhost:6001/report/sendEmail", {
                    recipient: recipientEmail,
                    filename: `${action}-report.xlsx`,
                    fileData: base64File,
                }, {
                    headers: { "Content-Type": "application/json" }
                });

                if (response.data.success) {
                    toast.success("Email sent successfully!");
                } else {
                    toast.error("Failed to send email!");
                }
            } catch (error) {
                toast.error("Error sending email.");
                console.error("Error:", error);
            }
        };
    };

    const generateSalesSheet = (data: { totalSales: number; totalOrders: number }): XLSX.WorkSheet =>
        XLSX.utils.aoa_to_sheet([["Total Sales", "Total Orders"], [data.totalSales, data.totalOrders]]);

    const generateItemsSheet = (data: any[]): XLSX.WorkSheet =>
        XLSX.utils.aoa_to_sheet([["Item Name", "Total Quantity Sold"], ...data.map((item) => [item.itemName, item.totalQuantity])]);

    const generateLedgerSheet = (data: any[]): XLSX.WorkSheet =>
        XLSX.utils.aoa_to_sheet([["Order ID", "Total Price", "Date"], ...data.map((order) => [order.orderId, order.totalPrice, new Date(order.createdAt).toLocaleDateString()])]);

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setIsModalOpen(true)}
                style={{ margin: "10px", padding: "8px 15px", borderRadius: "5px" }}
            >
                Send Excel via Email
            </Button>

            {/* Dialog for entering recipient email */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <DialogTitle>Enter Recipient's Email</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        style={{ marginTop: "10px" }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSendEmail}>
                        Send Email
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EmailExport;
