const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');

// Client routes
router.get('/clients', clientController.getClients);
router.post('/clients', clientController.postClient);

module.exports = router;