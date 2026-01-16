
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const GLYPHS = '01_[]/X*&|ΔΣΘΦΨΩαβγδεζηθικλμνξοπρστυφχψω';
const COLORS = [
  '#ffffff', '#ffffff', '#ffffff', '#ffffff', // High weight for white
  '#ff0055', // Cyber Red
  '#00f0ff', // Cyber Cyan
  '#ccff00'  // Cyber Yellow
];

interface GlitchCharProps {
  char: string;
  enableGlitch: boolean;
  baseClassName?: string;
  mouseX: any; // MotionValue<number>
  mouseY: any; // MotionValue<number>
}

const GlitchChar: React.FC<GlitchCharProps> = ({ char, enableGlitch, baseClassName, mouseX, mouseY }) => {
  const [displayChar, setDisplayChar] = useState(char);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [className, setClassName] = useState(baseClassName || '');
  const ref = useRef<HTMLSpanElement>(null);
  
  // Physics state
  // Store center position in a ref to access it inside useTransform without triggering re-renders
  const centerRef = useRef({ x: 0, y: 0 });

  // Update position on mount, resize, and scroll (debounced/throttled conceptually by usage)
  // We use a simple listener here. For a production app with hundreds of chars, we'd use a shared observer.
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

  // Physics Logic
  // Calculate distance and direction from mouse to char center
  const physicsX = useTransform([mouseX, mouseY], ([mx, my]) => {
    const cx = centerRef.current.x;
    const cy = centerRef.current.y;
    const dx = cx - (mx as number);
    const dy = cy - (my as number);
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    const radius = 250; // Increased radius to detect mouse earlier
    if (dist < radius) {
      const force = (radius - dist) / radius; // 0 to 1 (1 is center)
      // Explode OUTWARDS.
      const strength = 800; // Drastically increased strength for "Explosion"
      return dx * force * force * (strength / radius) * 8; 
    }
    return 0;
  });

  const physicsY = useTransform([mouseX, mouseY], ([mx, my]) => {
    const cx = centerRef.current.x;
    const cy = centerRef.current.y;
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
  
  // Increased rotation for more chaos
  const physicsRotate = useTransform(physicsX, (val) => (val as number) * 0.4);

  // Smooth out the physics with a spring
  // Reduced stiffness for slower return (floatier feel)
  const springConfig = { stiffness: 80, damping: 15, mass: 1.2 };
  const x = useSpring(physicsX, springConfig);
  const y = useSpring(physicsY, springConfig);
  const rotate = useSpring(physicsRotate, springConfig);

  // Glitch Effect Logic
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
        // Removed transform from here to let physics control position
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
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
        />
      ))}
    </span>
  );
};

export default GlitchText;
