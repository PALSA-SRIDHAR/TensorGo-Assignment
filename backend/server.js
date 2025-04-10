const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const authRoutes = require('./auth/googleAuth');
const invoiceRoutes = require('./invoices/invoiceRoutes');
const zapierRoutes = require('./automation/zapierWebhook');
require('./auth/passportSetup');
const User=require("./models/User");
const Invoice = require('./models/Invoice');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
 
mongoose.connect('mongodb+srv://b191234:sridhar123@cluster0.kqnkxjw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(async()=>{
    console.log("Database connected successfully..!")})
.catch(()=>console.log("Database not connected...!"))
 
app.use('/auth', authRoutes);
app.use('/invoices', invoiceRoutes);
app.use('/automation', zapierRoutes);

app.get('/', (req, res) => res.send('Invoice Reminder API'));
  
app.listen(5000, () => console.log('Server running on port 5000'));
  