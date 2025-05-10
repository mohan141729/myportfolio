// loadingPage.jsx
import React from "react";
import Navbar from "../components/navbar";
import HeroSection from "../components/heroSection";
import AboutSection from "../components/aboutSection";
import ProjectSection from "../components/projectSection";
import SkillsSection from "../components/SkillsSection";
import ServicesSection from "../components/servicesSection";
import ContactSection from "../components/contactSection";
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
