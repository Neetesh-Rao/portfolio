import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaTimesCircle,
  FaRedoAlt,
  FaQuestionCircle,
  FaLightbulb,
  FaTrophy,
  FaClock,
  FaFilter,
  FaChartBar,
  FaBookOpen,
  FaMedal,
  FaFire,
  FaBrain,
  FaEye,
  FaEyeSlash,
  FaBars,
  FaTimes as FaTimesIcon
} from 'react-icons/fa';
import { GiBrain, GiPartyPopper } from 'react-icons/gi';
import { MdOutlineEmojiEvents } from 'react-icons/md';

function Questions() {
  const navigate = useNavigate();
  
  // States
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState({ correct: 0, wrong: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState('all');
  const [validationLoading, setValidationLoading] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [showAnswer, setShowAnswer] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileStats, setShowMobileStats] = useState(false);
  const [showQuickJump, setShowQuickJump] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Check screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowMobileMenu(false);
        setShowMobileStats(false);
        setShowQuickJump(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch questions on mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Timer effect
  useEffect(() => {
    if (!timerActive || isAnswered) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (!isAnswered) {
            handleTimeUp();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, isAnswered, currentIndex]);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(30);
    setTimerActive(true);
    setShowAnswer(false);
  }, [currentIndex]);

  // Update total score when correct/wrong changes
  useEffect(() => {
    setScore(prev => ({
      ...prev,
      total: prev.correct + prev.wrong
    }));
  }, [score.correct, score.wrong]);

  const fetchQuestions = async (diff = difficulty) => {
    try {
      setLoading(true);
      setError(null);
      
      let url = 'http://localhost:5000/api/questions';
      if (diff !== 'all') {
        url = `http://localhost:5000/api/questions/difficulty/${diff}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success && data.data.length > 0) {
        setQuestions(data.data);
        setCurrentIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore({ correct: 0, wrong: 0, total: 0 });
        setStreak(0);
        setAnsweredQuestions(new Set());
        toast.success(`Loaded ${data.data.length} questions`);
      } else {
        setError('No questions available in database');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to connect to server');
      toast.error('Server connection failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDifficultyChange = (e) => {
    const newDiff = e.target.value;
    setDifficulty(newDiff);
    fetchQuestions(newDiff);
    if (isMobile) {
      setShowMobileMenu(false);
    }
  };

  const handleTimeUp = () => {
    if (!isAnswered) {
      setIsAnswered(true);
      setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
      setStreak(0);
      setTimerActive(false);
      toast.error('Time up! ⏰');
    }
  };

  const handleOptionClick = async (index) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);
    setTimerActive(false);
    setAnsweredQuestions(prev => new Set(prev).add(currentIndex));
    
    const currentQ = questions[currentIndex];
    
    try {
      setValidationLoading(true);
      
      const response = await fetch(`http://localhost:5000/api/questions/validate/${currentQ._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer: index.toString() })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (data.correct) {
          const newStreak = streak + 1;
          setStreak(newStreak);
          if (newStreak > longestStreak) {
            setLongestStreak(newStreak);
          }
          setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
          toast.success(data.message, {
            icon: '🎉',
            duration: 2000
          });
        } else {
          setStreak(0);
          setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error('Validation error:', error);
      
      // Fallback validation
      if (index === currentQ.correctAnswer) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > longestStreak) {
          setLongestStreak(newStreak);
        }
        setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
        toast.success('Correct Answer! 🎉');
      } else {
        setStreak(0);
        setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
        toast.error('Wrong Answer! ❌');
      }
    } finally {
      setValidationLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowExplanation(false);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowExplanation(false);
      setShowAnswer(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore({ correct: 0, wrong: 0, total: 0 });
    setStreak(0);
    setAnsweredQuestions(new Set());
    setShowExplanation(false);
    toast.success('Starting fresh! 🚀');
  };

  const handleQuickJump = (index) => {
    setCurrentIndex(index);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowExplanation(false);
    setShowAnswer(false);
    setShowQuickJump(false);
    setShowMobileMenu(false);
  };

  const calculateAccuracy = () => {
    if (score.total === 0) return 0;
    return ((score.correct / score.total) * 100).toFixed(1);
  };

  const getOptionLetter = (index) => {
    return String.fromCharCode(65 + index);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-white text-base md:text-xl">Loading questions...</p>
          <p className="text-gray-400 text-xs md:text-sm mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
        <div className="text-center text-white max-w-md mx-auto">
          <FaQuestionCircle className="text-4xl md:text-6xl text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-bold mb-2">No Questions Available</h2>
          <p className="text-sm md:text-base text-gray-400 mb-2">{error || 'Database is empty'}</p>
          <p className="text-xs md:text-sm text-gray-500 mb-6">
            Add questions using Postman
          </p>
          
          <div className="bg-gray-800/50 rounded-xl p-3 md:p-4 mb-6 text-left border border-gray-700 overflow-x-auto">
            <h3 className="text-xs md:text-sm font-semibold text-indigo-400 mb-2">📌 Add Question Format:</h3>
            <pre className="text-[10px] md:text-xs text-gray-400">
{`POST /api/questions
{
  "question": "What is React?",
  "options": ["Library", "Framework"],
  "correctAnswer": 0,
  "explanation": "React is a library",
  "difficulty": "easy"
}`}
            </pre>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 md:px-6 md:py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition text-sm md:text-base"
            >
              Go Home
            </button>
            <button
              onClick={() => fetchQuestions()}
              className="px-4 py-2 md:px-6 md:py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition text-sm md:text-base"
            >
              Retry 🔄
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const accuracy = calculateAccuracy();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Toaster position={isMobile ? "bottom-center" : "top-right"} />

      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 z-50">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-800 rounded-lg transition"
            >
              <FaArrowLeft className="text-gray-300" />
            </button>
            
            <div className="flex items-center space-x-2">
              {/* Score Display */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 px-2 py-1 bg-green-500/20 rounded-full">
                  <FaCheckCircle className="text-green-400 text-xs" />
                  <span className="font-bold text-green-400 text-sm">{score.correct}</span>
                </div>
                <div className="flex items-center space-x-1 px-2 py-1 bg-red-500/20 rounded-full">
                  <FaTimesCircle className="text-red-400 text-xs" />
                  <span className="font-bold text-red-400 text-sm">{score.wrong}</span>
                </div>
              </div>

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 hover:bg-gray-800 rounded-lg transition"
              >
                {showMobileMenu ? <FaTimesIcon /> : <FaBars />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="absolute top-full left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 space-y-3 animate-slideDown max-h-[80vh] overflow-y-auto">
              
              {/* Quick Jump Button */}
              <button
                onClick={() => {
                  setShowQuickJump(true);
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-lg border border-purple-500/30"
              >
                <span className="flex items-center font-medium">
                  <FaBars className="mr-2 text-purple-400" />
                  Quick Jump to Question
                </span>
                <span className="text-xs bg-purple-500/30 px-2 py-1 rounded-full text-purple-400">
                  {currentIndex + 1}/{questions.length}
                </span>
              </button>

              {/* Stats Button */}
              <button
                onClick={() => {
                  setShowMobileStats(true);
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-lg"
              >
                <span className="flex items-center">
                  <FaChartBar className="mr-2 text-indigo-400" />
                  Statistics
                </span>
                <span className="text-xs bg-indigo-500/20 px-2 py-1 rounded-full text-indigo-400">
                  {accuracy}%
                </span>
              </button>

              {/* Difficulty Filter */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400 flex items-center">
                  <FaFilter className="mr-2" />
                  Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={handleDifficultyChange}
                  className="w-full bg-gray-800 text-white text-sm rounded-lg px-3 py-3 border border-gray-700 focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">All Levels</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {/* Restart Button */}
              <button
                onClick={() => {
                  handleRestart();
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <FaRedoAlt />
                <span>Restart Quiz</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Desktop Navigation */}
      {!isMobile && (
        <nav className="bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition" />
                <span>Back to Home</span>
              </button>

              <div className="flex items-center space-x-4">
                {/* Stats Toggle */}
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition relative group"
                  title="View Stats"
                >
                  <FaChartBar className="text-gray-400 group-hover:text-indigo-400" />
                  {showStats && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-400 rounded-full"></span>
                  )}
                </button>

                {/* Difficulty Filter */}
                <div className="flex items-center space-x-2">
                  <FaFilter className="text-gray-400" />
                  <select
                    value={difficulty}
                    onChange={handleDifficultyChange}
                    className="bg-gray-800 text-white text-sm rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="all">All Levels</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                {/* Score Display */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 px-3 py-1 bg-green-500/20 rounded-full">
                    <FaCheckCircle className="text-green-400" />
                    <span className="font-bold text-green-400">{score.correct}</span>
                  </div>
                  <div className="flex items-center space-x-1 px-3 py-1 bg-red-500/20 rounded-full">
                    <FaTimesCircle className="text-red-400" />
                    <span className="font-bold text-red-400">{score.wrong}</span>
                  </div>
                </div>

                <button
                  onClick={handleRestart}
                  className="p-2 hover:bg-gray-800 rounded-lg transition group"
                  title="Restart Quiz"
                >
                  <FaRedoAlt className="text-gray-400 group-hover:text-white group-hover:rotate-180 transition-all duration-500" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Desktop Stats Panel */}
      {!isMobile && showStats && (
        <div className="bg-gray-800/90 backdrop-blur-lg border-b border-gray-700 animate-slideDown">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-400">Progress</div>
                <div className="text-lg md:text-xl font-bold text-indigo-400">
                  {answeredQuestions.size}/{questions.length}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-400">Accuracy</div>
                <div className="text-lg md:text-xl font-bold text-green-400">{accuracy}%</div>
              </div>
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-400">Current Streak</div>
                <div className="text-lg md:text-xl font-bold text-yellow-400 flex items-center justify-center">
                  <FaFire className="mr-1 text-orange-400 text-sm" />
                  {streak}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-400">Best Streak</div>
                <div className="text-lg md:text-xl font-bold text-purple-400 flex items-center justify-center">
                  <FaMedal className="mr-1 text-yellow-400 text-sm" />
                  {longestStreak}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-400">Remaining</div>
                <div className="text-lg md:text-xl font-bold text-blue-400">
                  {questions.length - answeredQuestions.size}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Quick Jump Modal */}
      {isMobile && showQuickJump && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl w-full max-w-sm border border-gray-700 animate-fadeIn max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h3 className="font-semibold flex items-center">
                <FaBars className="mr-2 text-purple-400" />
                Jump to Question
              </h3>
              <button
                onClick={() => setShowQuickJump(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition"
              >
                <FaTimesIcon />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto">
              {/* Progress Summary */}
              <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-indigo-400 font-medium">
                    {answeredQuestions.size}/{questions.length}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ width: `${(answeredQuestions.size / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question Grid */}
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, index) => {
                  const isCurrent = index === currentIndex;
                  const isAnswered_q = answeredQuestions.has(index);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuickJump(index)}
                      className={`
                        aspect-square rounded-lg font-medium text-sm transition-all
                        ${isCurrent 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white scale-105 shadow-lg' 
                          : isAnswered_q
                          ? 'bg-green-500/20 text-green-400 border border-green-500'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }
                      `}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 flex items-center justify-center space-x-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mr-1"></div>
                  <span className="text-gray-400">Current</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500/30 border border-green-500 rounded-full mr-1"></div>
                  <span className="text-gray-400">Answered</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-800 border border-gray-600 rounded-full mr-1"></div>
                  <span className="text-gray-400">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Stats Modal */}
      {isMobile && showMobileStats && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl w-full max-w-sm border border-gray-700 animate-fadeIn">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h3 className="font-semibold flex items-center">
                <FaChartBar className="mr-2 text-indigo-400" />
                Statistics
              </h3>
              <button
                onClick={() => setShowMobileStats(false)}
                className="p-2 hover:bg-gray-800 rounded-lg"
              >
                <FaTimesIcon />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Progress</span>
                <span className="font-bold text-indigo-400">{answeredQuestions.size}/{questions.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Accuracy</span>
                <span className="font-bold text-green-400">{accuracy}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Current Streak</span>
                <span className="font-bold text-yellow-400 flex items-center">
                  <FaFire className="mr-1 text-orange-400" />
                  {streak}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Best Streak</span>
                <span className="font-bold text-purple-400 flex items-center">
                  <FaMedal className="mr-1 text-yellow-400" />
                  {longestStreak}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Remaining</span>
                <span className="font-bold text-blue-400">{questions.length - answeredQuestions.size}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Responsive Padding for Mobile Header */}
      <div className={isMobile ? "pt-16" : ""}>
        {/* Stats Bar */}
        <div className="max-w-4xl mx-auto px-3 sm:px-4 pt-3 sm:pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] sm:text-xs bg-gray-800 px-2 sm:px-3 py-1 rounded-full text-gray-400 flex items-center">
              <FaBookOpen className="mr-1 text-xs" />
              Total: {questions.length}
            </span>
            
            {/* Streak Badge */}
            {streak > 0 && (
              <span className="text-[10px] sm:text-xs bg-orange-500/20 px-2 sm:px-3 py-1 rounded-full text-orange-400 flex items-center animate-pulse">
                <FaFire className="mr-1 text-xs" />
                {streak} streak
              </span>
            )}

            {currentQuestion.difficulty && (
              <span className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full ${
                currentQuestion.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                currentQuestion.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {currentQuestion.difficulty.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
          {/* Progress Bar */}
          <div className="mb-4 sm:mb-8">
            <div className="flex justify-between text-[10px] sm:text-sm text-gray-400 mb-1 sm:mb-2">
              <span>Q {currentIndex + 1}/{questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Timer */}
          <div className="mb-4 sm:mb-6 flex justify-center">
            <div className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${
              timeLeft <= 10 ? 'bg-red-500/20 animate-pulse' : 'bg-gray-800'
            }`}>
              <FaClock className={timeLeft <= 10 ? 'text-red-400 text-sm' : 'text-indigo-400 text-sm'} />
              <span className={`font-mono font-bold text-sm sm:text-base ${
                timeLeft <= 10 ? 'text-red-400' : 'text-indigo-400'
              }`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-700 p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
            <div className="flex items-start space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <GiBrain className="text-2xl sm:text-3xl md:text-4xl text-indigo-400 flex-shrink-0" />
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium sm:font-semibold leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-2 sm:space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isCorrect = index === currentQuestion.correctAnswer;
                const isSelected = selectedOption === index;
                const showResult = isAnswered;

                let optionClass = "w-full p-3 sm:p-4 text-left rounded-lg sm:rounded-xl border transition-all duration-300 text-sm sm:text-base ";
                
                if (showResult) {
                  if (isCorrect) {
                    optionClass += "bg-green-500/20 border-green-500 text-green-400 ";
                  } else if (isSelected && !isCorrect) {
                    optionClass += "bg-red-500/20 border-red-500 text-red-400 ";
                  } else {
                    optionClass += "bg-gray-800/50 border-gray-700 text-gray-400 ";
                  }
                } else {
                  optionClass += "bg-gray-800/50 border-gray-700 hover:border-indigo-500 hover:bg-gray-700/50 ";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    disabled={isAnswered || validationLoading}
                    className={optionClass}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-2 sm:space-x-3">
                        <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-sm ${
                          showResult && isCorrect
                            ? 'bg-green-500 text-white'
                            : showResult && isSelected && !isCorrect
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-700 text-gray-300'
                        }`}>
                          {getOptionLetter(index)}
                        </span>
                        <span className="text-xs sm:text-sm md:text-base">{option}</span>
                      </span>
                      {validationLoading && isSelected && (
                        <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-indigo-500 border-t-transparent"></div>
                      )}
                      {!validationLoading && showResult && isCorrect && (
                        <FaCheckCircle className="text-green-400 text-sm sm:text-base" />
                      )}
                      {!validationLoading && showResult && isSelected && !isCorrect && (
                        <FaTimesCircle className="text-red-400 text-sm sm:text-base" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Show Answer Button */}
            {!isAnswered && (
              <div className="mt-3 sm:mt-4">
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="flex items-center space-x-1 sm:space-x-2 text-gray-400 hover:text-indigo-400 transition text-xs sm:text-sm"
                >
                  {showAnswer ? <FaEyeSlash /> : <FaEye />}
                  <span>{showAnswer ? 'Hide' : 'Show'} Answer</span>
                </button>
                
                {showAnswer && (
                  <div className="mt-2 p-2 sm:p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg sm:rounded-xl">
                    <p className="text-yellow-400 text-xs sm:text-sm">
                      {getOptionLetter(currentQuestion.correctAnswer)}. {currentQuestion.options[currentQuestion.correctAnswer]}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Explanation */}
            {isAnswered && currentQuestion.explanation && (
              <div className="mt-4 sm:mt-6">
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="flex items-center space-x-1 sm:space-x-2 text-indigo-400 hover:text-indigo-300 transition text-xs sm:text-sm"
                >
                  <FaLightbulb />
                  <span>{showExplanation ? 'Hide' : 'Show'} Explanation</span>
                </button>
                
                {showExplanation && (
                  <div className="mt-2 sm:mt-4 p-3 sm:p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg sm:rounded-xl">
                    <p className="text-xs sm:text-sm text-gray-300">{currentQuestion.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`flex items-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition text-xs sm:text-sm ${
                currentIndex === 0
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              <FaArrowLeft className="text-xs sm:text-sm" />
              <span className="hidden xs:inline">Previous</span>
              <span className="xs:hidden">Prev</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
              className={`flex items-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition text-xs sm:text-sm ${
                currentIndex === questions.length - 1
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg text-white'
              }`}
            >
              <span className="hidden xs:inline">Next</span>
              <span className="xs:hidden">Next</span>
              <FaArrowRight className="text-xs sm:text-sm" />
            </button>
          </div>

          {/* Desktop Quick Jump */}
          {!isMobile && (
            <div className="mt-6 sm:mt-8">
              <p className="text-xs sm:text-sm text-gray-400 mb-2">Quick Jump:</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickJump(index)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-medium transition ${
                      index === currentIndex
                        ? 'bg-indigo-600 text-white'
                        : answeredQuestions.has(index)
                        ? 'bg-green-500/20 text-green-400 border border-green-500'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Quick Jump Hint */}
          {isMobile && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowQuickJump(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600/20 rounded-full border border-purple-500/30 text-purple-400 text-sm"
              >
                <FaBars />
                <span>Jump to Question ({currentIndex + 1}/{questions.length})</span>
              </button>
            </div>
          )}

          {/* Completion Message */}
          {currentIndex === questions.length - 1 && isAnswered && (
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl sm:rounded-2xl border border-yellow-500/30 text-center">
              <GiPartyPopper className="text-3xl sm:text-4xl md:text-5xl text-yellow-400 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">Quiz Completed! 🎉</h3>
              <p className="text-base sm:text-lg md:text-xl mb-2">
                Score: {score.correct}/{questions.length}
              </p>
              <p className="text-xs sm:text-sm text-gray-400 mb-4">
                Accuracy: {accuracy}% • Best Streak: {longestStreak}
              </p>
              <button
                onClick={handleRestart}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg sm:rounded-xl text-sm sm:text-base hover:shadow-lg transition"
              >
                Practice Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        
        /* Custom breakpoint for extra small devices */
        @media (min-width: 480px) {
          .xs\\:inline {
            display: inline;
          }
          .xs\\:hidden {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default Questions;