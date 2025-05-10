import React, { useRef, useState, useEffect } from "react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { API_URL } from "../config";

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
    <section className="text-gray-400 bg-[#081b29] min-h-screen py-16 flex flex-col justify-center relative">
      <div className="container px-5 mx-auto max-w-6xl " >
        <h1 className="text-3xl font-bold text-white mb-8 text-center" data-aos="fade-up">My Projects</h1>

        {/* Dynamic Category Buttons */}
        <div className="flex justify-center mb-6 space-x-4" data-aos="fade-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`group px-4 py-2 rounded-lg text-white transition-all ${
                selectedCategory === category ? "bg-cyan-400" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative flex items-center justify-center" data-aos="fade-up">
          {/* Left sliding icon */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 bg-cyan-400 p-2 rounded-full text-black hover:bg-[#08c] transition"
          >
            <MdOutlineChevronLeft size={30} />
          </button>
          <div
            ref={carouselRef}
            className="flex space-x-4 overflow-x-auto p-4 snap-x snap-mandatory touch-pan-x w-full scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(project)}
                className="snap-center flex-none w-72 md:w-80 h-96 relative rounded-lg shadow-lg hover:shadow-[0_0_20px_#00BFFF] transition-all transform hover:scale-105 overflow-hidden cursor-pointer"
                data-aos="zoom-in"
              >
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="absolute bottom-0 left-0 p-4 z-10 backdrop-blur-3xl w-[100%]">
                  <h2 className="mt-2 text-lg font-medium text-cyan-400">{project.title}</h2>
                  <p className="text-sm text-[white]">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Right sliding icon */}
          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 bg-cyan-400 p-2 rounded-full text-black hover:bg-[#08c] transition"
          >
            <MdOutlineChevronRight size={30} />
          </button>
        </div>

        {/* Bubble Pagination */}
        <div className="flex justify-center mt-4">
          {filteredProjects.map((_, i) => (
            <span
              key={i}
              onClick={() => handleDotClick(i)}
              className={`w-3 h-3 rounded-full mx-1 cursor-pointer transition-colors ${
                scrollIndex === i ? "bg-cyan-400" : "bg-gray-500"
              }`}
            ></span>
          ))}
        </div>
      </div>

      {/* Modal Popup for Project Details */}
      {selectedProject && (
        <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-2xl bg-opacity-70" >
          <div className="bg-[#0A192F] rounded-lg overflow-hidden max-w-3xl w-full relative" data-aos="zoom-in">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-white hover:text-cyan-400 transition-all"
            >
              <IoMdClose size={30} />
            </button>
            <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">{selectedProject.title}</h2>
              <p className="text-white mb-4">{selectedProject.description}</p>
              <p className="text-white mb-4">{selectedProject.detailedDescription}</p>
              <p className="text-cyan-400 mb-2">
                <span className="font-bold">Category:</span> {selectedProject.category}
              </p>
              <p className="text-cyan-400 mb-2">
                <span className="font-bold">Programming Languages:</span> {selectedProject.programmingLanguages}
              </p>
              <p className="text-cyan-400 mb-2">
                <span className="font-bold">Skills:</span> {selectedProject.skills}
              </p>
              <div className="mt-4">
                <a
                  href={selectedProject.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cyan-400 text-black px-4 py-2 rounded hover:bg-[#08c] transition-all"
                >
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
