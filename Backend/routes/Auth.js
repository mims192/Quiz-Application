import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

const router=express.Router();

const secretkey=process.env.JWT_SECRET;

router.post("/signup",async(req,res)=>{
    const {username,email,password}=req.body;

    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassowrd=await bcrypt.hash(password,10);
        const user=new User({
            username,
            password:hashedPassowrd,
            email
        })
        await user.save();
        res.status(201).json({message:'user created successfully'});
    } catch (error) {
        console.error("Error creating user", error);
        res.status(500).json({message:"Internal server error"});
    }
})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid email or password"});
        }
        const token=jwt.sign({userId:user._id,email:user.email,username:user.username},'secretkey',{expiresIn:'1h'});
        res.status(200).json({message:"Login successful",token});
    }
    catch(error){
        console.error("Error logging in",error);
        res.status(500).json({message:"Internal server error"});
    }
})

export function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Access token missing"});
    }
    jwt.verify(token,'secretkey',(err,user)=>{
        if(err){
            return res.status(403).json({message:"Invalid access token"});
        }
        req.user=user;
            next();
    })


}
export default router;

{/* {user?.username?.[0]?.toUpperCase() || "U"} */}