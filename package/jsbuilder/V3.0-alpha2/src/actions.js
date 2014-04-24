cc.ACTION_TAG_INVALID = -1;
cc.Action = cc.Class.extend({originalTarget: null, target: null, tag: cc.ACTION_TAG_INVALID, ctor: function () {
    this.originalTarget = null;
    this.target = null;
    this.tag = cc.ACTION_TAG_INVALID
}, copy: function () {
    return this.clone()
}, clone: function () {
    var action = new cc.Action;
    action.originalTarget = null;
    action.target = null;
    action.tag = this.tag;
    return action
}, isDone: function () {
    return true
}, startWithTarget: function (target) {
    this.originalTarget = target;
    this.target = target
}, stop: function () {
    this.target = null
}, step: function (dt) {
    cc.log("[Action step]. override me")
},
    update: function (time) {
        cc.log("[Action update]. override me")
    }, getTarget: function () {
        return this.target
    }, setTarget: function (target) {
        this.target = target
    }, getOriginalTarget: function () {
        return this.originalTarget
    }, setOriginalTarget: function (originalTarget) {
        this.originalTarget = originalTarget
    }, getTag: function () {
        return this.tag
    }, setTag: function (tag) {
        this.tag = tag
    }, retain: function () {
    }, release: function () {
    }});
