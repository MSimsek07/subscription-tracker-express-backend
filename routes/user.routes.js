import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => {
    // Handle fetching user profile
    res.send({ title: "Get all users." });
});

userRouter.get('/:id', (req, res) => {
    // Handle fetching user profile by ID
    res.send({ title: "Get user by ID." });
});

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