const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MongoDB Compass
mongoose.connect("mongodb://localhost:27017/btech_db")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Student Schema
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
    password: { type: String, required: true },
});

// ✅ Staff Schema
const staffSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    gsuit: { type: String, required: true, unique: true, match: /^[a-zA-Z]+@btech\.ph\.education$/ },
    work: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
});

// ✅ Create Models
const Student = mongoose.model("Student", studentSchema);
const Staff = mongoose.model("Staff", staffSchema);

// ✅ Helper Function for Input Validation
const validateFields = (fields) => {
    return Object.values(fields).every(field => field && field.trim() !== "");
};

// 📌 STUDENT REGISTRATION
app.post("/register-student", async (req, res) => {
    try {
        const { fullname, gsuit, program, studentnum, address, birthdate, academicyear, yearlevel, phone, password } = req.body;

        // Validate required fields
        if (!validateFields({ fullname, gsuit, program, studentnum, address, academicyear, yearlevel, phone, password })) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Validate email format
        if (!/^[a-zA-Z0-9._%+-]+@btech\.ph\.education$/.test(gsuit)) {
            return res.status(400).json({ error: "Invalid G-Suite email format. Must be '@btech.ph.education'." });
        }

        // Check if student exists
        if (await Student.findOne({ gsuit })) {
            return res.status(400).json({ error: "Email is already registered." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save student to DB
        const newStudent = new Student({ fullname, gsuit, program, studentnum, address, birthdate, academicyear, yearlevel, phone, password: hashedPassword });
        await newStudent.save();

        res.status(201).json({ message: "Student registered successfully!" });

    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ error: "Error registering student." });
    }
});

// 📌 STAFF REGISTRATION (Fixed)
app.post("/register-staff", async (req, res) => {
    try {
        console.log("📩 Received data:", req.body); // Debugging

        const { fullname, gsuit, work, phone, password } = req.body;

        // Validate required fields
        if (!validateFields({ fullname, gsuit, work, phone, password })) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Validate email format
        if (!/^[a-zA-Z]+@btech\.ph\.education$/.test(gsuit)) {
            return res.status(400).json({ error: "Invalid Staff email format. Must be '@btech.ph'." });
        }

        // Check if staff exists
        const existingStaff = await Staff.findOne({ gsuit });
        if (existingStaff) {
            return res.status(400).json({ error: "Email is already registered." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save staff to DB
        const newStaff = new Staff({ fullname, gsuit, work, phone, password: hashedPassword });
        await newStaff.save();

        res.status(201).json({ message: "Staff registered successfully!" });

    } catch (error) {
        console.error("❌ Staff Registration Error:", error);
        res.status(500).json({ error: "Error registering staff." });
    }
});

// 📌 LOGIN API (For Both Students and Staff)
app.post("/login", async (req, res) => {
    try {
        const { gsuit, password } = req.body;

        // Validate input
        if (!validateFields({ gsuit, password })) {
            return res.status(400).json({ error: "Please enter both email and password." });
        }

        let user;
        let userType;

        // Check if the user is a Student (Student numbers only)
        if (/^\d+@btech\.ph\.education$/.test(gsuit)) {
            user = await Student.findOne({ gsuit });
            userType = "Student";
        }
        // Check if the user is a Staff (Names only)
        else if (/^[a-zA-Z]+@btech\.ph\.education$/.test(gsuit)) {
            user = await Staff.findOne({ gsuit });
            userType = "Staff";
        }

        if (!user) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        res.json({ message: "Login successful!", userType });

    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
