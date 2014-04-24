cc._globalFontSize = cc.ITEM_SIZE;
cc._globalFontName = "Arial";
cc._globalFontNameRelease = false;
cc.MenuItem = cc.NodeRGBA.extend({_enabled: false, _target: null, _callback: null, _isSelected: false, _className: "MenuItem", ctor: function (callback, target) {
    var nodeP = cc.NodeRGBA.prototype;
    nodeP.ctor.call(this);
    this._target = null;
    this._callback = null;
    this._isSelected = false;
    this._enabled = false;
    nodeP.setAnchorPoint.call(this, 0.5, 0.5);
    this._target = target || null;
    this._callback = callback || null;
    if (this._callback)this._enabled = true
}, isSelected: function () {
    return this._isSelected
}, setOpacityModifyRGB: function (value) {
}, isOpacityModifyRGB: function () {
    return false
},
    setTarget: function (selector, rec) {
        this._target = rec;
        this._callback = selector
    }, isEnabled: function () {
        return this._enabled
    }, setEnabled: function (enable) {
        this._enabled = enable
    }, initWithCallback: function (callback, target) {
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this._target = target;
        this._callback = callback;
        this._enabled = true;
        this._isSelected = false;
        return true
    }, rect: function () {
        var locPosition = this._position, locContentSize = this._contentSize, locAnchorPoint = this._anchorPoint;
        return cc.rect(locPosition.x - locContentSize.width *
            locAnchorPoint.x, locPosition.y - locContentSize.height * locAnchorPoint.y, locContentSize.width, locContentSize.height)
    }, selected: function () {
        this._isSelected = true
    }, unselected: function () {
        this._isSelected = false
    }, setCallback: function (callback, target) {
        this._target = target;
        this._callback = callback
    }, activate: function () {
        if (this._enabled) {
            var locTarget = this._target, locCallback = this._callback;
            if (!locCallback)return;
            if (locTarget && typeof locCallback == "string")locTarget[locCallback](this); else if (locTarget && typeof locCallback ==
                "function")locCallback.call(locTarget, this); else locCallback(this)
        }
    }});
var _p = cc.MenuItem.prototype;
_p.enabled;
cc.defineGetterSetter(_p, "enabled", _p.isEnabled, _p.setEnabled);
cc.MenuItem.create = function (callback, target) {
    return new cc.MenuItem(callback, target)
};
cc.MenuItemLabel = cc.MenuItem.extend({_disabledColor: null, _label: null, _orginalScale: 0, _colorBackup: null, ctor: function (label, selector, target) {
    cc.MenuItem.prototype.ctor.call(this, selector, target);
    this._disabledColor = null;
    this._label = null;
    this._orginalScale = 0;
    this._colorBackup = null;
    if (label) {
        this._originalScale = 1;
        this._colorBackup = cc.color.WHITE;
        this._disabledColor = cc.color(126, 126, 126);
        this.setLabel(label);
        this.cascadeColor = true;
        this.cascadeOpacity = true
    }
}, getDisabledColor: function () {
    return this._disabledColor
},
    setDisabledColor: function (color) {
        this._disabledColor = color
    }, getLabel: function () {
        return this._label
    }, setLabel: function (label) {
        if (label) {
            this.addChild(label);
            label.anchorX = 0;
            label.anchorY = 0;
            this.width = label.width;
            this.height = label.height
        }
        if (this._label)this.removeChild(this._label, true);
        this._label = label
    }, setEnabled: function (enabled) {
        if (this._enabled != enabled) {
            var locLabel = this._label;
            if (!enabled) {
                this._colorBackup = locLabel.color;
                locLabel.color = this._disabledColor
            } else locLabel.color = this._colorBackup
        }
        cc.MenuItem.prototype.setEnabled.call(this,
            enabled)
    }, setOpacity: function (opacity) {
        this._label.opacity = opacity
    }, getOpacity: function () {
        return this._label.opacity
    }, setColor: function (color) {
        this._label.color = color
    }, getColor: function () {
        return this._label.color
    }, initWithLabel: function (label, selector, target) {
        this.initWithCallback(selector, target);
        this._originalScale = 1;
        this._colorBackup = cc.color.WHITE;
        this._disabledColor = cc.color(126, 126, 126);
        this.setLabel(label);
        this.cascadeColor = true;
        this.cascadeOpacity = true;
        return true
    }, setString: function (label) {
        this._label.string =
            label;
        this.width = this._label.width;
        this.height = this._label.height
    }, getString: function () {
        return this._label.string
    }, activate: function () {
        if (this._enabled) {
            this.stopAllActions();
            this.scale = this._originalScale;
            cc.MenuItem.prototype.activate.call(this)
        }
    }, selected: function () {
        if (this._enabled) {
            cc.MenuItem.prototype.selected.call(this);
            var action = this.getActionByTag(cc.ZOOM_ACTION_TAG);
            if (action)this.stopAction(action); else this._originalScale = this.scale;
            var zoomAction = cc.ScaleTo.create(0.1, this._originalScale *
                1.2);
            zoomAction.setTag(cc.ZOOM_ACTION_TAG);
            this.runAction(zoomAction)
        }
    }, unselected: function () {
        if (this._enabled) {
            cc.MenuItem.prototype.unselected.call(this);
            this.stopActionByTag(cc.ZOOM_ACTION_TAG);
            var zoomAction = cc.ScaleTo.create(0.1, this._originalScale);
            zoomAction.setTag(cc.ZOOM_ACTION_TAG);
            this.runAction(zoomAction)
        }
    }});
