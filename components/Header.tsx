
import React from 'react';
import { motion } from 'framer-motion';
import { Theme, Language, translations } from '../constants/translations';

interface HeaderProps {
  lang: Language;
  theme: Theme;
  onToggleLang: () => void;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ lang, theme, onToggleLang, onToggleTheme }) => {
  const t = translations[lang];
  
  return (
    <header className="fixed top-0 left-0 w-full z-[120] p-6 md:p-10 pointer-events-none">
      <div className="flex justify-between items-start border-b border-current/10 pb-6 mix-blend-diff">
        <div className="flex flex-col gap-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-baseline gap-2"
          >
            <h1 className="text-2xl md:text-3xl font-serif italic font-light tracking-tight text-current leading-none">
              {t.title}
            </h1>
            <span className="text-[10px] md:text-[12px] font-light opacity-50 align-top text-current">[30]</span>
          </motion.div>
          <motion.p 
            key={lang}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="text-[9px] uppercase tracking-[0.4em] text-current mt-2"
          >
            {t.subTagline}
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-4 md:gap-6 pointer-events-auto"
        >
          <button 
            onClick={onToggleLang}
            className={`text-[10px] uppercase tracking-widest px-3 py-1.5 border rounded-full transition-all duration-300 ${theme === 'dark' ? 'border-white/20 hover:border-white' : 'border-black/20 hover:border-black'}`}
          >
            {lang === 'en' ? 'ZH' : 'EN'}
          </button>

          <button 
            onClick={onToggleTheme}
            className={`relative w-6 h-6 flex items-center justify-center rounded-full border ${theme === 'dark' ? 'border-white/20 hover:border-white' : 'border-black/20 hover:border-black'} group transition-colors`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-black'} transition-all duration-500`} />
          </button>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
