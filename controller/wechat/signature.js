var https = require("https");
var crypto = require("crypto");
var fs = require("fs");
var path = require("path");

exports.plug = [
    {name: "param", handle: ["GET"]}
];

var appid = "wx97722cd2036335d0";
var secret = fs.readFileSync(path.join(__dirname, "./secret")) + "";

var data;

var getToken = function(callback){
    https.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+appid+"&secret="+secret, function(res) {

        data = '';
        res.on('data', function(chunk){
            data += chunk;
        });
        res.on('end', function(){
            data = data.toString();
            try{
                callback(JSON.parse(data).access_token);
            }catch(err){
                callback("");
            }
        });

    }).on('error', function(e) {
        callback("");
    });
};

var getTicket = function(token, callback){
    https.get("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+token+"&type=jsapi", function(res) {

        data = '';
        res.on('data', function(chunk){
            data += chunk;
        });
        res.on('end', function(){
            data = data.toString();
            try{
                callback(JSON.parse(data).ticket);
            }catch(err){
                callback("");
            }
        });

    }).on('error', function(e) {
        callback("");
    });
};

var getNoncestr = function(){
    var result = "";
    var txt = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for(var i= 0, len=(Math.random()*20)|0; i<len; i++){
        result += txt[(Math.random()-0.1)*63 | 0];
    }
    return result;
};

exports.filter = function(request, response, method, next){
    if(request.headers && (request.headers.host == "dev.tools.itharbors.com" || request.headers.host == "tools.itharbors.com")){
        next();
    }else{
        response.end("Permission denied");
    }
};

exports.handle = function(request, response, method){

    var data = fs.readFileSync(path.join(__dirname, "./state.json")).toString();
    data = JSON.parse(data);

    var current = new Date() - 0;

    if(data.deadline < current){
        console.log("update weChat secret" + (new Date() - 0));
        getToken(function(token){
            getTicket(token, function(ticket){
                fs.writeFileSync(path.join(__dirname, "./state.json"), JSON.stringify({
                    deadline: current + 7200000,
                    token: token,
                    ticket: ticket
                }));

                exports.handle(request, response, method);
            });
        });

    }else{
        var url = method.param.GET("url");
        var noncestr = getNoncestr();
        var stamp = (new Date() - 0) / 1000 | 0;

        var content = "jsapi_ticket=" + data.ticket + "&" +
            "noncestr=" + noncestr + "&" +
            "timestamp=" + stamp + "&" +
            "url=" + url;

        var shasum = crypto.createHash('sha1');

        shasum.update(content);

        var result = shasum.digest('hex');

        response.end(JSON.stringify({
            url: url,
            noncestr: noncestr,
            stamp: stamp,
            signature: result
        }));
    }
};