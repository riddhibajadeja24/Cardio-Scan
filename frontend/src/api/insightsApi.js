import { fetchApi } from './apiClient';

export async function getDataInsights() {
  return await fetchApi('/api/data-insights', {
    method: 'GET'
  });
}
