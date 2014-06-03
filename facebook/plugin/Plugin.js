(function(window, cc){

    if(cc === undefined){
        if(console && console.log){
            console.log("Cocos2d not found");
        }
        return;
    }

    var Plugin = {

        platformInfo: {
//            facebook: {
//                appID: null,
//                xfbml: true,
//                version: "v2.0"
//            }
        },

        loadPlugin: function(name){
            if(Plugin[name]){
                return new Plugin[name];
            }else{
                cc.log("The plug-in does not exist");
            }
        },

        init: function(option){
            this.platformInfo = option;
        },

        //Empty implementation
        unloadPlugin: function(){}
    };

    Plugin.User = cc.Class.extend({
        /**
         * @param {string} username
         * @param {string} password
         * @param {function} callback
         */
        login: function(username, password, callback){},

        /**
         * @param {function} callback
         */
        logout: function(callback){},

        getSessionID: function(){},

        /**
         * @return {Boolean}
         */
        isLogined: function(){},

        getUser: function(){},

        getUserName: function(){},

        getUserNick: function(){},

        getUserID: function(){}
    });

    Plugin.Share = cc.Class.extend({
        /**
         * @param {string} info
         * @param {function} callback
         */
        share: function(info, callback){}
    });

    Plugin.Social = cc.Class.extend({
        /**
         * @param {number} leadboardID
         * @param {number} socre
         */
        submitScore: function(leadboardID, socre){},

        /**
         * @param {number} leaderboardID
         */
        showLeaderboard: function(leaderboardID){},

        /**
         * @param {string} achInfo
         */
        unlockAchievement: function(achInfo){},

        showAchievements: function(){}
    });

    Plugin.ADS = cc.Class.extend({
        showAds: function(){},

        hideAds: function(){},

        queryPoints: function(){},

        spendPoints: function(){}
    });

    Plugin.IAP = cc.Class.extend({
        /**
         * @param info
         * @param callback
         */
        payForProduct: function(info, callback){}
    });

    window.Plugin = Plugin;

})(window, cc);
