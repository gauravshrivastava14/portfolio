import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BookOpen, Shield, Zap, Users } from 'lucide-react'

const stats = [
  { value: '2', label: 'Govt. Portals Built' },
  { value: '4+', label: 'Tech Stacks' },
  { value: '7.0', label: 'Academic CGPA' },
  { value: '3+', label: 'Years Coding' },
]

const traits = [
  {
    icon: Shield,
    title: 'Security-First Mindset',
    desc: 'Designed RBAC systems for national-level government portals — security isn\'t an afterthought, it\'s the foundation.',
  },
  {
    icon: BookOpen,
    title: 'Self-Sufficient Builder',
    desc: 'Built complete frontend, backend, and database architectures independently — from auth systems to production deployment.',
  },
  {
    icon: Zap,
    title: 'Practical Over Theoretical',
    desc: 'Government deadlines and real user bases teach you what academic projects don\'t. I write code that survives production.',
  },
  {
    icon: Users,
    title: 'Structured Collaboration',
    desc: 'Worked directly under Inspector General-level supervision on national projects — I know how to operate in high-accountability environments.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.11, duration: 0.55, ease: 'easeOut' } }),
}

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 })

  return (
    <section id="about" ref={ref} className="relative py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-primary font-mono text-sm">01.</span>
          <h2 className="text-4xl md:text-5xl font-black text-white">About Me</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          {/* Bio */}
          <div className="space-y-5">
            {[
              `I'm a 21-year-old Computer Science undergraduate at Vindhya Institute of Technology and Science (RGPV), Satna — and I've already shipped two production systems for the Government of India. Not side projects. Real portals used by actual officers at the national level.`,
              `The PRATHAM portal I built for the Railway Protection Force handles training and HR aptitude data for a Pan-India deployment. I designed the entire system — Django backend, PostgreSQL schema, role-based access for Zonal, Divisional, and Post-level users — working directly under the IG, RPF Lucknow.`,
              `I don't wait to "feel ready." I pick up what the project needs — whether that's Django, PHP, React, or raw PostgreSQL — and I ship. That's the only way to build things that matter before your degree is done.`,
            ].map((text, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                className="text-white/52 leading-relaxed text-[15px]"
              >
                {text}
              </motion.p>
            ))}

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="pt-5 grid grid-cols-2 gap-3"
            >
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="glass neon-border rounded-xl p-4 text-center group hover:border-primary/35 transition-all duration-300"
                >
                  <div className="text-3xl font-black text-gradient mb-1">{value}</div>
                  <div className="text-[11px] text-white/38 font-mono tracking-wide">{label}</div>
                </div>
              ))}
            </motion.div>

            {/* Quick facts */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="glass rounded-xl p-4 border border-white/6"
            >
              <div className="grid grid-cols-2 gap-2 text-[12px] font-mono">
                {[
                  ['DOB', '14 April 2005'],
                  ['Location', 'Satna, MP, India'],
                  ['Degree', 'B.Tech CSE (2022–26)'],
                  ['University', 'VITS, RGPV'],
                  ['Email', 'gauravshrivastava.web@gmail.com'],
                  ['Phone', '+91 70899 55082'],
                ].map(([key, val]) => (
                  <div key={key} className="flex flex-col gap-0.5">
                    <span className="text-white/25">{key}</span>
                    <span className="text-white/65 truncate">{val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Trait cards */}
          <div className="grid gap-4">
            {traits.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                whileHover={{ x: 5 }}
                className="glass glass-hover neon-border rounded-xl p-5 flex items-start gap-4 cursor-default"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/15 to-secondary/15 border border-primary/15 flex items-center justify-center shrink-0">
                  <Icon size={17} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1 text-[15px]">{title}</h3>
                  <p className="text-white/42 text-[13px] leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
