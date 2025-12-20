import React, { useState, useMemo, useLayoutEffect, useRef } from 'react';
import { WORKSHOPS, FAQS } from '../pages/constants';
import { WorkshopType } from '../pages/types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WorkshopCard: React.FC<{ workshop: WorkshopType }> = ({ workshop }) => {
  return (
    <div className="workshop-card group flex flex-col h-full bg-white border border-onyx/5 hover:border-gold/30 transition-all duration-500 overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] opacity-0 translate-y-8">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={workshop.image} 
          alt={workshop.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="bg-onyx text-cream text-[9px] font-bold uppercase tracking-widest px-3 py-1.5">
                {workshop.category}
            </span>
            {workshop.price === 0 && (
                 <span className="bg-gold text-onyx text-[9px] font-bold uppercase tracking-widest px-3 py-1.5">
                    Community
                </span>
            )}
        </div>
      </div>
      
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-onyx/40">
                {workshop.date.replace(/-/g, '.')}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
                {workshop.price === 0 ? 'FREE' : `₹${workshop.price}`}
            </span>
        </div>
        
        <h3 className="text-2xl font-serif font-black mb-3 group-hover:text-gold transition-colors duration-300 uppercase leading-tight tracking-tight">
          {workshop.title}
        </h3>
        <p className="text-sm text-onyx/60 font-light leading-relaxed mb-6 line-clamp-3">
          {workshop.description}
        </p>
        
        <div className="mt-auto space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-onyx/80">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {workshop.time}
            </div>
            <button className="w-full bg-onyx text-cream text-[10px] font-bold uppercase tracking-[0.2em] py-4 hover:bg-gold transition-colors duration-300">
              Reserve Spot
            </button>
        </div>
      </div>
    </div>
  );
};

