var express = require('express');

var BrochureController = require('./controllers/brochure');
var TodoController = require('./controllers/todo');


module.exports = function(app){
  var brochureRouter = express.Router();
  var todoRouter = express.Router();

  brochureRouter.get('/', BrochureController.home);

  todoRouter.get('/', TodoController.list);
  todoRouter.post('/', TodoController.add);
  todoRouter.get('/:id/delete/', TodoController.delete);

  app.use('/', brochureRouter);
  app.use('/todo', todoRouter);
};
