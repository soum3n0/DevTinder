const isProduction = process.env.NODE_ENV === "production";

const corsOrigin = isProduction
  ? "https://devtinder-frontend-2q0b.onrender.com"
  : "http://localhost:5173";

const PORT = process.env.PORT || 3000;
const defaultPhotoUrl = "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg";

module.exports = {defaultPhotoUrl, corsOrigin, PORT};