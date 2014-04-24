var plugin = plugin || {};
plugin.Version = "0.2.0";
plugin.PluginParam = function (type, value) {
    var paramType = plugin.PluginParam.ParamType, tmpValue;
    switch (type) {
        case paramType.TypeInt:
            tmpValue = parseInt(value);
            break;
        case paramType.TypeFloat:
            tmpValue = parseFloat(value);
            break;
        case paramType.TypeBool:
            tmpValue = Boolean(value);
            break;
        case paramType.TypeString:
            tmpValue = String(value);
            break;
        case paramType.TypeStringMap:
            tmpValue = JSON.stringify(value);
            break;
        default:
            tmpValue = value
    }
    return tmpValue
};
plugin.PluginParam.ParamType = {TypeInt: 1, TypeFloat: 2, TypeBool: 3, TypeString: 4, TypeStringMap: 5};
plugin.PluginParam.AdsResultCode = {AdsReceived: 0, FullScreenViewShown: 1, FullScreenViewDismissed: 2, PointsSpendSucceed: 3, PointsSpendFailed: 4, NetworkError: 5, UnknownError: 6};
plugin.PluginParam.PayResultCode = {PaySuccess: 0, PayFail: 1, PayCancel: 2, PayTimeOut: 3};
plugin.PluginParam.ShareResultCode = {ShareSuccess: 0, ShareFail: 1, ShareCancel: 2, ShareTimeOut: 3};
cc.openURL = function (url) {
    if (this.isMobile) {
        var size = cc.director.getWinSize();
        var w = size.width + "px";
        var h = size.height + "px";
        var div = cc.$new("div");
        div.style.backgroundColor = "#ffffff";
        div.style.width = w;
        div.style.height = h;
        div.style.zindex = 1E3;
        div.style.position = "absolute";
        div.style.top = 0 + "px";
        div.style.left = 0 + "px";
        div.id = "cocos2d-browser";
        var iframe = cc.$new("iframe");
        iframe.src = url;
        iframe.style.width = w;
        iframe.style.height = h;
        iframe.setAttribute("frameborder", "no");
        iframe.setAttribute("scrolling", "no");
        div.appendChild(iframe);
        iframe.onload = function () {
            var close = document.createElement("img");
            close.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5OERBMEM3OUQzRTMxMUUyODg2Q0RFNjU1QkU1RjlFQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5OERBMEM3QUQzRTMxMUUyODg2Q0RFNjU1QkU1RjlFQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk4REEwQzc3RDNFMzExRTI4ODZDREU2NTVCRTVGOUVBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk4REEwQzc4RDNFMzExRTI4ODZDREU2NTVCRTVGOUVBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+NwBuoAAAA/tJREFUeNrEWF0sW3EUb6+28zFhbGadsBaNhazV+kpDYhFWKRGWbHvwFV5IvPiIFw9evElEPEiWSUgsIWoIglhmUomPxj6aKC0zKVJjtPU5o9j5J7dLdbf33jKc5Jfc3v+v5/+755x7/j1lMoiNBRDh4AO88HvO2m+ACbAC+AJQAyz2JCbBFyMBWQA/xv+3DUAXLuivudhcY4BMwCuAB+NqDPmNAnAAOsCZvQgk4BnjeiwEwAbM2YoQA14yrteQEANgDcML7gXjZgw9OAuJkADu3JAIb7Q/hr+GtCwuLs6LDq+iooLvhBAREhFEl11ZWRne0tIiIeNIpVKv4uJi4dTUVApNt0EY3ohILSIiwqO7u1sql8vD8vLyJJ2dnXH2HDabzczPz3/Y1taWzOfz78XExDxSq9Vyd3d3jMK9F2pWr6lEtLa2RmVnZ4tt7w0NDWlTU1OVtkK7urqSQ0NDzzW5hYWFjcTExAGDwXDkyD+VSkZ7e3tsWlpamP19mUwWplQqk9B1UlKST3NzczxE4K49D4mCiDwn24PyPMjIyHjs6urKIVpLSEgInp6eZsM6Kzw8nEvEMZvNBxC1BbI9KCMhkUgUy8vLRpL1QIFA4EcSyZmcnJzpS4mYnZ3dj46O7p2fn193xIGi/CeiFovlFIp5pqGhYZ5qD1qFiQxCjk1OTsqEQmEAFReloL+/X0sVAadFWE2n02VA+O+TcVZXV01QkO8ODw9P6fjEnO2zvb2936g4XC7XG4rWm65P2iL8/f05kN8nBQUFQkqnGMYcGBjIys3N5dLxjY7ydDrE6urqsNLSUqmbmxuH1tOBkMzMTIHRaNxSqVTmS4soKyvjFRUViTw9PV2dTR901WAOh7M/MjKyeeHCbGpqEhcWFkY5Wl9aWtpUKBRaONziSbsii/Xm5OTk7EIdU6/X7zpaW1xc/Al5HxkfH9/e2dk5rqmpeUrE6+vr06ADzpEIlI5kMjFwPhh5PB5DJBKdK7KDg4Oj2tpaVUdHxw/0eWxszIjyj8Jvy4N60FdVVX2Grnt4dkaowYJESAG3yaLR09Oz5uvrexwbGxuAR2erpKTkI6RqxW5DM6RnLT09PQQV5vDwsDYlJWUU+I4EIDMhEQLAA6q0DA4OrqMCg/c/qL6+XtXY2Kgn4sGJuavRaFbFYrFPeXn5FIj6ReFa64KnIpJOpaMK39vbM9XV1X13lF9kc3Nz+xMTEwZo89s03A4ycRE1N/RjF/WPKgyfDRU39Gu7w1qYyNYAtwDB1yhgGPDBfgzU4bMi7xoEjAI6iWZRdGMGH80Cr2goRlP5W8B7qwBHfw1YO6kEH4yC8EnJ5QKbnuDFh17nr4BPRP9P/BFgAHo7ZNgI9EbHAAAAAElFTkSuQmCC";
            div.appendChild(close);
            close.style.zindex = 1E3;
            close.style.position = "absolute";
            close.style.bottom = 10 + "px";
            close.style.right = 10 + "px";
            close.onclick = function () {
                div.remove()
            }
        };
        var tag = document["ccConfig"].tag;
        var parent = document.getElementById(tag).parentNode;
        if (parent)parent.appendChild(div)
    } else window.open(url)
};
plugin.PluginData = function (obj, className) {
    this.obj = obj;
    this.className = className
};
plugin.PluginUtils = {_objMap: {}, _pluginMap: {}, initPlugin: function (tmpPlugin, obj, className) {
    var data = new plugin.PluginData(obj, className);
    this.setPluginData(tmpPlugin, data)
}, getPluginData: function (keyObj) {
    return this._objMap[keyObj._pluginName]
}, setPluginData: function (plugin, data) {
    this.erasePluginData(plugin);
    this._objMap[data.className] = data;
    this._pluginMap[data.className] = plugin
}, erasePluginData: function (keyObj) {
    var data = this._objMap[keyObj];
    if (data) {
        var key = data.className;
        var pluginIt = this._pluginMap[key];
        if (pluginIt)delete this._pluginMap[key];
        delete this._objMap[keyObj]
    }
}, getPluginPtr: function (obj) {
    return this._pluginMap[obj.className]
}, getObjFromParam: function (param) {
}, createDictFromMap: function (paramMap) {
    return paramMap
}, callOCFunctionWithName_oneParam: function (tmpPlugin, funcName, param) {
}, callOCFunctionWithName: function (tmpPlugin, funcName) {
}, callOCIntFunctionWithName_oneParam: function (tmpPlugin, funcName, param) {
}, callOCIntFunctionWithName: function (tmpPlugin, funcName) {
}, callOCFloatFunctionWithName_oneParam: function (tmpPlugin, funcName, param) {
}, callOCFloatFunctionWithName: function (tmpPlugin, funcName) {
}, callOCBoolFunctionWithName_oneParam: function (tmpPlugin, funcName, param) {
}, callOCBoolFunctionWithName: function (tmpPlugin, funcName) {
}, callOCStringFunctionWithName_oneParam: function (tmpPlugin, funcName, param) {
}, callOCStringFunctionWithName: function (tmpPlugin, funcName) {
}, callRetFunctionWithParam: function (tmpPlugin, funcName, param) {
}, callRetFunction: function (tmpPlugin, funcName) {
}};
plugin.PluginProtocol = cc.Class.extend({_pluginName: null, setPluginName: function (name) {
    this._pluginName = name
}, getPluginName: function () {
    return this._pluginName
}, getPluginVersion: function () {
    var verName;
    var data = plugin.PluginUtils.getPluginData(this);
    if (data) {
        var obj = data.obj;
        verName = obj.getPluginVersion()
    } else throw"Plugin " + this.getPluginName() + " not right initilized";
    return verName
}, getSDKVersion: function () {
    var verName;
    var data = plugin.PluginUtils.getPluginData(this);
    if (data) {
        var pOCObj = data.obj;
        verName =
            pOCObj.getSDKVersion()
    } else throw"Plugin " + this.getPluginName() + " not right initilized";
    return verName
}, setDebugMode: function (debug) {
}, callFuncWithParam: function (funcName, param) {
}, callStringFuncWithParam: function (funcName, param) {
}, callIntFuncWithParam: function (funcName, param) {
}, callBoolFuncWithParam: function (funcName, param) {
}, callFloatFuncWithParam: function (funcName, param) {
}});
plugin.ShareResultCode = {Success: 0, Fail: 1, Cancel: 2, TimeOut: 3};
plugin.ShareResultListener = cc.Class.extend({onShareResult: function (ret, msg) {
}});
plugin.ProtocolSocial = plugin.PluginProtocol.extend({onShareResult: function (ret, msg) {
    if (this._listener)this._listener.onShareResult(ret, msg); else cc.log("Share result listener of " + this.getPluginName() + " is null!");
    cc.log("Share result of " + this.getPluginName() + " is : " + ret + msg)
}, setResultListener: function (listener) {
    this._listener = listener
}, share: function (info) {
    if (Object.keys(info).length == 0) {
        if (null != this._listener)this.onShareResult(plugin.ShareResultCode.Fail, "Share info error");
        cc.log("The Share info of " +
            this.getPluginName() + " is empty!")
    } else {
        var data = plugin.PluginUtils.getPluginData(this);
        var obj = data.obj;
        obj.share(info)
    }
}, configDeveloperInfo: function (devInfo) {
    if (Object.keys(devInfo).length == 0)cc.log("The developer info is empty for " + this.getPluginName()); else {
        var data = plugin.PluginUtils.getPluginData(this);
        var obj = data.obj;
        obj.configDeveloperInfo(devInfo)
    }
}, setDebugMode: function (value) {
}});
plugin.AdsResultCode = {AdsReceived: 0, FullScreenViewShown: 1, FullScreenViewDismissed: 2, PointsSpendSucceed: 3, PointsSpendFailed: 4, NetworkError: 5, UnknownError: 6};
plugin.AdsType = {BannerAd: 0, FullScreenAd: 1};
plugin.AdsPos = {Center: 0, Top: 1, TopLeft: 2, TopRight: 3, Bottom: 4, BottomLeft: 5, BottomRight: 6};
plugin.AdsResultListener = cc.Class.extend({onAdsResult: function (code, msg) {
}, onPlayerGetPoints: function (adsPlugin, points) {
}});
plugin.ProtocolAds = plugin.PluginProtocol.extend({configDeveloperInfo: function (devInfo) {
    if (typeof devInfo !== "object")cc.log("The devInfo is not an object for configDeveloperInfo() in " + this.getPluginName()); else plugin.PluginUtils.getPluginData(this).obj.configDeveloperInfo(devInfo)
}, showAds: function (type, sizeEnum, pos) {
    if (typeof type === "undefined")cc.log("The type is empty for showAds() in " + this.getPluginName()); else plugin.PluginUtils.getPluginData(this).obj.showAds(type, sizeEnum, pos)
}, hideAds: function (type) {
    plugin.PluginUtils.getPluginData(this).obj.hideAds(type)
},
    spendPoints: function (points) {
        if (typeof points === "undefined")cc.log("Points is empty for spendPoints() in " + this.getPluginName()); else plugin.PluginUtils.getPluginData(this).obj.spendPoints(points)
    }, setAdsListener: function (listener) {
        if (typeof listener === "undefined")cc.log("Listener is empty for setAdsListener() in " + this.getPluginName()); else plugin.PluginUtils.getPluginData(this).obj.setAdsListener(listener)
    }, setDebugMode: function (enabled) {
        plugin.PluginUtils.getPluginData(this).obj.setDebugMode(enabled ?
            true : false)
    }});