var _p = cc.MenuItemLabel.prototype;
_p.string;
cc.defineGetterSetter(_p, "string", _p.getString, _p.setString);
_p.disabledColor;
cc.defineGetterSetter(_p, "disabledColor", _p.getDisabledColor, _p.setDisabledColor);
_p.label;
cc.defineGetterSetter(_p, "label", _p.getLabel, _p.setLabel);
cc.MenuItemLabel.create = function (label, selector, target) {
    return new cc.MenuItemLabel(label, selector, target)
};
cc.MenuItemAtlasFont = cc.MenuItemLabel.extend({ctor: function (value, charMapFile, itemWidth, itemHeight, startCharMap, callback, target) {
    var label;
    if (value && value.length > 0)label = cc.LabelAtlas.create(value, charMapFile, itemWidth, itemHeight, startCharMap);
    cc.MenuItemLabel.prototype.ctor.call(this, label, callback, target)
}, initWithString: function (value, charMapFile, itemWidth, itemHeight, startCharMap, callback, target) {
    if (!value || value.length == 0)throw"cc.MenuItemAtlasFont.initWithString(): value should be non-null and its length should be greater than 0";
    var label = new cc.LabelAtlas;
    label.initWithString(value, charMapFile, itemWidth, itemHeight, startCharMap);
    if (this.initWithLabel(label, callback, target));
    return true
}});
cc.MenuItemAtlasFont.create = function (value, charMapFile, itemWidth, itemHeight, startCharMap, callback, target) {
    return new cc.MenuItemAtlasFont(value, charMapFile, itemWidth, itemHeight, startCharMap, callback, target)
};
cc.MenuItemFont = cc.MenuItemLabel.extend({_fontSize: null, _fontName: null, ctor: function (value, callback, target) {
    var label;
    if (value && value.length > 0) {
        this._fontName = cc._globalFontName;
        this._fontSize = cc._globalFontSize;
        label = cc.LabelTTF.create(value, this._fontName, this._fontSize)
    } else {
        this._fontSize = 0;
        this._fontName = ""
    }
    cc.MenuItemLabel.prototype.ctor.call(this, label, callback, target)
}, initWithString: function (value, callback, target) {
    if (!value || value.length == 0)throw"Value should be non-null and its length should be greater than 0";
    this._fontName = cc._globalFontName;
    this._fontSize = cc._globalFontSize;
    var label = cc.LabelTTF.create(value, this._fontName, this._fontSize);
    if (this.initWithLabel(label, callback, target));
    return true
}, setFontSize: function (s) {
    this._fontSize = s;
    this._recreateLabel()
}, getFontSize: function () {
    return this._fontSize
}, setFontName: function (name) {
    this._fontName = name;
    this._recreateLabel()
}, getFontName: function () {
    return this._fontName
}, _recreateLabel: function () {
    var label = cc.LabelTTF.create(this._label.string, this._fontName,
        this._fontSize);
    this.setLabel(label)
}});
cc.MenuItemFont.setFontSize = function (fontSize) {
    cc._globalFontSize = fontSize
};
cc.MenuItemFont.fontSize = function () {
    return cc._globalFontSize
};
cc.MenuItemFont.setFontName = function (name) {
    if (cc._globalFontNameRelease)cc._globalFontName = "";
    cc._globalFontName = name;
    cc._globalFontNameRelease = true
};
var _p = cc.MenuItemFont.prototype;
_p.fontSize;
cc.defineGetterSetter(_p, "fontSize", _p.getFontSize, _p.setFontSize);
_p.fontName;
cc.defineGetterSetter(_p, "fontName", _p.getFontName, _p.setFontName);
cc.MenuItemFont.fontName = function () {
    return cc._globalFontName
};
cc.MenuItemFont.create = function (value, callback, target) {
    return new cc.MenuItemFont(value, callback, target)
};
cc.MenuItemSprite = cc.MenuItem.extend({_normalImage: null, _selectedImage: null, _disabledImage: null, ctor: function (normalSprite, selectedSprite, three, four, five) {
    cc.MenuItem.prototype.ctor.call(this);
    this._normalImage = null;
    this._selectedImage = null;
    this._disabledImage = null;
    if (selectedSprite !== undefined) {
        normalSprite = normalSprite;
        selectedSprite = selectedSprite;
        var disabledImage, target, callback;
        if (five !== undefined) {
            disabledImage = three;
            callback = four;
            target = five
        } else if (four !== undefined && typeof four === "function") {
            disabledImage =
                three;
            callback = four
        } else if (four !== undefined && typeof three === "function") {
            target = four;
            callback = three;
            disabledImage = selectedSprite
        } else if (three === undefined)disabledImage = selectedSprite;
        this.initWithNormalSprite(normalSprite, selectedSprite, disabledImage, callback, target)
    }
}, getNormalImage: function () {
    return this._normalImage
}, setNormalImage: function (normalImage) {
    if (this._normalImage == normalImage)return;
    if (normalImage) {
        this.addChild(normalImage, 0, cc.NORMAL_TAG);
        normalImage.anchorX = 0;
        normalImage.anchorY =
            0
    }
    if (this._normalImage)this.removeChild(this._normalImage, true);
    this._normalImage = normalImage;
    this.width = this._normalImage.width;
    this.height = this._normalImage.height;
    this._updateImagesVisibility();
    if (normalImage.textureLoaded && !normalImage.textureLoaded())normalImage.addLoadedEventListener(function (sender) {
        this.width = sender.width;
        this.height = sender.height
    }, this)
}, getSelectedImage: function () {
    return this._selectedImage
}, setSelectedImage: function (selectedImage) {
    if (this._selectedImage == selectedImage)return;
    if (selectedImage) {
        this.addChild(selectedImage, 0, cc.SELECTED_TAG);
        selectedImage.anchorX = 0;
        selectedImage.anchorY = 0
    }
    if (this._selectedImage)this.removeChild(this._selectedImage, true);
    this._selectedImage = selectedImage;
    this._updateImagesVisibility()
}, getDisabledImage: function () {
    return this._disabledImage
}, setDisabledImage: function (disabledImage) {
    if (this._disabledImage == disabledImage)return;
    if (disabledImage) {
        this.addChild(disabledImage, 0, cc.DISABLE_TAG);
        disabledImage.anchorX = 0;
        disabledImage.anchorY = 0
    }
    if (this._disabledImage)this.removeChild(this._disabledImage,
        true);
    this._disabledImage = disabledImage;
    this._updateImagesVisibility()
}, initWithNormalSprite: function (normalSprite, selectedSprite, disabledSprite, callback, target) {
    this.initWithCallback(callback, target);
    this.setNormalImage(normalSprite);
    this.setSelectedImage(selectedSprite);
    this.setDisabledImage(disabledSprite);
    var locNormalImage = this._normalImage;
    if (locNormalImage) {
        this.width = locNormalImage.width;
        this.height = locNormalImage.height;
        if (locNormalImage.textureLoaded && !locNormalImage.textureLoaded())locNormalImage.addLoadedEventListener(function (sender) {
            this.width =
                sender.width;
            this.height = sender.height;
            this.cascadeColor = true;
            this.cascadeOpacity = true
        }, this)
    }
    this.cascadeColor = true;
    this.cascadeOpacity = true;
    return true
}, setColor: function (color) {
    this._normalImage.color = color;
    if (this._selectedImage)this._selectedImage.color = color;
    if (this._disabledImage)this._disabledImage.color = color
}, getColor: function () {
    return this._normalImage.color
}, setOpacity: function (opacity) {
    this._normalImage.opacity = opacity;
    if (this._selectedImage)this._selectedImage.opacity = opacity;
    if (this._disabledImage)this._disabledImage.opacity =
        opacity
}, getOpacity: function () {
    return this._normalImage.opacity
}, selected: function () {
    cc.MenuItem.prototype.selected.call(this);
    if (this._normalImage) {
        if (this._disabledImage)this._disabledImage.visible = false;
        if (this._selectedImage) {
            this._normalImage.visible = false;
            this._selectedImage.visible = true
        } else this._normalImage.visible = true
    }
}, unselected: function () {
    cc.MenuItem.prototype.unselected.call(this);
    if (this._normalImage) {
        this._normalImage.visible = true;
        if (this._selectedImage)this._selectedImage.visible =
            false;
        if (this._disabledImage)this._disabledImage.visible = false
    }
}, setEnabled: function (bEnabled) {
    if (this._enabled != bEnabled) {
        cc.MenuItem.prototype.setEnabled.call(this, bEnabled);
        this._updateImagesVisibility()
    }
}, _updateImagesVisibility: function () {
    var locNormalImage = this._normalImage, locSelImage = this._selectedImage, locDisImage = this._disabledImage;
    if (this._enabled) {
        if (locNormalImage)locNormalImage.visible = true;
        if (locSelImage)locSelImage.visible = false;
        if (locDisImage)locDisImage.visible = false
    } else if (locDisImage) {
        if (locNormalImage)locNormalImage.visible =
            false;
        if (locSelImage)locSelImage.visible = false;
        if (locDisImage)locDisImage.visible = true
    } else {
        if (locNormalImage)locNormalImage.visible = true;
        if (locSelImage)locSelImage.visible = false
    }
}});
var _p = cc.MenuItemSprite.prototype;
_p.normalImage;
cc.defineGetterSetter(_p, "normalImage", _p.getNormalImage, _p.setNormalImage);
_p.selectedImage;
cc.defineGetterSetter(_p, "selectedImage", _p.getSelectedImage, _p.setSelectedImage);
_p.disabledImage;
cc.defineGetterSetter(_p, "disabledImage", _p.getDisabledImage, _p.setDisabledImage);
cc.MenuItemSprite.create = function (normalSprite, selectedSprite, three, four, five) {
    return new cc.MenuItemSprite(normalSprite, selectedSprite, three, four, five || undefined)
};
cc.MenuItemImage = cc.MenuItemSprite.extend({ctor: function (normalImage, selectedImage, three, four, five) {
    var normalSprite = null, selectedSprite = null, disabledSprite = null, callback = null, target = null;
    if (normalImage === undefined)cc.MenuItemSprite.prototype.ctor.call(this); else {
        normalSprite = cc.Sprite.create(normalImage);
        selectedImage && (selectedSprite = cc.Sprite.create(selectedImage));
        if (four === undefined)callback = three; else if (five === undefined) {
            callback = three;
            target = four
        } else if (five) {
            disabledSprite = cc.Sprite.create(three);
            callback = four;
            target = five
        }
        cc.MenuItemSprite.prototype.ctor.call(this, normalSprite, selectedSprite, disabledSprite, callback, target)
    }
}, setNormalSpriteFrame: function (frame) {
    this.setNormalImage(cc.Sprite.create(frame))
}, setSelectedSpriteFrame: function (frame) {
    this.setSelectedImage(cc.Sprite.create(frame))
}, setDisabledSpriteFrame: function (frame) {
    this.setDisabledImage(cc.Sprite.create(frame))
}, initWithNormalImage: function (normalImage, selectedImage, disabledImage, callback, target) {
    var normalSprite = null;
    var selectedSprite =
        null;
    var disabledSprite = null;
    if (normalImage)normalSprite = cc.Sprite.create(normalImage);
    if (selectedImage)selectedSprite = cc.Sprite.create(selectedImage);
    if (disabledImage)disabledSprite = cc.Sprite.create(disabledImage);
    return this.initWithNormalSprite(normalSprite, selectedSprite, disabledSprite, callback, target)
}});
cc.MenuItemImage.create = function (normalImage, selectedImage, three, four, five) {
    return new cc.MenuItemImage(normalImage, selectedImage, three, four, five)
};
cc.MenuItemToggle = cc.MenuItem.extend({subItems: null, _selectedIndex: 0, _opacity: null, _color: null, ctor: function () {
    var argc = arguments.length, callback, target;
    if (typeof arguments[argc - 2] === "function") {
        callback = arguments[argc - 2];
        target = arguments[argc - 1];
        argc = argc - 2
    } else if (typeof arguments[argc - 1] === "function") {
        callback = arguments[argc - 1];
        argc = argc - 1
    }
    cc.MenuItem.prototype.ctor.call(this, callback, target);
    this._selectedIndex = 0;
    this.subItems = [];
    this._opacity = 0;
    this._color = cc.color.WHITE;
    if (argc > 0) {
        var locSubItems =
            this.subItems;
        locSubItems.length = 0;
        for (var i = 0; i < argc; i++)if (arguments[i])locSubItems.push(arguments[i]);
        this._selectedIndex = cc.UINT_MAX;
        this.setSelectedIndex(0);
        this.setCascadeColorEnabled(true);
        this.setCascadeOpacityEnabled(true)
    }
}, getOpacity: function () {
    return this._opacity
}, setOpacity: function (opacity) {
    this._opacity = opacity;
    if (this.subItems && this.subItems.length > 0)for (var it = 0; it < this.subItems.length; it++)this.subItems[it].opacity = opacity;
    this._color.a = opacity
}, getColor: function () {
    var locColor =
        this._color;
    return cc.color(locColor.r, locColor.g, locColor.b, locColor.a)
}, setColor: function (color) {
    var locColor = this._color;
    locColor.r = color.r;
    locColor.g = color.g;
    locColor.b = color.b;
    if (this.subItems && this.subItems.length > 0)for (var it = 0; it < this.subItems.length; it++)this.subItems[it].setColor(color);
    if (color.a !== undefined && !color.a_undefined)this.setOpacity(color.a)
}, getSelectedIndex: function () {
    return this._selectedIndex
}, setSelectedIndex: function (SelectedIndex) {
    if (SelectedIndex != this._selectedIndex) {
        this._selectedIndex =
            SelectedIndex;
        var currItem = this.getChildByTag(cc.CURRENT_ITEM);
        if (currItem)currItem.removeFromParent(false);
        var item = this.subItems[this._selectedIndex];
        this.addChild(item, 0, cc.CURRENT_ITEM);
        var w = item.width, h = item.height;
        this.width = w;
        this.height = h;
        item.setPosition(w / 2, h / 2)
    }
}, getSubItems: function () {
    return this.subItems
}, setSubItems: function (subItems) {
    this.subItems = subItems
}, initWithItems: function (args) {
    var l = args.length;
    if (typeof args[args.length - 2] === "function") {
        this.initWithCallback(args[args.length -
            2], args[args.length - 1]);
        l = l - 2
    } else if (typeof args[args.length - 1] === "function") {
        this.initWithCallback(args[args.length - 1], null);
        l = l - 1
    } else this.initWithCallback(null, null);
    var locSubItems = this.subItems;
    locSubItems.length = 0;
    for (var i = 0; i < l; i++)if (args[i])locSubItems.push(args[i]);
    this._selectedIndex = cc.UINT_MAX;
    this.setSelectedIndex(0);
    this.cascadeColor = true;
    this.cascadeOpacity = true;
    return true
}, addSubItem: function (item) {
    this.subItems.push(item)
}, activate: function () {
    if (this._enabled) {
        var newIndex = (this._selectedIndex +
            1) % this.subItems.length;
        this.setSelectedIndex(newIndex)
    }
    cc.MenuItem.prototype.activate.call(this)
}, selected: function () {
    cc.MenuItem.prototype.selected.call(this);
    this.subItems[this._selectedIndex].selected()
}, unselected: function () {
    cc.MenuItem.prototype.unselected.call(this);
    this.subItems[this._selectedIndex].unselected()
}, setEnabled: function (enabled) {
    if (this._enabled != enabled) {
        cc.MenuItem.prototype.setEnabled.call(this, enabled);
        var locItems = this.subItems;
        if (locItems && locItems.length > 0)for (var it = 0; it <
            locItems.length; it++)locItems[it].enabled = enabled
    }
}, selectedItem: function () {
    return this.subItems[this._selectedIndex]
}, onEnter: function () {
    cc.Node.prototype.onEnter.call(this);
    this.setSelectedIndex(this._selectedIndex)
}});
var _p = cc.MenuItemToggle.prototype;
_p.selectedIndex;
cc.defineGetterSetter(_p, "selectedIndex", _p.getSelectedIndex, _p.setSelectedIndex);
cc.MenuItemToggle.create = function () {
    if (arguments.length > 0 && arguments[arguments.length - 1] == null)cc.log("parameters should not be ending with null in Javascript");
    var ret = new cc.MenuItemToggle;
    ret.initWithItems(Array.prototype.slice.apply(arguments));
    return ret
};
cc.MENU_STATE_WAITING = 0;
cc.MENU_STATE_TRACKING_TOUCH = 1;
cc.MENU_HANDLER_PRIORITY = -128;
cc.DEFAULT_PADDING = 5;
cc.Menu = cc.LayerRGBA.extend({enabled: false, _color: null, _opacity: 0, _selectedItem: null, _state: -1, _touchListener: null, _className: "Menu", ctor: function (menuItems) {
    cc.LayerRGBA.prototype.ctor.call(this);
    this._color = cc.color.WHITE;
    this.enabled = false;
    this._opacity = 255;
    this._selectedItem = null;
    this._state = -1;
    this._touchListener = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: true, onTouchBegan: this._onTouchBegan, onTouchMoved: this._onTouchMoved, onTouchEnded: this._onTouchEnded,
        onTouchCancelled: this._onTouchCancelled});
    if (arguments.length > 0 && arguments[arguments.length - 1] == null)cc.log("parameters should not be ending with null in Javascript");
    var argc = arguments.length, items;
    if (argc == 0)items = []; else if (argc == 1)if (menuItems instanceof Array)items = menuItems; else items = [menuItems]; else if (argc > 1) {
        items = [];
        for (var i = 0; i < argc; i++)if (arguments[i])items.push(arguments[i])
    }
    this.initWithArray(items)
}, onEnter: function () {
    var locListener = this._touchListener;
    if (!locListener._isRegistered())cc.eventManager.addListener(locListener,
        this);
    cc.Node.prototype.onEnter.call(this)
}, getColor: function () {
    var locColor = this._color;
    return cc.color(locColor.r, locColor.g, locColor.b, locColor.a)
}, setColor: function (color) {
    var locColor = this._color;
    locColor.r = color.r;
    locColor.g = color.g;
    locColor.b = color.b;
    var locChildren = this._children;
    if (locChildren && locChildren.length > 0)for (var i = 0; i < locChildren.length; i++)locChildren[i].setColor(color);
    if (color.a !== undefined && !color.a_undefined)this.setOpacity(color.a)
}, getOpacity: function () {
    return this._opacity
},
    setOpacity: function (opa) {
        this._opacity = opa;
        var locChildren = this._children;
        if (locChildren && locChildren.length > 0)for (var i = 0; i < locChildren.length; i++)locChildren[i].setOpacity(opa);
        this._color.a = opa
    }, isEnabled: function () {
        return this.enabled
    }, setEnabled: function (enabled) {
        this.enabled = enabled
    }, initWithItems: function (args) {
        var pArray = [];
        if (args)for (var i = 0; i < args.length; i++)if (args[i])pArray.push(args[i]);
        return this.initWithArray(pArray)
    }, initWithArray: function (arrayOfItems) {
        if (cc.LayerRGBA.prototype.init.call(this)) {
            this.enabled =
                true;
            var winSize = cc.winSize;
            this.setPosition(winSize.width / 2, winSize.height / 2);
            this.setContentSize(winSize);
            this.setAnchorPoint(0.5, 0.5);
            this.ignoreAnchorPointForPosition(true);
            if (arrayOfItems)for (var i = 0; i < arrayOfItems.length; i++)this.addChild(arrayOfItems[i], i);
            this._selectedItem = null;
            this._state = cc.MENU_STATE_WAITING;
            this.cascadeColor = true;
            this.cascadeOpacity = true;
            return true
        }
        return false
    }, addChild: function (child, zOrder, tag) {
        if (!(child instanceof cc.MenuItem))throw"cc.Menu.addChild() : Menu only supports MenuItem objects as children";
        cc.Layer.prototype.addChild.call(this, child, zOrder, tag)
    }, alignItemsVertically: function () {
        this.alignItemsVerticallyWithPadding(cc.DEFAULT_PADDING)
    }, alignItemsVerticallyWithPadding: function (padding) {
        var height = -padding, locChildren = this._children, len, i, locScaleY, locHeight, locChild;
        if (locChildren && locChildren.length > 0) {
            for (i = 0, len = locChildren.length; i < len; i++)height += locChildren[i].height * locChildren[i].scaleY + padding;
            var y = height / 2;
            for (i = 0, len = locChildren.length; i < len; i++) {
                locChild = locChildren[i];
                locHeight =
                    locChild.height;
                locScaleY = locChild.scaleY;
                locChild.setPosition(0, y - locHeight * locScaleY / 2);
                y -= locHeight * locScaleY + padding
            }
        }
    }, alignItemsHorizontally: function () {
        this.alignItemsHorizontallyWithPadding(cc.DEFAULT_PADDING)
    }, alignItemsHorizontallyWithPadding: function (padding) {
        var width = -padding, locChildren = this._children, i, len, locScaleX, locWidth, locChild;
        if (locChildren && locChildren.length > 0) {
            for (i = 0, len = locChildren.length; i < len; i++)width += locChildren[i].width * locChildren[i].scaleX + padding;
            var x = -width / 2;
            for (i = 0, len = locChildren.length; i < len; i++) {
                locChild = locChildren[i];
                locScaleX = locChild.scaleX;
                locWidth = locChildren[i].width;
                locChild.setPosition(x + locWidth * locScaleX / 2, 0);
                x += locWidth * locScaleX + padding
            }
        }
    }, alignItemsInColumns: function () {
        if (arguments.length > 0 && arguments[arguments.length - 1] == null)cc.log("parameters should not be ending with null in Javascript");
        var rows = [];
        for (var i = 0; i < arguments.length; i++)rows.push(arguments[i]);
        var height = -5;
        var row = 0;
        var rowHeight = 0;
        var columnsOccupied = 0;
        var rowColumns,
            tmp, len;
        var locChildren = this._children;
        if (locChildren && locChildren.length > 0)for (i = 0, len = locChildren.length; i < len; i++) {
            if (row >= rows.length)continue;
            rowColumns = rows[row];
            if (!rowColumns)continue;
            tmp = locChildren[i].height;
            rowHeight = rowHeight >= tmp || isNaN(tmp) ? rowHeight : tmp;
            ++columnsOccupied;
            if (columnsOccupied >= rowColumns) {
                height += rowHeight + 5;
                columnsOccupied = 0;
                rowHeight = 0;
                ++row
            }
        }
        var winSize = cc.director.getWinSize();
        row = 0;
        rowHeight = 0;
        rowColumns = 0;
        var w = 0;
        var x = 0;
        var y = height / 2;
        if (locChildren && locChildren.length >
            0)for (i = 0, len = locChildren.length; i < len; i++) {
            var child = locChildren[i];
            if (rowColumns == 0) {
                rowColumns = rows[row];
                w = winSize.width / (1 + rowColumns);
                x = w
            }
            tmp = child._getHeight();
            rowHeight = rowHeight >= tmp || isNaN(tmp) ? rowHeight : tmp;
            child.setPosition(x - winSize.width / 2, y - tmp / 2);
            x += w;
            ++columnsOccupied;
            if (columnsOccupied >= rowColumns) {
                y -= rowHeight + 5;
                columnsOccupied = 0;
                rowColumns = 0;
                rowHeight = 0;
                ++row
            }
        }
    }, alignItemsInRows: function () {
        if (arguments.length > 0 && arguments[arguments.length - 1] == null)cc.log("parameters should not be ending with null in Javascript");
        var columns = [], i;
        for (i = 0; i < arguments.length; i++)columns.push(arguments[i]);
        var columnWidths = [];
        var columnHeights = [];
        var width = -10;
        var columnHeight = -5;
        var column = 0;
        var columnWidth = 0;
        var rowsOccupied = 0;
        var columnRows, child, len, tmp;
        var locChildren = this._children;
        if (locChildren && locChildren.length > 0)for (i = 0, len = locChildren.length; i < len; i++) {
            child = locChildren[i];
            if (column >= columns.length)continue;
            columnRows = columns[column];
            if (!columnRows)continue;
            tmp = child.width;
            columnWidth = columnWidth >= tmp || isNaN(tmp) ?
                columnWidth : tmp;
            columnHeight += child.height + 5;
            ++rowsOccupied;
            if (rowsOccupied >= columnRows) {
                columnWidths.push(columnWidth);
                columnHeights.push(columnHeight);
                width += columnWidth + 10;
                rowsOccupied = 0;
                columnWidth = 0;
                columnHeight = -5;
                ++column
            }
        }
        var winSize = cc.director.getWinSize();
        column = 0;
        columnWidth = 0;
        columnRows = 0;
        var x = -width / 2;
        var y = 0;
        if (locChildren && locChildren.length > 0)for (i = 0, len = locChildren.length; i < len; i++) {
            child = locChildren[i];
            if (columnRows == 0) {
                columnRows = columns[column];
                y = columnHeights[column]
            }
            tmp = child._getWidth();
            columnWidth = columnWidth >= tmp || isNaN(tmp) ? columnWidth : tmp;
            child.setPosition(x + columnWidths[column] / 2, y - winSize.height / 2);
            y -= child.height + 10;
            ++rowsOccupied;
            if (rowsOccupied >= columnRows) {
                x += columnWidth + 5;
                rowsOccupied = 0;
                columnRows = 0;
                columnWidth = 0;
                ++column
            }
        }
    }, removeChild: function (child, cleanup) {
        if (child == null)return;
        if (!(child instanceof cc.MenuItem)) {
            cc.log("cc.Menu.removeChild():Menu only supports MenuItem objects as children");
            return
        }
        if (this._selectedItem == child)this._selectedItem = null;
        cc.Node.prototype.removeChild.call(this,
            child, cleanup)
    }, _onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        if (target._state != cc.MENU_STATE_WAITING || !target._visible || !target.enabled)return false;
        for (var c = target.parent; c != null; c = c.parent)if (!c.isVisible())return false;
        target._selectedItem = target._itemForTouch(touch);
        if (target._selectedItem) {
            target._state = cc.MENU_STATE_TRACKING_TOUCH;
            target._selectedItem.selected();
            return true
        }
        return false
    }, _onTouchEnded: function (touch, event) {
        var target = event.getCurrentTarget();
        if (target._state !==
            cc.MENU_STATE_TRACKING_TOUCH) {
            cc.log("cc.Menu.onTouchEnded(): invalid state");
            return
        }
        if (target._selectedItem) {
            target._selectedItem.unselected();
            target._selectedItem.activate()
        }
        target._state = cc.MENU_STATE_WAITING
    }, _onTouchCancelled: function (touch, event) {
        var target = event.getCurrentTarget();
        if (target._state !== cc.MENU_STATE_TRACKING_TOUCH) {
            cc.log("cc.Menu.onTouchCancelled(): invalid state");
            return
        }
        if (this._selectedItem)target._selectedItem.unselected();
        target._state = cc.MENU_STATE_WAITING
    }, _onTouchMoved: function (touch, event) {
        var target = event.getCurrentTarget();
        if (target._state !== cc.MENU_STATE_TRACKING_TOUCH) {
            cc.log("cc.Menu.onTouchMoved(): invalid state");
            return
        }
        var currentItem = target._itemForTouch(touch);
        if (currentItem != target._selectedItem) {
            if (target._selectedItem)target._selectedItem.unselected();
            target._selectedItem = currentItem;
            if (target._selectedItem)target._selectedItem.selected()
        }
    }, onExit: function () {
        if (this._state == cc.MENU_STATE_TRACKING_TOUCH) {
            if (this._selectedItem) {
                this._selectedItem.unselected();
                this._selectedItem =
                    null
            }
            this._state = cc.MENU_STATE_WAITING
        }
        cc.Node.prototype.onExit.call(this)
    }, setOpacityModifyRGB: function (value) {
    }, isOpacityModifyRGB: function () {
        return false
    }, _itemForTouch: function (touch) {
        var touchLocation = touch.getLocation();
        var itemChildren = this._children, locItemChild;
        if (itemChildren && itemChildren.length > 0)for (var i = 0; i < itemChildren.length; i++) {
            locItemChild = itemChildren[i];
            if (locItemChild.isVisible() && locItemChild.isEnabled()) {
                var local = locItemChild.convertToNodeSpace(touchLocation);
                var r = locItemChild.rect();
                r.x = 0;
                r.y = 0;
                if (cc.rectContainsPoint(r, local))return locItemChild
            }
        }
        return null
    }});
var _p = cc.Menu.prototype;
_p.enabled;
cc.Menu.create = function (menuItems) {
    var argc = arguments.length;
    if (argc > 0 && arguments[argc - 1] == null)cc.log("parameters should not be ending with null in Javascript");
    var ret;
    if (argc == 0)ret = new cc.Menu; else if (argc == 1)ret = new cc.Menu(menuItems); else ret = new cc.Menu(Array.prototype.slice.call(arguments, 0));
    return ret
};