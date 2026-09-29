import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Work from '../components/Work';
import GraphicGallery from '../components/GraphicGallery';
import Capabilities from '../components/Capabilities';
import Tools from '../components/Tools';
import About from '../components/About';
import Philosophy from '../components/Philosophy';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <Work />
      <GraphicGallery />
      <Capabilities />
      <Tools />
      <About />
      <Philosophy />
      <Contact />
    </main>
  );
}
