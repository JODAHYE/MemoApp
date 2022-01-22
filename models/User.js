const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
    default: ''
  }
});
module.exports = mongoose.model('User', userSchema);
