const eventService = require('../services/eventService');
const httpStatusCodes = require('../utils/httpStatusCodes')

async function createEvent(req, res, next) {
    const event = {
      name: req.body.name,
      dateTime: req.body.dateTime,
      address: req.body.address,
      organizer: req.body.organizer,
      capacity: req.body.capacity,
      assistantsNumber: req.body.assistantsNumber,
      performers:req.body.performers,
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
        performers:req.body.performers,
        eventType: req.body.eventType
      };
  
    try {
      await eventService.updateUser(id, event);
      res.status(httpStatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }

module.exports = {
    createEvent,
    updateEvent
}