
import React from 'react';
import { 
  Clock, 
  User, 
  CheckCircle2, 
  ChefHat, 
  PackageCheck,
  Timer
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderManagementProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

const OrderCard: React.FC<{ order: Order, onUpdateStatus: (orderId: string, status: OrderStatus) => void }> = ({ order, onUpdateStatus }) => {
  const statusConfig = {
    [OrderStatus.PENDING]: { icon: <Timer size={16} />, color: 'text-amber-400', next: OrderStatus.PREPARING, nextLabel: 'Start Preparing' },
    [OrderStatus.PREPARING]: { icon: <ChefHat size={16} />, color: 'text-blue-400', next: OrderStatus.READY, nextLabel: 'Mark Ready' },
    [OrderStatus.READY]: { icon: <PackageCheck size={16} />, color: 'text-green-400', next: OrderStatus.COMPLETED, nextLabel: 'Complete Pickup' },
    [OrderStatus.COMPLETED]: { icon: <CheckCircle2 size={16} />, color: 'text-neutral-400', next: null, nextLabel: null }
  };

  const config = statusConfig[order.status];

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-600 transition-all flex flex-col group">
      <div className="p-5 border-b border-neutral-800 bg-black/40 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{order.id}</span>
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${config.color} bg-white/5`}>
              {config.icon}
              {order.status}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <User size={14} className="text-neutral-500" />
            <span className="text-sm font-bold">{order.customerName}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1.5 text-neutral-500 text-xs font-medium justify-end">
            <Clock size={12} />
            {order.pickupTime}
          </div>
          <p className="text-lg font-serif mt-1">${order.totalPrice.toFixed(2)}</p>
        </div>
      </div>

      <div className="p-5 flex-1 space-y-3">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 flex items-center justify-center bg-white text-black text-[10px] font-bold rounded">
                {item.quantity}
              </span>
              <span className="text-sm text-neutral-300 font-medium">{item.name}</span>
            </div>
          </div>
        ))}
      </div>

      {config.next && (
        <div className="p-4 bg-black/60">
          <button 
            onClick={() => onUpdateStatus(order.id, config.next!)}
            className="w-full py-3 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
          >
            {config.nextLabel}
          </button>
        </div>
      )}
    </div>
  );
};

const OrderManagement: React.FC<OrderManagementProps> = ({ orders, onUpdateStatus }) => {
  const categories = [
    { title: 'In Queue', status: OrderStatus.PENDING },
    { title: 'In Production', status: OrderStatus.PREPARING },
    { title: 'Ready', status: OrderStatus.READY },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-serif font-bold tracking-tight">Active Orders</h2>
          <p className="text-neutral-500 mt-2">Manage the Grab-and-Go flow efficiently.</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-neutral-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live Kitchen Feed
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {categories.map((cat) => {
          const filteredOrders = orders.filter(o => o.status === cat.status);
          return (
            <div key={cat.title} className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <h3 className="text-[10px] uppercase font-black tracking-[0.2em] text-neutral-500">
                  {cat.title} ({filteredOrders.length})
                </h3>
              </div>
              <div className="space-y-4 min-h-[500px]">
                {filteredOrders.length === 0 ? (
                  <div className="h-32 border border-dashed border-neutral-800 rounded-2xl flex items-center justify-center text-xs text-neutral-600">
                    No orders in this phase
                  </div>
                ) : (
                  filteredOrders.map(order => (
                    <OrderCard key={order.id} order={order} onUpdateStatus={onUpdateStatus} />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderManagement;
