const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const clientController = require('../controllers/clientController');

// User routes
router.get('/users', userController.getUsers);

// Client routes
router.get('/clients', clientController.getClients);
router.get('/clients/:id', clientController.getClientById);
router.post('/clients', clientController.postClient);
router.get('/clients/:id/stampCards', clientController.getStampCards);
router.get('/clients/:id/stampCards/:stampCardId', clientController.getStampCardById);
router.post('/clients/:id/stampCards', clientController.postStampCard);
router.patch('/clients/:id/stampCards/:stampCardId', clientController.patchStampCard);
router.delete('/clients/:id/stampCards/:stampCardId', clientController.deleteStampCard);

module.exports = router;