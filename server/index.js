import express from 'express';
// import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import itemRoutes from './routes/items.js';

dotenv.config();
const app = express();

app.use(cors());

// app.use(express.json());// not required

app.use(express.json({limit:"50mb",extended:true}));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


app.use('/api/items/', itemRoutes);
app.use('/api/form/', itemRoutes);


const PORT = process.env.PORT||8000;
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    
    .then(()=>app.listen(PORT, ()=> console.log(`Server runing on port ${PORT}`)))
    .catch((error) => console.log(error.message));
