const SectionTitle = ({ eyebrow, title, subtitle, center = false }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    <span className="eyebrow">{eyebrow}</span>
    <span className="divider block mt-2" style={center ? { margin: '8px auto 0' } : {}} />
    <h2 className="font-display font-semibold text-4xl md:text-5xl text-ink mt-1 leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-muted text-base leading-relaxed mt-3 max-w-xl" style={center ? { margin: '12px auto 0' } : {}}>
        {subtitle}
      </p>
    )}
  </div>
)

export default SectionTitle
