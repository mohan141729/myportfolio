// App.jsx
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoadingPage from "./pages/loadingPage";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoadingPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      
    </Routes>
  </Router>
);

export default App;



