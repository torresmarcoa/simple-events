const { body, validationResult } = require('express-validator');
const httpStatusCodes = require('../utils/httpStatusCodes');

const eventValidationRules = () => {
  return [
    body('name')
      .notEmpty()
      .withMessage('Event name is required')
      .isString()
      .withMessage('Event name must be a string')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Event name must be at least 3 characters long'),

    body('dateTime')
      .notEmpty()
      .withMessage('Date and time are required')
      .isISO8601()
      .withMessage('Invalid date format. Use ISO 8601 (e.g., 2025-07-01T18:30:00Z)'),

    body('address')
      .notEmpty()
      .withMessage('Address is required')
      .isString()
      .withMessage('Address must be a string')
      .trim(),

    body('organizer')
      .notEmpty()
      .withMessage('Organizer is required')
      .isString()
      .withMessage('Organizer must be a string')
      .trim(),

    body('capacity')
      .notEmpty()
      .withMessage('Capacity is required')
      .isInt({ min: 1 })
      .withMessage('Capacity must be a positive integer'),

    body('assistantsNumber')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Assistants number must be a non-negative integer'),

    body('performers').optional().isArray().withMessage('Performers must be an array of strings'),

    body('performers.*').optional().isString().withMessage('Each performer must be a string'),

    body('eventType')
      .notEmpty()
      .withMessage('Event type is required')
      .isString()
      .withMessage('Event type must be a string')
      .trim()
  ];
};

const validateEvent = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(httpStatusCodes.BAD_REQUEST).json({
    errors: extractedErrors
  });
};

module.exports = {
  eventValidationRules,
  validateEvent
};
