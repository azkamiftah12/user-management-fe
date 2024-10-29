import { NextResponse } from 'next/server';

export const useLogout = () => {
    
  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.delete('user');
  return response;
};
