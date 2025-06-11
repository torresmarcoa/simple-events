const commentService = require('../services/commentService');
const httpStatusCodes = require('../utils/httpStatusCodes');

async function getAllComments(req, res, next) {
  //#swagger.tags = ['Comments']
  try {
    const comments = await commentService.getAllComments();
    res.status(httpStatusCodes.OK).json({ status: true, data: comments });
  } catch (err) {
    next(err);
  }
}

async function getCommentById(req, res, next) {
  //#swagger.tags = ['Comments']
  try {
    const comment = await commentService.getCommentById(req.params.id);
    res.status(httpStatusCodes.OK).json({ status: true, data: comment });
  } catch (err) {
    next(err);
  }
}

async function createComment(req, res, next) {
  //#swagger.tags = ['Comments']
  try {
    const newComment = await commentService.createComment(req.body);
    res.status(httpStatusCodes.CREATED).json({ status: true, data: newComment });
  } catch (err) {
    next(err);
  }
}

async function updateComment(req, res, next) {
  //#swagger.tags = ['Comments']
  try {
    await commentService.updateComment(req.params.id, req.body);
    res.status(httpStatusCodes.NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
}

async function deleteComment(req, res, next) {
  //#swagger.tags = ['Comments']
  try {
    await commentService.deleteComment(req.params.id);
    res.status(httpStatusCodes.OK).json({ success: true, message: 'Comment deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
};
