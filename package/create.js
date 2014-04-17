var path = require("path");
var fs = require("fs");
var cp = require("child_process");


var app = {
    _num: 0,
    _dir: __dirname,
    _list: {},
    _xml: '',
    _readJson: function (file) {
        return JSON.parse(fs.readFileSync(file, 'utf-8'));
    },
    init: function () {
        var _moduleFile = path.join(app._dir, '../moduleConfig.json');
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
        app._list['debugger'] = ['CCDebugger.js'];
        app._list['core'] = app._list['core'].filter(function (_file) {
            return _file != 'CCDebugger.js';
        });

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
            app._xml += '    <jscomp compilationLevel="simple" warning="quiet" debug="false" output="./modules/' + p + '.js">\n';
            app._xml += '      <sources dir="/">\n';
            _t[p].forEach(function (_file) {
                app._xml += '        <file name="' + path.join(app._dir, '../', _file) + '" />\n';
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

        });
    }
};

app.init();