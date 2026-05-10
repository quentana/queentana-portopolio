import { useEffect, useRef } from 'react'
import { skills, tools, softSkills } from '../data/data'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import { FaHtml5, FaCss3Alt, FaReact } from 'react-icons/fa'
import { SiCanva } from 'react-icons/si'
import { 
  SiJavascript, 
  SiPhp, 
  SiFigma, 
  SiFlutter, 
  SiLaravel,
} from 'react-icons/si'

const iconMap = {
  FaHtml5: <FaHtml5 size={28} />,
  FaCss3Alt: <FaCss3Alt size={28} />,
  FaReact: <FaReact size={28} />,
  SiJavascript: <SiJavascript size={28} />,
  SiAdobephotoshop: <SiCanva size={28} />,
  SiPhp: <SiPhp size={28} />,
  SiFigma: <SiFigma size={28} />,
  SiFlutter: <SiFlutter size={28} />,
  SiLaravel: <SiLaravel size={28} />,
}

const SkillBar = ({ name, level, desc, icon, index }) => {
  const fillRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setTimeout(() => fillRef.current?.classList.add('go'), index * 100)
          obs.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    if (fillRef.current) obs.observe(fillRef.current.closest('.skill-row'))
    return () => obs.disconnect()
  }, [index])

  return (
    <div className="skill-row py-4 border-b border-brown-100 last:border-0">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-brown-500 mb-1">{iconMap[icon]}</div>
          <div className="font-semibold text-ink text-sm">{name}</div>
          <div className="text-faint text-xs leading-relaxed mt-0.5 max-w-xs">{desc}</div>
        </div>
        <span className="font-mono text-brown-500 text-xs font-medium flex-shrink-0 ml-4 mt-0.5">{level}%</span>
      </div>
      <div className="skill-track">
        <div
          ref={fillRef}
          className="skill-fill"
          style={{ '--target-scale': level / 100 }}
        />
      </div>
    </div>
  )
}

const Skills = () => {
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" className="py-24" ref={ref}>
      <Container>
        <div className="reveal">
          <SectionTitle
            eyebrow="skills"
            title="Kemampuan Saya"
            subtitle="Teknologi dan tools yang sudah saya pelajari dan gunakan dalam mengerjakan proyek."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 mb-14">
          {skills.map((s, i) => (
            <div key={s.name} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
              <SkillBar {...s} index={i} />
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-10 reveal" style={{ transitionDelay: '150ms' }}>
          <div>
            <h3 className="font-mono text-xs text-faint tracking-widest uppercase mb-5">Tools yang Saya Pakai</h3>
            <div className="flex flex-wrap gap-2">
              {tools.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs text-faint tracking-widest uppercase mb-5">Soft Skills</h3>
            <div className="grid grid-cols-2 gap-2">
              {softSkills.map(s => (
                <div key={s.label} className="flex items-center gap-3 border border-brown-100 bg-white px-4 py-3 hover:border-brown-300 transition-colors">
                  <div className="w-1 h-1 rounded-full bg-brown-400 flex-shrink-0" />
                  <span className="font-medium text-ink text-sm">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal mt-10 border-l-2 border-brown-300 pl-5 py-1" style={{ transitionDelay: '300ms' }}>
          <p className="text-muted text-sm leading-relaxed italic">
            <span className="font-semibold not-italic text-ink">Catatan jujur:</span>{' '}
            Persentase di atas mencerminkan kemampuan saya saat ini secara apa adanya. Saya percaya transparansi lebih penting dari kesan sempurna. Masih banyak yang ingin saya tingkatkan.
          </p>
        </div>
      </Container>
    </section>
  )
}

export default Skills