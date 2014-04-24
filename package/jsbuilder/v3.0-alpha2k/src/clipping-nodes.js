cc.stencilBits = -1;
cc.setProgram = function (node, program) {
    node.shaderProgram = program;
    var children = node.children;
    if (!children)return;
    for (var i = 0; i < children.length; i++)cc.setProgram(children[i], program)
};
cc.ClippingNode = cc.Node.extend({alphaThreshold: 0, inverted: false, _stencil: null, _godhelpme: false, ctor: function (stencil) {
    cc.Node.prototype.ctor.call(this);
    this._stencil = null;
    this.alphaThreshold = 0;
    this.inverted = false;
    stencil = stencil || null;
    cc.ClippingNode.prototype.init.call(this, stencil)
}, init: null, _className: "ClippingNode", _initForWebGL: function (stencil) {
    this._stencil = stencil;
    this.alphaThreshold = 1;
    this.inverted = false;
    cc.ClippingNode._init_once = true;
    if (cc.ClippingNode._init_once) {
        cc.stencilBits = cc._renderContext.getParameter(cc._renderContext.STENCIL_BITS);
        if (cc.stencilBits <= 0)cc.log("Stencil buffer is not enabled.");
        cc.ClippingNode._init_once = false
    }
    return true
}, _initForCanvas: function (stencil) {
    this._stencil = stencil;
    this.alphaThreshold = 1;
    this.inverted = false
}, onEnter: function () {
    cc.Node.prototype.onEnter.call(this);
    this._stencil.onEnter()
}, onEnterTransitionDidFinish: function () {
    cc.Node.prototype.onEnterTransitionDidFinish.call(this);
    this._stencil.onEnterTransitionDidFinish()
}, onExitTransitionDidStart: function () {
    this._stencil.onExitTransitionDidStart();
    cc.Node.prototype.onExitTransitionDidStart.call(this)
}, onExit: function () {
    this._stencil.onExit();
    cc.Node.prototype.onExit.call(this)
}, visit: null, _visitForWebGL: function (ctx) {
    var gl = ctx || cc._renderContext;
    if (cc.stencilBits < 1) {
        cc.Node.prototype.visit.call(this, ctx);
        return
    }
    if (!this._stencil || !this._stencil.visible) {
        if (this.inverted)cc.Node.prototype.visit.call(this, ctx);
        return
    }
    cc.ClippingNode._layer = -1;
    if (cc.ClippingNode._layer + 1 == cc.stencilBits) {
        cc.ClippingNode._visit_once = true;
        if (cc.ClippingNode._visit_once) {
            cc.log("Nesting more than " +
                cc.stencilBits + "stencils is not supported. Everything will be drawn without stencil for this node and its childs.");
            cc.ClippingNode._visit_once = false
        }
        cc.Node.prototype.visit.call(this, ctx);
        return
    }
    cc.ClippingNode._layer++;
    var mask_layer = 1 << cc.ClippingNode._layer;
    var mask_layer_l = mask_layer - 1;
    var mask_layer_le = mask_layer | mask_layer_l;
    var currentStencilEnabled = gl.isEnabled(gl.STENCIL_TEST);
    var currentStencilWriteMask = gl.getParameter(gl.STENCIL_WRITEMASK);
    var currentStencilFunc = gl.getParameter(gl.STENCIL_FUNC);
    var currentStencilRef = gl.getParameter(gl.STENCIL_REF);
    var currentStencilValueMask = gl.getParameter(gl.STENCIL_VALUE_MASK);
    var currentStencilFail = gl.getParameter(gl.STENCIL_FAIL);
    var currentStencilPassDepthFail = gl.getParameter(gl.STENCIL_PASS_DEPTH_FAIL);
    var currentStencilPassDepthPass = gl.getParameter(gl.STENCIL_PASS_DEPTH_PASS);
    gl.enable(gl.STENCIL_TEST);
    gl.stencilMask(mask_layer);
    var currentDepthWriteMask = gl.getParameter(gl.DEPTH_WRITEMASK);
    gl.depthMask(false);
    gl.stencilFunc(gl.NEVER, mask_layer, mask_layer);
    gl.stencilOp(!this.inverted ? gl.ZERO : gl.REPLACE, gl.KEEP, gl.KEEP);
    cc._drawingUtil.drawSolidRect(cc.p(0, 0), cc.pFromSize(cc.director.getWinSize()), cc.color(255, 255, 255, 255));
    gl.stencilFunc(gl.NEVER, mask_layer, mask_layer);
    gl.stencilOp(!this.inverted ? gl.REPLACE : gl.ZERO, gl.KEEP, gl.KEEP);
    if (this.alphaThreshold < 1) {
        var program = cc.shaderCache.programForKey(cc.SHADER_POSITION_TEXTURECOLORALPHATEST);
        var alphaValueLocation = gl.getUniformLocation(program.getProgram(), cc.UNIFORM_ALPHA_TEST_VALUE_S);
        cc.glUseProgram(program.getProgram());
        program.setUniformLocationWith1f(alphaValueLocation, this.alphaThreshold);
        cc.setProgram(this._stencil, program)
    }
    cc.kmGLPushMatrix();
    this.transform();
    this._stencil.visit();
    cc.kmGLPopMatrix();
    gl.depthMask(currentDepthWriteMask);
    gl.stencilFunc(gl.EQUAL, mask_layer_le, mask_layer_le);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
    cc.Node.prototype.visit.call(this, ctx);
    gl.stencilFunc(currentStencilFunc, currentStencilRef, currentStencilValueMask);
    gl.stencilOp(currentStencilFail, currentStencilPassDepthFail, currentStencilPassDepthPass);
    gl.stencilMask(currentStencilWriteMask);
    if (!currentStencilEnabled)gl.disable(gl.STENCIL_TEST);
    cc.ClippingNode._layer--
}, _visitForCanvas: function (ctx) {
    if (!this._stencil || !this._stencil.visible) {
        if (this.inverted)cc.Node.prototype.visit.call(this, ctx);
        return
    }
    var context = ctx || cc._renderContext;
    if (this._cangodhelpme() || this._stencil instanceof cc.Sprite) {
        var canvas = context.canvas;
        var locCache = cc.ClippingNode._getSharedCache();
        locCache.width = canvas.width;
        locCache.height = canvas.height;
        var locCacheCtx = locCache.getContext("2d");
        locCacheCtx.drawImage(canvas, 0, 0);
        context.save();
        cc.Node.prototype.visit.call(this, context);
        context.globalCompositeOperation = this.inverted ? "destination-out" : "destination-in";
        this.transform(context);
        this._stencil.visit();
        context.restore();
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.globalCompositeOperation = "destination-over";
        context.drawImage(locCache, 0, 0);
        context.restore()
    } else {
        var i, children = this._children, locChild;
        context.save();
        this.transform(context);
        this._stencil.visit(context);
        context.clip();
        this._cangodhelpme(true);
        var len = children.length;
        if (len > 0) {
            this.sortAllChildren();
            for (i = 0; i < len; i++) {
                locChild = children[i];
                if (locChild._localZOrder < 0)locChild.visit(context); else break
            }
            this.draw(context);
            for (; i < len; i++)children[i].visit(context)
        } else this.draw(context);
        this._cangodhelpme(false);
        context.restore()
    }
}, getStencil: function () {
    return this._stencil
}, setStencil: null, _setStencilForWebGL: function (stencil) {
    this._stencil = stencil
}, _setStencilForCanvas: function (stencil) {
    this._stencil =
        stencil;
    var locEGL_ScaleX = cc.view.getScaleX(), locEGL_ScaleY = cc.view.getScaleY();
    var locContext = cc._renderContext;
    if (stencil instanceof cc.Sprite)return; else if (stencil instanceof cc.DrawNode)stencil.draw = function () {
        for (var i = 0; i < stencil._buffer.length; i++) {
            var element = stencil._buffer[i];
            var vertices = element.verts;
            var firstPoint = vertices[0];
            locContext.beginPath();
            locContext.moveTo(firstPoint.x * locEGL_ScaleX, -firstPoint.y * locEGL_ScaleY);
            for (var j = 1, len = vertices.length; j < len; j++)locContext.lineTo(vertices[j].x *
                locEGL_ScaleX, -vertices[j].y * locEGL_ScaleY)
        }
    }
}, getAlphaThreshold: function () {
    return this.alphaThreshold
}, setAlphaThreshold: function (alphaThreshold) {
    this.alphaThreshold = alphaThreshold
}, isInverted: function () {
    return this.inverted
}, setInverted: function (inverted) {
    this.inverted = inverted
}, _cangodhelpme: function (godhelpme) {
    if (godhelpme === true || godhelpme === false)cc.ClippingNode.prototype._godhelpme = godhelpme;
    return cc.ClippingNode.prototype._godhelpme
}});
var _p = cc.ClippingNode.prototype;
if (cc._renderType === cc._RENDER_TYPE_WEBGL) {
    _p.init = _p._initForWebGL;
    _p.visit = _p._visitForWebGL;
    _p.setStencil = _p._setStencilForWebGL
} else {
    _p.init = _p._initForCanvas;
    _p.visit = _p._visitForCanvas;
    _p.setStencil = _p._setStencilForCanvas
}
cc.defineGetterSetter(_p, "stencil", _p.getStencil, _p.setStencil);
_p.stencil;
cc.ClippingNode._init_once = null;
cc.ClippingNode._visit_once = null;
cc.ClippingNode._layer = null;
cc.ClippingNode._sharedCache = null;
cc.ClippingNode._getSharedCache = function () {
    return cc.ClippingNode._sharedCache || (cc.ClippingNode._sharedCache = document.createElement("canvas"))
};
cc.ClippingNode.create = function (stencil) {
    return new cc.ClippingNode(stencil)
};