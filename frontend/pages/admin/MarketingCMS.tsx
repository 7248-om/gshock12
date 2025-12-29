import React, { useState } from 'react';
import { Megaphone, HelpCircle, Video, Plus, Trash2 } from 'lucide-react';
import { FAQ } from '../types';

interface Props {
  faqs: FAQ[];
  onUpdateFaqs: (faqs: FAQ[]) => void;
}

const MarketingCMS: React.FC<Props> = ({ faqs, onUpdateFaqs }) => {
  const [tickerLeft, setTickerLeft] = useState(['Today at Rabuste', 'New Colombia Drop', 'Workshop Sat 10AM']);
  const [tickerRight, setTickerRight] = useState(['Robusta Highlights', 'High Caffeine Yield', 'Art Reveal Friday']);
  const [heroVideo, setHeroVideo] = useState('https://onyx.com/assets/video/hero.mp4');

  const addFaq = () => {
    onUpdateFaqs([...faqs, { id: Math.random().toString(), question: 'New Question?', answer: 'New Answer.', category: 'General' }]);
  };

  const updateFaq = (id: string, field: keyof FAQ, value: string) => {
    onUpdateFaqs(faqs.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const deleteFaq = (id: string) => {
    onUpdateFaqs(faqs.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-4xl font-serif font-bold tracking-tight text-coffee-100">Marketing & Content</h2>
        <p className="text-coffee-500 mt-1">Dynamic site control for the Rabuste digital experience.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ticker Management */}
        <section className="bg-coffee-900 border border-coffee-800 p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 border-b border-coffee-800 pb-4">
            <Megaphone className="text-coffee-500" />
            <h3 className="text-lg font-serif font-bold text-coffee-100">Dynamic Ticker Lanes</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-coffee-500 block mb-2">Left Lane (Rabuste Today)</label>
              {tickerLeft.map((item, i) => (
                <input key={i} value={item} onChange={(e) => {
                  const copy = [...tickerLeft];
                  copy[i] = e.target.value;
                  setTickerLeft(copy);
                }} className="w-full bg-coffee-950 border border-coffee-800 rounded-xl px-4 py-3 text-sm mb-2 text-coffee-100 focus:border-coffee-500 outline-none" />
              ))}
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-coffee-500 block mb-2">Right Lane (Highlights)</label>
              {tickerRight.map((item, i) => (
                <input key={i} value={item} onChange={(e) => {
                  const copy = [...tickerRight];
                  copy[i] = e.target.value;
                  setTickerRight(copy);
                }} className="w-full bg-coffee-950 border border-coffee-800 rounded-xl px-4 py-3 text-sm mb-2 text-coffee-100 focus:border-coffee-500 outline-none" />
              ))}
            </div>
          </div>
        </section>

        {/* Hero Media */}
        <section className="bg-coffee-900 border border-coffee-800 p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 border-b border-coffee-800 pb-4">
            <Video className="text-coffee-500" />
            <h3 className="text-lg font-serif font-bold text-coffee-100">Hero Experience</h3>
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-coffee-500 block mb-2">Main Hero Video URL</label>
            <input value={heroVideo} onChange={(e) => setHeroVideo(e.target.value)} className="w-full bg-coffee-950 border border-coffee-800 rounded-xl px-4 py-3 text-sm text-coffee-100 focus:border-coffee-500 outline-none" />
            <p className="text-[10px] text-coffee-600 mt-2 italic">Requires direct link to .mp4 or stream asset.</p>
          </div>
        </section>

        {/* FAQ Manager */}
        <section className="lg:col-span-2 bg-coffee-900 border border-coffee-800 p-8 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-coffee-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="text-coffee-500" />
              <h3 className="text-lg font-serif font-bold text-coffee-100">FAQ Intelligence</h3>
            </div>
            <button onClick={addFaq} className="flex items-center gap-2 px-4 py-2 bg-coffee-100 text-coffee-950 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors">
              <Plus size={14} /> Add FAQ
            </button>
          </div>
          <div className="space-y-4">
            {faqs.map(faq => (
              <div key={faq.id} className="grid grid-cols-12 gap-4 bg-coffee-950/40 p-4 rounded-2xl border border-coffee-800">
                <div className="col-span-5">
                   <input value={faq.question} onChange={(e) => updateFaq(faq.id, 'question', e.target.value)} className="w-full bg-transparent border-none text-sm font-bold text-coffee-100 outline-none placeholder:text-coffee-600" placeholder="Question" />
                </div>
                <div className="col-span-6">
                   <input value={faq.answer} onChange={(e) => updateFaq(faq.id, 'answer', e.target.value)} className="w-full bg-transparent border-none text-sm text-coffee-600 outline-none placeholder:text-coffee-700" placeholder="Answer" />
                </div>
                <div className="col-span-1 flex justify-end">
                   <button onClick={() => deleteFaq(faq.id)} className="text-coffee-600 hover:text-red-400"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MarketingCMS;