cc.Component = cc.Class.extend({_owner: null, _name: "", _enabled: true, ctor: function () {
    this._owner = null;
    this._name = "";
    this._enabled = true
}, init: function () {
    return true
}, onEnter: function () {
}, onExit: function () {
}, update: function (delta) {
}, serialize: function (reader) {
}, isEnabled: function () {
    return this._enabled
}, setEnabled: function (enable) {
    this._enabled = enable
}, getName: function () {
    return this._name
}, setName: function (name) {
    this._name = name
}, setOwner: function (owner) {
    this._owner = owner
}, getOwner: function () {
    return this._owner
}});
cc.Component.create = function () {
    return new cc.Component
};
cc.ComponentContainer = cc.Class.extend({_components: null, _owner: null, ctor: function (node) {
    this._components = null;
    this._owner = node
}, getComponent: function (name) {
    if (!name)throw"cc.ComponentContainer.getComponent(): name should be non-null";
    name = name.trim();
    return this._components[name]
}, add: function (component) {
    if (!component)throw"cc.ComponentContainer.add(): component should be non-null";
    if (component.getOwner()) {
        cc.log("cc.ComponentContainer.add(): Component already added. It can't be added again");
        return false
    }
    if (this._components ==
        null) {
        this._components = {};
        this._owner.scheduleUpdate()
    }
    var oldComponent = this._components[component.getName()];
    if (oldComponent) {
        cc.log("cc.ComponentContainer.add(): Component already added. It can't be added again");
        return false
    }
    component.setOwner(this._owner);
    this._components[component.getName()] = component;
    component.onEnter();
    return true
}, remove: function (name) {
    if (!name)throw"cc.ComponentContainer.remove(): name should be non-null";
    if (!this._components)return false;
    if (name instanceof cc.Component)return this._removeByComponent(name);
    else {
        name = name.trim();
        return this._removeByComponent(this._components[name])
    }
}, _removeByComponent: function (component) {
    if (component)return false;
    component.onExit();
    component.setOwner(null);
    delete this._components[component.getName()];
    return true
}, removeAll: function () {
    if (!this._components)return;
    var locComponents = this._components;
    for (var selKey in locComponents) {
        var selComponent = locComponents[selKey];
        selComponent.onExit();
        selComponent.setOwner(null);
        delete locComponents[selKey]
    }
    this._owner.unscheduleUpdate();
    this._components = null
}, _alloc: function () {
    this._components = {}
}, visit: function (delta) {
    if (!this._components)return;
    var locComponents = this._components;
    for (var selKey in locComponents)locComponents[selKey].update(delta)
}, isEmpty: function () {
    if (!this._components)return true;
    for (var selkey in this._components)return false;
    return true
}});
var ccs = ccs || {};
ccs.Class = ccs.Class || cc.Class;
ccs.Class.extend = ccs.Class.extend || cc.Class.extend;
ccs.Node = ccs.Node || cc.Node;
ccs.Node.extend = ccs.Node.extend || cc.Node.extend;
ccs.NodeRGBA = ccs.NodeRGBA || cc.NodeRGBA;
ccs.NodeRGBA.extend = ccs.NodeRGBA.extend || cc.NodeRGBA.extend;
ccs.Sprite = ccs.Sprite || cc.Sprite;
ccs.Sprite.extend = ccs.Sprite.extend || cc.Sprite.extend;
ccs.Component = ccs.Component || cc.Component;
ccs.Component.extend = ccs.Component.extend || cc.Component.extend;
ccs.cocostudioVersion = "v1.3.0.0";
ccs.VERSION_COMBINED = 0.3;
ccs.VERSION_CHANGE_ROTATION_RANGE = 1;
ccs.VERSION_COLOR_READING = 1.1;
ccs.MAX_VERTEXZ_VALUE = 5E6;
ccs.ARMATURE_MAX_CHILD = 50;
ccs.ARMATURE_MAX_ZORDER = 100;
ccs.ARMATURE_MAX_COUNT = ccs.MAX_VERTEXZ_VALUE / ccs.ARMATURE_MAX_CHILD / ccs.ARMATURE_MAX_ZORDER;
ccs.AUTO_ADD_SPRITE_FRAME_NAME_PREFIX = false;
ccs.ENABLE_PHYSICS_CHIPMUNK_DETECT = false;
ccs.ENABLE_PHYSICS_SAVE_CALCULATED_VERTEX = false;
ccs.armatureVersion = function () {
    return"v1.1.0.0"
};
ccs.CONST_VERSION = "version";
ccs.CONST_VERSION_2_0 = 2;
ccs.CONST_VERSION_COMBINED = 0.3;
ccs.CONST_SKELETON = "skeleton";
ccs.CONST_ARMATURES = "armatures";
ccs.CONST_ARMATURE = "armature";
ccs.CONST_BONE = "b";
ccs.CONST_DISPLAY = "d";
ccs.CONST_ANIMATIONS = "animations";
ccs.CONST_ANIMATION = "animation";
ccs.CONST_MOVEMENT = "mov";
ccs.CONST_FRAME = "f";
ccs.CONST_TEXTURE_ATLAS = "TextureAtlas";
ccs.CONST_SUB_TEXTURE = "SubTexture";
ccs.CONST_A_NAME = "name";
ccs.CONST_A_DURATION = "dr";
ccs.CONST_A_FRAME_INDEX = "fi";
ccs.CONST_A_DURATION_TO = "to";
ccs.CONST_A_DURATION_TWEEN = "drTW";
ccs.CONST_A_LOOP = "lp";
ccs.CONST_A_MOVEMENT_SCALE = "sc";
ccs.CONST_A_MOVEMENT_DELAY = "dl";
ccs.CONST_A_DISPLAY_INDEX = "dI";
ccs.CONST_A_VERT = "vert";
ccs.CONST_A_FRAG = "frag";
ccs.CONST_A_PLIST = "plist";
ccs.CONST_A_PARENT = "parent";
ccs.CONST_A_SKEW_X = "kX";
ccs.CONST_A_SKEW_Y = "kY";
ccs.CONST_A_SCALE_X = "cX";
ccs.CONST_A_SCALE_Y = "cY";
ccs.CONST_A_Z = "z";
ccs.CONST_A_EVENT = "evt";
ccs.CONST_A_SOUND = "sd";
ccs.CONST_A_SOUND_EFFECT = "sdE";
ccs.CONST_A_TWEEN_EASING = "twE";
ccs.CONST_A_TWEEN_ROTATION = "twR";
ccs.CONST_A_EASING_PARAM = "twEP";
ccs.CONST_A_IS_ARMATURE = "isArmature";
ccs.CONST_A_DISPLAY_TYPE = "displayType";
ccs.CONST_A_MOVEMENT = "mov";
ccs.CONST_A_BLEND_TYPE = "bd";
ccs.CONST_A_BLEND_SRC = "bd_src";
ccs.CONST_A_BLEND_DST = "bd_dst";
ccs.CONST_A_X = "x";
ccs.CONST_A_Y = "y";
ccs.CONST_A_COCOS2DX_X = "cocos2d_x";
ccs.CONST_A_COCOS2DX_Y = "cocos2d_y";
ccs.CONST_A_WIDTH = "width";
ccs.CONST_A_HEIGHT = "height";
ccs.CONST_A_PIVOT_X = "pX";
ccs.CONST_A_PIVOT_Y = "pY";
ccs.CONST_A_COCOS2D_PIVOT_X = "cocos2d_pX";
ccs.CONST_A_COCOS2D_PIVOT_Y = "cocos2d_pY";
ccs.CONST_A_ALPHA = "a";
ccs.CONST_A_RED = "r";
ccs.CONST_A_GREEN = "g";
ccs.CONST_A_BLUE = "b";
ccs.CONST_A_ALPHA_OFFSET = "aM";
ccs.CONST_A_RED_OFFSET = "rM";
ccs.CONST_A_GREEN_OFFSET = "gM";
ccs.CONST_A_BLUE_OFFSET = "bM";
ccs.CONST_A_COLOR_TRANSFORM = "colorTransform";
ccs.CONST_A_TWEEN_FRAME = "tweenFrame";
ccs.CONST_A_ROTATION = "rotation";
ccs.CONST_A_USE_COLOR_INFO = "uci";
ccs.CONST_CONTOUR = "con";
ccs.CONST_CONTOUR_VERTEX = "con_vt";
ccs.CONST_MOVEMENT_EVENT_FRAME = "movementEventFrame";
ccs.CONST_SOUND_FRAME = "soundFrame";
ccs.CONST_FL_NAN = "NaN";
ccs.CONST_FRAME_DATA = "frame_data";
ccs.CONST_MOVEMENT_BONE_DATA = "mov_bone_data";
ccs.CONST_MOVEMENT_FRAME_DATA = "mov_frame_data";
ccs.CONST_MOVEMENT_DATA = "mov_data";
ccs.CONST_ANIMATION_DATA = "animation_data";
ccs.CONST_DISPLAY_DATA = "display_data";
ccs.CONST_SKIN_DATA = "skin_data";
ccs.CONST_BONE_DATA = "bone_data";
ccs.CONST_ARMATURE_DATA = "armature_data";
ccs.CONST_CONTOUR_DATA = "contour_data";
ccs.CONST_TEXTURE_DATA = "texture_data";
ccs.CONST_VERTEX_POINT = "vertex";
ccs.CONST_COLOR_INFO = "color";
ccs.CONST_CONFIG_FILE_PATH = "config_file_path";
ccs.CONST_CONTENT_SCALE = "content_scale";
ccs.DataInfo = function () {
    this.asyncStruct = null;
    this.configFileQueue = [];
    this.contentScale = 1;
    this.filename = "";
    this.baseFilePath = "";
    this.flashToolVersion = 0;
    this.cocoStudioVersion = 0
};
ccs.dataReaderHelper = {_configFileList: [], _flashToolVersion: ccs.CONST_VERSION_2_0, _cocoStudioVersion: ccs.CONST_VERSION_COMBINED, _positionReadScale: 1, _asyncRefCount: 0, _asyncRefTotalCount: 0, setPositionReadScale: function (scale) {
    this._positionReadScale = scale
}, getPositionReadScale: function () {
    return this._positionReadScale
}, clear: function () {
    this._configFileList = [];
    this._asyncRefCount = 0;
    this._asyncRefTotalCount = 0
}, addDataFromFile: function (filePath, isLoadSpriteFrame) {
    if (this._configFileList.indexOf(filePath) != -1)return;
    this._configFileList.push(filePath);
    this._initBaseFilePath(filePath);
    var str = cc.path.extname(filePath).toLowerCase();
    var dataInfo = new ccs.DataInfo;
    dataInfo.filename = filePath;
    dataInfo.basefilePath = this._initBaseFilePath(filePath);
    if (str == ".xml")this.addDataFromXML(filePath, dataInfo); else if (str == ".json" || str == ".exportjson")this.addDataFromJson(filePath, dataInfo, isLoadSpriteFrame)
}, addDataFromFileAsync: function (filePath, target, selector, isLoadSpriteFrame) {
    if (this._configFileList.indexOf(filePath) != -1) {
        if (target && selector)if (this._asyncRefTotalCount == 0 && this._asyncRefCount == 0)this._asyncCallBack(target, selector, 1); else this._asyncCallBack(target, selector, (this._asyncRefTotalCount - this._asyncRefCount) / this._asyncRefTotalCount);
        return
    }
    this._asyncRefTotalCount++;
    this._asyncRefCount++;
    var self = this;
    var fun = function () {
        self.addDataFromFile(filePath, isLoadSpriteFrame);
        self._asyncRefCount--;
        self._asyncCallBack(target, selector, (self._asyncRefTotalCount - self._asyncRefCount) / self._asyncRefTotalCount)
    };
    cc.director.getScheduler().scheduleCallbackForTarget(this, fun, 0.1, false)
}, _asyncCallBack: function (target, selector, percent) {
    if (target && typeof selector == "string")target[selector](percent); else if (target && typeof selector == "function")selector.call(target, percent)
}, _initBaseFilePath: function (filePath) {
    var path = filePath;
    var pos = path.lastIndexOf("/");
    if (pos > -1)path = path.substr(0, pos + 1); else path = "";
    return path
}, addDataFromXML: function (xml, dataInfo) {
    var xmlStr = cc.loader.getRes(xml);
    if (!xmlStr)throw"Please load the resource first : " +
        xml;
    var skeletonXML = cc.saxParser.parse(xmlStr);
    var skeleton = skeletonXML.documentElement;
    if (skeleton)this.addDataFromCache(skeleton, dataInfo)
}, addDataFromCache: function (skeleton, dataInfo) {
    if (!skeleton) {
        cc.log("XML error  or  XML is empty.");
        return
    }
    dataInfo.flashToolVersion = parseFloat(skeleton.getAttribute(ccs.CONST_VERSION));
    var armaturesXML = skeleton.querySelectorAll(ccs.CONST_SKELETON + " \x3e " + ccs.CONST_ARMATURES + " \x3e  " + ccs.CONST_ARMATURE + "");
    var armatureDataManager = ccs.armatureDataManager;
    for (var i =
        0; i < armaturesXML.length; i++) {
        var armatureData = this.decodeArmature(armaturesXML[i], dataInfo);
        armatureDataManager.addArmatureData(armatureData.name, armatureData, dataInfo.filename)
    }
    var animationsXML = skeleton.querySelectorAll(ccs.CONST_SKELETON + " \x3e " + ccs.CONST_ANIMATIONS + " \x3e  " + ccs.CONST_ANIMATION + "");
    for (var i = 0; i < animationsXML.length; i++) {
        var animationData = this.decodeAnimation(animationsXML[i], dataInfo);
        armatureDataManager.addAnimationData(animationData.name, animationData, dataInfo.filename)
    }
    var texturesXML =
        skeleton.querySelectorAll(ccs.CONST_SKELETON + " \x3e " + ccs.CONST_TEXTURE_ATLAS + " \x3e  " + ccs.CONST_SUB_TEXTURE + "");
    for (var i = 0; i < texturesXML.length; i++) {
        var textureData = this.decodeTexture(texturesXML[i], dataInfo);
        armatureDataManager.addTextureData(textureData.name, textureData, dataInfo.filename)
    }
    skeleton = null
}, decodeArmature: function (armatureXML, dataInfo) {
    var name = armatureXML.getAttribute(ccs.CONST_A_NAME);
    var armatureData = new ccs.ArmatureData;
    armatureData.name = name;
    var bonesXML = armatureXML.querySelectorAll(ccs.CONST_ARMATURE +
        " \x3e " + ccs.CONST_BONE);
    for (var i = 0; i < bonesXML.length; i++) {
        var boneXML = bonesXML[i];
        var parentName = boneXML.getAttribute(ccs.CONST_A_PARENT);
        var parentXML = null;
        if (parentName)for (var j = 0; j < bonesXML.length; j++) {
            parentXML = bonesXML[j];
            if (parentName == bonesXML[j].getAttribute(ccs.CONST_A_NAME))break
        }
        var boneData = this.decodeBone(boneXML, parentXML, dataInfo);
        armatureData.addBoneData(boneData)
    }
    return armatureData
}, decodeBone: function (boneXML, parentXML, dataInfo) {
    var name = boneXML.getAttribute(ccs.CONST_A_NAME);
    if (name == "")return;
    var boneData = new ccs.BoneData;
    boneData.name = name;
    boneData.parentName = boneXML.getAttribute(ccs.CONST_A_PARENT) || "";
    boneData.zOrder = parseInt(boneXML.getAttribute(ccs.CONST_A_Z)) || 0;
    var displaysXML = boneXML.querySelectorAll(ccs.CONST_BONE + " \x3e " + ccs.CONST_DISPLAY);
    var displayXML;
    for (var i = 0; i < displaysXML.length; i++) {
        displayXML = displaysXML[i];
        var displayData = this.decodeBoneDisplay(displayXML, dataInfo);
        boneData.addDisplayData(displayData)
    }
    return boneData
}, decodeBoneDisplay: function (displayXML, dataInfo) {
    var isArmature = parseFloat(displayXML.getAttribute(ccs.CONST_A_IS_ARMATURE)) || 0;
    var displayData = null;
    if (isArmature == 1) {
        displayData = new ccs.ArmatureDisplayData;
        displayData.displayType = ccs.DISPLAY_TYPE_ARMATURE
    } else {
        displayData = new ccs.SpriteDisplayData;
        displayData.displayType = ccs.DISPLAY_TYPE_SPRITE
    }
    var displayName = displayXML.getAttribute(ccs.CONST_A_NAME) || "";
    if (displayName)displayData.displayName = displayName;
    return displayData
}, decodeAnimation: function (animationXML, dataInfo) {
    var name = animationXML.getAttribute(ccs.CONST_A_NAME);
    var aniData = new ccs.AnimationData;
    var armatureData = ccs.armatureDataManager.getArmatureData(name);
    aniData.name = name;
    var movementsXML = animationXML.querySelectorAll(ccs.CONST_ANIMATION + " \x3e " + ccs.CONST_MOVEMENT);
    var movementXML = null;
    for (var i = 0; i < movementsXML.length; i++) {
        movementXML = movementsXML[i];
        var movementData = this.decodeMovement(movementXML, armatureData, dataInfo);
        aniData.addMovement(movementData)
    }
    return aniData
}, decodeMovement: function (movementXML, armatureData, dataInfo) {
    var movName = movementXML.getAttribute(ccs.CONST_A_NAME);
    var movementData = new ccs.MovementData;
    movementData.name = movName;
    var duration, durationTo, durationTween, loop = 0, tweenEasing = 0;
    duration = parseFloat(movementXML.getAttribute(ccs.CONST_A_DURATION)) || 0;
    movementData.duration = duration;
    durationTo = parseFloat(movementXML.getAttribute(ccs.CONST_A_DURATION_TO)) || 0;
    movementData.durationTo = durationTo;
    durationTween = parseFloat(movementXML.getAttribute(ccs.CONST_A_DURATION_TWEEN)) || 0;
    movementData.durationTween = durationTween;
    loop = movementXML.getAttribute(ccs.CONST_A_LOOP);
    movementData.loop = loop ? Boolean(parseFloat(loop)) : true;
    var easing = movementXML.getAttribute(ccs.CONST_A_TWEEN_EASING);
    if (easing)if (easing != ccs.CONST_FL_NAN) {
        tweenEasing = parseFloat(easing) || 0;
        movementData.tweenEasing = tweenEasing == 2 ? ccs.TweenType.sineEaseInOut : tweenEasing
    } else movementData.tweenEasing = ccs.TweenType.linear;
    var movBonesXml = movementXML.querySelectorAll(ccs.CONST_MOVEMENT + " \x3e " + ccs.CONST_BONE);
    var movBoneXml = null;
    for (var i = 0; i < movBonesXml.length; i++) {
        movBoneXml = movBonesXml[i];
        var boneName =
            movBoneXml.getAttribute(ccs.CONST_A_NAME);
        if (movementData.getMovementBoneData(boneName))continue;
        var boneData = armatureData.getBoneData(boneName);
        var parentName = boneData.parentName;
        var parentXML = null;
        if (parentName != "")for (var j = 0; j < movBonesXml.length; j++) {
            parentXML = movBonesXml[j];
            if (parentName == parentXML.getAttribute(ccs.CONST_A_NAME))break
        }
        var moveBoneData = this.decodeMovementBone(movBoneXml, parentXML, boneData, dataInfo);
        movementData.addMovementBoneData(moveBoneData)
    }
    return movementData
}, decodeMovementBone: function (movBoneXml, parentXml, boneData, dataInfo) {
    var movBoneData = new ccs.MovementBoneData;
    var scale, delay;
    if (movBoneXml) {
        scale = parseFloat(movBoneXml.getAttribute(ccs.CONST_A_MOVEMENT_SCALE)) || 0;
        movBoneData.scale = scale;
        delay = parseFloat(movBoneXml.getAttribute(ccs.CONST_A_MOVEMENT_DELAY)) || 0;
        if (delay > 0)delay -= 1;
        movBoneData.delay = delay
    }
    var length = 0;
    var parentTotalDuration = 0;
    var currentDuration = 0;
    var parentFrameXML = null;
    var parentXMLList = [];
    if (parentXml != null) {
        var parentFramesXML = parentXml.querySelectorAll(ccs.CONST_BONE +
            " \x3e " + ccs.CONST_FRAME);
        for (var i = 0; i < parentFramesXML.length; i++)parentXMLList.push(parentFramesXML[i]);
        length = parentXMLList.length
    }
    var totalDuration = 0;
    var name = movBoneXml.getAttribute(ccs.CONST_A_NAME);
    movBoneData.name = name;
    var framesXML = movBoneXml.querySelectorAll(ccs.CONST_BONE + " \x3e " + ccs.CONST_FRAME);
    var j = 0;
    for (var ii = 0; ii < framesXML.length; ii++) {
        var frameXML = framesXML[ii];
        if (parentXml)while (j < length && (parentFrameXML ? totalDuration < parentTotalDuration || totalDuration >= parentTotalDuration + currentDuration :
            true)) {
            parentFrameXML = parentXMLList[j];
            parentTotalDuration += currentDuration;
            currentDuration = parseFloat(parentFrameXML.getAttribute(ccs.CONST_A_DURATION));
            j++
        }
        var frameData = this.decodeFrame(frameXML, parentFrameXML, boneData, dataInfo);
        movBoneData.addFrameData(frameData);
        frameData.frameID = totalDuration;
        totalDuration += frameData.duration;
        movBoneData.duration = totalDuration
    }
    var frames = movBoneData.frameList;
    var pi = Math.PI;
    for (var i = frames.length - 1; i >= 0; i--)if (i > 0) {
        var difSkewX = frames[i].skewX - frames[i - 1].skewX;
        var difSkewY = frames[i].skewY - frames[i - 1].skewY;
        if (difSkewX < -pi || difSkewX > pi)frames[i - 1].skewX = difSkewX < 0 ? frames[i - 1].skewX - 2 * pi : frames[i - 1].skewX + 2 * pi;
        if (difSkewY < -pi || difSkewY > pi)frames[i - 1].skewY = difSkewY < 0 ? frames[i - 1].skewY - 2 * pi : frames[i - 1].skewY + 2 * pi
    }
    if (movBoneData.frameList.length > 0) {
        var frameData = new ccs.FrameData;
        frameData.copy(movBoneData.frameList[movBoneData.frameList.length - 1]);
        frameData.frameID = movBoneData.duration;
        movBoneData.addFrameData(frameData)
    }
    return movBoneData
}, decodeFrame: function (frameXML, parentFrameXml, boneData, dataInfo) {
    var frameData = new ccs.FrameData;
    frameData.movement = frameXML.getAttribute(ccs.CONST_A_MOVEMENT) || "";
    frameData.event = frameXML.getAttribute(ccs.CONST_A_EVENT) || "";
    frameData.blendType = parseInt(frameXML.getAttribute(ccs.CONST_A_BLEND_TYPE)) || ccs.BLEND_TYPE_NORMAL;
    var blendFunc = frameData.blendFunc;
    switch (frameData.blendType) {
        case ccs.BLEND_TYPE_NORMAL:
            blendFunc.src = cc.BLEND_SRC;
            blendFunc.dst = cc.BLEND_DST;
            break;
        case ccs.BLEND_TYPE_ADD:
            blendFunc.src = cc.SRC_ALPHA;
            blendFunc.dst =
                cc.ONE;
            break;
        case ccs.BLEND_TYPE_MULTIPLY:
            blendFunc.src = cc.ONE_MINUS_SRC_ALPHA;
            blendFunc.dst = cc.ONE_MINUS_DST_COLOR;
            break;
        case ccs.BLEND_TYPE_SCREEN:
            blendFunc.src = cc.ONE;
            blendFunc.dst = cc.ONE_MINUS_DST_COLOR;
            break;
        default:
            break
    }
    frameData.sound = frameXML.getAttribute(ccs.CONST_A_SOUND) || "";
    frameData.soundEffect = frameXML.getAttribute(ccs.CONST_A_SOUND_EFFECT) || "";
    var isTween = frameXML.getAttribute(ccs.CONST_A_TWEEN_FRAME);
    if (isTween == null)isTween = true;
    frameData.isTween = Boolean(isTween);
    if (dataInfo.flashToolVersion >=
        ccs.CONST_VERSION_2_0) {
        frameData.x = parseFloat(frameXML.getAttribute(ccs.CONST_A_COCOS2DX_X)) || 0;
        frameData.y = -parseFloat(frameXML.getAttribute(ccs.CONST_A_COCOS2DX_Y)) || 0
    } else {
        frameData.x = parseFloat(frameXML.getAttribute(ccs.CONST_A_X)) || 0;
        frameData.y = -parseFloat(frameXML.getAttribute(ccs.CONST_A_Y)) || 0
    }
    frameData.x *= this._positionReadScale;
    frameData.y *= this._positionReadScale;
    frameData.scaleX = parseFloat(frameXML.getAttribute(ccs.CONST_A_SCALE_X)) || 0;
    frameData.scaleY = parseFloat(frameXML.getAttribute(ccs.CONST_A_SCALE_Y)) ||
        0;
    frameData.skewX = cc.degreesToRadians(parseFloat(frameXML.getAttribute(ccs.CONST_A_SKEW_X)) || 0);
    frameData.skewY = cc.degreesToRadians(-parseFloat(frameXML.getAttribute(ccs.CONST_A_SKEW_Y)) || 0);
    frameData.duration = parseFloat(frameXML.getAttribute(ccs.CONST_A_DURATION)) || 0;
    frameData.displayIndex = parseFloat(frameXML.getAttribute(ccs.CONST_A_DISPLAY_INDEX)) || 0;
    frameData.zOrder = parseFloat(frameXML.getAttribute(ccs.CONST_A_Z)) || 0;
    frameData.tweenRotate = parseFloat(frameXML.getAttribute(ccs.CONST_A_TWEEN_ROTATION)) ||
        0;
    var colorTransformXMLList = frameXML.querySelectorAll(ccs.CONST_FRAME + " \x3e " + ccs.CONST_A_COLOR_TRANSFORM);
    if (colorTransformXMLList.length > 0) {
        var colorTransformXML = colorTransformXMLList[0];
        var alpha = 0, red = 0, green = 0, blue = 0;
        var alphaOffset = 0, redOffset = 0, greenOffset = 0, blueOffset = 100;
        alpha = parseFloat(colorTransformXML.getAttribute(ccs.CONST_A_ALPHA)) || alpha;
        red = parseFloat(colorTransformXML.getAttribute(ccs.CONST_A_RED)) || red;
        green = parseFloat(colorTransformXML.getAttribute(ccs.CONST_A_GREEN)) || green;
        blue = parseFloat(colorTransformXML.getAttribute(ccs.CONST_A_BLUE)) || blue;
        var str_alphaOffset = colorTransformXML.getAttribute(ccs.CONST_A_ALPHA_OFFSET);
        if (str_alphaOffset)alphaOffset = parseFloat(str_alphaOffset);
        var str_redOffset = colorTransformXML.getAttribute(ccs.CONST_A_RED_OFFSET);
        if (str_redOffset)redOffset = parseFloat(str_redOffset);
        var str_greenOffset = colorTransformXML.getAttribute(ccs.CONST_A_GREEN_OFFSET);
        if (str_redOffset)greenOffset = parseFloat(str_greenOffset);
        var str_blueOffset = colorTransformXML.getAttribute(ccs.CONST_A_BLUE_OFFSET);
        if (str_blueOffset)blueOffset = parseFloat(str_blueOffset);
        frameData.a = 2.55 * alphaOffset + alpha;
        frameData.r = 2.55 * redOffset + red;
        frameData.g = 2.55 * greenOffset + green;
        frameData.b = 2.55 * blueOffset + blue;
        frameData.isUseColorInfo = true
    }
    if (frameData.displayIndex == -1)frameData.a = 0;
    var tweenEasing = frameXML.getAttribute(ccs.CONST_A_TWEEN_EASING);
    if (tweenEasing)if (tweenEasing != ccs.CONST_FL_NAN)frameData.tweenEasing = tweenEasing == 2 ? ccs.TweenType.sineEaseInOut : tweenEasing; else frameData.tweenEasing = ccs.TweenType.linear;
    if (parentFrameXml) {
        var helpNode = new ccs.BaseData;
        if (dataInfo.flashToolVersion >= ccs.CONST_VERSION_2_0) {
            helpNode.x = parseFloat(parentFrameXml.getAttribute(ccs.CONST_A_COCOS2DX_X)) || 0;
            helpNode.y = parseFloat(parentFrameXml.getAttribute(ccs.CONST_A_COCOS2DX_Y)) || 0
        } else {
            helpNode.x = parseFloat(parentFrameXml.getAttribute(ccs.CONST_A_X)) || 0;
            helpNode.y = parseFloat(parentFrameXml.getAttribute(ccs.CONST_A_Y)) || 0
        }
        helpNode.skewX = parseFloat(parentFrameXml.getAttribute(ccs.CONST_A_SKEW_X)) || 0;
        helpNode.skewY = parseFloat(parentFrameXml.getAttribute(ccs.CONST_A_SKEW_Y)) ||
            0;
        helpNode.y = -helpNode.y;
        helpNode.skewX = cc.degreesToRadians(helpNode.skewX);
        helpNode.skewY = cc.degreesToRadians(-helpNode.skewY);
        ccs.TransformHelp.transformFromParent(frameData, helpNode)
    }
    return frameData
}, decodeTexture: function (textureXML, dataInfo) {
    var textureData = new ccs.TextureData;
    if (textureXML.getAttribute(ccs.CONST_A_NAME))textureData.name = textureXML.getAttribute(ccs.CONST_A_NAME);
    var px, py, width, height = 0;
    if (dataInfo.flashToolVersion >= ccs.CONST_VERSION_2_0) {
        px = parseFloat(textureXML.getAttribute(ccs.CONST_A_COCOS2D_PIVOT_X)) ||
            0;
        py = parseFloat(textureXML.getAttribute(ccs.CONST_A_COCOS2D_PIVOT_Y)) || 0
    } else {
        px = parseFloat(textureXML.getAttribute(ccs.CONST_A_PIVOT_X)) || 0;
        py = parseFloat(textureXML.getAttribute(ccs.CONST_A_PIVOT_Y)) || 0
    }
    width = parseFloat(textureXML.getAttribute(ccs.CONST_A_WIDTH)) || 0;
    height = parseFloat(textureXML.getAttribute(ccs.CONST_A_HEIGHT)) || 0;
    var anchorPointX = px / width;
    var anchorPointY = (height - py) / height;
    textureData.pivotX = anchorPointX;
    textureData.pivotY = anchorPointY;
    var contoursXML = textureXML.querySelectorAll(ccs.CONST_SUB_TEXTURE +
        " \x3e " + ccs.CONST_CONTOUR);
    for (var i = 0; i < contoursXML.length; i++)this.decodeContour(contoursXML[i], dataInfo);
    return textureData
}, decodeContour: function (contourXML, dataInfo) {
    var contourData = new ccs.ContourData;
    var vertexDatasXML = contourXML.querySelectorAll(ccs.CONST_CONTOUR + " \x3e " + ccs.CONST_CONTOUR_VERTEX);
    var vertexDataXML;
    for (var i = 0; i < vertexDatasXML.length; i++) {
        vertexDataXML = vertexDatasXML[i];
        var vertex = cc.p(0, 0);
        vertex.x = parseFloat(vertexDataXML.getAttribute(ccs.CONST_A_X)) || 0;
        vertex.y = parseFloat(vertexDataXML.getAttribute(ccs.CONST_A_Y)) ||
            0;
        contourData.vertexList.push(vertex)
    }
    return contourData
}, addDataFromJson: function (filePath, dataInfo, isLoadSpriteFrame) {
    var fileContent = cc.loader.getRes(filePath);
    this.addDataFromJsonCache(fileContent, dataInfo, isLoadSpriteFrame)
}, addDataFromJsonCache: function (dic, dataInfo, isLoadSpriteFrame) {
    dataInfo.contentScale = dic[ccs.CONST_CONTENT_SCALE] || 1;
    var armatureDataArr = dic[ccs.CONST_ARMATURE_DATA] || [];
    var armatureData;
    for (var i = 0; i < armatureDataArr.length; i++) {
        armatureData = this.decodeArmatureFromJSON(armatureDataArr[i],
            dataInfo);
        ccs.armatureDataManager.addArmatureData(armatureData.name, armatureData, dataInfo.filename)
    }
    var animationDataArr = dic[ccs.CONST_ANIMATION_DATA] || [];
    var animationData;
    for (var i = 0; i < animationDataArr.length; i++) {
        animationData = this.decodeAnimationFromJson(animationDataArr[i], dataInfo);
        ccs.armatureDataManager.addAnimationData(animationData.name, animationData, dataInfo.filename)
    }
    var textureDataArr = dic[ccs.CONST_TEXTURE_DATA] || [];
    var textureData;
    for (var i = 0; i < textureDataArr.length; i++) {
        textureData =
            this.decodeTextureFromJson(textureDataArr[i], dataInfo);
        ccs.armatureDataManager.addTextureData(textureData.name, textureData, dataInfo.filename)
    }
    if (isLoadSpriteFrame) {
        var configFiles = dic[ccs.CONST_CONFIG_FILE_PATH] || [];
        var locFilePath, locPos, locPlistPath, locImagePath;
        for (var i = 0; i < configFiles.length; i++) {
            locFilePath = configFiles[i];
            locPos = locFilePath.lastIndexOf(".");
            locFilePath = locFilePath.substring(0, locPos);
            locPlistPath = dataInfo.basefilePath + locFilePath + ".plist";
            locImagePath = dataInfo.basefilePath +
                locFilePath + ".png";
            ccs.armatureDataManager.addSpriteFrameFromFile(locPlistPath, locImagePath, dataInfo.filename)
        }
    }
    armatureData = null;
    animationData = null
}, decodeArmatureFromJSON: function (json, dataInfo) {
    var armatureData = new ccs.ArmatureData;
    var name = json[ccs.CONST_A_NAME];
    if (name)armatureData.name = name;
    dataInfo.cocoStudioVersion = armatureData.dataVersion = json[ccs.CONST_VERSION] || 0.1;
    var boneDataList = json[ccs.CONST_BONE_DATA];
    for (var i = 0; i < boneDataList.length; i++)armatureData.addBoneData(this.decodeBoneFromJson(boneDataList[i],
        dataInfo));
    return armatureData
}, decodeBoneFromJson: function (json, dataInfo) {
    var boneData = new ccs.BoneData;
    this.decodeNodeFromJson(boneData, json, dataInfo);
    boneData.name = json[ccs.CONST_A_NAME] || "";
    boneData.parentName = json[ccs.CONST_A_PARENT] || "";
    var displayDataList = json[ccs.CONST_DISPLAY_DATA] || [];
    for (var i = 0; i < displayDataList.length; i++) {
        var locDisplayData = this.decodeBoneDisplayFromJson(displayDataList[i], dataInfo);
        boneData.addDisplayData(locDisplayData)
    }
    return boneData
}, decodeBoneDisplayFromJson: function (json, dataInfo) {
    var displayType = json[ccs.CONST_A_DISPLAY_TYPE] || ccs.DISPLAY_TYPE_SPRITE;
    var displayData = null;
    switch (displayType) {
        case ccs.DISPLAY_TYPE_SPRITE:
            displayData = new ccs.SpriteDisplayData;
            displayData.displayName = json[ccs.CONST_A_NAME] || "";
            var dicArray = json[ccs.CONST_SKIN_DATA] || [];
            var dic = dicArray[0];
            if (dic) {
                var skinData = displayData.skinData;
                skinData.x = (dic[ccs.CONST_A_X] || 0) * this._positionReadScale;
                skinData.y = (dic[ccs.CONST_A_Y] || 0) * this._positionReadScale;
                if (dic[ccs.CONST_A_SCALE_X] !== undefined)skinData.scaleX =
                    dic[ccs.CONST_A_SCALE_X];
                if (dic[ccs.CONST_A_SCALE_Y] !== undefined)skinData.scaleY = dic[ccs.CONST_A_SCALE_Y];
                skinData.skewX = dic[ccs.CONST_A_SKEW_X] || 0;
                skinData.skewY = dic[ccs.CONST_A_SKEW_Y] || 0;
                skinData.x *= dataInfo.contentScale;
                skinData.y *= dataInfo.contentScale;
                dic = null
            }
            break;
        case ccs.DISPLAY_TYPE_ARMATURE:
            displayData = new ccs.ArmatureDisplayData;
            displayData.displayName = json[ccs.CONST_A_NAME] || "";
            break;
        case ccs.DISPLAY_TYPE_PARTICLE:
            displayData = new ccs.ParticleDisplayData;
            displayData.displayName = dataInfo.basefilePath +
                json[ccs.CONST_A_PLIST] || "";
            break;
        default:
            displayData = new ccs.SpriteDisplayData;
            break
    }
    displayData.displayType = displayType;
    return displayData
}, decodeAnimationFromJson: function (json, dataInfo) {
    var aniData = new ccs.AnimationData;
    aniData.name = json[ccs.CONST_A_NAME] || "";
    var movementDataList = json[ccs.CONST_MOVEMENT_DATA] || [];
    for (var i = 0; i < movementDataList.length; i++) {
        var locMovementData = this.decodeMovementFromJson(movementDataList[i], dataInfo);
        aniData.addMovement(locMovementData)
    }
    return aniData
}, decodeMovementFromJson: function (json, dataInfo) {
    var movementData = new ccs.MovementData;
    movementData.loop = json[ccs.CONST_A_LOOP] || false;
    movementData.durationTween = json[ccs.CONST_A_DURATION_TWEEN] || 0;
    movementData.durationTo = json[ccs.CONST_A_DURATION_TO] || 0;
    movementData.duration = json[ccs.CONST_A_DURATION] || 0;
    if (json[ccs.CONST_A_MOVEMENT_SCALE] !== undefined)movementData.scale = json[ccs.CONST_A_MOVEMENT_SCALE];
    movementData.tweenEasing = json[ccs.CONST_A_TWEEN_EASING] || ccs.TweenType.linear;
    movementData.name = json[ccs.CONST_A_NAME] || "";
    var movementBoneList =
        json[ccs.CONST_MOVEMENT_BONE_DATA] || [];
    for (var i = 0; i < movementBoneList.length; i++) {
        var locMovementBoneData = this.decodeMovementBoneFromJson(movementBoneList[i], dataInfo);
        movementData.addMovementBoneData(locMovementBoneData)
    }
    return movementData
}, decodeMovementBoneFromJson: function (json, dataInfo) {
    var movementBoneData = new ccs.MovementBoneData;
    movementBoneData.delay = json[ccs.CONST_A_MOVEMENT_DELAY] || 0;
    if (json[ccs.CONST_A_MOVEMENT_SCALE] !== undefined)movementBoneData.scale = json[ccs.CONST_A_MOVEMENT_SCALE];
    movementBoneData.name = json[ccs.CONST_A_NAME] || "";
    var frameDataList = json[ccs.CONST_FRAME_DATA] || [];
    for (var i = 0; i < frameDataList.length; i++) {
        var frameData = this.decodeFrameFromJson(frameDataList[i], dataInfo);
        movementBoneData.addFrameData(frameData);
        if (dataInfo.cocoStudioVersion < ccs.CONST_VERSION_COMBINED) {
            frameData.frameID = movementBoneData.duration;
            movementBoneData.duration += frameData.duration
        }
    }
    if (dataInfo.cocoStudioVersion < ccs.VERSION_CHANGE_ROTATION_RANGE) {
        var frames = movementBoneData.frameList;
        var pi =
            Math.PI;
        for (var i = frames.length - 1; i >= 0; i--)if (i > 0) {
            var difSkewX = frames[i].skewX - frames[i - 1].skewX;
            var difSkewY = frames[i].skewY - frames[i - 1].skewY;
            if (difSkewX < -pi || difSkewX > pi)frames[i - 1].skewX = difSkewX < 0 ? frames[i - 1].skewX - 2 * pi : frames[i - 1].skewX + 2 * pi;
            if (difSkewY < -pi || difSkewY > pi)frames[i - 1].skewY = difSkewY < 0 ? frames[i - 1].skewY - 2 * pi : frames[i - 1].skewY + 2 * pi
        }
    }
    if (dataInfo.cocoStudioVersion < ccs.CONST_VERSION_COMBINED)if (movementBoneData.frameList.length > 0) {
        var frameData = new ccs.FrameData;
        frameData.copy(movementBoneData.frameList[movementBoneData.frameList.length -
            1]);
        movementBoneData.addFrameData(frameData);
        frameData.frameID = movementBoneData.duration
    }
    return movementBoneData
}, decodeFrameFromJson: function (json, dataInfo) {
    var frameData = new ccs.FrameData;
    this.decodeNodeFromJson(frameData, json, dataInfo);
    frameData.duration = json[ccs.CONST_A_DURATION] || 0;
    frameData.tweenEasing = json[ccs.CONST_A_TWEEN_EASING] || ccs.TweenType.linear;
    frameData.displayIndex = json[ccs.CONST_A_DISPLAY_INDEX] || 0;
    var bd_src = json[ccs.CONST_A_BLEND_SRC] || cc.BLEND_SRC;
    var bd_dst = json[ccs.CONST_A_BLEND_DST] ||
        cc.BLEND_DST;
    frameData.blendFunc.src = bd_src;
    frameData.blendFunc.dst = bd_dst;
    frameData.event = json[ccs.CONST_A_EVENT] || null;
    if (json[ccs.CONST_A_TWEEN_FRAME] !== undefined)frameData.isTween = json[ccs.CONST_A_TWEEN_FRAME];
    if (dataInfo.cocoStudioVersion < ccs.CONST_VERSION_COMBINED)frameData.duration = json[ccs.CONST_A_DURATION] || 0; else frameData.frameID = json[ccs.CONST_A_FRAME_INDEX] || 0;
    var twEPs = json[ccs.CONST_A_EASING_PARAM] || [];
    for (var i = 0; i < twEPs.length; i++) {
        var twEP = twEPs[i];
        frameData.easingParams[i] = twEP
    }
    return frameData
},
    decodeTextureFromJson: function (json) {
        var textureData = new ccs.TextureData;
        textureData.name = json[ccs.CONST_A_NAME] || "";
        textureData.width = json[ccs.CONST_A_WIDTH] || 0;
        textureData.height = json[ccs.CONST_A_HEIGHT] || 0;
        textureData.pivotX = json[ccs.CONST_A_PIVOT_X] || 0;
        textureData.pivotY = json[ccs.CONST_A_PIVOT_Y] || 0;
        var contourDataList = json[ccs.CONST_CONTOUR_DATA] || [];
        for (var i = 0; i < contourDataList.length; i++) {
            var locContourData = this.decodeContourFromJson(contourDataList[i]);
            textureData.contourDataList.push(locContourData)
        }
        return textureData
    },
    decodeContourFromJson: function (json) {
        var contourData = new ccs.ContourData;
        var vertexPointList = json[ccs.CONST_VERTEX_POINT] || [];
        for (var i = 0; i < vertexPointList.length; i++) {
            var dic = vertexPointList[i];
            var vertex = cc.p(0, 0);
            vertex.x = dic[ccs.CONST_A_X] || 0;
            vertex.y = dic[ccs.CONST_A_Y] || 0;
            contourData.vertexList.push(vertex)
        }
        return contourData
    }, decodeNodeFromJson: function (node, json, dataInfo) {
        node.x = json[ccs.CONST_A_X] || 0;
        node.y = json[ccs.CONST_A_Y] || 0;
        node.x *= dataInfo.contentScale;
        node.y *= dataInfo.contentScale;
        node.zOrder = json[ccs.CONST_A_Z] || 0;
        node.skewX = json[ccs.CONST_A_SKEW_X] || 0;
        node.skewY = json[ccs.CONST_A_SKEW_Y] || 0;
        if (json[ccs.CONST_A_SCALE_X] !== undefined)node.scaleX = json[ccs.CONST_A_SCALE_X];
        if (json[ccs.CONST_A_SCALE_Y] !== undefined)node.scaleY = json[ccs.CONST_A_SCALE_Y];
        var colorDic = json[ccs.CONST_COLOR_INFO] || null;
        if (colorDic) {
            if (dataInfo.cocoStudioVersion < ccs.VERSION_COLOR_READING)colorDic = colorDic[0];
            node.a = colorDic[ccs.CONST_A_ALPHA];
            node.r = colorDic[ccs.CONST_A_RED];
            node.g = colorDic[ccs.CONST_A_GREEN];
            node.b = colorDic[ccs.CONST_A_BLUE];
            node.isUseColorInfo = true;
            delete colorDic
        }
    }, removeConfigFile: function (configFile) {
        cc.arrayRemoveObject(this._configFileList, configFile)
    }};
