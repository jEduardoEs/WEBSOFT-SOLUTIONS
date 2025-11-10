import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? process.env.BACKEND_BASE_URL ?? 'http://localhost:4000';

export function getBackendClient(accessToken?: string) {
  return axios.create({
    baseURL,
    headers: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`
        }
      : undefined
  });
}
