import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';

const AdminOrders: React.FC = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || '/api';

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await axios.patch(`${API_BASE_URL}/orders/${orderId}/status`, { orderStatus: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading orders...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#3E2723] mb-8">Order Management</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-bold text-[#3E2723]">Order #{order._id.substring(order._id.length - 6)}</h2>
                <p className="text-sm text-gray-600">{order.user?.name} ({order.user?.email})</p>
                <p className="text-sm font-bold mt-1">₹{order.totalAmount}</p>
              </div>
              <div className="px-3 py-1 rounded bg-gray-100 text-xs uppercase font-bold">{order.orderStatus}</div>
            </div>
            {/* Actions */}
            <div className="flex gap-2 mt-4">
               {['processing', 'shipped', 'delivered', 'cancelled'].map(status => (
                 <button 
                   key={status}
                   onClick={() => updateOrderStatus(order._id, status)}
                   className={`px-3 py-1 rounded text-xs uppercase font-bold border ${order.orderStatus === status ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}`}
                 >
                   {status}
                 </button>
               ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;