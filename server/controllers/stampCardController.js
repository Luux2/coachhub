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

const getStampCardsByClientId = async (req, res) => {
    try {
        const ref = db.ref('/stampcards');
        const snapshot = await ref.once('value');

        const data = snapshot.val();

        if (!data) return res.json([]);

        const clientId = req.params.clientId;

        const clientStampCards = Object.entries(data)
            .filter(([_, stampCard]) => stampCard.clientId === clientId)
            .map(([id, stampCard]) => ({ id, ...stampCard }));

        return res.json(clientStampCards);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


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

    const ref = db.ref(`/stampcards/${id}/stamps`); // Peg direkte på stamps

    try {
        const newStampRef = ref.push();

        const stampWithId = { ...newStamp };

        // 🚀 Gem det nye stamp med autogeneret ID
        await newStampRef.set(stampWithId);

        // 🚀 Opdater `currentStampCount`
        await db.ref(`/stampcards/${id}`).update({
            currentStampCount
        });

        res.json({ message: "Stamp added", newStamp: stampWithId });
    } catch (error) {
        console.error("🔥 Error adding stamp:", error);
        res.status(500).json({ error: "Failed to add stamp" });
    }
};



const patchStamp = async (req, res) => {
    const { id, stampId } = req.params;
    const { newStamp, currentStampCount } = req.body;

    const ref = db.ref(`/stampcards/${id}`);

    try {
        const snapshot = await ref.once("value");
        const stampCard = snapshot.val();

        if (!stampCard) {
            console.error("🚨 Error: Stamp card not found!");
            return res.status(404).json({ error: "Stamp card not found" });
        }

        const existingStamps = stampCard.stamps || {};
        console.log("🔹 Existing stamps:", existingStamps);

        if (!existingStamps[stampId]) {
            console.error("🚨 Error: Stamp not found!");
            return res.status(404).json({ error: `Stamp not found: ${stampId}` });
        }

        // Opdater `stamps`
        existingStamps[stampId] = { ...newStamp };

        // Opdater Firebase
        await ref.update({
            stamps: existingStamps,
            currentStampCount,
        });

        console.log("✅ Successfully updated stampCard!");
        res.json({ message: "Stamp updated", updatedStamps: existingStamps, currentStampCount });

    } catch (error) {
        console.error("🔥 Error updating stamp:", error);
        res.status(500).json({ error: "Failed to update stamp" });
    }
};







module.exports = {getStampCards, getStampCardById, getStampCardsByClientId, postStampCard, deleteStampCard, postStamps, patchStamp};