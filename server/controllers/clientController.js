const db = require('../config/firebase');

const getClients = async (req, res) => {
    const ref = db.ref('/clients');
    await ref.once('value', (snapshot) => {
        const data = snapshot.val();

        const clientsArray = data ? Object.keys(data).map(key => ({id: key, ...data[key]})) : [];

        res.json(clientsArray);
    });
}

const getClientById = async (req, res) => {
    const ref = db.ref(`/clients/${req.params.id}`);
    await ref.once('value', (snapshot) => {
        const data = snapshot.val();
        res.json(data);
    });
}

const postClient = async (req, res) => {
    const ref = db.ref('/clients');
    await ref.push(req.body);
    res.json({message: 'Client added'});
}

const getStampCards = async (req, res) => {
    const ref = db.ref(`/clients/${req.params.id}/stampCards`);
    await ref.once('value', (snapshot) => {
        const data = snapshot.val();

        const stampCardsArray = data ? Object.keys(data).map(key => ({id: key, ...data[key]})) : [];

        res.json(stampCardsArray);
    });
}

const postStampCard = async (req, res) => {
    const ref = db.ref(`/clients/${req.params.id}/stampCards`);
    await ref.push(req.body);
    res.json({message: 'Stamp card added'});
}

module.exports = {getClients, getClientById, postClient, getStampCards, postStampCard};