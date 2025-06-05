const userService = require('../services/userService');
const httpStatusCodes = require('../utils/httpStatusCodes')

async function createUser(req, res, next) {
    const user = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
    };
    try {
      await userService.createUser(user);
      res.status(httpStatusCodes.CREATED).send();
    } catch (error) {
      next(error);
    }
  }
async function updateUser(req, res, next) {
  const id = req.params.id;

  const user = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role,
  };

  try {
    await userService.updateUser(id, user);
    res.status(httpStatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
    createUser, 
    updateUser
}