const User = require('../models/userModel');
const createError = require('http-errors');
const mongoose = require('mongoose');
const httpStatusCodes = require('../utils/httpStatusCodes');

async function getAllUsers() {
  try {
    const users = await User.find().sort({ fname: 1 }); // Sort by first name ascending
    return users;
  } catch (error) {
    throw createError(httpStatusCodes.INTERNAL_SERVER_ERROR, 'Error fetching users');
  }
}

async function getUserById(id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw createError(httpStatusCodes.NOT_FOUND, 'User does not exist');
    }
    return user;
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid user ID');
    }
    throw error;
  }
}

async function getUsersByRole(role) {
  try {
    const users = await User.find({ role: role }).sort({ fname: 1 }); // Sort by first name ascending

    return users;
  } catch (error) {
    throw createError(httpStatusCodes.INTERNAL_SERVER_ERROR, 'Error fetching users by role');
  }
}

async function createUser(data) {
  try {
    const existingUser = await User.findOne({
      email: data.email
    });

    if (existingUser) {
      throw createError(httpStatusCodes.CONFLICT, 'User already exists');
    }

    const result = await User.create(data);
    return result;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, data) {
  try {
    const user = await User.findByIdAndUpdate(id, data, { new: true });

    if (!user) {
      throw createError(httpStatusCodes.NOT_FOUND, 'User does not exist');
    }
    return user;
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid user ID');
    }
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      throw createError(httpStatusCodes.NOT_FOUND, 'User does not exist');
    }
    return deletedUser;
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid User ID');
      return;
    }
    throw error;
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
