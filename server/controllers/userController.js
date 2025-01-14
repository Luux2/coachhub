const db = require ('../config/firebase');

const getUsers = async (req, res) => {
    const ref = db.ref('/users');
    await ref.once('value', (snapshot) => {
        const data = snapshot.val();

        const usersArray = data ? Object.keys(data).map(key => ({id: key, ...data[key]})) : [];

        res.json(usersArray);
    });
}

module.exports = {getUsers};