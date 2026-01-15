
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GalleryItem } from '../types';
import { Language } from '../constants/translations';

interface ImageCardProps {
  item: GalleryItem;
  onSelect: () => void;
  isHidden: boolean;
  lang: Language;
  index: number;
  columnIndex: number;
  totalColumns: number;
}

const ImageCard: React.FC<ImageCardProps> = ({ item, onSelect, isHidden, lang, index, columnIndex, totalColumns }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Vertical Parallax
  const y = useTransform(scrollYProgress, [0, 1], [60 * item.parallaxFactor, -60 * item.parallaxFactor]);
  
  // Depth scaling
  const z = useTransform(scrollYProgress, [0, 1], [-300 * item.depth, -50 * item.depth]);
  
  // Dynamic Rotation Logic
  // If 2 columns: Book fold style (Left tilts R, Right tilts L)
  // If 4 columns: Panoramic curve (0->RR, 1->R, 2->L, 3->LL)
  let baseRotateY = 0;
  
  if (totalColumns === 2) {
    baseRotateY = columnIndex === 0 ? 8 : -8;
  } else {
    // 4 Columns: Create a gentle arc
    // Col 0: 12deg (Face Right strongly)
    // Col 1: 5deg (Face Right gently)
    // Col 2: -5deg (Face Left gently)
    // Col 3: -12deg (Face Left strongly)
    if (columnIndex === 0) baseRotateY = 12;
    else if (columnIndex === 1) baseRotateY = 5;
    else if (columnIndex === 2) baseRotateY = -5;
    else if (columnIndex === 3) baseRotateY = -12;
  }

  const rotateY = useTransform(scrollYProgress, [0, 1], [baseRotateY * 1.2, baseRotateY * 0.8]);

  // Slight X-axis rotation for vertical perspective
  const rotateX = useTransform(scrollYProgress, [0, 1], [5 * item.parallaxFactor, -5 * item.parallaxFactor]);

  const displayIndex = (index + 1).toString().padStart(2, '0');

  return (
    <div 
      ref={containerRef}
      className="relative w-full group mb-6 md:mb-16 lg:mb-24"
      style={{ 
        perspective: '2000px',
        zIndex: Math.floor((3 - item.depth) * 100)
      }}
    >
      <motion.div
        style={{ 
          y,
          rotateX,
          rotateY,
          z,
          opacity: isHidden ? 0 : 1,
          transformStyle: 'preserve-3d'
        }}
        onClick={onSelect}
        className="relative w-full cursor-none will-change-transform"
      >
        {/* Technical Label - Top - Adjusted for mobile compactness */}
        <div className="absolute top-[-16px] md:top-[-20px] left-0 flex justify-between w-full text-[6px] md:text-[8px] uppercase tracking-[0.4em] opacity-30 font-medium text-current">
          <span>{displayIndex} / 60</span>
          <span className="font-mono">REC_SYS_30</span>
        </div>

        {/* Image Frame */}
        <motion.div 
          layoutId={`image-container-${item.id}`}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full p-1 md:p-1.5 border border-current/10 group-hover:border-current/30 transition-colors duration-1000 shadow-2xl"
        >
          <div className="overflow-hidden bg-current/5">
            <motion.img 
              layoutId={`image-${item.id}`}
              src={item.url} 
              alt={item.title || "Untitled Perspective"}
              onLoad={() => setIsLoaded(true)}
              loading="lazy"
              className={`w-full h-auto object-contain grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-out block will-change-transform ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
          
          <div className="absolute top-0 left-0 w-1 md:w-1.5 h-1 md:h-1.5 border-t border-l border-current/30" />
          <div className="absolute top-0 right-0 w-1 md:w-1.5 h-1 md:h-1.5 border-t border-r border-current/30" />
          <div className="absolute bottom-0 left-0 w-1 md:w-1.5 h-1 md:h-1.5 border-b border-l border-current/30" />
          <div className="absolute bottom-0 right-0 w-1 md:w-1.5 h-1 md:h-1.5 border-b border-r border-current/30" />
        </motion.div>

        {/* Info Box - Bottom */}
        <div className="mt-2 md:mt-4 flex flex-col gap-0.5 md:gap-1">
          {item.date && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              className="text-[10px] md:text-[12px] font-mono tracking-widest text-current"
            >
              {item.date}
            </motion.div>
          )}
          
          {item.location && (
            <>
              <div className="w-2 md:w-4 h-[1px] bg-current/20 group-hover:w-full transition-all duration-1000" />
              <div className="text-[6px] md:text-[8px] uppercase tracking-[0.4em] opacity-30 group-hover:opacity-60 transition-opacity truncate text-current">
                {lang === 'en' ? item.location : item.locationZh}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ImageCard;
