import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  FaPlus, FaEdit, FaTrash, FaSave, FaTimes, 
  FaBlog, FaImage, FaTag, 
  FaEye, FaSignOutAlt, FaUserShield,
  FaHome, FaCalendarAlt, FaUser, FaExclamationTriangle
} from "react-icons/fa";
import { MdTitle, MdDescription, MdFormatQuote } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [editingBlog, setEditingBlog] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "Development",
    image: "",
    author: "Neetesh"
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Theme management
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

  // Check authentication
  useEffect(() => {
    if (!token && !isLoggingOut) {
      toast.error("Please login first");
      navigate("/admin");
    }
  }, [token, navigate, isLoggingOut]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/blog");
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.log("No blogs found or fetch error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      category: "Development",
      image: "",
      author: "Neetesh"
    });
    setEditingBlog(null);
  };

  // Modal handlers
  const openCreateModal = () => {
    resetForm();
    setShowCreateModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    resetForm();
    document.body.style.overflow = 'auto';
  };

  const openViewModal = (blog) => {
    setSelectedBlog(blog);
    setShowViewModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedBlog(null);
    document.body.style.overflow = 'auto';
  };

  const openDeleteModal = (blog) => {
    setBlogToDelete(blog);
    setShowDeleteModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setBlogToDelete(null);
    document.body.style.overflow = 'auto';
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
    document.body.style.overflow = 'auto';
  };

  const startEditing = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content || "",
      excerpt: blog.excerpt,
      category: blog.category || "Development",
      image: blog.image || "",
      author: blog.author || "Neetesh"
    });
    setShowCreateModal(true);
  };

  const createBlog = async () => {
    if (!formData.title || !formData.content || !formData.excerpt) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Blog created successfully! 🎉");
        closeCreateModal();
        fetchBlogs();
      } else {
        toast.error("Failed to create blog");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  const updateBlog = async () => {
    if (!formData.title || !formData.content || !formData.excerpt) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/blog/${editingBlog._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Blog updated successfully! ✨");
        closeCreateModal();
        fetchBlogs();
      } else {
        toast.error("Failed to update blog");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/blog/${blogToDelete._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success("Blog deleted successfully! 🗑️");
        closeDeleteModal();
        fetchBlogs();
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    closeLogoutModal();
    navigate("/admin");
  };

  // Categories for dropdown
  const categories = ["Development", "React", "Node.js", "MongoDB", "JavaScript", "Tutorial", "Career"];

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white
                    dark:bg-gradient-to-br dark:from-gray-100 dark:via-gray-200 dark:to-gray-300 dark:text-gray-900
                    transition-colors duration-500 relative overflow-hidden flex flex-col">
        
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600 dark:bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600 dark:bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-96 h-96 bg-pink-600 dark:bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Navigation Bar */}
        <nav className="fixed w-full z-50 bg-gray-900/95 backdrop-blur-lg shadow-2xl dark:bg-gray-100/95">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0 group cursor-pointer">
                <div className="text-3xl font-bold relative">
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent dark:text-gray-900">
                    {"<Neetesh />"}
                  </span>
                  <span className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur-xl opacity-30 group-hover:opacity-50 transition"></span>
                </div>
                <p className="text-xs text-gray-400 mt-1 dark:text-gray-300">
                  MERN Stack Developer
                </p>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={toggleTheme}
                  className="relative group p-3 rounded-xl bg-gray-800/90 dark:bg-gray-200/90 border border-gray-700 dark:border-gray-300 hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                  <span className="relative block transform group-hover:rotate-12 transition-transform duration-300">
                    {theme === 'dark' ? '🌞' : '🌙'}
                  </span>
                </button>

                <button
                  onClick={openLogoutModal}
                  className="relative group px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600/20 to-red-600/10 hover:from-red-600/30 hover:to-red-600/20 border border-red-600/30 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                  <div className="relative flex items-center space-x-2">
                    <FaSignOutAlt className="text-red-400 group-hover:scale-110 transition-transform" size={16} />
                    <span className="text-sm font-medium text-red-400 group-hover:text-red-300">Logout</span>
                  </div>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-2">
                <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-gray-800/90 dark:bg-gray-200/90 border border-gray-700 dark:border-gray-300">
                  <span>{theme === 'dark' ? '🌞' : '🌙'}</span>
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2.5 rounded-xl bg-gray-800/90 dark:bg-gray-200/90 border border-gray-700 dark:border-gray-300"
                >
                  {mobileMenuOpen ? <HiX size={20} /> : <HiMenu size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 mx-4 mt-2 animate-slideDown">
              <div className="bg-gray-800/95 dark:bg-gray-200/95 backdrop-blur-xl rounded-2xl border border-gray-700 dark:border-gray-300 overflow-hidden shadow-2xl">
                <div className="p-4 space-y-2">
                  <Link to="/" className="flex items-center space-x-3 p-4 rounded-xl bg-gray-700/30 dark:bg-gray-300/30 hover:bg-gray-700/50 dark:hover:bg-gray-300/50 transition" onClick={() => setMobileMenuOpen(false)}>
                    <FaHome className="text-indigo-400" size={18} />
                    <span className="text-gray-300 dark:text-gray-700">Home</span>
                  </Link>
                  <button
                    onClick={() => {
                      openLogoutModal();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 p-4 rounded-xl bg-red-600/20 hover:bg-red-600/30 w-full text-left transition"
                  >
                    <FaSignOutAlt className="text-red-400" size={18} />
                    <span className="text-red-400">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Main Dashboard Content - Added flex-1 to push footer down */}
        <main className="flex-1 relative pt-32 pb-24 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent dark:text-gray-900">
                      Admin Dashboard
                    </span>
                  </h1>
                  <p className="text-gray-400 dark:text-gray-600">Manage your blog posts and create new content</p>
                </div>
                <div className="px-6 py-4 bg-gray-800/50 dark:bg-gray-200/30 rounded-xl border border-gray-700 dark:border-gray-300">
                  <p className="text-sm text-gray-400 dark:text-gray-600">Total Blogs</p>
                  <p className="text-3xl font-bold text-indigo-400">{blogs.length}</p>
                </div>
              </div>
            </div>

            {/* Create New Blog Button */}
            <button
              onClick={openCreateModal}
              className="mb-8 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-xl font-semibold hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105 text-white dark:text-gray-900 flex items-center"
            >
              <FaPlus className="mr-2" /> Create New Blog Post
            </button>

            {/* Blogs List */}
            <div className="space-y-4 min-h-[200px]">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FaBlog className="mr-2 text-indigo-400" /> Your Blog Posts
              </h2>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-gray-700 dark:border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center py-20 bg-gray-800/30 dark:bg-gray-200/30 rounded-2xl border border-gray-700 dark:border-gray-300">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-2xl font-bold text-gray-400 dark:text-gray-600 mb-2">No Blogs Yet</h3>
                  <p className="text-gray-500 dark:text-gray-500">Create your first blog post using the button above</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {blogs.map((blog) => (
                    <div key={blog._id} className="group relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-25 group-hover:opacity-50 transition"></div>
                      <div className="relative bg-gray-800/90 dark:bg-gray-200/90 backdrop-blur-xl rounded-xl border border-gray-700 dark:border-gray-300 p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="px-3 py-1 bg-indigo-600/20 dark:bg-indigo-500/20 rounded-full text-xs text-indigo-400">
                                {blog.category || "Development"}
                              </span>
                              <span className="text-xs text-gray-400 dark:text-gray-600">
                                {new Date(blog.date || Date.now()).toLocaleDateString()}
                              </span>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold mb-2">{blog.title}</h3>
                            <p className="text-gray-400 dark:text-gray-600 text-sm line-clamp-2">{blog.excerpt}</p>
                          </div>
                          <div className="flex items-center space-x-2 md:space-x-3">
                            <button
                              onClick={() => openViewModal(blog)}
                              className="p-2 md:p-3 rounded-lg bg-gray-700/50 dark:bg-gray-300/30 hover:bg-indigo-600/20 text-gray-400 hover:text-indigo-400 transition"
                              title="View"
                            >
                              <FaEye size={14} />
                            </button>
                            <button
                              onClick={() => startEditing(blog)}
                              className="p-2 md:p-3 rounded-lg bg-gray-700/50 dark:bg-gray-300/30 hover:bg-blue-600/20 text-gray-400 hover:text-blue-400 transition"
                              title="Edit"
                            >
                              <FaEdit size={14} />
                            </button>
                            <button
                              onClick={() => openDeleteModal(blog)}
                              className="p-2 md:p-3 rounded-lg bg-gray-700/50 dark:bg-gray-300/30 hover:bg-red-600/20 text-gray-400 hover:text-red-400 transition"
                              title="Delete"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Footer - Now properly positioned at bottom */}
        <footer className="bg-gray-900/50 dark:bg-gray-100/50 py-4 md:py-6 border-t border-gray-800 dark:border-gray-300 relative z-10 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-xs md:text-sm text-gray-400 dark:text-gray-600">© 2026 Neetesh's Blog - Admin Dashboard</p>
          </div>
        </footer>
      </div>

      {/* Create/Edit Blog Modal */}
      {showCreateModal && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50" onClick={closeCreateModal}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800/95 dark:bg-gray-200/95 backdrop-blur-xl rounded-2xl border border-gray-700 dark:border-gray-300 shadow-2xl animate-modalPop">
              <div className="sticky top-0 bg-gray-800/95 dark:bg-gray-200/95 backdrop-blur-xl p-6 border-b border-gray-700 dark:border-gray-300 flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center">
                  {editingBlog ? (
                    <><FaEdit className="mr-2 text-indigo-400" /> Edit Blog Post</>
                  ) : (
                    <><FaPlus className="mr-2 text-indigo-400" /> Create New Blog Post</>
                  )}
                </h2>
                <button onClick={closeCreateModal} className="p-2 rounded-full bg-gray-700/50 dark:bg-gray-300/50 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition">
                  <FaTimes />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 dark:text-gray-600 mb-2">
                        <MdTitle className="inline mr-1" /> Blog Title *
                      </label>
                      <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter blog title"
                        className="w-full px-4 py-3 bg-gray-700/50 dark:bg-gray-300/30 border border-gray-600 dark:border-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-500 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 dark:text-gray-600 mb-2">
                        <FaTag className="inline mr-1" /> Category
                      </label>
                      <select name="category" value={formData.category} onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700/50 dark:bg-gray-300/30 border border-gray-600 dark:border-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-500 text-white dark:text-gray-900">
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 dark:text-gray-600 mb-2">
                        <FaImage className="inline mr-1" /> Image URL
                      </label>
                      <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-3 bg-gray-700/50 dark:bg-gray-300/30 border border-gray-600 dark:border-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-500 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 dark:text-gray-600 mb-2">
                        <MdFormatQuote className="inline mr-1" /> Excerpt *
                      </label>
                      <textarea name="excerpt" value={formData.excerpt} onChange={handleInputChange} rows="3" placeholder="Brief summary"
                        className="w-full px-4 py-3 bg-gray-700/50 dark:bg-gray-300/30 border border-gray-600 dark:border-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-500 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500"></textarea>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 dark:text-gray-600 mb-2">
                        <MdDescription className="inline mr-1" /> Content *
                      </label>
                      <textarea name="content" value={formData.content} onChange={handleInputChange} rows="6" placeholder="Full blog content..."
                        className="w-full px-4 py-3 bg-gray-700/50 dark:bg-gray-300/30 border border-gray-600 dark:border-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-500 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500"></textarea>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-700 dark:border-gray-300">
                  <button onClick={closeCreateModal} className="px-6 py-3 bg-gray-700/50 dark:bg-gray-300/30 rounded-xl font-semibold hover:bg-gray-600/50 transition text-gray-300 dark:text-gray-700">
                    Cancel
                  </button>
                  <button onClick={editingBlog ? updateBlog : createBlog} className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-xl font-semibold hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105 text-white dark:text-gray-900 flex items-center">
                    <FaSave className="mr-2" /> {editingBlog ? "Update Blog" : "Create Blog"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* View Blog Modal - Fixed Image Display */}
      {showViewModal && selectedBlog && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50" onClick={closeViewModal}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800/95 dark:bg-gray-200/95 backdrop-blur-xl rounded-2xl border border-gray-700 dark:border-gray-300 shadow-2xl animate-modalPop">
              <div className="sticky top-0 bg-gray-800/95 dark:bg-gray-200/95 backdrop-blur-xl p-6 border-b border-gray-700 dark:border-gray-300 flex justify-between items-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {selectedBlog.title}
                </h2>
                <button onClick={closeViewModal} className="p-2 rounded-full bg-gray-700/50 dark:bg-gray-300/50 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition">
                  <FaTimes />
                </button>
              </div>
              <div className="p-6">
                {selectedBlog.image && (
                  <div className="w-full h-80 mb-6 rounded-xl overflow-hidden bg-gray-700/50 dark:bg-gray-300/50">
                    <img 
                      src={selectedBlog.image} 
                      alt={selectedBlog.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/800x400?text=Image+Not+Found";
                      }}
                    />
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="flex items-center text-gray-400 dark:text-gray-600">
                    <FaUser className="mr-2 text-indigo-400" /> {selectedBlog.author || "Neetesh"}
                  </span>
                  <span className="flex items-center text-gray-400 dark:text-gray-600">
                    <FaCalendarAlt className="mr-2 text-indigo-400" /> {new Date(selectedBlog.date || Date.now()).toLocaleDateString()}
                  </span>
                  {selectedBlog.category && (
                    <span className="px-3 py-1 bg-indigo-600/20 dark:bg-indigo-500/20 rounded-full text-indigo-400 text-sm">
                      {selectedBlog.category}
                    </span>
                  )}
                </div>
                <div className="prose prose-invert dark:prose-gray max-w-none">
                  <p className="text-gray-300 dark:text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedBlog.content || selectedBlog.excerpt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && blogToDelete && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50" onClick={closeDeleteModal}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-gray-800/95 dark:bg-gray-200/95 backdrop-blur-xl rounded-2xl border border-gray-700 dark:border-gray-300 shadow-2xl animate-modalPop">
              <div className="p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-600/20 flex items-center justify-center">
                  <FaExclamationTriangle className="text-red-500 text-4xl" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Delete Blog Post</h3>
                <p className="text-gray-400 dark:text-gray-600 mb-6">
                  Are you sure you want to delete <span className="font-semibold text-white dark:text-gray-900">"{blogToDelete.title}"</span>? This action cannot be undone.
                </p>
                <div className="flex space-x-4">
                  <button onClick={closeDeleteModal} className="flex-1 px-4 py-3 bg-gray-700/50 dark:bg-gray-300/30 rounded-xl font-semibold hover:bg-gray-600/50 transition text-gray-300 dark:text-gray-700">
                    Cancel
                  </button>
                  <button onClick={confirmDelete} className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-semibold hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-105 text-white">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50" onClick={closeLogoutModal}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-gray-800/95 dark:bg-gray-200/95 backdrop-blur-xl rounded-2xl border border-gray-700 dark:border-gray-300 shadow-2xl animate-modalPop">
              <div className="p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-yellow-600/20 flex items-center justify-center">
                  <FaSignOutAlt className="text-yellow-500 text-4xl" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Logout Confirmation</h3>
                <p className="text-gray-400 dark:text-gray-600 mb-6">
                  Are you sure you want to logout from the admin dashboard?
                </p>
                <div className="flex space-x-4">
                  <button onClick={closeLogoutModal} className="flex-1 px-4 py-3 bg-gray-700/50 dark:bg-gray-300/30 rounded-xl font-semibold hover:bg-gray-600/50 transition text-gray-300 dark:text-gray-700">
                    Cancel
                  </button>
                  <button onClick={handleLogout} className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl font-semibold hover:shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300 transform hover:scale-105 text-white">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Animation Keyframes */}
      <style >{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        .animate-modalPop { animation: modalPop 0.3s ease-out; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

export default Dashboard;