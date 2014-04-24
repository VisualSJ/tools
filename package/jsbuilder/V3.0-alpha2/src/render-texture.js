cc.IMAGE_FORMAT_JPEG = 0;
cc.IMAGE_FORMAT_PNG = 1;
cc.IMAGE_FORMAT_RAWDATA = 2;
cc.NextPOT = function (x) {
    x = x - 1;
    x = x | x >> 1;
    x = x | x >> 2;
    x = x | x >> 4;
    x = x | x >> 8;
    x = x | x >> 16;
    return x + 1
};
cc.RenderTexture = cc.Node.extend({sprite: null, clearFlags: 0, clearDepthVal: 0, autoDraw: false, _cacheCanvas: null, _cacheContext: null, _fBO: 0, _depthRenderBuffer: 0, _oldFBO: 0, _texture: null, _textureCopy: null, _uITextureImage: null, _pixelFormat: cc.Texture2D.PIXEL_FORMAT_RGBA8888, _clearColor: null, clearStencilVal: 0, _clearColorStr: null, _className: "RenderTexture", ctor: null, _ctorForCanvas: function (width, height, format, depthStencilFormat) {
    cc.Node.prototype.ctor.call(this);
    this._clearColor = cc.color(255, 255, 255, 255);
    this._clearColorStr =
        "rgba(255,255,255,1)";
    this._cacheCanvas = cc.newElement("canvas");
    this._cacheContext = this._cacheCanvas.getContext("2d");
    this.anchorX = 0;
    this.anchorY = 0;
    if (width !== undefined && height !== undefined) {
        format = format || cc.Texture2D.PIXEL_FORMAT_RGBA8888;
        depthStencilFormat = depthStencilFormat || 0;
        this.initWithWidthAndHeight(width, height, format, depthStencilFormat)
    }
}, _ctorForWebGL: function (width, height, format, depthStencilFormat) {
    cc.Node.prototype.ctor.call(this);
    this._clearColor = cc.color(0, 0, 0, 0);
    if (width !== undefined &&
        height !== undefined) {
        format = format || cc.Texture2D.PIXEL_FORMAT_RGBA8888;
        depthStencilFormat = depthStencilFormat || 0;
        this.initWithWidthAndHeight(width, height, format, depthStencilFormat)
    }
}, cleanup: null, _cleanupForCanvas: function () {
    cc.Node.prototype.onExit.call(this);
    this._cacheContext = null;
    this._cacheCanvas = null
}, _cleanupForWebGL: function () {
    cc.Node.prototype.onExit.call(this);
    this._textureCopy = null;
    var gl = cc._renderContext;
    gl.deleteFramebuffer(this._fBO);
    if (this._depthRenderBuffer)gl.deleteRenderbuffer(this._depthRenderBuffer);
    this._uITextureImage = null
}, getSprite: function () {
    return this.sprite
}, setSprite: function (sprite) {
    this.sprite = sprite
}, initWithWidthAndHeight: null, _initWithWidthAndHeightForCanvas: function (width, height, format, depthStencilFormat) {
    var locCacheCanvas = this._cacheCanvas, locScaleFactor = cc.contentScaleFactor();
    locCacheCanvas.width = 0 | width * locScaleFactor;
    locCacheCanvas.height = 0 | height * locScaleFactor;
    this._cacheContext.translate(0, locCacheCanvas.height);
    var texture = new cc.Texture2D;
    texture.initWithElement(locCacheCanvas);
    texture.handleLoadedTexture();
    this.sprite = cc.Sprite.create(texture);
    return true
}, _initWithWidthAndHeightForWebGL: function (width, height, format, depthStencilFormat) {
    if (format == cc.Texture2D.PIXEL_FORMAT_A8)cc.log("cc.RenderTexture._initWithWidthAndHeightForWebGL() : only RGB and RGBA formats are valid for a render texture;");
    var gl = cc._renderContext, locScaleFactor = cc.contentScaleFactor();
    width = 0 | width * locScaleFactor;
    height = 0 | height * locScaleFactor;
    this._oldFBO = gl.getParameter(gl.FRAMEBUFFER_BINDING);
    var powW,
        powH;
    if (cc.configuration.supportsNPOT()) {
        powW = width;
        powH = height
    } else {
        powW = cc.NextPOT(width);
        powH = cc.NextPOT(height)
    }
    var dataLen = powW * powH * 4;
    var data = new Uint8Array(dataLen);
    for (var i = 0; i < powW * powH * 4; i++)data[i] = 0;
    this._pixelFormat = format;
    this._texture = new cc.Texture2D;
    if (!this._texture)return false;
    var locTexture = this._texture;
    locTexture.initWithData(data, this._pixelFormat, powW, powH, cc.size(width, height));
    var oldRBO = gl.getParameter(gl.RENDERBUFFER_BINDING);
    if (cc.configuration.checkForGLExtension("GL_QCOM")) {
        this._textureCopy =
            new cc.Texture2D;
        if (!this._textureCopy)return false;
        this._textureCopy.initWithData(data, this._pixelFormat, powW, powH, cc.size(width, height))
    }
    this._fBO = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._fBO);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, locTexture._webTextureObj, 0);
    if (depthStencilFormat != 0) {
        this._depthRenderBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this._depthRenderBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, depthStencilFormat,
            powW, powH);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._depthRenderBuffer)
    }
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE)cc.log("Could not attach texture to the framebuffer");
    locTexture.setAliasTexParameters();
    this.sprite = cc.Sprite.create(locTexture);
    var locSprite = this.sprite;
    locSprite.scaleY = -1;
    locSprite.setBlendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.bindRenderbuffer(gl.RENDERBUFFER, oldRBO);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._oldFBO);
    this.autoDraw = false;
    this.addChild(locSprite);
    return true
}, begin: null, _beginForCanvas: function () {
    cc._renderContext = this._cacheContext;
    cc.view._setScaleXYForRenderTexture()
}, _beginForWebGL: function () {
    cc.kmGLMatrixMode(cc.KM_GL_PROJECTION);
    cc.kmGLPushMatrix();
    cc.kmGLMatrixMode(cc.KM_GL_MODELVIEW);
    cc.kmGLPushMatrix();
    var director = cc.director;
    director.setProjection(director.getProjection());
    var texSize = this._texture.getContentSizeInPixels();
    var size = cc.director.getWinSizeInPixels();
    var widthRatio = size.width /
        texSize.width;
    var heightRatio = size.height / texSize.height;
    var gl = cc._renderContext;
    gl.viewport(0, 0, texSize.width, texSize.height);
    var orthoMatrix = new cc.kmMat4;
    cc.kmMat4OrthographicProjection(orthoMatrix, -1 / widthRatio, 1 / widthRatio, -1 / heightRatio, 1 / heightRatio, -1, 1);
    cc.kmGLMultMatrix(orthoMatrix);
    this._oldFBO = gl.getParameter(gl.FRAMEBUFFER_BINDING);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._fBO);
    if (cc.configuration.checkForGLExtension("GL_QCOM")) {
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
            gl.TEXTURE_2D, this._textureCopy._webTextureObj, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture._webTextureObj, 0)
    }
}, beginWithClear: function (r, g, b, a, depthValue, stencilValue) {
    var gl = cc._renderContext;
    depthValue = depthValue || gl.COLOR_BUFFER_BIT;
    stencilValue = stencilValue || gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;
    this._beginWithClear(r, g, b, a, depthValue, stencilValue, gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT)
},
    _beginWithClear: null, _beginWithClearForCanvas: function (r, g, b, a, depthValue, stencilValue, flags) {
        this.begin();
        r = r || 0;
        g = g || 0;
        b = b || 0;
        a = isNaN(a) ? 1 : a;
        var context = this._cacheContext;
        var locCanvas = this._cacheCanvas;
        context.save();
        context.fillStyle = "rgba(" + (0 | r) + "," + (0 | g) + "," + (0 | b) + "," + a / 255 + ")";
        context.clearRect(0, 0, locCanvas.width, -locCanvas.height);
        context.fillRect(0, 0, locCanvas.width, -locCanvas.height);
        context.restore()
    }, _beginWithClearForWebGL: function (r, g, b, a, depthValue, stencilValue, flags) {
        this.begin();
        var gl = cc._renderContext;
        var clearColor = [0, 0, 0, 0];
        var depthClearValue = 0;
        var stencilClearValue = 0;
        if (flags & gl.COLOR_BUFFER_BIT) {
            clearColor = gl.getParameter(gl.COLOR_CLEAR_VALUE);
            gl.clearColor(r, g, b, a)
        }
        if (flags & gl.DEPTH_BUFFER_BIT) {
            depthClearValue = gl.getParameter(gl.DEPTH_CLEAR_VALUE);
            gl.clearDepth(depthValue)
        }
        if (flags & gl.STENCIL_BUFFER_BIT) {
            stencilClearValue = gl.getParameter(gl.STENCIL_CLEAR_VALUE);
            gl.clearStencil(stencilValue)
        }
        gl.clear(flags);
        if (flags & gl.COLOR_BUFFER_BIT)gl.clearColor(clearColor[0],
            clearColor[1], clearColor[2], clearColor[3]);
        if (flags & gl.DEPTH_BUFFER_BIT)gl.clearDepth(depthClearValue);
        if (flags & gl.STENCIL_BUFFER_BIT)gl.clearStencil(stencilClearValue)
    }, end: null, _endForCanvas: function () {
        cc._renderContext = cc._mainRenderContextBackup;
        cc.view._resetScale()
    }, _endForWebGL: function () {
        var gl = cc._renderContext;
        var director = cc.director;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._oldFBO);
        director.setViewport();
        cc.kmGLMatrixMode(cc.KM_GL_PROJECTION);
        cc.kmGLPopMatrix();
        cc.kmGLMatrixMode(cc.KM_GL_MODELVIEW);
        cc.kmGLPopMatrix()
    }, clear: function (r, g, b, a) {
        this.beginWithClear(r, g, b, a);
        this.end()
    }, clearRect: null, _clearRectForCanvas: function (x, y, width, height) {
        this._cacheContext.clearRect(x, y, width, -height)
    }, _clearRectForWebGL: function (x, y, width, height) {
    }, clearDepth: null, _clearDepthForCanvas: function (depthValue) {
        cc.log("clearDepth isn't supported on Cocos2d-Html5")
    }, _clearDepthForWebGL: function (depthValue) {
        this.begin();
        var gl = cc._renderContext;
        var depthClearValue = gl.getParameter(gl.DEPTH_CLEAR_VALUE);
        gl.clearDepth(depthValue);
        gl.clear(gl.DEPTH_BUFFER_BIT);
        gl.clearDepth(depthClearValue);
        this.end()
    }, clearStencil: null, _clearStencilForCanvas: function (stencilValue) {
        cc.log("clearDepth isn't supported on Cocos2d-Html5")
    }, _clearStencilForWebGL: function (stencilValue) {
        var gl = cc._renderContext;
        var stencilClearValue = gl.getParameter(gl.STENCIL_CLEAR_VALUE);
        gl.clearStencil(stencilValue);
        gl.clear(gl.STENCIL_BUFFER_BIT);
        gl.clearStencil(stencilClearValue)
    }, visit: null, _visitForCanvas: function (ctx) {
        if (!this._visible)return;
        ctx = ctx || cc._renderContext;
        ctx.save();
        this.draw(ctx);
        this.transform(ctx);
        this.sprite.visit();
        ctx.restore();
        this.arrivalOrder = 0
    }, _visitForWebGL: function (ctx) {
        if (!this._visible)return;
        cc.kmGLPushMatrix();
        var locGrid = this.grid;
        if (locGrid && locGrid.isActive()) {
            locGrid.beforeDraw();
            this.transformAncestors()
        }
        this.transform(ctx);
        this.sprite.visit();
        this.draw(ctx);
        if (locGrid && locGrid.isActive())locGrid.afterDraw(this);
        cc.kmGLPopMatrix();
        this.arrivalOrder = 0
    }, draw: null, _drawForCanvas: function (ctx) {
        ctx = ctx || cc._renderContext;
        if (this.autoDraw) {
            this.begin();
            if (this.clearFlags) {
                var locCanvas = this._cacheCanvas;
                ctx.save();
                ctx.fillStyle = this._clearColorStr;
                ctx.clearRect(0, 0, locCanvas.width, -locCanvas.height);
                ctx.fillRect(0, 0, locCanvas.width, -locCanvas.height);
                ctx.restore()
            }
            this.sortAllChildren();
            var locChildren = this._children;
            var childrenLen = locChildren.length;
            var selfSprite = this.sprite;
            for (var i = 0; i < childrenLen; i++) {
                var getChild = locChildren[i];
                if (getChild != selfSprite)getChild.visit()
            }
            this.end()
        }
    }, _drawForWebGL: function (ctx) {
        var gl = cc._renderContext;
        if (this.autoDraw) {
            this.begin();
            var locClearFlags = this.clearFlags;
            if (locClearFlags) {
                var oldClearColor = [0, 0, 0, 0];
                var oldDepthClearValue = 0;
                var oldStencilClearValue = 0;
                if (locClearFlags & gl.COLOR_BUFFER_BIT) {
                    oldClearColor = gl.getParameter(gl.COLOR_CLEAR_VALUE);
                    gl.clearColor(this._clearColor.r / 255, this._clearColor.g / 255, this._clearColor.b / 255, this._clearColor.a / 255)
                }
                if (locClearFlags & gl.DEPTH_BUFFER_BIT) {
                    oldDepthClearValue = gl.getParameter(gl.DEPTH_CLEAR_VALUE);
                    gl.clearDepth(this.clearDepthVal)
                }
                if (locClearFlags & gl.STENCIL_BUFFER_BIT) {
                    oldStencilClearValue =
                        gl.getParameter(gl.STENCIL_CLEAR_VALUE);
                    gl.clearStencil(this.clearStencilVal)
                }
                gl.clear(locClearFlags);
                if (locClearFlags & gl.COLOR_BUFFER_BIT)gl.clearColor(oldClearColor[0], oldClearColor[1], oldClearColor[2], oldClearColor[3]);
                if (locClearFlags & gl.DEPTH_BUFFER_BIT)gl.clearDepth(oldDepthClearValue);
                if (locClearFlags & gl.STENCIL_BUFFER_BIT)gl.clearStencil(oldStencilClearValue)
            }
            this.sortAllChildren();
            var locChildren = this._children;
            for (var i = 0; i < locChildren.length; i++) {
                var getChild = locChildren[i];
                if (getChild !=
                    this.sprite)getChild.visit()
            }
            this.end()
        }
    }, newCCImage: function (flipImage) {
        cc.log("saveToFile isn't supported on cocos2d-html5");
        return null
    }, _memcpy: function (destArr, destIndex, srcArr, srcIndex, size) {
        for (var i = 0; i < size; i++)destArr[destIndex + i] = srcArr[srcIndex + i]
    }, saveToFile: function (filePath, format) {
        cc.log("saveToFile isn't supported on Cocos2d-Html5")
    }, listenToBackground: function (obj) {
        cc.log("listenToBackground isn't supported on Cocos2d-Html5")
    }, listenToForeground: function (obj) {
        cc.log("listenToForeground isn't supported on Cocos2d-Html5")
    },
    getClearFlags: function () {
        return this.clearFlags
    }, setClearFlags: function (clearFlags) {
        this.clearFlags = clearFlags
    }, getClearColor: function () {
        return this._clearColor
    }, setClearColor: null, _setClearColorForCanvas: function (clearColor) {
        var locClearColor = this._clearColor;
        locClearColor.r = clearColor.r;
        locClearColor.g = clearColor.g;
        locClearColor.b = clearColor.b;
        locClearColor.a = clearColor.a;
        this._clearColorStr = "rgba(" + (0 | clearColor.r) + "," + (0 | clearColor.g) + "," + (0 | clearColor.b) + "," + clearColor.a / 255 + ")"
    }, _setClearColorForWebGL: function (clearColor) {
        var locClearColor =
            this._clearColor;
        locClearColor.r = clearColor.r;
        locClearColor.g = clearColor.g;
        locClearColor.b = clearColor.b;
        locClearColor.a = clearColor.a
    }, getClearDepth: function () {
        return this.clearDepthVal
    }, setClearDepth: function (clearDepth) {
        this.clearDepthVal = clearDepth
    }, getClearStencil: function () {
        return this.clearStencilVal
    }, setClearStencil: function (clearStencil) {
        this.clearStencilVal = clearStencil
    }, isAutoDraw: function () {
        return this.autoDraw
    }, setAutoDraw: function (autoDraw) {
        this.autoDraw = autoDraw
    }});
