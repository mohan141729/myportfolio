import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [projects, setProjects] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [adminDetails, setAdminDetails] = useState({
    address: "",
    email: "",
    phone: "",
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailedDescription: "",
    image: "",
    category: "",
    programmingLanguages: "",
    skills: "",
    projectLink: "",
  });
  const [editingProject, setEditingProject] = useState(null);
  const [adminForm, setAdminForm] = useState({
    address: "",
    email: "",
    phone: "",
  });

  // Fetch Projects
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Fetch Feedbacks
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/feedback");
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  // Fetch Admin Details
  const fetchAdminDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin-details");
      setAdminDetails(response.data);
      setAdminForm(response.data);
    } catch (error) {
      console.error("Error fetching admin details:", error);
      // Fallback defaults
      setAdminDetails({
        address: "123 Main Street, Izmir, Turkey",
        email: "info@example.com",
        phone: "123-456-7890",
      });
      setAdminForm({
        address: "123 Main Street, Izmir, Turkey",
        email: "info@example.com",
        phone: "123-456-7890",
      });
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchFeedbacks();
    fetchAdminDetails();
  }, []);

  // Handlers for project management
  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await axios.put(`http://localhost:5000/projects/${editingProject.id}`, formData);
        alert("Project updated successfully");
      } else {
        await axios.post("http://localhost:5000/projects", formData);
        alert("Project added successfully");
      }
      setFormData({
        title: "",
        description: "",
        detailedDescription: "",
        image: "",
        category: "",
        programmingLanguages: "",
        skills: "",
        projectLink: "",
      });
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Error saving project: " + error.message);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      detailedDescription: project.detailedDescription,
      image: project.image,
      category: project.category,
      programmingLanguages: project.programmingLanguages,
      skills: project.skills,
      projectLink: project.projectLink,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Handlers for feedback messages
  const handleFeedbackDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/feedback/${id}`);
      fetchFeedbacks();
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const handleFeedbackReply = (feedback) => {
    const reply = window.prompt("Enter your reply:", "");
    if (reply) {
      // In a real app, implement sending a reply (e.g. via email)
      alert(`Reply sent to ${feedback.email}: ${reply}`);
    }
  };

  // Handlers for admin details
  const handleAdminInputChange = (e) => {
    setAdminForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdminDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/admin-details", adminForm);
      alert("Admin details updated successfully");
      fetchAdminDetails();
    } catch (error) {
      console.error("Error updating admin details:", error);
      alert("Error updating admin details: " + error.message);
    }
  };

  // Fixed Sidebar Component
  const Sidebar = () => (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <ul>
        <li
          onClick={() => setActiveSection("home")}
          className={`cursor-pointer p-2 mb-2 rounded ${activeSection === "home" ? "bg-blue-500" : "hover:bg-gray-700"}`}
        >
          Home
        </li>
        <li
          onClick={() => setActiveSection("admin")}
          className={`cursor-pointer p-2 mb-2 rounded ${activeSection === "admin" ? "bg-blue-500" : "hover:bg-gray-700"}`}
        >
          Admin Details
        </li>
        <li
          onClick={() => setActiveSection("projects")}
          className={`cursor-pointer p-2 mb-2 rounded ${activeSection === "projects" ? "bg-blue-500" : "hover:bg-gray-700"}`}
        >
          Projects
        </li>
        <li
          onClick={() => setActiveSection("contact")}
          className={`cursor-pointer p-2 mb-2 rounded ${activeSection === "contact" ? "bg-blue-500" : "hover:bg-gray-700"}`}
        >
          Contact
        </li>
      </ul>
    </div>
  );

  // Render sections conditionally
  const renderAdminDetailsSection = () => (
    <div className="bg-gray-800 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Admin Details</h2>
      <form onSubmit={handleAdminDetailsSubmit}>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={adminForm.address}
          onChange={handleAdminInputChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={adminForm.email}
          onChange={handleAdminInputChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={adminForm.phone}
          onChange={handleAdminInputChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
          required
        />
        <button type="submit" className="bg-green-600 px-4 py-2 rounded hover:bg-green-500 transition">
          Update Admin Details
        </button>
      </form>
    </div>
  );

  const renderProjectsSection = () => (
    <div>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingProject ? "Edit Project" : "Add Project"}
        </h2>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
          required
        />
        <textarea
          name="detailedDescription"
          placeholder="Detailed Description"
          value={formData.detailedDescription}
          onChange={handleInputChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
          rows="3"
          required
        ></textarea>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleInputChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
          required
        />
        <input
          type="text"
          name="programmingLanguages"
          placeholder="Programming Languages"
          value={formData.programmingLanguages}
          onChange={handleInputChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
          required
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills"
          value={formData.skills}
          onChange={handleInputChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
          required
        />
        <input
          type="text"
          name="projectLink"
          placeholder="Project Link"
          value={formData.projectLink}
          onChange={handleInputChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
          required
        />
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition">
          {editingProject ? "Update Project" : "Add Project"}
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-800 p-4 rounded-lg">
            <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-3">{project.title}</h3>
            <p className="text-sm text-gray-400">{project.description}</p>
            <p className="text-sm text-gray-400">{project.category}</p>
            <div className="mt-3 flex space-x-3">
              <button onClick={() => handleEdit(project)} className="bg-yellow-500 p-2 rounded hover:bg-yellow-400 transition">
                <FiEdit />
              </button>
              <button onClick={() => handleDelete(project.id)} className="bg-red-500 p-2 rounded hover:bg-red-400 transition">
                <FiTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFeedbackSection = () => (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Feedback Messages</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback messages.</p>
      ) : (
        <ul>
          {feedbacks.map((fb) => (
            <li key={fb.id} className="mb-4 p-4 bg-gray-800 rounded flex flex-col">
              <p>
                <span className="font-bold">Name:</span> {fb.name}
              </p>
              <p>
                <span className="font-bold">Email:</span> {fb.email}
              </p>
              <p>
                <span className="font-bold">Message:</span> {fb.message}
              </p>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => handleFeedbackReply(fb)}
                  className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 transition text-sm"
                >
                  Reply
                </button>
                <button
                  onClick={() => handleFeedbackDelete(fb.id)}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-500 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Fixed Sidebar */}
      <Sidebar />
      {/* Main Content with left margin for fixed sidebar */}
      <div className="ml-64 p-6">
        <button
          onClick={() => navigate("/")}
          className="mb-4 bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Back to Portfolio
        </button>
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
        {activeSection === "home" && (
          <div>
            {renderAdminDetailsSection()}
            {renderProjectsSection()}
            {renderFeedbackSection()}
          </div>
        )}
        {activeSection === "admin" && renderAdminDetailsSection()}
        {activeSection === "projects" && renderProjectsSection()}
        {activeSection === "contact" && renderFeedbackSection()}
      </div>
    </div>
  );
};

export default AdminDashboard;
