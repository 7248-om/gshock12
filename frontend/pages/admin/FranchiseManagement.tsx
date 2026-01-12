import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FranchiseLead, LeadStatus } from '../types';

const FranchiseManagement: React.FC = () => {
  const [leads, setLeads] = useState<FranchiseLead[]>([]);
  const { token } = useAuth();
  const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || '/api';

  const fetchLeads = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/franchises`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeads(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (id: string, status: LeadStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/franchises/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchLeads();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <header>
        <h2 className="text-4xl font-serif font-bold tracking-tight text-coffee-100">Franchise Leads</h2>
      </header>

      <div className="bg-coffee-900 border border-coffee-800 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
           <thead className="border-b border-coffee-800 bg-coffee-950/40">
             <tr>
               <th className="px-6 py-4 text-coffee-500 font-bold uppercase text-xs">Name</th>
               <th className="px-6 py-4 text-coffee-500 font-bold uppercase text-xs">Email</th>
               <th className="px-6 py-4 text-coffee-500 font-bold uppercase text-xs">Status</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-coffee-800">
             {leads.map(lead => (
               <tr key={lead._id || lead.id} className="hover:bg-coffee-800/30">
                 <td className="px-6 py-6 font-bold text-coffee-100">{lead.name}</td>
                 <td className="px-6 py-6 text-sm text-coffee-400">{lead.email}</td>
                 <td className="px-6 py-6">
                    <select 
                      value={lead.status}
                      onChange={(e) => handleUpdateStatus(lead._id || lead.id || '', e.target.value as LeadStatus)}
                      className="bg-coffee-950 border border-coffee-800 text-coffee-100 rounded px-2 py-1 text-xs uppercase"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Negotiation">Negotiating</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                 </td>
               </tr>
             ))}
           </tbody>
        </table>
      </div>
    </div>
  );
};

export default FranchiseManagement;