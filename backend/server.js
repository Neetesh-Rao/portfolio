// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// app.use(cors());
// app.use(express.json());


// app.get('/',(req,res)=>{
//   res.send('hello')
// })

// // Route for sending email
// app.post("/send-email", async (req, res) => {
//   const { name, email, message } = req.body;
  

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: email,
//       to: process.env.EMAIL_USER,
//       subject: `Portfolio Message from ${name}`,
//       html: `
//         <h3>New Contact Message</h3>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong> ${message}</p>
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ success: true, message: "Email sent successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Email failed to send" });
//   }
// });

// app.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ IMPORTANT: Render dynamic port use karta hai
const PORT = process.env.PORT || 5000;

// ✅ CORS - apna vercel domain daalo yaha
app.use(
  cors({
    origin: "https://your-vercel-app.vercel.app", 
    methods: ["POST", "GET"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Create transporter outside route (better practice)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // ✅ 587 use karo
  secure: false, // true mat karo
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Optional: SMTP verify (debug ke liye useful)
transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP Server is ready to send messages");
  }
});

// Route for sending email
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`, // ✅ safer
      to: process.env.EMAIL_USER,
      replyTo: email, // ✅ user email yaha daalo
      subject: `Portfolio Message from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Email sent successfully 🚀",
    });
  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({
      success: false,
      message: "Email failed to send ❌",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});