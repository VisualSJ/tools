cc.TGA_OK = 0;
cc.TGA_ERROR_FILE_OPEN = 1;
cc.TGA_ERROR_READING_FILE = 2;
cc.TGA_ERROR_INDEXED_COLOR = 3;
cc.TGA_ERROR_MEMORY = 4;
cc.TGA_ERROR_COMPRESSED_FILE = 5;
cc.ImageTGA = function (status, type, pixelDepth, width, height, imageData, flipped) {
    this.status = status || 0;
    this.type = type || 0;
    this.pixelDepth = pixelDepth || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.imageData = imageData || [];
    this.flipped = flipped || 0
};
cc.tgaLoadHeader = function (buffer, bufSize, psInfo) {
    var step = 2;
    if (step + 1 > bufSize)return false;
    var binaryReader = new cc.BinaryStreamReader(buffer);
    binaryReader.setOffset(step);
    psInfo.type = binaryReader.readByte();
    step += 10;
    if (step + 4 + 1 > bufSize)return false;
    binaryReader.setOffset(step);
    psInfo.width = binaryReader.readUnsignedShort();
    psInfo.height = binaryReader.readUnsignedInteger();
    psInfo.pixelDepth = binaryReader.readByte();
    step += 5;
    if (step + 1 > bufSize)return false;
    var garbage = binaryReader.readByte();
    psInfo.flipped =
        0;
    if (garbage & 32)psInfo.flipped = 1;
    return true
};
cc.tgaLoadImageData = function (buffer, bufSize, psInfo) {
    var mode, total, i, aux;
    var step = 18;
    mode = 0 | psInfo.pixelDepth / 2;
    total = psInfo.height * psInfo.width * mode;
    if (step + total > bufSize)return false;
    psInfo.imageData = cc.__getSubArray(buffer, step, step + total);
    if (mode >= 3)for (i = 0; i < total; i += mode) {
        aux = psInfo.imageData[i];
        psInfo.imageData[i] = psInfo.imageData[i + 2];
        psInfo.imageData[i + 2] = aux
    }
    return true
};
cc.tgaRGBtogreyscale = function (psInfo) {
    var i, j;
    if (psInfo.pixelDepth === 8)return;
    var mode = psInfo.pixelDepth / 8;
    var newImageData = new Uint8Array(psInfo.height * psInfo.width);
    if (newImageData === null)return;
    for (i = 0, j = 0; j < psInfo.width * psInfo.height; i += mode, j++)newImageData[j] = 0.3 * psInfo.imageData[i] + 0.59 * psInfo.imageData[i + 1] + 0.11 * psInfo.imageData[i + 2];
    psInfo.pixelDepth = 8;
    psInfo.type = 3;
    psInfo.imageData = newImageData
};
cc.tgaDestroy = function (psInfo) {
    if (!psInfo)return;
    psInfo.imageData = null;
    psInfo = null
};
cc.tgaLoadRLEImageData = function (buffer, bufSize, psInfo) {
    var mode, total, i, index = 0, skip = 0, flag = 0;
    var aux = [], runlength = 0;
    var step = 18;
    mode = psInfo.pixelDepth / 8;
    total = psInfo.height * psInfo.width;
    for (i = 0; i < total; i++) {
        if (runlength != 0) {
            runlength--;
            skip = flag != 0
        } else {
            if (step + 1 > bufSize)break;
            runlength = buffer[step];
            step += 1;
            flag = runlength & 128;
            if (flag)runlength -= 128;
            skip = 0
        }
        if (!skip) {
            if (step + mode > bufSize)break;
            aux = cc.__getSubArray(buffer, step, step + mode);
            step += mode;
            if (mode >= 3) {
                var tmp = aux[0];
                aux[0] = aux[2];
                aux[2] = tmp
            }
        }
        for (var j =
            0; j < mode; j++)psInfo.imageData[index + j] = aux[j];
        index += mode
    }
    return true
};
cc.tgaFlipImage = function (psInfo) {
    var mode = psInfo.pixelDepth / 8;
    var rowbytes = psInfo.width * mode;
    for (var y = 0; y < psInfo.height / 2; y++) {
        var row = cc.__getSubArray(psInfo.imageData, y * rowbytes, y * rowbytes + rowbytes);
        cc.__setDataToArray(cc.__getSubArray(psInfo.imageData, (psInfo.height - (y + 1)) * rowbytes, rowbytes), psInfo.imageData, y * rowbytes);
        cc.__setDataToArray(row, psInfo.imageData, (psInfo.height - (y + 1)) * rowbytes)
    }
    psInfo.flipped = 0
};
cc.__getSubArray = function (array, start, end) {
    if (array instanceof Array)return array.slice(start, end); else return array.subarray(start, end)
};
cc.__setDataToArray = function (sourceData, destArray, startIndex) {
    for (var i = 0; i < sourceData.length; i++)destArray[startIndex + i] = sourceData[i]
};
cc.BinaryStreamReader = cc.Class.extend({_binaryData: null, _offset: 0, ctor: function (binaryData) {
    this._binaryData = binaryData
}, setBinaryData: function (binaryData) {
    this._binaryData = binaryData;
    this._offset = 0
}, getBinaryData: function () {
    return this._binaryData
}, _checkSize: function (neededBits) {
    if (!(this._offset + Math.ceil(neededBits / 8) < this._data.length))throw new Error("Index out of bound");
}, _decodeFloat: function (precisionBits, exponentBits) {
    var length = precisionBits + exponentBits + 1;
    var size = length >> 3;
    this._checkSize(length);
    var bias = Math.pow(2, exponentBits - 1) - 1;
    var signal = this._readBits(precisionBits + exponentBits, 1, size);
    var exponent = this._readBits(precisionBits, exponentBits, size);
    var significand = 0;
    var divisor = 2;
    var curByte = 0;
    do {
        var byteValue = this._readByte(++curByte, size);
        var startBit = precisionBits % 8 || 8;
        var mask = 1 << startBit;
        while (mask >>= 1) {
            if (byteValue & mask)significand += 1 / divisor;
            divisor *= 2
        }
    } while (precisionBits -= startBit);
    this._offset += size;
    return exponent == (bias << 1) + 1 ? significand ? NaN : signal ? -Infinity : +Infinity : (1 +
        signal * -2) * (exponent || significand ? !exponent ? Math.pow(2, -bias + 1) * significand : Math.pow(2, exponent - bias) * (1 + significand) : 0)
}, _readByte: function (i, size) {
    return this._data[this._offset + size - i - 1]
}, _decodeInt: function (bits, signed) {
    var x = this._readBits(0, bits, bits / 8), max = Math.pow(2, bits);
    var result = signed && x >= max / 2 ? x - max : x;
    this._offset += bits / 8;
    return result
}, _shl: function (a, b) {
    for (++b; --b; a = ((a %= 2147483647 + 1) & 1073741824) == 1073741824 ? a * 2 : (a - 1073741824) * 2 + 2147483647 + 1);
    return a
}, _readBits: function (start, length, size) {
    var offsetLeft = (start + length) % 8;
    var offsetRight = start % 8;
    var curByte = size - (start >> 3) - 1;
    var lastByte = size + (-(start + length) >> 3);
    var diff = curByte - lastByte;
    var sum = this._readByte(curByte, size) >> offsetRight & (1 << (diff ? 8 - offsetRight : length)) - 1;
    if (diff && offsetLeft)sum += (this._readByte(lastByte++, size) & (1 << offsetLeft) - 1) << (diff-- << 3) - offsetRight;
    while (diff)sum += this._shl(this._readByte(lastByte++, size), (diff-- << 3) - offsetRight);
    return sum
}, readInteger: function () {
    return this._decodeInt(32, true)
}, readUnsignedInteger: function () {
    return this._decodeInt(32,
        false)
}, readSingle: function () {
    return this._decodeFloat(23, 8)
}, readShort: function () {
    return this._decodeInt(16, true)
}, readUnsignedShort: function () {
    return this._decodeInt(16, false)
}, readByte: function () {
    var readByte = this._data[this._offset];
    this._offset += 1;
    return readByte
}, readData: function (start, end) {
    if (this._binaryData instanceof Array)return this._binaryData.slice(start, end); else return this._binaryData.subarray(start, end)
}, setOffset: function (offset) {
    this._offset = offset
}, getOffset: function () {
    return this._offset
}});
cc.TMX_ORIENTATION_ORTHO = 0;
cc.TMX_ORIENTATION_HEX = 1;
cc.TMX_ORIENTATION_ISO = 2;
cc.TMXTiledMap = cc.NodeRGBA.extend({properties: null, mapOrientation: null, objectGroups: null, _mapSize: null, _tileSize: null, _tileProperties: null, _className: "TMXTiledMap", ctor: function (tmxFile, resourcePath) {
    cc.Node.prototype.ctor.call(this);
    this._mapSize = cc.size(0, 0);
    this._tileSize = cc.size(0, 0);
    if (resourcePath !== undefined)this.initWithXML(tmxFile, resourcePath); else if (tmxFile !== undefined)this.initWithTMXFile(tmxFile)
}, getMapSize: function () {
    return cc.size(this._mapSize.width, this._mapSize.height)
}, setMapSize: function (Var) {
    this._mapSize.width =
        Var.width;
    this._mapSize.height = Var.height
}, _getMapWidth: function () {
    return this._mapSize.width
}, _setMapWidth: function (width) {
    this._mapSize.width = width
}, _getMapHeight: function () {
    return this._mapSize.height
}, _setMapHeight: function (height) {
    this._mapSize.height = height
}, getTileSize: function () {
    return cc.size(this._tileSize.width, this._tileSize.height)
}, setTileSize: function (Var) {
    this._tileSize.width = Var.width;
    this._tileSize.height = Var.height
}, _getTileWidth: function () {
    return this._tileSize.width
}, _setTileWidth: function (width) {
    this._tileSize.width =
        width
}, _getTileHeight: function () {
    return this._tileSize.height
}, _setTileHeight: function (height) {
    this._tileSize.height = height
}, getMapOrientation: function () {
    return this.mapOrientation
}, setMapOrientation: function (Var) {
    this.mapOrientation = Var
}, getObjectGroups: function () {
    return this.objectGroups
}, setObjectGroups: function (Var) {
    this.objectGroups = Var
}, getProperties: function () {
    return this.properties
}, setProperties: function (Var) {
    this.properties = Var
}, initWithTMXFile: function (tmxFile) {
    if (!tmxFile || tmxFile.length ==
        0)throw"cc.TMXTiledMap.initWithTMXFile(): tmxFile should be non-null or non-empty string.";
    this.width = 0;
    this.height = 0;
    var mapInfo = cc.TMXMapInfo.create(tmxFile);
    if (!mapInfo)return false;
    var locTilesets = mapInfo.getTilesets();
    if (!locTilesets || locTilesets.length === 0)cc.log("cc.TMXTiledMap.initWithTMXFile(): Map not found. Please check the filename.");
    this._buildWithMapInfo(mapInfo);
    return true
}, initWithXML: function (tmxString, resourcePath) {
    this.width = 0;
    this.height = 0;
    var mapInfo = cc.TMXMapInfo.create(tmxString,
        resourcePath);
    var locTilesets = mapInfo.getTilesets();
    if (!locTilesets || locTilesets.length === 0)cc.log("cc.TMXTiledMap.initWithXML(): Map not found. Please check the filename.");
    this._buildWithMapInfo(mapInfo);
    return true
}, _buildWithMapInfo: function (mapInfo) {
    this._mapSize = mapInfo.getMapSize();
    this._tileSize = mapInfo.getTileSize();
    this.mapOrientation = mapInfo.orientation;
    this.objectGroups = mapInfo.getObjectGroups();
    this.properties = mapInfo.properties;
    this._tileProperties = mapInfo.getTileProperties();
    var idx =
        0;
    var layers = mapInfo.getLayers();
    if (layers) {
        var layerInfo = null;
        for (var i = 0, len = layers.length; i < len; i++) {
            layerInfo = layers[i];
            if (layerInfo && layerInfo.visible) {
                var child = this._parseLayer(layerInfo, mapInfo);
                this.addChild(child, idx, idx);
                this.width = Math.max(this.width, child.width);
                this.height = Math.max(this.height, child.height);
                idx++
            }
        }
    }
}, allLayers: function () {
    var retArr = [], locChildren = this._children;
    for (var i = 0, len = locChildren.length; i < len; i++) {
        var layer = locChildren[i];
        if (layer && layer instanceof cc.TMXLayer)retArr.push(layer)
    }
    return retArr
},
    getLayer: function (layerName) {
        if (!layerName || layerName.length === 0)throw"cc.TMXTiledMap.getLayer(): layerName should be non-null or non-empty string.";
        var locChildren = this._children;
        for (var i = 0; i < locChildren.length; i++) {
            var layer = locChildren[i];
            if (layer && layer.layerName == layerName)return layer
        }
        return null
    }, getObjectGroup: function (groupName) {
        if (!groupName || groupName.length === 0)throw"cc.TMXTiledMap.getObjectGroup(): groupName should be non-null or non-empty string.";
        if (this.objectGroups)for (var i = 0; i <
            this.objectGroups.length; i++) {
            var objectGroup = this.objectGroups[i];
            if (objectGroup && objectGroup.groupName == groupName)return objectGroup
        }
        return null
    }, getProperty: function (propertyName) {
        return this.properties[propertyName.toString()]
    }, propertiesForGID: function (GID) {
        return this._tileProperties[GID]
    }, _parseLayer: function (layerInfo, mapInfo) {
        var tileset = this._tilesetForLayer(layerInfo, mapInfo);
        var layer = cc.TMXLayer.create(tileset, layerInfo, mapInfo);
        layerInfo.ownTiles = false;
        layer.setupTiles();
        return layer
    },
    _tilesetForLayer: function (layerInfo, mapInfo) {
        var size = layerInfo._layerSize;
        var tilesets = mapInfo.getTilesets();
        if (tilesets)for (var i = tilesets.length - 1; i >= 0; i--) {
            var tileset = tilesets[i];
            if (tileset)for (var y = 0; y < size.height; y++)for (var x = 0; x < size.width; x++) {
                var pos = x + size.width * y;
                var gid = layerInfo._tiles[pos];
                if (gid != 0)if ((gid & cc.TMX_TILE_FLIPPED_MASK) >>> 0 >= tileset.firstGid)return tileset
            }
        }
        cc.log("cocos2d: Warning: TMX Layer " + layerInfo.name + " has no tiles");
        return null
    }});
