const express = require("express");
const cors = require("cors");
const users = require("./usersRoutes");
const { connectToServer } = require("./connect");
const trackRoutes = require("./routes/trackRoutes");
const adminTrackRoutes = require("./routes/adminTrackRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", users);          // API routes must come first
app.use("/api/tracks", trackRoutes);
app.use("/api/admin", adminTrackRoutes);
app.use("/", dashboardRoutes);

// Static files (e.g., artwork/audio)
app.use("/uploads", express.static("uploads"));

// Serve Admin Panel (Vite build)
app.use(express.static(path.join(__dirname, "admin-frontend/dist")));

// Catch-all for frontend routes — should be last!
app.get(["/dashboard*", "/TrackList*", "/createUser*", "/admin/*", "*"], (req, res) => {
  res.sendFile(path.join(__dirname, "admin-frontend/dist", "index.html"));
});

// Connect DB and Start Server
connectToServer()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("🛑 Server not started due to DB connection error:", err);
  });
