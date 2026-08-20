import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://sloar-project.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});
