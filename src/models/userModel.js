const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fname: { type: String, required: false },
    lname: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: false },
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
