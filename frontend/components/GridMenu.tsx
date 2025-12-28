import React from 'react';

const GridMenu: React.FC = () => {
  const items = [
    {
      title: 'Coffee',
      img: 'https://drive.google.com/file/d/1NWf1ZT_DLoz0l3xPC1JgJCcb2eoqxM_b/view?usp=drive_link',
      link: '#'
    },
    {
      title: 'Savory Bites',
      img: 'https://drive.google.com/file/d/13ccbocysOZscyGnjqIGwHU-PxWSfwJsJ/view?usp=drive_link',
      link: '#'
    },
    {
      title: 'Desserts',
      img: 'https://drive.google.com/file/d/1hkSoKw54H4JTEcSkq79a8bzecOzTlAiy/view?usp=drive_link',
      link: '#'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 w-full">
      {items.map((item, i) => (
        <a
          key={i}
          href={item.link}
          className="relative aspect-square group overflow-hidden border border-cream/10"
        >
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center">
            <h3 className="text-white text-2xl font-bold font-oswald uppercase mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              {item.title}
            </h3>
            <span className="bg-cream text-onyx px-6 py-2 uppercase font-bold text-xs tracking-widest transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100 hover:bg-gold hover:text-white">
              Shop
            </span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default GridMenu;