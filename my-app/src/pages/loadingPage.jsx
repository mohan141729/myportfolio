// loadingPage.jsx
import React from "react";
import AboutSection from "../components/AboutSection.jsx";
import HeroSection from "../components/HeroSection.jsx";
import ProjectSection from "../components/ProjectSection.jsx";
import SkillsSection from "../components/SkillsSection.jsx";
import ServicesSection from "../components/ServicesSection.jsx";
import ContactSection from "../components/ContactSection.jsx";
import FooterSection from "../components/FooterSection.jsx";
import Navbar from "../components/Navbar.jsx";

const LoadingPage = () => {
  return (
    <div className="bg-[#081b29]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectSection />
      <SkillsSection />
      <ServicesSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default LoadingPage;
