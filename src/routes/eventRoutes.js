const router = require('express').Router();
const eventController = require('../controllers/eventController');
const { eventValidationRules, validateEvent } = require('../middlewares/eventValidator');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.post('/', isAuthenticated, eventValidationRules(), validateEvent, eventController.createEvent);

router.put('/:id', eventValidationRules(), validateEvent, eventController.updateEvent);

router.get('/', eventController.getAllEvents);

router.get('/:id', eventController.getEventById);

router.delete('/:id', eventController.deleteEvent);

module.exports = router;
