import { motion } from 'motion/react';
import { Globe } from 'lucide-react';
import Logo from '../imports/Logo';
import { useLanguage } from './LanguageContext';

export function DesktopNav() {
  const { language, setLanguage } = useLanguage();

  return (
    <>
      {/* Mobile Navigation - Always visible on mobile */}
      <motion.nav
        className="md:hidden relative z-[100]"
        initial={false}
      >
        <div className="px-4 pt-4 pb-0 relative min-h-[60px] flex items-center -mb-20 md:mb-0">
          {/* Logo - Center with pill outline */}
          <motion.div
            className="flex-1 flex items-center justify-center cursor-pointer z-[101] mr-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileTap={{ scale: 0.95 }}
          >
            <div className="px-6 py-2 rounded-full border-2 border-[#B3C19A]/40 backdrop-blur-sm w-full flex items-center justify-center">
              <div className="h-6 w-[120px] flex-shrink-0">
                <Logo />
              </div>
            </div>
          </motion.div>
          
          <div className="flex items-center justify-end relative z-10">

            {/* Language Switcher - Right side */}
            <motion.button
              onClick={() => setLanguage(language === 'en' ? 'bs' : 'en')}
              className="relative group flex items-center justify-center px-3 py-2 rounded-full backdrop-blur-sm z-10 h-[40px]"
              whileTap={{ scale: 0.95 }}
            >
              <Globe 
                className="w-4 h-4" 
                style={{ color: '#B3C19A' }}
                strokeWidth={2}
              />
            </motion.button>
          </div>
        </div>
        
      </motion.nav>
    </>
  );
}
