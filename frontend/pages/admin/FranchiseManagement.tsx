import React from 'react';
import { FranchiseLead, LeadStatus } from '../types';
import { Mail, Phone, MapPin, DollarSign, MessageSquare } from 'lucide-react';

interface Props {
  leads: FranchiseLead[];
  onUpdateStatus: (id: string, status: LeadStatus) => void;
}

const FranchiseManagement: React.FC<Props> = ({ leads, onUpdateStatus }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <header>
        <h2 className="text-4xl font-serif font-bold tracking-tight text-coffee-100">Franchise & Partnerships</h2>
        <p className="text-coffee-500 mt-1">Nurturing global growth and high-ticket leads.</p>
      </header>

      <div className="bg-coffee-900 border border-coffee-800 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b border-coffee-800 bg-coffee-950/40">
            <tr>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-coffee-500 font-bold">Inquiry Details</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-coffee-500 font-bold">Location & Capacity</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-coffee-500 font-bold">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-coffee-800">
            {leads.map(lead => (
              <tr key={lead.id} className="hover:bg-coffee-800/30 transition-colors">
                <td className="px-6 py-6">
                  <div>
                    <p className="font-bold text-coffee-100 mb-1">{lead.name}</p>
                    <div className="flex flex-col gap-1">
                      <a href={`mailto:${lead.email}`} className="text-xs text-coffee-600 hover:text-coffee-100 flex items-center gap-2"><Mail size={12} /> {lead.email}</a>
                      <p className="text-xs text-coffee-600 flex items-center gap-2"><Phone size={12} /> {lead.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium flex items-center gap-2 text-coffee-200"><MapPin size={12} /> {lead.city}</p>
                    <p className="text-xs text-coffee-500 flex items-center gap-2"><DollarSign size={12} /> {lead.investment}</p>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <select 
                    value={lead.status}
                    onChange={(e) => onUpdateStatus(lead.id, e.target.value as LeadStatus)}
                    className="bg-coffee-950 border border-coffee-800 text-coffee-100 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest outline-none focus:border-coffee-500 transition-colors"
                  >
                    {Object.values(LeadStatus).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-6 py-6">
                   <div className="group relative">
                      <MessageSquare className="text-coffee-600 hover:text-coffee-100 cursor-help" size={18} />
                      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 w-64 p-4 bg-coffee-950 border border-coffee-800 rounded-xl hidden group-hover:block z-20 shadow-2xl">
                        <p className="text-[10px] uppercase font-bold text-coffee-500 mb-2">Message</p>
                        <p className="text-xs leading-relaxed text-coffee-200 italic">"{lead.message}"</p>
                      </div>
                   </div>
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