ccs.spriteFrameCacheHelper = {_textureAtlasDic: {}, _imagePaths: [], addSpriteFrameFromFile: function (plistPath, imagePath) {
    cc.spriteFrameCache.addSpriteFrames(plistPath, imagePath)
}, getTexureAtlasWithTexture: function (texture) {
    return null;
    var textureName = texture.getName();
    var atlas = this._textureAtlasDic[textureName];
    if (atlas == null) {
        atlas = cc.TextureAtlas.create(texture, 20);
        this._textureAtlasDic[textureName] = atlas
    }
    return atlas
}, clear: function () {
    this._textureAtlasDic = {};
    this._imagePaths = []
}};
ccs.TransformHelp = ccs.TransformHelp || ccs.Class.extend({});
ccs.TransformHelp.helpMatrix1 = cc.AffineTransformMake(1, 0, 0, 1, 0, 0);
ccs.TransformHelp.helpMatrix2 = cc.AffineTransformMake(1, 0, 0, 1, 0, 0);
ccs.TransformHelp.helpPoint1 = cc.p(0, 0);
ccs.TransformHelp.helpPoint2 = cc.p(0, 0);
ccs.TransformHelp.transformFromParent = function (bone, parentBone) {
    this.nodeToMatrix(bone, this.helpMatrix1);
    this.nodeToMatrix(parentBone, this.helpMatrix2);
    this.helpMatrix2 = cc.AffineTransformInvert(this.helpMatrix2);
    this.helpMatrix1 = cc.AffineTransformConcat(this.helpMatrix1, this.helpMatrix2);
    this.matrixToNode(this.helpMatrix1, bone)
};
ccs.TransformHelp.nodeToMatrix = function (node, matrix) {
    if (node.skewX == -node.skewY) {
        var sine = Math.sin(node.skewX);
        var cosine = Math.cos(node.skewX);
        matrix.a = node.scaleX * cosine;
        matrix.b = node.scaleX * -sine;
        matrix.c = node.scaleY * sine;
        matrix.d = node.scaleY * cosine
    } else {
        matrix.a = node.scaleX * Math.cos(node.skewY);
        matrix.b = node.scaleX * Math.sin(node.skewY);
        matrix.c = node.scaleY * Math.sin(node.skewX);
        matrix.d = node.scaleY * Math.cos(node.skewY)
    }
    matrix.tx = node.x;
    matrix.ty = node.y
};
ccs.TransformHelp.matrixToNode = function (matrix, node) {
    this.helpPoint1.x = 0;
    this.helpPoint1.y = 1;
    this.helpPoint1 = cc.PointApplyAffineTransform(this.helpPoint1, matrix);
    this.helpPoint1.x -= matrix.tx;
    this.helpPoint1.y -= matrix.ty;
    this.helpPoint2.x = 1;
    this.helpPoint2.y = 0;
    this.helpPoint2 = cc.PointApplyAffineTransform(this.helpPoint2, matrix);
    this.helpPoint2.x -= matrix.tx;
    this.helpPoint2.y -= matrix.ty;
    node.skewX = -(Math.atan2(this.helpPoint1.y, this.helpPoint1.x) - 1.5707964);
    node.skewY = Math.atan2(this.helpPoint2.y, this.helpPoint2.x);
    node.scaleX = Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b);
    node.scaleY = Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d);
    node.x = matrix.tx;
    node.y = matrix.ty
};
ccs.TransformHelp.nodeConcat = function (target, source) {
    target.x += source.x;
    target.y += source.y;
    target.skewX += source.skewX;
    target.skewY += source.skewY;
    target.scaleX += source.scaleX;
    target.scaleY += source.scaleY
};
ccs.TransformHelp.nodeSub = function (target, source) {
    target.x -= source.x;
    target.y -= source.y;
    target.skewX -= source.skewX;
    target.skewY -= source.skewY;
    target.scaleX -= source.scaleX;
    target.scaleY -= source.scaleY
};
ccs.TweenType = {customEasing: -1, linear: 0, sineEaseIn: 1, sineEaseOut: 2, sineEaseInOut: 3, quadEaseIn: 4, quadEaseOut: 5, quadEaseInOut: 6, cubicEaseIn: 7, cubicEaseOut: 8, cubicEaseInOut: 9, quartEaseIn: 10, quartEaseOut: 11, quartEaseInOut: 12, quintEaseIn: 13, quintEaseOut: 14, quintEaseInOut: 15, expoEaseIn: 16, expoEaseOut: 17, expoEaseInOut: 18, circEaseIn: 19, eircEaseOut: 20, circEaseInOut: 21, elasticEaseIn: 22, elasticEaseOut: 23, elasticEaseInOut: 24, backEaseIn: 25, backEaseOut: 26, backEaseInOut: 27, bounceEaseIn: 28, bounceEaseOut: 29, bounceEaseInOut: 30,
    tweenEasingMax: 1E4};
ccs.TweenFunction = ccs.TweenFunction || ccs.Class.extend({});
ccs.M_PI_X_2 = Math.PI * 2;
ccs.M_PI_2 = Math.PI / 2;
ccs.M_PI = Math.PI;
ccs.TweenFunction.tweenTo = function (time, type, easingParam) {
    var delta = 0;
    switch (type) {
        case ccs.TweenType.customEasing:
            delta = this.customEase(time, easingParam);
            break;
        case ccs.TweenType.linear:
            delta = this.linear(time);
            break;
        case ccs.TweenType.sineEaseIn:
            delta = this.sineEaseIn(time);
            break;
        case ccs.TweenType.sineEaseOut:
            delta = this.sineEaseOut(time);
            break;
        case ccs.TweenType.sineEaseInOut:
            delta = this.sineEaseInOut(time);
            break;
        case ccs.TweenType.quadEaseIn:
            delta = this.quadEaseIn(time);
            break;
        case ccs.TweenType.quadEaseOut:
            delta =
                this.quadEaseOut(time);
            break;
        case ccs.TweenType.quadEaseInOut:
            delta = this.quadEaseInOut(time);
            break;
        case ccs.TweenType.cubicEaseIn:
            delta = this.cubicEaseIn(time);
            break;
        case ccs.TweenType.cubicEaseOut:
            delta = this.cubicEaseOut(time);
            break;
        case ccs.TweenType.cubicEaseInOut:
            delta = this.cubicEaseInOut(time);
            break;
        case ccs.TweenType.quartEaseIn:
            delta = this.quartEaseIn(time);
            break;
        case ccs.TweenType.quartEaseOut:
            delta = this.quartEaseOut(time);
            break;
        case ccs.TweenType.quartEaseInOut:
            delta = this.quartEaseInOut(time);
            break;
        case ccs.TweenType.quintEaseIn:
            delta = this.quintEaseIn(time);
            break;
        case ccs.TweenType.quintEaseOut:
            delta = this.quintEaseOut(time);
            break;
        case ccs.TweenType.quintEaseInOut:
            delta = this.quintEaseInOut(time);
            break;
        case ccs.TweenType.expoEaseIn:
            delta = this.expoEaseIn(time);
            break;
        case ccs.TweenType.expoEaseOut:
            delta = this.expoEaseOut(time);
            break;
        case ccs.TweenType.expoEaseInOut:
            delta = this.expoEaseInOut(time);
            break;
        case ccs.TweenType.circEaseIn:
            delta = this.circEaseIn(time);
            break;
        case ccs.TweenType.eircEaseOut:
            delta =
                this.circEaseOut(time);
            break;
        case ccs.TweenType.circEaseInOut:
            delta = this.circEaseInOut(time);
            break;
        case ccs.TweenType.elasticEaseIn:
            delta = this.elasticEaseIn(time, easingParam);
            break;
        case ccs.TweenType.elasticEaseOut:
            delta = this.elasticEaseOut(time, easingParam);
            break;
        case ccs.TweenType.elasticEaseInOut:
            delta = this.elasticEaseInOut(time, easingParam);
            break;
        case ccs.TweenType.backEaseIn:
            delta = this.backEaseIn(time);
            break;
        case ccs.TweenType.backEaseOut:
            delta = this.backEaseOut(time);
            break;
        case ccs.TweenType.backEaseInOut:
            delta =
                this.backEaseInOut(time);
            break;
        case ccs.TweenType.bounceEaseIn:
            delta = this.bounceEaseIn(time);
            break;
        case ccs.TweenType.bounceEaseOut:
            delta = this.bounceEaseOut(time);
            break;
        case ccs.TweenType.bounceEaseInOut:
            delta = this.bounceEaseInOut(time);
            break;
        default:
            delta = this.sineEaseInOut(time);
            break
    }
    return delta
};
ccs.TweenFunction.linear = function (time) {
    return time
};
ccs.TweenFunction.sineEaseIn = function (time) {
    return-1 * Math.cos(time * ccs.M_PI_2) + 1
};
ccs.TweenFunction.sineEaseOut = function (time) {
    return Math.sin(time * ccs.M_PI_2)
};
ccs.TweenFunction.sineEaseInOut = function (time) {
    return-0.5 * (Math.cos(ccs.M_PI * time) - 1)
};
ccs.TweenFunction.quadEaseIn = function (time) {
    return time * time
};
ccs.TweenFunction.quadEaseOut = function (time) {
    return-1 * time * (time - 2)
};
ccs.TweenFunction.quadEaseInOut = function (time) {
    time = time * 2;
    if (time < 1)return 0.5 * time * time;
    --time;
    return-0.5 * (time * (time - 2) - 1)
};
ccs.TweenFunction.cubicEaseIn = function (time) {
    return time * time * time
};
ccs.TweenFunction.cubicEaseOut = function (time) {
    time -= 1;
    return time * time * time + 1
};
ccs.TweenFunction.cubicEaseInOut = function (time) {
    time = time * 2;
    if (time < 1)return 0.5 * time * time * time;
    time -= 2;
    return 0.5 * (time * time * time + 2)
};
ccs.TweenFunction.quartEaseIn = function (time) {
    return time * time * time * time
};
ccs.TweenFunction.quartEaseOut = function (time) {
    time -= 1;
    return-(time * time * time * time - 1)
};
ccs.TweenFunction.quartEaseInOut = function (time) {
    time = time * 2;
    if (time < 1)return 0.5 * time * time * time * time;
    time -= 2;
    return-0.5 * (time * time * time * time - 2)
};
ccs.TweenFunction.quintEaseIn = function (time) {
    return time * time * time * time * time
};
ccs.TweenFunction.quintEaseOut = function (time) {
    time -= 1;
    return time * time * time * time * time + 1
};
ccs.TweenFunction.quintEaseInOut = function (time) {
    time = time * 2;
    if (time < 1)return 0.5 * time * time * time * time * time;
    time -= 2;
    return 0.5 * (time * time * time * time * time + 2)
};
ccs.TweenFunction.expoEaseIn = function (time) {
    return time == 0 ? 0 : Math.pow(2, 10 * (time - 1)) - 0.001
};
ccs.TweenFunction.expoEaseOut = function (time) {
    return time == 1 ? 1 : -Math.pow(2, -10 * time) + 1
};
ccs.TweenFunction.expoEaseInOut = function (time) {
    time /= 0.5;
    if (time < 1)time = 0.5 * Math.pow(2, 10 * (time - 1)); else time = 0.5 * (-Math.pow(2, -10 * (time - 1)) + 2);
    return time
};
ccs.TweenFunction.circEaseIn = function (time) {
    return-1 * (Math.sqrt(1 - time * time) - 1)
};
ccs.TweenFunction.circEaseOut = function (time) {
    time = time - 1;
    return Math.sqrt(1 - time * time)
};
ccs.TweenFunction.circEaseInOut = function (time) {
    time = time * 2;
    if (time < 1)return-0.5 * (Math.sqrt(1 - time * time) - 1);
    time -= 2;
    return 0.5 * (Math.sqrt(1 - time * time) + 1)
};
ccs.TweenFunction.elasticEaseIn = function (time, easingParam) {
    var period = 0.3;
    if (easingParam.length > 0)period = easingParam[0];
    var newT = 0;
    if (time == 0 || time == 1)newT = time; else {
        var s = period / 4;
        time = time - 1;
        newT = -Math.pow(2, 10 * time) * Math.sin((time - s) * ccs.M_PI_X_2 / period)
    }
    return newT
};
ccs.TweenFunction.elasticEaseOut = function (time, easingParam) {
    var period = 0.3;
    if (easingParam.length > 0)period = easingParam[0];
    var newT = 0;
    if (time == 0 || time == 1)newT = time; else {
        var s = period / 4;
        newT = Math.pow(2, -10 * time) * Math.sin((time - s) * ccs.M_PI_X_2 / period) + 1
    }
    return newT
};
ccs.TweenFunction.elasticEaseInOut = function (time, easingParam) {
    var period = 0.3;
    if (easingParam.length > 0)period = easingParam[0];
    var newT = 0;
    if (time == 0 || time == 1)newT = time; else {
        time = time * 2;
        if (!period)period = 0.3 * 1.5;
        var s = period / 4;
        time = time - 1;
        if (time < 0)newT = -0.5 * Math.pow(2, 10 * time) * Math.sin((time - s) * ccs.M_PI_X_2 / period); else newT = Math.pow(2, -10 * time) * Math.sin((time - s) * ccs.M_PI_X_2 / period) * 0.5 + 1
    }
    return newT
};
ccs.TweenFunction.backEaseIn = function (time) {
    var overshoot = 1.70158;
    return time * time * ((overshoot + 1) * time - overshoot)
};
ccs.TweenFunction.backEaseOut = function (time) {
    var overshoot = 1.70158;
    time = time - 1;
    return time * time * ((overshoot + 1) * time + overshoot) + 1
};
ccs.TweenFunction.backEaseInOut = function (time) {
    var overshoot = 1.70158 * 1.525;
    time = time * 2;
    if (time < 1)return time * time * ((overshoot + 1) * time - overshoot) / 2; else {
        time = time - 2;
        return time * time * ((overshoot + 1) * time + overshoot) / 2 + 1
    }
};
ccs.bounceTime = function (time) {
    if (time < 1 / 2.75)return 7.5625 * time * time; else if (time < 2 / 2.75) {
        time -= 1.5 / 2.75;
        return 7.5625 * time * time + 0.75
    } else if (time < 2.5 / 2.75) {
        time -= 2.25 / 2.75;
        return 7.5625 * time * time + 0.9375
    }
    time -= 2.625 / 2.75;
    return 7.5625 * time * time + 0.984375
};
ccs.TweenFunction.bounceEaseIn = function (time) {
    return 1 - ccs.bounceTime(1 - time)
};
ccs.TweenFunction.bounceEaseOut = function (time) {
    return ccs.bounceTime(time)
};
ccs.TweenFunction.bounceEaseInOut = function (time) {
    var newT = 0;
    if (time < 0.5) {
        time = time * 2;
        newT = (1 - ccs.bounceTime(1 - time)) * 0.5
    } else newT = ccs.bounceTime(time * 2 - 1) * 0.5 + 0.5;
    return newT
};
ccs.TweenFunction.customEase = function (time, easingParam) {
    if (easingParam.length > 0) {
        var tt = 1 - time;
        return easingParam[1] * tt * tt * tt + 3 * easingParam[3] * time * tt * tt + 3 * easingParam[5] * time * time * tt + easingParam[7] * time * time * time
    }
    return time
};
var ENABLE_PHYSICS_DETECT = false;
ccs.fmodf = function (x, y) {
    while (x > y)x -= y;
    return x
};
var CC_SAFE_RELEASE = function (obj) {
    if (obj && obj.release)obj.release()
};
ccs.isSpriteContainPoint = function (sprite, point, outPoint) {
    var p = cc.p(0, 0);
    if (outPoint)p = sprite.convertToNodeSpace(point);
    var s = sprite.getContentSize();
    var r = cc.rect(0, 0, s.width, s.height);
    return cc.rectContainsPoint(r, p)
};
ccs.SPRITE_CONTAIN_POINT = ccs.isSpriteContainPoint;
ccs.SPRITE_CONTAIN_POINT_WITH_RETURN = ccs.isSpriteContainPoint;
ccs.extBezierTo = function (t, point1, point2, point3, point4) {
    var p = cc.p(0, 0);
    if (point3 && !point4) {
        p.x = Math.pow(1 - t, 2) * point1.x + 2 * t * (1 - t) * point2.x + Math.pow(t, 2) * point3.x;
        p.y = Math.pow(1 - t, 2) * point1.y + 2 * t * (1 - t) * point2.y + Math.pow(t, 2) * point3.y
    }
    if (point4) {
        p.x = point1.x * Math.pow(1 - t, 3) + 3 * t * point2.x * Math.pow(1 - t, 2) + 3 * point3.x * Math.pow(t, 2) * (1 - t) + point4.x * Math.pow(t, 3);
        p.y = point1.y * Math.pow(1 - t, 3) + 3 * t * point2.y * Math.pow(1 - t, 2) + 3 * point3.y * Math.pow(t, 2) * (1 - t) + point4.y * Math.pow(t, 3)
    }
    return p
};
ccs.extCircleTo = function (t, center, radius, fromRadian, radianDif) {
    var p = cc.p(0, 0);
    p.x = center.x + radius * Math.cos(fromRadian + radianDif * t);
    p.y = center.y + radius * Math.sin(fromRadian + radianDif * t);
    return p
};
ccs.RelativeData = function () {
    this.plistFiles = [];
    this.armatures = [];
    this.animations = [];
    this.textures = []
};
ccs.armatureDataManager = {_animationDatas: {}, _armarureDatas: {}, _textureDatas: {}, _autoLoadSpriteFile: false, _relativeDatas: {}, removeArmatureFileInfo: function (configFilePath) {
    var data = this.getRelativeData(configFilePath);
    for (var i = 0; i < data.armatures.length; i++) {
        var obj = data.armatures[i];
        this.removeArmatureData(obj)
    }
    for (var i = 0; i < data.animations.length; i++) {
        var obj = data.animations[i];
        this.removeAnimationData(obj)
    }
    for (var i = 0; i < data.textures.length; i++) {
        var obj = data.textures[i];
        this.removeTextureData(obj)
    }
    for (var i =
        0; i < data.plistFiles.length; i++) {
        var obj = data.plistFiles[i];
        cc.spriteFrameCache.removeSpriteFramesFromFile(obj)
    }
    delete this._relativeDatas[configFilePath];
    ccs.dataReaderHelper.removeConfigFile(configFilePath)
}, addArmatureData: function (id, armatureData, configFilePath) {
    if (this._armarureDatas) {
        var data = this.getRelativeData(configFilePath);
        data.armatures.push(id);
        this._armarureDatas[id] = armatureData
    }
}, removeArmatureData: function (id) {
    if (this._armarureDatas[id])delete this._armarureDatas[id]
}, getArmatureData: function (id) {
    var armatureData =
        null;
    if (this._armarureDatas)armatureData = this._armarureDatas[id];
    return armatureData
}, getArmatureDatas: function () {
    return this._armarureDatas
}, addAnimationData: function (id, animationData, configFilePath) {
    if (this._animationDatas) {
        var data = this.getRelativeData(configFilePath);
        data.animations.push(id);
        this._animationDatas[id] = animationData
    }
}, removeAnimationData: function (id) {
    if (this._animationDatas[id])delete this._animationDatas[id]
}, getAnimationData: function (id) {
    var animationData = null;
    if (this._animationDatas[id])animationData =
        this._animationDatas[id];
    return animationData
}, getAnimationDatas: function () {
    return this._animationDatas
}, addTextureData: function (id, textureData, configFilePath) {
    if (this._textureDatas) {
        var data = this.getRelativeData(configFilePath);
        data.textures.push(id);
        this._textureDatas[id] = textureData
    }
}, removeTextureData: function (id) {
    if (this._textureDatas[id])delete this._textureDatas[id]
}, getTextureData: function (id) {
    var textureData = null;
    if (this._textureDatas)textureData = this._textureDatas[id];
    return textureData
},
    getTextureDatas: function () {
        return this._textureDatas
    }, addArmatureFileInfo: function () {
        var imagePath, plistPath, configFilePath;
        var isLoadSpriteFrame = false;
        if (arguments.length == 1) {
            configFilePath = arguments[0];
            isLoadSpriteFrame = true;
            this.addRelativeData(configFilePath)
        } else if (arguments.length == 3) {
            imagePath = arguments[0];
            plistPath = arguments[1];
            configFilePath = arguments[2];
            this.addRelativeData(configFilePath);
            this.addSpriteFrameFromFile(plistPath, imagePath, configFilePath)
        }
        ccs.dataReaderHelper.addDataFromFile(configFilePath,
            isLoadSpriteFrame)
    }, addArmatureFileInfoAsync: function () {
        var imagePath, plistPath, configFilePath, target, selector;
        var isLoadSpriteFrame = false;
        if (arguments.length == 3) {
            configFilePath = arguments[0];
            selector = arguments[1];
            target = arguments[2];
            isLoadSpriteFrame = true;
            this.addRelativeData(configFilePath)
        } else if (arguments.length == 5) {
            imagePath = arguments[0];
            plistPath = arguments[1];
            configFilePath = arguments[2];
            selector = arguments[3];
            target = arguments[4];
            this.addRelativeData(configFilePath);
            this.addSpriteFrameFromFile(plistPath,
                imagePath, configFilePath)
        }
        ccs.dataReaderHelper.addDataFromFileAsync(configFilePath, target, selector, isLoadSpriteFrame)
    }, addSpriteFrameFromFile: function (plistPath, imagePath, configFilePath) {
        var data = this.getRelativeData(configFilePath);
        data.plistFiles.push(plistPath);
        ccs.spriteFrameCacheHelper.addSpriteFrameFromFile(plistPath, imagePath)
    }, isAutoLoadSpriteFile: function () {
        return this._autoLoadSpriteFile
    }, addRelativeData: function (configFilePath) {
        if (!this._relativeDatas[configFilePath])this._relativeDatas[configFilePath] =
            new ccs.RelativeData
    }, getRelativeData: function (configFilePath) {
        return this._relativeDatas[configFilePath]
    }, clear: function () {
        this._animationDatas = {};
        this._armarureDatas = {};
        this._textureDatas = {};
        ccs.spriteFrameCacheHelper.clear();
        ccs.dataReaderHelper.clear()
    }};
