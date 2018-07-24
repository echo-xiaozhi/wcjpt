function _defineProperty(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

var tools = require("../../utils/tools.js");

function actDetail(n) {
    var t = wx.getStorageSync("trd_session"), e = _defineProperty({
        trd_session: t
    }, "trd_session", t);
    e.id = n.data.id, tools.requset("/Member/detail", e, function(t) {
        var e = t.info;
        console.log(e.share_sub_url), n.setData({
            url: e.share_sub_url
        });
    });
}

Page({
    data: {},
    onLoad: function(t) {
        var e = this;
        getApp().tabhead(e), t.id && e.setData({
            id: t.id
        }), actDetail(e);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    copy: function(t) {
        var e = t.currentTarget.dataset.name;
        wx.setClipboardData({
            data: e,
            success: function(t) {
                wx.showToast({
                    title: "复制成功！"
                });
            }
        });
    },
    goback: tools.goback
});