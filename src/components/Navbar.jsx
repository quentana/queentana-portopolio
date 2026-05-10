import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks, profile } from '../data/data'
import Container from './Container'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const ids = navLinks.map(l => l.href.replace('#', ''))
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.offsetTop - 90 <= window.scrollY) {
          setActive(ids[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const go = (href) => {
    setOpen(false)
    document.getElementById(href.replace('#', ''))
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-brown-100' : 'bg-transparent'
      }`}>
        <Container>
          <nav className="flex items-center justify-between h-[68px]">
            <button
              onClick={() => go('#home')}
              className="flex items-center gap-3 group"
            >
              <div className="w-8 h-8 border border-brown-500 flex items-center justify-center">
                <span className="font-display font-semibold text-brown-600 text-sm">Q</span>
              </div>
              <span className="font-display text-lg font-semibold text-ink tracking-wide group-hover:text-brown-600 transition-colors">
                Queentana
              </span>
            </button>

            <ul className="hidden md:flex items-center gap-0.5">
              {navLinks.map(link => {
                const id = link.href.replace('#', '')
                const isActive = active === id
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => go(link.href)}
                      className={`px-4 py-2 text-sm transition-all duration-200 font-medium ${
                        isActive
                          ? 'text-brown-600 border-b border-brown-500'
                          : 'text-muted hover:text-ink'
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-3">
              <button
                onClick={() => go('#contact')}
                className="hidden md:block btn-primary text-sm py-2 px-5"
              >
                Hire Me
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden p-2 text-ink hover:text-brown-600 transition-colors"
                aria-label="Toggle menu"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-2 md:hidden">
          <div className="absolute top-5 left-6 flex items-center gap-3">
            <div className="w-8 h-8 border border-brown-500 flex items-center justify-center">
              <span className="font-display font-semibold text-brown-600 text-sm">Q</span>
            </div>
            <span className="font-display text-lg font-semibold text-ink">Queentana</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-6 p-2 text-ink hover:text-brown-600"
          >
            <X size={22} />
          </button>
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => go(link.href)}
              className="font-display text-3xl font-semibold text-ink hover:text-brown-500 transition-colors py-2"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {link.label}
            </button>
          ))}
          <button onClick={() => go('#contact')} className="btn-primary mt-6">
            Hire Me
          </button>
        </div>
      )}
    </>
  )
}

export default Navbar
