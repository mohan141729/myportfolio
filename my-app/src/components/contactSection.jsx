import React, { useEffect, useState } from "react";
import axios from "axios";


const ContactSection = () => {
  // Fetch admin details from backend
  const [adminDetails, setAdminDetails] = useState(null);
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/admin-details")
      .then((response) => setAdminDetails(response.data))
      .catch((error) => {
        console.error("Error fetching admin details:", error);
        // fallback defaults if needed
        setAdminDetails({
          address: "Mahabubnagar",
          email: "techlearn2005@example.com",
          phone: "6300097734"
        });
      });
  }, []);

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/feedback", feedback);
      setSubmitted(true);
      setFeedback({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback: " + error.message);
    }
  };
  

  // Build dynamic Google Maps URL using the admin's address
  const mapSrc = adminDetails 
    ? `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(adminDetails.address)}&ie=UTF8&t=&z=14&iwloc=B&output=embed`
    : "https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Izmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed";

  return (
    <section className="text-gray-400 body-font relative bg-[#081b29]">
      
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap" >
        {/* Left: Map and Admin Details */}
        <div className="lg:w-2/3 md:w-1/2 bg-gray-800 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative " data-aos="fade-right">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0"
            frameBorder="0"
            title="map"
            marginHeight="0"
            marginWidth="0"
            scrolling="no"
            src={mapSrc}
          ></iframe>
          <div className="bg-[#081b29] relative flex flex-wrap py-6 rounded shadow-md">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                ADDRESS
              </h2>
              <p className="mt-1">
                {adminDetails ? adminDetails.address : "Loading..."}
              </p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                EMAIL
              </h2>
              <a className="text-cyan-400 leading-relaxed">
                {adminDetails ? adminDetails.email : "Loading..."}
              </a>
              <h2 className="title-font font-semibold text-white tracking-widest text-xs mt-4">
                PHONE
              </h2>
              <p className="leading-relaxed">
                {adminDetails ? adminDetails.phone : "Loading..."}
              </p>
            </div>
          </div>
        </div>
        {/* Right: Feedback Form */}
        <div className="lg:w-1/3 md:w-1/2 bg-[#0d2a3f] flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 p-4 rounded-2xl " data-aos="fade-left">
          <h2 className="text-white text-lg mb-1 font-medium title-font">Feedback</h2>
          <p className="leading-relaxed mb-5 text-gray-300">
            We’d love to hear from you. Please leave your message below.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={feedback.name}
                onChange={handleChange}
                className="w-full bg-gray-700 rounded border border-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={feedback.email}
                onChange={handleChange}
                className="w-full bg-gray-700 rounded border border-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="leading-7 text-sm text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={feedback.message}
                onChange={handleChange}
                className="w-full bg-gray-700 rounded border border-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-white py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="text-white bg-cyan-600 border-0 py-2 px-6 focus:outline-none hover:bg-cyan-400 rounded text-lg"
            >
              {submitted ? "Thank you!" : "Send Feedback"}
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-3">
            Code Smarter Learn Faster
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
