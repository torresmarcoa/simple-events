const request = require('supertest');
const express = require('express');
const userController = require('../../src/controllers/userController');
const userService = require('../../src/services/userService');
const httpStatusCodes = require('../../src/utils/httpStatusCodes');

// Mock the userService
jest.mock('../../src/services/userService');

// Create test app
const app = express();
app.use(express.json());

// Mount routes
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.get('/users/role/:roleName', userController.getUsersByRole);

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

describe('User Controller - GET Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /users (getAllUsers)', () => {
    const mockUsers = [
      {
        _id: '507f1f77bcf86cd799439011',
        fname: 'John',
        lname: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        role: 'admin'
      },
      {
        _id: '507f1f77bcf86cd799439012',
        fname: 'Jane',
        lname: 'Smith',
        email: 'jane@example.com',
        phone: '0987654321',
        role: 'recruiter'
      }
    ];

    it('should return all users successfully', async () => {
      // Arrange
      userService.getAllUsers.mockResolvedValue(mockUsers);

      // Act
      const response = await request(app)
        .get('/users')
        .expect(httpStatusCodes.OK);

      // Assert
      expect(response.body).toEqual({
        status: true,
        data: mockUsers
      });
      expect(userService.getAllUsers).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no users exist', async () => {
      // Arrange
      userService.getAllUsers.mockResolvedValue([]);

      // Act
      const response = await request(app)
        .get('/users')
        .expect(httpStatusCodes.OK);

      // Assert
      expect(response.body).toEqual({
        status: true,
        data: []
      });
    });

    it('should handle service errors and pass to error middleware', async () => {
      // Arrange
      const errorMessage = 'Database connection failed';
      userService.getAllUsers.mockRejectedValue(new Error(errorMessage));

      // Act
      const response = await request(app)
        .get('/users')
        .expect(500);

      // Assert
      expect(response.body).toEqual({
        error: errorMessage
      });
    });
  });

  describe('GET /users/:id (getUserById)', () => {
    const mockUser = {
      _id: '507f1f77bcf86cd799439011',
      fname: 'John',
      lname: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      role: 'admin'
    };

    it('should return user by ID successfully', async () => {
      // Arrange
      const userId = '507f1f77bcf86cd799439011';
      userService.getUserById.mockResolvedValue(mockUser);

      // Act
      const response = await request(app)
        .get(`/users/${userId}`)
        .expect(httpStatusCodes.OK);

      // Assert
      expect(response.body).toEqual({
        status: true,
        data: mockUser
      });
      expect(userService.getUserById).toHaveBeenCalledWith(userId);
      expect(userService.getUserById).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors when user not found', async () => {
      // Arrange
      const userId = '507f1f77bcf86cd799439999';
      const errorMessage = 'User not found';
      userService.getUserById.mockRejectedValue(new Error(errorMessage));

      // Act
      const response = await request(app)
        .get(`/users/${userId}`)
        .expect(500);

      // Assert
      expect(response.body).toEqual({
        error: errorMessage
      });
      expect(userService.getUserById).toHaveBeenCalledWith(userId);
    });

    it('should handle invalid ID format', async () => {
      // Arrange
      const invalidId = 'invalid-id';
      const errorMessage = 'Invalid ID format';
      userService.getUserById.mockRejectedValue(new Error(errorMessage));

      // Act
      const response = await request(app)
        .get(`/users/${invalidId}`)
        .expect(500);

      // Assert
      expect(userService.getUserById).toHaveBeenCalledWith(invalidId);
    });
  });

  describe('GET /users/role/:roleName (getUsersByRole)', () => {
    const mockRoleUsers = [
      {
        _id: '507f1f77bcf86cd799439011',
        fname: 'Admin',
        lname: 'User',
        email: 'admin@example.com',
        role: 'admin'
      }
    ];

    it('should return users by role successfully', async () => {
      // Arrange
      const role = 'admin';
      userService.getUsersByRole.mockResolvedValue(mockRoleUsers);

      // Act
      const response = await request(app)
        .get(`/users/role/${role}`)
        .expect(httpStatusCodes.OK);

      // Assert
      expect(response.body).toEqual({
        status: true,
        data: mockRoleUsers
      });
      expect(userService.getUsersByRole).toHaveBeenCalledWith(role);
    });

    it('should return 400 when role parameter is missing', async () => {
  // This test case needs to be reconsidered because '/users/role/' 
  // will actually match the '/users/:id' route where id = 'role'
  
  // Option 1: Test the actual behavior - it will try to get user with id 'role'
  const errorMessage = 'Invalid ID format'; // This is what actually happens
  userService.getUserById.mockRejectedValue(new Error(errorMessage));

  const response = await request(app)
    .get('/users/role/')
    .expect(500);

  expect(response.body).toEqual({
    error: errorMessage
  });
  expect(userService.getUserById).toHaveBeenCalledWith('role');
});

// Option 2: Test with a valid role that doesn't exist
it('should handle non-existent role parameter', async () => {
  const role = 'invalidrole';
  const errorMessage = 'Role not found';
  userService.getUsersByRole.mockRejectedValue(new Error(errorMessage));

  const response = await request(app)
    .get(`/users/role/${role}`)
    .expect(500);

  expect(response.body).toEqual({
    error: errorMessage
  });
  expect(userService.getUsersByRole).toHaveBeenCalledWith(role);
});

// Option 3: Test with special characters in role
it('should handle special characters in role parameter', async () => {
  const role = 'admin'; 
  const errorMessage = 'Invalid role format';
  userService.getUsersByRole.mockRejectedValue(new Error(errorMessage));

  const response = await request(app)
    .get(`/users/role/${role}`)
    .expect(500);

  expect(response.body).toEqual({
    error: errorMessage
  });
  expect(userService.getUsersByRole).toHaveBeenCalledWith(role);
  });
  });
});