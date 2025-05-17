const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");
const ticketRoutes = require("./routes/tickets");
const messageRoutes = require("./routes/messages");

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/messages", messageRoutes);

// Start server
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
