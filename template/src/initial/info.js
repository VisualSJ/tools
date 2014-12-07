var InfoLayer = cc.Layer.extend({
    _l: false,

    ctor: function(a){
        cc.Layer.prototype.ctor.call(this, a);

        this.line = [];
        //相克关系展示
        var b = [
            new b1(), new b2(), new b3()
        ];
        var e = [
            new Deer(), new Dog(), new Bear()
        ];

        var l = [
            { r: 190, x: 565, y: 200, sx: 1.6, sy: 0.4 },
            { r: 10, x: 565, y: 40, sx: 1.6, sy: 0.4 },

            { r: -20, x: 565, y: 160, sx: 2, sy: 0.4 },
            { r: 160, x: 565, y: 80, sx: 1.6, sy: 0.4 },

            { r: 50, x: 565, y: 160, sx: 1.6, sy: 0.4 },
            { r: 230, x: 565, y: 80, sx: 1.6, sy: 0.4 }
        ];

        for(var i=0; i<6; i++){
            var t = new cc.Sprite("jt1.png");
            t.setPosition(l[i].x, l[i].y);
            t.setRotation(l[i].r);
            t.setScale(l[i].sx, l[i].sy);
            this.addChild(t);
            this.line.push(t)

        }

        b[0].setPosition(500, 200);
        this.addChild(b[0]);

        b[1].setPosition(500, 120);
        this.addChild(b[1]);

        b[2].setPosition(500, 40);
        this.addChild(b[2]);

        e[0].setPosition(650, 200);
        this.addChild(e[0]);

        e[1].setPosition(650, 120);
        this.addChild(e[1]);

        e[2].setPosition(650, 40);
        this.addChild(e[2]);
    },

    setLineColor: function(color){
        this.line.forEach(function(line){
            line.runAction(
                cc.tintTo(1.5, color.r, color.g, color.b)
            );
        });
    }
});