const jwt = require("jsonwebtoken");
const cookie = require("cookie");
require("dotenv").config();

const verifySocketAuth = (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers.cookie || '');
    const token = cookies.token;
    if (!token) {
        return next(new Error("Authentication error: No token provided"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        socket.user = decoded;
        next();
    } catch (error) {
        console.log("Error verifying token:", error);
        next(new Error("Authentication error: Invalid token"));
    }
};

module.exports = verifySocketAuth;