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

const getStampCards = async (req, res) => {
    const ref = db.ref(`/clients/${req.params.id}/stampCards`);
    await ref.once('value', (snapshot) => {
        const data = snapshot.val();

        const stampCardsArray = data ? Object.keys(data).map(key => ({id: key, ...data[key]})) : [];

        res.json(stampCardsArray);
    });
}

const getStampCardById = async (req, res) => {
    const clientId = req.params.id;
    const stampCardId = req.params.stampCardId;

    const ref = db.ref(`/clients/${clientId}/stampCards/${stampCardId}`);

    await ref.once('value', (snapshot) => {
        const data = snapshot.val();
        res.json(data);
    });
}

const postStampCard = async (req, res) => {
    const ref = db.ref(`/clients/${req.params.id}/stampCards`);
    await ref.push(req.body);
    res.json({message: 'Stamp card added'});
}

const patchStampCard = async (req, res) => {
    const clientId = req.params.id;
    const stampCardId = req.params.stampCardId;

    const ref = db.ref(`/clients/${clientId}/stampCards/${stampCardId}`);

    try {
        await ref.update(req.body);
        res.json({ message: 'Stamp card updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update stamp card' });
    }
};


module.exports = {getClients, getClientById, postClient, getStampCards, getStampCardById, postStampCard, patchStampCard};