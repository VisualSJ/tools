ig.module(
    'game.main'
)
    .requires(
    'impact.game',
    'impact.font',
    'impact.debug.debug'
)
    .defines(function(){

        MyGame = ig.Game.extend({

            // Load a font
            font: new ig.Font( 'media/04b03.font.png' ),


            init: function() {
                // Initialize your game here; bind keys etc.

                var animSheet = new ig.AnimationSheet( "../../resources/anim1.png", 50, 26 );
                this.anim = new ig.Animation( animSheet, 0.2, [0, 1, 2], false );

            },

            update: function() {
                // Update all entities and backgroundMaps
                this.parent();

                // Add your own, additional update code here
            },

            draw: function() {
                // Draw all entities and backgroundMaps
                this.parent();

                var a = 40;
                var b = 80;
                for(var i=0;i<a*b;i++){
                    var x = (i % a) * 50;
                    var y = (i / a | 0) * 25;
                    this.addFish(x, y, 'fish');
                }


            },
            addFish: function(x, y){

                this.anim.update();
                this.anim.draw( x, y );
            }
        });


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
        ig.main( '#canvas', MyGame, 60, 800, 500, 1 );

    });
