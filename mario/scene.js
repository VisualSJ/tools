var module = {};

var scene = cc.Scene.extend({

    //暂存页面宽度
    _width: null,

    onEnter: function(){
        var self = this;
        cc.Scene.prototype.onEnter.call(this);

        this.x = -960;

        //插入前景层
        this.Prospect = cc.Layer.create();
        this.addChild(this.Prospect);

        //插入背景层
        this.Background = cc.Layer.create();
        this.addChild(this.Background);

        //插入人物动作层
        this.Character = cc.Layer.create();
        this.addChild(this.Character);

        //获取画布真实宽度
        this._width = cc.winSize.width;

        //判断所需的块个数
        this._blockNum = (this._width / 960 | 0) + 3;

        //前景队列
        this.ProspectList = [];
        //背景队列
        this.BackgroundList = [];
        module.for(this._blockNum, function(i){
            self.ProspectList.push(new module.Prospect(self.Prospect, self.ProspectList.length));
        });

        //马里奥
        this.Mario = new module.Mario(this, this.Character);
        //箱子的起跳坐标
        this.jumpPosition = [-924, -42, -114, -192, -270];

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
                _remove.position(this.ProspectList.length);
                this.ProspectList.push(_remove);
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
    },

    resize: function(){
        //获取画布真实宽度
        this._width = cc.winSize.width;
        //判断所需的块个数
        var _num = (this._width / 960 | 0) + 3;
        //屏幕变大
        if(_num > this._blockNum){
            //新增区块对象
            this.ProspectList.push(new module.Prospect(this.Prospect, this.ProspectList.length));
            this._blockNum++;
        }else{
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
            _grass.setPositionX(_x1 + j*160);
        });
        this.Brick.forEach(function(_brick, j){
            _brick.setPositionX(_x2 + j*76);
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
    };
};


//当前块背景对象
module.Background = function(layer, i){
    var self = this;
    //保存当前层
    this.Layer = layer;


};

//mario叔叔
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

            if(self._jump == 40){
                var _x = this.Prospect.x;
                //第一块砖
                if(_x > -242 && _x < -166 && this.BrickNum == 0){
                    console.log(1)
                }else if(_x > -318 && this.BrickNum == 1){

                    console.log(2)
                }else if(_x > -394 && this.BrickNum == 2){

                    console.log(3)
                }else if(_x > -470 && this.BrickNum == 3){

                    console.log(4)
                }else if(_x > -546 && this.BrickNum == 4){

                    console.log(5)
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
module.Cocos = function(){

};