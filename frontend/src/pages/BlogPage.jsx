import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaUser, FaHeart, FaComment, FaShare, FaHome, FaTimes } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BiHomeAlt } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [commenterName, setCommenterName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [likingBlogId, setLikingBlogId] = useState(null);
  const [commentingBlogId, setCommentingBlogId] = useState(null);
  const [likedBlogs, setLikedBlogs] = useState({});

  // Load liked blogs from localStorage on mount
  useEffect(() => {
    const savedLikes = localStorage.getItem('likedBlogs');
    if (savedLikes) {
      setLikedBlogs(JSON.parse(savedLikes));
    }
  }, []);

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

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://portfolio-csao.onrender.com/api/blog");
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      toast.error("Failed to load blogs ❌");
    } finally {
      setLoading(false);
    }
  };
// for sharing
  const handleShare = async (blog) => {
  const shareUrl = `https://portfolio-csao.onrender.com/blog/${blog.slug || blog._id}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: shareUrl
      });

      toast.success("Post is sharing 🚀");
    } catch (error) {
      console.log("Share cancelled");
    }
  } else {
    // fallback (copy link)
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard 🔗");
  }
};
  // Fixed handleLike function with proper error handling
  const handleLike = async (blogId, e) => {
    e.stopPropagation();
    
    const isLiked = likedBlogs[blogId];
    const endpoint = isLiked ? 'unlike' : 'like';
    
    try {
      setLikingBlogId(blogId);
      
      const res = await fetch(`https://portfolio-csao.onrender.com/api/blog/${endpoint}/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        // Update liked blogs in state and localStorage
        const updatedLikedBlogs = { ...likedBlogs };
        
        if (isLiked) {
          // Unlike: remove from liked blogs
          delete updatedLikedBlogs[blogId];
          toast.success("Unliked! 💔");
        } else {
          // Like: add to liked blogs
          updatedLikedBlogs[blogId] = true;
          toast.success("Liked! ❤️");
        }
        
        setLikedBlogs(updatedLikedBlogs);
        localStorage.setItem('likedBlogs', JSON.stringify(updatedLikedBlogs));

        // Update the blogs state with new like count from server
        setBlogs(prevBlogs => 
          prevBlogs.map(blog => 
            blog._id === blogId 
              ? { ...blog, likes: data.likes } 
              : blog
          )
        );
        
        // Also update selectedBlog if it's the one being liked/unliked
        if (selectedBlog && selectedBlog._id === blogId) {
          setSelectedBlog(prev => ({ ...prev, likes: data.likes }));
        }
      } else {
        toast.error(data.message || (isLiked ? "Failed to unlike ❌" : "Failed to like ❌"));
      }
    } catch (error) {
      toast.error("Network error ❌");
    } finally {
      setLikingBlogId(null);
    }
  };

  const handleComment = async (blogId) => {
    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    if (!commenterName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    try {
      setCommentingBlogId(blogId);
      const res = await fetch(`https://portfolio-csao.onrender.com/api/blog/comment/${blogId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name: commenterName, 
          message: comment 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Update the blogs state with new comments
        setBlogs(prevBlogs => 
          prevBlogs.map(blog => 
            blog._id === blogId 
              ? { ...blog, comments: data } 
              : blog
          )
        );
        
        // Update selectedBlog with new comments
        if (selectedBlog && selectedBlog._id === blogId) {
          setSelectedBlog(prev => ({ ...prev, comments: data }));
        }
        
        toast.success("Comment added! 💬");
        setComment("");
        setCommenterName("");
      } else {
        toast.error("Failed to add comment ❌");
      }
    } catch (error) {
      toast.error("Server error ❌");
    } finally {
      setCommentingBlogId(null);
    }
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedBlog]);

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
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative flex items-center space-x-2 px-5 py-2.5 bg-gray-800/90 dark:bg-gray-200/90 rounded-xl border border-gray-700 dark:border-gray-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 dark:from-indigo-400/20 dark:to-purple-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <IoMdArrowRoundBack className="relative text-indigo-400 dark:text-indigo-500 group-hover:-translate-x-1 transition-transform duration-300" size={18} />
                    <span className="relative text-sm font-medium text-gray-300 dark:text-gray-700 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      Back
                    </span>
                    <FaHome className="relative opacity-0 group-hover:opacity-100 ml-1 text-indigo-400 dark:text-indigo-500 text-xs transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" />
                  </div>
                </Link>
                
                {/* Enhanced Theme Toggle */}
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
                <button onClick={toggleTheme} className="relative p-2.5 rounded-xl bg-gray-800/90 dark:bg-gray-200/90 border border-gray-700 dark:border-gray-300">
                  <span className="block">{theme === 'dark' ? '🌞' : '🌙'}</span>
                </button>
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
            <div className="md:hidden absolute top-full left-0 right-0 mx-4 mt-2 z-50">
              <div className="bg-gray-800/95 dark:bg-gray-200/95 backdrop-blur-xl rounded-2xl border border-gray-700 dark:border-gray-300 overflow-hidden shadow-2xl animate-slideDown">
                <Link to="/" className="block" onClick={() => setMobileMenuOpen(false)}>
                  <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 dark:from-indigo-400/20 dark:to-purple-400/20 border-b border-gray-700 dark:border-gray-300">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <BiHomeAlt className="text-white text-2xl" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 dark:text-gray-600">Return to</p>
                      <p className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Home Page</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <FaArrowLeft className="text-indigo-400 text-sm" />
                    </div>
                  </div>
                </Link>
                <div className="p-4 space-y-3">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gray-700/30 dark:bg-gray-300/30 rounded-xl">
                    <FaHome className="text-indigo-400" />
                    <span className="text-sm text-gray-300 dark:text-gray-700">www.neetesh.dev</span>
                  </div>
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gray-700/30 dark:bg-gray-300/30 rounded-xl">
                    <FaHeart className="text-pink-400" />
                    <span className="text-sm text-gray-300 dark:text-gray-700">Thanks for visiting!</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-1 relative pt-24 md:pt-32 pb-24 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 px-2">
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent dark:text-gray-900">
                  Neetesh's Blog
                </span>
              </h1>
              <div className="w-20 md:w-28 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-4 md:mb-6"></div>
              <p className="text-sm md:text-base text-gray-400 dark:text-gray-600 max-w-2xl mx-auto px-4">
                Thoughts, tutorials and insights about web development, MERN stack, and programming
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center h-64">
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-gray-700 dark:border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Blog Grid */}
            {!loading && (
              <>
                {blogs.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-2 md:px-0">
                    {blogs.map((blog) => (
                      <div
                        key={blog._id}
                        className="group relative cursor-pointer"
                        onClick={() => setSelectedBlog(blog)}
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-25 group-hover:opacity-50 transition"></div>
                        <div className="relative bg-gray-800/90 dark:bg-gray-200/90 backdrop-blur-xl rounded-xl overflow-hidden border border-gray-700 dark:border-gray-300 transition-all duration-300 transform group-hover:-translate-y-2">
                          <div className="relative h-40 md:h-48 overflow-hidden bg-gray-700 dark:bg-gray-300">
                            {blog.image ? (
                              <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
                                <span className="text-3xl md:text-4xl">📝</span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent dark:from-gray-200"></div>
                            {blog.category && (
                              <span className="absolute top-3 left-3 px-2 py-1 bg-indigo-600/90 dark:bg-indigo-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                                {blog.category}
                              </span>
                            )}
                          </div>
                          <div className="p-4 md:p-6">
                            <div className="flex items-center space-x-3 md:space-x-4 text-xs md:text-sm text-gray-400 dark:text-gray-600 mb-2 md:mb-3">
                              <span className="flex items-center">
                                <FaUser className="mr-1 text-indigo-400" size={10} />
                                {blog.author || "Neetesh"}
                              </span>
                              <span className="flex items-center">
                                <FaCalendarAlt className="mr-1 text-indigo-400" size={10} />
                                {blog.date ? new Date(blog.date).toLocaleDateString() : new Date().toLocaleDateString()}
                              </span>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-indigo-400 dark:group-hover:text-indigo-500 transition-colors line-clamp-2">
                              {blog.title}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-400 dark:text-gray-600 mb-3 md:mb-4 line-clamp-3">
                              {blog.excerpt}
                            </p>
                            <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-gray-700 dark:border-gray-300">
                              <div className="flex items-center space-x-3 md:space-x-4">
                                <button
                                  onClick={(e) => handleLike(blog._id, e)}
                                  disabled={likingBlogId === blog._id}
                                  className={`flex items-center space-x-1 transition ${
                                    likingBlogId === blog._id 
                                      ? 'text-gray-500 cursor-not-allowed' 
                                      : likedBlogs[blog._id]
                                        ? 'text-pink-500 hover:text-pink-600'
                                        : 'text-gray-400 dark:text-gray-600 hover:text-pink-500'
                                  }`}
                                >
                                  <FaHeart 
                                    className={`hover:scale-110 transition ${
                                      likingBlogId === blog._id ? 'animate-pulse' : ''
                                    } ${
                                      likedBlogs[blog._id] ? 'fill-current' : ''
                                    }`} 
                                    size={12} 
                                  />
                                  <span className="text-xs md:text-sm">{blog.likes || 0}</span>
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedBlog(blog);
                                  }}
                                  className="flex items-center space-x-1 text-gray-400 dark:text-gray-600 hover:text-indigo-400 transition"
                                >
                                  <FaComment className="hover:scale-110 transition" size={12} />
                                  <span className="text-xs md:text-sm">{blog.comments?.length || 0}</span>
                                </button>
                              </div>
                             <button
  onClick={(e) => {
    e.stopPropagation();
    handleShare(blog);
  }}
  className="text-gray-400 dark:text-gray-600 hover:text-indigo-400 transition"
>
  <FaShare size={12} />
</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 md:py-20">
                    <div className="text-5xl md:text-6xl mb-4">📝</div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-400 dark:text-gray-600 mb-2">No Blogs Yet</h3>
                    <p className="text-sm md:text-base text-gray-500 dark:text-gray-500">Check back soon for new content!</p>
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900/50 dark:bg-gray-100/50 py-4 md:py-8 border-t border-gray-800 dark:border-gray-300 transition-colors duration-500 relative z-10 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-xs md:text-sm text-gray-400 dark:text-gray-600 transition-colors duration-500">
              © 2026{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-bold">
                Neetesh
              </span>
              's Blog - Sharing knowledge one post at a time
            </p>
          </div>
        </footer>
      </div>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50" onClick={() => setSelectedBlog(null)}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800/95 dark:bg-gray-200/95 backdrop-blur-xl rounded-2xl border border-gray-700 dark:border-gray-300 shadow-2xl animate-modalPop">
              
              {/* Modal Header with Gradient Title */}
              <div className="sticky top-0 bg-gray-800/95 dark:bg-gray-200/95 backdrop-blur-xl p-6 border-b border-gray-700 dark:border-gray-300 flex justify-between items-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {selectedBlog.title}
                </h2>
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="p-2 rounded-full bg-gray-700/50 dark:bg-gray-300/50 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Blog Image */}
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

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="flex items-center text-gray-400 dark:text-gray-600">
                    <FaUser className="mr-2 text-indigo-400" size={14} />
                    {selectedBlog.author || "Neetesh"}
                  </span>
                  <span className="flex items-center text-gray-400 dark:text-gray-600">
                    <FaCalendarAlt className="mr-2 text-indigo-400" size={14} />
                    {selectedBlog.date ? new Date(selectedBlog.date).toLocaleDateString() : new Date().toLocaleDateString()}
                  </span>
                  {selectedBlog.category && (
                    <span className="px-3 py-1 bg-indigo-600/20 dark:bg-indigo-500/20 rounded-full text-indigo-400 text-sm">
                      {selectedBlog.category}
                    </span>
                  )}
                  
                  {/* Like/Unlike Button in Modal */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(selectedBlog._id, e);
                    }}
                    disabled={likingBlogId === selectedBlog._id}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                      likingBlogId === selectedBlog._id 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : likedBlogs[selectedBlog._id]
                          ? 'bg-pink-500/20 text-pink-500 hover:bg-pink-500/30'
                          : 'bg-gray-700/50 text-gray-400 hover:bg-pink-500/20 hover:text-pink-500'
                    }`}
                  >
                    <FaHeart 
                      className={`${likingBlogId === selectedBlog._id ? 'animate-pulse' : ''} ${
                        likedBlogs[selectedBlog._id] ? 'fill-current' : ''
                      }`} 
                      size={16} 
                    />
                    <span>{selectedBlog.likes || 0}</span>
                    <span className="text-xs ml-1">
                      {likedBlogs[selectedBlog._id] ? '(Unlike)' : '(Like)'}
                    </span>
                  </button>
                </div>

                {/* Blog Content */}
                <div className="prose prose-invert dark:prose-gray max-w-none">
                  <p className="text-gray-300 dark:text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedBlog.content || selectedBlog.excerpt}
                  </p>
                </div>

                {/* Comments Section */}
                <div className="mt-8 pt-8 border-t border-gray-700 dark:border-gray-300">
                  <h3 className="text-xl font-bold mb-4 flex items-center text-gray-300 dark:text-gray-700">
                    <FaComment className="mr-2 text-indigo-400" size={18} />
                    Comments ({selectedBlog.comments?.length || 0})
                  </h3>

                  {/* Display Comments */}
                  {selectedBlog.comments && selectedBlog.comments.length > 0 && (
                    <div className="mb-6 space-y-4">
                      {selectedBlog.comments.map((comment, index) => (
                        <div key={index} className="bg-gray-700/30 dark:bg-gray-300/30 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-indigo-400">{comment.name}</span>
                            <span className="text-xs text-gray-400 dark:text-gray-600">
                              {new Date(comment.date || Date.now()).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-300 dark:text-gray-700">{comment.message}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comment Input Fields */}
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={commenterName}
                      onChange={(e) => setCommenterName(e.target.value)}
                      placeholder="Your name..."
                      className="w-full px-4 py-3 bg-gray-700/50 dark:bg-gray-300/30 border border-gray-600 dark:border-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-500 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                      <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 px-4 py-3 bg-gray-700/50 dark:bg-gray-300/30 border border-gray-600 dark:border-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-500 text-white dark:text-gray-900 placeholder-gray-400 dark:placeholder-gray-500"
                      />
                      <button
                        onClick={() => handleComment(selectedBlog._id)}
                        disabled={commentingBlogId === selectedBlog._id}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-white dark:text-gray-900 whitespace-nowrap ${
                          commentingBlogId === selectedBlog._id
                            ? 'bg-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 hover:shadow-2xl hover:shadow-indigo-500/30'
                        }`}
                      >
                        {commentingBlogId === selectedBlog._id ? 'Posting...' : 'Post Comment'}
                      </button>
                    </div>
                  </div>
                </div>
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
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
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
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

export default BlogPage;