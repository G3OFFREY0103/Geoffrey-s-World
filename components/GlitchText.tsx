
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GLYPHS = '01_[]/X*&|ΔΣΘΦΨΩαβγδεζηθικλμνξοπρστυφχψω';

const GlitchLetter: React.FC<{ char: string; enableGlitch: boolean }> = ({ char, enableGlitch }) => {
  const [displayChar, setDisplayChar] = useState(char);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let timeoutId: any;
    let cycleInterval: any;
    
    const triggerGlitch = () => {
      // If globally disabled, stop.
      if (!enableGlitch) return;

      // Randomly decide when to glitch (between 2 to 7 seconds)
      const nextGlitch = Math.random() * 5000 + 2000;
      
      timeoutId = setTimeout(() => {
        // Double check if still enabled before starting glitch sequence
        if (!enableGlitch) return;

        setIsGlitching(true);
        
        // Rapidly cycle characters during glitch duration (150-400ms)
        const glitchDuration = Math.random() * 250 + 150;
        cycleInterval = setInterval(() => {
          setDisplayChar(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
        }, 40);

        setTimeout(() => {
          clearInterval(cycleInterval);
          setDisplayChar(char);
          setIsGlitching(false);
          // Recursively trigger next glitch if still enabled
          if (enableGlitch) triggerGlitch();
        }, glitchDuration);
        
      }, nextGlitch);
    };

    if (char !== ' ') {
      if (enableGlitch) {
        triggerGlitch();
      } else {
        // Reset if disabled
        setDisplayChar(char);
        setIsGlitching(false);
      }
    }
    
    return () => {
      clearTimeout(timeoutId);
      clearInterval(cycleInterval);
    };
  }, [char, enableGlitch]);

  return (
    <motion.span
      className="inline-block relative"
      animate={isGlitching ? {
        x: [0, -2, 2, -1, 0],
        opacity: [1, 0.7, 1, 0.8, 1],
        filter: ['blur(0px)', 'blur(2px)', 'blur(0px)']
      } : {}}
      transition={{ duration: 0.2, repeat: isGlitching ? Infinity : 0 }}
    >
      {displayChar}
      {isGlitching && (
        <motion.span 
          className="absolute inset-0 opacity-30 select-none pointer-events-none"
          animate={{ x: [-5, 5, 0], y: [2, -2, 0] }}
          transition={{ duration: 0.1, repeat: Infinity }}
        >
          {displayChar}
        </motion.span>
      )}
    </motion.span>
  );
};

interface GlitchTextProps {
  text: string;
  className?: string;
  enableGlitch?: boolean;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className, enableGlitch = true }) => {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <GlitchLetter key={`${char}-${i}`} char={char} enableGlitch={enableGlitch} />
      ))}
    </span>
  );
};

export default GlitchText;
