var tools = require("../../utils/tools.js");
function getProblem(e) {
  var t = getApp(), n = wx.getStorageSync("trd_session");
  tools.requset("?i=" + t.siteInfo.uniacid + "&c=entry&op=receive_card&do=problem&m=" + t.modules_name + "&a=wxapp", {
    trd_session: n
  }, function (t) {
    e.setData({
      list: t.info
    });
  });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {
      headtxt: "问题",
      unitid: tools.unitid
    },
    report: [
      { name: '欺诈', id: '1', checked: true},
      { name: '色情', id: '1' },
      { name: '政治谣言', id: '1' },
      { name: '常识性谣言', id: '1' },
      { name: '诱导分享', id: '1' },
      { name: '恶意营销', id: '1' },
      { name: '隐私信息收集', id: '1' },
      { name: '其他侵权类（冒名丶诽谤丶抄袭)', id: '1' },
    ],
    phone: '',
    wxh:'',
    radioValue:'欺诈'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().tabhead(this), getProblem(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  bindphoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindwxhInput: function (e) {
    this.setData({
      wxh: e.detail.value
    })
  },
  radioChange: function (e) {
    this.setData({
      radioValue: e.detail.value
    })

  },
  TiSure: function () {
    let d = getApp(),phone = this.data.phone, weixinh = this.data.wxh, radio = this.data.radioValue,
      n = {
        trd_session: wx.getStorageSync("trd_session"),
        key: "advertisement",
        phone: phone,
        weixin: weixinh,
        info: radio
      };
    if (!weixinh) {
      wx.showLoading({
        title: '请填写微信号',
        duration: 900
      })
      return
    }
    wx.showLoading({
      title: '提交中'
    })
    tools.requset("?i=" + d.siteInfo.uniacid + "&c=entry&op=receive_card&do=addjubao&m=" + d.modules_name + "&a=wxapp", n, function (t) {
      if (t.status === 1) {
        wx.showLoading({
          title: t.info,
          duration: 800
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '../../pages/news/news'
          })
        }, 800)
      }
      if (t.status === 2) {
        wx.showLoading({
          title: t.info,
          duration: 500
        })
      }
    });
  }
})