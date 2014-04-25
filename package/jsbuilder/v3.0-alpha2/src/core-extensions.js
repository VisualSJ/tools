var _tmp = _tmp || {};
var cc = cc || {};
cc.associateWithNative = function (jsObj, superclass) {
};
cc.KEY = {backspace: 8, tab: 9, enter: 13, shift: 16, ctrl: 17, alt: 18, pause: 19, capslock: 20, escape: 27, pageup: 33, pagedown: 34, end: 35, home: 36, left: 37, up: 38, right: 39, down: 40, insert: 45, Delete: 46, "0": 48, 1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57, a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72, i: 73, j: 74, k: 75, l: 76, m: 77, n: 78, o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85, v: 86, w: 87, x: 88, y: 89, z: 90, num0: 96, num1: 97, num2: 98, num3: 99, num4: 100, num5: 101, num6: 102, num7: 103, num8: 104, num9: 105, "*": 106, "+": 107, "-": 109, "numdel": 110, "/": 111, f1: 112, f2: 113,
    f3: 114, f4: 115, f5: 116, f6: 117, f7: 118, f8: 119, f9: 120, f10: 121, f11: 122, f12: 123, numlock: 144, scrolllock: 145, semicolon: 186, ",": 186, equal: 187, "\x3d": 187, ";": 188, comma: 188, dash: 189, ".": 190, period: 190, forwardslash: 191, grave: 192, "[": 219, openbracket: 219, "]": 221, closebracket: 221, backslash: 220, quote: 222, space: 32};
cc.FMT_JPG = 0;
cc.FMT_PNG = 1;
cc.FMT_TIFF = 2;
cc.FMT_RAWDATA = 3;
cc.FMT_WEBP = 4;
cc.FMT_UNKNOWN = 5;
cc.getImageFormatByData = function (imgData) {
    if (imgData.length > 8 && imgData[0] == 137 && imgData[1] == 80 && imgData[2] == 78 && imgData[3] == 71 && imgData[4] == 13 && imgData[5] == 10 && imgData[6] == 26 && imgData[7] == 10)return cc.FMT_PNG;
    if (imgData.length > 2 && (imgData[0] == 73 && imgData[1] == 73 || imgData[0] == 77 && imgData[1] == 77 || imgData[0] == 255 && imgData[1] == 216))return cc.FMT_TIFF;
    return cc.FMT_UNKNOWN
};
cc.inherits = function (childCtor, parentCtor) {
    function tempCtor() {
    }

    tempCtor.prototype = parentCtor.prototype;
    childCtor.superClass_ = parentCtor.prototype;
    childCtor.prototype = new tempCtor;
    childCtor.prototype.constructor = childCtor
};
cc.base = function (me, opt_methodName, var_args) {
    var caller = arguments.callee.caller;
    if (caller.superClass_) {
        ret = caller.superClass_.constructor.apply(me, Array.prototype.slice.call(arguments, 1));
        return ret
    }
    var args = Array.prototype.slice.call(arguments, 2);
    var foundCaller = false;
    for (var ctor = me.constructor; ctor; ctor = ctor.superClass_ && ctor.superClass_.constructor)if (ctor.prototype[opt_methodName] === caller)foundCaller = true; else if (foundCaller)return ctor.prototype[opt_methodName].apply(me, args);
    if (me[opt_methodName] ===
        caller)return me.constructor.prototype[opt_methodName].apply(me, args); else throw Error("cc.base called from a method of one name " + "to a method of a different name");
};
cc.screen = {_supportsFullScreen: false, _preOnFullScreenChange: null, _touchEvent: "", _fn: null, _fnMap: [
    ["requestFullscreen", "exitFullscreen", "fullscreenchange", "fullscreenEnabled", "fullscreenElement"],
    ["requestFullScreen", "exitFullScreen", "fullScreenchange", "fullScreenEnabled", "fullScreenElement"],
    ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitIsFullScreen", "webkitCurrentFullScreenElement"],
    ["mozRequestFullScreen", "mozCancelFullScreen", "mozfullscreenchange", "mozFullScreen",
        "mozFullScreenElement"],
    ["msRequestFullscreen", "msExitFullscreen", "MSFullscreenChange", "msFullscreenEnabled", "msFullscreenElement"]
], init: function () {
    this._fn = {};
    var i, val, map = this._fnMap, valL;
    for (i = 0, l = map.length; i < l; i++) {
        val = map[i];
        if (val && val[1]in document) {
            for (i = 0, valL = val.length; i < valL; i++)this._fn[map[0][i]] = val[i];
            break
        }
    }
    this._supportsFullScreen = this._fn.requestFullscreen != undefined;
    this._touchEvent = "ontouchstart"in window ? "touchstart" : "mousedown"
}, fullScreen: function () {
    return this._supportsFullScreen &&
        document[this._fn.fullscreenEnabled]
}, requestFullScreen: function (element, onFullScreenChange) {
    if (!this._supportsFullScreen)return;
    element = element || document.documentElement;
    element[this._fn.requestFullscreen]();
    if (onFullScreenChange) {
        var eventName = this._fn.fullscreenchange;
        if (this._preOnFullScreenChange)document.removeEventListener(eventName, this._preOnFullScreenChange);
        this._preOnFullScreenChange = onFullScreenChange;
        cc._addEventListener(document, eventName, onFullScreenChange, false)
    }
    return element[this._fn.requestFullscreen]()
},
    exitFullScreen: function () {
        return this._supportsFullScreen ? document[this._fn.exitFullscreen]() : true
    }, autoFullScreen: function (element, onFullScreenChange) {
        element = element || document.body;
        var touchTarget = cc._canvas || element;
        var theScreen = this;

        function callback() {
            theScreen.requestFullScreen(element, onFullScreenChange);
            touchTarget.removeEventListener(theScreen._touchEvent, callback)
        }

        this.requestFullScreen(element, onFullScreenChange);
        cc._addEventListener(touchTarget, this._touchEvent, callback)
    }};
