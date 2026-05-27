import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User, Sparkles, ChevronDown } from 'lucide-react'

// ─── Knowledge base ─────────────────────────────────────────────────────────

const SUGGESTED = [
  'What can you build?',
  'Tell me about PRATHAM',
  "What's your tech stack?",
  'Are you available to hire?',
  'How to contact Gaurav?',
]

const rules = [
  {
    keys: ['hello', 'hi', 'hey', 'sup', 'yo', 'greet', 'start'],
    reply: () => `Hey there! 👋 I'm Gaurav's portfolio assistant. I can tell you about his projects, skills, experience, or how to get in touch. What would you like to know?`,
  },
  {
    keys: ['who', 'about', 'gaurav', 'yourself', 'introduce', 'tell me'],
    reply: () => `Gaurav Shrivastava is a 20-year-old Full Stack Developer and B.Tech CSE student at Vindhya Institute of Technology (RGPV), Satna, MP.\n\nHe's already shipped two production systems for the **Government of India** — including PRATHAM, a Pan-India portal for the Railway Protection Force. He builds with Django, React, Node.js, PostgreSQL, and PHP.`,
  },
  {
    keys: ['skill', 'tech', 'stack', 'know', 'language', 'framework', 'use', 'proficient'],
    reply: () => `Here's Gaurav's core stack:\n\n**Languages:** Python, JavaScript, PHP, SQL\n**Frontend:** React.js, HTML5, CSS3, Tailwind CSS\n**Backend:** Django, Node.js, Express.js, PHP\n**Databases:** PostgreSQL, MySQL, MongoDB\n**APIs:** REST, JWT Auth, RBAC, MVC\n**Tools:** Git, Gunicorn, Nginx, Netlify, Vercel, pgAdmin`,
  },
  {
    keys: ['pratham', 'rpf', 'railway', 'government', 'govt', 'national', 'portal'],
    reply: () => `**PRATHAM** is a Pan-India web portal Gaurav built for the **Railway Protection Force (RPF), Govt. of India** 🇮🇳\n\nHe designed the entire system independently:\n• Django backend + PostgreSQL\n• Role-based access for Zonal, Divisional & Post-level officers\n• Secure JWT authentication\n• Responsive UI for field deployment\n\nBuilt under the supervision of the **Inspector General, RPF Lucknow** — reporting up to the Director General, RPF. Source code is restricted (government project).`,
  },
  {
    keys: ['skillswap', 'skill swap', 'peer', 'learning', 'socket', 'realtime', 'real-time', 'chat'],
    reply: () => `**SkillSwap** is a peer-to-peer skill learning platform Gaurav built as a personal project.\n\n• Smart user matching for skill exchange\n• Real-time chat via **Socket.IO**\n• JWT auth, user roles, ratings & profiles\n• RESTful APIs + scheduling workflows\n• Built with React, Node.js, Express, MongoDB, Tailwind CSS\n\nFocused on clean architecture from DB design to deployment.`,
  },
  {
    keys: ['udyami', 'bharat', 'npc', 'industry', 'atma nirbhar', 'php', 'mysql'],
    reply: () => `**Udyami Bharat 4.0** is a government initiative under the **National Productivity Council (NPC)**, part of the Atma Nirbhar Bharat program.\n\nGaurav built backend modules supporting Industry 4.0 objectives using **PHP and MySQL**, ensuring security, data integrity, and compliance with government delivery standards. Based in Delhi.`,
  },
  {
    keys: ['project', 'built', 'work', 'portfolio', 'showcase', 'demo'],
    reply: () => `Gaurav has 4 notable projects:\n\n1. **PRATHAM** — Pan-India govt. portal for RPF (Django + PostgreSQL)\n2. **SkillSwap** — P2P learning platform (MERN + Socket.IO)\n3. **Udyami Bharat 4.0** — Govt. backend module (PHP + MySQL)\n4. **This Portfolio** — Built with React 18 + Tailwind + Framer Motion\n\nWant details on any specific one?`,
  },
  {
    keys: ['experience', 'job', 'work history', 'company', 'intern', 'employment'],
    reply: () => `Gaurav has 2 active work engagements, both since **July 2025**:\n\n1. **Full Stack Developer** — PRATHAM, RPF / Govt. of India (Lucknow)\n2. **Backend Developer** — Udyami Bharat 4.0, NPC (Delhi)\n\nBoth are national government projects under the Atma Nirbhar Bharat ecosystem.`,
  },
  {
    keys: ['education', 'college', 'university', 'degree', 'study', 'cgpa', 'gpa', 'btech', 'b.tech', 'vits', 'rgpv'],
    reply: () => `**B.Tech in Computer Science Engineering**\nVindhya Institute of Technology and Science, Satna (RGPV)\n📅 Jan 2022 – May 2026 · CGPA: **7.0** (up to 7th Semester)\n\nPreviously:\n• Class XII — Blooms Academy, Satna (2022)\n• Class X — Little Flower Public High School, Satna (2020)`,
  },
  {
    keys: ['contact', 'reach', 'email', 'phone', 'message', 'connect', 'get in touch', 'linkedin', 'github'],
    reply: () => `You can reach Gaurav here:\n\n📧 gauravshrivastava.web@gmail.com\n📞 +91 70899 55082\n📍 Satna, MP, India\n🔗 github.com/gauravshrivastava14\n\nOr use the **Contact section** on this page — he replies within 24 hours.`,
  },
  {
    keys: ['hire', 'available', 'open', 'opportunity', 'freelance', 'job', 'role', 'recruit', 'vacancy'],
    reply: () => `Yes! Gaurav is currently **open to opportunities** 🟢\n\nHe's available for:\n• Full-time roles (Software Engineer / Full Stack Dev)\n• Freelance / contract projects\n• Internships\n• Interesting collaborations\n\nHe graduates in **May 2026**. You can message him at gauravshrivastava.web@gmail.com or use the Contact section below.`,
  },
  {
    keys: ['django', 'python', 'backend', 'api', 'rest', 'server'],
    reply: () => `Django is Gaurav's primary backend framework. He's used it in production for PRATHAM — a national government portal — including:\n\n• Custom ORM queries and schema design\n• JWT-based authentication\n• Role-based access control (RBAC)\n• Gunicorn + production deployment\n\nHe also builds backends with Node.js / Express.js.`,
  },
  {
    keys: ['react', 'frontend', 'ui', 'tailwind', 'css', 'design'],
    reply: () => `Gaurav builds frontends with **React.js** and **Tailwind CSS**, focusing on responsive, device-agnostic UIs.\n\nThis very portfolio is a React 18 + Tailwind + Framer Motion app — all the animations, transitions, and glassmorphism cards are hand-built by him.`,
  },
  {
    keys: ['database', 'postgres', 'postgresql', 'mysql', 'mongodb', 'sql', 'db'],
    reply: () => `Gaurav works with all three major database types:\n\n• **PostgreSQL** — primary for government projects (PRATHAM)\n• **MySQL** — used in Udyami Bharat 4.0\n• **MongoDB** — used in SkillSwap (MERN stack)\n\nHe's comfortable with schema design, migrations, and query optimization.`,
  },
  {
    keys: ['location', 'satna', 'india', 'where', 'based', 'city'],
    reply: () => `Gaurav is based in **Satna, Madhya Pradesh, India** 🇮🇳\n\nHe's worked remotely on Delhi-based government projects and is open to remote roles globally or relocation for the right opportunity.`,
  },
  {
    keys: ['age', 'old', 'born', 'dob', 'young'],
    reply: () => `Gaurav was born on **14 April 2005**, making him 20 years old. He's already shipped production government systems at that age — which is kind of remarkable.`,
  },
  {
    keys: ['fun', 'hobby', 'interest', 'outside', 'free time', 'passion'],
    reply: () => `Outside of coding, Gaurav is curious about distributed systems, clean architecture patterns, and how large-scale government systems work under the hood.\n\nHe believes the best engineers stay uncomfortable — always picking up what the project needs, not just what they already know.`,
  },
]

