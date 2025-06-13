import axios from 'axios';

const API_BASE = "http://127.0.0.1:8000";  // adjust if backend runs elsewhere

export const getClasses = () => axios.get(`${API_BASE}/classes/`);

export const bookClass = (payload) => axios.post(`${API_BASE}/book/`, payload);

export const getBookings = (email) => axios.get(`${API_BASE}/bookings/`, { params: { email } });
