const db = require('../config/firebase');

const getClients = async (req, res) => {
    const ref = db.ref('/clients');
    await ref.once('value', (snapshot) => {
        const data = snapshot.val();

        const clientsArray = data ? Object.keys(data).map(key => ({id: key, ...data[key]})) : [];

        res.json(clientsArray);
    });
}

const postClient = async (req, res) => {
    const ref = db.ref('/clients');
    await ref.push(req.body);
    res.json({message: 'Client added'});
}

module.exports = {getClients, postClient};