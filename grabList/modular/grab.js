var url = require("url");
var cheerio = require("cheerio");

var sync = require("./sync");

var modular = {};

modular.create = function(url){
    if(typeof url !== 'string'){
        throw new Error("Url is not string");
    }
    return new this.object(url);
};

modular.object = function(url){
    this._url = [url];
    this._name = [];
    this._result = [];
    this._task = sync('enhance');
};

modular.object.prototype.getList = function(selector){
    if(typeof selector !== 'string'){
        throw new Error("getList must be string");
    }
    var _url = [];
    var self = this;
    //添加到任务队列
    this._task.add(function(next){

        var task = sync("enhance");

        self._url.forEach(function(url){

            task.add(function(next){
                modular.client(url).get(url, function(res){
                    var _html = "";
                    var _parse = modular.parse(url);
                    res.on("data", function(chunk){
                        _html += chunk;
                    });
                    res.on("end", function(){
                        var $ = cheerio.load(_html);
                        var $select = $(selector);
                        $select.each(function(i){
                            var _href = $select.eq(i).attr("href");
                            if(_href.indexOf(_parse.host) < 0){
                                if(/^\//.test(_href))
                                    _href = _parse.protocol + "//" + _parse.host + _href;
                                else
                                    _href = _parse.protocol + "//" + _parse.host + _parse.pathname + "/" + _href
                            }
                            _url.push(_href);
                        });
                        next();
                    });
                }).on("error", function(){
                    console.log("%s is error", url);
                });
            });

        });

        task.end(function(){
            self._url = _url;
            next();
        });

    });
};

modular.object.prototype.getName = function(selector){

};

modular.object.prototype.checkWord = function(selector, word, nameSelector){
    if(typeof selector !== 'string' && typeof word !== 'string'){
        throw new Error("checkWord must be string");
    }
    var self = this;
    //添加到任务队列
    this._task.add(function(next){

        var task = sync("enhance");
        self._url.forEach(function(url){
            task.add(function(next){
                modular.client(url).get(url, function(res){
                    var _html = "";
                    res.on("data", function(chunk){
                        _html += chunk;
                    });
                    res.on("end", function(){
                        var $ = cheerio.load(_html);
                        var $select = $(selector);
                        var name = $(nameSelector).html() || url;
                        modular.checkDOM.call(self, $select, next, name, word, modular.parse(url));
                    });
                }).on("error", function(){
                    console.log("%s is error", url);
                });
            });

        });

        task.end(function(){
            next();
        });
    });
};

modular.object.prototype.start = function(){
    var self = this;
    this._task.end(function(){
        console.log(self._result)
    });
};

modular.parse = function(uri){
    return  url.parse(uri);
};

modular.client = function(uri){
    var _protocol = url.parse(uri).protocol;
    if(_protocol == "http:"){
        return require("http");
    }else{
        return require("https");
    }
};

modular.checkDOM = function(dom, next, name, word, _parse){
    var task = sync("enhance");
    var _check = false;
    var self = this;
    dom.each(function(i){
        task.add(function(next){
            var src = dom.eq(i).attr("src");
            if(src){
                if(/^\//.test(src))
                    src = _parse.protocol + "//" + _parse.host + src;
                else
                    src = _parse.protocol + "//" + _parse.host + _parse.pathname + "/" + src;

                modular.client(src).get(src, function(res){
                    var _html = "";
                    res.on("data", function(chunk){
                        _html += chunk;
                    });
                    res.on("end", function(){
                       if(new RegExp(word).test(_html)){
                           _check = true;
                       }
                        next();
                    });
                }).on("error", function(){
                    console.log("%s is error", src);
                });
            }else{
                var _html = dom.eq(i).html();
                if(new RegExp(word).test(_html)){
                    _check = true;
                }
                next();
            }
        });
    });

    task.end(function(){
        self._result.push({
            name: word,
            check: _check
        });
        next();
    });
};

module.exports = modular;