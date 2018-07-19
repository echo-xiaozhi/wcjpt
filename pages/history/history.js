function _defineProperty(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

var tools = require("../../utils/tools.js");

function myLaunch(n) {
    var t = wx.getStorageSync("trd_session"), e = _defineProperty({
        trd_session: t
    }, "trd_session", t);
    e.p = n.data.p1;
    var a = getApp();
    tools.requset("?i=" + a.siteInfo.uniacid + "&c=entry&op=receive_card&do=launch&m=" + a.modules_name + "&a=wxapp", e, function(t) {
        t = t.info;
        console.log(t);
        for (var e = 0; e < t.length; e++) t[e].addtime = timestampToTime(t[e].created);
        n.setData({
            lucklist: t,
            noData: !1
        });
    });
}

function myPart(n) {
    var t = wx.getStorageSync("trd_session"), e = _defineProperty({
        trd_session: t
    }, "trd_session", t);
    e.p = n.data.p2;
    var a = getApp();
    tools.requset("?i=" + a.siteInfo.uniacid + "&c=entry&op=receive_card&do=history&m=" + a.modules_name + "&a=wxapp", e, function(t) {
        t = t.info;
        console.log(t);
        for (var e = 0; e < t.length; e++) t[e].addtime = timestampToTime(t[e].addtime);
        n.setData({
            lucklist: t,
            noData: !1
        });
    });
}

function timestampToTime(t) {
    var e = new Date(1e3 * t);
    return e.getFullYear() + "-" + ((e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1) + "-") + (e.getDate() + " ") + (e.getHours() + ":") + (e.getMinutes() + ":") + (e.getSeconds() < 10 ? "0" + e.getSeconds() : e.getSeconds());
}

Page({
    data: {
        unitid: tools.unitid,
        headtxt: "历史",
        navOn: 1,
        p1: 1,
        p2: 1
    },
    onLoad: function(t) {
        getApp().tabhead(this), myPart(this);
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
    navSwitch: function(t) {
        var e = this, n = t.currentTarget.dataset.id;
        e.data.navOn != n && (e.setData({
            lucklist: [],
            noData: !0
        }), e.setData({
            navOn: n
        }), 1 == n ? myPart(e) : myLaunch(e));
    },
    detail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../partake/partake?id=" + e
        });
    }
});