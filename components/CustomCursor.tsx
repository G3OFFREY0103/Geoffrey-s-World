
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { translations, Language } from '../constants/translations';

const CustomCursor: React.FC<{ lang: Language }> = ({ lang }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const t = translations[lang];

  const springX = useSpring(0, { stiffness: 200, damping: 25 });
  const springY = useSpring(0, { stiffness: 200, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.group') || target.tagName === 'BUTTON' || target.tagName === 'A') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [springX, springY]);

  return (
    <motion.div
      style={{
        left: springX,
        top: springY,
        x: '-50%',
        y: '-50%',
      }}
      className="fixed z-[160] pointer-events-none hidden md:flex items-center justify-center"
    >
      <motion.div
        animate={{
          scale: isHovering ? 4 : 1,
          backgroundColor: isHovering ? 'rgba(128, 128, 128, 1)' : 'rgba(128, 128, 128, 0)',
          border: isHovering ? 'none' : '1px solid currentColor'
        }}
        className="w-3 h-3 rounded-full mix-blend-difference"
      />
      {isHovering && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute text-[3px] uppercase tracking-tighter text-white font-bold whitespace-nowrap"
        >
          {t.view}
        </motion.span>
      )}
    </motion.div>
  );
};

export default CustomCursor;
