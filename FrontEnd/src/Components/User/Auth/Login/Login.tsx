import * as React from "react";
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

// import { styled } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
// import { useEffect } from "react";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

// import {RootState} from "../../../../redux/Store/Store"
// import { login } from "../../../../redux/Slice/UserSlice";
import { userEndpoints } from "../../../../Constraints/Endpoints/UserEndPoints";

const defaultTheme = createTheme();

export default function SignIn() {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
  }>({});
  const navigate = useNavigate();
  // const dispatch = useDispatch();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formErrors: { email?: string; password?: string } = {};

    // Validate email
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email is invalid";
    }

    // Validate password
    if (!password) {
      formErrors.password = "Password is required";
    }

    // Set errors state
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    console.log({ email, password });
    const data = { email: email, password: password };
    // Clear errors if validation passes
    setErrors({});

    //
    try {
      // Make POST request with Axios
      const result = await axios.post(userEndpoints.login, data);

      if (result.data.success) {
        toast.info("logged in successfully");

     
        console.log('Dispatching userlogin action');
       
        console.log(result.data, " token in fromt end")
        localStorage.setItem("userToken_Inventory", result.data.token.accessToken);
        localStorage.setItem("userRefreshToken_Inventory", result.data.token.refreshToken);

        localStorage.setItem("email_Invetory", result.data.data.email);
        localStorage.setItem("id_Invetory", result.data.data._id);
        navigate("/home");
        location.href = "/home"
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.error("Error duriing signup:", error);
      if (axios.isAxiosError(error)) {
        console.log("isAxiosError :", error);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
    //
  };

  const signup = () => {
    navigate("/signup");
  };

  // const forgot = async () => {
  //   try {
  //     const { value: email } = await Swalert.fire({
  //       title: "Forgot Password",
  //       input: "email",
  //       inputLabel: "Enter your email address",
  //       inputPlaceholder: "Enter your email address",
  //       showCloseButton: true,
  //       customClass: {
  //         confirmButton: "orange-theme-confirm-button",
  //         cancelButton: "orange-theme-cancel-button",
  //       },
  //       confirmButtonText: "Submit",
  //       cancelButtonText: "Cancel",
  //       showCancelButton: true,

  //     });
  //     //

  //     //
  //     if (email) {
  //       const response: any = await axios.post(
  //         userEndpoints.verifyEmail,
  //         { email }
  //       );
  //       console.log("Full Response:", response.data);
  //       if (response.data.success) {
  //         toast.info("veryfy your email....");
  //         //very link logic

  //         //




  //       }
  //     }
  //   } catch (error) { }
  // };



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
        <CssBaseline />
        <Box
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "rgba(256, 256, 256, 0.9)",
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "#1976D2", mx: "auto", mb: 2 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
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
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: "#1976D2" }}>
              Sign In
            </Button>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const credential = credentialResponse?.credential;

                if (!credential) {
                  console.error("No credential returned from Google");
                  return;
                }

                const decoded = jwtDecode(credential); //credential is a definite string
                const result = await axios.post("/api/user/googleLogin", { decoded });

                if (result.data.success) {
                  localStorage.setItem("userToken", result.data.token.accessToken);
                  navigate("/home");
                }
              }}
              onError={() => console.log("Google login failed")}
            />

            <Grid container sx={{ mt: 2 }}>
              <Grid item xs>
                <Link variant="body2" style={{ cursor: "pointer" }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  variant="body2"
                  onClick={signup}
                  style={{ cursor: "pointer" }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};


