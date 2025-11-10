import { motion, AnimatePresence } from 'motion/react';
import { Send, Mail, Phone, MapPin, CheckCircle2, Calendar, DollarSign, Briefcase, FileText, X, User, ChevronDown } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { useState } from 'react';
import { useLanguage } from './LanguageContext';

const creativeServices = [
  { id: 'branding', label: 'Branding & Visual Identity', category: 'creative' },
  { id: 'print', label: 'Print Design & Collateral', category: 'creative' },
  { id: 'packaging', label: 'Packaging Design', category: 'creative' },
  { id: 'illustration', label: 'Illustration & Graphics', category: 'creative' },
];

const marketingServices = [
  { id: 'campaigns', label: 'Marketing Campaigns', category: 'marketing' },
  { id: 'social', label: 'Social Media Management', category: 'marketing' },
  { id: 'web', label: 'Web Design & Development', category: 'marketing' },
  { id: 'seo', label: 'SEO & Content Strategy', category: 'marketing' },
];

const contractDurations = [
  { value: '1-month', label: '1 Month' },
  { value: '3-months', label: '3 Months' },
  { value: '6-months', label: '6 Months' },
  { value: '1-year', label: '1 Year' },
  { value: '2-years', label: '2+ Years' },
  { value: 'project-based', label: 'Project-Based (One-Time)' },
];

const budgetRanges = [
  { value: 'under-10k', label: 'Under €10,000' },
  { value: '10k-25k', label: '€10,000 - €25,000' },
  { value: '25k-50k', label: '€25,000 - €50,000' },
  { value: '50k-100k', label: '€50,000 - €100,000' },
  { value: 'over-100k', label: 'Over €100,000' },
  { value: 'flexible', label: 'Flexible / Not Sure Yet' },
];

const projectTimelines = [
  { value: 'urgent', label: 'Urgent (1-2 weeks)' },
  { value: 'soon', label: 'Soon (3-4 weeks)' },
  { value: 'flexible', label: 'Flexible (1-3 months)' },
  { value: 'planning', label: 'Just Planning' },
];

const FORM_ENDPOINT = 'https://formspree.io/f/xqawznvd';

