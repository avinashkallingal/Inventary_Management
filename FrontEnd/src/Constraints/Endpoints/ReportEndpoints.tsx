// export const BACKEND_BASE_URL = 'https://mywebsite';
export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const ReportEndpoints = {

 
  fetchLedger: `${BACKEND_BASE_URL}/report/ledger`,
  sales: `${BACKEND_BASE_URL}/report/sales`,
  itemReport:`${BACKEND_BASE_URL}/report/items`,

  getOrders: `${BACKEND_BASE_URL}/report/getOrders`,


  searchCustomers: `${BACKEND_BASE_URL}/search`,
  refreshToken: `${BACKEND_BASE_URL}/refresh-token`,
 
};