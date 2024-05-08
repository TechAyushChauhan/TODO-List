const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  activity: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'in-progress'],
    default: 'pending'
  },
  timeTaken: {
    type: Object,
    default: {m:0,s:0} 
  }
});

const TodoItem = mongoose.model('TodoItem', todoSchema);

module.exports = TodoItem;
