import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Credentials from './components/Credentials';
import Contact from './components/Contact';
import Footer from './components/Footer';

let loggedEasterEgg = false;

export default function App() {
  useEffect(() => {
    if (!loggedEasterEgg) {
      console.log(
        "%c🔍 Oh, you're inspecting my code?\n%cI see you're a person of culture as well.\n%cIf you're reading this, we should probably be friends. Let's build something together.",
        "color: #06b6d4; font-size: 16px; font-weight: bold;",
        "color: #7c3aed; font-size: 14px;",
        "color: #10b981; font-size: 14px; font-style: italic;"
      );
      loggedEasterEgg = true;
    }

    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          alert("Achievement Unlocked 🏆: You're clearly an engineer. Let's talk!");
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
