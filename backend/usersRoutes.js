const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const SECRET_KEY = "Dprosen2025";

let usersRoutes = express.Router()
const SALT_ROUNDS = 10

// Retrieve All
usersRoutes.route("/users").get(async (req, res) => {
    let db = database.getDb()
    let data = await db.collection("users").find({}).toArray()
    if (data.length > 0) {
        res.json(data)
    } else {
        throw new Error("Data not found :(")
    }
})

// Retrieve One
usersRoutes.route("/users/:id").get(async (req, res) => {
    let db = database.getDb()
    let data = await db.collection("users").findOne({ _id: new ObjectId(req.params.id) })
    if (data && Object.keys(data).length > 0) {
        res.json(data)
    } else {
        throw new Error("Data not found :(")
    }
})

// Create
usersRoutes.route("/users").post(async (req, res) => {
  let db = database.getDb();

  const takenEmail = await db.collection("users").findOne({ email: req.body.email });

  if (takenEmail) {
    res.json({ message: "Already have an user with this email" });
  } else {
    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    const mongoObject = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
    };

    let data = await db.collection("users").insertOne(mongoObject);
    res.json(data); // or send custom success message
  }
});

// Update
usersRoutes.route("/users/:id").put(async (req, res) => {
    let db = database.getDb()
    let mongoObject = {
        $set: {
            email: req.body.email,
            name: req.body.name
        }
    }
    let data = await db.collection("users").updateOne({ _id: new ObjectId(req.params.id) }, mongoObject)
    res.json(data)
})

// Delete
usersRoutes.route("/users/:id").delete(async (req, res) => {
    let db = database.getDb()
    let data = await db.collection("users").deleteOne({ _id: new ObjectId(req.params.id) })
    res.json(data)
})


// ✅ LOGIN Route
usersRoutes.post("/login", async (req, res) => {
  const db = database.getDb();
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1d" });

    res.json({
      message: "Login successful",
      token,
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = usersRoutes
