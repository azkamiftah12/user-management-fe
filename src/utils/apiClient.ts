const API_BASE_URL = "http://127.0.0.1:8000/api";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

async function apiRequest<T>(endpoint: string, method: HttpMethod = 'GET', data: unknown = null): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}/${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

export default apiRequest;
