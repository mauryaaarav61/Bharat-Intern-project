const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/RegistrationForm', )
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const UserModel = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please Enter Your Details.' });
    }

    try {
        const newUser = await UserModel.create({ name, email, password });
        res.json({ auth: true, result: newUser });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Registration Error.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
