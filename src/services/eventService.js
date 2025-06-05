const Event = require('../models/eventModel');
const createError = require('http-errors');
const mongoose = require('mongoose');
const httpStatusCodes = require('../utils/httpStatusCodes');

async function createEvent(data) {
  try {
    const existingEvent = await Event.findOne({
      dateTime: req.body.dateTime,
      address: req.body.address
    });

    if (existingEvent) {
      throw createError(httpStatusCodes.CONFLICT, 'Event already exists');
    }

    const result = await Event.create(data);
    return result;
  } catch (error) {
    throw error;
  }
}

async function updateEvent(id, data) {
  try {
    const event = await Event.findByIdAndUpdate(id, data, { new: true });

    if (!event) {
      throw createError(httpStatusCodes.NOT_FOUND, 'Event does not exist');
    }
    return event;
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid event ID');
      return;
    }
    throw error;
  }
}

module.exports = {
  createEvent,
  updateEvent
};
