const commentService = require('../services/commentService');
const httpStatusCodes = require('../utils/httpStatusCodes');

async function getAllComments(req, res, next) {
  //#swagger.tags = ['Comments']
  /* #swagger.summary = 'Get all comments' */
  /* #swagger.description = 'Retrieves all comments from the database.' */
  /* #swagger.responses[200] = { description: 'Comments retrieved successfully' } */
  /* #swagger.responses[500] = { description: 'Server error' } */
  try {
    const comments = await commentService.getAllComments();
    res.status(httpStatusCodes.OK).json({ status: true, data: comments });
  } catch (err) {
    next(err);
  }
}

async function getCommentById(req, res, next) {
  //#swagger.tags = ['Comments']
  /* #swagger.summary = 'Get a comment by ID' */
  /* #swagger.description = 'Retrieves a comment using its MongoDB ID.' */
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the comment',
        required: true,
        type: 'string'
  } */
  /* #swagger.responses[200] = { description: 'Comment retrieved successfully' } */
  /* #swagger.responses[404] = { description: 'Comment not found' } */
  /* #swagger.responses[500] = { description: 'Server error' } */
  try {
    const comment = await commentService.getCommentById(req.params.id);
    res.status(httpStatusCodes.OK).json({ status: true, data: comment });
  } catch (err) {
    next(err);
  }
}

async function createComment(req, res, next) {
  //#swagger.tags = ['Comments']
  /* #swagger.summary = 'Create a new comment' */
  /* #swagger.description = 'Creates a new comment linked to an event and author.' */
  /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          event: '60f1a0f1f1a0f1a0f1a0f1a0',
          author: '60f1a0f1f1a0f1a0f1a0f1a1',
          content: 'This is an awesome event!'
        }
  } */
  /* #swagger.responses[201] = { description: 'Comment created successfully' } */
  /* #swagger.responses[400] = { description: 'Invalid input data' } */
  /* #swagger.responses[500] = { description: 'Server error' } */
  try {
    const newComment = await commentService.createComment(req.body);
    res.status(httpStatusCodes.CREATED).json({ status: true, data: newComment });
  } catch (err) {
    next(err);
  }
}

async function updateComment(req, res, next) {
  //#swagger.tags = ['Comments']
  /* #swagger.summary = 'Update a comment' */
  /* #swagger.description = 'Updates the content of an existing comment by ID.' */
  /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'ID of the comment',
        type: 'string'
  } */
  /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          content: 'Updated comment content'
        }
  } */
  /* #swagger.responses[204] = { description: 'Comment updated successfully' } */
  /* #swagger.responses[400] = { description: 'Invalid input data' } */
  /* #swagger.responses[404] = { description: 'Comment not found' } */
  /* #swagger.responses[500] = { description: 'Server error' } */
  try {
    // Validate input
    if (!req.body || !req.body.content) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({ success: false, message: 'Content is required.' });
    }

    const updatedComment = await commentService.updateComment(req.params.id, req.body);

    if (!updatedComment) {
      return res.status(httpStatusCodes.NOT_FOUND).json({ success: false, message: 'Comment not found.' });
    }

    // No content to return, just status
    res.status(httpStatusCodes.NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
}

async function deleteComment(req, res, next) {
  //#swagger.tags = ['Comments']
  /* #swagger.summary = 'Delete a comment' */
  /* #swagger.description = 'Deletes a comment by its ID.' */
  /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'ID of the comment to delete',
        type: 'string'
  } */
  /* #swagger.responses[200] = { description: 'Comment deleted successfully' } */
  /* #swagger.responses[404] = { description: 'Comment not found' } */
  /* #swagger.responses[500] = { description: 'Server error' } */ try {
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
