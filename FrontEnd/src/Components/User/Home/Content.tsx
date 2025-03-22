import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Menu, MenuItem, Modal } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { userEndpoints } from "../../../Constraints/Endpoints/UserEndPoints";
import IItem from "../../../Interfaces/IItem";
import { toast } from "sonner";
import Swal from "sweetalert2";

const Content: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<IItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    async function dataFetch() {
      const result = await axios.get(userEndpoints.getItems);
      if (result.data.success) {
        setItems(result.data.data);
      }
    }
    dataFetch();
  }, []);

  const handleAddItem = () => {
    navigate("/addItem");
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, itemId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedItemId(itemId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItemId(null);
  };

  const handleEdit = () => {
    if (selectedItemId) navigate(`/editItem/${selectedItemId}`);
    handleMenuClose();
  };

  // const handleDelete = async () => {
  //   if (selectedItemId) {
  //     const result=await axios.delete(`${userEndpoints.deleteItem}/${selectedItemId}`);
  //     if(result.data.success){
  //       toast.info("Item deleted successfully")
  //       setItems(items.filter(item => item._id !== selectedItemId));
  //     }else{
  //       toast.error("Failed to delete item")
  //     }
      
  //   }
  //   handleMenuClose();
  // };

  const handleDelete = async () => {
    if (!selectedItemId) return;
  
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (!result.isConfirmed) return;
  
    try {
      const res = await axios.delete(`${userEndpoints.deleteItem}/${selectedItemId}`);
      console.log(res.data,"data after delete");
      if (res.data.success) {
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
        setItems(items.filter(item => item._id !== selectedItemId));
      } else {
        Swal.fire("Error!", "Failed to delete item.", "error");
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  
    handleMenuClose();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 3, minWidth: "75vw" }}>
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h4">Inventory List</Typography>
        <Button variant="contained" color="primary" onClick={handleAddItem}>Add Item</Button>
      </Box>

      {/* Inventory Table */}
      <TableContainer component={Paper} sx={{ maxHeight: "calc(100vh - 192px)", overflow: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>itemID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item: IItem) => (
              <TableRow key={item._id}>
                <TableCell>{item.itemId}</TableCell>
                <TableCell>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.itemName}
                      style={{ width: 50, height: 50, cursor: "pointer", borderRadius: "5px" }}
                      onClick={() => handleImageClick(`${item.image}`)}
                    />
                  )}
                </TableCell>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleMenuClick(event, `${item._id}`)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Image Preview */}
      <Modal open={Boolean(selectedImage)} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            borderRadius: "8px",
          }}
        >
          <img src={selectedImage || ""} alt="Selected Item" style={{ width: "100%", maxHeight: "80vh", borderRadius: "5px" }} />
          <Button onClick={handleCloseModal} sx={{ mt: 2 }} variant="contained" color="secondary" fullWidth>
            Close
          </Button>
        </Box>
      </Modal>

      {/* Menu for Actions */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>Edit Item</MenuItem>
        <MenuItem onClick={handleDelete}>Delete Item</MenuItem>
      </Menu>
    </Box>
  );
};

export default Content;