const express = require("express");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dns = require("dns");
const mongoose = require("mongoose");
const slugify = require("slugify");
require("dotenv").config();
const axios = require("axios");

const Blog = require("./models/blog");
const Visitor=require("./models/Visitor")
const DSAQuestion=require('./models/DSAQuestion');

const app = express();

// Force reliable DNS for MongoDB SRV
dns.setServers(["8.8.8.8", "1.1.1.1"]);

app.use(cors());
app.use(express.json());

/* ===============================
   TOKEN MIDDLEWARE
================================= */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(403).json({ message: "Access denied. No token." });

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* ===============================
   EMAIL ROUTE
================================= */
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Message from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Email failed to send" });
  }
});

/* ===============================
   ADMIN LOGIN
================================= */
app.post("/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASS
  ) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
});

/* ===============================
   BLOG ROUTES
================================= */

// CREATE BLOG
app.post("/api/blog", verifyToken, async (req, res) => {
  try {
    const { title, content, excerpt, category, image, author } = req.body;

    const blog = new Blog({
      title,
      slug: slugify(title, { lower: true }),
      content,
      excerpt,
      category,
      image,
      author,
      date: new Date(),
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create blog" });
  }
});

// GET ALL BLOGS
app.get("/api/blog", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

// GET SINGLE BLOG
app.get("/api/blog/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog" });
  }
});

// UPDATE BLOG
app.put("/api/blog/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update blog" });
  }
});

// DELETE BLOG
app.delete("/api/blog/:id", verifyToken, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete blog" });
  }
});

//like api
// LIKE BLOG (Public)
app.put("/api/blog/like/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.likes += 1;
    await blog.save();

    res.json({ likes: blog.likes });

  } catch (err) {
    res.status(500).json({ message: "Failed to like blog" });
  }
});
// ADD COMMENT (Public)
app.post("/api/blog/comment/:id", async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ message: "Name and message required" });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.comments.push({ name, message });
    await blog.save();

    res.json(blog.comments);

  } catch (err) {
    res.status(500).json({ message: "Failed to add comment" });
  }
});
//unlike 
app.put("/api/blog/unlike/:id", async (req, res) => {
  try {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.likes <= 0) {
      return res.json({
        message: "No likes to remove",
        likes: blog.likes
      });
    }

    blog.likes = blog.likes - 1;

    await blog.save();

    res.json({
      message: "Blog unliked",
      likes: blog.likes
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to unlike blog" });
  }
});

const startServer = () => {
  app.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
  });
};
// GET BLOG BY SLUG
app.get("/api/blog/slug/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching blog" });
  }
});


