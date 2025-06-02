require("dotenv").config();
var admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://coachhub-2c82c-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database();

module.exports = db;