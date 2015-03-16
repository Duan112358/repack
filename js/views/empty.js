var React = require('react');
var {Link, State, Navigation, RouteHandler } = require('react-router');

var Empty = React.createClass({
    displayName: "Empty",
    mixins: [State, Navigation],
    setHeaderHeight: function() {
        var footer = this.refs.footer.getDOMNode();
        var note = this.refs.note.getDOMNode();
        var redpack = this.refs.redpack.getDOMNode();
        var logo = this.refs.logo.getDOMNode();

        var width = document.body.clientWidth;
        var height = document.body.clientHeight;

        var packWidth = width * 0.8;
        var packHeight = packWidth * 587 / 500;
        var packBottom = width / 320 * 60;

        redpack.style.height = packHeight + 'px';
        redpack.style.bottom = packBottom + 'px';
        note.style.top = (height - packHeight - packBottom - 70) / 2 + 'px';
        logo.style.marginTop = width * 0.06 + 'px';
        logo.style.marginBottom = (packHeight - 180 * width / 320 - width * 0.15 - 70) + 'px';
        logo.style.width = 50 * width / 320 + 'px';
    },
    componentDidMount: function() {
        this.setHeaderHeight();
    },
    getInitialState: function() {
        return {
            msg: '手慢了, 红包被抢光了～'
        };
    },
    render: function() {
        return <div className="empty">
            <div className="header" ref="header">
            </div>
            <div className="content">
                <div ref="note" className="note">{this.state.msg}</div>
                <div className="redpack" ref="redpack">
                    <img src="/static/images/empty/icon.svg" className="com-logo" ref="logo"/>
                   </div>
                <img src="/static/images/empty/cloud-front.svg" className="backdrop"/>
            </div>
            <div className="footer" ref="footer"></div>
        </div>
    }
});

module.exports = Empty;
