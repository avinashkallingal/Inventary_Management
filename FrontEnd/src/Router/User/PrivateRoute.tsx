import { Navigate, Outlet } from "react-router-dom";
// import Cookies from "js-cookie";


const PrivateRoute = () => {

    // const token = Cookies.get('token');
    // const refreshToken = Cookies.get('refreshToken');
    const token = localStorage.getItem('userToken_Inventory')
    const refreshToken = localStorage.getItem('userRefreshToken_Inventory')
    console.log(token,refreshToken," token in private route")

    return token || refreshToken ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute