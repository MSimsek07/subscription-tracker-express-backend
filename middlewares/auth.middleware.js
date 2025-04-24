import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

// Lets talk about what happens here, if someone makes a request to get user inforrmatin from db our authorize middleware checks the barrer token and 
// decodes it, then it checks if the user exists in the db and if the user has the required role to access the route, if not it returns a 401 error

const authorize = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId);
        if (!user) return res.status(401).json({ message: "Unauthorized" });
        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({ message: "Unauthorized", error: error.message });
    }
}

const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
}

// This middleware checks if the user is an admin or if the user is trying to access their own information
// It is used to protect routes that should only be accessible by the user themselves or an admin
const authorizeSelfOrAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        return next();
    }
    if (req.user._id && req.user._id.toString() === req.params.id) {
        return next();
    }
    // Optionally log unauthorized access attempts here
    return res.status(403).json({ message: 'Forbidden: You can only access your own user info.' });
};

export { authorize, authorizeAdmin, authorizeSelfOrAdmin };