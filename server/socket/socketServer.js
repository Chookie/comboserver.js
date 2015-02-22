(function () {

    var socket = require('socket.io');
    var messageRepo = require('../data/messageRepository.js');

    module.exports.init = function (server) {
        var io = socket.listen(server);

        console.log('recentMessages initialising');

        io.sockets.on('connection', function (socket) {
            console.log("Socket was connected");

            socket.broadcast.emit("new message", messageRepo.getInitialMessages(10));

            messageRepo.subscribeForLatestMessages(2000, function(latestData) {
                socket.broadcast.emit("new message", latestData);
            });
        });
    };

}());