var crypto = require("crypto");
var fs = require("fs");
var path = require("path");

exports.plug = [
    {name: "param", handle: ["GET"]}
];

exports.filter = function(request, response, method, next){
    if(request.headers && (request.headers.host == "dev.tools.itharbors.com" || request.headers.host == "tools.itharbors.com")){
        next();
    }else{
        response.end("Permission denied");
    }
};


var payInfo = JSON.parse(fs.readFileSync(path.join(__dirname, "./pay")));

var appid = "wx97722cd2036335d0";
var mchid = payInfo.mchid;
var body = "test";

var getNoncestr = function(){
    var result = "";
    var txt = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for(var i= 0, len=(Math.random()*20)|0; i<len; i++){
        result += txt[(Math.random()-0.1)*63 | 0];
    }
    return result;
};

exports.handle = function(request, response, method){

    var nonce_str = getNoncestr();//"ibuaiVcKdpRxkhJA";

//    var stringA = "appid=wxd930ea5d5a258f4f" +
//        "&body=test" +
//        "&device_info=1000" +
//        "&mch_id=10000100" +
//        "&nonce_str=ibuaiVcKdpRxkhJA" +
//        "&key=192006250b4c09247ec02edce69f6a2d";

    var stringA = "appid=" + appid +
        "&body=" + body +
        "&mch_id=" + mchid +
        "&nonce_str=" + nonce_str +
        "&key=" + payInfo.key;

    var shasum = crypto.createHash('MD5');

    shasum.update(stringA);

    var result = shasum.digest('hex').toUpperCase();

    response.end(result);
};