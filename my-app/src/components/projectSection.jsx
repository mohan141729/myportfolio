import React, { useRef, useState, useEffect } from "react";
import { MdOutlineChevronLeft, MdOutlineChevronRight, MdClose } from "react-icons/md";
import axios from "axios";
import { API_URL } from "../config";

const categoryColors = {
  'Web Development': {
    primary: '#00BFFF',
    secondary: '#08c',
    shadow: '0 0 20px rgba(0, 191, 255, 0.5)',
    hoverShadow: '0 0 30px rgba(0, 191, 255, 0.7)',
    text: '#00BFFF',
    button: '#00BFFF',
    gradient: 'linear-gradient(135deg, #00BFFF, #0080FF)'
  },
  'Mobile Development': {
    primary: '#FF6B6B',
    secondary: '#ff4757',
    shadow: '0 0 20px rgba(255, 107, 107, 0.5)',
    hoverShadow: '0 0 30px rgba(255, 107, 107, 0.7)',
    text: '#FF6B6B',
    button: '#FF6B6B',
    gradient: 'linear-gradient(135deg, #FF6B6B, #FF4757)'
  },
  'UI/UX Design': {
    primary: '#9C27B0',
    secondary: '#8e44ad',
    shadow: '0 0 20px rgba(156, 39, 176, 0.5)',
    hoverShadow: '0 0 30px rgba(156, 39, 176, 0.7)',
    text: '#9C27B0',
    button: '#9C27B0',
    gradient: 'linear-gradient(135deg, #9C27B0, #8e44ad)'
  },
  'Data Science': {
    primary: '#4CAF50',
    secondary: '#2ecc71',
    shadow: '0 0 20px rgba(76, 175, 80, 0.5)',
    hoverShadow: '0 0 30px rgba(76, 175, 80, 0.7)',
    text: '#4CAF50',
    button: '#4CAF50',
    gradient: 'linear-gradient(135deg, #4CAF50, #2ecc71)'
  },
  'DevOps': {
    primary: '#FFA500',
    secondary: '#f39c12',
    shadow: '0 0 20px rgba(255, 165, 0, 0.5)',
    hoverShadow: '0 0 30px rgba(255, 165, 0, 0.7)',
    text: '#FFA500',
    button: '#FFA500',
    gradient: 'linear-gradient(135deg, #FFA500, #f39c12)'
  },
  'AI/ML': {
    primary: '#3F51B5',
    secondary: '#5C6BC0',
    shadow: '0 0 20px rgba(63, 81, 181, 0.5)',
    hoverShadow: '0 0 30px rgba(63, 81, 181, 0.7)',
    text: '#3F51B5',
    button: '#3F51B5',
    gradient: 'linear-gradient(135deg, #3F51B5, #5C6BC0)'
  },
  'Other': {
    primary: '#607D8B',
    secondary: '#34495e',
    shadow: '0 0 20px rgba(96, 125, 139, 0.5)',
    hoverShadow: '0 0 30px rgba(96, 125, 139, 0.7)',
    text: '#607D8B',
    button: '#607D8B',
    gradient: 'linear-gradient(135deg, #607D8B, #34495e)'
  }
};

