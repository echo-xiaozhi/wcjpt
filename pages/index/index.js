var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, _weCropperMin = require("../../utils/dist/weCropper.min.js"), _weCropperMin2 = _interopRequireDefault(_weCropperMin);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var dateTimePicker = require("../../utils/dateTimePicker.js"), app = getApp(), tools = require("../../utils/tools.js"), device = wx.getSystemInfoSync(), max_group_num = 0, upload_status = !1;

Page({
    data: {
        unitid: tools.unitid,
        crop: !1,
        setArray: [ {
            prIndex: 0,
            num: 1,
            money: "",
            prize: "",
            cardname: "",
            cardmsg: [ {
                cardnum: "",
                cardpass: ""
            } ]
        } ],
        conIndex: 0,
        conArray: [ "时间开奖", "人数开奖", "手动开奖" ],
        expIndex: 0,
        explainArray: [ "文字", "图片" ],
        startTime: "请选择时间",
        awardsNum: 1,
        remarks: "",
        remarksImg: "",
        jdexplain: "",
        jdnum: 0,
        cjnum: 0,
        business: "",
        // phone: '',
        copyorjump: 1,
        copyname: "",
        isgroup: !1,
        isindex: !1,
        max_group_num: 0,
        bgimg: "https://z.9xy.cn/Public/images/attach2.jpg",
        cropperOpt: {
            id: "cropper",
            width: device.windowWidth,
            height: device.windowWidth / 630 * 320,
            scale: 2.5,
            zoom: 8
        },
        height: device.windowHeight,
        fir_ptype: 0,
        fir_num: "",
        fir_val: "",
        sec_ptype: 0,
        sec_num: "",
        sec_val: "",
        trd_ptype: 0,
        trd_num: "",
        trd_val: "",
        attach_id: "",
        red_bag: 1,
        red_package_fee: 0
    },
    onLoad: function(t) {
        getApp().editTabBar();
        var a = this, e = getApp(), n = {
            trd_session: wx.getStorageSync("trd_session"),
            key: "title"
        };
        tools.requset("?i=" + e.siteInfo.uniacid + "&c=entry&op=receive_card&do=config&m=" + e.modules_name + "&a=wxapp", n, function(t) {
            a.setData({
                headtxt: t.info ? t.info : "抽奖小助手"
            });
        });
        n = {
            trd_session: wx.getStorageSync("trd_session"),
            key: "advertisement"
        };
        tools.requset("?i=" + e.siteInfo.uniacid + "&c=entry&op=receive_card&do=config&m=" + e.modules_name + "&a=wxapp", n, function(t) {
            a.setData({
                advertisement: t.info ? t.info : ""
            });
        });
        n = {
            trd_session: wx.getStorageSync("trd_session"),
            key: "pay_function"
        };
        tools.requset("?i=" + e.siteInfo.uniacid + "&c=entry&op=receive_card&do=config&m=" + e.modules_name + "&a=wxapp", n, function(t) {
            a.setData({
                pay_function: t.info ? t.info : 0
            });
        });
        n = {
            trd_session: wx.getStorageSync("trd_session"),
            key: "red_package_fee"
        };
        tools.requset("?i=" + e.siteInfo.uniacid + "&c=entry&op=receive_card&do=config&m=" + e.modules_name + "&a=wxapp", n, function(t) {
            a.data.red_package_fee = t.info ? t.info : 0;
        }), getApp().tabhead(a);
        var s = new Date().getFullYear(), i = dateTimePicker.dateTimePicker(s, this.data.endYear);
        i.dateTimeArray.pop(), i.dateTime.pop();
        this.setData({
            dateTimeArray1: i.dateTimeArray,
            dateTime1: i.dateTime
        }), e.globalData.userInfo ? a.setData({
            userInfo: e.globalData.userInfo
        }) : a.setData({
            getUserLyaer: !0
        });
        var o = this.data.cropperOpt;
        new _weCropperMin2.default(o).on("ready", function(t) {
            console.log("wecropper is ready for work!");
        }).on("beforeImageLoad", function(t) {
            console.log("before picture loaded, i can do something"), console.log("current canvas context:", t), 
            wx.showToast({
                title: "加载中...",
                icon: "loading",
                duration: 2e4
            });
        }).on("imageLoad", function(t) {
            console.log("picture loaded"), console.log("current canvas context:", t), wx.hideToast();
        });
    },
    onReady: function() {
        var t = getApp(), a = this, e = {
            trd_session: wx.getStorageSync("trd_session"),
            key: "red_bag"
        };
        tools.requset("?i=" + t.siteInfo.uniacid + "&c=entry&op=receive_card&do=config&m=" + t.modules_name + "&a=wxapp", e, function(t) {
            a.setData({
                red_bag: t.info
            });
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getUserInfo: function(t) {
        tools.userInfo(this, t);
    },
    addPrize: function(t) {
        var a = this.data.setArray;
        3 <= a.length ? tools.showNotice("最多设置三项") : (a.push({
            prIndex: 0,
            num: 1,
            money: "",
            prize: "",
            cardname: "",
            cardmsg: [ {
                cardnum: "",
                cardpass: ""
            } ]
        }), this.setData({
            setArray: a
        }));
    },
    delset: function(t) {
        var a = this.data.setArray, e = t.currentTarget.dataset.index;
        a.splice(e, 1), this.setData({
            setArray: a
        });
    },
    bindPickerChange: function(t) {
        var a = this, e = a.data.setArray, n = t.target.dataset.index;
        e[n].prIndex = t.currentTarget.dataset.id, 2 == t.currentTarget.dataset.id && (e[n].num = 1, 
        max_group_num = 0), a.setData({
            setArray: e,
            max_group_num: max_group_num
        }), 1 == t.currentTarget.dataset.id && 1 == this.data.red_bag && 0 < this.data.red_package_fee && (this.data.red_bag = 2, 
        wx.showModal({
            title: "提示",
            mask: !0,
            content: "红包需要手续费" + a.data.red_package_fee + "%",
            showCancel: !1,
            success: function(t) {
                t.confirm;
            }
        }));
    },
    prizeInput: function(t) {
        var a = this.data.setArray;
        a[t.target.dataset.index].prize = t.detail.value, this.setData({
            setArray: a
        });
    },
    moneyInput: function(t) {
        var a = this.data.setArray;
        a[t.target.dataset.index].money = t.detail.value, this.setData({
            setArray: a
        });
    },
    cardnameInput: function(t) {
        var a = this.data.setArray;
        a[t.target.dataset.index].cardname = t.detail.value, this.setData({
            setArray: a
        });
    },
    cardnumInput: function(t) {
        var a = this.data.setArray, e = t.target.dataset.index, n = t.target.dataset.indextwo;
        a[e].cardmsg[n].cardnum = t.detail.value, this.setData({
            setArray: a
        });
    },
    cardpassInput: function(t) {
        var a = this.data.setArray, e = t.target.dataset.index, n = t.target.dataset.indextwo;
        a[e].cardmsg[n].cardpass = t.detail.value, this.setData({
            setArray: a
        });
    },
    setinput: function(t) {
        var a = this.data.setArray, e = t.target.dataset.index, n = parseInt(t.detail.value);
        //限制奖品数量1000
        // if (t.detail.value > 999) {
        //   a[e].num = 1000, this.setData({
        //     setArray: a
        //   })
        //   return
        // }
        a[e].num = n, this.setData({
            setArray: a
        }), max_group_num = 0 <= n && n < 3 ? 0 : 3 <= n && n < 6 ? 3 : 6 <= n && n < 9 ? 6 : 9, 
        this.setData({
            max_group_num: max_group_num
        });   
    },
    setPlus: function(t) {
        var a = this.data.setArray, e = t.target.dataset.index, n = parseInt(a[e].num), s = n += 1;
        // 限制奖品数量1000
        // var nums = this.data.setArray[0].num;
        // if (nums > 999) {
        //   a[e].num = 1000, this.setData({
        //     setArray: a
        //   })
        //   return
        // }
        a[e].num = s, this.setData({
            setArray: a
        }), max_group_num = 0 <= s && s < 3 ? 0 : 3 <= s && s < 6 ? 3 : 6 <= s && s < 9 ? 6 : 9, 
        this.setData({
            max_group_num: max_group_num
        });  
    },
    setReduce: function(t) {
        var a = this.data.setArray, e = t.target.dataset.index, n = parseInt(a[e].num), s = n -= 1;
        0 < (a[e].num = s) && this.setData({
            setArray: a
        }), max_group_num = 0 <= s && s < 3 ? 0 : 3 <= s && s < 6 ? 3 : 6 <= s && s < 9 ? 6 : 9, 
        this.setData({
            max_group_num: max_group_num
        });
    },
    awardinput: function(t) {
        var a = parseInt(t.detail.value);
        //限制人数数量1000
        if(a > 999){
          var a = 1000
          this.setData({
            awardsNum: a
          });
        }else{
          this.setData({
            awardsNum: a
          });
        }
    },
    numreduce: function(t) {
        var a = this.data.awardsNum;
        1 < a && (a -= 1, this.setData({
            awardsNum: a
        }));
    },
    numplus: function(t) {
        var a = this.data.awardsNum;
        //限制人数数量1000 之上的无法增加
        if(a > 999){
          return;
        }else{
          a += 1, this.setData({
            awardsNum: a
          });
        }   
    },
    switch1Change: function(t) {
        this.setData({
            isshow: t.detail.value
        });
    },
    addCover: function(t) {
        var e = this, a = t.detail.formId, n = wx.getStorageSync("trd_session"), s = {};
        s.trd_session = n, s.formid = a;
        getApp();
        console.log("test"), wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var a = t.tempFilePaths;
                e.wecropper.pushOrign(a[0]), e.setData({
                    crop: !0
                });
            }
        });
    },
    touchStart: function(t) {
        this.wecropper.touchStart(t);
    },
    touchMove: function(t) {
        this.wecropper.touchMove(t);
    },
    touchEnd: function(t) {
        this.wecropper.touchEnd(t);
    },
    cropimg: function(t) {
        var s = this, n = t.detail.formId;
        this.wecropper.getCropperImage(function(t) {
            if (t) {
                var a = {};
                a.formid = n;
                var e = wx.getStorageSync("trd_session");
                a.trd_session = e, tools.upload(t, a, function(t) {
                    var a = JSON.parse(t.data);
                    console.log(a);
                    var e = a.info, n = tools.imageurl(e);
                    console.log(n), s.setData({
                        bgimg: n,
                        crop: !1,
                        attach_id: e
                    });
                });
            } else console.log("获取图片地址失败，请稍后重试");
        });
    },
    conditionChange: function(t) {
        this.setData({
            conIndex: t.detail.value
        });
    },
    changeDateTime1: function(t) {
        var a = this.data.dateTimeArray1, e = t.detail.value, n = a[0][e[0]] + "-" + a[1][e[1]] + "-" + a[2][e[2]] + " " + a[3][e[3]] + ":" + a[4][e[4]];
        this.setData({
            dateTime1: t.detail.value,
            startTime: n
        });
    },
    changeDateTimeColumn1: function(t) {
        var a = this.data.dateTime1, e = this.data.dateTimeArray1;
        a[t.detail.column] = t.detail.value, e[2] = dateTimePicker.getMonthDay(e[0][a[0]], e[1][a[1]]), 
        this.setData({
            dateTimeArray1: e,
            dateTime1: a
        });
    },
    businessInput: function(t) {
        this.setData({
            business: t.detail.value
        });
    },
    // phoneInput: function (t) {
    //   this.setData({
    //     phone: t.detail.value
    //   });
    // },
    appidInput: function(t) {
        this.data.appid = t.detail.value, console.log(t.detail.value);
    },
    appnameInput: function(t) {
        this.data.appname = t.detail.value, console.log(t.detail.value);
    },
    srcInput: function(t) {
        this.data.xcxpath = t.detail.value, console.log(t.detail.value);
    },
    paramsInput: function(t) {
        this.data.params = t.detail.value, console.log(t.detail.value);
    },
    jdexplain: function(t) {
        this.setData({
            jdexplain: t.detail.value,
            jdnum: t.detail.value.length
        });
    },
    cjexplain: function(t) {
        this.setData({
            remarks: t.detail.value,
            cjnum: t.detail.value.length
        });
    },
    copyJump: function(t) {
        var a = this;
        a.data.iscopyJump ? (a.data.isjump = 0, a.setData({
            iscopyJump: !1,
            ispay: !1
        })) : (a.data.isjump = 1, a.setData({
            layer: !0,
            texthidden: !0
        }));
    },
    layerclose: function(t) {
        // var that=this
        that.data.isjump = 0, this.setData({
            layer: !1,
            texthidden: !1
        });
    },
    confirm: function(t) {
        this.setData({
            iscopyJump: !0,
            ispay: !0,
            layer: !1,
            texthidden: !1
        });
    },
    payswitch: function(t) {
        var a = t.currentTarget.dataset.id;
        this.data.copyorjump = a, this.setData({
            copyorjump: a
        });
    },
    copyInput: function(t) {
        this.setData({
            copyname: t.detail.value
        });
    },
    group: function(t) {
        this.data.group ? this.setData({
            group: !1
        }) : this.setData({
            group: !0
        });
    },
    groupno: function(t) {
        this.setData({
            group: !1
        });
    },
    againcard: function(t) {
        var a = this.data.setArray, e = t.currentTarget.dataset.index;
        a[e].cardmsg.push({
            cardnum: "",
            cardpass: ""
        }), 3 <= a[e].cardmsg.length && (max_group_num = 3), this.setData({
            setArray: a,
            max_group_num: max_group_num
        });
    },
    isgroup: function(t) {
        this.data.max_group_num < 3 ? tools.showNotice("奖品数量不足") : this.data.isgroup ? this.setData({
            isgroup: !1
        }) : this.setData({
            isgroup: !0
        });
    },
    //上首页
    isindex: function (t) {
      this.data.isindex ? this.setData({
        isindex: !1
      }) : this.setData({
        isindex: !0
      });
    },
    explainChange: function(t) {
        this.setData({
            expIndex: t.detail.value
        });
    },
    addImg: function() {
        var s = this;
        s.data.imgs && 3 <= s.data.imgs.length ? tools.showNotice("最多上传3张") : wx.chooseImage({
            count: 1,
            success: function(t) {
                var a = [];
                s.data.imgs && (a = s.data.imgs), t.tempFiles.forEach(function(t) {
                    a.push(t.path);
                }), s.setData({
                    imgs: a
                });
                var e = {}, n = wx.getStorageSync("trd_session");
                e.trd_session = n, tools.upload(t.tempFiles[0].path, e, function(t) {
                    var a = JSON.parse(t.data).info, e = s.data.remarksImg + a + ",";
                    s.setData({
                        remarksImg: e
                    });
                });
            }
        });
    },
    submit: function(e) {
        var n = this, t = {}, a = wx.getStorageSync("trd_session");
        t.formid = e.detail.formId, t.trd_session = a, t.isjump = n.data.isjump, t.copyorjump = n.data.copyorjump, 
        t.attach_id = n.data.attach_id;
        var s = n.data.jdexplain, i = n.data.remarks, o = n.data.remarksImg;
        o = "," == o.substring(o.length - 1) ? o.substring(0, o.length - 1) : o, t.title = s, 
        0 == n.data.expIndex && (t.desc_type = 0, t.description = i), 1 == n.data.expIndex && (t.desc_type = 1, 
        t.description = o), t.uname = n.data.business, t.wechat_no = n.data.copyname, console.log("test" + n.data.isjump), 
        1 == n.data.isjump && 2 == n.data.copyorjump && (t.appid = n.data.appid, console.log(n.data.appid), 
        t.path = n.data.xcxpath, t.extraData = n.data.params, t.appname = n.data.appname), 
        n.data.iscopyJump || (t.wechat_no = "");
        var r = n.data.setArray;
        if (0 != r[0].prIndex || "" != r[0].prize) if (1 != r[0].prIndex || "" != r[0].money) if (2 != r[0].prIndex || "" != r[0].cardname) {
            if (t.fir_num = r[0].num, t.fir_ptype = r[0].prIndex, t.fir_cname = r[0].cardname, 
            t.fir_cardmsg = r[0].cardmsg, 0 == r[0].prIndex ? t.fir_val = r[0].prize : t.fir_val = r[0].money, 
            r[1]) {
                if (0 == r[1].prIndex && "" == r[1].prize) return void tools.showNotice("请输入奖品名称");
                if (1 == r[1].prIndex && "" == r[1].money) return void tools.showNotice("请输入红包金额");
                if (2 == r[1].prIndex && "" == r[1].cardname) return void tools.showNotice("请输入卡名称");
                t.sec_num = r[1].num, t.sec_ptype = r[1].prIndex, t.sec_cname = r[1].cardname, t.sec_cardmsg = r[1].cardmsg, 
                0 == r[1].prIndex ? t.sec_val = r[1].prize : t.sec_val = r[1].money;
            } else t.sec_num = n.data.sec_num, t.sec_ptype = n.data.sec_ptype, t.sec_val = n.data.sec_val;
            if (r[2]) {
                if (0 == r[2].prIndex && "" == r[2].prize) return void tools.showNotice("请输入奖品名称");
                if (1 == r[2].prIndex && "" == r[2].money) return void tools.showNotice("请输入现金金额");
                if (2 == r[2].prIndex && "" == r[2].cardname) return void tools.showNotice("请输入卡名称");
                t.trd_num = r[2].num, t.trd_ptype = r[2].prIndex, t.trd_cname = r[2].cardname, t.trd_cardmsg = r[2].cardmsg, 
                0 == r[2].prIndex ? t.trd_val = r[2].prize : t.trd_val = r[2].money;
            } else t.trd_num = n.data.trd_num, t.trd_ptype = n.data.trd_ptype, t.trd_val = n.data.trd_val;
            if (n.data.isgroup ? t.max_group_num = n.data.max_group_num : t.max_group_num = 0, 
            1 == n.data.conIndex) console.log(n.data.awardsNum), t.type = "people", t.typedesc = "达到参与人数自动开奖", 
            t.typevalue = n.data.awardsNum; else if (0 == n.data.conIndex) {
                if (t.type = "time", t.typedesc = "达到设定时间自动开奖", "请选择时间" == n.data.startTime) return void tools.showNotice("请选择时间");
                t.typevalue = n.data.startTime;
            } else t.type = "manual", t.typedesc = "由发起者手动开奖", t.typevalue = "";
            var d = getApp();
            tools.requset("?i=" + d.siteInfo.uniacid + "&c=entry&op=receive_card&do=add&m=" + d.modules_name + "&a=wxapp", t, function(t) {
                if (2 == t.status) wx.requestPayment({
                    timeStamp: t.info.timeStamp,
                    nonceStr: t.info.nonceStr,
                    package: t.info.package,
                    signType: t.info.signType,
                    paySign: t.info.paySign,
                    success: function(t) {
                        setTimeout(function() {
                            n.submit(e);
                        }, 1500);
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                }); else if (0 == t.status) tools.showNotice(t.info); else {
                    var a = t.info;
                    wx.navigateTo({
                        url: "../partake/partake?id=" + a
                    });
                }
                return !0;
            });
        } else tools.showNotice("请输入卡名称"); else tools.showNotice("请输入红包金额"); else tools.showNotice("请输入奖品名称");
    },
    goback: tools.gobackhome
});