
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PEOPLE_DATA } from '../constants/people';
import { Language, translations } from '../constants/translations';

interface SearchSectionProps {
  lang: Language;
}

const SearchSection: React.FC<SearchSectionProps> = ({ lang }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const t = translations[lang];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const allPeople = PEOPLE_DATA.flatMap(cat => cat.people);
    return allPeople.filter(p => 
      p.name.toLowerCase().includes(query.trim().toLowerCase())
    );
  }, [query]);

  return (
    <section className="relative z-20 w-full py-32 px-8 md:px-24 border-t border-current/5">
      <div className="max-w-4xl mx-auto flex flex-col items-start">
        
        {/* Label */}
        <div className="mb-12 flex items-center gap-4 opacity-40">
           <div className="w-8 h-[1px] bg-current" />
           <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
             {t.searchLabel}
           </span>
        </div>

        {/* Input Area */}
        <div className="relative w-full group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-transparent border-b border-current/20 py-4 text-2xl md:text-4xl font-serif font-light outline-none text-current placeholder-current/20 focus:border-current/60 transition-colors duration-500"
          />
          <motion.div 
            className="absolute bottom-0 left-0 h-[1px] bg-current"
            initial={{ width: 0 }}
            animate={{ width: isFocused ? '100%' : '0%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Results Area */}
        <div className="w-full mt-16 min-h-[200px]">
          <AnimatePresence mode="wait">
            {query ? (
              results.length > 0 ? (
                // Match Found - Render background as is (no translation)
                <div className="flex flex-col gap-12">
                  {results.map((person, index) => (
                    <motion.div
                      key={`${person.name}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex flex-col md:flex-row gap-4 md:gap-12 items-baseline border-l border-current/10 pl-6"
                    >
                      <div className="shrink-0 text-[10px] uppercase tracking-[0.2em] opacity-50 font-mono mt-1">
                        {person.name}
                      </div>
                      <div className="text-lg md:text-xl font-serif leading-relaxed italic opacity-90">
                        {person.background}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                // No Match - Localized Fallback Message
                <motion.div
                  key="fallback"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col md:flex-row gap-4 md:gap-12 items-baseline border-l border-current/10 pl-6"
                >
                  <div className="shrink-0 text-[10px] uppercase tracking-[0.2em] opacity-50 font-mono mt-1">
                    {t.searchMessageLabel}
                  </div>
                  <div className="text-lg md:text-xl font-serif leading-relaxed italic opacity-90">
                    {t.searchFallback}
                  </div>
                </motion.div>
              )
            ) : null}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default SearchSection;
