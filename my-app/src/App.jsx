// App.jsx
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoadingPage from "./pages/loadingPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;



