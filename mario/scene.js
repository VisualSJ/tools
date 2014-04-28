var module = {};

var scene = cc.Scene.extend({
    onEnter: function(){
        var self = this;
        cc.Scene.prototype.onEnter.call(this);

        var _t = Math.max((cc.winSize.width - 1500)/8, 0);
        this.x = _t - 960;

        //插入背景层
        this.Background = cc.Layer.create();
        this.addChild(this.Background);

        //云和山
        this.slowMove = cc.Layer.create();
        this.addChild(this.slowMove);

        //Goods
        this.Goods = cc.Layer.create();
        this.addChild(this.Goods);

        //插入前景层
        this.Prospect = cc.Layer.create();
        this.addChild(this.Prospect);

        //插入人物动作层
        this.Character = cc.Layer.create();
        this.addChild(this.Character);

        //获取画布真实宽度
        this._width = cc.winSize.width;

        //判断所需的块个数
        this._blockNum = (this._width / 960 | 0) + 3;

        //前景队列
        this.ProspectList = [];
        module.for(this._blockNum, function(i){
            self.ProspectList.push(new module.Prospect(self.Prospect, self.ProspectList.length));
        });
        //背景队列
        this.BackgroundList = [];
        module.for(this._blockNum, function(i){
            self.BackgroundList.push(new module.Background(self.Background, self.BackgroundList.length));
        });
        //云和山队列
        this.SlowList = [];
        module.for(this._blockNum, function(i){
            self.SlowList.push(new module.slowMove(self.slowMove, self.SlowList.length));
        });

        //马里奥
        this.Mario = new module.Mario(this, this.Character);
        //箱子的起跳坐标
        this.jumpPosition = [-924, -42, -114, -192, -270];
        //cocos
        this.Cocos = new module.Cocos(this, this.Goods);

        setTimeout(function(){
            self.schedule(self.Mario.__run, 0.1);
            self.schedule(self.update, 0.01);
        },1000);

        //点击事件
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (a, event) {
                var _x = self.Prospect.x;

                if(_x < -330 && _x > -880){
                    return;
                }
                self.Mario.jump.call(self);
            }
        }, this);
    },

    update: function(){
        //宽度变化
        if(this._width != cc.winSize.width){
            this.resize();
        }

        var _x = this.Prospect.x;
        //移动超出视野的场景
        if(_x <= -960){
            this.Prospect.x = 0;
            var _remove = this.ProspectList.splice(0, 1)[0];

            if(this.ProspectList.length <= this._blockNum){
                this.ProspectList.push(_remove);
                _remove.rest();
            }else{
                _remove.remove();
            }

            this.ProspectList.forEach(function(_prospect, i){
                _prospect.position(i);
            });
        }else{
            this.Prospect.x = _x - 6;
        }

        //判断是否需要自动jump
        if(_x == -570 ){
            this.BrickNum = this.ProspectList[2].BrickNum;
            this.Mario.jump.call(this);
        }

        //自动撞箱子
        if(this.Prospect && _x == this.jumpPosition[this.BrickNum]){
            this.Mario.jump.call(this);
        }

        //云和山
        var _xx = this.slowMove.x;
        if(_xx <= -960){
            this.slowMove.x = 0;
            var _remove = this.SlowList.splice(0, 1)[0];

            if(this.SlowList.length <= this._blockNum){
                this.SlowList.push(_remove);
            }else{
                _remove.remove();
            }

            this.SlowList.forEach(function(_o, i){
                _o.position(i);
            });
        }else{
            this.slowMove.x = _xx - 2;

        }

    },

    resize: function(){
        //获取画布真实宽度
        this._width = cc.winSize.width;
        var _t = Math.max((this._width - 1500)/8, 0);
        this.x = _t - 960;
        //判断所需的块个数
        var _num = (this._width / 960 | 0) + 3;
        //屏幕变大
        if(_num > this._blockNum){
            //新增区块对象
            this.ProspectList.push(new module.Prospect(this.Prospect, this.ProspectList.length));
            this.BackgroundList.push(new module.Background(this.Background, this.BackgroundList.length));
            this.SlowList.push(new module.slowMove(this.slowMove, this.SlowList.length));
            this._blockNum++;
        }else if(_num < this._blockNum){
            this.BackgroundList.splice(this.BackgroundList.length-1, this.BackgroundList.length).forEach(function(_t){
                _t.remove();
            });

            this._blockNum = _num;
        }
    }
});

