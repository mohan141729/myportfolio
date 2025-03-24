import React from "react";

const FooterSection = ({ brandName = "Portfolio", socialLinks = [] }) => {
  return (
    <footer className="bg-[#0d2a3f] text-gray-300 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <span className="ml-3 text-xl text-cyan-400">{brandName}</span>
        <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-700 sm:py-2 sm:mt-0 mt-4">
          © {new Date().getFullYear()} {brandName} —
          <a
            href="https://twitter.com/knyttneve"
            className="text-cyan-400 ml-1 hover:text-indigo-300"
            rel="noopener noreferrer"
            target="_blank"
          >
            @knyttneve
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          {socialLinks.map(({ href, icon }, index) => (
            <a key={index} href={href} className="ml-3 text-gray-400 hover:text-cyan-400">
              {icon}
            </a>
          ))}
        </span>
      </div>
    </footer>
  );
};
// Usage Example:
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  { href: "https://facebook.com", icon: <FaFacebookF className="w-5 h-5" /> },
  { href: "https://twitter.com", icon: <FaTwitter className="w-5 h-5" /> },
  { href: "https://instagram.com", icon: <FaInstagram className="w-5 h-5" /> },
  { href: "https://linkedin.com", icon: <FaLinkedin className="w-5 h-5" /> },
];

export default function App() {
  return <FooterSection brandName="Portfolio" socialLinks={socialLinks} />;
}
