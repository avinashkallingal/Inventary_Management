import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Menu, MenuItem, Modal } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { userEndpoints } from "../../../Constraints/Endpoints/UserEndPoints";
import IItem from "../../../Interfaces/IItem";

import Swal from "sweetalert2";
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';

const Content: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<IItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredItems, setfilteredItems] = useState<IItem[]>()
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // or any number you like

  useEffect(() => {
    async function dataFetch() {
      setLoading(true)
      const result = await axios.get(userEndpoints.getItems);
      if (result.data.success) {
        setItems(result.data.data);
        setLoading(false)
      }
    }
    dataFetch();
  }, []);

  //pagination logic starts
  const displayedItems = searchTerm ? filteredItems || [] : items;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = displayedItems.slice(startIndex, startIndex + itemsPerPage);

  const pageCount = Math.ceil(displayedItems.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  //pagination logic ends


  const handleAddItem = () => {
    navigate("/addItem");
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = items.filter((item) =>
      item.itemName.toLowerCase().includes(value)
    );

    setfilteredItems(filtered);
    setCurrentPage(1); // reset to first page on search
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
      console.log(res.data, "data after delete");
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

  return (loading ? <><h1>Loading data.....</h1></> : (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 3, minWidth: "75vw" }}>
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h4">Inventory List</Typography>
        <Button variant="contained" color="primary" onClick={handleAddItem}>Add Item</Button>
        <TextField
          variant="outlined"
          placeholder="Search inventory..."
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)', // light transparent bg
            input: { color: 'white' }, // input text
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(255,255,255,0.5)', // border color
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#90caf9', // optional blue on focus
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'rgba(255,255,255,0.6)', // placeholder
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
          }}
        />

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
            {paginatedItems.map((item: IItem) => (
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

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 1 }}>
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: '#90caf9',
              backgroundColor: 'rgba(144,202,249,0.1)'
            },
            '&.Mui-disabled': {
              color: 'rgba(255,255,255,0.4)',
              borderColor: 'rgba(255,255,255,0.2)'
            }
          }}
        >
          Previous
        </Button>
        {Array.from({ length: pageCount }, (_, index) => (
          <Button
            key={index + 1}
            variant={currentPage === index + 1 ? "contained" : "outlined"}
            onClick={() => handlePageChange(index + 1)}
            sx={{
              color: currentPage === index + 1 ? 'black' : 'white',
              backgroundColor: currentPage === index + 1 ? '#90caf9' : 'transparent',
              borderColor: 'white',
              '&:hover': {
                borderColor: '#90caf9',
                backgroundColor: currentPage === index + 1 ? '#90caf9' : 'rgba(144,202,249,0.1)'
              }
            }}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          variant="outlined"
          disabled={currentPage === pageCount}
          onClick={() => handlePageChange(currentPage + 1)}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: '#90caf9',
              backgroundColor: 'rgba(144,202,249,0.1)'
            },
            '&.Mui-disabled': {
              color: 'rgba(255,255,255,0.4)',
              borderColor: 'rgba(255,255,255,0.2)'
            }
          }}
        >
          Next
        </Button>
      </Box>



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
  ));
};

export default Content;