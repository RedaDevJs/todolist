import express from 'express';
import cors from 'cors';
import connectDB from './commun/connexionDb.js';
import dotenv from 'dotenv';
import { route as taskRouter } from './tasks/taskRoute.js';
import { route as userRouter } from './users/userRoute.js';
import { route as authRouter } from './authentification/authRoute.js';
import { auth } from './commun/auth.js';

dotenv.config();
const { PORT_BACK } = process.env;

// Fallback port if PORT_BACK is not defined
const port = PORT_BACK || 3001;

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Set the URL of your client-side application
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Routes
app.get('/', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

// Task route
app.use('/api/tasks', auth, taskRouter);

// User route
app.use('/api/users', userRouter);

// Auth route
app.use('/api/auth', authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Server shutting down...');
    process.exit(0);
});
