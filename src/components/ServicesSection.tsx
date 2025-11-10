import { motion } from 'motion/react';
import { Palette, Megaphone, Share2, Globe } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Branding',
    description: 'From logos to full brand identities, we create visual systems that tell your story and make you impossible to ignore.',
    color: 'fuchsia',
    gradient: 'from-fuchsia-500 to-pink-500',
  },
  {
    icon: Megaphone,
    title: 'Campaigns',
    description: 'Strategic, creative, and results-driven campaigns that cut through the noise and drive real engagement.',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Share2,
    title: 'Social Media',
    description: 'Build your community with content that sparks conversations, drives shares, and keeps your audience coming back.',
    color: 'yellow',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Globe,
    title: 'Web Design',
    description: 'Beautiful, functional websites that blend stunning design with seamless user experiences.',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-500',
  },
];

const colorMap = {
  fuchsia: 'group-hover:border-fuchsia-500/50 group-hover:shadow-fuchsia-500/20',
  cyan: 'group-hover:border-cyan-500/50 group-hover:shadow-cyan-500/20',
  yellow: 'group-hover:border-yellow-400/50 group-hover:shadow-yellow-400/20',
  emerald: 'group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/20',
};

export function ServicesSection() {
  return (
    <section className="relative py-32 bg-zinc-900">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 mb-6 rounded-full border border-yellow-400/30 bg-yellow-400/10">
              <span className="text-yellow-400">What We Do</span>
            </div>

            <h2 className="mb-6 text-white max-w-3xl mx-auto">
              Services That Transform Brands
            </h2>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              We offer a full spectrum of creative services designed to elevate your brand and drive meaningful results.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className={`bg-zinc-950 border border-zinc-800 rounded-2xl p-8 h-full transition-all duration-300 ${colorMap[service.color as keyof typeof colorMap]} group-hover:shadow-xl`}>
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.gradient} bg-opacity-10 border border-zinc-800 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-white">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="mt-6 flex items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                      Learn more →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
