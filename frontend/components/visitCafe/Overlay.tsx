
import React from 'react';
import { ArrowLeft, Coffee, Info, MapPin, Calendar, Users, Share2, Instagram } from 'lucide-react';

interface OverlayProps {
  type: 'menu' | 'art' | 'workshops';
  onBack: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ type, onBack }) => {
  const content = {
    menu: {
      title: 'Our Menu',
      subtitle: 'Pure Robusta & Craft Beverages',
      items: [
        { name: 'Rabusta Classic Black', price: '$4.50', desc: 'Our signature dark roast, bold and punchy.' },
        { name: 'Vietnamese Iced Coffee', price: '$5.50', desc: 'Sweetened condensed milk over strong Robusta.' },
        { name: 'Artisan Latte', price: '$6.00', desc: 'Creamy milk perfectly balanced with earthy notes.' },
        { name: 'Honey Cinnamon Brew', price: '$6.50', desc: 'Infused with organic honey and fresh cinnamon.' },
      ]
    },
    art: {
      title: 'Art Gallery',
      subtitle: 'Local Artists Showcase',
      items: [
        { name: 'Organic Structures', artist: 'Elena Ray', year: '2023', img: 'https://picsum.photos/400/300?grayscale' },
        { name: 'Surat Sunsets', artist: 'Karan Shah', year: '2024', img: 'https://picsum.photos/400/301?grayscale' },
        { name: 'Coffee in Motion', artist: 'Ananya S.', year: '2023', img: 'https://picsum.photos/400/302?grayscale' },
        { name: 'Minimalist Roots', artist: 'Liam J.', year: '2022', img: 'https://picsum.photos/400/303?grayscale' },
      ]
    },
    workshops: {
      title: 'Workshops',
      subtitle: 'Creative Sessions & Community',
      items: [
        { name: 'Latte Art 101', date: 'Sat, Oct 12', status: 'Few spots left' },
        { name: 'Watercolors & Coffee', date: 'Sun, Oct 13', status: 'Fully booked' },
        { name: 'The Art of Roasting', date: 'Wed, Oct 16', status: 'Open' },
        { name: 'Poetry Night', date: 'Fri, Oct 18', status: 'Free Entry' },
      ]
    }
  };

  const data = content[type];

  return (
    <div className="fixed inset-0 z-50 bg-[#fdfbf7] flex flex-col animate-in fade-in slide-in-from-bottom-10 duration-500 overflow-y-auto">
      {/* Navigation */}
      <nav className="sticky top-0 w-full px-8 py-6 flex justify-between items-center bg-[#fdfbf7]/80 backdrop-blur-md z-10 border-b border-[#3a261a]/5">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-[#3a261a] hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={20} />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Café</span>
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-display font-bold text-[#3a261a]">RABUSTA</h2>
        </div>
        <div className="flex space-x-4">
          <button className="p-2 text-[#3a261a] hover:bg-[#3a261a]/5 rounded-full"><Instagram size={18} /></button>
          <button className="p-2 text-[#3a261a] hover:bg-[#3a261a]/5 rounded-full"><Share2 size={18} /></button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto w-full px-8 py-16">
        <header className="mb-16 text-center">
          <span className="text-xs font-bold tracking-[0.4em] text-[#8c7a6b] uppercase mb-4 block">
            {type === 'menu' ? 'Nourishment' : type === 'art' ? 'Curation' : 'Engagement'}
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-[#3a261a] mb-6">{data.title}</h1>
          <p className="text-lg text-[#5c4033]/70 font-light">{data.subtitle}</p>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {type === 'menu' && (data.items as any[]).map((item, idx) => (
            <div key={idx} className="group p-8 border border-[#3a261a]/5 rounded-3xl hover:border-[#3a261a]/20 transition-all bg-white hover:shadow-xl hover:shadow-[#3a261a]/5">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-[#3a261a]">{item.name}</h3>
                <span className="text-lg font-display font-bold text-[#8c7a6b]">{item.price}</span>
              </div>
              <p className="text-sm text-[#5c4033]/60 leading-relaxed">{item.desc}</p>
              <button className="mt-6 text-[10px] font-bold uppercase tracking-widest text-[#3a261a] border-b border-[#3a261a] pb-1 hover:text-[#8c7a6b] hover:border-[#8c7a6b] transition-all">
                Add to Cart
              </button>
            </div>
          ))}

          {type === 'art' && (data.items as any[]).map((item, idx) => (
            <div key={idx} className="group overflow-hidden rounded-3xl bg-white border border-[#3a261a]/5 hover:shadow-2xl transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-[#3a261a] mb-2">{item.name}</h3>
                <div className="flex justify-between items-center text-xs text-[#5c4033]/60 font-medium tracking-wider uppercase">
                  <span>{item.artist}</span>
                  <span>{item.year}</span>
                </div>
              </div>
            </div>
          ))}

          {type === 'workshops' && (data.items as any[]).map((item, idx) => (
            <div key={idx} className="p-8 border border-[#3a261a]/5 rounded-3xl bg-white hover:shadow-xl transition-all flex flex-col">
              <div className="flex items-center space-x-2 text-[#8c7a6b] mb-4">
                <Calendar size={14} />
                <span className="text-xs font-bold uppercase tracking-widest">{item.date}</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-[#3a261a] mb-6">{item.name}</h3>
              <div className="mt-auto flex justify-between items-center">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                  item.status === 'Open' ? 'bg-green-50 text-green-700' : 
                  item.status === 'Fully booked' ? 'bg-red-50 text-red-700' : 'bg-orange-50 text-orange-700'
                }`}>
                  {item.status}
                </span>
                <button className="text-[10px] font-bold uppercase tracking-widest text-[#3a261a] border-b border-[#3a261a] pb-1">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-32 pt-16 border-t border-[#3a261a]/5 text-center">
          <div className="flex flex-col items-center space-y-4">
             <div className="w-12 h-12 bg-[#3a261a] rounded-full flex items-center justify-center text-white mb-4">
               <Coffee size={20} />
             </div>
             <p className="text-xs tracking-[0.5em] text-[#3a261a]/40 font-bold uppercase">Surat, India</p>
             <p className="text-[#3a261a]/60 text-sm italic font-display">"Bold coffee doesn't whisper. It inspires."</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Overlay;
