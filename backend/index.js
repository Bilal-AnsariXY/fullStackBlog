const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // your frontend port
  credentials: true               // allow cookies
}));
require('dotenv').config();
const PORT = process.env.PORT || 4000;
app.use(express.json());

const database = require('./config/db.js');
database();

const user = require('./routes/user');
app.use('/api',user);

app.listen(PORT,()=>{
    console.log(`server is listning at port ${PORT}`)
})