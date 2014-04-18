var cp = require("child_process");
module.exports = function(app){
    var _html = 'Hi.\n';

    _html += JSON.stringify(app.client.ip);

    _html += "\nPlease contact the administrator.";

    app.send(_html);
//
//    if(app.client.ip == ""){
//
//    }
    cp.exec("cd /itharbors/tools && git pull", function(a, b, c){
        console.log(c);
    })
};