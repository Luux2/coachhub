const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const clientController = require('../controllers/clientController');
const contactController = require('../controllers/contactController');
const stampCardController = require('../controllers/stampCardController');

// User routes
router.get('/users', userController.getUsers);

// Client routes
router.get('/clients', clientController.getClients);
router.get('/clients/:id', clientController.getClientById);
router.post('/clients', clientController.postClient);

// Contact routes
router.get('/contacts', contactController.getContacts);
router.post('/contacts', contactController.postContact);

// Stamp card routes
router.get('/stampcards', stampCardController.getStampCards);
router.get('/stampcards/:id', stampCardController.getStampCardById);
router.post('/stampcards', stampCardController.postStampCard);
router.delete('/stampcards/:id', stampCardController.deleteStampCard);
router.post('/stampcards/:id/stamps', stampCardController.postStamps);
router.patch('/stampcards/:id/stamps/:stampId', stampCardController.patchStamp);

module.exports = router;