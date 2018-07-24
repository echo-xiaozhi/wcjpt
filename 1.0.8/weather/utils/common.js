var cityBank = [], homeIndex = 0, bmap = require("bmap-wx.js");

function init() {
    try {
        var a = new bmap.BMapWX({
            ak: "UnMeMmKOwfL2jYjTq1VU3TAgCIsqb6Gf"
        }), e = wx.getStorageSync("citys");
        if (e) console.log("有缓存"), cityBank = e; else {
            console.log("没有缓存");
            a.weather({
                fail: function(a) {
                    console.log(a);
                },
                success: function(a) {
                    var e = a.currentWeather[0];
                    e.fullData = a.originalData.results[0], cityBank.push(e), homeIndex = 0;
                    try {
                        wx.setStorageSync("citys", cityBank), wx.setStorageSync("index", homeIndex);
                    } catch (a) {}
                }
            });
        }
    } catch (a) {
        console.log("缓存出问题啦!");
    }
}

function getToday() {
    var a = new Date();
    return a.getFullYear() + "年 " + (a.getMonth() + 1) + "月 " + a.getDate() + "日";
}

function windHelper(a) {
    return a;
}

function pmText(a) {
    return a <= 35 ? "空气质量优" : 35 < a && a <= 75 ? "空气质量良好" : 75 < a && a <= 115 ? "空气轻度污染" : 115 < a && a <= 150 ? "空气中度污染" : 150 < a && a <= 250 ? "空气重度污染" : 250 < a ? "空气非常污染" : void 0;
}

function getHomeData() {
    return cityBank[homeIndex];
}

function getCityList() {
    for (var a = [], e = 0; e < cityBank.length; e++) {
        var s = {};
        s.name = cityBank[e].currentCity, s.index = e, s.icon = homeIndex == e ? 0 : 1, 
        a.push(s);
    }
    return a;
}

function getCity() {
    return cityBank;
}

function refreshCity(a) {
    homeIndex = wx.getStorageSync("index");
    for (var e = -1, s = 0; s < cityBank.length; s++) cityBank[s].currentCity == a.currentCity && (cityBank[s] = a, 
    e = s);
    -1 == e ? (cityBank.push(a), homeIndex = cityBank.length - 1) : homeIndex = e, wx.setStorageSync("index", homeIndex);
}

function addCity(a) {
    for (var e = -1, s = 0; s < cityBank.length; s++) cityBank[s].currentCity == a.currentCity && (e = s);
    -1 == e && (cityBank.push(a), wx.setStorageSync("citys", cityBank));
}

function checkXY(a) {
    return "89,36";
}

function readXJCitys() {
    return JSON.parse('{"province":[{"cityzh":"北京市","location":"116.5,39.9"},{"cityzh":"天津市","location":"117.2,39.1"},{"cityzh":"上海市","location":"121.5,31.15"},{"cityzh":"重庆市","location":"106.5,29.5"},{"cityzh":"石家庄市","location":"114.52,38.04"},{"cityzh":"郑州市","location":"113.63,34.75"},{"cityzh":"武汉市","location":"114.31,30.59"},{"cityzh":"长沙市","location":"112.94,28.23"},{"cityzh":"南京市","location":"118.80,32.06"},{"cityzh":"南昌市","location":"115.86,28.68"},{"cityzh":"沈阳市","location":"123.43,41.81"},{"cityzh":"长春市","location":"125.33,43.82"},{"cityzh":"哈尔滨市","location":"126.54,45.80"},{"cityzh":"西安市","location":"108.94,34.34"},{"cityzh":"太原市","location":"112.55,37.87"},{"cityzh":"济南市","location":"117.02,36.68"},{"cityzh":"成都市","location":"104.07,30.57"},{"cityzh":"西宁市","location":"101.78,36.62"},{"cityzh":"合肥市","location":"117.23,31.82"},{"cityzh":"海口市","location":"110.20,20.05"},{"cityzh":"广州市","location":"113.27,23.13"},{"cityzh":"贵阳市","location":"106.63,26.65"},{"cityzh":"杭州市","location":"120.16,30.28"},{"cityzh":"福州市","location":"119.30,26.08"},{"cityzh":"兰州市","location":"103.84,36.06"},{"cityzh":"昆明市","location":"102.83,24.88"},{"cityzh":"拉萨市","location":"91.12,29.65"},{"cityzh":"银川市","location":"106.23,38.49"},{"cityzh":"南宁市","location":"108.37,22.82"},{"cityzh":"乌鲁木齐市","location":"87.62,43.83"},{"cityzh":"呼和浩特市","location":"111.75,40.84"},{"cityzh":"香港市","location":"114.17,22.28"},{"cityzh":"澳门市","location":"113.54,22.19"}]}');
}

