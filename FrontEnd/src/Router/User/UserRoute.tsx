import { Routes, Route } from "react-router-dom";

// import Signup from "../../Pages/user/Signup/Signup";
// import Otp from "../../Pages/user/Otp/Otp";
// import UserProfileEdit from "../../Pages/user/UserProfile/UserProfileEdit";
// import UserProfile from "../../Pages/user/UserProfile/UserProfile";

import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
// import AddPost from "../../Pages/posts/AddPost";
// import Home from "../../Pages/user/Home/Home";
// import EditPost from "../../Components/user/Home/EditPost"
// import ChatBox from "../../Pages/user/ChatBox/ChatBox";
// import ViewPost from "../../Pages/user/ViewPost/ViewPost";
// import PrivateRoute from "./PrivateRoute";
// import PrivateRouteUser from "./PrivateUserRoute";

import EmailVerificationSuccess from "../../Components/User/Auth/Signup/emailVerifyPage";
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import Home from "../../Pages/Home/Home";
import AddItem from "../../Components/User/Items/AddItem";
import CustomerManagement from "../../Components/User/Customers/CustomerList";
import OrderManagement from "../../Components/User/Orders/OrderHistory";
import ReportsPage from "../../Components/User/Report/Report";
import AddOrder from "../../Components/User/Orders/AddOrder";
import AddCustomer from "../../Components/User/Customers/AddCustomer";

import EditItem from "../../Components/User/Home/EditItem";
import EditCustomer from "../../Components/User/Customers/EditCustomer";
// import TagPage from "../../Pages/user/TagPage/TagPage";
// import UserBlock from "../../Components/user/Auth/UserBlock";

function UserRoute() {
  // console.log("hi this is user router page");
  return (
    <>
      <Routes>

        // public routes
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/email" element={<EmailVerificationSuccess />} />
          {/* <Route path='/reset-password/:id' element={<ForgotPassword />} /> */}
        </Route>

        // private rotues
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/addItem" element={<AddItem />} />

          <Route path="/customers" element={<CustomerManagement />} />
          <Route path="/addCustomer" element={<AddCustomer />} />
          
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/addOrder" element={<AddOrder />} />

          <Route path="/report" element={<ReportsPage />} />

          {/* <Route path="/pdf-export" element={<PdfExport />} /> */}
          <Route path="/editItem/:itemId" element={<EditItem />} />
          <Route path="/editCustomer/:customerId" element={<EditCustomer />} />

          {/* <Route path="/editItem" element={<EditItem />} /> */}
          
          {/* <Route path="/blogDetail" element={<BlogDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/editBlog" element={<EditBlogPage />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default UserRoute;