const ProjectSection = () => {
  const carouselRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const updateScrollIndex = () => {
      if (carouselRef.current) {
        const index = Math.round(carouselRef.current.scrollLeft / 300);
        setScrollIndex(index);
      }
    };
    if (carouselRef.current) {
      carouselRef.current.addEventListener("scroll", updateScrollIndex);
    }
    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener("scroll", updateScrollIndex);
      }
    };
  }, []);

  // Derive categories dynamically from projects, always include "All"
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleDotClick = (index) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: index * 300, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="text-gray-400 bg-[#081b29] min-h-screen py-16 flex flex-col justify-center relative">
      <div className="container px-5 mx-auto max-w-6xl " >
        <h1 className="text-3xl font-bold text-white mb-8 text-center" data-aos="fade-up">My Projects</h1>

        {/* Dynamic Category Buttons */}
        <div className="flex flex-wrap justify-center mb-6 gap-4" data-aos="fade-up">
          {categories.map((category) => {
            const categoryColor = category === "All" ? categoryColors['Web Development'] : categoryColors[category] || categoryColors['Other'];
            return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
                className="group px-6 py-2 rounded-lg text-white transition-all duration-300"
                style={{
                  background: selectedCategory === category ? categoryColor.gradient : 'rgba(55, 65, 81, 0.8)',
                  boxShadow: selectedCategory === category ? categoryColor.shadow : 'none',
                  border: `1px solid ${categoryColor.primary}40`,
                  transform: selectedCategory === category ? 'scale(1.05)' : 'scale(1)'
                }}
            >
              {category}
            </button>
            );
          })}
        </div>

        <div className="relative flex items-center justify-center" data-aos="fade-up">
          {/* Left sliding icon */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 p-2 rounded-full text-black transition-all duration-300"
            style={{
              background: selectedCategory === "All" 
                ? categoryColors['Web Development'].gradient 
                : categoryColors[selectedCategory]?.gradient || categoryColors['Other'].gradient,
              boxShadow: selectedCategory === "All"
                ? categoryColors['Web Development'].shadow
                : categoryColors[selectedCategory]?.shadow || categoryColors['Other'].shadow
            }}
          >
            <MdOutlineChevronLeft size={30} />
          </button>
          <div
            ref={carouselRef}
            className="flex space-x-4 overflow-x-auto p-4 snap-x snap-mandatory touch-pan-x w-full scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredProjects.map((project, index) => {
              const categoryColor = categoryColors[project.category] || categoryColors['Other'];
              return (
              <div
                key={index}
                onClick={() => setSelectedProject(project)}
                  className="snap-center flex-none w-72 md:w-80 h-96 relative rounded-lg transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer"
                  style={{
                    boxShadow: categoryColor.shadow,
                    border: `1px solid ${categoryColor.primary}40`,
                    background: categoryColor.gradient
                  }}
                data-aos="zoom-in"
              >
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black opacity-40"></div>
                  <div 
                    className="absolute bottom-0 left-0 p-4 z-10 backdrop-blur-3xl w-[100%]"
                    style={{
                      background: `linear-gradient(to top, ${categoryColor.primary}40, transparent)`
                    }}
                  >
                    <h2 className="mt-2 text-lg font-medium" style={{ color: categoryColor.text }}>{project.title}</h2>
                    <p className="text-sm text-white">{project.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Right sliding icon */}
          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 p-2 rounded-full text-black transition-all duration-300"
            style={{
              background: selectedCategory === "All" 
                ? categoryColors['Web Development'].gradient 
                : categoryColors[selectedCategory]?.gradient || categoryColors['Other'].gradient,
              boxShadow: selectedCategory === "All"
                ? categoryColors['Web Development'].shadow
                : categoryColors[selectedCategory]?.shadow || categoryColors['Other'].shadow
            }}
          >
            <MdOutlineChevronRight size={30} />
          </button>
        </div>

        {/* Bubble Pagination */}
        <div className="flex justify-center mt-4">
          {filteredProjects.map((_, i) => {
            const categoryColor = selectedCategory === "All" 
              ? categoryColors['Web Development'] 
              : categoryColors[selectedCategory] || categoryColors['Other'];
            return (
            <span
              key={i}
              onClick={() => handleDotClick(i)}
                className="w-3 h-3 rounded-full mx-1 cursor-pointer transition-all duration-300"
                style={{
                  background: scrollIndex === i ? categoryColor.gradient : 'rgba(107, 114, 128, 0.5)',
                  boxShadow: scrollIndex === i ? categoryColor.shadow : 'none',
                  transform: scrollIndex === i ? 'scale(1.2)' : 'scale(1)'
                }}
            ></span>
            );
          })}
        </div>
      </div>

      {/* Modal Popup for Project Details */}
      {selectedProject && (
        <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-2xl bg-opacity-70">
          <div 
            className="rounded-lg overflow-hidden max-w-3xl w-full relative" 
            style={{
              background: '#0A192F',
              boxShadow: categoryColors[selectedProject.category]?.shadow || categoryColors['Other'].shadow,
              border: `1px solid ${categoryColors[selectedProject.category]?.primary || categoryColors['Other'].primary}40`
            }}
            data-aos="zoom-in"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-white hover:text-cyan-400 transition-all"
            >
              <MdClose size={30} />
            </button>
            <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 
                className="text-2xl font-bold mb-4"
                style={{ color: categoryColors[selectedProject.category]?.text || categoryColors['Other'].text }}
              >
                {selectedProject.title}
              </h2>
              <p className="text-white mb-4">{selectedProject.description}</p>
              <p className="text-white mb-4">{selectedProject.detailedDescription}</p>
              <p 
                className="mb-2"
                style={{ color: categoryColors[selectedProject.category]?.text || categoryColors['Other'].text }}
              >
                <span className="font-bold">Category:</span> {selectedProject.category}
              </p>
              <p 
                className="mb-2"
                style={{ color: categoryColors[selectedProject.category]?.text || categoryColors['Other'].text }}
              >
                <span className="font-bold">Programming Languages:</span> {selectedProject.programmingLanguages}
              </p>
              <p 
                className="mb-2"
                style={{ color: categoryColors[selectedProject.category]?.text || categoryColors['Other'].text }}
              >
                <span className="font-bold">Skills:</span> {selectedProject.skills}
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <a
                  href={selectedProject.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-2 rounded transition-all duration-300"
                  style={{
                    background: categoryColors[selectedProject.category]?.gradient || categoryColors['Other'].gradient,
                    color: '#000',
                    boxShadow: categoryColors[selectedProject.category]?.shadow || categoryColors['Other'].shadow
                  }}
                >
                  <i className="bx bx-link-external mr-2"></i>
                  View Project
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectSection;
