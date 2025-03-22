import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import axios from "axios";

const EmailVerification: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    setUserId(id);
  }, [location]);

  const handleVerify = async () => {
    if (!userId) return;
    try {
      const response = await axios.post("http://localhost:6001/verifyEmail", { id: userId });
      alert(response.data.message);
      setOpen(false);
      navigate("/"); // Redirect after verification
    } catch (error) {
      alert("Verification failed. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Email Verification
        </Typography>
        <Typography variant="body1">
          Click the button below to verify your email.
        </Typography>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerify}
          disabled={!userId}
        >
          Verify
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmailVerification;