const FALLBACK = [
  `Hmm, I'm not sure about that one. Try asking about Gaurav's **projects**, **skills**, **experience**, or **contact info**!`,
  `I didn't quite catch that. You can ask me things like "What tech does Gaurav use?" or "Tell me about PRATHAM".`,
  `That's outside what I know! Try: "Is Gaurav available to hire?" or "What is SkillSwap?"`,
]

function getReply(input) {
  const lower = input.toLowerCase()
  for (const rule of rules) {
    if (rule.keys.some(k => lower.includes(k))) {
      return rule.reply()
    }
  }
  return FALLBACK[Math.floor(Math.random() * FALLBACK.length)]
}

// ─── Message bubble ──────────────────────────────────────────────────────────

function Bubble({ msg }) {
  const isBot = msg.role === 'bot'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`flex gap-2.5 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center ${
        isBot
          ? 'bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/25'
          : 'bg-white/8 border border-white/10'
      }`}>
        {isBot ? <Bot size={13} className="text-primary" /> : <User size={13} className="text-white/60" />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap ${
        isBot
          ? 'bg-white/5 border border-white/8 text-white/80 rounded-tl-sm'
          : 'bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 text-white rounded-tr-sm'
      }`}>
        {msg.text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={i} className={isBot ? 'text-white font-semibold' : 'text-primary font-semibold'}>{part.slice(2, -2)}</strong>
            : part
        )}
      </div>
    </motion.div>
  )
}

function TypingDots() {
  return (
    <div className="flex gap-2.5">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/25 flex items-center justify-center shrink-0">
        <Bot size={13} className="text-primary" />
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/5 border border-white/8 flex items-center gap-1.5">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary/60"
          />
        ))}
      </div>
    </div>
  )
}

// ─── Main chatbot ─────────────────────────────────────────────────────────────

const GREETING = {
  role: 'bot',
  id: 0,
  text: `Hi! I'm Gaurav's AI assistant 🤖\n\nI can answer questions about his **skills**, **projects** (PRATHAM, SkillSwap), **experience**, or how to **get in touch**.\n\nWhat would you like to know?`,
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(0)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = async (text) => {
    if (!text.trim()) return
    const userMsg = { role: 'user', id: Date.now(), text: text.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)

    const delay = 600 + Math.random() * 700
    setTimeout(() => {
      const reply = getReply(text)
      setTyping(false)
      setMessages(prev => [...prev, { role: 'bot', id: Date.now() + 1, text: reply }])
      if (!open) setUnread(u => u + 1)
    }, delay)
  }

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <>
      {/* Toggle button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!open && unread > 0 && (
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent text-dark text-[10px] font-bold flex items-center justify-center z-10"
            >
              {unread}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setOpen(o => !o)}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-shadow duration-300"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={22} className="text-dark" />
              </motion.div>
            ) : (
              <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <MessageSquare size={22} className="text-dark" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Pulse ring when closed */}
        {!open && (
          <div className="absolute inset-0 rounded-2xl border-2 border-primary/40 animate-ping pointer-events-none" />
        )}
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[390px] flex flex-col"
            style={{ maxHeight: 'min(540px, calc(100vh - 120px))' }}
          >
            <div className="glass neon-border rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-primary/10 h-full">
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/6 bg-gradient-to-r from-primary/8 to-secondary/8 shrink-0">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/25 flex items-center justify-center">
                  <Sparkles size={15} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-[13px]">Gaurav's Assistant</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/35 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Online · Ask me anything
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
                >
                  <ChevronDown size={14} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
                {messages.map(msg => <Bubble key={msg.id} msg={msg} />)}
                {typing && <TypingDots />}
                <div ref={bottomRef} />
              </div>

              {/* Suggestions */}
              {messages.length <= 2 && (
                <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide shrink-0">
                  {SUGGESTED.map(q => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="shrink-0 text-[11px] px-3 py-1.5 rounded-full border border-primary/20 text-primary/70 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 font-mono whitespace-nowrap"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-3 pb-3 pt-2 border-t border-white/6 shrink-0">
                <div className="flex items-center gap-2 bg-white/4 border border-white/8 rounded-xl px-3 py-2 focus-within:border-primary/35 transition-colors">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Ask about skills, projects..."
                    className="flex-1 bg-transparent text-[13px] text-white placeholder-white/22 outline-none font-mono"
                    disabled={typing}
                  />
                  <button
                    onClick={() => send(input)}
                    disabled={!input.trim() || typing}
                    className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center disabled:opacity-30 hover:shadow-md hover:shadow-primary/30 transition-all"
                  >
                    <Send size={12} className="text-dark" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
