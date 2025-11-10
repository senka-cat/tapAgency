import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'bs';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.creative': 'Creative',
    'nav.marketing': 'Marketing',
    'nav.insights': 'Insights',
    'nav.contact': 'Contact',
    'nav.letsTalk': "Let's Talk",
    
    // Our Work
    'ourWork.titleLine1': 'Latest from',
    'ourWork.titleLine2': 'Tap',
    'ourWork.description': 'A rotating showcase of the campaigns, storyboards, and motion pieces our studio is polishing right now.',
    'ourWork.tabs.static.title': 'Static Creatives',
    'ourWork.tabs.static.description': 'High-impact key visuals, print layouts, and social stills built for scroll-stopping clarity.',
    'ourWork.tabs.animated.title': 'Animated Creatives',
    'ourWork.tabs.animated.description': 'Looping motion spots and animated assets designed for reels, stories, and paid placements.',
    'ourWork.tabs.video.title': 'Video Creatives',
    'ourWork.tabs.video.description': 'Full-length edits, hero films, and campaign case studies blending storytelling with performance.',
    'ourWork.comingSoon.title': 'Assets coming soon',
    'ourWork.comingSoon.subtitle': 'We are curating the freshest pieces for this format. Check back shortly for new uploads.',
    'ourWork.sectionTitle': 'OUR WORK',
    'ourWork.showcases.animated.detail1': 'Loop-ready vertical edits',
    'ourWork.showcases.animated.detail2': 'Storyboards tuned for reels',
    'ourWork.showcases.animated.detail3': 'Typography and motion in sync',
    'ourWork.showcases.animated.detail4': 'CTA-driven outro screens',
    'ourWork.showcases.animated.detail5': 'Optimised colour grading passes',
    'ourWork.showcases.animated.detail6': 'Sound design accents and hits',
    'ourWork.showcases.static.detail1': 'Paid social visual variations',
    'ourWork.showcases.static.detail2': 'OOH and print-ready adaptations',
    'ourWork.showcases.static.detail3': 'Conversion-focused hero graphics',
    'ourWork.showcases.static.detail4': 'Illustrated key visual concepts',
    'ourWork.showcases.static.detail5': 'Typography-led art direction',
    'ourWork.showcases.static.detail6': 'Export-ready layered deliverables',
    'ourWork.showcases.video.detail1': 'Narrative scripting and beat sheets',
    'ourWork.showcases.video.detail2': 'On-set direction and capture',
    'ourWork.showcases.video.detail3': 'Rhythm-forward editorial passes',
    'ourWork.showcases.video.detail4': 'Animated supers and captions',
    'ourWork.showcases.video.detail5': 'Music licensing and final mix',
    'ourWork.showcases.video.detail6': 'Performance cutdowns and trailers',

    // Hero Section
    'hero.badge': 'Creative Marketing Agency',
    'hero.makeIt': 'Make It',
    'hero.pop': 'POP!',
    'hero.description': "We don't do boring. From bold visuals to viral campaigns, we create brands that demand attention and deliver results.",
    'hero.seeOurWork': 'See Our Work',
    'hero.letsCollaborate': "Let's Collaborate",
    'hero.stat.projects': 'Projects',
    'hero.stat.clients': 'Happy Clients',
    'hero.stat.years': 'Years Experience',
    'hero.stat.awards': 'Awards Won',
    
    // Creative Services
    'creative.sectionTitle': 'CREATIVE SERVICES',
    'creative.brandIdentity': 'Brand Identity',
    'creative.brandIdentity.desc': 'Crafting visual identities that capture your essence and make you impossible to forget.',
    'creative.marketingStrategy': 'Marketing Strategy',
    'creative.marketingStrategy.desc': 'Developing comprehensive marketing plans that drive growth and engagement.',
    'creative.webDevelopment': 'Web Development',
    'creative.webDevelopment.desc': 'Building responsive and user-friendly websites that enhance your online presence.',
    'creative.whatWeDo': 'What We Do',
    'creative.learnMore': 'Learn More',
    'creative.showLess': 'Show Less',
    
    // Creative Service Details
    'creative.brandIdentity.detail1': 'Custom logo design & brand marks',
    'creative.brandIdentity.detail2': 'Complete visual identity systems',
    'creative.brandIdentity.detail3': 'Brand guidelines & style guides',
    'creative.brandIdentity.detail4': 'Color palette development',
    'creative.brandIdentity.detail5': 'Typography selection',
    'creative.brandIdentity.detail6': 'Brand collateral design',
    
    'creative.marketingStrategy.detail1': 'Search engine optimization (SEO)',
    'creative.marketingStrategy.detail2': 'Pay-per-click (PPC) campaigns',
    'creative.marketingStrategy.detail3': 'Content creation & distribution',
    'creative.marketingStrategy.detail4': 'Email marketing strategies',
    'creative.marketingStrategy.detail5': 'Social media marketing',
    'creative.marketingStrategy.detail6': 'Analytics & reporting',
    
    'creative.webDevelopment.detail1': 'Frontend development (HTML, CSS, JavaScript)',
    'creative.webDevelopment.detail2': 'Backend development (Node.js, Python, PHP)',
    'creative.webDevelopment.detail3': 'E-commerce platform integration',
    'creative.webDevelopment.detail4': 'Responsive design for all devices',
    'creative.webDevelopment.detail5': 'User experience (UX) design',
    'creative.webDevelopment.detail6': 'Website maintenance & support',
    
    // Marketing Services
    'marketing.sectionTitle': 'MARKETING SERVICES',
    'marketing.campaigns': 'Campaigns',
    'marketing.campaigns.desc': 'Creating bold, attention-grabbing campaigns that turn heads and drive conversions.',
    'marketing.socialMedia': 'Social Media',
    'marketing.socialMedia.desc': 'Building engaged communities with content that sparks conversation and shares.',
    'marketing.contentCreation': 'Content Creation',
    'marketing.contentCreation.desc': 'Crafting compelling stories across all mediums that resonate with your audience.',
    
    // Marketing Service Details
    'marketing.campaigns.detail1': 'Multi-channel campaign strategy',
    'marketing.campaigns.detail2': 'Creative concept development',
    'marketing.campaigns.detail3': 'Ad copywriting & design',
    'marketing.campaigns.detail4': 'Campaign management & optimization',
    'marketing.campaigns.detail5': 'A/B testing & analytics',
    'marketing.campaigns.detail6': 'Performance reporting',
    
    'marketing.socialMedia.detail1': 'Social media strategy & planning',
    'marketing.socialMedia.detail2': 'Content creation & curation',
    'marketing.socialMedia.detail3': 'Community management',
    'marketing.socialMedia.detail4': 'Influencer partnerships',
    'marketing.socialMedia.detail5': 'Social media advertising',
    'marketing.socialMedia.detail6': 'Analytics & reporting',
    
    'marketing.contentCreation.detail1': 'Blog posts & articles',
    'marketing.contentCreation.detail2': 'Video production',
    'marketing.contentCreation.detail3': 'Podcast creation',
    'marketing.contentCreation.detail4': 'Infographics & visuals',
    'marketing.contentCreation.detail5': 'Email newsletters',
    'marketing.contentCreation.detail6': 'Case studies & whitepapers',
    
    // Service Tags
    'tags.logoDesign': 'Logo Design',
    'tags.brandStrategy': 'Brand Strategy',
    'tags.styleGuides': 'Style Guides',
    'tags.seo': 'SEO',
    'tags.ppc': 'PPC',
    'tags.contentMarketing': 'Content Marketing',
    'tags.frontend': 'Frontend',
    'tags.backend': 'Backend',
    'tags.ecommerce': 'E-commerce',
    'tags.digitalAds': 'Digital Ads',
    'tags.creativeConcepts': 'Creative Concepts',
    'tags.brandActivation': 'Brand Activation',
    'tags.engagement': 'Engagement',
    'tags.growth': 'Growth',
    'tags.community': 'Community',
    'tags.storytelling': 'Storytelling',
    'tags.multimedia': 'Multimedia',
    'tags.editorial': 'Editorial',
    
    // Contact Section
    'contact.title': "Let's Create",
    'contact.subtitle': 'Something Amazing',
    'contact.description': "Ready to transform your brand? Drop us a message and let's start the conversation.",
    'contact.name': 'Your Name',
    'contact.email': 'Email Address',
    'contact.message': 'Tell us about your project',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    
    // Blog Section
    'blog.title': 'Insights',
    'blog.subtitle': '& News',
    'blog.readMore': 'Read More',
    
    // Footer
    'footer.tagline': 'Crafting bold brands with pop-art flair and strategic precision.',
    'footer.quickLinks': 'Quick Links',
    'footer.services': 'Services',
    'footer.connect': 'Connect',
    'footer.allRights': 'All rights reserved.',
    
    // Section Indicators
    'section.creative': 'CREATIVE SERVICES',
    'section.marketing': 'MARKETING SERVICES',
    'section.blog': 'INSIGHTS & NEWS',
    'section.contact': 'GET IN TOUCH',
    
    // Marketing Services (Additional)
    'marketing.socialMedia.title': 'Social Media',
    'marketing.socialMedia.fullDesc': 'Building engaged communities and creating viral content that amplifies your brand.',
    'marketing.socialMedia.detailTitle': 'What We Do',
    'marketing.contentStrategy': 'Content Strategy',
    'marketing.contentStrategy.desc': 'Strategic content planning that drives engagement and builds lasting authority.',
    'marketing.dataAnalytics': 'Data & Analytics',
    'marketing.dataAnalytics.desc': 'Turning numbers into insights with data-driven strategies that maximize ROI.',
    
    'marketing.contentStrategy.detail1': 'Content strategy development',
    'marketing.contentStrategy.detail2': 'SEO-optimized copywriting',
    'marketing.contentStrategy.detail3': 'Blog & article writing',
    'marketing.contentStrategy.detail4': 'Email marketing campaigns',
    'marketing.contentStrategy.detail5': 'Landing page optimization',
    'marketing.contentStrategy.detail6': 'Content calendar management',
    
    'marketing.dataAnalytics.detail1': 'Performance tracking & KPIs',
    'marketing.dataAnalytics.detail2': 'Google Analytics setup',
    'marketing.dataAnalytics.detail3': 'A/B testing & optimization',
    'marketing.dataAnalytics.detail4': 'Conversion rate optimization',
    'marketing.dataAnalytics.detail5': 'Custom reporting dashboards',
    'marketing.dataAnalytics.detail6': 'Data-driven recommendations',
    
    // Tags for Marketing
    'tags.instagram': 'Instagram',
    'tags.tiktok': 'TikTok',
    'tags.blogging': 'Blogging',
    'tags.copywriting': 'Copywriting',
    'tags.analytics': 'Analytics',
    'tags.abTesting': 'A/B Testing',
    'tags.roi': 'ROI',
    
    // Blog Posts
    'blog.post1.title': 'The Future of Brand Identity in 2025',
    'blog.post1.excerpt': 'Exploring how modern brands are redefining visual identity in an increasingly digital world.',
    'blog.post1.category': 'Branding',
    'blog.post2.title': 'Social Media Trends Shaping Marketing',
    'blog.post2.excerpt': 'Discover the latest social media strategies that are driving engagement and building communities.',
    'blog.post2.category': 'Marketing',
    'blog.post3.title': 'Video Production Secrets from the Pros',
    'blog.post3.excerpt': 'Learn the techniques top creators use to produce captivating video content that converts.',
    'blog.post3.category': 'Creative',
    
    // Footer
    'footer.description': 'Where bold creativity meets strategic thinking. We transform ambitious brands into unforgettable experiences.',
    'footer.services.brandIdentity': 'Brand Identity',
    'footer.services.videoProduction': 'Video Production',
    'footer.services.creativeDesign': 'Creative Design',
    'footer.services.socialMedia': 'Social Media',
    'footer.services.contentStrategy': 'Content Strategy',
    'footer.services.dataAnalytics': 'Data & Analytics',
  },
  bs: {
    // Navigation
    'nav.home': 'Početna',
    'nav.creative': 'Kreativno',
    'nav.marketing': 'Marketing',
    'nav.insights': 'Uvidi',
    'nav.contact': 'Kontakt',
    'nav.letsTalk': 'Razgovarajmo',
    
    // Our Work
    'ourWork.titleLine1': 'Najnovije iz',
    'ourWork.titleLine2': 'Tap-a',
    'ourWork.description': 'Aktuelna selekcija kampanja, storyboarda i motion radova koje naš tim trenutno usavršava.',
    'ourWork.tabs.static.title': 'Staticki Kreativi',
    'ourWork.tabs.static.description': 'Jasne key vizuale, print i social dizajne koji zaustavljaju scroll.',
    'ourWork.tabs.animated.title': 'Animirani Kreativi',
    'ourWork.tabs.animated.description': 'Loop animacije i motion spotovi kreirani za reels, story i paid kampanje.',
    'ourWork.tabs.video.title': 'Video Kreativi',
    'ourWork.tabs.video.description': 'Duža montaža, hero filmovi i case study videi koji spajaju priču i rezultate.',
    'ourWork.comingSoon.title': 'Uskoro stiže',
    'ourWork.comingSoon.subtitle': 'Upravo biramo najsvježije materijale za ovaj format. Svratite opet vrlo brzo.',
    'ourWork.sectionTitle': 'NAŠ RAD',
    'ourWork.showcases.animated.detail1': 'Vertikalne loop montaže spremne za objavu',
    'ourWork.showcases.animated.detail2': 'Storyboardovi prilagođeni za reels formate',
    'ourWork.showcases.animated.detail3': 'Tipografija i pokret u savršenoj sinhronizaciji',
    'ourWork.showcases.animated.detail4': 'Outro ekrani sa jasnim CTA porukama',
    'ourWork.showcases.animated.detail5': 'Optimizovano kolor gradiranje za svaku platformu',
    'ourWork.showcases.animated.detail6': 'Zvučni efekti i akcenti koji pojačavaju ritam',
    'ourWork.showcases.static.detail1': 'Varijacije vizuala za paid social kampanje',
    'ourWork.showcases.static.detail2': 'OOH i print adaptacije spremne za produkciju',
    'ourWork.showcases.static.detail3': 'Hero grafike fokusirane na konverziju',
    'ourWork.showcases.static.detail4': 'Ilustrovani key vizuali sa karakterom',
    'ourWork.showcases.static.detail5': 'Tipografska art direkcija za svaku platformu',
    'ourWork.showcases.static.detail6': 'Layered deliverables spremni za eksport',
    'ourWork.showcases.video.detail1': 'Scenariji i beat sheet podrška za narativ',
    'ourWork.showcases.video.detail2': 'Režija i snimanje na setu',
    'ourWork.showcases.video.detail3': 'Montaže vođene ritmom i dinamikom',
    'ourWork.showcases.video.detail4': 'Animirane titlove i caption rješenja',
    'ourWork.showcases.video.detail5': 'Licencirana muzika i finalni audio miks',
    'ourWork.showcases.video.detail6': 'Performance cutdown verzije i traileri',
 
    // Hero Section
    'hero.badge': 'Kreativna Marketing Agencija',
    'hero.makeIt': 'Učini Da',
    'hero.pop': 'PUKNE!',
    'hero.description': 'Ne radimo dosadno. Od smjelih vizuala do viralnih kampanja, kreiramo brendove koji privlače pažnju i donose rezultate.',
    'hero.seeOurWork': 'Pogledaj Naš Rad',
    'hero.letsCollaborate': 'Hajde da Sarađujemo',
    'hero.stat.projects': 'Projekata',
    'hero.stat.clients': 'Zadovoljnih Klijenata',
    'hero.stat.years': 'Godine Iskustva',
    'hero.stat.awards': 'Osvojenih Nagrada',
    
    // Creative Services
    'creative.sectionTitle': 'KREATIVNE USLUGE',
    'creative.brandIdentity': 'Brendiranje',
    'creative.brandIdentity.desc': 'Kreiramo vizuelne identitete koji hvataju vašu suštinu i čine vas nezaboravnim.',
    'creative.marketingStrategy': 'Marketing Strategija',
    'creative.marketingStrategy.desc': 'Razvijamo sveobuhvatne marketing planove koji pokreću rast i angažman.',
    'creative.webDevelopment': 'Web Razvoj',
    'creative.webDevelopment.desc': 'Gradimo responzivne i korisničke web stranice koje poboljšavaju vašu online prisutnost.',
    'creative.whatWeDo': 'Šta Radimo',
    'creative.learnMore': 'Saznaj Više',
    'creative.showLess': 'Pokaži Manje',
    
    // Creative Service Details
    'creative.brandIdentity.detail1': 'Prilagođeni dizajn logotipa i brendova',
    'creative.brandIdentity.detail2': 'Kompletni sistemi vizuelnog identiteta',
    'creative.brandIdentity.detail3': 'Smjernice brenda i stilski vodiči',
    'creative.brandIdentity.detail4': 'Razvoj palete boja',
    'creative.brandIdentity.detail5': 'Izbor tipografije',
    'creative.brandIdentity.detail6': 'Dizajn brendovanih materijala',
    
    'creative.marketingStrategy.detail1': 'Optimizacija za pretraživače (SEO)',
    'creative.marketingStrategy.detail2': 'Kampanje plaćanja po kliku (PPC)',
    'creative.marketingStrategy.detail3': 'Kreiranje i distribucija sadržaja',
    'creative.marketingStrategy.detail4': 'Email marketing strategije',
    'creative.marketingStrategy.detail5': 'Marketing društvenih mreža',
    'creative.marketingStrategy.detail6': 'Analitika i izvještavanje',
    
    'creative.webDevelopment.detail1': 'Frontend razvoj (HTML, CSS, JavaScript)',
    'creative.webDevelopment.detail2': 'Backend razvoj (Node.js, Python, PHP)',
    'creative.webDevelopment.detail3': 'Integracija e-commerce platformi',
    'creative.webDevelopment.detail4': 'Responzivni dizajn za sve uređaje',
    'creative.webDevelopment.detail5': 'Korisničko iskustvo (UX) dizajn',
    'creative.webDevelopment.detail6': 'Održavanje i podrška web stranice',
    
    // Marketing Services
    'marketing.sectionTitle': 'MARKETING USLUGE',
    'marketing.campaigns': 'Kampanje',
    'marketing.campaigns.desc': 'Kreiramo smjele kampanje koje privlače pažnju i pokreću konverzije.',
    'marketing.socialMedia': 'Društvene Mreže',
    'marketing.socialMedia.desc': 'Gradimo angažovane zajednice sa sadržajem koji pokreće razgovore i dijeljenja.',
    'marketing.contentCreation': 'Kreiranje Sadržaja',
    'marketing.contentCreation.desc': 'Kreiramo priče koje odjekuju sa vašom publikom kroz sve medije.',
    
    // Marketing Service Details
    'marketing.campaigns.detail1': 'Multi-kanalna strategija kampanje',
    'marketing.campaigns.detail2': 'Razvoj kreativnog koncepta',
    'marketing.campaigns.detail3': 'Pisanje i dizajn oglasa',
    'marketing.campaigns.detail4': 'Upravljanje i optimizacija kampanja',
    'marketing.campaigns.detail5': 'A/B testiranje i analitika',
    'marketing.campaigns.detail6': 'Izvještavanje o učinku',
    
    'marketing.socialMedia.detail1': 'Strategija društvenih mreža',
    'marketing.socialMedia.detail2': 'Planiranje kalendara sadržaja',
    'marketing.socialMedia.detail3': 'Upravljanje zajednicom',
    'marketing.socialMedia.detail4': 'Partnerstva sa influencerima',
    'marketing.socialMedia.detail5': 'Praćenje i angažman na društvenim mrežama',
    'marketing.socialMedia.detail6': 'Plaćeno oglašavanje na društvenim mrežama',
    
    'marketing.contentCreation.detail1': 'Blog postovi i članci',
    'marketing.contentCreation.detail2': 'Video produkcija',
    'marketing.contentCreation.detail3': 'Kreiranje podkasta',
    'marketing.contentCreation.detail4': 'Infografike i vizuali',
    'marketing.contentCreation.detail5': 'Email newsletteri',
    'marketing.contentCreation.detail6': 'Studije slučaja i whitepapers',
    
    // Service Tags
    'tags.logoDesign': 'Dizajn Logotipa',
    'tags.brandStrategy': 'Brand Strategija',
    'tags.styleGuides': 'Stilski Vodiči',
    'tags.seo': 'SEO',
    'tags.ppc': 'PPC',
    'tags.contentMarketing': 'Content Marketing',
    'tags.frontend': 'Frontend',
    'tags.backend': 'Backend',
    'tags.ecommerce': 'E-commerce',
    'tags.digitalAds': 'Digitalni Oglasi',
    'tags.creativeConcepts': 'Kreativni Koncepti',
    'tags.brandActivation': 'Brand Aktivacija',
    'tags.engagement': 'Angažman',
    'tags.growth': 'Rast',
    'tags.community': 'Zajednica',
    'tags.storytelling': 'Pripovijedanje',
    'tags.multimedia': 'Multimedija',
    'tags.editorial': 'Uređivanje',
    
    // Contact Section
    'contact.title': 'Hajde da Kreiramo',
    'contact.subtitle': 'Nešto Nevjerovatno',
    'contact.description': 'Spremni da transformišete vaš brend? Pošaljite nam poruku i započnimo razgovor.',
    'contact.name': 'Vaše Ime',
    'contact.email': 'Email Adresa',
    'contact.message': 'Recite nam o vašem projektu',
    'contact.send': 'Pošalji Poruku',
    'contact.sending': 'Šalje se...',
    
    // Blog Section
    'blog.title': 'Uvidi',
    'blog.subtitle': 'i Vijesti',
    'blog.readMore': 'Pročitaj Više',
    
    // Footer
    'footer.tagline': 'Kreiramo smjele brendove sa pop-art stilom i strateškom preciznošću.',
    'footer.quickLinks': 'Brze Veze',
    'footer.services': 'Usluge',
    'footer.connect': 'Povežite Se',
    'footer.allRights': 'Sva prava zadržana.',
    
    // Section Indicators
    'section.creative': 'KREATIVNE USLUGE',
    'section.marketing': 'MARKETING USLUGE',
    'section.blog': 'UVIDI I VIJESTI',
    'section.contact': 'KONTAKTIRAJTE NAS',
    
    // Marketing Services (Additional)
    'marketing.socialMedia.title': 'Društvene Mreže',
    'marketing.socialMedia.fullDesc': 'Gradimo angažovane zajednice i kreiramo viralni sadržaj koji pojačava vaš brend.',
    'marketing.socialMedia.detailTitle': 'Šta Radimo',
    'marketing.contentStrategy': 'Content Strategija',
    'marketing.contentStrategy.desc': 'Strateško planiranje sadržaja koje pokreće angažman i gradi trajni autoritet.',
    'marketing.dataAnalytics': 'Podaci i Analitika',
    'marketing.dataAnalytics.desc': 'Pretvaramo brojke u uvide sa strategijama zasnovanim na podacima koje maksimiziraju ROI.',
    
    'marketing.contentStrategy.detail1': 'Razvoj content strategije',
    'marketing.contentStrategy.detail2': 'SEO-optimizirano copywriting',
    'marketing.contentStrategy.detail3': 'Pisanje blogova i članaka',
    'marketing.contentStrategy.detail4': 'Email marketing kampanje',
    'marketing.contentStrategy.detail5': 'Optimizacija landing stranica',
    'marketing.contentStrategy.detail6': 'Upravljanje kalendarom sadržaja',
    
    'marketing.dataAnalytics.detail1': 'Praćenje performansi i KPI-ja',
    'marketing.dataAnalytics.detail2': 'Postavljanje Google Analytics-a',
    'marketing.dataAnalytics.detail3': 'A/B testiranje i optimizacija',
    'marketing.dataAnalytics.detail4': 'Optimizacija stope konverzije',
    'marketing.dataAnalytics.detail5': 'Prilagođene kontrolne table izvještaja',
    'marketing.dataAnalytics.detail6': 'Preporuke zasnovane na podacima',
    
    // Tags for Marketing
    'tags.instagram': 'Instagram',
    'tags.tiktok': 'TikTok',
    'tags.blogging': 'Blogovanje',
    'tags.copywriting': 'Copywriting',
    'tags.analytics': 'Analitika',
    'tags.abTesting': 'A/B Testiranje',
    'tags.roi': 'ROI',
    
    // Blog Posts
    'blog.post1.title': 'Budućnost Brendiranja u 2025',
    'blog.post1.excerpt': 'Istraživanje kako moderni brendovi redefinišu vizuelni identitet u sve digitalnijem svijetu.',
    'blog.post1.category': 'Brendiranje',
    'blog.post2.title': 'Trendovi Društvenih Mreža Koji Oblikuju Marketing',
    'blog.post2.excerpt': 'Otkrijte najnovije strategije društvenih mreža koje pokreću angažman i grade zajednice.',
    'blog.post2.category': 'Marketing',
    'blog.post3.title': 'Tajne Video Produkcije od Profesionalaca',
    'blog.post3.excerpt': 'Naučite tehnike koje koriste vrhunski kreatori za proizvodnju video sadržaja koji konvertuje.',
    'blog.post3.category': 'Kreativno',
    
    // Footer
    'footer.description': 'Gdje se smjela kreativnost susreće sa strateškim razmišljanjem. Transformišemo ambiciozne brendove u nezaboravna iskustva.',
    'footer.services.brandIdentity': 'Brendiranje',
    'footer.services.videoProduction': 'Video Produkcija',
    'footer.services.creativeDesign': 'Kreativni Dizajn',
    'footer.services.socialMedia': 'Društvene Mreže',
    'footer.services.contentStrategy': 'Content Strategija',
    'footer.services.dataAnalytics': 'Podaci i Analitika',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
