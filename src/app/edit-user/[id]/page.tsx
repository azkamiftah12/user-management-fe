'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { getUser, updateUser, User } from '@/utils/userService';
import { fetchRoles, Role } from '@/utils/roleService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLoggedUser from '@/hooks/useLoggedUser';

export default function EditUserPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const userId = params.id;

    const loggedUser = useLoggedUser();

    const writerID = loggedUser?.user?.id;

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        role_id: 0,
    });

    const [userRoles, setUserRoles] = useState<Role[]>([]);

    useEffect(() => {
        if (userId) {
            loadUserDetails();
            loadRoles();
        }
        console.log(userId)
    }, []);

    async function loadUserDetails() {
        try {
            const user = await getUser(parseInt(userId));
            setFormData({
                name: user.name,
                username: user.username,
                password: '',
                role_id: user.role_id,
            });
        } catch (error) {
            toast.error('Error fetching user details');
        }
    }

    async function loadRoles() {
        try {
            const roles = await fetchRoles();
            setUserRoles(roles);
        } catch (error) {
            toast.error('Error fetching roles');
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdateUser = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await updateUser(parseInt(userId), formData, writerID);
            if (response.status = 'success') {
                toast.success('User updated successfully');
                router.push('/');
            } else {
                toast.error('Failed to update user');
            }
        } catch (error) {
            toast.error('Error updating user');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-12 text-center">
            <p className="text-4xl font-extrabold">Edit User</p>

            <form onSubmit={handleUpdateUser} className="p-4 md:p-5 text-start w-full max-w-md bg-white rounded-lg shadow">
                <div className="grid gap-4 mb-4">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input
                            required
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                        <input
                            required
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        />
                    </div>
                    <div>
                        <label htmlFor="role_id" className="block mb-2 text-sm font-medium text-gray-900">Role</label>
                        <select
                            name="role_id"
                            id="role_id"
                            value={formData.role_id}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        >
                            <option value={0} disabled>Select Role</option>
                            {userRoles.map((role) => (
                                <option key={role.id} value={role.id} className="capitalize">
                                    {role.role_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Update User
                </button>
            </form>
        </div>
    );
}