cc.Action.create = function () {
    return new cc.Action
};
cc.FiniteTimeAction = cc.Action.extend({_duration: 0, ctor: function () {
    cc.Action.prototype.ctor.call(this);
    this._duration = 0
}, getDuration: function () {
    return this._duration
}, setDuration: function (duration) {
    this._duration = duration
}, reverse: function () {
    cc.log("cocos2d: FiniteTimeAction#reverse: Implement me");
    return null
}, clone: function () {
    return new cc.FiniteTimeAction
}});
cc.Speed = cc.Action.extend({_speed: 0, _innerAction: null, ctor: function (action, speed) {
    cc.Action.prototype.ctor.call(this);
    this._speed = 0;
    this._innerAction = null;
    action && this.initWithAction(action, speed)
}, getSpeed: function () {
    return this._speed
}, setSpeed: function (speed) {
    this._speed = speed
}, initWithAction: function (action, speed) {
    if (!action)throw"cc.Speed.initWithAction(): action must be non nil";
    this._innerAction = action;
    this._speed = speed;
    return true
}, clone: function () {
    var action = new cc.Speed;
    action.initWithAction(this._innerAction.clone(),
        this._speed);
    return action
}, startWithTarget: function (target) {
    cc.Action.prototype.startWithTarget.call(this, target);
    this._innerAction.startWithTarget(target)
}, stop: function () {
    this._innerAction.stop();
    cc.Action.prototype.stop.call(this)
}, step: function (dt) {
    this._innerAction.step(dt * this._speed)
}, isDone: function () {
    return this._innerAction.isDone()
}, reverse: function () {
    return cc.Speed.create(this._innerAction.reverse(), this._speed)
}, setInnerAction: function (action) {
    if (this._innerAction != action)this._innerAction =
        action
}, getInnerAction: function () {
    return this._innerAction
}});
cc.Speed.create = function (action, speed) {
    return new cc.Speed(action, speed)
};
cc.Follow = cc.Action.extend({_followedNode: null, _boundarySet: false, _boundaryFullyCovered: false, _halfScreenSize: null, _fullScreenSize: null, leftBoundary: 0, rightBoundary: 0, topBoundary: 0, bottomBoundary: 0, _worldRect: null, ctor: function (followedNode, rect) {
    cc.Action.prototype.ctor.call(this);
    this._followedNode = null;
    this._boundarySet = false;
    this._boundaryFullyCovered = false;
    this._halfScreenSize = null;
    this._fullScreenSize = null;
    this.leftBoundary = 0;
    this.rightBoundary = 0;
    this.topBoundary = 0;
    this.bottomBoundary = 0;
    this._worldRect =
        cc.rect(0, 0, 0, 0);
    if (followedNode)rect ? this.initWithTarget(followedNode, rect) : this.initWithTarget(followedNode)
}, clone: function () {
    var action = new cc.Follow;
    var locRect = this._worldRect;
    var rect = new cc.Rect(locRect.x, locRect.y, locRect.width, locRect.height);
    action.initWithTarget(this._followedNode, rect);
    return action
}, isBoundarySet: function () {
    return this._boundarySet
}, setBoudarySet: function (value) {
    this._boundarySet = value
}, initWithTarget: function (followedNode, rect) {
    if (!followedNode)throw"cc.Follow.initWithAction(): followedNode must be non nil";
    rect = rect || cc.rect(0, 0, 0, 0);
    this._followedNode = followedNode;
    this._worldRect = rect;
    this._boundarySet = !cc._rectEqualToZero(rect);
    this._boundaryFullyCovered = false;
    var winSize = cc.director.getWinSize();
    this._fullScreenSize = cc.p(winSize.width, winSize.height);
    this._halfScreenSize = cc.pMult(this._fullScreenSize, 0.5);
    if (this._boundarySet) {
        this.leftBoundary = -(rect.x + rect.width - this._fullScreenSize.x);
        this.rightBoundary = -rect.x;
        this.topBoundary = -rect.y;
        this.bottomBoundary = -(rect.y + rect.height - this._fullScreenSize.y);
        if (this.rightBoundary < this.leftBoundary)this.rightBoundary = this.leftBoundary = (this.leftBoundary + this.rightBoundary) / 2;
        if (this.topBoundary < this.bottomBoundary)this.topBoundary = this.bottomBoundary = (this.topBoundary + this.bottomBoundary) / 2;
        if (this.topBoundary == this.bottomBoundary && this.leftBoundary == this.rightBoundary)this._boundaryFullyCovered = true
    }
    return true
}, step: function (dt) {
    var tempPosX = this._followedNode.x;
    var tempPosY = this._followedNode.y;
    tempPosX = this._halfScreenSize.x - tempPosX;
    tempPosY = this._halfScreenSize.y -
        tempPosY;
    if (this._boundarySet) {
        if (this._boundaryFullyCovered)return;
        this.target.setPosition(cc.clampf(tempPosX, this.leftBoundary, this.rightBoundary), cc.clampf(tempPosY, this.bottomBoundary, this.topBoundary))
    } else this.target.setPosition(tempPosX, tempPosY)
}, isDone: function () {
    return!this._followedNode.running
}, stop: function () {
    this.target = null;
    cc.Action.prototype.stop.call(this)
}});
cc.Follow.create = function (followedNode, rect) {
    return new cc.Follow(followedNode, rect)
};
cc.ActionInterval = cc.FiniteTimeAction.extend({_elapsed: 0, _firstTick: false, ctor: function (d) {
    cc.FiniteTimeAction.prototype.ctor.call(this);
    d !== undefined && this.initWithDuration(d)
}, getElapsed: function () {
    return this._elapsed
}, initWithDuration: function (d) {
    this._duration = d === 0 ? cc.FLT_EPSILON : d;
    this._elapsed = 0;
    this._firstTick = true;
    return true
}, isDone: function () {
    return this._elapsed >= this._duration
}, clone: function () {
    return new cc.ActionInterval(this._duration)
}, step: function (dt) {
    if (this._firstTick) {
        this._firstTick =
            false;
        this._elapsed = 0
    } else this._elapsed += dt;
    var t = this._elapsed / (this._duration > 1.192092896E-7 ? this._duration : 1.192092896E-7);
    t = 1 > t ? t : 1;
    this.update(t > 0 ? t : 0)
}, startWithTarget: function (target) {
    cc.Action.prototype.startWithTarget.call(this, target);
    this._elapsed = 0;
    this._firstTick = true
}, reverse: function () {
    cc.log("cc.IntervalAction: reverse not implemented.");
    return null
}, setAmplitudeRate: function (amp) {
    cc.log("cc.ActionInterval.setAmplitudeRate(): it should be overridden in subclass.")
}, getAmplitudeRate: function () {
    cc.log("cc.ActionInterval.getAmplitudeRate(): it should be overridden in subclass.")
}});
cc.ActionInterval.create = function (d) {
    return new cc.ActionInterval(d)
};
cc.Sequence = cc.ActionInterval.extend({_actions: null, _split: null, _last: 0, ctor: function (tempArray) {
    cc.ActionInterval.prototype.ctor.call(this);
    this._actions = [];
    var paramArray = tempArray instanceof Array ? tempArray : arguments;
    var last = paramArray.length - 1;
    if (last >= 0 && paramArray[last] == null)cc.log("parameters should not be ending with null in Javascript");
    if (last >= 0) {
        var prev = paramArray[0], action1;
        for (var i = 1; i < last; i++)if (paramArray[i]) {
            action1 = prev;
            prev = cc.Sequence.create();
            prev.initWithTwoActions(action1,
                paramArray[i])
        }
        this.initWithTwoActions(prev, paramArray[last])
    }
}, initWithTwoActions: function (actionOne, actionTwo) {
    if (!actionOne || !actionTwo)throw"cc.Sequence.initWithTwoActions(): arguments must all be non nil";
    var d = actionOne.getDuration() + actionTwo.getDuration();
    this.initWithDuration(d);
    this._actions[0] = actionOne;
    this._actions[1] = actionTwo;
    return true
}, clone: function () {
    var action = new cc.Sequence;
    action.initWithTwoActions(this._actions[0].clone(), this._actions[1].clone());
    return action
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this,
        target);
    this._split = this._actions[0].getDuration() / this._duration;
    this._last = -1
}, stop: function () {
    if (this._last !== -1)this._actions[this._last].stop();
    cc.Action.prototype.stop.call(this)
}, update: function (time) {
    var new_t, found = 0;
    var locSplit = this._split, locActions = this._actions, locLast = this._last;
    if (time < locSplit) {
        new_t = locSplit !== 0 ? time / locSplit : 1;
        if (found === 0 && locLast === 1) {
            locActions[1].update(0);
            locActions[1].stop()
        }
    } else {
        found = 1;
        new_t = locSplit === 1 ? 1 : (time - locSplit) / (1 - locSplit);
        if (locLast === -1) {
            locActions[0].startWithTarget(this.target);
            locActions[0].update(1);
            locActions[0].stop()
        }
        if (!locLast) {
            locActions[0].update(1);
            locActions[0].stop()
        }
    }
    if (locLast === found && locActions[found].isDone())return;
    if (locLast !== found)locActions[found].startWithTarget(this.target);
    locActions[found].update(new_t);
    this._last = found
}, reverse: function () {
    return cc.Sequence._actionOneTwo(this._actions[1].reverse(), this._actions[0].reverse())
}, copy: function () {
    return this.clone()
}});
cc.Sequence.create = function (tempArray) {
    var paramArray = tempArray instanceof Array ? tempArray : arguments;
    if (paramArray.length > 0 && paramArray[paramArray.length - 1] == null)cc.log("parameters should not be ending with null in Javascript");
    var prev = paramArray[0];
    for (var i = 1; i < paramArray.length; i++)if (paramArray[i])prev = cc.Sequence._actionOneTwo(prev, paramArray[i]);
    return prev
};
cc.Sequence._actionOneTwo = function (actionOne, actionTwo) {
    var sequence = new cc.Sequence;
    sequence.initWithTwoActions(actionOne, actionTwo);
    return sequence
};
cc.Repeat = cc.ActionInterval.extend({_times: 0, _total: 0, _nextDt: 0, _actionInstant: false, _innerAction: null, ctor: function (action, times) {
    cc.ActionInterval.prototype.ctor.call(this);
    times !== undefined && this.initWithAction(action, times)
}, initWithAction: function (action, times) {
    var duration = action.getDuration() * times;
    if (this.initWithDuration(duration)) {
        this._times = times;
        this._innerAction = action;
        if (action instanceof cc.ActionInstant)this._times -= 1;
        this._total = 0;
        return true
    }
    return false
}, clone: function () {
    var action =
        new cc.Repeat;
    action.initWithAction(this._innerAction.clone(), this._times);
    return action
}, startWithTarget: function (target) {
    this._total = 0;
    this._nextDt = this._innerAction.getDuration() / this._duration;
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._innerAction.startWithTarget(target)
}, stop: function () {
    this._innerAction.stop();
    cc.Action.prototype.stop.call(this)
}, update: function (time) {
    var locInnerAction = this._innerAction;
    var locDuration = this._duration;
    var locTimes = this._times;
    var locNextDt =
        this._nextDt;
    if (time >= locNextDt) {
        while (time > locNextDt && this._total < locTimes) {
            locInnerAction.update(1);
            this._total++;
            locInnerAction.stop();
            locInnerAction.startWithTarget(this.target);
            locNextDt += locInnerAction.getDuration() / locDuration;
            this._nextDt = locNextDt
        }
        if (time >= 1 && this._total < locTimes)this._total++;
        if (this._actionInstant)if (this._total == locTimes) {
            locInnerAction.update(1);
            locInnerAction.stop()
        } else locInnerAction.update(time - (locNextDt - locInnerAction.getDuration() / locDuration))
    } else locInnerAction.update(time *
        locTimes % 1)
}, isDone: function () {
    return this._total == this._times
}, reverse: function () {
    return cc.Repeat.create(this._innerAction.reverse(), this._times)
}, setInnerAction: function (action) {
    if (this._innerAction != action)this._innerAction = action
}, getInnerAction: function () {
    return this._innerAction
}});
cc.Repeat.create = function (action, times) {
    return new cc.Repeat(action, times)
};
cc.RepeatForever = cc.ActionInterval.extend({_innerAction: null, ctor: function (action) {
    cc.ActionInterval.prototype.ctor.call(this);
    this._innerAction = null;
    action && this.initWithAction(action)
}, initWithAction: function (action) {
    if (!action)throw"cc.RepeatForever.initWithAction(): action must be non null";
    this._innerAction = action;
    return true
}, clone: function () {
    var action = new cc.RepeatForever;
    action.initWithAction(this._innerAction.clone());
    return action
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this,
        target);
    this._innerAction.startWithTarget(target)
}, step: function (dt) {
    var locInnerAction = this._innerAction;
    locInnerAction.step(dt);
    if (locInnerAction.isDone()) {
        locInnerAction.startWithTarget(this.target);
        locInnerAction.step(locInnerAction.getElapsed() - locInnerAction.getDuration())
    }
}, isDone: function () {
    return false
}, reverse: function () {
    return cc.RepeatForever.create(this._innerAction.reverse())
}, setInnerAction: function (action) {
    if (this._innerAction != action)this._innerAction = action
}, getInnerAction: function () {
    return this._innerAction
}});
cc.RepeatForever.create = function (action) {
    return new cc.RepeatForever(action)
};
cc.Spawn = cc.ActionInterval.extend({_one: null, _two: null, ctor: function (tempArray) {
    cc.ActionInterval.prototype.ctor.call(this);
    this._one = null;
    this._two = null;
    var paramArray = tempArray instanceof Array ? tempArray : arguments;
    var last = paramArray.length - 1;
    if (last >= 0 && paramArray[last] == null)cc.log("parameters should not be ending with null in Javascript");
    if (last >= 0) {
        var prev = paramArray[0], action1;
        for (var i = 1; i < last; i++)if (paramArray[i]) {
            action1 = prev;
            prev = cc.Spwan.create();
            prev.initWithTwoActions(action1, paramArray[i])
        }
        this.initWithTwoActions(prev,
            paramArray[last])
    }
}, initWithTwoActions: function (action1, action2) {
    if (!action1 || !action2)throw"cc.Spawn.initWithTwoActions(): arguments must all be non null";
    var ret = false;
    var d1 = action1.getDuration();
    var d2 = action2.getDuration();
    if (this.initWithDuration(Math.max(d1, d2))) {
        this._one = action1;
        this._two = action2;
        if (d1 > d2)this._two = cc.Sequence._actionOneTwo(action2, cc.DelayTime.create(d1 - d2)); else if (d1 < d2)this._one = cc.Sequence._actionOneTwo(action1, cc.DelayTime.create(d2 - d1));
        ret = true
    }
    return ret
}, clone: function () {
    var action =
        new cc.Spawn;
    action.initWithTwoActions(this._one.clone(), this._two.clone());
    return action
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._one.startWithTarget(target);
    this._two.startWithTarget(target)
}, stop: function () {
    this._one.stop();
    this._two.stop();
    cc.Action.prototype.stop.call(this)
}, update: function (time) {
    if (this._one)this._one.update(time);
    if (this._two)this._two.update(time)
}, reverse: function () {
    return cc.Spawn._actionOneTwo(this._one.reverse(),
        this._two.reverse())
}});
cc.Spawn.create = function (tempArray) {
    var paramArray = tempArray instanceof Array ? tempArray : arguments;
    if (paramArray.length > 0 && paramArray[paramArray.length - 1] == null)cc.log("parameters should not be ending with null in Javascript");
    var prev = paramArray[0];
    for (var i = 1; i < paramArray.length; i++)if (paramArray[i] != null)prev = this._actionOneTwo(prev, paramArray[i]);
    return prev
};
cc.Spawn._actionOneTwo = function (action1, action2) {
    var pSpawn = new cc.Spawn;
    pSpawn.initWithTwoActions(action1, action2);
    return pSpawn
};
cc.RotateTo = cc.ActionInterval.extend({_dstAngleX: 0, _startAngleX: 0, _diffAngleX: 0, _dstAngleY: 0, _startAngleY: 0, _diffAngleY: 0, ctor: function (duration, deltaAngleX, deltaAngleY) {
    cc.ActionInterval.prototype.ctor.call(this);
    deltaAngleX !== undefined && this.initWithDuration(duration, deltaAngleX, deltaAngleY)
}, initWithDuration: function (duration, deltaAngleX, deltaAngleY) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
        this._dstAngleX = deltaAngleX || 0;
        this._dstAngleY = deltaAngleY || this._dstAngleX;
        return true
    }
    return false
}, clone: function () {
    var action = new cc.RotateTo;
    action.initWithDuration(this._duration, this._dstAngleX, this._dstAngleY);
    return action
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    var locStartAngleX = target.rotationX % 360;
    var locDiffAngleX = this._dstAngleX - locStartAngleX;
    if (locDiffAngleX > 180)locDiffAngleX -= 360;
    if (locDiffAngleX < -180)locDiffAngleX += 360;
    this._startAngleX = locStartAngleX;
    this._diffAngleX = locDiffAngleX;
    this._startAngleY =
        target.rotationY % 360;
    var locDiffAngleY = this._dstAngleY - this._startAngleY;
    if (locDiffAngleY > 180)locDiffAngleY -= 360;
    if (locDiffAngleY < -180)locDiffAngleY += 360;
    this._diffAngleY = locDiffAngleY
}, reverse: function () {
    cc.log("cc.RotateTo.reverse(): it should be overridden in subclass.")
}, update: function (time) {
    if (this.target) {
        this.target.rotationX = this._startAngleX + this._diffAngleX * time;
        this.target.rotationY = this._startAngleY + this._diffAngleY * time
    }
}});
cc.RotateTo.create = function (duration, deltaAngleX, deltaAngleY) {
    return new cc.RotateTo(duration, deltaAngleX, deltaAngleY)
};
cc.RotateBy = cc.ActionInterval.extend({_angleX: 0, _startAngleX: 0, _angleY: 0, _startAngleY: 0, ctor: function (duration, deltaAngleX, deltaAngleY) {
    cc.ActionInterval.prototype.ctor.call(this);
    deltaAngleX !== undefined && this.initWithDuration(duration, deltaAngleX, deltaAngleY)
}, initWithDuration: function (duration, deltaAngleX, deltaAngleY) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
        this._angleX = deltaAngleX || 0;
        this._angleY = deltaAngleY || this._angleX;
        return true
    }
    return false
}, clone: function () {
    var action =
        new cc.RotateBy;
    action.initWithDuration(this._duration, this._angleX, this._angleY);
    return action
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._startAngleX = target.rotationX;
    this._startAngleY = target.rotationY
}, update: function (time) {
    if (this.target) {
        this.target.rotationX = this._startAngleX + this._angleX * time;
        this.target.rotationY = this._startAngleY + this._angleY * time
    }
}, reverse: function () {
    return cc.RotateBy.create(this._duration, -this._angleX, -this._angleY)
}});
cc.RotateBy.create = function (duration, deltaAngleX, deltaAngleY) {
    var rotateBy = new cc.RotateBy;
    rotateBy.initWithDuration(duration, deltaAngleX, deltaAngleY);
    return rotateBy
};
cc.MoveBy = cc.ActionInterval.extend({_positionDelta: null, _startPosition: null, _previousPosition: null, ctor: function (duration, deltaPos, deltaY) {
    cc.ActionInterval.prototype.ctor.call(this);
    this._positionDelta = cc.p(0, 0);
    this._startPosition = cc.p(0, 0);
    this._previousPosition = cc.p(0, 0);
    deltaPos !== undefined && this.initWithDuration(duration, deltaPos, deltaY)
}, initWithDuration: function (duration, position, y) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
        if (position.x !== undefined) {
            y = position.y;
            position = position.x
        }
        this._positionDelta.x = position;
        this._positionDelta.y = y;
        return true
    }
    return false
}, clone: function () {
    var action = new cc.MoveBy;
    action.initWithDuration(this._duration, this._positionDelta);
    return action
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    var locPosX = target.getPositionX();
    var locPosY = target.getPositionY();
    this._previousPosition.x = locPosX;
    this._previousPosition.y = locPosY;
    this._startPosition.x = locPosX;
    this._startPosition.y = locPosY
},
    update: function (time) {
        if (this.target) {
            var x = this._positionDelta.x * time;
            var y = this._positionDelta.y * time;
            var locStartPosition = this._startPosition;
            if (cc.ENABLE_STACKABLE_ACTIONS) {
                var targetX = this.target.getPositionX();
                var targetY = this.target.getPositionY();
                var locPreviousPosition = this._previousPosition;
                locStartPosition.x = locStartPosition.x + targetX - locPreviousPosition.x;
                locStartPosition.y = locStartPosition.y + targetY - locPreviousPosition.y;
                x = x + locStartPosition.x;
                y = y + locStartPosition.y;
                locPreviousPosition.x =
                    x;
                locPreviousPosition.y = y;
                this.target.setPosition(x, y)
            } else this.target.setPosition(locStartPosition.x + x, locStartPosition.y + y)
        }
    }, reverse: function () {
        return cc.MoveBy.create(this._duration, cc.p(-this._positionDelta.x, -this._positionDelta.y))
    }});
