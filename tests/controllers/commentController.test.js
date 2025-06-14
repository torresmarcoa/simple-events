const request = require('supertest');
const express = require('express');
const commentController = require('../../src/controllers/commentController.js');
const commentService = require('../../src/services/commentService.js');
const httpStatusCodes = require('../../src/utils/httpStatusCodes');

// Mock the commentService
jest.mock('../../src/services/commentService.js');

// Create test app for comments
const commentApp = express();
commentApp.use(express.json());

commentApp.get('/comments', commentController.getAllComments);
commentApp.get('/comments/:id', commentController.getCommentById);

commentApp.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

describe('Comment Controller - GET Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /comments (getAllComments)', () => {
    const mockComments = [
      {
        _id: '507f1f77bcf86cd799439011',
        userId: '507f1f77bcf86cd799439001',
        eventId: '507f1f77bcf86cd799439002',
        content: 'Great event!',
        createdAt: '2025-06-01T10:00:00Z'
      },
      {
        _id: '507f1f77bcf86cd799439012',
        userId: '507f1f77bcf86cd799439003',
        eventId: '507f1f77bcf86cd799439004',
        content: 'Good organization',
        createdAt: '2025-06-02T14:30:00Z'
      }
    ];

    it('should return all comments successfully', async () => {
      // Arrange
      commentService.getAllComments.mockResolvedValue(mockComments);

      // Act
      const response = await request(commentApp)
        .get('/comments')
        .expect(httpStatusCodes.OK);

      // Assert
      expect(response.body).toEqual({
        status: true,
        data: mockComments
      });
      expect(commentService.getAllComments).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no comments exist', async () => {
      // Arrange
      commentService.getAllComments.mockResolvedValue([]);

      // Act
      const response = await request(commentApp)
        .get('/comments')
        .expect(httpStatusCodes.OK);

      // Assert
      expect(response.body).toEqual({
        status: true,
        data: []
      });
    });

    it('should handle service errors', async () => {
      // Arrange
      const errorMessage = 'Database connection failed';
      commentService.getAllComments.mockRejectedValue(new Error(errorMessage));

      // Act
      const response = await request(commentApp)
        .get('/comments')
        .expect(500);

      // Assert
      expect(response.body).toEqual({
        error: errorMessage
      });
    });
  });

  describe('GET /comments/:id (getCommentById)', () => {
    const mockComment = {
      _id: '507f1f77bcf86cd799439011',
      userId: '507f1f77bcf86cd799439001',
      eventId: '507f1f77bcf86cd799439002',
      content: 'Great event!',
      createdAt: '2025-06-01T10:00:00Z'
    };

    it('should return comment by ID successfully', async () => {
      // Arrange
      const commentId = '507f1f77bcf86cd799439011';
      commentService.getCommentById.mockResolvedValue(mockComment);

      // Act
      const response = await request(commentApp)
        .get(`/comments/${commentId}`)
        .expect(httpStatusCodes.OK);

      // Assert
      expect(response.body).toEqual({
        status: true,
        data: mockComment
      });
      expect(commentService.getCommentById).toHaveBeenCalledWith(commentId);
    });

    it('should handle service errors when comment not found', async () => {
      // Arrange
      const commentId = '507f1f77bcf86cd799439999';
      const errorMessage = 'Comment not found';
      commentService.getCommentById.mockRejectedValue(new Error(errorMessage));

      // Act
      const response = await request(commentApp)
        .get(`/comments/${commentId}`)
        .expect(500);

      // Assert
      expect(response.body).toEqual({
        error: errorMessage
      });
    });

    it('should handle invalid ID format', async () => {
      // Arrange
      const invalidId = 'invalid-id';
      const errorMessage = 'Invalid ID format';
      commentService.getCommentById.mockRejectedValue(new Error(errorMessage));

      // Act
      const response = await request(commentApp)
        .get(`/comments/${invalidId}`)
        .expect(500);

      // Assert
      expect(commentService.getCommentById).toHaveBeenCalledWith(invalidId);
    });
  });
});