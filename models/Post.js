const mongoose = require('mongoose');
const { Schema } = mongoose;
const postSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 50
  },
  date: {
    type: Date,
    default: Date.now
  },
  color: {
    type: String,
    default: '#659B91'
  },
  // images:{
  //   type: Array,
  //   default: []
  // },
  content:{
    type: String,
    required: true
  },
  category:{
    type: Schema.Types.ObjectId,
    ref: 'post',
  },
});
module.exports = mongoose.model('Post', postSchema);
