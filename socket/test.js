var io = require('socket.io').listen(4000);

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'Normal' });

    socket.on("message", function(data){
        socket.emit('message', "Received message: " + data);
    });

    socket.on("echotest", function(data, fn){
        socket.emit('message', "Received echotest: " + data);
        console.log(123);
        console.log(fn);
        fn();
    });

});

io.of("/testpoint").on('connection', function (socket) {
    socket.emit('news', { hello: 'testpoint' });

    socket.on("message", function(data){
        socket.emit('message', "Testpoint received message: " + data);
    });

    socket.on("echotest", function(data){
        socket.emit('message', "Testpoint received echotest: " + data);
    });
});