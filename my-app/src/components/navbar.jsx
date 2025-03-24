import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const navItems = [
    { id: "homeId", to: "#hero", text: "Home" },
    { id: "aboutId", to: "#about", text: "About" },
    { id: "projectsId", to: "#projects", text: "Projects" },
    { id: "servicesId", to: "#services", text: "Services" },
    { id: "contactId", to: "#contact", text: "Contact" },
  ];

  return (
    <nav className="bg-[#081b29] text-gray-300 px-6 py-4 flex justify-between items-center font-sans relative pt-4 pl-16 pr-16">
      {/* Logo always links to the hero section */}
      <Link smooth to="#hero" className="text-2xl font-bold text-[#0ef]">
        Portfolio
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden text-gray-300 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-3xl">&#9776;</span>
      </button>

      {/* Mobile Menu Popup */}
      {isOpen && (
        <div className="absolute top-16 right-6 w-48 bg-[#0d2a3f] shadow-lg rounded-lg p-4 flex flex-col space-y-4 z-50">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              smooth
              className="text-lg font-semibold px-3 py-2 rounded transition-all duration-300 
                hover:text-cyan-400 focus:text-cyan-400 active:text-cyan-400"
              onClick={() => setIsOpen(false)}
            >
              {item.text}
            </Link>
          ))}
          {/* Admin Dashboard Button */}
          <button
            onClick={() => navigate("/admin")}
            className="bg-[#0ef] text-black text-lg font-semibold px-4 py-2 rounded transition-all 
              duration-300 hover:bg-[#08c] focus:bg-[#08c] active:bg-[#08c]"
          >
            Admin Dashboard
          </button>
        </div>
      )}

      {/* Desktop Menu */}
      <div className="hidden lg:flex space-x-8 items-center">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            smooth
            className="text-lg font-semibold transition-all duration-300 
              hover:text-cyan-400 focus:text-cyan-400 active:text-cyan-400"
          >
            {item.text}
          </Link>
        ))}
        {/* Admin Dashboard Button */}
        <button
          onClick={() => navigate("/admin")}
          className="bg-[#0ef] text-black text-lg font-semibold px-4 py-2 rounded transition-all 
            duration-300 hover:bg-[#08c] focus:bg-[#08c] active:bg-[#08c]"
        >
          Admin Dashboard
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
