/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 14-7-28
 * Time: 下午2:41
 *
 */
var app = require('./app');

console.log('服务已经启动....端口：3000');
var server = app.listen(3000);
var io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('join', function (name) {
        console.log(name + '加入房间');
        socket.nickname = name;
        socket.broadcast.emit('announcement', name + '加入房间');
    });
    socket.on('text', function(msg){
        socket.broadcast.emit('text', msg);
    });
});