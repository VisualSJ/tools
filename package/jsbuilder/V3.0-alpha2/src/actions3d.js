cc.GridAction = cc.ActionInterval.extend({_gridSize: null, ctor: function (duration, gridSize) {
    cc._checkWebGLRenderMode();
    cc.ActionInterval.prototype.ctor.call(this);
    this._gridSize = cc.size(0, 0);
    gridSize && this.initWithDuration(duration, gridSize)
}, clone: function () {
    var action = new cc.GridAction;
    var locGridSize = this._gridSize;
    action.initWithDuration(this._duration, cc.size(locGridSize.width, locGridSize.height));
    return action
}, startWithTarget: function (target) {
    cc.ActionInterval.prototype.startWithTarget.call(this,
        target);
    var newGrid = this.getGrid();
    var t = this.target;
    var targetGrid = t.grid;
    if (targetGrid && targetGrid.getReuseGrid() > 0) {
        var locGridSize = targetGrid.getGridSize();
        if (targetGrid.isActive() && locGridSize.width == this._gridSize.width && locGridSize.height == this._gridSize.height)targetGrid.reuse()
    } else {
        if (targetGrid && targetGrid.isActive())targetGrid.setActive(false);
        t.grid = newGrid;
        t.grid.setActive(true)
    }
}, reverse: function () {
    return cc.ReverseTime.create(this)
}, initWithDuration: function (duration, gridSize) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this,
        duration)) {
        this._gridSize.width = gridSize.width;
        this._gridSize.height = gridSize.height;
        return true
    }
    return false
}, getGrid: function () {
    cc.log("cc.GridAction.getGrid(): it should be overridden in subclass.")
}});
cc.GridAction.create = function (duration, gridSize) {
    return new cc.GridAction(duration, gridSize)
};
cc.Grid3DAction = cc.GridAction.extend({getGrid: function () {
    return cc.Grid3D.create(this._gridSize)
}, vertex: function (position) {
    return this.target.grid.vertex(position)
}, originalVertex: function (position) {
    return this.target.grid.originalVertex(position)
}, setVertex: function (position, vertex) {
    this.target.grid.setVertex(position, vertex)
}});
cc.Grid3DAction.create = function (duration, gridSize) {
    return new cc.Grid3DAction(duration, gridSize)
};
cc.TiledGrid3DAction = cc.GridAction.extend({tile: function (position) {
    return this.target.grid.tile(position)
}, originalTile: function (position) {
    return this.target.grid.originalTile(position)
}, setTile: function (position, coords) {
    this.target.grid.setTile(position, coords)
}, getGrid: function () {
    return cc.TiledGrid3D.create(this._gridSize)
}});
cc.TiledGrid3DAction.create = function (duration, gridSize) {
    return new cc.TiledGrid3DAction(duration, gridSize)
};
cc.StopGrid = cc.ActionInstant.extend({startWithTarget: function (target) {
    cc.ActionInstant.prototype.startWithTarget.call(this, target);
    var grid = this.target.grid;
    if (grid && grid.isActive())grid.setActive(false)
}});
cc.StopGrid.create = function () {
    return new cc.StopGrid
};
cc.ReuseGrid = cc.ActionInstant.extend({_times: null, ctor: function (times) {
    cc.ActionInstant.prototype.ctor.call(this);
    times !== undefined && this.initWithTimes(times)
}, initWithTimes: function (times) {
    this._times = times;
    return true
}, startWithTarget: function (target) {
    cc.ActionInstant.prototype.startWithTarget.call(this, target);
    if (this.target.grid && this.target.grid.isActive())this.target.grid.setReuseGrid(this.target.grid.getReuseGrid() + this._times)
}});
cc.ReuseGrid.create = function (times) {
    return new cc.ReuseGrid(times)
};
cc.Waves3D = cc.Grid3DAction.extend({_waves: 0, _amplitude: 0, _amplitudeRate: 0, ctor: function (duration, gridSize, waves, amplitude) {
    cc.GridAction.prototype.ctor.call(this);
    amplitude !== undefined && this.initWithDuration(duration, gridSize, waves, amplitude)
}, getAmplitude: function () {
    return this._amplitude
}, setAmplitude: function (amplitude) {
    this._amplitude = amplitude
}, getAmplitudeRate: function () {
    return this._amplitudeRate
}, setAmplitudeRate: function (amplitudeRate) {
    this._amplitudeRate = amplitudeRate
}, initWithDuration: function (duration, gridSize, waves, amplitude) {
    if (cc.Grid3DAction.prototype.initWithDuration.call(this, duration, gridSize)) {
        this._waves = waves;
        this._amplitude = amplitude;
        this._amplitudeRate = 1;
        return true
    }
    return false
}, update: function (time) {
    var locGridSize = this._gridSize;
    var locAmplitude = this._amplitude, locPos = cc.p(0, 0);
    var locAmplitudeRate = this._amplitudeRate, locWaves = this._waves;
    for (var i = 0; i < locGridSize.width + 1; ++i)for (var j = 0; j < locGridSize.height + 1; ++j) {
        locPos.x = i;
        locPos.y = j;
        var v = this.originalVertex(locPos);
        v.z += Math.sin(Math.PI *
            time * locWaves * 2 + (v.y + v.x) * 0.01) * locAmplitude * locAmplitudeRate;
        this.setVertex(locPos, v)
    }
}});
cc.Waves3D.create = function (duration, gridSize, waves, amplitude) {
    return new cc.Waves3D(duration, gridSize, waves, amplitude)
};
cc.FlipX3D = cc.Grid3DAction.extend({ctor: function (duration) {
    if (duration !== undefined)cc.GridAction.prototype.ctor.call(this, duration, cc.size(1, 1)); else cc.GridAction.prototype.ctor.call(this)
}, initWithDuration: function (duration) {
    return cc.Grid3DAction.prototype.initWithDuration.call(this, duration, cc.size(1, 1))
}, initWithSize: function (gridSize, duration) {
    if (gridSize.width != 1 || gridSize.height != 1) {
        cc.log("Grid size must be (1,1)");
        return false
    }
    return cc.Grid3DAction.prototype.initWithDuration.call(this,
        duration, gridSize)
}, update: function (time) {
    var angle = Math.PI * time;
    var mz = Math.sin(angle);
    angle = angle / 2;
    var mx = Math.cos(angle);
    var diff = new cc.Vertex3F;
    var tempVer = cc.p(0, 0);
    tempVer.x = tempVer.y = 1;
    var v0 = this.originalVertex(tempVer);
    tempVer.x = tempVer.y = 0;
    var v1 = this.originalVertex(tempVer);
    var x0 = v0.x;
    var x1 = v1.x;
    var x;
    var a, b, c, d;
    if (x0 > x1) {
        a = cc.p(0, 0);
        b = cc.p(0, 1);
        c = cc.p(1, 0);
        d = cc.p(1, 1);
        x = x0
    } else {
        c = cc.p(0, 0);
        d = cc.p(0, 1);
        a = cc.p(1, 0);
        b = cc.p(1, 1);
        x = x1
    }
    diff.x = x - x * mx;
    diff.z = Math.abs(parseFloat(x * mz / 4));
    var v = this.originalVertex(a);
    v.x = diff.x;
    v.z += diff.z;
    this.setVertex(a, v);
    v = this.originalVertex(b);
    v.x = diff.x;
    v.z += diff.z;
    this.setVertex(b, v);
    v = this.originalVertex(c);
    v.x -= diff.x;
    v.z -= diff.z;
    this.setVertex(c, v);
    v = this.originalVertex(d);
    v.x -= diff.x;
    v.z -= diff.z;
    this.setVertex(d, v)
}});
cc.FlipX3D.create = function (duration) {
    return new cc.FlipX3D(duration)
};
cc.FlipY3D = cc.FlipX3D.extend({ctor: function (duration) {
    if (duration !== undefined)cc.GridAction.prototype.ctor.call(this, duration, cc.size(1, 1)); else cc.GridAction.prototype.ctor.call(this)
}, update: function (time) {
    var angle = Math.PI * time;
    var mz = Math.sin(angle);
    angle = angle / 2;
    var my = Math.cos(angle);
    var diff = new cc.Vertex3F;
    var tempP = cc.p(0, 0);
    tempP.x = tempP.y = 1;
    var v0 = this.originalVertex(tempP);
    tempP.x = tempP.y = 0;
    var v1 = this.originalVertex(tempP);
    var y0 = v0.y;
    var y1 = v1.y;
    var y;
    var a, b, c, d;
    if (y0 > y1) {
        a = cc.p(0,
            0);
        b = cc.p(0, 1);
        c = cc.p(1, 0);
        d = cc.p(1, 1);
        y = y0
    } else {
        b = cc.p(0, 0);
        a = cc.p(0, 1);
        d = cc.p(1, 0);
        c = cc.p(1, 1);
        y = y1
    }
    diff.y = y - y * my;
    diff.z = Math.abs(parseFloat(y * mz) / 4);
    var v = this.originalVertex(a);
    v.y = diff.y;
    v.z += diff.z;
    this.setVertex(a, v);
    v = this.originalVertex(b);
    v.y -= diff.y;
    v.z -= diff.z;
    this.setVertex(b, v);
    v = this.originalVertex(c);
    v.y = diff.y;
    v.z += diff.z;
    this.setVertex(c, v);
    v = this.originalVertex(d);
    v.y -= diff.y;
    v.z -= diff.z;
    this.setVertex(d, v)
}});
cc.FlipY3D.create = function (duration) {
    return new cc.FlipY3D(duration)
};
cc.Lens3D = cc.Grid3DAction.extend({_position: null, _radius: 0, _lensEffect: 0, _concave: false, _dirty: false, ctor: function (duration, gridSize, position, radius) {
    cc.GridAction.prototype.ctor.call(this);
    this._position = cc.p(0, 0);
    radius !== undefined && this.initWithDuration(duration, gridSize, position, radius)
}, getLensEffect: function () {
    return this._lensEffect
}, setLensEffect: function (lensEffect) {
    this._lensEffect = lensEffect
}, setConcave: function (concave) {
    this._concave = concave
}, getPosition: function () {
    return this._position
},
    setPosition: function (position) {
        if (!cc.pointEqualToPoint(position, this._position)) {
            this._position.x = position.x;
            this._position.y = position.y;
            this._dirty = true
        }
    }, initWithDuration: function (duration, gridSize, position, radius) {
        if (cc.Grid3DAction.prototype.initWithDuration.call(this, duration, gridSize)) {
            this.setPosition(position);
            this._radius = radius;
            this._lensEffect = 0.7;
            this._dirty = true;
            return true
        }
        return false
    }, update: function (time) {
        if (this._dirty) {
            var locGridSizeWidth = this._gridSize.width, locGridSizeHeight =
                this._gridSize.height;
            var locRadius = this._radius, locLensEffect = this._lensEffect;
            var locPos = cc.p(0, 0);
            var vect = cc.p(0, 0);
            var v, r, l, new_r, pre_log;
            for (var i = 0; i < locGridSizeWidth + 1; ++i)for (var j = 0; j < locGridSizeHeight + 1; ++j) {
                locPos.x = i;
                locPos.y = j;
                v = this.originalVertex(locPos);
                vect.x = this._position.x - v.x;
                vect.y = this._position.y - v.y;
                r = cc.pLength(vect);
                if (r < locRadius) {
                    r = locRadius - r;
                    pre_log = r / locRadius;
                    if (pre_log == 0)pre_log = 0.001;
                    l = Math.log(pre_log) * locLensEffect;
                    new_r = Math.exp(l) * locRadius;
                    r = cc.pLength(vect);
                    if (r > 0) {
                        vect.x = vect.x / r;
                        vect.y = vect.y / r;
                        vect.x = vect.x * new_r;
                        vect.y = vect.y * new_r;
                        v.z += cc.pLength(vect) * locLensEffect
                    }
                }
                this.setVertex(locPos, v)
            }
            this._dirty = false
        }
    }});
