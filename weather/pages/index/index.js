var app = getApp(), bmap = require("../../utils/bmap-wx.js"), common = require("../../utils/common.js");

Page({
    onShareAppMessage: function() {
        return {
            title: "微信天气",
            desc: "",
            path: "/pages/index/index"
        };
    },
    data: {
        motto: "Hello World",
        gogoleft: 0,
        gogoright: -50,
        gogostatus: !1,
        pagesize: 100,
        pagetop: 0,
        userInfo: {},
        animationW: {},
        animationM: {},
        theWeather: {
            weatherIcon: "../../images/w/w01",
            date: 22,
            currentCity: "南京",
            weatherDesc: "多云",
            pm25: 67,
            temperature: "24 ~ 14",
            wind: " 无风 "
        },
        cityMenus: [],
        today: "2017-05-01",
        wall: "../../images/clearday"
    },
    setMenuNatural: function() {
        var e = wx.createAnimation({
            duration: 100
        }), a = wx.createAnimation({
            duration: 100
        }), t = !1;
        this.data.gogostatus ? (e.width("100%").height("100vh").top("0vh").left("0%").step(), 
        a.right("40%").step(), t = !1) : (e.width("90%").height("90vh").top("5vh").left("-40%").step(), 
        a.right("0%").step(), t = !0), this.setData({
            animationW: e.export(),
            animationM: a.export(),
            gogostatus: t,
            cityMenus: common.getCityList()
        });
    },
    setAdd: function() {
        wx.navigateTo({
            url: "../add/add"
        });
    },
    donateTab: function(e) {
        wx.navigateTo({
            url: "../payment/donate"
        });
    },
    menuTab: function(e) {
        wx.showLoading();
        var a = e.target.id, s = this;
        if ("" != a) {
            var l = common.getCity()[a];
            new bmap.BMapWX({
                ak: "Uy9ojdAqjSz5fDu3YIxySGW9YSPG2m6l"
            }).weather({
                location: l.xy,
                fail: function(e) {
                    return console.log(e), wx.hideLoading(), null;
                },
                success: function(e) {
                    wx.hideLoading();
                    var a = e.currentWeather[0];
                    a.fullData = e.originalData.results[0], console.log(a);
                    var t = a.date;
                    t = t.substring(t.indexOf("：") + 1, t.indexOf("℃")), a.date = t;
                    for (var n = a.fullData.weather_data, o = 0; o < n.length; o++) {
                        if (0 == o) {
                            var i = n[o].date;
                            i = i.substring(i.indexOf("周"), i.indexOf("周") + 2), n[o].date = i;
                        }
                        n[o].weather = common.iconChanger(n[o].weather).icon;
                    }
                    a.fullData.weather_data = n, a.xy = l.xy;
                    var r = common.iconChanger(a.weatherDesc);
                    a.weatherIcon = r.icon, a.weatherDesc = r.status, a.wind = common.windHelper(a.wind), 
                    a.pmpm = common.pmText(a.pm25), s.setData({
                        theWeather: a,
                        today: common.getToday(),
                        wall: r.wall
                    }), s.setMenuNatural();
                }
            });
        } else console.log("id 空着");
    },
    onPullDownRefresh: function() {
        console.log("wakakakak");
    },
    onLoad: function(s) {
        wx.showLoading(), common.init();
        var l = this;
        if (null == s.name) {
            var e = new bmap.BMapWX({
                ak: "UnMeMmKOwfL2jYjTq1VU3TAgCIsqb6Gf"
            }), a = function(e) {
                console.log(e), wx.hideLoading();
            };
            console.log("正在添加新城市");
            var t = function(e) {
                wx.hideLoading();
                var a = e.currentWeather[0];
                a.fullData = e.originalData.results[0];
                var t = a.date;
                t = t.substring(t.indexOf("：") + 1, t.indexOf("℃")), a.date = t;
                for (var n = a.fullData.weather_data, o = 0; o < n.length; o++) {
                    if (0 == o) {
                        var i = n[o].date;
                        i = i.substring(i.indexOf("周"), i.indexOf("周") + 2), n[o].date = i;
                    }
                    n[o].weather = common.iconChanger(n[o].weather).icon;
                }
                a.fullData.weather_data = n, a.xy = s.location;
                var r = common.iconChanger(a.weatherDesc);
                a.weatherIcon = r.icon, a.weatherDesc = r.status, a.wind = common.windHelper(a.wind), 
                a.pmpm = common.pmText(a.pm25), common.refreshCity(a), l.setData({
                    theWeather: a,
                    today: common.getToday(),
                    wall: r.wall
                });
            };
            e.weather({
                fail: a,
                success: t
            });
        } else {
            e = new bmap.BMapWX({
                ak: "UnMeMmKOwfL2jYjTq1VU3TAgCIsqb6Gf"
            }), a = function(e) {
                console.log(e), wx.hideLoading();
            };
            console.log("正在添加新城市");
            t = function(e) {
                wx.hideLoading();
                var a = e.currentWeather[0];
                a.fullData = e.originalData.results[0];
                var t = a.date;
                t = t.substring(t.indexOf("：") + 1, t.indexOf("℃")), a.date = t;
                for (var n = a.fullData.weather_data, o = 0; o < n.length; o++) {
                    if (0 == o) {
                        var i = n[o].date;
                        i = i.substring(i.indexOf("周"), i.indexOf("周") + 2), n[o].date = i;
                    }
                    n[o].weather = common.iconChanger(n[o].weather).icon;
                }
                a.fullData.weather_data = n, a.xy = s.location;
                var r = common.iconChanger(a.weatherDesc);
                a.weatherIcon = r.icon, a.weatherDesc = r.status, a.wind = common.windHelper(a.wind), 
                a.pmpm = common.pmText(a.pm25), common.addCity(a), l.setData({
                    theWeather: a,
                    today: common.getToday(),
                    wall: r.wall
                });
            };
            e.weather({
                location: s.location,
                fail: a,
                success: t
            });
        }
    }
});