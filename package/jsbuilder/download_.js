var fs = require('fs');
var path = require('path');

module.exports = function (app) {
    try {
        var _url = app.client.url;

        var _t = _url.split("?")[1];
        _t = _t.split("&");
        var param = {};
        _t.forEach(function (_s) {
            var _ = _s.split("=");
            param[_[0]] = _[1];
        });

        var file = param['file'].split(',');

        var _result = '/** \n * Cocos2d-html5 ' + param['ver'] + '\n * ' + (param['com'] == 'true' ? '' : 'No ') + 'comparess\n */\n\n';

        file.forEach(function (_name) {
            _result += fs.readFileSync(path.join(__dirname, './' + param['ver'] + '/', param['com'] == 'true' ? 'dist' : 'src', _name + '.js'));
        });

        app.send(_result);

    } catch (err) {
        app.send('param is error');
    }
};