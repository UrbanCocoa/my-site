import express from "express";
import multer from "multer";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// File upload setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route: handle order submission
app.post("/send-order", upload.array("attachments", 10), async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const files = req.files;

    console.log("🧾 Order received:", { name, email, phone, filesCount: files.length });

    // Create mail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Construct email options
    const mailOptions = {
      from: `"KooWhips Orders" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER, // send to yourself
      subject: `New Order from ${name}`,
      text: `
New Order Received
--------------------------
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}

Message:
${message || "No message provided."}

Total Attachments: ${files.length}
Order Date: ${new Date().toLocaleString()}
      `,
      attachments: files.map((file) => ({
        filename: file.originalname,
        content: file.buffer,
      })),
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("❌ Email send failed:", err);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