cc.Lens3D.create = function (duration, gridSize, position, radius) {
    return new cc.Lens3D(duration, gridSize, position, radius)
};
cc.Ripple3D = cc.Grid3DAction.extend({_position: null, _radius: 0, _waves: 0, _amplitude: 0, _amplitudeRate: 0, ctor: function (duration, gridSize, position, radius, waves, amplitude) {
    cc.GridAction.prototype.ctor.call(this);
    this._position = cc.p(0, 0);
    amplitude !== undefined && this.initWithDuration(duration, gridSize, position, radius, waves, amplitude)
}, getPosition: function () {
    return this._position
}, setPosition: function (position) {
    this._position.x = position.x;
    this._position.y = position.y
}, getAmplitude: function () {
    return this._amplitude
},
    setAmplitude: function (amplitude) {
        this._amplitude = amplitude
    }, getAmplitudeRate: function () {
        return this._amplitudeRate
    }, setAmplitudeRate: function (amplitudeRate) {
        this._amplitudeRate = amplitudeRate
    }, initWithDuration: function (duration, gridSize, position, radius, waves, amplitude) {
        if (cc.Grid3DAction.prototype.initWithDuration.call(this, duration, gridSize)) {
            this.setPosition(position);
            this._radius = radius;
            this._waves = waves;
            this._amplitude = amplitude;
            this._amplitudeRate = 1;
            return true
        }
        return false
    }, update: function (time) {
        var locGridSizeWidth =
            this._gridSize.width, locGridSizeHeight = this._gridSize.height;
        var locPos = cc.p(0, 0), locRadius = this._radius;
        var locWaves = this._waves, locAmplitude = this._amplitude, locAmplitudeRate = this._amplitudeRate;
        var v, r, tempPos = cc.p(0, 0);
        for (var i = 0; i < locGridSizeWidth + 1; ++i)for (var j = 0; j < locGridSizeHeight + 1; ++j) {
            locPos.x = i;
            locPos.y = j;
            v = this.originalVertex(locPos);
            tempPos.x = this._position.x - v.x;
            tempPos.y = this._position.y - v.y;
            r = cc.pLength(tempPos);
            if (r < locRadius) {
                r = locRadius - r;
                var rate = Math.pow(r / locRadius, 2);
                v.z +=
                    Math.sin(time * Math.PI * locWaves * 2 + r * 0.1) * locAmplitude * locAmplitudeRate * rate
            }
            this.setVertex(locPos, v)
        }
    }});