function iconChanger(a) {
    var e = a, s = {}, t = new Date().getHours(), i = "w", c = "day";
    switch (18 < t || t < 6 ? (i = "n", c = "night") : (i = "w", c = "day"), a) {
      case "--":
        a = "../../images/w/" + i + "01", s.status = e, s.wall = "../../images/clear" + c;
        break;

      case "晴":
        a = "../../images/w/" + i + "00", s.status = e, s.wall = "../../images/clear" + c;
        break;

      case "多云":
        a = "../../images/w/" + i + "01", s.status = e, s.wall = "../../images/cloud" + c;
        break;

      case "阴":
        a = "../../images/w/" + i + "02", s.status = e, s.wall = "../../images/cloud" + c;
        break;

      case "阴转小雨":
        a = "../../images/w/" + i + "03", s.wall = "../../images/clear" + c;
        break;

      case "阵雨":
        a = "../../images/w/" + i + "03", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "雷阵雨":
        a = "../../images/w/" + i + "04", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "雷阵雨伴有冰雹":
        a = "../../images/w/" + i + "05", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "雨夹雪转大雪":
      case "雨夹雪":
        a = "../../images/w/" + i + "06", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "小雨":
        a = "../../images/w/" + i + "07", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "中雨":
        a = "../../images/w/" + i + "08", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "大雨":
        a = "../../images/w/" + i + "09", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "暴雨":
        a = "../../images/w/" + i + "10", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "大暴雨":
        a = "../../images/w/" + i + "11", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "特大暴雨":
        a = "../../images/w/" + i + "12", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "阵雪":
        a = "../../images/w/" + i + "13", s.status = e, s.wall = "../../images/snow" + c;
        break;

      case "小雪":
        a = "../../images/w/" + i + "14", s.status = e, s.wall = "../../images/snow" + c;
        break;

      case "中雪":
        a = "../../images/w/" + i + "15", s.status = e, s.wall = "../../images/snow" + c;
        break;

      case "大雪":
        a = "../../images/w/" + i + "16", s.status = e, s.wall = "../../images/snow" + c;
        break;

      case "暴雪":
        a = "../../images/w/" + i + "17", s.status = e, s.wall = "../../images/snow" + c;
        break;

      case "雾":
        a = "../../images/w/" + i + "18", s.status = e, s.wall = "../../images/cloud" + c;
        break;

      case "冻雨":
        a = "../../images/w/" + i + "19", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "沙尘暴":
        a = "../../images/w/" + i + "20", s.status = e, s.wall = "../../images/sandday";
        break;

      case "小到中雨":
        a = "../../images/w/" + i + "21", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "中到大雨":
        a = "../../images/w/" + i + "22", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "大到暴雨":
        a = "../../images/w/" + i + "23", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "暴雨到大暴雨":
        a = "../../images/w/" + i + "24", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "大暴雨到特大暴雨":
        a = "../../images/w/" + i + "25", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "小到中雪":
        a = "../../images/w/" + i + "26", s.status = e, s.wall = "../../images/snow" + c;
        break;

      case "中到大雪":
        a = "../../images/w/" + i + "27", s.status = e, s.wall = "../../images/snow" + c;
        break;

      case "大到暴雪":
        a = "../../images/w/" + i + "28", s.status = e, s.wall = "../../images/snow" + c;
        break;

      case "浮尘":
        a = "../../images/w/" + i + "29", s.status = e, s.wall = "../../images/sandday";
        break;

      case "扬沙":
        a = "../../images/w/" + i + "30", s.status = e, s.wall = "../../images/sandday";
        break;

      case "强沙尘暴":
        a = "../../images/w/" + i + "32", s.status = e, s.wall = "../../images/sandday";
        break;

      case "霾":
        a = "../../images/w/" + i + "32", s.status = e, s.wall = "../../images/cloud" + c;
        break;

      case "无":
        a = "../../images/w/" + i + "01", s.status = e, s.wall = "../../images/clear" + c;
        break;

      default:
        return console.log(" **************** 没有匹配到: " + a), (s = iconChangerExtra(a)).status = e, 
        s;
    }
    return s.icon = a, s;
}

