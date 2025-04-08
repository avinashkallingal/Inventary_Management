import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
} from "@mui/material";
import axios from "axios";
import { OrderEndpoints } from "../../../Constraints/Endpoints/OrderEndPoints";
import { IOrder } from "../../../Interfaces/IOrder";
import Navbar from "../Navbar";

const OrderManagement: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const result = await axios.get(OrderEndpoints.getOrders);
      console.log(result, "  fetch data in order history ");
      if (result.data.success) {
        setOrders(result.data.data);
        setLoading(false)
      }
    }
    fetchData();
  }, []);

  const handleViewDetails = (order: IOrder) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (loading ? <><h1>Loading data.....</h1></> : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 3,
        minWidth: "75vw",
        marginTop: "1vh",
      }}
    >
      {/* Header Section */}
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h4">Order Management</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/addOrder")}
        >
          Add Order
        </Button>
      </Box>

      {/* Orders Table */}
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "calc(100vh - 192px)", overflow: "auto" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Purchase Count</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order: IOrder) => (
              <TableRow key={order._id}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>
                  {new Date(order.createdAt || "").toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {typeof order.customerId === "object"
                    ? order.customerId?.name
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {typeof order.customerId === "object"
                    ? order.customerId?.phone
                    : "N/A"}
                </TableCell>
                <TableCell>{order.totalPrice.toFixed(2)} Rs</TableCell>
                <TableCell>{order.items.length}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleViewDetails(order)}
                    variant="outlined"
                    size="small"
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Order Details */}
      <Modal open={Boolean(selectedOrder)} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: "8px",
            minWidth: "400px",
          }}
        >
          {selectedOrder && (
            <>
              <Typography variant="h5" sx={{ color: "black" }}>
                Order Details
              </Typography>
              <Typography sx={{ color: "black" }}>
                <strong>Order ID:</strong> {selectedOrder.orderId}
              </Typography>
              <Typography sx={{ color: "black" }}>
                <strong>Order Date:</strong>{" "}
                {new Date(selectedOrder.createdAt || "").toLocaleDateString()}
              </Typography>
              <Typography sx={{ color: "black" }}>
                <strong>Customer Name:</strong>{" "}
                {typeof selectedOrder.customerId === "object" ? selectedOrder.customerId.name : "N/A"}
              </Typography>
              <Typography sx={{ color: "black" }}>
                <strong>Phone:</strong>{" "}
                {typeof selectedOrder.customerId === "object" ? selectedOrder.customerId.phone : "N/A"}
              </Typography>

              <Typography sx={{ color: "black" }}>
                <strong>Total Price:</strong> Rs
                {selectedOrder.totalPrice.toFixed(2)}
              </Typography>

              <Typography variant="h6" sx={{ mt: 2, color: "black" }}>
                Items Ordered
              </Typography>
              {selectedOrder.items.map((item, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}
                >
                  <img
                    src={item.item.image}
                    alt={item.item.itemName}
                    width={50}
                    height={50}
                    style={{ borderRadius: "8px" }}
                  />
                  <Typography sx={{ color: "black" }}>
                    <strong>{item.item.itemName}</strong> - {item.quantity} x Rs
                    {item.item.price.toFixed(2)}
                  </Typography>
                </Box>
              ))}

              <Button
                onClick={handleCloseModal}
                sx={{ mt: 2 }}
                variant="contained"
                color="secondary"
                fullWidth
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  ));
};

export default OrderManagement;
