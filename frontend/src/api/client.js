import axios from "axios";

// In dev, Vite proxies /api to the Node/Express backend (see vite.config.js).
// In production, set VITE_API_URL to your deployed backend URL.
const baseURL = import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({ baseURL });

export async function submitEnquiry(payload) {
  const { data } = await api.post("/enquiry", payload);
  return data;
}
