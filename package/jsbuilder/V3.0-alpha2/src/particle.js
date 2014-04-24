cc.PNGReader = cc.Class.extend({ctor: function (data) {
    var chunkSize, colors, delayDen, delayNum, frame, i, index, key, section, ccshort, text, _i, _j, _ref;
    this.data = data;
    this.pos = 8;
    this.palette = [];
    this.imgData = [];
    this.transparency = {};
    this.animation = null;
    this.text = {};
    frame = null;
    while (true) {
        chunkSize = this.readUInt32();
        section = function () {
            var _i, _results;
            _results = [];
            for (i = _i = 0; _i < 4; i = ++_i)_results.push(String.fromCharCode(this.data[this.pos++]));
            return _results
        }.call(this).join("");
        switch (section) {
            case "IHDR":
                this.width =
                    this.readUInt32();
                this.height = this.readUInt32();
                this.bits = this.data[this.pos++];
                this.colorType = this.data[this.pos++];
                this.compressionMethod = this.data[this.pos++];
                this.filterMethod = this.data[this.pos++];
                this.interlaceMethod = this.data[this.pos++];
                break;
            case "acTL":
                this.animation = {numFrames: this.readUInt32(), numPlays: this.readUInt32() || Infinity, frames: []};
                break;
            case "PLTE":
                this.palette = this.read(chunkSize);
                break;
            case "fcTL":
                if (frame)this.animation.frames.push(frame);
                this.pos += 4;
                frame = {width: this.readUInt32(),
                    height: this.readUInt32(), xOffset: this.readUInt32(), yOffset: this.readUInt32()};
                delayNum = this.readUInt16();
                delayDen = this.readUInt16() || 100;
                frame.delay = 1E3 * delayNum / delayDen;
                frame.disposeOp = this.data[this.pos++];
                frame.blendOp = this.data[this.pos++];
                frame.data = [];
                break;
            case "IDAT":
            case "fdAT":
                if (section === "fdAT") {
                    this.pos += 4;
                    chunkSize -= 4
                }
                data = (frame != null ? frame.data : void 0) || this.imgData;
                for (i = _i = 0; 0 <= chunkSize ? _i < chunkSize : _i > chunkSize; i = 0 <= chunkSize ? ++_i : --_i)data.push(this.data[this.pos++]);
                break;
            case "tRNS":
                this.transparency =
                {};
                switch (this.colorType) {
                    case 3:
                        this.transparency.indexed = this.read(chunkSize);
                        ccshort = 255 - this.transparency.indexed.length;
                        if (ccshort > 0)for (i = _j = 0; 0 <= ccshort ? _j < ccshort : _j > ccshort; i = 0 <= ccshort ? ++_j : --_j)this.transparency.indexed.push(255);
                        break;
                    case 0:
                        this.transparency.grayscale = this.read(chunkSize)[0];
                        break;
                    case 2:
                        this.transparency.rgb = this.read(chunkSize)
                }
                break;
            case "tEXt":
                text = this.read(chunkSize);
                index = text.indexOf(0);
                key = String.fromCharCode.apply(String, text.slice(0, index));
                this.text[key] =
                    String.fromCharCode.apply(String, text.slice(index + 1));
                break;
            case "IEND":
                if (frame)this.animation.frames.push(frame);
                this.colors = function () {
                    switch (this.colorType) {
                        case 0:
                        case 3:
                        case 4:
                            return 1;
                        case 2:
                        case 6:
                            return 3
                    }
                }.call(this);
                this.hasAlphaChannel = (_ref = this.colorType) === 4 || _ref === 6;
                colors = this.colors + (this.hasAlphaChannel ? 1 : 0);
                this.pixelBitlength = this.bits * colors;
                this.colorSpace = function () {
                    switch (this.colors) {
                        case 1:
                            return"DeviceGray";
                        case 3:
                            return"DeviceRGB"
                    }
                }.call(this);
                if (Uint8Array != Array)this.imgData =
                    new Uint8Array(this.imgData);
                return;
            default:
                this.pos += chunkSize
        }
        this.pos += 4;
        if (this.pos > this.data.length)throw new Error("Incomplete or corrupt PNG file");
    }
}, read: function (bytes) {
    var i, _i, _results;
    _results = [];
    for (i = _i = 0; 0 <= bytes ? _i < bytes : _i > bytes; i = 0 <= bytes ? ++_i : --_i)_results.push(this.data[this.pos++]);
    return _results
}, readUInt32: function () {
    var b1, b2, b3, b4;
    b1 = this.data[this.pos++] << 24;
    b2 = this.data[this.pos++] << 16;
    b3 = this.data[this.pos++] << 8;
    b4 = this.data[this.pos++];
    return b1 | b2 | b3 | b4
}, readUInt16: function () {
    var b1,
        b2;
    b1 = this.data[this.pos++] << 8;
    b2 = this.data[this.pos++];
    return b1 | b2
}, decodePixels: function (data) {
    var ccbyte, c, col, i, left, length, p, pa, paeth, pb, pc, pixelBytes, pixels, pos, row, scanlineLength, upper, upperLeft, _i, _j, _k, _l, _m;
    if (data == null)data = this.imgData;
    if (data.length === 0)return new Uint8Array(0);
    var inflate = new Zlib.Inflate(data, {index: 0, verify: false});
    data = inflate.decompress();
    pixelBytes = this.pixelBitlength / 8;
    scanlineLength = pixelBytes * this.width;
    pixels = new Uint8Array(scanlineLength * this.height);
    length =
        data.length;
    row = 0;
    pos = 0;
    c = 0;
    while (pos < length) {
        switch (data[pos++]) {
            case 0:
                for (i = _i = 0; _i < scanlineLength; i = _i += 1)pixels[c++] = data[pos++];
                break;
            case 1:
                for (i = _j = 0; _j < scanlineLength; i = _j += 1) {
                    ccbyte = data[pos++];
                    left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
                    pixels[c++] = (ccbyte + left) % 256
                }
                break;
            case 2:
                for (i = _k = 0; _k < scanlineLength; i = _k += 1) {
                    ccbyte = data[pos++];
                    col = (i - i % pixelBytes) / pixelBytes;
                    upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + i % pixelBytes];
                    pixels[c++] = (upper + ccbyte) % 256
                }
                break;
            case 3:
                for (i = _l = 0; _l <
                    scanlineLength; i = _l += 1) {
                    ccbyte = data[pos++];
                    col = (i - i % pixelBytes) / pixelBytes;
                    left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
                    upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + i % pixelBytes];
                    pixels[c++] = (ccbyte + Math.floor((left + upper) / 2)) % 256
                }
                break;
            case 4:
                for (i = _m = 0; _m < scanlineLength; i = _m += 1) {
                    ccbyte = data[pos++];
                    col = (i - i % pixelBytes) / pixelBytes;
                    left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
                    if (row === 0)upper = upperLeft = 0; else {
                        upper = pixels[(row - 1) * scanlineLength + col * pixelBytes + i % pixelBytes];
                        upperLeft = col && pixels[(row -
                            1) * scanlineLength + (col - 1) * pixelBytes + i % pixelBytes]
                    }
                    p = left + upper - upperLeft;
                    pa = Math.abs(p - left);
                    pb = Math.abs(p - upper);
                    pc = Math.abs(p - upperLeft);
                    if (pa <= pb && pa <= pc)paeth = left; else if (pb <= pc)paeth = upper; else paeth = upperLeft;
                    pixels[c++] = (ccbyte + paeth) % 256
                }
                break;
            default:
                throw new Error("Invalid filter algorithm: " + data[pos - 1]);
        }
        row++
    }
    return pixels
}, copyToImageData: function (imageData, pixels) {
    var alpha, colors, data, i, input, j, k, length, palette, v, _ref;
    colors = this.colors;
    palette = null;
    alpha = this.hasAlphaChannel;
    if (this.palette.length) {
        palette =
                (_ref = this._decodedPalette) != null ? _ref : this._decodedPalette = this.decodePalette();
        colors = 4;
        alpha = true
    }
    data = imageData.data || imageData;
    length = data.length;
    input = palette || pixels;
    i = j = 0;
    if (colors === 1)while (i < length) {
        k = palette ? pixels[i / 4] * 4 : j;
        v = input[k++];
        data[i++] = v;
        data[i++] = v;
        data[i++] = v;
        data[i++] = alpha ? input[k++] : 255;
        j = k
    } else while (i < length) {
        k = palette ? pixels[i / 4] * 4 : j;
        data[i++] = input[k++];
        data[i++] = input[k++];
        data[i++] = input[k++];
        data[i++] = alpha ? input[k++] : 255;
        j = k
    }
}, decodePalette: function () {
    var c, i, palette,
        pos, ret, transparency, _i, _ref, _ref1;
    palette = this.palette;
    transparency = this.transparency.indexed || [];
    ret = new Uint8Array((transparency.length || 0) + palette.length);
    pos = 0;
    c = 0;
    for (i = _i = 0, _ref = palette.length; _i < _ref; i = _i += 3) {
        ret[pos++] = palette[i];
        ret[pos++] = palette[i + 1];
        ret[pos++] = palette[i + 2];
        ret[pos++] = (_ref1 = transparency[c++]) != null ? _ref1 : 255
    }
    return ret
}, render: function (canvas) {
    var ctx, data;
    canvas.width = this.width;
    canvas.height = this.height;
    ctx = canvas.getContext("2d");
    data = ctx.createImageData(this.width,
        this.height);
    this.copyToImageData(data, this.decodePixels());
    return ctx.putImageData(data, 0, 0)
}});
cc.tiffReader = {_littleEndian: false, _tiffData: null, _fileDirectories: [], getUint8: function (offset) {
    return this._tiffData[offset]
}, getUint16: function (offset) {
    if (this._littleEndian)return this._tiffData[offset + 1] << 8 | this._tiffData[offset]; else return this._tiffData[offset] << 8 | this._tiffData[offset + 1]
}, getUint32: function (offset) {
    var a = this._tiffData;
    if (this._littleEndian)return a[offset + 3] << 24 | a[offset + 2] << 16 | a[offset + 1] << 8 | a[offset]; else return a[offset] << 24 | a[offset + 1] << 16 | a[offset + 2] << 8 | a[offset + 3]
},
    checkLittleEndian: function () {
        var BOM = this.getUint16(0);
        if (BOM === 18761)this.littleEndian = true; else if (BOM === 19789)this.littleEndian = false; else {
            console.log(BOM);
            throw TypeError("Invalid byte order value.");
        }
        return this.littleEndian
    }, hasTowel: function () {
        if (this.getUint16(2) !== 42) {
            throw RangeError("You forgot your towel!");
            return false
        }
        return true
    }, getFieldTypeName: function (fieldType) {
        var typeNames = this.fieldTypeNames;
        if (fieldType in typeNames)return typeNames[fieldType];
        return null
    }, getFieldTagName: function (fieldTag) {
        var tagNames =
            this.fieldTagNames;
        if (fieldTag in tagNames)return tagNames[fieldTag]; else {
            console.log("Unknown Field Tag:", fieldTag);
            return"Tag" + fieldTag
        }
    }, getFieldTypeLength: function (fieldTypeName) {
        if (["BYTE", "ASCII", "SBYTE", "UNDEFINED"].indexOf(fieldTypeName) !== -1)return 1; else if (["SHORT", "SSHORT"].indexOf(fieldTypeName) !== -1)return 2; else if (["LONG", "SLONG", "FLOAT"].indexOf(fieldTypeName) !== -1)return 4; else if (["RATIONAL", "SRATIONAL", "DOUBLE"].indexOf(fieldTypeName) !== -1)return 8;
        return null
    }, getFieldValues: function (fieldTagName, fieldTypeName, typeCount, valueOffset) {
        var fieldValues = [];
        var fieldTypeLength = this.getFieldTypeLength(fieldTypeName);
        var fieldValueSize = fieldTypeLength * typeCount;
        if (fieldValueSize <= 4)if (this.littleEndian === false)fieldValues.push(valueOffset >>> (4 - fieldTypeLength) * 8); else fieldValues.push(valueOffset); else for (var i = 0; i < typeCount; i++) {
            var indexOffset = fieldTypeLength * i;
            if (fieldTypeLength >= 8)if (["RATIONAL", "SRATIONAL"].indexOf(fieldTypeName) !== -1) {
                fieldValues.push(this.getUint32(valueOffset + indexOffset));
                fieldValues.push(this.getUint32(valueOffset + indexOffset + 4))
            } else cc.log("Can't handle this field type or size"); else fieldValues.push(this.getBytes(fieldTypeLength, valueOffset + indexOffset))
        }
        if (fieldTypeName === "ASCII")fieldValues.forEach(function (e, i, a) {
            a[i] = String.fromCharCode(e)
        });
        return fieldValues
    }, getBytes: function (numBytes, offset) {
        if (numBytes <= 0)cc.log("No bytes requested"); else if (numBytes <= 1)return this.getUint8(offset); else if (numBytes <= 2)return this.getUint16(offset); else if (numBytes <= 3)return this.getUint32(offset) >>>
            8; else if (numBytes <= 4)return this.getUint32(offset); else cc.log("Too many bytes requested")
    }, getBits: function (numBits, byteOffset, bitOffset) {
        bitOffset = bitOffset || 0;
        var extraBytes = Math.floor(bitOffset / 8);
        var newByteOffset = byteOffset + extraBytes;
        var totalBits = bitOffset + numBits;
        var shiftRight = 32 - numBits;
        var shiftLeft, rawBits;
        if (totalBits <= 0)console.log("No bits requested"); else if (totalBits <= 8) {
            shiftLeft = 24 + bitOffset;
            rawBits = this.getUint8(newByteOffset)
        } else if (totalBits <= 16) {
            shiftLeft = 16 + bitOffset;
            rawBits =
                this.getUint16(newByteOffset)
        } else if (totalBits <= 32) {
            shiftLeft = bitOffset;
            rawBits = this.getUint32(newByteOffset)
        } else console.log("Too many bits requested");
        return{"bits": rawBits << shiftLeft >>> shiftRight, "byteOffset": newByteOffset + Math.floor(totalBits / 8), "bitOffset": totalBits % 8}
    }, parseFileDirectory: function (byteOffset) {
        var numDirEntries = this.getUint16(byteOffset);
        var tiffFields = [];
        for (var i = byteOffset + 2, entryCount = 0; entryCount < numDirEntries; i += 12, entryCount++) {
            var fieldTag = this.getUint16(i);
            var fieldType =
                this.getUint16(i + 2);
            var typeCount = this.getUint32(i + 4);
            var valueOffset = this.getUint32(i + 8);
            var fieldTagName = this.getFieldTagName(fieldTag);
            var fieldTypeName = this.getFieldTypeName(fieldType);
            var fieldValues = this.getFieldValues(fieldTagName, fieldTypeName, typeCount, valueOffset);
            tiffFields[fieldTagName] = {type: fieldTypeName, values: fieldValues}
        }
        this._fileDirectories.push(tiffFields);
        var nextIFDByteOffset = this.getUint32(i);
        if (nextIFDByteOffset !== 0)this.parseFileDirectory(nextIFDByteOffset)
    }, clampColorSample: function (colorSample, bitsPerSample) {
        var multiplier = Math.pow(2, 8 - bitsPerSample);
        return Math.floor(colorSample * multiplier + (multiplier - 1))
    }, parseTIFF: function (tiffData, canvas) {
        canvas = canvas || cc.newElement("canvas");
        this._tiffData = tiffData;
        this.canvas = canvas;
        this.checkLittleEndian();
        if (!this.hasTowel())return;
        var firstIFDByteOffset = this.getUint32(4);
        this._fileDirectories.length = 0;
        this.parseFileDirectory(firstIFDByteOffset);
        var fileDirectory = this._fileDirectories[0];
        var imageWidth = fileDirectory["ImageWidth"].values[0];
        var imageLength =
            fileDirectory["ImageLength"].values[0];
        this.canvas.width = imageWidth;
        this.canvas.height = imageLength;
        var strips = [];
        var compression = fileDirectory["Compression"] ? fileDirectory["Compression"].values[0] : 1;
        var samplesPerPixel = fileDirectory["SamplesPerPixel"].values[0];
        var sampleProperties = [];
        var bitsPerPixel = 0;
        var hasBytesPerPixel = false;
        fileDirectory["BitsPerSample"].values.forEach(function (bitsPerSample, i, bitsPerSampleValues) {
            sampleProperties[i] = {bitsPerSample: bitsPerSample, hasBytesPerSample: false, bytesPerSample: undefined};
            if (bitsPerSample % 8 === 0) {
                sampleProperties[i].hasBytesPerSample = true;
                sampleProperties[i].bytesPerSample = bitsPerSample / 8
            }
            bitsPerPixel += bitsPerSample
        }, this);
        if (bitsPerPixel % 8 === 0) {
            hasBytesPerPixel = true;
            var bytesPerPixel = bitsPerPixel / 8
        }
        var stripOffsetValues = fileDirectory["StripOffsets"].values;
        var numStripOffsetValues = stripOffsetValues.length;
        if (fileDirectory["StripByteCounts"])var stripByteCountValues = fileDirectory["StripByteCounts"].values; else {
            cc.log("Missing StripByteCounts!");
            if (numStripOffsetValues ===
                1)var stripByteCountValues = [Math.ceil(imageWidth * imageLength * bitsPerPixel / 8)]; else throw Error("Cannot recover from missing StripByteCounts");
        }
        for (var i = 0; i < numStripOffsetValues; i++) {
            var stripOffset = stripOffsetValues[i];
            strips[i] = [];
            var stripByteCount = stripByteCountValues[i];
            for (var byteOffset = 0, bitOffset = 0, jIncrement = 1, getHeader = true, pixel = [], numBytes = 0, sample = 0, currentSample = 0; byteOffset < stripByteCount; byteOffset += jIncrement)switch (compression) {
                case 1:
                    for (var m = 0, pixel = []; m < samplesPerPixel; m++)if (sampleProperties[m].hasBytesPerSample) {
                        var sampleOffset =
                            sampleProperties[m].bytesPerSample * m;
                        pixel.push(this.getBytes(sampleProperties[m].bytesPerSample, stripOffset + byteOffset + sampleOffset))
                    } else {
                        var sampleInfo = this.getBits(sampleProperties[m].bitsPerSample, stripOffset + byteOffset, bitOffset);
                        pixel.push(sampleInfo.bits);
                        byteOffset = sampleInfo.byteOffset - stripOffset;
                        bitOffset = sampleInfo.bitOffset;
                        throw RangeError("Cannot handle sub-byte bits per sample");
                    }
                    strips[i].push(pixel);
                    if (hasBytesPerPixel)jIncrement = bytesPerPixel; else {
                        jIncrement = 0;
                        throw RangeError("Cannot handle sub-byte bits per pixel");
                    }
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    break;
                case 7:
                    break;
                case 32773:
                    if (getHeader) {
                        getHeader = false;
                        var blockLength = 1;
                        var iterations = 1;
                        var header = this.getInt8(stripOffset + byteOffset);
                        if (header >= 0 && header <= 127)blockLength = header + 1; else if (header >= -127 && header <= -1)iterations = -header + 1; else getHeader = true
                    } else {
                        var currentByte = this.getUint8(stripOffset + byteOffset);
                        for (var m = 0; m < iterations; m++) {
                            if (sampleProperties[sample].hasBytesPerSample) {
                                currentSample = currentSample << 8 * numBytes |
                                    currentByte;
                                numBytes++;
                                if (numBytes === sampleProperties[sample].bytesPerSample) {
                                    pixel.push(currentSample);
                                    currentSample = numBytes = 0;
                                    sample++
                                }
                            } else throw RangeError("Cannot handle sub-byte bits per sample");
                            if (sample === samplesPerPixel) {
                                strips[i].push(pixel);
                                pixel = [];
                                sample = 0
                            }
                        }
                        blockLength--;
                        if (blockLength === 0)getHeader = true
                    }
                    jIncrement = 1;
                    break;
                default:
                    break
            }
        }
        if (canvas.getContext) {
            var ctx = this.canvas.getContext("2d");
            ctx.fillStyle = "rgba(255, 255, 255, 0)";
            var rowsPerStrip = fileDirectory["RowsPerStrip"] ? fileDirectory["RowsPerStrip"].values[0] :
                imageLength;
            var numStrips = strips.length;
            var imageLengthModRowsPerStrip = imageLength % rowsPerStrip;
            var rowsInLastStrip = imageLengthModRowsPerStrip === 0 ? rowsPerStrip : imageLengthModRowsPerStrip;
            var numRowsInStrip = rowsPerStrip;
            var numRowsInPreviousStrip = 0;
            var photometricInterpretation = fileDirectory["PhotometricInterpretation"].values[0];
            var extraSamplesValues = [];
            var numExtraSamples = 0;
            if (fileDirectory["ExtraSamples"]) {
                extraSamplesValues = fileDirectory["ExtraSamples"].values;
                numExtraSamples = extraSamplesValues.length
            }
            if (fileDirectory["ColorMap"]) {
                var colorMapValues =
                    fileDirectory["ColorMap"].values;
                var colorMapSampleSize = Math.pow(2, sampleProperties[0].bitsPerSample)
            }
            for (var i = 0; i < numStrips; i++) {
                if (i + 1 === numStrips)numRowsInStrip = rowsInLastStrip;
                var numPixels = strips[i].length;
                var yPadding = numRowsInPreviousStrip * i;
                for (var y = 0, j = 0; y < numRowsInStrip, j < numPixels; y++)for (var x = 0; x < imageWidth; x++, j++) {
                    var pixelSamples = strips[i][j];
                    var red = 0;
                    var green = 0;
                    var blue = 0;
                    var opacity = 1;
                    if (numExtraSamples > 0)for (var k = 0; k < numExtraSamples; k++)if (extraSamplesValues[k] === 1 || extraSamplesValues[k] ===
                        2) {
                        opacity = pixelSamples[3 + k] / 256;
                        break
                    }
                    switch (photometricInterpretation) {
                        case 0:
                            if (sampleProperties[0].hasBytesPerSample)var invertValue = Math.pow(16, sampleProperties[0].bytesPerSample * 2);
                            pixelSamples.forEach(function (sample, index, samples) {
                                samples[index] = invertValue - sample
                            });
                        case 1:
                            red = green = blue = this.clampColorSample(pixelSamples[0], sampleProperties[0].bitsPerSample);
                            break;
                        case 2:
                            red = this.clampColorSample(pixelSamples[0], sampleProperties[0].bitsPerSample);
                            green = this.clampColorSample(pixelSamples[1],
                                sampleProperties[1].bitsPerSample);
                            blue = this.clampColorSample(pixelSamples[2], sampleProperties[2].bitsPerSample);
                            break;
                        case 3:
                            if (colorMapValues === undefined)throw Error("Palette image missing color map");
                            var colorMapIndex = pixelSamples[0];
                            red = this.clampColorSample(colorMapValues[colorMapIndex], 16);
                            green = this.clampColorSample(colorMapValues[colorMapSampleSize + colorMapIndex], 16);
                            blue = this.clampColorSample(colorMapValues[2 * colorMapSampleSize + colorMapIndex], 16);
                            break;
                        default:
                            throw RangeError("Unknown Photometric Interpretation:",
                                photometricInterpretation);
                            break
                    }
                    ctx.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + opacity + ")";
                    ctx.fillRect(x, yPadding + y, 1, 1)
                }
                numRowsInPreviousStrip = numRowsInStrip
            }
        }
        return this.canvas
    }, fieldTagNames: {315: "Artist", 258: "BitsPerSample", 265: "CellLength", 264: "CellWidth", 320: "ColorMap", 259: "Compression", 33432: "Copyright", 306: "DateTime", 338: "ExtraSamples", 266: "FillOrder", 289: "FreeByteCounts", 288: "FreeOffsets", 291: "GrayResponseCurve", 290: "GrayResponseUnit", 316: "HostComputer", 270: "ImageDescription", 257: "ImageLength",
        256: "ImageWidth", 271: "Make", 281: "MaxSampleValue", 280: "MinSampleValue", 272: "Model", 254: "NewSubfileType", 274: "Orientation", 262: "PhotometricInterpretation", 284: "PlanarConfiguration", 296: "ResolutionUnit", 278: "RowsPerStrip", 277: "SamplesPerPixel", 305: "Software", 279: "StripByteCounts", 273: "StripOffsets", 255: "SubfileType", 263: "Threshholding", 282: "XResolution", 283: "YResolution", 326: "BadFaxLines", 327: "CleanFaxData", 343: "ClipPath", 328: "ConsecutiveBadFaxLines", 433: "Decode", 434: "DefaultImageColor", 269: "DocumentName",
        336: "DotRange", 321: "HalftoneHints", 346: "Indexed", 347: "JPEGTables", 285: "PageName", 297: "PageNumber", 317: "Predictor", 319: "PrimaryChromaticities", 532: "ReferenceBlackWhite", 339: "SampleFormat", 559: "StripRowCounts", 330: "SubIFDs", 292: "T4Options", 293: "T6Options", 325: "TileByteCounts", 323: "TileLength", 324: "TileOffsets", 322: "TileWidth", 301: "TransferFunction", 318: "WhitePoint", 344: "XClipPathUnits", 286: "XPosition", 529: "YCbCrCoefficients", 531: "YCbCrPositioning", 530: "YCbCrSubSampling", 345: "YClipPathUnits", 287: "YPosition",
        37378: "ApertureValue", 40961: "ColorSpace", 36868: "DateTimeDigitized", 36867: "DateTimeOriginal", 34665: "Exif IFD", 36864: "ExifVersion", 33434: "ExposureTime", 41728: "FileSource", 37385: "Flash", 40960: "FlashpixVersion", 33437: "FNumber", 42016: "ImageUniqueID", 37384: "LightSource", 37500: "MakerNote", 37377: "ShutterSpeedValue", 37510: "UserComment", 33723: "IPTC", 34675: "ICC Profile", 700: "XMP", 42112: "GDAL_METADATA", 42113: "GDAL_NODATA", 34377: "Photoshop"}, fieldTypeNames: {1: "BYTE", 2: "ASCII", 3: "SHORT", 4: "LONG", 5: "RATIONAL", 6: "SBYTE",
        7: "UNDEFINED", 8: "SSHORT", 9: "SLONG", 10: "SRATIONAL", 11: "FLOAT", 12: "DOUBLE"}};
