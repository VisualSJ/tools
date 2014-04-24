cc.LabelAtlas = cc.AtlasNode.extend({_string: null, _mapStartChar: null, _textureLoaded: false, _loadedEventListeners: null, _className: "LabelAtlas", ctor: function (strText, charMapFile, itemWidth, itemHeight, startCharMap) {
    cc.AtlasNode.prototype.ctor.call(this);
    charMapFile && cc.LabelAtlas.prototype.initWithString.call(this, strText, charMapFile, itemWidth, itemHeight, startCharMap)
}, textureLoaded: function () {
    return this._textureLoaded
}, addLoadedEventListener: function (callback, target) {
    if (!this._loadedEventListeners)this._loadedEventListeners =
        [];
    this._loadedEventListeners.push({eventCallback: callback, eventTarget: target})
}, _callLoadedEventCallbacks: function () {
    if (!this._loadedEventListeners)return;
    this._textureLoaded = true;
    var locListeners = this._loadedEventListeners;
    for (var i = 0, len = locListeners.length; i < len; i++) {
        var selCallback = locListeners[i];
        selCallback.eventCallback.call(selCallback.eventTarget, this)
    }
    locListeners.length = 0
}, initWithString: function (strText, charMapFile, itemWidth, itemHeight, startCharMap) {
    var label = strText + "", textureFilename,
        width, height, startChar;
    if (itemWidth === undefined) {
        var dict = cc.loader.getRes(charMapFile);
        if (parseInt(dict["version"], 10) !== 1) {
            cc.log("cc.LabelAtlas.initWithString(): Unsupported version. Upgrade cocos2d version");
            return false
        }
        textureFilename = cc.path.changeBasename(charMapFile, dict["textureFilename"]);
        var locScaleFactor = cc.contentScaleFactor();
        width = parseInt(dict["itemWidth"], 10) / locScaleFactor;
        height = parseInt(dict["itemHeight"], 10) / locScaleFactor;
        startChar = String.fromCharCode(parseInt(dict["firstChar"],
            10))
    } else {
        textureFilename = charMapFile;
        width = itemWidth || 0;
        height = itemHeight || 0;
        startChar = startCharMap || " "
    }
    var texture = null;
    if (textureFilename instanceof cc.Texture2D)texture = textureFilename; else texture = cc.textureCache.addImage(textureFilename);
    var locLoaded = texture.isLoaded();
    this._textureLoaded = locLoaded;
    if (!locLoaded)texture.addLoadedEventListener(function (sender) {
        this.initWithTexture(texture, width, height, label.length);
        this.string = label;
        this._callLoadedEventCallbacks()
    }, this);
    if (this.initWithTexture(texture,
        width, height, label.length)) {
        this._mapStartChar = startChar;
        this.string = label;
        return true
    }
    return false
}, setColor: function (color3) {
    cc.AtlasNode.prototype.setColor.call(this, color3);
    this.updateAtlasValues()
}, getString: function () {
    return this._string
}, draw: function (ctx) {
    cc.AtlasNode.prototype.draw.call(this, ctx);
    if (cc.LABELATLAS_DEBUG_DRAW) {
        var s = this.size;
        var vertices = [cc.p(0, 0), cc.p(s.width, 0), cc.p(s.width, s.height), cc.p(0, s.height)];
        cc._drawingUtil.drawPoly(vertices, 4, true)
    }
}, updateAtlasValues: null, _updateAtlasValuesForCanvas: function () {
    var locString =
        this._string;
    var n = locString.length;
    var texture = this.texture;
    var locItemWidth = this._itemWidth, locItemHeight = this._itemHeight;
    for (var i = 0; i < n; i++) {
        var a = locString.charCodeAt(i) - this._mapStartChar.charCodeAt(0);
        var row = parseInt(a % this._itemsPerRow, 10);
        var col = parseInt(a / this._itemsPerRow, 10);
        var rect = cc.rect(row * locItemWidth, col * locItemHeight, locItemWidth, locItemHeight);
        var c = locString.charCodeAt(i);
        var fontChar = this.getChildByTag(i);
        if (!fontChar) {
            fontChar = new cc.Sprite;
            if (c == 32) {
                fontChar.init();
                fontChar.setTextureRect(cc.rect(0,
                    0, 10, 10), false, cc.size(0, 0))
            } else fontChar.initWithTexture(texture, rect);
            this.addChild(fontChar, 0, i)
        } else if (c == 32) {
            fontChar.init();
            fontChar.setTextureRect(cc.rect(0, 0, 10, 10), false, cc.size(0, 0))
        } else {
            fontChar.initWithTexture(texture, rect);
            fontChar.visible = true;
            fontChar.opacity = this._displayedOpacity
        }
        fontChar.setPosition(i * locItemWidth + locItemWidth / 2, locItemHeight / 2)
    }
}, _updateAtlasValuesForWebGL: function () {
    var locString = this._string;
    var n = locString.length;
    var locTextureAtlas = this.textureAtlas;
    var texture =
        locTextureAtlas.texture;
    var textureWide = texture.pixelsWidth;
    var textureHigh = texture.pixelsHeight;
    var itemWidthInPixels = this._itemWidth;
    var itemHeightInPixels = this._itemHeight;
    if (!this._ignoreContentScaleFactor) {
        itemWidthInPixels = this._itemWidth * cc.contentScaleFactor();
        itemHeightInPixels = this._itemHeight * cc.contentScaleFactor()
    }
    if (n > locTextureAtlas.getCapacity())cc.log("cc.LabelAtlas._updateAtlasValues(): Invalid String length");
    var quads = locTextureAtlas.quads;
    var locDisplayedColor = this._displayedColor;
    var curColor = {r: locDisplayedColor.r, g: locDisplayedColor.g, b: locDisplayedColor.b, a: this._displayedOpacity};
    var locItemWidth = this._itemWidth;
    for (var i = 0; i < n; i++) {
        var a = locString.charCodeAt(i) - this._mapStartChar.charCodeAt(0);
        var row = a % this._itemsPerRow;
        var col = 0 | a / this._itemsPerRow;
        var left, right, top, bottom;
        if (cc.FIX_ARTIFACTS_BY_STRECHING_TEXEL) {
            left = (2 * row * itemWidthInPixels + 1) / (2 * textureWide);
            right = left + (itemWidthInPixels * 2 - 2) / (2 * textureWide);
            top = (2 * col * itemHeightInPixels + 1) / (2 * textureHigh);
            bottom =
                top + (itemHeightInPixels * 2 - 2) / (2 * textureHigh)
        } else {
            left = row * itemWidthInPixels / textureWide;
            right = left + itemWidthInPixels / textureWide;
            top = col * itemHeightInPixels / textureHigh;
            bottom = top + itemHeightInPixels / textureHigh
        }
        var quad = quads[i];
        var locQuadTL = quad.tl, locQuadTR = quad.tr, locQuadBL = quad.bl, locQuadBR = quad.br;
        locQuadTL.texCoords.u = left;
        locQuadTL.texCoords.v = top;
        locQuadTR.texCoords.u = right;
        locQuadTR.texCoords.v = top;
        locQuadBL.texCoords.u = left;
        locQuadBL.texCoords.v = bottom;
        locQuadBR.texCoords.u = right;
        locQuadBR.texCoords.v =
            bottom;
        locQuadBL.vertices.x = i * locItemWidth;
        locQuadBL.vertices.y = 0;
        locQuadBL.vertices.z = 0;
        locQuadBR.vertices.x = i * locItemWidth + locItemWidth;
        locQuadBR.vertices.y = 0;
        locQuadBR.vertices.z = 0;
        locQuadTL.vertices.x = i * locItemWidth;
        locQuadTL.vertices.y = this._itemHeight;
        locQuadTL.vertices.z = 0;
        locQuadTR.vertices.x = i * locItemWidth + locItemWidth;
        locQuadTR.vertices.y = this._itemHeight;
        locQuadTR.vertices.z = 0;
        locQuadTL.colors = curColor;
        locQuadTR.colors = curColor;
        locQuadBL.colors = curColor;
        locQuadBR.colors = curColor
    }
    if (n > 0) {
        locTextureAtlas.dirty =
            true;
        var totalQuads = locTextureAtlas.totalQuads;
        if (n > totalQuads)locTextureAtlas.increaseTotalQuadsWith(n - totalQuads)
    }
}, setString: null, _setStringForCanvas: function (label) {
    label = String(label);
    var len = label.length;
    this._string = label;
    this.width = len * this._itemWidth;
    this.height = this._itemHeight;
    if (this._children) {
        var locChildren = this._children;
        len = locChildren.length;
        for (var i = 0; i < len; i++) {
            var node = locChildren[i];
            if (node)node.visible = false
        }
    }
    this.updateAtlasValues();
    this.quadsToDraw = len
}, _setStringForWebGL: function (label) {
    label =
        String(label);
    var len = label.length;
    if (len > this.textureAtlas.totalQuads)this.textureAtlas.resizeCapacity(len);
    this._string = label;
    this.width = len * this._itemWidth;
    this.height = this._itemHeight;
    this.updateAtlasValues();
    this.quadsToDraw = len
}, setOpacity: null, _setOpacityForCanvas: function (opacity) {
    if (this._displayedOpacity !== opacity) {
        cc.AtlasNode.prototype.setOpacity.call(this, opacity);
        var locChildren = this._children;
        for (var i = 0, len = locChildren.length; i < len; i++)if (locChildren[i])locChildren[i].opacity = opacity
    }
},
    _setOpacityForWebGL: function (opacity) {
        if (this._opacity !== opacity)cc.AtlasNode.prototype.setOpacity.call(this, opacity)
    }});
