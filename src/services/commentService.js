const Comment = require('../models/commentModel');
const createError = require('http-errors');
const mongoose = require('mongoose');
const httpStatusCodes = require('../utils/httpStatusCodes');

async function getAllComments() {
  try {
    return await Comment.find().populate('author', 'fname lname').populate('event', 'title');
  } catch (err) {
    throw createError(httpStatusCodes.INTERNAL_SERVER_ERROR, 'Error fetching comments');
  }
}

async function getCommentById(id) {
  try {
    const comment = await Comment.findById(id).populate('author').populate('event');
    if (!comment) throw createError(httpStatusCodes.NOT_FOUND, 'Comment not found');
    return comment;
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid comment ID');
    }
    throw err;
  }
}

async function createComment(data) {
  try {
    return await Comment.create(data);
  } catch (err) {
    throw err;
  }
}

async function updateComment(id, data) {
  try {
    const comment = await Comment.findByIdAndUpdate(id, data, { new: true });
    if (!comment) throw createError(httpStatusCodes.NOT_FOUND, 'Comment not found');
    return comment;
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid comment ID');
    }
    throw err;
  }
}

async function deleteComment(id) {
  try {
    const deleted = await Comment.findByIdAndDelete(id);
    if (!deleted) throw createError(httpStatusCodes.NOT_FOUND, 'Comment not found');
    return deleted;
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid comment ID');
    }
    throw err;
  }
}

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
};
