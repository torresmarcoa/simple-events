const Event = require('../models/eventModel');
const createError = require('http-errors');
const mongoose = require('mongoose');
const httpStatusCodes = require('../utils/httpStatusCodes');

async function getAllEvents() {
  try {
    const events = await Event.find().sort({ dateTime: 1 }); // Sort by event date ascending
    return events;
  } catch (error) {
    throw createError(httpStatusCodes.INTERNAL_SERVER_ERROR, 'Error fetching events');
  }
}

async function getEventById(id) {
  try {
    const event = await Event.findById(id);

    if (!event) {
      throw createError(httpStatusCodes.NOT_FOUND, 'Event does not exist');
    }

    return event;
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid event ID');
    }
    throw createError(httpStatusCodes.INTERNAL_SERVER_ERROR, 'Error fetching event');
  }
}

async function createEvent(data) {
  try {
    const existingEvent = await Event.findOne({
      dateTime: data.dateTime,
      address: data.address
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

async function deleteEvent(id) {
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      throw createError(httpStatusCodes.NOT_FOUND, 'Event does not exist');
    }
    return deletedEvent;
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid Event ID');
      return;
    }
    throw error;
  }
}

module.exports = {
  createEvent,
  updateEvent,
  getAllEvents,
  getEventById,
  deleteEvent
};
