
import React, { useMemo, useState, useEffect } from 'react';
import { GalleryItem } from '../types';
import { GALLERY_IMAGES } from '../constants/images';
import ImageCard from './ImageCard';
import { Language } from '../constants/translations';

interface GalleryProps {
  onSelect: (item: GalleryItem) => void;
  selectedId: string | null;
  lang: Language;
}

const Gallery: React.FC<GalleryProps> = ({ onSelect, selectedId, lang }) => {
  // Default to 2 columns (mobile first strategy to match SSR/initial render safely)
  // We'll update this in useEffect for desktop
  const [columnCount, setColumnCount] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      // Tailwind 'md' breakpoint is usually 768px
      setColumnCount(window.innerWidth >= 768 ? 4 : 2);
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const items = useMemo(() => {
    return GALLERY_IMAGES.map((img, i) => {
      // Varies depth and parallax based on randomness rather than strict column logic
      // to keep it organic regardless of column count
      const depth = 0.2 + Math.random() * 0.6; 
      const parallaxFactor = 0.5 + Math.random() * 0.7;

      return {
        ...img,
        id: `img-${i}`,
        depth,
        parallaxFactor,
      };
    });
  }, []);

  // Distribute items into columns
  const columns = useMemo(() => {
    const cols: GalleryItem[][] = Array.from({ length: columnCount }, () => []);
    items.forEach((item, i) => {
      cols[i % columnCount].push(item);
    });
    return cols;
  }, [items, columnCount]);

  // Define organic top offsets for each column to create the waterfall effect
  const getColumnOffset = (index: number) => {
    if (columnCount === 2) {
      // Mobile: Column 1 starts lower
      return index === 1 ? 'pt-[5vh]' : 'pt-0';
    } else {
      // Desktop (4 columns): Organic staggering
      // Col 0: 0
      // Col 1: 15vh
      // Col 2: 5vh
      // Col 3: 20vh
      switch (index) {
        case 0: return 'pt-0';
        case 1: return 'pt-[15vh]';
        case 2: return 'pt-[5vh]';
        case 3: return 'pt-[20vh]';
        default: return 'pt-0';
      }
    }
  };

  return (
    <main className="relative z-10 pt-0 md:pt-[10vh] pb-[60vh] px-2 md:px-12 lg:px-20">
      <div 
        className={`grid gap-3 md:gap-8 lg:gap-12 max-w-[2400px] mx-auto items-start transition-all duration-500`}
        style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
      >
        {columns.map((colItems, colIndex) => (
          <div 
            key={colIndex} 
            className={`flex flex-col border-l border-white/5 pl-2 md:pl-6 ${getColumnOffset(colIndex)} transition-all duration-700`}
          >
            {colItems.map((item, itemIndex) => (
              <ImageCard 
                key={item.id} 
                item={item} 
                onSelect={() => onSelect(item)} 
                isHidden={selectedId === item.id} 
                lang={lang}
                index={items.indexOf(item)} // Pass original global index
                columnIndex={colIndex}
                totalColumns={columnCount}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="fixed inset-0 flex items-center justify-center pointer-events-none -z-10 opacity-[0.05]">
        <h2 
          className="text-[40vw] font-serif italic select-none leading-none tracking-tighter mix-blend-diff text-transparent"
          style={{ WebkitTextStroke: '1px currentColor' }}
        >
          30
        </h2>
      </div>
    </main>
  );
};

export default Gallery;
