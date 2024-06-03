// src/api/axios.ts
import axios from "axios";
const backend_url = "http://localhost:3000";
const apiClient = axios.create({
  baseURL: backend_url, // Replace with your backend URL
});

export default apiClient;
