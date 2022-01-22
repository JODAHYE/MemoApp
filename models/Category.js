const mongoose = require('mongoose');
const { Schema } = mongoose;
const categorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  name:{
    type: String,
    maxlength: 18,
    required: true,
  }
});
module.exports = mongoose.model('Category', categorySchema);
