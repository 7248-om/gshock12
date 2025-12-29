import React, { useLayoutEffect, useRef, useState, useMemo, useEffect } from 'react';
import { FAQS } from './constants';
import { WorkshopType } from './types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ================= WORKSHOP CARD ================= */

const WorkshopCard: React.FC<{ workshop: WorkshopType }> = ({ workshop }) => {
  const [booked, setBooked] = useState(false);

  const handleReserve = () => {
    setBooked(true);
    setTimeout(() => setBooked(false), 3000);
  };

  return (
    <div className="workshop-card group relative w-full h-[28rem] bg-cream border border-[#7B542F] rounded-t-full overflow-hidden opacity-0 translate-y-12">
      {/* ---------- PART 1 : IMAGE ---------- */}
      <div className="relative h-full overflow-hidden transition-all duration-500 group-hover:opacity-0 group-hover:scale-95">
        <img
          src={workshop.image}
          alt={workshop.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0 blur-sm"
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
  
    <span className="bg-black text-white text-[30px] text-center font-bold  uppercase tracking-widest px-3 py-1.5 shadow-md">
      {workshop.title}
    </span>
  
</div>
      </div>

      {/* ---------- PART 2 : CONTENT (HOVER) ---------- */}
      <div className="absolute inset-0 py-8 px-6 flex flex-col bg-cream opacity-0 translate-y-6 overflow-hidden transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
        <div className="flex flex-col items-center justify-center mb-2 gap-1">
          <div className="text-[18px] font-bold uppercase tracking-widest text-onyx/40">
            {new Date(workshop.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
          </div>
          <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-onyx/80">
            {new Date(workshop.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} – {new Date(workshop.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
          </div>
        </div>

        <h3 className="text-xl font-serif font-black mb-3 uppercase text-center mt-4 leading-tight tracking-tight text-coffee">
          About the Workshop
        </h3>

        <p className="font-light mb-6 mt-2 px-2 line-clamp-4 text-[14px] text-center italic text-onyx/70">
          {workshop.description}
        </p>

        <div className="mt-auto flex flex-col items-center">
          <div className="text-[20px] font-bold uppercase tracking-widest text-gold mb-6">
            {workshop.price === 0 ? 'FREE' : `₹${workshop.price}`}
          </div>
          <button
            onClick={handleReserve}
            disabled={booked}
            className={`w-full text-[10px] font-black uppercase tracking-[0.2em] py-4 transition-all duration-300 ${
              booked
                ? 'bg-[#B6771D] text-black cursor-default'
                : 'bg-[#FF9D00] text-black hover:bg-gold hover:text-onyx active:scale-95'
            }`}
          >
            {booked ? 'Request Received' : 'Reserve Spot'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= FAQ ITEM ================= */

const FaqItem: React.FC<{ faq: { question: string; answer: string } }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/20 py-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left group"
      >
        <h3 className="text-xl md:text-2xl font-serif italic text-black group-hover:text-gold transition-colors duration-300">
          {faq.question}
        </h3>
        <span
          className={`text-white text-3xl font-thin transition-transform duration-500 ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>

      <div
        className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-base font-light text-cream/80 leading-relaxed max-w-2xl italic">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

/* ================= MAIN PAGE ================= */

const Workshop: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // State
  const [workshops, setWorkshops] = useState<WorkshopType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceFilters, setPriceFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('date-asc');

  // Fetch workshops from backend
  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/workshops`);
        if (!response.ok) {
          throw new Error('Failed to fetch workshops');
        }
        const data = await response.json();
        setWorkshops(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching workshops:', err);
        setError('Failed to load workshops. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  // Filtering & Sorting Logic
  const filteredAndSortedWorkshops = useMemo(() => {
    let result = [...workshops];

    // Filter by Price
    if (priceFilters.length > 0) {
      result = result.filter(w => {
        if (priceFilters.includes('Free') && w.price === 0) return true;
        if (priceFilters.includes('Paid') && w.price > 0) return true;
        return false;
      });
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
        default:
          return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

    return result;
  }, [workshops, priceFilters, sortBy]);

  // Handle price checkbox change
  const handlePriceFilterChange = (price: string) => {
    setPriceFilters(prev => 
      prev.includes(price) 
        ? prev.filter(p => p !== price) 
        : [...prev, price]
    );
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger when workshops list changes to ensure visibility
      ScrollTrigger.refresh();

      gsap.to('.workshop-card', {
        scrollTrigger: {
          trigger: '.workshop-grid',
          start: 'top 90%',
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [filteredAndSortedWorkshops]); // Re-run when list updates

  return (
    <div ref={containerRef} className="min-h-screen bg-cream overflow-x-hidden selection:bg-gold selection:text-onyx">
      
      {/* HERO */}
      <section className="relative h-[60vh] flex items-center justify-center bg-[#FF9D00] overflow-hidden">
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="hero-tag text-[10px] font-bold uppercase tracking-[0.5em] text-gold mb-8 block">
            The Lab Curriculum
          </span>

          <h1 className="text-6xl md:text-8xl font-serif font-black uppercase text-cream mb-8 leading-[0.9]">
            <span className="hero-title-line block">Brewing</span>
            <span className="hero-title-line italic font-light text-black lowercase block">
              Sophistication
            </span>
          </h1>

          <p className="hero-desc text-lg text-cream font-light max-w-xl mx-auto leading-relaxed">
            Join our sensory scientists and master baristas in exploring the technical
            limits of coffee extraction and flavor profiling.
          </p>
        </div>
      </section>

      {/* WORKSHOPS HEADER */}
      <div className="text-center bg-white py-16 border-b border-coffee/10">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold mb-4 block">
          Curated Sessions
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-black uppercase text-coffee">
          Technical Masterclasses
        </h2>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="py-12 px-6 max-w-[1600px] mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center">
            <p className="text-red-700 font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 text-[10px] uppercase font-black tracking-widest text-gold hover:text-coffee transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="py-32 px-6 max-w-[1600px] mx-auto">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin mb-6">
              <div className="text-4xl">☕</div>
            </div>
            <p className="text-coffee font-medium">Brewing up some amazing workshops...</p>
          </div>
        </div>
      )}

      {/* WORKSHOPS CONTENT AREA */}
      {!loading && !error && (
      <section className="py-20 px-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
          
          {/* FILTER SIDEBAR */}
          <aside className="sticky top-24 h-fit bg-cream/95 backdrop-blur-xl border border-coffee/20 rounded-3xl p-8 shadow-sm self-start z-20">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-sm font-black uppercase tracking-[0.3em] text-coffee">
                Refine
              </h3>
              <button 
                onClick={() => {setPriceFilters([]); setSortBy('date-asc');}}
                className="text-[10px] uppercase font-bold text-gold hover:text-coffee transition-colors"
              >
                Reset
              </button>
            </div>

            {/* SORTING */}
            <div className="mb-12">
              <p className="text-[11px] font-black uppercase tracking-widest mb-6 text-onyx/40">
                Sort By
              </p>
              <div className="space-y-3">
                {[
                  { id: 'date-asc', label: 'Earliest Date' },
                  { id: 'date-desc', label: 'Latest Date' },
                  { id: 'price-asc', label: 'Price: Low to High' },
                  { id: 'price-desc', label: 'Price: High to Low' }
                ].map(option => (
                  <button
                    key={option.id}
                    onClick={() => setSortBy(option.id)}
                    className={`block w-full text-left text-sm font-medium transition-all duration-300 ${
                      sortBy === option.id ? 'text-coffee translate-x-2 font-bold' : 'text-onyx/60 hover:text-coffee hover:translate-x-1'
                    }`}
                  >
                    {sortBy === option.id && <span className="mr-2">●</span>}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-coffee/10 mb-10" />

            {/* PRICE FILTER */}
            <div className="mb-12">
              <p className="text-[11px] font-black uppercase tracking-widest mb-6 text-onyx/40">
                Investment
              </p>

              <div className="space-y-5">
                {["Free", "Paid"].map(price => (
                  <label
                    key={price}
                    className="flex items-center justify-between text-sm font-medium text-onyx/80 cursor-pointer group"
                  >
                    <span className={`transition-colors duration-300 ${priceFilters.includes(price) ? 'text-coffee font-bold' : 'group-hover:text-coffee'}`}>
                      {price}
                    </span>
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={priceFilters.includes(price)}
                        onChange={() => handlePriceFilterChange(price)}
                        className="peer h-5 w-5 opacity-0 absolute cursor-pointer"
                      />
                      <div className="h-5 w-5 border-2 border-coffee/30 rounded-md peer-checked:bg-coffee peer-checked:border-coffee transition-all duration-300 flex items-center justify-center">
                        <div className={`h-2 w-2 bg-cream rounded-sm transition-transform duration-300 ${priceFilters.includes(price) ? 'scale-100' : 'scale-0'}`}></div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-coffee/10 my-10" />

            {/* NAVIGATION LINKS */}
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest mb-6 text-onyx/40">
                Directory
              </p>
                   <ul className="space-y-4 text-sm">
       <li>
      <a
        href="/"
        className="block text-onyx/80 hover:text-[#7B542F] transition-colors"
      >
       All about Rabuste: Home
      </a>
    </li>
    <li>
      <a
        href="/menu"
        className="block text-onyx/80 hover:text-[#7B542F] transition-colors"
      >
        The Menu
      </a>
    </li>

    <li>
      <a
        href="/art"
        className="block text-onyx/80 hover:text-[#7B542F] transition-colors"
      >
        Calming Art Gallery
      </a>
    </li>

    <li>
      <a
        href="/about"
        className="block text-onyx/80 hover:text-[#7B542F] transition-colors"
      >
        About Us: Our Story
      </a>
    </li>
<li>
      <a
        href="/why"
        className="block text-onyx/80 hover:text-[#7B542F] transition-colors"
      >
        Why Robusta? 
      </a>
    </li>

    <li>
      <a
        href="/Franchise"
        className="block text-onyx/80 hover:text-[#7B542F] transition-colors"
      >
        Franchise
      </a>
    </li>

    
  </ul>
            </div>
          </aside>

          {/* WORKSHOP GRID */}
          <div className="flex-1">
            {filteredAndSortedWorkshops.length > 0 ? (
              <div className="workshop-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-16">
                {filteredAndSortedWorkshops.map(w => (
                  <WorkshopCard key={w._id || w.id} workshop={w} />
                ))}
              </div>
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-coffee/10 rounded-3xl p-12 text-center bg-white/50">
                <div className="text-4xl mb-4">☕</div>
                <h3 className="text-2xl font-serif text-coffee uppercase font-bold mb-2">No Sessions Found</h3>
                <p className="text-onyx/60 font-light italic">We're currently brewing more sessions. Try adjusting your filters.</p>
                <button 
                  onClick={() => {setPriceFilters([]); setSortBy('date-asc');}}
                  className="mt-6 text-[10px] uppercase font-black tracking-widest text-gold hover:text-coffee transition-all"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      )}

      {/* FAQ */}
      <section className="py-32 bg-[#FFCF71] px-6">
        <div className="max-w-3xl mx-auto">
          {FAQS.map((faq, i) => (
            <FaqItem key={i} faq={faq} />
          ))}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </div>
  );
};

export default Workshop;