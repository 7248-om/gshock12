import React, { useState } from "react";
import axios from "axios";

const Franchise: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    investment: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const API_BASE_URL =
    import.meta.env.VITE_BACKEND_API_URL || "/api";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      await axios.post(`${API_BASE_URL}/franchises`, {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        budgetRange: formData.investment,
        message: formData.message,
      });

      setSubmitMessage({
        type: "success",
        text:
          "Your application has been submitted successfully. Our team will reach out shortly.",
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        investment: "",
        message: "",
      });
    } catch (error: any) {
      setSubmitMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex bg-white text-gray-900">
      {/* LEFT — FORM */}
      <div className="flex-1 px-6 lg:px-12 pt-32 pb-20">
        <div className="w-full max-w-md mx-auto">

          <p className="text-xs tracking-[0.35em] uppercase text-gray-400 mb-3">
            Franchise
          </p>

          <h1 className="text-[38px] font-display text-[#4E342E] font-bold mb-6 leading-tight">
            Grow with Rabuste
          </h1>

          <p className="text-gray-500 mb-12 font-medium leading-relaxed">
            Rabuste cafés blend bold Robusta, thoughtful design, and
            community-led spaces. We partner with people who believe
            in intention over speed.
          </p>

          {submitMessage && (
            <div
              className={`mb-8 p-4 rounded-2xl text-sm font-medium ${
                submitMessage.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {submitMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full name */}
            <div>
              <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">
                Full name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full py-4 px-5 bg-[#FFF5E1] rounded-2xl outline-none
                           border border-transparent focus:border-[#EC9706]
                           font-medium transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full py-4 px-5 bg-[#FFF5E1] rounded-2xl outline-none
                           border border-transparent focus:border-[#EC9706]
                           font-medium transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">
                Phone number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full py-4 px-5 bg-[#FFF5E1] rounded-2xl outline-none
                           border border-transparent focus:border-[#EC9706]
                           font-medium transition-all"
              />
            </div>

            {/* City */}
            <div>
              <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">
                Preferred city
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full py-4 px-5 bg-[#FFF5E1] rounded-2xl outline-none
                           border border-transparent focus:border-[#EC9706]
                           font-medium transition-all"
              />
            </div>

            {/* Investment */}
            <div>
              <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">
                Investment capacity
              </label>
              <select
                name="investment"
                value={formData.investment}
                onChange={handleChange}
                className="w-full py-4 px-5 bg-[#FFF5E1] rounded-2xl outline-none
                           border border-transparent focus:border-[#EC9706]
                           font-medium transition-all"
              >
                <option value="">Select range</option>
                <option>₹20–30 lakhs</option>
                <option>₹30–50 lakhs</option>
                <option>₹50+ lakhs</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">
                Why Rabuste?
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us why you are interested in partnering with Rabuste."
                className="w-full py-4 px-5 bg-[#FFF5E1] rounded-2xl outline-none
                           border border-transparent focus:border-[#EC9706]
                           font-medium transition-all resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-8 bg-[#EC9706] text-white py-4 rounded-2xl
                         font-bold text-lg shadow-lg hover:bg-[#B57B24]
                         transition-all active:scale-[0.98]
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting…" : "Submit application"}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT — BRAND STORY */}
      <div className="hidden lg:flex lg:w-1/2 p-8 pt-32">
        <div className="relative w-full min-h-[720px] rounded-[40px] overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80"
            alt="Rabuste café interior"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-[#4E342E]/65" />

          <div className="relative z-10 h-full flex flex-col justify-between p-14 text-white">
            <div>
              <p className="text-sm tracking-widest uppercase text-white/70 mb-6">
                Franchise philosophy
              </p>

              <h2 className="text-4xl font-display leading-tight mb-6">
                Built for people<br />who value intention
              </h2>

              <p className="text-white/80 max-w-md font-light leading-relaxed">
                Rabuste is not a fast-scaling coffee chain. It is a coffee-first,
                design-led brand built around community, culture, and craft.
              </p>
            </div>

            <div className="space-y-4 text-sm text-white/85 font-medium">
              <div>• Premium Robusta-only sourcing</div>
              <div>• Art-forward, locally rooted cafés</div>
              <div>• Long-term operational and brand support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Franchise;
