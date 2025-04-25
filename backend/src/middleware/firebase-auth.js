import admin from "../config/firebase.js";

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log("Decoded Token", decodedToken)
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export default verifyToken;