plugin.ProtocolAnalytics = plugin.PluginProtocol.extend({startSession: function (appKey) {
    if (typeof appKey !== "string" || appKey.length === 0)cc.log("The app key is empty for " + this.getPluginName()); else plugin.PluginUtils.getPluginData(this).obj.startSession(appKey)
}, stopSession: function () {
    plugin.PluginUtils.getPluginData(this).obj.stopSession()
}, setSessionContinueMillis: function (millis) {
    if (typeof millis !== "number")cc.log("The parameter milliseconds is not a number for " + this.getPluginName()); else plugin.PluginUtils.getPluginData(this).obj.setSessionContinueMillis(millis)
},
    logError: function (errorId, message) {
        if (typeof errorId === "undefined" || typeof message === "undefined")cc.log("The errorId or message is empty for " + this.getPluginName()); else plugin.PluginUtils.getPluginData(this).obj.logError(errorId, message)
    }, logEvent: function (eventId, params) {
        if (typeof eventId === "undefined")cc.log("The eventId is empty for " + this.getPluginName()); else plugin.PluginUtils.getPluginData(this).obj.logEvent(eventId, params)
    }, logTimedEventBegin: function (eventId) {
        if (typeof eventId === "undefined")cc.log("The eventId is empty for " +
            this.getPluginName()); else plugin.PluginUtils.getPluginData(this).obj.logTimedEventBegin(eventId)
    }, logTimedEventEnd: function (eventId) {
        if (typeof eventId === "undefined")cc.log("The eventId is empty for " + this.getPluginName()); else plugin.PluginUtils.getPluginData(this).obj.logTimedEventEnd(eventId)
    }, setCaptureUncaughtException: function (enabled) {
        plugin.PluginUtils.getPluginData(this).obj.setCaptureUncaughtException(enabled)
    }, setDebugMode: function (enabled) {
        plugin.PluginUtils.getPluginData(this).obj.setDebugMode(enabled)
    }});
