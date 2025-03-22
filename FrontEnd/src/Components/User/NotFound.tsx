import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";


interface IncomingCallWindowProps {
  open: boolean;
  callerName?:string|null;
  onClose: () => void;
  onDecline: () => void;
  onAccept:()=> void;
}
const IncomingCallWindow: React.FC<IncomingCallWindowProps> = ({ open,callerName, onClose,onDecline,onAccept }) => {

  // const [open, setOpen] = useState<boolean>(true);

  const handleAccept = () => {
    // setOpen(false);
    onAccept()
  };

  const handleDecline = () => {
    onDecline();
    // setOpen(false);
    onClose()
    
  };

  return (
    <Dialog open={open} onClose={handleDecline}>
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
          Incoming Call
        </Typography>
        <Typography variant="body1">
          {callerName} is calling...
        </Typography>
      </DialogContent>
      <DialogActions
        style={{
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={handleAccept}
        >
          Accept
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDecline}
        >
          Decline
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IncomingCallWindow;
