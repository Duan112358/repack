var React = require('react');
var { Link, RouteHandler, State } = require('react-router');

var Index = React.createClass({
    mixins: [State],
    render: function(){
        var name = this.getRoutes().reverse().name;
        return (<RouteHandler key={name}/>);
    }
});

module.exports = Index;
