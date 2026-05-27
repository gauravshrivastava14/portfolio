import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const categories = [
  {
    label: 'Frontend',
    color: '#00d4ff',
    skills: [
      { name: 'React.js', level: 82 },
      { name: 'HTML5 / CSS3', level: 90 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'JavaScript (ES6+)', level: 85 },
      { name: 'Responsive UI Design', level: 87 },
    ],
  },
  {
    label: 'Backend',
    color: '#7c3aed',
    skills: [
      { name: 'Django (Python)', level: 88 },
      { name: 'Node.js / Express.js', level: 82 },
      { name: 'PHP', level: 74 },
      { name: 'RESTful APIs', level: 90 },
      { name: 'JWT / RBAC / MVC', level: 85 },
    ],
  },
  {
    label: 'Databases',
    color: '#06ffa5',
    skills: [
      { name: 'PostgreSQL', level: 82 },
      { name: 'MySQL', level: 76 },
      { name: 'MongoDB', level: 78 },
      { name: 'Database Design', level: 80 },
      { name: 'SQL Queries', level: 84 },
    ],
  },
  {
    label: 'Tools & DevOps',
    color: '#f59e0b',
    skills: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'Netlify / Vercel', level: 82 },
      { name: 'Gunicorn / Nginx', level: 64 },
      { name: 'pgAdmin / VS Code', level: 88 },
      { name: 'Python', level: 86 },
    ],
  },
]

const techCloud = [
  'Python', 'JavaScript', 'PHP', 'SQL',
  'Django', 'React.js', 'Node.js', 'Express.js',
  'PostgreSQL', 'MySQL', 'MongoDB',
  'REST APIs', 'JWT', 'RBAC', 'MVC',
  'HTML5', 'CSS3', 'Tailwind CSS',
  'Git', 'GitHub', 'Netlify', 'Vercel', 'Gunicorn', 'Nginx',
]

function SkillBar({ name, level, color, index, inView }) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[13px] text-white/65 group-hover:text-white/90 transition-colors duration-200">{name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.55 }}
          className="text-[11px] font-mono"
          style={{ color }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 0.9, delay: index * 0.07 + 0.25, ease: [0.25, 1, 0.5, 1] }}
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${color}70, ${color})` }}
        >
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"
            style={{ boxShadow: `0 0 8px ${color}` }}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="skills" ref={ref} className="relative py-28 overflow-hidden">
      <div className="orb w-[480px] h-[480px] bg-secondary/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-14"
        >
          <span className="text-primary font-mono text-sm">02.</span>
          <h2 className="text-4xl md:text-5xl font-black text-white">Skills</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
        </motion.div>

        {/* Tech cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap gap-2 mb-14 justify-center"
        >
          {techCloud.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.03 }}
              whileHover={{ scale: 1.1, y: -3 }}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono glass neon-border text-white/55 hover:text-primary hover:border-primary/40 transition-all duration-200 cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Skill bars */}
        <div className="grid md:grid-cols-2 gap-7">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.11 }}
              className="glass neon-border rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-6 rounded-full" style={{ background: cat.color }} />
                <h3 className="font-bold text-white/90 text-[13px] tracking-widest uppercase">{cat.label}</h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((s, si) => (
                  <SkillBar key={s.name} {...s} color={cat.color} index={si} inView={inView} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Language bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-7 glass neon-border rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-2 h-6 rounded-full bg-gradient-to-b from-primary to-secondary" />
            <h3 className="font-bold text-white/90 text-[13px] tracking-widest uppercase">Languages</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { lang: 'English', level: 'Professional Working Proficiency', pct: 85 },
              { lang: 'Hindi', level: 'Native / Fluent', pct: 100 },
            ].map(({ lang, level, pct }) => (
              <div key={lang}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm text-white/75 font-medium">{lang}</span>
                  <span className="text-[11px] text-white/35 font-mono">{level}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : {}}
                    transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
