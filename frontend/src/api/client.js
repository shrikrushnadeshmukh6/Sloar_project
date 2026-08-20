// import axios from 'axios';

// export default axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'https://sloar-project.onrender.com',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });
import axios from "axios";

export const api = axios.create({
  baseURL: "https://sloar-project.onrender.com/api", 
});

export async function submitEnquiry(payload) {
  const { data } = await api.post("/enquiry", payload);
  return data;
}