plugin.PluginType = {ADS: ["AdSense"], ANALYTICS: ["AdsGoogle", "AnalyticsFlurry"], IAP: [""], SOCIAL: ["SocialTwitter", "SocialFacebook", "SocialQzone", "SocialQQWeibo", "SocialWeibo"]};
plugin.PluginFactory = cc.Class.extend({createPlugin: function (name) {
    if (name == null || name.length == 0)return null;
    var ret;
    var obj = new plugin[name];
    obj.init();
    switch (name) {
        case plugin.PluginType.ADS[0]:
            ret = new plugin.ProtocolAds;
            break;
        case plugin.PluginType.ANALYTICS[0]:
        case plugin.PluginType.ANALYTICS[1]:
            ret = new plugin.ProtocolAnalytics;
            break;
        case plugin.PluginType.IAP:
            ret = new plugin.ProtocolIAP;
            break;
        case plugin.PluginType.SOCIAL[0]:
        case plugin.PluginType.SOCIAL[1]:
        case plugin.PluginType.SOCIAL[2]:
        case plugin.PluginType.SOCIAL[3]:
        case plugin.PluginType.SOCIAL[4]:
            ret =
                new plugin.ProtocolSocial;
            break;
        default:
            throw"Plugin " + name + " not implements a right protocol";
    }
    if (ret !== null) {
        ret.setPluginName(name);
        plugin.PluginUtils.initPlugin(ret, obj, name)
    }
    return ret
}});
plugin.PluginFactory.getInstance = function () {
    if (!this._instnace)this._instnace = new plugin.PluginFactory;
    return this._instnace
};
plugin.PluginFactory.purgeFactory = function () {
    if (this._instnace)delete this._instnace
};
var plugin = plugin || {};
plugin.PluginManager = cc.Class.extend({_pluginsMap: null, ctor: function () {
    this._pluginsMap = {}
}, unloadPlugin: function (name) {
    if (name == null || name.length == 0)return;
    if (this._pluginsMap[name])delete this._pluginsMap[name]
}, loadPlugin: function (name) {
    if (name == null || name.length == 0)return null;
    var tmpPlugin;
    if (this._pluginsMap[name])tmpPlugin = this._pluginsMap[name]; else {
        tmpPlugin = plugin.PluginFactory.getInstance().createPlugin(name);
        this._pluginsMap[name] = tmpPlugin
    }
    return tmpPlugin
}});
plugin.PluginManager.getInstance = function () {
    if (!this._instance)this._instance = new plugin.PluginManager;
    return this._instance
};
plugin.PluginManager.end = function () {
    if (this._instance != null)delete this._instance
};
plugin.SocialWeibo = cc.Class.extend({_shareInfo: null, init: function () {
    this._shareInfo = {"appkey": 12345678, "title": "Hello, Cocos2d-html5!", "url": window.location.href, "pic": null}
}, configDeveloperInfo: function (cpInfo) {
    this._shareInfo.appkey = cpInfo["WeiboAppKey"]
}, share: function (shareInfo) {
    this._shareInfo.title = shareInfo["SharedText"];
    this._shareInfo.pic = shareInfo["SharedImagePath"];
    var urlstring = "?", value;
    for (var key in this._shareInfo) {
        value = this._shareInfo[key];
        if (value)urlstring += encodeURI(key + "\x3d" +
            value) + "\x26"
    }
    urlstring = urlstring.substr(0, urlstring.length - 1);
    cc.openURL("http://v.t.sina.com.cn/share/share.php?" + urlstring)
}, setDebugMode: function (debug) {
}, getSDKVersion: function () {
    return"2.0"
}, getPluginVersion: function () {
    return plugin.Version
}});
plugin.SocialQQWeibo = cc.Class.extend({_shareInfo: null, init: function () {
    this._shareInfo = {"appkey": 12345678, "title": "Hello, Cocos2d-html5!", "url": window.location.href, "pic": null}
}, configDeveloperInfo: function (cpInfo) {
    this._shareInfo.appkey = cpInfo["QQWeiboAppKey"]
}, share: function (shareInfo) {
    this._shareInfo.title = shareInfo["SharedText"];
    this._shareInfo.pic = shareInfo["SharedImagePath"];
    var urlstring = "", value;
    for (var key in this._shareInfo) {
        value = this._shareInfo[key];
        if (value !== null)urlstring += encodeURI(key +
            "\x3d" + value) + "\x26"
    }
    urlstring = urlstring.substr(0, urlstring.length - 1);
    cc.openURL("http://share.v.t.qq.com/index.php?c\x3dshare\x26a\x3dindex\x26" + urlstring)
}, setDebugMode: function (debug) {
}, getSDKVersion: function () {
    return"unkown"
}, getPluginVersion: function () {
    return plugin.Version
}});
plugin.SocialQzone = cc.Class.extend({_shareInfo: null, init: function () {
    this._shareInfo = {"desc": "Hello, Cocos2d-html5!", "url": window.location.href, "pics": null, "showcount": 1}
}, configDeveloperInfo: function (cpInfo) {
}, share: function (shareInfo) {
    this._shareInfo.desc = shareInfo["SharedText"];
    this._shareInfo.pics = shareInfo["SharedImagePath"];
    var url = shareInfo["SharedURLPath"];
    if (url !== null)this._shareInfo.url = url;
    var urlstring = "", value;
    for (var key in this._shareInfo) {
        value = this._shareInfo[key];
        if (value)urlstring +=
            encodeURI(key + "\x3d" + value) + "\x26"
    }
    urlstring = urlstring.substr(0, urlstring.length - 1);
    cc.openURL("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + urlstring)
}, setDebugMode: function (debug) {
}, getSDKVersion: function () {
    return"unkown"
}, getPluginVersion: function () {
    return plugin.Version
}});
plugin.SocialTwitter = cc.Class.extend({_shareInfo: null, init: function () {
    this._shareInfo = {"appkey": 12345678, "title": "Hello, Cocos2d-html5!", "url": window.location.href, "pic": null}
}, configDeveloperInfo: function (cpInfo) {
    this._shareInfo.appkey = cpInfo["WeiboAppKey"]
}, share: function (shareInfo) {
    this._shareInfo.title = shareInfo["SharedText"];
    this._shareInfo.pic = shareInfo["SharedImagePath"];
    cc.openURL("http://twitter.com/intent/tweet?text\x3d" + this._shareInfo.title + " " + this._shareInfo.url)
}, setDebugMode: function (debug) {
},
    getSDKVersion: function () {
        return"20130607"
    }, getPluginVersion: function () {
        return plugin.Version
    }});
plugin.SocialFacebook = cc.Class.extend({init: function () {
    this._shareInfo = {"url": window.location.href}
}, configDeveloperInfo: function (cpInfo) {
}, share: function (shareInfo) {
    var url = shareInfo["SharedURLPath"];
    if (url !== null)this._shareInfo.url = url;
    cc.openURL("http://www.facebook.com/sharer/sharer.php?u\x3d" + url)
}, setDebugMode: function (debug) {
}, getSDKVersion: function () {
    return"unkown"
}, getPluginVersion: function () {
    return plugin.Version
}});
plugin.AnalyticsFlurry = cc.Class.extend({debug: false, init: function () {
    if (typeof FlurryAgent === "undefined")cc.log("FlurryAgent unavailable. Please ensure that flurry.js has been pre-loaded.")
}, startSession: function (appKey) {
    this.debugLog("Starting Flurry session");
    FlurryAgent.startSession(appKey)
}, stopSession: function () {
    this.debugLog("Ending Flurry session");
    FlurryAgent.endSession()
}, setSessionContinueMillis: function (millis) {
    var seconds = parseInt(millis / 1E3);
    this.debugLog("Setting Flurry session continue seconds to " +
        seconds + "s");
    FlurryAgent.setSessionContinueSeconds(seconds)
}, logError: function (errorId, message) {
    this.debugLog("Logging Flurry error: " + errorId + ": " + message);
    FlurryAgent.logError(errorId, message)
}, logEvent: function (eventId, params) {
    this.debugLog("Logging Flurry event: " + eventId);
    FlurryAgent.logEvent(eventId, params)
}, logTimedEventBegin: function (eventId) {
    this.debugLog("Logging timed Flurry event: " + eventId);
    FlurryAgent.logEvent(eventId, {}, true)
}, logTimedEventEnd: function (eventId) {
    this.debugLog("Logging end of timed Flurry event: " +
        eventId);
    FlurryAgent.endTimedEvent(eventId)
}, setCaptureUncaughtException: function (enabled) {
    this.debugLog("Flurry setCaptureUncaughtException unavailable with HTML5")
}, setDebugMode: function (debug) {
    this.debug = debug ? true : false;
    FlurryAgent.setDebugLogEnabled(this.debug)
}, debugLog: function () {
    if (this.debug)cc.log(arguments)
}, getSDKVersion: function () {
    return FlurryAgent.getFlurryAgentVersion()
}, getPluginVersion: function () {
    return plugin.Version
}});