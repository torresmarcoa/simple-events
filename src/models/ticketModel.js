const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    event: { type: mongoose.Types.ObjectId, ref: 'Event', required: true },
    buyer: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    purchaseDate: { type: Date, default: Date.now },
    seatNumber: { type: Number, default: null },
    status: { type: String, enum: ['active', 'used', 'cancelled'], default: 'active' }
  },
  {
    collection: 'tickets',
    timestamps: true
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
