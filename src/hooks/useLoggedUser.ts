// src/hooks/useLoggedUser.ts
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface User {
    id: number;
    name: string;
    username: string;
    role_name: string;
}

export default function useLoggedUser() {
    const [loggedUser, setLoggedUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            setLoggedUser(JSON.parse(userCookie));
        } else {
            setLoggedUser(null);
            router.push('/login');
        }
    }, [router]);

    return loggedUser;
}
