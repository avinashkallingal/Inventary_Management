import { useState, ChangeEvent, FormEvent } from "react";
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

interface Customer {
  _id: string;
  name: string;
}

interface Item {
  _id: string;
  itemName: string;
  price: number;
  image?: string;
}

interface OrderItem {
  item: string;
  quantity: number;
  price: number;
  image?: string;
  itemId?: string;
}

interface Errors {
  [key: string]: string;
}

const AddOrder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    customerId: string;
    items: OrderItem[];
    totalPrice: number;
  }>({
    customerId: "",
    items: [{ item: "", quantity: 1, price: 0 }],
    totalPrice: 0,
  });

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [errors, setErrors] = useState<Errors>({});

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

  const handleItemChange = (
    index: number,
    updates: Partial<OrderItem> | keyof OrderItem,
    value?: string | number
  ) => {
    console.log(formData, "handle change triggered");

    let updatedItems;

    if (typeof updates === "string") {
      updatedItems = formData.items.map((item, i) =>
        i === index ? { ...item, [updates]: value } : item
      );
    } else {
      updatedItems = formData.items.map((item, i) =>
        i === index ? { ...item, ...updates } : item
      );
    }

    console.log(updatedItems, " updsted items");

    const totalPrice = updatedItems.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
      0
    );

    setFormData((prev) => ({ ...prev, items: updatedItems, totalPrice }));

    console.log(updatedItems, " form data after handle triggered");
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { item: "", quantity: 1, price: 0 }],
    });
  };

  const removeItem = (index: number) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const validateForm = () => {
    let newErrors: Errors = {};
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await axios.post(OrderEndpoints.addOrder, formData);
      if (result.data.success) {
        toast.success("Order added successfully");
        navigate("/orders");
      } else {
        toast.error("Failed to add order");
      }
    } catch (error) {
      console.error("Error adding order:", error);
      toast.error("An error occurred");
    }
  };

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
        <Autocomplete
          freeSolo
          options={customers}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.name || ""
          }
          onInputChange={(_event, newValue) => fetchCustomers(newValue)}
          onChange={(_event, value) => {
            const selectedCustomer =
              typeof value === "object" && value !== null
                ? value
                : { _id: "sample id", name: "" }; // fallback dummy Customer

            setFormData({
              ...formData,
              customerId: selectedCustomer._id,
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Customer"
              error={!!errors.customerId}
              helperText={errors.customerId}
            />
          )}
        />


        {formData.items.map((item, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 2, my: 1 }}
          >
            <Autocomplete
              freeSolo
              options={items}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.itemName || "hello"
              }
              onInputChange={(_event, newValue) => fetchItems(newValue)}
              onChange={(
                _event,
                value,
                _reason
              ) => {
                const selectedItem =
                  typeof value === "object" && value !== null
                    ? value
                    : {
                      itemName: "sample item",
                      price: 0,
                      _id: "",
                      image: "",
                    };

                handleItemChange(index, {
                  itemId: selectedItem._id,
                  item: selectedItem.itemName,
                  price: selectedItem.price,
                  image: selectedItem.image,
                });
              }}
              sx={{ minWidth: 200 }}
              renderOption={(props, option) => {
                const typedOption = option as Item;
                return (
                  <Box
                    component="li"
                    {...props}
                    sx={{ display: "flex", alignItems: "center", gap: 1, p: 1 }}
                  >
                    {typedOption.image && (
                      <Box
                        component="img"
                        src={typedOption.image}
                        alt={typedOption.itemName}
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: 1,
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <Typography>{typedOption.itemName}</Typography>
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Item"
                  error={!!errors[`item-${index}`]}
                  helperText={errors[`item-${index}`]}
                />
              )}
            />

            <TextField
              type="number"
              label="Quantity"
              value={item.quantity}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleItemChange(index, "quantity", Number(e.target.value))
              }
              error={!!errors[`quantity-${index}`]}
              helperText={errors[`quantity-${index}`]}
              sx={{ width: 100 }}
            />

            <IconButton onClick={() => removeItem(index)} color="error">
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <TextField
            type="number"
            label="Total Price"
            value={formData.totalPrice || "0"}
            sx={{ width: 200, textAlign: "right" }}
            InputProps={{ readOnly: true }}
          />
        </Box>

        <Button
          startIcon={<AddIcon />}
          onClick={addItem}
          variant="contained"
          sx={{ mt: 2 }}
        >
          Add Item
        </Button>

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
