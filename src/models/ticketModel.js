const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' }
  },
  {
    collection: 'tickets',
    timestamps: true
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
