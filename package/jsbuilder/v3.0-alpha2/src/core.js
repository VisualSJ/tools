var cc = cc || {};
var _tmp = _tmp || {};
cc._LogInfos = {};
window._p;
_p = window;
_p.gl;
_p.WebGLRenderingContext;
_p.DeviceOrientationEvent;
_p.DeviceMotionEvent;
_p.AudioContext;
_p.webkitAudioContext;
_p.mozAudioContext;
_p = Object.prototype;
_p._super;
_p.ctor;
delete window._p;
cc.newElement = function (x) {
    return document.createElement(x)
};
cc._addEventListener = function (element, type, listener, useCapture) {
    element.addEventListener(type, listener, useCapture)
};
cc._isNodeJs = typeof require !== "undefined" && require("fs");
cc.each = function (obj, iterator, context) {
    if (!obj)return;
    if (obj instanceof Array)for (var i = 0, li = obj.length; i < li; i++) {
        if (iterator.call(context, obj[i], i) === false)return
    } else for (var key in obj)if (iterator.call(context, obj[key], key) === false)return
};
cc.isCrossOrigin = function (url) {
    if (!url) {
        cc.log("invalid URL");
        return false
    }
    var startIndex = url.indexOf("://");
    if (startIndex == -1)return false;
    var endIndex = url.indexOf("/", startIndex + 3);
    var urlOrigin = endIndex == -1 ? url : url.substring(0, endIndex);
    return urlOrigin != location.origin
};
cc.async = {_counterFunc: function (err) {
    var counter = this.counter;
    if (counter.err)return;
    var length = counter.length;
    var results = counter.results;
    var option = counter.option;
    var cb = option.cb, cbTarget = option.cbTarget, trigger = option.trigger, triggerTarget = option.triggerTarget;
    if (err) {
        counter.err = err;
        if (cb)return cb.call(cbTarget, err);
        return
    }
    var result = Array.apply(null, arguments).slice(1);
    var l = result.length;
    if (l == 0)result = null; else if (l == 1)result = result[0]; else result = result;
    results[this.index] = result;
    counter.count--;
    if (trigger)trigger.call(triggerTarget, result, length - counter.count, length);
    if (counter.count == 0 && cb)cb.apply(cbTarget, [null, results])
}, _emptyFunc: function () {
}, parallel: function (tasks, option, cb) {
    var async = cc.async;
    if (cb !== undefined) {
        if (typeof option == "function")option = {trigger: option};
        option.cb = cb || option.cb
    } else if (option !== undefined) {
        if (typeof option == "function")option = {cb: option}
    } else if (tasks !== undefined)option = {}; else throw"arguments error!";
    var isArr = tasks instanceof Array;
    var li = isArr ? tasks.length :
        Object.keys(tasks).length;
    if (li == 0) {
        if (option.cb)option.cb.call(option.cbTarget, null);
        return
    }
    var results = isArr ? [] : {};
    var counter = {length: li, count: li, option: option, results: results};
    cc.each(tasks, function (task, index) {
        if (counter.err)return false;
        var counterFunc = !option.cb && !option.trigger ? async._emptyFunc : async._counterFunc.bind({counter: counter, index: index});
        task(counterFunc, index)
    })
}, map: function (tasks, option, cb) {
    var self = this;
    var len = arguments.length;
    if (typeof option == "function")option = {iterator: option};
    if (len === 3)option.cb = cb || option.cb; else if (len == 2); else throw"arguments error!";
    if (typeof option == "function")option = {iterator: option};
    if (cb !== undefined)option.cb = cb || option.cb; else if (option !== undefined); else throw"arguments error!";
    var isArr = tasks instanceof Array;
    var li = isArr ? tasks.length : Object.keys(tasks).length;
    if (li == 0) {
        if (option.cb)option.cb.call(option.cbTarget, null);
        return
    }
    var results = isArr ? [] : {};
    var counter = {length: li, count: li, option: option, results: results};
    cc.each(tasks, function (task, index) {
        if (counter.err)return false;
        var counterFunc = !option.cb ? self._emptyFunc : self._counterFunc.bind({counter: counter, index: index});
        option.iterator.call(option.iteratorTarget, task, index, counterFunc)
    })
}};
cc.path = {join: function () {
    var l = arguments.length;
    var result = "";
    for (var i = 0; i < l; i++)result = (result + (result == "" ? "" : "/") + arguments[i]).replace(/(\/|\\\\)$/, "");
    return result
}, extname: function (pathStr) {
    var temp = /(\.[^\.\/\?\\]*)(\?.*)?$/.exec(pathStr);
    return temp ? temp[1] : null
}, basename: function (pathStr, extname) {
    var index = pathStr.indexOf("?");
    if (index > 0)pathStr = pathStr.substring(0, index);
    var reg = /(\/|\\\\)([^(\/|\\\\)]+)$/g;
    var result = reg.exec(pathStr.replace(/(\/|\\\\)$/, ""));
    if (!result)return null;
    var baseName =
        result[2];
    if (extname && pathStr.substring(pathStr.length - extname.length).toLowerCase() == extname.toLowerCase())return baseName.substring(0, baseName.length - extname.length);
    return baseName
}, dirname: function (pathStr) {
    return pathStr.replace(/((.*)(\/|\\|\\\\))?(.*?\..*$)?/, "$2")
}, changeExtname: function (pathStr, extname) {
    extname = extname || "";
    var index = pathStr.indexOf("?");
    var tempStr = "";
    if (index > 0) {
        tempStr = pathStr.substring(index);
        pathStr = pathStr.substring(0, index)
    }
    index = pathStr.lastIndexOf(".");
    if (index < 0)return pathStr +
        extname + tempStr;
    return pathStr.substring(0, index) + extname + tempStr
}, changeBasename: function (pathStr, basename, isSameExt) {
    if (basename.indexOf(".") == 0)return this.changeExtname(pathStr, basename);
    var index = pathStr.indexOf("?");
    var tempStr = "";
    var ext = isSameExt ? this.extname(pathStr) : "";
    if (index > 0) {
        tempStr = pathStr.substring(index);
        pathStr = pathStr.substring(0, index)
    }
    index = pathStr.lastIndexOf("/");
    index = index <= 0 ? 0 : index + 1;
    return pathStr.substring(0, index) + basename + ext + tempStr
}};
cc.loader = {_jsCache: {}, _register: {}, _langPathCache: {}, _aliases: {}, resPath: "", audioPath: "", cache: {}, getXMLHttpRequest: function () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject("MSXML2.XMLHTTP")
}, _getArgs4Js: function (args) {
    var a0 = args[0], a1 = args[1], a2 = args[2], results = ["", null, null];
    if (args.length === 1)results[1] = a0 instanceof Array ? a0 : [a0]; else if (args.length === 2)if (typeof a1 == "function") {
        results[1] = a0 instanceof Array ? a0 : [a0];
        results[2] = a1
    } else {
        results[0] = a0 || "";
        results[1] =
                a1 instanceof Array ? a1 : [a1]
    } else if (args.length === 3) {
        results[0] = a0 || "";
        results[1] = a1 instanceof Array ? a1 : [a1];
        results[2] = a2
    } else throw"arguments error to load js!";
    return results
}, loadJs: function (baseDir, jsList, cb) {
    var self = this, localJsCache = self._jsCache, args = self._getArgs4Js(arguments);
    if (navigator.userAgent.indexOf("Trident/5") > -1)self._loadJs4Dependency(args[0], args[1], 0, args[2]); else cc.async.map(args[1], function (item, index, cb1) {
        var jsPath = cc.path.join(args[0], item);
        if (localJsCache[jsPath])return cb1(null);
        self._createScript(jsPath, false, cb1)
    }, args[2])
}, loadJsWithImg: function (baseDir, jsList, cb) {
    var self = this, jsLoadingImg = self._loadJsImg(), args = self._getArgs4Js(arguments);
    this.loadJs(args[0], args[1], function (err) {
        if (err)throw err;
        jsLoadingImg.parentNode.removeChild(jsLoadingImg);
        if (args[2])args[2]()
    })
}, _createScript: function (jsPath, isAsync, cb) {
    var d = document, self = this, s = cc.newElement("script");
    s.async = isAsync;
    s.src = jsPath;
    self._jsCache[jsPath] = true;
    cc._addEventListener(s, "load", function () {
        this.removeEventListener("load",
            arguments.callee, false);
        cb()
    }, false);
    cc._addEventListener(s, "error", function () {
        cb("Load " + jsPath + " failed!")
    }, false);
    d.body.appendChild(s)
}, _loadJs4Dependency: function (baseDir, jsList, index, cb) {
    if (index >= jsList.length) {
        if (cb)cb();
        return
    }
    var self = this;
    self._createScript(cc.path.join(baseDir, jsList[index]), false, function (err) {
        if (err)return cb(err);
        self._loadJs4Dependency(baseDir, jsList, index + 1, cb)
    })
}, _loadJsImg: function () {
    var d = document, jsLoadingImg = d.getElementById("cocos2d_loadJsImg");
    if (!jsLoadingImg) {
        jsLoadingImg =
            cc.newElement("img");
        if (cc._loadingImage)jsLoadingImg.src = cc._loadingImage;
        var canvasNode = d.getElementById(cc.game.config["id"]);
        canvasNode.style.backgroundColor = "black";
        canvasNode.parentNode.appendChild(jsLoadingImg);
        var canvasStyle = getComputedStyle ? getComputedStyle(canvasNode) : canvasNode.currentStyle;
        if (!canvasStyle)canvasStyle = {width: canvasNode.width, height: canvasNode.height};
        jsLoadingImg.style.left = canvasNode.offsetLeft + (parseFloat(canvasStyle.width) - jsLoadingImg.width) / 2 + "px";
        jsLoadingImg.style.top =
            canvasNode.offsetTop + (parseFloat(canvasStyle.height) - jsLoadingImg.height) / 2 + "px";
        jsLoadingImg.style.position = "absolute"
    }
    return jsLoadingImg
}, loadTxt: function (url, cb) {
    if (!cc._isNodeJs) {
        var xhr = this.getXMLHttpRequest(), errInfo = "load " + url + " failed!";
        xhr.open("GET", url, true);
        if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
            xhr.setRequestHeader("Accept-Charset", "utf-8");
            xhr.onreadystatechange = function () {
                xhr.readyState == 4 && xhr.status == 200 ? cb(null, xhr.responseText) : cb(errInfo)
            }
        } else {
            if (xhr.overrideMimeType)xhr.overrideMimeType("text/plain; charset\x3dutf-8");
            xhr.onload = function () {
                xhr.readyState == 4 && xhr.status == 200 ? cb(null, xhr.responseText) : cb(errInfo)
            }
        }
        xhr.send(null)
    } else {
        var fs = require("fs");
        fs.readFile(url, function (err, data) {
            err ? cb(err) : cb(null, data.toString())
        })
    }
}, _loadTxtSync: function (url) {
    if (!cc._isNodeJs) {
        var xhr = this.getXMLHttpRequest();
        xhr.open("GET", url, false);
        if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent))xhr.setRequestHeader("Accept-Charset", "utf-8"); else if (xhr.overrideMimeType)xhr.overrideMimeType("text/plain; charset\x3dutf-8");
        xhr.send(null);
        if (!xhr.readyState == 4 || xhr.status != 200)return null;
        return xhr.responseText
    } else {
        var fs = require("fs");
        return fs.readFileSync(url).toString()
    }
}, loadJson: function (url, cb) {
    this.loadTxt(url, function (err, txt) {
        try {
            err ? cb(err) : cb(null, JSON.parse(txt))
        } catch (e) {
            throw"load json [" + url + "] failed : " + e;
        }
    })
}, _checkIsImageURL: function (url) {
    var ext = /(\.png)|(\.jpg)|(\.bmp)|(\.jpeg)|(\.gif)/.exec(url);
    return ext != null
}, loadImg: function (url, option, cb) {
    var opt = {isCrossOrigin: true};
    if (cb !== undefined)opt.isCrossOrigin =
            option.isCrossOrigin == null ? opt.isCrossOrigin : option.isCrossOrigin; else if (option !== undefined)cb = option;
    var img = new Image;
    if (opt.isCrossOrigin && location.origin != "file://")img.crossOrigin = "Anonymous";
    cc._addEventListener(img, "load", function () {
        this.removeEventListener("load", arguments.callee, false);
        this.removeEventListener("error", arguments.callee, false);
        if (cb)cb(null, img)
    });
    cc._addEventListener(img, "error", function () {
        this.removeEventListener("error", arguments.callee, false);
        if (cb)cb("load image failed")
    });
    img.src = url;
    return img
}, _loadResIterator: function (item, index, cb) {
    var self = this, url = null;
    var type = item.type;
    if (type) {
        type = "." + type.toLowerCase();
        url = item.src ? item.src : item.name + type
    } else {
        url = item;
        type = cc.path.extname(url)
    }
    var obj = self.cache[url];
    if (obj)return cb(null, obj);
    var loader = self._register[type.toLowerCase()];
    if (!loader)return cb("loader for [" + type + "] not exists!");
    var basePath = loader.getBasePath ? loader.getBasePath() : self.resPath;
    var realUrl = self.getUrl(basePath, url);
    loader.load(realUrl, url,
        item, function (err, data) {
            if (err) {
                cc.log(err);
                self.cache[url] = null;
                cb()
            } else {
                self.cache[url] = data;
                cb(null, data)
            }
        })
}, getUrl: function (basePath, url) {
    var self = this, langPathCache = self._langPathCache, path = cc.path;
    if (basePath !== undefined && url === undefined) {
        url = basePath;
        var type = path.extname(url);
        type = type ? type.toLowerCase() : "";
        var loader = self._register[type];
        if (!loader)basePath = self.resPath; else basePath = loader.getBasePath ? loader.getBasePath() : self.resPath
    }
    url = cc.path.join(basePath || "", url);
    if (url.match(/[\/(\\\\)]lang[\/(\\\\)]/i)) {
        if (langPathCache[url])return langPathCache[url];
        var extname = path.extname(url) || "";
        url = langPathCache[url] = url.substring(0, url.length - extname.length) + "_" + cc.sys.language + extname
    }
    return url
}, load: function (res, option, cb) {
    if (cb !== undefined) {
        if (typeof option == "function")option = {trigger: option}
    } else if (option !== undefined) {
        if (typeof option == "function") {
            cb = option;
            option = {}
        }
    } else if (res !== undefined)option = {}; else throw"arguments error!";
    option.cb = function (err, results) {
        if (err)cc.log(err);
        if (cb)cb(results)
    };
    if (!(res instanceof Array))res = [res];
    option.iterator =
        this._loadResIterator;
    option.iteratorTarget = this;
    cc.async.map(res, option)
}, _handleAliases: function (fileNames, cb) {
    var self = this, aliases = self._aliases;
    var resList = [];
    for (var key in fileNames) {
        var value = fileNames[key];
        aliases[key] = value;
        resList.push(value)
    }
    this.load(resList, cb)
}, loadAliases: function (url, cb) {
    var self = this, dict = self.getRes(url);
    if (!dict)self.load(url, function (results) {
        self._handleAliases(results[0]["filenames"], cb)
    }); else self._handleAliases(dict["filenames"], cb)
}, register: function (extNames, loader) {
    if (!extNames || !loader)return;
    var self = this;
    if (typeof extNames == "string")return this._register[extNames.trim().toLowerCase()] = loader;
    for (var i = 0, li = extNames.length; i < li; i++)self._register["." + extNames[i].trim().toLowerCase()] = loader
}, getRes: function (url) {
    return this.cache[url] || this.cache[this._aliases[url]]
}, release: function (url) {
    var cache = this.cache, aliases = this._aliases;
    delete cache[url];
    delete cache[aliases[url]];
    delete aliases[url]
}, releaseAll: function () {
    var locCache = this.cache, aliases =
        this._aliases;
    for (var key in locCache)delete locCache[key];
    for (var key in aliases)delete aliases[key]
}};
(function () {
    var win = window, hidden, visibilityChange, _undef = "undefined";
    if (typeof document.hidden !== _undef) {
        hidden = "hidden";
        visibilityChange = "visibilitychange"
    } else if (typeof document.mozHidden !== _undef) {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange"
    } else if (typeof document.msHidden !== _undef) {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange"
    } else if (typeof document.webkitHidden !== _undef) {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange"
    }
    var onHidden = function () {
        if (cc.eventManager &&
            cc.game._eventHide)cc.eventManager.dispatchEvent(cc.game._eventHide)
    };
    var onShow = function () {
        if (cc.eventManager && cc.game._eventShow)cc.eventManager.dispatchEvent(cc.game._eventShow)
    };
    if (hidden)cc._addEventListener(document, visibilityChange, function () {
        if (document[hidden])onHidden(); else onShow()
    }, false); else {
        cc._addEventListener(win, "blur", onHidden, false);
        cc._addEventListener(win, "focus", onShow, false)
    }
    if ("onpageshow"in window && "onpagehide"in window) {
        cc._addEventListener(win, "pagehide", onHidden, false);
        cc._addEventListener(win, "pageshow", onShow, false)
    }
    win = null;
    visibilityChange = null
})();
cc.log = cc.warn = cc.error = cc.assert = function () {
};
cc.create3DContext = function (canvas, opt_attribs) {
    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    var context = null;
    for (var ii = 0; ii < names.length; ++ii) {
        try {
            context = canvas.getContext(names[ii], opt_attribs)
        } catch (e) {
        }
        if (context)break
    }
    return context
};
cc._initSys = function (config, CONFIG_KEY) {
    cc._RENDER_TYPE_CANVAS = 0;
    cc._RENDER_TYPE_WEBGL = 1;
    var sys = cc.sys = {};
    sys.LANGUAGE_ENGLISH = "en";
    sys.LANGUAGE_CHINESE = "zh";
    sys.LANGUAGE_FRENCH = "fr";
    sys.LANGUAGE_ITALIAN = "it";
    sys.LANGUAGE_GERMAN = "de";
    sys.LANGUAGE_SPANISH = "es";
    sys.LANGUAGE_RUSSIAN = "ru";
    sys.LANGUAGE_KOREAN = "ko";
    sys.LANGUAGE_JAPANESE = "ja";
    sys.LANGUAGE_HUNGARIAN = "hu";
    sys.LANGUAGE_PORTUGUESE = "pt";
    sys.LANGUAGE_ARABIC = "ar";
    sys.LANGUAGE_NORWEGIAN = "no";
    sys.LANGUAGE_POLISH = "pl";
    sys.OS_WINDOWS = "Windows";
    sys.OS_IOS =
        "iOS";
    sys.OS_OSX = "OS X";
    sys.OS_UNIX = "UNIX";
    sys.OS_LINUX = "Linux";
    sys.OS_ANDROID = "Android";
    sys.OS_UNKNOWN = "Unknown";
    sys.BROWSER_TYPE_WECHAT = "wechat";
    sys.BROWSER_TYPE_ANDROID = "androidbrowser";
    sys.BROWSER_TYPE_IE = "ie";
    sys.BROWSER_TYPE_QQ = "qqbrowser";
    sys.BROWSER_TYPE_MOBILE_QQ = "mqqbrowser";
    sys.BROWSER_TYPE_UC = "ucbrowser";
    sys.BROWSER_TYPE_360 = "360browser";
    sys.BROWSER_TYPE_BAIDU_APP = "baiduboxapp";
    sys.BROWSER_TYPE_BAIDU = "baidubrowser";
    sys.BROWSER_TYPE_MAXTHON = "maxthon";
    sys.BROWSER_TYPE_OPERA = "opera";
    sys.BROWSER_TYPE_MIUI =
        "miuibrowser";
    sys.BROWSER_TYPE_FIREFOX = "firefox";
    sys.BROWSER_TYPE_SAFARI = "safari";
    sys.BROWSER_TYPE_CHROME = "chrome";
    sys.BROWSER_TYPE_UNKNOWN = "unknown";
    sys.isNative = false;
    var webglWhiteList = [sys.BROWSER_TYPE_BAIDU, sys.BROWSER_TYPE_OPERA, sys.BROWSER_TYPE_FIREFOX, sys.BROWSER_TYPE_CHROME, sys.BROWSER_TYPE_SAFARI];
    var multipleAudioWhiteList = [sys.BROWSER_TYPE_BAIDU, sys.BROWSER_TYPE_OPERA, sys.BROWSER_TYPE_FIREFOX, sys.BROWSER_TYPE_CHROME, sys.BROWSER_TYPE_SAFARI, sys.BROWSER_TYPE_UC, sys.BROWSER_TYPE_QQ, sys.BROWSER_TYPE_MOBILE_QQ,
        sys.BROWSER_TYPE_IE];
    var win = window, nav = win.navigator, doc = document, docEle = doc.documentElement;
    var ua = nav.userAgent.toLowerCase();
    sys.isMobile = ua.indexOf("mobile") != -1 || ua.indexOf("android") != -1;
    var currLanguage = nav.language;
    currLanguage = currLanguage ? currLanguage : nav.browserLanguage;
    currLanguage = currLanguage ? currLanguage.split("-")[0] : sys.LANGUAGE_ENGLISH;
    sys.language = currLanguage;
    var browserType = sys.BROWSER_TYPE_UNKNOWN;
    var browserTypes = ua.match(/micromessenger|qqbrowser|mqqbrowser|ucbrowser|360browser|baiduboxapp|baidubrowser|maxthon|trident|opera|miuibrowser|firefox/i) ||
        ua.match(/chrome|safari/i);
    if (browserTypes && browserTypes.length > 0) {
        browserType = browserTypes[0].toLowerCase();
        if (browserType == "micromessenger")browserType = sys.BROWSER_TYPE_WECHAT; else if (browserType === "safari" && ua.match(/android.*applewebkit/))browserType = sys.BROWSER_TYPE_ANDROID; else if (browserType == "trident")browserType = sys.BROWSER_TYPE_IE
    }
    sys.browserType = browserType;
    sys._supportMultipleAudio = multipleAudioWhiteList.indexOf(sys.browserType) > -1;
    var userRenderMode = parseInt(config[CONFIG_KEY.renderMode]);
    var renderType = cc._RENDER_TYPE_WEBGL;
    var tempCanvas = cc.newElement("Canvas");
    cc._supportRender = true;
    var notInWhiteList = webglWhiteList.indexOf(sys.browserType) == -1;
    if (userRenderMode === 1 || userRenderMode === 0 && (sys.isMobile || notInWhiteList))renderType = cc._RENDER_TYPE_CANVAS;
    if (renderType == cc._RENDER_TYPE_WEBGL)if (!win.WebGLRenderingContext || !cc.create3DContext(tempCanvas, {"stencil": true, "preserveDrawingBuffer": true}))if (userRenderMode == 0)renderType = cc._RENDER_TYPE_CANVAS; else cc._supportRender = false;
    if (renderType ==
        cc._RENDER_TYPE_CANVAS)try {
        tempCanvas.getContext("2d")
    } catch (e) {
        cc._supportRender = false
    }
    cc._renderType = renderType;
    try {
        sys._supportWebAudio = !!new (win.AudioContext || win.webkitAudioContext || win.mozAudioContext)
    } catch (e) {
        sys._supportWebAudio = false
    }
    try {
        var localStorage = sys.localStorage = win.localStorage;
        localStorage.setItem("storage", "");
        localStorage.removeItem("storage");
        localStorage = null
    } catch (e) {
        if (e.name === "SECURITY_ERR" || e.name === "QuotaExceededError")cc.warn("Warning: localStorage isn't enabled. Please confirm browser cookie or privacy option");
        sys.localStorage = function () {
        }
    }
    var capabilities = sys.capabilities = {"canvas": true};
    if (cc._renderType == cc._RENDER_TYPE_WEBGL)capabilities["opengl"] = true;
    if (docEle["ontouchstart"] !== undefined || nav.msPointerEnabled)capabilities["touches"] = true; else if (docEle["onmouseup"] !== undefined)capabilities["mouse"] = true;
    if (docEle["onkeyup"] !== undefined)capabilities["keyboard"] = true;
    if (win.DeviceMotionEvent || win.DeviceOrientationEvent)capabilities["accelerometer"] = true;
    var iOS = ua.match(/(iPad|iPhone|iPod)/i) ? true :
        false;
    var isAndroid = ua.match(/android/i) || nav.platform.match(/android/i) ? true : false;
    var osName = sys.OS_UNKNOWN;
    if (nav.appVersion.indexOf("Win") != -1)osName = sys.OS_WINDOWS; else if (iOS)osName = sys.OS_IOS; else if (nav.appVersion.indexOf("Mac") != -1)osName = sys.OS_OSX; else if (nav.appVersion.indexOf("X11") != -1)osName = sys.OS_UNIX; else if (nav.appVersion.indexOf("Linux") != -1)osName = sys.OS_LINUX; else if (isAndroid)osName = sys.OS_ANDROID;
    sys.os = osName;
    sys.garbageCollect = function () {
    };
    sys.dumpRoot = function () {
    };
    sys.restartVM =
        function () {
        };
    sys.dump = function () {
        var self = this;
        var str = "";
        str += "isMobile : " + self.isMobile + "\r\n";
        str += "language : " + self.language + "\r\n";
        str += "browserType : " + self.browserType + "\r\n";
        str += "capabilities : " + JSON.stringify(self.capabilities) + "\r\n";
        str += "os : " + self.os + "\r\n";
        cc.log(str)
    }
};
cc.ORIENTATION_PORTRAIT = 0;
cc.ORIENTATION_PORTRAIT_UPSIDE_DOWN = 1;
cc.ORIENTATION_LANDSCAPE_LEFT = 2;
cc.ORIENTATION_LANDSCAPE_RIGHT = 3;
cc._drawingUtil = null;
cc._renderContext = null;
cc._canvas = null;
cc._gameDiv = null;
cc._rendererInitialized = false;
cc._setupCalled = false;
cc._setup = function (el, width, height) {
    if (cc._setupCalled)return; else cc._setupCalled = true;
    var win = window;
    win.requestAnimFrame = win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame || win.msRequestAnimationFrame;
    var element = cc.$(el) || cc.$("#" + el);
    var localCanvas, localContainer, localConStyle;
    if (element.tagName == "CANVAS") {
        width = width || element.width;
        height = height || element.height;
        localContainer = cc.container = cc.newElement("DIV");
        localCanvas = cc._canvas =
            element;
        localCanvas.parentNode.insertBefore(localContainer, localCanvas);
        localCanvas.appendTo(localContainer);
        localContainer.setAttribute("id", "Cocos2dGameContainer")
    } else {
        if (element.tagName != "DIV")cc.log("Warning: target element is not a DIV or CANVAS");
        width = width || element.clientWidth;
        height = height || element.clientHeight;
        localContainer = cc.container = element;
        localCanvas = cc._canvas = cc.newElement("CANVAS");
        element.appendChild(localCanvas)
    }
    localCanvas.addClass("gameCanvas");
    localCanvas.setAttribute("width",
            width || 480);
    localCanvas.setAttribute("height", height || 320);
    localConStyle = localContainer.style;
    localConStyle.width = (width || 480) + "px";
    localConStyle.height = (height || 320) + "px";
    localConStyle.margin = "0 auto";
    localConStyle.position = "relative";
    localConStyle.overflow = "hidden";
    localContainer.top = "100%";
    if (cc._renderType == cc._RENDER_TYPE_WEBGL)cc._renderContext = cc.webglContext = cc.create3DContext(localCanvas, {"stencil": true, "preserveDrawingBuffer": true, "antialias": !cc.sys.isMobile, "alpha": false});
    if (cc._renderContext) {
        win.gl =
            cc._renderContext;
        cc._drawingUtil = new cc.DrawingPrimitiveWebGL(cc._renderContext);
        cc._rendererInitialized = true;
        cc.textureCache._initializingRenderer();
        cc.shaderCache._init()
    } else {
        cc._renderContext = localCanvas.getContext("2d");
        cc._mainRenderContextBackup = cc._renderContext;
        cc._renderContext.translate(0, localCanvas.height);
        cc._drawingUtil = cc.DrawingPrimitiveCanvas ? new cc.DrawingPrimitiveCanvas(cc._renderContext) : null
    }
    cc._gameDiv = localContainer;
    cc.log(cc.ENGINE_VERSION);
    cc._setContextMenuEnable(false);
    if (cc.sys.isMobile) {
        var fontStyle = cc.newElement("style");
        fontStyle.type = "text/css";
        document.body.appendChild(fontStyle);
        fontStyle.textContent = "body,canvas,div{ -moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;" + "-webkit-tap-highlight-color:rgba(0,0,0,0);}"
    }
    cc.view = cc.EGLView._getInstance();
    cc.inputManager.registerSystemEvent(cc._canvas);
    cc.director = cc.Director._getInstance();
    if (cc.director.setOpenGLView)cc.director.setOpenGLView(cc.view);
    cc.winSize = cc.director.getWinSize();
    cc.saxParser = new cc.SAXParser;
    cc.plistParser = new cc.PlistParser
};
cc._checkWebGLRenderMode = function () {
    if (cc._renderType !== cc._RENDER_TYPE_WEBGL)throw"This feature supports WebGL render mode only.";
};
cc._isContextMenuEnable = false;
cc._setContextMenuEnable = function (enabled) {
    cc._isContextMenuEnable = enabled;
    cc._canvas.oncontextmenu = function () {
        if (!cc._isContextMenuEnable)return false
    }
};
cc.game = {DEBUG_MODE_NONE: 0, DEBUG_MODE_INFO: 1, DEBUG_MODE_WARN: 2, DEBUG_MODE_ERROR: 3, DEBUG_MODE_INFO_FOR_WEB_PAGE: 4, DEBUG_MODE_WARN_FOR_WEB_PAGE: 5, DEBUG_MODE_ERROR_FOR_WEB_PAGE: 6, EVENT_HIDE: "game_on_hide", EVENT_SHOW: "game_on_show", _eventHide: null, _eventShow: null, _onBeforeStartArr: [], CONFIG_KEY: {engineDir: "engineDir", dependencies: "dependencies", debugMode: "debugMode", showFPS: "showFPS", frameRate: "frameRate", id: "id", renderMode: "renderMode", jsList: "jsList", classReleaseMode: "classReleaseMode"}, _prepareCalled: false,
    _prepared: false, _paused: true, _intervalId: null, config: null, onStart: null, onStop: null, setFrameRate: function (frameRate) {
        var self = this, config = self.config, CONFIG_KEY = self.CONFIG_KEY;
        config[CONFIG_KEY.frameRate] = frameRate;
        if (self._intervalId)clearInterval(self._intervalId);
        self._paused = true;
        self._runMainLoop()
    }, _runMainLoop: function () {
        var self = this, callback, config = self.config, CONFIG_KEY = self.CONFIG_KEY, win = window, frameRate = config[CONFIG_KEY.frameRate], director = cc.director;
        director.setDisplayStats(config[CONFIG_KEY.showFPS]);
        if (win.requestAnimFrame && frameRate == 60) {
            callback = function () {
                if (!self._paused) {
                    director.mainLoop();
                    win.requestAnimFrame(callback)
                }
            };
            win.requestAnimFrame(callback)
        } else {
            callback = function () {
                director.mainLoop()
            };
            self._intervalId = setInterval(callback, 1E3 / frameRate)
        }
        self._paused = false
    }, run: function (id) {
        var self = this;
        var _run = function () {
            if (id)self.config[self.CONFIG_KEY.id] = id;
            if (!self._prepareCalled)self.prepare(function () {
                if (cc._supportRender) {
                    cc._setup(self.config[self.CONFIG_KEY.id]);
                    self._runMainLoop();
                    self._eventHide = self._eventHide || new cc.EventCustom(self.EVENT_HIDE);
                    self._eventHide.setUserData(self);
                    self._eventShow = self._eventShow || new cc.EventCustom(self.EVENT_SHOW);
                    self._eventShow.setUserData(self);
                    self.onStart()
                }
            }); else if (cc._supportRender)self._checkPrepare = setInterval(function () {
                if (self._prepared) {
                    cc._setup(self.config[self.CONFIG_KEY.id]);
                    self._runMainLoop();
                    self._eventHide = self._eventHide || new cc.EventCustom(self.EVENT_HIDE);
                    self._eventHide.setUserData(self);
                    self._eventShow = self._eventShow ||
                        new cc.EventCustom(self.EVENT_SHOW);
                    self._eventShow.setUserData(self);
                    self.onStart();
                    clearInterval(self._checkPrepare)
                }
            }, 10)
        };
        document.body ? _run() : cc._addEventListener(window, "load", function () {
            this.removeEventListener("load", arguments.callee, false);
            _run()
        }, false)
    }, _initConfig: function () {
        var self = this, CONFIG_KEY = self.CONFIG_KEY;
        var _init = function (cfg) {
            cfg[CONFIG_KEY.engineDir] = cfg[CONFIG_KEY.engineDir] || "frameworks/cocos2d-html5";
            if (cfg[CONFIG_KEY.debugMode] == null)cfg[CONFIG_KEY.debugMode] = 0;
            cfg[CONFIG_KEY.frameRate] =
                cfg[CONFIG_KEY.frameRate] || 60;
            if (cfg[CONFIG_KEY.renderMode] == null)cfg[CONFIG_KEY.renderMode] = 1;
            return cfg
        };
        if (document["ccConfig"])self.config = _init(document["ccConfig"]); else try {
            var txt = cc.loader._loadTxtSync("project.json");
            var data = JSON.parse(txt);
            self.config = _init(data || {})
        } catch (e) {
            cc.log("Failed to read or parse project.json");
            self.config = _init({})
        }
        cc._initSys(self.config, CONFIG_KEY)
    }, _jsAddedCache: {}, _getJsListOfModule: function (moduleMap, moduleName, dir) {
        var jsAddedCache = this._jsAddedCache;
        if (jsAddedCache[moduleName])return null;
        dir = dir || "";
        var jsList = [];
        var tempList = moduleMap[moduleName];
        if (!tempList)throw"can not find module [" + moduleName + "]";
        var ccPath = cc.path;
        for (var i = 0, li = tempList.length; i < li; i++) {
            var item = tempList[i];
            if (jsAddedCache[item])continue;
            var extname = ccPath.extname(item);
            if (!extname) {
                var arr = this._getJsListOfModule(moduleMap, item, dir);
                if (arr)jsList = jsList.concat(arr)
            } else if (extname.toLowerCase() == ".js")jsList.push(ccPath.join(dir, item));
            jsAddedCache[item] = 1
        }
        return jsList
    },
    prepare: function (cb) {
        var self = this;
        var config = self.config, CONFIG_KEY = self.CONFIG_KEY, engineDir = config[CONFIG_KEY.engineDir], loader = cc.loader;
        if (!cc._supportRender) {
            cc.error("Can not support render!");
            return
        }
        self._prepareCalled = true;
        var jsList = config[CONFIG_KEY.jsList] || [];
        if (cc.Class)loader.loadJsWithImg("", jsList, function (err) {
            if (err)throw err;
            self._prepared = true;
            if (cb)cb()
        }); else {
            var ccModulesPath = cc.path.join(engineDir, "moduleConfig.json");
            loader.loadJson(ccModulesPath, function (err, modulesJson) {
                if (err)throw err;
                var modules = config["modules"] || [];
                var moduleMap = modulesJson["module"];
                var newJsList = [];
                if (cc._renderType == cc._RENDER_TYPE_WEBGL)modules.splice(0, 0, "shaders"); else if (modules.indexOf("core") < 0)modules.splice(0, 0, "core");
                for (var i = 0, li = modules.length; i < li; i++) {
                    var arr = self._getJsListOfModule(moduleMap, modules[i], engineDir);
                    if (arr)newJsList = newJsList.concat(arr)
                }
                newJsList = newJsList.concat(jsList);
                cc.loader.loadJsWithImg(newJsList, function (err) {
                    if (err)throw err;
                    self._prepared = true;
                    if (cb)cb()
                })
            })
        }
    }};
cc.game._initConfig();
cc.loader.loadBinary = function (url, cb) {
    var self = this;
    var xhr = this.getXMLHttpRequest(), errInfo = "load " + url + " failed!";
    xhr.open("GET", url, true);
    if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
        xhr.setRequestHeader("Accept-Charset", "x-user-defined");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var fileContents = cc._convertResponseBodyToText(xhr["responseBody"]);
                cb(null, self._str2Uint8Array(fileContents))
            } else cb(errInfo)
        }
    } else {
        if (xhr.overrideMimeType)xhr.overrideMimeType("text/plain; charset\x3dx-user-defined");
        xhr.onload = function () {
            xhr.readyState == 4 && xhr.status == 200 ? cb(null, self._str2Uint8Array(xhr.responseText)) : cb(errInfo)
        }
    }
    xhr.send(null)
};
cc.loader._str2Uint8Array = function (strData) {
    if (!strData)return null;
    var arrData = new Uint8Array(strData.length);
    for (var i = 0; i < strData.length; i++)arrData[i] = strData.charCodeAt(i) & 255;
    return arrData
};
cc.loader.loadBinarySync = function (url) {
    var self = this;
    var req = this.getXMLHttpRequest();
    var errInfo = "load " + url + " failed!";
    req.open("GET", url, false);
    var arrayInfo = null;
    if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
        req.setRequestHeader("Accept-Charset", "x-user-defined");
        req.send(null);
        if (req.status != 200) {
            cc.log(errInfo);
            return null
        }
        var fileContents = cc._convertResponseBodyToText(req["responseBody"]);
        if (fileContents)arrayInfo = self._str2Uint8Array(fileContents)
    } else {
        if (req.overrideMimeType)req.overrideMimeType("text/plain; charset\x3dx-user-defined");
        req.send(null);
        if (req.status != 200) {
            cc.log(errInfo);
            return null
        }
        arrayInfo = this._str2Uint8Array(req.responseText)
    }
    return arrayInfo
};
var Uint8Array = Uint8Array || Array;
if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
    var IEBinaryToArray_ByteStr_Script = "\x3c!-- IEBinaryToArray_ByteStr --\x3e\r\n" + "Function IEBinaryToArray_ByteStr(Binary)\r\n" + "   IEBinaryToArray_ByteStr \x3d CStr(Binary)\r\n" + "End Function\r\n" + "Function IEBinaryToArray_ByteStr_Last(Binary)\r\n" + "   Dim lastIndex\r\n" + "   lastIndex \x3d LenB(Binary)\r\n" + "   if lastIndex mod 2 Then\r\n" + "       IEBinaryToArray_ByteStr_Last \x3d Chr( AscB( MidB( Binary, lastIndex, 1 ) ) )\r\n" +
        "   Else\r\n" + "       IEBinaryToArray_ByteStr_Last \x3d " + '""' + "\r\n" + "   End If\r\n" + "End Function\r\n";
    var myVBScript = cc.newElement("script");
    myVBScript.type = "text/vbscript";
    myVBScript.textContent = IEBinaryToArray_ByteStr_Script;
    document.body.appendChild(myVBScript);
    cc._convertResponseBodyToText = function (binary) {
        var byteMapping = {};
        for (var i = 0; i < 256; i++)for (var j = 0; j < 256; j++)byteMapping[String.fromCharCode(i + j * 256)] = String.fromCharCode(i) + String.fromCharCode(j);
        var rawBytes = IEBinaryToArray_ByteStr(binary);
        var lastChr = IEBinaryToArray_ByteStr_Last(binary);
        return rawBytes.replace(/[\s\S]/g, function (match) {
            return byteMapping[match]
        }) + lastChr
    }
}
;
var cc = cc || {};
cc._loadingImage = "data:image/gif;base64,R0lGODlhEAAQALMNAD8/P7+/vyoqKlVVVX9/fxUVFUBAQGBgYMDAwC8vL5CQkP///wAAAP///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAANACwAAAAAEAAQAAAEO5DJSau9OOvNex0IMnDIsiCkiW6g6BmKYlBFkhSUEgQKlQCARG6nEBwOgl+QApMdCIRD7YZ5RjlGpCUCACH5BAUAAA0ALAAAAgAOAA4AAAQ6kLGB0JA4M7QW0hrngRllkYyhKAYqKUGguAws0ypLS8JxCLQDgXAIDg+FRKIA6v0SAECCBpXSkstMBAAh+QQFAAANACwAAAAACgAQAAAEOJDJORAac6K1kDSKYmydpASBUl0mqmRfaGTCcQgwcxDEke+9XO2WkxQSiUIuAQAkls0n7JgsWq8RACH5BAUAAA0ALAAAAAAOAA4AAAQ6kMlplDIzTxWC0oxwHALnDQgySAdBHNWFLAvCukc215JIZihVIZEogDIJACBxnCSXTcmwGK1ar1hrBAAh+QQFAAANACwAAAAAEAAKAAAEN5DJKc4RM+tDyNFTkSQF5xmKYmQJACTVpQSBwrpJNteZSGYoFWjIGCAQA2IGsVgglBOmEyoxIiMAIfkEBQAADQAsAgAAAA4ADgAABDmQSVZSKjPPBEDSGucJxyGA1XUQxAFma/tOpDlnhqIYN6MEAUXvF+zldrMBAjHoIRYLhBMqvSmZkggAIfkEBQAADQAsBgAAAAoAEAAABDeQyUmrnSWlYhMASfeFVbZdjHAcgnUQxOHCcqWylKEohqUEAYVkgEAMfkEJYrFA6HhKJsJCNFoiACH5BAUAAA0ALAIAAgAOAA4AAAQ3kMlJq704611SKloCAEk4lln3DQgyUMJxCBKyLAh1EMRR3wiDQmHY9SQslyIQUMRmlmVTIyRaIgA7";
cc._fpsImage = "data:image/png;base64,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\x3d";
cc._loaderImage = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAlAAD/4QMpaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM4MDBEMDY2QTU1MjExRTFBQTAzQjEzMUNFNzMxRkQwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM4MDBEMDY1QTU1MjExRTFBQTAzQjEzMUNFNzMxRkQwIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU2RTk0OEM4OERCNDExRTE5NEUyRkE3M0M3QkE1NTlEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU2RTk0OEM5OERCNDExRTE5NEUyRkE3M0M3QkE1NTlEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQADQkJCQoJDQoKDRMMCwwTFhENDREW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\x3d";
var cc = cc || {};
var ClassManager = {id: 0 | Math.random() * 998, instanceId: 0 | Math.random() * 998, compileSuper: function (func, name, id) {
    var str = func.toString();
    var pstart = str.indexOf("("), pend = str.indexOf(")");
    var params = str.substring(pstart + 1, pend);
    params = params.trim();
    var bstart = str.indexOf("{"), bend = str.lastIndexOf("}");
    var str = str.substring(bstart + 1, bend);
    while (str.indexOf("this._super") != -1) {
        var sp = str.indexOf("this._super");
        var bp = str.indexOf("(", sp);
        var bbp = str.indexOf(")", bp);
        var superParams = str.substring(bp + 1, bbp);
        superParams = superParams.trim();
        var coma = superParams ? "," : "";
        str = str.substring(0, sp) + "ClassManager[" + id + "]." + name + ".call(this" + coma + str.substring(bp + 1)
    }
    return Function(params, str)
}, getNewID: function () {
    return this.id++
}, getNewInstanceId: function () {
    return this.instanceId++
}};
ClassManager.compileSuper.ClassManager = ClassManager;
(function () {
    var initializing = false, fnTest = /\b_super\b/;
    var config = cc.game.config;
    var releaseMode = config[cc.game.CONFIG_KEY.classReleaseMode];
    if (releaseMode)console.log("release Mode");
    cc.Class = function () {
    };
    cc.Class.extend = function (prop) {
        var _super = this.prototype;
        var prototype = Object.create(_super);
        var classId = ClassManager.getNewID();
        ClassManager[classId] = _super;
        var desc = {writable: true, enumerable: false, configurable: true};
        prototype.__instanceId = null;
        function Class() {
            this.__instanceId = ClassManager.getNewInstanceId();
            if (this.ctor)this.ctor.apply(this, arguments)
        }

        Class.id = classId;
        desc.value = classId;
        Object.defineProperty(prototype, "__pid", desc);
        Class.prototype = prototype;
        desc.value = Class;
        Object.defineProperty(Class.prototype, "constructor", desc);
        this.__getters__ && (Class.__getters__ = cc.clone(this.__getters__));
        this.__setters__ && (Class.__setters__ = cc.clone(this.__setters__));
        for (var name in prop) {
            var isFunc = typeof prop[name] === "function";
            var override = typeof _super[name] === "function";
            var hasSuperCall = fnTest.test(prop[name]);
            if (releaseMode && isFunc && override && hasSuperCall) {
                desc.value = ClassManager.compileSuper(prop[name], name, classId);
                Object.defineProperty(prototype, name, desc)
            } else if (isFunc && override && hasSuperCall) {
                desc.value = function (name, fn) {
                    return function () {
                        var tmp = this._super;
                        this._super = _super[name];
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;
                        return ret
                    }
                }(name, prop[name]);
                Object.defineProperty(prototype, name, desc)
            } else if (isFunc) {
                desc.value = prop[name];
                Object.defineProperty(prototype, name, desc)
            } else prototype[name] =
                prop[name];
            if (isFunc) {
                var getter, setter, propertyName;
                if (this.__getters__ && this.__getters__[name]) {
                    propertyName = this.__getters__[name];
                    for (var i in this.__setters__)if (this.__setters__[i] == propertyName) {
                        setter = i;
                        break
                    }
                    cc.defineGetterSetter(prototype, propertyName, prop[name], prop[setter] ? prop[setter] : prototype[setter], name, setter)
                }
                if (this.__setters__ && this.__setters__[name]) {
                    propertyName = this.__setters__[name];
                    for (var i in this.__getters__)if (this.__getters__[i] == propertyName) {
                        getter = i;
                        break
                    }
                    cc.defineGetterSetter(prototype,
                        propertyName, prop[getter] ? prop[getter] : prototype[getter], prop[name], getter, name)
                }
            }
        }
        Class.extend = cc.Class.extend;
        Class.implement = function (prop) {
            for (var name in prop)prototype[name] = prop[name]
        };
        return Class
    };
    Function.prototype.bind = Function.prototype.bind || function (bind) {
        var self = this;
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return self.apply(bind || null, args)
        }
    }
})();
cc.defineGetterSetter = function (proto, prop, getter, setter, getterName, setterName) {
    if (proto.__defineGetter__) {
        getter && proto.__defineGetter__(prop, getter);
        setter && proto.__defineSetter__(prop, setter)
    } else if (Object.defineProperty) {
        var desc = {enumerable: false, configurable: true};
        getter && (desc.get = getter);
        setter && (desc.set = setter);
        Object.defineProperty(proto, prop, desc)
    } else throw new Error("browser does not support getters");
    if (!getterName && !setterName) {
        var hasGetter = getter != null, hasSetter = setter != undefined,
            props = Object.getOwnPropertyNames(proto);
        for (var i = 0; i < props.length; i++) {
            var name = props[i];
            if ((proto.__lookupGetter__ ? proto.__lookupGetter__(name) : Object.getOwnPropertyDescriptor(proto, name)) || typeof proto[name] !== "function")continue;
            var func = proto[name];
            if (hasGetter && func === getter) {
                getterName = name;
                if (!hasSetter || setterName)break
            }
            if (hasSetter && func === setter) {
                setterName = name;
                if (!hasGetter || getterName)break
            }
        }
    }
    var ctor = proto.constructor;
    if (getterName) {
        if (!ctor.__getters__)ctor.__getters__ = {};
        ctor.__getters__[getterName] =
            prop
    }
    if (setterName) {
        if (!ctor.__setters__)ctor.__setters__ = {};
        ctor.__setters__[setterName] = prop
    }
};
cc.clone = function (obj) {
    var newObj = obj.constructor ? new obj.constructor : {};
    for (var key in obj) {
        var copy = obj[key];
        if (typeof copy == "object" && copy && !(copy instanceof cc.Node) && !(copy instanceof HTMLElement))newObj[key] = cc.clone(copy); else newObj[key] = copy
    }
    return newObj
};
cc.Point = function (x, y) {
    this.x = x || 0;
    this.y = y || 0
};
cc.p = function (x, y) {
    if (x == undefined)return{x: 0, y: 0};
    if (y == undefined)return{x: x.x, y: x.y};
    return{x: x, y: y}
};
cc.pointEqualToPoint = function (point1, point2) {
    return point1 && point2 && point1.x === point2.x && point1.y === point2.y
};
cc.Size = function (width, height) {
    this.width = width || 0;
    this.height = height || 0
};
cc.size = function (w, h) {
    if (w === undefined)return{width: 0, height: 0};
    if (h === undefined)return{width: w.width, height: w.height};
    return{width: w, height: h}
};
cc.sizeEqualToSize = function (size1, size2) {
    return size1 && size2 && size1.width == size2.width && size1.height == size2.height
};
cc.Rect = function (x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0
};
cc.rect = function (x, y, w, h) {
    if (x === undefined)return{x: 0, y: 0, width: 0, height: 0};
    if (y === undefined)return{x: x.x, y: x.y, width: x.width, height: x.height};
    return{x: x, y: y, width: w, height: h}
};
cc.rectEqualToRect = function (rect1, rect2) {
    return rect1 && rect2 && rect1.x === rect2.x && rect1.y === rect2.y && rect1.width === rect2.width && rect1.height === rect2.height
};
cc._rectEqualToZero = function (rect) {
    return rect && rect.x === 0 && rect.y === 0 && rect.width === 0 && rect.height === 0
};
cc.rectContainsRect = function (rect1, rect2) {
    if (!rect1 || !rect2)return false;
    return!(rect1.x >= rect2.x || rect1.y >= rect2.y || rect1.x + rect1.width <= rect2.x + rect2.width || rect1.y + rect1.height <= rect2.y + rect2.height)
};
cc.rectGetMaxX = function (rect) {
    return rect.x + rect.width
};
cc.rectGetMidX = function (rect) {
    return rect.x + rect.width / 2
};
cc.rectGetMinX = function (rect) {
    return rect.x
};
cc.rectGetMaxY = function (rect) {
    return rect.y + rect.height
};
cc.rectGetMidY = function (rect) {
    return rect.y + rect.height / 2
};
cc.rectGetMinY = function (rect) {
    return rect.y
};
cc.rectContainsPoint = function (rect, point) {
    return point.x >= cc.rectGetMinX(rect) && point.x <= cc.rectGetMaxX(rect) && point.y >= cc.rectGetMinY(rect) && point.y <= cc.rectGetMaxY(rect)
};
cc.rectIntersectsRect = function (rectA, rectB) {
    return!(cc.rectGetMaxX(rectA) < cc.rectGetMinX(rectB) || cc.rectGetMaxX(rectB) < cc.rectGetMinX(rectA) || cc.rectGetMaxY(rectA) < cc.rectGetMinY(rectB) || cc.rectGetMaxY(rectB) < cc.rectGetMinY(rectA))
};
cc.rectOverlapsRect = function (rectA, rectB) {
    return!(rectA.x + rectA.width < rectB.x || rectB.x + rectB.width < rectA.x || rectA.y + rectA.height < rectB.y || rectB.y + rectB.height < rectA.y)
};
cc.rectUnion = function (rectA, rectB) {
    var rect = cc.rect(0, 0, 0, 0);
    rect.x = Math.min(rectA.x, rectB.x);
    rect.y = Math.min(rectA.y, rectB.y);
    rect.width = Math.max(rectA.x + rectA.width, rectB.x + rectB.width) - rect.x;
    rect.height = Math.max(rectA.y + rectA.height, rectB.y + rectB.height) - rect.y;
    return rect
};
cc.rectIntersection = function (rectA, rectB) {
    var intersection = cc.rect(Math.max(cc.rectGetMinX(rectA), cc.rectGetMinX(rectB)), Math.max(cc.rectGetMinY(rectA), cc.rectGetMinY(rectB)), 0, 0);
    intersection.width = Math.min(cc.rectGetMaxX(rectA), cc.rectGetMaxX(rectB)) - cc.rectGetMinX(intersection);
    intersection.height = Math.min(cc.rectGetMaxY(rectA), cc.rectGetMaxY(rectB)) - cc.rectGetMinY(intersection);
    return intersection
};
cc.SAXParser = cc.Class.extend({_parser: null, _isSupportDOMParser: null, ctor: function () {
    if (window.DOMParser) {
        this._isSupportDOMParser = true;
        this._parser = new DOMParser
    } else this._isSupportDOMParser = false
}, parse: function (xmlTxt) {
    return this._parseXML(xmlTxt)
}, _parseXML: function (textxml) {
    var xmlDoc;
    if (this._isSupportDOMParser)xmlDoc = this._parser.parseFromString(textxml, "text/xml"); else {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(textxml)
    }
    return xmlDoc
}});
cc.PlistParser = cc.SAXParser.extend({parse: function (xmlTxt) {
    var xmlDoc = this._parseXML(xmlTxt);
    var plist = xmlDoc.documentElement;
    if (plist.tagName != "plist")throw"Not a plist file!";
    var node = null;
    for (var i = 0, len = plist.childNodes.length; i < len; i++) {
        node = plist.childNodes[i];
        if (node.nodeType == 1)break
    }
    xmlDoc = null;
    return this._parseNode(node)
}, _parseNode: function (node) {
    var data = null, tagName = node.tagName;
    if (tagName == "dict")data = this._parseDict(node); else if (tagName == "array")data = this._parseArray(node); else if (tagName ==
        "string")if (node.childNodes.length == 1)data = node.firstChild.nodeValue; else {
        data = "";
        for (var i = 0; i < node.childNodes.length; i++)data += node.childNodes[i].nodeValue
    } else if (tagName == "false")data = false; else if (tagName == "true")data = true; else if (tagName == "real")data = parseFloat(node.firstChild.nodeValue); else if (tagName == "integer")data = parseInt(node.firstChild.nodeValue, 10);
    return data
}, _parseArray: function (node) {
    var data = [];
    for (var i = 0, len = node.childNodes.length; i < len; i++) {
        var child = node.childNodes[i];
        if (child.nodeType !=
            1)continue;
        data.push(this._parseNode(child))
    }
    return data
}, _parseDict: function (node) {
    var data = {};
    var key = null;
    for (var i = 0, len = node.childNodes.length; i < len; i++) {
        var child = node.childNodes[i];
        if (child.nodeType != 1)continue;
        if (child.tagName == "key")key = child.firstChild.nodeValue; else data[key] = this._parseNode(child)
    }
    return data
}});
cc._txtLoader = {load: function (realUrl, url, res, cb) {
    cc.loader.loadTxt(realUrl, cb)
}};
cc.loader.register(["txt", "xml", "vsh", "fsh"], cc._txtLoader);
cc._jsonLoader = {load: function (realUrl, url, res, cb) {
    cc.loader.loadJson(realUrl, cb)
}};
cc.loader.register(["json", "ExportJson"], cc._jsonLoader);
cc._imgLoader = {load: function (realUrl, url, res, cb) {
    cc.loader.cache[url] = cc.loader.loadImg(realUrl, function (err, img) {
        if (err)return cb(err);
        cc.textureCache.handleLoadedTexture(url);
        cb(null, img)
    })
}};
cc.loader.register(["png", "jpg", "bmp", "jpeg", "gif"], cc._imgLoader);
cc._serverImgLoader = {load: function (realUrl, url, res, cb) {
    cc.loader.cache[url] = cc.loader.loadImg(res.src, function (err, img) {
        if (err)return cb(err);
        cc.textureCache.handleLoadedTexture(url);
        cb(null, img)
    })
}};
cc.loader.register(["serverImg"], cc._serverImgLoader);
cc._plistLoader = {load: function (realUrl, url, res, cb) {
    cc.loader.loadTxt(realUrl, function (err, txt) {
        if (err)return cb(err);
        cb(null, cc.plistParser.parse(txt))
    })
}};
cc.loader.register(["plist"], cc._plistLoader);
cc._fontLoader = {TYPE: {"eot": "embedded-opentype", "ttf": "truetype", "woff": "woff", "svg": "svg"}, _loadFont: function (name, srcs, type) {
    var doc = document, path = cc.path, TYPE = this.TYPE, fontStyle = cc.newElement("style");
    fontStyle.type = "text/css";
    doc.body.appendChild(fontStyle);
    var fontStr = "@font-face { font-family:" + name + "; src:";
    if (srcs instanceof Array)for (var i = 0, li = srcs.length; i < li; i++) {
        var src = srcs[i];
        type = path.extname(src);
        fontStr += "url('" + srcs[i] + "') format('" + TYPE[type] + "')";
        fontStr += i == li - 1 ? ";" : ","
    } else fontStr +=
        "url('" + srcs + "') format('" + TYPE[type] + "');";
    fontStyle.textContent += fontStr + "};";
    var preloadDiv = cc.newElement("div");
    var _divStyle = preloadDiv.style;
    _divStyle.fontFamily = name;
    preloadDiv.innerHTML = ".";
    _divStyle.position = "absolute";
    _divStyle.left = "-100px";
    _divStyle.top = "-100px";
    doc.body.appendChild(preloadDiv)
}, load: function (realUrl, url, res, cb) {
    var self = this;
    var type = res.type, name = res.name, srcs = res.srcs;
    if (typeof res == "string") {
        type = cc.path.extname(res);
        name = cc.path.basename(res, type);
        self._loadFont(name,
            res, type)
    } else self._loadFont(name, srcs);
    cb(null, true)
}};
cc.loader.register(["font", "eot", "ttf", "woff", "svg"], cc._fontLoader);
cc._binaryLoader = {load: function (realUrl, url, res, cb) {
    cc.loader.loadBinary(realUrl, cb)
}};
cc.ENGINE_VERSION = "Cocos2d-html5-v3.0 alpha 2";
cc.FIX_ARTIFACTS_BY_STRECHING_TEXEL = 0;
cc.DIRECTOR_STATS_POSITION = cc.p(0, 0);
cc.DIRECTOR_FPS_INTERVAL = 0.5;
cc.COCOSNODE_RENDER_SUBPIXEL = 1;
cc.SPRITEBATCHNODE_RENDER_SUBPIXEL = 1;
cc.OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA = 0;
cc.TEXTURE_ATLAS_USE_TRIANGLE_STRIP = 0;
cc.TEXTURE_ATLAS_USE_VAO = 0;
cc.TEXTURE_NPOT_SUPPORT = 0;
cc.RETINA_DISPLAY_SUPPORT = 1;
cc.RETINA_DISPLAY_FILENAME_SUFFIX = "-hd";
cc.USE_LA88_LABELS = 1;
cc.SPRITE_DEBUG_DRAW = 0;
cc.SPRITEBATCHNODE_DEBUG_DRAW = 0;
cc.LABELBMFONT_DEBUG_DRAW = 0;
cc.LABELATLAS_DEBUG_DRAW = 0;
cc.IS_RETINA_DISPLAY_SUPPORTED = 1;
cc.DEFAULT_ENGINE = cc.ENGINE_VERSION + "-canvas";
cc.ENABLE_STACKABLE_ACTIONS = 1;
cc.ENABLE_GL_STATE_CACHE = 1;
cc.$ = function (x) {
    var parent = this == cc ? document : this;
    var el = x instanceof HTMLElement ? x : parent.querySelector(x);
    if (el) {
        el.find = el.find || cc.$;
        el.hasClass = el.hasClass || function (cls) {
            return this.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"))
        };
        el.addClass = el.addClass || function (cls) {
            if (!this.hasClass(cls)) {
                if (this.className)this.className += " ";
                this.className += cls
            }
            return this
        };
        el.removeClass = el.removeClass || function (cls) {
            if (this.hasClass(cls))this.className = this.className.replace(cls, "");
            return this
        };
        el.remove = el.remove || function () {
            if (this.parentNode)this.parentNode.removeChild(this);
            return this
        };
        el.appendTo = el.appendTo || function (x) {
            x.appendChild(this);
            return this
        };
        el.prependTo = el.prependTo || function (x) {
            x.childNodes[0] ? x.insertBefore(this, x.childNodes[0]) : x.appendChild(this);
            return this
        };
        el.transforms = el.transforms || function () {
            this.style[cc.$.trans] = cc.$.translate(this.position) + cc.$.rotate(this.rotation) + cc.$.scale(this.scale) + cc.$.skew(this.skew);
            return this
        };
        el.position = el.position || {x: 0, y: 0};
        el.rotation = el.rotation || 0;
        el.scale = el.scale || {x: 1, y: 1};
        el.skew = el.skew || {x: 0, y: 0};
        el.translates = function (x, y) {
            this.position.x = x;
            this.position.y = y;
            this.transforms();
            return this
        };
        el.rotate = function (x) {
            this.rotation = x;
            this.transforms();
            return this
        };
        el.resize = function (x, y) {
            this.scale.x = x;
            this.scale.y = y;
            this.transforms();
            return this
        };
        el.setSkew = function (x, y) {
            this.skew.x = x;
            this.skew.y = y;
            this.transforms();
            return this
        }
    }
    return el
};
switch (cc.sys.browserType) {
    case cc.sys.BROWSER_TYPE_FIREFOX:
        cc.$.pfx = "Moz";
        cc.$.hd = true;
        break;
    case cc.sys.BROWSER_TYPE_CHROME:
    case cc.sys.BROWSER_TYPE_SAFARI:
        cc.$.pfx = "webkit";
        cc.$.hd = true;
        break;
    case cc.sys.BROWSER_TYPE_OPERA:
        cc.$.pfx = "O";
        cc.$.hd = false;
        break;
    case cc.sys.BROWSER_TYPE_IE:
        cc.$.pfx = "ms";
        cc.$.hd = false;
        break;
    default:
        cc.$.pfx = "webkit";
        cc.$.hd = true
}
cc.$.trans = cc.$.pfx + "Transform";
cc.$.translate = cc.$.hd ? function (a) {
    return"translate3d(" + a.x + "px, " + a.y + "px, 0) "
} : function (a) {
    return"translate(" + a.x + "px, " + a.y + "px) "
};
cc.$.rotate = cc.$.hd ? function (a) {
    return"rotateZ(" + a + "deg) "
} : function (a) {
    return"rotate(" + a + "deg) "
};
cc.$.scale = function (a) {
    return"scale(" + a.x + ", " + a.y + ") "
};
cc.$.skew = function (a) {
    return"skewX(" + -a.x + "deg) skewY(" + a.y + "deg)"
};
cc.$new = function (x) {
    return cc.$(document.createElement(x))
};
cc.$.findpos = function (obj) {
    var curleft = 0;
    var curtop = 0;
    do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop
    } while (obj = obj.offsetParent);
    return{x: curleft, y: curtop}
};
cc.INVALID_INDEX = -1;
cc.PI = Math.PI;
cc.FLT_MAX = parseFloat("3.402823466e+38F");
cc.RAD = cc.PI / 180;
cc.DEG = 180 / cc.PI;
cc.UINT_MAX = 4294967295;
cc.swap = function (x, y, ref) {
    if (typeof ref == "object" && typeof ref.x != "undefined" && typeof ref.y != "undefined") {
        var tmp = ref[x];
        ref[x] = ref[y];
        ref[y] = tmp
    } else cc.log(cc._LogInfos.swap)
};
cc.lerp = function (a, b, r) {
    return a + (b - a) * r
};
cc.rand = function () {
    return Math.random() * 16777215
};
cc.randomMinus1To1 = function () {
    return(Math.random() - 0.5) * 2
};
cc.random0To1 = Math.random;
cc.degreesToRadians = function (angle) {
    return angle * cc.RAD
};
cc.radiansToDegress = function (angle) {
    return angle * cc.DEG
};
cc.REPEAT_FOREVER = Number.MAX_VALUE - 1;
cc.BLEND_SRC = cc.OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA ? 1 : 770;
cc.BLEND_DST = 771;
cc.nodeDrawSetup = function (node) {
    if (node._shaderProgram) {
        node._shaderProgram.use();
        node._shaderProgram.setUniformForModelViewAndProjectionMatrixWithMat4()
    }
};
cc.enableDefaultGLStates = function () {
};
cc.disableDefaultGLStates = function () {
};
cc.incrementGLDraws = function (addNumber) {
    cc.g_NumberOfDraws += addNumber
};
cc.FLT_EPSILON = 1.192092896E-7;
cc.contentScaleFactor = cc.IS_RETINA_DISPLAY_SUPPORTED ? function () {
    return cc.director.getContentScaleFactor()
} : function () {
    return 1
};
cc.pointPointsToPixels = function (points) {
    var scale = cc.contentScaleFactor();
    return cc.p(points.x * scale, points.y * scale)
};
cc.pointPixelsToPoints = function (pixels) {
    var scale = cc.contentScaleFactor();
    return cc.p(pixels.x / scale, pixels.y / scale)
};
cc._pointPixelsToPointsOut = function (pixels, outPoint) {
    var scale = cc.contentScaleFactor();
    outPoint.x = pixels.x / scale;
    outPoint.y = pixels.y / scale
};
cc.sizePointsToPixels = function (sizeInPoints) {
    var scale = cc.contentScaleFactor();
    return cc.size(sizeInPoints.width * scale, sizeInPoints.height * scale)
};
cc.sizePixelsToPoints = function (sizeInPixels) {
    var scale = cc.contentScaleFactor();
    return cc.size(sizeInPixels.width / scale, sizeInPixels.height / scale)
};
cc._sizePixelsToPointsOut = function (sizeInPixels, outSize) {
    var scale = cc.contentScaleFactor();
    outSize.width = sizeInPixels.width / scale;
    outSize.height = sizeInPixels.height / scale
};
cc.rectPixelsToPoints = cc.IS_RETINA_DISPLAY_SUPPORTED ? function (pixel) {
    var scale = cc.contentScaleFactor();
    return cc.rect(pixel.x / scale, pixel.y / scale, pixel.width / scale, pixel.height / scale)
} : function (p) {
    return p
};
cc.rectPointsToPixels = cc.IS_RETINA_DISPLAY_SUPPORTED ? function (point) {
    var scale = cc.contentScaleFactor();
    return cc.rect(point.x * scale, point.y * scale, point.width * scale, point.height * scale)
} : function (p) {
    return p
};
cc.ONE = 1;
cc.ZERO = 0;
cc.SRC_ALPHA = 770;
cc.SRC_ALPHA_SATURATE = 776;
cc.SRC_COLOR = 768;
cc.DST_ALPHA = 772;
cc.DST_COLOR = 774;
cc.ONE_MINUS_SRC_ALPHA = 771;
cc.ONE_MINUS_SRC_COLOR = 769;
cc.ONE_MINUS_DST_ALPHA = 773;
cc.ONE_MINUS_DST_COLOR = 775;
cc.ONE_MINUS_CONSTANT_ALPHA = 32772;
cc.ONE_MINUS_CONSTANT_COLOR = 32770;
cc.checkGLErrorDebug = function () {
    if (cc.renderMode == cc._RENDER_TYPE_WEBGL) {
        var _error = cc._renderContext.getError();
        if (_error)cc.log(CC._localZOrder.checkGLErrorDebug, _error)
    }
};
cc.DEVICE_ORIENTATION_PORTRAIT = 0;
cc.DEVICE_ORIENTATION_LANDSCAPE_LEFT = 1;
cc.DEVICE_ORIENTATION_PORTRAIT_UPSIDE_DOWN = 2;
cc.DEVICE_ORIENTATION_LANDSCAPE_RIGHT = 3;
cc.DEVICE_MAX_ORIENTATIONS = 2;
cc.VERTEX_ATTRIB_FLAG_NONE = 0;
cc.VERTEX_ATTRIB_FLAG_POSITION = 1 << 0;
cc.VERTEX_ATTRIB_FLAG_COLOR = 1 << 1;
cc.VERTEX_ATTRIB_FLAG_TEX_COORDS = 1 << 2;
cc.VERTEX_ATTRIB_FLAG_POS_COLOR_TEX = cc.VERTEX_ATTRIB_FLAG_POSITION | cc.VERTEX_ATTRIB_FLAG_COLOR | cc.VERTEX_ATTRIB_FLAG_TEX_COORDS;
cc.GL_ALL = 0;
cc.VERTEX_ATTRIB_POSITION = 0;
cc.VERTEX_ATTRIB_COLOR = 1;
cc.VERTEX_ATTRIB_TEX_COORDS = 2;
cc.VERTEX_ATTRIB_MAX = 3;
cc.UNIFORM_PMATRIX = 0;
cc.UNIFORM_MVMATRIX = 1;
cc.UNIFORM_MVPMATRIX = 2;
cc.UNIFORM_TIME = 3;
cc.UNIFORM_SINTIME = 4;
cc.UNIFORM_COSTIME = 5;
cc.UNIFORM_RANDOM01 = 6;
cc.UNIFORM_SAMPLER = 7;
cc.UNIFORM_MAX = 8;
cc.SHADER_POSITION_TEXTURECOLOR = "ShaderPositionTextureColor";
cc.SHADER_POSITION_TEXTURECOLORALPHATEST = "ShaderPositionTextureColorAlphaTest";
cc.SHADER_POSITION_COLOR = "ShaderPositionColor";
cc.SHADER_POSITION_TEXTURE = "ShaderPositionTexture";
cc.SHADER_POSITION_TEXTURE_UCOLOR = "ShaderPositionTexture_uColor";
cc.SHADER_POSITION_TEXTUREA8COLOR = "ShaderPositionTextureA8Color";
cc.SHADER_POSITION_UCOLOR = "ShaderPosition_uColor";
cc.SHADER_POSITION_LENGTHTEXTURECOLOR = "ShaderPositionLengthTextureColor";
cc.UNIFORM_PMATRIX_S = "CC_PMatrix";
cc.UNIFORM_MVMATRIX_S = "CC_MVMatrix";
cc.UNIFORM_MVPMATRIX_S = "CC_MVPMatrix";
cc.UNIFORM_TIME_S = "CC_Time";
cc.UNIFORM_SINTIME_S = "CC_SinTime";
cc.UNIFORM_COSTIME_S = "CC_CosTime";
cc.UNIFORM_RANDOM01_S = "CC_Random01";
cc.UNIFORM_SAMPLER_S = "CC_Texture0";
cc.UNIFORM_ALPHA_TEST_VALUE_S = "CC_alpha_value";
cc.ATTRIBUTE_NAME_COLOR = "a_color";
cc.ATTRIBUTE_NAME_POSITION = "a_position";
cc.ATTRIBUTE_NAME_TEX_COORD = "a_texCoord";
cc.ITEM_SIZE = 32;
cc.CURRENT_ITEM = 3233828865;
cc.ZOOM_ACTION_TAG = 3233828866;
cc.NORMAL_TAG = 8801;
cc.SELECTED_TAG = 8802;
cc.DISABLE_TAG = 8803;
_tmp.PrototypeColor = function () {
    var _p = cc.color;
    _p._getWhite = function () {
        return _p(255, 255, 255)
    };
    _p._getYellow = function () {
        return _p(255, 255, 0)
    };
    _p._getBlue = function () {
        return _p(0, 0, 255)
    };
    _p._getGreen = function () {
        return _p(0, 255, 0)
    };
    _p._getRed = function () {
        return _p(255, 0, 0)
    };
    _p._getMagenta = function () {
        return _p(255, 0, 255)
    };
    _p._getBlack = function () {
        return _p(0, 0, 0)
    };
    _p._getOrange = function () {
        return _p(255, 127, 0)
    };
    _p._getGray = function () {
        return _p(166, 166, 166)
    };
    _p.WHITE;
    cc.defineGetterSetter(_p, "WHITE", _p._getWhite);
    _p.YELLOW;
    cc.defineGetterSetter(_p, "YELLOW", _p._getYellow);
    _p.BLUE;
    cc.defineGetterSetter(_p, "BLUE", _p._getBlue);
    _p.GREEN;
    cc.defineGetterSetter(_p, "GREEN", _p._getGreen);
    _p.RED;
    cc.defineGetterSetter(_p, "RED", _p._getRed);
    _p.MAGENTA;
    cc.defineGetterSetter(_p, "MAGENTA", _p._getMagenta);
    _p.BLACK;
    cc.defineGetterSetter(_p, "BLACK", _p._getBlack);
    _p.ORANGE;
    cc.defineGetterSetter(_p, "ORANGE", _p._getOrange);
    _p.GRAY;
    cc.defineGetterSetter(_p, "GRAY", _p._getGray)
};
cc.Color = function (r, g, b, a) {
    this.r = r || 0;
    this.g = g || 0;
    this.b = b || 0;
    this.a = a || 0
};
cc.color = function (r, g, b, a) {
    if (r === undefined)return{r: 0, g: 0, b: 0, a: 255};
    if (typeof r === "string")return cc.hexToColor(r);
    if (typeof r === "object")return{r: r.r, g: r.g, b: r.b, a: r.a};
    return{r: r, g: g, b: b, a: a}
};
cc.colorEqual = function (color1, color2) {
    return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b
};
cc.Acceleration = function (x, y, z, timestamp) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.timestamp = timestamp || 0
};
cc.Vertex2F = function (x1, y1) {
    this.x = x1 || 0;
    this.y = y1 || 0
};
cc.vertex2 = function (x, y) {
    return new cc.Vertex2F(x, y)
};
cc.Vertex3F = function (x1, y1, z1) {
    this.x = x1 || 0;
    this.y = y1 || 0;
    this.z = z1 || 0
};
cc.vertex3 = function (x, y, z) {
    return new cc.Vertex3F(x, y, z)
};
cc.Tex2F = function (u1, v1) {
    this.u = u1 || 0;
    this.v = v1 || 0
};
cc.tex2 = function (u, v) {
    return new cc.Tex2F(u, v)
};
cc.BlendFunc = function (src1, dst1) {
    this.src = src1;
    this.dst = dst1
};
cc.blendFuncDisable = function () {
    return new cc.BlendFunc(cc.ONE, cc.ZERO)
};
cc.hexToColor = function (hex) {
    hex = hex.replace(/^#?/, "0x");
    var c = parseInt(hex);
    var r = c >> 16;
    var g = (c >> 8) % 256;
    var b = c % 256;
    return cc.color(r, g, b)
};
cc.colorToHex = function (color) {
    var hR = color.r.toString(16), hG = color.g.toString(16), hB = color.b.toString(16);
    return"#" + (color.r < 16 ? "0" + hR : hR) + (color.g < 16 ? "0" + hG : hG) + (color.b < 16 ? "0" + hB : hB)
};
cc.TEXT_ALIGNMENT_LEFT = 0;
cc.TEXT_ALIGNMENT_CENTER = 1;
cc.TEXT_ALIGNMENT_RIGHT = 2;
cc.VERTICAL_TEXT_ALIGNMENT_TOP = 0;
cc.VERTICAL_TEXT_ALIGNMENT_CENTER = 1;
cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM = 2;
cc._Dictionary = cc.Class.extend({_keyMapTb: null, _valueMapTb: null, __currId: 0, ctor: function () {
    this._keyMapTb = {};
    this._valueMapTb = {};
    this.__currId = 2 << (0 | Math.random() * 10)
}, __getKey: function () {
    this.__currId++;
    return"key_" + this.__currId
}, setObject: function (value, key) {
    if (key == null)return;
    var keyId = this.__getKey();
    this._keyMapTb[keyId] = key;
    this._valueMapTb[keyId] = value
}, objectForKey: function (key) {
    if (key == null)return null;
    var locKeyMapTb = this._keyMapTb;
    for (var keyId in locKeyMapTb)if (locKeyMapTb[keyId] === key)return this._valueMapTb[keyId];
    return null
}, valueForKey: function (key) {
    return this.objectForKey(key)
}, removeObjectForKey: function (key) {
    if (key == null)return;
    var locKeyMapTb = this._keyMapTb;
    for (var keyId in locKeyMapTb)if (locKeyMapTb[keyId] === key) {
        delete this._valueMapTb[keyId];
        delete locKeyMapTb[keyId];
        return
    }
}, removeObjectsForKeys: function (keys) {
    if (keys == null)return;
    for (var i = 0; i < keys.length; i++)this.removeObjectForKey(keys[i])
}, allKeys: function () {
    var keyArr = [], locKeyMapTb = this._keyMapTb;
    for (var key in locKeyMapTb)keyArr.push(locKeyMapTb[key]);
    return keyArr
}, removeAllObjects: function () {
    this._keyMapTb = {};
    this._valueMapTb = {}
}, count: function () {
    return this.allKeys().length
}});
cc.FontDefinition = function () {
    var _t = this;
    _t.fontName = "Arial";
    _t.fontSize = 12;
    _t.textAlign = cc.TEXT_ALIGNMENT_CENTER;
    _t.verticalAlign = cc.VERTICAL_TEXT_ALIGNMENT_TOP;
    _t.fillStyle = cc.color(255, 255, 255, 255);
    _t.boundingWidth = 0;
    _t.boundingHeight = 0;
    _t.strokeEnabled = false;
    _t.strokeStyle = cc.color(255, 255, 255, 255);
    _t.lineWidth = 1;
    _t.shadowEnabled = false;
    _t.shadowOffsetX = 0;
    _t.shadowOffsetY = 0;
    _t.shadowBlur = 0;
    _t.shadowOpacity = 1
};
if (cc._renderType === cc._RENDER_TYPE_WEBGL) {
    _tmp.WebGLColor();
    delete _tmp.WebGLColor
}
_tmp.PrototypeColor();
delete _tmp.PrototypeColor;
cc.Touches = [];
cc.TouchesIntergerDict = {};
cc.EGLView = cc.Class.extend({_delegate: null, _frameSize: null, _designResolutionSize: null, _originalDesignResolutionSize: null, _viewPortRect: null, _visibleRect: null, _retinaEnabled: false, _autoFullScreen: true, _devicePixelRatio: 1, _viewName: "", _resizeCallback: null, _scaleX: 1, _originalScaleX: 1, _scaleY: 1, _originalScaleY: 1, _indexBitsUsed: 0, _maxTouches: 5, _resolutionPolicy: null, _rpExactFit: null, _rpShowAll: null, _rpNoBorder: null, _rpFixedHeight: null, _rpFixedWidth: null, _initialized: false, _captured: false, _wnd: null, _hDC: null,
    _hRC: null, _supportTouch: false, _contentTranslateLeftTop: null, _frame: null, _frameZoomFactor: 1, __resizeWithBrowserSize: false, _isAdjustViewPort: true, ctor: function () {
        var _t = this, d = document, _strategyer = cc.ContainerStrategy, _strategy = cc.ContentStrategy;
        _t._frame = cc.container.parentNode === d.body ? d.documentElement : cc.container.parentNode;
        _t._frameSize = cc.size(0, 0);
        _t._initFrameSize();
        var w = cc._canvas.width, h = cc._canvas.height;
        _t._designResolutionSize = cc.size(w, h);
        _t._originalDesignResolutionSize = cc.size(w,
            h);
        _t._viewPortRect = cc.rect(0, 0, w, h);
        _t._visibleRect = cc.rect(0, 0, w, h);
        _t._contentTranslateLeftTop = {left: 0, top: 0};
        _t._viewName = "Cocos2dHTML5";
        var sys = cc.sys;
        _t.enableRetina(sys.os == sys.OS_IOS || sys.os == sys.OS_OSX);
        cc.visibleRect && cc.visibleRect.init(_t._designResolutionSize);
        _t._rpExactFit = new cc.ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.EXACT_FIT);
        _t._rpShowAll = new cc.ResolutionPolicy(_strategyer.PROPORTION_TO_FRAME, _strategy.SHOW_ALL);
        _t._rpNoBorder = new cc.ResolutionPolicy(_strategyer.EQUAL_TO_FRAME,
            _strategy.NO_BORDER);
        _t._rpFixedHeight = new cc.ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.FIXED_HEIGHT);
        _t._rpFixedWidth = new cc.ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.FIXED_WIDTH);
        _t._hDC = cc._canvas;
        _t._hRC = cc._renderContext
    }, _resizeEvent: function () {
        var width = this._originalDesignResolutionSize.width;
        var height = this._originalDesignResolutionSize.height;
        if (this._resizeCallback) {
            this._initFrameSize();
            this._resizeCallback.call()
        }
        if (width > 0)this.setDesignResolutionSize(width, height,
            this._resolutionPolicy)
    }, resizeWithBrowserSize: function (enabled) {
        var adjustSize, _t = this;
        if (enabled) {
            if (!_t.__resizeWithBrowserSize) {
                _t.__resizeWithBrowserSize = true;
                adjustSize = _t._resizeEvent.bind(_t);
                cc._addEventListener(window, "resize", adjustSize, false)
            }
        } else if (_t.__resizeWithBrowserSize) {
            _t.__resizeWithBrowserSize = true;
            adjustSize = _t._resizeEvent.bind(_t);
            window.removeEventListener("resize", adjustSize, false)
        }
    }, setResizeCallback: function (callback) {
        if (typeof callback == "function" || callback == null)this._resizeCallback =
            callback
    }, _initFrameSize: function () {
        var locFrameSize = this._frameSize;
        locFrameSize.width = this._frame.clientWidth;
        locFrameSize.height = this._frame.clientHeight
    }, _adjustSizeKeepCanvasSize: function () {
        var designWidth = this._originalDesignResolutionSize.width;
        var designHeight = this._originalDesignResolutionSize.height;
        if (designWidth > 0)this.setDesignResolutionSize(designWidth, designHeight, this._resolutionPolicy)
    }, _setViewPortMeta: function (width, height) {
        if (this._isAdjustViewPort) {
            var viewportMetas = {"user-scalable": "no",
                "maximum-scale": "1.0", "initial-scale": "1.0"}, elems = document.getElementsByName("viewport"), vp, content;
            if (elems.length == 0) {
                vp = cc.newElement("meta");
                vp.name = "viewport";
                vp.content = "";
                document.head.appendChild(vp)
            } else vp = elems[0];
            if (cc.sys.isMobile && cc.sys.browserType == cc.sys.BROWSER_TYPE_FIREFOX) {
                vp.content = "initial-scale:1";
                return
            }
            content = vp.content;
            for (var key in viewportMetas) {
                var pattern = new RegExp(key);
                if (!pattern.test(content))content += (content == "" ? "" : ",") + key + "\x3d" + viewportMetas[key]
            }
            vp.content =
                content
        }
    }, _setScaleXYForRenderTexture: function () {
        var scaleFactor = cc.contentScaleFactor();
        this._scaleX = scaleFactor;
        this._scaleY = scaleFactor
    }, _resetScale: function () {
        this._scaleX = this._originalScaleX;
        this._scaleY = this._originalScaleY
    }, _adjustSizeToBrowser: function () {
    }, initialize: function () {
        this._initialized = true
    }, adjustViewPort: function (enabled) {
        this._isAdjustViewPort = enabled
    }, enableRetina: function (enabled) {
        this._retinaEnabled = enabled ? true : false
    }, isRetinaEnabled: function () {
        return this._retinaEnabled
    },
    enableAutoFullScreen: function (enabled) {
        this._autoFullScreen = enabled ? true : false
    }, isAutoFullScreenEnabled: function () {
        return this._autoFullScreen
    }, end: function () {
    }, isOpenGLReady: function () {
        return this._hDC != null && this._hRC != null
    }, setFrameZoomFactor: function (zoomFactor) {
        this._frameZoomFactor = zoomFactor;
        this.centerWindow();
        cc.director.setProjection(cc.director.getProjection())
    }, swapBuffers: function () {
    }, setIMEKeyboardState: function (isOpen) {
    }, setContentTranslateLeftTop: function (offsetLeft, offsetTop) {
        this._contentTranslateLeftTop =
        {left: offsetLeft, top: offsetTop}
    }, getContentTranslateLeftTop: function () {
        return this._contentTranslateLeftTop
    }, getFrameSize: function () {
        return cc.size(this._frameSize.width, this._frameSize.height)
    }, setFrameSize: function (width, height) {
        this._frameSize.width = width;
        this._frameSize.height = height;
        this._frame.style.width = width + "px";
        this._frame.style.height = height + "px";
        this._resizeEvent();
        cc.director.setProjection(cc.director.getProjection())
    }, centerWindow: function () {
    }, getVisibleSize: function () {
        return cc.size(this._visibleRect.width,
            this._visibleRect.height)
    }, getVisibleOrigin: function () {
        return cc.p(this._visibleRect.x, this._visibleRect.y)
    }, canSetContentScaleFactor: function () {
        return true
    }, getResolutionPolicy: function () {
        return this._resolutionPolicy
    }, setResolutionPolicy: function (resolutionPolicy) {
        var _t = this;
        if (resolutionPolicy instanceof cc.ResolutionPolicy)_t._resolutionPolicy = resolutionPolicy; else {
            var _locPolicy = cc.ResolutionPolicy;
            if (resolutionPolicy === _locPolicy.EXACT_FIT)_t._resolutionPolicy = _t._rpExactFit;
            if (resolutionPolicy ===
                _locPolicy.SHOW_ALL)_t._resolutionPolicy = _t._rpShowAll;
            if (resolutionPolicy === _locPolicy.NO_BORDER)_t._resolutionPolicy = _t._rpNoBorder;
            if (resolutionPolicy === _locPolicy.FIXED_HEIGHT)_t._resolutionPolicy = _t._rpFixedHeight;
            if (resolutionPolicy === _locPolicy.FIXED_WIDTH)_t._resolutionPolicy = _t._rpFixedWidth
        }
    }, setDesignResolutionSize: function (width, height, resolutionPolicy) {
        if (isNaN(width) || width == 0 || isNaN(height) || height == 0) {
            cc.log(cc._LogInfos.EGLView_setDesignResolutionSize);
            return
        }
        var _t = this;
        _t.setResolutionPolicy(resolutionPolicy);
        var policy = _t._resolutionPolicy;
        if (policy)policy.preApply(_t); else {
            cc.log(cc._LogInfos.EGLView_setDesignResolutionSize_2);
            return
        }
        var frameW = _t._frameSize.width, frameH = _t._frameSize.height;
        if (cc.sys.isMobile)_t._setViewPortMeta(_t._frameSize.width, _t._frameSize.height);
        _t._initFrameSize();
        if (resolutionPolicy == _t._resolutionPolicy && width == _t._originalDesignResolutionSize.width && height == _t._originalDesignResolutionSize.height && frameW == _t._frameSize.width && frameH == _t._frameSize.height)return;
        _t._designResolutionSize =
            cc.size(width, height);
        _t._originalDesignResolutionSize = cc.size(width, height);
        var result = policy.apply(_t, _t._designResolutionSize);
        if (result.scale && result.scale.length == 2) {
            _t._scaleX = result.scale[0];
            _t._scaleY = result.scale[1]
        }
        if (result.viewport) {
            var vp = _t._viewPortRect = result.viewport, visible = _t._visibleRect;
            visible.width = cc._canvas.width / _t._scaleX;
            visible.height = cc._canvas.height / _t._scaleY;
            visible.x = -vp.x / _t._scaleX;
            visible.y = -vp.y / _t._scaleY
        }
        var director = cc.director;
        cc.winSize.width = director._winSizeInPoints.width =
            _t._visibleRect.width;
        cc.winSize.height = director._winSizeInPoints.height = _t._visibleRect.height;
        policy.postApply(_t);
        if (cc._renderType == cc._RENDER_TYPE_WEBGL) {
            director._createStatsLabel();
            director.setGLDefaultValues()
        }
        _t._originalScaleX = _t._scaleX;
        _t._originalScaleY = _t._scaleY;
        if (cc.DOM)cc.DOM._resetEGLViewDiv();
        cc.visibleRect && cc.visibleRect.init(_t.getVisibleSize())
    }, getDesignResolutionSize: function () {
        return cc.size(this._designResolutionSize.width, this._designResolutionSize.height)
    }, setViewPortInPoints: function (x, y, w, h) {
        var locFrameZoomFactor = this._frameZoomFactor, locScaleX = this._scaleX, locScaleY = this._scaleY;
        cc._renderContext.viewport(x * locScaleX * locFrameZoomFactor + this._viewPortRect.x * locFrameZoomFactor, y * locScaleY * locFrameZoomFactor + this._viewPortRect.y * locFrameZoomFactor, w * locScaleX * locFrameZoomFactor, h * locScaleY * locFrameZoomFactor)
    }, setScissorInPoints: function (x, y, w, h) {
        var locFrameZoomFactor = this._frameZoomFactor, locScaleX = this._scaleX, locScaleY = this._scaleY;
        cc._renderContext.scissor(x * locScaleX * locFrameZoomFactor +
            this._viewPortRect.x * locFrameZoomFactor, y * locScaleY * locFrameZoomFactor + this._viewPortRect.y * locFrameZoomFactor, w * locScaleX * locFrameZoomFactor, h * locScaleY * locFrameZoomFactor)
    }, isScissorEnabled: function () {
        var gl = cc._renderContext;
        return gl.isEnabled(gl.SCISSOR_TEST)
    }, getScissorRect: function () {
        var gl = cc._renderContext, scaleX = this._scaleX, scaleY = this._scaleY;
        var boxArr = gl.getParameter(gl.SCISSOR_BOX);
        return cc.rect((boxArr[0] - this._viewPortRect.x) / scaleX, (boxArr[1] - this._viewPortRect.y) / scaleY, boxArr[2] /
            scaleX, boxArr[3] / scaleY)
    }, setViewName: function (viewName) {
        if (viewName != null && viewName.length > 0)this._viewName = viewName
    }, getViewName: function () {
        return this._viewName
    }, getViewPortRect: function () {
        return this._viewPortRect
    }, getScaleX: function () {
        return this._scaleX
    }, getScaleY: function () {
        return this._scaleY
    }, getDevicePixelRatio: function () {
        return this._devicePixelRatio
    }, convertToLocationInView: function (tx, ty, relatedPos) {
        return{x: this._devicePixelRatio * (tx - relatedPos.left), y: this._devicePixelRatio * (relatedPos.top +
            relatedPos.height - ty)}
    }, _convertMouseToLocationInView: function (point, relatedPos) {
        var locViewPortRect = this._viewPortRect, _t = this;
        point.x = (_t._devicePixelRatio * (point.x - relatedPos.left) - locViewPortRect.x) / _t._scaleX;
        point.y = (_t._devicePixelRatio * (relatedPos.top + relatedPos.height - point.y) - locViewPortRect.y) / _t._scaleY
    }, _convertTouchesWithScale: function (touches) {
        var locViewPortRect = this._viewPortRect, locScaleX = this._scaleX, locScaleY = this._scaleY, selTouch, selPoint, selPrePoint;
        for (var i = 0; i < touches.length; i++) {
            selTouch =
                touches[i];
            selPoint = selTouch._point;
            selPrePoint = selTouch._prevPoint;
            selTouch._setPoint((selPoint.x - locViewPortRect.x) / locScaleX, (selPoint.y - locViewPortRect.y) / locScaleY);
            selTouch._setPrevPoint((selPrePoint.x - locViewPortRect.x) / locScaleX, (selPrePoint.y - locViewPortRect.y) / locScaleY)
        }
    }});
cc.EGLView._getInstance = function () {
    if (!this._instance) {
        this._instance = this._instance || new cc.EGLView;
        this._instance.initialize()
    }
    return this._instance
};
cc.ContainerStrategy = cc.Class.extend({preApply: function (view) {
}, apply: function (view, designedResolution) {
}, postApply: function (view) {
}, _setupContainer: function (view, w, h) {
    var frame = view._frame;
    if (this._autoFullScreen && cc.sys.isMobile && frame == document.documentElement)cc.screen.autoFullScreen(frame);
    var locCanvasElement = cc._canvas, locContainer = cc.container;
    locContainer.style.width = locCanvasElement.style.width = w + "px";
    locContainer.style.height = locCanvasElement.style.height = h + "px";
    var devicePixelRatio = view._devicePixelRatio =
        1;
    if (view.isRetinaEnabled())devicePixelRatio = view._devicePixelRatio = window.devicePixelRatio || 1;
    locCanvasElement.width = w * devicePixelRatio;
    locCanvasElement.height = h * devicePixelRatio;
    var body = document.body, style;
    if (body && (style = body.style)) {
        style.paddingTop = style.paddingTop || "0px";
        style.paddingRight = style.paddingRight || "0px";
        style.paddingBottom = style.paddingBottom || "0px";
        style.paddingLeft = style.paddingLeft || "0px";
        style.borderTop = style.borderTop || "0px";
        style.borderRight = style.borderRight || "0px";
        style.borderBottom =
            style.borderBottom || "0px";
        style.borderLeft = style.borderLeft || "0px";
        style.marginTop = style.marginTop || "0px";
        style.marginRight = style.marginRight || "0px";
        style.marginBottom = style.marginBottom || "0px";
        style.marginLeft = style.marginLeft || "0px"
    }
}, _fixContainer: function () {
    document.body.insertBefore(cc.container, document.body.firstChild);
    var bs = document.body.style;
    bs.width = window.innerWidth + "px";
    bs.height = window.innerHeight + "px";
    bs.overflow = "hidden";
    var contStyle = cc.container.style;
    contStyle.position = "fixed";
    contStyle.left = contStyle.top = "0px";
    document.body.scrollTop = 0
}});
cc.ContentStrategy = cc.Class.extend({_result: {scale: [1, 1], viewport: null}, _buildResult: function (containerW, containerH, contentW, contentH, scaleX, scaleY) {
    Math.abs(containerW - contentW) < 2 && (contentW = containerW);
    Math.abs(containerH - contentH) < 2 && (contentH = containerH);
    var viewport = cc.rect(Math.round((containerW - contentW) / 2), Math.round((containerH - contentH) / 2), contentW, contentH);
    if (cc._renderType == cc._RENDER_TYPE_CANVAS)cc._renderContext.translate(viewport.x, viewport.y + contentH);
    this._result.scale = [scaleX, scaleY];
    this._result.viewport = viewport;
    return this._result
}, preApply: function (view) {
}, apply: function (view, designedResolution) {
    return{"scale": [1, 1]}
}, postApply: function (view) {
}});
(function () {
    var EqualToFrame = cc.ContainerStrategy.extend({apply: function (view) {
        this._setupContainer(view, view._frameSize.width, view._frameSize.height)
    }});
    var ProportionalToFrame = cc.ContainerStrategy.extend({apply: function (view, designedResolution) {
        var frameW = view._frameSize.width, frameH = view._frameSize.height, containerStyle = cc.container.style, designW = designedResolution.width, designH = designedResolution.height, scaleX = frameW / designW, scaleY = frameH / designH, containerW, containerH;
        scaleX < scaleY ? (containerW =
            frameW, containerH = designH * scaleX) : (containerW = designW * scaleY, containerH = frameH);
        var offx = Math.round((frameW - containerW) / 2);
        var offy = Math.round((frameH - containerH) / 2);
        containerW = frameW - 2 * offx;
        containerH = frameH - 2 * offy;
        this._setupContainer(view, containerW, containerH);
        containerStyle.marginLeft = offx + "px";
        containerStyle.marginRight = offx + "px";
        containerStyle.marginTop = offy + "px";
        containerStyle.marginBottom = offy + "px"
    }});
    var EqualToWindow = EqualToFrame.extend({preApply: function (view) {
        this._super(view);
        view._frame =
            document.documentElement
    }, apply: function (view) {
        this._super(view);
        this._fixContainer()
    }});
    var ProportionalToWindow = ProportionalToFrame.extend({preApply: function (view) {
        this._super(view);
        view._frame = document.documentElement
    }, apply: function (view, designedResolution) {
        this._super(view, designedResolution);
        this._fixContainer()
    }});
    var OriginalContainer = cc.ContainerStrategy.extend({apply: function (view) {
        this._setupContainer(view, cc._canvas.width, cc._canvas.height)
    }});
    cc.ContainerStrategy.EQUAL_TO_FRAME = new EqualToFrame;
    cc.ContainerStrategy.PROPORTION_TO_FRAME = new ProportionalToFrame;
    cc.ContainerStrategy.ORIGINAL_CONTAINER = new OriginalContainer;
    var ExactFit = cc.ContentStrategy.extend({apply: function (view, designedResolution) {
        var containerW = cc._canvas.width, containerH = cc._canvas.height, scaleX = containerW / designedResolution.width, scaleY = containerH / designedResolution.height;
        return this._buildResult(containerW, containerH, containerW, containerH, scaleX, scaleY)
    }});
    var ShowAll = cc.ContentStrategy.extend({apply: function (view, designedResolution) {
        var containerW = cc._canvas.width, containerH = cc._canvas.height, designW = designedResolution.width, designH = designedResolution.height, scaleX = containerW / designW, scaleY = containerH / designH, scale = 0, contentW, contentH;
        scaleX < scaleY ? (scale = scaleX, contentW = containerW, contentH = designH * scale) : (scale = scaleY, contentW = designW * scale, contentH = containerH);
        return this._buildResult(containerW, containerH, contentW, contentH, scale, scale)
    }});
    var NoBorder = cc.ContentStrategy.extend({apply: function (view, designedResolution) {
        var containerW =
            cc._canvas.width, containerH = cc._canvas.height, designW = designedResolution.width, designH = designedResolution.height, scaleX = containerW / designW, scaleY = containerH / designH, scale, contentW, contentH;
        scaleX < scaleY ? (scale = scaleY, contentW = designW * scale, contentH = containerH) : (scale = scaleX, contentW = containerW, contentH = designH * scale);
        return this._buildResult(containerW, containerH, contentW, contentH, scale, scale)
    }});
    var FixedHeight = cc.ContentStrategy.extend({apply: function (view, designedResolution) {
        var containerW = cc._canvas.width,
            containerH = cc._canvas.height, designH = designedResolution.height, scale = containerH / designH, contentW = containerW, contentH = containerH;
        return this._buildResult(containerW, containerH, contentW, contentH, scale, scale)
    }, postApply: function (view) {
        cc.director._winSizeInPoints = view.getVisibleSize()
    }});
    var FixedWidth = cc.ContentStrategy.extend({apply: function (view, designedResolution) {
        var containerW = cc._canvas.width, containerH = cc._canvas.height, designW = designedResolution.width, scale = containerW / designW, contentW = containerW,
            contentH = containerH;
        return this._buildResult(containerW, containerH, contentW, contentH, scale, scale)
    }, postApply: function (view) {
        cc.director._winSizeInPoints = view.getVisibleSize()
    }});
    cc.ContentStrategy.EXACT_FIT = new ExactFit;
    cc.ContentStrategy.SHOW_ALL = new ShowAll;
    cc.ContentStrategy.NO_BORDER = new NoBorder;
    cc.ContentStrategy.FIXED_HEIGHT = new FixedHeight;
    cc.ContentStrategy.FIXED_WIDTH = new FixedWidth
})();
cc.ResolutionPolicy = cc.Class.extend({_containerStrategy: null, _contentStrategy: null, ctor: function (containerStg, contentStg) {
    this.setContainerStrategy(containerStg);
    this.setContentStrategy(contentStg)
}, preApply: function (view) {
    this._containerStrategy.preApply(view);
    this._contentStrategy.preApply(view)
}, apply: function (view, designedResolution) {
    this._containerStrategy.apply(view, designedResolution);
    return this._contentStrategy.apply(view, designedResolution)
}, postApply: function (view) {
    this._containerStrategy.postApply(view);
    this._contentStrategy.postApply(view)
}, setContainerStrategy: function (containerStg) {
    if (containerStg instanceof cc.ContainerStrategy)this._containerStrategy = containerStg
}, setContentStrategy: function (contentStg) {
    if (contentStg instanceof cc.ContentStrategy)this._contentStrategy = contentStg
}});
cc.ResolutionPolicy.EXACT_FIT = 0;
cc.ResolutionPolicy.NO_BORDER = 1;
cc.ResolutionPolicy.SHOW_ALL = 2;
cc.ResolutionPolicy.FIXED_HEIGHT = 3;
cc.ResolutionPolicy.FIXED_WIDTH = 4;
cc.ResolutionPolicy.UNKNOWN = 5;
cc.UIInterfaceOrientationLandscapeLeft = -90;
cc.UIInterfaceOrientationLandscapeRight = 90;
cc.UIInterfaceOrientationPortraitUpsideDown = 180;
cc.UIInterfaceOrientationPortrait = 0;
cc.inputManager = {_mousePressed: false, _isRegisterEvent: false, _preTouchPoint: cc.p(0, 0), _prevMousePoint: cc.p(0, 0), _preTouchPool: [], _preTouchPoolPointer: 0, _touches: [], _touchesIntegerDict: {}, _indexBitsUsed: 0, _maxTouches: 5, _accelEnabled: false, _accelInterval: 1 / 30, _accelMinus: 1, _accelCurTime: 0, _acceleration: null, _accelDeviceEvent: null, _getUnUsedIndex: function () {
    var temp = this._indexBitsUsed;
    for (var i = 0; i < this._maxTouches; i++) {
        if (!(temp & 1)) {
            this._indexBitsUsed |= 1 << i;
            return i
        }
        temp >>= 1
    }
    return-1
}, _removeUsedIndexBit: function (index) {
    if (index <
        0 || index >= this._maxTouches)return;
    var temp = 1 << index;
    temp = ~temp;
    this._indexBitsUsed &= temp
}, _glView: null, handleTouchesBegin: function (touches) {
    var selTouch, index, curTouch, touchID, handleTouches = [], locTouchIntDict = this._touchesIntegerDict;
    for (var i = 0, len = touches.length; i < len; i++) {
        selTouch = touches[i];
        touchID = selTouch.getID();
        index = locTouchIntDict[touchID];
        if (index == null) {
            var unusedIndex = this._getUnUsedIndex();
            if (unusedIndex == -1) {
                cc.log(cc._LogInfos.inputManager_handleTouchesBegin, unusedIndex);
                continue
            }
            curTouch =
                this._touches[unusedIndex] = selTouch;
            locTouchIntDict[touchID] = unusedIndex;
            handleTouches.push(curTouch)
        }
    }
    if (handleTouches.length > 0) {
        this._glView._convertTouchesWithScale(handleTouches);
        var touchEvent = new cc.EventTouch(handleTouches);
        touchEvent._eventCode = cc.EventTouch.EventCode.BEGAN;
        cc.eventManager.dispatchEvent(touchEvent)
    }
}, handleTouchesMove: function (touches) {
    var selTouch, index, touchID, handleTouches = [], locTouches = this._touches;
    for (var i = 0, len = touches.length; i < len; i++) {
        selTouch = touches[i];
        touchID =
            selTouch.getID();
        index = this._touchesIntegerDict[touchID];
        if (index == null)continue;
        if (locTouches[index]) {
            locTouches[index]._setPoint(selTouch._point);
            locTouches[index]._setPrevPoint(selTouch._prevPoint);
            handleTouches.push(locTouches[index])
        }
    }
    if (handleTouches.length > 0) {
        this._glView._convertTouchesWithScale(handleTouches);
        var touchEvent = new cc.EventTouch(handleTouches);
        touchEvent._eventCode = cc.EventTouch.EventCode.MOVED;
        cc.eventManager.dispatchEvent(touchEvent)
    }
}, handleTouchesEnd: function (touches) {
    var handleTouches =
        this.getSetOfTouchesEndOrCancel(touches);
    if (handleTouches.length > 0) {
        this._glView._convertTouchesWithScale(handleTouches);
        var touchEvent = new cc.EventTouch(handleTouches);
        touchEvent._eventCode = cc.EventTouch.EventCode.ENDED;
        cc.eventManager.dispatchEvent(touchEvent)
    }
}, handleTouchesCancel: function (touches) {
    var handleTouches = this.getSetOfTouchesEndOrCancel(touches);
    if (handleTouches.length > 0) {
        this._glView._convertTouchesWithScale(handleTouches);
        var touchEvent = new cc.EventTouch(handleTouches);
        touchEvent._eventCode =
            cc.EventTouch.EventCode.CANCELLED;
        cc.eventManager.dispatchEvent(touchEvent)
    }
}, getSetOfTouchesEndOrCancel: function (touches) {
    var selTouch, index, touchID, handleTouches = [], locTouches = this._touches, locTouchesIntDict = this._touchesIntegerDict;
    for (var i = 0, len = touches.length; i < len; i++) {
        selTouch = touches[i];
        touchID = selTouch.getID();
        index = locTouchesIntDict[touchID];
        if (index == null)continue;
        if (locTouches[index]) {
            locTouches[index]._setPoint(selTouch._point);
            locTouches[index]._setPrevPoint(selTouch._prevPoint);
            handleTouches.push(locTouches[index]);
            this._removeUsedIndexBit(index);
            delete locTouchesIntDict[touchID]
        }
    }
    return handleTouches
}, getHTMLElementPosition: function (element) {
    var docElem = document.documentElement;
    var win = window;
    var box = null;
    if (typeof element.getBoundingClientRect === "function")box = element.getBoundingClientRect(); else if (element instanceof HTMLCanvasElement)box = {left: 0, top: 0, width: element.width, height: element.height}; else box = {left: 0, top: 0, width: parseInt(element.style.width), height: parseInt(element.style.height)};
    return{left: box.left +
        win.pageXOffset - docElem.clientLeft, top: box.top + win.pageYOffset - docElem.clientTop, width: box.width, height: box.height}
}, getPreTouch: function (touch) {
    var preTouch = null;
    var locPreTouchPool = this._preTouchPool;
    var id = touch.getId();
    for (var i = locPreTouchPool.length - 1; i >= 0; i--)if (locPreTouchPool[i].getId() == id) {
        preTouch = locPreTouchPool[i];
        break
    }
    if (!preTouch)preTouch = touch;
    return preTouch
}, setPreTouch: function (touch) {
    var find = false;
    var locPreTouchPool = this._preTouchPool;
    var id = touch.getId();
    for (var i = locPreTouchPool.length -
        1; i >= 0; i--)if (locPreTouchPool[i].getId() == id) {
        locPreTouchPool[i] = touch;
        find = true;
        break
    }
    if (!find)if (locPreTouchPool.length <= 50)locPreTouchPool.push(touch); else {
        locPreTouchPool[this._preTouchPoolPointer] = touch;
        this._preTouchPoolPointer = (this._preTouchPoolPointer + 1) % 50
    }
}, getTouchByXY: function (tx, ty, pos) {
    var locPreTouch = this._preTouchPoint;
    var location = this._glView.convertToLocationInView(tx, ty, pos);
    var touch = new cc.Touch(location.x, location.y);
    touch._setPrevPoint(locPreTouch.x, locPreTouch.y);
    locPreTouch.x =
        location.x;
    locPreTouch.y = location.y;
    return touch
}, getMouseEvent: function (location, pos, eventType) {
    var locPreMouse = this._prevMousePoint;
    this._glView._convertMouseToLocationInView(location, pos);
    var mouseEvent = new cc.EventMouse(eventType);
    mouseEvent.setLocation(location.x, location.y);
    mouseEvent._setPrevCursor(locPreMouse.x, locPreMouse.y);
    locPreMouse.x = location.x;
    locPreMouse.y = location.y;
    return mouseEvent
}, getPointByEvent: function (event, pos) {
    if (event.pageX != null)return{x: event.pageX, y: event.pageY};
    pos.left -=
        document.body.scrollLeft;
    pos.top -= document.body.scrollTop;
    return{x: event.clientX, y: event.clientY}
}, getTouchesByEvent: function (event, pos) {
    var touchArr = [], locView = this._glView;
    var touch_event, touch, preLocation;
    var locPreTouch = this._preTouchPoint;
    var length = event.changedTouches.length;
    for (var i = 0; i < length; i++) {
        touch_event = event.changedTouches[i];
        if (touch_event) {
            var location;
            if (cc.sys.BROWSER_TYPE_FIREFOX === cc.sys.browserType)location = locView.convertToLocationInView(touch_event.pageX, touch_event.pageY,
                pos); else location = locView.convertToLocationInView(touch_event.clientX, touch_event.clientY, pos);
            if (touch_event.identifier != null) {
                touch = new cc.Touch(location.x, location.y, touch_event.identifier);
                preLocation = this.getPreTouch(touch).getLocation();
                touch._setPrevPoint(preLocation.x, preLocation.y);
                this.setPreTouch(touch)
            } else {
                touch = new cc.Touch(location.x, location.y);
                touch._setPrevPoint(locPreTouch.x, locPreTouch.y)
            }
            locPreTouch.x = location.x;
            locPreTouch.y = location.y;
            touchArr.push(touch)
        }
    }
    return touchArr
},
    registerSystemEvent: function (element) {
        if (this._isRegisterEvent)return;
        var locView = this._glView = cc.view;
        var selfPointer = this;
        var supportMouse = "mouse"in cc.sys.capabilities, supportTouches = "touches"in cc.sys.capabilities;
        if (supportMouse) {
            cc._addEventListener(window, "mousedown", function () {
                selfPointer._mousePressed = true
            }, false);
            cc._addEventListener(window, "mouseup", function (event) {
                var savePressed = selfPointer._mousePressed;
                selfPointer._mousePressed = false;
                if (!savePressed)return;
                var pos = selfPointer.getHTMLElementPosition(element);
                var location = selfPointer.getPointByEvent(event, pos);
                if (!cc.rectContainsPoint(new cc.Rect(pos.left, pos.top, pos.width, pos.height), location)) {
                    if (!supportTouches)selfPointer.handleTouchesEnd([selfPointer.getTouchByXY(location.x, location.y, pos)]);
                    var mouseEvent = selfPointer.getMouseEvent(location, pos, cc.EventMouse.UP);
                    mouseEvent.setButton(event.button);
                    cc.eventManager.dispatchEvent(mouseEvent)
                }
            }, false);
            cc._addEventListener(element, "mousedown", function (event) {
                selfPointer._mousePressed = true;
                var pos = selfPointer.getHTMLElementPosition(element);
                var location = selfPointer.getPointByEvent(event, pos);
                if (!supportTouches)selfPointer.handleTouchesBegin([selfPointer.getTouchByXY(location.x, location.y, pos)]);
                var mouseEvent = selfPointer.getMouseEvent(location, pos, cc.EventMouse.DOWN);
                mouseEvent.setButton(event.button);
                cc.eventManager.dispatchEvent(mouseEvent);
                event.stopPropagation();
                event.preventDefault()
            }, false);
            cc._addEventListener(element, "mouseup", function (event) {
                selfPointer._mousePressed = false;
                var pos = selfPointer.getHTMLElementPosition(element);
                var location = selfPointer.getPointByEvent(event, pos);
                if (!supportTouches)selfPointer.handleTouchesEnd([selfPointer.getTouchByXY(location.x, location.y, pos)]);
                var mouseEvent = selfPointer.getMouseEvent(location, pos, cc.EventMouse.UP);
                mouseEvent.setButton(event.button);
                cc.eventManager.dispatchEvent(mouseEvent);
                event.stopPropagation();
                event.preventDefault()
            }, false);
            cc._addEventListener(element, "mousemove", function (event) {
                var pos = selfPointer.getHTMLElementPosition(element);
                var location = selfPointer.getPointByEvent(event,
                    pos);
                if (!supportTouches)selfPointer.handleTouchesMove([selfPointer.getTouchByXY(location.x, location.y, pos)]);
                var mouseEvent = selfPointer.getMouseEvent(location, pos, cc.EventMouse.MOVE);
                if (selfPointer._mousePressed)mouseEvent.setButton(event.button); else mouseEvent.setButton(null);
                cc.eventManager.dispatchEvent(mouseEvent);
                event.stopPropagation();
                event.preventDefault()
            }, false);
            cc._addEventListener(element, "mousewheel", function (event) {
                var pos = selfPointer.getHTMLElementPosition(element);
                var location = selfPointer.getPointByEvent(event,
                    pos);
                var mouseEvent = selfPointer.getMouseEvent(location, pos, cc.EventMouse.SCROLL);
                mouseEvent.setButton(event.button);
                mouseEvent.setScrollData(0, event.wheelDelta);
                cc.eventManager.dispatchEvent(mouseEvent);
                event.stopPropagation();
                event.preventDefault()
            }, false);
            cc._addEventListener(element, "DOMMouseScroll", function (event) {
                var pos = selfPointer.getHTMLElementPosition(element);
                var location = selfPointer.getPointByEvent(event, pos);
                var mouseEvent = selfPointer.getMouseEvent(location, pos, cc.EventMouse.SCROLL);
                mouseEvent.setButton(event.button);
                mouseEvent.setScrollData(0, event.detail * -120);
                cc.eventManager.dispatchEvent(mouseEvent);
                event.stopPropagation();
                event.preventDefault()
            }, false)
        }
        if (window.navigator.msPointerEnabled) {
            var _pointerEventsMap = {"MSPointerDown": selfPointer.handleTouchesBegin, "MSPointerMove": selfPointer.handleTouchesMove, "MSPointerUp": selfPointer.handleTouchesEnd, "MSPointerCancel": selfPointer.handleTouchesCancel};
            for (var eventName in _pointerEventsMap)(function (_pointerEvent, _touchEvent) {
                cc._addEventListener(element, _pointerEvent,
                    function (event) {
                        var pos = selfPointer.getHTMLElementPosition(element);
                        pos.left -= document.documentElement.scrollLeft;
                        pos.top -= document.documentElement.scrollTop;
                        _touchEvent.call(selfPointer, [selfPointer.getTouchByXY(event.clientX, event.clientY, pos)]);
                        event.stopPropagation();
                        event.preventDefault()
                    }, false)
            })(eventName, _pointerEventsMap[eventName])
        }
        if (supportTouches) {
            cc._addEventListener(element, "touchstart", function (event) {
                if (!event.changedTouches)return;
                var pos = selfPointer.getHTMLElementPosition(element);
                pos.left -= document.body.scrollLeft;
                pos.top -= document.body.scrollTop;
                selfPointer.handleTouchesBegin(selfPointer.getTouchesByEvent(event, pos));
                event.stopPropagation();
                event.preventDefault()
            }, false);
            cc._addEventListener(element, "touchmove", function (event) {
                if (!event.changedTouches)return;
                var pos = selfPointer.getHTMLElementPosition(element);
                pos.left -= document.body.scrollLeft;
                pos.top -= document.body.scrollTop;
                selfPointer.handleTouchesMove(selfPointer.getTouchesByEvent(event, pos));
                event.stopPropagation();
                event.preventDefault()
            }, false);
            cc._addEventListener(element, "touchend", function (event) {
                if (!event.changedTouches)return;
                var pos = selfPointer.getHTMLElementPosition(element);
                pos.left -= document.body.scrollLeft;
                pos.top -= document.body.scrollTop;
                selfPointer.handleTouchesEnd(selfPointer.getTouchesByEvent(event, pos));
                event.stopPropagation();
                event.preventDefault()
            }, false);
            cc._addEventListener(element, "touchcancel", function (event) {
                if (!event.changedTouches)return;
                var pos = selfPointer.getHTMLElementPosition(element);
                pos.left -= document.body.scrollLeft;
                pos.top -= document.body.scrollTop;
                locView.handleTouchesCancel(selfPointer.getTouchesByEvent(event, pos));
                event.stopPropagation();
                event.preventDefault()
            }, false)
        }
        this._registerKeyboardEvent();
        this._registerAccelerometerEvent();
        this._isRegisterEvent = true
    }, _registerKeyboardEvent: function () {
    }, _registerAccelerometerEvent: function () {
    }, update: function (dt) {
        if (this._accelCurTime > this._accelInterval) {
            this._accelCurTime -= this._accelInterval;
            cc.eventManager.dispatchEvent(new cc.EventAcceleration(this._acceleration))
        }
        this._accelCurTime +=
            dt
    }};
cc.AffineTransform = function (a, b, c, d, tx, ty) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty
};
cc.AffineTransformMake = function (a, b, c, d, tx, ty) {
    return{a: a, b: b, c: c, d: d, tx: tx, ty: ty}
};
cc.PointApplyAffineTransform = function (point, t) {
    return{x: t.a * point.x + t.c * point.y + t.tx, y: t.b * point.x + t.d * point.y + t.ty}
};
cc._PointApplyAffineTransform = function (x, y, t) {
    return{x: t.a * x + t.c * y + t.tx, y: t.b * x + t.d * y + t.ty}
};
cc.SizeApplyAffineTransform = function (size, t) {
    return{width: t.a * size.width + t.c * size.height, height: t.b * size.width + t.d * size.height}
};
cc.AffineTransformMakeIdentity = function () {
    return{a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0}
};
cc.AffineTransformIdentity = function () {
    return{a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0}
};
cc.RectApplyAffineTransform = function (rect, anAffineTransform) {
    var top = cc.rectGetMinY(rect);
    var left = cc.rectGetMinX(rect);
    var right = cc.rectGetMaxX(rect);
    var bottom = cc.rectGetMaxY(rect);
    var topLeft = cc._PointApplyAffineTransform(left, top, anAffineTransform);
    var topRight = cc._PointApplyAffineTransform(right, top, anAffineTransform);
    var bottomLeft = cc._PointApplyAffineTransform(left, bottom, anAffineTransform);
    var bottomRight = cc._PointApplyAffineTransform(right, bottom, anAffineTransform);
    var minX = Math.min(topLeft.x,
        topRight.x, bottomLeft.x, bottomRight.x);
    var maxX = Math.max(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
    var minY = Math.min(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);
    var maxY = Math.max(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);
    return cc.rect(minX, minY, maxX - minX, maxY - minY)
};
cc._RectApplyAffineTransformIn = function (rect, anAffineTransform) {
    var top = cc.rectGetMinY(rect);
    var left = cc.rectGetMinX(rect);
    var right = cc.rectGetMaxX(rect);
    var bottom = cc.rectGetMaxY(rect);
    var topLeft = cc._PointApplyAffineTransform(left, top, anAffineTransform);
    var topRight = cc._PointApplyAffineTransform(right, top, anAffineTransform);
    var bottomLeft = cc._PointApplyAffineTransform(left, bottom, anAffineTransform);
    var bottomRight = cc._PointApplyAffineTransform(right, bottom, anAffineTransform);
    var minX = Math.min(topLeft.x,
        topRight.x, bottomLeft.x, bottomRight.x);
    var maxX = Math.max(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
    var minY = Math.min(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);
    var maxY = Math.max(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);
    rect.x = minX;
    rect.y = minY;
    rect.width = maxX - minX;
    rect.height = maxY - minY;
    return rect
};
cc.AffineTransformTranslate = function (t, tx, ty) {
    return{a: t.a, b: t.b, c: t.c, d: t.d, tx: t.tx + t.a * tx + t.c * ty, ty: t.ty + t.b * tx + t.d * ty}
};
cc.AffineTransformScale = function (t, sx, sy) {
    return{a: t.a * sx, b: t.b * sx, c: t.c * sy, d: t.d * sy, tx: t.tx, ty: t.ty}
};
cc.AffineTransformRotate = function (aTransform, anAngle) {
    var fSin = Math.sin(anAngle);
    var fCos = Math.cos(anAngle);
    return{a: aTransform.a * fCos + aTransform.c * fSin, b: aTransform.b * fCos + aTransform.d * fSin, c: aTransform.c * fCos - aTransform.a * fSin, d: aTransform.d * fCos - aTransform.b * fSin, tx: aTransform.tx, ty: aTransform.ty}
};
cc.AffineTransformConcat = function (t1, t2) {
    return{a: t1.a * t2.a + t1.b * t2.c, b: t1.a * t2.b + t1.b * t2.d, c: t1.c * t2.a + t1.d * t2.c, d: t1.c * t2.b + t1.d * t2.d, tx: t1.tx * t2.a + t1.ty * t2.c + t2.tx, ty: t1.tx * t2.b + t1.ty * t2.d + t2.ty}
};
cc.AffineTransformEqualToTransform = function (t1, t2) {
    return t1.a === t2.a && t1.b === t2.b && t1.c === t2.c && t1.d === t2.d && t1.tx === t2.tx && t1.ty === t2.ty
};
cc.AffineTransformInvert = function (t) {
    var determinant = 1 / (t.a * t.d - t.b * t.c);
    return{a: determinant * t.d, b: -determinant * t.b, c: -determinant * t.c, d: determinant * t.a, tx: determinant * (t.c * t.ty - t.d * t.tx), ty: determinant * (t.b * t.tx - t.a * t.ty)}
};
cc.POINT_EPSILON = parseFloat("1.192092896e-07F");
cc.pNeg = function (point) {
    return cc.p(-point.x, -point.y)
};
cc.pAdd = function (v1, v2) {
    return cc.p(v1.x + v2.x, v1.y + v2.y)
};
cc.pSub = function (v1, v2) {
    return cc.p(v1.x - v2.x, v1.y - v2.y)
};
cc.pMult = function (point, floatVar) {
    return cc.p(point.x * floatVar, point.y * floatVar)
};
cc.pMidpoint = function (v1, v2) {
    return cc.pMult(cc.pAdd(v1, v2), 0.5)
};
cc.pDot = function (v1, v2) {
    return v1.x * v2.x + v1.y * v2.y
};
cc.pCross = function (v1, v2) {
    return v1.x * v2.y - v1.y * v2.x
};
cc.pPerp = function (point) {
    return cc.p(-point.y, point.x)
};
cc.pRPerp = function (point) {
    return cc.p(point.y, -point.x)
};
cc.pProject = function (v1, v2) {
    return cc.pMult(v2, cc.pDot(v1, v2) / cc.pDot(v2, v2))
};
cc.pRotate = function (v1, v2) {
    return cc.p(v1.x * v2.x - v1.y * v2.y, v1.x * v2.y + v1.y * v2.x)
};
cc.pUnrotate = function (v1, v2) {
    return cc.p(v1.x * v2.x + v1.y * v2.y, v1.y * v2.x - v1.x * v2.y)
};
cc.pLengthSQ = function (v) {
    return cc.pDot(v, v)
};
cc.pDistanceSQ = function (point1, point2) {
    return cc.pLengthSQ(cc.pSub(point1, point2))
};
cc.pLength = function (v) {
    return Math.sqrt(cc.pLengthSQ(v))
};
cc.pDistance = function (v1, v2) {
    return cc.pLength(cc.pSub(v1, v2))
};
cc.pNormalize = function (v) {
    return cc.pMult(v, 1 / cc.pLength(v))
};
cc.pForAngle = function (a) {
    return cc.p(Math.cos(a), Math.sin(a))
};
cc.pToAngle = function (v) {
    return Math.atan2(v.y, v.x)
};
cc.clampf = function (value, min_inclusive, max_inclusive) {
    if (min_inclusive > max_inclusive) {
        var temp = min_inclusive;
        min_inclusive = max_inclusive;
        max_inclusive = temp
    }
    return value < min_inclusive ? min_inclusive : value < max_inclusive ? value : max_inclusive
};
cc.pClamp = function (p, min_inclusive, max_inclusive) {
    return cc.p(cc.clampf(p.x, min_inclusive.x, max_inclusive.x), cc.clampf(p.y, min_inclusive.y, max_inclusive.y))
};
cc.pFromSize = function (s) {
    return cc.p(s.width, s.height)
};
cc.pCompOp = function (p, opFunc) {
    return cc.p(opFunc(p.x), opFunc(p.y))
};
cc.pLerp = function (a, b, alpha) {
    return cc.pAdd(cc.pMult(a, 1 - alpha), cc.pMult(b, alpha))
};
cc.pFuzzyEqual = function (a, b, variance) {
    if (a.x - variance <= b.x && b.x <= a.x + variance)if (a.y - variance <= b.y && b.y <= a.y + variance)return true;
    return false
};
cc.pCompMult = function (a, b) {
    return cc.p(a.x * b.x, a.y * b.y)
};
cc.pAngleSigned = function (a, b) {
    var a2 = cc.pNormalize(a);
    var b2 = cc.pNormalize(b);
    var angle = Math.atan2(a2.x * b2.y - a2.y * b2.x, cc.pDot(a2, b2));
    if (Math.abs(angle) < cc.POINT_EPSILON)return 0;
    return angle
};
cc.pAngle = function (a, b) {
    var angle = Math.acos(cc.pDot(cc.pNormalize(a), cc.pNormalize(b)));
    if (Math.abs(angle) < cc.POINT_EPSILON)return 0;
    return angle
};
cc.pRotateByAngle = function (v, pivot, angle) {
    var r = cc.pSub(v, pivot);
    var cosa = Math.cos(angle), sina = Math.sin(angle);
    var t = r.x;
    r.x = t * cosa - r.y * sina + pivot.x;
    r.y = t * sina + r.y * cosa + pivot.y;
    return r
};
cc.pLineIntersect = function (A, B, C, D, retP) {
    if (A.x == B.x && A.y == B.y || C.x == D.x && C.y == D.y)return false;
    var BAx = B.x - A.x;
    var BAy = B.y - A.y;
    var DCx = D.x - C.x;
    var DCy = D.y - C.y;
    var ACx = A.x - C.x;
    var ACy = A.y - C.y;
    var denom = DCy * BAx - DCx * BAy;
    retP.x = DCx * ACy - DCy * ACx;
    retP.y = BAx * ACy - BAy * ACx;
    if (denom == 0) {
        if (retP.x == 0 || retP.y == 0)return true;
        return false
    }
    retP.x = retP.x / denom;
    retP.y = retP.y / denom;
    return true
};
cc.pSegmentIntersect = function (A, B, C, D) {
    var retP = cc.p(0, 0);
    if (cc.pLineIntersect(A, B, C, D, retP))if (retP.x >= 0 && retP.x <= 1 && retP.y >= 0 && retP.y <= 1)return true;
    return false
};
cc.pIntersectPoint = function (A, B, C, D) {
    var retP = cc.p(0, 0);
    if (cc.pLineIntersect(A, B, C, D, retP)) {
        var P = cc.p(0, 0);
        P.x = A.x + retP.x * (B.x - A.x);
        P.y = A.y + retP.x * (B.y - A.y);
        return P
    }
    return cc.p(0, 0)
};
cc.pSameAs = function (A, B) {
    if (A != null && B != null)return A.x == B.x && A.y == B.y;
    return false
};
cc.pZeroIn = function (v) {
    v.x = 0;
    v.y = 0
};
cc.pIn = function (v1, v2) {
    v1.x = v2.x;
    v1.y = v2.y
};
cc.pMultIn = function (point, floatVar) {
    point.x *= floatVar;
    point.y *= floatVar
};
cc.pSubIn = function (v1, v2) {
    v1.x -= v2.x;
    v1.y -= v2.y
};
cc.pAddIn = function (v1, v2) {
    v1.x += v2.x;
    v1.y += v2.y
};
cc.pNormalizeIn = function (v) {
    cc.pMultIn(v, 1 / Math.sqrt(v.x * v.x + v.y * v.y))
};
cc.Touch = cc.Class.extend({_point: null, _prevPoint: null, _id: 0, _startPointCaptured: false, _startPoint: null, ctor: function (x, y, id) {
    this._point = cc.p(x || 0, y || 0);
    this._id = id || 0
}, getLocation: function () {
    return this._point
}, getLocationX: function () {
    return this._point.x
}, getLocationY: function () {
    return this._point.y
}, getPreviousLocation: function () {
    return this._prevPoint
}, getStartLocation: function () {
    return this._startPoint
}, getDelta: function () {
    return cc.pSub(this._point, this._prevPoint)
}, getLocationInView: function () {
    return this._point
},
    getPreviousLocationInView: function () {
        return this._prevPoint
    }, getStartLocationInView: function () {
        return this._startPoint
    }, getID: function () {
        return this._id
    }, getId: function () {
        return this._id
    }, setTouchInfo: function (id, x, y) {
        this._prevPoint = this._point;
        this._point = cc.p(x || 0, y || 0);
        this._id = id;
        if (!this._startPointCaptured) {
            this._startPoint = cc.p(this._point);
            this._startPointCaptured = true
        }
    }, _setPoint: function (x, y) {
        if (y === undefined) {
            this._point.x = x.x;
            this._point.y = x.y
        } else {
            this._point.x = x;
            this._point.y = y
        }
    }, _setPrevPoint: function (x, y) {
        if (y === undefined)this._prevPoint = cc.p(x.x, x.y); else this._prevPoint = cc.p(x || 0, y || 0)
    }});
cc.Event = cc.Class.extend({_type: 0, _isStopped: false, _currentTarget: null, _setCurrentTarget: function (target) {
    this._currentTarget = target
}, ctor: function (type) {
    this._type = type
}, getType: function () {
    return this._type
}, stopPropagation: function () {
    this._isStopped = true
}, isStopped: function () {
    return this._isStopped
}, getCurrentTarget: function () {
    return this._currentTarget
}});
cc.Event.TOUCH = 0;
cc.Event.KEYBOARD = 1;
cc.Event.ACCELERATION = 2;
cc.Event.MOUSE = 3;
cc.Event.CUSTOM = 4;
cc.EventCustom = cc.Event.extend({_eventName: null, _userData: null, ctor: function (eventName) {
    cc.Event.prototype.ctor.call(this, cc.Event.CUSTOM);
    this._eventName = eventName
}, setUserData: function (data) {
    this._userData = data
}, getUserData: function () {
    return this._userData
}, getEventName: function () {
    return this._eventName
}});
cc.EventMouse = cc.Event.extend({_eventType: 0, _button: 0, _x: 0, _y: 0, _prevX: 0, _prevY: 0, _scrollX: 0, _scrollY: 0, ctor: function (eventType) {
    cc.Event.prototype.ctor.call(this, cc.Event.MOUSE);
    this._eventType = eventType
}, setScrollData: function (scrollX, scrollY) {
    this._scrollX = scrollX;
    this._scrollY = scrollY
}, getScrollX: function () {
    return this._scrollX
}, getScrollY: function () {
    return this._scrollY
}, setLocation: function (x, y) {
    this._x = x;
    this._y = y
}, getLocation: function () {
    return{x: this._x, y: this._y}
}, getLocationInView: function () {
    return{x: this._x,
        y: cc.view._designResolutionSize.height - this._y}
}, _setPrevCursor: function (x, y) {
    this._prevX = x;
    this._prevY = y
}, getDelta: function () {
    return{x: this._x - this._prevX, y: this._y - this._prevY}
}, getDeltaX: function () {
    return this._x - this._prevX
}, getDeltaY: function () {
    return this._y - this._prevY
}, setButton: function (button) {
    this._button = button
}, getButton: function () {
    return this._button
}, getLocationX: function () {
    return this._x
}, getLocationY: function () {
    return this._y
}});
cc.EventMouse.NONE = 0;
cc.EventMouse.DOWN = 1;
cc.EventMouse.UP = 2;
cc.EventMouse.MOVE = 3;
cc.EventMouse.SCROLL = 4;
cc.EventMouse.BUTTON_LEFT = 0;
cc.EventMouse.BUTTON_RIGHT = 2;
cc.EventMouse.BUTTON_MIDDLE = 1;
cc.EventMouse.BUTTON_4 = 3;
cc.EventMouse.BUTTON_5 = 4;
cc.EventMouse.BUTTON_6 = 5;
cc.EventMouse.BUTTON_7 = 6;
cc.EventMouse.BUTTON_8 = 7;
cc.EventTouch = cc.Event.extend({_eventCode: 0, _touches: null, ctor: function (arr) {
    cc.Event.prototype.ctor.call(this, cc.Event.TOUCH);
    this._touches = arr || []
}, getEventCode: function () {
    return this._eventCode
}, getTouches: function () {
    return this._touches
}, _setEventCode: function (eventCode) {
    this._eventCode = eventCode
}, _setTouches: function (touches) {
    this._touches = touches
}});
cc.EventTouch.MAX_TOUCHES = 5;
cc.EventTouch.EventCode = {BEGAN: 0, MOVED: 1, ENDED: 2, CANCELLED: 3};
cc.EventListener = cc.Class.extend({_onEvent: null, _type: 0, _listenerID: null, _registered: false, _fixedPriority: 0, _node: null, _paused: false, _isEnabled: true, ctor: function (type, listenerID, callback) {
    this._onEvent = callback;
    this._type = type || 0;
    this._listenerID = listenerID || ""
}, _setPaused: function (paused) {
    this._paused = paused
}, _isPaused: function () {
    return this._paused
}, _setRegistered: function (registered) {
    this._registered = registered
}, _isRegistered: function () {
    return this._registered
}, _getType: function () {
    return this._type
},
    _getListenerID: function () {
        return this._listenerID
    }, _setFixedPriority: function (fixedPriority) {
        this._fixedPriority = fixedPriority
    }, _getFixedPriority: function () {
        return this._fixedPriority
    }, _setSceneGraphPriority: function (node) {
        this._node = node
    }, _getSceneGraphPriority: function () {
        return this._node
    }, checkAvailable: function () {
        return this._onEvent != null
    }, clone: function () {
        return null
    }, setEnabled: function (enabled) {
        this._isEnabled = enabled
    }, isEnabled: function () {
        return this._isEnabled
    }, retain: function () {
    }, release: function () {
    }});
cc.EventListener.UNKNOWN = 0;
cc.EventListener.TOUCH_ONE_BY_ONE = 1;
cc.EventListener.TOUCH_ALL_AT_ONCE = 2;
cc.EventListener.KEYBOARD = 3;
cc.EventListener.MOUSE = 4;
cc.EventListener.ACCELERATION = 5;
cc.EventListener.CUSTOM = 6;
cc._EventListenerCustom = cc.EventListener.extend({_onCustomEvent: null, ctor: function (listenerId, callback) {
    this._onCustomEvent = callback;
    var selfPointer = this;
    var listener = function (event) {
        if (selfPointer._onCustomEvent != null)selfPointer._onCustomEvent(event)
    };
    cc.EventListener.prototype.ctor.call(this, cc.EventListener.CUSTOM, listenerId, listener)
}, checkAvailable: function () {
    return cc.EventListener.prototype.checkAvailable.call(this) && this._onCustomEvent != null
}, clone: function () {
    return new cc._EventListenerCustom(this._listenerID,
        this._onCustomEvent)
}});
cc._EventListenerCustom.create = function (eventName, callback) {
    return new cc._EventListenerCustom(eventName, callback)
};
cc._EventListenerMouse = cc.EventListener.extend({onMouseDown: null, onMouseUp: null, onMouseMove: null, onMouseScroll: null, ctor: function () {
    var selfPointer = this;
    var listener = function (event) {
        var eventType = cc.EventMouse;
        switch (event._eventType) {
            case eventType.DOWN:
                if (selfPointer.onMouseDown)selfPointer.onMouseDown(event);
                break;
            case eventType.UP:
                if (selfPointer.onMouseUp)selfPointer.onMouseUp(event);
                break;
            case eventType.MOVE:
                if (selfPointer.onMouseMove)selfPointer.onMouseMove(event);
                break;
            case eventType.SCROLL:
                if (selfPointer.onMouseScroll)selfPointer.onMouseScroll(event);
                break;
            default:
                break
        }
    };
    cc.EventListener.prototype.ctor.call(this, cc.EventListener.MOUSE, cc._EventListenerMouse.LISTENER_ID, listener)
}, clone: function () {
    var eventListener = new cc._EventListenerMouse;
    eventListener.onMouseDown = this.onMouseDown;
    eventListener.onMouseUp = this.onMouseUp;
    eventListener.onMouseMove = this.onMouseMove;
    eventListener.onMouseScroll = this.onMouseScroll;
    return eventListener
}, checkAvailable: function () {
    return true
}});
cc._EventListenerMouse.LISTENER_ID = "__cc_mouse";
cc._EventListenerMouse.create = function () {
    return new cc._EventListenerMouse
};
cc._EventListenerTouchOneByOne = cc.EventListener.extend({_claimedTouches: null, swallowTouches: false, onTouchBegan: null, onTouchMoved: null, onTouchEnded: null, onTouchCancelled: null, ctor: function () {
    cc.EventListener.prototype.ctor.call(this, cc.EventListener.TOUCH_ONE_BY_ONE, cc._EventListenerTouchOneByOne.LISTENER_ID, null);
    this._claimedTouches = []
}, setSwallowTouches: function (needSwallow) {
    this.swallowTouches = needSwallow
}, clone: function () {
    var eventListener = new cc._EventListenerTouchOneByOne;
    eventListener.onTouchBegan =
        this.onTouchBegan;
    eventListener.onTouchMoved = this.onTouchMoved;
    eventListener.onTouchEnded = this.onTouchEnded;
    eventListener.onTouchCancelled = this.onTouchCancelled;
    eventListener.swallowTouches = this.swallowTouches;
    return eventListener
}, checkAvailable: function () {
    if (!this.onTouchBegan) {
        cc.log(cc._LogInfos._EventListenerTouchOneByOne_checkAvailable);
        return false
    }
    return true
}});
cc._EventListenerTouchOneByOne.LISTENER_ID = "__cc_touch_one_by_one";
cc._EventListenerTouchOneByOne.create = function () {
    return new cc._EventListenerTouchOneByOne
};
cc._EventListenerTouchAllAtOnce = cc.EventListener.extend({onTouchesBegan: null, onTouchesMoved: null, onTouchesEnded: null, onTouchesCancelled: null, ctor: function () {
    cc.EventListener.prototype.ctor.call(this, cc.EventListener.TOUCH_ALL_AT_ONCE, cc._EventListenerTouchAllAtOnce.LISTENER_ID, null)
}, clone: function () {
    var eventListener = new cc._EventListenerTouchAllAtOnce;
    eventListener.onTouchesBegan = this.onTouchesBegan;
    eventListener.onTouchesMoved = this.onTouchesMoved;
    eventListener.onTouchesEnded = this.onTouchesEnded;
    eventListener.onTouchesCancelled = this.onTouchesCancelled;
    return eventListener
}, checkAvailable: function () {
    if (this.onTouchesBegan == null && this.onTouchesMoved == null && this.onTouchesEnded == null && this.onTouchesCancelled == null) {
        cc.log(cc._LogInfos._EventListenerTouchAllAtOnce_checkAvailable);
        return false
    }
    return true
}});
cc._EventListenerTouchAllAtOnce.LISTENER_ID = "__cc_touch_all_at_once";
cc._EventListenerTouchAllAtOnce.create = function () {
    return new cc._EventListenerTouchAllAtOnce
};
cc.EventListener.create = function (argObj) {
    cc.assert(argObj && argObj.event, cc._LogInfos.EventListener_create);
    var listenerType = argObj.event;
    delete argObj.event;
    var listener = null;
    if (listenerType === cc.EventListener.TOUCH_ONE_BY_ONE)listener = new cc._EventListenerTouchOneByOne; else if (listenerType === cc.EventListener.TOUCH_ALL_AT_ONCE)listener = new cc._EventListenerTouchAllAtOnce; else if (listenerType === cc.EventListener.MOUSE)listener = new cc._EventListenerMouse; else if (listenerType === cc.EventListener.CUSTOM) {
        listener =
            new cc._EventListenerCustom(argObj.eventName, argObj.callback);
        delete argObj.eventName;
        delete argObj.callback
    } else if (listenerType === cc.EventListener.KEYBOARD)listener = new cc._EventListenerKeyboard; else if (listenerType === cc.EventListener.ACCELERATION) {
        listener = new cc._EventListenerAcceleration(argObj.callback);
        delete argObj.callback
    }
    for (var key in argObj)listener[key] = argObj[key];
    return listener
};
cc.copyArray = function (arr) {
    var i, len = arr.length, arr_clone = new Array(len);
    for (i = 0; i < len; i += 1)arr_clone[i] = arr[i];
    return arr_clone
};
cc._EventListenerVector = cc.Class.extend({_fixedListeners: null, _sceneGraphListeners: null, gt0Index: 0, ctor: function () {
    this._fixedListeners = [];
    this._sceneGraphListeners = []
}, size: function () {
    return this._fixedListeners.length + this._sceneGraphListeners.length
}, empty: function () {
    return this._fixedListeners.length === 0 && this._sceneGraphListeners.length === 0
}, push: function (listener) {
    if (listener._getFixedPriority() == 0)this._sceneGraphListeners.push(listener); else this._fixedListeners.push(listener)
}, clearSceneGraphListeners: function () {
    this._sceneGraphListeners.length =
        0
}, clearFixedListeners: function () {
    this._fixedListeners.length = 0
}, clear: function () {
    this._sceneGraphListeners.length = 0;
    this._fixedListeners.length = 0
}, getFixedPriorityListeners: function () {
    return this._fixedListeners
}, getSceneGraphPriorityListeners: function () {
    return this._sceneGraphListeners
}});
cc.__getListenerID = function (event) {
    var eventType = cc.Event, getType = event.getType();
    if (getType === eventType.ACCELERATION)return cc._EventListenerAcceleration.LISTENER_ID;
    if (getType === eventType.CUSTOM)return event.getEventName();
    if (getType === eventType.KEYBOARD)return cc._EventListenerKeyboard.LISTENER_ID;
    if (getType === eventType.MOUSE)return cc._EventListenerMouse.LISTENER_ID;
    if (getType === eventType.TOUCH)cc.log(cc._LogInfos.__getListenerID);
    return""
};
cc.eventManager = {DIRTY_NONE: 0, DIRTY_FIXED_PRIORITY: 1 << 0, DIRTY_SCENE_GRAPH_PRIORITY: 1 << 1, DIRTY_ALL: 3, _listenersMap: {}, _priorityDirtyFlagMap: {}, _nodeListenersMap: {}, _nodePriorityMap: {}, _globalZOrderNodeMap: {}, _toAddedListeners: [], _dirtyNodes: [], _inDispatch: 0, _isEnabled: false, _nodePriorityIndex: 0, _internalCustomListenerIDs: [cc.game.EVENT_HIDE, cc.game.EVENT_SHOW], _setDirtyForNode: function (node) {
    if (this._nodeListenersMap[node.__instanceId] != null)this._dirtyNodes.push(node);
    var _children = node.getChildren();
    for (var i = 0, len = _children.length; i < len; i++)this._setDirtyForNode(_children[i])
}, pauseTarget: function (node, recursive) {
    var listeners = this._nodeListenersMap[node.__instanceId], i, len;
    if (listeners)for (i = 0, len = listeners.length; i < len; i++)listeners[i]._setPaused(true);
    if (recursive === true) {
        var locChildren = node.getChildren();
        for (i = 0, len = locChildren.length; i < len; i++)this.pauseTarget(locChildren[i], true)
    }
}, resumeTarget: function (node, recursive) {
    var listeners = this._nodeListenersMap[node.__instanceId], i, len;
    if (listeners)for (i =
                           0, len = listeners.length; i < len; i++)listeners[i]._setPaused(false);
    this._setDirtyForNode(node);
    if (recursive === true) {
        var locChildren = node.getChildren();
        for (i = 0, len = locChildren.length; i < len; i++)this.resumeTarget(locChildren[i], true)
    }
}, _addListener: function (listener) {
    if (this._inDispatch === 0)this._forceAddEventListener(listener); else this._toAddedListeners.push(listener)
}, _forceAddEventListener: function (listener) {
    var listenerID = listener._getListenerID();
    var listeners = this._listenersMap[listenerID];
    if (!listeners) {
        listeners =
            new cc._EventListenerVector;
        this._listenersMap[listenerID] = listeners
    }
    listeners.push(listener);
    if (listener._getFixedPriority() == 0) {
        this._setDirty(listenerID, this.DIRTY_SCENE_GRAPH_PRIORITY);
        var node = listener._getSceneGraphPriority();
        if (node == null)cc.log(cc._LogInfos.eventManager__forceAddEventListener);
        this._associateNodeAndEventListener(node, listener);
        if (node.isRunning())this.resumeTarget(node)
    } else this._setDirty(listenerID, this.DIRTY_FIXED_PRIORITY)
}, _getListeners: function (listenerID) {
    return this._listenersMap[listenerID]
},
    _updateDirtyFlagForSceneGraph: function () {
        if (this._dirtyNodes.length == 0)return;
        var locDirtyNodes = this._dirtyNodes, selListeners, selListener, locNodeListenersMap = this._nodeListenersMap;
        for (var i = 0, len = locDirtyNodes.length; i < len; i++) {
            selListeners = locNodeListenersMap[locDirtyNodes[i].__instanceId];
            if (selListeners)for (var j = 0, listenersLen = selListeners.length; j < listenersLen; j++) {
                selListener = selListeners[j];
                if (selListener)this._setDirty(selListener._getListenerID(), this.DIRTY_SCENE_GRAPH_PRIORITY)
            }
        }
        this._dirtyNodes.length =
            0
    }, _removeAllListenersInVector: function (listenerVector) {
        if (!listenerVector)return;
        var selListener;
        for (var i = 0; i < listenerVector.length;) {
            selListener = listenerVector[i];
            selListener._setRegistered(false);
            if (selListener._getSceneGraphPriority() != null) {
                this._dissociateNodeAndEventListener(selListener._getSceneGraphPriority(), selListener);
                selListener._setSceneGraphPriority(null)
            }
            if (this._inDispatch === 0)cc.arrayRemoveObject(listenerVector, selListener); else++i
        }
    }, _removeListenersForListenerID: function (listenerID) {
        var listeners =
            this._listenersMap[listenerID], i;
        if (listeners) {
            var fixedPriorityListeners = listeners.getFixedPriorityListeners();
            var sceneGraphPriorityListeners = listeners.getSceneGraphPriorityListeners();
            this._removeAllListenersInVector(sceneGraphPriorityListeners);
            this._removeAllListenersInVector(fixedPriorityListeners);
            delete this._priorityDirtyFlagMap[listenerID];
            if (!this._inDispatch) {
                listeners.clear();
                delete this._listenersMap[listenerID]
            }
        }
        var locToAddedListeners = this._toAddedListeners, listener;
        for (i = 0; i < locToAddedListeners.length;) {
            listener =
                locToAddedListeners[i];
            if (listener && listener._getListenerID() == listenerID)cc.arrayRemoveObject(locToAddedListeners, listener); else++i
        }
    }, _sortEventListeners: function (listenerID) {
        var dirtyFlag = this.DIRTY_NONE, locFlagMap = this._priorityDirtyFlagMap;
        if (locFlagMap[listenerID])dirtyFlag = locFlagMap[listenerID];
        if (dirtyFlag != this.DIRTY_NONE) {
            locFlagMap[listenerID] = this.DIRTY_NONE;
            if (dirtyFlag & this.DIRTY_FIXED_PRIORITY)this._sortListenersOfFixedPriority(listenerID);
            if (dirtyFlag & this.DIRTY_SCENE_GRAPH_PRIORITY) {
                var rootNode =
                    cc.director.getRunningScene();
                if (rootNode)this._sortListenersOfSceneGraphPriority(listenerID, rootNode); else locFlagMap[listenerID] = this.DIRTY_SCENE_GRAPH_PRIORITY
            }
        }
    }, _sortListenersOfSceneGraphPriority: function (listenerID, rootNode) {
        var listeners = this._getListeners(listenerID);
        if (!listeners)return;
        var sceneGraphListener = listeners.getSceneGraphPriorityListeners();
        if (!sceneGraphListener || sceneGraphListener.length === 0)return;
        this._nodePriorityIndex = 0;
        this._nodePriorityMap = {};
        this._visitTarget(rootNode,
            true);
        listeners.getSceneGraphPriorityListeners().sort(this._sortEventListenersOfSceneGraphPriorityDes)
    }, _sortEventListenersOfSceneGraphPriorityDes: function (l1, l2) {
        var locNodePriorityMap = cc.eventManager._nodePriorityMap;
        return locNodePriorityMap[l2._getSceneGraphPriority().__instanceId] - locNodePriorityMap[l1._getSceneGraphPriority().__instanceId]
    }, _sortListenersOfFixedPriority: function (listenerID) {
        var listeners = this._listenersMap[listenerID];
        if (!listeners)return;
        var fixedListeners = listeners.getFixedPriorityListeners();
        if (!fixedListeners || fixedListeners.length === 0)return;
        fixedListeners.sort(this._sortListenersOfFixedPriorityAsc);
        var index = 0;
        for (var len = fixedListeners.length; index < len;) {
            if (fixedListeners[index]._getFixedPriority() >= 0)break;
            ++index
        }
        listeners.gt0Index = index
    }, _sortListenersOfFixedPriorityAsc: function (l1, l2) {
        return l1._getFixedPriority() - l2._getFixedPriority()
    }, _onUpdateListeners: function (listenerID) {
        var listeners = this._listenersMap[listenerID];
        if (!listeners)return;
        var fixedPriorityListeners = listeners.getFixedPriorityListeners();
        var sceneGraphPriorityListeners = listeners.getSceneGraphPriorityListeners();
        var i, selListener;
        if (sceneGraphPriorityListeners)for (i = 0; i < sceneGraphPriorityListeners.length;) {
            selListener = sceneGraphPriorityListeners[i];
            if (!selListener._isRegistered())cc.arrayRemoveObject(sceneGraphPriorityListeners, selListener); else++i
        }
        if (fixedPriorityListeners)for (i = 0; i < fixedPriorityListeners.length;) {
            selListener = fixedPriorityListeners[i];
            if (!selListener._isRegistered())cc.arrayRemoveObject(fixedPriorityListeners, selListener);
            else++i
        }
        if (sceneGraphPriorityListeners && sceneGraphPriorityListeners.length === 0)listeners.clearSceneGraphListeners();
        if (fixedPriorityListeners && fixedPriorityListeners.length === 0)listeners.clearFixedListeners()
    }, _updateListeners: function (event) {
        var locInDispatch = this._inDispatch;
        cc.assert(locInDispatch > 0, "If program goes here, there should be event in dispatch.");
        if (event.getType() == cc.Event.TOUCH) {
            this._onUpdateListeners(cc._EventListenerTouchOneByOne.LISTENER_ID);
            this._onUpdateListeners(cc._EventListenerTouchAllAtOnce.LISTENER_ID)
        } else this._onUpdateListeners(cc.__getListenerID(event));
        if (locInDispatch > 1)return;
        cc.assert(locInDispatch == 1, "_inDispatch should be 1 here.");
        var locListenersMap = this._listenersMap, locPriorityDirtyFlagMap = this._priorityDirtyFlagMap;
        for (var selKey in locListenersMap)if (locListenersMap[selKey].empty()) {
            delete locPriorityDirtyFlagMap[selKey];
            delete locListenersMap[selKey]
        }
        var locToAddedListeners = this._toAddedListeners;
        if (locToAddedListeners.length !== 0) {
            for (var i = 0, len = locToAddedListeners.length; i < len; i++)this._forceAddEventListener(locToAddedListeners[i]);
            this._toAddedListeners.length = 0
        }
    }, _onTouchEventCallback: function (listener, argsObj) {
        if (!listener._isRegistered)return false;
        var event = argsObj.event, selTouch = argsObj.selTouch;
        event._setCurrentTarget(listener._node);
        var isClaimed = false, removedIdx;
        var getCode = event.getEventCode(), eventCode = cc.EventTouch.EventCode;
        if (getCode == eventCode.BEGAN) {
            if (listener.onTouchBegan) {
                isClaimed = listener.onTouchBegan(selTouch, event);
                if (isClaimed && listener._registered)listener._claimedTouches.push(selTouch)
            }
        } else if (listener._claimedTouches.length >
            0 && (removedIdx = listener._claimedTouches.indexOf(selTouch)) != -1) {
            isClaimed = true;
            if (getCode === eventCode.MOVED && listener.onTouchMoved)listener.onTouchMoved(selTouch, event); else if (getCode === eventCode.ENDED) {
                if (listener.onTouchEnded)listener.onTouchEnded(selTouch, event);
                if (listener._registered)listener._claimedTouches.splice(removedIdx, 1)
            } else if (getCode === eventCode.CANCELLED) {
                if (listener.onTouchCancelled)listener.onTouchCancelled(selTouch, event);
                if (listener._registered)listener._claimedTouches.splice(removedIdx,
                    1)
            }
        }
        if (event.isStopped()) {
            cc.eventManager._updateListeners(event);
            return true
        }
        if (isClaimed && listener._registered && listener.swallowTouches) {
            if (argsObj.needsMutableSet)argsObj.touches.splice(selTouch, 1);
            return true
        }
        return false
    }, _dispatchTouchEvent: function (event) {
        this._sortEventListeners(cc._EventListenerTouchOneByOne.LISTENER_ID);
        this._sortEventListeners(cc._EventListenerTouchAllAtOnce.LISTENER_ID);
        var oneByOneListeners = this._getListeners(cc._EventListenerTouchOneByOne.LISTENER_ID);
        var allAtOnceListeners =
            this._getListeners(cc._EventListenerTouchAllAtOnce.LISTENER_ID);
        if (null == oneByOneListeners && null == allAtOnceListeners)return;
        var originalTouches = event.getTouches(), mutableTouches = cc.copyArray(originalTouches);
        var oneByOneArgsObj = {event: event, needsMutableSet: oneByOneListeners && allAtOnceListeners, touches: mutableTouches, selTouch: null};
        if (oneByOneListeners)for (var i = 0; i < originalTouches.length; i++) {
            oneByOneArgsObj.selTouch = originalTouches[i];
            this._dispatchEventToListeners(oneByOneListeners, this._onTouchEventCallback,
                oneByOneArgsObj);
            if (event.isStopped())return
        }
        if (allAtOnceListeners && mutableTouches.length > 0) {
            this._dispatchEventToListeners(allAtOnceListeners, this._onTouchesEventCallback, {event: event, touches: mutableTouches});
            if (event.isStopped())return
        }
        this._updateListeners(event)
    }, _onTouchesEventCallback: function (listener, callbackParams) {
        if (!listener._registered)return false;
        var eventCode = cc.EventTouch.EventCode, event = callbackParams.event, touches = callbackParams.touches, getCode = event.getEventCode();
        event._setCurrentTarget(listener._node);
        if (getCode == eventCode.BEGAN && listener.onTouchesBegan)listener.onTouchesBegan(touches, event); else if (getCode == eventCode.MOVED && listener.onTouchesMoved)listener.onTouchesMoved(touches, event); else if (getCode == eventCode.ENDED && listener.onTouchesEnded)listener.onTouchesEnded(touches, event); else if (getCode == eventCode.CANCELLED && listener.onTouchesCancelled)listener.onTouchesCancelled(touches, event);
        if (event.isStopped()) {
            cc.eventManager._updateListeners(event);
            return true
        }
        return false
    }, _associateNodeAndEventListener: function (node, listener) {
        var listeners = this._nodeListenersMap[node.__instanceId];
        if (!listeners) {
            listeners = [];
            this._nodeListenersMap[node.__instanceId] = listeners
        }
        listeners.push(listener)
    }, _dissociateNodeAndEventListener: function (node, listener) {
        var listeners = this._nodeListenersMap[node.__instanceId];
        if (listeners) {
            cc.arrayRemoveObject(listeners, listener);
            if (listeners.length === 0)delete this._nodeListenersMap[node.__instanceId]
        }
    }, _dispatchEventToListeners: function (listeners, onEvent, eventOrArgs) {
        var shouldStopPropagation =
            false;
        var fixedPriorityListeners = listeners.getFixedPriorityListeners();
        var sceneGraphPriorityListeners = listeners.getSceneGraphPriorityListeners();
        var i = 0, j, selListener;
        if (fixedPriorityListeners)if (fixedPriorityListeners.length !== 0)for (; i < listeners.gt0Index; ++i) {
            selListener = fixedPriorityListeners[i];
            if (selListener.isEnabled() && !selListener._isPaused() && selListener._isRegistered() && onEvent(selListener, eventOrArgs)) {
                shouldStopPropagation = true;
                break
            }
        }
        if (sceneGraphPriorityListeners && !shouldStopPropagation)for (j =
                                                                           0; j < sceneGraphPriorityListeners.length; j++) {
            selListener = sceneGraphPriorityListeners[j];
            if (selListener.isEnabled() && !selListener._isPaused() && selListener._isRegistered() && onEvent(selListener, eventOrArgs)) {
                shouldStopPropagation = true;
                break
            }
        }
        if (fixedPriorityListeners && !shouldStopPropagation)for (; i < fixedPriorityListeners.length; ++i) {
            selListener = fixedPriorityListeners[i];
            if (selListener.isEnabled() && !selListener._isPaused() && selListener._isRegistered() && onEvent(selListener, eventOrArgs)) {
                shouldStopPropagation =
                    true;
                break
            }
        }
    }, _setDirty: function (listenerID, flag) {
        var locDirtyFlagMap = this._priorityDirtyFlagMap;
        if (locDirtyFlagMap[listenerID] == null)locDirtyFlagMap[listenerID] = flag; else locDirtyFlagMap[listenerID] = flag | locDirtyFlagMap[listenerID]
    }, _visitTarget: function (node, isRootNode) {
        var children = node.getChildren(), i = 0;
        var childrenCount = children.length, locGlobalZOrderNodeMap = this._globalZOrderNodeMap, locNodeListenersMap = this._nodeListenersMap;
        if (childrenCount > 0) {
            var child;
            for (; i < childrenCount; i++) {
                child = children[i];
                if (child && child.getLocalZOrder() < 0)this._visitTarget(child, false); else break
            }
            if (locNodeListenersMap[node.__instanceId] != null) {
                if (!locGlobalZOrderNodeMap[node.getGlobalZOrder()])locGlobalZOrderNodeMap[node.getGlobalZOrder()] = [];
                locGlobalZOrderNodeMap[node.getGlobalZOrder()].push(node.__instanceId)
            }
            for (; i < childrenCount; i++) {
                child = children[i];
                if (child)this._visitTarget(child, false)
            }
        } else if (locNodeListenersMap[node.__instanceId] != null) {
            if (!locGlobalZOrderNodeMap[node.getGlobalZOrder()])locGlobalZOrderNodeMap[node.getGlobalZOrder()] =
                [];
            locGlobalZOrderNodeMap[node.getGlobalZOrder()].push(node.__instanceId)
        }
        if (isRootNode) {
            var globalZOrders = [];
            for (var selKey in locGlobalZOrderNodeMap)globalZOrders.push(selKey);
            globalZOrders.sort(this._sortNumberAsc);
            var zOrdersLen = globalZOrders.length, selZOrders, j, locNodePriorityMap = this._nodePriorityMap;
            for (i = 0; i < zOrdersLen; i++) {
                selZOrders = locGlobalZOrderNodeMap[globalZOrders[i]];
                for (j = 0; j < selZOrders.length; j++)locNodePriorityMap[selZOrders[j]] = ++this._nodePriorityIndex
            }
            this._globalZOrderNodeMap =
            {}
        }
    }, _sortNumberAsc: function (a, b) {
        return a - b
    }, addListener: function (listener, nodeOrPriority) {
        cc.assert(listener && nodeOrPriority, cc._LogInfos.eventManager_addListener_2);
        if (!(listener instanceof cc.EventListener)) {
            cc.assert(typeof nodeOrPriority !== "number", cc._LogInfos.eventManager_addListener_3);
            listener = cc.EventListener.create(listener)
        } else cc.assert(!listener._isRegistered(), cc._LogInfos.eventManager_addListener_4);
        if (!listener.checkAvailable())return;
        if (typeof nodeOrPriority == "number") {
            if (nodeOrPriority ==
                0) {
                cc.log(cc._LogInfos.eventManager_addListener);
                return
            }
            listener._setSceneGraphPriority(null);
            listener._setFixedPriority(nodeOrPriority);
            listener._setRegistered(true);
            listener._setPaused(false);
            this._addListener(listener)
        } else {
            listener._setSceneGraphPriority(nodeOrPriority);
            listener._setFixedPriority(0);
            listener._setRegistered(true);
            this._addListener(listener)
        }
    }, addCustomListener: function (eventName, callback) {
        var listener = cc._EventListenerCustom.create(eventName, callback);
        this.addListener(listener,
            1);
        return listener
    }, removeListener: function (listener) {
        if (listener == null)return;
        var isFound, locListener = this._listenersMap;
        for (var selKey in locListener) {
            var listeners = locListener[selKey];
            var fixedPriorityListeners = listeners.getFixedPriorityListeners(), sceneGraphPriorityListeners = listeners.getSceneGraphPriorityListeners();
            isFound = this._removeListenerInVector(sceneGraphPriorityListeners, listener);
            if (isFound)this._setDirty(listener._getListenerID(), this.DIRTY_SCENE_GRAPH_PRIORITY); else {
                isFound = this._removeListenerInVector(fixedPriorityListeners,
                    listener);
                if (isFound)this._setDirty(listener._getListenerID(), this.DIRTY_FIXED_PRIORITY)
            }
            if (listeners.empty()) {
                delete this._priorityDirtyFlagMap[listener._getListenerID()];
                delete locListener[selKey]
            }
            if (isFound)break
        }
        if (!isFound) {
            var locToAddedListeners = this._toAddedListeners;
            for (var i = 0, len = locToAddedListeners.length; i < len; i++) {
                var selListener = locToAddedListeners[i];
                if (selListener == listener) {
                    cc.arrayRemoveObject(locToAddedListeners, selListener);
                    break
                }
            }
        }
    }, _removeListenerInVector: function (listeners, listener) {
        if (listeners == null)return false;
        for (var i = 0, len = listeners.length; i < len; i++) {
            var selListener = listeners[i];
            if (selListener == listener) {
                selListener._setRegistered(false);
                if (selListener._getSceneGraphPriority() != null) {
                    this._dissociateNodeAndEventListener(selListener._getSceneGraphPriority(), selListener);
                    selListener._setSceneGraphPriority(null)
                }
                if (this._inDispatch == 0)cc.arrayRemoveObject(listeners, selListener);
                return true
            }
        }
        return false
    }, removeListeners: function (listenerType, recursive) {
        var _t = this;
        if (listenerType instanceof cc.Node) {
            delete _t._nodePriorityMap[listenerType.__instanceId];
            cc.arrayRemoveObject(_t._dirtyNodes, listenerType);
            var listeners = _t._nodeListenersMap[listenerType.__instanceId];
            if (!listeners)return;
            var listenersCopy = cc.copyArray(listeners), i;
            for (i = 0; i < listenersCopy.length; i++)_t.removeListener(listenersCopy[i]);
            listenersCopy.length = 0;
            var locToAddedListeners = _t._toAddedListeners;
            for (i = 0; i < locToAddedListeners.length;) {
                var listener = locToAddedListeners[i];
                if (listener._getSceneGraphPriority() ==
                    listenerType) {
                    listener._setSceneGraphPriority(null);
                    listener._setRegistered(false);
                    locToAddedListeners.splice(i, 1)
                } else++i
            }
            if (recursive === true) {
                var locChildren = listenerType.getChildren(), len;
                for (i = 0, len = locChildren.length; i < len; i++)_t.removeListeners(locChildren[i], true)
            }
        } else if (listenerType == cc.EventListener.TOUCH_ONE_BY_ONE)_t._removeListenersForListenerID(cc._EventListenerTouchOneByOne.LISTENER_ID); else if (listenerType == cc.EventListener.TOUCH_ALL_AT_ONCE)_t._removeListenersForListenerID(cc._EventListenerTouchAllAtOnce.LISTENER_ID);
        else if (listenerType == cc.EventListener.MOUSE)_t._removeListenersForListenerID(cc._EventListenerMouse.LISTENER_ID); else if (listenerType == cc.EventListener.ACCELERATION)_t._removeListenersForListenerID(cc._EventListenerAcceleration.LISTENER_ID); else if (listenerType == cc.EventListener.KEYBOARD)_t._removeListenersForListenerID(cc._EventListenerKeyboard.LISTENER_ID); else cc.log(cc._LogInfos.eventManager_removeListeners)
    }, removeCustomListeners: function (customEventName) {
        this._removeListenersForListenerID(customEventName)
    },
    removeAllListeners: function () {
        var locListeners = this._listenersMap, locInternalCustomEventIDs = this._internalCustomListenerIDs;
        for (var selKey in locListeners)if (locInternalCustomEventIDs.indexOf(selKey) === -1)this._removeListenersForListenerID(selKey)
    }, setPriority: function (listener, fixedPriority) {
        if (listener == null)return;
        var locListeners = this._listenersMap;
        for (var selKey in locListeners) {
            var selListeners = locListeners[selKey];
            var fixedPriorityListeners = selListeners.getFixedPriorityListeners();
            if (fixedPriorityListeners) {
                var found =
                    fixedPriorityListeners.indexOf(listener);
                if (found != -1) {
                    if (listener._getSceneGraphPriority() != null)cc.log(cc._LogInfos.eventManager_setPriority);
                    if (listener._getFixedPriority() !== fixedPriority) {
                        listener._setFixedPriority(fixedPriority);
                        this._setDirty(listener._getListenerID(), this.DIRTY_FIXED_PRIORITY)
                    }
                    return
                }
            }
        }
    }, setEnabled: function (enabled) {
        this._isEnabled = enabled
    }, isEnabled: function () {
        return this._isEnabled
    }, dispatchEvent: function (event) {
        if (!this._isEnabled)return;
        this._updateDirtyFlagForSceneGraph();
        this._inDispatch++;
        if (!event || !event.getType)throw"event is undefined";
        if (event.getType() == cc.Event.TOUCH) {
            this._dispatchTouchEvent(event);
            this._inDispatch--;
            return
        }
        var listenerID = cc.__getListenerID(event);
        this._sortEventListeners(listenerID);
        var selListeners = this._listenersMap[listenerID];
        if (selListeners != null)this._dispatchEventToListeners(selListeners, this._onListenerCallback, event);
        this._updateListeners(event);
        this._inDispatch--
    }, _onListenerCallback: function (listener, event) {
        event._setCurrentTarget(listener._getSceneGraphPriority());
        listener._onEvent(event);
        return event.isStopped()
    }, dispatchCustomEvent: function (eventName, optionalUserData) {
        var ev = new cc.EventCustom(eventName);
        ev.setUserData(optionalUserData);
        this.dispatchEvent(ev)
    }};
_tmp.PrototypeCCNode = function () {
    var _p = cc.Node.prototype;
    cc.defineGetterSetter(_p, "x", _p.getPositionX, _p.setPositionX);
    cc.defineGetterSetter(_p, "y", _p.getPositionY, _p.setPositionY);
    _p.width;
    cc.defineGetterSetter(_p, "width", _p._getWidth, _p._setWidth);
    _p.height;
    cc.defineGetterSetter(_p, "height", _p._getHeight, _p._setHeight);
    _p.anchorX;
    cc.defineGetterSetter(_p, "anchorX", _p._getAnchorX, _p._setAnchorX);
    _p.anchorY;
    cc.defineGetterSetter(_p, "anchorY", _p._getAnchorY, _p._setAnchorY);
    _p.skewX;
    cc.defineGetterSetter(_p,
        "skewX", _p.getSkewX, _p.setSkewX);
    _p.skewY;
    cc.defineGetterSetter(_p, "skewY", _p.getSkewY, _p.setSkewY);
    _p.zIndex;
    cc.defineGetterSetter(_p, "zIndex", _p.getLocalZOrder, _p.setLocalZOrder);
    _p.vertexZ;
    cc.defineGetterSetter(_p, "vertexZ", _p.getVertexZ, _p.setVertexZ);
    _p.rotation;
    cc.defineGetterSetter(_p, "rotation", _p.getRotation, _p.setRotation);
    _p.rotationX;
    cc.defineGetterSetter(_p, "rotationX", _p.getRotationX, _p.setRotationX);
    _p.rotationY;
    cc.defineGetterSetter(_p, "rotationY", _p.getRotationY, _p.setRotationY);
    _p.scale;
    cc.defineGetterSetter(_p, "scale", _p.getScale, _p.setScale);
    _p.scaleX;
    cc.defineGetterSetter(_p, "scaleX", _p.getScaleX, _p.setScaleX);
    _p.scaleY;
    cc.defineGetterSetter(_p, "scaleY", _p.getScaleY, _p.setScaleY);
    _p.children;
    cc.defineGetterSetter(_p, "children", _p.getChildren);
    _p.childrenCount;
    cc.defineGetterSetter(_p, "childrenCount", _p.getChildrenCount);
    _p.parent;
    cc.defineGetterSetter(_p, "parent", _p.getParent, _p.setParent);
    _p.visible;
    cc.defineGetterSetter(_p, "visible", _p.isVisible, _p.setVisible);
    _p.running;
    cc.defineGetterSetter(_p, "running", _p.isRunning);
    _p.ignoreAnchor;
    cc.defineGetterSetter(_p, "ignoreAnchor", _p.isIgnoreAnchorPointForPosition, _p.ignoreAnchorPointForPosition);
    _p.tag;
    _p.userData;
    _p.userObject;
    _p.arrivalOrder;
    _p.actionManager;
    cc.defineGetterSetter(_p, "actionManager", _p.getActionManager, _p.setActionManager);
    _p.scheduler;
    cc.defineGetterSetter(_p, "scheduler", _p.getScheduler, _p.setScheduler);
    _p.shaderProgram;
    cc.defineGetterSetter(_p, "shaderProgram", _p.getShaderProgram, _p.setShaderProgram);
    _p.glServerState;
    cc.defineGetterSetter(_p, "glServerState", _p.getGLServerState, _p.setGLServerState)
};
_tmp.PrototypeCCNodeRGBA = function () {
    var _p = cc.NodeRGBA.prototype;
    _p.opacity;
    cc.defineGetterSetter(_p, "opacity", _p.getOpacity, _p.setOpacity);
    _p.opacityModifyRGB;
    cc.defineGetterSetter(_p, "opacityModifyRGB", _p.isOpacityModifyRGB, _p.setOpacityModifyRGB);
    _p.cascadeOpacity;
    cc.defineGetterSetter(_p, "cascadeOpacity", _p.isCascadeOpacityEnabled, _p.setCascadeOpacityEnabled);
    _p.color;
    cc.defineGetterSetter(_p, "color", _p.getColor, _p.setColor);
    _p.cascadeColor;
    cc.defineGetterSetter(_p, "cascadeColor", _p.isCascadeColorEnabled,
        _p.setCascadeColorEnabled)
};
cc.NODE_TAG_INVALID = -1;
cc.s_globalOrderOfArrival = 1;
cc.Node = cc.Class.extend({_localZOrder: 0, _globalZOrder: 0, _vertexZ: 0, _rotationX: 0, _rotationY: 0, _scaleX: 1, _scaleY: 1, _position: null, _skewX: 0, _skewY: 0, _children: null, _visible: true, _anchorPoint: null, _anchorPointInPoints: null, _contentSize: null, _running: false, _parent: null, _ignoreAnchorPointForPosition: false, tag: cc.NODE_TAG_INVALID, userData: null, userObject: null, _transformDirty: true, _inverseDirty: true, _cacheDirty: true, _cachedParent: null, _transformGLDirty: null, _transform: null, _inverse: null, _reorderChildDirty: false,
    _shaderProgram: null, arrivalOrder: 0, _actionManager: null, _scheduler: null, _eventDispatcher: null, _initializedNode: false, _additionalTransformDirty: false, _additionalTransform: null, _componentContainer: null, _isTransitionFinished: false, _rotationRadiansX: 0, _rotationRadiansY: 0, _className: "Node", _showNode: false, _initNode: function () {
        var _t = this;
        _t._anchorPoint = cc.p(0, 0);
        _t._anchorPointInPoints = cc.p(0, 0);
        _t._contentSize = cc.size(0, 0);
        _t._position = cc.p(0, 0);
        _t._children = [];
        _t._transform = {a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0};
        var director = cc.director;
        _t._actionManager = director.getActionManager();
        _t._scheduler = director.getScheduler();
        _t._initializedNode = true;
        _t._additionalTransform = cc.AffineTransformMakeIdentity();
        if (cc.ComponentContainer)_t._componentContainer = new cc.ComponentContainer(_t)
    }, init: function () {
        if (this._initializedNode === false)this._initNode();
        return true
    }, _arrayMakeObjectsPerformSelector: function (array, callbackType) {
        if (!array || array.length === 0)return;
        var i, len = array.length, node;
        var nodeCallbackType = cc.Node.StateCallbackType;
        switch (callbackType) {
            case nodeCallbackType.onEnter:
                for (i = 0; i < len; i++) {
                    node = array[i];
                    if (node)node.onEnter()
                }
                break;
            case nodeCallbackType.onExit:
                for (i = 0; i < len; i++) {
                    node = array[i];
                    if (node)node.onExit()
                }
                break;
            case nodeCallbackType.onEnterTransitionDidFinish:
                for (i = 0; i < len; i++) {
                    node = array[i];
                    if (node)node.onEnterTransitionDidFinish()
                }
                break;
            case nodeCallbackType.cleanup:
                for (i = 0; i < len; i++) {
                    node = array[i];
                    if (node)node.cleanup()
                }
                break;
            case nodeCallbackType.updateTransform:
                for (i = 0; i < len; i++) {
                    node = array[i];
                    if (node)node.updateTransform()
                }
                break;
            case nodeCallbackType.onExitTransitionDidStart:
                for (i = 0; i < len; i++) {
                    node = array[i];
                    if (node)node.onExitTransitionDidStart()
                }
                break;
            case nodeCallbackType.sortAllChildren:
                for (i = 0; i < len; i++) {
                    node = array[i];
                    if (node)node.sortAllChildren()
                }
                break;
            default:
                cc.assert(0, cc._LogInfos.Node__arrayMakeObjectsPerformSelector);
                break
        }
    }, setNodeDirty: null, attr: function (attrs) {
        for (var key in attrs)this[key] = attrs[key]
    }, getSkewX: function () {
        return this._skewX
    }, setSkewX: function (newSkewX) {
        this._skewX = newSkewX;
        this.setNodeDirty()
    },
    getSkewY: function () {
        return this._skewY
    }, setSkewY: function (newSkewY) {
        this._skewY = newSkewY;
        this.setNodeDirty()
    }, setLocalZOrder: function (localZOrder) {
        this._localZOrder = localZOrder;
        if (this._parent)this._parent.reorderChild(this, localZOrder);
        cc.eventManager._setDirtyForNode(this)
    }, _setLocalZOrder: function (localZOrder) {
        this._localZOrder = localZOrder
    }, getLocalZOrder: function () {
        return this._localZOrder
    }, getZOrder: function () {
        cc.log(cc._LogInfos.Node_getZOrder);
        return this.getLocalZOrder()
    }, setZOrder: function (z) {
        cc.log(cc._LogInfos.Node_setZOrder);
        this.setLocalZOrder(z)
    }, setGlobalZOrder: function (globalZOrder) {
        if (this._globalZOrder != globalZOrder) {
            this._globalZOrder = globalZOrder;
            cc.eventManager._setDirtyForNode(this)
        }
    }, getGlobalZOrder: function () {
        return this._globalZOrder
    }, getVertexZ: function () {
        return this._vertexZ
    }, setVertexZ: function (Var) {
        this._vertexZ = Var
    }, getRotation: function () {
        if (this._rotationX !== this._rotationY)cc.log(cc._LogInfos.Node_getRotation);
        return this._rotationX
    }, setRotation: function (newRotation) {
        this._rotationX = this._rotationY =
            newRotation;
        this._rotationRadiansX = this._rotationX * 0.017453292519943295;
        this._rotationRadiansY = this._rotationY * 0.017453292519943295;
        this.setNodeDirty()
    }, getRotationX: function () {
        return this._rotationX
    }, setRotationX: function (rotationX) {
        this._rotationX = rotationX;
        this._rotationRadiansX = this._rotationX * 0.017453292519943295;
        this.setNodeDirty()
    }, getRotationY: function () {
        return this._rotationY
    }, setRotationY: function (rotationY) {
        this._rotationY = rotationY;
        this._rotationRadiansY = this._rotationY * 0.017453292519943295;
        this.setNodeDirty()
    }, getScale: function () {
        if (this._scaleX !== this._scaleY)cc.log(cc._LogInfos.Node_getScale);
        return this._scaleX
    }, setScale: function (scale, scaleY) {
        this._scaleX = scale;
        this._scaleY = scaleY || scaleY === 0 ? scaleY : scale;
        this.setNodeDirty()
    }, getScaleX: function () {
        return this._scaleX
    }, setScaleX: function (newScaleX) {
        this._scaleX = newScaleX;
        this.setNodeDirty()
    }, getScaleY: function () {
        return this._scaleY
    }, setScaleY: function (newScaleY) {
        this._scaleY = newScaleY;
        this.setNodeDirty()
    }, setPosition: function (newPosOrxValue, yValue) {
        var locPosition = this._position;
        if (yValue === undefined) {
            locPosition.x = newPosOrxValue.x;
            locPosition.y = newPosOrxValue.y
        } else {
            locPosition.x = newPosOrxValue;
            locPosition.y = yValue
        }
        this.setNodeDirty()
    }, getPosition: function () {
        return cc.p(this._position)
    }, getPositionX: function () {
        return this._position.x
    }, setPositionX: function (x) {
        this._position.x = x;
        this.setNodeDirty()
    }, getPositionY: function () {
        return this._position.y
    }, setPositionY: function (y) {
        this._position.y = y;
        this.setNodeDirty()
    }, getChildrenCount: function () {
        return this._children.length
    },
    getChildren: function () {
        return this._children
    }, isVisible: function () {
        return this._visible
    }, setVisible: function (Var) {
        this._visible = Var;
        this.setNodeDirty()
    }, getAnchorPoint: function () {
        return this._anchorPoint
    }, setAnchorPoint: function (point, y) {
        var locAnchorPoint = this._anchorPoint;
        if (y === undefined) {
            if (point.x === locAnchorPoint.x && point.y === locAnchorPoint.y)return;
            locAnchorPoint.x = point.x;
            locAnchorPoint.y = point.y
        } else {
            if (point === locAnchorPoint.x && y === locAnchorPoint.y)return;
            locAnchorPoint.x = point;
            locAnchorPoint.y =
                y
        }
        var locAPP = this._anchorPointInPoints, locSize = this._contentSize;
        locAPP.x = locSize.width * locAnchorPoint.x;
        locAPP.y = locSize.height * locAnchorPoint.y;
        this.setNodeDirty()
    }, _getAnchor: function () {
        return this._anchorPoint
    }, _setAnchor: function (p) {
        var x = p.x, y = p.y;
        if (this._anchorPoint.x !== x) {
            this._anchorPoint.x = x;
            this._anchorPointInPoints.x = this._contentSize.width * x
        }
        if (this._anchorPoint.y !== y) {
            this._anchorPoint.y = y;
            this._anchorPointInPoints.y = this._contentSize.height * y
        }
        this.setNodeDirty()
    }, _getAnchorX: function () {
        return this._anchorPoint.x
    },
    _setAnchorX: function (x) {
        if (this._anchorPoint.x === x)return;
        this._anchorPoint.x = x;
        this._anchorPointInPoints.x = this._contentSize.width * x;
        this.setNodeDirty()
    }, _getAnchorY: function () {
        return this._anchorPoint.y
    }, _setAnchorY: function (y) {
        if (this._anchorPoint.y === y)return;
        this._anchorPoint.y = y;
        this._anchorPointInPoints.y = this._contentSize.height * y;
        this.setNodeDirty()
    }, getAnchorPointInPoints: function () {
        return this._anchorPointInPoints
    }, _getWidth: function () {
        return this._contentSize.width
    }, _setWidth: function (width) {
        this._contentSize.width =
            width;
        this._anchorPointInPoints.x = width * this._anchorPoint.x;
        this.setNodeDirty()
    }, _getHeight: function () {
        return this._contentSize.height
    }, _setHeight: function (height) {
        this._contentSize.height = height;
        this._anchorPointInPoints.y = height * this._anchorPoint.y;
        this.setNodeDirty()
    }, getContentSize: function () {
        return this._contentSize
    }, setContentSize: function (size, height) {
        var locContentSize = this._contentSize;
        if (height === undefined) {
            if (size.width === locContentSize.width && size.height === locContentSize.height)return;
            locContentSize.width = size.width;
            locContentSize.height = size.height
        } else {
            if (size === locContentSize.width && height === locContentSize.height)return;
            locContentSize.width = size;
            locContentSize.height = height
        }
        var locAPP = this._anchorPointInPoints, locAnchorPoint = this._anchorPoint;
        locAPP.x = locContentSize.width * locAnchorPoint.x;
        locAPP.y = locContentSize.height * locAnchorPoint.y;
        this.setNodeDirty()
    }, isRunning: function () {
        return this._running
    }, getParent: function () {
        return this._parent
    }, setParent: function (Var) {
        this._parent =
            Var
    }, isIgnoreAnchorPointForPosition: function () {
        return this._ignoreAnchorPointForPosition
    }, ignoreAnchorPointForPosition: function (newValue) {
        if (newValue != this._ignoreAnchorPointForPosition) {
            this._ignoreAnchorPointForPosition = newValue;
            this.setNodeDirty()
        }
    }, getTag: function () {
        return this.tag
    }, setTag: function (Var) {
        this.tag = Var
    }, getUserData: function () {
        return this.userData
    }, setUserData: function (Var) {
        this.userData = Var
    }, getUserObject: function () {
        return this.userObject
    }, setUserObject: function (newValue) {
        if (this.userObject !=
            newValue)this.userObject = newValue
    }, getOrderOfArrival: function () {
        return this.arrivalOrder
    }, setOrderOfArrival: function (Var) {
        this.arrivalOrder = Var
    }, getActionManager: function () {
        if (!this._actionManager)this._actionManager = cc.director.getActionManager();
        return this._actionManager
    }, setActionManager: function (actionManager) {
        if (this._actionManager != actionManager) {
            this.stopAllActions();
            this._actionManager = actionManager
        }
    }, getScheduler: function () {
        if (!this._scheduler)this._scheduler = cc.director.getScheduler();
        return this._scheduler
    }, setScheduler: function (scheduler) {
        if (this._scheduler != scheduler) {
            this.unscheduleAllCallbacks();
            this._scheduler = scheduler
        }
    }, getBoundingBox: function () {
        var rect = cc.rect(0, 0, this._contentSize.width, this._contentSize.height);
        return cc._RectApplyAffineTransformIn(rect, this.nodeToParentTransform())
    }, cleanup: function () {
        this.stopAllActions();
        this.unscheduleAllCallbacks();
        cc.eventManager.removeListeners(this);
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.cleanup)
    },
    getChildByTag: function (aTag) {
        var __children = this._children;
        if (__children != null)for (var i = 0; i < __children.length; i++) {
            var node = __children[i];
            if (node && node.tag == aTag)return node
        }
        return null
    }, addChild: function (child, localZOrder, tag) {
        cc.assert(child, cc._LogInfos.Node_addChild_3);
        if (child === this) {
            cc.log(cc._LogInfos.Node_addChild);
            return
        }
        if (child._parent !== null) {
            cc.log(cc._LogInfos.Node_addChild_2);
            return
        }
        var tmpzOrder = localZOrder != null ? localZOrder : child._localZOrder;
        child.tag = tag != null ? tag : child.tag;
        this._insertChild(child,
            tmpzOrder);
        child._parent = this;
        this._cachedParent && (child._cachedParent = this._cachedParent);
        if (this._running) {
            child.onEnter();
            if (this._isTransitionFinished)child.onEnterTransitionDidFinish()
        }
    }, removeFromParent: function (cleanup) {
        if (this._parent) {
            if (cleanup == null)cleanup = true;
            this._parent.removeChild(this, cleanup)
        }
    }, removeFromParentAndCleanup: function (cleanup) {
        cc.log(cc._LogInfos.Node_removeFromParentAndCleanup);
        this.removeFromParent(cleanup)
    }, removeChild: function (child, cleanup) {
        if (this._children.length ===
            0)return;
        if (cleanup == null)cleanup = true;
        if (this._children.indexOf(child) > -1)this._detachChild(child, cleanup);
        this.setNodeDirty()
    }, removeChildByTag: function (tag, cleanup) {
        if (tag === cc.NODE_TAG_INVALID)cc.log(cc._LogInfos.Node_removeChildByTag);
        var child = this.getChildByTag(tag);
        if (child == null)cc.log(cc._LogInfos.Node_removeChildByTag_2, tag); else this.removeChild(child, cleanup)
    }, removeAllChildrenWithCleanup: function (cleanup) {
        cc.log(cc._LogInfos.Node_removeAllChildrenWithCleanup);
        this.removeAllChildren(cleanup)
    },
    removeAllChildren: function (cleanup) {
        var __children = this._children;
        if (__children != null) {
            if (cleanup == null)cleanup = true;
            for (var i = 0; i < __children.length; i++) {
                var node = __children[i];
                if (node) {
                    if (this._running) {
                        node.onExitTransitionDidStart();
                        node.onExit()
                    }
                    if (cleanup)node.cleanup();
                    node.parent = null
                }
            }
            this._children.length = 0
        }
    }, _detachChild: function (child, doCleanup) {
        if (this._running) {
            child.onExitTransitionDidStart();
            child.onExit()
        }
        if (doCleanup)child.cleanup();
        child.parent = null;
        cc.arrayRemoveObject(this._children,
            child)
    }, _insertChild: function (child, z) {
        this._reorderChildDirty = true;
        this._children.push(child);
        child._setLocalZOrder(z)
    }, reorderChild: function (child, zOrder) {
        cc.assert(child, cc._LogInfos.Node_reorderChild);
        this._reorderChildDirty = true;
        child.arrivalOrder = cc.s_globalOrderOfArrival;
        cc.s_globalOrderOfArrival++;
        child._setLocalZOrder(zOrder);
        this.setNodeDirty()
    }, sortAllChildren: function () {
        if (this._reorderChildDirty) {
            var _children = this._children;
            var i, j, length = _children.length, tempChild;
            for (i = 0; i < length; i++) {
                var tempItem =
                    _children[i];
                j = i - 1;
                tempChild = _children[j];
                while (j >= 0 && (tempItem._localZOrder < tempChild._localZOrder || tempItem._localZOrder == tempChild._localZOrder && tempItem.arrivalOrder < tempChild.arrivalOrder)) {
                    _children[j + 1] = tempChild;
                    j = j - 1;
                    tempChild = _children[j]
                }
                _children[j + 1] = tempItem
            }
            this._reorderChildDirty = false
        }
    }, draw: function (ctx) {
    }, transformAncestors: function () {
        if (this._parent != null) {
            this._parent.transformAncestors();
            this._parent.transform()
        }
    }, onEnter: function () {
        this._isTransitionFinished = false;
        this._running =
            true;
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.onEnter);
        this.resume()
    }, onEnterTransitionDidFinish: function () {
        this._isTransitionFinished = true;
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.onEnterTransitionDidFinish)
    }, onExitTransitionDidStart: function () {
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.onExitTransitionDidStart)
    }, onExit: function () {
        this._running = false;
        this.pause();
        this._arrayMakeObjectsPerformSelector(this._children,
            cc.Node.StateCallbackType.onExit);
        if (this._componentContainer)this._componentContainer.removeAll()
    }, runAction: function (action) {
        cc.assert(action, cc._LogInfos.Node_runAction);
        this.actionManager.addAction(action, this, !this._running);
        return action
    }, stopAllActions: function () {
        this.actionManager && this.actionManager.removeAllActionsFromTarget(this)
    }, stopAction: function (action) {
        this.actionManager.removeAction(action)
    }, stopActionByTag: function (tag) {
        if (tag === cc.ACTION_TAG_INVALID) {
            cc.log(cc._LogInfos.Node_stopActionByTag);
            return
        }
        this.actionManager.removeActionByTag(tag, this)
    }, getActionByTag: function (tag) {
        if (tag === cc.ACTION_TAG_INVALID) {
            cc.log(cc._LogInfos.Node_getActionByTag);
            return null
        }
        return this.actionManager.getActionByTag(tag, this)
    }, getNumberOfRunningActions: function () {
        return this.actionManager.numberOfRunningActionsInTarget(this)
    }, scheduleUpdate: function () {
        this.scheduleUpdateWithPriority(0)
    }, scheduleUpdateWithPriority: function (priority) {
        this.scheduler.scheduleUpdateForTarget(this, priority, !this._running)
    }, unscheduleUpdate: function () {
        this.scheduler.unscheduleUpdateForTarget(this)
    },
    schedule: function (callback_fn, interval, repeat, delay) {
        interval = interval || 0;
        cc.assert(callback_fn, cc._LogInfos.Node_schedule);
        cc.assert(interval >= 0, cc._LogInfos.Node_schedule_2);
        repeat = repeat == null ? cc.REPEAT_FOREVER : repeat;
        delay = delay || 0;
        this.scheduler.scheduleCallbackForTarget(this, callback_fn, interval, repeat, delay, !this._running)
    }, scheduleOnce: function (callback_fn, delay) {
        this.schedule(callback_fn, 0, 0, delay)
    }, unschedule: function (callback_fn) {
        if (!callback_fn)return;
        this.scheduler.unscheduleCallbackForTarget(this,
            callback_fn)
    }, unscheduleAllCallbacks: function () {
        this.scheduler.unscheduleAllCallbacksForTarget(this)
    }, resumeSchedulerAndActions: function () {
        cc.log(cc._LogInfos.Node_resumeSchedulerAndActions);
        this.resume()
    }, resume: function () {
        this.scheduler.resumeTarget(this);
        this.actionManager && this.actionManager.resumeTarget(this);
        cc.eventManager.resumeTarget(this)
    }, pauseSchedulerAndActions: function () {
        cc.log(cc._LogInfos.Node_pauseSchedulerAndActions);
        this.pause()
    }, pause: function () {
        this.scheduler.pauseTarget(this);
        this.actionManager && this.actionManager.pauseTarget(this);
        cc.eventManager.pauseTarget(this)
    }, setAdditionalTransform: function (additionalTransform) {
        this._additionalTransform = additionalTransform;
        this._transformDirty = true;
        this._additionalTransformDirty = true
    }, parentToNodeTransform: function () {
        if (this._inverseDirty) {
            this._inverse = cc.AffineTransformInvert(this.nodeToParentTransform());
            this._inverseDirty = false
        }
        return this._inverse
    }, nodeToWorldTransform: function () {
        var t = this.nodeToParentTransform();
        for (var p =
            this._parent; p != null; p = p.parent)t = cc.AffineTransformConcat(t, p.nodeToParentTransform());
        return t
    }, worldToNodeTransform: function () {
        return cc.AffineTransformInvert(this.nodeToWorldTransform())
    }, convertToNodeSpace: function (worldPoint) {
        return cc.PointApplyAffineTransform(worldPoint, this.worldToNodeTransform())
    }, convertToWorldSpace: function (nodePoint) {
        return cc.PointApplyAffineTransform(nodePoint, this.nodeToWorldTransform())
    }, convertToNodeSpaceAR: function (worldPoint) {
        return cc.pSub(this.convertToNodeSpace(worldPoint),
            this._anchorPointInPoints)
    }, convertToWorldSpaceAR: function (nodePoint) {
        var pt = cc.pAdd(nodePoint, this._anchorPointInPoints);
        return this.convertToWorldSpace(pt)
    }, _convertToWindowSpace: function (nodePoint) {
        var worldPoint = this.convertToWorldSpace(nodePoint);
        return cc.director.convertToUI(worldPoint)
    }, convertTouchToNodeSpace: function (touch) {
        var point = touch.getLocation();
        return this.convertToNodeSpace(point)
    }, convertTouchToNodeSpaceAR: function (touch) {
        var point = touch.getLocation();
        point = cc.director.convertToGL(point);
        return this.convertToNodeSpaceAR(point)
    }, update: function (dt) {
        if (this._componentContainer && !this._componentContainer.isEmpty())this._componentContainer.visit(dt)
    }, updateTransform: function () {
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.updateTransform)
    }, retain: function () {
    }, release: function () {
    }, getComponent: function (name) {
        return this._componentContainer.getComponent(name)
    }, addComponent: function (component) {
        this._componentContainer.add(component)
    }, removeComponent: function (name) {
        return this._componentContainer.remove(name)
    },
    removeAllComponents: function () {
        this._componentContainer.removeAll()
    }, grid: null, ctor: null, visit: null, transform: null, nodeToParentTransform: null, _setNodeDirtyForCache: function () {
        if (this._cacheDirty === false) {
            this._cacheDirty = true;
            var cachedP = this._cachedParent;
            cachedP && cachedP != this && cachedP._setNodeDirtyForCache()
        }
    }, getCamera: function () {
        if (!this._camera)this._camera = new cc.Camera;
        return this._camera
    }, getGrid: function () {
        return this.grid
    }, setGrid: function (grid) {
        this.grid = grid
    }, getShaderProgram: function () {
        return this._shaderProgram
    },
    setShaderProgram: function (newShaderProgram) {
        this._shaderProgram = newShaderProgram
    }, getGLServerState: function () {
        return this._glServerState
    }, setGLServerState: function (state) {
        this._glServerState = state
    }, getBoundingBoxToWorld: function () {
        var rect = cc.rect(0, 0, this._contentSize.width, this._contentSize.height);
        var trans = this.nodeToWorldTransform();
        rect = cc.RectApplyAffineTransform(rect, this.nodeToWorldTransform());
        if (!this._children)return rect;
        var locChildren = this._children;
        for (var i = 0; i < locChildren.length; i++) {
            var child =
                locChildren[i];
            if (child && child._visible) {
                var childRect = child._getBoundingBoxToCurrentNode(trans);
                if (childRect)rect = cc.rectUnion(rect, childRect)
            }
        }
        return rect
    }, _getBoundingBoxToCurrentNode: function (parentTransform) {
        var rect = cc.rect(0, 0, this._contentSize.width, this._contentSize.height);
        var trans = parentTransform == null ? this.nodeToParentTransform() : cc.AffineTransformConcat(this.nodeToParentTransform(), parentTransform);
        rect = cc.RectApplyAffineTransform(rect, trans);
        if (!this._children)return rect;
        var locChildren =
            this._children;
        for (var i = 0; i < locChildren.length; i++) {
            var child = locChildren[i];
            if (child && child._visible) {
                var childRect = child._getBoundingBoxToCurrentNode(trans);
                if (childRect)rect = cc.rectUnion(rect, childRect)
            }
        }
        return rect
    }, _nodeToParentTransformForWebGL: function () {
        var _t = this;
        if (_t._transformDirty) {
            var x = _t._position.x;
            var y = _t._position.y;
            var apx = _t._anchorPointInPoints.x, napx = -apx;
            var apy = _t._anchorPointInPoints.y, napy = -apy;
            var scx = _t._scaleX, scy = _t._scaleY;
            if (_t._ignoreAnchorPointForPosition) {
                x +=
                    apx;
                y += apy
            }
            var cx = 1, sx = 0, cy = 1, sy = 0;
            if (_t._rotationX !== 0 || _t._rotationY !== 0) {
                cx = Math.cos(-_t._rotationRadiansX);
                sx = Math.sin(-_t._rotationRadiansX);
                cy = Math.cos(-_t._rotationRadiansY);
                sy = Math.sin(-_t._rotationRadiansY)
            }
            var needsSkewMatrix = _t._skewX || _t._skewY;
            if (!needsSkewMatrix && (apx !== 0 || apy !== 0)) {
                x += cy * napx * scx + -sx * napy * scy;
                y += sy * napx * scx + cx * napy * scy
            }
            var t = _t._transform;
            t.a = cy * scx;
            t.b = sy * scx;
            t.c = -sx * scy;
            t.d = cx * scy;
            t.tx = x;
            t.ty = y;
            if (needsSkewMatrix) {
                t = cc.AffineTransformConcat({a: 1, b: Math.tan(cc.degreesToRadians(_t._skewY)),
                    c: Math.tan(cc.degreesToRadians(_t._skewX)), d: 1, tx: 0, ty: 0}, t);
                if (apx !== 0 || apy !== 0)t = cc.AffineTransformTranslate(t, napx, napy)
            }
            if (_t._additionalTransformDirty) {
                t = cc.AffineTransformConcat(t, _t._additionalTransform);
                _t._additionalTransformDirty = false
            }
            _t._transform = t;
            _t._transformDirty = false
        }
        return _t._transform
    }});
cc.Node.create = function () {
    return new cc.Node
};
cc.Node.StateCallbackType = {onEnter: 1, onExit: 2, cleanup: 3, onEnterTransitionDidFinish: 4, updateTransform: 5, onExitTransitionDidStart: 6, sortAllChildren: 7};
if (cc._renderType === cc._RENDER_TYPE_CANVAS) {
    var _p = cc.Node.prototype;
    _p.ctor = function () {
        this._initNode()
    };
    _p.setNodeDirty = function () {
        var _t = this;
        _t._setNodeDirtyForCache();
        _t._transformDirty === false && (_t._transformDirty = _t._inverseDirty = true)
    };
    _p.visit = function (ctx) {
        var _t = this;
        if (!_t._visible)return;
        var context = ctx || cc._renderContext, i;
        var children = _t._children, child;
        context.save();
        _t.transform(context);
        var len = children.length;
        if (len > 0) {
            _t.sortAllChildren();
            for (i = 0; i < len; i++) {
                child = children[i];
                if (child._localZOrder <
                    0)child.visit(context); else break
            }
            _t.draw(context);
            for (; i < len; i++)children[i].visit(context)
        } else _t.draw(context);
        _t.arrivalOrder = 0;
        context.restore()
    };
    _p.transform = function (ctx) {
        var context = ctx || cc._renderContext, eglViewer = cc.view;
        var t = this.nodeToParentTransform();
        context.transform(t.a, t.c, t.b, t.d, t.tx * eglViewer.getScaleX(), -t.ty * eglViewer.getScaleY())
    };
    _p.nodeToParentTransform = function () {
        var _t = this;
        if (_t._transformDirty) {
            var t = _t._transform;
            t.tx = _t._position.x;
            t.ty = _t._position.y;
            var Cos = 1, Sin =
                0;
            if (_t._rotationX) {
                Cos = Math.cos(_t._rotationRadiansX);
                Sin = Math.sin(_t._rotationRadiansX)
            }
            t.a = t.d = Cos;
            t.b = -Sin;
            t.c = Sin;
            var lScaleX = _t._scaleX, lScaleY = _t._scaleY;
            var appX = _t._anchorPointInPoints.x, appY = _t._anchorPointInPoints.y;
            var sx = lScaleX < 1E-6 && lScaleX > -1E-6 ? 1E-6 : lScaleX, sy = lScaleY < 1E-6 && lScaleY > -1E-6 ? 1E-6 : lScaleY;
            if (_t._skewX || _t._skewY) {
                var skx = Math.tan(-_t._skewX * Math.PI / 180);
                var sky = Math.tan(-_t._skewY * Math.PI / 180);
                var xx = appY * skx * sx;
                var yy = appX * sky * sy;
                t.a = Cos + -Sin * sky;
                t.b = Cos * skx + -Sin;
                t.c =
                    Sin + Cos * sky;
                t.d = Sin * skx + Cos;
                t.tx += Cos * xx + -Sin * yy;
                t.ty += Sin * xx + Cos * yy
            }
            if (lScaleX !== 1 || lScaleY !== 1) {
                t.a *= sx;
                t.c *= sx;
                t.b *= sy;
                t.d *= sy
            }
            t.tx += Cos * -appX * sx + -Sin * appY * sy;
            t.ty -= Sin * -appX * sx + Cos * appY * sy;
            if (_t._ignoreAnchorPointForPosition) {
                t.tx += appX;
                t.ty += appY
            }
            if (_t._additionalTransformDirty) {
                _t._transform = cc.AffineTransformConcat(t, _t._additionalTransform);
                _t._additionalTransformDirty = false
            }
            _t._transformDirty = false
        }
        return _t._transform
    };
    _p = null
} else {
    _tmp.WebGLCCNode();
    delete _tmp.WebGLCCNode
}
_tmp.PrototypeCCNode();
delete _tmp.PrototypeCCNode;
cc.NodeRGBA = cc.Node.extend({RGBAProtocol: true, _displayedOpacity: 255, _realOpacity: 255, _displayedColor: null, _realColor: null, _cascadeColorEnabled: false, _cascadeOpacityEnabled: false, ctor: function () {
    cc.Node.prototype.ctor.call(this);
    this._displayedOpacity = 255;
    this._realOpacity = 255;
    this._displayedColor = cc.color(255, 255, 255, 255);
    this._realColor = cc.color(255, 255, 255, 255);
    this._cascadeColorEnabled = false;
    this._cascadeOpacityEnabled = false
}, getOpacity: function () {
    return this._realOpacity
}, getDisplayedOpacity: function () {
    return this._displayedOpacity
},
    setOpacity: function (opacity) {
        this._displayedOpacity = this._realOpacity = opacity;
        var parentOpacity = 255, locParent = this._parent;
        if (locParent && locParent.RGBAProtocol && locParent.cascadeOpacity)parentOpacity = locParent.getDisplayedOpacity();
        this.updateDisplayedOpacity(parentOpacity);
        this._displayedColor.a = this._realColor.a = opacity
    }, updateDisplayedOpacity: function (parentOpacity) {
        this._displayedOpacity = this._realOpacity * parentOpacity / 255;
        if (this._cascadeOpacityEnabled) {
            var selChildren = this._children;
            for (var i =
                0; i < selChildren.length; i++) {
                var item = selChildren[i];
                if (item && item.RGBAProtocol)item.updateDisplayedOpacity(this._displayedOpacity)
            }
        }
    }, isCascadeOpacityEnabled: function () {
        return this._cascadeOpacityEnabled
    }, setCascadeOpacityEnabled: function (cascadeOpacityEnabled) {
        if (this._cascadeOpacityEnabled === cascadeOpacityEnabled)return;
        this._cascadeOpacityEnabled = cascadeOpacityEnabled;
        if (cascadeOpacityEnabled)this._enableCascadeOpacity(); else this._disableCascadeOpacity()
    }, _enableCascadeOpacity: function () {
        var parentOpacity =
            255, locParent = this._parent;
        if (locParent && locParent.RGBAProtocol && locParent.cascadeOpacity)parentOpacity = locParent.getDisplayedOpacity();
        this.updateDisplayedOpacity(parentOpacity)
    }, _disableCascadeOpacity: function () {
        this._displayedOpacity = this._realOpacity;
        var selChildren = this._children;
        for (var i = 0; i < selChildren.length; i++) {
            var item = selChildren[i];
            if (item && item.RGBAProtocol)item.updateDisplayedOpacity(255)
        }
    }, getColor: function () {
        var locRealColor = this._realColor;
        return cc.color(locRealColor.r, locRealColor.g,
            locRealColor.b, locRealColor.a)
    }, getDisplayedColor: function () {
        return this._displayedColor
    }, setColor: function (color) {
        var locDisplayedColor = this._displayedColor, locRealColor = this._realColor;
        locDisplayedColor.r = locRealColor.r = color.r;
        locDisplayedColor.g = locRealColor.g = color.g;
        locDisplayedColor.b = locRealColor.b = color.b;
        var parentColor, locParent = this._parent;
        if (locParent && locParent.RGBAProtocol && locParent.cascadeColor)parentColor = locParent.getDisplayedColor(); else parentColor = cc.color.WHITE;
        this.updateDisplayedColor(parentColor);
        if (color.a !== undefined && !color.a_undefined)this.setOpacity(color.a)
    }, updateDisplayedColor: function (parentColor) {
        var locDispColor = this._displayedColor, locRealColor = this._realColor;
        locDispColor.r = 0 | locRealColor.r * parentColor.r / 255;
        locDispColor.g = 0 | locRealColor.g * parentColor.g / 255;
        locDispColor.b = 0 | locRealColor.b * parentColor.b / 255;
        if (this._cascadeColorEnabled) {
            var selChildren = this._children;
            for (var i = 0; i < selChildren.length; i++) {
                var item = selChildren[i];
                if (item && item.RGBAProtocol)item.updateDisplayedColor(locDispColor)
            }
        }
    },
    isCascadeColorEnabled: function () {
        return this._cascadeColorEnabled
    }, setCascadeColorEnabled: function (cascadeColorEnabled) {
        if (this._cascadeColorEnabled === cascadeColorEnabled)return;
        this._cascadeColorEnabled = cascadeColorEnabled;
        if (this._cascadeColorEnabled)this._enableCascadeColor(); else this._disableCascadeColor()
    }, _enableCascadeColor: function () {
        var parentColor, locParent = this._parent;
        if (locParent && locParent.RGBAProtocol && locParent.cascadeColor)parentColor = locParent.getDisplayedColor(); else parentColor =
            cc.color.WHITE;
        this.updateDisplayedColor(parentColor)
    }, _disableCascadeColor: function () {
        var locDisplayedColor = this._displayedColor, locRealColor = this._realColor;
        locDisplayedColor.r = locRealColor.r;
        locDisplayedColor.g = locRealColor.g;
        locDisplayedColor.b = locRealColor.b;
        var selChildren = this._children, whiteColor = cc.color.WHITE;
        for (var i = 0; i < selChildren.length; i++) {
            var item = selChildren[i];
            if (item && item.RGBAProtocol)item.updateDisplayedColor(whiteColor)
        }
    }, addChild: function (child, zOrder, tag) {
        cc.Node.prototype.addChild.call(this,
            child, zOrder, tag);
        if (this._cascadeColorEnabled)this._enableCascadeColor();
        if (this._cascadeOpacityEnabled)this._enableCascadeOpacity()
    }, setOpacityModifyRGB: function (opacityValue) {
    }, isOpacityModifyRGB: function () {
        return false
    }});
cc.NodeRGBA.create = function () {
    var res = new cc.NodeRGBA;
    res.init();
    return res
};
_tmp.PrototypeCCNodeRGBA();
delete _tmp.PrototypeCCNodeRGBA;
cc.Node.ON_ENTER = 0;
cc.Node.ON_EXIT = 1;
cc.Node.ON_ENTER_TRANSITION_DID_FINISH = 2;
cc.Node.ON_EXIT_TRANSITOIN_DID_START = 3;
cc.Node.ON_CLEAN_UP = 4;
_tmp.PrototypeTexture2D = function () {
    var _c = cc.Texture2D;
    _c.PVRImagesHavePremultipliedAlpha = function (haveAlphaPremultiplied) {
        cc.PVRHaveAlphaPremultiplied_ = haveAlphaPremultiplied
    };
    _c.PIXEL_FORMAT_RGBA8888 = 2;
    _c.PIXEL_FORMAT_RGB888 = 3;
    _c.PIXEL_FORMAT_RGB565 = 4;
    _c.PIXEL_FORMAT_A8 = 5;
    _c.PIXEL_FORMAT_I8 = 6;
    _c.PIXEL_FORMAT_AI88 = 7;
    _c.PIXEL_FORMAT_RGBA4444 = 8;
    _c.PIXEL_FORMAT_RGB5A1 = 7;
    _c.PIXEL_FORMAT_PVRTC4 = 9;
    _c.PIXEL_FORMAT_PVRTC2 = 10;
    _c.PIXEL_FORMAT_DEFAULT = _c.PIXEL_FORMAT_RGBA8888;
    var _M = cc.Texture2D._M = {};
    _M[_c.PIXEL_FORMAT_RGBA8888] =
        "RGBA8888";
    _M[_c.PIXEL_FORMAT_RGB888] = "RGB888";
    _M[_c.PIXEL_FORMAT_RGB565] = "RGB565";
    _M[_c.PIXEL_FORMAT_A8] = "A8";
    _M[_c.PIXEL_FORMAT_I8] = "I8";
    _M[_c.PIXEL_FORMAT_AI88] = "AI88";
    _M[_c.PIXEL_FORMAT_RGBA4444] = "RGBA4444";
    _M[_c.PIXEL_FORMAT_RGB5A1] = "RGB5A1";
    _M[_c.PIXEL_FORMAT_PVRTC4] = "PVRTC4";
    _M[_c.PIXEL_FORMAT_PVRTC2] = "PVRTC2";
    var _B = cc.Texture2D._B = {};
    _B[_c.PIXEL_FORMAT_RGBA8888] = 32;
    _B[_c.PIXEL_FORMAT_RGB888] = 24;
    _B[_c.PIXEL_FORMAT_RGB565] = 16;
    _B[_c.PIXEL_FORMAT_A8] = 8;
    _B[_c.PIXEL_FORMAT_I8] = 8;
    _B[_c.PIXEL_FORMAT_AI88] =
        16;
    _B[_c.PIXEL_FORMAT_RGBA4444] = 16;
    _B[_c.PIXEL_FORMAT_RGB5A1] = 16;
    _B[_c.PIXEL_FORMAT_PVRTC4] = 4;
    _B[_c.PIXEL_FORMAT_PVRTC2] = 3;
    var _p = cc.Texture2D.prototype;
    _p.name;
    cc.defineGetterSetter(_p, "name", _p.getName);
    _p.pixelFormat;
    cc.defineGetterSetter(_p, "pixelFormat", _p.getPixelFormat);
    _p.pixelsWidth;
    cc.defineGetterSetter(_p, "pixelsWidth", _p.getPixelsWide);
    _p.pixelsHeight;
    cc.defineGetterSetter(_p, "pixelsHeight", _p.getPixelsHigh);
    _p.width;
    cc.defineGetterSetter(_p, "width", _p._getWidth);
    _p.height;
    cc.defineGetterSetter(_p,
        "height", _p._getHeight);
    _c.defaultPixelFormat = _c.PIXEL_FORMAT_DEFAULT
};
_tmp.PrototypeTextureAtlas = function () {
    var _p = cc.TextureAtlas.prototype;
    _p.totalQuads;
    cc.defineGetterSetter(_p, "totalQuads", _p.getTotalQuads);
    _p.capacity;
    cc.defineGetterSetter(_p, "capacity", _p.getCapacity);
    _p.quads;
    cc.defineGetterSetter(_p, "quads", _p.getQuads, _p.setQuads)
};
cc.ALIGN_CENTER = 51;
cc.ALIGN_TOP = 19;
cc.ALIGN_TOP_RIGHT = 18;
cc.ALIGN_RIGHT = 50;
cc.ALIGN_BOTTOM_RIGHT = 34;
cc.ALIGN_BOTTOM = 35;
cc.ALIGN_BOTTOM_LEFT = 33;
cc.ALIGN_LEFT = 49;
cc.ALIGN_TOP_LEFT = 17;
cc.PVRHaveAlphaPremultiplied_ = false;
if (cc._renderType === cc._RENDER_TYPE_CANVAS)cc.Texture2D = cc.Class.extend({_contentSize: null, _isLoaded: false, _htmlElementObj: null, _loadedEventListeners: null, url: null, ctor: function () {
    this._contentSize = cc.size(0, 0);
    this._isLoaded = false;
    this._htmlElementObj = null
}, getPixelsWide: function () {
    return this._contentSize.width
}, getPixelsHigh: function () {
    return this._contentSize.height
}, getContentSize: function () {
    var locScaleFactor = cc.contentScaleFactor();
    return cc.size(this._contentSize.width / locScaleFactor, this._contentSize.height /
        locScaleFactor)
}, _getWidth: function () {
    return this._contentSize.width / cc.contentScaleFactor()
}, _getHeight: function () {
    return this._contentSize.height / cc.contentScaleFactor()
}, getContentSizeInPixels: function () {
    return this._contentSize
}, initWithElement: function (element) {
    if (!element)return;
    this._htmlElementObj = element
}, getHtmlElementObj: function () {
    return this._htmlElementObj
}, isLoaded: function () {
    return this._isLoaded
}, handleLoadedTexture: function () {
    var self = this;
    if (self._isLoaded)return;
    if (!self._htmlElementObj) {
        var img =
            cc.loader.getRes(self.url);
        if (!img)return;
        self.initWithElement(img)
    }
    self._isLoaded = true;
    var locElement = self._htmlElementObj;
    self._contentSize.width = locElement.width;
    self._contentSize.height = locElement.height;
    self._callLoadedEventCallbacks()
}, description: function () {
    return"\x3ccc.Texture2D | width \x3d " + this._contentSize.width + " height " + this._contentSize.height + "\x3e"
}, initWithData: function (data, pixelFormat, pixelsWide, pixelsHigh, contentSize) {
    return false
}, initWithImage: function (uiImage) {
    return false
},
    initWithString: function (text, fontName, fontSize, dimensions, hAlignment, vAlignment) {
        return false
    }, releaseTexture: function () {
    }, getName: function () {
        return null
    }, getMaxS: function () {
        return 1
    }, setMaxS: function (maxS) {
    }, getMaxT: function () {
        return 1
    }, setMaxT: function (maxT) {
    }, getPixelFormat: function () {
        return null
    }, getShaderProgram: function () {
        return null
    }, setShaderProgram: function (shaderProgram) {
    }, hasPremultipliedAlpha: function () {
        return false
    }, hasMipmaps: function () {
        return false
    }, releaseData: function (data) {
        data =
            null
    }, keepData: function (data, length) {
        return data
    }, drawAtPoint: function (point) {
    }, drawInRect: function (rect) {
    }, initWithETCFile: function (file) {
        cc.log(cc._LogInfos.Texture2D_initWithETCFile);
        return false
    }, initWithPVRFile: function (file) {
        cc.log(cc._LogInfos.Texture2D_initWithPVRFile);
        return false
    }, initWithPVRTCData: function (data, level, bpp, hasAlpha, length, pixelFormat) {
        cc.log(cc._LogInfos.Texture2D_initWithPVRTCData);
        return false
    }, setTexParameters: function (texParams) {
    }, setAntiAliasTexParameters: function () {
    },
    setAliasTexParameters: function () {
    }, generateMipmap: function () {
    }, stringForFormat: function () {
        return""
    }, bitsPerPixelForFormat: function (format) {
        return-1
    }, addLoadedEventListener: function (callback, target) {
        if (!this._loadedEventListeners)this._loadedEventListeners = [];
        this._loadedEventListeners.push({eventCallback: callback, eventTarget: target})
    }, removeLoadedEventListener: function (target) {
        if (!this._loadedEventListeners)return;
        var locListeners = this._loadedEventListeners;
        for (var i = 0; i < locListeners.length; i++) {
            var selCallback =
                locListeners[i];
            if (selCallback.eventTarget == target)locListeners.splice(i, 1)
        }
    }, _callLoadedEventCallbacks: function () {
        if (!this._loadedEventListeners)return;
        var locListeners = this._loadedEventListeners;
        for (var i = 0, len = locListeners.length; i < len; i++) {
            var selCallback = locListeners[i];
            selCallback.eventCallback.call(selCallback.eventTarget, this)
        }
        locListeners.length = 0
    }}); else {
    _tmp.WebGLTexture2D();
    delete _tmp.WebGLTexture2D
}
_tmp.PrototypeTexture2D();
delete _tmp.PrototypeTexture2D;
cc.textureCache = {_textures: {}, _textureColorsCache: {}, _textureKeySeq: 0 | Math.random() * 1E3, _loadedTexturesBefore: {}, _initializingRenderer: function () {
    var selPath;
    var locLoadedTexturesBefore = this._loadedTexturesBefore, locTextures = this._textures;
    for (selPath in locLoadedTexturesBefore) {
        var tex2d = locLoadedTexturesBefore[selPath];
        tex2d.handleLoadedTexture();
        locTextures[selPath] = tex2d
    }
    this._loadedTexturesBefore = {}
}, addPVRTCImage: function (filename) {
    cc.log(cc._LogInfos.textureCache_addPVRTCImage)
}, addETCImage: function (filename) {
    cc.log(cc._LogInfos.textureCache_addETCImage)
},
    description: function () {
        return"\x3cTextureCache | Number of textures \x3d " + this._textures.length + "\x3e"
    }, textureForKey: function (textureKeyName) {
        return this._textures[textureKeyName] || this._textures[cc.loader._aliases[textureKeyName]]
    }, getKeyByTexture: function (texture) {
        for (var key in this._textures)if (this._textures[key] == texture)return key;
        return null
    }, _generalTextureKey: function () {
        this._textureKeySeq++;
        return"_textureKey_" + this._textureKeySeq
    }, getTextureColors: function (texture) {
        var key = this.getKeyByTexture(texture);
        if (!key)if (texture instanceof HTMLImageElement)key = texture.src; else key = this._generalTextureKey();
        if (!this._textureColorsCache[key])this._textureColorsCache[key] = cc.generateTextureCacheForColor(texture);
        return this._textureColorsCache[key]
    }, addPVRImage: function (path) {
        cc.log(cc._LogInfos.textureCache_addPVRImage)
    }, removeAllTextures: function () {
        var locTextures = this._textures;
        for (var selKey in locTextures)if (locTextures[selKey])locTextures[selKey].releaseTexture();
        this._textures = {}
    }, removeTexture: function (texture) {
        if (!texture)return;
        var locTextures = this._textures;
        for (var selKey in locTextures)if (locTextures[selKey] == texture) {
            locTextures[selKey].releaseTexture();
            delete locTextures[selKey]
        }
    }, removeTextureForKey: function (textureKeyName) {
        if (textureKeyName == null)return;
        if (this._textures[textureKeyName])delete this._textures[textureKeyName]
    }, cacheImage: function (path, texture) {
        if (texture instanceof cc.Texture2D) {
            this._textures[path] = texture;
            return
        }
        var texture2d = new cc.Texture2D;
        texture2d.initWithElement(texture);
        texture2d.handleLoadedTexture();
        this._textures[path] = texture2d
    }, addUIImage: function (image, key) {
        cc.assert(image, cc._LogInfos.textureCache_addUIImage_2);
        if (key)if (this._textures[key])return this._textures[key];
        var texture = new cc.Texture2D;
        texture.initWithImage(image);
        if (key != null && texture != null)this._textures[key] = texture; else cc.log(cc._LogInfos.textureCache_addUIImage);
        return texture
    }, dumpCachedTextureInfo: function () {
        var count = 0;
        var totalBytes = 0, locTextures = this._textures;
        for (var key in locTextures) {
            var selTexture = locTextures[key];
            count++;
            if (selTexture.getHtmlElementObj()instanceof HTMLImageElement)cc.log(cc._LogInfos.textureCache_dumpCachedTextureInfo, key, selTexture.getHtmlElementObj().src, selTexture.pixelsWidth, selTexture.pixelsHeight); else cc.log(cc._LogInfos.textureCache_dumpCachedTextureInfo_2, key, selTexture.pixelsWidth, selTexture.pixelsHeight);
            totalBytes += selTexture.pixelsWidth * selTexture.pixelsHeight * 4
        }
        var locTextureColorsCache = this._textureColorsCache;
        for (key in locTextureColorsCache) {
            var selCanvasColorsArr = locTextureColorsCache[key];
            for (var selCanvasKey in selCanvasColorsArr) {
                var selCanvas = selCanvasColorsArr[selCanvasKey];
                count++;
                cc.log("cocos2d: '%s' id\x3d HTMLCanvasElement %s x %s", key, selCanvas.width, selCanvas.height);
                totalBytes += selCanvas.width * selCanvas.height * 4
            }
        }
        cc.log(cc._LogInfos.textureCache_dumpCachedTextureInfo_3, count, totalBytes / 1024, (totalBytes / (1024 * 1024)).toFixed(2))
    }, _clear: function () {
        this._textures = {};
        this._textureColorsCache = {};
        this._textureKeySeq = 0 | Math.random() * 1E3;
        this._loadedTexturesBefore = {}
    }};
if (cc._renderType === cc._RENDER_TYPE_CANVAS) {
    var _p = cc.textureCache;
    _p.handleLoadedTexture = function (url) {
        var locTexs = this._textures;
        var tex = locTexs[url];
        if (!tex) {
            tex = locTexs[url] = new cc.Texture2D;
            tex.url = url
        }
        tex.handleLoadedTexture()
    };
    _p.addImage = function (url, cb, target) {
        cc.assert(url, cc._LogInfos.Texture2D_addImage);
        var locTexs = this._textures;
        var tex = locTexs[url] || locTexs[cc.loader._aliases[url]];
        if (tex) {
            cb && cb.call(target);
            return tex
        }
        if (!cc.loader.getRes(url))if (cc.loader._checkIsImageURL(url))cc.loader.load(url,
            function (err) {
                cb && cb.call(target)
            }); else cc.loader.cache[url] = cc.loader.loadImg(url, function (err, img) {
            if (err)return cb ? cb(err) : err;
            cc.textureCache.handleLoadedTexture(url);
            cb && cb(null, img)
        });
        tex = locTexs[url] = new cc.Texture2D;
        tex.url = url;
        return tex
    };
    _p = null
} else {
    _tmp.WebGLTextureCache();
    delete _tmp.WebGLTextureCache
}
;
cc.Scene = cc.Node.extend({_className: "Scene", ctor: function () {
    cc.Node.prototype.ctor.call(this);
    this._ignoreAnchorPointForPosition = true;
    this.setAnchorPoint(0.5, 0.5);
    this.setContentSize(cc.director.getWinSize())
}});
cc.Scene.create = function () {
    return new cc.Scene
};
cc.LoaderScene = cc.Scene.extend({_interval: null, _length: 0, _count: 0, _label: null, _className: "LoaderScene", init: function () {
    var self = this;
    var winSize = cc.director.getWinSize();
    var logoWidth = 160;
    var logoHeight = 200;
    var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
    var bgLayer = self._bgLayer = cc.LayerColor.create(cc.color(32, 32, 32, 255));
    bgLayer.setPosition(0, 0);
    self.addChild(bgLayer, 0);
    var fontSize = 24, lblHeight = -logoHeight / 2 + 100;
    if (cc._loaderImage) {
        cc.loader.loadImg(cc._loaderImage, {isCrossOrigin: false},
            function (err, img) {
                logoWidth = img.width;
                logoHeight = img.height;
                self._initStage(img, centerPos)
            });
        fontSize = 14;
        lblHeight = -logoHeight / 2 - 10
    }
    var label = self._label = cc.LabelTTF.create("Loading... 0%", "Arial", fontSize);
    label.setPosition(cc.pAdd(centerPos, cc.p(0, lblHeight)));
    label.setColor(cc.color(180, 180, 180));
    bgLayer.addChild(this._label, 10);
    return true
}, _initStage: function (img, centerPos) {
    var self = this;
    var texture2d = self._texture2d = new cc.Texture2D;
    texture2d.initWithElement(img);
    texture2d.handleLoadedTexture();
    var logo = self._logo = cc.Sprite.create(texture2d);
    logo.setScale(cc.contentScaleFactor());
    logo.x = centerPos.x;
    logo.y = centerPos.y;
    self._bgLayer.addChild(logo, 10)
}, onEnter: function () {
    var self = this;
    cc.Node.prototype.onEnter.call(self);
    self.schedule(self._startLoading, 0.3)
}, onExit: function () {
    cc.Node.prototype.onExit.call(this);
    var tmpStr = "Loading... 0%";
    this._label.setString(tmpStr)
}, initWithResources: function (resources, cb) {
    if (typeof resources == "string")resources = [resources];
    this.resources = resources || [];
    this.cb = cb
}, _startLoading: function () {
    var self = this;
    self.unschedule(self._startLoading);
    var res = self.resources;
    self._length = res.length;
    cc.loader.load(res, function (result, count) {
        self._count = count
    }, function () {
        self.cb()
    });
    self.schedule(self._updatePercent)
}, _updatePercent: function () {
    var self = this;
    var count = self._count;
    var length = self._length;
    var percent = count / length * 100 | 0;
    percent = Math.min(percent, 100);
    self._label.setString("Loading... " + percent + "%");
    if (count >= length)self.unschedule(self._updatePercent)
}});
cc.LoaderScene.preload = function (resources, cb) {
    var _cc = cc;
    if (!_cc.loaderScene) {
        _cc.loaderScene = new cc.LoaderScene;
        _cc.loaderScene.init()
    }
    _cc.loaderScene.initWithResources(resources, cb);
    cc.director.runScene(_cc.loaderScene);
    return _cc.loaderScene
};
_tmp.PrototypeLayerRGBA = function () {
    var _p = cc.LayerRGBA.prototype;
    _p.opacityModifyRGB;
    cc.defineGetterSetter(_p, "opacityModifyRGB", _p.isOpacityModifyRGB, _p.setOpacityModifyRGB);
    _p.opacity;
    cc.defineGetterSetter(_p, "opacity", _p.getOpacity, _p.setOpacity);
    _p.cascadeOpacity;
    cc.defineGetterSetter(_p, "cascadeOpacity", _p.isCascadeOpacityEnabled, _p.setCascadeOpacityEnabled);
    _p.color;
    cc.defineGetterSetter(_p, "color", _p.getColor, _p.setColor);
    _p.cascadeColor;
    cc.defineGetterSetter(_p, "cascadeColor", _p.isCascadeColorEnabled,
        _p.setCascadeColorEnabled)
};
_tmp.PrototypeLayerColor = function () {
    var _p = cc.LayerColor.prototype;
    cc.defineGetterSetter(_p, "width", _p._getWidth, _p._setWidth);
    cc.defineGetterSetter(_p, "height", _p._getHeight, _p._setHeight)
};
_tmp.PrototypeLayerGradient = function () {
    var _p = cc.LayerGradient.prototype;
    _p.startColor;
    cc.defineGetterSetter(_p, "startColor", _p.getStartColor, _p.setStartColor);
    _p.endColor;
    cc.defineGetterSetter(_p, "endColor", _p.getEndColor, _p.setEndColor);
    _p.startOpacity;
    cc.defineGetterSetter(_p, "startOpacity", _p.getStartOpacity, _p.setStartOpacity);
    _p.endOpacity;
    cc.defineGetterSetter(_p, "endOpacity", _p.getEndOpacity, _p.setEndOpacity);
    _p.vector;
    cc.defineGetterSetter(_p, "vector", _p.getVector, _p.setVector)
};
cc.Layer = cc.Node.extend({_className: "Layer", ctor: function () {
    var nodep = cc.Node.prototype;
    nodep.ctor.call(this);
    this._ignoreAnchorPointForPosition = true;
    nodep.setAnchorPoint.call(this, 0.5, 0.5);
    nodep.setContentSize.call(this, cc.winSize)
}});
cc.Layer.create = function () {
    var ret = new cc.Layer;
    return ret
};
cc.LayerRGBA = cc.Layer.extend({RGBAProtocol: true, _displayedOpacity: 255, _realOpacity: 255, _displayedColor: null, _realColor: null, _cascadeOpacityEnabled: false, _cascadeColorEnabled: false, _className: "LayerRGBA", ctor: function () {
    cc.Layer.prototype.ctor.call(this);
    this._displayedColor = cc.color(255, 255, 255, 255);
    this._realColor = cc.color(255, 255, 255, 255)
}, init: function () {
    var nodep = cc.Layer.prototype, _t = this;
    _t._ignoreAnchorPointForPosition = true;
    nodep.setAnchorPoint.call(_t, 0.5, 0.5);
    nodep.setContentSize.call(_t,
        cc.winSize);
    _t.cascadeOpacity = false;
    _t.cascadeColor = false;
    return true
}, getOpacity: function () {
    return this._realOpacity
}, getDisplayedOpacity: function () {
    return this._displayedOpacity
}, setOpacity: function (opacity) {
    var _t = this;
    _t._displayedOpacity = _t._realOpacity = opacity;
    var parentOpacity = 255, locParent = _t._parent;
    if (locParent && locParent.RGBAProtocol && locParent.cascadeOpacity)parentOpacity = locParent.getDisplayedOpacity();
    _t.updateDisplayedOpacity(parentOpacity);
    _t._displayedColor.a = _t._realColor.a = opacity
},
    updateDisplayedOpacity: function (parentOpacity) {
        var _t = this;
        _t._displayedOpacity = 0 | _t._realOpacity * parentOpacity / 255;
        if (_t._cascadeOpacityEnabled) {
            var locChildren = _t._children, selItem;
            for (var i = 0; i < locChildren.length; i++) {
                selItem = locChildren[i];
                if (selItem && selItem.RGBAProtocol)selItem.updateDisplayedOpacity(_t._displayedOpacity)
            }
        }
    }, isCascadeOpacityEnabled: function () {
        return this._cascadeOpacityEnabled
    }, setCascadeOpacityEnabled: function (cascadeOpacityEnabled) {
        if (this._cascadeOpacityEnabled === cascadeOpacityEnabled)return;
        this._cascadeOpacityEnabled = cascadeOpacityEnabled;
        if (cascadeOpacityEnabled)this._enableCascadeOpacity(); else this._disableCascadeOpacity()
    }, _enableCascadeOpacity: function () {
        var parentOpacity = 255, locParent = this._parent;
        if (locParent && locParent.RGBAProtocol && locParent.cascadeOpacity)parentOpacity = locParent.getDisplayedOpacity();
        this.updateDisplayedOpacity(parentOpacity)
    }, _disableCascadeOpacity: function () {
        this._displayedOpacity = this._realOpacity;
        var selChildren = this._children, item;
        for (var i = 0; i < selChildren.length; i++) {
            item =
                selChildren[i];
            if (item && item.RGBAProtocol)item.updateDisplayedOpacity(255)
        }
    }, getColor: function () {
        var locRealColor = this._realColor;
        return cc.color(locRealColor.r, locRealColor.g, locRealColor.b, locRealColor.a)
    }, getDisplayedColor: function () {
        var locDisplayedColor = this._displayedColor;
        return cc.color(locDisplayedColor.r, locDisplayedColor.g, locDisplayedColor.b)
    }, setColor: function (color) {
        var locDisplayed = this._displayedColor, locRealColor = this._realColor;
        locDisplayed.r = locRealColor.r = color.r;
        locDisplayed.g =
            locRealColor.g = color.g;
        locDisplayed.b = locRealColor.b = color.b;
        var parentColor, locParent = this._parent;
        if (locParent && locParent.RGBAProtocol && locParent.cascadeColor)parentColor = locParent.getDisplayedColor(); else parentColor = cc.color.WHITE;
        this.updateDisplayedColor(parentColor);
        if (color.a !== undefined && !color.a_undefined)this.setOpacity(color.a)
    }, updateDisplayedColor: function (parentColor) {
        var locDisplayedColor = this._displayedColor, locRealColor = this._realColor;
        locDisplayedColor.r = 0 | locRealColor.r * parentColor.r /
            255;
        locDisplayedColor.g = 0 | locRealColor.g * parentColor.g / 255;
        locDisplayedColor.b = 0 | locRealColor.b * parentColor.b / 255;
        if (this._cascadeColorEnabled) {
            var locChildren = this._children, selItem;
            for (var i = 0; i < locChildren.length; i++) {
                selItem = locChildren[i];
                if (selItem && selItem.RGBAProtocol)selItem.updateDisplayedColor(locDisplayedColor)
            }
        }
    }, isCascadeColorEnabled: function () {
        return this._cascadeColorEnabled
    }, setCascadeColorEnabled: function (cascadeColorEnabled) {
        if (this._cascadeColorEnabled === cascadeColorEnabled)return;
        this._cascadeColorEnabled = cascadeColorEnabled;
        if (this._cascadeColorEnabled)this._enableCascadeColor(); else this._disableCascadeColor()
    }, _enableCascadeColor: function () {
        var parentColor, locParent = this._parent;
        if (locParent && locParent.RGBAProtocol && locParent.cascadeColor)parentColor = locParent.getDisplayedColor(); else parentColor = cc.color.WHITE;
        this.updateDisplayedColor(parentColor)
    }, _disableCascadeColor: function () {
        var locDisplayedColor = this._displayedColor, locRealColor = this._realColor;
        locDisplayedColor.r =
            locRealColor.r;
        locDisplayedColor.g = locRealColor.g;
        locDisplayedColor.b = locRealColor.b;
        var selChildren = this._children, whiteColor = cc.color.WHITE, item, i;
        for (i = 0; i < selChildren.length; i++) {
            item = selChildren[i];
            if (item && item.RGBAProtocol)item.updateDisplayedColor(whiteColor)
        }
    }, addChild: function (child, zOrder, tag) {
        cc.Node.prototype.addChild.call(this, child, zOrder, tag);
        if (this._cascadeColorEnabled)this._enableCascadeColor();
        if (this._cascadeOpacityEnabled)this._enableCascadeOpacity()
    }, setOpacityModifyRGB: function (bValue) {
    },
    isOpacityModifyRGB: function () {
        return false
    }});
_tmp.PrototypeLayerRGBA();
delete _tmp.PrototypeLayerRGBA;
cc.LayerColor = cc.LayerRGBA.extend({_blendFunc: null, _className: "LayerColor", getBlendFunc: function () {
    return this._blendFunc
}, changeWidthAndHeight: function (w, h) {
    this.width = w;
    this.height = h
}, changeWidth: function (w) {
    this.width = w
}, changeHeight: function (h) {
    this.height = h
}, setOpacityModifyRGB: function (value) {
}, isOpacityModifyRGB: function () {
    return false
}, setColor: function (color) {
    cc.LayerRGBA.prototype.setColor.call(this, color);
    this._updateColor()
}, setOpacity: function (opacity) {
    cc.LayerRGBA.prototype.setOpacity.call(this,
        opacity);
    this._updateColor()
}, _isLighterMode: false, ctor: null, init: function (color, width, height) {
    if (cc._renderType !== cc._RENDER_TYPE_CANVAS)this.shaderProgram = cc.shaderCache.programForKey(cc.SHADER_POSITION_COLOR);
    var winSize = cc.director.getWinSize();
    color = color || cc.color(0, 0, 0, 255);
    width = width === undefined ? winSize.width : width;
    height = height === undefined ? winSize.height : height;
    var locDisplayedColor = this._displayedColor;
    locDisplayedColor.r = color.r;
    locDisplayedColor.g = color.g;
    locDisplayedColor.b = color.b;
    var locRealColor = this._realColor;
    locRealColor.r = color.r;
    locRealColor.g = color.g;
    locRealColor.b = color.b;
    this._displayedOpacity = color.a;
    this._realOpacity = color.a;
    var proto = cc.LayerColor.prototype;
    proto.setContentSize.call(this, width, height);
    proto._updateColor.call(this);
    return true
}, setBlendFunc: function (src, dst) {
    var _t = this;
    if (dst === undefined)_t._blendFunc = src; else _t._blendFunc = {src: src, dst: dst};
    if (cc._renderType === cc._RENDER_TYPE_CANVAS)_t._isLighterMode = _t._blendFunc && _t._blendFunc.src == 1 && _t._blendFunc.dst ==
        771
}, _setWidth: null, _setHeight: null, _updateColor: null, updateDisplayedColor: function (parentColor) {
    cc.LayerRGBA.prototype.updateDisplayedColor.call(this, parentColor);
    this._updateColor()
}, updateDisplayedOpacity: function (parentOpacity) {
    cc.LayerRGBA.prototype.updateDisplayedOpacity.call(this, parentOpacity);
    this._updateColor()
}, draw: null});
cc.LayerColor.create = function (color, width, height) {
    return new cc.LayerColor(color, width, height)
};
if (cc._renderType === cc._RENDER_TYPE_CANVAS) {
    var _p = cc.LayerColor.prototype;
    _p.ctor = function (color, width, height) {
        cc.LayerRGBA.prototype.ctor.call(this);
        this._blendFunc = new cc.BlendFunc(cc.BLEND_SRC, cc.BLEND_DST);
        cc.LayerColor.prototype.init.call(this, color, width, height)
    };
    _p._setWidth = cc.LayerRGBA.prototype._setWidth;
    _p._setHeight = cc.LayerRGBA.prototype._setHeight;
    _p._updateColor = function () {
    };
    _p.draw = function (ctx) {
        var context = ctx || cc._renderContext, _t = this;
        var locEGLViewer = cc.view, locDisplayedColor =
            _t._displayedColor;
        context.fillStyle = "rgba(" + (0 | locDisplayedColor.r) + "," + (0 | locDisplayedColor.g) + "," + (0 | locDisplayedColor.b) + "," + _t._displayedOpacity / 255 + ")";
        context.fillRect(0, 0, _t.width * locEGLViewer.getScaleX(), -_t.height * locEGLViewer.getScaleY());
        cc.g_NumberOfDraws++
    };
    _p = null
} else {
    _tmp.WebGLLayerColor();
    delete _tmp.WebGLLayerColor
}
_tmp.PrototypeLayerColor();
delete _tmp.PrototypeLayerColor;
cc.LayerGradient = cc.LayerColor.extend({_startColor: null, _endColor: null, _startOpacity: 255, _endOpacity: 255, _alongVector: null, _compressedInterpolation: false, _gradientStartPoint: null, _gradientEndPoint: null, _className: "LayerGradient", ctor: function (start, end, v) {
    var _t = this;
    cc.LayerColor.prototype.ctor.call(_t);
    _t._startColor = cc.color(0, 0, 0, 255);
    _t._endColor = cc.color(0, 0, 0, 255);
    _t._alongVector = cc.p(0, -1);
    _t._startOpacity = 255;
    _t._endOpacity = 255;
    _t._gradientStartPoint = cc.p(0, 0);
    _t._gradientEndPoint = cc.p(0,
        0);
    cc.LayerGradient.prototype.init.call(_t, start, end, v)
}, init: function (start, end, v) {
    start = start || cc.color(0, 0, 0, 255);
    end = end || cc.color(0, 0, 0, 255);
    v = v || cc.p(0, -1);
    var _t = this;
    var locStartColor = _t._startColor, locEndColor = _t._endColor;
    locStartColor.r = start.r;
    locStartColor.g = start.g;
    locStartColor.b = start.b;
    _t._startOpacity = start.a;
    locEndColor.r = end.r;
    locEndColor.g = end.g;
    locEndColor.b = end.b;
    _t._endOpacity = end.a;
    _t._alongVector = v;
    _t._compressedInterpolation = true;
    _t._gradientStartPoint = cc.p(0, 0);
    _t._gradientEndPoint =
        cc.p(0, 0);
    cc.LayerColor.prototype.init.call(_t, cc.color(start.r, start.g, start.b, 255));
    cc.LayerGradient.prototype._updateColor.call(_t);
    return true
}, setContentSize: function (size, height) {
    cc.LayerColor.prototype.setContentSize.call(this, size, height);
    this._updateColor()
}, _setWidth: function (width) {
    cc.LayerColor.prototype._setWidth.call(this, width);
    this._updateColor()
}, _setHeight: function (height) {
    cc.LayerColor.prototype._setHeight.call(this, height);
    this._updateColor()
}, getStartColor: function () {
    return this._realColor
},
    setStartColor: function (color) {
        this.color = color
    }, setEndColor: function (color) {
        this._endColor = color;
        this._updateColor()
    }, getEndColor: function () {
        return this._endColor
    }, setStartOpacity: function (o) {
        this._startOpacity = o;
        this._updateColor()
    }, getStartOpacity: function () {
        return this._startOpacity
    }, setEndOpacity: function (o) {
        this._endOpacity = o;
        this._updateColor()
    }, getEndOpacity: function () {
        return this._endOpacity
    }, setVector: function (Var) {
        this._alongVector.x = Var.x;
        this._alongVector.y = Var.y;
        this._updateColor()
    },
    getVector: function () {
        return cc.p(this._alongVector.x, this._alongVector.y)
    }, isCompressedInterpolation: function () {
        return this._compressedInterpolation
    }, setCompressedInterpolation: function (compress) {
        this._compressedInterpolation = compress;
        this._updateColor()
    }, _draw: null, _updateColor: null});
cc.LayerGradient.create = function (start, end, v) {
    return new cc.LayerGradient(start, end, v)
};
if (cc._renderType === cc._RENDER_TYPE_CANVAS) {
    var _p = cc.LayerGradient.prototype;
    _p.draw = function (ctx) {
        var context = ctx || cc._renderContext, _t = this;
        if (_t._isLighterMode)context.globalCompositeOperation = "lighter";
        context.save();
        var locEGLViewer = cc.view, opacityf = _t._displayedOpacity / 255;
        var tWidth = _t.width * locEGLViewer.getScaleX(), tHeight = _t.height * locEGLViewer.getScaleY();
        var tGradient = context.createLinearGradient(_t._gradientStartPoint.x, _t._gradientStartPoint.y, _t._gradientEndPoint.x, _t._gradientEndPoint.y);
        var locDisplayedColor = _t._displayedColor, locEndColor = _t._endColor;
        tGradient.addColorStop(0, "rgba(" + Math.round(locDisplayedColor.r) + "," + Math.round(locDisplayedColor.g) + "," + Math.round(locDisplayedColor.b) + "," + (opacityf * (_t._startOpacity / 255)).toFixed(4) + ")");
        tGradient.addColorStop(1, "rgba(" + Math.round(locEndColor.r) + "," + Math.round(locEndColor.g) + "," + Math.round(locEndColor.b) + "," + (opacityf * (_t._endOpacity / 255)).toFixed(4) + ")");
        context.fillStyle = tGradient;
        context.fillRect(0, 0, tWidth, -tHeight);
        if (_t._rotation !=
            0)context.rotate(_t._rotationRadians);
        context.restore()
    };
    _p._updateColor = function () {
        var _t = this;
        var locAlongVector = _t._alongVector, tWidth = _t.width * 0.5, tHeight = _t.height * 0.5;
        _t._gradientStartPoint.x = tWidth * -locAlongVector.x + tWidth;
        _t._gradientStartPoint.y = tHeight * locAlongVector.y - tHeight;
        _t._gradientEndPoint.x = tWidth * locAlongVector.x + tWidth;
        _t._gradientEndPoint.y = tHeight * -locAlongVector.y - tHeight
    };
    _p = null
} else {
    _tmp.WebGLLayerGradient();
    delete _tmp.WebGLLayerGradient
}
_tmp.PrototypeLayerGradient();
delete _tmp.PrototypeLayerGradient;
cc.LayerMultiplex = cc.Layer.extend({_enabledLayer: 0, _layers: null, _className: "LayerMultiplex", ctor: function (layers) {
    cc.Layer.prototype.ctor.call(this);
    layers && cc.LayerMultiplex.prototype.initWithLayers.call(this, layers)
}, initWithLayers: function (layers) {
    if (layers.length > 0 && layers[layers.length - 1] == null)cc.log(cc._LogInfos.LayerMultiplex_initWithLayers);
    this._layers = layers;
    this._enabledLayer = 0;
    this.addChild(this._layers[this._enabledLayer]);
    return true
}, switchTo: function (n) {
    if (n >= this._layers.length) {
        cc.log(cc._LogInfos.LayerMultiplex_switchTo);
        return
    }
    this.removeChild(this._layers[this._enabledLayer], true);
    this._enabledLayer = n;
    this.addChild(this._layers[n])
}, switchToAndReleaseMe: function (n) {
    if (n >= this._layers.length) {
        cc.log(cc._LogInfos.LayerMultiplex_switchToAndReleaseMe);
        return
    }
    this.removeChild(this._layers[this._enabledLayer], true);
    this._layers[this._enabledLayer] = null;
    this._enabledLayer = n;
    this.addChild(this._layers[n])
}, addLayer: function (layer) {
    if (!layer) {
        cc.log(cc._LogInfos.LayerMultiplex_addLayer);
        return
    }
    this._layers.push(layer)
}});
cc.LayerMultiplex.create = function () {
    return new cc.LayerMultiplex(arguments)
};
_tmp.PrototypeSprite = function () {
    var _p = cc.Sprite.prototype;
    cc.defineGetterSetter(_p, "opacityModifyRGB", _p.isOpacityModifyRGB, _p.setOpacityModifyRGB);
    cc.defineGetterSetter(_p, "opacity", _p.getOpacity, _p.setOpacity);
    cc.defineGetterSetter(_p, "color", _p.getColor, _p.setColor);
    _p.dirty;
    _p.flippedX;
    cc.defineGetterSetter(_p, "flippedX", _p.isFlippedX, _p.setFlippedX);
    _p.flippedY;
    cc.defineGetterSetter(_p, "flippedY", _p.isFlippedY, _p.setFlippedY);
    _p.offsetX;
    cc.defineGetterSetter(_p, "offsetX", _p._getOffsetX);
    _p.offsetY;
    cc.defineGetterSetter(_p, "offsetY", _p._getOffsetY);
    _p.atlasIndex;
    _p.texture;
    cc.defineGetterSetter(_p, "texture", _p.getTexture, _p.setTexture);
    _p.textureRectRotated;
    cc.defineGetterSetter(_p, "textureRectRotated", _p.isTextureRectRotated);
    _p.textureAtlas;
    _p.batchNode;
    cc.defineGetterSetter(_p, "batchNode", _p.getBatchNode, _p.setBatchNode);
    _p.quad;
    cc.defineGetterSetter(_p, "quad", _p.getQuad)
};
cc.generateTextureCacheForColor = function (texture) {
    if (texture.channelCache)return texture.channelCache;
    var textureCache = [cc.newElement("canvas"), cc.newElement("canvas"), cc.newElement("canvas"), cc.newElement("canvas")];

    function renderToCache() {
        var ref = cc.generateTextureCacheForColor;
        var w = texture.width;
        var h = texture.height;
        textureCache[0].width = w;
        textureCache[0].height = h;
        textureCache[1].width = w;
        textureCache[1].height = h;
        textureCache[2].width = w;
        textureCache[2].height = h;
        textureCache[3].width = w;
        textureCache[3].height =
            h;
        ref.canvas.width = w;
        ref.canvas.height = h;
        var ctx = ref.canvas.getContext("2d");
        ctx.drawImage(texture, 0, 0);
        ref.tempCanvas.width = w;
        ref.tempCanvas.height = h;
        var pixels = ctx.getImageData(0, 0, w, h).data;
        for (var rgbI = 0; rgbI < 4; rgbI++) {
            var cacheCtx = textureCache[rgbI].getContext("2d");
            cacheCtx.getImageData(0, 0, w, h).data;
            ref.tempCtx.drawImage(texture, 0, 0);
            var to = ref.tempCtx.getImageData(0, 0, w, h);
            var toData = to.data;
            for (var i = 0; i < pixels.length; i += 4) {
                toData[i] = rgbI === 0 ? pixels[i] : 0;
                toData[i + 1] = rgbI === 1 ? pixels[i + 1] :
                    0;
                toData[i + 2] = rgbI === 2 ? pixels[i + 2] : 0;
                toData[i + 3] = pixels[i + 3]
            }
            cacheCtx.putImageData(to, 0, 0)
        }
        texture.onload = null
    }

    try {
        renderToCache()
    } catch (e) {
        texture.onload = renderToCache
    }
    texture.channelCache = textureCache;
    return textureCache
};
cc.generateTextureCacheForColor.canvas = cc.newElement("canvas");
cc.generateTextureCacheForColor.tempCanvas = cc.newElement("canvas");
cc.generateTextureCacheForColor.tempCtx = cc.generateTextureCacheForColor.tempCanvas.getContext("2d");
cc.generateTintImage2 = function (texture, color, rect) {
    if (!rect) {
        rect = cc.rect(0, 0, texture.width, texture.height);
        rect = cc.rectPixelsToPoints(rect)
    }
    var buff = cc.newElement("canvas");
    var ctx = buff.getContext("2d");
    if (buff.width != rect.width)buff.width = rect.width;
    if (buff.height != rect.height)buff.height = rect.height;
    ctx.save();
    ctx.drawImage(texture, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
    ctx.globalCompositeOperation = "source-in";
    ctx.globalAlpha = color.a / 255;
    ctx.fillStyle = "rgb(" + color.r + "," +
        color.g + "," + color.b + ")";
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.restore();
    return buff
};
cc.generateTintImage = function (texture, tintedImgCache, color, rect, renderCanvas) {
    if (!rect)rect = cc.rect(0, 0, texture.width, texture.height);
    var r = color.r / 255;
    var g = color.g / 255;
    var b = color.b / 255;
    var w = Math.min(rect.width, tintedImgCache[0].width);
    var h = Math.min(rect.height, tintedImgCache[0].height);
    var buff = renderCanvas;
    var ctx;
    if (!buff) {
        buff = cc.newElement("canvas");
        buff.width = w;
        buff.height = h;
        ctx = buff.getContext("2d")
    } else {
        ctx = buff.getContext("2d");
        ctx.clearRect(0, 0, w, h)
    }
    ctx.save();
    ctx.globalCompositeOperation =
        "lighter";
    var a = ctx.globalAlpha;
    if (r > 0) {
        ctx.globalAlpha = r * a;
        ctx.drawImage(tintedImgCache[0], rect.x, rect.y, w, h, 0, 0, w, h)
    }
    if (g > 0) {
        ctx.globalAlpha = g * a;
        ctx.drawImage(tintedImgCache[1], rect.x, rect.y, w, h, 0, 0, w, h)
    }
    if (b > 0) {
        ctx.globalAlpha = b * a;
        ctx.drawImage(tintedImgCache[2], rect.x, rect.y, w, h, 0, 0, w, h)
    }
    if (r + g + b < 1) {
        ctx.globalAlpha = a;
        ctx.drawImage(tintedImgCache[3], rect.x, rect.y, w, h, 0, 0, w, h)
    }
    ctx.restore();
    return buff
};
cc.cutRotateImageToCanvas = function (texture, rect) {
    if (!texture)return null;
    if (!rect)return texture;
    var nCanvas = cc.newElement("canvas");
    nCanvas.width = rect.width;
    nCanvas.height = rect.height;
    var ctx = nCanvas.getContext("2d");
    ctx.translate(nCanvas.width / 2, nCanvas.height / 2);
    ctx.rotate(-1.5707963267948966);
    ctx.drawImage(texture, rect.x, rect.y, rect.height, rect.width, -rect.height / 2, -rect.width / 2, rect.height, rect.width);
    return nCanvas
};
cc.Sprite = cc.NodeRGBA.extend({RGBAProtocol: true, dirty: false, atlasIndex: 0, textureAtlas: null, _batchNode: null, _recursiveDirty: null, _hasChildren: null, _shouldBeHidden: false, _transformToBatch: null, _blendFunc: null, _texture: null, _rect: null, _rectRotated: false, _offsetPosition: null, _unflippedOffsetPositionFromCenter: null, _opacityModifyRGB: false, _flippedX: false, _flippedY: false, _textureLoaded: false, _loadedEventListeners: null, _newTextureWhenChangeColor: null, _className: "Sprite", textureLoaded: function () {
    return this._textureLoaded
},
    addLoadedEventListener: function (callback, target) {
        if (!this._loadedEventListeners)this._loadedEventListeners = [];
        this._loadedEventListeners.push({eventCallback: callback, eventTarget: target})
    }, _callLoadedEventCallbacks: function () {
        if (!this._loadedEventListeners)return;
        var locListeners = this._loadedEventListeners;
        for (var i = 0, len = locListeners.length; i < len; i++) {
            var selCallback = locListeners[i];
            selCallback.eventCallback.call(selCallback.eventTarget, this)
        }
        locListeners.length = 0
    }, isDirty: function () {
        return this.dirty
    },
    setDirty: function (bDirty) {
        this.dirty = bDirty
    }, isTextureRectRotated: function () {
        return this._rectRotated
    }, getAtlasIndex: function () {
        return this.atlasIndex
    }, setAtlasIndex: function (atlasIndex) {
        this.atlasIndex = atlasIndex
    }, getTextureRect: function () {
        return cc.rect(this._rect.x, this._rect.y, this._rect.width, this._rect.height)
    }, getTextureAtlas: function () {
        return this.textureAtlas
    }, setTextureAtlas: function (textureAtlas) {
        this.textureAtlas = textureAtlas
    }, getOffsetPosition: function () {
        return this._offsetPosition
    },
    _getOffsetX: function () {
        return this._offsetPosition.x
    }, _getOffsetY: function () {
        return this._offsetPosition.y
    }, getBlendFunc: function () {
        return this._blendFunc
    }, initWithSpriteFrame: function (spriteFrame) {
        cc.assert(spriteFrame, cc._LogInfos.Sprite_initWithSpriteFrame);
        if (!spriteFrame.textureLoaded()) {
            this._textureLoaded = false;
            spriteFrame.addLoadedEventListener(this._spriteFrameLoadedCallback, this)
        }
        var ret = this.initWithTexture(spriteFrame.getTexture(), spriteFrame.getRect());
        this.setSpriteFrame(spriteFrame);
        return ret
    }, _spriteFrameLoadedCallback: null, initWithSpriteFrameName: function (spriteFrameName) {
        cc.assert(spriteFrameName, cc._LogInfos.Sprite_initWithSpriteFrameName);
        var frame = cc.spriteFrameCache.getSpriteFrame(spriteFrameName);
        cc.assert(frame, spriteFrameName + cc._LogInfos.Sprite_initWithSpriteFrameName1);
        return this.initWithSpriteFrame(frame)
    }, useBatchNode: function (batchNode) {
        this.textureAtlas = batchNode.textureAtlas;
        this._batchNode = batchNode
    }, setVertexRect: function (rect) {
        this._rect.x = rect.x;
        this._rect.y =
            rect.y;
        this._rect.width = rect.width;
        this._rect.height = rect.height
    }, sortAllChildren: function () {
        if (this._reorderChildDirty) {
            var j, tempItem, locChildren = this._children, tempChild;
            for (var i = 1; i < locChildren.length; i++) {
                tempItem = locChildren[i];
                j = i - 1;
                tempChild = locChildren[j];
                while (j >= 0 && (tempItem._localZOrder < tempChild._localZOrder || tempItem._localZOrder == tempChild._localZOrder && tempItem.arrivalOrder < tempChild.arrivalOrder)) {
                    locChildren[j + 1] = tempChild;
                    j = j - 1;
                    tempChild = locChildren[j]
                }
                locChildren[j + 1] = tempItem
            }
            if (this._batchNode)this._arrayMakeObjectsPerformSelector(locChildren,
                cc.Node.StateCallbackType.sortAllChildren);
            this._reorderChildDirty = false
        }
    }, reorderChild: function (child, zOrder) {
        cc.assert(child, cc._LogInfos.Sprite_reorderChild_2);
        if (this._children.indexOf(child) === -1) {
            cc.log(cc._LogInfos.Sprite_reorderChild);
            return
        }
        if (zOrder === child.zIndex)return;
        if (this._batchNode && !this._reorderChildDirty) {
            this._setReorderChildDirtyRecursively();
            this._batchNode.reorderBatch(true)
        }
        cc.Node.prototype.reorderChild.call(this, child, zOrder)
    }, removeChild: function (child, cleanup) {
        if (this._batchNode)this._batchNode.removeSpriteFromAtlas(child);
        cc.Node.prototype.removeChild.call(this, child, cleanup)
    }, removeAllChildren: function (cleanup) {
        var locChildren = this._children, locBatchNode = this._batchNode;
        if (locBatchNode && locChildren != null)for (var i = 0, len = locChildren.length; i < len; i++)locBatchNode.removeSpriteFromAtlas(locChildren[i]);
        cc.Node.prototype.removeAllChildren.call(this, cleanup);
        this._hasChildren = false
    }, setDirtyRecursively: function (value) {
        this._recursiveDirty = value;
        this.dirty = value;
        var locChildren = this._children, child, l = locChildren ? locChildren.length :
            0;
        for (var i = 0; i < l; i++) {
            child = locChildren[i];
            child instanceof cc.Sprite && child.setDirtyRecursively(true)
        }
    }, setNodeDirty: function (norecursive) {
        cc.Node.prototype.setNodeDirty.call(this);
        if (!norecursive && this._batchNode && !this._recursiveDirty)if (this._hasChildren)this.setDirtyRecursively(true); else {
            this._recursiveDirty = true;
            this.dirty = true
        }
    }, ignoreAnchorPointForPosition: function (relative) {
        if (this._batchNode) {
            cc.log(cc._LogInfos.Sprite_ignoreAnchorPointForPosition);
            return
        }
        cc.Node.prototype.ignoreAnchorPointForPosition.call(this,
            relative)
    }, setFlippedX: function (flippedX) {
        if (this._flippedX != flippedX) {
            this._flippedX = flippedX;
            this.setTextureRect(this._rect, this._rectRotated, this._contentSize);
            this.setNodeDirty(true)
        }
    }, setFlippedY: function (flippedY) {
        if (this._flippedY != flippedY) {
            this._flippedY = flippedY;
            this.setTextureRect(this._rect, this._rectRotated, this._contentSize);
            this.setNodeDirty(true)
        }
    }, isFlippedX: function () {
        return this._flippedX
    }, isFlippedY: function () {
        return this._flippedY
    }, setOpacityModifyRGB: null, isOpacityModifyRGB: function () {
        return this._opacityModifyRGB
    },
    updateDisplayedOpacity: null, setDisplayFrameWithAnimationName: function (animationName, frameIndex) {
        cc.assert(animationName, cc._LogInfos.Sprite_setDisplayFrameWithAnimationName_3);
        var cache = cc.animationCache.getAnimation(animationName);
        if (!cache) {
            cc.log(cc._LogInfos.Sprite_setDisplayFrameWithAnimationName);
            return
        }
        var animFrame = cache.getFrames()[frameIndex];
        if (!animFrame) {
            cc.log(cc._LogInfos.Sprite_setDisplayFrameWithAnimationName_2);
            return
        }
        this.setSpriteFrame(animFrame.getSpriteFrame())
    }, getBatchNode: function () {
        return this._batchNode
    },
    _setReorderChildDirtyRecursively: function () {
        if (!this._reorderChildDirty) {
            this._reorderChildDirty = true;
            var pNode = this._parent;
            while (pNode && pNode != this._batchNode) {
                pNode._setReorderChildDirtyRecursively();
                pNode = pNode.parent
            }
        }
    }, getTexture: function () {
        return this._texture
    }, _quad: null, _quadWebBuffer: null, _quadDirty: false, _colorized: false, _isLighterMode: false, _originalTexture: null, _textureRect_Canvas: null, _drawSize_Canvas: null, ctor: null, _softInit: function (fileName, rect) {
        if (fileName === undefined)cc.Sprite.prototype.init.call(this);
        else if (typeof fileName === "string")if (fileName[0] === "#") {
            var frameName = fileName.substr(1, fileName.length - 1);
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
            this.initWithSpriteFrame(spriteFrame)
        } else cc.Sprite.prototype.init.call(this, fileName, rect); else if (typeof fileName === "object")if (fileName instanceof cc.Texture2D)this.initWithTexture(fileName, rect); else if (fileName instanceof cc.SpriteFrame)this.initWithSpriteFrame(fileName); else if (fileName instanceof HTMLImageElement || fileName instanceof
            HTMLCanvasElement) {
            var texture2d = new cc.Texture2D;
            texture2d.initWithElement(fileName);
            texture2d.handleLoadedTexture();
            this.initWithTexture(texture2d)
        }
    }, getQuad: function () {
        return this._quad
    }, setBlendFunc: null, init: null, initWithFile: function (filename, rect) {
        cc.assert(filename, cc._LogInfos.Sprite_initWithFile);
        var texture = cc.textureCache.textureForKey(filename);
        if (!texture) {
            texture = cc.textureCache.addImage(filename);
            return this.initWithTexture(texture, rect)
        } else {
            if (!rect) {
                var size = texture.getContentSize();
                rect = cc.rect(0, 0, size.width, size.height)
            }
            return this.initWithTexture(texture, rect)
        }
    }, initWithTexture: null, _textureLoadedCallback: null, setTextureRect: null, updateTransform: null, addChild: null, updateColor: function () {
        var locDisplayedColor = this._displayedColor, locDisplayedOpacity = this._displayedOpacity;
        var color4 = {r: locDisplayedColor.r, g: locDisplayedColor.g, b: locDisplayedColor.b, a: locDisplayedOpacity};
        if (this._opacityModifyRGB) {
            color4.r *= locDisplayedOpacity / 255;
            color4.g *= locDisplayedOpacity / 255;
            color4.b *=
                locDisplayedOpacity / 255
        }
        var locQuad = this._quad;
        locQuad.bl.colors = color4;
        locQuad.br.colors = color4;
        locQuad.tl.colors = color4;
        locQuad.tr.colors = color4;
        if (this._batchNode)if (this.atlasIndex != cc.Sprite.INDEX_NOT_INITIALIZED)this.textureAtlas.updateQuad(locQuad, this.atlasIndex); else this.dirty = true;
        this._quadDirty = true
    }, setOpacity: null, setColor: null, updateDisplayedColor: null, setSpriteFrame: null, setDisplayFrame: function (newFrame) {
        cc.log(cc._LogInfos.Sprite_setDisplayFrame);
        this.setSpriteFrame(newFrame)
    },
    isFrameDisplayed: null, displayFrame: function () {
        return cc.SpriteFrame.create(this._texture, cc.rectPointsToPixels(this._rect), this._rectRotated, cc.pointPointsToPixels(this._unflippedOffsetPositionFromCenter), cc.sizePointsToPixels(this._contentSize))
    }, setBatchNode: null, setTexture: null, _updateBlendFunc: function () {
        if (this._batchNode) {
            cc.log(cc._LogInfos.Sprite__updateBlendFunc);
            return
        }
        if (!this._texture || !this._texture.hasPremultipliedAlpha()) {
            this._blendFunc.src = cc.SRC_ALPHA;
            this._blendFunc.dst = cc.ONE_MINUS_SRC_ALPHA;
            this.opacityModifyRGB = false
        } else {
            this._blendFunc.src = cc.BLEND_SRC;
            this._blendFunc.dst = cc.BLEND_DST;
            this.opacityModifyRGB = true
        }
    }, _changeTextureColor: function () {
        var locElement, locTexture = this._texture, locRect = this._textureRect_Canvas;
        if (locTexture && locRect.validRect && this._originalTexture) {
            locElement = locTexture.getHtmlElementObj();
            if (!locElement)return;
            var cacheTextureForColor = cc.textureCache.getTextureColors(this._originalTexture.getHtmlElementObj());
            if (cacheTextureForColor) {
                this._colorized = true;
                if (locElement instanceof
                    HTMLCanvasElement && !this._rectRotated && !this._newTextureWhenChangeColor)cc.generateTintImage(locElement, cacheTextureForColor, this._displayedColor, locRect, locElement); else {
                    locElement = cc.generateTintImage(locElement, cacheTextureForColor, this._displayedColor, locRect);
                    locTexture = new cc.Texture2D;
                    locTexture.initWithElement(locElement);
                    locTexture.handleLoadedTexture();
                    this.texture = locTexture
                }
            }
        }
    }, _setTextureCoords: function (rect) {
        rect = cc.rectPointsToPixels(rect);
        var tex = this._batchNode ? this.textureAtlas.texture :
            this._texture;
        if (!tex)return;
        var atlasWidth = tex.pixelsWidth;
        var atlasHeight = tex.pixelsHeight;
        var left, right, top, bottom, tempSwap, locQuad = this._quad;
        if (this._rectRotated) {
            if (cc.FIX_ARTIFACTS_BY_STRECHING_TEXEL) {
                left = (2 * rect.x + 1) / (2 * atlasWidth);
                right = left + (rect.height * 2 - 2) / (2 * atlasWidth);
                top = (2 * rect.y + 1) / (2 * atlasHeight);
                bottom = top + (rect.width * 2 - 2) / (2 * atlasHeight)
            } else {
                left = rect.x / atlasWidth;
                right = (rect.x + rect.height) / atlasWidth;
                top = rect.y / atlasHeight;
                bottom = (rect.y + rect.width) / atlasHeight
            }
            if (this._flippedX) {
                tempSwap =
                    top;
                top = bottom;
                bottom = tempSwap
            }
            if (this._flippedY) {
                tempSwap = left;
                left = right;
                right = tempSwap
            }
            locQuad.bl.texCoords.u = left;
            locQuad.bl.texCoords.v = top;
            locQuad.br.texCoords.u = left;
            locQuad.br.texCoords.v = bottom;
            locQuad.tl.texCoords.u = right;
            locQuad.tl.texCoords.v = top;
            locQuad.tr.texCoords.u = right;
            locQuad.tr.texCoords.v = bottom
        } else {
            if (cc.FIX_ARTIFACTS_BY_STRECHING_TEXEL) {
                left = (2 * rect.x + 1) / (2 * atlasWidth);
                right = left + (rect.width * 2 - 2) / (2 * atlasWidth);
                top = (2 * rect.y + 1) / (2 * atlasHeight);
                bottom = top + (rect.height * 2 - 2) /
                    (2 * atlasHeight)
            } else {
                left = rect.x / atlasWidth;
                right = (rect.x + rect.width) / atlasWidth;
                top = rect.y / atlasHeight;
                bottom = (rect.y + rect.height) / atlasHeight
            }
            if (this._flippedX) {
                tempSwap = left;
                left = right;
                right = tempSwap
            }
            if (this._flippedY) {
                tempSwap = top;
                top = bottom;
                bottom = tempSwap
            }
            locQuad.bl.texCoords.u = left;
            locQuad.bl.texCoords.v = bottom;
            locQuad.br.texCoords.u = right;
            locQuad.br.texCoords.v = bottom;
            locQuad.tl.texCoords.u = left;
            locQuad.tl.texCoords.v = top;
            locQuad.tr.texCoords.u = right;
            locQuad.tr.texCoords.v = top
        }
        this._quadDirty =
            true
    }, draw: null});
cc.Sprite.create = function (fileName, rect) {
    return new cc.Sprite(fileName, rect)
};
cc.Sprite.INDEX_NOT_INITIALIZED = -1;
if (cc._renderType === cc._RENDER_TYPE_CANVAS) {
    var _p = cc.Sprite.prototype;
    _p._spriteFrameLoadedCallback = function (spriteFrame) {
        var _t = this;
        _t.setNodeDirty(true);
        _t.setTextureRect(spriteFrame.getRect(), spriteFrame.isRotated(), spriteFrame.getOriginalSize());
        var curColor = _t.color;
        if (curColor.r !== 255 || curColor.g !== 255 || curColor.b !== 255)_t._changeTextureColor();
        _t._callLoadedEventCallbacks()
    };
    _p.setOpacityModifyRGB = function (modify) {
        if (this._opacityModifyRGB !== modify) {
            this._opacityModifyRGB = modify;
            this.setNodeDirty(true)
        }
    };
    _p.updateDisplayedOpacity = function (parentOpacity) {
        cc.NodeRGBA.prototype.updateDisplayedOpacity.call(this, parentOpacity);
        this._setNodeDirtyForCache()
    };
    _p.ctor = function (fileName, rect) {
        var self = this;
        cc.NodeRGBA.prototype.ctor.call(self);
        self._shouldBeHidden = false;
        self._offsetPosition = cc.p(0, 0);
        self._unflippedOffsetPositionFromCenter = cc.p(0, 0);
        self._blendFunc = {src: cc.BLEND_SRC, dst: cc.BLEND_DST};
        self._rect = cc.rect(0, 0, 0, 0);
        self._newTextureWhenChangeColor = false;
        self._textureLoaded = true;
        self._textureRect_Canvas =
        {x: 0, y: 0, width: 0, height: 0, validRect: false};
        self._drawSize_Canvas = cc.size(0, 0);
        self._softInit(fileName, rect)
    };
    _p.setBlendFunc = function (src, dst) {
        var locBlendFunc = this._blendFunc;
        if (dst === undefined) {
            locBlendFunc.src = src.src;
            locBlendFunc.dst = src.dst
        } else {
            locBlendFunc.src = src;
            locBlendFunc.dst = dst
        }
        this._isLighterMode = locBlendFunc && (locBlendFunc.src == cc.SRC_ALPHA && locBlendFunc.dst == cc.ONE || locBlendFunc.src == cc.ONE && locBlendFunc.dst == cc.ONE)
    };
    _p.init = function () {
        var _t = this;
        if (arguments.length > 0)return _t.initWithFile(arguments[0],
            arguments[1]);
        cc.NodeRGBA.prototype.init.call(_t);
        _t.dirty = _t._recursiveDirty = false;
        _t._opacityModifyRGB = true;
        _t._blendFunc.src = cc.BLEND_SRC;
        _t._blendFunc.dst = cc.BLEND_DST;
        _t.texture = null;
        _t._textureLoaded = true;
        _t._flippedX = _t._flippedY = false;
        _t.anchorX = 0.5;
        _t.anchorY = 0.5;
        _t._offsetPosition.x = 0;
        _t._offsetPosition.y = 0;
        _t._hasChildren = false;
        _t.setTextureRect(cc.rect(0, 0, 0, 0), false, cc.size(0, 0));
        return true
    };
    _p.initWithTexture = function (texture, rect, rotated) {
        var _t = this;
        var argnum = arguments.length;
        cc.assert(argnum !=
            0, cc._LogInfos.CCSpriteBatchNode_initWithTexture);
        rotated = rotated || false;
        if (!cc.NodeRGBA.prototype.init.call(_t))return false;
        _t._batchNode = null;
        _t._recursiveDirty = false;
        _t.dirty = false;
        _t._opacityModifyRGB = true;
        _t._blendFunc.src = cc.BLEND_SRC;
        _t._blendFunc.dst = cc.BLEND_DST;
        _t._flippedX = _t._flippedY = false;
        _t.anchorX = 0.5;
        _t.anchorY = 0.5;
        _t._offsetPosition.x = 0;
        _t._offsetPosition.y = 0;
        _t._hasChildren = false;
        var locTextureLoaded = texture.isLoaded();
        _t._textureLoaded = locTextureLoaded;
        if (!locTextureLoaded) {
            _t._rectRotated =
                rotated || false;
            if (rect) {
                _t._rect.x = rect.x;
                _t._rect.y = rect.y;
                _t._rect.width = rect.width;
                _t._rect.height = rect.height
            }
            texture.addLoadedEventListener(_t._textureLoadedCallback, _t);
            return true
        }
        if (!rect)rect = cc.rect(0, 0, texture.width, texture.height);
        _t._originalTexture = texture;
        _t.texture = texture;
        _t.setTextureRect(rect, rotated);
        _t.batchNode = null;
        return true
    };
    _p._textureLoadedCallback = function (sender) {
        var _t = this;
        if (_t._textureLoaded)return;
        _t._textureLoaded = true;
        var locRect = _t._rect;
        if (!locRect)locRect = cc.rect(0,
            0, sender.width, sender.height); else if (cc._rectEqualToZero(locRect)) {
            locRect.width = sender.width;
            locRect.height = sender.height
        }
        _t._originalTexture = sender;
        _t.texture = sender;
        _t.setTextureRect(locRect, _t._rectRotated);
        _t.batchNode = _t._batchNode;
        _t._callLoadedEventCallbacks()
    };
    _p.setTextureRect = function (rect, rotated, untrimmedSize) {
        var _t = this;
        _t._rectRotated = rotated || false;
        _t.setContentSize(untrimmedSize || rect);
        _t.setVertexRect(rect);
        var locTextureRect = _t._textureRect_Canvas, scaleFactor = cc.contentScaleFactor();
        locTextureRect.x = 0 | rect.x * scaleFactor;
        locTextureRect.y = 0 | rect.y * scaleFactor;
        locTextureRect.width = 0 | rect.width * scaleFactor;
        locTextureRect.height = 0 | rect.height * scaleFactor;
        locTextureRect.validRect = !(locTextureRect.width === 0 || locTextureRect.height === 0 || locTextureRect.x < 0 || locTextureRect.y < 0);
        var relativeOffset = _t._unflippedOffsetPositionFromCenter;
        if (_t._flippedX)relativeOffset.x = -relativeOffset.x;
        if (_t._flippedY)relativeOffset.y = -relativeOffset.y;
        _t._offsetPosition.x = relativeOffset.x + (_t._contentSize.width -
            _t._rect.width) / 2;
        _t._offsetPosition.y = relativeOffset.y + (_t._contentSize.height - _t._rect.height) / 2;
        if (_t._batchNode)_t.dirty = true
    };
    _p.updateTransform = function () {
        var _t = this;
        if (_t.dirty) {
            var locParent = _t._parent;
            if (!_t._visible || locParent && locParent != _t._batchNode && locParent._shouldBeHidden)_t._shouldBeHidden = true; else {
                _t._shouldBeHidden = false;
                if (!locParent || locParent == _t._batchNode)_t._transformToBatch = _t.nodeToParentTransform(); else _t._transformToBatch = cc.AffineTransformConcat(_t.nodeToParentTransform(),
                    locParent._transformToBatch)
            }
            _t._recursiveDirty = false;
            _t.dirty = false
        }
        if (_t._hasChildren)_t._arrayMakeObjectsPerformSelector(_t._children, cc.Node.StateCallbackType.updateTransform)
    };
    _p.addChild = function (child, localZOrder, tag) {
        cc.assert(child, cc._LogInfos.CCSpriteBatchNode_addChild_2);
        if (localZOrder == null)localZOrder = child._localZOrder;
        if (tag == null)tag = child.tag;
        cc.NodeRGBA.prototype.addChild.call(this, child, localZOrder, tag);
        this._hasChildren = true
    };
    _p.setOpacity = function (opacity) {
        cc.NodeRGBA.prototype.setOpacity.call(this,
            opacity);
        this._setNodeDirtyForCache()
    };
    _p.setColor = function (color3) {
        var _t = this;
        var curColor = _t.color;
        if (curColor.r === color3.r && curColor.g === color3.g && curColor.b === color3.b && curColor.a === color3.a)return;
        cc.NodeRGBA.prototype.setColor.call(_t, color3);
        _t._changeTextureColor();
        _t._setNodeDirtyForCache()
    };
    _p.updateDisplayedColor = function (parentColor) {
        var _t = this;
        var oldColor = _t.color;
        cc.NodeRGBA.prototype.updateDisplayedColor.call(_t, parentColor);
        var newColor = _t._displayedColor;
        if (oldColor.r === newColor.r &&
            oldColor.g === newColor.g && oldColor.b === newColor.b)return;
        _t._changeTextureColor();
        _t._setNodeDirtyForCache()
    };
    _p.setSpriteFrame = function (newFrame) {
        var _t = this;
        if (typeof newFrame == "string") {
            newFrame = cc.spriteFrameCache.getSpriteFrame(newFrame);
            cc.assert(newFrame, cc._LogInfos.CCSpriteBatchNode_setSpriteFrame)
        }
        _t.setNodeDirty(true);
        var frameOffset = newFrame.getOffset();
        _t._unflippedOffsetPositionFromCenter.x = frameOffset.x;
        _t._unflippedOffsetPositionFromCenter.y = frameOffset.y;
        _t._rectRotated = newFrame.isRotated();
        var pNewTexture = newFrame.getTexture();
        var locTextureLoaded = newFrame.textureLoaded();
        if (!locTextureLoaded) {
            _t._textureLoaded = false;
            newFrame.addLoadedEventListener(function (sender) {
                _t._textureLoaded = true;
                var locNewTexture = sender.getTexture();
                if (locNewTexture != _t._texture)_t.texture = locNewTexture;
                _t.setTextureRect(sender.getRect(), sender.isRotated(), sender.getOriginalSize());
                _t._callLoadedEventCallbacks()
            }, _t)
        }
        if (pNewTexture != _t._texture)_t.texture = pNewTexture;
        if (_t._rectRotated)_t._originalTexture =
            pNewTexture;
        _t.setTextureRect(newFrame.getRect(), _t._rectRotated, newFrame.getOriginalSize());
        _t._colorized = false;
        if (locTextureLoaded) {
            var curColor = _t.color;
            if (curColor.r !== 255 || curColor.g !== 255 || curColor.b !== 255)_t._changeTextureColor()
        }
    };
    _p.isFrameDisplayed = function (frame) {
        if (frame.getTexture() != this._texture)return false;
        return cc.rectEqualToRect(frame.getRect(), this._rect)
    };
    _p.setBatchNode = function (spriteBatchNode) {
        var _t = this;
        _t._batchNode = spriteBatchNode;
        if (!_t._batchNode) {
            _t.atlasIndex = cc.Sprite.INDEX_NOT_INITIALIZED;
            _t.textureAtlas = null;
            _t._recursiveDirty = false;
            _t.dirty = false
        } else {
            _t._transformToBatch = cc.AffineTransformIdentity();
            _t.textureAtlas = _t._batchNode.textureAtlas
        }
    };
    _p.setTexture = function (texture) {
        var _t = this;
        if (texture && typeof texture === "string") {
            texture = cc.textureCache.addImage(texture);
            _t.setTexture(texture);
            var size = texture.getContentSize();
            _t.setTextureRect(cc.rect(0, 0, size.width, size.height));
            return
        }
        cc.assert(!texture || texture instanceof cc.Texture2D, cc._LogInfos.CCSpriteBatchNode_setTexture);
        if (_t._texture !=
            texture) {
            if (texture && texture.getHtmlElementObj()instanceof HTMLImageElement)_t._originalTexture = texture;
            _t._texture = texture
        }
    };
    _p.draw = function (ctx) {
        var _t = this;
        if (!_t._textureLoaded)return;
        var context = ctx || cc._renderContext;
        if (_t._isLighterMode)context.globalCompositeOperation = "lighter";
        var locEGL_ScaleX = cc.view.getScaleX(), locEGL_ScaleY = cc.view.getScaleY();
        context.globalAlpha = _t._displayedOpacity / 255;
        var locRect = _t._rect, locContentSize = _t._contentSize, locOffsetPosition = _t._offsetPosition, locDrawSizeCanvas =
            _t._drawSize_Canvas;
        var flipXOffset = 0 | locOffsetPosition.x, flipYOffset = -locOffsetPosition.y - locRect.height, locTextureCoord = _t._textureRect_Canvas;
        locDrawSizeCanvas.width = locRect.width * locEGL_ScaleX;
        locDrawSizeCanvas.height = locRect.height * locEGL_ScaleY;
        if (_t._flippedX || _t._flippedY) {
            context.save();
            if (_t._flippedX) {
                flipXOffset = -locOffsetPosition.x - locRect.width;
                context.scale(-1, 1)
            }
            if (_t._flippedY) {
                flipYOffset = locOffsetPosition.y;
                context.scale(1, -1)
            }
        }
        flipXOffset *= locEGL_ScaleX;
        flipYOffset *= locEGL_ScaleY;
        if (_t._texture && locTextureCoord.validRect) {
            var image = _t._texture.getHtmlElementObj();
            if (_t._colorized)context.drawImage(image, 0, 0, locTextureCoord.width, locTextureCoord.height, flipXOffset, flipYOffset, locDrawSizeCanvas.width, locDrawSizeCanvas.height); else context.drawImage(image, locTextureCoord.x, locTextureCoord.y, locTextureCoord.width, locTextureCoord.height, flipXOffset, flipYOffset, locDrawSizeCanvas.width, locDrawSizeCanvas.height)
        } else if (locContentSize.width !== 0) {
            var curColor = _t.color;
            context.fillStyle =
                "rgba(" + curColor.r + "," + curColor.g + "," + curColor.b + ",1)";
            context.fillRect(flipXOffset, flipYOffset, locContentSize.width * locEGL_ScaleX, locContentSize.height * locEGL_ScaleY)
        }
        if (cc.SPRITE_DEBUG_DRAW === 1 || _t._showNode) {
            context.strokeStyle = "rgba(0,255,0,1)";
            flipXOffset /= locEGL_ScaleX;
            flipYOffset /= locEGL_ScaleY;
            flipYOffset = -flipYOffset;
            var vertices1 = [cc.p(flipXOffset, flipYOffset), cc.p(flipXOffset + locRect.width, flipYOffset), cc.p(flipXOffset + locRect.width, flipYOffset - locRect.height), cc.p(flipXOffset, flipYOffset -
                locRect.height)];
            cc._drawingUtil.drawPoly(vertices1, 4, true)
        } else if (cc.SPRITE_DEBUG_DRAW === 2) {
            context.strokeStyle = "rgba(0,255,0,1)";
            var drawRect = _t._rect;
            flipYOffset = -flipYOffset;
            var vertices2 = [cc.p(flipXOffset, flipYOffset), cc.p(flipXOffset + drawRect.width, flipYOffset), cc.p(flipXOffset + drawRect.width, flipYOffset - drawRect.height), cc.p(flipXOffset, flipYOffset - drawRect.height)];
            cc._drawingUtil.drawPoly(vertices2, 4, true)
        }
        if (_t._flippedX || _t._flippedY)context.restore();
        cc.g_NumberOfDraws++
    };
    delete _p
} else {
    _tmp.WebGLSprite();
    delete _tmp.WebGLSprite
}
_tmp.PrototypeSprite();
delete _tmp.PrototypeSprite;
cc.AnimationFrame = cc.Class.extend({_spriteFrame: null, _delayPerUnit: 0, _userInfo: null, ctor: function (spriteFrame, delayUnits, userInfo) {
    this._spriteFrame = spriteFrame || null;
    this._delayPerUnit = delayUnits || 0;
    this._userInfo = userInfo || null
}, clone: function () {
    var frame = new cc.AnimationFrame;
    frame.initWithSpriteFrame(this._spriteFrame.clone(), this._delayPerUnit, this._userInfo);
    return frame
}, copyWithZone: function (pZone) {
    return cc.clone(this)
}, copy: function (pZone) {
    var newFrame = new cc.AnimationFrame;
    newFrame.initWithSpriteFrame(this._spriteFrame.clone(),
        this._delayPerUnit, this._userInfo);
    return newFrame
}, initWithSpriteFrame: function (spriteFrame, delayUnits, userInfo) {
    this._spriteFrame = spriteFrame;
    this._delayPerUnit = delayUnits;
    this._userInfo = userInfo;
    return true
}, getSpriteFrame: function () {
    return this._spriteFrame
}, setSpriteFrame: function (spriteFrame) {
    this._spriteFrame = spriteFrame
}, getDelayUnits: function () {
    return this._delayPerUnit
}, setDelayUnits: function (delayUnits) {
    this._delayPerUnit = delayUnits
}, getUserInfo: function () {
    return this._userInfo
}, setUserInfo: function (userInfo) {
    this._userInfo =
        userInfo
}});
cc.AnimationFrame.create = function (spriteFrame, delayUnits, userInfo) {
    return new cc.AnimationFrame(spriteFrame, delayUnits, userInfo)
};
cc.Animation = cc.Class.extend({_frames: null, _loops: 0, _restoreOriginalFrame: false, _duration: 0, _delayPerUnit: 0, _totalDelayUnits: 0, ctor: function (frames, delay, loops) {
    this._frames = [];
    if (frames === undefined)this.initWithSpriteFrames(null, 0); else {
        var frame0 = frames[0];
        if (frame0)if (frame0 instanceof cc.SpriteFrame)this.initWithSpriteFrames(frames, delay, loops); else if (frame0 instanceof cc.AnimationFrame)this.initWithAnimationFrames(frames, delay, loops)
    }
}, getFrames: function () {
    return this._frames
}, setFrames: function (frames) {
    this._frames =
        frames
}, addSpriteFrame: function (frame) {
    var animFrame = new cc.AnimationFrame;
    animFrame.initWithSpriteFrame(frame, 1, null);
    this._frames.push(animFrame);
    this._totalDelayUnits++
}, addSpriteFrameWithFile: function (fileName) {
    var texture = cc.textureCache.addImage(fileName);
    var rect = cc.rect(0, 0, 0, 0);
    rect.width = texture.width;
    rect.height = texture.height;
    var frame = cc.SpriteFrame.create(texture, rect);
    this.addSpriteFrame(frame)
}, addSpriteFrameWithTexture: function (texture, rect) {
    var pFrame = cc.SpriteFrame.create(texture,
        rect);
    this.addSpriteFrame(pFrame)
}, initWithAnimationFrames: function (arrayOfAnimationFrames, delayPerUnit, loops) {
    cc.arrayVerifyType(arrayOfAnimationFrames, cc.AnimationFrame);
    this._delayPerUnit = delayPerUnit;
    this._loops = loops === undefined ? 1 : loops;
    this._totalDelayUnits = 0;
    var locFrames = this._frames;
    locFrames.length = 0;
    for (var i = 0; i < arrayOfAnimationFrames.length; i++) {
        var animFrame = arrayOfAnimationFrames[i];
        locFrames.push(animFrame);
        this._totalDelayUnits += animFrame.getDelayUnits()
    }
    return true
}, clone: function () {
    var animation =
        new cc.Animation;
    animation.initWithAnimationFrames(this._copyFrames(), this._delayPerUnit, this._loops);
    animation.setRestoreOriginalFrame(this._restoreOriginalFrame);
    return animation
}, copyWithZone: function (pZone) {
    var pCopy = new cc.Animation;
    pCopy.initWithAnimationFrames(this._copyFrames(), this._delayPerUnit, this._loops);
    pCopy.setRestoreOriginalFrame(this._restoreOriginalFrame);
    return pCopy
}, _copyFrames: function () {
    var copyFrames = [];
    for (var i = 0; i < this._frames.length; i++)copyFrames.push(this._frames[i].clone());
    return copyFrames
}, copy: function (pZone) {
    return this.copyWithZone(null)
}, getLoops: function () {
    return this._loops
}, setLoops: function (value) {
    this._loops = value
}, setRestoreOriginalFrame: function (restOrigFrame) {
    this._restoreOriginalFrame = restOrigFrame
}, getRestoreOriginalFrame: function () {
    return this._restoreOriginalFrame
}, getDuration: function () {
    return this._totalDelayUnits * this._delayPerUnit
}, getDelayPerUnit: function () {
    return this._delayPerUnit
}, setDelayPerUnit: function (delayPerUnit) {
    this._delayPerUnit = delayPerUnit
},
    getTotalDelayUnits: function () {
        return this._totalDelayUnits
    }, initWithSpriteFrames: function (frames, delay, loops) {
        cc.arrayVerifyType(frames, cc.SpriteFrame);
        this._loops = loops === undefined ? 1 : loops;
        this._delayPerUnit = delay || 0;
        this._totalDelayUnits = 0;
        var locFrames = this._frames;
        locFrames.length = 0;
        if (frames) {
            for (var i = 0; i < frames.length; i++) {
                var frame = frames[i];
                var animFrame = new cc.AnimationFrame;
                animFrame.initWithSpriteFrame(frame, 1, null);
                locFrames.push(animFrame)
            }
            this._totalDelayUnits += frames.length
        }
        return true
    },
    retain: function () {
    }, release: function () {
    }});
cc.Animation.create = function (frames, delay, loops) {
    return new cc.Animation(frames, delay, loops)
};
cc.animationCache = {_animations: {}, addAnimation: function (animation, name) {
    this._animations[name] = animation
}, removeAnimation: function (name) {
    if (!name)return;
    if (this._animations[name])delete this._animations[name]
}, getAnimation: function (name) {
    if (this._animations[name])return this._animations[name];
    return null
}, _addAnimationsWithDictionary: function (dictionary, plist) {
    var animations = dictionary["animations"];
    if (!animations) {
        cc.log(cc._LogInfos.animationCache__addAnimationsWithDictionary);
        return
    }
    var version =
        1;
    var properties = dictionary["properties"];
    if (properties) {
        version = properties["format"] != null ? parseInt(properties["format"]) : version;
        var spritesheets = properties["spritesheets"];
        var spriteFrameCache = cc.spriteFrameCache;
        var path = cc.path;
        for (var i = 0; i < spritesheets.length; i++)spriteFrameCache.addSpriteFrames(path.changeBasename(plist, spritesheets[i]))
    }
    switch (version) {
        case 1:
            this._parseVersion1(animations);
            break;
        case 2:
            this._parseVersion2(animations);
            break;
        default:
            cc.log(cc._LogInfos.animationCache__addAnimationsWithDictionary_2);
            break
    }
}, addAnimations: function (plist) {
    cc.assert(plist, cc._LogInfos.animationCache_addAnimations_2);
    var dict = cc.loader.getRes(plist);
    if (!dict) {
        cc.log(cc._LogInfos.animationCache_addAnimations);
        return
    }
    this._addAnimationsWithDictionary(dict, plist)
}, _parseVersion1: function (animations) {
    var frameCache = cc.spriteFrameCache;
    for (var key in animations) {
        var animationDict = animations[key];
        var frameNames = animationDict["frames"];
        var delay = parseFloat(animationDict["delay"]) || 0;
        var animation = null;
        if (!frameNames) {
            cc.log(cc._LogInfos.animationCache__parseVersion1,
                key);
            continue
        }
        var frames = [];
        for (var i = 0; i < frameNames.length; i++) {
            var spriteFrame = frameCache.getSpriteFrame(frameNames[i]);
            if (!spriteFrame) {
                cc.log(cc._LogInfos.animationCache__parseVersion1_2, key, frameNames[i]);
                continue
            }
            var animFrame = new cc.AnimationFrame;
            animFrame.initWithSpriteFrame(spriteFrame, 1, null);
            frames.push(animFrame)
        }
        if (frames.length === 0) {
            cc.log(cc._LogInfos.animationCache__parseVersion1_3, key);
            continue
        } else if (frames.length != frameNames.length)cc.log(cc._LogInfos.animationCache__parseVersion1_4,
            key);
        animation = cc.Animation.create(frames, delay, 1);
        cc.animationCache.addAnimation(animation, key)
    }
}, _parseVersion2: function (animations) {
    var frameCache = cc.spriteFrameCache;
    for (var key in animations) {
        var animationDict = animations[key];
        var isLoop = animationDict["loop"];
        var loopsTemp = parseInt(animationDict["loops"]);
        var loops = isLoop ? cc.REPEAT_FOREVER : isNaN(loopsTemp) ? 1 : loopsTemp;
        var restoreOriginalFrame = animationDict["restoreOriginalFrame"] && animationDict["restoreOriginalFrame"] == true ? true : false;
        var frameArray =
            animationDict["frames"];
        if (!frameArray) {
            cc.log(cc._LogInfos.animationCache__parseVersion2, key);
            continue
        }
        var arr = [];
        for (var i = 0; i < frameArray.length; i++) {
            var entry = frameArray[i];
            var spriteFrameName = entry["spriteframe"];
            var spriteFrame = frameCache.getSpriteFrame(spriteFrameName);
            if (!spriteFrame) {
                cc.log(cc._LogInfos.animationCache__parseVersion2_2, key, spriteFrameName);
                continue
            }
            var delayUnits = parseFloat(entry["delayUnits"]) || 0;
            var userInfo = entry["notification"];
            var animFrame = new cc.AnimationFrame;
            animFrame.initWithSpriteFrame(spriteFrame,
                delayUnits, userInfo);
            arr.push(animFrame)
        }
        var delayPerUnit = parseFloat(animationDict["delayPerUnit"]) || 0;
        var animation = new cc.Animation;
        animation.initWithAnimationFrames(arr, delayPerUnit, loops);
        animation.setRestoreOriginalFrame(restoreOriginalFrame);
        cc.animationCache.addAnimation(animation, key)
    }
}, _clear: function () {
    this._animations = {}
}};
cc.SpriteFrame = cc.Class.extend({_offset: null, _originalSize: null, _rectInPixels: null, _rotated: false, _rect: null, _offsetInPixels: null, _originalSizeInPixels: null, _texture: null, _textureFilename: "", _textureLoaded: false, _eventListeners: null, ctor: function (filename, rect, rotated, offset, originalSize) {
    this._offset = cc.p(0, 0);
    this._offsetInPixels = cc.p(0, 0);
    this._originalSize = cc.size(0, 0);
    this._rotated = false;
    this._originalSizeInPixels = cc.size(0, 0);
    this._textureFilename = "";
    this._texture = null;
    this._textureLoaded = false;
    if (filename !== undefined && rect !== undefined)if (rotated === undefined || offset === undefined || originalSize === undefined)this.initWithTexture(filename, rect); else this.initWithTexture(filename, rect, rotated, offset, originalSize)
}, textureLoaded: function () {
    return this._textureLoaded
}, addLoadedEventListener: function (callback, target) {
    if (this._eventListeners == null)this._eventListeners = [];
    this._eventListeners.push({eventCallback: callback, eventTarget: target})
}, _callLoadedEventCallbacks: function () {
    var locListeners = this._eventListeners;
    if (!locListeners)return;
    for (var i = 0, len = locListeners.length; i < len; i++) {
        var selCallback = locListeners[i];
        selCallback.eventCallback.call(selCallback.eventTarget, this)
    }
    locListeners.length = 0
}, getRectInPixels: function () {
    var locRectInPixels = this._rectInPixels;
    return cc.rect(locRectInPixels.x, locRectInPixels.y, locRectInPixels.width, locRectInPixels.height)
}, setRectInPixels: function (rectInPixels) {
    if (!this._rectInPixels)this._rectInPixels = cc.rect(0, 0, 0, 0);
    this._rectInPixels.x = rectInPixels.x;
    this._rectInPixels.y =
        rectInPixels.y;
    this._rectInPixels.width = rectInPixels.width;
    this._rectInPixels.height = rectInPixels.height;
    this._rect = cc.rectPixelsToPoints(rectInPixels)
}, isRotated: function () {
    return this._rotated
}, setRotated: function (bRotated) {
    this._rotated = bRotated
}, getRect: function () {
    var locRect = this._rect;
    return cc.rect(locRect.x, locRect.y, locRect.width, locRect.height)
}, setRect: function (rect) {
    if (!this._rect)this._rect = cc.rect(0, 0, 0, 0);
    this._rect.x = rect.x;
    this._rect.y = rect.y;
    this._rect.width = rect.width;
    this._rect.height =
        rect.height;
    this._rectInPixels = cc.rectPointsToPixels(this._rect)
}, getOffsetInPixels: function () {
    return this._offsetInPixels
}, setOffsetInPixels: function (offsetInPixels) {
    this._offsetInPixels.x = offsetInPixels.x;
    this._offsetInPixels.y = offsetInPixels.y;
    cc._pointPixelsToPointsOut(this._offsetInPixels, this._offset)
}, getOriginalSizeInPixels: function () {
    return this._originalSizeInPixels
}, setOriginalSizeInPixels: function (sizeInPixels) {
    this._originalSizeInPixels.width = sizeInPixels.width;
    this._originalSizeInPixels.height =
        sizeInPixels.height
}, getOriginalSize: function () {
    return this._originalSize
}, setOriginalSize: function (sizeInPixels) {
    this._originalSize.width = sizeInPixels.width;
    this._originalSize.height = sizeInPixels.height
}, getTexture: function () {
    if (this._texture)return this._texture;
    if (this._textureFilename !== "") {
        var locTexture = cc.textureCache.addImage(this._textureFilename);
        if (locTexture)this._textureLoaded = locTexture.isLoaded();
        return locTexture
    }
    return null
}, setTexture: function (texture) {
    if (this._texture != texture) {
        var locLoaded =
            texture.isLoaded();
        this._textureLoaded = locLoaded;
        this._texture = texture;
        if (!locLoaded)texture.addLoadedEventListener(function (sender) {
            this._textureLoaded = true;
            if (this._rotated && cc._renderType === cc._RENDER_TYPE_CANVAS) {
                var tempElement = sender.getHtmlElementObj();
                tempElement = cc.cutRotateImageToCanvas(tempElement, this.getRect());
                var tempTexture = new cc.Texture2D;
                tempTexture.initWithElement(tempElement);
                tempTexture.handleLoadedTexture();
                this.setTexture(tempTexture);
                var rect = this.getRect();
                this.setRect(cc.rect(0,
                    0, rect.width, rect.height))
            }
            var locRect = this._rect;
            if (locRect.width === 0 && locRect.height === 0) {
                var w = sender.width, h = sender.height;
                this._rect.width = w;
                this._rect.height = h;
                this._rectInPixels = cc.rectPointsToPixels(this._rect);
                this._originalSizeInPixels.width = this._rectInPixels.width;
                this._originalSizeInPixels.height = this._rectInPixels.height;
                this._originalSize.width = w;
                this._originalSize.height = h
            }
            this._callLoadedEventCallbacks()
        }, this)
    }
}, getOffset: function () {
    return this._offset
}, setOffset: function (offsets) {
    this._offset.x =
        offsets.x;
    this._offset.y = offsets.y
}, clone: function () {
    var frame = new cc.SpriteFrame;
    frame.initWithTexture(this._textureFilename, this._rectInPixels, this._rotated, this._offsetInPixels, this._originalSizeInPixels);
    frame.setTexture(this._texture);
    return frame
}, copyWithZone: function () {
    var copy = new cc.SpriteFrame;
    copy.initWithTexture(this._textureFilename, this._rectInPixels, this._rotated, this._offsetInPixels, this._originalSizeInPixels);
    copy.setTexture(this._texture);
    return copy
}, copy: function () {
    return this.copyWithZone()
},
    initWithTexture: function (texture, rect, rotated, offset, originalSize) {
        if (arguments.length === 2)rect = cc.rectPointsToPixels(rect);
        offset = offset || cc.p(0, 0);
        originalSize = originalSize || rect;
        rotated = rotated || false;
        if (typeof texture == "string") {
            this._texture = null;
            this._textureFilename = texture
        } else if (texture instanceof cc.Texture2D)this.setTexture(texture);
        this._rectInPixels = rect;
        this._rect = cc.rectPixelsToPoints(rect);
        this._offsetInPixels.x = offset.x;
        this._offsetInPixels.y = offset.y;
        cc._pointPixelsToPointsOut(offset,
            this._offset);
        this._originalSizeInPixels.width = originalSize.width;
        this._originalSizeInPixels.height = originalSize.height;
        cc._sizePixelsToPointsOut(originalSize, this._originalSize);
        this._rotated = rotated;
        return true
    }});
cc.SpriteFrame.create = function (filename, rect, rotated, offset, originalSize) {
    return new cc.SpriteFrame(filename, rect, rotated, offset, originalSize)
};
cc.SpriteFrame._frameWithTextureForCanvas = function (texture, rect, rotated, offset, originalSize) {
    var spriteFrame = new cc.SpriteFrame;
    spriteFrame._texture = texture;
    spriteFrame._rectInPixels = rect;
    spriteFrame._rect = cc.rectPixelsToPoints(rect);
    spriteFrame._offsetInPixels.x = offset.x;
    spriteFrame._offsetInPixels.y = offset.y;
    cc._pointPixelsToPointsOut(spriteFrame._offsetInPixels, spriteFrame._offset);
    spriteFrame._originalSizeInPixels.width = originalSize.width;
    spriteFrame._originalSizeInPixels.height = originalSize.height;
    cc._sizePixelsToPointsOut(spriteFrame._originalSizeInPixels, spriteFrame._originalSize);
    spriteFrame._rotated = rotated;
    return spriteFrame
};
cc.spriteFrameCache = {_CCNS_REG1: /^\s*\{\s*([\-]?\d+[.]?\d*)\s*,\s*([\-]?\d+[.]?\d*)\s*\}\s*$/, _CCNS_REG2: /^\s*\{\s*\{\s*([\-]?\d+[.]?\d*)\s*,\s*([\-]?\d+[.]?\d*)\s*\}\s*,\s*\{\s*([\-]?\d+[.]?\d*)\s*,\s*([\-]?\d+[.]?\d*)\s*\}\s*\}\s*$/, _spriteFrames: {}, _spriteFramesAliases: {}, _frameConfigCache: {}, _rectFromString: function (content) {
    var result = this._CCNS_REG2.exec(content);
    if (!result)return cc.rect(0, 0, 0, 0);
    return cc.rect(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]), parseFloat(result[4]))
},
    _pointFromString: function (content) {
        var result = this._CCNS_REG1.exec(content);
        if (!result)return cc.p(0, 0);
        return cc.p(parseFloat(result[1]), parseFloat(result[2]))
    }, _sizeFromString: function (content) {
        var result = this._CCNS_REG1.exec(content);
        if (!result)return cc.size(0, 0);
        return cc.size(parseFloat(result[1]), parseFloat(result[2]))
    }, _getFrameConfig: function (url) {
        var dict = cc.loader.getRes(url);
        cc.assert(dict, cc._LogInfos.spriteFrameCache__getFrameConfig_2, url);
        cc.loader.release(url);
        if (dict._inited) {
            this._frameConfigCache[url] =
                dict;
            return dict
        }
        var tempFrames = dict["frames"], tempMeta = dict["metadata"] || dict["meta"];
        var frames = {}, meta = {};
        var format = 0;
        if (tempMeta) {
            var tmpFormat = tempMeta["format"];
            format = tmpFormat.length <= 1 ? parseInt(tmpFormat) : tmpFormat;
            meta.image = tempMeta["textureFileName"] || tempMeta["textureFileName"] || tempMeta["image"]
        }
        for (var key in tempFrames) {
            var frameDict = tempFrames[key];
            if (!frameDict)continue;
            var tempFrame = {};
            if (format == 0) {
                tempFrame.rect = cc.rect(frameDict["x"], frameDict["y"], frameDict["width"], frameDict["height"]);
                tempFrame.rotated = false;
                tempFrame.offset = cc.p(frameDict["offsetX"], frameDict["offsetY"]);
                var ow = frameDict["originalWidth"];
                var oh = frameDict["originalHeight"];
                if (!ow || !oh)cc.log(cc._LogInfos.spriteFrameCache__getFrameConfig);
                ow = Math.abs(ow);
                oh = Math.abs(oh);
                tempFrame.size = cc.size(ow, oh)
            } else if (format == 1 || format == 2) {
                tempFrame.rect = this._rectFromString(frameDict["frame"]);
                tempFrame.rotated = frameDict["rotated"] || false;
                tempFrame.offset = this._pointFromString(frameDict["offset"]);
                tempFrame.size = this._sizeFromString(frameDict["sourceSize"])
            } else if (format ==
                3) {
                var spriteSize = this._sizeFromString(frameDict["spriteSize"]);
                var textureRect = this._rectFromString(frameDict["textureRect"]);
                if (spriteSize)textureRect = cc.rect(textureRect.x, textureRect.y, spriteSize.width, spriteSize.height);
                tempFrame.rect = textureRect;
                tempFrame.rotated = frameDict["textureRotated"] || false;
                tempFrame.offset = this._pointFromString(frameDict["spriteOffset"]);
                tempFrame.size = this._sizeFromString(frameDict["spriteSourceSize"]);
                tempFrame.aliases = frameDict["aliases"]
            } else {
                var tmpFrame = frameDict["frame"],
                    tmpSourceSize = frameDict["sourceSize"];
                key = frameDict["filename"] || key;
                tempFrame.rect = cc.rect(tmpFrame["x"], tmpFrame["y"], tmpFrame["w"], tmpFrame["h"]);
                tempFrame.rotated = frameDict["rotated"] || false;
                tempFrame.offset = cc.p(0, 0);
                tempFrame.size = cc.size(tmpSourceSize["w"], tmpSourceSize["h"])
            }
            frames[key] = tempFrame
        }
        var cfg = this._frameConfigCache[url] = {_inited: true, frames: frames, meta: meta};
        return cfg
    }, addSpriteFrames: function (url, texture) {
        cc.assert(url, cc._LogInfos.spriteFrameCache_addSpriteFrames_2);
        var self =
            this;
        var frameConfig = self._frameConfigCache[url] || self._getFrameConfig(url);
        var frames = frameConfig.frames, meta = frameConfig.meta;
        if (!texture) {
            var texturePath = cc.path.changeBasename(url, meta.image || ".png");
            texture = cc.textureCache.addImage(texturePath)
        } else if (texture instanceof cc.Texture2D); else if (typeof texture == "string")texture = cc.textureCache.addImage(texture); else cc.assert(0, cc._LogInfos.spriteFrameCache_addSpriteFrames_3);
        var spAliases = self._spriteFramesAliases, spriteFrames = self._spriteFrames;
        for (var key in frames) {
            var frame = frames[key];
            var spriteFrame = spriteFrames[key];
            if (!spriteFrame) {
                spriteFrame = cc.SpriteFrame.create(texture, frame.rect, frame.rotated, frame.offset, frame.size);
                var aliases = frame.aliases;
                if (aliases)for (var i = 0, li = aliases.length; i < li; i++) {
                    var alias = aliases[i];
                    if (spAliases[alias])cc.log(cc._LogInfos.spriteFrameCache_addSpriteFrames, alias);
                    spAliases[alias] = key
                }
                if (cc._renderType === cc._RENDER_TYPE_CANVAS && spriteFrame.isRotated()) {
                    var locTexture = spriteFrame.getTexture();
                    if (locTexture.isLoaded()) {
                        var tempElement =
                            spriteFrame.getTexture().getHtmlElementObj();
                        tempElement = cc.cutRotateImageToCanvas(tempElement, spriteFrame.getRectInPixels());
                        var tempTexture = new cc.Texture2D;
                        tempTexture.initWithElement(tempElement);
                        tempTexture.handleLoadedTexture();
                        spriteFrame.setTexture(tempTexture);
                        var rect = spriteFrame._rect;
                        spriteFrame.setRect(cc.rect(0, 0, rect.width, rect.height))
                    }
                }
                spriteFrames[key] = spriteFrame
            }
        }
    }, _checkConflict: function (dictionary) {
        var framesDict = dictionary["frames"];
        for (var key in framesDict)if (this._spriteFrames[key])cc.log(cc._LogInfos.spriteFrameCache__checkConflict,
            key)
    }, addSpriteFrame: function (frame, frameName) {
        this._spriteFrames[frameName] = frame
    }, removeSpriteFrames: function () {
        this._spriteFrames = {};
        this._spriteFramesAliases = {}
    }, removeSpriteFrameByName: function (name) {
        if (!name)return;
        if (this._spriteFramesAliases[name])delete this._spriteFramesAliases[name];
        if (this._spriteFrames[name])delete this._spriteFrames[name]
    }, removeSpriteFramesFromFile: function (url) {
        var self = this, spriteFrames = self._spriteFrames, aliases = self._spriteFramesAliases, cfg = self._frameConfigCache[url];
        if (!cfg)return;
        var frames = cfg.frames;
        for (var key in frames)if (spriteFrames[key]) {
            delete spriteFrames[key];
            for (var alias in aliases)if (aliases[alias] == key)delete aliases[alias]
        }
    }, removeSpriteFramesFromTexture: function (texture) {
        var self = this, spriteFrames = self._spriteFrames, aliases = self._spriteFramesAliases;
        for (var key in spriteFrames) {
            var frame = spriteFrames[key];
            if (frame && frame.getTexture() == texture) {
                delete spriteFrames[key];
                for (var alias in aliases)if (aliases[alias] == key)delete aliases[alias]
            }
        }
    }, getSpriteFrame: function (name) {
        var self =
            this, frame = self._spriteFrames[name];
        if (!frame) {
            var key = self._spriteFramesAliases[name];
            if (key) {
                frame = self._spriteFrames[key.toString()];
                if (!frame)delete self._spriteFramesAliases[name]
            }
        }
        if (!frame)cc.log(cc._LogInfos.spriteFrameCache_getSpriteFrame, name);
        return frame
    }, _clear: function () {
        this._spriteFrames = {};
        this._spriteFramesAliases = {};
        this._frameConfigCache = {}
    }};
cc.g_NumberOfDraws = 0;
cc.GLToClipTransform = function (transformOut) {
    var projection = new cc.kmMat4;
    cc.kmGLGetMatrix(cc.KM_GL_PROJECTION, projection);
    var modelview = new cc.kmMat4;
    cc.kmGLGetMatrix(cc.KM_GL_MODELVIEW, modelview);
    cc.kmMat4Multiply(transformOut, projection, modelview)
};
cc.Director = cc.Class.extend({_landscape: false, _nextDeltaTimeZero: false, _paused: false, _purgeDirectorInNextLoop: false, _sendCleanupToScene: false, _animationInterval: 0, _oldAnimationInterval: 0, _projection: 0, _accumDt: 0, _contentScaleFactor: 1, _displayStats: false, _deltaTime: 0, _frameRate: 0, _FPSLabel: null, _SPFLabel: null, _drawsLabel: null, _winSizeInPoints: null, _lastUpdate: null, _nextScene: null, _notificationNode: null, _openGLView: null, _scenesStack: null, _projectionDelegate: null, _runningScene: null, _frames: 0, _totalFrames: 0,
    _secondsPerFrame: 0, _dirtyRegion: null, _scheduler: null, _actionManager: null, _eventProjectionChanged: null, _eventAfterDraw: null, _eventAfterVisit: null, _eventAfterUpdate: null, ctor: function () {
        var self = this;
        self._lastUpdate = Date.now();
        cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function () {
            self._lastUpdate = Date.now()
        })
    }, init: function () {
        this._oldAnimationInterval = this._animationInterval = 1 / cc.defaultFPS;
        this._scenesStack = [];
        this._projection = cc.Director.PROJECTION_DEFAULT;
        this._projectionDelegate = null;
        this._accumDt = 0;
        this._frameRate = 0;
        this._displayStats = false;
        this._totalFrames = this._frames = 0;
        this._lastUpdate = Date.now();
        this._paused = false;
        this._purgeDirectorInNextLoop = false;
        this._winSizeInPoints = cc.size(0, 0);
        this._openGLView = null;
        this._contentScaleFactor = 1;
        this._scheduler = new cc.Scheduler;
        this._actionManager = cc.ActionManager ? new cc.ActionManager : null;
        this._scheduler.scheduleUpdateForTarget(this._actionManager, cc.Scheduler.PRIORITY_SYSTEM, false);
        this._eventAfterDraw = new cc.EventCustom(cc.Director.EVENT_AFTER_DRAW);
        this._eventAfterDraw.setUserData(this);
        this._eventAfterVisit = new cc.EventCustom(cc.Director.EVENT_AFTER_VISIT);
        this._eventAfterVisit.setUserData(this);
        this._eventAfterUpdate = new cc.EventCustom(cc.Director.EVENT_AFTER_UPDATE);
        this._eventAfterUpdate.setUserData(this);
        this._eventProjectionChanged = new cc.EventCustom(cc.Director.EVENT_PROJECTION_CHANGED);
        this._eventProjectionChanged.setUserData(this);
        return true
    }, calculateDeltaTime: function () {
        var now = Date.now();
        if (this._nextDeltaTimeZero) {
            this._deltaTime =
                0;
            this._nextDeltaTimeZero = false
        } else this._deltaTime = (now - this._lastUpdate) / 1E3;
        if (cc.game.config[cc.game.CONFIG_KEY.debugMode] > 0 && this._deltaTime > 0.2)this._deltaTime = 1 / 60;
        this._lastUpdate = now
    }, drawScene: function () {
        this.calculateDeltaTime();
        if (!this._paused) {
            this._scheduler.update(this._deltaTime);
            cc.eventManager.dispatchEvent(this._eventAfterUpdate)
        }
        this._clear();
        if (this._nextScene)this.setNextScene();
        if (this._beforeVisitScene)this._beforeVisitScene();
        if (this._runningScene) {
            this._runningScene.visit();
            cc.eventManager.dispatchEvent(this._eventAfterVisit)
        }
        if (this._notificationNode)this._notificationNode.visit();
        if (this._displayStats)this._showStats();
        if (this._afterVisitScene)this._afterVisitScene();
        cc.eventManager.dispatchEvent(this._eventAfterDraw);
        this._totalFrames++;
        if (this._displayStats)this._calculateMPF()
    }, _beforeVisitScene: null, _afterVisitScene: null, end: function () {
        this._purgeDirectorInNextLoop = true
    }, getContentScaleFactor: function () {
        return this._contentScaleFactor
    }, getNotificationNode: function () {
        return this._notificationNode
    },
    getWinSize: function () {
        return this._winSizeInPoints
    }, getWinSizeInPixels: function () {
        return cc.size(this._winSizeInPoints.width * this._contentScaleFactor, this._winSizeInPoints.height * this._contentScaleFactor)
    }, pause: function () {
        if (this._paused)return;
        this._oldAnimationInterval = this._animationInterval;
        this.setAnimationInterval(1 / 4);
        this._paused = true
    }, popScene: function () {
        cc.assert(this._runningScene, cc._LogInfos.Director_popScene);
        this._scenesStack.pop();
        var c = this._scenesStack.length;
        if (c == 0)this.end();
        else {
            this._sendCleanupToScene = true;
            this._nextScene = this._scenesStack[c - 1]
        }
    }, purgeCachedData: function () {
        cc.animationCache._clear();
        cc.spriteFrameCache._clear();
        cc.textureCache._clear()
    }, purgeDirector: function () {
        this.getScheduler().unscheduleAllCallbacks();
        if (cc.eventManager)cc.eventManager.setEnabled(false);
        if (this._runningScene) {
            this._runningScene.onExitTransitionDidStart();
            this._runningScene.onExit();
            this._runningScene.cleanup()
        }
        this._runningScene = null;
        this._nextScene = null;
        this._scenesStack.length =
            0;
        this.stopAnimation();
        this.purgeCachedData();
        cc.checkGLErrorDebug()
    }, pushScene: function (scene) {
        cc.assert(scene, cc._LogInfos.Director_pushScene);
        this._sendCleanupToScene = false;
        this._scenesStack.push(scene);
        this._nextScene = scene
    }, runScene: function (scene) {
        cc.assert(scene, cc._LogInfos.Director_pushScene);
        if (!this._runningScene) {
            this.pushScene(scene);
            this.startAnimation()
        } else {
            var i = this._scenesStack.length;
            if (i === 0) {
                this._sendCleanupToScene = true;
                this._scenesStack[i] = scene;
                this._nextScene = scene
            } else {
                this._sendCleanupToScene =
                    true;
                this._scenesStack[i - 1] = scene;
                this._nextScene = scene
            }
        }
    }, resume: function () {
        if (!this._paused)return;
        this.setAnimationInterval(this._oldAnimationInterval);
        this._lastUpdate = Date.now();
        if (!this._lastUpdate)cc.log(cc._LogInfos.Director_resume);
        this._paused = false;
        this._deltaTime = 0
    }, setContentScaleFactor: function (scaleFactor) {
        if (scaleFactor != this._contentScaleFactor) {
            this._contentScaleFactor = scaleFactor;
            this._createStatsLabel()
        }
    }, setDefaultValues: function () {
    }, setNextDeltaTimeZero: function (nextDeltaTimeZero) {
        this._nextDeltaTimeZero =
            nextDeltaTimeZero
    }, setNextScene: function () {
        var runningIsTransition = false, newIsTransition = false;
        if (cc.TransitionScene) {
            runningIsTransition = this._runningScene ? this._runningScene instanceof cc.TransitionScene : false;
            newIsTransition = this._nextScene ? this._nextScene instanceof cc.TransitionScene : false
        }
        if (!newIsTransition) {
            var locRunningScene = this._runningScene;
            if (locRunningScene) {
                locRunningScene.onExitTransitionDidStart();
                locRunningScene.onExit()
            }
            if (this._sendCleanupToScene && locRunningScene)locRunningScene.cleanup()
        }
        this._runningScene =
            this._nextScene;
        this._nextScene = null;
        if (!runningIsTransition && this._runningScene != null) {
            this._runningScene.onEnter();
            this._runningScene.onEnterTransitionDidFinish()
        }
    }, setNotificationNode: function (node) {
        this._notificationNode = node
    }, getDelegate: function () {
        return this._projectionDelegate
    }, setDelegate: function (delegate) {
        this._projectionDelegate = delegate
    }, _showStats: function () {
        this._frames++;
        this._accumDt += this._deltaTime;
        if (this._FPSLabel && this._SPFLabel && this._drawsLabel) {
            if (this._accumDt > cc.DIRECTOR_FPS_INTERVAL) {
                this._SPFLabel.string =
                    this._secondsPerFrame.toFixed(3);
                this._frameRate = this._frames / this._accumDt;
                this._frames = 0;
                this._accumDt = 0;
                this._FPSLabel.string = this._frameRate.toFixed(1);
                this._drawsLabel.string = (0 | cc.g_NumberOfDraws).toString()
            }
            this._FPSLabel.visit();
            this._SPFLabel.visit();
            this._drawsLabel.visit()
        } else this._createStatsLabel();
        cc.g_NumberOfDraws = 0
    }, isSendCleanupToScene: function () {
        return this._sendCleanupToScene
    }, getRunningScene: function () {
        return this._runningScene
    }, getAnimationInterval: function () {
        return this._animationInterval
    },
    isDisplayStats: function () {
        return this._displayStats
    }, setDisplayStats: function (displayStats) {
        this._displayStats = displayStats
    }, getSecondsPerFrame: function () {
        return this._secondsPerFrame
    }, isNextDeltaTimeZero: function () {
        return this._nextDeltaTimeZero
    }, isPaused: function () {
        return this._paused
    }, getTotalFrames: function () {
        return this._totalFrames
    }, popToRootScene: function () {
        this.popToSceneStackLevel(1)
    }, popToSceneStackLevel: function (level) {
        cc.assert(this._runningScene, cc._LogInfos.Director_popToSceneStackLevel_2);
        var locScenesStack = this._scenesStack;
        var c = locScenesStack.length;
        if (c == 0) {
            this.end();
            return
        }
        if (level > c)return;
        while (c > level) {
            var current = locScenesStack.pop();
            if (current.running) {
                current.onExitTransitionDidStart();
                current.onExit()
            }
            current.cleanup();
            c--
        }
        this._nextScene = locScenesStack[locScenesStack.length - 1];
        this._sendCleanupToScene = false
    }, getScheduler: function () {
        return this._scheduler
    }, setScheduler: function (scheduler) {
        if (this._scheduler != scheduler)this._scheduler = scheduler
    }, getActionManager: function () {
        return this._actionManager
    },
    setActionManager: function (actionManager) {
        if (this._actionManager != actionManager)this._actionManager = actionManager
    }, getDeltaTime: function () {
        return this._deltaTime
    }, _createStatsLabel: null, _calculateMPF: function () {
        var now = Date.now();
        this._secondsPerFrame = (now - this._lastUpdate) / 1E3
    }});
cc.Director.EVENT_PROJECTION_CHANGED = "director_projection_changed";
cc.Director.EVENT_AFTER_DRAW = "director_after_draw";
cc.Director.EVENT_AFTER_VISIT = "director_after_visit";
cc.Director.EVENT_AFTER_UPDATE = "director_after_update";
cc.DisplayLinkDirector = cc.Director.extend({invalid: false, startAnimation: function () {
    this._nextDeltaTimeZero = true;
    this.invalid = false
}, mainLoop: function () {
    if (this._purgeDirectorInNextLoop) {
        this._purgeDirectorInNextLoop = false;
        this.purgeDirector()
    } else if (!this.invalid)this.drawScene()
}, stopAnimation: function () {
    this.invalid = true
}, setAnimationInterval: function (value) {
    this._animationInterval = value;
    if (!this.invalid) {
        this.stopAnimation();
        this.startAnimation()
    }
}});
cc.Director.sharedDirector = null;
cc.Director.firstUseDirector = true;
cc.Director._getInstance = function () {
    if (cc.Director.firstUseDirector) {
        cc.Director.firstUseDirector = false;
        cc.Director.sharedDirector = new cc.DisplayLinkDirector;
        cc.Director.sharedDirector.init()
    }
    return cc.Director.sharedDirector
};
cc.defaultFPS = 60;
cc.Director.PROJECTION_2D = 0;
cc.Director.PROJECTION_3D = 1;
cc.Director.PROJECTION_CUSTOM = 3;
cc.Director.PROJECTION_DEFAULT = cc.Director.PROJECTION_3D;
if (cc._renderType === cc._RENDER_TYPE_CANVAS) {
    var _p = cc.Director.prototype;
    _p.setProjection = function (projection) {
        this._projection = projection;
        cc.eventManager.dispatchEvent(this._eventProjectionChanged)
    };
    _p.setDepthTest = function () {
    };
    _p.setOpenGLView = function (openGLView) {
        this._winSizeInPoints.width = cc._canvas.width;
        this._winSizeInPoints.height = cc._canvas.height;
        this._openGLView = openGLView || cc.view;
        if (cc.eventManager)cc.eventManager.setEnabled(true)
    };
    _p._clear = function () {
        var viewport = this._openGLView.getViewPortRect();
        cc._renderContext.clearRect(-viewport.x, viewport.y, viewport.width, -viewport.height)
    };
    _p._createStatsLabel = function () {
        var _t = this;
        var fontSize = 0;
        if (_t._winSizeInPoints.width > _t._winSizeInPoints.height)fontSize = 0 | _t._winSizeInPoints.height / 320 * 24; else fontSize = 0 | _t._winSizeInPoints.width / 320 * 24;
        _t._FPSLabel = cc.LabelTTF.create("000.0", "Arial", fontSize);
        _t._SPFLabel = cc.LabelTTF.create("0.000", "Arial", fontSize);
        _t._drawsLabel = cc.LabelTTF.create("0000", "Arial", fontSize);
        var locStatsPosition = cc.DIRECTOR_STATS_POSITION;
        _t._drawsLabel.setPosition(_t._drawsLabel.width / 2 + locStatsPosition.x, _t._drawsLabel.height * 5 / 2 + locStatsPosition.y);
        _t._SPFLabel.setPosition(_t._SPFLabel.width / 2 + locStatsPosition.x, _t._SPFLabel.height * 3 / 2 + locStatsPosition.y);
        _t._FPSLabel.setPosition(_t._FPSLabel.width / 2 + locStatsPosition.x, _t._FPSLabel.height / 2 + locStatsPosition.y)
    };
    _p.getVisibleSize = function () {
        return this.getWinSize()
    };
    _p.getVisibleOrigin = function () {
        return cc.p(0, 0)
    }
} else {
    cc.Director._fpsImage = new Image;
    cc._addEventListener(cc.Director._fpsImage,
        "load", function () {
            cc.Director._fpsImageLoaded = true
        });
    if (cc._fpsImage)cc.Director._fpsImage.src = cc._fpsImage;
    _tmp.DirectorWebGL && _tmp.DirectorWebGL();
    delete _tmp.DirectorWebGL
}
;
cc.PRIORITY_NON_SYSTEM = cc.PRIORITY_SYSTEM + 1;
cc.arrayVerifyType = function (arr, type) {
    if (arr && arr.length > 0)for (var i = 0; i < arr.length; i++)if (!(arr[i]instanceof type)) {
        cc.log(cc._LogInfos.arrayVerifyType);
        return false
    }
    return true
};
cc.arrayRemoveObject = function (arr, delObj) {
    for (var i = 0, l = arr.length; i < l; i++)if (arr[i] == delObj) {
        arr.splice(i, 1);
        break
    }
};
cc.arrayRemoveArray = function (arr, minusArr) {
    for (var i = 0, l = minusArr.length; i < l; i++)cc.arrayRemoveObject(arr, minusArr[i])
};
cc.arrayAppendObjectsToIndex = function (arr, addObjs, index) {
    arr.splice.apply(arr, [index, 0].concat(addObjs));
    return arr
};
cc.ListEntry = function (prev, next, target, priority, paused, markedForDeletion) {
    this.prev = prev;
    this.next = next;
    this.target = target;
    this.priority = priority;
    this.paused = paused;
    this.markedForDeletion = markedForDeletion
};
cc.HashUpdateEntry = function (list, entry, target, hh) {
    this.list = list;
    this.entry = entry;
    this.target = target;
    this.hh = hh
};
cc.HashTimerEntry = function (timers, target, timerIndex, currentTimer, currentTimerSalvaged, paused, hh) {
    var _t = this;
    _t.timers = timers;
    _t.target = target;
    _t.timerIndex = timerIndex;
    _t.currentTimer = currentTimer;
    _t.currentTimerSalvaged = currentTimerSalvaged;
    _t.paused = paused;
    _t.hh = hh
};
cc.Timer = cc.Class.extend({_interval: 0, _callback: null, _target: null, _elapsed: 0, _runForever: false, _useDelay: false, _timesExecuted: 0, _repeat: 0, _delay: 0, getInterval: function () {
    return this._interval
}, setInterval: function (interval) {
    this._interval = interval
}, getCallback: function () {
    return this._callback
}, ctor: function (target, callback, interval, repeat, delay) {
    var self = this;
    self._target = target;
    self._callback = callback;
    self._elapsed = -1;
    self._interval = interval || 0;
    self._delay = delay || 0;
    self._useDelay = self._delay > 0;
    self._repeat =
            repeat == null ? cc.REPEAT_FOREVER : repeat;
    self._runForever = self._repeat == cc.REPEAT_FOREVER
}, _doCallback: function () {
    var self = this;
    if (typeof self._callback == "string")self._target[self._callback](self._elapsed); else self._callback.call(self._target, self._elapsed)
}, update: function (dt) {
    var self = this;
    if (self._elapsed == -1) {
        self._elapsed = 0;
        self._timesExecuted = 0
    } else {
        var locTarget = self._target, locCallback = self._callback;
        self._elapsed += dt;
        if (self._runForever && !self._useDelay) {
            if (self._elapsed >= self._interval) {
                if (locTarget &&
                    locCallback)self._doCallback();
                self._elapsed = 0
            }
        } else {
            if (self._useDelay) {
                if (self._elapsed >= self._delay) {
                    if (locTarget && locCallback)self._doCallback();
                    self._elapsed = self._elapsed - self._delay;
                    self._timesExecuted += 1;
                    self._useDelay = false
                }
            } else if (self._elapsed >= self._interval) {
                if (locTarget && locCallback)self._doCallback();
                self._elapsed = 0;
                self._timesExecuted += 1
            }
            if (self._timesExecuted > self._repeat)cc.director.getScheduler().unscheduleCallbackForTarget(locTarget, locCallback)
        }
    }
}});
cc.Scheduler = cc.Class.extend({_timeScale: 1, _updates: null, _hashForUpdates: null, _arrayForUpdates: null, _hashForTimers: null, _arrayForTimes: null, _currentTarget: null, _currentTargetSalvaged: false, _updateHashLocked: false, ctor: function () {
    var self = this;
    self._timeScale = 1;
    self._updates = [
        [],
        [],
        []
    ];
    self._hashForUpdates = {};
    self._arrayForUpdates = [];
    self._hashForTimers = {};
    self._arrayForTimers = [];
    self._currentTarget = null;
    self._currentTargetSalvaged = false;
    self._updateHashLocked = false
}, _removeHashElement: function (element) {
    delete this._hashForTimers[element.target.__instanceId];
    cc.arrayRemoveObject(this._arrayForTimers, element);
    element.Timer = null;
    element.target = null;
    element = null
}, _removeUpdateFromHash: function (entry) {
    var self = this, element = self._hashForUpdates[entry.target.__instanceId];
    if (element) {
        cc.arrayRemoveObject(element.list, element.entry);
        delete self._hashForUpdates[element.target.__instanceId];
        cc.arrayRemoveObject(self._arrayForUpdates, element);
        element.entry = null;
        element.target = null
    }
}, _priorityIn: function (ppList, target, priority, paused) {
    var self = this, listElement =
        new cc.ListEntry(null, null, target, priority, paused, false);
    if (!ppList) {
        ppList = [];
        ppList.push(listElement)
    } else {
        var index2Insert = ppList.length - 1;
        for (var i = 0; i <= index2Insert; i++)if (priority < ppList[i].priority) {
            index2Insert = i;
            break
        }
        ppList.splice(i, 0, listElement)
    }
    var hashElement = new cc.HashUpdateEntry(ppList, listElement, target, null);
    self._arrayForUpdates.push(hashElement);
    self._hashForUpdates[target.__instanceId] = hashElement;
    return ppList
}, _appendIn: function (ppList, target, paused) {
    var self = this, listElement =
        new cc.ListEntry(null, null, target, 0, paused, false);
    ppList.push(listElement);
    var hashElement = new cc.HashUpdateEntry(ppList, listElement, target, null);
    self._arrayForUpdates.push(hashElement);
    self._hashForUpdates[target.__instanceId] = hashElement
}, setTimeScale: function (timeScale) {
    this._timeScale = timeScale
}, getTimeScale: function () {
    return this._timeScale
}, update: function (dt) {
    var self = this;
    var locUpdates = self._updates, locArrayForTimers = self._arrayForTimers;
    var tmpEntry, elt, i, li;
    self._updateHashLocked = true;
    if (this._timeScale != 1)dt *= this._timeScale;
    for (i = 0, li = locUpdates.length; i < li && i >= 0; i++) {
        var update = self._updates[i];
        for (var j = 0, lj = update.length; j < lj; j++) {
            tmpEntry = update[j];
            if (!tmpEntry.paused && !tmpEntry.markedForDeletion)tmpEntry.target.update(dt)
        }
    }
    for (i = 0, li = locArrayForTimers.length; i < li; i++) {
        elt = locArrayForTimers[i];
        if (!elt)break;
        self._currentTarget = elt;
        self._currentTargetSalvaged = false;
        if (!elt.paused)for (elt.timerIndex = 0; elt.timerIndex < elt.timers.length; elt.timerIndex++) {
            elt.currentTimer = elt.timers[elt.timerIndex];
            elt.currentTimerSalvaged = false;
            elt.currentTimer.update(dt);
            elt.currentTimer = null
        }
        if (self._currentTargetSalvaged && elt.timers.length == 0) {
            self._removeHashElement(elt);
            i--
        }
    }
    for (i = 0, li = locUpdates.length; i < li; i++) {
        var update = self._updates[i];
        for (var j = 0, lj = update.length; j < lj;) {
            tmpEntry = update[j];
            if (!tmpEntry)break;
            if (tmpEntry.markedForDeletion)self._removeUpdateFromHash(tmpEntry); else j++
        }
    }
    self._updateHashLocked = false;
    self._currentTarget = null
}, scheduleCallbackForTarget: function (target, callback_fn, interval, repeat, delay, paused) {
    cc.assert(callback_fn, cc._LogInfos.Scheduler_scheduleCallbackForTarget_2);
    cc.assert(target, cc._LogInfos.Scheduler_scheduleCallbackForTarget_3);
    interval = interval || 0;
    repeat = repeat == null ? cc.REPEAT_FOREVER : repeat;
    delay = delay || 0;
    paused = paused || false;
    var self = this, timer;
    var element = self._hashForTimers[target.__instanceId];
    if (!element) {
        element = new cc.HashTimerEntry(null, target, 0, null, null, paused, null);
        self._arrayForTimers.push(element);
        self._hashForTimers[target.__instanceId] = element
    }
    if (element.timers ==
        null)element.timers = []; else for (var i = 0; i < element.timers.length; i++) {
        timer = element.timers[i];
        if (callback_fn == timer._callback) {
            cc.log(cc._LogInfos.Scheduler_scheduleCallbackForTarget, timer.getInterval().toFixed(4), interval.toFixed(4));
            timer._interval = interval;
            return
        }
    }
    timer = new cc.Timer(target, callback_fn, interval, repeat, delay);
    element.timers.push(timer)
}, scheduleUpdateForTarget: function (target, priority, paused) {
    if (target === null)return;
    var self = this, locUpdates = self._updates;
    var hashElement = self._hashForUpdates[target.__instanceId];
    if (hashElement) {
        hashElement.entry.markedForDeletion = false;
        return
    }
    if (priority == 0)self._appendIn(locUpdates[1], target, paused); else if (priority < 0)locUpdates[0] = self._priorityIn(locUpdates[0], target, priority, paused); else locUpdates[2] = self._priorityIn(locUpdates[2], target, priority, paused)
}, unscheduleCallbackForTarget: function (target, callback_fn) {
    if (target == null || callback_fn == null)return;
    var self = this, element = self._hashForTimers[target.__instanceId];
    if (element) {
        var timers = element.timers;
        for (var i = 0, li =
            timers.length; i < li; i++) {
            var timer = timers[i];
            if (callback_fn == timer._callback) {
                if (timer == element.currentTimer && !element.currentTimerSalvaged)element.currentTimerSalvaged = true;
                timers.splice(i, 1);
                if (element.timerIndex >= i)element.timerIndex--;
                if (timers.length == 0)if (self._currentTarget == element)self._currentTargetSalvaged = true; else self._removeHashElement(element);
                return
            }
        }
    }
}, unscheduleUpdateForTarget: function (target) {
    if (target == null)return;
    var self = this, element = self._hashForUpdates[target.__instanceId];
    if (element != null)if (self._updateHashLocked)element.entry.markedForDeletion = true; else self._removeUpdateFromHash(element.entry)
}, unscheduleAllCallbacksForTarget: function (target) {
    if (target == null)return;
    var self = this, element = self._hashForTimers[target.__instanceId];
    if (element) {
        var timers = element.timers;
        if (!element.currentTimerSalvaged && timers.indexOf(element.currentTimer) >= 0)element.currentTimerSalvaged = true;
        timers.length = 0;
        if (self._currentTarget == element)self._currentTargetSalvaged = true; else self._removeHashElement(element)
    }
    self.unscheduleUpdateForTarget(target)
},
    unscheduleAllCallbacks: function () {
        this.unscheduleAllCallbacksWithMinPriority(cc.Scheduler.PRIORITY_SYSTEM)
    }, unscheduleAllCallbacksWithMinPriority: function (minPriority) {
        var self = this, locArrayForTimers = self._arrayForTimers, locUpdates = self._updates;
        for (var i = 0, li = locArrayForTimers.length; i < li; i++)self.unscheduleAllCallbacksForTarget(locArrayForTimers[i].target);
        for (var i = 2; i >= 0; i--) {
            if (i == 1 && minPriority > 0 || i == 0 && minPriority >= 0)continue;
            var updates = locUpdates[i];
            for (var j = 0, lj = updates.length; j < lj; j++)self.unscheduleUpdateForTarget(updates[j].target)
        }
    },
    pauseAllTargets: function () {
        return this.pauseAllTargetsWithMinPriority(cc.Scheduler.PRIORITY_SYSTEM)
    }, pauseAllTargetsWithMinPriority: function (minPriority) {
        var idsWithSelectors = [];
        var self = this, element, locArrayForTimers = self._arrayForTimers, locUpdates = self._updates;
        for (var i = 0, li = locArrayForTimers.length; i < li; i++) {
            element = locArrayForTimers[i];
            if (element) {
                element.paused = true;
                idsWithSelectors.push(element.target)
            }
        }
        for (var i = 0, li = locUpdates.length; i < li; i++) {
            var updates = locUpdates[i];
            for (var j = 0, lj = updates.length; j <
                lj; j++) {
                element = updates[j];
                if (element) {
                    element.paused = true;
                    idsWithSelectors.push(element.target)
                }
            }
        }
        return idsWithSelectors
    }, resumeTargets: function (targetsToResume) {
        if (!targetsToResume)return;
        for (var i = 0; i < targetsToResume.length; i++)this.resumeTarget(targetsToResume[i])
    }, pauseTarget: function (target) {
        cc.assert(target, cc._LogInfos.Scheduler_pauseTarget);
        var self = this, element = self._hashForTimers[target.__instanceId];
        if (element)element.paused = true;
        var elementUpdate = self._hashForUpdates[target.__instanceId];
        if (elementUpdate)elementUpdate.entry.paused = true
    }, resumeTarget: function (target) {
        cc.assert(target, cc._LogInfos.Scheduler_resumeTarget);
        var self = this, element = self._hashForTimers[target.__instanceId];
        if (element)element.paused = false;
        var elementUpdate = self._hashForUpdates[target.__instanceId];
        if (elementUpdate)elementUpdate.entry.paused = false
    }, isTargetPaused: function (target) {
        cc.assert(target, cc._LogInfos.Scheduler_isTargetPaused);
        var element = this._hashForTimers[target.__instanceId];
        if (element)return element.paused;
        return false
    }});
cc.Scheduler.PRIORITY_SYSTEM = -2147483647 - 1;
_tmp.PrototypeLabelTTF = function () {
    var _p = cc.LabelTTF.prototype;
    cc.defineGetterSetter(_p, "color", _p.getColor, _p.setColor);
    cc.defineGetterSetter(_p, "opacity", _p.getOpacity, _p.setOpacity);
    _p.string;
    cc.defineGetterSetter(_p, "string", _p.getString, _p.setString);
    _p.textAlign;
    cc.defineGetterSetter(_p, "textAlign", _p.getHorizontalAlignment, _p.setHorizontalAlignment);
    _p.verticalAlign;
    cc.defineGetterSetter(_p, "verticalAlign", _p.getVerticalAlignment, _p.setVerticalAlignment);
    _p.fontSize;
    cc.defineGetterSetter(_p,
        "fontSize", _p.getFontSize, _p.setFontSize);
    _p.fontName;
    cc.defineGetterSetter(_p, "fontName", _p.getFontName, _p.setFontName);
    _p.font;
    cc.defineGetterSetter(_p, "font", _p._getFont, _p._setFont);
    _p.boundingSize;
    _p.boundingWidth;
    cc.defineGetterSetter(_p, "boundingWidth", _p._getBoundingWidth, _p._setBoundingWidth);
    _p.boundingHeight;
    cc.defineGetterSetter(_p, "boundingHeight", _p._getBoundingHeight, _p._setBoundingHeight);
    _p.fillStyle;
    cc.defineGetterSetter(_p, "fillStyle", _p._getFillStyle, _p.setFontFillColor);
    _p.strokeStyle;
    cc.defineGetterSetter(_p, "strokeStyle", _p._getStrokeStyle, _p._setStrokeStyle);
    _p.lineWidth;
    cc.defineGetterSetter(_p, "lineWidth", _p._getLineWidth, _p._setLineWidth);
    _p.shadowOffset;
    _p.shadowOffsetX;
    cc.defineGetterSetter(_p, "shadowOffsetX", _p._getShadowOffsetX, _p._setShadowOffsetX);
    _p.shadowOffsetY;
    cc.defineGetterSetter(_p, "shadowOffsetY", _p._getShadowOffsetY, _p._setShadowOffsetY);
    _p.shadowOpacity;
    cc.defineGetterSetter(_p, "shadowOpacity", _p._getShadowOpacity, _p._setShadowOpacity);
    _p.shadowBlur;
    cc.defineGetterSetter(_p,
        "shadowBlur", _p._getShadowBlur, _p._setShadowBlur)
};
cc.LabelTTF = cc.Sprite.extend({_dimensions: null, _hAlignment: cc.TEXT_ALIGNMENT_CENTER, _vAlignment: cc.VERTICAL_TEXT_ALIGNMENT_TOP, _fontName: null, _fontSize: 0, _string: "", _originalText: null, _isMultiLine: false, _fontStyleStr: null, _shadowEnabled: false, _shadowOffset: null, _shadowOpacity: 0, _shadowBlur: 0, _shadowColorStr: null, _strokeEnabled: false, _strokeColor: null, _strokeSize: 0, _strokeColorStr: null, _textFillColor: null, _fillColorStr: null, _strokeShadowOffsetX: 0, _strokeShadowOffsetY: 0, _needUpdateTexture: false, _labelCanvas: null,
    _labelContext: null, _lineWidths: null, _className: "LabelTTF", ctor: function (text, fontName, fontSize, dimensions, hAlignment, vAlignment) {
        cc.Sprite.prototype.ctor.call(this);
        this._dimensions = cc.size(0, 0);
        this._hAlignment = cc.TEXT_ALIGNMENT_LEFT;
        this._vAlignment = cc.VERTICAL_TEXT_ALIGNMENT_TOP;
        this._opacityModifyRGB = false;
        this._fontStyleStr = "";
        this._fontName = "Arial";
        this._isMultiLine = false;
        this._shadowEnabled = false;
        this._shadowOffset = cc.p(0, 0);
        this._shadowOpacity = 0;
        this._shadowBlur = 0;
        this._shadowColorStr = "rgba(128, 128, 128, 0.5)";
        this._strokeEnabled = false;
        this._strokeColor = cc.color(255, 255, 255, 255);
        this._strokeSize = 0;
        this._strokeColorStr = "";
        this._textFillColor = cc.color(255, 255, 255, 255);
        this._fillColorStr = "rgba(255,255,255,1)";
        this._strokeShadowOffsetX = 0;
        this._strokeShadowOffsetY = 0;
        this._needUpdateTexture = false;
        this._lineWidths = [];
        this._setColorsString();
        if (fontName && fontName instanceof cc.FontDefinition)this.initWithStringAndTextDefinition(text, fontName); else cc.LabelTTF.prototype.initWithString.call(this, text, fontName, fontSize,
            dimensions, hAlignment, vAlignment)
    }, init: function () {
        return this.initWithString(" ", this._fontName, this._fontSize)
    }, _measureConfig: function () {
        this._getLabelContext().font = this._fontStyleStr
    }, _measure: function (text) {
        return this._getLabelContext().measureText(text).width
    }, _checkNextline: function (text, width) {
        var tWidth = this._measure(text);
        var baseNb = Math.floor(text.length * width / tWidth);
        var nextlinebreak = text.indexOf("\n");
        if (baseNb * 0.8 >= nextlinebreak && nextlinebreak > 0)return nextlinebreak + 1;
        if (tWidth < width)return text.length;
        var found = false, l = width + 1, idfound = -1, index = baseNb, result, re = cc.LabelTTF._checkRegEx, reversre = cc.LabelTTF._reverseCheckRegEx, enre = cc.LabelTTF._checkEnRegEx, substr = text.substr(baseNb);
        while (result = re.exec(substr)) {
            index += result[0].length;
            var tem = text.substr(0, index);
            l = this._measure(tem);
            if (result[2] == "\n" && l < width) {
                found = true;
                idfound = index;
                break
            }
            if (l > width) {
                if (idfound != -1)found = true;
                break
            }
            idfound = index;
            substr = text.substr(index)
        }
        if (found)return idfound;
        substr = text.substr(0, baseNb);
        idfound = baseNb;
        while (result =
            reversre.exec(substr)) {
            idfound = result[1].length;
            substr = result[1];
            l = this._measure(substr);
            if (l < width) {
                if (enre.test(result[2]))idfound++;
                break
            }
        }
        return idfound || 1
    }, description: function () {
        return"\x3ccc.LabelTTF | FontName \x3d" + this._fontName + " FontSize \x3d " + this._fontSize.toFixed(1) + "\x3e"
    }, setColor: null, _setColorsString: null, updateDisplayedColor: null, setOpacity: null, updateDisplayedOpacity: null, updateDisplayedOpacityForCanvas: function (parentOpacity) {
        cc.NodeRGBA.prototype.updateDisplayedOpacity.call(this,
            parentOpacity);
        this._setColorsString()
    }, getString: function () {
        return this._string
    }, getHorizontalAlignment: function () {
        return this._hAlignment
    }, getVerticalAlignment: function () {
        return this._vAlignment
    }, getDimensions: function () {
        return cc.size(this._dimensions.width, this._dimensions.height)
    }, getFontSize: function () {
        return this._fontSize
    }, getFontName: function () {
        return this._fontName
    }, initWithString: function (label, fontName, fontSize, dimensions, hAlignment, vAlignment) {
        var strInfo;
        if (label)strInfo = label + ""; else strInfo =
            "";
        fontSize = fontSize || 16;
        dimensions = dimensions || cc.size(0, fontSize);
        hAlignment = hAlignment || cc.TEXT_ALIGNMENT_LEFT;
        vAlignment = vAlignment || cc.VERTICAL_TEXT_ALIGNMENT_TOP;
        this._opacityModifyRGB = false;
        this._dimensions = cc.size(dimensions.width, dimensions.height);
        this._fontName = fontName || "Arial";
        this._hAlignment = hAlignment;
        this._vAlignment = vAlignment;
        this._fontSize = fontSize;
        this._fontStyleStr = this._fontSize + "px '" + fontName + "'";
        this._fontClientHeight = cc.LabelTTF.__getFontHeightByDiv(fontName, this._fontSize);
        this.string = strInfo;
        this._setColorsString();
        this._updateTexture();
        this._needUpdateTexture = false;
        return true
    }, initWithStringAndTextDefinition: null, setTextDefinition: function (theDefinition) {
        if (theDefinition)this._updateWithTextDefinition(theDefinition, true)
    }, getTextDefinition: function () {
        return this._prepareTextDefinition(false)
    }, enableShadow: function (shadowOffsetX, shadowOffsetY, shadowOpacity, shadowBlur) {
        shadowOpacity = shadowOpacity || 0.5;
        if (false === this._shadowEnabled)this._shadowEnabled = true;
        var locShadowOffset =
            this._shadowOffset;
        if (locShadowOffset && locShadowOffset.x != shadowOffsetX || locShadowOffset._y != shadowOffsetY) {
            locShadowOffset.x = shadowOffsetX;
            locShadowOffset.y = shadowOffsetY
        }
        if (this._shadowOpacity != shadowOpacity)this._shadowOpacity = shadowOpacity;
        this._setColorsString();
        if (this._shadowBlur != shadowBlur)this._shadowBlur = shadowBlur;
        this._needUpdateTexture = true
    }, _getShadowOffsetX: function () {
        return this._shadowOffset.x
    }, _setShadowOffsetX: function (x) {
        if (false === this._shadowEnabled)this._shadowEnabled = true;
        if (this._shadowOffset.x != x) {
            this._shadowOffset.x = x;
            this._needUpdateTexture = true
        }
    }, _getShadowOffsetY: function () {
        return this._shadowOffset._y
    }, _setShadowOffsetY: function (y) {
        if (false === this._shadowEnabled)this._shadowEnabled = true;
        if (this._shadowOffset._y != y) {
            this._shadowOffset._y = y;
            this._needUpdateTexture = true
        }
    }, _getShadowOffset: function () {
        return cc.p(this._shadowOffset.x, this._shadowOffset.y)
    }, _setShadowOffset: function (offset) {
        if (false === this._shadowEnabled)this._shadowEnabled = true;
        if (this._shadowOffset.x !=
            offset.x || this._shadowOffset.y != offset.y) {
            this._shadowOffset.x = offset.x;
            this._shadowOffset.y = offset.y;
            this._needUpdateTexture = true
        }
    }, _getShadowOpacity: function () {
        return this._shadowOpacity
    }, _setShadowOpacity: function (shadowOpacity) {
        if (false === this._shadowEnabled)this._shadowEnabled = true;
        if (this._shadowOpacity != shadowOpacity) {
            this._shadowOpacity = shadowOpacity;
            this._setColorsString();
            this._needUpdateTexture = true
        }
    }, _getShadowBlur: function () {
        return this._shadowBlur
    }, _setShadowBlur: function (shadowBlur) {
        if (false ===
            this._shadowEnabled)this._shadowEnabled = true;
        if (this._shadowBlur != shadowBlur) {
            this._shadowBlur = shadowBlur;
            this._needUpdateTexture = true
        }
    }, disableShadow: function () {
        if (this._shadowEnabled) {
            this._shadowEnabled = false;
            this._needUpdateTexture = true
        }
    }, enableStroke: function (strokeColor, strokeSize) {
        if (this._strokeEnabled === false)this._strokeEnabled = true;
        var locStrokeColor = this._strokeColor;
        if (locStrokeColor.r !== strokeColor.r || locStrokeColor.g !== strokeColor.g || locStrokeColor.b !== strokeColor.b) {
            locStrokeColor.r =
                strokeColor.r;
            locStrokeColor.g = strokeColor.g;
            locStrokeColor.b = strokeColor.b;
            this._setColorsString()
        }
        if (this._strokeSize !== strokeSize)this._strokeSize = strokeSize || 0;
        this._needUpdateTexture = true
    }, _getStrokeStyle: function () {
        return this._strokeColor
    }, _setStrokeStyle: function (strokeStyle) {
        if (this._strokeEnabled === false)this._strokeEnabled = true;
        var locStrokeColor = this._strokeColor;
        if (locStrokeColor.r !== strokeStyle.r || locStrokeColor.g !== strokeStyle.g || locStrokeColor.b !== strokeStyle.b) {
            locStrokeColor.r = strokeStyle.r;
            locStrokeColor.g = strokeStyle.g;
            locStrokeColor.b = strokeStyle.b;
            this._setColorsString();
            this._needUpdateTexture = true
        }
    }, _getLineWidth: function () {
        return this._strokeSize
    }, _setLineWidth: function (lineWidth) {
        if (this._strokeEnabled === false)this._strokeEnabled = true;
        if (this._strokeSize !== lineWidth) {
            this._strokeSize = lineWidth || 0;
            this._needUpdateTexture = true
        }
    }, disableStroke: function () {
        if (this._strokeEnabled) {
            this._strokeEnabled = false;
            this._needUpdateTexture = true
        }
    }, setFontFillColor: null, _getFillStyle: function () {
        return this._textFillColor
    },
    _updateWithTextDefinition: function (textDefinition, mustUpdateTexture) {
        if (textDefinition.fontDimensions) {
            this._dimensions.width = textDefinition.boundingWidth;
            this._dimensions.height = textDefinition.boundingHeight
        } else {
            this._dimensions.width = 0;
            this._dimensions.height = 0
        }
        this._hAlignment = textDefinition.textAlign;
        this._vAlignment = textDefinition.verticalAlign;
        this._fontName = textDefinition.fontName;
        this._fontSize = textDefinition.fontSize || 12;
        this._fontStyleStr = this._fontSize + "px '" + this._fontName + "'";
        this._fontClientHeight =
            cc.LabelTTF.__getFontHeightByDiv(this._fontName, this._fontSize);
        if (textDefinition.shadowEnabled)this.enableShadow(textDefinition.shadowOffsetX, textDefinition.shadowOffsetY, textDefinition.shadowOpacity, textDefinition.shadowBlur);
        if (textDefinition.strokeEnabled)this.enableStroke(textDefinition.strokeStyle, textDefinition.lineWidth);
        this.setFontFillColor(textDefinition.fillStyle);
        if (mustUpdateTexture)this._updateTexture()
    }, _prepareTextDefinition: function (adjustForResolution) {
        var texDef = new cc.FontDefinition;
        if (adjustForResolution) {
            texDef.fontSize = this._fontSize;
            texDef.boundingWidth = cc.contentScaleFactor() * this._dimensions.width;
            texDef.boundingHeight = cc.contentScaleFactor() * this._dimensions.height
        } else {
            texDef.fontSize = this._fontSize;
            texDef.boundingWidth = this._dimensions.width;
            texDef.boundingHeight = this._dimensions.height
        }
        texDef.fontName = this._fontName;
        texDef.textAlign = this._hAlignment;
        texDef.verticalAlign = this._vAlignment;
        if (this._strokeEnabled) {
            texDef.strokeEnabled = true;
            var locStrokeColor = this._strokeColor;
            texDef.strokeStyle = cc.color(locStrokeColor.r, locStrokeColor.g, locStrokeColor.b);
            texDef.lineWidth = this._strokeSize
        } else texDef.strokeEnabled = false;
        if (this._shadowEnabled) {
            texDef.shadowEnabled = true;
            texDef.shadowBlur = this._shadowBlur;
            texDef.shadowOpacity = this._shadowOpacity;
            texDef.shadowOffsetX = (adjustForResolution ? cc.contentScaleFactor() : 1) * this._shadowOffset.x;
            texDef.shadowOffsetY = (adjustForResolution ? cc.contentScaleFactor() : 1) * this._shadowOffset.y
        } else texDef._shadowEnabled = false;
        var locTextFillColor =
            this._textFillColor;
        texDef.fillStyle = cc.color(locTextFillColor.r, locTextFillColor.g, locTextFillColor.b);
        return texDef
    }, _fontClientHeight: 18, setString: function (text) {
        text = String(text);
        if (this._originalText != text) {
            this._originalText = text + "";
            this._updateString();
            this._needUpdateTexture = true
        }
    }, _updateString: function () {
        this._string = this._originalText
    }, setHorizontalAlignment: function (alignment) {
        if (alignment !== this._hAlignment) {
            this._hAlignment = alignment;
            this._needUpdateTexture = true
        }
    }, setVerticalAlignment: function (verticalAlignment) {
        if (verticalAlignment !=
            this._vAlignment) {
            this._vAlignment = verticalAlignment;
            this._needUpdateTexture = true
        }
    }, setDimensions: function (dim) {
        if (dim.width != this._dimensions.width || dim.height != this._dimensions.height) {
            this._dimensions = dim;
            this._updateString();
            this._needUpdateTexture = true
        }
    }, _getBoundingWidth: function () {
        return this._dimensions.width
    }, _setBoundingWidth: function (width) {
        if (width != this._dimensions.width) {
            this._dimensions.width = width;
            this._updateString();
            this._needUpdateTexture = true
        }
    }, _getBoundingHeight: function () {
        return this._dimensions.height
    },
    _setBoundingHeight: function (height) {
        if (height != this._dimensions.height) {
            this._dimensions.height = height;
            this._updateString();
            this._needUpdateTexture = true
        }
    }, setFontSize: function (fontSize) {
        if (this._fontSize !== fontSize) {
            this._fontSize = fontSize;
            this._fontStyleStr = fontSize + "px '" + this._fontName + "'";
            this._fontClientHeight = cc.LabelTTF.__getFontHeightByDiv(this._fontName, fontSize);
            this._needUpdateTexture = true
        }
    }, setFontName: function (fontName) {
        if (this._fontName && this._fontName != fontName) {
            this._fontName = fontName;
            this._fontStyleStr = this._fontSize + "px '" + fontName + "'";
            this._fontClientHeight = cc.LabelTTF.__getFontHeightByDiv(fontName, this._fontSize);
            this._needUpdateTexture = true
        }
    }, _getFont: function () {
        return this._fontStyleStr
    }, _setFont: function (fontStyle) {
        var res = cc.LabelTTF._fontStyleRE.exec(fontStyle);
        if (res) {
            this._fontSize = parseInt(res[1]);
            this._fontName = res[2];
            this._fontStyleStr = fontStyle;
            this._fontClientHeight = cc.LabelTTF.__getFontHeightByDiv(this._fontName, this._fontSize);
            this._needUpdateTexture = true
        }
    }, _drawTTFInCanvas: function (context) {
        if (!context)return;
        var locStrokeShadowOffsetX = this._strokeShadowOffsetX, locStrokeShadowOffsetY = this._strokeShadowOffsetY;
        var locContentSizeHeight = this._contentSize.height - locStrokeShadowOffsetY, locVAlignment = this._vAlignment, locHAlignment = this._hAlignment, locFontHeight = this._fontClientHeight, locStrokeSize = this._strokeSize;
        context.setTransform(1, 0, 0, 1, 0 + locStrokeShadowOffsetX * 0.5, locContentSizeHeight + locStrokeShadowOffsetY * 0.5);
        if (context.font != this._fontStyleStr)context.font = this._fontStyleStr;
        context.fillStyle = this._fillColorStr;
        var xOffset = 0, yOffset = 0;
        var locStrokeEnabled = this._strokeEnabled;
        if (locStrokeEnabled) {
            context.lineWidth = locStrokeSize * 2;
            context.strokeStyle = this._strokeColorStr
        }
        if (this._shadowEnabled) {
            var locShadowOffset = this._shadowOffset;
            context.shadowColor = this._shadowColorStr;
            context.shadowOffsetX = locShadowOffset.x;
            context.shadowOffsetY = -locShadowOffset.y;
            context.shadowBlur = this._shadowBlur
        }
        context.textBaseline = cc.LabelTTF._textBaseline[locVAlignment];
        context.textAlign = cc.LabelTTF._textAlign[locHAlignment];
        var locContentWidth =
            this._contentSize.width - locStrokeShadowOffsetX;
        if (locHAlignment === cc.TEXT_ALIGNMENT_RIGHT)xOffset += locContentWidth; else if (locHAlignment === cc.TEXT_ALIGNMENT_CENTER)xOffset += locContentWidth / 2; else xOffset += 0;
        if (this._isMultiLine) {
            var locStrLen = this._strings.length;
            if (locVAlignment === cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM)yOffset = locFontHeight + locContentSizeHeight - locFontHeight * locStrLen; else if (locVAlignment === cc.VERTICAL_TEXT_ALIGNMENT_CENTER)yOffset = locFontHeight / 2 + (locContentSizeHeight - locFontHeight *
                locStrLen) / 2;
            for (var i = 0; i < locStrLen; i++) {
                var line = this._strings[i];
                var tmpOffsetY = -locContentSizeHeight + locFontHeight * i + yOffset;
                if (locStrokeEnabled)context.strokeText(line, xOffset, tmpOffsetY);
                context.fillText(line, xOffset, tmpOffsetY)
            }
        } else if (locVAlignment === cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM) {
            if (locStrokeEnabled)context.strokeText(this._string, xOffset, yOffset);
            context.fillText(this._string, xOffset, yOffset)
        } else if (locVAlignment === cc.VERTICAL_TEXT_ALIGNMENT_TOP) {
            yOffset -= locContentSizeHeight;
            if (locStrokeEnabled)context.strokeText(this._string,
                xOffset, yOffset);
            context.fillText(this._string, xOffset, yOffset)
        } else {
            yOffset -= locContentSizeHeight * 0.5;
            if (locStrokeEnabled)context.strokeText(this._string, xOffset, yOffset);
            context.fillText(this._string, xOffset, yOffset)
        }
    }, _getLabelContext: function () {
        if (this._labelContext)return this._labelContext;
        if (!this._labelCanvas) {
            var locCanvas = cc.newElement("canvas");
            var labelTexture = new cc.Texture2D;
            labelTexture.initWithElement(locCanvas);
            this.texture = labelTexture;
            this._labelCanvas = locCanvas
        }
        this._labelContext =
            this._labelCanvas.getContext("2d");
        return this._labelContext
    }, _updateTTF: function () {
        var locDimensionsWidth = this._dimensions.width, i, strLength;
        var locLineWidth = this._lineWidths;
        locLineWidth.length = 0;
        this._isMultiLine = false;
        this._measureConfig();
        if (locDimensionsWidth !== 0) {
            var text = this._string;
            this._strings = [];
            for (i = 0, strLength = this._string.length; i < strLength;) {
                var next = this._checkNextline(text.substr(i), locDimensionsWidth);
                var append = text.substr(i, next);
                this._strings.push(append);
                i += next
            }
        } else {
            this._strings =
                this._string.split("\n");
            for (i = 0, strLength = this._strings.length; i < strLength; i++)locLineWidth.push(this._measure(this._strings[i]))
        }
        if (this._strings.length > 0)this._isMultiLine = true;
        var locSize, locStrokeShadowOffsetX = 0, locStrokeShadowOffsetY = 0;
        if (this._strokeEnabled)locStrokeShadowOffsetX = locStrokeShadowOffsetY = this._strokeSize * 2;
        if (this._shadowEnabled) {
            var locOffsetSize = this._shadowOffset;
            locStrokeShadowOffsetX += Math.abs(locOffsetSize.x) * 2;
            locStrokeShadowOffsetY += Math.abs(locOffsetSize.y) * 2
        }
        if (locDimensionsWidth ===
            0)if (this._isMultiLine)locSize = cc.size(0 | Math.max.apply(Math, locLineWidth) + locStrokeShadowOffsetX, 0 | this._fontClientHeight * this._strings.length + locStrokeShadowOffsetY); else locSize = cc.size(0 | this._measure(this._string) + locStrokeShadowOffsetX, 0 | this._fontClientHeight + locStrokeShadowOffsetY); else if (this._dimensions.height === 0)if (this._isMultiLine)locSize = cc.size(0 | locDimensionsWidth + locStrokeShadowOffsetX, 0 | this._fontClientHeight * this._strings.length + locStrokeShadowOffsetY); else locSize = cc.size(0 |
            locDimensionsWidth + locStrokeShadowOffsetX, 0 | this._fontClientHeight + locStrokeShadowOffsetY); else locSize = cc.size(0 | locDimensionsWidth + locStrokeShadowOffsetX, 0 | this._dimensions.height + locStrokeShadowOffsetY);
        this.setContentSize(locSize);
        this._strokeShadowOffsetX = locStrokeShadowOffsetX;
        this._strokeShadowOffsetY = locStrokeShadowOffsetY;
        var locAP = this._anchorPoint;
        this._anchorPointInPoints.x = locStrokeShadowOffsetX * 0.5 + (locSize.width - locStrokeShadowOffsetX) * locAP.x;
        this._anchorPointInPoints.y = locStrokeShadowOffsetY *
            0.5 + (locSize.height - locStrokeShadowOffsetY) * locAP.y
    }, getContentSize: function () {
        if (this._needUpdateTexture)this._updateTTF();
        return cc.Sprite.prototype.getContentSize.call(this)
    }, _getWidth: function () {
        if (this._needUpdateTexture)this._updateTTF();
        return cc.Sprite.prototype._getWidth.call(this)
    }, _getHeight: function () {
        if (this._needUpdateTexture)this._updateTTF();
        return cc.Sprite.prototype._getHeight.call(this)
    }, _updateTexture: function () {
        var locContext = this._getLabelContext(), locLabelCanvas = this._labelCanvas;
        var locContentSize = this._contentSize;
        if (this._string.length === 0) {
            locLabelCanvas.width = 1;
            locLabelCanvas.height = locContentSize.height;
            this.setTextureRect(cc.rect(0, 0, 1, locContentSize.height));
            return true
        }
        locContext.font = this._fontStyleStr;
        this._updateTTF();
        var width = locContentSize.width, height = locContentSize.height;
        var flag = locLabelCanvas.width == width && locLabelCanvas.height == height;
        locLabelCanvas.width = width;
        locLabelCanvas.height = height;
        if (flag)locContext.clearRect(0, 0, width, height);
        this._drawTTFInCanvas(locContext);
        this._texture && this._texture.handleLoadedTexture();
        this.setTextureRect(cc.rect(0, 0, width, height));
        return true
    }, visit: function (ctx) {
        if (!this._string || this._string == "")return;
        if (this._needUpdateTexture) {
            this._needUpdateTexture = false;
            this._updateTexture()
        }
        var context = ctx || cc._renderContext;
        cc.Sprite.prototype.visit.call(this, context)
    }, draw: null, _setTextureCoords: function (rect) {
        var tex = this._batchNode ? this.textureAtlas.texture : this._texture;
        if (!tex)return;
        var atlasWidth = tex.pixelsWidth;
        var atlasHeight =
            tex.pixelsHeight;
        var left, right, top, bottom, tempSwap, locQuad = this._quad;
        if (this._rectRotated) {
            if (cc.FIX_ARTIFACTS_BY_STRECHING_TEXEL) {
                left = (2 * rect.x + 1) / (2 * atlasWidth);
                right = left + (rect.height * 2 - 2) / (2 * atlasWidth);
                top = (2 * rect.y + 1) / (2 * atlasHeight);
                bottom = top + (rect.width * 2 - 2) / (2 * atlasHeight)
            } else {
                left = rect.x / atlasWidth;
                right = (rect.x + rect.height) / atlasWidth;
                top = rect.y / atlasHeight;
                bottom = (rect.y + rect.width) / atlasHeight
            }
            if (this._flippedX) {
                tempSwap = top;
                top = bottom;
                bottom = tempSwap
            }
            if (this._flippedY) {
                tempSwap =
                    left;
                left = right;
                right = tempSwap
            }
            locQuad.bl.texCoords.u = left;
            locQuad.bl.texCoords.v = top;
            locQuad.br.texCoords.u = left;
            locQuad.br.texCoords.v = bottom;
            locQuad.tl.texCoords.u = right;
            locQuad.tl.texCoords.v = top;
            locQuad.tr.texCoords.u = right;
            locQuad.tr.texCoords.v = bottom
        } else {
            if (cc.FIX_ARTIFACTS_BY_STRECHING_TEXEL) {
                left = (2 * rect.x + 1) / (2 * atlasWidth);
                right = left + (rect.width * 2 - 2) / (2 * atlasWidth);
                top = (2 * rect.y + 1) / (2 * atlasHeight);
                bottom = top + (rect.height * 2 - 2) / (2 * atlasHeight)
            } else {
                left = rect.x / atlasWidth;
                right = (rect.x + rect.width) /
                    atlasWidth;
                top = rect.y / atlasHeight;
                bottom = (rect.y + rect.height) / atlasHeight
            }
            if (this._flippedX) {
                tempSwap = left;
                left = right;
                right = tempSwap
            }
            if (this._flippedY) {
                tempSwap = top;
                top = bottom;
                bottom = tempSwap
            }
            locQuad.bl.texCoords.u = left;
            locQuad.bl.texCoords.v = bottom;
            locQuad.br.texCoords.u = right;
            locQuad.br.texCoords.v = bottom;
            locQuad.tl.texCoords.u = left;
            locQuad.tl.texCoords.v = top;
            locQuad.tr.texCoords.u = right;
            locQuad.tr.texCoords.v = top
        }
        this._quadDirty = true
    }});
if (cc._renderType === cc._RENDER_TYPE_CANVAS) {
    var _p = cc.LabelTTF.prototype;
    _p.setColor = function (color3) {
        cc.NodeRGBA.prototype.setColor.call(this, color3);
        this._setColorsString()
    };
    _p._setColorsString = function () {
        this._needUpdateTexture = true;
        var locDisplayColor = this._displayedColor, locDisplayedOpacity = this._displayedOpacity;
        var locStrokeColor = this._strokeColor, locFontFillColor = this._textFillColor;
        this._shadowColorStr = "rgba(" + (0 | locDisplayColor.r * 0.5) + "," + (0 | locDisplayColor.g * 0.5) + "," + (0 | locDisplayColor.b *
            0.5) + "," + this._shadowOpacity + ")";
        this._fillColorStr = "rgba(" + (0 | locDisplayColor.r / 255 * locFontFillColor.r) + "," + (0 | locDisplayColor.g / 255 * locFontFillColor.g) + "," + (0 | locDisplayColor.b / 255 * locFontFillColor.b) + ", " + locDisplayedOpacity / 255 + ")";
        this._strokeColorStr = "rgba(" + (0 | locDisplayColor.r / 255 * locStrokeColor.r) + "," + (0 | locDisplayColor.g / 255 * locStrokeColor.g) + "," + (0 | locDisplayColor.b / 255 * locStrokeColor.b) + ", " + locDisplayedOpacity / 255 + ")"
    };
    _p.updateDisplayedColor = function (parentColor) {
        cc.NodeRGBA.prototype.updateDisplayedColor.call(this,
            parentColor);
        this._setColorsString()
    };
    _p.setOpacity = function (opacity) {
        if (this._opacity === opacity)return;
        cc.Sprite.prototype.setOpacity.call(this, opacity);
        this._setColorsString();
        this._needUpdateTexture = true
    };
    _p.updateDisplayedOpacity = cc.Sprite.prototype.updateDisplayedOpacity;
    _p.initWithStringAndTextDefinition = function (text, textDefinition) {
        this._updateWithTextDefinition(textDefinition, false);
        this.string = text;
        return true
    };
    _p.setFontFillColor = function (tintColor) {
        var locTextFillColor = this._textFillColor;
        if (locTextFillColor.r != tintColor.r || locTextFillColor.g != tintColor.g || locTextFillColor.b != tintColor.b) {
            locTextFillColor.r = tintColor.r;
            locTextFillColor.g = tintColor.g;
            locTextFillColor.b = tintColor.b;
            this._setColorsString();
            this._needUpdateTexture = true
        }
    };
    _p.draw = cc.Sprite.prototype.draw;
    _p.setTextureRect = function (rect, rotated, untrimmedSize) {
        this._rectRotated = rotated || false;
        untrimmedSize = untrimmedSize || rect;
        this.setContentSize(untrimmedSize);
        this.setVertexRect(rect);
        var locTextureCoordRect = this._textureRect_Canvas;
        locTextureCoordRect.x = rect.x;
        locTextureCoordRect.y = rect.y;
        locTextureCoordRect.width = rect.width;
        locTextureCoordRect.height = rect.height;
        locTextureCoordRect.validRect = !(locTextureCoordRect.width === 0 || locTextureCoordRect.height === 0 || locTextureCoordRect.x < 0 || locTextureCoordRect.y < 0);
        var relativeOffset = this._unflippedOffsetPositionFromCenter;
        if (this._flippedX)relativeOffset.x = -relativeOffset.x;
        if (this._flippedY)relativeOffset.y = -relativeOffset.y;
        this._offsetPosition.x = relativeOffset.x + (this._contentSize.width -
            this._rect.width) / 2;
        this._offsetPosition.y = relativeOffset.y + (this._contentSize.height - this._rect.height) / 2;
        if (this._batchNode)this.dirty = true
    };
    _p = null
} else {
    _tmp.WebGLLabelTTF();
    delete _tmp.WebGLLabelTTF
}
_tmp.PrototypeLabelTTF();
delete _tmp.PrototypeLabelTTF;
cc.LabelTTF._textAlign = ["left", "center", "right"];
cc.LabelTTF._textBaseline = ["top", "middle", "bottom"];
cc.LabelTTF._checkRegEx = /(.+?)([\s\n\r\-\/\\\:]|[\u4E00-\u9FA5]|[\uFE30-\uFFA0])/;
cc.LabelTTF._reverseCheckRegEx = /(.*)([\s\n\r\-\/\\\:]|[\u4E00-\u9FA5]|[\uFE30-\uFFA0])/;
cc.LabelTTF._checkEnRegEx = /[\s\-\/\\\:]/;
cc.LabelTTF._fontStyleRE = /^(\d+)px\s+['"]?([\w\s\d]+)['"]?$/;
cc.LabelTTF.create = function (text, fontName, fontSize, dimensions, hAlignment, vAlignment) {
    return new cc.LabelTTF(text, fontName, fontSize, dimensions, hAlignment, vAlignment)
};
if (cc.USE_LA88_LABELS)cc.LabelTTF._SHADER_PROGRAM = cc.SHADER_POSITION_TEXTURECOLOR; else cc.LabelTTF._SHADER_PROGRAM = cc.SHADER_POSITION_TEXTUREA8COLOR;
cc.LabelTTF.__labelHeightDiv = cc.newElement("div");
cc.LabelTTF.__labelHeightDiv.style.fontFamily = "Arial";
cc.LabelTTF.__labelHeightDiv.style.position = "absolute";
cc.LabelTTF.__labelHeightDiv.style.left = "-100px";
cc.LabelTTF.__labelHeightDiv.style.top = "-100px";
cc.LabelTTF.__labelHeightDiv.style.lineHeight = "normal";
document.body ? document.body.appendChild(cc.LabelTTF.__labelHeightDiv) : cc._addEventListener(window, "load", function () {
    this.removeEventListener("load", arguments.callee, false);
    document.body.appendChild(cc.LabelTTF.__labelHeightDiv)
}, false);
cc.LabelTTF.__getFontHeightByDiv = function (fontName, fontSize) {
    var clientHeight = cc.LabelTTF.__fontHeightCache[fontName + "." + fontSize];
    if (clientHeight > 0)return clientHeight;
    var labelDiv = cc.LabelTTF.__labelHeightDiv;
    labelDiv.innerHTML = "ajghl~!";
    labelDiv.style.fontFamily = fontName;
    labelDiv.style.fontSize = fontSize + "px";
    clientHeight = labelDiv.clientHeight;
    cc.LabelTTF.__fontHeightCache[fontName + "." + fontSize] = clientHeight;
    labelDiv.innerHTML = "";
    return clientHeight
};
cc.LabelTTF.__fontHeightCache = {};