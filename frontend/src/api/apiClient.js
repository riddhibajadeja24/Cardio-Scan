const BASE_URL = import.meta.env.VITE_API_URL || '';

export async function fetchApi(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, config);
    const contentType = response.headers.get('content-type');
    
    if (!response.ok) {
      let errorMessage = `Server error (${response.status})`;
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      }
      throw new Error(errorMessage);
    }

    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    return await response.text();
  } catch (err) {
    console.error(`[API Error] ${endpoint}:`, err);
    throw err;
  }
}
