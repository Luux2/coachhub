var admin = require("firebase-admin");

var serviceAccount = require("../coachhub-2c82c-firebase-adminsdk-usfdk-8e554b0e7b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://coachhub-2c82c-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database();

module.exports = db;