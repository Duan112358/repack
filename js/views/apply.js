var React = require('react');
var {Link, State, Navigation, RouteHandler } = require('react-router');
var Api = require('../actions/api');
var Spinner = require('../mixins/spinner');
var Waves = require('../mixins/waves');

var NoteMsg = ['请输入正确的手机号', '亲, 别闹了, 快抢红包吧', '^_^,红包被玩坏了'];

var Apply = React.createClass({
    displayName: "Apply",
    mixins: [Api, State, Navigation],
    setHeaderHeight: function() {
        var apply = this.refs.apply.getDOMNode();
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
        logo.style.marginTop = width * 0.15 + 'px';
        logo.style.marginBottom = (packHeight - 180 * width / 320 - width * 0.15 - 70) + 'px';
        logo.style.width = 50 * width / 320 + 'px';

        this.state.bgimg && (apply.style.backgroundImage = 'url(' + this.state.bgimg + ')');
    },
    componentDidMount: function() {
        this.setHeaderHeight();

        var that = this;

        setTimeout(function() {
            that.setState({
                loading: false
            });
        }, 1000);

        Waves.displayEffect();
    },
    changeMobile: function(e) {
        var mobileInput = e.target;
        var mobile = mobileInput.value;
        var target = {
            mobile_invalid: true
        };

        var mobilePattern = /^((\(\d{3}\))|(\d{3}\-))?13\d{9}|14[57]\d{8}|15\d{9}|18\d{9}$/;
        if (mobile.length <= 11) {
            target.mobile = mobile;
        }

        if (mobile.length === 11 && !mobile.match(mobilePattern)) {
            target.noteMsg = NoteMsg[this.state.times % 3];
            target.times = this.state.times + 1;
            target.mobile_invalid = true;
        } else if (mobile.match(mobilePattern)) {
            target.mobile_invalid = false;
        }

        this.setState(target);
    },
    openPack: function(e) {
        var that = this;
        if (that.state.mobile && !that.state.mobile_invalid) {
            that.apply({
                share_id: 'UBIDH2OVBT7VE',
                mobile: this.state.mobile,
                caller: 'web'
            }, function(data) {
                that.cache('applyinfo', {
                    mobile: that.state.mobile,
                    amount: data.amount,
                    share_id: 'UBIDH2OVBT7VE',
                    bgimg: that.state.bgimg,
                    note: that.state.note,
                    icon: that.state.icon
                });
                that.transitionTo('result', {
                    share_id: '123123'
                });
            });
        } else {
            that.setState({
                noteMsg: NoteMsg[0]
            }, function() {
                that.refs.mobile.getDOMNode().focus();
            })
        }
    },
    getInitialState: function() {
        return {
            loading: true,
            mobile: '',
            noteMsg: '输入手机号码，红包自动放入账号',
            times: 1,
            bgimg: 'linear-gradient(-180deg, #A4E1F8 0%, #FAD8BE 100%)',
            icon: '/static/images/apply/icon.svg',
            note: '我们的目标: 让所有O2O企业一天拥有滴滴微信红包'
        };
    },
    render: function() {
        return <div className="apply" ref="apply">
            <div className="header" ref="header">
            </div>
            <div className="content">
                <div ref="note" className="note">{this.state.note}</div>
                <div className="redpack waves-effect waves-float waves-block" ref="redpack">
                    <img src={this.state.icon || "/static/images/apply/icon.svg"} className="com-logo" ref="logo"/>
                    <label className="msg">{this.state.noteMsg}</label>
                    <input className="mobile" type="tel" onChange={this.changeMobile} value={this.state.mobile} ref="mobile"/>
                    <button className="btn apply-btn" onTouchStart={this.openPack} ref="apply">打开红包</button>
                </div>
                <img src="/static/images/apply/cloud-front.svg" className="backdrop"/>
            </div>
            <div className="footer" ref="footer"></div>
            {this.state.loading ? <div className="loading">
                <Spinner />
            </div> : false}
        </div>
    }
});

module.exports = Apply;
