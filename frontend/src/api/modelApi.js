import { fetchApi } from './apiClient';

export async function getModelInfo() {
  return await fetchApi('/api/model-info', {
    method: 'GET'
  });
}
