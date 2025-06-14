const ticketService = require('../services/ticketService');
const httpStatusCodes = require('../utils/httpStatusCodes');

    

async function getAllTickets(req, res, next) {
  //#swagger.tags = ['Tickets']
  /* #swagger.summary = 'Get all tickets' */
  /* #swagger.description = 'Retrieves all tickets stored in the database.' */
  /* #swagger.responses[200] = { description: 'List of tickets retrieved successfully' } */
  /* #swagger.responses[500] = { description: 'Server error while retrieving tickets' } */
  try {
    const tickets = await ticketService.getAllTickets();
    // console.log(tickets);
    res.status(httpStatusCodes.OK).json({ status: true, data: tickets });
  } catch (err) {
    next(err);
  }
}

async function getTicketById(req, res, next) {
  //#swagger.tags = ['Tickets']
  /* #swagger.summary = 'Get ticket by ID' */
  /* #swagger.description = 'Retrieves a ticket by its MongoDB ID.' */
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the ticket',
        required: true,
        type: 'string'
  } */
  /* #swagger.responses[200] = { description: 'Ticket retrieved successfully' } */
  /* #swagger.responses[404] = { description: 'Ticket not found' } */
  /* #swagger.responses[500] = { description: 'Server error while retrieving ticket' } */
  try {
    const ticket = await ticketService.getTicketById(req.params.id);
    res.status(httpStatusCodes.OK).json({ status: true, data: ticket });
  } catch (err) {
    next(err);
  }
}

async function createTicket(req, res, next) {
  //#swagger.tags = ['Tickets']
  /* #swagger.summary = 'Create a new ticket' */
  /* #swagger.description = 'Creates a new ticket for an event.' */
  /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          event: '60f1a0f1f1a0f1a0f1a0f1a0',
          buyer: '68446494699c448035392728',
          purchaseDate: '2025-06-10T18:00:00Z',
          seatNumber: 12,
          status: 'active'
        }
  } */
  /* #swagger.responses[201] = { description: 'Ticket created successfully' } */
  /* #swagger.responses[400] = { description: 'Invalid input data' } */
  /* #swagger.responses[500] = { description: 'Server error while creating ticket' } */
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
  /* #swagger.summary = 'Update a ticket' */
  /* #swagger.description = 'Updates the details of an existing ticket by ID.' */
  /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'ID of the ticket',
        type: 'string'
  } */
  /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          event: '60f1a0f1f1a0f1a0f1a0f1a0',
          buyer: '68446494699c448035392728',
          seatNumber: 5,
          status: 'cancelled'
        }
  } */
  /* #swagger.responses[204] = { description: 'Ticket updated successfully' } */
  /* #swagger.responses[400] = { description: 'Invalid input data' } */
  /* #swagger.responses[404] = { description: 'Ticket not found' } */
  /* #swagger.responses[500] = { description: 'Server error while updating ticket' } */
  try {
    // Validate input
    if (!req.body || (!req.body.buyer && !req.body.seatNumber && !req.body.status)) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'At least one field (buyer, seatNumber, or status) is required.'
      });
    }

    const updatedTicket = await ticketService.updateTicket(req.params.id, req.body);

    if (!updatedTicket) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ success: false, message: 'Ticket not found.' });
    }

    res.status(httpStatusCodes.NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
}

async function deleteTicket(req, res, next) {
  //#swagger.tags = ['Tickets']
  /* #swagger.summary = 'Delete a ticket' */
  /* #swagger.description = 'Deletes a ticket by its ID.' */
  /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'ID of the ticket to delete',
        type: 'string'
  } */
  /* #swagger.responses[200] = { description: 'Ticket deleted successfully' } */
  /* #swagger.responses[404] = { description: 'Ticket not found' } */
  /* #swagger.responses[500] = { description: 'Server error while deleting ticket' } */
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
