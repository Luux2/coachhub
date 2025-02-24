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

const postStamps = async (req, res) => {
    const { id } = req.params; // Stamp card ID
    const { newStamp, currentStampCount } = req.body; // Modtager nye data fra frontend

    const ref = db.ref(`/stampcards/${id}`);

    try {
        const snapshot = await ref.once("value");
        const stampCard = snapshot.val();

        if (!stampCard) {
            return res.status(404).json({ error: "Stamp card not found" });
        }

        // Hent eksisterende stamps (hvis de findes, ellers tomt array)
        const existingStamps = stampCard.stamps || [];

        // Tilføj den nye registrering
        const updatedStamps = [...existingStamps, newStamp];

        // Opdater klippekortet
        await ref.update({
            stamps: updatedStamps,
            currentStampCount, // Opdater antallet af brugte klip
        });

        res.json({ message: "Stamps added", updatedStamps });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add stamps" });
    }
};


module.exports = {getStampCards, getStampCardById, postStampCard, deleteStampCard, postStamps};