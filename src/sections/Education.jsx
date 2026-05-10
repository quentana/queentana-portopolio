import { useEffect, useRef } from 'react'
import { GraduationCap, MapPin } from 'lucide-react'
import { education } from '../data/data'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'

const Education = () => {
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="education" className="py-24 bg-parchment border-y border-brown-100" ref={ref}>
      <Container>
        <div className="reveal">
          <SectionTitle
            eyebrow="education"
            title="Pendidikan & Pengalaman"
            subtitle="Perjalanan belajar saya dari awal hingga sekarang, plus pengalaman kerja yang sudah saya jalani."
          />
        </div>

        <div className="grid md:grid-cols-5 gap-14">
          <div className="md:col-span-3">
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap size={16} className="text-brown-500" />
              <span className="font-mono text-xs text-faint tracking-widest uppercase">Riwayat Pendidikan</span>
            </div>

            <div className="space-y-0">
              {education.map((item, i) => (
                <div
                  key={item.id}
                  className="reveal relative pl-10 pb-8 last:pb-0"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Timeline line */}
                  {i < education.length - 1 && (
                    <div className="absolute left-[7px] top-8 bottom-0 w-px bg-brown-200" />
                  )}
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 w-[15px] h-[15px] border-2 border-brown-400 bg-white" />

                  <div className="bg-white border border-brown-100 p-6 hover:border-brown-300 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div>
                        <h4 className="font-semibold text-ink text-base leading-snug">{item.major}</h4>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-brown-600 font-medium text-sm">{item.school}</span>
                          {item.mapUrl && (
                            <a href={item.mapUrl} target="_blank" rel="noopener noreferrer"
                              className="text-faint hover:text-brown-500 transition-colors"
                              aria-label="Lihat di Maps">
                              <MapPin size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0 flex flex-col items-start sm:items-end gap-1">
                        <span className="font-mono text-xs bg-brown-50 text-brown-600 border border-brown-200 px-3 py-1 whitespace-nowrap">
                          {item.year}
                        </span>
                        {item.highlight && (
                          <span className="text-xs text-brown-500 font-medium">{item.highlight}</span>
                        )}
                      </div>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="reveal border border-brown-200 bg-white p-6 mt-10" style={{ transitionDelay: '300ms' }}>
              <div className="font-mono text-xs text-faint tracking-widest uppercase mb-5">Sedang Dipelajari</div>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Tailwind CSS', 'JavaScript ES6+', 'Git & GitHub', 'Flutter','Laravel','Express.js','Node.js'].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Education
