const request = require('supertest');
const express = require('express');
const ticketController = require('../../src/controllers/ticketController');
const ticketService = require('../../src/services/ticketService');
const httpStatusCodes = require('../../src/utils/httpStatusCodes');

// Mock the ticketService
jest.mock('../../src/services/ticketService');

// Create test app for tickets
const ticketApp = express();
ticketApp.use(express.json());

ticketApp.get('/tickets', ticketController.getAllTickets);
ticketApp.get('/tickets/:id', ticketController.getTicketById);

ticketApp.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

describe('Ticket Controller - GET Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /tickets (getAllTickets)', () => {
    const mockTickets = [
      {
        _id: '507f1f77bcf86cd799439011',
        eventId: '507f1f77bcf86cd799439001',
        userId: '507f1f77bcf86cd799439002',
        seatNumber: 50,
        status: 'active',
        purchaseDate: '2025-06-01T10:00:00Z'
      },
      {
        _id: '507f1f77bcf86cd799439012',
        eventId: '507f1f77bcf86cd799439003',
        userId: '507f1f77bcf86cd799439004',
        seatNumber: 75,
        status: 'used',
        purchaseDate: '2025-06-02T15:30:00Z'
      }
    ];

    it('should return all tickets successfully', async () => {
      // Arrange
      ticketService.getAllTickets.mockResolvedValue(mockTickets);

      // Act
      const response = await request(ticketApp)
        .get('/tickets')
        .expect(httpStatusCodes.OK);

      // Assert
      expect(response.body).toEqual({
        status: true,
        data: mockTickets
      });
      expect(ticketService.getAllTickets).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no tickets exist', async () => {
      // Arrange
      ticketService.getAllTickets.mockResolvedValue([]);

      // Act
      const response = await request(ticketApp)
        .get('/tickets')
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
      ticketService.getAllTickets.mockRejectedValue(new Error(errorMessage));

      // Act
      const response = await request(ticketApp)
        .get('/tickets')
        .expect(500);

      // Assert
      expect(response.body).toEqual({
        error: errorMessage
      });
    });
  });

  describe('GET /tickets/:id (getTicketById)', () => {
    const mockTicket = {
      _id: '507f1f77bcf86cd799439011',
      eventId: '507f1f77bcf86cd799439001',
      userId: '507f1f77bcf86cd799439002',
      seatNumber: 50,
      status: 'active'
    };

    it('should return ticket by ID successfully', async () => {
      // Arrange
      const ticketId = '507f1f77bcf86cd799439011';
      ticketService.getTicketById.mockResolvedValue(mockTicket);

      // Act
      const response = await request(ticketApp)
        .get(`/tickets/${ticketId}`)
        .expect(httpStatusCodes.OK);

      // Assert
      expect(response.body).toEqual({
        status: true,
        data: mockTicket
      });
      expect(ticketService.getTicketById).toHaveBeenCalledWith(ticketId);
    });

    it('should handle service errors when ticket not found', async () => {
      // Arrange
      const ticketId = '507f1f77bcf86cd799439999';
      const errorMessage = 'Ticket not found';
      ticketService.getTicketById.mockRejectedValue(new Error(errorMessage));

      // Act
      const response = await request(ticketApp)
        .get(`/tickets/${ticketId}`)
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
      ticketService.getTicketById.mockRejectedValue(new Error(errorMessage));

      // Act
      const response = await request(ticketApp)
        .get(`/tickets/${invalidId}`)
        .expect(500);

      // Assert
      expect(ticketService.getTicketById).toHaveBeenCalledWith(invalidId);
    });
  });
});
