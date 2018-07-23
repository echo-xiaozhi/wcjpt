var tools = require("../../utils/tools.js"),
    app = getApp();

function getPrize(o) {
    var e = wx.getStorageSync("trd_session"), t = getApp();
    tools.requset("?i=" + t.siteInfo.uniacid + "&c=entry&op=receive_card&do=index&m=" + t.modules_name + "&a=wxapp", {
        trd_session: e
    }, function(e) {
      console.log(e)
        for (var t in console.log(e), e.info) e.info[t].typevalue = 1 == e.info[t].type ? timestampToTime(e.info[t].typevalue) : e.info[t].typevalue, 
        e.info[t].addtime = timestampToTime(e.info[t].created);
        o.setData({
            info: e.info,
            wrapHidden: !1
        });
    });
}

function total(t) {
    var e = getApp(), o = wx.getStorageSync("trd_session");
    tools.requset("?i=" + e.siteInfo.uniacid + "&c=entry&op=receive_card&do=total&m=" + e.modules_name + "&a=wxapp", {
        trd_session: o
    }, function(e) {
        t.setData({
            total: e.info
        });
    });
}

function timestampToTime(e) {
    var t = new Date(1e3 * e);
    return t.getFullYear() + "-" + ((t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-") + (t.getDate() + " ") + (t.getHours() + ":") + (t.getMinutes() + ":") + (t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds());
}

Page({
    data: {
        wrapHidden: !0,
        tabhead: "首页",
        unitid: tools.unitid
    },
    onLoad: function(e) {
      wx.showNavigationBarLoading()

        var t = this, o = getApp(), n = {
            trd_session: wx.getStorageSync("trd_session"),
            key: "title"
        };
        tools.requset("?i=" + o.siteInfo.uniacid + "&c=entry&op=receive_card&do=config&m=" + o.modules_name + "&a=wxapp", n, function(e) {
            t.setData({
                headtxt: e.info ? e.info : "抽奖小助手"
            });
        });
        n = {
            trd_session: wx.getStorageSync("trd_session"),
            key: "advertisement"
        };
        tools.requset("?i=" + o.siteInfo.uniacid + "&c=entry&op=receive_card&do=config&m=" + o.modules_name + "&a=wxapp", n, function(e) {
            t.setData({
                advertisement: e.info ? e.info : ""
            });
            console.log(e.info)
        }), o.editTabBar(), o.tabhead(t), o.globalData.userInfo ? t.setData({
            userInfo: o.globalData.userInfo
        }) : t.setData({
            getUserLyaer: !0
        }), getPrize(t), total(t);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getUserInfo: function(e) {
        tools.userInfo(this, e);
    },
    todayPrize: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../partake/partake?id=" + t
        });
    },
    soonDetail: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../partake/partake?id=" + t
        });
    }
});