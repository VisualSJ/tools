/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Main extends egret.DisplayObjectContainer{

    /**
     * 加载进度界面
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("preload");
    }
    /**
     * 创建游戏场景
     */
    private onGroupComp():void{

        var TestScene = [
            {a: 10, b: 20}, //200
            {a: 15, b: 30}, //450
            {a: 20, b: 40}, //800
            {a: 25, b: 50}, //1250
            {a: 30, b: 60}, //1800
            {a: 35, b: 70}, //2450
            {a: 40, b: 80}, //3200
        ];

        //fish元素队列
        var fishList = [];

        var self = this;
        var level = 0;
        var addition = document.getElementById("addition");
        if(addition){
            addition.addEventListener("click", function(){
                self.removeFish(fishList);
                level++;
                if(TestScene.length <= level) level = TestScene.length - 1;
                self.createFish(TestScene[level], fishList);
            }, false);
        }
        var subtraction = document.getElementById("subtraction");
        if(subtraction){
            subtraction.addEventListener("click", function(){
                self.removeFish(fishList);
                level--;
                if(level <= 0) level = 0;
                self.createFish(TestScene[level], fishList);
            }, false);
        }
        var rotate = document.getElementById("rotate");
        if(rotate){
            rotate.addEventListener("click", function(){
                self.removeFish(fishList);
                self.createFish(TestScene[level], fishList);
                self.rotate(fishList);
            }, false);
        }
        var move = document.getElementById("move");
        if(move){
            move.addEventListener("click", function(){
                self.removeFish(fishList);
                self.createFish(TestScene[level], fishList);
                self.move(fishList);
            }, false);
        }
        var scale = document.getElementById("scale");
        if(scale){
            scale.addEventListener("click", function(){
                self.removeFish(fishList);
                self.createFish(TestScene[level], fishList);
                self.scale(fishList);
            }, false);
        }
        var all = document.getElementById("all");
        if(all){
            all.addEventListener("click", function(){
                self.removeFish(fishList);
                self.createFish(TestScene[level], fishList);
                self.all(fishList);
            }, false);
        }

        self.createFish(TestScene[level], fishList);

    }
    /**
     * 创建鱼队列
     */
    private createFish(obj, arr):void{
        var a = obj.a;
        var b = obj.b;
        var imgs:egret.SpriteSheet = RES.getRes("fish");

        var totalNum = a*b;
        var info = document.getElementById("info");
        if(info){
            info.innerHTML = totalNum.toString();
        }

        for(var  i=0; i<totalNum; i++){
            var tmp:egret.Bitmap = new egret.Bitmap();
            tmp.texture = imgs.getTexture("fish1");
            this.addChild(tmp);
            tmp.x = (i % a) * 50;
            tmp.y = (i / a | 0) * 25;
            arr.push(tmp);
        }
    }
    private removeFish(arr):void{
        for(var i=0; i<arr.length; i++){
            this.removeChild(arr[i]);
        }
        arr.length = 0;
    }
    private rotate(arr):void{

        for(var i=0; i<arr.length; i++){
            var tw = egret.Tween.get(arr[i]);
            tw.to( {rotation:360}, 5000 );
        }
    }
    private move(arr):void{

        for(var i=0; i<arr.length; i++){
            var tw = egret.Tween.get(arr[i]);
            tw.to( {x:arr[i].x+50}, 5000 );
        }
    }
    private scale(arr):void{

        for(var i=0; i<arr.length; i++){
            var tw = egret.Tween.get(arr[i]);
            tw.to( {scaleX:2}, 5000 );
        }
    }
    private all(arr):void{

        for(var i=0; i<arr.length; i++){
            var tw = egret.Tween.get(arr[i]);
            tw.to( {rotation:360, x:arr[i].x+50, scaleX:2}, 5000 );
        }
    }
}