cc.MoveBy.create = function (duration, deltaPos, deltaY) {
    return new cc.MoveBy(duration, deltaPos, deltaY)
};
cc.MoveTo = cc.MoveBy.extend({_endPosition: null, ctor: function (duration, position, y) {
    cc.MoveBy.prototype.ctor.call(this);
    this._endPosition = cc.p(0, 0);
    position !== undefined && this.initWithDuration(duration, position, y)
}, initWithDuration: function (duration, position, y) {
    if (cc.MoveBy.prototype.initWithDuration.call(this, duration, position, y)) {
        if (position.x !== undefined) {
            y = position.y;
            position = position.x
        }
        this._endPosition.x = position;
        this._endPosition.y = y;
        return true
    }
    return false
}, clone: function () {
    var action = new cc.MoveTo;
    action.initWithDuration(this._duration, this._endPosition);
    return action
}, startWithTarget: function (target) {
    cc.MoveBy.prototype.startWithTarget.call(this, target);
    this._positionDelta.x = this._endPosition.x - target.getPositionX();
    this._positionDelta.y = this._endPosition.y - target.getPositionY()
}});
cc.MoveTo.create = function (duration, position, y) {
    return new cc.MoveTo(duration, position, y)
};
cc.SkewTo = cc.ActionInterval.extend({_skewX: 0, _skewY: 0, _startSkewX: 0, _startSkewY: 0, _endSkewX: 0, _endSkewY: 0, _deltaX: 0, _deltaY: 0, ctor: function (t, sx, sy) {
    cc.ActionInterval.prototype.ctor.call(this);
    sy !== undefined && this.initWithDuration(t, sx, sy)
}, initWithDuration: function (t, sx, sy) {
    var ret = false;
    if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
        this._endSkewX = sx;
        this._endSkewY = sy;
        ret = true
    }
    return ret
}, clone: function () {
    var action = new cc.SkewTo;
    action.initWithDuration(this._duration, this._endSkewX,
        this._endSkewY);
    return action
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._startSkewX = target.skewX % 180;
    this._deltaX = this._endSkewX - this._startSkewX;
    if (this._deltaX > 180)this._deltaX -= 360;
    if (this._deltaX < -180)this._deltaX += 360;
    this._startSkewY = target.skewY % 360;
    this._deltaY = this._endSkewY - this._startSkewY;
    if (this._deltaY > 180)this._deltaY -= 360;
    if (this._deltaY < -180)this._deltaY += 360
}, update: function (t) {
    this.target.skewX = this._startSkewX + this._deltaX *
        t;
    this.target.skewY = this._startSkewY + this._deltaY * t
}});
cc.SkewTo.create = function (t, sx, sy) {
    return new cc.SkewTo(t, sx, sy)
};
cc.SkewBy = cc.SkewTo.extend({ctor: function (t, sx, sy) {
    cc.SkewTo.prototype.ctor.call(this);
    sy !== undefined && this.initWithDuration(t, sx, sy)
}, initWithDuration: function (t, deltaSkewX, deltaSkewY) {
    var ret = false;
    if (cc.SkewTo.prototype.initWithDuration.call(this, t, deltaSkewX, deltaSkewY)) {
        this._skewX = deltaSkewX;
        this._skewY = deltaSkewY;
        ret = true
    }
    return ret
}, clone: function () {
    var action = new cc.SkewBy;
    action.initWithDuration(this._duration, this._skewX, this._skewY);
    return action
}, startWithTarget: function (target) {
    cc.SkewTo.prototype.startWithTarget.call(this,
        target);
    this._deltaX = this._skewX;
    this._deltaY = this._skewY;
    this._endSkewX = this._startSkewX + this._deltaX;
    this._endSkewY = this._startSkewY + this._deltaY
}, reverse: function () {
    return cc.SkewBy.create(this._duration, -this._skewX, -this._skewY)
}});
cc.SkewBy.create = function (t, sx, sy) {
    var skewBy = new cc.SkewBy;
    if (skewBy)skewBy.initWithDuration(t, sx, sy);
    return skewBy
};
cc.JumpBy = cc.ActionInterval.extend({_startPosition: null, _delta: null, _height: 0, _jumps: 0, _previousPosition: null, ctor: function (duration, position, y, height, jumps) {
    cc.ActionInterval.prototype.ctor.call(this);
    this._startPosition = cc.p(0, 0);
    this._previousPosition = cc.p(0, 0);
    this._delta = cc.p(0, 0);
    height !== undefined && this.initWithDuration(duration, position, y, height, jumps)
}, initWithDuration: function (duration, position, y, height, jumps) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
        if (jumps ===
            undefined) {
            jumps = height;
            height = y;
            y = position.y;
            position = position.x
        }
        this._delta.x = position;
        this._delta.y = y;
        this._height = height;
        this._jumps = jumps;
        return true
    }
    return false
}, clone: function () {
    var action = new cc.JumpBy;
    action.initWithDuration(this._duration, this._delta, this._height, this._jumps);
    return action
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    var locPosX = target.getPositionX();
    var locPosY = target.getPositionY();
    this._previousPosition.x = locPosX;
    this._previousPosition.y =
        locPosY;
    this._startPosition.x = locPosX;
    this._startPosition.y = locPosY
}, update: function (time) {
    if (this.target) {
        var frac = time * this._jumps % 1;
        var y = this._height * 4 * frac * (1 - frac);
        y += this._delta.y * time;
        var x = this._delta.x * time;
        var locStartPosition = this._startPosition;
        if (cc.ENABLE_STACKABLE_ACTIONS) {
            var targetX = this.target.getPositionX();
            var targetY = this.target.getPositionY();
            var locPreviousPosition = this._previousPosition;
            locStartPosition.x = locStartPosition.x + targetX - locPreviousPosition.x;
            locStartPosition.y =
                locStartPosition.y + targetY - locPreviousPosition.y;
            x = x + locStartPosition.x;
            y = y + locStartPosition.y;
            locPreviousPosition.x = x;
            locPreviousPosition.y = y;
            this.target.setPosition(x, y)
        } else this.target.setPosition(locStartPosition.x + x, locStartPosition.y + y)
    }
}, reverse: function () {
    return cc.JumpBy.create(this._duration, cc.p(-this._delta.x, -this._delta.y), this._height, this._jumps)
}});
cc.JumpBy.create = function (duration, position, y, height, jumps) {
    return new cc.JumpBy(duration, position, y, height, jumps)
};
cc.JumpTo = cc.JumpBy.extend({startWithTarget: function (target) {
    cc.JumpBy.prototype.startWithTarget.call(this, target);
    this._delta.x = this._delta.x - this._startPosition.x;
    this._delta.y = this._delta.y - this._startPosition.y
}, clone: function () {
    var action = new cc.JumpTo;
    action.initWithDuration(this._duration, this._delta, this._height, this._jumps);
    return action
}});
cc.JumpTo.create = function (duration, position, y, height, jumps) {
    return new cc.JumpTo(duration, position, y, height, jumps)
};
cc.bezierAt = function (a, b, c, d, t) {
    return Math.pow(1 - t, 3) * a + 3 * t * Math.pow(1 - t, 2) * b + 3 * Math.pow(t, 2) * (1 - t) * c + Math.pow(t, 3) * d
};
cc.BezierBy = cc.ActionInterval.extend({_config: null, _startPosition: null, _previousPosition: null, ctor: function (t, c) {
    cc.ActionInterval.prototype.ctor.call(this);
    this._config = [];
    this._startPosition = cc.p(0, 0);
    this._previousPosition = cc.p(0, 0);
    c && this.initWithDuration(t, c)
}, initWithDuration: function (t, c) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
        this._config = c;
        return true
    }
    return false
}, clone: function () {
    var action = new cc.BezierBy;
    var newConfigs = [];
    for (var i = 0; i < this._config.length; i++) {
        var selConf =
            this._config[i];
        newConfigs.push(cc.p(selConf.x, selConf.y))
    }
    action.initWithDuration(this._duration, newConfigs);
    return action
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    var locPosX = target.getPositionX();
    var locPosY = target.getPositionY();
    this._previousPosition.x = locPosX;
    this._previousPosition.y = locPosY;
    this._startPosition.x = locPosX;
    this._startPosition.y = locPosY
}, update: function (time) {
    if (this.target) {
        var locConfig = this._config;
        var xa = 0;
        var xb = locConfig[0].x;
        var xc = locConfig[1].x;
        var xd = locConfig[2].x;
        var ya = 0;
        var yb = locConfig[0].y;
        var yc = locConfig[1].y;
        var yd = locConfig[2].y;
        var x = cc.bezierAt(xa, xb, xc, xd, time);
        var y = cc.bezierAt(ya, yb, yc, yd, time);
        var locStartPosition = this._startPosition;
        if (cc.ENABLE_STACKABLE_ACTIONS) {
            var targetX = this.target.getPositionX();
            var targetY = this.target.getPositionY();
            var locPreviousPosition = this._previousPosition;
            locStartPosition.x = locStartPosition.x + targetX - locPreviousPosition.x;
            locStartPosition.y = locStartPosition.y + targetY -
                locPreviousPosition.y;
            x = x + locStartPosition.x;
            y = y + locStartPosition.y;
            locPreviousPosition.x = x;
            locPreviousPosition.y = y;
            this.target.setPosition(x, y)
        } else this.target.setPosition(locStartPosition.x + x, locStartPosition.y + y)
    }
}, reverse: function () {
    var locConfig = this._config;
    var r = [cc.pAdd(locConfig[1], cc.pNeg(locConfig[2])), cc.pAdd(locConfig[0], cc.pNeg(locConfig[2])), cc.pNeg(locConfig[2])];
    return cc.BezierBy.create(this._duration, r)
}});
cc.BezierBy.create = function (t, c) {
    return new cc.BezierBy(t, c)
};
cc.BezierTo = cc.BezierBy.extend({_toConfig: null, ctor: function (t, c) {
    cc.BezierBy.prototype.ctor.call(this);
    this._toConfig = [];
    c && this.initWithDuration(t, c)
}, initWithDuration: function (t, c) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
        this._toConfig = c;
        return true
    }
    return false
}, clone: function () {
    var action = new cc.BezierTo;
    action.initWithDuration(this._duration, this._toConfig);
    return action
}, startWithTarget: function (target) {
    cc.BezierBy.prototype.startWithTarget.call(this, target);
    var locStartPos =
        this._startPosition;
    var locToConfig = this._toConfig;
    var locConfig = this._config;
    locConfig[0] = cc.pSub(locToConfig[0], locStartPos);
    locConfig[1] = cc.pSub(locToConfig[1], locStartPos);
    locConfig[2] = cc.pSub(locToConfig[2], locStartPos)
}});
cc.BezierTo.create = function (t, c) {
    return new cc.BezierTo(t, c)
};
cc.ScaleTo = cc.ActionInterval.extend({_scaleX: 1, _scaleY: 1, _startScaleX: 1, _startScaleY: 1, _endScaleX: 0, _endScaleY: 0, _deltaX: 0, _deltaY: 0, ctor: function (duration, sx, sy) {
    cc.ActionInterval.prototype.ctor.call(this);
    sx !== undefined && this.initWithDuration(duration, sx, sy)
}, initWithDuration: function (duration, sx, sy) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
        this._endScaleX = sx;
        this._endScaleY = sy != null ? sy : sx;
        return true
    }
    return false
}, clone: function () {
    var action = new cc.ScaleTo;
    action.initWithDuration(this._duration,
        this._endScaleX, this._endScaleY);
    return action
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._startScaleX = target.scaleX;
    this._startScaleY = target.scaleY;
    this._deltaX = this._endScaleX - this._startScaleX;
    this._deltaY = this._endScaleY - this._startScaleY
}, update: function (time) {
    if (this.target) {
        this.target.scaleX = this._startScaleX + this._deltaX * time;
        this.target.scaleY = this._startScaleY + this._deltaY * time
    }
}});
cc.ScaleTo.create = function (duration, sx, sy) {
    var scaleTo = new cc.ScaleTo;
    scaleTo.initWithDuration(duration, sx, sy);
    return scaleTo
};
cc.ScaleBy = cc.ScaleTo.extend({startWithTarget: function (target) {
    cc.ScaleTo.prototype.startWithTarget.call(this, target);
    this._deltaX = this._startScaleX * this._endScaleX - this._startScaleX;
    this._deltaY = this._startScaleY * this._endScaleY - this._startScaleY
}, reverse: function () {
    return cc.ScaleBy.create(this._duration, 1 / this._endScaleX, 1 / this._endScaleY)
}, clone: function () {
    var action = new cc.ScaleBy;
    action.initWithDuration(this._duration, this._endScaleX, this._endScaleY);
    return action
}});
cc.ScaleBy.create = function (duration, sx, sy) {
    return new cc.ScaleBy(duration, sx, sy)
};
cc.Blink = cc.ActionInterval.extend({_times: 0, _originalState: false, ctor: function (duration, blinks) {
    cc.ActionInterval.prototype.ctor.call(this);
    blinks !== undefined && this.initWithDuration(duration, blinks)
}, initWithDuration: function (duration, blinks) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
        this._times = blinks;
        return true
    }
    return false
}, clone: function () {
    var action = new cc.Blink;
    action.initWithDuration(this._duration, this._times);
    return action
}, update: function (time) {
    if (this.target && !this.isDone()) {
        var slice = 1 / this._times;
        var m = time % slice;
        this.target.visible = m > slice / 2
    }
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._originalState = target.visible
}, stop: function () {
    this.target.visible = this._originalState;
    cc.ActionInterval.prototype.stop.call(this)
}, reverse: function () {
    return cc.Blink.create(this._duration, this._times)
}});
cc.Blink.create = function (duration, blinks) {
    var blink = new cc.Blink;
    blink.initWithDuration(duration, blinks);
    return blink
};
cc.FadeTo = cc.ActionInterval.extend({_toOpacity: 0, _fromOpacity: 0, ctor: function (duration, opacity) {
    cc.ActionInterval.prototype.ctor.call(this);
    opacity !== undefined && this.initWithDuration(duration, opacity)
}, initWithDuration: function (duration, opacity) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
        this._toOpacity = opacity;
        return true
    }
    return false
}, clone: function () {
    var action = new cc.FadeTo;
    action.initWithDuration(this._duration, this._toOpacity);
    return action
}, update: function (time) {
    if (this.target.RGBAProtocol) {
        var fromOpacity =
            this._fromOpacity;
        this.target.opacity = fromOpacity + (this._toOpacity - fromOpacity) * time
    }
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    if (this.target.RGBAProtocol)this._fromOpacity = target.opacity
}});
cc.FadeTo.create = function (duration, opacity) {
    return new cc.FadeTo(duration, opacity)
};
cc.FadeIn = cc.FadeTo.extend({_reverseAction: null, reverse: function () {
    var action = new cc.FadeOut;
    action.initWithDuration(this._duration, 0);
    return action
}, clone: function () {
    var action = new cc.FadeIn;
    action.initWithDuration(this._duration, this._toOpacity);
    return action
}, startWithTarget: function (target) {
    if (this._reverseAction)this._toOpacity = this._reverseAction._fromOpacity;
    cc.FadeTo.prototype.startWithTarget.call(this, target)
}});
cc.FadeIn.create = function (duration, toOpacity) {
    if (toOpacity == null)toOpacity = 255;
    return new cc.FadeIn(duration, toOpacity)
};
cc.FadeOut = cc.FadeTo.extend({reverse: function () {
    var action = new cc.FadeIn;
    action._reverseAction = this;
    action.initWithDuration(this._duration, 255);
    return action
}, clone: function () {
    var action = new cc.FadeOut;
    action.initWithDuration(this._duration, this._toOpacity);
    return action
}});
cc.FadeOut.create = function (d) {
    var action = new cc.FadeOut;
    action.initWithDuration(d, 0);
    return action
};
cc.TintTo = cc.ActionInterval.extend({_to: null, _from: null, ctor: function (duration, red, green, blue) {
    cc.ActionInterval.prototype.ctor.call(this);
    this._to = cc.color(0, 0, 0);
    this._from = cc.color(0, 0, 0);
    blue !== undefined && this.initWithDuration(duration, red, green, blue)
}, initWithDuration: function (duration, red, green, blue) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
        this._to = cc.color(red, green, blue);
        return true
    }
    return false
}, clone: function () {
    var action = new cc.TintTo;
    var locTo = this._to;
    action.initWithDuration(this._duration,
        locTo.r, locTo.g, locTo.b);
    return action
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    if (this.target.RGBAProtocol)this._from = this.target.color
}, update: function (time) {
    var locFrom = this._from, locTo = this._to;
    if (this.target.RGBAProtocol)this.target.color = cc.color(locFrom.r + (locTo.r - locFrom.r) * time, locFrom.g + (locTo.g - locFrom.g) * time, locFrom.b + (locTo.b - locFrom.b) * time)
}});
cc.TintTo.create = function (duration, red, green, blue) {
    return new cc.TintTo(duration, red, green, blue)
};
cc.TintBy = cc.ActionInterval.extend({_deltaR: 0, _deltaG: 0, _deltaB: 0, _fromR: 0, _fromG: 0, _fromB: 0, ctor: function (duration, deltaRed, deltaGreen, deltaBlue) {
    cc.ActionInterval.prototype.ctor.call(this);
    deltaBlue !== undefined && this.initWithDuration(duration, deltaRed, deltaGreen, deltaBlue)
}, initWithDuration: function (duration, deltaRed, deltaGreen, deltaBlue) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
        this._deltaR = deltaRed;
        this._deltaG = deltaGreen;
        this._deltaB = deltaBlue;
        return true
    }
    return false
},
    clone: function () {
        var action = new cc.TintBy;
        action.initWithDuration(this._duration, this._deltaR, this._deltaG, this._deltaB);
        return action
    }, startWithTarget: function (target) {
        cc.ActionInterval.prototype.startWithTarget.call(this, target);
        if (target.RGBAProtocol) {
            var color = target.color;
            this._fromR = color.r;
            this._fromG = color.g;
            this._fromB = color.b
        }
    }, update: function (time) {
        if (this.target.RGBAProtocol)this.target.color = cc.color(this._fromR + this._deltaR * time, this._fromG + this._deltaG * time, this._fromB + this._deltaB *
            time)
    }, reverse: function () {
        return cc.TintBy.create(this._duration, -this._deltaR, -this._deltaG, -this._deltaB)
    }});
