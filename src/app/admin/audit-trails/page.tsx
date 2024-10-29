'use client'
import { useEffect, useState } from 'react';
import { AuditTrail, fetchAuditTrails } from '@/utils/auditTrailsService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AuditTrails(){
    const [auditTrails, setAuditTrails] = useState<AuditTrail[]>([]);

    async function loadAuditTrails() {
      try {
        const data = await fetchAuditTrails();
        setAuditTrails(data);
      } catch (error) {
        toast.error('Error fetching Audit Trails:'+error);
      }
    }
    
    useEffect(() => {
        loadAuditTrails();
    }, []);

    return (
        <div className='flex flex-col justify-center items-center gap-12 text-center'>

            <p className='text-4xl font-extrabold'>Audit Trails</p>
            
            <div className="w-full overflow-x-auto">
                <table className="w-full text-sm text-center rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-4">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Menu Accessed
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Method
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Changes
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {auditTrails.map((auditTrail) => (
                        <tr className="bg-white border-b-2" key={auditTrail.id}>
                            <td className="px-6 py-4 font-bold">
                                {auditTrail.username}
                            </td>
                            <td className="px-6 py-4">
                                {auditTrail.menu_accessed??'-'}
                            </td>
                            <td className="px-6 py-4 font-bold">
                                {auditTrail.method??'-'}
                            </td>
                            <td className="px-6 py-4">
                                {auditTrail.change_details??'-'}
                            </td>
                            <td className="px-6 py-4">
                            {new Date(auditTrail.created_at).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>   

        </div>
    );
};