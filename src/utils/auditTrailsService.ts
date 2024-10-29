import apiRequest from './apiClient';

export interface AuditTrail {
  [x: string]: any;
  id: number;
  name: string;
  username: string;
  menu_accessed: string;
  method: number;
  change_details: string;
  role_name: string;
  created_at: string;
  updated_at: string;
}

export async function fetchAuditTrails(): Promise<AuditTrail[]> {
  const response = await apiRequest<AuditTrail[]>('audit-trails', 'GET');
  return response.data;
}

