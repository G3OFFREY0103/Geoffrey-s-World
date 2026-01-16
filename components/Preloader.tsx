
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations, Language } from '../constants/translations';

const Preloader: React.FC<{ onComplete: () => void, lang: Language }> = ({ onComplete, lang }) => {
  const [count, setCount] = useState(0);
  const [showEnter, setShowEnter] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    if (count < 100) {
      const jump = Math.floor(Math.random() * 8) + 1;
      const timeout = Math.random() * 60 + 20;
      
      const timer = setTimeout(() => {
        setCount(prev => Math.min(prev + jump, 100));
      }, timeout);
      
      return () => clearTimeout(timer);
    } else {
      setShowEnter(true);
    }
  }, [count]);

  return (
    <motion.div
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Counter Container with Masking */}
      <div className="relative overflow-hidden flex flex-col items-center mb-8">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          className="flex items-start gap-4"
        >
          <h2 className="text-[25vw] md:text-[20vw] font-serif italic leading-none tracking-tighter text-white">
            {count}
          </h2>
          <span className="text-xl font-light opacity-50 mt-10 md:mt-20">%</span>
        </motion.div>
      </div>

      {/* Enter Button - Moved outside the overflow-hidden container to ensure visibility */}
      <div className="h-[60px] flex items-center justify-center">
        <AnimatePresence>
          {showEnter && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              onClick={onComplete}
              className="group cursor-pointer relative z-10"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="text-[12px] md:text-[14px] font-mono tracking-[0.5em] text-white uppercase group-hover:opacity-100 opacity-70 transition-opacity">
                  [ Enter World ]
                </div>
                <div className="h-[1px] w-0 bg-white group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      
      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/10 pt-8">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-[0.4em] opacity-30">
            {showEnter ? "SYSTEM READY" : t.initiating}
          </span>
          <span className="text-[12px] font-medium tracking-widest">[SYSTEM.BOOT_SEQUENCE]</span>
        </div>
        <div className="text-[10px] opacity-20 text-right">
          LAT: 31.2304° N<br />LONG: 121.4737° E
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
