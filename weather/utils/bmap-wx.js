var _createClass = function() {
    function i(t, a) {
        for (var e = 0; e < a.length; e++) {
            var i = a[e];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(t, a, e) {
        return a && i(t.prototype, a), e && i(t, e), t;
    };
}();

function _classCallCheck(t, a) {
    if (!(t instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var BMapWX = function() {
    function a(t) {
        _classCallCheck(this, a), this.ak = t.ak;
    }
    return _createClass(a, [ {
        key: "getWXLocation",
        value: function(t, a, e, i) {
            t = t || "gcj02", a = a || function() {}, e = e || function() {}, i = i || function() {}, 
            wx.getLocation({
                type: t,
                success: a,
                fail: e,
                complete: i
            });
        }
    }, {
        key: "search",
        value: function(t) {
            var a = {
                query: (t = t || {}).query || "生活服务$美食&酒店",
                scope: t.scope || 1,
                filter: t.filter || "",
                coord_type: t.coord_type || 2,
                page_size: t.page_size || 10,
                page_num: t.page_num || 0,
                output: t.output || "json",
                ak: this.ak,
                sn: t.sn || "",
                timestamp: t.timestamp || "",
                radius: t.radius || 2e3,
                ret_coordtype: "gcj02ll"
            }, n = {
                iconPath: t.iconPath,
                iconTapPath: t.iconTapPath,
                width: t.width,
                height: t.height,
                alpha: t.alpha || 1,
                success: t.success || function() {},
                fail: t.fail || function() {}
            }, e = function(t) {
                a.location = t.latitude + "," + t.longitude, wx.request({
                    url: "https://api.map.baidu.com/place/v2/search",
                    data: a,
                    header: {
                        "content-type": "application/json"
                    },
                    method: "GET",
                    success: function(t) {
                        var a = t.data;
                        if (0 === a.status) {
                            var e = a.results, i = {};
                            i.originalData = a, i.wxMarkerData = [];
                            for (var s = 0; s < e.length; s++) i.wxMarkerData[s] = {
                                id: s,
                                latitude: e[s].location.lat,
                                longitude: e[s].location.lng,
                                title: e[s].name,
                                iconPath: n.iconPath,
                                iconTapPath: n.iconTapPath,
                                address: e[s].address,
                                telephone: e[s].telephone,
                                alpha: n.alpha,
                                width: n.width,
                                height: n.height
                            };
                            n.success(i);
                        } else n.fail({
                            errMsg: a.message,
                            statusCode: a.status
                        });
                    },
                    fail: function(t) {
                        n.fail(t);
                    }
                });
            };
            if (t.location) {
                var i = t.location.split(",")[1];
                e({
                    errMsg: "input location",
                    latitude: t.location.split(",")[0],
                    longitude: i
                });
            } else this.getWXLocation("gcj02", e, function(t) {
                n.fail(t);
            }, function(t) {});
        }
    }, {
        key: "suggestion",
        value: function(t) {
            var a = {
                query: (t = t || {}).query || "",
                region: t.region || "全国",
                city_limit: t.city_limit || !1,
                output: t.output || "json",
                ak: this.ak,
                sn: t.sn || "",
                timestamp: t.timestamp || "",
                ret_coordtype: "gcj02ll"
            }, e = {
                success: t.success || function() {},
                fail: t.fail || function() {}
            };
            wx.request({
                url: "https://api.map.baidu.com/place/v2/suggestion",
                data: a,
                header: {
                    "content-type": "application/json"
                },
                method: "GET",
                success: function(t) {
                    var a = t.data;
                    0 === a.status ? e.success(a) : e.fail({
                        errMsg: a.message,
                        statusCode: a.status
                    });
                },
                fail: function(t) {
                    e.fail(t);
                }
            });
        }
    }, {
        key: "regeocoding",
        value: function(t) {
            var a = {
                coordtype: (t = t || {}).coordtype || "gcj02ll",
                pois: t.pois || 0,
                output: t.output || "json",
                ak: this.ak,
                sn: t.sn || "",
                timestamp: t.timestamp || "",
                ret_coordtype: "gcj02ll"
            }, n = {
                iconPath: t.iconPath,
                iconTapPath: t.iconTapPath,
                width: t.width,
                height: t.height,
                alpha: t.alpha || 1,
                success: t.success || function() {},
                fail: t.fail || function() {}
            }, e = function(s) {
                a.location = s.latitude + "," + s.longitude, wx.request({
                    url: "https://api.map.baidu.com/geocoder/v2/",
                    data: a,
                    header: {
                        "content-type": "application/json"
                    },
                    method: "GET",
                    success: function(t) {
                        var a = t.data;
                        if (0 === a.status) {
                            var e = a.result, i = {};
                            i.originalData = a, i.wxMarkerData = [], i.wxMarkerData[0] = {
                                id: 0,
                                latitude: s.latitude,
                                longitude: s.longitude,
                                address: e.formatted_address,
                                iconPath: n.iconPath,
                                iconTapPath: n.iconTapPath,
                                desc: e.sematic_description,
                                business: e.business,
                                alpha: n.alpha,
                                width: n.width,
                                height: n.height
                            }, n.success(i);
                        } else n.fail({
                            errMsg: a.message,
                            statusCode: a.status
                        });
                    },
                    fail: function(t) {
                        n.fail(t);
                    }
                });
            };
            if (t.location) {
                var i = t.location.split(",")[1];
                e({
                    errMsg: "input location",
                    latitude: t.location.split(",")[0],
                    longitude: i
                });
            } else this.getWXLocation("gcj02", e, function(t) {
                n.fail(t);
            }, function(t) {});
        }
    }, {
        key: "weather",
        value: function(t) {
            var a = {
                coord_type: (t = t || {}).coord_type || "gcj02",
                output: t.output || "json",
                ak: this.ak,
                sn: t.sn || "",
                timestamp: t.timestamp || ""
            }, s = {
                success: t.success || function() {},
                fail: t.fail || function() {}
            }, e = function(t) {
                a.location = t.longitude + "," + t.latitude, wx.request({
                    url: "https://api.map.baidu.com/telematics/v3/weather",
                    data: a,
                    header: {
                        "content-type": "application/json"
                    },
                    method: "GET",
                    success: function(t) {
                        var a = t.data;
                        if (0 === a.error && "success" === a.status) {
                            var e = a.results, i = {};
                            i.originalData = a, i.currentWeather = [], i.currentWeather[0] = {
                                currentCity: e[0].currentCity,
                                pm25: e[0].pm25,
                                date: e[0].weather_data[0].date,
                                temperature: e[0].weather_data[0].temperature,
                                weatherDesc: e[0].weather_data[0].weather,
                                wind: e[0].weather_data[0].wind
                            }, s.success(i);
                        } else s.fail({
                            errMsg: a.message,
                            statusCode: a.status
                        });
                    },
                    fail: function(t) {
                        s.fail(t);
                    }
                });
            };
            if (t.location) {
                var i = t.location.split(",")[0];
                e({
                    errMsg: "input location",
                    latitude: t.location.split(",")[1],
                    longitude: i
                });
            } else this.getWXLocation("gcj02", e, function(t) {
                s.fail(t);
            }, function(t) {});
        }
    } ]), a;
}();

module.exports.BMapWX = BMapWX;