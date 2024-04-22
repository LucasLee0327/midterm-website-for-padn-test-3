import axios from "axios";

const api = axios.create({
  baseURL: "https://midterm-website-for-padn-backend.vercel.app/api/v1",
  withCredentials: true,
});

export default api;
