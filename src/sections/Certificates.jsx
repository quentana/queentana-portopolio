import { useEffect, useRef, useState } from 'react'
import { Award, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { certificates } from '../data/data'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'

const Modal = ({ cert, onClose, onPrev, onNext, total, current }) => {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(26,20,16,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}>
      <div
        className="relative bg-white max-w-lg w-full p-8"
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 border border-brown-200 flex items-center justify-center text-muted hover:text-brown-600 hover:border-brown-400 transition-colors">
          <X size={15} />
        </button>

        <div className="font-mono text-xs text-faint text-center mb-5">{current + 1} / {total}</div>

        <img src={cert.image} alt={cert.title} className="w-full rounded-none border border-brown-100" />

        <div className="mt-6">
          <h3 className="font-display text-2xl font-semibold text-ink mb-1">{cert.title}</h3>
          <p className="text-brown-600 font-medium text-sm mb-3">{cert.issuer} &middot; {cert.year}</p>
          <p className="text-muted text-sm leading-relaxed">{cert.desc}</p>
        </div>

        <div className="flex items-center justify-between mt-6 gap-3 border-t border-brown-100 pt-5">
          <button onClick={onPrev} className="flex-1 flex items-center justify-center gap-2 btn-ghost text-sm py-2">
            <ChevronLeft size={15} /> Sebelumnya
          </button>
          <button onClick={onNext} className="flex-1 flex items-center justify-center gap-2 btn-primary text-sm py-2">
            Berikutnya <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}

const Certificates = () => {
  const ref = useRef(null)
  const scrollRef = useRef(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const openModal  = (i) => { setSelected(i); document.body.style.overflow = 'hidden' }
  const closeModal = () => { setSelected(null); document.body.style.overflow = '' }
  const prevCert   = () => setSelected(i => (i - 1 + certificates.length) % certificates.length)
  const nextCert   = () => setSelected(i => (i + 1) % certificates.length)

  const scrollPrev = () => scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })
  const scrollNext = () => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })

  return (
    <>
      <section id="certificates" className="py-24 bg-parchment border-t border-brown-100" ref={ref}>
        <Container>
          <div className="reveal">
            <SectionTitle
              eyebrow="certificates"
              title="Sertifikat & Pencapaian"
              subtitle="Beberapa sertifikat yang berhasil saya raih dari berbagai platform dan program pelatihan."
            />
          </div>

          <div className="reveal mb-8" style={{ transitionDelay: '60ms' }}>
            <p className="font-mono text-xs text-faint tracking-wider">Klik kartu sertifikat untuk melihat lebih detail</p>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {certificates.map((cert, i) => (
              <div
                key={cert.id}
                className="reveal cursor-pointer group bg-white border border-brown-100 hover:border-brown-300 transition-all flex-none w-72 snap-center"
                style={{ transitionDelay: `${i * 65}ms` }}
                onClick={() => openModal(i)}>
                <div className="overflow-hidden border-b border-brown-100">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-ink text-sm leading-snug">{cert.title}</h3>
                    <Award size={14} className="text-brown-400 flex-shrink-0 mt-0.5" />
                  </div>
                  <p className="text-brown-600 font-medium text-xs mb-1">{cert.issuer}</p>
                  <p className="text-faint text-xs leading-relaxed line-clamp-2">{cert.desc}</p>

                  <div className="mt-3 pt-3 border-t border-brown-100">
                    <span className="font-mono text-xs text-brown-500">{cert.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 mt-4">
            <button
              onClick={scrollPrev}
              className="w-8 h-8 border border-brown-200 flex items-center justify-center text-muted hover:text-brown-600 hover:border-brown-400 transition-colors"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={scrollNext}
              className="w-8 h-8 border border-brown-200 flex items-center justify-center text-muted hover:text-brown-600 hover:border-brown-400 transition-colors"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </Container>
      </section>

      {selected !== null && (
        <Modal
          cert={certificates[selected]}
          current={selected}
          total={certificates.length}
          onClose={closeModal}
          onPrev={prevCert}
          onNext={nextCert}
        />
      )}
    </>
  )
}

export default Certificates