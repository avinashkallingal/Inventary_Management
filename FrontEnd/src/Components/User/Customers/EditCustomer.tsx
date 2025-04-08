import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { CustomerEndpoints } from "../../../Constraints/Endpoints/CustomerEndpoints";
// import { ICustomer } from "../../../Interfaces/ICustomer";
import Navbar from "../Navbar";
import { toast } from "sonner";

const EditCustomer: React.FC = () => {
  const navigate = useNavigate();
  const { customerId } = useParams<{ customerId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    customerId:"",
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  useEffect(() => {
    if (!customerId) return;
    async function fetchCustomer() {
      try {
        const response = await axios.get(`${CustomerEndpoints.getCustomer}/${customerId}`);
        console.log(response.data," response of get customers")
        if (response.data.success) {
            

          setFormData(response.data.data[0]); // Set form data from fetched data
        } else {
          toast.error("Failed to load customer details.");
        }
      } catch (error) {
        toast.error("Error fetching customer data.");
      } finally {
        setLoading(false);
      }
    }
    fetchCustomer();
  }, [customerId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
        formData.customerId=`${customerId}`
      const response = await axios.put(`${CustomerEndpoints.updateCustomer}`, formData);
      if (response.data.success) {
        toast.success("Customer updated successfully!");
        navigate("/customers");
      } else {
        toast.error("Failed to update customer.");
      }
    } catch (error) {
      toast.error("Error updating customer.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 3, minWidth: "75vw" }}>
      <Navbar />
      <Paper sx={{ p: 4, maxWidth: 600, margin: "auto", mt: 5 }}>
        <Typography variant="h5" mb={2}>Edit Customer</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Country" name="country" value={formData.country} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleChange} margin="normal" />
          
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button onClick={() => navigate("/customers")} variant="outlined">Cancel</Button>
            <Button type="submit" variant="contained" color="primary" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditCustomer;
