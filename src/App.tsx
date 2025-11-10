import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { CreativeServices } from './components/CreativeServices';
import { MarketingServices } from './components/MarketingServices';
import { OurWorkSection } from './components/OurWorkSection';
import { ContactSection } from './components/ContactSection';
import { ProposalModal } from './components/ProposalModal';
import { Footer } from './components/Footer';
import { FloatingNav } from './components/FloatingNav';
import { DesktopNav } from './components/DesktopNav';
import { SectionDivider } from './components/SectionDivider';
import { CustomCursor } from './components/CustomCursor';
import { LanguageProvider } from './components/LanguageContext';

export default function App() {
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0A0A0A] overflow-x-hidden relative">
      {/* Noise texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
      
      <CustomCursor />
      <DesktopNav />
      <FloatingNav />
      <SectionDivider />
      <main className="relative flex flex-col gap-20 md:gap-28 lg:gap-32">
        <HeroSection />
        <CreativeServices />
        <MarketingServices />
        <OurWorkSection />
        <ContactSection onOpenProposal={() => setIsProposalModalOpen(true)} />
        <Footer />
      </main>

      {/* Proposal Modal */}
      <ProposalModal 
        isOpen={isProposalModalOpen} 
        onClose={() => setIsProposalModalOpen(false)} 
      />
    </div>
    </LanguageProvider>
  );
}