import React from 'react';

// Define props for the reusable TickerLane sub-component
interface TickerLaneProps {
  label: string;
  items: string[];
  scrollDirection: 'left' | 'right';
  paddingClass: string;
  showTrend?: boolean;
}

/**
 * TickerLane is a sub-component that renders a single scrolling lane of items.
 * It is used by the main Ticker component to keep the code DRY.
 */
const TickerLane: React.FC<TickerLaneProps> = ({
  label,
  items,
  scrollDirection,
  paddingClass,
  showTrend = false,
}) => {
  const animationClass = scrollDirection === 'left' ? 'animate-scroll-left' : 'animate-scroll-right';
  // Duplicate items to create a seamless looping effect
  const displayItems = [...items, ...items];

  return (
    <div className="flex items-center overflow-hidden relative h-full">
      {/* Static label on the left side of the lane */}
      <div className="absolute left-0 bg-cream z-10 px-2 h-full flex items-center border-r border-onyx">
        {label}
      </div>
      {/* Scrolling container */}
      <div className={`flex ${animationClass} whitespace-nowrap ${paddingClass}`}>
        {displayItems.map((item, index) => (
          <span key={`${item}-${index}`} className="mx-4 flex items-center gap-1">
            {showTrend && (index % 2 === 0 ? '▲ ' : '▼ ')}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

/**
 * Ticker component renders a full-width ticker with two lanes and a central announcement.
 * It has been refactored to use the TickerLane sub-component for better readability and maintenance.
 */
const Ticker: React.FC = () => {
  const leftItems = [
    "Fresh Robusta Brew",
    "Live Art on Display",
    "Workshop Registrations Open",
    "Community Sessions This Week",
    "New Artist Featured",
  ];

  const rightItems = [
    "Bold & Strong",
    "High Caffeine",
    "Earthy Flavor",
    "Pure Robusta",
    "Crafted for Energy",
  ];

  return (
    <div className="bg-cream border-b border-onyx text-xs uppercase font-bold tracking-widest overflow-hidden h-[40px] flex items-center relative z-20">
      {/* Left Ticker Lane */}
      <div className="w-1/2 border-r border-onyx h-full">
        <TickerLane
          label="Today at Rabuste"
          items={leftItems}
          scrollDirection="left"
          paddingClass="pl-[140px]"
        />
      </div>

      {/* Right Ticker Lane */}
      <div className="w-1/2 h-full">
        <TickerLane
          label="Robusta Highlights"
          items={rightItems}
          scrollDirection="right"
          paddingClass="pl-[160px]"
          showTrend
        />
      </div>

      {/* Center Announcement */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        <div className="bg-cream px-4 py-1 border border-onyx text-[10px] pointer-events-auto">
          ROBUSTA • ART • COMMUNITY
        </div>
      </div>
    </div>
  );
};

export default Ticker;
