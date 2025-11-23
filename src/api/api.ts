import axios from "axios";
const uri = import.meta.env.VITE_BASE_URL;
const api = axios.create({
  baseURL: uri,
});
export default api;
