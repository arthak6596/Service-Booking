const express = require("express")
const dotenv = require("dotenv")
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const router = express.Router();

dotenv.config({ quiet: true });

const userRoutes = require('./routes/user')
const serviceRoutes = require('./routes/services')
const authRoutes = require('./routes/auth')

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/users',userRoutes);
app.use('/services',serviceRoutes);
app.use('/api/auth',authRoutes);



const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("MongoDB Connected")
}).catch((err)=> console.log(`MongoDB error is ${err}`))

app.listen(PORT,()=>{
    console.log(`server is listening on Port ${PORT}`)
})