var Todo = require('../models/todo');


var TodoController = {
  list: function(req, res){
    Todo.find().then(function(todos){
      res.render('todo/list', {todos: todos});
    });
  },
  form: function(req, res){
    var todoId = req.params.id;

    // If doing an add load the form and bail
    if(!todoId){
      res.render('todo/form');
      return;
    }

    // Look up todo to be edited
    Todo.findById(todoId).then(function(todo){
      res.render('todo/form', todo);
    });
  },
  add: function(req, res){
    // Process POST request from form

    // take info from the user's request
    var title = req.body.title;

    // add the item to mongo
    var newTodo = new Todo({title: title});
    newTodo.save(function(){
      // send the user to the list view
      res.redirect('/todo/');
    });
  },
  edit: function(req, res){
    var todoId = req.params.id;
    var title = req.body.title;

    Todo.findByIdAndUpdate(todoId, {$set: {title: title}}).then(function(){
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
