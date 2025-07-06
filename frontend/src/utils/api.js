import axios from "axios";

export const api = axios.create({
  baseURL: "https://fullstackblog-gr1p.onrender.com/api",
   withCredentials: true
});