var _p = cc.TMXTiledMap.prototype;
_p.mapWidth;
cc.defineGetterSetter(_p, "mapWidth", _p._getMapWidth, _p._setMapWidth);
_p.mapHeight;
cc.defineGetterSetter(_p, "mapHeight", _p._getMapHeight, _p._setMapHeight);
_p.tileWidth;
cc.defineGetterSetter(_p, "tileWidth", _p._getTileWidth, _p._setTileWidth);
_p.tileHeight;
cc.defineGetterSetter(_p, "tileHeight", _p._getTileHeight, _p._setTileHeight);
cc.TMXTiledMap.create = function (tmxFile, resourcePath) {
    return new cc.TMXTiledMap(tmxFile, resourcePath)
};
cc.TMX_PROPERTY_NONE = 0;
cc.TMX_PROPERTY_MAP = 1;
cc.TMX_PROPERTY_LAYER = 2;
cc.TMX_PROPERTY_OBJECTGROUP = 3;
cc.TMX_PROPERTY_OBJECT = 4;
cc.TMX_PROPERTY_TILE = 5;
cc.TMX_TILE_HORIZONTAL_FLAG = 2147483648;
cc.TMX_TILE_VERTICAL_FLAG = 1073741824;
cc.TMX_TILE_DIAGONAL_FLAG = 536870912;
cc.TMX_TILE_FLIPPED_ALL = (cc.TMX_TILE_HORIZONTAL_FLAG | cc.TMX_TILE_VERTICAL_FLAG | cc.TMX_TILE_DIAGONAL_FLAG) >>> 0;
cc.TMX_TILE_FLIPPED_MASK = ~cc.TMX_TILE_FLIPPED_ALL >>> 0;
cc.TMXLayerInfo = cc.Class.extend({properties: null, name: "", _layerSize: null, _tiles: null, visible: null, _opacity: null, ownTiles: true, _minGID: 1E5, _maxGID: 0, offset: null, ctor: function () {
    this.properties = [];
    this.name = "";
    this._layerSize = null;
    this._tiles = [];
    this.visible = true;
    this._opacity = 0;
    this.ownTiles = true;
    this._minGID = 1E5;
    this._maxGID = 0;
    this.offset = cc.p(0, 0)
}, getProperties: function () {
    return this.properties
}, setProperties: function (value) {
    this.properties = value
}});
cc.TMXTilesetInfo = cc.Class.extend({name: "", firstGid: 0, _tileSize: null, spacing: 0, margin: 0, sourceImage: "", imageSize: null, ctor: function () {
    this._tileSize = cc.size(0, 0);
    this.imageSize = cc.size(0, 0)
}, rectForGID: function (gid) {
    var rect = cc.rect(0, 0, 0, 0);
    rect.width = this._tileSize.width;
    rect.height = this._tileSize.height;
    gid &= cc.TMX_TILE_FLIPPED_MASK;
    gid = gid - parseInt(this.firstGid, 10);
    var max_x = parseInt((this.imageSize.width - this.margin * 2 + this.spacing) / (this._tileSize.width + this.spacing), 10);
    rect.x = parseInt(gid %
        max_x * (this._tileSize.width + this.spacing) + this.margin, 10);
    rect.y = parseInt(parseInt(gid / max_x, 10) * (this._tileSize.height + this.spacing) + this.margin, 10);
    return rect
}});
cc.TMXMapInfo = cc.SAXParser.extend({properties: null, orientation: null, parentElement: null, parentGID: null, layerAttrs: 0, storingCharacters: false, tmxFileName: null, currentString: null, _objectGroups: null, _mapSize: null, _tileSize: null, _layers: null, _tilesets: null, _tileProperties: null, _resources: "", _currentFirstGID: 0, ctor: function (tmxFile, resourcePath) {
    cc.SAXParser.prototype.ctor.apply(this);
    this._mapSize = cc.size(0, 0);
    this._tileSize = cc.size(0, 0);
    this._layers = [];
    this._tilesets = [];
    this._objectGroups = [];
    this.properties =
        [];
    this._tileProperties = {};
    this._currentFirstGID = 0;
    if (resourcePath !== undefined)this.initWithXML(tmxFile, resourcePath); else if (tmxFile !== undefined)this.initWithTMXFile(tmxFile)
}, getOrientation: function () {
    return this.orientation
}, setOrientation: function (value) {
    this.orientation = value
}, getMapSize: function () {
    return cc.size(this._mapSize.width, this._mapSize.height)
}, setMapSize: function (value) {
    this._mapSize.width = value.width;
    this._mapSize.height = value.height
}, _getMapWidth: function () {
    return this._mapSize.width
},
    _setMapWidth: function (width) {
        this._mapSize.width = width
    }, _getMapHeight: function () {
        return this._mapSize.height
    }, _setMapHeight: function (height) {
        this._mapSize.height = height
    }, getTileSize: function () {
        return cc.size(this._tileSize.width, this._tileSize.height)
    }, setTileSize: function (value) {
        this._tileSize.width = value.width;
        this._tileSize.height = value.height
    }, _getTileWidth: function () {
        return this._tileSize.width
    }, _setTileWidth: function (width) {
        this._tileSize.width = width
    }, _getTileHeight: function () {
        return this._tileSize.height
    },
    _setTileHeight: function (height) {
        this._tileSize.height = height
    }, getLayers: function () {
        return this._layers
    }, setLayers: function (value) {
        this._layers.push(value)
    }, getTilesets: function () {
        return this._tilesets
    }, setTilesets: function (value) {
        this._tilesets.push(value)
    }, getObjectGroups: function () {
        return this._objectGroups
    }, setObjectGroups: function (value) {
        this._objectGroups.push(value)
    }, getParentElement: function () {
        return this.parentElement
    }, setParentElement: function (value) {
        this.parentElement = value
    }, getParentGID: function () {
        return this.parentGID
    },
    setParentGID: function (value) {
        this.parentGID = value
    }, getLayerAttribs: function () {
        return this.layerAttrs
    }, setLayerAttribs: function (value) {
        this.layerAttrs = value
    }, getStoringCharacters: function () {
        return this.storingCharacters
    }, setStoringCharacters: function (value) {
        this.storingCharacters = value
    }, getProperties: function () {
        return this.properties
    }, setProperties: function (value) {
        this.properties = value
    }, initWithTMXFile: function (tmxFile) {
        this._internalInit(tmxFile, null);
        return this.parseXMLFile(tmxFile)
    }, initWithXML: function (tmxString, resourcePath) {
        this._internalInit(null, resourcePath);
        return this.parseXMLString(tmxString)
    }, parseXMLFile: function (tmxFile, isXmlString) {
        isXmlString = isXmlString || false;
        var xmlStr = isXmlString ? tmxFile : cc.loader.getRes(tmxFile);
        if (!xmlStr)throw"Please load the resource first : " + tmxFile;
        var mapXML = this._parseXML(xmlStr);
        var i, j;
        var map = mapXML.documentElement;
        var version = map.getAttribute("version");
        var orientationStr = map.getAttribute("orientation");
        if (map.nodeName == "map") {
            if (version != "1.0" && version !== null)cc.log("cocos2d: TMXFormat: Unsupported TMX version:" +
                version);
            if (orientationStr == "orthogonal")this.orientation = cc.TMX_ORIENTATION_ORTHO; else if (orientationStr == "isometric")this.orientation = cc.TMX_ORIENTATION_ISO; else if (orientationStr == "hexagonal")this.orientation = cc.TMX_ORIENTATION_HEX; else if (orientationStr !== null)cc.log("cocos2d: TMXFomat: Unsupported orientation:" + orientationStr);
            var mapSize = cc.size(0, 0);
            mapSize.width = parseFloat(map.getAttribute("width"));
            mapSize.height = parseFloat(map.getAttribute("height"));
            this.setMapSize(mapSize);
            mapSize = cc.size(0,
                0);
            mapSize.width = parseFloat(map.getAttribute("tilewidth"));
            mapSize.height = parseFloat(map.getAttribute("tileheight"));
            this.setTileSize(mapSize);
            var propertyArr = map.querySelectorAll("map \x3e properties \x3e  property");
            if (propertyArr) {
                var aPropertyDict = {};
                for (i = 0; i < propertyArr.length; i++)aPropertyDict[propertyArr[i].getAttribute("name")] = propertyArr[i].getAttribute("value");
                this.properties = aPropertyDict
            }
        }
        var tilesets = map.getElementsByTagName("tileset");
        if (map.nodeName !== "map") {
            tilesets = [];
            tilesets.push(map)
        }
        for (i =
                 0; i < tilesets.length; i++) {
            var selTileset = tilesets[i];
            var tsxName = selTileset.getAttribute("source");
            if (tsxName) {
                var tsxPath = isXmlString ? cc.path.join(this._resources, tsxName) : cc.path.changeBasename(tmxFile, tsxName);
                this.parseXMLFile(tsxPath)
            } else {
                var tileset = new cc.TMXTilesetInfo;
                tileset.name = selTileset.getAttribute("name") || "";
                tileset.firstGid = parseInt(selTileset.getAttribute("firstgid")) || 0;
                tileset.spacing = parseInt(selTileset.getAttribute("spacing")) || 0;
                tileset.margin = parseInt(selTileset.getAttribute("margin")) ||
                    0;
                var tilesetSize = cc.size(0, 0);
                tilesetSize.width = parseFloat(selTileset.getAttribute("tilewidth"));
                tilesetSize.height = parseFloat(selTileset.getAttribute("tileheight"));
                tileset._tileSize = tilesetSize;
                var image = selTileset.getElementsByTagName("image")[0];
                var imagename = image.getAttribute("source");
                var num = -1;
                if (this.tmxFileName)num = this.tmxFileName.lastIndexOf("/");
                if (num !== -1) {
                    var dir = this.tmxFileName.substr(0, num + 1);
                    tileset.sourceImage = dir + imagename
                } else tileset.sourceImage = this._resources + (this._resources ?
                    "/" : "") + imagename;
                this.setTilesets(tileset);
                var tiles = selTileset.getElementsByTagName("tile");
                if (tiles)for (i = 0; i < tiles.length; i++) {
                    var t = tiles[i];
                    this.parentGID = parseInt(tileset.firstGid) + parseInt(t.getAttribute("id") || 0);
                    var tp = t.querySelectorAll("properties \x3e property");
                    if (tp) {
                        var dict = {};
                        for (j = 0; j < tp.length; j++) {
                            var name = tp[j].getAttribute("name");
                            dict[name] = tp[j].getAttribute("value")
                        }
                        this._tileProperties[this.parentGID] = dict
                    }
                }
            }
        }
        var layers = map.getElementsByTagName("layer");
        if (layers)for (i =
                            0; i < layers.length; i++) {
            var selLayer = layers[i];
            var data = selLayer.getElementsByTagName("data")[0];
            var layer = new cc.TMXLayerInfo;
            layer.name = selLayer.getAttribute("name");
            var layerSize = cc.size(0, 0);
            layerSize.width = parseFloat(selLayer.getAttribute("width"));
            layerSize.height = parseFloat(selLayer.getAttribute("height"));
            layer._layerSize = layerSize;
            var visible = selLayer.getAttribute("visible");
            layer.visible = !(visible == "0");
            var opacity = selLayer.getAttribute("opacity") || 1;
            if (opacity)layer._opacity = parseInt(255 *
                parseFloat(opacity)); else layer._opacity = 255;
            layer.offset = cc.p(parseFloat(selLayer.getAttribute("x")) || 0, parseFloat(selLayer.getAttribute("y")) || 0);
            var nodeValue = "";
            for (j = 0; j < data.childNodes.length; j++)nodeValue += data.childNodes[j].nodeValue;
            nodeValue = nodeValue.trim();
            var compression = data.getAttribute("compression");
            var encoding = data.getAttribute("encoding");
            if (compression && compression !== "gzip" && compression !== "zlib") {
                cc.log("cc.TMXMapInfo.parseXMLFile(): unsupported compression method");
                return null
            }
            switch (compression) {
                case "gzip":
                    layer._tiles =
                        cc.unzipBase64AsArray(nodeValue, 4);
                    break;
                case "zlib":
                    var inflator = new Zlib.Inflate(cc.Codec.Base64.decodeAsArray(nodeValue, 1));
                    layer._tiles = cc.uint8ArrayToUint32Array(inflator.decompress());
                    break;
                case null:
                case "":
                    if (encoding == "base64")layer._tiles = cc.Codec.Base64.decodeAsArray(nodeValue, 4); else if (encoding === "csv") {
                        layer._tiles = [];
                        var csvTiles = nodeValue.split(",");
                        for (var csvIdx = 0; csvIdx < csvTiles.length; csvIdx++)layer._tiles.push(parseInt(csvTiles[csvIdx]))
                    } else {
                        var selDataTiles = data.getElementsByTagName("tile");
                        layer._tiles = [];
                        for (var xmlIdx = 0; xmlIdx < selDataTiles.length; xmlIdx++)layer._tiles.push(parseInt(selDataTiles[xmlIdx].getAttribute("gid")))
                    }
                    break;
                default:
                    if (this.layerAttrs == cc.TMXLayerInfo.ATTRIB_NONE)cc.log("cc.TMXMapInfo.parseXMLFile(): Only base64 and/or gzip/zlib maps are supported");
                    break
            }
            var layerProps = selLayer.querySelectorAll("properties \x3e property");
            if (layerProps) {
                var layerProp = {};
                for (j = 0; j < layerProps.length; j++)layerProp[layerProps[j].getAttribute("name")] = layerProps[j].getAttribute("value");
                layer.properties = layerProp
            }
            this.setLayers(layer)
        }
        var objectGroups = map.getElementsByTagName("objectgroup");
        if (objectGroups)for (i = 0; i < objectGroups.length; i++) {
            var selGroup = objectGroups[i];
            var objectGroup = new cc.TMXObjectGroup;
            objectGroup.groupName = selGroup.getAttribute("name");
            objectGroup.setPositionOffset(cc.p(parseFloat(selGroup.getAttribute("x")) * this.getTileSize().width || 0, parseFloat(selGroup.getAttribute("y")) * this.getTileSize().height || 0));
            var groupProps = selGroup.querySelectorAll("objectgroup \x3e properties \x3e property");
            if (groupProps)for (j = 0; j < groupProps.length; j++) {
                var groupProp = {};
                groupProp[groupProps[j].getAttribute("name")] = groupProps[j].getAttribute("value");
                objectGroup.properties = groupProp
            }
            var objects = selGroup.querySelectorAll("object");
            if (objects)for (j = 0; j < objects.length; j++) {
                var selObj = objects[j];
                var objectProp = {};
                objectProp["name"] = selObj.getAttribute("name") || "";
                objectProp["type"] = selObj.getAttribute("type") || "";
                objectProp["x"] = parseInt(selObj.getAttribute("x") || 0) + objectGroup.getPositionOffset().x;
                var y =
                    parseInt(selObj.getAttribute("y") || 0) + objectGroup.getPositionOffset().y;
                objectProp["width"] = parseInt(selObj.getAttribute("width")) || 0;
                objectProp["height"] = parseInt(selObj.getAttribute("height")) || 0;
                objectProp["y"] = parseInt(this.getMapSize().height * this.getTileSize().height) - y - objectProp["height"];
                var docObjProps = selObj.querySelectorAll("properties \x3e property");
                if (docObjProps)for (var k = 0; k < docObjProps.length; k++)objectProp[docObjProps[k].getAttribute("name")] = docObjProps[k].getAttribute("value");
                var polygonProps = selObj.querySelectorAll("polygon");
                if (polygonProps && polygonProps.length > 0) {
                    var selPgPointStr = polygonProps[0].getAttribute("points");
                    if (selPgPointStr)objectProp["polygonPoints"] = this._parsePointsString(selPgPointStr)
                }
                var polylineProps = selObj.querySelectorAll("polyline");
                if (polylineProps && polylineProps.length > 0) {
                    var selPlPointStr = polylineProps[0].getAttribute("points");
                    if (selPlPointStr)objectProp["polylinePoints"] = this._parsePointsString(selPlPointStr)
                }
                objectGroup.setObjects(objectProp)
            }
            this.setObjectGroups(objectGroup)
        }
        return map
    },
    _parsePointsString: function (pointsString) {
        if (!pointsString)return null;
        var points = [];
        var pointsStr = pointsString.split(" ");
        for (var i = 0; i < pointsStr.length; i++) {
            var selPointStr = pointsStr[i].split(",");
            points.push({"x": selPointStr[0], "y": selPointStr[1]})
        }
        return points
    }, parseXMLString: function (xmlString) {
        return this.parseXMLFile(xmlString, true)
    }, getTileProperties: function () {
        return this._tileProperties
    }, setTileProperties: function (tileProperties) {
        this._tileProperties.push(tileProperties)
    }, getCurrentString: function () {
        return this.currentString
    },
    setCurrentString: function (currentString) {
        this.currentString = currentString
    }, getTMXFileName: function () {
        return this.tmxFileName
    }, setTMXFileName: function (fileName) {
        this.tmxFileName = fileName
    }, _internalInit: function (tmxFileName, resourcePath) {
        this._tilesets.length = 0;
        this._layers.length = 0;
        this.tmxFileName = tmxFileName;
        if (resourcePath)this._resources = resourcePath;
        this._objectGroups.length = 0;
        this.properties.length = 0;
        this._tileProperties.length = 0;
        this.currentString = "";
        this.storingCharacters = false;
        this.layerAttrs =
            cc.TMXLayerInfo.ATTRIB_NONE;
        this.parentElement = cc.TMX_PROPERTY_NONE;
        this._currentFirstGID = 0
    }});
