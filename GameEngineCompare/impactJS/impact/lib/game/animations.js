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


                // Add your own drawing code here
                var x = ig.system.width/2,
                    y = ig.system.height/2;

                for(var i=0;i<5000;i++){
                    this.addFish( (i*50)%800, (((i/16) | 0) * 26) % 494);
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
