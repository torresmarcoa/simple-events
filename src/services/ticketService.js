const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');
const Event = require('../models/eventModel');
const createError = require('http-errors');
const mongoose = require('mongoose');
const httpStatusCodes = require('../utils/httpStatusCodes');

async function getAllTickets() {
  try {
    const tickets = await Ticket.find().sort({ buyer: 1 });
    return tickets;
  } catch (err) {
    throw createError(httpStatusCodes.INTERNAL_SERVER_ERROR, 'Error fetching tickets');
  }
}

async function getTicketById(id) {
  try {
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw createError(httpStatusCodes.NOT_FOUND, 'Ticket does not exist');
    }
    return ticket;
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid ticket ID');
    }
    throw error;
  }
}

async function createTicket(data) {
  try {
    if (!mongoose.Types.ObjectId.isValid(data.buyer)) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid buyer ID');
    }

    const buyerExists = await User.findById(data.buyer);
    if (!buyerExists) {
      throw createError(httpStatusCodes.NOT_FOUND, 'Buyer not found');
    }

    if (!mongoose.Types.ObjectId.isValid(data.event)) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid event ID');
    }

    const eventExists = await Event.findById(data.event);
    if (!eventExists) {
      throw createError(httpStatusCodes.NOT_FOUND, 'Event not found');
    }

    return await Ticket.create(data);
  } catch (err) {
    throw err;
  }
}

async function updateTicket(id, data) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid ticket ID');
    }

    if (data.buyer) {
      if (!mongoose.Types.ObjectId.isValid(data.buyer)) {
        throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid buyer ID');
      }

      const buyerExists = await User.findById(data.buyer);
      if (!buyerExists) {
        throw createError(httpStatusCodes.NOT_FOUND, 'Buyer not found');
      }
    }

    if (data.event) {
      if (!mongoose.Types.ObjectId.isValid(data.event)) {
        throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid event ID');
      }

      const eventExists = await Event.findById(data.event);
      if (!eventExists) {
        throw createError(httpStatusCodes.NOT_FOUND, 'Event not found');
      }
    }

    const ticket = await Ticket.findByIdAndUpdate(id, data, { new: true });
    if (!ticket) throw createError(httpStatusCodes.NOT_FOUND, 'Ticket not found');
    return ticket;
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid ticket ID');
    }
    throw err;
  }
}

async function deleteTicket(id) {
  try {
    const deleted = await Ticket.findByIdAndDelete(id);
    if (!deleted) throw createError(httpStatusCodes.NOT_FOUND, 'Ticket not found');
    return deleted;
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      throw createError(httpStatusCodes.BAD_REQUEST, 'Invalid ticket ID');
    }
    throw err;
  }
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
};
