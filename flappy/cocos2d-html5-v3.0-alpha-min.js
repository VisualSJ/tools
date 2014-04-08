function c(a) {
    throw a;
}
var h = void 0, k = !0, l = null, p = !1;
function r() {
    return function (a) {
        return a
    }
}
function u() {
    return function () {
    }
}
function v(a) {
    return function (b) {
        this[a] = b
    }
}
function w(a) {
    return function () {
        return this[a]
    }
}
function B(a) {
    return function () {
        return a
    }
}
var C = C || {};
C.b = {};
E = window;
E = Object.prototype;
delete window._p;
C.W = function (a) {
    return document.createElement(a)
};
C.I = function (a, b, d, e) {
    a.addEventListener(b, d, e)
};
C.il = "undefined" !== typeof require && require("fs");
C.qm = function (a, b) {
    if (a)if (a instanceof Array)for (var d = 0, e = a.length; d < e && b.call(h, a[d], d) !== p; d++); else for (d in a)if (b.call(h, a[d], d) === p)break
};
C.Hj = function (a) {
    if (!a)return C.log("invalid URL"), p;
    var b = a.indexOf("://");
    if (-1 == b)return p;
    b = a.indexOf("/", b + 3);
    return(-1 == b ? a : a.substring(0, b)) != location.origin
};
C.async = {Mk: function (a) {
    var b = this.nm;
    if (!b.yj) {
        var d = b.length, e = b.Qm, f = b.Km, g = f.ua, m = f.em, n = f.Zj, f = f.ED;
        if (a) {
            if (b.yj = a, g)return g.call(m, a)
        } else {
            var q = Array.apply(l, arguments).slice(1), s = q.length;
            0 == s ? q = l : 1 == s && (q = q[0]);
            e[this.index] = q;
            b.count--;
            n && n.call(f, q, d - b.count, d);
            0 == b.count && g && g.apply(m, [l, e])
        }
    }
}, Qk: u(), fB: function (a, b, d) {
    var e = C.async;
    d !== h ? ("function" == typeof b && (b = {Zj: b}), b.ua = d || b.ua) : b !== h ? "function" == typeof b && (b = {ua: b}) : a !== h ? b = {} : c("arguments error!");
    var f = (d = a instanceof Array) ?
        a.length : Object.keys(a).length;
    if (0 == f)b.ua && b.ua.call(b.em, l); else {
        var g = {length: f, count: f, Km: b, Qm: d ? [] : {}};
        C.qm(a, function (a, d) {
            if (g.yj)return p;
            var f = !b.ua && !b.Zj ? e.Qk : e.Mk.bind({nm: g, index: d});
            a(f, d)
        })
    }
}, map: function (a, b, d) {
    var e = this, f = arguments.length;
    "function" == typeof b && (b = {Ij: b});
    3 === f ? b.ua = d || b.ua : 2 != f && c("arguments error!");
    "function" == typeof b && (b = {Ij: b});
    d !== h ? b.ua = d || b.ua : b === h && c("arguments error!");
    var g = (f = a instanceof Array) ? a.length : Object.keys(a).length;
    if (0 == g)b.ua && b.ua.call(b.em,
        l); else {
        var m = {length: g, count: g, Km: b, Qm: f ? [] : {}};
        C.qm(a, function (a, d) {
            if (m.yj)return p;
            var f = !b.ua ? e.Qk : e.Mk.bind({nm: m, index: d});
            b.Ij.call(b.Sr, a, d, f)
        })
    }
}};
C.path = {join: function () {
    for (var a = arguments.length, b = "", d = 0; d < a; d++)b = (b + ("" == b ? "" : "/") + arguments[d]).replace(/(\/|\\\\)$/, "");
    return b
}, zd: function (a) {
    return(a = /(\.[^\.\/\?\\]*)(\?.*)?$/.exec(a)) ? a[1] : l
}, rq: function (a, b) {
    var d = a.indexOf("?");
    0 < d && (a = a.substring(0, d));
    d = /(\/|\\\\)([^(\/|\\\\)]+)$/g.exec(a.replace(/(\/|\\\\)$/, ""));
    if (!d)return l;
    d = d[2];
    return b && a.substring(a.length - b.length).toLowerCase() == b.toLowerCase() ? d.substring(0, d.length - b.length) : d
}, dirname: function (a) {
    return a.replace(/(\/|\\\\)$/,
        "").replace(/(\/|\\\\)[^(\/|\\\\)]+$/, "")
}, uq: function (a, b) {
    b = b || "";
    var d = a.indexOf("?"), e = "";
    0 < d && (e = a.substring(d), a = a.substring(0, d));
    d = a.lastIndexOf(".");
    return 0 > d ? a + b + e : a.substring(0, d) + b + e
}, fm: function (a, b, d) {
    if (0 == b.indexOf("."))return this.uq(a, b);
    var e = a.indexOf("?"), f = "";
    d = d ? this.zd(a) : "";
    0 < e && (f = a.substring(e), a = a.substring(0, e));
    e = a.lastIndexOf("/");
    return a.substring(0, 0 >= e ? 0 : e + 1) + b + d + f
}};
C.r = {kl: {}, Ag: {}, op: {}, Rd: {}, qh: "", Qx: "", Qb: {}, ym: function () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject("MSXML2.XMLHTTP")
}, Vk: function (a) {
    var b = a[0], d = a[1], e = a[2], f = ["", l, l];
    1 === a.length ? f[1] = b instanceof Array ? b : [b] : 2 === a.length ? "function" == typeof d ? (f[1] = b instanceof Array ? b : [b], f[2] = d) : (f[0] = b || "", f[1] = d instanceof Array ? d : [d]) : 3 === a.length ? (f[0] = b || "", f[1] = d instanceof Array ? d : [d], f[2] = e) : c("arguments error to load js!");
    return f
}, Wr: function (a, b, d) {
    var e = this, f =
        e.kl, g = e.Vk(arguments);
    -1 < navigator.userAgent.indexOf("Trident/5") ? e.ol(g[0], g[1], 0, g[2]) : C.async.map(g[1], function (a, b, d) {
        a = C.path.join(g[0], a);
        if (f[a])return d(l);
        e.Nk(a, p, d)
    }, g[2])
}, Fm: function (a, b, d) {
    var e = this.pp(), f = this.Vk(arguments);
    this.Wr(f[0], f[1], function (a) {
        a && c(a);
        e.parentNode.removeChild(e);
        if (f[2])f[2]()
    })
}, Nk: function (a, b, d) {
    var e = document, f = C.W("script");
    f.async = b;
    f.src = a;
    this.kl[a] = k;
    C.I(f, "load", function () {
        this.removeEventListener("load", arguments.callee, p);
        d()
    }, p);
    C.I(f, "error",
        function () {
            d("Load " + a + " failed!")
        }, p);
    e.body.appendChild(f)
}, ol: function (a, b, d, e) {
    if (d >= b.length)e && e(); else {
        var f = this;
        f.Nk(C.path.join(a, b[d]), p, function (g) {
            if (g)return e(g);
            f.ol(a, b, d + 1, e)
        })
    }
}, pp: function () {
    var a = document, b = a.getElementById("cocos2d_loadJsImg");
    if (!b) {
        b = C.W("img");
        C.tp && (b.src = C.tp);
        a = a.getElementById(C.Ea.ob.id);
        a.style.backgroundColor = "black";
        a.parentNode.appendChild(b);
        var d = getComputedStyle ? getComputedStyle(a) : a.currentStyle;
        b.style.left = a.offsetLeft + (parseFloat(d.width) -
            b.width) / 2 + "px";
        b.style.top = a.offsetTop + (parseFloat(d.height) - b.height) / 2 + "px";
        b.style.position = "absolute"
    }
    return b
}, Jj: function (a, b) {
    if (C.il)require("fs").oB(a, function (a, d) {
        a ? b(a) : b(l, d.toString())
    }); else {
        var d = this.ym(), e = "load " + a + " failed!";
        d.open("GET", a, k);
        /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) ? (d.setRequestHeader("Accept-Charset", "utf-8"), d.onreadystatechange = function () {
            4 == d.readyState && 200 == d.status ? b(l, d.responseText) : b(e)
        }) : (d.overrideMimeType && d.overrideMimeType("text/plain; charset\x3dutf-8"),
            d.onload = function () {
                4 == d.readyState && 200 == d.status ? b(l, d.responseText) : b(e)
            });
        d.send(l)
    }
}, rp: function (a) {
    if (C.il)return require("fs").pB(a).toString();
    var b = this.ym();
    b.open("GET", a, p);
    /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) ? b.setRequestHeader("Accept-Charset", "utf-8") : b.overrideMimeType && b.overrideMimeType("text/plain; charset\x3dutf-8");
    b.send(l);
    return 4 == !b.readyState || 200 != b.status ? l : b.responseText
}, Gm: function (a, b) {
    this.Jj(a, function (d, e) {
        try {
            d ? b(d) : b(l, JSON.parse(e))
        } catch (f) {
            c("load json [" +
                a + "] failed : " + f)
        }
    })
}, Ao: function (a) {
    return/(\.png)|(\.jpg)|(\.bmp)|(\.jpeg)|(\.gif)/.exec(a) != l
}, Zg: function (a, b, d) {
    var e = k;
    d !== h ? e = b.Hj == l ? e : b.Hj : b !== h && (d = b);
    var f = new Image;
    e && (f.crossOrigin = "Anonymous");
    C.I(f, "load", function () {
        this.removeEventListener("load", arguments.callee, p);
        this.removeEventListener("error", arguments.callee, p);
        d && d(l, f)
    });
    C.I(f, "error", function () {
        this.removeEventListener("error", arguments.callee, p);
        d && d("load image failed")
    });
    f.src = a;
    return f
}, qp: function (a, b, d) {
    var e = this,
        f = l, g = a.type;
    g ? (g = "." + g.toLowerCase(), f = a.src ? a.src : a.name + g) : (f = a, g = C.path.zd(f));
    if (b = e.Qb[f])return d(l, b);
    b = e.Ag[g.toLowerCase()];
    if (!b)return d("loader for [" + g + "] not exists!");
    g = b.zj ? b.zj() : e.qh;
    g = e.xr(g, f);
    b.load(g, f, a, function (a, b) {
        a ? (C.log(a), e.Qb[f] = l, d()) : (e.Qb[f] = b, d(l, b))
    })
}, xr: function (a, b) {
    var d = this.op, e = C.path;
    if (a !== h && b === h) {
        b = a;
        var f = e.zd(b), f = f ? f.toLowerCase() : "";
        a = (f = this.Ag[f]) ? f.zj ? f.zj() : this.qh : this.qh
    }
    b = C.path.join(a || "", b);
    if (b.match(/[\/(\\\\)]lang[\/(\\\\)]/i)) {
        if (d[b])return d[b];
        e = e.zd(b) || "";
        b = d[b] = b.substring(0, b.length - e.length) + "_" + C.ga.language + e
    }
    return b
}, load: function (a, b, d) {
    d !== h ? "function" == typeof b && (b = {Zj: b}) : b !== h ? "function" == typeof b && (d = b, b = {}) : a !== h ? b = {} : c("arguments error!");
    b.ua = function (a, b) {
        a && C.log(a);
        d && d(b)
    };
    a instanceof Array || (a = [a]);
    b.Ij = this.qp;
    b.Sr = this;
    C.async.map(a, b)
}, bl: function (a, b) {
    var d = this.Rd, e = [], f;
    for (f in a) {
        var g = a[f];
        d[f] = g;
        e.push(g)
    }
    this.load(e, b)
}, xA: function (a, b) {
    var d = this, e = d.zf(a);
    e ? d.bl(e.filenames, b) : d.load(a, function (a) {
        d.bl(a[0].filenames,
            b)
    })
}, ze: function (a, b) {
    if (a && b) {
        if ("string" == typeof a)return this.Ag[a.trim().toLowerCase()] = b;
        for (var d = 0, e = a.length; d < e; d++)this.Ag["." + a[d].trim().toLowerCase()] = b
    }
}, zf: function (a) {
    return this.Qb[a] || this.Qb[this.Rd[a]]
}, oh: function (a) {
    var b = this.Qb, d = this.Rd;
    delete b[a];
    delete b[d[a]];
    delete d[a]
}, wB: function () {
    var a = this.Qb, b = this.Rd, d;
    for (d in a)delete a[d];
    for (d in b)delete b[d]
}};
(function () {
    function a() {
        C.A && C.Ea.Cc && C.A.dispatchEvent(C.Ea.Cc)
    }

    function b() {
        C.A && C.Ea.Bc && C.A.dispatchEvent(C.Ea.Bc)
    }

    var d = window, e, f;
    "undefined" !== typeof document.hidden ? (e = "hidden", f = "visibilitychange") : "undefined" !== typeof document.zA ? (e = "mozHidden", f = "mozvisibilitychange") : "undefined" !== typeof document.AA ? (e = "msHidden", f = "msvisibilitychange") : "undefined" !== typeof document.PD && (e = "webkitHidden", f = "webkitvisibilitychange");
    e ? C.I(document, f, function () {
        document[e] ? b() : a()
    }, p) : (C.I(d, "blur", b, p),
        C.I(d, "focus", a, p));
    "onpageshow"in window && "onpagehide"in window && (C.I(d, "pagehide", b, p), C.I(d, "pageshow", a, p));
    f = d = l
})();
C.log = C.warn = C.error = C.assert = u();
C.om = function (a, b) {
    for (var d = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"], e = l, f = 0; f < d.length; ++f) {
        try {
            e = a.getContext(d[f], b)
        } catch (g) {
        }
        if (e)break
    }
    return e
};
C.fp = function (a, b) {
    C.za = 0;
    C.uc = 1;
    var d = C.ga = {};
    d.Qn = "en";
    d.Hu = "zh";
    d.Iu = "fr";
    d.Lu = "it";
    d.Ju = "de";
    d.Su = "es";
    d.Ru = "ru";
    d.Nu = "ko";
    d.Mu = "ja";
    d.Ku = "hu";
    d.Qu = "pt";
    d.Gu = "ar";
    d.Ou = "no";
    d.Pu = "pl";
    d.Wn = "Windows";
    d.mk = "iOS";
    d.nk = "OS X";
    d.Un = "UNIX";
    d.Tn = "Linux";
    d.Sn = "Android";
    d.Vn = "Unknown";
    d.An = "wechat";
    d.vn = "androidbrowser";
    d.zh = "ie";
    d.xn = "qqbrowser";
    d.wn = "mqqbrowser";
    d.yn = "ucbrowser";
    d.Ct = "360browser";
    d.Dt = "baiduboxapp";
    d.ck = "baidubrowser";
    d.Et = "maxthon";
    d.Ah = "opera";
    d.Ft = "miuibrowser";
    d.Sf = "firefox";
    d.Bh =
        "safari";
    d.yh = "chrome";
    d.zn = "unknown";
    d.Or = p;
    var e = [d.ck, d.Ah, d.Sf, d.yh, d.Bh], f = [d.ck, d.Ah, d.Sf, d.yh, d.Bh, d.yn, d.xn, d.wn, d.zh], g = window, m = g.navigator, n = document.documentElement, q = m.userAgent.toLowerCase();
    d.Dd = -1 != q.indexOf("mobile") || -1 != q.indexOf("android");
    var s = m.language, s = (s = s ? s : m.browserLanguage) ? s.split("-")[0] : d.Qn;
    d.language = s;
    var s = d.zn, t = q.match(/micromessenger|qqbrowser|mqqbrowser|ucbrowser|360browser|baiduboxapp|baidubrowser|maxthon|trident|opera|miuibrowser|firefox/i) || q.match(/chrome|safari/i);
    t && 0 < t.length && (s = t[0].toLowerCase(), "micromessenger" == s ? s = d.An : "safari" === s && q.match(/android.*applewebkit/) ? s = d.vn : "trident" == s && (s = d.zh));
    d.rf = s;
    d.mx = -1 < f.indexOf(d.rf);
    f = parseInt(a[b.ph]);
    s = C.uc;
    t = C.W("Canvas");
    C.hf = k;
    e = -1 == e.indexOf(d.rf);
    if (1 === f || 0 === f && (d.Dd || e))s = C.za;
    if (s == C.uc && (!g.WebGLRenderingContext || !C.om(t, {stencil: k, preserveDrawingBuffer: k})))0 == f ? s = C.za : C.hf = p;
    if (s == C.za)try {
        t.getContext("2d")
    } catch (x) {
        C.hf = p
    }
    C.ma = s;
    try {
        d.gq = !!new (g.AudioContext || g.webkitAudioContext || g.mozAudioContext)
    } catch (y) {
        d.gq =
            p
    }
    try {
        var z = d.localStorage = g.localStorage;
        z.setItem("storage", "");
        z.removeItem("storage");
        z = l
    } catch (A) {
        ("SECURITY_ERR" === A.name || "QuotaExceededError" === A.name) && C.warn("Warning: localStorage isn't enabled. Please confirm browser cookie or privacy option"), d.localStorage = u()
    }
    z = d.uj = {canvas: k};
    C.ma == C.uc && (z.opengl = k);
    n.ontouchstart !== h || m.msPointerEnabled ? z.touches = k : n.onmouseup !== h && (z.mouse = k);
    n.onkeyup !== h && (z.keyboard = k);
    if (g.DeviceMotionEvent || g.DeviceOrientationEvent)z.accelerometer = k;
    g = q.match(/(iPad|iPhone|iPod)/i) ?
        k : p;
    q = q.match(/android/i) || m.platform.match(/android/i) ? k : p;
    n = d.Vn;
    -1 != m.appVersion.indexOf("Win") ? n = d.Wn : g ? n = d.mk : -1 != m.appVersion.indexOf("Mac") ? n = d.nk : -1 != m.appVersion.indexOf("X11") ? n = d.Un : -1 != m.appVersion.indexOf("Linux") ? n = d.Tn : q && (n = d.Sn);
    d.Lj = n;
    d.zy = u();
    d.py = u();
    d.XB = u();
    d.ny = function () {
        var a;
        a = "" + ("isMobile : " + this.Dd + "\r\n");
        a += "language : " + this.language + "\r\n";
        a += "browserType : " + this.rf + "\r\n";
        a += "capabilities : " + JSON.stringify(this.uj) + "\r\n";
        a += "os : " + this.Lj + "\r\n";
        C.log(a)
    }
};
C.wv = 0;
C.xv = 1;
C.uv = 2;
C.vv = 3;
C.pg = l;
C.L = l;
C.D = l;
C.Ko = l;
C.Hp = p;
C.Rl = function (a) {
    var b, d, e = window;
    e.Oj = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame;
    var f = C.B(a) || C.B("#" + a), g;
    "CANVAS" == f.tagName ? (b = b || f.width, d = d || f.height, g = C.xd = C.W("DIV"), a = C.D = f, a.parentNode.insertBefore(g, a), a.dm(g), g.setAttribute("id", "Cocos2dGameContainer")) : ("DIV" != f.tagName && C.log("Warning: target element is not a DIV or CANVAS"), b = b || f.clientWidth, d = d || f.clientHeight, g = C.xd = f, a = C.D = C.W("CANVAS"),
        f.appendChild(a));
    a.cm("gameCanvas");
    a.setAttribute("width", b || 480);
    a.setAttribute("height", d || 320);
    f = g.style;
    f.width = (b || 480) + "px";
    f.height = (d || 320) + "px";
    f.margin = "0 auto";
    f.position = "relative";
    f.overflow = "hidden";
    g.top = "100%";
    C.ma == C.uc && (C.L = C.OD = C.om(a, {stencil: k, preserveDrawingBuffer: k, antialias: !C.ga.Dd, alpha: p}));
    C.L ? (e.gl = C.L, C.pg = new C.pu(C.L), C.Hp = k, C.Ga.ip(), C.$s.Uw()) : (C.L = a.getContext("2d"), C.Yw = C.L, C.L.translate(0, a.height), C.pg = C.Kn ? new C.Kn(C.L) : l);
    C.Ko = g;
    C.log(C.gk);
    C.Op();
    C.ga.Dd &&
    (b = C.W("style"), b.type = "text/css", document.body.appendChild(b), b.textContent = "body,canvas,div{ -moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;-webkit-tap-highlight-color:rgba(0,0,0,0);}");
    C.view = C.Eh.oi();
    C.Ir.os(C.D);
    C.N = C.X.oi();
    C.N.Ls();
    C.wh = C.N.V;
    C.aC = new C.rk;
    C.cs = new C.Zn
};
C.Gw = function () {
    C.ma !== C.uc && c("This feature supports WebGL render mode only.")
};
C.hl = p;
C.Op = function () {
    C.hl = p;
    C.D.oncontextmenu = function () {
        if (!C.hl)return p
    }
};
C.Ea = {Zt: 0, Xt: 1, $t: 2, Vt: 3, Yt: 4, au: 5, Wt: 6, Gh: "game_on_hide", Wf: "game_on_show", Bc: l, Cc: l, Zw: [], qc: {xj: "engineDir", gy: "dependencies", wj: "debugMode", at: "showFPS", Rg: "frameRate", id: "id", ph: "renderMode", Tr: "jsList", vq: "classReleaseMode"}, zl: p, Ii: p, la: k, ti: l, ob: l, Kj: l, CA: l, uC: function (a) {
    this.ob[this.qc.Rg] = a;
    this.ti && clearInterval(this.ti);
    this.la = k;
    this.Ti()
}, Ti: function () {
    var a = this, b, d = a.ob, e = a.qc, f = window, g = d[e.Rg], m = C.N;
    m.As(d[e.at]);
    f.Oj && 60 == g ? (b = function () {
        a.la || (m.Hm(), f.Oj(b))
    }, f.Oj(b)) : (b = function () {
        m.Hm()
    },
        a.ti = setInterval(b, 1E3 / g));
    a.la = p
}, vs: function () {
    var a = this;
    a.zl ? C.hf && (a.Co = setInterval(function () {
        a.Ii && (C.Rl(a.ob[a.qc.id]), a.Ti(), a.Bc = a.Bc || new C.Xb(a.Gh), a.Bc.setUserData(a), a.Cc = a.Cc || new C.Xb(a.Wf), a.Cc.setUserData(a), a.Kj(), clearInterval(a.Co))
    }, 10)) : a.fs(function () {
        C.hf && (C.Rl(a.ob[a.qc.id]), a.Ti(), a.Bc = a.Bc || new C.Xb(a.Gh), a.Bc.setUserData(a), a.Cc = a.Cc || new C.Xb(a.Wf), a.Cc.setUserData(a), a.Kj())
    })
}, dp: function () {
    function a(a) {
        a[b.xj] = a[b.xj] || "frameworks/cocos2d-html5";
        a[b.wj] = a[b.wj] ||
            0;
        a[b.Rg] = a[b.Rg] || 60;
        a[b.ph] = a[b.ph] || 0;
        return a
    }

    var b = this.qc;
    if (document.ccConfig)this.ob = a(document.ccConfig); else try {
        var d = C.r.rp("project.json"), e = JSON.parse(d);
        this.ob = a(e || {})
    } catch (f) {
        C.log("Failed to read or parse project.json"), this.ob = a({})
    }
    C.fp(this.ob, b)
}, mp: {}, Xk: function (a, b, d) {
    var e = this.mp;
    if (e[b])return l;
    d = d || "";
    var f = [], g = a[b];
    g || c("can not find module [" + b + "]");
    b = C.path;
    for (var m = 0, n = g.length; m < n; m++) {
        var q = g[m];
        if (!e[q]) {
            var s = b.zd(q);
            s ? ".js" == s.toLowerCase() && f.push(b.join(d,
                q)) : (s = this.Xk(a, q, d)) && (f = f.concat(s));
            e[q] = 1
        }
    }
    return f
}, fs: function (a) {
    var b = this, d = b.ob, e = b.qc, f = d[e.xj], g = C.r;
    if (C.hf) {
        b.zl = k;
        var m = d[e.Tr] || [];
        C.P ? g.Fm("", m, function (d) {
            d && c(d);
            b.Ii = k;
            a && a()
        }) : (e = C.path.join(f, "moduleConfig.json"), g.Gm(e, function (e, g) {
            e && c(e);
            var s = d.modules || [], t = g.module, x = [];
            C.ma == C.uc ? s.splice(0, 0, "shaders") : 0 > s.indexOf("core") && s.splice(0, 0, "core");
            for (var y = 0, z = s.length; y < z; y++) {
                var A = b.Xk(t, s[y], f);
                A && (x = x.concat(A))
            }
            x = x.concat(m);
            C.r.Fm(x, function (d) {
                d && c(d);
                b.Ii = k;
                a &&
                a()
            })
        }))
    } else C.error("Can not support render!")
}};
C.Ea.dp();
var C = C || {}, F = {id: 0 | 998 * Math.random(), Jr: 0 | 998 * Math.random(), im: function (a, b, d) {
    a = a.toString();
    var e = a.substring(a.indexOf("(") + 1, a.indexOf(")")), e = e.trim();
    for (a = a.substring(a.indexOf("{") + 1, a.lastIndexOf("}")); -1 != a.indexOf("this._super");) {
        var f = a.indexOf("this._super"), g = a.indexOf("(", f), m = a.substring(g + 1, a.indexOf(")", g)), m = m.trim();
        a = a.substring(0, f) + "ClassManager[" + d + "]." + b + ".call(this" + (m ? "," : "") + a.substring(g + 1)
    }
    return Function(e, a)
}, fr: function () {
    return this.id++
}, gr: function () {
    return this.Jr++
}};
F.im.Ut = F;
(function () {
    var a = /\b_super\b/, b = C.Ea.ob[C.Ea.qc.vq];
    b && console.log("release Mode");
    C.P = u();
    C.P.extend = function (d) {
        function e() {
            this.p = F.gr();
            this.ctor && this.ctor.apply(this, arguments)
        }

        var f = this.prototype, g = Object.create(f), m = F.fr();
        F[m] = f;
        var n = {writable: k, enumerable: p, configurable: k};
        g.p = l;
        e.id = m;
        n.value = m;
        Object.defineProperty(g, "__pid", n);
        e.prototype = g;
        n.value = e;
        Object.defineProperty(e.prototype, "constructor", n);
        this.Db && (e.Db = C.Da(this.Db));
        this.Eb && (e.Eb = C.Da(this.Eb));
        for (var q in d) {
            var s = "function" === typeof d[q], t = "function" === typeof f[q], x = a.test(d[q]);
            b && s && t && x ? (n.value = F.im(d[q], q, m), Object.defineProperty(g, q, n)) : s && t && x ? (n.value = function (a, b) {
                return function () {
                    var d = this._super;
                    this._super = f[a];
                    var e = b.apply(this, arguments);
                    this._super = d;
                    return e
                }
            }(q, d[q]), Object.defineProperty(g, q, n)) : s ? (n.value = d[q], Object.defineProperty(g, q, n)) : g[q] = d[q];
            if (s) {
                var y, z;
                if (this.Db && this.Db[q]) {
                    var s = this.Db[q], A;
                    for (A in this.Eb)if (this.Eb[A] == s) {
                        z = A;
                        break
                    }
                    C.d(g, s, d[q], d[z] ? d[z] : g[z], q, z)
                }
                if (this.Eb && this.Eb[q]) {
                    s =
                        this.Eb[q];
                    for (A in this.Db)if (this.Db[A] == s) {
                        y = A;
                        break
                    }
                    C.d(g, s, d[y] ? d[y] : g[y], d[q], y, q)
                }
            }
        }
        e.extend = C.P.extend;
        e.Zz = function (a) {
            for (var b in a)g[b] = a[b]
        };
        return e
    };
    Function.prototype.bind = Function.prototype.bind || function (a) {
        var b = this;
        return function () {
            var f = Array.prototype.slice.call(arguments);
            return b.apply(a || l, f)
        }
    }
})();
C.d = function (a, b, d, e, f, g) {
    if (a.__defineGetter__)d && a.__defineGetter__(b, d), e && a.__defineSetter__(b, e); else if (Object.defineProperty) {
        var m = {enumerable: p, configurable: k};
        d && (m.get = d);
        e && (m.set = e);
        Object.defineProperty(a, b, m)
    } else c(Error("browser does not support getters"));
    if (!f && !g)for (var m = d != l, n = e != h, q = Object.getOwnPropertyNames(a), s = 0; s < q.length; s++) {
        var t = q[s];
        if (!(a.__lookupGetter__(t) || "function" !== typeof a[t])) {
            var x = a[t];
            if (m && x === d && (f = t, !n || g))break;
            if (n && x === e && (g = t, !m || f))break
        }
    }
    a = a.constructor;
    f && (a.Db || (a.Db = {}), a.Db[f] = b);
    g && (a.Eb || (a.Eb = {}), a.Eb[g] = b)
};
C.Da = function (a) {
    var b = a.constructor ? new a.constructor : {}, d;
    for (d in a) {
        var e = a[d];
        b[d] = "object" == typeof e && e && !(e instanceof C.q) && !(e instanceof HTMLElement) ? C.Da(e) : e
    }
    return b
};
C.Cv = function (a, b) {
    this.x = a || 0;
    this.y = b || 0
};
C.c = function (a, b) {
    return a == h ? {x: 0, y: 0} : b == h ? {x: a.x, y: a.y} : {x: a, y: b}
};
C.jB = function (a, b) {
    return a && b && a.x === b.x && a.y === b.y
};
C.Tv = function (a, b) {
    this.width = a || 0;
    this.height = b || 0
};
C.size = function (a, b) {
    return a === h ? {width: 0, height: 0} : b === h ? {width: a.width, height: a.height} : {width: a, height: b}
};
C.fD = function (a, b) {
    return a && b && a.width == b.width && a.height == b.height
};
C.bo = function (a, b, d, e) {
    this.x = a || 0;
    this.y = b || 0;
    this.width = d || 0;
    this.height = e || 0
};
C.rect = function (a, b, d, e) {
    return a === h ? {x: 0, y: 0, width: 0, height: 0} : b === h ? {x: a.x, y: a.y, width: a.width, height: a.height} : {x: a, y: b, width: d, height: e}
};
C.ns = function (a, b) {
    return a && b && a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height
};
C.Fp = function (a) {
    return a && 0 === a.x && 0 === a.y && 0 === a.width && 0 === a.height
};
C.qB = function (a, b) {
    return!a || !b ? p : !(a.x >= b.x || a.y >= b.y || a.x + a.width <= b.x + b.width || a.y + a.height <= b.y + b.height)
};
C.Gd = function (a) {
    return a.x + a.width
};
C.rB = function (a) {
    return a.x + a.width / 2
};
C.Xc = function (a) {
    return a.x
};
C.Hd = function (a) {
    return a.y + a.height
};
C.sB = function (a) {
    return a.y + a.height / 2
};
C.Yc = function (a) {
    return a.y
};
C.ms = function (a, b) {
    return b.x >= C.Xc(a) && b.x <= C.Gd(a) && b.y >= C.Yc(a) && b.y <= C.Hd(a)
};
C.uB = function (a, b) {
    return!(C.Gd(a) < C.Xc(b) || C.Gd(b) < C.Xc(a) || C.Hd(a) < C.Yc(b) || C.Hd(b) < C.Yc(a))
};
C.vB = function (a, b) {
    return!(a.x + a.width < b.x || b.x + b.width < a.x || a.y + a.height < b.y || b.y + b.height < a.y)
};
C.Om = function (a, b) {
    var d = C.rect(0, 0, 0, 0);
    d.x = Math.min(a.x, b.x);
    d.y = Math.min(a.y, b.y);
    d.width = Math.max(a.x + a.width, b.x + b.width) - d.x;
    d.height = Math.max(a.y + a.height, b.y + b.height) - d.y;
    return d
};
C.tB = function (a, b) {
    var d = C.rect(Math.max(C.Xc(a), C.Xc(b)), Math.max(C.Yc(a), C.Yc(b)), 0, 0);
    d.width = Math.min(C.Gd(a), C.Gd(b)) - C.Xc(d);
    d.height = Math.min(C.Hd(a), C.Hd(b)) - C.Yc(d);
    return d
};
C.rk = C.P.extend({vl: l, wi: l, ctor: function () {
    window.DOMParser ? (this.wi = k, this.vl = new DOMParser) : this.wi = p
}, parse: function (a) {
    return this.ul(a)
}, ul: function (a) {
    var b;
    this.wi ? b = this.vl.parseFromString(a, "text/xml") : (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a));
    return b
}});
C.Zn = C.rk.extend({parse: function (a) {
    a = this.ul(a).documentElement;
    "plist" != a.tagName && c("Not a plist file!");
    for (var b = l, d = 0, e = a.childNodes.length; d < e && !(b = a.childNodes[d], 1 == b.nodeType); d++);
    return this.Fi(b)
}, Fi: function (a) {
    var b = l, d = a.tagName;
    if ("dict" == d)b = this.zp(a); else if ("array" == d)b = this.yp(a); else if ("string" == d)if (1 == a.childNodes.length)b = a.firstChild.nodeValue; else {
        b = "";
        for (d = 0; d < a.childNodes.length; d++)b += a.childNodes[d].nodeValue
    } else"false" == d ? b = p : "true" == d ? b = k : "real" == d ? b = parseFloat(a.firstChild.nodeValue) :
        "integer" == d && (b = parseInt(a.firstChild.nodeValue, 10));
    return b
}, yp: function (a) {
    for (var b = [], d = 0, e = a.childNodes.length; d < e; d++) {
        var f = a.childNodes[d];
        1 == f.nodeType && b.push(this.Fi(f))
    }
    return b
}, zp: function (a) {
    for (var b = {}, d = l, e = 0, f = a.childNodes.length; e < f; e++) {
        var g = a.childNodes[e];
        1 == g.nodeType && ("key" == g.tagName ? d = g.firstChild.nodeValue : b[d] = this.Fi(g))
    }
    return b
}});
C.jq = {load: function (a, b, d, e) {
    C.r.Jj(a, e)
}};
C.r.ze(["txt", "xml", "vsh", "fsh"], C.jq);
C.np = {load: function (a, b, d, e) {
    C.r.Gm(a, e)
}};
C.r.ze(["json", "ExportJson"], C.np);
C.cp = {load: function (a, b, d, e) {
    C.r.Qb[b] = C.r.Zg(a, function (a, d) {
        if (a)return e(a);
        C.Ga.ab(b);
        e(l, d)
    })
}};
C.r.ze(["png", "jpg", "bmp", "jpeg", "gif"], C.cp);
C.Jp = {load: function (a, b, d, e) {
    C.r.Qb[b] = C.r.Zg(d.src, function (a, d) {
        if (a)return e(a);
        C.Ga.ab(b);
        e(l, d)
    })
}};
C.r.ze(["serverImg"], C.Jp);
C.Cp = {load: function (a, b, d, e) {
    C.r.Jj(a, function (a, b) {
        if (a)return e(a);
        e(l, C.cs.parse(b))
    })
}};
C.r.ze(["plist"], C.Cp);
C.Io = {io: {eot: "embedded-opentype", ttf: "truetype", woff: "woff", svg: "svg"}, nl: function (a, b, d) {
    var e = document, f = C.path, g = this.io, m = C.W("style");
    m.type = "text/css";
    e.body.appendChild(m);
    var n = "@font-face { font-family:" + a + "; src:";
    if (b instanceof Array)for (var q = 0, s = b.length; q < s; q++)d = f.zd(b[q]), n += "url('" + b[q] + "') format('" + g[d] + "')", n += q == s - 1 ? ";" : ","; else n += "url('" + b + "') format('" + g[d] + "');";
    m.textContent += n + "};";
    b = C.W("div");
    d = b.style;
    d.fontFamily = a;
    b.innerHTML = ".";
    d.position = "absolute";
    d.left = "-100px";
    d.top = "-100px";
    e.body.appendChild(b)
}, load: function (a, b, d, e) {
    b = d.type;
    a = d.name;
    b = d.nD;
    "string" == typeof d ? (b = C.path.zd(d), a = C.path.rq(d, b), this.nl(a, d, b)) : this.nl(a, b);
    e(l, k)
}};
C.r.ze(["font", "eot", "ttf", "woff", "svg"], C.Io);
C.Dw = {load: function (a, b, d, e) {
    C.r.yA(a, e)
}};
C.gk = "Cocos2d-html5-v3.0 alpha";
C.Xf = 0;
C.Gn = C.c(0, 0);
C.Dn = 0.5;
C.St = 1;
C.eo = 1;
C.Rn = 0;
C.fw = 0;
C.gw = 0;
C.hw = 0;
C.Hv = 1;
C.Gv = "-hd";
C.lo = 1;
C.sk = 0;
C.Mv = 0;
C.Fu = 0;
C.Eu = 0;
C.Kh = 1;
C.bu = C.gk + "-canvas";
C.uu = 1;
C.tu = 1;
C.B = function (a) {
    var b = this == C ? document : this;
    if (a = a instanceof HTMLElement ? a : b.querySelector(a))a.find = a.find || C.B, a.Cj = a.Cj || function (a) {
        return this.className.match(RegExp("(\\s|^)" + a + "(\\s|$)"))
    }, a.cm = a.cm || function (a) {
        this.Cj(a) || (this.className && (this.className += " "), this.className += a);
        return this
    }, a.qs = a.qs || function (a) {
        this.Cj(a) && (this.className = this.className.replace(a, ""));
        return this
    }, a.remove = a.remove || function () {
        this.parentNode && this.parentNode.removeChild(this);
        return this
    }, a.dm = a.dm ||
        function (a) {
            a.appendChild(this);
            return this
        }, a.gs = a.gs || function (a) {
        a.childNodes[0] ? a.insertBefore(this, a.childNodes[0]) : a.appendChild(this);
        return this
    }, a.Mf = a.Mf || function () {
        this.style[C.B.et] = C.B.translate(this.position) + C.B.rotate(this.rotation) + C.B.scale(this.scale) + C.B.Ce(this.Ce);
        return this
    }, a.position = a.position || {x: 0, y: 0}, a.rotation = a.rotation || 0, a.scale = a.scale || {x: 1, y: 1}, a.Ce = a.Ce || {x: 0, y: 0}, a.DD = function (a, b) {
        this.position.x = a;
        this.position.y = b;
        this.Mf();
        return this
    }, a.rotate = function (a) {
        this.rotation =
            a;
        this.Mf();
        return this
    }, a.VB = function (a, b) {
        this.scale.x = a;
        this.scale.y = b;
        this.Mf();
        return this
    }, a.SC = function (a, b) {
        this.Ce.x = a;
        this.Ce.y = b;
        this.Mf();
        return this
    };
    return a
};
switch (C.ga.rf) {
    case C.ga.Sf:
        C.B.Jf = "Moz";
        C.B.ve = k;
        break;
    case C.ga.yh:
    case C.ga.Bh:
        C.B.Jf = "webkit";
        C.B.ve = k;
        break;
    case C.ga.Ah:
        C.B.Jf = "O";
        C.B.ve = p;
        break;
    case C.ga.zh:
        C.B.Jf = "ms";
        C.B.ve = p;
        break;
    default:
        C.B.Jf = "webkit", C.B.ve = k
}
C.B.et = C.B.Jf + "Transform";
C.B.translate = C.B.ve ? function (a) {
    return"translate3d(" + a.x + "px, " + a.y + "px, 0) "
} : function (a) {
    return"translate(" + a.x + "px, " + a.y + "px) "
};
C.B.rotate = C.B.ve ? function (a) {
    return"rotateZ(" + a + "deg) "
} : function (a) {
    return"rotate(" + a + "deg) "
};
C.B.scale = function (a) {
    return"scale(" + a.x + ", " + a.y + ") "
};
C.B.Ce = function (a) {
    return"skewX(" + -a.x + "deg) skewY(" + a.y + "deg)"
};
C.jt = function (a) {
    return C.B(document.createElement(a))
};
C.B.xy = function (a) {
    var b = 0, d = 0;
    do b += a.offsetLeft, d += a.offsetTop; while (a = a.offsetParent);
    return{x: b, y: d}
};
C.Bu = -1;
C.PI = Math.PI;
C.yu = parseFloat("3.402823466e+38F");
C.$n = C.PI / 180;
C.Cn = 180 / C.PI;
C.sw = 4294967295;
C.fo = function (a, b, d) {
    if ("object" == typeof d && "undefined" != typeof d.x && "undefined" != typeof d.y) {
        var e = d[a];
        d[a] = d[b];
        d[b] = e
    } else C.log(C.b.fo)
};
C.wA = function (a, b, d) {
    return a + (b - a) * d
};
C.Fv = function () {
    return 2 * (Math.random() - 0.5)
};
C.Ev = function () {
    return Math.random()
};
C.cu = function (a) {
    return a * C.$n
};
C.Dv = function (a) {
    return a * C.Cn
};
C.He = Number.MAX_VALUE - 1;
C.Rf = C.Rn ? 1 : 770;
C.Qf = 771;
C.Yu = function (a) {
    a.df && (a.df.JD(), a.df.$C())
};
C.su = u();
C.lu = u();
C.Au = function (a) {
    C.qe += a
};
C.xu = 1.192092896E-7;
C.ba = C.Kh ? function () {
    return C.N.gd
} : B(1);
C.Xn = function (a) {
    var b = C.ba();
    return C.c(a.x * b, a.y * b)
};
C.co = function (a) {
    var b = C.ba();
    return C.size(a.width * b, a.height * b)
};
C.Lv = function (a) {
    var b = C.ba();
    return C.size(a.width / b, a.height / b)
};
C.Bk = function (a, b) {
    var d = C.ba();
    b.width = a.width / d;
    b.height = a.height / d
};
C.zv = function (a) {
    var b = C.ba();
    return C.c(a.x / b, a.y / b)
};
C.Uh = function (a, b) {
    var d = C.ba();
    b.x = a.x / d;
    b.y = a.y / d
};
C.$f = C.Kh ? function (a) {
    var b = C.ba();
    return C.rect(a.x / b, a.y / b, a.width / b, a.height / b)
} : r();
C.Ge = C.Kh ? function (a) {
    var b = C.ba();
    return C.rect(a.x * b, a.y * b, a.width * b, a.height * b)
} : r();
C.ONE = 1;
C.ZERO = 0;
C.SRC_ALPHA = 770;
C.ONE_MINUS_SRC_ALPHA = 771;
C.ONE_MINUS_DST_COLOR = 775;
C.ek = function () {
    if (C.ph == C.uc) {
        var a = C.L.getError();
        a && C.log(CC.ka.ek, a)
    }
};
C.color = function (a, b, d, e) {
    return a === h ? {f: 0, e: 0, a: 0, g: 255} : "string" === typeof a ? C.Cr(a) : "object" === typeof a ? {f: a.f, e: a.e, a: a.a, g: a.g} : {f: a, e: b, a: d, g: e}
};
C.$x = function (a, b) {
    return a.f === b.f && a.e === b.e && a.a === b.a
};
C.tt = function (a, b, d, e) {
    this.x = a || 0;
    this.y = b || 0;
    this.it = d || 0;
    this.timestamp = e || 0
};
C.no = function (a, b) {
    this.x = a || 0;
    this.y = b || 0
};
C.MD = function (a, b) {
    return new C.no(a, b)
};
C.oo = function (a, b, d) {
    this.x = a || 0;
    this.y = b || 0;
    this.it = d || 0
};
C.ND = function (a, b, d) {
    return new C.oo(a, b, d)
};
C.jo = function (a, b) {
    this.va = a || 0;
    this.wa = b || 0
};
C.uD = function (a, b) {
    return new C.jo(a, b)
};
C.dk = function (a, b) {
    this.src = a;
    this.xb = b
};
C.Tx = function () {
    return new C.dk(C.ONE, C.ZERO)
};
C.Cr = function (a) {
    a = a.replace(/^#?/, "0x");
    a = parseInt(a);
    return C.color(a >> 16, (a >> 8) % 256, a % 256)
};
C.ay = function (a) {
    var b = a.f.toString(16), d = a.e.toString(16), e = a.a.toString(16);
    return"#" + (16 > a.f ? "0" + b : b) + (16 > a.e ? "0" + d : d) + (16 > a.a ? "0" + e : e)
};
C.uk = 0;
C.Qh = 1;
C.ho = 2;
C.Je = 0;
C.mo = 1;
C.xk = 2;
C.tw = C.P.extend({Zd: l, qf: l, Vh: 0, ctor: function () {
    this.Zd = {};
    this.qf = {};
    this.Vh = 2 << (0 | 10 * Math.random())
}, so: function () {
    this.Vh++;
    return"key_" + this.Vh
}, HC: function (a, b) {
    if (b != l) {
        var d = this.so();
        this.Zd[d] = b;
        this.qf[d] = a
    }
}, $r: function (a) {
    if (a == l)return l;
    var b = this.Zd, d;
    for (d in b)if (b[d] === a)return this.qf[d];
    return l
}, LD: function (a) {
    return this.$r(a)
}, ss: function (a) {
    if (a != l) {
        var b = this.Zd, d;
        for (d in b)if (b[d] === a) {
            delete this.qf[d];
            delete b[d];
            break
        }
    }
}, NB: function (a) {
    if (a != l)for (var b = 0; b < a.length; b++)this.ss(a[b])
},
    pq: function () {
        var a = [], b = this.Zd, d;
        for (d in b)a.push(b[d]);
        return a
    }, FB: function () {
        this.Zd = {};
        this.qf = {}
    }, count: function () {
        return this.pq().length
    }});
C.hk = function () {
    this.fontName = "Arial";
    this.fontSize = 12;
    this.textAlign = C.Qh;
    this.verticalAlign = C.Je;
    this.fillStyle = C.color(255, 255, 255, 255);
    this.boundingHeight = this.boundingWidth = 0;
    this.Xj = p;
    this.strokeStyle = C.color(255, 255, 255, 255);
    this.lineWidth = 1;
    this.ln = p;
    this.shadowBlur = this.shadowOffsetY = this.shadowOffsetX = 0;
    this.shadowOpacity = 1
};
C.mw = [];
C.nw = {};
C.Eh = C.P.extend({Iw: l, ta: l, hd: l, Mc: l, nb: l, le: l, Si: p, jd: 1, oj: "", Pi: l, G: 1, sl: 1, M: 1, tl: 1, Xd: 0, zi: 5, ub: l, Hl: l, Ll: l, Kl: l, Il: l, Jl: l, hp: p, Ew: p, rx: l, $k: l, al: l, nx: p, ai: l, Ec: l, ni: 1, eg: p, fl: k, ctor: function () {
    var a = document, b = C.rc, d = C.cb;
    this.Ec = C.xd.parentNode === a.body ? a.documentElement : C.xd.parentNode;
    this.ta = C.size(0, 0);
    this.si();
    var a = C.D.width, e = C.D.height;
    this.hd = C.size(a, e);
    this.Mc = C.size(a, e);
    this.nb = C.rect(0, 0, a, e);
    this.le = C.rect(0, 0, a, e);
    this.ai = {left: 0, top: 0};
    this.oj = "Cocos2dHTML5";
    a = C.ga;
    this.Eq(a.Lj ==
        a.mk || a.Lj == a.nk);
    C.ak && C.ak.O(this.hd);
    this.Hl = new C.Ha(b.Vf, d.Hh);
    this.Ll = new C.Ha(b.Yn, d.ag);
    this.Kl = new C.Ha(b.Vf, d.Oh);
    this.Il = new C.Ha(b.Vf, d.Ih);
    this.Jl = new C.Ha(b.Vf, d.Jh);
    this.$k = C.D;
    this.al = C.L
}, Qi: function () {
    var a = this.Mc.width, b = this.Mc.height;
    this.Pi && (this.si(), this.Pi.call());
    0 < a && this.Sj(a, b, this.ub)
}, WB: function (a) {
    a ? this.eg || (this.eg = k, a = this.Qi.bind(this), C.I(window, "resize", a, p)) : this.eg && (this.eg = k, a = this.Qi.bind(this), window.removeEventListener("resize", a, p))
}, PC: function (a) {
    if ("function" == typeof a || a == l)this.Pi = a
}, si: function () {
    var a = this.ta;
    a.width = this.Ec.clientWidth;
    a.height = this.Ec.clientHeight
}, Aw: function () {
    var a = this.Mc.width, b = this.Mc.height;
    0 < a && this.Sj(a, b, this.ub)
}, Yp: function () {
    if (this.fl) {
        var a = {"user-scalable": "no", "maximum-scale": "1.0", "initial-scale": "1.0"}, b = document.getElementsByName("viewport"), d;
        0 == b.length ? (b = C.W("meta"), b.name = "viewport", b.content = "", document.head.appendChild(b)) : b = b[0];
        if (C.ga.Dd && C.ga.rf == C.ga.Sf)b.content = "initial-scale:1"; else {
            d = b.content;
            for (var e in a)RegExp(e).test(d) || (d += ("" == d ? "" : ",") + e + "\x3d" + a[e]);
            b.content = d
        }
    }
}, jx: function () {
    var a = C.ba();
    this.M = this.G = a
}, ex: function () {
    this.G = this.sl;
    this.M = this.tl
}, Bw: u(), Hr: function () {
    this.hp = k
}, Cx: v("fl"), Eq: function (a) {
    this.Si = a ? k : p
}, oA: w("Si"), end: u(), mA: function () {
    return this.$k != l && this.al != l
}, wC: function (a) {
    this.ni = a;
    C.N.dn()
}, rD: u(), BC: u(), jC: function (a, b) {
    this.ai = {left: a, top: b}
}, My: w("ai"), Yq: function () {
    return C.size(this.ta.width, this.ta.height)
}, vC: function (a, b) {
    this.ta.width = a;
    this.ta.height = b;
    this.Ec.style.width = a + "px";
    this.Ec.style.height = b + "px";
    this.Qi();
    C.N.dn()
}, Wx: u(), Vg: function () {
    return C.size(this.le.width, this.le.height)
}, Br: function () {
    return C.c(this.le.x, this.le.y)
}, Vx: B(k), yz: w("ub"), Os: function (a) {
    if (a instanceof C.Ha)this.ub = a; else {
        var b = C.Ha;
        a === b.Hh && (this.ub = this.Hl);
        a === b.ag && (this.ub = this.Ll);
        a === b.Oh && (this.ub = this.Kl);
        a === b.Ih && (this.ub = this.Il);
        a === b.Jh && (this.ub = this.Jl)
    }
}, Sj: function (a, b, d) {
    if (isNaN(a) || 0 == a || isNaN(b) || 0 == b)C.log(C.b.qu); else {
        this.Os(d);
        var e = this.ub;
        if (e) {
            e.Fd(this);
            var f = this.ta.width, g = this.ta.height;
            C.ga.Dd && this.Yp(this.ta.width, this.ta.height);
            this.si();
            d == this.ub && a == this.Mc.width && b == this.Mc.height && f == this.ta.width && g == this.ta.height || (this.hd = C.size(a, b), this.Mc = C.size(a, b), a = e.apply(this, this.hd), a.scale && 2 == a.scale.length && (this.G = a.scale[0], this.M = a.scale[1]), a.viewport && (a = this.nb = a.viewport, b = this.le, b.width = C.D.width / this.G, b.height = C.D.height / this.M, b.x = -a.x / this.G, b.y = -a.y / this.M), a = C.N, a.V = this.Sq(), C.wh.width =
                a.V.width, C.wh.height = a.V.height, e.Ed(this), C.ma == C.uc && (a.ng(), a.yC()), this.sl = this.G, this.tl = this.M, C.Hn && C.Hn.dx(), C.ak && C.ak.O(this.Vg()))
        } else C.log(C.b.ru)
    }
}, Sq: function () {
    return C.size(this.hd.width, this.hd.height)
}, dD: function (a, b, d, e) {
    var f = this.ni, g = this.G, m = this.M;
    C.L.viewport(a * g * f + this.nb.x * f, b * m * f + this.nb.y * f, d * g * f, e * m * f)
}, RC: function (a, b, d, e) {
    var f = this.ni, g = this.G, m = this.M;
    C.L.scissor(a * g * f + this.nb.x * f, b * m * f + this.nb.y * f, d * g * f, e * m * f)
}, qA: function () {
    var a = C.L;
    return a.isEnabled(a.SCISSOR_TEST)
},
    Cz: function () {
        var a = C.L, b = this.G, d = this.M, a = a.getParameter(a.SCISSOR_BOX);
        return C.rect((a[0] - this.nb.x) / b, (a[1] - this.nb.y) / d, a[2] / b, a[3] / d)
    }, cD: function (a) {
        a != l && 0 < a.length && (this.oj = a)
    }, Sz: w("oj"), Tz: w("nb"), um: w("G"), vm: w("M"), Uy: w("jd"), jm: function (a, b, d) {
        return{x: this.jd * (a - d.left), y: this.jd * (d.top + d.height - b)}
    }, Eo: function (a, b) {
        var d = this.nb;
        a.x = (this.jd * (a.x - b.left) - d.x) / this.G;
        a.y = (this.jd * (b.top + b.height - a.y) - d.y) / this.M
    }, mg: function (a) {
        for (var b = this.nb, d = this.G, e = this.M, f, g, m, n = 0; n < a.length; n++)f =
            a[n], g = f.T, m = f.Nc, f.$i((g.x - b.x) / d, (g.y - b.y) / e), f.fe((m.x - b.x) / d, (m.y - b.y) / e)
    }});
C.Eh.oi = function () {
    this.sg || (this.sg = this.sg || new C.Eh, this.sg.Hr());
    return this.sg
};
C.rc = C.P.extend({Fd: u(), apply: u(), Ed: u(), aj: function (a, b, d) {
    var e = a.Ec;
    C.ga.Dd && e == document.documentElement && C.screen.Rx(e);
    var e = C.D, f = C.xd;
    f.style.width = e.style.width = b + "px";
    f.style.height = e.style.height = d + "px";
    f = a.jd = 1;
    a.Si && (f = a.jd = window.devicePixelRatio || 1);
    e.width = b * f;
    e.height = d * f;
    a = document.body;
    var g;
    if (a && (g = a.style))g.paddingTop = g.paddingTop || "0px", g.paddingRight = g.paddingRight || "0px", g.paddingBottom = g.paddingBottom || "0px", g.paddingLeft = g.paddingLeft || "0px", g.borderTop = g.borderTop || "0px",
        g.borderRight = g.borderRight || "0px", g.borderBottom = g.borderBottom || "0px", g.borderLeft = g.borderLeft || "0px", g.marginTop = g.marginTop || "0px", g.marginRight = g.marginRight || "0px", g.marginBottom = g.marginBottom || "0px", g.marginLeft = g.marginLeft || "0px"
}, Tk: function () {
    document.body.insertBefore(C.xd, document.body.firstChild);
    var a = document.body.style;
    a.width = window.innerWidth + "px";
    a.height = window.innerHeight + "px";
    a.overflow = "hidden";
    a = C.xd.style;
    a.position = "fixed";
    a.left = a.top = "0px";
    document.body.scrollTop = 0
}});
C.cb = C.P.extend({Ri: {scale: [1, 1], viewport: l}, Pe: function (a, b, d, e, f, g) {
    2 > Math.abs(a - d) && (d = a);
    2 > Math.abs(b - e) && (e = b);
    a = C.rect(Math.round((a - d) / 2), Math.round((b - e) / 2), d, e);
    C.ma == C.za && C.L.translate(a.x, a.y + e);
    this.Ri.scale = [f, g];
    this.Ri.viewport = a;
    return this.Ri
}, Fd: u(), apply: function () {
    return{scale: [1, 1]}
}, Ed: u()});
(function () {
    var a = C.rc.extend({apply: function (a) {
        this.aj(a, a.ta.width, a.ta.height)
    }}), b = C.rc.extend({apply: function (a, b) {
        var d = a.ta.width, e = a.ta.height, f = C.xd.style, t = b.width, x = b.height, y = d / t, z = e / x, A, D;
        y < z ? (A = d, D = x * y) : (A = t * z, D = e);
        t = Math.round((d - A) / 2);
        D = Math.round((e - D) / 2);
        this.aj(a, d - 2 * t, e - 2 * D);
        f.marginLeft = t + "px";
        f.marginRight = t + "px";
        f.marginTop = D + "px";
        f.marginBottom = D + "px"
    }});
    a.extend({Fd: function (a) {
        this._super(a);
        a.Ec = document.documentElement
    }, apply: function (a) {
        this._super(a);
        this.Tk()
    }});
    b.extend({Fd: function (a) {
        this._super(a);
        a.Ec = document.documentElement
    }, apply: function (a, b) {
        this._super(a, b);
        this.Tk()
    }});
    var d = C.rc.extend({apply: function (a) {
        this.aj(a, C.D.width, C.D.height)
    }});
    C.rc.Vf = new a;
    C.rc.Yn = new b;
    C.rc.yv = new d;
    var a = C.cb.extend({apply: function (a, b) {
        var d = C.D.width, e = C.D.height;
        return this.Pe(d, e, d, e, d / b.width, e / b.height)
    }}), b = C.cb.extend({apply: function (a, b) {
        var d = C.D.width, e = C.D.height, f = b.width, t = b.height, x = d / f, y = e / t, z = 0, A, D;
        x < y ? (z = x, A = d, D = t * z) : (z = y, A = f * z, D = e);
        return this.Pe(d, e, A, D, z, z)
    }}), d = C.cb.extend({apply: function (a, b) {
        var d = C.D.width, e = C.D.height, f = b.width, t = b.height, x = d / f, y = e / t, z, A, D;
        x < y ? (z = y, A = f * z, D = e) : (z = x, A = d, D = t * z);
        return this.Pe(d, e, A, D, z, z)
    }}), e = C.cb.extend({apply: function (a, b) {
        var d = C.D.width, e = C.D.height, f = e / b.height;
        return this.Pe(d, e, d, e, f, f)
    }, Ed: function (a) {
        C.N.V = a.Vg()
    }}), f = C.cb.extend({apply: function (a, b) {
        var d = C.D.width, e = C.D.height, f = d / b.width;
        return this.Pe(d, e, d, e, f, f)
    }, Ed: function (a) {
        C.N.V = a.Vg()
    }});
    C.cb.Hh = new a;
    C.cb.ag = new b;
    C.cb.Oh = new d;
    C.cb.Ih = new e;
    C.cb.Jh = new f
})();
C.Ha = C.P.extend({kg: l, lg: l, ctor: function (a, b) {
    this.ys(a);
    this.zs(b)
}, Fd: function (a) {
    this.kg.Fd(a);
    this.lg.Fd(a)
}, apply: function (a, b) {
    this.kg.apply(a, b);
    return this.lg.apply(a, b)
}, Ed: function (a) {
    this.kg.Ed(a);
    this.lg.Ed(a)
}, ys: function (a) {
    a instanceof C.rc && (this.kg = a)
}, zs: function (a) {
    a instanceof C.cb && (this.lg = a)
}});
C.Ha.Hh = 0;
C.Ha.Oh = 1;
C.Ha.ag = 2;
C.Ha.Ih = 3;
C.Ha.Jh = 4;
C.Ha.ko = 5;
C.ow = -90;
C.pw = 90;
C.rw = 180;
C.qw = 0;
C.Ir = {ae: p, jl: p, xl: C.c(0, 0), Ep: C.c(0, 0), yl: [], Hi: 0, Rc: [], lj: {}, Xd: 0, zi: 5, yw: p, Dk: 1 / 30, zw: 1, Ne: 0, to: l, xw: l, ap: function () {
    for (var a = this.Xd, b = 0; b < this.zi; b++) {
        if (!(a & 1))return this.Xd |= 1 << b, b;
        a >>= 1
    }
    return-1
}, Gp: function (a) {
    0 > a || a >= this.zi || (a = ~(1 << a), this.Xd &= a)
}, Fc: l, Aj: function (a) {
    for (var b, d, e, f = [], g = this.lj, m = 0, n = a.length; m < n; m++)b = a[m], e = b.rb, d = g[e], d == l && (d = this.ap(), -1 == d ? C.log(C.b.fA, d) : (b = this.Rc[d] = b, g[e] = d, f.push(b)));
    0 < f.length && (this.Fc.mg(f), a = new C.eb(f), a.Ac = C.eb.Nd.xh, C.A.dispatchEvent(a))
},
    Bj: function (a) {
        for (var b, d, e = [], f = this.Rc, g = 0, m = a.length; g < m; g++)b = a[g], d = b.rb, d = this.lj[d], d != l && f[d] && (f[d].$i(b.T), f[d].fe(b.Nc), e.push(f[d]));
        0 < e.length && (this.Fc.mg(e), a = new C.eb(e), a.Ac = C.eb.Nd.Nh, C.A.dispatchEvent(a))
    }, Wg: function (a) {
        a = this.wm(a);
        0 < a.length && (this.Fc.mg(a), a = new C.eb(a), a.Ac = C.eb.Nd.Fh, C.A.dispatchEvent(a))
    }, Cm: function (a) {
        a = this.wm(a);
        0 < a.length && (this.Fc.mg(a), a = new C.eb(a), a.Ac = C.eb.Nd.Ch, C.A.dispatchEvent(a))
    }, wm: function (a) {
        for (var b, d, e, f = [], g = this.Rc, m = this.lj, n = 0, q =
            a.length; n < q; n++)b = a[n], e = b.rb, d = m[e], d != l && g[d] && (g[d].$i(b.T), g[d].fe(b.Nc), f.push(g[d]), this.Gp(d), delete m[e]);
        return f
    }, yb: function (a) {
        var b = document.documentElement, d = window, e = l, e = "function" === typeof a.getBoundingClientRect ? a.getBoundingClientRect() : a instanceof HTMLCanvasElement ? {left: 0, top: 0, width: a.width, height: a.height} : {left: 0, top: 0, width: parseInt(a.style.width), height: parseInt(a.style.height)};
        return{left: e.left + d.pageXOffset - b.clientLeft, top: e.top + d.pageYOffset - b.clientTop, width: e.width,
            height: e.height}
    }, jr: function (a) {
        for (var b = l, d = this.yl, e = a.rb, f = d.length - 1; 0 <= f; f--)if (d[f].rb == e) {
            b = d[f];
            break
        }
        b || (b = a);
        return b
    }, Ns: function (a) {
        for (var b = p, d = this.yl, e = a.rb, f = d.length - 1; 0 <= f; f--)if (d[f].rb == e) {
            d[f] = a;
            b = k;
            break
        }
        b || (50 >= d.length ? d.push(a) : (d[this.Hi] = a, this.Hi = (this.Hi + 1) % 50))
    }, Af: function (a, b, d) {
        var e = this.xl;
        a = this.Fc.jm(a, b, d);
        b = new C.Sh(a.x, a.y);
        b.fe(e.x, e.y);
        e.x = a.x;
        e.y = a.y;
        return b
    }, se: function (a, b, d) {
        var e = this.Ep;
        this.Fc.Eo(a, b);
        b = new C.Q(d);
        b.Js(a.x, a.y);
        b.Rp(e.x, e.y);
        e.x =
            a.x;
        e.y = a.y;
        return b
    }, te: function (a, b) {
        if (a.pageX != l)return{x: a.pageX, y: a.pageY};
        b.left -= document.body.scrollLeft;
        b.top -= document.body.scrollTop;
        return{x: a.clientX, y: a.clientY}
    }, Ug: function (a, b) {
        for (var d = [], e = this.Fc, f, g, m = this.xl, n = a.changedTouches.length, q = 0; q < n; q++)if (f = a.changedTouches[q]) {
            var s = e.jm(f.clientX, f.clientY, b);
            f.identifier != l ? (f = new C.Sh(s.x, s.y, f.identifier), g = this.jr(f).Tg(), f.fe(g.x, g.y), this.Ns(f)) : (f = new C.Sh(s.x, s.y), f.fe(m.x, m.y));
            m.x = s.x;
            m.y = s.y;
            d.push(f)
        }
        return d
    }, os: function (a) {
        if (!this.jl) {
            var b =
                this.Fc = C.view, d = this, e = "touches"in C.ga.uj;
            "mouse"in C.ga.uj && (C.I(window, "mousedown", function () {
                d.ae = k
            }, p), C.I(window, "mouseup", function (b) {
                var f = d.ae;
                d.ae = p;
                if (f) {
                    var f = d.yb(a), g = d.te(b, f);
                    C.ms(new C.bo(f.left, f.top, f.width, f.height), g) || (e || d.Wg([d.Af(g.x, g.y, f)]), f = d.se(g, f, C.Q.Th), f.Be(b.button), C.A.dispatchEvent(f))
                }
            }, p), C.I(a, "mousedown", function (b) {
                    d.ae = k;
                    var f = d.yb(a), g = d.te(b, f);
                    e || d.Aj([d.Af(g.x, g.y, f)]);
                    f = d.se(g, f, C.Q.fk);
                    f.Be(b.button);
                    C.A.dispatchEvent(f);
                    b.stopPropagation();
                    b.preventDefault()
                },
                p), C.I(a, "mouseup", function (b) {
                d.ae = p;
                var f = d.yb(a), g = d.te(b, f);
                e || d.Wg([d.Af(g.x, g.y, f)]);
                f = d.se(g, f, C.Q.Th);
                f.Be(b.button);
                C.A.dispatchEvent(f);
                b.stopPropagation();
                b.preventDefault()
            }, p), C.I(a, "mousemove", function (b) {
                if (d.ae) {
                    var f = d.yb(a), g = d.te(b, f);
                    e || d.Bj([d.Af(g.x, g.y, f)]);
                    f = d.se(g, f, C.Q.kk);
                    f.Be(b.button);
                    C.A.dispatchEvent(f);
                    b.stopPropagation();
                    b.preventDefault()
                }
            }, p), C.I(a, "mousewheel", function (b) {
                var e = d.yb(a), f = d.te(b, e), e = d.se(f, e, C.Q.Ph);
                e.Be(b.button);
                e.hn(0, b.wheelDelta);
                C.A.dispatchEvent(e);
                b.stopPropagation();
                b.preventDefault()
            }, p), C.I(a, "DOMMouseScroll", function (b) {
                var e = d.yb(a), f = d.te(b, e), e = d.se(f, e, C.Q.Ph);
                e.Be(b.button);
                e.hn(0, -120 * b.detail);
                C.A.dispatchEvent(e);
                b.stopPropagation();
                b.preventDefault()
            }, p));
            if (window.navigator.msPointerEnabled) {
                var f = {MSPointerDown: d.Aj, MSPointerMove: d.Bj, MSPointerUp: d.Wg, MSPointerCancel: d.Cm}, g;
                for (g in f)(function (b, e) {
                    C.I(a, b, function (b) {
                        var f = d.yb(a);
                        f.left -= document.body.scrollLeft;
                        f.top -= document.body.scrollTop;
                        e.call(d, [d.Af(b.clientX, b.clientY,
                            f)]);
                        b.stopPropagation();
                        b.preventDefault()
                    }, p)
                })(g, f[g])
            }
            e && (C.I(a, "touchstart", function (b) {
                if (b.changedTouches) {
                    var e = d.yb(a);
                    e.left -= document.body.scrollLeft;
                    e.top -= document.body.scrollTop;
                    d.Aj(d.Ug(b, e));
                    b.stopPropagation();
                    b.preventDefault()
                }
            }, p), C.I(a, "touchmove", function (b) {
                if (b.changedTouches) {
                    var e = d.yb(a);
                    e.left -= document.body.scrollLeft;
                    e.top -= document.body.scrollTop;
                    d.Bj(d.Ug(b, e));
                    b.stopPropagation();
                    b.preventDefault()
                }
            }, p), C.I(a, "touchend", function (b) {
                if (b.changedTouches) {
                    var e = d.yb(a);
                    e.left -= document.body.scrollLeft;
                    e.top -= document.body.scrollTop;
                    d.Wg(d.Ug(b, e));
                    b.stopPropagation();
                    b.preventDefault()
                }
            }, p), C.I(a, "touchcancel", function (e) {
                if (e.changedTouches) {
                    var f = d.yb(a);
                    f.left -= document.body.scrollLeft;
                    f.top -= document.body.scrollTop;
                    b.Cm(d.Ug(e, f));
                    e.stopPropagation();
                    e.preventDefault()
                }
            }, p));
            this.jl = k
        }
    }, cx: u(), bx: u(), update: function (a) {
        this.Ne > this.Dk && (this.Ne -= this.Dk, C.A.dispatchEvent(new C.vu(this.to)));
        this.Ne += a
    }};
C.ut = function (a, b, d, e, f, g) {
    this.g = a;
    this.a = b;
    this.n = d;
    this.o = e;
    this.t = f;
    this.u = g
};
C.xt = function (a, b, d, e, f, g) {
    return{g: a, a: b, n: d, o: e, t: f, u: g}
};
C.pk = function (a, b) {
    return{x: b.g * a.x + b.n * a.y + b.t, y: b.a * a.x + b.o * a.y + b.u}
};
C.tc = function (a, b, d) {
    return{x: d.g * a + d.n * b + d.t, y: d.a * a + d.o * b + d.u}
};
C.Uv = function (a, b) {
    return{width: b.g * a.width + b.n * a.height, height: b.a * a.width + b.o * a.height}
};
C.yt = function () {
    return{g: 1, a: 0, n: 0, o: 1, t: 0, u: 0}
};
C.wt = function () {
    return{g: 1, a: 0, n: 0, o: 1, t: 0, u: 0}
};
C.qk = function (a, b) {
    var d = C.Yc(a), e = C.Xc(a), f = C.Gd(a), g = C.Hd(a), m = C.tc(e, d, b), d = C.tc(f, d, b), e = C.tc(e, g, b), n = C.tc(f, g, b), f = Math.min(m.x, d.x, e.x, n.x), g = Math.max(m.x, d.x, e.x, n.x), q = Math.min(m.y, d.y, e.y, n.y), m = Math.max(m.y, d.y, e.y, n.y);
    return C.rect(f, q, g - f, m - q)
};
C.ro = function (a, b) {
    var d = C.Yc(a), e = C.Xc(a), f = C.Gd(a), g = C.Hd(a), m = C.tc(e, d, b), d = C.tc(f, d, b), e = C.tc(e, g, b), n = C.tc(f, g, b), f = Math.min(m.x, d.x, e.x, n.x), g = Math.max(m.x, d.x, e.x, n.x), q = Math.min(m.y, d.y, e.y, n.y), m = Math.max(m.y, d.y, e.y, n.y);
    a.x = f;
    a.y = q;
    a.width = g - f;
    a.height = m - q;
    return a
};
C.Bt = function (a, b, d) {
    return{g: a.g, a: a.a, n: a.n, o: a.o, t: a.t + a.g * b + a.n * d, u: a.u + a.a * b + a.o * d}
};
C.At = function (a, b, d) {
    return{g: a.g * b, a: a.a * b, n: a.n * d, o: a.o * d, t: a.t, u: a.u}
};
C.zt = function (a, b) {
    var d = Math.sin(b), e = Math.cos(b);
    return{g: a.g * e + a.n * d, a: a.a * e + a.o * d, n: a.n * e - a.g * d, o: a.o * e - a.a * d, t: a.t, u: a.u}
};
C.Pf = function (a, b) {
    return{g: a.g * b.g + a.a * b.n, a: a.g * b.a + a.a * b.o, n: a.n * b.g + a.o * b.n, o: a.n * b.a + a.o * b.o, t: a.t * b.g + a.u * b.n + b.t, u: a.t * b.a + a.u * b.o + b.u}
};
C.vt = function (a, b) {
    return a.g === b.g && a.a === b.a && a.n === b.n && a.o === b.o && a.t === b.t && a.u === b.u
};
C.bk = function (a) {
    var b = 1 / (a.g * a.o - a.a * a.n);
    return{g: b * a.o, a: -b * a.a, n: -b * a.n, o: b * a.g, t: b * (a.n * a.u - a.o * a.t), u: b * (a.a * a.t - a.g * a.u)}
};
C.ok = parseFloat("1.192092896e-07F");
C.TA = function (a) {
    return C.c(-a.x, -a.y)
};
C.kh = function (a, b) {
    return C.c(a.x + b.x, a.y + b.y)
};
C.Hf = function (a, b) {
    return C.c(a.x - b.x, a.y - b.y)
};
C.Gf = function (a, b) {
    return C.c(a.x * b, a.y * b)
};
C.SA = function (a, b) {
    return C.Gf(C.kh(a, b), 0.5)
};
C.Ff = function (a, b) {
    return a.x * b.x + a.y * b.y
};
C.JA = function (a, b) {
    return a.x * b.y - a.y * b.x
};
C.VA = function (a) {
    return C.c(-a.y, a.x)
};
C.XA = function (a) {
    return C.c(a.y, -a.x)
};
C.WA = function (a, b) {
    return C.Gf(b, C.Ff(a, b) / C.Ff(b, b))
};
C.YA = function (a, b) {
    return C.c(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x)
};
C.dB = function (a, b) {
    return C.c(a.x * b.x + a.y * b.y, a.y * b.x - a.x * b.y)
};
C.Mm = function (a) {
    return C.Ff(a, a)
};
C.LA = function (a, b) {
    return C.Mm(C.Hf(a, b))
};
C.Lm = function (a) {
    return Math.sqrt(C.Mm(a))
};
C.KA = function (a, b) {
    return C.Lm(C.Hf(a, b))
};
C.lh = function (a) {
    return C.Gf(a, 1 / C.Lm(a))
};
C.MA = function (a) {
    return C.c(Math.cos(a), Math.sin(a))
};
C.cB = function (a) {
    return Math.atan2(a.y, a.x)
};
C.hm = function (a, b, d) {
    if (b > d) {
        var e = b;
        b = d;
        d = e
    }
    return a < b ? b : a < d ? a : d
};
C.GA = function (a, b, d) {
    return C.c(C.hm(a.x, b.x, d.x), C.hm(a.y, b.y, d.y))
};
C.NA = function (a) {
    return C.c(a.width, a.height)
};
C.IA = function (a, b) {
    return C.c(b(a.x), b(a.y))
};
C.RA = function (a, b, d) {
    return C.kh(C.Gf(a, 1 - d), C.Gf(b, d))
};
C.OA = function (a, b, d) {
    return a.x - d <= b.x && b.x <= a.x + d && a.y - d <= b.y && b.y <= a.y + d ? k : p
};
C.HA = function (a, b) {
    return C.c(a.x * b.x, a.y * b.y)
};
C.FA = function (a, b) {
    var d = C.lh(a), e = C.lh(b), d = Math.atan2(d.x * e.y - d.y * e.x, C.Ff(d, e));
    return Math.abs(d) < C.ok ? 0 : d
};
C.EA = function (a, b) {
    var d = Math.acos(C.Ff(C.lh(a), C.lh(b)));
    return Math.abs(d) < C.ok ? 0 : d
};
C.ZA = function (a, b, d) {
    a = C.Hf(a, b);
    var e = Math.cos(d);
    d = Math.sin(d);
    var f = a.x;
    a.x = f * e - a.y * d + b.x;
    a.y = f * d + a.y * e + b.y;
    return a
};
C.Nm = function (a, b, d, e, f) {
    if (a.x == b.x && a.y == b.y || d.x == e.x && d.y == e.y)return p;
    var g = b.x - a.x;
    b = b.y - a.y;
    var m = e.x - d.x;
    e = e.y - d.y;
    var n = a.x - d.x;
    a = a.y - d.y;
    d = e * g - m * b;
    f.x = m * a - e * n;
    f.y = g * a - b * n;
    if (0 == d)return 0 == f.x || 0 == f.y ? k : p;
    f.x /= d;
    f.y /= d;
    return k
};
C.aB = function (a, b, d, e) {
    var f = C.c(0, 0);
    return C.Nm(a, b, d, e, f) && 0 <= f.x && 1 >= f.x && 0 <= f.y && 1 >= f.y ? k : p
};
C.QA = function (a, b, d, e) {
    var f = C.c(0, 0);
    return C.Nm(a, b, d, e, f) ? (d = C.c(0, 0), d.x = a.x + f.x * (b.x - a.x), d.y = a.y + f.x * (b.y - a.y), d) : C.c(0, 0)
};
C.$A = function (a, b) {
    return a != l && b != l ? a.x == b.x && a.y == b.y : p
};
C.eB = function (a) {
    a.x = 0;
    a.y = 0
};
C.PA = function (a, b) {
    a.x = b.x;
    a.y = b.y
};
C.as = function (a, b) {
    a.x *= b;
    a.y *= b
};
C.bB = function (a, b) {
    a.x -= b.x;
    a.y -= b.y
};
C.DA = function (a, b) {
    a.x += b.x;
    a.y += b.y
};
C.UA = function (a) {
    C.as(a, 1 / Math.sqrt(a.x * a.x + a.y * a.y))
};
C.Sh = C.P.extend({T: l, Nc: l, rb: 0, Wl: p, fj: l, ctor: function (a, b, d) {
    this.T = C.c(a || 0, b || 0);
    this.rb = d || 0
}, Tg: w("T"), dr: function () {
    return this.T.x
}, er: function () {
    return this.T.y
}, vz: w("Nc"), Gz: w("fj"), Rq: function () {
    return C.Hf(this.T, this.Nc)
}, cr: w("T"), wz: w("Nc"), Hz: w("fj"), dz: w("rb"), ez: w("rb"), ZC: function (a, b, d) {
    this.Nc = this.T;
    this.T = C.c(b || 0, d || 0);
    this.rb = a;
    this.Wl || (this.fj = C.c(this.T), this.Wl = k)
}, $i: function (a, b) {
    b === h ? (this.T.x = a.x, this.T.y = a.y) : (this.T.x = a, this.T.y = b)
}, fe: function (a, b) {
    this.Nc = b ===
        h ? C.c(a.x, a.y) : C.c(a || 0, b || 0)
}});
C.ia = C.P.extend({Sc: 0, od: p, yc: l, Wi: v("yc"), ctor: v("Sc"), wr: w("Sc"), stopPropagation: function () {
    this.od = k
}, sA: w("od"), Ny: w("yc")});
C.ia.cg = 0;
C.ia.Yf = 1;
C.ia.Of = 2;
C.ia.Pd = 3;
C.ia.Fe = 4;
C.Xb = C.ia.extend({ii: l, $l: l, ctor: function (a) {
    C.ia.prototype.ctor.call(this, C.ia.Fe);
    this.ii = a
}, setUserData: v("$l"), getUserData: w("$l"), Yy: w("ii")});
C.Q = C.ia.extend({Sk: 0, Hk: 0, me: 0, Pb: 0, Ji: 0, Ki: 0, Nl: 0, Ol: 0, ctor: function (a) {
    C.ia.prototype.ctor.call(this, C.ia.Pd);
    this.Sk = a
}, hn: function (a, b) {
    this.Nl = a;
    this.Ol = b
}, Dz: w("Nl"), Ez: w("Ol"), Js: function (a, b) {
    this.me = a;
    this.Pb = b
}, Tg: function () {
    return{x: this.me, y: this.Pb}
}, cr: function () {
    return{x: this.me, y: C.view.hd.height - this.Pb}
}, Rp: function (a, b) {
    this.Ji = a;
    this.Ki = b
}, Rq: function () {
    return{x: this.me - this.Ji, y: this.Pb - this.Ki}
}, Sy: function () {
    return this.me - this.Ji
}, Ty: function () {
    return this.Pb - this.Ki
}, Be: v("Hk"),
    Hy: w("Hk"), dr: w("me"), er: w("Pb")});
C.Q.NONE = 0;
C.Q.fk = 1;
C.Q.Th = 2;
C.Q.kk = 3;
C.Q.Ph = 4;
C.Q.Lt = 0;
C.Q.Nt = 2;
C.Q.Mt = 1;
C.Q.Gt = 3;
C.Q.Ht = 4;
C.Q.It = 5;
C.Q.Jt = 6;
C.Q.Kt = 7;
C.eb = C.ia.extend({Ac: 0, Rc: l, ctor: function (a) {
    C.ia.prototype.ctor.call(this, C.ia.cg);
    this.Rc = a || []
}, Xy: w("Ac"), Pz: w("Rc"), ix: v("Ac"), lx: v("Rc")});
C.eb.Xu = 5;
C.eb.Nd = {xh: 0, Nh: 1, Fh: 2, Ch: 3};
C.m = C.P.extend({Bi: l, Sc: 0, Ib: l, Xa: p, Dc: 0, Ua: l, la: p, ctor: function (a, b, d) {
    this.Bi = d;
    this.Sc = a || 0;
    this.Ib = b || ""
}, Zi: v("la"), Vw: w("la"), Dg: v("Xa"), lp: w("Xa"), Tw: w("Sc"), Qw: w("Ib"), Yi: v("Dc"), Pw: w("Dc"), Eg: v("Ua"), Rw: w("Ua"), oe: function () {
    return this.Bi != l
}, Da: B(l), Rm: u(), oh: u()});
C.m.ko = 0;
C.m.dg = 1;
C.m.Rh = 2;
C.m.Yf = 3;
C.m.Pd = 4;
C.m.Of = 5;
C.m.Fe = 6;
C.Le = C.m.extend({cf: l, ctor: function (a, b) {
    this.cf = b;
    var d = this;
    C.m.prototype.ctor.call(this, C.m.Fe, a, function (a) {
        d.cf != l && d.cf(a)
    })
}, oe: function () {
    return C.m.prototype.oe.call(this) && this.cf != l
}, Da: function () {
    return new C.Le(this.Ib, this.cf)
}});
C.Le.create = function (a, b) {
    return new C.Le(a, b)
};
C.sc = C.m.extend({dh: l, gh: l, eh: l, fh: l, ctor: function () {
    var a = this;
    C.m.prototype.ctor.call(this, C.m.Pd, C.sc.Y, function (b) {
        var d = C.Q;
        switch (b.Sk) {
            case d.fk:
                a.dh && a.dh(b);
                break;
            case d.Th:
                a.gh && a.gh(b);
                break;
            case d.kk:
                a.eh && a.eh(b);
                break;
            case d.Ph:
                a.fh && a.fh(b)
        }
    })
}, Da: function () {
    var a = new C.sc;
    a.dh = this.dh;
    a.gh = this.gh;
    a.eh = this.eh;
    a.fh = this.fh;
    return a
}, oe: B(k)});
C.sc.Y = "__cc_mouse";
C.sc.create = function () {
    return new C.sc
};
C.Cb = C.m.extend({Td: l, th: p, ye: l, jh: l, ih: l, hh: l, ctor: function () {
    C.m.prototype.ctor.call(this, C.m.dg, C.Cb.Y, l);
    this.Td = []
}, TC: v("th"), Da: function () {
    var a = new C.Cb;
    a.ye = this.ye;
    a.jh = this.jh;
    a.ih = this.ih;
    a.hh = this.hh;
    a.th = this.th;
    return a
}, oe: function () {
    return!this.ye ? (C.log(C.b.vw), p) : k
}});
C.Cb.Y = "__cc_touch_one_by_one";
C.Cb.create = function () {
    return new C.Cb
};
C.Bb = C.m.extend({Bf: l, Ef: l, Df: l, Cf: l, ctor: function () {
    C.m.prototype.ctor.call(this, C.m.Rh, C.Bb.Y, l)
}, Da: function () {
    var a = new C.Bb;
    a.Bf = this.Bf;
    a.Ef = this.Ef;
    a.Df = this.Df;
    a.Cf = this.Cf;
    return a
}, oe: function () {
    return this.Bf == l && this.Ef == l && this.Df == l && this.Cf == l ? (C.log(C.b.uw), p) : k
}});
C.Bb.Y = "__cc_touch_all_at_once";
C.Bb.create = function () {
    return new C.Bb
};
C.m.create = function (a) {
    C.assert(a && a.event, C.b.wu);
    var b = a.event;
    delete a.event;
    var d = l;
    b === C.m.dg ? d = new C.Cb : b === C.m.Rh ? d = new C.Bb : b === C.m.Pd ? d = new C.sc : b === C.m.Fe ? (d = new C.Le(a.Iq, a.tj), delete a.Iq, delete a.tj) : b === C.m.Yf ? d = new C.Ak : b === C.m.Of && (d = new C.zk(a.tj), delete a.tj);
    for (var e in a)d[e] = a[e];
    return d
};
C.mm = function (a) {
    var b, d = a.length, e = Array(d);
    for (b = 0; b < d; b += 1)e[b] = a[b];
    return e
};
C.qo = C.P.extend({Ra: l, Ya: l, Bm: 0, ctor: function () {
    this.Ra = [];
    this.Ya = []
}, size: function () {
    return this.Ra.length + this.Ya.length
}, empty: function () {
    return 0 === this.Ra.length && 0 === this.Ya.length
}, push: function (a) {
    0 == a.Dc ? this.Ya.push(a) : this.Ra.push(a)
}, xq: function () {
    this.Ya.length = 0
}, wq: function () {
    this.Ra.length = 0
}, clear: function () {
    this.Ya.length = 0;
    this.Ra.length = 0
}, Zy: w("Ra"), Bz: w("Ya")});
C.Wh = function (a) {
    var b = C.ia, d = a.Sc;
    if (d === b.Of)return C.zk.Y;
    if (d === b.Fe)return a.ii;
    if (d === b.Yf)return C.Ak.Y;
    if (d === b.Pd)return C.sc.Y;
    d === b.cg && C.log(C.b.Wh);
    return""
};
C.A = {Dh: 0, Tf: 1, Uf: 2, ku: 3, hb: {}, pd: {}, Kb: {}, wg: {}, Yk: {}, nf: [], Re: [], nd: 0, vi: k, rl: 0, kp: [C.Ea.Gh, C.Ea.Wf], Xi: function (a) {
    this.Kb[a.p] != l && this.Re.push(a)
}, If: function (a, b) {
    var d = this.Kb[a.p], e, f;
    if (d) {
        e = 0;
        for (f = d.length; e < f; e++)d[e].Zi(k)
    }
    if (b === k) {
        d = a.k;
        e = 0;
        for (f = d.length; e < f; e++)this.If(d[e], k)
    }
}, Id: function (a, b) {
    var d = this.Kb[a.p], e, f;
    if (d) {
        e = 0;
        for (f = d.length; e < f; e++)d[e].Zi(p)
    }
    this.Xi(a);
    if (b === k) {
        d = a.k;
        e = 0;
        for (f = d.length; e < f; e++)this.Id(d[e], k)
    }
}, Ek: function (a) {
    0 === this.nd ? this.Uk(a) : this.nf.push(a)
},
    Uk: function (a) {
        var b = a.Ib, d = this.hb[b];
        d || (d = new C.qo, this.hb[b] = d);
        d.push(a);
        0 == a.Dc ? (this.de(b, this.Uf), b = a.Ua, b == l && C.log(C.b.qy), this.wo(b, a), b.Lb && this.Id(b)) : this.de(b, this.Tf)
    }, qi: function (a) {
        return this.hb[a]
    }, kq: function () {
        if (0 != this.Re.length) {
            for (var a = this.Re, b, d, e = this.Kb, f = 0, g = a.length; f < g; f++)if (b = e[a[f].p])for (var m = 0, n = b.length; m < n; m++)(d = b[m]) && this.de(d.Ib, this.Uf);
            this.Re.length = 0
        }
    }, Dl: function (a) {
        if (a)for (var b, d = 0; d < a.length;)b = a[d], b.Dg(p), b.Ua != l && (this.Ok(b.Ua, b), b.Eg(l)),
            0 === this.nd ? C.$a(a, b) : ++d
    }, rd: function (a) {
        var b = this.hb[a];
        if (b) {
            var d = b.Ra;
            this.Dl(b.Ya);
            this.Dl(d);
            delete this.pd[a];
            this.nd || (b.clear(), delete this.hb[a])
        }
        for (var d = this.nf, e, b = 0; b < d.length;)(e = d[b]) && e.Ib == a ? C.$a(d, e) : ++b
    }, ej: function (a) {
        var b = this.Dh;
        this.pd[a] && (b = this.pd[a]);
        b != this.Dh && (b & this.Tf && this.cq(a), b & this.Uf && this.eq(a), this.pd[a] = this.Dh)
    }, eq: function (a) {
        if (a = this.qi(a)) {
            var b = a.Ya;
            b && 0 !== b.length && (b = C.N.Z, this.rl = 0, this.wg = {}, this.pj(b, k), a.Ya.sort(this.bq))
        }
    }, bq: function (a, b) {
        var d =
            C.A.wg;
        return d[b.Ua.p] - d[a.Ua.p]
    }, cq: function (a) {
        if (a = this.hb[a]) {
            var b = a.Ra;
            if (b && 0 !== b.length) {
                b.sort(this.dq);
                for (var d = 0, e = b.length; d < e && !(0 <= b[d].Dc);)++d;
                a.Bm = d
            }
        }
    }, dq: function (a, b) {
        return a.Dc - b.Dc
    }, Ci: function (a) {
        if (a = this.hb[a]) {
            var b = a.Ra, d = a.Ya, e, f;
            if (d)for (e = 0; e < d.length;)f = d[e], f.Xa ? ++e : C.$a(d, f);
            if (b)for (e = 0; e < b.length;)f = b[e], f.Xa ? ++e : C.$a(b, f);
            d && 0 === d.length && a.xq();
            b && 0 === b.length && a.wq()
        }
    }, Lg: function (a) {
        var b = this.nd;
        C.assert(0 < b, "If program goes here, there should be event in dispatch.");
        a.Sc == C.ia.cg ? (this.Ci(C.Cb.Y), this.Ci(C.Bb.Y)) : this.Ci(C.Wh(a));
        if (!(1 < b)) {
            C.assert(1 == b, "_inDispatch should be 1 here.");
            a = this.hb;
            var b = this.pd, d;
            for (d in a)a[d].empty() && (delete b[d], delete a[d]);
            d = this.nf;
            if (0 !== d.length) {
                a = 0;
                for (b = d.length; a < b; a++)this.Uk(d[a]);
                this.nf.length = 0
            }
        }
    }, wp: function (a, b) {
        if (!a.lp)return p;
        var d = b.event, e = b.Wm;
        d.Wi(a.Ua);
        var f = p, g, m = d.Ac, n = C.eb.Nd;
        if (m == n.xh)a.ye && (f = a.ye(e, d)) && a.Xa && a.Td.push(e); else if (0 < a.Td.length && -1 != (g = a.Td.indexOf(e)))f = k, m === n.Nh && a.jh ? a.jh(e,
            d) : m === n.Fh ? (a.ih && a.ih(e, d), a.Xa && a.Td.splice(g, 1)) : m === n.Ch && (a.hh && a.hh(e, d), a.Xa && a.Td.splice(g, 1));
        return d.od ? (C.A.Lg(d), k) : f && a.Xa && a.th ? (b.Zr && b.touches.splice(e, 1), k) : p
    }, Go: function (a) {
        this.ej(C.Cb.Y);
        this.ej(C.Bb.Y);
        var b = this.qi(C.Cb.Y), d = this.qi(C.Bb.Y);
        if (!(l == b && l == d)) {
            var e = a.Rc, f = C.mm(e), g = {event: a, Zr: b && d, touches: f, Wm: l};
            if (b)for (var m = 0; m < e.length; m++)if (g.Wm = e[m], this.di(b, this.wp, g), a.od)return;
            if (d && 0 < f.length && (this.di(d, this.xp, {event: a, touches: f}), a.od))return;
            this.Lg(a)
        }
    },
    xp: function (a, b) {
        if (!a.Xa)return p;
        var d = C.eb.Nd, e = b.event, f = b.touches, g = e.Ac;
        e.Wi(a.Ua);
        g == d.xh && a.Bf ? a.Bf(f, e) : g == d.Nh && a.Ef ? a.Ef(f, e) : g == d.Fh && a.Df ? a.Df(f, e) : g == d.Ch && a.Cf && a.Cf(f, e);
        return e.od ? (C.A.Lg(e), k) : p
    }, wo: function (a, b) {
        var d = this.Kb[a.p];
        d || (d = [], this.Kb[a.p] = d);
        d.push(b)
    }, Ok: function (a, b) {
        var d = this.Kb[a.p];
        d && (C.$a(d, b), 0 === d.length && delete this.Kb[a.p])
    }, di: function (a, b, d) {
        var e = p, f = a.Ra, g = a.Ya, m = 0, n;
        if (f && 0 !== f.length)for (; m < a.Bm; ++m)if (n = f[m], !n.la && n.Xa && b(n, d)) {
            e = k;
            break
        }
        if (g && !e)for (a = 0; a < g.length; a++)if (n = g[a], !n.la && n.Xa && b(n, d)) {
            e = k;
            break
        }
        if (f && !e)for (; m < f.length && !(n = f[m], !n.la && n.Xa && b(n, d)); ++m);
    }, de: function (a, b) {
        var d = this.pd;
        d[a] = d[a] == l ? b : b | d[a]
    }, pj: function (a, b) {
        var d = a.k, e = 0, f = d.length, g = this.Yk, m = this.Kb;
        if (0 < f) {
            for (var n; e < f; e++)if ((n = d[e]) && 0 > n.ka)this.pj(n, p); else break;
            m[a.p] != l && (g[a.ac] || (g[a.ac] = []), g[a.ac].push(a.p));
            for (; e < f; e++)(n = d[e]) && this.pj(n, p)
        } else m[a.p] != l && (g[a.ac] || (g[a.ac] = []), g[a.ac].push(a.p));
        if (b) {
            var d = [], q;
            for (q in g)d.push(q);
            d.sort(this.fq);
            q = d.length;
            n = this.wg;
            for (e = 0; e < q; e++) {
                f = g[d[e]];
                for (m = 0; m < f.length; m++)n[f[m]] = ++this.rl
            }
            this.Yk = {}
        }
    }, fq: function (a, b) {
        return a - b
    }, addListener: function (a, b) {
        C.assert(a && b, C.b.sy);
        a instanceof C.m ? C.assert(!a.Xa, C.b.uy) : (C.assert("number" !== typeof b, C.b.ty), a = C.m.create(a));
        a.oe() && ("number" == typeof b ? 0 == b ? C.log(C.b.ry) : (a.Eg(l), a.Yi(b), a.Dg(k), a.Zi(p), this.Ek(a)) : (a.Eg(b), a.Yi(0), a.Dg(k), this.Ek(a)))
    }, mq: function (a, b) {
        var d = C.Le.create(a, b);
        this.addListener(d, 1);
        return d
    }, removeListener: function (a) {
        if (a !=
            l) {
            var b, d = this.hb, e;
            for (e in d) {
                var f = d[e], g = f.Ra;
                (b = this.El(f.Ya, a)) ? this.de(a.Ib, this.Uf) : (b = this.El(g, a)) && this.de(a.Ib, this.Tf);
                f.empty() && (delete this.pd[a.Ib], delete d[e]);
                if (b)break
            }
            if (!b) {
                b = this.nf;
                d = 0;
                for (e = b.length; d < e; d++)if (f = b[d], f == a) {
                    C.$a(b, f);
                    break
                }
            }
        }
    }, El: function (a, b) {
        if (a == l)return p;
        for (var d = 0, e = a.length; d < e; d++) {
            var f = a[d];
            if (f == b)return f.Dg(p), f.Ua != l && (this.Ok(f.Ua, f), f.Eg(l)), 0 == this.nd && C.$a(a, f), k
        }
        return p
    }, Pm: function (a, b) {
        if (a instanceof C.q) {
            delete this.wg[a.p];
            C.$a(this.Re,
                a);
            var d = this.Kb[a.p];
            if (d) {
                for (var e = C.mm(d), d = 0; d < e.length; d++)this.removeListener(e[d]);
                e.length = 0;
                if (b === k) {
                    var e = a.k, f, d = 0;
                    for (f = e.length; d < f; d++)this.Pm(e[d], k)
                }
            }
        } else a == C.m.dg ? this.rd(C.Cb.Y) : a == C.m.Rh ? this.rd(C.Bb.Y) : a == C.m.Pd ? this.rd(C.sc.Y) : a == C.m.Of ? this.rd(C.zk.Y) : a == C.m.Yf ? this.rd(C.Ak.Y) : C.log(C.b.vy)
    }, KB: function (a) {
        this.rd(a)
    }, EB: function () {
        var a = this.hb, b = this.kp, d;
        for (d in a)-1 === b.indexOf(d) && this.rd(d)
    }, NC: function (a, b) {
        if (a != l) {
            var d = this.hb, e;
            for (e in d) {
                var f = d[e].Ra;
                if (f &&
                    -1 != f.indexOf(a)) {
                    a.Ua != l && C.log(C.b.wy);
                    a.Dc !== b && (a.Yi(b), this.de(a.Ib, this.Tf));
                    break
                }
            }
        }
    }, tC: v("vi"), isEnabled: w("vi"), dispatchEvent: function (a) {
        if (this.vi) {
            this.kq();
            this.nd++;
            (!a || !a.wr) && c("event is undefined");
            if (a.Sc == C.ia.cg)this.Go(a); else {
                var b = C.Wh(a);
                this.ej(b);
                b = this.hb[b];
                b != l && this.di(b, this.vp, a);
                this.Lg(a)
            }
            this.nd--
        }
    }, vp: function (a, b) {
        b.Wi(a.Ua);
        a.Bi(b);
        return b.od
    }, jy: function (a, b) {
        var d = new C.Xb(a);
        d.setUserData(b);
        this.dispatchEvent(d)
    }};
C.lk = -1;
C.Zu = l;
C.$u = l;
C.Tm = 1;
C.q = C.P.extend({ka: 0, ac: 0, am: 0, Oc: 0, ce: 0, G: 1, M: 1, jb: l, Gg: 0, Hg: 0, k: l, ke: k, da: l, qa: l, i: l, Lb: p, K: l, md: p, tag: C.lk, userData: l, userObject: l, of: k, ui: k, Ik: k, ig: l, px: l, Jg: l, el: l, dc: p, df: l, arrivalOrder: 0, fb: l, Za: l, Mw: l, dl: p, Yh: p, Xh: l, Fb: l, xi: p, Cg: 0, Gl: 0, $b: "Node", Zp: p, cl: function () {
    this.da = C.c(0, 0);
    this.qa = C.c(0, 0);
    this.i = C.size(0, 0);
    this.jb = C.c(0, 0);
    this.k = [];
    this.Jg = {g: 1, a: 0, n: 0, o: 1, t: 0, u: 0};
    var a = C.N;
    this.fb = a.Sg();
    this.Za = a.ue();
    this.dl = k;
    this.Xh = {g: 1, a: 0, n: 0, o: 1, t: 0, u: 0};
    C.Bn && (this.Fb = new C.Bn(this))
},
    O: function () {
        this.dl === p && this.cl();
        return k
    }, vc: function (a, b) {
        if (a && 0 !== a.length) {
            var d, e = a.length, f;
            d = C.q.Zb;
            switch (b) {
                case d.kc:
                    for (d = 0; d < e; d++)(f = a[d]) && f.kc();
                    break;
                case d.zb:
                    for (d = 0; d < e; d++)(f = a[d]) && f.zb();
                    break;
                case d.xe:
                    for (d = 0; d < e; d++)(f = a[d]) && f.xe();
                    break;
                case d.ic:
                    for (d = 0; d < e; d++)(f = a[d]) && f.ic();
                    break;
                case d.Ld:
                    for (d = 0; d < e; d++)(f = a[d]) && f.Ld();
                    break;
                case d.lc:
                    for (d = 0; d < e; d++)(f = a[d]) && f.lc();
                    break;
                case d.De:
                    for (d = 0; d < e; d++)(f = a[d]) && f.De();
                    break;
                default:
                    C.assert(0, C.b.av)
            }
        }
    }, z: l, Px: function (a) {
        for (var b in a)this[b] =
            a[b]
    }, qr: w("Gg"), Ts: function (a) {
        this.Gg = a;
        this.z()
    }, rr: w("Hg"), Us: function (a) {
        this.Hg = a;
        this.z()
    }, bn: function (a) {
        this.ka = a;
        this.K && this.K.Nj(this, a);
        C.A.Xi(this)
    }, Pl: v("ka"), br: w("ka"), Wz: function () {
        C.log(C.b.hv);
        return this.ka
    }, eD: function (a) {
        C.log(C.b.sv);
        this.bn(a)
    }, zC: function (a) {
        this.ac != a && (this.ac = a, C.A.Xi(this))
    }, az: w("ac"), zr: w("am"), Ys: v("am"), mr: function () {
        this.Oc !== this.ce && C.log(C.b.fv);
        return this.Oc
    }, sh: function (a) {
        this.Oc = this.ce = a;
        this.Cg = 0.017453292519943295 * this.Oc;
        this.Gl = 0.017453292519943295 *
            this.ce;
        this.z()
    }, nr: w("Oc"), Ps: function (a) {
        this.Oc = a;
        this.Cg = 0.017453292519943295 * this.Oc;
        this.z()
    }, or: w("ce"), Qs: function (a) {
        this.ce = a;
        this.Gl = 0.017453292519943295 * this.ce;
        this.z()
    }, pr: function () {
        this.G !== this.M && C.log(C.b.gv);
        return this.G
    }, fn: function (a, b) {
        this.G = a;
        this.M = b || 0 === b ? b : a;
        this.z()
    }, um: w("G"), Rs: function (a) {
        this.G = a;
        this.z()
    }, vm: w("M"), Ss: function (a) {
        this.M = a;
        this.z()
    }, Vb: function (a, b) {
        var d = this.jb;
        b === h ? (d.x = a.x, d.y = a.y) : (d.x = a, d.y = b);
        this.z()
    }, uz: w("jb"), hr: function () {
        return this.jb.x
    },
    nc: function (a) {
        this.jb.x = a;
        this.z()
    }, ir: function () {
        return this.jb.y
    }, cn: function (a) {
        this.jb.y = a;
        this.z()
    }, Pq: function () {
        return this.k.length
    }, Oq: w("k"), Rr: w("ke"), oa: function (a) {
        this.ke = a;
        this.z()
    }, By: w("da"), Kf: function (a, b) {
        var d = this.da;
        if (b === h) {
            if (a.x === d.x && a.y === d.y)return;
            d.x = a.x;
            d.y = a.y
        } else {
            if (a === d.x && b === d.y)return;
            d.x = a;
            d.y = b
        }
        var e = this.qa, f = this.i;
        e.x = f.width * d.x;
        e.y = f.height * d.y;
        this.z()
    }, Ow: w("da"), hx: function (a) {
        var b = a.x;
        a = a.y;
        this.da.x !== b && (this.da.x = b, this.qa.x = this.i.width * b);
        this.da.y !== a && (this.da.y = a, this.qa.y = this.i.height * a);
        this.z()
    }, Mo: function () {
        return this.da.x
    }, Kp: function (a) {
        this.da.x !== a && (this.da.x = a, this.qa.x = this.i.width * a, this.z())
    }, No: function () {
        return this.da.y
    }, Lp: function (a) {
        this.da.y !== a && (this.da.y = a, this.qa.y = this.i.height * a, this.z())
    }, Cy: w("qa"), Ze: function () {
        return this.i.width
    }, ud: function (a) {
        this.i.width = a;
        this.qa.x = a * this.da.x;
        this.z()
    }, Ye: function () {
        return this.i.height
    }, td: function (a) {
        this.i.height = a;
        this.qa.y = a * this.da.y;
        this.z()
    }, wf: w("i"),
    mc: function (a, b) {
        var d = this.i;
        if (b === h) {
            if (a.width === d.width && a.height === d.height)return;
            d.width = a.width;
            d.height = a.height
        } else {
            if (a === d.width && b === d.height)return;
            d.width = a;
            d.height = b
        }
        var e = this.qa, f = this.da;
        e.x = d.width * f.x;
        e.y = d.height * f.y;
        this.z()
    }, Pr: w("Lb"), getParent: w("K"), Ms: v("K"), Nr: w("md"), Dj: function (a) {
        a != this.md && (this.md = a, this.z())
    }, Iz: w("tag"), UC: v("tag"), getUserData: w("userData"), setUserData: v("userData"), Rz: w("userObject"), bD: function (a) {
        this.userObject != a && (this.userObject = a)
    },
    oz: w("arrivalOrder"), KC: v("arrivalOrder"), Sg: function () {
        this.fb || (this.fb = C.N.Sg());
        return this.fb
    }, Xm: function (a) {
        this.fb != a && (this.nn(), this.fb = a)
    }, ue: function () {
        this.Za || (this.Za = C.N.ue());
        return this.Za
    }, gn: function (a) {
        this.Za != a && (this.uh(), this.Za = a)
    }, Fy: function () {
        var a = C.rect(0, 0, this.i.width, this.i.height);
        return C.ro(a, this.Ub())
    }, ic: function () {
        this.nn();
        this.uh();
        C.A.Pm(this);
        this.vc(this.k, C.q.Zb.ic)
    }, Nq: function (a) {
        var b = this.k;
        if (b != l)for (var d = 0; d < b.length; d++) {
            var e = b[d];
            if (e && e.tag ==
                a)return e
        }
        return l
    }, aa: function (a, b, d) {
        C.assert(a, C.b.dv);
        a === this ? C.log(C.b.bv) : a.K !== l ? C.log(C.b.cv) : (b = b != l ? b : a.ka, a.tag = d != l ? d : a.tag, this.jp(a, b), a.K = this, this.ig && (a.ig = this.ig), this.Lb && (a.kc(), this.xi && a.xe()))
    }, rs: function (a) {
        this.K && (a == l && (a = k), this.K.removeChild(this, a))
    }, LB: function (a) {
        C.log(C.b.mv);
        this.rs(a)
    }, removeChild: function (a, b) {
        0 !== this.k.length && (b == l && (b = k), -1 < this.k.indexOf(a) && this.Fo(a, b), this.z())
    }, IB: function (a, b) {
        a === C.lk && C.log(C.b.kv);
        var d = this.Nq(a);
        d == l ? C.log(C.b.lv,
            a) : this.removeChild(d, b)
    }, CB: function (a) {
        C.log(C.b.jv);
        this.Mj(a)
    }, Mj: function (a) {
        var b = this.k;
        if (b != l) {
            a == l && (a = k);
            for (var d = 0; d < b.length; d++) {
                var e = b[d];
                e && (this.Lb && (e.lc(), e.zb()), a && e.ic(), e.parent = l)
            }
            this.k.length = 0
        }
    }, Fo: function (a, b) {
        this.Lb && (a.lc(), a.zb());
        b && a.ic();
        a.parent = l;
        C.$a(this.k, a)
    }, jp: function (a, b) {
        this.dc = k;
        this.k.push(a);
        a.Pl(b)
    }, Nj: function (a, b) {
        C.assert(a, C.b.nv);
        this.dc = k;
        a.arrivalOrder = C.Tm;
        C.Tm++;
        a.Pl(b);
        this.z()
    }, De: function () {
        if (this.dc) {
            var a = this.k, b, d, e = a.length, f;
            for (b = 0; b < e; b++) {
                var g = a[b];
                d = b - 1;
                for (f = a[d]; 0 <= d && (g.ka < f.ka || g.ka == f.ka && g.arrivalOrder < f.arrivalOrder);)a[d + 1] = f, d -= 1, f = a[d];
                a[d + 1] = g
            }
            this.dc = p
        }
    }, Rb: u(), ft: function () {
        this.K != l && (this.K.ft(), this.K.transform())
    }, kc: function () {
        this.xi = p;
        this.Lb = k;
        this.vc(this.k, C.q.Zb.kc);
        this.Pj()
    }, xe: function () {
        this.xi = k;
        this.vc(this.k, C.q.Zb.xe)
    }, lc: function () {
        this.vc(this.k, C.q.Zb.lc)
    }, zb: function () {
        this.Lb = p;
        this.pause();
        this.vc(this.k, C.q.Zb.zb);
        this.Fb && this.Fb.ps()
    }, $B: function (a) {
        C.assert(a, C.b.pv);
        this.actionManager.sx(a,
            this, !this.Lb);
        return a
    }, nn: function () {
        this.actionManager && this.actionManager.BB(this)
    }, oD: function (a) {
        this.actionManager.zB(a)
    }, pD: function (a) {
        a === C.tn ? C.log(C.b.tv) : this.actionManager.AB(a, this)
    }, Jq: function (a) {
        return a === C.tn ? (C.log(C.b.ev), l) : this.actionManager.Jq(a, this)
    }, kz: function () {
        return this.actionManager.BA(this)
    }, cC: function () {
        this.xs(0)
    }, xs: function (a) {
        this.scheduler.Um(this, a, !this.Lb)
    }, FD: function () {
        this.scheduler.$j(this)
    }, Ae: function (a, b, d, e) {
        b = b || 0;
        C.assert(a, C.b.qv);
        C.assert(0 <=
            b, C.b.rv);
        d = d == l ? C.He : d;
        this.scheduler.ws(this, a, b, d, e || 0, !this.Lb)
    }, bC: function (a, b) {
        this.Ae(a, 0, 0, b)
    }, Nf: function (a) {
        a && this.scheduler.rn(this, a)
    }, uh: function () {
        this.scheduler.qn(this)
    }, YB: function () {
        C.log(C.b.ov);
        this.Pj()
    }, Pj: function () {
        this.scheduler.Id(this);
        this.actionManager && this.actionManager.Id(this);
        C.A.Id(this)
    }, iB: function () {
        C.log(C.b.iv);
        this.pause()
    }, pause: function () {
        this.scheduler.If(this);
        this.actionManager && this.actionManager.If(this);
        C.A.If(this)
    }, dC: function (a) {
        this.Xh = a;
        this.Yh =
            this.of = k
    }, gB: function () {
        this.ui && (this.el = C.bk(this.Ub()), this.ui = p);
        return this.el
    }, bh: function () {
        for (var a = this.Ub(), b = this.K; b != l; b = b.parent)a = C.Pf(a, b.Ub());
        return a
    }, ht: function () {
        return C.bk(this.bh())
    }, km: function (a) {
        return C.pk(a, this.ht())
    }, lm: function (a) {
        return C.pk(a, this.bh())
    }, yq: function (a) {
        return C.Hf(this.km(a), this.qa)
    }, dy: function (a) {
        return this.lm(C.kh(a, this.qa))
    }, Hw: function (a) {
        a = this.lm(a);
        return C.N.cy(a)
    }, ey: function (a) {
        return this.km(a.Tg())
    }, fy: function (a) {
        a = a.Tg();
        a = C.N.by(a);
        return this.yq(a)
    }, update: function (a) {
        this.Fb && !this.Fb.jA() && this.Fb.Ab(a)
    }, Ld: function () {
        this.vc(this.k, C.q.Zb.Ld)
    }, Rm: u(), oh: u(), Qq: function (a) {
        return this.Fb.Qq(a)
    }, ux: function (a) {
        this.Fb.add(a)
    }, JB: function (a) {
        return this.Fb.remove(a)
    }, DB: function () {
        this.Fb.ps()
    }, zm: l, ctor: l, Ab: l, transform: l, Ub: l, ee: function () {
        if (this.Ik === p) {
            this.Ik = k;
            var a = this.ig;
            a && a != this && a.ee()
        }
    }, Jy: function () {
        this.Jk || (this.Jk = new C.Tt);
        return this.Jk
    }, bz: w("zm"), AC: v("zm"), xm: w("df"), jn: v("df"), Zq: w("bp"), Hs: v("bp"),
    Gy: function () {
        var a = C.rect(0, 0, this.i.width, this.i.height), b = this.bh(), a = C.qk(a, this.bh());
        if (!this.k)return a;
        for (var d = this.k, e = 0; e < d.length; e++) {
            var f = d[e];
            f && f.ke && (f = f.Wk(b)) && (a = C.Om(a, f))
        }
        return a
    }, Wk: function (a) {
        var b = C.rect(0, 0, this.i.width, this.i.height);
        a = a == l ? this.Ub() : C.Pf(this.Ub(), a);
        b = C.qk(b, a);
        if (!this.k)return b;
        for (var d = this.k, e = 0; e < d.length; e++) {
            var f = d[e];
            f && f.ke && (f = f.Wk(a)) && (b = C.Om(b, f))
        }
        return b
    }});
C.q.create = function () {
    return new C.q
};
C.q.Zb = {kc: 1, zb: 2, ic: 3, xe: 4, Ld: 5, lc: 6, De: 7};
C.xa = C.q.extend({ca: k, J: 255, tb: 255, S: l, Ba: l, Ja: p, gb: p, ctor: function () {
    C.q.prototype.ctor.call(this);
    this.tb = this.J = 255;
    this.S = C.color(255, 255, 255, 255);
    this.Ba = C.color(255, 255, 255, 255);
    this.gb = this.Ja = p
}, yf: w("tb"), Tq: w("J"), Fa: function (a) {
    this.J = this.tb = a;
    var b = 255, d = this.K;
    d && (d.ca && d.cascadeOpacity) && (b = d.J);
    this.ha(b);
    this.S.g = this.Ba.g = a
}, ha: function (a) {
    this.J = this.tb * a / 255;
    if (this.gb) {
        a = this.k;
        for (var b = 0; b < a.length; b++) {
            var d = a[b];
            d && d.ca && d.ha(this.J)
        }
    }
}, Gj: w("gb"), Rj: function (a) {
    this.gb !==
        a && ((this.gb = a) ? this.Ue() : this.ci())
}, Ue: function () {
    var a = 255, b = this.K;
    b && (b.ca && b.cascadeOpacity) && (a = b.J);
    this.ha(a)
}, ci: function () {
    this.J = this.tb;
    for (var a = this.k, b = 0; b < a.length; b++) {
        var d = a[b];
        d && d.ca && d.ha(255)
    }
}, vf: function () {
    var a = this.Ba;
    return C.color(a.f, a.e, a.a, a.g)
}, xf: w("S"), Pa: function (a) {
    var b = this.S, d = this.Ba;
    b.f = d.f = a.f;
    b.e = d.e = a.e;
    b.a = d.a = a.a;
    b = (b = this.K) && b.ca && b.cascadeColor ? b.xf() : C.color.Ke;
    this.pa(b);
    a.g !== h && !a.lq && this.Fa(a.g)
}, pa: function (a) {
    var b = this.S, d = this.Ba;
    b.f = 0 |
        d.f * a.f / 255;
    b.e = 0 | d.e * a.e / 255;
    b.a = 0 | d.a * a.a / 255;
    if (this.Ja) {
        a = this.k;
        for (d = 0; d < a.length; d++) {
            var e = a[d];
            e && e.ca && e.pa(b)
        }
    }
}, Fj: w("Ja"), Qj: function (a) {
    this.Ja !== a && ((this.Ja = a) ? this.Te() : this.bi())
}, Te: function () {
    var a;
    a = (a = this.K) && a.ca && a.cascadeColor ? a.xf() : C.color.Ke;
    this.pa(a)
}, bi: function () {
    var a = this.S, b = this.Ba;
    a.f = b.f;
    a.e = b.e;
    a.a = b.a;
    for (var a = this.k, b = C.color.Ke, d = 0; d < a.length; d++) {
        var e = a[d];
        e && e.ca && e.pa(b)
    }
}, aa: function (a, b, d) {
    C.q.prototype.aa.call(this, a, b, d);
    this.Ja && this.Te();
    this.gb &&
    this.Ue()
}, Jd: u(), we: B(p)});
C.xa.create = function () {
    var a = new C.xa;
    a.O();
    return a
};
if (C.ma === C.za) {
    var E = C.q.prototype;
    E.ctor = function () {
        this.cl()
    };
    E.z = function () {
        this.ee();
        this.of === p && (this.of = this.ui = k)
    };
    E.Ab = function (a) {
        if (this.ke) {
            a = a || C.L;
            var b, d = this.k, e;
            a.save();
            this.transform(a);
            var f = d.length;
            if (0 < f) {
                this.De();
                for (b = 0; b < f; b++)if (e = d[b], 0 > e.ka)e.Ab(a); else break;
                for (this.Rb(a); b < f; b++)d[b].Ab(a)
            } else this.Rb(a);
            this.arrivalOrder = 0;
            a.restore()
        }
    };
    E.transform = function (a) {
        a = a || C.L;
        var b = C.view, d = this.Ub();
        a.transform(d.g, d.n, d.a, d.o, d.t * b.G, -d.u * b.M)
    };
    E.Ub = function () {
        if (this.of) {
            var a =
                this.Jg;
            a.t = this.jb.x;
            a.u = this.jb.y;
            var b = 1, d = 0;
            this.Oc && (b = Math.cos(this.Cg), d = Math.sin(this.Cg));
            a.g = a.o = b;
            a.a = -d;
            a.n = d;
            var e = this.G, f = this.M, g = this.qa.x, m = this.qa.y, n = 1E-6 > e && -1E-6 < e ? 1E-6 : e, q = 1E-6 > f && -1E-6 < f ? 1E-6 : f;
            if (this.Gg || this.Hg) {
                var s = Math.tan(-this.Gg * Math.PI / 180), t = Math.tan(-this.Hg * Math.PI / 180), x = m * s * n, y = g * t * q;
                a.g = b + -d * t;
                a.a = b * s + -d;
                a.n = d + b * t;
                a.o = d * s + b;
                a.t += b * x + -d * y;
                a.u += d * x + b * y
            }
            if (1 !== e || 1 !== f)a.g *= n, a.n *= n, a.a *= q, a.o *= q;
            a.t += b * -g * n + -d * m * q;
            a.u -= d * -g * n + b * m * q;
            this.md && (a.t += g, a.u += m);
            this.Yh &&
            (this.Jg = C.Pf(a, this.Xh), this.Yh = p);
            this.of = p
        }
        return this.Jg
    };
    delete E
}
;
window._p = C.q.prototype;
C.d(E, "x", E.hr, E.nc);
C.d(E, "y", E.ir, E.cn);
C.d(E, "width", E.Ze, E.ud);
C.d(E, "height", E.Ye, E.td);
C.d(E, "anchorX", E.Mo, E.Kp);
C.d(E, "anchorY", E.No, E.Lp);
C.d(E, "skewX", E.qr, E.Ts);
C.d(E, "skewY", E.rr, E.Us);
C.d(E, "zIndex", E.br, E.bn);
C.d(E, "vertexZ", E.zr, E.Ys);
C.d(E, "rotation", E.mr, E.sh);
C.d(E, "rotationX", E.nr, E.Ps);
C.d(E, "rotationY", E.or, E.Qs);
C.d(E, "scale", E.pr, E.fn);
C.d(E, "scaleX", E.um, E.Rs);
C.d(E, "scaleY", E.vm, E.Ss);
C.d(E, "children", E.Oq);
C.d(E, "childrenCount", E.Pq);
C.d(E, "parent", E.getParent, E.Ms);
C.d(E, "visible", E.Rr, E.oa);
C.d(E, "running", E.Pr);
C.d(E, "ignoreAnchor", E.Nr, E.Dj);
C.d(E, "actionManager", E.Sg, E.Xm);
C.d(E, "scheduler", E.ue, E.gn);
C.d(E, "shaderProgram", E.xm, E.jn);
C.d(E, "glServerState", E.Zq, E.Hs);
window._p = C.xa.prototype;
C.d(E, "opacity", E.yf, E.Fa);
C.d(E, "opacityModifyRGB", E.we, E.Jd);
C.d(E, "cascadeOpacity", E.Gj, E.Rj);
C.d(E, "color", E.vf, E.Pa);
C.d(E, "cascadeColor", E.Fj, E.Qj);
delete window._p;
C.nt = 51;
C.qt = 19;
C.st = 18;
C.pt = 50;
C.mt = 34;
C.kt = 35;
C.lt = 33;
C.ot = 49;
C.rt = 17;
C.Bv = p;
C.ma === C.za && (C.ya = C.P.extend({i: l, Ic: p, Sa: l, Ta: l, url: l, ctor: function () {
    this.i = C.size(0, 0);
    this.Ic = p;
    this.Sa = l
}, tz: function () {
    return this.i.width
}, sz: function () {
    return this.i.height
}, wf: function () {
    var a = C.ba();
    return C.size(this.i.width / a, this.i.height / a)
}, Ze: function () {
    return this.i.width / C.ba()
}, Ye: function () {
    return this.i.height / C.ba()
}, Ly: w("i"), Wc: function (a) {
    a && (this.Sa = a)
}, cz: w("Sa"), kA: w("Ic"), ab: function () {
    if (!this.Ic) {
        if (!this.Sa) {
            var a = C.r.zf(this.url);
            if (!a)return;
            this.Wc(a)
        }
        this.Ic = k;
        a = this.Sa;
        this.i.width = a.width;
        this.i.height = a.height;
        this.ed()
    }
}, description: function () {
    return"\x3ccc.Texture2D | width \x3d " + this.i.width + " height " + this.i.height + "\x3e"
}, $z: B(p), bA: B(p), Ej: B(p), yB: u(), getName: B(l), hz: B(1), DC: u(), iz: B(1), EC: u(), rz: B(l), xm: B(l), jn: u(), Yz: B(p), Xz: B(p), xB: u(), uA: r(), ly: u(), my: u(), aA: function () {
    C.log(C.b.jw);
    return p
}, cA: function () {
    C.log(C.b.kw);
    return p
}, dA: function () {
    C.log(C.b.lw);
    return p
}, VC: u(), fC: u(), eC: u(), generateMipmap: u(), qD: B(""), Sx: B(-1), ne: function (a, b) {
    this.Ta || (this.Ta = []);
    this.Ta.push({uf: a, pe: b})
}, MB: function (a) {
    if (this.Ta)for (var b = this.Ta, d = 0; d < b.length; d++)b[d].pe == a && b.splice(d, 1)
}, ed: function () {
    if (this.Ta) {
        for (var a = this.Ta, b = 0, d = a.length; b < d; b++) {
            var e = a[b];
            e.uf.call(e.pe, this)
        }
        a.length = 0
    }
}}));
C.Ga = {U: {}, kf: {}, jj: 0 | 1E3 * Math.random(), yi: {}, ip: function () {
    var a, b = this.yi, d = this.U;
    for (a in b) {
        var e = b[a];
        e.ab();
        d[a] = e
    }
    this.yi = {}
}, yx: function () {
    C.log(C.b.xD)
}, vx: function () {
    C.log(C.b.vD)
}, description: function () {
    return"\x3cTextureCache | Number of textures \x3d " + this.U.length + "\x3e"
}, ct: function (a) {
    return this.U[a] || this.U[C.r.Rd[a]]
}, ar: function (a) {
    for (var b in this.U)if (this.U[b] == a)return b;
    return l
}, Lo: function () {
    this.jj++;
    return"_textureKey_" + this.jj
}, vr: function (a) {
    var b = this.ar(a);
    b || (b =
        a instanceof HTMLImageElement ? a.src : this.Lo());
    this.kf[b] || (this.kf[b] = C.re(a));
    return this.kf[b]
}, xx: function () {
    C.log(C.b.wD)
}, GB: function () {
    var a = this.U, b;
    for (b in a);
    this.U = {}
}, SB: function (a) {
    if (a) {
        var b = this.U, d;
        for (d in b)b[d] == a && delete b[d]
    }
}, TB: function (a) {
    a != l && this.U[a] && delete this.U[a]
}, Ux: function (a, b) {
    if (b instanceof C.ya)this.U[a] = b; else {
        var d = new C.ya;
        d.Wc(b);
        d.ab();
        this.U[a] = d
    }
}, Bx: function (a, b) {
    C.assert(a, C.b.zD);
    if (b && this.U[b])return this.U[b];
    var d = new C.ya;
    b != l && d != l ? this.U[b] =
        d : C.log(C.b.yD);
    return d
}, oy: function () {
    var a = 0, b = 0, d = this.U, e;
    for (e in d) {
        var f = d[e];
        a++;
        f.Sa instanceof HTMLImageElement ? C.log(C.b.AD, e, f.Sa.src, f.nh, f.mh) : C.log(C.b.BD, e, f.nh, f.mh);
        b += 4 * f.nh * f.mh
    }
    d = this.kf;
    for (e in d) {
        var f = d[e], g;
        for (g in f) {
            var m = f[g];
            a++;
            C.log("cocos2d: '%s' id\x3d HTMLCanvasElement %s x %s", e, m.width, m.height);
            b += 4 * m.width * m.height
        }
    }
    C.log(C.b.CD, a, b / 1024, (b / 1048576).toFixed(2))
}, fd: function () {
    this.U = {};
    this.kf = {};
    this.jj = 0 | 1E3 * Math.random();
    this.yi = {}
}};
C.ma === C.za && (E = C.Ga, E.ab = function (a) {
    var b = this.U, d = b[a];
    d || (d = b[a] = new C.ya, d.url = a);
    d.ab()
}, E.wd = function (a) {
    C.assert(a, C.b.iw);
    var b = this.U, d = b[a] || b[C.r.Rd[a]];
    if (d)return d;
    C.r.zf(a) || (C.r.Ao(a) ? C.r.load(a, u()) : C.r.Qb[a] = C.r.Zg(a, function (b, d) {
        if (b)return h(b);
        C.Ga.ab(a);
        h(l, d)
    }));
    d = b[a] = new C.ya;
    d.url = a;
    return d
}, delete E);
C.bg = C.q.extend({$b: "Scene", ctor: function () {
    C.q.prototype.ctor.call(this);
    this.md = k;
    this.Kf(0.5, 0.5);
    this.mc(C.N.V)
}});
C.bg.create = function () {
    return new C.bg
};
C.Mh = C.bg.extend({Hc: l, ll: 0, Lk: 0, tg: l, $b: "LoaderScene", O: function () {
    var a = this, b = C.N.V, d = 200, e = C.c(b.width / 2, b.height / 2), b = a.xo = C.Qa.create(C.color(32, 32, 32, 255));
    b.Vb(0, 0);
    a.aa(b, 0);
    var f = 24, g = -d / 2 + 100;
    C.sp && (C.r.Zg(C.sp, {Hj: p}, function (b, f) {
        d = f.height;
        a.ep(f, e)
    }), f = 14, g = -d / 2 - 10);
    f = a.tg = C.l.create("Loading... 0%", "Arial", f);
    f.Vb(C.kh(e, C.c(0, g)));
    f.Pa(C.color(180, 180, 180));
    b.aa(this.tg, 10);
    return k
}, ep: function (a, b) {
    var d = this.ox = new C.ya;
    d.Wc(a);
    d.ab();
    d = this.Xw = C.R.create(d);
    d.fn(C.ba());
    d.x = b.x;
    d.y = b.y;
    this.xo.aa(d, 10)
}, kc: function () {
    C.q.prototype.kc.call(this);
    this.Ae(this.Vl, 0.3)
}, zb: function () {
    C.q.prototype.zb.call(this);
    this.tg.Vj("Loading... 0%")
}, Gr: function (a, b) {
    "string" == typeof a && (a = [a]);
    this.us = a || [];
    this.ua = b
}, Vl: function () {
    var a = this;
    a.Nf(a.Vl);
    var b = a.us;
    a.ll = b.length;
    C.r.load(b, function (b, e) {
        a.Lk = e
    }, function () {
        a.ua()
    });
    a.Ae(a.Yl)
}, Yl: function () {
    var a = this.Lk, b = this.ll, d;
    d = Math.min(100 * (a / b) | 0, 100);
    this.tg.Vj("Loading... " + d + "%");
    a >= b && this.Nf(this.Yl)
}});
C.Mh.es = function (a) {
    var b = G, d = C;
    d.$g || (d.$g = new C.Mh, d.$g.O());
    d.$g.Gr(b, a);
    C.N.Sm(d.$g)
};
C.pb = C.q.extend({$b: "Layer", ctor: function () {
    var a = C.q.prototype;
    a.ctor.call(this);
    this.md = k;
    a.Kf.call(this, 0.5, 0.5);
    a.mc.call(this, C.wh)
}});
C.pb.create = function () {
    return new C.pb
};
C.Yb = C.pb.extend({ca: k, J: 255, tb: 255, S: l, Ba: l, gb: p, Ja: p, $b: "LayerRGBA", ctor: function () {
    C.pb.prototype.ctor.call(this);
    this.S = C.color(255, 255, 255, 255);
    this.Ba = C.color(255, 255, 255, 255)
}, O: function () {
    var a = C.pb.prototype;
    this.md = k;
    a.Kf.call(this, 0.5, 0.5);
    a.mc.call(this, C.wh);
    this.cascadeColor = this.cascadeOpacity = p;
    return k
}, yf: w("tb"), Tq: w("J"), Fa: function (a) {
    this.J = this.tb = a;
    var b = 255, d = this.K;
    d && (d.ca && d.cascadeOpacity) && (b = d.J);
    this.ha(b);
    this.S.g = this.Ba.g = a
}, ha: function (a) {
    this.J = 0 | this.tb * a / 255;
    if (this.gb) {
        a = this.k;
        for (var b, d = 0; d < a.length; d++)(b = a[d]) && b.ca && b.ha(this.J)
    }
}, Gj: w("gb"), Rj: function (a) {
    this.gb !== a && ((this.gb = a) ? this.Ue() : this.ci())
}, Ue: function () {
    var a = 255, b = this.K;
    b && (b.ca && b.cascadeOpacity) && (a = b.J);
    this.ha(a)
}, ci: function () {
    this.J = this.tb;
    for (var a = this.k, b, d = 0; d < a.length; d++)(b = a[d]) && b.ca && b.ha(255)
}, vf: function () {
    var a = this.Ba;
    return C.color(a.f, a.e, a.a, a.g)
}, xf: function () {
    var a = this.S;
    return C.color(a.f, a.e, a.a)
}, Pa: function (a) {
    var b = this.S, d = this.Ba;
    b.f = d.f = a.f;
    b.e =
        d.e = a.e;
    b.a = d.a = a.a;
    b = (b = this.K) && b.ca && b.cascadeColor ? b.xf() : C.color.Ke;
    this.pa(b);
    a.g !== h && !a.lq && this.Fa(a.g)
}, pa: function (a) {
    var b = this.S, d = this.Ba;
    b.f = 0 | d.f * a.f / 255;
    b.e = 0 | d.e * a.e / 255;
    b.a = 0 | d.a * a.a / 255;
    if (this.Ja) {
        a = this.k;
        for (var e = 0; e < a.length; e++)(d = a[e]) && d.ca && d.pa(b)
    }
}, Fj: w("Ja"), Qj: function (a) {
    this.Ja !== a && ((this.Ja = a) ? this.Te() : this.bi())
}, Te: function () {
    var a;
    a = (a = this.K) && a.ca && a.cascadeColor ? a.xf() : C.color.Ke;
    this.pa(a)
}, bi: function () {
    var a = this.S, b = this.Ba;
    a.f = b.f;
    a.e = b.e;
    a.a = b.a;
    var a =
        this.k, b = C.color.Ke, d, e;
    for (e = 0; e < a.length; e++)(d = a[e]) && d.ca && d.pa(b)
}, aa: function (a, b, d) {
    C.q.prototype.aa.call(this, a, b, d);
    this.Ja && this.Te();
    this.gb && this.Ue()
}, Jd: u(), we: B(p)});
C.Qa = C.Yb.extend({ra: l, $b: "LayerColor", Mq: w("ra"), Zx: function (a, b) {
    this.width = a;
    this.height = b
}, Yx: v("width"), Xx: v("height"), Jd: u(), we: B(p), Pa: function (a) {
    C.Yb.prototype.Pa.call(this, a);
    this.na()
}, Fa: function (a) {
    C.Yb.prototype.Fa.call(this, a);
    this.na()
}, $e: p, ctor: l, O: function (a, b, d) {
    C.ma !== C.za && (this.shaderProgram = C.$s.nB(C.Iv));
    var e = C.N.V;
    a = a || C.color(0, 0, 0, 255);
    b = b === h ? e.width : b;
    d = d === h ? e.height : d;
    e = this.S;
    e.f = a.f;
    e.e = a.e;
    e.a = a.a;
    e = this.Ba;
    e.f = a.f;
    e.e = a.e;
    e.a = a.a;
    this.tb = this.J = a.g;
    a = C.Qa.prototype;
    a.mc.call(this, b, d);
    a.na.call(this);
    return k
}, $m: function (a, b) {
    this.ra = b === h ? a : {src: a, xb: b};
    C.ma === C.za && (this.$e = this.ra && 1 == this.ra.src && 771 == this.ra.xb)
}, ud: l, td: l, na: l, pa: function (a) {
    C.Yb.prototype.pa.call(this, a);
    this.na()
}, ha: function (a) {
    C.Yb.prototype.ha.call(this, a);
    this.na()
}, Rb: l});
C.Qa.create = function (a, b, d) {
    return new C.Qa(a, b, d)
};
C.Od = C.Qa.extend({Tl: l, Ve: l, ff: 255, We: 255, dd: l, $h: p, Vd: l, Ud: l, $b: "LayerGradient", ctor: function (a, b, d) {
    C.Qa.prototype.ctor.call(this);
    this.Tl = C.color(0, 0, 0, 255);
    this.Ve = C.color(0, 0, 0, 255);
    this.dd = C.c(0, -1);
    this.We = this.ff = 255;
    this.Vd = C.c(0, 0);
    this.Ud = C.c(0, 0);
    C.Od.prototype.O.call(this, a, b, d)
}, O: function (a, b, d) {
    a = a || C.color(0, 0, 0, 255);
    b = b || C.color(0, 0, 0, 255);
    d = d || C.c(0, -1);
    var e = this.Tl, f = this.Ve;
    e.f = a.f;
    e.e = a.e;
    e.a = a.a;
    this.ff = a.g;
    f.f = b.f;
    f.e = b.e;
    f.a = b.a;
    this.We = b.g;
    this.dd = d;
    this.$h = k;
    this.Vd = C.c(0,
        0);
    this.Ud = C.c(0, 0);
    C.Qa.prototype.O.call(this, C.color(a.f, a.e, a.a, 255));
    C.Od.prototype.na.call(this);
    return k
}, mc: function (a, b) {
    C.Qa.prototype.mc.call(this, a, b);
    this.na()
}, ud: function (a) {
    C.Qa.prototype.ud.call(this, a);
    this.na()
}, td: function (a) {
    C.Qa.prototype.td.call(this, a);
    this.na()
}, sr: w("Ba"), Vs: v("color"), Bs: function (a) {
    this.Ve = a;
    this.na()
}, Uq: w("Ve"), Ws: function (a) {
    this.ff = a;
    this.na()
}, tr: w("ff"), Cs: function (a) {
    this.We = a;
    this.na()
}, Vq: w("We"), Xs: function (a) {
    this.dd.x = a.x;
    this.dd.y = a.y;
    this.na()
},
    yr: function () {
        return C.c(this.dd.x, this.dd.y)
    }, gA: w("$h"), hC: function (a) {
        this.$h = a;
        this.na()
    }, Kw: l, na: l});
C.Od.create = function (a, b, d) {
    return new C.Od(a, b, d)
};
C.Lh = C.pb.extend({ld: 0, Hb: l, $b: "LayerMultiplex", ctor: function (a) {
    C.pb.prototype.ctor.call(this);
    a && C.Lh.prototype.Fr.call(this, a)
}, Fr: function (a) {
    0 < a.length && a[a.length - 1] == l && C.log(C.b.Uu);
    this.Hb = a;
    this.ld = 0;
    this.aa(this.Hb[this.ld]);
    return k
}, sD: function (a) {
    a >= this.Hb.length ? C.log(C.b.Vu) : (this.removeChild(this.Hb[this.ld], k), this.ld = a, this.aa(this.Hb[a]))
}, tD: function (a) {
    a >= this.Hb.length ? C.log(C.b.Wu) : (this.removeChild(this.Hb[this.ld], k), this.Hb[this.ld] = l, this.ld = a, this.aa(this.Hb[a]))
}, wx: function (a) {
    a ?
        this.Hb.push(a) : C.log(C.b.Tu)
}});
C.Lh.create = function () {
    return new C.Lh(arguments)
};
C.ma === C.za && (E = C.Qa.prototype, E.ctor = function (a, b, d) {
    C.Yb.prototype.ctor.call(this);
    this.ra = new C.dk(C.Rf, C.Qf);
    C.Qa.prototype.O.call(this, a, b, d)
}, E.ud = C.Yb.prototype.ud, E.td = C.Yb.prototype.td, E.na = u(), E.Rb = function (a) {
    a = a || C.L;
    var b = C.view, d = this.S;
    a.fillStyle = "rgba(" + (0 | d.f) + "," + (0 | d.e) + "," + (0 | d.a) + "," + this.J / 255 + ")";
    a.fillRect(0, 0, this.width * b.G, -this.height * b.M);
    C.qe++
}, E = C.Od.prototype, E.Rb = function (a) {
    a = a || C.L;
    this.$e && (a.globalCompositeOperation = "lighter");
    a.save();
    var b = C.view, d = this.J / 255,
        e = this.width * b.G, b = this.height * b.M, f = a.createLinearGradient(this.Vd.x, this.Vd.y, this.Ud.x, this.Ud.y), g = this.S, m = this.Ve;
    f.addColorStop(0, "rgba(" + Math.round(g.f) + "," + Math.round(g.e) + "," + Math.round(g.a) + "," + (d * (this.ff / 255)).toFixed(4) + ")");
    f.addColorStop(1, "rgba(" + Math.round(m.f) + "," + Math.round(m.e) + "," + Math.round(m.a) + "," + (d * (this.We / 255)).toFixed(4) + ")");
    a.fillStyle = f;
    a.fillRect(0, 0, e, -b);
    0 != this.fx && a.rotate(this.gx);
    a.restore()
}, E.na = function () {
    var a = this.dd, b = 0.5 * this.width, d = 0.5 * this.height;
    this.Vd.x = b * -a.x + b;
    this.Vd.y = d * a.y - d;
    this.Ud.x = b * a.x + b;
    this.Ud.y = d * -a.y - d
});
window._p = C.Yb.prototype;
C.d(E, "opacityModifyRGB", E.we, E.Jd);
C.d(E, "opacity", E.yf, E.Fa);
C.d(E, "cascadeOpacity", E.Gj, E.Rj);
C.d(E, "color", E.vf, E.Pa);
C.d(E, "cascadeColor", E.Fj, E.Qj);
delete window._p;
window._p = C.Qa.prototype;
C.d(E, "width", E.Ze, E.ud);
C.d(E, "height", E.Ye, E.td);
delete window._p;
window._p = C.Od.prototype;
C.d(E, "startColor", E.sr, E.Vs);
C.d(E, "endColor", E.Uq, E.Bs);
C.d(E, "startOpacity", E.tr, E.Ws);
C.d(E, "endOpacity", E.Vq, E.Cs);
C.d(E, "vector", E.yr, E.Xs);
delete window._p;
C.tk = -1;
C.re = function (a) {
    function b() {
        var b = C.re, e = a.width, m = a.height;
        d[0].width = e;
        d[0].height = m;
        d[1].width = e;
        d[1].height = m;
        d[2].width = e;
        d[2].height = m;
        d[3].width = e;
        d[3].height = m;
        b.canvas.width = e;
        b.canvas.height = m;
        var n = b.canvas.getContext("2d");
        n.drawImage(a, 0, 0);
        b.Yj.width = e;
        b.Yj.height = m;
        for (var n = n.getImageData(0, 0, e, m).data, q = 0; 4 > q; q++) {
            var s = d[q].getContext("2d");
            s.getImageData(0, 0, e, m).data;
            b.pn.drawImage(a, 0, 0);
            for (var t = b.pn.getImageData(0, 0, e, m), x = t.data, y = 0; y < n.length; y += 4)x[y] = 0 === q ? n[y] : 0, x[y +
                1] = 1 === q ? n[y + 1] : 0, x[y + 2] = 2 === q ? n[y + 2] : 0, x[y + 3] = n[y + 3];
            s.putImageData(t, 0, 0)
        }
        a.onload = l
    }

    if (a.gm)return a.gm;
    var d = [C.W("canvas"), C.W("canvas"), C.W("canvas"), C.W("canvas")];
    try {
        b()
    } catch (e) {
        a.onload = b
    }
    return a.gm = d
};
C.re.canvas = C.W("canvas");
C.re.Yj = C.W("canvas");
C.re.pn = C.re.Yj.getContext("2d");
C.Ay = function (a, b, d) {
    d || (d = C.rect(0, 0, a.width, a.height), d = C.$f(d));
    var e = C.W("canvas"), f = e.getContext("2d");
    e.width != d.width && (e.width = d.width);
    e.height != d.height && (e.height = d.height);
    f.save();
    f.drawImage(a, d.x, d.y, d.width, d.height, 0, 0, d.width, d.height);
    f.globalCompositeOperation = "source-in";
    f.globalAlpha = b.g / 255;
    f.fillStyle = "rgb(" + b.f + "," + b.e + "," + b.a + ")";
    f.fillRect(0, 0, d.width, d.height);
    f.restore();
    return e
};
C.tm = function (a, b, d, e, f) {
    e || (e = C.rect(0, 0, a.width, a.height));
    a = d.f / 255;
    var g = d.e / 255;
    d = d.a / 255;
    var m = Math.min(e.width, b[0].width), n = Math.min(e.height, b[0].height), q;
    f ? (q = f.getContext("2d"), q.clearRect(0, 0, m, n)) : (f = C.W("canvas"), f.width = m, f.height = n, q = f.getContext("2d"));
    q.save();
    q.globalCompositeOperation = "lighter";
    var s = q.globalAlpha;
    0 < a && (q.globalAlpha = a * s, q.drawImage(b[0], e.x, e.y, m, n, 0, 0, m, n));
    0 < g && (q.globalAlpha = g * s, q.drawImage(b[1], e.x, e.y, m, n, 0, 0, m, n));
    0 < d && (q.globalAlpha = d * s, q.drawImage(b[2],
        e.x, e.y, m, n, 0, 0, m, n));
    1 > a + g + d && (q.globalAlpha = s, q.drawImage(b[3], e.x, e.y, m, n, 0, 0, m, n));
    q.restore();
    return f
};
C.pm = function (a, b) {
    if (!a)return l;
    if (!b)return a;
    var d = C.W("canvas");
    d.width = b.width;
    d.height = b.height;
    var e = d.getContext("2d");
    e.translate(d.width / 2, d.height / 2);
    e.rotate(-1.5707963267948966);
    e.drawImage(a, b.x, b.y, b.height, b.width, -b.height / 2, -b.width / 2, b.height, b.width);
    return d
};
C.ao = function (a) {
    return 0 | a
};
C.eo && (C.ao = r());
C.R = C.xa.extend({ca: k, dirty: p, atlasIndex: 0, textureAtlas: l, C: l, qd: l, Wd: l, Fg: p, mj: l, ra: l, H: l, j: l, Oa: p, Va: l, je: l, Lc: p, La: p, Ma: p, fa: p, Ta: l, ql: l, $b: "Sprite", dt: w("fa"), ne: function (a, b) {
    this.Ta || (this.Ta = []);
    this.Ta.push({uf: a, pe: b})
}, ed: function () {
    if (this.Ta) {
        for (var a = this.Ta, b = 0, d = a.length; b < d; b++) {
            var e = a[b];
            e.uf.call(e.pe, this)
        }
        a.length = 0
    }
}, hA: w("dirty"), qC: v("dirty"), Qr: w("Oa"), Ey: w("atlasIndex"), gC: v("atlasIndex"), Lz: function () {
    return C.rect(this.j.x, this.j.y, this.j.width, this.j.height)
}, Kz: w("textureAtlas"),
    XC: v("textureAtlas"), nz: w("Va"), Uo: function () {
        return this.Va.x
    }, Vo: function () {
        return this.Va.y
    }, Mq: w("ra"), Sb: function (a) {
        C.assert(a, C.b.Yv);
        a.fa || (this.fa = p, a.ne(this.Sl, this));
        var b = this.Tb(a.jc(), a.Ad());
        this.Lf(a);
        return b
    }, Sl: l, eA: function (a) {
        C.assert(C.b.Zv);
        a = C.Kd.Bd(a);
        return this.Sb(a)
    }, KD: function (a) {
        this.textureAtlas = a.textureAtlas;
        this.C = a
    }, kn: function (a) {
        this.j.x = a.x;
        this.j.y = a.y;
        this.j.width = a.width;
        this.j.height = a.height
    }, De: function () {
        if (this.dc) {
            for (var a, b, d = this.k, e, f = 1; f < d.length; f++) {
                b =
                    d[f];
                a = f - 1;
                for (e = d[a]; 0 <= a && (b.ka < e.ka || b.ka == e.ka && b.arrivalOrder < e.arrivalOrder);)d[a + 1] = e, a -= 1, e = d[a];
                d[a + 1] = b
            }
            this.C && this.vc(d, C.q.Zb.De);
            this.dc = p
        }
    }, Nj: function (a, b) {
        C.assert(a, C.b.aw);
        -1 === this.k.indexOf(a) ? C.log(C.b.$v) : b !== a.zIndex && (this.C && !this.dc && (this.Ql(), this.C.UB(k)), C.q.prototype.Nj.call(this, a, b))
    }, removeChild: function (a, b) {
        this.C && this.C.ts(a);
        C.q.prototype.removeChild.call(this, a, b)
    }, Mj: function (a) {
        var b = this.k, d = this.C;
        if (d && b != l)for (var e = 0, f = b.length; e < f; e++)d.ts(b[e]);
        C.q.prototype.Mj.call(this,
            a);
        this.Wd = p
    }, an: function (a) {
        this.dirty = this.qd = a;
        a = this.k;
        for (var b, d = a ? a.length : 0, e = 0; e < d; e++)b = a[e], b instanceof C.R && b.an(k)
    }, z: function (a) {
        C.q.prototype.z.call(this);
        !a && (this.C && !this.qd) && (this.Wd ? this.an(k) : this.dirty = this.qd = k)
    }, Dj: function (a) {
        this.C ? C.log(C.b.Wv) : C.q.prototype.Dj.call(this, a)
    }, Ds: function (a) {
        this.La != a && (this.La = a, this.bb(this.j, this.Oa, this.i), this.z(k))
    }, Es: function (a) {
        this.Ma != a && (this.Ma = a, this.bb(this.j, this.Oa, this.i), this.z(k))
    }, Kr: w("La"), Lr: w("Ma"), Jd: l, we: w("Lc"),
    ha: l, sC: function (a, b) {
        C.assert(a, C.b.ew);
        var d = C.Pg.Kq(a);
        d ? (d = d.Na[b]) ? this.Lf(d.Bd()) : C.log(C.b.dw) : C.log(C.b.cw)
    }, Lq: w("C"), Ql: function () {
        if (!this.dc) {
            this.dc = k;
            for (var a = this.K; a && a != this.C;)a.Ql(), a = a.parent
        }
    }, jc: w("H"), zg: l, ax: l, Mi: p, Zh: p, $e: p, be: l, lf: l, Pk: l, ctor: l, aq: function (a, b) {
        if (a === h)C.R.prototype.O.call(this); else if ("string" === typeof a)if ("#" === a[0]) {
            var d = C.Kd.Bd(a.substr(1, a.length - 1));
            this.Sb(d)
        } else C.R.prototype.O.call(this, a, b); else if ("object" === typeof a)if (a instanceof C.ya)this.Tb(a,
            b); else if (a instanceof C.Ia)this.Sb(a); else if (a instanceof HTMLImageElement || a instanceof HTMLCanvasElement)d = new C.ya, d.Wc(a), d.ab(), this.Tb(d)
    }, kr: w("zg"), $m: l, O: l, Cd: function (a, b) {
        C.assert(a, C.b.Xv);
        var d = C.Ga.ct(a);
        if (d) {
            if (!b) {
                var e = d.wf();
                b = C.rect(0, 0, e.width, e.height)
            }
        } else d = C.Ga.wd(a);
        return this.Tb(d, b)
    }, Tb: l, Xl: l, bb: l, Ld: l, aa: l, GD: function () {
        var a = this.S, b = this.J, a = {f: a.f, e: a.e, a: a.a, g: b};
        this.Lc && (a.f *= b / 255, a.e *= b / 255, a.a *= b / 255);
        b = this.zg;
        b.Uc.vj = a;
        b.Vc.vj = a;
        b.Zc.vj = a;
        b.$c.vj = a;
        this.C &&
        (this.atlasIndex != C.tk ? this.textureAtlas.ID(b, this.atlasIndex) : this.dirty = k);
        this.Mi = k
    }, Fa: l, Pa: l, pa: l, Lf: l, rC: function (a) {
        C.log(C.b.bw);
        this.Lf(a)
    }, Mr: l, ky: function () {
        return C.Ia.create(this.H, C.Ge(this.j), this.Oa, C.Xn(this.je), C.co(this.i))
    }, Zm: l, oc: l, qx: function () {
        this.C ? C.log(C.b.Vv) : (this.ra.src = C.SRC_ALPHA, this.ra.xb = C.ONE_MINUS_SRC_ALPHA, this.opacityModifyRGB = p)
    }, jg: function () {
        var a, b = this.H, d = this.lf;
        if (b && (d.vh && this.be) && (a = b.Sa))if (b = C.Ga.vr(this.be.Sa))this.Zh = k, a instanceof HTMLCanvasElement && !this.Oa && !this.ql ? C.tm(a, b, this.S, d, a) : (a = C.tm(a, b, this.S, d), b = new C.ya, b.Wc(a), b.ab(), this.texture = b)
    }, Xp: function (a) {
        a = C.Ge(a);
        var b = this.C ? this.textureAtlas.texture : this.H;
        if (b) {
            var d = b.nh, e = b.mh, f, g = this.zg;
            this.Oa ? (C.Xf ? (b = (2 * a.x + 1) / (2 * d), d = b + (2 * a.height - 2) / (2 * d), f = (2 * a.y + 1) / (2 * e), a = f + (2 * a.width - 2) / (2 * e)) : (b = a.x / d, d = (a.x + a.height) / d, f = a.y / e, a = (a.y + a.width) / e), this.La && (e = f, f = a, a = e), this.Ma && (e = b, b = d, d = e), g.Uc.s.va = b, g.Uc.s.wa = f, g.Vc.s.va = b, g.Vc.s.wa = a, g.Zc.s.va = d, g.Zc.s.wa = f, g.$c.s.va = d, g.$c.s.wa =
                a) : (C.Xf ? (b = (2 * a.x + 1) / (2 * d), d = b + (2 * a.width - 2) / (2 * d), f = (2 * a.y + 1) / (2 * e), a = f + (2 * a.height - 2) / (2 * e)) : (b = a.x / d, d = (a.x + a.width) / d, f = a.y / e, a = (a.y + a.height) / e), this.La && (e = b, b = d, d = e), this.Ma && (e = f, f = a, a = e), g.Uc.s.va = b, g.Uc.s.wa = a, g.Vc.s.va = d, g.Vc.s.wa = a, g.Zc.s.va = b, g.Zc.s.wa = f, g.$c.s.va = d, g.$c.s.wa = f);
            this.Mi = k
        }
    }, Rb: l});
C.R.create = function (a, b) {
    return new C.R(a, b)
};
C.ma === C.za && (E = C.R.prototype, E.Sl = function (a) {
    this.z(k);
    this.bb(a.Ad(), a.kb, a.sb);
    a = this.color;
    (255 !== a.f || 255 !== a.e || 255 !== a.a) && this.jg();
    this.ed()
}, E.Jd = function (a) {
    this.Lc !== a && (this.Lc = a, this.z(k))
}, E.ha = function (a) {
    C.xa.prototype.ha.call(this, a);
    this.ee()
}, E.ctor = function (a, b) {
    C.xa.prototype.ctor.call(this);
    this.Fg = p;
    this.Va = C.c(0, 0);
    this.je = C.c(0, 0);
    this.ra = {src: C.Rf, xb: C.Qf};
    this.j = C.rect(0, 0, 0, 0);
    this.ql = p;
    this.fa = k;
    this.lf = {x: 0, y: 0, width: 0, height: 0, vh: p};
    this.Pk = C.size(0, 0);
    this.aq(a, b)
},
    E.$m = function (a, b) {
        var d = this.ra;
        b === h ? (d.src = a.src, d.xb = a.xb) : (d.src = a, d.xb = b);
        this.$e = d && (d.src == C.SRC_ALPHA && d.xb == C.ONE || d.src == C.ONE && d.xb == C.ONE)
    }, E.O = function () {
    if (0 < arguments.length)return this.Cd(arguments[0], arguments[1]);
    C.xa.prototype.O.call(this);
    this.dirty = this.qd = p;
    this.Lc = k;
    this.ra.src = C.Rf;
    this.ra.xb = C.Qf;
    this.texture = l;
    this.fa = k;
    this.La = this.Ma = p;
    this.anchorY = this.anchorX = 0.5;
    this.Va.x = 0;
    this.Va.y = 0;
    this.Wd = p;
    this.bb(C.rect(0, 0, 0, 0), p, C.size(0, 0));
    return k
}, E.Tb = function (a, b, d) {
    C.assert(0 !=
        arguments.length, C.b.Pt);
    d = d || p;
    if (!C.xa.prototype.O.call(this))return p;
    this.C = l;
    this.dirty = this.qd = p;
    this.Lc = k;
    this.ra.src = C.Rf;
    this.ra.xb = C.Qf;
    this.La = this.Ma = p;
    this.anchorY = this.anchorX = 0.5;
    this.Va.x = 0;
    this.Va.y = 0;
    this.Wd = p;
    var e = a.Ic;
    this.fa = e;
    if (!e)return this.Oa = d || p, b && (this.j.x = b.x, this.j.y = b.y, this.j.width = b.width, this.j.height = b.height), a.ne(this.Xl, this), k;
    b || (b = C.rect(0, 0, a.width, a.height));
    this.texture = this.be = a;
    this.bb(b, d);
    this.batchNode = l;
    return k
}, E.Xl = function (a) {
    if (!this.fa) {
        this.fa =
            k;
        var b = this.j;
        b ? C.Fp(b) && (b.width = a.width, b.height = a.height) : b = C.rect(0, 0, a.width, a.height);
        this.texture = this.be = a;
        this.bb(b, this.Oa);
        this.batchNode = this.C;
        this.ed()
    }
}, E.bb = function (a, b, d) {
    this.Oa = b || p;
    this.mc(d || a);
    this.kn(a);
    b = this.lf;
    d = C.ba();
    b.x = 0 | a.x * d;
    b.y = 0 | a.y * d;
    b.width = 0 | a.width * d;
    b.height = 0 | a.height * d;
    b.vh = !(0 === b.width || 0 === b.height || 0 > b.x || 0 > b.y);
    a = this.je;
    this.La && (a.x = -a.x);
    this.Ma && (a.y = -a.y);
    this.Va.x = a.x + (this.i.width - this.j.width) / 2;
    this.Va.y = a.y + (this.i.height - this.j.height) / 2;
    this.C && (this.dirty = k)
}, E.Ld = function () {
    if (this.dirty) {
        var a = this.K;
        !this.ke || a && a != this.C && a.Fg ? this.Fg = k : (this.Fg = p, this.mj = !a || a == this.C ? this.Ub() : C.Pf(this.Ub(), a.mj));
        this.dirty = this.qd = p
    }
    this.Wd && this.vc(this.k, C.q.Zb.Ld)
}, E.aa = function (a, b, d) {
    C.assert(a, C.b.Ot);
    b == l && (b = a.ka);
    d == l && (d = a.tag);
    C.xa.prototype.aa.call(this, a, b, d);
    this.Wd = k
}, E.Fa = function (a) {
    C.xa.prototype.Fa.call(this, a);
    this.ee()
}, E.Pa = function (a) {
    var b = this.color;
    b.f === a.f && b.e === a.e && b.a === a.a && b.g === a.g || (C.xa.prototype.Pa.call(this,
        a), this.jg(), this.ee())
}, E.pa = function (a) {
    var b = this.color;
    C.xa.prototype.pa.call(this, a);
    a = this.S;
    b.f === a.f && b.e === a.e && b.a === a.a || (this.jg(), this.ee())
}, E.Lf = function (a) {
    var b = this;
    "string" == typeof a && (a = C.Kd.Bd(a), C.assert(a, C.b.Qt));
    b.z(k);
    var d = a.Kc;
    b.je.x = d.x;
    b.je.y = d.y;
    b.Oa = a.kb;
    var d = a.jc(), e = a.fa;
    e || (b.fa = p, a.ne(function (a) {
        b.fa = k;
        var d = a.jc();
        d != b.H && (b.texture = d);
        b.bb(a.Ad(), a.kb, a.sb);
        b.ed()
    }, b));
    d != b.H && (b.texture = d);
    b.Oa && (b.be = d);
    b.bb(a.Ad(), b.Oa, a.sb);
    b.Zh = p;
    e && (a = b.color, (255 !== a.f ||
        255 !== a.e || 255 !== a.a) && b.jg())
}, E.Mr = function (a) {
    return a.jc() != this.H ? p : C.ns(a.Ad(), this.j)
}, E.Zm = function (a) {
    (this.C = a) ? (this.mj = {g: 1, a: 0, n: 0, o: 1, t: 0, u: 0}, this.textureAtlas = this.C.textureAtlas) : (this.atlasIndex = C.tk, this.textureAtlas = l, this.dirty = this.qd = p)
}, E.oc = function (a) {
    a && "string" === typeof a ? (a = C.Ga.wd(a), this.oc(a), a = a.wf(), this.bb(C.rect(0, 0, a.width, a.height))) : (C.assert(!a || a instanceof C.ya, C.b.Rt), this.H != a && (a && a.Sa instanceof HTMLImageElement && (this.be = a), this.H = a))
}, E.Rb = function (a) {
    if (this.fa) {
        a =
            a || C.L;
        this.$e && (a.globalCompositeOperation = "lighter");
        var b = C.view.G, d = C.view.M;
        a.globalAlpha = this.J / 255;
        var e = this.j, f = this.i, g = this.Va, m = this.Pk, n = 0 | g.x, q = -g.y - e.height, s = this.lf;
        m.width = e.width * b;
        m.height = e.height * d;
        if (this.La || this.Ma)a.save(), this.La && (n = -g.x - e.width, a.scale(-1, 1)), this.Ma && (q = g.y, a.scale(1, -1));
        n *= b;
        q *= d;
        this.H && s.vh ? (f = this.H.Sa, this.Zh ? a.drawImage(f, 0, 0, s.width, s.height, n, q, m.width, m.height) : a.drawImage(f, s.x, s.y, s.width, s.height, n, q, m.width, m.height)) : 0 !== f.width && (m = this.color,
            a.fillStyle = "rgba(" + m.f + "," + m.e + "," + m.a + ",1)", a.fillRect(n, q, f.width * b, f.height * d));
        1 === C.sk || this.Zp ? (a.strokeStyle = "rgba(0,255,0,1)", n /= b, q = -(q / d), C.pg.Cq([C.c(n, q), C.c(n + e.width, q), C.c(n + e.width, q - e.height), C.c(n, q - e.height)], 4, k)) : 2 === C.sk && (a.strokeStyle = "rgba(0,255,0,1)", b = this.j, q = -q, C.pg.Cq([C.c(n, q), C.c(n + b.width, q), C.c(n + b.width, q - b.height), C.c(n, q - b.height)], 4, k));
        (this.La || this.Ma) && a.restore();
        C.qe++
    }
}, delete E);
C.pc = C.P.extend({ef: l, Aa: 0, pf: l, ctor: function () {
    this.Aa = 0
}, Da: function () {
    var a = new C.pc;
    a.Sb(this.ef.Da(), this.Aa, this.pf);
    return a
}, Qg: function () {
    return C.Da(this)
}, copy: function () {
    var a = new C.pc;
    a.Sb(this.ef.Da(), this.Aa, this.pf);
    return a
}, Sb: function (a, b, d) {
    this.ef = a;
    this.Aa = b;
    this.pf = d;
    return k
}, Bd: w("ef"), Lf: v("ef"), Py: w("Aa"), mC: v("Aa"), Qz: w("pf"), aD: v("pf")});
C.Md = C.P.extend({Na: l, $d: 0, Bg: p, Lw: 0, Aa: 0, hc: 0, ctor: function () {
    this.Na = []
}, $y: w("Na"), xC: v("Na"), rj: function (a) {
    var b = new C.pc;
    b.Sb(a, 1, l);
    this.Na.push(b);
    this.hc++
}, zx: function (a) {
    a = C.Ga.wd(a);
    var b = C.rect(0, 0, 0, 0);
    b.width = a.width;
    b.height = a.height;
    a = C.Ia.create(a, b);
    this.rj(a)
}, Ax: function (a, b) {
    var d = C.Ia.create(a, b);
    this.rj(d)
}, Xg: function (a, b, d) {
    C.sj(a, C.pc);
    this.Aa = b;
    this.$d = d;
    this.hc = 0;
    b = this.Na;
    for (d = b.length = 0; d < a.length; d++) {
        var e = a[d];
        b.push(e);
        this.hc += e.Aa
    }
    return k
}, Da: function () {
    var a =
        new C.Md;
    a.Xg(this.Kk(), this.Aa, this.$d);
    a.Uj(this.Bg);
    return a
}, Qg: function () {
    var a = new C.Md;
    a.Xg(this.Kk(), this.Aa, this.$d);
    a.Uj(this.Bg);
    return a
}, Kk: function () {
    for (var a = [], b = 0; b < this.Na.length; b++)a.push(this.Na[b].Da());
    return a
}, copy: function () {
    return this.Qg(l)
}, gz: w("$d"), CC: v("$d"), Uj: v("Bg"), zz: w("Bg"), Wy: function () {
    return this.hc * this.Aa
}, Oy: w("Aa"), lC: v("Aa"), Nz: w("hc"), Dm: function (a, b) {
    C.sj(a, C.Ia);
    this.$d = 1;
    this.Aa = b || 0;
    this.hc = 0;
    var d = this.Na;
    d.length = 0;
    if (a) {
        for (var e = 0; e < a.length; e++) {
            var f =
                a[e], g = new C.pc;
            g.Sb(f, 1, l);
            d.push(g)
        }
        this.hc += a.length
    }
    return k
}, Rm: u(), oh: u()});
C.Md.create = function (a, b, d) {
    var e = arguments.length, f = new C.Md;
    0 == e ? f.Dm(l, 0) : (e = a[0]) && (e instanceof C.Ia ? f.Dm(a, b) : e instanceof C.pc && f.Xg(a, b, d));
    return f
};
C.Pg = {Sd: {}, bm: function (a, b) {
    this.Sd[b] = a
}, HB: function (a) {
    a && this.Sd[a] && delete this.Sd[a]
}, Kq: function (a) {
    return this.Sd[a] ? this.Sd[a] : l
}, uo: function (a, b) {
    var d = a.animations;
    if (d) {
        var e = 1, f = a.properties;
        if (f)for (var e = f.format != l ? parseInt(f.format) : e, f = f.spritesheets, g = C.Kd, m = C.path, n = 0; n < f.length; n++)g.nq(m.fm(b, f[n]));
        switch (e) {
            case 1:
                this.Ap(d);
                break;
            case 2:
                this.Bp(d);
                break;
            default:
                C.log(C.b.Ex)
        }
    } else C.log(C.b.Dx)
}, tx: function (a) {
    C.assert(a, C.b.Mx);
    var b = C.r.zf(a);
    b ? this.uo(b, a) : C.log(C.b.Lx)
},
    Ap: function (a) {
        var b = C.Kd, d;
        for (d in a) {
            var e = a[d], f = e.frames, e = parseFloat(e.delay) || 0, g = l;
            if (f) {
                for (var g = [], m = 0; m < f.length; m++) {
                    var n = b.Bd(f[m]);
                    if (n) {
                        var q = new C.pc;
                        q.Sb(n, 1, l);
                        g.push(q)
                    } else C.log(C.b.Gx, d, f[m])
                }
                0 === g.length ? C.log(C.b.Hx, d) : (g.length != f.length && C.log(C.b.Ix, d), g = C.Md.create(g, e, 1), C.Pg.bm(g, d))
            } else C.log(C.b.Fx, d)
        }
    }, Bp: function (a) {
        var b = C.Kd, d;
        for (d in a) {
            var e = a[d], f = parseInt(e.loops), f = e.loop ? C.He : isNaN(f) ? 1 : f, g = e.restoreOriginalFrame && e.restoreOriginalFrame == k ? k : p, m = e.frames;
            if (m) {
                for (var n = [], q = 0; q < m.length; q++) {
                    var s = m[q], t = s.spriteframe, x = b.Bd(t);
                    if (x) {
                        var t = parseFloat(s.delayUnits) || 0, s = s.notification, y = new C.pc;
                        y.Sb(x, t, s);
                        n.push(y)
                    } else C.log(C.b.Kx, d, t)
                }
                e = parseFloat(e.delayPerUnit) || 0;
                m = new C.Md;
                m.Xg(n, e, f);
                m.Uj(g);
                C.Pg.bm(m, d)
            } else C.log(C.b.Jx, d)
        }
    }, fd: function () {
        this.Sd = {}
    }};
C.Ia = C.P.extend({Kc: l, sb: l, Ca: l, kb: p, j: l, ib: l, Wa: l, H: l, he: "", fa: p, qg: l, ctor: function () {
    this.Kc = C.c(0, 0);
    this.ib = C.c(0, 0);
    this.sb = C.size(0, 0);
    this.kb = p;
    this.Wa = C.size(0, 0);
    this.he = "";
    this.H = l;
    this.fa = p
}, dt: w("fa"), ne: function (a, b) {
    this.qg == l && (this.qg = []);
    this.qg.push({uf: a, pe: b})
}, ed: function () {
    var a = this.qg;
    if (a) {
        for (var b = 0, d = a.length; b < d; b++) {
            var e = a[b];
            e.uf.call(e.pe, this)
        }
        a.length = 0
    }
}, lr: function () {
    var a = this.Ca;
    return C.rect(a.x, a.y, a.width, a.height)
}, OC: function (a) {
    this.Ca || (this.Ca = C.rect(0,
        0, 0, 0));
    this.Ca.x = a.x;
    this.Ca.y = a.y;
    this.Ca.width = a.width;
    this.Ca.height = a.height;
    this.j = C.$f(a)
}, pA: w("kb"), QC: v("kb"), Ad: function () {
    var a = this.j;
    return C.rect(a.x, a.y, a.width, a.height)
}, en: function (a) {
    this.j || (this.j = C.rect(0, 0, 0, 0));
    this.j.x = a.x;
    this.j.y = a.y;
    this.j.width = a.width;
    this.j.height = a.height;
    this.Ca = C.Ge(this.j)
}, mz: w("ib"), JC: function (a) {
    this.ib.x = a.x;
    this.ib.y = a.y;
    C.Uh(this.ib, this.Kc)
}, qz: w("Wa"), MC: function (a) {
    this.Wa.width = a.width;
    this.Wa.height = a.height
}, pz: w("sb"), LC: function (a) {
    this.sb.width =
        a.width;
    this.sb.height = a.height
}, jc: function () {
    if (this.H)return this.H;
    if ("" !== this.he) {
        var a = C.Ga.wd(this.he);
        a && (this.fa = a.Ic);
        return a
    }
    return l
}, oc: function (a) {
    if (this.H != a) {
        var b = a.Ic;
        this.fa = b;
        this.H = a;
        b || a.ne(function (a) {
            this.fa = k;
            if (this.kb && C.ma === C.za) {
                var b = a.Sa, b = C.pm(b, this.Ad()), f = new C.ya;
                f.Wc(b);
                f.ab();
                this.oc(f);
                b = this.Ad();
                this.en(C.rect(0, 0, b.width, b.height))
            }
            b = this.j;
            0 === b.width && 0 === b.height && (b = a.width, a = a.height, this.j.width = b, this.j.height = a, this.Ca = C.Ge(this.j), this.Wa.width =
                this.Ca.width, this.Wa.height = this.Ca.height, this.sb.width = b, this.sb.height = a);
            this.ed()
        }, this)
    }
}, lz: w("Kc"), IC: function (a) {
    this.Kc.x = a.x;
    this.Kc.y = a.y
}, Da: function () {
    var a = new C.Ia;
    a.Tb(this.he, this.Ca, this.kb, this.ib, this.Wa);
    a.oc(this.H);
    return a
}, Qg: function () {
    var a = new C.Ia;
    a.Tb(this.he, this.Ca, this.kb, this.ib, this.Wa);
    a.oc(this.H);
    return a
}, copy: function () {
    return this.Qg()
}, Tb: function (a, b, d, e, f) {
    2 === arguments.length && (b = C.Ge(b));
    e = e || C.c(0, 0);
    f = f || b;
    d = d || p;
    "string" == typeof a ? (this.H = l, this.he =
        a) : a instanceof C.ya && this.oc(a);
    this.Ca = b;
    this.j = C.$f(b);
    this.ib.x = e.x;
    this.ib.y = e.y;
    C.Uh(e, this.Kc);
    this.Wa.width = f.width;
    this.Wa.height = f.height;
    C.Bk(f, this.sb);
    this.kb = d;
    return k
}});
C.Ia.create = function (a, b, d, e, f) {
    var g = new C.Ia;
    switch (arguments.length) {
        case 2:
            g.Tb(a, b);
            break;
        case 5:
            g.Tb(a, b, d, e, f);
            break;
        default:
            c("Argument must be non-nil ")
    }
    return g
};
C.Ia.Nw = function (a, b, d, e, f) {
    var g = new C.Ia;
    g.H = a;
    g.Ca = b;
    g.j = C.$f(b);
    g.ib.x = e.x;
    g.ib.y = e.y;
    C.Uh(g.ib, g.Kc);
    g.Wa.width = f.width;
    g.Wa.height = f.height;
    C.Bk(g.Wa, g.sb);
    g.kb = d;
    return g
};
C.Kd = {yk: /^\s*\{\s*([\-]?\d+[.]?\d*)\s*,\s*([\-]?\d+[.]?\d*)\s*\}\s*$/, po: /^\s*\{\s*\{\s*([\-]?\d+[.]?\d*)\s*,\s*([\-]?\d+[.]?\d*)\s*\}\s*,\s*\{\s*([\-]?\d+[.]?\d*)\s*,\s*([\-]?\d+[.]?\d*)\s*\}\s*\}\s*$/, vb: {}, ec: {}, Xe: {}, Cl: function (a) {
    a = this.po.exec(a);
    return!a ? C.rect(0, 0, 0, 0) : C.rect(parseFloat(a[1]), parseFloat(a[2]), parseFloat(a[3]), parseFloat(a[4]))
}, wl: function (a) {
    a = this.yk.exec(a);
    return!a ? C.c(0, 0) : C.c(parseFloat(a[1]), parseFloat(a[2]))
}, dj: function (a) {
    a = this.yk.exec(a);
    return!a ? C.size(0, 0) :
        C.size(parseFloat(a[1]), parseFloat(a[2]))
}, So: function (a) {
    var b = C.r.zf(a);
    C.assert(b, C.b.iD, a);
    C.r.oh(a);
    if (b.gp)return this.Xe[a] = b;
    var d = b.frames, e = b.metadata || b.meta, b = {}, f = {}, g = 0;
    e && (g = e.format, g = 1 >= g.length ? parseInt(g) : g, f.Er = e.textureFileName || e.textureFileName || e.image);
    for (var m in d) {
        var n = d[m];
        if (n) {
            e = {};
            if (0 == g) {
                e.rect = C.rect(n.x, n.y, n.width, n.height);
                e.rh = p;
                e.offset = C.c(n.offsetX, n.offsetY);
                var q = n.originalWidth, n = n.originalHeight;
                (!q || !n) && C.log(C.b.hD);
                q = Math.abs(q);
                n = Math.abs(n);
                e.size =
                    C.size(q, n)
            } else if (1 == g || 2 == g)e.rect = this.Cl(n.frame), e.rh = n.rotated || p, e.offset = this.wl(n.offset), e.size = this.dj(n.sourceSize); else if (3 == g) {
                var q = this.dj(n.spriteSize), s = this.Cl(n.textureRect);
                q && (s = C.rect(s.x, s.y, q.width, q.height));
                e.rect = s;
                e.rh = n.textureRotated || p;
                e.offset = this.wl(n.spriteOffset);
                e.size = this.dj(n.spriteSourceSize);
                e.oq = n.aliases
            } else q = n.frame, s = n.sourceSize, m = n.filename || m, e.rect = C.rect(q.x, q.y, q.w, q.h), e.rh = n.rotated || p, e.offset = C.c(0, 0), e.size = C.size(s.w, s.h);
            b[m] = e
        }
    }
    return this.Xe[a] =
    {gp: k, frames: b, Xr: f}
}, nq: function (a, b) {
    C.assert(a, C.b.kD);
    var d = this.Xe[a] || this.So(a), e = d.frames, d = d.Xr;
    b ? b instanceof C.ya || ("string" == typeof b ? b = C.Ga.wd(b) : C.assert(0, C.b.lD)) : b = C.Ga.wd(C.path.fm(a, d.Er || ".png"));
    var d = this.ec, f = this.vb, g;
    for (g in e) {
        var m = e[g], n = f[g];
        if (!n) {
            n = C.Ia.create(b, m.rect, m.rh, m.offset, m.size);
            if (m = m.oq)for (var q = 0, s = m.length; q < s; q++) {
                var t = m[q];
                d[t] && C.log(C.b.jD, t);
                d[t] = g
            }
            C.ma === C.za && n.kb && n.jc().Ic && (m = n.jc().Sa, m = C.pm(m, n.lr()), q = new C.ya, q.Wc(m), q.ab(), n.oc(q), m =
                n.j, n.en(C.rect(0, 0, m.width, m.height)));
            f[g] = n
        }
    }
}, Fw: function (a) {
    a = a.frames;
    for (var b in a)this.vb[b] && C.log(C.b.gD, b)
}, rj: function (a, b) {
    this.vb[b] = a
}, PB: function () {
    this.vb = {};
    this.ec = {}
}, OB: function (a) {
    a && (this.ec[a] && delete this.ec[a], this.vb[a] && delete this.vb[a])
}, QB: function (a) {
    var b = this.vb, d = this.ec;
    if (a = this.Xe[a]) {
        a = a.frames;
        for (var e in a)if (b[e]) {
            delete b[e];
            for (var f in d)d[f] == e && delete d[f]
        }
    }
}, RB: function (a) {
    var b = this.vb, d = this.ec, e;
    for (e in b) {
        var f = b[e];
        if (f && f.jc() == a) {
            delete b[e];
            for (var g in d)d[g] == e && delete d[g]
        }
    }
}, Bd: function (a) {
    var b = this.vb[a];
    if (!b) {
        var d = this.ec[a];
        d && ((b = this.vb[d.toString()]) || delete this.ec[a])
    }
    b || C.log(C.b.mD, a);
    return b
}, fd: function () {
    this.vb = {};
    this.ec = {};
    this.Xe = {}
}};
window._p = C.R.prototype;
C.d(E, "opacityModifyRGB", E.we, E.Jd);
C.d(E, "opacity", E.yf, E.Fa);
C.d(E, "color", E.vf, E.Pa);
C.d(E, "flippedX", E.Kr, E.Ds);
C.d(E, "flippedY", E.Lr, E.Es);
C.d(E, "offsetX", E.Uo);
C.d(E, "offsetY", E.Vo);
C.d(E, "texture", E.jc, E.oc);
C.d(E, "textureRectRotated", E.Qr);
C.d(E, "batchNode", E.Lq, E.Zm);
C.d(E, "quad", E.kr);
delete window._p;
C.iu = 0;
C.qe = 0;
C.En = 1;
C.ju = 3;
C.Fn = C.En;
C.gu = 0;
C.eu = 1;
C.hu = 2;
C.fu = 3;
C.du = 2;
C.zu = function (a) {
    var b = new C.Vr;
    C.Ur(C.Du, b);
    var d = new C.Vr;
    C.Ur(C.Cu, d);
    C.vA(a, b, d)
};
C.X = C.P.extend({Ww: p, bf: p, la: p, yg: p, sd: p, fg: 0, Ai: 0, Bl: 0, Qd: 0, gd: 1, Se: p, zc: 0, mi: 0, ad: l, bd: l, kd: l, V: l, Jc: l, Jb: l, xg: l, Di: l, Mb: l, Li: l, Z: l, Na: 0, kj: 0, Vi: 0, Jw: l, Za: l, fb: l, ji: l, fi: l, hi: l, gi: l, ctor: function () {
    var a = this;
    a.Jc = Date.now();
    C.A.mq(C.Ea.Wf, function () {
        a.Jc = Date.now()
    })
}, O: function () {
    this.Ai = this.fg = 1 / C.Bq;
    this.Mb = [];
    this.Bl = C.Fn;
    this.Li = l;
    this.mi = this.Qd = 0;
    this.Se = p;
    this.kj = this.Na = 0;
    this.Jc = Date.now();
    this.yg = this.la = p;
    this.V = C.size(0, 0);
    this.Di = l;
    this.gd = 1;
    this.Za = new C.Ie;
    this.fb = C.un ? new C.un :
        l;
    this.Za.Um(this.fb, C.Ie.Zf, p);
    this.fi = new C.Xb(C.X.Ln);
    this.fi.setUserData(this);
    this.hi = new C.Xb(C.X.Nn);
    this.hi.setUserData(this);
    this.gi = new C.Xb(C.X.Mn);
    this.gi.setUserData(this);
    this.ji = new C.Xb(C.X.On);
    this.ji.setUserData(this);
    return k
}, tq: function () {
    var a = Date.now();
    this.bf ? (this.zc = 0, this.bf = p) : this.zc = (a - this.Jc) / 1E3;
    0 < C.Ea.ob[C.Ea.qc.wj] && 0.2 < this.zc && (this.zc = 1 / 60);
    this.Jc = a
}, Dq: function () {
    this.tq();
    this.la || (this.Za.update(this.zc), C.A.dispatchEvent(this.gi));
    this.fd();
    this.Jb && this.Ks();
    this.Gk && this.Gk();
    this.Z && (this.Z.Ab(), C.A.dispatchEvent(this.hi));
    this.xg && this.xg.Ab();
    this.Se && this.$p();
    this.Fk && this.Fk();
    C.A.dispatchEvent(this.fi);
    this.kj++;
    this.Se && this.yo()
}, Gk: l, Fk: l, end: function () {
    this.yg = k
}, Ky: w("gd"), jz: w("xg"), Uz: w("V"), Vz: function () {
    return C.size(this.V.width * this.gd, this.V.height * this.gd)
}, pause: function () {
    this.la || (this.Ai = this.fg, this.Ym(0.25), this.la = k)
}, kB: function () {
    C.assert(this.Z, C.b.mu);
    this.Mb.pop();
    var a = this.Mb.length;
    0 == a ? this.end() : (this.sd = k, this.Jb =
        this.Mb[a - 1])
}, is: function () {
    C.Pg.fd();
    C.Kd.fd();
    C.Ga.fd()
}, js: function () {
    this.ue().uh();
    this.Z && (this.Z.lc(), this.Z.zb(), this.Z.ic());
    this.Jb = this.Z = l;
    this.Mb.length = 0;
    this.on();
    this.is();
    C.ek()
}, ks: function (a) {
    C.assert(a, C.b.In);
    this.sd = p;
    this.Mb.push(a);
    this.Jb = a
}, Sm: function (a) {
    C.assert(a, C.b.In);
    if (this.Z) {
        var b = this.Mb.length;
        0 === b ? (this.sd = k, this.Mb[b] = a) : (this.sd = k, this.Mb[b - 1] = a);
        this.Jb = a
    } else this.ks(a), this.mn()
}, Pj: function () {
    this.la && (this.Ym(this.Ai), (this.Jc = Date.now()) || C.log(C.b.ou),
        this.la = p, this.zc = 0)
}, iC: function (a) {
    a != this.gd && (this.gd = a, this.ng())
}, kC: u(), FC: v("bf"), Ks: function () {
    var a = p, b = p;
    C.wk && (a = this.Z ? this.Z instanceof C.wk : p, b = this.Jb ? this.Jb instanceof C.wk : p);
    if (!b) {
        if (b = this.Z)b.lc(), b.zb();
        this.sd && b && b.ic()
    }
    this.Z = this.Jb;
    this.Jb = l;
    !a && this.Z != l && (this.Z.kc(), this.Z.xe())
}, GC: v("xg"), Qy: w("Li"), nC: v("Li"), $p: function () {
    this.Na++;
    this.Qd += this.zc;
    this.ad && this.bd && this.kd ? (this.Qd > C.Dn && (this.bd.string = this.Vi.toFixed(3), this.mi = this.Na / this.Qd, this.Qd = this.Na =
        0, this.ad.string = this.mi.toFixed(1), this.kd.string = (0 | C.qe).toString()), this.ad.Ab(), this.bd.Ab(), this.kd.Ab()) : this.ng();
    C.qe = 0
}, rA: w("sd"), Az: w("Z"), Dy: w("fg"), iA: w("Se"), As: v("Se"), Fz: w("Vi"), lA: w("bf"), nA: w("la"), Oz: w("kj"), lB: function () {
    this.ds(1)
}, ds: function (a) {
    C.assert(this.Z, C.b.nu);
    var b = this.Mb, d = b.length;
    if (0 == d)this.end(); else if (!(a > d)) {
        for (; d > a;) {
            var e = b.pop();
            e.running && (e.lc(), e.zb());
            e.ic();
            d--
        }
        this.Jb = b[b.length - 1];
        this.sd = p
    }
}, ue: w("Za"), gn: function (a) {
    this.Za != a && (this.Za = a)
},
    Sg: w("fb"), Xm: function (a) {
        this.fb != a && (this.fb = a)
    }, Ry: w("zc"), ng: l, yo: function () {
        this.Vi = (Date.now() - this.Jc) / 1E3
    }});
C.X.On = "director_projection_changed";
C.X.Ln = "director_after_draw";
C.X.Nn = "director_after_visit";
C.X.Mn = "director_after_update";
C.Jn = C.X.extend({Yg: p, mn: function () {
    this.bf = k;
    this.Yg = p
}, Hm: function () {
    this.yg ? (this.yg = p, this.js()) : this.Yg || this.Dq()
}, on: function () {
    this.Yg = k
}, Ym: function (a) {
    this.fg = a;
    this.Yg || (this.on(), this.mn())
}});
C.X.Wj = l;
C.X.rm = k;
C.X.oi = function () {
    C.X.rm && (C.X.rm = p, C.X.Wj = new C.Jn, C.X.Wj.O());
    return C.X.Wj
};
C.Bq = 60;
C.ma === C.za && (E = C.X.prototype, E.dn = function () {
    this.Bl = C.N.xz();
    C.A.dispatchEvent(this.ji)
}, E.oC = u(), E.Ls = function () {
    var a = C.view;
    this.V.width = C.D.width;
    this.V.height = C.D.height;
    this.Di = a || C.view
}, E.fd = function () {
    var a = this.Di.nb;
    C.L.clearRect(-a.x, a.y, a.width, -a.height)
}, E.ng = function () {
    var a = 0, a = this.V.width > this.V.height ? 0 | 24 * (this.V.height / 320) : 0 | 24 * (this.V.width / 320);
    this.ad = C.l.create("000.0", "Arial", a);
    this.bd = C.l.create("0.000", "Arial", a);
    this.kd = C.l.create("0000", "Arial", a);
    a = C.Gn;
    this.kd.Vb(this.kd.width /
        2 + a.x, 5 * this.kd.height / 2 + a.y);
    this.bd.Vb(this.bd.width / 2 + a.x, 3 * this.bd.height / 2 + a.y);
    this.ad.Vb(this.ad.width / 2 + a.x, this.ad.height / 2 + a.y)
}, E.Vg = w("V"), E.Br = function () {
    return C.c(0, 0)
});
C.Av = C.Zf + 1;
C.sj = function (a, b) {
    if (a && 0 < a.length)for (var d = 0; d < a.length; d++)if (!(a[d]instanceof b))return C.log(C.b.sj), p;
    return k
};
C.$a = function (a, b) {
    for (var d = 0, e = a.length; d < e; d++)if (a[d] == b) {
        a.splice(d, 1);
        break
    }
};
C.Ox = function (a, b) {
    for (var d = 0, e = b.length; d < e; d++)C.$a(a, b[d])
};
C.Nx = function (a, b, d) {
    a.splice.apply(a, [d, 0].concat(b));
    return a
};
C.jk = function (a, b, d) {
    this.next = this.mB = l;
    this.target = a;
    this.hs = b;
    this.paused = d;
    this.ah = p
};
C.ik = function (a, b, d) {
    this.list = a;
    this.yd = b;
    this.target = d;
    this.Dr = l
};
C.Pn = function (a, b) {
    this.Wb = l;
    this.target = a;
    this.Ee = 0;
    this.tf = this.sf = l;
    this.paused = b;
    this.Dr = l
};
C.vk = C.P.extend({Hc: 0, xc: l, Ig: l, Ka: 0, Ml: p, Og: p, ie: 0, Oi: 0, og: 0, fz: w("Hc"), setInterval: v("Hc"), Iy: w("xc"), ctor: function (a, b, d, e, f) {
    this.Ig = a;
    this.xc = b;
    this.Ka = -1;
    this.Hc = d || 0;
    this.og = f || 0;
    this.Og = 0 < this.og;
    this.Oi = e == l ? C.He : e;
    this.Ml = this.Oi == C.He
}, ei: function () {
    if ("string" == typeof this.xc)this.Ig[this.xc](this.Ka); else this.xc.call(this.Ig, this.Ka)
}, update: function (a) {
    if (-1 == this.Ka)this.ie = this.Ka = 0; else {
        var b = this.Ig, d = this.xc;
        this.Ka += a;
        this.Ml && !this.Og ? this.Ka >= this.Hc && (b && d && this.ei(), this.Ka =
            0) : (this.Og ? this.Ka >= this.og && (b && d && this.ei(), this.Ka -= this.og, this.ie += 1, this.Og = p) : this.Ka >= this.Hc && (b && d && this.ei(), this.Ka = 0, this.ie += 1), this.ie > this.Oi && C.N.ue().rn(b, d))
    }
}});
C.Ie = C.P.extend({mf: 1, vd: l, cc: l, gg: l, bc: l, Cw: l, yc: l, Qe: p, Kg: p, ctor: function () {
    this.mf = 1;
    this.vd = [
        [],
        [],
        []
    ];
    this.cc = {};
    this.gg = [];
    this.bc = {};
    this.Oe = [];
    this.yc = l;
    this.Kg = this.Qe = p
}, Ni: function (a) {
    delete this.bc[a.target.p];
    C.$a(this.Oe, a);
    a.vk = l;
    a.target = l
}, Fl: function (a) {
    if (a = this.cc[a.target.p])C.$a(a.list, a.yd), delete this.cc[a.target.p], C.$a(this.gg, a), a.yd = l, a.target = l
}, Al: function (a, b, d, e) {
    e = new C.jk(b, d, e);
    if (a) {
        for (var f = a.length - 1, g = 0; g <= f && !(d < a[g].hs); g++);
        a.splice(g, 0, e)
    } else a = [], a.push(e);
    d = new C.ik(a, e, b);
    this.gg.push(d);
    this.cc[b.p] = d;
    return a
}, vo: function (a, b, d) {
    d = new C.jk(b, 0, d);
    a.push(d);
    a = new C.ik(a, d, b);
    this.gg.push(a);
    this.cc[b.p] = a
}, YC: v("mf"), Mz: w("mf"), update: function (a) {
    var b = this.vd, d = this.Oe, e, f, g;
    this.Kg = k;
    1 != this.mf && (a *= this.mf);
    f = 0;
    for (g = b.length; f < g && 0 <= f; f++)for (var m = this.vd[f], n = 0, q = m.length; n < q; n++)e = m[n], !e.paused && !e.ah && e.target.update(a);
    f = 0;
    for (g = d.length; f < g; f++) {
        e = d[f];
        if (!e)break;
        this.yc = e;
        this.Qe = p;
        if (!e.paused)for (e.Ee = 0; e.Ee < e.Wb.length; e.Ee++)e.sf =
            e.Wb[e.Ee], e.tf = p, e.sf.update(a), e.sf = l;
        this.Qe && 0 == e.Wb.length && (this.Ni(e), f--)
    }
    f = 0;
    for (g = b.length; f < g; f++) {
        m = this.vd[f];
        n = 0;
        for (q = m.length; n < q;) {
            e = m[n];
            if (!e)break;
            e.ah ? this.Fl(e) : n++
        }
    }
    this.Kg = p;
    this.yc = l
}, ws: function (a, b, d, e, f, g) {
    C.assert(b, C.b.Rv);
    C.assert(a, C.b.Sv);
    d = d || 0;
    e = e == l ? C.He : e;
    f = f || 0;
    g = g || p;
    var m = this.bc[a.p];
    m || (m = new C.Pn(a, g), this.Oe.push(m), this.bc[a.p] = m);
    if (m.Wb == l)m.Wb = []; else for (var n = 0; n < m.Wb.length; n++)if (g = m.Wb[n], b == g.xc) {
        C.log(C.b.Qv, g.Hc.toFixed(4), d.toFixed(4));
        g.Hc =
            d;
        return
    }
    g = new C.vk(a, b, d, e, f);
    m.Wb.push(g)
}, Um: function (a, b, d) {
    if (a !== l) {
        var e = this.vd, f = this.cc[a.p];
        f ? f.yd.ah = p : 0 == b ? this.vo(e[1], a, d) : 0 > b ? e[0] = this.Al(e[0], a, b, d) : e[2] = this.Al(e[2], a, b, d)
    }
}, rn: function (a, b) {
    if (!(a == l || b == l)) {
        var d = this.bc[a.p];
        if (d)for (var e = d.Wb, f = 0, g = e.length; f < g; f++) {
            var m = e[f];
            if (b == m.xc) {
                m == d.sf && !d.tf && (d.tf = k);
                e.splice(f, 1);
                d.Ee >= f && d.Ee--;
                0 == e.length && (this.yc == d ? this.Qe = k : this.Ni(d));
                break
            }
        }
    }
}, $j: function (a) {
    a != l && (a = this.cc[a.p], a != l && (this.Kg ? a.yd.ah = k : this.Fl(a.yd)))
},
    qn: function (a) {
        if (a != l) {
            var b = this.bc[a.p];
            if (b) {
                var d = b.Wb;
                !b.tf && 0 <= d.indexOf(b.sf) && (b.tf = k);
                d.length = 0;
                this.yc == b ? this.Qe = k : this.Ni(b)
            }
            this.$j(a)
        }
    }, uh: function () {
        this.gt(C.Ie.Zf)
    }, gt: function (a) {
        for (var b = this.Oe, d = this.vd, e = 0, f = b.length; e < f; e++)this.qn(b[e].target);
        for (e = 2; 0 <= e; e--)if (!(1 == e && 0 < a || 0 == e && 0 <= a))for (var b = d[e], f = 0, g = b.length; f < g; f++)this.$j(b[f].target)
    }, hB: function () {
        return this.bs(C.Ie.Zf)
    }, bs: function () {
        for (var a = [], b, d = this.Oe, e = this.vd, f = 0, g = d.length; f < g; f++)if (b = d[f])b.paused =
            k, a.push(b.target);
        f = 0;
        for (g = e.length; f < g; f++)for (var d = e[f], m = 0, n = d.length; m < n; m++)if (b = d[m])b.paused = k, a.push(b.target);
        return a
    }, ZB: function (a) {
        if (a)for (var b = 0; b < a.length; b++)this.Id(a[b])
    }, If: function (a) {
        C.assert(a, C.b.Ov);
        var b = this.bc[a.p];
        b && (b.paused = k);
        if (a = this.cc[a.p])a.yd.paused = k
    }, Id: function (a) {
        C.assert(a, C.b.Pv);
        var b = this.bc[a.p];
        b && (b.paused = p);
        if (a = this.cc[a.p])a.yd.paused = p
    }, tA: function (a) {
        C.assert(a, C.b.Nv);
        return(a = this.bc[a.p]) ? a.paused : p
    }});
C.Ie.Zf = -2147483648;
C.l = C.R.extend({F: l, Gc: C.Qh, Tc: C.Je, sa: l, ja: 0, wb: "", Ei: l, Yd: p, qb: l, $: p, ea: l, Qc: 0, Pc: 0, bj: l, mb: p, ge: l, gc: 0, gj: l, jf: l, ki: l, hj: 0, ij: 0, v: p, ug: l, vg: l, ml: l, $b: "LabelTTF", ctor: function () {
    C.R.prototype.ctor.call(this);
    this.F = C.size(0, 0);
    this.Gc = C.uk;
    this.Tc = C.Je;
    this.Lc = p;
    this.qb = "";
    this.sa = "Arial";
    this.$ = this.Yd = p;
    this.ea = C.c(0, 0);
    this.Pc = this.Qc = 0;
    this.bj = "rgba(128, 128, 128, 0.5)";
    this.mb = p;
    this.ge = C.color(255, 255, 255, 255);
    this.gc = 0;
    this.gj = "";
    this.jf = C.color(255, 255, 255, 255);
    this.ki = "rgba(255,255,255,1)";
    this.ij = this.hj = 0;
    this.v = p;
    this.ml = [];
    this.lb()
}, O: function () {
    return this.Ej(" ", this.sa, this.ja)
}, up: function () {
    this.pi().font = this.qb
}, af: function (a) {
    return this.pi().measureText(a).width
}, Bo: function (a, b) {
    var d = this.af(a), e = Math.floor(a.length * b / d), f = a.indexOf("\n");
    if (0.8 * e >= f && 0 < f)return f + 1;
    if (d < b)return a.length;
    for (var d = p, f = b + 1, g = -1, m = e, n, q = C.l.Do, s = C.l.Ip, t = C.l.zo, x = a.substr(e); n = q.exec(x);) {
        m += n[0].length;
        f = this.af(a.substr(0, m));
        if ("\n" == n[2] && f < b) {
            d = k;
            g = m;
            break
        }
        if (f > b) {
            -1 != g && (d = k);
            break
        }
        g =
            m;
        x = a.substr(m)
    }
    if (d)return g;
    x = a.substr(0, e);
    for (g = e; n = s.exec(x);)if (g = n[1].length, x = n[1], f = this.af(x), f < b) {
        t.test(n[2]) && g++;
        break
    }
    return g || 1
}, description: function () {
    return"\x3ccc.LabelTTF | FontName \x3d" + this.sa + " FontSize \x3d " + this.ja.toFixed(1) + "\x3e"
}, Pa: l, lb: l, pa: l, Fa: l, ha: l, HD: function (a) {
    C.xa.prototype.ha.call(this, a);
    this.lb()
}, ur: w("wb"), $q: w("Gc"), Ar: w("Tc"), Vy: function () {
    return C.size(this.F.width, this.F.height)
}, Xq: w("ja"), Wq: w("sa"), Ej: function (a, b, d, e, f, g) {
    a = a ? a + "" : "";
    d = d || 16;
    e = e || C.size(0, d);
    f = f || C.uk;
    g = g || C.Je;
    return C.R.prototype.O.call(this) ? (this.Lc = p, this.F = C.size(e.width, e.height), this.sa = b || "Arial", this.Gc = f, this.Tc = g, this.ja = d, this.qb = this.ja + "px '" + b + "'", this.Gb = C.l.Me(b, this.ja), this.string = a, this.lb(), this.nj(), this.v = p, k) : p
}, Em: l, WC: function (a) {
    a && this.Zl(a, k)
}, Jz: function () {
    return this.Dp(p)
}, Fq: function (a, b, d, e) {
    d = d || 0.5;
    p === this.$ && (this.$ = k);
    var f = this.ea;
    if (f && f.x != a || f.Pb != b)f.x = a, f.y = b;
    this.Qc != d && (this.Qc = d);
    this.lb();
    this.Pc != e && (this.Pc = e);
    this.v =
        k
}, Xo: function () {
    return this.ea.x
}, Tp: function (a) {
    p === this.$ && (this.$ = k);
    this.ea.x != a && (this.ea.x = a, this.v = k)
}, Yo: function () {
    return this.ea.Pb
}, Up: function (a) {
    p === this.$ && (this.$ = k);
    this.ea.Pb != a && (this.ea.Pb = a, this.v = k)
}, Sw: function () {
    return C.c(this.ea.x, this.ea.y)
}, kx: function (a) {
    p === this.$ && (this.$ = k);
    if (this.ea.x != a.x || this.ea.y != a.y)this.ea.x = a.x, this.ea.y = a.y, this.v = k
}, Zo: w("Qc"), Vp: function (a) {
    p === this.$ && (this.$ = k);
    this.Qc != a && (this.Qc = a, this.lb(), this.v = k)
}, Wo: w("Pc"), Sp: function (a) {
    p ===
        this.$ && (this.$ = k);
    this.Pc != a && (this.Pc = a, this.v = k)
}, hy: function () {
    this.$ && (this.$ = p, this.v = k)
}, Gq: function (a, b) {
    this.mb === p && (this.mb = k);
    var d = this.ge;
    if (d.f !== a.f || d.e !== a.e || d.a !== a.a)d.f = a.f, d.e = a.e, d.a = a.a, this.lb();
    this.gc !== b && (this.gc = b || 0);
    this.v = k
}, $o: w("ge"), Wp: function (a) {
    this.mb === p && (this.mb = k);
    var b = this.ge;
    if (b.f !== a.f || b.e !== a.e || b.a !== a.a)b.f = a.f, b.e = a.e, b.a = a.a, this.lb(), this.v = k
}, To: w("gc"), Qp: function (a) {
    this.mb === p && (this.mb = k);
    this.gc !== a && (this.gc = a || 0, this.v = k)
}, iy: function () {
    this.mb &&
    (this.mb = p, this.v = k)
}, Tj: l, Qo: w("jf"), Zl: function (a, b) {
    a.yy ? (this.F.width = a.boundingWidth, this.F.height = a.boundingHeight) : (this.F.width = 0, this.F.height = 0);
    this.Gc = a.textAlign;
    this.Tc = a.verticalAlign;
    this.sa = a.fontName;
    this.ja = a.fontSize || 12;
    this.qb = this.ja + "px '" + this.sa + "'";
    this.Gb = C.l.Me(this.sa, this.ja);
    a.ln && this.Fq(a.shadowOffsetX, a.shadowOffsetY, a.shadowOpacity, a.shadowBlur);
    a.Xj && this.Gq(a.strokeStyle, a.lineWidth);
    this.Tj(a.fillStyle);
    b && this.nj()
}, Dp: function (a) {
    var b = new C.hk;
    a ? (b.fontSize =
        this.ja, b.boundingWidth = C.ba() * this.F.width, b.boundingHeight = C.ba() * this.F.height) : (b.fontSize = this.ja, b.boundingWidth = this.F.width, b.boundingHeight = this.F.height);
    b.fontName = this.sa;
    b.textAlign = this.Gc;
    b.verticalAlign = this.Tc;
    if (this.mb) {
        b.Xj = k;
        var d = this.ge;
        b.strokeStyle = C.color(d.f, d.e, d.a);
        b.lineWidth = this.gc
    } else b.Xj = p;
    this.$ ? (b.ln = k, b.shadowBlur = this.Pc, b.shadowOpacity = this.Qc, b.shadowOffsetX = (a ? C.ba() : 1) * this.ea.x, b.shadowOffsetY = (a ? C.ba() : 1) * this.ea.y) : b.$ = p;
    a = this.jf;
    b.fillStyle = C.color(a.f,
        a.e, a.a);
    return b
}, Gb: 18, Vj: function (a) {
    a = String(a);
    this.Ei != a && (this.Ei = a + "", this.Mg(), this.v = k)
}, Mg: function () {
    this.wb = this.Ei
}, Is: function (a) {
    a !== this.Gc && (this.Gc = a, this.v = k)
}, Zs: function (a) {
    a != this.Tc && (this.Tc = a, this.v = k)
}, pC: function (a) {
    if (a.width != this.F.width || a.height != this.F.height)this.F = a, this.Mg(), this.v = k
}, Po: function () {
    return this.F.width
}, Np: function (a) {
    a != this.F.width && (this.F.width = a, this.Mg(), this.v = k)
}, Oo: function () {
    return this.F.height
}, Mp: function (a) {
    a != this.F.height && (this.F.height =
        a, this.Mg(), this.v = k)
}, Gs: function (a) {
    this.ja !== a && (this.ja = a, this.qb = a + "px '" + this.sa + "'", this.Gb = C.l.Me(this.sa, a), this.v = k)
}, Fs: function (a) {
    this.sa && this.sa != a && (this.sa = a, this.qb = this.ja + "px '" + a + "'", this.Gb = C.l.Me(a, this.ja), this.v = k)
}, Ro: w("qb"), Pp: function (a) {
    var b = C.l.Jo.exec(a);
    b && (this.ja = parseInt(b[1]), this.sa = b[2], this.qb = a, this.Gb = C.l.Me(this.sa, this.ja), this.v = k)
}, Ho: function (a) {
    if (a) {
        var b = this.hj, d = this.ij, e = this.i.height - d, f = this.Tc, g = this.Gc, m = this.Gb, n = this.gc;
        a.setTransform(1,
            0, 0, 1, 0 + 0.5 * b, e + 0.5 * d);
        a.font != this.qb && (a.font = this.qb);
        a.fillStyle = this.ki;
        var q = d = 0, s = this.mb;
        s && (a.lineWidth = 2 * n, a.strokeStyle = this.gj);
        this.$ && (n = this.ea, a.shadowColor = this.bj, a.shadowOffsetX = n.x, a.shadowOffsetY = -n.y, a.shadowBlur = this.Pc);
        a.textBaseline = C.l.iq[f];
        a.textAlign = C.l.hq[g];
        b = this.i.width - b;
        d = g === C.ho ? d + b : g === C.Qh ? d + b / 2 : d + 0;
        if (this.Yd) {
            g = this.fc.length;
            f === C.xk ? q = m + e - m * g : f === C.mo && (q = m / 2 + (e - m * g) / 2);
            for (f = 0; f < g; f++)b = this.fc[f], n = -e + m * f + q, s && a.strokeText(b, d, n), a.fillText(b, d, n)
        } else f !==
            C.xk && (q = f === C.Je ? q - e : q - 0.5 * e), s && a.strokeText(this.wb, d, q), a.fillText(this.wb, d, q)
    }
}, pi: function () {
    if (this.vg)return this.vg;
    if (!this.ug) {
        var a = C.W("canvas"), b = new C.ya;
        b.Wc(a);
        this.texture = b;
        this.ug = a
    }
    return this.vg = this.ug.getContext("2d")
}, Ng: function () {
    var a = this.F.width, b, d, e = this.ml;
    e.length = 0;
    this.Yd = p;
    this.up();
    if (0 !== a) {
        var f = this.wb;
        this.fc = [];
        b = 0;
        for (d = this.wb.length; b < d;) {
            var g = this.Bo(f.substr(b), a);
            this.fc.push(f.substr(b, g));
            b += g
        }
    } else {
        this.fc = this.wb.split("\n");
        b = 0;
        for (d = this.fc.length; b <
            d; b++)e.push(this.af(this.fc[b]))
    }
    0 < this.fc.length && (this.Yd = k);
    d = b = 0;
    this.mb && (b = d = 2 * this.gc);
    this.$ && (f = this.ea, b += 2 * Math.abs(f.x), d += 2 * Math.abs(f.y));
    a = 0 === a ? this.Yd ? C.size(0 | Math.max.apply(Math, e) + b, 0 | this.Gb * this.fc.length + d) : C.size(0 | this.af(this.wb) + b, 0 | this.Gb + d) : 0 === this.F.height ? this.Yd ? C.size(0 | a + b, 0 | this.Gb * this.fc.length + d) : C.size(0 | a + b, 0 | this.Gb + d) : C.size(0 | a + b, 0 | this.F.height + d);
    this.mc(a);
    this.hj = b;
    this.ij = d;
    e = this.da;
    this.qa.x = 0.5 * b + (a.width - b) * e.x;
    this.qa.y = 0.5 * d + (a.height - d) * e.y
},
    wf: function () {
        this.v && this.Ng();
        return C.R.prototype.wf.call(this)
    }, Ze: function () {
        this.v && this.Ng();
        return C.R.prototype.Ze.call(this)
    }, Ye: function () {
        this.v && this.Ng();
        return C.R.prototype.Ye.call(this)
    }, nj: function () {
        var a = this.pi(), b = this.ug, d = this.i;
        if (0 === this.wb.length)return b.width = 1, b.height = d.height, this.bb(C.rect(0, 0, 1, d.height)), k;
        a.font = this.qb;
        this.Ng();
        var e = d.width, d = d.height, f = b.width == e && b.height == d;
        b.width = e;
        b.height = d;
        f && a.clearRect(0, 0, e, d);
        this.Ho(a);
        this.H.ab();
        this.bb(C.rect(0,
            0, e, d));
        return k
    }, Ab: function (a) {
        this.wb && "" != this.wb && (this.v && (this.v = p, this.nj()), C.R.prototype.Ab.call(this, a || C.L))
    }, Rb: l, Xp: function (a) {
        var b = this.C ? this.textureAtlas.texture : this.H;
        if (b) {
            var d = b.nh, e = b.mh, f, g = this.zg;
            this.Oa ? (C.Xf ? (b = (2 * a.x + 1) / (2 * d), d = b + (2 * a.height - 2) / (2 * d), f = (2 * a.y + 1) / (2 * e), a = f + (2 * a.width - 2) / (2 * e)) : (b = a.x / d, d = (a.x + a.height) / d, f = a.y / e, a = (a.y + a.width) / e), this.La && (e = f, f = a, a = e), this.Ma && (e = b, b = d, d = e), g.Uc.s.va = b, g.Uc.s.wa = f, g.Vc.s.va = b, g.Vc.s.wa = a, g.Zc.s.va = d, g.Zc.s.wa = f, g.$c.s.va =
                d, g.$c.s.wa = a) : (C.Xf ? (b = (2 * a.x + 1) / (2 * d), d = b + (2 * a.width - 2) / (2 * d), f = (2 * a.y + 1) / (2 * e), a = f + (2 * a.height - 2) / (2 * e)) : (b = a.x / d, d = (a.x + a.width) / d, f = a.y / e, a = (a.y + a.height) / e), this.La && (e = b, b = d, d = e), this.Ma && (e = f, f = a, a = e), g.Uc.s.va = b, g.Uc.s.wa = a, g.Vc.s.va = d, g.Vc.s.wa = a, g.Zc.s.va = b, g.Zc.s.wa = f, g.$c.s.va = d, g.$c.s.wa = f);
            this.Mi = k
        }
    }});
C.l.hq = ["left", "center", "right"];
C.l.iq = ["top", "middle", "bottom"];
C.l.Do = /(.+?)([\s\n\r\-\/\\\:]|[\u4E00-\u9FA5]|[\uFE30-\uFFA0])/;
C.l.Ip = /(.*)([\s\n\r\-\/\\\:]|[\u4E00-\u9FA5]|[\uFE30-\uFFA0])/;
C.l.zo = /[\s\-\/\\\:]/;
C.l.Jo = /^(\d+)px\s+['"]?([\w\s\d]+)['"]?$/;
C.l.create = function (a, b, d, e, f, g) {
    var m = new C.l;
    return b && b instanceof C.hk && m.Em(a, b) || m.Ej(a, b, d, e, f, g) ? m : l
};
C.l.ww = C.lo ? C.Kv : C.Jv;
C.l.cd = C.W("div");
C.l.cd.style.fontFamily = "Arial";
C.l.cd.style.position = "absolute";
C.l.cd.style.left = "-100px";
C.l.cd.style.top = "-100px";
C.l.cd.style.lineHeight = "normal";
document.body.appendChild(C.l.cd);
C.l.Me = function (a, b) {
    var d = C.l.Ck[a + "." + b];
    if (0 < d)return d;
    var e = C.l.cd;
    e.innerHTML = "ajghl~!";
    e.style.fontFamily = a;
    e.style.fontSize = b + "px";
    d = e.clientHeight;
    C.l.Ck[a + "." + b] = d;
    e.innerHTML = "";
    return d
};
C.l.Ck = {};
C.ma === C.za && (E = C.l.prototype, E.Pa = function (a) {
    C.xa.prototype.Pa.call(this, a);
    this.lb()
}, E.lb = function () {
    this.v = k;
    var a = this.S, b = this.J, d = this.ge, e = this.jf;
    this.bj = "rgba(" + (0 | 0.5 * a.f) + "," + (0 | 0.5 * a.e) + "," + (0 | 0.5 * a.a) + "," + this.Qc + ")";
    this.ki = "rgba(" + (0 | a.f / 255 * e.f) + "," + (0 | a.e / 255 * e.e) + "," + (0 | a.a / 255 * e.a) + ", " + b / 255 + ")";
    this.gj = "rgba(" + (0 | a.f / 255 * d.f) + "," + (0 | a.e / 255 * d.e) + "," + (0 | a.a / 255 * d.a) + ", " + b / 255 + ")"
}, E.pa = function (a) {
    C.xa.prototype.pa.call(this, a);
    this.lb()
}, E.Fa = function (a) {
    this.$w !== a && (C.R.prototype.Fa.call(this,
        a), this.lb(), this.v = k)
}, E.ha = C.R.prototype.ha, E.Em = function (a, b) {
    if (!C.R.prototype.O.call(this))return p;
    this.Zl(b, p);
    this.string = a;
    return k
}, E.Tj = function (a) {
    var b = this.jf;
    if (b.f != a.f || b.e != a.e || b.a != a.a)b.f = a.f, b.e = a.e, b.a = a.a, this.lb(), this.v = k
}, E.Rb = C.R.prototype.Rb, E.bb = function (a, b, d) {
    this.Oa = b || p;
    this.mc(d || a);
    this.kn(a);
    b = this.lf;
    b.x = a.x;
    b.y = a.y;
    b.width = a.width;
    b.height = a.height;
    b.vh = !(0 === b.width || 0 === b.height || 0 > b.x || 0 > b.y);
    a = this.je;
    this.La && (a.x = -a.x);
    this.Ma && (a.y = -a.y);
    this.Va.x = a.x +
        (this.i.width - this.j.width) / 2;
    this.Va.y = a.y + (this.i.height - this.j.height) / 2;
    this.C && (this.dirty = k)
});
window._p = C.l.prototype;
C.d(E, "color", E.vf, E.Pa);
C.d(E, "opacity", E.yf, E.Fa);
C.d(E, "string", E.ur, E.Vj);
C.d(E, "textAlign", E.$q, E.Is);
C.d(E, "verticalAlign", E.Ar, E.Zs);
C.d(E, "fontSize", E.Xq, E.Gs);
C.d(E, "fontName", E.Wq, E.Fs);
C.d(E, "font", E.Ro, E.Pp);
C.d(E, "boundingWidth", E.Po, E.Np);
C.d(E, "boundingHeight", E.Oo, E.Mp);
C.d(E, "fillStyle", E.Qo, E.Tj);
C.d(E, "strokeStyle", E.$o, E.Wp);
C.d(E, "lineWidth", E.To, E.Qp);
C.d(E, "shadowOffsetX", E.Xo, E.Tp);
C.d(E, "shadowOffsetY", E.Yo, E.Up);
C.d(E, "shadowOpacity", E.Zo, E.Vp);
C.d(E, "shadowBlur", E.Wo, E.Sp);
delete window._p;
var G = ["bg.png", "ground.png", "flappy_packer.png"];
C.Ea.Kj = function () {
    var a = C.size(720, 1280), b = C.view.Yq();
    !C.ga.Or && 800 > b.height && (a = C.size(720, 1280));
    C.r.qh = "src";
    C.view.Sj(a.width, a.height, C.Ha.ag);
    C.Mh.es(function () {
        C.N.Sm(new H)
    })
};
C.Ea.vs();
function I(a, b, d, e) {
    a = C.R.create(a, b);
    a.Kf(0.5, 0.5);
    a.Vb(d);
    e.aa(a, 0);
    return a
}
var J = [C.rect(1019, 299, 61, 91), C.rect(1080, 299, 59, 91), C.rect(1139, 299, 61, 91), C.rect(1210, 299, 61, 91), C.rect(1280, 299, 61, 91), C.rect(1350, 299, 61, 91), C.rect(1420, 299, 61, 91), C.rect(1490, 299, 61, 91), C.rect(1560, 299, 61, 91), C.rect(1630, 299, 61, 91)], H = C.bg.extend({gf: 0, pl: 300, li: 0, rg: 870, Gi: [], Nb: 0, qj: 0, Ui: [0, 0, 0, 0, 0], kc: function () {
    this._super();
    var a = this;
    this.sn();
    this.Am();
    C.A.addListener({event: C.m.dg, ye: function (b) {
        switch (a.gf) {
            case 0:
                a.Vm();
                a.Ul.oa(p);
                a.Ae(a.sm, 0.03);
                a.gf = 1;
                break;
            case 1:
                a.li = 0;
                a.wc.sh(-30);
                a.rg = a.wc.jb.y;
                break;
            default:
                78 < b.T.x && (616 > b.T.y && 328 > b.T.x && 487 < b.T.y) && (a.li = 0, a.rg = 870, a.wc.sh(0), a.wc.cn(a.rg), a.Nb = 0, a.Gi.forEach(function (a, b) {
                    a.reset();
                    a.x = 795 + 400 * b;
                    a.g.nc(a.x);
                    a.a.nc(a.x)
                }), a.Rk.oa(p), a.Ul.oa(k), a.gf = 0, a.ri.oa(p), a.cj.oa(p), a.sn(), a.Am())
        }
    }}, this);
    this.qq();
    this.bt();
    this.sq();
    for (var b = 0; 3 > b; b++)this.Aq(b);
    this.Ob = [I("flappy_packer.png", J[this.Nb], C.c(360, 1100), this.hg), I("flappy_packer.png", J[this.Nb], C.c(360, 1100), this.hg), I("flappy_packer.png", J[this.Nb], C.c(360, 1100),
        this.hg)];
    this.Ob.forEach(function (a) {
        a.oa(p)
    });
    this.Hq()
}, qq: function () {
    var a = C.pb.create("src/bg.png");
    this.aa(a, 0);
    I("bg.png", 0, C.c(360, 640), a);
    this.Zk = I("ground.png", 0, C.c(420, 140), a)
}, bt: function () {
    var a = C.pb.create();
    this.aa(a, 0);
    I("flappy_packer.png", C.rect(515, 315, 480, 135), C.c(360, 1100), a);
    I("flappy_packer.png", C.rect(760, 0, 285, 245), C.c(360, 850), a);
    this.Ul = a
}, Hq: function () {
    var a = C.pb.create();
    a.oa(p);
    this.aa(a, 0);
    I("flappy_packer.png", C.rect(18, 320, 482, 108), C.c(360, 1100), a);
    I("flappy_packer.png",
        C.rect(15, 6, 568, 286), C.c(360, 850), a);
    I("flappy_packer.png", C.rect(465, 465, 260, 144), C.c(205, 550), a);
    this.ri = I("flappy_packer.png", C.rect(1860, 86, 110, 110), C.c(200, 830), a);
    this.cj = I("flappy_packer.png", C.rect(1060, 160, 110, 110), C.c(200, 830), a);
    this.ri.oa(p);
    this.cj.oa(p);
    this.Rk = a
}, sq: function () {
    var a = C.pb.create();
    this.aa(a, 0);
    var b = C.Ga.wd("flappy_packer.png"), b = C.Ia.create(b, C.rect(674, 61, 86, 60)), b = C.R.create(b);
    b.Kf(0.5, 0.5);
    b.Vb(240, 870);
    a.aa(b, 0);
    this.wc = b;
    this.hg = a
}, Vm: function () {
    var a = this.Nb;
    10 > a ? (this.Ob[0].Cd("flappy_packer.png", J[this.Nb]), this.Ob[0].oa(k)) : 100 > a && (this.Ob[0].Cd("flappy_packer.png", J[Math.floor(this.Nb / 10)]), this.Ob[0].nc(325), this.Ob[0].oa(k), this.Ob[1].Cd("flappy_packer.png", J[Math.floor(this.Nb % 10)]), this.Ob[1].nc(395), this.Ob[1].oa(k))
}, sm: function () {
    var a = this.li++;
    this.wc.sh(Math.min(50, 10 * a - 40));
    a = -Math.pow(a / 7 - 1, 2) + 1;
    this.wc.Vb(C.c(240, this.rg + 120 * a));
    this.Yr()
}, sn: function () {
    this.Ae(this.Jm, 0.1)
}, Jm: function () {
    var a = [C.rect(674, 61, 86, 60), C.rect(674, 122, 86,
        60), C.rect(674, 0, 86, 60)];
    this.wc.Cd("flappy_packer.png", a[this.qj++]);
    2 < this.qj && (this.qj = 0)
}, Am: function () {
    this.Ae(this.Im, 0.03)
}, Im: function () {
    var a = this.Zk.jb.x - this.pl / 40;
    360 >= a && (a = 420);
    this.Zk.nc(a)
}, Aq: function (a) {
    var b = Math.floor(500 * Math.random()) + 200, d = 900 - b, e = 795 + 400 * a, f = this.hg, g = I("flappy_packer.png", C.rect(10, 478, 130, 800 - b), C.c(e, 680 - b / 2), f), m = I("flappy_packer.png", C.rect(160, 490 + d, 130, 800 - d), C.c(e, 880 + d / 2), f), n = this, q = n.pl / 40;
    this.Gi.push({g: g, a: m, x: e, y: 1124 - b, move: function () {
        this.x -=
            q;
        -400 > this.x && (this.x = 795, this.reset());
        g.nc(this.x);
        m.nc(this.x);
        n.zq(this.x, this.y)
    }, reset: function () {
        var b = Math.floor(500 * Math.random()) + 200, d = 900 - b, e = 795 + 400 * a;
        this.y = 1124 - b;
        g.Cd("flappy_packer.png", C.rect(10, 478, 130, 800 - b));
        g.Vb(C.c(e, 680 - b / 2));
        m.Cd("flappy_packer.png", C.rect(160, 490 + d, 130, 800 - d));
        m.Vb(C.c(e, 880 + d / 2))
    }})
}, Yr: function () {
    this.Gi.forEach(function (a) {
        a.move()
    })
}, zq: function (a, b) {
    function d(a) {
        a.Nf(a.sm);
        a.Nf(a.Jm);
        a.Nf(a.Im);
        a.Rk.oa(k);
        a.gf = -1;
        a.Ob.forEach(function (a) {
            a.oa(p);
            a.nc(360)
        });
        switch (a.ls(a.Nb)) {
            case 0:
                a.ri.oa(k);
                break;
            case 1:
                a.cj.oa(k)
        }
    }

    var e = this.wc.jb.y;
    -1 != this.gf && 320 > e ? d(this) : 128 < a && 352 > a && (237 < a && 243 > a && (this.Nb++, this.Vm()), (e > b + 225 || e < b) && d(this))
}, ls: function (a) {
    for (var b = 0; 5 > b; b++)if (this.Ui[b] < a) {
        this.Ui.splice(b, 0, a);
        break
    }
    this.Ui.splice(5);
    return b
}});