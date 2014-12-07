//游戏开始后的地图（主体）

var GameLayer = cc.Scene.extend({
    _house: null,
    _start: false,

    ctor: function(){
        cc.Layer.prototype.ctor.call(this);
        this._house = [];
        this.scheduleUpdate();
        loop.setLayer(this);
    },

    init: function(){
        //计分层
        var score = new ScoreLayer();
        this.addChild(score, 10);
        gameController.scoreLayer = score;
        this.start();
    },

    //点击了开始按钮后，初始化游戏等数据
    start: function(){
        //初始化3个房子
        this.createHouse();
    },

    createHouse: function(){
        var h1 = new House();
        h1._HouseNum = 1;
        this.addChild(h1);
        this._house.push(h1);
        h1.setPosition(150, 330);

        var h2 = new House();
        h2._HouseNum = 2;
        this.addChild(h2);
        this._house.push(h2);
        h2.setPosition(150, 230);

        var h3 = new House();
        h3._HouseNum = 3;
        this.addChild(h3);
        this._house.push(h3);
        h3.setPosition(150, 130);

        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var x = touch._point.x,
                    y = touch._point.y;

                var h1LeftTopX = h1.x - h1.width / 2,
                    h1LeftTopY = h1.y - h1.height / 2,
                    h1RightBottomX = h1.x + h1.width / 2,
                    h1RightBottomY = h1.y + h1.height / 2;
                if(x > h1LeftTopX && y > h1LeftTopY && x < h1RightBottomX && y < h1RightBottomY){
                    console.log("h1");
                    if(h1._choiceCheck === false){
                        h1.choice();
                        gameData.currentHouse = gameData.houseInfo[0];
                    }else
                        h1.reChoice();
                    h2.reChoice();
                    h3.reChoice();
                    return;
                }

                var h2LeftTopX = h2.x - h2.width / 2,
                    h2LeftTopY = h2.y - h2.height / 2,
                    h2RightBottomX = h2.x + h2.width / 2,
                    h2RightBottomY = h2.y + h2.height / 2;
                if(x > h2LeftTopX && y > h2LeftTopY && x < h2RightBottomX && y < h2RightBottomY){
                    console.log("h2");
                    if(h2._choiceCheck === false){
                        h2.choice();
                        gameData.currentHouse = gameData.houseInfo[1];
                    }else
                        h2.reChoice();
                    h1.reChoice();
                    h3.reChoice();
                    return;
                }

                var h3LeftTopX = h3.x - h3.width / 2,
                    h3LeftTopY = h3.y - h3.height / 2,
                    h3RightBottomX = h3.x + h3.width / 2,
                    h3RightBottomY = h3.y + h3.height / 2;
                if(x > h3LeftTopX && y > h3LeftTopY && x < h3RightBottomX && y < h3RightBottomY){
                    console.log("h3");
                    if(h3._choiceCheck === false){
                        h3.choice();
                        gameData.currentHouse = gameData.houseInfo[2];
                    }else
                        h3.reChoice();
                    h1.reChoice();
                    h2.reChoice();
                    return;
                }

                h1.reChoice();
                h2.reChoice();
                h3.reChoice();
            }
        });
        cc.eventManager.addListener(listener1, this);
    },

    update: function(dt){
        if(this._start)
           loop.step(dt);
    }
});