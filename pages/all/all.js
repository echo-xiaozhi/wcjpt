var tools = require("../../utils/tools.js");

function imlist(n) {
    var t = {};
    t.id = n.data.id, t.p = n.data.p, t.type = n.data.type, t.trd_session = wx.getStorageSync("trd_session");
    var o = getApp();
    tools.requset("?i=" + o.siteInfo.uniacid + "&c=entry&op=receive_card&do=all&m=" + o.modules_name + "&a=wxapp", t, function(t) {
        t = t.info;
        1 < n.data.p && (t = n.data.info.concat(t)), n.setData({
            info: t
        });
    });
}

Page({
    data: {
        type: "",
        p: 1
    },
    onLoad: function(t) {
        var n = this;
        getApp().tabhead(n), t.id && (n.data.id = t.id), t.type && (n.data.type = t.type), 
        imlist(n);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    more: function(t) {
        this.data.p += 1, imlist(this);
    },
    goback: tools.goback
});