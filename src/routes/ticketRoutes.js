const router = require('express').Router();
const ticketController = require('../controllers/ticketController');
const { ticketValidationRules, validateTicket } = require('../middlewares/ticketValidator');
const { isAuthenticated } = require('../middlewares/authMiddleware');

/**
 * ============================================
 * 🔐 ROUTE PROTECTION NOTICE
 * ============================================
 * If you want to protect any route (e.g. limit to logged-in users),
 * make sure to add the `isAuthenticated` middleware like this:
 *
 *    router.get('/your-protected-route', isAuthenticated, yourControllerFunction);
 *
 * This ensures only authenticated users can access the route.
 *
 * You can find the `isAuthenticated` middleware in:
 *    middleware/authMiddleware.js  (or wherever it's defined)
 *
 * Don't forget to apply it consistently across routes that need protection!
 * ============================================
 */
router.post(
  '/',
  isAuthenticated,
  ticketValidationRules(),
  validateTicket,
  ticketController.createTicket
);

router.get('/', ticketController.getAllTickets);

router.get('/:id', ticketController.getTicketById);

router.put(
  '/:id',
  isAuthenticated,
  ticketValidationRules(),
  validateTicket,
  ticketController.updateTicket
);
router.put(
  '/:id',
  isAuthenticated,
  ticketValidationRules,
  validateTicket,
  ticketController.updateTicket
);

router.delete('/:id', isAuthenticated, ticketController.deleteTicket);

module.exports = router;
