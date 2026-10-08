import axios from 'axios';

export const api = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api').replace(/\/$/, ''),
  timeout: 10_000,
  headers: { Accept: 'application/json' },
});

export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await api.get<T>(path, { signal });
  return response.data;
}