cc.screen.init();
cc.visibleRect = {_topLeft: cc.p(0, 0), _topRight: cc.p(0, 0), _top: cc.p(0, 0), _bottomLeft: cc.p(0, 0), _bottomRight: cc.p(0, 0), _bottom: cc.p(0, 0), _center: cc.p(0, 0), _left: cc.p(0, 0), _right: cc.p(0, 0), _width: 0, _height: 0, init: function (size) {
    this._width = size.width;
    this._height = size.height;
    var w = this._width;
    var h = this._height;
    this._topLeft.y = h;
    this._topRight.x = w;
    this._topRight.y = h;
    this._top.x = w / 2;
    this._top.y = h;
    this._bottomRight.x = w;
    this._bottom.x = w / 2;
    this._center.x = w / 2;
    this._center.y = h / 2;
    this._left.y = h / 2;
    this._right.x =
        w;
    this._right.y = h / 2
}};
cc.visibleRect.width;
cc.defineGetterSetter(cc.visibleRect, "width", function () {
    return this._width
});
cc.visibleRect.height;
cc.defineGetterSetter(cc.visibleRect, "height", function () {
    return this._height
});
cc.visibleRect.topLeft;
cc.defineGetterSetter(cc.visibleRect, "topLeft", function () {
    return this._topLeft
});
cc.visibleRect.topRight;
cc.defineGetterSetter(cc.visibleRect, "topRight", function () {
    return this._topRight
});
cc.visibleRect.top;
cc.defineGetterSetter(cc.visibleRect, "top", function () {
    return this._top
});
cc.visibleRect.bottomLeft;
cc.defineGetterSetter(cc.visibleRect, "bottomLeft", function () {
    return this._bottomLeft
});
cc.visibleRect.bottomRight;
cc.defineGetterSetter(cc.visibleRect, "bottomRight", function () {
    return this._bottomRight
});
cc.visibleRect.bottom;
cc.defineGetterSetter(cc.visibleRect, "bottom", function () {
    return this._bottom
});
cc.visibleRect.center;
cc.defineGetterSetter(cc.visibleRect, "center", function () {
    return this._center
});
cc.visibleRect.left;
cc.defineGetterSetter(cc.visibleRect, "left", function () {
    return this._left
});
cc.visibleRect.right;
cc.defineGetterSetter(cc.visibleRect, "right", function () {
    return this._right
});
var _p = cc.inputManager;
_p.setAccelerometerEnabled = function (isEnable) {
    var _t = this;
    if (_t._accelEnabled === isEnable)return;
    _t._accelEnabled = isEnable;
    var scheduler = cc.director.getScheduler();
    if (_t._accelEnabled) {
        _t._accelCurTime = 0;
        scheduler.scheduleUpdateForTarget(_t)
    } else {
        _t._accelCurTime = 0;
        scheduler.unscheduleUpdateForTarget(_t)
    }
};
_p.setAccelerometerInterval = function (interval) {
    if (this._accelInterval !== interval)this._accelInterval = interval
};
_p._registerKeyboardEvent = function () {
    cc._addEventListener(document, "keydown", function (e) {
        cc.eventManager.dispatchEvent(new cc.EventKeyboard(e.keyCode, true))
    });
    cc._addEventListener(document, "keyup", function (e) {
        cc.eventManager.dispatchEvent(new cc.EventKeyboard(e.keyCode, false))
    })
};
_p._registerAccelerometerEvent = function () {
    var w = window, _t = this;
    _t._acceleration = new cc.Acceleration;
    _t._accelDeviceEvent = w.DeviceMotionEvent || w.DeviceOrientationEvent;
    if (cc.sys.browserType == cc.sys.BROWSER_TYPE_MOBILE_QQ)_t._accelDeviceEvent = window.DeviceOrientationEvent;
    var _deviceEventType = _t._accelDeviceEvent == w.DeviceMotionEvent ? "devicemotion" : "deviceorientation";
    var ua = navigator.userAgent;
    if (/Android/.test(ua) || /Adr/.test(ua) && cc.sys.browserType == cc.BROWSER_TYPE_UC)_t._minus = -1;
    cc._addEventListener(w,
        _deviceEventType, _t.didAccelerate.bind(_t), false)
};
_p.didAccelerate = function (eventData) {
    var _t = this, w = window;
    if (!_t._accelEnabled)return;
    var mAcceleration = _t._acceleration;
    if (_t._accelDeviceEvent == window.DeviceMotionEvent) {
        var eventAcceleration = eventData["accelerationIncludingGravity"];
        mAcceleration.x = _t._accelMinus * eventAcceleration.x * 0.1;
        mAcceleration.y = _t._accelMinus * eventAcceleration.y * 0.1;
        mAcceleration.z = eventAcceleration.z * 0.1
    } else {
        mAcceleration.x = eventData["gamma"] / 90 * 0.981;
        mAcceleration.y = -(eventData["beta"] / 90) * 0.981;
        mAcceleration.z = eventData["alpha"] /
            90 * 0.981
    }
    mAcceleration.timestamp = eventData.timeStamp || Date.now();
    var tmpX = mAcceleration.x;
    if (w.orientation === cc.UIInterfaceOrientationLandscapeRight) {
        mAcceleration.x = -mAcceleration.y;
        mAcceleration.y = tmpX
    } else if (w.orientation === cc.UIInterfaceOrientationLandscapeLeft) {
        mAcceleration.x = mAcceleration.y;
        mAcceleration.y = -tmpX
    } else if (w.orientation === cc.UIInterfaceOrientationPortraitUpsideDown) {
        mAcceleration.x = -mAcceleration.x;
        mAcceleration.y = -mAcceleration.y
    }
};
delete _p;
cc.vertexLineToPolygon = function (points, stroke, vertices, offset, nuPoints) {
    nuPoints += offset;
    if (nuPoints <= 1)return;
    stroke *= 0.5;
    var idx;
    var nuPointsMinus = nuPoints - 1;
    for (var i = offset; i < nuPoints; i++) {
        idx = i * 2;
        var p1 = cc.p(points[i * 2], points[i * 2 + 1]);
        var perpVector;
        if (i === 0)perpVector = cc.pPerp(cc.pNormalize(cc.pSub(p1, cc.p(points[(i + 1) * 2], points[(i + 1) * 2 + 1])))); else if (i === nuPointsMinus)perpVector = cc.pPerp(cc.pNormalize(cc.pSub(cc.p(points[(i - 1) * 2], points[(i - 1) * 2 + 1]), p1))); else {
            var p0 = cc.p(points[(i - 1) * 2], points[(i -
                1) * 2 + 1]);
            var p2 = cc.p(points[(i + 1) * 2], points[(i + 1) * 2 + 1]);
            var p2p1 = cc.pNormalize(cc.pSub(p2, p1));
            var p0p1 = cc.pNormalize(cc.pSub(p0, p1));
            var angle = Math.acos(cc.pDot(p2p1, p0p1));
            if (angle < cc.degreesToRadians(70))perpVector = cc.pPerp(cc.pNormalize(cc.pMidpoint(p2p1, p0p1))); else if (angle < cc.degreesToRadians(170))perpVector = cc.pNormalize(cc.pMidpoint(p2p1, p0p1)); else perpVector = cc.pPerp(cc.pNormalize(cc.pSub(p2, p0)))
        }
        perpVector = cc.pMult(perpVector, stroke);
        vertices[idx * 2] = p1.x + perpVector.x;
        vertices[idx * 2 + 1] =
            p1.y + perpVector.y;
        vertices[(idx + 1) * 2] = p1.x - perpVector.x;
        vertices[(idx + 1) * 2 + 1] = p1.y - perpVector.y
    }
    offset = offset == 0 ? 0 : offset - 1;
    for (i = offset; i < nuPointsMinus; i++) {
        idx = i * 2;
        var idx1 = idx + 2;
        var v1 = cc.vertex2(vertices[idx * 2], vertices[idx * 2 + 1]);
        var v2 = cc.vertex2(vertices[(idx + 1) * 2], vertices[(idx + 1) * 2 + 1]);
        var v3 = cc.vertex2(vertices[idx1 * 2], vertices[idx1 * 2]);
        var v4 = cc.vertex2(vertices[(idx1 + 1) * 2], vertices[(idx1 + 1) * 2 + 1]);
        var fixVertexResult = !cc.vertexLineIntersect(v1.x, v1.y, v4.x, v4.y, v2.x, v2.y, v3.x, v3.y);
        if (!fixVertexResult.isSuccess)if (fixVertexResult.value <
            0 || fixVertexResult.value > 1)fixVertexResult.isSuccess = true;
        if (fixVertexResult.isSuccess) {
            vertices[idx1 * 2] = v4.x;
            vertices[idx1 * 2 + 1] = v4.y;
            vertices[(idx1 + 1) * 2] = v3.x;
            vertices[(idx1 + 1) * 2 + 1] = v3.y
        }
    }
};
cc.vertexLineIntersect = function (Ax, Ay, Bx, By, Cx, Cy, Dx, Dy) {
    var distAB, theCos, theSin, newX;
    if (Ax == Bx && Ay == By || Cx == Dx && Cy == Dy)return{isSuccess: false, value: 0};
    Bx -= Ax;
    By -= Ay;
    Cx -= Ax;
    Cy -= Ay;
    Dx -= Ax;
    Dy -= Ay;
    distAB = Math.sqrt(Bx * Bx + By * By);
    theCos = Bx / distAB;
    theSin = By / distAB;
    newX = Cx * theCos + Cy * theSin;
    Cy = Cy * theCos - Cx * theSin;
    Cx = newX;
    newX = Dx * theCos + Dy * theSin;
    Dy = Dy * theCos - Dx * theSin;
    Dx = newX;
    if (Cy == Dy)return{isSuccess: false, value: 0};
    var t = (Dx + (Cx - Dx) * Dy / (Dy - Cy)) / distAB;
    return{isSuccess: true, value: t}
};
cc.CGAffineToGL = function (trans, mat) {
    mat[2] = mat[3] = mat[6] = mat[7] = mat[8] = mat[9] = mat[11] = mat[14] = 0;
    mat[10] = mat[15] = 1;
    mat[0] = trans.a;
    mat[4] = trans.c;
    mat[12] = trans.tx;
    mat[1] = trans.b;
    mat[5] = trans.d;
    mat[13] = trans.ty
};
cc.GLToCGAffine = function (mat, trans) {
    trans.a = mat[0];
    trans.c = mat[4];
    trans.tx = mat[12];
    trans.b = mat[1];
    trans.d = mat[5];
    trans.ty = mat[13]
};
cc.EventAcceleration = cc.Event.extend({_acc: null, ctor: function (acc) {
    cc.Event.prototype.ctor.call(this, cc.Event.ACCELERATION);
    this._acc = acc
}});
cc.EventKeyboard = cc.Event.extend({_keyCode: 0, _isPressed: false, ctor: function (keyCode, isPressed) {
    cc.Event.prototype.ctor.call(this, cc.Event.KEYBOARD);
    this._keyCode = keyCode;
    this._isPressed = isPressed
}});
cc._EventListenerAcceleration = cc.EventListener.extend({_onAccelerationEvent: null, ctor: function (callback) {
    this._onAccelerationEvent = callback;
    var selfPointer = this;
    var listener = function (event) {
        selfPointer._onAccelerationEvent(event._acc, event)
    };
    cc.EventListener.prototype.ctor.call(this, cc.EventListener.ACCELERATION, cc._EventListenerAcceleration.LISTENER_ID, listener)
}, checkAvailable: function () {
    cc.assert(this._onAccelerationEvent, cc._LogInfos._EventListenerAcceleration_checkAvailable);
    return true
}, clone: function () {
    return new cc._EventListenerAcceleration(this._onAccelerationEvent)
}});
cc._EventListenerAcceleration.LISTENER_ID = "__cc_acceleration";
cc._EventListenerAcceleration.create = function (callback) {
    return new cc._EventListenerAcceleration(callback)
};
cc._EventListenerKeyboard = cc.EventListener.extend({onKeyPressed: null, onKeyReleased: null, ctor: function () {
    var selfPointer = this;
    var listener = function (event) {
        if (event._isPressed) {
            if (selfPointer.onKeyPressed)selfPointer.onKeyPressed(event._keyCode, event)
        } else if (selfPointer.onKeyReleased)selfPointer.onKeyReleased(event._keyCode, event)
    };
    cc.EventListener.prototype.ctor.call(this, cc.EventListener.KEYBOARD, cc._EventListenerKeyboard.LISTENER_ID, listener)
}, clone: function () {
    var eventListener = new cc._EventListenerKeyboard;
    eventListener.onKeyPressed = this.onKeyPressed;
    eventListener.onKeyReleased = this.onKeyReleased;
    return eventListener
}, checkAvailable: function () {
    if (this.onKeyPressed == null && this.onKeyReleased == null) {
        cc.log(cc._LogInfos._EventListenerKeyboard_checkAvailable);
        return false
    }
    return true
}});
cc._EventListenerKeyboard.LISTENER_ID = "__cc_keyboard";
cc._EventListenerKeyboard.create = function () {
    return new cc._EventListenerKeyboard
};
cc.AtlasNode = cc.NodeRGBA.extend({textureAtlas: null, quadsToDraw: 0, RGBAProtocol: true, _itemsPerRow: 0, _itemsPerColumn: 0, _itemWidth: 0, _itemHeight: 0, _colorUnmodified: null, _opacityModifyRGB: false, _blendFunc: null, _ignoreContentScaleFactor: false, _className: "AtlasNode", ctor: function (tile, tileWidth, tileHeight, itemsToRender) {
    cc.NodeRGBA.prototype.ctor.call(this);
    this._colorUnmodified = cc.color.WHITE;
    this._blendFunc = {src: cc.BLEND_SRC, dst: cc.BLEND_DST};
    this._ignoreContentScaleFactor = false;
    itemsToRender !== undefined &&
    this.initWithTileFile(tile, tileWidth, tileHeight, itemsToRender)
}, updateAtlasValues: function () {
    cc.log("cc.AtlasNode.updateAtlasValues(): Shall be overridden in subclasses")
}, getColor: function () {
    if (this._opacityModifyRGB)return this._colorUnmodified;
    return cc.NodeRGBA.prototype.getColor.call(this)
}, setOpacityModifyRGB: function (value) {
    var oldColor = this.color;
    this._opacityModifyRGB = value;
    this.color = oldColor
}, isOpacityModifyRGB: function () {
    return this._opacityModifyRGB
}, getBlendFunc: function () {
    return this._blendFunc
},
    setBlendFunc: function (src, dst) {
        if (dst === undefined)this._blendFunc = src; else this._blendFunc = {src: src, dst: dst}
    }, setTextureAtlas: function (value) {
        this.textureAtlas = value
    }, getTextureAtlas: function () {
        return this.textureAtlas
    }, getQuadsToDraw: function () {
        return this.quadsToDraw
    }, setQuadsToDraw: function (quadsToDraw) {
        this.quadsToDraw = quadsToDraw
    }, _textureForCanvas: null, _originalTexture: null, _uniformColor: null, _colorF32Array: null, initWithTileFile: function (tile, tileWidth, tileHeight, itemsToRender) {
        if (!tile)throw"cc.AtlasNode.initWithTileFile(): title should not be null";
        var texture = cc.textureCache.addImage(tile);
        return this.initWithTexture(texture, tileWidth, tileHeight, itemsToRender)
    }, initWithTexture: null, _initWithTextureForCanvas: function (texture, tileWidth, tileHeight, itemsToRender) {
        this._itemWidth = tileWidth;
        this._itemHeight = tileHeight;
        this._opacityModifyRGB = true;
        this._originalTexture = texture;
        if (!this._originalTexture) {
            cc.log("cocos2d: Could not initialize cc.AtlasNode. Invalid Texture.");
            return false
        }
        this._textureForCanvas = this._originalTexture;
        this._calculateMaxItems();
        this.quadsToDraw = itemsToRender;
        return true
    }, _initWithTextureForWebGL: function (texture, tileWidth, tileHeight, itemsToRender) {
        this._itemWidth = tileWidth;
        this._itemHeight = tileHeight;
        this._colorUnmodified = cc.color.WHITE;
        this._opacityModifyRGB = true;
        this._blendFunc.src = cc.BLEND_SRC;
        this._blendFunc.dst = cc.BLEND_DST;
        var locRealColor = this._realColor;
        this._colorF32Array = new Float32Array([locRealColor.r / 255, locRealColor.g / 255, locRealColor.b / 255, this._realOpacity / 255]);
        this.textureAtlas = new cc.TextureAtlas;
        this.textureAtlas.initWithTexture(texture,
            itemsToRender);
        if (!this.textureAtlas) {
            cc.log("cocos2d: Could not initialize cc.AtlasNode. Invalid Texture.");
            return false
        }
        this._updateBlendFunc();
        this._updateOpacityModifyRGB();
        this._calculateMaxItems();
        this.quadsToDraw = itemsToRender;
        this.shaderProgram = cc.shaderCache.programForKey(cc.SHADER_POSITION_TEXTURE_UCOLOR);
        this._uniformColor = cc._renderContext.getUniformLocation(this.shaderProgram.getProgram(), "u_color");
        return true
    }, draw: null, _drawForWebGL: function (ctx) {
        var context = ctx || cc._renderContext;
        cc.nodeDrawSetup(this);
        cc.glBlendFunc(this._blendFunc.src, this._blendFunc.dst);
        context.uniform4fv(this._uniformColor, this._colorF32Array);
        this.textureAtlas.drawNumberOfQuads(this.quadsToDraw, 0)
    }, setColor: null, _setColorForCanvas: function (color3) {
        var locRealColor = this._realColor;
        if (locRealColor.r == color3.r && locRealColor.g == color3.g && locRealColor.b == color3.b)return;
        var temp = cc.color(color3.r, color3.g, color3.b);
        this._colorUnmodified = color3;
        if (this._opacityModifyRGB) {
            var locDisplayedOpacity = this._displayedOpacity;
            temp.r = temp.r * locDisplayedOpacity / 255;
            temp.g = temp.g * locDisplayedOpacity / 255;
            temp.b = temp.b * locDisplayedOpacity / 255
        }
        cc.NodeRGBA.prototype.setColor.call(this, color3);
        if (this.texture) {
            var element = this._originalTexture.getHtmlElementObj();
            if (!element)return;
            var cacheTextureForColor = cc.textureCache.getTextureColors(element);
            if (cacheTextureForColor) {
                var textureRect = cc.rect(0, 0, element.width, element.height);
                element = cc.generateTintImage(element, cacheTextureForColor, this._realColor, textureRect);
                var locTexture =
                    new cc.Texture2D;
                locTexture.initWithElement(element);
                locTexture.handleLoadedTexture();
                this.texture = locTexture
            }
        }
    }, _setColorForWebGL: function (color3) {
        var temp = cc.color(color3.r, color3.g, color3.b);
        this._colorUnmodified = color3;
        var locDisplayedOpacity = this._displayedOpacity;
        if (this._opacityModifyRGB) {
            temp.r = temp.r * locDisplayedOpacity / 255;
            temp.g = temp.g * locDisplayedOpacity / 255;
            temp.b = temp.b * locDisplayedOpacity / 255
        }
        cc.NodeRGBA.prototype.setColor.call(this, color3);
        var locDisplayedColor = this._displayedColor;
        this._colorF32Array = new Float32Array([locDisplayedColor.r / 255, locDisplayedColor.g / 255, locDisplayedColor.b / 255, locDisplayedOpacity / 255])
    }, setOpacity: function (opacity) {
    }, _setOpacityForCanvas: function (opacity) {
        cc.NodeRGBA.prototype.setOpacity.call(this, opacity);
        if (this._opacityModifyRGB)this.color = this._colorUnmodified
    }, _setOpacityForWebGL: function (opacity) {
        cc.NodeRGBA.prototype.setOpacity.call(this, opacity);
        if (this._opacityModifyRGB)this.color = this._colorUnmodified; else {
            var locDisplayedColor = this._displayedColor;
            this._colorF32Array = new Float32Array([locDisplayedColor.r / 255, locDisplayedColor.g / 255, locDisplayedColor.b / 255, this._displayedOpacity / 255])
        }
    }, getTexture: null, _getTextureForCanvas: function () {
        return this._textureForCanvas
    }, _getTextureForWebGL: function () {
        return this.textureAtlas.texture
    }, setTexture: null, _setTextureForCanvas: function (texture) {
        this._textureForCanvas = texture
    }, _setTextureForWebGL: function (texture) {
        this.textureAtlas.texture = texture;
        this._updateBlendFunc();
        this._updateOpacityModifyRGB()
    }, _calculateMaxItems: null,
    _calculateMaxItemsForCanvas: function () {
        var selTexture = this.texture;
        var size = selTexture.getContentSize();
        this._itemsPerColumn = 0 | size.height / this._itemHeight;
        this._itemsPerRow = 0 | size.width / this._itemWidth
    }, _calculateMaxItemsForWebGL: function () {
        var selTexture = this.texture;
        var size = selTexture.getContentSize();
        if (this._ignoreContentScaleFactor)size = selTexture.getContentSizeInPixels();
        this._itemsPerColumn = 0 | size.height / this._itemHeight;
        this._itemsPerRow = 0 | size.width / this._itemWidth
    }, _updateBlendFunc: function () {
        if (!this.textureAtlas.texture.hasPremultipliedAlpha()) {
            this._blendFunc.src =
                cc.SRC_ALPHA;
            this._blendFunc.dst = cc.ONE_MINUS_SRC_ALPHA
        }
    }, _updateOpacityModifyRGB: function () {
        this._opacityModifyRGB = this.textureAtlas.texture.hasPremultipliedAlpha()
    }, _setIgnoreContentScaleFactor: function (ignoreContentScaleFactor) {
        this._ignoreContentScaleFactor = ignoreContentScaleFactor
    }});
