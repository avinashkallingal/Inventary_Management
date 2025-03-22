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
  IconButton,
  Menu,
  MenuItem,
  Modal,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { CustomerEndpoints } from "../../../Constraints/Endpoints/CustomerEndpoints";
import { ICustomer } from "../../../Interfaces/ICustomer";
import Navbar from "../Navbar";
import Swal from "sweetalert2";


const CustomerManagement: React.FC = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(CustomerEndpoints.getCustomers);
      if (result.data.success) {
        setCustomers(result.data.data);
      }
    }
    fetchData();
  }, []);

  const handleAddCustomer = () => {
    navigate("/addCustomer");
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, customerId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedCustomerId(customerId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCustomerId(null);
  };

  const handleEdit = () => {
    if (selectedCustomerId) navigate(`/editCustomer/${selectedCustomerId}`);
    handleMenuClose();
  };

  // const handleDelete = async () => {
  //   if (selectedCustomerId) {
  //     await axios.delete(`${CustomerEndpoints.deleteCustomer}/${selectedCustomerId}`);
  //     setCustomers(customers.filter((customer) => customer.customerId !== selectedCustomerId));
  //   }
  //   handleMenuClose();
  // };

  const handleDelete = async () => {
    if (!selectedCustomerId) return;
  
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (!result.isConfirmed) return;
  
    try {
      const { data } = await axios.delete(`${CustomerEndpoints.deleteCustomer}/${selectedCustomerId}`);
  
      if (data.success) {
        Swal.fire("Deleted!", "The customer has been deleted.", "success");
        setCustomers(prevCustomers => prevCustomers.filter(customer => customer._id !== selectedCustomerId));
      } else {
        Swal.fire("Error!", "Failed to delete customer.", "error");
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  
    handleMenuClose();
  };
  

  const handleViewDetails = (customer: ICustomer) => {
    setSelectedCustomer(customer);
  };

  const handleCloseModal = () => {
    setSelectedCustomer(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 3, minWidth: "75vw",marginTop:"-30vh" }}>
      {/* Header Section */}
      <Navbar/>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h4">Customer Management</Typography>
        <Button variant="contained" color="primary" onClick={handleAddCustomer}>
          Add Customer
        </Button>
      </Box>

      {/* Customers Table */}
      <TableContainer component={Paper} sx={{ maxHeight: "calc(100vh - 192px)", overflow: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer: ICustomer) => (
              <TableRow key={customer._id}>
                <TableCell>{customer._id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email || "N/A"}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  <Button onClick={() => handleViewDetails(customer)} variant="outlined" size="small">
                    View Details
                  </Button>
                  <IconButton onClick={(event) => handleMenuClick(event, `${customer._id}`)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Customer Details */}
      <Modal open={Boolean(selectedCustomer)} onClose={handleCloseModal}>
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
            minWidth: "300px",
          }}
        >
          {selectedCustomer && (
           <>
           <Typography variant="h5" sx={{ color: 'black' }}>Customer Details</Typography>
           <Typography sx={{ color: 'black' }}><strong>Name:</strong> {selectedCustomer.name}</Typography>
           <Typography sx={{ color: 'black' }}><strong>Email:</strong> {selectedCustomer.email || "N/A"}</Typography>
           <Typography sx={{ color: 'black' }}><strong>Phone:</strong> {selectedCustomer.phone}</Typography>
           <Typography sx={{ color: 'black' }}><strong>Address:</strong> {selectedCustomer.address}</Typography>
           {selectedCustomer.city && <Typography sx={{ color: 'black' }}><strong>City:</strong> {selectedCustomer.city}</Typography>}
           {selectedCustomer.state && <Typography sx={{ color: 'black' }}><strong>State:</strong> {selectedCustomer.state}</Typography>}
           {selectedCustomer.country && <Typography sx={{ color: 'black' }}><strong>Country:</strong> {selectedCustomer.country}</Typography>}
           {selectedCustomer.postalCode && <Typography sx={{ color: 'black' }}><strong>Postal Code:</strong> {selectedCustomer.postalCode}</Typography>}
           <Button onClick={handleCloseModal} sx={{ mt: 2 }} variant="contained" color="secondary" fullWidth>
             Close
           </Button>
         </>
         
          )}
        </Box>
      </Modal>

      {/* Menu for Actions */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>Edit Customer</MenuItem>
        <MenuItem onClick={handleDelete}>Delete Customer</MenuItem>
      </Menu>
    </Box>
  );
};

export default CustomerManagement;
