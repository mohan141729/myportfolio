// loadingPage.jsx
import React from "react";
import AboutSection from "../components/AboutSection";
import HeroSection from "../components/HeroSection";
import ProjectSection from "../components/ProjectSection";
import SkillsSection from "../components/SkillsSection";
import ServicesSection from "../components/ServicesSection";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";
import Navbar from "../components/Navbar";

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
