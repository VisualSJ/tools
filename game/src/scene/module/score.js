/*
顶部得分模块
 */
define(function(require, exports){

    var layer = h("@block").set({
        width: 500,
        height: 120
    });
    layer.test = true;

    var hit1Num = 1;
    var hit1 = h("@node").set({
        color: "#FFF",
        y: 4
    });
    hit1.text("您击中了0次");
    layer.append(hit1);

    var hit2Num = 1;
    var hit2 = h("@node").set({
        color: "#FFF",
        y: 22
    });
    hit2.text("您被击中了0次");
    layer.append(hit2);

    var sys = h("@node").set({
        color: "#FFF",
        y: 4,
        align: "right",
        x: 480
    });
    sys.text(h.option.system.os);
    layer.append(sys);

    var browse = h("@node").set({
        color: "#FFF",
        y: 22,
        align: "right",
        x: 480
    });
    browse.text(h.option.system.name);
    layer.append(browse);

    var version = h("@node").set({
        color: "#FFF",
        y: 40,
        align: "right",
        x: 480
    });
    version.text(h.option.system.version);
    layer.append(version);

    var powerBy = h("@node").set({
        color: "#FFF",
        x: 250,
        y: 4,
        align: "center"
    });
    powerBy.text("Power by harbors");
    layer.append(powerBy);

    var name = h("@node").set({
        color: "#FFF",
        x: 250,
        y: 22,
        align: "center"
    });
    name.text("VisualSJ");
    layer.append(name);

    exports.into = function(s){
        s.append(layer);
    };
    exports.out = function(s){
        s.remove(layer);
    };

    exports.addA = function(){
        hit1.text("您击中了" + hit1Num++ + "次");
    };

    exports.addB = function(){
        hit2.text("您被击中了" + hit2Num++ + "次");
    };

});