
import React, { useState } from 'react';
import { User } from '../types';
import { Search, Mail, Calendar, ExternalLink, X } from 'lucide-react';

interface Props {
  users: User[];
}

const UserManagement: React.FC<Props> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-4xl font-serif font-bold tracking-tight">User Stewardship</h2>
        <p className="text-neutral-500 mt-1">Managing relationships and engagement history.</p>
      </header>

      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b border-neutral-800 bg-black/40">
            <tr>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-neutral-500 font-bold">User</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Joined</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Engagement</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-neutral-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-bold text-white">{user.name}</p>
                    <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5"><Mail size={10} /> {user.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs text-neutral-400 flex items-center gap-2"><Calendar size={12} /> {user.joinDate}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest">Orders</p>
                      <p className="text-xs font-bold">{user.orderHistory.length}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest">WS</p>
                      <p className="text-xs font-bold">{user.workshopHistory.length}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => setSelectedUser(user)} className="text-neutral-500 hover:text-white"><ExternalLink size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200">
             <div className="p-8 border-b border-neutral-800 flex justify-between items-center">
                <h3 className="text-2xl font-serif font-bold">User Dossier</h3>
                <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-neutral-800 rounded-full"><X /></button>
             </div>
             <div className="p-8 grid grid-cols-2 gap-8">
                <div>
                   <p className="text-[10px] uppercase font-bold text-neutral-500 mb-4 tracking-[0.2em]">Customer Profile</p>
                   <div className="space-y-4">
                      <div>
                        <p className="text-xs text-neutral-400">Full Name</p>
                        <p className="text-lg font-bold">{selectedUser.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400">Registration</p>
                        <p className="text-sm">{selectedUser.joinDate}</p>
                      </div>
                   </div>
                </div>
                <div>
                   <p className="text-[10px] uppercase font-bold text-neutral-500 mb-4 tracking-[0.2em]">Activity Ledger</p>
                   <div className="bg-black/40 rounded-2xl border border-neutral-800 p-4 space-y-3">
                      <div className="flex justify-between border-b border-neutral-800 pb-2">
                        <span className="text-xs text-neutral-400">Order IDs</span>
                        <span className="text-xs font-mono">{selectedUser.orderHistory.join(', ') || 'None'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-neutral-400">Workshops</span>
                        <span className="text-xs font-mono">{selectedUser.workshopHistory.length} Sessions</span>
                      </div>
                   </div>
                </div>
             </div>
             <div className="p-8 border-t border-neutral-800 text-right">
                <button onClick={() => setSelectedUser(null)} className="px-6 py-2 bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest rounded-lg">Close Dossier</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
