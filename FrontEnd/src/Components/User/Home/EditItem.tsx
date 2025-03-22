import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import axios from "axios";
import { userEndpoints } from "../../../Constraints/Endpoints/UserEndPoints";
import IItem from "../../../Interfaces/IItem";
import Navbar from "../Navbar";
import { toast } from "sonner";

const EditItem: React.FC = () => {
  const navigate = useNavigate();
  const { itemId } = useParams<{ itemId: string }>();
  const [item, setItem] = useState<IItem | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await axios.get(`${userEndpoints.getItem}/${itemId}`);
        if (response.data.success) {
          console.log(response.data.data[0],"data after a item fetch in edit item");
          setItem(response.data.data[0]);
          setPreviewImage(response.data.data[0].image);
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    }
    fetchItem();
  }, [itemId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem((prev) => prev ? { ...prev, [e.target.name]: e.target.value } : null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async () => {
    if (!item) return;

    const formData = new FormData();
    formData.append("id", item.itemId ?? ""); // If undefined, fallback to an empty string
    formData.append("itemName", item.itemName);
    formData.append("category", item.category);
    formData.append("quantity", item.quantity.toString());
    formData.append("price", item.price.toString());
    if (newImage) formData.append("image", newImage);

    try {
      const result=await axios.put(`${userEndpoints.updateItem}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if(result.data.success){
        toast.info("item updated successfully")
        navigate("/home");

      }else{
        toast.error("Failed to update item")
      }
      
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  if (!item) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 3 }}>
      <Navbar/>
      <Typography variant="h4">Edit Item</Typography>
      <Paper sx={{ padding: 3, marginTop: 2, width: "100%", maxWidth: 500 }}>
        {previewImage && (
          <img src={previewImage} alt="Preview" style={{ width: "100%", maxHeight: 200, borderRadius: 5 }} />
        )}
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload New Image
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Button>
        <TextField fullWidth label="Product Name" name="itemName" value={item.itemName} onChange={handleInputChange} sx={{ mt: 2 }} />
        <TextField fullWidth label="Category" name="category" value={item.category} onChange={handleInputChange} sx={{ mt: 2 }} />
        <TextField fullWidth type="number" label="Quantity" name="quantity" value={item.quantity} onChange={handleInputChange} sx={{ mt: 2 }} />
        <TextField fullWidth type="number" label="Price" name="price" value={item.price} onChange={handleInputChange} sx={{ mt: 2 }} />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleSubmit}>
          Update Item
        </Button>
      </Paper>
    </Box>
 
  );
};

export default EditItem;