ccs.BLEND_TYPE_NORMAL = 0;
ccs.BLEND_TYPE_LAYER = 1;
ccs.BLEND_TYPE_DARKEN = 2;
ccs.BLEND_TYPE_MULTIPLY = 3;
ccs.BLEND_TYPE_LIGHTEN = 4;
ccs.BLEND_TYPE_SCREEN = 5;
ccs.BLEND_TYPE_OVERLAY = 6;
ccs.BLEND_TYPE_HIGHLIGHT = 7;
ccs.BLEND_TYPE_ADD = 8;
ccs.BLEND_TYPE_SUBTRACT = 9;
ccs.BLEND_TYPE_DIFFERENCE = 10;
ccs.BLEND_TYPE_INVERT = 11;
ccs.BLEND_TYPE_ALPHA = 12;
ccs.BLEND_TYPE_ERASE = 13;
ccs.DISPLAY_TYPE_SPRITE = 0;
ccs.DISPLAY_TYPE_ARMATURE = 1;
ccs.DISPLAY_TYPE_PARTICLE = 2;
ccs.DISPLAY_TYPE_MAX = 3;
ccs.BaseData = ccs.Class.extend({x: 0, y: 0, zOrder: 0, skewX: 0, skewY: 0, scaleX: 1, scaleY: 1, tweenRotate: 0, isUseColorInfo: false, r: 255, g: 255, b: 255, a: 255, ctor: function () {
    this.x = 0;
    this.y = 0;
    this.zOrder = 0;
    this.skewX = 0;
    this.skewY = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.tweenRotate = 0;
    this.isUseColorInfo = false;
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.a = 255
}, copy: function (node) {
    this.x = node.x;
    this.y = node.y;
    this.zOrder = node.zOrder;
    this.scaleX = node.scaleX;
    this.scaleY = node.scaleY;
    this.skewX = node.skewX;
    this.skewY = node.skewY;
    this.tweenRotate =
        node.tweenRotate;
    this.isUseColorInfo = node.isUseColorInfo;
    this.r = node.r;
    this.g = node.g;
    this.b = node.b;
    this.a = node.a
}, setColor: function (color) {
    this.r = color.r;
    this.g = color.g;
    this.b = color.b;
    this.a = color.a
}, getColor: function () {
    return cc.color(this.r, this.g, this.b, this.a)
}, subtract: function (from, to, limit) {
    this.x = to.x - from.x;
    this.y = to.y - from.y;
    this.scaleX = to.scaleX - from.scaleX;
    this.scaleY = to.scaleY - from.scaleY;
    this.skewX = to.skewX - from.skewX;
    this.skewY = to.skewY - from.skewY;
    if (this.isUseColorInfo || from.isUseColorInfo ||
        to.isUseColorInfo) {
        this.a = to.a - from.a;
        this.r = to.r - from.r;
        this.g = to.g - from.g;
        this.b = to.b - from.b;
        this.isUseColorInfo = true
    } else {
        this.a = this.r = this.g = this.b = 0;
        this.isUseColorInfo = false
    }
    if (limit) {
        if (this.skewX > cc.PI)this.skewX -= ccs.M_PI_X_2;
        if (this.skewX < -cc.PI)this.skewX += ccs.M_PI_X_2;
        if (this.skewY > cc.PI)this.skewY -= ccs.M_PI_X_2;
        if (this.skewY < -cc.PI)this.skewY += ccs.M_PI_X_2
    }
    if (to.tweenRotate) {
        this.skewX += to.tweenRotate * ccs.M_PI_X_2;
        this.skewY -= to.tweenRotate * ccs.M_PI_X_2
    }
}});
ccs.DisplayData = ccs.Class.extend({displayType: ccs.DISPLAY_TYPE_MAX, displayName: "", ctor: function () {
    this.displayType = ccs.DISPLAY_TYPE_MAX
}, changeDisplayToTexture: function (displayName) {
    var textureName = displayName;
    var startPos = textureName.lastIndexOf(".");
    if (startPos != -1)textureName = textureName.substring(0, startPos);
    return textureName
}, copy: function (displayData) {
    this.displayName = displayData.displayName;
    this.displayType = displayData.displayType
}});
ccs.SpriteDisplayData = ccs.DisplayData.extend({skinData: null, ctor: function () {
    this.skinData = new ccs.BaseData;
    this.displayType = ccs.DISPLAY_TYPE_SPRITE
}, copy: function (displayData) {
    ccs.DisplayData.prototype.copy.call(this, displayData);
    this.skinData = displayData.skinData
}});
ccs.ArmatureDisplayData = ccs.DisplayData.extend({displayName: "", ctor: function () {
    this.displayName = "";
    this.displayType = ccs.DISPLAY_TYPE_ARMATURE
}});
ccs.ParticleDisplayData = ccs.DisplayData.extend({ctor: function () {
    this.displayType = ccs.DISPLAY_TYPE_PARTICLE
}});
ccs.BoneData = ccs.BaseData.extend({displayDataList: null, name: "", parentName: "", boneDataTransform: null, ctor: function () {
    this.displayDataList = [];
    this.name = "";
    this.parentName = "";
    this.boneDataTransform = null
}, init: function () {
}, addDisplayData: function (displayData) {
    this.displayDataList.push(displayData)
}, getDisplayData: function (index) {
    return this.displayDataList[index]
}});
ccs.ArmatureData = ccs.Class.extend({boneDataDic: null, name: "", dataVersion: 0.1, ctor: function () {
    this.boneDataDic = {};
    this.name = "";
    this.dataVersion = 0.1
}, init: function () {
    return true
}, addBoneData: function (boneData) {
    this.boneDataDic[boneData.name] = boneData
}, getBoneDataDic: function () {
    return this.boneDataDic
}, getBoneData: function (boneName) {
    return this.boneDataDic[boneName]
}});
ccs.FrameData = ccs.BaseData.extend({duration: 0, tweenEasing: 0, easingParamNumber: 0, easingParams: null, displayIndex: -1, movement: "", event: "", sound: "", soundEffect: "", blendFunc: 0, frameID: 0, isTween: true, ctor: function () {
    ccs.BaseData.prototype.ctor.call(this);
    this.duration = 1;
    this.tweenEasing = ccs.TweenType.linear;
    this.easingParamNumber = 0;
    this.easingParams = [];
    this.displayIndex = 0;
    this.movement = "";
    this.event = "";
    this.sound = "";
    this.soundEffect = "";
    this.blendFunc = new cc.BlendFunc(cc.BLEND_SRC, cc.BLEND_DST);
    this.frameID =
        0;
    this.isTween = true
}, copy: function (frameData) {
    ccs.BaseData.prototype.copy.call(this, frameData);
    this.duration = frameData.duration;
    this.tweenEasing = frameData.tweenEasing;
    this.displayIndex = frameData.displayIndex;
    this.movement = frameData.movement;
    this.event = frameData.event;
    this.sound = frameData.sound;
    this.soundEffect = frameData.soundEffect;
    this.blendFunc = frameData.blendFunc;
    this.isTween = frameData.isTween;
    this.easingParamNumber = frameData.easingParamNumber;
    this.easingParams = [];
    if (this.easingParamNumber != 0)for (var i =
        0; i < this.easingParamNumber; i++)this.easingParams[i] = frameData.easingParams[i]
}});
ccs.MovementBoneData = ccs.Class.extend({delay: 0, scale: 1, duration: 0, frameList: null, name: "", ctor: function () {
    this.delay = 0;
    this.scale = 1;
    this.duration = 0;
    this.frameList = [];
    this.name = ""
}, init: function () {
    this.frameList = []
}, addFrameData: function (frameData) {
    this.frameList.push(frameData)
}, getFrameData: function (index) {
    return this.frameList[index]
}});
ccs.MovementData = ccs.Class.extend({movBoneDataDic: null, duration: 0, scale: 1, durationTo: 0, durationTween: ccs.TweenType.linear, loop: true, tweenEasing: 2, name: "", ctor: function () {
    this.name = "";
    this.duration = 0;
    this.scale = 1;
    this.durationTo = 0;
    this.durationTween = 0;
    this.loop = true;
    this.tweenEasing = ccs.TweenType.linear;
    this.movBoneDataDic = {}
}, addMovementBoneData: function (movBoneData) {
    this.movBoneDataDic[movBoneData.name] = movBoneData
}, getMovementBoneData: function (boneName) {
    return this.movBoneDataDic[boneName]
}});
ccs.AnimationData = ccs.Class.extend({moveDataDic: null, movementNames: null, name: "", ctor: function () {
    this.moveDataDic = {};
    this.movementNames = []
}, addMovement: function (moveData) {
    this.moveDataDic[moveData.name] = moveData;
    this.movementNames.push(moveData.name)
}, getMovement: function (moveName) {
    return this.moveDataDic[moveName]
}, getMovementCount: function () {
    return Object.keys(this.moveDataDic).length
}});
ccs.ContourVertex2 = function (x, y) {
    this.x = x || 0;
    this.y = y || 0
};
ccs.ContourData = ccs.Class.extend({vertexList: null, ctor: function () {
    this.vertexList = []
}, init: function () {
    this.vertexList = [];
    return true
}, addVertex: function (p) {
    var v = ccs.ContourVertex2(p.x, p.y);
    this.vertexList.push(v)
}});
ccs.TextureData = ccs.Class.extend({height: 0, width: 0, pivotX: 0, pivotY: 0, name: "", contourDataList: null, ctor: function () {
    this.height = 0;
    this.width = 0;
    this.pivotX = 0.5;
    this.pivotY = 0.5;
    this.name = "";
    this.contourDataList = []
}, init: function () {
    this.contourDataList = []
}, addContourData: function (contourData) {
    this.contourDataList.push(contourData)
}, getContourData: function (index) {
    return this.contourDataList[index]
}});
ccs.DecorativeDisplay = ccs.Class.extend({_display: null, _colliderDetector: null, _displayData: null, ctor: function () {
    this._display = null;
    this._colliderDetector = null;
    this._displayData = null
}, init: function () {
    return true
}, setDisplay: function (display) {
    this._display = display
}, getDisplay: function () {
    return this._display
}, setColliderDetector: function (colliderDetector) {
    this._colliderDetector = colliderDetector
}, getColliderDetector: function () {
    return this._colliderDetector
}, setDisplayData: function (displayData) {
    this._displayData =
        displayData
}, getDisplayData: function () {
    return this._displayData
}, release: function () {
    CC_SAFE_RELEASE(this._display);
    this._display = null;
    CC_SAFE_RELEASE(this._displayData);
    this._displayData = null;
    CC_SAFE_RELEASE(this._colliderDetector);
    this._colliderDetector = null
}});
ccs.DecorativeDisplay.create = function () {
    var decorativeDisplay = new ccs.DecorativeDisplay;
    if (decorativeDisplay && decorativeDisplay.init())return decorativeDisplay;
    return null
};
ccs.DisplayFactory = ccs.DisplayFactory || ccs.Class.extend({});
ccs.DisplayFactory.addDisplay = function (bone, decoDisplay, displayData) {
    switch (displayData.displayType) {
        case ccs.DISPLAY_TYPE_SPRITE:
            this.addSpriteDisplay(bone, decoDisplay, displayData);
            break;
        case ccs.DISPLAY_TYPE_PARTICLE:
            this.addParticleDisplay(bone, decoDisplay, displayData);
            break;
        case ccs.DISPLAY_TYPE_ARMATURE:
            this.addArmatureDisplay(bone, decoDisplay, displayData);
            break;
        default:
            break
    }
};
ccs.DisplayFactory.createDisplay = function (bone, decoDisplay) {
    switch (decoDisplay.getDisplayData().displayType) {
        case ccs.DISPLAY_TYPE_SPRITE:
            this.createSpriteDisplay(bone, decoDisplay);
            break;
        case ccs.DISPLAY_TYPE_PARTICLE:
            this.createParticleDisplay(bone, decoDisplay);
            break;
        case ccs.DISPLAY_TYPE_ARMATURE:
            this.createArmatureDisplay(bone, decoDisplay);
            break;
        default:
            break
    }
};
ccs.DisplayFactory._helpTransform = {a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0};
ccs.DisplayFactory.updateDisplay = function (bone, dt, dirty) {
    var display = bone.getDisplayRenderNode();
    if (!display)return;
    switch (bone.getDisplayRenderNodeType()) {
        case ccs.DISPLAY_TYPE_SPRITE:
            if (dirty)display.updateArmatureTransform();
            break;
        case ccs.DISPLAY_TYPE_PARTICLE:
            this.updateParticleDisplay(bone, display, dt);
            break;
        case ccs.DISPLAY_TYPE_ARMATURE:
            this.updateArmatureDisplay(bone, display, dt);
            break;
        default:
            display.setAdditionalTransform(bone.nodeToArmatureTransform());
            break
    }
    if (ccs.ENABLE_PHYSICS_CHIPMUNK_DETECT ||
        ccs.ENABLE_PHYSICS_SAVE_CALCULATED_VERTEX)if (dirty) {
        var decoDisplay = bone.getDisplayManager().getCurrentDecorativeDisplay();
        var detector = decoDisplay.getColliderDetector();
        if (detector) {
            var node = decoDisplay.getDisplay();
            var displayTransform = node.nodeToParentTransform();
            var helpTransform = this._helpTransform;
            helpTransform.a = displayTransform.a;
            helpTransform.b = displayTransform.b;
            helpTransform.c = displayTransform.c;
            helpTransform.d = displayTransform.d;
            helpTransform.tx = displayTransform.tx;
            helpTransform.ty = displayTransform.ty;
            var anchorPoint = node.getAnchorPointInPoints();
            anchorPoint = cc.PointApplyAffineTransform(anchorPoint, helpTransform);
            helpTransform.tx = anchorPoint.x;
            helpTransform.ty = anchorPoint.y;
            var t = cc.AffineTransformConcat(helpTransform, bone.getArmature().nodeToParentTransform());
            detector.updateTransform(t)
        }
    }
};
ccs.DisplayFactory.addSpriteDisplay = function (bone, decoDisplay, displayData) {
    var sdp = new ccs.SpriteDisplayData;
    sdp.copy(displayData);
    decoDisplay.setDisplayData(sdp);
    this.createSpriteDisplay(bone, decoDisplay)
};
ccs.DisplayFactory.createSpriteDisplay = function (bone, decoDisplay) {
    var skin = null;
    var displayData = decoDisplay.getDisplayData();
    var textureName = displayData.displayName;
    var startPos = textureName.lastIndexOf(".");
    if (startPos != -1)textureName = textureName.substring(0, startPos);
    if (textureName == "")skin = ccs.Skin.create(); else skin = ccs.Skin.createWithSpriteFrameName(textureName + ".png");
    decoDisplay.setDisplay(skin);
    skin.setBone(bone);
    this.initSpriteDisplay(bone, decoDisplay, displayData.displayName, skin);
    var armature =
        bone.getArmature();
    if (armature)if (armature.getArmatureData().dataVersion >= ccs.CONST_VERSION_COMBINED)skin.setSkinData(displayData.skinData); else skin.setSkinData(bone.getBoneData())
};
ccs.DisplayFactory.initSpriteDisplay = function (bone, decoDisplay, displayName, skin) {
    var textureName = displayName;
    var startPos = textureName.lastIndexOf(".");
    if (startPos != -1)textureName = textureName.substring(0, startPos);
    var textureData = ccs.armatureDataManager.getTextureData(textureName);
    if (textureData)skin.setAnchorPoint(textureData.pivotX, textureData.pivotY);
    if (ccs.ENABLE_PHYSICS_CHIPMUNK_DETECT || ccs.ENABLE_PHYSICS_SAVE_CALCULATED_VERTEX)if (textureData && textureData.contourDataList.length > 0) {
        var colliderDetector =
            ccs.ColliderDetector.create(bone);
        colliderDetector.addContourDataList(textureData.contourDataList);
        decoDisplay.setColliderDetector(colliderDetector)
    }
};
ccs.DisplayFactory.addArmatureDisplay = function (bone, decoDisplay, displayData) {
    var adp = new ccs.ArmatureDisplayData;
    adp.copy(displayData);
    decoDisplay.setDisplayData(adp);
    this.createArmatureDisplay(bone, decoDisplay)
};
ccs.DisplayFactory.createArmatureDisplay = function (bone, decoDisplay) {
    var displayData = decoDisplay.getDisplayData();
    var armature = ccs.Armature.create(displayData.displayName, bone);
    decoDisplay.setDisplay(armature)
};
ccs.DisplayFactory.updateArmatureDisplay = function (bone, armature, dt) {
    if (armature) {
        armature.sortAllChildren();
        armature.update(dt)
    }
};
ccs.DisplayFactory.addParticleDisplay = function (bone, decoDisplay, displayData) {
    var adp = new ccs.ParticleDisplayData;
    adp.copy(displayData);
    decoDisplay.setDisplayData(adp);
    this.createParticleDisplay(bone, decoDisplay)
};
ccs.DisplayFactory.createParticleDisplay = function (bone, decoDisplay) {
    var displayData = decoDisplay.getDisplayData();
    var system = cc.ParticleSystem.create(displayData.displayName);
    var armature = bone.getArmature();
    if (armature)system.setParent(bone.getArmature());
    decoDisplay.setDisplay(system)
};
ccs.DisplayFactory.updateParticleDisplay = function (bone, particleSystem, dt) {
    var node = new ccs.BaseData;
    ccs.TransformHelp.matrixToNode(bone.nodeToArmatureTransform(), node);
    particleSystem.setPosition(node.x, node.y);
    particleSystem.setScaleX(node.scaleX);
    particleSystem.setScaleY(node.scaleY);
    particleSystem.update(dt)
};
ccs.DisplayManager = ccs.Class.extend({_decoDisplayList: null, _currentDecoDisplay: null, _displayRenderNode: null, _displayIndex: -1, _forceChangeDisplay: false, _bone: null, _visible: true, _displayType: null, ctor: function () {
    this._decoDisplayList = [];
    this._currentDecoDisplay = null;
    this._displayRenderNode = null;
    this._displayIndex = -1;
    this._forceChangeDisplay = false;
    this._bone = null;
    this._visible = true;
    this._displayType = ccs.DISPLAY_TYPE_MAX
}, init: function (bone) {
    this._bone = bone;
    this.initDisplayList(bone.getBoneData());
    return true
},
    addDisplay: function (displayData, index) {
        var decoDisplay = null;
        if (index >= 0 && index < this._decoDisplayList.length)decoDisplay = this._decoDisplayList[index]; else {
            decoDisplay = ccs.DecorativeDisplay.create();
            this._decoDisplayList.push(decoDisplay)
        }
        if (displayData instanceof ccs.DisplayData)ccs.DisplayFactory.addDisplay(this._bone, decoDisplay, displayData); else this._addDisplayOther(decoDisplay, displayData);
        if (index == this._displayIndex) {
            this._displayIndex = -1;
            this.changeDisplayWithIndex(index, false)
        }
    }, _addDisplayOther: function (decoDisplay, display) {
        var displayData = null;
        if (display instanceof ccs.Skin) {
            var skin = display;
            skin.setBone(this._bone);
            displayData = new ccs.SpriteDisplayData;
            displayData.displayName = skin.getDisplayName();
            ccs.DisplayFactory.initSpriteDisplay(this._bone, decoDisplay, skin.getDisplayName(), skin);
            var spriteDisplayData = decoDisplay.getDisplayData();
            if (spriteDisplayData instanceof ccs.SpriteDisplayData)skin.setSkinData(spriteDisplayData.skinData); else {
                var find = false;
                for (var i = this._decoDisplayList.length - 2; i >= 0; i--) {
                    var dd =
                        this._decoDisplayList[i];
                    var sdd = dd.getDisplayData();
                    if (sdd) {
                        find = true;
                        skin.setSkinData(sdd.skinData);
                        displayData.skinData = sdd.skinData;
                        break
                    }
                }
                if (!find)skin.setSkinData(new ccs.BaseData);
                skin.setSkinData(new ccs.BaseData)
            }
        } else if (display instanceof cc.ParticleSystem) {
            displayData = new ccs.ParticleDisplayData;
            displayData.displayName = display._plistFile
        } else if (display instanceof ccs.Armature) {
            displayData = new ccs.ArmatureDisplayData;
            displayData.displayName = display.getName();
            display.setParentBone(this._bone)
        } else displayData =
            new ccs.DisplayData;
        decoDisplay.setDisplay(display);
        decoDisplay.setDisplayData(displayData)
    }, removeDisplay: function (index) {
        this._decoDisplayList.splice(index, 1);
        if (index == this._displayIndex)this.setCurrentDecorativeDisplay(null)
    }, getDecorativeDisplayList: function () {
        return this._decoDisplayList
    }, changeDisplayWithIndex: function (index, force) {
        if (index >= this._decoDisplayList.length) {
            cc.log("the index value is out of range");
            return
        }
        this._forceChangeDisplay = force;
        if (index < 0) {
            this._displayIndex = index;
            if (this._displayRenderNode) {
                this._displayRenderNode.removeFromParent(true);
                this.setCurrentDecorativeDisplay(null);
                this._displayRenderNode = null
            }
            return
        }
        if (this._displayIndex == index)return;
        this._displayIndex = index;
        var decoDisplay = this._decoDisplayList[this._displayIndex];
        if (!decoDisplay)return;
        this.setCurrentDecorativeDisplay(decoDisplay)
    }, changeDisplayWithName: function (name, force) {
        for (var i = 0; i < this._decoDisplayList.length; i++)if (this._decoDisplayList[i].getDisplayData().displayName == name) {
            this.changeDisplayWithIndex(i, force);
            break
        }
    }, setCurrentDecorativeDisplay: function (decoDisplay) {
        var locCurrentDecoDisplay =
            this._currentDecoDisplay;
        if (ccs.ENABLE_PHYSICS_CHIPMUNK_DETECT || ccs.ENABLE_PHYSICS_SAVE_CALCULATED_VERTEX)if (locCurrentDecoDisplay && locCurrentDecoDisplay.getColliderDetector())locCurrentDecoDisplay.getColliderDetector().setActive(false);
        this._currentDecoDisplay = decoDisplay;
        locCurrentDecoDisplay = this._currentDecoDisplay;
        if (ccs.ENABLE_PHYSICS_CHIPMUNK_DETECT || ccs.ENABLE_PHYSICS_SAVE_CALCULATED_VERTEX)if (locCurrentDecoDisplay && locCurrentDecoDisplay.getColliderDetector())locCurrentDecoDisplay.getColliderDetector().setActive(true);
        var displayRenderNode = locCurrentDecoDisplay == null ? null : locCurrentDecoDisplay.getDisplay();
        if (this._displayRenderNode) {
            if (this._displayRenderNode instanceof ccs.Armature)this._bone.setChildArmature(null);
            this._displayRenderNode.removeFromParent(true);
            this._displayRenderNode = null
        }
        this._displayRenderNode = displayRenderNode;
        if (displayRenderNode) {
            if (displayRenderNode instanceof ccs.Armature)this._bone.setChildArmature(displayRenderNode); else if (displayRenderNode instanceof cc.ParticleSystem)displayRenderNode.resetSystem();
            if (displayRenderNode.RGBAProtocol) {
                displayRenderNode.setColor(this._bone.getDisplayedColor());
                displayRenderNode.setOpacity(this._bone.getDisplayedOpacity())
            }
            displayRenderNode.retain();
            this._displayType = this._currentDecoDisplay.getDisplayData().displayType
        } else this._displayType = ccs.DISPLAY_TYPE_MAX
    }, getDisplayRenderNode: function () {
        return this._displayRenderNode
    }, getDisplayRenderNodeType: function () {
        return this._displayType
    }, getCurrentDisplayIndex: function () {
        return this._displayIndex
    }, getCurrentDecorativeDisplay: function () {
        return this._currentDecoDisplay
    },
    getDecorativeDisplayByIndex: function (index) {
        return this._decoDisplayList[index]
    }, initDisplayList: function (boneData) {
        this._decoDisplayList = [];
        if (!boneData)return;
        var displayList = boneData.displayDataList;
        for (var i = 0; i < displayList.length; i++) {
            var displayData = displayList[i];
            var decoDisplay = ccs.DecorativeDisplay.create();
            decoDisplay.setDisplayData(displayData);
            ccs.DisplayFactory.createDisplay(this._bone, decoDisplay);
            this._decoDisplayList.push(decoDisplay)
        }
    }, containPoint: function (point, y) {
        var p = cc.p(0,
            0);
        if (y === undefined) {
            p.x = point.x;
            p.y = point.y
        } else {
            p.x = point;
            p.y = y
        }
        if (!this._visible || this._displayIndex < 0)return false;
        var ret = false;
        switch (this._currentDecoDisplay.getDisplayData().displayType) {
            case ccs.DISPLAY_TYPE_SPRITE:
                var outPoint = cc.p(0, 0);
                var sprite = this._currentDecoDisplay.getDisplay();
                sprite = sprite.getChildByTag(0);
                ret = ccs.SPRITE_CONTAIN_POINT_WITH_RETURN(sprite, p, outPoint);
                break;
            default:
                break
        }
        return ret
    }, setVisible: function (visible) {
        if (!this._displayRenderNode)return;
        this._visible = visible;
        this._displayRenderNode.setVisible(visible)
    }, isVisible: function () {
        return this._visible
    }, getContentSize: function () {
        if (!this._displayRenderNode)return cc.size(0, 0);
        return this._displayRenderNode.getContentSize()
    }, getBoundingBox: function () {
        if (!this._displayRenderNode)return cc.rect(0, 0, 0, 0);
        return this._displayRenderNode.getBoundingBox()
    }, getAnchorPoint: function () {
        if (!this._displayRenderNode)return cc.p(0, 0);
        return this._displayRenderNode.getAnchorPoint()
    }, getAnchorPointInPoints: function () {
        if (!this._displayRenderNode)return cc.p(0,
            0);
        return this._displayRenderNode.getAnchorPointInPoints()
    }, getForceChangeDisplay: function () {
        return this._forceChangeDisplay
    }, release: function () {
        this._decoDisplayList = [];
        if (this._displayRenderNode) {
            this._displayRenderNode.removeFromParent(true);
            this._displayRenderNode = null
        }
    }});
ccs.DisplayManager.create = function (bone) {
    var displayManager = new ccs.DisplayManager;
    if (displayManager && displayManager.init(bone))return displayManager;
    return null
};
ccs.Skin = ccs.Sprite.extend({_skinData: null, bone: null, _skinTransform: null, _displayName: "", _armature: null, _className: "Skin", ctor: function () {
    cc.Sprite.prototype.ctor.call(this);
    this._skinData = null;
    this.bone = null;
    this._displayName = "";
    this._skinTransform = cc.AffineTransformIdentity();
    this._armature = null
}, initWithSpriteFrameName: function (spriteFrameName) {
    var ret = cc.Sprite.prototype.initWithSpriteFrameName.call(this, spriteFrameName);
    this._displayName = spriteFrameName;
    return ret
}, initWithFile: function (fileName) {
    var ret =
        cc.Sprite.prototype.initWithFile.call(this, fileName);
    this._displayName = fileName;
    return ret
}, setSkinData: function (skinData) {
    this._skinData = skinData;
    this.setScaleX(skinData.scaleX);
    this.setScaleY(skinData.scaleY);
    this.setRotationX(cc.radiansToDegress(skinData.skewX));
    this.setRotationY(cc.radiansToDegress(-skinData.skewY));
    this.setPosition(skinData.x, skinData.y);
    var localTransform = this.nodeToParentTransform();
    var skinTransform = this._skinTransform;
    skinTransform.a = localTransform.a;
    skinTransform.b = localTransform.b;
    skinTransform.c = localTransform.c;
    skinTransform.d = localTransform.d;
    skinTransform.tx = localTransform.tx;
    skinTransform.ty = localTransform.ty;
    this.updateArmatureTransform()
}, getSkinData: function () {
    return this._skinData
}, setBone: function (bone) {
    this.bone = bone
}, getBone: function () {
    return this.bone
}, updateArmatureTransform: function () {
    this._transform = cc.AffineTransformConcat(this._skinTransform, this.bone.nodeToArmatureTransform());
    var locTransform = this._transform;
    var locArmature = this._armature;
    if (locArmature &&
        locArmature.getBatchNode())this._transform = cc.AffineTransformConcat(locTransform, locArmature.nodeToParentTransform());
    if (cc._renderType === cc._RENDER_TYPE_CANVAS) {
        locTransform = this._transform;
        locTransform.b *= -1;
        locTransform.c *= -1;
        var tempB = locTransform.b;
        locTransform.b = locTransform.c;
        locTransform.c = tempB
    }
}, getBoundingBox: function () {
    var rect = cc.rect(0, 0, this._contentSize.width, this._contentSize.height);
    var transForm = this.nodeToParentTransform();
    return cc.RectApplyAffineTransform(rect, transForm)
}, getDisplayName: function () {
    return this._displayName
},
    nodeToWorldTransform: function () {
        return cc.AffineTransformConcat(this._transform, this.bone.getArmature().nodeToWorldTransform())
    }, nodeToWorldTransformAR: function () {
        var displayTransform = this._transform;
        var anchorPoint = this._anchorPointInPoints;
        anchorPoint = cc.PointApplyAffineTransform(anchorPoint, displayTransform);
        displayTransform.tx = anchorPoint.x;
        displayTransform.ty = anchorPoint.y;
        return cc.AffineTransformConcat(displayTransform, this.bone.getArmature().nodeToWorldTransform())
    }});
