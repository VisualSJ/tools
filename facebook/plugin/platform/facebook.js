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


    P['list']['facebook'] = {

        init: function(config){
            if (!FB) {
                return;
            }
            var self = this;
            self._isLogined = false;
            FB.init({
                appId : config['appId'],//'472437549567003',
                xfbml : config['xfbml'],//true,
                version : config['version']//'v2.0'
            });
            FB.getLoginStatus(function(response) {
                if (response && response.status === 'connected') {
                    //login
                    self._isLogined = true;
                }
            });
        },

        /*
            USER
         */

        /**
         * @param {function} callback
         */
        login: function(callback){
            var self = this;
            FB.login(function(response) {
                if (response.authResponse) {
                    self._isLogined = true;
                    console.log('login - success');
                } else {
                    console.log('login - failure');
                }
            });
        },

        /**
         * @param {function} callback
         */
        logout: function(callback){
            FB.logout(function(response) {
                // user is now logged out
                self._isLogined = false;
                typeof callback === 'function' && callback(response);
            });
        },

        /**
         * @return {Boolean}
         */
        isLogined: function(callback){
            var self = this;

            FB.getLoginStatus(function(response) {
                if (response && response.status === 'connected') {
                    //login
                    self._isLogined = true;
                    typeof callback === 'function' && callback(true);
                }else{
                    typeof callback === 'function' && callback(false);
                }
            });
            return this._isLogined;
        },

        /**
         *                     FB.api('/me', function(response) {
                        console.log('Good to see you, ' + response.name + '.');
                    });
         */

        /*
            SHARE
         */
        share: function(info){

        }

    };
})(document, window, Plugin);