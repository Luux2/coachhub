const db = require('../config/firebase');

const getContacts = async (req, res) => {
    const ref = db.ref('/contacts');
    await ref.once('value', (snapshot) => {
        const data = snapshot.val();

        const contactsArray = data ? Object.keys(data).map(key => ({id: key, ...data[key]})) : [];

        res.json(contactsArray);
    });
}

const getContactById = async (req, res) => {
    const ref = db.ref('/contacts');
    await ref.once('value', (snapshot) => {
        const data = snapshot.val();

        const contact = data ? Object.keys(data).map(key => ({id: key, ...data[key]})).find(contact => contact.id === req.params.id) : null;

        res.json(contact);
    });
}

const getContactsByClientId = async (req, res) => {
    try {
        const ref = db.ref('/contacts');
        const snapshot = await ref.once('value');

        const data = snapshot.val();

        if (!data) return res.json([]);

        const clientId = req.params.clientId;

        const clientContacts = Object.entries(data)
            .filter(([_, contact]) => contact.clientId === clientId)
            .map(([id, contact]) => ({ id, ...contact }));

        return res.json(clientContacts);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const postContact = async (req, res) => {
    const ref = db.ref('/contacts');
    await ref.push(req.body);
    res.json({message: 'Contact added'});
}

const patchContact = async (req, res) => {
    const ref = db.ref(`/contacts/${req.params.id}`);
    await ref.update(req.body);
    res.json({message: 'Contact updated'});
}


module.exports = {getContacts, getContactById, getContactsByClientId, postContact, patchContact};