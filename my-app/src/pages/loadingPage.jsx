// loadingPage.jsx
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";
import Services from "../components/servicesSection";
import ProjectSection from "../components/projectSection";

const LoadingPage = () => (
  <div>
    <Navbar />
    <section id="hero">
      <HeroSection />
    </section>
    <section id="about">
      <AboutSection />
    </section>
    <section id="projects">
      <ProjectSection />
    </section>
    <section id="services">
      <Services />
    </section>
    <section id="contact">
      <ContactSection />
    </section>
    
    <FooterSection />
  </div>
);

export default LoadingPage;