cc.Ripple3D.create = function (duration, gridSize, position, radius, waves, amplitude) {
    return new cc.Ripple3D(duration, gridSize, position, radius, waves, amplitude)
};
cc.Shaky3D = cc.Grid3DAction.extend({_randRange: 0, _shakeZ: false, ctor: function (duration, gridSize, range, shakeZ) {
    cc.GridAction.prototype.ctor.call(this);
    shakeZ !== undefined && this.initWithDuration(duration, gridSize, range, shakeZ)
}, initWithDuration: function (duration, gridSize, range, shakeZ) {
    if (cc.Grid3DAction.prototype.initWithDuration.call(this, duration, gridSize)) {
        this._randRange = range;
        this._shakeZ = shakeZ;
        return true
    }
    return false
}, update: function (time) {
    var locGridSizeWidth = this._gridSize.width, locGridSizeHeight =
        this._gridSize.height;
    var locRandRange = this._randRange, locShakeZ = this._shakeZ, locP = cc.p(0, 0);
    var v;
    for (var i = 0; i < locGridSizeWidth + 1; ++i)for (var j = 0; j < locGridSizeHeight + 1; ++j) {
        locP.x = i;
        locP.y = j;
        v = this.originalVertex(locP);
        v.x += cc.rand() % (locRandRange * 2) - locRandRange;
        v.y += cc.rand() % (locRandRange * 2) - locRandRange;
        if (locShakeZ)v.z += cc.rand() % (locRandRange * 2) - locRandRange;
        this.setVertex(locP, v)
    }
}});
cc.Shaky3D.create = function (duration, gridSize, range, shakeZ) {
    return new cc.Shaky3D(duration, gridSize, range, shakeZ)
};
cc.Liquid = cc.Grid3DAction.extend({_waves: 0, _amplitude: 0, _amplitudeRate: 0, ctor: function (duration, gridSize, waves, amplitude) {
    cc.GridAction.prototype.ctor.call(this);
    amplitude !== undefined && this.initWithDuration(duration, gridSize, waves, amplitude)
}, getAmplitude: function () {
    return this._amplitude
}, setAmplitude: function (amplitude) {
    this._amplitude = amplitude
}, getAmplitudeRate: function () {
    return this._amplitudeRate
}, setAmplitudeRate: function (amplitudeRate) {
    this._amplitudeRate = amplitudeRate
}, initWithDuration: function (duration, gridSize, waves, amplitude) {
    if (cc.Grid3DAction.prototype.initWithDuration.call(this, duration, gridSize)) {
        this._waves = waves;
        this._amplitude = amplitude;
        this._amplitudeRate = 1;
        return true
    }
    return false
}, update: function (time) {
    var locSizeWidth = this._gridSize.width, locSizeHeight = this._gridSize.height, locPos = cc.p(0, 0);
    var locWaves = this._waves, locAmplitude = this._amplitude, locAmplitudeRate = this._amplitudeRate;
    var v;
    for (var i = 1; i < locSizeWidth; ++i)for (var j = 1; j < locSizeHeight; ++j) {
        locPos.x = i;
        locPos.y = j;
        v = this.originalVertex(locPos);
        v.x = v.x + Math.sin(time * Math.PI * locWaves * 2 + v.x * 0.01) * locAmplitude * locAmplitudeRate;
        v.y = v.y + Math.sin(time * Math.PI * locWaves * 2 + v.y * 0.01) * locAmplitude * locAmplitudeRate;
        this.setVertex(locPos, v)
    }
}});
cc.Liquid.create = function (duration, gridSize, waves, amplitude) {
    return new cc.Liquid(duration, gridSize, waves, amplitude)
};
cc.Waves = cc.Grid3DAction.extend({_waves: 0, _amplitude: 0, _amplitudeRate: 0, _vertical: false, _horizontal: false, ctor: function (duration, gridSize, waves, amplitude, horizontal, vertical) {
    cc.GridAction.prototype.ctor.call(this);
    vertical !== undefined && this.initWithDuration(duration, gridSize, waves, amplitude, horizontal, vertical)
}, getAmplitude: function () {
    return this._amplitude
}, setAmplitude: function (amplitude) {
    this._amplitude = amplitude
}, getAmplitudeRate: function () {
    return this._amplitudeRate
}, setAmplitudeRate: function (amplitudeRate) {
    this._amplitudeRate =
        amplitudeRate
}, initWithDuration: function (duration, gridSize, waves, amplitude, horizontal, vertical) {
    if (cc.Grid3DAction.prototype.initWithDuration.call(this, duration, gridSize)) {
        this._waves = waves;
        this._amplitude = amplitude;
        this._amplitudeRate = 1;
        this._horizontal = horizontal;
        this._vertical = vertical;
        return true
    }
    return false
}, update: function (time) {
    var locSizeWidth = this._gridSize.width, locSizeHeight = this._gridSize.height, locPos = cc.p(0, 0);
    var locVertical = this._vertical, locHorizontal = this._horizontal;
    var locWaves =
        this._waves, locAmplitude = this._amplitude, locAmplitudeRate = this._amplitudeRate;
    var v;
    for (var i = 0; i < locSizeWidth + 1; ++i)for (var j = 0; j < locSizeHeight + 1; ++j) {
        locPos.x = i;
        locPos.y = j;
        v = this.originalVertex(locPos);
        if (locVertical)v.x = v.x + Math.sin(time * Math.PI * locWaves * 2 + v.y * 0.01) * locAmplitude * locAmplitudeRate;
        if (locHorizontal)v.y = v.y + Math.sin(time * Math.PI * locWaves * 2 + v.x * 0.01) * locAmplitude * locAmplitudeRate;
        this.setVertex(locPos, v)
    }
}});
cc.Waves.create = function (duration, gridSize, waves, amplitude, horizontal, vertical) {
    return new cc.Waves(duration, gridSize, waves, amplitude, horizontal, vertical)
};
cc.Twirl = cc.Grid3DAction.extend({_position: null, _twirls: 0, _amplitude: 0, _amplitudeRate: 0, ctor: function (duration, gridSize, position, twirls, amplitude) {
    cc.GridAction.prototype.ctor.call(this);
    this._position = cc.p(0, 0);
    amplitude !== undefined && this.initWithDuration(duration, gridSize, position, twirls, amplitude)
}, getPosition: function () {
    return this._position
}, setPosition: function (position) {
    this._position.x = position.x;
    this._position.y = position.y
}, getAmplitude: function () {
    return this._amplitude
}, setAmplitude: function (amplitude) {
    this._amplitude =
        amplitude
}, getAmplitudeRate: function () {
    return this._amplitudeRate
}, setAmplitudeRate: function (amplitudeRate) {
    this._amplitudeRate = amplitudeRate
}, initWithDuration: function (duration, gridSize, position, twirls, amplitude) {
    if (cc.Grid3DAction.prototype.initWithDuration.call(this, duration, gridSize)) {
        this.setPosition(position);
        this._twirls = twirls;
        this._amplitude = amplitude;
        this._amplitudeRate = 1;
        return true
    }
    return false
}, update: function (time) {
    var c = this._position;
    var locSizeWidth = this._gridSize.width, locSizeHeight =
        this._gridSize.height, locPos = cc.p(0, 0);
    var amp = 0.1 * this._amplitude * this._amplitudeRate;
    var locTwirls = this._twirls;
    var v, a, dX, dY, avg = cc.p(0, 0);
    for (var i = 0; i < locSizeWidth + 1; ++i)for (var j = 0; j < locSizeHeight + 1; ++j) {
        locPos.x = i;
        locPos.y = j;
        v = this.originalVertex(locPos);
        avg.x = i - locSizeWidth / 2;
        avg.y = j - locSizeHeight / 2;
        a = cc.pLength(avg) * Math.cos(Math.PI / 2 + time * Math.PI * locTwirls * 2) * amp;
        dX = Math.sin(a) * (v.y - c.y) + Math.cos(a) * (v.x - c.x);
        dY = Math.cos(a) * (v.y - c.y) - Math.sin(a) * (v.x - c.x);
        v.x = c.x + dX;
        v.y = c.y + dY;
        this.setVertex(locPos,
            v)
    }
}});
cc.Twirl.create = function (duration, gridSize, position, twirls, amplitude) {
    return new cc.Twirl(duration, gridSize, position, twirls, amplitude)
};
cc.ShakyTiles3D = cc.TiledGrid3DAction.extend({_randRange: 0, _shakeZ: false, ctor: function (duration, gridSize, range, shakeZ) {
    cc.GridAction.prototype.ctor.call(this);
    shakeZ !== undefined && this.initWithDuration(duration, gridSize, range, shakeZ)
}, initWithDuration: function (duration, gridSize, range, shakeZ) {
    if (cc.TiledGrid3DAction.prototype.initWithDuration.call(this, duration, gridSize)) {
        this._randRange = range;
        this._shakeZ = shakeZ;
        return true
    }
    return false
}, update: function (time) {
    var locGridSize = this._gridSize, locRandRange =
        this._randRange;
    var locPos = cc.p(0, 0);
    for (var i = 0; i < locGridSize.width; ++i)for (var j = 0; j < locGridSize.height; ++j) {
        locPos.x = i;
        locPos.y = j;
        var coords = this.originalTile(locPos);
        coords.bl.x += cc.rand() % (locRandRange * 2) - locRandRange;
        coords.br.x += cc.rand() % (locRandRange * 2) - locRandRange;
        coords.tl.x += cc.rand() % (locRandRange * 2) - locRandRange;
        coords.tr.x += cc.rand() % (locRandRange * 2) - locRandRange;
        coords.bl.y += cc.rand() % (locRandRange * 2) - locRandRange;
        coords.br.y += cc.rand() % (locRandRange * 2) - locRandRange;
        coords.tl.y +=
            cc.rand() % (locRandRange * 2) - locRandRange;
        coords.tr.y += cc.rand() % (locRandRange * 2) - locRandRange;
        if (this._shakeZ) {
            coords.bl.z += cc.rand() % (locRandRange * 2) - locRandRange;
            coords.br.z += cc.rand() % (locRandRange * 2) - locRandRange;
            coords.tl.z += cc.rand() % (locRandRange * 2) - locRandRange;
            coords.tr.z += cc.rand() % (locRandRange * 2) - locRandRange
        }
        this.setTile(locPos, coords)
    }
}});
cc.ShakyTiles3D.create = function (duration, gridSize, range, shakeZ) {
    return new cc.ShakyTiles3D(duration, gridSize, range, shakeZ)
};
cc.ShatteredTiles3D = cc.TiledGrid3DAction.extend({_randRange: 0, _once: false, _shatterZ: false, ctor: function (duration, gridSize, range, shatterZ) {
    cc.GridAction.prototype.ctor.call(this);
    shatterZ !== undefined && this.initWithDuration(duration, gridSize, range, shatterZ)
}, initWithDuration: function (duration, gridSize, range, shatterZ) {
    if (cc.TiledGrid3DAction.prototype.initWithDuration.call(this, duration, gridSize)) {
        this._once = false;
        this._randRange = range;
        this._shatterZ = shatterZ;
        return true
    }
    return false
}, update: function (time) {
    if (this._once ===
        false) {
        var locGridSize = this._gridSize, locRandRange = this._randRange;
        var coords, locPos = cc.p(0, 0);
        for (var i = 0; i < locGridSize.width; ++i)for (var j = 0; j < locGridSize.height; ++j) {
            locPos.x = i;
            locPos.y = j;
            coords = this.originalTile(locPos);
            coords.bl.x += cc.rand() % (locRandRange * 2) - locRandRange;
            coords.br.x += cc.rand() % (locRandRange * 2) - locRandRange;
            coords.tl.x += cc.rand() % (locRandRange * 2) - locRandRange;
            coords.tr.x += cc.rand() % (locRandRange * 2) - locRandRange;
            coords.bl.y += cc.rand() % (locRandRange * 2) - locRandRange;
            coords.br.y +=
                cc.rand() % (locRandRange * 2) - locRandRange;
            coords.tl.y += cc.rand() % (locRandRange * 2) - locRandRange;
            coords.tr.y += cc.rand() % (locRandRange * 2) - locRandRange;
            if (this._shatterZ) {
                coords.bl.z += cc.rand() % (locRandRange * 2) - locRandRange;
                coords.br.z += cc.rand() % (locRandRange * 2) - locRandRange;
                coords.tl.z += cc.rand() % (locRandRange * 2) - locRandRange;
                coords.tr.z += cc.rand() % (locRandRange * 2) - locRandRange
            }
            this.setTile(locPos, coords)
        }
        this._once = true
    }
}});
cc.ShatteredTiles3D.create = function (duration, gridSize, range, shatterZ) {
    return new cc.ShatteredTiles3D(duration, gridSize, range, shatterZ)
};
cc.Tile = function (position, startPosition, delta) {
    this.position = position || cc.p(0, 0);
    this.startPosition = startPosition || cc.p(0, 0);
    this.delta = delta || cc.p(0, 0)
};
cc.ShuffleTiles = cc.TiledGrid3DAction.extend({_seed: 0, _tilesCount: 0, _tilesOrder: null, _tiles: null, ctor: function (duration, gridSize, seed) {
    cc.GridAction.prototype.ctor.call(this);
    this._tilesOrder = [];
    this._tiles = [];
    seed !== undefined && this.initWithDuration(duration, gridSize, seed)
}, initWithDuration: function (duration, gridSize, seed) {
    if (cc.TiledGrid3DAction.prototype.initWithDuration.call(this, duration, gridSize)) {
        this._seed = seed;
        this._tilesOrder.length = 0;
        this._tiles.length = 0;
        return true
    }
    return false
}, shuffle: function (array, len) {
    for (var i = len - 1; i >= 0; i--) {
        var j = 0 | cc.rand() % (i + 1);
        var v = array[i];
        array[i] = array[j];
        array[j] = v
    }
}, getDelta: function (pos) {
    var locGridSize = this._gridSize;
    var idx = pos.width * locGridSize.height + pos.height;
    return cc.size(this._tilesOrder[idx] / locGridSize.height - pos.width, this._tilesOrder[idx] % locGridSize.height - pos.height)
}, placeTile: function (pos, tile) {
    var coords = this.originalTile(pos);
    var step = this.target.grid.getStep();
    var locPosition = tile.position;
    coords.bl.x += locPosition.x * step.x;
    coords.bl.y += locPosition.y *
        step.y;
    coords.br.x += locPosition.x * step.x;
    coords.br.y += locPosition.y * step.y;
    coords.tl.x += locPosition.x * step.x;
    coords.tl.y += locPosition.y * step.y;
    coords.tr.x += locPosition.x * step.x;
    coords.tr.y += locPosition.y * step.y;
    this.setTile(pos, coords)
}, startWithTarget: function (target) {
    cc.TiledGrid3DAction.prototype.startWithTarget.call(this, target);
    var locGridSize = this._gridSize;
    this._tilesCount = locGridSize.width * locGridSize.height;
    var locTilesOrder = this._tilesOrder;
    locTilesOrder.length = 0;
    for (var k = 0; k < this._tilesCount; ++k)locTilesOrder[k] =
        k;
    this.shuffle(locTilesOrder, this._tilesCount);
    var locTiles = this._tiles;
    locTiles.length = 0;
    var tileIndex = 0, tempSize = cc.size(0, 0);
    for (var i = 0; i < locGridSize.width; ++i)for (var j = 0; j < locGridSize.height; ++j) {
        locTiles[tileIndex] = new cc.Tile;
        locTiles[tileIndex].position = cc.p(i, j);
        locTiles[tileIndex].startPosition = cc.p(i, j);
        tempSize.width = i;
        tempSize.height = j;
        locTiles[tileIndex].delta = this.getDelta(tempSize);
        ++tileIndex
    }
}, update: function (time) {
    var tileIndex = 0, locGridSize = this._gridSize, locTiles = this._tiles;
    var selTile, locPos = cc.p(0, 0);
    for (var i = 0; i < locGridSize.width; ++i)for (var j = 0; j < locGridSize.height; ++j) {
        locPos.x = i;
        locPos.y = j;
        selTile = locTiles[tileIndex];
        selTile.position.x = selTile.delta.width * time;
        selTile.position.y = selTile.delta.height * time;
        this.placeTile(locPos, selTile);
        ++tileIndex
    }
}});
cc.ShuffleTiles.create = function (duration, gridSize, seed) {
    return new cc.ShuffleTiles(duration, gridSize, seed)
};
cc.FadeOutTRTiles = cc.TiledGrid3DAction.extend({testFunc: function (pos, time) {
    var locX = this._gridSize.width * time;
    var locY = this._gridSize.height * time;
    if (locX + locY == 0)return 1;
    return Math.pow((pos.width + pos.height) / (locX + locY), 6)
}, turnOnTile: function (pos) {
    this.setTile(pos, this.originalTile(pos))
}, turnOffTile: function (pos) {
    this.setTile(pos, new cc.Quad3)
}, transformTile: function (pos, distance) {
    var coords = this.originalTile(pos);
    var step = this.target.grid.getStep();
    coords.bl.x += step.x / 2 * (1 - distance);
    coords.bl.y +=
        step.y / 2 * (1 - distance);
    coords.br.x -= step.x / 2 * (1 - distance);
    coords.br.y += step.y / 2 * (1 - distance);
    coords.tl.x += step.x / 2 * (1 - distance);
    coords.tl.y -= step.y / 2 * (1 - distance);
    coords.tr.x -= step.x / 2 * (1 - distance);
    coords.tr.y -= step.y / 2 * (1 - distance);
    this.setTile(pos, coords)
}, update: function (time) {
    var locGridSize = this._gridSize;
    var locPos = cc.p(0, 0), locSize = cc.size(0, 0), distance;
    for (var i = 0; i < locGridSize.width; ++i)for (var j = 0; j < locGridSize.height; ++j) {
        locPos.x = i;
        locPos.y = j;
        locSize.width = i;
        locSize.height = j;
        distance = this.testFunc(locSize,
            time);
        if (distance == 0)this.turnOffTile(locPos); else if (distance < 1)this.transformTile(locPos, distance); else this.turnOnTile(locPos)
    }
}});
cc.FadeOutTRTiles.create = function (duration, gridSize) {
    return new cc.FadeOutTRTiles(duration, gridSize)
};
cc.FadeOutBLTiles = cc.FadeOutTRTiles.extend({testFunc: function (pos, time) {
    var locX = this._gridSize.width * (1 - time);
    var locY = this._gridSize.height * (1 - time);
    if (pos.width + pos.height == 0)return 1;
    return Math.pow((locX + locY) / (pos.width + pos.height), 6)
}});
cc.FadeOutBLTiles.create = function (duration, gridSize) {
    return new cc.FadeOutBLTiles(duration, gridSize)
};
cc.FadeOutUpTiles = cc.FadeOutTRTiles.extend({testFunc: function (pos, time) {
    var locY = this._gridSize.height * time;
    if (locY == 0)return 1;
    return Math.pow(pos.height / locY, 6)
}, transformTile: function (pos, distance) {
    var coords = this.originalTile(pos);
    var step = this.target.grid.getStep();
    coords.bl.y += step.y / 2 * (1 - distance);
    coords.br.y += step.y / 2 * (1 - distance);
    coords.tl.y -= step.y / 2 * (1 - distance);
    coords.tr.y -= step.y / 2 * (1 - distance);
    this.setTile(pos, coords)
}});
cc.FadeOutUpTiles.create = function (duration, gridSize) {
    return new cc.FadeOutUpTiles(duration, gridSize)
};
cc.FadeOutDownTiles = cc.FadeOutUpTiles.extend({testFunc: function (pos, time) {
    var locY = this._gridSize.height * (1 - time);
    if (pos.height == 0)return 1;
    return Math.pow(locY / pos.height, 6)
}});
cc.FadeOutDownTiles.create = function (duration, gridSize) {
    return new cc.FadeOutDownTiles(duration, gridSize)
};
cc.TurnOffTiles = cc.TiledGrid3DAction.extend({_seed: null, _tilesCount: 0, _tilesOrder: null, ctor: function (duration, gridSize, seed) {
    cc.GridAction.prototype.ctor.call(this);
    this._tilesOrder = [];
    gridSize !== undefined && this.initWithDuration(duration, gridSize, seed)
}, initWithDuration: function (duration, gridSize, seed) {
    if (cc.TiledGrid3DAction.prototype.initWithDuration.call(this, duration, gridSize)) {
        this._seed = seed || 0;
        this._tilesOrder.length = 0;
        return true
    }
    return false
}, shuffle: function (array, len) {
    for (var i = len - 1; i >=
        0; i--) {
        var j = 0 | cc.rand() % (i + 1);
        var v = array[i];
        array[i] = array[j];
        array[j] = v
    }
}, turnOnTile: function (pos) {
    this.setTile(pos, this.originalTile(pos))
}, turnOffTile: function (pos) {
    this.setTile(pos, new cc.Quad3)
}, startWithTarget: function (target) {
    cc.TiledGrid3DAction.prototype.startWithTarget.call(this, target);
    this._tilesCount = this._gridSize.width * this._gridSize.height;
    var locTilesOrder = this._tilesOrder;
    locTilesOrder.length = 0;
    for (var i = 0; i < this._tilesCount; ++i)locTilesOrder[i] = i;
    this.shuffle(locTilesOrder, this._tilesCount)
},
    update: function (time) {
        var l = 0 | time * this._tilesCount, locGridSize = this._gridSize;
        var t, tilePos = cc.p(0, 0), locTilesOrder = this._tilesOrder;
        for (var i = 0; i < this._tilesCount; i++) {
            t = locTilesOrder[i];
            tilePos.x = 0 | t / locGridSize.height;
            tilePos.y = t % (0 | locGridSize.height);
            if (i < l)this.turnOffTile(tilePos); else this.turnOnTile(tilePos)
        }
    }});
