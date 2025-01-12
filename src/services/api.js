import axios from 'axios';
import store from './store'; // Import the Vuex store

const API_URL = 'http://localhost:8000/api'; // Replace with your API endpoint

const axiosInstance = axios.create({
  baseURL: API_URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const user = store.state.user; // Get the user from the Vuex store
    const token = localStorage.getItem('authToken'); // Get the token from localStorage   

    if (user && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchMoviesApi = async () => {
  try {
    const response = await axiosInstance.get('/movies');
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchUserMoviesApi = async (userId) => {
  try {
    const response = await axiosInstance.get(`/movies/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user movies:', error);
    throw error;
  }
};

export const voteMovieApi = async (movieId, vote_type) => {
    try {
        const response = await axiosInstance.post(`/movies/${movieId}/vote`, { vote_type });
        return response.data;
    } catch (error) {
        console.error('Error voting on movie:', error);
        throw error;
    }
};

export const createMovieApi = async ({ title, description, publication_date }) => {
    try {
        const response = await axiosInstance.post(`/movies`, { title, description, publication_date });
        return response.data;
    } catch (error) {
        console.error('Error voting on movie:', error);
        throw error;
    }
};

export const signupApi = async ({ name, email, password , password_confirmation }) => {
    try {
        const response = await axiosInstance.post('/register', { name, email, password , password_confirmation });
        return response.data;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};