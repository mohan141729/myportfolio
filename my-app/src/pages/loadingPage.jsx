// loadingPage.jsx
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectSection from "../components/ProjectSection";
import SkillsSection from "../components/SkillsSection";
import ServicesSection from "../components/ServicesSection";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";

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