cc.TintBy.create = function (duration, deltaRed, deltaGreen, deltaBlue) {
    return new cc.TintBy(duration, deltaRed, deltaGreen, deltaBlue)
};
cc.DelayTime = cc.ActionInterval.extend({update: function (time) {
}, reverse: function () {
    return cc.DelayTime.create(this._duration)
}, clone: function () {
    var action = new cc.DelayTime;
    action.initWithDuration(this._duration);
    return action
}});
cc.DelayTime.create = function (d) {
    return new cc.DelayTime(d)
};
cc.ReverseTime = cc.ActionInterval.extend({_other: null, ctor: function (action) {
    cc.ActionInterval.prototype.ctor.call(this);
    this._other = null;
    action && this.initWithAction(action)
}, initWithAction: function (action) {
    if (!action)throw"cc.ReverseTime.initWithAction(): action must be non null";
    if (action == this._other)throw"cc.ReverseTime.initWithAction(): the action was already passed in.";
    if (cc.ActionInterval.prototype.initWithDuration.call(this, action.getDuration())) {
        this._other = action;
        return true
    }
    return false
},
    clone: function () {
        var action = new cc.ReverseTime;
        action.initWithAction(this._other.clone());
        return action
    }, startWithTarget: function (target) {
        cc.ActionInterval.prototype.startWithTarget.call(this, target);
        this._other.startWithTarget(target)
    }, update: function (time) {
        if (this._other)this._other.update(1 - time)
    }, reverse: function () {
        return this._other.clone()
    }, stop: function () {
        this._other.stop();
        cc.Action.prototype.stop.call(this)
    }});
