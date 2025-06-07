const router = require('express').Router();
const ticketController = require('../controllers/ticketController');
const { ticketValidationRules, validateTicket } = require('../middlewares/ticketValidator');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/', ticketController.getAllTickets);
router.get('/:id', ticketController.getTicketById);
router.post('/', isAuthenticated, ticketValidationRules, validateTicket, ticketController.createTicket);
router.put('/:id', isAuthenticated, ticketValidationRules, validateTicket, ticketController.updateTicket);
router.delete('/:id', isAuthenticated, ticketController.deleteTicket);

module.exports = router;
