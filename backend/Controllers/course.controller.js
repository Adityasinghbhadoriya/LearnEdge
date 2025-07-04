import { Course } from "../Models/course.model.js";
import { v2 as cloudinary } from 'cloudinary';
import { Purchase } from "../Models/purchase.model.js";


export const createCourse = async (req, res) => {
    const adminId = req.adminId;
    const { title, description, price } = req.body;

    try {
        if (!title || !description || !price) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const { image } = req.files;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                message: "No files were uploaded"
            });
        }

        const allowedFormat = ["image/png", "image/jpeg"];
        if (!allowedFormat.includes(image.mimetype)) {
            return res.status(400).json({
                message: "Only png and jpg files are allowed"
            });
        }

        //Cloudinary Code
        const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
        if (!cloud_response || cloud_response.error) {
            return res.status(400).json({
                error: "Error uploading file to cloudinary"

            });
        }

        const courseData = {
            title,
            description,
            price,
            image: {
                public_id: cloud_response.public_id,
                url: cloud_response.secure_url
            },
            creatorId: adminId
        }


        const course = await Course.create(courseData);
        res.status(201).json({
            message: "Course created successfully",
            data: course
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error Creating Course"
        });
    }
};

export const updateCourse = async (req, res) => {
    const adminId = req.adminId;
    const { courseId } = req.params;
    const { title, description, price, image } = req.body;
    try {
        const courseSearch = await Course.findById(courseId);
        if (!courseSearch) {
            return res.status(404).json({ error: "Course not found" });
        }
        
        const course = await Course.findOneAndUpdate({
            _id: courseId,
            creatorId: adminId,
        }, {
            title,
            description,
            price,
            image: {
                public_id: image?.public_id,
                url: image?.url
            }
        })
        if(!course){
            return res.status(404).json({errors: "Can't Update, Created by other Admin"})
        }
        res.status(201).json({
            message: "Course updated successfully",
            course
        });
    } catch (error) {
        res.status(500).json({ error: "Error in updating course" });
        console.log("Error in course updating", error)
    }
};

export const deleteCourse = async (req, res) => {
    const adminId = req.adminId;
    const { courseId } = req.params;
    try {
        const course = await Course.findOneAndDelete({
            _id: courseId,
            creatorId: adminId,
        });
        if (!course) {
            return res.status(404).json({
                message: "Cannot delete, created by another Admin"
            });
        }
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error in deleting course" });
        console.log("Error in course deleting", error)
    }
};

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json({ message: "Courses fetched successfully", courses });
    } catch (error) {
        res.status(500).json({ message: "Error in getting courses" });
        console.log("Error in getting courses", error);
    }
};

export const courseDetails = async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course fetched successfully", course });
    } catch (error) {
        res.status(500).json({ message: "Error in getting course details" });
        console.log("Error in getting course details", error);

    }
};

import Stripe from "stripe";
import config from "../config.js";
const stripe = new Stripe(config.STRIPE_SECRET_KEY)
console.log(config.STRIPE_SECRET_KEY)

export const buyCourses = async (req, res) => {
    const { userId } = req;
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ errors: "Course not found" });
        }
        const existingPurchase = await Purchase.findOne({ userId, courseId })
        if (existingPurchase) {
            return res.status(400).json({ errors: "user has already purchased this course" });
        }

        // Stripe payment code goes here!!
        const amount = course.price;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method_types:["card"]
        });

        res.status(201).json({ message: "Course purchased successfully", course,clientSecret: paymentIntent.client_secret });

    } catch (error) {
        res.status(500).json({ errors: "Error in course buying" });
        console.log("error in course buying", error)
    }
}