function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var address = require("../../utils/city.js"), tools = require("../../utils/tools.js");

function getAddress(t) {
    var e = getApp(), a = wx.getStorageSync("trd_session");
    tools.requset("?i=" + e.siteInfo.uniacid + "&c=entry&op=receive_card&do=getAddress&m=" + e.modules_name + "&a=wxapp", _defineProperty({
        trd_session: a
    }, "trd_session", a), function(e) {
        "" == (e = e.info).name ? wx.chooseAddress({
            success: function(e) {
                console.log(e.userName), console.log(e.postalCode), console.log(e.provinceName), 
                console.log(e.cityName), console.log(e.countyName), console.log(e.detailInfo), console.log(e.nationalCode), 
                console.log(e.telNumber), t.setData({
                    consignee: e.userName,
                    tel: e.telNumber,
                    detailAddress: e.provinceName + e.cityName + e.countyName + e.detailInfo
                });
            }
        }) : t.setData({
            consignee: e.name,
            tel: e.phone,
            detailAddress: e.address
        });
    });
}

Page({
    data: {
        animationData: {},
        animationAddressMenu: {},
        addressMenuIsShow: !1,
        value: [ 0, 0, 0 ],
        provinces: [],
        citys: [],
        areas: [],
        province: "",
        city: "",
        area: "",
        consignee: "",
        tel: "",
        detailAddress: ""
    },
    onLoad: function(e) {
        var t = wx.createAnimation({
            duration: 500,
            transformOrigin: "50% 50%",
            timingFunction: "ease"
        });
        this.animation = t;
        var a = address.provinces[0].id;
        this.setData({
            provinces: address.provinces,
            citys: address.citys[a],
            areas: address.areas[address.citys[a][0].id]
        }), getAddress(this);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    selectDistrict: function(e) {
        this.data.addressMenuIsShow || this.startAddressAnimation(!0);
    },
    startAddressAnimation: function(e) {
        var t = this;
        e ? t.animation.translateY("0vh").step() : t.animation.translateY("40vh").step(), 
        t.setData({
            animationAddressMenu: t.animation.export(),
            addressMenuIsShow: e
        });
    },
    cityCancel: function(e) {
        this.startAddressAnimation(!1);
    },
    citySure: function(e) {
        var t = this, a = (t.data.city, t.data.value);
        t.startAddressAnimation(!1);
        var s = t.data.provinces[a[0]].name + "," + t.data.citys[a[1]].name + "," + t.data.areas[a[2]].name;
        t.setData({
            areaInfo: s
        });
    },
    hideCitySelected: function(e) {
        this.startAddressAnimation(!1);
    },
    cityChange: function(e) {
        var t = e.detail.value, a = this.data.provinces, s = this.data.citys, i = (this.data.areas, 
        t[0]), n = t[1], o = t[2];
        if (this.data.value[0] != i) {
            var d = a[i].id;
            this.setData({
                value: [ i, 0, 0 ],
                citys: address.citys[d],
                areas: address.areas[address.citys[d][0].id]
            });
        } else if (this.data.value[1] != n) {
            d = s[n].id;
            this.setData({
                value: [ i, n, 0 ],
                areas: address.areas[s[n].id]
            });
        } else this.setData({
            value: [ i, n, o ]
        });
    },
    nameInput: function(e) {
        this.setData({
            consignee: e.detail.value
        });
    },
    telInput: function(e) {
        this.setData({
            tel: e.detail.value
        });
    },
    detailInput: function(e) {
        this.setData({
            detailAddress: e.detail.value
        });
    },
    submit: function(e) {
        var t = this, a = {}, s = wx.getStorageSync("trd_session"), i = t.data.consignee, n = t.data.tel, o = t.data.detailAddress;
        if ("" != i) if ("" != n) if ("" != o) {
            a.trd_session = s, a.formid = e.detail.formId, a.name = i, a.phone = n, a.address = o;
            var d = getApp();
            tools.requset("?i=" + d.siteInfo.uniacid + "&c=entry&op=receive_card&do=address&m=" + d.modules_name + "&a=wxapp", a, function(e) {
                console.log("成功"), wx.navigateBack();
            });
        } else tools.showNotice("请填写详细地址"); else tools.showNotice("请填写电话"); else tools.showNotice("请填写收货人");
    }
});