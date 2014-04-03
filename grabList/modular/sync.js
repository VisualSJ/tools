/**
 * 异步方法梳理
 * @param type
 *     'normal'：普通模式，执行所有的方法，执行完毕后执行最后一个方法。方法内是异步的。
 *     'filter'：过滤器模式，执行filter函数，执行完毕后在执行其他函数，所有函数执行完毕后执行end方法。
 *     'enhance'：增强模式，强制所有函数按照顺序执行，执行完前一个后才执行后面一个，直到end结束。
 * @returns {*}
 * @constructor
 * 方法：
 *     add、filter、end
 */

var Modular = function(type){
    return new Modular.fn.init(type);
};

Modular.prototype = {};

Modular.prototype.init = function(type){
    this.status = false;
    this.type = type||'normal';
    this.taskList = [];
    return this;
};

Modular.prototype.add = function(fun){
    typeof(fun)=='function' ?
        this.taskList.push(fun) :
        console.log('sync error : add is not function');
    return this;
};

Modular.prototype.filter = function(fun){
    this.start = fun;
    return this;
};

Modular.prototype.end = function(fun){
    var $this = this;
    var counter = 0;
    var last = function(){
        ++counter==$this.taskList.length && fun();
    };
    var cycle = function(){
        for(var i=0;i<$this.taskList.length;i++){
            $this.taskList[i](last);
        }
    };
    var con = function(){
        counter==$this.taskList.length ?
            fun() :
            $this.taskList[counter++](con);
    };
    switch($this.type){
        case 'filter':
            typeof($this.start)=='function' ?
                $this.start(function(){cycle();}) :
                (console.log('sync error : filter is not function'),cycle());
            break;
        case 'enhance':
            con();
            break;
        default:
            cycle();
    }
};

Modular.fn = Modular.prototype;

Modular.fn.init.prototype = Modular.fn;

module.exports = Modular;