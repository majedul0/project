import { useState } from 'react';
import TopAppBar from './components/TopAppBar/TopAppBar';
import HeroSection from './components/HeroSection/HeroSection';
import TechStack from './components/TechStack/TechStack';
import ServicesSection from './components/ServicesSection/ServicesSection';
import CTASection from './components/CTASection/CTASection';
import Footer from './components/Footer/Footer';
import MobileDrawer from './components/MobileDrawer/MobileDrawer';
import './styles/global.css';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <TopAppBar onMenuClick={() => setIsDrawerOpen(!isDrawerOpen)} />
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      
      <main>
        <HeroSection />
        <TechStack />
        <ServicesSection />
        <CTASection />
      </main>
      
      <Footer />
    </>
  );
}

export default App;
