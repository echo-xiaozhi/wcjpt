var tools = require("../../utils/tools.js");

function getProblem(e) {
    var t = getApp(), n = wx.getStorageSync("trd_session");
    tools.requset("?i=" + t.siteInfo.uniacid + "&c=entry&op=receive_card&do=problem&m=" + t.modules_name + "&a=wxapp", {
        trd_session: n
    }, function(t) {
        e.setData({
            list: t.info
        });
    });
}

Page({
    data: {
        headtxt: "问题",
        unitid: tools.unitid
    },
    onLoad: function(t) {
        getApp().tabhead(this), getProblem(this);
    },
    onReady: function() {
        var e = this, t = getApp(), n = {
            trd_session: wx.getStorageSync("trd_session"),
            key: "advertisement"
        };
        tools.requset("?i=" + t.siteInfo.uniacid + "&c=entry&op=receive_card&do=config&m=" + t.modules_name + "&a=wxapp", n, function(t) {
            e.setData({
                advertisement: t.info ? t.info : ""
            });
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    show: function(t) {
        var e = t.currentTarget.dataset.id;
        this.setData({
            anser: e
        });
    }
});