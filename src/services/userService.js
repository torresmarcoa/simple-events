const User = require('../models/userModel')
const createError = require("http-errors");
const mongoose = require("mongoose");
const httpStatusCodes = require('../utils/httpStatusCodes')

async function createUser(data) {
  try {
    const existingUser = await User.findOne({
      email: data.email
    });

    if (existingUser) {
      throw createError(httpStatusCodes.CONFLICT, "User already exists");
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
        throw createError(httpStatusCodes.NOT_FOUND, "User does not exist");
      }
      return user;
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        throw createError(httpStatusCodes.BAD_REQUEST, "Invalid user ID");
        return;
      }
      throw error;
    }
  }

module.exports = {
    createUser,
    updateUser
}