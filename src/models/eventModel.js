const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dateTime: { type: Date, required: true },
    address: { type: String, required: true },
    organizer: { type: mongoose.Types.ObjectId, ref: 'User', require: 'true' },
    capacity: { type: Number, required: true },
    assistantsNumber: { type: Number, required: true },
    performers: { type: String, required: true },
    eventType: {
      type: String,
      required: true,
      enum: ['concert', 'conference', 'workshop', 'meetup', 'other']
    }
  },
  {
    collection: 'events',
    timestamps: true
  }
);

module.exports = mongoose.model('Event', eventSchema);
