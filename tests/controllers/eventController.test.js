const request = require('supertest');
const express = require('express');
const eventController = require('../../src/controllers/eventController');
const eventService = require('../../src/services/eventService');
const httpStatusCodes = require('../../src/utils/httpStatusCodes');

// Mock the eventService
jest.mock('../../src/services/eventService');

// Create test app for events
const eventApp = express();
eventApp.use(express.json());

eventApp.get('/events', eventController.getAllEvents);
eventApp.get('/events/:id', eventController.getEventById);

eventApp.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

describe('Event Controller - GET Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /events (getAllEvents)', () => {
    const mockEvents = [
      {
        _id: '507f1f77bcf86cd799439011',
        name: 'Music Festival',
        dateTime: '2025-07-01T20:00:00Z',
        address: '123 Main St',
        organizer: 'EventCo',
        capacity: 500,
        assistantsNumber: 150,
        performers: ['Band A', 'Artist B'],
        eventType: 'Concert'
      },
      {
        _id: '507f1f77bcf86cd799439012',
        name: 'Tech Conference',
        dateTime: '2025-08-15T09:00:00Z',
        address: '456 Tech Ave',
        organizer: 'TechOrg',
        capacity: 200,
        assistantsNumber: 180,
        performers: ['Speaker 1'],
        eventType: 'Conference'
      }
    ];

    it('should return all events successfully', async () => {
      // Arrange
      eventService.getAllEvents.mockResolvedValue(mockEvents);

      // Act
      const response = await request(eventApp)
        .get('/events')
        .expect(httpStatusCodes.OK);

      // Assert
      expect(response.body).toEqual({
        success: true,
        data: mockEvents
      });
      expect(eventService.getAllEvents).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no events exist', async () => {
      // Arrange
      eventService.getAllEvents.mockResolvedValue([]);

      // Act
      const response = await request(eventApp)
        .get('/events')
        .expect(httpStatusCodes.OK);

      // Assert
      expect(response.body).toEqual({
        success: true,
        data: []
      });
    });

    it('should handle service errors', async () => {
      // Arrange
      const errorMessage = 'Database connection failed';
      eventService.getAllEvents.mockRejectedValue(new Error(errorMessage));

      // Act
      const response = await request(eventApp)
        .get('/events')
        .expect(500);

      // Assert
      expect(response.body).toEqual({
        error: errorMessage
      });
    });
  });

  describe('GET /events/:id (getEventById)', () => {
    const mockEvent = {
      _id: '507f1f77bcf86cd799439011',
      name: 'Music Festival',
      dateTime: '2025-07-01T20:00:00Z',
      address: '123 Main St',
      organizer: 'EventCo',
      capacity: 500
    };

    it('should return event by ID successfully', async () => {
      // Arrange
      const eventId = '507f1f77bcf86cd799439011';
      eventService.getEventById.mockResolvedValue(mockEvent);

      // Act
      const response = await request(eventApp)
        .get(`/events/${eventId}`)
        .expect(httpStatusCodes.OK);

      // Assert
      expect(response.body).toEqual({
        success: true,
        data: mockEvent
      });
      expect(eventService.getEventById).toHaveBeenCalledWith(eventId);
    });

    it('should return 404 when event not found', async () => {
      // Arrange
      const eventId = '507f1f77bcf86cd799439999';
      eventService.getEventById.mockResolvedValue(null);

      // Act
      const response = await request(eventApp)
        .get(`/events/${eventId}`)
        .expect(httpStatusCodes.NOT_FOUND);

      // Assert
      expect(response.body).toEqual({
        success: false,
        message: 'Event not found'
      });
    });

    it('should handle service errors', async () => {
      // Arrange
      const eventId = '507f1f77bcf86cd799439011';
      const errorMessage = 'Database error';
      eventService.getEventById.mockRejectedValue(new Error(errorMessage));

      // Act
      const response = await request(eventApp)
        .get(`/events/${eventId}`)
        .expect(500);

      // Assert
      expect(response.body).toEqual({
        error: errorMessage
      });
    });
  });
});