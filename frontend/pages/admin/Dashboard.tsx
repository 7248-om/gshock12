
import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Calendar, 
  Palette, 
  Plus, 
  ArrowRight 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DashboardStats } from '../types';

const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 6890 },
  { name: 'Sat', revenue: 8390 },
  { name: 'Sun', revenue: 7490 },
];

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, trend }) => (
  <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl hover:border-neutral-700 transition-colors group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-black rounded-lg border border-neutral-800 text-neutral-400 group-hover:text-white transition-colors">
        {icon}
      </div>
      {trend && (
        <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-neutral-500 text-xs uppercase tracking-widest font-bold mb-1">{title}</h3>
    <p className="text-3xl font-serif font-bold">{value}</p>
  </div>
);

const Dashboard: React.FC<{ stats: DashboardStats }> = ({ stats }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-serif font-bold tracking-tight">Afternoon, Lab Director.</h2>
          <p className="text-neutral-500 mt-2">Here is your business overview for today, {new Date().toLocaleDateString()}.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-neutral-800 rounded-lg text-sm font-medium hover:bg-neutral-900 transition-colors">
            Generate Report
          </button>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Revenue" 
          value={`$${stats.totalRevenue.toLocaleString()}`} 
          icon={<TrendingUp size={20} />} 
          trend="+12.5%"
        />
        <MetricCard 
          title="Orders Today" 
          value={stats.totalOrdersToday} 
          icon={<ShoppingBag size={20} />} 
          trend="+4"
        />
        <MetricCard 
          title="Workshops" 
          value={stats.activeBookings} 
          icon={<Calendar size={20} />} 
        />
        <MetricCard 
          title="Art Inquiries" 
          value={stats.artInquiries} 
          icon={<Palette size={20} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 p-8 rounded-3xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-serif font-bold">Weekly Performance</h3>
            <select className="bg-black border border-neutral-800 text-xs p-1 rounded">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#737373', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#737373', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#171717' }}
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #262626', borderRadius: '8px' }}
                />
                <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#fff' : '#404040'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions & Recent */}
        <div className="space-y-4">
          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl h-full">
            <h3 className="text-lg font-serif font-bold mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-black border border-neutral-800 rounded-xl hover:border-white transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neutral-900 rounded-lg group-hover:bg-white group-hover:text-black transition-colors">
                    <Plus size={18} />
                  </div>
                  <span className="text-sm font-medium">Add Menu Item</span>
                </div>
                <ArrowRight size={16} className="text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-black border border-neutral-800 rounded-xl hover:border-white transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neutral-900 rounded-lg group-hover:bg-white group-hover:text-black transition-colors">
                    <Calendar size={18} />
                  </div>
                  <span className="text-sm font-medium">Post Workshop</span>
                </div>
                <ArrowRight size={16} className="text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-black border border-neutral-800 rounded-xl hover:border-white transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neutral-900 rounded-lg group-hover:bg-white group-hover:text-black transition-colors">
                    <Palette size={18} />
                  </div>
                  <span className="text-sm font-medium">Franchise Requests</span>
                </div>
                <ArrowRight size={16} className="text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            </div>

            <div className="mt-12 p-6 bg-gradient-to-br from-neutral-800 to-black rounded-2xl border border-neutral-700">
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest mb-2">Notice Board</p>
              <p className="text-sm leading-relaxed text-neutral-200">
                New seasonal coffee samples from Colombia arrive this Friday. Scheduled cupping session at 9:00 AM.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
