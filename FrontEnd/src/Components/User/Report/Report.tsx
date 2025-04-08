import { useState, useEffect } from "react";
import axios from "axios";
import { ReportEndpoints } from "../../../Constraints/Endpoints/ReportEndpoints";
import Navbar from "../Navbar";
import { Container, Tabs, Tab, Typography, Box, Paper, TextField, List, ListItem, ListItemText } from "@mui/material";
import ExportButton from "./Export";
import { ReportData } from "../../../Interfaces/IReport";
// interface Data{
//     totalSales?: number;
//     totalOrders?: number;
//     _id?: number;
//     itemName?: string;
//     totalQuantity?: number;
//     price?:number;
//     image?:string;
// }

const ReportsPage = () => {
    const [activeTab, setActiveTab] = useState("sales");
    const [salesReport, setSalesReport] = useState<ReportData|null>(null);
    const [itemsReport, setItemsReport] = useState([]);
    const [customerLedger, setCustomerLedger] = useState([]);
    const [customerId, setCustomerId] = useState("");
    const [data, setData] = useState<ReportData[]>([]);
    const [action,setAction]=useState("")
      const [loading,setLoading]=useState<boolean>(true)

    useEffect(() => {
        if (activeTab === "sales") {
            setLoading(true)
            axios.get(`${ReportEndpoints.sales}`).then((res) => {
                setSalesReport(res.data.report);
                setData(res.data.report)
                setAction("sales")
                setLoading(false)
            });
        } else if (activeTab === "items") {
            setLoading(true)
            axios.get(`${ReportEndpoints.itemReport}`).then((res) => {
                setItemsReport(res.data.report);
                setData(res.data.report)
                setAction("items")
                setLoading(false)
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
  

    return (loading?<><h1>Loading data.....</h1></>:(
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
                onChange={(_,newValue) => setActiveTab(newValue)}
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
                            {itemsReport.map((item:ReportData) => (
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
                            {customerLedger.map((order:ReportData) => (
                                <ListItem key={order.orderId}>
                                    <ListItemText
                                        primary={`Order ID: ${order.orderId}, Total: ${order.totalPrice}`}
                                        secondary={`Date: ${order.createdAt?new Date(order.createdAt).toLocaleDateString():"N/A"}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
            </Box>
        </Paper>
    </Container>
    
    ));
};

export default ReportsPage;
