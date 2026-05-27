import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Shield, ArrowRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'PRATHAM',
    subtitle: 'RPF National Portal · Govt. of India',
    description:
      'Pan-India web portal for the Railway Protection Force to manage and analyze training and HR aptitude data. Built the entire system independently — Django backend, PostgreSQL, and role-based access for Zonal, Divisional, and Post-level officers. Deployed under supervision of DG, RPF.',
    stack: ['Django', 'Python', 'PostgreSQL', 'RBAC', 'JWT', 'Gunicorn'],
    color: '#00d4ff',
    badge: 'Government · National',
    isGovt: true,
    github: null,
    live: null,
    note: 'Source code is restricted — government project',
  },
  {
    id: 2,
    title: 'SkillSwap',
    subtitle: 'Full Stack Peer-to-Peer Learning Platform',
    description:
      'Peer-to-peer skill exchange platform where users teach and learn through smart matching. Features JWT auth, user roles, profiles, ratings, real-time chat via Socket.IO, and scheduling workflows. Built with clean architecture from DB design to frontend.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'JWT', 'Tailwind CSS'],
    color: '#7c3aed',
    badge: 'Full Stack · Real-time',
    isGovt: false,
    github: 'https://github.com',
    live: 'https://example.com',
    note: null,
  },
  {
    id: 3,
    title: 'Udyami Bharat 4.0',
    subtitle: 'NPC · Atma Nirbhar Bharat Initiative',
    description:
      'Backend modules for the Udyami Bharat 4.0 initiative under NPC, Delhi — supporting Industry 4.0 objectives. Built with PHP and MySQL, ensuring data integrity, security, and scalability in alignment with government compliance standards.',
    stack: ['PHP', 'MySQL', 'REST APIs', 'MVC Architecture'],
    color: '#f59e0b',
    badge: 'Government · National',
    isGovt: true,
    github: null,
    live: null,
    note: 'Source code is restricted — government project',
  },
  {
    id: 4,
    title: 'Personal Portfolio v1',
    subtitle: 'Developer Portfolio Website',
    description:
      'Personal portfolio to showcase projects, skills, and contact info. Responsive UI, project listings, and live deployment. Previously deployed on Render/Netlify. Now rebuilt with React + Tailwind for a better experience.',
    stack: ['React.js', 'Tailwind CSS', 'Netlify', 'Vite'],
    color: '#06ffa5',
    badge: 'Personal',
    isGovt: false,
    github: 'https://github.com',
    live: 'https://portfolio-h2qi.onrender.com',
    note: null,
  },
]

function ProjectCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 38 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, ease: 'easeOut' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="glass neon-border rounded-2xl overflow-hidden group relative flex flex-col"
      style={{ borderColor: hovered ? project.color + '35' : undefined, transition: 'border-color 0.3s' }}
    >
      {/* Top accent */}
      <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

      {/* Hover glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 0%, ${project.color}07, transparent 55%)` }}
      />

      <div className="p-6 relative z-10 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-full flex items-center gap-1.5"
                style={{ background: project.color + '14', color: project.color }}
              >
                {project.isGovt && <Shield size={9} />}
                {project.badge}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white leading-tight">{project.title}</h3>
            <p className="text-[12px] text-white/38 font-mono mt-0.5 leading-snug">{project.subtitle}</p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 ml-3 shrink-0">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-white/35 hover:text-white hover:border-white/25 transition-all"
                onClick={e => e.stopPropagation()}
              >
                <Github size={14} />
              </a>
            ) : (
              <div className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center text-white/15 cursor-not-allowed" title="Restricted">
                <Shield size={13} />
              </div>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-white/35 hover:text-white hover:border-white/25 transition-all"
                onClick={e => e.stopPropagation()}
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-[13px] text-white/48 leading-relaxed mb-4 flex-1">{project.description}</p>

        {/* Restricted note */}
        {project.note && (
          <div className="mb-4 flex items-center gap-2 text-[11px] text-white/25 font-mono bg-white/3 rounded-lg px-3 py-2 border border-white/6">
            <Shield size={10} />
            {project.note}
          </div>
        )}

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="text-[11px] px-2.5 py-1 rounded-full font-mono border"
              style={{ background: project.color + '0a', color: project.color + 'bb', borderColor: project.color + '18' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="projects" ref={ref} className="relative py-28 overflow-hidden">
      <div className="orb w-80 h-80 bg-primary/4 bottom-0 right-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-5"
        >
          <span className="text-primary font-mono text-sm">03.</span>
          <h2 className="text-4xl md:text-5xl font-black text-white">Projects</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
          className="text-white/38 text-sm font-mono mb-10"
        >
          // 2 government · 2 personal · all production-deployed
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
