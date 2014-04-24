(function () {
    var box2dAPI = {_ignoreBodyRotation: false, _body: null, _PTMRatio: 32, _rotation: 1, ctor: function (fileName, rect) {
        cc.Sprite.prototype.ctor.call(this);
        if (fileName === undefined)cc.PhysicsSprite.prototype.init.call(this); else if (typeof fileName === "string")if (fileName[0] === "#") {
            var frameName = fileName.substr(1, fileName.length - 1);
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
            this.initWithSpriteFrame(spriteFrame)
        } else this.init(fileName, rect); else if (typeof fileName === "object")if (fileName instanceof
            cc.Texture2D)this.initWithTexture(fileName, rect); else if (fileName instanceof cc.SpriteFrame)this.initWithSpriteFrame(fileName)
    }, setBody: function (body) {
        this._body = body
    }, getBody: function () {
        return this._body
    }, setPTMRatio: function (r) {
        this._PTMRatio = r
    }, getPTMRatio: function () {
        return this._PTMRatio
    }, getPosition: function () {
        var pos = this._body.GetPosition();
        var locPTMRatio = this._PTMRatio;
        return cc.p(pos.x * locPTMRatio, pos.y * locPTMRatio)
    }, setPosition: function (p) {
        var angle = this._body.GetAngle();
        var locPTMRatio =
            this._PTMRatio;
        this._body.setTransform(Box2D.b2Vec2(p.x / locPTMRatio, p.y / locPTMRatio), angle);
        this.setNodeDirty()
    }, getRotation: function () {
        return this._ignoreBodyRotation ? cc.radiansToDegress(this._rotationRadians) : cc.radiansToDegress(this._body.GetAngle())
    }, setRotation: function (r) {
        if (this._ignoreBodyRotation)this._rotation = r; else {
            var locBody = this._body;
            var p = locBody.GetPosition();
            locBody.SetTransform(p, cc.degreesToRadians(r))
        }
        this.setNodeDirty()
    }, _syncPosition: function () {
        var pos = this._body.GetPosition();
        this._position.x = pos.x * this._PTMRatio;
        this._position.y = pos.y * this._PTMRatio;
        this._rotationRadians = this._rotation * (Math.PI / 180)
    }, _syncRotation: function () {
        this._rotationRadians = this._body.GetAngle()
    }, visit: function () {
        if (this._body && this._PTMRatio) {
            this._syncPosition();
            if (!this._ignoreBodyRotation)this._syncRotation()
        } else cc.log("PhysicsSprite body or PTIMRatio was not set");
        this._super()
    }, setIgnoreBodyRotation: function (b) {
        this._ignoreBodyRotation = b
    }};
    var chipmunkAPI = {_ignoreBodyRotation: false, _body: null,
        _rotation: 1, ctor: function (fileName, rect) {
            cc.Sprite.prototype.ctor.call(this);
            if (fileName === undefined)cc.PhysicsSprite.prototype.init.call(this); else if (typeof fileName === "string")if (fileName[0] === "#") {
                var frameName = fileName.substr(1, fileName.length - 1);
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
                this.initWithSpriteFrame(spriteFrame)
            } else this.init(fileName, rect); else if (typeof fileName === "object")if (fileName instanceof cc.Texture2D)this.initWithTexture(fileName, rect); else if (fileName instanceof
                cc.SpriteFrame)this.initWithSpriteFrame(fileName)
        }, setBody: function (body) {
            this._body = body
        }, getBody: function () {
            return this._body
        }, getPosition: function () {
            var locBody = this._body;
            return{x: locBody.p.x, y: locBody.p.y}
        }, getPositionX: function () {
            return this._body.p.x
        }, getPositionY: function () {
            return this._body.p.y
        }, setPosition: function (newPosOrxValue, yValue) {
            if (yValue === undefined) {
                this._body.p.x = newPosOrxValue.x;
                this._body.p.y = newPosOrxValue.y
            } else {
                this._body.p.x = newPosOrxValue;
                this._body.p.y = yValue
            }
        }, setPositionX: function (xValue) {
            this._body.p.x =
                xValue
        }, setPositionY: function (yValue) {
            this._body.p.y = yValue
        }, _syncPosition: function () {
            var locPosition = this._position, locBody = this._body;
            if (locPosition.x != locBody.p.x || locPosition.y != locBody.p.y)cc.Sprite.prototype.setPosition.call(this, locBody.p.x, locBody.p.y)
        }, getRotation: function () {
            return this._ignoreBodyRotation ? cc.radiansToDegress(this._rotationRadiansX) : -cc.radiansToDegress(this._body.a)
        }, setRotation: function (r) {
            if (this._ignoreBodyRotation)cc.Sprite.prototype.setRotation.call(this, r); else this._body.a = -cc.degreesToRadians(r)
        }, _syncRotation: function () {
            if (this._rotationRadiansX != -this._body.a)cc.Sprite.prototype.setRotation.call(this, -cc.radiansToDegress(this._body.a))
        }, nodeToParentTransform: function () {
            if (cc._renderType === cc._RENDER_TYPE_CANVAS)return this._nodeToParentTransformForCanvas();
            var locBody = this._body, locAnchorPIP = this._anchorPointInPoints, locScaleX = this._scaleX, locScaleY = this._scaleY;
            var x = locBody.p.x;
            var y = locBody.p.y;
            if (this._ignoreAnchorPointForPosition) {
                x += locAnchorPIP.x;
                y += locAnchorPIP.y
            }
            var radians =
                locBody.a;
            var c = Math.cos(radians);
            var s = Math.sin(radians);
            if (!cc._rectEqualToZero(locAnchorPIP)) {
                x += c * -locAnchorPIP.x * locScaleX + -s * -locAnchorPIP.y * locScaleY;
                y += s * -locAnchorPIP.x * locScaleX + c * -locAnchorPIP.y * locScaleY
            }
            this._transform = cc.AffineTransformMake(c * locScaleX, s * locScaleX, -s * locScaleY, c * locScaleY, x, y);
            return this._transform
        }, _nodeToParentTransformForCanvas: function () {
            if (this.dirty) {
                var t = this._transform;
                var locBody = this._body, locScaleX = this._scaleX, locScaleY = this._scaleY, locAnchorPIP = this._anchorPointInPoints;
                t.tx = locBody.p.x;
                t.ty = locBody.p.y;
                var radians = -locBody.a;
                var Cos = 1, Sin = 0;
                if (radians) {
                    Cos = Math.cos(radians);
                    Sin = Math.sin(radians)
                }
                t.a = t.d = Cos;
                t.b = -Sin;
                t.c = Sin;
                if (locScaleX !== 1 || locScaleY !== 1) {
                    t.a *= locScaleX;
                    t.c *= locScaleX;
                    t.b *= locScaleY;
                    t.d *= locScaleY
                }
                t.tx += Cos * -locAnchorPIP.x * locScaleX + -Sin * locAnchorPIP.y * locScaleY;
                t.ty -= Sin * -locAnchorPIP.x * locScaleX + Cos * locAnchorPIP.y * locScaleY;
                if (this._ignoreAnchorPointForPosition) {
                    t.tx += locAnchorPIP.x;
                    t.ty += locAnchorPIP.y
                }
                this._transformDirty = false
            }
            return this._transform
        },
        isDirty: function () {
            return!this._body.isSleeping()
        }, setDirty: function () {
        }, setIgnoreBodyRotation: function (b) {
            this._ignoreBodyRotation = b
        }};
    cc.PhysicsSprite = cc.Sprite.extend(chipmunkAPI);
    cc.PhysicsSprite._className = "PhysicsSprite";
    var _p = cc.PhysicsSprite.prototype;
    _p.body;
    cc.defineGetterSetter(_p, "body", _p.getBody, _p.setBody);
    _p.dirty;
    cc.defineGetterSetter(_p, "dirty", _p.isDirty, _p.setDirty);
    cc.PhysicsSprite.create = function (fileName, rect) {
        return new cc.PhysicsSprite(fileName, rect)
    }
})();
cc.__convertVerts = function (verts) {
    var ret = [];
    for (var i = 0; i < verts.length / 2; i++)ret[i] = {x: verts[i * 2], y: verts[i * 2 + 1]};
    return ret
};
cc.ColorForBody = function (body) {
    if (body.isRogue() || body.isSleeping())return cc.color(128, 128, 128, 128); else if (body.nodeIdleTime > body.space.sleepTimeThreshold)return cc.color(84, 84, 84, 128); else return cc.color(255, 0, 0, 128)
};
cc.DrawShape = function (shape, renderer) {
    var body = shape.body;
    var color = cc.ColorForBody(body);
    switch (shape.collisionCode) {
        case cp.CircleShape.prototype.collisionCode:
            this.drawDot(shape.tc, Math.max(shape.r, 1), color);
            this.drawSegment(shape.tc, cp.v.add(shape.tc, cp.v.mult(body.rot, shape.r)), 1, color);
            break;
        case cp.SegmentShape.prototype.collisionCode:
            this.drawSegment(shape.ta, shape.tb, Math.max(shape.r, 2), color);
            break;
        case cp.PolyShape.prototype.collisionCode:
            var line = cc.color(color.r, color.g, color.b, cc.lerp(color.a,
                255, 0.5));
            this.drawPoly(cc.__convertVerts(shape.tVerts), color, 1, line);
            break;
        default:
            cc.log("cc.DrawShape(): Bad assertion in DrawShape()");
            break
    }
};
cc.DrawConstraint = function (constraint, renderer) {
    var body_a = constraint.a;
    var body_b = constraint.b;
    var a, b;
    if (constraint instanceof cp.PinJoint) {
        a = body_a.local2World(constraint.anchr1);
        b = body_b.local2World(constraint.anchr2);
        this.drawDot(a, 3, cc.CONSTRAINT_COLOR);
        this.drawDot(b, 3, cc.CONSTRAINT_COLOR);
        this.drawSegment(a, b, 1, cc.CONSTRAINT_COLOR)
    } else if (constraint instanceof cp.SlideJoint) {
        a = body_a.local2World(constraint.anchr1);
        b = body_b.local2World(constraint.anchr2);
        this.drawDot(a, 3, cc.CONSTRAINT_COLOR);
        this.drawDot(b, 3, cc.CONSTRAINT_COLOR);
        this.drawSegment(a, b, 1, cc.CONSTRAINT_COLOR)
    } else if (constraint instanceof cp.PivotJoint) {
        a = body_a.local2World(constraint.anchr1);
        b = body_b.local2World(constraint.anchr2);
        this.drawDot(a, 3, cc.CONSTRAINT_COLOR);
        this.drawDot(b, 3, cc.CONSTRAINT_COLOR)
    } else if (constraint instanceof cp.GrooveJoint) {
        a = body_a.local2World(constraint.grv_a);
        b = body_a.local2World(constraint.grv_b);
        var c = body_b.local2World(constraint.anchr2);
        this.drawDot(c, 3, cc.CONSTRAINT_COLOR);
        this.drawSegment(a,
            b, 1, cc.CONSTRAINT_COLOR)
    } else if (constraint instanceof cp.DampedSpring); else;
};
cc.CONSTRAINT_COLOR = cc.color(0, 255, 0, 128);
cc.PhysicsDebugNode = cc.DrawNode.extend({space: null, _spaceObj: null, _className: "PhysicsDebugNode", getSpace: function () {
    return this.space
}, setSpace: function (space) {
    this.space = space
}, draw: function (context) {
    if (!this.space)return;
    this.space.eachShape(cc.DrawShape.bind(this));
    this.space.eachConstraint(cc.DrawConstraint.bind(this));
    cc.DrawNode.prototype.draw.call(this);
    this.clear()
}});
cc.PhysicsDebugNode.debugNodeForChipmunkSpace = function (space) {
    var node = new cc.PhysicsDebugNode;
    if (node.init()) {
        node._spaceObj = space;
        node.space = space.space;
        return node
    }
    return null
};
cc.PhysicsDebugNode.debugNodeForCPSpace = function (space) {
    var node = new cc.PhysicsDebugNode;
    if (node.init()) {
        node.space = space;
        return node
    }
    return null
};
cc.PhysicsDebugNode.create = cc.PhysicsDebugNode.debugNodeForCPSpace;