'use client'

import { useLogout } from "@/utils/useLogout"
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

export default function Login(){
    useLogout();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();


    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                Cookies.set('user', JSON.stringify(data.data), {
                    expires: 7,
                    path: '/',
                });
                router.push("/")
            } else {
                const errorData = await response.json();
                toast.error(errorData.message);
            }
        } catch (error) {
            toast.error('Login error:'+ error);
        }
    };

    return(
        <div className="flex justify-center">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
            <h5 className="text-xl font-medium text-gray-900 text-center">Login</h5>
                <form onSubmit={handleLogin} className="max-w-sm mx-auto">
                    <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 mt-8">Username</label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md ">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                        </span>
                        <input type="text" id="website-admin" onChange={(e)=>{setUsername(e.target.value)}} value={username} className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" placeholder="azka_muhammad"/>
                    </div>
                    <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 mt-8">Password</label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md ">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="w-5 h-4 text-gray-500"
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round">
                            <path d="M17 8V4a5 5 0 0 0-10 0v4M5 8h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" />
                        </svg>
                        </span>
                        <input type="password" id="website-admin" onChange={(e)=>{setPassword(e.target.value)}} value={password} className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" placeholder="********"/>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="text-white inline-flex items-center mt-8 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}