var _p = cc.TMXMapInfo.prototype;
_p.mapWidth;
cc.defineGetterSetter(_p, "mapWidth", _p._getMapWidth, _p._setMapWidth);
_p.mapHeight;
cc.defineGetterSetter(_p, "mapHeight", _p._getMapHeight, _p._setMapHeight);
_p.tileWidth;
cc.defineGetterSetter(_p, "tileWidth", _p._getTileWidth, _p._setTileWidth);
_p.tileHeight;
cc.defineGetterSetter(_p, "tileHeight", _p._getTileHeight, _p._setTileHeight);
cc.TMXMapInfo.create = function (tmxFile, resourcePath) {
    return new cc.TMXMapInfo(tmxFile, resourcePath)
};
cc.loader.register(["tmx", "tsx"], cc._txtLoader);
cc.TMXLayerInfo.ATTRIB_NONE = 1 << 0;
cc.TMXLayerInfo.ATTRIB_BASE64 = 1 << 1;
cc.TMXLayerInfo.ATTRIB_GZIP = 1 << 2;
cc.TMXLayerInfo.ATTRIB_ZLIB = 1 << 3;
cc.TMXObjectGroup = cc.Class.extend({properties: null, groupName: "", _positionOffset: null, _objects: null, ctor: function () {
    this.groupName = "";
    this._positionOffset = cc.p(0, 0);
    this.properties = [];
    this._objects = []
}, getPositionOffset: function () {
    return this._positionOffset
}, setPositionOffset: function (offset) {
    this._positionOffset.x = offset.x;
    this._positionOffset.y = offset.y
}, getProperties: function () {
    return this.properties
}, setProperties: function (Var) {
    this.properties.push(Var)
}, getGroupName: function () {
    return this.groupName.toString()
},
    setGroupName: function (groupName) {
        this.groupName = groupName
    }, propertyNamed: function (propertyName) {
        return this.properties[propertyName]
    }, objectNamed: function (objectName) {
        if (this._objects && this._objects.length > 0) {
            var locObjects = this._objects;
            for (var i = 0, len = locObjects.length; i < len; i++) {
                var name = locObjects[i]["name"];
                if (name && name == objectName)return locObjects[i]
            }
        }
        return null
    }, getObjects: function () {
        return this._objects
    }, setObjects: function (objects) {
        this._objects.push(objects)
    }});
