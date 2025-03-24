import React, { useEffect, useState } from "react";
import { FaCode, FaPaintBrush, FaVideo, FaTerminal } from "react-icons/fa";
import { Link } from "react-scroll";  // ✅ Import Link for smooth scrolling
import AOS from "aos";
import "aos/dist/aos.css";

const services = [
  {
    title: "Web Development",
    description: "Custom websites, landing pages, and full-stack applications with modern frameworks.",
    icon: <FaCode />,
  },
  {
    title: "UI/UX Design",
    description: "Intuitive and user-friendly interfaces designed for an exceptional user experience.",
    icon: <FaPaintBrush />,
  },
  {
    title: "Video Editing",
    description: "Professional video editing services for YouTube, social media, and promotional content.",
    icon: <FaVideo />,
  },
  {
    title: "Coding & Automation",
    description: "Custom scripts, AI models, and automation solutions to optimize workflows.",
    icon: <FaTerminal />,
  },
];

const Services = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="services" className="text-gray-600 body-font bg-[#0d2a3f] py-24 lg:h-[100vh] sm:h-[100%]">
      <div className="container px-5 mx-auto">
        {loading ? ( 
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
          </div>
        ) : (
          <>
            <div className="text-center mb-20" data-aos="fade-up">
              <h2 className="text-xs text-cyan-500 tracking-widest font-semibold uppercase">What I Offer</h2>
              <h1 className="sm:text-4xl text-3xl font-bold title-font text-gray-100">My Services</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-aos="fade-up">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="p-6 bg-[#081b29] bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
                  data-aos="zoom-in"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-2xl">
                      {service.icon}
                    </div>
                    <h2 className="ml-4 text-xl font-semibold text-cyan-400">{service.title}</h2>
                  </div>
                  <p className="text-gray-200">{service.description}</p>
                </div>
              ))}
            </div>

            {/* ✅ Get in Touch Button with Smooth Scrolling */}
            <div className="text-center mt-12" data-aos="fade-up">
              <Link
                to="contact"
                smooth={true}
                duration={800}
                className="bg-cyan-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-cyan-400 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Services;
