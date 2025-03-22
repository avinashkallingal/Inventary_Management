// export const BACKEND_BASE_URL = 'https://mywebsite';
export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const CustomerEndpoints = {

 
  addCustomer: `${BACKEND_BASE_URL}/customer/addCustomer`,

  getCustomers: `${BACKEND_BASE_URL}/customer/getCustomers`,
  getCustomer: `${BACKEND_BASE_URL}/customer/getCustomer`,
  updateCustomer: `${BACKEND_BASE_URL}/customer/updateCustomer`,
  deleteCustomer:`${BACKEND_BASE_URL}/customer/deleteCustomer`,


  searchCustomers: `${BACKEND_BASE_URL}/customer/search`,
  refreshToken: `${BACKEND_BASE_URL}/refresh-token`,
 
};