var _p = cc.AtlasNode.prototype;
if (cc._renderType === cc._RENDER_TYPE_WEBGL) {
    _p.initWithTexture = _p._initWithTextureForWebGL;
    _p.draw = _p._drawForWebGL;
    _p.setColor = _p._setColorForWebGL;
    _p.setOpacity = _p._setOpacityForWebGL;
    _p.getTexture = _p._getTextureForWebGL;
    _p.setTexture = _p._setTextureForWebGL;
    _p._calculateMaxItems = _p._calculateMaxItemsForWebGL
} else {
    _p.initWithTexture = _p._initWithTextureForCanvas;
    _p.draw = cc.Node.prototype.draw;
    _p.setColor = _p._setColorForCanvas;
    _p.setOpacity = _p._setOpacityForCanvas;
    _p.getTexture = _p._getTextureForCanvas;
    _p.setTexture = _p._setTextureForCanvas;
    _p._calculateMaxItems = _p._calculateMaxItemsForCanvas
}
cc.defineGetterSetter(_p, "opacity", _p.getOpacity, _p.setOpacity);
cc.defineGetterSetter(_p, "color", _p.getColor, _p.setColor);
_p.texture;
cc.defineGetterSetter(_p, "texture", _p.getTexture, _p.setTexture);
_p.textureAtlas;
_p.quadsToDraw;
cc.AtlasNode.create = function (tile, tileWidth, tileHeight, itemsToRender) {
    return new cc.AtlasNode(tile, tileWidth, tileHeight, itemsToRender)
};
cc.TextureAtlas = cc.Class.extend({dirty: false, texture: null, _indices: null, _buffersVBO: null, _capacity: 0, _quads: null, _quadsArrayBuffer: null, _quadsWebBuffer: null, _quadsReader: null, ctor: function (fileName, capacity) {
    this._buffersVBO = [];
    if (typeof fileName == "string")this.initWithFile(fileName, capacity); else if (fileName instanceof cc.Texture2D)this.initWithTexture(fileName, capacity)
}, getTotalQuads: function () {
    return this._totalQuads
}, getCapacity: function () {
    return this._capacity
}, getTexture: function () {
    return this.texture
},
    setTexture: function (texture) {
        this.texture = texture
    }, setDirty: function (dirty) {
        this.dirty = dirty
    }, isDirty: function () {
        return this.dirty
    }, getQuads: function () {
        return this._quads
    }, setQuads: function (quads) {
        this._quads = quads
    }, _copyQuadsToTextureAtlas: function (quads, index) {
        if (!quads)return;
        for (var i = 0; i < quads.length; i++)this._setQuadToArray(quads[i], index + i)
    }, _setQuadToArray: function (quad, index) {
        var locQuads = this._quads;
        if (!locQuads[index]) {
            locQuads[index] = new cc.V3F_C4B_T2F_Quad(quad.tl, quad.bl, quad.tr, quad.br,
                this._quadsArrayBuffer, index * cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT);
            return
        }
        locQuads[index].bl = quad.bl;
        locQuads[index].br = quad.br;
        locQuads[index].tl = quad.tl;
        locQuads[index].tr = quad.tr
    }, description: function () {
        return"\x3ccc.TextureAtlas | totalQuads \x3d" + this._totalQuads + "\x3e"
    }, _setupIndices: function () {
        if (this._capacity === 0)return;
        var locIndices = this._indices, locCapacity = this._capacity;
        for (var i = 0; i < locCapacity; i++)if (cc.TEXTURE_ATLAS_USE_TRIANGLE_STRIP) {
            locIndices[i * 6 + 0] = i * 4 + 0;
            locIndices[i * 6 + 1] = i *
                4 + 0;
            locIndices[i * 6 + 2] = i * 4 + 2;
            locIndices[i * 6 + 3] = i * 4 + 1;
            locIndices[i * 6 + 4] = i * 4 + 3;
            locIndices[i * 6 + 5] = i * 4 + 3
        } else {
            locIndices[i * 6 + 0] = i * 4 + 0;
            locIndices[i * 6 + 1] = i * 4 + 1;
            locIndices[i * 6 + 2] = i * 4 + 2;
            locIndices[i * 6 + 3] = i * 4 + 3;
            locIndices[i * 6 + 4] = i * 4 + 2;
            locIndices[i * 6 + 5] = i * 4 + 1
        }
    }, _setupVBO: function () {
        var gl = cc._renderContext;
        this._buffersVBO[0] = gl.createBuffer();
        this._buffersVBO[1] = gl.createBuffer();
        this._quadsWebBuffer = gl.createBuffer();
        this._mapBuffers()
    }, _mapBuffers: function () {
        var gl = cc._renderContext;
        gl.bindBuffer(gl.ARRAY_BUFFER,
            this._quadsWebBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._quadsArrayBuffer, gl.DYNAMIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffersVBO[1]);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._indices, gl.STATIC_DRAW)
    }, initWithFile: function (file, capacity) {
        var texture = cc.textureCache.addImage(file);
        if (texture)return this.initWithTexture(texture, capacity); else {
            cc.log(cc._LogInfos.TextureAtlas_initWithFile, file);
            return false
        }
    }, initWithTexture: function (texture, capacity) {
        cc.assert(texture, cc._LogInfos.TextureAtlas_initWithTexture);
        capacity = 0 | capacity;
        this._capacity = capacity;
        this._totalQuads = 0;
        this.texture = texture;
        this._quads = [];
        this._indices = new Uint16Array(capacity * 6);
        var quadSize = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT;
        this._quadsArrayBuffer = new ArrayBuffer(quadSize * capacity);
        this._quadsReader = new Uint8Array(this._quadsArrayBuffer);
        if (!(this._quads && this._indices) && capacity > 0)return false;
        var locQuads = this._quads;
        for (var i = 0; i < capacity; i++)locQuads[i] = new cc.V3F_C4B_T2F_Quad(null, null, null, null, this._quadsArrayBuffer, i * quadSize);
        this._setupIndices();
        this._setupVBO();
        this.dirty = true;
        return true
    }, updateQuad: function (quad, index) {
        cc.assert(quad, cc._LogInfos.TextureAtlas_updateQuad);
        cc.assert(index >= 0 && index < this._capacity, cc._LogInfos.TextureAtlas_updateQuad_2);
        this._totalQuads = Math.max(index + 1, this._totalQuads);
        this._setQuadToArray(quad, index);
        this.dirty = true
    }, insertQuad: function (quad, index) {
        cc.assert(index < this._capacity, cc._LogInfos.TextureAtlas_insertQuad_2);
        this._totalQuads++;
        if (this._totalQuads > this._capacity) {
            cc.log(cc._LogInfos.TextureAtlas_insertQuad);
            return
        }
        var quadSize = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT;
        var remaining = this._totalQuads - 1 - index;
        var startOffset = index * quadSize;
        var moveLength = remaining * quadSize;
        this._quads[this._totalQuads - 1] = new cc.V3F_C4B_T2F_Quad(null, null, null, null, this._quadsArrayBuffer, (this._totalQuads - 1) * quadSize);
        this._quadsReader.set(this._quadsReader.subarray(startOffset, startOffset + moveLength), startOffset + quadSize);
        this._setQuadToArray(quad, index);
        this.dirty = true
    }, insertQuads: function (quads, index, amount) {
        amount = amount ||
            quads.length;
        cc.assert(index + amount <= this._capacity, cc._LogInfos.TextureAtlas_insertQuads);
        var quadSize = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT;
        this._totalQuads += amount;
        if (this._totalQuads > this._capacity) {
            cc.log(cc._LogInfos.TextureAtlas_insertQuad);
            return
        }
        var remaining = this._totalQuads - 1 - index - amount;
        var startOffset = index * quadSize;
        var moveLength = remaining * quadSize;
        var lastIndex = this._totalQuads - 1 - amount;
        var i;
        for (i = 0; i < amount; i++)this._quads[lastIndex + i] = new cc.V3F_C4B_T2F_Quad(null, null, null, null,
            this._quadsArrayBuffer, (this._totalQuads - 1) * quadSize);
        this._quadsReader.set(this._quadsReader.subarray(startOffset, startOffset + moveLength), startOffset + quadSize * amount);
        for (i = 0; i < amount; i++)this._setQuadToArray(quads[i], index + i);
        this.dirty = true
    }, insertQuadFromIndex: function (fromIndex, newIndex) {
        if (fromIndex === newIndex)return;
        cc.assert(newIndex >= 0 || newIndex < this._totalQuads, cc._LogInfos.TextureAtlas_insertQuadFromIndex);
        cc.assert(fromIndex >= 0 || fromIndex < this._totalQuads, cc._LogInfos.TextureAtlas_insertQuadFromIndex_2);
        var quadSize = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT;
        var locQuadsReader = this._quadsReader;
        var sourceArr = locQuadsReader.subarray(fromIndex * quadSize, quadSize);
        var startOffset, moveLength;
        if (fromIndex > newIndex) {
            startOffset = newIndex * quadSize;
            moveLength = (fromIndex - newIndex) * quadSize;
            locQuadsReader.set(locQuadsReader.subarray(startOffset, startOffset + moveLength), startOffset + quadSize);
            locQuadsReader.set(sourceArr, startOffset)
        } else {
            startOffset = (fromIndex + 1) * quadSize;
            moveLength = (newIndex - fromIndex) * quadSize;
            locQuadsReader.set(locQuadsReader.subarray(startOffset,
                    startOffset + moveLength), startOffset - quadSize);
            locQuadsReader.set(sourceArr, newIndex * quadSize)
        }
        this.dirty = true
    }, removeQuadAtIndex: function (index) {
        cc.assert(index < this._totalQuads, cc._LogInfos.TextureAtlas_removeQuadAtIndex);
        var quadSize = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT;
        this._totalQuads--;
        this._quads.length = this._totalQuads;
        if (index !== this._totalQuads) {
            var startOffset = (index + 1) * quadSize;
            var moveLength = (this._totalQuads - index) * quadSize;
            this._quadsReader.set(this._quadsReader.subarray(startOffset,
                    startOffset + moveLength), startOffset - quadSize)
        }
        this.dirty = true
    }, removeQuadsAtIndex: function (index, amount) {
        cc.assert(index + amount <= this._totalQuads, cc._LogInfos.TextureAtlas_removeQuadsAtIndex);
        this._totalQuads -= amount;
        if (index !== this._totalQuads) {
            var quadSize = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT;
            var srcOffset = (index + amount) * quadSize;
            var moveLength = (this._totalQuads - index) * quadSize;
            var dstOffset = index * quadSize;
            this._quadsReader.set(this._quadsReader.subarray(srcOffset, srcOffset + moveLength), dstOffset)
        }
        this.dirty =
            true
    }, removeAllQuads: function () {
        this._quads.length = 0;
        this._totalQuads = 0
    }, _setDirty: function (dirty) {
        this.dirty = dirty
    }, resizeCapacity: function (newCapacity) {
        if (newCapacity == this._capacity)return true;
        var quadSize = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT;
        var oldCapacity = this._capacity;
        this._totalQuads = Math.min(this._totalQuads, newCapacity);
        this._capacity = 0 | newCapacity;
        var i, capacity = this._capacity, locTotalQuads = this._totalQuads;
        if (this._quads == null) {
            this._quads = [];
            this._quadsArrayBuffer = new ArrayBuffer(quadSize *
                capacity);
            this._quadsReader = new Uint8Array(this._quadsArrayBuffer);
            for (i = 0; i < capacity; i++)this._quads = new cc.V3F_C4B_T2F_Quad(null, null, null, null, this._quadsArrayBuffer, i * quadSize)
        } else {
            var newQuads, newArrayBuffer, quads = this._quads;
            if (capacity > oldCapacity) {
                newQuads = [];
                newArrayBuffer = new ArrayBuffer(quadSize * capacity);
                for (i = 0; i < locTotalQuads; i++)newQuads[i] = new cc.V3F_C4B_T2F_Quad(quads[i].tl, quads[i].bl, quads[i].tr, quads[i].br, newArrayBuffer, i * quadSize);
                for (; i < capacity; i++)newQuads[i] = new cc.V3F_C4B_T2F_Quad(null,
                    null, null, null, newArrayBuffer, i * quadSize);
                this._quadsReader = new Uint8Array(newArrayBuffer);
                this._quads = newQuads;
                this._quadsArrayBuffer = newArrayBuffer
            } else {
                var count = Math.max(locTotalQuads, capacity);
                newQuads = [];
                newArrayBuffer = new ArrayBuffer(quadSize * capacity);
                for (i = 0; i < count; i++)newQuads[i] = new cc.V3F_C4B_T2F_Quad(quads[i].tl, quads[i].bl, quads[i].tr, quads[i].br, newArrayBuffer, i * quadSize);
                this._quadsReader = new Uint8Array(newArrayBuffer);
                this._quads = newQuads;
                this._quadsArrayBuffer = newArrayBuffer
            }
        }
        if (this._indices ==
            null)this._indices = new Uint16Array(capacity * 6); else if (capacity > oldCapacity) {
            var tempIndices = new Uint16Array(capacity * 6);
            tempIndices.set(this._indices, 0);
            this._indices = tempIndices
        } else this._indices = this._indices.subarray(0, capacity * 6);
        this._setupIndices();
        this._mapBuffers();
        this.dirty = true;
        return true
    }, increaseTotalQuadsWith: function (amount) {
        this._totalQuads += amount
    }, moveQuadsFromIndex: function (oldIndex, amount, newIndex) {
        if (newIndex === undefined) {
            newIndex = amount;
            amount = this._totalQuads - oldIndex;
            cc.assert(newIndex +
                (this._totalQuads - oldIndex) <= this._capacity, cc._LogInfos.TextureAtlas_moveQuadsFromIndex);
            if (amount === 0)return
        } else {
            cc.assert(newIndex + amount <= this._totalQuads, cc._LogInfos.TextureAtlas_moveQuadsFromIndex_2);
            cc.assert(oldIndex < this._totalQuads, cc._LogInfos.TextureAtlas_moveQuadsFromIndex_3);
            if (oldIndex == newIndex)return
        }
        var quadSize = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT;
        var srcOffset = oldIndex * quadSize;
        var srcLength = amount * quadSize;
        var locQuadsReader = this._quadsReader;
        var sourceArr = locQuadsReader.subarray(srcOffset,
                srcOffset + srcLength);
        var dstOffset = newIndex * quadSize;
        var moveLength, moveStart;
        if (newIndex < oldIndex) {
            moveLength = (oldIndex - newIndex) * quadSize;
            moveStart = newIndex * quadSize;
            locQuadsReader.set(locQuadsReader.subarray(moveStart, moveStart + moveLength), moveStart + srcLength)
        } else {
            moveLength = (newIndex - oldIndex) * quadSize;
            moveStart = (oldIndex + amount) * quadSize;
            locQuadsReader.set(locQuadsReader.subarray(moveStart, moveStart + moveLength), srcOffset)
        }
        locQuadsReader.set(sourceArr, dstOffset);
        this.dirty = true
    }, fillWithEmptyQuadsFromIndex: function (index, amount) {
        var count = amount * cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT;
        var clearReader = new Uint8Array(this._quadsArrayBuffer, index * cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT, count);
        for (var i = 0; i < count; i++)clearReader[i] = 0
    }, drawQuads: function () {
        this.drawNumberOfQuads(this._totalQuads, 0)
    }, _releaseBuffer: function () {
        var gl = cc._renderContext;
        if (this._buffersVBO) {
            if (this._buffersVBO[0])gl.deleteBuffer(this._buffersVBO[0]);
            if (this._buffersVBO[1])gl.deleteBuffer(this._buffersVBO[1])
        }
        if (this._quadsWebBuffer)gl.deleteBuffer(this._quadsWebBuffer)
    }});
