// export const BACKEND_BASE_URL = 'https://mywebsite';
export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const userEndpoints = {

  register: `${BACKEND_BASE_URL}/register`,
  addItem: `${BACKEND_BASE_URL}/item/addItem`,
  getItems: `${BACKEND_BASE_URL}/item/getItems`, 
  getItem:`${BACKEND_BASE_URL}/item/getItem`, 
  updateItem:`${BACKEND_BASE_URL}/item/updateItem`, 
  deleteItem:`${BACKEND_BASE_URL}/item/deleteItem`,

  login: `${BACKEND_BASE_URL}/login`,
  logout: `${BACKEND_BASE_URL}/logout`,
  verifyEmail: `${BACKEND_BASE_URL}/verifyEmail`,
  resetPassword: `${BACKEND_BASE_URL}/resetPassword`,
  googleLogin: `${BACKEND_BASE_URL}/googleLogin`,
  fetchUserData: `${BACKEND_BASE_URL}/fetchUserData`,


  searchUsers: `${BACKEND_BASE_URL}/search`,
  refreshToken: `${BACKEND_BASE_URL}/refresh-token`,
 
};
