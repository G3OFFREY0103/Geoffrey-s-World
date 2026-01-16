
import React from 'react';
import { translations, Language } from '../constants/translations';

const Footer: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  return (
    <footer className="relative z-20 w-full py-24 px-8 md:px-24 bg-current/5 border-t border-current/10">
      <div className="flex flex-col md:flex-row justify-between items-end gap-16">
        <div className="max-w-2xl">
          <p className="text-xl md:text-2xl font-serif font-light leading-relaxed max-w-xl">
            {t.footerText}
          </p>
        </div>
        
        <div className="text-right">
          {/* 
            Fixed the error: "This comparison appears to be unintentional because the types '"en"' and '"zh"' have no overlap."
            by using the translated locationLabel from our translation object.
          */}
          <div className="text-[9px] uppercase tracking-[0.3em] opacity-40 mb-3">{t.locationLabel}</div>
          <div className="text-2xl font-serif">{t.established}</div>
        </div>
      </div>
      
      <div className="mt-20 flex justify-between text-[9px] uppercase tracking-widest opacity-30">
        <p>© 2026 GEOFFREY'S WORLD</p>
        <p>{t.built}</p>
      </div>
    </footer>
  );
};

export default Footer;
