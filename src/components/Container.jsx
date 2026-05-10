const Container = ({ children, className = '' }) => (
  <div className={`max-w-5xl mx-auto px-6 lg:px-8 ${className}`}>
    {children}
  </div>
)

export default Container