//循环
module.for = function(num, handle){
    for(var i=0;i<num;i++){
        typeof handle === 'function' && handle(i);
    }
};

//当块前景对象
module.Prospect = function(layer, i){

    var self = this;
    //保存当前层
    this.Layer = layer;

    var _x = i * 960;

    //插入底层草地
    this.Grassland = [];
    module.for(5, function(j){
        var _Sprite = cc.Sprite.create(s_ground);
        _Sprite.setPosition(cc.p( 90 + j * 160 + _x, 55));
        self.Grassland.push(_Sprite);
        self.Layer.addChild(_Sprite);
    });

    //插入页面石头、树等
    this.Goods = [];
    var size = [
        {w: 133, h: 127},
        {w: 92, h:91},
        {w: 185, h: 152},
        {w: 57, h: 34},
        {w: 90, h: 42},
        {w: 657, h: 221},
        {w: 307, h: 162}
    ];
    module.for(5, function(j){
        var _Sprite = cc.Sprite.create(s_goods[j]);
        var _t = 0 | Math.random() * 720 + 40;
        _Sprite.setPosition(cc.p(_t + _x, 100 + size[j].h/2));
        self.Goods.push({
            sprite: _Sprite,
            size: size[j],
            x: _t
        });
        self.Layer.addChild(_Sprite);
    });

    //插入顶部砖块
    this.Brick = [];
    this.BrickNum = Math.round(Math.random() * 4);
    module.for(5, function(j){
        var _Sprite = cc.Sprite.create( j == self.BrickNum ? s_box[2] : s_box[0]);
        _Sprite.setPosition(cc.p( 260 + j*76 + _x, 360));
        self.Brick.push(_Sprite);
        self.Layer.addChild(_Sprite);
    });

    this.position = function(i){
        var _x = i*960;
        var _x1 = _x + 90;
        var _x2 = _x + 260;
        this.Grassland.forEach(function(_grass, j){
            _grass.x = _x1 + j*160;
        });
        this.Brick.forEach(function(_brick, j){
            _brick.x = _x2 + j*76;
        });
        this.Goods.forEach(function(_goods, j){
            _goods.sprite.x = _goods.x + _x;
        });
    };

    this.remove = function(){
        var self = this;
        this.Grassland.forEach(function(_grass, j){
            self.Layer.removeChild(_grass);
        });
        this.Brick.forEach(function(_brick, j){
            self.Layer.removeChild(_brick);
        });
        this.Goods.forEach(function(_goods, j){
            self.Layer.removeChild(_goods.sprite);
        });
    };

    this.rest = function(){
        //重置顶部砖块
        var self = this;
        this.BrickNum = Math.round(Math.random() * 4);
        module.for(this.Brick.length, function(j){
            self.Brick[j].initWithFile( j == self.BrickNum ? s_box[2] : s_box[0]);
        });
    };
};


//当前块背景对象
module.Background = function(layer, i){
    var self = this;
    //保存当前层
    this.Layer = layer;
    var _x = i * 960;

    this.Sprite = cc.Sprite.create(s_sky);
    this.Sprite.setPosition(cc.p(_x + 480, 270));
    this.Sprite.setFlippedX(i%2);
//    this.Sprite.setScale(1.05);
    layer.addChild(this.Sprite);

    this.remove = function(){
        self.Layer.removeChild(self.Sprite);
    };
};

