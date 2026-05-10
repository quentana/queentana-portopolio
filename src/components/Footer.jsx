import { Instagram, Linkedin, Mail, Phone } from 'lucide-react'
import { profile, navLinks } from '../data/data'
import Container from './Container'

const Footer = () => {
  const go = (href) => {
    document.getElementById(href.replace('#', ''))
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="bg-ink text-white pt-14 pb-8 mt-0">
      <Container>
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 border border-brown-400 flex items-center justify-center">
                <span className="font-display font-semibold text-brown-300 text-sm">Q</span>
              </div>
              <span className="font-display text-lg font-semibold text-white">Queentana</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Frontend Developer & UI/UX Designer.<br />
              Lulusan SMK Wikrama Bogor — siap berkontribusi di industri digital.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-xs text-green-400 font-medium">Open to opportunities</span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs text-white/40 mb-4 uppercase tracking-widest">Navigasi</h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => go(link.href)}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-white/40 mb-4 uppercase tracking-widest">Kontak</h4>
            <div className="space-y-2 mb-5">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
                <Mail size={13} /> {profile.email}
              </a>
              <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
                <Phone size={13} /> WhatsApp
              </a>
            </div>
            <div className="flex gap-2">
              {[
                { Icon: Instagram, href: profile.instagram, label: 'Instagram' },
                { Icon: Linkedin,  href: profile.linkedin,  label: 'LinkedIn'  },
                { Icon: Mail,      href: `mailto:${profile.email}`, label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/30 text-xs font-mono">
            &copy; {new Date().getFullYear()} Queentana Allea Hasanah
          </p>
          <p className="text-white/20 text-xs font-mono">SMK Wikrama Bogor</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
