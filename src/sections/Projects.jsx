import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { projects } from '../data/data'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setTimeout(() => ref.current?.classList.add('visible'), index * 80)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [index])

  const initials = project.title
    .split(' ')
    .filter(w => w.length > 2)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()

  const hasImage = project.image && !imgError

  return (
    <div ref={ref} className="reveal bg-white border border-brown-100 hover:border-brown-300 transition-all hover:shadow-lg hover:shadow-brown-100/50 flex flex-col group">

      {/* Thumbnail */}
      <div className="relative overflow-hidden border-b border-brown-100 bg-brown-50" style={{ aspectRatio: '16/9' }}>
        {hasImage ? (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-brown-50">
            <div className="w-12 h-12 border border-brown-200 flex items-center justify-center">
              <span className="font-mono text-sm font-semibold text-brown-400">{initials}</span>
            </div>
            <span className="font-mono text-xs text-brown-300 tracking-wider">foto belum ditambahkan</span>
          </div>
        )}

        {/* Overlay links on hover */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 bg-white flex items-center justify-center text-ink hover:bg-brown-600 hover:text-white transition-colors"
            aria-label="GitHub" onClick={e => e.stopPropagation()}>
            <Github size={16} />
          </a>
          <a href={project.demo} target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 bg-white flex items-center justify-center text-ink hover:bg-brown-600 hover:text-white transition-colors"
            aria-label="Demo" onClick={e => e.stopPropagation()}>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-ink text-base leading-snug">{project.title}</h3>
          <div className="flex gap-1.5 flex-shrink-0">
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="w-7 h-7 border border-brown-200 flex items-center justify-center text-muted hover:text-brown-600 hover:border-brown-400 transition-all"
              aria-label="GitHub">
              <Github size={12} />
            </a>
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="w-7 h-7 border border-brown-200 flex items-center justify-center text-muted hover:text-brown-600 hover:border-brown-400 transition-all"
              aria-label="Demo">
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <p className="text-muted text-sm leading-relaxed flex-1">{project.desc}</p>

        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-brown-50">
          {project.tech.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

const Projects = () => {
  const ref = useRef(null)
  const [showAll, setShowAll] = useState(false)
  const displayed = showAll ? projects : projects.slice(0, 4)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projects" className="py-24" ref={ref}>
      <Container>
        <div className="reveal">
          <SectionTitle
            eyebrow="projects"
            title="Proyek Saya"
            subtitle="Kumpulan proyek yang pernah saya kerjakan dari tugas sekolah sampai project pribadi."
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-8">
          {displayed.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {projects.length > 4 && (
          <div className="reveal text-center mb-10" style={{ transitionDelay: '200ms' }}>
            <button onClick={() => setShowAll(v => !v)} className="btn-ghost text-sm px-6">
              {showAll ? 'Tampilkan lebih sedikit' : `Lihat ${projects.length - 4} proyek lainnya`}
            </button>
          </div>
        )}

        <div
          className="reveal border border-brown-100 bg-white p-6 flex items-center justify-between flex-wrap gap-4"
          style={{ transitionDelay: '260ms' }}
        >
          <div>
            <div className="font-semibold text-ink text-sm">
              Ingin melihat lebih banyak?
            </div>

            <div className="text-muted text-sm mt-0.5">
              Semua proyek tersedia di profil GitHub saya.
            </div>
          </div>

          <a
            href="https://github.com/quentana"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-ghost text-sm"
          >
            <Github size={15} />
            github.com/quentana
          </a>
        </div>
      </Container>
    </section>
  )
}

export default Projects