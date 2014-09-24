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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Main.prototype.onAddToStage = function (event) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("preload");
    };

    /**
    * 创建游戏场景
    */
    Main.prototype.onGroupComp = function () {
        var TestScene = [
            { a: 10, b: 20 },
            { a: 15, b: 30 },
            { a: 20, b: 40 },
            { a: 25, b: 50 },
            { a: 30, b: 60 },
            { a: 35, b: 70 },
            { a: 40, b: 80 }
        ];

        //fish元素队列
        var fishList = [];

        var self = this;
        var level = 0;
        var addition = document.getElementById("addition");
        if (addition) {
            addition.addEventListener("click", function () {
                self.removeFish(fishList);
                level++;
                if (TestScene.length <= level)
                    level = TestScene.length - 1;
                self.createFish(TestScene[level], fishList);
            }, false);
        }
        var subtraction = document.getElementById("subtraction");
        if (subtraction) {
            subtraction.addEventListener("click", function () {
                self.removeFish(fishList);
                level--;
                if (level <= 0)
                    level = 0;
                self.createFish(TestScene[level], fishList);
            }, false);
        }
        var rotate = document.getElementById("rotate");
        if (rotate) {
            rotate.addEventListener("click", function () {
                self.removeFish(fishList);
                self.createFish(TestScene[level], fishList);
                self.rotate(fishList);
            }, false);
        }
        var move = document.getElementById("move");
        if (move) {
            move.addEventListener("click", function () {
                self.removeFish(fishList);
                self.createFish(TestScene[level], fishList);
                self.move(fishList);
            }, false);
        }
        var scale = document.getElementById("scale");
        if (scale) {
            scale.addEventListener("click", function () {
                self.removeFish(fishList);
                self.createFish(TestScene[level], fishList);
                self.scale(fishList);
            }, false);
        }
        var all = document.getElementById("all");
        if (all) {
            all.addEventListener("click", function () {
                self.removeFish(fishList);
                self.createFish(TestScene[level], fishList);
                self.all(fishList);
            }, false);
        }

        self.createFish(TestScene[level], fishList);
    };

    /**
    * 创建鱼队列
    */
    Main.prototype.createFish = function (obj, arr) {
        var a = obj.a;
        var b = obj.b;
        var imgs = RES.getRes("fish");

        var totalNum = a * b;
        var info = document.getElementById("info");
        if (info) {
            info.innerHTML = totalNum.toString();
        }

        for (var i = 0; i < totalNum; i++) {
            var tmp = new egret.Bitmap();
            tmp.texture = imgs.getTexture("fish1");
            this.addChild(tmp);
            tmp.x = (i % a) * 50;
            tmp.y = (i / a | 0) * 25;
            arr.push(tmp);
        }
    };
    Main.prototype.removeFish = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            this.removeChild(arr[i]);
        }
        arr.length = 0;
    };
    Main.prototype.rotate = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            var tw = egret.Tween.get(arr[i]);
            tw.to({ rotation: 360 }, 5000);
        }
    };
    Main.prototype.move = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            var tw = egret.Tween.get(arr[i]);
            tw.to({ x: arr[i].x + 50 }, 5000);
        }
    };
    Main.prototype.scale = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            var tw = egret.Tween.get(arr[i]);
            tw.to({ scaleX: 2 }, 5000);
        }
    };
    Main.prototype.all = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            var tw = egret.Tween.get(arr[i]);
            tw.to({ rotation: 360, x: arr[i].x + 50, scaleX: 2 }, 5000);
        }
    };
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
