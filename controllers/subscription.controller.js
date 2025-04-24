import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id, // Assuming req.user is set by authentication middleware

        });
        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: subscription,
        });

    } catch (error) {
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        // allow user or admin to view subscriptions
        if (req.user._id.toString() !== req.params.id && req.user.role !== "admin") {
            const error = new Error("You are not authorized to view this user's subscriptions.");
            error.statusCode = 403;
            throw error;
        }
        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json({
            success: true,
            message: "Subscriptions retrieved for the user successfully",
            data: subscriptions,
        });

    } catch (error) {
        next(error);
    }
}

export const getAllSubscriptions = async (req, res, next) => {
    try {
        // assume admin access is already checked by middleware
        const subscriptions = await Subscription.find({});
        res.status(200).json({
            success: true,
            message: "All subscriptions retrieved successfully",
            data: subscriptions,
        });

    } catch (error) {
        next(error);
    }
}