var app = getApp(), sign_token = "mysignhahaha", request_domain = "https://z.9xy.cn", appname = "yiyuan", version = require("version.js"), unitid = "aasdasdasd", projectname = "sdb", upload = function(e, n, o) {
    wx.showLoading && wx.showLoading({
        title: "上传中...",
        mask: !0
    }), n.app = appname, n.version = version.version, n.project = projectname, wx.uploadFile({
        url: app.siteInfo.siteroot + "?i=" + app.siteInfo.uniacid + "&c=entry&op=receive_card&do=upload&m=" + app.modules_name + "&a=wxapp",
        filePath: e,
        name: "file",
        formData: n,
        success: function(e) {
            var n = JSON.parse(e.data);
            if (1 != n.status) return wx.showModal({
                title: "提示",
                mask: !0,
                content: n.info,
                showCancel: !1,
                success: function(e) {
                    e.confirm;
                }
            }), !1;
            o(e);
        },
        complete: function() {
            wx.hideLoading() && wx.hideLoading();
        }
    });
}, imageurl = function(e) {
    return app.siteInfo.siteroot + "?i=" + app.siteInfo.uniacid + "&c=entry&op=receive_card&do=image&m=" + app.modules_name + "&a=wxapp&id=" + e;
}, requset = function(o, t, a, i) {
    wx.showLoading({
        title: "加载中"
    }), t.app = appname, t.version = version.version, t.project = projectname, t.timestamp = Date.parse(new Date()), 
    t.timestamp = t.timestamp / 1e3, t.noncestr = Math.random().toString(36).substr(2, 15);
    var e = require("md5.js");
    t.sign = e.hexMD5(sign_token + t.timestamp + t.noncestr + o), i || (i = "get"), 
    "string" != typeof i && (i = "get"), wx.request({
        url: app.siteInfo.siteroot + o,
        data: t,
        method: i,
        success: function(e) {
            wx.hideLoading();
            var n = e.data;
            return 0 == n.status && "unlogin" != n.info ? (wx.showModal({
                title: "提示",
                mask: !0,
                content: n.info,
                showCancel: !1,
                success: function(e) {
                    e.confirm;
                }
            }), !1) : "unlogin" == n.info ? (console.log("relogin"), getApp().relogin(o, t, a, i), 
            !1) : a(n);
        },
        fail: function(e) {
            wx.hideLoading(), wx.showModal({
                title: "提示",
                mask: !0,
                content: "未连接到服务器",
                showCancel: !1,
                success: function(e) {
                    e.confirm;
                }
            });
        }
    });
}, userInfo = function(e, n) {
    if (e.setData({
        getUserLyaer: !1
    }), "getUserInfo:ok" == n.detail.errMsg) {
        var o = n.detail.userInfo;
        app.globalData.userInfo = o, e.setData({
            userInfo: app.globalData.userInfo
        });
        var t = wx.getStorageSync("trd_session");
        wx.setStorageSync("userInfo" + t, o), requset("?i=" + app.siteInfo.uniacid + "&c=entry&op=receive_card&do=register&m=" + app.modules_name + "&a=wxapp", {
            trd_session: t,
            nickname: o.nickName,
            headimgurl: o.avatarUrl,
            gender: o.gender,
            province: o.province,
            city: o.city,
            country: o.country
        }, function(e) {
            if (1 != e.status) return wx.showModal({
                title: "提示",
                mask: !0,
                content: e.info,
                showCancel: !1,
                success: function(e) {
                    e.confirm;
                }
            }), !1;
        });
    } else console.log("用户拒绝了");
}, needuserinfo = function n() {
    wx.showModal({
        title: "提示",
        content: "请授权用户信息",
        showCancel: !1,
        success: function() {
            wx.openSetting({
                success: function(e) {
                    !1 === e.authSetting["scope.userInfo"] && n();
                }
            });
        }
    });
}, showNotice = function(e) {
    wx.showToast({
        title: e,
        mask: !0,
        image: "../../images/notice.png",
        duration: 2e3
    });
};

module.exports = {
    requset: requset,
    upload: upload,
    userInfo: userInfo,
    imageurl: imageurl,
    showNotice: showNotice,
    unitid: unitid
};