import React from "react";

const Franchise = () => {
  return (
    <section className="w-full px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">

        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[0.35em] uppercase text-onyx/60 mb-6">
            Franchise
          </p>

          <h1 className="text-4xl md:text-5xl font-light leading-tight mb-8">
            Become a Part of<br /> the Rabuste Story
          </h1>

          <p className="text-onyx/70 max-w-md mb-10 leading-relaxed">
            Rabuste cafés are designed as cultural spaces — where carefully
            curated Robusta coffee meets art, community, and conversation.
            We invite partners who share our vision of thoughtful growth.
          </p>

          <div className="space-y-3 text-sm text-onyx/70 tracking-wide">
            <div>— Curated coffee-first brand</div>
            <div>— Art & experience driven cafés</div>
            <div>— End-to-end operational support</div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="border border-onyx/15 p-10 md:p-14 bg-cream">
          <h2 className="text-sm tracking-[0.3em] uppercase mb-12">
            Franchise Application
          </h2>

          <form className="space-y-8">

            {/* Name */}
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2 text-onyx/60">
                Full Name
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-onyx/30 py-2 focus:outline-none focus:border-gold transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2 text-onyx/60">
                Email Address
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-onyx/30 py-2 focus:outline-none focus:border-gold transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2 text-onyx/60">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full bg-transparent border-b border-onyx/30 py-2 focus:outline-none focus:border-gold transition"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2 text-onyx/60">
                Preferred City
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-onyx/30 py-2 focus:outline-none focus:border-gold transition"
              />
            </div>

            {/* Investment */}
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2 text-onyx/60">
                Investment Capacity
              </label>
              <select
                className="w-full bg-cream border-b border-onyx/30 py-2 focus:outline-none focus:border-gold transition"
              >
                <option value="">Select range</option>
                <option>₹20–30 Lakhs</option>
                <option>₹30–50 Lakhs</option>
                <option>₹50+ Lakhs</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2 text-onyx/60">
                Why Rabuste?
              </label>
              <textarea
                rows="3"
                className="w-full bg-transparent border-b border-onyx/30 py-2 focus:outline-none focus:border-gold transition resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-12 w-full py-4 border border-onyx uppercase tracking-[0.25em] text-sm hover:bg-onyx hover:text-cream transition-all duration-300"
            >
              Submit Application
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Franchise;
