const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test route (for browser check)
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully!");
});


// MongoDB Atlas connection
mongoose.connect("mongodb+srv://garvmobile4873:xcKetB5QuoZxEBMl@cluster0new.v09ug41.mongodb.net/")
    

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
});

const User = mongoose.model('User', userSchema);

// API endpoint to handle form submission
app.post('/api/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send('User data saved successfully');
    } catch (error) {
        res.status(400).send('Error saving user data');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});