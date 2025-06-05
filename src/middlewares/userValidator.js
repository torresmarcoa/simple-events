const { body, validationResult } = require('express-validator');
const httpStatusCodes = require('../utils/httpStatusCodes');

const userValidationRules = () => {
  return [
    body('fname')
      .notEmpty()
      .withMessage('First name cannot be empty')
      .isString()
      .withMessage('First name must be a string')
      .trim()
      .isLength({ min: 2 })
      .withMessage('First name must be at least 2 characters'),

    body('lname')
      .notEmpty()
      .withMessage('Last name cannot be empty')
      .isString()
      .withMessage('Last name must be a string')
      .trim()
      .isLength({ min: 2 })
      .withMessage('Last name must be at least 2 characters'),

    body('email')
      .notEmpty()
      .withMessage('Email cannot be empty')
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage('Invalid email format'),

    body('phone')
      .notEmpty()
      .withMessage('Phone number is required')
      .trim()
      .matches(/^\+?[0-9]{7,15}$/)
      .withMessage('Invalid phone number'),

    body('role')
      .notEmpty()
      .withMessage('role is required')
      .trim()
      .isIn(['organizer', 'attendee', 'staff'])
      .withMessage('role must be one of: organizer, attendee, staff')
  ];
};

const validateUser = (req, res, next) => {
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
  userValidationRules,
  validateUser
};
