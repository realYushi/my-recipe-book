var admin = require("firebase-admin");
var serviceAccount = require("../config/firebase-ServiceAccount.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
}

module.exports = verifyToken;
