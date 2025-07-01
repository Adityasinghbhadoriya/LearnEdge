
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import config from "../config.js";
import { Admin } from "../Models/admin.model.js";


export const signup = async (req, res) => {
    const {firstName, lastName, email , password} = req.body;
    
    const adminSchema = z.object({
        firstName: z.string().min(2,{message: "First Name must be between 2 to 20 characters"}),
        lastName: z.string().min(2, {message: "Last Name must be between 2 to 20 characters"}),
        email: z.string().email(),
        password: z.string().min(6, {message: "Password must be atleast 6 characters long"})
    });

    const validateData = adminSchema.safeParse(req.body);
    if(!validateData.success){
        return res.status(400).json({errors:validateData.error.issues.map((err) => err.message)});
    }

    const hashedPassowrd =await  bcrypt.hash(password, 10);

    try {
        
        const existingUser = await Admin.findOne({email : email});
        if(existingUser){
          res.status(400).json({message: "Admin already exists"});
        }

        const newAdmin = new Admin({firstName, lastName, email, password: hashedPassowrd});
        await newAdmin.save();
        res.status(201).json({message: "Admin created successfully", newAdmin});
    } catch (error) {
        console.log("Error in signup", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const login = async(req,res) => {
    const {email, password} = req.body;
    try {
        const admin = await Admin.findOne({email: email});
        const isPasswordCorrect = await bcrypt.compare(password, admin.password)

        if(!admin || !isPasswordCorrect){
            return res.status(403).json({ error: "Invalid Credentials" });
        }
        // jwt code
        const token = jwt.sign({
            id: admin._id,
          
        },
        config.JWT_ADMIN_PASSWORD,
        { expiresIn: "1d" }
    );
    const cookieOptions = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //1 Day
        httpOnly: true, // so that it cannot be accessed via any javascript code directly
        secure: process.env.NODE_ENV === "production", // true for https only, taki jab production ready hojaye toh https me convert hojaye abhi develop krre h toh http me rkha hai
        sameSite: "Strict", // CSRF attacks se bachane ke liye
    };
        res.cookie("jwt", token, cookieOptions);
        res.status(201).json({ message: "Login Successful", admin, token});
    } catch (error) {
        res.status(500).json({message: "Error in logging", error});
        console.log("Error in login", error)
    }
}

export const logout = async(req,res) => {
    try {
        if(!req.cookies.jwt){
            return res.status(401).json({ errors: "Kindly Login First" })
        }
        res.clearCookie("jwt");
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        res.status(500).json({ error: "Error in logout" });
        console.log("Error in logout", error);
    }
}