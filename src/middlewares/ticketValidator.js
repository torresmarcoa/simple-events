const { body, validationResult } = require('express-validator');

const ticketValidationRules = () => {
  return [
    body('user').notEmpty().withMessage('User ID is required'),
    body('event').notEmpty().withMessage('Event ID is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
    body('status')
      .optional()
      .isIn(['booked', 'cancelled'])
      .withMessage('Status must be either "booked" or "cancelled"')
  ];
};

function validateTicket(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = {
  ticketValidationRules,
  validateTicket
};
