import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, Mail, Phone, MapPin, Github, Linkedin, CheckCircle } from 'lucide-react'

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'gauravshrivastava.web@gmail.com', href: 'mailto:gauravshrivastava.web@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 70899 55082', href: 'tel:+917089955082' },
  { icon: MapPin, label: 'Location', value: 'Satna, MP, India', href: null },
  { icon: Github, label: 'GitHub', value: 'github.com/gaurav', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/gaurav', href: 'https://linkedin.com' },
]

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(null)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 4500)
  }

  const inputClass = name =>
    `w-full bg-white/3 border rounded-xl px-4 py-3.5 text-[13px] text-white placeholder-white/22 outline-none transition-all duration-300 font-mono ${
      focused === name
        ? 'border-primary/45 shadow-lg shadow-primary/8 bg-white/4'
        : 'border-white/7 hover:border-white/14'
    }`

  return (
    <section id="contact" ref={ref} className="relative py-28 overflow-hidden">
      <div className="orb w-80 h-80 bg-primary/4 bottom-0 left-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-primary font-mono text-sm">05.</span>
          <h2 className="text-4xl md:text-5xl font-black text-white">Get In Touch</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.18 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Let's work together</h3>
              <p className="text-white/45 leading-relaxed text-[13px]">
                I'm a B.Tech student who ships real government and personal projects.
                If you have an interesting problem, a role, or just want to connect — reach out.
                I reply within 24 hours.
              </p>
            </div>

            <div className="space-y-2.5">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/6 hover:border-primary/28 hover:bg-primary/4 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/4 flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                      <Icon size={14} className="text-white/45 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-white/25 font-mono">{label}</div>
                      <div className="text-[13px] text-white/65 group-hover:text-white transition-colors truncate">{value}</div>
                    </div>
                  </a>
                ) : (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/6"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/4 flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-white/35" />
                    </div>
                    <div>
                      <div className="text-[10px] text-white/25 font-mono">{label}</div>
                      <div className="text-[13px] text-white/55">{value}</div>
                    </div>
                  </div>
                )
              ))}
            </div>

            <div className="glass neon-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent text-[11px] font-mono">Available for work</span>
              </div>
              <p className="text-white/35 text-[12px] leading-relaxed">
                Open to full-time roles, freelance projects, and internships.
                Currently pursuing B.Tech (graduating May 2026).
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.28 }}
            className="lg:col-span-3"
          >
            <div className="glass neon-border rounded-2xl p-7">
              {sent ? (
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center h-60 gap-4 text-center"
                >
                  <CheckCircle size={44} className="text-accent" />
                  <h3 className="text-lg font-bold text-white">Message sent!</h3>
                  <p className="text-white/40 text-[13px]">I'll get back to you at gauravshrivastava.web@gmail.com within 24h.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'name', label: 'Name', placeholder: 'Your name', type: 'text' },
                      { name: 'email', label: 'Email', placeholder: 'your@email.com', type: 'email' },
                    ].map(field => (
                      <div key={field.name}>
                        <label className="block text-[11px] text-white/32 font-mono mb-1.5 ml-0.5">{field.label}</label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={form[field.name]}
                          onChange={handleChange}
                          onFocus={() => setFocused(field.name)}
                          onBlur={() => setFocused(null)}
                          placeholder={field.placeholder}
                          required
                          className={inputClass(field.name)}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[11px] text-white/32 font-mono mb-1.5 ml-0.5">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      onFocus={() => setFocused('subject')}
                      onBlur={() => setFocused(null)}
                      placeholder="Job opportunity / Project collaboration / Just saying hi"
                      required
                      className={inputClass('subject')}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-white/32 font-mono mb-1.5 ml-0.5">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      placeholder="Tell me what you're working on..."
                      rows={5}
                      required
                      className={inputClass('message') + ' resize-none'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-dark font-bold text-sm flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.01] transition-all duration-300 disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