var _p = cc.RenderTexture.prototype;
if (cc._renderType == cc._RENDER_TYPE_WEBGL) {
    _p.ctor = _p._ctorForWebGL;
    _p.cleanup = _p._cleanupForWebGL;
    _p.initWithWidthAndHeight = _p._initWithWidthAndHeightForWebGL;
    _p.begin = _p._beginForWebGL;
    _p._beginWithClear = _p._beginWithClearForWebGL;
    _p.end = _p._endForWebGL;
    _p.clearRect = _p._clearRectForWebGL;
    _p.clearDepth = _p._clearDepthForWebGL;
    _p.clearStencil = _p._clearStencilForWebGL;
    _p.visit = _p._visitForWebGL;
    _p.draw = _p._drawForWebGL;
    _p.setClearColor = _p._setClearColorForWebGL
} else {
    _p.ctor = _p._ctorForCanvas;
    _p.cleanup =
        _p._cleanupForCanvas;
    _p.initWithWidthAndHeight = _p._initWithWidthAndHeightForCanvas;
    _p.begin = _p._beginForCanvas;
    _p._beginWithClear = _p._beginWithClearForCanvas;
    _p.end = _p._endForCanvas;
    _p.clearRect = _p._clearRectForCanvas;
    _p.clearDepth = _p._clearDepthForCanvas;
    _p.clearStencil = _p._clearStencilForCanvas;
    _p.visit = _p._visitForCanvas;
    _p.draw = _p._drawForCanvas;
    _p.setClearColor = _p._setClearColorForCanvas
}
_p.clearColorVal;
cc.defineGetterSetter(_p, "clearColorVal", _p.getClearColor, _p.setClearColor);
cc.RenderTexture.create = function (width, height, format, depthStencilFormat) {
    return new cc.RenderTexture(width, height, format, depthStencilFormat)
};