var md5 = require("md5.js"), request_domain = "https://z.9xy.cn", requset = function(t, e, o, n) {
    wx.showLoading({
        title: "加载中"
    }), e.timestamp = parseInt(new Date().getTime() / 1e3);
    for (var a = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ], s = "", i = 0; i < 8; i++) {
        s += a[Math.ceil(52 * Math.random())];
    }
    e.noncestr = s;
    var r = autograph(e);
    e.sign = r, wx.request({
        url: request_domain + t,
        data: e,
        method: o,
        success: function(t) {
            n(t), wx.hideLoading();
        },
        fail: function(t) {
            wx.hideLoading(), wx.showModal({
                title: "提示",
                mask: !0,
                content: "连接服务器错误！",
                showCancel: !1,
                success: function(t) {
                    t.confirm;
                }
            });
        },
        complete: function() {}
    });
}, showNotice = function(t) {
    wx.showToast({
        title: t,
        image: "../../images/tabbar_2_ot.png",
        duration: 2e3
    });
};

function autograph(e) {
    var t = [];
    for (var o in e) t.push(o);
    t.sort();
    var n = "";
    return t.forEach(function(t) {
        n += t + "=" + encodeURIComponent(e[t]) + "&";
    }), n = n.substring(0, n.length - 1), md5.hexMD5("mysignhahaha" + n);
}

module.exports = {
    requset: requset,
    showNotice: showNotice
};