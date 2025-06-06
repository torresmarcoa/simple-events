const router = require('express').Router();
const eventController = require('../controllers/eventController');
const { eventValidationRules, validateEvent } = require('../middlewares/eventValidator');

router.post('/', eventValidationRules(), validateEvent, eventController.createEvent);

router.put('/:id', eventValidationRules(), validateEvent, eventController.updateEvent);

router.get('/', eventController.getAllEvents);

router.get('/:id', eventController.getEventById);

module.exports = router;
