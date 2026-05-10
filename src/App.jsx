import Navbar       from './components/Navbar'
import Footer       from './components/Footer'
import Hero         from './sections/Hero'
import About        from './sections/About'
import Skills       from './sections/Skills'
import Education    from './sections/Education'
import Projects     from './sections/Projects'
import Certificates from './sections/Certificates'
import Contact      from './sections/Contact'
import MusicPlayer from './components/MusicPlayer'

// lalu taruh di dalam return:


const App = () => {
  return (
    <>
      <Navbar />
           <MusicPlayer />
      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
