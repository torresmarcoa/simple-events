const { default: mongoose } = require('mongoose');
const eventService = require('../services/eventService');
const httpStatusCodes = require('../utils/httpStatusCodes');

async function getAllEvents(req, res, next) {
  //#swagger.tags = ['Events']
  /* #swagger.summary = 'Get all events' */
  /* #swagger.description = 'Retrieves a list of all events stored in the database.' */
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
  /* #swagger.summary = 'Get an event by ID' */
  /* #swagger.description = 'Retrieves the details of a specific event by its MongoDB ID.' */
  /* #swagger.parameters['id'] = {
          in: 'path',
          description: 'MongoDB ObjectId of the event',
          required: true,
          type: 'string'
    } */
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
  /* #swagger.summary = 'Create a new event' */
  /* #swagger.description = 'Creates a new event with the provided data.' */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'New event data',
        required: true,
        schema: {
          name: 'Music Festival',
          dateTime: '2025-07-01T20:00:00Z',
          address: '123 Main St, Cityville',
          organizer: 'EventCo',
          capacity: 500,
          assistantsNumber: 150,
          performers: ['Band A', 'Artist B'],
          eventType: 'Concert'
        }
  } */
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
  /* #swagger.summary = 'Update an existing event' */
  /* #swagger.description = 'Updates an event based on its ID.' */
  /* #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID of the event to update',
          required: true,
          type: 'string'
    } */
  /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'Updated event data',
          required: true,
          schema: {
            name: 'Updated Event Name',
            dateTime: '2025-08-15T18:30:00Z',
            address: '456 Updated Ave',
            organizer: 'Updated Organizer',
            capacity: 300,
            assistantsNumber: 200,
            performers: ['Performer X'],
            eventType: 'Seminar'
          }
    } */
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

async function deleteEvent(req, res, next) {
  //#swagger.tags = ['Events']
  /* #swagger.summary = 'Delete an event' */
  /* #swagger.description = 'Deletes a specific event by ID.' */
  /* #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID of the event to delete',
          required: true,
          type: 'string'
    } */
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ success: false, message: 'Invalid ID' });
  }

  try {
    const deleted = await eventService.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ success: false, message: 'Event not found' });
    }

    res.status(httpStatusCodes.OK).json({ success: true, message: 'Event deleted successfully' });
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