ccs.Skin.prototype.nodeToParentTransform = cc.Node.prototype._nodeToParentTransformForWebGL;
var _p = ccs.Skin.prototype;
_p.skinData;
cc.defineGetterSetter(_p, "skinData", _p.getSkinData, _p.setSkinData);
_p.displayName;
cc.defineGetterSetter(_p, "displayName", _p.getDisplayName);
_p = null;
ccs.Skin.create = function (fileName, rect) {
    var argnum = arguments.length;
    var sprite = new ccs.Skin;
    if (argnum === 0) {
        if (sprite.init())return sprite
    } else if (sprite && sprite.initWithFile(fileName, rect))return sprite;
    return null
};
ccs.Skin.createWithSpriteFrameName = function (pszSpriteFrameName) {
    var skin = new ccs.Skin;
    if (skin && skin.initWithSpriteFrameName(pszSpriteFrameName))return skin;
    return null
};
ccs.ANIMATION_TYPE_SINGLE_FRAME = -4;
ccs.ANIMATION_TYPE_NO_LOOP = -3;
ccs.ANIMATION_TYPE_TO_LOOP_FRONT = -2;
ccs.ANIMATION_TYPE_TO_LOOP_BACK = -1;
ccs.ANIMATION_TYPE_LOOP_FRONT = 0;
ccs.ANIMATION_TYPE_LOOP_BACK = 1;
ccs.ANIMATION_TYPE_MAX = 2;
ccs.ProcessBase = ccs.Class.extend({processScale: 1, _isComplete: true, _isPause: true, _isPlaying: false, _currentPercent: 0, _rawDuration: 0, _loopType: 0, _tweenEasing: 0, animationInternal: null, _currentFrame: 0, _durationTween: 0, _nextFrameIndex: 0, _curFrameIndex: null, _isLoopBack: false, ctor: function () {
    this.processScale = 1;
    this._isComplete = true;
    this._isPause = true;
    this._isPlaying = false;
    this._currentFrame = 0;
    this._currentPercent = 0;
    this._durationTween = 0;
    this._rawDuration = 0;
    this._loopType = ccs.ANIMATION_TYPE_LOOP_BACK;
    this._tweenEasing =
        ccs.TweenType.linear;
    this.animationInternal = 1 / 60;
    this._curFrameIndex = 0;
    this._durationTween = 0;
    this._isLoopBack = false
}, pause: function () {
    this._isPause = true;
    this._isPlaying = false
}, resume: function () {
    this._isPause = false;
    this._isPlaying = true
}, stop: function () {
    this._isComplete = true;
    this._isPlaying = false
}, play: function (durationTo, tweenEasing) {
    this._isComplete = false;
    this._isPause = false;
    this._isPlaying = true;
    this._currentFrame = 0;
    this._nextFrameIndex = durationTo;
    this._tweenEasing = tweenEasing
}, update: function (dt) {
    if (this._isComplete ||
        this._isPause)return false;
    if (this._rawDuration <= 0)return false;
    var locNextFrameIndex = this._nextFrameIndex;
    var locCurrentFrame = this._currentFrame;
    if (locNextFrameIndex <= 0) {
        this._currentPercent = 1;
        locCurrentFrame = 0
    } else {
        locCurrentFrame += this.processScale * (dt / this.animationInternal);
        this._currentPercent = locCurrentFrame / locNextFrameIndex;
        locCurrentFrame = ccs.fmodf(locCurrentFrame, locNextFrameIndex)
    }
    this._currentFrame = locCurrentFrame;
    this.updateHandler();
    return true
}, updateHandler: function () {
}, gotoFrame: function (frameIndex) {
    var locLoopType =
        this._loopType;
    if (locLoopType == ccs.ANIMATION_TYPE_NO_LOOP)locLoopType = ccs.ANIMATION_TYPE_MAX; else if (locLoopType == ccs.ANIMATION_TYPE_TO_LOOP_FRONT)locLoopType = ccs.ANIMATION_TYPE_LOOP_FRONT;
    this._loopType = locLoopType;
    this._curFrameIndex = frameIndex;
    this._nextFrameIndex = this._durationTween
}, getCurrentFrameIndex: function () {
    this._curFrameIndex = (this._rawDuration - 1) * this._currentPercent;
    return this._curFrameIndex
}, isPause: function () {
    return this._isPause
}, isComplete: function () {
    return this._isComplete
}, getCurrentPercent: function () {
    return this._currentPercent
},
    getRawDuration: function () {
        return this._rawDuration
    }, getLoop: function () {
        return this._loopType
    }, getTweenEasing: function () {
        return this._tweenEasing
    }, getAnimationInternal: function () {
        return this.animationInternal
    }, setAnimationInternal: function (animationInternal) {
        this.animationInternal = animationInternal
    }, getProcessScale: function () {
        return this.processScale
    }, setProcessScale: function (processScale) {
        this.processScale = processScale
    }, isPlaying: function () {
        return this._isPlaying
    }});
var _p = ccs.ProcessBase.prototype;
_p.currentFrameIndex;
cc.defineGetterSetter(_p, "currentFrameIndex", _p.getCurrentFrameIndex);
_p.paused;
cc.defineGetterSetter(_p, "paused", _p.isPause);
_p.completed;
cc.defineGetterSetter(_p, "completed", _p.isComplete);
_p.currentPercent;
cc.defineGetterSetter(_p, "currentPercent", _p.getCurrentPercent);
_p.rawDuration;
cc.defineGetterSetter(_p, "rawDuration", _p.getRawDuration);
_p.loop;
cc.defineGetterSetter(_p, "loop", _p.getLoop);
_p.tweenEasing;
cc.defineGetterSetter(_p, "tweenEasing", _p.getTweenEasing);
_p.playing;
cc.defineGetterSetter(_p, "playing", _p.isPlaying);
_p = null;
ccs.MovementEventType = {start: 0, complete: 1, loopComplete: 2};
ccs.AnimationEvent = ccs.Class.extend({_arguments: null, _callFunc: null, _selectorTarget: null, ctor: function (target, callFunc, data) {
    this._data = data;
    this._callFunc = callFunc;
    this._selectorTarget = target
}, call: function () {
    if (this._callFunc)this._callFunc.apply(this._selectorTarget, this._arguments)
}, setArguments: function (args) {
    this._arguments = args
}});
ccs.MovementEvent = function () {
    this.armature = null;
    this.movementType = "";
    this.movementID = ""
};
ccs.FrameEvent = function () {
    this.bone = null;
    this.frameEventName = "";
    this.originFrameIndex = 0;
    this.currentFrameIndex = 0
};
ccs.ArmatureAnimation = ccs.ProcessBase.extend({animationData: null, _movementData: null, _armature: null, _movementID: "", _prevFrameIndex: 0, _toIndex: 0, _tweenList: null, _frameEvent: null, _movementEvent: null, _speedScale: 1, ignoreFrameEvent: false, _frameEventQueue: null, _movementEventQueue: null, userObject: null, _movementList: null, _onMovementList: false, _movementListLoop: false, _movementIndex: 0, ctor: function () {
    ccs.ProcessBase.prototype.ctor.call(this);
    this.animationData = null;
    this._movementData = null;
    this._movementID =
        "";
    this._armature = null;
    this._prevFrameIndex = 0;
    this._toIndex = 0;
    this._tweenList = [];
    this._frameEvent = null;
    this._movementEvent = null;
    this._speedScale = 1;
    this.ignoreFrameEvent = false;
    this._frameEventQueue = [];
    this._movementEventQueue = [];
    this.userObject = null;
    this._movementList = [];
    this._onMovementList = false;
    this._movementListLoop = false;
    this._movementIndex = 0
}, init: function (armature) {
    this._armature = armature;
    this._tweenList = [];
    return true
}, pause: function () {
    for (var i = 0; i < this._tweenList.length; i++)this._tweenList[i].pause();
    ccs.ProcessBase.prototype.pause.call(this)
}, resume: function () {
    for (var i = 0; i < this._tweenList.length; i++)this._tweenList[i].resume();
    ccs.ProcessBase.prototype.resume.call(this)
}, stop: function () {
    for (var i = 0; i < this._tweenList.length; i++)this._tweenList[i].stop();
    this._tweenList = [];
    ccs.ProcessBase.prototype.stop.call(this)
}, setSpeedScale: function (speedScale) {
    if (speedScale == this._speedScale)return;
    this._speedScale = speedScale;
    this._processScale = !this._movementData ? this._speedScale : this._speedScale * this._movementData.scale;
    var dict = this._armature.getBoneDic();
    for (var key in dict) {
        var bone = dict[key];
        bone.getTween().setProcessScale(this._processScale);
        if (bone.getChildArmature())bone.getChildArmature().getAnimation().setProcessScale(this._processScale)
    }
}, getSpeedScale: function () {
    return this._speedScale
}, getAnimationScale: function () {
    return this.getSpeedScale()
}, setAnimationScale: function (animationScale) {
    return this.setSpeedScale(animationScale)
}, play: function (animationName, durationTo, loop) {
    if (this.animationData == null) {
        cc.log("this.animationData can not be null");
        return
    }
    this._movementData = this.animationData.getMovement(animationName);
    if (this._movementData == null) {
        cc.log("this._movementData can not be null");
        return
    }
    if (durationTo === undefined)durationTo = -1;
    if (loop === undefined)loop = -1;
    var locMovementData = this._movementData;
    this._rawDuration = locMovementData.duration;
    this._movementID = animationName;
    this._processScale = this._speedScale * locMovementData.scale;
    durationTo = durationTo == -1 ? locMovementData.durationTo : durationTo;
    var durationTween = locMovementData.durationTween;
    durationTween = durationTween == 0 ? this._rawDuration : durationTween;
    var tweenEasing = locMovementData.tweenEasing;
    if (loop < 0)loop = locMovementData.loop; else loop = Boolean(loop);
    this._onMovementList = false;
    ccs.ProcessBase.prototype.play.call(this, durationTo, tweenEasing);
    if (this._rawDuration == 0)this._loopType = ccs.ANIMATION_TYPE_SINGLE_FRAME; else {
        if (loop)this._loopType = ccs.ANIMATION_TYPE_TO_LOOP_FRONT; else this._loopType = ccs.ANIMATION_TYPE_NO_LOOP;
        this._durationTween = durationTween
    }
    this._tweenList = [];
    var movementBoneData;
    var dict = this._armature.getBoneDic();
    for (var key in dict) {
        var bone = dict[key];
        movementBoneData = locMovementData.getMovementBoneData(bone.getName());
        var tween = bone.getTween();
        if (movementBoneData && movementBoneData.frameList.length > 0) {
            this._tweenList.push(tween);
            movementBoneData.duration = locMovementData.duration;
            tween.play(movementBoneData, durationTo, durationTween, loop, tweenEasing);
            tween.setProcessScale(this._processScale);
            if (bone.getChildArmature())bone.getChildArmature().getAnimation().setProcessScale(this._processScale)
        } else if (!bone.getIgnoreMovementBoneData()) {
            bone.getDisplayManager().changeDisplayWithIndex(-1,
                false);
            tween.stop()
        }
    }
    this._armature.update(0)
}, playWithNames: function (movementNames, durationTo, loop) {
    this._movementList = [];
    this._movementListLoop = loop;
    this._onMovementList = true;
    this._movementIndex = 0;
    for (var i = 0; i < movementNames.length; i++)this._movementList.push({name: movementNames[i], durationTo: durationTo});
    this.updateMovementList()
}, updateMovementList: function () {
    if (this._onMovementList) {
        if (this._movementListLoop) {
            var movementObj = this._movementList[this._movementIndex];
            this.play(movementObj.name,
                movementObj.durationTo, -1, 0);
            this._movementIndex++;
            if (this._movementIndex >= this._movementList.length)this._movementIndex = 0
        } else if (this._movementIndex < this._movementList.length) {
            var movementObj = this._movementList[this._movementIndex];
            this.play(movementObj.name, movementObj.durationTo, -1, 0);
            this._movementIndex++
        } else this._onMovementList = false;
        this._onMovementList = true
    }
}, gotoAndPlay: function (frameIndex) {
    if (!this._movementData || frameIndex < 0 || frameIndex >= this._movementData.duration) {
        cc.log("Please ensure you have played a movement, and the frameIndex is in the range.");
        return
    }
    var ignoreFrameEvent = this.ignoreFrameEvent;
    this.ignoreFrameEvent = true;
    this._isPlaying = true;
    this._isComplete = this._isPause = false;
    ccs.ProcessBase.prototype.gotoFrame.call(this, frameIndex);
    this._currentPercent = this._curFrameIndex / (this._movementData.duration - 1);
    this._currentFrame = this._nextFrameIndex * this._currentPercent;
    for (var i = 0; i < this._tweenList.length; i++) {
        var tween = this._tweenList[i];
        tween.gotoAndPlay(frameIndex)
    }
    this._armature.update(0);
    this.ignoreFrameEvent = ignoreFrameEvent
}, gotoAndPause: function (frameIndex) {
    this.gotoAndPlay(frameIndex);
    this.pause()
}, playWithIndex: function (animationIndex, durationTo, durationTween, loop, tweenEasing) {
    if (typeof durationTo == "undefined")durationTo = -1;
    if (typeof loop == "undefined")loop = -1;
    var moveNames = this.animationData.movementNames;
    if (animationIndex < -1 || animationIndex >= moveNames.length)return;
    var animationName = moveNames[animationIndex];
    this.play(animationName, durationTo, -1, loop, 0)
}, playByIndex: function (animationIndex, durationTo, durationTween, loop, tweenEasing) {
    cc.log("playByIndex is deprecated. Use playWithIndex instead.");
    this.playWithIndex(animationIndex, durationTo, durationTween, loop, tweenEasing)
}, playWithIndexes: function (movementIndexes, durationTo, loop) {
    this._movementList = [];
    this._movementListLoop = loop;
    this._onMovementList = true;
    this._movementIndex = 0;
    var movName = this.animationData.movementNames;
    for (var i = 0; i < movementIndexes.length; i++) {
        var name = movName[movementIndexes[i]];
        this._movementList.push({name: name, durationTo: durationTo})
    }
    this.updateMovementList()
}, getMovementCount: function () {
    return this.animationData.getMovementCount()
},
    update: function (dt) {
        if (ccs.ProcessBase.prototype.update.call(this, dt))for (var i = 0; i < this._tweenList.length; i++)this._tweenList[i].update(dt);
        var frameEvents = this._frameEventQueue;
        while (frameEvents.length > 0) {
            var frameEvent = frameEvents.shift();
            this.ignoreFrameEvent = true;
            this.callFrameEvent([frameEvent.bone, frameEvent.frameEventName, frameEvent.originFrameIndex, frameEvent.currentFrameIndex]);
            this.ignoreFrameEvent = false
        }
        var movementEvents = this._movementEventQueue;
        while (movementEvents.length > 0) {
            var movEvent =
                movementEvents.shift();
            this.callMovementEvent([movEvent.armature, movEvent.movementType, movEvent.movementID])
        }
    }, updateHandler: function () {
        var locCurrentPercent = this._currentPercent;
        if (locCurrentPercent >= 1) {
            switch (this._loopType) {
                case ccs.ANIMATION_TYPE_NO_LOOP:
                    this._loopType = ccs.ANIMATION_TYPE_MAX;
                    this._currentFrame = (locCurrentPercent - 1) * this._nextFrameIndex;
                    locCurrentPercent = this._currentFrame / this._durationTween;
                    if (locCurrentPercent < 1) {
                        this._nextFrameIndex = this._durationTween;
                        this.movementEvent(this._armature,
                            ccs.MovementEventType.start, this._movementID);
                        break
                    }
                case ccs.ANIMATION_TYPE_MAX:
                case ccs.ANIMATION_TYPE_SINGLE_FRAME:
                    locCurrentPercent = 1;
                    this._isComplete = true;
                    this._isPlaying = false;
                    this.movementEvent(this._armature, ccs.MovementEventType.complete, this._movementID);
                    this.updateMovementList();
                    break;
                case ccs.ANIMATION_TYPE_TO_LOOP_FRONT:
                    this._loopType = ccs.ANIMATION_TYPE_LOOP_FRONT;
                    locCurrentPercent = ccs.fmodf(locCurrentPercent, 1);
                    this._currentFrame = this._nextFrameIndex == 0 ? 0 : ccs.fmodf(this._currentFrame,
                        this._nextFrameIndex);
                    this._nextFrameIndex = this._durationTween > 0 ? this._durationTween : 1;
                    this.movementEvent(this, ccs.MovementEventType.start, this._movementID);
                    break;
                default:
                    this._currentFrame = ccs.fmodf(this._currentFrame, this._nextFrameIndex);
                    this._toIndex = 0;
                    this.movementEvent(this._armature, ccs.MovementEventType.loopComplete, this._movementID);
                    break
            }
            this._currentPercent = locCurrentPercent
        }
    }, getCurrentMovementID: function () {
        if (this._isComplete)return"";
        return this._movementID
    }, setMovementEventCallFunc: function (callFunc, target) {
        this._movementEvent = new ccs.AnimationEvent(target, callFunc)
    }, callMovementEvent: function (args) {
        if (this._movementEvent) {
            this._movementEvent.setArguments(args);
            this._movementEvent.call()
        }
    }, setFrameEventCallFunc: function (callFunc, target) {
        this._frameEvent = new ccs.AnimationEvent(target, callFunc)
    }, callFrameEvent: function (args) {
        if (this._frameEvent) {
            this._frameEvent.setArguments(args);
            this._frameEvent.call()
        }
    }, movementEvent: function (armature, movementType, movementID) {
        if (this._movementEvent) {
            var event =
                new ccs.MovementEvent;
            event.armature = armature;
            event.movementType = movementType;
            event.movementID = movementID;
            this._movementEventQueue.push(event)
        }
    }, frameEvent: function (bone, frameEventName, originFrameIndex, currentFrameIndex) {
        if (this._frameEvent) {
            var frameEvent = new ccs.FrameEvent;
            frameEvent.bone = bone;
            frameEvent.frameEventName = frameEventName;
            frameEvent.originFrameIndex = originFrameIndex;
            frameEvent.currentFrameIndex = currentFrameIndex;
            this._frameEventQueue.push(frameEvent)
        }
    }, setAnimationData: function (aniData) {
        this.animationData =
            aniData
    }, getAnimationData: function () {
        return this.animationData
    }, setUserObject: function (userObject) {
        this.userObject = userObject
    }, getUserObject: function () {
        return this.userObject
    }, isIgnoreFrameEvent: function () {
        return this.ignoreFrameEvent
    }, setIgnoreFrameEvent: function (bool) {
        this.ignoreFrameEvent = bool
    }});
var _p = ccs.ArmatureAnimation.prototype;
_p.speedScale;
cc.defineGetterSetter(_p, "speedScale", _p.getSpeedScale, _p.setSpeedScale);
_p.animationScale;
cc.defineGetterSetter(_p, "animationScale", _p.getAnimationScale, _p.setAnimationScale);
_p = null;
ccs.ArmatureAnimation.create = function (armature) {
    var animation = new ccs.ArmatureAnimation;
    if (animation && animation.init(armature))return animation;
    return null
};
ccs.Tween = ccs.ProcessBase.extend({_tweenData: null, _to: null, _from: null, _between: null, _movementBoneData: null, _bone: null, _frameTweenEasing: 0, _betweenDuration: 0, _totalDuration: 0, _toIndex: 0, _fromIndex: 0, animation: null, _passLastFrame: false, ctor: function () {
    ccs.ProcessBase.prototype.ctor.call(this);
    this._tweenData = null;
    this._to = null;
    this._from = null;
    this._between = null;
    this._bone = null;
    this._movementBoneData = null;
    this._frameTweenEasing = ccs.TweenType.linear;
    this._toIndex = 0;
    this._fromIndex = 0;
    this.animation = null;
    this._passLastFrame = false
}, init: function (bone) {
    this._from = new ccs.FrameData;
    this._between = new ccs.FrameData;
    this._bone = bone;
    this._tweenData = this._bone.getTweenData();
    this._tweenData.displayIndex = -1;
    var armature = bone.getArmature();
    if (armature)this.animation = armature.getAnimation();
    return true
}, play: function (movementBoneData, durationTo, durationTween, loop, tweenEasing) {
    ccs.ProcessBase.prototype.play.call(this, durationTo, tweenEasing);
    if (loop)this._loopType = ccs.ANIMATION_TYPE_TO_LOOP_FRONT; else this._loopType =
        ccs.ANIMATION_TYPE_NO_LOOP;
    this._totalDuration = 0;
    this._betweenDuration = 0;
    this._fromIndex = this._toIndex = 0;
    var difMovement = movementBoneData != this._movementBoneData;
    this._movementBoneData = movementBoneData;
    this._rawDuration = this._movementBoneData.duration;
    var nextKeyFrame = this._movementBoneData.getFrameData(0);
    this._tweenData.displayIndex = nextKeyFrame.displayIndex;
    if (this._bone.getArmature().getArmatureData().dataVersion >= ccs.CONST_VERSION_COMBINED) {
        ccs.TransformHelp.nodeSub(this._tweenData, this._bone.getBoneData());
        this._tweenData.scaleX += 1;
        this._tweenData.scaleY += 1
    }
    if (this._rawDuration == 0 || this._movementBoneData.frameList.length == 1) {
        this._loopType = ccs.ANIMATION_TYPE_SINGLE_FRAME;
        if (durationTo == 0)this.setBetween(nextKeyFrame, nextKeyFrame); else this.setBetween(this._tweenData, nextKeyFrame);
        this._frameTweenEasing = ccs.TweenType.linear
    } else if (this._movementBoneData.frameList.length > 1) {
        this._durationTween = durationTween * this._movementBoneData.scale;
        if (loop && this._movementBoneData.delay != 0)this.setBetween(this._tweenData,
            this.tweenNodeTo(this.updateFrameData(1 - this._movementBoneData.delay), this._between)); else if (!difMovement || durationTo == 0)this.setBetween(nextKeyFrame, nextKeyFrame); else this.setBetween(this._tweenData, nextKeyFrame)
    }
    this.tweenNodeTo(0)
}, gotoAndPlay: function (frameIndex) {
    ccs.ProcessBase.prototype.gotoFrame.call(this, frameIndex);
    this._totalDuration = 0;
    this._betweenDuration = 0;
    this._fromIndex = this._toIndex = 0;
    this._isPlaying = true;
    this._isComplete = this._isPause = false;
    this._currentPercent = this._curFrameIndex /
        (this._rawDuration - 1);
    this._currentFrame = this._nextFrameIndex * this._currentPercent
}, gotoAndPause: function (frameIndex) {
    this.gotoAndPlay(frameIndex);
    this.pause()
}, updateHandler: function () {
    var locCurrentPercent = this._currentPercent;
    var locLoopType = this._loopType;
    if (locCurrentPercent >= 1)switch (locLoopType) {
        case ccs.ANIMATION_TYPE_SINGLE_FRAME:
            locCurrentPercent = 1;
            this._isComplete = true;
            this._isPlaying = false;
            break;
        case ccs.ANIMATION_TYPE_NO_LOOP:
            locLoopType = ccs.ANIMATION_TYPE_MAX;
            if (this._durationTween <=
                0)locCurrentPercent = 1; else locCurrentPercent = (locCurrentPercent - 1) * this._nextFrameIndex / this._durationTween;
            if (locCurrentPercent >= 1) {
                locCurrentPercent = 1;
                this._isComplete = true;
                this._isPlaying = false;
                break
            } else {
                this._nextFrameIndex = this._durationTween;
                this._currentFrame = locCurrentPercent * this._nextFrameIndex;
                this._totalDuration = 0;
                this._betweenDuration = 0;
                this._fromIndex = this._toIndex = 0;
                break
            }
        case ccs.ANIMATION_TYPE_TO_LOOP_FRONT:
            locLoopType = ccs.ANIMATION_TYPE_LOOP_FRONT;
            this._nextFrameIndex = this._durationTween >
                0 ? this._durationTween : 1;
            if (this._movementBoneData.delay != 0) {
                this._currentFrame = (1 - this._movementBoneData.delay) * this._nextFrameIndex;
                locCurrentPercent = this._currentFrame / this._nextFrameIndex
            } else {
                locCurrentPercent = 0;
                this._currentFrame = 0
            }
            this._totalDuration = 0;
            this._betweenDuration = 0;
            this._fromIndex = this._toIndex = 0;
            break;
        case ccs.ANIMATION_TYPE_MAX:
            locCurrentPercent = 1;
            this._isComplete = true;
            this._isPlaying = false;
            break;
        default:
            this._currentFrame = ccs.fmodf(this._currentFrame, this._nextFrameIndex);
            this._totalDuration =
                0;
            this._betweenDuration = 0;
            break
    }
    if (locCurrentPercent < 1 && locLoopType < ccs.ANIMATION_TYPE_TO_LOOP_BACK)locCurrentPercent = Math.sin(locCurrentPercent * cc.PI / 2);
    this._currentPercent = locCurrentPercent;
    this._loopType = locLoopType;
    if (locLoopType > ccs.ANIMATION_TYPE_TO_LOOP_BACK)locCurrentPercent = this.updateFrameData(locCurrentPercent);
    if (this._frameTweenEasing != ccs.TweenType.tweenEasingMax)this.tweenNodeTo(locCurrentPercent)
}, setBetween: function (from, to, limit) {
    if (typeof limit == "undefined")limit = true;
    do {
        if (from.displayIndex <
            0 && to.displayIndex >= 0) {
            this._from.copy(to);
            this._between.subtract(to, to, limit);
            break
        }
        if (to.displayIndex < 0 && from.displayIndex >= 0) {
            this._from.copy(from);
            this._between.subtract(to, to, limit);
            break
        }
        this._from.copy(from);
        this._between.subtract(from, to, limit)
    } while (0);
    if (!from.isTween) {
        this._tweenData.copy(from);
        this._tweenData.isTween = true
    }
    this.arriveKeyFrame(from)
}, arriveKeyFrame: function (keyFrameData) {
    if (keyFrameData) {
        var locBone = this._bone;
        var displayIndex = keyFrameData.displayIndex;
        var displayManager =
            locBone.getDisplayManager();
        if (!displayManager.getForceChangeDisplay()) {
            displayManager.changeDisplayWithIndex(displayIndex, false);
            var locRenderNode = displayManager.getDisplayRenderNode();
            if (locRenderNode)locRenderNode.setBlendFunc(keyFrameData.blendFunc)
        }
        this._tweenData.zOrder = keyFrameData.zOrder;
        locBone.updateZOrder();
        var childAramture = locBone.getChildArmature();
        if (childAramture)if (keyFrameData.movement != "")childAramture.getAnimation().play(keyFrameData.movement)
    }
}, tweenNodeTo: function (percent, node) {
    if (!node)node =
        this._tweenData;
    var locFrom = this._from;
    var locBetween = this._between;
    if (!locFrom.isTween)percent = 0;
    node.x = locFrom.x + percent * locBetween.x;
    node.y = locFrom.y + percent * locBetween.y;
    node.scaleX = locFrom.scaleX + percent * locBetween.scaleX;
    node.scaleY = locFrom.scaleY + percent * locBetween.scaleY;
    node.skewX = locFrom.skewX + percent * locBetween.skewX;
    node.skewY = locFrom.skewY + percent * locBetween.skewY;
    this._bone.setTransformDirty(true);
    if (node && locBetween.isUseColorInfo)this.tweenColorTo(percent, node);
    return node
}, tweenColorTo: function (percent, node) {
    var locFrom = this._from;
    var locBetween = this._between;
    node.a = locFrom.a + percent * locBetween.a;
    node.r = locFrom.r + percent * locBetween.r;
    node.g = locFrom.g + percent * locBetween.g;
    node.b = locFrom.b + percent * locBetween.b;
    this._bone.updateColor()
}, updateFrameData: function (currentPercent) {
    if (currentPercent > 1 && this._movementBoneData.delay != 0)currentPercent = ccs.fmodf(currentPercent, 1);
    var playedTime = (this._rawDuration - 1) * currentPercent;
    var from, to;
    var locTotalDuration = this._totalDuration, locBetweenDuration = this._betweenDuration,
        locToIndex = this._toIndex;
    if (playedTime < locTotalDuration || playedTime >= locTotalDuration + locBetweenDuration) {
        var length = this._movementBoneData.frameList.length;
        var frames = this._movementBoneData.frameList;
        if (playedTime < frames[0].frameID) {
            from = to = frames[0];
            this.setBetween(from, to);
            return currentPercent
        } else if (playedTime >= frames[length - 1].frameID) {
            if (this._passLastFrame) {
                from = to = frames[length - 1];
                this.setBetween(from, to);
                return currentPercent
            }
            this._passLastFrame = true
        } else this._passLastFrame = false;
        do {
            this._fromIndex =
                locToIndex;
            from = frames[this._fromIndex];
            locTotalDuration = from.frameID;
            locToIndex = this._fromIndex + 1;
            if (locToIndex >= length)locToIndex = 0;
            to = frames[locToIndex];
            if (from.event && !this.animation.isIgnoreFrameEvent())this.animation.frameEvent(this._bone, from.event, from.frameID, playedTime);
            if (playedTime == from.frameID || this._passLastFrame && this._fromIndex == length - 1)break
        } while (playedTime < from.frameID || playedTime >= to.frameID);
        locBetweenDuration = to.frameID - from.frameID;
        this._frameTweenEasing = from.tweenEasing;
        this.setBetween(from, to, false);
        this._totalDuration = locTotalDuration;
        this._betweenDuration = locBetweenDuration;
        this._toIndex = locToIndex
    }
    currentPercent = locBetweenDuration == 0 ? 0 : (playedTime - locTotalDuration) / locBetweenDuration;
    var tweenType = this._frameTweenEasing != ccs.TweenType.linear ? this._frameTweenEasing : this._tweenEasing;
    if (tweenType != ccs.TweenType.tweenEasingMax && tweenType != ccs.TweenType.linear && !this._passLastFrame)currentPercent = ccs.TweenFunction.tweenTo(currentPercent, tweenType, this._from.easingParams);
    return currentPercent
}, setAnimation: function (animation) {
    this.animation = animation
}, getAnimation: function () {
    return this.animation
}, release: function () {
    this._from = null;
    this._between = null
}});
ccs.Tween.create = function (bone) {
    var tween = new ccs.Tween;
    if (tween && tween.init(bone))return tween;
    return null
};
ccs.PT_RATIO = 32;
ccs.ColliderFilter = ccs.Class.extend({_collisionType: 0, _group: 0, ctor: function (collisionType, group) {
    this._collisionType = collisionType || 0;
    this._group = group || 0
}, updateShape: function (shape) {
    shape.collision_type = this._collisionType;
    shape.group = this._group
}});
ccs.ColliderBody = ccs.Class.extend({shape: null, coutourData: null, colliderFilter: null, _calculatedVertexList: null, ctor: function (contourData) {
    this.shape = null;
    this.coutourData = contourData;
    this.colliderFilter = new ccs.ColliderFilter;
    if (ccs.ENABLE_PHYSICS_SAVE_CALCULATED_VERTEX)this._calculatedVertexList = []
}, getContourData: function () {
    return this.coutourData
}, setContourData: function (contourData) {
    this.coutourData = contourData
}, getShape: function () {
    return this.shape
}, setShape: function (shape) {
    this.shape = shape
},
    getColliderFilter: function () {
        return this.colliderFilter
    }, setColliderFilter: function (colliderFilter) {
        this.colliderFilter = colliderFilter
    }, getCalculatedVertexList: function () {
        return this._calculatedVertexList
    }});
ccs.ColliderDetector = ccs.Class.extend({_colliderBodyList: null, _bone: null, _body: null, _active: false, _filter: null, ctor: function () {
    this._colliderBodyList = [];
    this._bone = null;
    this._body = null;
    this._active = false;
    this._filter = null
}, init: function (bone) {
    this._colliderBodyList = [];
    if (bone)this._bone = bone;
    this._filter = new ccs.ColliderFilter;
    return true
}, addContourData: function (contourData) {
    var colliderBody = new ccs.ColliderBody(contourData);
    this._colliderBodyList.push(colliderBody);
    if (ccs.ENABLE_PHYSICS_SAVE_CALCULATED_VERTEX) {
        var calculatedVertexList =
            colliderBody.getCalculatedVertexList();
        var vertexList = contourData.vertexList;
        for (var i = 0; i < vertexList.length; i++) {
            var newVertex = new ccs.ContourVertex2(0, 0);
            calculatedVertexList.push(newVertex)
        }
    }
}, addContourDataList: function (contourDataList) {
    for (var i = 0; i < contourDataList.length; i++)this.addContourData(contourDataList[i])
}, removeContourData: function (contourData) {
    var locColliderBodyList = this._colliderBodyList;
    for (var i = 0; i < locColliderBodyList.length; i++)if (locColliderBodyList[i].getContourData() == contourData) {
        locColliderBodyList.splice(i,
            1);
        return
    }
}, removeAll: function () {
    this._colliderBodyList = []
}, setColliderFilter: function (filter) {
    this._filter = filter;
    for (var i = 0; i < this._colliderBodyList.length; i++) {
        var colliderBody = this._colliderBodyList[i];
        colliderBody.setColliderFilter(filter);
        if (ccs.ENABLE_PHYSICS_CHIPMUNK_DETECT)if (colliderBody.getShape())colliderBody.getColliderFilter().updateShape(colliderBody.getShape())
    }
}, getColliderFilter: function () {
    return this._filter
}, setActive: function (active) {
    if (this._active == active)return;
    this._active =
        active;
    var locBody = this._body;
    var locShape;
    if (locBody) {
        var colliderBody = null;
        if (this._active)for (var i = 0; i < this._colliderBodyList.length; i++) {
            colliderBody = this._colliderBodyList[i];
            locShape = colliderBody.getShape();
            locBody.space.addShape(locShape)
        } else for (var i = 0; i < this._colliderBodyList.length; i++) {
            colliderBody = this._colliderBodyList[i];
            locShape = colliderBody.getShape();
            locBody.space.removeShape(locShape)
        }
    }
}, getActive: function () {
    return this._active
}, getColliderBodyList: function () {
    return this._colliderBodyList
},
    helpPoint: cc.p(0, 0), updateTransform: function (t) {
        if (!this._active)return;
        var colliderBody = null;
        var locBody = this._body;
        var locHelpPoint = this.helpPoint;
        for (var i = 0; i < this._colliderBodyList.length; i++) {
            colliderBody = this._colliderBodyList[i];
            var contourData = colliderBody.getContourData();
            var shape = null;
            if (locBody)shape = colliderBody.getShape();
            var vs = contourData.vertexList;
            var cvs = colliderBody.getCalculatedVertexList();
            for (var j = 0; j < vs.length; j++) {
                locHelpPoint.x = vs[j].x;
                locHelpPoint.y = vs[j].y;
                locHelpPoint =
                    cc.PointApplyAffineTransform(locHelpPoint, t);
                if (shape) {
                    shape.verts[j * 2] = locHelpPoint.x;
                    shape.verts[j * 2 + 1] = locHelpPoint.y
                }
                if (ccs.ENABLE_PHYSICS_SAVE_CALCULATED_VERTEX) {
                    var v = cc.p(0, 0);
                    v.x = locHelpPoint.x;
                    v.y = locHelpPoint.y;
                    cvs[j] = v
                }
            }
            if (shape)for (var j = 0; j < vs.length; j++) {
                var b = shape.verts[(j + 1) % shape.verts.length];
                var n = cp.v.normalize(cp.v.perp(cp.v.sub(b, shape.verts[j])));
                shape.axes[j].n = n;
                shape.axes[j].d = cp.v.dot(n, shape.verts[j])
            }
        }
    }, getBody: function () {
        return this._body
    }, setBody: function (body) {
        this._body =
            body;
        var colliderBody;
        for (var i = 0; i < this._colliderBodyList.length; i++) {
            colliderBody = this._colliderBodyList[i];
            var contourData = colliderBody.getContourData();
            var verts = [];
            var vs = contourData.vertexList;
            for (var i = 0; i < vs.length; i++) {
                var v = vs[i];
                verts.push(v.x);
                verts.push(v.y)
            }
            var shape = new cp.PolyShape(this._body, verts, cp.vzero);
            shape.sensor = true;
            shape.data = this._bone;
            if (this._active)this._body.space.addShape(shape);
            colliderBody.setShape(shape);
            colliderBody.getColliderFilter().updateShape(shape)
        }
    }});
var _p = ccs.ColliderDetector.prototype;
_p.colliderFilter;
cc.defineGetterSetter(_p, "colliderFilter", _p.getColliderFilter, _p.setColliderFilter);
_p.active;
cc.defineGetterSetter(_p, "active", _p.getActive, _p.setActive);
_p.body;
cc.defineGetterSetter(_p, "body", _p.getBody, _p.setBody);
_p = null;
ccs.ColliderDetector.create = function (bone) {
    var colliderDetector = new ccs.ColliderDetector;
    if (colliderDetector && colliderDetector.init(bone))return colliderDetector;
    return null
};
ccs.Armature = ccs.NodeRGBA.extend({animation: null, armatureData: null, batchNode: null, name: "", _textureAtlas: null, _parentBone: null, _boneDic: null, _topBoneList: null, _armatureIndexDic: null, _offsetPoint: null, version: 0, _armatureTransformDirty: true, _body: null, _textureAtlasDic: null, _blendFunc: null, _className: "Armature", ctor: function (name, parentBone) {
    cc.NodeRGBA.prototype.ctor.call(this);
    this.animation = null;
    this.armatureData = null;
    this.batchNode = null;
    this.name = "";
    this._textureAtlas = null;
    this._parentBone = null;
    this._boneDic =
        null;
    this._topBoneList = null;
    this._armatureIndexDic = {};
    this._offsetPoint = cc.p(0, 0);
    this.version = 0;
    this._armatureTransformDirty = true;
    this._body = null;
    this._textureAtlasDic = null;
    this._blendFunc = null;
    parentBone && ccs.Armature.prototype.init.call(this, name, parentBone)
}, init: function (name, parentBone) {
    cc.NodeRGBA.prototype.init.call(this);
    if (parentBone)this._parentBone = parentBone;
    this.removeAllChildren();
    this.animation = new ccs.ArmatureAnimation;
    this.animation.init(this);
    this._boneDic = {};
    this._topBoneList =
        [];
    this._textureAtlasDic = {};
    this._blendFunc = {src: cc.BLEND_SRC, dst: cc.BLEND_DST};
    this.name = !name ? "" : name;
    var armatureDataManager = ccs.armatureDataManager;
    if (name != "") {
        var animationData = armatureDataManager.getAnimationData(name);
        if (!animationData) {
            cc.log("AnimationData not exist! ");
            return false
        }
        this.animation.setAnimationData(animationData);
        var armatureData = armatureDataManager.getArmatureData(name);
        this.armatureData = armatureData;
        var boneDataDic = armatureData.getBoneDataDic();
        for (var key in boneDataDic) {
            var bone =
                this.createBone(String(key));
            do {
                var movData = animationData.getMovement(animationData.movementNames[0]);
                if (!movData)break;
                var _movBoneData = movData.getMovementBoneData(bone.getName());
                if (!_movBoneData || _movBoneData.frameList.length <= 0)break;
                var frameData = _movBoneData.getFrameData(0);
                if (!frameData)break;
                bone.getTweenData().copy(frameData);
                bone.changeDisplayWithIndex(frameData.displayIndex, false)
            } while (0)
        }
        this.update(0);
        this.updateOffsetPoint()
    } else {
        this.name = "new_armature";
        this.armatureData = new ccs.ArmatureData;
        this.armatureData.name = this.name;
        var animationData = new ccs.AnimationData;
        animationData.name = this.name;
        armatureDataManager.addArmatureData(this.name, this.armatureData);
        armatureDataManager.addAnimationData(this.name, animationData);
        this.animation.setAnimationData(animationData)
    }
    if (cc._renderType === cc._RENDER_TYPE_WEBGL)this.setShaderProgram(cc.shaderCache.programForKey(cc.SHADER_POSITION_TEXTURE_UCOLOR));
    this.setCascadeOpacityEnabled(true);
    this.setCascadeColorEnabled(true);
    return true
}, onEnter: function () {
    cc.NodeRGBA.prototype.onEnter.call(this);
    this.scheduleUpdate()
}, onExit: function () {
    cc.NodeRGBA.prototype.onExit.call(this);
    this.unscheduleUpdate()
}, createBone: function (boneName) {
    var existedBone = this.getBone(boneName);
    if (existedBone)return existedBone;
    var boneData = this.armatureData.getBoneData(boneName);
    var parentName = boneData.parentName;
    var bone = null;
    if (parentName != "") {
        this.createBone(parentName);
        bone = ccs.Bone.create(boneName);
        this.addBone(bone, parentName)
    } else {
        bone = ccs.Bone.create(boneName);
        this.addBone(bone, "")
    }
    bone.setBoneData(boneData);
    bone.getDisplayManager().changeDisplayWithIndex(-1, false);
    return bone
}, addBone: function (bone, parentName) {
    if (!bone) {
        cc.log("Argument must be non-nil");
        return
    }
    if (this._boneDic[bone.getName()]) {
        cc.log("bone already added. It can't be added again");
        return
    }
    if (parentName) {
        var boneParent = this._boneDic[parentName];
        if (boneParent)boneParent.addChildBone(bone); else this._topBoneList.push(bone)
    } else this._topBoneList.push(bone);
    bone.setArmature(this);
    this._boneDic[bone.getName()] = bone;
    this.addChild(bone)
}, removeBone: function (bone, recursion) {
    if (!bone) {
        cc.log("bone must be added to the bone dictionary!");
        return
    }
    bone.setArmature(null);
    bone.removeFromParent(recursion);
    cc.arrayRemoveObject(this._topBoneList, bone);
    delete this._boneDic[bone.getName()];
    this.removeChild(bone, true)
}, getBone: function (name) {
    return this._boneDic[name]
}, changeBoneParent: function (bone, parentName) {
    if (!bone) {
        cc.log("bone must be added to the bone dictionary!");
        return
    }
    var parentBone = bone.getParentBone();
    if (parentBone) {
        cc.arrayRemoveObject(parentBone.getChildrenBone(),
            bone);
        bone.setParentBone(null)
    }
    if (parentName) {
        var boneParent = this._boneDic[parentName];
        if (boneParent) {
            boneParent.addChildBone(bone);
            cc.arrayRemoveObject(this._topBoneList, bone)
        } else this._topBoneList.push(bone)
    }
}, getBoneDic: function () {
    return this._boneDic
}, updateOffsetPoint: function () {
    var rect = this.boundingBox();
    this.setContentSize(rect);
    var locOffsetPoint = this._offsetPoint;
    locOffsetPoint.x = -rect.x;
    locOffsetPoint.y = -rect.y;
    if (rect.width != 0 && rect.height != 0)this.setAnchorPoint(locOffsetPoint.x / rect.width,
            locOffsetPoint.y / rect.height)
}, update: function (dt) {
    this.animation.update(dt);
    var locTopBoneList = this._topBoneList;
    for (var i = 0; i < locTopBoneList.length; i++)locTopBoneList[i].update(dt);
    this._armatureTransformDirty = false
}, nodeToParentTransform: null, _nodeToParentTransformForWebGL: function () {
    if (this._transformDirty) {
        this._armatureTransformDirty = true;
        var x = this._position.x;
        var y = this._position.y;
        var apx = this._anchorPointInPoints.x, napx = -apx;
        var apy = this._anchorPointInPoints.y, napy = -apy;
        var scx = this._scaleX,
            scy = this._scaleY;
        if (this._ignoreAnchorPointForPosition) {
            x += apx;
            y += apy
        }
        var cx = 1, sx = 0, cy = 1, sy = 0;
        if (this._rotationX !== 0 || this._rotationY !== 0) {
            cx = Math.cos(-this._rotationRadiansX);
            sx = Math.sin(-this._rotationRadiansX);
            cy = Math.cos(-this._rotationRadiansY);
            sy = Math.sin(-this._rotationRadiansY)
        }
        x += cy * this._offsetPoint.x * this._scaleX + -sx * this._offsetPoint.y * this._scaleY;
        y += sy * this._offsetPoint.x * this._scaleX + cx * this._offsetPoint.y * this._scaleY;
        var needsSkewMatrix = this._skewX || this._skewY;
        if (!needsSkewMatrix &&
            (apx !== 0 || apy !== 0)) {
            x += cy * napx * scx + -sx * napy * scy;
            y += sy * napx * scx + cx * napy * scy
        }
        var t = {a: cy * scx, b: sy * scx, c: -sx * scy, d: cx * scy, tx: x, ty: y};
        if (needsSkewMatrix) {
            t = cc.AffineTransformConcat({a: 1, b: Math.tan(cc.degreesToRadians(this._skewY)), c: Math.tan(cc.degreesToRadians(this._skewX)), d: 1, tx: 0, ty: 0}, t);
            if (apx !== 0 || apy !== 0)t = cc.AffineTransformTranslate(t, napx, napy)
        }
        if (this._additionalTransformDirty) {
            t = cc.AffineTransformConcat(t, this._additionalTransform);
            this._additionalTransformDirty = false
        }
        this._transform = t;
        this._transformDirty =
            false
    }
    return this._transform
}, _nodeToParentTransformForCanvas: function () {
    if (!this._transform)this._transform = {a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0};
    if (this._transformDirty) {
        this._armatureTransformDirty = true;
        var t = this._transform;
        t.tx = this._position.x;
        t.ty = this._position.y;
        var Cos = 1, Sin = 0;
        if (this._rotationX) {
            Cos = Math.cos(-this._rotationRadiansX);
            Sin = Math.sin(-this._rotationRadiansX)
        }
        t.a = t.d = Cos;
        t.c = -Sin;
        t.b = Sin;
        var lScaleX = this._scaleX, lScaleY = this._scaleY;
        var appX = this._anchorPointInPoints.x, appY = this._anchorPointInPoints.y;
        var sx = lScaleX < 1E-6 && lScaleX > -1E-6 ? 1E-6 : lScaleX, sy = lScaleY < 1E-6 && lScaleY > -1E-6 ? 1E-6 : lScaleY;
        t.tx += Cos * this._offsetPoint.x * lScaleX + -Sin * this._offsetPoint.y * lScaleY;
        t.ty += Sin * this._offsetPoint.x * lScaleX + Cos * this._offsetPoint.y * lScaleY;
        if (this._skewX || this._skewY) {
            var skx = Math.tan(-this._skewX * Math.PI / 180);
            var sky = Math.tan(-this._skewY * Math.PI / 180);
            var xx = appY * skx * sx;
            var yy = appX * sky * sy;
            t.a = Cos + -Sin * sky;
            t.c = Cos * skx + -Sin;
            t.b = Sin + Cos * sky;
            t.d = Sin * skx + Cos;
            t.tx += Cos * xx + -Sin * yy;
            t.ty += Sin * xx + Cos * yy
        }
        if (lScaleX !==
            1 || lScaleY !== 1) {
            t.a *= sx;
            t.b *= sx;
            t.c *= sy;
            t.d *= sy
        }
        t.tx += Cos * -appX * sx + -Sin * -appY * sy;
        t.ty += Sin * -appX * sx + Cos * -appY * sy;
        if (this._ignoreAnchorPointForPosition) {
            t.tx += appX;
            t.ty += appY
        }
        if (this._additionalTransformDirty) {
            this._transform = cc.AffineTransformConcat(this._transform, this._additionalTransform);
            this._additionalTransformDirty = false
        }
        t.tx = t.tx | 0;
        t.ty = t.ty | 0;
        this._transformDirty = false
    }
    return this._transform
}, draw: function () {
}, setBlendFunc: function (blendFunc) {
    this._blendFunc = blendFunc
}, getBlendFunc: function () {
    return this._blendFunc
},
    boundingBox: function () {
        var minx = 0, miny = 0, maxx = 0, maxy = 0;
        var first = true;
        var boundingBox = cc.rect(0, 0, 0, 0);
        for (var i = 0; i < this._children.length; i++) {
            var bone = this._children[i];
            if (bone instanceof ccs.Bone) {
                var r = bone.getDisplayManager().getBoundingBox();
                if (first) {
                    minx = cc.rectGetMinX(r);
                    miny = cc.rectGetMinY(r);
                    maxx = cc.rectGetMaxX(r);
                    maxy = cc.rectGetMaxY(r);
                    first = false
                } else {
                    minx = cc.rectGetMinX(r) < cc.rectGetMinX(boundingBox) ? cc.rectGetMinX(r) : cc.rectGetMinX(boundingBox);
                    miny = cc.rectGetMinY(r) < cc.rectGetMinY(boundingBox) ?
                        cc.rectGetMinY(r) : cc.rectGetMinY(boundingBox);
                    maxx = cc.rectGetMaxX(r) > cc.rectGetMaxX(boundingBox) ? cc.rectGetMaxX(r) : cc.rectGetMaxX(boundingBox);
                    maxy = cc.rectGetMaxY(r) > cc.rectGetMaxY(boundingBox) ? cc.rectGetMaxY(r) : cc.rectGetMaxY(boundingBox)
                }
                boundingBox = cc.rect(minx, miny, maxx - minx, maxy - miny)
            }
        }
        return cc.RectApplyAffineTransform(boundingBox, this.nodeToParentTransform())
    }, getBoneAtPoint: function (x, y) {
        for (var i = this._children.length - 1; i >= 0; i--) {
            var child = this._children[i];
            if (child instanceof ccs.Bone)if (child.getDisplayManager().containPoint(x,
                y))return child
        }
        return null
    }, getTexureAtlasWithTexture: function () {
        return null
    }, setParentBone: function (parentBone) {
        this._parentBone = parentBone;
        for (var key in this._boneDic) {
            var bone = this._boneDic[key];
            bone.setArmature(this)
        }
    }, setColliderFilter: function (filter) {
        for (var key in this._boneDic) {
            var bone = this._boneDic[key];
            bone.setColliderFilter(filter)
        }
    }, drawContour: function () {
        cc._drawingUtil.setDrawColor(255, 255, 255, 255);
        cc._drawingUtil.setLineWidth(1);
        for (var key in this._boneDic) {
            var bone = this._boneDic[key];
            var bodyList = bone.getColliderBodyList();
            for (var i = 0; i < bodyList.length; i++) {
                var body = bodyList[i];
                var vertexList = body.getCalculatedVertexList();
                cc._drawingUtil.drawPoly(vertexList, vertexList.length, true)
            }
        }
    }, getParentBone: function () {
        return this._parentBone
    }, getAnimation: function () {
        return this.animation
    }, setAnimation: function (animation) {
        this.animation = animation
    }, getArmatureData: function () {
        return this.armatureData
    }, setArmatureData: function (armatureData) {
        this.armatureData = armatureData
    }, getName: function () {
        return this.name
    },
    setName: function (name) {
        this.name = name
    }, getBatchNode: function () {
        return this.batchNode
    }, setBatchNode: function (batchNode) {
        this.batchNode = batchNode
    }, getVersion: function () {
        return this.version
    }, setVersion: function (version) {
        this.version = version
    }, getArmatureTransformDirty: function () {
        return this._armatureTransformDirty
    }, getBody: function () {
        return this._body
    }, setBody: function (body) {
        if (this._body == body)return;
        this._body = body;
        this._body.data = this;
        var child, displayObject;
        for (var i = 0; i < this._children.length; i++) {
            child =
                this._children[i];
            if (child instanceof ccs.Bone) {
                var displayList = child.getDisplayManager().getDecorativeDisplayList();
                for (var j = 0; j < displayList.length; j++) {
                    displayObject = displayList[j];
                    var detector = displayObject.getColliderDetector();
                    if (detector)detector.setBody(this._body)
                }
            }
        }
    }, getShapeList: function () {
        if (this._body)return this._body.shapeList;
        return[]
    }});
if (cc._renderType == cc._RENDER_TYPE_WEBGL)ccs.Armature.prototype.nodeToParentTransform = ccs.Armature.prototype._nodeToParentTransformForWebGL; else ccs.Armature.prototype.nodeToParentTransform = ccs.Armature.prototype._nodeToParentTransformForCanvas;
var _p = ccs.Armature.prototype;
_p.parentBone;
cc.defineGetterSetter(_p, "parentBone", _p.getParentBone, _p.setParentBone);
_p.body;
cc.defineGetterSetter(_p, "body", _p.getBody, _p.setBody);
_p.colliderFilter;
cc.defineGetterSetter(_p, "colliderFilter", null, _p.setColliderFilter);
_p = null;
ccs.Armature.create = function (name, parentBone) {
    var armature = new ccs.Armature;
    if (armature && armature.init(name, parentBone))return armature;
    return null
};
ccs.Bone = ccs.NodeRGBA.extend({_boneData: null, _armature: null, _childArmature: null, displayManager: null, ignoreMovementBoneData: false, _tween: null, _tweenData: null, name: "", _childrenBone: null, parentBone: null, boneTransformDirty: false, _worldTransform: null, _blendFunc: 0, blendDirty: false, _worldInfo: null, _armatureParentBone: null, _dataVersion: 0, _className: "Bone", ctor: function () {
    cc.NodeRGBA.prototype.ctor.call(this);
    this._boneData = null;
    this._armature = null;
    this._childArmature = null;
    this.displayManager = null;
    this.ignoreMovementBoneData =
        false;
    this._tween = null;
    this._tweenData = null;
    this.name = "";
    this._childrenBone = [];
    this.parentBone = null;
    this.boneTransformDirty = true;
    this._worldTransform = cc.AffineTransformMake(1, 0, 0, 1, 0, 0);
    this._blendFunc = new cc.BlendFunc(cc.BLEND_SRC, cc.BLEND_DST);
    this.blendDirty = false
}, release: function () {
    CC_SAFE_RELEASE(this._tweenData);
    for (var i = 0; i < this._childrenBone.length; i++)CC_SAFE_RELEASE(this._childrenBone[i]);
    this._childrenBone = [];
    CC_SAFE_RELEASE(this._tween);
    CC_SAFE_RELEASE(this.displayManager);
    CC_SAFE_RELEASE(this._boneData);
    CC_SAFE_RELEASE(this._childArmature)
}, init: function (name) {
    cc.NodeRGBA.prototype.init.call(this);
    if (name)this.name = name;
    this._tweenData = new ccs.FrameData;
    this._tween = new ccs.Tween;
    this._tween.init(this);
    this.displayManager = new ccs.DisplayManager;
    this.displayManager.init(this);
    this._worldInfo = new ccs.BaseData;
    this._boneData = new ccs.BaseData;
    return true
}, setBoneData: function (boneData) {
    if (!boneData) {
        cc.log("boneData must not be null");
        return
    }
    this._boneData = boneData;
    this.name = this._boneData.name;
    this.setLocalZOrder(this._boneData.zOrder);
    this.displayManager.initDisplayList(boneData)
}, getBoneData: function () {
    return this._boneData
}, setArmature: function (armature) {
    this._armature = armature;
    if (armature) {
        this._tween.setAnimation(this._armature.getAnimation());
        this._dataVersion = this._armature.getArmatureData().dataVersion;
        this._armatureParentBone = this._armature.getParentBone()
    } else this._armatureParentBone = null
}, getArmature: function () {
    return this._armature
}, update: function (dt) {
    var locParentBone = this.parentBone;
    var locArmature = this._armature;
    var locTweenData = this._tweenData;
    var locWorldTransform = this._worldTransform;
    var locWorldInfo = this._worldInfo;
    var locArmatureParentBone = this._armatureParentBone;
    if (locParentBone)this.boneTransformDirty = this.boneTransformDirty || locParentBone.isTransformDirty();
    if (locArmatureParentBone && !this.boneTransformDirty)this.boneTransformDirty = locArmatureParentBone.isTransformDirty();
    if (this.boneTransformDirty) {
        if (this._dataVersion >= ccs.CONST_VERSION_COMBINED) {
            var locBoneData = this._boneData;
            locTweenData.x += locBoneData.x;
            locTweenData.y += locBoneData.y;
            locTweenData.skewX += locBoneData.skewX;
            locTweenData.skewY += locBoneData.skewY;
            locTweenData.scaleX += locBoneData.scaleX;
            locTweenData.scaleY += locBoneData.scaleY;
            locTweenData.scaleX -= 1;
            locTweenData.scaleY -= 1
        }
        locWorldInfo.x = locTweenData.x + this._position.x;
        locWorldInfo.y = locTweenData.y + this._position.y;
        locWorldInfo.scaleX = locTweenData.scaleX * this._scaleX;
        locWorldInfo.scaleY = locTweenData.scaleY * this._scaleY;
        locWorldInfo.skewX = locTweenData.skewX + this._skewX + this._rotationX;
        locWorldInfo.skewY =
            locTweenData.skewY + this._skewY - this._rotationY;
        if (this.parentBone)this.applyParentTransform(this.parentBone); else if (locArmatureParentBone)this.applyParentTransform(locArmatureParentBone);
        ccs.TransformHelp.nodeToMatrix(locWorldInfo, locWorldTransform);
        if (locArmatureParentBone)this._worldTransform = cc.AffineTransformConcat(locWorldTransform, locArmature.nodeToParentTransform())
    }
    ccs.DisplayFactory.updateDisplay(this, dt, this.boneTransformDirty || locArmature.getArmatureTransformDirty());
    var locChildrenBone =
        this._childrenBone;
    for (var i = 0; i < locChildrenBone.length; i++)locChildrenBone[i].update(dt);
    this.boneTransformDirty = false
}, applyParentTransform: function (parent) {
    var locWorldInfo = this._worldInfo;
    var locParentWorldTransform = parent._worldTransform;
    var locParentWorldInfo = parent._worldInfo;
    var x = locWorldInfo.x;
    var y = locWorldInfo.y;
    locWorldInfo.x = x * locParentWorldTransform.a + y * locParentWorldTransform.c + locParentWorldInfo.x;
    locWorldInfo.y = x * locParentWorldTransform.b + y * locParentWorldTransform.d + locParentWorldInfo.y;
    locWorldInfo.scaleX = locWorldInfo.scaleX * locParentWorldInfo.scaleX;
    locWorldInfo.scaleY = locWorldInfo.scaleY * locParentWorldInfo.scaleY;
    locWorldInfo.skewX = locWorldInfo.skewX + locParentWorldInfo.skewX;
    locWorldInfo.skewY = locWorldInfo.skewY + locParentWorldInfo.skewY
}, visit: function (ctx) {
    var node = this.getDisplayManager().getDisplayRenderNode();
    if (node)node.visit(ctx)
}, updateDisplayedColor: function (color) {
    this._realColor = cc.color(255, 255, 255);
    cc.NodeRGBA.prototype.updateDisplayedColor.call(this, color);
    this.updateColor()
},
    updateDisplayedOpacity: function (opacity) {
        this._realOpacity = 255;
        cc.NodeRGBA.prototype.updateDisplayedOpacity.call(this, opacity);
        this.updateColor()
    }, setColor: function (color) {
        cc.NodeRGBA.prototype.setColor.call(this, color);
        this.updateColor()
    }, setOpacity: function (opacity) {
        cc.NodeRGBA.prototype.setOpacity.call(this, opacity);
        this.updateColor()
    }, updateColor: function () {
        var display = this.displayManager.getDisplayRenderNode();
        if (display && display.RGBAProtocol) {
            var locDisplayedColor = this._displayedColor;
            var locTweenData =
                this._tweenData;
            var locOpacity = this._displayedOpacity * locTweenData.a / 255;
            var locColor = cc.color(locDisplayedColor.r * locTweenData.r / 255, locDisplayedColor.g * locTweenData.g / 255, locDisplayedColor.b * locTweenData.b / 255);
            display.setOpacity(locOpacity);
            display.setColor(locColor)
        }
    }, updateZOrder: function () {
        if (this._armature.getArmatureData().dataVersion >= ccs.CONST_VERSION_COMBINED) {
            var zorder = this._tweenData.zOrder + this._boneData.zOrder;
            this.setLocalZOrder(zorder)
        } else this.setLocalZOrder(this._tweenData.zOrder)
    },
    addChildBone: function (child) {
        if (!child) {
            cc.log("Argument must be non-nil");
            return
        }
        if (child.parentBone) {
            cc.log("child already added. It can't be added again");
            return
        }
        if (this._childrenBone.indexOf(child) < 0) {
            this._childrenBone.push(child);
            child.setParentBone(this)
        }
    }, removeChildBone: function (bone, recursion) {
        for (var i = 0; i < this._childrenBone.length; i++)if (this._childrenBone[i] == bone) {
            if (recursion) {
                var ccbones = bone._childrenBone;
                for (var j = 0; j < ccbones.length; j++)bone.removeChildBone(ccbones[j], recursion)
            }
            bone.setParentBone(null);
            bone.displayManager.setCurrentDecorativeDisplay(null);
            cc.arrayRemoveObject(this._childrenBone, bone)
        }
    }, removeFromParent: function (recursion) {
        if (this.parentBone)this.parentBone.removeChildBone(this, recursion)
    }, setParentBone: function (parent) {
        this.parentBone = parent
    }, getParentBone: function () {
        return this.parentBone
    }, setChildArmature: function (armature) {
        if (this._childArmature != armature) {
            if (armature == null && this._childArmature)this._childArmature.setParentBone(null);
            this._childArmature = armature
        }
    }, getChildArmature: function () {
        return this._childArmature
    },
    getChildrenBone: function () {
        return this._childrenBone
    }, getTween: function () {
        return this._tween
    }, setLocalZOrder: function (zOrder) {
        if (this._zOrder != zOrder)cc.Node.prototype.setLocalZOrder.call(this, zOrder)
    }, setTransformDirty: function (dirty) {
        this.boneTransformDirty = dirty
    }, isTransformDirty: function () {
        return this.boneTransformDirty
    }, nodeToArmatureTransform: function () {
        return this._worldTransform
    }, nodeToWorldTransform: function () {
        return cc.AffineTransformConcat(this._worldTransform, this._armature.nodeToWorldTransform())
    },
    getDisplayRenderNode: function () {
        return this.displayManager.getDisplayRenderNode()
    }, getDisplayRenderNodeType: function () {
        return this.displayManager.getDisplayRenderNodeType()
    }, addDisplay: function (displayData, index) {
        index = index || 0;
        return this.displayManager.addDisplay(displayData, index)
    }, removeDisplay: function (index) {
        this.displayManager.removeDisplay(index)
    }, addSkin: function (skin, index) {
        index = index || 0;
        return this.displayManager.addSkin(skin, index)
    }, changeDisplayByIndex: function (index, force) {
        cc.log("changeDisplayByIndex is deprecated. Use changeDisplayWithIndex instead.");
        this.changeDisplayWithIndex(index, force)
    }, changeDisplayWithIndex: function (index, force) {
        this.displayManager.changeDisplayWithIndex(index, force)
    }, changeDisplayWithName: function (name, force) {
        this.displayManager.changeDisplayWithName(name, force)
    }, getColliderBodyList: function () {
        var decoDisplay = this.displayManager.getCurrentDecorativeDisplay();
        if (decoDisplay) {
            var detector = decoDisplay.getColliderDetector();
            if (detector)return detector.getColliderBodyList()
        }
        return[]
    }, setColliderFilter: function (filter) {
        var displayList =
            this.displayManager.getDecorativeDisplayList();
        for (var i = 0; i < displayList.length; i++) {
            var locDecoDisplay = displayList[i];
            var locDetector = locDecoDisplay.getColliderDetector();
            if (locDetector)locDetector.setColliderFilter(filter)
        }
    }, getColliderFilter: function () {
        var decoDisplay = this.displayManager.getCurrentDecorativeDisplay();
        if (decoDisplay) {
            var detector = decoDisplay.getColliderDetector();
            if (detector)return detector.getColliderFilter()
        }
        return null
    }, setDisplayManager: function (displayManager) {
        this.displayManager =
            displayManager
    }, getDisplayManager: function () {
        return this.displayManager
    }, setIgnoreMovementBoneData: function (bool) {
        this.ignoreMovementBoneData = bool
    }, getIgnoreMovementBoneData: function () {
        return this.ignoreMovementBoneData
    }, getTweenData: function () {
        return this._tweenData
    }, setName: function (name) {
        this.name = name
    }, getName: function () {
        return this.name
    }, setBlendFunc: function (blendFunc) {
        if (this._blendFunc.src != blendFunc.src || this._blendFunc.dst != blendFunc.dst) {
            this._blendFunc = blendFunc;
            this.blendDirty = true
        }
    },
    getBlendFunc: function () {
        return this._blendFunc
    }, setBlendDirty: function (dirty) {
        this.blendDirty = dirty
    }, isBlendDirty: function () {
        return this.blendDirty
    }});
var _p = ccs.Bone.prototype;
_p.boneData;
cc.defineGetterSetter(_p, "boneData", _p.getBoneData, _p.setBoneData);
_p.armature;
cc.defineGetterSetter(_p, "armature", _p.getArmature, _p.setArmature);
_p.childArmature;
cc.defineGetterSetter(_p, "childArmature", _p.getChildArmature, _p.setChildArmature);
_p.childrenBone;
cc.defineGetterSetter(_p, "childrenBone", _p.getChildrenBone);
_p.tween;
cc.defineGetterSetter(_p, "tween", _p.getTween);
_p.tweenData;
cc.defineGetterSetter(_p, "tweenData", _p.getTweenData);
_p.colliderFilter;
cc.defineGetterSetter(_p, "colliderFilter", _p.getColliderFilter, _p.setColliderFilter);
_p = null;
ccs.Bone.create = function (name) {
    var bone = new ccs.Bone;
    if (bone && bone.init(name))return bone;
    return null
};
ccs.FRAME_TYPE_MOVE = 0;
ccs.FRAME_TYPE_SCALE = 1;
ccs.FRAME_TYPE_ROTATE = 2;
ccs.FRAME_TYPE_TINT = 3;
ccs.FRAME_TYPE_FADE = 4;
ccs.FRAME_TYPE_MAX = 5;
ccs.ActionFrame = ccs.Class.extend({frameType: 0, easingType: 0, frameIndex: 0, time: 0, ctor: function () {
    this.frameType = 0;
    this.easingType = 0;
    this.frameIndex = 0;
    this.time = 0
}, getAction: function (duration) {
    return null
}});
ccs.ActionMoveFrame = ccs.ActionFrame.extend({_position: null, ctor: function () {
    ccs.ActionFrame.prototype.ctor.call(this);
    this._position = cc.p(0, 0);
    this.frameType = ccs.FRAME_TYPE_MOVE
}, setPosition: function (pos, y) {
    if (y === undefined) {
        this._position.x = pos.x;
        this._position.y = pos.y
    } else {
        this._position.x = pos;
        this._position.y = y
    }
}, getPosition: function () {
    return this._position
}, getAction: function (duration) {
    return cc.MoveTo.create(duration, this._position)
}});
ccs.ActionScaleFrame = ccs.ActionFrame.extend({_scaleX: 1, _scaleY: 1, ctor: function () {
    ccs.ActionFrame.prototype.ctor.call(this);
    this._scaleX = 1;
    this._scaleY = 1;
    this.frameType = ccs.FRAME_TYPE_SCALE
}, setScaleX: function (scaleX) {
    this._scaleX = scaleX
}, getScaleX: function () {
    return this._scaleX
}, setScaleY: function (scaleY) {
    this._scaleY = scaleY
}, getScaleY: function () {
    return this._scaleY
}, getAction: function (duration) {
    return cc.ScaleTo.create(duration, this._scaleX, this._scaleY)
}});
ccs.ActionRotationFrame = ccs.ActionFrame.extend({_rotation: 0, ctor: function () {
    ccs.ActionFrame.prototype.ctor.call(this);
    this._rotation = 0;
    this.frameType = ccs.FRAME_TYPE_ROTATE
}, setRotation: function (rotation) {
    this._rotation = rotation
}, getRotation: function () {
    return this._rotation
}, getAction: function (duration) {
    return cc.RotateTo.create(duration, this._rotation)
}});
ccs.ActionFadeFrame = ccs.ActionFrame.extend({_opacity: 255, ctor: function () {
    ccs.ActionFrame.prototype.ctor.call(this);
    this._opacity = 255;
    this.frameType = ccs.FRAME_TYPE_FADE
}, setOpacity: function (opacity) {
    this._opacity = opacity
}, getOpacity: function () {
    return this._opacity
}, getAction: function (duration) {
    return cc.FadeTo.create(duration, this._opacity)
}});
ccs.ActionTintFrame = ccs.ActionFrame.extend({_color: null, ctor: function () {
    ccs.ActionFrame.prototype.ctor.call(this);
    this._color = cc.color(255, 255, 255, 255);
    this.frameType = ccs.FRAME_TYPE_TINT
}, setColor: function (color) {
    var locColor = this._color;
    locColor.r = color.r;
    locColor.g = color.g;
    locColor.b = color.b
}, getColor: function () {
    var locColor = this._color;
    return cc.color(locColor.r, locColor.g, locColor.b, locColor.a)
}, getAction: function (duration) {
    return cc.TintTo.create(duration, this._color.r, this._color.g, this._color.b)
}});
ccs.actionManager = {_actionDic: {}, initWithDictionary: function (jsonName, dic, root) {
    var path = jsonName;
    var pos = path.lastIndexOf("/");
    var fileName = path.substr(pos + 1, path.length);
    var actionList = dic["actionlist"];
    var locActionList = [];
    for (var i = 0; i < actionList.length; i++) {
        var locAction = new ccs.ActionObject;
        var locActionDic = actionList[i];
        locAction.initWithDictionary(locActionDic, root);
        locActionList.push(locAction)
    }
    this._actionDic[fileName] = locActionList
}, getActionByName: function (jsonName, actionName) {
    var actionList =
        this._actionDic[jsonName];
    if (!actionList)return null;
    for (var i = 0; i < actionList.length; i++) {
        var locAction = actionList[i];
        if (actionName == locAction.getName())return locAction
    }
    return null
}, playActionByName: function (jsonName, actionName, fun) {
    var action = this.getActionByName(jsonName, actionName);
    if (action)action.play(fun)
}, releaseActions: function () {
    this._actionDic = {}
}, clear: function () {
    this._actionDic = {}
}};
ccs.ActionNode = ccs.Class.extend({_currentFrameIndex: 0, _destFrameIndex: 0, _unitTime: 0, _actionTag: 0, _bject: null, _actionSpawn: null, _action: null, _frameArray: null, _frameArrayNum: 0, ctor: function () {
    this._currentFrameIndex = 0;
    this._destFrameIndex = 0;
    this._unitTime = 0.1;
    this._actionTag = 0;
    this._bject = null;
    this._actionSpawn = null;
    this._action = null;
    this._frameArray = [];
    this._frameArrayNum = ccs.FRAME_TYPE_MAX;
    for (var i = 0; i < this._frameArrayNum; i++)this._frameArray.push([])
}, initWithDictionary: function (dic, root) {
    this.setActionTag(dic["ActionTag"]);
    var actionframelist = dic["actionframelist"];
    for (var i = 0; i < actionframelist.length; i++) {
        var actionFrameDic = actionframelist[i];
        var frameInex = actionFrameDic["frameid"];
        if (actionFrameDic["positionx"] !== undefined) {
            var positionX = actionFrameDic["positionx"];
            var positionY = actionFrameDic["positiony"];
            var actionFrame = new ccs.ActionMoveFrame;
            actionFrame.frameIndex = frameInex;
            actionFrame.setPosition(positionX, positionY);
            var actionArray = this._frameArray[ccs.FRAME_TYPE_MOVE];
            actionArray.push(actionFrame)
        }
        if (actionFrameDic["scalex"] !==
            undefined) {
            var scaleX = actionFrameDic["scalex"];
            var scaleY = actionFrameDic["scaley"];
            var actionFrame = new ccs.ActionScaleFrame;
            actionFrame.frameIndex = frameInex;
            actionFrame.setScaleX(scaleX);
            actionFrame.setScaleY(scaleY);
            var actionArray = this._frameArray[ccs.FRAME_TYPE_SCALE];
            actionArray.push(actionFrame)
        }
        if (actionFrameDic["rotation"] !== undefined) {
            var rotation = actionFrameDic["rotation"];
            var actionFrame = new ccs.ActionRotationFrame;
            actionFrame.frameIndex = frameInex;
            actionFrame.setRotation(rotation);
            var actionArray =
                this._frameArray[ccs.FRAME_TYPE_ROTATE];
            actionArray.push(actionFrame)
        }
        if (actionFrameDic["opacity"] !== undefined) {
            var opacity = actionFrameDic["opacity"];
            var actionFrame = new ccs.ActionFadeFrame;
            actionFrame.frameIndex = frameInex;
            actionFrame.setOpacity(opacity);
            var actionArray = this._frameArray[ccs.FRAME_TYPE_FADE];
            actionArray.push(actionFrame)
        }
        if (actionFrameDic["colorr"] !== undefined) {
            var colorR = actionFrameDic["colorr"];
            var colorG = actionFrameDic["colorg"];
            var colorB = actionFrameDic["colorb"];
            var actionFrame =
                new ccs.ActionTintFrame;
            actionFrame.frameIndex = frameInex;
            actionFrame.setColor(cc.color(colorR, colorG, colorB));
            var actionArray = this._frameArray[ccs.FRAME_TYPE_TINT];
            actionArray.push(actionFrame)
        }
        actionFrameDic = null
    }
    this.initActionNodeFromRoot(root)
}, initActionNodeFromRoot: function (root) {
    if (root instanceof ccui.Widget) {
        var widget = ccui.helper.seekActionWidgetByActionTag(root, this.getActionTag());
        if (widget)this.setObject(widget)
    }
}, setUnitTime: function (time) {
    this._unitTime = time;
    this.refreshActionProperty()
},
    getUnitTime: function () {
        return this._unitTime
    }, setActionTag: function (tag) {
        this._actionTag = tag
    }, getActionTag: function () {
        return this._actionTag
    }, setObject: function (node) {
        this._object = node
    }, getObject: function () {
        return this._object
    }, getActionNode: function () {
        if (this._object instanceof cc.Node)return this._object; else if (this._object instanceof ccui.Widget)return this._object;
        return null
    }, insertFrame: function (index, frame) {
        if (frame == null)return;
        var frameType = frame.frameType;
        var array = this._frameArray[frameType];
        array.splice(index, 0, frame)
    }, addFrame: function (frame) {
        if (!frame)return;
        var frameType = frame.frameType;
        var array = this._frameArray[frameType];
        array.push(frame)
    }, deleteFrame: function (frame) {
        if (frame == null)return;
        var frameType = frame.frameType;
        var array = this._frameArray[frameType];
        cc.arrayRemoveObject(array, frame)
    }, clearAllFrame: function () {
        for (var i = 0; i < this._frameArrayNum; i++)this._frameArray[i] = []
    }, refreshActionProperty: function () {
        if (this._object == null)return null;
        var locSpawnArray = [];
        for (var i = 0; i < this._frameArrayNum; i++) {
            var locArray =
                this._frameArray[i];
            if (locArray.length <= 0)continue;
            var locSequenceArray = [];
            for (var j = 0; j < locArray.length; j++) {
                var locFrame = locArray[j];
                if (j != 0) {
                    var locSrcFrame = locArray[j - 1];
                    var locDuration = (locFrame.frameIndex - locSrcFrame.frameIndex) * this.getUnitTime();
                    var locAction = locFrame.getAction(locDuration);
                    locSequenceArray.push(locAction)
                }
            }
            var locSequence = cc.Sequence.create(locSequenceArray);
            if (locSequence != null)locSpawnArray.push(locSequence)
        }
        this._action = null;
        this._actionSpawn = cc.Spawn.create(locSpawnArray);
        return this._actionSpawn
    }, playAction: function (fun) {
        if (this._object == null || this._actionSpawn == null)return;
        if (fun)this._action = cc.Sequence.create(this._actionSpawn, fun); else this._action = cc.Sequence.create(this._actionSpawn);
        this.runAction()
    }, runAction: function () {
        var node = this.getActionNode();
        if (node != null && this._action != null)node.runAction(this._action)
    }, stopAction: function () {
        var node = this.getActionNode();
        if (node != null && this._action != null)if (!this._action.isDone())node.stopAction(this._action)
    }, getFirstFrameIndex: function () {
        var locFrameindex =
            99999;
        var locIsFindFrame = false;
        for (var i = 0; i < this._frameArrayNum; i++) {
            var locArray = this._frameArray[i];
            if (locArray.length <= 0)continue;
            locIsFindFrame = true;
            var locFrame = locArray[0];
            var locFrameIndex = locFrame.frameIndex;
            locFrameindex = locFrameindex > locFrameIndex ? locFrameIndex : locFrameindex
        }
        if (!locIsFindFrame)locFrameindex = 0;
        return locFrameindex
    }, getLastFrameIndex: function () {
        var locFrameindex = -1;
        var locIsFindFrame = false;
        for (var i = 0; i < this._frameArrayNum; i++) {
            var locArray = this._frameArray[i];
            if (locArray.length <=
                0)continue;
            locIsFindFrame = true;
            var locFrame = locArray[locArray.length - 1];
            var locFrameIndex = locFrame.frameIndex;
            locFrameindex = locFrameindex < locFrameIndex ? locFrameIndex : locFrameindex
        }
        if (!locIsFindFrame)locFrameindex = 0;
        return locFrameindex
    }, updateActionToTimeLine: function (time) {
        var locIsFindFrame = false;
        var locUnitTime = this.getUnitTime();
        for (var i = 0; i < this._frameArrayNum; i++) {
            var locArray = this._frameArray[i];
            if (locArray == null)continue;
            for (var j = 0; j < locArray.length; j++) {
                var locFrame = locArray[j];
                if (locFrame.frameIndex *
                    locUnitTime == time) {
                    this.easingToFrame(1, 1, locFrame);
                    locIsFindFrame = true;
                    break
                } else if (locFrame.frameIndex * locUnitTime > time) {
                    if (j == 0) {
                        this.easingToFrame(1, 1, locFrame);
                        locIsFindFrame = false
                    } else {
                        var locSrcFrame = locArray[j - 1];
                        var locDuration = (locFrame.frameIndex - locSrcFrame.frameIndex) * locUnitTime;
                        var locDelaytime = time - locSrcFrame.frameIndex * locUnitTime;
                        this.easingToFrame(locDuration, 1, locSrcFrame);
                        this.easingToFrame(locDuration, locDelaytime / locDuration, locFrame);
                        locIsFindFrame = true
                    }
                    break
                }
            }
        }
        return locIsFindFrame
    },
    easingToFrame: function (duration, delayTime, destFrame) {
        var action = destFrame.getAction(duration);
        var node = this.getActionNode();
        if (action == null || node == null)return;
        action.startWithTarget(node);
        action.update(delayTime)
    }, isActionDoneOnce: function () {
        if (this._action == null)return true;
        return this._action.isDone()
    }});
ccs.ActionObject = ccs.Class.extend({_actionNodeList: null, _name: "", _loop: false, _pause: false, _playing: false, _unitTime: 0, _currentTime: 0, _scheduler: null, ctor: function () {
    this._actionNodeList = [];
    this._name = "";
    this._loop = false;
    this._pause = false;
    this._playing = false;
    this._unitTime = 0.1;
    this._currentTime = 0;
    this._scheduler = new cc.Scheduler;
    cc.director.getScheduler().scheduleUpdateForTarget(this._scheduler, 0, false)
}, setName: function (name) {
    this._name = name
}, getName: function () {
    return this._name
}, setLoop: function (loop) {
    this._loop =
        loop
}, getLoop: function () {
    return this._loop
}, setUnitTime: function (time) {
    this._unitTime = time;
    var frameNum = this._actionNodeList.length;
    for (var i = 0; i < frameNum; i++) {
        var locActionNode = this._actionNodeList[i];
        locActionNode.setUnitTime(this._unitTime)
    }
}, getUnitTime: function () {
    return this._unitTime
}, getCurrentTime: function () {
    return this._currentTime
}, setCurrentTime: function (time) {
    this._currentTime = time
}, isPlaying: function () {
    return this._playing
}, initWithDictionary: function (dic, root) {
    this.setName(dic["name"]);
    this.setLoop(dic["loop"]);
    this.setUnitTime(dic["unittime"]);
    var actionNodeList = dic["actionnodelist"];
    for (var i = 0; i < actionNodeList.length; i++) {
        var locActionNode = new ccs.ActionNode;
        var locActionNodeDic = actionNodeList[i];
        locActionNode.initWithDictionary(locActionNodeDic, root);
        locActionNode.setUnitTime(this.getUnitTime());
        this._actionNodeList.push(locActionNode);
        locActionNodeDic = null
    }
}, addActionNode: function (node) {
    if (!node)return;
    this._actionNodeList.push(node);
    node.setUnitTime(this._unitTime)
}, removeActionNode: function (node) {
    if (node ==
        null)return;
    cc.arrayRemoveObject(this._actionNodeList, node)
}, play: function (fun) {
    this.stop();
    this.updateToFrameByTime(0);
    var frameNum = this._actionNodeList.length;
    for (var i = 0; i < frameNum; i++) {
        var locActionNode = this._actionNodeList[i];
        locActionNode.playAction(fun)
    }
    if (this._loop)this._scheduler.scheduleCallbackForTarget(this, this.simulationActionUpdate, 0, cc.REPEAT_FOREVER, 0, false)
}, pause: function () {
    this._pause = true
}, stop: function () {
    for (var i = 0; i < this._actionNodeList.length; i++) {
        var locActionNode = this._actionNodeList[i];
        locActionNode.stopAction()
    }
    this._scheduler.unscheduleCallbackForTarget(this, this.simulationActionUpdate);
    this._pause = false
}, updateToFrameByTime: function (time) {
    this._currentTime = time;
    for (var i = 0; i < this._actionNodeList.length; i++) {
        var locActionNode = this._actionNodeList[i];
        locActionNode.updateActionToTimeLine(time)
    }
}, simulationActionUpdate: function (dt) {
    if (this._loop) {
        var isEnd = true;
        var actionNodeList = this._actionNodeList;
        for (var i = 0; i < actionNodeList.length; i++) {
            var actionNode = actionNodeList[i];
            if (actionNode.isActionDoneOnce() ==
                false) {
                isEnd = false;
                break
            }
        }
        if (isEnd)this.play()
    }
}});
ccs.ComAttribute = ccs.Component.extend({_jsonDict: null, _filePath: "", ctor: function () {
    cc.Component.prototype.ctor.call(this);
    this._jsonDict = {};
    this._filePath = "";
    this._name = "CCComAttribute"
}, init: function () {
    this._jsonDict = {};
    return true
}, setInt: function (key, value) {
    if (!key) {
        cc.log("Argument must be non-nil");
        return
    }
    this._jsonDict[key] = value
}, setDouble: function (key, value) {
    if (!key) {
        cc.log("Argument must be non-nil");
        return
    }
    this._jsonDict[key] = value
}, setFloat: function (key, value) {
    if (!key) {
        cc.log("Argument must be non-nil");
        return
    }
    this._jsonDict[key] = value
}, setBool: function (key, value) {
    if (!key) {
        cc.log("Argument must be non-nil");
        return
    }
    this._jsonDict[key] = value
}, setString: function (key, value) {
    if (!key) {
        cc.log("Argument must be non-nil");
        return
    }
    this._jsonDict[key] = value
}, setObject: function (key, value) {
    if (!key) {
        cc.log("Argument must be non-nil");
        return
    }
    this._jsonDict[key] = value
}, getInt: function (key) {
    var ret = this._jsonDict[key];
    return parseInt(ret || 0)
}, getDouble: function (key) {
    var ret = this._jsonDict[key];
    return parseFloat(ret ||
        0)
}, getFloat: function (key) {
    var ret = this._jsonDict[key];
    return parseFloat(ret || 0)
}, getBool: function (key) {
    var ret = this._jsonDict[key];
    return Boolean(ret || false)
}, getString: function (key) {
    var ret = this._jsonDict[key];
    return ret || ""
}, getObject: function (key) {
    return this._jsonDict[key]
}, parse: function (path) {
    this._jsonDict = cc.loader.getRes(path)
}});
ccs.ComAttribute.create = function () {
    var com = new ccs.ComAttribute;
    if (com && com.init())return com;
    return null
};
ccs.ComAudio = ccs.Component.extend({_filePath: "", _loop: false, ctor: function () {
    cc.Component.prototype.ctor.call(this);
    this._name = "Audio"
}, init: function () {
    return true
}, onEnter: function () {
}, onExit: function () {
    this.stopBackgroundMusic(true);
    this.stopAllEffects()
}, end: function () {
    cc.audioEngine.end()
}, preloadBackgroundMusic: function (pszFilePath) {
    cc.loader.load(pszFilePath)
}, playBackgroundMusic: function (pszFilePath, loop) {
    if (pszFilePath)cc.audioEngine.playMusic(pszFilePath, loop); else cc.audioEngine.playMusic(this._filePath,
        this._loop)
}, stopBackgroundMusic: function (releaseData) {
    cc.audioEngine.stopMusic(releaseData)
}, pauseBackgroundMusic: function () {
    cc.audioEngine.pauseMusic()
}, resumeBackgroundMusic: function () {
    cc.audioEngine.resumeMusic()
}, rewindBackgroundMusic: function () {
    cc.audioEngine.rewindMusic()
}, willPlayBackgroundMusic: function () {
    return cc.audioEngine.willPlayMusic()
}, isBackgroundMusicPlaying: function () {
    return cc.audioEngine.isMusicPlaying()
}, getBackgroundMusicVolume: function () {
    return cc.audioEngine.getMusicVolume()
},
    setBackgroundMusicVolume: function (volume) {
        cc.audioEngine.setMusicVolume(volume)
    }, getEffectsVolume: function () {
        return cc.audioEngine.getEffectsVolume()
    }, setEffectsVolume: function (volume) {
        cc.audioEngine.setEffectsVolume(volume)
    }, playEffect: function (pszFilePath, loop) {
        if (pszFilePath)return cc.audioEngine.playEffect(pszFilePath, loop); else return cc.audioEngine.playEffect(this._filePath, this._loop)
    }, pauseEffect: function (soundId) {
        cc.audioEngine.pauseEffect(soundId)
    }, pauseAllEffects: function () {
        cc.audioEngine.pauseAllEffects()
    },
    resumeEffect: function (soundId) {
        cc.audioEngine.resumeEffect(soundId)
    }, resumeAllEffects: function () {
        cc.audioEngine.resumeAllEffects()
    }, stopEffect: function (soundId) {
        cc.audioEngine.stopEffect(soundId)
    }, stopAllEffects: function () {
        cc.audioEngine.stopAllEffects()
    }, preloadEffect: function (pszFilePath) {
        cc.loader.getRes(pszFilePath);
        this.setFile(pszFilePath);
        this.setLoop(false)
    }, unloadEffect: function (pszFilePath) {
        cc.audioEngine.unloadEffect(pszFilePath)
    }, setFile: function (pszFilePath) {
        this._filePath = pszFilePath
    },
    setLoop: function (loop) {
        this._loop = loop
    }, getFile: function () {
        return this._filePath
    }, isLoop: function () {
        return this._loop
    }});
ccs.ComAudio.create = function () {
    var com = new ccs.ComAudio;
    if (com && com.init())return com;
    return null
};
ccs.ComController = ccs.Component.extend({ctor: function () {
    cc.Component.prototype.ctor.call(this);
    this._name = "ComController"
}, init: function () {
    return true
}, onEnter: function () {
}, onExit: function () {
}, update: function (dt) {
}, isEnabled: function () {
    return this._enabled
}, setEnabled: function (bool) {
    this._enabled = b
}});
ccs.ComController.create = function () {
    var com = new ccs.ComController;
    if (com && com.init())return com;
    return null
};
ccs.ComRender = ccs.Component.extend({_render: null, ctor: function (node, comName) {
    cc.Component.prototype.ctor.call(this);
    this._render = node;
    this._name = comName
}, onEnter: function () {
    if (this._owner)this._owner.addChild(this._render)
}, onExit: function () {
    if (this._owner) {
        this._owner.removeChild(this._render, true);
        this._render = null
    }
}, getNode: function () {
    return this._render
}, setNode: function (node) {
    this._render = node
}});
ccs.ComRender.create = function (node, comName) {
    var com = new ccs.ComRender(node, comName);
    if (com && com.init())return com;
    return null
};
ccs.objectFactory = {_typeMap: {}, destroyInstance: function () {
    this._instance = null
}, createObject: function (className) {
    var o = null;
    var t = this._typeMap[className];
    if (t)o = new t._fun;
    return o
}, registerType: function (t) {
    this._typeMap[t._className] = t
}};
ccs.TInfo = ccs.Class.extend({_className: "", _fun: null, ctor: function (c, f) {
    if (f) {
        this._className = c;
        this._fun = f
    } else {
        this._className = c._className;
        this._fun = c._fun
    }
    ccs.objectFactory.registerType(this)
}});
ccs.sendEvent = function (event) {
    var triggerObjArr = ccs.triggerManager.get(event);
    if (triggerObjArr == null)return;
    for (var i = 0; i < triggerObjArr.length; i++) {
        var triObj = triggerObjArr[i];
        if (triObj != null && triObj.detect())triObj.done()
    }
};
ccs.registerTriggerClass = function (className, func) {
    new ccs.TInfo(className, func)
};
ccs.triggerManager = {_eventTriggers: {}, _triggerObjs: {}, _movementDispatches: [], destroyInstance: function () {
    this.removeAll();
    this._instance = null
}, parse: function (triggers) {
    for (var i = 0; i < triggers.length; ++i) {
        var subDict = triggers[i];
        var triggerObj = ccs.TriggerObj.create();
        triggerObj.serialize(subDict);
        var events = triggerObj.getEvents();
        for (var j = 0; j < events.length; j++) {
            var event = events[j];
            this.add(event, triggerObj)
        }
        this._triggerObjs[triggerObj.getId()] = triggerObj
    }
}, get: function (event) {
    return this._eventTriggers[event]
},
    getTriggerObj: function (id) {
        return this._triggerObjs[id]
    }, add: function (event, triggerObj) {
        var eventTriggers = this._eventTriggers[event];
        if (!eventTriggers)eventTriggers = [];
        if (eventTriggers.indexOf(triggerObj) == -1) {
            eventTriggers.push(triggerObj);
            this._eventTriggers[event] = eventTriggers
        }
    }, removeAll: function () {
        for (var key in this._eventTriggers) {
            var triObjArr = this._eventTriggers[key];
            for (var j = 0; j < triObjArr.length; j++) {
                var obj = triObjArr[j];
                obj.removeAll()
            }
        }
        this._eventTriggers = {}
    }, remove: function (event, Obj) {
        if (Obj)return this._removeObj(event,
            Obj);
        var bRet = false;
        do {
            var triObjects = this._eventTriggers[event];
            if (!triObjects)break;
            for (var i = 0; i < triObjects.length; i++) {
                var triObject = triObjects[i];
                if (triObject)triObject.removeAll()
            }
            delete this._eventTriggers[event];
            bRet = true
        } while (0);
        return bRet
    }, _removeObj: function (event, Obj) {
        var bRet = false;
        do {
            var triObjects = this._eventTriggers[event];
            if (!triObjects)break;
            for (var i = 0; i < triObjects.length; i++) {
                var triObject = triObjects[i];
                if (triObject && triObject == Obj) {
                    triObject.removeAll();
                    triObjects.splice(i,
                        1);
                    break
                }
            }
            bRet = true
        } while (0);
        return bRet
    }, removeTriggerObj: function (id) {
        var obj = this.getTriggerObj(id);
        if (!obj)return false;
        var events = obj.getEvents();
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            this.remove(event, obj)
        }
        return true
    }, isEmpty: function () {
        return!this._eventTriggers || this._eventTriggers.length <= 0
    }, addArmatureMovementCallBack: function (armature, callFunc, target) {
        if (armature == null || target == null || callFunc == null)return;
        var locAmd, hasADD = false;
        for (var i = 0; i < this._movementDispatches.length; i++) {
            locAmd =
                this._movementDispatches[i];
            if (locAmd && locAmd[0] == armature) {
                locAmd.addAnimationEventCallBack(callFunc, target);
                hasADD = true
            }
        }
        if (!hasADD) {
            var newAmd = new ccs.ArmatureMovementDispatcher;
            armature.getAnimation().setMovementEventCallFunc(newAmd.animationEvent, newAmd);
            newAmd.addAnimationEventCallBack(callFunc, target);
            this._movementDispatches.push([armature, newAmd])
        }
    }, removeArmatureMovementCallBack: function (armature, target, callFunc) {
        if (armature == null || target == null || callFunc == null)return;
        var locAmd;
        for (var i =
            0; i < this._movementDispatches.length; i++) {
            locAmd = this._movementDispatches[i];
            if (locAmd && locAmd[0] == armature)locAmd.removeAnimationEventCallBack(callFunc, target)
        }
    }, removeArmatureAllMovementCallBack: function (armature) {
        if (armature == null)return;
        var locAmd;
        for (var i = 0; i < this._movementDispatches.length; i++) {
            locAmd = this._movementDispatches[i];
            if (locAmd && locAmd[0] == armature) {
                this._movementDispatches.splice(i, 1);
                break
            }
        }
    }, removeAllArmatureMovementCallBack: function () {
        this._movementDispatches = []
    }, version: function () {
        return"1.2.0.0"
    }};
ccs.ArmatureMovementDispatcher = ccs.Class.extend({_mapEventAnimation: null, ctor: function () {
    this._mapEventAnimation = []
}, animationEvent: function (armature, movementType, movementID) {
    var locEventAni, locTarget, locFunc;
    for (var i = 0; i < this._mapEventAnimation.length; i++) {
        locEventAni = this._mapEventAnimation[i];
        locTarget = locEventAni[0];
        locFunc = locEventAni[1];
        if (locFunc)locFunc.call(locTarget, armature, movementType, movementID)
    }
}, addAnimationEventCallBack: function (callFunc, target) {
    this._mapEventAnimation.push([target,
        callFunc])
}, removeAnimationEventCallBack: function (callFunc, target) {
    var locEventAni;
    for (var i = 0; i < this._mapEventAnimation.length; i++) {
        locEventAni = this._mapEventAnimation[i];
        if (locEventAni[0] == target)this._mapEventAnimation.splice(i, 1)
    }
}});
ccs.BaseTriggerCondition = ccs.Class.extend({ctor: function () {
}, init: function () {
    return true
}, detect: function () {
    return true
}, serialize: function (jsonVal) {
}, removeAll: function () {
}});
ccs.BaseTriggerAction = ccs.Class.extend({ctor: function () {
}, init: function () {
    return true
}, done: function () {
}, serialize: function (jsonVal) {
}, removeAll: function () {
}});
ccs.TriggerObj = ccs.Class.extend({_cons: null, _acts: null, _id: 0, _enable: true, _vInt: null, ctor: function () {
    this._id = 0;
    this._enable = true
}, init: function () {
    this._cons = [];
    this._acts = [];
    this._vInt = [];
    return true
}, detect: function () {
    if (!this._enable || this._cons.length == 0)return true;
    var ret = true;
    var obj = null;
    for (var i = 0; i < this._cons.length; i++) {
        obj = this._cons[i];
        if (obj && obj.detect)ret = ret && obj.detect()
    }
    return ret
}, done: function () {
    if (!this._enable || this._acts.length == 0)return;
    var obj;
    for (var i = 0; i < this._acts.length; i++) {
        obj =
            this._acts[i];
        if (obj && obj.done)obj.done()
    }
}, removeAll: function () {
    var obj = null;
    for (var i = 0; i < this._cons.length; i++) {
        obj = this._cons[i];
        if (obj)obj.removeAll()
    }
    this._cons = [];
    for (var i = 0; i < this._acts.length; i++) {
        obj = this._acts[i];
        if (obj)obj.removeAll()
    }
    this._acts = []
}, serialize: function (jsonVal) {
    this._id = jsonVal["id"] || 0;
    var conditions = jsonVal["conditions"] || [];
    for (var i = 0; i < conditions.length; i++) {
        var subDict = conditions[i];
        var classname = subDict["classname"];
        var con = ccs.objectFactory.createObject(classname);
        if (!con) {
            cc.log("class named classname(" + classname + ") can not implement!");
            continue
        }
        con.serialize(subDict);
        con.init();
        this._cons.push(con)
    }
    var actions = jsonVal["actions"] || [];
    for (var i = 0; i < actions.length; i++) {
        var subDict = actions[i];
        var classname = subDict["classname"];
        var act = ccs.objectFactory.createObject(classname);
        if (!act) {
            cc.log("class named classname(" + classname + ") can not implement!");
            continue
        }
        act.serialize(subDict);
        act.init();
        this._acts.push(act)
    }
    var events = jsonVal["events"] || [];
    for (var i = 0; i <
        events.length; i++) {
        var subDict = events[i];
        var event = subDict["id"];
        if (event < 0)continue;
        this._vInt.push(event)
    }
}, getId: function () {
    return this._id
}, setEnable: function (enable) {
    this._enable = enable
}, getEvents: function () {
    return this._vInt
}});
ccs.TriggerObj.create = function () {
    var ret = new ccs.TriggerObj;
    if (ret.init())return ret;
    return null
};
ccs.uiReader = {_filePath: "", _olderVersion: false, _fileDesignSizes: {}, getVersionInteger: function (str) {
    if (!str)return 0;
    var strVersion = str;
    var versionLength = strVersion.length;
    if (versionLength < 7)return 0;
    var pos = strVersion.indexOf(".");
    var t = strVersion.substr(0, pos);
    strVersion = strVersion.substr(pos + 1, versionLength - 1);
    pos = strVersion.indexOf(".");
    var h = strVersion.substr(0, pos);
    strVersion = strVersion.substr(pos + 1, versionLength - 1);
    pos = strVersion.indexOf(".");
    var te = strVersion.substr(0, pos);
    strVersion = strVersion.substr(pos +
        1, versionLength - 1);
    pos = strVersion.indexOf(".");
    var s;
    if (pos == -1)s = strVersion; else s = strVersion.substr(0, pos);
    var it = parseInt(t);
    var ih = parseInt(h);
    var ite = parseInt(te);
    var is = parseInt(s);
    var version = it * 1E3 + ih * 100 + ite * 10 + is;
    return version
}, storeFileDesignSize: function (fileName, size) {
    this._fileDesignSizes[fileName] = size
}, getFileDesignSize: function (fileName) {
    return this._fileDesignSizes[fileName]
}, widgetFromJsonFile: function (fileName) {
    var jsonDict = cc.loader.getRes(fileName);
    if (!jsonDict)throw"Please load the resource first : " +
        fileName;
    var tempFilePath = cc.path.dirname(fileName);
    this._filePath = tempFilePath == "" ? tempFilePath : tempFilePath + "/";
    var fileVersion = jsonDict["version"];
    var pReader, widget;
    var versionInteger = this.getVersionInteger(fileVersion);
    if (fileVersion)if (versionInteger < 250) {
        pReader = new ccs.WidgetPropertiesReader0250;
        widget = pReader.createWidget(jsonDict, this._filePath, fileName)
    } else {
        pReader = new ccs.WidgetPropertiesReader0300;
        widget = pReader.createWidget(jsonDict, this._filePath, fileName)
    } else {
        pReader = new ccs.WidgetPropertiesReader0250;
        widget = pReader.createWidget(jsonDict, this._filePath, fileName)
    }
    if (!fileVersion || versionInteger < 250)this._olderVersion = true;
    jsonDict = null;
    return widget
}, clear: function () {
    this._filePath = "";
    this._olderVersion = false;
    this._fileDesignSizes = {}
}};
ccs.WidgetPropertiesReader = ccs.Class.extend({_filePath: "", createWidget: function (jsonDict, fullPath, fileName) {
}, widgetFromJsonDictionary: function (data) {
}});
ccs.WidgetPropertiesReader0250 = ccs.WidgetPropertiesReader.extend({createWidget: function (jsonDict, fullPath, fileName) {
    this._filePath = fullPath == "" ? fullPath : cc.path.join(fullPath, "/");
    var textures = jsonDict["textures"];
    for (var i = 0; i < textures.length; i++) {
        var file = textures[i];
        var tp = fullPath;
        tp += file;
        cc.spriteFrameCache.addSpriteFrames(tp)
    }
    var fileDesignWidth = jsonDict["designWidth"];
    var fileDesignHeight = jsonDict["designHeight"];
    if (fileDesignWidth <= 0 || fileDesignHeight <= 0) {
        cc.log("Read design size error!");
        var winSize = cc.director.getWinSize();
        ccs.uiReader.storeFileDesignSize(fileName, winSize)
    } else ccs.uiReader.storeFileDesignSize(fileName, cc.size(fileDesignWidth, fileDesignHeight));
    var widgetTree = jsonDict["widgetTree"];
    var widget = this.widgetFromJsonDictionary(widgetTree);
    var size = widget.getContentSize();
    if (size.width == 0 && size.height == 0)widget.setSize(cc.size(fileDesignWidth, fileDesignHeight));
    var actions = jsonDict["animation"];
    var rootWidget = widget;
    ccs.actionManager.initWithDictionary(fileName, actions,
        rootWidget);
    widgetTree = null;
    actions = null;
    return widget
}, widgetFromJsonDictionary: function (data) {
    var widget = null;
    var classname = data["classname"];
    var uiOptions = data["options"];
    if (classname == "Button") {
        widget = ccui.Button.create();
        this.setPropsForButtonFromJsonDictionary(widget, uiOptions)
    } else if (classname == "CheckBox") {
        widget = ccui.CheckBox.create();
        this.setPropsForCheckBoxFromJsonDictionary(widget, uiOptions)
    } else if (classname == "Label") {
        widget = ccui.Text.create();
        this.setPropsForLabelFromJsonDictionary(widget,
            uiOptions)
    } else if (classname == "LabelAtlas") {
        widget = ccui.TextAtlas.create();
        this.setPropsForLabelAtlasFromJsonDictionary(widget, uiOptions)
    } else if (classname == "LoadingBar") {
        widget = ccui.LoadingBar.create();
        this.setPropsForLoadingBarFromJsonDictionary(widget, uiOptions)
    } else if (classname == "ScrollView") {
        widget = ccui.ScrollView.create();
        this.setPropsForScrollViewFromJsonDictionary(widget, uiOptions)
    } else if (classname == "TextArea") {
        widget = ccui.Text.create();
        this.setPropsForLabelFromJsonDictionary(widget, uiOptions)
    } else if (classname ==
        "TextButton") {
        widget = ccui.Button.create();
        this.setPropsForButtonFromJsonDictionary(widget, uiOptions)
    } else if (classname == "TextField") {
        widget = ccui.TextField.create();
        this.setPropsForTextFieldFromJsonDictionary(widget, uiOptions)
    } else if (classname == "ImageView") {
        widget = ccui.ImageView.create();
        this.setPropsForImageViewFromJsonDictionary(widget, uiOptions)
    } else if (classname == "Panel") {
        widget = ccui.Layout.create();
        this.setPropsForLayoutFromJsonDictionary(widget, uiOptions)
    } else if (classname == "Slider") {
        widget =
            ccui.Slider.create();
        this.setPropsForSliderFromJsonDictionary(widget, uiOptions)
    } else if (classname == "LabelBMFont") {
        widget = ccui.TextBMFont.create();
        this.setPropsForLabelBMFontFromJsonDictionary(widget, uiOptions)
    } else if (classname == "DragPanel") {
        widget = ccui.ScrollView.create();
        this.setPropsForScrollViewFromJsonDictionary(widget, uiOptions)
    }
    var children = data["children"];
    for (var i = 0; i < children.length; i++) {
        var subData = children[i];
        var child = this.widgetFromJsonDictionary(subData);
        if (child)widget.addChild(child);
        subData = null
    }
    uiOptions = null;
    return widget
}, setPropsForWidgetFromJsonDictionary: function (widget, options) {
    if (options["ignoreSize"] !== undefined)widget.ignoreContentAdaptWithSize(options["ignoreSize"]);
    var w = options["width"];
    var h = options["height"];
    widget.setSize(cc.size(w, h));
    widget.setTag(options["tag"]);
    widget.setActionTag(options["actiontag"]);
    widget.setTouchEnabled(options["touchAble"]);
    var name = options["name"];
    var widgetName = name ? name : "default";
    widget.setName(widgetName);
    var x = options["x"];
    var y =
        options["y"];
    widget.setPosition(x, y);
    if (options["scaleX"] !== undefined)widget.setScaleX(options["scaleX"]);
    if (options["scaleY"] !== undefined)widget.setScaleY(options["scaleY"]);
    if (options["rotation"] !== undefined)widget.setRotation(options["rotation"]);
    if (options["visible"] !== undefined)widget.setVisible(options["visible"]);
    var z = options["ZOrder"];
    widget.setLocalZOrder(z)
}, setColorPropsForWidgetFromJsonDictionary: function (widget, options) {
    if (options["opacity"] !== undefined)widget.setOpacity(options["opacity"]);
    var colorR = options["colorR"] !== undefined ? options["colorR"] : 255;
    var colorG = options["colorG"] !== undefined ? options["colorG"] : 255;
    var colorB = options["colorB"] !== undefined ? options["colorB"] : 255;
    widget.setColor(cc.color(colorR, colorG, colorB));
    var apx = options["anchorPointX"] !== undefined ? options["anchorPointX"] : widget.getWidgetType() == ccui.Widget.TYPE_WIDGET ? 0.5 : 0;
    var apy = options["anchorPointY"] !== undefined ? options["anchorPointY"] : widget.getWidgetType() == ccui.Widget.TYPE_WIDGET ? 0.5 : 0;
    widget.setAnchorPoint(apx,
        apy);
    var flipX = options["flipX"];
    var flipY = options["flipY"];
    widget.setFlippedX(flipX);
    widget.setFlippedY(flipY)
}, setPropsForButtonFromJsonDictionary: function (widget, options) {
    this.setPropsForWidgetFromJsonDictionary(widget, options);
    var button = widget;
    var scale9Enable = options["scale9Enable"];
    button.setScale9Enabled(scale9Enable);
    var normalFileName = options["normal"];
    var pressedFileName = options["pressed"];
    var disabledFileName = options["disabled"];
    var normalFileName_tp = normalFileName ? this._filePath + normalFileName :
        null;
    var pressedFileName_tp = pressedFileName ? this._filePath + pressedFileName : null;
    var disabledFileName_tp = disabledFileName ? this._filePath + disabledFileName : null;
    var useMergedTexture = options["useMergedTexture"];
    if (scale9Enable) {
        var cx = options["capInsetsX"];
        var cy = options["capInsetsY"];
        var cw = options["capInsetsWidth"];
        var ch = options["capInsetsHeight"];
        if (useMergedTexture)button.loadTextures(normalFileName, pressedFileName, disabledFileName, ccui.Widget.PLIST_TEXTURE); else button.loadTextures(normalFileName_tp,
            pressedFileName_tp, disabledFileName_tp);
        if (options["scale9Width"] !== undefined && options["scale9Height"] !== undefined) {
            var swf = options["scale9Width"];
            var shf = options["scale9Height"];
            button.setSize(cc.size(swf, shf))
        }
    } else if (useMergedTexture)button.loadTextures(normalFileName, pressedFileName, disabledFileName, ccui.Widget.PLIST_TEXTURE); else button.loadTextures(normalFileName_tp, pressedFileName_tp, disabledFileName_tp);
    if (options["text"] !== undefined) {
        var text = options["text"] || "";
        if (text)button.setTitleText(text)
    }
    if (options["fontSize"] !==
        undefined)button.setTitleFontSize(options["fontSize"]);
    if (options["fontName"] !== undefined)button.setTitleFontName(options["fontName"]);
    var cr = options["textColorR"] !== undefined ? options["textColorR"] : 255;
    var cg = options["textColorG"] !== undefined ? options["textColorG"] : 255;
    var cb = options["textColorB"] !== undefined ? options["textColorB"] : 255;
    var tc = cc.color(cr, cg, cb);
    button.setTitleColor(tc);
    this.setColorPropsForWidgetFromJsonDictionary(widget, options)
}, setPropsForCheckBoxFromJsonDictionary: function (widget, options) {
    this.setPropsForWidgetFromJsonDictionary(widget, options);
    var checkBox = widget;
    var backGroundFileName = options["backGroundBox"];
    var backGroundSelectedFileName = options["backGroundBoxSelected"];
    var frontCrossFileName = options["frontCross"];
    var backGroundDisabledFileName = options["backGroundBoxDisabled"];
    var frontCrossDisabledFileName = options["frontCrossDisabled"];
    var locFilePath = this._filePath;
    var backGroundFileName_tp = backGroundFileName ? locFilePath + backGroundFileName : null;
    var backGroundSelectedFileName_tp =
        backGroundSelectedFileName ? locFilePath + backGroundSelectedFileName : null;
    var frontCrossFileName_tp = frontCrossFileName ? locFilePath + frontCrossFileName : null;
    var backGroundDisabledFileName_tp = backGroundDisabledFileName ? locFilePath + backGroundDisabledFileName : null;
    var frontCrossDisabledFileName_tp = frontCrossDisabledFileName ? locFilePath + frontCrossDisabledFileName : null;
    var useMergedTexture = options["useMergedTexture"];
    if (useMergedTexture)checkBox.loadTextures(backGroundFileName, backGroundSelectedFileName, frontCrossFileName,
        backGroundDisabledFileName, frontCrossDisabledFileName, ccui.Widget.PLIST_TEXTURE); else checkBox.loadTextures(backGroundFileName_tp, backGroundSelectedFileName_tp, frontCrossFileName_tp, backGroundDisabledFileName_tp, frontCrossDisabledFileName_tp);
    checkBox.setSelectedState(options["selectedState"] || false);
    this.setColorPropsForWidgetFromJsonDictionary(widget, options)
}, setPropsForImageViewFromJsonDictionary: function (widget, options) {
    this.setPropsForWidgetFromJsonDictionary(widget, options);
    var imageView = widget;
    var imageFileName = options["fileName"];
    var scale9Enable = options["scale9Enable"] || false;
    imageView.setScale9Enabled(scale9Enable);
    var tp_i = this._filePath;
    var imageFileName_tp = null;
    if (imageFileName)imageFileName_tp = tp_i + imageFileName;
    var useMergedTexture = options["useMergedTexture"];
    if (scale9Enable) {
        if (useMergedTexture)imageView.loadTexture(imageFileName, ccui.Widget.PLIST_TEXTURE); else imageView.loadTexture(imageFileName_tp);
        if (options["scale9Width"] !== undefined && options["scale9Height"] !== undefined) {
            var swf =
                options["scale9Width"];
            var shf = options["scale9Height"];
            imageView.setSize(cc.size(swf, shf))
        }
        var cx = options["capInsetsX"];
        var cy = options["capInsetsY"];
        var cw = options["capInsetsWidth"];
        var ch = options["capInsetsHeight"];
        imageView.setCapInsets(cc.rect(cx, cy, cw, ch))
    } else if (useMergedTexture)imageView.loadTexture(imageFileName, ccui.Widget.PLIST_TEXTURE); else imageView.loadTexture(imageFileName_tp);
    this.setColorPropsForWidgetFromJsonDictionary(widget, options)
}, setPropsForLabelFromJsonDictionary: function (widget, options) {
    this.setPropsForWidgetFromJsonDictionary(widget, options);
    var label = widget;
    var touchScaleChangeAble = options["touchScaleEnable"];
    label.setTouchScaleChangeEnabled(touchScaleChangeAble);
    var text = options["text"];
    label.setText(text);
    if (options["fontSize"] !== undefined)label.setFontSize(options["fontSize"]);
    if (options["fontName"] !== undefined)label.setFontName(options["fontName"]);
    if (options["areaWidth"] !== undefined && options["areaHeight"] !== undefined) {
        var size = cc.size(options["areaWidth"], options["areaHeight"]);
        label.setTextAreaSize(size)
    }
    if (options["hAlignment"])label.setTextHorizontalAlignment(options["hAlignment"]);
    if (options["vAlignment"])label.setTextVerticalAlignment(options["vAlignment"]);
    this.setColorPropsForWidgetFromJsonDictionary(widget, options)
}, setPropsForLabelAtlasFromJsonDictionary: function (widget, options) {
    this.setPropsForWidgetFromJsonDictionary(widget, options);
    var labelAtlas = widget;
    var sv = options["stringValue"] !== undefined;
    var cmf = options["charMapFile"] !== undefined;
    var iw = options["itemWidth"] !==
        undefined;
    var ih = options["itemHeight"] !== undefined;
    var scm = options["startCharMap"] !== undefined;
    if (sv && cmf && iw && ih && scm && options["charMapFile"]) {
        var cmft = options["charMapFile"];
        var cmf_tp = this._filePath + cmft;
        labelAtlas.setProperty(options["stringValue"], cmf_tp, options["itemWidth"], options["itemHeight"], options["startCharMap"])
    }
    this.setColorPropsForWidgetFromJsonDictionary(widget, options)
}, setPropsForLayoutFromJsonDictionary: function (widget, options) {
    this.setPropsForWidgetFromJsonDictionary(widget, options);
    var containerWidget = widget;
    if (!(containerWidget instanceof ccui.ScrollView) && !(containerWidget instanceof ccui.ListView))containerWidget.setClippingEnabled(options["clipAble"]);
    var panel = widget;
    var backGroundScale9Enable = options["backGroundScale9Enable"];
    panel.setBackGroundImageScale9Enabled(backGroundScale9Enable);
    var cr = options["bgColorR"];
    var cg = options["bgColorG"];
    var cb = options["bgColorB"];
    var scr = options["bgStartColorR"];
    var scg = options["bgStartColorG"];
    var scb = options["bgStartColorB"];
    var ecr =
        options["bgEndColorR"];
    var ecg = options["bgEndColorG"];
    var ecb = options["bgEndColorB"];
    var bgcv1 = options["vectorX"];
    var bgcv2 = options["vectorY"];
    panel.setBackGroundColorVector(cc.p(bgcv1, bgcv2));
    var co = options["bgColorOpacity"];
    var colorType = options["colorType"];
    panel.setBackGroundColorType(colorType);
    panel.setBackGroundColor(cc.color(scr, scg, scb), cc.color(ecr, ecg, ecb));
    panel.setBackGroundColor(cc.color(cr, cg, cb));
    panel.setBackGroundColorOpacity(co);
    var imageFileName = options["backGroundImage"];
    var imageFileName_tp =
        imageFileName ? this._filePath + imageFileName : null;
    var useMergedTexture = options["useMergedTexture"];
    if (useMergedTexture)panel.setBackGroundImage(imageFileName, ccui.Widget.PLIST_TEXTURE); else panel.setBackGroundImage(imageFileName_tp);
    if (backGroundScale9Enable) {
        var cx = options["capInsetsX"];
        var cy = options["capInsetsY"];
        var cw = options["capInsetsWidth"];
        var ch = options["capInsetsHeight"];
        panel.setBackGroundImageCapInsets(cc.rect(cx, cy, cw, ch))
    }
    this.setColorPropsForWidgetFromJsonDictionary(widget, options)
},
    setPropsForScrollViewFromJsonDictionary: function (widget, options) {
        this.setPropsForLayoutFromJsonDictionary(widget, options);
        var scrollView = widget;
        var innerWidth = options["innerWidth"];
        var innerHeight = options["innerHeight"];
        scrollView.setInnerContainerSize(cc.size(innerWidth, innerHeight));
        var direction = options["direction"];
        scrollView.setDirection(direction);
        scrollView.setBounceEnabled(options["bounceEnable"]);
        this.setColorPropsForWidgetFromJsonDictionary(widget, options)
    }, setPropsForContainerWidgetFromJsonDictionary: function (widget, options) {
        this.setPropsForWidgetFromJsonDictionary(widget, options);
        var containerWidget = widget;
        if (containerWidget instanceof ccui.ScrollView || containerWidget instanceof ccui.ListView)containerWidget.setClippingEnabled(options["clipAble"]);
        this.setColorPropsForWidgetFromJsonDictionary(widget, options)
    }, setPropsForSliderFromJsonDictionary: function (widget, options) {
        this.setPropsForWidgetFromJsonDictionary(widget, options);
        var slider = widget;
        var barTextureScale9Enable = options["barTextureScale9Enable"] || false;
        slider.setScale9Enabled(barTextureScale9Enable);
        var barLength = options["length"];
        var useMergedTexture = options["useMergedTexture"];
        var bt = options["barFileName"] !== undefined;
        if (bt)if (barTextureScale9Enable) {
            var imageFileName = options["barFileName"];
            var imageFileName_tp = imageFileName ? this._filePath + imageFileName : null;
            if (useMergedTexture)slider.loadBarTexture(imageFileName, ccui.Widget.PLIST_TEXTURE); else slider.loadBarTexture(imageFileName_tp);
            slider.setSize(cc.size(barLength, slider.getContentSize().height))
        } else {
            var imageFileName =
                options["barFileName"];
            var imageFileName_tp = imageFileName ? this._filePath + imageFileName : null;
            if (useMergedTexture)slider.loadBarTexture(imageFileName, ccui.Widget.PLIST_TEXTURE); else slider.loadBarTexture(imageFileName_tp)
        }
        var normalFileName = options["ballNormal"];
        var pressedFileName = options["ballPressed"];
        var disabledFileName = options["ballDisabled"];
        var normalFileName_tp = normalFileName ? this._filePath + normalFileName : null;
        var pressedFileName_tp = pressedFileName ? this._filePath + pressedFileName : null;
        var disabledFileName_tp =
            disabledFileName ? this._filePath + disabledFileName : null;
        if (useMergedTexture)slider.loadSlidBallTextures(normalFileName, pressedFileName, disabledFileName, ccui.Widget.PLIST_TEXTURE); else slider.loadSlidBallTextures(normalFileName_tp, pressedFileName_tp, disabledFileName_tp);
        slider.setPercent(options["percent"]);
        var imageFileName = options["progressBarFileName"];
        var imageFileName_tp = imageFileName ? this._filePath + imageFileName : null;
        if (useMergedTexture)slider.loadProgressBarTexture(imageFileName, ccui.Widget.PLIST_TEXTURE);
        else slider.loadProgressBarTexture(imageFileName_tp);
        this.setColorPropsForWidgetFromJsonDictionary(widget, options)
    }, setPropsForTextAreaFromJsonDictionary: function (widget, options) {
        this.setPropsForWidgetFromJsonDictionary(widget, options);
        var textArea = widget;
        textArea.setText(options["text"]);
        if (options["fontSize"] !== undefined)textArea.setFontSize(options["fontSize"]);
        var cr = options["colorR"];
        var cg = options["colorG"];
        var cb = options["colorB"];
        textArea.setColor(cc.color(cr, cg, cb));
        textArea.setFontName(options["fontName"]);
        if (options["areaWidth"] !== undefined && options["areaHeight"] !== undefined) {
            var size = cc.size(options["areaWidth"], options["areaHeight"]);
            textArea.setTextAreaSize(size)
        }
        if (options["hAlignment"])textArea.setTextHorizontalAlignment(options["hAlignment"]);
        if (options["vAlignment"])textArea.setTextVerticalAlignment(options["vAlignment"]);
        this.setColorPropsForWidgetFromJsonDictionary(widget, options)
    }, setPropsForTextButtonFromJsonDictionary: function (widget, options) {
        this.setPropsForButtonFromJsonDictionary(widget,
            options);
        var textButton = widget;
        textButton.setTitleText(options["text"] || "");
        var cri = options["textColorR"] !== undefined ? options["textColorR"] : 255;
        var cgi = options["textColorG"] !== undefined ? options["textColorG"] : 255;
        var cbi = options["textColorB"] !== undefined ? options["textColorB"] : 255;
        textButton.setTitleColor(cc.color(cri, cgi, cbi));
        if (options["fontSize"] !== undefined)textButton.setTitleFontSize(options["fontSize"]);
        if (options["fontName"] !== undefined)textButton.setTitleFontName(options["fontName"]);
        this.setColorPropsForWidgetFromJsonDictionary(widget,
            options)
    }, setPropsForTextFieldFromJsonDictionary: function (widget, options) {
        this.setPropsForWidgetFromJsonDictionary(widget, options);
        var textField = widget;
        if (options["placeHolder"] !== undefined)textField.setPlaceHolder(options["placeHolder"]);
        textField.setText(options["text"]);
        if (options["fontSize"] !== undefined)textField.setFontSize(options["fontSize"]);
        if (options["fontName"] !== undefined)textField.setFontName(options["fontName"]);
        if (options["touchSizeWidth"] !== undefined && options["touchSizeHeight"] !==
            undefined)textField.setTouchSize(cc.size(options["touchSizeWidth"], options["touchSizeHeight"]));
        var dw = options["width"];
        var dh = options["height"];
        if (dw > 0 || dh > 0);
        var maxLengthEnable = options["maxLengthEnable"];
        textField.setMaxLengthEnabled(maxLengthEnable);
        if (maxLengthEnable) {
            var maxLength = options["maxLength"];
            textField.setMaxLength(maxLength)
        }
        var passwordEnable = options["passwordEnable"];
        textField.setPasswordEnabled(passwordEnable);
        if (passwordEnable)textField.setPasswordStyleText(options["passwordStyleText"]);
        this.setColorPropsForWidgetFromJsonDictionary(widget, options)
    }, setPropsForLoadingBarFromJsonDictionary: function (widget, options) {
        this.setPropsForWidgetFromJsonDictionary(widget, options);
        var loadingBar = widget;
        var useMergedTexture = options["useMergedTexture"];
        var imageFileName = options["texture"];
        var imageFileName_tp = imageFileName ? this._filePath + imageFileName : null;
        if (useMergedTexture)loadingBar.loadTexture(imageFileName, ccui.Widget.PLIST_TEXTURE); else loadingBar.loadTexture(imageFileName_tp);
        loadingBar.setDirection(options["direction"]);
        loadingBar.setPercent(options["percent"]);
        this.setColorPropsForWidgetFromJsonDictionary(widget, options)
    }, setPropsForListViewFromJsonDictionary: function (widget, options) {
        this.setPropsForLayoutFromJsonDictionary(widget, options)
    }, setPropsForPageViewFromJsonDictionary: function (widget, options) {
        this.setPropsForLayoutFromJsonDictionary(widget, options)
    }, setPropsForLabelBMFontFromJsonDictionary: function (widget, options) {
        this.setPropsForWidgetFromJsonDictionary(widget, options);
        var labelBMFont = widget;
        var cmft =
            options["fileName"];
        var cmf_tp = this._filePath + cmft;
        labelBMFont.setFntFile(cmf_tp);
        var text = options["text"];
        labelBMFont.setText(text);
        this.setColorPropsForWidgetFromJsonDictionary(widget, options)
    }});
ccs.WidgetPropertiesReader0300 = ccs.WidgetPropertiesReader.extend({createWidget: function (jsonDict, fullPath, fileName) {
    this._filePath = fullPath == "" ? fullPath : cc.path.join(fullPath, "/");
    var textures = jsonDict["textures"];
    for (var i = 0; i < textures.length; i++) {
        var file = textures[i];
        var tp = fullPath;
        tp += file;
        cc.spriteFrameCache.addSpriteFrames(tp)
    }
    var fileDesignWidth = jsonDict["designWidth"];
    var fileDesignHeight = jsonDict["designHeight"];
    if (fileDesignWidth <= 0 || fileDesignHeight <= 0) {
        cc.log("Read design size error!");
        var winSize = cc.director.getWinSize();
        ccs.uiReader.storeFileDesignSize(fileName, winSize)
    } else ccs.uiReader.storeFileDesignSize(fileName, cc.size(fileDesignWidth, fileDesignHeight));
    var widgetTree = jsonDict["widgetTree"];
    var widget = this.widgetFromJsonDictionary(widgetTree);
    var size = widget.getContentSize();
    if (size.width == 0 && size.height == 0)widget.setSize(cc.size(fileDesignWidth, fileDesignHeight));
    var actions = jsonDict["animation"];
    var rootWidget = widget;
    ccs.actionManager.initWithDictionary(fileName, actions,
        rootWidget);
    widgetTree = null;
    actions = null;
    return widget
}, widgetFromJsonDictionary: function (data) {
    var widget = null;
    var classname = data["classname"];
    var uiOptions = data["options"];
    if (classname == "Button") {
        widget = ccui.Button.create();
        this.setPropsForButtonFromJsonDictionary(widget, uiOptions)
    } else if (classname == "CheckBox") {
        widget = ccui.CheckBox.create();
        this.setPropsForCheckBoxFromJsonDictionary(widget, uiOptions)
    } else if (classname == "Label") {
        widget = ccui.Text.create();
        this.setPropsForLabelFromJsonDictionary(widget,
            uiOptions)
    } else if (classname == "LabelAtlas") {
        widget = ccui.TextAtlas.create();
        this.setPropsForLabelAtlasFromJsonDictionary(widget, uiOptions)
    } else if (classname == "LoadingBar") {
        widget = ccui.LoadingBar.create();
        this.setPropsForLoadingBarFromJsonDictionary(widget, uiOptions)
    } else if (classname == "ScrollView") {
        widget = ccui.ScrollView.create();
        this.setPropsForScrollViewFromJsonDictionary(widget, uiOptions)
    } else if (classname == "TextArea") {
        widget = ccui.Text.create();
        this.setPropsForLabelFromJsonDictionary(widget, uiOptions)
    } else if (classname ==
        "TextButton") {
        widget = ccui.Button.create();
        this.setPropsForButtonFromJsonDictionary(widget, uiOptions)
    } else if (classname == "TextField") {
        widget = ccui.TextField.create();
        this.setPropsForTextFieldFromJsonDictionary(widget, uiOptions)
    } else if (classname == "ImageView") {
        widget = ccui.ImageView.create();
        this.setPropsForImageViewFromJsonDictionary(widget, uiOptions)
    } else if (classname == "Panel") {
        widget = ccui.Layout.create();
        this.setPropsForLayoutFromJsonDictionary(widget, uiOptions)
    } else if (classname == "Slider") {
        widget =
            ccui.Slider.create();
        this.setPropsForSliderFromJsonDictionary(widget, uiOptions)
    } else if (classname == "LabelBMFont") {
        widget = ccui.TextBMFont.create();
        this.setPropsForLabelBMFontFromJsonDictionary(widget, uiOptions)
    } else if (classname == "DragPanel") {
        widget = ccui.ScrollView.create();
        this.setPropsForScrollViewFromJsonDictionary(widget, uiOptions)
    } else if (classname == "ListView") {
        widget = ccui.ListView.create();
        this.setPropsForListViewFromJsonDictionary(widget, uiOptions)
    } else if (classname == "PageView") {
        widget = ccui.PageView.create();
        this.setPropsForPageViewFromJsonDictionary(widget, uiOptions)
    }
    var children = data["children"];
    for (var i = 0; i < children.length; i++) {
        var subData = children[i];
        var child = this.widgetFromJsonDictionary(subData);
        if (child)if (widget instanceof ccui.PageView && child instanceof ccui.Layout)widget.addPage(child); else if (widget instanceof ccui.ListView)widget.pushBackCustomItem(child); else widget.addChild(child);
        subData = null
    }
    uiOptions = null;
    return widget
}, setPropsForWidgetFromJsonDictionary: function (widget, options) {
    var name =
        options["name"];
    var widgetName = name ? name : "default";
    widget.setName(widgetName);
    if (options["ignoreSize"] !== undefined)widget.ignoreContentAdaptWithSize(options["ignoreSize"]);
    widget.setSizeType(options["sizeType"]);
    widget.setPositionType(options["positionType"]);
    widget.setSizePercent(cc.p(options["sizePercentX"], options["sizePercentY"]));
    widget.setPositionPercent(cc.p(options["positionPercentX"], options["positionPercentY"]));
    var w = options["width"];
    var h = options["height"];
    widget.setSize(cc.size(w, h));
    widget.setTag(options["tag"]);
    widget.setActionTag(options["actiontag"]);
    widget.setTouchEnabled(options["touchAble"]);
    var x = options["x"];
    var y = options["y"];
    widget.setPosition(x, y);
    if (options["scaleX"] !== undefined)widget.setScaleX(options["scaleX"]);
    if (options["scaleY"] !== undefined)widget.setScaleY(options["scaleY"]);
    if (options["rotation"] !== undefined)widget.setRotation(options["rotation"]);
    if (options["visible"] !== undefined)widget.setVisible(options["visible"]);
    widget.setLocalZOrder(options["ZOrder"]);
    var layoutParameterDic = options["layoutParameter"];
    if (layoutParameterDic) {
        var paramType = layoutParameterDic["type"];
        var parameter;
        switch (paramType) {
            case 0:
                break;
            case 1:
                parameter = ccui.LinearLayoutParameter.create();
                var gravity = layoutParameterDic["gravity"];
                parameter.setGravity(gravity);
                break;
            case 2:
                parameter = ccui.RelativeLayoutParameter.create();
                var relativeName = layoutParameterDic["relativeName"];
                parameter.setRelativeName(relativeName);
                var relativeToName = layoutParameterDic["relativeToName"];
                parameter.setRelativeToWidgetName(relativeToName);
                parameter.setAlign(layoutParameterDic["align"]);
                break;
            default:
                break
        }
        var mgl = layoutParameterDic["marginLeft"];
        var mgt = layoutParameterDic["marginTop"];
        var mgr = layoutParameterDic["marginRight"];
        var mgb = layoutParameterDic["marginDown"];
        parameter.setMargin(new ccui.Margin(mgl, mgt, mgr, mgb));
        widget.setLayoutParameter(parameter)
    }
}, setColorPropsForWidgetFromJsonDictionary: function (widget, options) {
    if (options["opacity"] !== undefined)widget.setOpacity(options["opacity"]);
    var colorR = options["colorR"] !== undefined ?
        options["colorR"] : 255;
    var colorG = options["colorG"] !== undefined ? options["colorG"] : 255;
    var colorB = options["colorB"] !== undefined ? options["colorB"] : 255;
    widget.setColor(cc.color(colorR, colorG, colorB));
    var apx = options["anchorPointX"] !== undefined ? options["anchorPointX"] : widget.getWidgetType() == ccui.Widget.TYPE_WIDGET ? 0.5 : 0;
    var apy = options["anchorPointY"] !== undefined ? options["anchorPointY"] : widget.getWidgetType() == ccui.Widget.TYPE_WIDGET ? 0.5 : 0;
    widget.setAnchorPoint(apx, apy);
    var flipX = options["flipX"];
    var flipY =
        options["flipY"];
    widget.setFlippedX(flipX);
    widget.setFlippedY(flipY)
}, setPropsForButtonFromJsonDictionary: function (widget, options) {
    this.setPropsForWidgetFromJsonDictionary(widget, options);
    var button = widget;
    var scale9Enable = options["scale9Enable"];
    button.setScale9Enabled(scale9Enable);
    var normalDic = options["normalData"];
    var normalType = normalDic["resourceType"];
    switch (normalType) {
        case 0:
            var normalFileName = normalDic["path"];
            var normalFileName_tp = normalFileName ? this._filePath + normalFileName : null;
            button.loadTextureNormal(normalFileName_tp);
            break;
        case 1:
            var normalFileName = normalDic["path"];
            button.loadTextureNormal(normalFileName, ccui.Widget.PLIST_TEXTURE);
            break;
        default:
            break
    }
    normalDic = null;
    var pressedDic = options["pressedData"];
    var pressedType = pressedDic["resourceType"];
    switch (pressedType) {
        case 0:
            var pressedFileName = pressedDic["path"];
            var pressedFileName_tp = pressedFileName ? this._filePath + pressedFileName : null;
            button.loadTexturePressed(pressedFileName_tp);
            break;
        case 1:
            var pressedFileName = pressedDic["path"];
            button.loadTexturePressed(pressedFileName,
                ccui.Widget.PLIST_TEXTURE);
            break;
        default:
            break
    }
    pressedDic = null;
    var disabledDic = options["disabledData"];
    var disabledType = disabledDic["resourceType"];
    switch (disabledType) {
        case 0:
            var disabledFileName = disabledDic["path"];
            var disabledFileName_tp = disabledFileName ? this._filePath + disabledFileName : null;
            button.loadTextureDisabled(disabledFileName_tp);
            break;
        case 1:
            var disabledFileName = disabledDic["path"];
            button.loadTextureDisabled(disabledFileName, ccui.Widget.PLIST_TEXTURE);
            break;
        default:
            break
    }
    disabledDic = null;
    if (scale9Enable) {
        var cx = options["capInsetsX"];
        var cy = options["capInsetsY"];
        var cw = options["capInsetsWidth"];
        var ch = options["capInsetsHeight"];
        button.setCapInsets(cc.rect(cx, cy, cw, ch));
        if (options["scale9Width"] !== undefined && options["scale9Height"] !== undefined) {
            var swf = options["scale9Width"];
            var shf = options["scale9Height"];
            button.setSize(cc.size(swf, shf))
        }
    }
    if (options["text"] !== undefined) {
        var text = options["text"] || "";
        if (text)button.setTitleText(text)
    }
    if (options["fontSize"] !== undefined)button.setTitleFontSize(options["fontSize"]);
    if (options["fontName"] !== undefined)button.setTitleFontName(options["fontName"]);
    var cr = options["textColorR"] !== undefined ? options["textColorR"] : 255;
    var cg = options["textColorG"] !== undefined ? options["textColorG"] : 255;
    var cb = options["textColorB"] !== undefined ? options["textColorB"] : 255;
    var tc = cc.color(cr, cg, cb);
    button.setTitleColor(tc);
    this.setColorPropsForWidgetFromJsonDictionary(widget, options)
}, setPropsForCheckBoxFromJsonDictionary: function (widget, options) {
    this.setPropsForWidgetFromJsonDictionary(widget,
        options);
    var checkBox = widget;
    var backGroundDic = options["backGroundBoxData"];
    var backGroundType = backGroundDic["resourceType"];
    switch (backGroundType) {
        case 0:
            var backGroundFileName = backGroundDic["path"];
            var backGroundFileName_tp = backGroundFileName ? this._filePath + backGroundFileName : null;
            checkBox.loadTextureBackGround(backGroundFileName_tp);
            break;
        case 1:
            var backGroundFileName = backGroundDic["path"];
            checkBox.loadTextureBackGround(backGroundFileName, ccui.Widget.PLIST_TEXTURE);
            break;
        default:
            break
    }
    backGroundDic =
        null;
    var backGroundSelectedDic = options["backGroundBoxSelectedData"];
    var backGroundSelectedType = backGroundSelectedDic["resourceType"];
    switch (backGroundSelectedType) {
        case 0:
            var backGroundSelectedFileName = backGroundSelectedDic["path"];
            var backGroundSelectedFileName_tp = backGroundSelectedFileName ? this._filePath + backGroundSelectedFileName : null;
            checkBox.loadTextureBackGroundSelected(backGroundSelectedFileName_tp);
            break;
        case 1:
            var backGroundSelectedFileName = backGroundSelectedDic["path"];
            checkBox.loadTextureBackGroundSelected(backGroundSelectedFileName,
                ccui.Widget.PLIST_TEXTURE);
            break;
        default:
            break
    }
    backGroundSelectedDic = null;
    var frontCrossDic = options["frontCrossData"];
    var frontCrossType = frontCrossDic["resourceType"];
    switch (frontCrossType) {
        case 0:
            var frontCrossFileName = frontCrossDic["path"];
            var frontCrossFileName_tp = frontCrossFileName ? this._filePath + frontCrossFileName : null;
            checkBox.loadTextureFrontCross(frontCrossFileName_tp);
            break;
        case 1:
            var frontCrossFileName = frontCrossDic["path"];
            checkBox.loadTextureFrontCross(frontCrossFileName, ccui.Widget.PLIST_TEXTURE);
            break;
        default:
            break
    }
    frontCrossDic = null;
    var backGroundDisabledDic = options["backGroundBoxDisabledData"];
    var backGroundDisabledType = backGroundDisabledDic["resourceType"];
    switch (backGroundDisabledType) {
        case 0:
            var backGroundDisabledFileName = backGroundDisabledDic["path"];
            var backGroundDisabledFileName_tp = backGroundDisabledFileName ? this._filePath + backGroundDisabledFileName : null;
            checkBox.loadTextureBackGroundDisabled(backGroundDisabledFileName_tp);
            break;
        case 1:
            var backGroundDisabledFileName = backGroundDisabledDic["path"];
            checkBox.loadTextureBackGroundDisabled(backGroundDisabledFileName, ccui.Widget.PLIST_TEXTURE);
            break;
        default:
            break
    }
    backGroundDisabledDic = null;
    var frontCrossDisabledDic = options["frontCrossDisabledData"];
    var frontCrossDisabledType = frontCrossDisabledDic["resourceType"];
    switch (frontCrossDisabledType) {
        case 0:
            var frontCrossDisabledFileName = options["path"];
            var frontCrossDisabledFileName_tp = frontCrossDisabledFileName ? this._filePath + frontCrossDisabledFileName : null;
            checkBox.loadTextureFrontCrossDisabled(frontCrossDisabledFileName_tp);
            break;
        case 1:
            var frontCrossDisabledFileName = options["path"];
            checkBox.loadTextureFrontCrossDisabled(frontCrossDisabledFileName, ccui.Widget.PLIST_TEXTURE);
            break;
        default:
            break
    }
    frontCrossDisabledDic = null;
    var selectedState = options["selectedState"] || false;
    widget.setSelectedState(selectedState);
    this.setColorPropsForWidgetFromJsonDictionary(widget, options)
}, setPropsForImageViewFromJsonDictionary: function (widget, options) {
    this.setPropsForWidgetFromJsonDictionary(widget, options);
    var imageView = widget;
    var imageFileNameDic =
        options["fileNameData"];
    var imageFileNameType = imageFileNameDic["resourceType"];
    switch (imageFileNameType) {
        case 0:
            var tp_i = this._filePath;
            var imageFileName = imageFileNameDic["path"];
            var imageFileName_tp = null;
            if (imageFileName) {
                imageFileName_tp = tp_i + imageFileName;
                imageView.loadTexture(imageFileName_tp)
            }
            break;
        case 1:
            var imageFileName = imageFileNameDic["path"];
            imageView.loadTexture(imageFileName, ccui.Widget.PLIST_TEXTURE);
            break;
        default:
            break
    }
    imageFileNameDic = null;
    var scale9Enable = options["scale9Enable"] ||
        false;
    imageView.setScale9Enabled(scale9Enable);
    if (scale9Enable) {
        if (options["scale9Width"] !== undefined && options["scale9Height"] !== undefined) {
            var swf = options["scale9Width"];
            var shf = options["scale9Height"];
            imageView.setSize(cc.size(swf, shf))
        }
        var cx = options["capInsetsX"];
        var cy = options["capInsetsY"];
        var cw = options["capInsetsWidth"];
        var ch = options["capInsetsHeight"];
        imageView.setCapInsets(cc.rect(cx, cy, cw, ch))
    }
    this.setColorPropsForWidgetFromJsonDictionary(widget, options)
}, setPropsForLabelFromJsonDictionary: function (widget, options) {
    this.setPropsForWidgetFromJsonDictionary(widget, options);
    var label = widget;
    var touchScaleChangeAble = options["touchScaleEnable"];
    label.setTouchScaleChangeEnabled(touchScaleChangeAble);
    var text = options["text"];
    label.setText(text);
    if (options["fontSize"] !== undefined)label.setFontSize(options["fontSize"]);
    if (options["fontName"] !== undefined)label.setFontName(options["fontName"]);
    if (options["areaWidth"] !== undefined && options["areaHeight"] !== undefined) {
        var size = cc.size(options["areaWidth"], options["areaHeight"]);
        label.setTextAreaSize(size)
    }
    if (options["hAlignment"])label.setTextHorizontalAlignment(options["hAlignment"]);
    if (options["vAlignment"])label.setTextVerticalAlignment(options["vAlignment"]);
    this.setColorPropsForWidgetFromJsonDictionary(widget, options)
}, setPropsForLabelAtlasFromJsonDictionary: function (widget, options) {
    this.setPropsForWidgetFromJsonDictionary(widget, options);
    var labelAtlas = widget;
    var sv = options["stringValue"] !== undefined;
    var cmf = options["charMapFile"] !== undefined;
    var iw = options["itemWidth"] !==
        undefined;
    var ih = options["itemHeight"] !== undefined;
    var scm = options["startCharMap"] !== undefined;
    if (sv && cmf && iw && ih && scm) {
        var cmftDic = options["charMapFileData"];
        var cmfType = cmftDic["resourceType"];
        switch (cmfType) {
            case 0:
                var cmfPath = cmftDic["path"];
                var cmf_tp = this._filePath + cmfPath;
                labelAtlas.setProperty(options["stringValue"], cmf_tp, options["itemWidth"], options["itemHeight"], options["startCharMap"]);
                break;
            case 1:
                cc.log("Wrong res type of LabelAtlas!");
                break;
            default:
                break
        }
        cmftDic = null
    }
    this.setColorPropsForWidgetFromJsonDictionary(widget,
        options)
}, setPropsForLayoutFromJsonDictionary: function (widget, options) {
    this.setPropsForWidgetFromJsonDictionary(widget, options);
    var panel = widget;
    if (!(panel instanceof ccui.ScrollView) && !(panel instanceof ccui.ListView))panel.setClippingEnabled(options["clipAble"]);
    var backGroundScale9Enable = options["backGroundScale9Enable"];
    panel.setBackGroundImageScale9Enabled(backGroundScale9Enable);
    var cr = options["bgColorR"];
    var cg = options["bgColorG"];
    var cb = options["bgColorB"];
    var scr = options["bgStartColorR"];
    var scg = options["bgStartColorG"];
    var scb = options["bgStartColorB"];
    var ecr = options["bgEndColorR"];
    var ecg = options["bgEndColorG"];
    var ecb = options["bgEndColorB"];
    var bgcv1 = options["vectorX"];
    var bgcv2 = options["vectorY"];
    panel.setBackGroundColorVector(cc.p(bgcv1, bgcv2));
    var co = options["bgColorOpacity"];
    var colorType = options["colorType"];
    panel.setBackGroundColorType(colorType);
    panel.setBackGroundColor(cc.color(scr, scg, scb), cc.color(ecr, ecg, ecb));
    panel.setBackGroundColor(cc.color(cr, cg, cb));
    panel.setBackGroundColorOpacity(co);
    var imageFileNameDic = options["backGroundImageData"] || {};
    var imageFileNameType = imageFileNameDic["resourceType"];
    switch (imageFileNameType) {
        case 0:
            var imageFileName = imageFileNameDic["path"];
            var imageFileName_tp = imageFileName ? this._filePath + imageFileName : null;
            panel.setBackGroundImage(imageFileName_tp);
            break;
        case 1:
            var imageFileName = imageFileNameDic["path"];
            panel.setBackGroundImage(imageFileName, ccui.Widget.PLIST_TEXTURE);
            break;
        default:
            break
    }
    imageFileNameDic = null;
    if (backGroundScale9Enable) {
        var cx = options["capInsetsX"];
        var cy = options["capInsetsY"];
        var cw = options["capInsetsWidth"];
        var ch = options["capInsetsHeight"];
        panel.setBackGroundImageCapInsets(cc.rect(cx, cy, cw, ch))
    }
    panel.setLayoutType(options["layoutType"]);
    this.setColorPropsForWidgetFromJsonDictionary(widget, options)
}, setPropsForScrollViewFromJsonDictionary: function (widget, options) {
    this.setPropsForLayoutFromJsonDictionary(widget, options);
    var scrollView = widget;
    var innerWidth = options["innerWidth"];
    var innerHeight = options["innerHeight"];
    scrollView.setInnerContainerSize(cc.size(innerWidth,
        innerHeight));
    var direction = options["direction"];
    scrollView.setDirection(direction);
    scrollView.setBounceEnabled(options["bounceEnable"]);
    this.setColorPropsForWidgetFromJsonDictionary(widget, options)
}, setPropsForSliderFromJsonDictionary: function (widget, options) {
    this.setPropsForWidgetFromJsonDictionary(widget, options);
    var slider = widget;
    var barTextureScale9Enable = options["barTextureScale9Enable"] || false;
    slider.setScale9Enabled(barTextureScale9Enable);
    var barLength = options["length"];
    var bt = options["barFileName"] !==
        undefined;
    if (bt)if (barTextureScale9Enable) {
        var imageFileNameDic = options["barFileNameData"];
        var imageFileType = imageFileNameDic["resourceType"];
        switch (imageFileType) {
            case 0:
                var imageFileName = imageFileNameDic["path"];
                var imageFileName_tp = imageFileName ? this._filePath + imageFileName : null;
                slider.loadBarTexture(imageFileName_tp);
                break;
            case 1:
                var imageFileName = imageFileNameDic["path"];
                slider.loadBarTexture(imageFileName, ccui.Widget.PLIST_TEXTURE);
                break;
            default:
                break
        }
        slider.setSize(cc.size(barLength, slider.getContentSize().height));
        imageFileNameDic = null
    } else {
        var imageFileNameDic = options["barFileNameData"];
        var imageFileType = imageFileNameDic["resourceType"];
        switch (imageFileType) {
            case 0:
                var imageFileName = imageFileNameDic["path"];
                var imageFileName_tp = imageFileName ? this._filePath + imageFileName : null;
                slider.loadBarTexture(imageFileName_tp);
                break;
            case 1:
                var imageFileName = imageFileNameDic["path"];
                slider.loadBarTexture(imageFileName, ccui.Widget.PLIST_TEXTURE);
                break;
            default:
                break
        }
        imageFileNameDic = null
    }
    var normalDic = options["ballNormalData"];
    var normalType = normalDic["resourceType"];
    switch (normalType) {
        case 0:
            var normalFileName = normalDic["path"];
            var normalFileName_tp = normalFileName ? this._filePath + normalFileName : null;
            slider.loadSlidBallTextureNormal(normalFileName_tp);
            break;
        case 1:
            var normalFileName = normalDic["path"];
            slider.loadSlidBallTextureNormal(normalFileName, ccui.Widget.PLIST_TEXTURE);
            break;
        default:
            break
    }
    normalDic = null;
    var pressedDic = options["ballPressedData"];
    var pressedType = pressedDic["resourceType"];
    switch (pressedType) {
        case 0:
            var pressedFileName =
                pressedDic["path"];
            var pressedFileName_tp = pressedFileName ? this._filePath + pressedFileName : null;
            slider.loadSlidBallTexturePressed(pressedFileName_tp);
            break;
        case 1:
            var pressedFileName = pressedDic["path"];
            slider.loadSlidBallTexturePressed(pressedFileName, ccui.Widget.PLIST_TEXTURE);
            break;
        default:
            break
    }
    pressedDic = null;
    var disabledDic = options["ballDisabledData"];
    var disabledType = disabledDic["resourceType"];
    switch (disabledType) {
        case 0:
            var disabledFileName = disabledDic["path"];
            var disabledFileName_tp = disabledFileName ?
                this._filePath + disabledFileName : null;
            slider.loadSlidBallTextureDisabled(disabledFileName_tp);
            break;
        case 1:
            var disabledFileName = disabledDic["path"];
            slider.loadSlidBallTextureDisabled(disabledFileName, ccui.Widget.PLIST_TEXTURE);
            break;
        default:
            break
    }
    disabledDic = null;
    var progressBarDic = options["progressBarData"];
    var progressBarType = progressBarDic["resourceType"];
    switch (progressBarType) {
        case 0:
            var imageFileName = progressBarDic["path"];
            var imageFileName_tp = imageFileName ? this._filePath + imageFileName : null;
            slider.loadProgressBarTexture(imageFileName_tp);
            break;
        case 1:
            var imageFileName = progressBarDic["path"];
            slider.loadProgressBarTexture(imageFileName, ccui.Widget.PLIST_TEXTURE);
            break;
        default:
            break
    }
    this.setColorPropsForWidgetFromJsonDictionary(widget, options);
    slider.setPercent(options["percent"])
}, setPropsForTextAreaFromJsonDictionary: function (widget, options) {
    this.setPropsForWidgetFromJsonDictionary(widget, options);
    var textArea = widget;
    textArea.setText(options["text"]);
    if (options["fontSize"] !== undefined)textArea.setFontSize(options["fontSize"]);
    var cr = options["colorR"];
    var cg = options["colorG"];
    var cb = options["colorB"];
    textArea.setColor(cc.color(cr, cg, cb));
    textArea.setFontName(options["fontName"]);
    if (options["areaWidth"] !== undefined && options["areaHeight"] !== undefined) {
        var size = cc.size(options["areaWidth"], options["areaHeight"]);
        textArea.setTextAreaSize(size)
    }
    if (options["hAlignment"])textArea.setTextHorizontalAlignment(options["hAlignment"]);
    if (options["vAlignment"])textArea.setTextVerticalAlignment(options["vAlignment"]);
    this.setColorPropsForWidgetFromJsonDictionary(widget,
        options)
}, setPropsForTextButtonFromJsonDictionary: function (widget, options) {
    this.setPropsForButtonFromJsonDictionary(widget, options);
    var textButton = widget;
    textButton.setTitleText(options["text"] || "");
    var cri = options["textColorR"] !== undefined ? options["textColorR"] : 255;
    var cgi = options["textColorG"] !== undefined ? options["textColorG"] : 255;
    var cbi = options["textColorB"] !== undefined ? options["textColorB"] : 255;
    textButton.setTitleColor(cc.color(cri, cgi, cbi));
    if (options["fontSize"] !== undefined)textButton.setTitleFontSize(options["fontSize"]);
    if (options["fontName"] !== undefined)textButton.setTitleFontName(options["fontName"]);
    this.setColorPropsForWidgetFromJsonDictionary(widget, options)
}, setPropsForTextFieldFromJsonDictionary: function (widget, options) {
    this.setPropsForWidgetFromJsonDictionary(widget, options);
    var textField = widget;
    if (options["placeHolder"] !== undefined)textField.setPlaceHolder(options["placeHolder"]);
    textField.setText(options["text"]);
    if (options["fontSize"] !== undefined)textField.setFontSize(options["fontSize"]);
    if (options["fontName"] !==
        undefined)textField.setFontName(options["fontName"]);
    if (options["touchSizeWidth"] !== undefined && options["touchSizeHeight"] !== undefined)textField.setTouchSize(cc.size(options["touchSizeWidth"], options["touchSizeHeight"]));
    var dw = options["width"];
    var dh = options["height"];
    if (dw > 0 || dh > 0);
    var maxLengthEnable = options["maxLengthEnable"];
    textField.setMaxLengthEnabled(maxLengthEnable);
    if (maxLengthEnable) {
        var maxLength = options["maxLength"];
        textField.setMaxLength(maxLength)
    }
    var passwordEnable = options["passwordEnable"];
    textField.setPasswordEnabled(passwordEnable);
    if (passwordEnable)textField.setPasswordStyleText(options["passwordStyleText"]);
    this.setColorPropsForWidgetFromJsonDictionary(widget, options)
}, setPropsForLoadingBarFromJsonDictionary: function (widget, options) {
    this.setPropsForWidgetFromJsonDictionary(widget, options);
    var loadingBar = widget;
    var imageFileNameDic = options["textureData"];
    var imageFileNameType = imageFileNameDic["resourceType"];
    switch (imageFileNameType) {
        case 0:
            var tp_i = this._filePath;
            var imageFileName =
                imageFileNameDic["path"];
            var imageFileName_tp = null;
            if (imageFileName) {
                imageFileName_tp = tp_i + imageFileName;
                loadingBar.loadTexture(imageFileName_tp)
            }
            break;
        case 1:
            var imageFileName = imageFileNameDic["path"];
            loadingBar.loadTexture(imageFileName, ccui.Widget.PLIST_TEXTURE);
            break;
        default:
            break
    }
    imageFileNameDic = null;
    var scale9Enable = options["scale9Enable"];
    loadingBar.setScale9Enabled(scale9Enable);
    if (scale9Enable) {
        var cx = options["capInsetsX"];
        var cy = options["capInsetsY"];
        var cw = options["capInsetsWidth"];
        var ch =
            options["capInsetsHeight"];
        loadingBar.setCapInsets(cc.rect(cx, cy, cw, ch));
        var width = options["width"];
        var height = options["height"];
        loadingBar.setSize(cc.size(width, height))
    }
    loadingBar.setDirection(options["direction"]);
    loadingBar.setPercent(options["percent"]);
    this.setColorPropsForWidgetFromJsonDictionary(widget, options)
}, setPropsForListViewFromJsonDictionary: function (widget, options) {
    this.setPropsForLayoutFromJsonDictionary(widget, options);
    var innerWidth = options["innerWidth"] || 0;
    var innerHeight = options["innerHeight"] ||
        0;
    widget.setInnerContainerSize(cc.size(innerWidth, innerHeight));
    widget.setDirection(options["direction"] || 0);
    widget.setGravity(options["gravity"] || 0);
    widget.setItemsMargin(options["itemMargin"] || 0)
}, setPropsForPageViewFromJsonDictionary: function (widget, options) {
    this.setPropsForLayoutFromJsonDictionary(widget, options)
}, setPropsForLabelBMFontFromJsonDictionary: function (widget, options) {
    this.setPropsForWidgetFromJsonDictionary(widget, options);
    var labelBMFont = widget;
    var cmftDic = options["fileNameData"];
    var cmfType = cmftDic["resourceType"];
    switch (cmfType) {
        case 0:
            var cmfPath = cmftDic["path"];
            var cmf_tp = this._filePath + cmfPath;
            labelBMFont.setFntFile(cmf_tp);
            break;
        case 1:
            cc.log("Wrong res type of LabelAtlas!");
            break;
        default:
            break
    }
    cmftDic = null;
    var text = options["text"];
    labelBMFont.setText(text);
    this.setColorPropsForWidgetFromJsonDictionary(widget, options)
}});
ccs.sceneReader = {_baseBath: "", _listener: null, _selector: null, _node: null, createNodeWithSceneFile: function (pszFileName) {
    this._baseBath = cc.path.dirname(pszFileName);
    var jsonDict = cc.loader.getRes(pszFileName);
    if (!jsonDict)throw"Please load the resource first : " + pszFileName;
    this._node = this.createObject(jsonDict, null);
    ccs.triggerManager.parse(jsonDict["Triggers"] || []);
    return this._node
}, createObject: function (inputFiles, parenet) {
    var className = inputFiles["classname"];
    if (className == "CCNode") {
        var gb = null;
        if (!parenet)gb =
            cc.Node.create(); else {
            gb = cc.Node.create();
            parenet.addChild(gb)
        }
        this.setPropertyFromJsonDict(gb, inputFiles);
        var components = inputFiles["components"];
        for (var i = 0; i < components.length; i++) {
            var subDict = components[i];
            if (!subDict)break;
            var className = subDict["classname"];
            var comName = subDict["name"];
            var fileData = subDict["fileData"];
            var path = "", plistFile = "";
            var resType = 0;
            if (fileData != null) {
                if (fileData["resourceType"] !== undefined)resType = fileData["resourceType"]; else resType = -1;
                path = cc.path.join(this._baseBath,
                    fileData["path"]);
                plistFile = fileData["plistFile"]
            }
            var pathExtname = cc.path.extname(path);
            if (className == "CCSprite") {
                var sprite = null;
                if (resType == 0) {
                    if (pathExtname != ".png")continue;
                    sprite = cc.Sprite.create(path)
                } else if (resType == 1) {
                    if (pathExtname != ".plist")continue;
                    plistFile = cc.path.join(this._baseBath, plistFile);
                    var pngFile = cc.path.changeExtname(plistFile, ".png");
                    cc.spriteFrameCache.addSpriteFrames(plistFile, pngFile);
                    sprite = cc.Sprite.create("#" + fileData["path"])
                } else continue;
                var render = ccs.ComRender.create(sprite,
                    "CCSprite");
                if (comName != null)render.setName(comName);
                gb.addComponent(render);
                this._callSelector(sprite, subDict)
            } else if (className == "CCTMXTiledMap") {
                var tmx = null;
                if (resType == 0) {
                    if (pathExtname != ".tmx")continue;
                    tmx = cc.TMXTiledMap.create(path)
                } else continue;
                var render = ccs.ComRender.create(tmx, "CCTMXTiledMap");
                if (comName != null)render.setName(comName);
                gb.addComponent(render);
                this._callSelector(tmx, subDict)
            } else if (className == "CCParticleSystemQuad") {
                if (pathExtname != ".plist")continue;
                var particle = null;
                if (resType ==
                    0)particle = cc.ParticleSystem.create(path); else {
                    cc.log("unknown resourcetype on CCParticleSystemQuad!");
                    continue
                }
                particle.setPosition(0, 0);
                var render = ccs.ComRender.create(particle, "CCParticleSystemQuad");
                if (comName != null)render.setName(comName);
                gb.addComponent(render);
                this._callSelector(particle, subDict)
            } else if (className == "CCArmature") {
                if (resType != 0)continue;
                var jsonDict = cc.loader.getRes(path);
                if (!jsonDict)cc.log("Please load the resource [%s] first!", path);
                var armature_data = jsonDict["armature_data"];
                var subData = armature_data[0];
                var name = subData["name"];
                ccs.armatureDataManager.addArmatureFileInfo(path);
                var armature = ccs.Armature.create(name);
                var render = ccs.ComRender.create(armature, "CCArmature");
                if (comName != null)render.setName(comName);
                gb.addComponent(render);
                var actionName = subDict["selectedactionname"];
                if (actionName && armature.getAnimation())armature.getAnimation().play(actionName);
                jsonDict = null;
                subData = null;
                this._callSelector(armature, subDict)
            } else if (className == "CCComAudio") {
                var audio = null;
                if (resType ==
                    0)audio = ccs.ComAudio.create(); else continue;
                audio.preloadEffect(path);
                if (comName)audio.setName(comName);
                gb.addComponent(audio);
                this._callSelector(audio, subDict)
            } else if (className == "CCComAttribute") {
                var attribute = null;
                if (resType == 0) {
                    attribute = ccs.ComAttribute.create();
                    if (path != "")attribute.parse(path)
                } else {
                    cc.log("unknown resourcetype on CCComAttribute!");
                    continue
                }
                if (comName)attribute.setName(comName);
                gb.addComponent(attribute);
                this._callSelector(attribute, subDict)
            } else if (className == "CCBackgroundAudio") {
                if (!pathExtname)continue;
                if (resType != 0)continue;
                var audio = ccs.ComAudio.create();
                audio.preloadBackgroundMusic(path);
                audio.setFile(path);
                var bLoop = Boolean(subDict["loop"] || 0);
                audio.setLoop(bLoop);
                if (comName)audio.setName(comName);
                gb.addComponent(audio);
                audio.playBackgroundMusic(path, bLoop);
                this._callSelector(audio, subDict)
            } else if (className == "GUIComponent") {
                var widget = ccs.uiReader.widgetFromJsonFile(path);
                var render = ccs.ComRender.create(widget, "GUIComponent");
                if (comName != null)render.setName(comName);
                gb.addComponent(render);
                this._callSelector(audio, subDict)
            }
            subDict = null
        }
        var gameobjects = inputFiles["gameobjects"];
        for (var i = 0; i < gameobjects.length; i++) {
            var subDict = gameobjects[i];
            if (!subDict)break;
            this.createObject(subDict, gb);
            subDict = null
        }
        return gb
    }
    return null
}, nodeByTag: function (parent, tag) {
    if (parent == null)return null;
    var retNode = null;
    var children = parent.getChildren();
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child && child.getTag() == tag) {
            retNode = child;
            break
        } else {
            retNode = this.nodeByTag(child, tag);
            if (retNode)break
        }
    }
    return retNode
},
    getNodeByTag: function (tag) {
        if (this._node == null)return null;
        if (this._node.getTag() == tag)return this._node;
        return this.nodeByTag(this._node, tag)
    }, setPropertyFromJsonDict: function (node, dict) {
        var x = typeof dict["x"] === "undefined" ? 0 : dict["x"];
        var y = typeof dict["y"] === "undefined" ? 0 : dict["y"];
        node.setPosition(x, y);
        var bVisible = Boolean(typeof dict["visible"] === "undefined" ? 1 : dict["visible"]);
        node.setVisible(bVisible);
        var nTag = typeof dict["objecttag"] === "undefined" ? -1 : dict["objecttag"];
        node.setTag(nTag);
        var nZorder =
                typeof dict["zorder"] === "undefined" ? 0 : dict["zorder"];
        node.setLocalZOrder(nZorder);
        var fScaleX = typeof dict["scalex"] === "undefined" ? 1 : dict["scalex"];
        var fScaleY = typeof dict["scaley"] === "undefined" ? 1 : dict["scaley"];
        node.setScaleX(fScaleX);
        node.setScaleY(fScaleY);
        var fRotationZ = typeof dict["rotation"] === "undefined" ? 0 : dict["rotation"];
        node.setRotation(fRotationZ)
    }, setTarget: function (selector, listener) {
        this._listener = listener;
        this._selector = selector
    }, _callSelector: function (obj, subDict) {
        if (this._selector)this._selector.call(this._listener,
            obj, subDict)
    }, version: function () {
        return"1.2.0.0"
    }, clear: function () {
        ccs.triggerManager.removeAll();
        cc.audioEngine.end()
    }};