const userService = require('../services/userService');
const httpStatusCodes = require('../utils/httpStatusCodes');

async function getAllUsers(req, res, next) {
  //#swagger.tags = ['User']
  /* #swagger.summary = 'Get all users' */
  /* #swagger.description = 'Retrieves a list of all users stored in the database.' */
  /* #swagger.responses[200] = { description: 'List of users retrieved successfully' } */
  /* #swagger.responses[500] = { description: 'Server error while retrieving users' } */
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
  /* #swagger.summary = 'Get a user by ID' */
  /* #swagger.description = 'Retrieves a user using their MongoDB ID.' */
  /* #swagger.parameters['id'] = {
          in: 'path',
          description: 'User ID',
          required: true,
          type: 'string'
    } */
  /* #swagger.responses[200] = { description: 'User retrieved successfully' } */
  /* #swagger.responses[404] = { description: 'User not found' } */
  /* #swagger.responses[500] = { description: 'Server error while retrieving user' } */
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
  /* #swagger.summary = 'Get users by role' */
  /* #swagger.description = 'Retrieves a list of users that match the specified role.' */
  /* #swagger.parameters['roleName'] = {
          in: 'path',
          description: 'User role',
          required: true,
          type: 'string'
    } */
  /* #swagger.responses[200] = { description: 'Users retrieved by role' } */
  /* #swagger.responses[400] = {  description: 'Missing role parameter' } */
  /* #swagger.responses[500] = { description: 'Server error while retrieving users by role' } */
  const role = req.params.roleName;
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
  /* #swagger.summary = 'Create a new user' */
  /* #swagger.description = 'Creates a new user with the provided information.' */
  /* #swagger.parameters['body'] = {
            in: 'body',
            description: 'User data to create',
            required: true,
            schema: {
              fname: 'Marco',
              lname: 'Torres',
              email: 'marco@example.com',
              phone: '5551234567',
              role: 'attendee'
            }
    } */
  /* #swagger.responses[201] = {  description: 'User created successfully' } */
  /* #swagger.responses[400] = { description: 'Invalid user data' } */
  /* #swagger.responses[409] = { description: 'User already exists' } */
  /* #swagger.responses[500] = { description: 'Server error while creating user' } */
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
  /* #swagger.summary = 'Update a user' */
  /* #swagger.description = 'Updates a user\'s data based on their ID.' */
  /* #swagger.parameters['id'] = {
          in: 'path',
          description: 'User ID',
          required: true,
          type: 'string'
    } */
  /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'Updated user information',
          required: true,
          schema: {
            fname: 'Marco',
            lname: 'Torres Aceves',
            email: 'marco.updated@example.com',
            phone: '5557654321',
            role: 'organizer'
          }
    } */
  /* #swagger.responses[204] = { description: 'User updated successfully (no content returned)' } */
  /* #swagger.responses[400] = { description: 'Invalid update data' } */
  /* #swagger.responses[500] = { description: 'Server error while updating user' } */
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
  //#swagger.tags = ['User']
  /* #swagger.summary = 'Delete a user' */
  /* #swagger.description = 'Deletes a specific user by ID.' */
  /* #swagger.parameters['id'] = {
          in: 'path',
          description: 'User ID to delete',
          required: true,
          type: 'string'
    } */
  /* #swagger.responses[200] = { description: 'User deleted successfully' } */
  /* #swagger.responses[404] = { description: 'User not found' } */
  /* #swagger.responses[500] = { description: 'Server error while deleting user' } */
  const id = req.params.id;
  try {
    const deleted = await userService.deleteUser(id);
    if (!deleted) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ success: false, message: 'User not found' });
    }

    res.status(httpStatusCodes.OK).json({ success: true, message: 'User deleted successfully' });
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
