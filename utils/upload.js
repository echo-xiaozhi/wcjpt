var current, upload_domain = "https://z.9xy.cn/Index/upload", queue = [], ids = [], uploadTask = null, stepback = function() {}, callback = function() {}, uploads = function(u, a, n) {
    0 === u.length && showNotice("请选择图片"), "function" == typeof a && (callback = a), 
    "function" == typeof n && (stepback = n), queue = u, startUpload();
}, startUpload = function() {
    current = 0, uploading();
}, uploading = function() {
    uploadTask = wx.uploadFile({
        url: upload_domain,
        filePath: queue[current],
        name: "file",
        success: function(u) {
            var a = JSON.parse(u.data);
            1 == a.status ? (ids.push(a.info.id), uploadnext()) : wx.showToast({
                title: a.info
            });
        }
    });
}, uploadnext = function() {
    stepback(current), queue[++current] ? uploading() : uploadend();
}, uploadend = function() {
    callback(ids);
};

module.exports = {
    uploads: uploads
};