cc.ReverseTime.create = function (action) {
    return new cc.ReverseTime(action)
};
cc.Animate = cc.ActionInterval.extend({_animation: null, _nextFrame: 0, _origFrame: null, _executedLoops: 0, _splitTimes: null, ctor: function (animation) {
    cc.ActionInterval.prototype.ctor.call(this);
    this._splitTimes = [];
    animation && this.initWithAnimation(animation)
}, getAnimation: function () {
    return this._animation
}, setAnimation: function (animation) {
    this._animation = animation
}, initWithAnimation: function (animation) {
    if (!animation)throw"cc.Animate.initWithAnimation(): animation must be non-NULL";
    var singleDuration = animation.getDuration();
    if (this.initWithDuration(singleDuration * animation.getLoops())) {
        this._nextFrame = 0;
        this.setAnimation(animation);
        this._origFrame = null;
        this._executedLoops = 0;
        var locTimes = this._splitTimes;
        locTimes.length = 0;
        var accumUnitsOfTime = 0;
        var newUnitOfTimeValue = singleDuration / animation.getTotalDelayUnits();
        var frames = animation.getFrames();
        cc.arrayVerifyType(frames, cc.AnimationFrame);
        for (var i = 0; i < frames.length; i++) {
            var frame = frames[i];
            var value = accumUnitsOfTime * newUnitOfTimeValue / singleDuration;
            accumUnitsOfTime +=
                frame.getDelayUnits();
            locTimes.push(value)
        }
        return true
    }
    return false
}, clone: function () {
    var action = new cc.Animate;
    action.initWithAnimation(this._animation.clone());
    return action
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    if (this._animation.getRestoreOriginalFrame())this._origFrame = target.displayFrame();
    this._nextFrame = 0;
    this._executedLoops = 0
}, update: function (time) {
    if (time < 1) {
        time *= this._animation.getLoops();
        var loopNumber = 0 | time;
        if (loopNumber > this._executedLoops) {
            this._nextFrame =
                0;
            this._executedLoops++
        }
        time = time % 1
    }
    var frames = this._animation.getFrames();
    var numberOfFrames = frames.length, locSplitTimes = this._splitTimes;
    for (var i = this._nextFrame; i < numberOfFrames; i++)if (locSplitTimes[i] <= time) {
        this.target.setSpriteFrame(frames[i].getSpriteFrame());
        this._nextFrame = i + 1
    } else break
}, reverse: function () {
    var locAnimation = this._animation;
    var oldArray = locAnimation.getFrames();
    var newArray = [];
    cc.arrayVerifyType(oldArray, cc.AnimationFrame);
    if (oldArray.length > 0)for (var i = oldArray.length - 1; i >=
        0; i--) {
        var element = oldArray[i];
        if (!element)break;
        newArray.push(element.clone())
    }
    var newAnim = cc.Animation.create(newArray, locAnimation.getDelayPerUnit(), locAnimation.getLoops());
    newAnim.setRestoreOriginalFrame(locAnimation.getRestoreOriginalFrame());
    return cc.Animate.create(newAnim)
}, stop: function () {
    if (this._animation.getRestoreOriginalFrame() && this.target)this.target.setSpriteFrame(this._origFrame);
    cc.Action.prototype.stop.call(this)
}});
cc.Animate.create = function (animation) {
    return new cc.Animate(animation)
};
cc.TargetedAction = cc.ActionInterval.extend({_action: null, _forcedTarget: null, ctor: function (target, action) {
    cc.ActionInterval.prototype.ctor.call(this);
    action && this.initWithTarget(target, action)
}, initWithTarget: function (target, action) {
    if (this.initWithDuration(action.getDuration())) {
        this._forcedTarget = target;
        this._action = action;
        return true
    }
    return false
}, clone: function () {
    var action = new cc.TargetedAction;
    action.initWithTarget(this._forcedTarget, this._action.clone());
    return action
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this,
        target);
    this._action.startWithTarget(this._forcedTarget)
}, stop: function () {
    this._action.stop()
}, update: function (time) {
    this._action.update(time)
}, getForcedTarget: function () {
    return this._forcedTarget
}, setForcedTarget: function (forcedTarget) {
    if (this._forcedTarget != forcedTarget)this._forcedTarget = forcedTarget
}});
cc.TargetedAction.create = function (target, action) {
    return new cc.TargetedAction(target, action)
};
cc.ActionInstant = cc.FiniteTimeAction.extend({isDone: function () {
    return true
}, step: function (dt) {
    this.update(1)
}, update: function (time) {
}, reverse: function () {
    return this.clone()
}, clone: function () {
    return new cc.ActionInstant
}});
cc.Show = cc.ActionInstant.extend({update: function (time) {
    this.target.visible = true
}, reverse: function () {
    return cc.Hide.create()
}, clone: function () {
    return new cc.Show
}});
cc.Show.create = function () {
    return new cc.Show
};
cc.Hide = cc.ActionInstant.extend({update: function (time) {
    this.target.visible = false
}, reverse: function () {
    return cc.Show.create()
}, clone: function () {
    return new cc.Hide
}});
cc.Hide.create = function () {
    return new cc.Hide
};
cc.ToggleVisibility = cc.ActionInstant.extend({update: function (time) {
    this.target.visible = !this.target.visible
}, reverse: function () {
    return new cc.ToggleVisibility
}, clone: function () {
    return new cc.ToggleVisibility
}});
cc.ToggleVisibility.create = function () {
    return new cc.ToggleVisibility
};
cc.RemoveSelf = cc.ActionInstant.extend({_isNeedCleanUp: true, ctor: function (isNeedCleanUp) {
    cc.FiniteTimeAction.prototype.ctor.call(this);
    isNeedCleanUp !== undefined && this.init(isNeedCleanUp)
}, update: function (time) {
    this.target.removeFromParent(this._isNeedCleanUp)
}, init: function (isNeedCleanUp) {
    this._isNeedCleanUp = isNeedCleanUp;
    return true
}, reverse: function () {
    return new cc.RemoveSelf(this._isNeedCleanUp)
}, clone: function () {
    return new cc.RemoveSelf(this._isNeedCleanUp)
}});
cc.RemoveSelf.create = function (isNeedCleanUp) {
    return new cc.RemoveSelf(isNeedCleanUp)
};
cc.FlipX = cc.ActionInstant.extend({_flippedX: false, ctor: function (flip) {
    cc.FiniteTimeAction.prototype.ctor.call(this);
    this._flippedX = false;
    flip !== undefined && this.initWithFlipX(flip)
}, initWithFlipX: function (flip) {
    this._flippedX = flip;
    return true
}, update: function (time) {
    this.target.flippedX = this._flippedX
}, reverse: function () {
    return cc.FlipX.create(!this._flippedX)
}, clone: function () {
    var action = new cc.FlipX;
    action.initWithFlipX(this._flippedX);
    return action
}});
cc.FlipX.create = function (flip) {
    return new cc.FlipX(flip)
};
cc.FlipY = cc.ActionInstant.extend({_flippedY: false, ctor: function (flip) {
    cc.FiniteTimeAction.prototype.ctor.call(this);
    this._flippedY = false;
    flip !== undefined && this.initWithFlipY(flip)
}, initWithFlipY: function (flip) {
    this._flippedY = flip;
    return true
}, update: function (time) {
    this.target.flippedY = this._flippedY
}, reverse: function () {
    return cc.FlipY.create(!this._flippedY)
}, clone: function () {
    var action = new cc.FlipY;
    action.initWithFlipY(this._flippedY);
    return action
}});
cc.FlipY.create = function (flip) {
    return new cc.FlipY(flip)
};
cc.Place = cc.ActionInstant.extend({_x: 0, _y: 0, ctor: function (pos, y) {
    cc.FiniteTimeAction.prototype.ctor.call(this);
    this._x = 0;
    this._y = 0;
    if (pos !== undefined) {
        if (pos.x !== undefined) {
            y = pos.y;
            pos = pos.x
        }
        this.initWithPosition(pos, y)
    }
}, initWithPosition: function (x, y) {
    this._x = x;
    this._y = y;
    return true
}, update: function (time) {
    this.target.setPosition(this._x, this._y)
}, clone: function () {
    var action = new cc.Place;
    action.initWithPosition(this._x, this._y);
    return action
}});
cc.Place.create = function (pos, y) {
    return new cc.Place(pos, y)
};
cc.CallFunc = cc.ActionInstant.extend({_selectorTarget: null, _callFunc: null, _function: null, _data: null, ctor: function (selector, selectorTarget, data) {
    cc.FiniteTimeAction.prototype.ctor.call(this);
    if (selector !== undefined)if (selectorTarget === undefined)this.initWithFunction(selector); else this.initWithFunction(selector, selectorTarget, data)
}, initWithFunction: function (selector, selectorTarget, data) {
    if (selectorTarget) {
        this._data = data;
        this._callFunc = selector;
        this._selectorTarget = selectorTarget
    } else if (selector)this._function =
        selector;
    return true
}, execute: function () {
    if (this._callFunc != null)this._callFunc.call(this._selectorTarget, this.target, this._data); else if (this._function)this._function.call(null, this.target)
}, update: function (time) {
    this.execute()
}, getTargetCallback: function () {
    return this._selectorTarget
}, setTargetCallback: function (sel) {
    if (sel != this._selectorTarget) {
        if (this._selectorTarget)this._selectorTarget = null;
        this._selectorTarget = sel
    }
}, copy: function () {
    var n = new cc.CallFunc;
    if (this._selectorTarget)n.initWithFunction(this._callFunc,
        this._selectorTarget, this._data); else if (this._function)n.initWithFunction(this._function);
    return n
}, clone: function () {
    var action = new cc.CallFunc;
    if (this._selectorTarget)action.initWithFunction(this._callFunc, this._selectorTarget, this._data); else if (this._function)action.initWithFunction(this._function);
    return action
}});
cc.CallFunc.create = function (selector, selectorTarget, data) {
    return new cc.CallFunc(selector, selectorTarget, data)
};
cc.ActionCamera = cc.ActionInterval.extend({_centerXOrig: 0, _centerYOrig: 0, _centerZOrig: 0, _eyeXOrig: 0, _eyeYOrig: 0, _eyeZOrig: 0, _upXOrig: 0, _upYOrig: 0, _upZOrig: 0, ctor: function () {
    var _t = this;
    cc.ActionInterval.prototype.ctor.call(_t);
    _t._centerXOrig = 0;
    _t._centerYOrig = 0;
    _t._centerZOrig = 0;
    _t._eyeXOrig = 0;
    _t._eyeYOrig = 0;
    _t._eyeZOrig = 0;
    _t._upXOrig = 0;
    _t._upYOrig = 0;
    _t._upZOrig = 0
}, startWithTarget: function (target) {
    var _t = this;
    cc.ActionInterval.prototype.startWithTarget.call(_t, target);
    var camera = target.getCamera();
    var centerXYZ = camera.getCenter();
    _t._centerXOrig = centerXYZ.x;
    _t._centerYOrig = centerXYZ.y;
    _t._centerZOrig = centerXYZ.z;
    var eyeXYZ = camera.getEye();
    _t._eyeXOrig = eyeXYZ.x;
    _t._eyeYOrig = eyeXYZ.y;
    _t._eyeZOrig = eyeXYZ.z;
    var upXYZ = camera.getUp();
    _t._upXOrig = upXYZ.x;
    _t._upYOrig = upXYZ.y;
    _t._upZOrig = upXYZ.z
}, clone: function () {
    return new cc.ActionCamera
}, reverse: function () {
    return cc.ReverseTime.create(this)
}});
cc.OrbitCamera = cc.ActionCamera.extend({_radius: 0, _deltaRadius: 0, _angleZ: 0, _deltaAngleZ: 0, _angleX: 0, _deltaAngleX: 0, _radZ: 0, _radDeltaZ: 0, _radX: 0, _radDeltaX: 0, ctor: function (t, radius, deltaRadius, angleZ, deltaAngleZ, angleX, deltaAngleX) {
    cc.ActionCamera.prototype.ctor.call(this);
    deltaAngleX !== undefined && this.initWithDuration(t, radius, deltaRadius, angleZ, deltaAngleZ, angleX, deltaAngleX)
}, initWithDuration: function (t, radius, deltaRadius, angleZ, deltaAngleZ, angleX, deltaAngleX) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this,
        t)) {
        var _t = this;
        _t._radius = radius;
        _t._deltaRadius = deltaRadius;
        _t._angleZ = angleZ;
        _t._deltaAngleZ = deltaAngleZ;
        _t._angleX = angleX;
        _t._deltaAngleX = deltaAngleX;
        _t._radDeltaZ = cc.degreesToRadians(deltaAngleZ);
        _t._radDeltaX = cc.degreesToRadians(deltaAngleX);
        return true
    }
    return false
}, sphericalRadius: function () {
    var newRadius, zenith, azimuth;
    var camera = this.target.getCamera();
    var eyeXYZ = camera.getEye();
    var centerXYZ = camera.getCenter();
    var x = eyeXYZ.x - centerXYZ.x, y = eyeXYZ.y - centerXYZ.y, z = eyeXYZ.z - centerXYZ.z;
    var r =
        Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
    var s = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    if (s === 0)s = cc.FLT_EPSILON;
    if (r === 0)r = cc.FLT_EPSILON;
    zenith = Math.acos(z / r);
    if (x < 0)azimuth = Math.PI - Math.asin(y / s); else azimuth = Math.asin(y / s);
    newRadius = r / cc.Camera.getZEye();
    return{newRadius: newRadius, zenith: zenith, azimuth: azimuth}
}, startWithTarget: function (target) {
    var _t = this;
    cc.ActionInterval.prototype.startWithTarget.call(_t, target);
    var retValue = _t.sphericalRadius();
    if (isNaN(_t._radius))_t._radius = retValue.newRadius;
    if (isNaN(_t._angleZ))_t._angleZ = cc.radiansToDegress(retValue.zenith);
    if (isNaN(_t._angleX))_t._angleX = cc.radiansToDegress(retValue.azimuth);
    _t._radZ = cc.degreesToRadians(_t._angleZ);
    _t._radX = cc.degreesToRadians(_t._angleX)
}, clone: function () {
    var a = new cc.OrbitCamera, _t = this;
    a.initWithDuration(_t._duration, _t._radius, _t._deltaRadius, _t._angleZ, _t._deltaAngleZ, _t._angleX, _t._deltaAngleX);
    return a
}, update: function (dt) {
    var r = (this._radius + this._deltaRadius * dt) * cc.Camera.getZEye();
    var za = this._radZ + this._radDeltaZ *
        dt;
    var xa = this._radX + this._radDeltaX * dt;
    var i = Math.sin(za) * Math.cos(xa) * r + this._centerXOrig;
    var j = Math.sin(za) * Math.sin(xa) * r + this._centerYOrig;
    var k = Math.cos(za) * r + this._centerZOrig;
    this.target.getCamera().setEye(i, j, k)
}});
cc.OrbitCamera.create = function (t, radius, deltaRadius, angleZ, deltaAngleZ, angleX, deltaAngleX) {
    return new cc.OrbitCamera(t, radius, deltaRadius, angleZ, deltaAngleZ, angleX, deltaAngleX)
};
cc.ActionEase = cc.ActionInterval.extend({_inner: null, ctor: function (action) {
    cc.ActionInterval.prototype.ctor.call(this);
    action && this.initWithAction(action)
}, initWithAction: function (action) {
    if (!action)throw"cc.ActionEase.initWithAction(): action must be non nil";
    if (this.initWithDuration(action.getDuration())) {
        this._inner = action;
        return true
    }
    return false
}, clone: function () {
    var action = new cc.ActionEase;
    action.initWithAction(this._inner.clone());
    return action
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this,
        target);
    this._inner.startWithTarget(this.target)
}, stop: function () {
    this._inner.stop();
    cc.ActionInterval.prototype.stop.call(this)
}, update: function (time1) {
    this._inner.update(time1)
}, reverse: function () {
    return cc.ActionEase.create(this._inner.reverse())
}, getInnerAction: function () {
    return this._inner
}});
cc.ActionEase.create = function (action) {
    return new cc.ActionEase(action)
};
cc.EaseRateAction = cc.ActionEase.extend({_rate: 0, ctor: function (action, rate) {
    cc.ActionEase.prototype.ctor.call(this);
    rate !== undefined && this.initWithAction(action, rate)
}, setRate: function (rate) {
    this._rate = rate
}, getRate: function () {
    return this._rate
}, initWithAction: function (action, rate) {
    if (cc.ActionEase.prototype.initWithAction.call(this, action)) {
        this._rate = rate;
        return true
    }
    return false
}, clone: function () {
    var action = new cc.EaseRateAction;
    action.initWithAction(this._inner.clone(), this._rate);
    return action
},
    reverse: function () {
        return cc.EaseRateAction.create(this._inner.reverse(), 1 / this._rate)
    }});
