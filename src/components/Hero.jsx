import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, MapPin, Phone, Code2 } from 'lucide-react'

const ROLES = [
  'Full Stack Developer',
  'Django & MERN Engineer',
  'RESTful API Developer',
  'Govt. Project Contributor',
  'CS Student @ VITS RGPV',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const target = ROLES[roleIndex]
    let t
    if (!deleting && displayed.length < target.length) {
      t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 75)
    } else if (!deleting && displayed.length === target.length) {
      t = setTimeout(() => setDeleting(true), 2400)
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting) {
      setDeleting(false)
      setRoleIndex(i => (i + 1) % ROLES.length)
    }
    return () => clearTimeout(t)
  }, [displayed, deleting, roleIndex])

  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 530)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Orbs */}
      <motion.div
        animate={{ x: [0, 25, 0], y: [0, -25, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="orb w-[420px] h-[420px] bg-primary/7 top-16 -left-24"
      />
      <motion.div
        animate={{ x: [0, -18, 0], y: [0, 18, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="orb w-72 h-72 bg-secondary/7 bottom-24 -right-12"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left */}
        <div>
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/25 bg-accent/5 text-accent text-xs font-mono mb-7"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Open to opportunities · Available now
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.65 }}
            className="text-5xl md:text-[4.2rem] font-black leading-[1.08] mb-5"
          >
            <span className="block text-white/85 text-3xl md:text-4xl font-semibold mb-1">Hi, I'm</span>
            <span className="glitch block text-gradient" data-text="Gaurav">Gaurav</span>
            <span className="block text-white/90">Shrivastava</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="flex items-center gap-2 mb-2 h-9"
          >
            <span className="text-primary/50 font-mono text-lg">›</span>
            <span className="text-xl md:text-2xl font-mono font-semibold text-primary">
              {displayed}
              <span style={{ opacity: blink ? 1 : 0 }} className="text-accent ml-0.5">_</span>
            </span>
          </motion.div>

          {/* Location pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-1.5 text-white/35 text-xs font-mono mb-7"
          >
            <MapPin size={11} />
            Satna, MP, India · +91 70899 55082
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-white/50 text-sm leading-relaxed max-w-[480px] mb-8"
          >
            CS undergrad building real-world, production-grade web apps — from a
            <span className="text-primary/80"> Pan-India government portal</span> for the RPF to peer-to-peer
            platforms with real-time features. I care about code that actually works, scales, and doesn't break at 2 AM.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.82 }}
            className="flex flex-wrap gap-3 mb-9"
          >
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-dark font-bold text-sm overflow-hidden hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.03] transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Code2 size={15} />
                See My Work
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <a
              href="/Gaurav_Shrivastava_Resume.pdf"
              download
              className="px-6 py-3 rounded-xl border border-white/10 text-white/65 font-semibold text-sm hover:border-primary/40 hover:text-white hover:bg-primary/5 transition-all duration-300"
            >
              Download CV
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95 }}
            className="flex items-center gap-3"
          >
            {[
              { icon: Github, href: 'https://github.com', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:gauravshrivastava.web@gmail.com', label: 'Email' },
              { icon: Phone, href: 'tel:+917089955082', label: 'Phone' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={label !== 'Phone' && label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/8 flex items-center justify-center text-white/35 hover:text-primary hover:border-primary/35 hover:bg-primary/5 transition-all duration-300 hover:shadow-md hover:shadow-primary/15"
                aria-label={label}
              >
                <Icon size={15} />
              </a>
            ))}
            <div className="w-px h-4 bg-white/10 mx-1" />
            <span className="text-white/20 text-[11px] font-mono">gauravshrivastava.web@gmail.com</span>
          </motion.div>
        </div>

        {/* Right: floating code card */}
        <motion.div
          initial={{ opacity: 0, x: 45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.75 }}
          className="hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <div className="glass neon-border rounded-2xl overflow-hidden shadow-2xl shadow-primary/8">
              {/* Window bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/55" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/55" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/55" />
                <span className="text-white/18 text-xs font-mono ml-2">gaurav.py</span>
              </div>
              {/* Code content */}
              <div className="p-6 font-mono text-[13px] leading-7">
                <div><span className="text-secondary">class</span> <span className="text-primary">Developer</span><span className="text-white/40">:</span></div>
                <div className="pl-6 mt-1">
                  <div><span className="text-secondary">def</span> <span className="text-accent">__init__</span><span className="text-white/40">(self):</span></div>
                  <div className="pl-6">
                    <div><span className="text-white/50">self.</span><span className="text-orange-300/80">name</span> <span className="text-white/40">=</span> <span className="text-green-300/75">"Gaurav Shrivastava"</span></div>
                    <div><span className="text-white/50">self.</span><span className="text-orange-300/80">age</span> <span className="text-white/40">=</span> <span className="text-yellow-300/70">20</span></div>
                    <div><span className="text-white/50">self.</span><span className="text-orange-300/80">stack</span> <span className="text-white/40">=</span> <span className="text-white/40">[</span></div>
                    <div className="pl-4"><span className="text-green-300/75">"Django"</span><span className="text-white/40">,</span> <span className="text-green-300/75">"React"</span><span className="text-white/40">,</span></div>
                    <div className="pl-4"><span className="text-green-300/75">"Node.js"</span><span className="text-white/40">,</span> <span className="text-green-300/75">"PostgreSQL"</span></div>
                    <div><span className="text-white/40">]</span></div>
                    <div><span className="text-white/50">self.</span><span className="text-orange-300/80">location</span> <span className="text-white/40">=</span> <span className="text-green-300/75">"Satna, MP 🇮🇳"</span></div>
                    <div><span className="text-white/50">self.</span><span className="text-orange-300/80">available</span> <span className="text-white/40">=</span> <span className="text-accent">True</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-5 glass neon-border px-3 py-2 rounded-xl text-xs font-mono text-accent flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Govt. of India Projects
            </motion.div>

            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              className="absolute -bottom-4 -left-5 glass neon-border px-3 py-2 rounded-xl text-xs font-mono text-primary flex items-center gap-2"
            >
              <Code2 size={11} />
              B.Tech CSE · CGPA 7.0
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/25 text-[11px] font-mono"
      >
        <span>scroll down</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ArrowDown size={13} />
        </motion.div>
      </motion.div>
    </section>
  )
}
