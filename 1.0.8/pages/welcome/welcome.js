var tools = require("../../utils/tools.js"), version = require("../../utils/version.js");

Page({
    onShow: function() {
        var n = this, e = wx.getStorageSync("is_checking" + version.version) || !1;
        console.log(e);
        var i = getApp(), o = {
            trd_session: wx.getStorageSync("trd_session"),
            key: "switch_examine"
        };
        tools.requset("?i=" + i.siteInfo.uniacid + "&c=entry&op=receive_card&do=config&m=" + i.modules_name + "&a=wxapp", o, function(e) {
            console.log(e.info), 1 == e.info ? n.waitandjump("/weather/pages/index/index") : (wx.setStorageSync("is_checking" + version.version, !0), 
            n.waitandjump("/pages/news/news"));
        });
    },
    waitandjump: function(e) {
        wx.showToast({
            title: "拼命加载中",
            icon: "loading",
            duration: 500
        }), setTimeout(function() {
            wx.reLaunch({
                url: e
            });
        }, 500);
    }
});