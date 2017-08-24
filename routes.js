var express = require('express');
var passport = require('passport');

var BrochureController = require('./controllers/brochure');
var TodoController = require('./controllers/todo');
var UserController = require('./controllers/user');

const requireLogin = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login/');
  }
};

module.exports = function(app){
  var brochureRouter = express.Router();
  var todoRouter = express.Router();
  var userRouter = express.Router();

  // Marketing Site Routes
  brochureRouter.get('/', BrochureController.home);

  // User Routes
  userRouter.get('/login/', UserController.login);
  userRouter.post('/login/', passport.authenticate('local-login', {
    successRedirect: '/todo/',
    failureRedirect: '/login/',
    failureFlash: true
  }));

  userRouter.get('/signup/', UserController.signup);
  userRouter.post('/signup/', passport.authenticate('local-signup', {
    successRedirect: '/todo/',
    failureRedirect: '/signup/',
    failureFlash: true
  }));

  // Todo Routes
  todoRouter.use(requireLogin);
  todoRouter.get('/', TodoController.list);
  todoRouter.post('/', TodoController.add);
  todoRouter.get('/add/', TodoController.form);
  // todoRouter.get('/:id/', TodoController.detail);
  todoRouter.post('/:id/', TodoController.edit);
  todoRouter.get('/:id/edit/', TodoController.form);
  todoRouter.get('/:id/delete/', TodoController.delete);

  app.use('/', brochureRouter);
  app.use('/', userRouter);
  app.use('/todo', todoRouter);
};
