import { Router } from "express";
import { authorize, authorizeAdmin, authorizeSelfOrAdmin } from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions, getAllSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', authorize, authorizeAdmin, getAllSubscriptions);

subscriptionRouter.get('/:id', (req, res) => {
    // Handle getting subscription by ID
    res.send({ title: "GET subscription by ID." });
});

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => {
    // Handle updating subscription by ID
    res.send({ title: "UPDATE subscription by ID" });
});

subscriptionRouter.delete('/:id', (req, res) => {
    // Handle deleting subscription by ID
    res.send({ title: "DELETE subscription by ID" });
});

subscriptionRouter.get('/user/:id', authorize, authorizeSelfOrAdmin, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => {
    // Handle canceling subscription by ID
    res.send({ title: "CANCEL subscription by ID" });
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    // Handle getting upcoming renewals
    res.send({ title: "GET all upcoming renewals" });
});

export default subscriptionRouter;