function iconChangerExtra(a) {
    var e = a;
    a = a.split("转")[0];
    var s = {}, t = new Date().getHours(), i = "w", c = "day";
    switch (18 < t || t < 6 ? (i = "n", c = "night") : (i = "w", c = "day"), a) {
      case "--":
        a = "../../images/w/" + i + "01", s.status = e, s.wall = "../../images/clear" + c;
        break;

      case "晴":
        a = "../../images/w/" + i + "00", s.status = e, s.wall = "../../images/clear" + c;
        break;

      case "多云":
        a = "../../images/w/" + i + "01", s.status = e, s.wall = "../../images/cloud" + c;
        break;

      case "阴":
        a = "../../images/w/" + i + "02", s.status = e, s.wall = "../../images/cloud" + c;
        break;

      case "阵雨":
        a = "../../images/w/" + i + "03", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "雷阵雨":
        a = "../../images/w/" + i + "04", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "雷阵雨伴有冰雹":
        a = "../../images/w/" + i + "05", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "雨夹雪":
        a = "../../images/w/" + i + "06", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "小雨":
        a = "../../images/w/" + i + "07", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "中雨":
        a = "../../images/w/" + i + "08", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "大雨":
        a = "../../images/w/" + i + "09", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "暴雨":
        a = "../../images/w/" + i + "10", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "大暴雨":
        a = "../../images/w/" + i + "11", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "特大暴雨":
        a = "../../images/w/" + i + "12", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "阵雪":
        a = "../../images/w/" + i + "13", s.status = e, s.wall = "../../images/snow" + c;
        break;

      case "小雪":
        a = "../../images/w/" + i + "14", s.status = e, s.wall = "../../images/snow" + c;
        break;

      case "中雪":
        a = "../../images/w/" + i + "15", s.status = e, s.wall = "../../images/snow" + c;
        break;

      case "大雪":
        a = "../../images/w/" + i + "16", s.status = e, s.wall = "../../images/snow" + c;
        break;

      case "暴雪":
        a = "../../images/w/" + i + "17", s.status = e, s.wall = "../../images/snow" + c;
        break;

      case "雾":
        a = "../../images/w/" + i + "18", s.status = e, s.wall = "../../images/cloud" + c;
        break;

      case "冻雨":
        a = "../../images/w/" + i + "19", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "沙尘暴":
        a = "../../images/w/" + i + "20", s.status = e, s.wall = "../../images/sandday";
        break;

      case "小到中雨":
        a = "../../images/w/" + i + "21", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "中到大雨":
        a = "../../images/w/" + i + "22", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "大到暴雨":
        a = "../../images/w/" + i + "23", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "暴雨到大暴雨":
        a = "../../images/w/" + i + "24", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "大暴雨到特大暴雨":
        a = "../../images/w/" + i + "25", s.status = e, s.wall = "../../images/rainy" + c;
        break;

      case "小到中雪":
        a = "../../images/w/" + i + "26", s.status = e, s.wall = "../../images/snow" + c;
        break;

      case "中到大雪":
        a = "../../images/w/" + i + "27", s.status = e, s.wall = "../../images/snow" + c;
        break;

      case "大到暴雪":
        a = "../../images/w/" + i + "28", s.status = e, s.wall = "../../images/snow" + c;
        break;

      case "浮尘":
        a = "../../images/w/" + i + "29", s.status = e, s.wall = "../../images/sandday";
        break;

      case "扬沙":
        a = "../../images/w/" + i + "30", s.status = e, s.wall = "../../images/sandday";
        break;

      case "强沙尘暴":
        a = "../../images/w/" + i + "32", s.status = e, s.wall = "../../images/sandday";
        break;

      case "霾":
        a = "../../images/w/" + i + "32", s.status = e, s.wall = "../../images/cloud" + c;
        break;

      case "无":
      default:
        a = "../../images/w/" + i + "01", s.status = e, s.wall = "../../images/clear" + c;
    }
    return s.icon = a, s;
}

module.exports = {
    readXJCitys: readXJCitys,
    init: init,
    getHomeData: getHomeData,
    getCityList: getCityList,
    addCity: addCity,
    refreshCity: refreshCity,
    getToday: getToday,
    getCity: getCity,
    iconChanger: iconChanger,
    windHelper: windHelper,
    pmText: pmText
};