var request = require('superagent');
var store = require('./store');

var Api = {
    urls: {
        login: '/wap/login',
        checkout: '/wap/checkout',
        wxConfig: '/wxconfig'
    },
    post: function(url, data, cb) {
        //data = JSON.stringify(data);
        request.post(url)
            .send(data)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Accept', 'application/json')
            .end(cb);
    },
    getquery: function(){
        var search = location.hash.substr(location.hash.indexOf('?') + 1);
        return search.split('&').reduce(function(result, item) {
            values = item.split('=');
            result[values[0]] = values[1];
            return result;
        }, {});
    },
    apply: function(data, cb) {
        cb([]);
    },
    getRecords: function(data, cb){
        var records = [
            {amt: 13, create_time: '03-12 14:54', mobile: '18611973571'},
            {amt: 13, create_time: '03-12 14:54', mobile: '18611973571'},
            {amt: 13, create_time: '03-12 14:54', mobile: '18611973571'},
            {amt: 13, create_time: '03-12 14:54', mobile: '18611973571'},
            {amt: 13, create_time: '03-12 14:54', mobile: '18611973571'},
            {amt: 13, create_time: '03-12 14:54', mobile: '18611973571'},
            {amt: 13, create_time: '03-12 14:54', mobile: '18611973571'}
        ];
        cb(records);
    },
    checkout: function(data, cb) {
        this.post(this.urls.checkout, data, cb);
    },
    login: function(data, cb) {
        this.post(this.urls.login, data, cb);
    },
    cache: function(key, value) {
        if (value) {
            store.set(key, value);
        } else {
            return store.get(key);
        }
    },
    isweixin: function(){
        var agent = navigator.userAgent.toLowerCase();
        return agent.indexOf('micromessenger') !== -1;
    },
    share: function(cb) {
        var that = this;
        request.get(that.urls.wxConfig + '?url=' + window.location.href)
            .send({
                url: location.href
            })
            .end(function(err, res) {
                console.log(err, res);
                if (!err) {
                    var resp = JSON.parse(res.text);
                    if (resp.respcd == '0000') {
                        resp.data.jsApiList = [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo'
                        ];
                        console.log(resp.data);
                        if (window.wx) {
                            resp.data.debug = true;
                            wx.config(resp.data);
                            var share_data = {
                                title: '滴滴打油获BAT两亿美元巨额融资',
                                link: 'https://baidu.com',
                                desc: '滴滴打油豪掷1亿人民币叫板滴滴打车，以1毛1公升跳楼价让大家体验滴滴打油，直到滴滴打车停止补贴！',
                                imgUrl: location.host + '/static/img/dayou.jpg'
                            };

                            wx.ready(function() {
                                // 2. 分享接口
                                // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
                                wx.onMenuShareAppMessage(share_data);
                                // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
                                wx.onMenuShareTimeline(share_data);
                                // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
                                wx.onMenuShareQQ(share_data);
                                // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
                                wx.onMenuShareWeibo(share_data);
                            });
                        }
                    }

                }
            })
    }
};

module.exports = Api;
