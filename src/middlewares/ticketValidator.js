const { body, validationResult } = require('express-validator');

const ticketValidationRules = () => {
  return [
    body('buyer').notEmpty().withMessage('Buyer ID is required'),
    body('event').notEmpty().withMessage('Event ID is required'),
    body('status')
      .optional()
      .isIn(['active', 'used', 'cancelled'])
      .withMessage('Status must be either "active", "used" or "cancelled"')
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
