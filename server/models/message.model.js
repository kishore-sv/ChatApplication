const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: { 
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true, 
    },
    text: {
      type: String,
    },
    file: {
      type: String, 
    },
  },
  {
    timestamps: true,
  }
);


//messageSchema.index({ senderId: 1, receiverId: 1 });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
