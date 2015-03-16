var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var DefaultRoute = ReactRouter.DefaultRoute;
var RouteHandler = ReactRouter.RouteHandler;

require('../less/app');
var routes = require('./route');

ReactRouter.run(routes, function (Handler) {
  React.initializeTouchEvents(true);
  React.render(<Handler/>, document.body);
});
