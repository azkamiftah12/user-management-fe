import apiRequest from './apiClient';

export interface User {
  [x: string]: any;
  id: number;
  name: string;
  username: string;
  password: string;
  role_id: number;
  role_name: string;
  created_at?: string;
  updated_at?: string;
}

export async function fetchUsers(): Promise<User[]> {
  const response = await apiRequest<User[]>('users', 'GET');
  return response.data;
}

export async function getUser(userId: number): Promise<User[]> {
  const response = await apiRequest<User[]>('users/'+userId, 'GET');
  return response.data;
}

// Register 
export async function register(userData: Partial<User>): Promise<User> {
  const response = await apiRequest<User>('register', 'POST', userData);
  return response.data;
}

// Create a user
export async function createUser(userData: Partial<User>, writer_id:number): Promise<User> {
  const dataWithWriterId = {
    ...userData,
    writer_id,
  };
  const response = await apiRequest<User>('users/create', 'POST', dataWithWriterId);
  return response.data;
}

// Update a user 
export async function updateUser(userId: number, userData: Partial<User>, writer_id: number): Promise<User> {
  const dataWithWriterId = {
    ...userData,
    writer_id,
};
  const response = await apiRequest<User>(`users/${userId}/update`, 'PUT', dataWithWriterId);
  return response.data;
}

// Delete a user
export async function deleteUser(userId: number, writerId: number): Promise<void> {
  await apiRequest<void>(`users/${userId}/delete`, 'POST', {
    writer_id: writerId,
});
}
