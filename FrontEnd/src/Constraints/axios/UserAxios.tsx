import axios from 'axios';
import { HttpStatus } from '../../Interfaces/StatusCode';
import { userEndpoints } from '../Endpoints/UserEndPoints';
// import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken_Inventory');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response.status,"error in axios respoonse")

    if (error.response.status === HttpStatus.UNAUTHORIZED && !originalRequest._retry) {
      originalRequest._retry = true;

      try {

        const refreshToken = localStorage.getItem('userRefreshToken');
        
        const response = await axios.post(userEndpoints.refreshToken, { refreshToken });
        
        // console.log(response,'response in refresh token ')

        
        const newAccessToken = response.data.accessToken;
        console.log(newAccessToken," new access token in retry**********")
        localStorage.setItem('userToken', newAccessToken);
        

        axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        console.log(originalRequest," original request&&&&&&&&&&&&&")
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log(refreshError,"  token error found in user axios file")
        localStorage.removeItem('userToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';  
      }
    }

    if (error.response.status === HttpStatus.FORBIDDEN) {
      console.log("hiii inside 403 status if ))))))))))))))))))")
      // const navigate=useNavigate()
      localStorage.removeItem("userToken");
      localStorage.removeItem("email");
      localStorage.removeItem("userRefreshToken");
      // navigate("/");
      location.href="/login"
      // navigate('/login')
    }


    
    return Promise.reject(error);
  }
);
export default axiosInstance;