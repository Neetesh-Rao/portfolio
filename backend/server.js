const express = require("express");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dns = require("dns");
const mongoose = require("mongoose");
const slugify = require("slugify");
require("dotenv").config();

const Blog = require("./models/blog");

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
// app.put("/api/blog/unlike/:id", async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);

//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }

//     // likes 0 se niche na jaye
//     if (blog.likes > 0) {
//       blog.likes -= 1;
//     }

//     await blog.save();

//     res.json({
//       message: "Blog unliked",
//       likes: blog.likes
//     });

//   } catch (err) {
//     res.status(500).json({ message: "Failed to unlike blog" });
//   }
// });
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
/* ===============================
   MONGODB CONNECTION
================================= */

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