import { User } from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import config from "../config.js";

import { Course } from "../Models/course.model.js";
import { Purchase } from "../Models/purchase.model.js";



export const signup = async (req, res) => {
    const {firstName, lastName, email , password} = req.body;
    
    const userSchema = z.object({
        firstName: z.string().min(2,{message: "First Name must be between 2 to 20 characters"}),
        lastName: z.string().min(2, {message: "Last Name must be between 2 to 20 characters"}),
        email: z.string().email(),
        password: z.string().min(6, {message: "Password must be atleast 6 characters long"})
    });

    const validateData = userSchema.safeParse(req.body);
    if(!validateData.success){
        return res.status(400).json({errors:validateData.error.issues.map((err) => err.message)});
    }

    const hashedPassowrd =await  bcrypt.hash(password, 10);

    try {
        
        const existingUser = await User.findOne({email : email});
        if(existingUser){
          return res.status(400).json({message: "User already exists"});
        }

        const newUser = new User({firstName, lastName, email, password: hashedPassowrd});
        await newUser.save();
        return res.status(201).json({message: "User created successfully", newUser});
    } catch (error) {
        console.log("Error in signup", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const login = async(req,res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email: email});
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!user || !isPasswordCorrect){
            return res.status(403).json({ message: "Invalid Credentials" });
        }
        // jwt code
        const token = jwt.sign({
            id: user._id,
          
        },
        config.JWT_USER_PASSWORD,
        { expiresIn: "1d" }
    );
    const cookieOptions = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //1 Day
        httpOnly: true, // so that it cannot be accessed via any javascript code directly
        secure: process.env.NODE_ENV === "production", // true for https only, taki jab production ready hojaye toh https me convert hojaye abhi develop krre h toh http me rkha hai
        sameSite: "Strict", // CSRF attacks se bachane ke liye
    };
        res.cookie("jwt", token, cookieOptions);
        return res.status(201).json({ message: "Login Successful", user, token});
    } catch (error) {
        console.log("Error in login", error)
        return res.status(500).json({message: "Error in logging", error});
    }
}

export const logout = async(req,res) => {
    try {
         res.clearCookie("jwt");
        return res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in logout", error);
        return res.status(500).json({ error: "Error in logout" });
    }
}

export const purchases = async (req, res) => {
    const userId = req.userId;

    try {
        const purchased = await Purchase.find({userId})

        let purchasedCoursesId = []

        for(let i=0; i<purchased.length; i++){
            purchasedCoursesId.push(purchased[i].courseId)

        }
        const courseData = await Course.find({
            _id:{$in:purchasedCoursesId}
        })

        res.status(200).json({purchased, courseData});
    } catch (error) {
        console.log("Error in purchase", error);
        return res.status(500).json({errors: "Error in purchases"});
    }
}