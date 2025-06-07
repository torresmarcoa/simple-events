const userService = require('../services/userService');
const httpStatusCodes = require('../utils/httpStatusCodes');

async function getAllUsers(req, res, next) {
  //#swagger.tags = ['User']
  //#swagger.summary = 'Get all users'
  try {
    const users = await userService.getAllUsers();
    res.status(httpStatusCodes.OK).json({
      status: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  //#swagger.tags = ['User']
  //#swagger.summary = 'Get a user by ID'
  const id = req.params.id;
  try {
    const user = await userService.getUserById(id);
    res.status(httpStatusCodes.OK).json({
      status: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
}

async function getUsersByRole(req, res, next) {
  //#swagger.tags = ['User']
  //#swagger.summary = 'Get users by role'
  if (!role) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({
      status: httpStatusCodes.BAD_REQUEST,
      message: 'Role parameter is required'
    });
  }

  try {
    const users = await userService.getUsersByRole(role);
    res.status(httpStatusCodes.OK).json({
      status: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  //#swagger.tags = ['User']
  //#swagger.summary = 'Create a new user'
  const user = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role
  };
  try {
    await userService.createUser(user);
    res.status(httpStatusCodes.CREATED).send();
  } catch (error) {
    next(error);
  }
}
async function updateUser(req, res, next) {
  //#swagger.tags = ['User']
  //#swagger.summary = 'Update a user'
  const id = req.params.id;

  const user = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role
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
  updateUser,
  getAllUsers,
  getUserById,
  getUsersByRole,
  deleteUser
};
