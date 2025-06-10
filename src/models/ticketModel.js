const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
<<<<<<< HEAD
    event: { type: mongoose.Types.ObjectId, ref: 'Event', required: true },
    buyer: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    purchaseDate: { type: Date, default: Date.now },
    seatNumber: { type: Number, default: null },
    status: { type: String, enum: ['active', 'used', 'cancelled'], default: 'active' }
  },
  {
    collation: 'tickets',
=======
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' }
  },
  {
    collection: 'tickets',
>>>>>>> delete-oauth
    timestamps: true
  }
);

<<<<<<< HEAD
module.exports = mongoose.model('ticket', ticketSchema);
=======
module.exports = mongoose.model('Ticket', ticketSchema);
>>>>>>> delete-oauth
