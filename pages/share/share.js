function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var tools = require("../../utils/tools.js"), util = require("../../utils/util.js");

function actDetail(a) {
    var e = wx.getStorageSync("trd_session"), t = _defineProperty({
        trd_session: e
    }, "trd_session", e);
    t.id = a.data.id;
    var o = getApp();
    tools.requset("?i=" + o.siteInfo.uniacid + "&c=entry&op=receive_card&do=details&m=" + o.modules_name + "&a=wxapp", t, function(e) {
        console.log(e.info);
        var t = e.info;
        1 == t.type && (t.typevalue = util.formatTime(new Date(1e3 * t.typevalue))), a.data.info = t, 
        a.setData({
            info: e.info
        });
    });
}

Page({
    data: {},
    onLoad: function(e) {
        var t = this;
        getApp().tabhead(t), e.id && (t.data.id = e.id);
        var a = getApp();
        if (a.globalData.userInfo) {
            t.setData({
                userInfo: a.globalData.userInfo
            });
            wx.getStorageSync("trd_session");
        } else tools.userInfo(t);
        actDetail(t);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var e = this, t = e.data.userInfo.nickName + "给你发送了一个组队抽奖邀请,等你来抽";
        e.data.info.wechat_no && "" != e.data.info.wechat_no && (t = e.data.info.wechat_no + "给你发送了一个组队抽奖邀请,等你来抽"), 
        console.log(e.data.info.share_sub_url);
        var a = getApp();
        return {
            title: t,
            imageUrl: a.siteInfo.siteroot + "?i=" + a.siteInfo.uniacid + "&c=entry&op=receive_card&do=share&m=" + a.modules_name + "&a=wxapp&id=" + e.data.id,
            path: "/pages/partake/partake?id=" + e.data.id + "&group_code=" + e.data.info.group.id
        };
    },
    goback: tools.goback
});