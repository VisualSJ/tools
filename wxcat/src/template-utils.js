TemplateUtils = (function() {

    var _inited = false,
        _templateId = null,
        _templateVars = null,
        _scenes = null,
        _share = null,
        _sceneStartFuncs = [],
        _sceneExitFuncs = [],
        _currentScene = "",
        _sceneStack = [];

    var _propertyWhiteList = [
        "x", "y",
        "width", "height",
        "boundingWidth", "boundingHeight",
        "anchorX", "anchorY",
        "scale", "scaleX", "scaleY",
        "rotation", "visible", "opacity", "color",
        "textAlign", "verticalAlign", "fontSize", "fontName", "fillStyle"
    ];

    var _demoLayer = null,
        _DEMO_DEPTH = 99999;

    /**
     * Format string util function
     */
    var _formatStr = function(){
        var args = arguments;
        var l = args.length;
        if(l < 1){
            return "";
        }
        var str = args[0];
        var needToFormat = true;
        if(typeof str == "object"){
            str = JSON.stringify(str);
            needToFormat = false;
        }
        for(var i = 1; i < l; ++i){
            var arg = args[i];
            arg = typeof arg == "object" ? JSON.stringify(arg) : arg;
            if(needToFormat){
                while(true){
                    var result = null;
                    if(typeof arg == "number"){
                        result = str.match(/(%d)|(%s)/);
                        if(result){
                            str = str.replace(/(%d)|(%s)/, arg);
                            break;
                        }
                    }
                    result = str.match(/%s/);
                    if(result){
                        str = str.replace(/%s/, arg);
                    }else{
                        str += "    " + arg;
                    }
                    break;
                }
            }else{
                str += "    " + arg;
            }
        }
        return str;
    };

    var _parser = {
        "DIRECTDATA": function(def) {
            return def["value"];
        },

        "STRING": function(def, config) {
            var args = [def["value"]], key, string;
            for (var i = 0, l = def["variables"] ?def["variables"].length : 0; i < l; ++i) {
                key = def["variables"][i];
                if (config && config[key] !== undefined)
                    args.push(config[key]);
                else args.push(null);
            }
            string = _formatStr.apply(null, args);
            return string;
        },

        "IMAGE": function(def, config) {
            var tex = cc.textureCache.getTextureForKey(def["texUrl"]);
            if (!tex) {
                tex = cc.textureCache.addImage(def["texUrl"]);
            }
            // Init node
            if (tex && config && config["node"] instanceof cc.Sprite) {
                config["node"].setTexture(tex);
                config["node"].setTextureRect(cc.rect(0, 0, tex.width, tex.height));
            }
            return tex;
        },

        "ANIMATION": function(def, config) {
            var result = null, frames = [], animationFrames = [], frame, tex, rect = cc.rect(0, 0, 0, 0), interval = def["interval"] || 0.2;
            if (def["texs"] && def["texs"].length > 0) {
                for (var i = 0, l = def["texs"].length; i < l; ++i) {
                    tex = cc.textureCache.addImage(def["texs"][i]);
                    rect.width = tex.width;
                    rect.height = tex.height;
                    frame = new cc.SpriteFrame(tex, rect);
                    frames.push(frame);
                }
            }
            else if (def["texUrl"]) {
                var row = def["row"], col = def["col"], unitW, unitH;
                tex = cc.textureCache.addImage(def["texUrl"]);
                rect.width = unitW = Math.floor(tex.width/col);
                rect.height = unitH = Math.floor(tex.height/row);
                for (var r = 0; r < row; ++r){
                    for (var c = 0; c < col; ++c) {
                        rect.x = c * unitW;
                        rect.y = r * unitH;
                        frame = new cc.SpriteFrame(tex, rect);
                        frames.push(frame);
                    }
                }
            }
            else
                return result;

            if (def["sequence"]) {
                for (var i = 0, l = def["sequence"].length; i < l; ++i) {
                    var index = def["sequence"][i];
                    index < frames.length && index >= 0 && animationFrames.push(frames[index]);
                }
            }
            else animationFrames = frames;

            // Init node
            if (config && config["node"] instanceof cc.Sprite && animationFrames.length > 0) {
                config["node"].setSpriteFrame(animationFrames[0]);
            }
            result = new cc.Animation(animationFrames, interval);
            return result;
        },

        "LABEL": function(def, config) {
            var args = [def["string"]], key, string;
            for (var i = 0, l = def["variables"] ?def["variables"].length : 0; i < l; ++i) {
                key = def["variables"][i];
                if (config && config[key] !== undefined)
                    args.push(config[key]);
                else args.push(null);
            }
            string = _formatStr.apply(null, args);
            return new cc.LabelTTF(string, def["fontName"] || "Arial", def["fontSize"] || "12");
        },

        "SOUND": function(def) {
            return null;
        }
    };

    var _getDisplayNode = {
        "IMAGE": function(name) {
            var node = new cc.Sprite();
            TemplateUtils.getVariable(name, {node: node});
            return node;
        },

        "ANIMATION": function(name) {
            var node = new cc.Sprite();
            var animation = TemplateUtils.getVariable(name, {node: node});
            node.runAction(cc.animate(animation).repeatForever());
            return node;
        },

        "LABEL": function(name) {
            return TemplateUtils.getVariable(name);
        }
    };

    var _parseValue = function (key, value) {
        var result;
        switch(key) {
            case "color":
            case "fillStyle":
                result = cc.color(value);
                break;
            case "textAlign":
            case "verticalAlign":
                result = cc[value];
                break;
            default :
                result = value;
                break;
        }
        return result;
    };

    return {
        init: function(jsonObj) {
            _templateId = jsonObj["templateId"];
            _templateVars = jsonObj["templateVars"];
            _scenes = jsonObj["scenes"];
            _share = jsonObj.share;
            _demoLayer = new cc.LayerColor(cc.color(0, 0, 0));
            _inited = true;
        },

        getTemplateVars: function() {
            return _templateVars;
        },

        getShare: function() {
            return _share;
        },

        getSceneVars: function(scene) {
            return _scenes[scene];
        },

        getResourcesList: function() {
            var def, i, res = [];
            for (i in _templateVars) {
                def = _templateVars[i];
                if (def["texUrl"]) {
                    res.push(def["texUrl"]);
                }
                else if (def["texs"]) {
                    res = res.concat(def["texs"]);
                }
            }
            return res;
        },

        registerScene: function(scene, startFunc, exitFunc) {
            if (typeof startFunc == "function") {
                _sceneStartFuncs[scene] = startFunc;
            }
            if (typeof exitFunc == "function") {
                _sceneExitFuncs[scene] = exitFunc;
            }
        },

        runScene: function(scene) {
            if (_sceneStartFuncs[scene]) {
                _sceneExitFuncs[_currentScene] && _sceneExitFuncs[_currentScene]();

                _currentScene = scene;
                _sceneStack.length = 0;
                _sceneStack.push(_currentScene);

                _sceneStartFuncs[scene]();
            }
        },

        reloadCurrentScene: function() {
            this.runScene(_currentScene);
        },

        pushScene: function(scene) {
            if (_sceneStartFuncs[scene] && _currentScene != scene) {
                _currentScene = scene;
                _sceneStack.push(_currentScene);
                _sceneStartFuncs[scene]();
            }
        },

        popScene: function() {
            if (_sceneExitFuncs[_currentScene]) {
                _sceneExitFuncs[_currentScene]();
                var lastid = _sceneStack.length - 1;
                if (lastid >= 0 && _sceneStack[lastid] == _currentScene) {
                    _sceneStack.pop();
                    if (lastid > 0)
                        _currentScene = _sceneStack[lastid-1];
                    else _currentScene = "";
                }
            }
        },

        pauseGame: function() {
            cc.director.pause();
        },

        resumeGame: function() {
            cc.director.resume();
        },

        getVariable: function(name, config) {
            if (!_inited) return null;
            var def = _templateVars[name];
            var parser, result = null;
            var node = config && config["node"] instanceof cc.Node ?  config["node"] : null;
            var attrs = {}, key, value, sceneDef;

            parser = _parser[def["type"]];
            if (parser) {
                result = parser(def, config);
                if (result && result instanceof cc.Node)
                    node = result;
            }

            if (node) {
                if (_currentScene && _scenes[_currentScene]) {
                    sceneDef = _scenes[_currentScene][name];
                }

                for (var i = 0, l = _propertyWhiteList.length; i < l; ++i) {
                    key = _propertyWhiteList[i];
                    // Scene def have a higher priority
                    if (sceneDef && undefined !== sceneDef[key])
                        value = sceneDef[key];
                    else if (undefined !== def[key])
                        value = def[key];
                    else continue;

                    attrs[key] = _parseValue(key, value);
                }

                node.attr(attrs);
            }

            return result;
        },

        showVariable: function(name, config) {
            if (!_inited) return;
            var def = _templateVars[name], node;
            // Retrieve temporary node
            if (def && _getDisplayNode[def["type"]])
                node = _getDisplayNode[def["type"]](name, config);
            // Add node to current scene
            if (node instanceof cc.Node) {
                var scene = cc.director.getRunningScene();
                _demoLayer.removeAllChildren(true);
                scene.removeChild(_demoLayer);

                _demoLayer.width = cc.winSize.width;
                _demoLayer.height = cc.winSize.height;
                node.anchorX = 0.5;
                node.anchorY = 0.5;
                node.x = cc.winSize.width/2;
                node.y = cc.winSize.height/2;
                _demoLayer.addChild(node);
                scene.addChild(_demoLayer, _DEMO_DEPTH);
            }
        },

        hideVariableDemo: function() {
            if (!_inited) return;
            var scene = cc.director.getRunningScene();
            _demoLayer.removeAllChildren(true);
            scene.removeChild(_demoLayer);
        }
    };
})();