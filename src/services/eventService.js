const Event = require('../models/eventModel');
const User = require('../models/userModel');
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
    if (!mongoose.Types.ObjectId.isValid(data.organizer)) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid organizer ID');
    }

    const organizerExists = await User.findById(data.organizer);
    if (!organizerExists) {
      throw createError(httpStatusCodes.NOT_FOUND, 'Organizer not found');
    }

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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid event ID');
    }

    if (data.organizer) {
      if (!mongoose.Types.ObjectId.isValid(data.organizer)) {
        throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid organizer ID');
      }
    }

    const organizerExists = await User.findById(data.organizer);
    if (!organizerExists) {
      throw createError(httpStatusCodes.NOT_FOUND, 'Organizer not found');
    }

    const event = await Event.findByIdAndUpdate(id, data, { new: true });

    if (!event) {
      throw createError(httpStatusCodes.NOT_FOUND, 'Event does not exist');
    }
    return event;
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid event ID');
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
