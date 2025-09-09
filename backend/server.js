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

// User Schema with role field
import mongoosePkg from 'mongoose';
const userSchema = new mongoosePkg.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date }
});

const User = mongoosePkg.model('User', userSchema);

// Game Schema
const gameSchema = new mongoosePkg.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    rating: { type: String, default: '4.0' },
    plays: { type: String, default: '0' },
    badges: [{ type: String }],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

const Game = mongoosePkg.model('Game', gameSchema);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://jhonalineh099:okokok@cluster0.6wlsakx.mongodb.net/gamehub';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected successfully');
    // Create default admin user
    createDefaultAdmin();
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Create default admin user
async function createDefaultAdmin() {
    try {
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (!existingAdmin) {
            const adminUser = new User({
                username: 'admin',
                password: 'admin123', // Change this in production!
                role: 'admin'
            });
            await adminUser.save();
            console.log('Default admin user created: admin/admin123');
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
}

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(403).json({ message: 'User not found' });
        }
        
        req.user = user;
        next();
    });
};

// Admin middleware
const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

app.get('/', (req, res) => {
    res.send('Gamehub API Server')
});

// Signup
app.post('/api/signup', async (req, res) => {
    try {
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
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({ 
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                role: newUser.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password (in production, use bcrypt for password hashing)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({ 
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// ADMIN ROUTES

// Get admin stats
app.get('/api/admin/stats', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalGames = await Game.countDocuments();
        const activeGames = await Game.countDocuments({ isActive: true });
        
        // Get new users in last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const newUsers = await User.countDocuments({ 
            createdAt: { $gte: sevenDaysAgo } 
        });

        // Get recent users
        const recentUsers = await User.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .select('username role createdAt lastLogin');

        res.json({
            totalUsers,
            totalGames,
            activeGames,
            newUsers,
            recentUsers
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all users
app.get('/api/admin/users', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const users = await User.find()
            .select('username role createdAt lastLogin')
            .sort({ createdAt: -1 });
        
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete user
app.delete('/api/admin/users/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role === 'admin') {
            return res.status(403).json({ message: 'Cannot delete admin user' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all games
app.get('/api/admin/games', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const games = await Game.find().sort({ createdAt: -1 });
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Add new game
app.post('/api/admin/games', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const gameData = req.body;
        
        // Check if game ID already exists
        const existingGame = await Game.findOne({ id: gameData.id });
        if (existingGame) {
            return res.status(400).json({ message: 'Game ID already exists' });
        }

        const newGame = new Game(gameData);
        await newGame.save();
        
        res.status(201).json({ message: 'Game added successfully', game: newGame });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update game
app.put('/api/admin/games/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        
        if (!updatedGame) {
            return res.status(404).json({ message: 'Game not found' });
        }
        
        res.json({ message: 'Game updated successfully', game: updatedGame });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Toggle game active status
app.put('/api/admin/games/:id/toggle', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        game.isActive = !game.isActive;
        await game.save();
        
        res.json({ message: 'Game status updated successfully', game });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete game
app.delete('/api/admin/games/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const deletedGame = await Game.findByIdAndDelete(req.params.id);
        if (!deletedGame) {
            return res.status(404).json({ message: 'Game not found' });
        }
        
        res.json({ message: 'Game deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get public games (for frontend)
app.get('/api/games', async (req, res) => {
    try {
        const games = await Game.find({ isActive: true })
            .select('id title description category image link rating plays badges');
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Admin login: username=admin, password=admin123`);
});