var _p = cc.TextureAtlas.prototype;
_p.totalQuads;
cc.defineGetterSetter(_p, "totalQuads", _p.getTotalQuads);
_p.capacity;
cc.defineGetterSetter(_p, "capacity", _p.getCapacity);
_p.quads;
cc.defineGetterSetter(_p, "quads", _p.getQuads, _p.setQuads);
cc.TextureAtlas.create = function (fileName, capacity) {
    return new cc.TextureAtlas(fileName, capacity)
};
if (cc._renderType === cc._RENDER_TYPE_WEBGL) {
    _tmp.WebGLTextureAtlas();
    delete _tmp.WebGLTextureAtlas
}
_tmp.PrototypeTextureAtlas();
delete _tmp.PrototypeTextureAtlas;
cc.DEFAULT_SPRITE_BATCH_CAPACITY = 29;
cc.SpriteBatchNode = cc.Node.extend({textureAtlas: null, _blendFunc: null, _descendants: null, _className: "SpriteBatchNode", addSpriteWithoutQuad: function (child, z, aTag) {
    cc.assert(child, cc._LogInfos.SpriteBatchNode_addSpriteWithoutQuad_2);
    if (!(child instanceof cc.Sprite)) {
        cc.log(cc._LogInfos.SpriteBatchNode_addSpriteWithoutQuad);
        return null
    }
    child.atlasIndex = z;
    var i = 0, locDescendants = this._descendants;
    if (locDescendants && locDescendants.length > 0)for (var index = 0; index < locDescendants.length; index++) {
        var obj = locDescendants[index];
        if (obj && obj.atlasIndex >= z)++i
    }
    locDescendants.splice(i, 0, child);
    cc.Node.prototype.addChild.call(this, child, z, aTag);
    this.reorderBatch(false);
    return this
}, getTextureAtlas: function () {
    return this.textureAtlas
}, setTextureAtlas: function (textureAtlas) {
    if (textureAtlas != this.textureAtlas)this.textureAtlas = textureAtlas
}, getDescendants: function () {
    return this._descendants
}, initWithFile: function (fileImage, capacity) {
    var texture2D = cc.textureCache.textureForKey(fileImage);
    if (!texture2D)texture2D = cc.textureCache.addImage(fileImage);
    return this.initWithTexture(texture2D, capacity)
}, _setNodeDirtyForCache: function () {
    this._cacheDirty = true
}, init: function (fileImage, capacity) {
    var texture2D = cc.textureCache.textureForKey(fileImage);
    if (!texture2D)texture2D = cc.textureCache.addImage(fileImage);
    return this.initWithTexture(texture2D, capacity)
}, increaseAtlasCapacity: function () {
    var locCapacity = this.textureAtlas.capacity;
    var quantity = Math.floor((locCapacity + 1) * 4 / 3);
    cc.log(cc._LogInfos.SpriteBatchNode_increaseAtlasCapacity, locCapacity, quantity);
    if (!this.textureAtlas.resizeCapacity(quantity))cc.log(cc._LogInfos.SpriteBatchNode_increaseAtlasCapacity_2)
}, removeChildAtIndex: function (index, doCleanup) {
    this.removeChild(this._children[index], doCleanup)
}, rebuildIndexInOrder: function (pobParent, index) {
    var children = pobParent.children;
    if (children && children.length > 0)for (var i = 0; i < children.length; i++) {
        var obj = children[i];
        if (obj && obj.zIndex < 0)index = this.rebuildIndexInOrder(obj, index)
    }
    if (!pobParent == this) {
        pobParent.atlasIndex = index;
        index++
    }
    if (children &&
        children.length > 0)for (i = 0; i < children.length; i++) {
        obj = children[i];
        if (obj && obj.zIndex >= 0)index = this.rebuildIndexInOrder(obj, index)
    }
    return index
}, highestAtlasIndexInChild: function (sprite) {
    var children = sprite.children;
    if (!children || children.length == 0)return sprite.atlasIndex; else return this.highestAtlasIndexInChild(children[children.length - 1])
}, lowestAtlasIndexInChild: function (sprite) {
    var children = sprite.children;
    if (!children || children.length == 0)return sprite.atlasIndex; else return this.lowestAtlasIndexInChild(children[children.length -
        1])
}, atlasIndexForChild: function (sprite, nZ) {
    var selParent = sprite.parent;
    var brothers = selParent.children;
    var childIndex = brothers.indexOf(sprite);
    var ignoreParent = selParent == this;
    var previous = null;
    if (childIndex > 0 && childIndex < cc.UINT_MAX)previous = brothers[childIndex - 1];
    if (ignoreParent) {
        if (childIndex == 0)return 0;
        return this.highestAtlasIndexInChild(previous) + 1
    }
    if (childIndex == 0)if (nZ < 0)return selParent.atlasIndex; else return selParent.atlasIndex + 1; else {
        if (previous.zIndex < 0 && nZ < 0 || previous.zIndex >= 0 && nZ >=
            0)return this.highestAtlasIndexInChild(previous) + 1;
        return selParent.atlasIndex + 1
    }
}, reorderBatch: function (reorder) {
    this._reorderChildDirty = reorder
}, setBlendFunc: function (src, dst) {
    if (dst === undefined)this._blendFunc = src; else this._blendFunc = {src: src, dst: dst}
}, getBlendFunc: function () {
    return this._blendFunc
}, reorderChild: function (child, zOrder) {
    cc.assert(child, cc._LogInfos.SpriteBatchNode_reorderChild_2);
    if (this._children.indexOf(child) === -1) {
        cc.log(cc._LogInfos.SpriteBatchNode_reorderChild);
        return
    }
    if (zOrder ===
        child.zIndex)return;
    cc.Node.prototype.reorderChild.call(this, child, zOrder);
    this.setNodeDirty()
}, removeChild: function (child, cleanup) {
    if (child == null)return;
    if (this._children.indexOf(child) === -1) {
        cc.log(cc._LogInfos.SpriteBatchNode_removeChild);
        return
    }
    this.removeSpriteFromAtlas(child);
    cc.Node.prototype.removeChild.call(this, child, cleanup)
}, _mvpMatrix: null, _textureForCanvas: null, _useCache: false, _originalTexture: null, ctor: null, _ctorForCanvas: function (fileImage, capacity) {
    cc.Node.prototype.ctor.call(this);
    var texture2D;
    capacity = capacity || cc.DEFAULT_SPRITE_BATCH_CAPACITY;
    if (typeof fileImage == "string") {
        texture2D = cc.textureCache.textureForKey(fileImage);
        if (!texture2D)texture2D = cc.textureCache.addImage(fileImage)
    } else if (fileImage instanceof cc.Texture2D)texture2D = fileImage;
    texture2D && this.initWithTexture(texture2D, capacity)
}, _ctorForWebGL: function (fileImage, capacity) {
    cc.Node.prototype.ctor.call(this);
    this._mvpMatrix = new cc.kmMat4;
    var texture2D;
    capacity = capacity || cc.DEFAULT_SPRITE_BATCH_CAPACITY;
    if (typeof fileImage ==
        "string") {
        texture2D = cc.textureCache.textureForKey(fileImage);
        if (!texture2D)texture2D = cc.textureCache.addImage(fileImage)
    } else if (fileImage instanceof cc.Texture2D)texture2D = fileImage;
    texture2D && this.initWithTexture(texture2D, capacity)
}, updateQuadFromSprite: null, _updateQuadFromSpriteForCanvas: function (sprite, index) {
    cc.assert(sprite, cc._LogInfos.CCSpriteBatchNode_updateQuadFromSprite_2);
    if (!(sprite instanceof cc.Sprite)) {
        cc.log(cc._LogInfos.CCSpriteBatchNode_updateQuadFromSprite);
        return
    }
    sprite.batchNode =
        this;
    sprite.atlasIndex = index;
    sprite.dirty = true;
    sprite.updateTransform()
}, _updateQuadFromSpriteForWebGL: function (sprite, index) {
    cc.assert(sprite, cc._LogInfos.CCSpriteBatchNode_updateQuadFromSprite);
    if (!(sprite instanceof cc.Sprite)) {
        cc.log(cc._LogInfos.CCSpriteBatchNode_updateQuadFromSprite);
        return
    }
    var locCapacity = this.textureAtlas.capacity;
    while (index >= locCapacity || locCapacity == this.textureAtlas.totalQuads)this.increaseAtlasCapacity();
    sprite.batchNode = this;
    sprite.atlasIndex = index;
    sprite.dirty = true;
    sprite.updateTransform()
}, _swap: function (oldIndex, newIndex) {
    var locDescendants = this._descendants;
    var locTextureAtlas = this.textureAtlas;
    var quads = locTextureAtlas.quads;
    var tempItem = locDescendants[oldIndex];
    var tempIteQuad = cc.V3F_C4B_T2F_QuadCopy(quads[oldIndex]);
    locDescendants[newIndex].atlasIndex = oldIndex;
    locDescendants[oldIndex] = locDescendants[newIndex];
    locTextureAtlas.updateQuad(quads[newIndex], oldIndex);
    locDescendants[newIndex] = tempItem;
    locTextureAtlas.updateQuad(tempIteQuad, newIndex)
}, insertQuadFromSprite: null,
    _insertQuadFromSpriteForCanvas: function (sprite, index) {
        cc.assert(sprite, cc._LogInfos.CCSpriteBatchNode_insertQuadFromSprite_2);
        if (!(sprite instanceof cc.Sprite)) {
            cc.log(cc._LogInfos.CCSpriteBatchNode_insertQuadFromSprite);
            return
        }
        sprite.batchNode = this;
        sprite.atlasIndex = index;
        sprite.dirty = true;
        sprite.updateTransform();
        this._children.splice(index, 0, sprite)
    }, _insertQuadFromSpriteForWebGL: function (sprite, index) {
        cc.assert(sprite, cc._LogInfos.Sprite_insertQuadFromSprite_2);
        if (!(sprite instanceof cc.Sprite)) {
            cc.log(cc._LogInfos.Sprite_insertQuadFromSprite);
            return
        }
        var locTextureAtlas = this.textureAtlas;
        while (index >= locTextureAtlas.capacity || locTextureAtlas.capacity === locTextureAtlas.totalQuads)this.increaseAtlasCapacity();
        sprite.batchNode = this;
        sprite.atlasIndex = index;
        locTextureAtlas.insertQuad(sprite.quad, index);
        sprite.dirty = true;
        sprite.updateTransform()
    }, _updateAtlasIndex: function (sprite, curIndex) {
        var count = 0;
        var pArray = sprite.children;
        if (pArray)count = pArray.length;
        var oldIndex = 0;
        if (count === 0) {
            oldIndex = sprite.atlasIndex;
            sprite.atlasIndex = curIndex;
            sprite.arrivalOrder =
                0;
            if (oldIndex != curIndex)this._swap(oldIndex, curIndex);
            curIndex++
        } else {
            var needNewIndex = true;
            if (pArray[0].zIndex >= 0) {
                oldIndex = sprite.atlasIndex;
                sprite.atlasIndex = curIndex;
                sprite.arrivalOrder = 0;
                if (oldIndex != curIndex)this._swap(oldIndex, curIndex);
                curIndex++;
                needNewIndex = false
            }
            for (var i = 0; i < pArray.length; i++) {
                var child = pArray[i];
                if (needNewIndex && child.zIndex >= 0) {
                    oldIndex = sprite.atlasIndex;
                    sprite.atlasIndex = curIndex;
                    sprite.arrivalOrder = 0;
                    if (oldIndex != curIndex)this._swap(oldIndex, curIndex);
                    curIndex++;
                    needNewIndex =
                        false
                }
                curIndex = this._updateAtlasIndex(child, curIndex)
            }
            if (needNewIndex) {
                oldIndex = sprite.atlasIndex;
                sprite.atlasIndex = curIndex;
                sprite.arrivalOrder = 0;
                if (oldIndex != curIndex)this._swap(oldIndex, curIndex);
                curIndex++
            }
        }
        return curIndex
    }, _updateBlendFunc: function () {
        if (!this.textureAtlas.texture.hasPremultipliedAlpha()) {
            this._blendFunc.src = cc.SRC_ALPHA;
            this._blendFunc.dst = cc.ONE_MINUS_SRC_ALPHA
        }
    }, initWithTexture: null, _initWithTextureForCanvas: function (tex, capacity) {
        this._children = [];
        this._descendants = [];
        this._blendFunc =
            new cc.BlendFunc(cc.BLEND_SRC, cc.BLEND_DST);
        this._originalTexture = tex;
        this._textureForCanvas = tex;
        return true
    }, _initWithTextureForWebGL: function (tex, capacity) {
        this._children = [];
        this._descendants = [];
        this._blendFunc = new cc.BlendFunc(cc.BLEND_SRC, cc.BLEND_DST);
        capacity = capacity || cc.DEFAULT_SPRITE_BATCH_CAPACITY;
        this.textureAtlas = new cc.TextureAtlas;
        this.textureAtlas.initWithTexture(tex, capacity);
        this._updateBlendFunc();
        this.shaderProgram = cc.shaderCache.programForKey(cc.SHADER_POSITION_TEXTURECOLOR);
        return true
    },
    insertChild: function (sprite, index) {
        sprite.batchNode = this;
        sprite.atlasIndex = index;
        sprite.dirty = true;
        var locTextureAtlas = this.textureAtlas;
        if (locTextureAtlas.totalQuads >= locTextureAtlas.capacity)this.increaseAtlasCapacity();
        locTextureAtlas.insertQuad(sprite.quad, index);
        this._descendants.splice(index, 0, sprite);
        var i = index + 1, locDescendant = this._descendants;
        if (locDescendant && locDescendant.length > 0)for (; i < locDescendant.length; i++)locDescendant[i].atlasIndex++;
        var locChildren = sprite.children, child;
        if (locChildren)for (i =
                                 0, l = locChildren.length || 0; i < l; i++) {
            child = locChildren[i];
            if (child) {
                var getIndex = this.atlasIndexForChild(child, child.zIndex);
                this.insertChild(child, getIndex)
            }
        }
    }, appendChild: null, _appendChildForCanvas: function (sprite) {
        this._reorderChildDirty = true;
        sprite.batchNode = this;
        sprite.dirty = true;
        this._descendants.push(sprite);
        var index = this._descendants.length - 1;
        sprite.atlasIndex = index;
        var children = sprite.children;
        for (var i = 0, l = children.length || 0; i < l; i++)this.appendChild(children[i])
    }, _appendChildForWebGL: function (sprite) {
        this._reorderChildDirty =
            true;
        sprite.batchNode = this;
        sprite.dirty = true;
        this._descendants.push(sprite);
        var index = this._descendants.length - 1;
        sprite.atlasIndex = index;
        var locTextureAtlas = this.textureAtlas;
        if (locTextureAtlas.totalQuads == locTextureAtlas.capacity)this.increaseAtlasCapacity();
        locTextureAtlas.insertQuad(sprite.quad, index);
        var children = sprite.children;
        for (var i = 0, l = children.length || 0; i < l; i++)this.appendChild(children[i])
    }, removeSpriteFromAtlas: null, _removeSpriteFromAtlasForCanvas: function (sprite) {
        sprite.batchNode = null;
        var locDescendants = this._descendants;
        var index = locDescendants.indexOf(sprite);
        if (index != -1) {
            locDescendants.splice(index, 1);
            var len = locDescendants.length;
            for (; index < len; ++index) {
                var s = locDescendants[index];
                s.atlasIndex--
            }
        }
        var children = sprite.children;
        if (children)for (var i = 0, l = children.length || 0; i < l; i++)children[i] && this.removeSpriteFromAtlas(children[i])
    }, _removeSpriteFromAtlasForWebGL: function (sprite) {
        this.textureAtlas.removeQuadAtIndex(sprite.atlasIndex);
        sprite.batchNode = null;
        var locDescendants =
            this._descendants;
        var index = locDescendants.indexOf(sprite);
        if (index != -1) {
            locDescendants.splice(index, 1);
            var len = locDescendants.length;
            for (; index < len; ++index) {
                var s = locDescendants[index];
                s.atlasIndex--
            }
        }
        var children = sprite.children;
        if (children)for (var i = 0, l = children.length || 0; i < l; i++)children[i] && this.removeSpriteFromAtlas(children[i])
    }, getTexture: null, _getTextureForCanvas: function () {
        return this._textureForCanvas
    }, _getTextureForWebGL: function () {
        return this.textureAtlas.texture
    }, setTexture: null, _setTextureForCanvas: function (texture) {
        this._textureForCanvas =
            texture;
        var locChildren = this._children;
        for (var i = 0; i < locChildren.length; i++)locChildren[i].texture = texture
    }, _setTextureForWebGL: function (texture) {
        this.textureAtlas.texture = texture;
        this._updateBlendFunc()
    }, visit: null, _visitForCanvas: function (ctx) {
        var context = ctx || cc._renderContext;
        if (!this._visible)return;
        context.save();
        this.transform(ctx);
        var i, locChildren = this._children;
        if (locChildren) {
            this.sortAllChildren();
            for (i = 0; i < locChildren.length; i++)if (locChildren[i])locChildren[i].visit(context)
        }
        context.restore()
    },
    _visitForWebGL: function (ctx) {
        var gl = ctx || cc._renderContext;
        if (!this._visible)return;
        cc.kmGLPushMatrix();
        var locGrid = this.grid;
        if (locGrid && locGrid.isActive()) {
            locGrid.beforeDraw();
            this.transformAncestors()
        }
        this.sortAllChildren();
        this.transform(gl);
        this.draw(gl);
        if (locGrid && locGrid.isActive())locGrid.afterDraw(this);
        cc.kmGLPopMatrix();
        this.arrivalOrder = 0
    }, addChild: null, _addChildForCanvas: function (child, zOrder, tag) {
        cc.assert(child != null, cc._LogInfos.CCSpriteBatchNode_addChild_3);
        if (!(child instanceof
            cc.Sprite)) {
            cc.log(cc._LogInfos.CCSpriteBatchNode_addChild);
            return
        }
        zOrder = zOrder == null ? child.zIndex : zOrder;
        tag = tag == null ? child.tag : tag;
        cc.Node.prototype.addChild.call(this, child, zOrder, tag);
        this.appendChild(child);
        this.setNodeDirty()
    }, _addChildForWebGL: function (child, zOrder, tag) {
        cc.assert(child != null, cc._LogInfos.Sprite_addChild_6);
        if (!(child instanceof cc.Sprite)) {
            cc.log(cc._LogInfos.Sprite_addChild_4);
            return
        }
        if (child.texture != this.textureAtlas.texture) {
            cc.log(cc._LogInfos.Sprite_addChild_5);
            return
        }
        zOrder =
                zOrder == null ? child.zIndex : zOrder;
        tag = tag == null ? child.tag : tag;
        cc.Node.prototype.addChild.call(this, child, zOrder, tag);
        this.appendChild(child);
        this.setNodeDirty()
    }, removeAllChildren: null, _removeAllChildrenForCanvas: function (cleanup) {
        var locDescendants = this._descendants;
        if (locDescendants && locDescendants.length > 0)for (var i = 0, len = locDescendants.length; i < len; i++)if (locDescendants[i])locDescendants[i].batchNode = null;
        cc.Node.prototype.removeAllChildren.call(this, cleanup);
        this._descendants.length = 0
    }, _removeAllChildrenForWebGL: function (cleanup) {
        var locDescendants =
            this._descendants;
        if (locDescendants && locDescendants.length > 0)for (var i = 0, len = locDescendants.length; i < len; i++)if (locDescendants[i])locDescendants[i].batchNode = null;
        cc.Node.prototype.removeAllChildren.call(this, cleanup);
        this._descendants.length = 0;
        this.textureAtlas.removeAllQuads()
    }, sortAllChildren: null, _sortAllChildrenForCanvas: function () {
        if (this._reorderChildDirty) {
            var i, j = 0, locChildren = this._children;
            var length = locChildren.length, tempChild;
            for (i = 1; i < length; i++) {
                var tempItem = locChildren[i];
                j = i - 1;
                tempChild =
                    locChildren[j];
                while (j >= 0 && (tempItem._localZOrder < tempChild._localZOrder || tempItem._localZOrder == tempChild._localZOrder && tempItem.arrivalOrder < tempChild.arrivalOrder)) {
                    locChildren[j + 1] = tempChild;
                    j = j - 1;
                    tempChild = locChildren[j]
                }
                locChildren[j + 1] = tempItem
            }
            if (locChildren.length > 0)this._arrayMakeObjectsPerformSelector(locChildren, cc.Node.StateCallbackType.sortAllChildren);
            this._reorderChildDirty = false
        }
    }, _sortAllChildrenForWebGL: function () {
        if (this._reorderChildDirty) {
            var childrenArr = this._children;
            var i,
                j = 0, length = childrenArr.length, tempChild;
            for (i = 1; i < length; i++) {
                var tempItem = childrenArr[i];
                j = i - 1;
                tempChild = childrenArr[j];
                while (j >= 0 && (tempItem._localZOrder < tempChild._localZOrder || tempItem._localZOrder == tempChild._localZOrder && tempItem.arrivalOrder < tempChild.arrivalOrder)) {
                    childrenArr[j + 1] = tempChild;
                    j = j - 1;
                    tempChild = childrenArr[j]
                }
                childrenArr[j + 1] = tempItem
            }
            if (childrenArr.length > 0) {
                this._arrayMakeObjectsPerformSelector(childrenArr, cc.Node.StateCallbackType.sortAllChildren);
                var index = 0;
                for (i = 0; i < childrenArr.length; i++)index =
                    this._updateAtlasIndex(childrenArr[i], index)
            }
            this._reorderChildDirty = false
        }
    }, draw: null, _drawForWebGL: function () {
        if (this.textureAtlas.totalQuads === 0)return;
        this._shaderProgram.use();
        this._shaderProgram.setUniformForModelViewAndProjectionMatrixWithMat4();
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.updateTransform);
        cc.glBlendFunc(this._blendFunc.src, this._blendFunc.dst);
        this.textureAtlas.drawQuads()
    }});