cc.TurnOffTiles.create = function (duration, gridSize, seed) {
    return new cc.TurnOffTiles(duration, gridSize, seed)
};
cc.WavesTiles3D = cc.TiledGrid3DAction.extend({_waves: 0, _amplitude: 0, _amplitudeRate: 0, ctor: function (duration, gridSize, waves, amplitude) {
    cc.GridAction.prototype.ctor.call(this);
    amplitude !== undefined && this.initWithDuration(duration, gridSize, waves, amplitude)
}, getAmplitude: function () {
    return this._amplitude
}, setAmplitude: function (amplitude) {
    this._amplitude = amplitude
}, getAmplitudeRate: function () {
    return this._amplitudeRate
}, setAmplitudeRate: function (amplitudeRate) {
    this._amplitudeRate = amplitudeRate
}, initWithDuration: function (duration, gridSize, waves, amplitude) {
    if (cc.TiledGrid3DAction.prototype.initWithDuration.call(this, duration, gridSize)) {
        this._waves = waves;
        this._amplitude = amplitude;
        this._amplitudeRate = 1;
        return true
    }
    return false
}, update: function (time) {
    var locGridSize = this._gridSize, locWaves = this._waves, locAmplitude = this._amplitude, locAmplitudeRate = this._amplitudeRate;
    var locPos = cc.p(0, 0), coords;
    for (var i = 0; i < locGridSize.width; i++)for (var j = 0; j < locGridSize.height; j++) {
        locPos.x = i;
        locPos.y = j;
        coords = this.originalTile(locPos);
        coords.bl.z =
            Math.sin(time * Math.PI * locWaves * 2 + (coords.bl.y + coords.bl.x) * 0.01) * locAmplitude * locAmplitudeRate;
        coords.br.z = coords.bl.z;
        coords.tl.z = coords.bl.z;
        coords.tr.z = coords.bl.z;
        this.setTile(locPos, coords)
    }
}});
cc.WavesTiles3D.create = function (duration, gridSize, waves, amplitude) {
    return new cc.WavesTiles3D(duration, gridSize, waves, amplitude)
};
cc.JumpTiles3D = cc.TiledGrid3DAction.extend({_jumps: 0, _amplitude: 0, _amplitudeRate: 0, ctor: function (duration, gridSize, numberOfJumps, amplitude) {
    cc.GridAction.prototype.ctor.call(this);
    amplitude !== undefined && this.initWithDuration(duration, gridSize, numberOfJumps, amplitude)
}, getAmplitude: function () {
    return this._amplitude
}, setAmplitude: function (amplitude) {
    this._amplitude = amplitude
}, getAmplitudeRate: function () {
    return this._amplitudeRate
}, setAmplitudeRate: function (amplitudeRate) {
    this._amplitudeRate = amplitudeRate
},
    initWithDuration: function (duration, gridSize, numberOfJumps, amplitude) {
        if (cc.TiledGrid3DAction.prototype.initWithDuration.call(this, duration, gridSize)) {
            this._jumps = numberOfJumps;
            this._amplitude = amplitude;
            this._amplitudeRate = 1;
            return true
        }
        return false
    }, update: function (time) {
        var sinz = Math.sin(Math.PI * time * this._jumps * 2) * this._amplitude * this._amplitudeRate;
        var sinz2 = Math.sin(Math.PI * (time * this._jumps * 2 + 1)) * this._amplitude * this._amplitudeRate;
        var locGridSize = this._gridSize;
        var locGrid = this.target.grid;
        var coords, locPos = cc.p(0, 0);
        for (var i = 0; i < locGridSize.width; i++)for (var j = 0; j < locGridSize.height; j++) {
            locPos.x = i;
            locPos.y = j;
            coords = locGrid.originalTile(locPos);
            if ((i + j) % 2 == 0) {
                coords.bl.z += sinz;
                coords.br.z += sinz;
                coords.tl.z += sinz;
                coords.tr.z += sinz
            } else {
                coords.bl.z += sinz2;
                coords.br.z += sinz2;
                coords.tl.z += sinz2;
                coords.tr.z += sinz2
            }
            locGrid.setTile(locPos, coords)
        }
    }});
