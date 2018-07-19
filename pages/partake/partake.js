var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var tools = require("../../utils/tools.js"), touchDot = 0, touchend = 0;

function actDetail(a) {
    var t = wx.getStorageSync("trd_session"), e = _defineProperty({
        trd_session: t
    }, "trd_session", t);
    e.id = a.data.id, a.data.group_code && (e.group_code = a.data.group_code);
    var o = getApp();
    tools.requset("?i=" + o.siteInfo.uniacid + "&c=entry&op=receive_card&do=details&m=" + o.modules_name + "&a=wxapp", e, function(t) {
        var e = t.info;
        0 < e.max_group_num && e.group && (a.data.group_code = e.group.id, a.setData({
            group_code: e.group.id
        })), console.log(a.data.group_code), 1 == e.type && (e.typevalue = timestampToTime(e.typevalue)), 
        a.setData({
            info: t.info
        }), 0 == e.status ? e.is_mine ? a.setData({
            state: 5
        }) : 0 == e.is_buy ? a.setData({
            state: 1
        }) : a.setData({
            state: 2
        }) : 1 == e.is_cancel ? a.setData({
            state: 6
        }) : e.is_mine ? a.setData({
            state: 5
        }) : (wx.getStorageSync("status" + e.id) ? a.setData({
            layerones: !1
        }) : (a.setData({
            layerones: !0
        }), wx.setStorageSync("status" + e.id, !0)), 1 == e.is_winning ? a.setData({
            state: 3
        }) : a.setData({
            state: 4
        })), 2 == a.data.state && a.setData({
            group_code: ""
        }), 0 == e.max_group_num || 0 != e.status || e.is_mine || 2 != a.data.state || (a.animation.translateX(-200).step(), 
        a.setData({
            animationData: a.animation.export()
        })), console.log(a.data.group_code);
    });
}

function timestampToTime(t) {
    var e = new Date(1e3 * t);
    return e.getFullYear() + "-" + ((e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1) + "-") + (e.getDate() + " ") + (e.getHours() + ":") + (e.getMinutes() + ":") + (e.getSeconds() < 10 ? "0" + e.getSeconds() : e.getSeconds());
}

