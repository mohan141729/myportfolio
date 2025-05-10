import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#081b29] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-cyan-400">Mohan D</h3>
            <p className="text-gray-300">
              A passionate web developer dedicated to creating beautiful and functional web experiences.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/mohan141729"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/your-handle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com/your-handle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-cyan-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-cyan-400">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-300">
                <FaEnvelope className="text-cyan-400" />
                <a href="mailto:techlearn2005@gmail.com" className="hover:text-cyan-400 transition-colors">
                  techlearn2005@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <FaPhone className="text-cyan-400" />
                <span>+91 6300097734</span>
              </li>
              <li className="text-gray-300">
                Malakpet, Hyderabad, India
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-cyan-400">Stay Updated</h3>
            <p className="text-gray-300">
              Subscribe to my newsletter for the latest updates and projects.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-cyan-400 focus:outline-none text-white"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-cyan-400 text-black font-semibold rounded hover:bg-cyan-300 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Mohan D. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
