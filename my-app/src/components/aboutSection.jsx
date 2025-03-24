import React, { useState, useEffect } from "react";
import axios from "axios";

// Function to fetch projects from the API
const fetchProjects = async () => {
  try {
    const response = await axios.get("http://localhost:5000/projects");
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

// Reusable Circular Progress Bar Component
const CircularProgressBar = ({
  percentage,
  title,
  size = 120,
  strokeWidth = 10,
  circleOneStroke = "#081b29",
  circleTwoStroke = "#00BFFF",
}) => {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size}>
        <g transform={`rotate(-90, ${center}, ${center})`}>
          <circle
            stroke={circleOneStroke}
            fill="transparent"
            strokeWidth={strokeWidth}
            r={radius}
            cx={center}
            cy={center}
          />
          <circle
            stroke={circleTwoStroke}
            fill="transparent"
            strokeWidth={strokeWidth}
            r={radius}
            cx={center}
            cy={center}
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            strokeLinecap="round"
          />
        </g>
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#00BFFF"
          className="font-bold text-lg"
        >
          {percentage}%
        </text>
      </svg>
      <span className="mt-2 text-white uppercase font-bold">{title}</span>
    </div>
  );
};

const About = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  // Compute total projects and category counts
  const totalProjects = projects.length;
  const categoryCounts = projects.reduce((acc, project) => {
    const category = project.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Compute dynamic percentages for Hard Work and Creativity
  const hardWorkPercentage =
    totalProjects > 0 ? Math.min(100, Math.round((totalProjects / 10) * 100)) : 0;
  const uniqueCategories = Object.keys(categoryCounts).length;
  const creativityPercentage =
    uniqueCategories > 0 ? Math.min(100, Math.round((uniqueCategories / 5) * 100)) : 0;

  // Compute percentage for each category
  const categoryProgress = Object.keys(categoryCounts).map((category) => {
    const percent =
      totalProjects > 0
        ? Math.round((categoryCounts[category] / totalProjects) * 100)
        : 0;
    return { title: category, percentage: percent };
  });

  return (
    <section
      id="about"
      className="w-full py-12 bg-[#0d2a3f] min-h-screen flex flex-col items-center lg:min-h-screen lg:w-full"
    >
      <div className="grid gap-12 grid-cols-1 lg:grid-cols-[2fr_5fr] px-6 max-w-7xl w-full">
        {/* Image Section */}
        <div className="relative w-[300px] h-[300px] sm:w-[250px] sm:h-[250px] md:w-[280px] md:h-[280px] lg:w-[300px] lg:h-[300px] mx-auto lg:mx-0" data-aos="fade-right">
          <img
            src="https://res.cloudinary.com/dovmtmu7y/image/upload/v1730964752/WhatsApp_Image_2024-11-03_at_13.38.41_31e9aee0_is5klc.jpg"
            alt="Mohan D"
            className="w-full h-full object-cover relative z-2"
          />
          <div className="absolute top-[15px] left-[15px] w-full h-full outline-[3px] outline-cyan-400 z-1"></div>
        </div>

        {/* Info Section */}
        <div data-aos="fade-left">
          <h1 className="text-white text-4xl sm:text-2xl font-bold uppercase relative inline-block mb-4">
            About Me
            <span className="absolute w-full h-[1px] bg-white bottom-0 left-0"></span>
            <span className="absolute w-[50px] h-[3px] bg-cyan-400 bottom-[-2px] left-0"></span>
          </h1>
          <h2 className="text-cyan-400 text-2xl sm:text-lg font-semibold capitalize tracking-wide">
            Professional Web Developer
          </h2>

          <p className="text-white text-lg sm:text-sm text-justify leading-relaxed mt-3">
            I am a passionate web developer with a strong background in HTML,
            CSS, and JavaScript. I have a keen eye for design and love creating
            visually appealing and user-friendly websites.
          </p>

          <p className="text-white text-lg sm:text-sm text-justify leading-relaxed mt-3">
            My expertise lies in building responsive and accessible websites that
            are easy to navigate. I am always looking for new opportunities to
            learn and grow in my field.
          </p>

          {/* Personal Info */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-5 pb-4 border-b border-gray-600 text-lg sm:text-sm">
            <div className="flex justify-between text-white">
              <span>Name:</span> <span>Mohan D</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Age:</span> <span>20 Years</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Email:</span> <span>techlearn2005@gmail.com</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Address:</span> <span>Malakpet,Hyderabad</span>
            </div>
          </div>

          {/* Download CV Button */}
          <a
            href="public/images/Mohan_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-aos="fade-left"
          >
            <button className="mt-5 px-6 py-3 rounded-full border-2 border-cyan-400 text-cyan-400 text-lg sm:text-sm font-medium transition-all hover:bg-[#00BFFF] hover:text-white shadow-none hover:shadow-[0_0_15px_#00BFFF] focus:outline-none focus:ring-2 focus:ring-blue-300">
              Download CV
            </button>
          </a>
        </div>
      </div>

      {/* Dynamic Progress Section */}
      <div className="px-6 mt-12 max-w-6xl w-full" data-aos="fade-up">
        <h3 className="text-white text-2xl font-bold mb-6 text-center">
          Project Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CircularProgressBar
            title="Hard Work"
            percentage={hardWorkPercentage}
          />
          <CircularProgressBar
            title="Creativity"
            percentage={creativityPercentage}
          />
          {categoryProgress.map((cat, index) => (
            <CircularProgressBar
              key={index}
              title={cat.title}
              percentage={cat.percentage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
