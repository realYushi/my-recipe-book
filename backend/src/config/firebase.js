import admin from "firebase-admin"
import dotenv from "dotenv"
dotenv.config();

const privateKeyFromEnv = process.env.PRIVATE_KEY;
const processedPrivateKey = privateKeyFromEnv ? privateKeyFromEnv.replace(/\\n/g, '\n') : undefined;
const serviceAccount = {
    type: "service_account",
    project_id: "my-recipe-book-1e28c",
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: processedPrivateKey,
    client_email: process.env.CLIENT_EMAIL,
    client_id: "106003496475300290219",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40my-recipe-book-1e28c.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
}

if (!processedPrivateKey) {
    console.error("Error: Firebase PRIVATE_KEY is not set in environment variables.");
} else if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
    console.log("Firebase Admin SDK initialized successfully.");
} else {
    console.log("Firebase Admin SDK already initialized.");
}

export default admin;