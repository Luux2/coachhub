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

        if (!data) {
            return res.status(404).json({ error: 'Client not found' });
        }

        if (data.stampCards) {
            data.stampCards = Object.entries(data.stampCards).map(([key, card]) => ({
                id: key,
                ...card,
            }));
        }

        res.json(data);
    });
};


const postClient = async (req, res) => {
    const ref = db.ref('/clients');
    await ref.push(req.body);
    res.json({message: 'Client added'});
}

const patchClient = async (req, res) => {
    const ref = db.ref(`/clients/${req.params.id}`);
    await ref.update(req.body);
    res.json({message: 'Client updated'});
}



module.exports = {getClients, getClientById, postClient, patchClient};