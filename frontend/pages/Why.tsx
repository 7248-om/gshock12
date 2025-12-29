
import React, { useState } from 'react';
// import { GoogleGenAI } from "@google/genai";

const Why = () => {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // const askRoaster = async () => {
  //   if (!query.trim()) return;
  //   setLoading(true);
  //   setAiResponse('');
    
  //   try {
  //     const ai = new GoogleGenAI({ apiKey: "AIzaSyASNG-BuxInW_LG3X92k4TAJC5Bv-3T7qA" });
  //     const response = await ai.models.generateContent({
  //       model: 'gemini-3-flash-preview',
  //       contents: `As a expert coffee roaster with a deep love for Robusta (Coffea canephora), explain to a customer why Robusta is perfect for their specific preference: "${query}". Focus on the high caffeine (2.7%), the low acidity, the deep chocolate/nutty flavor notes, and the superior crema. Be sophisticated and encouraging.`,
  //     });
  //     setAiResponse(response.text || "The beans are silent... try again shortly.");
  //   } catch (error) {
  //     console.error(error);
  //     setAiResponse("Even the strongest brew hits a snag sometimes. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-onyx text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-onyx"></div>
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-gold uppercase tracking-[0.3em] text-sm mb-4 block">The Bold Choice</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Why Robusta?</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-cream/80 leading-relaxed font-light">
            In a world obsessed with Arabica, we choose the bean that stands its ground. 
            Discover the science of strength and the soul of the perfect crema.
          </p>
        </div>
      </section>

      {/* The Power Pillars */}
      <section className="py-24 bg-cream px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4 group">
            <div className="w-16 h-16 bg-gold/10 flex items-center justify-center rounded-full text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif text-onyx">Double the Kick</h3>
            <p className="text-onyx/70 leading-relaxed">
              Robusta contains nearly double the caffeine of Arabica (2.7% vs 1.5%). This higher alkaloid content acts as a natural pesticide for the plant and a potent cognitive catalyst for you.
            </p>
          </div>

          <div className="space-y-4 group">
            <div className="w-16 h-16 bg-gold/10 flex items-center justify-center rounded-full text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif text-onyx">Unrivaled Body</h3>
            <p className="text-onyx/70 leading-relaxed">
              Renowned for producing a thick, persistent crema, Robusta adds a luxurious mouthfeel that Arabica simply cannot match. It is the architectural foundation of the world's best espressos.
            </p>
          </div>

          <div className="space-y-4 group">
            <div className="w-16 h-16 bg-gold/10 flex items-center justify-center rounded-full text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif text-onyx">Climate Resilience</h3>
            <p className="text-onyx/70 leading-relaxed">
              The 'Robust' in the name isn't just marketing. These hardy trees grow at lower altitudes and resist heat and pests, making them a more sustainable choice for a warming planet.
            </p>
          </div>
        </div>
      </section>

      {/* Flavor Profile Section */}
      <section className="bg-onyx text-cream py-24 px-4 overflow-hidden relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif">A Profile of Depth</h2>
            <p className="text-lg text-cream/70 leading-relaxed">
              Forget the "burnt" reputation of commodity coffee. Specialty Robusta offers a unique flavor wheel that leans into the sophisticated dark side of sensory experience.
            </p>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Dark Chocolate & Cocoa</span>
                  <span className="text-gold">95%</span>
                </div>
                <div className="w-full bg-cream/10 h-1.5 rounded-full">
                  <div className="bg-gold h-full rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Earthy & Nutty Notes</span>
                  <span className="text-gold">88%</span>
                </div>
                <div className="w-full bg-cream/10 h-1.5 rounded-full">
                  <div className="bg-gold h-full rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Low Acidity</span>
                  <span className="text-gold">100%</span>
                </div>
                <div className="w-full bg-cream/10 h-1.5 rounded-full">
                  <div className="bg-gold h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <img 
              src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=2070&auto=format&fit=crop" 
              alt="Deep Roasted Beans" 
              className="rounded-2xl shadow-2xl grayscale brightness-75 hover:grayscale-0 transition-all duration-700 cursor-pointer"
            />
            <div className="absolute -bottom-8 -left-8 bg-gold p-8 rounded-xl hidden md:block">
              <span className="text-white text-3xl font-serif block italic">"The Soul of Espresso"</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Interactive Component */}
      {/* <section className="py-24 bg-cream px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gold/10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-onyx mb-4">The Roaster's Logic</h2>
            <p className="text-onyx/60">Describe your coffee mood, and our AI Master Roaster will explain why Robusta is your perfect match.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input 
              type="text" 
              placeholder="e.g., 'I need a heavy, chocolatey punch for a late night session' or 'I want low acid'"
              className="flex-grow px-6 py-4 rounded-full border border-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/50 bg-cream/20 text-onyx"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && askRoaster()}
            />
            <button 
              onClick={askRoaster}
              disabled={loading}
              className="bg-onyx text-white px-8 py-4 rounded-full hover:bg-gold transition-all duration-300 disabled:opacity-50 flex items-center justify-center min-w-[140px]"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Ask the Master'}
            </button>
          </div>

          {aiResponse && (
            <div className="bg-gold/5 p-8 rounded-2xl border-l-4 border-gold animate-in slide-in-from-bottom duration-500">
              <h4 className="text-gold font-bold uppercase tracking-widest text-xs mb-4">Roaster's Note</h4>
              <p className="text-onyx leading-relaxed italic text-lg whitespace-pre-wrap">
                {aiResponse}
              </p>
            </div>
          )}
        </div>
      </section> */}

      {/* Comparison Table */}
      <section className="py-24 bg-onyx text-white px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-serif text-center mb-16">Arabica vs. Robusta</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/10 pb-4 text-gold uppercase tracking-widest text-sm font-bold">
            <div className="hidden md:block">Characteristic</div>
            <div className="md:text-center">Arabica</div>
            <div className="md:text-center">Robusta</div>
          </div>
          {[
            ['Caffeine Content', '~1.5%', '~2.7%'],
            ['Sugar Content', '6-9%', '3-7%'],
            ['Lipid Content', '15-17%', '10-11%'],
            ['Flavor Notes', 'Citrus, Floral, Sweet', 'Earthy, Nutty, Chocolate'],
            ['Acidity', 'High & Bright', 'Low & Mellow'],
            ['Crema', 'Thin & Pale', 'Thick & Golden'],
          ].map(([label, arabica, robusta], i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 py-6 border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
              <div className="font-medium text-cream/50 mb-2 md:mb-0">{label}</div>
              <div className="md:text-center text-cream/80">{arabica}</div>
              <div className="md:text-center text-gold font-bold">{robusta}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gold text-white text-center px-4">
        <h2 className="text-4xl md:text-5xl font-serif mb-8">Ready for a Stronger Morning?</h2>
        <p className="max-w-xl mx-auto mb-12 text-lg text-white/90">
          Experience the bold depth of premium specialty Robusta in our curated menu.
        </p>
        <a 
          href="/menu" 
          className="inline-block bg-onyx text-white px-12 py-5 rounded-full hover:bg-white hover:text-onyx transition-all duration-300 font-bold uppercase tracking-widest text-sm"
        >
          Explore the Menu
        </a>
      </section>
    </div>
  );
};

export default Why;
