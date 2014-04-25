var ccui = ccui || {};
ccui.Class = ccui.Class || cc.Class;
ccui.Class.extend = ccui.Class.extend || cc.Class.extend;
ccui.Node = ccui.Node || cc.Node;
ccui.Node.extend = ccui.Node.extend || cc.Node.extend;
ccui.cocosGUIVersion = "CocosGUI v1.0.0.0";
ccui.Widget = ccui.Node.extend({_enabled: true, _bright: true, _touchEnabled: false, _touchPassedEnabled: false, _focus: false, _brightStyle: null, _updateEnabled: false, _touchStartPos: null, _touchMovePos: null, _touchEndPos: null, _touchEventListener: null, _touchEventSelector: null, _name: "default", _widgetType: null, _actionTag: 0, _size: null, _customSize: null, _layoutParameterDictionary: null, _ignoreSize: false, _widgetChildren: null, _affectByClipping: false, _sizeType: null, _sizePercent: null, positionType: null, _positionPercent: null,
    _reorderWidgetChildDirty: false, _hitted: false, _nodes: null, _touchListener: null, _color: null, _className: "Widget", _flippedX: false, _flippedY: false, ctor: function () {
        cc.Node.prototype.ctor.call(this);
        this._enabled = true;
        this._bright = true;
        this._touchEnabled = false;
        this._touchPassedEnabled = false;
        this._focus = false;
        this._brightStyle = ccui.Widget.BRIGHT_STYLE_NONE;
        this._updateEnabled = false;
        this._touchStartPos = cc.p(0, 0);
        this._touchMovePos = cc.p(0, 0);
        this._touchEndPos = cc.p(0, 0);
        this._touchEventListener = null;
        this._touchEventSelector =
            null;
        this._name = "default";
        this._widgetType = ccui.Widget.TYPE_WIDGET;
        this._actionTag = 0;
        this._size = cc.size(0, 0);
        this._customSize = cc.size(0, 0);
        this._layoutParameterDictionary = {};
        this._ignoreSize = false;
        this._widgetChildren = [];
        this._affectByClipping = false;
        this._sizeType = ccui.Widget.SIZE_ABSOLUTE;
        this._sizePercent = cc.p(0, 0);
        this.positionType = ccui.Widget.POSITION_ABSOLUTE;
        this._positionPercent = cc.p(0, 0);
        this._reorderWidgetChildDirty = false;
        this._hitted = false;
        this._nodes = [];
        this._color = cc.color(255, 255, 255,
            255);
        this._touchListener = null;
        this._flippedX = false;
        this._flippedY = false
    }, init: function () {
        if (cc.Node.prototype.init.call(this)) {
            this._layoutParameterDictionary = {};
            this._widgetChildren = [];
            this.initRenderer();
            this.setBright(true);
            this.ignoreContentAdaptWithSize(true);
            this.setAnchorPoint(cc.p(0.5, 0.5))
        }
        return true
    }, onEnter: function () {
        this.updateSizeAndPosition();
        cc.Node.prototype.onEnter.call(this)
    }, visit: function (ctx) {
        if (this._enabled)cc.Node.prototype.visit.call(this, ctx)
    }, sortAllChildren: function () {
        this._reorderWidgetChildDirty =
            this._reorderChildDirty;
        cc.Node.prototype.sortAllChildren.call(this);
        if (this._reorderWidgetChildDirty) {
            var _children = this._widgetChildren;
            var i, j, length = _children.length, tempChild;
            for (i = 0; i < length; i++) {
                var tempItem = _children[i];
                j = i - 1;
                tempChild = _children[j];
                while (j >= 0 && (tempItem._localZOrder < tempChild._localZOrder || tempItem._localZOrder == tempChild._localZOrder && tempItem.arrivalOrder < tempChild.arrivalOrder)) {
                    _children[j + 1] = tempChild;
                    j = j - 1;
                    tempChild = _children[j]
                }
                _children[j + 1] = tempItem
            }
            this._reorderWidgetChildDirty =
                false
        }
    }, addChild: function (widget, zOrder, tag) {
        if (widget instanceof ccui.Widget) {
            cc.Node.prototype.addChild.call(this, widget, zOrder, tag);
            this._widgetChildren.push(widget);
            return
        }
        if (widget instanceof cc.Node) {
            cc.log("Please use addNode to add a CCNode.");
            return
        }
    }, getChildByTag: function (tag) {
        var __children = this._widgetChildren;
        if (__children != null)for (var i = 0; i < __children.length; i++) {
            var node = __children[i];
            if (node && node._tag == tag)return node
        }
        return null
    }, getChildren: function () {
        return this._widgetChildren
    },
    getChildrenCount: function () {
        return this._widgetChildren.length
    }, getWidgetParent: function () {
        var widget = this.getParent();
        if (widget instanceof ccui.Widget)return widget;
        return null
    }, removeChild: function (widget, cleanup) {
        if (!(widget instanceof ccui.Widget)) {
            cc.log("child must a type of ccui.Widget");
            return
        }
        cc.Node.prototype.removeChild.call(this, widget, cleanup);
        cc.arrayRemoveObject(this._widgetChildren, widget)
    }, removeChildByTag: function (tag, cleanup) {
        var child = this.getChildByTag(tag);
        if (child == null)cc.log("cocos2d: removeChildByTag(tag \x3d " +
            tag + "): child not found!"); else this.removeChild(child, cleanup)
    }, removeAllChildren: function (cleanup) {
        for (var i = 0; i < this._widgetChildren.length; i++) {
            var widget = this._widgetChildren[i];
            cc.Node.prototype.removeChild.call(this, widget, cleanup)
        }
        this._widgetChildren.length = 0
    }, setEnabled: function (enabled) {
        this._enabled = enabled;
        var arrayChildren = this._widgetChildren;
        var childrenCount = arrayChildren.length;
        for (var i = 0; i < childrenCount; i++) {
            var child = arrayChildren[i];
            child.setEnabled(enabled)
        }
    }, getChildByName: function (name) {
        var arrayChildren =
            this._widgetChildren;
        var childrenCount = arrayChildren.length;
        for (var i = 0; i < childrenCount; i++) {
            var child = arrayChildren[i];
            if (child.getName() == name)return child
        }
    }, initRenderer: function () {
    }, addNode: function (node, zOrder, tag) {
        if (node instanceof ccui.Widget) {
            cc.log("Please use addChild to add a Widget.");
            return
        }
        cc.Node.prototype.addChild.call(this, node, zOrder, tag);
        this._nodes.push(node)
    }, getNodeByTag: function (tag) {
        var _nodes = this._nodes;
        for (var i = 0; i < _nodes.length; i++) {
            var node = _nodes[i];
            if (node && node.getTag() ==
                tag)return node
        }
        return null
    }, getNodes: function () {
        return this._nodes
    }, removeNode: function (node, cleanup) {
        cc.Node.prototype.removeChild.call(this, node);
        cc.arrayRemoveObject(this._nodes, node)
    }, removeNodeByTag: function (tag, cleanup) {
        var node = this.getNodeByTag(tag);
        if (!node)cc.log("cocos2d: removeNodeByTag(tag \x3d %d): child not found!", tag); else this.removeNode(node)
    }, removeAllNodes: function () {
        for (var i = 0; i < this._nodes.length; i++) {
            var node = this._nodes[i];
            cc.Node.prototype.removeChild.call(this, node)
        }
        this._nodes.length =
            0
    }, setSize: function (size) {
        var locW = this._customSize.width = size.width;
        var locH = this._customSize.height = size.height;
        if (this._ignoreSize) {
            locW = this.width;
            locH = this.height
        }
        this._size.width = locW;
        this._size.height = locH;
        if (this._running) {
            var widgetParent = this.getWidgetParent();
            if (widgetParent) {
                locW = widgetParent.width;
                locH = widgetParent.height
            } else {
                locW = this._parent.width;
                locH = this._parent.height
            }
            this._sizePercent.x = locW > 0 ? this._customSize.width / locW : 0;
            this._sizePercent.y = locH > 0 ? this._customSize.height / locH :
                0
        }
        this.onSizeChanged()
    }, _setWidth: function (w) {
        var locW = this._customSize.width = w;
        this._ignoreSize && (locW = this.width);
        this._size.width = locW;
        if (this._running) {
            var widgetParent = this.getWidgetParent();
            locW = widgetParent ? widgetParent.width : this._parent.width;
            this._sizePercent.x = locW > 0 ? this._customSize.width / locW : 0
        }
        this.onSizeChanged()
    }, _setHeight: function (h) {
        var locH = this._customSize.height = h;
        this._ignoreSize && (locH = this.height);
        this._size.height = locH;
        if (this._running) {
            var widgetParent = this.getWidgetParent();
            locH = widgetParent ? widgetParent.height : this._parent.height;
            this._sizePercent.y = locH > 0 ? this._customSize.height / locH : 0
        }
        this.onSizeChanged()
    }, setSizePercent: function (percent) {
        this._sizePercent.x = percent.x;
        this._sizePercent.y = percent.y;
        var width = this._customSize.width, height = this._customSize.height;
        if (this._running) {
            var widgetParent = this.getWidgetParent();
            if (widgetParent) {
                width = widgetParent.width * percent.x;
                height = widgetParent.height * percent.y
            } else {
                width = this._parent.width * percent.x;
                height = this._parent.height *
                    percent.y
            }
        }
        if (!this._ignoreSize) {
            this._size.width = width;
            this._size.height = height
        }
        this._customSize.width = width;
        this._customSize.height = height;
        this.onSizeChanged()
    }, _setWidthPercent: function (percent) {
        this._sizePercent.x = percent;
        var width = this._customSize.width;
        if (this._running) {
            var widgetParent = this.getWidgetParent();
            width = (widgetParent ? widgetParent.width : this._parent.width) * percent
        }
        this._ignoreSize || (this._size.width = width);
        this._customSize.width = width;
        this.onSizeChanged()
    }, _setHeightPercent: function (percent) {
        this._sizePercent.y =
            percent;
        var height = this._customSize.height;
        if (this._running) {
            var widgetParent = this.getWidgetParent();
            height = (widgetParent ? widgetParent.height : this._parent.height) * percent
        }
        this._ignoreSize || (this._size.height = height);
        this._customSize.height = height;
        this.onSizeChanged()
    }, updateSizeAndPosition: function () {
        switch (this._sizeType) {
            case ccui.Widget.SIZE_ABSOLUTE:
                var locSize;
                if (this._ignoreSize)locSize = this.getContentSize(); else locSize = this._customSize;
                this._size.width = locSize.width;
                this._size.height = locSize.height;
                var pSize, spx = 0, spy = 0;
                var widgetParent = this.getWidgetParent();
                if (widgetParent)pSize = widgetParent.getSize(); else pSize = this._parent.getContentSize();
                if (pSize.width > 0)spx = this._customSize.width / pSize.width;
                if (pSize.height > 0)spy = this._customSize.height / pSize.height;
                this._sizePercent.x = spx;
                this._sizePercent.y = spy;
                break;
            case ccui.Widget.SIZE_PERCENT:
                var widgetParent = this.getWidgetParent();
                var cSize = cc.size(0, 0);
                if (widgetParent) {
                    cSize.width = widgetParent.getSize().width * this._sizePercent.x;
                    cSize.height =
                        widgetParent.getSize().height * this._sizePercent.y
                } else {
                    cSize.width = this._parent.getContentSize().width * this._sizePercent.x;
                    cSize.height = this._parent.getContentSize().height * this._sizePercent.y
                }
                var locSize;
                if (this._ignoreSize)locSize = this.getContentSize(); else locSize = cSize;
                this._size.width = locSize.width;
                this._size.height = locSize.height;
                this._customSize.width = cSize.width;
                this._customSize.height = cSize.height;
                break;
            default:
                break
        }
        this.onSizeChanged();
        var absPos = this.getPosition();
        switch (this.positionType) {
            case ccui.Widget.POSITION_ABSOLUTE:
                var widgetParent =
                    this.getWidgetParent();
                var pSize;
                if (widgetParent)pSize = widgetParent.getSize(); else pSize = this._parent.getContentSize();
                if (pSize.width <= 0 || pSize.height <= 0) {
                    this._positionPercent.x = 0;
                    this._positionPercent.y = 0
                } else {
                    this._positionPercent.x = absPos.x / pSize.width;
                    this._positionPercent.y = absPos.y / pSize.height
                }
                break;
            case ccui.Widget.POSITION_PERCENT:
                var widgetParent = this.getWidgetParent();
                var pSize;
                if (widgetParent)pSize = widgetParent.getSize(); else pSize = this._parent.getContentSize();
                absPos = cc.p(pSize.width *
                    this._positionPercent.x, pSize.height * this._positionPercent.y);
                break;
            default:
                break
        }
        this.setPosition(absPos)
    }, setSizeType: function (type) {
        this._sizeType = type
    }, getSizeType: function () {
        return this._sizeType
    }, ignoreContentAdaptWithSize: function (ignore) {
        this._ignoreSize = ignore;
        var locSize;
        if (this._ignoreSize)locSize = this.getContentSize(); else locSize = this._customSize;
        this._size.width = locSize.width;
        this._size.height = locSize.height;
        this.onSizeChanged()
    }, isIgnoreContentAdaptWithSize: function () {
        return this._ignoreSize
    },
    getSize: function () {
        return this._size
    }, getCustomSize: function () {
        return this._customSize
    }, getSizePercent: function () {
        return this._sizePercent
    }, _getWidthPercent: function () {
        return this._sizePercent.x
    }, _getHeightPercent: function () {
        return this._sizePercent.y
    }, getWorldPosition: function () {
        return this.convertToWorldSpace(cc.p(0, 0))
    }, getVirtualRenderer: function () {
        return this
    }, onSizeChanged: function () {
        for (var i = 0; i < this._widgetChildren.length; i++) {
            var child = this._widgetChildren[i];
            child.updateSizeAndPosition()
        }
    },
    getContentSize: function () {
        return this._size
    }, _getWidth: function () {
        return this._size.width
    }, _getHeight: function () {
        return this._size.height
    }, setTouchEnabled: function (enable) {
        if (this._touchEnabled === enable)return;
        this._touchEnabled = enable;
        if (this._touchEnabled) {
            this._touchListener = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: true, onTouchBegan: this.onTouchBegan.bind(this), onTouchMoved: this.onTouchMoved.bind(this), onTouchEnded: this.onTouchEnded.bind(this)});
            cc.eventManager.addListener(this._touchListener,
                this)
        } else cc.eventManager.removeListener(this._touchListener)
    }, isTouchEnabled: function () {
        return this._touchEnabled
    }, setUpdateEnabled: function (enable) {
        if (this._updateEnabled == enable)return;
        this._updateEnabled = enable;
        if (enable)this.scheduleUpdate(); else this.unscheduleUpdate()
    }, isUpdateEnabled: function () {
        return this._updateEnabled
    }, isFocused: function () {
        return this._focus
    }, setFocused: function (fucos) {
        if (fucos == this._focus)return;
        this._focus = fucos;
        if (this._bright)if (this._focus)this.setBrightStyle(ccui.Widget.BRIGHT_STYLE_HIGH_LIGHT);
        else this.setBrightStyle(ccui.Widget.BRIGHT_STYLE_NORMAL); else this.onPressStateChangedToDisabled()
    }, setBright: function (bright, containChild) {
        this._bright = bright;
        if (this._bright) {
            this._brightStyle = ccui.Widget.BRIGHT_STYLE_NONE;
            this.setBrightStyle(ccui.Widget.BRIGHT_STYLE_NORMAL)
        } else this.onPressStateChangedToDisabled()
    }, setBrightStyle: function (style) {
        if (this._brightStyle == style)return;
        style = style || ccui.Widget.BRIGHT_STYLE_NORMAL;
        this._brightStyle = style;
        switch (this._brightStyle) {
            case ccui.Widget.BRIGHT_STYLE_NORMAL:
                this.onPressStateChangedToNormal();
                break;
            case ccui.Widget.BRIGHT_STYLE_HIGH_LIGHT:
                this.onPressStateChangedToPressed();
                break;
            default:
                break
        }
    }, onPressStateChangedToNormal: function () {
    }, onPressStateChangedToPressed: function () {
    }, onPressStateChangedToDisabled: function () {
    }, didNotSelectSelf: function () {
    }, onTouchBegan: function (touch, event) {
        var touchPoint = touch.getLocation();
        this._touchStartPos.x = touchPoint.x;
        this._touchStartPos.y = touchPoint.y;
        this._hitted = this.isEnabled() && this.isTouchEnabled() && this.hitTest(touchPoint) && this.clippingParentAreaContainPoint(touchPoint);
        if (!this._hitted)return false;
        this.setFocused(true);
        var widgetParent = this.getWidgetParent();
        if (widgetParent)widgetParent.checkChildInfo(0, this, touchPoint);
        this.pushDownEvent();
        return!this._touchPassedEnabled
    }, onTouchMoved: function (touch, event) {
        var touchPoint = touch.getLocation();
        this._touchMovePos.x = touchPoint.x;
        this._touchMovePos.y = touchPoint.y;
        this.setFocused(this.hitTest(touchPoint));
        var widgetParent = this.getWidgetParent();
        if (widgetParent)widgetParent.checkChildInfo(1, this, touchPoint);
        this.moveEvent()
    },
    onTouchEnded: function (touch, event) {
        var touchPoint = touch.getLocation();
        this._touchEndPos.x = touchPoint.x;
        this._touchEndPos.y = touchPoint.y;
        var focus = this._focus;
        this.setFocused(false);
        var widgetParent = this.getWidgetParent();
        if (widgetParent)widgetParent.checkChildInfo(2, this, touchPoint);
        if (focus)this.releaseUpEvent(); else this.cancelUpEvent()
    }, onTouchCancelled: function (touchPoint) {
        this.setFocused(false);
        this.cancelUpEvent()
    }, onTouchLongClicked: function (touchPoint) {
        this.longClickEvent()
    }, pushDownEvent: function () {
        if (this._touchEventListener &&
            this._touchEventSelector)if (this._touchEventSelector)this._touchEventSelector.call(this._touchEventListener, this, ccui.Widget.TOUCH_BEGAN)
    }, moveEvent: function () {
        if (this._touchEventListener && this._touchEventSelector)if (this._touchEventSelector)this._touchEventSelector.call(this._touchEventListener, this, ccui.Widget.TOUCH_MOVED)
    }, releaseUpEvent: function () {
        if (this._touchEventListener && this._touchEventSelector)if (this._touchEventSelector)this._touchEventSelector.call(this._touchEventListener, this, ccui.Widget.TOUCH_ENDED)
    },
    cancelUpEvent: function () {
        if (this._touchEventSelector)this._touchEventSelector.call(this._touchEventListener, this, ccui.Widget.TOUCH_CANCELED)
    }, longClickEvent: function () {
    }, addTouchEventListener: function (selector, target) {
        this._touchEventSelector = selector;
        this._touchEventListener = target
    }, hitTest: function (pt) {
        var nsp = this.convertToNodeSpace(pt);
        var bb = cc.rect(-this._size.width * this._anchorPoint.x, -this._size.height * this._anchorPoint.y, this._size.width, this._size.height);
        if (nsp.x >= bb.x && nsp.x <= bb.x + bb.width &&
            nsp.y >= bb.y && nsp.y <= bb.y + bb.height)return true;
        return false
    }, clippingParentAreaContainPoint: function (pt) {
        this._affectByClipping = false;
        var parent = this.getParent();
        var clippingParent = null;
        while (parent) {
            if (parent instanceof ccui.Layout)if (parent.isClippingEnabled()) {
                this._affectByClipping = true;
                clippingParent = parent;
                break
            }
            parent = parent.getParent()
        }
        if (!this._affectByClipping)return true;
        if (clippingParent) {
            var bRet = false;
            if (clippingParent.hitTest(pt))bRet = true;
            if (bRet)return clippingParent.clippingParentAreaContainPoint(pt);
            return false
        }
        return true
    }, checkChildInfo: function (handleState, sender, touchPoint) {
        var widgetParent = this.getWidgetParent();
        if (widgetParent)widgetParent.checkChildInfo(handleState, sender, touchPoint)
    }, setPosition: function (pos, posY) {
        if (this._running) {
            var widgetParent = this.getWidgetParent();
            if (widgetParent) {
                var pSize = widgetParent.getSize();
                if (pSize.width <= 0 || pSize.height <= 0) {
                    this._positionPercent.x = 0;
                    this._positionPercent.y = 0
                } else if (posY) {
                    this._positionPercent.x = pos / pSize.width;
                    this._positionPercent.y =
                        posY / pSize.height
                } else {
                    this._positionPercent.x = pos.x / pSize.width;
                    this._positionPercent.y = pos.y / pSize.height
                }
            }
        }
        cc.Node.prototype.setPosition.apply(this, arguments)
    }, setPositionX: function (x) {
        if (this._running) {
            var widgetParent = this.getWidgetParent();
            if (widgetParent) {
                var pw = widgetParent.width;
                if (pw <= 0)this._positionPercent.x = 0; else this._positionPercent.x = x / pw
            }
        }
        cc.Node.prototype.setPositionX.call(this, x)
    }, setPositionY: function (y) {
        if (this._running) {
            var widgetParent = this.getWidgetParent();
            if (widgetParent) {
                var ph =
                    widgetParent.height;
                if (ph <= 0)this._positionPercent.y = 0; else this._positionPercent.y = y / ph
            }
        }
        cc.Node.prototype.setPositionY.call(this, y)
    }, setPositionPercent: function (percent) {
        this._positionPercent = percent;
        if (this._running) {
            var widgetParent = this.getWidgetParent();
            if (widgetParent) {
                var parentSize = widgetParent.getSize();
                this.setPosition(parentSize.width * this._positionPercent.x, parentSize.height * this._positionPercent.y)
            }
        }
    }, _setXPercent: function (percent) {
        this._positionPercent.x = percent;
        if (this._running) {
            var widgetParent =
                this.getWidgetParent();
            if (widgetParent) {
                var absX = widgetParent.width * percent;
                this.setPositionX(absX)
            }
        }
    }, _setYPercent: function (percent) {
        this._positionPercent.y = percent;
        if (this._running) {
            var widgetParent = this.getWidgetParent();
            if (widgetParent) {
                var absY = widgetParent.height * percent;
                this.setPositionY(absY)
            }
        }
    }, updateAnchorPoint: function () {
        this.setAnchorPoint(this.getAnchorPoint())
    }, getPositionPercent: function () {
        return this._positionPercent
    }, _getXPercent: function () {
        return this._positionPercent.x
    }, _getYPercent: function () {
        return this._positionPercent.y
    },
    setPositionType: function (type) {
        this.positionType = type
    }, getPositionType: function () {
        return this.positionType
    }, setFlippedX: function (flipX) {
        this._flippedX = flipX;
        this.updateFlippedX()
    }, isFlippedX: function () {
        return this._flippedX
    }, setFlippedY: function (flipY) {
        this._flippedY = flipY;
        this.updateFlippedY()
    }, isFlippedY: function () {
        return this._flippedY
    }, updateFlippedX: function () {
    }, updateFlippedY: function () {
    }, isBright: function () {
        return this._bright
    }, isEnabled: function () {
        return this._enabled
    }, getLeftInParent: function () {
        return this.getPositionX() -
            this._getAnchorX() * this._size.width
    }, getBottomInParent: function () {
        return this.getPositionY() - this._getAnchorY() * this._size.height
    }, getRightInParent: function () {
        return this.getLeftInParent() + this._size.width
    }, getTopInParent: function () {
        return this.getBottomInParent() + this._size.height
    }, getTouchStartPos: function () {
        return this._touchStartPos
    }, getTouchMovePos: function () {
        return this._touchMovePos
    }, getTouchEndPos: function () {
        return this._touchEndPos
    }, setName: function (name) {
        this._name = name
    }, getName: function () {
        return this._name
    },
    getWidgetType: function () {
        return this._widgetType
    }, setLayoutParameter: function (parameter) {
        this._layoutParameterDictionary[parameter.getLayoutType()] = parameter
    }, getLayoutParameter: function (type) {
        return this._layoutParameterDictionary[type]
    }, getDescription: function () {
        return"Widget"
    }, clone: function () {
        var clonedWidget = this.createCloneInstance();
        clonedWidget.copyProperties(this);
        clonedWidget.copyClonedWidgetChildren(this);
        return clonedWidget
    }, createCloneInstance: function () {
        return ccui.Widget.create()
    },
    copyClonedWidgetChildren: function (model) {
        var widgetChildren = model.getChildren();
        for (var i = 0; i < widgetChildren.length; i++) {
            var locChild = widgetChildren[i];
            if (locChild instanceof ccui.Widget)this.addChild(locChild.clone())
        }
    }, copySpecialProperties: function (model) {
    }, copyProperties: function (widget) {
        this.setEnabled(widget.isEnabled());
        this.setVisible(widget.isVisible());
        this.setBright(widget.isBright());
        this.setTouchEnabled(widget.isTouchEnabled());
        this._touchPassedEnabled = false;
        this.setLocalZOrder(widget.getLocalZOrder());
        this.setUpdateEnabled(widget.isUpdateEnabled());
        this.setTag(widget.getTag());
        this.setName(widget.getName());
        this.setActionTag(widget.getActionTag());
        this._ignoreSize = widget._ignoreSize;
        this._size = cc.size(widget._size.width, widget._size.height);
        this._customSize = cc.size(widget._customSize.width, widget._customSize.height);
        this.copySpecialProperties(widget);
        this._sizeType = widget.getSizeType();
        this._sizePercent = cc.p(widget._sizePercent.x, widget._sizePercent.y);
        this.positionType = widget.positionType;
        this._positionPercent =
            cc.p(widget._positionPercent.x, widget._positionPercent.y);
        this.setPosition(widget.getPosition());
        this.setAnchorPoint(widget.getAnchorPoint());
        this.setScaleX(widget.getScaleX());
        this.setScaleY(widget.getScaleY());
        this.setRotation(widget.getRotation());
        this.setRotationX(widget.getRotationX());
        this.setRotationY(widget.getRotationY());
        this.setFlippedX(widget.isFlippedX());
        this.setFlippedY(widget.isFlippedY());
        this.setColor(widget.getColor());
        this.setOpacity(widget.getOpacity());
        for (var key in widget._layoutParameterDictionary) {
            var parameter =
                widget._layoutParameterDictionary[key];
            if (parameter)this.setLayoutParameter(parameter.clone())
        }
        this.onSizeChanged()
    }, setActionTag: function (tag) {
        this._actionTag = tag
    }, getActionTag: function () {
        return this._actionTag
    }, setColor: function (color) {
        this._color.r = color.r;
        this._color.g = color.g;
        this._color.b = color.b;
        this.updateTextureColor();
        if (color.a !== undefined && !color.a_undefined)this.setOpacity(color.a)
    }, getColor: function () {
        return cc.color(this._color.r, this._color.g, this._color.b, this._color.a)
    }, setOpacity: function (opacity) {
        this._color.a =
            opacity;
        this.updateTextureOpacity()
    }, getOpacity: function () {
        return this._color.a
    }, updateTextureColor: function () {
    }, updateTextureOpacity: function () {
    }, updateColorToRenderer: function (renderer) {
        if (renderer.RGBAProtocol)renderer.setColor(this._color)
    }, updateOpacityToRenderer: function (renderer) {
        if (renderer.RGBAProtocol)renderer.setOpacity(this._color.a)
    }});
