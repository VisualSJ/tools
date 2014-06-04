(function(d, w, P){

    //When judging the dependence does not exist to terminate execution
    if(cc === undefined){
        if(console && console.log){
            console.log("Cocos2d not found");
        }
        return;
    }
    if(P === undefined){
        if(console && console.log){
            console.log("Plugin not found");
        }
        return;
    }

    //loader on first
    var accessLoad = true;
    var init = function(){
        if (!accessLoad && FB) {
            return;
        }
        accessLoad = false;
        FB.init({
            appId : P.platformInfo['facebook']['appId'],//'472437549567003',
            xfbml : P.platformInfo['facebook']['xfbml'],//true,
            version : P.platformInfo['facebook']['version']//'v2.0'
        });
    };

    /*
        USER CLASS
     */
    P['UserFacebook'] = P.User.extend({

        _isLogined: false,

        ctor: function(){
            var self = this;
            init(function(){
                FB.getLoginStatus(function(response) {
                    if (response && response.status === 'connected') {
                        self._isLogined = true;
                    }else{
                        self._isLogined = false;
                    }
                });
            });
        },

        /**
         * @param {function} callback
         */
        login: function(callback){
            var self = this;
            FB.login(function(response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me', function(response) {
                        self._isLogined = true;
                        console.log('Good to see you, ' + response.name + '.');
                    });
                } else {
                    self._isLogined = false;
                    console.log('User cancelled login or did not fully authorize.');
                }
            });
        },

        /**
         * @param {function} callback
         */
        logout: function(callback){
            FB.logout(function(response) {
                // user is now logged out
                callback(response);
            });
        },

        /**
         * @return {Boolean}
         */
        isLogined: function(callback){
            FB.getLoginStatus(function(response) {
                if (response && response.status === 'connected') {
                    //login
                    callback(true);
                }else{
                    callback(false);
                }
            });
            return this._isLogined;
        }

    });

    /*
        SHARE CLASS
     */
    P['ShareFacebook'] = P.Share.extend({

        ctor: function(){
            init();
        },

        /**
         * @param {string} info
         * @param {function} callback
         */
        share: function(info, callback){

        }
    });

    /*
        SOCIAL CLASS
     */
    P['SocialFacebook'] = P.Social.extend({

        ctor: function(){
            init();
        },

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

    /*
        ADS CLASS
     */
    P['ADSFacebook'] = P.ADS.extend({

        ctor: function(){
            init();
        },

        showAds: function(){},

        hideAds: function(){},

        queryPoints: function(){},

        spendPoints: function(){}
    });

    /*
        IAP
     */
    P['IAP'] = P.IAP.extend({

        ctor: function(){
            init();
        },

        /**
         * @param info
         * @param callback
         */
        payForProduct: function(info, callback){}
    });

})(document, window, Plugin);