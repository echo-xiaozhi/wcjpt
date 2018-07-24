function _defineProperty(o, t, e) {
    return t in o ? Object.defineProperty(o, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : o[t] = e, o;
}

var tools = require("../../utils/tools.js");

function actDetail(o) {
    var t = wx.getStorageSync("trd_session"), e = _defineProperty({
        trd_session: t
    }, "trd_session", t);
    e.id = o.data.id;
    var n = getApp(), i = n.siteInfo.siteroot + "?i=" + n.siteInfo.uniacid + "&c=entry&op=receive_card&do=shareImg&m=" + n.modules_name + "&a=wxapp&id=" + e.id + "&trd_session=" + wx.getStorageSync("trd_session");
    console.log(i), o.setData({
        url: i
    });
}

Page({
    data: {
        headtxt: "生成分享图"
    },
    onLoad: function(o) {
        var t = this;
        getApp().tabhead(t), o.id && (t.data.id = o.id), actDetail(t);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    prese: function(o) {
        wx.showLoading({
            title: "保存中",
            mask: !0
        }), wx.downloadFile({
            url: this.data.url,
            success: function(o) {
                200 === o.statusCode && (wx.hideLoading(), wx.saveImageToPhotosAlbum({
                    filePath: o.tempFilePath,
                    success: function(o) {
                        wx.showToast({
                            title: "保存成功"
                        });
                    },
                    fail: function(o) {
                        tools.showNotice("保存失败");
                    }
                }));
            },
            fail: function(o) {
                wx.hideLoading(), tools.showNotice("保存失败");
            }
        });
    }
});