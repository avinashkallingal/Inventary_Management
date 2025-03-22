import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../../Constraints/axios/UserAxios";
import { userEndpoints } from "../../../Constraints/Endpoints/UserEndPoints";
import { toast } from "sonner";
import Navbar from "../Navbar";

const categories = ["Fruits", "Vegetables", "Dairy", "Bakery", "Beverages"];

const AddItem: React.FC = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    quantity: "",
    price: "",
    description: "",
    image: null as File | null,
  });

  const [errors, setErrors] = useState({
    itemName: "",
    category: "",
    quantity: "",
    price: "",
    description: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file)); // Store preview URL
      setErrors({ ...errors, image: "" });
    }
  };

  const validateForm = () => {
    let newErrors = {
      itemName: "",
      category: "",
      quantity: "",
      price: "",
      description: "",
      image: "",
    };
    let isValid = true;

    if (!formData.itemName.trim()) {
      newErrors.itemName = "Item name is required.";
      isValid = false;
    }
    if (!formData.category) {
      newErrors.category = "Category is required.";
      isValid = false;
    }
    if (
      !formData.quantity ||
      isNaN(Number(formData.quantity)) ||
      Number(formData.quantity) <= 0
    ) {
      newErrors.quantity = "Valid quantity is required.";
      isValid = false;
    }
    if (
      !formData.price ||
      isNaN(Number(formData.price)) ||
      Number(formData.price) <= 0
    ) {
      newErrors.price = "Valid price is required.";
      isValid = false;
    }
    if (!formData.description.trim() || formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
      isValid = false;
    }
    if (!formData.image) {
      newErrors.image = "Image is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("itemName", formData.itemName);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("quantity", formData.quantity);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image as Blob);

    try {
      console.log("Form Data:", formDataToSend);
      //calling api
      const result = await axios.post(userEndpoints.addItem, formDataToSend);
      console.log(result.data);
    
      if (result.data.data.success) {
        toast.info("item saved succesfully");
        console.log('item saved succesfully')
      
     
      } else {
        toast.error("item not added");
      }
    
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Navbar/>
      <Typography variant="h5" color="black" gutterBottom>
        Add New Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Item Name"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          error={!!errors.itemName}
          helperText={errors.itemName}
          margin="normal"
        />

        <TextField
          fullWidth
          select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          error={!!errors.category}
          helperText={errors.category}
          margin="normal"
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          error={!!errors.quantity}
          helperText={errors.quantity}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          error={!!errors.price}
          helperText={errors.price}
          margin="normal"
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          margin="normal"
        />

        {/* Image Preview (Only if selected) */}
        {imagePreview && (
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <img
              src={imagePreview}
              alt="Uploaded Preview"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
          </Box>
        )}
        {/* <Typography sx={{ mt: 1, color: "black" }}>
          {(formData.image as File).name}
        </Typography> */}

        <Button
          variant="contained"
          component="label"
          sx={{ display: "block", mt: 2 }}
        >
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
        {errors.image && (
          <Typography color="error" sx={{ mt: 1 }}>
            {errors.image}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddItem;
