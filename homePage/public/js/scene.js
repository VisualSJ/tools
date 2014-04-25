var gameScene = cc.Scene.extend({

    //The parameters of the background movement
    _moveBG: 1,
    //The parameters of the man
    _moveMan: 0,
    //The parameters of the goods
    _moveGoods: 0,
    //Jump
    _jump: 0,
    _jumpX: 0,

    _background: [],
    _ground: [],
    _goods: [],
    _jumpNum: [],
    _man: null,
    _prospect: null,

    _goodsSize: [
        {w: 133, h: 127},
        {w: 92, h:91},
        {w: 185, h: 152},
        {w: 57, h: 34},
        {w: 90, h: 42},
        {w: 657, h: 221},
        {w: 307, h: 162}
    ],

    onEnter: function(){
        cc.Scene.prototype.onEnter.call(this);
        this._background = [];
        this._moveM = 0;
        this._goods = [];
        this._jump = 0;
        this._jumpX = 0;
        this._moveMush = 0;
        this._mushNum = 0;
        this._jumpNum = [];


        var _sky = cc.Layer.create();
        this.addChild(_sky);
        var _b = cc.Sprite.create(s_sky);
        _b.setPosition(cc.p(480, 270));
        _sky.setScale(1.1);
        _sky.addChild(_b);
        this.schedule(this.moveProspect, 0.01);

        var self = this;
        this._prospect = [{bg: cc.Layer.create(), goods: []}, {bg: cc.Layer.create(), goods: []}];
        this._prospect[1].bg.setPositionX(960);
        this._prospect.forEach(function(o){
            for(var i=5;i<7;i++){
                var _sky = cc.Sprite.create(goods[i]);
                _sky.setPosition(cc.p(( Math.random()*700 | 0 ) + 40, ( Math.random()*200 | 0 ) + 300));
                o.goods.push(_sky);
                o.bg.addChild(_sky);
            }

            var _mountain = cc.Sprite.create(goods[7]);
            _mountain.setPosition(cc.p( 400, 88 ));
            _mountain.setScale(3);
            o.bg.addChild(_mountain);

            self.addChild(o.bg);
        });


        //Create mushroom
        var _muLay = cc.Layer.create();
        this.addChild(_muLay);
        this._mushroom = cc.Sprite.create();
        _muLay.addChild(this._mushroom);

        //The creation of two different layers
        var createGroung = function(_bg){
            for(var i=0;i<5;i++){
                var _ground = cc.Sprite.create(s_ground);
                _ground.setPosition(cc.p(90+i*160, 55));
                _bg.addChild(_ground);
            }
        };
        var _bg = cc.Layer.create();
        this._background.push({bg: _bg, box:[], ground: []});
        this.addChild(_bg, 0);
        createGroung(_bg);

        _bg = cc.Layer.create();
        this._background.push({bg: _bg, box: [], ground: []});
        _bg.setPositionX(960);
        this.addChild(_bg, 0);
        createGroung(_bg);


        var self = this;
        this._background.forEach(function(o){

            //Create a goods
            for(var i=0;i<5;i++){
                var _ground = cc.Sprite.create(goods[i]);
                _ground.setPosition(cc.p((Math.random()*700 | 0) + 40, 90 + self._goodsSize[i].h/2));
                o.ground.push(_ground);
                o.bg.addChild(_ground);
            }

            //Create a treasure chest
            var list = [s_box1, s_box1, s_box1, s_box1];

            var _random =  0 | Math.random() * 4;
            self._goods.push(_random);

            list.splice(_random, 0, s_box3);

            list.forEach(function(_box, i){
                _box = cc.Sprite.create(_box);
                _box.setPosition(cc.p(360+i*76, 360));
                o.box.push(_box);
                o.bg.addChild(_box);
            });


        });

        this._jumpNum = [this._goods[1], this._goods[0]];

        //Character creation
        this._manBG = cc.Layer.create();
        this.addChild(this._manBG, 0);
        this._man = cc.Sprite.create(s_1);
        this._man.setPosition(cc.p(200, 180));
        this._manBG.addChild(this._man);

        //Create listener
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (a, event) {
                var _x = self._background[0].bg.getPositionX();
                console.log(_x)
                if(_x>-404 || _x< -784){
                    self.unschedule(self.moveMan);
                    self._man.initWithFile(s_7);
                    self.schedule(self.jump, 0.01);
                }
            }
        }, this);

        this.schedule(this.moveGround, 0.01);
        this.schedule(this.moveMan, 0.15);
    },

    moveProspect: function(){
        this._prospect.forEach(function(o){
            var _x = o.bg.getPositionX();
            if(_x < -960){
                _x = 960;
            }
            o.bg.setPositionX(_x - 2);
        });
    },

    resetLayer: function(){

        var layer = this._background.splice(0, 1)[0];

        var list = [s_box1, s_box1, s_box1, s_box1];

        this._goods.splice(0, 1);

        var _random =  0 | Math.random() * 4;

        this._goods.push(_random);

        list.splice(_random, 0, s_box3);

        layer.box.forEach(function(_box, i){
            _box.initWithFile(list[i]);
        });
        this._background.push(layer);
    },

    moveGround: function(){

        if(this._moveBG){
            var self = this;

            this._background.forEach(function(o){
                var _x = o.bg.getPositionX();

                if(_x <= -580 && _x > -583 && self._jump == 0){
                    self.unschedule(self.moveMan);
                    self._man.initWithFile(s_7);
                    self.schedule(self.jump, 0.01);
                }

                if(_x <= (-380 + (4-self._goods[0])*72) && _x > (-383 + (4-self._goods[0])*72)){
                    self.unschedule(self.moveMan);
                    self._man.initWithFile(s_7);
                    self.schedule(self.jump, 0.01);
                }

                if(_x <= -580 && _x > -583){
                    self._mushroom.initWithFile(coco_2);
                    self.schedule(self.mushDown, 0.01);
                }

                if(_x <= -960){
                    _x = 960;
                    self.resetLayer();
                }

                o.bg.setPositionX(_x-4);
            });
        }
    },

    _manList: [s_1, s_2, s_3, s_4, s_5, s_6],
    moveMan: function(){
        this._man.initWithFile(this._manList[this._moveM++]);
        if(this._moveM >= 6) this._moveM=0;
    },

    jump: function(){

        if(this._jump < 20){
            this._man.setPositionY(this._jump++ * 4 + 180);
            if(this._jump == 19){
                var o = this._background[0].bg.getPositionX();

                var num = Math.abs((o+134)/76 | 0);

                if(o < 0 && num == this._goods[0]){
                    this._mushNum = num;

                    this._background[0].box[num].initWithFile(s_box2);
                    this._mushroom.setVisible(true);
                    this._mushroom.initWithFile(coco_1);
                    this._mushroom.setPosition(cc.p(200, 370));
                    this.schedule(this.moveMushroom, 0.01);
                }

            }
        }else if(this._jump >= 20 && this._jump < 40){
            this._man.setPositionY((40 - this._jump++) * 4 + 180);

            if(this._jump == 36){

                this.schedule(this.moveMan, 0.15);
            }
        }else{
            this._jump = 0;
            this.unschedule(this.jump);
        }


    },

    _mushNum: 0,
    _moveMush: 0,
    moveMushroom: function(){
        if(this._moveMush < 20){

            this._mushroom.setPositionY(370 + this._moveMush++ * 5);
            this._mushroom.setPositionX(200 - this._moveMush * 4);

        }else if(this._moveMush < 30){
            this._mushroom.initWithFile(coco_2);

            this._mushroom.setPositionY(510 - this._moveMush++ * 2);
        }else{
            this._mushroom.initWithFile(coco_1);

            this._moveMush = 0;
            this.unschedule(this.moveMushroom);
        }

    },

    mushDown: function(){
        var _y = this._mushroom.getPositionY();
        this._mushroom.setPositionY(_y - 5);
        this._mushroom.setPositionX(this._mushroom.getPositionX()+1);
        if(_y < 310){
            this.unschedule(this.mushDown);
            this._mushroom.setVisible(false);
        }
    }



});