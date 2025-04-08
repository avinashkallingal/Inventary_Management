
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {

    // const token = Cookies.get('token');
    // const refreshToken = Cookies.get('refreshToken');

    const token = localStorage.getItem('userToken_Inventory')
    const refreshToken = localStorage.getItem('userRefreshToken_Inventory')
   

    console.log(token,refreshToken," token in public route")

    return token || refreshToken ? <Navigate to='/home' /> : <Outlet/>
}
export default PublicRoute;