const FaqItem: React.FC<{ faq: { question: string; answer: string } }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-onyx/10 last:border-0 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left group"
      >
        <h3 className="text-lg font-serif italic text-onyx group-hover:text-gold transition-colors">
          {faq.question}
        </h3>
        <span className={`transform transition-transform duration-300 text-gold text-xl ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      <div className={`mt-4 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-sm text-onyx/60 font-light leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

const Workshop: React.FC = () => {
  const [filterType, setFilterType] = useState<"all" | "free" | "paid">("all");
  const [upcomingDays, setUpcomingDays] = useState<number | "all">("all");
  const [activeCategory, setActiveCategory] = useState<"all" | "Foundations" | "Expert" | "Breather">("all");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  const filteredWorkshops = useMemo(() => {
    return WORKSHOPS.filter((w) => {
      const today = new Date('2025-12-01');
      const workshopDate = new Date(w.date);

      if (filterType === "free" && w.price !== 0) return false;
      if (filterType === "paid" && w.price === 0) return false;

      if (upcomingDays !== "all") {
        const diffDays = (workshopDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
        if (diffDays < 0 || diffDays > upcomingDays) return false;
      }

      if (activeCategory !== "all" && w.category !== activeCategory) return false;

      return true;
    });
  }, [filterType, upcomingDays, activeCategory]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero reveal
      const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      heroTl.from(".hero-tag", { y: 20, opacity: 0, duration: 1 })
            .from(".hero-title-line", { y: 100, opacity: 0, stagger: 0.1, duration: 1.2 }, "-=0.8")
            .from(".hero-desc", { opacity: 0, y: 20, duration: 1 }, "-=1");

      // Filter bar stagger
      gsap.from(".filter-btn", {
        y: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out"
      });

      // Section titles reveal
      const animatedHeaders = document.querySelectorAll(".animate-header");
      animatedHeaders.forEach(header => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });

      // Workshop cards stagger on change
      gsap.to(".workshop-card", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        overwrite: "auto"
      });

      // Horizontal Scroll Highlights
      if (horizontalTrackRef.current && horizontalSectionRef.current) {
        const track = horizontalTrackRef.current;
        const section = horizontalSectionRef.current;
        
        const scrollWidth = track.scrollWidth;
        const windowWidth = window.innerWidth;
        const xTranslate = -(scrollWidth - windowWidth + (windowWidth * 0.1)); // 10% padding

        gsap.to(track, {
          x: xTranslate,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [filteredWorkshops]);

  return (
    <div ref={containerRef} className="min-h-screen bg-cream overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover grayscale opacity-30 brightness-50 scale-110"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-onyx/20"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <span className="hero-tag text-[10px] font-bold uppercase tracking-[0.5em] text-gold mb-8 block">
                The Lab Curriculum
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tighter uppercase text-onyx mb-8 leading-[0.9]">
                <span className="hero-title-line block">Brewing</span>
                <span className="hero-title-line italic font-light text-gold lowercase block">Sophistication</span>
            </h1>
            <p className="hero-desc text-lg text-onyx/70 font-light max-w-xl mx-auto leading-relaxed">
                Join our sensory scientists and master baristas in exploring the technical limits of coffee extraction, flavor profiling, and latte art.
            </p>
        </div>
      </section>

      {/* Filter Toolbar */}
      <section className="sticky top-[80px] z-40 bg-cream/80 backdrop-blur-md border-y border-onyx/5">
        <div className="max-w-[1600px] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
             {['all', 'Foundations', 'Expert', 'Breather'].map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat as any)}
                    className={`filter-btn text-[9px] font-bold uppercase tracking-[0.2em] px-6 py-2.5 rounded-full border transition-all duration-300 ${
                        activeCategory === cat ? 'bg-onyx text-cream border-onyx shadow-lg' : 'bg-transparent text-onyx border-onyx/10 hover:border-gold hover:text-gold'
                    }`}
                >
                    {cat}
                </button>
             ))}
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-onyx/40">Fee:</span>
                <select
                    className="bg-transparent border-b border-onyx/20 py-1 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-gold cursor-pointer"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                >
                    <option value="all">ALL TIERS</option>
                    <option value="free">COMMUNITY</option>
                    <option value="paid">TECHNICAL</option>
                </select>
            </div>
            
            <div className="flex items-center gap-4">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-onyx/40">Timeline:</span>
                <select
                    className="bg-transparent border-b border-onyx/20 py-1 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-gold cursor-pointer"
                    value={upcomingDays}
                    onChange={(e) => setUpcomingDays(e.target.value === "all" ? "all" : parseInt(e.target.value))}
                >
                    <option value="all">ANY TIME</option>
                    <option value="7">NEXT 7 DAYS</option>
                    <option value="14">NEXT 14 DAYS</option>
                    <option value="30">NEXT 30 DAYS</option>
                </select>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Grid */}
      <section className="py-24 px-6 lg:px-12 max-w-[1600px] mx-auto">
        {filteredWorkshops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {filteredWorkshops.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center">
            <h2 className="text-2xl font-serif italic text-onyx/40">No sessions match your current filters.</h2>
            <button 
              onClick={() => {setFilterType('all'); setUpcomingDays('all'); setActiveCategory('all');}}
              className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-gold border-b border-gold hover:text-onyx hover:border-onyx transition-all duration-300"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* Art Gallery Preview Section (Horizontal Scroll) */}
      <section ref={horizontalSectionRef} className="bg-onyx text-cream py-32 overflow-hidden flex flex-col justify-center min-h-screen">
        <div className="px-6 lg:px-12 mb-16">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-xl animate-header">
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold mb-6 block">Visual Narrative</span>
               <h2 className="text-5xl font-serif font-black uppercase leading-tight">Workshop Highlights</h2>
            </div>
            <p className="animate-header text-sm text-cream/60 max-w-xs font-light tracking-wide leading-relaxed border-l border-gold/30 pl-6">
                Capturing the moments of discovery and manual precision in our laboratory sessions.
            </p>
          </div>
        </div>
        
        <div className="relative">
          <div ref={horizontalTrackRef} className="flex gap-12 px-12 will-change-transform">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="gallery-item shrink-0 w-[450px] aspect-[4/5] overflow-hidden group border border-cream/10 relative">
                <img
                  src={`https://picsum.photos/id/${i + 200}/800/1000`}
                  alt={`Highlight ${i + 1}`}
                  className="w-full h-full object-cover transition-all duration-700 grayscale hover:grayscale-0 hover:scale-105 cursor-crosshair"
                />
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-onyx/80 backdrop-blur-md px-4 py-2">
                        LAB_STUDY_00{i+1}
                    </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-32 px-6 bg-white relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 animate-header">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold mb-6 block">Support</span>
            <h2 className="text-4xl font-serif font-black uppercase">Frequent Inquiries</h2>
          </div>
          <div className="divide-y divide-onyx/10 border-t border-onyx/10">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Workshop;