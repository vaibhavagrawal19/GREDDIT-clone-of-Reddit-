const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // limit each ip to 5 login requests per window per minute
    message: 
        { message: "Too many login attempts from this IP, please try again after a 60 second pause" },
    standardHeaders: true, // return rate limit info in the RateLimit-* headers,
    legacyHeaders: false,
});

module.exports = loginLimiter;