const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    role: {
      type: String,
      required: true,
      enum: ['organizer', 'attendee', 'staff'],
      default: 'attendee'
    }
  },
  {
    collection: 'users',
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
