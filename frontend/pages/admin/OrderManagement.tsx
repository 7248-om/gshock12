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
  // Updated status colors to fit the Coffee theme (Ambers, Blues as accents, Creams)
  const statusConfig = {
    [OrderStatus.PENDING]: { icon: <Timer size={16} />, color: 'text-coffee-300', next: OrderStatus.PREPARING, nextLabel: 'Start Preparing' },
    [OrderStatus.PREPARING]: { icon: <ChefHat size={16} />, color: 'text-coffee-400', next: OrderStatus.READY, nextLabel: 'Mark Ready' },
    [OrderStatus.READY]: { icon: <PackageCheck size={16} />, color: 'text-coffee-100', next: OrderStatus.COMPLETED, nextLabel: 'Complete Pickup' },
    [OrderStatus.COMPLETED]: { icon: <CheckCircle2 size={16} />, color: 'text-coffee-600', next: null, nextLabel: null }
  };

  const config = statusConfig[order.status];

  return (
    // bg-neutral-900 -> bg-coffee-900, border-neutral-800 -> border-coffee-800
    <div className="bg-coffee-900 border border-coffee-800 rounded-2xl overflow-hidden hover:border-coffee-600 transition-all flex flex-col group">
      {/* bg-black/40 -> bg-coffee-950/40 */}
      <div className="p-5 border-b border-coffee-800 bg-coffee-950/40 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {/* text-neutral-500 -> text-coffee-500 */}
            <span className="text-[10px] font-bold text-coffee-500 uppercase tracking-widest">{order.id}</span>
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${config.color} bg-coffee-100/5`}>
              {config.icon}
              {order.status}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <User size={14} className="text-coffee-500" />
            <span className="text-sm font-bold text-coffee-100">{order.customerName}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1.5 text-coffee-500 text-xs font-medium justify-end">
            <Clock size={12} />
            {order.pickupTime}
          </div>
          <p className="text-lg font-serif mt-1 text-coffee-100">${order.totalPrice.toFixed(2)}</p>
        </div>
      </div>

      <div className="p-5 flex-1 space-y-3">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* bg-white -> bg-coffee-100, text-black -> text-coffee-950 */}
              <span className="w-6 h-6 flex items-center justify-center bg-coffee-100 text-coffee-950 text-[10px] font-bold rounded">
                {item.quantity}
              </span>
              {/* text-neutral-300 -> text-coffee-200 (Light Cream) */}
              <span className="text-sm text-coffee-200 font-medium">{item.name}</span>
            </div>
          </div>
        ))}
      </div>

      {config.next && (
        <div className="p-4 bg-coffee-950/60">
          <button 
            onClick={() => onUpdateStatus(order.id, config.next!)}
            className="w-full py-3 bg-coffee-100 text-coffee-950 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2"
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
          <h2 className="text-4xl font-serif font-bold tracking-tight text-coffee-100">Active Orders</h2>
          <p className="text-coffee-500 mt-2">Manage the Grab-and-Go flow efficiently.</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-coffee-500">
          <div className="flex items-center gap-2">
            {/* Green Pulse -> Coffee/Amber Pulse */}
            <div className="w-2 h-2 rounded-full bg-coffee-300 animate-pulse" />
            Live Kitchen Feed
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {categories.map((cat) => {
          const filteredOrders = orders.filter(o => o.status === cat.status);
          return (
            <div key={cat.title} className="space-y-4">
              <div className="flex items-center justify-between border-b border-coffee-800 pb-2">
                <h3 className="text-[10px] uppercase font-black tracking-[0.2em] text-coffee-500">
                  {cat.title} ({filteredOrders.length})
                </h3>
              </div>
              <div className="space-y-4 min-h-[500px]">
                {filteredOrders.length === 0 ? (
                  <div className="h-32 border border-dashed border-coffee-800 rounded-2xl flex items-center justify-center text-xs text-coffee-600">
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