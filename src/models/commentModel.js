const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    event: { type: mongoose.Types.ObjectId, ref: 'Event', required: true },
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, minlength: 1, maxlength: 1000 },
    createdAt: { type: Date, default: Date.now }
  },
  {
    collection: 'comments',
    timestamps: true
  }
);

module.exports = mongoose.model('Comment', commentSchema);
