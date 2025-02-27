import express from 'express'
import authRoutes from './routes/auth.js'
import connectDB from './config/connectDB.js'
import projectRoutes from './routes/projects.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,  
    credentials: true,  
}));

app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.get('/api/hi', (req, res) => {
    res.send('Hello server')
})

if (process.env.NODE_ENV === "production") {
    // Serve static files from the dist folder in the root directory
    app.use(express.static(path.join(__dirname, "client")));

    // Handle all other routes and serve index.html for client-side routing
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "index.html"));
    });
}




app.listen(5000, () => {
    connectDB()
    console.log('server is listening on port http://localhost:5000')
})

