var Todo = require('../models/todo');


var TodoController = {
  list: function(req, res){
    Todo.find().then(function(todos){
      res.render('todo/list', {todos: todos});
    });
  },
  add: function(req, res){
    // take info from the user's request
    var title = req.body.title;

    // add the item to mongo
    var newTodo = new Todo({title: title});
    newTodo.save(function(){
      // send the user to the list view
      res.redirect('/todo/');
    });
  },
  delete: function(req, res){
    var todoId = req.params.id;
    Todo.deleteOne({"_id": todoId}).then(function(){
      res.redirect('/todo/');
    });
  }
};

module.exports = TodoController;
