// src/api/axios.ts
import axios from 'axios';
import { backend_url } from './components/config';
const apiClient = axios.create({
  baseURL: backend_url, // Replace with your backend URL
});

export default apiClient;
