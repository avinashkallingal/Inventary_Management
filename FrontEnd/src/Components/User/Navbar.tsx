import React from "react";
import { AppBar, Toolbar, Tabs, Tab, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  const handleCloseUserMenu = () => {
    localStorage.removeItem("userToken_Inventory");
    localStorage.removeItem("email");
    localStorage.removeItem("userRefreshToken_Inventory");
    navigate("/");
  };

  return (
    <AppBar position="fixed" sx={{ width: "100%", left: 0, top: 0 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Navigation Tabs */}
        <Tabs value={false} onChange={handleTabChange} textColor="inherit">
          <Tab label="Inventory" value="/" />
          <Tab label="Customers" value="/customers" />
          <Tab label="Transactions" value="/orders" />
          <Tab label="Reports" value="/report" />
        </Tabs>

        {/* User Info and Logout */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography>Username</Typography>
          <Button variant="contained" color="secondary" onClick={handleCloseUserMenu}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
