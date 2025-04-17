import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minlength: [2, "Subscription name must be at least 2 characters long"],
        maxlength: [100, "Subscription name must be at most 100 characters long"],
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Subscription price must be a positive number"],
    },
    currency: {
        type: String,
        trim: true,
        enum: ["TL", "USD", "EUR", "GBP", "INR", "AUD", "CAD", "JPY", "CNY", "RUB"], // Add more currencies as needed
        default: "TL",
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
        default: "monthly",
    },
    category: {
        type: String,
        enum: ["finance", "news", "sports", "lifestyle", "business", "gaming", "shopping", "travel", "technology", "entertainment", "food", "utilities", "transportation", "health", "education", "other"],
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active",
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: "Start date cannot be in the future, it must be in the past",
        },
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: "Renewal date must be after the start date",
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
}, { timestamps: true });

// Auto calculated renewal date based on frequency if not provided
subscriptionSchema.pre("save", function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    // Auto set status to expired if renewal date is in the past
    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }
    next();
});


const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;