cc.Particle = function (pos, startPos, color, deltaColor, size, deltaSize, rotation, deltaRotation, timeToLive, atlasIndex, modeA, modeB) {
    this.pos = pos ? pos : cc.p(0, 0);
    this.startPos = startPos ? startPos : cc.p(0, 0);
    this.color = color ? color : {r: 0, g: 0, b: 0, a: 255};
    this.deltaColor = deltaColor ? deltaColor : {r: 0, g: 0, b: 0, a: 255};
    this.size = size || 0;
    this.deltaSize = deltaSize || 0;
    this.rotation = rotation || 0;
    this.deltaRotation = deltaRotation || 0;
    this.timeToLive = timeToLive || 0;
    this.atlasIndex = atlasIndex || 0;
    this.modeA = modeA ? modeA : new cc.Particle.ModeA;
    this.modeB = modeB ? modeB : new cc.Particle.ModeB;
    this.isChangeColor = false;
    this.drawPos = cc.p(0, 0)
};
cc.Particle.ModeA = function (dir, radialAccel, tangentialAccel) {
    this.dir = dir ? dir : cc.p(0, 0);
    this.radialAccel = radialAccel || 0;
    this.tangentialAccel = tangentialAccel || 0
};
cc.Particle.ModeB = function (angle, degreesPerSecond, radius, deltaRadius) {
    this.angle = angle || 0;
    this.degreesPerSecond = degreesPerSecond || 0;
    this.radius = radius || 0;
    this.deltaRadius = deltaRadius || 0
};
cc.Particle.TemporaryPoints = [cc.p(), cc.p(), cc.p(), cc.p()];
cc.ParticleSystem = cc.Node.extend({_plistFile: "", _elapsed: 0, _dontTint: false, modeA: null, modeB: null, _className: "ParticleSystem", _pointZeroForParticle: cc.p(0, 0), _particles: null, _emitCounter: 0, _particleIdx: 0, _batchNode: null, atlasIndex: 0, _transformSystemDirty: false, _allocatedParticles: 0, drawMode: null, shapeType: null, _isActive: false, particleCount: 0, duration: 0, _sourcePosition: null, _posVar: null, life: 0, lifeVar: 0, angle: 0, angleVar: 0, startSize: 0, startSizeVar: 0, endSize: 0, endSizeVar: 0, _startColor: null, _startColorVar: null,
    _endColor: null, _endColorVar: null, startSpin: 0, startSpinVar: 0, endSpin: 0, endSpinVar: 0, emissionRate: 0, _totalParticles: 0, _texture: null, _blendFunc: null, _opacityModifyRGB: false, positionType: null, autoRemoveOnFinish: false, emitterMode: 0, _quads: null, _indices: null, _buffersVBO: null, _pointRect: null, _textureLoaded: null, _quadsArrayBuffer: null, ctor: function (plistFile) {
        cc.Node.prototype.ctor.call(this);
        this.emitterMode = cc.ParticleSystem.MODE_GRAVITY;
        this.modeA = new cc.ParticleSystem.ModeA;
        this.modeB = new cc.ParticleSystem.ModeB;
        this._blendFunc = {src: cc.BLEND_SRC, dst: cc.BLEND_DST};
        this._particles = [];
        this._sourcePosition = cc.p(0, 0);
        this._posVar = cc.p(0, 0);
        this._startColor = cc.color(255, 255, 255, 255);
        this._startColorVar = cc.color(255, 255, 255, 255);
        this._endColor = cc.color(255, 255, 255, 255);
        this._endColorVar = cc.color(255, 255, 255, 255);
        this._plistFile = "";
        this._elapsed = 0;
        this._dontTint = false;
        this._pointZeroForParticle = cc.p(0, 0);
        this._emitCounter = 0;
        this._particleIdx = 0;
        this._batchNode = null;
        this.atlasIndex = 0;
        this._transformSystemDirty = false;
        this._allocatedParticles = 0;
        this.drawMode = cc.ParticleSystem.SHAPE_MODE;
        this.shapeType = cc.ParticleSystem.BALL_SHAPE;
        this._isActive = false;
        this.particleCount = 0;
        this.duration = 0;
        this.life = 0;
        this.lifeVar = 0;
        this.angle = 0;
        this.angleVar = 0;
        this.startSize = 0;
        this.startSizeVar = 0;
        this.endSize = 0;
        this.endSizeVar = 0;
        this.startSpin = 0;
        this.startSpinVar = 0;
        this.endSpin = 0;
        this.endSpinVar = 0;
        this.emissionRate = 0;
        this._totalParticles = 0;
        this._texture = null;
        this._opacityModifyRGB = false;
        this.positionType = cc.ParticleSystem.TYPE_FREE;
        this.autoRemoveOnFinish = false;
        this._buffersVBO = [0, 0];
        this._quads = [];
        this._indices = [];
        this._pointRect = cc.rect(0, 0, 0, 0);
        this._textureLoaded = true;
        if (cc._renderType === cc._RENDER_TYPE_WEBGL)this._quadsArrayBuffer = null;
        if (!plistFile || typeof plistFile === "number") {
            var ton = plistFile || 100;
            this.setDrawMode(cc.ParticleSystem.TEXTURE_MODE);
            this.initWithTotalParticles(ton)
        } else this.initWithFile(plistFile)
    }, initIndices: function () {
        var locIndices = this._indices;
        for (var i = 0, len = this._totalParticles; i < len; ++i) {
            var i6 =
                i * 6;
            var i4 = i * 4;
            locIndices[i6 + 0] = i4 + 0;
            locIndices[i6 + 1] = i4 + 1;
            locIndices[i6 + 2] = i4 + 2;
            locIndices[i6 + 5] = i4 + 1;
            locIndices[i6 + 4] = i4 + 2;
            locIndices[i6 + 3] = i4 + 3
        }
    }, initTexCoordsWithRect: function (pointRect) {
        var scaleFactor = cc.contentScaleFactor();
        var rect = cc.rect(pointRect.x * scaleFactor, pointRect.y * scaleFactor, pointRect.width * scaleFactor, pointRect.height * scaleFactor);
        var wide = pointRect.width;
        var high = pointRect.height;
        if (this._texture) {
            wide = this._texture.pixelsWidth;
            high = this._texture.pixelsHeight
        }
        if (cc._renderType ===
            cc._RENDER_TYPE_CANVAS)return;
        var left, bottom, right, top;
        if (cc.FIX_ARTIFACTS_BY_STRECHING_TEXEL) {
            left = (rect.x * 2 + 1) / (wide * 2);
            bottom = (rect.y * 2 + 1) / (high * 2);
            right = left + (rect.width * 2 - 2) / (wide * 2);
            top = bottom + (rect.height * 2 - 2) / (high * 2)
        } else {
            left = rect.x / wide;
            bottom = rect.y / high;
            right = left + rect.width / wide;
            top = bottom + rect.height / high
        }
        var temp = top;
        top = bottom;
        bottom = temp;
        var quads;
        var start = 0, end = 0;
        if (this._batchNode) {
            quads = this._batchNode.textureAtlas.quads;
            start = this.atlasIndex;
            end = this.atlasIndex + this._totalParticles
        } else {
            quads =
                this._quads;
            start = 0;
            end = this._totalParticles
        }
        for (var i = start; i < end; i++) {
            if (!quads[i])quads[i] = cc.V3F_C4B_T2F_QuadZero();
            var selQuad = quads[i];
            selQuad.bl.texCoords.u = left;
            selQuad.bl.texCoords.v = bottom;
            selQuad.br.texCoords.u = right;
            selQuad.br.texCoords.v = bottom;
            selQuad.tl.texCoords.u = left;
            selQuad.tl.texCoords.v = top;
            selQuad.tr.texCoords.u = right;
            selQuad.tr.texCoords.v = top
        }
    }, getBatchNode: function () {
        return this._batchNode
    }, setBatchNode: function (batchNode) {
        if (this._batchNode != batchNode) {
            var oldBatch = this._batchNode;
            this._batchNode = batchNode;
            if (batchNode) {
                var locParticles = this._particles;
                for (var i = 0; i < this._totalParticles; i++)locParticles[i].atlasIndex = i
            }
            if (!batchNode) {
                this._allocMemory();
                this.initIndices();
                this.setTexture(oldBatch.getTexture());
                this._setupVBO()
            } else if (!oldBatch) {
                this._batchNode.textureAtlas._copyQuadsToTextureAtlas(this._quads, this.atlasIndex);
                cc._renderContext.deleteBuffer(this._buffersVBO[1])
            }
        }
    }, getAtlasIndex: function () {
        return this.atlasIndex
    }, setAtlasIndex: function (atlasIndex) {
        this.atlasIndex =
            atlasIndex
    }, getDrawMode: function () {
        return this.drawMode
    }, setDrawMode: function (drawMode) {
        this.drawMode = drawMode
    }, getShapeType: function () {
        return this.shapeType
    }, setShapeType: function (shapeType) {
        this.shapeType = shapeType
    }, isActive: function () {
        return this._isActive
    }, getParticleCount: function () {
        return this.particleCount
    }, setParticleCount: function (particleCount) {
        this.particleCount = particleCount
    }, getDuration: function () {
        return this.duration
    }, setDuration: function (duration) {
        this.duration = duration
    }, getSourcePosition: function () {
        return{x: this._sourcePosition.x,
            y: this._sourcePosition.y}
    }, setSourcePosition: function (sourcePosition) {
        this._sourcePosition = sourcePosition
    }, getPosVar: function () {
        return{x: this._posVar.x, y: this._posVar.y}
    }, setPosVar: function (posVar) {
        this._posVar = posVar
    }, getLife: function () {
        return this.life
    }, setLife: function (life) {
        this.life = life
    }, getLifeVar: function () {
        return this.lifeVar
    }, setLifeVar: function (lifeVar) {
        this.lifeVar = lifeVar
    }, getAngle: function () {
        return this.angle
    }, setAngle: function (angle) {
        this.angle = angle
    }, getAngleVar: function () {
        return this.angleVar
    },
    setAngleVar: function (angleVar) {
        this.angleVar = angleVar
    }, getGravity: function () {
        if (this.emitterMode !== cc.ParticleSystem.MODE_GRAVITY)cc.log("cc.ParticleBatchNode.getGravity() : Particle Mode should be Gravity");
        var locGravity = this.modeA.gravity;
        return cc.p(locGravity.x, locGravity.y)
    }, setGravity: function (gravity) {
        if (this.emitterMode !== cc.ParticleSystem.MODE_GRAVITY)cc.log("cc.ParticleBatchNode.setGravity() : Particle Mode should be Gravity");
        this.modeA.gravity = gravity
    }, getSpeed: function () {
        if (this.emitterMode !==
            cc.ParticleSystem.MODE_GRAVITY)cc.log("cc.ParticleBatchNode.getSpeed() : Particle Mode should be Gravity");
        return this.modeA.speed
    }, setSpeed: function (speed) {
        if (this.emitterMode !== cc.ParticleSystem.MODE_GRAVITY)cc.log("cc.ParticleBatchNode.setSpeed() : Particle Mode should be Gravity");
        this.modeA.speed = speed
    }, getSpeedVar: function () {
        if (this.emitterMode !== cc.ParticleSystem.MODE_GRAVITY)cc.log("cc.ParticleBatchNode.getSpeedVar() : Particle Mode should be Gravity");
        return this.modeA.speedVar
    }, setSpeedVar: function (speedVar) {
        if (this.emitterMode !==
            cc.ParticleSystem.MODE_GRAVITY)cc.log("cc.ParticleBatchNode.setSpeedVar() : Particle Mode should be Gravity");
        this.modeA.speedVar = speedVar
    }, getTangentialAccel: function () {
        if (this.emitterMode !== cc.ParticleSystem.MODE_GRAVITY)cc.log("cc.ParticleBatchNode.getTangentialAccel() : Particle Mode should be Gravity");
        return this.modeA.tangentialAccel
    }, setTangentialAccel: function (tangentialAccel) {
        if (this.emitterMode !== cc.ParticleSystem.MODE_GRAVITY)cc.log("cc.ParticleBatchNode.setTangentialAccel() : Particle Mode should be Gravity");
        this.modeA.tangentialAccel = tangentialAccel
    }, getTangentialAccelVar: function () {
        if (this.emitterMode !== cc.ParticleSystem.MODE_GRAVITY)cc.log("cc.ParticleBatchNode.getTangentialAccelVar() : Particle Mode should be Gravity");
        return this.modeA.tangentialAccelVar
    }, setTangentialAccelVar: function (tangentialAccelVar) {
        if (this.emitterMode !== cc.ParticleSystem.MODE_GRAVITY)cc.log("cc.ParticleBatchNode.setTangentialAccelVar() : Particle Mode should be Gravity");
        this.modeA.tangentialAccelVar = tangentialAccelVar
    }, getRadialAccel: function () {
        if (this.emitterMode !==
            cc.ParticleSystem.MODE_GRAVITY)cc.log("cc.ParticleBatchNode.getRadialAccel() : Particle Mode should be Gravity");
        return this.modeA.radialAccel
    }, setRadialAccel: function (radialAccel) {
        if (this.emitterMode !== cc.ParticleSystem.MODE_GRAVITY)cc.log("cc.ParticleBatchNode.setRadialAccel() : Particle Mode should be Gravity");
        this.modeA.radialAccel = radialAccel
    }, getRadialAccelVar: function () {
        if (this.emitterMode !== cc.ParticleSystem.MODE_GRAVITY)cc.log("cc.ParticleBatchNode.getRadialAccelVar() : Particle Mode should be Gravity");
        return this.modeA.radialAccelVar
    }, setRadialAccelVar: function (radialAccelVar) {
        if (this.emitterMode !== cc.ParticleSystem.MODE_GRAVITY)cc.log("cc.ParticleBatchNode.setRadialAccelVar() : Particle Mode should be Gravity");
        this.modeA.radialAccelVar = radialAccelVar
    }, getRotationIsDir: function () {
        if (this.emitterMode !== cc.ParticleSystem.MODE_GRAVITY)cc.log("cc.ParticleBatchNode.getRotationIsDir() : Particle Mode should be Gravity");
        return this.modeA.rotationIsDir
    }, setRotationIsDir: function (t) {
        if (this.emitterMode !==
            cc.ParticleSystem.MODE_GRAVITY)cc.log("cc.ParticleBatchNode.setRotationIsDir() : Particle Mode should be Gravity");
        this.modeA.rotationIsDir = t
    }, getStartRadius: function () {
        if (this.emitterMode !== cc.ParticleSystem.MODE_RADIUS)cc.log("cc.ParticleBatchNode.getStartRadius() : Particle Mode should be Radius");
        return this.modeB.startRadius
    }, setStartRadius: function (startRadius) {
        if (this.emitterMode !== cc.ParticleSystem.MODE_RADIUS)cc.log("cc.ParticleBatchNode.setStartRadius() : Particle Mode should be Radius");
        this.modeB.startRadius = startRadius
    }, getStartRadiusVar: function () {
        if (this.emitterMode !== cc.ParticleSystem.MODE_RADIUS)cc.log("cc.ParticleBatchNode.getStartRadiusVar() : Particle Mode should be Radius");
        return this.modeB.startRadiusVar
    }, setStartRadiusVar: function (startRadiusVar) {
        if (this.emitterMode !== cc.ParticleSystem.MODE_RADIUS)cc.log("cc.ParticleBatchNode.setStartRadiusVar() : Particle Mode should be Radius");
        this.modeB.startRadiusVar = startRadiusVar
    }, getEndRadius: function () {
        if (this.emitterMode !==
            cc.ParticleSystem.MODE_RADIUS)cc.log("cc.ParticleBatchNode.getEndRadius() : Particle Mode should be Radius");
        return this.modeB.endRadius
    }, setEndRadius: function (endRadius) {
        if (this.emitterMode !== cc.ParticleSystem.MODE_RADIUS)cc.log("cc.ParticleBatchNode.setEndRadius() : Particle Mode should be Radius");
        this.modeB.endRadius = endRadius
    }, getEndRadiusVar: function () {
        if (this.emitterMode !== cc.ParticleSystem.MODE_RADIUS)cc.log("cc.ParticleBatchNode.getEndRadiusVar() : Particle Mode should be Radius");
        return this.modeB.endRadiusVar
    },
    setEndRadiusVar: function (endRadiusVar) {
        if (this.emitterMode !== cc.ParticleSystem.MODE_RADIUS)cc.log("cc.ParticleBatchNode.setEndRadiusVar() : Particle Mode should be Radius");
        this.modeB.endRadiusVar = endRadiusVar
    }, getRotatePerSecond: function () {
        if (this.emitterMode !== cc.ParticleSystem.MODE_RADIUS)cc.log("cc.ParticleBatchNode.getRotatePerSecond() : Particle Mode should be Radius");
        return this.modeB.rotatePerSecond
    }, setRotatePerSecond: function (degrees) {
        if (this.emitterMode !== cc.ParticleSystem.MODE_RADIUS)cc.log("cc.ParticleBatchNode.setRotatePerSecond() : Particle Mode should be Radius");
        this.modeB.rotatePerSecond = degrees
    }, getRotatePerSecondVar: function () {
        if (this.emitterMode !== cc.ParticleSystem.MODE_RADIUS)cc.log("cc.ParticleBatchNode.getRotatePerSecondVar() : Particle Mode should be Radius");
        return this.modeB.rotatePerSecondVar
    }, setRotatePerSecondVar: function (degrees) {
        if (this.emitterMode !== cc.ParticleSystem.MODE_RADIUS)cc.log("cc.ParticleBatchNode.setRotatePerSecondVar() : Particle Mode should be Radius");
        this.modeB.rotatePerSecondVar = degrees
    }, setScale: function (scale, scaleY) {
        this._transformSystemDirty =
            true;
        cc.Node.prototype.setScale.call(this, scale, scaleY)
    }, setRotation: function (newRotation) {
        this._transformSystemDirty = true;
        cc.Node.prototype.setRotation.call(this, newRotation)
    }, setScaleX: function (newScaleX) {
        this._transformSystemDirty = true;
        cc.Node.prototype.setScaleX.call(this, newScaleX)
    }, setScaleY: function (newScaleY) {
        this._transformSystemDirty = true;
        cc.Node.prototype.setScaleY.call(this, newScaleY)
    }, getStartSize: function () {
        return this.startSize
    }, setStartSize: function (startSize) {
        this.startSize = startSize
    },
    getStartSizeVar: function () {
        return this.startSizeVar
    }, setStartSizeVar: function (startSizeVar) {
        this.startSizeVar = startSizeVar
    }, getEndSize: function () {
        return this.endSize
    }, setEndSize: function (endSize) {
        this.endSize = endSize
    }, getEndSizeVar: function () {
        return this.endSizeVar
    }, setEndSizeVar: function (endSizeVar) {
        this.endSizeVar = endSizeVar
    }, getStartColor: function () {
        return this._startColor
    }, setStartColor: function (startColor) {
        this._startColor = cc.color(startColor)
    }, getStartColorVar: function () {
        return this._startColorVar
    },
    setStartColorVar: function (startColorVar) {
        this._startColorVar = cc.color(startColorVar)
    }, getEndColor: function () {
        return this._endColor
    }, setEndColor: function (endColor) {
        this._endColor = cc.color(endColor)
    }, getEndColorVar: function () {
        return this._endColorVar
    }, setEndColorVar: function (endColorVar) {
        this._endColorVar = cc.color(endColorVar)
    }, getStartSpin: function () {
        return this.startSpin
    }, setStartSpin: function (startSpin) {
        this.startSpin = startSpin
    }, getStartSpinVar: function () {
        return this.startSpinVar
    }, setStartSpinVar: function (startSpinVar) {
        this.startSpinVar =
            startSpinVar
    }, getEndSpin: function () {
        return this.endSpin
    }, setEndSpin: function (endSpin) {
        this.endSpin = endSpin
    }, getEndSpinVar: function () {
        return this.endSpinVar
    }, setEndSpinVar: function (endSpinVar) {
        this.endSpinVar = endSpinVar
    }, getEmissionRate: function () {
        return this.emissionRate
    }, setEmissionRate: function (emissionRate) {
        this.emissionRate = emissionRate
    }, getTotalParticles: function () {
        return this._totalParticles
    }, setTotalParticles: function (tp) {
        if (cc._renderType === cc._RENDER_TYPE_CANVAS) {
            this._totalParticles = tp <
                200 ? tp : 200;
            return
        }
        if (tp > this._allocatedParticles) {
            var quadSize = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT;
            this._indices = new Uint16Array(tp * 6);
            var locQuadsArrayBuffer = new ArrayBuffer(tp * quadSize);
            var locParticles = this._particles;
            locParticles.length = 0;
            var locQuads = this._quads;
            locQuads.length = 0;
            for (var j = 0; j < tp; j++) {
                locParticles[j] = new cc.Particle;
                locQuads[j] = new cc.V3F_C4B_T2F_Quad(null, null, null, null, locQuadsArrayBuffer, j * quadSize)
            }
            this._allocatedParticles = tp;
            this._totalParticles = tp;
            if (this._batchNode)for (var i =
                0; i < tp; i++)locParticles[i].atlasIndex = i;
            this._quadsArrayBuffer = locQuadsArrayBuffer;
            this.initIndices();
            this._setupVBO();
            if (this._texture)this.initTexCoordsWithRect(cc.rect(0, 0, this._texture.width, this._texture.height))
        } else this._totalParticles = tp;
        this.resetSystem()
    }, getTexture: function () {
        return this._texture
    }, setTexture: function (texture) {
        if (texture.isLoaded())this.setTextureWithRect(texture, cc.rect(0, 0, texture.width, texture.height)); else {
            this._textureLoaded = false;
            texture.addLoadedEventListener(function (sender) {
                this._textureLoaded =
                    true;
                this.setTextureWithRect(sender, cc.rect(0, 0, sender.width, sender.height))
            }, this)
        }
    }, getBlendFunc: function () {
        return this._blendFunc
    }, setBlendFunc: function (src, dst) {
        if (dst === undefined) {
            if (this._blendFunc != src) {
                this._blendFunc = src;
                this._updateBlendFunc()
            }
        } else if (this._blendFunc.src != src || this._blendFunc.dst != dst) {
            this._blendFunc = {src: src, dst: dst};
            this._updateBlendFunc()
        }
    }, isOpacityModifyRGB: function () {
        return this._opacityModifyRGB
    }, setOpacityModifyRGB: function (newValue) {
        this._opacityModifyRGB = newValue
    },
    isBlendAdditive: function () {
        return this._blendFunc.src == cc.SRC_ALPHA && this._blendFunc.dst == cc.ONE || this._blendFunc.src == cc.ONE && this._blendFunc.dst == cc.ONE
    }, setBlendAdditive: function (isBlendAdditive) {
        var locBlendFunc = this._blendFunc;
        if (isBlendAdditive) {
            locBlendFunc.src = cc.SRC_ALPHA;
            locBlendFunc.dst = cc.ONE
        } else if (cc._renderType === cc._RENDER_TYPE_WEBGL)if (this._texture && !this._texture.hasPremultipliedAlpha()) {
            locBlendFunc.src = cc.SRC_ALPHA;
            locBlendFunc.dst = cc.ONE_MINUS_SRC_ALPHA
        } else {
            locBlendFunc.src =
                cc.BLEND_SRC;
            locBlendFunc.dst = cc.BLEND_DST
        } else {
            locBlendFunc.src = cc.BLEND_SRC;
            locBlendFunc.dst = cc.BLEND_DST
        }
    }, getPositionType: function () {
        return this.positionType
    }, setPositionType: function (positionType) {
        this.positionType = positionType
    }, isAutoRemoveOnFinish: function () {
        return this.autoRemoveOnFinish
    }, setAutoRemoveOnFinish: function (isAutoRemoveOnFinish) {
        this.autoRemoveOnFinish = isAutoRemoveOnFinish
    }, getEmitterMode: function () {
        return this.emitterMode
    }, setEmitterMode: function (emitterMode) {
        this.emitterMode =
            emitterMode
    }, init: function () {
        return this.initWithTotalParticles(150)
    }, initWithFile: function (plistFile) {
        this._plistFile = plistFile;
        var dict = cc.loader.getRes(plistFile);
        if (!dict) {
            cc.log("cc.ParticleSystem.initWithFile(): Particles: file not found");
            return false
        }
        return this.initWithDictionary(dict, "")
    }, getBoundingBoxToWorld: function () {
        return cc.rect(0, 0, cc._canvas.width, cc._canvas.height)
    }, initWithDictionary: function (dictionary, dirname) {
        var ret = false;
        var buffer = null;
        var image = null;
        var locValueForKey =
            this._valueForKey;
        var maxParticles = parseInt(locValueForKey("maxParticles", dictionary));
        if (this.initWithTotalParticles(maxParticles)) {
            this.angle = parseFloat(locValueForKey("angle", dictionary));
            this.angleVar = parseFloat(locValueForKey("angleVariance", dictionary));
            this.duration = parseFloat(locValueForKey("duration", dictionary));
            this._blendFunc.src = parseInt(locValueForKey("blendFuncSource", dictionary));
            this._blendFunc.dst = parseInt(locValueForKey("blendFuncDestination", dictionary));
            var locStartColor = this._startColor;
            locStartColor.r = parseFloat(locValueForKey("startColorRed", dictionary)) * 255;
            locStartColor.g = parseFloat(locValueForKey("startColorGreen", dictionary)) * 255;
            locStartColor.b = parseFloat(locValueForKey("startColorBlue", dictionary)) * 255;
            locStartColor.a = parseFloat(locValueForKey("startColorAlpha", dictionary)) * 255;
            var locStartColorVar = this._startColorVar;
            locStartColorVar.r = parseFloat(locValueForKey("startColorVarianceRed", dictionary)) * 255;
            locStartColorVar.g = parseFloat(locValueForKey("startColorVarianceGreen",
                dictionary)) * 255;
            locStartColorVar.b = parseFloat(locValueForKey("startColorVarianceBlue", dictionary)) * 255;
            locStartColorVar.a = parseFloat(locValueForKey("startColorVarianceAlpha", dictionary)) * 255;
            var locEndColor = this._endColor;
            locEndColor.r = parseFloat(locValueForKey("finishColorRed", dictionary)) * 255;
            locEndColor.g = parseFloat(locValueForKey("finishColorGreen", dictionary)) * 255;
            locEndColor.b = parseFloat(locValueForKey("finishColorBlue", dictionary)) * 255;
            locEndColor.a = parseFloat(locValueForKey("finishColorAlpha",
                dictionary)) * 255;
            var locEndColorVar = this._endColorVar;
            locEndColorVar.r = parseFloat(locValueForKey("finishColorVarianceRed", dictionary)) * 255;
            locEndColorVar.g = parseFloat(locValueForKey("finishColorVarianceGreen", dictionary)) * 255;
            locEndColorVar.b = parseFloat(locValueForKey("finishColorVarianceBlue", dictionary)) * 255;
            locEndColorVar.a = parseFloat(locValueForKey("finishColorVarianceAlpha", dictionary)) * 255;
            this.startSize = parseFloat(locValueForKey("startParticleSize", dictionary));
            this.startSizeVar = parseFloat(locValueForKey("startParticleSizeVariance",
                dictionary));
            this.endSize = parseFloat(locValueForKey("finishParticleSize", dictionary));
            this.endSizeVar = parseFloat(locValueForKey("finishParticleSizeVariance", dictionary));
            this.setPosition(parseFloat(locValueForKey("sourcePositionx", dictionary)), parseFloat(locValueForKey("sourcePositiony", dictionary)));
            this._posVar.x = parseFloat(locValueForKey("sourcePositionVariancex", dictionary));
            this._posVar.y = parseFloat(locValueForKey("sourcePositionVariancey", dictionary));
            this.startSpin = parseFloat(locValueForKey("rotationStart",
                dictionary));
            this.startSpinVar = parseFloat(locValueForKey("rotationStartVariance", dictionary));
            this.endSpin = parseFloat(locValueForKey("rotationEnd", dictionary));
            this.endSpinVar = parseFloat(locValueForKey("rotationEndVariance", dictionary));
            this.emitterMode = parseInt(locValueForKey("emitterType", dictionary));
            if (this.emitterMode == cc.ParticleSystem.MODE_GRAVITY) {
                var locModeA = this.modeA;
                locModeA.gravity.x = parseFloat(locValueForKey("gravityx", dictionary));
                locModeA.gravity.y = parseFloat(locValueForKey("gravityy",
                    dictionary));
                locModeA.speed = parseFloat(locValueForKey("speed", dictionary));
                locModeA.speedVar = parseFloat(locValueForKey("speedVariance", dictionary));
                var pszTmp = locValueForKey("radialAcceleration", dictionary);
                locModeA.radialAccel = pszTmp ? parseFloat(pszTmp) : 0;
                pszTmp = locValueForKey("radialAccelVariance", dictionary);
                locModeA.radialAccelVar = pszTmp ? parseFloat(pszTmp) : 0;
                pszTmp = locValueForKey("tangentialAcceleration", dictionary);
                locModeA.tangentialAccel = pszTmp ? parseFloat(pszTmp) : 0;
                pszTmp = locValueForKey("tangentialAccelVariance",
                    dictionary);
                locModeA.tangentialAccelVar = pszTmp ? parseFloat(pszTmp) : 0;
                var locRotationIsDir = locValueForKey("rotationIsDir", dictionary).toLowerCase();
                locModeA.rotationIsDir = locRotationIsDir != null && (locRotationIsDir === "true" || locRotationIsDir === "1")
            } else if (this.emitterMode == cc.ParticleSystem.MODE_RADIUS) {
                var locModeB = this.modeB;
                locModeB.startRadius = parseFloat(locValueForKey("maxRadius", dictionary));
                locModeB.startRadiusVar = parseFloat(locValueForKey("maxRadiusVariance", dictionary));
                locModeB.endRadius = parseFloat(locValueForKey("minRadius",
                    dictionary));
                locModeB.endRadiusVar = 0;
                locModeB.rotatePerSecond = parseFloat(locValueForKey("rotatePerSecond", dictionary));
                locModeB.rotatePerSecondVar = parseFloat(locValueForKey("rotatePerSecondVariance", dictionary))
            } else {
                cc.log("cc.ParticleSystem.initWithDictionary(): Invalid emitterType in config file");
                return false
            }
            this.life = parseFloat(locValueForKey("particleLifespan", dictionary));
            this.lifeVar = parseFloat(locValueForKey("particleLifespanVariance", dictionary));
            this.emissionRate = this._totalParticles /
                this.life;
            if (!this._batchNode) {
                this._opacityModifyRGB = false;
                var textureName = locValueForKey("textureFileName", dictionary);
                var imgPath = cc.path.changeBasename(this._plistFile, textureName);
                var tex = cc.textureCache.textureForKey(imgPath);
                if (tex)this.setTexture(tex); else {
                    var textureData = locValueForKey("textureImageData", dictionary);
                    if (textureData && textureData.length == 0) {
                        tex = cc.textureCache.addImage(imgPath);
                        if (!tex)return false;
                        this.setTexture(tex)
                    } else {
                        buffer = cc.unzipBase64AsArray(textureData, 1);
                        if (!buffer) {
                            cc.log("cc.ParticleSystem: error decoding or ungzipping textureImageData");
                            return false
                        }
                        var imageFormat = cc.getImageFormatByData(buffer);
                        if (imageFormat !== cc.FMT_TIFF && imageFormat !== cc.FMT_PNG) {
                            cc.log("cc.ParticleSystem: unknown image format with Data");
                            return false
                        }
                        var canvasObj = cc.newElement("canvas");
                        if (imageFormat === cc.FMT_PNG) {
                            var myPngObj = new cc.PNGReader(buffer);
                            myPngObj.render(canvasObj)
                        } else {
                            var myTIFFObj = cc.tiffReader;
                            myTIFFObj.parseTIFF(buffer, canvasObj)
                        }
                        cc.textureCache.cacheImage(imgPath, canvasObj);
                        var addTexture = cc.textureCache.textureForKey(imgPath);
                        if (!addTexture)cc.log("cc.ParticleSystem.initWithDictionary() : error loading the texture");
                        this.setTexture(addTexture)
                    }
                }
            }
            ret = true
        }
        return ret
    }, initWithTotalParticles: function (numberOfParticles) {
        this._totalParticles = numberOfParticles;
        var i, locParticles = this._particles;
        locParticles.length = 0;
        for (i = 0; i < numberOfParticles; i++)locParticles[i] = new cc.Particle;
        if (!locParticles) {
            cc.log("Particle system: not enough memory");
            return false
        }
        this._allocatedParticles = numberOfParticles;
        if (this._batchNode)for (i = 0; i < this._totalParticles; i++)locParticles[i].atlasIndex = i;
        this._isActive = true;
        this._blendFunc.src =
            cc.BLEND_SRC;
        this._blendFunc.dst = cc.BLEND_DST;
        this.positionType = cc.ParticleSystem.TYPE_FREE;
        this.emitterMode = cc.ParticleSystem.MODE_GRAVITY;
        this.autoRemoveOnFinish = false;
        this._transformSystemDirty = false;
        this.scheduleUpdateWithPriority(1);
        if (cc._renderType === cc._RENDER_TYPE_WEBGL) {
            if (!this._allocMemory())return false;
            this.initIndices();
            this._setupVBO();
            this.shaderProgram = cc.shaderCache.programForKey(cc.SHADER_POSITION_TEXTURECOLOR)
        }
        return true
    }, destroyParticleSystem: function () {
        this.unscheduleUpdate()
    },
    addParticle: function () {
        if (this.isFull())return false;
        var particle, particles = this._particles;
        if (cc._renderType === cc._RENDER_TYPE_CANVAS)if (this.particleCount < particles.length)particle = particles[this.particleCount]; else {
            particle = new cc.Particle;
            particles.push(particle)
        } else particle = particles[this.particleCount];
        this.initParticle(particle);
        ++this.particleCount;
        return true
    }, initParticle: function (particle) {
        var locRandomMinus11 = cc.randomMinus1To1;
        particle.timeToLive = this.life + this.lifeVar * locRandomMinus11();
        particle.timeToLive = Math.max(0, particle.timeToLive);
        particle.pos.x = this._sourcePosition.x + this._posVar.x * locRandomMinus11();
        particle.pos.y = this._sourcePosition.y + this._posVar.y * locRandomMinus11();
        var start, end;
        var locStartColor = this._startColor, locStartColorVar = this._startColorVar;
        var locEndColor = this._endColor, locEndColorVar = this._endColorVar;
        if (cc._renderType === cc._RENDER_TYPE_CANVAS) {
            start = cc.color(cc.clampf(locStartColor.r + locStartColorVar.r * locRandomMinus11(), 0, 255), cc.clampf(locStartColor.g +
                locStartColorVar.g * locRandomMinus11(), 0, 255), cc.clampf(locStartColor.b + locStartColorVar.b * locRandomMinus11(), 0, 255), cc.clampf(locStartColor.a + locStartColorVar.a * locRandomMinus11(), 0, 255));
            end = cc.color(cc.clampf(locEndColor.r + locEndColorVar.r * locRandomMinus11(), 0, 255), cc.clampf(locEndColor.g + locEndColorVar.g * locRandomMinus11(), 0, 255), cc.clampf(locEndColor.b + locEndColorVar.b * locRandomMinus11(), 0, 255), cc.clampf(locEndColor.a + locEndColorVar.a * locRandomMinus11(), 0, 255))
        } else {
            start = {r: cc.clampf(locStartColor.r +
                locStartColorVar.r * locRandomMinus11(), 0, 255), g: cc.clampf(locStartColor.g + locStartColorVar.g * locRandomMinus11(), 0, 255), b: cc.clampf(locStartColor.b + locStartColorVar.b * locRandomMinus11(), 0, 255), a: cc.clampf(locStartColor.a + locStartColorVar.a * locRandomMinus11(), 0, 255)};
            end = {r: cc.clampf(locEndColor.r + locEndColorVar.r * locRandomMinus11(), 0, 255), g: cc.clampf(locEndColor.g + locEndColorVar.g * locRandomMinus11(), 0, 255), b: cc.clampf(locEndColor.b + locEndColorVar.b * locRandomMinus11(), 0, 255), a: cc.clampf(locEndColor.a +
                locEndColorVar.a * locRandomMinus11(), 0, 255)}
        }
        particle.color = start;
        var locParticleDeltaColor = particle.deltaColor, locParticleTimeToLive = particle.timeToLive;
        locParticleDeltaColor.r = (end.r - start.r) / locParticleTimeToLive;
        locParticleDeltaColor.g = (end.g - start.g) / locParticleTimeToLive;
        locParticleDeltaColor.b = (end.b - start.b) / locParticleTimeToLive;
        locParticleDeltaColor.a = (end.a - start.a) / locParticleTimeToLive;
        var startS = this.startSize + this.startSizeVar * locRandomMinus11();
        startS = Math.max(0, startS);
        particle.size =
            startS;
        if (this.endSize === cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE)particle.deltaSize = 0; else {
            var endS = this.endSize + this.endSizeVar * locRandomMinus11();
            endS = Math.max(0, endS);
            particle.deltaSize = (endS - startS) / locParticleTimeToLive
        }
        var startA = this.startSpin + this.startSpinVar * locRandomMinus11();
        var endA = this.endSpin + this.endSpinVar * locRandomMinus11();
        particle.rotation = startA;
        particle.deltaRotation = (endA - startA) / locParticleTimeToLive;
        if (this.positionType == cc.ParticleSystem.TYPE_FREE)particle.startPos =
            this.convertToWorldSpace(this._pointZeroForParticle); else if (this.positionType == cc.ParticleSystem.TYPE_RELATIVE) {
            particle.startPos.x = this._position.x;
            particle.startPos.y = this._position.y
        }
        var a = cc.degreesToRadians(this.angle + this.angleVar * locRandomMinus11());
        if (this.emitterMode === cc.ParticleSystem.MODE_GRAVITY) {
            var locModeA = this.modeA, locParticleModeA = particle.modeA;
            var s = locModeA.speed + locModeA.speedVar * locRandomMinus11();
            locParticleModeA.dir.x = Math.cos(a);
            locParticleModeA.dir.y = Math.sin(a);
            cc.pMultIn(locParticleModeA.dir,
                s);
            locParticleModeA.radialAccel = locModeA.radialAccel + locModeA.radialAccelVar * locRandomMinus11();
            locParticleModeA.tangentialAccel = locModeA.tangentialAccel + locModeA.tangentialAccelVar * locRandomMinus11();
            if (locModeA.rotationIsDir)particle.rotation = -cc.radiansToDegress(cc.pToAngle(locParticleModeA.dir))
        } else {
            var locModeB = this.modeB, locParitlceModeB = particle.modeB;
            var startRadius = locModeB.startRadius + locModeB.startRadiusVar * locRandomMinus11();
            var endRadius = locModeB.endRadius + locModeB.endRadiusVar * locRandomMinus11();
            locParitlceModeB.radius = startRadius;
            locParitlceModeB.deltaRadius = locModeB.endRadius === cc.ParticleSystem.START_RADIUS_EQUAL_TO_END_RADIUS ? 0 : (endRadius - startRadius) / locParticleTimeToLive;
            locParitlceModeB.angle = a;
            locParitlceModeB.degreesPerSecond = cc.degreesToRadians(locModeB.rotatePerSecond + locModeB.rotatePerSecondVar * locRandomMinus11())
        }
    }, stopSystem: function () {
        this._isActive = false;
        this._elapsed = this.duration;
        this._emitCounter = 0
    }, resetSystem: function () {
        this._isActive = true;
        this._elapsed = 0;
        var locParticles =
            this._particles;
        for (this._particleIdx = 0; this._particleIdx < this.particleCount; ++this._particleIdx)locParticles[this._particleIdx].timeToLive = 0
    }, isFull: function () {
        return this.particleCount >= this._totalParticles
    }, updateQuadWithParticle: function (particle, newPosition) {
        var quad = null;
        if (this._batchNode) {
            var batchQuads = this._batchNode.textureAtlas.quads;
            quad = batchQuads[this.atlasIndex + particle.atlasIndex];
            this._batchNode.textureAtlas.dirty = true
        } else quad = this._quads[this._particleIdx];
        var r, g, b, a;
        if (this._opacityModifyRGB) {
            r =
                0 | particle.color.r * particle.color.a / 255;
            g = 0 | particle.color.g * particle.color.a / 255;
            b = 0 | particle.color.b * particle.color.a / 255
        } else {
            r = 0 | particle.color.r;
            g = 0 | particle.color.g;
            b = 0 | particle.color.b
        }
        a = 0 | particle.color.a;
        var locColors = quad.bl.colors;
        locColors.r = r;
        locColors.g = g;
        locColors.b = b;
        locColors.a = a;
        locColors = quad.br.colors;
        locColors.r = r;
        locColors.g = g;
        locColors.b = b;
        locColors.a = a;
        locColors = quad.tl.colors;
        locColors.r = r;
        locColors.g = g;
        locColors.b = b;
        locColors.a = a;
        locColors = quad.tr.colors;
        locColors.r = r;
        locColors.g =
            g;
        locColors.b = b;
        locColors.a = a;
        var size_2 = particle.size / 2;
        if (particle.rotation) {
            var x1 = -size_2;
            var y1 = -size_2;
            var x2 = size_2;
            var y2 = size_2;
            var x = newPosition.x;
            var y = newPosition.y;
            var rad = -cc.degreesToRadians(particle.rotation);
            var cr = Math.cos(rad);
            var sr = Math.sin(rad);
            var ax = x1 * cr - y1 * sr + x;
            var ay = x1 * sr + y1 * cr + y;
            var bx = x2 * cr - y1 * sr + x;
            var by = x2 * sr + y1 * cr + y;
            var cx = x2 * cr - y2 * sr + x;
            var cy = x2 * sr + y2 * cr + y;
            var dx = x1 * cr - y2 * sr + x;
            var dy = x1 * sr + y2 * cr + y;
            quad.bl.vertices.x = ax;
            quad.bl.vertices.y = ay;
            quad.br.vertices.x = bx;
            quad.br.vertices.y = by;
            quad.tl.vertices.x = dx;
            quad.tl.vertices.y = dy;
            quad.tr.vertices.x = cx;
            quad.tr.vertices.y = cy
        } else {
            quad.bl.vertices.x = newPosition.x - size_2;
            quad.bl.vertices.y = newPosition.y - size_2;
            quad.br.vertices.x = newPosition.x + size_2;
            quad.br.vertices.y = newPosition.y - size_2;
            quad.tl.vertices.x = newPosition.x - size_2;
            quad.tl.vertices.y = newPosition.y + size_2;
            quad.tr.vertices.x = newPosition.x + size_2;
            quad.tr.vertices.y = newPosition.y + size_2
        }
    }, postStep: function () {
        if (cc._renderType === cc._RENDER_TYPE_WEBGL) {
            var gl =
                cc._renderContext;
            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffersVBO[0]);
            gl.bufferData(gl.ARRAY_BUFFER, this._quadsArrayBuffer, gl.DYNAMIC_DRAW)
        }
    }, update: function (dt) {
        if (this._isActive && this.emissionRate) {
            var rate = 1 / this.emissionRate;
            if (this.particleCount < this._totalParticles)this._emitCounter += dt;
            while (this.particleCount < this._totalParticles && this._emitCounter > rate) {
                this.addParticle();
                this._emitCounter -= rate
            }
            this._elapsed += dt;
            if (this.duration != -1 && this.duration < this._elapsed)this.stopSystem()
        }
        this._particleIdx =
            0;
        var currentPosition = cc.Particle.TemporaryPoints[0];
        if (this.positionType == cc.ParticleSystem.TYPE_FREE)cc.pIn(currentPosition, this.convertToWorldSpace(this._pointZeroForParticle)); else if (this.positionType == cc.ParticleSystem.TYPE_RELATIVE) {
            currentPosition.x = this._position.x;
            currentPosition.y = this._position.y
        }
        if (this._visible) {
            var tpa = cc.Particle.TemporaryPoints[1], tpb = cc.Particle.TemporaryPoints[2], tpc = cc.Particle.TemporaryPoints[3];
            var locParticles = this._particles;
            while (this._particleIdx < this.particleCount) {
                cc.pZeroIn(tpa);
                cc.pZeroIn(tpb);
                cc.pZeroIn(tpc);
                var selParticle = locParticles[this._particleIdx];
                selParticle.timeToLive -= dt;
                if (selParticle.timeToLive > 0) {
                    if (this.emitterMode == cc.ParticleSystem.MODE_GRAVITY) {
                        var tmp = tpc, radial = tpa, tangential = tpb;
                        if (selParticle.pos.x || selParticle.pos.y) {
                            cc.pIn(radial, selParticle.pos);
                            cc.pNormalizeIn(radial)
                        } else cc.pZeroIn(radial);
                        cc.pIn(tangential, radial);
                        cc.pMultIn(radial, selParticle.modeA.radialAccel);
                        var newy = tangential.x;
                        tangential.x = -tangential.y;
                        tangential.y = newy;
                        cc.pMultIn(tangential,
                            selParticle.modeA.tangentialAccel);
                        cc.pIn(tmp, radial);
                        cc.pAddIn(tmp, tangential);
                        cc.pAddIn(tmp, this.modeA.gravity);
                        cc.pMultIn(tmp, dt);
                        cc.pAddIn(selParticle.modeA.dir, tmp);
                        cc.pIn(tmp, selParticle.modeA.dir);
                        cc.pMultIn(tmp, dt);
                        cc.pAddIn(selParticle.pos, tmp)
                    } else {
                        var selModeB = selParticle.modeB;
                        selModeB.angle += selModeB.degreesPerSecond * dt;
                        selModeB.radius += selModeB.deltaRadius * dt;
                        selParticle.pos.x = -Math.cos(selModeB.angle) * selModeB.radius;
                        selParticle.pos.y = -Math.sin(selModeB.angle) * selModeB.radius
                    }
                    if (!this._dontTint) {
                        selParticle.color.r +=
                            selParticle.deltaColor.r * dt;
                        selParticle.color.g += selParticle.deltaColor.g * dt;
                        selParticle.color.b += selParticle.deltaColor.b * dt;
                        selParticle.color.a += selParticle.deltaColor.a * dt;
                        selParticle.isChangeColor = true
                    }
                    selParticle.size += selParticle.deltaSize * dt;
                    selParticle.size = Math.max(0, selParticle.size);
                    selParticle.rotation += selParticle.deltaRotation * dt;
                    var newPos = tpa;
                    if (this.positionType == cc.ParticleSystem.TYPE_FREE || this.positionType == cc.ParticleSystem.TYPE_RELATIVE) {
                        var diff = tpb;
                        cc.pIn(diff, currentPosition);
                        cc.pSubIn(diff, selParticle.startPos);
                        cc.pIn(newPos, selParticle.pos);
                        cc.pSubIn(newPos, diff)
                    } else cc.pIn(newPos, selParticle.pos);
                    if (this._batchNode) {
                        newPos.x += this._position.x;
                        newPos.y += this._position.y
                    }
                    if (cc._renderType == cc._RENDER_TYPE_WEBGL)this.updateQuadWithParticle(selParticle, newPos); else cc.pIn(selParticle.drawPos, newPos);
                    ++this._particleIdx
                } else {
                    var currentIndex = selParticle.atlasIndex;
                    if (this._particleIdx !== this.particleCount - 1) {
                        var deadParticle = locParticles[this._particleIdx];
                        locParticles[this._particleIdx] =
                            locParticles[this.particleCount - 1];
                        locParticles[this.particleCount - 1] = deadParticle
                    }
                    if (this._batchNode) {
                        this._batchNode.disableParticle(this.atlasIndex + currentIndex);
                        locParticles[this.particleCount - 1].atlasIndex = currentIndex
                    }
                    --this.particleCount;
                    if (this.particleCount == 0 && this.autoRemoveOnFinish) {
                        this.unscheduleUpdate();
                        this._parent.removeChild(this, true);
                        return
                    }
                }
            }
            this._transformSystemDirty = false
        }
        if (!this._batchNode)this.postStep()
    }, updateWithNoTime: function () {
        this.update(0)
    }, _valueForKey: function (key, dict) {
        if (dict) {
            var pString = dict[key];
            return pString != null ? pString : ""
        }
        return""
    }, _updateBlendFunc: function () {
        if (this._batchNode) {
            cc.log("Can't change blending functions when the particle is being batched");
            return
        }
        var locTexture = this._texture;
        if (locTexture && locTexture instanceof cc.Texture2D) {
            this._opacityModifyRGB = false;
            var locBlendFunc = this._blendFunc;
            if (locBlendFunc.src == cc.BLEND_SRC && locBlendFunc.dst == cc.BLEND_DST)if (locTexture.hasPremultipliedAlpha())this._opacityModifyRGB = true; else {
                locBlendFunc.src =
                    cc.SRC_ALPHA;
                locBlendFunc.dst = cc.ONE_MINUS_SRC_ALPHA
            }
        }
    }, clone: function () {
        var retParticle = new cc.ParticleSystem;
        if (retParticle.initWithTotalParticles(this._totalParticles)) {
            retParticle.angle = this.angle;
            retParticle.angleVar = this.angleVar;
            retParticle.duration = this.duration;
            retParticle._blendFunc.src = this._blendFunc.src;
            retParticle._blendFunc.dst = this._blendFunc.dst;
            var particleStartColor = retParticle._startColor, locStartColor = this._startColor;
            particleStartColor.r = locStartColor.r;
            particleStartColor.g =
                locStartColor.g;
            particleStartColor.b = locStartColor.b;
            particleStartColor.a = locStartColor.a;
            var particleStartColorVar = retParticle._startColorVar, locStartColorVar = this._startColorVar;
            particleStartColorVar.r = locStartColorVar.r;
            particleStartColorVar.g = locStartColorVar.g;
            particleStartColorVar.b = locStartColorVar.b;
            particleStartColorVar.a = locStartColorVar.a;
            var particleEndColor = retParticle._endColor, locEndColor = this._endColor;
            particleEndColor.r = locEndColor.r;
            particleEndColor.g = locEndColor.g;
            particleEndColor.b =
                locEndColor.b;
            particleEndColor.a = locEndColor.a;
            var particleEndColorVar = retParticle._endColorVar, locEndColorVar = this._endColorVar;
            particleEndColorVar.r = locEndColorVar.r;
            particleEndColorVar.g = locEndColorVar.g;
            particleEndColorVar.b = locEndColorVar.b;
            particleEndColorVar.a = locEndColorVar.a;
            retParticle.startSize = this.startSize;
            retParticle.startSizeVar = this.startSizeVar;
            retParticle.endSize = this.endSize;
            retParticle.endSizeVar = this.endSizeVar;
            retParticle.x = this._position.x;
            retParticle.y = this._position.y;
            retParticle._posVar.x =
                this._posVar.x;
            retParticle._posVar.y = this._posVar.y;
            retParticle.startSpin = this.startSpin;
            retParticle.startSpinVar = this.startSpinVar;
            retParticle.endSpin = this.endSpin;
            retParticle.endSpinVar = this.endSpinVar;
            retParticle.emitterMode = this.emitterMode;
            if (this.emitterMode == cc.ParticleSystem.MODE_GRAVITY) {
                var particleModeA = retParticle.modeA, locModeA = this.modeA;
                particleModeA.gravity.x = locModeA.gravity.x;
                particleModeA.gravity.y = locModeA.gravity.y;
                particleModeA.speed = locModeA.speed;
                particleModeA.speedVar = locModeA.speedVar;
                particleModeA.radialAccel = locModeA.radialAccel;
                particleModeA.radialAccelVar = locModeA.radialAccelVar;
                particleModeA.tangentialAccel = locModeA.tangentialAccel;
                particleModeA.tangentialAccelVar = locModeA.tangentialAccelVar
            } else if (this.emitterMode == cc.ParticleSystem.MODE_RADIUS) {
                var particleModeB = retParticle.modeB, locModeB = this.modeB;
                particleModeB.startRadius = locModeB.startRadius;
                particleModeB.startRadiusVar = locModeB.startRadiusVar;
                particleModeB.endRadius = locModeB.endRadius;
                particleModeB.endRadiusVar = locModeB.endRadiusVar;
                particleModeB.rotatePerSecond = locModeB.rotatePerSecond;
                particleModeB.rotatePerSecondVar = locModeB.rotatePerSecondVar
            }
            retParticle.life = this.life;
            retParticle.lifeVar = this.lifeVar;
            retParticle.emissionRate = this.emissionRate;
            if (!this._batchNode) {
                retParticle._opacityModifyRGB = this._opacityModifyRGB;
                retParticle._texture = this._texture
            }
        }
        return retParticle
    }, setDisplayFrame: function (spriteFrame) {
        var locOffset = spriteFrame.getOffsetInPixels();
        if (locOffset.x != 0 || locOffset.y != 0)cc.log("cc.ParticleSystem.setDisplayFrame(): QuadParticle only supports SpriteFrames with no offsets");
        if (cc._renderType === cc._RENDER_TYPE_WEBGL)if (!this._texture || spriteFrame.getTexture()._webTextureObj != this._texture._webTextureObj)this.setTexture(spriteFrame.getTexture())
    }, setTextureWithRect: function (texture, rect) {
        var locTexture = this._texture;
        if (cc._renderType === cc._RENDER_TYPE_WEBGL) {
            if ((!locTexture || texture._webTextureObj != locTexture._webTextureObj) && locTexture != texture) {
                this._texture = texture;
                this._updateBlendFunc()
            }
        } else if ((!locTexture || texture != locTexture) && locTexture != texture) {
            this._texture =
                texture;
            this._updateBlendFunc()
        }
        this._pointRect = rect;
        this.initTexCoordsWithRect(rect)
    }, draw: function (ctx) {
        if (!this._textureLoaded || this._batchNode)return;
        if (cc._renderType === cc._RENDER_TYPE_CANVAS)this._drawForCanvas(ctx); else this._drawForWebGL(ctx);
        cc.g_NumberOfDraws++
    }, _drawForCanvas: function (ctx) {
        var context = ctx || cc._renderContext;
        context.save();
        if (this.isBlendAdditive())context.globalCompositeOperation = "lighter"; else context.globalCompositeOperation = "source-over";
        for (var i = 0; i < this.particleCount; i++) {
            var particle =
                this._particles[i];
            var lpx = 0 | particle.size * 0.5;
            if (this.drawMode == cc.ParticleSystem.TEXTURE_MODE) {
                var element = this._texture.getHtmlElementObj();
                if (!element.width || !element.height)continue;
                context.save();
                context.globalAlpha = particle.color.a / 255;
                context.translate(0 | particle.drawPos.x, -(0 | particle.drawPos.y));
                var size = Math.floor(particle.size / 4) * 4;
                var w = this._pointRect.width;
                var h = this._pointRect.height;
                context.scale(Math.max(1 / w * size, 1E-6), Math.max(1 / h * size, 1E-6));
                if (particle.rotation)context.rotate(cc.degreesToRadians(particle.rotation));
                context.translate(-(0 | w / 2), -(0 | h / 2));
                if (particle.isChangeColor) {
                    var cacheTextureForColor = cc.textureCache.getTextureColors(element);
                    if (cacheTextureForColor) {
                        if (!cacheTextureForColor.tintCache) {
                            cacheTextureForColor.tintCache = cc.newElement("canvas");
                            cacheTextureForColor.tintCache.width = element.width;
                            cacheTextureForColor.tintCache.height = element.height
                        }
                        cc.generateTintImage(element, cacheTextureForColor, particle.color, this._pointRect, cacheTextureForColor.tintCache);
                        element = cacheTextureForColor.tintCache
                    }
                }
                context.drawImage(element,
                    0, 0);
                context.restore()
            } else {
                context.save();
                context.globalAlpha = particle.color.a / 255;
                context.translate(0 | particle.drawPos.x, -(0 | particle.drawPos.y));
                if (this.shapeType == cc.ParticleSystem.STAR_SHAPE) {
                    if (particle.rotation)context.rotate(cc.degreesToRadians(particle.rotation));
                    cc._drawingUtil.drawStar(context, lpx, particle.color)
                } else cc._drawingUtil.drawColorBall(context, lpx, particle.color);
                context.restore()
            }
        }
        context.restore()
    }, _drawForWebGL: function (ctx) {
        if (!this._texture)return;
        var gl = ctx || cc._renderContext;
        this._shaderProgram.use();
        this._shaderProgram.setUniformForModelViewAndProjectionMatrixWithMat4();
        cc.glBindTexture2D(this._texture);
        cc.glBlendFuncForParticle(this._blendFunc.src, this._blendFunc.dst);
        cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POS_COLOR_TEX);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffersVBO[0]);
        gl.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 3, gl.FLOAT, false, 24, 0);
        gl.vertexAttribPointer(cc.VERTEX_ATTRIB_COLOR, 4, gl.UNSIGNED_BYTE, true, 24, 12);
        gl.vertexAttribPointer(cc.VERTEX_ATTRIB_TEX_COORDS,
            2, gl.FLOAT, false, 24, 16);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffersVBO[1]);
        gl.drawElements(gl.TRIANGLES, this._particleIdx * 6, gl.UNSIGNED_SHORT, 0)
    }, listenBackToForeground: function (obj) {
        if (cc.TEXTURE_ATLAS_USE_VAO)this._setupVBOandVAO(); else this._setupVBO()
    }, _setupVBOandVAO: function () {
    }, _setupVBO: function () {
        if (cc._renderType == cc._RENDER_TYPE_CANVAS)return;
        var gl = cc._renderContext;
        this._buffersVBO[0] = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffersVBO[0]);
        gl.bufferData(gl.ARRAY_BUFFER,
            this._quadsArrayBuffer, gl.DYNAMIC_DRAW);
        this._buffersVBO[1] = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffersVBO[1]);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._indices, gl.STATIC_DRAW)
    }, _allocMemory: function () {
        if (cc._renderType === cc._RENDER_TYPE_CANVAS)return true;
        if (this._batchNode) {
            cc.log("cc.ParticleSystem._allocMemory(): Memory should not be allocated when not using batchNode");
            return false
        }
        var quadSize = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT;
        var totalParticles = this._totalParticles;
        var locQuads = this._quads;
        locQuads.length = 0;
        this._indices = new Uint16Array(totalParticles * 6);
        var locQuadsArrayBuffer = new ArrayBuffer(quadSize * totalParticles);
        for (var i = 0; i < totalParticles; i++)locQuads[i] = new cc.V3F_C4B_T2F_Quad(null, null, null, null, locQuadsArrayBuffer, i * quadSize);
        if (!locQuads || !this._indices) {
            cc.log("cocos2d: Particle system: not enough memory");
            return false
        }
        this._quadsArrayBuffer = locQuadsArrayBuffer;
        return true
    }});
