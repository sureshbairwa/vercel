import express from 'express'
import authRoutes from './routes/auth.js'
import connectDB from './config/connectDB.js'
import projectRoutes from './routes/projects.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',  
    credentials: true,  
}));

app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)

app.get('/', (req, res) => {
    res.send('Hello server')
})

app.listen(5000, () => {
    connectDB()
    console.log('server is listening on port http://localhost:5000')
})

