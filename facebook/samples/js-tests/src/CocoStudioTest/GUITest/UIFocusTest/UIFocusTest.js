/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var UIFocusTestBase = UIBaseLayer.extend({
    ctor: function () {
        this._super();

        var _dpadMenu = cc.Menu.create();

        var winSize = cc.director.getWinSize();
        var leftItem = cc.MenuItemFont.create("Left", this.onLeftKeyPressed, this);
        leftItem.setPosition(cc.p(winSize.width - 100, winSize.height/2));
        _dpadMenu.addChild(leftItem);


        var rightItem = cc.MenuItemFont.create("Right", this.onRightKeyPressed, this);
        rightItem.setPosition(cc.p(winSize.width - 30, winSize.height/2));
        _dpadMenu.addChild(rightItem);

        var upItem = cc.MenuItemFont.create("Up", this.onUpKeyPressed, this);
        upItem.setPosition(cc.p(winSize.width - 60, winSize.height/2 + 50));
        _dpadMenu.addChild(upItem);

        var downItem = cc.MenuItemFont.create("Down", this.onDownKeyPressed, this);
        downItem.setPosition(cc.p(winSize.width - 60, winSize.height/2 - 50));
        _dpadMenu.addChild(downItem);

        _dpadMenu.setPosition(cc.p(0, 0));
        this.addChild(_dpadMenu);

        this._horizontalLayout = ccui.HBox.create();
        this._horizontalLayout.setPosition(cc.p(20, winSize.height/2 + 40));
        this.addChild(this._horizontalLayout);

        this._horizontalLayout.setFocused(true);
        this._horizontalLayout.setLoopFocus(true);
        this._horizontalLayout.setTag(100);
        this._firstFocusedWidget = this._horizontalLayout;

        var count = 3;
        for (var i=0; i<count; ++i) {
            var w = ccui.ImageView.create();
            w.loadTexture("res/cocosui/scrollviewbg.png");
            w.setTouchEnabled(true);
            w.setTag(i);
            w.setPosition(cc.p(150 + i*90, 0));
            w.addTouchEventListener(this.onImageViewClicked, this);
            this._horizontalLayout.addChild(w);
        }

        this._loopText = ccui.Text.create();
        this._loopText.attr({
            string: "loop enabled",
            font: "20px Arial"
        });
        this._loopText.setPosition(cc.p(winSize.width/2, winSize.height - 50));
        this._loopText.setColor(cc.color.GREEN);
        this.addChild(this._loopText);

        var btn = ccui.Button.create("res/cocosui/switch-mask.png");
        btn.setTitleText("Toggle Loop");
        btn.setPosition(cc.p(60, winSize.height - 50));
        btn.setTitleColor(cc.color.RED);
        btn.addTouchEventListener(this.toggleFocusLoop,this);
        this.addChild(btn);


    },
    onImageViewClicked: function(ref, touchType){
        if (touchType == cc.EventTouch.EventCode.ENDED) {
            var w = ref;
            if (w.isFocusEnabled()) {
                w.setFocusEnabled(false);
                w.setColor(cc.color.YELLOW);
            }else{
                w.setFocusEnabled(true);
                w.setColor(cc.color.WHITE);
            }
        }
    },
    toggleFocusLoop: function(pObjc, type){
        if (type == cc.EventTouch.EventCode.ENDED) {
            this._horizontalLayout.setLoopFocus(!this._horizontalLayout.isLoopFocus());
            if (this._horizontalLayout.isLoopFocus()) {
                this._loopText.setString("loop enabled");
            }else{
                this._loopText.setString("loop disabled");
            }
        }
    },
    onUpKeyPressed: function(){
        cc.eventManager.dispatchEvent(new cc.EventKeyboard(38, false))
    },
    onRightKeyPressed: function(){
        cc.eventManager.dispatchEvent(new cc.EventKeyboard(39, false))
    },
    onDownKeyPressed: function(){
        cc.eventManager.dispatchEvent(new cc.EventKeyboard(40, false))
    },
    onLeftKeyPressed: function(){
        cc.eventManager.dispatchEvent(new cc.EventKeyboard(37, false))
    }
});