cc.TMXLayer = cc.SpriteBatchNode.extend({tiles: null, tileset: null, layerOrientation: null, properties: null, layerName: "", _layerSize: null, _mapTileSize: null, _opacity: 255, _minGID: null, _maxGID: null, _vertexZvalue: null, _useAutomaticVertexZ: null, _alphaFuncValue: null, _reusedTile: null, _atlasIndexArray: null, _contentScaleFactor: null, _cacheCanvas: null, _cacheContext: null, _cacheTexture: null, _subCacheCanvas: null, _subCacheContext: null, _subCacheCount: 0, _subCacheWidth: 0, _maxCachePixel: 1E7, _className: "TMXLayer", ctor: function (tilesetInfo, layerInfo, mapInfo) {
    cc.SpriteBatchNode.prototype.ctor.call(this);
    this._descendants = [];
    this._layerSize = cc.size(0, 0);
    this._mapTileSize = cc.size(0, 0);
    if (cc._renderType === cc._RENDER_TYPE_CANVAS) {
        var locCanvas = cc._canvas;
        var tmpCanvas = cc.newElement("canvas");
        tmpCanvas.width = locCanvas.width;
        tmpCanvas.height = locCanvas.height;
        this._cacheCanvas = tmpCanvas;
        this._cacheContext = this._cacheCanvas.getContext("2d");
        var tempTexture = new cc.Texture2D;
        tempTexture.initWithElement(tmpCanvas);
        tempTexture.handleLoadedTexture();
        this._cacheTexture = tempTexture;
        this.width = locCanvas.width;
        this.height = locCanvas.height;
        this._cachedParent = this
    }
    if (mapInfo !== undefined)this.initWithTilesetInfo(tilesetInfo, layerInfo, mapInfo)
}, setContentSize: function (size, height) {
    var locContentSize = this._contentSize;
    cc.Node.prototype.setContentSize.call(this, size, height);
    if (cc._renderType === cc._RENDER_TYPE_CANVAS) {
        var locCanvas = this._cacheCanvas;
        var scaleFactor = cc.contentScaleFactor();
        locCanvas.width = 0 | locContentSize.width * 1.5 * scaleFactor;
        locCanvas.height =
            0 | locContentSize.height * 1.5 * scaleFactor;
        this._cacheContext.translate(0, locCanvas.height);
        var locTexContentSize = this._cacheTexture._contentSize;
        locTexContentSize.width = locCanvas.width;
        locTexContentSize.height = locCanvas.height;
        var totalPixel = locCanvas.width * locCanvas.height;
        if (totalPixel > this._maxCachePixel) {
            if (!this._subCacheCanvas)this._subCacheCanvas = [];
            if (!this._subCacheContext)this._subCacheContext = [];
            this._subCacheCount = Math.ceil(totalPixel / this._maxCachePixel);
            var locSubCacheCanvas = this._subCacheCanvas,
                i;
            for (i = 0; i < this._subCacheCount; i++) {
                if (!locSubCacheCanvas[i]) {
                    locSubCacheCanvas[i] = document.createElement("canvas");
                    this._subCacheContext[i] = locSubCacheCanvas[i].getContext("2d")
                }
                var tmpCanvas = locSubCacheCanvas[i];
                tmpCanvas.width = this._subCacheWidth = Math.round(locCanvas.width / this._subCacheCount);
                tmpCanvas.height = locCanvas.height
            }
            for (i = this._subCacheCount; i < locSubCacheCanvas.length; i++) {
                tmpCanvas.width = 0;
                tmpCanvas.height = 0
            }
        } else this._subCacheCount = 0
    }
}, getTexture: null, _getTextureForCanvas: function () {
    return this._cacheTexture
},
    visit: null, _visitForCanvas: function (ctx) {
        var context = ctx || cc._renderContext;
        if (!this._visible)return;
        context.save();
        this.transform(ctx);
        var i, locChildren = this._children;
        if (this._cacheDirty) {
            var eglViewer = cc.view;
            eglViewer._setScaleXYForRenderTexture();
            var locCacheContext = this._cacheContext, locCacheCanvas = this._cacheCanvas;
            locCacheContext.clearRect(0, 0, locCacheCanvas.width, -locCacheCanvas.height);
            locCacheContext.save();
            locCacheContext.translate(this._anchorPointInPoints.x, -this._anchorPointInPoints.y);
            if (locChildren) {
                this.sortAllChildren();
                for (i = 0; i < locChildren.length; i++)if (locChildren[i])locChildren[i].visit(locCacheContext)
            }
            locCacheContext.restore();
            if (this._subCacheCount > 0) {
                var subCacheW = this._subCacheWidth, subCacheH = locCacheCanvas.height;
                for (i = 0; i < this._subCacheCount; i++)this._subCacheContext[i].drawImage(locCacheCanvas, i * subCacheW, 0, subCacheW, subCacheH, 0, 0, subCacheW, subCacheH)
            }
            eglViewer._resetScale();
            this._cacheDirty = false
        }
        this.draw(ctx);
        context.restore()
    }, draw: null, _drawForCanvas: function (ctx) {
        var context =
            ctx || cc._renderContext;
        var posX = 0 | -this._anchorPointInPoints.x, posY = 0 | -this._anchorPointInPoints.y;
        var eglViewer = cc.view;
        var locCacheCanvas = this._cacheCanvas;
        if (locCacheCanvas) {
            var locSubCacheCount = this._subCacheCount, locCanvasHeight = locCacheCanvas.height * eglViewer._scaleY;
            if (locSubCacheCount > 0) {
                var locSubCacheCanvasArr = this._subCacheCanvas;
                for (var i = 0; i < locSubCacheCount; i++) {
                    var selSubCanvas = locSubCacheCanvasArr[i];
                    context.drawImage(locSubCacheCanvasArr[i], 0, 0, selSubCanvas.width, selSubCanvas.height,
                            posX + i * this._subCacheWidth, -(posY + locCanvasHeight), selSubCanvas.width * eglViewer._scaleX, locCanvasHeight)
                }
            } else context.drawImage(locCacheCanvas, 0, 0, locCacheCanvas.width, locCacheCanvas.height, posX, -(posY + locCanvasHeight), locCacheCanvas.width * eglViewer._scaleX, locCanvasHeight)
        }
    }, getLayerSize: function () {
        return cc.size(this._layerSize.width, this._layerSize.height)
    }, setLayerSize: function (Var) {
        this._layerSize.width = Var.width;
        this._layerSize.height = Var.height
    }, _getLayerWidth: function () {
        return this._layerSize.width
    },
    _setLayerWidth: function (width) {
        this._layerSize.width = width
    }, _getLayerHeight: function () {
        return this._layerSize.height
    }, _setLayerHeight: function (height) {
        this._layerSize.height = height
    }, getMapTileSize: function () {
        return cc.size(this._mapTileSize.width, this._mapTileSize.height)
    }, setMapTileSize: function (Var) {
        this._mapTileSize.width = Var.width;
        this._mapTileSize.height = Var.height
    }, _getTileWidth: function () {
        return this._mapTileSize.width
    }, _setTileWidth: function (width) {
        this._mapTileSize.width = width
    }, _getTileHeight: function () {
        return this._mapTileSize.height
    },
    _setTileHeight: function (height) {
        this._mapTileSize.height = height
    }, getTiles: function () {
        return this.tiles
    }, setTiles: function (Var) {
        this.tiles = Var
    }, getTileset: function () {
        return this.tileset
    }, setTileset: function (Var) {
        this.tileset = Var
    }, getLayerOrientation: function () {
        return this.layerOrientation
    }, setLayerOrientation: function (Var) {
        this.layerOrientation = Var
    }, getProperties: function () {
        return this.properties
    }, setProperties: function (Var) {
        this.properties = Var
    }, initWithTilesetInfo: function (tilesetInfo, layerInfo, mapInfo) {
        var size =
            layerInfo._layerSize;
        var totalNumberOfTiles = parseInt(size.width * size.height);
        var capacity = totalNumberOfTiles * 0.35 + 1;
        var texture;
        if (tilesetInfo)texture = cc.textureCache.addImage(tilesetInfo.sourceImage);
        if (this.initWithTexture(texture, capacity)) {
            this.layerName = layerInfo.name;
            this._layerSize = size;
            this.tiles = layerInfo._tiles;
            this._minGID = layerInfo._minGID;
            this._maxGID = layerInfo._maxGID;
            this._opacity = layerInfo._opacity;
            this.properties = layerInfo.properties;
            this._contentScaleFactor = cc.director.getContentScaleFactor();
            this.tileset = tilesetInfo;
            this._mapTileSize = mapInfo.getTileSize();
            this.layerOrientation = mapInfo.orientation;
            var offset = this._calculateLayerOffset(layerInfo.offset);
            this.setPosition(cc.pointPixelsToPoints(offset));
            this._atlasIndexArray = [];
            this.setContentSize(cc.sizePixelsToPoints(cc.size(this._layerSize.width * this._mapTileSize.width, this._layerSize.height * this._mapTileSize.height)));
            this._useAutomaticVertexZ = false;
            this._vertexZvalue = 0;
            return true
        }
        return false
    }, releaseMap: function () {
        if (this.tiles)this.tiles =
            null;
        if (this._atlasIndexArray)this._atlasIndexArray = null
    }, getTileAt: function (pos) {
        if (!pos)throw"cc.TMXLayer.getTileAt(): pos should be non-null";
        if (pos.x >= this._layerSize.width || pos.y >= this._layerSize.height || pos.x < 0 || pos.y < 0)throw"cc.TMXLayer.getTileAt(): invalid position";
        if (!this.tiles || !this._atlasIndexArray) {
            cc.log("cc.TMXLayer.getTileAt(): TMXLayer: the tiles map has been released");
            return null
        }
        var tile = null;
        var gid = this.getTileGIDAt(pos);
        if (gid === 0)return tile;
        var z = 0 | pos.x + pos.y * this._layerSize.width;
        tile = this.getChildByTag(z);
        if (!tile) {
            var rect = this.tileset.rectForGID(gid);
            rect = cc.rectPixelsToPoints(rect);
            tile = new cc.Sprite;
            tile.initWithTexture(this.texture, rect);
            tile.batchNode = this;
            tile.setPosition(this.getPositionAt(pos));
            tile.vertexZ = this._vertexZForPos(pos);
            tile.anchorX = 0;
            tile.anchorY = 0;
            tile.opacity = this._opacity;
            var indexForZ = this._atlasIndexForExistantZ(z);
            this.addSpriteWithoutQuad(tile, indexForZ, z)
        }
        return tile
    }, getTileGIDAt: function (pos) {
        if (!pos)throw"cc.TMXLayer.getTileGIDAt(): pos should be non-null";
        if (pos.x >= this._layerSize.width || pos.y >= this._layerSize.height || pos.x < 0 || pos.y < 0)throw"cc.TMXLayer.getTileGIDAt(): invalid position";
        if (!this.tiles || !this._atlasIndexArray) {
            cc.log("cc.TMXLayer.getTileGIDAt(): TMXLayer: the tiles map has been released");
            return null
        }
        var idx = 0 | pos.x + pos.y * this._layerSize.width;
        var tile = this.tiles[idx];
        return(tile & cc.TMX_TILE_FLIPPED_MASK) >>> 0
    }, getTileFlagsAt: function (pos) {
        if (!pos)throw"cc.TMXLayer.getTileFlagsAt(): pos should be non-null";
        if (pos.x >= this._layerSize.width ||
            pos.y >= this._layerSize.height || pos.x < 0 || pos.y < 0)throw"cc.TMXLayer.getTileFlagsAt(): invalid position";
        if (!this.tiles || !this._atlasIndexArray) {
            cc.log("cc.TMXLayer.getTileFlagsAt(): TMXLayer: the tiles map has been released");
            return null
        }
        var idx = 0 | pos.x + pos.y * this._layerSize.width;
        var tile = this.tiles[idx];
        return(tile & cc.TMX_TILE_FLIPPED_ALL) >>> 0
    }, setTileGID: function (gid, pos, flags) {
        if (!pos)throw"cc.TMXLayer.setTileGID(): pos should be non-null";
        if (pos.x >= this._layerSize.width || pos.y >= this._layerSize.height ||
            pos.x < 0 || pos.y < 0)throw"cc.TMXLayer.setTileGID(): invalid position";
        if (!this.tiles || !this._atlasIndexArray) {
            cc.log("cc.TMXLayer.setTileGID(): TMXLayer: the tiles map has been released");
            return null
        }
        if (gid !== 0 && gid < this.tileset.firstGid) {
            cc.log("cc.TMXLayer.setTileGID(): invalid gid:" + gid);
            return null
        }
        flags = flags || 0;
        this._setNodeDirtyForCache();
        var currentFlags = this.getTileFlagsAt(pos);
        var currentGID = this.getTileGIDAt(pos);
        if (currentGID != gid || currentFlags != flags) {
            var gidAndFlags = (gid | flags) >>> 0;
            if (gid ===
                0)this.removeTileAt(pos); else if (currentGID === 0)this._insertTileForGID(gidAndFlags, pos); else {
                var z = pos.x + pos.y * this._layerSize.width;
                var sprite = this.getChildByTag(z);
                if (sprite) {
                    var rect = this.tileset.rectForGID(gid);
                    rect = cc.rectPixelsToPoints(rect);
                    sprite.setTextureRect(rect, false);
                    if (flags != null)this._setupTileSprite(sprite, pos, gidAndFlags);
                    this.tiles[z] = gidAndFlags
                } else this._updateTileForGID(gidAndFlags, pos)
            }
        }
    }, removeTileAt: function (pos) {
        if (!pos)throw"cc.TMXLayer.removeTileAt(): pos should be non-null";
        if (pos.x >= this._layerSize.width || pos.y >= this._layerSize.height || pos.x < 0 || pos.y < 0)throw"cc.TMXLayer.removeTileAt(): invalid position";
        if (!this.tiles || !this._atlasIndexArray) {
            cc.log("cc.TMXLayer.removeTileAt(): TMXLayer: the tiles map has been released");
            return null
        }
        var gid = this.getTileGIDAt(pos);
        if (gid !== 0) {
            if (cc._renderType === cc._RENDER_TYPE_CANVAS)this._setNodeDirtyForCache();
            var z = 0 | pos.x + pos.y * this._layerSize.width;
            var atlasIndex = this._atlasIndexForExistantZ(z);
            this.tiles[z] = 0;
            this._atlasIndexArray.splice(atlasIndex,
                1);
            var sprite = this.getChildByTag(z);
            if (sprite)cc.SpriteBatchNode.prototype.removeChild.call(this, sprite, true); else {
                if (cc._renderType === cc._RENDER_TYPE_WEBGL)this.textureAtlas.removeQuadAtIndex(atlasIndex);
                if (this._children) {
                    var locChildren = this._children;
                    for (var i = 0, len = locChildren.length; i < len; i++) {
                        var child = locChildren[i];
                        if (child) {
                            var ai = child.atlasIndex;
                            if (ai >= atlasIndex)child.atlasIndex = ai - 1
                        }
                    }
                }
            }
        }
    }, getPositionAt: function (pos) {
        var ret = cc.p(0, 0);
        switch (this.layerOrientation) {
            case cc.TMX_ORIENTATION_ORTHO:
                ret =
                    this._positionForOrthoAt(pos);
                break;
            case cc.TMX_ORIENTATION_ISO:
                ret = this._positionForIsoAt(pos);
                break;
            case cc.TMX_ORIENTATION_HEX:
                ret = this._positionForHexAt(pos);
                break
        }
        return cc.pointPixelsToPoints(ret)
    }, getProperty: function (propertyName) {
        return this.properties[propertyName]
    }, setupTiles: function () {
        if (cc._renderType === cc._RENDER_TYPE_CANVAS)this.tileset.imageSize = this._originalTexture.getContentSizeInPixels(); else {
            this.tileset.imageSize = this.textureAtlas.texture.getContentSizeInPixels();
            this.textureAtlas.texture.setAliasTexParameters()
        }
        this._parseInternalProperties();
        if (cc._renderType === cc._RENDER_TYPE_CANVAS)this._setNodeDirtyForCache();
        var locLayerHeight = this._layerSize.height, locLayerWidth = this._layerSize.width;
        for (var y = 0; y < locLayerHeight; y++)for (var x = 0; x < locLayerWidth; x++) {
            var pos = x + locLayerWidth * y;
            var gid = this.tiles[pos];
            if (gid !== 0) {
                this._appendTileForGID(gid, cc.p(x, y));
                this._minGID = Math.min(gid, this._minGID);
                this._maxGID = Math.max(gid, this._maxGID)
            }
        }
        if (!(this._maxGID >= this.tileset.firstGid && this._minGID >= this.tileset.firstGid))cc.log("cocos2d:TMX: Only 1 tileset per layer is supported")
    },
    addChild: function (child, zOrder, tag) {
        cc.log("addChild: is not supported on cc.TMXLayer. Instead use setTileGID or tileAt.")
    }, removeChild: function (sprite, cleanup) {
        if (!sprite)return;
        if (this._children.indexOf(sprite) === -1) {
            cc.log("cc.TMXLayer.removeChild(): Tile does not belong to TMXLayer");
            return
        }
        if (cc._renderType === cc._RENDER_TYPE_CANVAS)this._setNodeDirtyForCache();
        var atlasIndex = sprite.atlasIndex;
        var zz = this._atlasIndexArray[atlasIndex];
        this.tiles[zz] = 0;
        this._atlasIndexArray.splice(atlasIndex, 1);
        cc.SpriteBatchNode.prototype.removeChild.call(this, sprite, cleanup)
    }, getLayerName: function () {
        return this.layerName
    }, setLayerName: function (layerName) {
        this.layerName = layerName
    }, _positionForIsoAt: function (pos) {
        return cc.p(this._mapTileSize.width / 2 * (this._layerSize.width + pos.x - pos.y - 1), this._mapTileSize.height / 2 * (this._layerSize.height * 2 - pos.x - pos.y - 2))
    }, _positionForOrthoAt: function (pos) {
        return cc.p(pos.x * this._mapTileSize.width, (this._layerSize.height - pos.y - 1) * this._mapTileSize.height)
    }, _positionForHexAt: function (pos) {
        var diffY =
                pos.x % 2 == 1 ? -this._mapTileSize.height / 2 : 0;
        return cc.p(pos.x * this._mapTileSize.width * 3 / 4, (this._layerSize.height - pos.y - 1) * this._mapTileSize.height + diffY)
    }, _calculateLayerOffset: function (pos) {
        var ret = cc.p(0, 0);
        switch (this.layerOrientation) {
            case cc.TMX_ORIENTATION_ORTHO:
                ret = cc.p(pos.x * this._mapTileSize.width, -pos.y * this._mapTileSize.height);
                break;
            case cc.TMX_ORIENTATION_ISO:
                ret = cc.p(this._mapTileSize.width / 2 * (pos.x - pos.y), this._mapTileSize.height / 2 * (-pos.x - pos.y));
                break;
            case cc.TMX_ORIENTATION_HEX:
                if (pos.x !==
                    0 || pos.y !== 0)cc.log("offset for hexagonal map not implemented yet");
                break
        }
        return ret
    }, _appendTileForGID: function (gid, pos) {
        var rect = this.tileset.rectForGID(gid);
        rect = cc.rectPixelsToPoints(rect);
        var z = 0 | pos.x + pos.y * this._layerSize.width;
        var tile = this._reusedTileWithRect(rect);
        this._setupTileSprite(tile, pos, gid);
        var indexForZ = this._atlasIndexArray.length;
        this.insertQuadFromSprite(tile, indexForZ);
        this._atlasIndexArray.splice(indexForZ, 0, z);
        return tile
    }, _insertTileForGID: function (gid, pos) {
        var rect = this.tileset.rectForGID(gid);
        rect = cc.rectPixelsToPoints(rect);
        var z = 0 | pos.x + pos.y * this._layerSize.width;
        var tile = this._reusedTileWithRect(rect);
        this._setupTileSprite(tile, pos, gid);
        var indexForZ = this._atlasIndexForNewZ(z);
        this.insertQuadFromSprite(tile, indexForZ);
        this._atlasIndexArray.splice(indexForZ, 0, z);
        if (this._children) {
            var locChildren = this._children;
            for (var i = 0, len = locChildren.length; i < len; i++) {
                var child = locChildren[i];
                if (child) {
                    var ai = child.atlasIndex;
                    if (ai >= indexForZ)child.atlasIndex = ai + 1
                }
            }
        }
        this.tiles[z] = gid;
        return tile
    },
    _updateTileForGID: function (gid, pos) {
        var rect = this.tileset.rectForGID(gid);
        var locScaleFactor = this._contentScaleFactor;
        rect = cc.rect(rect.x / locScaleFactor, rect.y / locScaleFactor, rect.width / locScaleFactor, rect.height / locScaleFactor);
        var z = pos.x + pos.y * this._layerSize.width;
        var tile = this._reusedTileWithRect(rect);
        this._setupTileSprite(tile, pos, gid);
        var indexForZ = this._atlasIndexForExistantZ(z);
        tile.atlasIndex = indexForZ;
        tile.dirty = true;
        tile.updateTransform();
        this.tiles[z] = gid;
        return tile
    }, _parseInternalProperties: function () {
        var vertexz =
            this.getProperty("cc_vertexz");
        if (vertexz)if (vertexz == "automatic") {
            this._useAutomaticVertexZ = true;
            var alphaFuncVal = this.getProperty("cc_alpha_func");
            var alphaFuncValue = 0;
            if (alphaFuncVal)alphaFuncValue = parseFloat(alphaFuncVal);
            if (cc._renderType === cc._RENDER_TYPE_WEBGL) {
                this.shaderProgram = cc.shaderCache.programForKey(cc.SHADER_POSITION_TEXTURECOLORALPHATEST);
                var alphaValueLocation = cc._renderContext.getUniformLocation(this.shaderProgram.getProgram(), cc.UNIFORM_ALPHA_TEST_VALUE_S);
                this.shaderProgram.use();
                this.shaderProgram.setUniformLocationWith1f(alphaValueLocation, alphaFuncValue)
            }
        } else this._vertexZvalue = parseInt(vertexz, 10)
    }, _setupTileSprite: function (sprite, pos, gid) {
        var z = pos.x + pos.y * this._layerSize.width;
        sprite.setPosition(this.getPositionAt(pos));
        if (cc._renderType === cc._RENDER_TYPE_WEBGL)sprite.vertexZ = this._vertexZForPos(pos); else sprite.tag = z;
        sprite.anchorX = 0;
        sprite.anchorY = 0;
        sprite.opacity = this._opacity;
        if (cc._renderType === cc._RENDER_TYPE_WEBGL)sprite.rotation = 0;
        sprite.setFlippedX(false);
        sprite.setFlippedY(false);
        if ((gid & cc.TMX_TILE_DIAGONAL_FLAG) >>> 0) {
            sprite.anchorX = 0.5;
            sprite.anchorY = 0.5;
            sprite.x = this.getPositionAt(pos).x + sprite.width / 2;
            sprite.y = this.getPositionAt(pos).y + sprite.height / 2;
            var flag = (gid & (cc.TMX_TILE_HORIZONTAL_FLAG | cc.TMX_TILE_VERTICAL_FLAG) >>> 0) >>> 0;
            if (flag == cc.TMX_TILE_HORIZONTAL_FLAG)sprite.rotation = 90; else if (flag == cc.TMX_TILE_VERTICAL_FLAG)sprite.rotation = 270; else if (flag == (cc.TMX_TILE_VERTICAL_FLAG | cc.TMX_TILE_HORIZONTAL_FLAG) >>> 0) {
                sprite.rotation = 90;
                sprite.setFlippedX(true)
            } else {
                sprite.rotation =
                    270;
                sprite.setFlippedX(true)
            }
        } else {
            if ((gid & cc.TMX_TILE_HORIZONTAL_FLAG) >>> 0)sprite.setFlippedX(true);
            if ((gid & cc.TMX_TILE_VERTICAL_FLAG) >>> 0)sprite.setFlippedY(true)
        }
    }, _reusedTileWithRect: function (rect) {
        if (cc._renderType === cc._RENDER_TYPE_WEBGL)if (!this._reusedTile) {
            this._reusedTile = new cc.Sprite;
            this._reusedTile.initWithTexture(this.texture, rect, false);
            this._reusedTile.batchNode = this
        } else {
            this._reusedTile.batchNode = null;
            this._reusedTile.setTextureRect(rect, false);
            this._reusedTile.batchNode = this
        } else {
            this._reusedTile =
                new cc.Sprite;
            this._reusedTile.initWithTexture(this._textureForCanvas, rect, false);
            this._reusedTile.batchNode = this;
            this._reusedTile.parent = this
        }
        return this._reusedTile
    }, _vertexZForPos: function (pos) {
        var ret = 0;
        var maxVal = 0;
        if (this._useAutomaticVertexZ)switch (this.layerOrientation) {
            case cc.TMX_ORIENTATION_ISO:
                maxVal = this._layerSize.width + this._layerSize.height;
                ret = -(maxVal - (pos.x + pos.y));
                break;
            case cc.TMX_ORIENTATION_ORTHO:
                ret = -(this._layerSize.height - pos.y);
                break;
            case cc.TMX_ORIENTATION_HEX:
                cc.log("TMX Hexa zOrder not supported");
                break;
            default:
                cc.log("TMX invalid value");
                break
        } else ret = this._vertexZvalue;
        return ret
    }, _atlasIndexForExistantZ: function (z) {
        var item;
        if (this._atlasIndexArray) {
            var locAtlasIndexArray = this._atlasIndexArray;
            for (var i = 0, len = locAtlasIndexArray.length; i < len; i++) {
                item = locAtlasIndexArray[i];
                if (item == z)break
            }
        }
        if (typeof item != "number")cc.log("cc.TMXLayer._atlasIndexForExistantZ(): TMX atlas index not found. Shall not happen");
        return i
    }, _atlasIndexForNewZ: function (z) {
        var locAtlasIndexArray = this._atlasIndexArray;
        for (var i = 0, len = locAtlasIndexArray.length; i < len; i++) {
            var val = locAtlasIndexArray[i];
            if (z < val)break
        }
        return i
    }});
