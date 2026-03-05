import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdKeyboardArrowLeft } from "react-icons/md";
import {FaArrowLeft, FaHome, FaUserShield } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Theme management (same as home page)
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://portfolio-csao.onrender.com/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        toast.success("Login successful! 🚀");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        toast.error(data.message || "Invalid credentials ❌");
      }
    } catch (error) {
      toast.error("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white
                    dark:bg-gradient-to-br dark:from-gray-100 dark:via-gray-200 dark:to-gray-300 dark:text-gray-900
                    transition-colors duration-500 relative overflow-hidden">
        
        {/* Animated Background (same as home page) */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600 dark:bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600 dark:bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-96 h-96 bg-pink-600 dark:bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Stylish Navigation Bar */}
        <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-xl shadow-2xl dark:bg-gray-100/80 border-b border-gray-800/50 dark:border-gray-300/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo with subtle animation */}
              <Link to="/" className="flex-shrink-0 group cursor-pointer relative">
                <div className="text-3xl font-bold relative">
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent dark:text-gray-900">
                    {"<Neetesh />"}
                  </span>
                  <span className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur-xl opacity-30 group-hover:opacity-50 transition"></span>
                </div>
                <p className="text-xs text-gray-400 mt-1 dark:text-gray-300 tracking-wide">
                  MERN Stack Developer
                </p>
              </Link>

              {/* Desktop Back Button Group */}
              <div className="hidden md:flex items-center space-x-3">
                {/* Modern Back Button with Icon */}
                <Link
                  to="/"
                  className="relative group"
                  title="Return to Home"
                >
                  {/* Animated background */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                  
                  {/* Button content */}
                  <div className="relative flex items-center space-x-2 px-5 py-2.5 bg-gray-800/90 dark:bg-gray-200/90 rounded-xl border border-gray-700 dark:border-gray-300 overflow-hidden">
                    {/* Animated gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 dark:from-indigo-400/20 dark:to-purple-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    
                    {/* Icon with animation */}
                    <IoMdArrowRoundBack className="relative text-indigo-400 dark:text-indigo-500 group-hover:-translate-x-1 transition-transform duration-300" size={18} />
                    
                    {/* Text with gradient on hover */}
                    <span className="relative text-sm font-medium text-gray-300 dark:text-gray-700 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      Back
                    </span>
                    
                    {/* Home icon that appears on hover */}
                    <FaHome className="relative opacity-0 group-hover:opacity-100 ml-1 text-indigo-400 dark:text-indigo-500 text-xs transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" />
                  </div>
                </Link>
                
                {/* Enhanced Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="relative group p-3 rounded-xl bg-gray-800/90 dark:bg-gray-200/90 border border-gray-700 dark:border-gray-300 hover:scale-105 transition-all duration-300"
                  title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                  
                  {/* Icon with animation */}
                  <span className="relative block transform group-hover:rotate-12 transition-transform duration-300">
                    {theme === 'dark' ? '🌞' : '🌙'}
                  </span>
                </button>
              </div>

              {/* Mobile Header Icons */}
              <div className="md:hidden flex items-center space-x-2">
                {/* Theme Toggle for Mobile */}
                <button
                  onClick={toggleTheme}
                  className="relative p-2.5 rounded-xl bg-gray-800/90 dark:bg-gray-200/90 border border-gray-700 dark:border-gray-300"
                >
                  <span className="block">
                    {theme === 'dark' ? '🌞' : '🌙'}
                  </span>
                </button>
                
                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="relative p-2.5 rounded-xl bg-gray-800/90 dark:bg-gray-200/90 border border-gray-700 dark:border-gray-300"
                >
                  <svg className="w-5 h-5 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 mx-4 mt-2">
              <div className="bg-gray-800/95 dark:bg-gray-200/95 backdrop-blur-xl rounded-2xl border border-gray-700 dark:border-gray-300 overflow-hidden shadow-2xl animate-slideDown">
                {/* Return Home Option - Prominent and Stylish */}
                <Link
                  to="/"
                  className="block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 dark:from-indigo-400/20 dark:to-purple-400/20 border-b border-gray-700 dark:border-gray-300">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <BiHomeAlt className="text-white text-2xl" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 dark:text-gray-600">Return to</p>
                      <p className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Home Page</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
 <FaArrowLeft className="text-indigo-400 text-sm" />                    </div>
                  </div>
                </Link>

                {/* Admin Info */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gray-700/30 dark:bg-gray-300/30 rounded-xl">
                    <FaUserShield className="text-indigo-400" />
                    <span className="text-sm text-gray-300 dark:text-gray-700">Admin Access Only</span>
                  </div>
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gray-700/30 dark:bg-gray-300/30 rounded-xl">
                    <span className="text-indigo-400 text-lg">🔒</span>
                    <span className="text-sm text-gray-300 dark:text-gray-700">Secure Login Required</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Login Form Section - Centered vertically */}
        <section className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20 px-4">
          <div className="max-w-md w-full -mt-12 md:-mt-16">
            {/* Form Container */}
            <div className="relative group">
              {/* Animated border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-300"></div>
              
              <div className="relative bg-gray-800/90 dark:bg-gray-200/90 backdrop-blur-xl rounded-2xl border border-gray-700 dark:border-gray-300 p-6 md:p-8 transition-colors duration-500">
                
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent dark:text-gray-900">
                      Admin Login
                    </span>
                  </h2>
                  <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
                  <p className="text-sm md:text-base text-gray-400 dark:text-gray-600 mt-3 md:mt-4">
                    Access the admin dashboard
                  </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
                  {/* Email Field */}
                  <div className="space-y-1 md:space-y-2">
                    <label className="text-xs md:text-sm text-gray-400 dark:text-gray-600 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <MdEmail className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="admin@example.com"
                        className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 text-sm md:text-base bg-gray-700/50 dark:bg-gray-300/30 border border-gray-600 dark:border-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-500 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-500"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1 md:space-y-2">
                    <label className="text-xs md:text-sm text-gray-400 dark:text-gray-600 block">
                      Password
                    </label>
                    <div className="relative">
                      <MdLock className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 text-sm md:text-base bg-gray-700/50 dark:bg-gray-300/30 border border-gray-600 dark:border-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-500 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-500"
                      />
                    </div>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-xl font-semibold hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105 text-sm md:text-base text-white dark:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging in...
                      </span>
                    ) : "Login to Dashboard"}
                  </button>
                </form>

                {/* Mobile Hint */}
                <div className="mt-4 text-center md:hidden">
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Secure admin access only
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="absolute bottom-0 w-full bg-gray-900/50 dark:bg-gray-100/50 py-3 md:py-4 border-t border-gray-800 dark:border-gray-300 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-xs md:text-sm text-gray-400 dark:text-gray-600 transition-colors duration-500">
              © 2026 Neetesh's Portfolio - Admin Panel
            </p>
          </div>
        </footer>
      </div>

      {/* Add animation keyframes */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default AdminLogin;