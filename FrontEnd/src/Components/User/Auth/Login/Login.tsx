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
import useMediaQuery from "@mui/material/useMediaQuery";
// import { styled } from "@mui/material/styles";
import image from "../../../../assets/inventary_login_bg.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
// import { useEffect } from "react";
import Swalert from "sweetalert2";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Login.css";
import {useDispatch} from "react-redux"
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
  const isSmallScreen = useMediaQuery(defaultTheme.breakpoints.down("sm"));

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
     
        //adding to redux store
      //   const user = {
      //     _id: result.data.user_data._id,
      //     email: result.data.user_data.email,
      //     name: result.data.user_data.name,
      //     avatar:""
      // }
      console.log('Dispatching userlogin action');
      // dispatch(login({ token: result.data.token, userData: user }));
        //
        console.log(result.data," token in fromt end")
        localStorage.setItem("userToken_Inventory", result.data.token.accessToken);
        localStorage.setItem("userRefreshToken_Inventory", result.data.token.refreshToken);
       
        localStorage.setItem("email_Invetory", result.data.data.email);
        localStorage.setItem("id_Invetory", result.data.data._id);
        navigate("/home");
        location.href="/home"
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

  const forgot = async () => {
    try {
      const { value: email } = await Swalert.fire({
        title: "Forgot Password",
        input: "email",
        inputLabel: "Enter your email address",
        inputPlaceholder: "Enter your email address",
        showCloseButton: true,
        customClass: {
          confirmButton: "orange-theme-confirm-button",
          cancelButton: "orange-theme-cancel-button",
        },
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
        showCancelButton: true,
    
      });
      //

      //
      if (email) {
        const response: any = await axios.post(
          userEndpoints.verifyEmail,
          { email }
        );
        console.log("Full Response:", response.data);
        if (response.data.success) {
          toast.info("veryfy your email....");

         
          const { value: otp } = await Swalert.fire({
            title: "OTP Verification",
            input: "text",
            inputLabel: "Enter the OTP sent to your email",
            inputPlaceholder: "OTP",
            showCloseButton: true,
            customClass: {
              confirmButton: "orange-theme-confirm-button",
              cancelButton: "orange-theme-cancel-button",
            },
            confirmButtonText: "Verify",
            cancelButtonText: "Cancel",
            showCancelButton: true,
            inputValidator: async (value) => {
              if (!value) {
                return "You need to enter the OTP!";
              } else if (value) {
                //
                console.log(value, " value in client side swal");
                const otp = value;
                const operation = "change_password_otp";
                const response: any = await axios.post(
                  userEndpoints.otpVerify,
                  { otp, operation }
                );
                if (!response.data.success) {
                  return "Invalid otp";
                }

                //
              }
              // if (value != verifyResponse.data.user_data.otp) {
              //     return "Invalid otp"
              // }
            },
          });
          //
          if (otp) {
            const operation = "change_password_otp";
            const response: any = await axios.post(
              userEndpoints.otpVerify,
              { otp, operation }
            );
            if (response.data.success) {
              //change password ui
              //
              const { value: formValues } = await Swalert.fire({
                title: "Reset Password",
                html:
                  '<input id="swal-input1" type="password" class="swal2-input" placeholder="New Password">' +
                  '<input id="swal-input2" type="password" class="swal2-input" placeholder="Confirm Password">',
                focusConfirm: false,
                confirmButtonText: "Change Password",
                showCancelButton: true,
               
                preConfirm: () => {
                  const password = (document.getElementById("swal-input1") as HTMLInputElement).value;
                  const confirmPassword = (document.getElementById("swal-input2") as HTMLInputElement).value;
                
                  // Validation Rules
                  const minLength = 8;
                
                  if (!password || !confirmPassword) {
                    Swalert.showValidationMessage("Both fields are required!");
                    return;
                  }
                
                  if (password !== confirmPassword) {
                    Swalert.showValidationMessage("Passwords do not match!");
                    return;
                  }
                
                  if (password.length < minLength) {
                    Swalert.showValidationMessage(`Password must be at least ${minLength} characters long.`);
                    return;
                  }
                
                  if (!/[A-Z]/.test(password)) {
                    Swalert.showValidationMessage("Password must include at least one uppercase letter.");
                    return;
                  }
                
                  if (!/[a-z]/.test(password)) {
                    Swalert.showValidationMessage("Password must include at least one lowercase letter.");
                    return;
                  }
                
                  if (!/[0-9]/.test(password)) {
                    Swalert.showValidationMessage("Password must include at least one number.");
                    return;
                  }
                
                  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                    Swalert.showValidationMessage("Password must include at least one special character.");
                    return;
                  }
                
                  if (/\s/.test(password)) {
                    Swalert.showValidationMessage("Password must not contain spaces.");
                    return;
                  }
                
                  // If validation passes, return the passwords
                  return { password, confirmPassword };
                },
              });

              if (formValues) {
                const { password } = formValues;

                const resetResponse = await axios.post(
                  userEndpoints.resetPassword,
                  {
                    email,
                    newPassword: password,
                  }
                );

                if (resetResponse.data.success) {
                  Swalert.fire({
                    title: "Success",
                    text: "Your password has been reset!",
                    icon: "success",
                    confirmButtonText: "OK",
                  });
                  navigate("/");
                } else {
                  toast.error(resetResponse.data.message);
                }
              }
           
            } else {
              toast.error(response.data.message);
            }
          }
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {}
  };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container
//         component="main"
//         maxWidth="xl"
//         sx={{
//           backgroundImage: `url(${image})`,
//           backgroundSize: isSmallScreen ? "cover" : "cover",
//           backgroundPosition: "center",
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             display: "flex",
//             backgroundColor: "rgba(0, 0, 0, 0.3)",
//             zIndex: 1,
//           },
//           "& > *": {
//             position: "relative",
//             zIndex: 2,
//           },
//           height: "100vh",
//           width: "100vw",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 15,
//             width: isSmallScreen ? "90%" : "460px",
//             backgroundColor: "rgba(256, 256, 256, 0.8)",
//             boxShadow: 10,
//             p: 2,
//             borderRadius: 2,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 2, bgcolor: "#D3A221" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             noValidate
//             sx={{ mt: 1 }}
//           >
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               error={!!errors.email}
//               helperText={errors.email}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               error={!!errors.password}
//               helperText={errors.password}
//             />
//             {/* <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             /> */}
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2, bgcolor: "#D3A221" }}
//             >
//               Sign In
//             </Button>
//             <div className="google-login-button">
//             <GoogleLogin
//               onSuccess={async(credentialResponse) => {
//                 console.log(credentialResponse, "google login");

//                 const decoded = jwtDecode(credentialResponse?.credential);
//                 console.log(decoded);
//                 const result=await axios.post(userEndpoints.googleLogin,{decoded})
//                 console.log(result," google login response in front end")
//                 if(result.data.success){
//                   localStorage.setItem("userToken", result.data.token.accessToken);
//                   localStorage.setItem("userRefreshToken", result.data.token.refreshToken);
//                   localStorage.setItem("email", result.data.user_data.email);
//                   localStorage.setItem("id", result.data.user_data._id);


//                   navigate("/home");
//                 }else{
//                   toast.error("error in google login")
//                 }
               
//               }}
//               onError={() => {
//                 console.log("google login failed")
//                 toast.error("google login failed")
//               }}
//             />
//             </div>
//             <Grid container>
//               <Grid item xs>
//                 <Link
//                   variant="body2"
//                   onClick={forgot}
//                   style={{ cursor: "pointer" }}
//                 >
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link
//                   variant="body2"
//                   onClick={signup}
//                   style={{ cursor: "pointer" }}
//                 >
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 8, mb: 4 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }


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
              const decoded = jwtDecode(credentialResponse?.credential);
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