var _p = cc.SpriteBatchNode.prototype;
if (cc._renderType === cc._RENDER_TYPE_WEBGL) {
    _p.ctor = _p._ctorForWebGL;
    _p.updateQuadFromSprite = _p._updateQuadFromSpriteForWebGL;
    _p.insertQuadFromSprite = _p._insertQuadFromSpriteForWebGL;
    _p.initWithTexture = _p._initWithTextureForWebGL;
    _p.appendChild = _p._appendChildForWebGL;
    _p.removeSpriteFromAtlas = _p._removeSpriteFromAtlasForWebGL;
    _p.getTexture = _p._getTextureForWebGL;
    _p.setTexture = _p._setTextureForWebGL;
    _p.visit = _p._visitForWebGL;
    _p.addChild = _p._addChildForWebGL;
    _p.removeAllChildren = _p._removeAllChildrenForWebGL;
    _p.sortAllChildren = _p._sortAllChildrenForWebGL;
    _p.draw = _p._drawForWebGL
} else {
    _p.ctor = _p._ctorForCanvas;
    _p.updateQuadFromSprite = _p._updateQuadFromSpriteForCanvas;
    _p.insertQuadFromSprite = _p._insertQuadFromSpriteForCanvas;
    _p.initWithTexture = _p._initWithTextureForCanvas;
    _p.appendChild = _p._appendChildForCanvas;
    _p.removeSpriteFromAtlas = _p._removeSpriteFromAtlasForCanvas;
    _p.getTexture = _p._getTextureForCanvas;
    _p.setTexture = _p._setTextureForCanvas;
    _p.visit = _p._visitForCanvas;
    _p.removeAllChildren = _p._removeAllChildrenForCanvas;
    _p.addChild = _p._addChildForCanvas;
    _p.sortAllChildren = _p._sortAllChildrenForCanvas;
    _p.draw = cc.Node.prototype.draw
}
cc.defineGetterSetter(_p, "texture", _p.getTexture, _p.setTexture);
_p.descendants;
cc.defineGetterSetter(_p, "descendants", _p.getDescendants);
cc.SpriteBatchNode.create = function (fileImage, capacity) {
    return new cc.SpriteBatchNode(fileImage, capacity)
};
cc.configuration = {ERROR: 0, STRING: 1, INT: 2, DOUBLE: 3, BOOLEAN: 4, _maxTextureSize: 0, _maxModelviewStackDepth: 0, _supportsPVRTC: false, _supportsNPOT: false, _supportsBGRA8888: false, _supportsDiscardFramebuffer: false, _supportsShareableVAO: false, _maxSamplesAllowed: 0, _maxTextureUnits: 0, _GlExtensions: "", _valueDict: {}, _inited: false, _init: function () {
    var locValueDict = this._valueDict;
    locValueDict["cocos2d.x.version"] = cc.ENGINE_VERSION;
    locValueDict["cocos2d.x.compiled_with_profiler"] = false;
    locValueDict["cocos2d.x.compiled_with_gl_state_cache"] =
        cc.ENABLE_GL_STATE_CACHE;
    this._inited = true
}, getMaxTextureSize: function () {
    return this._maxTextureSize
}, getMaxModelviewStackDepth: function () {
    return this._maxModelviewStackDepth
}, getMaxTextureUnits: function () {
    return this._maxTextureUnits
}, supportsNPOT: function () {
    return this._supportsNPOT
}, supportsPVRTC: function () {
    return this._supportsPVRTC
}, supportsETC: function () {
    return false
}, supportsS3TC: function () {
    return false
}, supportsATITC: function () {
    return false
}, supportsBGRA8888: function () {
    return this._supportsBGRA8888
},
    supportsDiscardFramebuffer: function () {
        return this._supportsDiscardFramebuffer
    }, supportsShareableVAO: function () {
        return this._supportsShareableVAO
    }, checkForGLExtension: function (searchName) {
        return this._GlExtensions.indexOf(searchName) > -1
    }, getValue: function (key, default_value) {
        if (!this._inited)this._init();
        var locValueDict = this._valueDict;
        if (locValueDict[key])return locValueDict[key];
        return default_value
    }, setValue: function (key, value) {
        this._valueDict[key] = value
    }, dumpInfo: function () {
        if (cc.ENABLE_GL_STATE_CACHE ===
            0) {
            cc.log("");
            cc.log(cc._LogInfos.configuration_dumpInfo);
            cc.log("")
        }
    }, gatherGPUInfo: function () {
        if (cc._renderType === cc._RENDER_TYPE_CANVAS)return;
        if (!this._inited)this._init();
        var gl = cc._renderContext;
        var locValueDict = this._valueDict;
        locValueDict["gl.vendor"] = gl.getParameter(gl.VENDOR);
        locValueDict["gl.renderer"] = gl.getParameter(gl.RENDERER);
        locValueDict["gl.version"] = gl.getParameter(gl.VERSION);
        this._GlExtensions = "";
        var extArr = gl.getSupportedExtensions();
        for (var i = 0; i < extArr.length; i++)this._GlExtensions +=
            extArr[i] + " ";
        this._maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        locValueDict["gl.max_texture_size"] = this._maxTextureSize;
        this._maxTextureUnits = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
        locValueDict["gl.max_texture_units"] = this._maxTextureUnits;
        this._supportsPVRTC = this.checkForGLExtension("GL_IMG_texture_compression_pvrtc");
        locValueDict["gl.supports_PVRTC"] = this._supportsPVRTC;
        this._supportsNPOT = false;
        locValueDict["gl.supports_NPOT"] = this._supportsNPOT;
        this._supportsBGRA8888 = this.checkForGLExtension("GL_IMG_texture_format_BGRA888");
        locValueDict["gl.supports_BGRA8888"] = this._supportsBGRA8888;
        this._supportsDiscardFramebuffer = this.checkForGLExtension("GL_EXT_discard_framebuffer");
        locValueDict["gl.supports_discard_framebuffer"] = this._supportsDiscardFramebuffer;
        this._supportsShareableVAO = this.checkForGLExtension("vertex_array_object");
        locValueDict["gl.supports_vertex_array_object"] = this._supportsShareableVAO;
        cc.checkGLErrorDebug()
    }, loadConfigFile: function (url) {
        if (!this._inited)this._init();
        var dict = cc.loader.getRes(url);
        if (!dict)throw"Please load the resource first : " +
            url;
        cc.assert(dict, cc._LogInfos.configuration_loadConfigFile_2, url);
        var getDatas = dict["data"];
        if (!getDatas) {
            cc.log(cc._LogInfos.configuration_loadConfigFile, url);
            return
        }
        for (var selKey in getDatas)this._valueDict[selKey] = getDatas[selKey]
    }};
