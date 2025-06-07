const userService = require('../services/userService');
const httpStatusCodes = require('../utils/httpStatusCodes');

async function getAllUsers(req, res, next) {
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
  const role = req.params.roleName; // Get role from URL parameter

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

async function deleteUser(req, res, next) {
  const id = req.params.id;

  try {
    await userService.deleteUser(id);
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
