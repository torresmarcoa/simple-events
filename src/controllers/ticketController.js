const ticketService = require('../services/ticketService');
const httpStatusCodes = require('../utils/httpStatusCodes');

async function getAllTickets(req, res, next) {
  //#swagger.tags = ['Tickets']
  try {
    const tickets = await ticketService.getAllTickets();
    res.status(httpStatusCodes.OK).json({ status: true, data: tickets });
  } catch (err) {
    next(err);
  }
}

async function getTicketById(req, res, next) {
  //#swagger.tags = ['Tickets']
  try {
    const ticket = await ticketService.getTicketById(req.params.id);
    res.status(httpStatusCodes.OK).json({ status: true, data: ticket });
  } catch (err) {
    next(err);
  }
}

async function createTicket(req, res, next) {
  //#swagger.tags = ['Tickets']
  const ticket = {
    event: req.body.event,
    buyer: req.body.buyer,
    purchaseDate: req.body.purchaseDate,
    seatNumber: req.body.seatNumber,
    status: req.body.status
  };
  try {
    const newTicket = await ticketService.createTicket(ticket);
    res.status(httpStatusCodes.CREATED).json({ status: true, data: newTicket });
  } catch (err) {
    next(err);
  }
}

async function updateTicket(req, res, next) {
  //#swagger.tags = ['Tickets']
  try {
    await ticketService.updateTicket(req.params.id, req.body);
    res.status(httpStatusCodes.NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
}

async function deleteTicket(req, res, next) {
  //#swagger.tags = ['Tickets']
  try {
    await ticketService.deleteTicket(req.params.id);
    res.status(httpStatusCodes.OK).json({ success: true, message: 'Ticket deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
};
