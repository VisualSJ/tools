cc.ProgressTimer = cc.NodeRGBA.extend({_type: null, _percentage: 0, _sprite: null, _midPoint: null, _barChangeRate: null, _reverseDirection: false, _className: "ProgressTimer", getMidpoint: function () {
    return cc.p(this._midPoint.x, this._midPoint.y)
}, setMidpoint: function (mpoint) {
    this._midPoint = cc.pClamp(mpoint, cc.p(0, 0), cc.p(1, 1))
}, getBarChangeRate: function () {
    return cc.p(this._barChangeRate.x, this._barChangeRate.y)
}, setBarChangeRate: function (barChangeRate) {
    this._barChangeRate = cc.pClamp(barChangeRate, cc.p(0, 0), cc.p(1,
        1))
}, getType: function () {
    return this._type
}, getPercentage: function () {
    return this._percentage
}, getSprite: function () {
    return this._sprite
}, setPercentage: function (percentage) {
    if (this._percentage != percentage) {
        this._percentage = cc.clampf(percentage, 0, 100);
        this._updateProgress()
    }
}, setOpacityModifyRGB: function (bValue) {
}, isOpacityModifyRGB: function () {
    return false
}, isReverseDirection: function () {
    return this._reverseDirection
}, _boundaryTexCoord: function (index) {
    if (index < cc.ProgressTimer.TEXTURE_COORDS_COUNT) {
        var locProTextCoords =
            cc.ProgressTimer.TEXTURE_COORDS;
        if (this._reverseDirection)return cc.p(locProTextCoords >> 7 - (index << 1) & 1, locProTextCoords >> 7 - ((index << 1) + 1) & 1); else return cc.p(locProTextCoords >> (index << 1) + 1 & 1, locProTextCoords >> (index << 1) & 1)
    }
    return cc.p(0, 0)
}, _origin: null, _startAngle: 270, _endAngle: 270, _radius: 0, _counterClockWise: false, _barRect: null, _vertexDataCount: 0, _vertexData: null, _vertexArrayBuffer: null, _vertexWebGLBuffer: null, _vertexDataDirty: false, ctor: null, _ctorForCanvas: function () {
    cc.NodeRGBA.prototype.ctor.call(this);
    this._type = cc.ProgressTimer.TYPE_RADIAL;
    this._percentage = 0;
    this._midPoint = cc.p(0, 0);
    this._barChangeRate = cc.p(0, 0);
    this._reverseDirection = false;
    this._sprite = null;
    this._origin = cc.p(0, 0);
    this._startAngle = 270;
    this._endAngle = 270;
    this._radius = 0;
    this._counterClockWise = false;
    this._barRect = cc.rect(0, 0, 0, 0)
}, _ctorForWebGL: function () {
    cc.NodeRGBA.prototype.ctor.call(this);
    this._type = cc.ProgressTimer.TYPE_RADIAL;
    this._percentage = 0;
    this._midPoint = cc.p(0, 0);
    this._barChangeRate = cc.p(0, 0);
    this._reverseDirection = false;
    this._sprite = null;
    this._vertexWebGLBuffer = cc._renderContext.createBuffer();
    this._vertexDataCount = 0;
    this._vertexData = null;
    this._vertexArrayBuffer = null;
    this._vertexDataDirty = false
}, setColor: function (color) {
    this._sprite.color = color;
    this._updateColor()
}, setOpacity: function (opacity) {
    this._sprite.opacity = opacity;
    this._updateColor()
}, getColor: function () {
    return this._sprite.color
}, getOpacity: function () {
    return this._sprite.opacity
}, setReverseProgress: null, _setReverseProgressForCanvas: function (reverse) {
    if (this._reverseDirection !==
        reverse)this._reverseDirection = reverse
}, _setReverseProgressForWebGL: function (reverse) {
    if (this._reverseDirection !== reverse) {
        this._reverseDirection = reverse;
        this._vertexData = null;
        this._vertexArrayBuffer = null;
        this._vertexDataCount = 0
    }
}, setSprite: null, _setSpriteForCanvas: function (sprite) {
    if (this._sprite != sprite) {
        this._sprite = sprite;
        this.width = this._sprite.width;
        this.height = this._sprite.height
    }
}, _setSpriteForWebGL: function (sprite) {
    if (sprite && this._sprite != sprite) {
        this._sprite = sprite;
        this.width = sprite.width;
        this.height = sprite.height;
        if (this._vertexData) {
            this._vertexData = null;
            this._vertexArrayBuffer = null;
            this._vertexDataCount = 0
        }
    }
}, setType: null, _setTypeForCanvas: function (type) {
    if (type !== this._type)this._type = type
}, _setTypeForWebGL: function (type) {
    if (type !== this._type) {
        if (this._vertexData) {
            this._vertexData = null;
            this._vertexArrayBuffer = null;
            this._vertexDataCount = 0
        }
        this._type = type
    }
}, setReverseDirection: null, _setReverseDirectionForCanvas: function (reverse) {
    if (this._reverseDirection !== reverse)this._reverseDirection =
        reverse
}, _setReverseDirectionForWebGL: function (reverse) {
    if (this._reverseDirection !== reverse) {
        this._reverseDirection = reverse;
        this._vertexData = null;
        this._vertexArrayBuffer = null;
        this._vertexDataCount = 0
    }
}, _textureCoordFromAlphaPoint: function (alpha) {
    var locSprite = this._sprite;
    if (!locSprite)return{u: 0, v: 0};
    var quad = locSprite.quad;
    var min = cc.p(quad.bl.texCoords.u, quad.bl.texCoords.v);
    var max = cc.p(quad.tr.texCoords.u, quad.tr.texCoords.v);
    if (locSprite.textureRectRotated) {
        var temp = alpha.x;
        alpha.x = alpha.y;
        alpha.y =
            temp
    }
    return{u: min.x * (1 - alpha.x) + max.x * alpha.x, v: min.y * (1 - alpha.y) + max.y * alpha.y}
}, _vertexFromAlphaPoint: function (alpha) {
    if (!this._sprite)return{x: 0, y: 0};
    var quad = this._sprite.quad;
    var min = cc.p(quad.bl.vertices.x, quad.bl.vertices.y);
    var max = cc.p(quad.tr.vertices.x, quad.tr.vertices.y);
    return{x: min.x * (1 - alpha.x) + max.x * alpha.x, y: min.y * (1 - alpha.y) + max.y * alpha.y}
}, initWithSprite: null, _initWithSpriteForCanvas: function (sprite) {
    this.percentage = 0;
    this.anchorX = 0.5;
    this.anchorY = 0.5;
    this._type = cc.ProgressTimer.TYPE_RADIAL;
    this._reverseDirection = false;
    this.midPoint = cc.p(0.5, 0.5);
    this.barChangeRate = cc.p(1, 1);
    this.sprite = sprite;
    return true
}, _initWithSpriteForWebGL: function (sprite) {
    this.percentage = 0;
    this._vertexData = null;
    this._vertexArrayBuffer = null;
    this._vertexDataCount = 0;
    this.anchorX = 0.5;
    this.anchorY = 0.5;
    this._type = cc.ProgressTimer.TYPE_RADIAL;
    this._reverseDirection = false;
    this.midPoint = cc.p(0.5, 0.5);
    this.barChangeRate = cc.p(1, 1);
    this.sprite = sprite;
    this.shaderProgram = cc.shaderCache.programForKey(cc.SHADER_POSITION_TEXTURECOLOR);
    return true
}, draw: null, _drawForCanvas: function (ctx) {
    var context = ctx || cc._renderContext;
    var locSprite = this._sprite;
    if (locSprite._isLighterMode)context.globalCompositeOperation = "lighter";
    var locEGL_ScaleX = cc.view.getScaleX(), locEGL_ScaleY = cc.view.getScaleY();
    context.globalAlpha = locSprite._displayedOpacity / 255;
    var locRect = locSprite._rect, locContentSize = locSprite._contentSize, locOffsetPosition = locSprite._offsetPosition, locDrawSizeCanvas = locSprite._drawSize_Canvas;
    var flipXOffset = 0 | locOffsetPosition.x,
        flipYOffset = -locOffsetPosition.y - locRect.height, locTextureCoord = locSprite._textureRect_Canvas;
    locDrawSizeCanvas.width = locRect.width * locEGL_ScaleX;
    locDrawSizeCanvas.height = locRect.height * locEGL_ScaleY;
    context.save();
    if (locSprite._flippedX) {
        flipXOffset = -locOffsetPosition.x - locRect.width;
        context.scale(-1, 1)
    }
    if (locSprite._flippedY) {
        flipYOffset = locOffsetPosition.y;
        context.scale(1, -1)
    }
    flipXOffset *= locEGL_ScaleX;
    flipYOffset *= locEGL_ScaleY;
    if (this._type == cc.ProgressTimer.TYPE_BAR) {
        var locBarRect = this._barRect;
        context.beginPath();
        context.rect(locBarRect.x * locEGL_ScaleX, locBarRect.y * locEGL_ScaleY, locBarRect.width * locEGL_ScaleX, locBarRect.height * locEGL_ScaleY);
        context.clip();
        context.closePath()
    } else if (this._type == cc.ProgressTimer.TYPE_RADIAL) {
        var locOriginX = this._origin.x * locEGL_ScaleX;
        var locOriginY = this._origin.y * locEGL_ScaleY;
        context.beginPath();
        context.arc(locOriginX, locOriginY, this._radius * locEGL_ScaleY, Math.PI / 180 * this._startAngle, Math.PI / 180 * this._endAngle, this._counterClockWise);
        context.lineTo(locOriginX,
            locOriginY);
        context.clip();
        context.closePath()
    }
    if (locSprite._texture && locTextureCoord.validRect) {
        var image = locSprite._texture.getHtmlElementObj();
        if (this._colorized)context.drawImage(image, 0, 0, locTextureCoord.width, locTextureCoord.height, flipXOffset, flipYOffset, locDrawSizeCanvas.width, locDrawSizeCanvas.height); else context.drawImage(image, locTextureCoord.x, locTextureCoord.y, locTextureCoord.width, locTextureCoord.height, flipXOffset, flipYOffset, locDrawSizeCanvas.width, locDrawSizeCanvas.height)
    } else if (locContentSize.width !==
        0) {
        var curColor = this.color;
        context.fillStyle = "rgba(" + curColor.r + "," + curColor.g + "," + curColor.b + ",1)";
        context.fillRect(flipXOffset, flipYOffset, locContentSize.width * locEGL_ScaleX, locContentSize.height * locEGL_ScaleY)
    }
    context.restore();
    cc.incrementGLDraws(1)
}, _drawForWebGL: function (ctx) {
    var context = ctx || cc._renderContext;
    if (!this._vertexData || !this._sprite)return;
    cc.nodeDrawSetup(this);
    var blendFunc = this._sprite.getBlendFunc();
    cc.glBlendFunc(blendFunc.src, blendFunc.dst);
    cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POS_COLOR_TEX);
    cc.glBindTexture2D(this._sprite.texture);
    context.bindBuffer(context.ARRAY_BUFFER, this._vertexWebGLBuffer);
    if (this._vertexDataDirty) {
        context.bufferData(context.ARRAY_BUFFER, this._vertexArrayBuffer, context.DYNAMIC_DRAW);
        this._vertexDataDirty = false
    }
    var locVertexDataLen = cc.V2F_C4B_T2F.BYTES_PER_ELEMENT;
    context.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, context.FLOAT, false, locVertexDataLen, 0);
    context.vertexAttribPointer(cc.VERTEX_ATTRIB_COLOR, 4, context.UNSIGNED_BYTE, true, locVertexDataLen, 8);
    context.vertexAttribPointer(cc.VERTEX_ATTRIB_TEX_COORDS,
        2, context.FLOAT, false, locVertexDataLen, 12);
    if (this._type === cc.ProgressTimer.TYPE_RADIAL)context.drawArrays(context.TRIANGLE_FAN, 0, this._vertexDataCount); else if (this._type == cc.ProgressTimer.TYPE_BAR)if (!this._reverseDirection)context.drawArrays(context.TRIANGLE_STRIP, 0, this._vertexDataCount); else {
        context.drawArrays(context.TRIANGLE_STRIP, 0, this._vertexDataCount / 2);
        context.drawArrays(context.TRIANGLE_STRIP, 4, this._vertexDataCount / 2);
        cc.g_NumberOfDraws++
    }
    cc.g_NumberOfDraws++
}, _updateRadial: function () {
    if (!this._sprite)return;
    var i, locMidPoint = this._midPoint;
    var alpha = this._percentage / 100;
    var angle = 2 * cc.PI * (this._reverseDirection ? alpha : 1 - alpha);
    var topMid = cc.p(locMidPoint.x, 1);
    var percentagePt = cc.pRotateByAngle(topMid, locMidPoint, angle);
    var index = 0;
    var hit;
    if (alpha == 0) {
        hit = topMid;
        index = 0
    } else if (alpha == 1) {
        hit = topMid;
        index = 4
    } else {
        var min_t = cc.FLT_MAX;
        var locProTextCoordsCount = cc.ProgressTimer.TEXTURE_COORDS_COUNT;
        for (i = 0; i <= locProTextCoordsCount; ++i) {
            var pIndex = (i + (locProTextCoordsCount - 1)) % locProTextCoordsCount;
            var edgePtA =
                this._boundaryTexCoord(i % locProTextCoordsCount);
            var edgePtB = this._boundaryTexCoord(pIndex);
            if (i == 0)edgePtB = cc.pLerp(edgePtA, edgePtB, 1 - locMidPoint.x); else if (i == 4)edgePtA = cc.pLerp(edgePtA, edgePtB, 1 - locMidPoint.x);
            var retPoint = cc.p(0, 0);
            if (cc.pLineIntersect(edgePtA, edgePtB, locMidPoint, percentagePt, retPoint)) {
                if (i == 0 || i == 4)if (!(0 <= retPoint.x && retPoint.x <= 1))continue;
                if (retPoint.y >= 0)if (retPoint.y < min_t) {
                    min_t = retPoint.y;
                    index = i
                }
            }
        }
        hit = cc.pAdd(locMidPoint, cc.pMult(cc.pSub(percentagePt, locMidPoint), min_t))
    }
    var sameIndexCount =
        true;
    if (this._vertexDataCount != index + 3) {
        sameIndexCount = false;
        this._vertexData = null;
        this._vertexArrayBuffer = null;
        this._vertexDataCount = 0
    }
    if (!this._vertexData) {
        this._vertexDataCount = index + 3;
        var locCount = this._vertexDataCount, vertexDataLen = cc.V2F_C4B_T2F.BYTES_PER_ELEMENT;
        this._vertexArrayBuffer = new ArrayBuffer(locCount * vertexDataLen);
        var locData = [];
        for (i = 0; i < locCount; i++)locData[i] = new cc.V2F_C4B_T2F(null, null, null, this._vertexArrayBuffer, i * vertexDataLen);
        this._vertexData = locData;
        if (!this._vertexData) {
            cc.log("cc.ProgressTimer._updateRadial() : Not enough memory");
            return
        }
    }
    this._updateColor();
    var locVertexData = this._vertexData;
    if (!sameIndexCount) {
        locVertexData[0].texCoords = this._textureCoordFromAlphaPoint(locMidPoint);
        locVertexData[0].vertices = this._vertexFromAlphaPoint(locMidPoint);
        locVertexData[1].texCoords = this._textureCoordFromAlphaPoint(topMid);
        locVertexData[1].vertices = this._vertexFromAlphaPoint(topMid);
        for (i = 0; i < index; i++) {
            var alphaPoint = this._boundaryTexCoord(i);
            locVertexData[i + 2].texCoords = this._textureCoordFromAlphaPoint(alphaPoint);
            locVertexData[i +
                2].vertices = this._vertexFromAlphaPoint(alphaPoint)
        }
    }
    locVertexData[this._vertexDataCount - 1].texCoords = this._textureCoordFromAlphaPoint(hit);
    locVertexData[this._vertexDataCount - 1].vertices = this._vertexFromAlphaPoint(hit)
}, _updateBar: function () {
    if (!this._sprite)return;
    var i;
    var alpha = this._percentage / 100;
    var locBarChangeRate = this._barChangeRate;
    var alphaOffset = cc.pMult(cc.p(1 - locBarChangeRate.x + alpha * locBarChangeRate.x, 1 - locBarChangeRate.y + alpha * locBarChangeRate.y), 0.5);
    var min = cc.pSub(this._midPoint,
        alphaOffset);
    var max = cc.pAdd(this._midPoint, alphaOffset);
    if (min.x < 0) {
        max.x += -min.x;
        min.x = 0
    }
    if (max.x > 1) {
        min.x -= max.x - 1;
        max.x = 1
    }
    if (min.y < 0) {
        max.y += -min.y;
        min.y = 0
    }
    if (max.y > 1) {
        min.y -= max.y - 1;
        max.y = 1
    }
    var locVertexData;
    if (!this._reverseDirection) {
        if (!this._vertexData) {
            this._vertexDataCount = 4;
            var vertexDataLen = cc.V2F_C4B_T2F.BYTES_PER_ELEMENT, locCount = 4;
            this._vertexArrayBuffer = new ArrayBuffer(locCount * vertexDataLen);
            this._vertexData = [];
            for (i = 0; i < locCount; i++)this._vertexData[i] = new cc.V2F_C4B_T2F(null, null,
                null, this._vertexArrayBuffer, i * vertexDataLen)
        }
        locVertexData = this._vertexData;
        locVertexData[0].texCoords = this._textureCoordFromAlphaPoint(cc.p(min.x, max.y));
        locVertexData[0].vertices = this._vertexFromAlphaPoint(cc.p(min.x, max.y));
        locVertexData[1].texCoords = this._textureCoordFromAlphaPoint(cc.p(min.x, min.y));
        locVertexData[1].vertices = this._vertexFromAlphaPoint(cc.p(min.x, min.y));
        locVertexData[2].texCoords = this._textureCoordFromAlphaPoint(cc.p(max.x, max.y));
        locVertexData[2].vertices = this._vertexFromAlphaPoint(cc.p(max.x,
            max.y));
        locVertexData[3].texCoords = this._textureCoordFromAlphaPoint(cc.p(max.x, min.y));
        locVertexData[3].vertices = this._vertexFromAlphaPoint(cc.p(max.x, min.y))
    } else {
        if (!this._vertexData) {
            this._vertexDataCount = 8;
            var rVertexDataLen = cc.V2F_C4B_T2F.BYTES_PER_ELEMENT, rLocCount = 8;
            this._vertexArrayBuffer = new ArrayBuffer(rLocCount * rVertexDataLen);
            var rTempData = [];
            for (i = 0; i < rLocCount; i++)rTempData[i] = new cc.V2F_C4B_T2F(null, null, null, this._vertexArrayBuffer, i * rVertexDataLen);
            rTempData[0].texCoords = this._textureCoordFromAlphaPoint(cc.p(0,
                1));
            rTempData[0].vertices = this._vertexFromAlphaPoint(cc.p(0, 1));
            rTempData[1].texCoords = this._textureCoordFromAlphaPoint(cc.p(0, 0));
            rTempData[1].vertices = this._vertexFromAlphaPoint(cc.p(0, 0));
            rTempData[6].texCoords = this._textureCoordFromAlphaPoint(cc.p(1, 1));
            rTempData[6].vertices = this._vertexFromAlphaPoint(cc.p(1, 1));
            rTempData[7].texCoords = this._textureCoordFromAlphaPoint(cc.p(1, 0));
            rTempData[7].vertices = this._vertexFromAlphaPoint(cc.p(1, 0));
            this._vertexData = rTempData
        }
        locVertexData = this._vertexData;
        locVertexData[2].texCoords = this._textureCoordFromAlphaPoint(cc.p(min.x, max.y));
        locVertexData[2].vertices = this._vertexFromAlphaPoint(cc.p(min.x, max.y));
        locVertexData[3].texCoords = this._textureCoordFromAlphaPoint(cc.p(min.x, min.y));
        locVertexData[3].vertices = this._vertexFromAlphaPoint(cc.p(min.x, min.y));
        locVertexData[4].texCoords = this._textureCoordFromAlphaPoint(cc.p(max.x, max.y));
        locVertexData[4].vertices = this._vertexFromAlphaPoint(cc.p(max.x, max.y));
        locVertexData[5].texCoords = this._textureCoordFromAlphaPoint(cc.p(max.x,
            min.y));
        locVertexData[5].vertices = this._vertexFromAlphaPoint(cc.p(max.x, min.y))
    }
    this._updateColor()
}, _updateColor: function () {
    if (!this._sprite || !this._vertexData)return;
    var sc = this._sprite.quad.tl.colors;
    var locVertexData = this._vertexData;
    for (var i = 0, len = this._vertexDataCount; i < len; ++i)locVertexData[i].colors = sc;
    this._vertexDataDirty = true
}, _updateProgress: null, _updateProgressForCanvas: function () {
    var locSprite = this._sprite;
    var sw = locSprite.width, sh = locSprite.height;
    var locMidPoint = this._midPoint;
    if (this._type ==
        cc.ProgressTimer.TYPE_RADIAL) {
        this._radius = Math.round(Math.sqrt(sw * sw + sh * sh));
        var locStartAngle, locEndAngle, locCounterClockWise = false, locOrigin = this._origin;
        locOrigin.x = sw * locMidPoint.x;
        locOrigin.y = -sh * locMidPoint.y;
        if (this._reverseDirection) {
            locEndAngle = 270;
            locStartAngle = 270 - 3.6 * this._percentage
        } else {
            locStartAngle = -90;
            locEndAngle = -90 + 3.6 * this._percentage
        }
        if (locSprite._flippedX) {
            locOrigin.x -= sw * this._midPoint.x * 2;
            locStartAngle = -locStartAngle;
            locEndAngle = -locEndAngle;
            locStartAngle -= 180;
            locEndAngle -=
                180;
            locCounterClockWise = !locCounterClockWise
        }
        if (locSprite._flippedY) {
            locOrigin.y += sh * this._midPoint.y * 2;
            locCounterClockWise = !locCounterClockWise;
            locStartAngle = -locStartAngle;
            locEndAngle = -locEndAngle
        }
        this._startAngle = locStartAngle;
        this._endAngle = locEndAngle;
        this._counterClockWise = locCounterClockWise
    } else {
        var locBarChangeRate = this._barChangeRate;
        var percentageF = this._percentage / 100;
        var locBarRect = this._barRect;
        var drawedSize = cc.size(sw * (1 - locBarChangeRate.x), sh * (1 - locBarChangeRate.y));
        var drawingSize =
            cc.size((sw - drawedSize.width) * percentageF, (sh - drawedSize.height) * percentageF);
        var currentDrawSize = cc.size(drawedSize.width + drawingSize.width, drawedSize.height + drawingSize.height);
        var startPoint = cc.p(sw * locMidPoint.x, sh * locMidPoint.y);
        var needToLeft = startPoint.x - currentDrawSize.width / 2;
        if (locMidPoint.x > 0.5)if (currentDrawSize.width / 2 >= sw - startPoint.x)needToLeft = sw - currentDrawSize.width;
        var needToTop = startPoint.y - currentDrawSize.height / 2;
        if (locMidPoint.y > 0.5)if (currentDrawSize.height / 2 >= sh - startPoint.y)needToTop =
            sh - currentDrawSize.height;
        locBarRect.x = 0;
        var flipXNeed = 1;
        if (locSprite._flippedX) {
            locBarRect.x -= currentDrawSize.width;
            flipXNeed = -1
        }
        if (needToLeft > 0)locBarRect.x += needToLeft * flipXNeed;
        locBarRect.y = 0;
        var flipYNeed = 1;
        if (locSprite._flippedY) {
            locBarRect.y += currentDrawSize.height;
            flipYNeed = -1
        }
        if (needToTop > 0)locBarRect.y -= needToTop * flipYNeed;
        locBarRect.width = currentDrawSize.width;
        locBarRect.height = -currentDrawSize.height
    }
}, _updateProgressForWebGL: function () {
    var locType = this._type;
    if (locType === cc.ProgressTimer.TYPE_RADIAL)this._updateRadial();
    else if (locType === cc.ProgressTimer.TYPE_BAR)this._updateBar();
    this._vertexDataDirty = true
}});
var _p = cc.ProgressTimer.prototype;
if (cc._renderType == cc._RENDER_TYPE_WEBGL) {
    _p.ctor = _p._ctorForWebGL;
    _p.setReverseProgress = _p._setReverseProgressForWebGL;
    _p.setSprite = _p._setSpriteForWebGL;
    _p.setType = _p._setTypeForWebGL;
    _p.setReverseDirection = _p._setReverseDirectionForWebGL;
    _p.initWithSprite = _p._initWithSpriteForWebGL;
    _p.draw = _p._drawForWebGL;
    _p._updateProgress = _p._updateProgressForWebGL
} else {
    _p.ctor = _p._ctorForCanvas;
    _p.setReverseProgress = _p._setReverseProgressForCanvas;
    _p.setSprite = _p._setSpriteForCanvas;
    _p.setType = _p._setTypeForCanvas;
    _p.setReverseDirection = _p._setReverseDirectionForCanvas;
    _p.initWithSprite = _p._initWithSpriteForCanvas;
    _p.draw = _p._drawForCanvas;
    _p._updateProgress = cc.ProgressTimer.prototype._updateProgressForCanvas
}
_p.midPoint;
cc.defineGetterSetter(_p, "midPoint", _p.getMidpoint, _p.setMidpoint);
_p.barChangeRate;
cc.defineGetterSetter(_p, "barChangeRate", _p.getBarChangeRate, _p.setBarChangeRate);
_p.type;
cc.defineGetterSetter(_p, "type", _p.getType, _p.setType);
_p.percentage;
cc.defineGetterSetter(_p, "percentage", _p.getPercentage, _p.setPercentage);
_p.sprite;
cc.defineGetterSetter(_p, "sprite", _p.getSprite, _p.setSprite);
_p.reverseDir;
cc.defineGetterSetter(_p, "reverseDir", _p.isReverseDirection, _p.setReverseDirection);
cc.ProgressTimer.create = function (sprite) {
    var progressTimer = new cc.ProgressTimer;
    if (progressTimer.initWithSprite(sprite))return progressTimer;
    return null
};
cc.ProgressTimer.TEXTURE_COORDS_COUNT = 4;
cc.ProgressTimer.TEXTURE_COORDS = 75;
cc.ProgressTimer.TYPE_RADIAL = 0;
cc.ProgressTimer.TYPE_BAR = 1;
cc.ProgressTo = cc.ActionInterval.extend({_to: 0, _from: 0, ctor: function (duration, percent) {
    cc.ActionInterval.prototype.ctor.call(this);
    this._to = 0;
    this._from = 0;
    percent !== undefined && this.initWithDuration(duration, percent)
}, initWithDuration: function (duration, percent) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
        this._to = percent;
        return true
    }
    return false
}, clone: function () {
    var action = new cc.ProgressTo;
    action.initWithDuration(this._duration, this._to);
    return action
}, reverse: function () {
    cc.log("cc.ProgressTo.reverse(): reverse hasn't been supported.");
    return null
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._from = target.percentage;
    if (this._from == 100)this._from = 0
}, update: function (time) {
    if (this.target instanceof cc.ProgressTimer)this.target.percentage = this._from + (this._to - this._from) * time
}});
cc.ProgressTo.create = function (duration, percent) {
    return new cc.ProgressTo(duration, percent)
};
cc.ProgressFromTo = cc.ActionInterval.extend({_to: 0, _from: 0, ctor: function (duration, fromPercentage, toPercentage) {
    cc.ActionInterval.prototype.ctor.call(this);
    this._to = 0;
    this._from = 0;
    toPercentage !== undefined && this.initWithDuration(duration, fromPercentage, toPercentage)
}, initWithDuration: function (duration, fromPercentage, toPercentage) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
        this._to = toPercentage;
        this._from = fromPercentage;
        return true
    }
    return false
}, clone: function () {
    var action = new cc.ProgressFromTo;
    action.initWithDuration(this._duration, this._from, this._to);
    return action
}, reverse: function () {
    return cc.ProgressFromTo.create(this._duration, this._to, this._from)
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target)
}, update: function (time) {
    if (this.target instanceof cc.ProgressTimer)this.target.percentage = this._from + (this._to - this._from) * time
}});
cc.ProgressFromTo.create = function (duration, fromPercentage, toPercentage) {
    return new cc.ProgressFromTo(duration, fromPercentage, toPercentage)
};