app.post('/api/visitor/track', async (req, res) => {
  try {
    console.log("Visitor API Hit");
   console.log("Headers:", req.headers);
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];
    
    // Create a unique identifier
    const visitorId = `${ip}-${userAgent}`;
    
    // Check if visitor already exists
    let visitor = await Visitor.findOne({ 
      $or: [
        { ip: ip, userAgent: userAgent },
        { visitorId: visitorId }
      ]
    });
    
    if (!visitor) {
      // New unique visitor
      await Visitor.create({
        ip,
        userAgent,
        visitorId,
        firstVisit: new Date(),
        lastVisit: new Date(),
        visitCount: 1
      });
      console.log("✅ New visitor recorded");
    } else {
      // Existing visitor - update last visit and count
      visitor.lastVisit = new Date();
      visitor.visitCount += 1;
      await visitor.save();
      console.log("🔄 Existing visitor updated");
    }
    
    // Get total unique visitors
    const totalVisitors = await Visitor.countDocuments();
    console.log("Total unique visitors:", totalVisitors);

    res.json({ 
      success: true, 
      totalVisitors,
      isNewVisitor: !visitor 
    });

  } catch (err) {
    console.error("❌ Visitor API Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get visitor count without tracking
app.get("/api/visitor/count", async (req, res) => {
  try {

    const totalVisitors = await Visitor.countDocuments();

    res.json({
      success: true,
      totalVisitors
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});
// Add this after your visitor routes
app.get('/api/visitor/stats', async (req, res) => {
  try {
    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [todayCount, weekCount, monthCount] = await Promise.all([
      Visitor.countDocuments({ lastVisit: { $gte: today } }),
      Visitor.countDocuments({ lastVisit: { $gte: weekAgo } }),
      Visitor.countDocuments({ lastVisit: { $gte: monthAgo } })
    ]);

    res.json({
      success: true,
      stats: {
        today: todayCount,
        week: weekCount,
        month: monthCount
      }
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ success: false });
  }
});

//fetch questions 
app.get("/api/questions", async (req, res) => {
  try {

    const questions = await DSAQuestion.find();

    res.json({
      success: true,
      totalQuestions: questions.length,
      data: questions
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});
//Get Questions According to Difficulty
app.get("/api/questions/difficulty/:difficulty", async (req, res) => {

  try {

    const difficulty = req.params.difficulty.toLowerCase();

    const questions = await DSAQuestion.find({ difficulty });

    res.json({
      success: true,
      totalQuestions: questions.length,
      data: questions
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});
//Validate Solution API
app.post("/api/questions/validate/:id", async (req, res) => {

  try {

    const { answer } = req.body;

    const question = await DSAQuestion.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found"
      });
    }

    const isCorrect = Number(answer) === question.correctAnswer;

    res.json({
      success: true,
      correct: isCorrect,
      message: isCorrect ? "Correct Answer 🎉" : "Wrong Answer ❌"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

// Create new question
app.post("/api/questions", async (req, res) => {
  try {

    const { question, options, correctAnswer, explanation, difficulty } = req.body;

    if (!question || !options || correctAnswer === undefined) {
      return res.status(400).json({
        success: false,
        message: "Question, options and correctAnswer are required"
      });
    }

    if (options.length < 2) {
      return res.status(400).json({
        success: false,
        message: "At least 2 options required"
      });
    }

    const newQuestion = new DSAQuestion({
      question,
      options,
      correctAnswer,
      explanation,
      difficulty
    });

    const saved = await newQuestion.save();

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: saved
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
//explanin repo
// ===========================================
// AI PROJECT EXPLANATION ROUTE - FIXED VERSION
// ===========================================
// AI PROJECT EXPLANATION - USER FRIENDLY VERSION
// ===========================================
app.post("/api/explain-project", async (req, res) => {
  try {
    const { repo } = req.body;
    
    if (!repo) {
      return res.status(400).json({ error: "Repository name is required" });
    }

    console.log("🔍 Fetching repo:", repo);

    // 1️⃣ GitHub se repo details
    const repoInfo = await axios.get(`https://api.github.com/repos/${repo}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    
    // 2️⃣ README fetch karo
    let readmeContent = "No README found";
    try {
      // const readme = await axios.get(`https://api.github.com/repos/${repo}/readme`, {
      //   headers: { 
      //     Accept: "application/vnd.github.raw",
      //     'User-Agent': 'Mozilla/5.0'
      //   }
      // });
      const repoInfo = await axios.get(`https://api.github.com/repos/${repo}`, {
  headers: { 
    'User-Agent': 'Portfolio-App',
    Authorization: `Bearer ${process.env.PORTFOLIO_GITHUB_TOKEN}`
  }
});
      readmeContent = readme.data.substring(0, 1500);
    } catch (readmeError) {
      console.log("📝 README not found");
    }
    
    const projectData = `
Project Name: ${repoInfo.data.name}
Description: ${repoInfo.data.description || 'No description'}
Stars: ${repoInfo.data.stargazers_count || 0}
Language: ${repoInfo.data.language || 'Unknown'}
Topics: ${(repoInfo.data.topics || []).join(', ') || 'None'}

README Preview:
${readmeContent}`;
    
    console.log("🤖 Sending to Gemini API...");

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY not configured" });
    }

    // ✅ SIMPLE PROMPT - Easy to understand
    const prompt = `You are a friendly tech mentor. Explain this GitHub project in VERY SIMPLE language that even a beginner can understand.

Project Details:
${projectData}

Please explain in this format:

🎯 PROJECT OVERVIEW (1-2 lines)
[Simple explanation of what this project does]

✨ MAIN FEATURES
• [Feature 1 - simple words]
• [Feature 2 - simple words]
• [Feature 3 - simple words]

🛠️ TECHNOLOGIES USED
• [Tech 1] - [what it does in simple words]
• [Tech 2] - [what it does in simple words]

💡 HOW IT WORKS (2-3 lines)
[Simple explanation of the architecture]

🌟 WHY IT'S COOL
[Why this project is impressive - simple terms]

Keep it friendly, use emojis, and avoid technical jargon!`;

    // ✅ FIX: Use correct model name (gemini-1.5-flash)
    const aiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );
    
    const result = aiResponse.data.candidates[0].content.parts[0].text;
    
    res.json({ 
      success: true,
      explanation: result 
    });
    
  } catch (error) {

 console.log("FULL ERROR:", error.response?.data || error.message);

 res.status(500).json({
  error: "Failed to analyze repository",
  details: error.response?.data || error.message
 });

}
});
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 15000,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    startServer();
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });
