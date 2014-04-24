var PROPERTY_POSITION = "position";
var PROPERTY_CONTENTSIZE = "contentSize";
var PROPERTY_SKEW = "skew";
var PROPERTY_ANCHORPOINT = "anchorPoint";
var PROPERTY_SCALE = "scale";
var PROPERTY_ROTATION = "rotation";
var PROPERTY_TAG = "tag";
var PROPERTY_IGNOREANCHORPOINTFORPOSITION = "ignoreAnchorPointForPosition";
var PROPERTY_VISIBLE = "visible";
var ASSERT_FAIL_UNEXPECTED_PROPERTY = function (propertyName) {
    cc.log("Unexpected property: '" + propertyName + "'!")
};
var ASSERT_FAIL_UNEXPECTED_PROPERTYTYPE = function (propertyName) {
    cc.log("Unexpected property type: '" + propertyName + "'!")
};
function BlockData(selMenuHander, target) {
    this.selMenuHander = selMenuHander;
    this.target = target
}
function BlockCCControlData(selCCControlHandler, target, controlEvents) {
    this.selCCControlHandler = selCCControlHandler;
    this.target = target;
    this.controlEvents = controlEvents
}
cc.NodeLoader = cc.Class.extend({_customProperties: null, ctor: function () {
    this._customProperties = new cc._Dictionary
}, loadCCNode: function (parent, ccbReader) {
    return this._createCCNode(parent, ccbReader)
}, parseProperties: function (node, parent, ccbReader) {
    var numRegularProps = ccbReader.readInt(false);
    var numExturaProps = ccbReader.readInt(false);
    var propertyCount = numRegularProps + numExturaProps;
    for (var i = 0; i < propertyCount; i++) {
        var isExtraProp = i >= numRegularProps;
        var type = ccbReader.readInt(false);
        var propertyName =
            ccbReader.readCachedString();
        var setProp = false;
        var platform = ccbReader.readByte();
        if (platform === CCB_PLATFORM_ALL || platform === CCB_PLATFORM_IOS || platform === CCB_PLATFORM_MAC)setProp = true;
        if (node instanceof cc.BuilderFile) {
            if (node.getCCBFileNode() && isExtraProp) {
                node = node.getCCBFileNode();
                var getExtraPropsNames = node.userObject;
                setProp = getExtraPropsNames.indexOf(propertyName) != -1
            }
        } else if (isExtraProp && node == ccbReader.getAnimationManager().getRootNode()) {
            var extraPropsNames = node.userObject;
            if (!extraPropsNames) {
                extraPropsNames =
                    [];
                node.userObject = extraPropsNames
            }
            extraPropsNames.push(propertyName)
        }
        switch (type) {
            case CCB_PROPTYPE_POSITION:
                var position = this.parsePropTypePosition(node, parent, ccbReader, propertyName);
                if (setProp)this.onHandlePropTypePosition(node, parent, propertyName, position, ccbReader);
                break;
            case CCB_PROPTYPE_POINT:
                var point = this.parsePropTypePoint(node, parent, ccbReader);
                if (setProp)this.onHandlePropTypePoint(node, parent, propertyName, point, ccbReader);
                break;
            case CCB_PROPTYPE_POINTLOCK:
                var pointLock = this.parsePropTypePointLock(node,
                    parent, ccbReader);
                if (setProp)this.onHandlePropTypePointLock(node, parent, propertyName, pointLock, ccbReader);
                break;
            case CCB_PROPTYPE_SIZE:
                var size = this.parsePropTypeSize(node, parent, ccbReader);
                if (setProp)this.onHandlePropTypeSize(node, parent, propertyName, size, ccbReader);
                break;
            case CCB_PROPTYPE_SCALELOCK:
                var scaleLock = this.parsePropTypeScaleLock(node, parent, ccbReader, propertyName);
                if (setProp)this.onHandlePropTypeScaleLock(node, parent, propertyName, scaleLock, ccbReader);
                break;
            case CCB_PROPTYPE_FLOATXY:
                var xy =
                    this.parsePropTypeFloatXY(node, parent, ccbReader);
                if (setProp)this.onHandlePropTypeFloatXY(node, parent, propertyName, xy, ccbReader);
                break;
            case CCB_PROPTYPE_FLOAT:
                var f = this.parsePropTypeFloat(node, parent, ccbReader);
                if (setProp)this.onHandlePropTypeFloat(node, parent, propertyName, f, ccbReader);
                break;
            case CCB_PROPTYPE_DEGREES:
                var degrees = this.parsePropTypeDegrees(node, parent, ccbReader, propertyName);
                if (setProp)this.onHandlePropTypeDegrees(node, parent, propertyName, degrees, ccbReader);
                break;
            case CCB_PROPTYPE_FLOATSCALE:
                var floatScale =
                    this.parsePropTypeFloatScale(node, parent, ccbReader);
                if (setProp)this.onHandlePropTypeFloatScale(node, parent, propertyName, floatScale, ccbReader);
                break;
            case CCB_PROPTYPE_INTEGER:
                var integer = this.parsePropTypeInteger(node, parent, ccbReader);
                if (setProp)this.onHandlePropTypeInteger(node, parent, propertyName, integer, ccbReader);
                break;
            case CCB_PROPTYPE_INTEGERLABELED:
                var integerLabeled = this.parsePropTypeIntegerLabeled(node, parent, ccbReader);
                if (setProp)this.onHandlePropTypeIntegerLabeled(node, parent, propertyName,
                    integerLabeled, ccbReader);
                break;
            case CCB_PROPTYPE_FLOATVAR:
                var floatVar = this.parsePropTypeFloatVar(node, parent, ccbReader);
                if (setProp)this.onHandlePropTypeFloatVar(node, parent, propertyName, floatVar, ccbReader);
                break;
            case CCB_PROPTYPE_CHECK:
                var check = this.parsePropTypeCheck(node, parent, ccbReader, propertyName);
                if (setProp)this.onHandlePropTypeCheck(node, parent, propertyName, check, ccbReader);
                break;
            case CCB_PROPTYPE_SPRITEFRAME:
                var ccSpriteFrame = this.parsePropTypeSpriteFrame(node, parent, ccbReader, propertyName);
                if (setProp)this.onHandlePropTypeSpriteFrame(node, parent, propertyName, ccSpriteFrame, ccbReader);
                break;
            case CCB_PROPTYPE_ANIMATION:
                var ccAnimation = this.parsePropTypeAnimation(node, parent, ccbReader);
                if (setProp)this.onHandlePropTypeAnimation(node, parent, propertyName, ccAnimation, ccbReader);
                break;
            case CCB_PROPTYPE_TEXTURE:
                var ccTexture2D = this.parsePropTypeTexture(node, parent, ccbReader);
                if (setProp)this.onHandlePropTypeTexture(node, parent, propertyName, ccTexture2D, ccbReader);
                break;
            case CCB_PROPTYPE_BYTE:
                var byteValue =
                    this.parsePropTypeByte(node, parent, ccbReader, propertyName);
                if (setProp)this.onHandlePropTypeByte(node, parent, propertyName, byteValue, ccbReader);
                break;
            case CCB_PROPTYPE_COLOR3:
                var color = this.parsePropTypeColor3(node, parent, ccbReader, propertyName);
                if (setProp)this.onHandlePropTypeColor3(node, parent, propertyName, color, ccbReader);
                break;
            case CCB_PROPTYPE_COLOR4VAR:
                var color4FVar = this.parsePropTypeColor4FVar(node, parent, ccbReader);
                if (setProp)this.onHandlePropTypeColor4FVar(node, parent, propertyName, color4FVar,
                    ccbReader);
                break;
            case CCB_PROPTYPE_FLIP:
                var flip = this.parsePropTypeFlip(node, parent, ccbReader);
                if (setProp)this.onHandlePropTypeFlip(node, parent, propertyName, flip, ccbReader);
                break;
            case CCB_PROPTYPE_BLENDMODE:
                var blendFunc = this.parsePropTypeBlendFunc(node, parent, ccbReader);
                if (setProp)this.onHandlePropTypeBlendFunc(node, parent, propertyName, blendFunc, ccbReader);
                break;
            case CCB_PROPTYPE_FNTFILE:
                var fntFile = ccbReader.getCCBRootPath() + this.parsePropTypeFntFile(node, parent, ccbReader);
                if (setProp)this.onHandlePropTypeFntFile(node,
                    parent, propertyName, fntFile, ccbReader);
                break;
            case CCB_PROPTYPE_FONTTTF:
                var fontTTF = this.parsePropTypeFontTTF(node, parent, ccbReader);
                if (setProp)this.onHandlePropTypeFontTTF(node, parent, propertyName, fontTTF, ccbReader);
                break;
            case CCB_PROPTYPE_STRING:
                var stringValue = this.parsePropTypeString(node, parent, ccbReader);
                if (setProp)this.onHandlePropTypeString(node, parent, propertyName, stringValue, ccbReader);
                break;
            case CCB_PROPTYPE_TEXT:
                var textValue = this.parsePropTypeText(node, parent, ccbReader);
                if (setProp)this.onHandlePropTypeText(node,
                    parent, propertyName, textValue, ccbReader);
                break;
            case CCB_PROPTYPE_BLOCK:
                var blockData = this.parsePropTypeBlock(node, parent, ccbReader);
                if (setProp)this.onHandlePropTypeBlock(node, parent, propertyName, blockData, ccbReader);
                break;
            case CCB_PROPTYPE_BLOCKCCCONTROL:
                var blockCCControlData = this.parsePropTypeBlockCCControl(node, parent, ccbReader);
                if (setProp && blockCCControlData != null)this.onHandlePropTypeBlockCCControl(node, parent, propertyName, blockCCControlData, ccbReader);
                break;
            case CCB_PROPTYPE_CCBFILE:
                var ccbFileNode =
                    this.parsePropTypeCCBFile(node, parent, ccbReader);
                if (setProp)this.onHandlePropTypeCCBFile(node, parent, propertyName, ccbFileNode, ccbReader);
                break;
            default:
                ASSERT_FAIL_UNEXPECTED_PROPERTYTYPE(type);
                break
        }
    }
}, getCustomProperties: function () {
    return this._customProperties
}, _createCCNode: function (parent, ccbReader) {
    return cc.Node.create()
}, parsePropTypePosition: function (node, parent, ccbReader, propertyName) {
    var x = ccbReader.readFloat();
    var y = ccbReader.readFloat();
    var type = ccbReader.readInt(false);
    var containerSize =
        ccbReader.getAnimationManager().getContainerSize(parent);
    var pt = cc._getAbsolutePosition(x, y, type, containerSize, propertyName);
    node.setPosition(cc.getAbsolutePosition(pt, type, containerSize, propertyName));
    if (ccbReader.getAnimatedProperties().indexOf(propertyName) > -1) {
        var baseValue = [x, y, type];
        ccbReader.getAnimationManager().setBaseValue(baseValue, node, propertyName)
    }
    return pt
}, parsePropTypePoint: function (node, parent, ccbReader) {
    var x = ccbReader.readFloat();
    var y = ccbReader.readFloat();
    return cc.p(x, y)
}, parsePropTypePointLock: function (node, parent, ccbReader) {
    var x = ccbReader.readFloat();
    var y = ccbReader.readFloat();
    return cc.p(x, y)
}, parsePropTypeSize: function (node, parent, ccbReader) {
    var width = ccbReader.readFloat();
    var height = ccbReader.readFloat();
    var type = ccbReader.readInt(false);
    var containerSize = ccbReader.getAnimationManager().getContainerSize(parent);
    switch (type) {
        case CCB_SIZETYPE_ABSOLUTE:
            break;
        case CCB_SIZETYPE_RELATIVE_CONTAINER:
            width = containerSize.width - width;
            height = containerSize.height - height;
            break;
        case CCB_SIZETYPE_PERCENT:
            width =
                containerSize.width * width / 100;
            height = containerSize.height * height / 100;
            break;
        case CCB_SIZETYPE_HORIZONTAL_PERCENT:
            width = containerSize.width * width / 100;
            break;
        case CCB_SIZETYPE_VERTICAL_PERCENT:
            height = containerSize.height * height / 100;
            break;
        case CCB_SIZETYPE_MULTIPLY_RESOLUTION:
            var resolutionScale = cc.BuilderReader.getResolutionScale();
            width *= resolutionScale;
            height *= resolutionScale;
            break;
        default:
            cc.log("Unknown CCB type.");
            break
    }
    return cc.size(width, height)
}, parsePropTypeScaleLock: function (node, parent, ccbReader, propertyName) {
    var x = ccbReader.readFloat();
    var y = ccbReader.readFloat();
    var type = ccbReader.readInt(false);
    cc.setRelativeScale(node, x, y, type, propertyName);
    if (ccbReader.getAnimatedProperties().indexOf(propertyName) > -1)ccbReader.getAnimationManager().setBaseValue([x, y, type], node, propertyName);
    if (type == CCB_SCALETYPE_MULTIPLY_RESOLUTION) {
        x *= cc.BuilderReader.getResolutionScale();
        y *= cc.BuilderReader.getResolutionScale()
    }
    return[x, y]
}, parsePropTypeFloat: function (node, parent, ccbReader) {
    return ccbReader.readFloat()
},
    parsePropTypeDegrees: function (node, parent, ccbReader, propertyName) {
        var ret = ccbReader.readFloat();
        if (ccbReader.getAnimatedProperties().indexOf(propertyName) > -1)ccbReader.getAnimationManager().setBaseValue(ret, node, propertyName);
        return ret
    }, parsePropTypeFloatScale: function (node, parent, ccbReader) {
        var f = ccbReader.readFloat();
        var type = ccbReader.readInt(false);
        if (type == CCB_SCALETYPE_MULTIPLY_RESOLUTION)f *= cc.BuilderReader.getResolutionScale();
        return f
    }, parsePropTypeInteger: function (node, parent, ccbReader) {
        return ccbReader.readInt(true)
    },
    parsePropTypeIntegerLabeled: function (node, parent, ccbReader) {
        return ccbReader.readInt(true)
    }, parsePropTypeFloatVar: function (node, parent, ccbReader) {
        var f = ccbReader.readFloat();
        var fVar = ccbReader.readFloat();
        return[f, fVar]
    }, parsePropTypeCheck: function (node, parent, ccbReader, propertyName) {
        var ret = ccbReader.readBool();
        if (ccbReader.getAnimatedProperties().indexOf(propertyName) > -1)ccbReader.getAnimationManager().setBaseValue(ret, node, propertyName);
        return ret
    }, parsePropTypeSpriteFrame: function (node, parent, ccbReader, propertyName) {
        var spriteSheet = ccbReader.readCachedString();
        var spriteFile = ccbReader.readCachedString();
        var spriteFrame;
        if (spriteFile != null && spriteFile.length != 0) {
            if (spriteSheet.length == 0) {
                spriteFile = ccbReader.getCCBRootPath() + spriteFile;
                var texture = cc.textureCache.addImage(spriteFile);
                var locContentSize = texture.getContentSize();
                var bounds = cc.rect(0, 0, locContentSize.width, locContentSize.height);
                spriteFrame = cc.SpriteFrame.create(texture, bounds)
            } else {
                var frameCache = cc.spriteFrameCache;
                spriteSheet =
                    ccbReader.getCCBRootPath() + spriteSheet;
                if (ccbReader.getLoadedSpriteSheet().indexOf(spriteSheet) == -1) {
                    frameCache.addSpriteFrames(spriteSheet);
                    ccbReader.getLoadedSpriteSheet().push(spriteSheet)
                }
                spriteFrame = frameCache.getSpriteFrame(spriteFile)
            }
            if (ccbReader.getAnimatedProperties().indexOf(propertyName) > -1)ccbReader.getAnimationManager().setBaseValue(spriteFrame, node, propertyName)
        }
        return spriteFrame
    }, parsePropTypeAnimation: function (node, parent, ccbReader) {
        var animationFile = ccbReader.getCCBRootPath() + ccbReader.readCachedString();
        var animation = ccbReader.readCachedString();
        var ccAnimation = null;
        animation = cc.BuilderReader.lastPathComponent(animation);
        animationFile = cc.BuilderReader.lastPathComponent(animationFile);
        if (animation != null && animation != "") {
            var animationCache = cc.animationCache;
            animationCache.addAnimations(animationFile);
            ccAnimation = animationCache.getAnimation(animation)
        }
        return ccAnimation
    }, parsePropTypeTexture: function (node, parent, ccbReader) {
        var spriteFile = ccbReader.getCCBRootPath() + ccbReader.readCachedString();
        if (spriteFile !=
            "")return cc.textureCache.addImage(spriteFile);
        return null
    }, parsePropTypeByte: function (node, parent, ccbReader, propertyName) {
        var ret = ccbReader.readByte();
        if (ccbReader.getAnimatedProperties().indexOf(propertyName) > -1)ccbReader.getAnimationManager().setBaseValue(ret, node, propertyName);
        return ret
    }, parsePropTypeColor3: function (node, parent, ccbReader, propertyName) {
        var red = ccbReader.readByte();
        var green = ccbReader.readByte();
        var blue = ccbReader.readByte();
        var color = {r: red, g: green, b: blue};
        if (ccbReader.getAnimatedProperties().indexOf(propertyName) > -1)ccbReader.getAnimationManager().setBaseValue(cc.Color3BWapper.create(color), node, propertyName);
        return color
    }, parsePropTypeColor4FVar: function (node, parent, ccbReader) {
        var red = 0 | ccbReader.readFloat() * 255;
        var green = 0 | ccbReader.readFloat() * 255;
        var blue = 0 | ccbReader.readFloat() * 255;
        var alpha = ccbReader.readFloat();
        alpha = alpha <= 1 ? 0 | alpha * 255 : alpha;
        var redVar = 0 | ccbReader.readFloat() * 255;
        var greenVar = 0 | ccbReader.readFloat() * 255;
        var blueVar = 0 | ccbReader.readFloat() * 255;
        var alphaVar = ccbReader.readFloat();
        alphaVar =
                alphaVar <= 1 ? 0 | alphaVar * 255 : alphaVar;
        var colors = [];
        colors[0] = {r: red, g: green, b: blue, a: alpha};
        colors[1] = {r: redVar, g: greenVar, b: blueVar, a: alphaVar};
        return colors
    }, parsePropTypeFlip: function (node, parent, ccbReader) {
        var flipX = ccbReader.readBool();
        var flipY = ccbReader.readBool();
        return[flipX, flipY]
    }, parsePropTypeBlendFunc: function (node, parent, ccbReader) {
        var source = ccbReader.readInt(false);
        var destination = ccbReader.readInt(false);
        return new cc.BlendFunc(source, destination)
    }, parsePropTypeFntFile: function (node, parent, ccbReader) {
        return ccbReader.readCachedString()
    }, parsePropTypeString: function (node, parent, ccbReader) {
        return ccbReader.readCachedString()
    }, parsePropTypeText: function (node, parent, ccbReader) {
        return ccbReader.readCachedString()
    }, parsePropTypeFontTTF: function (node, parent, ccbReader) {
        return ccbReader.readCachedString()
    }, parsePropTypeBlock: function (node, parent, ccbReader) {
        var selectorName = ccbReader.readCachedString();
        var selectorTarget = ccbReader.readInt(false);
        if (selectorTarget !== CCB_TARGETTYPE_NONE) {
            var target =
                null;
            if (!ccbReader.isJSControlled()) {
                if (selectorTarget === CCB_TARGETTYPE_DOCUMENTROOT)target = ccbReader.getAnimationManager().getRootNode(); else if (selectorTarget === CCB_TARGETTYPE_OWNER)target = ccbReader.getOwner();
                if (target != null)if (selectorName.length > 0) {
                    var selMenuHandler = 0;
                    if (target != null && target.onResolveCCBCCMenuItemSelector)selMenuHandler = target.onResolveCCBCCMenuItemSelector(target, selectorName);
                    if (selMenuHandler == 0) {
                        var ccbSelectorResolver = ccbReader.getCCBSelectorResolver();
                        if (ccbSelectorResolver !=
                            null)selMenuHandler = ccbSelectorResolver.onResolveCCBCCMenuItemSelector(target, selectorName)
                    }
                    if (selMenuHandler == 0)cc.log("Skipping selector '" + selectorName + "' since no CCBSelectorResolver is present."); else return new BlockData(selMenuHandler, target)
                } else cc.log("Unexpected empty selector."); else cc.log("Unexpected NULL target for selector.")
            } else if (selectorTarget === CCB_TARGETTYPE_DOCUMENTROOT) {
                ccbReader.addDocumentCallbackNode(node);
                ccbReader.addDocumentCallbackName(selectorName);
                ccbReader.addDocumentCallbackControlEvents(0)
            } else {
                ccbReader.addOwnerCallbackNode(node);
                ccbReader.addOwnerCallbackName(selectorName);
                ccbReader.addOwnerCallbackControlEvents(0)
            }
        }
        return null
    }, parsePropTypeBlockCCControl: function (node, parent, ccbReader) {
        var selectorName = ccbReader.readCachedString();
        var selectorTarget = ccbReader.readInt(false);
        var controlEvents = ccbReader.readInt(false);
        if (selectorTarget !== CCB_TARGETTYPE_NONE)if (!ccbReader.isJSControlled()) {
            var target = null;
            if (selectorTarget == CCB_TARGETTYPE_DOCUMENTROOT)target = ccbReader.getAnimationManager().getRootNode(); else if (selectorTarget ==
                CCB_TARGETTYPE_OWNER)target = ccbReader.getOwner();
            if (target != null)if (selectorName.length > 0) {
                var selCCControlHandler = 0;
                if (target != null && target.onResolveCCBCCControlSelector)selCCControlHandler = target.onResolveCCBCCControlSelector(target, selectorName);
                if (selCCControlHandler == 0) {
                    var ccbSelectorResolver = ccbReader.getCCBSelectorResolver();
                    if (ccbSelectorResolver != null)selCCControlHandler = ccbSelectorResolver.onResolveCCBCCControlSelector(target, selectorName)
                }
                if (selCCControlHandler == 0)cc.log("Skipping selector '" +
                    selectorName + "' since no CCBSelectorResolver is present."); else return new BlockCCControlData(selCCControlHandler, target, controlEvents)
            } else cc.log("Unexpected empty selector."); else cc.log("Unexpected NULL target for selector.")
        } else if (selectorTarget == CCB_TARGETTYPE_DOCUMENTROOT) {
            ccbReader.addDocumentCallbackNode(node);
            ccbReader.addDocumentCallbackName(selectorName);
            ccbReader.addDocumentCallbackControlEvents(controlEvents)
        } else {
            ccbReader.addOwnerCallbackNode(node);
            ccbReader.addOwnerCallbackName(selectorName);
            ccbReader.addOwnerCallbackControlEvents(controlEvents)
        }
        return null
    }, parsePropTypeCCBFile: function (node, parent, ccbReader) {
        var ccbFileName = ccbReader.getCCBRootPath() + ccbReader.readCachedString();
        var ccbFileWithoutPathExtension = cc.BuilderReader.deletePathExtension(ccbFileName);
        ccbFileName = ccbFileWithoutPathExtension + ".ccbi";
        var myCCBReader = new cc.BuilderReader(ccbReader);
        var bytes = cc.loader.getRes(ccbFileName);
        if (!bytes) {
            var realUrl = cc.loader.getUrl(ccbFileName);
            bytes = cc.loader.loadBinarySync(realUrl);
            cc.loader.cache[ccbFileName] = bytes
        }
        myCCBReader.initWithData(bytes, ccbReader.getOwner());
        myCCBReader.getAnimationManager().setRootContainerSize(parent.getContentSize());
        myCCBReader.setAnimationManagers(ccbReader.getAnimationManagers());
        myCCBReader.getAnimationManager().setOwner(ccbReader.getOwner());
        var ccbFileNode = myCCBReader.readFileWithCleanUp(false);
        ccbReader.setAnimationManagers(myCCBReader.getAnimationManagers());
        if (ccbFileNode && myCCBReader.getAnimationManager().getAutoPlaySequenceId() != -1)myCCBReader.getAnimationManager().runAnimations(myCCBReader.getAnimationManager().getAutoPlaySequenceId(),
            0);
        return ccbFileNode
    }, parsePropTypeFloatXY: function (node, parent, ccbReader) {
        var x = ccbReader.readFloat();
        var y = ccbReader.readFloat();
        return[x, y]
    }, onHandlePropTypePosition: function (node, parent, propertyName, position, ccbReader) {
        if (propertyName === PROPERTY_POSITION)node.setPosition(position); else ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    }, onHandlePropTypePoint: function (node, parent, propertyName, position, ccbReader) {
        if (propertyName === PROPERTY_ANCHORPOINT)node.setAnchorPoint(position); else ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    },
    onHandlePropTypePointLock: function (node, parent, propertyName, pointLock, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    }, onHandlePropTypeSize: function (node, parent, propertyName, sizeValue, ccbReader) {
        if (propertyName === PROPERTY_CONTENTSIZE)node.setContentSize(sizeValue); else ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    }, onHandlePropTypeScaleLock: function (node, parent, propertyName, scaleLock, ccbReader) {
        if (propertyName === PROPERTY_SCALE) {
            node.setScaleX(scaleLock[0]);
            node.setScaleY(scaleLock[1])
        } else ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    },
    onHandlePropTypeFloatXY: function (node, parent, propertyName, xy, ccbReader) {
        if (propertyName === PROPERTY_SKEW) {
            node.setSkewX(xy[0]);
            node.setSkewY(xy[1])
        } else {
            var nameX = propertyName + "X";
            var nameY = propertyName + "Y";
            if (!node[nameX] || !node[nameY])ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
            node[nameX](xy[0]);
            node[nameY](xy[1])
        }
    }, onHandlePropTypeFloat: function (node, parent, propertyName, floatValue, ccbReader) {
        this._customProperties.setObject(floatValue, propertyName)
    }, onHandlePropTypeDegrees: function (node, parent, propertyName, degrees, ccbReader) {
        if (propertyName === PROPERTY_ROTATION)node.setRotation(degrees); else ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    }, onHandlePropTypeFloatScale: function (node, parent, propertyName, floatScale, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    }, onHandlePropTypeInteger: function (node, parent, propertyName, integer, ccbReader) {
        if (propertyName === PROPERTY_TAG)node.setTag(integer); else ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    }, onHandlePropTypeIntegerLabeled: function (node, parent, propertyName, integerLabeled, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    }, onHandlePropTypeFloatVar: function (node, parent, propertyName, floatVar, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    }, onHandlePropTypeCheck: function (node, parent, propertyName, check, ccbReader) {
        if (propertyName === PROPERTY_VISIBLE)node.setVisible(check); else if (propertyName === PROPERTY_IGNOREANCHORPOINTFORPOSITION)node.ignoreAnchorPointForPosition(check); else ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    },
    onHandlePropTypeSpriteFrame: function (node, parent, propertyName, spriteFrame, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    }, onHandlePropTypeAnimation: function (node, parent, propertyName, ccAnimation, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    }, onHandlePropTypeTexture: function (node, parent, propertyName, ccTexture2D, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    }, onHandlePropTypeByte: function (node, parent, propertyName, byteValue, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    },
    onHandlePropTypeColor3: function (node, parent, propertyName, ccColor3B, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    }, onHandlePropTypeColor4FVar: function (node, parent, propertyName, ccColor4FVar, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    }, onHandlePropTypeFlip: function (node, parent, propertyName, flip, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    }, onHandlePropTypeBlendFunc: function (node, parent, propertyName, ccBlendFunc, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    },
    onHandlePropTypeFntFile: function (node, parent, propertyName, fntFile, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    }, onHandlePropTypeString: function (node, parent, propertyName, strValue, ccbReader) {
        this._customProperties.setObject(strValue, propertyName)
    }, onHandlePropTypeText: function (node, parent, propertyName, textValue, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    }, onHandlePropTypeFontTTF: function (node, parent, propertyName, fontTTF, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    },
    onHandlePropTypeBlock: function (node, parent, propertyName, blockData, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    }, onHandlePropTypeBlockCCControl: function (node, parent, propertyName, blockCCControlData, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    }, onHandlePropTypeCCBFile: function (node, parent, propertyName, ccbFileNode, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName)
    }});
cc.NodeLoader.loader = function () {
    return new cc.NodeLoader
};
cc.NodeLoaderListener = cc.Class.extend({onNodeLoaded: function (node, nodeLoader) {
}});
cc.BuilderSelectorResolver = cc.Class.extend({onResolveCCBCCMenuItemSelector: function (target, selectorName) {
}, onResolveCCBCCCallFuncSelector: function (target, selectorName) {
}, onResolveCCBCCControlSelector: function (target, selectorName) {
}});
cc.BuilderScriptOwnerProtocol = cc.Class.extend({createNew: function () {
}});
cc.BuilderMemberVariableAssigner = cc.Class.extend({onAssignCCBMemberVariable: function (target, memberVariableName, node) {
    return false
}, onAssignCCBCustomProperty: function (target, memberVariableName, value) {
    return false
}});
var PROPERTY_CCBFILE = "ccbFile";
cc.BuilderFileLoader = cc.NodeLoader.extend({_createCCNode: function (parent, ccbReader) {
    return cc.BuilderFile.create()
}, onHandlePropTypeCCBFile: function (node, parent, propertyName, ccbFileNode, ccbReader) {
    if (propertyName == PROPERTY_CCBFILE)node.setCCBFileNode(ccbFileNode); else cc.NodeLoader.prototype.onHandlePropTypeCCBFile.call(this, node, parent, propertyName, ccbFileNode, ccbReader)
}});
cc.BuilderFileLoader.loader = function () {
    return new cc.BuilderFileLoader
};
var PROPERTY_ENABLED = "enabled";
var PROPERTY_SELECTED = "selected";
var PROPERTY_CCCONTROL = "ccControl";
cc.ControlLoader = cc.NodeLoader.extend({_createCCNode: function (parent, ccbReander) {
}, onHandlePropTypeBlockCCControl: function (node, parent, propertyName, blockCCControlData, ccbReader) {
    if (propertyName == PROPERTY_CCCONTROL)node.addTargetWithActionForControlEvents(blockCCControlData.target, blockCCControlData.selCCControlHandler, blockCCControlData.controlEvents); else cc.NodeLoader.prototype.onHandlePropTypeBlockCCControl.call(this, node, parent, propertyName, blockCCControlData, ccbReader)
}, onHandlePropTypeCheck: function (node, parent, propertyName, check, ccbReader) {
    if (propertyName == PROPERTY_ENABLED)node.setEnabled(check); else if (propertyName == PROPERTY_SELECTED)node.setSelected(check); else cc.NodeLoader.prototype.onHandlePropTypeCheck.call(this, node, parent, propertyName, check, ccbReader)
}});
var PROPERTY_ZOOMONTOUCHDOWN = "zoomOnTouchDown";
var PROPERTY_TITLE_NORMAL = "title|1";
var PROPERTY_TITLE_HIGHLIGHTED = "title|2";
var PROPERTY_TITLE_DISABLED = "title|3";
var PROPERTY_TITLECOLOR_NORMAL = "titleColor|1";
var PROPERTY_TITLECOLOR_HIGHLIGHTED = "titleColor|2";
var PROPERTY_TITLECOLOR_DISABLED = "titleColor|3";
var PROPERTY_TITLETTF_NORMAL = "titleTTF|1";
var PROPERTY_TITLETTF_HIGHLIGHTED = "titleTTF|2";
var PROPERTY_TITLETTF_DISABLED = "titleTTF|3";
var PROPERTY_TITLETTFSIZE_NORMAL = "titleTTFSize|1";
var PROPERTY_TITLETTFSIZE_HIGHLIGHTED = "titleTTFSize|2";
var PROPERTY_TITLETTFSIZE_DISABLED = "titleTTFSize|4";
var PROPERTY_LABELANCHORPOINT = "labelAnchorPoint";
var PROPERTY_PREFEREDSIZE = "preferedSize";
var PROPERTY_BACKGROUNDSPRITEFRAME_NORMAL = "backgroundSpriteFrame|1";
var PROPERTY_BACKGROUNDSPRITEFRAME_HIGHLIGHTED = "backgroundSpriteFrame|2";
var PROPERTY_BACKGROUNDSPRITEFRAME_DISABLED = "backgroundSpriteFrame|3";
cc.ControlButtonLoader = cc.ControlLoader.extend({_createCCNode: function (parent, ccbReader) {
    return cc.ControlButton.create()
}, onHandlePropTypeCheck: function (node, parent, propertyName, check, ccbReader) {
    if (propertyName == PROPERTY_ZOOMONTOUCHDOWN)node.setZoomOnTouchDown(check); else cc.ControlLoader.prototype.onHandlePropTypeCheck.call(this, node, parent, propertyName, check, ccbReader)
}, onHandlePropTypeString: function (node, parent, propertyName, stringValue, ccbReader) {
    if (propertyName == PROPERTY_TITLE_NORMAL)node.setTitleForState(stringValue,
        cc.CONTROL_STATE_NORMAL); else if (propertyName == PROPERTY_TITLE_HIGHLIGHTED)node.setTitleForState(stringValue, cc.CONTROL_STATE_HIGHLIGHTED); else if (propertyName == PROPERTY_TITLE_DISABLED)node.setTitleForState(stringValue, cc.CONTROL_STATE_DISABLED); else cc.ControlLoader.prototype.onHandlePropTypeString.call(this, node, parent, propertyName, stringValue, ccbReader)
}, onHandlePropTypeFontTTF: function (node, parent, propertyName, fontTTF, ccbReader) {
    if (propertyName == PROPERTY_TITLETTF_NORMAL)node.setTitleTTFForState(fontTTF,
        cc.CONTROL_STATE_NORMAL); else if (propertyName == PROPERTY_TITLETTF_HIGHLIGHTED)node.setTitleTTFForState(fontTTF, cc.CONTROL_STATE_HIGHLIGHTED); else if (propertyName == PROPERTY_TITLETTF_DISABLED)node.setTitleTTFForState(fontTTF, cc.CONTROL_STATE_DISABLED); else cc.ControlLoader.prototype.onHandlePropTypeFontTTF.call(this, node, parent, propertyName, fontTTF, ccbReader)
}, onHandlePropTypeFloatScale: function (node, parent, propertyName, floatScale, ccbReader) {
    if (propertyName == PROPERTY_TITLETTFSIZE_NORMAL)node.setTitleTTFSizeForState(floatScale,
        cc.CONTROL_STATE_NORMAL); else if (propertyName == PROPERTY_TITLETTFSIZE_HIGHLIGHTED)node.setTitleTTFSizeForState(floatScale, cc.CONTROL_STATE_HIGHLIGHTED); else if (propertyName == PROPERTY_TITLETTFSIZE_DISABLED)node.setTitleTTFSizeForState(floatScale, cc.CONTROL_STATE_DISABLED); else cc.ControlLoader.prototype.onHandlePropTypeFloatScale.call(this, node, parent, propertyName, floatScale, ccbReader)
}, onHandlePropTypePoint: function (node, parent, propertyName, point, ccbReader) {
    if (propertyName == PROPERTY_LABELANCHORPOINT)node.setLabelAnchorPoint(point);
    else cc.ControlLoader.prototype.onHandlePropTypePoint.call(this, node, parent, propertyName, point, ccbReader)
}, onHandlePropTypeSize: function (node, parent, propertyName, size, ccbReader) {
    if (propertyName == PROPERTY_PREFEREDSIZE)node.setPreferredSize(size); else cc.ControlLoader.prototype.onHandlePropTypeSize.call(this, node, parent, propertyName, size, ccbReader)
}, onHandlePropTypeSpriteFrame: function (node, parent, propertyName, spriteFrame, ccbReader) {
    if (propertyName == PROPERTY_BACKGROUNDSPRITEFRAME_NORMAL) {
        if (spriteFrame !=
            null)node.setBackgroundSpriteFrameForState(spriteFrame, cc.CONTROL_STATE_NORMAL)
    } else if (propertyName == PROPERTY_BACKGROUNDSPRITEFRAME_HIGHLIGHTED) {
        if (spriteFrame != null)node.setBackgroundSpriteFrameForState(spriteFrame, cc.CONTROL_STATE_HIGHLIGHTED)
    } else if (propertyName == PROPERTY_BACKGROUNDSPRITEFRAME_DISABLED) {
        if (spriteFrame != null)node.setBackgroundSpriteFrameForState(spriteFrame, cc.CONTROL_STATE_DISABLED)
    } else cc.ControlLoader.prototype.onHandlePropTypeSpriteFrame.call(this, node, parent, propertyName,
        spriteFrame, ccbReader)
}, onHandlePropTypeColor3: function (node, parent, propertyName, ccColor3B, ccbReader) {
    if (propertyName == PROPERTY_TITLECOLOR_NORMAL)node.setTitleColorForState(ccColor3B, cc.CONTROL_STATE_NORMAL); else if (propertyName == PROPERTY_TITLECOLOR_HIGHLIGHTED)node.setTitleColorForState(ccColor3B, cc.CONTROL_STATE_HIGHLIGHTED); else if (propertyName == PROPERTY_TITLECOLOR_DISABLED)node.setTitleColorForState(ccColor3B, cc.CONTROL_STATE_DISABLED); else cc.ControlLoader.prototype.onHandlePropTypeColor3.call(this,
        node, parent, propertyName, ccColor3B, ccbReader)
}});
cc.ControlButtonLoader.loader = function () {
    return new cc.ControlButtonLoader
};
var PROPERTY_CONTAINER = "container";
var PROPERTY_DIRECTION = "direction";
var PROPERTY_CLIPSTOBOUNDS = "clipsToBounds";
var PROPERTY_BOUNCES = "bounces";
var PROPERTY_SCALE = "scale";
cc.ScrollViewLoader = cc.NodeLoader.extend({_createCCNode: function (parent, ccbReader) {
    return cc.ScrollView.create()
}, onHandlePropTypeSize: function (node, parent, propertyName, size, ccbReader) {
    if (propertyName == PROPERTY_CONTENTSIZE)node.setViewSize(size); else cc.NodeLoader.prototype.onHandlePropTypeSize.call(this, node, parent, propertyName, size, ccbReader)
}, onHandlePropTypeCCBFile: function (node, parent, propertyName, ccbFileNode, ccbReader) {
    if (propertyName == PROPERTY_CONTAINER) {
        node.setContainer(ccbFileNode);
        node.updateInset()
    } else cc.NodeLoader.prototype.onHandlePropTypeCCBFile.call(this,
        node, parent, propertyName, ccbFileNode, ccbReader)
}, onHandlePropTypeCheck: function (node, parent, propertyName, check, ccbReader) {
    if (propertyName == PROPERTY_CLIPSTOBOUNDS)node.setClippingToBounds(check); else if (propertyName == PROPERTY_BOUNCES)node.setBounceable(check); else cc.NodeLoader.prototype.onHandlePropTypeCheck.call(this, node, parent, propertyName, check, ccbReader)
}, onHandlePropTypeFloat: function (node, parent, propertyName, floatValue, ccbReader) {
    if (propertyName == PROPERTY_SCALE)node.setScale(floatValue); else cc.NodeLoader.prototype.onHandlePropTypeFloat.call(this,
        node, parent, propertyName, floatValue, ccbReader)
}, onHandlePropTypeIntegerLabeled: function (node, parent, propertyName, integerLabeled, ccbReader) {
    if (propertyName == PROPERTY_DIRECTION)node.setDirection(integerLabeled); else cc.NodeLoader.prototype.onHandlePropTypeIntegerLabeled.call(this, node, parent, propertyName, integerLabeled, ccbReader)
}});
cc.ScrollViewLoader.loader = function () {
    return new cc.ScrollViewLoader
};
var PROPERTY_CONTENTSIZE = "contentSize";
var PROPERTY_SPRITEFRAME = "spriteFrame";
var PROPERTY_COLOR = "color";
var PROPERTY_OPACITY = "opacity";
var PROPERTY_BLENDFUNC = "blendFunc";
var PROPERTY_INSETLEFT = "insetLeft";
var PROPERTY_INSETTOP = "insetTop";
var PROPERTY_INSETRIGHT = "insetRight";
var PROPERTY_INSETBOTTOM = "insetBottom";
cc.Scale9SpriteLoader = cc.NodeLoader.extend({_createCCNode: function (parent, ccbReader) {
    var sprite = cc.Scale9Sprite.create();
    sprite.setAnchorPoint(0, 0);
    return sprite
}, onHandlePropTypeColor3: function (node, parent, propertyName, ccColor3B, ccbReader) {
    if (propertyName == PROPERTY_COLOR) {
        if (ccColor3B.r !== 255 || ccColor3B.g !== 255 || ccColor3B.b !== 255)node.setColor(ccColor3B)
    } else cc.NodeLoader.prototype.onHandlePropTypeColor3.call(this, node, parent, propertyName, ccColor3B, ccbReader)
}, onHandlePropTypeByte: function (node, parent, propertyName, byteValue, ccbReader) {
    if (propertyName == PROPERTY_OPACITY)node.setOpacity(byteValue); else cc.NodeLoader.prototype.onHandlePropTypeByte.call(this, node, parent, propertyName, byteValue, ccbReader)
}, onHandlePropTypeBlendFunc: function (node, parent, propertyName, ccBlendFunc, ccbReader) {
    if (propertyName == PROPERTY_BLENDFUNC); else cc.NodeLoader.prototype.onHandlePropTypeBlendFunc.call(this, node, parent, propertyName, ccBlendFunc, ccbReader)
}, onHandlePropTypeSpriteFrame: function (node, parent, propertyName, spriteFrame, ccbReader) {
    if (propertyName == PROPERTY_SPRITEFRAME)node.setSpriteFrame(spriteFrame); else cc.NodeLoader.prototype.onHandlePropTypeSpriteFrame.call(this, node, parent, propertyName, spriteFrame, ccbReader)
}, onHandlePropTypeSize: function (node, parent, propertyName, size, ccbReader) {
    if (propertyName == PROPERTY_CONTENTSIZE); else if (propertyName == PROPERTY_PREFEREDSIZE)node.setPreferredSize(size); else cc.NodeLoader.prototype.onHandlePropTypeSize.call(this, node, parent, propertyName, size, ccbReader)
}, onHandlePropTypeFloat: function (node, parent, propertyName, floatValue, ccbReader) {
    if (propertyName == PROPERTY_INSETLEFT)node.setInsetLeft(floatValue); else if (propertyName == PROPERTY_INSETTOP)node.setInsetTop(floatValue); else if (propertyName == PROPERTY_INSETRIGHT)node.setInsetRight(floatValue); else if (propertyName == PROPERTY_INSETBOTTOM)node.setInsetBottom(floatValue); else cc.NodeLoader.prototype.onHandlePropTypeFloat.call(this, node, parent, propertyName, floatValue, ccbReader)
}});
cc.Scale9SpriteLoader.loader = function () {
    return new cc.Scale9SpriteLoader
};
var PROPERTY_FLIP = "flip";
var PROPERTY_DISPLAYFRAME = "displayFrame";
var PROPERTY_COLOR = "color";
var PROPERTY_OPACITY = "opacity";
var PROPERTY_BLENDFUNC = "blendFunc";
cc.SpriteLoader = cc.NodeLoader.extend({_createCCNode: function (parent, ccbReader) {
    return cc.Sprite.create()
}, onHandlePropTypeColor3: function (node, parent, propertyName, ccColor3B, ccbReader) {
    if (propertyName === PROPERTY_COLOR) {
        if (ccColor3B.r !== 255 || ccColor3B.g !== 255 || ccColor3B.b !== 255)node.setColor(ccColor3B)
    } else cc.NodeLoader.prototype.onHandlePropTypeColor3.call(this, node, parent, propertyName, ccColor3B, ccbReader)
}, onHandlePropTypeByte: function (node, parent, propertyName, byteValue, ccbReader) {
    if (propertyName ===
        PROPERTY_OPACITY)node.setOpacity(byteValue); else cc.NodeLoader.prototype.onHandlePropTypeByte.call(this, node, parent, propertyName, byteValue, ccbReader)
}, onHandlePropTypeBlendFunc: function (node, parent, propertyName, ccbBlendFunc, ccbReader) {
    if (propertyName === PROPERTY_BLENDFUNC)node.setBlendFunc(ccbBlendFunc); else cc.NodeLoader.prototype.onHandlePropTypeBlendFunc.call(this, node, parent, propertyName, ccbBlendFunc, ccbReader)
}, onHandlePropTypeSpriteFrame: function (node, parent, propertyName, ccSpriteFrame, ccbReader) {
    if (propertyName ===
        PROPERTY_DISPLAYFRAME)if (ccSpriteFrame)node.setSpriteFrame(ccSpriteFrame); else cc.log("ERROR: SpriteFrame is null"); else cc.NodeLoader.prototype.onHandlePropTypeSpriteFrame.call(this, node, parent, propertyName, ccSpriteFrame, ccbReader)
}, onHandlePropTypeFlip: function (node, parent, propertyName, flip, ccbReader) {
    if (propertyName === PROPERTY_FLIP) {
        node.setFlippedX(flip[0]);
        node.setFlippedY(flip[1])
    } else cc.NodeLoader.prototype.onHandlePropTypeFlip.call(this, node, parent, propertyName, flip, ccbReader)
}});
cc.SpriteLoader.loader = function () {
    return new cc.SpriteLoader
};
var PROPERTY_TOUCH_ENABLED = "touchEnabled";
var PROPERTY_IS_TOUCH_ENABLED = "isTouchEnabled";
var PROPERTY_ACCELEROMETER_ENABLED = "accelerometerEnabled";
var PROPERTY_IS_ACCELEROMETER_ENABLED = "isAccelerometerEnabled";
var PROPERTY_IS_MOUSE_ENABLED = "isMouseEnabled";
var PROPERTY_MOUSE_ENABLED = "mouseEnabled";
var PROPERTY_KEYBOARD_ENABLED = "keyboardEnabled";
var PROPERTY_IS_KEYBOARD_ENABLED = "isKeyboardEnabled";
cc.LayerLoader = cc.NodeLoader.extend({_createCCNode: function (parent, ccbReader) {
    var layer = cc.Layer.create();
    layer.setContentSize(0, 0);
    return layer
}, onHandlePropTypeCheck: function (node, parent, propertyName, check, ccbReader) {
    if (propertyName === PROPERTY_TOUCH_ENABLED || propertyName === PROPERTY_IS_TOUCH_ENABLED); else if (propertyName === PROPERTY_ACCELEROMETER_ENABLED || propertyName === PROPERTY_IS_ACCELEROMETER_ENABLED); else if (propertyName === PROPERTY_MOUSE_ENABLED || propertyName === PROPERTY_IS_MOUSE_ENABLED); else if (propertyName ===
        PROPERTY_KEYBOARD_ENABLED || propertyName === PROPERTY_IS_KEYBOARD_ENABLED)if (node.setKeyboardEnabled && !cc.sys.isNative)node.setKeyboardEnabled(check); else cc.log("The property '" + PROPERTY_IS_KEYBOARD_ENABLED + "' is not supported!"); else cc.NodeLoader.prototype.onHandlePropTypeCheck.call(this, node, parent, propertyName, check, ccbReader)
}});
cc.LayerLoader.loader = function () {
    return new cc.LayerLoader
};
cc.LayerColorLoader = cc.LayerLoader.extend({_createCCNode: function (parent, ccbReader) {
    return cc.LayerColor.create()
}, onHandlePropTypeColor3: function (node, parent, propertyName, ccColor3B, ccbReader) {
    if (propertyName === PROPERTY_COLOR)node.setColor(ccColor3B); else cc.LayerLoader.prototype.onHandlePropTypeColor3.call(this, node, parent, propertyName, ccColor3B, ccbReader)
}, onHandlePropTypeByte: function (node, parent, propertyName, byteValue, ccbReader) {
    if (propertyName === PROPERTY_OPACITY)node.setOpacity(byteValue); else cc.LayerLoader.prototype.onHandlePropTypeByte.call(this,
        node, parent, propertyName, byteValue, ccbReader)
}, onHandlePropTypeBlendFunc: function (node, parent, propertyName, ccBlendFunc, ccbReader) {
    if (propertyName === PROPERTY_BLENDFUNC)node.setBlendFunc(ccBlendFunc); else cc.LayerLoader.prototype.onHandlePropTypeBlendFunc.call(this, node, parent, propertyName, ccBlendFunc, ccbReader)
}});
cc.LayerColorLoader.loader = function () {
    return new cc.LayerColorLoader
};
var PROPERTY_STARTCOLOR = "startColor";
var PROPERTY_ENDCOLOR = "endColor";
var PROPERTY_STARTOPACITY = "startOpacity";
var PROPERTY_ENDOPACITY = "endOpacity";
var PROPERTY_VECTOR = "vector";
cc.LayerGradientLoader = cc.LayerLoader.extend({_createCCNode: function (parent, ccbReader) {
    return cc.LayerGradient.create()
}, onHandlePropTypeColor3: function (node, parent, propertyName, ccColor3B, ccbReader) {
    if (propertyName === PROPERTY_STARTCOLOR)node.setStartColor(ccColor3B); else if (propertyName == PROPERTY_ENDCOLOR)node.setEndColor(ccColor3B); else cc.LayerLoader.prototype.onHandlePropTypeColor3.call(this, node, parent, propertyName, ccColor3B, ccbReader)
}, onHandlePropTypeByte: function (node, parent, propertyName, byteValue, ccbReader) {
    if (propertyName === PROPERTY_STARTOPACITY)node.setStartOpacity(byteValue); else if (propertyName === PROPERTY_ENDOPACITY)node.setEndOpacity(byteValue); else cc.LayerLoader.prototype.onHandlePropTypeByte.call(this, node, parent, propertyName, byteValue, ccbReader)
}, onHandlePropTypePoint: function (node, parent, propertyName, point, ccbReader) {
    if (propertyName === PROPERTY_VECTOR)node.setVector(point); else cc.LayerLoader.prototype.onHandlePropTypePoint.call(this, node, parent, propertyName, point, ccbReader)
}, onHandlePropTypeBlendFunc: function (node, parent, propertyName, ccBlendFunc, ccbReader) {
    if (propertyName === PROPERTY_BLENDFUNC)node.setBlendFunc(ccBlendFunc); else cc.LayerLoader.prototype.onHandlePropTypeBlendFunc.call(this, node, parent, propertyName, ccBlendFunc, ccbReader)
}});
cc.LayerGradientLoader.loader = function () {
    return new cc.LayerGradientLoader
};
cc.MenuLoader = cc.LayerLoader.extend({_createCCNode: function (parent, ccbReader) {
    var menu = cc.Menu.create();
    menu.setContentSize(0, 0);
    return menu
}});
cc.MenuLoader.loader = function () {
    return new cc.MenuLoader
};
var PROPERTY_BLOCK = "block";
var PROPERTY_ISENABLED = "isEnabled";
cc.MenuItemLoader = cc.NodeLoader.extend({_createCCNode: function (parent, ccbReader) {
    return null
}, onHandlePropTypeBlock: function (node, parent, propertyName, blockData, ccbReader) {
    if (propertyName === PROPERTY_BLOCK) {
        if (null != blockData)node.setTarget(blockData.selMenuHander, blockData.target)
    } else cc.NodeLoader.prototype.onHandlePropTypeBlock.call(this, node, parent, propertyName, blockData, ccbReader)
}, onHandlePropTypeCheck: function (node, parent, propertyName, check, ccbReader) {
    if (propertyName === PROPERTY_ISENABLED)node.setEnabled(check);
    else cc.NodeLoader.prototype.onHandlePropTypeCheck.call(this, node, parent, propertyName, check, ccbReader)
}});
var PROPERTY_NORMALDISPLAYFRAME = "normalSpriteFrame";
var PROPERTY_SELECTEDDISPLAYFRAME = "selectedSpriteFrame";
var PROPERTY_DISABLEDDISPLAYFRAME = "disabledSpriteFrame";
cc.MenuItemImageLoader = cc.MenuItemLoader.extend({_createCCNode: function (parent, ccbReader) {
    return cc.MenuItemImage.create()
}, onHandlePropTypeSpriteFrame: function (node, parent, propertyName, spriteFrame, ccbReader) {
    if (propertyName === PROPERTY_NORMALDISPLAYFRAME) {
        if (spriteFrame != null)node.setNormalSpriteFrame(spriteFrame)
    } else if (propertyName === PROPERTY_SELECTEDDISPLAYFRAME) {
        if (spriteFrame != null)node.setSelectedSpriteFrame(spriteFrame)
    } else if (propertyName === PROPERTY_DISABLEDDISPLAYFRAME) {
        if (spriteFrame !=
            null)node.setDisabledSpriteFrame(spriteFrame)
    } else cc.MenuItemLoader.prototype.onHandlePropTypeSpriteFrame.call(this, node, parent, propertyName, spriteFrame, ccbReader)
}});
cc.MenuItemImageLoader.loader = function () {
    return new cc.MenuItemImageLoader
};
var PROPERTY_FONTNAME = "fontName";
var PROPERTY_FONTSIZE = "fontSize";
var PROPERTY_HORIZONTALALIGNMENT = "horizontalAlignment";
var PROPERTY_VERTICALALIGNMENT = "verticalAlignment";
var PROPERTY_STRING = "string";
var PROPERTY_DIMENSIONS = "dimensions";
cc.LabelTTFLoader = cc.NodeLoader.extend({_createCCNode: function (parent, ccbReader) {
    return cc.LabelTTF.create()
}, onHandlePropTypeColor3: function (node, parent, propertyName, ccColor3B, ccbReader) {
    if (propertyName === PROPERTY_COLOR) {
        if (ccColor3B.r !== 255 || ccColor3B.g !== 255 || ccColor3B.b !== 255)node.setColor(ccColor3B)
    } else cc.NodeLoader.prototype.onHandlePropTypeColor3.call(this, node, parent, propertyName, ccColor3B, ccbReader)
}, onHandlePropTypeByte: function (node, parent, propertyName, byteValue, ccbReader) {
    if (propertyName ===
        PROPERTY_OPACITY)node.setOpacity(byteValue); else cc.NodeLoader.prototype.onHandlePropTypeByte.call(this, node, parent, propertyName, byteValue, ccbReader)
}, onHandlePropTypeBlendFunc: function (node, parent, propertyName, ccBlendFunc, ccbReader) {
    if (propertyName === PROPERTY_BLENDFUNC)node.setBlendFunc(ccBlendFunc); else cc.NodeLoader.prototype.onHandlePropTypeBlendFunc.call(this, node, parent, propertyName, ccBlendFunc, ccbReader)
}, onHandlePropTypeFontTTF: function (node, parent, propertyName, fontTTF, ccbReader) {
    if (propertyName ===
        PROPERTY_FONTNAME)node.setFontName(fontTTF); else cc.NodeLoader.prototype.onHandlePropTypeFontTTF.call(this, node, parent, propertyName, fontTTF, ccbReader)
}, onHandlePropTypeText: function (node, parent, propertyName, textValue, ccbReader) {
    if (propertyName === PROPERTY_STRING)node.setString(textValue); else cc.NodeLoader.prototype.onHandlePropTypeText.call(this, node, parent, propertyName, textValue, ccbReader)
}, onHandlePropTypeFloatScale: function (node, parent, propertyName, floatScale, ccbReader) {
    if (propertyName === PROPERTY_FONTSIZE)node.setFontSize(floatScale);
    else cc.NodeLoader.prototype.onHandlePropTypeFloatScale.call(this, node, parent, propertyName, floatScale, ccbReader)
}, onHandlePropTypeIntegerLabeled: function (node, parent, propertyName, integerLabeled, ccbReader) {
    if (propertyName === PROPERTY_HORIZONTALALIGNMENT)node.setHorizontalAlignment(integerLabeled); else if (propertyName === PROPERTY_VERTICALALIGNMENT)node.setVerticalAlignment(integerLabeled); else cc.NodeLoader.prototype.onHandlePropTypeIntegerLabeled.call(this, node, parent, propertyName, integerLabeled, ccbReader)
},
    onHandlePropTypeSize: function (node, parent, propertyName, size, ccbReader) {
        if (propertyName === PROPERTY_DIMENSIONS)node.setDimensions(size); else cc.NodeLoader.prototype.onHandlePropTypeSize.call(this, node, parent, propertyName, size, ccbReader)
    }});
cc.LabelTTFLoader.loader = function () {
    return new cc.LabelTTFLoader
};
var PROPERTY_FNTFILE = "fntFile";
cc.LabelBMFontLoader = cc.NodeLoader.extend({_createCCNode: function (parent, ccbReader) {
    return cc.LabelBMFont.create()
}, onHandlePropTypeColor3: function (node, parent, propertyName, ccColor3B, ccbReader) {
    if (propertyName === PROPERTY_COLOR) {
        if (ccColor3B.r !== 255 || ccColor3B.g !== 255 || ccColor3B.b !== 255)node.setColor(ccColor3B)
    } else cc.NodeLoader.prototype.onHandlePropTypeColor3.call(this, node, parent, propertyName, ccColor3B, ccbReader)
}, onHandlePropTypeByte: function (node, parent, propertyName, byteValue, ccbReader) {
    if (propertyName ===
        PROPERTY_OPACITY)node.setOpacity(byteValue); else cc.NodeLoader.prototype.onHandlePropTypeByte.call(this, node, parent, propertyName, byteValue, ccbReader)
}, onHandlePropTypeBlendFunc: function (node, parent, propertyName, ccBlendFunc, ccbReader) {
    if (propertyName === PROPERTY_BLENDFUNC)node.setBlendFunc(ccBlendFunc); else cc.NodeLoader.prototype.onHandlePropTypeBlendFunc.call(this, node, parent, propertyName, ccBlendFunc, ccbReader)
}, onHandlePropTypeFntFile: function (node, parent, propertyName, fntFile, ccbReader) {
    if (propertyName ===
        PROPERTY_FNTFILE)node.setFntFile(fntFile); else cc.NodeLoader.prototype.onHandlePropTypeFntFile.call(this, node, parent, propertyName, fntFile, ccbReader)
}, onHandlePropTypeText: function (node, parent, propertyName, textValue, ccbReader) {
    if (propertyName === PROPERTY_STRING)node.setString(textValue); else cc.NodeLoader.prototype.onHandlePropTypeText.call(this, node, parent, propertyName, textValue, ccbReader)
}});
cc.LabelBMFontLoader.loader = function () {
    return new cc.LabelBMFontLoader
};
var PROPERTY_EMITERMODE = "emitterMode";
var PROPERTY_POSVAR = "posVar";
var PROPERTY_EMISSIONRATE = "emissionRate";
var PROPERTY_DURATION = "duration";
var PROPERTY_TOTALPARTICLES = "totalParticles";
var PROPERTY_LIFE = "life";
var PROPERTY_STARTSIZE = "startSize";
var PROPERTY_ENDSIZE = "endSize";
var PROPERTY_STARTSPIN = "startSpin";
var PROPERTY_ENDSPIN = "endSpin";
var PROPERTY_ANGLE = "angle";
var PROPERTY_GRAVITY = "gravity";
var PROPERTY_SPEED = "speed";
var PROPERTY_TANGENTIALACCEL = "tangentialAccel";
var PROPERTY_RADIALACCEL = "radialAccel";
var PROPERTY_TEXTURE = "texture";
var PROPERTY_STARTRADIUS = "startRadius";
var PROPERTY_ENDRADIUS = "endRadius";
var PROPERTY_ROTATEPERSECOND = "rotatePerSecond";
cc.ParticleSystemLoader = cc.NodeLoader.extend({_createCCNode: function (parent, ccbReader) {
    return cc.ParticleSystem.create()
}, onHandlePropTypeIntegerLabeled: function (node, parent, propertyName, integerLabeled, ccbReader) {
    if (propertyName === PROPERTY_EMITERMODE)node.setEmitterMode(integerLabeled); else cc.NodeLoader.prototype.onHandlePropTypeIntegerLabeled.call(this, node, parent, propertyName, integerLabeled, ccbReader)
}, onHandlePropTypePoint: function (node, parent, propertyName, point, ccbReader) {
    if (propertyName === PROPERTY_POSVAR)node.setPosVar(point);
    else if (propertyName === PROPERTY_GRAVITY)node.setGravity(point); else cc.NodeLoader.prototype.onHandlePropTypePoint.call(this, node, parent, propertyName, point, ccbReader)
}, onHandlePropTypeFloat: function (node, parent, propertyName, floatValue, ccbReader) {
    if (propertyName === PROPERTY_EMISSIONRATE)node.setEmissionRate(floatValue); else if (propertyName === PROPERTY_DURATION)node.setDuration(floatValue); else cc.NodeLoader.prototype.onHandlePropTypeFloat.call(this, node, parent, propertyName, floatValue, ccbReader)
}, onHandlePropTypeInteger: function (node, parent, propertyName, integerValue, ccbReader) {
    if (propertyName === PROPERTY_TOTALPARTICLES)node.setTotalParticles(integerValue); else cc.NodeLoader.prototype.onHandlePropTypeInteger.call(this, node, parent, propertyName, integerValue, ccbReader)
}, onHandlePropTypeFloatVar: function (node, parent, propertyName, floatVar, ccbReader) {
    if (propertyName === PROPERTY_LIFE) {
        node.setLife(floatVar[0]);
        node.setLifeVar(floatVar[1])
    } else if (propertyName === PROPERTY_STARTSIZE) {
        node.setStartSize(floatVar[0]);
        node.setStartSizeVar(floatVar[1])
    } else if (propertyName ===
        PROPERTY_ENDSIZE) {
        node.setEndSize(floatVar[0]);
        node.setEndSizeVar(floatVar[1])
    } else if (propertyName === PROPERTY_STARTSPIN) {
        node.setStartSpin(floatVar[0]);
        node.setStartSpinVar(floatVar[1])
    } else if (propertyName === PROPERTY_ENDSPIN) {
        node.setEndSpin(floatVar[0]);
        node.setEndSpinVar(floatVar[1])
    } else if (propertyName === PROPERTY_ANGLE) {
        node.setAngle(floatVar[0]);
        node.setAngleVar(floatVar[1])
    } else if (propertyName === PROPERTY_SPEED) {
        node.setSpeed(floatVar[0]);
        node.setSpeedVar(floatVar[1])
    } else if (propertyName ===
        PROPERTY_TANGENTIALACCEL) {
        node.setTangentialAccel(floatVar[0]);
        node.setTangentialAccelVar(floatVar[1])
    } else if (propertyName === PROPERTY_RADIALACCEL) {
        node.setRadialAccel(floatVar[0]);
        node.setRadialAccelVar(floatVar[1])
    } else if (propertyName === PROPERTY_STARTRADIUS) {
        node.setStartRadius(floatVar[0]);
        node.setStartRadiusVar(floatVar[1])
    } else if (propertyName === PROPERTY_ENDRADIUS) {
        node.setEndRadius(floatVar[0]);
        node.setEndRadiusVar(floatVar[1])
    } else if (propertyName === PROPERTY_ROTATEPERSECOND) {
        node.setRotatePerSecond(floatVar[0]);
        node.setRotatePerSecondVar(floatVar[1])
    } else cc.NodeLoader.prototype.onHandlePropTypeFloatVar.call(this, node, parent, propertyName, floatVar, ccbReader)
}, onHandlePropTypeColor4FVar: function (node, parent, propertyName, ccColor4FVar, ccbReader) {
    if (propertyName === PROPERTY_STARTCOLOR) {
        node.setStartColor(ccColor4FVar[0]);
        node.setStartColorVar(ccColor4FVar[1])
    } else if (propertyName === PROPERTY_ENDCOLOR) {
        node.setEndColor(ccColor4FVar[0]);
        node.setEndColorVar(ccColor4FVar[1])
    } else cc.NodeLoader.prototype.onHandlePropTypeColor4FVar.call(this,
        node, parent, propertyName, ccColor4FVar, ccbReader)
}, onHandlePropTypeBlendFunc: function (node, parent, propertyName, ccBlendFunc, ccbReader) {
    if (propertyName === PROPERTY_BLENDFUNC)node.setBlendFunc(ccBlendFunc); else cc.NodeLoader.prototype.onHandlePropTypeBlendFunc.call(this, node, parent, propertyName, ccBlendFunc, ccbReader)
}, onHandlePropTypeTexture: function (node, parent, propertyName, ccTexture2D, ccbReader) {
    if (propertyName === PROPERTY_TEXTURE)node.setTexture(ccTexture2D); else cc.NodeLoader.prototype.onHandlePropTypeTexture.call(this,
        node, parent, propertyName, ccTexture2D, ccbReader)
}});
cc.ParticleSystemLoader.loader = function () {
    return new cc.ParticleSystemLoader
};
cc.NodeLoaderLibrary = cc.Class.extend({_ccNodeLoaders: null, ctor: function () {
    this._ccNodeLoaders = {}
}, registerDefaultCCNodeLoaders: function () {
    this.registerCCNodeLoader("CCNode", cc.NodeLoader.loader());
    this.registerCCNodeLoader("CCLayer", cc.LayerLoader.loader());
    this.registerCCNodeLoader("CCLayerColor", cc.LayerColorLoader.loader());
    this.registerCCNodeLoader("CCLayerGradient", cc.LayerGradientLoader.loader());
    this.registerCCNodeLoader("CCSprite", cc.SpriteLoader.loader());
    this.registerCCNodeLoader("CCLabelBMFont",
        cc.LabelBMFontLoader.loader());
    this.registerCCNodeLoader("CCLabelTTF", cc.LabelTTFLoader.loader());
    this.registerCCNodeLoader("CCScale9Sprite", cc.Scale9SpriteLoader.loader());
    this.registerCCNodeLoader("CCScrollView", cc.ScrollViewLoader.loader());
    this.registerCCNodeLoader("CCBFile", cc.BuilderFileLoader.loader());
    this.registerCCNodeLoader("CCMenu", cc.MenuLoader.loader());
    this.registerCCNodeLoader("CCMenuItemImage", cc.MenuItemImageLoader.loader());
    this.registerCCNodeLoader("CCControlButton", cc.ControlButtonLoader.loader());
    this.registerCCNodeLoader("CCParticleSystemQuad", cc.ParticleSystemLoader.loader())
}, registerCCNodeLoader: function (className, ccNodeLoader) {
    this._ccNodeLoaders[className] = ccNodeLoader
}, unregisterCCNodeLoader: function (className) {
    if (this._ccNodeLoaders[className])delete this._ccNodeLoaders[className]
}, getCCNodeLoader: function (className) {
    if (this._ccNodeLoaders[className])return this._ccNodeLoaders[className];
    return null
}, purge: function (releaseCCNodeLoaders) {
    if (releaseCCNodeLoaders)for (var className in this._ccNodeLoaders)delete this._ccNodeLoaders[className];
    this._ccNodeLoaders = {}
}});
cc.NodeLoaderLibrary.sSharedCCNodeLoaderLibrary = null;
cc.NodeLoaderLibrary.library = function () {
    return new cc.NodeLoaderLibrary
};
cc.NodeLoaderLibrary.sharedCCNodeLoaderLibrary = function () {
    if (cc.NodeLoaderLibrary.sSharedCCNodeLoaderLibrary == null) {
        cc.NodeLoaderLibrary.sSharedCCNodeLoaderLibrary = new cc.NodeLoaderLibrary;
        cc.NodeLoaderLibrary.sSharedCCNodeLoaderLibrary.registerDefaultCCNodeLoaders()
    }
    return cc.NodeLoaderLibrary.sSharedCCNodeLoaderLibrary
};
cc.NodeLoaderLibrary.purgeSharedCCNodeLoaderLibrary = function () {
    cc.NodeLoaderLibrary.sSharedCCNodeLoaderLibrary = null
};
cc.NodeLoaderLibrary.newDefaultCCNodeLoaderLibrary = function () {
    var ccNodeLoaderLibrary = cc.NodeLoaderLibrary.library();
    ccNodeLoaderLibrary.registerDefaultCCNodeLoaders();
    return ccNodeLoaderLibrary
};
var CCB_VERSION = 5;
var CCB_PROPTYPE_POSITION = 0;
var CCB_PROPTYPE_SIZE = 1;
var CCB_PROPTYPE_POINT = 2;
var CCB_PROPTYPE_POINTLOCK = 3;
var CCB_PROPTYPE_SCALELOCK = 4;
var CCB_PROPTYPE_DEGREES = 5;
var CCB_PROPTYPE_INTEGER = 6;
var CCB_PROPTYPE_FLOAT = 7;
var CCB_PROPTYPE_FLOATVAR = 8;
var CCB_PROPTYPE_CHECK = 9;
var CCB_PROPTYPE_SPRITEFRAME = 10;
var CCB_PROPTYPE_TEXTURE = 11;
var CCB_PROPTYPE_BYTE = 12;
var CCB_PROPTYPE_COLOR3 = 13;
var CCB_PROPTYPE_COLOR4VAR = 14;
var CCB_PROPTYPE_FLIP = 15;
var CCB_PROPTYPE_BLENDMODE = 16;
var CCB_PROPTYPE_FNTFILE = 17;
var CCB_PROPTYPE_TEXT = 18;
var CCB_PROPTYPE_FONTTTF = 19;
var CCB_PROPTYPE_INTEGERLABELED = 20;
var CCB_PROPTYPE_BLOCK = 21;
var CCB_PROPTYPE_ANIMATION = 22;
var CCB_PROPTYPE_CCBFILE = 23;
var CCB_PROPTYPE_STRING = 24;
var CCB_PROPTYPE_BLOCKCCCONTROL = 25;
var CCB_PROPTYPE_FLOATSCALE = 26;
var CCB_PROPTYPE_FLOATXY = 27;
var CCB_FLOAT0 = 0;
var CCB_FLOAT1 = 1;
var CCB_FLOAT_MINUS1 = 2;
var CCB_FLOAT05 = 3;
var CCB_FLOAT_INTEGER = 4;
var CCB_FLOAT_FULL = 5;
var CCB_PLATFORM_ALL = 0;
var CCB_PLATFORM_IOS = 1;
var CCB_PLATFORM_MAC = 2;
var CCB_TARGETTYPE_NONE = 0;
var CCB_TARGETTYPE_DOCUMENTROOT = 1;
var CCB_TARGETTYPE_OWNER = 2;
var CCB_KEYFRAME_EASING_INSTANT = 0;
var CCB_KEYFRAME_EASING_LINEAR = 1;
var CCB_KEYFRAME_EASING_CUBIC_IN = 2;
var CCB_KEYFRAME_EASING_CUBIC_OUT = 3;
var CCB_KEYFRAME_EASING_CUBIC_INOUT = 4;
var CCB_KEYFRAME_EASING_ELASTIC_IN = 5;
var CCB_KEYFRAME_EASING_ELASTIC_OUT = 6;
var CCB_KEYFRAME_EASING_ELASTIC_INOUT = 7;
var CCB_KEYFRAME_EASING_BOUNCE_IN = 8;
var CCB_KEYFRAME_EASING_BOUNCE_OUT = 9;
var CCB_KEYFRAME_EASING_BOUNCE_INOUT = 10;
var CCB_KEYFRAME_EASING_BACK_IN = 11;
var CCB_KEYFRAME_EASING_BACK_OUT = 12;
var CCB_KEYFRAME_EASING_BACK_INOUT = 13;
var CCB_POSITIONTYPE_RELATIVE_BOTTOM_LEFT = 0;
var CCB_POSITIONTYPE_RELATIVE_TOP_LEFT = 1;
var CCB_POSITIONTYPE_RELATIVE_TOP_RIGHT = 2;
var CCB_POSITIONTYPE_RELATIVE_BOTTOM_RIGHT = 3;
var CCB_POSITIONTYPE_PERCENT = 4;
var CCB_POSITIONTYPE_MULTIPLY_RESOLUTION = 5;
var CCB_SIZETYPE_ABSOLUTE = 0;
var CCB_SIZETYPE_PERCENT = 1;
var CCB_SIZETYPE_RELATIVE_CONTAINER = 2;
var CCB_SIZETYPE_HORIZONTAL_PERCENT = 3;
var CCB_SIZETYPE_VERTICAL_PERCENT = 4;
var CCB_SIZETYPE_MULTIPLY_RESOLUTION = 5;
var CCB_SCALETYPE_ABSOLUTE = 0;
var CCB_SCALETYPE_MULTIPLY_RESOLUTION = 1;
cc.BuilderFile = cc.Node.extend({_ccbFileNode: null, getCCBFileNode: function () {
    return this._ccbFileNode
}, setCCBFileNode: function (node) {
    this._ccbFileNode = node
}});
cc.BuilderFile.create = function () {
    return new cc.BuilderFile
};
cc.BuilderReader = cc.Class.extend({_jsControlled: false, _data: null, _ccbRootPath: "", _bytes: 0, _currentByte: 0, _currentBit: 0, _stringCache: null, _loadedSpriteSheets: null, _owner: null, _animationManager: null, _animationManagers: null, _animatedProps: null, _ccNodeLoaderLibrary: null, _ccNodeLoaderListener: null, _ccbMemberVariableAssigner: null, _ccbSelectorResolver: null, _ownerOutletNames: null, _ownerOutletNodes: null, _nodesWithAnimationManagers: null, _animationManagerForNodes: null, _ownerCallbackNames: null, _ownerCallbackNodes: null,
    _ownerCallbackEvents: null, _readNodeGraphFromData: false, ctor: function (ccNodeLoaderLibrary, ccbMemberVariableAssigner, ccbSelectorResolver, ccNodeLoaderListener) {
        this._stringCache = [];
        this._loadedSpriteSheets = [];
        this._currentBit = -1;
        this._currentByte = -1;
        if (arguments.length != 0)if (ccNodeLoaderLibrary instanceof cc.BuilderReader) {
            var ccbReader = ccNodeLoaderLibrary;
            this._loadedSpriteSheets = ccbReader._loadedSpriteSheets;
            this._ccNodeLoaderLibrary = ccbReader._ccNodeLoaderLibrary;
            this._ccbMemberVariableAssigner = ccbReader._ccbMemberVariableAssigner;
            this._ccbSelectorResolver = ccbReader._ccbSelectorResolver;
            this._ccNodeLoaderListener = ccbReader._ccNodeLoaderListener;
            this._ownerCallbackNames = ccbReader._ownerCallbackNames;
            this._ownerCallbackNodes = ccbReader._ownerCallbackNodes;
            this._ownerCallbackEvents = ccbReader._ownerCallbackEvents;
            this._ownerOutletNames = ccbReader._ownerOutletNames;
            this._ownerOutletNodes = ccbReader._ownerOutletNodes;
            this._ccbRootPath = ccbReader._ccbRootPath
        } else {
            this._ccNodeLoaderLibrary = ccNodeLoaderLibrary;
            this._ccbMemberVariableAssigner =
                ccbMemberVariableAssigner;
            this._ccbSelectorResolver = ccbSelectorResolver;
            this._ccNodeLoaderListener = ccNodeLoaderListener
        }
    }, getCCBRootPath: function () {
        return this._ccbRootPath
    }, setCCBRootPath: function (rootPath) {
        this._ccbRootPath = rootPath
    }, initWithData: function (data, owner) {
        this._animationManager = new cc.BuilderAnimationManager;
        this._data = data;
        this._bytes = data.length;
        this._currentBit = 0;
        this._currentByte = 0;
        this._owner = owner;
        this._animationManager.setRootContainerSize(cc.director.getWinSize());
        return true
    },
    _loadBinarySync: function (url) {
        var self = this;
        var req = this.getXMLHttpRequest();
        var errInfo = "load " + url + " failed!";
        req.open("GET", url, false);
        var arrayInfo = null;
        if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
            req.setRequestHeader("Accept-Charset", "x-user-defined");
            req.send(null);
            if (req.status != 200) {
                cc.log(errInfo);
                return null
            }
            var fileContents = cc._convertResponseBodyToText(req["responseBody"]);
            if (fileContents) {
                arrayInfo = this._stringConvertToArray(fileContents);
                this._fileDataCache[url] =
                    arrayInfo
            }
        } else {
            if (req.overrideMimeType)req.overrideMimeType("text/plain; charset\x3dx-user-defined");
            req.send(null);
            if (req.status != 200) {
                cc.log(errInfo);
                return null
            }
            arrayInfo = this._stringConvertToArray(req.responseText);
            this._fileDataCache[url] = arrayInfo
        }
        return arrayInfo
    }, readNodeGraphFromFile: function (ccbFileName, owner, parentSize, animationManager) {
        if (parentSize == null)parentSize = cc.director.getWinSize(); else if (parentSize instanceof cc.BuilderAnimationManager) {
            animationManager = parentSize;
            parentSize =
                cc.director.getWinSize()
        }
        var data = cc.loader.getRes(ccbFileName);
        if (!data) {
            var realUrl = cc.loader.getUrl(ccbFileName);
            data = cc.loader.loadBinarySync(realUrl);
            cc.loader.cache[ccbFileName] = data
        }
        return this.readNodeGraphFromData(data, owner, parentSize, animationManager)
    }, readNodeGraphFromData: function (data, owner, parentSize) {
        this.initWithData(data, owner);
        var locAnimationManager = this._animationManager;
        locAnimationManager.setRootContainerSize(parentSize);
        locAnimationManager.setOwner(owner);
        this._ownerOutletNames =
            [];
        this._ownerOutletNodes = [];
        this._ownerCallbackNames = [];
        this._ownerCallbackNodes = [];
        this._ownerCallbackEvents = [];
        this._animationManagers = new cc._Dictionary;
        var nodeGraph = this.readFileWithCleanUp(true);
        if (nodeGraph && locAnimationManager.getAutoPlaySequenceId() != -1)locAnimationManager.runAnimations(locAnimationManager.getAutoPlaySequenceId(), 0);
        if (this._jsControlled) {
            var locNodes = [];
            var locAnimations = [];
            var locAnimationManagers = this._animationManagers;
            var getAllKeys = locAnimationManagers.allKeys();
            for (var i =
                0; i < getAllKeys.length; i++) {
                locNodes.push(getAllKeys[i]);
                locAnimations.push(locAnimationManagers.objectForKey(getAllKeys[i]))
            }
            this._nodesWithAnimationManagers = locNodes;
            this._animationManagerForNodes = locAnimations
        }
        return nodeGraph
    }, createSceneWithNodeGraphFromFile: function (ccbFileName, owner, parentSize, animationManager) {
        var node = this.readNodeGraphFromFile(ccbFileName, owner, parentSize, animationManager);
        var scene = cc.Scene.create();
        scene.addChild(node);
        return scene
    }, getCCBMemberVariableAssigner: function () {
        return this._ccbMemberVariableAssigner
    },
    getCCBSelectorResolver: function () {
        return this._ccbSelectorResolver
    }, getAnimationManager: function () {
        return this._animationManager
    }, setAnimationManager: function (animationManager) {
        this._animationManager = animationManager
    }, getAnimatedProperties: function () {
        return this._animatedProps
    }, getLoadedSpriteSheet: function () {
        return this._loadedSpriteSheets
    }, getOwner: function () {
        return this._owner
    }, readInt: function (signed) {
        var numBits = 0;
        while (!this._getBit())numBits++;
        var current = 0;
        for (var a = numBits - 1; a >= 0; a--)if (this._getBit())current |=
            1 << a;
        current |= 1 << numBits;
        var num;
        if (signed) {
            var s = current % 2;
            if (s)num = 0 | current / 2; else num = 0 | -current / 2
        } else num = current - 1;
        this._alignBits();
        return num
    }, readByte: function () {
        var byteValue = this._data[this._currentByte];
        this._currentByte++;
        return byteValue
    }, readBool: function () {
        return 0 != this.readByte()
    }, readFloat: function () {
        var type = this.readByte();
        switch (type) {
            case CCB_FLOAT0:
                return 0;
            case CCB_FLOAT1:
                return 1;
            case CCB_FLOAT_MINUS1:
                return-1;
            case CCB_FLOAT05:
                return 0.5;
            case CCB_FLOAT_INTEGER:
                return this.readInt(true);
            default:
                var pF = this._decodeFloat(23, 8);
                return pF
        }
    }, _decodeFloat: function (precisionBits, exponentBits) {
        var length = precisionBits + exponentBits + 1;
        var size = length >> 3;
        this._checkSize(length);
        var bias = Math.pow(2, exponentBits - 1) - 1;
        var signal = this._readBitsOnly(precisionBits + exponentBits, 1, size);
        var exponent = this._readBitsOnly(precisionBits, exponentBits, size);
        var significand = 0;
        var divisor = 2;
        var curByte = 0;
        do {
            var byteValue = this._readByteOnly(++curByte, size);
            var startBit = precisionBits % 8 || 8;
            var mask = 1 << startBit;
            while (mask >>= 1) {
                if (byteValue & mask)significand += 1 / divisor;
                divisor *= 2
            }
        } while (precisionBits -= startBit);
        this._currentByte += size;
        return exponent == (bias << 1) + 1 ? significand ? NaN : signal ? -Infinity : +Infinity : (1 + signal * -2) * (exponent || significand ? !exponent ? Math.pow(2, -bias + 1) * significand : Math.pow(2, exponent - bias) * (1 + significand) : 0)
    }, _readBitsOnly: function (start, length, size) {
        var offsetLeft = (start + length) % 8;
        var offsetRight = start % 8;
        var curByte = size - (start >> 3) - 1;
        var lastByte = size + (-(start + length) >> 3);
        var diff = curByte -
            lastByte;
        var sum = this._readByteOnly(curByte, size) >> offsetRight & (1 << (diff ? 8 - offsetRight : length)) - 1;
        if (diff && offsetLeft)sum += (this._readByteOnly(lastByte++, size) & (1 << offsetLeft) - 1) << (diff-- << 3) - offsetRight;
        while (diff)sum += this._shl(this._readByteOnly(lastByte++, size), (diff-- << 3) - offsetRight);
        return sum
    }, _readByteOnly: function (i, size) {
        return this._data[this._currentByte + size - i - 1]
    }, _shl: function (a, b) {
        for (++b; --b; a = ((a %= 2147483647 + 1) & 1073741824) == 1073741824 ? a * 2 : (a - 1073741824) * 2 + 2147483647 + 1);
        return a
    },
    _checkSize: function (neededBits) {
        if (!(this._currentByte + Math.ceil(neededBits / 8) < this._data.length))throw new Error("Index out of bound");
    }, readCachedString: function () {
        return this._stringCache[this.readInt(false)]
    }, isJSControlled: function () {
        return this._jsControlled
    }, getOwnerCallbackNames: function () {
        return this._ownerCallbackNames
    }, getOwnerCallbackNodes: function () {
        return this._ownerCallbackNodes
    }, getOwnerCallbackControlEvents: function () {
        return this._ownerCallbackEvents
    }, getOwnerOutletNames: function () {
        return this._ownerOutletNames
    },
    getOwnerOutletNodes: function () {
        return this._ownerOutletNodes
    }, getNodesWithAnimationManagers: function () {
        return this._nodesWithAnimationManagers
    }, getAnimationManagersForNodes: function () {
        return this._animationManagerForNodes
    }, getAnimationManagers: function () {
        return this._animationManagers
    }, setAnimationManagers: function (animationManagers) {
        this._animationManagers = animationManagers
    }, addOwnerCallbackName: function (name) {
        this._ownerCallbackNames.push(name)
    }, addOwnerCallbackNode: function (node) {
        this._ownerCallbackNodes.push(node)
    },
    addOwnerCallbackControlEvents: function (event) {
        this._ownerCallbackEvents.push(event)
    }, addDocumentCallbackName: function (name) {
        this._animationManager.addDocumentCallbackName(name)
    }, addDocumentCallbackNode: function (node) {
        this._animationManager.addDocumentCallbackNode(node)
    }, addDocumentCallbackControlEvents: function (controlEvents) {
        this._animationManager.addDocumentCallbackControlEvents(controlEvents)
    }, readFileWithCleanUp: function (cleanUp) {
        if (!this._readHeader())return null;
        if (!this._readStringCache())return null;
        if (!this._readSequences())return null;
        var node = this._readNodeGraph();
        this._animationManagers.setObject(this._animationManager, node);
        if (cleanUp)this._cleanUpNodeGraph(node);
        return node
    }, addOwnerOutletName: function (name) {
        this._ownerOutletNames.push(name)
    }, addOwnerOutletNode: function (node) {
        if (node == null)return;
        this._ownerOutletNodes.push(node)
    }, _cleanUpNodeGraph: function (node) {
        node.userObject = null;
        var getChildren = node.getChildren();
        for (var i = 0, len = getChildren.length; i < len; i++)this._cleanUpNodeGraph(getChildren[i])
    },
    _readCallbackKeyframesForSeq: function (seq) {
        var numKeyframes = this.readInt(false);
        if (!numKeyframes)return true;
        var channel = new cc.BuilderSequenceProperty;
        var locJsControlled = this._jsControlled, locAnimationManager = this._animationManager, locKeyframes = channel.getKeyframes();
        for (var i = 0; i < numKeyframes; i++) {
            var time = this.readFloat();
            var callbackName = this.readCachedString();
            var callbackType = this.readInt(false);
            var value = [callbackName, callbackType];
            var keyframe = new cc.BuilderKeyframe;
            keyframe.setTime(time);
            keyframe.setValue(value);
            if (locJsControlled)locAnimationManager.getKeyframeCallbacks().push(callbackType + ":" + callbackName);
            locKeyframes.push(keyframe)
        }
        seq.setCallbackChannel(channel);
        return true
    }, _readSoundKeyframesForSeq: function (seq) {
        var numKeyframes = this.readInt(false);
        if (!numKeyframes)return true;
        var channel = new cc.BuilderSequenceProperty;
        var locKeyframes = channel.getKeyframes();
        for (var i = 0; i < numKeyframes; i++) {
            var time = this.readFloat();
            var soundFile = this.readCachedString();
            var pitch = this.readFloat();
            var pan = this.readFloat();
            var gain = this.readFloat();
            var value = [soundFile, pitch, pan, gain];
            var keyframe = new cc.BuilderKeyframe;
            keyframe.setTime(time);
            keyframe.setValue(value);
            locKeyframes.push(keyframe)
        }
        seq.setSoundChannel(channel);
        return true
    }, _readSequences: function () {
        var sequences = this._animationManager.getSequences();
        var numSeqs = this.readInt(false);
        for (var i = 0; i < numSeqs; i++) {
            var seq = new cc.BuilderSequence;
            seq.setDuration(this.readFloat());
            seq.setName(this.readCachedString());
            seq.setSequenceId(this.readInt(false));
            seq.setChainedSequenceId(this.readInt(true));
            if (!this._readCallbackKeyframesForSeq(seq))return false;
            if (!this._readSoundKeyframesForSeq(seq))return false;
            sequences.push(seq)
        }
        this._animationManager.setAutoPlaySequenceId(this.readInt(true));
        return true
    }, readKeyframe: function (type) {
        var keyframe = new cc.BuilderKeyframe;
        keyframe.setTime(this.readFloat());
        var easingType = this.readInt(false);
        var easingOpt = 0;
        var value = null;
        if (easingType === CCB_KEYFRAME_EASING_CUBIC_IN || easingType === CCB_KEYFRAME_EASING_CUBIC_OUT ||
            easingType === CCB_KEYFRAME_EASING_CUBIC_INOUT || easingType === CCB_KEYFRAME_EASING_ELASTIC_IN || easingType === CCB_KEYFRAME_EASING_ELASTIC_OUT || easingType === CCB_KEYFRAME_EASING_ELASTIC_INOUT)easingOpt = this.readFloat();
        keyframe.setEasingType(easingType);
        keyframe.setEasingOpt(easingOpt);
        if (type == CCB_PROPTYPE_CHECK)value = this.readBool(); else if (type == CCB_PROPTYPE_BYTE)value = this.readByte(); else if (type == CCB_PROPTYPE_COLOR3) {
            var c = cc.color(this.readByte(), this.readByte(), this.readByte());
            value = cc.Color3BWapper.create(c)
        } else if (type ==
            CCB_PROPTYPE_FLOATXY)value = [this.readFloat(), this.readFloat()]; else if (type == CCB_PROPTYPE_DEGREES)value = this.readFloat(); else if (type == CCB_PROPTYPE_SCALELOCK || type == CCB_PROPTYPE_POSITION || type == CCB_PROPTYPE_FLOATXY)value = [this.readFloat(), this.readFloat()]; else if (type == CCB_PROPTYPE_SPRITEFRAME) {
            var spriteSheet = this.readCachedString();
            var spriteFile = this.readCachedString();
            if (spriteSheet == "") {
                spriteFile = this._ccbRootPath + spriteFile;
                var texture = cc.textureCache.addImage(spriteFile);
                var locContentSize =
                    texture.getContentSize();
                var bounds = cc.rect(0, 0, locContentSize.width, locContentSize.height);
                value = cc.SpriteFrame.create(texture, bounds)
            } else {
                spriteSheet = this._ccbRootPath + spriteSheet;
                var frameCache = cc.spriteFrameCache;
                if (this._loadedSpriteSheets.indexOf(spriteSheet) == -1) {
                    frameCache.addSpriteFrames(spriteSheet);
                    this._loadedSpriteSheets.push(spriteSheet)
                }
                value = frameCache.getSpriteFrame(spriteFile)
            }
        }
        keyframe.setValue(value);
        return keyframe
    }, _readHeader: function () {
        if (this._data == null)return false;
        var magicBytes =
            this._readStringFromBytes(this._currentByte, 4, true);
        this._currentByte += 4;
        if (magicBytes != "ccbi")return false;
        var version = this.readInt(false);
        if (version != CCB_VERSION) {
            cc.log("WARNING! Incompatible ccbi file version (file: " + version + " reader: " + CCB_VERSION + ")");
            return false
        }
        this._jsControlled = this.readBool();
        this._animationManager._jsControlled = this._jsControlled;
        return true
    }, _readStringFromBytes: function (startIndex, strLen, reverse) {
        reverse = reverse || false;
        var strValue = "";
        var i, locData = this._data, locCurrentByte =
            this._currentByte;
        if (reverse)for (i = strLen - 1; i >= 0; i--)strValue += String.fromCharCode(locData[locCurrentByte + i]); else for (i = 0; i < strLen; i++)strValue += String.fromCharCode(locData[locCurrentByte + i]);
        return strValue
    }, _readStringCache: function () {
        var numStrings = this.readInt(false);
        for (var i = 0; i < numStrings; i++)this._readStringCacheEntry();
        return true
    }, _readStringCacheEntry: function () {
        var b0 = this.readByte();
        var b1 = this.readByte();
        var numBytes = b0 << 8 | b1;
        var str = "", locData = this._data, locCurrentByte = this._currentByte;
        for (var i = 0; i < numBytes; i++) {
            var hexChar = locData[locCurrentByte + i].toString("16").toUpperCase();
            hexChar = hexChar.length > 1 ? hexChar : "0" + hexChar;
            str += "%" + hexChar
        }
        str = decodeURIComponent(str);
        this._currentByte += numBytes;
        this._stringCache.push(str)
    }, _readNodeGraph: function (parent) {
        var className = this.readCachedString();
        var jsControlledName, locJsControlled = this._jsControlled, locActionManager = this._animationManager;
        if (locJsControlled)jsControlledName = this.readCachedString();
        var memberVarAssignmentType = this.readInt(false);
        var memberVarAssignmentName;
        if (memberVarAssignmentType != CCB_TARGETTYPE_NONE)memberVarAssignmentName = this.readCachedString();
        var ccNodeLoader = this._ccNodeLoaderLibrary.getCCNodeLoader(className);
        if (!ccNodeLoader)ccNodeLoader = this._ccNodeLoaderLibrary.getCCNodeLoader("CCNode");
        var node = ccNodeLoader.loadCCNode(parent, this);
        if (!locActionManager.getRootNode())locActionManager.setRootNode(node);
        if (locJsControlled && node == locActionManager.getRootNode())locActionManager.setDocumentControllerName(jsControlledName);
        var seqs = new cc._Dictionary;
        this._animatedProps = [];
        var i, locAnimatedProps = this._animatedProps;
        var numSequence = this.readInt(false);
        for (i = 0; i < numSequence; ++i) {
            var seqId = this.readInt(false);
            var seqNodeProps = new cc._Dictionary;
            var numProps = this.readInt(false);
            for (var j = 0; j < numProps; ++j) {
                var seqProp = new cc.BuilderSequenceProperty;
                seqProp.setName(this.readCachedString());
                seqProp.setType(this.readInt(false));
                locAnimatedProps.push(seqProp.getName());
                var numKeyframes = this.readInt(false);
                var locKeyframes = seqProp.getKeyframes();
                for (var k = 0; k < numKeyframes; ++k) {
                    var keyFrame = this.readKeyframe(seqProp.getType());
                    locKeyframes.push(keyFrame)
                }
                seqNodeProps.setObject(seqProp, seqProp.getName())
            }
            seqs.setObject(seqNodeProps, seqId)
        }
        if (seqs.count() > 0)locActionManager.addNode(node, seqs);
        ccNodeLoader.parseProperties(node, parent, this);
        var isCCBFileNode = node instanceof cc.BuilderFile;
        if (isCCBFileNode) {
            var embeddedNode = node.getCCBFileNode();
            embeddedNode.setPosition(node.getPosition());
            embeddedNode.setRotation(node.getRotation());
            embeddedNode.setScaleX(node.getScaleX());
            embeddedNode.setScaleY(node.getScaleY());
            embeddedNode.setTag(node.getTag());
            embeddedNode.setVisible(true);
            locActionManager.moveAnimationsFromNode(node, embeddedNode);
            node.setCCBFileNode(null);
            node = embeddedNode
        }
        var target = null, locMemberAssigner = null;
        if (memberVarAssignmentType != CCB_TARGETTYPE_NONE)if (!locJsControlled) {
            if (memberVarAssignmentType === CCB_TARGETTYPE_DOCUMENTROOT)target = locActionManager.getRootNode(); else if (memberVarAssignmentType === CCB_TARGETTYPE_OWNER)target = this._owner;
            if (target != null) {
                var assigned =
                    false;
                if (target != null && target.onAssignCCBMemberVariable)assigned = target.onAssignCCBMemberVariable(target, memberVarAssignmentName, node);
                locMemberAssigner = this._ccbMemberVariableAssigner;
                if (!assigned && locMemberAssigner != null && locMemberAssigner.onAssignCCBMemberVariable)locMemberAssigner.onAssignCCBMemberVariable(target, memberVarAssignmentName, node)
            }
        } else if (memberVarAssignmentType == CCB_TARGETTYPE_DOCUMENTROOT) {
            locActionManager.addDocumentOutletName(memberVarAssignmentName);
            locActionManager.addDocumentOutletNode(node)
        } else {
            this._ownerOutletNames.push(memberVarAssignmentName);
            this._ownerOutletNodes.push(node)
        }
        if (ccNodeLoader.getCustomProperties().length > 0) {
            var customAssigned = false;
            if (!locJsControlled) {
                target = node;
                if (target != null && target.onAssignCCBCustomProperty != null) {
                    var customProperties = ccNodeLoader.getCustomProperties();
                    var customPropKeys = customProperties.allKeys();
                    for (i = 0; i < customPropKeys.length; i++) {
                        var customPropValue = customProperties.objectForKey(customPropKeys[i]);
                        customAssigned = target.onAssignCCBCustomProperty(target, customPropKeys[i], customPropValue);
                        locMemberAssigner =
                            this._ccbMemberVariableAssigner;
                        if (!customAssigned && locMemberAssigner != null && locMemberAssigner.onAssignCCBCustomProperty != null)customAssigned = locMemberAssigner.onAssignCCBCustomProperty(target, customPropKeys[i], customPropValue)
                    }
                }
            }
        }
        this._animatedProps = null;
        var numChildren = this.readInt(false);
        for (i = 0; i < numChildren; i++) {
            var child = this._readNodeGraph(node);
            node.addChild(child)
        }
        if (!isCCBFileNode)if (node != null && node.onNodeLoaded)node.onNodeLoaded(node, ccNodeLoader); else if (this._ccNodeLoaderListener != null)this._ccNodeLoaderListener.onNodeLoaded(node,
            ccNodeLoader);
        return node
    }, _getBit: function () {
        var bit = (this._data[this._currentByte] & 1 << this._currentBit) != 0;
        this._currentBit++;
        if (this._currentBit >= 8) {
            this._currentBit = 0;
            this._currentByte++
        }
        return bit
    }, _alignBits: function () {
        if (this._currentBit) {
            this._currentBit = 0;
            this._currentByte++
        }
    }, _readUTF8: function () {
    }});
cc.BuilderReader._ccbResolutionScale = 1;
cc.BuilderReader.setResolutionScale = function (scale) {
    cc.BuilderReader._ccbResolutionScale = scale
};
cc.BuilderReader.getResolutionScale = function () {
    return cc.BuilderReader._ccbResolutionScale
};
cc.BuilderReader.loadAsScene = function (ccbFilePath, owner, parentSize, ccbRootPath) {
    ccbRootPath = ccbRootPath || cc.BuilderReader.getResourcePath();
    var getNode = cc.BuilderReader.load(ccbFilePath, owner, parentSize, ccbRootPath);
    var scene = cc.Scene.create();
    scene.addChild(getNode);
    return scene
};
cc.BuilderReader._controllerClassCache = {};
cc.BuilderReader.registerController = function (controllerName, controller) {
    cc.BuilderReader._controllerClassCache[controllerName] = cc.Class.extend(controller)
};
cc.BuilderReader.load = function (ccbFilePath, owner, parentSize, ccbRootPath) {
    ccbRootPath = ccbRootPath || cc.BuilderReader.getResourcePath();
    var reader = new cc.BuilderReader(cc.NodeLoaderLibrary.newDefaultCCNodeLoaderLibrary());
    reader.setCCBRootPath(ccbRootPath);
    if (ccbFilePath.length < 5 || ccbFilePath.toLowerCase().lastIndexOf(".ccbi") != ccbFilePath.length - 5)ccbFilePath = ccbFilePath + ".ccbi";
    var node = reader.readNodeGraphFromFile(ccbFilePath, owner, parentSize);
    var i;
    var callbackName, callbackNode, callbackControlEvents,
        outletName, outletNode;
    if (owner) {
        var ownerCallbackNames = reader.getOwnerCallbackNames();
        var ownerCallbackNodes = reader.getOwnerCallbackNodes();
        var ownerCallbackControlEvents = reader.getOwnerCallbackControlEvents();
        for (i = 0; i < ownerCallbackNames.length; i++) {
            callbackName = ownerCallbackNames[i];
            callbackNode = ownerCallbackNodes[i];
            callbackControlEvents = ownerCallbackControlEvents[i];
            if (callbackNode instanceof cc.ControlButton)callbackNode.addTargetWithActionForControlEvents(owner, owner[callbackName], callbackControlEvents);
            else callbackNode.setCallback(owner[callbackName], owner)
        }
        var ownerOutletNames = reader.getOwnerOutletNames();
        var ownerOutletNodes = reader.getOwnerOutletNodes();
        for (i = 0; i < ownerOutletNames.length; i++) {
            outletName = ownerOutletNames[i];
            outletNode = ownerOutletNodes[i];
            owner[outletName] = outletNode
        }
    }
    var nodesWithAnimationManagers = reader.getNodesWithAnimationManagers();
    var animationManagersForNodes = reader.getAnimationManagersForNodes();
    if (!nodesWithAnimationManagers || !animationManagersForNodes)return node;
    var controllerClassCache =
        cc.BuilderReader._controllerClassCache;
    for (i = 0; i < nodesWithAnimationManagers.length; i++) {
        var innerNode = nodesWithAnimationManagers[i];
        var animationManager = animationManagersForNodes[i];
        var j;
        innerNode.animationManager = animationManager;
        var controllerName = animationManager.getDocumentControllerName();
        if (!controllerName)continue;
        var controllerClass = controllerClassCache[controllerName];
        if (!controllerClass)throw"Can not find controller : " + controllerName;
        var controller = new controllerClass;
        controller.controllerName =
            controllerName;
        innerNode.controller = controller;
        controller.rootNode = innerNode;
        var documentCallbackNames = animationManager.getDocumentCallbackNames();
        var documentCallbackNodes = animationManager.getDocumentCallbackNodes();
        var documentCallbackControlEvents = animationManager.getDocumentCallbackControlEvents();
        for (j = 0; j < documentCallbackNames.length; j++) {
            callbackName = documentCallbackNames[j];
            callbackNode = documentCallbackNodes[j];
            callbackControlEvents = documentCallbackControlEvents[j];
            if (callbackNode instanceof
                cc.ControlButton)callbackNode.addTargetWithActionForControlEvents(controller, controller[callbackName], callbackControlEvents); else callbackNode.setCallback(controller[callbackName], controller)
        }
        var documentOutletNames = animationManager.getDocumentOutletNames();
        var documentOutletNodes = animationManager.getDocumentOutletNodes();
        for (j = 0; j < documentOutletNames.length; j++) {
            outletName = documentOutletNames[j];
            outletNode = documentOutletNodes[j];
            controller[outletName] = outletNode
        }
        if (controller.onDidLoadFromCCB && typeof controller.onDidLoadFromCCB ==
            "function")controller.onDidLoadFromCCB();
        var keyframeCallbacks = animationManager.getKeyframeCallbacks();
        for (j = 0; j < keyframeCallbacks.length; j++) {
            var callbackSplit = keyframeCallbacks[j].split(":");
            var callbackType = callbackSplit[0];
            var kfCallbackName = callbackSplit[1];
            if (callbackType == 1)animationManager.setCallFunc(cc.CallFunc.create(controller[kfCallbackName], controller), keyframeCallbacks[j]); else if (callbackType == 2 && owner)animationManager.setCallFunc(cc.CallFunc.create(owner[kfCallbackName], owner), keyframeCallbacks[j])
        }
    }
    return node
};
cc.BuilderReader._resourcePath = "";
cc.BuilderReader.setResourcePath = function (rootPath) {
    cc.BuilderReader._resourcePath = rootPath
};
cc.BuilderReader.getResourcePath = function () {
    return cc.BuilderReader._resourcePath
};
cc.BuilderReader.lastPathComponent = function (pathStr) {
    var slashPos = pathStr.lastIndexOf("/");
    if (slashPos != -1)return pathStr.substring(slashPos + 1, pathStr.length - slashPos);
    return pathStr
};
cc.BuilderReader.deletePathExtension = function (pathStr) {
    var dotPos = pathStr.lastIndexOf(".");
    if (dotPos != -1)return pathStr.substring(0, dotPos);
    return pathStr
};
cc.BuilderReader.toLowerCase = function (sourceStr) {
    return sourceStr.toLowerCase()
};
cc.BuilderReader.endsWith = function (sourceStr, ending) {
    if (sourceStr.length >= ending.length)return sourceStr.lastIndexOf(ending) == 0; else return false
};
cc.BuilderReader.concat = function (stringA, stringB) {
    return stringA + stringB
};
cc.loader.register(["ccbi"], cc._binaryLoader);
cc.INT_VALUE = 0;
cc.FLOAT_VALUE = 1;
cc.POINTER_VALUE = 2;
cc.BOOL_VALUE = 3;
cc.UNSIGNEDCHAR_VALUE = 4;
cc.Color3BWapper = cc.Class.extend({_color: null, ctor: function () {
    this._color = cc.color(0, 0, 0)
}, getColor: function () {
    return this._color
}});
cc.Color3BWapper.create = function (color) {
    var ret = new cc.Color3BWapper;
    if (ret) {
        ret._color.r = color.r;
        ret._color.g = color.g;
        ret._color.b = color.b
    }
    return ret
};
cc.BuilderValue = cc.Class.extend({_value: null, _type: 0, getIntValue: function () {
}, getFloatValue: function () {
}, getBoolValue: function () {
}, getByteValue: function () {
}, getPointer: function () {
}, getValue: function () {
    return this._value
}});
cc.BuilderValue.create = function (value) {
    var ret = new cc.BuilderValue;
    if (ret)if (typeof value == "number");
    return ret
};
cc.BuilderKeyframe = cc.Class.extend({_value: null, _time: 0, _easingType: 0, _easingOpt: 0, getValue: function () {
    return this._value
}, setValue: function (value) {
    this._value = value
}, getTime: function () {
    return this._time
}, setTime: function (time) {
    this._time = time
}, getEasingType: function () {
    return this._easingType
}, setEasingType: function (easingType) {
    this._easingType = easingType
}, getEasingOpt: function () {
    return this._easingOpt
}, setEasingOpt: function (easingOpt) {
    this._easingOpt = easingOpt
}});
cc.BuilderSequence = cc.Class.extend({_duration: 0, _name: "", _sequenceId: 0, _chainedSequenceId: 0, _callbackChannel: null, _soundChannel: null, ctor: function () {
    this._name = ""
}, getDuration: function () {
    return this._duration
}, setDuration: function (duration) {
    this._duration = duration
}, getName: function () {
    return this._name
}, setName: function (name) {
    this._name = name
}, getSequenceId: function () {
    return this._sequenceId
}, setSequenceId: function (sequenceId) {
    this._sequenceId = sequenceId
}, getChainedSequenceId: function () {
    return this._chainedSequenceId
},
    setChainedSequenceId: function (chainedSequenceId) {
        this._chainedSequenceId = chainedSequenceId
    }, getCallbackChannel: function () {
        return this._callbackChannel
    }, setCallbackChannel: function (channel) {
        this._callbackChannel = channel
    }, getSoundChannel: function () {
        return this._soundChannel
    }, setSoundChannel: function (channel) {
        this._soundChannel = channel
    }});
cc.BuilderSequenceProperty = cc.Class.extend({_name: null, _type: 0, _keyFrames: null, ctor: function () {
    this.init()
}, init: function () {
    this._keyFrames = [];
    this._name = ""
}, getName: function () {
    return this._name
}, setName: function (name) {
    this._name = name
}, getType: function () {
    return this._type
}, setType: function (type) {
    this._type = type
}, getKeyframes: function () {
    return this._keyFrames
}});
cc.getAbsolutePosition = function (pt, type, containerSize, propName) {
    var absPt = cc.p(0, 0);
    if (type === CCB_POSITIONTYPE_RELATIVE_BOTTOM_LEFT)absPt = pt; else if (type === CCB_POSITIONTYPE_RELATIVE_TOP_LEFT) {
        absPt.x = pt.x;
        absPt.y = containerSize.height - pt.y
    } else if (type === CCB_POSITIONTYPE_RELATIVE_TOP_RIGHT) {
        absPt.x = containerSize.width - pt.x;
        absPt.y = containerSize.height - pt.y
    } else if (type === CCB_POSITIONTYPE_RELATIVE_BOTTOM_RIGHT) {
        absPt.x = containerSize.width - pt.x;
        absPt.y = pt.y
    } else if (type === CCB_POSITIONTYPE_PERCENT) {
        absPt.x =
            containerSize.width * pt.x / 100;
        absPt.y = containerSize.height * pt.y / 100
    } else if (type === CCB_POSITIONTYPE_MULTIPLY_RESOLUTION) {
        var resolutionScale = cc.BuilderReader.getResolutionScale();
        absPt.x = pt.x * resolutionScale;
        absPt.y = pt.y * resolutionScale
    }
    return absPt
};
cc._getAbsolutePosition = function (x, y, type, containerSize, propName) {
    var absPt = cc.p(0, 0);
    if (type === CCB_POSITIONTYPE_RELATIVE_BOTTOM_LEFT) {
        absPt.x = x;
        absPt.y = y
    } else if (type === CCB_POSITIONTYPE_RELATIVE_TOP_LEFT) {
        absPt.x = x;
        absPt.y = containerSize.height - y
    } else if (type === CCB_POSITIONTYPE_RELATIVE_TOP_RIGHT) {
        absPt.x = containerSize.width - x;
        absPt.y = containerSize.height - y
    } else if (type === CCB_POSITIONTYPE_RELATIVE_BOTTOM_RIGHT) {
        absPt.x = containerSize.width - x;
        absPt.y = y
    } else if (type === CCB_POSITIONTYPE_PERCENT) {
        absPt.x =
            containerSize.width * x / 100;
        absPt.y = containerSize.height * y / 100
    } else if (type === CCB_POSITIONTYPE_MULTIPLY_RESOLUTION) {
        var resolutionScale = cc.BuilderReader.getResolutionScale();
        absPt.x = x * resolutionScale;
        absPt.y = y * resolutionScale
    }
    return absPt
};
cc.setRelativeScale = function (node, scaleX, scaleY, type, propName) {
    if (!node)throw"cc.setRelativeScale(): node should be non-null";
    if (type === CCB_POSITIONTYPE_MULTIPLY_RESOLUTION) {
        var resolutionScale = cc.BuilderReader.getResolutionScale();
        scaleX *= resolutionScale;
        scaleY *= resolutionScale
    }
    node.setScaleX(scaleX);
    node.setScaleY(scaleY)
};
cc.BuilderAnimationManagerDelegate = cc.Class.extend({completedAnimationSequenceNamed: function (name) {
}});
cc.BuilderAnimationManager = cc.Class.extend({_sequences: null, _nodeSequences: null, _baseValues: null, _autoPlaySequenceId: 0, _rootNode: null, _owner: null, _rootContainerSize: null, _delegate: null, _runningSequence: null, _documentOutletNames: null, _documentOutletNodes: null, _documentCallbackNames: null, _documentCallbackNodes: null, _documentCallbackControlEvents: null, _documentControllerName: "", _lastCompletedSequenceName: "", _keyframeCallbacks: null, _keyframeCallFuncs: null, _animationCompleteCallbackFunc: null, _target: null,
    _jsControlled: false, ctor: function () {
        this._rootContainerSize = cc.size(0, 0);
        this.init()
    }, init: function () {
        this._sequences = [];
        this._nodeSequences = new cc._Dictionary;
        this._baseValues = new cc._Dictionary;
        this._documentOutletNames = [];
        this._documentOutletNodes = [];
        this._documentCallbackNames = [];
        this._documentCallbackNodes = [];
        this._documentCallbackControlEvents = [];
        this._keyframeCallbacks = [];
        this._keyframeCallFuncs = {};
        return true
    }, getSequences: function () {
        return this._sequences
    }, setSequences: function (seqs) {
        this._sequences =
            seqs
    }, getAutoPlaySequenceId: function () {
        return this._autoPlaySequenceId
    }, setAutoPlaySequenceId: function (autoPlaySequenceId) {
        this._autoPlaySequenceId = autoPlaySequenceId
    }, getRootNode: function () {
        return this._rootNode
    }, setRootNode: function (rootNode) {
        this._rootNode = rootNode
    }, getOwner: function () {
        return this._owner
    }, setOwner: function (owner) {
        this._owner = owner
    }, addDocumentCallbackNode: function (node) {
        this._documentCallbackNodes.push(node)
    }, addDocumentCallbackName: function (name) {
        this._documentCallbackNames.push(name)
    },
    addDocumentCallbackControlEvents: function (controlEvents) {
        this._documentCallbackControlEvents.push(controlEvents)
    }, addDocumentOutletNode: function (node) {
        this._documentOutletNodes.push(node)
    }, addDocumentOutletName: function (name) {
        this._documentOutletNames.push(name)
    }, setDocumentControllerName: function (name) {
        this._documentControllerName = name
    }, getDocumentControllerName: function () {
        return this._documentControllerName
    }, getDocumentCallbackNames: function () {
        return this._documentCallbackNames
    }, getDocumentCallbackNodes: function () {
        return this._documentCallbackNodes
    },
    getDocumentCallbackControlEvents: function () {
        return this._documentCallbackControlEvents
    }, getDocumentOutletNames: function () {
        return this._documentOutletNames
    }, getDocumentOutletNodes: function () {
        return this._documentOutletNodes
    }, getLastCompletedSequenceName: function () {
        return this._lastCompletedSequenceName
    }, getKeyframeCallbacks: function () {
        return this._keyframeCallbacks
    }, getRootContainerSize: function () {
        return this._rootContainerSize
    }, setRootContainerSize: function (rootContainerSize) {
        this._rootContainerSize =
            cc.size(rootContainerSize.width, rootContainerSize.height)
    }, getDelegate: function () {
        return this._delegate
    }, setDelegate: function (delegate) {
        this._delegate = delegate
    }, getRunningSequenceName: function () {
        if (this._runningSequence)return this._runningSequence.getName();
        return null
    }, getContainerSize: function (node) {
        if (node)return node.getContentSize(); else return this._rootContainerSize
    }, addNode: function (node, seq) {
        this._nodeSequences.setObject(seq, node)
    }, setBaseValue: function (value, node, propName) {
        var props = this._baseValues.objectForKey(node);
        if (!props) {
            props = new cc._Dictionary;
            this._baseValues.setObject(props, node)
        }
        props.setObject(value, propName)
    }, moveAnimationsFromNode: function (fromNode, toNode) {
        var locBaseValues = this._baseValues;
        var baseValue = locBaseValues.objectForKey(fromNode);
        if (baseValue != null) {
            locBaseValues.setObject(baseValue, toNode);
            locBaseValues.removeObjectForKey(fromNode)
        }
        var locNodeSequences = this._nodeSequences;
        var seqs = locNodeSequences.objectForKey(fromNode);
        if (seqs != null) {
            locNodeSequences.setObject(seqs, toNode);
            locNodeSequences.removeObjectForKey(fromNode)
        }
    },
    getActionForCallbackChannel: function (channel) {
        var lastKeyframeTime = 0;
        var actions = [];
        var keyframes = channel.getKeyframes();
        var numKeyframes = keyframes.length;
        for (var i = 0; i < numKeyframes; ++i) {
            var keyframe = keyframes[i];
            var timeSinceLastKeyframe = keyframe.getTime() - lastKeyframeTime;
            lastKeyframeTime = keyframe.getTime();
            if (timeSinceLastKeyframe > 0)actions.push(cc.DelayTime.create(timeSinceLastKeyframe));
            var keyVal = keyframe.getValue();
            var selectorName = keyVal[0];
            var selectorTarget = keyVal[1];
            if (this._jsControlled) {
                var callbackName =
                    selectorTarget + ":" + selectorName;
                var callback = this._keyframeCallFuncs[callbackName];
                if (callback != null)actions.push(callback)
            } else {
                var target;
                if (selectorTarget == CCB_TARGETTYPE_DOCUMENTROOT)target = this._rootNode; else if (selectorTarget == CCB_TARGETTYPE_OWNER)target = this._owner;
                if (target != null)if (selectorName.length > 0) {
                    var selCallFunc = 0;
                    var targetAsCCBSelectorResolver = target;
                    if (target.onResolveCCBCCCallFuncSelector != null)selCallFunc = targetAsCCBSelectorResolver.onResolveCCBCCCallFuncSelector(target, selectorName);
                    if (selCallFunc == 0)cc.log("Skipping selector '" + selectorName + "' since no CCBSelectorResolver is present."); else actions.push(cc.CallFunc.create(selCallFunc, target))
                } else cc.log("Unexpected empty selector.")
            }
        }
        if (actions.length < 1)return null;
        return cc.Sequence.create(actions)
    }, getActionForSoundChannel: function (channel) {
        var lastKeyframeTime = 0;
        var actions = [];
        var keyframes = channel.getKeyframes();
        var numKeyframes = keyframes.length;
        for (var i = 0; i < numKeyframes; ++i) {
            var keyframe = keyframes[i];
            var timeSinceLastKeyframe =
                keyframe.getTime() - lastKeyframeTime;
            lastKeyframeTime = keyframe.getTime();
            if (timeSinceLastKeyframe > 0)actions.push(cc.DelayTime.create(timeSinceLastKeyframe));
            var keyVal = keyframe.getValue();
            var soundFile = cc.BuilderReader.getResourcePath() + keyVal[0];
            var pitch = parseFloat(keyVal[1]), pan = parseFloat(keyVal[2]), gain = parseFloat(keyVal[3]);
            actions.push(cc.BuilderSoundEffect.create(soundFile, pitch, pan, gain))
        }
        if (actions.length < 1)return null;
        return cc.Sequence.create(actions)
    }, runAnimationsForSequenceNamed: function (name) {
        this.runAnimationsForSequenceIdTweenDuration(this._getSequenceId(name),
            0)
    }, runAnimationsForSequenceNamedTweenDuration: function (name, tweenDuration) {
        this.runAnimationsForSequenceIdTweenDuration(this._getSequenceId(name), tweenDuration)
    }, runAnimationsForSequenceIdTweenDuration: function (nSeqId, tweenDuration) {
        if (nSeqId === -1)throw"cc.BuilderAnimationManager.runAnimationsForSequenceIdTweenDuration(): Sequence id should not be -1";
        tweenDuration = tweenDuration || 0;
        this._rootNode.stopAllActions();
        var allKeys = this._nodeSequences.allKeys();
        for (var i = 0, len = allKeys.length; i < len; i++) {
            var node =
                allKeys[i];
            node.stopAllActions();
            var seqs = this._nodeSequences.objectForKey(node);
            var seqNodeProps = seqs.objectForKey(nSeqId);
            var j;
            var seqNodePropNames = [];
            if (seqNodeProps) {
                var propKeys = seqNodeProps.allKeys();
                for (j = 0; j < propKeys.length; j++) {
                    var propName = propKeys[j];
                    var seqProp = seqNodeProps.objectForKey(propName);
                    seqNodePropNames.push(propName);
                    this._setFirstFrame(node, seqProp, tweenDuration);
                    this._runAction(node, seqProp, tweenDuration)
                }
            }
            var nodeBaseValues = this._baseValues.objectForKey(node);
            if (nodeBaseValues) {
                var baseKeys =
                    nodeBaseValues.allKeys();
                for (j = 0; j < baseKeys.length; j++) {
                    var selBaseKey = baseKeys[j];
                    if (seqNodePropNames.indexOf(selBaseKey) == -1) {
                        var value = nodeBaseValues.objectForKey(selBaseKey);
                        if (value != null)this._setAnimatedProperty(selBaseKey, node, value, tweenDuration)
                    }
                }
            }
        }
        var seq = this._getSequence(nSeqId);
        var completeAction = cc.Sequence.create(cc.DelayTime.create(seq.getDuration() + tweenDuration), cc.CallFunc.create(this._sequenceCompleted, this));
        this._rootNode.runAction(completeAction);
        var action;
        if (seq.getCallbackChannel()) {
            action =
                this.getActionForCallbackChannel(seq.getCallbackChannel());
            if (action)this._rootNode.runAction(action)
        }
        if (seq.getSoundChannel()) {
            action = this.getActionForSoundChannel(seq.getSoundChannel());
            if (action)this._rootNode.runAction(action)
        }
        this._runningSequence = this._getSequence(nSeqId)
    }, runAnimations: function (name, tweenDuration) {
        tweenDuration = tweenDuration || 0;
        var nSeqId;
        if (typeof name === "string")nSeqId = this._getSequenceId(name); else nSeqId = name;
        this.runAnimationsForSequenceIdTweenDuration(nSeqId, tweenDuration)
    },
    setAnimationCompletedCallback: function (target, callbackFunc) {
        this._target = target;
        this._animationCompleteCallbackFunc = callbackFunc
    }, setCompletedAnimationCallback: function (target, callbackFunc) {
        this.setAnimationCompletedCallback(target, callbackFunc)
    }, setCallFunc: function (callFunc, callbackNamed) {
        this._keyframeCallFuncs[callbackNamed] = callFunc
    }, debug: function () {
    }, _getBaseValue: function (node, propName) {
        var props = this._baseValues.objectForKey(node);
        if (props)return props.objectForKey(propName);
        return null
    },
    _getSequenceId: function (sequenceName) {
        var element = null;
        var locSequences = this._sequences;
        for (var i = 0, len = locSequences.length; i < len; i++) {
            element = locSequences[i];
            if (element && element.getName() === sequenceName)return element.getSequenceId()
        }
        return-1
    }, _getSequence: function (sequenceId) {
        var element = null;
        var locSequences = this._sequences;
        for (var i = 0, len = locSequences.length; i < len; i++) {
            element = locSequences[i];
            if (element && element.getSequenceId() === sequenceId)return element
        }
        return null
    }, _getAction: function (keyframe0, keyframe1, propName, node) {
        var duration = keyframe1.getTime() - (keyframe0 ? keyframe0.getTime() : 0);
        var getArr, type, getValueArr, x, y;
        if (propName === "rotation")return cc.BuilderRotateTo.create(duration, keyframe1.getValue()); else if (propName === "rotationX")return cc.BuilderRotateXTo.create(duration, keyframe1.getValue()); else if (propName === "rotationY")return cc.BuilderRotateYTo.create(duration, keyframe1.getValue()); else if (propName === "opacity")return cc.FadeTo.create(duration, keyframe1.getValue()); else if (propName ===
            "color") {
            var selColor = keyframe1.getValue().getColor();
            return cc.TintTo.create(duration, selColor.r, selColor.g, selColor.b)
        } else if (propName === "visible") {
            var isVisible = keyframe1.getValue();
            if (isVisible)return cc.Sequence.create(cc.DelayTime.create(duration), cc.Show.create()); else return cc.Sequence.create(cc.DelayTime.create(duration), cc.Hide.create())
        } else if (propName === "displayFrame")return cc.Sequence.create(cc.DelayTime.create(duration), cc.BuilderSetSpriteFrame.create(keyframe1.getValue())); else if (propName ===
            "position") {
            getArr = this._getBaseValue(node, propName);
            type = getArr[2];
            getValueArr = keyframe1.getValue();
            x = getValueArr[0];
            y = getValueArr[1];
            var containerSize = this.getContainerSize(node.getParent());
            var absPos = cc._getAbsolutePosition(x, y, type, containerSize, propName);
            return cc.MoveTo.create(duration, absPos)
        } else if (propName === "scale") {
            getArr = this._getBaseValue(node, propName);
            type = getArr[2];
            getValueArr = keyframe1.getValue();
            x = getValueArr[0];
            y = getValueArr[1];
            if (type === CCB_SCALETYPE_MULTIPLY_RESOLUTION) {
                var resolutionScale =
                    cc.BuilderReader.getResolutionScale();
                x *= resolutionScale;
                y *= resolutionScale
            }
            return cc.ScaleTo.create(duration, x, y)
        } else if (propName === "skew") {
            getValueArr = keyframe1.getValue();
            x = getValueArr[0];
            y = getValueArr[1];
            return cc.SkewTo.create(duration, x, y)
        } else cc.log("BuilderReader: Failed to create animation for property: " + propName);
        return null
    }, _setAnimatedProperty: function (propName, node, value, tweenDuration) {
        if (tweenDuration > 0) {
            var kf1 = new cc.BuilderKeyframe;
            kf1.setValue(value);
            kf1.setTime(tweenDuration);
            kf1.setEasingType(CCB_KEYFRAME_EASING_LINEAR);
            var tweenAction = this._getAction(null, kf1, propName, node);
            node.runAction(tweenAction)
        } else {
            var getArr, nType, x, y;
            if (propName === "position") {
                getArr = this._getBaseValue(node, propName);
                nType = getArr[2];
                x = value[0];
                y = value[1];
                node.setPosition(cc._getAbsolutePosition(x, y, nType, this.getContainerSize(node.getParent()), propName))
            } else if (propName === "scale") {
                getArr = this._getBaseValue(node, propName);
                nType = getArr[2];
                x = value[0];
                y = value[1];
                cc.setRelativeScale(node, x, y, nType,
                    propName)
            } else if (propName === "skew") {
                x = value[0];
                y = value[1];
                node.setSkewX(x);
                node.setSkewY(y)
            } else if (propName === "rotation")node.setRotation(value); else if (propName === "opacity")node.setOpacity(value); else if (propName === "displayFrame")node.setSpriteFrame(value); else if (propName === "color") {
                var ccColor3B = value.getColor();
                if (ccColor3B.r !== 255 || ccColor3B.g !== 255 || ccColor3B.b !== 255)node.setColor(ccColor3B)
            } else if (propName === "visible") {
                value = value || false;
                node.setVisible(value)
            } else cc.log("unsupported property name is " +
                propName)
        }
    }, _setFirstFrame: function (node, seqProp, tweenDuration) {
        var keyframes = seqProp.getKeyframes();
        if (keyframes.length === 0) {
            var baseValue = this._getBaseValue(node, seqProp.getName());
            if (!baseValue)cc.log("cc.BuilderAnimationManager._setFirstFrame(): No baseValue found for property");
            this._setAnimatedProperty(seqProp.getName(), node, baseValue, tweenDuration)
        } else {
            var keyframe = keyframes[0];
            this._setAnimatedProperty(seqProp.getName(), node, keyframe.getValue(), tweenDuration)
        }
    }, _getEaseAction: function (action, easingType, easingOpt) {
        if (easingType === CCB_KEYFRAME_EASING_LINEAR || easingType === CCB_KEYFRAME_EASING_INSTANT)return action; else if (easingType === CCB_KEYFRAME_EASING_CUBIC_IN)return cc.EaseIn.create(action, easingOpt); else if (easingType === CCB_KEYFRAME_EASING_CUBIC_OUT)return cc.EaseOut.create(action, easingOpt); else if (easingType === CCB_KEYFRAME_EASING_CUBIC_INOUT)return cc.EaseInOut.create(action, easingOpt); else if (easingType === CCB_KEYFRAME_EASING_BACK_IN)return cc.EaseBackIn.create(action); else if (easingType ===
            CCB_KEYFRAME_EASING_BACK_OUT)return cc.EaseBackOut.create(action); else if (easingType === CCB_KEYFRAME_EASING_BACK_INOUT)return cc.EaseBackInOut.create(action); else if (easingType === CCB_KEYFRAME_EASING_BOUNCE_IN)return cc.EaseBounceIn.create(action); else if (easingType === CCB_KEYFRAME_EASING_BOUNCE_OUT)return cc.EaseBounceOut.create(action); else if (easingType === CCB_KEYFRAME_EASING_BOUNCE_INOUT)return cc.EaseBounceInOut.create(action); else if (easingType === CCB_KEYFRAME_EASING_ELASTIC_IN)return cc.EaseElasticIn.create(action,
            easingOpt); else if (easingType === CCB_KEYFRAME_EASING_ELASTIC_OUT)return cc.EaseElasticOut.create(action, easingOpt); else if (easingType === CCB_KEYFRAME_EASING_ELASTIC_INOUT)return cc.EaseElasticInOut.create(action, easingOpt); else {
            cc.log("BuilderReader: Unkown easing type " + easingType);
            return action
        }
    }, _runAction: function (node, seqProp, tweenDuration) {
        var keyframes = seqProp.getKeyframes();
        var numKeyframes = keyframes.length;
        if (numKeyframes > 1) {
            var actions = [];
            var keyframeFirst = keyframes[0];
            var timeFirst = keyframeFirst.getTime() +
                tweenDuration;
            if (timeFirst > 0)actions.push(cc.DelayTime.create(timeFirst));
            for (var i = 0; i < numKeyframes - 1; ++i) {
                var kf0 = keyframes[i];
                var kf1 = keyframes[i + 1];
                var action = this._getAction(kf0, kf1, seqProp.getName(), node);
                if (action) {
                    action = this._getEaseAction(action, kf0.getEasingType(), kf0.getEasingOpt());
                    actions.push(action)
                }
            }
            var seq = cc.Sequence.create(actions);
            node.runAction(seq)
        }
    }, _sequenceCompleted: function () {
        var locRunningSequence = this._runningSequence;
        var locRunningName = locRunningSequence.getName();
        if (this._lastCompletedSequenceName !=
            locRunningSequence.getName())this._lastCompletedSequenceName = locRunningSequence.getName();
        var nextSeqId = locRunningSequence.getChainedSequenceId();
        this._runningSequence = null;
        if (nextSeqId != -1)this.runAnimations(nextSeqId, 0);
        if (this._delegate)this._delegate.completedAnimationSequenceNamed(locRunningName);
        if (this._target && this._animationCompleteCallbackFunc)this._animationCompleteCallbackFunc.call(this._target)
    }});
cc.BuilderSetSpriteFrame = cc.ActionInstant.extend({_spriteFrame: null, initWithSpriteFrame: function (spriteFrame) {
    this._spriteFrame = spriteFrame;
    return true
}, update: function (time) {
    this.target.setSpriteFrame(this._spriteFrame)
}});
cc.BuilderSetSpriteFrame.create = function (spriteFrame) {
    var ret = new cc.BuilderSetSpriteFrame;
    if (ret)if (ret.initWithSpriteFrame(spriteFrame))return ret;
    return null
};
cc.BuilderRotateTo = cc.ActionInterval.extend({_startAngle: 0, _dstAngle: 0, _diffAngle: 0, initWithDuration: function (duration, angle) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
        this._dstAngle = angle;
        return true
    } else return false
}, update: function (time) {
    this.target.setRotation(this._startAngle + this._diffAngle * time)
}, startWithTarget: function (node) {
    cc.ActionInterval.prototype.startWithTarget.call(this, node);
    this._startAngle = this.target.getRotation();
    this._diffAngle = this._dstAngle - this._startAngle
}});
cc.BuilderRotateTo.create = function (duration, angle) {
    var ret = new cc.BuilderRotateTo;
    if (ret)if (ret.initWithDuration(duration, angle))return ret;
    return null
};
cc.BuilderRotateXTo = cc.ActionInterval.extend({});
cc.BuilderRotateXTo.create = function (duration, angle) {
    throw"rotationX has not been implemented in cocos2d-html5";
};
cc.BuilderRotateYTo = cc.ActionInterval.extend({});
cc.BuilderRotateYTo.create = function (duration, angle) {
    throw"rotationY has not been implemented in cocos2d-html5";
};
cc.BuilderSoundEffect = cc.ActionInstant.extend({init: function (file) {
    this._file = file;
    return true
}, update: function (dt) {
    cc.audioEngine.playEffect(this._file)
}});
cc.BuilderSoundEffect.create = function (file, pitch, pan, gain) {
    var ret = new cc.BuilderSoundEffect;
    if (ret && ret.init(file))return ret;
    return null
};