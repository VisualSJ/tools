cc.GridBase = cc.Class.extend({_active: false, _reuseGrid: 0, _gridSize: null, _texture: null, _step: null, _grabber: null, _isTextureFlipped: false, _shaderProgram: null, _directorProjection: 0, _dirty: false, ctor: function (gridSize, texture, flipped) {
    cc._checkWebGLRenderMode();
    this._active = false;
    this._reuseGrid = 0;
    this._gridSize = null;
    this._texture = null;
    this._step = cc.p(0, 0);
    this._grabber = null;
    this._isTextureFlipped = false;
    this._shaderProgram = null;
    this._directorProjection = 0;
    this._dirty = false;
    if (gridSize !== undefined)this.initWithSize(gridSize,
        texture, flipped)
}, isActive: function () {
    return this._active
}, setActive: function (active) {
    this._active = active;
    if (!active) {
        var director = cc.director;
        var proj = director.getProjection();
        director.setProjection(proj)
    }
}, getReuseGrid: function () {
    return this._reuseGrid
}, setReuseGrid: function (reuseGrid) {
    this._reuseGrid = reuseGrid
}, getGridSize: function () {
    return cc.size(this._gridSize.width, this._gridSize.height)
}, setGridSize: function (gridSize) {
    this._gridSize.width = parseInt(gridSize.width);
    this._gridSize.height = parseInt(gridSize.height)
},
    getStep: function () {
        return cc.p(this._step.x, this._step.y)
    }, setStep: function (step) {
        this._step.x = step.x;
        this._step.y = step.y
    }, isTextureFlipped: function () {
        return this._isTextureFlipped
    }, setTextureFlipped: function (flipped) {
        if (this._isTextureFlipped != flipped) {
            this._isTextureFlipped = flipped;
            this.calculateVertexPoints()
        }
    }, initWithSize: function (gridSize, texture, flipped) {
        if (!texture) {
            var director = cc.director;
            var winSize = director.getWinSizeInPixels();
            var POTWide = cc.NextPOT(winSize.width);
            var POTHigh = cc.NextPOT(winSize.height);
            var data = new Uint8Array(POTWide * POTHigh * 4);
            if (!data) {
                cc.log("cocos2d: CCGrid: not enough memory.");
                return false
            }
            texture = new cc.Texture2D;
            texture.initWithData(data, cc.Texture2D.PIXEL_FORMAT_RGBA8888, POTWide, POTHigh, winSize);
            if (!texture) {
                cc.log("cocos2d: CCGrid: error creating texture");
                return false
            }
        }
        flipped = flipped || false;
        this._active = false;
        this._reuseGrid = 0;
        this._gridSize = gridSize;
        this._texture = texture;
        this._isTextureFlipped = flipped;
        this._step.x = this._texture.width / gridSize.width;
        this._step.y = this._texture.height /
            gridSize.height;
        this._grabber = new cc.Grabber;
        if (!this._grabber)return false;
        this._grabber.grab(this._texture);
        this._shaderProgram = cc.shaderCache.programForKey(cc.SHADER_POSITION_TEXTURE);
        this.calculateVertexPoints();
        return true
    }, beforeDraw: function () {
        this._directorProjection = cc.director.getProjection();
        this.set2DProjection();
        this._grabber.beforeRender(this._texture)
    }, afterDraw: function (target) {
        this._grabber.afterRender(this._texture);
        cc.director.setProjection(this._directorProjection);
        if (target.getCamera().isDirty()) {
            var offset =
                target.getAnchorPointInPoints();
            cc.kmGLTranslatef(offset.x, offset.y, 0);
            target.getCamera().locate();
            cc.kmGLTranslatef(-offset.x, -offset.y, 0)
        }
        cc.glBindTexture2D(this._texture);
        this.blit()
    }, blit: function () {
        cc.log("cc.GridBase.blit(): Shall be overridden in subclass.")
    }, reuse: function () {
        cc.log("cc.GridBase.reuse(): Shall be overridden in subclass.")
    }, calculateVertexPoints: function () {
        cc.log("cc.GridBase.calculateVertexPoints(): Shall be overridden in subclass.")
    }, set2DProjection: function () {
        var winSize =
            cc.director.getWinSizeInPixels();
        var gl = cc._renderContext;
        gl.viewport(0, 0, winSize.width, winSize.height);
        cc.kmGLMatrixMode(cc.KM_GL_PROJECTION);
        cc.kmGLLoadIdentity();
        var orthoMatrix = new cc.kmMat4;
        cc.kmMat4OrthographicProjection(orthoMatrix, 0, winSize.width, 0, winSize.height, -1, 1);
        cc.kmGLMultMatrix(orthoMatrix);
        cc.kmGLMatrixMode(cc.KM_GL_MODELVIEW);
        cc.kmGLLoadIdentity();
        cc.setProjectionMatrixDirty()
    }});
