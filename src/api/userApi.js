import axios from 'axios';

const userApi = axios.create({
  baseURL: '/api/users',
});

export const getUserProfile = () => userApi.get('/profile');
export const updateUserProfile = (profileData) => userApi.put('/profile', profileData);

export default userApi;