var _p = ccui.Widget.prototype;
_p.xPercent;
cc.defineGetterSetter(_p, "xPercent", _p._getXPercent, _p._setXPercent);
_p.yPercent;
cc.defineGetterSetter(_p, "yPercent", _p._getYPercent, _p._setYPercent);
_p.widthPercent;
cc.defineGetterSetter(_p, "widthPercent", _p._getWidthPercent, _p._setWidthPercent);
_p.heightPercent;
cc.defineGetterSetter(_p, "heightPercent", _p._getHeightPercent, _p._setHeightPercent);
_p.widgetParent;
cc.defineGetterSetter(_p, "widgetParent", _p.getWidgetParent);
_p.enabled;
cc.defineGetterSetter(_p, "enabled", _p.isEnabled, _p.setEnabled);
_p.focused;
cc.defineGetterSetter(_p, "focused", _p.isFocused, _p.setFocused);
_p.sizeType;
cc.defineGetterSetter(_p, "sizeType", _p.getSizeType, _p.setSizeType);
_p.widgetType;
cc.defineGetterSetter(_p, "widgetType", _p.getWidgetType);
_p.touchEnabled;
cc.defineGetterSetter(_p, "touchEnabled", _p.isTouchEnabled, _p.setTouchEnabled);
_p.updateEnabled;
cc.defineGetterSetter(_p, "updateEnabled", _p.isUpdateEnabled, _p.setUpdateEnabled);
_p.bright;
cc.defineGetterSetter(_p, "bright", _p.isBright, _p.setBright);
_p.name;
cc.defineGetterSetter(_p, "name", _p.getName, _p.setName);
_p.actionTag;
cc.defineGetterSetter(_p, "actionTag", _p.getActionTag, _p.setActionTag);
_p = null;
ccui.Widget.create = function () {
    var widget = new ccui.Widget;
    if (widget && widget.init())return widget;
    return null
};
ccui.Widget.BRIGHT_STYLE_NONE = -1;
ccui.Widget.BRIGHT_STYLE_NORMAL = 0;
ccui.Widget.BRIGHT_STYLE_HIGH_LIGHT = 1;
ccui.Widget.TYPE_WIDGET = 0;
ccui.Widget.TYPE_CONTAINER = 1;
ccui.Widget.LOCAL_TEXTURE = 0;
ccui.Widget.PLIST_TEXTURE = 1;
ccui.Widget.TOUCH_BEGAN = 0;
ccui.Widget.TOUCH_MOVED = 1;
ccui.Widget.TOUCH_ENDED = 2;
ccui.Widget.TOUCH_CANCELED = 3;
ccui.Widget.SIZE_ABSOLUTE = 0;
ccui.Widget.SIZE_PERCENT = 1;
ccui.Widget.POSITION_ABSOLUTE = 0;
ccui.Widget.POSITION_PERCENT = 1;
ccui.Layout = ccui.Widget.extend({_clippingEnabled: null, _backGroundScale9Enabled: null, _backGroundImage: null, _backGroundImageFileName: null, _backGroundImageCapInsets: null, _colorType: null, _bgImageTexType: null, _colorRender: null, _gradientRender: null, _color: null, _startColor: null, _endColor: null, _alongVector: null, _opacity: null, _backGroundImageTextureSize: null, _layoutType: null, _doLayoutDirty: false, _clippingRectDirty: false, _clippingType: null, _clippingStencil: null, _handleScissor: false, _scissorRectDirty: false,
    _clippingRect: null, _clippingParent: null, _className: "Layout", _backGroundImageColor: null, ctor: function () {
        ccui.Widget.prototype.ctor.call(this);
        this._clippingEnabled = false;
        this._backGroundScale9Enabled = false;
        this._backGroundImage = null;
        this._backGroundImageFileName = "";
        this._backGroundImageCapInsets = cc.rect(0, 0, 0, 0);
        this._colorType = ccui.Layout.BG_COLOR_NONE;
        this._bgImageTexType = ccui.Widget.LOCAL_TEXTURE;
        this._colorRender = null;
        this._gradientRender = null;
        this._color = cc.color(255, 255, 255, 255);
        this._startColor =
            cc.color(255, 255, 255, 255);
        this._endColor = cc.color(255, 255, 255, 255);
        this._alongVector = cc.p(0, -1);
        this._opacity = 255;
        this._backGroundImageTextureSize = cc.size(0, 0);
        this._layoutType = ccui.Layout.ABSOLUTE;
        this._widgetType = ccui.Widget.TYPE_CONTAINER;
        this._doLayoutDirty = true;
        this._clippingRectDirty = true;
        this._clippingType = ccui.Layout.CLIPPING_STENCIL;
        this._clippingStencil = null;
        this._handleScissor = false;
        this._scissorRectDirty = false;
        this._clippingRect = cc.rect(0, 0, 0, 0);
        this._clippingParent = null;
        this._backGroundImageColor =
            cc.color(255, 255, 255, 255)
    }, init: function () {
        if (cc.Node.prototype.init.call(this)) {
            this._layoutParameterDictionary = {};
            this._widgetChildren = [];
            this.initRenderer();
            this.ignoreContentAdaptWithSize(false);
            this.setSize(cc.size(0, 0));
            this.setBright(true);
            this.setAnchorPoint(0, 0);
            this.initStencil();
            return true
        }
        return false
    }, initStencil: null, _initStencilForWebGL: function () {
        this._clippingStencil = cc.DrawNode.create();
        ccui.Layout._init_once = true;
        if (ccui.Layout._init_once) {
            cc.stencilBits = cc._renderContext.getParameter(cc._renderContext.STENCIL_BITS);
            if (cc.stencilBits <= 0)cc.log("Stencil buffer is not enabled.");
            ccui.Layout._init_once = false
        }
    }, _initStencilForCanvas: function () {
        this._clippingStencil = cc.DrawNode.create();
        var locContext = cc._renderContext;
        var stencil = this._clippingStencil;
        stencil.draw = function () {
            var locEGL_ScaleX = cc.view.getScaleX(), locEGL_ScaleY = cc.view.getScaleY();
            for (var i = 0; i < stencil._buffer.length; i++) {
                var element = stencil._buffer[i];
                var vertices = element.verts;
                var firstPoint = vertices[0];
                locContext.beginPath();
                locContext.moveTo(firstPoint.x *
                    locEGL_ScaleX, -firstPoint.y * locEGL_ScaleY);
                for (var j = 1, len = vertices.length; j < len; j++)locContext.lineTo(vertices[j].x * locEGL_ScaleX, -vertices[j].y * locEGL_ScaleY)
            }
        }
    }, addChild: function (widget, zOrder, tag) {
        if (!(widget instanceof ccui.Widget))throw"the child add to Layout  must a type of cc.Widget";
        this.supplyTheLayoutParameterLackToChild(widget);
        ccui.Widget.prototype.addChild.call(this, widget, zOrder, tag);
        this._doLayoutDirty = true
    }, removeChild: function (widget, cleanup) {
        ccui.Widget.prototype.removeChild.call(this,
            widget, cleanup);
        this._doLayoutDirty = true
    }, removeAllChildren: function (cleanup) {
        ccui.Widget.prototype.removeAllChildren.call(this, cleanup);
        this._doLayoutDirty = true
    }, isClippingEnabled: function () {
        return this._clippingEnabled
    }, visit: function (ctx) {
        if (!this._enabled)return;
        if (this._clippingEnabled)switch (this._clippingType) {
            case ccui.Layout.CLIPPING_STENCIL:
                this.stencilClippingVisit(ctx);
                break;
            case ccui.Layout.CLIPPING_SCISSOR:
                this.scissorClippingVisit(ctx);
                break;
            default:
                break
        } else cc.Node.prototype.visit.call(this,
            ctx)
    }, sortAllChildren: function () {
        ccui.Widget.prototype.sortAllChildren.call(this);
        this._doLayout()
    }, stencilClippingVisit: null, _stencilClippingVisitForWebGL: function (ctx) {
        var gl = ctx || cc._renderContext;
        if (cc.stencilBits < 1) {
            cc.Node.prototype.visit.call(this, ctx);
            return
        }
        if (!this._clippingStencil || !this._clippingStencil.isVisible())return;
        ccui.Layout._layer = -1;
        if (ccui.Layout._layer + 1 == cc.stencilBits) {
            ccui.Layout._visit_once = true;
            if (ccui.Layout._visit_once) {
                cc.log("Nesting more than " + cc.stencilBits + "stencils is not supported. Everything will be drawn without stencil for this node and its childs.");
                ccui.Layout._visit_once = false
            }
            cc.Node.prototype.visit.call(this, ctx);
            return
        }
        ccui.Layout._layer++;
        var mask_layer = 1 << ccui.Layout._layer;
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
        gl.stencilOp(gl.ZERO, gl.KEEP, gl.KEEP);
        cc._drawingUtil.drawSolidRect(cc.p(0, 0), cc.pFromSize(cc.director.getWinSize()),
            cc.color(255, 255, 255, 255));
        gl.stencilFunc(gl.NEVER, mask_layer, mask_layer);
        gl.stencilOp(gl.REPLACE, gl.KEEP, gl.KEEP);
        cc.kmGLPushMatrix();
        this.transform();
        this._clippingStencil.visit();
        cc.kmGLPopMatrix();
        gl.depthMask(currentDepthWriteMask);
        gl.stencilFunc(gl.EQUAL, mask_layer_le, mask_layer_le);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        cc.Node.prototype.visit.call(this, ctx);
        gl.stencilFunc(currentStencilFunc, currentStencilRef, currentStencilValueMask);
        gl.stencilOp(currentStencilFail, currentStencilPassDepthFail,
            currentStencilPassDepthPass);
        gl.stencilMask(currentStencilWriteMask);
        if (!currentStencilEnabled)gl.disable(gl.STENCIL_TEST);
        ccui.Layout._layer--
    }, _stencilClippingVisitForCanvas: function (ctx) {
        if (!this._clippingStencil || !this._clippingStencil.isVisible())return;
        var context = ctx || cc._renderContext;
        if (this._cangodhelpme() || this._clippingStencil instanceof cc.Sprite) {
            var canvas = context.canvas;
            var locCache = ccui.Layout._getSharedCache();
            locCache.width = canvas.width;
            locCache.height = canvas.height;
            var locCacheCtx =
                locCache.getContext("2d");
            locCacheCtx.drawImage(canvas, 0, 0);
            context.save();
            cc.Node.prototype.visit.call(this, context);
            context.globalCompositeOperation = "destination-in";
            this.transform(context);
            this._clippingStencil.visit();
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
            this._clippingStencil.visit(context);
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
    }, _godhelpme: false, _cangodhelpme: function (godhelpme) {
        if (godhelpme === true || godhelpme === false)cc.ClippingNode.prototype._godhelpme = godhelpme;
        return cc.ClippingNode.prototype._godhelpme
    },
    scissorClippingVisit: null, _scissorClippingVisitForWebGL: function (ctx) {
        var clippingRect = this.getClippingRect();
        var gl = ctx || cc._renderContext;
        if (this._handleScissor)gl.enable(gl.SCISSOR_TEST);
        cc.view.setScissorInPoints(clippingRect.x, clippingRect.y, clippingRect.width, clippingRect.height);
        cc.Node.prototype.visit.call(this);
        if (this._handleScissor)gl.disable(gl.SCISSOR_TEST)
    }, setClippingEnabled: function (able) {
        if (able == this._clippingEnabled)return;
        this._clippingEnabled = able;
        switch (this._clippingType) {
            case ccui.Layout.CLIPPING_STENCIL:
                if (able)this.setStencilClippingSize(this._size);
                else this._clippingStencil = null;
                break;
            default:
                break
        }
    }, setClippingType: function (type) {
        if (type == this._clippingType)return;
        var clippingEnabled = this.isClippingEnabled();
        this.setClippingEnabled(false);
        this._clippingType = type;
        this.setClippingEnabled(clippingEnabled)
    }, getClippingType: function () {
        return this._clippingType
    }, setStencilClippingSize: function (size) {
        if (this._clippingEnabled && this._clippingType == ccui.Layout.CLIPPING_STENCIL) {
            var rect = [];
            rect[0] = cc.p(0, 0);
            rect[1] = cc.p(size.width, 0);
            rect[2] = cc.p(size.width,
                size.height);
            rect[3] = cc.p(0, size.height);
            var green = cc.color.GREEN;
            this._clippingStencil.clear();
            this._clippingStencil.drawPoly(rect, 4, green, 0, green)
        }
    }, rendererVisitCallBack: function () {
        this._doLayout()
    }, getClippingRect: function () {
        if (this._clippingRectDirty) {
            this._handleScissor = true;
            var worldPos = this.convertToWorldSpace(cc.p(0, 0));
            var t = this.nodeToWorldTransform();
            var scissorWidth = this._size.width * t.a;
            var scissorHeight = this._size.height * t.d;
            var parentClippingRect;
            var parent = this;
            var firstClippingParentFounded =
                false;
            while (parent) {
                parent = parent.getParent();
                if (parent && parent instanceof ccui.Layout)if (parent.isClippingEnabled()) {
                    if (!firstClippingParentFounded) {
                        this._clippingParent = parent;
                        firstClippingParentFounded = true
                    }
                    if (parent._clippingType == ccui.Layout.CLIPPING_SCISSOR) {
                        this._handleScissor = false;
                        break
                    }
                }
            }
            if (this._clippingParent) {
                parentClippingRect = this._clippingParent.getClippingRect();
                var finalX = worldPos.x - scissorWidth * this._anchorPoint.x;
                var finalY = worldPos.y - scissorHeight * this._anchorPoint.y;
                var finalWidth =
                    scissorWidth;
                var finalHeight = scissorHeight;
                var leftOffset = worldPos.x - parentClippingRect.x;
                if (leftOffset < 0) {
                    finalX = parentClippingRect.x;
                    finalWidth += leftOffset
                }
                var rightOffset = worldPos.x + scissorWidth - (parentClippingRect.x + parentClippingRect.width);
                if (rightOffset > 0)finalWidth -= rightOffset;
                var topOffset = worldPos.y + scissorHeight - (parentClippingRect.y + parentClippingRect.height);
                if (topOffset > 0)finalHeight -= topOffset;
                var bottomOffset = worldPos.y - parentClippingRect.y;
                if (bottomOffset < 0) {
                    finalY = parentClippingRect.x;
                    finalHeight += bottomOffset
                }
                if (finalWidth < 0)finalWidth = 0;
                if (finalHeight < 0)finalHeight = 0;
                this._clippingRect.x = finalX;
                this._clippingRect.y = finalY;
                this._clippingRect.width = finalWidth;
                this._clippingRect.height = finalHeight
            } else {
                this._clippingRect.x = worldPos.x - scissorWidth * this._anchorPoint.x;
                this._clippingRect.y = worldPos.y - scissorHeight * this._anchorPoint.y;
                this._clippingRect.width = scissorWidth;
                this._clippingRect.height = scissorHeight
            }
            this._clippingRectDirty = false
        }
        return this._clippingRect
    }, onSizeChanged: function () {
        ccui.Widget.prototype.onSizeChanged.call(this);
        this.setContentSize(this._size);
        this.setStencilClippingSize(this._size);
        this._doLayoutDirty = true;
        this._clippingRectDirty = true;
        if (this._backGroundImage) {
            this._backGroundImage.setPosition(this._size.width / 2, this._size.height / 2);
            if (this._backGroundScale9Enabled)if (this._backGroundImage instanceof cc.Scale9Sprite)this._backGroundImage.setPreferredSize(this._size)
        }
        if (this._colorRender)this._colorRender.setContentSize(this._size);
        if (this._gradientRender)this._gradientRender.setContentSize(this._size)
    },
    setBackGroundImageScale9Enabled: function (able) {
        if (this._backGroundScale9Enabled == able)return;
        cc.Node.prototype.removeChild.call(this, this._backGroundImage, true);
        this._backGroundImage = null;
        this._backGroundScale9Enabled = able;
        if (this._backGroundScale9Enabled)this._backGroundImage = cc.Scale9Sprite.create(); else this._backGroundImage = cc.Sprite.create();
        cc.Node.prototype.addChild.call(this, this._backGroundImage, ccui.Layout.BACKGROUND_IMAGE_ZORDER, -1);
        this.setBackGroundImage(this._backGroundImageFileName,
            this._bgImageTexType);
        this.setBackGroundImageCapInsets(this._backGroundImageCapInsets)
    }, isBackGroundImageScale9Enabled: function () {
        return this._backGroundScale9Enabled
    }, setBackGroundImage: function (fileName, texType) {
        if (!fileName)return;
        texType = texType || ccui.Widget.LOCAL_TEXTURE;
        if (this._backGroundImage == null)this.addBackGroundImage();
        this._backGroundImageFileName = fileName;
        this._bgImageTexType = texType;
        switch (this._bgImageTexType) {
            case ccui.Widget.LOCAL_TEXTURE:
                this._backGroundImage.initWithFile(fileName);
                break;
            case ccui.Widget.PLIST_TEXTURE:
                this._backGroundImage.initWithSpriteFrameName(fileName);
                break;
            default:
                break
        }
        if (this._backGroundScale9Enabled)this._backGroundImage.setPreferredSize(this._size);
        this._backGroundImageTextureSize = this._backGroundImage.getContentSize();
        this._backGroundImage.setPosition(this._size.width / 2, this._size.height / 2);
        this.updateBackGroundImageColor()
    }, setBackGroundImageCapInsets: function (capInsets) {
        this._backGroundImageCapInsets = capInsets;
        if (this._backGroundScale9Enabled)this._backGroundImage.setCapInsets(capInsets)
    },
    getBackGroundImageCapInsets: function () {
        return this._backGroundImageCapInsets
    }, supplyTheLayoutParameterLackToChild: function (locChild) {
        if (!locChild)return;
        switch (this._layoutType) {
            case ccui.Layout.ABSOLUTE:
                break;
            case ccui.Layout.LINEAR_HORIZONTAL:
            case ccui.Layout.LINEAR_VERTICAL:
                var layoutParameter = locChild.getLayoutParameter(ccui.LayoutParameter.LINEAR);
                if (!layoutParameter)locChild.setLayoutParameter(ccui.LinearLayoutParameter.create());
                break;
            case ccui.Layout.RELATIVE:
                var layoutParameter = locChild.getLayoutParameter(ccui.LayoutParameter.RELATIVE);
                if (!layoutParameter)locChild.setLayoutParameter(ccui.RelativeLayoutParameter.create());
                break;
            default:
                break
        }
    }, addBackGroundImage: function () {
        if (this._backGroundScale9Enabled) {
            this._backGroundImage = cc.Scale9Sprite.create();
            this._backGroundImage.setPreferredSize(this._size)
        } else this._backGroundImage = cc.Sprite.create();
        cc.Node.prototype.addChild.call(this, this._backGroundImage, ccui.Layout.BACKGROUND_IMAGE_ZORDER, -1);
        this._backGroundImage.setPosition(this._size.width / 2, this._size.height / 2)
    }, removeBackGroundImage: function () {
        if (!this._backGroundImage)return;
        cc.Node.prototype.removeChild.call(this, this._backGroundImage, true);
        this._backGroundImage = null;
        this._backGroundImageFileName = "";
        this._backGroundImageTextureSize = cc.size(0, 0)
    }, setBackGroundColorType: function (type) {
        if (this._colorType == type)return;
        switch (this._colorType) {
            case ccui.Layout.BG_COLOR_NONE:
                if (this._colorRender) {
                    cc.Node.prototype.removeChild.call(this, this._colorRender, true);
                    this._colorRender = null
                }
                if (this._gradientRender) {
                    cc.Node.prototype.removeChild.call(this, this._gradientRender, true);
                    this._gradientRender = null
                }
                break;
            case ccui.Layout.BG_COLOR_SOLID:
                if (this._colorRender) {
                    cc.Node.prototype.removeChild.call(this, this._colorRender, true);
                    this._colorRender = null
                }
                break;
            case ccui.Layout.BG_COLOR_GRADIENT:
                if (this._gradientRender) {
                    cc.Node.prototype.removeChild.call(this, this._gradientRender, true);
                    this._gradientRender = null
                }
                break;
            default:
                break
        }
        this._colorType = type;
        switch (this._colorType) {
            case ccui.Layout.BG_COLOR_NONE:
                break;
            case ccui.Layout.BG_COLOR_SOLID:
                this._colorRender = cc.LayerColor.create();
                this._colorRender.setContentSize(this._size);
                this._colorRender.setOpacity(this._opacity);
                this._colorRender.setColor(this._color);
                cc.Node.prototype.addChild.call(this, this._colorRender, ccui.Layout.BACKGROUND_RENDERER_ZORDER, -1);
                break;
            case ccui.Layout.BG_COLOR_GRADIENT:
                this._gradientRender = cc.LayerGradient.create(cc.color(255, 0, 0, 255), cc.color(0, 255, 0, 255));
                this._gradientRender.setContentSize(this._size);
                this._gradientRender.setOpacity(this._opacity);
                this._gradientRender.setStartColor(this._startColor);
                this._gradientRender.setEndColor(this._endColor);
                this._gradientRender.setVector(this._alongVector);
                cc.Node.prototype.addChild.call(this, this._gradientRender, ccui.Layout.BACKGROUND_RENDERER_ZORDER, -1);
                break;
            default:
                break
        }
    }, getBackGroundColorType: function () {
        return this._colorType
    }, setBackGroundColor: function (color, endColor) {
        if (!endColor) {
            this._color.r = color.r;
            this._color.g = color.g;
            this._color.b = color.b;
            if (this._colorRender)this._colorRender.setColor(color)
        } else {
            this._startColor.r = color.r;
            this._startColor.g =
                color.g;
            this._startColor.b = color.b;
            if (this._gradientRender)this._gradientRender.setStartColor(color);
            this._endColor = endColor;
            if (this._gradientRender)this._gradientRender.setEndColor(endColor)
        }
    }, getBackGroundColor: function () {
        return this._color
    }, getBackGroundStartColor: function () {
        return this._startColor
    }, getBackGroundEndColor: function () {
        return this._endColor
    }, setBackGroundColorOpacity: function (opacity) {
        this._opacity = opacity;
        switch (this._colorType) {
            case ccui.Layout.BG_COLOR_NONE:
                break;
            case ccui.Layout.BG_COLOR_SOLID:
                this._colorRender.setOpacity(opacity);
                break;
            case ccui.Layout.BG_COLOR_GRADIENT:
                this._gradientRender.setOpacity(opacity);
                break;
            default:
                break
        }
    }, getBackGroundColorOpacity: function () {
        return this._opacity
    }, setBackGroundColorVector: function (vector) {
        this._alongVector.x = vector.x;
        this._alongVector.y = vector.y;
        if (this._gradientRender)this._gradientRender.setVector(vector)
    }, getBackGroundColorVector: function () {
        return this._alongVector
    }, setBackGroundImageColor: function (color) {
        this._backGroundImageColor.r = color.r;
        this._backGroundImageColor.g = color.g;
        this._backGroundImageColor.b = color.b;
        this.updateBackGroundImageColor();
        if (color.a !== undefined && !color.a_undefined)this.setBackGroundImageOpacity(color.a)
    }, setBackGroundImageOpacity: function (opacity) {
        this._backGroundImageColor.a = opacity;
        this.getBackGroundImageColor()
    }, getBackGroundImageColor: function () {
        var color = this._backGroundImageColor;
        return cc.color(color.r, color.g, color.b, color.a)
    }, getBackGroundImageOpacity: function () {
        return this._backGroundImageColor.a
    }, updateBackGroundImageColor: function () {
        this._backGroundImage.setColor(this._backGroundImageColor)
    },
    getBackGroundImageTextureSize: function () {
        return this._backGroundImageTextureSize
    }, setLayoutType: function (type) {
        this._layoutType = type;
        var layoutChildrenArray = this._widgetChildren;
        var locChild = null;
        for (var i = 0; i < layoutChildrenArray.length; i++) {
            locChild = layoutChildrenArray[i];
            this.supplyTheLayoutParameterLackToChild(locChild)
        }
        this._doLayoutDirty = true
    }, getLayoutType: function () {
        return this._layoutType
    }, requestDoLayout: function () {
        this._doLayoutDirty = true
    }, doLayout_LINEAR_VERTICAL: function () {
        var layoutChildrenArray =
            this._widgetChildren;
        var layoutSize = this.getSize();
        var topBoundary = layoutSize.height;
        for (var i = 0; i < layoutChildrenArray.length; ++i) {
            var locChild = layoutChildrenArray[i];
            var locLayoutParameter = locChild.getLayoutParameter(ccui.LayoutParameter.LINEAR);
            if (locLayoutParameter) {
                var locChildGravity = locLayoutParameter.getGravity();
                var locAP = locChild.getAnchorPoint();
                var locSize = locChild.getSize();
                var locFinalPosX = locAP.x * locSize.width;
                var locFinalPosY = topBoundary - (1 - locAP.y) * locSize.height;
                switch (locChildGravity) {
                    case ccui.LINEAR_GRAVITY_NONE:
                    case ccui.LINEAR_GRAVITY_LEFT:
                        break;
                    case ccui.LINEAR_GRAVITY_RIGHT:
                        locFinalPosX = layoutSize.width - (1 - locAP.x) * locSize.width;
                        break;
                    case ccui.LINEAR_GRAVITY_CENTER_HORIZONTAL:
                        locFinalPosX = layoutSize.width / 2 - locSize.width * (0.5 - locAP.x);
                        break;
                    default:
                        break
                }
                var locMargin = locLayoutParameter.getMargin();
                locFinalPosX += locMargin.left;
                locFinalPosY -= locMargin.top;
                locChild.setPosition(locFinalPosX, locFinalPosY);
                topBoundary = locChild.getBottomInParent() - locMargin.bottom
            }
        }
    }, doLayout_LINEAR_HORIZONTAL: function () {
        var layoutChildrenArray = this._widgetChildren;
        var layoutSize = this.getSize();
        var leftBoundary = 0;
        for (var i = 0; i < layoutChildrenArray.length; ++i) {
            var locChild = layoutChildrenArray[i];
            var locLayoutParameter = locChild.getLayoutParameter(ccui.LayoutParameter.LINEAR);
            if (locLayoutParameter) {
                var locChildGravity = locLayoutParameter.getGravity();
                var locAP = locChild.getAnchorPoint();
                var locSize = locChild.getSize();
                var locFinalPosX = leftBoundary + locAP.x * locSize.width;
                var locFinalPosY = layoutSize.height - (1 - locAP.y) * locSize.height;
                switch (locChildGravity) {
                    case ccui.LINEAR_GRAVITY_NONE:
                    case ccui.LINEAR_GRAVITY_TOP:
                        break;
                    case ccui.LINEAR_GRAVITY_BOTTOM:
                        locFinalPosY = locAP.y * locSize.height;
                        break;
                    case ccui.LINEAR_GRAVITY_CENTER_VERTICAL:
                        locFinalPosY = layoutSize.height / 2 - locSize.height * (0.5 - locAP.y);
                        break;
                    default:
                        break
                }
                var locMargin = locLayoutParameter.getMargin();
                locFinalPosX += locMargin.left;
                locFinalPosY -= locMargin.top;
                locChild.setPosition(locFinalPosX, locFinalPosY);
                leftBoundary = locChild.getRightInParent() + locMargin.right
            }
        }
    }, doLayout_RELATIVE: function () {
        var layoutChildrenArray = this._widgetChildren;
        var length = layoutChildrenArray.length;
        var unlayoutChildCount = length;
        var layoutSize = this.getSize();
        for (var i = 0; i < length; i++) {
            var locChild = layoutChildrenArray[i];
            var locLayoutParameter = locChild.getLayoutParameter(ccui.LayoutParameter.RELATIVE);
            locLayoutParameter._put = false
        }
        while (unlayoutChildCount > 0)for (var i = 0; i < length; i++) {
            var locChild = layoutChildrenArray[i];
            var locLayoutParameter = locChild.getLayoutParameter(ccui.LayoutParameter.RELATIVE);
            if (locLayoutParameter) {
                if (locLayoutParameter._put)continue;
                var locAP = locChild.getAnchorPoint();
                var locSize =
                    locChild.getSize();
                var locAlign = locLayoutParameter.getAlign();
                var locRelativeName = locLayoutParameter.getRelativeToWidgetName();
                var locRelativeWidget = null;
                var locRelativeWidgetLP = null;
                var locFinalPosX = 0;
                var locFinalPosY = 0;
                if (locRelativeName) {
                    locRelativeWidget = ccui.helper.seekWidgetByRelativeName(this, locRelativeName);
                    if (locRelativeWidget)locRelativeWidgetLP = locRelativeWidget.getLayoutParameter(ccui.LayoutParameter.RELATIVE)
                }
                switch (locAlign) {
                    case ccui.RELATIVE_ALIGN_NONE:
                    case ccui.RELATIVE_ALIGN_PARENT_TOP_LEFT:
                        locFinalPosX =
                            locAP.x * locSize.width;
                        locFinalPosY = layoutSize.height - (1 - locAP.y) * locSize.height;
                        break;
                    case ccui.RELATIVE_ALIGN_PARENT_TOP_CENTER_HORIZONTAL:
                        locFinalPosX = layoutSize.width * 0.5 - locSize.width * (0.5 - locAP.x);
                        locFinalPosY = layoutSize.height - (1 - locAP.y) * locSize.height;
                        break;
                    case ccui.RELATIVE_ALIGN_PARENT_TOP_RIGHT:
                        locFinalPosX = layoutSize.width - (1 - locAP.x) * locSize.width;
                        locFinalPosY = layoutSize.height - (1 - locAP.y) * locSize.height;
                        break;
                    case ccui.RELATIVE_ALIGN_PARENT_LEFT_CENTER_VERTICAL:
                        locFinalPosX = locAP.x *
                            locSize.width;
                        locFinalPosY = layoutSize.height * 0.5 - locSize.height * (0.5 - locAP.y);
                        break;
                    case ccui.RELATIVE_ALIGN_PARENT_CENTER:
                        locFinalPosX = layoutSize.width * 0.5 - locSize.width * (0.5 - locAP.x);
                        locFinalPosY = layoutSize.height * 0.5 - locSize.height * (0.5 - locAP.y);
                        break;
                    case ccui.RELATIVE_ALIGN_PARENT_RIGHT_CENTER_VERTICAL:
                        locFinalPosX = layoutSize.width - (1 - locAP.x) * locSize.width;
                        locFinalPosY = layoutSize.height * 0.5 - locSize.height * (0.5 - locAP.y);
                        break;
                    case ccui.RELATIVE_ALIGN_PARENT_LEFT_BOTTOM:
                        locFinalPosX = locAP.x * locSize.width;
                        locFinalPosY = locAP.y * locSize.height;
                        break;
                    case ccui.RELATIVE_ALIGN_PARENT_BOTTOM_CENTER_HORIZONTAL:
                        locFinalPosX = layoutSize.width * 0.5 - locSize.width * (0.5 - locAP.x);
                        locFinalPosY = locAP.y * locSize.height;
                        break;
                    case ccui.RELATIVE_ALIGN_PARENT_RIGHT_BOTTOM:
                        locFinalPosX = layoutSize.width - (1 - locAP.x) * locSize.width;
                        locFinalPosY = locAP.y * locSize.height;
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_ABOVE_LEFT:
                        if (locRelativeWidget) {
                            if (locRelativeWidgetLP && !locRelativeWidgetLP._put)continue;
                            var locationBottom = locRelativeWidget.getTopInParent();
                            var locationLeft = locRelativeWidget.getLeftInParent();
                            locFinalPosY = locationBottom + locAP.y * locSize.height;
                            locFinalPosX = locationLeft + locAP.x * locSize.width
                        }
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_ABOVE_CENTER:
                        if (locRelativeWidget) {
                            if (locRelativeWidgetLP && !locRelativeWidgetLP._put)continue;
                            var rbs = locRelativeWidget.getSize();
                            var locationBottom = locRelativeWidget.getTopInParent();
                            locFinalPosY = locationBottom + locAP.y * locSize.height;
                            locFinalPosX = locRelativeWidget.getLeftInParent() + rbs.width * 0.5 + locAP.x * locSize.width -
                                locSize.width * 0.5
                        }
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_ABOVE_RIGHT:
                        if (locRelativeWidget) {
                            if (locRelativeWidgetLP && !locRelativeWidgetLP._put)continue;
                            var locationBottom = locRelativeWidget.getTopInParent();
                            var locationRight = locRelativeWidget.getRightInParent();
                            locFinalPosY = locationBottom + locAP.y * locSize.height;
                            locFinalPosX = locationRight - (1 - locAP.x) * locSize.width
                        }
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_LEFT_TOP:
                        if (locRelativeWidget) {
                            if (locRelativeWidgetLP && !locRelativeWidgetLP._put)continue;
                            var locationTop =
                                locRelativeWidget.getTopInParent();
                            var locationRight = locRelativeWidget.getLeftInParent();
                            locFinalPosY = locationTop - (1 - locAP.y) * locSize.height;
                            locFinalPosX = locationRight - (1 - locAP.x) * locSize.width
                        }
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_LEFT_CENTER:
                        if (locRelativeWidget) {
                            if (locRelativeWidgetLP && !locRelativeWidgetLP._put)continue;
                            var rbs = locRelativeWidget.getSize();
                            var locationRight = locRelativeWidget.getLeftInParent();
                            locFinalPosX = locationRight - (1 - locAP.x) * locSize.width;
                            locFinalPosY = locRelativeWidget.getBottomInParent() +
                                rbs.height * 0.5 + locAP.y * locSize.height - locSize.height * 0.5
                        }
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_LEFT_BOTTOM:
                        if (locRelativeWidget) {
                            if (locRelativeWidgetLP && !locRelativeWidgetLP._put)continue;
                            var locationBottom = locRelativeWidget.getBottomInParent();
                            var locationRight = locRelativeWidget.getLeftInParent();
                            locFinalPosY = locationBottom + locAP.y * locSize.height;
                            locFinalPosX = locationRight - (1 - locAP.x) * locSize.width
                        }
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_RIGHT_TOP:
                        if (locRelativeWidget) {
                            if (locRelativeWidgetLP && !locRelativeWidgetLP._put)continue;
                            var locationTop = locRelativeWidget.getTopInParent();
                            var locationLeft = locRelativeWidget.getRightInParent();
                            locFinalPosY = locationTop - (1 - locAP.y) * locSize.height;
                            locFinalPosX = locationLeft + locAP.x * locSize.width
                        }
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_RIGHT_CENTER:
                        if (locRelativeWidget) {
                            if (locRelativeWidgetLP && !locRelativeWidgetLP._put)continue;
                            var rbs = locRelativeWidget.getSize();
                            var locationLeft = locRelativeWidget.getRightInParent();
                            locFinalPosX = locationLeft + locAP.x * locSize.width;
                            locFinalPosY = locRelativeWidget.getBottomInParent() + rbs.height * 0.5 + locAP.y * locSize.height - locSize.height * 0.5
                        }
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_RIGHT_BOTTOM:
                        if (locRelativeWidget) {
                            if (locRelativeWidgetLP && !locRelativeWidgetLP._put)continue;
                            var locationBottom = locRelativeWidget.getBottomInParent();
                            var locationLeft = locRelativeWidget.getRightInParent();
                            locFinalPosY = locationBottom + locAP.y * locSize.height;
                            locFinalPosX = locationLeft + locAP.x * locSize.width
                        }
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_BELOW_TOP:
                        if (locRelativeWidget) {
                            if (locRelativeWidgetLP && !locRelativeWidgetLP._put)continue;
                            var locationTop = locRelativeWidget.getBottomInParent();
                            var locationLeft = locRelativeWidget.getLeftInParent();
                            locFinalPosY = locationTop - (1 - locAP.y) * locSize.height;
                            locFinalPosX = locationLeft + locAP.x * locSize.width
                        }
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_BELOW_CENTER:
                        if (locRelativeWidget) {
                            if (locRelativeWidgetLP && !locRelativeWidgetLP._put)continue;
                            var rbs = locRelativeWidget.getSize();
                            var locationTop = locRelativeWidget.getBottomInParent();
                            locFinalPosY = locationTop - (1 - locAP.y) *
                                locSize.height;
                            locFinalPosX = locRelativeWidget.getLeftInParent() + rbs.width * 0.5 + locAP.x * locSize.width - locSize.width * 0.5
                        }
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_BELOW_BOTTOM:
                        if (locRelativeWidget) {
                            if (locRelativeWidgetLP && !locRelativeWidgetLP._put)continue;
                            var locationTop = locRelativeWidget.getBottomInParent();
                            var locationRight = locRelativeWidget.getRightInParent();
                            locFinalPosY = locationTop - (1 - locAP.y) * locSize.height;
                            locFinalPosX = locationRight - (1 - locAP.x) * locSize.width
                        }
                        break;
                    default:
                        break
                }
                var locRelativeWidgetMargin,
                    locRelativeWidgetLPAlign;
                var locMargin = locLayoutParameter.getMargin();
                if (locRelativeWidgetLP) {
                    locRelativeWidgetMargin = locRelativeWidgetLP.getMargin();
                    locRelativeWidgetLPAlign = locRelativeWidgetLP.getAlign()
                }
                switch (locAlign) {
                    case ccui.RELATIVE_ALIGN_NONE:
                    case ccui.RELATIVE_ALIGN_PARENT_TOP_LEFT:
                        locFinalPosX += locMargin.left;
                        locFinalPosY -= locMargin.top;
                        break;
                    case ccui.RELATIVE_ALIGN_PARENT_TOP_CENTER_HORIZONTAL:
                        locFinalPosY -= locMargin.top;
                        break;
                    case ccui.RELATIVE_ALIGN_PARENT_TOP_RIGHT:
                        locFinalPosX -=
                            locMargin.right;
                        locFinalPosY -= locMargin.top;
                        break;
                    case ccui.RELATIVE_ALIGN_PARENT_LEFT_CENTER_VERTICAL:
                        locFinalPosX += locMargin.left;
                        break;
                    case ccui.RELATIVE_ALIGN_PARENT_CENTER:
                        break;
                    case ccui.RELATIVE_ALIGN_PARENT_RIGHT_CENTER_VERTICAL:
                        locFinalPosX -= locMargin.right;
                        break;
                    case ccui.RELATIVE_ALIGN_PARENT_LEFT_BOTTOM:
                        locFinalPosX += locMargin.left;
                        locFinalPosY += locMargin.bottom;
                        break;
                    case ccui.RELATIVE_ALIGN_PARENT_BOTTOM_CENTER_HORIZONTAL:
                        locFinalPosY += locMargin.bottom;
                        break;
                    case ccui.RELATIVE_ALIGN_PARENT_RIGHT_BOTTOM:
                        locFinalPosX -=
                            locMargin.right;
                        locFinalPosY += locMargin.bottom;
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_ABOVE_LEFT:
                        locFinalPosY += locMargin.bottom;
                        if (locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_TOP_CENTER_HORIZONTAL && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_TOP_LEFT && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_NONE && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_TOP_RIGHT)locFinalPosY += locRelativeWidgetMargin.top;
                        locFinalPosY += locMargin.left;
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_ABOVE_CENTER:
                        locFinalPosY +=
                            locMargin.bottom;
                        if (locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_TOP_CENTER_HORIZONTAL && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_TOP_LEFT && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_NONE && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_TOP_RIGHT)locFinalPosY += locRelativeWidgetMargin.top;
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_ABOVE_RIGHT:
                        locFinalPosY += locMargin.bottom;
                        if (locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_TOP_CENTER_HORIZONTAL && locRelativeWidgetLPAlign !=
                            ccui.RELATIVE_ALIGN_PARENT_TOP_LEFT && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_NONE && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_TOP_RIGHT)locFinalPosY += locRelativeWidgetMargin.top;
                        locFinalPosX -= locMargin.right;
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_LEFT_TOP:
                        locFinalPosX -= locMargin.right;
                        if (locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_TOP_LEFT && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_NONE && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_LEFT_BOTTOM && locRelativeWidgetLPAlign !=
                            ccui.RELATIVE_ALIGN_PARENT_LEFT_CENTER_VERTICAL)locFinalPosX -= locRelativeWidgetMargin.left;
                        locFinalPosY -= locMargin.top;
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_LEFT_CENTER:
                        locFinalPosX -= locMargin.right;
                        if (locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_TOP_LEFT && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_NONE && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_LEFT_BOTTOM && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_LEFT_CENTER_VERTICAL)locFinalPosX -= locRelativeWidgetMargin.left;
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_LEFT_BOTTOM:
                        locFinalPosX -= locMargin.right;
                        if (locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_TOP_LEFT && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_NONE && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_LEFT_BOTTOM && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_LEFT_CENTER_VERTICAL)locFinalPosX -= locRelativeWidgetMargin.left;
                        locFinalPosY += locMargin.bottom;
                        break;
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_RIGHT_TOP:
                        locFinalPosX += locMargin.left;
                        if (locRelativeWidgetLPAlign !=
                            ccui.RELATIVE_ALIGN_PARENT_TOP_RIGHT && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_RIGHT_BOTTOM && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_RIGHT_CENTER_VERTICAL)locFinalPosX += locRelativeWidgetMargin.right;
                        locFinalPosY -= locMargin.top;
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_RIGHT_CENTER:
                        locFinalPosX += locMargin.left;
                        if (locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_TOP_RIGHT && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_RIGHT_BOTTOM && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_RIGHT_CENTER_VERTICAL)locFinalPosX +=
                            locRelativeWidgetMargin.right;
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_RIGHT_BOTTOM:
                        locFinalPosX += locMargin.left;
                        if (locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_TOP_RIGHT && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_RIGHT_BOTTOM && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_RIGHT_CENTER_VERTICAL)locFinalPosX += locRelativeWidgetMargin.right;
                        locFinalPosY += locMargin.bottom;
                        break;
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_BELOW_TOP:
                        locFinalPosY -= locMargin.top;
                        if (locRelativeWidgetLPAlign !=
                            ccui.RELATIVE_ALIGN_PARENT_LEFT_BOTTOM && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_RIGHT_BOTTOM && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_BOTTOM_CENTER_HORIZONTAL)locFinalPosY -= locRelativeWidgetMargin.bottom;
                        locFinalPosX += locMargin.left;
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_BELOW_CENTER:
                        locFinalPosY -= locMargin.top;
                        if (locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_LEFT_BOTTOM && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_RIGHT_BOTTOM && locRelativeWidgetLPAlign !=
                            ccui.RELATIVE_ALIGN_PARENT_BOTTOM_CENTER_HORIZONTAL)locFinalPosY -= locRelativeWidgetMargin.bottom;
                        break;
                    case ccui.RELATIVE_ALIGN_LOCATION_BELOW_BOTTOM:
                        locFinalPosY -= locMargin.top;
                        if (locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_LEFT_BOTTOM && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_RIGHT_BOTTOM && locRelativeWidgetLPAlign != ccui.RELATIVE_ALIGN_PARENT_BOTTOM_CENTER_HORIZONTAL)locFinalPosY -= locRelativeWidgetMargin.bottom;
                        locFinalPosX -= locMargin.right;
                        break;
                    default:
                        break
                }
                locChild.setPosition(locFinalPosX,
                    locFinalPosY);
                locLayoutParameter._put = true;
                unlayoutChildCount--
            }
        }
    }, _doLayout: function () {
        if (!this._doLayoutDirty)return;
        switch (this._layoutType) {
            case ccui.Layout.ABSOLUTE:
                break;
            case ccui.Layout.LINEAR_VERTICAL:
                this.doLayout_LINEAR_VERTICAL();
                break;
            case ccui.Layout.LINEAR_HORIZONTAL:
                this.doLayout_LINEAR_HORIZONTAL();
                break;
            case ccui.Layout.RELATIVE:
                this.doLayout_RELATIVE();
                break;
            default:
                break
        }
        this._doLayoutDirty = false
    }, getDescription: function () {
        return"Layout"
    }, createCloneInstance: function () {
        return ccui.Layout.create()
    },
    copyClonedWidgetChildren: function (model) {
        ccui.Widget.prototype.copyClonedWidgetChildren.call(this, model)
    }, copySpecialProperties: function (layout) {
        this.setBackGroundImageScale9Enabled(layout._backGroundScale9Enabled);
        this.setBackGroundImage(layout._backGroundImageFileName, layout._bgImageTexType);
        this.setBackGroundImageCapInsets(layout._backGroundImageCapInsets);
        this.setBackGroundColorType(layout._colorType);
        this.setBackGroundColor(layout._color);
        this.setBackGroundColor(layout._startColor, layout._endColor);
        this.setBackGroundColorOpacity(layout._opacity);
        this.setBackGroundColorVector(layout._alongVector);
        this.setLayoutType(layout._layoutType);
        this.setClippingEnabled(layout._clippingEnabled);
        this.setClippingType(layout._clippingType)
    }});
ccui.Layout._init_once = null;
ccui.Layout._visit_once = null;
ccui.Layout._layer = null;
ccui.Layout._sharedCache = null;
if (cc._renderType == cc._RENDER_TYPE_WEBGL) {
    ccui.Layout.prototype.initStencil = ccui.Layout.prototype._initStencilForWebGL;
    ccui.Layout.prototype.stencilClippingVisit = ccui.Layout.prototype._stencilClippingVisitForWebGL;
    ccui.Layout.prototype.scissorClippingVisit = ccui.Layout.prototype._scissorClippingVisitForWebGL
} else {
    ccui.Layout.prototype.initStencil = ccui.Layout.prototype._initStencilForCanvas;
    ccui.Layout.prototype.stencilClippingVisit = ccui.Layout.prototype._stencilClippingVisitForCanvas;
    ccui.Layout.prototype.scissorClippingVisit =
        ccui.Layout.prototype._stencilClippingVisitForCanvas
}
ccui.Layout._getSharedCache = function () {
    return cc.ClippingNode._sharedCache || (cc.ClippingNode._sharedCache = cc.newElement("canvas"))
};
var _p = ccui.Layout.prototype;
_p.clippingEnabled;
cc.defineGetterSetter(_p, "clippingEnabled", _p.isClippingEnabled, _p.setClippingEnabled);
_p.clippingType;
cc.defineGetterSetter(_p, "clippingType", null, _p.setClippingType);
_p.layoutType;
cc.defineGetterSetter(_p, "layoutType", _p.getLayoutType, _p.setLayoutType);
_p = null;
ccui.Layout.create = function () {
    var layout = new ccui.Layout;
    if (layout && layout.init())return layout;
    return null
};
ccui.Layout.BG_COLOR_NONE = 0;
ccui.Layout.BG_COLOR_SOLID = 1;
ccui.Layout.BG_COLOR_GRADIENT = 2;
ccui.Layout.ABSOLUTE = 0;
ccui.Layout.LINEAR_VERTICAL = 1;
ccui.Layout.LINEAR_HORIZONTAL = 2;
ccui.Layout.RELATIVE = 3;
ccui.Layout.CLIPPING_STENCIL = 0;
ccui.Layout.CLIPPING_SCISSOR = 1;
ccui.Layout.BACKGROUND_IMAGE_ZORDER = -2;
ccui.Layout.BACKGROUND_RENDERER_ZORDER = -2;
ccui.LayoutParameter = ccui.Class.extend({_margin: null, _layoutParameterType: null, ctor: function () {
    this._margin = new ccui.Margin;
    this._layoutParameterType = ccui.LayoutParameter.NONE
}, setMargin: function (margin) {
    this._margin.left = margin.left;
    this._margin.top = margin.top;
    this._margin.right = margin.right;
    this._margin.bottom = margin.bottom
}, getMargin: function () {
    return this._margin
}, getLayoutType: function () {
    return this._layoutParameterType
}, clone: function () {
    var parameter = this.createCloneInstance();
    parameter.copyProperties(this);
    return parameter
}, createCloneInstance: function () {
    return ccui.LayoutParameter.create()
}, copyProperties: function (model) {
    this._margin.left = model._margin.left;
    this._margin.top = model._margin.top;
    this._margin.right = model._margin.right;
    this._margin.bottom = model._margin.bottom
}});
ccui.LayoutParameter.create = function () {
    var parameter = new ccui.LayoutParameter;
    return parameter
};
ccui.LinearLayoutParameter = ccui.LayoutParameter.extend({_linearGravity: null, ctor: function () {
    ccui.LayoutParameter.prototype.ctor.call(this);
    this._linearGravity = ccui.LINEAR_GRAVITY_NONE;
    this._layoutParameterType = ccui.LayoutParameter.LINEAR
}, setGravity: function (gravity) {
    this._linearGravity = gravity
}, getGravity: function () {
    return this._linearGravity
}, createCloneInstance: function () {
    return ccui.LinearLayoutParameter.create()
}, copyProperties: function (model) {
    ccui.LayoutParameter.prototype.copyProperties.call(this,
        model);
    this.setGravity(model._linearGravity)
}});
ccui.LinearLayoutParameter.create = function () {
    var parameter = new ccui.LinearLayoutParameter;
    return parameter
};
ccui.RelativeLayoutParameter = ccui.LayoutParameter.extend({_relativeAlign: null, _relativeWidgetName: "", _relativeLayoutName: "", _put: false, ctor: function () {
    ccui.LayoutParameter.prototype.ctor.call(this);
    this._relativeAlign = ccui.RELATIVE_ALIGN_NONE;
    this._relativeWidgetName = "";
    this._relativeLayoutName = "";
    this._put = false;
    this._layoutParameterType = ccui.LayoutParameter.RELATIVE
}, setAlign: function (align) {
    this._relativeAlign = align
}, getAlign: function () {
    return this._relativeAlign
}, setRelativeToWidgetName: function (name) {
    this._relativeWidgetName =
        name
}, getRelativeToWidgetName: function () {
    return this._relativeWidgetName
}, setRelativeName: function (name) {
    this._relativeLayoutName = name
}, getRelativeName: function () {
    return this._relativeLayoutName
}, createCloneInstance: function () {
    return ccui.LinearLayoutParameter.create()
}, copyProperties: function (model) {
    ccui.LayoutParameter.prototype.copyProperties.call(this, model);
    this.setAlign(model._relativeAlign);
    this.setRelativeToWidgetName(model._relativeWidgetName);
    this.setRelativeName(model._relativeLayoutName)
}});
ccui.RelativeLayoutParameter.create = function () {
    var parameter = new ccui.RelativeLayoutParameter;
    return parameter
};
ccui.LayoutParameter.NONE = 0;
ccui.LayoutParameter.LINEAR = 1;
ccui.LayoutParameter.RELATIVE = 2;
ccui.LINEAR_GRAVITY_NONE = 0;
ccui.LINEAR_GRAVITY_LEFT = 1;
ccui.LINEAR_GRAVITY_TOP = 2;
ccui.LINEAR_GRAVITY_RIGHT = 3;
ccui.LINEAR_GRAVITY_BOTTOM = 4;
ccui.LINEAR_GRAVITY_CENTER_VERTICAL = 5;
ccui.LINEAR_GRAVITY_CENTER_HORIZONTAL = 6;
ccui.RELATIVE_ALIGN_NONE = 0;
ccui.RELATIVE_ALIGN_PARENT_TOP_LEFT = 1;
ccui.RELATIVE_ALIGN_PARENT_TOP_CENTER_HORIZONTAL = 2;
ccui.RELATIVE_ALIGN_PARENT_TOP_RIGHT = 3;
ccui.RELATIVE_ALIGN_PARENT_LEFT_CENTER_VERTICAL = 4;
ccui.RELATIVE_ALIGN_PARENT_CENTER = 5;
ccui.RELATIVE_ALIGN_PARENT_RIGHT_CENTER_VERTICAL = 6;
ccui.RELATIVE_ALIGN_PARENT_LEFT_BOTTOM = 7;
ccui.RELATIVE_ALIGN_PARENT_BOTTOM_CENTER_HORIZONTAL = 8;
ccui.RELATIVE_ALIGN_PARENT_RIGHT_BOTTOM = 9;
ccui.RELATIVE_ALIGN_LOCATION_ABOVE_LEFT = 10;
ccui.RELATIVE_ALIGN_LOCATION_ABOVE_CENTER = 11;
ccui.RELATIVE_ALIGN_LOCATION_ABOVE_RIGHT = 12;
ccui.RELATIVE_ALIGN_LOCATION_LEFT_TOP = 13;
ccui.RELATIVE_ALIGN_LOCATION_LEFT_CENTER = 14;
ccui.RELATIVE_ALIGN_LOCATION_LEFT_BOTTOM = 15;
ccui.RELATIVE_ALIGN_LOCATION_RIGHT_TOP = 16;
ccui.RELATIVE_ALIGN_LOCATION_RIGHT_CENTER = 17;
ccui.RELATIVE_ALIGN_LOCATION_RIGHT_BOTTOM = 18;
ccui.RELATIVE_ALIGN_LOCATION_BELOW_TOP = 19;
ccui.RELATIVE_ALIGN_LOCATION_BELOW_CENTER = 20;
ccui.RELATIVE_ALIGN_LOCATION_BELOW_BOTTOM = 21;
ccui.Margin = ccui.Class.extend({left: 0, top: 0, right: 0, bottom: 0, ctor: function (margin, top, right, bottom) {
    if (margin && top === undefined) {
        this.left = margin.left;
        this.top = margin.top;
        this.right = margin.right;
        this.bottom = margin.bottom
    }
    if (bottom !== undefined) {
        this.left = margin;
        this.top = top;
        this.right = right;
        this.bottom = bottom
    }
}, setMargin: function (l, t, r, b) {
    this.left = l;
    this.top = t;
    this.right = r;
    this.bottom = b
}, equals: function (target) {
    return this.left == target.left && this.top == target.top && this.right == target.right && this.bottom ==
        target.bottom
}});
ccui.MarginZero = function () {
    return new ccui.Margin(0, 0, 0, 0)
};
ccui.helper = {seekWidgetByTag: function (root, tag) {
    if (!root)return null;
    if (root.getTag() == tag)return root;
    var arrayRootChildren = root.getChildren();
    var length = arrayRootChildren.length;
    for (var i = 0; i < length; i++) {
        var child = arrayRootChildren[i];
        var res = this.seekWidgetByTag(child, tag);
        if (res != null)return res
    }
    return null
}, seekWidgetByName: function (root, name) {
    if (!root)return null;
    if (root.getName() == name)return root;
    var arrayRootChildren = root.getChildren();
    var length = arrayRootChildren.length;
    for (var i = 0; i < length; i++) {
        var child =
            arrayRootChildren[i];
        var res = this.seekWidgetByName(child, name);
        if (res != null)return res
    }
    return null
}, seekWidgetByRelativeName: function (root, name) {
    if (!root)return null;
    var arrayRootChildren = root.getChildren();
    var length = arrayRootChildren.length;
    for (var i = 0; i < length; i++) {
        var child = arrayRootChildren[i];
        var layoutParameter = child.getLayoutParameter(ccui.LayoutParameter.RELATIVE);
        if (layoutParameter && layoutParameter.getRelativeName() == name)return child
    }
    return null
}, seekActionWidgetByActionTag: function (root, tag) {
    if (!root)return null;
    if (root.getActionTag() == tag)return root;
    var arrayRootChildren = root.getChildren();
    for (var i = 0; i < arrayRootChildren.length; i++) {
        var child = arrayRootChildren[i];
        var res = this.seekActionWidgetByActionTag(child, tag);
        if (res != null)return res
    }
    return null
}};
ccui.helper;
ccui.Button = ccui.Widget.extend({_buttonNormalRenderer: null, _buttonClickedRenderer: null, _buttonDisableRenderer: null, _titleRenderer: null, _normalFileName: "", _clickedFileName: "", _disabledFileName: "", _prevIgnoreSize: true, _scale9Enabled: false, _capInsetsNormal: null, _capInsetsPressed: null, _capInsetsDisabled: null, _normalTexType: null, _pressedTexType: null, _disabledTexType: null, _normalTextureSize: null, _pressedTextureSize: null, _disabledTextureSize: null, pressedActionEnabled: false, _titleColor: null, _normalTextureScaleXInSize: 1,
    _normalTextureScaleYInSize: 1, _pressedTextureScaleXInSize: 1, _pressedTextureScaleYInSize: 1, _normalTextureLoaded: false, _pressedTextureLoaded: false, _disabledTextureLoaded: false, _className: "Button", ctor: function () {
        ccui.Widget.prototype.ctor.call(this);
        this._buttonNormalRenderer = null;
        this._buttonClickedRenderer = null;
        this._buttonDisableRenderer = null;
        this._titleRenderer = null;
        this._normalFileName = "";
        this._clickedFileName = "";
        this._disabledFileName = "";
        this._prevIgnoreSize = true;
        this._scale9Enabled = false;
        this._capInsetsNormal =
            cc.rect(0, 0, 0, 0);
        this._capInsetsPressed = cc.rect(0, 0, 0, 0);
        this._capInsetsDisabled = cc.rect(0, 0, 0, 0);
        this._normalTexType = ccui.Widget.LOCAL_TEXTURE;
        this._pressedTexType = ccui.Widget.LOCAL_TEXTURE;
        this._disabledTexType = ccui.Widget.LOCAL_TEXTURE;
        var locSize = this._size;
        this._normalTextureSize = cc.size(locSize.width, locSize.height);
        this._pressedTextureSize = cc.size(locSize.width, locSize.height);
        this._disabledTextureSize = cc.size(locSize.width, locSize.height);
        this.pressedActionEnabled = false;
        this._titleColor = cc.color.WHITE;
        this._normalTextureScaleXInSize = 1;
        this._normalTextureScaleYInSize = 1;
        this._pressedTextureScaleXInSize = 1;
        this._pressedTextureScaleYInSize = 1;
        this._normalTextureLoaded = false;
        this._pressedTextureLoaded = false;
        this._disabledTextureLoaded = false
    }, init: function () {
        if (ccui.Widget.prototype.init.call(this)) {
            this.setTouchEnabled(true);
            return true
        }
        return false
    }, initRenderer: function () {
        this._buttonNormalRenderer = cc.Sprite.create();
        this._buttonClickedRenderer = cc.Sprite.create();
        this._buttonDisableRenderer = cc.Sprite.create();
        this._titleRenderer = cc.LabelTTF.create("");
        cc.Node.prototype.addChild.call(this, this._buttonNormalRenderer, ccui.Button.NORMAL_RENDERER_ZORDER);
        cc.Node.prototype.addChild.call(this, this._buttonClickedRenderer, ccui.Button.PRESSED_RENDERER_ZORDER);
        cc.Node.prototype.addChild.call(this, this._buttonDisableRenderer, ccui.Button.DISABLED_RENDERER_ZORDER);
        cc.Node.prototype.addChild.call(this, this._titleRenderer, ccui.Button.TITLE_RENDERER_ZORDER)
    }, setScale9Enabled: function (able) {
        if (this._scale9Enabled == able)return;
        this._brightStyle = ccui.Widget.BRIGHT_STYLE_NONE;
        this._scale9Enabled = able;
        cc.Node.prototype.removeChild.call(this, this._buttonNormalRenderer, true);
        cc.Node.prototype.removeChild.call(this, this._buttonClickedRenderer, true);
        cc.Node.prototype.removeChild.call(this, this._buttonDisableRenderer, true);
        if (this._scale9Enabled) {
            this._buttonNormalRenderer = cc.Scale9Sprite.create();
            this._buttonClickedRenderer = cc.Scale9Sprite.create();
            this._buttonDisableRenderer = cc.Scale9Sprite.create()
        } else {
            this._buttonNormalRenderer =
                cc.Sprite.create();
            this._buttonClickedRenderer = cc.Sprite.create();
            this._buttonDisableRenderer = cc.Sprite.create()
        }
        this.loadTextureNormal(this._normalFileName, this._normalTexType);
        this.loadTexturePressed(this._clickedFileName, this._pressedTexType);
        this.loadTextureDisabled(this._disabledFileName, this._disabledTexType);
        cc.Node.prototype.addChild.call(this, this._buttonNormalRenderer, ccui.Button.NORMAL_RENDERER_ZORDER);
        cc.Node.prototype.addChild.call(this, this._buttonClickedRenderer, ccui.Button.PRESSED_RENDERER_ZORDER);
        cc.Node.prototype.addChild.call(this, this._buttonDisableRenderer, ccui.Button.DISABLED_RENDERER_ZORDER);
        if (this._scale9Enabled) {
            var ignoreBefore = this._ignoreSize;
            this.ignoreContentAdaptWithSize(false);
            this._prevIgnoreSize = ignoreBefore
        } else this.ignoreContentAdaptWithSize(this._prevIgnoreSize);
        this.setCapInsetsNormalRenderer(this._capInsetsNormal);
        this.setCapInsetsPressedRenderer(this._capInsetsPressed);
        this.setCapInsetsDisabledRenderer(this._capInsetsDisabled);
        this.setBright(this._bright)
    }, isScale9Enabled: function () {
        return this._scale9Enabled
    },
    ignoreContentAdaptWithSize: function (ignore) {
        if (!this._scale9Enabled || this._scale9Enabled && !ignore) {
            ccui.Widget.prototype.ignoreContentAdaptWithSize.call(this, ignore);
            this._prevIgnoreSize = ignore
        }
    }, loadTextures: function (normal, selected, disabled, texType) {
        this.loadTextureNormal(normal, texType);
        this.loadTexturePressed(selected, texType);
        this.loadTextureDisabled(disabled, texType)
    }, loadTextureNormal: function (normal, texType) {
        if (!normal)return;
        texType = texType || ccui.Widget.LOCAL_TEXTURE;
        this._normalFileName =
            normal;
        this._normalTexType = texType;
        var buttonNormalRenderer = this._buttonNormalRenderer;
        switch (this._normalTexType) {
            case ccui.Widget.LOCAL_TEXTURE:
                buttonNormalRenderer.initWithFile(normal);
                break;
            case ccui.Widget.PLIST_TEXTURE:
                buttonNormalRenderer.initWithSpriteFrameName(normal);
                break;
            default:
                break
        }
        var buttonRenderSize = buttonNormalRenderer.getContentSize();
        if (buttonNormalRenderer.textureLoaded()) {
            this._normalTextureSize.width = buttonRenderSize.width;
            this._normalTextureSize.height = buttonRenderSize.height
        } else {
            buttonNormalRenderer.addLoadedEventListener(function () {
                this._normalTextureSize =
                    buttonNormalRenderer.getContentSize();
                if (buttonNormalRenderer.setCapInsets)buttonNormalRenderer.setCapInsets(this._capInsetsNormal);
                this.normalTextureScaleChangedWithSize()
            }, this);
            this._normalTextureSize.width = this._customSize.width;
            this._normalTextureSize.height = this._customSize.height
        }
        if (this._scale9Enabled)buttonNormalRenderer.setCapInsets(this._capInsetsNormal);
        this.updateColorToRenderer(buttonNormalRenderer);
        this.updateAnchorPoint();
        this.updateFlippedX();
        this.updateFlippedY();
        this.normalTextureScaleChangedWithSize();
        this._normalTextureLoaded = true
    }, loadTexturePressed: function (selected, texType) {
        if (!selected)return;
        texType = texType || ccui.Widget.LOCAL_TEXTURE;
        this._clickedFileName = selected;
        this._pressedTexType = texType;
        var clickedRenderer = this._buttonClickedRenderer;
        switch (this._pressedTexType) {
            case ccui.Widget.LOCAL_TEXTURE:
                clickedRenderer.initWithFile(selected);
                break;
            case ccui.Widget.PLIST_TEXTURE:
                clickedRenderer.initWithSpriteFrameName(selected);
                break;
            default:
                break
        }
        if (clickedRenderer.textureLoaded())this._pressedTextureSize =
            clickedRenderer.getContentSize(); else {
            clickedRenderer.addLoadedEventListener(function () {
                this._pressedTextureSize = clickedRenderer.getContentSize();
                if (clickedRenderer.setCapInsets)clickedRenderer.setCapInsets(this._capInsetsNormal);
                this.pressedTextureScaleChangedWithSize()
            }, this);
            this._pressedTextureSize.width = this._customSize.width;
            this._pressedTextureSize.height = this._customSize.height
        }
        if (this._scale9Enabled)clickedRenderer.setCapInsets(this._capInsetsNormal);
        this.updateColorToRenderer(clickedRenderer);
        this.updateAnchorPoint();
        this.updateFlippedX();
        this.updateFlippedY();
        this.pressedTextureScaleChangedWithSize();
        this._pressedTextureLoaded = true
    }, loadTextureDisabled: function (disabled, texType) {
        if (!disabled)return;
        texType = texType || ccui.Widget.LOCAL_TEXTURE;
        this._disabledFileName = disabled;
        this._disabledTexType = texType;
        var disableRenderer = this._buttonDisableRenderer;
        switch (this._disabledTexType) {
            case ccui.Widget.LOCAL_TEXTURE:
                disableRenderer.initWithFile(disabled);
                break;
            case ccui.Widget.PLIST_TEXTURE:
                disableRenderer.initWithSpriteFrameName(disabled);
                break;
            default:
                break
        }
        if (disableRenderer.textureLoaded())this._disabledTextureSize = disableRenderer.getContentSize(); else {
            disableRenderer.addLoadedEventListener(function () {
                this._disabledTextureSize = disableRenderer.getContentSize();
                if (disableRenderer.setCapInsets)disableRenderer.setCapInsets(this._capInsetsNormal);
                this.disabledTextureScaleChangedWithSize()
            }, this);
            this._disabledTextureSize.width = this._customSize.width;
            this._disabledTextureSize.height = this._customSize.height
        }
        if (this._scale9Enabled)disableRenderer.setCapInsets(this._capInsetsNormal);
        this.updateColorToRenderer(disableRenderer);
        this.updateAnchorPoint();
        this.updateFlippedX();
        this.updateFlippedY();
        this.disabledTextureScaleChangedWithSize();
        this._disabledTextureLoaded = true
    }, setCapInsets: function (capInsets) {
        this.setCapInsetsNormalRenderer(capInsets);
        this.setCapInsetsPressedRenderer(capInsets);
        this.setCapInsetsDisabledRenderer(capInsets)
    }, setCapInsetsNormalRenderer: function (capInsets) {
        this._capInsetsNormal = capInsets;
        if (!this._scale9Enabled)return;
        this._buttonNormalRenderer.setCapInsets(capInsets)
    },
    getCapInsetNormalRenderer: function () {
        return this._capInsetsNormal
    }, setCapInsetsPressedRenderer: function (capInsets) {
        this._capInsetsPressed = capInsets;
        if (!this._scale9Enabled)return;
        this._buttonClickedRenderer.setCapInsets(capInsets)
    }, getCapInsetPressedRenderer: function () {
        return this._capInsetsPressed
    }, setCapInsetsDisabledRenderer: function (capInsets) {
        this._capInsetsDisabled = capInsets;
        if (!this._scale9Enabled)return;
        this._buttonDisableRenderer.setCapInsets(capInsets)
    }, getCapInsetDisabledRenderer: function () {
        return this._capInsetsDisabled
    },
    onPressStateChangedToNormal: function () {
        this._buttonNormalRenderer.setVisible(true);
        this._buttonClickedRenderer.setVisible(false);
        this._buttonDisableRenderer.setVisible(false);
        if (this._pressedTextureLoaded) {
            if (this.pressedActionEnabled) {
                this._buttonNormalRenderer.stopAllActions();
                this._buttonClickedRenderer.stopAllActions();
                this._buttonDisableRenderer.stopAllActions();
                var zoomAction = cc.ScaleTo.create(0.05, 1);
                var zoomAction1 = cc.ScaleTo.create(0.05, 1);
                var zoomAction2 = cc.ScaleTo.create(0.05, 1);
                this._buttonNormalRenderer.runAction(zoomAction);
                this._buttonClickedRenderer.runAction(zoomAction1);
                this._buttonDisableRenderer.runAction(zoomAction2)
            }
        } else {
            this._buttonNormalRenderer.stopAllActions();
            this._buttonNormalRenderer.setScale(this._normalTextureScaleXInSize, this._normalTextureScaleYInSize)
        }
    }, onPressStateChangedToPressed: function () {
        if (this._pressedTextureLoaded) {
            this._buttonNormalRenderer.setVisible(false);
            this._buttonClickedRenderer.setVisible(true);
            this._buttonDisableRenderer.setVisible(false);
            if (this.pressedActionEnabled) {
                this._buttonNormalRenderer.stopAllActions();
                this._buttonClickedRenderer.stopAllActions();
                this._buttonDisableRenderer.stopAllActions();
                var zoomAction = cc.ScaleTo.create(0.05, 1.1);
                var zoomAction1 = cc.ScaleTo.create(0.05, 1.1);
                var zoomAction2 = cc.ScaleTo.create(0.05, 1.1);
                this._buttonNormalRenderer.runAction(zoomAction);
                this._buttonClickedRenderer.runAction(zoomAction1);
                this._buttonDisableRenderer.runAction(zoomAction2)
            }
        } else {
            this._buttonNormalRenderer.setVisible(true);
            this._buttonClickedRenderer.setVisible(true);
            this._buttonDisableRenderer.setVisible(false);
            this._buttonNormalRenderer.stopAllActions();
            this._buttonClickedRenderer.setScale(this._pressedTextureScaleXInSize, this._pressedTextureScaleYInSize)
        }
    }, onPressStateChangedToDisabled: function () {
        this._buttonNormalRenderer.setVisible(false);
        this._buttonClickedRenderer.setVisible(false);
        this._buttonDisableRenderer.setVisible(true);
        this._buttonNormalRenderer.setScale(this._normalTextureScaleXInSize, this._normalTextureScaleYInSize);
        this._buttonClickedRenderer.setScale(this._pressedTextureScaleXInSize, this._pressedTextureScaleYInSize)
    },
    updateFlippedX: function () {
        this._titleRenderer.setFlippedX(this._flippedX);
        if (this._scale9Enabled)if (this._flippedX) {
            this._buttonNormalRenderer.setScaleX(-1);
            this._buttonClickedRenderer.setScaleX(-1);
            this._buttonDisableRenderer.setScaleX(-1)
        } else {
            this._buttonNormalRenderer.setScaleX(1);
            this._buttonClickedRenderer.setScaleX(1);
            this._buttonDisableRenderer.setScaleX(1)
        } else {
            this._buttonNormalRenderer.setFlippedX(this._flippedX);
            this._buttonClickedRenderer.setFlippedX(this._flippedX);
            this._buttonDisableRenderer.setFlippedX(this._flippedX)
        }
    },
    updateFlippedY: function () {
        this._titleRenderer.setFlippedY(this._flippedY);
        if (this._scale9Enabled)if (this._flippedX) {
            this._buttonNormalRenderer.setScaleY(-1);
            this._buttonClickedRenderer.setScaleX(-1);
            this._buttonDisableRenderer.setScaleX(-1)
        } else {
            this._buttonNormalRenderer.setScaleY(1);
            this._buttonClickedRenderer.setScaleY(1);
            this._buttonDisableRenderer.setScaleY(1)
        } else {
            this._buttonNormalRenderer.setFlippedY(this._flippedY);
            this._buttonClickedRenderer.setFlippedY(this._flippedY);
            this._buttonDisableRenderer.setFlippedY(this._flippedY)
        }
    },
    setAnchorPoint: function (point, y) {
        if (y === undefined) {
            ccui.Widget.prototype.setAnchorPoint.call(this, point);
            this._buttonNormalRenderer.setAnchorPoint(point);
            this._buttonClickedRenderer.setAnchorPoint(point);
            this._buttonDisableRenderer.setAnchorPoint(point)
        } else {
            ccui.Widget.prototype.setAnchorPoint.call(this, point, y);
            this._buttonNormalRenderer.setAnchorPoint(point, y);
            this._buttonClickedRenderer.setAnchorPoint(point, y);
            this._buttonDisableRenderer.setAnchorPoint(point, y)
        }
        this._titleRenderer.setPosition(this._size.width *
            (0.5 - this._anchorPoint.x), this._size.height * (0.5 - this._anchorPoint.y))
    }, _setAnchorX: function (value) {
        ccui.Widget.prototype._setAnchorX.call(this, value);
        this._buttonNormalRenderer._setAnchorX(value);
        this._buttonClickedRenderer._setAnchorX(value);
        this._buttonDisableRenderer._setAnchorX(value);
        this._titleRenderer.setPositionX(this._size.width * (0.5 - this._anchorPoint.x))
    }, _setAnchorY: function (value) {
        ccui.Widget.prototype._setAnchorY.call(this, value);
        this._buttonNormalRenderer._setAnchorY(value);
        this._buttonClickedRenderer._setAnchorY(value);
        this._buttonDisableRenderer._setAnchorY(value);
        this._titleRenderer.setPositionY(this._size.height * (0.5 - this._anchorPoint.y))
    }, onSizeChanged: function () {
        ccui.Widget.prototype.onSizeChanged.call(this);
        this.normalTextureScaleChangedWithSize();
        this.pressedTextureScaleChangedWithSize();
        this.disabledTextureScaleChangedWithSize()
    }, getContentSize: function () {
        return this._normalTextureSize
    }, _getWidth: function () {
        return this._scale9Enabled ? this._size.width : this._normalTextureSize.width
    }, _getHeight: function () {
        return this._scale9Enabled ?
            this._size.height : this._normalTextureSize.height
    }, getVirtualRenderer: function () {
        if (this._bright)switch (this._brightStyle) {
            case ccui.Widget.BRIGHT_STYLE_NORMAL:
                return this._buttonNormalRenderer;
            case ccui.Widget.BRIGHT_STYLE_HIGH_LIGHT:
                return this._buttonClickedRenderer;
            default:
                return null
        } else return this._buttonDisableRenderer
    }, normalTextureScaleChangedWithSize: function () {
        if (this._ignoreSize) {
            if (!this._scale9Enabled) {
                this._buttonNormalRenderer.setScale(1);
                this._normalTextureScaleXInSize = this._normalTextureScaleYInSize =
                    1;
                this._size.width = this._normalTextureSize.width;
                this._size.height = this._normalTextureSize.height
            }
        } else if (this._scale9Enabled) {
            this._buttonNormalRenderer.setPreferredSize(this._size);
            this._normalTextureScaleXInSize = this._normalTextureScaleYInSize = 1
        } else {
            var textureSize = this._normalTextureSize;
            if (textureSize.width <= 0 || textureSize.height <= 0) {
                this._buttonNormalRenderer.setScale(1);
                return
            }
            var scaleX = this._size.width / textureSize.width;
            var scaleY = this._size.height / textureSize.height;
            this._buttonNormalRenderer.setScaleX(scaleX);
            this._buttonNormalRenderer.setScaleY(scaleY);
            this._normalTextureScaleXInSize = scaleX;
            this._normalTextureScaleYInSize = scaleY
        }
    }, pressedTextureScaleChangedWithSize: function () {
        if (this._ignoreSize) {
            if (!this._scale9Enabled) {
                this._buttonClickedRenderer.setScale(1);
                this._pressedTextureScaleXInSize = this._pressedTextureScaleYInSize = 1
            }
        } else if (this._scale9Enabled) {
            this._buttonClickedRenderer.setPreferredSize(this._size);
            this._pressedTextureScaleXInSize = this._pressedTextureScaleYInSize = 1
        } else {
            var textureSize =
                this._pressedTextureSize;
            if (textureSize.width <= 0 || textureSize.height <= 0) {
                this._buttonClickedRenderer.setScale(1);
                return
            }
            var scaleX = this._size.width / textureSize.width;
            var scaleY = this._size.height / textureSize.height;
            this._buttonClickedRenderer.setScaleX(scaleX);
            this._buttonClickedRenderer.setScaleY(scaleY);
            this._pressedTextureScaleXInSize = scaleX;
            this._pressedTextureScaleYInSize = scaleY
        }
    }, disabledTextureScaleChangedWithSize: function () {
        if (this._ignoreSize) {
            if (!this._scale9Enabled)this._buttonDisableRenderer.setScale(1)
        } else if (this._scale9Enabled)this._buttonDisableRenderer.setPreferredSize(this._size);
        else {
            var textureSize = this._disabledTextureSize;
            if (textureSize.width <= 0 || textureSize.height <= 0) {
                this._buttonDisableRenderer.setScale(1);
                return
            }
            var scaleX = this._size.width / textureSize.width;
            var scaleY = this._size.height / textureSize.height;
            this._buttonDisableRenderer.setScaleX(scaleX);
            this._buttonDisableRenderer.setScaleY(scaleY)
        }
    }, setPressedActionEnabled: function (enabled) {
        this.pressedActionEnabled = enabled
    }, setTitleText: function (text) {
        this._titleRenderer.setString(text)
    }, getTitleText: function () {
        return this._titleRenderer.getString()
    },
    setTitleColor: function (color) {
        this._titleColor.r = color.r;
        this._titleColor.g = color.g;
        this._titleColor.b = color.b;
        this._titleRenderer.setColor(color)
    }, getTitleColor: function () {
        return this._titleRenderer.getColor()
    }, setTitleFontSize: function (size) {
        this._titleRenderer.setFontSize(size)
    }, getTitleFontSize: function () {
        return this._titleRenderer.getFontSize()
    }, setTitleFontName: function (fontName) {
        this._titleRenderer.setFontName(fontName)
    }, getTitleFontName: function () {
        return this._titleRenderer.getFontName()
    },
    _setTitleFont: function (font) {
        this._titleRenderer.font = font
    }, _getTitleFont: function () {
        return this._titleRenderer.font
    }, updateTextureColor: function () {
        this.updateColorToRenderer(this._buttonNormalRenderer);
        this.updateColorToRenderer(this._buttonClickedRenderer);
        this.updateColorToRenderer(this._buttonDisableRenderer)
    }, updateTextureOpacity: function () {
        this.updateOpacityToRenderer(this._buttonNormalRenderer);
        this.updateOpacityToRenderer(this._buttonClickedRenderer);
        this.updateOpacityToRenderer(this._buttonDisableRenderer)
    },
    getDescription: function () {
        return"Button"
    }, createCloneInstance: function () {
        return ccui.Button.create()
    }, copySpecialProperties: function (uiButton) {
        this._prevIgnoreSize = uiButton._prevIgnoreSize;
        this.setScale9Enabled(uiButton._scale9Enabled);
        this.loadTextureNormal(uiButton._normalFileName, uiButton._normalTexType);
        this.loadTexturePressed(uiButton._clickedFileName, uiButton._pressedTexType);
        this.loadTextureDisabled(uiButton._disabledFileName, uiButton._disabledTexType);
        this.setCapInsetsNormalRenderer(uiButton._capInsetsNormal);
        this.setCapInsetsPressedRenderer(uiButton._capInsetsPressed);
        this.setCapInsetsDisabledRenderer(uiButton._capInsetsDisabled);
        this.setTitleText(uiButton.getTitleText());
        this.setTitleFontName(uiButton.getTitleFontName());
        this.setTitleFontSize(uiButton.getTitleFontSize());
        this.setTitleColor(uiButton.getTitleColor());
        this.setPressedActionEnabled(uiButton.pressedActionEnabled)
    }});
var _p = ccui.Button.prototype;
_p.titleText;
cc.defineGetterSetter(_p, "titleText", _p.getTitleText, _p.setTitleText);
_p.titleFont;
cc.defineGetterSetter(_p, "titleFont", _p._getTitleFont, _p._setTitleFont);
_p.titleFontSize;
cc.defineGetterSetter(_p, "titleFontSize", _p.getTitleFontSize, _p.setTitleFontSize);
_p.titleFontName;
cc.defineGetterSetter(_p, "titleFontName", _p.getTitleFontName, _p.setTitleFontName);
_p.titleColor;
cc.defineGetterSetter(_p, "titleColor", _p.getTitleColor, _p.setTitleColor);
_p = null;
ccui.Button.create = function () {
    var uiButton = new ccui.Button;
    if (uiButton && uiButton.init())return uiButton;
    return null
};
ccui.Button.NORMAL_RENDERER_ZORDER = -2;
ccui.Button.PRESSED_RENDERER_ZORDER = -2;
ccui.Button.DISABLED_RENDERER_ZORDER = -2;
ccui.Button.TITLE_RENDERER_ZORDER = -1;
ccui.CheckBox = ccui.Widget.extend({_backGroundBoxRenderer: null, _backGroundSelectedBoxRenderer: null, _frontCrossRenderer: null, _backGroundBoxDisabledRenderer: null, _frontCrossDisabledRenderer: null, _isSelected: true, _checkBoxEventListener: null, _checkBoxEventSelector: null, _backGroundTexType: null, _backGroundSelectedTexType: null, _frontCrossTexType: null, _backGroundDisabledTexType: null, _frontCrossDisabledTexType: null, _backGroundFileName: "", _backGroundSelectedFileName: "", _frontCrossFileName: "", _backGroundDisabledFileName: "",
    _frontCrossDisabledFileName: "", _className: "CheckBox", ctor: function () {
        ccui.Widget.prototype.ctor.call(this);
        this._backGroundBoxRenderer = null;
        this._backGroundSelectedBoxRenderer = null;
        this._frontCrossRenderer = null;
        this._backGroundBoxDisabledRenderer = null;
        this._frontCrossDisabledRenderer = null;
        this._isSelected = true;
        this._checkBoxEventListener = null;
        this._checkBoxEventSelector = null;
        this._backGroundTexType = ccui.Widget.LOCAL_TEXTURE;
        this._backGroundSelectedTexType = ccui.Widget.LOCAL_TEXTURE;
        this._frontCrossTexType =
            ccui.Widget.LOCAL_TEXTURE;
        this._backGroundDisabledTexType = ccui.Widget.LOCAL_TEXTURE;
        this._frontCrossDisabledTexType = ccui.Widget.LOCAL_TEXTURE;
        this._backGroundFileName = "";
        this._backGroundSelectedFileName = "";
        this._frontCrossFileName = "";
        this._backGroundDisabledFileName = "";
        this._frontCrossDisabledFileName = ""
    }, init: function () {
        if (ccui.Widget.prototype.init.call(this)) {
            this.setTouchEnabled(true);
            this.setSelectedState(false);
            return true
        }
        return false
    }, initRenderer: function () {
        this._backGroundBoxRenderer = cc.Sprite.create();
        this._backGroundSelectedBoxRenderer = cc.Sprite.create();
        this._frontCrossRenderer = cc.Sprite.create();
        this._backGroundBoxDisabledRenderer = cc.Sprite.create();
        this._frontCrossDisabledRenderer = cc.Sprite.create();
        cc.Node.prototype.addChild.call(this, this._backGroundBoxRenderer, ccui.CheckBox.BOX_RENDERER_ZORDER, -1);
        cc.Node.prototype.addChild.call(this, this._backGroundSelectedBoxRenderer, ccui.CheckBox.BOX_SELECTED_RENDERER_ZORDER, -1);
        cc.Node.prototype.addChild.call(this, this._frontCrossRenderer, ccui.CheckBox.FRONT_CROSS_RENDERER_ZORDER,
            -1);
        cc.Node.prototype.addChild.call(this, this._backGroundBoxDisabledRenderer, ccui.CheckBox.BOX_DISABLED_RENDERER_ZORDER, -1);
        cc.Node.prototype.addChild.call(this, this._frontCrossDisabledRenderer, ccui.CheckBox.FRONT_CROSS_DISABLED_RENDERER_ZORDER, -1)
    }, loadTextures: function (backGround, backGroundSelected, cross, backGroundDisabled, frontCrossDisabled, texType) {
        this.loadTextureBackGround(backGround, texType);
        this.loadTextureBackGroundSelected(backGroundSelected, texType);
        this.loadTextureFrontCross(cross, texType);
        this.loadTextureBackGroundDisabled(backGroundDisabled, texType);
        this.loadTextureFrontCrossDisabled(frontCrossDisabled, texType)
    }, loadTextureBackGround: function (backGround, texType) {
        if (!backGround)return;
        texType = texType || ccui.Widget.LOCAL_TEXTURE;
        this._backGroundFileName = backGround;
        this._backGroundTexType = texType;
        var bgBoxRenderer = this._backGroundBoxRenderer;
        switch (this._backGroundTexType) {
            case ccui.Widget.LOCAL_TEXTURE:
                bgBoxRenderer.initWithFile(backGround);
                break;
            case ccui.Widget.PLIST_TEXTURE:
                bgBoxRenderer.initWithSpriteFrameName(backGround);
                break;
            default:
                break
        }
        this.updateColorToRenderer(bgBoxRenderer);
        this.updateAnchorPoint();
        this.updateFlippedX();
        this.updateFlippedY();
        if (!bgBoxRenderer.textureLoaded()) {
            this._backGroundBoxRenderer.setContentSize(this._customSize);
            bgBoxRenderer.addLoadedEventListener(function () {
                this.backGroundTextureScaleChangedWithSize()
            }, this)
        }
        this.backGroundTextureScaleChangedWithSize()
    }, loadTextureBackGroundSelected: function (backGroundSelected, texType) {
        if (!backGroundSelected)return;
        texType = texType || ccui.Widget.LOCAL_TEXTURE;
        this._backGroundSelectedFileName = backGroundSelected;
        this._backGroundSelectedTexType = texType;
        switch (this._backGroundSelectedTexType) {
            case ccui.Widget.LOCAL_TEXTURE:
                this._backGroundSelectedBoxRenderer.initWithFile(backGroundSelected);
                break;
            case ccui.Widget.PLIST_TEXTURE:
                this._backGroundSelectedBoxRenderer.initWithSpriteFrameName(backGroundSelected);
                break;
            default:
                break
        }
        this.updateColorToRenderer(this._backGroundSelectedBoxRenderer);
        this.updateAnchorPoint();
        this.updateFlippedX();
        this.updateFlippedY();
        this.backGroundSelectedTextureScaleChangedWithSize()
    }, loadTextureFrontCross: function (cross, texType) {
        if (!cross)return;
        texType = texType || ccui.Widget.LOCAL_TEXTURE;
        this._frontCrossFileName = cross;
        this._frontCrossTexType = texType;
        switch (this._frontCrossTexType) {
            case ccui.Widget.LOCAL_TEXTURE:
                this._frontCrossRenderer.initWithFile(cross);
                break;
            case ccui.Widget.PLIST_TEXTURE:
                this._frontCrossRenderer.initWithSpriteFrameName(cross);
                break;
            default:
                break
        }
        this.updateColorToRenderer(this._frontCrossRenderer);
        this.updateAnchorPoint();
        this.updateFlippedX();
        this.updateFlippedY();
        this.frontCrossTextureScaleChangedWithSize()
    }, loadTextureBackGroundDisabled: function (backGroundDisabled, texType) {
        if (!backGroundDisabled)return;
        texType = texType || ccui.Widget.LOCAL_TEXTURE;
        this._backGroundDisabledFileName = backGroundDisabled;
        this._backGroundDisabledTexType = texType;
        switch (this._backGroundDisabledTexType) {
            case ccui.Widget.LOCAL_TEXTURE:
                this._backGroundBoxDisabledRenderer.initWithFile(backGroundDisabled);
                break;
            case ccui.Widget.PLIST_TEXTURE:
                this._backGroundBoxDisabledRenderer.initWithSpriteFrameName(backGroundDisabled);
                break;
            default:
                break
        }
        this.updateColorToRenderer(this._backGroundBoxDisabledRenderer);
        this.updateAnchorPoint();
        this.updateFlippedX();
        this.updateFlippedY();
        this.backGroundDisabledTextureScaleChangedWithSize()
    }, loadTextureFrontCrossDisabled: function (frontCrossDisabled, texType) {
        if (!frontCrossDisabled)return;
        texType = texType || ccui.Widget.LOCAL_TEXTURE;
        this._frontCrossDisabledFileName = frontCrossDisabled;
        this._frontCrossDisabledTexType = texType;
        switch (this._frontCrossDisabledTexType) {
            case ccui.Widget.LOCAL_TEXTURE:
                this._frontCrossDisabledRenderer.initWithFile(frontCrossDisabled);
                break;
            case ccui.Widget.PLIST_TEXTURE:
                this._frontCrossDisabledRenderer.initWithSpriteFrameName(frontCrossDisabled);
                break;
            default:
                break
        }
        this.updateColorToRenderer(this._frontCrossDisabledRenderer);
        this.updateAnchorPoint();
        this.updateFlippedX();
        this.updateFlippedY();
        this.frontCrossDisabledTextureScaleChangedWithSize()
    }, onTouchEnded: function (touch, event) {
        var touchPoint = touch.getLocation();
        this._touchEndPos.x = touchPoint.x;
        this._touchEndPos.y = touchPoint.y;
        if (this._focus) {
            this.releaseUpEvent();
            if (this._isSelected) {
                this.setSelectedState(false);
                this.unSelectedEvent()
            } else {
                this.setSelectedState(true);
                this.selectedEvent()
            }
        }
        this.setFocused(false);
        var widgetParent = this.getWidgetParent();
        if (widgetParent)widgetParent.checkChildInfo(2, this, touchPoint)
    }, onPressStateChangedToNormal: function () {
        this._backGroundBoxRenderer.setVisible(true);
        this._backGroundSelectedBoxRenderer.setVisible(false);
        this._backGroundBoxDisabledRenderer.setVisible(false);
        this._frontCrossDisabledRenderer.setVisible(false)
    }, onPressStateChangedToPressed: function () {
        this._backGroundBoxRenderer.setVisible(false);
        this._backGroundSelectedBoxRenderer.setVisible(true);
        this._backGroundBoxDisabledRenderer.setVisible(false);
        this._frontCrossDisabledRenderer.setVisible(false)
    }, onPressStateChangedToDisabled: function () {
        this._backGroundBoxRenderer.setVisible(false);
        this._backGroundSelectedBoxRenderer.setVisible(false);
        this._backGroundBoxDisabledRenderer.setVisible(true);
        this._frontCrossRenderer.setVisible(false);
        if (this._isSelected)this._frontCrossDisabledRenderer.setVisible(true)
    }, setSelectedState: function (selected) {
        if (selected ==
            this._isSelected)return;
        this._isSelected = selected;
        this._frontCrossRenderer.setVisible(this._isSelected)
    }, getSelectedState: function () {
        return this._isSelected
    }, selectedEvent: function () {
        if (this._checkBoxEventListener && this._checkBoxEventSelector)this._checkBoxEventSelector.call(this._checkBoxEventListener, this, ccui.CheckBox.EVENT_SELECTED)
    }, unSelectedEvent: function () {
        if (this._checkBoxEventListener && this._checkBoxEventSelector)this._checkBoxEventSelector.call(this._checkBoxEventListener, this, ccui.CheckBox.EVENT_UNSELECTED)
    },
    addEventListenerCheckBox: function (selector, target) {
        this._checkBoxEventSelector = selector;
        this._checkBoxEventListener = target
    }, updateFlippedX: function () {
        this._backGroundBoxRenderer.setFlippedX(this._flippedX);
        this._backGroundSelectedBoxRenderer.setFlippedX(this._flippedX);
        this._frontCrossRenderer.setFlippedX(this._flippedX);
        this._backGroundBoxDisabledRenderer.setFlippedX(this._flippedX);
        this._frontCrossDisabledRenderer.setFlippedX(this._flippedX)
    }, updateFlippedY: function () {
        this._backGroundBoxRenderer.setFlippedY(this._flippedY);
        this._backGroundSelectedBoxRenderer.setFlippedY(this._flippedY);
        this._frontCrossRenderer.setFlippedY(this._flippedY);
        this._backGroundBoxDisabledRenderer.setFlippedY(this._flippedY);
        this._frontCrossDisabledRenderer.setFlippedY(this._flippedY)
    }, setAnchorPoint: function (point, y) {
        if (y === undefined) {
            ccui.Widget.prototype.setAnchorPoint.call(this, point);
            this._backGroundBoxRenderer.setAnchorPoint(point);
            this._backGroundSelectedBoxRenderer.setAnchorPoint(point);
            this._backGroundBoxDisabledRenderer.setAnchorPoint(point);
            this._frontCrossRenderer.setAnchorPoint(point);
            this._frontCrossDisabledRenderer.setAnchorPoint(point)
        } else {
            ccui.Widget.prototype.setAnchorPoint.call(this, point, y);
            this._backGroundBoxRenderer.setAnchorPoint(point, y);
            this._backGroundSelectedBoxRenderer.setAnchorPoint(point, y);
            this._backGroundBoxDisabledRenderer.setAnchorPoint(point, y);
            this._frontCrossRenderer.setAnchorPoint(point, y);
            this._frontCrossDisabledRenderer.setAnchorPoint(point, y)
        }
    }, _setAnchorX: function (value) {
        ccui.Widget.prototype._setAnchorX.call(this,
            value);
        this._backGroundBoxRenderer._setAnchorX(value);
        this._backGroundSelectedBoxRenderer._setAnchorX(value);
        this._backGroundBoxDisabledRenderer._setAnchorX(value);
        this._frontCrossRenderer._setAnchorX(value);
        this._frontCrossDisabledRenderer._setAnchorX(value)
    }, _setAnchorY: function (value) {
        ccui.Widget.prototype._setAnchorY.call(this, value);
        this._backGroundBoxRenderer._setAnchorY(value);
        this._backGroundSelectedBoxRenderer._setAnchorY(value);
        this._backGroundBoxDisabledRenderer._setAnchorY(value);
        this._frontCrossRenderer._setAnchorY(value);
        this._frontCrossDisabledRenderer._setAnchorY(value)
    }, onSizeChanged: function () {
        ccui.Widget.prototype.onSizeChanged.call(this);
        this.backGroundTextureScaleChangedWithSize();
        this.backGroundSelectedTextureScaleChangedWithSize();
        this.frontCrossTextureScaleChangedWithSize();
        this.backGroundDisabledTextureScaleChangedWithSize();
        this.frontCrossDisabledTextureScaleChangedWithSize()
    }, getContentSize: function () {
        return this._backGroundBoxRenderer.getContentSize()
    }, _getWidth: function () {
        return this._backGroundBoxRenderer._getWidth()
    },
    _getHeight: function () {
        return this._backGroundBoxRenderer._getHeight()
    }, getVirtualRenderer: function () {
        return this._backGroundBoxRenderer
    }, backGroundTextureScaleChangedWithSize: function () {
        if (this._ignoreSize) {
            this._backGroundBoxRenderer.setScale(1);
            var locBackSize = this._backGroundBoxRenderer.getContentSize();
            this._size.width = locBackSize.width;
            this._size.height = locBackSize.height
        } else {
            var textureSize = this._backGroundBoxRenderer.getContentSize();
            if (textureSize.width <= 0 || textureSize.height <= 0) {
                this._backGroundBoxRenderer.setScale(1);
                return
            }
            var scaleX = this._size.width / textureSize.width;
            var scaleY = this._size.height / textureSize.height;
            this._backGroundBoxRenderer.setScaleX(scaleX);
            this._backGroundBoxRenderer.setScaleY(scaleY)
        }
    }, backGroundSelectedTextureScaleChangedWithSize: function () {
        if (this._ignoreSize)this._backGroundSelectedBoxRenderer.setScale(1); else {
            var textureSize = this._backGroundSelectedBoxRenderer.getContentSize();
            if (textureSize.width <= 0 || textureSize.height <= 0) {
                this._backGroundSelectedBoxRenderer.setScale(1);
                return
            }
            var scaleX =
                this._size.width / textureSize.width;
            var scaleY = this._size.height / textureSize.height;
            this._backGroundSelectedBoxRenderer.setScaleX(scaleX);
            this._backGroundSelectedBoxRenderer.setScaleY(scaleY)
        }
    }, frontCrossTextureScaleChangedWithSize: function () {
        if (this._ignoreSize)this._frontCrossRenderer.setScale(1); else {
            var textureSize = this._frontCrossRenderer.getContentSize();
            if (textureSize.width <= 0 || textureSize.height <= 0) {
                this._frontCrossRenderer.setScale(1);
                return
            }
            var scaleX = this._size.width / textureSize.width;
            var scaleY =
                this._size.height / textureSize.height;
            this._frontCrossRenderer.setScaleX(scaleX);
            this._frontCrossRenderer.setScaleY(scaleY)
        }
    }, backGroundDisabledTextureScaleChangedWithSize: function () {
        if (this._ignoreSize)this._backGroundBoxDisabledRenderer.setScale(1); else {
            var textureSize = this._backGroundBoxDisabledRenderer.getContentSize();
            if (textureSize.width <= 0 || textureSize.height <= 0) {
                this._backGroundBoxDisabledRenderer.setScale(1);
                return
            }
            var scaleX = this._size.width / textureSize.width;
            var scaleY = this._size.height /
                textureSize.height;
            this._backGroundBoxDisabledRenderer.setScaleX(scaleX);
            this._backGroundBoxDisabledRenderer.setScaleY(scaleY)
        }
    }, frontCrossDisabledTextureScaleChangedWithSize: function () {
        if (this._ignoreSize)this._frontCrossDisabledRenderer.setScale(1); else {
            var textureSize = this._frontCrossDisabledRenderer.getContentSize();
            if (textureSize.width <= 0 || textureSize.height <= 0) {
                this._frontCrossDisabledRenderer.setScale(1);
                return
            }
            var scaleX = this._size.width / textureSize.width;
            var scaleY = this._size.height / textureSize.height;
            this._frontCrossDisabledRenderer.setScaleX(scaleX);
            this._frontCrossDisabledRenderer.setScaleY(scaleY)
        }
    }, updateTextureColor: function () {
        this.updateColorToRenderer(this._backGroundBoxRenderer);
        this.updateColorToRenderer(this._backGroundSelectedBoxRenderer);
        this.updateColorToRenderer(this._frontCrossRenderer);
        this.updateColorToRenderer(this._backGroundBoxDisabledRenderer);
        this.updateColorToRenderer(this._frontCrossDisabledRenderer)
    }, updateTextureOpacity: function () {
        this.updateOpacityToRenderer(this._backGroundBoxRenderer);
        this.updateOpacityToRenderer(this._backGroundSelectedBoxRenderer);
        this.updateOpacityToRenderer(this._frontCrossRenderer);
        this.updateOpacityToRenderer(this._backGroundBoxDisabledRenderer);
        this.updateOpacityToRenderer(this._frontCrossDisabledRenderer)
    }, getDescription: function () {
        return"CheckBox"
    }, createCloneInstance: function () {
        return ccui.CheckBox.create()
    }, copySpecialProperties: function (uiCheckBox) {
        this.loadTextureBackGround(uiCheckBox._backGroundFileName, uiCheckBox._backGroundTexType);
        this.loadTextureBackGroundSelected(uiCheckBox._backGroundSelectedFileName,
            uiCheckBox._backGroundSelectedTexType);
        this.loadTextureFrontCross(uiCheckBox._frontCrossFileName, uiCheckBox._frontCrossTexType);
        this.loadTextureBackGroundDisabled(uiCheckBox._backGroundDisabledFileName, uiCheckBox._backGroundDisabledTexType);
        this.loadTextureFrontCrossDisabled(uiCheckBox._frontCrossDisabledFileName, uiCheckBox._frontCrossDisabledTexType);
        this.setSelectedState(uiCheckBox._isSelected)
    }});
var _p = ccui.CheckBox.prototype;
_p.selected;
cc.defineGetterSetter(_p, "selected", _p.getSelectedState, _p.setSelectedState);
_p = null;
ccui.CheckBox.create = function () {
    var uiCheckBox = new ccui.CheckBox;
    if (uiCheckBox && uiCheckBox.init())return uiCheckBox;
    return null
};
ccui.CheckBox.EVENT_SELECTED = 0;
ccui.CheckBox.EVENT_UNSELECTED = 1;
ccui.CheckBox.BOX_RENDERER_ZORDER = -1;
ccui.CheckBox.BOX_SELECTED_RENDERER_ZORDER = -1;
ccui.CheckBox.BOX_DISABLED_RENDERER_ZORDER = -1;
ccui.CheckBox.FRONT_CROSS_RENDERER_ZORDER = -1;
ccui.CheckBox.FRONT_CROSS_DISABLED_RENDERER_ZORDER = -1;
ccui.ImageView = ccui.Widget.extend({_scale9Enabled: false, _prevIgnoreSize: true, _capInsets: null, _imageRenderer: null, _textureFile: "", _imageTexType: null, _imageTextureSize: null, _className: "ImageView", ctor: function () {
    ccui.Widget.prototype.ctor.call(this);
    this._scale9Enabled = false;
    this._prevIgnoreSize = true;
    this._capInsets = cc.rect(0, 0, 0, 0);
    this._imageRenderer = null;
    this._textureFile = "";
    this._imageTexType = ccui.Widget.LOCAL_TEXTURE;
    this._imageTextureSize = cc.size(this._size.width, this._size.height)
}, initRenderer: function () {
    this._imageRenderer =
        cc.Sprite.create();
    cc.Node.prototype.addChild.call(this, this._imageRenderer, ccui.ImageView.RENDERER_ZORDER, -1)
}, loadTexture: function (fileName, texType) {
    if (!fileName)return;
    texType = texType || ccui.Widget.LOCAL_TEXTURE;
    this._textureFile = fileName;
    this._imageTexType = texType;
    var imageRenderer = this._imageRenderer;
    switch (this._imageTexType) {
        case ccui.Widget.LOCAL_TEXTURE:
            imageRenderer.initWithFile(fileName);
            break;
        case ccui.Widget.PLIST_TEXTURE:
            imageRenderer.initWithSpriteFrameName(fileName);
            break;
        default:
            break
    }
    var locRendererSize =
        imageRenderer.getContentSize();
    if (imageRenderer.textureLoaded()) {
        this._imageTextureSize.width = locRendererSize.width;
        this._imageTextureSize.height = locRendererSize.height
    } else {
        imageRenderer.addLoadedEventListener(function () {
            var locSize = imageRenderer.getContentSize();
            this._imageTextureSize.width = locSize.width;
            this._imageTextureSize.height = locSize.height;
            if (imageRenderer.setCapInsets)imageRenderer.setCapInsets(this._capInsets);
            this.imageTextureScaleChangedWithSize()
        }, this);
        this._imageTextureSize.width =
            this._customSize.width;
        this._imageTextureSize.height = this._customSize.height
    }
    if (this._scale9Enabled)imageRenderer.setCapInsets(this._capInsets);
    this.updateColorToRenderer(imageRenderer);
    this.updateAnchorPoint();
    this.updateFlippedX();
    this.updateFlippedY();
    this.imageTextureScaleChangedWithSize()
}, setTextureRect: function (rect) {
    if (!this._scale9Enabled) {
        this._imageRenderer.setTextureRect(rect);
        var locRendererSize = this._imageRenderer.getContentSize();
        this._imageTextureSize.width = locRendererSize.width;
        this._imageTextureSize.height =
            locRendererSize.height;
        this.imageTextureScaleChangedWithSize()
    }
}, updateFlippedX: function () {
    if (this._scale9Enabled)this._imageRenderer.setScaleX(this._flippedX ? -1 : 1); else this._imageRenderer.setFlippedX(this._flippedX)
}, updateFlippedY: function () {
    if (this._scale9Enabled)this._imageRenderer.setScaleY(this._flippedY ? -1 : 1); else this._imageRenderer.setFlippedY(this._flippedY)
}, setScale9Enabled: function (able) {
    if (this._scale9Enabled == able)return;
    this._scale9Enabled = able;
    cc.Node.prototype.removeChild.call(this,
        this._imageRenderer, true);
    this._imageRenderer = null;
    if (this._scale9Enabled)this._imageRenderer = cc.Scale9Sprite.create(); else this._imageRenderer = cc.Sprite.create();
    this.loadTexture(this._textureFile, this._imageTexType);
    cc.Node.prototype.addChild.call(this, this._imageRenderer, ccui.ImageView.RENDERER_ZORDER, -1);
    if (this._scale9Enabled) {
        var ignoreBefore = this._ignoreSize;
        this.ignoreContentAdaptWithSize(false);
        this._prevIgnoreSize = ignoreBefore
    } else this.ignoreContentAdaptWithSize(this._prevIgnoreSize);
    this.setCapInsets(this._capInsets)
},
    isScale9Enabled: function () {
        return this._scale9Enabled
    }, ignoreContentAdaptWithSize: function (ignore) {
        if (!this._scale9Enabled || this._scale9Enabled && !ignore) {
            ccui.Widget.prototype.ignoreContentAdaptWithSize.call(this, ignore);
            this._prevIgnoreSize = ignore
        }
    }, setCapInsets: function (capInsets) {
        this._capInsets = capInsets;
        if (!this._scale9Enabled)return;
        this._imageRenderer.setCapInsets(capInsets)
    }, getCapInsets: function () {
        return this._capInsets
    }, setAnchorPoint: function (point, y) {
        if (y === undefined) {
            ccui.Widget.prototype.setAnchorPoint.call(this,
                point);
            this._imageRenderer.setAnchorPoint(point)
        } else {
            ccui.Widget.prototype.setAnchorPoint.call(this, point, y);
            this._imageRenderer.setAnchorPoint(point, y)
        }
    }, _setAnchorX: function (value) {
        ccui.Widget.prototype._setAnchorX.call(this, value);
        this._imageRenderer._setAnchorX(value)
    }, _setAnchorY: function (value) {
        ccui.Widget.prototype._setAnchorY.call(this, value);
        this._imageRenderer._setAnchorY(value)
    }, onSizeChanged: function () {
        ccui.Widget.prototype.onSizeChanged.call(this);
        this.imageTextureScaleChangedWithSize()
    },
    getContentSize: function () {
        return this._imageTextureSize
    }, _getWidth: function () {
        return this._imageTextureSize.width
    }, _getHeight: function () {
        return this._imageTextureSize.height
    }, getVirtualRenderer: function () {
        return this._imageRenderer
    }, imageTextureScaleChangedWithSize: function () {
        if (this._ignoreSize) {
            if (!this._scale9Enabled) {
                this._imageRenderer.setScale(1);
                this._size = this._imageTextureSize
            }
        } else if (this._scale9Enabled)this._imageRenderer.setPreferredSize(this._size); else {
            var textureSize = this._imageRenderer.getContentSize();
            if (textureSize.width <= 0 || textureSize.height <= 0) {
                this._imageRenderer.setScale(1);
                return
            }
            var scaleX = this._size.width / textureSize.width;
            var scaleY = this._size.height / textureSize.height;
            this._imageRenderer.setScaleX(scaleX);
            this._imageRenderer.setScaleY(scaleY)
        }
    }, updateTextureColor: function () {
        this.updateColorToRenderer(this._imageRenderer)
    }, updateTextureOpacity: function () {
        this.updateOpacityToRenderer(this._imageRenderer)
    }, getDescription: function () {
        return"ImageView"
    }, createCloneInstance: function () {
        return ccui.ImageView.create()
    },
    copySpecialProperties: function (imageView) {
        this._prevIgnoreSize = imageView._prevIgnoreSize;
        this.setScale9Enabled(imageView._scale9Enabled);
        this.loadTexture(imageView._textureFile, imageView._imageTexType);
        this.setCapInsets(imageView._capInsets)
    }});
ccui.ImageView.create = function () {
    var uiImageView = new ccui.ImageView;
    if (uiImageView && uiImageView.init())return uiImageView;
    return null
};
ccui.ImageView.RENDERER_ZORDER = -1;
ccui.LoadingBar = ccui.Widget.extend({_barType: null, _percent: 100, _totalLength: 0, _barRenderer: null, _renderBarTexType: null, _barRendererTextureSize: null, _scale9Enabled: false, _prevIgnoreSize: true, _capInsets: null, _textureFile: "", _isTextureLoaded: false, _className: "LoadingBar", ctor: function () {
    ccui.Widget.prototype.ctor.call(this);
    this._barType = ccui.LoadingBar.TYPE_LEFT;
    this._percent = 100;
    this._totalLength = 0;
    this._barRenderer = null;
    this._renderBarTexType = ccui.Widget.LOCAL_TEXTURE;
    this._barRendererTextureSize =
        cc.size(0, 0);
    this._scale9Enabled = false;
    this._prevIgnoreSize = true;
    this._capInsets = cc.rect(0, 0, 0, 0);
    this._textureFile = ""
}, initRenderer: function () {
    this._barRenderer = cc.Sprite.create();
    cc.Node.prototype.addChild.call(this, this._barRenderer, ccui.LoadingBar.RENDERER_ZORDER, -1);
    this._barRenderer.setAnchorPoint(0, 0.5)
}, setDirection: function (dir) {
    if (this._barType == dir)return;
    this._barType = dir;
    switch (this._barType) {
        case ccui.LoadingBar.TYPE_LEFT:
            this._barRenderer.setAnchorPoint(0, 0.5);
            this._barRenderer.setPosition(-this._totalLength *
                0.5, 0);
            if (!this._scale9Enabled)this._barRenderer.setFlippedX(false);
            break;
        case ccui.LoadingBar.TYPE_RIGHT:
            this._barRenderer.setAnchorPoint(1, 0.5);
            this._barRenderer.setPosition(this._totalLength * 0.5, 0);
            if (!this._scale9Enabled)this._barRenderer.setFlippedX(true);
            break
    }
}, getDirection: function () {
    return this._barType
}, loadTexture: function (texture, texType) {
    if (!texture)return;
    texType = texType || ccui.Widget.LOCAL_TEXTURE;
    this._renderBarTexType = texType;
    this._textureFile = texture;
    var barRenderer = this._barRenderer;
    switch (this._renderBarTexType) {
        case ccui.Widget.LOCAL_TEXTURE:
            if (this._scale9Enabled)barRenderer.initWithFile(texture); else barRenderer.init(texture);
            break;
        case ccui.Widget.PLIST_TEXTURE:
            barRenderer.initWithSpriteFrameName(texture);
            break;
        default:
            break
    }
    if (this._scale9Enabled)barRenderer.setCapInsets(this._capInsets);
    this.updateColorToRenderer(barRenderer);
    var textLoaded = barRenderer.textureLoaded();
    this._isTextureLoaded = textLoaded;
    if (!textLoaded) {
        this._barRendererTextureSize.width = this._customSize.width;
        this._barRendererTextureSize.height = this._customSize.height;
        barRenderer.addLoadedEventListener(function () {
            this._isTextureLoaded = true;
            if (barRenderer.setCapInsets)barRenderer.setCapInsets(this._capInsets);
            var locSize = barRenderer.getContentSize();
            this._barRendererTextureSize.width = locSize.width;
            this._barRendererTextureSize.height = locSize.height;
            this.barRendererScaleChangedWithSize();
            this.setPercent(this._percent)
        }, this)
    } else {
        var locBarSize = barRenderer.getContentSize();
        this._barRendererTextureSize.width =
            locBarSize.width;
        this._barRendererTextureSize.height = locBarSize.height
    }
    switch (this._barType) {
        case ccui.LoadingBar.TYPE_LEFT:
            barRenderer.setAnchorPoint(0, 0.5);
            if (!this._scale9Enabled)barRenderer.setFlippedX(false);
            break;
        case ccui.LoadingBar.TYPE_RIGHT:
            barRenderer.setAnchorPoint(1, 0.5);
            if (!this._scale9Enabled)barRenderer.setFlippedX(true);
            break
    }
    this.barRendererScaleChangedWithSize()
}, setScale9Enabled: function (enabled) {
    if (this._scale9Enabled == enabled)return;
    this._scale9Enabled = enabled;
    cc.Node.prototype.removeChild.call(this,
        this._barRenderer, true);
    this._barRenderer = null;
    if (this._scale9Enabled)this._barRenderer = cc.Scale9Sprite.create(); else this._barRenderer = cc.Sprite.create();
    this.loadTexture(this._textureFile, this._renderBarTexType);
    cc.Node.prototype.addChild.call(this, this._barRenderer, ccui.LoadingBar.RENDERER_ZORDER, -1);
    if (this._scale9Enabled) {
        var ignoreBefore = this._ignoreSize;
        this.ignoreContentAdaptWithSize(false);
        this._prevIgnoreSize = ignoreBefore
    } else this.ignoreContentAdaptWithSize(this._prevIgnoreSize);
    this.setCapInsets(this._capInsets);
    this.setPercent(this._percent)
}, isScale9Enabled: function () {
    return this._scale9Enabled
}, setCapInsets: function (capInsets) {
    this._capInsets = capInsets;
    if (!this._scale9Enabled)return;
    this._barRenderer.setCapInsets(capInsets)
}, getCapInsets: function () {
    return this._capInsets
}, setPercent: function (percent) {
    if (percent < 0 || percent > 100)return;
    if (this._totalLength <= 0)return;
    this._percent = percent;
    if (!this._isTextureLoaded)return;
    var res = this._percent / 100;
    var x = 0, y = 0;
    if (this._renderBarTexType == ccui.Widget.PLIST_TEXTURE) {
        var barNode =
            this._barRenderer;
        if (barNode) {
            var to = barNode.getTextureRect()._origin;
            x = to.x;
            y = to.y
        }
    }
    if (this._scale9Enabled)this.setScale9Scale(); else this._barRenderer.setTextureRect(cc.rect(x, y, this._barRendererTextureSize.width * res, this._barRendererTextureSize.height))
}, getPercent: function () {
    return this._percent
}, onSizeChanged: function () {
    ccui.Widget.prototype.onSizeChanged.call(this);
    this.barRendererScaleChangedWithSize()
}, ignoreContentAdaptWithSize: function (ignore) {
    if (!this._scale9Enabled || this._scale9Enabled && !ignore) {
        ccui.Widget.prototype.ignoreContentAdaptWithSize.call(this, ignore);
        this._prevIgnoreSize = ignore
    }
}, getContentSize: function () {
    return this._barRendererTextureSize
}, _getWidth: function () {
    return this._barRendererTextureSize.width
}, _getHeight: function () {
    return this._barRendererTextureSize.height
}, getVirtualRenderer: function () {
    return this._barRenderer
}, barRendererScaleChangedWithSize: function () {
    if (this._ignoreSize) {
        if (!this._scale9Enabled) {
            this._totalLength = this._barRendererTextureSize.width;
            this._barRenderer.setScale(1);
            this._size.width = this._barRendererTextureSize.width
        }
    } else {
        this._totalLength = this._size.width;
        if (this._scale9Enabled)this.setScale9Scale(); else {
            var textureSize = this._barRendererTextureSize;
            if (textureSize.width <= 0 || textureSize.height <= 0) {
                this._barRenderer.setScale(1);
                return
            }
            var scaleX = this._size.width / textureSize.width;
            var scaleY = this._size.height / textureSize.height;
            this._barRenderer.setScaleX(scaleX);
            this._barRenderer.setScaleY(scaleY)
        }
    }
    switch (this._barType) {
        case ccui.LoadingBar.TYPE_LEFT:
            this._barRenderer.setPosition(-this._totalLength *
                0.5, 0);
            break;
        case ccui.LoadingBar.TYPE_RIGHT:
            this._barRenderer.setPosition(this._totalLength * 0.5, 0);
            break;
        default:
            break
    }
}, setScale9Scale: function () {
    var width = this._percent / 100 * this._totalLength;
    this._barRenderer.setPreferredSize(cc.size(width, this._size.height))
}, updateTextureColor: function () {
    this.updateColorToRenderer(this._barRenderer)
}, updateTextureOpacity: function () {
    this.updateOpacityToRenderer(this._barRenderer)
}, getDescription: function () {
    return"LoadingBar"
}, createCloneInstance: function () {
    return ccui.LoadingBar.create()
},
    copySpecialProperties: function (loadingBar) {
        this._prevIgnoreSize = loadingBar._prevIgnoreSize;
        this.setScale9Enabled(loadingBar._scale9Enabled);
        this.loadTexture(loadingBar._textureFile, loadingBar._renderBarTexType);
        this.setCapInsets(loadingBar._capInsets);
        this.setPercent(loadingBar._percent);
        this.setDirection(loadingBar._barType)
    }});
var _p = ccui.LoadingBar.prototype;
_p.direction;
cc.defineGetterSetter(_p, "direction", _p.getDirection, _p.setDirection);
_p.percent;
cc.defineGetterSetter(_p, "percent", _p.getPercent, _p.setPercent);
_p = null;
ccui.LoadingBar.create = function () {
    var uiLoadingBar = new ccui.LoadingBar;
    if (uiLoadingBar && uiLoadingBar.init())return uiLoadingBar;
    return null
};
ccui.LoadingBar.TYPE_LEFT = 0;
ccui.LoadingBar.TYPE_RIGHT = 1;
ccui.LoadingBar.RENDERER_ZORDER = -1;
ccui.Slider = ccui.Widget.extend({_barRenderer: null, _progressBarRenderer: null, _progressBarTextureSize: null, _slidBallNormalRenderer: null, _slidBallPressedRenderer: null, _slidBallDisabledRenderer: null, _slidBallRenderer: null, _barLength: 0, _percent: 0, _scale9Enabled: false, _prevIgnoreSize: true, _textureFile: "", _progressBarTextureFile: "", _slidBallNormalTextureFile: "", _slidBallPressedTextureFile: "", _slidBallDisabledTextureFile: "", _capInsetsBarRenderer: null, _capInsetsProgressBarRenderer: null, _sliderEventListener: null,
    _sliderEventSelector: null, _barTexType: null, _progressBarTexType: null, _ballNTexType: null, _ballPTexType: null, _ballDTexType: null, _isTextureLoaded: false, _className: "Slider", ctor: function () {
        ccui.Widget.prototype.ctor.call(this);
        this._barRenderer = null;
        this._progressBarRenderer = null;
        this._progressBarTextureSize = cc.size(0, 0);
        this._slidBallNormalRenderer = null;
        this._slidBallPressedRenderer = null;
        this._slidBallDisabledRenderer = null;
        this._slidBallRenderer = null;
        this._barLength = 0;
        this._percent = 0;
        this._scale9Enabled =
            false;
        this._prevIgnoreSize = true;
        this._textureFile = "";
        this._progressBarTextureFile = "";
        this._slidBallNormalTextureFile = "";
        this._slidBallPressedTextureFile = "";
        this._slidBallDisabledTextureFile = "";
        this._capInsetsBarRenderer = cc.rect(0, 0, 0, 0);
        this._capInsetsProgressBarRenderer = cc.rect(0, 0, 0, 0);
        this._sliderEventListener = null;
        this._sliderEventSelector = null;
        this._barTexType = ccui.Widget.LOCAL_TEXTURE;
        this._progressBarTexType = ccui.Widget.LOCAL_TEXTURE;
        this._ballNTexType = ccui.Widget.LOCAL_TEXTURE;
        this._ballPTexType =
            ccui.Widget.LOCAL_TEXTURE;
        this._ballDTexType = ccui.Widget.LOCAL_TEXTURE;
        this._isTextureLoaded = false
    }, init: function () {
        if (ccui.Widget.prototype.init.call(this)) {
            this.setTouchEnabled(true);
            return true
        }
        return false
    }, initRenderer: function () {
        this._barRenderer = cc.Sprite.create();
        this._progressBarRenderer = cc.Sprite.create();
        this._progressBarRenderer.setAnchorPoint(0, 0.5);
        cc.Node.prototype.addChild.call(this, this._barRenderer, ccui.Slider.BASEBAR_RENDERER_ZORDER, -1);
        cc.Node.prototype.addChild.call(this, this._progressBarRenderer,
            ccui.Slider.PROGRESSBAR_RENDERER_ZORDER, -1);
        this._slidBallNormalRenderer = cc.Sprite.create();
        this._slidBallPressedRenderer = cc.Sprite.create();
        this._slidBallPressedRenderer.setVisible(false);
        this._slidBallDisabledRenderer = cc.Sprite.create();
        this._slidBallDisabledRenderer.setVisible(false);
        this._slidBallRenderer = cc.Node.create();
        this._slidBallRenderer.addChild(this._slidBallNormalRenderer);
        this._slidBallRenderer.addChild(this._slidBallPressedRenderer);
        this._slidBallRenderer.addChild(this._slidBallDisabledRenderer);
        cc.Node.prototype.addChild.call(this, this._slidBallRenderer, ccui.Slider.BALL_RENDERER_ZORDER, -1)
    }, loadBarTexture: function (fileName, texType) {
        if (!fileName)return;
        texType = texType || ccui.Widget.LOCAL_TEXTURE;
        this._textureFile = fileName;
        this._barTexType = texType;
        var barRenderer = this._barRenderer;
        switch (this._barTexType) {
            case ccui.Widget.LOCAL_TEXTURE:
                barRenderer.initWithFile(fileName);
                break;
            case ccui.Widget.PLIST_TEXTURE:
                barRenderer.initWithSpriteFrameName(fileName);
                break;
            default:
                break
        }
        this.updateColorToRenderer(barRenderer);
        this.barRendererScaleChangedWithSize();
        if (!barRenderer.textureLoaded())barRenderer.addLoadedEventListener(function () {
            this.barRendererScaleChangedWithSize()
        }, this)
    }, loadProgressBarTexture: function (fileName, texType) {
        if (!fileName)return;
        texType = texType || ccui.Widget.LOCAL_TEXTURE;
        this._progressBarTextureFile = fileName;
        this._progressBarTexType = texType;
        var progressBarRenderer = this._progressBarRenderer;
        switch (this._progressBarTexType) {
            case ccui.Widget.LOCAL_TEXTURE:
                progressBarRenderer.initWithFile(fileName);
                break;
            case ccui.Widget.PLIST_TEXTURE:
                progressBarRenderer.initWithSpriteFrameName(fileName);
                break;
            default:
                break
        }
        this.updateColorToRenderer(progressBarRenderer);
        progressBarRenderer.setAnchorPoint(0, 0.5);
        var locSize = progressBarRenderer.getContentSize();
        this._progressBarTextureSize.width = locSize.width;
        this._progressBarTextureSize.height = locSize.height;
        this.progressBarRendererScaleChangedWithSize();
        var textLoaded = progressBarRenderer.textureLoaded();
        this._isTextureLoaded = textLoaded;
        if (!textLoaded)progressBarRenderer.addLoadedEventListener(function () {
            this._isTextureLoaded =
                true;
            var locSize = progressBarRenderer.getContentSize();
            this._progressBarTextureSize.width = locSize.width;
            this._progressBarTextureSize.height = locSize.height;
            this.progressBarRendererScaleChangedWithSize()
        }, this)
    }, setScale9Enabled: function (able) {
        if (this._scale9Enabled == able)return;
        this._scale9Enabled = able;
        cc.Node.prototype.removeChild.call(this, this._barRenderer, true);
        cc.Node.prototype.removeChild.call(this, this._progressBarRenderer, true);
        this._barRenderer = null;
        this._progressBarRenderer = null;
        if (this._scale9Enabled) {
            this._barRenderer =
                cc.Scale9Sprite.create();
            this._progressBarRenderer = cc.Scale9Sprite.create()
        } else {
            this._barRenderer = cc.Sprite.create();
            this._progressBarRenderer = cc.Sprite.create()
        }
        this.loadBarTexture(this._textureFile, this._barTexType);
        this.loadProgressBarTexture(this._progressBarTextureFile, this._progressBarTexType);
        cc.Node.prototype.addChild.call(this, this._barRenderer, ccui.Slider.BASEBAR_RENDERER_ZORDER, -1);
        cc.Node.prototype.addChild.call(this, this._progressBarRenderer, ccui.Slider.PROGRESSBAR_RENDERER_ZORDER, -1);
        if (this._scale9Enabled) {
            var ignoreBefore = this._ignoreSize;
            this.ignoreContentAdaptWithSize(false);
            this._prevIgnoreSize = ignoreBefore
        } else this.ignoreContentAdaptWithSize(this._prevIgnoreSize);
        this.setCapInsetsBarRenderer(this._capInsetsBarRenderer);
        this.setCapInsetProgressBarRenderer(this._capInsetsProgressBarRenderer)
    }, isScale9Enabled: function () {
        return this._scale9Enabled
    }, ignoreContentAdaptWithSize: function (ignore) {
        if (!this._scale9Enabled || this._scale9Enabled && !ignore) {
            ccui.Widget.prototype.ignoreContentAdaptWithSize.call(this,
                ignore);
            this._prevIgnoreSize = ignore
        }
    }, setCapInsets: function (capInsets) {
        this.setCapInsetsBarRenderer(capInsets);
        this.setCapInsetProgressBarRenderer(capInsets)
    }, setCapInsetsBarRenderer: function (capInsets) {
        this._capInsetsBarRenderer = capInsets;
        if (!this._scale9Enabled)return;
        this._barRenderer.setCapInsets(capInsets)
    }, getCapInsetBarRenderer: function () {
        return this._capInsetsBarRenderer
    }, setCapInsetProgressBarRenderer: function (capInsets) {
        this._capInsetsProgressBarRenderer = capInsets;
        if (!this._scale9Enabled)return;
        this._progressBarRenderer.setCapInsets(capInsets)
    }, getCapInsetProgressBarRenderer: function () {
        return this._capInsetsProgressBarRenderer
    }, loadSlidBallTextures: function (normal, pressed, disabled, texType) {
        this.loadSlidBallTextureNormal(normal, texType);
        this.loadSlidBallTexturePressed(pressed, texType);
        this.loadSlidBallTextureDisabled(disabled, texType)
    }, loadSlidBallTextureNormal: function (normal, texType) {
        if (!normal)return;
        texType = texType || ccui.Widget.LOCAL_TEXTURE;
        this._slidBallNormalTextureFile = normal;
        this._ballNTexType =
            texType;
        switch (this._ballNTexType) {
            case ccui.Widget.LOCAL_TEXTURE:
                this._slidBallNormalRenderer.initWithFile(normal);
                break;
            case ccui.Widget.PLIST_TEXTURE:
                this._slidBallNormalRenderer.initWithSpriteFrameName(normal);
                break;
            default:
                break
        }
        this.updateColorToRenderer(this._slidBallNormalRenderer)
    }, loadSlidBallTexturePressed: function (pressed, texType) {
        if (!pressed)return;
        texType = texType || ccui.Widget.LOCAL_TEXTURE;
        this._slidBallPressedTextureFile = pressed;
        this._ballPTexType = texType;
        switch (this._ballPTexType) {
            case ccui.Widget.LOCAL_TEXTURE:
                this._slidBallPressedRenderer.initWithFile(pressed);
                break;
            case ccui.Widget.PLIST_TEXTURE:
                this._slidBallPressedRenderer.initWithSpriteFrameName(pressed);
                break;
            default:
                break
        }
        this.updateColorToRenderer(this._slidBallPressedRenderer)
    }, loadSlidBallTextureDisabled: function (disabled, texType) {
        if (!disabled)return;
        texType = texType || ccui.Widget.LOCAL_TEXTURE;
        this._slidBallDisabledTextureFile = disabled;
        this._ballDTexType = texType;
        switch (this._ballDTexType) {
            case ccui.Widget.LOCAL_TEXTURE:
                this._slidBallDisabledRenderer.initWithFile(disabled);
                break;
            case ccui.Widget.PLIST_TEXTURE:
                this._slidBallDisabledRenderer.initWithSpriteFrameName(disabled);
                break;
            default:
                break
        }
        this.updateColorToRenderer(this._slidBallDisabledRenderer)
    }, setPercent: function (percent) {
        if (percent > 100)percent = 100;
        if (percent < 0)percent = 0;
        this._percent = percent;
        if (!this._isTextureLoaded)return;
        var dis = this._barLength * (percent / 100);
        this._slidBallRenderer.setPosition(-this._barLength / 2 + dis, 0);
        if (this._scale9Enabled)this._progressBarRenderer.setPreferredSize(cc.size(dis, this._progressBarTextureSize.height)); else {
            var x = 0, y = 0;
            if (this._progressBarTexType == ccui.Widget.PLIST_TEXTURE) {
                var barNode =
                    this._progressBarRenderer;
                if (barNode) {
                    var to = barNode.getTextureRect()._origin;
                    x = to.x;
                    y = to.y
                }
            }
            this._progressBarRenderer.setTextureRect(cc.rect(x, y, this._progressBarTextureSize.width * (percent / 100), this._progressBarTextureSize.height))
        }
    }, onTouchBegan: function (touch, event) {
        var pass = ccui.Widget.prototype.onTouchBegan.call(this, touch, event);
        if (this._hitted) {
            var nsp = this.convertToNodeSpace(this._touchStartPos);
            this.setPercent(this.getPercentWithBallPos(nsp.x));
            this.percentChangedEvent()
        }
        return pass
    }, onTouchMoved: function (touch, event) {
        var touchPoint = touch.getLocation();
        this._touchMovePos.x = touchPoint.x;
        this._touchMovePos.y = touchPoint.y;
        var nsp = this.convertToNodeSpace(touchPoint);
        this._slidBallRenderer.setPosition(nsp.x, 0);
        this.setPercent(this.getPercentWithBallPos(nsp.x));
        this.percentChangedEvent()
    }, onTouchEnded: function (touch, event) {
        ccui.Widget.prototype.onTouchEnded.call(this, touch, event)
    }, onTouchCancelled: function (touch, event) {
        ccui.Widget.prototype.onTouchCancelled.call(this, touch, event)
    }, getPercentWithBallPos: function (px) {
        return(px -
            -this._barLength / 2) / this._barLength * 100
    }, addEventListenerSlider: function (selector, target) {
        this._sliderEventSelector = selector;
        this._sliderEventListener = target
    }, percentChangedEvent: function () {
        if (this._sliderEventListener && this._sliderEventSelector)this._sliderEventSelector.call(this._sliderEventListener, this, ccui.Slider.EVENT_PERCENT_CHANGED)
    }, getPercent: function () {
        return this._percent
    }, onSizeChanged: function () {
        ccui.Widget.prototype.onSizeChanged.call(this);
        this.barRendererScaleChangedWithSize();
        this.progressBarRendererScaleChangedWithSize()
    },
    getContentSize: function () {
        var locContentSize = this._barRenderer.getContentSize();
        return cc.size(locContentSize.width, locContentSize.height)
    }, _getWidth: function () {
        return this._barRenderer._getWidth()
    }, _getHeight: function () {
        return this._barRenderer._getHeight()
    }, getVirtualRenderer: function () {
        return this._barRenderer
    }, barRendererScaleChangedWithSize: function () {
        if (this._ignoreSize) {
            this._barRenderer.setScale(1);
            var locSize = this._barRenderer.getContentSize();
            this._size.width = locSize.width;
            this._size.height =
                locSize.height;
            this._barLength = locSize.width
        } else {
            this._barLength = this._size.width;
            if (this._scale9Enabled)this._barRenderer.setPreferredSize(cc.size(this._size.width, this._size.height)); else {
                var btextureSize = this._barRenderer.getContentSize();
                if (btextureSize.width <= 0 || btextureSize.height <= 0) {
                    this._barRenderer.setScale(1);
                    return
                }
                var bscaleX = this._size.width / btextureSize.width;
                var bscaleY = this._size.height / btextureSize.height;
                this._barRenderer.setScaleX(bscaleX);
                this._barRenderer.setScaleY(bscaleY)
            }
        }
        this.setPercent(this._percent)
    },
    progressBarRendererScaleChangedWithSize: function () {
        if (this._ignoreSize) {
            if (!this._scale9Enabled) {
                var ptextureSize = this._progressBarTextureSize;
                var pscaleX = this._size.width / ptextureSize.width;
                var pscaleY = this._size.height / ptextureSize.height;
                this._progressBarRenderer.setScaleX(pscaleX);
                this._progressBarRenderer.setScaleY(pscaleY)
            }
        } else if (this._scale9Enabled)this._progressBarRenderer.setPreferredSize(cc.size(this._size.width, this._size.height)); else {
            var ptextureSize = this._progressBarTextureSize;
            if (ptextureSize.width <=
                0 || ptextureSize.height <= 0) {
                this._progressBarRenderer.setScale(1);
                return
            }
            var pscaleX = this._size.width / ptextureSize.width;
            var pscaleY = this._size.height / ptextureSize.height;
            this._progressBarRenderer.setScaleX(pscaleX);
            this._progressBarRenderer.setScaleY(pscaleY)
        }
        this._progressBarRenderer.setPosition(-this._barLength * 0.5, 0);
        this.setPercent(this._percent)
    }, onPressStateChangedToNormal: function () {
        this._slidBallNormalRenderer.setVisible(true);
        this._slidBallPressedRenderer.setVisible(false);
        this._slidBallDisabledRenderer.setVisible(false)
    },
    onPressStateChangedToPressed: function () {
        this._slidBallNormalRenderer.setVisible(false);
        this._slidBallPressedRenderer.setVisible(true);
        this._slidBallDisabledRenderer.setVisible(false)
    }, onPressStateChangedToDisabled: function () {
        this._slidBallNormalRenderer.setVisible(false);
        this._slidBallPressedRenderer.setVisible(false);
        this._slidBallDisabledRenderer.setVisible(true)
    }, updateTextureColor: function () {
        this.updateColorToRenderer(this._barRenderer);
        this.updateColorToRenderer(this._progressBarRenderer);
        this.updateColorToRenderer(this._slidBallNormalRenderer);
        this.updateColorToRenderer(this._slidBallPressedRenderer);
        this.updateColorToRenderer(this._slidBallDisabledRenderer)
    }, updateTextureOpacity: function () {
        this.updateOpacityToRenderer(this._barRenderer);
        this.updateOpacityToRenderer(this._progressBarRenderer);
        this.updateOpacityToRenderer(this._slidBallNormalRenderer);
        this.updateOpacityToRenderer(this._slidBallPressedRenderer);
        this.updateOpacityToRenderer(this._slidBallDisabledRenderer)
    }, getDescription: function () {
        return"Slider"
    }, createCloneInstance: function () {
        return ccui.Slider.create()
    },
    copySpecialProperties: function (slider) {
        this._prevIgnoreSize = slider._prevIgnoreSize;
        this.setScale9Enabled(slider._scale9Enabled);
        this.loadBarTexture(slider._textureFile, slider._barTexType);
        this.loadProgressBarTexture(slider._progressBarTextureFile, slider._progressBarTexType);
        this.loadSlidBallTextureNormal(slider._slidBallNormalTextureFile, slider._ballNTexType);
        this.loadSlidBallTexturePressed(slider._slidBallPressedTextureFile, slider._ballPTexType);
        this.loadSlidBallTextureDisabled(slider._slidBallDisabledTextureFile,
            slider._ballDTexType);
        this.setPercent(slider.getPercent())
    }});
var _p = ccui.Slider.prototype;
_p.percent;
cc.defineGetterSetter(_p, "percent", _p.getPercent, _p.setPercent);
_p = null;
ccui.Slider.create = function () {
    var uiSlider = new ccui.Slider;
    if (uiSlider && uiSlider.init())return uiSlider;
    return null
};
ccui.Slider.EVENT_PERCENT_CHANGED = 0;
ccui.Slider.BASEBAR_RENDERER_ZORDER = -3;
ccui.Slider.PROGRESSBAR_RENDERER_ZORDER = -2;
ccui.Slider.BALL_RENDERER_ZORDER = -1;
ccui.Text = ccui.Widget.extend({touchScaleEnabled: false, _normalScaleValueX: 0, _normalScaleValueY: 0, _fontName: "", _fontSize: 0, _onSelectedScaleOffset: 0, _labelRenderer: "", _textAreaSize: null, _textVerticalAlignment: 0, _textHorizontalAlignment: 0, _className: "Text", ctor: function () {
    ccui.Widget.prototype.ctor.call(this);
    this.touchScaleEnabled = false;
    this._normalScaleValueX = 0;
    this._normalScaleValueY = 0;
    this._fontName = "Thonburi";
    this._fontSize = 10;
    this._onSelectedScaleOffset = 0.5;
    this._labelRenderer = "";
    this._textAreaSize =
        cc.size(0, 0);
    this._textVerticalAlignment = 0;
    this._textHorizontalAlignment = 0
}, init: function () {
    if (ccui.Widget.prototype.init.call(this))return true;
    return false
}, initRenderer: function () {
    this._labelRenderer = cc.LabelTTF.create();
    cc.Node.prototype.addChild.call(this, this._labelRenderer, ccui.Text.RENDERER_ZORDER, -1)
}, setText: function (text) {
    this._labelRenderer.setString(text);
    this.labelScaleChangedWithSize()
}, getStringValue: function () {
    return this._labelRenderer.getString()
}, getStringLength: function () {
    var str =
        this._labelRenderer.getString();
    return str.length
}, setFontSize: function (size) {
    this._fontSize = size;
    this._labelRenderer.setFontSize(size);
    this.labelScaleChangedWithSize()
}, getFontSize: function () {
    return this._fontSize
}, setFontName: function (name) {
    this._fontName = name;
    this._labelRenderer.setFontName(name);
    this.labelScaleChangedWithSize()
}, getFontName: function () {
    return this._fontName
}, _setFont: function (font) {
    var res = cc.LabelTTF._fontStyleRE.exec(font);
    if (res) {
        this._fontSize = parseInt(res[1]);
        this._fontName =
            res[2];
        this._labelRenderer._setFont(font);
        this.labelScaleChangedWithSize()
    }
}, _getFont: function () {
    return this._labelRenderer._getFont()
}, setTextAreaSize: function (size) {
    this._textAreaSize.width = size.width;
    this._textAreaSize.height = size.height;
    this._labelRenderer.setDimensions(size);
    this.labelScaleChangedWithSize()
}, _setBoundingWidth: function (value) {
    this._textAreaSize.width = value;
    this._labelRenderer._setBoundingWidth(value);
    this.labelScaleChangedWithSize()
}, _setBoundingHeight: function (value) {
    this._textAreaSize.height =
        value;
    this._labelRenderer._setBoundingHeight(value);
    this.labelScaleChangedWithSize()
}, _getBoundingWidth: function () {
    return this._textAreaSize.width
}, _getBoundingHeight: function () {
    return this._textAreaSize.height
}, setTextHorizontalAlignment: function (alignment) {
    this._textHorizontalAlignment = alignment;
    this._labelRenderer.setHorizontalAlignment(alignment);
    this.labelScaleChangedWithSize()
}, getTextHorizontalAlignment: function () {
    return this._textHorizontalAlignment
}, setTextVerticalAlignment: function (alignment) {
    this._textVerticalAlignment =
        alignment;
    this._labelRenderer.setVerticalAlignment(alignment);
    this.labelScaleChangedWithSize()
}, getTextVerticalAlignment: function () {
    return this._textVerticalAlignment
}, getTouchScaleChangeAble: function () {
    return this.isTouchScaleChangeEnabled()
}, setTouchScaleChangeEnabled: function (enable) {
    this.touchScaleEnabled = enable
}, isTouchScaleChangeEnabled: function () {
    return this.touchScaleEnabled
}, onPressStateChangedToNormal: function () {
    if (!this.touchScaleEnabled)return;
    this._labelRenderer.setScaleX(this._normalScaleValueX);
    this._labelRenderer.setScaleY(this._normalScaleValueY)
}, onPressStateChangedToPressed: function () {
    if (!this.touchScaleEnabled)return;
    this._labelRenderer.setScaleX(this._normalScaleValueX + this._onSelectedScaleOffset);
    this._labelRenderer.setScaleY(this._normalScaleValueY + this._onSelectedScaleOffset)
}, onPressStateChangedToDisabled: function () {
}, updateFlippedX: function () {
    this._labelRenderer.setFlippedX(this._flippedX)
}, updateFlippedY: function () {
    this._labelRenderer.setFlippedY(this._flippedY)
}, setAnchorPoint: function (point, y) {
    if (y === undefined) {
        ccui.Widget.prototype.setAnchorPoint.call(this, point);
        this._labelRenderer.setAnchorPoint(point)
    } else {
        ccui.Widget.prototype.setAnchorPoint.call(this, point, y);
        this._labelRenderer.setAnchorPoint(point, y)
    }
}, _setAnchorX: function (value) {
    ccui.Widget.prototype._setAnchorX.call(this, value);
    this._labelRenderer._setAnchorX(value)
}, _setAnchorY: function (value) {
    ccui.Widget.prototype._setAnchorY.call(this, value);
    this._labelRenderer._setAnchorY(value)
}, onSizeChanged: function () {
    ccui.Widget.prototype.onSizeChanged.call(this);
    this.labelScaleChangedWithSize()
}, getContentSize: function () {
    return this._labelRenderer.getContentSize()
}, _getWidth: function () {
    return this._labelRenderer._getWidth()
}, _getHeight: function () {
    return this._labelRenderer._getHeight()
}, getVirtualRenderer: function () {
    return this._labelRenderer
}, labelScaleChangedWithSize: function () {
    if (this._ignoreSize) {
        this._labelRenderer.setScale(1);
        var renderSize = this._labelRenderer.getContentSize();
        this._size.width = renderSize.width;
        this._size.height = renderSize.height;
        this._normalScaleValueX =
            this._normalScaleValueY = 1
    } else {
        var textureSize = this._labelRenderer.getContentSize();
        if (textureSize.width <= 0 || textureSize.height <= 0) {
            this._labelRenderer.setScale(1);
            return
        }
        var scaleX = this._size.width / textureSize.width;
        var scaleY = this._size.height / textureSize.height;
        this._labelRenderer.setScaleX(scaleX);
        this._labelRenderer.setScaleY(scaleY);
        this._normalScaleValueX = scaleX;
        this._normalScaleValueY = scaleY
    }
}, updateTextureColor: function () {
    this.updateColorToRenderer(this._labelRenderer)
}, updateTextureOpacity: function () {
    this.updateOpacityToRenderer(this._labelRenderer)
},
    getDescription: function () {
        return"Label"
    }, createCloneInstance: function () {
        return ccui.Text.create()
    }, copySpecialProperties: function (uiLabel) {
        this.setFontName(uiLabel._fontName);
        this.setFontSize(uiLabel._labelRenderer.getFontSize());
        this.setText(uiLabel.getStringValue());
        this.setTouchScaleChangeEnabled(uiLabel.touchScaleEnabled);
        this.setTextAreaSize(uiLabel._size);
        this.setTextHorizontalAlignment(uiLabel._textHorizontalAlignment);
        this.setTextVerticalAlignment(uiLabel._textVerticalAlignment)
    }});
var _p = ccui.Text.prototype;
_p.boundingWidth;
cc.defineGetterSetter(_p, "boundingWidth", _p._getBoundingWidth, _p._setBoundingWidth);
_p.boundingHeight;
cc.defineGetterSetter(_p, "boundingHeight", _p._getBoundingHeight, _p._setBoundingHeight);
_p.string;
cc.defineGetterSetter(_p, "string", _p.getStringValue, _p.setText);
_p.stringLength;
cc.defineGetterSetter(_p, "stringLength", _p.getStringLength);
_p.font;
cc.defineGetterSetter(_p, "font", _p._getFont, _p._setFont);
_p.fontSize;
cc.defineGetterSetter(_p, "fontSize", _p.getFontSize, _p.setFontSize);
_p.fontName;
cc.defineGetterSetter(_p, "fontName", _p.getFontName, _p.setFontName);
_p.textAlign;
cc.defineGetterSetter(_p, "textAlign", _p.getTextHorizontalAlignment, _p.setTextHorizontalAlignment);
_p.verticalAlign;
cc.defineGetterSetter(_p, "verticalAlign", _p.getTextVerticalAlignment, _p.setTextVerticalAlignment);
_p = null;
ccui.Text.create = function () {
    var uiLabel = new ccui.Text;
    if (uiLabel && uiLabel.init())return uiLabel;
    return null
};
ccui.Text.RENDERER_ZORDER = -1;
ccui.TextAtlas = ccui.Widget.extend({_labelAtlasRenderer: null, _stringValue: "", _charMapFileName: "", _itemWidth: 0, _itemHeight: 0, _startCharMap: "", _className: "TextAtlas", ctor: function () {
    ccui.Widget.prototype.ctor.call(this);
    this._labelAtlasRenderer = null
}, initRenderer: function () {
    this._labelAtlasRenderer = new cc.LabelAtlas;
    cc.Node.prototype.addChild.call(this, this._labelAtlasRenderer, ccui.TextAtlas.RENDERER_ZORDER, -1)
}, setProperty: function (stringValue, charMapFile, itemWidth, itemHeight, startCharMap) {
    this._stringValue =
        stringValue;
    this._charMapFileName = charMapFile;
    this._itemWidth = itemWidth;
    this._itemHeight = itemHeight;
    this._startCharMap = startCharMap;
    var renderer = this._labelAtlasRenderer;
    renderer.initWithString(stringValue, charMapFile, itemWidth, itemHeight, startCharMap[0]);
    this.updateAnchorPoint();
    this.labelAtlasScaleChangedWithSize();
    if (!renderer.textureLoaded())renderer.addLoadedEventListener(function () {
        this.labelAtlasScaleChangedWithSize()
    }, this)
}, setStringValue: function (value) {
    this._stringValue = value;
    this._labelAtlasRenderer.setString(value);
    this.labelAtlasScaleChangedWithSize()
}, getStringValue: function () {
    return this._labelAtlasRenderer.getString()
}, setAnchorPoint: function (point, y) {
    if (y === undefined) {
        ccui.Widget.prototype.setAnchorPoint.call(this, point);
        this._labelAtlasRenderer.setAnchorPoint(point)
    } else {
        ccui.Widget.prototype.setAnchorPoint.call(this, point, y);
        this._labelAtlasRenderer.setAnchorPoint(point, y)
    }
}, _setAnchorX: function (value) {
    ccui.Widget.prototype._setAnchorX.call(this, value);
    this._labelAtlasRenderer._setAnchorX(value)
}, _setAnchorY: function (value) {
    ccui.Widget.prototype._setAnchorY.call(this,
        value);
    this._labelAtlasRenderer._setAnchorY(value)
}, onSizeChanged: function () {
    ccui.Widget.prototype.onSizeChanged.call(this);
    this.labelAtlasScaleChangedWithSize()
}, getContentSize: function () {
    return this._labelAtlasRenderer.getContentSize()
}, _getWidth: function () {
    return this._labelAtlasRenderer._getWidth()
}, _getHeight: function () {
    return this._labelAtlasRenderer._getHeight()
}, getVirtualRenderer: function () {
    return this._labelAtlasRenderer
}, labelAtlasScaleChangedWithSize: function () {
    if (this._ignoreSize) {
        this._labelAtlasRenderer.setScale(1);
        var atlasRenderSize = this._labelAtlasRenderer.getContentSize();
        this._size.width = atlasRenderSize.width;
        this._size.height = atlasRenderSize.height
    } else {
        var textureSize = this._labelAtlasRenderer.getContentSize();
        if (textureSize.width <= 0 || textureSize.height <= 0) {
            this._labelAtlasRenderer.setScale(1);
            return
        }
        var scaleX = this._size.width / textureSize.width;
        var scaleY = this._size.height / textureSize.height;
        this._labelAtlasRenderer.setScaleX(scaleX);
        this._labelAtlasRenderer.setScaleY(scaleY)
    }
}, updateTextureColor: function () {
    this.updateColorToRenderer(this._labelAtlasRenderer)
},
    updateTextureOpacity: function () {
        this.updateOpacityToRenderer(this._labelAtlasRenderer)
    }, getDescription: function () {
        return"LabelAtlas"
    }, createCloneInstance: function () {
        return ccui.TextAtlas.create()
    }, copySpecialProperties: function (labelAtlas) {
        this.setProperty(labelAtlas._stringValue, labelAtlas._charMapFileName, labelAtlas._itemWidth, labelAtlas._itemHeight, labelAtlas._startCharMap)
    }});
var _p = ccui.TextAtlas.prototype;
_p.string;
cc.defineGetterSetter(_p, "string", _p.getStringValue, _p.setStringValue);
_p = null;
ccui.TextAtlas.create = function () {
    var uiLabelAtlas = new ccui.TextAtlas;
    if (uiLabelAtlas && uiLabelAtlas.init())return uiLabelAtlas;
    return null
};
ccui.TextAtlas.RENDERER_ZORDER = -1;
ccui.TextBMFont = ccui.Widget.extend({_labelBMFontRenderer: null, _fileHasInit: false, _fntFileName: "", _stringValue: "", _className: "TextBMFont", ctor: function () {
    ccui.Widget.prototype.ctor.call(this);
    this._labelBMFontRenderer = null;
    this._fileHasInit = false
}, initRenderer: function () {
    this._labelBMFontRenderer = cc.LabelBMFont.create();
    cc.Node.prototype.addChild.call(this, this._labelBMFontRenderer, ccui.TextBMFont.RENDERER_ZORDER, -1)
}, setFntFile: function (fileName) {
    if (!fileName)return;
    this._fntFileName = fileName;
    this._labelBMFontRenderer.initWithString("",
        fileName);
    this.updateAnchorPoint();
    this.labelBMFontScaleChangedWithSize();
    this._fileHasInit = true;
    this.setText(this._stringValue);
    if (!this._labelBMFontRenderer.textureLoaded())this._labelBMFontRenderer.addLoadedEventListener(function () {
        this.labelBMFontScaleChangedWithSize()
    }, this)
}, setText: function (value) {
    if (!value)return;
    this._stringValue = value;
    this._labelBMFontRenderer.setString(value);
    this.labelBMFontScaleChangedWithSize()
}, getStringValue: function () {
    return this._stringValue
}, setAnchorPoint: function (point, y) {
    if (y === undefined) {
        ccui.Widget.prototype.setAnchorPoint.call(this, point);
        this._labelBMFontRenderer.setAnchorPoint(point)
    } else {
        ccui.Widget.prototype.setAnchorPoint.call(this, point, y);
        this._labelBMFontRenderer.setAnchorPoint(point, y)
    }
}, _setAnchorX: function (value) {
    ccui.Widget.prototype._setAnchorX.call(this, value);
    this._labelBMFontRenderer._setAnchorX(value)
}, _setAnchorY: function (value) {
    ccui.Widget.prototype._setAnchorY.call(this, value);
    this._labelBMFontRenderer._setAnchorY(value)
}, onSizeChanged: function () {
    ccui.Widget.prototype.onSizeChanged.call(this);
    this.labelBMFontScaleChangedWithSize()
}, getContentSize: function () {
    return this._labelBMFontRenderer.getContentSize()
}, _getWidth: function () {
    return this._labelBMFontRenderer._getWidth()
}, _getHeight: function () {
    return this._labelBMFontRenderer._getHeight()
}, getVirtualRenderer: function () {
    return this._labelBMFontRenderer
}, labelBMFontScaleChangedWithSize: function () {
    if (this._ignoreSize) {
        this._labelBMFontRenderer.setScale(1);
        var rendererSize = this._labelBMFontRenderer.getContentSize();
        this._size.width = rendererSize.width;
        this._size.height = rendererSize.height
    } else {
        var textureSize = this._labelBMFontRenderer.getContentSize();
        if (textureSize.width <= 0 || textureSize.height <= 0) {
            this._labelBMFontRenderer.setScale(1);
            return
        }
        var scaleX = this._size.width / textureSize.width;
        var scaleY = this._size.height / textureSize.height;
        this._labelBMFontRenderer.setScaleX(scaleX);
        this._labelBMFontRenderer.setScaleY(scaleY)
    }
}, updateTextureColor: function () {
    this.updateColorToRenderer(this._labelBMFontRenderer)
}, updateTextureOpacity: function () {
    this.updateOpacityToRenderer(this._labelBMFontRenderer)
},
    getDescription: function () {
        return"LabelBMFont"
    }, createCloneInstance: function () {
        return ccui.TextBMFont.create()
    }, copySpecialProperties: function (labelBMFont) {
        this.setFntFile(labelBMFont._fntFileName);
        this.setText(labelBMFont._stringValue)
    }});
var _p = ccui.TextBMFont.prototype;
_p.string;
cc.defineGetterSetter(_p, "string", _p.getStringValue, _p.setStringValue);
_p = null;
ccui.TextBMFont.create = function () {
    var uiLabelBMFont = new ccui.TextBMFont;
    if (uiLabelBMFont && uiLabelBMFont.init())return uiLabelBMFont;
    return null
};
ccui.TextBMFont.RENDERER_ZORDER = -1;
ccui.UICCTextField = cc.TextFieldTTF.extend({maxLengthEnabled: false, maxLength: 0, passwordEnabled: false, _passwordStyleText: "", _attachWithIME: false, _detachWithIME: false, _insertText: false, _deleteBackward: false, _className: "UICCTextField", ctor: function () {
    cc.TextFieldTTF.prototype.ctor.call(this);
    this.maxLengthEnabled = false;
    this.maxLength = 0;
    this.passwordEnabled = false;
    this._passwordStyleText = "*";
    this._attachWithIME = false;
    this._detachWithIME = false;
    this._insertText = false;
    this._deleteBackward = false
}, init: function () {
    if (ccui.Widget.prototype.init.call(this)) {
        this.setTouchEnabled(true);
        return true
    }
    return false
}, onEnter: function () {
    cc.TextFieldTTF.prototype.onEnter.call(this);
    cc.TextFieldTTF.prototype.setDelegate.call(this, this)
}, onTextFieldAttachWithIME: function (sender) {
    this.setAttachWithIME(true);
    return false
}, onTextFieldInsertText: function (sender, text, len) {
    if (len == 1 && text == "\n")return false;
    this.setInsertText(true);
    if (this.maxLengthEnabled)if (cc.TextFieldTTF.prototype.getCharCount.call(this) >= this.maxLength)return true;
    return false
}, onTextFieldDeleteBackward: function (sender, delText, nLen) {
    this.setDeleteBackward(true);
    return false
}, onTextFieldDetachWithIME: function (sender) {
    this.setDetachWithIME(true);
    return false
}, insertText: function (text, len) {
    var str_text = text;
    var locString = cc.TextFieldTTF.prototype.getString.call(this);
    var str_len = locString.length;
    var multiple, header;
    if (text != "\n")if (this.maxLengthEnabled) {
        multiple = 1;
        header = text.charCodeAt(0);
        if (header < 0 || header > 127)multiple = 3;
        if (str_len + len > this.maxLength * multiple) {
            str_text = str_text.substr(0, this.maxLength * multiple);
            len = this.maxLength *
                multiple
        }
    }
    cc.TextFieldTTF.prototype.insertText.call(this, str_text, len);
    if (this.passwordEnabled)if (cc.TextFieldTTF.prototype.getCharCount.call(this) > 0)this.setPasswordText(this._inputText)
}, deleteBackward: function () {
    cc.TextFieldTTF.prototype.deleteBackward.call(this);
    if (cc.TextFieldTTF.prototype.getCharCount.call(this) > 0)if (this.passwordEnabled)this.setPasswordText(this._inputText)
}, openIME: function () {
    cc.TextFieldTTF.prototype.attachWithIME.call(this)
}, closeIME: function () {
    cc.TextFieldTTF.prototype.detachWithIME.call(this)
},
    onDraw: function (sender) {
        return false
    }, setMaxLengthEnabled: function (enable) {
        this.maxLengthEnabled = enable
    }, isMaxLengthEnabled: function () {
        return this.maxLengthEnabled
    }, setMaxLength: function (length) {
        this.maxLength = length
    }, getMaxLength: function () {
        return this.maxLength
    }, getCharCount: function () {
        return cc.TextFieldTTF.prototype.getCharCount.call(this)
    }, setPasswordEnabled: function (enable) {
        this.passwordEnabled = enable
    }, isPasswordEnabled: function () {
        return this.passwordEnabled
    }, setPasswordStyleText: function (styleText) {
        if (styleText.length >
            1)return;
        var header = styleText.charCodeAt(0);
        if (header < 33 || header > 126)return;
        this._passwordStyleText = styleText
    }, setPasswordText: function (text) {
        var tempStr = "";
        for (var i = 0; i < text.length; ++i)tempStr += this._passwordStyleText;
        cc.LabelTTF.prototype.setString.call(this, tempStr)
    }, setAttachWithIME: function (attach) {
        this._attachWithIME = attach
    }, getAttachWithIME: function () {
        return this._attachWithIME
    }, setDetachWithIME: function (detach) {
        this._detachWithIME = detach
    }, getDetachWithIME: function () {
        return this._detachWithIME
    },
    setInsertText: function (insert) {
        this._insertText = insert
    }, getInsertText: function () {
        return this._insertText
    }, setDeleteBackward: function (deleteBackward) {
        this._deleteBackward = deleteBackward
    }, getDeleteBackward: function () {
        return this._deleteBackward
    }});
ccui.UICCTextField.create = function (placeholder, fontName, fontSize) {
    var ret = new ccui.UICCTextField;
    if (ret && ret.initWithString("", fontName, fontSize)) {
        if (placeholder)ret.setPlaceHolder(placeholder);
        return ret
    }
    return null
};
ccui.TextField = ccui.Widget.extend({_textFieldRender: null, _touchWidth: 0, _touchHeight: 0, _useTouchArea: false, _textFieldEventListener: null, _textFieldEventSelector: null, _attachWithIMEListener: null, _detachWithIMEListener: null, _insertTextListener: null, _deleteBackwardListener: null, _attachWithIMESelector: null, _detachWithIMESelector: null, _insertTextSelector: null, _deleteBackwardSelector: null, _passwordStyleText: "", ctor: function () {
    ccui.Widget.prototype.ctor.call(this);
    this._textFieldRender = null;
    this._touchWidth =
        0;
    this._touchHeight = 0;
    this._useTouchArea = false;
    this._textFieldEventListener = null;
    this._textFieldEventSelector = null;
    this._attachWithIMEListener = null;
    this._detachWithIMEListener = null;
    this._insertTextListener = null;
    this._deleteBackwardListener = null;
    this._attachWithIMESelector = null;
    this._detachWithIMESelector = null;
    this._insertTextSelector = null;
    this._deleteBackwardSelector = null
}, onEnter: function () {
    ccui.Widget.prototype.onEnter.call(this);
    this.setUpdateEnabled(true)
}, initRenderer: function () {
    this._textFieldRender =
        ccui.UICCTextField.create("input words here", "Thonburi", 20);
    cc.Node.prototype.addChild.call(this, this._textFieldRender, ccui.TextField.RENDERER_ZORDER, -1)
}, setTouchSize: function (size) {
    this._useTouchArea = true;
    this._touchWidth = size.width;
    this._touchHeight = size.height
}, getTouchSize: function () {
    return cc.size(this._touchWidth, this._touchHeight)
}, setText: function (text) {
    if (!text)return;
    text = String(text);
    if (this.isMaxLengthEnabled())text = text.substr(0, this.getMaxLength());
    if (this.isPasswordEnabled()) {
        this._textFieldRender.setPasswordText(text);
        this._textFieldRender.insertText(text, text.length)
    } else this._textFieldRender.setString(text);
    this._textFieldRender.setString(text);
    this.textfieldRendererScaleChangedWithSize()
}, setPlaceHolder: function (value) {
    this._textFieldRender.setPlaceHolder(value);
    this.textfieldRendererScaleChangedWithSize()
}, getPlaceHolder: function () {
    return this._textFieldRender.getPlaceHolder()
}, _setFont: function (font) {
    this._textFieldRender._setFont(font);
    this.textfieldRendererScaleChangedWithSize()
}, _getFont: function () {
    return this._textFieldRender._getFont()
},
    setFontSize: function (size) {
        this._textFieldRender.setFontSize(size);
        this.textfieldRendererScaleChangedWithSize()
    }, getFontSize: function () {
        return this._textFieldRender.getFontSize()
    }, setFontName: function (name) {
        this._textFieldRender.setFontName(name);
        this.textfieldRendererScaleChangedWithSize()
    }, getFontName: function () {
        return this._textFieldRender.getFontName()
    }, didNotSelectSelf: function () {
        this._textFieldRender.detachWithIME()
    }, getStringValue: function () {
        return this._textFieldRender.getString()
    }, onTouchBegan: function (touchPoint) {
        var pass =
            ccui.Widget.prototype.onTouchBegan.call(this, touchPoint);
        return pass
    }, onTouchEnded: function (touchPoint) {
        ccui.Widget.prototype.onTouchEnded.call(this, touchPoint);
        this._textFieldRender.attachWithIME()
    }, setMaxLengthEnabled: function (enable) {
        this._textFieldRender.setMaxLengthEnabled(enable)
    }, isMaxLengthEnabled: function () {
        return this._textFieldRender.isMaxLengthEnabled()
    }, setMaxLength: function (length) {
        this._textFieldRender.setMaxLength(length)
    }, getMaxLength: function () {
        return this._textFieldRender.getMaxLength()
    },
    setPasswordEnabled: function (enable) {
        this._textFieldRender.setPasswordEnabled(enable)
    }, isPasswordEnabled: function () {
        return this._textFieldRender.isPasswordEnabled()
    }, setPasswordStyleText: function (styleText) {
        this._textFieldRender.setPasswordStyleText(styleText);
        this._passwordStyleText = styleText
    }, getPasswordStyleText: function () {
        return this._passwordStyleText
    }, update: function (dt) {
        if (this.getAttachWithIME()) {
            this.attachWithIMEEvent();
            this.setAttachWithIME(false)
        }
        if (this.getDetachWithIME()) {
            this.detachWithIMEEvent();
            this.setDetachWithIME(false)
        }
        if (this.getInsertText()) {
            this.insertTextEvent();
            this.setInsertText(false);
            this.textfieldRendererScaleChangedWithSize()
        }
        if (this.getDeleteBackward()) {
            this.deleteBackwardEvent();
            this.setDeleteBackward(false)
        }
    }, getAttachWithIME: function () {
        return this._textFieldRender.getAttachWithIME()
    }, setAttachWithIME: function (attach) {
        this._textFieldRender.setAttachWithIME(attach)
    }, getDetachWithIME: function () {
        return this._textFieldRender.getDetachWithIME()
    }, setDetachWithIME: function (detach) {
        this._textFieldRender.setDetachWithIME(detach)
    },
    getInsertText: function () {
        return this._textFieldRender.getInsertText()
    }, setInsertText: function (insertText) {
        this._textFieldRender.setInsertText(insertText)
    }, getDeleteBackward: function () {
        return this._textFieldRender.getDeleteBackward()
    }, setDeleteBackward: function (deleteBackward) {
        this._textFieldRender.setDeleteBackward(deleteBackward)
    }, attachWithIMEEvent: function () {
        if (this._textFieldEventListener && this._textFieldEventSelector)this._textFieldEventSelector.call(this._textFieldEventListener, this, ccui.TextField.EVENT_ATTACH_WITH_ME)
    },
    detachWithIMEEvent: function () {
        if (this._textFieldEventListener && this._textFieldEventSelector)this._textFieldEventSelector.call(this._textFieldEventListener, this, ccui.TextField.EVENT_DETACH_WITH_ME)
    }, insertTextEvent: function () {
        if (this._textFieldEventListener && this._textFieldEventSelector)this._textFieldEventSelector.call(this._textFieldEventListener, this, ccui.TextField.EVENT_INSERT_TEXT)
    }, deleteBackwardEvent: function () {
        if (this._textFieldEventListener && this._textFieldEventSelector)this._textFieldEventSelector.call(this._textFieldEventListener,
            this, ccui.TextField.EVENT_DELETE_BACKWARD)
    }, addEventListenerTextField: function (selector, target) {
        this._textFieldEventSelector = selector;
        this._textFieldEventListener = target
    }, hitTest: function (pt) {
        var nsp = this.convertToNodeSpace(pt);
        var locSize = this._textFieldRender.getContentSize();
        var bb = cc.rect(-locSize.width * this._anchorPoint.x, -locSize.height * this._anchorPoint.y, locSize.width, locSize.height);
        if (nsp.x >= bb.x && nsp.x <= bb.x + bb.width && nsp.y >= bb.y && nsp.y <= bb.y + bb.height)return true;
        return false
    }, setAnchorPoint: function (point, y) {
        if (y === undefined) {
            ccui.Widget.prototype.setAnchorPoint.call(this, point);
            this._textFieldRender.setAnchorPoint(point)
        } else {
            ccui.Widget.prototype.setAnchorPoint.call(this, point, y);
            this._textFieldRender.setAnchorPoint(point, y)
        }
    }, _setAnchorX: function (value) {
        ccui.Widget.prototype._setAnchorX.call(this, value);
        this._textFieldRender._setAnchorX(value)
    }, _setAnchorY: function (value) {
        ccui.Widget.prototype._setAnchorY.call(this, value);
        this._textFieldRender._setAnchorY(value)
    }, onSizeChanged: function () {
        ccui.Widget.prototype.onSizeChanged.call(this);
        this.textfieldRendererScaleChangedWithSize()
    }, textfieldRendererScaleChangedWithSize: function () {
        if (this._ignoreSize) {
            this._textFieldRender.setScale(1);
            var rendererSize = this.getContentSize();
            this._size.width = rendererSize.width;
            this._size.height = rendererSize.height
        } else {
            var textureSize = this.getContentSize();
            if (textureSize.width <= 0 || textureSize.height <= 0) {
                this._textFieldRender.setScale(1);
                return
            }
            var scaleX = this._size.width / textureSize.width;
            var scaleY = this._size.height / textureSize.height;
            this._textFieldRender.setScaleX(scaleX);
            this._textFieldRender.setScaleY(scaleY)
        }
    }, getContentSize: function () {
        return this._textFieldRender.getContentSize()
    }, _getWidth: function () {
        return this._textFieldRender._getWidth()
    }, _getHeight: function () {
        return this._textFieldRender._getHeight()
    }, getVirtualRenderer: function () {
        return this._textFieldRender
    }, updateTextureColor: function () {
        this.updateColorToRenderer(this._textFieldRender)
    }, updateTextureOpacity: function () {
        this.updateOpacityToRenderer(this._textFieldRender)
    }, getDescription: function () {
        return"TextField"
    },
    attachWithIME: function () {
        this._textFieldRender.attachWithIME()
    }, createCloneInstance: function () {
        return ccui.TextField.create()
    }, copySpecialProperties: function (textField) {
        this.setText(textField._textFieldRender.getString());
        this.setPlaceHolder(textField.getStringValue());
        this.setFontSize(textField._textFieldRender.getFontSize());
        this.setFontName(textField._textFieldRender.getFontName());
        this.setMaxLengthEnabled(textField.isMaxLengthEnabled());
        this.setMaxLength(textField.getMaxLength());
        this.setPasswordEnabled(textField.isPasswordEnabled());
        this.setPasswordStyleText(textField._passwordStyleText);
        this.setAttachWithIME(textField.getAttachWithIME());
        this.setDetachWithIME(textField.getDetachWithIME());
        this.setInsertText(textField.getInsertText());
        this.setDeleteBackward(textField.getDeleteBackward())
    }});
var _p = ccui.TextField.prototype;
_p.string;
cc.defineGetterSetter(_p, "string", _p.getStringValue, _p.setText);
_p.placeHolder;
cc.defineGetterSetter(_p, "placeHolder", _p.getPlaceHolder, _p.setPlaceHolder);
_p.font;
cc.defineGetterSetter(_p, "font", _p._getFont, _p._setFont);
_p.fontSize;
cc.defineGetterSetter(_p, "fontSize", _p.getFontSize, _p.setFontSize);
_p.fontName;
cc.defineGetterSetter(_p, "fontName", _p.getFontName, _p.setFontName);
_p.maxLengthEnabled;
cc.defineGetterSetter(_p, "maxLengthEnabled", _p.isMaxLengthEnabled, _p.setMaxLengthEnabled);
_p.maxLength;
cc.defineGetterSetter(_p, "maxLength", _p.getMaxLength, _p.setMaxLength);
_p.passwordEnabled;
cc.defineGetterSetter(_p, "passwordEnabled", _p.isPasswordEnabled, _p.setPasswordEnabled);
_p = null;
ccui.TextField.create = function () {
    var uiTextField = new ccui.TextField;
    if (uiTextField && uiTextField.init())return uiTextField;
    return null
};
ccui.TextField.EVENT_ATTACH_WITH_ME = 0;
ccui.TextField.EVENT_DETACH_WITH_ME = 1;
ccui.TextField.EVENT_INSERT_TEXT = 2;
ccui.TextField.EVENT_DELETE_BACKWARD = 3;
ccui.TextField.RENDERER_ZORDER = -1;
ccui.RichElement = ccui.Class.extend({type: 0, tag: 0, color: null, ctor: function () {
    this.tag = 0;
    this.color = cc.color(255, 255, 255, 255)
}, init: function (tag, color, opacity) {
    this.tag = tag;
    this.color.r = color.r;
    this.color.g = color.g;
    this.color.b = color.b;
    this.color.a = opacity
}});
ccui.RichElementText = ccui.RichElement.extend({text: "", fontName: "", fontSize: 0, ctor: function () {
    ccui.RichElement.prototype.ctor.call(this);
    this.type = ccui.RichElement.TYPE_TEXT;
    this.text = "";
    this.fontName = "";
    this.fontSize = 0
}, init: function (tag, color, opacity, text, fontName, fontSize) {
    ccui.RichElement.prototype.init.call(this, tag, color, opacity);
    this.text = text;
    this.fontName = fontName;
    this.fontSize = fontSize
}});
ccui.RichElementText.create = function (tag, color, opacity, text, fontName, fontSize) {
    var element = new ccui.RichElementText;
    element.init(tag, color, opacity, text, fontName, fontSize);
    return element
};
ccui.RichElementImage = ccui.RichElement.extend({filePath: "", textureRect: null, textureType: 0, ctor: function () {
    ccui.RichElement.prototype.ctor.call(this);
    this.type = ccui.RichElement.TYPE_IMAGE;
    this.filePath = "";
    this.textureRect = cc.rect(0, 0, 0, 0);
    this.textureType = 0
}, init: function (tag, color, opacity, filePath) {
    ccui.RichElement.prototype.init.call(this, tag, color, opacity);
    this.filePath = filePath
}});
ccui.RichElementImage.create = function (tag, color, opacity, filePath) {
    var element = new ccui.RichElementImage;
    element.init(tag, color, opacity, filePath);
    return element
};
ccui.RichElementCustomNode = ccui.RichElement.extend({customNode: null, ctor: function () {
    ccui.RichElement.prototype.ctor.call(this);
    this.type = ccui.RichElement.TYPE_CUSTOM;
    this.customNode = null
}, init: function (tag, color, opacity, customNode) {
    ccui.RichElement.prototype.init.call(this, tag, color, opacity);
    this.customNode = customNode
}});
ccui.RichElementCustomNode.create = function (tag, color, opacity, customNode) {
    var element = new ccui.RichElementCustomNode;
    element.init(tag, color, opacity, customNode);
    return element
};
ccui.RichText = ccui.Widget.extend({_formatTextDirty: false, _richElements: null, _elementRenders: null, _leftSpaceWidth: 0, _verticalSpace: 0, _elementRenderersContainer: null, ctor: function () {
    ccui.Widget.prototype.ctor.call(this);
    this._formatTextDirty = false;
    this._richElements = [];
    this._elementRenders = [];
    this._leftSpaceWidth = 0;
    this._verticalSpace = 0;
    this._elementRenderersContainer = null
}, initRenderer: function () {
    this._elementRenderersContainer = cc.Node.create();
    this._elementRenderersContainer.setAnchorPoint(cc.p(0.5,
        0.5));
    cc.Node.prototype.addChild.call(this, this._elementRenderersContainer, 0, -1)
}, insertElement: function (element, index) {
    this._richElements.splice(index, 0, element);
    this._formatTextDirty = true
}, pushBackElement: function (element) {
    this._richElements.push(element);
    this._formatTextDirty = true
}, removeElement: function (element) {
    if (typeof element === "number")this._richElements.splice(element, 1); else cc.arrayRemoveObject(this._richElements, element);
    this._formatTextDirty = true
}, formatText: function () {
    if (this._formatTextDirty) {
        this._elementRenderersContainer.removeAllChildren();
        this._elementRenders.length = 0;
        if (this._ignoreSize) {
            this.addNewLine();
            for (var i = 0; i < this._richElements.length; i++) {
                var element = this._richElements[i];
                var elementRenderer = null;
                switch (element.type) {
                    case ccui.RichElement.TYPE_TEXT:
                        elementRenderer = cc.LabelTTF.create(element.text, element.fontName, element.fontSize);
                        break;
                    case ccui.RichElement.TYPE_IMAGE:
                        elementRenderer = cc.Sprite.create(element.filePath);
                        break;
                    case ccui.RichElement.TYPE_CUSTOM:
                        elementRenderer = element.customNode;
                        break;
                    default:
                        break
                }
                elementRenderer.setColor(element.color);
                this.pushToContainer(elementRenderer)
            }
        } else {
            this.addNewLine();
            for (var i = 0; i < this._richElements.length; i++) {
                var element = this._richElements[i];
                switch (element.type) {
                    case ccui.RichElement.TYPE_TEXT:
                        this.handleTextRenderer(element.text, element.fontName, element.fontSize, element.color);
                        break;
                    case ccui.RichElement.TYPE_IMAGE:
                        this.handleImageRenderer(element.filePath, element.color);
                        break;
                    case ccui.RichElement.TYPE_CUSTOM:
                        this.handleCustomRenderer(element.customNode);
                        break;
                    default:
                        break
                }
            }
        }
        this.formatRenderers();
        this._formatTextDirty = false
    }
}, handleTextRenderer: function (text, fontName, fontSize, color) {
    var textRenderer = cc.LabelTTF.create(text, fontName, fontSize);
    var textRendererWidth = textRenderer.getContentSize().width;
    this._leftSpaceWidth -= textRendererWidth;
    if (this._leftSpaceWidth < 0) {
        var overstepPercent = -this._leftSpaceWidth / textRendererWidth;
        var curText = text;
        var stringLength = curText.length;
        var leftLength = stringLength * (1 - overstepPercent);
        var leftWords = curText.substr(0, leftLength);
        var cutWords = curText.substr(leftLength,
                curText.length - 1);
        if (leftLength > 0) {
            var leftRenderer = cc.LabelTTF.create(leftWords.substr(0, leftLength), fontName, fontSize);
            leftRenderer.setColor(color);
            this.pushToContainer(leftRenderer)
        }
        this.addNewLine();
        this.handleTextRenderer(cutWords, fontName, fontSize, color)
    } else {
        textRenderer.setColor(color);
        this.pushToContainer(textRenderer)
    }
}, handleImageRenderer: function (filePath, color, opacity) {
    var imageRenderer = cc.Sprite.create(filePath);
    this.handleCustomRenderer(imageRenderer)
}, handleCustomRenderer: function (renderer) {
    var imgSize =
        renderer.getContentSize();
    this._leftSpaceWidth -= imgSize.width;
    if (this._leftSpaceWidth < 0) {
        this.addNewLine();
        this.pushToContainer(renderer);
        this._leftSpaceWidth -= imgSize.width
    } else this.pushToContainer(renderer)
}, addNewLine: function () {
    this._leftSpaceWidth = this._customSize.width;
    this._elementRenders.push([])
}, formatRenderers: function () {
    if (this._ignoreSize) {
        var newContentSizeWidth = 0;
        var newContentSizeHeight = 0;
        var row = this._elementRenders[0];
        var nextPosX = 0;
        for (var j = 0; j < row.length; j++) {
            var l = row[j];
            l.setAnchorPoint(cc.p(0,
                0));
            l.setPosition(cc.p(nextPosX, 0));
            this._elementRenderersContainer.addChild(l, 1, j);
            var iSize = l.getContentSize();
            newContentSizeWidth += iSize.width;
            newContentSizeHeight = Math.max(newContentSizeHeight, iSize.height);
            nextPosX += iSize.width
        }
        this._elementRenderersContainer.setContentSize(cc.size(newContentSizeWidth, newContentSizeHeight))
    } else {
        var newContentSizeHeight = 0;
        var maxHeights = [];
        for (var i = 0; i < this._elementRenders.length; i++) {
            var row = this._elementRenders[i];
            var maxHeight = 0;
            for (var j = 0; j < row.length; j++) {
                var l =
                    row[j];
                maxHeight = Math.max(l.getContentSize().height, maxHeight)
            }
            maxHeights[i] = maxHeight;
            newContentSizeHeight += maxHeights[i]
        }
        var nextPosY = this._customSize.height;
        for (var i = 0; i < this._elementRenders.length; i++) {
            var row = this._elementRenders[i];
            var nextPosX = 0;
            nextPosY -= maxHeights[i] + this._verticalSpace;
            for (var j = 0; j < row.length; j++) {
                var l = row[j];
                l.setAnchorPoint(cc.p(0, 0));
                l.setPosition(cc.p(nextPosX, nextPosY));
                this._elementRenderersContainer.addChild(l, 1, i * 10 + j);
                nextPosX += l.getContentSize().width
            }
        }
        this._elementRenderersContainer.setContentSize(this._size)
    }
    this._elementRenders.length =
        0;
    if (this._ignoreSize) {
        var s = this.getContentSize();
        this._size.width = s.width;
        this._size.height = s.height
    } else {
        this._size.width = this._customSize.width;
        this._size.height = this._customSize.height
    }
}, pushToContainer: function (renderer) {
    if (this._elementRenders.length <= 0)return;
    this._elementRenders[this._elementRenders.length - 1].push(renderer)
}, visit: function (ctx) {
    if (this._enabled) {
        this.formatText();
        ccui.Widget.prototype.visit.call(this, ctx)
    }
}, setVerticalSpace: function (space) {
    this._verticalSpace = space
}, setAnchorPoint: function (pt) {
    ccui.Widget.prototype.setAnchorPoint.call(this,
        pt);
    this._elementRenderersContainer.setAnchorPoint(pt)
}, getContentSize: function () {
    return this._elementRenderersContainer.getContentSize()
}, ignoreContentAdaptWithSize: function (ignore) {
    if (this._ignoreSize != ignore) {
        this._formatTextDirty = true;
        ccui.Widget.prototype.ignoreContentAdaptWithSize.call(this, ignore)
    }
}});
ccui.RichText.create = function () {
    var richText = new ccui.RichText;
    richText.init();
    return richText
};
ccui.RichElement.TYPE_TEXT = 0;
ccui.RichElement.TYPE_IMAGE = 1;
ccui.RichElement.TYPE_CUSTOM = 2;
ccui.ScrollView = ccui.Layout.extend({_innerContainer: null, direction: null, _touchBeganPoint: null, _touchMovedPoint: null, _touchEndedPoint: null, _touchMovingPoint: null, _autoScrollDir: null, _topBoundary: 0, _bottomBoundary: 0, _leftBoundary: 0, _rightBoundary: 0, _bounceTopBoundary: 0, _bounceBottomBoundary: 0, _bounceLeftBoundary: 0, _bounceRightBoundary: 0, _autoScroll: false, _autoScrollAddUpTime: 0, _autoScrollOriginalSpeed: 0, _autoScrollAcceleration: 0, _isAutoScrollSpeedAttenuated: false, _needCheckAutoScrollDestination: false,
    _autoScrollDestination: null, _bePressed: false, _slidTime: 0, _moveChildPoint: null, _childFocusCancelOffset: 0, _leftBounceNeeded: false, _topBounceNeeded: false, _rightBounceNeeded: false, _bottomBounceNeeded: false, bounceEnabled: false, _bouncing: false, _bounceDir: null, _bounceOriginalSpeed: 0, inertiaScrollEnabled: false, _scrollViewEventListener: null, _scrollViewEventSelector: null, _className: "ScrollView", ctor: function () {
        ccui.Layout.prototype.ctor.call(this);
        this._innerContainer = null;
        this.direction = ccui.ScrollView.DIR_NONE;
        this._touchBeganPoint = cc.p(0, 0);
        this._touchMovedPoint = cc.p(0, 0);
        this._touchEndedPoint = cc.p(0, 0);
        this._touchMovingPoint = cc.p(0, 0);
        this._autoScrollDir = cc.p(0, 0);
        this._topBoundary = 0;
        this._bottomBoundary = 0;
        this._leftBoundary = 0;
        this._rightBoundary = 0;
        this._bounceTopBoundary = 0;
        this._bounceBottomBoundary = 0;
        this._bounceLeftBoundary = 0;
        this._bounceRightBoundary = 0;
        this._autoScroll = false;
        this._autoScrollAddUpTime = 0;
        this._autoScrollOriginalSpeed = 0;
        this._autoScrollAcceleration = -1E3;
        this._isAutoScrollSpeedAttenuated =
            false;
        this._needCheckAutoScrollDestination = false;
        this._autoScrollDestination = cc.p(0, 0);
        this._bePressed = false;
        this._slidTime = 0;
        this._moveChildPoint = cc.p(0, 0);
        this._childFocusCancelOffset = 5;
        this._leftBounceNeeded = false;
        this._topBounceNeeded = false;
        this._rightBounceNeeded = false;
        this._bottomBounceNeeded = false;
        this.bounceEnabled = false;
        this._bouncing = false;
        this._bounceDir = cc.p(0, 0);
        this._bounceOriginalSpeed = 0;
        this.inertiaScrollEnabled = true;
        this._scrollViewEventListener = null;
        this._scrollViewEventSelector =
            null
    }, init: function () {
        if (ccui.Layout.prototype.init.call(this)) {
            this.setTouchEnabled(true);
            this.setClippingEnabled(true);
            this._innerContainer.setTouchEnabled(false);
            return true
        }
        return false
    }, onEnter: function () {
        ccui.Layout.prototype.onEnter.call(this);
        this.setUpdateEnabled(true)
    }, initRenderer: function () {
        ccui.Layout.prototype.initRenderer.call(this);
        this._innerContainer = ccui.Layout.create();
        ccui.Layout.prototype.addChild.call(this, this._innerContainer)
    }, onSizeChanged: function () {
        ccui.Layout.prototype.onSizeChanged.call(this);
        var locSize = this._size;
        this._topBoundary = locSize.height;
        this._rightBoundary = locSize.width;
        var bounceBoundaryParameterX = locSize.width / 3;
        var bounceBoundaryParameterY = locSize.height / 3;
        this._bounceTopBoundary = locSize.height - bounceBoundaryParameterY;
        this._bounceBottomBoundary = bounceBoundaryParameterY;
        this._bounceLeftBoundary = bounceBoundaryParameterX;
        this._bounceRightBoundary = this._size.width - bounceBoundaryParameterX;
        var innerSize = this._innerContainer.getSize();
        var orginInnerSizeWidth = innerSize.width;
        var orginInnerSizeHeight =
            innerSize.height;
        var innerSizeWidth = Math.max(orginInnerSizeWidth, locSize.width);
        var innerSizeHeight = Math.max(orginInnerSizeHeight, locSize.height);
        this._innerContainer.setSize(cc.size(innerSizeWidth, innerSizeHeight));
        this._innerContainer.setPosition(0, locSize.height - this._innerContainer.getSize().height)
    }, setInnerContainerSize: function (size) {
        var locSize = this._size;
        var innerSizeWidth = locSize.width;
        var innerSizeHeight = locSize.height;
        var originalInnerSize = this._innerContainer.getSize();
        if (size.width <
            locSize.width)cc.log("Inner width \x3c\x3d scrollview width, it will be force sized!"); else innerSizeWidth = size.width;
        if (size.height < locSize.height)cc.log("Inner height \x3c\x3d scrollview height, it will be force sized!"); else innerSizeHeight = size.height;
        this._innerContainer.setSize(cc.size(innerSizeWidth, innerSizeHeight));
        switch (this.direction) {
            case ccui.ScrollView.DIR_VERTICAL:
                var newInnerSize = this._innerContainer.getSize();
                var offset = originalInnerSize.height - newInnerSize.height;
                this.scrollChildren(0,
                    offset);
                break;
            case ccui.ScrollView.DIR_HORIZONTAL:
                if (this._innerContainer.getRightInParent() <= locSize.width) {
                    var newInnerSize = this._innerContainer.getSize();
                    var offset = originalInnerSize.width - newInnerSize.width;
                    this.scrollChildren(offset, 0)
                }
                break;
            case ccui.ScrollView.DIR_BOTH:
                var newInnerSize = this._innerContainer.getSize();
                var offsetY = originalInnerSize.height - newInnerSize.height;
                var offsetX = 0;
                if (this._innerContainer.getRightInParent() <= locSize.width)offsetX = originalInnerSize.width - newInnerSize.width;
                this.scrollChildren(offsetX, offsetY);
                break;
            default:
                break
        }
        var innerContainer = this._innerContainer;
        var innerSize = innerContainer.getSize();
        var innerPos = innerContainer.getPosition();
        var innerAP = innerContainer.getAnchorPoint();
        if (innerContainer.getLeftInParent() > 0)innerContainer.setPosition(innerAP.x * innerSize.width, innerPos.y);
        if (innerContainer.getRightInParent() < locSize.width)innerContainer.setPosition(locSize.width - (1 - innerAP.x) * innerSize.width, innerPos.y);
        if (innerPos.y > 0)innerContainer.setPosition(innerPos.x,
                innerAP.y * innerSize.height);
        if (innerContainer.getTopInParent() < locSize.height)innerContainer.setPosition(innerPos.x, locSize.height - (1 - innerAP.y) * innerSize.height)
    }, _setInnerWidth: function (width) {
        var locW = this._size.width, innerWidth = locW, container = this._innerContainer, oldInnerWidth = container.width;
        if (width < locW)cc.log("Inner width \x3c\x3d scrollview width, it will be force sized!"); else innerWidth = width;
        container.width = innerWidth;
        switch (this.direction) {
            case ccui.ScrollView.DIR_HORIZONTAL:
            case ccui.ScrollView.DIR_BOTH:
                if (container.getRightInParent() <=
                    locW) {
                    var newInnerWidth = container.width;
                    var offset = oldInnerWidth - newInnerWidth;
                    this.scrollChildren(offset, 0)
                }
                break
        }
        var innerAX = container.anchorX;
        if (container.getLeftInParent() > 0)container.x = innerAX * innerWidth;
        if (container.getRightInParent() < locW)container.x = locW - (1 - innerAX) * innerWidth
    }, _setInnerHeight: function (height) {
        var locH = this._size.height, innerHeight = locH, container = this._innerContainer, oldInnerHeight = container.height;
        if (height < locH)cc.log("Inner height \x3c\x3d scrollview height, it will be force sized!");
        else innerHeight = height;
        container.height = innerHeight;
        switch (this.direction) {
            case ccui.ScrollView.DIR_VERTICAL:
            case ccui.ScrollView.DIR_BOTH:
                var newInnerHeight = innerHeight;
                var offset = oldInnerHeight - newInnerHeight;
                this.scrollChildren(0, offset);
                break
        }
        var innerAY = container.anchorY;
        if (container.getLeftInParent() > 0)container.y = innerAY * innerHeight;
        if (container.getRightInParent() < locH)container.y = locH - (1 - innerAY) * innerHeight
    }, getInnerContainerSize: function () {
        return this._innerContainer.getSize()
    }, _getInnerWidth: function () {
        return this._innerContainer.width
    },
    _getInnerHeight: function () {
        return this._innerContainer.height
    }, addChild: function (widget, zOrder, tag) {
        return this._innerContainer.addChild(widget, zOrder, tag)
    }, removeAllChildren: function (cleanup) {
        this._innerContainer.removeAllChildren(cleanup)
    }, removeChild: function (child, cleanup) {
        return this._innerContainer.removeChild(child, cleanup)
    }, getChildren: function () {
        return this._innerContainer.getChildren()
    }, getChildrenCount: function () {
        return this._innerContainer.getChildrenCount()
    }, getChildByTag: function (tag) {
        return this._innerContainer.getChildByTag(tag)
    },
    getChildByName: function (name) {
        return this._innerContainer.getChildByName(name)
    }, addNode: function (node, zOrder, tag) {
        this._innerContainer.addNode(node, zOrder, tag)
    }, getNodeByTag: function (tag) {
        return this._innerContainer.getNodeByTag(tag)
    }, getNodes: function () {
        return this._innerContainer.getNodes()
    }, removeNode: function (node) {
        this._innerContainer.removeNode(node)
    }, removeNodeByTag: function (tag) {
        this._innerContainer.removeNodeByTag(tag)
    }, removeAllNodes: function () {
        this._innerContainer.removeAllNodes()
    }, moveChildren: function (offsetX, offsetY) {
        var pos = this._innerContainer.getPosition();
        this._moveChildPoint.x = pos.x + offsetX;
        this._moveChildPoint.y = pos.y + offsetY;
        this._innerContainer.setPosition(this._moveChildPoint)
    }, autoScrollChildren: function (dt) {
        var lastTime = this._autoScrollAddUpTime;
        this._autoScrollAddUpTime += dt;
        if (this._isAutoScrollSpeedAttenuated) {
            var nowSpeed = this._autoScrollOriginalSpeed + this._autoScrollAcceleration * this._autoScrollAddUpTime;
            if (nowSpeed <= 0) {
                this.stopAutoScrollChildren();
                this.checkNeedBounce()
            } else {
                var timeParam =
                    lastTime * 2 + dt;
                var offset = (this._autoScrollOriginalSpeed + this._autoScrollAcceleration * timeParam * 0.5) * dt;
                var offsetX = offset * this._autoScrollDir.x;
                var offsetY = offset * this._autoScrollDir.y;
                if (!this.scrollChildren(offsetX, offsetY)) {
                    this.stopAutoScrollChildren();
                    this.checkNeedBounce()
                }
            }
        } else if (this._needCheckAutoScrollDestination) {
            var xOffset = this._autoScrollDir.x * dt * this._autoScrollOriginalSpeed;
            var yOffset = this._autoScrollDir.y * dt * this._autoScrollOriginalSpeed;
            var notDone = this.checkCustomScrollDestination(xOffset,
                yOffset);
            var scrollCheck = this.scrollChildren(xOffset, yOffset);
            if (!notDone || !scrollCheck) {
                this.stopAutoScrollChildren();
                this.checkNeedBounce()
            }
        } else if (!this.scrollChildren(this._autoScrollDir.x * dt * this._autoScrollOriginalSpeed, this._autoScrollDir.y * dt * this._autoScrollOriginalSpeed)) {
            this.stopAutoScrollChildren();
            this.checkNeedBounce()
        }
    }, bounceChildren: function (dt) {
        var locSpeed = this._bounceOriginalSpeed;
        var locBounceDir = this._bounceDir;
        if (locSpeed <= 0)this.stopBounceChildren();
        if (!this.bounceScrollChildren(locBounceDir.x *
            dt * locSpeed, locBounceDir.y * dt * locSpeed))this.stopBounceChildren()
    }, checkNeedBounce: function () {
        if (!this.bounceEnabled)return false;
        this.checkBounceBoundary();
        if (this._topBounceNeeded || this._bottomBounceNeeded || this._leftBounceNeeded || this._rightBounceNeeded) {
            if (this._topBounceNeeded && this._leftBounceNeeded) {
                var scrollVector = cc.pSub(cc.p(0, this._size.height), cc.p(this._innerContainer.getLeftInParent(), this._innerContainer.getTopInParent()));
                var orSpeed = cc.pLength(scrollVector) / 0.2;
                this._bounceDir = cc.pNormalize(scrollVector);
                this.startBounceChildren(orSpeed)
            } else if (this._topBounceNeeded && this._rightBounceNeeded) {
                var scrollVector = cc.pSub(cc.p(this._size.width, this._size.height), cc.p(this._innerContainer.getRightInParent(), this._innerContainer.getTopInParent()));
                var orSpeed = cc.pLength(scrollVector) / 0.2;
                this._bounceDir = cc.pNormalize(scrollVector);
                this.startBounceChildren(orSpeed)
            } else if (this._bottomBounceNeeded && this._leftBounceNeeded) {
                var scrollVector = cc.pSub(cc.p(0, 0), cc.p(this._innerContainer.getLeftInParent(), this._innerContainer.getBottomInParent()));
                var orSpeed = cc.pLength(scrollVector) / 0.2;
                this._bounceDir = cc.pNormalize(scrollVector);
                this.startBounceChildren(orSpeed)
            } else if (this._bottomBounceNeeded && this._rightBounceNeeded) {
                var scrollVector = cc.pSub(cc.p(this._size.width, 0), cc.p(this._innerContainer.getRightInParent(), this._innerContainer.getBottomInParent()));
                var orSpeed = cc.pLength(scrollVector) / 0.2;
                this._bounceDir = cc.pNormalize(scrollVector);
                this.startBounceChildren(orSpeed)
            } else if (this._topBounceNeeded) {
                var scrollVector = cc.pSub(cc.p(0, this._size.height),
                    cc.p(0, this._innerContainer.getTopInParent()));
                var orSpeed = cc.pLength(scrollVector) / 0.2;
                this._bounceDir = cc.pNormalize(scrollVector);
                this.startBounceChildren(orSpeed)
            } else if (this._bottomBounceNeeded) {
                var scrollVector = cc.pSub(cc.p(0, 0), cc.p(0, this._innerContainer.getBottomInParent()));
                var orSpeed = cc.pLength(scrollVector) / 0.2;
                this._bounceDir = cc.pNormalize(scrollVector);
                this.startBounceChildren(orSpeed)
            } else if (this._leftBounceNeeded) {
                var scrollVector = cc.pSub(cc.p(0, 0), cc.p(this._innerContainer.getLeftInParent(),
                    0));
                var orSpeed = cc.pLength(scrollVector) / 0.2;
                this._bounceDir = cc.pNormalize(scrollVector);
                this.startBounceChildren(orSpeed)
            } else if (this._rightBounceNeeded) {
                var scrollVector = cc.pSub(cc.p(this._size.width, 0), cc.p(this._innerContainer.getRightInParent(), 0));
                var orSpeed = cc.pLength(scrollVector) / 0.2;
                this._bounceDir = cc.pNormalize(scrollVector);
                this.startBounceChildren(orSpeed)
            }
            return true
        }
        return false
    }, checkBounceBoundary: function () {
        var icBottomPos = this._innerContainer.getBottomInParent();
        if (icBottomPos >
            this._bottomBoundary) {
            this.scrollToBottomEvent();
            this._bottomBounceNeeded = true
        } else this._bottomBounceNeeded = false;
        var icTopPos = this._innerContainer.getTopInParent();
        if (icTopPos < this._topBoundary) {
            this.scrollToTopEvent();
            this._topBounceNeeded = true
        } else this._topBounceNeeded = false;
        var icRightPos = this._innerContainer.getRightInParent();
        if (icRightPos < this._rightBoundary) {
            this.scrollToRightEvent();
            this._rightBounceNeeded = true
        } else this._rightBounceNeeded = false;
        var icLeftPos = this._innerContainer.getLeftInParent();
        if (icLeftPos > this._leftBoundary) {
            this.scrollToLeftEvent();
            this._leftBounceNeeded = true
        } else this._leftBounceNeeded = false
    }, startBounceChildren: function (v) {
        this._bounceOriginalSpeed = v;
        this._bouncing = true
    }, stopBounceChildren: function () {
        this._bouncing = false;
        this._bounceOriginalSpeed = 0;
        this._leftBounceNeeded = false;
        this._rightBounceNeeded = false;
        this._topBounceNeeded = false;
        this._bottomBounceNeeded = false
    }, startAutoScrollChildrenWithOriginalSpeed: function (dir, v, attenuated, acceleration) {
        this.stopAutoScrollChildren();
        this._autoScrollDir = dir;
        this._isAutoScrollSpeedAttenuated = attenuated;
        this._autoScrollOriginalSpeed = v;
        this._autoScroll = true;
        this._autoScrollAcceleration = acceleration
    }, startAutoScrollChildrenWithDestination: function (des, time, attenuated) {
        this._needCheckAutoScrollDestination = false;
        this._autoScrollDestination = des;
        var dis = cc.pSub(des, this._innerContainer.getPosition());
        var dir = cc.pNormalize(dis);
        var orSpeed = 0;
        var acceleration = -1E3;
        var disLength = cc.pLength(dis);
        if (attenuated) {
            acceleration = -(2 * disLength) /
                (time * time);
            orSpeed = 2 * disLength / time
        } else {
            this._needCheckAutoScrollDestination = true;
            orSpeed = disLength / time
        }
        this.startAutoScrollChildrenWithOriginalSpeed(dir, orSpeed, attenuated, acceleration)
    }, jumpToDestination: function (dstX, dstY) {
        if (dstX.x !== undefined) {
            dstY = dstX.y;
            dstX = dstX.x
        }
        var finalOffsetX = dstX;
        var finalOffsetY = dstY;
        switch (this.direction) {
            case ccui.ScrollView.DIR_VERTICAL:
                if (dstY <= 0)finalOffsetY = Math.max(dstY, this._size.height - this._innerContainer.getSize().height);
                break;
            case ccui.ScrollView.DIR_HORIZONTAL:
                if (dstX <=
                    0)finalOffsetX = Math.max(dstX, this._size.width - this._innerContainer.getSize().width);
                break;
            case ccui.ScrollView.DIR_BOTH:
                if (dstY <= 0)finalOffsetY = Math.max(dstY, this._size.height - this._innerContainer.getSize().height);
                if (dstX <= 0)finalOffsetX = Math.max(dstX, this._size.width - this._innerContainer.getSize().width);
                break;
            default:
                break
        }
        this._innerContainer.setPosition(finalOffsetX, finalOffsetY)
    }, stopAutoScrollChildren: function () {
        this._autoScroll = false;
        this._autoScrollOriginalSpeed = 0;
        this._autoScrollAddUpTime =
            0
    }, bounceScrollChildren: function (touchOffsetX, touchOffsetY) {
        var scrollEnabled = true;
        if (touchOffsetX > 0 && touchOffsetY > 0) {
            var realOffsetX = touchOffsetX;
            var realOffsetY = touchOffsetY;
            var icRightPos = this._innerContainer.getRightInParent();
            if (icRightPos + realOffsetX >= this._rightBoundary) {
                realOffsetX = this._rightBoundary - icRightPos;
                this.bounceRightEvent();
                scrollEnabled = false
            }
            var icTopPos = this._innerContainer.getTopInParent();
            if (icTopPos + touchOffsetY >= this._topBoundary) {
                realOffsetY = this._topBoundary - icTopPos;
                this.bounceTopEvent();
                scrollEnabled = false
            }
            this.moveChildren(realOffsetX, realOffsetY)
        } else if (touchOffsetX < 0 && touchOffsetY > 0) {
            var realOffsetX = touchOffsetX;
            var realOffsetY = touchOffsetY;
            var icLefrPos = this._innerContainer.getLeftInParent();
            if (icLefrPos + realOffsetX <= this._leftBoundary) {
                realOffsetX = this._leftBoundary - icLefrPos;
                this.bounceLeftEvent();
                scrollEnabled = false
            }
            var icTopPos = this._innerContainer.getTopInParent();
            if (icTopPos + touchOffsetY >= this._topBoundary) {
                realOffsetY = this._topBoundary - icTopPos;
                this.bounceTopEvent();
                scrollEnabled = false
            }
            this.moveChildren(realOffsetX, realOffsetY)
        } else if (touchOffsetX < 0 && touchOffsetY < 0) {
            var realOffsetX = touchOffsetX;
            var realOffsetY = touchOffsetY;
            var icLefrPos = this._innerContainer.getLeftInParent();
            if (icLefrPos + realOffsetX <= this._leftBoundary) {
                realOffsetX = this._leftBoundary - icLefrPos;
                this.bounceLeftEvent();
                scrollEnabled = false
            }
            var icBottomPos = this._innerContainer.getBottomInParent();
            if (icBottomPos + touchOffsetY <= this._bottomBoundary) {
                realOffsetY = this._bottomBoundary -
                    icBottomPos;
                this.bounceBottomEvent();
                scrollEnabled = false
            }
            this.moveChildren(realOffsetX, realOffsetY)
        } else if (touchOffsetX > 0 && touchOffsetY < 0) {
            var realOffsetX = touchOffsetX;
            var realOffsetY = touchOffsetY;
            var icRightPos = this._innerContainer.getRightInParent();
            if (icRightPos + realOffsetX >= this._rightBoundary) {
                realOffsetX = this._rightBoundary - icRightPos;
                this.bounceRightEvent();
                scrollEnabled = false
            }
            var icBottomPos = this._innerContainer.getBottomInParent();
            if (icBottomPos + touchOffsetY <= this._bottomBoundary) {
                realOffsetY =
                    this._bottomBoundary - icBottomPos;
                this.bounceBottomEvent();
                scrollEnabled = false
            }
            this.moveChildren(realOffsetX, realOffsetY)
        } else if (touchOffsetX == 0 && touchOffsetY > 0) {
            var realOffsetY = touchOffsetY;
            var icTopPos = this._innerContainer.getTopInParent();
            if (icTopPos + touchOffsetY >= this._topBoundary) {
                realOffsetY = this._topBoundary - icTopPos;
                this.bounceTopEvent();
                scrollEnabled = false
            }
            this.moveChildren(0, realOffsetY)
        } else if (touchOffsetX == 0 && touchOffsetY < 0) {
            var realOffsetY = touchOffsetY;
            var icBottomPos = this._innerContainer.getBottomInParent();
            if (icBottomPos + touchOffsetY <= this._bottomBoundary) {
                realOffsetY = this._bottomBoundary - icBottomPos;
                this.bounceBottomEvent();
                scrollEnabled = false
            }
            this.moveChildren(0, realOffsetY)
        } else if (touchOffsetX > 0 && touchOffsetY == 0) {
            var realOffsetX = touchOffsetX;
            var icRightPos = this._innerContainer.getRightInParent();
            if (icRightPos + realOffsetX >= this._rightBoundary) {
                realOffsetX = this._rightBoundary - icRightPos;
                this.bounceRightEvent();
                scrollEnabled = false
            }
            this.moveChildren(realOffsetX, 0)
        } else if (touchOffsetX < 0 && touchOffsetY ==
            0) {
            var realOffsetX = touchOffsetX;
            var icLeftPos = this._innerContainer.getLeftInParent();
            if (icLeftPos + realOffsetX <= this._leftBoundary) {
                realOffsetX = this._leftBoundary - icLeftPos;
                this.bounceLeftEvent();
                scrollEnabled = false
            }
            this.moveChildren(realOffsetX, 0)
        }
        return scrollEnabled
    }, checkCustomScrollDestination: function (touchOffsetX, touchOffsetY) {
        var scrollEnabled = true;
        switch (this.direction) {
            case ccui.ScrollView.DIR_VERTICAL:
                if (this._autoScrollDir.y > 0) {
                    var icBottomPos = this._innerContainer.getBottomInParent();
                    if (icBottomPos +
                        touchOffsetY >= this._autoScrollDestination.y) {
                        touchOffsetY = this._autoScrollDestination.y - icBottomPos;
                        scrollEnabled = false
                    }
                } else {
                    var icBottomPos = this._innerContainer.getBottomInParent();
                    if (icBottomPos + touchOffsetY <= this._autoScrollDestination.y) {
                        touchOffsetY = this._autoScrollDestination.y - icBottomPos;
                        scrollEnabled = false
                    }
                }
                break;
            case ccui.ScrollView.DIR_HORIZONTAL:
                if (this._autoScrollDir.x > 0) {
                    var icLeftPos = this._innerContainer.getLeftInParent();
                    if (icLeftPos + touchOffsetX >= this._autoScrollDestination.x) {
                        touchOffsetX =
                            this._autoScrollDestination.x - icLeftPos;
                        scrollEnabled = false
                    }
                } else {
                    var icLeftPos = this._innerContainer.getLeftInParent();
                    if (icLeftPos + touchOffsetX <= this._autoScrollDestination.x) {
                        touchOffsetX = this._autoScrollDestination.x - icLeftPos;
                        scrollEnabled = false
                    }
                }
                break;
            case ccui.ScrollView.DIR_BOTH:
                if (touchOffsetX > 0 && touchOffsetY > 0) {
                    var icLeftPos = this._innerContainer.getLeftInParent();
                    if (icLeftPos + touchOffsetX >= this._autoScrollDestination.x) {
                        touchOffsetX = this._autoScrollDestination.x - icLeftPos;
                        scrollEnabled = false
                    }
                    var icBottomPos =
                        this._innerContainer.getBottomInParent();
                    if (icBottomPos + touchOffsetY >= this._autoScrollDestination.y) {
                        touchOffsetY = this._autoScrollDestination.y - icBottomPos;
                        scrollEnabled = false
                    }
                } else if (touchOffsetX < 0 && touchOffsetY > 0) {
                    var icRightPos = this._innerContainer.getRightInParent();
                    if (icRightPos + touchOffsetX <= this._autoScrollDestination.x) {
                        touchOffsetX = this._autoScrollDestination.x - icRightPos;
                        scrollEnabled = false
                    }
                    var icBottomPos = this._innerContainer.getBottomInParent();
                    if (icBottomPos + touchOffsetY >= this._autoScrollDestination.y) {
                        touchOffsetY =
                            this._autoScrollDestination.y - icBottomPos;
                        scrollEnabled = false
                    }
                } else if (touchOffsetX < 0 && touchOffsetY < 0) {
                    var icRightPos = this._innerContainer.getRightInParent();
                    if (icRightPos + touchOffsetX <= this._autoScrollDestination.x) {
                        touchOffsetX = this._autoScrollDestination.x - icRightPos;
                        scrollEnabled = false
                    }
                    var icTopPos = this._innerContainer.getTopInParent();
                    if (icTopPos + touchOffsetY <= this._autoScrollDestination.y) {
                        touchOffsetY = this._autoScrollDestination.y - icTopPos;
                        scrollEnabled = false
                    }
                } else if (touchOffsetX > 0 && touchOffsetY <
                    0) {
                    var icLeftPos = this._innerContainer.getLeftInParent();
                    if (icLeftPos + touchOffsetX >= this._autoScrollDestination.x) {
                        touchOffsetX = this._autoScrollDestination.x - icLeftPos;
                        scrollEnabled = false
                    }
                    var icTopPos = this._innerContainer.getTopInParent();
                    if (icTopPos + touchOffsetY <= this._autoScrollDestination.y) {
                        touchOffsetY = this._autoScrollDestination.y - icTopPos;
                        scrollEnabled = false
                    }
                } else if (touchOffsetX == 0 && touchOffsetY > 0) {
                    var icBottomPos = this._innerContainer.getBottomInParent();
                    if (icBottomPos + touchOffsetY >= this._autoScrollDestination.y) {
                        touchOffsetY =
                            this._autoScrollDestination.y - icBottomPos;
                        scrollEnabled = false
                    }
                } else if (touchOffsetX < 0 && touchOffsetY == 0) {
                    var icRightPos = this._innerContainer.getRightInParent();
                    if (icRightPos + touchOffsetX <= this._autoScrollDestination.x) {
                        touchOffsetX = this._autoScrollDestination.x - icRightPos;
                        scrollEnabled = false
                    }
                } else if (touchOffsetX == 0 && touchOffsetY < 0) {
                    var icTopPos = this._innerContainer.getTopInParent();
                    if (icTopPos + touchOffsetY <= this._autoScrollDestination.y) {
                        touchOffsetY = this._autoScrollDestination.y - icTopPos;
                        scrollEnabled =
                            false
                    }
                } else if (touchOffsetX > 0 && touchOffsetY == 0) {
                    var icLeftPos = this._innerContainer.getLeftInParent();
                    if (icLeftPos + touchOffsetX >= this._autoScrollDestination.x) {
                        touchOffsetX = this._autoScrollDestination.x - icLeftPos;
                        scrollEnabled = false
                    }
                }
                break;
            default:
                break
        }
        return scrollEnabled
    }, getCurAutoScrollDistance: function (dt) {
        this._autoScrollOriginalSpeed -= this._autoScrollAcceleration * dt;
        return this._autoScrollOriginalSpeed * dt
    }, scrollChildren: function (touchOffsetX, touchOffsetY) {
        var scrollEnabled = true;
        this.scrollingEvent();
        switch (this.direction) {
            case ccui.ScrollView.DIR_VERTICAL:
                var realOffset = touchOffsetY;
                if (this.bounceEnabled) {
                    var icBottomPos = this._innerContainer.getBottomInParent();
                    if (icBottomPos + touchOffsetY >= this._bounceBottomBoundary) {
                        realOffset = this._bounceBottomBoundary - icBottomPos;
                        this.scrollToBottomEvent();
                        scrollEnabled = false
                    }
                    var icTopPos = this._innerContainer.getTopInParent();
                    if (icTopPos + touchOffsetY <= this._bounceTopBoundary) {
                        realOffset = this._bounceTopBoundary - icTopPos;
                        this.scrollToTopEvent();
                        scrollEnabled =
                            false
                    }
                } else {
                    var icBottomPos = this._innerContainer.getBottomInParent();
                    if (icBottomPos + touchOffsetY >= this._bottomBoundary) {
                        realOffset = this._bottomBoundary - icBottomPos;
                        this.scrollToBottomEvent();
                        scrollEnabled = false
                    }
                    var icTopPos = this._innerContainer.getTopInParent();
                    if (icTopPos + touchOffsetY <= this._topBoundary) {
                        realOffset = this._topBoundary - icTopPos;
                        this.scrollToTopEvent();
                        scrollEnabled = false
                    }
                }
                this.moveChildren(0, realOffset);
                break;
            case ccui.ScrollView.DIR_HORIZONTAL:
                var realOffset = touchOffsetX;
                if (this.bounceEnabled) {
                    var icRightPos =
                        this._innerContainer.getRightInParent();
                    if (icRightPos + touchOffsetX <= this._bounceRightBoundary) {
                        realOffset = this._bounceRightBoundary - icRightPos;
                        this.scrollToRightEvent();
                        scrollEnabled = false
                    }
                    var icLeftPos = this._innerContainer.getLeftInParent();
                    if (icLeftPos + touchOffsetX >= this._bounceLeftBoundary) {
                        realOffset = this._bounceLeftBoundary - icLeftPos;
                        this.scrollToLeftEvent();
                        scrollEnabled = false
                    }
                } else {
                    var icRightPos = this._innerContainer.getRightInParent();
                    if (icRightPos + touchOffsetX <= this._rightBoundary) {
                        realOffset =
                            this._rightBoundary - icRightPos;
                        this.scrollToRightEvent();
                        scrollEnabled = false
                    }
                    var icLeftPos = this._innerContainer.getLeftInParent();
                    if (icLeftPos + touchOffsetX >= this._leftBoundary) {
                        realOffset = this._leftBoundary - icLeftPos;
                        this.scrollToLeftEvent();
                        scrollEnabled = false
                    }
                }
                this.moveChildren(realOffset, 0);
                break;
            case ccui.ScrollView.DIR_BOTH:
                var realOffsetX = touchOffsetX;
                var realOffsetY = touchOffsetY;
                if (this.bounceEnabled)if (touchOffsetX > 0 && touchOffsetY > 0) {
                    var icLeftPos = this._innerContainer.getLeftInParent();
                    if (icLeftPos +
                        touchOffsetX >= this._bounceLeftBoundary) {
                        realOffsetX = this._bounceLeftBoundary - icLeftPos;
                        this.scrollToLeftEvent();
                        scrollEnabled = false
                    }
                    var icBottomPos = this._innerContainer.getBottomInParent();
                    if (icBottomPos + touchOffsetY >= this._bounceBottomBoundary) {
                        realOffsetY = this._bounceBottomBoundary - icBottomPos;
                        this.scrollToBottomEvent();
                        scrollEnabled = false
                    }
                } else if (touchOffsetX < 0 && touchOffsetY > 0) {
                    var icRightPos = this._innerContainer.getRightInParent();
                    if (icRightPos + touchOffsetX <= this._bounceRightBoundary) {
                        realOffsetX =
                            this._bounceRightBoundary - icRightPos;
                        this.scrollToRightEvent();
                        scrollEnabled = false
                    }
                    var icBottomPos = this._innerContainer.getBottomInParent();
                    if (icBottomPos + touchOffsetY >= this._bounceBottomBoundary) {
                        realOffsetY = this._bounceBottomBoundary - icBottomPos;
                        this.scrollToBottomEvent();
                        scrollEnabled = false
                    }
                } else if (touchOffsetX < 0 && touchOffsetY < 0) {
                    var icRightPos = this._innerContainer.getRightInParent();
                    if (icRightPos + touchOffsetX <= this._bounceRightBoundary) {
                        realOffsetX = this._bounceRightBoundary - icRightPos;
                        this.scrollToRightEvent();
                        scrollEnabled = false
                    }
                    var icTopPos = this._innerContainer.getTopInParent();
                    if (icTopPos + touchOffsetY <= this._bounceTopBoundary) {
                        realOffsetY = this._bounceTopBoundary - icTopPos;
                        this.scrollToTopEvent();
                        scrollEnabled = false
                    }
                } else if (touchOffsetX > 0 && touchOffsetY < 0) {
                    var icLeftPos = this._innerContainer.getLeftInParent();
                    if (icLeftPos + touchOffsetX >= this._bounceLeftBoundary) {
                        realOffsetX = this._bounceLeftBoundary - icLeftPos;
                        this.scrollToLeftEvent();
                        scrollEnabled = false
                    }
                    var icTopPos = this._innerContainer.getTopInParent();
                    if (icTopPos + touchOffsetY <= this._bounceTopBoundary) {
                        realOffsetY = this._bounceTopBoundary - icTopPos;
                        this.scrollToTopEvent();
                        scrollEnabled = false
                    }
                } else if (touchOffsetX == 0 && touchOffsetY > 0) {
                    var icBottomPos = this._innerContainer.getBottomInParent();
                    if (icBottomPos + touchOffsetY >= this._bounceBottomBoundary) {
                        realOffsetY = this._bounceBottomBoundary - icBottomPos;
                        this.scrollToBottomEvent();
                        scrollEnabled = false
                    }
                } else if (touchOffsetX < 0 && touchOffsetY == 0) {
                    var icRightPos = this._innerContainer.getRightInParent();
                    if (icRightPos +
                        touchOffsetX <= this._bounceRightBoundary) {
                        realOffsetX = this._bounceRightBoundary - icRightPos;
                        this.scrollToRightEvent();
                        scrollEnabled = false
                    }
                } else if (touchOffsetX == 0 && touchOffsetY < 0) {
                    var icTopPos = this._innerContainer.getTopInParent();
                    if (icTopPos + touchOffsetY <= this._bounceTopBoundary) {
                        realOffsetY = this._bounceTopBoundary - icTopPos;
                        this.scrollToTopEvent();
                        scrollEnabled = false
                    }
                } else {
                    if (touchOffsetX > 0 && touchOffsetY == 0) {
                        var icLeftPos = this._innerContainer.getLeftInParent();
                        if (icLeftPos + touchOffsetX >= this._bounceLeftBoundary) {
                            realOffsetX =
                                this._bounceLeftBoundary - icLeftPos;
                            this.scrollToLeftEvent();
                            scrollEnabled = false
                        }
                    }
                } else if (touchOffsetX > 0 && touchOffsetY > 0) {
                    var icLeftPos = this._innerContainer.getLeftInParent();
                    if (icLeftPos + touchOffsetX >= this._leftBoundary) {
                        realOffsetX = this._leftBoundary - icLeftPos;
                        this.scrollToLeftEvent();
                        scrollEnabled = false
                    }
                    var icBottomPos = this._innerContainer.getBottomInParent();
                    if (icBottomPos + touchOffsetY >= this._bottomBoundary) {
                        realOffsetY = this._bottomBoundary - icBottomPos;
                        this.scrollToBottomEvent();
                        scrollEnabled =
                            false
                    }
                } else if (touchOffsetX < 0 && touchOffsetY > 0) {
                    var icRightPos = this._innerContainer.getRightInParent();
                    if (icRightPos + touchOffsetX <= this._rightBoundary) {
                        realOffsetX = this._rightBoundary - icRightPos;
                        this.scrollToRightEvent();
                        scrollEnabled = false
                    }
                    var icBottomPos = this._innerContainer.getBottomInParent();
                    if (icBottomPos + touchOffsetY >= this._bottomBoundary) {
                        realOffsetY = this._bottomBoundary - icBottomPos;
                        this.scrollToBottomEvent();
                        scrollEnabled = false
                    }
                } else if (touchOffsetX < 0 && touchOffsetY < 0) {
                    var icRightPos = this._innerContainer.getRightInParent();
                    if (icRightPos + touchOffsetX <= this._rightBoundary) {
                        realOffsetX = this._rightBoundary - icRightPos;
                        this.scrollToRightEvent();
                        scrollEnabled = false
                    }
                    var icTopPos = this._innerContainer.getTopInParent();
                    if (icTopPos + touchOffsetY <= this._topBoundary) {
                        realOffsetY = this._topBoundary - icTopPos;
                        this.scrollToTopEvent();
                        scrollEnabled = false
                    }
                } else if (touchOffsetX > 0 && touchOffsetY < 0) {
                    var icLeftPos = this._innerContainer.getLeftInParent();
                    if (icLeftPos + touchOffsetX >= this._leftBoundary) {
                        realOffsetX = this._leftBoundary - icLeftPos;
                        this.scrollToLeftEvent();
                        scrollEnabled = false
                    }
                    var icTopPos = this._innerContainer.getTopInParent();
                    if (icTopPos + touchOffsetY <= this._topBoundary) {
                        realOffsetY = this._topBoundary - icTopPos;
                        this.scrollToTopEvent();
                        scrollEnabled = false
                    }
                } else if (touchOffsetX == 0 && touchOffsetY > 0) {
                    var icBottomPos = this._innerContainer.getBottomInParent();
                    if (icBottomPos + touchOffsetY >= this._bottomBoundary) {
                        realOffsetY = this._bottomBoundary - icBottomPos;
                        this.scrollToBottomEvent();
                        scrollEnabled = false
                    }
                } else if (touchOffsetX < 0 && touchOffsetY == 0) {
                    var icRightPos = this._innerContainer.getRightInParent();
                    if (icRightPos + touchOffsetX <= this._rightBoundary) {
                        realOffsetX = this._rightBoundary - icRightPos;
                        this.scrollToRightEvent();
                        scrollEnabled = false
                    }
                } else if (touchOffsetX == 0 && touchOffsetY < 0) {
                    var icTopPos = this._innerContainer.getTopInParent();
                    if (icTopPos + touchOffsetY <= this._topBoundary) {
                        realOffsetY = this._topBoundary - icTopPos;
                        this.scrollToTopEvent();
                        scrollEnabled = false
                    }
                } else if (touchOffsetX > 0 && touchOffsetY == 0) {
                    var icLeftPos = this._innerContainer.getLeftInParent();
                    if (icLeftPos + touchOffsetX >= this._leftBoundary) {
                        realOffsetX =
                            this._leftBoundary - icLeftPos;
                        this.scrollToLeftEvent();
                        scrollEnabled = false
                    }
                }
                this.moveChildren(realOffsetX, realOffsetY);
                break;
            default:
                break
        }
        return scrollEnabled
    }, scrollToBottom: function (time, attenuated) {
        this.startAutoScrollChildrenWithDestination(cc.p(this._innerContainer.getPositionX(), 0), time, attenuated)
    }, scrollToTop: function (time, attenuated) {
        this.startAutoScrollChildrenWithDestination(cc.p(this._innerContainer.getPositionX(), this._size.height - this._innerContainer.getSize().height), time, attenuated)
    },
    scrollToLeft: function (time, attenuated) {
        this.startAutoScrollChildrenWithDestination(cc.p(0, this._innerContainer.getPositionY()), time, attenuated)
    }, scrollToRight: function (time, attenuated) {
        this.startAutoScrollChildrenWithDestination(cc.p(this._size.width - this._innerContainer.getSize().width, this._innerContainer.getPositionY()), time, attenuated)
    }, scrollToTopLeft: function (time, attenuated) {
        if (this.direction != ccui.ScrollView.DIR_BOTH) {
            cc.log("Scroll diretion is not both!");
            return
        }
        this.startAutoScrollChildrenWithDestination(cc.p(0,
                this._size.height - this._innerContainer.getSize().height), time, attenuated)
    }, scrollToTopRight: function (time, attenuated) {
        if (this.direction != ccui.ScrollView.DIR_BOTH) {
            cc.log("Scroll diretion is not both!");
            return
        }
        this.startAutoScrollChildrenWithDestination(cc.p(this._size.width - this._innerContainer.getSize().width, this._size.height - this._innerContainer.getSize().height), time, attenuated)
    }, scrollToBottomLeft: function (time, attenuated) {
        if (this.direction != ccui.ScrollView.DIR_BOTH) {
            cc.log("Scroll diretion is not both!");
            return
        }
        this.startAutoScrollChildrenWithDestination(cc.p(0, 0), time, attenuated)
    }, scrollToBottomRight: function (time, attenuated) {
        if (this.direction != ccui.ScrollView.DIR_BOTH) {
            cc.log("Scroll diretion is not both!");
            return
        }
        this.startAutoScrollChildrenWithDestination(cc.p(this._size.width - this._innerContainer.getSize().width, 0), time, attenuated)
    }, scrollToPercentVertical: function (percent, time, attenuated) {
        var minY = this._size.height - this._innerContainer.getSize().height;
        var h = -minY;
        this.startAutoScrollChildrenWithDestination(cc.p(this._innerContainer.getPositionX(),
                minY + percent * h / 100), time, attenuated)
    }, scrollToPercentHorizontal: function (percent, time, attenuated) {
        var w = this._innerContainer.getSize().width - this._size.width;
        this.startAutoScrollChildrenWithDestination(cc.p(-(percent * w / 100), this._innerContainer.getPositionY()), time, attenuated)
    }, scrollToPercentBothDirection: function (percent, time, attenuated) {
        if (this.direction != ccui.ScrollView.DIR_BOTH)return;
        var minY = this._size.height - this._innerContainer.getSize().height;
        var h = -minY;
        var w = this._innerContainer.getSize().width -
            this._size.width;
        this.startAutoScrollChildrenWithDestination(cc.p(-(percent.x * w / 100), minY + percent.y * h / 100), time, attenuated)
    }, jumpToBottom: function () {
        this.jumpToDestination(this._innerContainer.getPositionX(), 0)
    }, jumpToTop: function () {
        this.jumpToDestination(this._innerContainer.getPositionX(), this._size.height - this._innerContainer.getSize().height)
    }, jumpToLeft: function () {
        this.jumpToDestination(0, this._innerContainer.getPositionY())
    }, jumpToRight: function () {
        this.jumpToDestination(this._size.width - this._innerContainer.getSize().width,
            this._innerContainer.getPositionY())
    }, jumpToTopLeft: function () {
        if (this.direction != ccui.ScrollView.DIR_BOTH) {
            cc.log("Scroll diretion is not both!");
            return
        }
        this.jumpToDestination(0, this._size.height - this._innerContainer.getSize().height)
    }, jumpToTopRight: function () {
        if (this.direction != ccui.ScrollView.DIR_BOTH) {
            cc.log("Scroll diretion is not both!");
            return
        }
        this.jumpToDestination(this._size.width - this._innerContainer.getSize().width, this._size.height - this._innerContainer.getSize().height)
    }, jumpToBottomLeft: function () {
        if (this.direction !=
            ccui.ScrollView.DIR_BOTH) {
            cc.log("Scroll diretion is not both!");
            return
        }
        this.jumpToDestination(0, 0)
    }, jumpToBottomRight: function () {
        if (this.direction != ccui.ScrollView.DIR_BOTH) {
            cc.log("Scroll diretion is not both!");
            return
        }
        this.jumpToDestination(this._size.width - this._innerContainer.getSize().width, 0)
    }, jumpToPercentVertical: function (percent) {
        var minY = this._size.height - this._innerContainer.getSize().height;
        var h = -minY;
        this.jumpToDestination(this._innerContainer.getPositionX(), minY + percent * h / 100)
    }, jumpToPercentHorizontal: function (percent) {
        var w =
            this._innerContainer.getSize().width - this._size.width;
        this.jumpToDestination(-(percent * w / 100), this._innerContainer.getPositionY())
    }, jumpToPercentBothDirection: function (percent) {
        if (this.direction != ccui.ScrollView.DIR_BOTH)return;
        var minY = this._size.height - this._innerContainer.getSize().height;
        var h = -minY;
        var w = this._innerContainer.getSize().width - this._size.width;
        this.jumpToDestination(-(percent.x * w / 100), minY + percent.y * h / 100)
    }, startRecordSlidAction: function () {
        if (this._autoScroll)this.stopAutoScrollChildren();
        if (this._bouncing)this.stopBounceChildren();
        this._slidTime = 0
    }, endRecordSlidAction: function () {
        if (!this.checkNeedBounce() && this.inertiaScrollEnabled) {
            if (this._slidTime <= 0.016)return;
            var totalDis = 0;
            var dir;
            switch (this.direction) {
                case ccui.ScrollView.DIR_VERTICAL:
                    totalDis = this._touchEndedPoint.y - this._touchBeganPoint.y;
                    if (totalDis < 0)dir = ccui.ScrollView.SCROLLDIR_DOWN; else dir = ccui.ScrollView.SCROLLDIR_UP;
                    break;
                case ccui.ScrollView.DIR_HORIZONTAL:
                    totalDis = this._touchEndedPoint.x - this._touchBeganPoint.x;
                    if (totalDis < 0)dir = ccui.ScrollView.SCROLLDIR_LEFT; else dir = ccui.ScrollView.SCROLLDIR_RIGHT;
                    break;
                case ccui.ScrollView.DIR_BOTH:
                    var subVector = cc.pSub(this._touchEndedPoint, this._touchBeganPoint);
                    totalDis = cc.pLength(subVector);
                    dir = cc.pNormalize(subVector);
                    break;
                default:
                    break
            }
            var orSpeed = Math.min(Math.abs(totalDis) / this._slidTime, ccui.ScrollView.AUTO_SCROLL_MAX_SPEED);
            this.startAutoScrollChildrenWithOriginalSpeed(dir, orSpeed, true, -1E3);
            this._slidTime = 0
        }
    }, handlePressLogic: function (touchPoint) {
        this._touchBeganPoint =
            this.convertToNodeSpace(touchPoint);
        this._touchMovingPoint = this._touchBeganPoint;
        this.startRecordSlidAction();
        this._bePressed = true
    }, handleMoveLogic: function (touchPoint) {
        this._touchMovedPoint = this.convertToNodeSpace(touchPoint);
        var delta = cc.pSub(this._touchMovedPoint, this._touchMovingPoint);
        this._touchMovingPoint = this._touchMovedPoint;
        switch (this.direction) {
            case ccui.ScrollView.DIR_VERTICAL:
                this.scrollChildren(0, delta.y);
                break;
            case ccui.ScrollView.DIR_HORIZONTAL:
                this.scrollChildren(delta.x, 0);
                break;
            case ccui.ScrollView.DIR_BOTH:
                this.scrollChildren(delta.x, delta.y);
                break;
            default:
                break
        }
    }, handleReleaseLogic: function (touchPoint) {
        this._touchEndedPoint = this.convertToNodeSpace(touchPoint);
        this.endRecordSlidAction();
        this._bePressed = false
    }, onTouchBegan: function (touch, event) {
        var pass = ccui.Layout.prototype.onTouchBegan.call(this, touch, event);
        if (this._hitted)this.handlePressLogic(this._touchStartPos);
        return pass
    }, onTouchMoved: function (touch, event) {
        ccui.Layout.prototype.onTouchMoved.call(this, touch, event);
        this.handleMoveLogic(this._touchMovePos)
    }, onTouchEnded: function (touch, event) {
        ccui.Layout.prototype.onTouchEnded.call(this, touch, event);
        this.handleReleaseLogic(this._touchEndPos)
    }, onTouchCancelled: function (touch, event) {
        ccui.Layout.prototype.onTouchCancelled.call(this, touch, event)
    }, onTouchLongClicked: function (touchPoint) {
    }, update: function (dt) {
        if (this._autoScroll)this.autoScrollChildren(dt);
        if (this._bouncing)this.bounceChildren(dt);
        this.recordSlidTime(dt)
    }, recordSlidTime: function (dt) {
        if (this._bePressed)this._slidTime +=
            dt
    }, interceptTouchEvent: function (handleState, sender, touchPoint) {
        switch (handleState) {
            case 0:
                this.handlePressLogic(touchPoint);
                break;
            case 1:
                var offset = cc.pSub(sender.getTouchStartPos(), touchPoint);
                if (cc.pLength(offset) > this._childFocusCancelOffset) {
                    sender.setFocused(false);
                    this.handleMoveLogic(touchPoint)
                }
                break;
            case 2:
                this.handleReleaseLogic(touchPoint);
                break;
            case 3:
                this.handleReleaseLogic(touchPoint);
                break
        }
    }, checkChildInfo: function (handleState, sender, touchPoint) {
        if (this._enabled && this._touchEnabled)this.interceptTouchEvent(handleState,
            sender, touchPoint)
    }, scrollToTopEvent: function () {
        if (this._scrollViewEventListener && this._scrollViewEventSelector)this._scrollViewEventSelector.call(this._scrollViewEventListener, this, ccui.ScrollView.EVENT_SCROLL_TO_TOP)
    }, scrollToBottomEvent: function () {
        if (this._scrollViewEventListener && this._scrollViewEventSelector)this._scrollViewEventSelector.call(this._scrollViewEventListener, this, ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM)
    }, scrollToLeftEvent: function () {
        if (this._scrollViewEventListener && this._scrollViewEventSelector)this._scrollViewEventSelector.call(this._scrollViewEventListener,
            this, ccui.ScrollView.EVENT_SCROLL_TO_LEFT)
    }, scrollToRightEvent: function () {
        if (this._scrollViewEventListener && this._scrollViewEventSelector)this._scrollViewEventSelector.call(this._scrollViewEventListener, this, ccui.ScrollView.EVENT_SCROLL_TO_RIGHT)
    }, scrollingEvent: function () {
        if (this._scrollViewEventListener && this._scrollViewEventSelector)this._scrollViewEventSelector.call(this._scrollViewEventListener, this, ccui.ScrollView.EVENT_SCROLLING)
    }, bounceTopEvent: function () {
        if (this._scrollViewEventListener &&
            this._scrollViewEventSelector)this._scrollViewEventSelector.call(this._scrollViewEventListener, this, ccui.ScrollView.EVENT_BOUNCE_TOP)
    }, bounceBottomEvent: function () {
        if (this._scrollViewEventListener && this._scrollViewEventSelector)this._scrollViewEventSelector.call(this._scrollViewEventListener, this, ccui.ScrollView.EVENT_BOUNCE_BOTTOM)
    }, bounceLeftEvent: function () {
        if (this._scrollViewEventListener && this._scrollViewEventSelector)this._scrollViewEventSelector.call(this._scrollViewEventListener, this, ccui.ScrollView.EVENT_BOUNCE_LEFT)
    },
    bounceRightEvent: function () {
        if (this._scrollViewEventListener && this._scrollViewEventSelector)this._scrollViewEventSelector.call(this._scrollViewEventListener, this, ccui.ScrollView.EVENT_BOUNCE_RIGHT)
    }, addEventListenerScrollView: function (selector, target) {
        this._scrollViewEventSelector = selector;
        this._scrollViewEventListener = target
    }, setDirection: function (dir) {
        this.direction = dir
    }, getDirection: function () {
        return this.direction
    }, setBounceEnabled: function (enabled) {
        this.bounceEnabled = enabled
    }, isBounceEnabled: function () {
        return this.bounceEnabled
    },
    setInertiaScrollEnabled: function (enabled) {
        this.inertiaScrollEnabled = enabled
    }, isInertiaScrollEnabled: function () {
        return this.inertiaScrollEnabled
    }, getInnerContainer: function () {
        return this._innerContainer
    }, setLayoutType: function (type) {
        this._innerContainer.setLayoutType(type)
    }, getLayoutType: function () {
        return this._innerContainer.getLayoutType()
    }, _doLayout: function () {
        if (!this._doLayoutDirty)return;
        this._doLayoutDirty = false
    }, getDescription: function () {
        return"ScrollView"
    }, copyClonedWidgetChildren: function (model) {
        ccui.Layout.prototype.copyClonedWidgetChildren.call(this,
            model)
    }, copySpecialProperties: function (scrollView) {
        ccui.Layout.prototype.copySpecialProperties.call(this, scrollView);
        this.setInnerContainerSize(scrollView.getInnerContainerSize());
        this.setDirection(scrollView.direction);
        this.setBounceEnabled(scrollView.bounceEnabled);
        this.setInertiaScrollEnabled(scrollView.inertiaScrollEnabled)
    }});
var _p = ccui.ScrollView.prototype;
_p.innerWidth;
cc.defineGetterSetter(_p, "innerWidth", _p._getInnerWidth, _p._setInnerWidth);
_p.innerHeight;
cc.defineGetterSetter(_p, "innerHeight", _p._getInnerHeight, _p._setInnerHeight);
_p = null;
ccui.ScrollView.create = function () {
    var uiScrollView = new ccui.ScrollView;
    if (uiScrollView && uiScrollView.init())return uiScrollView;
    return null
};
ccui.ScrollView.DIR_NONE = 0;
ccui.ScrollView.DIR_VERTICAL = 1;
ccui.ScrollView.DIR_HORIZONTAL = 2;
ccui.ScrollView.DIR_BOTH = 3;
ccui.ScrollView.EVENT_SCROLL_TO_TOP = 0;
ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM = 1;
ccui.ScrollView.EVENT_SCROLL_TO_LEFT = 2;
ccui.ScrollView.EVENT_SCROLL_TO_RIGHT = 3;
ccui.ScrollView.EVENT_SCROLLING = 4;
ccui.ScrollView.EVENT_BOUNCE_TOP = 5;
ccui.ScrollView.EVENT_BOUNCE_BOTTOM = 6;
ccui.ScrollView.EVENT_BOUNCE_LEFT = 7;
ccui.ScrollView.EVENT_BOUNCE_RIGHT = 8;
ccui.ScrollView.AUTO_SCROLL_MAX_SPEED = 1E3;
ccui.ScrollView.SCROLLDIR_UP = cc.p(0, 1);
ccui.ScrollView.SCROLLDIR_DOWN = cc.p(0, -1);
ccui.ScrollView.SCROLLDIR_LEFT = cc.p(-1, 0);
ccui.ScrollView.SCROLLDIR_RIGHT = cc.p(1, 0);
ccui.ListView = ccui.ScrollView.extend({_model: null, _items: null, _gravity: null, _itemsMargin: 0, _listViewEventListener: null, _listViewEventSelector: null, _curSelectedIndex: 0, _refreshViewDirty: true, _className: "ListView", ctor: function () {
    ccui.ScrollView.prototype.ctor.call(this);
    this._model = null;
    this._items = [];
    this._gravity = ccui.ListView.GRAVITY_CENTER_HORIZONTAL;
    this._itemsMargin = 0;
    this._listViewEventListener = null;
    this._listViewEventSelector = null;
    this._curSelectedIndex = 0;
    this._refreshViewDirty = true
}, init: function () {
    if (ccui.ScrollView.prototype.init.call(this)) {
        this._items =
            [];
        this.setLayoutType(ccui.Layout.LINEAR_VERTICAL);
        return true
    }
    return false
}, setItemModel: function (model) {
    if (!model)return;
    this._model = model
}, updateInnerContainerSize: function () {
    switch (this.direction) {
        case ccui.ScrollView.DIR_VERTICAL:
            var length = this._items.length;
            var totalHeight = (length - 1) * this._itemsMargin;
            for (var i = 0; i < length; i++) {
                var item = this._items[i];
                totalHeight += item.getSize().height
            }
            var finalWidth = this._size.width;
            var finalHeight = totalHeight;
            this.setInnerContainerSize(cc.size(finalWidth,
                finalHeight));
            break;
        case ccui.ScrollView.DIR_HORIZONTAL:
            var length = this._items.length;
            var totalWidth = (length - 1) * this._itemsMargin;
            for (var i = 0; i < length; i++) {
                var item = this._items[i];
                totalWidth += item.getSize().width
            }
            var finalWidth = totalWidth;
            var finalHeight = this._size.height;
            this.setInnerContainerSize(cc.size(finalWidth, finalHeight));
            break;
        default:
            break
    }
}, remedyLayoutParameter: function (item) {
    if (!item)return;
    switch (this.direction) {
        case ccui.ScrollView.DIR_VERTICAL:
            var llp = item.getLayoutParameter(ccui.LayoutParameter.LINEAR);
            if (!llp) {
                var defaultLp = ccui.LinearLayoutParameter.create();
                switch (this._gravity) {
                    case ccui.ListView.GRAVITY_LEFT:
                        defaultLp.setGravity(ccui.LINEAR_GRAVITY_LEFT);
                        break;
                    case ccui.ListView.GRAVITY_RIGHT:
                        defaultLp.setGravity(ccui.LINEAR_GRAVITY_RIGHT);
                        break;
                    case ccui.ListView.GRAVITY_CENTER_HORIZONTAL:
                        defaultLp.setGravity(ccui.LINEAR_GRAVITY_CENTER_HORIZONTAL);
                        break;
                    default:
                        break
                }
                if (this.getIndex(item) == 0)defaultLp.setMargin(ccui.MarginZero()); else defaultLp.setMargin(new ccui.Margin(0, this._itemsMargin,
                    0, 0));
                item.setLayoutParameter(defaultLp)
            } else {
                if (this.getIndex(item) == 0)llp.setMargin(ccui.MarginZero()); else llp.setMargin(new ccui.Margin(0, this._itemsMargin, 0, 0));
                switch (this._gravity) {
                    case ccui.ListView.GRAVITY_LEFT:
                        llp.setGravity(ccui.LINEAR_GRAVITY_LEFT);
                        break;
                    case ccui.ListView.GRAVITY_RIGHT:
                        llp.setGravity(ccui.LINEAR_GRAVITY_RIGHT);
                        break;
                    case ccui.ListView.GRAVITY_CENTER_HORIZONTAL:
                        llp.setGravity(ccui.LINEAR_GRAVITY_CENTER_HORIZONTAL);
                        break;
                    default:
                        break
                }
            }
            break;
        case ccui.ScrollView.DIR_HORIZONTAL:
            var llp =
                item.getLayoutParameter(ccui.LayoutParameter.LINEAR);
            if (!llp) {
                var defaultLp = ccui.LinearLayoutParameter.create();
                switch (this._gravity) {
                    case ccui.ListView.GRAVITY_TOP:
                        defaultLp.setGravity(ccui.LINEAR_GRAVITY_TOP);
                        break;
                    case ccui.ListView.GRAVITY_BOTTOM:
                        defaultLp.setGravity(ccui.LINEAR_GRAVITY_BOTTOM);
                        break;
                    case ccui.ListView.GRAVITY_CENTER_VERTICAL:
                        defaultLp.setGravity(ccui.LINEAR_GRAVITY_CENTER_VERTICAL);
                        break;
                    default:
                        break
                }
                if (this.getIndex(item) == 0)defaultLp.setMargin(ccui.MarginZero()); else defaultLp.setMargin(new ccui.Margin(this._itemsMargin,
                    0, 0, 0));
                item.setLayoutParameter(defaultLp)
            } else {
                if (this.getIndex(item) == 0)llp.setMargin(ccui.MarginZero()); else llp.setMargin(new ccui.Margin(this._itemsMargin, 0, 0, 0));
                switch (this._gravity) {
                    case ccui.ListView.GRAVITY_TOP:
                        llp.setGravity(ccui.LINEAR_GRAVITY_TOP);
                        break;
                    case ccui.ListView.GRAVITY_BOTTOM:
                        llp.setGravity(ccui.LINEAR_GRAVITY_BOTTOM);
                        break;
                    case ccui.ListView.GRAVITY_CENTER_VERTICAL:
                        llp.setGravity(ccui.LINEAR_GRAVITY_CENTER_VERTICAL);
                        break;
                    default:
                        break
                }
            }
            break;
        default:
            break
    }
}, pushBackDefaultItem: function () {
    if (!this._model)return;
    var newItem = this._model.clone();
    this._items.push(newItem);
    this.remedyLayoutParameter(newItem);
    this.addChild(newItem);
    this._refreshViewDirty = true
}, insertDefaultItem: function (index) {
    if (!this._model)return;
    var newItem = this._model.clone();
    this._items.splice(index, 0, newItem);
    this.remedyLayoutParameter(newItem);
    this.addChild(newItem);
    this._refreshViewDirty = true
}, pushBackCustomItem: function (item) {
    this._items.push(item);
    this.remedyLayoutParameter(item);
    this.addChild(item);
    this._refreshViewDirty = true
}, insertCustomItem: function (item, index) {
    this._items.splice(index, 0, item);
    this.remedyLayoutParameter(item);
    this.addChild(item);
    this._refreshViewDirty = true
}, removeItem: function (index) {
    var item = this.getItem(index);
    if (!item)return;
    cc.arrayRemoveObject(this._items, item);
    this.removeChild(item);
    this._refreshViewDirty = true
}, removeLastItem: function () {
    this.removeItem(this._items.length - 1)
}, getItem: function (index) {
    if (index < 0 || index >= this._items.length)return null;
    return this._items[index]
}, getItems: function () {
    return this._items
}, getIndex: function (item) {
    return this._items.indexOf(item)
},
    setGravity: function (gravity) {
        if (this._gravity == gravity)return;
        this._gravity = gravity;
        this._refreshViewDirty = true
    }, setItemsMargin: function (margin) {
        if (this._itemsMargin == margin)return;
        this._itemsMargin = margin;
        this._refreshViewDirty = true
    }, getItemsMargin: function () {
        return this._itemsMargin
    }, setDirection: function (dir) {
        switch (dir) {
            case ccui.ScrollView.DIR_VERTICAL:
                this.setLayoutType(ccui.Layout.LINEAR_VERTICAL);
                break;
            case ccui.ScrollView.DIR_HORIZONTAL:
                this.setLayoutType(ccui.Layout.LINEAR_HORIZONTAL);
                break;
            case ccui.ScrollView.DIR_BOTH:
                return;
            default:
                return;
                break
        }
        ccui.ScrollView.prototype.setDirection.call(this, dir)
    }, addEventListenerListView: function (selector, target) {
        this._listViewEventListener = target;
        this._listViewEventSelector = selector
    }, selectedItemEvent: function () {
        if (this._listViewEventSelector && this._listViewEventListener)this._listViewEventSelector.call(this._listViewEventListener, this, ccui.ListView.EVENT_SELECTED_ITEM)
    }, interceptTouchEvent: function (handleState, sender, touchPoint) {
        ccui.ScrollView.prototype.interceptTouchEvent.call(this,
            handleState, sender, touchPoint);
        if (handleState != 1) {
            var parent = sender;
            while (parent) {
                if (parent && parent.getParent() == this._innerContainer) {
                    this._curSelectedIndex = this.getIndex(parent);
                    break
                }
                parent = parent.getParent()
            }
            this.selectedItemEvent()
        }
    }, getCurSelectedIndex: function () {
        return this._curSelectedIndex
    }, requestRefreshView: function () {
        this._refreshViewDirty = true
    }, refreshView: function () {
        for (var i = 0; i < this._items.length; i++) {
            var item = this._items[i];
            item.setLocalZOrder(i);
            this.remedyLayoutParameter(item)
        }
        this.updateInnerContainerSize()
    },
    sortAllChildren: function () {
        ccui.ScrollView.prototype.sortAllChildren.call(this);
        if (this._refreshViewDirty) {
            this.refreshView();
            this._refreshViewDirty = false
        }
    }, onSizeChanged: function () {
        ccui.ScrollView.prototype.onSizeChanged.call(this);
        this._refreshViewDirty = true
    }, getDescription: function () {
        return"ListView"
    }, createCloneInstance: function () {
        return ccui.ListView.create()
    }, copyClonedWidgetChildren: function (model) {
        var arrayItems = model.getItems();
        for (var i = 0; i < arrayItems.length; i++) {
            var item = arrayItems[i];
            this.pushBackCustomItem(item.clone())
        }
    }, copySpecialProperties: function (listView) {
        ccui.ScrollView.prototype.copySpecialProperties.call(this, listView);
        this.setItemModel(listView._model);
        this.setItemsMargin(listView._itemsMargin);
        this.setGravity(listView._gravity)
    }});
ccui.ListView.create = function () {
    var uiListView = new ccui.ListView;
    if (uiListView && uiListView.init())return uiListView;
    return null
};
ccui.ListView.EVENT_SELECTED_ITEM = 0;
ccui.ListView.GRAVITY_LEFT = 0;
ccui.ListView.GRAVITY_RIGHT = 1;
ccui.ListView.GRAVITY_CENTER_HORIZONTAL = 2;
ccui.ListView.GRAVITY_TOP = 3;
ccui.ListView.GRAVITY_BOTTOM = 4;
ccui.ListView.GRAVITY_CENTER_VERTICAL = 5;
ccui.PageView = ccui.Layout.extend({_curPageIdx: 0, _pages: null, _touchMoveDir: null, _touchStartLocation: 0, _touchMoveStartLocation: 0, _movePagePoint: null, _leftChild: null, _rightChild: null, _leftBoundary: 0, _rightBoundary: 0, _isAutoScrolling: false, _autoScrollDistance: 0, _autoScrollSpeed: 0, _autoScrollDir: 0, _childFocusCancelOffset: 0, _pageViewEventListener: null, _pageViewEventSelector: null, _className: "PageView", ctor: function () {
    ccui.Layout.prototype.ctor.call(this);
    this._curPageIdx = 0;
    this._pages = [];
    this._touchMoveDir =
        ccui.PageView.TOUCH_DIR_LEFT;
    this._touchStartLocation = 0;
    this._touchMoveStartLocation = 0;
    this._movePagePoint = null;
    this._leftChild = null;
    this._rightChild = null;
    this._leftBoundary = 0;
    this._rightBoundary = 0;
    this._isAutoScrolling = false;
    this._autoScrollDistance = 0;
    this._autoScrollSpeed = 0;
    this._autoScrollDir = 0;
    this._childFocusCancelOffset = 5;
    this._pageViewEventListener = null;
    this._pageViewEventSelector = null
}, init: function () {
    if (ccui.Layout.prototype.init.call(this)) {
        this._pages = [];
        this.setClippingEnabled(true);
        this.setTouchEnabled(true);
        return true
    }
    return false
}, onEnter: function () {
    ccui.Layout.prototype.onEnter.call(this);
    this.setUpdateEnabled(true)
}, addWidgetToPage: function (widget, pageIdx, forceCreate) {
    if (!widget)return;
    if (pageIdx < 0)return;
    var pageCount = this._pages.length;
    if (pageIdx >= pageCount) {
        if (forceCreate) {
            if (pageIdx > pageCount)cc.log("pageIdx is %d, it will be added as page id [%d]", pageIdx, pageCount);
            var newPage = this.createPage();
            newPage.addChild(widget);
            this.addPage(newPage)
        }
    } else {
        var page = this._pages[pageIdx];
        if (page)page.addChild(widget)
    }
},
    createPage: function () {
        var newPage = ccui.Layout.create();
        newPage.setSize(this.getSize());
        return newPage
    }, addPage: function (page) {
        if (!page)return;
        if (page.getWidgetType() != ccui.Widget.TYPE_CONTAINER)return;
        if (this._pages.indexOf(page) != -1)return;
        var pSize = page.getSize();
        var pvSize = this.getSize();
        if (!(pSize.width == pvSize.width && pSize.height == pvSize.height)) {
            cc.log("page size does not match pageview size, it will be force sized!");
            page.setSize(pvSize)
        }
        page.setPosition(this.getPositionXByIndex(this._pages.length),
            0);
        this._pages.push(page);
        this.addChild(page);
        this.updateBoundaryPages()
    }, insertPage: function (page, idx) {
        if (idx < 0)return;
        if (!page)return;
        if (page.getWidgetType() != ccui.Widget.TYPE_CONTAINER)return;
        if (this._pages.indexOf(page) != -1)return;
        var pageCount = this._pages.length;
        if (idx >= pageCount)this.addPage(page); else {
            this._pages.splice(idx, 0, page);
            page.setPosition(this.getPositionXByIndex(idx), 0);
            this.addChild(page);
            var pSize = page.getSize();
            var pvSize = this.getSize();
            if (!pSize.equals(pvSize)) {
                cc.log("page size does not match pageview size, it will be force sized!");
                page.setSize(pvSize)
            }
            var arrayPages = this._pages;
            var length = arrayPages.length;
            for (var i = idx + 1; i < length; i++) {
                var behindPage = arrayPages[i];
                var formerPos = behindPage.getPosition();
                behindPage.setPosition(formerPos.x + this.getSize().width, 0)
            }
            this.updateBoundaryPages()
        }
    }, removePage: function (page) {
        if (!page)return;
        this.removeChild(page);
        this.updateChildrenPosition();
        this.updateBoundaryPages()
    }, removePageAtIndex: function (index) {
        if (index < 0 || index >= this._pages.length)return;
        var page = this._pages[index];
        if (page)this.removePage(page)
    },
    updateBoundaryPages: function () {
        if (this._pages.length <= 0) {
            this._leftChild = null;
            this._rightChild = null;
            return
        }
        this._leftChild = this._pages[0];
        this._rightChild = this._pages[this._pages.length - 1]
    }, getPositionXByIndex: function (idx) {
        return this.getSize().width * (idx - this._curPageIdx)
    }, addChild: function (widget, zOrder, tag) {
        return ccui.Layout.prototype.addChild.call(this, widget, zOrder, tag)
    }, removeChild: function (child, cleanup) {
        if (cleanup)cc.arrayRemoveObject(this._pages, child);
        ccui.Layout.prototype.removeChild.call(this,
            child, cleanup)
    }, onSizeChanged: function () {
        ccui.Layout.prototype.onSizeChanged.call(this);
        this._rightBoundary = this.getSize().width;
        this.updateChildrenSize();
        this.updateChildrenPosition()
    }, updateChildrenSize: function () {
        if (!this._pages.length <= 0)return;
        var selfSize = this.getSize();
        for (var i = 0; i < this._pages.length; i++) {
            var page = this._pages[i];
            page.setSize(selfSize)
        }
    }, updateChildrenPosition: function () {
        if (!this._pages)return;
        var pageCount = this._pages.length;
        if (pageCount <= 0) {
            this._curPageIdx = 0;
            return
        }
        if (this._curPageIdx >=
            pageCount)this._curPageIdx = pageCount - 1;
        var pageWidth = this.getSize().width;
        var arrayPages = this._pages;
        for (var i = 0; i < pageCount; i++) {
            var page = arrayPages[i];
            page.setPosition((i - this._curPageIdx) * pageWidth, 0)
        }
    }, removeAllChildren: function (cleanup) {
        if (cleanup)this._pages.length = 0;
        ccui.Layout.prototype.removeAllChildren.call(this, cleanup)
    }, scrollToPage: function (idx) {
        if (idx < 0 || idx >= this._pages.length)return;
        this._curPageIdx = idx;
        var curPage = this._pages[idx];
        this._autoScrollDistance = -curPage.getPositionX();
        this._autoScrollSpeed = Math.abs(this._autoScrollDistance) / 0.2;
        this._autoScrollDir = this._autoScrollDistance > 0 ? 1 : 0;
        this._isAutoScrolling = true
    }, update: function (dt) {
        if (this._isAutoScrolling)switch (this._autoScrollDir) {
            case 0:
                var step = this._autoScrollSpeed * dt;
                if (this._autoScrollDistance + step >= 0) {
                    step = -this._autoScrollDistance;
                    this._autoScrollDistance = 0;
                    this._isAutoScrolling = false
                } else this._autoScrollDistance += step;
                this.scrollPages(-step);
                if (!this._isAutoScrolling)this.pageTurningEvent();
                break;
                break;
            case 1:
                var step =
                    this._autoScrollSpeed * dt;
                if (this._autoScrollDistance - step <= 0) {
                    step = this._autoScrollDistance;
                    this._autoScrollDistance = 0;
                    this._isAutoScrolling = false
                } else this._autoScrollDistance -= step;
                this.scrollPages(step);
                if (!this._isAutoScrolling)this.pageTurningEvent();
                break;
            default:
                break
        }
    }, onTouchBegan: function (touch, event) {
        var pass = ccui.Layout.prototype.onTouchBegan.call(this, touch, event);
        if (this._hitted)this.handlePressLogic(touch.getLocation());
        return pass
    }, onTouchMoved: function (touch, event) {
        var touchPoint =
            touch.getLocation();
        this._touchMovePos.x = touchPoint.x;
        this._touchMovePos.y = touchPoint.y;
        this.handleMoveLogic(touchPoint);
        var widgetParent = this.getWidgetParent();
        if (widgetParent)widgetParent.checkChildInfo(1, this, touchPoint);
        this.moveEvent();
        if (!this.hitTest(touchPoint)) {
            this.setFocused(false);
            this.onTouchEnded(touch, event)
        }
    }, onTouchEnded: function (touch, event) {
        ccui.Layout.prototype.onTouchEnded.call(this, touch, event);
        this.handleReleaseLogic(this._touchEndPos)
    }, onTouchCancelled: function (touch, event) {
        var touchPoint =
            touch.getLocation();
        ccui.Layout.prototype.onTouchCancelled.call(this, touch, event);
        this.handleReleaseLogic(touchPoint)
    }, movePages: function (offset) {
        var arrayPages = this._pages;
        var length = arrayPages.length;
        for (var i = 0; i < length; i++) {
            var child = arrayPages[i];
            var pos = child.getPosition();
            child.setPosition(pos.x + offset, pos.y)
        }
    }, scrollPages: function (touchOffset) {
        if (this._pages.length <= 0)return false;
        if (!this._leftChild || !this._rightChild)return false;
        var realOffset = touchOffset;
        switch (this._touchMoveDir) {
            case ccui.PageView.TOUCH_DIR_LEFT:
                if (this._rightChild.getRightInParent() +
                    touchOffset <= this._rightBoundary) {
                    realOffset = this._rightBoundary - this._rightChild.getRightInParent();
                    this.movePages(realOffset);
                    return false
                }
                break;
            case ccui.PageView.TOUCH_DIR_RIGHT:
                if (this._leftChild.getLeftInParent() + touchOffset >= this._leftBoundary) {
                    realOffset = this._leftBoundary - this._leftChild.getLeftInParent();
                    this.movePages(realOffset);
                    return false
                }
                break;
            default:
                break
        }
        this.movePages(realOffset);
        return true
    }, handlePressLogic: function (touchPoint) {
        var nsp = this.convertToNodeSpace(touchPoint);
        this._touchMoveStartLocation =
            nsp.x;
        this._touchStartLocation = nsp.x
    }, handleMoveLogic: function (touchPoint) {
        var nsp = this.convertToNodeSpace(touchPoint);
        var offset = 0;
        var moveX = nsp.x;
        offset = moveX - this._touchMoveStartLocation;
        this._touchMoveStartLocation = moveX;
        if (offset < 0)this._touchMoveDir = ccui.PageView.TOUCH_DIR_LEFT; else if (offset > 0)this._touchMoveDir = ccui.PageView.TOUCH_DIR_RIGHT;
        this.scrollPages(offset)
    }, handleReleaseLogic: function (touchPoint) {
        if (this._pages.length <= 0)return;
        var curPage = this._pages[this._curPageIdx];
        if (curPage) {
            var curPagePos =
                curPage.getPosition();
            var pageCount = this._pages.length;
            var curPageLocation = curPagePos.x;
            var pageWidth = this.getSize().width;
            var boundary = pageWidth / 2;
            if (curPageLocation <= -boundary)if (this._curPageIdx >= pageCount - 1)this.scrollPages(-curPageLocation); else this.scrollToPage(this._curPageIdx + 1); else if (curPageLocation >= boundary)if (this._curPageIdx <= 0)this.scrollPages(-curPageLocation); else this.scrollToPage(this._curPageIdx - 1); else this.scrollToPage(this._curPageIdx)
        }
    }, checkChildInfo: function (handleState, sender, touchPoint) {
        if (this._enabled && this._touchEnabled)this.interceptTouchEvent(handleState, sender, touchPoint)
    }, interceptTouchEvent: function (handleState, sender, touchPoint) {
        switch (handleState) {
            case 0:
                this.handlePressLogic(touchPoint);
                break;
            case 1:
                var offset = 0;
                offset = Math.abs(sender.getTouchStartPos().x - touchPoint.x);
                if (offset > this._childFocusCancelOffset) {
                    sender.setFocused(false);
                    this.handleMoveLogic(touchPoint)
                }
                break;
            case 2:
                this.handleReleaseLogic(touchPoint);
                break;
            case 3:
                break
        }
    }, pageTurningEvent: function () {
        if (this._pageViewEventListener &&
            this._pageViewEventSelector)this._pageViewEventSelector.call(this._pageViewEventListener, this, ccui.PageView.EVENT_TURNING)
    }, addEventListenerPageView: function (selector, target) {
        this._pageViewEventSelector = selector;
        this._pageViewEventListener = target
    }, getPages: function () {
        return this._pages
    }, getCurPageIndex: function () {
        return this._curPageIdx
    }, getDescription: function () {
        return"PageView"
    }, createCloneInstance: function () {
        return ccui.PageView.create()
    }, copyClonedWidgetChildren: function (model) {
        var arrayPages =
            model.getPages();
        for (var i = 0; i < arrayPages.length; i++) {
            var page = arrayPages[i];
            this.addPage(page.clone())
        }
    }, copySpecialProperties: function (pageView) {
        ccui.Layout.prototype.copySpecialProperties.call(this, pageView)
    }, _doLayout: function () {
        if (!this._doLayoutDirty)return;
        this._doLayoutDirty = false
    }});
ccui.PageView.create = function () {
    var uiPageView = new ccui.PageView;
    if (uiPageView && uiPageView.init())return uiPageView;
    return null
};
ccui.PageView.EVENT_TURNING = 0;
ccui.PageView.TOUCH_DIR_LEFT = 0;
ccui.PageView.TOUCH_DIR_RIGHT = 1;