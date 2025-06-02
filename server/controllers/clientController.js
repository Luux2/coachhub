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

const deleteClient = async (req, res) => {
    const ref = db.ref(`/clients/${req.params.id}`);
    await ref.remove();
    res.json({message: 'Client deleted'});
}


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

const postNote = async (req, res) => {
    const { id } = req.params;
    const ref = db.ref(`/clients/${id}/notes`);
    const newNoteRef = ref.push();
    await newNoteRef.set(req.body);
    res.json({ message: "Note added", noteId: newNoteRef.key });
};

const patchNote = async (req, res) => {
    const { id, noteId } = req.params;
    const ref = db.ref(`/clients/${id}/notes/${noteId}`);

    try {
        await ref.update(req.body);
        res.json({ message: "Note updated" });
    } catch (error) {
        res.status(500).json({ message: "Fejl under opdatering", error });
    }
};

const deleteNote = async (req, res) => {
    const { id, noteId } = req.params;
    const ref = db.ref(`/clients/${id}/notes/${noteId}`);

    await ref.remove();
    res.json({message: 'Note deleted'});
}




module.exports = {getClients, getClientById, deleteClient, postClient, patchClient, postNote, patchNote, deleteNote};