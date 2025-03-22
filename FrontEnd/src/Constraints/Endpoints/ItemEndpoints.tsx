// export const BACKEND_BASE_URL = 'https://mywebsite';
export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const ItemEndpoints = {

 
  addItem: `${BACKEND_BASE_URL}/item/addItem`,
  getItems: `${BACKEND_BASE_URL}/item/getItems`, 

  searchItems: `${BACKEND_BASE_URL}/item/search`,
  refreshToken: `${BACKEND_BASE_URL}/refresh-token`,
 
};