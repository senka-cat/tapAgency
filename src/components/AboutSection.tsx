import { motion, useInView } from 'motion/react';
import { Zap, Target, Rocket, Sparkles } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { icon: Zap, value: 100, suffix: '%', label: 'Designed with Intention' },
  { icon: Target, value: 5, suffix: 'sec', label: 'To Catch Attention' },
  { icon: Rocket, value: 120, suffix: '+', label: 'Campaigns Optimized' },
  { icon: Sparkles, value: 80, suffix: '%', label: 'Avg. Strategy Success Rate' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(increment * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-white">
      {count}{suffix}
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative py-32 bg-zinc-950">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-yellow-400" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6 rounded-full border border-cyan-500/30 bg-cyan-500/10">
              <span className="text-cyan-400 text-xs md:text-sm font-['Lato'] tracking-wide">STUDIO</span>
            </div>

            <h2 className="mb-6 text-white">
              We're Not Your Average Agency
            </h2>

            <div className="space-y-4 text-zinc-400 text-lg leading-relaxed">
              <p>
                We're a collective of strategists, designers, and storytellers who believe that great marketing isn't just about selling—it's about creating experiences that resonate.
              </p>
              <p>
                From bold brand identities to viral campaigns, we blend retro inspiration with cutting-edge creativity to help brands stand out in a crowded digital landscape.
              </p>
              <p>
                Our secret? We don't follow trends. We create them.
              </p>
            </div>
          </motion.div>

          {/* Right side - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="relative group"
                >
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-full transition-all duration-300 group-hover:border-fuchsia-500/50 group-hover:shadow-lg group-hover:shadow-fuchsia-500/20">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 border border-fuchsia-500/30">
                        <Icon className="w-6 h-6 text-fuchsia-400" />
                      </div>
                    </div>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    <div className="text-sm text-zinc-500">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