cc.EaseRateAction.create = function (action, rate) {
    return new cc.EaseRateAction(action, rate)
};
cc.EaseIn = cc.EaseRateAction.extend({update: function (time1) {
    this._inner.update(Math.pow(time1, this._rate))
}, reverse: function () {
    return cc.EaseIn.create(this._inner.reverse(), 1 / this._rate)
}, clone: function () {
    var action = new cc.EaseIn;
    action.initWithAction(this._inner.clone(), this._rate);
    return action
}});
cc.EaseIn.create = function (action, rate) {
    return new cc.EaseIn(action, rate)
};
cc.EaseOut = cc.EaseRateAction.extend({update: function (time1) {
    this._inner.update(Math.pow(time1, 1 / this._rate))
}, reverse: function () {
    return cc.EaseOut.create(this._inner.reverse(), 1 / this._rate)
}, clone: function () {
    var action = new cc.EaseOut;
    action.initWithAction(this._inner.clone(), this._rate);
    return action
}});
cc.EaseOut.create = function (action, rate) {
    return new cc.EaseOut(action, rate)
};
cc.EaseInOut = cc.EaseRateAction.extend({update: function (time1) {
    time1 *= 2;
    if (time1 < 1)this._inner.update(0.5 * Math.pow(time1, this._rate)); else this._inner.update(1 - 0.5 * Math.pow(2 - time1, this._rate))
}, clone: function () {
    var action = new cc.EaseInOut;
    action.initWithAction(this._inner.clone(), this._rate);
    return action
}, reverse: function () {
    return cc.EaseInOut.create(this._inner.reverse(), this._rate)
}});
cc.EaseInOut.create = function (action, rate) {
    return new cc.EaseInOut(action, rate)
};
cc.EaseExponentialIn = cc.ActionEase.extend({update: function (time1) {
    this._inner.update(time1 === 0 ? 0 : Math.pow(2, 10 * (time1 - 1)))
}, reverse: function () {
    return cc.EaseExponentialOut.create(this._inner.reverse())
}, clone: function () {
    var action = new cc.EaseExponentialIn;
    action.initWithAction(this._inner.clone());
    return action
}});
cc.EaseExponentialIn.create = function (action) {
    return new cc.EaseExponentialIn(action)
};
cc.EaseExponentialOut = cc.ActionEase.extend({update: function (time1) {
    this._inner.update(time1 == 1 ? 1 : -Math.pow(2, -10 * time1) + 1)
}, reverse: function () {
    return cc.EaseExponentialIn.create(this._inner.reverse())
}, clone: function () {
    var action = new cc.EaseExponentialOut;
    action.initWithAction(this._inner.clone());
    return action
}});
cc.EaseExponentialOut.create = function (action) {
    return new cc.EaseExponentialOut(action)
};
cc.EaseExponentialInOut = cc.ActionEase.extend({update: function (time) {
    if (time != 1 && time !== 0) {
        time *= 2;
        if (time < 1)time = 0.5 * Math.pow(2, 10 * (time - 1)); else time = 0.5 * (-Math.pow(2, -10 * (time - 1)) + 2)
    }
    this._inner.update(time)
}, reverse: function () {
    return cc.EaseExponentialInOut.create(this._inner.reverse())
}, clone: function () {
    var action = new cc.EaseExponentialInOut;
    action.initWithAction(this._inner.clone());
    return action
}});
cc.EaseExponentialInOut.create = function (action) {
    return new cc.EaseExponentialInOut(action)
};
cc.EaseSineIn = cc.ActionEase.extend({update: function (time1) {
    time1 = time1 === 0 || time1 == 1 ? time1 : -1 * Math.cos(time1 * Math.PI / 2) + 1;
    this._inner.update(time1)
}, reverse: function () {
    return cc.EaseSineOut.create(this._inner.reverse())
}, clone: function () {
    var action = new cc.EaseSineIn;
    action.initWithAction(this._inner.clone());
    return action
}});
cc.EaseSineIn.create = function (action) {
    return new cc.EaseSineIn(action)
};
cc.EaseSineOut = cc.ActionEase.extend({update: function (time1) {
    time1 = time1 === 0 || time1 == 1 ? time1 : Math.sin(time1 * Math.PI / 2);
    this._inner.update(time1)
}, reverse: function () {
    return cc.EaseSineIn.create(this._inner.reverse())
}, clone: function () {
    var action = new cc.EaseSineOut;
    action.initWithAction(this._inner.clone());
    return action
}});
cc.EaseSineOut.create = function (action) {
    return new cc.EaseSineOut(action)
};
cc.EaseSineInOut = cc.ActionEase.extend({update: function (time1) {
    time1 = time1 === 0 || time1 == 1 ? time1 : -0.5 * (Math.cos(Math.PI * time1) - 1);
    this._inner.update(time1)
}, clone: function () {
    var action = new cc.EaseSineInOut;
    action.initWithAction(this._inner.clone());
    return action
}, reverse: function () {
    return cc.EaseSineInOut.create(this._inner.reverse())
}});
cc.EaseSineInOut.create = function (action) {
    return new cc.EaseSineInOut(action)
};
cc.EaseElastic = cc.ActionEase.extend({_period: 0.3, ctor: function (action, period) {
    cc.ActionEase.prototype.ctor.call(this);
    action && this.initWithAction(action, period)
}, getPeriod: function () {
    return this._period
}, setPeriod: function (period) {
    this._period = period
}, initWithAction: function (action, period) {
    cc.ActionEase.prototype.initWithAction.call(this, action);
    this._period = period == null ? 0.3 : period;
    return true
}, reverse: function () {
    cc.log("cc.EaseElastic.reverse(): it should be overridden in subclass.")
}, clone: function () {
    var action =
        new cc.EaseElastic;
    action.initWithAction(this._inner.clone(), this._period);
    return action
}});
cc.EaseElastic.create = function (action, period) {
    return new cc.EaseElastic(action, period)
};
cc.EaseElasticIn = cc.EaseElastic.extend({update: function (time1) {
    var newT = 0;
    if (time1 === 0 || time1 === 1)newT = time1; else {
        var s = this._period / 4;
        time1 = time1 - 1;
        newT = -Math.pow(2, 10 * time1) * Math.sin((time1 - s) * Math.PI * 2 / this._period)
    }
    this._inner.update(newT)
}, reverse: function () {
    return cc.EaseElasticOut.create(this._inner.reverse(), this._period)
}, clone: function () {
    var action = new cc.EaseElasticIn;
    action.initWithAction(this._inner.clone(), this._period);
    return action
}});
cc.EaseElasticIn.create = function (action, period) {
    return new cc.EaseElasticIn(action, period)
};
cc.EaseElasticOut = cc.EaseElastic.extend({update: function (time1) {
    var newT = 0;
    if (time1 === 0 || time1 == 1)newT = time1; else {
        var s = this._period / 4;
        newT = Math.pow(2, -10 * time1) * Math.sin((time1 - s) * Math.PI * 2 / this._period) + 1
    }
    this._inner.update(newT)
}, reverse: function () {
    return cc.EaseElasticIn.create(this._inner.reverse(), this._period)
}, clone: function () {
    var action = new cc.EaseElasticOut;
    action.initWithAction(this._inner.clone(), this._period);
    return action
}});
cc.EaseElasticOut.create = function (action, period) {
    return new cc.EaseElasticOut(action, period)
};
cc.EaseElasticInOut = cc.EaseElastic.extend({update: function (time1) {
    var newT = 0;
    var locPeriod = this._period;
    if (time1 === 0 || time1 == 1)newT = time1; else {
        time1 = time1 * 2;
        if (!locPeriod)locPeriod = this._period = 0.3 * 1.5;
        var s = locPeriod / 4;
        time1 = time1 - 1;
        if (time1 < 0)newT = -0.5 * Math.pow(2, 10 * time1) * Math.sin((time1 - s) * Math.PI * 2 / locPeriod); else newT = Math.pow(2, -10 * time1) * Math.sin((time1 - s) * Math.PI * 2 / locPeriod) * 0.5 + 1
    }
    this._inner.update(newT)
}, reverse: function () {
    return cc.EaseElasticInOut.create(this._inner.reverse(), this._period)
},
    clone: function () {
        var action = new cc.EaseElasticInOut;
        action.initWithAction(this._inner.clone(), this._period);
        return action
    }});
