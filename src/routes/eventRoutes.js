const router = require('express').Router();
const eventController = require('../controllers/eventController');

router.post('/', eventController.createEvent);

router.put('/:id', eventController.updateEvent);

module.exports = router;
