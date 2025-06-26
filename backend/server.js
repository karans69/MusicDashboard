const express = require("express");
const cors = require("cors");
const users = require("./usersRoutes");
const { connectToServer } = require("./connect");
const trackRoutes = require("./routes/trackRoutes");
const adminTrackRoutes = require("./routes/adminTrackRoutes");
const path = require("path");


require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "admin-frontend/dist")));

app.get("/dashboard*",       sendIndex);   // optional: specific paths
app.get("/TrackList*",       sendIndex);
app.get("/createUser*",      sendIndex);
app.get("/admin/*",          sendIndex);   // or just one catch-all:
app.get("*",                 sendIndex); 

function sendIndex(req, res) {
  res.sendFile(path.join(__dirname, "admin-frontend/dist", "index.html"));
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(users);
app.use(adminTrackRoutes);

// Static Files (for artwork/audio previews)
app.use("/uploads", express.static("uploads"));

// Route Setup
app.use("/api/users", users);         // user routes should be prefixed
app.use("/api/tracks", trackRoutes);  // ✅ all track routes under /api/tracks

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/", dashboardRoutes);

// DB Connect & Server Start
connectToServer()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("🛑 Server not started due to DB connection error:", err);
  });
