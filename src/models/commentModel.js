const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true, trim: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }
  },
  {
    collection: 'comments',
    timestamps: true
  }
);

module.exports = mongoose.model('Comment', commentSchema);
