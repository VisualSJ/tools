var grab = require('./modular/grab');

var test = grab.create('http://my.3533.com');

test.getList(".button a");
test.getName(".button a");
test.checkWord("script", "sea");

test.start();