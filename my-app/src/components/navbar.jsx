import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import { FaCode } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  
  const navItems = [
    { id: "homeId", to: "#hero", text: "Home" },
    { id: "aboutId", to: "#about", text: "About" },
    { id: "projectsId", to: "#projects", text: "Projects" },
    { id: "skillsId", to: "#skills", text: "Skills" },
    { id: "servicesId", to: "#services", text: "Services" },
    { id: "contactId", to: "#contact", text: "Contact" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-[#081b29] text-gray-300  w-full top-0 z-50 px-4 sm:px-6 md:px-8 lg:px-16 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link 
          smooth 
          to="#hero" 
          className="flex items-center space-x-2 group transition-all duration-300"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0ef] to-[#08c] rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-[#081b29] rounded-lg p-2">
              <FaCode className="text-2xl sm:text-3xl text-[#0ef] group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold text-[#0ef] group-hover:text-white transition-colors duration-300">
              Mohan<span className="text-white group-hover:text-[#0ef] transition-colors duration-300">D</span>
            </span>
            <span className="text-xs sm:text-sm text-gray-400 group-hover:text-[#0ef] transition-colors duration-300">
              Portfolio
            </span>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-300 hover:text-cyan-400 focus:outline-none transition-colors"
          onClick={() => {
            setIsOpen(!isOpen);
            console.log('Menu state:', !isOpen); // Debug log
          }}
          aria-label="Toggle menu"
          type="button"
        >
          <span className="text-2xl sm:text-3xl">&#9776;</span>
        </button>
        {/* Mobile Menu Popup */}
        {isOpen && (
          <div className=" fixed top-0 left-0 right-0 bg-[#0d2a3f]/95 shadow-lg p-4 flex flex-col space-y-4 z-50 lg:hidden min-h-screen">
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-cyan-400 text-2xl"
                aria-label="Close menu"
              >
                &times;
              </button>
            </div>
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                smooth
                className="text-base sm:text-lg font-semibold px-3 py-2 rounded transition-all duration-300 
                  hover:text-cyan-400 focus:text-cyan-400 active:text-cyan-400 text-left"
                onClick={() => setIsOpen(false)}
              >
                {item.text}
              </Link>
            ))}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/admin");
                      setIsOpen(false);
                    }}
                    className="w-full sm:w-auto bg-[#0ef] text-black text-base sm:text-lg font-semibold px-4 py-2 rounded 
                      transition-all duration-300 hover:bg-[#08c] focus:bg-[#08c] active:bg-[#08c]"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full sm:w-auto bg-red-500 text-white text-base sm:text-lg font-semibold px-4 py-2 rounded 
                      transition-all duration-300 hover:bg-red-600 focus:bg-red-600 active:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setIsOpen(false);
                  }}
                  className="w-full sm:w-auto bg-[#0ef] text-black text-base sm:text-lg font-semibold px-4 py-2 rounded 
                    transition-all duration-300 hover:bg-[#08c] focus:bg-[#08c] active:bg-[#08c]"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              smooth
              className="text-base xl:text-lg font-semibold transition-all duration-300 
                hover:text-cyan-400 focus:text-cyan-400 active:text-cyan-400"
            >
              {item.text}
            </Link>
          ))}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate("/admin")}
                  className="bg-[#0ef] text-black text-base xl:text-lg font-semibold px-4 py-2 rounded 
                    transition-all duration-300 hover:bg-[#08c] focus:bg-[#08c] active:bg-[#08c]"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white text-base xl:text-lg font-semibold px-4 py-2 rounded 
                    transition-all duration-300 hover:bg-red-600 focus:bg-red-600 active:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-[#0ef] text-black text-base xl:text-lg font-semibold px-4 py-2 rounded 
                  transition-all duration-300 hover:bg-[#08c] focus:bg-[#08c] active:bg-[#08c]"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
