import { useEffect, useRef } from 'react'
import { MapPin, GraduationCap, Briefcase } from 'lucide-react'
import { profile, services } from '../data/data'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'

const About = () => {
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
    <section id="about" className="py-24 bg-parchment border-y border-brown-100" ref={ref}>
      <Container>
        <div className="reveal">
          <SectionTitle
            eyebrow="about me"
            title="Tentang Saya"
            subtitle="Sedikit cerita tentang siapa saya dan apa yang saya kerjakan."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
          <div className="reveal space-y-5">
            <p className="text-muted leading-relaxed text-base">{profile.about1}</p>
            <p className="text-muted leading-relaxed text-base">{profile.about2}</p>

            <div className="flex flex-wrap gap-2 pt-2">
              <div className="flex items-center gap-2 border border-brown-200 bg-white px-3 py-2 text-sm text-brown-700">
                <MapPin size={13} className="text-brown-500" />
                <span className="font-medium">{profile.location}</span>
              </div>
              <div className="flex items-center gap-2 border border-brown-200 bg-white px-3 py-2 text-sm text-brown-700">
                <GraduationCap size={13} className="text-brown-500" />
                <span className="font-medium">{profile.school}</span>
              </div>
              <div className="flex items-center gap-2 border border-brown-200 bg-white px-3 py-2 text-sm text-brown-700">
                <Briefcase size={13} className="text-brown-500" />
                <span className="font-medium">PPLG</span>
              </div>
            </div>
          </div>

          <div className="reveal space-y-4" style={{ transitionDelay: '120ms' }}>
            {[
              { title: 'Passion di Frontend', desc: 'Suka sekali bikin tampilan website yang clean, rapi, dan responsif.' },
              { title: 'Learner Mindset', desc: 'Masih terus belajar dan selalu excited kalau ada hal baru yang bisa dipelajari.' },
              { title: 'Team Player', desc: 'Senang berkolaborasi dan terbuka dengan feedback dari orang lain.' },
            ].map((item, i) => (
              <div key={item.title} className="flex gap-5 p-5 bg-white border border-brown-100 hover:border-brown-300 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 border border-brown-300 flex items-center justify-center text-brown-500 font-mono text-sm font-medium">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <div className="font-semibold text-ink text-sm mb-1">{item.title}</div>
                  <div className="text-muted text-sm leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

   
      </Container>
    </section>
  )
}

export default About
