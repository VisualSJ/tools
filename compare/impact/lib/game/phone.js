ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font'
)
.defines(function(){

var num = 0;
setInterval(function(){
    var o = document.getElementById("fps");
    if(o) o.innerHTML = num;
    num = 0;
}, 1000);
MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	init: function() {

        var TestScene = [
            {a: 2, b: 25},
            {a: 4, b: 25}, //100
            {a: 6, b: 25}, //150
            {a: 8, b: 25}, //200
            {a: 10, b: 25}, //250
            {a: 10, b: 30}, //300
            {a: 10, b: 35}, //350
            {a: 10, b: 40} //400
        ];

        this.fish = new ig.Image("./tools/anim1.png");
        this._move = 0;
        this.tF = undefined;

        var self = this;
        var level = 0;
        var addition = document.getElementById("addition");
        if(addition){
            addition.addEventListener("click", function(){
                level++;
                if(TestScene.length <= level) level = TestScene.length - 1;
                self.createFish(TestScene[level]);
            }, false);
        }
        var subtraction = document.getElementById("subtraction");
        if(subtraction){
            subtraction.addEventListener("click", function(){
                level--;
                if(level <= 0) level = 0;
                self.createFish(TestScene[level]);
            }, false);
        }
        var rotate = document.getElementById("rotate");
        if(rotate){
            rotate.addEventListener("click", function(){
                self.createFish(TestScene[level]);
                self.rotate();
            }, false);
        }
        var move = document.getElementById("move");
        if(move){
            move.addEventListener("click", function(){
                self.createFish(TestScene[level]);
                self.move();
            }, false);
        }
        var scale = document.getElementById("scale");
        if(scale){
            scale.addEventListener("click", function(){
                self.createFish(TestScene[level]);
                self.scale();
            }, false);
        }
        var all = document.getElementById("all");
        if(all){
            all.addEventListener("click", function(){
                self.createFish(TestScene[level]);
                self.all();
            }, false);
        }

        self.createFish(TestScene[level]);

	},

    createFish: function(obj){
        this._move = 0;
        this.tF = undefined;
        this.a = obj.a;
        this.b = obj.b;
        var info = document.getElementById("info");
        info && (info.innerHTML = this.a * this.b);
    },
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
        num++;
		// Add your own, additional update code here
	},
	
	draw: function() {
        if(this.tF != undefined){
            this.tF++;
            if(this.tF > 6){
                this.tF = 0;
                this._move++;
            }
            if(this._move >= 50){
                this._move = 50;
                this.tF = undefined;
            }
        }
		// Draw all entities and backgroundMaps
		this.parent();

        var a = this.a;
        var b = this.b;
        var totalNum = a * b;
        for(var i=0;i<totalNum;i++){
            var x = (i % a) * 30 + this._move;
            var y = (i / a | 0) * 13;
            this.fish.draw(x, y, 0, 0, 50, 26);
        }


	},

    rotate: function(){
        alert("Does not support");
    },

    move: function(){
        this.tF = 0;
    },

    scale: function(){
        alert("Does not support");
    },

    all: function(){
        this.tF = 0;
    }

});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 2000, 2000, 1 );

});
