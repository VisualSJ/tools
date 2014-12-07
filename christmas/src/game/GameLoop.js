//主循环
var loop = (function(){

    //基础配置

    //创建己方sprite的位置信息（为了不耦合，不取layer内的数据，在这里配置）
    var buddyPosition = [
        {x: 150, y: 330},
        {x: 150, y: 230},
        {x: 150, y: 130}
    ];

    //创建己方sprite的位置信息（为了不耦合，不取layer内的数据，在这里配置）
    var enemiesPosition = [
        {x: 600, y: 330},
        {x: 600, y: 230},
        {x: 600, y: 160}
    ];

    var coSize = {
        width: 50,
        height: 50
    };

    //多久创建一次己方的士兵
    var buddyRefresh = 7000;

    //己方的小伙伴前进的速度
    var buddySpeed = 2;

    //多久刷新一次圣诞老人方向的怪物
    var enemiesRefresh = 6000;

    //圣诞老人方向的怪物前进的速度
    var enemiesSpeed = 1.5;

    //相互克制
    var restraint = [
        [],[],[]
    ];

    restraint[0][0] = 2;//胜利
    restraint[0][1] = 0;//失败
    restraint[0][2] = 1;//平手

    restraint[1][0] = 0;//失败
    restraint[1][1] = 1;//平手
    restraint[1][2] = 2;//胜利

    restraint[2][0] = 1;//平手
    restraint[2][1] = 2;//胜利
    restraint[2][2] = 0;//失败


    var timeStamp = 0;
    var layer;

    //循环内部的调度函数（需要由外部调用-gamelayer）
    var step = function(dt){
        dt *= 1000;
        timeStamp += dt;
        if(timeStamp % buddyRefresh < dt){
            //console.log("buddy Refresh");
            //刷新小伙伴并且执行walk，插入碰撞队列
            gameData.houseInfo.forEach(function(house, index){
                var position = buddyPosition[index];
                //console.log(house.figure);
                var buddy = Buddy.create(house.figure);
                buddy.setPosition(position.x, position.y);
                layer.addChild(buddy);
                buddy.walk(buddySpeed, enemiesPosition[index].x, enemiesPosition[index].y);
                gameData.BuddyCollision[index].push(buddy);
            });
            //gameData.Collision.push();
        }
        if(timeStamp % enemiesRefresh < dt){
            //console.log("enemies Refresh");
            enemiesPosition.forEach(function(em, index){
                var enemie = Enemy.createByRandom();
                enemie.setPosition(em.x, em.y);
                layer.addChild(enemie);
                enemie.walk(enemiesSpeed, buddyPosition[index].x, buddyPosition[index].y);
                gameData.EnemiesCollision[index].push(enemie);
            });
        }

        collision();
    };

    //碰撞检测队列
    var collision = function(){
        var buddy = gameData.BuddyCollision;
        var enemies = gameData.EnemiesCollision;

        var x1, x2;

        for(var i=0; i<3; i++){
            var buddyRow = buddy[i];
            var enemiesRow = enemies[i];
            for(var j=0; j<buddyRow.length; j++){
                for(var k=0; k< enemiesRow.length; k++){
                    if(j<0) continue;
                    x1 = buddyRow[j].x;
                    x2 = enemiesRow[k].x;
                    if(x1+coSize.width > x2){
                        var state = restraint[buddyRow[j]._type][enemiesRow[k]._type];
                        switch(state){
                            case 0:
                                buddyRow[j].stopAllActions();
                                enemiesRow[k].stopAllActions();

                                buddyRow[j].attack(false);
                                buddyRow.splice(j--, 1);
                                enemiesRow[k].attack(true);
                                break;
                            case 1:
                                buddyRow[j].stopAllActions();
                                enemiesRow[k].stopAllActions();

                                buddyRow[j].attack(false);
                                buddyRow.splice(j--, 1);
                                enemiesRow[k].attack(false);
                                enemiesRow.splice(k--, 1);
                                break;
                            case 2:
                                buddyRow[j].stopAllActions();
                                enemiesRow[k].stopAllActions();

                                buddyRow[j].attack(true);
                                enemiesRow[k].attack(false);
                                enemiesRow.splice(k--, 1);
                                break;
                        }
                    }
                }
            }
        }
    };

    var clear = function(){
        var buddy = gameData.BuddyCollision;
        var enemies = gameData.EnemiesCollision;
        for(var i=0; i<3; i++){
            buddy[i].forEach(function(b){
                b.removeFromParent();
            });
            enemies[i].forEach(function(b){
                b.removeFromParent();
            });
            buddy[i].length = 0;
            enemies[i].length = 0;
        }
        timeStamp = 0;
        gameController.gameLayer._start = false;
        cc.eventManager.addListener(Ready_Event, gameController.initialLayer._start);
        cocos.runAction(
            cc.tintTo(1, 255, 255, 255)
        );
    };

    return {
        setLayer: function(l){layer=l;},
        step: step,
        clear: clear
    };

})();