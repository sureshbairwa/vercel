import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import deployRoutes from './routes/deploy';
import { uploadFile } from './utils/uploadFile';


dotenv.config();
const PORT = process.env.PORT;

// const client = createClient({
//   host: process.env.REDIS_HOST,
//   port: parseInt(process.env.REDIS_PORT),
//   password: process.env.REDIS_PASSWORD
// });



const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/deploy",deployRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});




app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});