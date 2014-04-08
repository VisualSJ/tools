var createSprite = function(fileName, rect, p, layer){
    var sprite = cc.Sprite.create(fileName, rect);
    sprite.setAnchorPoint(0.5, 0.5);
    sprite.setPosition(p);
    layer.addChild(sprite, 0);
    return sprite;
};
var scoreList = [
    cc.rect(1019, 299, 61,91),
    cc.rect(1080, 299, 59,91),
    cc.rect(1139, 299, 61,91),
    cc.rect(1210, 299, 61,91),
    cc.rect(1280, 299, 61,91),
    cc.rect(1350, 299, 61,91),
    cc.rect(1420, 299, 61,91),
    cc.rect(1490, 299, 61,91),
    cc.rect(1560, 299, 61,91),
    cc.rect(1630, 299, 61,91)
];

var gameScene = cc.Scene.extend({
    _status: 0, //0 - ready, 1 - running, -1 - end
    _moveSpeed: 300,
    _flyTime: 0,
    _flyY: 870,
    _pipeList: [],
    _score: 0,
    _wing: 0,
    _scoreList: [0, 0, 0, 0, 0],
    onEnter: function(){
        this._super();
        var self = this;

        this.wing();
        this.ground();
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (a, event) {
                switch(self._status){
                    case 0: //ready
                        self.scoreView();
                        self._startLayer.setVisible(false);
                        self.schedule(self.fly, 0.03);
                        self._status = 1;
                        break;
                    case 1: //running
                        self._flyTime = 0;
                        self._birdSprite.setRotation(-30);
                        self._flyY = self._birdSprite.getPositionY();
                        break;
                    default: //end
                        if(a._point.x > 78 && a._point.y < 616 && a._point.x < 328 && a._point.y > 487){
                            self._flyTime = 0;
                            self._flyY = 870;
                            self._birdSprite.setRotation(0);
                            self._birdSprite.setPositionY(self._flyY);
                            self._score = 0;

                            self._pipeList.forEach(function(pipe, i){
                                pipe.reset();
                                pipe.x = 795 + i*400;
                                pipe.a.setPositionX(pipe.x);
                                pipe.b.setPositionX(pipe.x);
                            });

                            self._endLayer.setVisible(false);
                            self._startLayer.setVisible(true);
                            self._status = 0;
                            self._goldMedal.setVisible(false);
                            self._silverMedal.setVisible(false);
                            self.wing();
                            self.ground();
                        }

                }
            }
        }, this);

        this.backgroundLayer();
        this.startLayer();
        this.birdLayer();
        for(var i=0;i<3;i++){
            this.createPipe(i);
        }
        this._scoreSprite = [
            createSprite(s_flappy, scoreList[this._score], cc.p(360, 1100), this._birdLayer),
            createSprite(s_flappy, scoreList[this._score], cc.p(360, 1100), this._birdLayer),
            createSprite(s_flappy, scoreList[this._score], cc.p(360, 1100), this._birdLayer)
        ];
        this._scoreSprite.forEach(function(sprite){
            sprite.setVisible(false);
        });
        this.endLayer();
    },
    backgroundLayer: function(){
        var _layer = cc.Layer.create('src/bg.png');
        this.addChild(_layer, 0);

        createSprite(s_bg, 0, cc.p(360, 640), _layer);
        var ground = createSprite(s_ground, 0, cc.p(420, 140), _layer);

        this._groundSprite = ground;
    },
    startLayer: function(){
        var _layer = cc.Layer.create();
        this.addChild(_layer, 0);

        createSprite(s_flappy, cc.rect(515, 315, 480, 135), cc.p(360, 1100), _layer);
        createSprite(s_flappy, cc.rect(760, 0, 285, 245), cc.p(360, 850), _layer);

        this._startLayer = _layer;
    },
    endLayer: function(){
        var _layer = cc.Layer.create();
        _layer.setVisible(false);
        this.addChild(_layer, 0);

        createSprite(s_flappy, cc.rect(18, 320, 482, 108), cc.p(360, 1100), _layer);
        createSprite(s_flappy, cc.rect(15, 6, 568, 286), cc.p(360, 850), _layer);
        createSprite(s_flappy, cc.rect(465, 465, 260, 144), cc.p(205, 550), _layer);

        this._goldMedal = createSprite(s_flappy, cc.rect(1860, 86, 110, 110), cc.p(200, 830), _layer);
        this._silverMedal = createSprite(s_flappy, cc.rect(1060, 160, 110, 110), cc.p(200, 830), _layer);
        this._goldMedal.setVisible(false);
        this._silverMedal.setVisible(false);

        this._endLayer = _layer;
    },
    birdLayer: function(){
        var _layer = cc.Layer.create();
        this.addChild(_layer, 0);

        var texture = cc.textureCache.addImage(s_flappy);
        var flyA = cc.SpriteFrame.create(texture, cc.rect(674, 61, 86, 60));
        var bird = cc.Sprite.create(flyA);
        bird.setAnchorPoint(0.5, 0.5);
        bird.setPosition(240, 870);
        _layer.addChild(bird, 0);

        this._birdSprite = bird;
        this._birdLayer = _layer;
    },
    scoreView:function(){
        var score = this._score;
        if(score<10){
            this._scoreSprite[0].initWithFile(s_flappy, scoreList[this._score]);
            this._scoreSprite[0].setVisible(true);
        }else if(score < 100){
            this._scoreSprite[0].initWithFile(s_flappy, scoreList[Math.floor(this._score/10)]);
            this._scoreSprite[0].setPositionX(325);
            this._scoreSprite[0].setVisible(true);
            this._scoreSprite[1].initWithFile(s_flappy, scoreList[Math.floor(this._score%10)]);
            this._scoreSprite[1].setPositionX(395);
            this._scoreSprite[1].setVisible(true);
        }

    },
    fly: function(){
        var i = this._flyTime++;
        this._birdSprite.setRotation(Math.min(50, i*10-40));
        var o = -Math.pow((i/7 - 1), 2) + 1;
        o *= 120;
        this._birdSprite.setPosition(cc.p(240, this._flyY + o));
        this.movePipe();

    },
    wing: function(){
        this.schedule(this.moveWing, 0.1);
    },
    moveWing: function(){
        var fly = [
            cc.rect(674, 61, 86, 60),
            cc.rect(674, 122, 86, 60),
            cc.rect(674, 0, 86, 60)
        ];
        this._birdSprite.initWithFile(s_flappy, fly[this._wing++]);
        if(this._wing > 2) this._wing = 0;
    },
    ground: function(){
        this.schedule(this.moveGround, 0.03);
    },
    moveGround: function(){
        var _x = this._groundSprite.getPositionX() - this._moveSpeed / 40;
        if(_x <= 360 ) _x = 420;
        this._groundSprite.setPositionX(_x);
    },
    createPipe: function(num){
        var oA = Math.floor(Math.random()*500) + 200;
        var oB = 900 - oA;
        var X = 795 + num*400;
        var _layer = this._birdLayer;
        var PipeA = createSprite(s_flappy, cc.rect(10, 478, 130, 800 - oA), cc.p(X, 280 + 400 - oA/2), _layer);
        var PipeB = createSprite(s_flappy, cc.rect(160, 490 + oB, 130, 800 - oB), cc.p(X, 1280 - 400 + oB/2), _layer);

        var self = this;
        var px = self._moveSpeed / 40;
        this._pipeList.push({
            a: PipeA,
            b: PipeB,
            x: X,
            y: 1124 - oA,
            move: function(){
                this.x -= px;
                if(this.x < -400){
                    this.x = 795;
                    this.reset();
                }
                PipeA.setPositionX(this.x);
                PipeB.setPositionX(this.x);
                self.crash(this.x, this.y);
            },
            reset: function(){
                var oA = Math.floor(Math.random()*500) + 200;
                var oB = 900 - oA;
                var X = 795 + num*400;
                this.y = 1124 - oA;
                PipeA.initWithFile(s_flappy, cc.rect(10, 478, 130, 800 - oA));
                PipeA.setPosition(cc.p(X, 280 + 400 - oA/2));
                PipeB.initWithFile(s_flappy, cc.rect(160, 490 + oB, 130, 800 - oB));
                PipeB.setPosition(cc.p(X, 1280 - 400 + oB/2));
            }
        });
    },
    movePipe: function(){
        this._pipeList.forEach(function(o){
            o.move();
        });
    },
    crash: function(x, y){
        var Y = this._birdSprite.getPositionY();
        var end = function(obj){
            obj.unschedule(obj.fly);
            obj.unschedule(obj.moveWing);
            obj.unschedule(obj.moveGround);
            obj._endLayer.setVisible(true);
            obj._status = -1;
            obj._scoreSprite.forEach(function(score){
                score.setVisible(false);
                score.setPositionX(360);
            });
            switch(obj.pushScore(obj._score)){
                case 0:
                    obj._goldMedal.setVisible(true);
                    break;
                case 1:
                    obj._silverMedal.setVisible(true);
                    break;
            }
        };
        if(this._status != -1 && Y < 320){
            end(this);
            return void 0;
        }
        if(128 < x && x < 352){
            if(x > 237 && x < 243){
                this._score++;
                this.scoreView();
            }
            if(Y > y + 225 || Y < y){
                end(this);
            }
        }
    },
    pushScore: function(num){
        for(var i=0; i<5; i++){
            if(this._scoreList[i] < num){
                this._scoreList.splice(i, 0, num);
                break;
            }
        }
        this._scoreList.splice(5);
        return i;
    }
});