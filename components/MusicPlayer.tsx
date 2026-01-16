
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SONGS } from '../constants/songs';
import { translations, Theme, Language } from '../constants/translations';

interface MusicPlayerProps {
  lang: Language;
  theme: Theme;
  allowAutoplay: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ lang, theme, allowAutoplay }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Initial state: Random song index
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * SONGS.length));
  // Initial state: isPlaying starts false, we wait for allowAutoplay
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const t = translations[lang];

  // Effect: Initialize Audio
  useEffect(() => {
    // Initialize audio with the initially selected random song
    // Optimization: Create audio object and force preload
    const audio = new Audio();
    audio.src = SONGS[currentIndex].url;
    audio.volume = 0.5;
    audio.preload = 'auto'; // Tell browser to download immediately
    
    audioRef.current = audio;
    
    // Explicitly call load() to start buffering immediately when component mounts
    // This happens while Preloader is still visible
    audio.load();
    
    const handleEnded = () => {
       nextTrack();
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
    };
  }, []); // Runs once on mount

  // Effect: Trigger Autoplay when Preloader finishes (allowAutoplay becomes true)
  useEffect(() => {
    if (allowAutoplay && !isPlaying) {
      setIsPlaying(true);
    }
  }, [allowAutoplay]);

  // Handle Play/Pause State
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Even with our Preloader hack, browsers are strict.
            // If this fails, we just silently fallback to paused state.
            console.log("Autoplay check:", error);
            setIsPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle Track Changes
  useEffect(() => {
    if (audioRef.current) {
      // Only change src if it's different to prevent reloading on mount (since init effect already set it)
      if (audioRef.current.src !== SONGS[currentIndex].url) {
        const wasPlaying = isPlaying;
        audioRef.current.src = SONGS[currentIndex].url;
        audioRef.current.preload = 'auto'; // Optimization for next tracks
        audioRef.current.load(); // Optimization force load
        
        if (wasPlaying) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
             playPromise.catch(error => {
               console.warn("Playback failed on track change:", error);
               setIsPlaying(false);
             });
          }
        }
      }
    }
  }, [currentIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentIndex((prev) => (prev + 1) % SONGS.length);
    if (!isPlaying) setIsPlaying(true);
  };

  const currentSong = SONGS[currentIndex];

  return (
    <div className="fixed bottom-8 right-8 z-[140] pointer-events-auto flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`p-6 rounded-none border backdrop-blur-xl w-[280px] md:w-[320px] shadow-2xl ${
              theme === 'dark' 
                ? 'bg-black/60 border-white/10 text-white' 
                : 'bg-white/60 border-black/10 text-black'
            }`}
          >
            {/* Player UI */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.3em] opacity-40">
                    {t.playerMusic}
                  </span>
                  <div className="flex gap-1">
                     <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                     <span className="text-[9px] font-mono opacity-40">LIVE</span>
                  </div>
                </div>
                
                <div className="overflow-hidden mt-1">
                  <motion.div 
                    key={currentSong.title}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="font-serif text-2xl italic truncate leading-none"
                  >
                    {currentSong.title}
                  </motion.div>
                </div>
                <motion.div 
                  key={currentSong.artist}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  className="text-[10px] font-mono uppercase tracking-widest border-l-2 border-current pl-2"
                >
                  {currentSong.artist}
                </motion.div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-current/10">
                <button 
                  onClick={togglePlay}
                  className={`w-12 h-12 flex items-center justify-center border rounded-full transition-all duration-300 ${
                    theme === 'dark' ? 'border-white/20 hover:bg-white hover:text-black' : 'border-black/20 hover:bg-black hover:text-white'
                  }`}
                >
                  {isPlaying ? (
                     <div className="flex gap-1">
                       <div className="w-0.5 h-3 bg-current" />
                       <div className="w-0.5 h-3 bg-current" />
                     </div>
                  ) : (
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="ml-0.5">
                      <path d="M0 0L10 6L0 12V0Z" fill="currentColor"/>
                    </svg>
                  )}
                </button>

                <div className="flex-1 px-6">
                   {/* Audio Visualizer Simulation */}
                  <div className="flex items-end justify-center gap-1 h-8 opacity-40">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          height: isPlaying ? [4, Math.random() * 24 + 4, 4] : 2 
                        }}
                        transition={{ 
                          duration: 0.4, 
                          repeat: Infinity, 
                          delay: i * 0.05,
                          ease: "easeInOut" 
                        }}
                        className="w-0.5 bg-current"
                      />
                    ))}
                  </div>
                </div>

                <button 
                  onClick={nextTrack}
                  className="text-[10px] uppercase tracking-[0.2em] hover:opacity-50 transition-opacity font-mono"
                >
                  {t.playerNext} {'->'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 flex items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500 group relative overflow-hidden ${
          theme === 'dark' 
            ? 'border-white/10 bg-black/40 text-white hover:border-white/40' 
            : 'border-black/10 bg-white/40 text-black hover:border-black/40'
        }`}
      >
         <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className={`absolute inset-[3px] rounded-full border border-dashed border-current/30 ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity`}
         />
        
        {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
        ) : (
             <div className="flex gap-[3px] items-end">
               <motion.div animate={{ height: isPlaying ? [4, 10, 6] : 4 }} transition={{ repeat: Infinity, duration: 1 }} className="w-[2px] bg-current" />
               <motion.div animate={{ height: isPlaying ? [8, 4, 10] : 6 }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-[2px] bg-current" />
               <motion.div animate={{ height: isPlaying ? [5, 12, 4] : 5 }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-[2px] bg-current" />
             </div>
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;
