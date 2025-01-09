var admin = require("firebase-admin");

var serviceAccount = require("../coachhub-2c82c-firebase-adminsdk-usfdk-5940b4bfe5.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://coachhub-2c82c-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database();

module.exports = db;