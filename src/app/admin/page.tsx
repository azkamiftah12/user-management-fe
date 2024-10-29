'use client'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser, User } from '@/utils/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchRoles, Role } from '@/utils/roleService';
import Link from 'next/link';
import useLoggedUser from '@/hooks/useLoggedUser';

export default function Admin(){
    const [users, setUsers] = useState<User[]>([]);
    const [userRoles, setUserRoles] = useState<Role[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        role_id: 0,
    });

    const loggedUser = useLoggedUser();

    const writerID = loggedUser?.user?.id;

    async function loadUsers() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        toast.error('Error fetching users:'+error);
      }
    }

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
        loadUsers();
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };

    const handleCreateUser = async (e: FormEvent) => {
        e.preventDefault();
    
    
        try {
          const response = await createUser( formData ,writerID);
    
          console.log(response);
          if (response.status="success") {
            loadUsers();
            toast.success('User created successfully');
        } else {
            toast.error('Failed to create user');
        }
    } catch (error) {
          toast.error('There was an error creating the user. Check username should be unique.');
        }
    };
    
    const handleDelete = async (userId: number, username: string) => {

        const confirmed = window.confirm(`Are you sure you want to delete user ${username}?`);
        if (!confirmed) return;

        try {
            await deleteUser(userId, writerID)
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            toast.success('User deleted successfully');
        } catch (error) {
        toast.error('Error deleting user:'+error);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center gap-12 text-center'>

            <p className='text-4xl font-extrabold'>Users</p>

            <button data-modal-target="create-user-modal" data-modal-toggle="create-user-modal" className="block w-36 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">
                Tambah User
            </button>
            
            <div className="w-full overflow-x-auto">
                <table className="w-full text-sm text-center rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-4">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID User
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                        <tr className="bg-white border-b-2" key={user.id}>
                            <td className="px-6 py-4">
                                {user.id}
                            </td>
                            <td className="px-6 py-4">
                                {user.name}
                            </td>
                            <td className="px-6 py-4">
                                {user.username}
                            </td>
                            <td className="px-6 py-4">
                                {user.role_name}
                            </td>
                            <td className="px-6 py-4">
                                <button className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={() => handleDelete(user.id, user.username)}>Delete</button>
                                <Link href={`/edit-user/${user.id}`} className='text-white bg-yellow-200 hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-50 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2'>Edit</Link>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>   
            

            <div id="create-user-modal" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    
                    <div className="relative bg-white rounded-lg shadow">
                        
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Create New User
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="create-user-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        
                        <form onSubmit={handleCreateUser} className="p-4 md:p-5 text-start">
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
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input required type="text" name="password" id="password" value={formData.password} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Masukkan Username"/>
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
            </div> 

        </div>
    );
};