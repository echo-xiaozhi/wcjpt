var tools = require("../../utils/tools.js");

function balance(o) {
    var t = wx.getStorageSync("trd_session"), e = getApp();
    tools.requset("?i=" + e.siteInfo.uniacid + "&c=entry&op=receive_card&do=my&m=" + e.modules_name + "&a=wxapp", {
        trd_session: t
    }, function(t) {
        console.log(t.info.money), o.setData({
            info: t.info.money
        });
    });
}

Page({
    data: {
        unitid: tools.unitid,
        headtxt: "提现",
        money: "",
        sub: 1
    },
    onLoad: function(t) {
        getApp().tabhead(this), balance(this);
    },
    onReady: function() {
        var o = this, t = getApp(), e = {
            trd_session: wx.getStorageSync("trd_session"),
            key: "advertisement"
        };
        tools.requset("?i=" + t.siteInfo.uniacid + "&c=entry&op=receive_card&do=config&m=" + t.modules_name + "&a=wxapp", e, function(t) {
            o.setData({
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
    allout: function(t) {
        var o = this.data.info;
        this.setData({
            money: o
        });
    },
    moneyInput: function(t) {
        var o = "";
        o = parseFloat(t.detail.value) > this.data.info ? this.data.info : t.detail.value, 
        this.setData({
            money: o
        });
    },
    submit: function(t) {
        var o = this;
        if ("" != o.data.money) {
            if (2 == this.data.sub) return !1;
            this.data.sub = 2;
            var e = getApp(), n = {};
            n.money = o.data.money, n.formid = t.detail.formId, n.trd_session = wx.getStorageSync("trd_session"), 
            tools.requset("?i=" + e.siteInfo.uniacid + "&c=entry&op=receive_card&do=withdrawals&m=" + e.modules_name + "&a=wxapp", n, function(t) {
                (o.data.sub = 1) == t.status && wx.showModal({
                    title: "提示",
                    mask: !0,
                    content: "提现成功",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm;
                    }
                }), balance(o);
            });
        } else tools.showNotice("请输入提现金额");
    },
    goback: tools.goback
});