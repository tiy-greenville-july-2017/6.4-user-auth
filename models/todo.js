var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
  title: {type: String, required: true, unique: true}
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
