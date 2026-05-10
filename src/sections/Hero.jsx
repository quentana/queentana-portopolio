import { useState, useEffect } from 'react'
import { Instagram, Linkedin, Phone, Music, ArrowDown } from 'lucide-react'
import { profile } from '../data/data'
import Container from '../components/Container'

const ROLES = ['Frontend Developer', 'UI/UX Designer', 'Graphic Designer', 'Web Programmer']

const Hero = () => {
  const [roleIdx, setRoleIdx] = useState(0)
  const [display, setDisplay] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const current = ROLES[roleIdx]
    const speed = deleting ? 40 : 90
    const t = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplay(current.slice(0, charIdx + 1))
        setCharIdx(c => c + 1)
      } else if (!deleting && charIdx === current.length) {
        setTimeout(() => setDeleting(true), 2000)
      } else if (deleting && charIdx > 0) {
        setDisplay(current.slice(0, charIdx - 1))
        setCharIdx(c => c - 1)
      } else {
        setDeleting(false)
        setRoleIdx(i => (i + 1) % ROLES.length)
      }
    }, speed)
    return () => clearTimeout(t)
  }, [charIdx, deleting, roleIdx])

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const socials = [
    { Icon: Instagram, href: profile.instagram, label: 'Instagram' },
    { Icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
    { Icon: Phone, href: profile.whatsapp, label: 'WhatsApp' },
    { Icon: Music, href: profile.spotify, label: 'Spotify' },
  ]

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(201,168,124,0.08) 0%, transparent 60%)',
      }} />
      {/* Thin decorative line */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-brown-100 hidden lg:block" />

      <Container className="relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            {/* Available badge */}
            <div className="inline-flex items-center gap-2 border border-brown-200 bg-brown-50 px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="font-mono text-xs text-brown-600 tracking-widest uppercase">Open to work</span>
            </div>

            <p className="font-mono text-xs text-faint tracking-widest uppercase mb-3">
              Halo, saya
            </p>

            <h1 className="font-display font-semibold text-ink leading-none mb-4">
              <span className="block text-5xl sm:text-6xl lg:text-7xl">{profile.nickname}</span>
              <span className="block text-2xl sm:text-3xl text-brown-500 mt-2 italic font-normal">Allea Hasanah</span>
            </h1>

            <div className="flex items-center gap-3 mb-6 h-9 border-l-2 border-brown-300 pl-4">
              <span className="font-sans text-lg text-muted">
                {display}
                <span className="text-brown-400 animate-pulse">|</span>
              </span>
            </div>

            <p className="text-muted text-base leading-relaxed mb-10 max-w-md font-light">
              {profile.about1}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <button onClick={() => go('projects')} className="btn-primary">
                Lihat Proyek
              </button>
              <button onClick={() => go('contact')} className="btn-ghost">
                Hire Me
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-faint tracking-widest">FIND ME</span>
              <div className="h-px w-8 bg-brown-200" />
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-brown-200 flex items-center justify-center text-muted hover:text-brown-600 hover:border-brown-400 transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Right side — decorative identity card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-72">
              {/* Main card */}
              <div className="bg-white border border-brown-200 p-4 relative">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brown-400" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-brown-400" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-brown-400" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brown-400" />

                {/* Foto */}
                <img
                  src="/foto-saya.png"
                  alt="Profile"
                  className="w-full h-[400px] object-cover"
                />
              </div>

              {/* Shadow card behind */}
              <div className="absolute inset-0 border border-brown-200 translate-x-3 translate-y-3 -z-10 bg-brown-50" />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <button
            onClick={() => go('about')}
            className="flex flex-col items-center gap-2 text-faint hover:text-brown-500 transition-colors group"
            aria-label="Scroll ke bawah"
          >
            <span className="font-mono text-xs tracking-widest">SCROLL</span>
            <ArrowDown size={14} className="animate-bounce" />
          </button>
        </div>
      </Container>
    </section>
  )
}

export default Hero
