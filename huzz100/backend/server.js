import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "mySuperSecretKey123!@#";

app.use(cors());
app.use(bodyParser.json());

//Just for instance create a model in mongodb and then adding it for storing credentials of user
import mongoosePkg from 'mongoose';
const userSchema = new mongoosePkg.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoosePkg.model('User', userSchema) || mongoosePkg.model('User');
//Mongodb connection using URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://jhonalineh099:3MUFo9hn8PrbKTBg@cluster0.6wlsakx.mongodb.net/gamehub?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//Signup
app.post('/api/signup', bodyParser.json(), async (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ username, password });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
})


// Login
app.post('/api/login', bodyParser.json(), async (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    if (user.password !== password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

