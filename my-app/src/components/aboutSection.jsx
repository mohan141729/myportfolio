import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

// Category color mapping
const categoryColors = {
  'Web Development': {
    primary: '#00BFFF',
    secondary: '#0080FF',
    shadow: '0 0 20px rgba(0, 191, 255, 0.5)',
    gradient: 'linear-gradient(135deg, #00BFFF, #0080FF)',
    text: '#00BFFF'
  },
  'AI/ML': {
    primary: '#3F51B5',
    secondary: '#5C6BC0',
    shadow: '0 0 20px rgba(63, 81, 181, 0.5)',
    gradient: 'linear-gradient(135deg, #3F51B5, #5C6BC0)',
    text: '#3F51B5'
  },
  'Mobile Development': {
    primary: '#FF6B6B',
    secondary: '#FF4757',
    shadow: '0 0 20px rgba(255, 107, 107, 0.5)',
    gradient: 'linear-gradient(135deg, #FF6B6B, #FF4757)',
    text: '#FF6B6B'
  },
  'UI/UX Design': {
    primary: '#9C27B0',
    secondary: '#8e44ad',
    shadow: '0 0 20px rgba(156, 39, 176, 0.5)',
    gradient: 'linear-gradient(135deg, #9C27B0, #8e44ad)',
    text: '#9C27B0'
  },
  'Data Science': {
    primary: '#4CAF50',
    secondary: '#2ecc71',
    shadow: '0 0 20px rgba(76, 175, 80, 0.5)',
    gradient: 'linear-gradient(135deg, #4CAF50, #2ecc71)',
    text: '#4CAF50'
  },
  'DevOps': {
    primary: '#FFA500',
    secondary: '#f39c12',
    shadow: '0 0 20px rgba(255, 165, 0, 0.5)',
    gradient: 'linear-gradient(135deg, #FFA500, #f39c12)',
    text: '#FFA500'
  },
  'Other': {
    primary: '#607D8B',
    secondary: '#34495e',
    shadow: '0 0 20px rgba(96, 125, 139, 0.5)',
    gradient: 'linear-gradient(135deg, #607D8B, #34495e)',
    text: '#607D8B'
  }
};

// Reusable Circular Progress Bar Component
const CircularProgressBar = ({
  percentage,
  title,
  size = 120,
  strokeWidth = 10,
  category = 'Other'
}) => {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (percentage / 100) * circumference;
  const categoryColor = categoryColors[category] || categoryColors['Other'];

  return (
    <div className="flex flex-col items-center p-2 sm:p-3 md:p-4">
      <div 
        className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[130px] lg:h-[130px]"
        style={{
          boxShadow: categoryColor.shadow,
          borderRadius: '50%'
        }}
      >
        <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
          <g transform={`rotate(-90, ${center}, ${center})`}>
            <circle
              stroke="#081b29"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={radius}
              cx={center}
              cy={center}
            />
            <circle
              stroke={categoryColor.primary}
              fill="transparent"
              strokeWidth={strokeWidth}
              r={radius}
              cx={center}
              cy={center}
              strokeDasharray={circumference}
              strokeDashoffset={dashoffset}
              strokeLinecap="round"
              style={{
                filter: 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.3))'
              }}
            />
          </g>
          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="central"
            fill={categoryColor.text}
            className="font-bold text-xs sm:text-sm md:text-base lg:text-lg"
            style={{
              filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.3))'
            }}
          >
            {percentage}%
          </text>
        </svg>
        <div 
          className="absolute inset-0 animate-pulse rounded-full"
          style={{
            background: `radial-gradient(circle, ${categoryColor.primary}20 0%, transparent 70%)`
          }}
        ></div>
      </div>
      <span 
        className="mt-2 uppercase font-bold text-[10px] sm:text-xs md:text-sm lg:text-base text-center max-w-[80px] sm:max-w-[100px] md:max-w-[120px] truncate"
        style={{ color: categoryColor.text }}
      >
        {title}
      </span>
    </div>
  );
};

