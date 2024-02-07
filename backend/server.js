import express from 'express';
import cors from 'cors';
import connectDB from './commun/connexionDb.js';
import dotenv from "dotenv";
import { route as taskRouter } from "./tasks/taskRoute.js";
import { route as userRouter } from "./users/userRoute.js";
import { route as authRouter } from "./authentification/authRoute.js";
import {auth} from "./commun/auth.js";
dotenv.config();
const { PORT_BACK } = process.env;

connectDB();

const app = express();

// Utilisation du middleware CORS avec des options spécifiques
app.use(cors({
    origin: 'http://localhost:3000',  // Mettez l'URL de votre application côté client
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ statut: "UP" });
});

//taskRoute
app.use("/api/tasks", auth, taskRouter)

//userRoute
app.use("/api/users", userRouter)

//authRoute
app.use("/api/auth" ,authRouter)

app.listen(PORT_BACK, () => {
    console.log(`Server is running on port ${PORT_BACK}`);
});
