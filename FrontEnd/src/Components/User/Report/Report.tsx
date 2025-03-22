import { useState, useEffect } from "react";
import axios from "axios";
import { ReportEndpoints } from "../../../Constraints/Endpoints/ReportEndpoints";
import Navbar from "../Navbar";
import { Container, Tabs, Tab, Typography, Box, Paper, TextField, List, ListItem, ListItemText } from "@mui/material";
import ExportButton from "./Export";

const ReportsPage = () => {
    const [activeTab, setActiveTab] = useState("sales");
    const [salesReport, setSalesReport] = useState(null);
    const [itemsReport, setItemsReport] = useState([]);
    const [customerLedger, setCustomerLedger] = useState([]);
    const [customerId, setCustomerId] = useState("");
    const [data, setData] = useState([]);
    const [action,setAction]=useState("")

    useEffect(() => {
        if (activeTab === "sales") {
            axios.get(`${ReportEndpoints.sales}`).then((res) => {
                setSalesReport(res.data.report);
                setData(res.data.report)
                setAction("sales")
            });
        } else if (activeTab === "items") {
            axios.get(`${ReportEndpoints.itemReport}`).then((res) => {
                setItemsReport(res.data.report);
                setData(res.data.report)
                setAction("items")
            });
        }
    }, [activeTab]);

    const fetchLedger = () => {
        if (customerId.trim() !== "") {
            axios.get(`${ReportEndpoints.fetchLedger}/?id=${customerId}`).then((res) => {
                setCustomerLedger(res.data.report);
                setData(res.data.report)
                setAction("ledger")
            });
        }
    };
    const reportData = { id: 123, name: "Monthly Sales", date: "2025-03-18" };

    return (
        <Container
        sx={{
            width: "800px", // Fixed width
            minHeight: "80vh", // Prevents shrinking
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
        }}
    >
        <Navbar />
     
           <ExportButton data={data} action={action}/>
        <Paper
        elevation={3}
        sx={{
            mt: 3,
            p: 3,
            width: "100%", // Ensures Paper doesn't shrink
            minHeight: "60vh", // Keeps the container's height stable
            display: "flex",
            flexDirection: "column",
        }}
    >
            <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Sales Report" value="sales" />
                <Tab label="Items Report" value="items" />
                <Tab label="Customer Ledger" value="ledger" />
            </Tabs>
    
            <Box sx={{ mt: 3, width: "100%" }}>
                {activeTab === "sales" && salesReport && (
                    <Box>
                        <Typography variant="h5">Sales Report</Typography>
                        <Typography>Total Sales: {salesReport.totalSales}</Typography>
                        <Typography>Total Orders: {salesReport.totalOrders}</Typography>
                    </Box>
                )}
    
                {activeTab === "items" && (
                    <Box>
                        <Typography variant="h5">Items Report</Typography>
                        <List>
                            {itemsReport.map((item) => (
                                <ListItem key={item.itemName}>
                                    <ListItemText primary={`${item.itemName}: ${item.totalQuantity} sold`} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
    
                {activeTab === "ledger" && (
                    <Box>
                        <Typography variant="h5">Customer Ledger</Typography>
                        <TextField
                            label="Enter Customer ID"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            onChange={(e) => setCustomerId(e.target.value)}
                            onBlur={fetchLedger}
                        />
                        <List>
                            {customerLedger.map((order) => (
                                <ListItem key={order.orderId}>
                                    <ListItemText
                                        primary={`Order ID: ${order.orderId}, Total: ${order.totalPrice}`}
                                        secondary={`Date: ${new Date(order.createdAt).toLocaleDateString()}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
            </Box>
        </Paper>
    </Container>
    
    );
};

export default ReportsPage;