var _p = cc.LabelAtlas.prototype;
if (cc._renderType === cc._RENDER_TYPE_WEBGL) {
    _p.updateAtlasValues = _p._updateAtlasValuesForWebGL;
    _p.setString = _p._setStringForWebGL;
    _p.setOpacity = _p._setOpacityForWebGL
} else {
    _p.updateAtlasValues = _p._updateAtlasValuesForCanvas;
    _p.setString = _p._setStringForCanvas;
    _p.setOpacity = _p._setOpacityForCanvas
}
cc.defineGetterSetter(_p, "opacity", _p.getOpacity, _p.setOpacity);
_p.string;
cc.defineGetterSetter(_p, "string", _p.getString, _p.setString);
cc.LabelAtlas.create = function (strText, charMapFile, itemWidth, itemHeight, startCharMap) {
    return new cc.LabelAtlas(strText, charMapFile, itemWidth, itemHeight, startCharMap)
};
cc.LABEL_AUTOMATIC_WIDTH = -1;
cc.LabelBMFont = cc.SpriteBatchNode.extend({RGBAProtocol: true, _opacityModifyRGB: false, _string: "", _config: null, _fntFile: "", _initialString: "", _alignment: cc.TEXT_ALIGNMENT_CENTER, _width: -1, _lineBreakWithoutSpaces: false, _imageOffset: null, _reusedChar: null, _displayedOpacity: 255, _realOpacity: 255, _displayedColor: null, _realColor: null, _cascadeColorEnabled: true, _cascadeOpacityEnabled: true, _textureLoaded: false, _loadedEventListeners: null, _className: "LabelBMFont", _setString: function (newString, needUpdateLabel) {
    if (!needUpdateLabel)this._string =
        newString; else this._initialString = newString;
    var locChildren = this._children;
    if (locChildren)for (var i = 0; i < locChildren.length; i++) {
        var selNode = locChildren[i];
        if (selNode)selNode.setVisible(false)
    }
    if (this._textureLoaded) {
        this.createFontChars();
        if (needUpdateLabel)this.updateLabel()
    }
}, ctor: function (str, fntFile, width, alignment, imageOffset) {
    var self = this;
    cc.SpriteBatchNode.prototype.ctor.call(self);
    self._imageOffset = cc.p(0, 0);
    self._displayedColor = cc.color(255, 255, 255, 255);
    self._realColor = cc.color(255, 255,
        255, 255);
    self._reusedChar = [];
    this.initWithString(str, fntFile, width, alignment, imageOffset)
}, textureLoaded: function () {
    return this._textureLoaded
}, addLoadedEventListener: function (callback, target) {
    if (!this._loadedEventListeners)this._loadedEventListeners = [];
    this._loadedEventListeners.push({eventCallback: callback, eventTarget: target})
}, _callLoadedEventCallbacks: function () {
    if (!this._loadedEventListeners)return;
    var locListeners = this._loadedEventListeners;
    for (var i = 0, len = locListeners.length; i < len; i++) {
        var selCallback =
            locListeners[i];
        selCallback.eventCallback.call(selCallback.eventTarget, this)
    }
    locListeners.length = 0
}, draw: function (ctx) {
    cc.SpriteBatchNode.prototype.draw.call(this, ctx);
    if (cc.LABELBMFONT_DEBUG_DRAW) {
        var size = this.getContentSize();
        var pos = cc.p(0 | -this._anchorPointInPoints.x, 0 | -this._anchorPointInPoints.y);
        var vertices = [cc.p(pos.x, pos.y), cc.p(pos.x + size.width, pos.y), cc.p(pos.x + size.width, pos.y + size.height), cc.p(pos.x, pos.y + size.height)];
        cc._drawingUtil.setDrawColor(0, 255, 0, 255);
        cc._drawingUtil.drawPoly(vertices,
            4, true)
    }
}, setColor: function (color) {
    var locDisplayed = this._displayedColor, locRealColor = this._realColor;
    if (locRealColor.r == color.r && locRealColor.g == color.g && locRealColor.b == color.b && locRealColor.a == color.a)return;
    locDisplayed.r = locRealColor.r = color.r;
    locDisplayed.g = locRealColor.g = color.g;
    locDisplayed.b = locRealColor.b = color.b;
    if (this._textureLoaded)if (this._cascadeColorEnabled) {
        var parentColor = cc.color.WHITE;
        var locParent = this._parent;
        if (locParent && locParent.RGBAProtocol && locParent.cascadeColor)parentColor =
            locParent.getDisplayedColor();
        this.updateDisplayedColor(parentColor)
    }
    if (color.a !== undefined && !color.a_undefined)this.setOpacity(color.a)
}, isOpacityModifyRGB: function () {
    return this._opacityModifyRGB
}, setOpacityModifyRGB: function (opacityModifyRGB) {
    this._opacityModifyRGB = opacityModifyRGB;
    var locChildren = this._children;
    if (locChildren)for (var i = 0; i < locChildren.length; i++) {
        var node = locChildren[i];
        if (node && node.RGBAProtocol)node.opacityModifyRGB = this._opacityModifyRGB
    }
}, getOpacity: function () {
    return this._realOpacity
},
    getDisplayedOpacity: function () {
        return this._displayedOpacity
    }, setOpacity: function (opacity) {
        this._displayedOpacity = this._realOpacity = opacity;
        if (this._cascadeOpacityEnabled) {
            var parentOpacity = 255;
            var locParent = this._parent;
            if (locParent && locParent.RGBAProtocol && locParent.cascadeOpacity)parentOpacity = locParent.getDisplayedOpacity();
            this.updateDisplayedOpacity(parentOpacity)
        }
        this._displayedColor.a = this._realColor.a = opacity
    }, updateDisplayedOpacity: function (parentOpacity) {
        this._displayedOpacity = this._realOpacity *
            parentOpacity / 255;
        var locChildren = this._children;
        for (var i = 0; i < locChildren.length; i++) {
            var locChild = locChildren[i];
            if (cc._renderType == cc._RENDER_TYPE_WEBGL)locChild.updateDisplayedOpacity(this._displayedOpacity); else {
                cc.NodeRGBA.prototype.updateDisplayedOpacity.call(locChild, this._displayedOpacity);
                locChild.setNodeDirty()
            }
        }
        this._changeTextureColor()
    }, isCascadeOpacityEnabled: function () {
        return false
    }, setCascadeOpacityEnabled: function (cascadeOpacityEnabled) {
        this._cascadeOpacityEnabled = cascadeOpacityEnabled
    },
    getColor: function () {
        var locRealColor = this._realColor;
        return cc.color(locRealColor.r, locRealColor.g, locRealColor.b, locRealColor.a)
    }, getDisplayedColor: function () {
        return this._displayedColor
    }, updateDisplayedColor: function (parentColor) {
        var locDispColor = this._displayedColor;
        var locRealColor = this._realColor;
        locDispColor.r = locRealColor.r * parentColor.r / 255;
        locDispColor.g = locRealColor.g * parentColor.g / 255;
        locDispColor.b = locRealColor.b * parentColor.b / 255;
        var locChildren = this._children;
        for (var i = 0; i < locChildren.length; i++) {
            var locChild =
                locChildren[i];
            if (cc._renderType == cc._RENDER_TYPE_WEBGL)locChild.updateDisplayedColor(this._displayedColor); else {
                cc.NodeRGBA.prototype.updateDisplayedColor.call(locChild, this._displayedColor);
                locChild.setNodeDirty()
            }
        }
        this._changeTextureColor()
    }, _changeTextureColor: function () {
        if (cc._renderType == cc._RENDER_TYPE_WEBGL)return;
        var locElement, locTexture = this.texture;
        if (locTexture && locTexture.width > 0) {
            locElement = locTexture.getHtmlElementObj();
            if (!locElement)return;
            var cacheTextureForColor = cc.textureCache.getTextureColors(this._originalTexture.getHtmlElementObj());
            if (cacheTextureForColor)if (locElement instanceof HTMLCanvasElement && !this._rectRotated)cc.generateTintImage(locElement, cacheTextureForColor, this._displayedColor, null, locElement); else {
                locElement = cc.generateTintImage(locElement, cacheTextureForColor, this._displayedColor);
                locTexture = new cc.Texture2D;
                locTexture.initWithElement(locElement);
                locTexture.handleLoadedTexture();
                this.texture = locTexture
            }
        }
    }, isCascadeColorEnabled: function () {
        return false
    }, setCascadeColorEnabled: function (cascadeColorEnabled) {
        this._cascadeColorEnabled =
            cascadeColorEnabled
    }, init: function () {
        return this.initWithString(null, null, null, null, null)
    }, initWithString: function (str, fntFile, width, alignment, imageOffset) {
        var self = this, theString = str || "";
        if (self._config)cc.log("cc.LabelBMFont.initWithString(): re-init is no longer supported");
        var texture;
        if (fntFile) {
            var newConf = cc.loader.getRes(fntFile);
            if (!newConf) {
                cc.log("cc.LabelBMFont.initWithString(): Impossible to create font. Please check file");
                return false
            }
            self._config = newConf;
            self._fntFile = fntFile;
            texture =
                cc.textureCache.addImage(newConf.atlasName);
            var locIsLoaded = texture.isLoaded();
            self._textureLoaded = locIsLoaded;
            if (!locIsLoaded)texture.addLoadedEventListener(function (sender) {
                var self1 = this;
                self1._textureLoaded = true;
                self1.initWithTexture(sender, self1._initialString.length);
                self1.setString(self1._initialString, true);
                self1._callLoadedEventCallbacks()
            }, self)
        } else {
            texture = new cc.Texture2D;
            var image = new Image;
            texture.initWithElement(image);
            self._textureLoaded = false
        }
        if (self.initWithTexture(texture, theString.length)) {
            self._alignment =
                alignment || cc.TEXT_ALIGNMENT_LEFT;
            self._imageOffset = imageOffset || cc.p(0, 0);
            self._width = width == null ? -1 : width;
            self._displayedOpacity = self._realOpacity = 255;
            self._displayedColor = cc.color(255, 255, 255, 255);
            self._realColor = cc.color(255, 255, 255, 255);
            self._cascadeOpacityEnabled = true;
            self._cascadeColorEnabled = true;
            self._contentSize.width = 0;
            self._contentSize.height = 0;
            self.setAnchorPoint(0.5, 0.5);
            if (cc._renderType === cc._RENDER_TYPE_WEBGL) {
                var locTexture = self.textureAtlas.texture;
                self._opacityModifyRGB = locTexture.hasPremultipliedAlpha();
                var reusedChar = self._reusedChar = new cc.Sprite;
                reusedChar.initWithTexture(locTexture, cc.rect(0, 0, 0, 0), false);
                reusedChar.batchNode = self
            }
            self.setString(theString, true);
            return true
        }
        return false
    }, createFontChars: function () {
        var self = this;
        var locContextType = cc._renderType;
        var locTexture = locContextType === cc._RENDER_TYPE_CANVAS ? self.texture : self.textureAtlas.texture;
        var nextFontPositionX = 0;
        var tmpSize = cc.size(0, 0);
        var longestLine = 0;
        var quantityOfLines = 1;
        var locStr = self._string;
        var stringLen = locStr ? locStr.length :
            0;
        if (stringLen === 0)return;
        var i, locCfg = self._config, locKerningDict = locCfg.kerningDict, locCommonH = locCfg.commonHeight, locFontDict = locCfg.fontDefDictionary;
        for (i = 0; i < stringLen - 1; i++)if (locStr.charCodeAt(i) == 10)quantityOfLines++;
        var totalHeight = locCommonH * quantityOfLines;
        var nextFontPositionY = -(locCommonH - locCommonH * quantityOfLines);
        var prev = -1;
        for (i = 0; i < stringLen; i++) {
            var key = locStr.charCodeAt(i);
            if (key == 0)continue;
            if (key === 10) {
                nextFontPositionX = 0;
                nextFontPositionY -= locCfg.commonHeight;
                continue
            }
            var kerningAmount =
                locKerningDict[prev << 16 | key & 65535] || 0;
            var fontDef = locFontDict[key];
            if (!fontDef) {
                cc.log("cocos2d: LabelBMFont: character not found " + locStr[i]);
                continue
            }
            var rect = cc.rect(fontDef.rect.x, fontDef.rect.y, fontDef.rect.width, fontDef.rect.height);
            rect = cc.rectPixelsToPoints(rect);
            rect.x += self._imageOffset.x;
            rect.y += self._imageOffset.y;
            var fontChar = self.getChildByTag(i);
            if (!fontChar) {
                fontChar = new cc.Sprite;
                if (key === 32 && locContextType === cc._RENDER_TYPE_CANVAS)rect = cc.rect(0, 0, 0, 0);
                fontChar.initWithTexture(locTexture,
                    rect, false);
                fontChar._newTextureWhenChangeColor = true;
                self.addChild(fontChar, 0, i)
            } else if (key === 32 && locContextType === cc._RENDER_TYPE_CANVAS)fontChar.setTextureRect(rect, false, cc.size(0, 0)); else {
                fontChar.setTextureRect(rect, false);
                fontChar.visible = true
            }
            fontChar.opacityModifyRGB = self._opacityModifyRGB;
            if (cc._renderType == cc._RENDER_TYPE_WEBGL) {
                fontChar.updateDisplayedColor(self._displayedColor);
                fontChar.updateDisplayedOpacity(self._displayedOpacity)
            } else {
                cc.NodeRGBA.prototype.updateDisplayedColor.call(fontChar,
                    self._displayedColor);
                cc.NodeRGBA.prototype.updateDisplayedOpacity.call(fontChar, self._displayedOpacity);
                fontChar.setNodeDirty()
            }
            var yOffset = locCfg.commonHeight - fontDef.yOffset;
            var fontPos = cc.p(nextFontPositionX + fontDef.xOffset + fontDef.rect.width * 0.5 + kerningAmount, nextFontPositionY + yOffset - rect.height * 0.5 * cc.contentScaleFactor());
            fontChar.setPosition(cc.pointPixelsToPoints(fontPos));
            nextFontPositionX += fontDef.xAdvance + kerningAmount;
            prev = key;
            if (longestLine < nextFontPositionX)longestLine = nextFontPositionX
        }
        tmpSize.width =
            longestLine;
        tmpSize.height = totalHeight;
        self.setContentSize(cc.sizePixelsToPoints(tmpSize))
    }, updateString: function (fromUpdate) {
        var self = this;
        var locChildren = self._children;
        if (locChildren)for (var i = 0, li = locChildren.length; i < li; i++) {
            var node = locChildren[i];
            if (node)node.visible = false
        }
        if (self._config)self.createFontChars();
        if (!fromUpdate)self.updateLabel()
    }, getString: function () {
        return this._initialString
    }, setString: function (newString, needUpdateLabel) {
        newString = String(newString);
        if (needUpdateLabel == null)needUpdateLabel =
            true;
        if (newString == null || typeof newString != "string")newString = newString + "";
        this._initialString = newString;
        this._setString(newString, needUpdateLabel)
    }, _setStringForSetter: function (newString) {
        this.setString(newString, false)
    }, setCString: function (label) {
        this.setString(label, true)
    }, updateLabel: function () {
        var self = this;
        self.string = self._initialString;
        if (self._width > 0) {
            var stringLength = self._string.length;
            var multiline_string = [];
            var last_word = [];
            var line = 1, i = 0, start_line = false, start_word = false, startOfLine =
                -1, startOfWord = -1, skip = 0;
            var characterSprite;
            for (var j = 0, lj = self._children.length; j < lj; j++) {
                var justSkipped = 0;
                while (!(characterSprite = self.getChildByTag(j + skip + justSkipped)))justSkipped++;
                skip += justSkipped;
                if (i >= stringLength)break;
                var character = self._string[i];
                if (!start_word) {
                    startOfWord = self._getLetterPosXLeft(characterSprite);
                    start_word = true
                }
                if (!start_line) {
                    startOfLine = startOfWord;
                    start_line = true
                }
                if (character.charCodeAt(0) == 10) {
                    last_word.push("\n");
                    multiline_string = multiline_string.concat(last_word);
                    last_word.length = 0;
                    start_word = false;
                    start_line = false;
                    startOfWord = -1;
                    startOfLine = -1;
                    j--;
                    skip -= justSkipped;
                    line++;
                    if (i >= stringLength)break;
                    character = self._string[i];
                    if (!startOfWord) {
                        startOfWord = self._getLetterPosXLeft(characterSprite);
                        start_word = true
                    }
                    if (!startOfLine) {
                        startOfLine = startOfWord;
                        start_line = true
                    }
                    i++;
                    continue
                }
                if (cc.isspace_unicode(character)) {
                    last_word.push(character);
                    multiline_string = multiline_string.concat(last_word);
                    last_word.length = 0;
                    start_word = false;
                    startOfWord = -1;
                    i++;
                    continue
                }
                if (self._getLetterPosXRight(characterSprite) -
                    startOfLine > self._width)if (!self._lineBreakWithoutSpaces) {
                    last_word.push(character);
                    var found = multiline_string.lastIndexOf(" ");
                    if (found != -1)cc.utf8_trim_ws(multiline_string); else multiline_string = [];
                    if (multiline_string.length > 0)multiline_string.push("\n");
                    line++;
                    start_line = false;
                    startOfLine = -1;
                    i++
                } else {
                    cc.utf8_trim_ws(last_word);
                    last_word.push("\n");
                    multiline_string = multiline_string.concat(last_word);
                    last_word.length = 0;
                    start_word = false;
                    start_line = false;
                    startOfWord = -1;
                    startOfLine = -1;
                    line++;
                    if (i >=
                        stringLength)break;
                    if (!startOfWord) {
                        startOfWord = self._getLetterPosXLeft(characterSprite);
                        start_word = true
                    }
                    if (!startOfLine) {
                        startOfLine = startOfWord;
                        start_line = true
                    }
                    j--
                } else {
                    last_word.push(character);
                    i++
                }
            }
            multiline_string = multiline_string.concat(last_word);
            var len = multiline_string.length;
            var str_new = "";
            for (i = 0; i < len; ++i)str_new += multiline_string[i];
            str_new = str_new + String.fromCharCode(0);
            self._setString(str_new, false)
        }
        if (self._alignment != cc.TEXT_ALIGNMENT_LEFT) {
            i = 0;
            var lineNumber = 0;
            var strlen = self._string.length;
            var last_line = [];
            for (var ctr = 0; ctr < strlen; ctr++) {
                if (self._string[ctr].charCodeAt(0) == 10 || self._string[ctr].charCodeAt(0) == 0) {
                    var lineWidth = 0;
                    var line_length = last_line.length;
                    if (line_length == 0) {
                        lineNumber++;
                        continue
                    }
                    var index = i + line_length - 1 + lineNumber;
                    if (index < 0)continue;
                    var lastChar = self.getChildByTag(index);
                    if (lastChar == null)continue;
                    lineWidth = lastChar.getPositionX() + lastChar._getWidth() / 2;
                    var shift = 0;
                    switch (self._alignment) {
                        case cc.TEXT_ALIGNMENT_CENTER:
                            shift = self.width / 2 - lineWidth / 2;
                            break;
                        case cc.TEXT_ALIGNMENT_RIGHT:
                            shift =
                                self.width - lineWidth;
                            break;
                        default:
                            break
                    }
                    if (shift != 0)for (j = 0; j < line_length; j++) {
                        index = i + j + lineNumber;
                        if (index < 0)continue;
                        characterSprite = self.getChildByTag(index);
                        if (characterSprite)characterSprite.x += shift
                    }
                    i += line_length;
                    lineNumber++;
                    last_line.length = 0;
                    continue
                }
                last_line.push(self._string[i])
            }
        }
    }, setAlignment: function (alignment) {
        this._alignment = alignment;
        this.updateLabel()
    }, _getAlignment: function () {
        return this._alignment
    }, setBoundingWidth: function (width) {
        this._width = width;
        this.updateLabel()
    }, _getBoundingWidth: function () {
        return this._width
    },
    setLineBreakWithoutSpace: function (breakWithoutSpace) {
        this._lineBreakWithoutSpaces = breakWithoutSpace;
        this.updateLabel()
    }, setScale: function (scale, scaleY) {
        cc.Node.prototype.setScale.call(this, scale, scaleY);
        this.updateLabel()
    }, setScaleX: function (scaleX) {
        cc.Node.prototype.setScaleX.call(this, scaleX);
        this.updateLabel()
    }, setScaleY: function (scaleY) {
        cc.Node.prototype.setScaleY.call(this, scaleY);
        this.updateLabel()
    }, setFntFile: function (fntFile) {
        var self = this;
        if (fntFile != null && fntFile != self._fntFile) {
            var newConf =
                cc.loader.getRes(fntFile);
            if (!newConf) {
                cc.log("cc.LabelBMFont.setFntFile() : Impossible to create font. Please check file");
                return
            }
            self._fntFile = fntFile;
            self._config = newConf;
            var texture = cc.textureCache.addImage(newConf.atlasName);
            var locIsLoaded = texture.isLoaded();
            self._textureLoaded = locIsLoaded;
            self.texture = texture;
            if (cc._renderType === cc._RENDER_TYPE_CANVAS)self._originalTexture = self.texture;
            if (!locIsLoaded)texture.addLoadedEventListener(function (sender) {
                var self1 = this;
                self1._textureLoaded = true;
                self1.texture = sender;
                self1.createFontChars();
                self1._changeTextureColor();
                self1.updateLabel();
                self1._callLoadedEventCallbacks()
            }, self); else self.createFontChars()
        }
    }, getFntFile: function () {
        return this._fntFile
    }, setAnchorPoint: function (point, y) {
        cc.Node.prototype.setAnchorPoint.call(this, point, y);
        this.updateLabel()
    }, _setAnchor: function (p) {
        cc.Node.prototype._setAnchor.call(this, p);
        this.updateLabel()
    }, _setAnchorX: function (x) {
        cc.Node.prototype._setAnchorX.call(this, x);
        this.updateLabel()
    }, _setAnchorY: function (y) {
        cc.Node.prototype._setAnchorY.call(this,
            y);
        this.updateLabel()
    }, _atlasNameFromFntFile: function (fntFile) {
    }, _kerningAmountForFirst: function (first, second) {
        var ret = 0;
        var key = first << 16 | second & 65535;
        if (this._configuration.kerningDictionary) {
            var element = this._configuration.kerningDictionary[key.toString()];
            if (element)ret = element.amount
        }
        return ret
    }, _getLetterPosXLeft: function (sp) {
        return sp.getPositionX() * this._scaleX - sp._getWidth() * this._scaleX * sp._getAnchorX()
    }, _getLetterPosXRight: function (sp) {
        return sp.getPositionX() * this._scaleX + sp._getWidth() *
            this._scaleX * sp._getAnchorX()
    }});
