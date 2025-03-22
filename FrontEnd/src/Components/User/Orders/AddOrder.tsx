import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { OrderEndpoints } from "../../../Constraints/Endpoints/OrderEndPoints";
import { CustomerEndpoints } from "../../../Constraints/Endpoints/CustomerEndpoints";
import { ItemEndpoints } from "../../../Constraints/Endpoints/ItemEndpoints";
import { toast } from "sonner";
import Navbar from "../../../Components/User/Navbar";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const AddOrder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerId: "",
    items: [{ item: "", quantity: 1, price: 0 }],
    totalPrice: 0,
  });

  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch customers based on search input
  const fetchCustomers = async (search: string) => {
    try {
      const response = await axios.get(
        `${CustomerEndpoints.searchCustomers}?search=${search}`
      );
      console.log(response, " customer search got in frontend");
      setCustomers(response.data.data);
    } catch (error) {
      console.error("Error fetching customers", error);
    }
  };

  // Fetch items based on search input
  const fetchItems = async (search: string) => {
    try {
      const response = await axios.get(
        `${ItemEndpoints.searchItems}?search=${search}`
      );
      setItems(response.data.data);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  // Handle form changes
  const handleItemChange = (index, updates) => {
    console.log(formData, "handle change triggered");

    const updatedItems = formData.items.map((item, i) =>
      i === index ? { ...item, ...updates } : item
    );

    console.log(updatedItems, " updsted items");

    // Recalculate total price
    const totalPrice = updatedItems.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
      0
    );

    setFormData((prev) => ({ ...prev, items: updatedItems, totalPrice }));

    console.log(updatedItems, " form data after handle triggered");
  };

  // Add new item field
  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { item: "", quantity: 1, price: 0 }],
    });
  };

  // Remove item field
  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  // Form validation
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.customerId) {
      newErrors.customerId = "Customer is required";
      isValid = false;
    }

    formData.items.forEach((item, index) => {
      if (!item.item) {
        newErrors[`item-${index}`] = "Item is required";
        isValid = false;
      }
      if (item.quantity < 1) {
        newErrors[`quantity-${index}`] = "Quantity must be at least 1";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await axios.post(OrderEndpoints.addOrder, formData);
      if (result.data.success) {
        toast.success("Order added successfully");
        // navigate("/orders");
      } else {
        toast.error("Failed to add order");
      }
    } catch (error) {
      console.error("Error adding order:", error);
      toast.error("An error occurred");
    }
  };

  // return (
  //   <Box
  //     sx={{
  //       maxWidth: 600,
  //       mx: "auto",
  //       mt: 5,
  //       p: 3,
  //       boxShadow: 3,
  //       borderRadius: 2,
  //       backgroundColor: "white",
  //     }}
  //   >
  //     <Navbar />
  //     <Typography variant="h5" gutterBottom>
  //       Add New Order
  //     </Typography>
  //     <form onSubmit={handleSubmit}>
  //       {/* Customer Selection */}
  //       <Autocomplete
  //         freeSolo
  //         options={customers}
  //         getOptionLabel={(option) => option.name || ""}
  //         onInputChange={(event, newValue) => fetchCustomers(newValue)}
  //         onChange={(event, newValue) =>
  //           setFormData({
  //             ...formData,
  //             customerId: newValue ? newValue._id : "sample id",
  //           })
  //         }
  //         renderInput={(params) => (
  //           <TextField
  //             {...params}
  //             label="Customer"
  //             error={!!errors.customerId}
  //             helperText={errors.customerId}
  //           />
  //         )}
  //       />

  //       {/* Items Selection */}
  //       {formData.items.map((item, index) => (
  //         <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2, my: 1 }}>
  //           {/* Item Dropdown */}
  //           <Autocomplete
  //             freeSolo
  //             options={items}
  //             getOptionLabel={(option) => option.itemName || ""}
  //             onInputChange={(event, newValue) => fetchItems(newValue)}
  //             // onChange={ (event, newValue) =>

  //             //   {
  //             //     handleItemChange(index, "item", newValue ? newValue.itemName : "sample item");
  //             //     handleItemChange(index, "price", newValue ? newValue.price : "dummy price");
  //             //   }
  //             // }
  //             onChange={(event, newValue) => {
  //               const selectedItem = newValue || { itemName: "sample item", price: "dummy price",itemId:"" };

  //               handleItemChange(index, {
  //                 itemId:selectedItem._id,
  //                 item: selectedItem.itemName,
  //                 price: selectedItem.price,
  //               });
  //             }}

  //             sx={{ minWidth: 180 }}
  //             renderInput={(params) => (
  //               <TextField
  //                 {...params}
  //                 label="Item"
  //                 error={!!errors[`item-${index}`]}
  //                 helperText={errors[`item-${index}`]}
  //               />
  //             )}
  //           />

  //           {/* Price Field */}
  //           <TextField
  //             type="number"
  //             label="Price"
  //             value={item.price || "0"}
  //             onChange={(e) => handleItemChange(index, "price", e.target.value)}
  //             sx={{ width: 100 }}
  //           />

  //           {/* Quantity Field */}
  //           <TextField
  //             type="number"
  //             label="Quantity"
  //             value={item.quantity}
  //             onChange={(newValue) => handleItemChange(index, {quantity:newValue})}
  //             error={!!errors[`quantity-${index}`]}
  //             helperText={errors[`quantity-${index}`]}
  //             sx={{ width: 100 }}
  //           />

  //           {/* Remove Item Button */}
  //           <IconButton onClick={() => removeItem(index)} color="error">
  //             <RemoveIcon />
  //           </IconButton>
  //         </Box>
  //       ))}

  //         {/* Price Field */}
  //         <TextField
  //             type="number"
  //             label="totalPrice"
  //             value={formData.totalPrice || "0"}
  //              sx={{ width: 100 }}
  //           />

  //       {/* Add Item Button */}
  //       <Button startIcon={<AddIcon />} onClick={addItem} variant="contained" sx={{ mt: 2 }}>
  //         Add Item
  //       </Button>

  //       {/* Submit Button */}
  //       <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
  //         Submit Order
  //       </Button>
  //     </form>
  //   </Box>
  // );
  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Navbar />
      <Typography variant="h5" gutterBottom>
        Add New Order
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Customer Selection */}
        <Autocomplete
          freeSolo
          options={customers}
          getOptionLabel={(option) => option.name || ""}
          onInputChange={(event, newValue) => fetchCustomers(newValue)}
          onChange={(event, newValue) =>
            setFormData({
              ...formData,
              customerId: newValue ? newValue._id : "sample id",
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Customer"
              error={!!errors.customerId}
              helperText={errors.customerId}
            />
          )}
        />

        {/* Items Selection */}
        {formData.items.map((item, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 2, my: 1 }}
          >
            {/* Item Dropdown */}
            <Autocomplete
              freeSolo
              options={items}
              getOptionLabel={(option) => option.itemName || "hello"}
              onInputChange={(event, newValue) => fetchItems(newValue)}
              onChange={(event, newValue) => {
                const selectedItem = newValue || {
                  itemName: "sample item",
                  price: "dummy price",
                  itemId: "",
                  image: "", // Image field added
                };

                handleItemChange(index, {
                  itemId: selectedItem._id,
                  item: selectedItem.itemName,
                  price: selectedItem.price,
                  image: selectedItem.image, // Store image URL
                });
              }}
              sx={{ minWidth: 200 }}
              // ✅ Custom rendering for options (Item Image + Name)
              renderOption={(props, option) => (
                <Box
                  component="li"
                  {...props}
                  sx={{ display: "flex", alignItems: "center", gap: 1, p: 1 }}
                >
                  {option.image && (
                    <Box
                      component="img"
                      src={option.image}
                      alt={option.itemName}
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: 1,
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <Typography>{option.itemName}</Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Item"
                  error={!!errors[`item-${index}`]}
                  helperText={errors[`item-${index}`]}
                />
              )}
            />

            {/* Image Preview */}
            {item.image && (
              <Box
                component="img"
                src={item.image}
                alt="Item Image"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  objectFit: "cover",
                }}
              />
            )}

            {/* Price Field */}
            <TextField
              type="number"
              label="Price"
              value={item.price || "0"}
              onChange={(e) => handleItemChange(index, "price", e.target.value)}
              sx={{ width: 100 }}
            />

            {/* Quantity Field */}
            <TextField
              type="number"
              label="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
              error={!!errors[`quantity-${index}`]}
              helperText={errors[`quantity-${index}`]}
              sx={{ width: 100 }}
            />

            {/* Remove Item Button */}
            <IconButton onClick={() => removeItem(index)} color="error">
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}

        {/* Total Price Field - Now properly aligned below the items */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <TextField
            type="number"
            label="Total Price"
            value={formData.totalPrice || "0"}
            sx={{ width: 200, textAlign: "right" }}
            InputProps={{ readOnly: true }}
          />
        </Box>

        {/* Add Item Button */}
        <Button
          startIcon={<AddIcon />}
          onClick={addItem}
          variant="contained"
          sx={{ mt: 2 }}
        >
          Add Item
        </Button>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Submit Order
        </Button>
      </form>
    </Box>
  );
};

export default AddOrder;
