cc.MotionStreak = cc.NodeRGBA.extend({texture: null, fastMode: false, startingPositionInitialized: false, _blendFunc: null, _stroke: 0, _fadeDelta: 0, _minSeg: 0, _maxPoints: 0, _nuPoints: 0, _previousNuPoints: 0, _pointVertexes: null, _pointState: null, _vertices: null, _colorPointer: null, _texCoords: null, _verticesBuffer: null, _colorPointerBuffer: null, _texCoordsBuffer: null, _className: "MotionStreak", ctor: function (fade, minSeg, stroke, color, texture) {
    cc.NodeRGBA.prototype.ctor.call(this);
    this._positionR = cc.p(0, 0);
    this._blendFunc =
        new cc.BlendFunc(cc.SRC_ALPHA, cc.ONE_MINUS_SRC_ALPHA);
    this._vertexWebGLBuffer = cc._renderContext.createBuffer();
    this.fastMode = false;
    this.startingPositionInitialized = false;
    this.texture = null;
    this._stroke = 0;
    this._fadeDelta = 0;
    this._minSeg = 0;
    this._maxPoints = 0;
    this._nuPoints = 0;
    this._previousNuPoints = 0;
    this._pointVertexes = null;
    this._pointState = null;
    this._vertices = null;
    this._colorPointer = null;
    this._texCoords = null;
    this._verticesBuffer = null;
    this._colorPointerBuffer = null;
    this._texCoordsBuffer = null;
    if (texture !==
        undefined)this.initWithFade(fade, minSeg, stroke, color, texture)
}, getTexture: function () {
    return this.texture
}, setTexture: function (texture) {
    if (this.texture != texture)this.texture = texture
}, getBlendFunc: function () {
    return this._blendFunc
}, setBlendFunc: function (src, dst) {
    if (dst === undefined)this._blendFunc = src; else {
        this._blendFunc.src = src;
        this._blendFunc.dst = dst
    }
}, getOpacity: function () {
    cc.log("cc.MotionStreak.getOpacity has not been supported.");
    return 0
}, setOpacity: function (opacity) {
    cc.log("cc.MotionStreak.setOpacity has not been supported.")
},
    setOpacityModifyRGB: function (value) {
    }, isOpacityModifyRGB: function () {
        return false
    }, onExit: function () {
        cc.Node.prototype.onExit.call(this);
        if (this._verticesBuffer)cc._renderContext.deleteBuffer(this._verticesBuffer);
        if (this._texCoordsBuffer)cc._renderContext.deleteBuffer(this._texCoordsBuffer);
        if (this._colorPointerBuffer)cc._renderContext.deleteBuffer(this._colorPointerBuffer)
    }, isFastMode: function () {
        return this.fastMode
    }, setFastMode: function (fastMode) {
        this.fastMode = fastMode
    }, isStartingPositionInitialized: function () {
        return this.startingPositionInitialized
    },
    setStartingPositionInitialized: function (startingPositionInitialized) {
        this.startingPositionInitialized = startingPositionInitialized
    }, initWithFade: function (fade, minSeg, stroke, color, texture) {
        if (!texture)throw"cc.MotionStreak.initWithFade(): Invalid filename or texture";
        if (typeof texture === "string")texture = cc.textureCache.addImage(texture);
        cc.Node.prototype.setPosition.call(this, cc.p(0, 0));
        this.anchorX = 0;
        this.anchorY = 0;
        this.ignoreAnchor = true;
        this.startingPositionInitialized = false;
        this.fastMode = true;
        this._minSeg =
                minSeg == -1 ? stroke / 5 : minSeg;
        this._minSeg *= this._minSeg;
        this._stroke = stroke;
        this._fadeDelta = 1 / fade;
        var locMaxPoints = (0 | fade * 60) + 2;
        this._nuPoints = 0;
        this._pointState = new Float32Array(locMaxPoints);
        this._pointVertexes = new Float32Array(locMaxPoints * 2);
        this._vertices = new Float32Array(locMaxPoints * 4);
        this._texCoords = new Float32Array(locMaxPoints * 4);
        this._colorPointer = new Uint8Array(locMaxPoints * 8);
        this._maxPoints = locMaxPoints;
        var gl = cc._renderContext;
        this._verticesBuffer = gl.createBuffer();
        this._texCoordsBuffer =
            gl.createBuffer();
        this._colorPointerBuffer = gl.createBuffer();
        this._blendFunc.src = gl.SRC_ALPHA;
        this._blendFunc.dst = gl.ONE_MINUS_SRC_ALPHA;
        this.shaderProgram = cc.shaderCache.programForKey(cc.SHADER_POSITION_TEXTURECOLOR);
        this.texture = texture;
        this.color = color;
        this.scheduleUpdate();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._verticesBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._vertices, gl.DYNAMIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._texCoordsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._texCoords, gl.DYNAMIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._colorPointerBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._colorPointer, gl.DYNAMIC_DRAW);
        return true
    }, tintWithColor: function (color) {
        this.color = color;
        var locColorPointer = this._colorPointer;
        for (var i = 0, len = this._nuPoints * 2; i < len; i++) {
            locColorPointer[i * 4] = color.r;
            locColorPointer[i * 4 + 1] = color.g;
            locColorPointer[i * 4 + 2] = color.b
        }
    }, reset: function () {
        this._nuPoints = 0
    }, setPosition: function (position, yValue) {
        this.startingPositionInitialized = true;
        if (yValue === undefined) {
            this._positionR.x =
                position.x;
            this._positionR.y = position.y
        } else {
            this._positionR.x = position;
            this._positionR.y = yValue
        }
    }, getPositionX: function () {
        return this._positionR.x
    }, setPositionX: function (x) {
        this._positionR.x = x;
        if (!this.startingPositionInitialized)this.startingPositionInitialized = true
    }, getPositionY: function () {
        return this._positionR.y
    }, setPositionY: function (y) {
        this._positionR.y = y;
        if (!this.startingPositionInitialized)this.startingPositionInitialized = true
    }, draw: function (ctx) {
        if (this._nuPoints <= 1)return;
        if (this.texture &&
            this.texture.isLoaded()) {
            ctx = ctx || cc._renderContext;
            cc.nodeDrawSetup(this);
            cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POS_COLOR_TEX);
            cc.glBlendFunc(this._blendFunc.src, this._blendFunc.dst);
            cc.glBindTexture2D(this.texture);
            ctx.bindBuffer(ctx.ARRAY_BUFFER, this._verticesBuffer);
            ctx.bufferData(ctx.ARRAY_BUFFER, this._vertices, ctx.DYNAMIC_DRAW);
            ctx.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, ctx.FLOAT, false, 0, 0);
            ctx.bindBuffer(ctx.ARRAY_BUFFER, this._texCoordsBuffer);
            ctx.bufferData(ctx.ARRAY_BUFFER,
                this._texCoords, ctx.DYNAMIC_DRAW);
            ctx.vertexAttribPointer(cc.VERTEX_ATTRIB_TEX_COORDS, 2, ctx.FLOAT, false, 0, 0);
            ctx.bindBuffer(ctx.ARRAY_BUFFER, this._colorPointerBuffer);
            ctx.bufferData(ctx.ARRAY_BUFFER, this._colorPointer, ctx.DYNAMIC_DRAW);
            ctx.vertexAttribPointer(cc.VERTEX_ATTRIB_COLOR, 4, ctx.UNSIGNED_BYTE, true, 0, 0);
            ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, this._nuPoints * 2);
            cc.g_NumberOfDraws++
        }
    }, update: function (delta) {
        if (!this.startingPositionInitialized)return;
        delta *= this._fadeDelta;
        var newIdx, newIdx2, i,
            i2;
        var mov = 0;
        var locNuPoints = this._nuPoints;
        var locPointState = this._pointState, locPointVertexes = this._pointVertexes, locVertices = this._vertices;
        var locColorPointer = this._colorPointer;
        for (i = 0; i < locNuPoints; i++) {
            locPointState[i] -= delta;
            if (locPointState[i] <= 0)mov++; else {
                newIdx = i - mov;
                if (mov > 0) {
                    locPointState[newIdx] = locPointState[i];
                    locPointVertexes[newIdx * 2] = locPointVertexes[i * 2];
                    locPointVertexes[newIdx * 2 + 1] = locPointVertexes[i * 2 + 1];
                    i2 = i * 2;
                    newIdx2 = newIdx * 2;
                    locVertices[newIdx2 * 2] = locVertices[i2 * 2];
                    locVertices[newIdx2 *
                        2 + 1] = locVertices[i2 * 2 + 1];
                    locVertices[(newIdx2 + 1) * 2] = locVertices[(i2 + 1) * 2];
                    locVertices[(newIdx2 + 1) * 2 + 1] = locVertices[(i2 + 1) * 2 + 1];
                    i2 *= 4;
                    newIdx2 *= 4;
                    locColorPointer[newIdx2 + 0] = locColorPointer[i2 + 0];
                    locColorPointer[newIdx2 + 1] = locColorPointer[i2 + 1];
                    locColorPointer[newIdx2 + 2] = locColorPointer[i2 + 2];
                    locColorPointer[newIdx2 + 4] = locColorPointer[i2 + 4];
                    locColorPointer[newIdx2 + 5] = locColorPointer[i2 + 5];
                    locColorPointer[newIdx2 + 6] = locColorPointer[i2 + 6]
                } else newIdx2 = newIdx * 8;
                var op = locPointState[newIdx] * 255;
                locColorPointer[newIdx2 +
                    3] = op;
                locColorPointer[newIdx2 + 7] = op
            }
        }
        locNuPoints -= mov;
        var appendNewPoint = true;
        if (locNuPoints >= this._maxPoints)appendNewPoint = false; else if (locNuPoints > 0) {
            var a1 = cc.pDistanceSQ(cc.p(locPointVertexes[(locNuPoints - 1) * 2], locPointVertexes[(locNuPoints - 1) * 2 + 1]), this._positionR) < this._minSeg;
            var a2 = locNuPoints == 1 ? false : cc.pDistanceSQ(cc.p(locPointVertexes[(locNuPoints - 2) * 2], locPointVertexes[(locNuPoints - 2) * 2 + 1]), this._positionR) < this._minSeg * 2;
            if (a1 || a2)appendNewPoint = false
        }
        if (appendNewPoint) {
            locPointVertexes[locNuPoints *
                2] = this._positionR.x;
            locPointVertexes[locNuPoints * 2 + 1] = this._positionR.y;
            locPointState[locNuPoints] = 1;
            var offset = locNuPoints * 8;
            var locDisplayedColor = this._displayedColor;
            locColorPointer[offset] = locDisplayedColor.r;
            locColorPointer[offset + 1] = locDisplayedColor.g;
            locColorPointer[offset + 2] = locDisplayedColor.b;
            locColorPointer[offset + 4] = locDisplayedColor.r;
            locColorPointer[offset + 5] = locDisplayedColor.g;
            locColorPointer[offset + 6] = locDisplayedColor.b;
            locColorPointer[offset + 3] = 255;
            locColorPointer[offset + 7] = 255;
            if (locNuPoints > 0 && this.fastMode)if (locNuPoints > 1)cc.vertexLineToPolygon(locPointVertexes, this._stroke, this._vertices, locNuPoints, 1); else cc.vertexLineToPolygon(locPointVertexes, this._stroke, this._vertices, 0, 2);
            locNuPoints++
        }
        if (!this.fastMode)cc.vertexLineToPolygon(locPointVertexes, this._stroke, this._vertices, 0, locNuPoints);
        if (locNuPoints && this._previousNuPoints != locNuPoints) {
            var texDelta = 1 / locNuPoints;
            var locTexCoords = this._texCoords;
            for (i = 0; i < locNuPoints; i++) {
                locTexCoords[i * 4] = 0;
                locTexCoords[i * 4 +
                    1] = texDelta * i;
                locTexCoords[(i * 2 + 1) * 2] = 1;
                locTexCoords[(i * 2 + 1) * 2 + 1] = texDelta * i
            }
            this._previousNuPoints = locNuPoints
        }
        this._nuPoints = locNuPoints
    }});
cc.MotionStreak.create = function (fade, minSeg, stroke, color, texture) {
    return new cc.MotionStreak(fade, minSeg, stroke, color, texture)
};