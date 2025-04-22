import axios from 'axios';

const authApi = axios.create({
  baseURL: '/api/auth',
});

export const login = (credentials) => authApi.post('/login', credentials);
export const signup = (userData) => authApi.post('/signup', userData);
export const logout = () => authApi.post('/logout');

export default authApi;