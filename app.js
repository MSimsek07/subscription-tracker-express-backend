import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';


const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded requests
// This middleware is used to process the form data sent via HTML forms in a simple format.
app.use(express.urlencoded({ extended: false }));

// Middleware to parse cookies
// This middleware is used to parse cookies from the request headers.
app.use(cookieParser());

// Middleware to handle Rete Limiting and Bots
app.use(arcjetMiddleware);

// api/v1/auth/sign-up
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

// Middleware to handle errors
app.use(errorMiddleware);


app.get('/', (req, res) => {
    res.send('Welcome to the subscription tracker API!');
});

app.listen(PORT, async () => {
    console.log(`Subscription tracker API is running on http://localhost:${PORT}`);
    await connectToDatabase();
});

export default app;