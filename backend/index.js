require("dotenv").config();
const express = require("express");
const app=express();
const { connectToDb } = require("./connection");
const cors=require("cors");
const { userRouter } = require("./routes/user");
const { authMiddleware } = require("./middlewares/authentication");
const { uploadImgRouter } = require("./routes/image");

connectToDb(process.env.Mongo_URL);

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use(express.static('public'));

app.use('/user',userRouter);
app.use('/img', uploadImgRouter);

app.use((err,req,res,next)=> console.log(err));

app.listen(process.env.PORT,()=>console.log(`Server running at port ${process.env.PORT}`))