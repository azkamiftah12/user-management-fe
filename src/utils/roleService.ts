import apiRequest from './apiClient';

export interface Role {
  id: number;
  role_name: string;
  created_at?: string;
  updated_at?: string;
}

export async function fetchRoles(): Promise<Role[]> {
  const response = await apiRequest<Role[]>('roles', 'GET');
  return response.data;
}

// Create a role
export async function createrole(roleData: Partial<Role>, writer_id: number): Promise<Role> {
    const dataWithWriterId = {
        ...roleData,
        writer_id,
    };
  const response = await apiRequest<Role>('roles', 'POST', dataWithWriterId);
  return response.data;
}

// Update a role 
export async function updaterole(roleId: number, roleData: Partial<Role>, writer_id:number): Promise<Role> {
    const dataWithWriterId = {
        ...roleData,
        writer_id,
    };
  const response = await apiRequest<Role>(`roles/${roleId}`, 'PUT', dataWithWriterId);
  return response.data;
}

// Delete a role
export async function deleterole(roleId: number, writerId:number): Promise<void> {
  await apiRequest<void>(`roles/${roleId}`, 'POST', {
    writer_id: writerId,
});
}
