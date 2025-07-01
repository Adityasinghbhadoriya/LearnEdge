import dotenv from "dotenv";

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD
const STRIPE_SECRET_KEY = "sk_test_51R4fv6FhBT0Iuf5xeyDtwU1TjBsAyBrcRUzmt17nM60lVbqXWVzExTLPtlHtSJrjjZrXZBMcgpSbUzMiOR1E8LM800kjZNxvaD"
export default{
    JWT_USER_PASSWORD,
    JWT_ADMIN_PASSWORD,
    STRIPE_SECRET_KEY
 }