cc.EaseElasticInOut.create = function (action, period) {
    return new cc.EaseElasticInOut(action, period)
};
cc.EaseBounce = cc.ActionEase.extend({bounceTime: function (time1) {
    if (time1 < 1 / 2.75)return 7.5625 * time1 * time1; else if (time1 < 2 / 2.75) {
        time1 -= 1.5 / 2.75;
        return 7.5625 * time1 * time1 + 0.75
    } else if (time1 < 2.5 / 2.75) {
        time1 -= 2.25 / 2.75;
        return 7.5625 * time1 * time1 + 0.9375
    }
    time1 -= 2.625 / 2.75;
    return 7.5625 * time1 * time1 + 0.984375
}, clone: function () {
    var action = new cc.EaseBounce;
    action.initWithAction(this._inner.clone());
    return action
}, reverse: function () {
    return cc.EaseBounce.create(this._inner.reverse())
}});
cc.EaseBounce.create = function (action) {
    return new cc.EaseBounce(action)
};
cc.EaseBounceIn = cc.EaseBounce.extend({update: function (time1) {
    var newT = 1 - this.bounceTime(1 - time1);
    this._inner.update(newT)
}, reverse: function () {
    return cc.EaseBounceOut.create(this._inner.reverse())
}, clone: function () {
    var action = new cc.EaseBounceIn;
    action.initWithAction(this._inner.clone());
    return action
}});
cc.EaseBounceIn.create = function (action) {
    return new cc.EaseBounceIn(action)
};
cc.EaseBounceOut = cc.EaseBounce.extend({update: function (time1) {
    var newT = this.bounceTime(time1);
    this._inner.update(newT)
}, reverse: function () {
    return cc.EaseBounceIn.create(this._inner.reverse())
}, clone: function () {
    var action = new cc.EaseBounceOut;
    action.initWithAction(this._inner.clone());
    return action
}});
cc.EaseBounceOut.create = function (action) {
    return new cc.EaseBounceOut(action)
};
cc.EaseBounceInOut = cc.EaseBounce.extend({update: function (time1) {
    var newT = 0;
    if (time1 < 0.5) {
        time1 = time1 * 2;
        newT = (1 - this.bounceTime(1 - time1)) * 0.5
    } else newT = this.bounceTime(time1 * 2 - 1) * 0.5 + 0.5;
    this._inner.update(newT)
}, clone: function () {
    var action = new cc.EaseBounceInOut;
    action.initWithAction(this._inner.clone());
    return action
}, reverse: function () {
    return cc.EaseBounceInOut.create(this._inner.reverse())
}});
cc.EaseBounceInOut.create = function (action) {
    return new cc.EaseBounceInOut(action)
};
cc.EaseBackIn = cc.ActionEase.extend({update: function (time1) {
    var overshoot = 1.70158;
    time1 = time1 === 0 || time1 == 1 ? time1 : time1 * time1 * ((overshoot + 1) * time1 - overshoot);
    this._inner.update(time1)
}, reverse: function () {
    return cc.EaseBackOut.create(this._inner.reverse())
}, clone: function () {
    var action = new cc.EaseBackIn;
    action.initWithAction(this._inner.clone());
    return action
}});
cc.EaseBackIn.create = function (action) {
    return new cc.EaseBackIn(action)
};
cc.EaseBackOut = cc.ActionEase.extend({update: function (time1) {
    var overshoot = 1.70158;
    time1 = time1 - 1;
    this._inner.update(time1 * time1 * ((overshoot + 1) * time1 + overshoot) + 1)
}, reverse: function () {
    return cc.EaseBackIn.create(this._inner.reverse())
}, clone: function () {
    var action = new cc.EaseBackOut;
    action.initWithAction(this._inner.clone());
    return action
}});
cc.EaseBackOut.create = function (action) {
    return new cc.EaseBackOut(action)
};
cc.EaseBackInOut = cc.ActionEase.extend({update: function (time1) {
    var overshoot = 1.70158 * 1.525;
    time1 = time1 * 2;
    if (time1 < 1)this._inner.update(time1 * time1 * ((overshoot + 1) * time1 - overshoot) / 2); else {
        time1 = time1 - 2;
        this._inner.update(time1 * time1 * ((overshoot + 1) * time1 + overshoot) / 2 + 1)
    }
}, clone: function () {
    var action = new cc.EaseBackInOut;
    action.initWithAction(this._inner.clone());
    return action
}, reverse: function () {
    return cc.EaseBackInOut.create(this._inner.reverse())
}});
cc.EaseBackInOut.create = function (action) {
    return new cc.EaseBackInOut(action)
};
cc.cardinalSplineAt = function (p0, p1, p2, p3, tension, t) {
    var t2 = t * t;
    var t3 = t2 * t;
    var s = (1 - tension) / 2;
    var b1 = s * (-t3 + 2 * t2 - t);
    var b2 = s * (-t3 + t2) + (2 * t3 - 3 * t2 + 1);
    var b3 = s * (t3 - 2 * t2 + t) + (-2 * t3 + 3 * t2);
    var b4 = s * (t3 - t2);
    var x = p0.x * b1 + p1.x * b2 + p2.x * b3 + p3.x * b4;
    var y = p0.y * b1 + p1.y * b2 + p2.y * b3 + p3.y * b4;
    return cc.p(x, y)
};
cc.reverseControlPoints = function (controlPoints) {
    var newArray = [];
    for (var i = controlPoints.length - 1; i >= 0; i--)newArray.push(cc.p(controlPoints[i].x, controlPoints[i].y));
    return newArray
};
cc.copyControlPoints = function (controlPoints) {
    var newArray = [];
    for (var i = 0; i < controlPoints.length; i++)newArray.push(cc.p(controlPoints[i].x, controlPoints[i].y));
    return newArray
};
cc.getControlPointAt = function (controlPoints, pos) {
    var p = Math.min(controlPoints.length - 1, Math.max(pos, 0));
    return controlPoints[p]
};
cc.reverseControlPointsInline = function (controlPoints) {
    var len = controlPoints.length;
    var mid = 0 | len / 2;
    for (var i = 0; i < mid; ++i) {
        var temp = controlPoints[i];
        controlPoints[i] = controlPoints[len - i - 1];
        controlPoints[len - i - 1] = temp
    }
};
cc.CardinalSplineTo = cc.ActionInterval.extend({_points: null, _deltaT: 0, _tension: 0, _previousPosition: null, _accumulatedDiff: null, ctor: function (duration, points, tension) {
    cc.ActionInterval.prototype.ctor.call(this);
    this._points = [];
    tension !== undefined && this.initWithDuration(duration, points, tension)
}, initWithDuration: function (duration, points, tension) {
    if (!points || points.length == 0)throw"Invalid configuration. It must at least have one control point";
    if (cc.ActionInterval.prototype.initWithDuration.call(this,
        duration)) {
        this.setPoints(points);
        this._tension = tension;
        return true
    }
    return false
}, clone: function () {
    var action = new cc.CardinalSplineTo;
    action.initWithDuration(this._duration, cc.copyControlPoints(this._points), this._tension);
    return action
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._deltaT = 1 / (this._points.length - 1);
    this._previousPosition = cc.p(this.target.getPositionX(), this.target.getPositionY());
    this._accumulatedDiff = cc.p(0, 0)
}, update: function (time) {
    var p,
        lt;
    var ps = this._points;
    if (time == 1) {
        p = ps.length - 1;
        lt = 1
    } else {
        var locDT = this._deltaT;
        p = 0 | time / locDT;
        lt = (time - locDT * p) / locDT
    }
    var newPos = cc.cardinalSplineAt(cc.getControlPointAt(ps, p - 1), cc.getControlPointAt(ps, p - 0), cc.getControlPointAt(ps, p + 1), cc.getControlPointAt(ps, p + 2), this._tension, lt);
    if (cc.ENABLE_STACKABLE_ACTIONS) {
        var tempX, tempY;
        tempX = this.target.getPositionX() - this._previousPosition.x;
        tempY = this.target.getPositionY() - this._previousPosition.y;
        if (tempX != 0 || tempY != 0) {
            var locAccDiff = this._accumulatedDiff;
            tempX = locAccDiff.x + tempX;
            tempY = locAccDiff.y + tempY;
            locAccDiff.x = tempX;
            locAccDiff.y = tempY;
            newPos.x += tempX;
            newPos.y += tempY
        }
    }
    this.updatePosition(newPos)
}, reverse: function () {
    var reversePoints = cc.reverseControlPoints(this._points);
    return cc.CardinalSplineTo.create(this._duration, reversePoints, this._tension)
}, updatePosition: function (newPos) {
    this.target.setPosition(newPos);
    this._previousPosition = newPos
}, getPoints: function () {
    return this._points
}, setPoints: function (points) {
    this._points = points
}});
cc.CardinalSplineTo.create = function (duration, points, tension) {
    return new cc.CardinalSplineTo(duration, points, tension)
};
cc.CardinalSplineBy = cc.CardinalSplineTo.extend({_startPosition: null, ctor: function (duration, points, tension) {
    cc.CardinalSplineTo.prototype.ctor.call(this);
    this._startPosition = cc.p(0, 0);
    tension !== undefined && this.initWithDuration(duration, points, tension)
}, startWithTarget: function (target) {
    cc.CardinalSplineTo.prototype.startWithTarget.call(this, target);
    this._startPosition.x = target.getPositionX();
    this._startPosition.y = target.getPositionY()
}, reverse: function () {
    var copyConfig = this._points.slice();
    var current;
    var p = copyConfig[0];
    for (var i = 1; i < copyConfig.length; ++i) {
        current = copyConfig[i];
        copyConfig[i] = cc.pSub(current, p);
        p = current
    }
    var reverseArray = cc.reverseControlPoints(copyConfig);
    p = reverseArray[reverseArray.length - 1];
    reverseArray.pop();
    p.x = -p.x;
    p.y = -p.y;
    reverseArray.unshift(p);
    for (var i = 1; i < reverseArray.length; ++i) {
        current = reverseArray[i];
        current.x = -current.x;
        current.y = -current.y;
        current.x += p.x;
        current.y += p.y;
        reverseArray[i] = current;
        p = current
    }
    return cc.CardinalSplineBy.create(this._duration, reverseArray,
        this._tension)
}, updatePosition: function (newPos) {
    var pos = this._startPosition;
    var posX = newPos.x + pos.x;
    var posY = newPos.y + pos.y;
    this._previousPosition.x = posX;
    this._previousPosition.y = posY;
    this.target.setPosition(posX, posY)
}, clone: function () {
    var a = new cc.CardinalSplineBy;
    a.initWithDuration(this._duration, cc.copyControlPoints(this._points), this._tension);
    return a
}});
cc.CardinalSplineBy.create = function (duration, points, tension) {
    return new cc.CardinalSplineBy(duration, points, tension)
};
cc.CatmullRomTo = cc.CardinalSplineTo.extend({ctor: function (dt, points) {
    points && this.initWithDuration(dt, points)
}, initWithDuration: function (dt, points) {
    return cc.CardinalSplineTo.prototype.initWithDuration.call(this, dt, points, 0.5)
}, clone: function () {
    var action = new cc.CatmullRomTo;
    action.initWithDuration(this._duration, cc.copyControlPoints(this._points));
    return action
}});
cc.CatmullRomTo.create = function (dt, points) {
    return new cc.CatmullRomTo(dt, points)
};
cc.CatmullRomBy = cc.CardinalSplineBy.extend({ctor: function (dt, points) {
    cc.CardinalSplineBy.prototype.ctor.call(this);
    points && this.initWithDuration(dt, points)
}, initWithDuration: function (dt, points) {
    return cc.CardinalSplineTo.prototype.initWithDuration.call(this, dt, points, 0.5)
}, clone: function () {
    var action = new cc.CatmullRomBy;
    action.initWithDuration(this._duration, cc.copyControlPoints(this._points));
    return action
}});
cc.CatmullRomBy.create = function (dt, points) {
    return new cc.CatmullRomBy(dt, points)
};
cc.ActionTweenDelegate = cc.Class.extend({updateTweenAction: function (value, key) {
}});
cc.ActionTween = cc.ActionInterval.extend({key: "", from: 0, to: 0, delta: 0, ctor: function (duration, key, from, to) {
    cc.ActionInterval.prototype.ctor.call(this);
    this.key = "";
    to !== undefined && this.initWithDuration(duration, key, from, to)
}, initWithDuration: function (duration, key, from, to) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
        this.key = key;
        this.to = to;
        this.from = from;
        return true
    }
    return false
}, startWithTarget: function (target) {
    if (!target || !target.updateTweenAction)throw"cc.ActionTween.startWithTarget(): target must be non-null, and target must implement updateTweenAction function";
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this.delta = this.to - this.from
}, update: function (dt) {
    this.target.updateTweenAction(this.to - this.delta * (1 - dt), this.key)
}, reverse: function () {
    return cc.ActionTween.create(this.duration, this.key, this.to, this.from)
}, clone: function () {
    var action = new cc.ActionTween;
    action.initWithDuration(this._duration, this.key, this.from, this.to);
    return action
}});
cc.ActionTween.create = function (duration, key, from, to) {
    var ret = new cc.ActionTween;
    if (ret.initWithDuration(duration, key, from, to))return ret;
    return null
};