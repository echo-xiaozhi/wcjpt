var common = require("../../utils/common.js"), xjCitys = {};

Page({
    data: {
        hotCitys: [],
        chinaCitys: []
    },
    onLoad: function(i) {
        xjCitys = common.readXJCitys(), this.setData({
            chinaCitys: xjCitys.province
        });
    },
    hotTaped: function(i) {
        var t = i.target.id, n = xjCitys.citys[t];
        wx.redirectTo({
            url: "../index/index?name=" + n.cityzh + "&zh=" + n.cityzh + "&location=" + n.location
        });
    },
    chinaTaped: function(i) {
        var t = i.target.id, n = xjCitys.province[t];
        wx.redirectTo({
            url: "../index/index?name=" + n.cityzh + "&zh=" + n.cityzh + "&location=" + n.location
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});