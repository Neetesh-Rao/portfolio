import { useState, useEffect } from "react";
import { 
  FaTimes, 
  FaPaperPlane, 
  FaUser, 
  FaQuestionCircle,
  FaRobot,
  FaRegClock,
  FaCheckCircle,
  FaComments,
  FaRegGem
} from "react-icons/fa";
import { HiSparkles, HiOutlineChat } from "react-icons/hi";

function AskModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // fetch questions
  useEffect(() => {
    if (isOpen) {
      fetchQuestions();
    }
  }, [isOpen]);

  const fetchQuestions = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://portfolio-csao.onrender.com/api/ask");
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      setQuestions(data.data || []);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  // submit question
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("https://portfolio-csao.onrender.com/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          question
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setName("");
      setQuestion("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      await fetchQuestions();
      
    } catch (error) {
      console.error("Error submitting question:", error);
      setError("Failed to submit question");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - soft premium overlay */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-pink-900/10 backdrop-blur-[2px] z-40"
        onClick={onClose}
      />
      
      {/* Modal - Right side fixed, premium design */}
      <div className={`
        fixed top-24 right-8 w-80 z-50
        transform transition-all duration-500 ease-out
        ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0 pointer-events-none'}
      `}>
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-indigo-100/50 overflow-hidden">
          
          {/* Premium Header with subtle gradient */}
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 px-4 py-3 border-b border-indigo-100/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-2 shadow-lg shadow-indigo-200">
                  <FaQuestionCircle className="text-white text-base" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h2 className="text-sm font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Ask Neetesh
                    </h2>
                    <FaRegGem className="text-amber-400 text-[10px]" />
                  </div>
                  <p className="text-[9px] text-gray-500 flex items-center">
                    <HiOutlineChat className="mr-1 text-indigo-400" />
                    Direct conversation with developer
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-indigo-50 rounded-lg transition-colors group"
              >
                <FaTimes className="text-gray-400 group-hover:text-indigo-500 text-sm" />
              </button>
            </div>
          </div>

          {/* Content - Premium feel with soft colors */}
          <div className="p-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-indigo-50/30">
            
            {/* Success Message - Premium green */}
            {success && (
              <div className="mb-3 p-2.5 bg-emerald-50/80 backdrop-blur-sm border border-emerald-200 rounded-xl flex items-center space-x-2.5">
                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="text-white text-xs" />
                </div>
                <p className="text-xs text-emerald-700 font-medium">Question sent successfully! ✨</p>
              </div>
            )}

            {/* Error Message - Soft red */}
            {error && (
              <div className="mb-3 p-2.5 bg-rose-50/80 backdrop-blur-sm border border-rose-200 rounded-xl">
                <p className="text-xs text-rose-600 flex items-center">
                  <span className="w-1 h-1 bg-rose-500 rounded-full mr-2"></span>
                  {error}
                </p>
              </div>
            )}

            {/* Form - Premium input fields */}
            <form onSubmit={handleSubmit} className="mb-5 space-y-3.5">
              <div className="space-y-1">
                <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider ml-1">
                  Your Name
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-xl blur opacity-0 group-hover:opacity-70 transition duration-200"></div>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 group-hover:text-indigo-400 transition-colors text-xs" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full pl-9 pr-3 py-2.5 bg-indigo-50/30 border border-indigo-100 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 text-xs placeholder:text-gray-400 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider ml-1">
                  Your Question
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl blur opacity-0 group-hover:opacity-70 transition duration-200"></div>
                  <div className="relative">
                    <FaQuestionCircle className="absolute left-3 top-3 text-purple-300 group-hover:text-purple-400 transition-colors text-xs" />
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="What would you like to ask?"
                      rows="2"
                      className="w-full pl-9 pr-3 py-2.5 bg-purple-50/30 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-200 focus:border-purple-300 text-xs placeholder:text-gray-400 resize-none transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-xl text-xs font-medium transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/50"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={10} />
                    <span>Send Question</span>
                    <HiSparkles className="text-yellow-200 text-xs" />
                  </>
                )}
              </button>
            </form>

            {/* Previous Questions - Premium section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-medium text-gray-600 flex items-center">
                  <FaComments className="mr-1.5 text-indigo-400" />
                  Previous Questions
                </h3>
                <span className="text-[9px] bg-gradient-to-r from-indigo-50 to-purple-50 px-2 py-0.5 rounded-full text-indigo-600 font-medium border border-indigo-100">
                  {questions.length}
                </span>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-indigo-200 border-t-indigo-500"></div>
                    <FaRobot className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[8px] text-indigo-400" />
                  </div>
                </div>
              ) : questions.length === 0 ? (
                <div className="text-center py-8 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-xl border border-indigo-100/50">
                  <div className="relative inline-block mb-2">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full blur-md"></div>
                    <FaRobot className="relative text-3xl text-indigo-300" />
                  </div>
                  <p className="text-xs text-gray-500">No questions yet</p>
                  <p className="text-[9px] text-indigo-400 mt-1">Be the first to ask!</p>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {questions.map((q, index) => (
                    <div 
                      key={q._id} 
                      className="group bg-gradient-to-br from-white to-indigo-50/30 rounded-xl p-3 border border-indigo-100/50 hover:border-indigo-200 transition-all shadow-sm hover:shadow-md"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start space-x-2.5">
                        <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                          <span className="text-white text-[9px] font-medium">
                            {q.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-[10px] font-semibold text-gray-700 truncate max-w-[100px]">
                              {q.name}
                            </p>
                            <span className="text-[7px] text-gray-400 flex items-center bg-gray-100/50 px-1.5 py-0.5 rounded-full">
                              <FaRegClock className="mr-0.5" />
                              just now
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-600 mb-1.5 break-words leading-relaxed">
                            {q.question}
                          </p>
                          
                          {q.answer ? (
                            <div className="mt-1.5 pl-2 border-l-2 border-emerald-400 bg-emerald-50/30 rounded-r-lg py-1">
                              <div className="flex items-center space-x-1 mb-0.5">
                                <div className="w-3.5 h-3.5 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                  <FaRobot className="text-white text-[5px]" />
                                </div>
                                <span className="text-[7px] font-medium text-emerald-600">Neetesh's response:</span>
                              </div>
                              <p className="text-[9px] text-gray-600 break-words pl-1">{q.answer}</p>
                            </div>
                          ) : (
                            <div className="flex items-center mt-1.5 bg-amber-50/50 px-2 py-1 rounded-lg w-fit">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                              </span>
                              <p className="text-[7px] text-amber-600 ml-1.5 font-medium">Awaiting response</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Premium Footer */}
          <div className="px-4 py-2.5 border-t border-indigo-100/50 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
            <p className="text-[7px] text-center text-gray-500 flex items-center justify-center">
              <span className="w-1 h-1 bg-indigo-400 rounded-full mr-1.5"></span>
              Questions answered personally by Neetesh
              <span className="w-1 h-1 bg-purple-400 rounded-full ml-1.5"></span>
            </p>
          </div>
        </div>
      </div>

      {/* Premium Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-thin::-webkit-scrollbar {
            width: 4px;
          }
          .scrollbar-thin::-webkit-scrollbar-track {
            background: #eef2ff;
            border-radius: 10px;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #a5b4fc, #c084fc);
            border-radius: 10px;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #818cf8, #a855f7);
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .group {
            animation: fadeInUp 0.3s ease-out forwards;
          }
        `
      }} />
    </>
  );
}

export default AskModal;