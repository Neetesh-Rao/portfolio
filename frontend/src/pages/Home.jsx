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
  FaCrown,
  FaCode,
  FaLaptopCode,
  FaTools,
  FaRocket,
  FaVideo,
  FaEye
} from 'react-icons/fa';
// Line 23 ke baad ye import add karo
import { useNavigate } from 'react-router-dom';
import { FaQuestionCircle ,FaRobot, FaSpinner} from 'react-icons/fa'; // ya koi bhi icon
import { GiArtificialHive } from 'react-icons/gi'; // Naya import for AI icon
import {
  SiMongodb,
  SiExpress,
  SiRedux,
  SiTailwindcss,
  SiJavascript,
  SiPostman,
  SiJsonwebtokens,
  SiCss3,
  SiHtml5,
  SiMysql,
  SiSocketdotio,
  SiRender,
  SiVercel,
  SiWebrtc
} from 'react-icons/si';
import { HiMenu, HiX, HiChip, HiLightningBolt } from 'react-icons/hi';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { IoMdArrowRoundBack } from "react-icons/io";
import { GiBrain, GiNetworkBars, GiCheckMark, GiPartyPopper } from 'react-icons/gi';
import { BiUser, BiTrendingUp } from 'react-icons/bi';
import headerimage from '/profile.jpeg'
import bitmax from '/ChatGPT Image Mar 2, 2026, 05_10_42 PM.png'
import wandarlust from '/wandarlust.png'
import resume from '/Resume_Neetesh.pdf'

