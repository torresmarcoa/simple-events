const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date_time: { type: Date, required: true },
    address: { type: String, required: true },
    organizer: { type: mongoose.Types.ObjectId, ref: 'User', require: 'true' },
    capacity: { type: Number, required: true },
    assistants_number: { type: Number, required: true },
    performers: { type: String, required: true },
    event_type: {
      type: String,
      required: true,
      enum: ['concert', 'conference', 'workshop', 'meetup', 'other'],
    },
  },
  {
    collection: 'events',
    timestamps: true,
  },
);

module.exports = mongoose.model('Event', eventSchema);
