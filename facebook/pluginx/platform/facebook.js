(function(P){


    var name = "facebook";

    var userInfo = {
        //accessToken: "",
        //expriesIn: "",
        //signedRequest: "",
        //userID: ""
    };

    var errMsg = {
        '0': 'success',
        '1': 'Unknown error',
        '2': 'Network error',
        '3': 'Without permission',
        '4': 'Interrupt operation'
    };

    P.extend(name, {
        init: function(config){
            if (!FB) {
                return;
            }
            var self = this;
            self._isLogined = false;
            FB.init({
                appId : config['appId'],
                xfbml : config['xfbml'],
                version : config['version']
            });
            FB.getLoginStatus(function(response) {
                if (response && response.status === 'connected') {
                    //login
                    self._isLogined = true;
                    //save user info
                    userInfo = response.authResponse;
                }
            });
        },

        /*
            User Class
         */
        user: {

            login: function(callback){
                var self = this;
                FB.login(function(response) {
                    if (response.authResponse) {
                        self._isLogined = true;
                        //save user info
                        userInfo = response.authResponse;
                        typeof callback === 'function' && callback(0, errMsg[0]);
                    } else {
                        typeof callback === 'function' && callback(1, errMsg[1]);
                    }
                });
            },

            logout: function(callback){
                FB.logout(function(response) {
                    if(response.authResponse){
                        // user is now logged out
                        self._isLogined = false;
                        typeof callback === 'function' && callback(0);
                    }else{
                        typeof callback === 'function' && callback(1, errMsg[1]);
                    }
                });
            },

            isLogined: function(callback){
                var self = this;

                FB.getLoginStatus(function(response) {
                    if (response && response.status === 'connected') {
                        self._isLogined = true;
                        //login - save user info
                        userInfo = response.authResponse;
                        typeof callback === 'function' && callback(0);
                    }else{
                        self._isLogined = false;
                        typeof callback === 'function' && callback(1, errMsg[1]);
                    }
                });
                return this._isLogined;
            }
        },

        /*
            Share Class
         */
        share:{
            /*

            info: {
                site:
                title:
                caption:
                link:
                text:
                imagePath:
                imageUrl:
                location:

                dialogMode:

                notifyText:
                notifyIcon:

                comment:
            }

             */
            share: function(info, callback){

                FB.ui({
                    method: 'share',
                    name: info['title'],
                    caption: info['caption'],
                    description: info['text'],
                    href: info['link'],
                    picture: info['imageUrl']
                },
                function(response) {
                    if (response) {
                        if(response.post_id)
                            callback(0);
                        else
                            callback(3, errMsg[3]);
                    } else {
                        callback(4, errMsg[4]);
                    }
                });
            }
        },

        /*
            Social Class
         */
        social: {
            submitScore: function(callback){
                if(userInfo.userID){
                    FB.api("/"+userInfo.userID+"/scores", 'post', {score: 100}, function(response){
                        console.log(response);
                    });
                }else{
                    callback(3, errMsg[3]);
                }
            },
            showUserScore: function(callback){
                if(userInfo.userID){
                    FB.api("/"+userInfo.userID+"/scores", function(response){
                        console.log(response);
                    });
                }else{
                    callback(3, errMsg[3]);
                }
            },
            showLeaderboard: function(){

            },
            unlockAchievement: function(){

            },
            showAchievements: function(){

            }
        }
    });


})(Plugin);