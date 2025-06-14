const { body, validationResult } = require('express-validator');

const commentValidationRules = () => {
  return [
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('author').notEmpty().withMessage('Author ID is required'),
    body('event').notEmpty().withMessage('Event ID is required')
  ];
};

function validateComment(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = {
  commentValidationRules,
  validateComment
};
