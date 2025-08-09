const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  wa_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: 'Unknown',
  },
  message_id: {
    type: String,
    required: true,
    unique: true,
  },
  text: {
    type: String,
  },
  type: {
    type: String,
    default: 'text',
  },
  timestamp: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read', 'received'],
    default: 'received',
  },
  conversation_id: {
    type: String,
  },
  fromMe: {
    type: Boolean,
    default: false, // true if sent from our number
  },
}, {
  timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
