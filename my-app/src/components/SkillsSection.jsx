import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from "../config";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Color scheme for different skill categories with gradients
const categoryColors = {
  'Frontend': {
    primary: '#00BFFF',
    gradient: 'from-cyan-500 to-blue-600',
    light: 'rgba(0, 191, 255, 0.1)',
    border: 'rgba(0, 191, 255, 0.3)'
  },
  'Backend': {
    primary: '#FF6B6B',
    gradient: 'from-red-500 to-pink-600',
    light: 'rgba(255, 107, 107, 0.1)',
    border: 'rgba(255, 107, 107, 0.3)'
  },
  'Database': {
    primary: '#4CAF50',
    gradient: 'from-green-500 to-emerald-600',
    light: 'rgba(76, 175, 80, 0.1)',
    border: 'rgba(76, 175, 80, 0.3)'
  },
  'DevOps': {
    primary: '#FFA500',
    gradient: 'from-orange-500 to-amber-600',
    light: 'rgba(255, 165, 0, 0.1)',
    border: 'rgba(255, 165, 0, 0.3)'
  },
  'Mobile': {
    primary: '#9C27B0',
    gradient: 'from-purple-500 to-indigo-600',
    light: 'rgba(156, 39, 176, 0.1)',
    border: 'rgba(156, 39, 176, 0.3)'
  },
  'Design': {
    primary: '#E91E63',
    gradient: 'from-pink-500 to-rose-600',
    light: 'rgba(233, 30, 99, 0.1)',
    border: 'rgba(233, 30, 99, 0.3)'
  },
  'AI/ML': {
    primary: '#3F51B5',
    gradient: 'from-indigo-500 to-blue-700',
    light: 'rgba(63, 81, 181, 0.1)',
    border: 'rgba(63, 81, 181, 0.3)'
},
  'Other': {
    primary: '#607D8B',
    gradient: 'from-slate-500 to-gray-600',
    light: 'rgba(96, 125, 139, 0.1)',
    border: 'rgba(96, 125, 139, 0.3)'
  }
};

// Comprehensive skill categorization
const skillCategories = {
  'Frontend': [
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular',
    'Next.js', 'Svelte', 'Tailwind CSS', 'Bootstrap', 'Material-UI',
    'Redux', 'Context API', 'GraphQL', 'Webpack', 'Vite', 'jQuery',
    'SASS', 'SCSS', 'Styled Components', 'Emotion', 'Framer Motion'
  ],
  'Backend': [
    'Node.js', 'Express', 'Django', 'Flask', 'Java', 'Spring Boot',
    'PHP', 'Laravel', 'Ruby', 'Ruby on Rails', 'Go', 'C#', '.NET',
    'REST API', 'GraphQL', 'Socket.io', 'WebSockets', 'JWT', 'OAuth'
  ],
  'Database': [
    'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase',
    'SQLite', 'Oracle', 'SQL Server', 'Cassandra', 'Elasticsearch',
    'Prisma', 'Sequelize', 'Mongoose', 'TypeORM'
  ],
  'DevOps': [
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD',
    'Jenkins', 'GitHub Actions', 'GitLab CI', 'Terraform',
    'Ansible', 'Nginx', 'Apache', 'Linux', 'Shell Scripting'
  ],
  'Mobile': [
    'React Native', 'Flutter', 'Swift', 'Kotlin', 'Android',
    'iOS', 'Xamarin', 'Ionic', 'Cordova', 'Expo'
  ],
  'Design': [
    'Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UI/UX',
    'Wireframing', 'Prototyping', 'Responsive Design', 'Material Design',
    'User Research', 'Accessibility'
  ],
  'AI/ML': [
   'Python', 'NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow', 'Keras', 'PyTorch',
   'OpenCV', 'NLTK', 'spaCy', 'Hugging Face Transformers', 'MLflow', 'Jupyter Notebook',
   'Data Preprocessing', 'Model Deployment', 'Computer Vision', 'NLP', 'Prompt Engineering',
   'ChatGPT API', 'LangChain'
]
};

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${API_URL}/projects`);
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

        // Categorize skills using the comprehensive mapping
        const categorizedSkills = Object.entries(skillCounts).reduce((acc, [skill, count]) => {
          let category = 'Other';
          
          // Find the category for the skill
          for (const [cat, skills] of Object.entries(skillCategories)) {
            if (skills.some(s => s.toLowerCase() === skill.toLowerCase())) {
              category = cat;
              break;
            }
          }
          
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push({ name: skill, count });
          return acc;
        }, {});

        // Sort skills within each category by count
        Object.keys(categorizedSkills).forEach(category => {
          categorizedSkills[category].sort((a, b) => b.count - a.count);
        });

        setCategories(categorizedSkills);
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
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-400"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="min-h-screen bg-[#081b29] py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-white mb-4">My Skills</h2>
          <p className="text-cyan-400 text-lg">Technologies I work with</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {Object.entries(categories).map(([category, skills], categoryIndex) => (
            <div key={category} className="space-y-6" data-aos="fade-up" data-aos-delay={categoryIndex * 100}>
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${categoryColors[category].gradient}`}></div>
                <h3 className="text-2xl font-semibold text-white">{category}</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="relative group"
                    data-aos="zoom-in"
                    data-aos-delay={index * 50}
                  >
                    <div 
                      className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                      style={{ 
                        background: `linear-gradient(to right, ${categoryColors[category].light}, transparent)`
                      }}
                    ></div>
                    <div
                      className="relative bg-[#0d2a3f] rounded-lg p-6 transform transition-all duration-300 hover:scale-105"
                      style={{ 
                        boxShadow: `0 0 15px ${categoryColors[category].border}`,
                        border: `1px solid ${categoryColors[category].border}`
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 
                          className="text-xl font-semibold truncate pr-2" 
                          style={{ color: categoryColors[category].primary }}
                        >
                          {skill.name}
                        </h3>
                        <span className="text-sm text-gray-400 whitespace-nowrap">
                          {skill.count} {skill.count === 1 ? 'project' : 'projects'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-2.5 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${(skill.count / Math.max(...skills.map(s => s.count))) * 100}%`,
                            background: `linear-gradient(to right, ${categoryColors[category].primary}, ${categoryColors[category].primary}dd)`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 