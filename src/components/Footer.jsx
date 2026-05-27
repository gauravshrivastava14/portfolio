import { motion } from 'framer-motion'
import { ArrowUp, Github, Linkedin, Mail, Phone } from 'lucide-react'

const links = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:gauravshrivastava.web@gmail.com', label: 'Email' },
  { icon: Phone, href: 'tel:+917089955082', label: 'Phone' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <div className="font-mono font-bold text-gradient-blue text-lg mb-1">Gaurav Shrivastava</div>
            <div className="text-[12px] text-white/28 font-mono">Full Stack Developer · Satna, MP, India</div>
          </div>

          <div className="flex items-center gap-3">
            {links.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-white/35 hover:text-primary hover:border-primary/35 hover:bg-primary/5 transition-all duration-300"
                aria-label={label}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-white/22 font-mono">            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-white/35 hover:text-primary hover:border-primary/35 hover:bg-primary/5 transition-all duration-300"
            >
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
