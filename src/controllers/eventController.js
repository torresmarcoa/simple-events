const { default: mongoose } = require('mongoose');
const eventService = require('../services/eventService');
const httpStatusCodes = require('../utils/httpStatusCodes');

async function getAllEvents(req, res, next) {
  //#swagger.tags = ['Events']
  //#swagger.summary = 'Get all events'
  //#swagger.description = 'Retrieves a list of all events stored in the database.'
  try {
    const events = await eventService.getAllEvents();
    res.status(httpStatusCodes.OK).json({
      success: true,
      data: events
    });
  } catch (error) {
    next(error);
  }
}

async function getEventById(req, res, next) {
  //#swagger.tags = ['Events']
  //#swagger.summary = 'Get an event by ID'
  //#swagger.description = 'Retrieves the details of a specific event by its MongoDB ID.'
  const id = req.params.id;
  try {
    const event = await eventService.getEventById(id);
    if (!event) {
      return res.status(httpStatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.status(httpStatusCodes.OK).json({
      success: true,
      data: event
    });
  } catch (error) {
    next(error);
  }
}

async function createEvent(req, res, next) {
  //#swagger.tags = ['Events']
  //#swagger.summary = 'Create a new event'
  //#swagger.description = 'Creates a new event with the provided data.'
  const event = {
    name: req.body.name,
    dateTime: req.body.dateTime,
    address: req.body.address,
    organizer: req.body.organizer,
    capacity: req.body.capacity,
    assistantsNumber: req.body.assistantsNumber,
    performers: req.body.performers,
    eventType: req.body.eventType
  };
  try {
    const newEvent = await eventService.createEvent(event);
    res.status(httpStatusCodes.CREATED).json({ success: true, data: newEvent });
  } catch (error) {
    next(error);
  }
}

async function updateEvent(req, res, next) {
  //#swagger.tags = ['Events']
  //#swagger.summary = 'Update an existing event'
  //#swagger.description = 'Updates an event based on its ID.'
  const id = req.params.id;

  const event = {
    name: req.body.name,
    dateTime: req.body.dateTime,
    address: req.body.address,
    organizer: req.body.organizer,
    capacity: req.body.capacity,
    assistantsNumber: req.body.assistantsNumber,
    performers: req.body.performers,
    eventType: req.body.eventType
  };

  try {
    const updatedEvent = await eventService.updateEvent(id, event);
    res.status(httpStatusCodes.OK).json({ success: true, data: updatedEvent });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createEvent,
  updateEvent,
  getAllEvents,
  getEventById,
  deleteEvent
};
