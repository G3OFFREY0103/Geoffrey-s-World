
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations, Language } from '../constants/translations';

const Preloader: React.FC<{ onComplete: () => void, lang: Language }> = ({ onComplete, lang }) => {
  const [count, setCount] = useState(0);
  const t = translations[lang];

  useEffect(() => {
    let timer: any;
    const updateCount = () => {
      setCount((prev) => {
        if (prev < 100) {
          const jump = Math.floor(Math.random() * 8) + 1;
          timer = setTimeout(updateCount, Math.random() * 60 + 20);
          return Math.min(prev + jump, 100);
        } else {
          setTimeout(onComplete, 800);
          return 100;
        }
      });
    };

    timer = setTimeout(updateCount, 200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="relative overflow-hidden">
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
      
      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/10 pt-8">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-[0.4em] opacity-30">{t.initiating}</span>
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
