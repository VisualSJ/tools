var https = require("https");
var crypto = require("crypto");
var fs = require("fs");
var path = require("path");

exports.plug = [
    {name: "param", handle: ["GET"]}
];

exports.filter = null;

var appid = "wx97722cd2036335d0";
var secret = fs.readFileSync(path.join(__dirname, "./secret")) + "";

var data;

var tokenFile = path.join(__dirname, "./token");
var token;
if(fs.existsSync(tokenFile)){
    token = fs.readFileSync(tokenFile) + "";
}
var timer_token = 0;

var getToken = function(callback){
    if(!token || new Date() - timer_token > 7200000){
        timer_token = new Date();
        https.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+appid+"&secret="+secret, function(res) {

            data = '';
            res.on('data', function(chunk){
                data += chunk;
            });
            res.on('end', function(){
                data = data.toString();
                try{
                    token = JSON.parse(data).access_token;
                }catch(err){
                    token = null;
                }

                if(token){
                    fs.writeFileSync(tokenFile, token);
                    callback(token);
                }else{
                    callback("");
                }
            });

        }).on('error', function(e) {
            callback("");
        });
    }else{
        if(token){
            callback(token);
        }else{
            callback("");
        }
    }
};

var ticketFile = path.join(__dirname, "./ticket");
var ticket;
if(fs.existsSync(ticketFile)){
    ticket = fs.readFileSync(ticketFile) + "";
}
var timer_ticket = 0;

var getTicket = function(token, callback){
    if(!ticket || new Date() - timer_ticket > 7200000){
        timer_ticket = new Date();
        https.get("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+token+"&type=jsapi", function(res) {

            data = '';
            res.on('data', function(chunk){
                data += chunk;
            });
            res.on('end', function(){
                data = data.toString();
                try{
                    ticket = JSON.parse(data).ticket;
                }catch(err){
                    ticket = null;
                }

                if(ticket){
                    fs.writeFileSync(ticketFile, ticket);
                    callback(ticket);
                }else{
                    callback("");
                }
            });

        }).on('error', function(e) {
            callback("");
        });
    }else{
        if(ticket){
            callback(ticket);
        }else{
            callback("");
        }
    }
};

exports.filter = function(request, response, method, next){
    if(request.headers && (request.headers.host == "dev.tools.itharbors.com" || request.headers.host == "tools.itharbors.com")){
        next();
    }else{
        response.end("Permission denied");
    }
};

exports.handle = function(request, response, method){

    getToken(function(token){
        getTicket(token, function(ticket){
            var url = method.param.GET("url");
            var noncestr = "VQhYOUJRz6RolHqN";
            var stamp = (new Date() - 0) / 1000 | 0;

            var content = "jsapi_ticket=" + ticket + "&" +
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
        });
    });
};