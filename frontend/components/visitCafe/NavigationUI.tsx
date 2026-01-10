
import React from 'react';
import { MoveUp, MoveDown, RotateCcw, RotateCw } from 'lucide-react';

const NavigationUI: React.FC = () => {
  return (
    <div className="absolute bottom-8 right-8 z-30 flex flex-col items-center space-y-4">
      {/* Movement Pad */}
      <div className="bg-white/30 backdrop-blur-2xl border border-white/50 p-6 rounded-[2.5rem] shadow-2xl grid grid-cols-3 gap-3">
        <div />
        <button 
          onClick={() => (window as any).moveForward()}
          className="w-14 h-14 bg-white/80 hover:bg-white text-[#3a261a] rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-90"
          title="Move Forward"
        >
          <MoveUp size={24} />
        </button>
        <div />
        
        <button 
          onClick={() => (window as any).turnLeft()}
          className="w-14 h-14 bg-white/80 hover:bg-white text-[#3a261a] rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-90"
          title="Turn Left"
        >
          <RotateCcw size={24} />
        </button>
        
        <button 
          onClick={() => (window as any).moveBackward()}
          className="w-14 h-14 bg-white/80 hover:bg-white text-[#3a261a] rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-90"
          title="Move Backward"
        >
          <MoveDown size={24} />
        </button>
        
        <button 
          onClick={() => (window as any).turnRight()}
          className="w-14 h-14 bg-white/80 hover:bg-white text-[#3a261a] rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-90"
          title="Turn Right"
        >
          <RotateCw size={24} />
        </button>
      </div>
      
      <p className="text-[10px] tracking-widest text-[#3a261a] font-black uppercase opacity-60">
        Navigation
      </p>
    </div>
  );
};

export default NavigationUI;