var _p = cc.TMXLayer.prototype;
if (cc._renderType == cc._RENDER_TYPE_WEBGL) {
    _p.draw = cc.SpriteBatchNode.prototype.draw;
    _p.visit = cc.SpriteBatchNode.prototype.visit;
    _p.getTexture = cc.SpriteBatchNode.prototype.getTexture
} else {
    _p.draw = _p._drawForCanvas;
    _p.visit = _p._visitForCanvas;
    _p.getTexture = _p._getTextureForCanvas
}
cc.defineGetterSetter(_p, "texture", _p.getTexture, _p.setTexture);
_p.layerWidth;
cc.defineGetterSetter(_p, "layerWidth", _p._getLayerWidth, _p._setLayerWidth);
_p.layerHeight;
cc.defineGetterSetter(_p, "layerHeight", _p._getLayerHeight, _p._setLayerHeight);
_p.tileWidth;
cc.defineGetterSetter(_p, "tileWidth", _p._getTileWidth, _p._setTileWidth);
_p.tileHeight;
cc.defineGetterSetter(_p, "tileHeight", _p._getTileHeight, _p._setTileHeight);
cc.TMXLayer.create = function (tilesetInfo, layerInfo, mapInfo) {
    return new cc.TMXLayer(tilesetInfo, layerInfo, mapInfo)
};