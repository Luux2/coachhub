const db = require('../config/firebase');

const getContacts = async (req, res) => {
    const ref = db.ref('/contacts');
    await ref.once('value', (snapshot) => {
        const data = snapshot.val();

        const contactsArray = data ? Object.keys(data).map(key => ({id: key, ...data[key]})) : [];

        res.json(contactsArray);
    });
}

const postContact = async (req, res) => {
    const ref = db.ref('/contacts');
    await ref.push(req.body);
    res.json({message: 'Contact added'});
}

module.exports = {getContacts, postContact};