const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const cors = require("cors");
const app = express();

// ✅ Allow both 3000 and 5500 origins
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:5500"],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/authDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" }  // role-based access
});

const User = mongoose.model("User", userSchema);

// Session Middleware
app.use(session({
  secret: "supersecretkey",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/authDB" }),
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.session.userId) return next();
  res.status(401).send("Unauthorized: Please login first");
}

// Middleware to check admin role
function isAdmin(req, res, next) {
  if (req.session.role === "admin") return next();
  res.status(403).send("Forbidden: Admins only");
}

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res.send("✅ User registered successfully");
  } catch (err) {
    res.status(400).send("⚠️ Error: " + err.message);
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).send("Invalid password");

  req.session.userId = user._id;
  req.session.role = user.role;
  res.send("✅ Login successful");
});

// Logout Route
app.post("/logout", (req, res) => {
  req.session.destroy();
  res.send("✅ Logged out successfully");
});

// Protected User Route
app.get("/dashboard", isAuthenticated, (req, res) => {
  res.send(`Welcome user! Your role is: ${req.session.role}`);
});

// Admin Only Route
app.get("/admin", isAuthenticated, isAdmin, (req, res) => {
  res.send("🔑 Welcome Admin! You have special access.");
});

// Start Server
app.listen(3000, () => console.log("🚀 Server running at http://localhost:3000"));
