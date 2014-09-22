ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'impact.debug.debug'
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
		// Initialize your game here; bind keys etc.
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
        num++;
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
//		this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
        var a = 40;
        var b = 80;
        for(var i=0;i<a*b;i++){
            var x = (i % a) * 50;
            var y = (i / a | 0) * 25;
            this.addFish(x, y, 'fish');
        }


	},
    addFish: function(x, y){
        var img = new ig.Image("../../resources/anim1.png");
        img.draw( x, y, 0, 0, 50, 26);
    }
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 2000, 2000, 1 );

});
