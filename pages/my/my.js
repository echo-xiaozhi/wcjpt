var tools = require("../../utils/tools.js");

function balance(t) {
    var e = getApp(), o = wx.getStorageSync("trd_session");
    tools.requset("?i=" + e.siteInfo.uniacid + "&c=entry&op=receive_card&do=my&m=" + e.modules_name + "&a=wxapp", {
        trd_session: o
    }, function(e) {
        t.setData({
            info: e.info
        });
    });
}

Page({
    data: {
        headtxt: "我的"
    },
    onLoad: function(e) {
        var t = this;
        getApp().tabhead(t), getApp().editTabBar(), getApp().globalData.userInfo ? t.setData({
            userInfo: getApp().globalData.userInfo
        }) : t.setData({
            getUserLyaer: !0
        }), balance(t);
    },
    onReady: function() {
        var e = getApp(), t = this, o = {
            trd_session: wx.getStorageSync("trd_session"),
            key: "red_bag"
        };
        tools.requset("?i=" + e.siteInfo.uniacid + "&c=entry&op=receive_card&do=config&m=" + e.modules_name + "&a=wxapp", o, function(e) {
            t.setData({
                red_bag: e.info
            });
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getUserInfo: function(e) {
        tools.userInfo(this, e);
    }
});