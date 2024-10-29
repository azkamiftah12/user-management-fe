'use client'

import useLoggedUser from '@/hooks/useLoggedUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const loggedUser = useLoggedUser();
  
  // useEffect(() => {
  //   if (!loggedUser) {
  //     router.push('/login');
  //   }
  // }, [loggedUser, router]);
    
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        Welcome!! {loggedUser?.user?.username}
      </div>
    </main>
  );
}
