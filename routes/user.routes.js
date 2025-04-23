import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";
import { authorize, authorizeAdmin, authorizeSelfOrAdmin } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', authorize, authorizeAdmin, getUsers);

// Protected route
userRouter.get('/:id', authorize, authorizeSelfOrAdmin, getUser);

userRouter.post('/', (req, res) => {
    // Handle creating a new user
    res.send({ title: "CREATE a new user." });
});

userRouter.put('/:id', (req, res) => {
    // Handle updating user by ID
    res.send({ title: "UPDATE user by ID." });
});

userRouter.delete('/:id', (req, res) => {
    // Handle deleting user by ID
    res.send({ title: "DELETE user by ID." });
});
export default userRouter;