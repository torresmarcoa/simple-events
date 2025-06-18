const Comment = require('../models/commentModel');
const User = require('../models/userModel');
const Event = require('../models/eventModel');
const createError = require('http-errors');
const mongoose = require('mongoose');
const httpStatusCodes = require('../utils/httpStatusCodes');

async function getAllComments() {
  try {
    const comments = await Comment.find()
      .populate('author', 'fname lname')
      .populate('event', 'title')
      .sort({ createdAt: -1 });
    return comments;
  } catch (err) {
    throw createError(httpStatusCodes.INTERNAL_SERVER_ERROR, 'Error fetching comments');
  }
}

async function getCommentById(id) {
  try {
    const comment = await Comment.findById(id)
      .populate('author', 'fname lname')
      .populate('event', 'title');

    if (!comment) {
      throw createError(httpStatusCodes.NOT_FOUND, 'Comment not found');
    }
    return comment;
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid comment ID');
    }
    throw error;
  }
}

async function createComment(data) {
  try {
    if (!mongoose.Types.ObjectId.isValid(data.author)) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid author ID');
    }

    const authorExists = await User.findById(data.author);
    if (!authorExists) {
      throw createError(httpStatusCodes.NOT_FOUND, 'Author not found');
    }

    if (!mongoose.Types.ObjectId.isValid(data.event)) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid event ID');
    }

    const eventExists = await Event.findById(data.event);
    if (!eventExists) {
      throw createError(httpStatusCodes.NOT_FOUND, 'Event not found');
    }

    return await Comment.create(data);
  } catch (err) {
    throw err;
  }
}

async function updateComment(id, data) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid ticket ID');
    }

    if (data.author) {
      if (!mongoose.Types.ObjectId.isValid(data.author)) {
        throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid author ID');
      }

      const authorExists = await User.findById(data.author);
      if (!authorExists) {
        throw createError(httpStatusCodes.NOT_FOUND, 'Author not found');
      }
    }

    if (data.event) {
      if (!mongoose.Types.ObjectId.isValid(data.event)) {
        throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid event ID');
      }

      const eventExists = await Event.findById(data.event);
      if (!eventExists) {
        throw createError(httpStatusCodes.NOT_FOUND, 'Event not found');
      }
    }
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
