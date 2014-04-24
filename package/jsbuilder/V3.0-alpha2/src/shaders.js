cc.SHADER_POSITION_UCOLOR_FRAG = "precision lowp float;\n" + "varying vec4 v_fragmentColor;\n" + "void main()                              \n" + "{ \n" + "    gl_FragColor \x3d v_fragmentColor;      \n" + "}\n";
cc.SHADER_POSITION_UCOLOR_VERT = "attribute vec4 a_position;\n" + "uniform    vec4 u_color;\n" + "uniform float u_pointSize;\n" + "varying lowp vec4 v_fragmentColor; \n" + "void main(void)   \n" + "{\n" + "    gl_Position \x3d (CC_PMatrix * CC_MVMatrix) * a_position;  \n" + "    gl_PointSize \x3d u_pointSize;          \n" + "    v_fragmentColor \x3d u_color;           \n" + "}";
cc.SHADER_POSITION_COLOR_FRAG = "precision lowp float; \n" + "varying vec4 v_fragmentColor; \n" + "void main() \n" + "{ \n" + "     gl_FragColor \x3d v_fragmentColor; \n" + "} ";
cc.SHADER_POSITION_COLOR_VERT = "attribute vec4 a_position;\n" + "attribute vec4 a_color;\n" + "varying lowp vec4 v_fragmentColor;\n" + "void main()\n" + "{\n" + "    gl_Position \x3d (CC_PMatrix * CC_MVMatrix) * a_position;  \n" + "    v_fragmentColor \x3d a_color;             \n" + "}";
cc.SHADER_POSITION_COLOR_LENGTH_TEXTURE_FRAG = "// #extension GL_OES_standard_derivatives : enable\n" + "varying mediump vec4 v_color;\n" + "varying mediump vec2 v_texcoord;\n" + "void main()\t\n" + "{ \n" + "// #if defined GL_OES_standard_derivatives\t\n" + "// gl_FragColor \x3d v_color*smoothstep(0.0, length(fwidth(v_texcoord)), 1.0 - length(v_texcoord)); \n" + "// #else\t\n" + "gl_FragColor \x3d v_color * step(0.0, 1.0 - length(v_texcoord)); \n" + "// #endif \n" + "}";
cc.SHADER_POSITION_COLOR_LENGTH_TEXTURE_VERT = "attribute mediump vec4 a_position; \n" + "attribute mediump vec2 a_texcoord; \n" + "attribute mediump vec4 a_color;\t\n" + "varying mediump vec4 v_color; \n" + "varying mediump vec2 v_texcoord;\t\n" + "void main() \n" + "{ \n" + "     v_color \x3d a_color;//vec4(a_color.rgb * a_color.a, a_color.a); \n" + "     v_texcoord \x3d a_texcoord; \n" + "    gl_Position \x3d (CC_PMatrix * CC_MVMatrix) * a_position;  \n" + "}";
cc.SHADER_POSITION_TEXTURE_FRAG = "precision lowp float;   \n" + "varying vec2 v_texCoord;  \n" + "uniform sampler2D CC_Texture0; \n" + "void main() \n" + "{  \n" + "    gl_FragColor \x3d  texture2D(CC_Texture0, v_texCoord);   \n" + "}";
cc.SHADER_POSITION_TEXTURE_VERT = "attribute vec4 a_position; \n" + "attribute vec2 a_texCoord; \n" + "varying mediump vec2 v_texCoord; \n" + "void main() \n" + "{ \n" + "    gl_Position \x3d (CC_PMatrix * CC_MVMatrix) * a_position;  \n" + "    v_texCoord \x3d a_texCoord;               \n" + "}";
cc.SHADER_POSITION_TEXTURE_UCOLOR_FRAG = "precision lowp float;  \n" + "uniform vec4 u_color; \n" + "varying vec2 v_texCoord; \n" + "uniform sampler2D CC_Texture0;  \n" + "void main() \n" + "{  \n" + "    gl_FragColor \x3d  texture2D(CC_Texture0, v_texCoord) * u_color;    \n" + "}";
cc.SHADER_POSITION_TEXTURE_UCOLOR_VERT = "attribute vec4 a_position;\n" + "attribute vec2 a_texCoord; \n" + "varying mediump vec2 v_texCoord; \n" + "void main() \n" + "{ \n" + "    gl_Position \x3d (CC_PMatrix * CC_MVMatrix) * a_position;  \n" + "    v_texCoord \x3d a_texCoord;                 \n" + "}";
cc.SHADER_POSITION_TEXTURE_A8COLOR_FRAG = "precision lowp float;  \n" + "varying vec4 v_fragmentColor; \n" + "varying vec2 v_texCoord; \n" + "uniform sampler2D CC_Texture0; \n" + "void main() \n" + "{ \n" + "    gl_FragColor \x3d vec4( v_fragmentColor.rgb,         \n" + "        v_fragmentColor.a * texture2D(CC_Texture0, v_texCoord).a   \n" + "    ); \n" + "}";
cc.SHADER_POSITION_TEXTURE_A8COLOR_VERT = "attribute vec4 a_position; \n" + "attribute vec2 a_texCoord; \n" + "attribute vec4 a_color;  \n" + "varying lowp vec4 v_fragmentColor; \n" + "varying mediump vec2 v_texCoord; \n" + "void main() \n" + "{ \n" + "    gl_Position \x3d (CC_PMatrix * CC_MVMatrix) * a_position;  \n" + "    v_fragmentColor \x3d a_color; \n" + "    v_texCoord \x3d a_texCoord; \n" + "}";
cc.SHADER_POSITION_TEXTURE_COLOR_FRAG = "precision lowp float;\n" + "varying vec4 v_fragmentColor; \n" + "varying vec2 v_texCoord; \n" + "uniform sampler2D CC_Texture0; \n" + "void main() \n" + "{ \n" + "    gl_FragColor \x3d v_fragmentColor * texture2D(CC_Texture0, v_texCoord); \n" + "}";
cc.SHADER_POSITION_TEXTURE_COLOR_VERT = "attribute vec4 a_position; \n" + "attribute vec2 a_texCoord; \n" + "attribute vec4 a_color;  \n" + "varying lowp vec4 v_fragmentColor; \n" + "varying mediump vec2 v_texCoord; \n" + "void main() \n" + "{ \n" + "    gl_Position \x3d (CC_PMatrix * CC_MVMatrix) * a_position;  \n" + "    v_fragmentColor \x3d a_color; \n" + "    v_texCoord \x3d a_texCoord; \n" + "}";
cc.SHADER_POSITION_TEXTURE_COLOR_ALPHATEST_FRAG = "precision lowp float;   \n" + "varying vec4 v_fragmentColor; \n" + "varying vec2 v_texCoord;   \n" + "uniform sampler2D CC_Texture0; \n" + "uniform float CC_alpha_value; \n" + "void main() \n" + "{  \n" + "    vec4 texColor \x3d texture2D(CC_Texture0, v_texCoord);  \n" + "    // mimic: glAlphaFunc(GL_GREATER)           \n" + "    //pass if ( incoming_pixel \x3e\x3d CC_alpha_value ) \x3d\x3e fail if incoming_pixel \x3c CC_alpha_value   \n" + "    if ( texColor.a \x3c\x3d CC_alpha_value )          \n" +
    "        discard; \n" + "    gl_FragColor \x3d texColor * v_fragmentColor;  \n" + "}";
