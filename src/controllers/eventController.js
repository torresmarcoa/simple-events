const eventService = require('../services/eventService');
const httpStatusCodes = require('../utils/httpStatusCodes');

async function getAllEvents(req, res, next) {
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
    await eventService.createEvent(event);
    res.status(httpStatusCodes.CREATED).send();
  } catch (error) {
    next(error);
  }
}

async function updateEvent(req, res, next) {
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
    await eventService.updateEvent(id, event);
    res.status(httpStatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
}

async function deleteEvent(req, res, next) {
  const id = req.params.id;

  try {
    await eventService.deleteEvent(id);
    res.status(httpStatusCodes.NO_CONTENT).send();
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