cc.Camera = cc.Class.extend({_eyeX: null, _eyeY: null, _eyeZ: null, _centerX: null, _centerY: null, _centerZ: null, _upX: null, _upY: null, _upZ: null, _dirty: null, _lookupMatrix: null, ctor: function () {
    this._lookupMatrix = new cc.kmMat4;
    this.restore()
}, description: function () {
    return"\x3cCCCamera | center \x3d(" + this._centerX + "," + this._centerY + "," + this._centerZ + ")\x3e"
}, setDirty: function (value) {
    this._dirty = value
}, isDirty: function () {
    return this._dirty
}, restore: function () {
    this._eyeX = this._eyeY = 0;
    this._eyeZ = cc.Camera.getZEye();
    this._centerX = this._centerY = this._centerZ = 0;
    this._upX = 0;
    this._upY = 1;
    this._upZ = 0;
    cc.kmMat4Identity(this._lookupMatrix);
    this._dirty = false
}, locate: function () {
    if (this._dirty) {
        var eye = new cc.kmVec3, center = new cc.kmVec3, up = new cc.kmVec3;
        cc.kmVec3Fill(eye, this._eyeX, this._eyeY, this._eyeZ);
        cc.kmVec3Fill(center, this._centerX, this._centerY, this._centerZ);
        cc.kmVec3Fill(up, this._upX, this._upY, this._upZ);
        cc.kmMat4LookAt(this._lookupMatrix, eye, center, up);
        this._dirty = false
    }
    cc.kmGLMultMatrix(this._lookupMatrix)
},
    setEyeXYZ: function (eyeX, eyeY, eyeZ) {
        this.setEye(eyeX, eyeY, eyeZ)
    }, setEye: function (eyeX, eyeY, eyeZ) {
        this._eyeX = eyeX;
        this._eyeY = eyeY;
        this._eyeZ = eyeZ;
        this._dirty = true
    }, setCenterXYZ: function (centerX, centerY, centerZ) {
        this.setCenter(centerX, centerY, centerZ)
    }, setCenter: function (centerX, centerY, centerZ) {
        this._centerX = centerX;
        this._centerY = centerY;
        this._centerZ = centerZ;
        this._dirty = true
    }, setUpXYZ: function (upX, upY, upZ) {
        this.setUp(upX, upY, upZ)
    }, setUp: function (upX, upY, upZ) {
        this._upX = upX;
        this._upY = upY;
        this._upZ = upZ;
        this._dirty = true
    }, getEyeXYZ: function (eyeX, eyeY, eyeZ) {
        return{x: this._eyeX, y: this._eyeY, z: this._eyeZ}
    }, getEye: function () {
        return{x: this._eyeX, y: this._eyeY, z: this._eyeZ}
    }, getCenterXYZ: function (centerX, centerY, centerZ) {
        return{x: this._centerX, y: this._centerY, z: this._centerZ}
    }, getCenter: function () {
        return{x: this._centerX, y: this._centerY, z: this._centerZ}
    }, getUpXYZ: function (upX, upY, upZ) {
        return{x: this._upX, y: this._upY, z: this._upZ}
    }, getUp: function () {
        return{x: this._upX, y: this._upY, z: this._upZ}
    }, _DISALLOW_COPY_AND_ASSIGN: function (CCCamera) {
    }});
