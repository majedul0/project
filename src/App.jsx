import { useState } from 'react';
import TopAppBar from './components/TopAppBar/TopAppBar';
import HeroSection from './components/HeroSection/HeroSection';
import TechStack from './components/TechStack/TechStack';
import ServicesSection from './components/ServicesSection/ServicesSection';
import CTASection from './components/CTASection/CTASection';
import Footer from './components/Footer/Footer';
import MobileDrawer from './components/MobileDrawer/MobileDrawer';
import SupernovaBackground from './animations/supernova.jsx';
import './styles/global.css';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="app-shell">
      <div className="app-shell__animation-layer" aria-hidden="true">
        <SupernovaBackground />
      </div>
      <div className="app-shell__ambient app-shell__ambient--primary" aria-hidden="true" />
      <div className="app-shell__ambient app-shell__ambient--secondary" aria-hidden="true" />
      <TopAppBar onMenuClick={() => setIsDrawerOpen((isOpen) => !isOpen)} />
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      
      <main className="app-shell__main">
        <HeroSection />
        <TechStack />
        <ServicesSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
//run file 