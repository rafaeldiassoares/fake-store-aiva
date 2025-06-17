import axios from 'axios';
import { QueryClient } from 'react-query';
import { getToken } from '../hooks/useToken';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(config => {
  const token = getToken();

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export { api, queryClient };
