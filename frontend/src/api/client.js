import axios from "axios";

// Seedha live backend URL hardcode kar dein production ke liye
const baseURL = "https://sloar-project.onrender.com/api";

export const api = axios.create({ baseURL });

export async function submitEnquiry(payload) {
  const { data } = await api.post("/enquiry", payload);
  return data;
}
