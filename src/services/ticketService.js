const Ticket = require('../models/ticketModel');
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
    return await Ticket.create(data);
  } catch (err) {
    throw err;
  }
}

async function updateTicket(id, data) {
  try {
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