//云和山
module.slowMove = function(layer, i){
    var self = this;

    this.Layer = layer;

    var _x = i * 960;

    this.Mountain = {
        sprite: cc.Sprite.create(s_goods[7]),
        x: Math.random()*300 | 0
    };
    this.Mountain.sprite.setPosition(cc.p(this.Mountain.x + _x, 90));
    this.Mountain.sprite.setScale(2.5);
    this.Layer.addChild(this.Mountain.sprite);

    this.Cloud = [];
    module.for(2, function(j){
        var _sprite = cc.Sprite.create(s_goods[j+5]);
        var _tx = Math.random()*960 |0;
        var _ty = (Math.random()*300 + 200) | 0;
        _sprite.setPosition( _tx + _x, _ty);
        self.Cloud.push({
            sprite: _sprite,
            x: _tx,
            y: _ty
        });
        self.Layer.addChild(_sprite);
    });

    this.position = function(i){
        var _x = i * 960;
        this.Cloud.forEach(function(_cloud){
            _cloud.sprite.x = _cloud.x + _x;
        });
        this.Mountain.sprite.x = this.Mountain.x + _x;
    };

    this.remove = function(){
        this.Cloud.forEach(function(_cloud){
            self.Layer.removeChild(_cloud.sprite);
        });
        self.Layer.removeChild(this.Mountain.sprite);
    };
};

//mario
module.Mario = function(obj, layer){

    this.Layer = layer;
    this.scene = obj;
    var self = this;

    this.Sprite = cc.Sprite.create(s_mario[0]);
    this.Sprite.setPosition(cc.p(1160, 180));
    this.Layer.addChild(this.Sprite);

    this._run = 1;
    this._jump = 0;

    this.__run = function(){

        self.Sprite.initWithFile(s_mario[self._run++]);
        if(self._run > 5) self._run = 0;
    };

    this.jump = function(){
        this.unschedule(self.__run);
        self.Sprite.initWithFile(s_mario[6]);
        this.schedule(self.__jump, 0.01);
    };
    this._jumpNum = [];

    module.for(41, function(i){
        self._jumpNum.push(180 + ((-Math.pow(i/2 - 10, 2) + 100) * 0.8) | 0);
    });

    this.__jump = function(){
        if(self._jump <= 40){
            self.Sprite.y = self._jumpNum[self._jump++];

            if(self._jump == 20){
                var _x = this.Prospect.x;

                var _t = this.BrickNum * 76;
                if(_x < -30 - _t && _x > -134 - _t){
                    this.Cocos.jump();
                    var _t = this.ProspectList[1];
                    _t.Brick[_t.BrickNum].initWithFile(s_box[1]);

                }
            }
        }else{
            this.schedule(self.__run, 0.1);
            this.unschedule(self.__jump);
            self._jump = 0;
        }
    };
};

//cocos
module.Cocos = function(obj, layer){

    this.Sence = obj;
    this.Layer = layer;
    var self = this;

    this.Sprite = cc.Sprite.create(s_coco[1]);
    this.Sprite.setPosition(cc.p(1130, 360));
    this.Sprite.setVisible(false);
    layer.addChild(this.Sprite);
    this._jumpNum = [];
    this._jump = 0;

    module.for(51, function(i){
        self._jumpNum.push(375 + ((-Math.pow(i/2 - 10, 2) + 100)*1.5) | 0);
    });

    this.jump = function(){
        self.Sprite.setVisible(true);
        self.Sprite.y = 360;
        self.Sprite.x = 1130;
        self.Sence.schedule(self.__jump, 0.01);
    };

    var _yt = 0;
    this.__up = function(){
        _yt++;
        self.Sprite.y = self.Sprite.y + 5;
        self.Sprite.x = self.Sprite.x - 6;
        if(_yt > 5){
            self.Sence.unschedule(self.__up);
            self.Sence.schedule(self.__jump, 0.01);
        }
    };

    this.__jump = function(){
        if(self._jump <= 34){
            if(self._jump <= 8){
                self.Sprite.x = self.Sprite.x - 2;
            }
            self.Sprite.y = self._jumpNum[self._jump++];

        }else{
            self.Sence.unschedule(self.__jump);
            self.Sence.schedule(self.__down, 0.01);
        }
    };

    var _tt = 0;
    this.__down = function(){
        if(this.Prospect.x <= -480){
            self.Sprite.initWithFile(s_coco[1]);

            var _y =  self.Sprite.y;
            if(_y > 300){

                self.Sprite.y = _tt + self._jumpNum[self._jump++];
            }else{

                _tt = 0;
                self._jump = 0;
                self.Sence.unschedule(self.__down);
                self.Sprite.setVisible(false);
            }

        }else{
            self.Sprite.initWithFile(s_coco[0]);
            _tt = -75;
            self._jump = 20;
        }
    };
};