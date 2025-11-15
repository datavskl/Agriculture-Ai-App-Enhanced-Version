const normalizePath = (path: string) => path.replace(/\/+$/g, '');

const normalizeSegment = (segment: string) => segment.replace(/^\/+/, '');

const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api';

export const API_BASE_URL = normalizePath(base);

export const withApiBase = (path: string) => {
  const cleanPath = normalizeSegment(path);
  return `${API_BASE_URL}/${cleanPath}`;
};
