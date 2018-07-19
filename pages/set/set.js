var app = getApp(), util = require("../../utils/common.js"), md5 = require("../../utils/md5.js"), STR_VOICE_TEMPFILEPATH = "", recorderManager = wx.getRecorderManager(), innerAudioContext = wx.createInnerAudioContext();

function getInfo() {
    var n = wx.getStorageSync("trd_session");
    util.requset("/minfo", {
        trd_session: n
    }, "GET", function(n) {
        "unlogin" == n.data.info ? getApp().globalData.login(function() {
            getInfo();
        }) : console.log(n);
    });
}

function luckDetail(n) {
    util.requset("/lotto/info/" + n, {}, "GET", function(n) {
        console.log(n);
    });
}

function launch(o, t, e, i) {
    var n = wx.getStorageSync("trd_session"), a = {
        money: o,
        question_id: t,
        price: e,
        num: i,
        trd_session: n
    };
    util.requset("/lotto/info", a, "POST", function(n) {
        "unlogin" == n.data.info ? getApp().globalData.login(function() {
            launch(o, t, e, i);
        }) : console.log(n);
    });
}

function my_send(o) {
    var n = {
        trd_session: wx.getStorageSync("trd_session"),
        p: o.data.p
    };
    o.data.formId && (n.formid = o.data.formId), util.requset("/log/send", n, "GET", function(n) {
        "unlogin" == n.data.info ? getApp().globalData.login(function() {
            my_send(o);
        }) : (console.log(n), wx.hideLoading());
    });
}

function my_join(o) {
    var n = wx.getStorageSync("trd_session");
    util.requset("/log/join", {
        trd_session: n,
        p: o.data.p
    }, "GET", function(n) {
        "unlogin" == n.data.info ? getApp().globalData.login(function() {
            my_join(o);
        }) : console.log(n);
    });
}

function join(t, e, i) {
    var n = wx.getStorageSync("trd_session");
    util.requset("/lotto/join/" + t, {
        trd_session: n,
        answer: e
    }, "POST", function(n) {
        if ("unlogin" == n.data.info) getApp().globalData.login(function() {
            join(t, e, i);
        }); else {
            console.log(n);
            var o = n.data.info;
            o.appId && wx.requestPayment({
                timeStamp: o.timeStamp,
                nonceStr: o.nonceStr,
                package: o.package,
                signType: "MD5",
                paySign: o.paySign,
                success: function(n) {},
                fail: function(n) {}
            });
        }
    });
}

function withdrawals(o, t) {
    var n = wx.getStorageSync("trd_session");
    util.requset("/cash", {
        trd_session: n,
        money: o
    }, "POST", function(n) {
        "unlogin" == n.data.info ? getApp().globalData.login(function() {
            withdrawals(o, t);
        }) : console.log(n);
    });
}

function balance(o) {
    var n = wx.getStorageSync("trd_session");
    util.requset("/cash", {
        trd_session: n
    }, "GET", function(n) {
        "unlogin" == n.data.info ? getApp().globalData.login(function() {
            balance(o);
        }) : console.log(n);
    });
}

function topicsList(o) {
    var n = wx.getStorageSync("trd_session");
    util.requset("/question", {
        trd_session: n
    }, "GET", function(n) {
        "unlogin" == n.data.info ? getApp().globalData.login(function() {
            topicsList(o);
        }) : console.log(n);
    });
}

function topicsDetail(o, t) {
    var n = wx.getStorageSync("trd_session");
    util.requset("/question/" + o, {
        trd_session: n
    }, "GET", function(n) {
        "unlogin" == n.data.info ? getApp().globalData.login(function() {
            topicsDetail(o, t);
        }) : console.log(n);
    });
}

Page({
    data: {
        layerHidden: !0,
        questArray: [ {
            name: "题目一"
        }, {
            name: "题目二"
        }, {
            name: "题目三"
        }, {
            name: "题目四"
        }, {
            name: "题目五"
        } ],
        p: 1,
        luyintext: "长按录音"
    },
    onLoad: function(n) {
        getApp().editTabBar();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    setquest: function(n) {
        "题目一" == n.target.dataset.name ? wx.navigateTo({
            url: "../actList/actList"
        }) : wx.navigateTo({
            url: "../create/create"
        });
    },
    close: function(n) {
        this.setData({
            layerHidden: !0
        });
    },
    submit: function(n) {
        console.log(n.detail.formId);
        this.data.formId = n.detail.formId, my_send(this);
    },
    choicePhoto: function(n) {
        wx.chooseImage({
            count: 3,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(n) {
                var o = n.tempFilePaths;
                console.log(o);
            }
        });
    },
    startRecord: function(n) {
        this.setData({
            luyintext: "手指离开录音结束"
        });
        recorderManager.start({
            duration: 1e4,
            sampleRate: 44100,
            numberOfChannels: 1,
            encodeBitRate: 192e3,
            format: "mp3",
            frameSize: 50
        });
    },
    stopRecord: function(n) {
        this.setData({
            luyintext: "开始录音"
        }), recorderManager.stop(), recorderManager.onStop(function(n) {
            console.log(n), STR_VOICE_TEMPFILEPATH = n.tempFilePath;
        });
    },
    playVoice: function(n) {
        console.log(STR_VOICE_TEMPFILEPATH), innerAudioContext.autoplay = !0, innerAudioContext.src = STR_VOICE_TEMPFILEPATH, 
        innerAudioContext.onPlay(function() {
            console.log("开始播放");
        }), innerAudioContext.onError(function(n) {
            console.log(n.errMsg), console.log(n.errCode);
        });
    }
});