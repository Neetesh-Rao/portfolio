import { useState, useEffect } from 'react';
import { FaBootstrap } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaDownload,
  FaArrowUp,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaServer,
  FaCloud,
  FaGitAlt,
  FaExternalLinkAlt,
  FaHeart,
  FaStar,
  FaTimes,
  FaUserShield,
  FaBlog,
  FaCrown
} from 'react-icons/fa';

import {
  SiMongodb,
  SiExpress,
  SiRedux,
  SiTailwindcss,
  SiJavascript,
  SiPostman,
  SiJsonwebtokens,
  SiCss3,
  SiHtml5
} from 'react-icons/si';
import { HiMenu, HiX, HiChip } from 'react-icons/hi';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { IoMdArrowRoundBack } from "react-icons/io";
import headerimage from '/profile.jpeg'
import bitmax from '/ChatGPT Image Mar 2, 2026, 05_10_42 PM.png'
import wandarlust from '/wandarlust.png'
import resume from '/Resume_Neetesh.pdf'


function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll spy and effects
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Skills Data
  const skills = {
    frontend: [
      { name: 'HTML5', icon: <SiHtml5 className="text-orange-500" />, level: 95, color: 'from-orange-400 to-orange-600' },
      { name: 'CSS3', icon: <SiCss3 className="text-blue-500" />, level: 92, color: 'from-blue-400 to-blue-600' },
      { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" />, level: 94, color: 'from-yellow-400 to-yellow-600' },
      { name: 'React.js', icon: <FaReact className="text-blue-400" />, level: 90, color: 'from-blue-400 to-blue-600' },
      { name: 'Redux', icon: <SiRedux className="text-purple-500" />, level: 88, color: 'from-purple-400 to-purple-600' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" />, level: 90, color: 'from-cyan-400 to-cyan-600' },
      { name: 'Bootstrap', icon: <FaBootstrap className="text-purple-600" />, level: 85, color: 'from-purple-500 to-purple-700' },
    ],

    backend: [
      { name: 'Node.js', icon: <FaNodeJs className="text-green-500" />, level: 92, color: 'from-green-400 to-green-600' },
      { name: 'Express.js', icon: <SiExpress className="text-gray-400" />, level: 90, color: 'from-gray-500 to-gray-700' },
      { name: 'REST APIs', icon: <FaServer className="text-orange-400" />, level: 94, color: 'from-orange-400 to-orange-600' },
      { name: 'JWT Authentication', icon: <SiJsonwebtokens className="text-yellow-500" />, level: 90, color: 'from-yellow-400 to-yellow-600' },
    ],

    database: [
      { name: 'MongoDB', icon: <SiMongodb className="text-green-500" />, level: 92, color: 'from-green-400 to-green-600' },
      { name: 'SQL', icon: <FaDatabase className="text-blue-400" />, level: 85, color: 'from-blue-400 to-blue-600' },
    ],

    tools: [
      { name: 'Git/GitHub', icon: <FaGitAlt className="text-orange-600" />, level: 94, color: 'from-orange-500 to-orange-700' },
      { name: 'Postman', icon: <SiPostman className="text-orange-500" />, level: 92, color: 'from-orange-400 to-orange-600' },
      { name: 'VS Code', icon: <HiChip className="text-blue-500" />, level: 95, color: 'from-blue-400 to-blue-600' },
    ]
  };
  // Projects Data
  const projects = [


    {
      id: 1,
      title: "WandarLust",
      description: "Come and AirBnb your property and get great value!",
      image: wandarlust,
      tech: ["MERN", "Maps API", "Analytics"],
      features: ["Room Booking", "Payment Gateway", "Reviews"],
      github: "#",
      live: "#"
    },
    {
      id: 4,
      title: "Learning Management System",
      description: "Online education platform with video courses, quizzes, and certificates",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tech: ["MERN", "Video Streaming", "Payment"],
      features: ["Video Courses", "Live Classes", "Quizzes"],
      github: "#",
      live: "#"
    },
    {
      id: 5,
      title: "Healthcare Portal",
      description: "Telemedicine platform connecting patients with doctors",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tech: ["MERN", "Video Call", "PDF Gen"],
      features: ["Appointments", "Video Consultation", "Prescriptions"],
      github: "#",
      live: "#"
    },
    {
      id: 6,
      title: "Real Estate Platform",
      description: "Property listing and management system with virtual tours",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tech: ["MERN", "3D Tours", "Maps"],
      features: ["Property Listings", "3D Tour", "Agent Chat"],
      github: "#",
      live: "#"
    }
  ];

  // Experience Data
  const experiences = [
    {
      company: "Bitmax Technology, Sector 90",
      position: "Full Stack Developer Intern",
      duration: "2026 - Present",
      description: "Working on full-stack web applications using MERN stack, developing REST APIs, integrating frontend with backend, and collaborating on live production projects."
    },
    {
      company: "Tech Solutions Inc.",
      position: "Senior MERN Stack Developer",
      duration: "2022 - 2025",
      description: "Led full-stack development for enterprise applications and managed scalable MERN-based solutions."
    },
    {
      company: "Digital Innovations",
      position: "Full Stack Developer",
      duration: "2020 - 2022",
      description: "Developed multiple production-ready web applications using React, Node.js, and MongoDB."
    }
  ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // const response = await fetch("http://localhost:5000/send-email", {
            const response = await fetch("https://portfolio-csao.onrender.com/send-email", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully 🚀");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message ❌");
      }
    } catch (error) {
      toast.error("Server error ❌");
    }

    setLoading(false);
  };
  // start with "dark" by default but override with saved preference or system setting
  const [theme, setTheme] = useState('dark');

  // initialize theme on first mount
  useEffect(() => {
    // read previous selection from localStorage
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    } else {
      // if nothing stored, fall back to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // reflect theme in <html> class and persist the choice
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const openResume = () => setIsResumeOpen(true);
  const closeResume = () => setIsResumeOpen(false);
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeResume();
      }
    };

    if (isResumeOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // lock scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isResumeOpen]);
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white
                dark:bg-gradient-to-br dark:from-gray-100 dark:via-gray-200 dark:to-gray-300 dark:text-gray-900">
        {/* All your sections go here */}
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-500 ${activeSection !== 'home'
            ? 'bg-gray-900/95 backdrop-blur-lg shadow-2xl dark:bg-gray-100/95'
            : 'bg-transparent dark:bg-transparent'
          }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">

              {/* Logo with Name */}
              <div className="flex-shrink-0 group cursor-pointer">
                <div className="text-3xl font-bold relative">
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent dark:text-gray-900">
                    {"<Neetesh />"}
                  </span>
                  <span className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur-xl opacity-30 group-hover:opacity-50 transition"></span>
                </div>
                <p className="text-xs text-gray-400 mt-1 dark:text-gray-300">
                  MERN Stack Developer
                </p>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-4">
                {['Home', 'About', 'Skills', 'Projects', 'Contact',].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeSection === item.toLowerCase()
                        ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 dark:text-gray-900 dark:bg-gradient-to-r dark:from-indigo-400 dark:to-purple-400'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700'
                      }`}
                  >
                    {item}
                  </a>
                ))}

                {/* Redesigned Admin & Blog Links - Side by side with new style */}
                <div className="flex items-center space-x-2 ml-2">
                  {/* Admin Link - Premium Style */}
                  <Link
                    to="/admin"
                    className="relative group"
                    title="Admin Dashboard"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                    <div className="relative flex items-center space-x-2 px-4 py-2.5 bg-gray-800/90 dark:bg-gray-200/90 rounded-xl border border-gray-700 dark:border-gray-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 dark:from-indigo-400/20 dark:to-purple-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <FaUserShield className="relative text-indigo-400 dark:text-indigo-500 group-hover:scale-110 transition-transform" size={16} />
                      <span className="relative text-sm font-medium text-gray-300 dark:text-gray-700 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text">
                        Admin
                      </span>
                      <FaCrown className="relative opacity-0 group-hover:opacity-100 text-yellow-400 text-xs transition-all duration-300 transform scale-0 group-hover:scale-100" size={12} />
                    </div>
                  </Link>

                  {/* Blog Link - Premium Style */}
                  <Link
                    to="/blog"
                    className="relative group"
                    title="Read Blog"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                    <div className="relative flex items-center space-x-2 px-4 py-2.5 bg-gray-800/90 dark:bg-gray-200/90 rounded-xl border border-gray-700 dark:border-gray-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-orange-600/20 dark:from-pink-400/20 dark:to-orange-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <FaBlog className="relative text-pink-400 dark:text-pink-500 group-hover:scale-110 transition-transform" size={16} />
                      <span className="relative text-sm font-medium text-gray-300 dark:text-gray-700 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-orange-400 group-hover:bg-clip-text">
                        Blog
                      </span>
                      <span className="relative opacity-0 group-hover:opacity-100 text-xs transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">📝</span>
                    </div>
                  </Link>
                </div>

                {/* Enhanced Theme Toggle Button */}
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

              {/* Mobile Menu Button */}
              <button
                className="md:hidden relative w-12 h-12 rounded-xl bg-gray-800/50 dark:bg-gray-200/50 border border-gray-700 dark:border-gray-300 hover:border-indigo-500 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <HiX className="w-6 h-6 mx-auto text-indigo-400" /> : <HiMenu className="w-6 h-6 mx-auto text-gray-400 dark:text-gray-900" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-gray-900/95 dark:bg-gray-100/95 backdrop-blur-lg border-t border-gray-800 dark:border-gray-300">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-6 py-3 text-gray-300 dark:text-gray-700 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white dark:hover:text-white dark:hover:bg-gradient-to-r dark:hover:from-indigo-400 dark:hover:to-purple-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}

              {/* Mobile Admin & Blog Links */}
              <div className="px-6 py-3 space-y-2">
                <Link
                  to="/admin"
                  className="flex items-center space-x-3 px-4 py-3 bg-gray-800/50 dark:bg-gray-200/50 rounded-xl border border-gray-700 dark:border-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUserShield className="text-indigo-400" size={18} />
                  <span className="text-gray-300 dark:text-gray-700 font-medium">Admin Dashboard</span>
                </Link>
                <Link
                  to="/blog"
                  className="flex items-center space-x-3 px-4 py-3 bg-gray-800/50 dark:bg-gray-200/50 rounded-xl border border-gray-700 dark:border-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaBlog className="text-pink-400" size={18} />
                  <span className="text-gray-300 dark:text-gray-700 font-medium">Blog</span>
                </Link>
              </div>

              {/* Mobile Theme Toggle */}
              <div className="px-6 py-3">
                <button
                  onClick={toggleTheme}
                  className="w-full p-3 rounded-xl bg-gray-800/90 dark:bg-gray-200/90 border border-gray-700 dark:border-gray-300 text-gray-300 dark:text-gray-700 hover:scale-105 transition flex items-center justify-center space-x-2"
                >
                  <span className="transform group-hover:rotate-12 transition-transform">
                    {theme === 'dark' ? '🌞' : '🌙'}
                  </span>
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gray-900 dark:bg-gray-100 transition-colors duration-500">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600 dark:bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600 dark:bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-40 w-96 h-96 bg-pink-600 dark:bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              {/* Profile Image */}
              <div className="relative inline-block mb-8 group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <div className="relative w-40 h-40 mx-auto rounded-full border-4 border-gray-800 dark:border-gray-300 overflow-hidden">
                  <img
                    src={headerimage}
                    alt="Neetesh"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name with Style */}
              <h1 className="text-6xl md:text-8xl font-bold mb-4">
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent dark:text-gray-900">
                  Neetesh
                </span>
              </h1>

              <div className="flex items-center justify-center space-x-2 mb-4">
                <FaStar className="text-yellow-400 animate-pulse" />
                <p className="text-xl text-gray-300 dark:text-gray-800">MERN Stack Developer</p>
                <FaStar className="text-yellow-400 animate-pulse" />
              </div>

              <p className="text-gray-400 dark:text-gray-700 mb-8 max-w-2xl mx-auto">
                Transforming ideas into powerful web applications with MongoDB, Express.js, React, and Node.js
              </p>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                <span className="px-4 py-2 bg-gray-800/50 dark:bg-gray-200/30 rounded-full text-sm border border-gray-700 dark:border-gray-300 flex items-center text-gray-300 dark:text-gray-900">
                  <FaReact className="text-blue-400 mr-2" /> React
                </span>
                <span className="px-4 py-2 bg-gray-800/50 dark:bg-gray-200/30 rounded-full text-sm border border-gray-700 dark:border-gray-300 flex items-center text-gray-300 dark:text-gray-900">
                  <FaNodeJs className="text-green-400 mr-2" /> Node.js
                </span>
                <span className="px-4 py-2 bg-gray-800/50 dark:bg-gray-200/30 rounded-full text-sm border border-gray-700 dark:border-gray-300 flex items-center text-gray-300 dark:text-gray-900">
                  <SiExpress className="text-gray-400 mr-2" /> Express
                </span>
                <span className="px-4 py-2 bg-gray-800/50 dark:bg-gray-200/30 rounded-full text-sm border border-gray-700 dark:border-gray-300 flex items-center text-gray-300 dark:text-gray-900">
                  <SiMongodb className="text-green-500 mr-2" /> MongoDB
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <a
                  href="#contact"
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-xl font-semibold hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105 text-white dark:text-gray-900"
                >
                  Hire Neetesh
                </a>
                {/* <a
          href="Resume_Neetesh.pdf"
          download="Resume_Neetesh.pdf"
          className="px-8 py-4 bg-gray-800/80 dark:bg-gray-200/30 border border-gray-700 dark:border-gray-300 rounded-xl font-semibold hover:border-indigo-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-gray-300 dark:text-gray-900"
        >
          <FaDownload className="mr-2" /> Download Resume
        </a> */}
                <button
                  onClick={openResume}
                  className="px-8 py-4 bg-gray-800/80 dark:bg-gray-200/30 border border-gray-700 dark:border-gray-300 rounded-xl font-semibold hover:border-indigo-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-gray-300 dark:text-gray-900"
                >
                  <FaDownload className="mr-2" /> View Resume
                </button>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-4">
                {[
                  { icon: <FaGithub />, href: 'https://github.com/Neetesh-Rao', label: 'GitHub' },
                  { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/neetesh-kumar-yadav-714767254/', label: 'LinkedIn' },
                  { icon: <FaInstagram />, href: 'https://www.instagram.com/chaudhary_neetesh_yadav/', label: 'Instagram' }, // New
                ].map((social, index) => {
                  const isExternal = social.href.startsWith("http");

                  return (
                    <a
                      key={index}
                      href={social.href}
                      target={isExternal ? "_blank" : "_self"}
                      rel={isExternal ? "noopener noreferrer" : ""}
                      className="p-3 bg-gray-800/50 dark:bg-gray-200/30 rounded-lg border border-gray-700 dark:border-gray-300 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 dark:hover:from-indigo-400 dark:hover:to-purple-400 transition-all duration-300 transform hover:-translate-y-1 text-gray-300 dark:text-gray-900"
                      title={social.label}
                    >
                      {social.icon}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-gray-900/50 dark:bg-gray-100/50 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent dark:text-gray-900">
                  About Neetesh
                </span>
              </h2>
              <div className="w-28 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 rounded-2xl blur-2xl opacity-30"></div>
                <img
                  src={bitmax}
                  alt="Neetesh Coding"
                  className="relative rounded-2xl shadow-2xl"
                />
              </div>

              <div className="space-y-6">
                <p className="text-2xl text-gray-300 dark:text-gray-800 leading-relaxed">
                  Hi, I'm <span className="text-indigo-400 font-bold dark:text-indigo-500">Neetesh</span>, currently working as a
                  <span className="text-indigo-400 font-semibold dark:text-indigo-500"> Full Stack Developer Intern </span>
                  at <span className="text-purple-400 font-semibold dark:text-purple-500">Bitmax Technology, Sector 90 Noida</span>.
                </p>

                <p className="text-gray-400 dark:text-gray-700 leading-relaxed">
                  I work on real-world web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js).
                  My responsibilities include building REST APIs, integrating frontend with backend services,
                  database design, and optimizing application performance.
                </p>

                <p className="text-gray-400 dark:text-gray-700 leading-relaxed">
                  I am passionate about writing clean, scalable code and continuously improving my development skills
                  by working on live projects and enterprise-level solutions.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                  <div className="p-5 bg-gray-800/50 dark:bg-gray-200/30 rounded-xl border border-gray-700 dark:border-gray-300 text-center transition-colors duration-500">
                    <div className="text-4xl font-bold text-indigo-400 dark:text-indigo-500">1+</div>
                    <div className="text-sm text-gray-400 dark:text-gray-700">Years Learning</div>
                  </div>
                  <div className="p-5 bg-gray-800/50 dark:bg-gray-200/30 rounded-xl border border-gray-700 dark:border-gray-300 text-center transition-colors duration-500">
                    <div className="text-4xl font-bold text-indigo-400 dark:text-indigo-500">15+</div>
                    <div className="text-sm text-gray-400 dark:text-gray-700">Projects</div>
                  </div>
                  <div className="p-5 bg-gray-800/50 dark:bg-gray-200/30 rounded-xl border border-gray-700 dark:border-gray-300 text-center transition-colors duration-500">
                    <div className="text-4xl font-bold text-indigo-400 dark:text-indigo-500">MERN</div>
                    <div className="text-sm text-gray-400 dark:text-gray-700">Tech Stack</div>
                  </div>
                  <div className="p-5 bg-gray-800/50 dark:bg-gray-200/30 rounded-xl border border-gray-700 dark:border-gray-300 text-center transition-colors duration-500">
                    <div className="text-4xl font-bold text-indigo-400 dark:text-indigo-500">100%</div>
                    <div className="text-sm text-gray-400 dark:text-gray-700">Dedication</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 bg-gray-900/50 dark:bg-gray-100/50 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent dark:text-gray-900">
                  Neetesh's Skills
                </span>
              </h2>
              <div className="w-28 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            {/* Skill Categories */}
            <div className="space-y-16">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="bg-gray-800/30 dark:bg-gray-200/30 rounded-2xl p-8 border border-gray-700 dark:border-gray-300 transition-colors duration-500">
                  <h3 className="text-3xl font-semibold mb-8 flex items-center capitalize text-gray-300 dark:text-gray-800">
                    {category === 'frontend' && <FaReact className="text-blue-400 dark:text-blue-500 mr-3" />}
                    {category === 'backend' && <FaNodeJs className="text-green-400 dark:text-green-500 mr-3" />}
                    {category === 'database' && <FaDatabase className="text-yellow-400 dark:text-yellow-500 mr-3" />}
                    {category === 'devops' && <FaCloud className="text-blue-300 dark:text-blue-500 mr-3" />}
                    {category === 'tools' && <HiChip className="text-purple-400 dark:text-purple-500 mr-3" />}
                    {category} Expertise
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {skillList.map((skill, index) => (
                      <div key={index} className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition"></div>
                        <div className="relative p-5 bg-gray-800/50 dark:bg-gray-200/30 rounded-lg border border-gray-700 dark:border-gray-300 text-center transition-colors duration-500">
                          <div className="text-4xl mb-3 flex justify-center text-gray-300 dark:text-gray-800">{skill.icon}</div>
                          <h4 className="font-medium text-sm mb-2 text-gray-300 dark:text-gray-800">{skill.name}</h4>
                          <div className="mt-2 w-full bg-gray-700 dark:bg-gray-300 rounded-full h-2">
                            <div
                              className={`bg-gradient-to-r ${skill.color} h-2 rounded-full`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-indigo-400 dark:text-indigo-500 mt-2 block">{skill.level}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-gray-900/50 dark:bg-gray-100/50 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent dark:text-gray-900">
                  Neetesh's Projects
                </span>
              </h2>
              <div className="w-28 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-25 group-hover:opacity-50 transition"></div>
                  <div className="relative bg-gray-800/90 dark:bg-gray-200/50 rounded-xl overflow-hidden border border-gray-700 dark:border-gray-300 transition-colors duration-500">

                    <div className="relative overflow-hidden h-48">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent dark:from-gray-200"></div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 dark:group-hover:text-indigo-500 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 dark:text-gray-800 text-sm mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-700/50 dark:bg-gray-300/30 text-xs rounded-full transition-colors duration-500">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-700 dark:border-gray-300 transition-colors duration-500">
                        <a
                          href="https://github.com/Neetesh-Rao/WandarLust"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-gray-400 dark:text-gray-800 hover:text-white dark:hover:text-gray-900 transition-colors"
                        >
                          <FaGithub />
                          <span className="text-sm">Code</span>
                        </a>
                        <a
                          href="https://wandarlust-5yli.onrender.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                          <span className="text-sm">Live Demo</span>
                          <FaExternalLinkAlt size={12} />
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-24 bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 dark:from-indigo-100/30 dark:via-purple-100/30 dark:to-pink-100/30 transition-colors duration-500"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent dark:text-gray-900">
                  Contact Neetesh
                </span>
              </h2>
              <div className="w-28 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="bg-gray-800/50 dark:bg-gray-200/50 p-8 rounded-xl border border-gray-700 dark:border-gray-300 transition-colors duration-500">
                  <h3 className="text-2xl font-bold mb-6 text-white dark:text-gray-900">Let's Connect</h3>
                  <div className="space-y-4">

                    <div className="flex items-center space-x-4 p-4 bg-gray-700/30 dark:bg-gray-300/20 rounded-lg transition-colors duration-500">
                      <MdEmail className="text-indigo-400 text-xl" />
                      <div>
                        <p className="text-sm text-gray-400 dark:text-gray-600">Email</p>
                        <p className="font-semibold text-white dark:text-gray-900">neeteshyadav0206@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-gray-700/30 dark:bg-gray-300/20 rounded-lg transition-colors duration-500">
                      <MdPhone className="text-indigo-400 text-xl" />
                      <div>
                        <p className="text-sm text-gray-400 dark:text-gray-600">Phone</p>
                        <p className="font-semibold text-white dark:text-gray-900">+91 9927195492</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-gray-700/30 dark:bg-gray-300/20 rounded-lg transition-colors duration-500">
                      <MdLocationOn className="text-indigo-400 text-xl" />
                      <div>
                        <p className="text-sm text-gray-400 dark:text-gray-600">Location</p>
                        <p className="font-semibold text-white dark:text-gray-900">Greater Noida, Uttar Pradesh</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-800/50 dark:bg-gray-200/50 p-8 rounded-xl border border-gray-700 dark:border-gray-300 transition-colors duration-500">
                <h3 className="text-2xl font-bold mb-6 text-white dark:text-gray-900">Send Message</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">

                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your Name"
                        className="w-full px-4 py-3 bg-gray-700/50 dark:bg-gray-300/30 border border-gray-600 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white dark:text-gray-900 transition-colors duration-500"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Your Email"
                        className="w-full px-4 py-3 bg-gray-700/50 dark:bg-gray-300/30 border border-gray-600 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white dark:text-gray-900 transition-colors duration-500"
                      />
                    </div>

                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Your Message"
                      className="w-full px-4 py-3 bg-gray-700/50 dark:bg-gray-300/30 border border-gray-600 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white dark:text-gray-900 transition-colors duration-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300"
                  >
                    {loading ? "Sending..." : "Send to Neetesh"}
                  </button>

                </form>
              </div>

            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-gray-100 py-8 border-t border-gray-800 dark:border-gray-300 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-400 dark:text-gray-700 transition-colors duration-500">
              © 2026{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-bold">
                Neetesh
              </span>
              . Made with <FaHeart className="inline text-red-500 mx-1" />
            </p>
          </div>
        </footer>

        {/* Scroll to Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-2xl hover:shadow-indigo-500/50 
               dark:from-indigo-400 dark:to-purple-400 transition-all duration-300"
          >
            <FaArrowUp className="text-white dark:text-gray-900" />
          </button>
        )}
      </div>
      {/* Resume Modal */}
      {isResumeOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={closeResume}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-opacity duration-300"
          />

          {/* Modal Wrapper */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="relative w-full md:w-4/5 lg:w-3/5 max-h-[92vh] 
        bg-white/10 dark:bg-black/40 
        backdrop-blur-2xl 
        border border-white/20 dark:border-white/10
        rounded-3xl 
        shadow-2xl 
        animate-[fadeInScale_.3s_ease-out]"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
                <h2 className="text-lg md:text-xl font-semibold text-white dark:text-gray-100">
                  Resume Preview
                </h2>

                <button
                  onClick={closeResume}
                  className="p-2 rounded-full bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-all duration-200"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              {/* Resume Viewer */}
              <div className="p-4">
                <iframe
                  src={resume}
                  title="Resume Preview"
                  className="w-full h-[70vh] rounded-xl border border-white/10 dark:border-gray-700"
                />
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-4 px-6 py-4 border-t border-white/10">
                <button
                  onClick={closeResume}
                  className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition"
                >
                  Close
                </button>

                <a
                  href="/Resume_Neetesh.pdf"
                  download={resume}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 transition-transform text-white font-medium flex items-center"
                >
                  <FaDownload className="mr-2" /> Download
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
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
      `}</style>
    </>
  );
}

export default Home;