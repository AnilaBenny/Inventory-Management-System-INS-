import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://inventory-management-system-ins.onrender.com",
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});


export default axiosInstance;