cc.SHADEREX_SWITCHMASK_FRAG = "precision lowp float; \n" + "varying vec4 v_fragmentColor; \n" + "varying vec2 v_texCoord; \n" + "uniform sampler2D u_texture;  \n" + "uniform sampler2D   u_mask;   \n" + "void main()  \n" + "{  \n" + "    vec4 texColor   \x3d texture2D(u_texture, v_texCoord);  \n" + "    vec4 maskColor  \x3d texture2D(u_mask, v_texCoord); \n" + "    vec4 finalColor \x3d vec4(texColor.r, texColor.g, texColor.b, maskColor.a * texColor.a);        \n" + "    gl_FragColor    \x3d v_fragmentColor * finalColor; \n" +
    "}";
cc.shaderCache = {TYPE_POSITION_TEXTURECOLOR: 0, TYPE_POSITION_TEXTURECOLOR_ALPHATEST: 1, TYPE_POSITION_COLOR: 2, TYPE_POSITION_TEXTURE: 3, TYPE_POSITION_TEXTURE_UCOLOR: 4, TYPE_POSITION_TEXTURE_A8COLOR: 5, TYPE_POSITION_UCOLOR: 6, TYPE_POSITION_LENGTH_TEXTURECOLOR: 7, TYPE_MAX: 8, _programs: {}, _init: function () {
    this.loadDefaultShaders();
    return true
}, _loadDefaultShader: function (program, type) {
    switch (type) {
        case this.TYPE_POSITION_TEXTURECOLOR:
            program.initWithVertexShaderByteArray(cc.SHADER_POSITION_TEXTURE_COLOR_VERT, cc.SHADER_POSITION_TEXTURE_COLOR_FRAG);
            program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
            program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
            program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
            break;
        case this.TYPE_POSITION_TEXTURECOLOR_ALPHATEST:
            program.initWithVertexShaderByteArray(cc.SHADER_POSITION_TEXTURE_COLOR_VERT, cc.SHADER_POSITION_TEXTURE_COLOR_ALPHATEST_FRAG);
            program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
            program.addAttribute(cc.ATTRIBUTE_NAME_COLOR,
                cc.VERTEX_ATTRIB_COLOR);
            program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
            break;
        case this.TYPE_POSITION_COLOR:
            program.initWithVertexShaderByteArray(cc.SHADER_POSITION_COLOR_VERT, cc.SHADER_POSITION_COLOR_FRAG);
            program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
            program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
            break;
        case this.TYPE_POSITION_TEXTURE:
            program.initWithVertexShaderByteArray(cc.SHADER_POSITION_TEXTURE_VERT, cc.SHADER_POSITION_TEXTURE_FRAG);
            program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
            program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
            break;
        case this.TYPE_POSITION_TEXTURE_UCOLOR:
            program.initWithVertexShaderByteArray(cc.SHADER_POSITION_TEXTURE_UCOLOR_VERT, cc.SHADER_POSITION_TEXTURE_UCOLOR_FRAG);
            program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
            program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
            break;
        case this.TYPE_POSITION_TEXTURE_A8COLOR:
            program.initWithVertexShaderByteArray(cc.SHADER_POSITION_TEXTURE_A8COLOR_VERT,
                cc.SHADER_POSITION_TEXTURE_A8COLOR_FRAG);
            program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
            program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
            program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
            break;
        case this.TYPE_POSITION_UCOLOR:
            program.initWithVertexShaderByteArray(cc.SHADER_POSITION_UCOLOR_VERT, cc.SHADER_POSITION_UCOLOR_FRAG);
            program.addAttribute("aVertex", cc.VERTEX_ATTRIB_POSITION);
            break;
        case this.TYPE_POSITION_LENGTH_TEXTURECOLOR:
            program.initWithVertexShaderByteArray(cc.SHADER_POSITION_COLOR_LENGTH_TEXTURE_VERT,
                cc.SHADER_POSITION_COLOR_LENGTH_TEXTURE_FRAG);
            program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
            program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
            program.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
            break;
        default:
            cc.log("cocos2d: cc.shaderCache._loadDefaultShader, error shader type");
            return
    }
    program.link();
    program.updateUniforms()
}, loadDefaultShaders: function () {
    var program = new cc.GLProgram;
    this._loadDefaultShader(program, this.TYPE_POSITION_TEXTURECOLOR);
    this._programs[cc.SHADER_POSITION_TEXTURECOLOR] = program;
    this._programs["ShaderPositionTextureColor"] = program;
    program = new cc.GLProgram;
    this._loadDefaultShader(program, this.TYPE_POSITION_TEXTURECOLOR_ALPHATEST);
    this._programs[cc.SHADER_POSITION_TEXTURECOLORALPHATEST] = program;
    this._programs["ShaderPositionTextureColorAlphaTest"] = program;
    program = new cc.GLProgram;
    this._loadDefaultShader(program, this.TYPE_POSITION_COLOR);
    this._programs[cc.SHADER_POSITION_COLOR] = program;
    this._programs["ShaderPositionColor"] =
        program;
    program = new cc.GLProgram;
    this._loadDefaultShader(program, this.TYPE_POSITION_TEXTURE);
    this._programs[cc.SHADER_POSITION_TEXTURE] = program;
    this._programs["ShaderPositionTexture"] = program;
    program = new cc.GLProgram;
    this._loadDefaultShader(program, this.TYPE_POSITION_TEXTURE_UCOLOR);
    this._programs[cc.SHADER_POSITION_TEXTURE_UCOLOR] = program;
    this._programs["ShaderPositionTextureUColor"] = program;
    program = new cc.GLProgram;
    this._loadDefaultShader(program, this.TYPE_POSITION_TEXTURE_A8COLOR);
    this._programs[cc.SHADER_POSITION_TEXTUREA8COLOR] =
        program;
    this._programs["ShaderPositionTextureA8Color"] = program;
    program = new cc.GLProgram;
    this._loadDefaultShader(program, this.TYPE_POSITION_UCOLOR);
    this._programs[cc.SHADER_POSITION_UCOLOR] = program;
    this._programs["ShaderPositionUColor"] = program;
    program = new cc.GLProgram;
    this._loadDefaultShader(program, this.TYPE_POSITION_LENGTH_TEXTURECOLOR);
    this._programs[cc.SHADER_POSITION_LENGTHTEXTURECOLOR] = program;
    this._programs["ShaderPositionLengthTextureColor"] = program
}, reloadDefaultShaders: function () {
    var program =
        this.programForKey(cc.SHADER_POSITION_TEXTURECOLOR);
    program.reset();
    this._loadDefaultShader(program, this.TYPE_POSITION_TEXTURECOLOR);
    program = this.programForKey(cc.SHADER_POSITION_TEXTURECOLORALPHATEST);
    program.reset();
    this._loadDefaultShader(program, this.TYPE_POSITION_TEXTURECOLOR_ALPHATEST);
    program = this.programForKey(cc.SHADER_POSITION_COLOR);
    program.reset();
    this._loadDefaultShader(program, this.TYPE_POSITION_COLOR);
    program = this.programForKey(cc.SHADER_POSITION_TEXTURE);
    program.reset();
    this._loadDefaultShader(program,
        this.TYPE_POSITION_TEXTURE);
    program = this.programForKey(cc.SHADER_POSITION_TEXTURE_UCOLOR);
    program.reset();
    this._loadDefaultShader(program, this.TYPE_POSITION_TEXTURE_UCOLOR);
    program = this.programForKey(cc.SHADER_POSITION_TEXTUREA8COLOR);
    program.reset();
    this._loadDefaultShader(program, this.TYPE_POSITION_TEXTURE_A8COLOR);
    program = this.programForKey(cc.SHADER_POSITION_UCOLOR);
    program.reset();
    this._loadDefaultShader(program, this.TYPE_POSITION_UCOLOR)
}, programForKey: function (key) {
    return this._programs[key]
},
    getProgram: function (shaderName) {
        return this._programs[shaderName]
    }, addProgram: function (program, key) {
        this._programs[key] = program
    }};
