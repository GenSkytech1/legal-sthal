import axios from 'axios'; 

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Replace with your API base URL
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies in requests
});

export default api;