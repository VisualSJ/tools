const fs = require("fs");
const path = require("path");

const dir = "../../";

function findList(dirName){
    var file = [];
    var dir = fs.readdirSync(dirName);

    dir = dir.filter(function(item){
        return !/^\./.test(item);
    });

    dir.forEach(function(item){
        var p = path.join(dirName, item);
        var s = fs.statSync(p);
        if(s.isDirectory()){
            file = file.concat(findList(p));
        }else{
            file.push(p);
        }
    });

    return file;
}
var dirList = findList(path.join(dir, "cocos2d"));
dirList = dirList.concat(findList(path.join(dir, "extensions")));
dirList = dirList.concat(findList(path.join(dir, "external")));

dirList.push(path.join(dir, "Base64Images.js"));
dirList.push(path.join(dir, "CCBoot.js"));
dirList.push(path.join(dir, "CCDebugger.js"));

var engineList = dirList.map(function(item){
    return item.replace(dir+'/', '');
});

var jshint = {
    all: []
};
engineList.forEach(function(item){
    jshint.all.push(item);
});

module.exports = function(grunt) {
    grunt.initConfig({
        jshint: jshint
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('check', function(){
        grunt.task.run('jshint');
    });
};