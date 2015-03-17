var React = require('react');
var {Link, State, Navigation, RouteHandler } = require('react-router');
var Api = require('../actions/api');
var Spinner = require('../mixins/spinner');
var Waves = require('../mixins/waves');

var Comments = function(amount){
    var comment = '';
    if(amount < 10){
       comment = '卧槽, 今儿人品欠佳, :('
    }else if(amount >= 10 && amount < 50){
       comment = '手气不错吆, 么么哒~' 
    }else{
       comment = 'OMG, 老板太给力了, ^v^'
    }
    return comment;
};

var Result = React.createClass({
    mixins: [State, Navigation, Api],
    shareWX: function(){
        var that = this;
        var sharing = that.state.sharing;
        that.setState({
            sharing: !sharing
        });
    },
    setHeaderHeight: function() {
        var amount = this.refs.amount.getDOMNode();
        var msg = this.refs.msg.getDOMNode();
        var redpack = this.refs.redpack.getDOMNode();
        var sendBtn = this.refs.send.getDOMNode();
        var useBtn = this.refs.use.getDOMNode();

        var width = document.body.clientWidth;
        var height = document.body.clientHeight;

        var packWidth = width * 0.8;
        var radio = width / 320;
        var packHeight = packWidth * 636 / 502;
        var packBottom = radio * 60;

        redpack.style.height = packHeight + 'px';

        msg.style.lineHeight = radio * 40 + 'px';
        amount.style.lineHeight = radio * 100 + 'px';
        amount.style.fontSize = radio * 60 + 'px';

        sendBtn.style.margin = radio * 15 + 'px auto';
        useBtn.style.margin = radio * 15 + 'px auto';
    },
    getInitialState: function(){
        var state = this.cache('applyinfo');
        return {
            loading: false,
            app_name: '钱台交易云',
            amount: '20',
            records: [],
            note: '我们的目标: 让所有O2O企业一天拥有滴滴微信红包',
            link: 'http://mp.weixin.qq.com/s?__biz=MzAxMDAzNDg4NQ==&mid=205724962&idx=1&sn=c60f373691c932eea52989f17eec19a7#rd',
            content: '本优惠券抵现金使用。</br>仅限金果牧场微信点餐使用。</br>本活动解释权归金果牧场餐厅所有。'
        }
    },
    checkInfo: function(){
        swal({
            title: this.state.app_name,
            text: this.state.content,
            html: true,
            confirmButtonText: '确定',
            confirmButtonColor: '#ef6363',
            allowOutsideClick: true
        });
    },
    componentDidMount: function(){
        var that = this;
        //this.share();
        that.setHeaderHeight();
        that.setState(that.cache('applyinfo'));
        var records = that.state.records;
        that.getRecords({}, function(data){
            data.length && that.setState({
                records: records.concat(data)
            }); 
        });

        Waves.displayEffect();
    },
    toggleShare: function(){
        this.setState({
            share: !this.state.share
        });
    },
    renderRecords: function(){
        return <ul className="records">
            <li className="record table mine">
                <div className="table-cell avatar">
                    <img src={this.state.avatar || '/static/images/result/avatar.png'}/>
                </div>
                <div className="table-cell details">
                    我抢到的红包总额
                </div>
                <div className="table-cell amount">
                    {this.state.amount || '0'}元
                </div>
            </li>
        {this.state.records.map(function(record){
            return <li className="record table border">
                <div className="table-cell avatar">
                    <img src={record.avatar || '/static/images/result/avatar.png'}/>
                </div>
                <div className="table-cell details">
                    <div>
                        <span className="mobile">{record.mobile}</span>
                        <span className="date">{record.create_time}</span>
                    </div>
                    <div className="comment">{record.comment || Comments(record.amt)}</div>
                </div>
                <div className="table-cell amount">
                    {record.amt}元
                </div>
            </li>;
        })}
        </ul>;
    },
    renderShare: function(){
        return <div className="share-wrapper">
            <button className="btn btn-share" onClick={this.toggleShare}>我知道了</button>
        </div>;
    },
    render: function(){
        return <div className="result">
            <div className="header" ref="header">
            </div>
            <div className="content">
                <div className="note" ref="note">{this.state.note}</div>
                <div className="redpack waves-effect waves-float waves-block" ref="redpack">
                    <h1 className="pack-amount" ref="amount">{this.state.amount}元</h1>
                    <div className="wrapper">
                        <label className="msg" ref="msg">已放入您的账户: {this.state.mobile}</label>
                        <button className="send btn" ref="send" onClick={this.toggleShare}>送红包给好友</button>
                        <a href={this.state.link} className="use btn" ref="use">使用红包</a>
                        <p className="check-info" onClick={this.checkInfo}>查看活动规则</p>
                    </div>
                </div>
                {this.state.records.length ? this.renderRecords() : false}
            </div>
            {this.state.share ? this.renderShare() : false}
            {this.state.loading ? <div className="loading">
                <Spinner/>
            </div>: false}
        </div>

    }
});

module.exports = Result;
