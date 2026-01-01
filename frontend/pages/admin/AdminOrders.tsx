import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { 
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  AlertCircle,
} from 'lucide-react';

interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  items: Array<{
    itemType: string;
    itemId: {
      _id: string;
      name: string;
      price: number;
      [key: string]: any;
    };
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  createdAt: string;
  updatedAt: string;
}

const AdminOrders: React.FC = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || '/api';

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/orders/${orderId}/status`,
        { orderStatus: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(orders.map(o => o._id === orderId ? response.data : o));
    } catch (err) {
      console.error('Failed to update order:', err);
      alert('Failed to update order status');
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending': return <Clock size={16} className="text-yellow-500" />;
      case 'processing': return <Package size={16} className="text-blue-500" />;
      case 'shipped': return <Truck size={16} className="text-purple-500" />;
      case 'delivered': return <CheckCircle size={16} className="text-green-500" />;
      case 'cancelled': return <XCircle size={16} className="text-red-500" />;
      default: return <AlertCircle size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-50 border-yellow-200';
      case 'processing': return 'bg-blue-50 border-blue-200';
      case 'shipped': return 'bg-purple-50 border-purple-200';
      case 'delivered': return 'bg-green-50 border-green-200';
      case 'cancelled': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch(status) {
      case 'paid': return <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">✓ Paid</span>;
      case 'pending': return <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">⏳ Pending</span>;
      case 'failed': return <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">✕ Failed</span>;
      default: return null;
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading orders...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#3E2723] mb-2">Order Management</h1>
        <p className="text-gray-600">Manage customer orders and update delivery status</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Package size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 font-medium">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className={`border rounded-lg p-6 ${getStatusColor(order.orderStatus)}`}>
              {/* Order Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-lg font-bold text-[#3E2723]">
                      Order #{order._id.substring(order._id.length - 8)}
                    </h2>
                    {getPaymentStatusBadge(order.paymentStatus)}
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Customer:</strong> {order.user.name} ({order.user.email})
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Amount:</strong> ₹{order.totalAmount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Current Status */}
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border">
                  {getStatusIcon(order.orderStatus)}
                  <span className="font-semibold text-gray-700 capitalize">{order.orderStatus}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6 bg-white rounded p-4">
                <h3 className="font-semibold text-gray-700 mb-3">Items</h3>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">
                        {typeof item.itemId === 'object' && item.itemId?.name 
                          ? item.itemId.name 
                          : item.itemType} × {item.quantity}
                      </span>
                      <span className="text-gray-700 font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Update Actions */}
              {order.paymentStatus === 'paid' && order.orderStatus !== 'cancelled' && order.orderStatus !== 'delivered' && (
                <div className="flex gap-3 flex-wrap">
                  {order.orderStatus === 'pending' && (
                    <button
                      onClick={() => updateOrderStatus(order._id, 'processing')}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-semibold"
                    >
                      Mark as Processing
                    </button>
                  )}

                  {order.orderStatus === 'processing' && (
                    <button
                      onClick={() => updateOrderStatus(order._id, 'shipped')}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition text-sm font-semibold"
                    >
                      Mark as Shipped
                    </button>
                  )}

                  {order.orderStatus === 'shipped' && (
                    <button
                      onClick={() => updateOrderStatus(order._id, 'delivered')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm font-semibold"
                    >
                      Mark as Delivered
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to cancel this order?')) {
                        updateOrderStatus(order._id, 'cancelled');
                      }
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-semibold"
                  >
                    Cancel Order
                  </button>
                </div>
              )}

              {/* Completed/Cancelled Status */}
              {(order.orderStatus === 'delivered' || order.orderStatus === 'cancelled') && (
                <div className="flex items-center gap-2 text-sm font-semibold">
                  {order.orderStatus === 'delivered' ? (
                    <><CheckCircle size={18} className="text-green-600" /> <span className="text-green-600">Order Delivered</span></>
                  ) : (
                    <><XCircle size={18} className="text-red-600" /> <span className="text-red-600">Order Cancelled</span></>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