function Home() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [visitorCount, setVisitorCount] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showVisitorBadge, setShowVisitorBadge] = useState(true);

  // 🆕 NEW STATES FOR AI EXPLANATION
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiExplanation, setAiExplanation] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

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

  // REAL Visitor Tracking - NO DUMMY DATA
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // 🔥 APNA DEPLOYED URL YAHAN LAGAO
        const BASE_URL = 'https://portfolio-csao.onrender.com'; // Change this to your deployed URL
        
        const alreadyVisited = localStorage.getItem("visited");

        // Pehle current count fetch karo
        const countRes = await fetch(`${BASE_URL}/api/visitor/count`);
        const countData = await countRes.json();
        
        if (countData.success) {
          setVisitorCount(countData.totalVisitors);
        }

        // Agar first visit hai to track karo
        if (!alreadyVisited) {
          const trackRes = await fetch(
            `${BASE_URL}/api/visitor/track`,
            { method: "POST" }
          );

          const trackData = await trackRes.json();
          console.log("Visitor data:", trackData);
          
          if (trackData.success) {
            setVisitorCount(trackData.totalVisitors);
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 2000);
            localStorage.setItem("visited", "true");
          }
        }
      } catch (err) {
        console.log("Visitor tracking failed:", err);
        // ❌ KOI DUMMY DATA NAHI
      }
    };

    trackVisitor();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Skills Data
  const skills = {
    frontend: [
      { name: 'HTML5', icon: <SiHtml5 className="text-orange-500" />, level: 95, color: 'from-orange-400 to-orange-600', description: 'Semantic markup, SEO optimization' },
      { name: 'CSS3', icon: <SiCss3 className="text-blue-500" />, level: 92, color: 'from-blue-400 to-blue-600', description: 'Flexbox, Grid, Animations' },
      { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" />, level: 94, color: 'from-yellow-400 to-yellow-600', description: 'ES6+, Async/Await, DOM manipulation' },
      { name: 'React.js', icon: <FaReact className="text-blue-400" />, level: 90, color: 'from-blue-400 to-blue-600', description: 'Hooks, Context, Redux' },
      { name: 'Redux', icon: <SiRedux className="text-purple-500" />, level: 88, color: 'from-purple-400 to-purple-600', description: 'State management, Redux Toolkit' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" />, level: 90, color: 'from-cyan-400 to-cyan-600', description: 'Utility-first, responsive design' },
      { name: 'Bootstrap', icon: <FaBootstrap className="text-purple-600" />, level: 85, color: 'from-purple-500 to-purple-700', description: 'Rapid prototyping, components' },
    ],

    backend: [
      { name: 'Node.js', icon: <FaNodeJs className="text-green-500" />, level: 92, color: 'from-green-400 to-green-600', description: 'Event-driven, non-blocking I/O' },
      { name: 'Express.js', icon: <SiExpress className="text-gray-400" />, level: 90, color: 'from-gray-500 to-gray-700', description: 'RESTful APIs, middleware' },
      { name: 'REST APIs', icon: <FaServer className="text-orange-400" />, level: 94, color: 'from-orange-400 to-orange-600', description: 'API design, CRUD operations' },
      { name: 'JWT Auth', icon: <SiJsonwebtokens className="text-yellow-500" />, level: 90, color: 'from-yellow-400 to-yellow-600', description: 'Authentication, authorization' },
      { name: 'Socket.io', icon: <SiSocketdotio className="text-white dark:text-gray-800" />, level: 80, color: 'from-gray-600 to-gray-800', description: 'Real-time bidirectional communication' },
      { name: 'WebRTC', icon: <SiWebrtc className="text-blue-400" />, level: 75, color: 'from-blue-400 to-blue-600', description: 'Peer-to-peer video/audio communication, data channels' },
    ],

    database: [
      { name: 'MongoDB', icon: <SiMongodb className="text-green-500" />, level: 92, color: 'from-green-400 to-green-600', description: 'NoSQL, aggregation, indexing' },
      { name: 'MySQL', icon: <SiMysql className="text-blue-400" />, level: 85, color: 'from-blue-400 to-blue-600', description: 'SQL, relationships, queries' },
    ],

    devops: [
      { name: 'Git/GitHub', icon: <FaGitAlt className="text-orange-600" />, level: 94, color: 'from-orange-500 to-orange-700', description: 'Version control, workflows' },
      { name: 'Render', icon: <SiRender className="text-blue-500" />, level: 88, color: 'from-blue-400 to-blue-600', description: 'Deployment, hosting, CI/CD' },
      { name: 'Vercel', icon: <SiVercel className="text-white dark:text-gray-800" />, level: 90, color: 'from-gray-600 to-gray-800', description: 'Frontend deployment, serverless functions' },
    ],

    tools: [
      { name: 'Postman', icon: <SiPostman className="text-orange-500" />, level: 92, color: 'from-orange-400 to-orange-600', description: 'API testing, collections' },
      { name: 'VS Code', icon: <HiChip className="text-blue-500" />, level: 95, color: 'from-blue-400 to-blue-600', description: 'Extensions, debugging' },
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
      github: "https://github.com/Neetesh-Rao/WandarLust",
      live: "https://wandarlust-5yli.onrender.com/"
    },
    {
      id: 2,
      title: "Learning Management System",
      description: "Online education platform with video courses, quizzes, and certificates",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tech: ["MERN", "Video Streaming", "Payment"],
      features: ["Video Courses", "Live Classes", "Quizzes"],
      github: "https://github.com/Neetesh-Rao/LMS",
      live: "https://lms-demo.onrender.com"
    },
    {
      id: 3,
      title: "Healthcare Portal",
      description: "Telemedicine platform connecting patients with doctors",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tech: ["MERN", "Video Call", "PDF Gen"],
      features: ["Appointments", "Video Consultation", "Prescriptions"],
      github: "https://github.com/Neetesh-Rao/Healthcare",
      live: "https://healthcare-demo.onrender.com"
    },
    {
      id: 4,
      title: "Real Estate Platform",
      description: "Property listing and management system with virtual tours",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tech: ["MERN", "3D Tours", "Maps"],
      features: ["Property Listings", "3D Tour", "Agent Chat"],
      github: "https://github.com/Neetesh-Rao/RealEstate",
      live: "https://realestate-demo.onrender.com"
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
  
  // Theme management
  const [theme, setTheme] = useState('dark');

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
      document.body.style.overflow = "hidden";
    }

    

 
  

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isResumeOpen]);
    // 🆕 AI EXPLANATION FUNCTION
  const getAIExplanation = async (project) => {
    try {
      setSelectedProject(project);
      setShowAIModal(true);
      setAiLoading(true);
      setAiError('');
      setAiExplanation('');

      // Extract repo name from GitHub URL
      // Example: https://github.com/Neetesh-Rao/WandarLust -> Neetesh-Rao/WandarLust
      const repoPath = project.github.replace('https://github.com/', '');
      
      const response = await fetch('http://localhost:5000/api/explain-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repo: repoPath })
      });

      const data = await response.json();
      
      if (response.ok) {
        setAiExplanation(data.explanation);
      } else {
        setAiError(data.error || 'Failed to get explanation');
      }
    } catch (error) {
      console.error('AI Explanation error:', error);
      setAiError('Failed to connect to server');
    } finally {
      setAiLoading(false);
    }
  };
   const closeAIModal = () => {
    setShowAIModal(false);
    setSelectedProject(null);
    setAiExplanation('');
    setAiError('');
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white
                    dark:bg-gradient-to-br dark:from-gray-100 dark:via-gray-200 dark:to-gray-300 dark:text-gray-900">
        
        {/* Navigation - EXACTLY AS YOURS */}
        <nav className={`fixed w-full z-50 transition-all duration-500 ${activeSection !== 'home'
            ? 'bg-gray-900/95 backdrop-blur-lg shadow-2xl dark:bg-gray-100/95'
            : 'bg-transparent dark:bg-transparent'
          }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">

              {/* Logo with Name */}
              <div className="flex-shrink-0 group cursor-pointer">
                <div className="text-xl md:text-3xl font-bold relative">
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent dark:text-gray-900">
                    {"<Neetesh />"}
                  </span>
                  <span className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur-xl opacity-30 group-hover:opacity-50 transition"></span>
                </div>
                <p className="text-[10px] md:text-xs text-gray-400 mt-1 dark:text-gray-300">
                  MERN Stack Developer
                </p>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-4">
                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
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

                {/* Admin & Blog Links */}
                <div className="flex items-center space-x-2 ml-2">
                   <button
    onClick={() => navigate('/questions')}
    className="relative group"
    title="Practice Questions"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
    <div className="relative flex items-center space-x-2 px-4 py-2.5 bg-gray-800/90 dark:bg-gray-200/90 rounded-xl border border-gray-700 dark:border-gray-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 dark:from-green-400/20 dark:to-emerald-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      <FaQuestionCircle className="relative text-green-400 dark:text-green-500 group-hover:scale-110 transition-transform" size={16} />
      <span className="relative text-sm font-medium text-gray-300 dark:text-gray-700 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-emerald-400 group-hover:bg-clip-text">
        Questions
      </span>
    </div>
  </button>
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

                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className="relative group p-3 rounded-xl bg-gray-800/90 dark:bg-gray-200/90 border border-gray-700 dark:border-gray-300 hover:scale-105 transition-all duration-300"
                  title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                  <span className="relative block transform group-hover:rotate-12 transition-transform duration-300">
                    {theme === 'dark' ? '🌞' : '🌙'}
                  </span>
                </button>
              </div>

              {/* Mobile Header Icons */}
              <div className="md:hidden flex items-center space-x-2">
                <button
                  onClick={toggleTheme}
                  className="relative p-2 rounded-xl bg-gray-800/90 dark:bg-gray-200/90 border border-gray-700 dark:border-gray-300 hover:scale-105 transition-all duration-300"
                  title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  <span className="relative block text-lg">
                    {theme === 'dark' ? '🌞' : '🌙'}
                  </span>
                </button>
                <button
                  className="relative w-10 h-10 rounded-xl bg-gray-800/50 dark:bg-gray-200/50 border border-gray-700 dark:border-gray-300 hover:border-indigo-500 transition-colors flex items-center justify-center"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <HiX className="w-5 h-5 text-indigo-400" /> : <HiMenu className="w-5 h-5 text-gray-400 dark:text-gray-900" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-gray-900/95 dark:bg-gray-100/95 backdrop-blur-lg border-t border-gray-800 dark:border-gray-300">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-4 py-3 text-sm text-gray-300 dark:text-gray-700 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white dark:hover:text-white dark:hover:bg-gradient-to-r dark:hover:from-indigo-400 dark:hover:to-purple-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}

              {/* Mobile Admin & Blog Links */}
              <div className="px-4 py-2 space-y-2">
                <button
    onClick={() => {
      navigate('/questions');
      setIsMenuOpen(false);
    }}
    className="flex items-center space-x-3 px-3 py-2 bg-gray-800/50 dark:bg-gray-200/50 rounded-xl border border-gray-700 dark:border-gray-300 w-full text-left"
  >
    <FaQuestionCircle className="text-green-400" size={16} />
    <span className="text-sm text-gray-300 dark:text-gray-700 font-medium">Practice Questions</span>
  </button>
                <Link
                  to="/admin"
                  className="flex items-center space-x-3 px-3 py-2 bg-gray-800/50 dark:bg-gray-200/50 rounded-xl border border-gray-700 dark:border-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUserShield className="text-indigo-400" size={16} />
                  <span className="text-sm text-gray-300 dark:text-gray-700 font-medium">Admin Dashboard</span>
                </Link>
                <Link
                  to="/blog"
                  className="flex items-center space-x-3 px-3 py-2 bg-gray-800/50 dark:bg-gray-200/50 rounded-xl border border-gray-700 dark:border-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaBlog className="text-pink-400" size={16} />
                  <span className="text-sm text-gray-300 dark:text-gray-700 font-medium">Blog</span>
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20 overflow-hidden bg-gray-900 dark:bg-gray-100 transition-colors duration-500">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600 dark:bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600 dark:bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-40 w-96 h-96 bg-pink-600 dark:bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="text-center">
              {/* Profile Image */}
              <div className="relative inline-block mb-6 md:mb-8 group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <div className="relative w-24 h-24 md:w-40 md:h-40 mx-auto rounded-full border-4 border-gray-800 dark:border-gray-300 overflow-hidden">
                  <img
                    src={headerimage}
                    alt="Neetesh"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name with Style */}
              <h1 className="text-4xl md:text-8xl font-bold mb-2 md:mb-4">
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent dark:text-gray-900">
                  Neetesh
                </span>
              </h1>

              <div className="flex items-center justify-center space-x-2 mb-3 md:mb-4">
                <FaStar className="text-yellow-400 animate-pulse text-sm md:text-base" />
                <p className="text-base md:text-xl text-gray-300 dark:text-gray-800">MERN Stack Developer</p>
                <FaStar className="text-yellow-400 animate-pulse text-sm md:text-base" />
              </div>

              <p className="text-sm md:text-base text-gray-400 dark:text-gray-700 mb-6 md:mb-8 max-w-2xl mx-auto px-2">
                Transforming ideas into powerful web applications with MongoDB, Express.js, React, and Node.js
              </p>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-10 px-2">
                <span className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-800/50 dark:bg-gray-200/30 rounded-full text-xs md:text-sm border border-gray-700 dark:border-gray-300 flex items-center text-gray-300 dark:text-gray-900">
                  <FaReact className="text-blue-400 mr-1 md:mr-2" size={12} /> React
                </span>
                <span className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-800/50 dark:bg-gray-200/30 rounded-full text-xs md:text-sm border border-gray-700 dark:border-gray-300 flex items-center text-gray-300 dark:text-gray-900">
                  <FaNodeJs className="text-green-400 mr-1 md:mr-2" size={12} /> Node.js
                </span>
                <span className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-800/50 dark:bg-gray-200/30 rounded-full text-xs md:text-sm border border-gray-700 dark:border-gray-300 flex items-center text-gray-300 dark:text-gray-900">
                  <SiExpress className="text-gray-400 mr-1 md:mr-2" size={12} /> Express
                </span>
                <span className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-800/50 dark:bg-gray-200/30 rounded-full text-xs md:text-sm border border-gray-700 dark:border-gray-300 flex items-center text-gray-300 dark:text-gray-900">
                  <SiMongodb className="text-green-500 mr-1 md:mr-2" size={12} /> MongoDB
                </span>
                <span className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-800/50 dark:bg-gray-200/30 rounded-full text-xs md:text-sm border border-gray-700 dark:border-gray-300 flex items-center text-gray-300 dark:text-gray-900">
                  <SiWebrtc className="text-blue-400 mr-1 md:mr-2" size={12} /> WebRTC
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-4">
                <a
                  href="#contact"
                  className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-xl font-semibold hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105 text-white dark:text-gray-900 text-sm md:text-base"
                >
                  Hire Neetesh
                </a>
                <button
                  onClick={openResume}
                  className="px-6 py-3 md:px-8 md:py-4 bg-gray-800/80 dark:bg-gray-200/30 border border-gray-700 dark:border-gray-300 rounded-xl font-semibold hover:border-indigo-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-gray-300 dark:text-gray-900 text-sm md:text-base"
                >
                  <FaDownload className="mr-2" size={14} /> View Resume
                </button>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-3 md:space-x-4">
                {[
                  { icon: <FaGithub size={16} />, href: 'https://github.com/Neetesh-Rao', label: 'GitHub' },
                  { icon: <FaLinkedin size={16} />, href: 'https://www.linkedin.com/in/neetesh-kumar-yadav-714767254/', label: 'LinkedIn' },
                  { icon: <FaInstagram size={16} />, href: 'https://www.instagram.com/chaudhary_neetesh_yadav/', label: 'Instagram' },
                ].map((social, index) => {
                  const isExternal = social.href.startsWith("http");

                  return (
                    <a
                      key={index}
                      href={social.href}
                      target={isExternal ? "_blank" : "_self"}
                      rel={isExternal ? "noopener noreferrer" : ""}
                      className="p-2 md:p-3 bg-gray-800/50 dark:bg-gray-200/30 rounded-lg border border-gray-700 dark:border-gray-300 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 dark:hover:from-indigo-400 dark:hover:to-purple-400 transition-all duration-300 transform hover:-translate-y-1 text-gray-300 dark:text-gray-900"
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

        {/* 🎯 UNIQUE ANIMATED VISITOR COUNTER - FLOATING BADGE */}
        {showVisitorBadge && (
          <div className="fixed bottom-8 right-8 z-50">
            {/* Main Container */}
            <div className={`relative group cursor-pointer transition-all duration-500 hover:scale-110`}>
              {/* Animated Rings */}
              <div className={`absolute -inset-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-75 animate-pulse ${isAnimating ? 'animate-ping' : ''}`}></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-lg opacity-50 animate-spin-slow"></div>
              
              {/* Main Badge */}
              <div className="relative flex items-center space-x-3 px-5 py-3 bg-gray-900/95 dark:bg-gray-100/95 backdrop-blur-xl rounded-2xl border-2 border-transparent bg-gradient-to-r from-indigo-500 to-purple-500 shadow-2xl overflow-hidden">
                {/* Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 dark:from-indigo-400/20 dark:to-purple-400/20 animate-shimmer"></div>
                
                {/* Left Icon */}
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500 rounded-full blur-md animate-pulse"></div>
                  <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <FaEye className="text-white text-lg animate-pulse" />
                    {isAnimating && (
                      <GiPartyPopper className="absolute -top-1 -right-1 text-yellow-400 text-sm animate-bounce" />
                    )}
                  </div>
                </div>

                {/* Count Display */}
                <div className="relative">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {visitorCount}
                    </span>
                    <span className="ml-1 text-xs text-indigo-300 dark:text-indigo-400 font-medium uppercase tracking-wider">
                      live
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BiUser className="text-indigo-400 text-xs" />
                    <span className="text-[10px] text-gray-400 dark:text-gray-600">unique visitors</span>
                  </div>
                </div>

                {/* Trending Indicator */}
                <div className="relative flex items-center justify-center w-8 h-8 bg-green-500/20 rounded-full">
                  <BiTrendingUp className="text-green-400 text-lg" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                </div>

                {/* Sparkle Effects */}
                {isAnimating && (
                  <>
                    <div className="absolute -top-2 -right-2">
                      <span className="text-yellow-400 text-xl animate-bounce">✨</span>
                    </div>
                    <div className="absolute -bottom-2 -left-2">
                      <span className="text-purple-400 text-xl animate-ping">⭐</span>
                    </div>
                  </>
                )}
              </div>

              {/* Tooltip */}
              <div className="absolute -top-12 right-0 px-3 py-2 bg-gray-900 dark:bg-gray-100 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-indigo-500/30">
                <p className="text-xs text-indigo-400 dark:text-indigo-500 font-medium">🌟 Real unique visitors</p>
                <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-1">Updated in real-time</p>
                <div className="absolute -bottom-1 right-4 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45 border-r border-b border-indigo-500/30"></div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowVisitorBadge(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 dark:bg-gray-200 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-300"
              title="Hide badge"
            >
              <FaTimes size={10} className="text-gray-400 hover:text-white" />
            </button>
          </div>
        )}

        {/* Mobile Visitor Badge */}
        <div className="md:hidden fixed bottom-4 left-4 z-50">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-75 animate-pulse"></div>
            <div className="relative flex items-center space-x-2 px-4 py-2 bg-gray-900/95 dark:bg-gray-100/95 backdrop-blur-xl rounded-full border border-indigo-500">
              <FaEye className="text-indigo-400 text-sm animate-pulse" />
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {visitorCount}
              </span>
              <span className="text-[8px] text-gray-400 dark:text-gray-600">visitors</span>
              {isAnimating && (
                <span className="absolute -top-1 -right-1 text-yellow-400 text-xs animate-bounce">✨</span>
              )}
            </div>
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-gray-900/50 dark:bg-gray-100/50 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-6xl font-bold mb-3 md:mb-4">
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent dark:text-gray-900">
                  About Neetesh
                </span>
              </h2>
              <div className="w-20 md:w-28 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="relative group order-2 lg:order-1">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 rounded-2xl blur-2xl opacity-30"></div>
                <img
                  src={bitmax}
                  alt="Neetesh Coding"
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>

              <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
                <p className="text-lg md:text-2xl text-gray-300 dark:text-gray-800 leading-relaxed">
                  Hi, I'm <span className="text-indigo-400 font-bold dark:text-indigo-500">Neetesh</span>, currently working as a
                  <span className="text-indigo-400 font-semibold dark:text-indigo-500"> Full Stack Developer Intern </span>
                  at <span className="text-purple-400 font-semibold dark:text-purple-500">Bitmax Technology, Sector 90 Noida</span>.
                </p>

                <p className="text-sm md:text-base text-gray-400 dark:text-gray-700 leading-relaxed">
                  I work on real-world web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js).
                  My responsibilities include building REST APIs, integrating frontend with backend services,
                  database design, and optimizing application performance.
                </p>

                <p className="text-sm md:text-base text-gray-400 dark:text-gray-700 leading-relaxed">
                  I am passionate about writing clean, scalable code and continuously improving my development skills
                  by working on live projects and enterprise-level solutions. I also work with WebRTC for implementing
                  real-time video/audio communication features in web applications.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 pt-4 md:pt-8">
                  <div className="p-3 md:p-5 bg-gray-800/50 dark:bg-gray-200/30 rounded-xl border border-gray-700 dark:border-gray-300 text-center transition-colors duration-500">
                    <div className="text-2xl md:text-4xl font-bold text-indigo-400 dark:text-indigo-500">1+</div>
                    <div className="text-xs md:text-sm text-gray-400 dark:text-gray-700">Years Learning</div>
                  </div>
                  <div className="p-3 md:p-5 bg-gray-800/50 dark:bg-gray-200/30 rounded-xl border border-gray-700 dark:border-gray-300 text-center transition-colors duration-500">
                    <div className="text-2xl md:text-4xl font-bold text-indigo-400 dark:text-indigo-500">15+</div>
                    <div className="text-xs md:text-sm text-gray-400 dark:text-gray-700">Projects</div>
                  </div>
                  <div className="p-3 md:p-5 bg-gray-800/50 dark:bg-gray-200/30 rounded-xl border border-gray-700 dark:border-gray-300 text-center transition-colors duration-500">
                    <div className="text-2xl md:text-4xl font-bold text-indigo-400 dark:text-indigo-500">MERN</div>
                    <div className="text-xs md:text-sm text-gray-400 dark:text-gray-700">Tech Stack</div>
                  </div>
                  <div className="p-3 md:p-5 bg-gray-800/50 dark:bg-gray-200/30 rounded-xl border border-gray-700 dark:border-gray-300 text-center transition-colors duration-500">
                    <div className="text-2xl md:text-4xl font-bold text-indigo-400 dark:text-indigo-500">100%</div>
                    <div className="text-xs md:text-sm text-gray-400 dark:text-gray-700">Dedication</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 md:py-24 bg-gray-900/50 dark:bg-gray-100/50 transition-colors duration-500 relative overflow-hidden">
          {/* Skills content - exactly as yours */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-6xl font-bold mb-3 md:mb-4">
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent dark:text-gray-900">
                  Technical Expertise
                </span>
              </h2>
              <div className="w-20 md:w-28 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-4"></div>
              <p className="text-sm md:text-base text-gray-400 dark:text-gray-600 max-w-2xl mx-auto">
                Crafting digital experiences with modern technologies and best practices including WebRTC for real-time communication
              </p>
            </div>

            {/* Skills Categories */}
            <div className="space-y-8 md:space-y-12">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="group">
                  {/* Category Header */}
                  <div className="relative mb-6 md:mb-8">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
                    <div className="relative flex items-center space-x-3 p-4 md:p-6 bg-gray-800/50 dark:bg-gray-200/50 backdrop-blur-sm rounded-xl border border-gray-700 dark:border-gray-300">
                      {/* Category Icon */}
                      <div className="p-3 md:p-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg">
                        {category === 'frontend' && <FaReact className="text-white text-xl md:text-2xl" />}
                        {category === 'backend' && <FaNodeJs className="text-white text-xl md:text-2xl" />}
                        {category === 'database' && <FaDatabase className="text-white text-xl md:text-2xl" />}
                        {category === 'devops' && <FaCloud className="text-white text-xl md:text-2xl" />}
                        {category === 'tools' && <FaTools className="text-white text-xl md:text-2xl" />}
                      </div>
                      
                      {/* Category Title */}
                      <div className="flex-1">
                        <h3 className="text-xl md:text-3xl font-bold capitalize flex items-center">
                          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {category} Technologies
                          </span>
                          <FaRocket className="ml-2 text-indigo-400 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300" size={16} />
                        </h3>
                        <p className="text-xs md:text-sm text-gray-400 dark:text-gray-600 mt-1">
                          {skillList.length} advanced {skillList.length === 1 ? 'skill' : 'skills'} mastered
                        </p>
                      </div>
                      
                      {/* Skill Count Badge */}
                      <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold">
                        {skillList.length}
                      </div>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {skillList.map((skill, index) => (
                      <div
                        key={index}
                        className="group/skill relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-1"
                      >
                        {/* Premium Card Design */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-0 group-hover/skill:opacity-50 transition duration-500"></div>
                        
                        <div className="relative h-full bg-gray-800/80 dark:bg-gray-200/80 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-gray-700 dark:border-gray-300 overflow-hidden">
                          {/* Skill Icon */}
                          <div className="relative mb-3 flex justify-between items-start">
                            <div className="relative text-3xl md:text-4xl transform group-hover/skill:scale-110 transition-all duration-300">
                              {skill.icon}
                            </div>
                            
                            {/* Level Badge */}
                            <div className="px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-xs font-bold text-white">
                              {skill.level}%
                            </div>
                          </div>
                          
                          {/* Skill Name */}
                          <h4 className="text-base md:text-lg font-bold mb-2 group-hover/skill:text-indigo-400 transition-colors">
                            {skill.name}
                          </h4>
                          
                          {/* Skill Description */}
                          <p className="text-xs text-gray-400 dark:text-gray-600 mb-3 line-clamp-2">
                            {skill.description}
                          </p>
                          
                          {/* Progress Bar */}
                          <div className="relative pt-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-gray-400 dark:text-gray-600">Proficiency</span>
                              <span className="text-xs font-bold text-indigo-400">{skill.level}%</span>
                            </div>
                            <div className="overflow-hidden h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full">
                              <div
                                className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000`}
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Skills Badge */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800/50 dark:bg-gray-200/50 backdrop-blur-sm rounded-full border border-gray-700 dark:border-gray-300">
                <HiLightningBolt className="text-yellow-400 animate-pulse" size={20} />
                <span className="text-sm text-gray-300 dark:text-gray-700">Continuously learning and expanding my tech stack including WebRTC for real-time apps</span>
                <HiLightningBolt className="text-yellow-400 animate-pulse" size={20} />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-24 bg-gray-900/50 dark:bg-gray-100/50 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-6xl font-bold mb-3 md:mb-4">
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent dark:text-gray-900">
                  Neetesh's Projects
                </span>
              </h2>
              <div className="w-20 md:w-28 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {projects.map((project) => (
                <div key={project.id} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-25 group-hover:opacity-50 transition"></div>
                  <div className="relative bg-gray-800/90 dark:bg-gray-200/50 rounded-xl overflow-hidden border border-gray-700 dark:border-gray-300">

                    <div className="relative overflow-hidden h-40 md:h-48">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent dark:from-gray-200"></div>
                    </div>
                     {/* 🆕 AI BADGE ON IMAGE */}
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => getAIExplanation(project)}
                  className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg hover:scale-105 transition-transform"
                  title="Explain this project with AI"
                >
                  <GiArtificialHive className="text-white" size={14} />
                  <span className="text-white">AI Explain</span>
                </button>
              </div>

                    <div className="p-4 md:p-6">
                      <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 group-hover:text-indigo-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-400 dark:text-gray-800 mb-3 md:mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="px-1.5 py-0.5 md:px-2 md:py-1 bg-gray-700/50 dark:bg-gray-300/30 text-[10px] md:text-xs rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-3 md:pt-4 border-t border-gray-700 dark:border-gray-300">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 md:space-x-2 text-gray-400 dark:text-gray-800 hover:text-white transition-colors text-xs md:text-sm"
                        >
                          <FaGithub size={14} />
                          <span>Code</span>
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 md:space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors text-xs md:text-sm"
                        >
                          <span>Live Demo</span>
                          <FaExternalLinkAlt size={10} />
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
        <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 dark:from-indigo-100/30 dark:via-purple-100/30 dark:to-pink-100/30 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-6xl font-bold mb-3 md:mb-4">
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent dark:text-gray-900">
                  Contact Neetesh
                </span>
              </h2>
              <div className="w-20 md:w-28 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
              {/* Contact Info */}
              <div className="space-y-4 md:space-y-6">
                <div className="bg-gray-800/50 dark:bg-gray-200/50 p-4 md:p-8 rounded-xl border border-gray-700 dark:border-gray-300">
                  <h3 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-white dark:text-gray-900">Let's Connect</h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-700/30 dark:bg-gray-300/20 rounded-lg">
                      <MdEmail className="text-indigo-400 text-lg md:text-xl" />
                      <div>
                        <p className="text-xs md:text-sm text-gray-400 dark:text-gray-600">Email</p>
                        <p className="text-sm md:text-base font-semibold text-white dark:text-gray-900">neeteshyadav0206@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-700/30 dark:bg-gray-300/20 rounded-lg">
                      <MdPhone className="text-indigo-400 text-lg md:text-xl" />
                      <div>
                        <p className="text-xs md:text-sm text-gray-400 dark:text-gray-600">Phone</p>
                        <p className="text-sm md:text-base font-semibold text-white dark:text-gray-900">+91 9927195492</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-700/30 dark:bg-gray-300/20 rounded-lg">
                      <MdLocationOn className="text-indigo-400 text-lg md:text-xl" />
                      <div>
                        <p className="text-xs md:text-sm text-gray-400 dark:text-gray-600">Location</p>
                        <p className="text-sm md:text-base font-semibold text-white dark:text-gray-900">Greater Noida, Uttar Pradesh</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-800/50 dark:bg-gray-200/50 p-4 md:p-8 rounded-xl border border-gray-700 dark:border-gray-300">
                <h3 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-white dark:text-gray-900">Send Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="w-full px-3 py-2 md:px-4 md:py-3 bg-gray-700/50 dark:bg-gray-300/30 border border-gray-600 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white dark:text-gray-900 text-sm md:text-base"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Your Email"
                      className="w-full px-3 py-2 md:px-4 md:py-3 bg-gray-700/50 dark:bg-gray-300/30 border border-gray-600 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white dark:text-gray-900 text-sm md:text-base"
                    />
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Your Message"
                    className="w-full px-3 py-2 md:px-4 md:py-3 bg-gray-700/50 dark:bg-gray-300/30 border border-gray-600 dark:border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white dark:text-gray-900 text-sm md:text-base"
                  ></textarea>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 text-sm md:text-base"
                  >
                    {loading ? "Sending..." : "Send to Neetesh"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-gray-100 py-4 md:py-8 border-t border-gray-800 dark:border-gray-300 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-xs md:text-base text-gray-400 dark:text-gray-700">
              © 2026{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-bold">
                Neetesh
              </span>
              . Made with <FaHeart className="inline text-red-500 mx-1 text-xs md:text-sm" />
            </p>
          </div>
        </footer>

        {/* Scroll to Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 p-3 md:p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-2xl hover:shadow-indigo-500/50 dark:from-indigo-400 dark:to-purple-400 transition-all duration-300"
          >
            <FaArrowUp className="text-white dark:text-gray-900 text-sm md:text-base" />
          </button>
        )}
      </div>

        {/* 🆕 AI EXPLANATION MODAL */}
      {showAIModal && (
        <>
          {/* Backdrop */}
          <div
            onClick={closeAIModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] transition-opacity duration-300"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="relative w-full max-w-3xl max-h-[85vh] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-purple-500/30 shadow-2xl animate-[fadeInScale_.3s_ease-out] overflow-hidden">
              
              {/* Header */}
             {/* Header */}
<div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-700 bg-gradient-to-r from-purple-600/30 to-pink-600/30">
  <div className="flex items-center space-x-2 sm:space-x-3">
    <div className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg">
      <GiArtificialHive className="text-white text-lg sm:text-xl" />
    </div>
    <div>
      <h2 className="text-base sm:text-xl font-bold text-white flex items-center">
        AI Project Analysis
        <span className="ml-2 text-[10px] sm:text-xs bg-purple-500/30 px-2 py-0.5 rounded-full text-purple-300">
          Beta
        </span>
      </h2>
      <p className="text-xs sm:text-sm text-gray-400 flex items-center">
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse mr-2"></span>
        {selectedProject?.title}
      </p>
    </div>
  </div>
  <button
    onClick={closeAIModal}
    className="p-1.5 sm:p-2 hover:bg-gray-700 rounded-lg transition-colors group"
    title="Close"
  >
    <FaTimes className="text-gray-400 group-hover:text-white text-sm sm:text-base" size={16} />
  </button>
</div>

              {/* Content */}
             {/* Content */}
<div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
  {aiLoading ? (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-purple-500"></div>
        <GiArtificialHive className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-400 text-xl sm:text-2xl" />
      </div>
      <p className="text-gray-400 mt-4 text-sm sm:text-base">🤖 AI is thinking...</p>
      <p className="text-xs text-gray-500 mt-2">Analyzing GitHub repository</p>
    </div>
  ) : aiError ? (
    <div className="text-center py-8 sm:py-12">
      <div className="text-4xl sm:text-6xl mb-4">😕</div>
      <h3 className="text-lg sm:text-xl text-red-400 font-semibold mb-2">Oops! Something went wrong</h3>
      <p className="text-sm sm:text-base text-gray-400 mb-4 px-4">{aiError}</p>
      <button
        onClick={() => getAIExplanation(selectedProject)}
        className="px-4 sm:px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:shadow-lg transition text-sm sm:text-base"
      >
        Try Again
      </button>
    </div>
  ) : (
    <div className="space-y-4 sm:space-y-6">
      {/* AI Explanation with nice formatting */}
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-4 sm:p-6 border border-purple-500/30 shadow-xl">
        <div className="flex items-center space-x-2 mb-3 sm:mb-4 border-b border-purple-500/20 pb-2 sm:pb-3">
          <div className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
            <FaRobot className="text-white text-sm sm:text-base" />
          </div>
          <span className="text-purple-400 font-semibold text-sm sm:text-base">AI Project Explanation</span>
        </div>
        
        {/* Formatted Explanation */}
        <div className="text-gray-300 text-xs sm:text-sm leading-relaxed space-y-3">
          {aiExplanation.split('\n').map((line, i) => {
            // Check for headings (lines with ** or emojis)
            if (line.includes('🎯') || line.includes('✨') || line.includes('🛠️') || 
                line.includes('💡') || line.includes('🌟') || line.includes('**')) {
              return (
                <h3 key={i} className="text-sm sm:text-base font-bold text-purple-400 mt-4 mb-2 flex items-center">
                  {line.includes('🎯') && <span className="mr-2">🎯</span>}
                  {line.includes('✨') && <span className="mr-2">✨</span>}
                  {line.includes('🛠️') && <span className="mr-2">🛠️</span>}
                  {line.includes('💡') && <span className="mr-2">💡</span>}
                  {line.includes('🌟') && <span className="mr-2">🌟</span>}
                  <span>{line.replace(/[🎯✨🛠️💡🌟*]/g, '').trim()}</span>
                </h3>
              );
            }
            // Check for bullet points
            else if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
              return (
                <li key={i} className="ml-4 sm:ml-6 text-gray-300 list-disc text-xs sm:text-sm">
                  {line.replace(/[•-]/, '').trim()}
                </li>
              );
            }
            // Regular text
            else if (line.trim() !== '') {
              return <p key={i} className="mb-2 text-xs sm:text-sm">{line}</p>;
            }
            return null;
          })}
        </div>
      </div>

      {/* Project Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700 hover:border-purple-500/50 transition-all">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-2 bg-gray-700 rounded-lg">
              <FaGithub className="text-gray-400 text-base sm:text-xl" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">Repository</p>
              <a 
                href={selectedProject?.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-purple-400 hover:underline truncate block"
                title={selectedProject?.github}
              >
                {selectedProject?.github.split('/').slice(-2).join('/')}
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700 hover:border-purple-500/50 transition-all">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-2 bg-gray-700 rounded-lg">
              <FaExternalLinkAlt className="text-gray-400 text-base sm:text-xl" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">Live Demo</p>
              <a 
                href={selectedProject?.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-purple-400 hover:underline truncate block"
                title={selectedProject?.live}
              >
                {selectedProject?.live.replace('https://', '').substring(0, 25)}...
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="bg-gray-800/30 rounded-xl p-3 sm:p-4 border border-gray-700">
        <p className="text-xs sm:text-sm text-gray-400 mb-2 flex items-center">
          <span className="mr-2">🛠️</span> Technologies Used:
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {selectedProject?.tech.map((tech, i) => (
            <span 
              key={i} 
              className="px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-[10px] sm:text-xs text-purple-400 border border-purple-500/30 shadow-lg"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Project Description */}
      <div className="bg-gray-800/30 rounded-xl p-3 sm:p-4 border border-gray-700">
        <p className="text-xs sm:text-sm text-gray-400 mb-1">📝 Description:</p>
        <p className="text-xs sm:text-sm text-gray-300">{selectedProject?.description}</p>
      </div>
    </div>
  )}
</div>

              {/* Footer */}
              <div className="flex justify-end px-6 py-4 border-t border-gray-700 bg-gray-900/50">
                <button
                  onClick={closeAIModal}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Resume Modal */}
      {isResumeOpen && (
        <>
          <div
            onClick={closeResume}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-opacity duration-300"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
            <div className="relative w-full md:w-4/5 lg:w-3/5 max-h-[92vh] bg-white/10 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl md:rounded-3xl shadow-2xl animate-[fadeInScale_.3s_ease-out]">
              <div className="flex justify-between items-center px-4 md:px-6 py-3 md:py-4 border-b border-white/10">
                <h2 className="text-sm md:text-xl font-semibold text-white dark:text-gray-100">Resume Preview</h2>
                <button
                  onClick={closeResume}
                  className="p-1.5 md:p-2 rounded-full bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-all duration-200"
                >
                  <FaTimes size={14} />
                </button>
              </div>
              <div className="p-2 md:p-4">
                <iframe
                  src={resume}
                  title="Resume Preview"
                  className="w-full h-[60vh] md:h-[70vh] rounded-lg md:rounded-xl border border-white/10 dark:border-gray-700"
                />
              </div>
              <div className="flex justify-end gap-2 md:gap-4 px-4 md:px-6 py-3 md:py-4 border-t border-white/10">
                <button
                  onClick={closeResume}
                  className="px-4 py-1.5 md:px-5 md:py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition text-sm md:text-base"
                >
                  Close
                </button>
                <a
                  href={resume}
                  download="Resume_Neetesh.pdf"
                  className="px-4 py-1.5 md:px-6 md:py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 transition-transform text-white font-medium flex items-center text-sm md:text-base"
                >
                  <FaDownload className="mr-1 md:mr-2" size={12} /> Download
                </a>
              </div>
            </div>
          </div>
        </>
      )}
      

      {/* Animation Keyframes */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
           @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}

export default Home;