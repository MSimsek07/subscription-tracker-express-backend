import mongoose from "mongoose"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res, next) => {
    // Implement sign-up logic
    // session is used to manage transactions in MongoDB
    // It allows you to group multiple operations into a single transaction
    // and ensures that either all operations are completed successfully or none of them are applied.
    // This is useful for maintaining data integrity and consistency in your database.
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        // Create a new user in the database
        const { name, email, password, role } = req.body;

        // Check if the user already exists, User is a Mongoose model
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409; // Conflict
            throw error;
        }
        // Validate the password length
        // Lets upgrade it to 8 characthers and 1 special character and 1 number
        const passwordRegex = /^(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
        if (!passwordRegex.test(password)) {
            const error = new Error("Password must be at least 8 characters long, contain at least one special character, and one number.");
            error.statusCode = 400;
            throw error;
        }

        // Hash the password before saving it to the database
        // bcrypt is a library for hashing passwords
        // It uses a one-way hashing algorithm to securely store passwords
        // This means that even if someone gains access to the database, they won't be able to retrieve the original password.
        // The salt is a random value added to the password before hashing to make it more secure
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object with the hashed password
        const newUsers = await User.create([{
            name,
            email,
            password: hashedPassword,
            role: role === "admin" ? "admin" : "user"
        }], { session });

        const token = jwt.sign(
            { userId: newUsers[0]._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN } // Token expiration time
        );

        await session.commitTransaction();
        session.endSession();
        // Send a response to the client with the new user data and token
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                user: newUsers[0],
                token,
            },
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }

}

export const signIn = async (req, res, next) => {
    // Implement sign-in logic
    try {
        const { email, password } = req.body;

        // Check if the user exists, and if the password is correct
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            const error = new Error("Invalid email or password");
            error.statusCode = 401;
            throw error;
        }

        // Generate a token for the user
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN } // Token expiration time
        );
        // Send a response to the client with the user data and token
        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {
                user,
                token,
            },
        });

    } catch (error) {
        next(error);
    }

}

export const signOut = async (req, res, next) => {
    // Implement sign-up logic

}