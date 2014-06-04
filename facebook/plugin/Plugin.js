(function(window, cc){

    if(cc === undefined){
        if(console && console.log){
            console.log("Cocos2d not found");
        }
        return;
    }

    //init
    var config = cc.game.config.plugin;

    var Plugin = cc.Class.extend({

        config: config,
        list: {},

        init: function(){
            //Init User
            this.list[this.config['common']['user']].init(config['facebook']);
        },

        login: function(){
            if(this.config['common']['user']){
                var user = this.list[this.config['common']['user']];
                return user.login.apply(user, arguments);
            }else{
                cc.log("User initialization failed");
            }
        },
        logout: function(){

            if(this.config['common']['user']){
                var user = this.list[this.config['common']['user']];
                return user.logout.apply(user, arguments);
            }else{
                cc.log("User initialization failed");
            }
        },
        isLogined: function(){

            if(this.config['common']['user']){
                var user = this.list[this.config['common']['user']];
                return user.isLogined.apply(user, arguments);
            }else{
                cc.log("User initialization failed");
            }
        },

        share: function(info, callback){},

        submitScore: function(leadboardID, socre){},
        showLeaderboard: function(leaderboardID){},
        unlockAchievement: function(achInfo){},
        showAchievements: function(){},

        showAds: function(){},
        hideAds: function(){},
        queryPoints: function(){},
        spendPoints: function(){},

        payForProduct: function(info, callback){}
    });

    window.Plugin = new Plugin();

})(window, cc);
