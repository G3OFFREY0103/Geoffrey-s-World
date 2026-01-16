
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const GLYPHS = '01_[]/X*&|ΔΣΘΦΨΩαβγδεζηθικλμνξοπρστυφχψω';
const COLORS = [
  '#ffffff', '#ffffff', '#ffffff', '#ffffff', 
  '#ff0055', 
  '#00f0ff', 
  '#ccff00'  
];

interface GlitchCharProps {
  char: string;
  enableGlitch: boolean;
  baseClassName?: string;
  mouseX: any; 
  mouseY: any;
  isTouchDevice: boolean;
}

const GlitchChar: React.FC<GlitchCharProps> = ({ char, enableGlitch, baseClassName, mouseX, mouseY, isTouchDevice }) => {
  const [displayChar, setDisplayChar] = useState(char);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [className, setClassName] = useState(baseClassName || '');
  const ref = useRef<HTMLSpanElement>(null);
  const centerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        centerRef.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, { capture: true, passive: true });
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);

  const physicsX = useTransform([mouseX, mouseY], ([mx, my]) => {
    // Strictly disable on touch/mobile
    if (isTouchDevice) return 0;
    
    const cx = centerRef.current.x;
    const cy = centerRef.current.y;
    
    // If mouse is default far away, skip calc
    if ((mx as number) < -5000) return 0;

    const dx = cx - (mx as number);
    const dy = cy - (my as number);
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    const radius = 250; 
    if (dist < radius) {
      const force = (radius - dist) / radius;
      const strength = 800;
      return dx * force * force * (strength / radius) * 8; 
    }
    return 0;
  });

  const physicsY = useTransform([mouseX, mouseY], ([mx, my]) => {
    // Strictly disable on touch/mobile
    if (isTouchDevice) return 0;

    const cx = centerRef.current.x;
    const cy = centerRef.current.y;

    // If mouse is default far away, skip calc
    if ((mx as number) < -5000) return 0;

    const dx = cx - (mx as number);
    const dy = cy - (my as number);
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    const radius = 250;
    if (dist < radius) {
      const force = (radius - dist) / radius;
      const strength = 800;
      return dy * force * force * (strength / radius) * 8;
    }
    return 0;
  });
  
  const physicsRotate = useTransform(physicsX, (val) => (val as number) * 0.4);

  const springConfig = { stiffness: 80, damping: 15, mass: 1.2 };
  const x = useSpring(physicsX, springConfig);
  const y = useSpring(physicsY, springConfig);
  const rotate = useSpring(physicsRotate, springConfig);

  const originalState = useRef({
    char,
    style: {},
    className: baseClassName || ''
  });

  useEffect(() => {
    let timeoutId: any;
    
    const chaoticUpdate = () => {
      if (!enableGlitch) return;

      const shouldSwapChar = Math.random() > 0.7;
      const newChar = shouldSwapChar ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : char;
      const newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      const blurAmount = Math.random() > 0.8 ? Math.random() * 4 : 0;
      const isStroke = Math.random() > 0.85;

      const newStyle: React.CSSProperties = {
        color: isStroke ? 'transparent' : newColor,
        WebkitTextStroke: isStroke ? `1px ${newColor}` : 'unset',
        filter: `blur(${blurAmount}px)`,
      };

      const isMono = Math.random() > 0.7;
      const isItalic = Math.random() > 0.6;
      const isBold = Math.random() > 0.6;
      
      let newClass = baseClassName || '';
      if (isMono) newClass = newClass.replace('font-serif', 'font-mono');
      if (isItalic) newClass += ' italic';
      if (isBold) newClass += ' font-bold';

      setDisplayChar(newChar);
      setStyle(newStyle);
      setClassName(newClass);

      timeoutId = setTimeout(chaoticUpdate, Math.random() * 200 + 50);
    };

    if (enableGlitch) {
      chaoticUpdate();
    } else {
      setDisplayChar(originalState.current.char);
      setStyle(originalState.current.style);
      setClassName(originalState.current.className);
    }

    return () => clearTimeout(timeoutId);
  }, [char, enableGlitch, baseClassName]);

  if (char === ' ') return <span className="inline-block w-[0.2em]">&nbsp;</span>;
  if (char === '\n') return <br />;

  return (
    <motion.span
      ref={ref}
      style={{ x, y, rotate, display: 'inline-block', transformOrigin: 'center' }}
      className="relative"
    >
      <span className={`inline-block transition-colors duration-100 ${className}`} style={style}>
        {displayChar}
      </span>
    </motion.span>
  );
};

interface GlitchTextProps {
  text: string;
  className?: string;
  enableGlitch?: boolean;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className, enableGlitch = true }) => {
  // Initialize very far away to ensure no physics interaction by default
  const mouseX = useMotionValue(-10000);
  const mouseY = useMotionValue(-10000);
  
  // Default to false, but we'll set it immediately in effect
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      // Robust detection: < 1024px (Tablets/Mobile) OR Coarse Pointer
      const isSmallScreen = window.innerWidth < 1024;
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      
      const isMobile = isSmallScreen || isCoarse;
      setIsTouch(isMobile);
      
      // If mobile, ensure mouse values are reset to non-interacting values
      if (isMobile) {
        mouseX.set(-10000);
        mouseY.set(-10000);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    const handleMouseMove = (e: MouseEvent) => {
      // Re-check condition to be safe inside the listener
      if (window.innerWidth >= 1024 && !window.matchMedia('(pointer: coarse)').matches) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <span className="inline-block whitespace-pre-wrap text-center">
      {text.split('').map((char, i) => (
        <GlitchChar 
          key={`${i}-${char}`} 
          char={char} 
          enableGlitch={enableGlitch}
          baseClassName={className}
          mouseX={mouseX}
          mouseY={mouseY}
          isTouchDevice={isTouch}
        />
      ))}
    </span>
  );
};

export default GlitchText;
