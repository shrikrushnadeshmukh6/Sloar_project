import axios from "axios";

export const api = axios.create({
  baseURL: "https://sloar-project.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function submitEnquiry(payload) {
  const { data } = await api.post("/enquiry", payload);
  return data;
}
