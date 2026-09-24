import { fetchApi } from './apiClient';

export async function submitPrediction(vitals) {
  return await fetchApi('/api/predict', {
    method: 'POST',
    body: JSON.stringify(vitals)
  });
}
