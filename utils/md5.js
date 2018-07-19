function safe_add(n, r) {
    var f = (65535 & n) + (65535 & r);
    return (n >> 16) + (r >> 16) + (f >> 16) << 16 | 65535 & f;
}

function rol(n, r) {
    return n << r | n >>> 32 - r;
}

function cmn(n, r, f, i, t, e) {
    return safe_add(rol(safe_add(safe_add(r, n), safe_add(i, e)), t), f);
}

function ff(n, r, f, i, t, e, h) {
    return cmn(r & f | ~r & i, n, r, t, e, h);
}

function gg(n, r, f, i, t, e, h) {
    return cmn(r & i | f & ~i, n, r, t, e, h);
}

function hh(n, r, f, i, t, e, h) {
    return cmn(r ^ f ^ i, n, r, t, e, h);
}

function ii(n, r, f, i, t, e, h) {
    return cmn(f ^ (r | ~i), n, r, t, e, h);
}

function coreMD5(n) {
    for (var r = 1732584193, f = -271733879, i = -1732584194, t = 271733878, e = 0; e < n.length; e += 16) {
        var h = r, g = f, c = i, o = t;
        f = ii(f = ii(f = ii(f = ii(f = hh(f = hh(f = hh(f = hh(f = gg(f = gg(f = gg(f = gg(f = ff(f = ff(f = ff(f = ff(f, i = ff(i, t = ff(t, r = ff(r, f, i, t, n[e + 0], 7, -680876936), f, i, n[e + 1], 12, -389564586), r, f, n[e + 2], 17, 606105819), t, r, n[e + 3], 22, -1044525330), i = ff(i, t = ff(t, r = ff(r, f, i, t, n[e + 4], 7, -176418897), f, i, n[e + 5], 12, 1200080426), r, f, n[e + 6], 17, -1473231341), t, r, n[e + 7], 22, -45705983), i = ff(i, t = ff(t, r = ff(r, f, i, t, n[e + 8], 7, 1770035416), f, i, n[e + 9], 12, -1958414417), r, f, n[e + 10], 17, -42063), t, r, n[e + 11], 22, -1990404162), i = ff(i, t = ff(t, r = ff(r, f, i, t, n[e + 12], 7, 1804603682), f, i, n[e + 13], 12, -40341101), r, f, n[e + 14], 17, -1502002290), t, r, n[e + 15], 22, 1236535329), i = gg(i, t = gg(t, r = gg(r, f, i, t, n[e + 1], 5, -165796510), f, i, n[e + 6], 9, -1069501632), r, f, n[e + 11], 14, 643717713), t, r, n[e + 0], 20, -373897302), i = gg(i, t = gg(t, r = gg(r, f, i, t, n[e + 5], 5, -701558691), f, i, n[e + 10], 9, 38016083), r, f, n[e + 15], 14, -660478335), t, r, n[e + 4], 20, -405537848), i = gg(i, t = gg(t, r = gg(r, f, i, t, n[e + 9], 5, 568446438), f, i, n[e + 14], 9, -1019803690), r, f, n[e + 3], 14, -187363961), t, r, n[e + 8], 20, 1163531501), i = gg(i, t = gg(t, r = gg(r, f, i, t, n[e + 13], 5, -1444681467), f, i, n[e + 2], 9, -51403784), r, f, n[e + 7], 14, 1735328473), t, r, n[e + 12], 20, -1926607734), i = hh(i, t = hh(t, r = hh(r, f, i, t, n[e + 5], 4, -378558), f, i, n[e + 8], 11, -2022574463), r, f, n[e + 11], 16, 1839030562), t, r, n[e + 14], 23, -35309556), i = hh(i, t = hh(t, r = hh(r, f, i, t, n[e + 1], 4, -1530992060), f, i, n[e + 4], 11, 1272893353), r, f, n[e + 7], 16, -155497632), t, r, n[e + 10], 23, -1094730640), i = hh(i, t = hh(t, r = hh(r, f, i, t, n[e + 13], 4, 681279174), f, i, n[e + 0], 11, -358537222), r, f, n[e + 3], 16, -722521979), t, r, n[e + 6], 23, 76029189), i = hh(i, t = hh(t, r = hh(r, f, i, t, n[e + 9], 4, -640364487), f, i, n[e + 12], 11, -421815835), r, f, n[e + 15], 16, 530742520), t, r, n[e + 2], 23, -995338651), i = ii(i, t = ii(t, r = ii(r, f, i, t, n[e + 0], 6, -198630844), f, i, n[e + 7], 10, 1126891415), r, f, n[e + 14], 15, -1416354905), t, r, n[e + 5], 21, -57434055), i = ii(i, t = ii(t, r = ii(r, f, i, t, n[e + 12], 6, 1700485571), f, i, n[e + 3], 10, -1894986606), r, f, n[e + 10], 15, -1051523), t, r, n[e + 1], 21, -2054922799), i = ii(i, t = ii(t, r = ii(r, f, i, t, n[e + 8], 6, 1873313359), f, i, n[e + 15], 10, -30611744), r, f, n[e + 6], 15, -1560198380), t, r, n[e + 13], 21, 1309151649), i = ii(i, t = ii(t, r = ii(r, f, i, t, n[e + 4], 6, -145523070), f, i, n[e + 11], 10, -1120210379), r, f, n[e + 2], 15, 718787259), t, r, n[e + 9], 21, -343485551), 
        r = safe_add(r, h), f = safe_add(f, g), i = safe_add(i, c), t = safe_add(t, o);
    }
    return [ r, f, i, t ];
}

function binl2hex(n) {
    for (var r = "0123456789abcdef", f = "", i = 0; i < 4 * n.length; i++) f += r.charAt(n[i >> 2] >> i % 4 * 8 + 4 & 15) + r.charAt(n[i >> 2] >> i % 4 * 8 & 15);
    return f;
}

function binl2b64(n) {
    for (var r = "", f = 0; f < 32 * n.length; f += 6) r += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n[f >> 5] << f % 32 & 63 | n[f >> 6] >> 32 - f % 32 & 63);
    return r;
}

function str2binl(n) {
    for (var r = 1 + (n.length + 8 >> 6), f = new Array(16 * r), i = 0; i < 16 * r; i++) f[i] = 0;
    for (i = 0; i < n.length; i++) f[i >> 2] |= (255 & n.charCodeAt(i)) << i % 4 * 8;
    return f[i >> 2] |= 128 << i % 4 * 8, f[16 * r - 2] = 8 * n.length, f;
}

function strw2binl(n) {
    for (var r = 1 + (n.length + 4 >> 5), f = new Array(16 * r), i = 0; i < 16 * r; i++) f[i] = 0;
    for (i = 0; i < n.length; i++) f[i >> 1] |= n.charCodeAt(i) << i % 2 * 16;
    return f[i >> 1] |= 128 << i % 2 * 16, f[16 * r - 2] = 16 * n.length, f;
}

function hexMD5(n) {
    return binl2hex(coreMD5(str2binl(n)));
}

function hexMD5w(n) {
    return binl2hex(coreMD5(strw2binl(n)));
}

function b64MD5(n) {
    return binl2b64(coreMD5(str2binl(n)));
}

function b64MD5w(n) {
    return binl2b64(coreMD5(strw2binl(n)));
}

function calcMD5(n) {
    return binl2hex(coreMD5(str2binl(n)));
}

module.exports = {
    hexMD5: hexMD5
};