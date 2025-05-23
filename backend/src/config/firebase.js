import admin from "firebase-admin"
import dotenv from "dotenv"
dotenv.config();

const serviceAccount = {
    type: "service_account",
    project_id: "my-recipe-book-1e28c",
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.CLIENT_EMAIL,
    client_id: "106003496475300290219",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40my-recipe-book-1e28c.iam.gserviceaccount.com",
    //universe_domain: "googleapis.com"
}

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
}

export default admin;