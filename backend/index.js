import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "./Models/db.js";
import courseRoutes from "./Routes/course.route.js";
import userRoutes from "./Routes/user.route.js";
import adminRoutes from "./Routes/admin.route.js";
import orderRoutes from "./Routes/order.route.js"
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const  PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "https://learn-edge.vercel.app",
  "https://learn-edge-kvygdge2x-aditya-singh-bhadoriyas-projects.vercel.app",
  "https://learn-edge-git-main-aditya-singh-bhadoriyas-projects.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.get("/", (req, res) => {    
    res.send("Hello World");
});

app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/order", orderRoutes);

 //Cloudinary Configuration
 cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret 
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
