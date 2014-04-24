var path = require("path");
var fs = require("fs");
var cp = require("child_process");

var name = process.argv[2] || 'modules';

var app = {
    _num: 0,
    _dir: __dirname,
    _list: {},
    _xml: '',
    _readJson: function (file) {
        return JSON.parse(fs.readFileSync(file, 'utf-8'));
    },
    init: function () {
        var _moduleFile = path.join(app._dir, './moduleConfig.json');
        app._list = app._readJson(_moduleFile);
        app.sorting();
        app.createXml();
        app.merge();
    },
    sorting: function () {
        //合并CCBoot到core
        app._list.module.core = [app._list.bootFile].concat(app._list.module.core);
        app._list = app._list.module;

        //分离CCDebugger
//        app._list['debugger'] = ['CCDebugger.js'];
//        app._list['core'] = app._list['core'].filter(function (_file) {
//            return _file != 'CCDebugger.js';
//        });

        //去除依赖关系
        for (var p in app._list) {
            if (Array.isArray(app._list[p])) {
                app._list[p] = app._list[p].filter(function (_file) {
                    return /\.js$/.test(_file);
                });

                if (app._list[p].length == 0) {
                    delete app._list[p];
                    continue;
                }

                app._num++;
            } else {
                delete app._list[p];
            }
        }
    },
    createXml: function () {
        app._xml += '<?xml version="1.0"?>\n';
        app._xml += '<project name="Javascript compress project" basedir="." default="module">\n';
        app._xml += '  <taskdef name="jscomp" classname="com.google.javascript.jscomp.ant.CompileTask" classpath="./compiler/compiler.jar"/>\n';
        app._xml += '  <target name="module">\n';
        var _t = app._list;
        for (var p in _t) {
            //压缩版本
            app._xml += '    <jscomp compilationLevel="simple" warning="quiet" debug="false" output="./' + name + '/dist/' + p + '.js">\n';
            app._xml += '      <sources dir="e:\\">\n';
            _t[p].forEach(function (_file) {
                app._xml += '        <file name="' + path.join(app._dir, '../', _file).replace(/(e|E):\\/, '') + '" />\n';
            });
            app._xml += '      </sources>\n';
            app._xml += '    </jscomp>\n';
            //非压缩版本
            app._xml += '    <jscomp compilationLevel="whitespace" warning="quiet" debug="true" output="./' + name + '/src/' + p + '.js">\n';
            app._xml += '      <sources dir="e:\\">\n';
            _t[p].forEach(function (_file) {
                app._xml += '        <file name="' + path.join(app._dir, '../', _file).replace(/(e|E):\\/, '') + '" />\n';
            });
            app._xml += '      </sources>\n';
            app._xml += '    </jscomp>\n';

        }
        app._xml += '  </target>\n';
        app._xml += '</project>';


        fs.writeFileSync('./build.xml', app._xml);

    },
    merge: function () {

        cp.exec('ant', function () {

            console.log('Success ant. The total number of files : %d', app._num);

            app.createJSON();

        });
    },
    createJSON: function () {

        var _module = {
            info: []
        };

        //获取文件大小
        app._sort.forEach(function (_file) {
            var _stat = fs.statSync('./' + name + '/dist/' + _file + '.js');
            _module.info.push({
                name: _file,
                size: ((_stat.size / 1000) | 0 ).toString() + 'KB',
                checked: 0
            });
        });

        //提取依赖关系
        var _moduleConfig = app._readJson(path.join(app._dir, './moduleConfig.json')).module;
        _module.info.forEach(function (_info, i) {
            var _a = _moduleConfig[_info.name]
            if (_a) {
                _a = _a.filter(function (_t) {
                    return !/\.js$/.test(_t);
                });
                _module.info[i].rule = _a;
            } else {
                _module.info[i].rule = [];
            }
            _module.info[i].info = app._info[_info.name] || 'Unknow';
//            if(_info.name=='debugger') _module.info[i].rule.push('core')
        });


        fs.writeFileSync('./' + name + '/module.js', "var module=" + JSON.stringify(_module));

    },
    _sort: [
        "core-webgl",
        "core-extensions",
        "core",
        "debugger",
        "actions",
        "audio",
        "menus",
        "kazmath",
        "shaders",
        "render-texture",
        "labels",
        "motion-streak",
        "node-grid",
        "shape-nodes",
        "clipping-nodes",
        "effects",
        "actions3d",
        "progress-timer",
        "transitions",
        "compression",
        "particle",
        "text-input",
        "tilemap",
        "parallax",
        "gui",
        "ccbreader",
        "editbox",
        "ccui",
        "cocostudio",
        "pluginx",
        "physics",
        "socketio",
        "box2d",
        "chipmunk"
    ],
    _info: {
        "core-extensions": "Cocos2d Core extensions",
        "core-webgl": "Cocos2d WebGL support",
        "core": 'Cocos2d engine core',
        "debugger": 'Debugging node',
        "kazmath": 'Math lib for webgl',
        "shaders": 'Shaders',
        "render-texture": 'render-texture for cache',
        "labels": 'Labels',
        "motion-streak": 'Motion-streak effect',
        "node-grid": 'Base node of effects',
        "shape-nodes": 'Base node of Drownode',
        "clipping-nodes": 'Clipping nodes',
        "effects": 'Some effects',
        "actions": 'Useful actions',
        "actions3d": 'Some 3D actions of webgl mode',
        "progress-timer": 'Progress timer',
        "transitions": 'Scene transitions',
        "compression": 'Compression of tilemap and particle',
        "particle": 'Particle effects',
        "text-input": 'Text input',
        "menus": 'Menus',
        "tilemap": 'TileMap',
        "parallax": 'Parallax layers',
        "audio": 'Audio',
        "gui": 'GUI',
        "ccbreader": 'The reader of CocosBuilder',
        "editbox": 'Edit Box',
        "ccui": 'Cocos UI widget',
        "cocostudio": 'The reader of CocoStudio',
        "pluginx": 'Plugin-X',
        "physics": 'Physics node for Box2d and Chipmunk',
        "socketio": 'ScoketIO',
        "box2d": 'Box2d physics lib',
        "chipmunk": 'Chipmunk physics lib'
    }
};

app.init();