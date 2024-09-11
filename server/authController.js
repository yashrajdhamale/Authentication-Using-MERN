const jwt = require('jsonwebtoken');
const User = require('./User-Model');

const SECRET_KEY = process.env.SECRET_KEY; // Keep this key secure

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Create a token
        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1hr' });


        res.status(200).json({ message: "Login successful", token });
        
    } catch (error) {
        res.status(500).json({ error: "Error occurred" });
    }
}

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ error: "User already exists" });
        }

        const newUser = await User.create({ username, email, password });

        // const token = jwt.sign({ id: newUser._id, username: newUser.username }, SECRET_KEY, { expiresIn: '1m' });

        // res.status(200).json({ message: "Registration successful", token });
        res.status(200).json({ message: "Registration successful" });
    } catch (error) {
        res.status(500).json({ error: "Error occurred" });
    }
}



module.exports = { login, register };
