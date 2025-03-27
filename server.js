const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Compass
mongoose.connect("mongodb://localhost:27017/btech_students", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Define Student Schema
const studentSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    gsuit: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9._%+-]+@btech\.ph\.education$/ },
    program: { type: String, required: true },
    studentnum: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    birthdate: { month: String, day: String, year: String },
    academicyear: { type: String, required: true },
    yearlevel: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true }
});

// Create Student Model
const Student = mongoose.model("Student", studentSchema);

// 🔹 Register API
app.post("/register", async (req, res) => {
    try {
        const { fullname, gsuit, program, studentnum, address, birthdate, academicyear, yearlevel, phone, password } = req.body;

        // Check if all fields are filled
        if (!fullname || !gsuit || !program || !studentnum || !address || !birthdate || !academicyear || !yearlevel || !phone || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Validate G-Suite email format
        if (!/^[a-zA-Z0-9._%+-]+@btech\.ph\.education$/.test(gsuit)) {
            return res.status(400).json({ error: "Invalid G-Suite email format. Must be '@btech.ph.education'." });
        }

        // Check if student already exists
        const existingStudent = await Student.findOne({ gsuit });
        if (existingStudent) {
            return res.status(400).json({ error: "Email is already registered." });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new student
        const newStudent = new Student({
            fullname, gsuit, program, studentnum, address, birthdate, academicyear, yearlevel, phone,
            password: hashedPassword // Store hashed password
        });

        await newStudent.save();
        res.status(201).json({ message: "Student registered successfully!" });

    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ error: "Error registering student." });
    }
});

// 🔹 Login API
app.post("/login", async (req, res) => {
    try {
        const { gsuit, password } = req.body;

        // Check if both email and password are provided
        if (!gsuit || !password) {
            return res.status(400).json({ error: "Please enter both email and password." });
        }

        // Find user by email
        const student = await Student.findOne({ gsuit });
        if (!student) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        res.json({ message: "Login successful!" });

    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

// Start Server
app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
});