cc.Camera.getZEye = function () {
    return cc.FLT_EPSILON
};
cc.PI2 = Math.PI * 2;
cc.DrawingPrimitiveCanvas = cc.Class.extend({_cacheArray: [], _renderContext: null, ctor: function (renderContext) {
    this._renderContext = renderContext
}, drawPoint: function (point, size) {
    if (!size)size = 1;
    var locScaleX = cc.view.getScaleX(), locScaleY = cc.view.getScaleY();
    var newPoint = cc.p(point.x * locScaleX, point.y * locScaleY);
    this._renderContext.beginPath();
    this._renderContext.arc(newPoint.x, -newPoint.y, size * locScaleX, 0, Math.PI * 2, false);
    this._renderContext.closePath();
    this._renderContext.fill()
}, drawPoints: function (points, numberOfPoints, size) {
    if (points == null)return;
    if (!size)size = 1;
    var locContext = this._renderContext, locScaleX = cc.view.getScaleX(), locScaleY = cc.view.getScaleY();
    locContext.beginPath();
    for (var i = 0, len = points.length; i < len; i++)locContext.arc(points[i].x * locScaleX, -points[i].y * locScaleY, size * locScaleX, 0, Math.PI * 2, false);
    locContext.closePath();
    locContext.fill()
}, drawLine: function (origin, destination) {
    var locContext = this._renderContext, locScaleX = cc.view.getScaleX(), locScaleY = cc.view.getScaleY();
    locContext.beginPath();
    locContext.moveTo(origin.x *
        locScaleX, -origin.y * locScaleY);
    locContext.lineTo(destination.x * locScaleX, -destination.y * locScaleY);
    locContext.closePath();
    locContext.stroke()
}, drawRect: function (origin, destination) {
    this.drawLine(cc.p(origin.x, origin.y), cc.p(destination.x, origin.y));
    this.drawLine(cc.p(destination.x, origin.y), cc.p(destination.x, destination.y));
    this.drawLine(cc.p(destination.x, destination.y), cc.p(origin.x, destination.y));
    this.drawLine(cc.p(origin.x, destination.y), cc.p(origin.x, origin.y))
}, drawSolidRect: function (origin, destination, color) {
    var vertices = [origin, cc.p(destination.x, origin.y), destination, cc.p(origin.x, destination.y)];
    this.drawSolidPoly(vertices, 4, color)
}, drawPoly: function (vertices, numOfVertices, closePolygon, fill) {
    fill = fill || false;
    if (vertices == null)return;
    if (vertices.length < 3)throw new Error("Polygon's point must greater than 2");
    var firstPoint = vertices[0], locContext = this._renderContext;
    var locScaleX = cc.view.getScaleX(), locScaleY = cc.view.getScaleY();
    locContext.beginPath();
    locContext.moveTo(firstPoint.x *
        locScaleX, -firstPoint.y * locScaleY);
    for (var i = 1, len = vertices.length; i < len; i++)locContext.lineTo(vertices[i].x * locScaleX, -vertices[i].y * locScaleY);
    if (closePolygon)locContext.closePath();
    if (fill)locContext.fill(); else locContext.stroke()
}, drawSolidPoly: function (polygons, numberOfPoints, color) {
    this.setDrawColor(color.r, color.g, color.b, color.a);
    this.drawPoly(polygons, numberOfPoints, true, true)
}, drawCircle: function (center, radius, angle, segments, drawLineToCenter) {
    drawLineToCenter = drawLineToCenter || false;
    var locContext =
        this._renderContext;
    var locScaleX = cc.view.getScaleX(), locScaleY = cc.view.getScaleY();
    locContext.beginPath();
    var endAngle = angle - Math.PI * 2;
    locContext.arc(0 | center.x * locScaleX, 0 | -(center.y * locScaleY), radius * locScaleX, -angle, -endAngle, false);
    if (drawLineToCenter)locContext.lineTo(0 | center.x * locScaleX, 0 | -(center.y * locScaleY));
    locContext.stroke()
}, drawQuadBezier: function (origin, control, destination, segments) {
    var vertices = this._cacheArray;
    vertices.length = 0;
    var t = 0;
    for (var i = 0; i < segments; i++) {
        var x = Math.pow(1 -
            t, 2) * origin.x + 2 * (1 - t) * t * control.x + t * t * destination.x;
        var y = Math.pow(1 - t, 2) * origin.y + 2 * (1 - t) * t * control.y + t * t * destination.y;
        vertices.push(cc.p(x, y));
        t += 1 / segments
    }
    vertices.push(cc.p(destination.x, destination.y));
    this.drawPoly(vertices, segments + 1, false, false)
}, drawCubicBezier: function (origin, control1, control2, destination, segments) {
    var vertices = this._cacheArray;
    vertices.length = 0;
    var t = 0;
    for (var i = 0; i < segments; i++) {
        var x = Math.pow(1 - t, 3) * origin.x + 3 * Math.pow(1 - t, 2) * t * control1.x + 3 * (1 - t) * t * t * control2.x + t * t *
            t * destination.x;
        var y = Math.pow(1 - t, 3) * origin.y + 3 * Math.pow(1 - t, 2) * t * control1.y + 3 * (1 - t) * t * t * control2.y + t * t * t * destination.y;
        vertices.push(cc.p(x, y));
        t += 1 / segments
    }
    vertices.push(cc.p(destination.x, destination.y));
    this.drawPoly(vertices, segments + 1, false, false)
}, drawCatmullRom: function (points, segments) {
    this.drawCardinalSpline(points, 0.5, segments)
}, drawCardinalSpline: function (config, tension, segments) {
    cc._renderContext.strokeStyle = "rgba(255,255,255,1)";
    var points = this._cacheArray;
    points.length = 0;
    var p, lt;
    var deltaT = 1 / config.length;
    for (var i = 0; i < segments + 1; i++) {
        var dt = i / segments;
        if (dt == 1) {
            p = config.length - 1;
            lt = 1
        } else {
            p = 0 | dt / deltaT;
            lt = (dt - deltaT * p) / deltaT
        }
        var newPos = cc.CardinalSplineAt(cc.getControlPointAt(config, p - 1), cc.getControlPointAt(config, p - 0), cc.getControlPointAt(config, p + 1), cc.getControlPointAt(config, p + 2), tension, lt);
        points.push(newPos)
    }
    this.drawPoly(points, segments + 1, false, false)
}, drawImage: function (image, sourcePoint, sourceSize, destPoint, destSize) {
    var len = arguments.length;
    switch (len) {
        case 2:
            var height =
                image.height;
            this._renderContext.drawImage(image, sourcePoint.x, -(sourcePoint.y + height));
            break;
        case 3:
            this._renderContext.drawImage(image, sourcePoint.x, -(sourcePoint.y + sourceSize.height), sourceSize.width, sourceSize.height);
            break;
        case 5:
            this._renderContext.drawImage(image, sourcePoint.x, sourcePoint.y, sourceSize.width, sourceSize.height, destPoint.x, -(destPoint.y + destSize.height), destSize.width, destSize.height);
            break;
        default:
            throw new Error("Argument must be non-nil");
            break
    }
}, drawStar: function (ctx, radius, color) {
    var context = ctx || this._renderContext;
    radius *= cc.view.getScaleX();
    var colorStr = "rgba(" + (0 | color.r) + "," + (0 | color.g) + "," + (0 | color.b);
    context.fillStyle = colorStr + ",1)";
    var subRadius = radius / 10;
    context.beginPath();
    context.moveTo(-radius, radius);
    context.lineTo(0, subRadius);
    context.lineTo(radius, radius);
    context.lineTo(subRadius, 0);
    context.lineTo(radius, -radius);
    context.lineTo(0, -subRadius);
    context.lineTo(-radius, -radius);
    context.lineTo(-subRadius, 0);
    context.lineTo(-radius, radius);
    context.closePath();
    context.fill();
    var g1 = context.createRadialGradient(0, 0, subRadius, 0, 0, radius);
    g1.addColorStop(0, colorStr + ", 1)");
    g1.addColorStop(0.3, colorStr + ", 0.8)");
    g1.addColorStop(1, colorStr + ", 0.0)");
    context.fillStyle = g1;
    context.beginPath();
    var startAngle_1 = 0;
    var endAngle_1 = cc.PI2;
    context.arc(0, 0, radius - subRadius, startAngle_1, endAngle_1, false);
    context.closePath();
    context.fill()
}, drawColorBall: function (ctx, radius, color) {
    var context = ctx || this._renderContext;
    radius *= cc.view.getScaleX();
    var colorStr = "rgba(" + (0 | color.r) +
        "," + (0 | color.g) + "," + (0 | color.b);
    var subRadius = radius / 10;
    var g1 = context.createRadialGradient(0, 0, subRadius, 0, 0, radius);
    g1.addColorStop(0, colorStr + ", 1)");
    g1.addColorStop(0.3, colorStr + ", 0.8)");
    g1.addColorStop(0.6, colorStr + ", 0.4)");
    g1.addColorStop(1, colorStr + ", 0.0)");
    context.fillStyle = g1;
    context.beginPath();
    var startAngle_1 = 0;
    var endAngle_1 = cc.PI2;
    context.arc(0, 0, radius, startAngle_1, endAngle_1, false);
    context.closePath();
    context.fill()
}, fillText: function (strText, x, y) {
    this._renderContext.fillText(strText,
        x, -y)
}, setDrawColor: function (r, g, b, a) {
    this._renderContext.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a / 255 + ")";
    this._renderContext.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + a / 255 + ")"
}, setPointSize: function (pointSize) {
}, setLineWidth: function (width) {
    this._renderContext.lineWidth = width * cc.view.getScaleX()
}});
cc.DrawingPrimitiveWebGL = cc.Class.extend({_renderContext: null, _initialized: false, _shader: null, _colorLocation: -1, _colorArray: null, _pointSizeLocation: -1, _pointSize: -1, ctor: function (ctx) {
    if (ctx == null)ctx = cc._renderContext;
    if (!ctx instanceof WebGLRenderingContext)throw"Can't initialise DrawingPrimitiveWebGL. context need is WebGLRenderingContext";
    this._renderContext = ctx;
    this._colorArray = new Float32Array([1, 1, 1, 1])
}, lazy_init: function () {
    var _t = this;
    if (!_t._initialized) {
        _t._shader = cc.shaderCache.programForKey(cc.SHADER_POSITION_UCOLOR);
        _t._colorLocation = _t._renderContext.getUniformLocation(_t._shader.getProgram(), "u_color");
        _t._pointSizeLocation = _t._renderContext.getUniformLocation(_t._shader.getProgram(), "u_pointSize");
        _t._initialized = true
    }
}, drawInit: function () {
    this._initialized = false
}, drawPoint: function (point) {
    this.lazy_init();
    var glContext = this._renderContext;
    this._shader.use();
    this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
    cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSITION);
    glContext.uniform4fv(this._colorLocation,
        this._colorArray);
    this._shader.setUniformLocationWith1f(this._pointSizeLocation, this._pointSize);
    var pointBuffer = glContext.createBuffer();
    glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
    glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array([point.x, point.y]), glContext.STATIC_DRAW);
    glContext.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);
    glContext.drawArrays(glContext.POINTS, 0, 1);
    glContext.deleteBuffer(pointBuffer);
    cc.incrementGLDraws(1)
}, drawPoints: function (points, numberOfPoints) {
    if (!points || points.length == 0)return;
    this.lazy_init();
    var glContext = this._renderContext;
    this._shader.use();
    this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
    cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSITION);
    glContext.uniform4fv(this._colorLocation, this._colorArray);
    this._shader.setUniformLocationWith1f(this._pointSizeLocation, this._pointSize);
    var pointBuffer = glContext.createBuffer();
    glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
    glContext.bufferData(glContext.ARRAY_BUFFER,
        this._pointsToTypeArray(points), glContext.STATIC_DRAW);
    glContext.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);
    glContext.drawArrays(glContext.POINTS, 0, points.length);
    glContext.deleteBuffer(pointBuffer);
    cc.incrementGLDraws(1)
}, _pointsToTypeArray: function (points) {
    var typeArr = new Float32Array(points.length * 2);
    for (var i = 0; i < points.length; i++) {
        typeArr[i * 2] = points[i].x;
        typeArr[i * 2 + 1] = points[i].y
    }
    return typeArr
}, drawLine: function (origin, destination) {
    this.lazy_init();
    var glContext =
        this._renderContext;
    this._shader.use();
    this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
    cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSITION);
    glContext.uniform4fv(this._colorLocation, this._colorArray);
    var pointBuffer = glContext.createBuffer();
    glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
    glContext.bufferData(glContext.ARRAY_BUFFER, this._pointsToTypeArray([origin, destination]), glContext.STATIC_DRAW);
    glContext.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT,
        false, 0, 0);
    glContext.drawArrays(glContext.LINES, 0, 2);
    glContext.deleteBuffer(pointBuffer);
    cc.incrementGLDraws(1)
}, drawRect: function (origin, destination) {
    this.drawLine(cc.p(origin.x, origin.y), cc.p(destination.x, origin.y));
    this.drawLine(cc.p(destination.x, origin.y), cc.p(destination.x, destination.y));
    this.drawLine(cc.p(destination.x, destination.y), cc.p(origin.x, destination.y));
    this.drawLine(cc.p(origin.x, destination.y), cc.p(origin.x, origin.y))
}, drawSolidRect: function (origin, destination, color) {
    var vertices =
        [origin, cc.p(destination.x, origin.y), destination, cc.p(origin.x, destination.y)];
    this.drawSolidPoly(vertices, 4, color)
}, drawPoly: function (vertices, numOfVertices, closePolygon) {
    this.lazy_init();
    var glContext = this._renderContext;
    this._shader.use();
    this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
    cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSITION);
    glContext.uniform4fv(this._colorLocation, this._colorArray);
    var pointBuffer = glContext.createBuffer();
    glContext.bindBuffer(glContext.ARRAY_BUFFER,
        pointBuffer);
    glContext.bufferData(glContext.ARRAY_BUFFER, this._pointsToTypeArray(vertices), glContext.STATIC_DRAW);
    glContext.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);
    if (closePolygon)glContext.drawArrays(glContext.LINE_LOOP, 0, vertices.length); else glContext.drawArrays(glContext.LINE_STRIP, 0, vertices.length);
    glContext.deleteBuffer(pointBuffer);
    cc.incrementGLDraws(1)
}, drawSolidPoly: function (poli, numberOfPoints, color) {
    this.lazy_init();
    if (color)this.setDrawColor(color.r,
        color.g, color.b, color.a);
    var glContext = this._renderContext;
    this._shader.use();
    this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
    cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSITION);
    glContext.uniform4fv(this._colorLocation, this._colorArray);
    var pointBuffer = glContext.createBuffer();
    glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
    glContext.bufferData(glContext.ARRAY_BUFFER, this._pointsToTypeArray(poli), glContext.STATIC_DRAW);
    glContext.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION,
        2, glContext.FLOAT, false, 0, 0);
    glContext.drawArrays(glContext.TRIANGLE_FAN, 0, poli.length);
    glContext.deleteBuffer(pointBuffer);
    cc.incrementGLDraws(1)
}, drawCircle: function (center, radius, angle, segments, drawLineToCenter) {
    this.lazy_init();
    var additionalSegment = 1;
    if (drawLineToCenter)additionalSegment++;
    var coef = 2 * Math.PI / segments;
    var vertices = new Float32Array((segments + 2) * 2);
    if (!vertices)return;
    for (var i = 0; i <= segments; i++) {
        var rads = i * coef;
        var j = radius * Math.cos(rads + angle) + center.x;
        var k = radius * Math.sin(rads +
            angle) + center.y;
        vertices[i * 2] = j;
        vertices[i * 2 + 1] = k
    }
    vertices[(segments + 1) * 2] = center.x;
    vertices[(segments + 1) * 2 + 1] = center.y;
    var glContext = this._renderContext;
    this._shader.use();
    this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
    cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSITION);
    glContext.uniform4fv(this._colorLocation, this._colorArray);
    var pointBuffer = glContext.createBuffer();
    glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
    glContext.bufferData(glContext.ARRAY_BUFFER, vertices,
        glContext.STATIC_DRAW);
    glContext.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);
    glContext.drawArrays(glContext.LINE_STRIP, 0, segments + additionalSegment);
    glContext.deleteBuffer(pointBuffer);
    cc.incrementGLDraws(1)
}, drawQuadBezier: function (origin, control, destination, segments) {
    this.lazy_init();
    var vertices = new Float32Array((segments + 1) * 2);
    var t = 0;
    for (var i = 0; i < segments; i++) {
        vertices[i * 2] = Math.pow(1 - t, 2) * origin.x + 2 * (1 - t) * t * control.x + t * t * destination.x;
        vertices[i * 2 + 1] = Math.pow(1 -
            t, 2) * origin.y + 2 * (1 - t) * t * control.y + t * t * destination.y;
        t += 1 / segments
    }
    vertices[segments * 2] = destination.x;
    vertices[segments * 2 + 1] = destination.y;
    var glContext = this._renderContext;
    this._shader.use();
    this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
    cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSITION);
    glContext.uniform4fv(this._colorLocation, this._colorArray);
    var pointBuffer = glContext.createBuffer();
    glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
    glContext.bufferData(glContext.ARRAY_BUFFER,
        vertices, glContext.STATIC_DRAW);
    glContext.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);
    glContext.drawArrays(glContext.LINE_STRIP, 0, segments + 1);
    glContext.deleteBuffer(pointBuffer);
    cc.incrementGLDraws(1)
}, drawCubicBezier: function (origin, control1, control2, destination, segments) {
    this.lazy_init();
    var vertices = new Float32Array((segments + 1) * 2);
    var t = 0;
    for (var i = 0; i < segments; i++) {
        vertices[i * 2] = Math.pow(1 - t, 3) * origin.x + 3 * Math.pow(1 - t, 2) * t * control1.x + 3 * (1 - t) * t * t * control2.x + t * t *
            t * destination.x;
        vertices[i * 2 + 1] = Math.pow(1 - t, 3) * origin.y + 3 * Math.pow(1 - t, 2) * t * control1.y + 3 * (1 - t) * t * t * control2.y + t * t * t * destination.y;
        t += 1 / segments
    }
    vertices[segments * 2] = destination.x;
    vertices[segments * 2 + 1] = destination.y;
    var glContext = this._renderContext;
    this._shader.use();
    this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
    cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSITION);
    glContext.uniform4fv(this._colorLocation, this._colorArray);
    var pointBuffer = glContext.createBuffer();
    glContext.bindBuffer(glContext.ARRAY_BUFFER,
        pointBuffer);
    glContext.bufferData(glContext.ARRAY_BUFFER, vertices, glContext.STATIC_DRAW);
    glContext.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);
    glContext.drawArrays(glContext.LINE_STRIP, 0, segments + 1);
    glContext.deleteBuffer(pointBuffer);
    cc.incrementGLDraws(1)
}, drawCatmullRom: function (points, segments) {
    this.drawCardinalSpline(points, 0.5, segments)
}, drawCardinalSpline: function (config, tension, segments) {
    this.lazy_init();
    var vertices = new Float32Array((segments + 1) * 2);
    var p, lt,
        deltaT = 1 / config.length;
    for (var i = 0; i < segments + 1; i++) {
        var dt = i / segments;
        if (dt == 1) {
            p = config.length - 1;
            lt = 1
        } else {
            p = 0 | dt / deltaT;
            lt = (dt - deltaT * p) / deltaT
        }
        var newPos = cc.CardinalSplineAt(cc.getControlPointAt(config, p - 1), cc.getControlPointAt(config, p), cc.getControlPointAt(config, p + 1), cc.getControlPointAt(config, p + 2), tension, lt);
        vertices[i * 2] = newPos.x;
        vertices[i * 2 + 1] = newPos.y
    }
    var glContext = this._renderContext;
    this._shader.use();
    this._shader.setUniformForModelViewAndProjectionMatrixWithMat4();
    cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSITION);
    glContext.uniform4fv(this._colorLocation, this._colorArray);
    var pointBuffer = glContext.createBuffer();
    glContext.bindBuffer(glContext.ARRAY_BUFFER, pointBuffer);
    glContext.bufferData(glContext.ARRAY_BUFFER, vertices, glContext.STATIC_DRAW);
    glContext.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, glContext.FLOAT, false, 0, 0);
    glContext.drawArrays(glContext.LINE_STRIP, 0, segments + 1);
    glContext.deleteBuffer(pointBuffer);
    cc.incrementGLDraws(1)
}, setDrawColor: function (r, g, b, a) {
    this._colorArray[0] = r / 255;
    this._colorArray[1] =
        g / 255;
    this._colorArray[2] = b / 255;
    this._colorArray[3] = a / 255
}, setPointSize: function (pointSize) {
    this._pointSize = pointSize * cc.contentScaleFactor()
}, setLineWidth: function (width) {
    if (this._renderContext.lineWidth)this._renderContext.lineWidth(width)
}});
cc.HashElement = cc.Class.extend({actions: null, target: null, actionIndex: 0, currentAction: null, currentActionSalvaged: false, paused: false, hh: null, ctor: function () {
    this.actions = [];
    this.target = null;
    this.actionIndex = 0;
    this.currentAction = null;
    this.currentActionSalvaged = false;
    this.paused = false;
    this.hh = null
}});
cc.ActionManager = cc.Class.extend({_hashTargets: null, _arrayTargets: null, _currentTarget: null, _currentTargetSalvaged: false, _searchElementByTarget: function (arr, target) {
    for (var k = 0; k < arr.length; k++)if (target == arr[k].target)return arr[k];
    return null
}, ctor: function () {
    this._hashTargets = {};
    this._arrayTargets = [];
    this._currentTarget = null;
    this._currentTargetSalvaged = false
}, addAction: function (action, target, paused) {
    if (!action)throw"cc.ActionManager.addAction(): action must be non-null";
    if (!target)throw"cc.ActionManager.addAction(): action must be non-null";
    var element = this._hashTargets[target.__instanceId];
    if (!element) {
        element = new cc.HashElement;
        element.paused = paused;
        element.target = target;
        this._hashTargets[target.__instanceId] = element;
        this._arrayTargets.push(element)
    }
    this._actionAllocWithHashElement(element);
    element.actions.push(action);
    action.startWithTarget(target)
}, removeAllActions: function () {
    var locTargets = this._arrayTargets;
    for (var i = 0; i < locTargets.length; i++) {
        var element = locTargets[i];
        if (element)this.removeAllActionsFromTarget(element.target,
            true)
    }
}, removeAllActionsFromTarget: function (target, forceDelete) {
    if (target == null)return;
    var element = this._hashTargets[target.__instanceId];
    if (element) {
        if (element.actions.indexOf(element.currentAction) !== -1 && !element.currentActionSalvaged)element.currentActionSalvaged = true;
        element.actions.length = 0;
        if (this._currentTarget == element && !forceDelete)this._currentTargetSalvaged = true; else this._deleteHashElement(element)
    }
}, removeAction: function (action) {
    if (action == null)return;
    var target = action.getOriginalTarget();
    var element = this._hashTargets[target.__instanceId];
    if (element)for (var i = 0; i < element.actions.length; i++) {
        if (element.actions[i] == action) {
            element.actions.splice(i, 1);
            break
        }
    } else cc.log(cc._LogInfos.ActionManager_removeAction)
}, removeActionByTag: function (tag, target) {
    if (tag == cc.ACTION_TAG_INVALID)cc.log(cc._LogInfos.ActionManager_addAction);
    cc.assert(target, cc._LogInfos.ActionManager_addAction);
    var element = this._hashTargets[target.__instanceId];
    if (element) {
        var limit = element.actions.length;
        for (var i = 0; i <
            limit; ++i) {
            var action = element.actions[i];
            if (action && action.getTag() === tag && action.getOriginalTarget() == target) {
                this._removeActionAtIndex(i, element);
                break
            }
        }
    }
}, getActionByTag: function (tag, target) {
    if (tag == cc.ACTION_TAG_INVALID)cc.log(cc._LogInfos.ActionManager_getActionByTag);
    var element = this._hashTargets[target.__instanceId];
    if (element) {
        if (element.actions != null)for (var i = 0; i < element.actions.length; ++i) {
            var action = element.actions[i];
            if (action && action.getTag() === tag)return action
        }
        cc.log(cc._LogInfos.ActionManager_getActionByTag_2,
            tag)
    }
    return null
}, numberOfRunningActionsInTarget: function (target) {
    var element = this._hashTargets[target.__instanceId];
    if (element)return element.actions ? element.actions.length : 0;
    return 0
}, pauseTarget: function (target) {
    var element = this._hashTargets[target.__instanceId];
    if (element)element.paused = true
}, resumeTarget: function (target) {
    var element = this._hashTargets[target.__instanceId];
    if (element)element.paused = false
}, pauseAllRunningActions: function () {
    var idsWithActions = [];
    var locTargets = this._arrayTargets;
    for (var i = 0; i < locTargets.length; i++) {
        var element = locTargets[i];
        if (element && !element.paused) {
            element.paused = true;
            idsWithActions.push(element.target)
        }
    }
    return idsWithActions
}, resumeTargets: function (targetsToResume) {
    if (!targetsToResume)return;
    for (var i = 0; i < targetsToResume.length; i++)if (targetsToResume[i])this.resumeTarget(targetsToResume[i])
}, purgeSharedManager: function () {
    cc.director.getScheduler().unscheduleUpdateForTarget(this)
}, _removeActionAtIndex: function (index, element) {
    var action = element.actions[index];
    if (action == element.currentAction && !element.currentActionSalvaged)element.currentActionSalvaged = true;
    element.actions.splice(index, 1);
    if (element.actionIndex >= index)element.actionIndex--;
    if (element.actions.length == 0)if (this._currentTarget == element)this._currentTargetSalvaged = true; else this._deleteHashElement(element)
}, _deleteHashElement: function (element) {
    if (element) {
        delete this._hashTargets[element.target.__instanceId];
        cc.arrayRemoveObject(this._arrayTargets, element);
        element.actions = null;
        element.target =
            null
    }
}, _actionAllocWithHashElement: function (element) {
    if (element.actions == null)element.actions = []
}, update: function (dt) {
    var locTargets = this._arrayTargets, locCurrTarget;
    for (var elt = 0; elt < locTargets.length; elt++) {
        this._currentTarget = locTargets[elt];
        locCurrTarget = this._currentTarget;
        if (!locCurrTarget.paused)for (locCurrTarget.actionIndex = 0; locCurrTarget.actionIndex < locCurrTarget.actions.length; locCurrTarget.actionIndex++) {
            locCurrTarget.currentAction = locCurrTarget.actions[locCurrTarget.actionIndex];
            if (!locCurrTarget.currentAction)continue;
            locCurrTarget.currentActionSalvaged = false;
            locCurrTarget.currentAction.step(dt);
            if (locCurrTarget.currentActionSalvaged)locCurrTarget.currentAction = null; else if (locCurrTarget.currentAction.isDone()) {
                locCurrTarget.currentAction.stop();
                var action = locCurrTarget.currentAction;
                locCurrTarget.currentAction = null;
                this.removeAction(action)
            }
            locCurrTarget.currentAction = null
        }
        if (this._currentTargetSalvaged && locCurrTarget.actions.length === 0)this._deleteHashElement(locCurrTarget)
    }
}});