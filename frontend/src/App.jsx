import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";   // correct path check karo
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPage />} />
    </Routes>
    </>
  );
}

export default App;