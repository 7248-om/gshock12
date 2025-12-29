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
  // Updated: bg-coffee-900 border-coffee-800
  <div className="bg-coffee-900 border border-coffee-800 p-6 rounded-2xl hover:border-coffee-600 transition-colors group">
    <div className="flex justify-between items-start mb-4">
      {/* Updated Icon wrapper: bg-coffee-950 text-coffee-400 */}
      <div className="p-2 bg-coffee-950 rounded-lg border border-coffee-800 text-coffee-400 group-hover:text-coffee-100 transition-colors">
        {icon}
      </div>
      {trend && (
        // Updated trend: text-coffee-300 (Amber)
        <span className="text-[10px] font-bold text-coffee-300 bg-coffee-300/10 px-2 py-1 rounded">
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-coffee-500 text-xs uppercase tracking-widest font-bold mb-1">{title}</h3>
    <p className="text-3xl font-serif font-bold text-coffee-100">{value}</p>
  </div>
);

const Dashboard: React.FC<{ stats: DashboardStats }> = ({ stats }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-serif font-bold tracking-tight text-coffee-100">Afternoon, Lab Director.</h2>
          <p className="text-coffee-500 mt-2">Here is your business overview for today, {new Date().toLocaleDateString()}.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-coffee-800 text-coffee-100 rounded-lg text-sm font-medium hover:bg-coffee-900 transition-colors">
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
        <div className="lg:col-span-2 bg-coffee-900 border border-coffee-800 p-8 rounded-3xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-serif font-bold text-coffee-100">Weekly Performance</h3>
            <select className="bg-coffee-950 border border-coffee-800 text-coffee-400 text-xs p-1 rounded focus:outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                {/* Updated Grid Color */}
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#46332B" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8C6B58', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#8C6B58', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#2C211D' }}
                  contentStyle={{ backgroundColor: '#1F1613', border: '1px solid #46332B', borderRadius: '8px', color: '#F9E4C8' }}
                  itemStyle={{ color: '#D69F4C' }}
                />
                <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    // Updated Bar colors: Active bar is Cream (coffee-100), others are Muted Brown (coffee-600)
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#F9E4C8' : '#5C483F'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions & Recent */}
        <div className="space-y-4">
          <div className="bg-coffee-900 border border-coffee-800 p-8 rounded-3xl h-full">
            <h3 className="text-lg font-serif font-bold mb-6 text-coffee-100">Quick Actions</h3>
            <div className="space-y-3">
              {['Add Menu Item', 'Post Workshop', 'Franchise Requests'].map((label, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 bg-coffee-950 border border-coffee-800 rounded-xl hover:border-coffee-400 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-coffee-900 rounded-lg group-hover:bg-coffee-100 group-hover:text-coffee-950 transition-colors text-coffee-400">
                      {[<Plus size={18} />, <Calendar size={18} />, <Palette size={18} />][i]}
                    </div>
                    <span className="text-sm font-medium text-coffee-100 group-hover:text-coffee-100">{label}</span>
                  </div>
                  <ArrowRight size={16} className="text-coffee-600 group-hover:text-coffee-100 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            {/* Gradient updated to Warm Coffee Gradient */}
            <div className="mt-12 p-6 bg-gradient-to-br from-coffee-800 to-coffee-950 rounded-2xl border border-coffee-700">
              <p className="text-xs text-coffee-400 font-bold uppercase tracking-widest mb-2">Notice Board</p>
              <p className="text-sm leading-relaxed text-coffee-100">
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