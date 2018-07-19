var util = require("utils/common.js");

App({
    editTabBar: function(e) {
        var t = this.globalData.tabbar, s = getCurrentPages(), o = s[s.length - 1], n = o.__route__;
        for (var a in 0 != n.indexOf("/") && (n = "/" + n), t.list) t.list[a].selected = !1, 
        t.list[a].pagePath == n && (t.list[a].selected = !0);
        o.setData({
            tabbar: t
        });
    },
    tabhead: function(t) {
        wx.getSystemInfo({
            success: function(e) {
                -1 < e.model.indexOf("iPhone X") ? t.setData({
                    headheight: 88
                }) : t.setData({
                    headheight: 64
                });
            }
        });
    },
    onLaunch: function(e) {
        if (e) {
            var t = e.scene;
            e.path;
            1007 !== t && 1008 != t || console.log("私聊群聊打开小程序");
        }
        var s = wx.getStorageSync("trd_session") || "";
        "" === s ? wx.login({
            success: this.loginCallback
        }) : wx.checkSession({
            success: function() {},
            fail: function() {
                wx.login({
                    success: this.loginCallback
                });
            }
        }), this.globalData.userInfo = wx.getStorageSync("userInfo" + s);
    },
    globalData: {
        userInfo: null,
        tabbar: {
            color: "#9F9494",
            selectedColor: "#F07575",
            backgroundColor: "#ffffff",
            borderStyle: "black",
            list: [ {
                pagePath: "/pages/news/news",
                text: "首页",
                iconPath: "../../images/news.png",
                selectedIconPath: "../../images/newsOn.png",
                selected: !0
            }, {
                pagePath: "/pages/index/index",
                text: "发起抽奖",
                iconPath: "../../images/index.png",
                selectedIconPath: "../../images/index.png",
                selected: !1
            }, {
                pagePath: "/pages/my/my",
                text: "我的",
                iconPath: "../../images/problem.png",
                selectedIconPath: "../../images/problemon.png",
                selected: !1
            }
            //  查看想要看的奖品
            // , {
            //   pagePath: "/pages/partake/partake?id=62",
            //   text: "我的",
            //   iconPath: "../../images/problem.png",
            //   selectedIconPath: "../../images/problemon.png",
            //   selected: !1
            // } 
            ]
        }
    },
    relogin: function(t, s, o, n) {
        var a = require("utils/tools.js"), i = this;
        wx.login({
            success: function(e) {
                void 0 === s && (s = {}), console.log(s);
                i.loginCallback(e, function(e) {
                    s.trd_session = e, a.requset(t, s, o, n);
                });
            }
        });
    },
    loginCallback: function(e, t) {
        var s = wx.getStorageSync("trd_session") || "";
        if (wx.removeStorageSync("trd_session"), wx.removeStorageSync("userInfo" + s), e.code) {
            var o = require("utils/tools.js"), n = getApp();
            o.requset("?i=" + n.siteInfo.uniacid + "&c=entry&op=receive_card&do=login&m=" + n.modules_name + "&a=wxapp", {
                code: e.code
            }, function(e) {
                if (1 != e.status) return console.log(e), wx.showModal({
                    title: "提示",
                    mask: !0,
                    content: e.info,
                    showCancel: !1,
                    success: function(e) {
                        e.confirm;
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                }), !1;
                wx.setStorageSync("trd_session", e.info), "function" == typeof t && t(e.info);
            });
        } else console.log("获取用户登录态失败！" + e.errMsg);
    },
    modules_name: "hu_couda",
    util: require("we7/resource/js/util.js"),
    siteInfo: require("siteinfo.js")
});