
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Theme, Language } from '../constants/translations';

interface MusicPlayerProps {
  lang: Language;
  theme: Theme;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed bottom-8 right-8 z-[140] pointer-events-auto flex flex-col items-end gap-4">
      <motion.div
        initial={false}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0,
          y: isOpen ? 0 : 20,
          scale: isOpen ? 1 : 0.95,
          marginBottom: isOpen ? 0 : -16 // Compensate for gap when hidden
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`overflow-hidden rounded-[12px] shadow-2xl backdrop-blur-xl border origin-bottom-right ${
           theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-white/40 border-black/10'
        }`}
        style={{ width: '300px' }}
      >
        <div style={{ height: '152px', width: '100%' }}>
          <iframe
            style={{ borderRadius: '12px', border: 'none', display: 'block' }}
            src="https://open.spotify.com/embed/playlist/4y2AQc7VSsZprR3rPd7T7L?utm_source=generator&theme=0"
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Player"
          />
        </div>
      </motion.div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 flex items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 group ${
          theme === 'dark' 
            ? 'border-white/10 bg-black/40 text-white hover:bg-white/10 hover:border-white/30' 
            : 'border-black/10 bg-white/40 text-black hover:bg-black/5 hover:border-black/30'
        }`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          )}
        </motion.div>
      </button>
    </div>
  );
};

export default MusicPlayer;
