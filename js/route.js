var React = require('react');
var {Route, DefaultRoute} = require('react-router');

var Index = require('./views/index');
var Apply = require('./views/apply');
var Empty = require('./views/empty');
var Result = require('./views/result');

module.exports = (
    <Route handler={Index} path="/">
        <DefaultRoute handler={Apply} name="apply"/>
        <Route handler={Result} name="result"/>
        <Route handler={Empty} name="empty"/>
    </Route>
);