cc.GridBase.create = function (gridSize, texture, flipped) {
    return new cc.GridBase(gridSize, texture, flipped)
};
cc.Grid3D = cc.GridBase.extend({_texCoordinates: null, _vertices: null, _originalVertices: null, _indices: null, _texCoordinateBuffer: null, _verticesBuffer: null, _indicesBuffer: null, ctor: function (gridSize, texture, flipped) {
    cc.GridBase.prototype.ctor.call(this);
    this._texCoordinates = null;
    this._vertices = null;
    this._originalVertices = null;
    this._indices = null;
    this._texCoordinateBuffer = null;
    this._verticesBuffer = null;
    this._indicesBuffer = null;
    if (gridSize !== undefined)this.initWithSize(gridSize, texture, flipped)
}, vertex: function (pos) {
    if (pos.x !==
        (0 | pos.x) || pos.y !== (0 | pos.y))cc.log("cc.Grid3D.vertex() : Numbers must be integers");
    var index = 0 | (pos.x * (this._gridSize.height + 1) + pos.y) * 3;
    var locVertices = this._vertices;
    return new cc.Vertex3F(locVertices[index], locVertices[index + 1], locVertices[index + 2])
}, originalVertex: function (pos) {
    if (pos.x !== (0 | pos.x) || pos.y !== (0 | pos.y))cc.log("cc.Grid3D.originalVertex() : Numbers must be integers");
    var index = 0 | (pos.x * (this._gridSize.height + 1) + pos.y) * 3;
    var locOriginalVertices = this._originalVertices;
    return new cc.Vertex3F(locOriginalVertices[index],
        locOriginalVertices[index + 1], locOriginalVertices[index + 2])
}, setVertex: function (pos, vertex) {
    if (pos.x !== (0 | pos.x) || pos.y !== (0 | pos.y))cc.log("cc.Grid3D.setVertex() : Numbers must be integers");
    var index = 0 | (pos.x * (this._gridSize.height + 1) + pos.y) * 3;
    var vertArray = this._vertices;
    vertArray[index] = vertex.x;
    vertArray[index + 1] = vertex.y;
    vertArray[index + 2] = vertex.z;
    this._dirty = true
}, blit: function () {
    var n = this._gridSize.width * this._gridSize.height;
    cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSITION | cc.VERTEX_ATTRIB_FLAG_TEX_COORDS);
    this._shaderProgram.use();
    this._shaderProgram.setUniformsForBuiltins();
    var gl = cc._renderContext, locDirty = this._dirty;
    gl.bindBuffer(gl.ARRAY_BUFFER, this._verticesBuffer);
    if (locDirty)gl.bufferData(gl.ARRAY_BUFFER, this._vertices, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._texCoordinateBuffer);
    if (locDirty)gl.bufferData(gl.ARRAY_BUFFER, this._texCoordinates, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(cc.VERTEX_ATTRIB_TEX_COORDS,
        2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indicesBuffer);
    if (locDirty)gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._indices, gl.STATIC_DRAW);
    gl.drawElements(gl.TRIANGLES, n * 6, gl.UNSIGNED_SHORT, 0);
    if (locDirty)this._dirty = false;
    cc.incrementGLDraws(1)
}, reuse: function () {
    if (this._reuseGrid > 0) {
        var locOriginalVertices = this._originalVertices, locVertices = this._vertices;
        for (var i = 0, len = this._vertices.length; i < len; i++)locOriginalVertices[i] = locVertices[i];
        --this._reuseGrid
    }
}, calculateVertexPoints: function () {
    var gl =
        cc._renderContext;
    var width = this._texture.pixelsWidth;
    var height = this._texture.pixelsHeight;
    var imageH = this._texture.getContentSizeInPixels().height;
    var locGridSize = this._gridSize;
    var numOfPoints = (locGridSize.width + 1) * (locGridSize.height + 1);
    this._vertices = new Float32Array(numOfPoints * 3);
    this._texCoordinates = new Float32Array(numOfPoints * 2);
    this._indices = new Uint16Array(locGridSize.width * locGridSize.height * 6);
    if (this._verticesBuffer)gl.deleteBuffer(this._verticesBuffer);
    this._verticesBuffer = gl.createBuffer();
    if (this._texCoordinateBuffer)gl.deleteBuffer(this._texCoordinateBuffer);
    this._texCoordinateBuffer = gl.createBuffer();
    if (this._indicesBuffer)gl.deleteBuffer(this._indicesBuffer);
    this._indicesBuffer = gl.createBuffer();
    var x, y, i, locIndices = this._indices, locTexCoordinates = this._texCoordinates;
    var locIsTextureFlipped = this._isTextureFlipped, locVertices = this._vertices;
    for (x = 0; x < locGridSize.width; ++x)for (y = 0; y < locGridSize.height; ++y) {
        var idx = y * locGridSize.width + x;
        var x1 = x * this._step.x;
        var x2 = x1 + this._step.x;
        var y1 = y * this._step.y;
        var y2 = y1 + this._step.y;
        var a = x * (locGridSize.height + 1) + y;
        var b = (x + 1) * (locGridSize.height + 1) + y;
        var c = (x + 1) * (locGridSize.height + 1) + (y + 1);
        var d = x * (locGridSize.height + 1) + (y + 1);
        locIndices[idx * 6] = a;
        locIndices[idx * 6 + 1] = b;
        locIndices[idx * 6 + 2] = d;
        locIndices[idx * 6 + 3] = b;
        locIndices[idx * 6 + 4] = c;
        locIndices[idx * 6 + 5] = d;
        var l1 = [a * 3, b * 3, c * 3, d * 3];
        var e = {x: x1, y: y1, z: 0};
        var f = {x: x2, y: y1, z: 0};
        var g = {x: x2, y: y2, z: 0};
        var h = {x: x1, y: y2, z: 0};
        var l2 = [e, f, g, h];
        var tex1 = [a * 2, b * 2, c * 2, d * 2];
        var tex2 = [cc.p(x1, y1),
            cc.p(x2, y1), cc.p(x2, y2), cc.p(x1, y2)];
        for (i = 0; i < 4; ++i) {
            locVertices[l1[i]] = l2[i].x;
            locVertices[l1[i] + 1] = l2[i].y;
            locVertices[l1[i] + 2] = l2[i].z;
            locTexCoordinates[tex1[i]] = tex2[i].x / width;
            if (locIsTextureFlipped)locTexCoordinates[tex1[i] + 1] = (imageH - tex2[i].y) / height; else locTexCoordinates[tex1[i] + 1] = tex2[i].y / height
        }
    }
    this._originalVertices = new Float32Array(this._vertices);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this._vertices, gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,
        this._texCoordinateBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this._texCoordinates, gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._indices, gl.STATIC_DRAW);
    this._dirty = true
}});
cc.Grid3D.create = function (gridSize, texture, flipped) {
    return new cc.Grid3D(gridSize, texture, flipped)
};
cc.TiledGrid3D = cc.GridBase.extend({_texCoordinates: null, _vertices: null, _originalVertices: null, _indices: null, _texCoordinateBuffer: null, _verticesBuffer: null, _indicesBuffer: null, ctor: function (gridSize, texture, flipped) {
    cc.GridBase.prototype.ctor.call(this);
    this._texCoordinates = null;
    this._vertices = null;
    this._originalVertices = null;
    this._indices = null;
    this._texCoordinateBuffer = null;
    this._verticesBuffer = null;
    this._indicesBuffer = null;
    if (gridSize !== undefined)this.initWithSize(gridSize, texture, flipped)
}, tile: function (pos) {
    if (pos.x !==
        (0 | pos.x) || pos.y !== (0 | pos.y))cc.log("cc.TiledGrid3D.tile() : Numbers must be integers");
    var idx = (this._gridSize.height * pos.x + pos.y) * 4 * 3;
    var locVertices = this._vertices;
    return new cc.Quad3(new cc.Vertex3F(locVertices[idx], locVertices[idx + 1], locVertices[idx + 2]), new cc.Vertex3F(locVertices[idx + 3], locVertices[idx + 4], locVertices[idx + 5]), new cc.Vertex3F(locVertices[idx + 6], locVertices[idx + 7], locVertices[idx + 8]), new cc.Vertex3F(locVertices[idx + 9], locVertices[idx + 10], locVertices[idx + 11]))
}, originalTile: function (pos) {
    if (pos.x !==
        (0 | pos.x) || pos.y !== (0 | pos.y))cc.log("cc.TiledGrid3D.originalTile() : Numbers must be integers");
    var idx = (this._gridSize.height * pos.x + pos.y) * 4 * 3;
    var locOriginalVertices = this._originalVertices;
    return new cc.Quad3(new cc.Vertex3F(locOriginalVertices[idx], locOriginalVertices[idx + 1], locOriginalVertices[idx + 2]), new cc.Vertex3F(locOriginalVertices[idx + 3], locOriginalVertices[idx + 4], locOriginalVertices[idx + 5]), new cc.Vertex3F(locOriginalVertices[idx + 6], locOriginalVertices[idx + 7], locOriginalVertices[idx + 8]),
        new cc.Vertex3F(locOriginalVertices[idx + 9], locOriginalVertices[idx + 10], locOriginalVertices[idx + 11]))
}, setTile: function (pos, coords) {
    if (pos.x !== (0 | pos.x) || pos.y !== (0 | pos.y))cc.log("cc.TiledGrid3D.setTile() : Numbers must be integers");
    var idx = (this._gridSize.height * pos.x + pos.y) * 12;
    var locVertices = this._vertices;
    locVertices[idx] = coords.bl.x;
    locVertices[idx + 1] = coords.bl.y;
    locVertices[idx + 2] = coords.bl.z;
    locVertices[idx + 3] = coords.br.x;
    locVertices[idx + 4] = coords.br.y;
    locVertices[idx + 5] = coords.br.z;
    locVertices[idx +
        6] = coords.tl.x;
    locVertices[idx + 7] = coords.tl.y;
    locVertices[idx + 8] = coords.tl.z;
    locVertices[idx + 9] = coords.tr.x;
    locVertices[idx + 10] = coords.tr.y;
    locVertices[idx + 11] = coords.tr.z;
    this._dirty = true
}, blit: function () {
    var n = this._gridSize.width * this._gridSize.height;
    this._shaderProgram.use();
    this._shaderProgram.setUniformsForBuiltins();
    var gl = cc._renderContext, locDirty = this._dirty;
    cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSITION | cc.VERTEX_ATTRIB_FLAG_TEX_COORDS);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._verticesBuffer);
    if (locDirty)gl.bufferData(gl.ARRAY_BUFFER, this._vertices, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 3, gl.FLOAT, false, 0, this._vertices);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._texCoordinateBuffer);
    if (locDirty)gl.bufferData(gl.ARRAY_BUFFER, this._texCoordinates, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(cc.VERTEX_ATTRIB_TEX_COORDS, 2, gl.FLOAT, false, 0, this._texCoordinates);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indicesBuffer);
    if (locDirty)gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._indices,
        gl.STATIC_DRAW);
    gl.drawElements(gl.TRIANGLES, n * 6, gl.UNSIGNED_SHORT, 0);
    if (locDirty)this._dirty = false;
    cc.incrementGLDraws(1)
}, reuse: function () {
    if (this._reuseGrid > 0) {
        var locVertices = this._vertices, locOriginalVertices = this._originalVertices;
        for (var i = 0; i < locVertices.length; i++)locOriginalVertices[i] = locVertices[i];
        --this._reuseGrid
    }
}, calculateVertexPoints: function () {
    var width = this._texture.pixelsWidth;
    var height = this._texture.pixelsHeight;
    var imageH = this._texture.getContentSizeInPixels().height;
    var locGridSize =
        this._gridSize;
    var numQuads = locGridSize.width * locGridSize.height;
    this._vertices = new Float32Array(numQuads * 12);
    this._texCoordinates = new Float32Array(numQuads * 8);
    this._indices = new Uint16Array(numQuads * 6);
    var gl = cc._renderContext;
    if (this._verticesBuffer)gl.deleteBuffer(this._verticesBuffer);
    this._verticesBuffer = gl.createBuffer();
    if (this._texCoordinateBuffer)gl.deleteBuffer(this._texCoordinateBuffer);
    this._texCoordinateBuffer = gl.createBuffer();
    if (this._indicesBuffer)gl.deleteBuffer(this._indicesBuffer);
    this._indicesBuffer = gl.createBuffer();
    var x, y, i = 0;
    var locStep = this._step, locVertices = this._vertices, locTexCoords = this._texCoordinates, locIsTextureFlipped = this._isTextureFlipped;
    for (x = 0; x < locGridSize.width; x++)for (y = 0; y < locGridSize.height; y++) {
        var x1 = x * locStep.x;
        var x2 = x1 + locStep.x;
        var y1 = y * locStep.y;
        var y2 = y1 + locStep.y;
        locVertices[i * 12] = x1;
        locVertices[i * 12 + 1] = y1;
        locVertices[i * 12 + 2] = 0;
        locVertices[i * 12 + 3] = x2;
        locVertices[i * 12 + 4] = y1;
        locVertices[i * 12 + 5] = 0;
        locVertices[i * 12 + 6] = x1;
        locVertices[i * 12 + 7] = y2;
        locVertices[i * 12 + 8] = 0;
        locVertices[i * 12 + 9] = x2;
        locVertices[i * 12 + 10] = y2;
        locVertices[i * 12 + 11] = 0;
        var newY1 = y1;
        var newY2 = y2;
        if (locIsTextureFlipped) {
            newY1 = imageH - y1;
            newY2 = imageH - y2
        }
        locTexCoords[i * 8] = x1 / width;
        locTexCoords[i * 8 + 1] = newY1 / height;
        locTexCoords[i * 8 + 2] = x2 / width;
        locTexCoords[i * 8 + 3] = newY1 / height;
        locTexCoords[i * 8 + 4] = x1 / width;
        locTexCoords[i * 8 + 5] = newY2 / height;
        locTexCoords[i * 8 + 6] = x2 / width;
        locTexCoords[i * 8 + 7] = newY2 / height;
        i++
    }
    var locIndices = this._indices;
    for (x = 0; x < numQuads; x++) {
        locIndices[x * 6 + 0] = x * 4 + 0;
        locIndices[x * 6 + 1] = x * 4 + 1;
        locIndices[x * 6 + 2] = x * 4 + 2;
        locIndices[x * 6 + 3] = x * 4 + 1;
        locIndices[x * 6 + 4] = x * 4 + 2;
        locIndices[x * 6 + 5] = x * 4 + 3
    }
    this._originalVertices = new Float32Array(this._vertices);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this._vertices, gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._texCoordinateBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this._texCoordinates, gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        this._indices, gl.DYNAMIC_DRAW);
    this._dirty = true
}});
cc.TiledGrid3D.create = function (gridSize, texture, flipped) {
    return new cc.TiledGrid3D(gridSize, texture, flipped)
};
cc.Grabber = cc.Class.extend({_FBO: null, _oldFBO: null, _oldClearColor: null, _gl: null, ctor: function () {
    cc._checkWebGLRenderMode();
    this._gl = cc._renderContext;
    this._oldClearColor = [0, 0, 0, 0];
    this._oldFBO = null;
    this._FBO = this._gl.createFramebuffer()
}, grab: function (texture) {
    var locGL = this._gl;
    this._oldFBO = locGL.getParameter(locGL.FRAMEBUFFER_BINDING);
    locGL.bindFramebuffer(locGL.FRAMEBUFFER, this._FBO);
    locGL.framebufferTexture2D(locGL.FRAMEBUFFER, locGL.COLOR_ATTACHMENT0, locGL.TEXTURE_2D, texture._webTextureObj, 0);
    var status = locGL.checkFramebufferStatus(locGL.FRAMEBUFFER);
    if (status != locGL.FRAMEBUFFER_COMPLETE)cc.log("Frame Grabber: could not attach texture to frmaebuffer");
    locGL.bindFramebuffer(locGL.FRAMEBUFFER, this._oldFBO)
}, beforeRender: function (texture) {
    var locGL = this._gl;
    this._oldFBO = locGL.getParameter(locGL.FRAMEBUFFER_BINDING);
    locGL.bindFramebuffer(locGL.FRAMEBUFFER, this._FBO);
    this._oldClearColor = locGL.getParameter(locGL.COLOR_CLEAR_VALUE);
    locGL.clearColor(0, 0, 0, 0);
    locGL.clear(locGL.COLOR_BUFFER_BIT |
        locGL.DEPTH_BUFFER_BIT)
}, afterRender: function (texture) {
    var locGL = this._gl;
    locGL.bindFramebuffer(locGL.FRAMEBUFFER, this._oldFBO);
    locGL.colorMask(true, true, true, true)
}, destroy: function () {
    this._gl.deleteFramebuffer(this._FBO)
}});