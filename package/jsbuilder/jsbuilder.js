var defaultVersion = 'v3.0-alpha2';

var pageSet = {};

pageSet._tbody = document.getElementById("tbody");

pageSet.init = function(){
    pageSet.setVersion();
    pageSet.All();
    pageSet.getImage();
};

pageSet.continue = function(){
    pageSet.createHTML();
    pageSet.setDropdown();
    pageSet.onClick();
};

pageSet.createHTML = function () {
    module.info.forEach(function (_result) {
        if (_result.name == "core"){
            pageSet.Html(_result);
        }
    });
    module.info.forEach(function (_result) {
        if (_result.name != "core")
            pageSet.Html(_result);
    });
};

pageSet.Html = function (result) {

    var _tr = document.createElement('tr');
    if(hiddenList[result.name]){
        _tr.style.display = 'none';
    }

    var _td = document.createElement('td');

    var _span = document.createElement('span');
    _span.id = result.name;
    _span.className = 'mark';

    if (result.name == 'core') {
        _span.className += ' checked';
        result.checked = 1;
    }
    _td.appendChild(_span);
    if(result.name == 'actions3d'){
        _td.innerHTML += 'effects';
    }else if(result.name == 'debugger'){

        _td.innerHTML += 'log';
    }else{

        _td.innerHTML += result.name;
    }
    _tr.appendChild(_td);

//    _td = document.createElement('td');
//    _td.innerHTML = result.size || 'Unknow';
//    _tr.appendChild(_td);

    _td = document.createElement('td');
    _td.innerHTML = result.info || 'Unknow';
    _tr.appendChild(_td);

    pageSet._tbody.appendChild(_tr);


};

pageSet.onClick = function(){
    var _tr = pageSet._tbody.getElementsByTagName('tr');
    for(var i=0;i<_tr.length;i++){
        _tr[i].onclick = function(){
            var _span = this.getElementsByTagName('span')[0];
            var t = '';
            for(var i=0;i<module.info.length;i++){
                if(_span.id == module.info[i].name){
                    t = module.info[i];
                    break;
                }
            }
            pageSet._check = 0;
            return pageSet.checkDown.call(_span, t);
        }
    }
    var _tr2 = document.getElementById('compress').getElementsByTagName('tr');
    for(var i=0;i<_tr2.length;i++){
        _tr2[i].onclick = function(){
            var _span2 = this.getElementsByTagName('span')[0];
            _span2.className = _span2.className.replace(' checked', '');
            _span2.className += ' checked';

            for(var j=0;j<_tr2.length;j++){
                if(_tr2[j] != this){
                    var _span2 = _tr2[j].getElementsByTagName('span')[0];
                    _span2.className = _span2.className.replace(' checked', '');
                }
            }
        };
    }
};

pageSet.checked = function(result){
    if (name == 'core' || pageSet._check++ > 10) {
        return false;
    }

    result.rule.forEach(function (_y) {
        var _t = document.getElementById(_y);
        if(_t == null) return;
        var _l;
        for (var i = 0; i < module.info.length; i++) {
            if (module.info[i].name == _y) _l = module.info[i];
        }
        _l.checked = 1;
        _t.className = _t.className.replace(' checked', '');
        _t.className += ' checked';
        pageSet.checked.call(_t, _l);
    });
    result.checked = 1;
};

pageSet.unchecked = function(result){
    if (name == 'core' || pageSet._check++ > 10) {
        return false;
    }

    var hidden_check = 0;
    var hidden = function(result){
        if(result.name == 'box2d'){
            if(/checked/.test(document.getElementById('chipmunk').className)){
                return;
            }
        }
        if(result.name == 'chipmunk'){
            if(/checked/.test(document.getElementById('box2d').className)){
                return;
            }
        }
        if(hidden_check++ < 5)
            result.rule.forEach(function(_o){
                if(hiddenList[_o]){
                    module.info.forEach(function(_module){
                        if(_module.name == _o){
                            _module.checked = 0;
                            hidden(_module);
                        }
                    });
                }
            });
    };
    hidden(result);


    module.info.forEach(function (_module) {

        _module.rule.forEach(function (_r) {
            var _b = ( _r == result.name );
            if (_b) {
                var _t = document.getElementById(_module.name);
                if(_t == null) return;

                _t.className = _t.className.replace(' checked', '');
                _module.checked = 0;
                pageSet.unchecked.call(_t, _module);
            }
        });

    });

    result.checked = 0;
};

pageSet.checkDown = function (result, checked) {

    if (!/checked/.test(this.className)){
        this.className = this.className.replace(' checked', '');
        this.className += ' checked';

        pageSet.checked(result);

    }else{
        this.className = this.className.replace(' checked', '');

        pageSet.unchecked(result);

    }
};

pageSet.checkDrop = false;
pageSet.setDropdown = function(){
    var drop = document.getElementById('dropdown');

    var _ver = drop.getElementsByTagName('ul')[0];

    drop.onclick = function () {
        if (pageSet.checkDrop) {
            pageSet.checkDrop = false;
            _ver.style.display = 'none';
        }
        else {
            pageSet.checkDrop = true;
            _ver.style.display = 'block';
        }
    };
};

pageSet.setVersion = function(){
    var version = window.location.href.split('?')[1];
    if (version == undefined) version = 'ver=' + defaultVersion;
    var paramArr = version.split('&');

    paramArr = paramArr.map(function (_param) {
        return _param.split('=');
    });

    paramArr.forEach(function (_param) {
        if (_param[0] == 'ver') {

            var _script = document.createElement('script');
            defaultVersion = _param[1];

            document.getElementById('version').innerHTML = _param[1];

            _script.src = _param[1] + '/module.js';
            document.body.appendChild(_script);

            _script.onload = function () {

                pageSet.continue();
            };

            _script.onerror = function () {
                pageSet.setDropdown();
            };
        }
    });
};

pageSet._All = false;
pageSet.All = function(){
    var _all = document.getElementById('All');
    _all.parentNode.onclick = function(){
        if(!pageSet._All){
            _all.className += ' checked';
            pageSet._All = true;
            pageSet.checkedAll();
        }else{
            _all.className = _all.className.replace(' checked', '');
            pageSet._All = false;
            pageSet.UncheckedAll();
        }
    };
};

pageSet.checkedAll = function(){
    module.info.forEach(function(_module){
        _module.checked = 1;
        var _t = document.getElementById(_module.name);
        _t.className = _t.className.replace(' checked', '');
        _t.className += ' checked';
    });
};

pageSet.UncheckedAll = function(){
    module.info.forEach(function(_module){
        if(_module.name != 'core'){
            _module.checked = 0;
            var _t = document.getElementById(_module.name);
            _t.className = _t.className.replace(' checked', '');
        }
    });
};

pageSet.getImage = function(){
    var _img = document.createElement('img');
    _img.src = "img/DownloadHover.png";
};

pageSet.init();

var Load = function (_a) {
    var _com = /checked/.test(document.getElementById("Compressor").className);

    var _s = 'download_.js?ver=' + defaultVersion + '&com=' + _com + '&file=';

    _sort.forEach(function(name){
        for(var i=0;i<module.info.length;i++){
            if(module.info[i].checked && module.info[i].name == name){
                _s += module.info[i].name + ',';
            }
        }
    });

    _s = _s.substr(0, _s.length - 1);
    _a.href = _s;
};