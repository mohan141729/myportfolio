import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:5000/projects');
        const projects = response.data;
        
        // Extract unique skills from all projects
        const allSkills = projects.reduce((acc, project) => {
          const projectSkills = project.skills.split(',').map(skill => skill.trim());
          return [...acc, ...projectSkills];
        }, []);
        
        // Remove duplicates and count occurrences
        const skillCounts = allSkills.reduce((acc, skill) => {
          acc[skill] = (acc[skill] || 0) + 1;
          return acc;
        }, {});
        
        // Convert to array and sort by count
        const uniqueSkills = Object.entries(skillCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);
        
        setSkills(uniqueSkills);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching skills:', error);
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section id="skills" className="min-h-screen bg-[#081b29] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Loading Skills...</h2>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="min-h-screen bg-[#081b29] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">My Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-[#0d2a3f] rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#0ef]"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-[#0ef]">{skill.name}</h3>
                <span className="text-gray-400">Used in {skill.count} projects</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-[#0ef] h-2.5 rounded-full"
                  style={{ width: `${(skill.count / Math.max(...skills.map(s => s.count))) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 