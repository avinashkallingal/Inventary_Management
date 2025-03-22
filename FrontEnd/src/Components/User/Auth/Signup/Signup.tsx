import * as React from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
import { toast } from "sonner";
import { userEndpoints } from "../../../../Constraints/Endpoints/UserEndPoints";

// import LoadingPage from "../../Home/Loading";

const defaultTheme = createTheme();


interface formData {
    username: string;
    phone: string;
    email: string;
    address: string;
    password: string;
  }
  

export default function SignUp() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<formData>({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });


  const [isLoading, setIsLoading] = React.useState(false); // Loading status
 


  
  const navigate = useNavigate();
  // const isSmallScreen = useMediaQuery(defaultTheme.breakpoints.down("sm"));

  React.useEffect(()=>{
    
  })


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.info("signup clicked")
    console.log("SignUp clicked")
    let formErrors: formData = {};
    // Validate form fields
    if (!username) formErrors.username = "Username is required";
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email is invalid";
    }
    if (!password) {
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
    }
    if (!phone) {
        formErrors.phone = "Phone Number is required";
      } else if (!/^\d+$/.test(phone) || phone.length < 10) {
        formErrors.phone = "Enter a valid phone number";
      }
   

    // Set errors state if any errors found
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    // Clear errors if validation passes
    setErrors({});
    // Prepare data to send in API request
    setEmail(email.trim());
    console.log(email," trimmed email in sign up front end2222222222222")
    const data = {
      username,
      email,
      password,
      phone,      
    };
    try {
      // Make POST request with Axios
      setIsLoading(true)
      const result = await axios.post(userEndpoints.register, data);
      console.log(result.data);
    
      if (result.data.data.success) {
        toast.info("Verify your email");
        // localStorage.setItem("otp", result.data.data.otp);
        setIsLoading(false)
        navigate("/otp");
      } else {
        toast.error("email already found");
      }
    } catch (error) {
      console.error("Error duriing signup:", error);
      if (axios.isAxiosError(error)) {
        console.log("isAxiosError :", error);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };


  const signin = () => {
    navigate("/");
  };




return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: 4,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: "#1976d2" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inventory System Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography
                  variant="body2"
                  sx={{ cursor: "pointer", color: "#1976d2" }}
                  onClick={() => navigate("/")}
                >
                  Already have an account? Sign in
                </Typography>
              </Grid>
            </Grid>
           
          </Box>
        </Box>
      
      </Container><br/>
      {Copyright("abc")}
    </ThemeProvider>
  );







}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