var _p = cc.ParticleSystem.prototype;
_p.opacityModifyRGB;
cc.defineGetterSetter(_p, "opacityModifyRGB", _p.isOpacityModifyRGB, _p.setOpacityModifyRGB);
_p.batchNode;
cc.defineGetterSetter(_p, "batchNode", _p.getBatchNode, _p.setBatchNode);
_p.active;
cc.defineGetterSetter(_p, "active", _p.isActive);
_p.sourcePos;
cc.defineGetterSetter(_p, "sourcePos", _p.getSourcePosition, _p.setSourcePosition);
_p.posVar;
cc.defineGetterSetter(_p, "posVar", _p.getPosVar, _p.setPosVar);
_p.gravity;
cc.defineGetterSetter(_p, "gravity", _p.getGravity, _p.setGravity);
_p.speed;
cc.defineGetterSetter(_p, "speed", _p.getSpeed, _p.setSpeed);
_p.speedVar;
cc.defineGetterSetter(_p, "speedVar", _p.getSpeedVar, _p.setSpeedVar);
_p.tangentialAccel;
cc.defineGetterSetter(_p, "tangentialAccel", _p.getTangentialAccel, _p.setTangentialAccel);
_p.tangentialAccelVar;
cc.defineGetterSetter(_p, "tangentialAccelVar", _p.getTangentialAccelVar, _p.setTangentialAccelVar);
_p.radialAccel;
cc.defineGetterSetter(_p, "radialAccel", _p.getRadialAccel, _p.setRadialAccel);
_p.radialAccelVar;
cc.defineGetterSetter(_p, "radialAccelVar", _p.getRadialAccelVar, _p.setRadialAccelVar);
_p.rotationIsDir;
cc.defineGetterSetter(_p, "rotationIsDir", _p.getRotationIsDir, _p.setRotationIsDir);
_p.startRadius;
cc.defineGetterSetter(_p, "startRadius", _p.getStartRadius, _p.setStartRadius);
_p.startRadiusVar;
cc.defineGetterSetter(_p, "startRadiusVar", _p.getStartRadiusVar, _p.setStartRadiusVar);
_p.endRadius;
cc.defineGetterSetter(_p, "endRadius", _p.getEndRadius, _p.setEndRadius);
_p.endRadiusVar;
cc.defineGetterSetter(_p, "endRadiusVar", _p.getEndRadiusVar, _p.setEndRadiusVar);
_p.rotatePerS;
cc.defineGetterSetter(_p, "rotatePerS", _p.getRotatePerSecond, _p.setRotatePerSecond);
_p.rotatePerSVar;
cc.defineGetterSetter(_p, "rotatePerSVar", _p.getRotatePerSecondVar, _p.setRotatePerSecondVar);
_p.startColor;
cc.defineGetterSetter(_p, "startColor", _p.getStartColor, _p.setStartColor);
_p.startColorVar;
cc.defineGetterSetter(_p, "startColorVar", _p.getStartColorVar, _p.setStartColorVar);
_p.endColor;
cc.defineGetterSetter(_p, "endColor", _p.getEndColor, _p.setEndColor);
_p.endColorVar;
cc.defineGetterSetter(_p, "endColorVar", _p.getEndColorVar, _p.setEndColorVar);
_p.totalParticles;
cc.defineGetterSetter(_p, "totalParticles", _p.getTotalParticles, _p.setTotalParticles);
_p.texture;
cc.defineGetterSetter(_p, "texture", _p.getTexture, _p.setTexture);
cc.ParticleSystem.create = function (plistFile) {
    return new cc.ParticleSystem(plistFile)
};
cc.ParticleSystem.ModeA = function (gravity, speed, speedVar, tangentialAccel, tangentialAccelVar, radialAccel, radialAccelVar, rotationIsDir) {
    this.gravity = gravity ? gravity : cc.p(0, 0);
    this.speed = speed || 0;
    this.speedVar = speedVar || 0;
    this.tangentialAccel = tangentialAccel || 0;
    this.tangentialAccelVar = tangentialAccelVar || 0;
    this.radialAccel = radialAccel || 0;
    this.radialAccelVar = radialAccelVar || 0;
    this.rotationIsDir = rotationIsDir || false
};
cc.ParticleSystem.ModeB = function (startRadius, startRadiusVar, endRadius, endRadiusVar, rotatePerSecond, rotatePerSecondVar) {
    this.startRadius = startRadius || 0;
    this.startRadiusVar = startRadiusVar || 0;
    this.endRadius = endRadius || 0;
    this.endRadiusVar = endRadiusVar || 0;
    this.rotatePerSecond = rotatePerSecond || 0;
    this.rotatePerSecondVar = rotatePerSecondVar || 0
};
cc.ParticleSystem.SHAPE_MODE = 0;
cc.ParticleSystem.TEXTURE_MODE = 1;
cc.ParticleSystem.STAR_SHAPE = 0;
cc.ParticleSystem.BALL_SHAPE = 1;
cc.ParticleSystem.DURATION_INFINITY = -1;
cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE = -1;
cc.ParticleSystem.START_RADIUS_EQUAL_TO_END_RADIUS = -1;
cc.ParticleSystem.MODE_GRAVITY = 0;
cc.ParticleSystem.MODE_RADIUS = 1;
cc.ParticleSystem.TYPE_FREE = 0;
cc.ParticleSystem.TYPE_RELATIVE = 1;
cc.ParticleSystem.TYPE_GROUPED = 2;
cc.ParticleFire = cc.ParticleSystem.extend({init: function () {
    return this.initWithTotalParticles(cc._renderType === cc._RENDER_TYPE_WEBGL ? 300 : 150)
}, initWithTotalParticles: function (numberOfParticles) {
    if (cc.ParticleSystem.prototype.initWithTotalParticles.call(this, numberOfParticles)) {
        this.setDuration(cc.ParticleSystem.DURATION_INFINITY);
        this.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);
        this.setGravity(cc.p(0, 0));
        this.setRadialAccel(0);
        this.setRadialAccelVar(0);
        this.setSpeed(60);
        this.setSpeedVar(20);
        this.setAngle(90);
        this.setAngleVar(10);
        var winSize = cc.director.getWinSize();
        this.setPosition(winSize.width / 2, 60);
        this.setPosVar(cc.p(40, 20));
        this.setLife(3);
        this.setLifeVar(0.25);
        this.setStartSize(54);
        this.setStartSizeVar(10);
        this.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);
        this.setEmissionRate(this.getTotalParticles() / this.getLife());
        this.setStartColor(cc.color(194, 64, 31, 255));
        this.setStartColorVar(cc.color(0, 0, 0, 0));
        this.setEndColor(cc.color(0, 0, 0, 255));
        this.setEndColorVar(cc.color(0, 0, 0, 0));
        this.setBlendAdditive(true);
        return true
    }
    return false
}});
cc.ParticleFire.create = function () {
    var ret = new cc.ParticleFire;
    if (ret.init())return ret;
    return null
};
cc.ParticleFireworks = cc.ParticleSystem.extend({init: function () {
    return this.initWithTotalParticles(cc._renderType === cc._RENDER_TYPE_WEBGL ? 1500 : 150)
}, initWithTotalParticles: function (numberOfParticles) {
    if (cc.ParticleSystem.prototype.initWithTotalParticles.call(this, numberOfParticles)) {
        this.setDuration(cc.ParticleSystem.DURATION_INFINITY);
        this.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);
        this.setGravity(cc.p(0, -90));
        this.setRadialAccel(0);
        this.setRadialAccelVar(0);
        this.setSpeed(180);
        this.setSpeedVar(50);
        var winSize = cc.director.getWinSize();
        this.setPosition(winSize.width / 2, winSize.height / 2);
        this.setAngle(90);
        this.setAngleVar(20);
        this.setLife(3.5);
        this.setLifeVar(1);
        this.setEmissionRate(this.getTotalParticles() / this.getLife());
        this.setStartColor(cc.color(128, 128, 128, 255));
        this.setStartColorVar(cc.color(128, 128, 128, 255));
        this.setEndColor(cc.color(26, 26, 26, 51));
        this.setEndColorVar(cc.color(26, 26, 26, 51));
        this.setStartSize(8);
        this.setStartSizeVar(2);
        this.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);
        this.setBlendAdditive(false);
        return true
    }
    return false
}});
cc.ParticleFireworks.create = function () {
    var ret = new cc.ParticleFireworks;
    if (ret.init())return ret;
    return null
};
cc.ParticleSun = cc.ParticleSystem.extend({init: function () {
    return this.initWithTotalParticles(cc._renderType === cc._RENDER_TYPE_WEBGL ? 350 : 150)
}, initWithTotalParticles: function (numberOfParticles) {
    if (cc.ParticleSystem.prototype.initWithTotalParticles.call(this, numberOfParticles)) {
        this.setBlendAdditive(true);
        this.setDuration(cc.ParticleSystem.DURATION_INFINITY);
        this.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);
        this.setGravity(cc.p(0, 0));
        this.setRadialAccel(0);
        this.setRadialAccelVar(0);
        this.setSpeed(20);
        this.setSpeedVar(5);
        this.setAngle(90);
        this.setAngleVar(360);
        var winSize = cc.director.getWinSize();
        this.setPosition(winSize.width / 2, winSize.height / 2);
        this.setPosVar(cc.p(0, 0));
        this.setLife(1);
        this.setLifeVar(0.5);
        this.setStartSize(30);
        this.setStartSizeVar(10);
        this.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);
        this.setEmissionRate(this.getTotalParticles() / this.getLife());
        this.setStartColor(cc.color(194, 64, 31, 255));
        this.setStartColorVar(cc.color(0, 0, 0, 0));
        this.setEndColor(cc.color(0, 0, 0,
            255));
        this.setEndColorVar(cc.color(0, 0, 0, 0));
        return true
    }
    return false
}});
cc.ParticleSun.create = function () {
    var ret = new cc.ParticleSun;
    if (ret.init())return ret;
    return null
};
cc.ParticleGalaxy = cc.ParticleSystem.extend({init: function () {
    return this.initWithTotalParticles(cc._renderType === cc._RENDER_TYPE_WEBGL ? 200 : 100)
}, initWithTotalParticles: function (numberOfParticles) {
    if (cc.ParticleSystem.prototype.initWithTotalParticles.call(this, numberOfParticles)) {
        this.setDuration(cc.ParticleSystem.DURATION_INFINITY);
        this.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);
        this.setGravity(cc.p(0, 0));
        this.setSpeed(60);
        this.setSpeedVar(10);
        this.setRadialAccel(-80);
        this.setRadialAccelVar(0);
        this.setTangentialAccel(80);
        this.setTangentialAccelVar(0);
        this.setAngle(90);
        this.setAngleVar(360);
        var winSize = cc.director.getWinSize();
        this.setPosition(winSize.width / 2, winSize.height / 2);
        this.setPosVar(cc.p(0, 0));
        this.setLife(4);
        this.setLifeVar(1);
        this.setStartSize(37);
        this.setStartSizeVar(10);
        this.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);
        this.setEmissionRate(this.getTotalParticles() / this.getLife());
        this.setStartColor(cc.color(31, 64, 194, 255));
        this.setStartColorVar(cc.color(0, 0, 0,
            0));
        this.setEndColor(cc.color(0, 0, 0, 255));
        this.setEndColorVar(cc.color(0, 0, 0, 0));
        this.setBlendAdditive(true);
        return true
    }
    return false
}});
cc.ParticleGalaxy.create = function () {
    var ret = new cc.ParticleGalaxy;
    if (ret.init())return ret;
    return null
};
cc.ParticleFlower = cc.ParticleSystem.extend({init: function () {
    return this.initWithTotalParticles(cc._renderType === cc._RENDER_TYPE_WEBGL ? 250 : 100)
}, initWithTotalParticles: function (numberOfParticles) {
    if (cc.ParticleSystem.prototype.initWithTotalParticles.call(this, numberOfParticles)) {
        this.setDuration(cc.ParticleSystem.DURATION_INFINITY);
        this.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);
        this.setGravity(cc.p(0, 0));
        this.setSpeed(80);
        this.setSpeedVar(10);
        this.setRadialAccel(-60);
        this.setRadialAccelVar(0);
        this.setTangentialAccel(15);
        this.setTangentialAccelVar(0);
        this.setAngle(90);
        this.setAngleVar(360);
        var winSize = cc.director.getWinSize();
        this.setPosition(winSize.width / 2, winSize.height / 2);
        this.setPosVar(cc.p(0, 0));
        this.setLife(4);
        this.setLifeVar(1);
        this.setStartSize(30);
        this.setStartSizeVar(10);
        this.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);
        this.setEmissionRate(this.getTotalParticles() / this.getLife());
        this.setStartColor(cc.color(128, 128, 128, 255));
        this.setStartColorVar(cc.color(128,
            128, 128, 128));
        this.setEndColor(cc.color(0, 0, 0, 255));
        this.setEndColorVar(cc.color(0, 0, 0, 0));
        this.setBlendAdditive(true);
        return true
    }
    return false
}});
cc.ParticleFlower.create = function () {
    var ret = new cc.ParticleFlower;
    if (ret.init())return ret;
    return null
};
cc.ParticleMeteor = cc.ParticleSystem.extend({init: function () {
    return this.initWithTotalParticles(cc._renderType === cc._RENDER_TYPE_WEBGL ? 150 : 100)
}, initWithTotalParticles: function (numberOfParticles) {
    if (cc.ParticleSystem.prototype.initWithTotalParticles.call(this, numberOfParticles)) {
        this.setDuration(cc.ParticleSystem.DURATION_INFINITY);
        this.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);
        this.setGravity(cc.p(-200, 200));
        this.setSpeed(15);
        this.setSpeedVar(5);
        this.setRadialAccel(0);
        this.setRadialAccelVar(0);
        this.setTangentialAccel(0);
        this.setTangentialAccelVar(0);
        this.setAngle(90);
        this.setAngleVar(360);
        var winSize = cc.director.getWinSize();
        this.setPosition(winSize.width / 2, winSize.height / 2);
        this.setPosVar(cc.p(0, 0));
        this.setLife(2);
        this.setLifeVar(1);
        this.setStartSize(60);
        this.setStartSizeVar(10);
        this.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);
        this.setEmissionRate(this.getTotalParticles() / this.getLife());
        this.setStartColor(cc.color(51, 102, 179));
        this.setStartColorVar(cc.color(0, 0, 51, 26));
        this.setEndColor(cc.color(0, 0, 0, 255));
        this.setEndColorVar(cc.color(0, 0, 0, 0));
        this.setBlendAdditive(true);
        return true
    }
    return false
}});
cc.ParticleMeteor.create = function () {
    var ret = new cc.ParticleMeteor;
    if (ret.init())return ret;
    return null
};
cc.ParticleSpiral = cc.ParticleSystem.extend({init: function () {
    return this.initWithTotalParticles(cc._renderType === cc._RENDER_TYPE_WEBGL ? 500 : 100)
}, initWithTotalParticles: function (numberOfParticles) {
    if (cc.ParticleSystem.prototype.initWithTotalParticles.call(this, numberOfParticles)) {
        this.setDuration(cc.ParticleSystem.DURATION_INFINITY);
        this.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);
        this.setGravity(cc.p(0, 0));
        this.setSpeed(150);
        this.setSpeedVar(0);
        this.setRadialAccel(-380);
        this.setRadialAccelVar(0);
        this.setTangentialAccel(45);
        this.setTangentialAccelVar(0);
        this.setAngle(90);
        this.setAngleVar(0);
        var winSize = cc.director.getWinSize();
        this.setPosition(winSize.width / 2, winSize.height / 2);
        this.setPosVar(cc.p(0, 0));
        this.setLife(12);
        this.setLifeVar(0);
        this.setStartSize(20);
        this.setStartSizeVar(0);
        this.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);
        this.setEmissionRate(this.getTotalParticles() / this.getLife());
        this.setStartColor(cc.color(128, 128, 128, 255));
        this.setStartColorVar(cc.color(128, 128,
            128, 0));
        this.setEndColor(cc.color(128, 128, 128, 255));
        this.setEndColorVar(cc.color(128, 128, 128, 0));
        this.setBlendAdditive(false);
        return true
    }
    return false
}});
cc.ParticleSpiral.create = function () {
    var ret = new cc.ParticleSpiral;
    if (ret.init())return ret;
    return null
};
cc.ParticleExplosion = cc.ParticleSystem.extend({init: function () {
    return this.initWithTotalParticles(cc._renderType === cc._RENDER_TYPE_WEBGL ? 700 : 300)
}, initWithTotalParticles: function (numberOfParticles) {
    if (cc.ParticleSystem.prototype.initWithTotalParticles.call(this, numberOfParticles)) {
        this.setDuration(0.1);
        this.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);
        this.setGravity(cc.p(0, 0));
        this.setSpeed(70);
        this.setSpeedVar(40);
        this.setRadialAccel(0);
        this.setRadialAccelVar(0);
        this.setTangentialAccel(0);
        this.setTangentialAccelVar(0);
        this.setAngle(90);
        this.setAngleVar(360);
        var winSize = cc.director.getWinSize();
        this.setPosition(winSize.width / 2, winSize.height / 2);
        this.setPosVar(cc.p(0, 0));
        this.setLife(5);
        this.setLifeVar(2);
        this.setStartSize(15);
        this.setStartSizeVar(10);
        this.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);
        this.setEmissionRate(this.getTotalParticles() / this.getDuration());
        this.setStartColor(cc.color(179, 26, 51, 255));
        this.setStartColorVar(cc.color(128, 128, 128, 0));
        this.setEndColor(cc.color(128, 128, 128, 0));
        this.setEndColorVar(cc.color(128,
            128, 128, 0));
        this.setBlendAdditive(false);
        return true
    }
    return false
}});
cc.ParticleExplosion.create = function () {
    var ret = new cc.ParticleExplosion;
    if (ret.init())return ret;
    return null
};
cc.ParticleSmoke = cc.ParticleSystem.extend({init: function () {
    return this.initWithTotalParticles(cc._renderType === cc._RENDER_TYPE_WEBGL ? 200 : 100)
}, initWithTotalParticles: function (numberOfParticles) {
    if (cc.ParticleSystem.prototype.initWithTotalParticles.call(this, numberOfParticles)) {
        this.setDuration(cc.ParticleSystem.DURATION_INFINITY);
        this.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);
        this.setGravity(cc.p(0, 0));
        this.setRadialAccel(0);
        this.setRadialAccelVar(0);
        this.setSpeed(25);
        this.setSpeedVar(10);
        this.setAngle(90);
        this.setAngleVar(5);
        var winSize = cc.director.getWinSize();
        this.setPosition(winSize.width / 2, 0);
        this.setPosVar(cc.p(20, 0));
        this.setLife(4);
        this.setLifeVar(1);
        this.setStartSize(60);
        this.setStartSizeVar(10);
        this.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);
        this.setEmissionRate(this.getTotalParticles() / this.getLife());
        this.setStartColor(cc.color(204, 204, 204, 255));
        this.setStartColorVar(cc.color(5, 5, 5, 0));
        this.setEndColor(cc.color(0, 0, 0, 255));
        this.setEndColorVar(cc.color(0, 0, 0, 0));
        this.setBlendAdditive(false);
        return true
    }
    return false
}});
cc.ParticleSmoke.create = function () {
    var ret = new cc.ParticleSmoke;
    if (ret.init())return ret;
    return null
};
cc.ParticleSnow = cc.ParticleSystem.extend({init: function () {
    return this.initWithTotalParticles(cc._renderType === cc._RENDER_TYPE_WEBGL ? 700 : 250)
}, initWithTotalParticles: function (numberOfParticles) {
    if (cc.ParticleSystem.prototype.initWithTotalParticles.call(this, numberOfParticles)) {
        this.setDuration(cc.ParticleSystem.DURATION_INFINITY);
        this.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);
        this.setGravity(cc.p(0, -1));
        this.setSpeed(5);
        this.setSpeedVar(1);
        this.setRadialAccel(0);
        this.setRadialAccelVar(1);
        this.setTangentialAccel(0);
        this.setTangentialAccelVar(1);
        var winSize = cc.director.getWinSize();
        this.setPosition(winSize.width / 2, winSize.height + 10);
        this.setPosVar(cc.p(winSize.width / 2, 0));
        this.setAngle(-90);
        this.setAngleVar(5);
        this.setLife(45);
        this.setLifeVar(15);
        this.setStartSize(10);
        this.setStartSizeVar(5);
        this.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);
        this.setEmissionRate(10);
        this.setStartColor(cc.color(255, 255, 255, 255));
        this.setStartColorVar(cc.color(0, 0, 0, 0));
        this.setEndColor(cc.color(255, 255, 255, 0));
        this.setEndColorVar(cc.color(0,
            0, 0, 0));
        this.setBlendAdditive(false);
        return true
    }
    return false
}});
cc.ParticleSnow.create = function () {
    var ret = new cc.ParticleSnow;
    if (ret.init())return ret;
    return null
};
cc.ParticleRain = cc.ParticleSystem.extend({init: function () {
    return this.initWithTotalParticles(cc._renderType === cc._RENDER_TYPE_WEBGL ? 1E3 : 300)
}, initWithTotalParticles: function (numberOfParticles) {
    if (cc.ParticleSystem.prototype.initWithTotalParticles.call(this, numberOfParticles)) {
        this.setDuration(cc.ParticleSystem.DURATION_INFINITY);
        this.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);
        this.setGravity(cc.p(10, -10));
        this.setRadialAccel(0);
        this.setRadialAccelVar(1);
        this.setTangentialAccel(0);
        this.setTangentialAccelVar(1);
        this.setSpeed(130);
        this.setSpeedVar(30);
        this.setAngle(-90);
        this.setAngleVar(5);
        var winSize = cc.director.getWinSize();
        this.setPosition(winSize.width / 2, winSize.height);
        this.setPosVar(cc.p(winSize.width / 2, 0));
        this.setLife(4.5);
        this.setLifeVar(0);
        this.setStartSize(4);
        this.setStartSizeVar(2);
        this.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);
        this.setEmissionRate(20);
        this.setStartColor(cc.color(179, 204, 255, 255));
        this.setStartColorVar(cc.color(0, 0, 0, 0));
        this.setEndColor(cc.color(179, 204, 255,
            128));
        this.setEndColorVar(cc.color(0, 0, 0, 0));
        this.setBlendAdditive(false);
        return true
    }
    return false
}});
cc.ParticleRain.create = function () {
    var ret = new cc.ParticleRain;
    if (ret.init())return ret;
    return null
};
cc.PARTICLE_DEFAULT_CAPACITY = 500;
cc.ParticleBatchNode = cc.Node.extend({textureAtlas: null, TextureProtocol: true, _blendFunc: null, _className: "ParticleBatchNode", ctor: function (fileImage, capacity) {
    cc.Node.prototype.ctor.call(this);
    this._blendFunc = {src: cc.BLEND_SRC, dst: cc.BLEND_DST};
    if (typeof fileImage == "string")this.init(fileImage, capacity); else if (fileImage instanceof cc.Texture2D)this.initWithTexture(fileImage, capacity)
}, initWithTexture: function (texture, capacity) {
    this.textureAtlas = new cc.TextureAtlas;
    this.textureAtlas.initWithTexture(texture,
        capacity);
    this._children.length = 0;
    if (cc._renderType === cc._RENDER_TYPE_WEBGL)this.shaderProgram = cc.shaderCache.programForKey(cc.SHADER_POSITION_TEXTURECOLOR);
    return true
}, initWithFile: function (fileImage, capacity) {
    var tex = cc.textureCache.addImage(fileImage);
    return this.initWithTexture(tex, capacity)
}, init: function (fileImage, capacity) {
    var tex = cc.TextureCache.getInstance().addImage(fileImage);
    return this.initWithTexture(tex, capacity)
}, addChild: function (child, zOrder, tag) {
    if (!child)throw"cc.ParticleBatchNode.addChild() : child should be non-null";
    if (!(child instanceof cc.ParticleSystem))throw"cc.ParticleBatchNode.addChild() : only supports cc.ParticleSystem as children";
    zOrder = zOrder == null ? child.zIndex : zOrder;
    tag = tag == null ? child.tag : tag;
    if (child.getTexture() != this.textureAtlas.texture)throw"cc.ParticleSystem.addChild() : the child is not using the same texture id";
    var childBlendFunc = child.getBlendFunc();
    if (this._children.length === 0)this.setBlendFunc(childBlendFunc); else if (childBlendFunc.src != this._blendFunc.src || childBlendFunc.dst != this._blendFunc.dst) {
        cc.log("cc.ParticleSystem.addChild() : Can't add a ParticleSystem that uses a different blending function");
        return
    }
    var pos = this._addChildHelper(child, zOrder, tag);
    var atlasIndex = 0;
    if (pos != 0) {
        var p = this._children[pos - 1];
        atlasIndex = p.getAtlasIndex() + p.getTotalParticles()
    } else atlasIndex = 0;
    this.insertChild(child, atlasIndex);
    child.setBatchNode(this)
}, insertChild: function (pSystem, index) {
    var totalParticles = pSystem.getTotalParticles();
    var locTextureAtlas = this.textureAtlas;
    var totalQuads = locTextureAtlas.totalQuads;
    pSystem.setAtlasIndex(index);
    if (totalQuads + totalParticles > locTextureAtlas.getCapacity()) {
        this._increaseAtlasCapacityTo(totalQuads +
            totalParticles);
        locTextureAtlas.fillWithEmptyQuadsFromIndex(locTextureAtlas.getCapacity() - totalParticles, totalParticles)
    }
    if (pSystem.getAtlasIndex() + totalParticles != totalQuads)locTextureAtlas.moveQuadsFromIndex(index, index + totalParticles);
    locTextureAtlas.increaseTotalQuadsWith(totalParticles);
    this._updateAllAtlasIndexes()
}, removeChild: function (child, cleanup) {
    if (child == null)return;
    if (!(child instanceof cc.ParticleSystem))throw"cc.ParticleBatchNode.removeChild(): only supports cc.ParticleSystem as children";
    if (this._children.indexOf(child) == -1) {
        cc.log("cc.ParticleBatchNode.removeChild(): doesn't contain the sprite. Can't remove it");
        return
    }
    cc.Node.prototype.removeChild.call(this, child, cleanup);
    var locTextureAtlas = this.textureAtlas;
    locTextureAtlas.removeQuadsAtIndex(child.getAtlasIndex(), child.getTotalParticles());
    locTextureAtlas.fillWithEmptyQuadsFromIndex(locTextureAtlas.totalQuads, child.getTotalParticles());
    child.setBatchNode(null);
    this._updateAllAtlasIndexes()
}, reorderChild: function (child, zOrder) {
    if (!child)throw"cc.ParticleBatchNode.reorderChild(): child should be non-null";
    if (!(child instanceof cc.ParticleSystem))throw"cc.ParticleBatchNode.reorderChild(): only supports cc.QuadParticleSystems as children";
    if (this._children.indexOf(child) === -1) {
        cc.log("cc.ParticleBatchNode.reorderChild(): Child doesn't belong to batch");
        return
    }
    if (zOrder == child.zIndex)return;
    if (this._children.length > 1) {
        var getIndexes = this._getCurrentIndex(child, zOrder);
        if (getIndexes.oldIndex != getIndexes.newIndex) {
            this._children.splice(getIndexes.oldIndex, 1);
            this._children.splice(getIndexes.newIndex, 0,
                child);
            var oldAtlasIndex = child.getAtlasIndex();
            this._updateAllAtlasIndexes();
            var newAtlasIndex = 0;
            var locChildren = this._children;
            for (var i = 0; i < locChildren.length; i++) {
                var pNode = locChildren[i];
                if (pNode == child) {
                    newAtlasIndex = child.getAtlasIndex();
                    break
                }
            }
            this.textureAtlas.moveQuadsFromIndex(oldAtlasIndex, child.getTotalParticles(), newAtlasIndex);
            child.updateWithNoTime()
        }
    }
    child._setLocalZOrder(zOrder)
}, removeChildAtIndex: function (index, doCleanup) {
    this.removeChild(this._children[i], doCleanup)
}, removeAllChildren: function (doCleanup) {
    var locChildren =
        this._children;
    for (var i = 0; i < locChildren.length; i++)locChildren[i].setBatchNode(null);
    cc.Node.prototype.removeAllChildren.call(this, doCleanup);
    this.textureAtlas.removeAllQuads()
}, disableParticle: function (particleIndex) {
    var quad = this.textureAtlas.quads[particleIndex];
    quad.br.vertices.x = quad.br.vertices.y = quad.tr.vertices.x = quad.tr.vertices.y = quad.tl.vertices.x = quad.tl.vertices.y = quad.bl.vertices.x = quad.bl.vertices.y = 0;
    this.textureAtlas._setDirty(true)
}, draw: function (ctx) {
    if (cc._renderType === cc._RENDER_TYPE_CANVAS)return;
    if (this.textureAtlas.totalQuads == 0)return;
    cc.nodeDrawSetup(this);
    cc.glBlendFuncForParticle(this._blendFunc.src, this._blendFunc.dst);
    this.textureAtlas.drawQuads()
}, getTexture: function () {
    return this.textureAtlas.texture
}, setTexture: function (texture) {
    this.textureAtlas.texture = texture;
    var locBlendFunc = this._blendFunc;
    if (texture && !texture.hasPremultipliedAlpha() && locBlendFunc.src == cc.BLEND_SRC && locBlendFunc.dst == cc.BLEND_DST) {
        locBlendFunc.src = cc.SRC_ALPHA;
        locBlendFunc.dst = cc.ONE_MINUS_SRC_ALPHA
    }
}, setBlendFunc: function (src, dst) {
    if (dst === undefined) {
        this._blendFunc.src = src.src;
        this._blendFunc.dst = src.dst
    } else {
        this._blendFunc.src = src;
        this._blendFunc.src = dst
    }
}, getBlendFunc: function () {
    return{src: this._blendFunc.src, dst: this._blendFunc.dst}
}, visit: function (ctx) {
    if (cc._renderType === cc._RENDER_TYPE_CANVAS)return;
    if (!this._visible)return;
    cc.kmGLPushMatrix();
    if (this.grid && this.grid.isActive()) {
        this.grid.beforeDraw();
        this.transformAncestors()
    }
    this.transform(ctx);
    this.draw(ctx);
    if (this.grid && this.grid.isActive())this.grid.afterDraw(this);
    cc.kmGLPopMatrix()
}, _updateAllAtlasIndexes: function () {
    var index = 0;
    var locChildren = this._children;
    for (var i = 0; i < locChildren.length; i++) {
        var child = locChildren[i];
        child.setAtlasIndex(index);
        index += child.getTotalParticles()
    }
}, _increaseAtlasCapacityTo: function (quantity) {
    cc.log("cocos2d: cc.ParticleBatchNode: resizing TextureAtlas capacity from [" + this.textureAtlas.getCapacity() + "] to [" + quantity + "].");
    if (!this.textureAtlas.resizeCapacity(quantity))cc.log("cc.ParticleBatchNode._increaseAtlasCapacityTo() : WARNING: Not enough memory to resize the atlas")
},
    _searchNewPositionInChildrenForZ: function (z) {
        var locChildren = this._children;
        var count = locChildren.length;
        for (var i = 0; i < count; i++)if (locChildren[i].zIndex > z)return i;
        return count
    }, _getCurrentIndex: function (child, z) {
        var foundCurrentIdx = false;
        var foundNewIdx = false;
        var newIndex = 0;
        var oldIndex = 0;
        var minusOne = 0, locChildren = this._children;
        var count = locChildren.length;
        for (var i = 0; i < count; i++) {
            var pNode = locChildren[i];
            if (pNode.zIndex > z && !foundNewIdx) {
                newIndex = i;
                foundNewIdx = true;
                if (foundCurrentIdx && foundNewIdx)break
            }
            if (child ==
                pNode) {
                oldIndex = i;
                foundCurrentIdx = true;
                if (!foundNewIdx)minusOne = -1;
                if (foundCurrentIdx && foundNewIdx)break
            }
        }
        if (!foundNewIdx)newIndex = count;
        newIndex += minusOne;
        return{newIndex: newIndex, oldIndex: oldIndex}
    }, _addChildHelper: function (child, z, aTag) {
        if (!child)throw"cc.ParticleBatchNode._addChildHelper(): child should be non-null";
        if (child.parent) {
            cc.log("cc.ParticleBatchNode._addChildHelper(): child already added. It can't be added again");
            return null
        }
        if (!this._children)this._children = [];
        var pos = this._searchNewPositionInChildrenForZ(z);
        this._children.splice(pos, 0, child);
        child.tag = aTag;
        child._setLocalZOrder(z);
        child.parent = this;
        if (this._running) {
            child.onEnter();
            child.onEnterTransitionDidFinish()
        }
        return pos
    }, _updateBlendFunc: function () {
        if (!this.textureAtlas.texture.hasPremultipliedAlpha()) {
            this._blendFunc.src = cc.SRC_ALPHA;
            this._blendFunc.dst = cc.ONE_MINUS_SRC_ALPHA
        }
    }, getTextureAtlas: function () {
        return this.textureAtlas
    }, setTextureAtlas: function (textureAtlas) {
        this.textureAtlas = textureAtlas
    }});
var _p = cc.ParticleBatchNode.prototype;
_p.texture;
cc.defineGetterSetter(_p, "texture", _p.getTexture, _p.setTexture);
cc.ParticleBatchNode.create = function (fileImage, capacity) {
    return new cc.ParticleBatchNode(fileImage, capacity)
};