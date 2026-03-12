import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import BlogPage from "./pages/BlogPage";
import QuestionsPage from "./pages/Questions";   // add this
import ErrorBoundary from './pages/ErrorBoundary';

function App() {
  return (
    <>
        <ErrorBoundary>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPage />} />

        {/* ADD THIS */}
        <Route path="/questions" element={<QuestionsPage />} />

      </Routes>
         </ErrorBoundary>
    </>
  );
}

export default App;