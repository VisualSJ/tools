var fs = require('fs');
var path = require('path');

module.exports = function (app) {
    var _url = app.client.url;
    var file = _url.match(/file=.*$/);
    file = file[0].split('=')[1];
    file = file.split(',');

    var _result = '';
    var _dir = __dirname;
    file.forEach(function (_name) {
        _result += fs.readFileSync(path.join(__dirname, './modules/', _name + '.js'));
    });

    app.send(_result);
};