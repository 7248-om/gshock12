import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, XCircle, Clock, Users, Trash2, Calendar } from 'lucide-react';
import { Workshop } from '../types';

const WorkshopManagement: React.FC = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filter, setFilter] = useState<'Pending' | 'Approved' | 'Rejected' | 'All'>('Pending');
  
  const { token } = useAuth();
  const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || '/api';

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/workshops/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWorkshops(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      setIsProcessing(true);
      await axios.patch(`${API_BASE_URL}/workshops/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchWorkshops();
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this workshop?')) return;
    try {
      setIsProcessing(true);
      await axios.delete(`${API_BASE_URL}/workshops/${id}`, {
         headers: { Authorization: `Bearer ${token}` }
      });
      fetchWorkshops();
    } catch (err) {
      alert('Failed to delete');
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredWorkshops = useMemo(() => {
    if (filter === 'All') return workshops;
    return workshops.filter(w => w.status === filter);
  }, [workshops, filter]);

  if (loading) return <div className="p-8 text-center text-coffee-500">Loading...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-4xl font-serif font-bold tracking-tight text-coffee-100">Workshop Submissions</h2>
      </header>
      
      {/* Filters */}
      <div className="flex gap-2 border-b border-coffee-800">
        {(['Pending', 'Approved', 'Rejected', 'All'] as const).map(status => (
          <button key={status} onClick={() => setFilter(status)} className={`px-4 py-3 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 ${filter === status ? 'border-coffee-100 text-coffee-100' : 'border-transparent text-coffee-500'}`}>{status}</button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredWorkshops.map(ws => (
          <div key={ws._id || ws.id} className="bg-coffee-900 border-2 border-coffee-700 rounded-2xl p-6">
            <div className="flex justify-between">
                <h3 className="text-xl font-bold text-coffee-100">{ws.title}</h3>
                <span className="text-xs text-coffee-500 font-mono">{ws.status}</span>
            </div>
            <p className="text-sm text-coffee-400 mt-2">{ws.description}</p>
            
            <div className="flex gap-3 pt-4 border-t border-coffee-800 mt-4">
              {ws.status === 'Pending' && (
                <>
                  <button onClick={() => handleStatusUpdate(ws._id || ws.id, 'Approved')} disabled={isProcessing} className="px-4 py-2 bg-green-600 text-white rounded font-bold uppercase text-xs">Approve</button>
                  <button onClick={() => handleStatusUpdate(ws._id || ws.id, 'Rejected')} disabled={isProcessing} className="px-4 py-2 bg-red-600 text-white rounded font-bold uppercase text-xs">Reject</button>
                </>
              )}
              <button onClick={() => handleDelete(ws._id || ws.id)} disabled={isProcessing} className="ml-auto px-4 py-2 text-red-500 hover:text-red-400 text-xs uppercase font-bold">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkshopManagement;