
import React, { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Gallery from './components/Gallery';
import SearchSection from './components/SearchSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import GlitchText from './components/GlitchText';
import MusicPlayer from './components/MusicPlayer';
import { GalleryItem } from './types';
import { translations, Theme, Language } from './constants/translations';

const App: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLang] = useState<Language>('zh');
  
  // Animation state for "Chaos" cycle
  // Cycle: 2.5s Active (Extreme Chaos), 4s Static (Clarity)
  const [isBreathing, setIsBreathing] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    const runCycle = () => {
      setIsBreathing(true);
      
      setTimeout(() => {
        setIsBreathing(false);
      }, 2500); // Chaos lasts 2.5s
    };

    const startTimeout = setTimeout(() => {
      runCycle();
      const interval = setInterval(runCycle, 6500); // Loop every 6.5s
      return () => clearInterval(interval);
    }, 1500);

    return () => clearTimeout(startTimeout);
  }, [isLoading]);
  
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 500], [0, -150]);
  const subtitleX = useTransform(scrollY, [0, 500], [0, 100]);
  
  const scrollYProgress = useScroll().scrollYProgress;
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const t = translations[lang];

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#fafafa] text-black';
  }, [theme]);

  useEffect(() => {
    if (selectedItem || isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedItem, isLoading]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleLang = () => setLang(prev => prev === 'en' ? 'zh' : 'en');

  return (
    <div className={`relative min-h-screen transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#fafafa] text-black'} selection:bg-current selection:text-current overflow-x-hidden`}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader lang={lang} onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <CustomCursor lang={lang} />
      
      <div className={`fixed inset-0 z-[150] pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] ${theme === 'light' ? 'invert' : ''}`} />

      <motion.div
        className={`fixed top-0 left-0 right-0 h-[2px] z-[130] origin-left ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
        style={{ scaleX }}
      />

      <Header 
        lang={lang} 
        theme={theme} 
        onToggleLang={toggleLang} 
        onToggleTheme={toggleTheme} 
      />
      
      {/* Hero Section */}
      <section className="h-[75vh] md:h-[120vh] flex flex-col items-center justify-start pt-[35vh] md:justify-center md:pt-0 px-12 pointer-events-none relative overflow-hidden">
        <motion.div
          style={{ y: titleY }}
          initial={{ opacity: 0 }}
          animate={!isLoading ? { opacity: 1 } : {}}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center z-10 flex flex-col items-center"
        >
          {/* Main Title Container */}
          <motion.div
            animate={isBreathing ? {
              scale: [1, 1.05, 1], // Subtle global scale
            } : {
              scale: 1,
            }}
            transition={{
              duration: isBreathing ? 2.5 : 0.5,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center relative"
          >
            {/* 
              We pass the styling classes INTO the component so it can manipulate them.
              font-serif is the base state. The component will swap to font-mono randomly.
            */}
            <GlitchText 
              text={t.heroTitle}
              enableGlitch={isBreathing} 
              className="text-[10vw] md:text-[12vw] font-serif font-light leading-[0.85] tracking-tighter text-current uppercase"
            />
          </motion.div>
          
          {/* Subtitle */}
          {t.subtitle && (
            <motion.div 
              style={{ x: subtitleX }}
              className="mt-[2vw]"
            >
              <GlitchText 
                text={t.subtitle}
                enableGlitch={isBreathing}
                className="text-[5vw] md:text-[6vw] font-serif font-light leading-[0.8] italic tracking-[0.2em] text-current block opacity-80"
              />
            </motion.div>
          )}
        </motion.div>
      </section>

      <Gallery 
        onSelect={(item) => setSelectedItem(item)} 
        selectedId={selectedItem?.id ?? null} 
        lang={lang}
      />

      <SearchSection lang={lang} />
      
      <Footer lang={lang} />

      <MusicPlayer lang={lang} theme={theme} allowAutoplay={!isLoading} />

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center cursor-none p-4 md:p-12 lg:p-24 overflow-hidden"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              className={`absolute inset-0 backdrop-blur-3xl ${theme === 'dark' ? 'bg-[#050505]/98' : 'bg-[#fafafa]/98'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
              <motion.div
                layoutId={`image-container-${selectedItem.id}`}
                className={`relative w-full h-full max-h-[70vh] flex items-center justify-center pointer-events-auto overflow-hidden border ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              >
                <motion.img
                  layoutId={`image-${selectedItem.id}`}
                  src={selectedItem.url}
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 text-center text-current"
              >
                {selectedItem.date && (
                  <h2 className="text-3xl md:text-5xl font-mono mb-4 tracking-tighter opacity-90">
                    {selectedItem.date}
                  </h2>
                )}
                
                <div className="flex items-center justify-center gap-6 opacity-40">
                  {selectedItem.location && (
                    <>
                      <span className="text-[10px] uppercase tracking-[0.4em]">{lang === 'en' ? selectedItem.location : selectedItem.locationZh}</span>
                      <div className="w-8 h-[1px] bg-current" />
                    </>
                  )}
                  <span className="text-[10px] uppercase tracking-[0.4em]">REF_30_{selectedItem.id.split('-')[1]}</span>
                </div>
              </motion.div>
              
              <button className="absolute top-12 right-12 text-[9px] uppercase tracking-[0.6em] opacity-40 hover:opacity-100 transition-opacity text-current">
                [ {t.close} ]
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`fixed inset-0 pointer-events-none z-40 opacity-[0.03] ${theme === 'light' ? 'invert' : ''}`}>
        <div className="w-full h-full border-x border-current grid grid-cols-6 md:grid-cols-12 divide-x divide-current">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full border-b border-current" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
