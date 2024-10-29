'use client'

import { Role, fetchRoles } from "@/utils/roleService";
import { register } from "@/utils/userService";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useLogout } from "@/utils/useLogout";

export default function Register(){
    useLogout();
    const [userRoles, setUserRoles] = useState<Role[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        role_id: 0,
    });

    const router = useRouter();

    async function loadRoles() {
        try {
            const roles = await fetchRoles();
            setUserRoles(roles);
          } catch (error) {
            toast.error('Error fetching Roles:'+error);
          }
    }
    
    useEffect(() => {
        loadRoles();
    }, []);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
    
        try {
          const response = await register( formData );
    
          console.log(response);
          if (response.status="success") {
            toast.success('Register successfully');
            router.push("/login")
        } else {
            toast.error('Failed to Register');
        }
    } catch (error) {
          toast.error('There was an error registering. Check username should be unique.');
        }
    };
    return(
        <div className="flex justify-center">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
            <h5 className="text-xl font-medium text-gray-900 text-center">Login</h5>
            <form onSubmit={handleRegister} className="p-4 md:p-5 text-start">
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input required type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Masukkan Nama"/>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                        <input required type="text" name="username" id="username" value={formData.username} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Masukkan Username"/>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input required type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Masukkan Password"/>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">Role</label>
                        <select
                            name="role_id"
                            id="role_id"
                            value={formData.role_id}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        >
                            <option selected={true}>Pilih Role</option>
                            {userRoles.map((role) => (
                                <option key={role.id} value={role.id} className="capitalize">
                                    {role.role_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Add new User
                </button>
            </form>
        </div>
    </div>
    )
}