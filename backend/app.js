import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();//to load the environment variables
const app=express();
const PORT=process.env.PORT||3000;

app.use(express.json());

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts_lost_found.js";

import {verify} from "./middlewares/auth.js";
import { uploadFile } from "./middlewares/upload.js"; 
import { cloudinaryFile } from "./middlewares/cloudinary.js";


app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/posts",postRoutes);

// app.get("/protected",verify,(req,resp)=>{  //working fine(verification waala)
//     resp.json({message:req.user})
// });

// app.post("/upload",uploadFile,(req,resp)=>{ //uploading files- working fine
//     try{
//         resp.status(200).json({message:"File uploaded successfully!"});
//     }
//     catch(error){
//         resp.status(500).json({error:error.message});
//     }
// })

// app.post("/cloudUpload",cloudinaryFile,(req,res)=>{ //uploading files- to check
//     try{
//         return res.status(200).json({message:"File uploaded successfully!"});
//     }
//     catch(error){
//         return res.status(500).json({error:error.message});
//     }
// })

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database Connected successfully!");
    app.listen(PORT,()=>console.log(`Running on port ${PORT}`));
})
.catch((error)=>{
    console.error("Database connection failed ",error.message);
    process.exit(1);//exit if the database is not connected
});