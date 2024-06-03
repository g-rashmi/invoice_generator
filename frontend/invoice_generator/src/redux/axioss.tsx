// src/api/axios.ts
import axios from "axios";
const backend_url = "https://invoice-generator-5.onrender.com";
const apiClient = axios.create({
  baseURL: backend_url, // Replace with your backend URL
});

export default apiClient;
