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
        <div className="px-4 pt-4 pb-0 relative min-h-[60px] flex items-center justify-between -mb-20 md:mb-0">
          {/* Logo - Left side, no outline */}
          <motion.div
            className="flex items-center cursor-pointer z-[101]"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileTap={{ scale: 0.95 }}
          >
            <div 
              className="h-6 w-[120px] flex-shrink-0"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                maxWidth: '120px',
                maxHeight: '24px',
                overflow: 'hidden'
              }}
            >
              <Logo />
            </div>
          </motion.div>
          
          {/* Language Switcher - Right side with outline */}
          <motion.button
            onClick={() => setLanguage(language === 'en' ? 'bs' : 'en')}
            className="relative group flex items-center justify-center backdrop-blur-sm z-10"
            style={{
              width: '40px',
              height: '40px',
              minWidth: '40px',
              minHeight: '40px',
              padding: 0,
              borderRadius: '50%',
              border: '2px solid rgba(179, 193, 154, 0.4)',
              boxSizing: 'border-box'
            }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <Globe 
              className="w-4 h-4 flex-shrink-0" 
              style={{ color: '#B3C19A' }}
              strokeWidth={2}
            />
          </motion.button>
        </div>
        
      </motion.nav>
    </>
  );
}
