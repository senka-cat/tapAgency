import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Mail, Phone, MapPin, X } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { useState } from 'react';

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

const billboardLocations = [
  { id: 'dom-sindikata', label: 'Dom Sindikata', size: '649x336 px' },
  { id: 'hotel-europe', label: 'Hotel Europe', size: '576x288 px' },
  { id: 'pofalici', label: 'Pofalići - Put života', size: '720x432 px' },
  { id: 'kulovica', label: 'Kulovića 6', size: '192x384 px' },
  { id: 'aerodrom', label: 'Aerodrom Sarajevo', size: '649x336 px' },
];

const FORM_ENDPOINT = 'https://formspree.io/f/xqawznvd';

export function ProposalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [proposalFormData, setProposalFormData] = useState({
    name: '',
    email: '',
    company: '',
    selectedServices: [] as string[],
    budget: '',
    timeline: '',
    contractDuration: '',
    details: '',
    interestedInBillboard: false,
    selectedBillboards: [] as string[],
  });

  const [isProposalSubmitted, setIsProposalSubmitted] = useState(false);
  const [isProposalSubmitting, setIsProposalSubmitting] = useState(false);
  const [proposalError, setProposalError] = useState<string | null>(null);

  const handleProposalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProposalError(null);

    if (
      !proposalFormData.name.trim() ||
      !proposalFormData.email.trim() ||
      !proposalFormData.selectedServices.length ||
      !proposalFormData.budget ||
      !proposalFormData.timeline ||
      !proposalFormData.contractDuration
    ) {
      setProposalError('Please fill in all required fields before submitting.');
      return;
    }

    setIsProposalSubmitting(true);

    const allServices = [...creativeServices, ...marketingServices];
    const selectedServiceLabels = proposalFormData.selectedServices.map((serviceId) => {
      const match = allServices.find((service) => service.id === serviceId);
      return match?.label ?? serviceId;
    });

    const findLabel = (options: { value: string; label: string }[], value: string) =>
      options.find((option) => option.value === value)?.label ?? value;

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          formName: 'proposal_request',
          name: proposalFormData.name,
          email: proposalFormData.email,
          company: proposalFormData.company,
          selectedServices: selectedServiceLabels.join(', '),
          selectedServiceIds: proposalFormData.selectedServices.join(', '),
          budget: proposalFormData.budget,
          timeline: proposalFormData.timeline,
          timelineLabel: findLabel(projectTimelines, proposalFormData.timeline),
          contractDuration: proposalFormData.contractDuration,
          contractDurationLabel: findLabel(contractDurations, proposalFormData.contractDuration),
          details: proposalFormData.details,
          interestedInBillboard: proposalFormData.interestedInBillboard,
          selectedBillboards: proposalFormData.selectedBillboards.length > 0
            ? proposalFormData.selectedBillboards.map(id => {
                const billboard = billboardLocations.find(b => b.id === id);
                return billboard ? `${billboard.label} (${billboard.size})` : id;
              }).join(', ')
            : '',
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMessage =
          (data?.errors && data.errors[0]?.message) ||
          'Something went wrong. Please try again.';
        throw new Error(errorMessage);
      }

      setIsProposalSubmitted(true);
      setProposalFormData({
        name: '',
        email: '',
        company: '',
        selectedServices: [],
        budget: '',
        timeline: '',
        contractDuration: '',
        details: '',
        interestedInBillboard: false,
        selectedBillboards: [],
      });

      setTimeout(() => {
        setIsProposalSubmitted(false);
        onClose();
      }, 3000);
    } catch (error: any) {
      setProposalError(error.message || 'Unable to submit the form. Please try again later.');
    } finally {
      setIsProposalSubmitting(false);
    }
  };

  const handleProposalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProposalFormData({
      ...proposalFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceToggle = (serviceId: string) => {
    setProposalFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
  };

  const handleBillboardToggle = (billboardId: string) => {
    setProposalFormData(prev => ({
      ...prev,
      selectedBillboards: prev.selectedBillboards.includes(billboardId)
        ? prev.selectedBillboards.filter(id => id !== billboardId)
        : [...prev.selectedBillboards, billboardId]
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#000000]/85 backdrop-blur-lg z-[100]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-3xl max-h-[90vh] overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#0A0A0A]/98 backdrop-blur-xl rounded-2xl border border-[#ECE7E1]/10 overflow-hidden shadow-2xl">
                
                {/* Modal Header */}
                <div className="relative flex items-center justify-between p-6 border-b border-[#ECE7E1]/10">
                  <div>
                    <h2 className="font-['Josefin_Sans'] text-[#ECE7E1] text-2xl">
                      Request Custom Proposal
                    </h2>
                    <p className="font-['Lato'] text-[#ECE7E1]/60 text-sm mt-1">
                      Tell us about your project and we'll create a tailored proposal
                    </p>
                  </div>
                  
                  <motion.button
                    onClick={onClose}
                    className="p-2 rounded-xl bg-[#ECE7E1]/5 hover:bg-[#ECE7E1]/10 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-[#ECE7E1]" />
                  </motion.button>
                </div>

                {/* Modal Content - Single Column Form */}
                <div className="max-h-[calc(90vh-120px)] overflow-y-auto p-8">
                  <div className="max-w-2xl mx-auto">
                    {isProposalSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-16 text-center"
                      >
                        <CheckCircle2 className="w-20 h-20 text-[#B3C19A] mx-auto mb-6" strokeWidth={1.5} />
                        <h3 className="font-['Josefin_Sans'] text-[#ECE7E1] text-3xl mb-3">Proposal Request Sent!</h3>
                        <p className="font-['Lato'] text-[#ECE7E1]/70 text-lg">
                          We'll prepare a custom proposal and get back to you within 24-48 hours.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleProposalSubmit} className="space-y-6">

                        {/* Name & Email - Side by Side */}
                        <div className="grid md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="prop-name" className="font-['Lato'] text-[#ECE7E1] flex items-center gap-2">
                              Your Name <span className="text-[#51AE92]">*</span>
                            </Label>
                            <Input
                              id="prop-name"
                              name="name"
                              type="text"
                              placeholder="John Doe"
                              value={proposalFormData.name}
                              onChange={handleProposalChange}
                              required
                              className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#51AE92] focus:ring-[#51AE92]/20 h-12 rounded-lg transition-all"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="prop-email" className="font-['Lato'] text-[#ECE7E1] flex items-center gap-2">
                              Email <span className="text-[#51AE92]">*</span>
                            </Label>
                            <Input
                              id="prop-email"
                              name="email"
                              type="email"
                              placeholder="john@company.com"
                              value={proposalFormData.email}
                              onChange={handleProposalChange}
                              required
                              className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#51AE92] focus:ring-[#51AE92]/20 h-12 rounded-lg transition-all"
                            />
                          </div>
                        </div>

                        {/* Company */}
                        <div className="space-y-2">
                          <Label htmlFor="prop-company" className="font-['Lato'] text-[#ECE7E1]">
                            Company Name <span className="text-[#ECE7E1]/40 text-sm">(Optional)</span>
                          </Label>
                          <Input
                            id="prop-company"
                            name="company"
                            type="text"
                            placeholder="Your Company"
                            value={proposalFormData.company}
                            onChange={handleProposalChange}
                            className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#51AE92] focus:ring-[#51AE92]/20 h-12 rounded-lg transition-all"
                          />
                        </div>

                        {/* Services Needed */}
                        <div className="space-y-4">
                          <Label className="font-['Lato'] text-[#ECE7E1] flex items-center gap-2">
                            Services Needed <span className="text-[#51AE92]">*</span>
                          </Label>
                          
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Creative Services */}
                            <div className="space-y-3">
                              <p className="font-['Lato'] text-[#7F2C4C] text-sm uppercase tracking-wider">Creative</p>
                              <div className="space-y-2.5">
                                {creativeServices.map(service => (
                                  <label
                                    key={service.id}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#ECE7E1]/5 cursor-pointer transition-colors"
                                  >
                                    <Checkbox
                                      checked={proposalFormData.selectedServices.includes(service.id)}
                                      onCheckedChange={() => handleServiceToggle(service.id)}
                                      className="border-[#ECE7E1]/20 data-[state=checked]:bg-[#7F2C4C] data-[state=checked]:border-[#7F2C4C]"
                                    />
                                    <span className="font-['Lato'] text-[#ECE7E1] text-sm">{service.label}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {/* Marketing Services */}
                            <div className="space-y-3">
                              <p className="font-['Lato'] text-[#51AE92] text-sm uppercase tracking-wider">Marketing</p>
                              <div className="space-y-2.5">
                                {marketingServices.map(service => (
                                  <label
                                    key={service.id}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#ECE7E1]/5 cursor-pointer transition-colors"
                                  >
                                    <Checkbox
                                      checked={proposalFormData.selectedServices.includes(service.id)}
                                      onCheckedChange={() => handleServiceToggle(service.id)}
                                      className="border-[#ECE7E1]/20 data-[state=checked]:bg-[#51AE92] data-[state=checked]:border-[#51AE92]"
                                    />
                                    <span className="font-['Lato'] text-[#ECE7E1] text-sm">{service.label}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Budget & Timeline - Side by Side */}
                        <div className="grid md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="prop-budget" className="font-['Lato'] text-[#ECE7E1] flex items-center gap-2">
                              Budget Range <span className="text-[#51AE92]">*</span>
                            </Label>
                            <Input
                              id="prop-budget"
                              name="budget"
                              type="text"
                              placeholder="e.g., €10,000 - €25,000 or Flexible"
                              value={proposalFormData.budget}
                              onChange={handleProposalChange}
                              required
                              className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#51AE92] focus:ring-[#51AE92]/20 h-12 rounded-lg transition-all"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="font-['Lato'] text-[#ECE7E1] flex items-center gap-2">
                              Timeline <span className="text-[#51AE92]">*</span>
                            </Label>
                            <Select
                              value={proposalFormData.timeline}
                              onValueChange={(value) => setProposalFormData({ ...proposalFormData, timeline: value })}
                            >
                              <SelectTrigger className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] focus:border-[#51AE92] focus:ring-[#51AE92]/20 h-12 rounded-lg">
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#1A1A1A] border-[#ECE7E1]/10 z-[200]">
                                {projectTimelines.map(timeline => (
                                  <SelectItem 
                                    key={timeline.value} 
                                    value={timeline.value} 
                                    className="text-[#ECE7E1] focus:bg-[#51AE92]/20 focus:text-[#ECE7E1] cursor-pointer"
                                  >
                                    {timeline.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Contract Duration */}
                        <div className="space-y-2">
                          <Label className="font-['Lato'] text-[#ECE7E1] flex items-center gap-2">
                            Contract Duration <span className="text-[#51AE92]">*</span>
                          </Label>
                          <Select
                            value={proposalFormData.contractDuration}
                            onValueChange={(value) => setProposalFormData({ ...proposalFormData, contractDuration: value })}
                          >
                            <SelectTrigger className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] focus:border-[#51AE92] focus:ring-[#51AE92]/20 h-12 rounded-lg">
                              <SelectValue placeholder="Select contract duration" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1A1A1A] border-[#ECE7E1]/10 z-[200]">
                              {contractDurations.map(duration => (
                                <SelectItem 
                                  key={duration.value} 
                                  value={duration.value} 
                                  className="text-[#ECE7E1] focus:bg-[#51AE92]/20 focus:text-[#ECE7E1] cursor-pointer"
                                >
                                  {duration.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Additional Details */}
                        <div className="space-y-2">
                          <Label htmlFor="prop-details" className="font-['Lato'] text-[#ECE7E1]">
                            Project Details <span className="text-[#ECE7E1]/40 text-sm">(Optional)</span>
                          </Label>
                          <Textarea
                            id="prop-details"
                            name="details"
                            placeholder="Tell us more about your project, goals, and any specific requirements..."
                            value={proposalFormData.details}
                            onChange={handleProposalChange}
                            className="font-['Lato'] bg-[#0A0A0A]/80 border-[#ECE7E1]/10 text-[#ECE7E1] placeholder:text-[#ECE7E1]/30 focus:border-[#51AE92] focus:ring-[#51AE92]/20 min-h-[120px] rounded-lg resize-none transition-all"
                          />
                        </div>

                        {/* Billboard Advertising Toggle */}
                        <div className="space-y-4 p-5 rounded-xl border border-[#ECE7E1]/10 bg-[#0A0A0A]/40">
                          <div className="space-y-2">
                            <label className="flex items-center gap-3 cursor-pointer">
                              <Checkbox
                                id="billboard-toggle"
                                checked={proposalFormData.interestedInBillboard}
                                onCheckedChange={(checked) => {
                                  setProposalFormData(prev => ({
                                    ...prev,
                                    interestedInBillboard: checked as boolean,
                                    selectedBillboards: checked ? prev.selectedBillboards : [],
                                  }));
                                }}
                                className="border-[#ECE7E1]/20 data-[state=checked]:bg-[#7F2C4C] data-[state=checked]:border-[#7F2C4C]"
                              />
                              <Label htmlFor="billboard-toggle" className="font-['Lato'] text-[#ECE7E1] text-base cursor-pointer">
                                Interested in Billboard Advertising?
                              </Label>
                            </label>
                            <p className="font-['Lato'] text-[#ECE7E1]/60 text-sm ml-9">
                              Get pricing for prime billboard locations in your area
                            </p>
                          </div>

                          {/* Billboard Locations - Show when toggle is on */}
                          {proposalFormData.interestedInBillboard && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-3 pt-3 border-t border-[#ECE7E1]/10"
                            >
                              <Label className="font-['Lato'] text-[#ECE7E1]/80 text-sm">
                                Select Billboard Locations (Choose all that apply)
                              </Label>
                              <div className="grid md:grid-cols-2 gap-3">
                                {billboardLocations.map(billboard => (
                                  <label
                                    key={billboard.id}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#ECE7E1]/5 cursor-pointer transition-colors border border-[#ECE7E1]/5"
                                  >
                                    <Checkbox
                                      checked={proposalFormData.selectedBillboards.includes(billboard.id)}
                                      onCheckedChange={() => handleBillboardToggle(billboard.id)}
                                      className="border-[#ECE7E1]/20 data-[state=checked]:bg-[#7F2C4C] data-[state=checked]:border-[#7F2C4C]"
                                    />
                                    <div className="flex-1">
                                      <span className="font-['Lato'] text-[#ECE7E1] text-sm">
                                        {billboard.label} <span className="text-[#ECE7E1]/50">({billboard.size})</span>
                                      </span>
                                    </div>
                                  </label>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                          type="submit"
                          disabled={isProposalSubmitting}
                          className="w-full bg-[#51AE92] text-[#ECE7E1] h-14 rounded-lg group flex items-center justify-center gap-3 transition-all font-['Lato'] relative overflow-hidden mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
                          whileHover={
                            !isProposalSubmitting
                              ? { 
                                  scale: 1.02,
                                  backgroundColor: '#469E83',
                                }
                              : undefined
                          }
                          whileTap={!isProposalSubmitting ? { scale: 0.98 } : undefined}
                        >
                          <span className="relative z-10 text-lg">
                            {isProposalSubmitting ? 'Sending…' : 'Request Proposal'}
                          </span>
                          <Send className="relative w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform z-10" />
                        </motion.button>
                        {proposalError && (
                          <p className="font-['Lato'] text-[#FF7A7A] text-sm text-center">
                            {proposalError}
                          </p>
                        )}
                      </form>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}