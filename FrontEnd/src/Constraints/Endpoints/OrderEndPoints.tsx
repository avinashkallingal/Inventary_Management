// export const BACKEND_BASE_URL = 'https://mywebsite';
export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const OrderEndpoints = {

 
  addOrder: `${BACKEND_BASE_URL}/order/addOrder`,

  getOrders: `${BACKEND_BASE_URL}/order/getOrders`,


  searchCustomers: `${BACKEND_BASE_URL}/search`,
  refreshToken: `${BACKEND_BASE_URL}/refresh-token`,
 
};