export function ContactSection({ onOpenProposal }: { onOpenProposal: () => void }) {
  const { t } = useLanguage();
  const [simpleFormData, setSimpleFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [careerFormData, setCareerFormData] = useState({
    name: '',
    email: '',
    position: '',
    cvLink: '',
    portfolioLink: '',
  });

  const [isSimpleSubmitted, setIsSimpleSubmitted] = useState(false);
  const [isCareerSubmitted, setIsCareerSubmitted] = useState(false);
  const [isCareerExpanded, setIsCareerExpanded] = useState(false);
  const [isSimpleSubmitting, setIsSimpleSubmitting] = useState(false);
  const [simpleError, setSimpleError] = useState<string | null>(null);
  const [isCareerSubmitting, setIsCareerSubmitting] = useState(false);
  const [careerError, setCareerError] = useState<string | null>(null);

  const handleSimpleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSimpleError(null);
    setIsSimpleSubmitting(true);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          formName: 'simple_contact',
          name: simpleFormData.name,
          email: simpleFormData.email,
          message: simpleFormData.message,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMessage =
          (data?.errors && data.errors[0]?.message) ||
          'Something went wrong. Please try again.';
        throw new Error(errorMessage);
      }

      setIsSimpleSubmitted(true);
      setSimpleFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setIsSimpleSubmitted(false);
      }, 3000);
    } catch (error: any) {
      setSimpleError(error.message || 'Unable to submit the form. Please try again later.');
    } finally {
      setIsSimpleSubmitting(false);
    }
  };

  const handleSimpleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSimpleFormData({
      ...simpleFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCareerError(null);
    setIsCareerSubmitting(true);

    // Validation
    if (!careerFormData.name.trim()) {
      setCareerError('Please enter your name.');
      setIsCareerSubmitting(false);
      return;
    }
    if (!careerFormData.email.trim()) {
      setCareerError('Please enter your email.');
      setIsCareerSubmitting(false);
      return;
    }
    if (!careerFormData.position.trim()) {
      setCareerError('Please enter the position you are applying for.');
      setIsCareerSubmitting(false);
      return;
    }
    if (!careerFormData.cvLink.trim()) {
      setCareerError('Please provide a link to your CV.');
      setIsCareerSubmitting(false);
      return;
    }

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          formName: 'career_application',
          name: careerFormData.name.trim(),
          email: careerFormData.email.trim(),
          position: careerFormData.position.trim(),
          cvLink: careerFormData.cvLink.trim(),
          portfolioLink: careerFormData.portfolioLink.trim() || '',
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        // Better error handling
        let errorMessage = 'Something went wrong. Please try again.';
        
        if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          errorMessage = data.errors[0]?.message || errorMessage;
        } else if (data?.error) {
          errorMessage = data.error;
        } else if (response.status === 400) {
          errorMessage = 'Invalid form data. Please check your file sizes (max 10MB) and try again.';
        } else if (response.status === 413) {
          errorMessage = 'File size too large. Please use files smaller than 10MB.';
        } else if (response.status === 429) {
          errorMessage = 'Too many requests. Please try again in a few minutes.';
        }
        
        throw new Error(errorMessage);
      }

      setIsCareerSubmitted(true);
      setCareerFormData({ name: '', email: '', position: '', cvLink: '', portfolioLink: '' });

      setTimeout(() => {
        setIsCareerSubmitted(false);
      }, 3000);
    } catch (error: any) {
      setCareerError(error.message || 'Unable to submit the form. Please try again later.');
    } finally {
      setIsCareerSubmitting(false);
    }
  };

  const handleCareerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCareerFormData({
      ...careerFormData,
      [e.target.name]: e.target.value,
    });
  };


  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@tapagency.com',
      accent: '#7F2C4C',
      link: 'mailto:contact@tapagency.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+387 61 199 919',
      accent: '#51AE92',
      link: 'tel:+38761199919'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Sarajevo, BiH',
      accent: '#A84CB4',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="relative py-12 bg-[#0A0A0A]">
      
      <div className="relative max-w-[1400px] mx-auto px-6">
        
        {/* Section Header - Matching Creative/Marketing Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <div className="inline-block px-3 py-1.5 md:px-5 md:py-2 mb-4 md:mb-6 rounded-full bg-[#A84CB4]/10 border border-[#A84CB4]/30">
            <span className="font-['Lato'] text-[#A84CB4] text-xs md:text-sm tracking-wide">CONTACT</span>
          </div>

          <h2 className="font-['Josefin_Sans'] text-[#ECE7E1] text-[clamp(32px,7vw,80px)] leading-tight tracking-tight mb-4">
            {t('contact.title')} {t('contact.subtitle')}
          </h2>
          <p className="font-['Lato'] text-[#ECE7E1]/60 text-sm md:text-lg leading-relaxed max-w-2xl">
            Ready to elevate your brand? Drop us a message and let's start building something extraordinary together.
          </p>
        </motion.div>

        {/* Mobile Layout: New Order */}
        <div className="lg:hidden space-y-4">
          
          {/* 1. Message Form - Mobile (Top) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative bg-[#1A1A1A]/60 backdrop-blur-xl rounded-xl p-4 border border-[#ECE7E1]/10">

              <div className="flex items-center gap-2.5 mb-4">
                <div 
                  className="p-2 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: '#7F2C4C20' }}
                >
                  <Mail className="w-4 h-4 text-[#7F2C4C]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-['Josefin_Sans'] text-[#7F2C4C] text-sm">
                    Send a Message
                  </h3>
                  <p className="font-['Lato'] text-[#ECE7E1]/60 text-[10px]">
                    Get in touch with us
                  </p>
                </div>
              </div>

              {isSimpleSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  >
                    <CheckCircle2 className="w-12 h-12 text-[#B3C19A] mx-auto mb-3" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-['Josefin_Sans'] text-[#ECE7E1] text-lg mb-2">Message Sent!</h3>
                  <p className="font-['Lato'] text-[#ECE7E1]/70 text-sm">
                    We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSimpleSubmit} className="space-y-3">
                  
                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <Label htmlFor="name-mobile" className="font-['Lato'] text-[#ECE7E1] text-xs flex items-center gap-2">
                      Your Name <span className="text-[#7F2C4C]">*</span>
                    </Label>
                    <Input
                      id="name-mobile"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={simpleFormData.name}
                      onChange={handleSimpleChange}
                      required
                      className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#7F2C4C] focus:ring-[#7F2C4C]/20 h-9 rounded-lg transition-all text-sm"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <Label htmlFor="email-mobile" className="font-['Lato'] text-[#ECE7E1] text-xs flex items-center gap-2">
                      Email <span className="text-[#7F2C4C]">*</span>
                    </Label>
                    <Input
                      id="email-mobile"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={simpleFormData.email}
                      onChange={handleSimpleChange}
                      required
                      className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#7F2C4C] focus:ring-[#7F2C4C]/20 h-9 rounded-lg transition-all text-sm"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <Label htmlFor="message-mobile" className="font-['Lato'] text-[#ECE7E1] text-xs flex items-center gap-2">
                      Message <span className="text-[#7F2C4C]">*</span>
                    </Label>
                    <Textarea
                      id="message-mobile"
                      name="message"
                      placeholder="Tell us about your project..."
                      value={simpleFormData.message}
                      onChange={handleSimpleChange}
                      required
                      rows={4}
                      className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#7F2C4C] focus:ring-[#7F2C4C]/20 rounded-lg resize-none transition-all text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSimpleSubmitting}
                    className="w-full bg-[#B3C19A] text-[#0A0A0A] h-10 rounded-lg group flex items-center justify-center gap-2 transition-all font-['Lato'] relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={
                      !isSimpleSubmitting
                        ? { 
                            scale: 1.02,
                            backgroundColor: '#A5B38D',
                          }
                        : undefined
                    }
                    whileTap={!isSimpleSubmitting ? { scale: 0.98 } : undefined}
                  >
                    <span className="relative text-sm z-10">
                      {isSimpleSubmitting ? 'Sending…' : t('contact.send')}
                    </span>
                    <Send className="relative w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform z-10" />
                  </motion.button>
                  {simpleError && (
                    <p className="font-['Lato'] text-[#FF7A7A] text-xs text-center">
                      {simpleError}
                    </p>
                  )}
                </form>
              )}
            </div>
          </motion.div>

          {/* 2. Career/Job Application Form - Expandable on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative bg-[#1A1A1A]/60 backdrop-blur-xl rounded-xl border border-[#A84CB4]/20">
              
              {/* Header - Clickable to toggle */}
              <button
                onClick={() => setIsCareerExpanded(!isCareerExpanded)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div 
                    className="p-2 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: '#A84CB420' }}
                  >
                    <Briefcase className="w-4 h-4 text-[#A84CB4]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-['Josefin_Sans'] text-[#A84CB4] text-sm">
                      Join Our Team
                    </h3>
                    <p className="font-['Lato'] text-[#ECE7E1]/60 text-[10px]">
                      Apply for open positions
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isCareerExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#A84CB4]" />
                </motion.div>
              </button>

              {/* Expandable Content */}
              <AnimatePresence>
                {isCareerExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      {isCareerSubmitted ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="py-8 text-center"
                        >
                          <CheckCircle2 className="w-12 h-12 text-[#B3C19A] mx-auto mb-3" strokeWidth={1.5} />
                          <p className="font-['Josefin_Sans'] text-[#ECE7E1] text-base mb-1">Application Submitted!</p>
                          <p className="font-['Lato'] text-[#ECE7E1]/60 text-xs">We'll review soon.</p>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleCareerSubmit} className="space-y-3">
                          
                          {/* Name */}
                          <div className="space-y-1.5">
                            <Label htmlFor="career-name-mobile" className="font-['Lato'] text-[#ECE7E1] text-xs flex items-center gap-1">
                              Name <span className="text-[#A84CB4]">*</span>
                            </Label>
                            <Input
                              id="career-name-mobile"
                              name="name"
                              type="text"
                              placeholder="Your name"
                              value={careerFormData.name}
                              onChange={handleCareerChange}
                              required
                              className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#A84CB4] focus:ring-[#A84CB4]/20 h-9 rounded-lg transition-all text-sm"
                            />
                          </div>

                          {/* Email */}
                          <div className="space-y-1.5">
                            <Label htmlFor="career-email-mobile" className="font-['Lato'] text-[#ECE7E1] text-xs flex items-center gap-1">
                              Email <span className="text-[#A84CB4]">*</span>
                            </Label>
                            <Input
                              id="career-email-mobile"
                              name="email"
                              type="email"
                              placeholder="your@email.com"
                              value={careerFormData.email}
                              onChange={handleCareerChange}
                              required
                              className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#A84CB4] focus:ring-[#A84CB4]/20 h-9 rounded-lg transition-all text-sm"
                            />
                          </div>

                          {/* Position */}
                          <div className="space-y-1.5">
                            <Label htmlFor="position-mobile" className="font-['Lato'] text-[#ECE7E1] text-xs flex items-center gap-1">
                              Position <span className="text-[#A84CB4]">*</span>
                            </Label>
                            <Input
                              id="position-mobile"
                              name="position"
                              type="text"
                              placeholder="Designer"
                              value={careerFormData.position}
                              onChange={handleCareerChange}
                              required
                              className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#A84CB4] focus:ring-[#A84CB4]/20 h-9 rounded-lg transition-all text-sm"
                            />
                          </div>

                          {/* CV Link */}
                          <div className="space-y-1.5">
                            <Label htmlFor="cvLink-mobile" className="font-['Lato'] text-[#ECE7E1] text-xs flex items-center gap-1">
                              CV Link <span className="text-[#A84CB4]">*</span>
                            </Label>
                            <Input
                              id="cvLink-mobile"
                              name="cvLink"
                              type="url"
                              placeholder="https://..."
                              value={careerFormData.cvLink}
                              onChange={handleCareerChange}
                              required
                              className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#A84CB4] focus:ring-[#A84CB4]/20 h-9 rounded-lg transition-all text-sm"
                            />
                          </div>

                          {/* Portfolio Link */}
                          <div className="space-y-1.5">
                            <Label htmlFor="portfolioLink-mobile" className="font-['Lato'] text-[#ECE7E1] text-xs flex items-center gap-1">
                              Portfolio Link <span className="text-[#ECE7E1]/40 text-[10px]">(Optional)</span>
                            </Label>
                            <Input
                              id="portfolioLink-mobile"
                              name="portfolioLink"
                              type="url"
                              placeholder="https://..."
                              value={careerFormData.portfolioLink}
                              onChange={handleCareerChange}
                              className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#A84CB4] focus:ring-[#A84CB4]/20 h-9 rounded-lg transition-all text-sm"
                            />
                          </div>

                          {/* Submit Button */}
                        <motion.button
                          type="submit"
                          disabled={isCareerSubmitting}
                          className="w-full bg-[#A84CB4] text-[#ECE7E1] h-10 rounded-lg group flex items-center justify-center gap-2 transition-all font-['Lato'] relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                          whileHover={
                            !isCareerSubmitting
                              ? { 
                                  scale: 1.02,
                                  backgroundColor: '#9639A3',
                                }
                              : undefined
                          }
                          whileTap={!isCareerSubmitting ? { scale: 0.98 } : undefined}
                        >
                          <span className="relative text-sm z-10">
                            {isCareerSubmitting ? 'Submitting…' : 'Submit Application'}
                          </span>
                            <Send className="relative w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform z-10" />
                          </motion.button>
                        {careerError && (
                          <p className="font-['Lato'] text-[#FF7A7A] text-xs text-center">
                            {careerError}
                          </p>
                        )}
                        </form>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* 3. Request Proposal Button - Mobile */}
          <motion.button
            onClick={onOpenProposal}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full bg-[#51AE92]/10 backdrop-blur-xl p-4 rounded-xl border-2 border-[#51AE92]/40 transition-all overflow-hidden hover:border-[#51AE92]/80 hover:bg-[#51AE92]/15 hover:shadow-[0_0_40px_rgba(81,174,146,0.2)]"
          >
            {/* Strong accent glow on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(81, 174, 146, 0.25) 0%, transparent 70%)',
              }}
            />

            <div className="relative flex items-center justify-center gap-3">
              <div 
                className="p-2 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: '#51AE9230' }}
              >
                <FileText className="w-4 h-4 text-[#51AE92]" strokeWidth={1.5} />
              </div>
              <div className="text-center">
                <div className="font-['Josefin_Sans'] text-[#51AE92] text-base">
                  Request Custom Proposal
                </div>
                <div className="font-['Lato'] text-[#ECE7E1]/70 text-xs">
                  Get detailed pricing and timeline
                </div>
              </div>
              <motion.div
                className="text-[#51AE92] text-lg"
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </div>

            {/* Bottom accent line */}
            <div 
              className="absolute left-0 right-0 bottom-0 h-1.5"
              style={{
                background: 'linear-gradient(90deg, transparent, #51AE92, transparent)',
                opacity: 0.6,
              }}
            />
          </motion.button>

          {/* 4. Contact Info Boxes - Simplified Mobile (Bottom) */}
          <div className="space-y-2 pt-2">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={info.label}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="group relative block p-3 rounded-lg bg-[#1A1A1A]/40 backdrop-blur-xl border border-[#ECE7E1]/5 hover:border-[#ECE7E1]/10 transition-all"
                >
                  <div className="relative flex items-center gap-2.5">
                    <div 
                      className="p-2 rounded-lg flex-shrink-0"
                      style={{ 
                        backgroundColor: `${info.accent}15`,
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: info.accent }} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-['Lato'] text-[#ECE7E1]/40 text-[9px] uppercase tracking-wider mb-0.5">
                        {info.label}
                      </div>
                      <div 
                        className="font-['Josefin_Sans'] text-sm truncate"
                        style={{ color: info.accent }}
                      >
                        {info.value}
                      </div>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>

        </div>

        {/* Desktop Layout: Contact info at top, then two forms side by side, then proposal */}
        <div className="hidden lg:block">
          
          {/* Contact Info Boxes - Row of 3 (Desktop) */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={info.label}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative block p-5 rounded-xl bg-[#1A1A1A]/60 backdrop-blur-xl border border-[#ECE7E1]/10 hover:border-[#ECE7E1]/20 transition-all"
                >
                  <div className="relative flex items-center gap-3">
                    <div 
                      className="p-3 rounded-lg flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ 
                        backgroundColor: `${info.accent}20`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: info.accent }} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-['Lato'] text-[#ECE7E1]/50 text-[10px] uppercase tracking-wider mb-1">
                        {info.label}
                      </div>
                      <div 
                        className="font-['Josefin_Sans'] text-base truncate"
                        style={{ color: info.accent }}
                      >
                        {info.value}
                      </div>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Two Forms Side by Side (Desktop) */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            
            {/* Message Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex"
            >
              <div className="relative bg-[#1A1A1A]/60 backdrop-blur-xl rounded-xl p-5 border border-[#ECE7E1]/10 flex-1 flex flex-col">

                <div className="flex items-center gap-2.5 mb-4">
                  <div 
                    className="p-2 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: '#7F2C4C20' }}
                  >
                    <Mail className="w-4 h-4 text-[#7F2C4C]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-['Josefin_Sans'] text-[#7F2C4C] text-sm">
                      Send a Message
                    </h3>
                    <p className="font-['Lato'] text-[#ECE7E1]/60 text-[10px]">
                      Get in touch with us
                    </p>
                  </div>
                </div>

                {isSimpleSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                      <CheckCircle2 className="w-12 h-12 text-[#B3C19A] mx-auto mb-3" strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="font-['Josefin_Sans'] text-[#ECE7E1] text-lg mb-2">Message Sent!</h3>
                    <p className="font-['Lato'] text-[#ECE7E1]/70 text-sm">
                      We'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSimpleSubmit} className="space-y-3 flex-1 flex flex-col">
                    
                    {/* Name Field */}
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="font-['Lato'] text-[#ECE7E1] text-xs flex items-center gap-2">
                        Your Name <span className="text-[#7F2C4C]">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={simpleFormData.name}
                        onChange={handleSimpleChange}
                        required
                        className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#7F2C4C] focus:ring-[#7F2C4C]/20 h-9 rounded-lg transition-all text-sm"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="font-['Lato'] text-[#ECE7E1] text-xs flex items-center gap-2">
                        Email <span className="text-[#7F2C4C]">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={simpleFormData.email}
                        onChange={handleSimpleChange}
                        required
                        className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#7F2C4C] focus:ring-[#7F2C4C]/20 h-9 rounded-lg transition-all text-sm"
                      />
                    </div>

                    {/* Message Field */}
                    <div className="space-y-1.5 flex-1 flex flex-col">
                      <Label htmlFor="message" className="font-['Lato'] text-[#ECE7E1] text-xs flex items-center gap-2">
                        Message <span className="text-[#7F2C4C]">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your project..."
                        value={simpleFormData.message}
                        onChange={handleSimpleChange}
                        required
                        className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#7F2C4C] focus:ring-[#7F2C4C]/20 rounded-lg resize-none transition-all flex-1 text-sm"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSimpleSubmitting}
                      className="w-full bg-[#B3C19A] text-[#0A0A0A] h-10 rounded-lg group flex items-center justify-center gap-2 transition-all font-['Lato'] relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                      whileHover={
                        !isSimpleSubmitting
                          ? { 
                              scale: 1.02,
                              backgroundColor: '#A5B38D',
                            }
                          : undefined
                      }
                      whileTap={!isSimpleSubmitting ? { scale: 0.98 } : undefined}
                    >
                      <span className="relative text-sm z-10">
                        {isSimpleSubmitting ? 'Sending…' : t('contact.send')}
                      </span>
                      <Send className="relative w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform z-10" />
                    </motion.button>
                    {simpleError && (
                      <p className="font-['Lato'] text-[#FF7A7A] text-xs text-center">
                        {simpleError}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>

            {/* Career/Job Application Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex"
            >
              <div className="relative bg-[#1A1A1A]/60 backdrop-blur-xl rounded-xl p-5 border border-[#A84CB4]/20 flex-1 flex flex-col">
                
                <div className="flex items-center gap-2.5 mb-4">
                  <div 
                    className="p-2 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: '#A84CB420' }}
                  >
                    <Briefcase className="w-4 h-4 text-[#A84CB4]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-['Josefin_Sans'] text-[#A84CB4] text-sm">
                      Join Our Team
                    </h3>
                    <p className="font-['Lato'] text-[#ECE7E1]/60 text-[10px]">
                      Apply for open positions
                    </p>
                  </div>
                </div>

                {isCareerSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <CheckCircle2 className="w-12 h-12 text-[#B3C19A] mx-auto mb-3" strokeWidth={1.5} />
                    <p className="font-['Josefin_Sans'] text-[#ECE7E1] text-base mb-1">Application Submitted!</p>
                    <p className="font-['Lato'] text-[#ECE7E1]/60 text-xs">We'll review soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCareerSubmit} className="space-y-3 flex-1 flex flex-col">
                    
                    {/* Two Column Layout - Name/Email on Left, Position/CV on Right */}
                    <div className="grid grid-cols-2 gap-3">
                      
                      {/* Left Column */}
                      <div className="space-y-3">
                        {/* Name */}
                        <div className="space-y-1.5">
                          <Label htmlFor="career-name" className="font-['Lato'] text-[#ECE7E1] text-xs flex items-center gap-1">
                            Name <span className="text-[#A84CB4]">*</span>
                          </Label>
                          <Input
                            id="career-name"
                            name="name"
                            type="text"
                            placeholder="Your name"
                            value={careerFormData.name}
                            onChange={handleCareerChange}
                            required
                            className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#A84CB4] focus:ring-[#A84CB4]/20 h-9 rounded-lg transition-all text-sm"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                          <Label htmlFor="career-email" className="font-['Lato'] text-[#ECE7E1] text-xs flex items-center gap-1">
                            Email <span className="text-[#A84CB4]">*</span>
                          </Label>
                          <Input
                            id="career-email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={careerFormData.email}
                            onChange={handleCareerChange}
                            required
                            className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#A84CB4] focus:ring-[#A84CB4]/20 h-9 rounded-lg transition-all text-sm"
                          />
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-3">
                        {/* Position */}
                        <div className="space-y-1.5">
                          <Label htmlFor="position" className="font-['Lato'] text-[#ECE7E1] text-xs flex items-center gap-1">
                            Position <span className="text-[#A84CB4]">*</span>
                          </Label>
                          <Input
                            id="position"
                            name="position"
                            type="text"
                            placeholder="Designer"
                            value={careerFormData.position}
                            onChange={handleCareerChange}
                            required
                            className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#A84CB4] focus:ring-[#A84CB4]/20 h-9 rounded-lg transition-all text-sm"
                          />
                        </div>

                        {/* CV Link */}
                        <div className="space-y-1.5">
                          <Label htmlFor="cvLink" className="font-['Lato'] text-[#ECE7E1] text-xs flex items-center gap-1">
                            CV Link <span className="text-[#A84CB4]">*</span>
                          </Label>
                          <Input
                            id="cvLink"
                            name="cvLink"
                            type="url"
                            placeholder="https://..."
                            value={careerFormData.cvLink}
                            onChange={handleCareerChange}
                            required
                            className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#A84CB4] focus:ring-[#A84CB4]/20 h-9 rounded-lg transition-all text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Portfolio Link */}
                    <div className="space-y-1.5">
                      <Label htmlFor="portfolioLink" className="font-['Lato'] text-[#ECE7E1] text-xs flex items-center gap-1">
                        Portfolio Link
                        <span className="text-[#ECE7E1]/40 text-[10px]">(Optional)</span>
                      </Label>
                      <Input
                        id="portfolioLink"
                        name="portfolioLink"
                        type="url"
                        placeholder="https://..."
                        value={careerFormData.portfolioLink}
                        onChange={handleCareerChange}
                        className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#A84CB4] focus:ring-[#A84CB4]/20 h-9 rounded-lg transition-all text-sm"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isCareerSubmitting}
                      className="w-full bg-[#A84CB4] text-[#ECE7E1] h-10 rounded-lg group flex items-center justify-center gap-2 transition-all font-['Lato'] relative overflow-hidden mt-auto disabled:opacity-60 disabled:cursor-not-allowed"
                      whileHover={
                        !isCareerSubmitting
                          ? { 
                              scale: 1.02,
                              backgroundColor: '#9639A3',
                            }
                          : undefined
                      }
                      whileTap={!isCareerSubmitting ? { scale: 0.98 } : undefined}
                    >
                      <span className="relative text-sm z-10">
                        {isCareerSubmitting ? 'Submitting…' : 'Submit Application'}
                      </span>
                      <Send className="relative w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform z-10" />
                    </motion.button>
                    {careerError && (
                      <p className="font-['Lato'] text-[#FF7A7A] text-xs text-center">
                        {careerError}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>

          </div>

          {/* Request Proposal Button - Full Width Below Forms (Desktop) */}
          <motion.button
            onClick={onOpenProposal}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full bg-[#51AE92]/10 backdrop-blur-xl p-5 rounded-xl border-2 border-[#51AE92]/40 transition-all overflow-hidden hover:border-[#51AE92]/80 hover:bg-[#51AE92]/15 hover:shadow-[0_0_40px_rgba(81,174,146,0.2)]"
          >
            {/* Strong accent glow on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(81, 174, 146, 0.25) 0%, transparent 70%)',
              }}
            />

            <div className="relative flex items-center justify-center gap-4">
              <div 
                className="p-3 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: '#51AE9230' }}
              >
                <FileText className="w-5 h-5 text-[#51AE92]" strokeWidth={1.5} />
              </div>
              <div className="text-center">
                <div className="font-['Josefin_Sans'] text-[#51AE92] text-lg">
                  Request Custom Proposal
                </div>
                <div className="font-['Lato'] text-[#ECE7E1]/70 text-sm">
                  Get detailed pricing and timeline for your project
                </div>
              </div>
              <motion.div
                className="text-[#51AE92] text-xl"
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </div>

            {/* Bottom accent line */}
            <div 
              className="absolute left-0 right-0 bottom-0 h-1.5"
              style={{
                background: 'linear-gradient(90deg, transparent, #51AE92, transparent)',
                opacity: 0.6,
              }}
            />
          </motion.button>

        </div>

      </div>
    </section>
  );
}
