var tools = require("../../utils/tools.js");

function list(n) {
    var o = getApp(), t = wx.getStorageSync("trd_session");
    tools.requset("?i=" + o.siteInfo.uniacid + "&c=entry&op=receive_card&do=jump&m=" + o.modules_name + "&a=wxapp", {
        trd_session: t
    }, function(o) {
        console.log(o), n.setData({
            list: o.info
        });
    });
}

Page({
    data: {},
    onLoad: function(o) {
        var n = this, t = getApp(), e = {
            trd_session: wx.getStorageSync("trd_session"),
            key: "title"
        };
        tools.requset("?i=" + t.siteInfo.uniacid + "&c=entry&op=receive_card&do=config&m=" + t.modules_name + "&a=wxapp", e, function(o) {
            n.setData({
                headtxt: o.info ? o.info : "抽奖小助手"
            });
        }), getApp().tabhead(n), list(n);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    jump: function(o) {
        var n = o.currentTarget.dataset.appid;
        wx.navigateToMiniProgram({
            appId: n,
            success: function(o) {
                console.log("success");
            },
            fail: function(o) {
                wx.showModal({
                    title: "",
                    content: o.errMsg,
                    showCancel: !1
                });
            }
        });
    },
    goback: tools.goback
});