import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        console.log("Arcjet middleware: checking request");
        const decision = await aj.protect(req, { requested: 1 });
        console.log("Arcjet decision:", decision);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) return res.status(429).json({ error: "Rate limit exceeded, too many requests" });
            if (decision.reason.isBot()) return res.status(403).json({ error: "Bot detected" });

            return res.status(403).json({ error: "Access denied" });
        }
        next();
    } catch (error) {
        console.error(`Arcjet middleware Error: ${error}`);
        next(error);
    }
}

export default arcjetMiddleware;