cc.JumpTiles3D.create = function (duration, gridSize, numberOfJumps, amplitude) {
    return new cc.JumpTiles3D(duration, gridSize, numberOfJumps, amplitude)
};
cc.SplitRows = cc.TiledGrid3DAction.extend({_rows: 0, _winSize: null, ctor: function (duration, rows) {
    cc.GridAction.prototype.ctor.call(this);
    rows !== undefined && this.initWithDuration(duration, rows)
}, initWithDuration: function (duration, rows) {
    this._rows = rows;
    return cc.TiledGrid3DAction.prototype.initWithDuration.call(this, duration, cc.size(1, rows))
}, update: function (time) {
    var locGridSize = this._gridSize, locWinSizeWidth = this._winSize.width;
    var coords, direction, locPos = cc.p(0, 0);
    for (var j = 0; j < locGridSize.height; ++j) {
        locPos.y =
            j;
        coords = this.originalTile(locPos);
        direction = 1;
        if (j % 2 == 0)direction = -1;
        coords.bl.x += direction * locWinSizeWidth * time;
        coords.br.x += direction * locWinSizeWidth * time;
        coords.tl.x += direction * locWinSizeWidth * time;
        coords.tr.x += direction * locWinSizeWidth * time;
        this.setTile(locPos, coords)
    }
}, startWithTarget: function (target) {
    cc.TiledGrid3DAction.prototype.startWithTarget.call(this, target);
    this._winSize = cc.director.getWinSizeInPixels()
}});
cc.SplitRows.create = function (duration, rows) {
    return new cc.SplitRows(duration, rows)
};
cc.SplitCols = cc.TiledGrid3DAction.extend({_cols: 0, _winSize: null, ctor: function (duration, cols) {
    cc.GridAction.prototype.ctor.call(this);
    cols !== undefined && this.initWithDuration(duration, cols)
}, initWithDuration: function (duration, cols) {
    this._cols = cols;
    return cc.TiledGrid3DAction.prototype.initWithDuration.call(this, duration, cc.size(cols, 1))
}, update: function (time) {
    var locGridSizeWidth = this._gridSize.width, locWinSizeHeight = this._winSize.height;
    var coords, direction, locPos = cc.p(0, 0);
    for (var i = 0; i < locGridSizeWidth; ++i) {
        locPos.x =
            i;
        coords = this.originalTile(locPos);
        direction = 1;
        if (i % 2 == 0)direction = -1;
        coords.bl.y += direction * locWinSizeHeight * time;
        coords.br.y += direction * locWinSizeHeight * time;
        coords.tl.y += direction * locWinSizeHeight * time;
        coords.tr.y += direction * locWinSizeHeight * time;
        this.setTile(locPos, coords)
    }
}, startWithTarget: function (target) {
    cc.TiledGrid3DAction.prototype.startWithTarget.call(this, target);
    this._winSize = cc.director.getWinSizeInPixels()
}});
cc.SplitCols.create = function (duration, cols) {
    return new cc.SplitCols(duration, cols)
};
cc.PageTurn3D = cc.Grid3DAction.extend({update: function (time) {
    var tt = Math.max(0, time - 0.25);
    var deltaAy = tt * tt * 500;
    var ay = -100 - deltaAy;
    var deltaTheta = -Math.PI / 2 * Math.sqrt(time);
    var theta = +Math.PI / 2 + deltaTheta;
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    var locGridSize = this._gridSize;
    var locVer = cc.p(0, 0);
    for (var i = 0; i <= locGridSize.width; ++i)for (var j = 0; j <= locGridSize.height; ++j) {
        locVer.x = i;
        locVer.y = j;
        var p = this.originalVertex(locVer);
        var R = Math.sqrt(p.x * p.x + (p.y - ay) * (p.y - ay));
        var r = R * sinTheta;
        var alpha = Math.asin(p.x / R);
        var beta = alpha / sinTheta;
        var cosBeta = Math.cos(beta);
        if (beta <= Math.PI)p.x = r * Math.sin(beta); else p.x = 0;
        p.y = R + ay - r * (1 - cosBeta) * sinTheta;
        p.z = r * (1 - cosBeta) * cosTheta / 7;
        if (p.z < 0.5)p.z = 0.5;
        this.setVertex(locVer, p)
    }
}});
cc.PageTurn3D.create = function (duration, gridSize) {
    return new cc.PageTurn3D(duration, gridSize)
};