// src/api/axios.ts
import axios from 'axios';
const backend_url='https://invoice-generator-3.onrender.com/generate';
const apiClient = axios.create({
  baseURL: backend_url, // Replace with your backend URL
});

export default apiClient;
