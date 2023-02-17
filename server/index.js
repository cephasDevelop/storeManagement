import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import itemRoutes from './routes/items.js';
import loginRoutes from './routes/login.js';
import signupRoutes from './routes/signup.js';
import deleteUpdateRoutes from './routes/deleteUpdateUser.js';
import requestRoutes from './routes/request.js'
import paymentRoutes from './routes/payment.js';
import historyRoutes from './routes/history.js';
import productRoutes from './routes/productList.js';

import kkgwRoutes from './routes/kkgwRoutes.js';
import kmikedemRoutes from './routes/kmikedemRoutes.js';

import companyRoutes from './routes/companyRoutes.js';

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json({limit:"50mb",extended:true}));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use('/api/items/', itemRoutes);

// create the items for the front page home 
app.use('/api/form/', itemRoutes);

// api for purchased products
app.use('/api/formPurchasedItems/', productRoutes);
app.use('/api/getAllProductListData/', productRoutes);
app.use('/api/deleteProduct/', productRoutes);


// for kkgw company
app.use('/api/postKkgwItem/', kkgwRoutes);
app.use('/api/getkkgwItems/', kkgwRoutes);

// for kmikedem company
app.use('/api/postKmikedemItem/', kmikedemRoutes);
app.use('/api/getKmikedemItems/', kmikedemRoutes);

// get for all company items
app.use('/api/getAllCompanyItemsData/', companyRoutes);
app.use('/api/editProduct/', companyRoutes);




app.use('/api/login/', loginRoutes);
app.use('/api/allUsers/', loginRoutes);

app.use('/api/signupforadmin/', signupRoutes);

app.use('/api/deleteUser/', deleteUpdateRoutes);
app.use('/api/updateUser/', deleteUpdateRoutes);

app.use('/api/makeRequest/', requestRoutes);
app.use('/api/requestedtems/', requestRoutes);
app.use('/api/delete-request/', requestRoutes);

app.use('/api/paymentRequest/', paymentRoutes);
app.use('/api/individualPayments',historyRoutes);


app.use('/api/historyCreate/', historyRoutes);

const PORT = process.env.PORT||8000;
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    
    .then(()=>app.listen(PORT, ()=> console.log(`Server runing on port ${PORT}`)))
    .catch((error) => console.log(error.message));