var _p = cc.LabelBMFont.prototype;
_p.opacityModifyRGB;
cc.defineGetterSetter(_p, "opacityModifyRGB", _p.isOpacityModifyRGB, _p.setOpacityModifyRGB);
_p.opacity;
cc.defineGetterSetter(_p, "opacity", _p.getOpacity, _p.setOpacity);
_p.cascadeOpacity;
cc.defineGetterSetter(_p, "cascadeOpacity", _p.isCascadeOpacityEnabled, _p.setCascadeOpacityEnabled);
_p.color;
cc.defineGetterSetter(_p, "color", _p.getColor, _p.setColor);
_p.cascadeColor;
cc.defineGetterSetter(_p, "cascadeColor", _p.isCascadeColorEnabled, _p.setCascadeColorEnabled);
_p.string;
cc.defineGetterSetter(_p, "string", _p.getString, _p._setStringForSetter);
_p.boundingWidth;
cc.defineGetterSetter(_p, "boundingWidth", _p._getBoundingWidth, _p.setBoundingWidth);
_p.textAlign;
cc.defineGetterSetter(_p, "textAlign", _p._getAlignment, _p.setAlignment);
cc.LabelBMFont.create = function (str, fntFile, width, alignment, imageOffset) {
    return new cc.LabelBMFont(str, fntFile, width, alignment, imageOffset)
};
cc.isspace_unicode = function (ch) {
    ch = ch.charCodeAt(0);
    return ch >= 9 && ch <= 13 || ch == 32 || ch == 133 || ch == 160 || ch == 5760 || ch >= 8192 && ch <= 8202 || ch == 8232 || ch == 8233 || ch == 8239 || ch == 8287 || ch == 12288
};
cc.utf8_trim_ws = function (str) {
    var len = str.length;
    if (len <= 0)return;
    var last_index = len - 1;
    if (cc.isspace_unicode(str[last_index])) {
        for (var i = last_index - 1; i >= 0; --i)if (cc.isspace_unicode(str[i]))last_index = i; else break;
        cc.utf8_trim_from(str, last_index)
    }
};
cc.utf8_trim_from = function (str, index) {
    var len = str.length;
    if (index >= len || index < 0)return;
    str.splice(index, len)
};
cc._fntLoader = {INFO_EXP: /info [^\n]*(\n|$)/gi, COMMON_EXP: /common [^\n]*(\n|$)/gi, PAGE_EXP: /page [^\n]*(\n|$)/gi, CHAR_EXP: /char [^\n]*(\n|$)/gi, KERNING_EXP: /kerning [^\n]*(\n|$)/gi, ITEM_EXP: /\w+=[^ \r\n]+/gi, INT_EXP: /^[\-]?\d+$/, _parseStrToObj: function (str) {
    var arr = str.match(this.ITEM_EXP);
    var obj = {};
    if (arr)for (var i = 0, li = arr.length; i < li; i++) {
        var tempStr = arr[i];
        var index = tempStr.indexOf("\x3d");
        var key = tempStr.substring(0, index);
        var value = tempStr.substring(index + 1);
        if (value.match(this.INT_EXP))value =
            parseInt(value); else if (value[0] == '"')value = value.substring(1, value.length - 1);
        obj[key] = value
    }
    return obj
}, parseFnt: function (fntStr, url) {
    var self = this, fnt = {};
    var infoObj = self._parseStrToObj(fntStr.match(self.INFO_EXP)[0]);
    var paddingArr = infoObj["padding"].split(",");
    var padding = {left: parseInt(paddingArr[0]), top: parseInt(paddingArr[1]), right: parseInt(paddingArr[2]), bottom: parseInt(paddingArr[3])};
    var commonObj = self._parseStrToObj(fntStr.match(self.COMMON_EXP)[0]);
    fnt.commonHeight = commonObj["lineHeight"];
    if (cc._renderType === cc._RENDER_TYPE_WEBGL) {
        var texSize = cc.configuration.getMaxTextureSize();
        if (commonObj["scaleW"] > texSize.width || commonObj["scaleH"] > texSize.height)cc.log("cc.LabelBMFont._parseCommonArguments(): page can't be larger than supported")
    }
    if (commonObj["pages"] !== 1)cc.log("cc.LabelBMFont._parseCommonArguments(): only supports 1 page");
    var pageObj = self._parseStrToObj(fntStr.match(self.PAGE_EXP)[0]);
    if (pageObj["id"] !== 0)cc.log("cc.LabelBMFont._parseImageFileName() : file could not be found");
    fnt.atlasName = cc.path.changeBasename(url, pageObj["file"]);
    var charLines = fntStr.match(self.CHAR_EXP);
    var fontDefDictionary = fnt.fontDefDictionary = {};
    for (var i = 0, li = charLines.length; i < li; i++) {
        var charObj = self._parseStrToObj(charLines[i]);
        var charId = charObj["id"];
        fontDefDictionary[charId] = {rect: {x: charObj["x"], y: charObj["y"], width: charObj["width"], height: charObj["height"]}, xOffset: charObj["xoffset"], yOffset: charObj["yoffset"], xAdvance: charObj["xadvance"]}
    }
    var kerningDict = fnt.kerningDict = {};
    var kerningLines =
        fntStr.match(self.KERNING_EXP);
    if (kerningLines)for (var i = 0, li = kerningLines.length; i < li; i++) {
        var kerningObj = self._parseStrToObj(kerningLines[i]);
        kerningDict[kerningObj["first"] << 16 | kerningObj["second"] & 65535] = kerningObj["amount"]
    }
    return fnt
}, load: function (realUrl, url, res, cb) {
    var self = this;
    cc.loader.loadTxt(realUrl, function (err, txt) {
        if (err)return cb(err);
        cb(null, self.parseFnt(txt, url))
    })
}};
cc.loader.register(["fnt"], cc._fntLoader);