const AboutSection = () => {
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

  const totalProjects = projects.length;
  const categoryCounts = projects.reduce((acc, project) => {
    const category = project.category || "Other";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const hardWorkPercentage = totalProjects > 0 ? Math.min(100, Math.round((totalProjects / 10) * 100)) : 0;
  const uniqueCategories = Object.keys(categoryCounts).length;
  const creativityPercentage = uniqueCategories > 0 ? Math.min(100, Math.round((uniqueCategories / 5) * 100)) : 0;

  const categoryProgress = Object.keys(categoryCounts).map((category) => ({
    title: category,
    percentage: totalProjects > 0 ? Math.round((categoryCounts[category] / totalProjects) * 100) : 0
  }));

  return (
    <section id="about" className="w-full py-12 md:py-16 lg:py-20 bg-[#0d2a3f] min-h-screen relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-[#0d2a3f] opacity-90"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-8 md:gap-12 lg:gap-16 grid-cols-1 lg:grid-cols-[1fr_2fr] max-w-7xl mx-auto">
          {/* Image Section - Now First on Mobile */}
          <div className="flex justify-center lg:justify-start order-first" data-aos="fade-right">
            <div className="relative group">
              <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px]">
                <img
                  src="https://res.cloudinary.com/dovmtmu7y/image/upload/v1730964752/WhatsApp_Image_2024-11-03_at_13.38.41_31e9aee0_is5klc.jpg"
                  alt="Mohan D"
                  className="w-full h-full object-cover relative z-2 rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-[15px] left-[15px] w-full h-full outline-[3px] outline-cyan-400 z-1 rounded-lg transition-all duration-300 group-hover:outline-[4px] group-hover:shadow-[0_0_20px_#00BFFF]"></div>
              </div>
              <div className="absolute inset-0 bg-cyan-400/10 rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Info Section */}
          <div className="text-center lg:text-left mt-8 lg:mt-0" data-aos="fade-left">
            <div className="space-y-6">
              <div>
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold uppercase relative inline-block mb-4">
                  About Me
                  <span className="absolute w-full h-[1px] bg-white bottom-0 left-0"></span>
                  <span className="absolute w-[50px] h-[3px] bg-cyan-400 bottom-[-2px] left-0"></span>
                </h1>
                <h2 className="text-cyan-400 text-lg sm:text-xl md:text-2xl font-semibold capitalize tracking-wide">
                  Professional Web Developer
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-white text-sm sm:text-base md:text-lg text-justify leading-relaxed">
                  I am a passionate web developer with a strong background in HTML,
                  CSS, and JavaScript. I have a keen eye for design and love creating
                  visually appealing and user-friendly websites.
                </p>

                <p className="text-white text-sm sm:text-base md:text-lg text-justify leading-relaxed">
                  My expertise lies in building responsive and accessible websites that
                  are easy to navigate. I am always looking for new opportunities to
                  learn and grow in my field.
                </p>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8 sm:gap-y-3 pb-4 border-b border-gray-600">
                <div className="flex justify-between text-white text-sm sm:text-base md:text-lg">
                  <span>Name:</span> <span>Mohan D</span>
                </div>
                <div className="flex justify-between text-white text-sm sm:text-base md:text-lg">
                  <span>Age:</span> <span>20 Years</span>
                </div>
                <div className="flex justify-between text-white text-sm sm:text-base md:text-lg">
                  <span>Email:</span> <span>techlearn2005@gmail.com</span>
                </div>
                <div className="flex justify-between text-white text-sm sm:text-base md:text-lg">
                  <span>Address:</span> <span>Malakpet,Hyderabad</span>
                </div>
              </div>

              {/* Download CV Button */}
              <div className="flex justify-center lg:justify-start">
                <a
                  href="public/images/Mohan_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                  data-aos="fade-left"
                >
                  <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-cyan-400 text-cyan-400 text-sm sm:text-base md:text-lg font-medium transition-all hover:bg-[#00BFFF] hover:text-white shadow-none hover:shadow-[0_0_15px_#00BFFF] focus:outline-none focus:ring-2 focus:ring-blue-300">
                    Download CV
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Progress Section */}
        <div className="mt-12 md:mt-16 lg:mt-20" data-aos="fade-up">
          <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-center">
            Project Metrics
          </h3>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            <CircularProgressBar
              title="Hard Work"
              percentage={hardWorkPercentage}
              category="Web Development"
            />
            <CircularProgressBar
              title="Creativity"
              percentage={creativityPercentage}
              category="UI/UX Design"
            />
            {categoryProgress.map((cat, index) => (
              <CircularProgressBar
                key={index}
                title={cat.title}
                percentage={cat.percentage}
                category={cat.title}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
