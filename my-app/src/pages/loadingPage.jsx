// loadingPage.jsx
import React from "react";
import About from "../components/AboutSection";
import HeroSection from "../components/HeroSection";
import ProjectSection from "../components/ProjectSection";
import SkillsSection from "../components/SkillsSection";
import Services from "../components/ServicesSection";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";
import Navbar from "../components/Navbar";


const LoadingPage = () => {
  return (
    <div className="bg-[#081b29]">
       <Navbar/>
      <HeroSection />
      <About/>
      <ProjectSection />
      <SkillsSection />
      <Services />
      <ContactSection />
    <FooterSection />
  </div>
);
};

export default LoadingPage;
