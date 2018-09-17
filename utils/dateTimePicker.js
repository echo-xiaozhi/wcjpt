function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

function withData(t) {
    return t < 10 ? "0" + t : "" + t;
}

function getLoopArray(t, e) {
    e = e || 1;
    for (var a = [], r = t = t || 0; r <= e; r++) a.push(withData(r));
    return a;
}

function getMonthDay(t, e) {
    var a = t % 400 == 0 || t % 4 == 0 && t % 100 != 0, r = null;
    switch (e) {
      case "01":
      case "03":
      case "05":
      case "07":
      case "08":
      case "10":
      case "12":
        r = getLoopArray(1, 31);
        break;

      case "04":
      case "06":
      case "09":
      case "11":
        r = getLoopArray(1, 30);
        break;

      case "02":
        r = getLoopArray(1, a ? 29 : 28);
        break;

      default:
        r = "月份格式不正确，请重新输入！";
    }
    return r;
}

function getNewDateArry() {
    var t = new Date();
    return [ withData(t.getFullYear()), withData(t.getMonth() + 1), withData(t.getDate()), withData(t.getHours()), withData(t.getMinutes()), withData(t.getSeconds()) ];
}

function fun_date(aa) {
  var date1 = new Date(),
    time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
  var date2 = new Date(date1);
    date2.setDate(date1.getDate() + aa);
  var time2 = date2.getDate();
  // var aa = [];
  // aa.push(time2)
  // console.log(aa)
  return time2
}

function dateTimePicker(t, e, a) {
    var r = [], o = [ [], [], [], [], [], [] ], 
        n = t.getFullYear() || 1978,
        i = e.getFullYear() || 2100,
        Mn = t.getMonth() + 1,
        Mi = e.getMonth() + 1,
        Dn = t.getDate(),
        Di = e.getDate(),
        s = a ? [].concat(_toConsumableArray(a.split(" ")[0].split("-")), _toConsumableArray(a.split(" ")[1].split(":"))) : getNewDateArry();
    let DayTime = [];
  for (let i = 0; i <= 6; i++) {
      var date1 = t,
      time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
      var date2 = new Date(date1);
        date2.setDate(date1.getDate() + i);
      var time2 = date2.getDate()
        DayTime.push(time2)
    }
     return o[0] = getLoopArray(n, i), 
            o[1] = getLoopArray(Mn, Mi),
            o[2] = DayTime,
            o[3] = getLoopArray(0, 23), 
            o[4] = getLoopArray(0, 59),
    o.forEach(function(t, e) {
        r.push(t.indexOf(s[e]));
    }), {
        dateTimeArray: o,
        dateTime: r
    };
}

module.exports = {
    dateTimePicker: dateTimePicker,
    getMonthDay: getMonthDay
};