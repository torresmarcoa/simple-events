const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fname: { type: String, require: true },
    lname: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: Number, require: true },
    role: {
      type: String,
      require: true,
      enum: ['organizer', 'attendee', 'staff'],
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