cc.HashUniformEntry = function (value, location, hh) {
    this.value = value;
    this.location = location;
    this.hh = hh || {}
};
cc.GLProgram = cc.Class.extend({_glContext: null, _programObj: null, _vertShader: null, _fragShader: null, _uniforms: null, _hashForUniforms: null, _usesTime: false, _updateUniformLocation: function (location, data, bytes) {
    if (location == null)return false;
    var updated = true;
    var element = null;
    for (var i = 0; i < this._hashForUniforms.length; i++)if (this._hashForUniforms[i].location == location)element = this._hashForUniforms[i];
    if (!element) {
        element = new cc.HashUniformEntry;
        element.location = location;
        element.value = data;
        this._hashForUniforms.push(element)
    } else if (element.value ==
        data)updated = false; else element.value = data;
    return updated
}, _description: function () {
    return"\x3cCCGLProgram \x3d " + this.toString() + " | Program \x3d " + this._programObj.toString() + ", VertexShader \x3d " + this._vertShader.toString() + ", FragmentShader \x3d " + this._fragShader.toString() + "\x3e"
}, _compileShader: function (shader, type, source) {
    if (!source || !shader)return false;
    source = "precision highp float;        \n" + "uniform mat4 CC_PMatrix;         \n" + "uniform mat4 CC_MVMatrix;        \n" + "uniform mat4 CC_MVPMatrix;       \n" +
        "uniform vec4 CC_Time;            \n" + "uniform vec4 CC_SinTime;         \n" + "uniform vec4 CC_CosTime;         \n" + "uniform vec4 CC_Random01;        \n" + "//CC INCLUDES END                \n" + source;
    this._glContext.shaderSource(shader, source);
    this._glContext.compileShader(shader);
    var status = this._glContext.getShaderParameter(shader, this._glContext.COMPILE_STATUS);
    if (!status) {
        cc.log("cocos2d: ERROR: Failed to compile shader:\n" + this._glContext.getShaderSource(shader));
        if (type == this._glContext.VERTEX_SHADER)cc.log("cocos2d: \n" +
            this.vertexShaderLog()); else cc.log("cocos2d: \n" + this.fragmentShaderLog())
    }
    return status == 1
}, ctor: function (vShaderFileName, fShaderFileName, glContext) {
    this._uniforms = [];
    this._hashForUniforms = [];
    this._glContext = glContext || cc._renderContext;
    vShaderFileName && fShaderFileName && this.init(vShaderFileName, fShaderFileName)
}, destroyProgram: function () {
    this._vertShader = null;
    this._fragShader = null;
    this._uniforms = null;
    this._hashForUniforms = null;
    this._glContext.deleteProgram(this._programObj)
}, initWithVertexShaderByteArray: function (vertShaderStr, fragShaderStr) {
    var locGL = this._glContext;
    this._programObj = locGL.createProgram();
    this._vertShader = null;
    this._fragShader = null;
    if (vertShaderStr) {
        this._vertShader = locGL.createShader(locGL.VERTEX_SHADER);
        if (!this._compileShader(this._vertShader, locGL.VERTEX_SHADER, vertShaderStr))cc.log("cocos2d: ERROR: Failed to compile vertex shader")
    }
    if (fragShaderStr) {
        this._fragShader = locGL.createShader(locGL.FRAGMENT_SHADER);
        if (!this._compileShader(this._fragShader, locGL.FRAGMENT_SHADER, fragShaderStr))cc.log("cocos2d: ERROR: Failed to compile fragment shader")
    }
    if (this._vertShader)locGL.attachShader(this._programObj,
        this._vertShader);
    cc.checkGLErrorDebug();
    if (this._fragShader)locGL.attachShader(this._programObj, this._fragShader);
    this._hashForUniforms.length = 0;
    cc.checkGLErrorDebug();
    return true
}, initWithString: function (vertShaderStr, fragShaderStr) {
    return this.initWithVertexShaderByteArray(vertShaderStr, fragShaderStr)
}, initWithVertexShaderFilename: function (vShaderFilename, fShaderFileName) {
    var vertexSource = cc.loader.getRes(vShaderFilename);
    if (!vertexSource)throw"Please load the resource firset : " + vShaderFilename;
    var fragmentSource = cc.loader.getRes(fShaderFileName);
    if (!fragmentSource)throw"Please load the resource firset : " + fShaderFileName;
    return this.initWithVertexShaderByteArray(vertexSource, fragmentSource)
}, init: function (vShaderFilename, fShaderFileName) {
    return this.initWithVertexShaderFilename(vShaderFilename, fShaderFileName)
}, addAttribute: function (attributeName, index) {
    this._glContext.bindAttribLocation(this._programObj, index, attributeName)
}, link: function () {
    if (!this._programObj) {
        cc.log("cc.GLProgram.link(): Cannot link invalid program");
        return false
    }
    this._glContext.linkProgram(this._programObj);
    if (this._vertShader)this._glContext.deleteShader(this._vertShader);
    if (this._fragShader)this._glContext.deleteShader(this._fragShader);
    this._vertShader = null;
    this._fragShader = null;
    if (cc.game.config[cc.game.CONFIG_KEY.debugMode]) {
        var status = this._glContext.getProgramParameter(this._programObj, this._glContext.LINK_STATUS);
        if (!status) {
            cc.log("cocos2d: ERROR: Failed to link program: " + this._glContext.getProgramInfoLog(this._programObj));
            cc.glDeleteProgram(this._programObj);
            this._programObj = null;
            return false
        }
    }
    return true
}, use: function () {
    cc.glUseProgram(this._programObj)
}, updateUniforms: function () {
    this._uniforms[cc.UNIFORM_PMATRIX] = this._glContext.getUniformLocation(this._programObj, cc.UNIFORM_PMATRIX_S);
    this._uniforms[cc.UNIFORM_MVMATRIX] = this._glContext.getUniformLocation(this._programObj, cc.UNIFORM_MVMATRIX_S);
    this._uniforms[cc.UNIFORM_MVPMATRIX] = this._glContext.getUniformLocation(this._programObj, cc.UNIFORM_MVPMATRIX_S);
    this._uniforms[cc.UNIFORM_TIME] = this._glContext.getUniformLocation(this._programObj,
        cc.UNIFORM_TIME_S);
    this._uniforms[cc.UNIFORM_SINTIME] = this._glContext.getUniformLocation(this._programObj, cc.UNIFORM_SINTIME_S);
    this._uniforms[cc.UNIFORM_COSTIME] = this._glContext.getUniformLocation(this._programObj, cc.UNIFORM_COSTIME_S);
    this._usesTime = this._uniforms[cc.UNIFORM_TIME] != null || this._uniforms[cc.UNIFORM_SINTIME] != null || this._uniforms[cc.UNIFORM_COSTIME] != null;
    this._uniforms[cc.UNIFORM_RANDOM01] = this._glContext.getUniformLocation(this._programObj, cc.UNIFORM_RANDOM01_S);
    this._uniforms[cc.UNIFORM_SAMPLER] =
        this._glContext.getUniformLocation(this._programObj, cc.UNIFORM_SAMPLER_S);
    this.use();
    this.setUniformLocationWith1i(this._uniforms[cc.UNIFORM_SAMPLER], 0)
}, getUniformLocationForName: function (name) {
    if (!name)throw"cc.GLProgram.getUniformLocationForName(): uniform name should be non-null";
    if (!this._programObj)throw"cc.GLProgram.getUniformLocationForName(): Invalid operation. Cannot get uniform location when program is not initialized";
    return this._glContext.getUniformLocation(this._programObj, name)
}, getUniformMVPMatrix: function () {
    return this._uniforms[cc.UNIFORM_MVPMATRIX]
},
    getUniformSampler: function () {
        return this._uniforms[cc.UNIFORM_SAMPLER]
    }, setUniformLocationWith1i: function (location, i1) {
        var updated = this._updateUniformLocation(location, i1);
        if (updated)this._glContext.uniform1i(location, i1)
    }, setUniformLocationWith2i: function (location, i1, i2) {
        var intArray = [i1, i2];
        var updated = this._updateUniformLocation(location, intArray);
        if (updated)this._glContext.uniform2i(location, i1, i2)
    }, setUniformLocationWith3i: function (location, i1, i2, i3) {
        var intArray = [i1, i2, i3];
        var updated = this._updateUniformLocation(location,
            intArray);
        if (updated)this._glContext.uniform3i(location, i1, i2, i3)
    }, setUniformLocationWith4i: function (location, i1, i2, i3, i4) {
        var intArray = [i1, i2, i3, i4];
        var updated = this._updateUniformLocation(location, intArray);
        if (updated)this._glContext.uniform4i(location, i1, i2, i3, i4)
    }, setUniformLocationWith2iv: function (location, intArray, numberOfArrays) {
        var updated = this._updateUniformLocation(location, intArray);
        if (updated)this._glContext.uniform2iv(location, intArray)
    }, setUniformLocationWith3iv: function (location, intArray, numberOfArrays) {
        var updated = this._updateUniformLocation(location, intArray);
        if (updated)this._glContext.uniform3iv(location, intArray)
    }, setUniformLocationWith4iv: function (location, intArray, numberOfArrays) {
        var updated = this._updateUniformLocation(location, intArray);
        if (updated)this._glContext.uniform4iv(location, intArray)
    }, setUniformLocationI32: function (location, i1) {
        this.setUniformLocationWith1i(arguments[0], arguments[1])
    }, setUniformLocationWith1f: function (location, f1) {
        var updated = this._updateUniformLocation(location,
            f1);
        if (updated)this._glContext.uniform1f(location, f1)
    }, setUniformLocationWith2f: function (location, f1, f2) {
        var floats = [f1, f2];
        var updated = this._updateUniformLocation(location, floats);
        if (updated)this._glContext.uniform2f(location, f1, f2)
    }, setUniformLocationWith3f: function (location, f1, f2, f3) {
        var floats = [f1, f2, f3];
        var updated = this._updateUniformLocation(location, floats);
        if (updated)this._glContext.uniform3f(location, f1, f2, f3)
    }, setUniformLocationWith4f: function (location, f1, f2, f3, f4) {
        var floats = [f1, f2, f3,
            f4];
        var updated = this._updateUniformLocation(location, floats);
        if (updated)this._glContext.uniform4f(location, f1, f2, f3, f4)
    }, setUniformLocationWith2fv: function (location, floatArray, numberOfArrays) {
        var updated = this._updateUniformLocation(location, floatArray);
        if (updated)this._glContext.uniform2fv(location, floatArray)
    }, setUniformLocationWith3fv: function (location, floatArray, numberOfArrays) {
        var updated = this._updateUniformLocation(location, floatArray);
        if (updated)this._glContext.uniform3fv(location, floatArray)
    },
    setUniformLocationWith4fv: function (location, floatArray, numberOfArrays) {
        var updated = this._updateUniformLocation(location, floatArray);
        if (updated)this._glContext.uniform4fv(location, floatArray)
    }, setUniformLocationWithMatrix4fv: function (location, matrixArray, numberOfMatrices) {
        var updated = this._updateUniformLocation(location, matrixArray);
        if (updated)this._glContext.uniformMatrix4fv(location, false, matrixArray)
    }, setUniformLocationF32: function () {
        if (arguments.length < 2)return;
        switch (arguments.length) {
            case 2:
                this.setUniformLocationWith1f(arguments[0],
                    arguments[1]);
                break;
            case 3:
                this.setUniformLocationWith2f(arguments[0], arguments[1], arguments[2]);
                break;
            case 4:
                this.setUniformLocationWith3f(arguments[0], arguments[1], arguments[2], arguments[3]);
                break;
            case 5:
                this.setUniformLocationWith4f(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                break
        }
    }, setUniformsForBuiltins: function () {
        var matrixP = new cc.kmMat4;
        var matrixMV = new cc.kmMat4;
        var matrixMVP = new cc.kmMat4;
        cc.kmGLGetMatrix(cc.KM_GL_PROJECTION, matrixP);
        cc.kmGLGetMatrix(cc.KM_GL_MODELVIEW,
            matrixMV);
        cc.kmMat4Multiply(matrixMVP, matrixP, matrixMV);
        this.setUniformLocationWithMatrix4fv(this._uniforms[cc.UNIFORM_PMATRIX], matrixP.mat, 1);
        this.setUniformLocationWithMatrix4fv(this._uniforms[cc.UNIFORM_MVMATRIX], matrixMV.mat, 1);
        this.setUniformLocationWithMatrix4fv(this._uniforms[cc.UNIFORM_MVPMATRIX], matrixMVP.mat, 1);
        if (this._usesTime) {
            var director = cc.director;
            var time = director.getTotalFrames() * director.getAnimationInterval();
            this.setUniformLocationWith4f(this._uniforms[cc.UNIFORM_TIME], time /
                10, time, time * 2, time * 4);
            this.setUniformLocationWith4f(this._uniforms[cc.UNIFORM_SINTIME], time / 8, time / 4, time / 2, Math.sin(time));
            this.setUniformLocationWith4f(this._uniforms[cc.UNIFORM_COSTIME], time / 8, time / 4, time / 2, Math.cos(time))
        }
        if (this._uniforms[cc.UNIFORM_RANDOM01] != -1)this.setUniformLocationWith4f(this._uniforms[cc.UNIFORM_RANDOM01], Math.random(), Math.random(), Math.random(), Math.random())
    }, setUniformForModelViewProjectionMatrix: function () {
        this._glContext.uniformMatrix4fv(this._uniforms[cc.UNIFORM_MVPMATRIX],
            false, cc.getMat4MultiplyValue(cc.projection_matrix_stack.top, cc.modelview_matrix_stack.top))
    }, setUniformForModelViewProjectionMatrixWithMat4: function (swapMat4) {
        cc.kmMat4Multiply(swapMat4, cc.projection_matrix_stack.top, cc.modelview_matrix_stack.top);
        this._glContext.uniformMatrix4fv(this._uniforms[cc.UNIFORM_MVPMATRIX], false, swapMat4.mat)
    }, setUniformForModelViewAndProjectionMatrixWithMat4: function () {
        this._glContext.uniformMatrix4fv(this._uniforms[cc.UNIFORM_MVMATRIX], false, cc.modelview_matrix_stack.top.mat);
        this._glContext.uniformMatrix4fv(this._uniforms[cc.UNIFORM_PMATRIX], false, cc.projection_matrix_stack.top.mat)
    }, vertexShaderLog: function () {
        return this._glContext.getShaderInfoLog(this._vertShader)
    }, getVertexShaderLog: function () {
        return this._glContext.getShaderInfoLog(this._vertShader)
    }, getFragmentShaderLog: function () {
        return this._glContext.getShaderInfoLog(this._vertShader)
    }, fragmentShaderLog: function () {
        return this._glContext.getShaderInfoLog(this._fragShader)
    }, programLog: function () {
        return this._glContext.getProgramInfoLog(this._programObj)
    },
    getProgramLog: function () {
        return this._glContext.getProgramInfoLog(this._programObj)
    }, reset: function () {
        this._vertShader = null;
        this._fragShader = null;
        this._uniforms.length = 0;
        this._glContext.deleteProgram(this._programObj);
        this._programObj = null;
        for (var i = 0; i < this._hashForUniforms.length; i++) {
            this._hashForUniforms[i].value = null;
            this._hashForUniforms[i] = null
        }
        this._hashForUniforms.length = 0
    }, getProgram: function () {
        return this._programObj
    }, retain: function () {
    }, release: function () {
    }});
cc.GLProgram.create = function (vShaderFileName, fShaderFileName) {
    return new cc.GLProgram(vShaderFileName, fShaderFileName)
};
cc._currentProjectionMatrix = -1;
cc._vertexAttribPosition = false;
cc._vertexAttribColor = false;
cc._vertexAttribTexCoords = false;
if (cc.ENABLE_GL_STATE_CACHE) {
    cc.MAX_ACTIVETEXTURE = 16;
    cc._currentShaderProgram = -1;
    cc._currentBoundTexture = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    cc._blendingSource = -1;
    cc._blendingDest = -1;
    cc._GLServerState = 0;
    if (cc.TEXTURE_ATLAS_USE_VAO)cc._uVAO = 0
}
cc.glInvalidateStateCache = function () {
    cc.kmGLFreeAll();
    cc._currentProjectionMatrix = -1;
    cc._vertexAttribPosition = false;
    cc._vertexAttribColor = false;
    cc._vertexAttribTexCoords = false;
    if (cc.ENABLE_GL_STATE_CACHE) {
        cc._currentShaderProgram = -1;
        for (var i = 0; i < cc.MAX_ACTIVETEXTURE; i++)cc._currentBoundTexture[i] = -1;
        cc._blendingSource = -1;
        cc._blendingDest = -1;
        cc._GLServerState = 0
    }
};
cc.glUseProgram = function (program) {
    if (program !== cc._currentShaderProgram) {
        cc._currentShaderProgram = program;
        cc._renderContext.useProgram(program)
    }
};
if (!cc.ENABLE_GL_STATE_CACHE)cc.glUseProgram = function (program) {
    cc._renderContext.useProgram(program)
};
cc.glDeleteProgram = function (program) {
    if (cc.ENABLE_GL_STATE_CACHE)if (program === cc._currentShaderProgram)cc._currentShaderProgram = -1;
    gl.deleteProgram(program)
};
cc.glBlendFunc = function (sfactor, dfactor) {
    if (sfactor !== cc._blendingSource || dfactor !== cc._blendingDest) {
        cc._blendingSource = sfactor;
        cc._blendingDest = dfactor;
        cc.setBlending(sfactor, dfactor)
    }
};
cc.setBlending = function (sfactor, dfactor) {
    var ctx = cc._renderContext;
    if (sfactor === ctx.ONE && dfactor === ctx.ZERO)ctx.disable(ctx.BLEND); else {
        ctx.enable(ctx.BLEND);
        cc._renderContext.blendFunc(sfactor, dfactor)
    }
};
cc.glBlendFuncForParticle = function (sfactor, dfactor) {
    if (sfactor !== cc._blendingSource || dfactor !== cc._blendingDest) {
        cc._blendingSource = sfactor;
        cc._blendingDest = dfactor;
        var ctx = cc._renderContext;
        if (sfactor === ctx.ONE && dfactor === ctx.ZERO)ctx.disable(ctx.BLEND); else {
            ctx.enable(ctx.BLEND);
            ctx.blendFuncSeparate(ctx.SRC_ALPHA, dfactor, sfactor, dfactor)
        }
    }
};
if (!cc.ENABLE_GL_STATE_CACHE)cc.glBlendFunc = cc.setBlending;
cc.glBlendResetToCache = function () {
    var ctx = cc._renderContext;
    ctx.blendEquation(ctx.FUNC_ADD);
    if (cc.ENABLE_GL_STATE_CACHE)cc.setBlending(cc._blendingSource, cc._blendingDest); else cc.setBlending(ctx.BLEND_SRC, ctx.BLEND_DST)
};
cc.setProjectionMatrixDirty = function () {
    cc._currentProjectionMatrix = -1
};
cc.glEnableVertexAttribs = function (flags) {
    var ctx = cc._renderContext;
    var enablePosition = flags & cc.VERTEX_ATTRIB_FLAG_POSITION;
    if (enablePosition !== cc._vertexAttribPosition) {
        if (enablePosition)ctx.enableVertexAttribArray(cc.VERTEX_ATTRIB_POSITION); else ctx.disableVertexAttribArray(cc.VERTEX_ATTRIB_POSITION);
        cc._vertexAttribPosition = enablePosition
    }
    var enableColor = flags & cc.VERTEX_ATTRIB_FLAG_COLOR;
    if (enableColor !== cc._vertexAttribColor) {
        if (enableColor)ctx.enableVertexAttribArray(cc.VERTEX_ATTRIB_COLOR); else ctx.disableVertexAttribArray(cc.VERTEX_ATTRIB_COLOR);
        cc._vertexAttribColor = enableColor
    }
    var enableTexCoords = flags & cc.VERTEX_ATTRIB_FLAG_TEX_COORDS;
    if (enableTexCoords !== cc._vertexAttribTexCoords) {
        if (enableTexCoords)ctx.enableVertexAttribArray(cc.VERTEX_ATTRIB_TEX_COORDS); else ctx.disableVertexAttribArray(cc.VERTEX_ATTRIB_TEX_COORDS);
        cc._vertexAttribTexCoords = enableTexCoords
    }
};
cc.glBindTexture2D = function (textureId) {
    cc.glBindTexture2DN(0, textureId)
};
cc.glBindTexture2DN = function (textureUnit, textureId) {
    if (cc._currentBoundTexture[textureUnit] == textureId)return;
    cc._currentBoundTexture[textureUnit] = textureId;
    var ctx = cc._renderContext;
    ctx.activeTexture(ctx.TEXTURE0 + textureUnit);
    if (textureId)ctx.bindTexture(ctx.TEXTURE_2D, textureId._webTextureObj); else ctx.bindTexture(ctx.TEXTURE_2D, null)
};
if (!cc.ENABLE_GL_STATE_CACHE)cc.glBindTexture2DN = function (textureUnit, textureId) {
    var ctx = cc._renderContext;
    ctx.activeTexture(ctx.TEXTURE0 + textureUnit);
    if (textureId)ctx.bindTexture(ctx.TEXTURE_2D, textureId._webTextureObj); else ctx.bindTexture(ctx.TEXTURE_2D, null)
};
cc.glDeleteTexture = function (textureId) {
    cc.glDeleteTextureN(0, textureId)
};
cc.glDeleteTextureN = function (textureUnit, textureId) {
    if (cc.ENABLE_GL_STATE_CACHE)if (textureId == cc._currentBoundTexture[textureUnit])cc._currentBoundTexture[textureUnit] = -1;
    cc._renderContext.deleteTexture(textureId)
};
cc.glBindVAO = function (vaoId) {
    if (!cc.TEXTURE_ATLAS_USE_VAO)return;
    if (cc.ENABLE_GL_STATE_CACHE) {
        if (cc._uVAO != vaoId)cc._uVAO = vaoId
    } else;
};
cc.glEnable = function (flags) {
    if (cc.ENABLE_GL_STATE_CACHE); else;
};