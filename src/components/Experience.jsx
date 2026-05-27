import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, GraduationCap, Calendar, MapPin, Shield } from 'lucide-react'

const timeline = [
  {
    type: 'work',
    role: 'Full Stack Developer',
    org: 'PRATHAM · RPF, Govt. of India',
    period: 'Jul 2025 – Present',
    location: 'Lucknow, India',
    points: [
      'Built a Pan-India web portal for Railway Protection Force to manage training and HR aptitude data.',
      'Designed complete frontend, backend, and database architecture independently using Django and PostgreSQL.',
      'Implemented secure, role-based authentication for Zonal, Divisional, and Post-level users.',
      'Worked under the supervision of DG, RPF — national-level compliance and data security standards.',
      'Optimized performance and built a responsive, device-agnostic UI for field officers.',
    ],
    stack: ['Django', 'Python', 'PostgreSQL', 'RBAC', 'JWT', 'Gunicorn'],
    color: '#00d4ff',
    isGovt: true,
  },
  {
    type: 'work',
    role: 'Backend Developer',
    org: 'Udyami Bharat 4.0 · NPC, Atma Nirbhar Bharat',
    period: 'Jul 2025 – Present',
    location: 'Delhi, India',
    points: [
      'Developed backend modules supporting Industry 4.0 objectives under the Atma Nirbhar Bharat initiative.',
      'Ensured application security, data integrity, and scalability using PHP and MySQL.',
      'Operated within a structured government delivery ecosystem — strict QA, compliance, and timelines.',
    ],
    stack: ['PHP', 'MySQL', 'REST APIs', 'MVC'],
    color: '#f59e0b',
    isGovt: true,
  },
  {
    type: 'education',
    role: 'B.Tech in Computer Science Engineering',
    org: 'Vindhya Institute of Technology and Science, Satna · RGPV',
    period: 'Jan 2022 – May 2026',
    location: 'Satna, MP',
    points: [
      'CGPA: 7.0 (up to 7th Semester).',
      'Core subjects: Data Structures, Algorithms, DBMS, OS, Computer Networks.',
      'Built multiple full-stack projects during coursework — PRATHAM and SkillSwap among them.',
    ],
    stack: ['Python', 'C++', 'Java', 'SQL', 'DSA'],
    color: '#7c3aed',
    isGovt: false,
  },
  {
    type: 'education',
    role: 'Senior Secondary · Class XII',
    org: 'Blooms Academy, Satna',
    period: 'Jun 2021 – May 2022',
    location: 'Satna, MP',
    points: ['Completed Class XII with Science stream.'],
    stack: [],
    color: '#06ffa5',
    isGovt: false,
  },
  {
    type: 'education',
    role: 'Secondary · Class X',
    org: 'Little Flower Public High School, Satna',
    period: 'Jun 2019 – May 2020',
    location: 'Satna, MP',
    points: ['Completed Class X from CBSE-affiliated school.'],
    stack: [],
    color: '#06ffa5',
    isGovt: false,
  },
]

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="experience" ref={ref} className="relative py-28 overflow-hidden">
      <div className="orb w-72 h-72 bg-secondary/4 top-24 left-0 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-primary font-mono text-sm">04.</span>
          <h2 className="text-4xl md:text-5xl font-black text-white">Experience</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
        </motion.div>

        <div className="relative">
          {/* Timeline track */}
          <div className="absolute left-[22px] top-4 bottom-4 w-px bg-gradient-to-b from-primary/40 via-secondary/30 to-transparent hidden md:block" />

          <div className="space-y-7">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -28 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.13, ease: 'easeOut' }}
                className="relative md:pl-16"
              >
                {/* Dot */}
                <div
                  className="absolute left-[14px] top-6 w-4 h-4 rounded-full border-2 hidden md:flex items-center justify-center -translate-x-1/2"
                  style={{ borderColor: item.color, background: '#080810', boxShadow: `0 0 10px ${item.color}50` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                </div>

                <div
                  className="glass rounded-2xl p-5 border border-white/6 hover:border-opacity-30 transition-all duration-300 group"
                  style={{}}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = item.color + '28')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        {item.type === 'work'
                          ? <Briefcase size={12} style={{ color: item.color }} />
                          : <GraduationCap size={12} style={{ color: item.color }} />}
                        <span className="text-[11px] font-mono" style={{ color: item.color }}>
                          {item.type === 'work' ? 'Work Experience' : 'Education'}
                        </span>
                        {item.isGovt && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1"
                            style={{ background: item.color + '12', color: item.color }}>
                            <Shield size={8} /> Govt. Project
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white leading-snug">{item.role}</h3>
                      <p className="text-[13px] font-medium mt-0.5" style={{ color: item.color + 'cc' }}>{item.org}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-white/35 font-mono justify-end">
                        <Calendar size={10} />
                        {item.period}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-white/25 justify-end mt-0.5">
                        <MapPin size={10} />
                        {item.location}
                      </div>
                    </div>
                  </div>

                  {item.points.length > 0 && (
                    <ul className="mb-4 space-y-1.5">
                      {item.points.map((pt, pi) => (
                        <li key={pi} className="flex items-start gap-2 text-[13px] text-white/45 leading-relaxed">
                          <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: item.color }} />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.stack.map(tech => (
                        <span
                          key={tech}
                          className="text-[11px] px-2.5 py-0.5 rounded-full font-mono border"
                          style={{ background: item.color + '0d', color: item.color + 'bb', borderColor: item.color + '1a' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
