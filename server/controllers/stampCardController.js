const db = require('../config/firebase');

const getStampCards = async (req, res) => {
    const ref = db.ref('/stampcards');
    await ref.once('value', (snapshot) => {
        const data = snapshot.val();

        const stampCardsArray = data ? Object.keys(data).map(key => ({id: key, ...data[key]})) : [];

        res.json(stampCardsArray);
    });
}

const getStampCardById = async (req, res) => {
    const ref = db.ref(`/stampcards/${req.params.id}`);
    await ref.once('value', (snapshot) => {
        const data = snapshot.val();

        res.json(data);
    });
}

const postStampCard = async (req, res) => {
    const ref = db.ref('/stampcards');
    await ref.push(req.body);
    res.json({message: 'Stamp card added'});
}

const deleteStampCard = async (req, res) => {
    const ref = db.ref(`/stampcards/${req.params.id}`);
    await ref.remove();
    res.json({message: 'Stamp card deleted'});
}

module.exports = {getStampCards, getStampCardById, postStampCard, deleteStampCard};