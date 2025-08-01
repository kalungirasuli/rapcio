import axios from 'axios';

// Use environment variable for the base URL with correct port
const API_BASE_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local storage and redirect to login on unauthorized
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// API endpoints grouped by resource with correct paths
const endpoints = {
  auth: {
    login: '/api/auth/login',
    signupAdmin: '/api/auth/signup/admin',
    signupReferee: '/api/auth/signup/referee',
  },
  users: {
    getAll: '/api/users',
    getById: (id: string) => `/api/users/${id}`,
    update: (id: string) => `/api/users/${id}`,
    delete: (id: string) => `/api/users/${id}`,
  },
  clubs: {
    getAll: '/api/clubs',
    getById: (id: string) => `/api/clubs/${id}`,
    create: '/api/clubs',
    update: (id: string) => `/api/clubs/${id}`,
    delete: (id: string) => `/api/clubs/${id}`,
  },
  players: {
    getAll: '/api/players',
    getById: (id: string) => `/api/players/${id}`,
    create: '/api/players',
    update: (id: string) => `/api/players/${id}`,
    delete: (id: string) => `/api/players/${id}`,
  },
};

// Authentication services
const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post(endpoints.auth.login, { email, password });
      return response.data;
    } catch (error) {
      console.log("An error occurred during login:", error);
      throw error;
    }
  },
  createAdmin: async (userData: { fullName: string; email: string; password: string }) => {
    try {
      const response = await api.post(endpoints.auth.signupAdmin, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createReferee: async (userData: { fullName: string; email: string; password: string }) => {
    try {
      const response = await api.post(endpoints.auth.signupReferee, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// User services
const userService = {
  getAllUsers: async () => {
    try {
      const response = await api.get(endpoints.users.getAll);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getUserById: async (id: string) => {
    try {
      const response = await api.get(endpoints.users.getById(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (id: string, userData: { fullName?: string; email?: string }) => {
    try {
      const response = await api.put(endpoints.users.update(id), userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteUser: async (id: string) => {
    try {
      const response = await api.delete(endpoints.users.delete(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Club services
const clubService = {
  getAllClubs: async () => {
    try {
      const response = await api.get(endpoints.clubs.getAll);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getClubById: async (id: string) => {
    try {
      const response = await api.get(endpoints.clubs.getById(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createClub: async (clubData: { clubName: string; email?: string; description?: string }) => {
    try {
      const response = await api.post(endpoints.clubs.create, clubData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateClub: async (id: string, clubData: { clubName?: string; email?: string; description?: string }) => {
    try {
      const response = await api.put(endpoints.clubs.update(id), clubData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteClub: async (id: string) => {
    try {
      const response = await api.delete(endpoints.clubs.delete(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Player services
const playerService = {
  getAllPlayers: async () => {
    try {
      const response = await api.get(endpoints.players.getAll);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getPlayerById: async (id: string) => {
    try {
      const response = await api.get(endpoints.players.getById(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createPlayer: async (playerData: {
    familyName: string;
    firstName: string;
    languageOfTheName?: string;
    dateOfBirth: string;
    gender: string;
    countryOfBirth?: string;
    mainNationality?: string;
    secondaryNationality?: string;
    regionOrStateOfBirth?: string;
    cityOfBirth?: string;
    identificationNumber?: string;
    status?: string;
    clubId?: string;
  }) => {
    try {
      const response = await api.post(endpoints.players.create, playerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updatePlayer: async (id: string, playerData: {
    familyName?: string;
    firstName?: string;
    languageOfTheName?: string;
    dateOfBirth?: string;
    gender?: string;
    countryOfBirth?: string;
    mainNationality?: string;
    secondaryNationality?: string;
    regionOrStateOfBirth?: string;
    cityOfBirth?: string;
    identificationNumber?: string;
    status?: string;
    clubId?: string;
  }) => {
    try {
      const response = await api.put(endpoints.players.update(id), playerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deletePlayer: async (id: string) => {
    try {
      const response = await api.delete(endpoints.players.delete(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export { authService, userService, clubService, playerService };
export default api;