Page({
    data: {
        unitid: tools.unitid,
        shareLayer: !0,
        animationData: {},
        group_code: ""
    },
    onLoad: function(t) {
        var e = this;
        getApp().tabhead(e);
        var a = wx.createAnimation({
            duration: 1e3,
            timingFunction: "ease"
        });
        (e.animation = a).translateX(70).step(), e.setData({
            animationData: a.export()
        }), t.scene ? e.data.id = decodeURIComponent(t.scene) : e.data.id = t.id, t.group_code && (e.setData({
            group_code: t.group_code
        }), e.data.group_code = t.group_code);
        var o = getApp();
        o.globalData.userInfo ? e.setData({
            userInfo: o.globalData.userInfo
        }) : e.setData({
            getUserLyaer: !0
        });
        var n = {
            trd_session: wx.getStorageSync("trd_session"),
            key: "title"
        };
        tools.requset("?i=" + o.siteInfo.uniacid + "&c=entry&op=receive_card&do=config&m=" + o.modules_name + "&a=wxapp", n, function(t) {
            e.setData({
                headtxt: t.info ? t.info : "抽奖小助手"
            });
        });
        n = {
            trd_session: wx.getStorageSync("trd_session"),
            key: "advertisement"
        };
        tools.requset("?i=" + o.siteInfo.uniacid + "&c=entry&op=receive_card&do=config&m=" + o.modules_name + "&a=wxapp", n, function(t) {
            e.setData({
                advertisement: t.info ? t.info : ""
            });
        }), actDetail(e);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var e = this, a = e.data.userInfo.nickName + "给你发送了一个抽奖邀请,等你来抽";
        e.data.info.wechat_no && "" != e.data.info.wechat_no && (a = e.data.info.wechat_no + "给你发送了一个抽奖邀请，等你来抽");
        var o = getApp(), n = o.siteInfo.siteroot + "?i=" + o.siteInfo.uniacid + "&c=entry&op=receive_card&do=share&m=" + o.modules_name + "&a=wxapp&id=" + e.data.id;
        return console.log(n), console.log(111111), {
            title: a,
            imageUrl: n,
            path: "/pages/partake/partake?id=" + e.data.id
        };
    },
    getUserInfo: function(t) {
        tools.userInfo(this, t);
    },
    Invitation: function(t) {
        this.setData({
            shareLayer: !1
        });
    },
    cancelLayer: function(t) {
        this.setData({
            shareLayer: !0
        });
    },
    shareImg: function(t) {
        wx.navigateTo({
            url: "../shareImg/shareImg?id=" + this.data.id
        });
    },
    embed: function(t) {
        wx.navigateTo({
            url: "../embed/embed?id=" + this.data.id
        });
    },
    participate1: function() {
        console.log(4151515);
    },
    participate: function(e) {
        var a = this, t = e.detail.formId, o = wx.getStorageSync("trd_session"), n = {};
        n.trd_session = o, n.formid = t, n.id = a.data.id, n.group_code = a.data.group_code;
        var i = getApp();
        tools.requset("?i=" + i.siteInfo.uniacid + "&c=entry&op=receive_card&do=apply&m=" + i.modules_name + "&a=wxapp", n, function(t) {
            1 != t.status || a.data.group_code || (a.data.group_code = t.info), "object" === _typeof(t.info) ? wx.requestPayment({
                timeStamp: t.info.timeStamp,
                nonceStr: t.info.nonceStr,
                package: t.info.package,
                signType: t.info.signType,
                paySign: t.info.paySign,
                success: function(t) {
                    a.participate(e);
                },
                fail: function(t) {
                    console.log(t);
                }
            }) : actDetail(a);
        });
    },
    lottery: function(t) {
        var e = this, a = t.detail.formId, o = {
            trd_session: wx.getStorageSync("trd_session"),
            formid: a,
            id: e.data.id
        }, n = getApp();
        tools.requset("?i=" + n.siteInfo.uniacid + "&c=entry&op=receive_card&do=openPrize&m=" + n.modules_name + "&a=wxapp", o, function(t) {
            actDetail(e);
        });
    },
    goindex: function(t) {
        wx.redirectTo({
            url: "../news/news"
        });
    },
    gofabu: function(t) {
        wx.redirectTo({
            url: "../index/index"
        });
    },
    address: function(t) {
        wx.navigateTo({
            url: "../address/address"
        });
    },
    layerhidden: function(t) {
        this.setData({
            layer: !0
        });
    },
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
    more: function(t) {
        wx.navigateTo({
            url: "../all/all?id=" + this.data.id
        });
    },
    all: function(t) {
        wx.navigateTo({
            url: "../all/all?id=" + this.data.id + "&type=unwin"
        });
    },
    jump: function(t) {
        wx.navigateToMiniProgram({
            appId: this.data.info.jump_info.appid,
            path: this.data.info.jump_info.path,
            extraData: this.data.info.jump_info.extradata,
            success: function(t) {
                console.log("success");
            },
            fail: function(t) {
                wx.showModal({
                    title: "",
                    content: t.errMsg,
                    showCancel: !1
                });
            }
        });
    },
    touchStart: function(t) {
        touchDot = t.touches[0].pageX;
    },
    touchMove: function(t) {
        var e = t.touches[0].pageX;
        touchend = e - touchDot;
    },
    touchEnd: function(t) {
        touchend < -100 && this.animation.translateX(-200).step(), 60 < touchend && this.animation.translateX(70).step(), 
        this.setData({
            animationData: this.animation.export()
        });
    },
    groupBtn: function(t) {
        var e = this, a = wx.getStorageSync("trd_session"), o = {};
        o.prize_id = e.data.id, o.trd_session = a, tools.requset("/Member/createGroup", o, function(t) {
            wx.navigateTo({
                url: "../share/share?id=" + e.data.id
            });
        });
    },
    goshare: function(t) {
        wx.navigateTo({
            url: "../share/share?id=" + this.data.id
        });
    },
    groupjoin: function(t) {
        var e = this, a = wx.getStorageSync("trd_session"), o = {};
        o.group_code = e.data.group_code, o.trd_session = a, tools.requset("/Member/joinGroup", o, function(t) {
            actDetail(e);
        });
    }
});